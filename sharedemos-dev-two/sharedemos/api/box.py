import requests
from contextlib import closing
from StringIO import StringIO
from wand.image import Image
from werkzeug.datastructures import FileStorage

from flask import g, current_app, request, session
from flask.ext.login import login_required
from flask.ext.restful import Resource
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.decorators import has_author_access, check_box_login
from sharedemos.libs.helpers import create_file
from sharedemos.models import (
    db, DraftSlide,
    DraftSlideTranslations,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Playlist,
    PlaylistTranslations,
    Resource as ResourceModel,
    Section,
    SectionTranslations,
    Tenant
)

from sharedemos.libs.model import log_activity_feed


def create_section(folder=None, parent=None):
    if not folder:
        folder = {'name': 'Miscellaneous'}

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    language_id = tenant.default_locale_id

    parent_id = parent.id if parent else None

    if folder['name'] == 'Miscellaneous':
        section = Section.query.join(SectionTranslations).filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id == parent_id) &
            (Section.is_deleted.__eq__(False)) &
            (SectionTranslations.name == unicode(folder['name'])) &
            (SectionTranslations.language_id == language_id)
        ).first()

        if section:
            return section

    nth_child = Section.query.filter_by(
        tenant_id=tenant_id,
        parent_id=parent_id,
        is_deleted=False
    ).order_by(Section.order.desc()).first()

    order = (nth_child.order if nth_child else 0) + 1

    section = Section()
    section.tenant_id = tenant_id
    section.order = order
    section.parent = parent
    section.created_by = section.modified_by = g.user.id

    translation = SectionTranslations()
    translation.name = translation.title = unicode(folder['name'])
    if folder.get('description'):
        translation.description = unicode(folder['description'])
    translation.language_id = language_id
    section.translations.append(translation)

    db.session.add(section)
    log_activity_feed(
        entity=u'section',
        action=u'created',
        section=section
    )

    return section


def create_playlist(folder=None, section=None):
    if not folder:
        folder = {'name': 'Miscellaneous'}

    if section:
        siblings = [ch for ch in section.children if not ch.is_deleted]
        if len(siblings):
            section = create_section(parent=section)
    else:
        section = create_section(folder)

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    playlist = Playlist()
    order = len([pl for pl in section.playlists if not pl.is_deleted]) + 1
    playlist.order = order
    playlist.section = section
    playlist.tenant_id = tenant_id

    translation = PlaylistTranslations()
    translation.name = unicode(folder['name'])
    translation.language_id = tenant.default_locale_id
    playlist.translations.append(translation)
    db.session.add(playlist)
    log_activity_feed(
        entity=u'playlist',
        action=u'created',
        section=section,
        playlist=playlist
    )

    return playlist


def save_folder(box_data, parent):

    playlists = [pl for pl in parent.playlists
                 if not pl.is_deleted] if parent else list()

    # Abort if folder is imported at playlist level
    if len(playlists):
        if box_data.get('folders') and len(box_data['folders']):
            raise SharedemosException(
                500, message='Cannot import folder at this level')

        playlist = create_playlist(box_data, parent)
        if box_data.get('files') and len(box_data['files']):
            for file_id, file in box_data['files'].items():
                save_file(file_id, file, playlist=playlist)
    else:
        parent = create_section(box_data, parent)

        if box_data.get('folders') and len(box_data['folders']):
            for folder_id, folder_content in box_data['folders'].items():
                save_folder(folder_content, parent)

        if box_data.get('files') and len(box_data['files']):
            sub_sections = [ch for ch in parent.children if not ch.is_deleted]
            if len(sub_sections):
                parent = create_section(parent=parent)

            playlist = create_playlist(box_data, section=parent)
            for file_id, file in box_data['files'].items():
                save_file(file_id, file, playlist=playlist)


def save_file(file_id, file, playlist=None, section=None):
    if not playlist:
        playlist = create_playlist(section=section)

    demo_name = file['name'].rsplit('.', 1)[0]
    walkthrough = create_walkthrough(demo_name, playlist)

    try:
        url = current_app.config['BOX_FILE_DOWNLOAD_API_URL'] % (str(file_id))
        user_id = str(session['user']['user_id'])
        file_request = requests.get(
            url,
            headers={
                'Authorization':
                    'Bearer ' + session['user']['box'][user_id]['access_token']
            },
            stream=True)
    except Exception:
        raise SharedemosException(404)

    if not file_request.ok:
        raise SharedemosException(412, message='Invalid box response')

    resource_type = None
    is_pdf = False
    if 'image' in file_request.headers['Content-Type']:
        resource_type = 'image'
    elif 'audio' in file_request.headers['Content-Type']:
        resource_type = 'audio'
    elif 'video' in file_request.headers['Content-Type']:
        resource_type = 'video'
    elif 'pdf' in file_request.headers['Content-Type']:
        resource_type = 'image'
        is_pdf = True

    if is_pdf:
        pages_list = Image(blob=file_request.content, resolution=220)
        for single_page in pages_list.sequence:
            image_file = pages_list.sequence[single_page.index]
            img_file_name = file['name'] + str(single_page.index) + '.jpg'
            with Image(image_file) as img:
                img.format = 'jpeg'
                blob_file = StringIO(img.make_blob())
                image_hex_name = create_file(
                    FileStorage(blob_file, filename=img_file_name))
                blob_file.close()
            slide_data = {
                'walkthrough': walkthrough, 'slide_name': demo_name,
                'slide_order': (single_page.index + 1),
                'resource_type': unicode(resource_type),
                'path': image_hex_name
            }
            create_slide(slide_data)
        pages_list.close()
    else:
        with closing(StringIO(file_request.content)) as resource_file:
            image_hex_name = create_file(
                FileStorage(resource_file, filename=file['name']))

        slide_data = {
            'walkthrough': walkthrough,
            'slide_name': demo_name,
            'slide_order': 1,
            'resource_type': unicode(resource_type),
            'path': image_hex_name
        }
        create_slide(slide_data)

    return playlist


def create_slide(slide_data):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    # create resource
    resource = ResourceModel()
    resource.name = slide_data['slide_name']
    resource.resource_type = slide_data['resource_type']
    resource.path = slide_data['path']
    resource.language_id = tenant.default_locale_id
    resource.tenant_id = tenant_id
    resource.meta_data = MutableDict()
    db.session.add(resource)

    draft_slide = DraftSlide()
    draft_slide.order = slide_data['slide_order']
    draft_slide.primary_resource = resource
    draft_slide.walkthrough = slide_data['walkthrough']
    draft_slide.tenant_id = tenant_id

    translation = DraftSlideTranslations()
    translation.name = unicode('Slide ' + str(draft_slide.order))
    translation.text = u""
    translation.language_id = tenant.default_locale_id
    draft_slide.translations.append(translation)
    db.session.add(draft_slide)


def create_walkthrough(walkthrough_name, playlist):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    chapter = DraftWalkthrough()
    chapter.order = len(playlist.draft_walkthroughs) + 1
    chapter.tenant_id = tenant_id
    chapter.created_by = chapter.modified_by = g.user.id
    chapter.playlist = playlist

    translation = DraftWalkthroughTranslations()
    translation.language_id = tenant.default_locale_id
    translation.name = translation.title = unicode(walkthrough_name)
    chapter.translations.append(translation)
    db.session.add(chapter)
    log_activity_feed(
        entity=u'walkthrough',
        action=u'created',
        section=playlist.section,
        playlist=playlist,
        draft_walkthrough=chapter
    )

    return chapter


def read_box_content(box_data, entity_id, entity_type, parent, playlist=None):
    if box_data.get(entity_type):
        for e_id, content in box_data[entity_type].items():
            if e_id == entity_id:
                if entity_type == 'folders':
                    return save_folder(content, parent)
                elif entity_type == 'files':
                    return save_file(e_id, content, playlist=playlist,
                                     section=parent)

    if box_data.get('folders') and len(box_data['folders']):
        for e_id, content in box_data['folders'].items():
            entity = read_box_content(box_data['folders'][e_id], entity_id,
                                      entity_type, parent, playlist=playlist)
            if entity_type == 'files' and entity:
                return entity


class BoxApi(Resource):

    method_decorators = [login_required, has_author_access, check_box_login]

    def get(self):
        box_user_id = 'box_user_' + str(session['user']['user_id'])
        return current_app.box_cache.get(box_user_id), 200

    def post(self, parent_id=None):

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        parent = None
        parent_id = request.json.get('parent')

        if parent_id:
            parent = Section.query.filter(
                (Section.tenant_id == tenant_id) &
                (Section.slug == parent_id)
            ).first_or_404()
            if not parent.can_edit():
                raise SharedemosException(403)

        box_user_id = 'box_user_' + str(session['user']['user_id'])
        box_content = current_app.box_cache.get(box_user_id)

        try:
            for folder_id in request.json.get('folders'):
                read_box_content(box_content['0'], folder_id,
                                 entity_type='folders', parent=parent)

            playlist = None
            for file_id in request.json.get('files'):
                playlist = read_box_content(box_content['0'], file_id,
                                            entity_type='files', parent=parent,
                                            playlist=playlist)

            db.session.commit()

            from sharedemos.tasks import delete_api_cache_data
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'product_tree',
                'clear_all_products': True,
                'tenant_id': tenant.id
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'dashboard',
                'tenant_id': tenant.id
            })
            if not parent_id:
                delete_api_cache_data.delay({
                    'delete_pattern': True,
                    'entity': 'all_products',
                    'tenant_id': tenant.id
                })

        except Exception, e:
            db.session.rollback()
            raise SharedemosException(500, message=e.message)

        return {}, 200
