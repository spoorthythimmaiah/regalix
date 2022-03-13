from datetime import datetime
import re

from flask import (
    current_app,
    g,
    jsonify,
    request,
    session
)
from flask.ext.restful import fields, marshal, reqparse, Resource
from sqlalchemy import event
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.libs.api import (
    format_data,
    is_author
)
from sharedemos.libs.bulletin_board import (
    delete_link_from_bboard
)
from sharedemos.libs.decorators import check_user_access, has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    ExpireEntity,
    check_parent_restriction,
    get_default_translation,
    get_locale_translation,
    get_translation,
    log_last_activity,
    remove_pdf,
)
from sharedemos.libs.model import (
    log_activity_feed,
    model_slugify,
    update_model_slug_revision
)
from sharedemos.libs.utils import (
    chapter_api_fields,
    copy_chapter,
    create_update_tags,
    get_chapter_api,
    get_complete_walkthrough_details,
    get_latest_entity,
    get_usergroups,
    load_chapter_metadata,
    multiple_chapter_api_fields,
    validate_user_group
)
from sharedemos.models import (
    db,
    change_published_walkthrough_order,
    change_slide_order,
    change_walkthrough_order,
    create_walkthrough_slug,
    DraftHotspot,
    DraftHotspotTranslations,
    DraftSlide,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Hotspot,
    HotspotTranslations,
    Pin, PinTranslations,
    Playlist,
    Resource as ResourceModel,
    Section,
    Slide,
    SlideTranslations,
    Tenant,
    update_walkthrough_slug,
    Walkthrough,
    WalkthroughTranslations,
)

chapter_fields = {
    "slug": fields.String,
    "name": fields.String(attribute='_name')
}

chapter_data_fields = {
    'name': fields.String,
    'slug': fields.String,
    'url': fields.String,
    'playlist_id': fields.Integer,
    'playlist_name': fields.String
}


def get_or_create_slide(walkthrough, order):
    """Return draft_slide object- existing or new one."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    slide = DraftSlide.query.filter_by(
        tenant_id=tenant_id, walkthrough_id=walkthrough.id,
        order=order, is_deleted=False).first()
    if not slide:
        slide = DraftSlide()
        slide.order = order
        slide.tenant_id = tenant_id
        slide.walkthrough = walkthrough

    return slide


def reorder_demo_slides(walkthrough):
    """Reorder slides in walkthrough."""
    last_active_slide_order = 1
    for slide in walkthrough.slides:
        if slide.is_deleted:
            continue

        slide.order = last_active_slide_order
        db.session.add(slide)
        last_active_slide_order += 1


def update_siblings_order(playlist):
    """Update order of the sibling walkthroughs in a playlist."""
    order = 1
    for chapter in playlist.draft_walkthroughs:
        chapter.order = order
        order += 1
        db.session.add(chapter)


def publish_chapter(chapter):
    """Return the Boolean value after publishing a chapter."""
    status = True
    try:
        draft_slides = [sl for sl in chapter.slides if not sl.is_deleted]
        if not len(draft_slides):
            raise SharedemosException(412, message='chapter is empty')

        """
        Remove the event listeners associated with
        WalkthroughTranslations,
        since during publishing, the slug is updated manually,
        by calling the 'model_slugify()'.
        Re-Attach event listeners after publish.
        """

        event.remove(WalkthroughTranslations,
                     'after_insert',
                     create_walkthrough_slug)
        event.remove(WalkthroughTranslations,
                     'after_update',
                     update_walkthrough_slug)

        chapter.is_enabled = True
        if chapter.published:
            published_chapter = chapter.published
            published_chapter.is_enabled = True
            published_chapter.slides = []
            published_chapter.hotspots = []
        else:
            published_chapter = Walkthrough()
            published_chapter.created_by = session.get('user_id')

        published_chapter.unique_id = chapter.unique_id
        published_chapter.modified_by = session.get('user_id')
        tenant_id = chapter.tenant_id
        model_id = getattr(published_chapter, 'id', None)
        new_slug = model_slugify(
            input_text=chapter.slug,
            rec_id=model_id,
            tenant_id=tenant_id,
            primary_model=Walkthrough,
            secondary_model=DraftWalkthrough,
            slugfield="slug",
            draft_id=chapter.id
        )

        if published_chapter.slug and published_chapter.slug != new_slug:
            update_model_slug_revision(
                new_slug=new_slug,
                tenant_id=tenant_id,
                model=published_chapter
            )

        published_chapter.slug = new_slug
        published_chapter.resource_hostname = chapter.resource_hostname
        published_chapter.order = chapter.order
        published_chapter.tenant_id = tenant_id
        published_chapter.playlist_id = chapter.playlist_id
        chapter.published = published_chapter
        db.session.add_all([published_chapter, chapter])

        pub_trans = [tr.language_id for tr in published_chapter.translations]
        for dr_trans in chapter.translations:
            if dr_trans.language_id not in pub_trans:
                trans = WalkthroughTranslations()
                trans.language_id = dr_trans.language_id
                trans.walkthrough = published_chapter
            else:
                trans = get_locale_translation(
                    published_chapter, dr_trans.language_id)

            trans.name = dr_trans.name
            trans.title = dr_trans.title
            trans.tag_ids = dr_trans.tag_ids
            db.session.add(trans)

        slide_order = 1
        for dr_sl in draft_slides:
            slide = Slide()
            slide.order = slide_order
            slide.is_deleted = dr_sl.is_deleted
            slide.secondary_resource_id = dr_sl.secondary_resource_id
            slide.tenant_id = dr_sl.tenant_id
            slide.walkthrough = published_chapter
            db.session.add(slide)

            for dr_trans in dr_sl.translations:
                sl_trans = SlideTranslations()
                sl_trans.name = dr_trans.name
                sl_trans.notes = dr_trans.notes
                sl_trans.language_id = dr_trans.language_id
                sl_trans.slide = slide
                db.session.add(sl_trans)

            for dr_hotspot in dr_sl.hotspots:
                hotspot = Hotspot()
                hotspot.display = dr_hotspot.display
                hotspot.action = dr_hotspot.action
                hotspot.hotspot_type = dr_hotspot.hotspot_type
                hotspot.tenant_id = dr_hotspot.tenant_id
                hotspot.slide = slide
                db.session.add(hotspot)

                for dr_trans in dr_hotspot.translations:
                    hsp_trans = HotspotTranslations()
                    hsp_trans.callout = dr_trans.callout
                    hsp_trans.language_id = dr_trans.language_id
                    hsp_trans.hotspot = hotspot
                    db.session.add(hsp_trans)

            for dr_pin in dr_sl.pins:
                pin = Pin()
                pin.order = dr_pin.order
                pin.display = dr_pin.display
                pin.tenant_id = dr_pin.tenant_id
                pin.slide = slide
                db.session.add(pin)

                for dr_trans in dr_pin.translations:
                    pin_trans = PinTranslations()
                    pin_trans.callout = dr_trans.callout
                    pin_trans.language_id = dr_trans.language_id
                    pin_trans.pin = pin
                    db.session.add(pin_trans)

            primary_res = dr_sl.primary_resource
            if primary_res.resource_type == u'content':
                new_resource = ResourceModel()
                new_resource.name = primary_res.name
                new_resource.tenant_id = primary_res.tenant_id
                new_resource.language_id = primary_res.language_id
                new_resource.resource_type = primary_res.resource_type
                new_resource.meta_data = primary_res.meta_data
                new_resource.content = primary_res.content
                db.session.add(new_resource)
                if not new_resource.id:
                    db.session.flush()

                for resouce_trans in primary_res.translations():
                    if resouce_trans.id == primary_res.id:
                        # skip default translation(duplicate/already added above)
                        continue

                    new_multilingual_res = ResourceModel()
                    new_multilingual_res.name = resouce_trans.name
                    new_multilingual_res.tenant_id = resouce_trans.tenant_id
                    new_multilingual_res.language_id = resouce_trans.language_id
                    new_multilingual_res.resource_type = resouce_trans.resource_type
                    new_multilingual_res.content = resouce_trans.content
                    new_multilingual_res.meta_data = MutableDict({
                        'default_res_id': new_resource.id,
                        'is_deleted': False
                    })
                    db.session.add(new_multilingual_res)

                """
                Once the new_resource is added to session and flushed,
                    the 'id' is assigned to slide.primary_resource_id,
                if the new_resource is not in the session then,
                    that new_resource obj is assigned to slide.primary_resource.
                This patch-fix is to prevent committing of previous transactions.
                """
                if getattr(new_resource, 'id'):
                    slide.primary_resource_id = new_resource.id
                else:
                    slide.primary_resource = new_resource
            else:
                slide.primary_resource_id = primary_res.id

            slide_order += 1
        playlist = chapter.playlist
        log_activity_feed(
            entity=u'walkthrough',
            action=u'published',
            section=playlist.section,
            playlist=playlist,
            draft_walkthrough=chapter
        )

        db.session.commit()

        from sharedemos.tasks import (
            server_side_image_generation,
            update_wistia_thumbnail,
            upload_to_algolia,
        )
        # Upload walkthrough resources to rackspacce after walkthrough published
        published_chapter = chapter.published

        # Note: Previously for agolia , draft walkthrough was being used,
        # since a new walkthrough before publishing didn't have an ID.
        # Its now been changed to use published walkthrough after commit.
        upload_to_algolia.delay({
            'category': 'chapter',
            'chapter_id': published_chapter.id,
            'tenant_id': tenant_id
        })

        # check whether the first slide is text-editor, if so save the
        # screenshot as a secondary resource of the slide
        # NOTE: Need slide id to generate thumbnail.
        # So added code snippet here after commit
        first_slide = published_chapter.get_first_slide()
        primary_resource = first_slide.primary_resource
        resource_type = primary_resource.resource_type
        if first_slide and primary_resource:
            if resource_type == u'content':
                server_side_image_generation.delay({
                    'slide_id': first_slide.id,
                    'host': request.host
                })
            elif resource_type == u'wistia':
                update_wistia_thumbnail.delay({
                    'resource_id': primary_resource.id
                })
        # Set of actions to be performed after the model commit.
        remove_pdf(chapter.playlist.section.slug)

    except Exception:
        status = False

    finally:
        event.listen(WalkthroughTranslations,
                     'after_insert',
                     create_walkthrough_slug)
        event.listen(WalkthroughTranslations,
                     'after_update',
                     update_walkthrough_slug)
    return status


def delete_chapter(chapter):
    """Function to delete chapter."""
    status = True
    try:
        chapter.is_deleted = True
        chapter.modified_by = session.get('user_id')

        published_chapter = chapter.published
        if published_chapter:
            published_chapter.is_deleted = True
            db.session.add(published_chapter)

        playlist = chapter.playlist
        log_activity_feed(
            entity=u'walkthrough',
            action=u'deleted',
            section=playlist.section,
            playlist=playlist,
            draft_walkthrough=chapter
        )
        db.session.add(chapter)
    except Exception:
        status = False
    return status


parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=unicode, location='json')
parser.add_argument('playlist_id', required=True, type=int, location='json')
parser.add_argument('tags', type=list, location='json', default=[])
parser.add_argument('is_restriction_enabled', type=bool,
                    location='json', default=False)
parser.add_argument('restricted_to_groupids', type=list,
                    location='json', default=[])
parser.add_argument('expire_at', type=unicode, location='json', default=None)


delete_chapter_parser = reqparse.RequestParser()
delete_chapter_parser.add_argument('chaptersList', type=list,
                                   location='json', default=[])


class WalkthroughApi(Resource):
    """REST API class to handle GET, POST, PUT, PATCH, DELETE requests."""

    @check_user_access
    def get(self, slug=None, **kwargs):
        """Get author specific or user specific walkthrough information."""
        tenant_id = getattr(current_app, 'tenant_id', None)

        # this is used to query/list all chapters for linking/suggestions while
        # authoring Pathfinder
        author = is_author()
        if not slug and not author:
            raise SharedemosException(404)

        if author:
            if slug:
                chapter = DraftWalkthrough.query.filter_by(
                    tenant_id=tenant_id, slug=slug, is_deleted=False).first()
                if not chapter:
                    old_demo = get_latest_entity(
                        slug=slug, entity_type=unicode("draft_walkthrough"))
                    return old_demo.slug, 302

                chapter = get_complete_walkthrough_details(chapter)
                walkthrough = load_chapter_metadata(chapter)
                return marshal(walkthrough, chapter_api_fields), 200
            else:
                entity_query = Walkthrough.query.join(
                    Playlist
                ).join(
                    Section
                ).filter(
                    (Walkthrough.tenant_id == tenant_id) &
                    (Walkthrough.is_deleted.__eq__(False)) &
                    (Walkthrough.is_enabled.__eq__(True)) &
                    (Playlist.is_enabled.__eq__(True)) &
                    (Playlist.is_deleted.__eq__(False)) &
                    (Section.is_enabled.__eq__(True)) &
                    (Section.is_deleted.__eq__(False))
                )

                user_groups = getattr(g.user, 'groups', None)
                if request.args.get('get_details'):
                    entities_list = entity_query.order_by(
                        Walkthrough.slug
                    ).with_entities(
                        Section, Playlist, Walkthrough
                    ).all()
                    chapters_data = []
                    for section, playlist, chapter in entities_list:
                        if (
                            user_groups and
                            not author and
                            chapter.has_groups() and
                            not chapter.is_restricted_to_groups(user_groups)
                        ):
                            # check if draft_chapter is retricted to the user_groups or not.
                            continue

                        if section.is_available():
                            product_slug = section.get_category().slug
                            chapters_data.append({
                                'name': get_translation(chapter).name,
                                'slug': chapter.slug,
                                'url': ('{}/{}'.format(product_slug, chapter.slug)
                                        if product_slug == section.slug else
                                        '{}/{}/{}'.format(
                                            product_slug, section.slug, chapter.slug)
                                        ),
                                'playlist_id': playlist.id,
                                'playlist_name': get_translation(playlist).name
                            })
                    return format_data(
                        marshal(chapters_data, chapter_data_fields))

                enabled_chapterlist = []
                chapters_list = entity_query.order_by(
                    Walkthrough.modified_at
                ).with_entities(
                    Section, Walkthrough
                ).all()
                for section, chapter in chapters_list:
                    if (
                        user_groups and
                        not author and
                        chapter.has_groups() and
                        not chapter.is_restricted_to_groups(user_groups)
                    ):
                        # check if draft_chapter is retricted to the user_groups or not.
                        continue

                    if check_parent_restriction(section):
                        chapter._name = get_translation(chapter).name
                        enabled_chapterlist.append(chapter)

                return format_data(
                    marshal(enabled_chapterlist, chapter_fields))

        else:
            response = get_chapter_api(slug)
            if response['status'] == 'NOT_FOUND':
                raise SharedemosException(404)
            if response['status'] == 'FORBIDDEN':
                raise SharedemosException(403)
            if response['status'] == 'REDIRECT':
                return response['slug'], 302

            return response['chapter'], 200

    @has_author_access
    def post(self):
        """Create a new draft_walkthrough under a playlist."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        post_data = parser.parse_args()

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        playlist = Playlist.query.get(post_data['playlist_id'])
        if not playlist or not playlist.is_enabled:
            raise SharedemosException(404)

        if not playlist.section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        if len(post_data['name']) > 85:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED % 'name')

        walkthrough = DraftWalkthrough()
        walkthrough.order = len(playlist.draft_walkthroughs) + 1
        walkthrough.tenant_id = tenant_id
        walkthrough.playlist_id = playlist.id
        walkthrough.created_by = session.get('user_id')
        walkthrough.modified_by = session.get('user_id')

        translation = DraftWalkthroughTranslations()
        translation.language_id = session['author']['locale']
        translation.title = translation.name = unicode(post_data['name'])
        translation.walkthrough = walkthrough

        # Add tags information
        translation.tag_ids = create_update_tags(post_data['tags']) or None

        db.session.add_all([walkthrough, translation])

        # Schedule disable - EOL (End of life).
        if post_data.get('expire_at'):
            db.session.flush()  # To get the walkthrough.id

            expiry_date = datetime.strptime(
                str(post_data['expire_at']),
                '%Y-%m-%dT%H:%M'
            )
            expiry_entity = ExpireEntity(walkthrough)
            expiry_entity.new(expiry_date)
            # In POST, there is no scenario to handle update/delete eol.

        log_activity_feed(
            entity=u'walkthrough',
            action=u'created',
            section=playlist.section,
            playlist=playlist,
            draft_walkthrough=walkthrough
        )

        db.session.commit()

        from sharedemos.tasks import delete_api_cache_data
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
            'tenant_id': tenant_id,
        })

        return marshal(walkthrough, chapter_api_fields), 200

    @has_author_access
    def put(self, slug):
        """
        Method to update draft_walkthrough information.

        Clear cache, remove pdf, update algolia, log activity
        after performing the update.
        """
        parser.replace_argument('playlist_id', type=int, location='json')
        put_data = parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        walkthrough = DraftWalkthrough.query.filter_by(
            tenant_id=tenant_id, slug=slug, is_deleted=False).first_or_404()

        if not walkthrough.playlist.section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(put_data['name']) > 85:
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED % 'name')

        walkthrough_trans = get_translation(walkthrough, author=True)
        if not walkthrough_trans:
            walkthrough_trans = DraftWalkthroughTranslations()
            walkthrough_trans.walkthrough_id = walkthrough.id
            walkthrough_trans.walkthrough = walkthrough
            walkthrough_trans.language_id = session['author']['locale']

        activity_list = []
        if walkthrough_trans.name != put_data['name']:
            title_action = u'added'
            if walkthrough_trans.name:
                title_action = u'edited'
            activity_list.append({
                'action': title_action,
                'attribute': u'title'
            })

        walkthrough_trans.name = unicode(put_data['name'])
        walkthrough_trans.title = unicode(put_data['name'])
        walkthrough.modified_by = session.get('user_id')
        walkthrough_trans.walkthrough = walkthrough

        tag_ids = create_update_tags(put_data['tags']) \
            if put_data.get('tags') else None
        tag_action = None
        if walkthrough_trans.tag_ids and not tag_ids:
            tag_action = u'deleted'
        elif walkthrough_trans.tag_ids and\
                len(walkthrough_trans.tag_ids) != len(tag_ids):
            tag_action = u'edited'
        elif not walkthrough_trans.tag_ids and tag_ids:
            tag_action = u"added"
        if tag_action:
            activity_list.append({
                'action': tag_action,
                'attribute': u'tags'
            })

        walkthrough_trans.tag_ids = tag_ids

        # Restrictions is only available in private tenants,
        # and only for published chapters.
        tenant = walkthrough.tenant
        published_chapter = walkthrough.published
        from sharedemos.tasks import (
            delete_api_cache_data, update_algolia_content
        )

        if (
            tenant.flags.is_private and
            published_chapter and
            'is_restriction_enabled' in put_data
        ):
            # if restrictions is enabled, then update the group id info,
            # else clear the restrictions.
            if put_data['is_restriction_enabled']:
                # raises exception if validation fails.
                validate_user_group(
                    put_data['restricted_to_groupids'], tenant.id)
                # get_usergroups returns groups in sorted order.
                user_groups = get_usergroups(
                    put_data['restricted_to_groupids']
                )
                # 'restricted_to_groups' returns group info in sorted order.
                if published_chapter.restricted_to_groups != user_groups:
                    published_chapter.restricted_to_groups = user_groups
                    activity_list.append({
                        'action': u'updated',
                        'attribute': u'access to {}'.format(user_groups)
                    })

            elif published_chapter.restricted_to_groups:
                published_chapter.restricted_to_groups = []
                activity_list.append({
                    'action': u'removed',
                    'attribute': u'restrictions'
                })
            update_algolia_content.delay({
                'entity': 'walkthrough',
                'entity_id': published_chapter.id,
                'tenant_id': tenant_id,
                'action': 'UPDATE',
                'groups': put_data['restricted_to_groupids'],
            })

        # Schedule disable - EOL (End of life).
        if 'expire_at' in put_data:
            expiry_entity = ExpireEntity(walkthrough)
            if put_data['expire_at']:
                expiry_date = datetime.strptime(
                    str(put_data['expire_at']),
                    '%Y-%m-%dT%H:%M'
                )
                if walkthrough.expire_at != expiry_date:
                    if not expiry_entity.job.id or not expiry_entity.job.created_by:
                        expiry_entity.new(expiry_date)
                    else:
                        expiry_entity.update(expiry_date)
            else:
                expiry_entity.delete()

        db.session.add_all([walkthrough, walkthrough_trans])

        playlist = walkthrough.playlist
        section = playlist.section
        for activity in activity_list:
            log_activity_feed(
                entity=u'walkthrough',
                action=activity.get('action'),
                attribute=activity.get('attribute'),
                section=section,
                playlist=playlist,
                draft_walkthrough=walkthrough
            )
        db.session.commit()

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
            'delete_pattern': True,
            'entity': 'all_playlists',
            'tenant_id': tenant.id
        })

        walkthrough = get_complete_walkthrough_details(walkthrough)
        return marshal(walkthrough, chapter_api_fields), 200

    @has_author_access
    def patch(self, slug=None):
        """
        Method to handle different actions related to DraftWalkthrough.

        'publish', 'chapterList' - then multiple publishing of chapters.
        'reorder' - handles sitemap reorder and playlist page reorder,
            also handles slide reorder, if the value is 'slide'.
        'is_enabled'    - enables/ disables draft_walkthrough and published_walkthrough.
        'hotspot'       - handles all actions related to slide hotspots.
        'delete_slide'  - mark slide as 'deleted' from draft_walkthrough.
        'publish'       - publish a draft_walkthrough.
        'copy'          - copies the content from a draft_walkthrough to a new entity.
        After performing enable, reorder, publish actions-
            cache, pdf is removed,
            algolia content is updated,
            activity is logged.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if not slug:
            if (
                'publish' not in request.json or
                'chapterList' not in request.json or
                not request.json['chapterList']
            ):
                raise SharedemosException(
                    400, message="ChapterList is missing")

            else:
                chapters = DraftWalkthrough.query.join(Playlist).filter(
                    DraftWalkthrough.tenant_id == tenant_id,
                    DraftWalkthrough.slug.in_(request.json['chapterList']),
                    DraftWalkthrough.is_deleted.__eq__(False),
                    Playlist.is_deleted.__eq__(False),
                    Playlist.is_enabled.__eq__(True)
                ).all()

                success_chapters = []
                failed_chapters = []
                publish_response = {}

                if chapters and not chapters[0].playlist.section.can_edit():
                    raise SharedemosException(
                        403, message=SharedemosException.ACCESS_RESTRICTED
                    )

                chapter = None
                for chapter in chapters:
                    if publish_chapter(chapter):
                        success_chapters.append(chapter.slug)
                    else:
                        failed_chapters.append(chapter.slug)

                from sharedemos.tasks import delete_api_cache_data

                """
                since all the chapters are in same section,
                accessing the common section through the last iterated value.
                """
                if chapter:
                    # In case of multiple publish,
                    # delete section cache and all walkthrough cache.
                    delete_api_cache_data.delay({
                        'entity': 'section',
                        'model_id': chapter.playlist.section.id,
                        'delete_children': True,
                        'delete_pattern': True,
                        'tenant_id': tenant_id,
                        'delete_path': tenant.template.lower() == u'dell'
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
                        'tenant_id': tenant.id
                    })

                publish_response = {
                    'success_chapters': success_chapters,
                    'failed_chapters': failed_chapters
                }
                return format_data(
                    marshal(publish_response, multiple_chapter_api_fields)
                ), 201

        walkthrough = DraftWalkthrough.query.filter_by(
            tenant_id=tenant_id,
            slug=unicode(slug),
            is_deleted=False
        ).first_or_404()

        if not walkthrough.playlist.section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        from sharedemos.tasks import (
            delete_api_cache_data, update_algolia_content
        )

        current_playlist = walkthrough.playlist
        published_chapter = walkthrough.published
        if 'reorder' in request.json:
            # slides re-ordering inside player.
            if request.json.get('reorder') == 'slide':
                change_slide_order(
                    request.json.get('target'),
                    request.json.get('after'),
                    walkthrough
                )
                entity = 'draft_slide'
                slide = [slide for slide in walkthrough.slides
                         if not slide.is_deleted and
                         slide.order == int(request.json.get('target'))]
                model = slide[0]
                log_last_activity(u'reordered', entity, model)

            else:
                # Site-Map, tree-structure as well as Author-mode re-ordering.
                target_playlist_id = request.json.get('target_parent_slug')
                target_playlist = Playlist.query.get(target_playlist_id)
                target_after_demo = DraftWalkthrough.query.filter_by(
                    tenant_id=tenant_id,
                    slug=request.json.get('after_ele_slug'),
                    is_deleted=False
                ).first()

                if not target_playlist:
                    raise SharedemosException(404)

                # Change the order, parent in both draft and published demos.
                change_walkthrough_order(
                    target_playlist,
                    target_after_demo,
                    current_playlist,
                    walkthrough
                )

                # If reordering is not within the playlist.
                algolia_update = False
                if current_playlist != target_playlist:
                    # For published walkthroughs in target-playlist.
                    change_published_walkthrough_order(target_playlist)
                    algolia_update = True
                    # Reset group info on re-arranging to another section.
                    if published_chapter:
                        published_chapter.restricted_to_groups = []

                # For published walkthroughs in current-playlist.
                change_published_walkthrough_order(current_playlist)

                db.session.add(walkthrough)
                db.session.commit()

                if algolia_update and published_chapter:
                    update_algolia_content.delay({
                        'entity': 'walkthrough',
                        'entity_id': published_chapter.id,
                        'tenant_id': tenant_id,
                        'action': 'REORDER'
                    })

                playlist = walkthrough.playlist
                log_activity_feed(
                    entity=u'walkthrough',
                    action=u'reordered',
                    section=playlist.section,
                    playlist=playlist,
                    draft_walkthrough=walkthrough
                )

        if 'is_enabled' in request.json:
            is_enabled = request.json.get('is_enabled')
            walkthrough.is_enabled = is_enabled
            action_entity = 'enabled' if is_enabled else 'disabled'

            if published_chapter:
                published_chapter.is_enabled = is_enabled
                if not is_enabled:
                    delete_link_from_bboard(
                        u'walkthrough', published_chapter.id)
                update_algolia_content.delay({
                    'entity': 'walkthrough',
                    'entity_id': published_chapter.id,
                    'tenant_id': tenant_id,
                    'action': 'UPDATE',
                    'is_enabled': is_enabled
                })

            playlist = walkthrough.playlist
            log_activity_feed(
                entity=u'walkthrough',
                action=action_entity,
                section=playlist.section,
                playlist=playlist,
                draft_walkthrough=walkthrough
            )

        if 'hotspot' in request.json:
            slide_order = request.json.get('slide_order')
            hotspot_data = request.json.get('hotspot')

            slide = get_or_create_slide(walkthrough, slide_order)

            if request.json['hotspot']['event'] == 'create':
                hotspot = None
                hotspot_id = int(request.json['hotspot'].get('id', 0))
                if hotspot_id:
                    for dr_hsp in slide.hotspots:
                        if dr_hsp.id == hotspot_id:
                            hotspot = dr_hsp
                            break
                if not hotspot:
                    hotspot = DraftHotspot()

                hotspot.display = hotspot_data['display']

                # check hotspot action exists (not passed during
                # reposition/resizing)
                if hotspot_data.get('action'):
                    hotspot.action = hotspot_data['action']

                # check hotspot type exists (not passed during
                # reposition/resizing)
                if hotspot_data.get('hotspot_type'):
                    hotspot.hotspot_type = hotspot_data['hotspot_type']

                hotspot.tenant_id = tenant_id
                hotspot.slide = slide
                db.session.add(hotspot)
                log_last_activity('created', 'draft_hotspot', hotspot)

                if hotspot_data.get('callout'):
                    hotspot_trans = get_translation(hotspot, author=True)
                    if not hotspot_trans:
                        def_trans = get_default_translation(hotspot)
                        if not def_trans and \
                                session['author'][
                                'locale'] != tenant.default_locale_id:
                            raise SharedemosException(
                                412,
                                message=SharedemosException
                                .DEFAULT_TRANSLATION_MISSING
                                % tenant.default_locale.name)

                        hotspot_trans = DraftHotspotTranslations()

                        hotspot_trans.language_id = session['author']['locale']
                        hotspot_trans.hotspot = hotspot

                    hotspot_trans.callout = hotspot_data['callout']

                    db.session.add(hotspot_trans)

            elif request.json['hotspot']['event'] == 'delete':
                dr_hotspot = DraftHotspot.query.get(
                    request.json['hotspot']['id'])
                log_last_activity('deleted', 'draft_hotspot', dr_hotspot)
                slide.hotspots.remove(dr_hotspot)

        if 'delete_slide' in request.json:
            slide_order = request.json.get('delete_slide')
            active_slides = [sl for sl in walkthrough.slides
                             if not sl.is_deleted]
            if not slide_order or slide_order > len(active_slides):
                raise SharedemosException(404)

            slide = DraftSlide.query.filter_by(
                tenant_id=tenant_id,
                walkthrough_id=walkthrough.id,
                order=slide_order,
                is_deleted=False
            ).first()
            if not slide:
                raise SharedemosException(404)

            slide.is_deleted = True
            db.session.add(slide)
            log_last_activity('deleted', 'draft_slide', slide)
            reorder_demo_slides(walkthrough)

        if 'publish' in request.json:
            publish_chapter(walkthrough)
            published_chapter = walkthrough.published

        if 'copy' in request.json:
            copy_chapter(walkthrough, walkthrough.playlist, suffix=' (1)')
            update_siblings_order(walkthrough.playlist)
        else:
            walkthrough.modified_by = session.get('user_id')
            db.session.add(walkthrough)

        db.session.commit()

        if any(
            action in ('reorder', 'is_enabled', 'publish') for action in request.json
        ):
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
                'tenant_id': tenant.id
            })
            section = walkthrough.playlist.section
            if published_chapter:
                # 'delete_api_cache_data',
                # will delete section cache by default when entity = 'walkthrough'.
                delete_api_cache_data.delay({
                    'entity': 'section',
                    'model_id': section.id,
                    'delete_children': True,
                    'delete_pattern': True,
                    'tenant_id': tenant_id,
                    'delete_path': tenant.template.lower() == u'dell'
                })

            remove_pdf(section.slug)
            # If reorder from site-map,
            # remove the pdfs in both current, targets sections.
            if 'reorder' in request.json:
                remove_pdf(current_playlist.section.slug)

        walkthrough = get_complete_walkthrough_details(walkthrough)
        return format_data(marshal(walkthrough, chapter_api_fields)), 201

    @has_author_access
    def delete(self, slug=None):
        """
        Mark draft walkthrough as 'deleted'.

        If there is a published walkthrough, then mark it also as 'deleted'.
        Clear cache, remove pdf, update algolia and log activity.
        """
        delete_data = delete_chapter_parser.parse_args()
        chapters_list = delete_data.get('chaptersList', [])
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        if not slug and not chapters_list:
            raise SharedemosException(
                400, message='SLUG/CHAPTERS LIST IS MISSING'
            )
        if slug:
            chapters_list = [slug]

        chapters = DraftWalkthrough.query.join(Playlist).join(Section).filter(
            DraftWalkthrough.tenant_id == tenant_id,
            DraftWalkthrough.is_deleted.__eq__(False),
            DraftWalkthrough.slug.in_(chapters_list)
        ).all()

        section = None
        if chapters:
            section = chapters[0].playlist.section

        if section and not section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )
        success_chapters = []
        failed_chapters = []
        delete_response = {}
        for chapter in chapters:
            is_deleted = delete_chapter(chapter)
            if is_deleted:
                success_chapters.append(chapter.slug)
            else:
                failed_chapters.append(chapter.slug)
        delete_response = {
            "success_chapters": success_chapters,
            "failed_chapters": failed_chapters
        }

        db.session.commit()
        from sharedemos.tasks import (
            delete_api_cache_data, update_algolia_content
        )
        delete_path = tenant.template.lower() == u'dell'
        for chapter in chapters:
            if chapter.slug in failed_chapters:
                continue
            published_chapter = chapter.published
            if published_chapter:
                delete_link_from_bboard(u'walkthrough', published_chapter.id)
                update_algolia_content.delay({
                    'entity': 'walkthrough',
                    'entity_id': published_chapter.id,
                    'tenant_id': tenant_id,
                    'action': 'DELETE'
                })
        remove_pdf(section.slug)

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
            'tenant_id': tenant.id
        })

        if slug:
            return jsonify(status='DELETED')

        return format_data(
            marshal(delete_response, multiple_chapter_api_fields)
        ), 200
