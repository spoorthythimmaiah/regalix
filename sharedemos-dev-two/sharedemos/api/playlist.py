from datetime import datetime
import re
from flask import (
    current_app,
    request,
    session
)
from flask.ext.restful import fields, reqparse, Resource, marshal

from sharedemos.libs.api import (
    format_data,
    get_all_chapters,
    is_author
)
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    ExpireEntity,
    get_translation,
    get_locale_translation,
    remove_pdf,
    reset_user_groups,
)
from sharedemos.libs.model import log_activity_feed
from sharedemos.libs.utils import (
    get_usergroups,
    user_groups_fields,
    set_group_author,
    validate_user_group
)
from sharedemos.models import (
    db, Playlist,
    PlaylistTranslations,
    Section,
    Tenant,
    change_playlist_order,
)


tenant_api_details = {
    "title": fields.String,
    "user_groups": fields.Nested(
        user_groups_fields,
        attribute='_user_groups',
        allow_null=True
    ),
}

playlist_details = {
    "playlist_id": fields.Integer(attribute='id'),
    "order": fields.Integer,
    "name": fields.String(attribute='_name'),
    "description": fields.String(attribute='_description'),
    "can_edit": fields.Boolean(attribute='_can_edit'),
    "is_restriction_set_in_parent": fields.Boolean(
        attribute='_is_restriction_set_in_parent', default=False
    ),
    "restricted_to_group_details": fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
    "tenant": fields.Nested(tenant_api_details),
    "expire_at": fields.DateTime,
}

delete_details = {
    "success_playlist": fields.List(fields.Integer),
    "failed_playlist": fields.List(fields.Integer)
}


def get_playlist_details(playlist):
    """Get detailed information of a playlist for the locale."""
    playlist_translation = get_translation(playlist)
    playlist._name = playlist_translation.name
    playlist._description = playlist_translation.description
    if is_author():
        playlist._restricted_to_group_details = playlist.get_restricted_to_groups()[0]
        set_group_author(playlist._restricted_to_group_details)
        parent_groups, _ = playlist.section.get_restricted_to_groups()
        playlist._is_restriction_set_in_parent = bool(parent_groups)

    tenant = playlist.tenant
    tenant._user_groups = tenant.user_groups if tenant.flags.is_private else None
    if tenant._user_groups:
        set_group_author(tenant._user_groups)

    return playlist


parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=unicode,
                    location='json', help='Playlist name required')
parser.add_argument('description', type=unicode, default="", location='json')
parser.add_argument('section_id', required=True, type=unicode,
                    location='json', help='Section id required')
parser.add_argument('is_restriction_enabled', type=bool, location='json', default=False)
parser.add_argument('restricted_to_groupids', type=list, location='json', default=[])
parser.add_argument('expire_at', type=unicode, location='json', default=None)

delete_playlist_parser = reqparse.RequestParser()
delete_playlist_parser.add_argument('playlist_ids', type=list,
                                    location='json', default=[])


def delete_playlist(playlist):
    """Function to delete playlist and add that to activity feed."""
    status = True
    try:
        playlist.is_deleted = True
        playlist.modified_by = session.get('user_id')
        db.session.add(playlist)

        log_activity_feed(
            entity=u'playlist',
            action=u'deleted',
            section=playlist.section,
            playlist=playlist
        )
    except Exception:
        status = False
    return status


class PlaylistApi(Resource):
    """REST API class to handle GET, POST, PUT, PATCH, DELETE requests."""

    method_decorators = [has_author_access]

    def get(self, playlist_id):
        """Get author specific or user specific playlist information."""
        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            raise SharedemosException(404)

        playlist._can_edit = playlist.section.can_edit()
        playlist = get_playlist_details(playlist)

        return format_data(marshal(playlist, playlist_details))

    def post(self):
        """Create a new playlist under a section."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, SharedemosException.DEFAULT_TRANSLATION_MISSING %
                tenant.default_locale.name)

        post_data = parser.parse_args()

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(post_data['name']) > 85:
            raise SharedemosException(
                412, SharedemosException.LENGTH_EXCEEDED % 'name')

        if post_data.get('description') and\
                len(post_data['description']) > 250:
            raise SharedemosException(
                412, SharedemosException.LENGTH_EXCEEDED % 'description')

        section = Section.query.filter(
            (Section.slug == post_data['section_id']) &
            (Section.tenant_id == tenant_id) &
            (Section.is_deleted.__eq__(False))
        ).first_or_404()

        if not section.can_edit():
            raise SharedemosException(403)

        # Validation- If a section has an asset linked to it,
        # then it should not have any playlists.
        section_translation = get_locale_translation(section)
        if section_translation.resource_id:
            raise SharedemosException(403)

        playlist = Playlist()
        playlist.order = len(section.playlists) + 1
        playlist.section = section
        playlist.tenant_id = tenant_id

        playlist.created_by = session.get('user_id')
        playlist.modified_by = session.get('user_id')

        translation = PlaylistTranslations()
        translation.name = unicode(post_data['name'])
        translation.description = post_data.get('description')
        translation.language_id = session['author']['locale']
        translation.playlist = playlist

        # Restrictions is only available in private tenants.
        if (
            tenant.flags.is_private and
            'is_restriction_enabled' in post_data and
            post_data['is_restriction_enabled']
        ):
            validate_user_group(post_data['restricted_to_groupids'], tenant_id)   # raises exception if validation fails.
            playlist.restricted_to_groups = get_usergroups(
                post_data['restricted_to_groupids']
            )
        db.session.add_all([playlist, translation])

        # Schedule disable - EOL (End of life).
        if post_data.get('expire_at'):
            db.session.flush()  # To get the playlist.id
            expiry_date = datetime.strptime(
                str(post_data['expire_at']),
                '%Y-%m-%dT%H:%M'
            )
            expiry_entity = ExpireEntity(playlist)
            expiry_entity.new(expiry_date)
            # In POST, there is no scenario to handle update/delete eol.

        log_activity_feed(
            entity=u'playlist',
            action=u'created',
            section=section,
            playlist=playlist
        )
        db.session.commit()
        # Remove the old-pdf after a new playlist has been added.
        remove_pdf(section.slug)

        playlist = get_playlist_details(playlist)

        from sharedemos.tasks import delete_api_cache_data
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_pattern': True,
            'delete_parent': bool(section.parent_id),
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'tenant_id': tenant_id,
        })

        return format_data(marshal(playlist, playlist_details)), 200

    def put(self, playlist_id):
        """
        Method to update playlist information.

        If there is an update on user restrictions,
        then clear the restrictions for the chapters under this playlist.
        Clear cache, remove pdf, update algolia and log activity
        after updating the playlist information.
        """
        put_data = parser.parse_args()

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        playlist = Playlist.query.get(playlist_id)
        if not playlist:
            raise SharedemosException(404)

        if not playlist.section.can_edit():
            raise SharedemosException(403)

        if len(put_data['name']) > 85:
            raise SharedemosException(
                412, SharedemosException.LENGTH_EXCEEDED % 'name')

        if put_data.get('description') and len(put_data['description']) > 250:
            raise SharedemosException(
                412, SharedemosException.LENGTH_EXCEEDED % 'description')

        plist_trans = get_locale_translation(playlist)
        if not plist_trans:
            plist_trans = PlaylistTranslations()
            plist_trans.language_id = session['author']['locale']
            plist_trans.playlist_id = playlist.id

        activity_list = []
        if plist_trans.name != put_data.get('name'):
            title_action = u'added'
            if plist_trans.name:
                title_action = u'edited'
            activity_list.append({
                'action': title_action,
                'attribute': u'title'
            })
        plist_trans.name = put_data.get('name')

        description = put_data.get('description')
        if plist_trans.description != description:
            description_action = u'edited'
            if plist_trans.description and not description:
                description_action = u'deleted'
            elif not plist_trans.description and description:
                description_action = u'added'
            activity_list.append({
                'action': description_action,
                'attribute': u'description'
            })
        plist_trans.description = description

        playlist.modified_by = session.get('user_id')

        from sharedemos.tasks import (
            delete_api_cache_data, update_algolia_content
        )
        # Restrictions is only available in private tenants.
        tenant = playlist.tenant
        section = playlist.section
        if (
            tenant.flags.is_private and
            'is_restriction_enabled' in put_data
        ):
            # if restrictions is enabled, then update the group id info,
            # else clear the restrictions.
            if put_data['is_restriction_enabled']:
                validate_user_group(put_data['restricted_to_groupids'], tenant.id)   # raises exception if validation fails.
                # get_usergroups returns groups in sorted order.
                user_groups = get_usergroups(
                    put_data['restricted_to_groupids']
                )
                # 'restricted_to_groups' returns group info in sorted order.
                if playlist.restricted_to_groups != user_groups:
                    playlist.restricted_to_groups = user_groups
                    activity_list.append({
                        'action': u'updated',
                        'attribute': u'access to {}'.format(user_groups)
                    })

            elif playlist.restricted_to_groups:
                playlist.restricted_to_groups = []
                activity_list.append({
                    'action': u'removed',
                    'attribute': u'restrictions'
                })

            reset_user_groups(playlist)

            all_chapters = get_all_chapters([playlist])
            for chapter in all_chapters:
                update_algolia_content.delay({
                    'entity': 'walkthrough',
                    'entity_id': chapter.id,
                    'tenant_id': tenant.id,
                    'action': 'UPDATE',
                    'groups': put_data['restricted_to_groupids'],
                })

        # Schedule disable - EOL (End of life).
        if 'expire_at' in put_data:
            expiry_entity = ExpireEntity(playlist)
            if put_data['expire_at']:
                expiry_date = datetime.strptime(
                    str(put_data['expire_at']),
                    '%Y-%m-%dT%H:%M'
                )
                if playlist.expire_at != expiry_date:
                    if not expiry_entity.job.id or not expiry_entity.job.created_by:
                        expiry_entity.new(expiry_date)
                    else:
                        expiry_entity.update(expiry_date)
            else:
                expiry_entity.delete()

        db.session.add_all([playlist, plist_trans])

        for activity in activity_list:
            log_activity_feed(
                entity=u'playlist',
                action=activity.get('action'),
                attribute=activity.get('attribute'),
                section=section,
                playlist=playlist
            )
        db.session.commit()

        # Remove the old-pdf after a playlist has been modified.
        remove_pdf(section.slug)
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_children': True,
            'delete_pattern': True,
            'tenant_id': tenant.id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'tenant_id': tenant.id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant.id
        })

        playlist = get_playlist_details(playlist)
        return format_data(marshal(playlist, playlist_details)), 200

    def patch(self, playlist_id):
        """
        Method to handle different actions on a Playlist.

        'reorder'    - handles both sitemap and playlist page reorder.
        'is_enabled' - enables/disables a playlist.
        After performing any of the actions-
            cache, pdf is removed,
            algolia content is updated,
            activity is logged.
        """
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        playlist = Playlist.query.get(playlist_id)
        current_section = None
        delete_path = tenant.template.lower() == u'dell'
        if not playlist:
            raise SharedemosException(404)

        if not playlist.section.can_edit():
            raise SharedemosException(403)

        from sharedemos.tasks import (
            delete_api_cache_data,
            update_algolia_content
        )
        if 'reorder' in request.json:
            algolia_action = 'REORDER'
            # Site-Map, tree-structure re-ordering.
            target_parent_slug = request.json.get('target_parent_slug')

            # in author-reordering, target parent slug is playlist's section
            if request.json.get('within_section'):
                target_parent_slug = playlist.section.slug

            target_parent_section = Section.query.filter_by(
                tenant_id=tenant_id,
                slug=target_parent_slug
            ).first_or_404()

            # Check if the target parent section has child-sections.
            for child in target_parent_section.children:
                if not child.is_deleted:
                    raise SharedemosException(403)

            # after_ele_slug - refers to Playlist-ID.
            target_after_playlist = None
            if request.json.get('after_ele_slug'):
                target_after_playlist = Playlist.query.get(
                    request.json.get('after_ele_slug'))

            current_section = playlist.section

            # Change the order of the playlists.
            change_playlist_order(target_parent_section,
                                  target_after_playlist,
                                  current_section,
                                  playlist)

            if current_section != target_parent_section:
                # Reset group info on re-arranging to another section.
                playlist.restricted_to_groups = []
                # Reset group info of walkthroughs under the playlist.
                reset_user_groups(playlist)

            delete_api_cache_data.delay({
                'entity': 'section',
                'model_id': current_section.id,
                'delete_children': True,
                'delete_pattern': True,
                'tenant_id': tenant_id,
                'delete_path': delete_path
            })

            delete_api_cache_data.delay({
                'entity': 'section',
                'model_id': target_parent_section.id,
                'delete_children': True,
                'delete_pattern': True,
                'tenant_id': tenant_id,
                'delete_path': delete_path
            })

            log_activity_feed(
                entity=u'playlist',
                action=u'reordered',
                section=playlist.section,
                playlist=playlist
            )

        playlist.modified_by = session.get('user_id')
        section = playlist.section

        if 'is_enabled' in request.json:
            algolia_action = 'UPDATE'
            is_enabled = request.json['is_enabled']
            playlist.is_enabled = is_enabled
            action_entity = 'enabled' if is_enabled else 'disabled'

            log_activity_feed(
                entity=u'playlist',
                action=action_entity,
                section=section,
                playlist=playlist
            )

        db.session.add(playlist)
        db.session.commit()

        update_algolia_content.delay({
            'entity': 'playlist',
            'entity_id': playlist.id,
            'tenant_id': tenant_id,
            'action': algolia_action,
            'is_enabled': playlist.is_enabled
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
            'tenant_id': tenant_id,
        })
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_children': True,
            'delete_pattern': True,
            'tenant_id': tenant_id,
            'delete_path': delete_path
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant_id
        })
        """
            Remove the old-pdf after a playlist has been modified.
            If Re-Ordered thru site-map,
            then delete pdfs on both target, current section.
        """
        remove_pdf(section.slug)
        if current_section:
            remove_pdf(current_section.slug)

        playlist = get_playlist_details(playlist)
        return format_data(marshal(playlist, playlist_details)), 200

    def delete(self, playlist_id=None):
        """Mark playlist entity as deleted, clear cache, update algolia and log activity."""
        delete_data = delete_playlist_parser.parse_args()
        playlist_ids = delete_data.get('playlist_ids', [])

        if not playlist_id and not playlist_ids:
            raise SharedemosException(
                400, message='PLAYLIST IS MISSING'
            )

        if playlist_id:
            playlist_ids = [playlist_id]

        tenant_id = current_app.tenant_id

        playlists = Playlist.query.join(Section).filter(
            Playlist.id.in_(playlist_ids),
            Playlist.tenant_id == tenant_id
        ).all()

        if not playlists:
            raise SharedemosException(404)

        section = playlists[0].section
        if not section.can_edit():
            raise SharedemosException(403)

        success_playlist = []
        failed_playlist = []
        delete_response = {}

        for playlist in playlists:
            is_deleted = delete_playlist(playlist)
            if is_deleted:
                success_playlist.append(playlist.id)
            else:
                failed_playlist.append(playlist.id)

        delete_response = {
            'success_playlist': success_playlist,
            'failed_playlist': failed_playlist
        }

        db.session.commit()

        # Remove the old-pdf after a playlist has been deleted.
        remove_pdf(section.slug)

        from sharedemos.tasks import update_algolia_content, delete_api_cache_data
        for playlist in playlists:
            update_algolia_content.delay({
                'entity': 'playlist',
                'entity_id': playlist.id,
                'tenant_id': tenant_id,
                'action': 'DELETE'
            })
        delete_path = playlist.tenant.template.lower() == u'dell'
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'dashboard',
            'tenant_id': tenant_id
        })
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'delete_children': True,
            'delete_pattern': True,
            'tenant_id': tenant_id,
            'delete_path': delete_path
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant_id
        })
        return format_data(marshal(delete_response, delete_details)), 200
