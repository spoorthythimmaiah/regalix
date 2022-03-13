"""Functions which are related to document parser module."""
import os
import re
import json

from flask import current_app, url_for
from bs4 import BeautifulSoup
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.libs.helpers import get_unique_id, get_tenant_uuid, get_rackspace_container
from sharedemos.models import (
    db,
    DocumentParser,
    DraftSlide,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Playlist,
    PlaylistTranslations,
    Resource as ResourceModel,
    Tenant
)

BULLETS_MAP = {
    'I': 'list-style-type: upper-roman;',
    'i': 'list-style-type: lower-roman;',
    'A': 'list-style-type: upper-alpha;',
    'a': 'list-style-type: lower-alpha;',
    'square': 'list-style-type: square;',
    'disc': 'list-style-type: disc;',
    'circle': 'list-style-type: circle;',
}


def read_json_create_content(
    json_filepath,
    section_id,
    user_id,
    doc_parser_id,
    save_images=True
):
    """
    Get the contents from JSON file, and create content inline with Sdemos hierarchy.

    Read the JSON file created by DocParser service and
    create the playlists, chapters and RTE slides.
    'HEADING_1'         - Playlist title.
    'HEADING_1_CONTENT' - Playlist description. // Discarded temporarily.
    'HEADING_2'         - Chapter title.
    'HEADING_2_CONTENT' - RTE Slide content.
    'save_images' flag indicates fetching the images from Rackspace,
    and saving it in local.
    Return the failed status if importing fails.
    """
    doc_status = DocumentParser.query.get(doc_parser_id).status
    # Don't proceed to save images/ generate chapters,
    # if the docx upload was previously failed.
    if doc_status in current_app.config['DOCUMENT_PARSER_FAIL_STATUS']:
        return {'status': u'IMPORT_FAILED'}

    try:
        img_folder_path = re.sub(r'(?P<name>\d*.json)', '', json_filepath)
        container = get_rackspace_container()
        doc_object = container.get_object(json_filepath)
        doc_data = doc_object.fetch()
        # Convert str to list.
        doc_data = json.loads(doc_data)

        # 'doc_data' contains the 'resources' dict appended as the last element.
        # 'resources' will contain list of 'images', 'crosslinks'.
        resources = doc_data[-1]['resources']
        imgs_list = resources.get('images')
        if save_images and imgs_list:
            from sharedemos.tasks import save_parsed_images
            save_parsed_images.delay({
                "img_folder_path": img_folder_path,
                "images_list": json.dumps(imgs_list),
                "doc_parser_id": doc_parser_id,
            })
            return {'status': u'IMPORT_PROGRESS'}

        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        default_locale_id = tenant.default_locale_id

        # crosslinks
        crosslinks = resources.get('crosslinks', {})

        # 'new_crosslinks' list to have existing crosslinks data,
        # along with the chapter uuid.
        new_crosslinks = []

        # 'resource_mapper' will have bs4 content as value,
        # and resource.id as key.
        # {resource.id : resource.content}
        resource_mapper = {}

        # 'doc_data' contains list of dict items,
        # which are basically playlist details containing chapters, slides.
        pl_order = 0

        if not imgs_list or not save_images:
            for pl_data in doc_data:
                if pl_data.get('Heading1') and pl_data['Heading1'].get('title'):

                    # For 'order' separate variable is used instead of list's 'index',
                    # cause some of the list items may not have 'Heading1'/'title',
                    # in that case, the 'index' increments, and if its assigned to
                    # playlist's order then it'll not be continous.
                    pl_order += 1

                    pl_content = pl_data['Heading1']
                    playlist = Playlist()
                    playlist.order = pl_order
                    playlist.section_id = section_id
                    playlist.tenant_id = tenant_id
                    playlist.created_by = playlist.modified_by = user_id

                    pl_trans = PlaylistTranslations()
                    pl_trans.language_id = default_locale_id
                    pl_trans.name = BeautifulSoup(pl_content['title'], 'lxml').text
                    pl_trans.playlist = playlist
                    db.session.add_all([playlist, pl_trans])

                    # Each playlist content has 'Heading2' which contains
                    # chapter and slide details in 'title' and 'content' respectively.

                    # If a playlist has description, then create a chapter with
                    # playlist's title and an RTE slide with playlist's description.
                    if pl_content.get('content'):

                        if not pl_content.get('Heading2'):
                            pl_content['Heading2'] = []

                        # id 'None' is manually inserted,
                        # cause only in a case where the playlist description
                        # is made as chapter, the json data will not have
                        # any 'id' mapped to it.
                        # But 'crosslinks' data will have 'heading2_id' as '-1',
                        # in this scenario.
                        # So all the 'crosslinks' which are having 'heading2_id' as '-1',
                        # will be mapped to the 1st chapter in a playlist.
                        pl_content['Heading2'].insert(
                            0, {'title': pl_trans.name,
                                'content': pl_content['content'],
                                'id': None
                                }
                        )

                    ch_order = 0
                    if pl_content.get('Heading2'):
                        for ch_data in pl_content['Heading2']:

                            if ch_data.get('title'):
                                ch_order += 1
                                draft_chapter = DraftWalkthrough()
                                draft_chapter.order = ch_order
                                draft_chapter.tenant_id = tenant_id
                                draft_chapter.unique_id = get_unique_id()

                                # TODO: optimization required.

                                # get the corresponding entities from crosslinks,
                                # and append the chapter unique_id to create a new_crosslinks data.
                                _matched_list = filter(
                                    lambda x: x['heading1_id'] == pl_content['id'] and x['heading2_id'] == ch_data['id'],
                                    crosslinks
                                )

                                if ch_order == 1:
                                    # get only those records which will have matching 'heading1_id',
                                    # but 'heading2_id' should be '-1'.
                                    _leftovers = filter(
                                        lambda x: x['heading1_id'] == pl_content['id'] and x['heading2_id'] == -1,
                                        crosslinks
                                    )
                                    # This logic is to handle a specific scenario,
                                    # wherein which, the playlist's title is
                                    # referred by a crosslink from a chapter,
                                    # then the url should be pointing to the
                                    # 1st chapter of that playlist,
                                    # since we don't have any routes for playlist.
                                    _matched_list += _leftovers

                                for x in _matched_list:
                                    x['unique_id'] = draft_chapter.unique_id
                                new_crosslinks.extend(_matched_list)
                                # End optimization.

                                draft_chapter.playlist = playlist
                                draft_chapter.created_by = draft_chapter.modified_by = user_id

                                draft_chapter_trans = DraftWalkthroughTranslations()
                                draft_chapter_trans.language_id = default_locale_id
                                draft_chapter_trans.title = BeautifulSoup(ch_data['title'], 'lxml').text
                                draft_chapter_trans.name = draft_chapter_trans.title
                                draft_chapter_trans.walkthrough = draft_chapter
                                db.session.add_all([draft_chapter, draft_chapter_trans])

                                if ch_data.get('content'):
                                    draft_slide = DraftSlide()
                                    draft_slide.order = 1
                                    draft_slide.tenant_id = tenant_id
                                    draft_slide.walkthrough = draft_chapter

                                    resource = ResourceModel()
                                    resource.tenant_id = tenant_id
                                    resource.name = draft_chapter_trans.title
                                    resource.language_id = default_locale_id
                                    resource.resource_type = u'content'
                                    resource.meta_data = MutableDict()
                                    content = BeautifulSoup(ch_data['content'], 'lxml')
                                    for tag in content('script'):
                                        tag.extract()

                                    # Replace placeholder img path with actual img path.
                                    for img_tag in content('img'):
                                        src = img_tag.attrs.get('src')
                                        src = src.replace(
                                            '#IMAGE_PATH#/',
                                            '/static/media/' + img_folder_path
                                        )
                                        img_tag.attrs['src'] = src

                                    # Append bullet styles.
                                    for l_tag in content.find_all(['ol', 'ul']):
                                        if l_tag.has_attr('type'):
                                            l_tag.attrs['style'] = BULLETS_MAP.get(
                                                l_tag.attrs['type'], ' '
                                            )

                                    resource.content = content.decode()

                                    draft_slide.primary_resource = resource
                                    db.session.add_all([draft_slide, resource])
                                    db.session.flush()
                                    resource_mapper[resource.id] = content

            # crosslinks code logic.
            # TODO: optimization required.
            # Iterate over new cross-links,
            # iterate resource_mapper data,
            # if cross-link data is found,
            # then replace a.href with url of crosslink unique_id.
            new_resource_mapper = {}
            for c_link in new_crosslinks:
                for res_id in resource_mapper:
                    a_tags = resource_mapper[res_id].select(
                        'a[href="{}"]'.format(c_link['link_id'])
                    )
                    for _tag in a_tags:
                        _tag.attrs['href'] = url_for(
                            'document_parser.crosslinks',
                            entity='chapter',
                            unique_id=c_link['unique_id']
                        )
                        _tag.attrs['scroll_to'] = c_link['link_id']
                        _tag.attrs['crosslinks'] = 'true'
                    if a_tags:
                        new_resource_mapper[res_id] = resource_mapper[res_id]

            # End optimization.

            for res_id in new_resource_mapper:
                resource = ResourceModel.query.get(res_id)
                resource.content = resource_mapper[res_id].decode()
                db.session.add(resource)

            db.session.commit()

        return {'status': u'IMPORT_COMPLETE'}
    except Exception as e:
        db.session.rollback()
        return {'status': u'IMPORT_FAILED', 'message': e.message}


def upload_docx_to_cdn(doc_filename, tenant_domain):
    """
    Upload a document file to CDN.

    Return upload status, along with doc path, name details.
    """
    try:
        file_uuid, ext = os.path.splitext(doc_filename)
        tenant_uuid = get_tenant_uuid(tenant_domain)
        doc_path = '{}/{}'.format(tenant_uuid, file_uuid)
        docx_container = get_rackspace_container()

        # 'upload_file' takes 2 params:
        # 1. Location of the file to upload- 'MEDIA_FOLDER/FILENAME'.
        # 2. Location to save the file in the container-
        #   'TENANT_UUID/FOLDER_UUID/FILE'.
        docx_container.upload_file(
            '{}/{}'.format(current_app.config['MEDIA_FOLDER'], doc_filename),
            '{}/{}'.format(doc_path, doc_filename)
        )
        return {'doc_path': doc_path, 'doc_name': doc_filename}
    except Exception as e:
        return {'upload_failed': True, 'message': unicode(e.message)}
