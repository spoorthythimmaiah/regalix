from datetime import datetime
import json
import re
import os
from uuid import uuid4

from flask import (
    current_app,
    request,
    session
)
from flask.ext.restful import Resource, marshal, reqparse

from sharedemos.libs.api import (
    construct_cache_key_list,
    delete_cache_with_pattern,
    format_data,
    get_all_chapters,
    get_all_children,
    get_all_playlists,
)
from sharedemos.libs.bulletin_board import (
    delete_link_from_bboard
)
from sharedemos.libs.decorators import (
    check_user_access,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    ExpireEntity,
    copy_file_from_src,
    create_cta,
    remove_pdf,
    reset_user_groups
)
from sharedemos.libs.model import log_activity_feed, slugify
from sharedemos.libs.utils import (
    copy_chapter,
    create_update_tags,
    get_complete_section_details,
    get_products_api,
    get_usergroups,
    get_section_api,
    section_api_fields,
    validate_user_group
)
from sharedemos.models import (
    db,
    change_section_order,
    CTATranslations,
    LeadCTAForm,
    IconLibrary,
    Journey,
    Playlist,
    PlaylistTranslations,
    Section,
    SectionJourneys,
    SectionTranslations,
    SectionVideo,
    Resource as ResourceModel,
    Tenant,
)


def duplicate_section(original, parent, suffix=''):
    section = original.duplicate(
        exclude_columns=["modified_at", "slug"]
    )
    section.parent = parent

    if original.icon_id:
        icon = original.icon
        copy_status = copy_file_from_src(icon.path)
        if copy_status.get('msg') == 'COPY_ERROR':
            raise SharedemosException(500, copy_status.get('msg'))
        new_icon = icon.duplicate()
        new_icon.path = copy_status.get('path')
        section.icon = new_icon

    for _video in original.videos:
        video = _video.duplicate()
        section.videos.append(video)

    for _cta in original.cta_list:
        cta = _cta.duplicate()
        for trans in _cta.translations:
            _trans = trans.duplicate(
                exclude_columns=["modified_at"]
            )
            _trans.cta = cta
        section.cta_list.append(cta)

    for trans in original.translations:
        _translation = trans.duplicate(
            exclude_columns=["modified_at", "slug"]
        )
        _translation.name = trans.name + suffix
        _translation.section = section

        if trans.resource_id:
            original_resource = trans.resource
            copy_status = copy_file_from_src(original_resource.path)
            if copy_status.get('msg') == 'COPY_ERROR':
                raise SharedemosException(500, copy_status.get('msg'))

            new_res = original_resource.duplicate(
                exclude_columns=["modified_at", "name"]
            )
            new_res.path = copy_status.get('path')
            new_res.name = u''
            db.session.add(new_res)
            db.session.flush()
            new_res.name = slugify(
                input_text=original_resource.name,
                rec_id=new_res.id,
                model=ResourceModel,
                tenant_id=new_res.tenant_id,
                slugfield=u'name',
                delim='-',
                max_length=255,
                decode=False,
                **{'resource_type': u'asset_link'}
            )
            db.session.add(new_res)
            _translation.resource = new_res

        db.session.add(_translation)

    section.created_by = session.get('user_id')
    section.modified_by = session.get('user_id')
    db.session.add(section)
    log_activity_feed(
        entity=u'section',
        action=u'created',
        section=section
    )

    return section


def deep_copy_section(target_section, parent_section):

    for child in target_section.children:
        if child.is_deleted:
            continue

        parent = duplicate_section(child, parent_section)

        copy_status = deep_copy_section(child, parent)
        if copy_status == 'COPY_ERROR':
            return copy_status

    if parent_section:
        for pl in target_section.playlists:
            if pl.is_deleted:
                continue
            playlist = Playlist()
            playlist.order = pl.order
            playlist.is_enabled = pl.is_enabled
            playlist.section_id = parent_section.id
            playlist.tenant_id = pl.tenant_id
            playlist.created_by = session.get('user_id')
            playlist.modified_by = session.get('user_id')
            db.session.add(playlist)

            for trans in pl.translations:
                translation = PlaylistTranslations()
                translation.name = trans.name
                translation.description = trans.description
                translation.playlist = playlist
                translation.language_id = trans.language_id
                db.session.add(translation)

            for dm in pl.draft_walkthroughs:
                if dm.is_deleted:
                    continue

                copy_chapter(dm, playlist)


def update_siblings_order(parent):
    tenant_id = getattr(current_app, 'tenant_id', None)
    if parent:
        children = [ch for ch in parent.children if not ch.is_deleted]
    else:
        children = Section.query.filter(
            Section.tenant_id == tenant_id,
            Section.is_deleted.__eq__(False),
            Section.parent_id.is_(None)
        ).order_by(
            Section.order,
            Section.created_at
        ).all()

    order = 1
    for child in children:
        child.order = order
        order += 1
        db.session.add(child)


def save_cta_file(cta_file, tenant_unique_id):
    """Create a cta file on the media/client folder."""
    try:
        hex_file_name = str(uuid4()) + os.path.splitext(cta_file.filename)[1]
        file_folder = os.path.join(
            current_app.config['CLIENT_FOLDER'], tenant_unique_id
        )
        if not os.path.exists(file_folder):
            os.makedirs(file_folder)

        cta_file.save(os.path.join(file_folder, hex_file_name))
        return unicode(hex_file_name)

    except Exception:
        raise SharedemosException(500, message='CTA FILE SAVE ERROR')


def delete_cta_file(file_name, tenant_unique_id):
    """Delete the cta file from media/client folder based on tenant."""
    try:
        file_path = os.path.join(
            current_app.config['CLIENT_FOLDER'],
            tenant_unique_id,
            file_name
        )
        os.remove(file_path)
    except OSError:
        pass


def update_cta_details(section, cta_data):
    """Updating section's cta details."""
    tenant = section.tenant
    language_id = session["author"]["locale"]
    if cta_data.get('removed'):
        for _id in cta_data['removed']:
            cta = LeadCTAForm.query.get(_id)
            # if cta type is pdf, we need to delete the file
            if cta in section.cta_list:
                if(cta.cta_type == 'pdf'):
                    cta_trans = cta.get_locale_translation(language_id)
                    delete_cta_file(
                        cta_trans.cta_button['path'],
                        tenant.unique_tenant_id
                    )
                section.cta_list.remove(cta)

    if cta_data.get('added'):
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name
            )
        for _new in cta_data['added']:
            if _new['options']['type'] == 'pdf':
                file_path = save_cta_file(
                    request.files.get(_new['file']),
                    tenant.unique_tenant_id
                )
                _new['options']['path'] = file_path
            cta = create_cta(_new, tenant.default_locale_id)
            section.cta_list.append(cta)

    if cta_data.get('edited'):
        for _edited in cta_data['edited']:
            cta = LeadCTAForm.query.filter(
                LeadCTAForm.id == _edited['ctaId']
            ).first_or_404()

            cta_trans = cta.get_locale_translation(language_id)
            if not cta_trans:
                cta_trans = CTATranslations()
                cta_trans.language_id = language_id

            if _edited['options']['type'] == 'pdf':
                file_path = None
                if _edited.get('file'):
                    file_path = save_cta_file(
                        request.files.get(_edited['file']),
                        tenant.unique_tenant_id
                    )
                    if cta_trans.cta_button.get("path"):
                        delete_cta_file(
                            cta_trans.cta_button['path'],
                            tenant.unique_tenant_id
                        )

                _edited["options"]["path"] = (
                    file_path or
                    cta_trans.cta_button['path']
                )
            cta.cta_type = _edited['options']['type']

            _edited["options"].pop("type")
            cta_trans.cta_button = _edited["options"]
            cta_trans.name = _edited["name"]
            cta_trans.cta = cta
            db.session.add_all([cta, cta_trans])


parser = reqparse.RequestParser()
parser.add_argument(
    'name', type=unicode, required=True, location='form', help='Name required')
parser.add_argument('description', type=unicode, default="", location='form')
parser.add_argument('show', type=lambda x: x == unicode('true'), location='form',
                    required=True, help='Show/Hide flag required')
parser.add_argument('private', type=lambda x: x == unicode('true'), location='form',
                    default=False, help='Private/Public flag required')
parser.add_argument('export_to_pdf', type=lambda x: x == unicode('true'), location='form',
                    default=True, help='Export to PDf flag required')
parser.add_argument('parent', type=unicode, location='form', default=None)
parser.add_argument('icon_id', type=int, location='form')
parser.add_argument('resource_id', type=int, location='form')
parser.add_argument('remove_icon', type=lambda x: x ==
                    unicode('true'), default=False, location='form')
parser.add_argument('video', type=json.loads, location='form', default=[])
parser.add_argument('related_products', type=list, location='form')
parser.add_argument('tags', type=json.loads, location='form', default=[])
parser.add_argument('cta_list', type=json.loads, location='form', default=[])
parser.add_argument('is_restriction_enabled', type=lambda x: x ==
                    unicode('true'), location='form', default=False)
parser.add_argument('restricted_to_groupids',
                    type=json.loads, location='form', default=[])
parser.add_argument('expire_at', type=unicode, location='form', default=None)
parser.add_argument('journey_ids', type=json.loads, location='form', default=[])


class SectionApi(Resource):

    @check_user_access
    def get(self, slug=None, **kwargs):
        # Parameters which define if an anon-user(anonymous)
        # trying to access a private content.
        # Values are set thru 'check_user_access'.
        anonymous_user = False
        if kwargs.get('ret_url'):
            # Set to True, when an anon-user tries to access a private content.
            anonymous_user = True

        if slug:
            response = get_section_api(slug)
            if response['status'] == 'NOT_FOUND':
                raise SharedemosException(404)
            if response['status'] == 'FORBIDDEN':
                raise SharedemosException(403)
            if response['status'] == 'REDIRECT':
                return response['slug'], 302

            if response['status'] == 'FOUND' and anonymous_user\
                    and response['section']['product']['is_private']:
                return kwargs, 200

            return response['section'], 200

        response = get_products_api()
        if anonymous_user and response['tenant'].get('is_private') and\
                not response['all_products']:
            return kwargs, 200

        return response, 200

    @has_author_access
    def post(self):

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        post_data = parser.parse_args()
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('name'))

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(post_data['name']) > 110:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED % 'name')

        if post_data.get('description') and\
                len(post_data['description']) > 260:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description')

        section_parent = None
        if post_data['parent']:
            section_parent = Section.query.filter_by(
                tenant_id=tenant_id, slug=post_data['parent']).first_or_404()
            if not section_parent.can_edit():
                raise SharedemosException(
                    403, message=SharedemosException.ACCESS_RESTRICTED
                )

        # Validation- If a section has a parent with asset linked to it,
        # then it should not have any children.
        if section_parent:
            # If repository sync status for parent section is in progress,
            # then add restriction for creating new section under it.
            repository_details = section_parent.get_repository_details()
            parent_translation = section_parent.get_locale_translation(
                session["author"]["locale"]
            )
            if parent_translation.resource_id or\
                    repository_details.get("sync_status") == u"IN_PROGRESS":
                raise SharedemosException(403)
            parent_id = section_parent.id
        else:
            parent_id = None

        nth_child = Section.query.filter_by(
            tenant_id=tenant_id,
            parent_id=parent_id,
            is_deleted=False
        ).order_by(Section.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        section = Section()
        section.parent = section_parent
        section.tenant_id = tenant_id
        section.order = order
        section.is_hidden = not post_data['show']
        section.is_private = post_data['private']

        translation = SectionTranslations()
        translation.language_id = session['author']['locale']
        translation.name = translation.title = post_data['name']
        translation.description = post_data.get('description')

        # Add tags, resource information.
        translation.tag_ids = create_update_tags(post_data['tags']) or None
        translation.resource_id = post_data.get('resource_id')
        translation.section = section
        db.session.add(translation)

        # Validation- If a section has asset linked to it,
        # then it should not have videos.
        if not post_data.get('resource_id'):
            video_links = post_data.get('video') or []
            for video_data in video_links:
                if video_data.get('video_url'):
                    video = SectionVideo()
                    video.link = video_data['video_url']
                    if video_data.get('poster_url'):
                        video.poster_image = video_data['poster_url']
                    video.language_id = session['author']['locale']
                    section.videos.append(video)

        section.icon_id = post_data['icon_id']

        # Section CTA.
        # {
        #     'options': {
        #         'type': 'CTA_TYPE',
        #         'text': 'BUTTON_TEXT',
        #         'href': 'LINK',
        #         'path': 'MEDIA_PATH',
        #     },
        #     'name': 'section name(if link) / file name(if pdf)',
        # }
        if post_data.get('cta_list'):
            cta_data = post_data['cta_list']
            if cta_data.get('added'):
                for _new in cta_data['added']:
                    # If cta type is 'pdf', then save the uploaded pdf,
                    # and save the file path to cta path.
                    # If cta type is 'link', then save the json data as it is.
                    if _new['options']['type'] == 'pdf':
                        file_path = save_cta_file(
                            request.files.get(_new['file']),
                            tenant.unique_tenant_id
                        )
                        _new['options']['path'] = file_path
                    cta = create_cta(_new, tenant.default_locale_id)
                    section.cta_list.append(cta)

        section.created_by = session.get('user_id')
        section.modified_by = session.get('user_id')

        # Restrictions is only available in private tenants.
        if (
            tenant.flags.is_private and
            'is_restriction_enabled' in post_data and
            post_data['is_restriction_enabled']
        ):
            group_ids = post_data.get('restricted_to_groupids')
            validate_user_group(
                group_ids,
                tenant_id
            )   # raises exception if validation fails.
            section.restricted_to_groups = get_usergroups(
                group_ids
            )

        db.session.add(section)

        # Schedule disable - EOL (End of life).
        if post_data.get('expire_at'):
            db.session.flush()  # To get the section.id

            expiry_date = datetime.strptime(
                str(post_data['expire_at']),
                '%Y-%m-%dT%H:%M'
            )
            expiry_entity = ExpireEntity(section)
            expiry_entity.new(expiry_date)
            # In POST, there is no scenario to handle update/delete eol.
        for index, journey_id in enumerate(post_data['journey_ids'], start=1):
            section_journey = SectionJourneys()
            section_journey.journey_id = journey_id
            section_journey.order = index
            section_journey.tenant_id = tenant_id
            section_journey.section_id = section.id
            db.session.add(section_journey)

        log_activity_feed(
            entity=u'section',
            action=u'created',
            section=section
        )
        db.session.commit()
        section = get_complete_section_details(section)

        from sharedemos.tasks import (
            delete_api_cache_data,
            upload_to_algolia
        )
        if translation.resource_id:
            upload_to_algolia.delay({
                'category': 'section',
                'section_id': section.id,
                'tenant_id': tenant_id
            })

        if not section.parent_id:
            delete_cache_with_pattern(
                delete_entity_type='all_products',
                clear_all_products=True,
                tenant=tenant
            )
        else:
            delete_api_cache_data.delay({
                'entity': 'section',
                'model_id': section.id,
                'delete_pattern': True,
                'delete_parent': bool(section.parent_id),
                'clear_all_products': not bool(section.parent_id),
                'tenant_id': tenant_id
            })

        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'tenant_id': tenant.id
        })

        return format_data(marshal(section, section_api_fields)), 200

    @has_author_access
    def put(self, slug):
        """
        Section Api 'PUT' handles updating.

        the title, description, tags, videos, icons of the Section(Translations).
        also updates is_hidden, can_download, is_private, modified_by flags.
        updates Rackspace and Algolia content, clear the caches at last.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        section = Section.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first_or_404()

        repository_details = section.get_repository_details()
        if not section.can_edit() or\
                repository_details.get("sync_status") == u"IN_PROGRESS":
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        put_data = parser.parse_args()
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('name'))

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(put_data['name']) > 110:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED % 'name')

        if put_data.get('description') and\
                len(put_data.get('description')) > 260:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description')

        # Update section translation
        translation = section.get_locale_translation(
            session["author"]["locale"])
        if not translation:
            translation = SectionTranslations()
            translation.language_id = session['author']['locale']
            translation.section = section

        is_name_changed = False
        activity_list = []
        resources_to_delete = []
        if translation.name != put_data['name']:
            is_name_changed = True
            title_action = u'added'
            if translation.name:
                title_action = u'edited'
            activity_list.append({
                'action': title_action,
                'attribute': u'title'
            })
        translation.name = translation.title = put_data['name']

        if translation.description != put_data.get('description'):
            is_name_changed = True
            description_action = u'edited'
            if translation.description and not put_data.get('description'):
                description_action = u'deleted'
            elif not translation.description and put_data.get('description'):
                description_action = u'added'
            activity_list.append({
                'action': description_action,
                'attribute': u'description'
            })
        translation.description = put_data.get('description')

        has_asset = False
        # Update the linked asset.
        if put_data.get('resource_id'):
            translation.resource_id = put_data.get('resource_id')
            is_name_changed = True
            has_asset = True

        # handling cta data
        if put_data.get('cta_list'):
            update_cta_details(section, put_data['cta_list'])

        # Update Journeys associated with section
        incomming_journey_ids = put_data['journey_ids']
        section_journeys = SectionJourneys.query.join(
            Section, SectionJourneys.section_id == section.id).join(
            Journey).with_entities(SectionJourneys).order_by(SectionJourneys.order).all()

        for sec_journey in section_journeys:
            if sec_journey.journey_id not in incomming_journey_ids:
                    db.session.delete(sec_journey)
            else:
                sec_journey.order = incomming_journey_ids.index(sec_journey.journey_id) + 1
                db.session.add(sec_journey)
        section_journey_ids = [sec_journey.journey_id for sec_journey in section_journeys]

        for index, j_id in enumerate(incomming_journey_ids, start=1):
            if j_id not in section_journey_ids:
                section_journey = SectionJourneys()
                section_journey.journey_id = j_id
                section_journey.section_id = section.id
                section_journey.order = index
                section_journey.tenant_id = tenant_id
                db.session.add(section_journey)

        # Add/Update tags information
        tag_ids = create_update_tags(put_data['tags'])\
            if put_data['tags'] else None
        tag_action = None
        if translation.tag_ids and not tag_ids:
            tag_action = u'deleted'
        elif translation.tag_ids and\
                len(translation.tag_ids) != len(tag_ids):
            tag_action = u'edited'
        elif not translation.tag_ids and tag_ids:
            tag_action = u"added"
        if tag_action:
            activity_list.append({
                'action': tag_action,
                'attribute': u'tags'
            })

        translation.tag_ids = tag_ids
        db.session.add(translation)

        icon_to_remove = None
        icon_action = None
        if put_data['icon_id']:
            new_icon = IconLibrary.query.get(put_data['icon_id'])
            if not section.icon_id:
                icon_action = u'added'
            elif section.icon_id != new_icon.id:
                icon_to_remove = section.icon
                resources_to_delete.append(icon_to_remove)
                icon_action = u'edited'
            section.icon = new_icon
        elif put_data['remove_icon']:
            icon_to_remove = section.icon
            resources_to_delete.append(icon_to_remove)
            icon_action = u'deleted'
            section.icon = None
        if icon_action:
            activity_list.append({
                'action': icon_action,
                'attribute': u'icon'
            })
        if section.is_hidden == put_data['show']:
            action = u'hidden'
            if put_data['show']:
                action = u'shown'
            activity_list.append({
                'action': action
            })
        section.is_hidden = not put_data['show']
        if section.is_hidden:
            delete_link_from_bboard(u'section', section.id)

        if section.can_download != put_data.get('export_to_pdf')\
                or section.is_private != put_data.get('private'):
            activity_list.append({'action': u'edited'})
        section.can_download = put_data['export_to_pdf']
        section.is_private = put_data['private']
        section.modified_by = session.get('user_id')

        locale_id = session['author']['locale']

        # Validation- If a section has asset linked to it,
        # then it should not have videos.
        if not has_asset:
            section_videos = section.videos
            video_list_in_db = {
                v.link: v for v in section_videos
                if v.language_id == locale_id
            }
            video_action = None
            if video_list_in_db and not put_data['video']:
                video_action = u'deleted'
            elif not video_list_in_db and put_data['video']:
                video_action = u'added'
            if video_action:
                activity_list.append({
                    'action': video_action,
                    'attribute': u'videos'
                })

            for v_item in put_data['video']:
                if v_item['video_url'] and \
                        v_item['video_url'] not in video_list_in_db.keys():
                    video = SectionVideo()
                    video.language_id = locale_id
                    video.section_id = section.id
                    video.link = v_item['video_url']
                    video.poster_image = v_item.get('poster_url')
                    db.session.add(video)

            video_list_in_api = [v['video_url'] for v in put_data['video']]
            for v_link, video in video_list_in_db.items():
                if v_link not in video_list_in_api:
                    resources_to_delete.append(video)

        from sharedemos.tasks import (
            update_algolia_content,
            delete_api_cache_data
        )
        tenant = section.tenant
        # Restrictions is only available in private tenants.
        if (
            tenant.flags.is_private and
            'is_restriction_enabled' in put_data
        ):
            # if restrictions is enabled, then update the group id info,
            # else clear the restrictions.
            if put_data['is_restriction_enabled']:
                group_ids = put_data.get('restricted_to_groupids')
                validate_user_group(
                    group_ids,
                    tenant_id
                )   # raises exception if validation fails.

                # get_usergroups returns groups in sorted order.
                user_groups = get_usergroups(
                    group_ids
                )
                # 'restricted_to_groups' returns group info in sorted order.
                if section.restricted_to_groups != user_groups:
                    section.restricted_to_groups = user_groups
                    activity_list.append({
                        'action': u'updated',
                        'attribute': u'access to {}'.format(user_groups)
                    })

                for bulletin_board in section.bulletin_boards:
                    bulletin_board.restricted_to_groups = user_groups

            elif section.restricted_to_groups:
                section.restricted_to_groups = []
                activity_list.append({
                    'action': u'removed',
                    'attribute': u'restrictions'
                })

            reset_user_groups(section)

            all_children = get_all_children(section.children)
            all_playlists = None
            if all_children:
                # 'get_all_children' will return empty if there are no valid children.
                all_playlists = get_all_playlists(all_children)
            else:
                all_playlists = get_all_playlists([section])

            if all_playlists:
                all_chapters = get_all_chapters(all_playlists)
                for chapter in all_chapters:
                    update_algolia_content.delay({
                        'entity': 'walkthrough',
                        'entity_id': chapter.id,
                        'tenant_id': tenant_id,
                        'action': 'UPDATE',
                        'groups': put_data['restricted_to_groupids'],
                    })

        # Schedule disable - EOL (End of life).
        if 'expire_at' in put_data:
            expiry_entity = ExpireEntity(section)
            if put_data['expire_at']:
                expiry_date = datetime.strptime(
                    str(put_data['expire_at']),
                    '%Y-%m-%dT%H:%M'
                )
                if section.expire_at != expiry_date:
                    if not expiry_entity.job.id or not expiry_entity.job.created_by:
                        expiry_entity.new(expiry_date)
                    else:
                        expiry_entity.update(expiry_date)
            else:
                expiry_entity.delete()

        db.session.add(section)
        for resource in resources_to_delete:
            db.session.delete(resource)

        for activity in activity_list:
            log_activity_feed(
                entity=u'section',
                action=activity.get('action'),
                attribute=activity.get('attribute'),
                section=section
            )
        db.session.commit()

        section = get_complete_section_details(section)

        update_algolia_content.delay({
            'entity': 'section',
            'entity_id': section.id,
            'tenant_id': tenant_id,
            'action': 'UPDATE',
            'is_private': section.is_private,
            'is_enabled': section.is_enabled and not section.is_hidden,
            'is_name_changed': is_name_changed
        })

        old_slug_cache_list = construct_cache_key_list(
            entity='section', slug=slug, tenant=tenant
        )
        cache = getattr(current_app, 'cache', None)
        for old_slug_key in old_slug_cache_list:
            cache.delete(old_slug_key)

        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_pattern': True,
            'delete_parent': bool(section.parent_id),
            'delete_children': bool(section.children or section.playlists),
            'clear_all_products': not bool(section.parent_id),
            'tenant_id': tenant_id
        })

        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'clear_all_products': True,
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant_id
        })

        remove_pdf(slug)
        return format_data(marshal(section, section_api_fields)), 201

    @has_author_access
    def patch(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)
        # slug - will be parent's-slug only for 'import' request,
        # which is comming from backbone api call, else it'll be current's
        # slug.
        section = Section.query.filter_by(
            tenant_id=tenant_id, slug=slug, is_deleted=False).first()

        if section and not section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )
        delete_path = section.tenant.template.lower() == u'dell'

        from sharedemos.tasks import (
            delete_api_cache_data, update_algolia_content)

        if 'reorder' in request.json:
            # Site-Map(tree-structure) re-ordering,
            # as well as Author-mode re-ordering.

            # 'reorder' is equal to 'section' if the api call is from backbone.
            if request.json.get('reorder') == 'section':
                current_section = section
                # 'target' in here refers to current-element.
                target_parent_slug = request.json.get('target_parent_slug')
                target_parent_section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    slug=target_parent_slug,
                    is_deleted=False
                ).first()

            # 'reorder' is equal to 'tree_reorder'
            # if the api call is from site-map.
            elif request.json.get('reorder') == 'tree_reorder':
                current_section = section
                target_parent_slug = request.json.get('target_parent_slug')
                target_parent_section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    slug=target_parent_slug,
                    is_deleted=False
                ).first()

            else:
                raise SharedemosException(
                    400, message=SharedemosException.INVALID_REQUEST)

            if not current_section.can_edit():
                raise SharedemosException(
                    403, message=SharedemosException.ACCESS_RESTRICTED
                )

            after_ele_slug = request.json.get('after_ele_slug')
            # In drag-n-drop, the source_section is the current_section, and
            # section is target_parent_section.
            if target_parent_section:
                """
                    Validation:
                        Target parent section should not have any playlists,
                        and it should not have asset linked to it.
                        Asset-Linked sections don't have any children
                        (sections/playlists).
                """
                for playlist in target_parent_section.playlists:
                    if not playlist.is_deleted:
                        raise SharedemosException(403)
                translation = target_parent_section.get_default_translation()
                if translation.resource_id:
                    raise SharedemosException(403)

                delete_api_cache_data.delay({
                    'entity': 'section',
                    'model_id': target_parent_section.id,
                    'delete_pattern': True,
                    'delete_parent': bool(target_parent_section.parent_id),
                    'tenant_id': tenant_id,
                    'delete_path': delete_path
                })

            target_after_section = None
            if after_ele_slug:
                target_after_section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    slug=after_ele_slug,
                    is_deleted=False
                ).first()

            cache_api_kwargs = {
                'entity': 'section',
                'model_id': current_section.id,
                'delete_pattern': True,
                'delete_parent': bool(current_section.parent_id),
                'delete_chapters': True,
                'tenant_id': tenant_id,
                'delete_path': delete_path
            }

            # If re-arrangement is done within a product,
            # then don't remove child walkthroughs from cache,
            # else query and remove all child walkthrough cache items.
            if target_parent_section and current_section.parent_id and\
                    current_section.parent == target_parent_section:
                cache_api_kwargs['delete_chapters'] = False

            delete_api_cache_data.delay(cache_api_kwargs)

            # while reordering is done in 'home-page',
            # delete 'all_products' from cache.
            if not current_section.parent_id or not target_parent_section:
                delete_cache_with_pattern(
                    clear_all_products=True, tenant=section.tenant)

            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'product_tree',
                'tenant_id': tenant_id,
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'dashboard',
                'tenant_id': tenant_id
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'all_playlists',
                'tenant_id': tenant_id
            })
            entity_pattern = 'section*_{}'.format(section.slug)
            delete_cache_with_pattern(
                delete_entity_type=entity_pattern, tenant=section.tenant
            )

            # Parameters are target_parent, target_after_element,
            # current_parent, current_element.
            change_section_order(
                target_parent_section,
                target_after_section,
                current_section.parent,
                current_section)

            current_section.modified_by = session.get('user_id')

            if (
                request.json.get('reorder') == 'tree_reorder' and
                target_parent_section and
                target_parent_section.restricted_to_groups
            ):
                reset_user_groups(target_parent_section)

            db.session.add(current_section)
            log_activity_feed(
                entity=u'section',
                action=u'reordered',
                section=section
            )
            db.session.commit()

            update_algolia_content.delay({
                'entity': 'section',
                'entity_id': section.id,
                'tenant_id': tenant_id,
                'action': 'UPDATE',
                'reorder': True
            })

            return {"status": "UPDATED"}, 201

        if 'copy' in request.json:
            target_section = Section.query.filter_by(
                slug=slug,
                tenant_id=tenant_id,
                is_deleted=False
            ).first_or_404()
            parent = None
            if request.json.get('parent'):
                parent = Section.query.filter_by(
                    slug=unicode(request.json['parent']),
                    tenant_id=tenant_id,
                    is_deleted=False
                ).first_or_404()

            copy = duplicate_section(target_section, parent, suffix=' (1)')
            copy_status = deep_copy_section(target_section, copy)
            if copy_status == 'COPY_ERROR':
                raise SharedemosException(500, message=copy_status)
            update_siblings_order(parent)
            db.session.commit()

            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'product_tree',
                'clear_all_products': True,
                'tenant_id': tenant_id
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'dashboard',
                'tenant_id': tenant_id
            })

            if parent:
                delete_api_cache_data.delay({
                    'entity': 'section',
                    'model_id': parent.id,
                    'delete_pattern': True,
                    'tenant_id': tenant_id
                })
            else:
                delete_cache_with_pattern(
                    delete_entity_type='all_products', tenant=section.tenant)
                delete_cache_with_pattern(
                    delete_entity_type='supported_languages',
                    tenant=section.tenant)

            return {"status": "UPDATED"}, 201

        # For Product the parent is null
        if not section:
            raise SharedemosException(404)

        if 'is_enabled' in request.json:
            is_enabled = request.json.get('is_enabled')
            section.is_enabled = is_enabled
            action_entity = u'enabled' if is_enabled else u'disabled'
            log_activity_feed(
                entity=u'section',
                action=action_entity,
                section=section
            )
            remove_pdf(section.slug)
            if not is_enabled:
                delete_link_from_bboard(u'section', section.id)
        section.modified_by = session.get('user_id')
        db.session.add(section)
        db.session.commit()

        update_algolia_content.delay({
            'entity': 'section',
            'action': 'UPDATE',
            'entity_id': section.id,
            'tenant_id': tenant_id,
            'is_enabled': section.is_enabled and not section.is_hidden
        })

        section = get_complete_section_details(section)

        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_pattern': True,
            'delete_parent': bool(section.parent_id),
            'delete_children': bool(section.children or section.playlists),
            'clear_all_products': not bool(section.parent_id),
            'tenant_id': tenant_id,
            'delete_path': delete_path
        })

        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'clear_all_products': True,
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'dashboard',
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant_id
        })

        return format_data(marshal(section, section_api_fields)), 201

    @has_author_access
    def delete(self, slug):
        """Mark Section entity as Deleted."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        section = Section.query.filter_by(
            tenant_id=tenant_id, slug=slug, is_deleted=False).first_or_404()

        if not section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        section.is_deleted = True
        section.modified_by = session.get('user_id')

        db.session.add(section)
        log_activity_feed(
            entity=u'section',
            action=u'deleted',
            section=section
        )

        from sharedemos.tasks import (
            update_algolia_content, delete_api_cache_data)

        update_algolia_content.delay({
            'entity': 'section',
            'entity_id': section.id,
            'tenant_id': tenant_id,
            'action': 'DELETE'
        })
        db.session.commit()
        delete_link_from_bboard(u'section', section.id)

        delete_path = section.tenant.template.lower() == u'dell'

        if not section.parent_id:
            entity_pattern = 'section*_{}'.format(section.slug)
            delete_cache_with_pattern(
                delete_entity_type=entity_pattern,
                clear_all_products=True,
                tenant=section.tenant
            )
        else:
            delete_api_cache_data.delay({
                'entity': 'section',
                'model_id': section.id,
                'delete_pattern': True,
                'delete_parent': bool(section.parent_id),
                'delete_children': bool(section.children or section.playlists),
                'clear_all_products': not bool(section.parent_id),
                'tenant_id': tenant_id,
                'delete_path': delete_path
            })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'clear_all_products': True,
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'dashboard',
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant_id
        })
        remove_pdf(slug)
        return {'delete': 'ok'}, 201
