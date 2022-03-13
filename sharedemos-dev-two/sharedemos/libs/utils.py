from datetime import datetime
import os
import shutil
import tempfile

from flask import (
    abort,
    current_app,
    g, request,
    session,
    url_for
)
from flask.ext.restful import fields, marshal
from bs4 import BeautifulSoup

from sqlalchemy import desc, func, or_
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.api.custom_fields import MediaURL, NestedJSON
from sharedemos.libs.api import (
    add_to_api_cache,
    available_locales,
    check_translations_available,
    construct_cache_key_list,
    format_data,
    get_all_chapters_from_sections,
    is_author,
    is_audience,
    is_chapter_available,
    update_resource_url
)
from sharedemos.libs.bulletin_board import (
    bulletin_board_api_fields,
    bulletin_board_link_details,
    get_bulletin_boards,
    get_bulletin_board_link_details
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    create_folder,
    build_breadcrumb,
    build_url,
    get_chapter_details,
    get_default_translation,
    format_texteditor_content,
    get_locale_translation,
    get_translation,
    remove_pdf,
)
from sharedemos.libs.model import (
    get_time_bounds,
    is_empty_playlist,
    log_activity_feed,
)
from sharedemos.libs.url import static_url
from sharedemos.models import (
    db,
    ActivityFeed,
    AudienceCompany,
    DraftHotspot,
    DraftHotspotTranslations,
    DraftJourney,
    DraftPin,
    DraftPinTranslations,
    DraftSlide,
    DraftSlideTranslations,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Journey,
    Languages,
    Playlist,
    Resource as ResourceModel,
    Section,
    SectionJourneys,
    SlugRevision,
    Tag,
    Tenant,
    TenantLanguage,
    TenantHeader,
    TenantFooter,
    TenantHeaderTranslations,
    TenantFooterTranslations,
    UserActivity,
    UserGroup,
    VisitActivity,
    Walkthrough,
    WalkthroughActivity
)

BREADCRUMB_HOME = 'home'

cta_api_fields = {
    'cta_id': fields.Integer(attribute='id'),
    'fields': fields.List(fields.String, attribute='cta_button.fields'),
    'text': fields.String(attribute='cta_button.text'),
    'campaign_message': fields.String(attribute='cta_button.campaign_message'),
    'type': fields.String(attribute='cta_type'),
    'href': fields.String(attribute='cta_button.href'),
    'file_path': fields.String(attribute='_path'),
    'name': fields.String
}
breadcrumb_api_fields = {
    "name": fields.String,
    "url": fields.String
}
icon_api_fields = {
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path"),
}
user_groups_fields = {
    '_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'is_default': fields.Boolean,
    'is_author': fields.Boolean(attribute='_is_author'),
}

app_api_fields = {
    'name': fields.String,
    'description': fields.String,
    'unique_id': fields.String,
}
locale_api_fields = {
    "selected": fields.Nested({
        'name': fields.String, 'locale': fields.String}),
    "languages": fields.Nested({
        'name': fields.String,
        'locale': fields.String(attribute='id'),
        'default_locale': fields.Boolean(attribute='_is_default',
                                         default=False)
    })
}

related_products_api_fields = {
    'name': fields.String,
    'product': fields.String,
    'section': fields.String,
}

parent_api_fields = {
    'name': fields.String,
    'description': fields.String,
    'slug': fields.String,
    'icon': fields.Nested(icon_api_fields, allow_null=True),
    'related_products': fields.Nested(
        related_products_api_fields, allow_null=True),
}

product_api_fields = {
    'name': fields.String,
    'description': fields.String,
    'slug': fields.String,
    'is_private': fields.Boolean,
    'icon': fields.Nested(icon_api_fields, allow_null=True),
}

resource_details = {
    'path': fields.String(attribute='cdn_url'),
    'url': fields.String,
    'description': fields.String(default=''),
    'icon_name': fields.String,
    'thumbnail_url': fields.String(attribute='_thumbnail'),
    'source_type': fields.String,
    'source_name': fields.String,
    'title': fields.String(default=''),
    'site_name': fields.String(default=''),
    'type': fields.String,
    'size': fields.Integer
}

resource_api_fields = {
    'resource_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'path': fields.String,
    'type': fields.String(attribute='resource_type'),
    'meta_data': fields.Nested(resource_details, allow_null=True),
}

section_videos_fields = {
    'link': fields.String,
    'poster_image': fields.String
}
multiple_chapter_api_fields = {
    'success_chapters': fields.List(fields.String),
    'failed_chapters': fields.List(fields.String)
}

walkthrough_api_fields = {
    'name': fields.String,
    'title': fields.String,
    'slug': fields.String,
    'order': fields.Integer,
    'percentage': fields.Float(default=0.0),
    'tags': fields.List(fields.String, attribute='tags_'),
    'is_enabled': fields.Boolean,
    'published': fields.Boolean,
    'created_at': fields.DateTime,
    'image': fields.Nested(resource_api_fields, allow_null=True),
    'image_src': fields.String,
    'translations_available': fields.Boolean(
        attribute=check_translations_available),
    'has_slides': fields.Boolean(attribute='_has_slides')
}

playlist_api_fields = {
    "playlist_id": fields.Integer(attribute='id'),
    "is_enabled": fields.Boolean,
    "order": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "can_edit": fields.Boolean(attribute='_can_edit'),
    "walkthroughs": fields.Nested(
        walkthrough_api_fields, attribute='walkthroughs_'),
    'translations_available': fields.Boolean(
        attribute=check_translations_available),
    'locales_available': fields.List(fields.String,
                                     attribute=available_locales)
}

faq_api_fields = {
    'name': fields.String,
    'slug': fields.String
}

recent_trending_demos_api_fields = {
    'created_at': fields.DateTime,
    'name': fields.String,
    'slug': fields.String,
    'section_name': fields.String,
    'section_slug': fields.String,
    'product_name': fields.String,
    'product_slug': fields.String,
    'image_src': fields.String,
    'tags': fields.List(fields.String),
    'url': fields.String,
    'slide_type': fields.String
}

footer_links = {
    'name': fields.String,
    'url': fields.String,
    'order': fields.Integer
}

tenant_footer_api_fields = {
    'links': fields.Nested(footer_links, allow_null=True),
    'text': fields.String
}

section_tenant_api_fields = {
    'name': fields.String,
    'title': fields.String,
    'header': fields.String(attribute='_header'),
    'footer': fields.Nested(
        tenant_footer_api_fields,
        attribute='_footer',
        allow_null=True),
    'logo': fields.String,
    'description': fields.String,
    'template': fields.String,
    'allow_offline': fields.Boolean(attribute='flags.allow_offline'),
    'cdn_enabled': fields.Boolean(attribute='flags.cdn_enable'),
    'can_download': fields.Boolean(attribute='flags.can_download'),
    'can_embed': fields.Boolean(attribute='flags.can_embed'),
    'chapter_autoflow': fields.Boolean(attribute='flags.chapter_autoflow'),
    'is_private': fields.Boolean(attribute='flags.is_private'),
    'enable_box_integration': fields.Boolean(
        attribute='flags.box_integration_enabled'),
    'theme_id': fields.Integer(attribute='theme.id'),
    'applications': fields.Nested(
        app_api_fields,
        attribute='_applications',
        allow_null=True
    ),
    'user_groups': fields.Nested(
        user_groups_fields,
        attribute='_user_groups',
        allow_null=True
    ),
}

chapter_tenant_api_fields = {
    "template": fields.String,
    "name": fields.String(attribute='name'),
    "title": fields.String,
    "logo": MediaURL,
    "header": fields.String(attribute='_header'),
    "footer_text": fields.String(attribute='_footer_text'),
    "show_notes": fields.Boolean(attribute='flags.show_notes'),
    "is_messaging_enabled": fields.Boolean(
        default=False,
        attribute=lambda x: len(
            [app for app in x.applications
             if app.unique_id.upper() == 'MESSAGING' and app.is_enabled]
        )
    ),
    "is_rating_enabled": fields.Boolean(
        default=False,
        attribute=lambda x: not is_author() and len(
            [app for app in x.applications
             if app.unique_id.upper() == 'RATING' and app.is_enabled]
        )
    ),
    "user_groups": fields.Nested(
        user_groups_fields,
        attribute='_user_groups',
        allow_null=True
    ),
}

linked_asset_meta_data_fields = {
    'file_name': fields.String
}

linked_asset_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path"),
    'language_id': fields.String,
    'meta_data': NestedJSON(linked_asset_meta_data_fields,
                            allow_empty=True),
}
children = {
    "icon": fields.Nested(icon_api_fields, allow_null=True),
    "name": fields.String,
    "description": fields.String,
    "slug": fields.String,
    "tags": fields.List(fields.String, attribute='tags_'),
    "linked_asset": fields.Nested(linked_asset_fields, allow_null=True)
}

section_bulletin_board_fields = {
    '_id': fields.Integer(attribute='id'),
    'is_enabled': fields.Boolean,
    'links': fields.Nested(bulletin_board_link_details,
                           allow_null=False, attribute='_links'),
    'has_more_links': fields.Boolean(attribute='_has_more_links'),
    'restricted_to_group_details': fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
}
repository_details_fields = {
    "is_linked": fields.Boolean(default=False),
    "sync_status": fields.String(default='')
}

children_api_fields = {
    'children': fields.Nested(
        children,
        attribute='_children'
    ),
    'description': fields.String,
    'is_leafnodes_parent': fields.Boolean(attribute='_is_leafnodes_parent',
                                          default=False),
    'is_leafnode': fields.Boolean,
    'icon': fields.Nested(icon_api_fields, allow_null=True),
    'name': fields.String,
    'order': fields.Integer,
    'progress': fields.Float(default=0.0),
    'slug': fields.String,
    'tags': fields.List(fields.String, attribute='tags_'),
    'is_enabled': fields.Boolean,
    'is_hidden': fields.Boolean,
    'linked_asset': fields.Nested(linked_asset_fields,
                                  allow_null=True,
                                  attribute='_linked_asset'),
    'translations_available': fields.Boolean(
        attribute=check_translations_available),
    'locales_available': fields.List(fields.String,
                                     attribute=available_locales),
    'bulletin_board_list': fields.Nested(section_bulletin_board_fields,
                                         attribute='_bulletin_boards',
                                         allow_null=True),
    'repository_details': fields.Nested(repository_details_fields,
                                        attribute="_repository_details",
                                        allow_null=True)
}

all_products_api_fields = {
    'name': fields.String,
    'title': fields.String,
    'slug': fields.String,
    'description': fields.String,
    'order': fields.Integer,
    'icon': fields.Nested(icon_api_fields, allow_null=True),
    'tags': fields.List(fields.String, attribute='tags_'),
    'is_enabled': fields.Boolean,
    'is_hidden': fields.Boolean,
    'linked_asset': fields.Nested(linked_asset_fields,
                                  allow_null=True,
                                  attribute='_linked_asset'),
    'can_edit': fields.Boolean(attribute='_can_edit'),
    'translations_available': fields.Boolean(
        attribute=check_translations_available),
    'locales_available': fields.List(fields.String,
                                     attribute=available_locales),
    'repository_details': fields.Nested(repository_details_fields,
                                        attribute="_repository_details",
                                        allow_null=True)
}

section_journey_fields = {
    'name': fields.String(attribute='_name'),
    'slug': fields.String,
    'icon_path': fields.String(attribute='_icon_path'),
    'id': fields.Integer
}

section_api_fields = {
    "analytics": fields.String,
    "breadcrumb": fields.Nested(breadcrumb_api_fields, attribute="_breadcrumb"),
    "cta_list": fields.Nested(cta_api_fields, attribute='_cta'),
    "description": fields.String,
    "icon": fields.Nested(icon_api_fields, allow_null=True),
    "is_enabled": fields.Boolean,
    "is_hidden": fields.Boolean,
    "is_private": fields.Boolean,
    "is_restriction_set_in_parent": fields.Boolean(
        attribute='_is_restriction_set_in_parent', default=False
    ),
    "restricted_to_group_details": fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
    "linked_asset": fields.Nested(linked_asset_fields,
                                  allow_null=True,
                                  attribute='_linked_asset'),
    "has_leaf_node_parents": fields.Boolean(attribute='_has_leaf_node_parents',
                                            default=False),
    "can_download": fields.Boolean,
    "name": fields.String,
    "order": fields.Integer,
    "faq": fields.Nested(faq_api_fields, attribute='_faq',
                         allow_null=True),
    "parent": fields.Nested(parent_api_fields, allow_null=True),
    "playlists": fields.Nested(playlist_api_fields, attribute='playlists_'),
    "bulletin_board_list": fields.Nested(section_bulletin_board_fields,
                                         attribute='_bulletin_boards',
                                         allow_null=True),
    "slug": fields.String,
    "tags": fields.List(fields.String, attribute='tags_'),
    "title": fields.String,
    "videos": fields.Nested(section_videos_fields, attribute='_videos'),
    "tenant": fields.Nested(section_tenant_api_fields),
    "can_edit": fields.Boolean(attribute='_can_edit'),
    "product": fields.Nested(product_api_fields, attribute='_product'),
    "related_products": fields.Nested(
        related_products_api_fields, allow_null=True),
    "locales": fields.Nested(
        locale_api_fields, attribute='languages_'),
    "children": fields.Nested(
        children_api_fields, attribute='children_', default=[]),
    "recent_chapters": fields.Nested(
        recent_trending_demos_api_fields,
        attribute='_recent_chapters',
    ),
    "trending_chapters": fields.Nested(
        recent_trending_demos_api_fields,
        attribute='_trending_chapters',
    ),
    "expire_at": fields.DateTime,
    'repository_details': fields.Nested(repository_details_fields,
                                        attribute="_repository_details",
                                        allow_null=True),
    "journey_list": fields.Nested(
        section_journey_fields, attribute='_journey'
    )
}

comment = {
    'user': fields.String,
    'user_profile_pic': fields.String(attribute='profile_picture_url'),
    'posted_at': fields.String(attribute='modified_at'),
    'text': fields.String
}

hotspot_display = {
    'height': fields.String,
    'left': fields.String,
    'top': fields.String,
    'width': fields.String,
    'color': fields.String,
    'delay': fields.Integer
}

hotspot_callout = {
    'tooltip_position': fields.String,
    'text': fields.String,
    'auto_open': fields.Integer,
    'auto_close': fields.Integer
}

hotspot_action = {
    'target': fields.String,
    'href': fields.String,
    'slide_number': fields.String,
}

hotspot_api_fields = {
    'id': fields.Integer,
    'action': NestedJSON(hotspot_action, allow_null=True),
    'callout': NestedJSON(hotspot_callout, allow_null=True),
    'display': fields.Nested(hotspot_display, allow_null=True),
    'hotspot_type': fields.String()
}

next_playlist_api_fields = {
    'name': fields.String,
    "section": fields.Nested({"slug": fields.String}),
    'first_demo': fields.Nested({"slug": fields.String}),
}

next_section_api_fields = {
    "name": fields.String,
    "slug": fields.String,
}

parent_section = {
    'name': fields.String,
    'order': fields.Integer,
    'slug': fields.String,
}

playlist_details = {
    "playlist_id": fields.Integer(attribute='id'),
    "order": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "restricted_to_group_details": fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
}

pin_callout = {
    'title': fields.String,
    'body': fields.String
}

pin_display = {
    'position': fields.String,
    'left': fields.String,
    'top': fields.String,
    'frame_number': fields.Integer,
}

pins = {
    'id': fields.Integer,
    'order': fields.Integer,
    'callout': NestedJSON(pin_callout, allow_empty=True),
    'display': fields.Nested(pin_display, allow_null=True),
}

chapter_resource_meta_api_fields = {
    'frames': fields.Raw,
    'path': fields.String(attribute='cdn_url'),
    'count': fields.Integer,
    'description': fields.String,
    'title': fields.String,
    'url': fields.String,
    'site_name': fields.String,
    'icon': fields.String,
    'thumbnail_url': MediaURL,
    'source_type': fields.String,
    'source_name': MediaURL,
    'type': fields.String,
    'size': fields.Integer
}

chapter_resource_api_fields = {
    'resource_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'path': fields.String(attribute="_path"),
    "thumbnail": fields.String(attribute="_thumbnail"),
    'type': fields.String(attribute='resource_type'),
    'content': fields.String,
    'meta_data': NestedJSON(chapter_resource_meta_api_fields,
                            allow_empty=True),
}
next_walkthrough_api_fields = {
    'image': fields.Nested(chapter_resource_api_fields, allow_null=True),
    'name': fields.String,
    'slug': fields.String,
    'slide_index': fields.Integer,
}
slide_api_fields = {
    'slide_id': fields.Integer(attribute='id'),
    'hotspots': fields.Nested(hotspot_api_fields, allow_null=True),
    'pins': fields.Nested(pins, allow_null=True),
    'primary_resource': fields.Nested(
        chapter_resource_api_fields,
        allow_null=True,
        attribute=lambda x: (x._multilingual_resource or x.primary_resource)),
    'secondary_resource': fields.Nested(chapter_resource_api_fields,
                                        allow_null=True),
    'name': fields.String,
    'order': fields.Integer,
    'notes': fields.Raw,
    'is_translation_available': fields.Boolean(
        attribute='_translation_available'),
    "created_at": fields.DateTime,
    "modified_at": fields.DateTime,
    "image_width": fields.Integer,
    "image_height": fields.Integer,
    "messages": fields.Nested(comment, allow_null=True),
}

locale_details = {
    "selected": fields.Nested({
        'name': fields.String, 'locale': fields.String}),
    "languages": fields.Nested({
        'name': fields.String,
        'locale': fields.String(attribute='id'),
        'default_locale': fields.Boolean
    })
}

activities_api_fields = {
    'action': fields.String,
    'user_name': fields.String,
    'activity_date': fields.DateTime(dt_format='iso8601')
}

activity_feed_api_fields = {
    'version': fields.Integer,
    'actions': fields.Nested(activities_api_fields, allow_null=True)
}

chapter_api_fields = {
    "breadcrumb": fields.Nested(breadcrumb_api_fields, attribute='_breadcrumb'),
    "created_at": fields.DateTime(dt_format='iso8601'),
    "slug": fields.String,
    "name": fields.String,
    "title": fields.String,
    "order": fields.Integer,
    "slides": fields.Nested(
        slide_api_fields, attribute='slides_', allow_null=True),
    "section": fields.Nested(parent_section, attribute='_section',
                             allow_null=True),
    "product": fields.Nested(product_api_fields, attribute='_product'),
    "playlist": fields.Nested(playlist_details),
    "next_walkthrough": fields.Nested(
        next_walkthrough_api_fields, allow_null=True),
    "prev_walkthrough": fields.Nested(
        next_walkthrough_api_fields, allow_null=True),
    "next_playlist": fields.Nested(next_playlist_api_fields, allow_null=True),
    "next_section": fields.Nested(next_section_api_fields, allow_null=True),
    "percentage": fields.Float(default=0.0),
    "slide_transition_effect": fields.String,
    "tags": fields.List(fields.String, attribute='tags_'),
    "is_enabled": fields.Boolean,
    "locales": fields.Nested(locale_details, attribute='languages_'),
    "activities": fields.Nested(activity_feed_api_fields, allow_null=True),
    "published": fields.Boolean,
    "can_edit": fields.Boolean(attribute='_can_edit'),
    "average_rating": fields.Float(default=0.0, attribute='_average_rating'),
    "tenant": fields.Nested(chapter_tenant_api_fields),
    "is_restriction_set_in_parent": fields.Boolean(
        attribute='_is_restriction_set_in_parent', default=False
    ),
    "restricted_to_group_details": fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
    "expire_at": fields.DateTime,
}


def add_walkthrough_translation_details(translation, walkthrough):
    """
    Add the name, title, tag, image details to the Walkthrough object.

    params:
        translation- SqlAlchemy Walkthrough translation object.
        walkthrough- SqlAlchemy Walkthrough object.
    """
    walkthrough.name = translation.name
    walkthrough.title = translation.title
    walkthrough._has_slides = True if [slide for slide in walkthrough.slides
                                       if not slide.is_deleted
                                       ] else False
    walkthrough.tags_ = []
    if translation.tag_ids:
        walkthrough.tags_ = Tag.query.filter(
            Tag.id.in_(translation.tag_ids)
        ).all()
    walkthrough.image = walkthrough.get_thumbnail_resource()

    return walkthrough


def copy_frames_from_src(source_path):
    """Copy resource."""
    """
        Copies all frames from source_path to a new folder,
        returns the new folder path.
    """
    try:
        destination_path = create_folder()
        abs_source_path = os.path.join(
            current_app.config.get('MEDIA_FOLDER'), source_path)
        abs_destination_path = os.path.join(
            current_app.config.get('MEDIA_FOLDER'), destination_path)
        for img_file in os.listdir(abs_source_path):
            shutil.copy2(os.path.join(abs_source_path, img_file),
                         os.path.join(abs_destination_path, img_file))
    except Exception:
        shutil.rmtree(abs_destination_path)
        return {'msg': 'COPY_ERROR'}

    return {'path': destination_path, 'msg': 'SUCCESS'}


def copy_chapter(chapter, playlist, suffix=''):

    demo = DraftWalkthrough()
    demo.resource_hostname = chapter.resource_hostname
    demo.order = chapter.order
    demo.slide_transition_effect = chapter.slide_transition_effect
    demo.is_enabled = chapter.is_enabled
    demo.tenant_id = chapter.tenant_id
    demo.playlist = playlist
    demo.published = None
    demo.created_by = session.get('user_id')
    demo.modified_by = session.get('user_id')
    db.session.add(demo)

    for trans in chapter.translations:
        translation = DraftWalkthroughTranslations()
        translation.name = trans.name + suffix
        translation.title = translation.name
        translation.walkthrough = demo
        translation.language_id = trans.language_id
        db.session.add(translation)

    for sl in chapter.slides:
        if sl.is_deleted:
            continue

        slide = DraftSlide()
        slide.order = sl.order
        slide.walkthrough = demo
        slide.tenant_id = sl.tenant_id
        if sl.primary_resource:
            res = ResourceModel()
            res.name = sl.primary_resource.name
            res.tenant_id = sl.primary_resource.tenant_id
            res.content = sl.primary_resource.content
            res.path = sl.primary_resource.path
            res.language_id = sl.primary_resource.language_id
            res.meta_data = sl.primary_resource.meta_data
            res.resource_type = sl.primary_resource.resource_type

            if sl.primary_resource.resource_type == u'360':
                copy_status = copy_frames_from_src(
                    sl.primary_resource.path)
                if copy_status.get('msg') == 'COPY_ERROR':
                    return copy_status['msg']
                res.path = copy_status.get('path')

            elif sl.primary_resource.resource_type == u'content':
                locales = [
                    locale.id
                    for locale in chapter.tenant.supported_locales]
                multilingual_res_list = ResourceModel.query.filter(
                    ResourceModel.tenant_id == sl.tenant_id,
                    ResourceModel.resource_type == u'content',
                    ResourceModel.language_id.in_(locales),
                    ResourceModel.meta_data[
                        'default_res_id'].astext.cast(
                        db.Integer).isnot(None),
                    ResourceModel.meta_data[
                        'default_res_id'].astext.cast(
                        db.Integer) == sl.primary_resource.id,
                    ResourceModel.meta_data[
                        'is_deleted'].astext.cast(
                        db.Boolean).__eq__(False)
                ).all()
                if multilingual_res_list:
                    db.session.add(res)
                    db.session.flush()
                    for ml_res in multilingual_res_list:
                        new_ml_res = ResourceModel()
                        new_ml_res.name = ml_res.name
                        new_ml_res.tenant_id = ml_res.tenant_id
                        new_ml_res.language_id = ml_res.language_id
                        new_ml_res.resource_type = ml_res\
                            .resource_type
                        new_ml_res.content = ml_res.content
                        new_ml_res.meta_data = MutableDict({
                            'default_res_id': res.id,
                            'is_deleted': False
                        })
                        db.session.add(new_ml_res)

            if getattr(res, 'id'):
                slide.primary_resource_id = res.id
            else:
                slide.primary_resource = res

        slide.secondary_resource_id = sl.secondary_resource_id
        db.session.add(slide)

        for trans in sl.translations:
            translation = DraftSlideTranslations()
            translation.name = trans.name
            translation.notes = trans.notes
            translation.slide = slide
            translation.language_id = trans.language_id
            db.session.add(translation)

        for hsp in sl.hotspots:
            hotspot = DraftHotspot()
            hotspot.display = hsp.display
            hotspot.action = hsp.action
            hotspot.hotspot_type = hsp.hotspot_type
            hotspot.slide = slide
            hotspot.tenant_id = hsp.tenant_id
            db.session.add(hotspot)

            for trans in hsp.translations:
                translation = DraftHotspotTranslations()
                translation.callout = trans.callout
                translation.hotspot = hotspot
                translation.language_id = trans.language_id
                db.session.add(translation)

        for _pin in sl.pins:
            pin = DraftPin()
            pin.display = _pin.display
            pin.order = _pin.order
            pin.slide = slide
            pin.tenant_id = _pin.tenant_id
            db.session.add(pin)

            for trans in _pin.translations:
                translation = DraftPinTranslations()
                translation.callout = trans.callout
                translation.pin = pin
                translation.language_id = trans.language_id
                db.session.add(translation)

    if suffix:
        playlist = demo.playlist
        log_activity_feed(
            entity='walkthrough',
            action='created',
            section=playlist.section,
            playlist=playlist,
            draft_walkthrough=demo
        )


def check_access_and_get_redirect(kwargs, authoring_mode=None):
    """
    Check user access to the tenant.

    Check tenant is private and check user access for authoring mode
    If user is anonymous,
    Retuns redirect_url else None.

    params:
        kwargs - Dictionary.
        authoring_mode - String.
    """
    private_user_login = False
    private_user_login_url = None

    if kwargs.get('ret_url'):
        # Set to True, when an anon-user tries to access a private content.
        private_user_login = True
        private_user_login_url = kwargs.get('ret_url')

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    if private_user_login and (tenant.flags.is_private or authoring_mode):
        redirect_url = private_user_login_url
        next_args = kwargs.get('next') or kwargs.get('args', {}).get('next')
        if next_args:
            redirect_url += '?next=' + next_args
        if kwargs.get('relay_state'):
            redirect_url += '&RelayState=' + kwargs.get('relay_state')
        return redirect_url


def check_parent_available(section):
    if section.is_deleted:
        return False

    if not section.is_enabled or section.is_hidden \
            or (g.user.is_anonymous() and section.is_private):
        return False

    if not section.parent:
        return True

    return check_parent_available(section.parent)


def check_user_get_cache_entity(entity, user):
    """
    Check for logged-in user/ anonymous user and return cache_entity.

    If user is anonymous then append 'anonymous' to entity.
    If user is logged-in,
        and doesn't have group id, then send entity.
        if group exists then append group id info
    params:
        entity  - String value.
        user    - SqlAlchemy User object.
    returns String.
    If multiple groups exists then eg - "2_en_us_section_groups_4_5".
    """
    if not user.is_active():
        return entity + '_anonymous'

    # 'groups' info for a user is sorted in model level.
    groups = getattr(user, 'groups', None)
    if not groups:
        return entity

    return entity + '_groups_{}'.format(
        '_'.join(str(x) for x in [grp.id for grp in groups])
    )


def disable_entity(entity_type, entity_id, user_id, author_locale):
    """
    Function to disable a Section/Playlist/Walkthrough.

    Log the activity, update algolia, clear cache, remove pdf.
    params:
        entity_type     - Unicode value indicating the type of SqlAlchmey model.
        entity_id       - SqlAlchmey model's id.
        user_id         - Integer value containing active user id.
        author_locale   - Unicode value of author locale id.
    """
    entity_mapper = {
        u'section': Section,
        u'playlist': Playlist,
        u'draft_walkthrough': DraftWalkthrough,
        u'draft_journeys': DraftJourney
    }

    model = entity_mapper[entity_type].query.get(entity_id)
    model.is_enabled = False
    model_id = model.id
    tenant_id = model.tenant_id

    if entity_type == "draft_journeys":
        published = model.published
        if published:
            published.is_enabled = False
            db.session.add(published)
        db.session.add(model)
        db.session.commit()
        if published:
            from sharedemos.tasks import (
                update_algolia_content, delete_api_cache_data)
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': '*journey',
                'tenant_id': tenant_id
            })
            update_algolia_content.delay({
                'entity': 'journey',
                'entity_id': published.id,
                'tenant_id': tenant_id,
                'action': 'UPDATE',
                'is_enabled': published.is_enabled
            })

        return

    section = model
    playlist = None
    draft_walkthrough = None

    if entity_type == 'playlist':
        playlist = model
        section = playlist.section

    elif entity_type == 'draft_walkthrough':
        draft_walkthrough = model
        playlist = draft_walkthrough.playlist
        section = playlist.section

        published = draft_walkthrough.published
        if published:
            published.is_enabled = False
            model_id = published.id
            entity_type = 'walkthrough'
            db.session.add(published)

    log_activity_feed(
        entity=entity_type,
        action=u'disabled',
        section=section,
        playlist=playlist,
        draft_walkthrough=draft_walkthrough,
        primary_user_id=user_id,
        author_locale=author_locale,
    )

    db.session.add(model)
    db.session.commit()

    from sharedemos.tasks import (
        delete_api_cache_data,
        update_algolia_content
    )

    update_algolia_content.delay({
        'entity': entity_type,
        'action': 'UPDATE',
        'entity_id': model_id,
        'tenant_id': tenant_id,
        'is_enabled': model.is_enabled
    })

    if entity_type in ('section', 'walkthrough'):
        delete_path = model.tenant.template.lower() == u'dell'
        delete_api_cache_data.delay({
            'entity': entity_type,
            'model_id': model_id,
            'tenant_id': tenant_id,
            'delete_parent': True,
            'delete_chapters': True,
            'delete_pattern': True,
            'delete_path': delete_path,
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

    remove_pdf(section.slug, tenant_id)


def get_all_sections(audience_company=None):
    """
    Get all homepage categories.

    If user belongs to a group,
    then return only those records which are restricted to that group.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    if audience_company:
        all_sections = list()
        if not audience_company.expire_at or \
                datetime.utcnow() < audience_company.expire_at:
            filtered_sections = get_available_section_for_audience(
                audience_company)
            if filtered_sections:
                all_sections = Section.query.filter(
                    (Section.tenant_id == tenant_id) &
                    (Section.parent_id.is_(None)) &
                    (Section.is_deleted.__eq__(False)) &
                    (Section.is_enabled.__eq__(True)) &
                    (Section.slug.in_(filtered_sections))
                ).order_by(Section.order, Section.modified_at).all()
    else:
        # Select all sections having no parent for selected tenant
        all_sections = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id.is_(None)) &
            (Section.is_deleted.__eq__(False))
        )
        # Display all sections for an author/admin,
        # private and public sections for a analyst/viewer,
        # only enabled and public sections for an anon-user.
        if not is_author():
            user = g.user
            if user.is_active() and user.is_viewer():
                all_sections = all_sections.filter(
                    (Section.is_enabled.__eq__(True)) &
                    (Section.is_hidden.__eq__(False))
                )
                user_groups = getattr(g.user, 'groups', None)
                if user_groups:
                    group_ids = [grp.id for grp in user_groups]
                    all_sections = all_sections.filter(
                        or_(
                            ~Section.restricted_to_groups.any(),
                            Section.restricted_to_groups.any(
                                UserGroup.id.in_(group_ids))
                        )
                    )
            else:
                all_sections = all_sections.filter(
                    (Section.is_enabled.__eq__(True)) &
                    (Section.is_private.__eq__(False)) &
                    (Section.is_hidden.__eq__(False))
                )

        all_sections = all_sections.order_by(
            Section.order
        ).all()

    # Add all section information
    sections = list()
    for _sec in all_sections:
        result = get_complete_section_details(_sec, is_product=True)
        sections.append(result)

    return sections


def get_asset_metadata(asset, journey_restricted_group_ids):
    """
    Function takes asset object and current journey restricted group ids.

    based on asset type, function will check for asset availability
    if asset is chapter, It will check for availibilty of section and playlist
    if asset available, function will return asset object with asset details
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    if asset.asset_type == 'chapter':
        _chapter = Walkthrough.query.join(Playlist).join(Section).filter(
            Walkthrough.tenant_id == tenant_id,
            Walkthrough.id == asset.asset_id,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True),
            Playlist.is_deleted.__eq__(False),
            Playlist.is_enabled.__eq__(True),
        ).with_entities(
            Walkthrough,
            Section
        ).first()

        if _chapter and _chapter.Section.is_available():
            chapter = _chapter.Walkthrough
            """
                checking chapter access,
                if journey restricted group ids is subset of
                chapter restricted group ids then chapter is accessible.
                ex: chapter restricted groups [employee, partner]
                    journey restricted groups [employee, partner, customer]
                In this scenario we cannot add/access the chapter in journey.
            """
            chapter_restricted_groups = chapter.get_restricted_to_groups()[0]
            chapter_restricted_group_ids = {
                group.id for group in chapter_restricted_groups
            }
            is_chapter_accessible = journey_restricted_group_ids.issubset(
                chapter_restricted_group_ids
            )
            if not is_chapter_accessible:
                return

            chapter._name = chapter.get_name()
            chapter._asset_type = asset.asset_type
            chapter._thumbnail = chapter.get_thumbnail()

            if not chapter._thumbnail:
                slide = chapter.get_first_slide()
                if slide:
                    chapter._first_slide = slide.primary_resource.resource_type

            chapter.section = _chapter.Section
            chapter.product = chapter.section.get_category()

            chapter._link = url_for(
                "main.route_handler",
                section=chapter.section.slug,
                chapter=chapter.slug
            )

            return chapter


def get_available_section_for_audience(audience_company):
    available_sections = list()
    for aud in audience_company.audience_sections_list:
        if not aud.section.is_enabled or aud.section.is_deleted:
            continue
        parents = get_parents(aud.section)
        available_sections.append(aud.section.slug)
        children = get_children(aud.section)
        available_sections = list(
            set(available_sections) | set(children) | set(parents))
    return available_sections


def get_section_bulletin_board_details(bulletin_board, total_bulletin_boards=None, all_links=False):
    all_bb_links = get_bulletin_board_link_details(
        bulletin_board.bulletin_board_links,
        bulletin_board.tenant
    )
    author = is_author()
    if not author and not all_bb_links:
        return
    user_group, model_with_group = bulletin_board.get_restricted_to_groups()
    bulletin_board._restricted_to_group_details = user_group
    # If Number of BulletinBoard is greater than one
    # then the limit of links to display is 5 else 10
    if bulletin_board.tenant.template.lower() == u'dell' and not author:
        all_links = True
    num_links = len(bulletin_board.bulletin_board_links) if all_links else 5
    if not author and total_bulletin_boards:
        num_links = num_links if total_bulletin_boards > 1 else 10
    bulletin_board._links = all_bb_links[:num_links]
    bulletin_board._has_more_links = True if len(
        all_bb_links) > num_links else False
    return bulletin_board


def get_complete_section_details(section, audience_company=None,
                                 is_product=False):
    """Get section details for selected locale."""
    tenant_header_footer = get_tenant_header_footer()
    tenant = section.tenant
    tenant._header = tenant_header_footer.get('header', None)
    footer = tenant_header_footer.get('footer', {})
    if footer:
        if not footer.links:
            footer.links = []
        tenant._footer = footer
    tenant._applications = [{
        'unique_id': app.unique_id.lower(),
        'name': app.name,
        'description': app.description
    } for app in tenant.applications if app.is_enabled]

    tenant._user_groups = tenant.user_groups if tenant.flags.is_private else None
    if tenant._user_groups:
        set_group_author(tenant._user_groups)

    section._can_edit = section.can_edit()
    section_translation = get_translation(section)
    section.name = unicode(section_translation.name or '')
    section.title = unicode(section_translation.title or '')
    section.description = unicode(section_translation.description or '')
    section._linked_asset = section_translation.resource

    author = is_author()
    if author:
        user_group, model_with_group = section.get_restricted_to_groups()
        section._restricted_to_group_details = user_group
        set_group_author(section._restricted_to_group_details)

        section._is_restriction_set_in_parent = (
            section.parent_id and
            user_group and
            section != model_with_group
        )

    user = g.user
    user_groups = getattr(user, 'groups', None)
    tenant_template = tenant.template.lower()
    is_bmc_template = tenant_template == u'bmc'

    section._bulletin_boards = []
    if (
        any(app['unique_id'].upper() == u'BULLETIN_BOARD' for app in tenant._applications) and
        section.bulletin_boards
    ):
        bulletin_boards = []
        if author:
            bulletin_boards = [bulletin_board
                               for bulletin_board in section.bulletin_boards
                               if not bulletin_board.is_deleted]
        else:
            bulletin_boards = [bulletin_board
                               for bulletin_board in section.bulletin_boards
                               if not bulletin_board.is_deleted and
                               bulletin_board.is_enabled]
            if tenant.flags.is_private and user.is_active() and user.is_viewer():
                if user_groups:
                    user_spec_bulletin_boards = []
                    for bulletin_board in bulletin_boards:
                        if (
                            (not bulletin_board.restricted_to_groups) or
                            (bulletin_board.restricted_to_groups and
                                any(grp in bulletin_board.restricted_to_groups
                                    for grp in user_groups))
                        ):
                            if bulletin_board not in user_spec_bulletin_boards:
                                user_spec_bulletin_boards.append(
                                    bulletin_board)
                    bulletin_boards = user_spec_bulletin_boards
            bulletin_boards = bulletin_boards[:2]
        for bulletin_board in bulletin_boards:
            bboard_details = get_section_bulletin_board_details(bulletin_board)
            if bboard_details:
                section._bulletin_boards.append(bboard_details)
    # Check whether the default translation has a resource,
    # if the locale specific doesn't have a resource.
    if not section_translation.resource_id:
        section._linked_asset = get_default_translation(section).resource

    user = 'author' if author else 'user'
    locale_id = session[user]['locale']
    section._videos = [video for video in section.videos
                       if video.language_id == locale_id]

    tag_ids = section_translation.tag_ids
    section.tags_ = []
    if tag_ids:
        section.tags_ = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    available_sections = []
    if audience_company:
        available_sections = get_available_section_for_audience(
            audience_company)

    section._cta = []
    cta_list = section.cta_list
    if not (author or cta_list):
        cta_list = section.get_parent_cta()
    for cta in cta_list:
        trans = get_translation(cta)
        if trans:
            cta.name = trans.name
            cta.cta_button = trans.cta_button
            if(cta.cta_type == u'pdf' and cta.cta_button.get('path')):
                cta._path = url_for('static',
                                    filename='media/client/' +
                                    tenant.unique_tenant_id + '/' +
                                    cta.cta_button['path'])
            section._cta.append(cta)

    journey_list = SectionJourneys.query.join(
        Section, SectionJourneys.section_id == section.id).join(
        Journey).with_entities(Journey).order_by(SectionJourneys.order).all()
    section._journey = []
    for journey in journey_list:
        journey_trans = get_translation(journey)
        journey._name = journey.get_name()
        if journey_trans.icon_id:
            journey._icon_path = static_url(
                filename='media/' + journey_trans.icon.path)
        else:
            journey._icon_path = static_url(
                filename='images/vmware/section-journey-icon.jpg')
        section._journey.append(journey)

    # breadcrumb list for section
    section._breadcrumb = build_breadcrumb(section)
    section._faq = None
    if section.faq_group:
        trans = get_locale_translation(section.faq_group)
        if trans:
            section.faq_group.name = trans.name
            section._faq = section.faq_group

    # get parent information
    if section.parent:
        # Get locale specific translation
        parent_translation = get_translation(section.parent)
        section.parent.name = unicode(parent_translation.name or '')
        section.parent.title = unicode(parent_translation.title or '')
        section.parent.description = unicode(parent_translation.description or
                                             '')

    # get children information
    section.children_ = []
    for child in section.children:

        if (
            child.is_deleted or
            (is_audience() and child.slug not in available_sections) or
            not author and not is_audience() and
            (not child.is_enabled or child.is_hidden) or
            is_restricted_to_groups(user_groups, child, author)
        ):
            # check if child is retricted to the group or not.
            continue

        # Get locale specific translation
        sec_trans = get_translation(child)
        child.name = unicode(sec_trans.name or '')
        child.title = unicode(sec_trans.title or '')
        child.description = unicode(sec_trans.description or '')
        child._linked_asset = sec_trans.resource
        if not sec_trans.resource_id:
            child._linked_asset = get_default_translation(child).resource

        tag_ids = sec_trans.tag_ids
        child.tags_ = []
        if tag_ids:
            child.tags_ = Tag.query.filter(Tag.id.in_(tag_ids)).all()

        # adding repository details to child section
        repository_details = {}
        if child.mapping_id or child.listener:
            repository_details = child.get_repository_details()
        child._repository_details = repository_details

        if not is_bmc_template:
            section.children_.append(child)
            continue
        children = []
        is_leafnodes_parent = is_bmc_template
        grand_children = []
        for ch in child.children:
            if (
                not ch.is_enabled or
                ch.is_deleted or
                ch.is_hidden or
                is_restricted_to_groups(user_groups, ch, author)
            ):
                continue
            grand_children.append(ch)

        for grand_child in grand_children:
            if grand_child.is_leafnode:
                grand_child_trans = get_translation(grand_child)
                _tags = []
                tag_ids = grand_child_trans.tag_ids
                if tag_ids:
                    _tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
                children.append(
                    {
                        "name": grand_child_trans.title or '',
                        "description": grand_child_trans.description or '',
                        "slug": grand_child.slug,
                        "icon": grand_child.icon,
                        "linked_asset": grand_child_trans.resource,
                        "tags_": _tags
                    }
                )
            else:
                children = []
                is_leafnodes_parent = False
                break

        child._is_leafnodes_parent = len(
            grand_children) > 0 and is_leafnodes_parent
        child._children = children

        section.children_.append(child)

    section._has_leaf_node_parents = is_bmc_template and \
        len(section.children_) > 0 and \
        len([child for child in section.children_
             if not child._is_leafnodes_parent]) == 0

    """
        `playlists_` is not part of model.
        `playlists_` is used to keep actual relationship un-disturbed
        This is used "ONLY" for parsing api data
        Modifying any relationship objects will trigger update/delete events
    """

    section.playlists_ = []
    if section.playlists:
        for playlist in section.playlists:
            if (
                playlist.is_deleted or
                (is_audience() and playlist.section.slug not in available_sections) or
                (not author and not playlist.is_enabled) or
                is_restricted_to_groups(user_groups, playlist, author)
            ):
                # check if playlist is retricted to the user_groups or not.
                continue
            playlist_trans = get_translation(playlist)
            playlist.name = unicode(playlist_trans.name or '')
            playlist.description = unicode(playlist_trans.description or '')
            playlist._can_edit = playlist.section.can_edit()

            if author:
                walkthroughs = playlist.draft_walkthroughs
            else:
                walkthroughs = playlist.walkthroughs

            wt_list = list()
            default_wt_list = list()
            for walkthrough in walkthroughs:
                # In this scenario, 'walkthrough' variable can have either draft or published entity,
                # to check restrictions, only published entity is required.
                draft = getattr(walkthrough, 'draft', walkthrough)
                published_chapter = draft.published
                if (
                    walkthrough.is_deleted or
                    (not author and not walkthrough.is_enabled) or
                    is_restricted_to_groups(
                        user_groups, published_chapter, author)
                ):
                    # check if draft_walkthrough is retricted to the group or not.
                    continue

                if author:
                    wt_trans = get_translation(walkthrough)
                    walkthrough = add_walkthrough_translation_details(
                        wt_trans, walkthrough)
                    wt_list.append(walkthrough)
                else:
                    wt_trans = get_default_translation(walkthrough)
                    walkthrough = add_walkthrough_translation_details(
                        wt_trans, walkthrough)
                    default_wt_list.append(walkthrough)

                    chapter_available = is_chapter_available(walkthrough)
                    if not chapter_available:
                        continue

                    wt_trans = get_locale_translation(walkthrough)
                    if wt_trans:
                        walkthrough = add_walkthrough_translation_details(
                            wt_trans, walkthrough)
                    wt_list.append(walkthrough)

            """
                `walkthroughs_` is not part of model.
                `walkthroughs_` is used to keep actual relationship
                un-disturbed on filtering
                This is used "ONLY" for parsing api data
                Modifying any relationship objects will trigger
                update/delete events
            """
            playlist.walkthroughs_ = wt_list
            playlist.default_walkthroughs_ = default_wt_list
            section.playlists_.append(playlist)

    section._product = section.get_category()
    translation = get_translation(section._product)
    section._product.name = unicode(translation.name)
    section._product.description = unicode(translation.description or '')
    section._recent_chapters = get_recent_demos(section)
    section._trending_chapters = get_trending_demos(section)

    if not is_product:
        av_locales = get_languages(entity='section', section=section)
        section.show_default = True
        for pl in section.playlists_:
            if pl.walkthroughs_:
                section.show_default = False
                break

        if section.show_default:
            loc_list = [l.id for l in av_locales['languages']]
            if av_locales['selected']['locale'] not in loc_list:
                for pl in section.playlists_:
                    pl.walkthroughs_ = pl.default_walkthroughs_

        section.languages_ = av_locales

    # adding repository details to a given section.
    repository_details = {}
    if section.mapping_id or section.listener:
        repository_details = section.get_repository_details()
    section._repository_details = repository_details

    return section


def get_complete_walkthrough_details(chapter, include_slides=True):
    """Get detailed chapter information for the locale."""
    walkthrough_translation = get_translation(chapter)
    chapter = add_walkthrough_translation_details(
        walkthrough_translation, chapter
    )

    chapter.thumbnail = chapter.get_thumbnail()

    chapter._product = chapter.playlist.section.get_category()
    translation = get_translation(chapter._product)
    chapter._product.name = unicode(translation.name)
    chapter._product.description = unicode(translation.description or '')

    chapter._section = chapter.playlist.section

    # build breadcrumb_list for walkthrough
    _breadcrumb_list = build_breadcrumb(chapter._section)
    _breadcrumb_list.append({
        "name": chapter.get_name(),
        "url": build_url(chapter._section.slug, chapter.slug)
    })
    chapter._breadcrumb = _breadcrumb_list
    translation = get_translation(chapter._section)
    chapter._section.name = unicode(translation.name)
    chapter._section.description = unicode(translation.description or '')

    playlist_translation = get_translation(chapter.playlist)
    chapter.playlist.name = unicode(playlist_translation.name)
    chapter.playlist.description = unicode(
        playlist_translation.description or ''
    )
    chapter.playlist._restricted_to_group_details = chapter.playlist.get_restricted_to_groups()[
        0]
    set_group_author(chapter.playlist._restricted_to_group_details)

    chapter._can_edit = chapter.playlist.section.can_edit()
    author = is_author()
    if author:
        published_chapter = chapter.published
        if published_chapter:
            chapter._restricted_to_group_details = published_chapter.get_restricted_to_groups()[
                0]
            set_group_author(chapter._restricted_to_group_details)
            chapter._is_restriction_set_in_parent = bool(
                published_chapter.playlist.get_restricted_to_groups()[0]
            )
        else:
            chapter._restricted_to_group_details = []
            chapter._is_restriction_set_in_parent = False

    available_slides = list()
    slide_list = chapter.slides
    if include_slides and slide_list:
        for slide in slide_list:
            if slide.is_deleted:
                continue

            # Add slide hotspot details
            if slide.hotspots:
                for hotspot in slide.hotspots:
                    trans = get_translation(hotspot)
                    hotspot.callout = trans.callout if trans else None

            if slide.pins:
                for pin in slide.pins:
                    trans = get_translation(pin)
                    pin.callout = trans.callout if trans else None

            slide_trans = get_translation(slide)
            slide.name, slide.notes = (
                unicode(slide_trans.name or ""), slide_trans.notes) \
                if slide_trans else (None, None)
            slide._translation_available = True if slide_trans else False
            slide._multilingual_resource = None
            secondary_resource = slide.secondary_resource
            if secondary_resource:
                update_resource_url(secondary_resource)
            if slide.primary_resource:
                user = session['author'] if author else session['user']
                locale_id = user['locale']
                update_resource_url(slide.primary_resource)
                if slide.primary_resource.resource_type == u'content' and\
                        slide.tenant.default_locale_id != locale_id:
                    av_locales = [l.language_id
                                  for l in slide.tenant.tenant_languages
                                  if l.is_public]
                    if author or locale_id in av_locales:
                        # If the edit has been made in a selected translation,
                        # then the slide.primary_resource
                        # should contain that non default trans resource to
                        # display the updated content.
                        multilingual_res = ResourceModel.query.filter(
                            ResourceModel.tenant_id == slide.tenant_id,
                            ResourceModel.resource_type == u'content',
                            ResourceModel.meta_data['default_res_id']
                            .astext.cast(db.Integer).isnot(None),
                            ResourceModel.meta_data['default_res_id']
                            .astext.cast(
                                db.Integer) == slide.primary_resource_id,
                            ResourceModel.meta_data['is_deleted'].astext.cast(
                                db.Boolean).__eq__(False),
                            ResourceModel.language_id == locale_id).first()

                        """
                            skip slide If RTE content is not available
                            for given language
                        """
                        if not author and not multilingual_res:
                            continue

                        slide._multilingual_resource = multilingual_res
            available_slides.append(slide)

    chapter.slides_ = available_slides
    chapter.languages_ = get_languages(entity='chapter', chapter=chapter)

    tenant = chapter.tenant
    title = tenant.title or u""
    tenant_header_footer = get_tenant_header_footer()
    tenant._header = tenant_header_footer.get('header', None)
    footer_text = tenant_header_footer.get('footer', {})
    if footer_text:
        tenant._footer_text = footer_text.text

    tenant.title = title
    tenant._user_groups = tenant.user_groups if tenant.flags.is_private else None
    if tenant._user_groups:
        set_group_author(tenant._user_groups)

    return chapter


def get_languages(entity, section=None, chapter=None):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    available_languages = []

    if entity == 'section':
        if is_author():
            available_languages = list(
                set([tenant.default_locale] + tenant.supported_locales))
            available_languages = sorted(available_languages,
                                         key=lambda k: k.name)
        else:
            if not section:
                all_sections = Section.query.filter(
                    (Section.tenant_id == tenant_id) &
                    (Section.parent_id.is_(None)) &
                    (Section.is_enabled.__eq__(True)) &
                    (Section.is_deleted.__eq__(False))
                )

                if not is_audience():
                    if not (g.user.is_active() and g.user.is_viewer()):
                        all_sections = all_sections.filter(
                            Section.is_private.__eq__(False)
                        )
                    all_sections = all_sections.filter(
                        Section.is_hidden.__eq__(False))

                lang_available = list()
                for sec in all_sections:
                    lang_available = list(
                        set().union(lang_available, sec.languages_available()))

                trending_demos = get_trending_demos()
                for d in trending_demos:
                    chapter = d['chapter']
                    lang_available = list(
                        set().union(lang_available, chapter.languages_available()))
                recent_demos = get_recent_demos()
                for d in recent_demos:
                    chapter = d['chapter']
                    lang_available = list(
                        set().union(lang_available, chapter.languages_available()))

            else:
                lang_available = section.languages_available()
                if section.children_:
                    for c in section.children_:
                        lang_available = list(
                            set().union(
                                lang_available, c.languages_available()))
                elif section.playlists_:
                    for p in section.playlists_:
                        lang_available = list(
                            set().union(
                                lang_available, p.languages_available()))
                        for wt in p.default_walkthroughs_:
                            lang_available = list(
                                set().union(
                                    lang_available, wt.languages_available()))

            enabled_languages = Languages.query.join(
                TenantLanguage).filter(
                TenantLanguage.is_public.__eq__(True),
                TenantLanguage.tenant_id == tenant.id
            )
            if lang_available:
                enabled_languages = enabled_languages.filter(
                    Languages.id.in_(lang_available)
                )
            default_language = Languages.query.join(
                Tenant).filter(Tenant.id == tenant.id)
            available_languages = enabled_languages.union(
                default_language).order_by(Languages.name).all()
    elif entity == 'chapter':
        if is_author():
            available_languages = list(
                set([
                    tenant.default_locale
                ] + tenant.supported_locales))

            available_languages = sorted(available_languages,
                                         key=lambda k: k.name)
        else:
            lang_available = chapter.languages_available()
            for s in chapter.slides_:
                lang_available = list(
                    set().union(lang_available, s.languages_available()))
                if s.primary_resource:
                    lang_available = list(
                        set().union(lang_available,
                                    s.primary_resource.languages_available()))
                for pin in s.pins:
                    lang_available = list(
                        set().union(lang_available, pin.languages_available()))
                for hsp in s.hotspots:
                    lang_available = list(
                        set().union(lang_available, hsp.languages_available()))

            enabled_languages = Languages.query.join(
                TenantLanguage).filter(
                TenantLanguage.is_public.__eq__(True),
                TenantLanguage.tenant_id == chapter.tenant_id
            )
            if lang_available:
                enabled_languages = enabled_languages.filter(
                    Languages.id.in_(lang_available)
                )
            default_language = Languages.query.join(
                Tenant).filter(Tenant.id == chapter.tenant_id)
            available_languages = enabled_languages.union(
                default_language).all()

    for l in available_languages:
        l.default_locale = True if l.id == tenant.default_locale_id else False

    user = session['author'] if is_author() else session['user']
    return {
        'selected': {
            'name': user['language'],
            'locale': user['locale']
        },
        'languages': available_languages
    }


def get_latest_entity(slug, entity_type):
    """Get latest content(handle redirects)."""
    """
        Returns latest product/section/walkthrough if model is updated.
        Aborts the action if the entity is not found.
    """

    tenant_id = getattr(current_app, 'tenant_id', None)
    old_entity = SlugRevision.query.filter(
        (SlugRevision.tenant_id == tenant_id) &
        (SlugRevision.entity_type == entity_type) &
        (SlugRevision.old_slug == slug))

    if entity_type == unicode('section') or entity_type == unicode('product'):
        entity = Section.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first()
        if not entity:
            old_section = old_entity.first()
            if old_section:
                entity = Section.query.filter_by(tenant_id=tenant_id,
                                                 id=int(old_section.entity_id),
                                                 is_deleted=False).first()
    elif entity_type == unicode('walkthrough'):
        entity = Walkthrough.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first()
        if not entity:
            old_walkthrough = old_entity.first()
            if old_walkthrough:
                entity = Walkthrough.query.filter_by(
                    tenant_id=tenant_id,
                    id=int(old_walkthrough.entity_id),
                    is_deleted=False
                ).first()
    elif entity_type == unicode('draft_walkthrough'):
        entity = DraftWalkthrough.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first()
        if not entity:
            old_walkthrough = old_entity.first()
            if old_walkthrough:
                entity = DraftWalkthrough.query.filter_by(
                    tenant_id=tenant_id,
                    id=int(old_walkthrough.entity_id),
                    is_deleted=False
                ).first()

    if not entity:
        g.error_message = 'NOT FOUND - ' + entity_type.upper() + ' ' + slug
        abort(404)

    return entity


def get_parents(section, parents=[]):
    if section.parent:

        # If any of the parents are disabled/deleted return empty list
        if section.parent.is_deleted or not section.parent.is_enabled:
            parents = list()
            return parents
        parents.append(section.parent.slug)
        get_parents(section.parent, parents)

    return parents


def get_children(section, children=[]):
    for child in section.children:
        if not child.is_enabled or child.is_deleted:
            continue

        if child.slug not in children:
            children.append(child.slug)
        get_children(child, children)

    return children


def get_next_sibbling_in_playlist(current_walkthrough):
    """Get next sibbling walkthrough for selected section."""
    next_walkthrough = None
    if is_author():
        walkthrough_list = [
            wt for wt in current_walkthrough.playlist.draft_walkthroughs
            if wt.is_enabled and not wt.is_deleted]
    else:
        walkthrough_list = []
        user_groups = getattr(g.user, 'groups', None)
        for wt in current_walkthrough.playlist.walkthroughs:
            if wt.is_enabled and not wt.is_deleted:
                if (
                    user_groups and
                    wt.has_groups() and
                    not wt.is_restricted_to_groups(user_groups)
                ):
                    continue

                walkthrough_list.append(wt)

    for walkthrough in walkthrough_list:
        # filter selecting same or disabled walkthrough
        if current_walkthrough.order == walkthrough.order\
                or not walkthrough.is_enabled or walkthrough.is_deleted:
            continue

        if walkthrough.order > current_walkthrough.order\
                and walkthrough.slides:
            # in case order number is not in sequence, pick next section in
            # order
            if not next_walkthrough or\
                    walkthrough.order < next_walkthrough.order:
                next_walkthrough = walkthrough

    # Pick next walkthrough in order or if walkthrough is last, pick the first
    # one in section
    if next_walkthrough and is_chapter_available(next_walkthrough):
        walkthrough_details = update_chapter_display_info(next_walkthrough)
        return walkthrough_details
    return get_next_walkthrough(current_walkthrough)


def get_available_playlists(all_playlists):
    """
    Check if a playlist is deleted or disabled or empty.

    Also check if playlist is restricted to any group,
    if group info is available.
    param:
        all_playlists- List of SqlAlchemy Playlist objects.
    Return list of playlist objects depending upon the 'is_author' value.
    """
    list_of_playlists = []
    for playlist in all_playlists:
        if(
            playlist.is_enabled and
            not playlist.is_deleted and
            not is_empty_playlist(
                playlist.draft_walkthroughs if is_author() else playlist.walkthroughs
            )

        ):
            user_groups = getattr(g.user, 'groups', None)
            if (
                user_groups and
                not is_author() and
                playlist.has_groups() and
                not playlist.is_restricted_to_groups(user_groups)
            ):
                # check if playlist is retricted to the user_groups or not.
                continue

            list_of_playlists.append(playlist)

    return list_of_playlists


def get_next_walkthrough(walkthrough):
    """Get next chapter."""
    """
        Get first walkthrough of next playlist for a given walkthrough
        if walkthrough is last in order for the current playlist.
    """
    playlists = get_available_playlists(walkthrough.playlist.section.playlists)

    if not playlists or len(playlists[0].walkthroughs) == 1\
            and len(playlists) == 1:
        return

    current_playlist_order = walkthrough.playlist.order
    next_playlist = None
    for playlist in playlists:
        if playlist.order > current_playlist_order:
            next_playlist = playlist
            break
    if next_playlist:
        playlist = next_playlist
    elif playlists:
        playlist = playlists[0]

    if playlist:
        user_groups = getattr(g.user, 'groups', None)
        author = is_author()
        walkthrough_list = playlist.draft_walkthroughs if author else playlist.walkthroughs
        for walkthrough in walkthrough_list:
            if (
                not walkthrough.is_deleted and walkthrough.is_enabled and
                is_chapter_available(walkthrough)
            ):
                if (
                    user_groups and
                    not author and
                    walkthrough.has_groups() and
                    not walkthrough.is_restricted_to_groups(user_groups)
                ):
                    continue

                walkthrough_details = update_chapter_display_info(walkthrough)
                return walkthrough_details


def get_products_api():

    tenant_id = getattr(current_app, 'tenant_id', None)
    cache = getattr(current_app, 'cache', None)

    tenant_in_cache = get_tenant_api()

    # all products/trending/recent demos response object
    api_response = dict(
        all_products=list(),
        trending_demos=list(),
        recent_demos=list(),
        tenant=tenant_in_cache,
        locales=dict(),
        bulletin_board_list=list(),
    )

    all_products_in_cache = dict()
    recent_demos_in_cache = dict()
    trending_demos_in_cache = dict()
    bulletin_board_in_cache = dict()
    if is_author():
        entity = 'all_products_user_' + unicode(g.user.id)
        all_products_cache_key = construct_cache_key_list(entity=entity)
        all_products_in_cache = cache.get(all_products_cache_key[0])
        if not all_products_in_cache:
            all_products = get_all_sections()
            all_products_in_cache = format_data(
                marshal(all_products,
                        all_products_api_fields,
                        envelope='all_products'))
            add_to_api_cache(entity=entity, api_data=all_products_in_cache)

        languages_in_cache = format_data(
            marshal(get_languages(entity='section'), locale_api_fields,
                    envelope='locales'))
        if(
            'BULLETIN_BOARD' in [app.get('unique_id').upper()
                                 for app in tenant_in_cache.get('applications')]
        ):
            all_bulletin_boards = get_bulletin_boards()
            bulletin_board_in_cache = format_data(
                marshal(all_bulletin_boards, bulletin_board_api_fields,
                        envelope='bulletin_board_list')
            )
    elif is_audience():
        audience_company = AudienceCompany.query.filter(
            (AudienceCompany.is_enabled.__eq__(True)) &
            (AudienceCompany.is_deleted.__eq__(False)) &
            (AudienceCompany.tenant_id == tenant_id) &
            (AudienceCompany.unique_link_id == request.args.get('company'))
        ).first()

        all_products = list()
        if audience_company:
            all_products = get_all_sections(audience_company)
        all_products_in_cache = format_data(
            marshal(all_products,
                    all_products_api_fields,
                    envelope='all_products'))

        languages_in_cache = format_data(
            marshal(get_languages(entity='section'), locale_api_fields,
                    envelope='locales'))
    else:
        user = g.user
        cache_entity_type = check_user_get_cache_entity('all_products', user)
        all_products_key = construct_cache_key_list(
            entity=cache_entity_type
        )
        all_products_in_cache = cache.get(all_products_key[0])

        if not all_products_in_cache:
            all_products = get_all_sections()

            if all_products:
                all_products_in_cache = format_data(
                    marshal(all_products,
                            all_products_api_fields,
                            envelope='all_products'))
                add_to_api_cache(entity=cache_entity_type,
                                 api_data=all_products_in_cache)
        """
            Get all BulletinBoards which are in home level
        """
        bulletin_board_list = []
        if(
            'BULLETIN_BOARD' in [app.get('unique_id').upper()
                                 for app in tenant_in_cache.get('applications')]
        ):
            cache_entity_type = check_user_get_cache_entity(
                'bulletin_boards', user)
            bulletin_board_key = construct_cache_key_list(
                entity=cache_entity_type)
            bulletin_board_in_cache = cache.get(bulletin_board_key[0])
            if not bulletin_board_in_cache:
                bulletin_board_list = get_bulletin_boards()
                bulletin_board_in_cache = format_data(
                    marshal(bulletin_board_list,
                            bulletin_board_api_fields,
                            envelope='bulletin_board_list'))
                add_to_api_cache(entity=cache_entity_type,
                                 api_data=bulletin_board_in_cache)

        languages_key = construct_cache_key_list(
            entity='supported_languages')
        languages_in_cache = cache.get(languages_key[0])
        if not languages_in_cache:
            languages_in_cache = format_data(
                marshal(get_languages(entity='section'),
                        locale_api_fields,
                        envelope='locales'))
            add_to_api_cache(
                entity='supported_languages',
                api_data=languages_in_cache)

        recent_cache_entity = check_user_get_cache_entity('recent_demos', user)
        recent_demos_key = construct_cache_key_list(
            entity=recent_cache_entity
        )
        recent_demos_in_cache = cache.get(recent_demos_key[0])
        if not recent_demos_in_cache:
            recent_demos = get_recent_demos()
            loc_recent_demos = [
                d for d in recent_demos if is_chapter_available(d['chapter'])]

            if loc_recent_demos:
                recent_demos = loc_recent_demos
            else:
                loc_list = [l['locale'] for l in languages_in_cache[
                            'locales']['languages']]
                if languages_in_cache[
                        'locales']['selected']['locale'] in loc_list:
                    recent_demos = loc_recent_demos

            if recent_demos:
                recent_demos_in_cache = format_data(
                    marshal(recent_demos,
                            recent_trending_demos_api_fields,
                            envelope='recent_demos'))
                add_to_api_cache(entity=recent_cache_entity,
                                 api_data=recent_demos_in_cache)

        trending_cache_entity = check_user_get_cache_entity(
            'trending_demos', user)
        trending_demos_key = construct_cache_key_list(
            entity=trending_cache_entity
        )
        trending_demos_in_cache = cache.get(trending_demos_key[0])
        if not trending_demos_in_cache:
            trending_demos = get_trending_demos()
            loc_trending_demos = [
                d for d in trending_demos if is_chapter_available(d['chapter'])]

            if loc_trending_demos:
                trending_demos = loc_trending_demos
            else:
                loc_list = [l['locale'] for l in languages_in_cache[
                    'locales']['languages']]
                if languages_in_cache[
                        'locales']['selected']['locale'] in loc_list:
                    trending_demos = loc_trending_demos

            if trending_demos:
                trending_demos_in_cache = format_data(
                    marshal(trending_demos,
                            recent_trending_demos_api_fields,
                            envelope='trending_demos'))
                add_to_api_cache(entity=trending_cache_entity,
                                 api_data=trending_demos_in_cache)
    if all_products_in_cache:
        api_response.update(all_products_in_cache)
    if trending_demos_in_cache:
        api_response.update(trending_demos_in_cache)
    if recent_demos_in_cache:
        api_response.update(recent_demos_in_cache)
    if languages_in_cache:
        api_response.update(languages_in_cache)
    if bulletin_board_in_cache:
        api_response.update(bulletin_board_in_cache)
    return api_response


def get_last_chapter(chapters_list=[]):
    """Get a valid last chapter in the given chapters_list."""
    chapters_list = [
        chapter
        for chapter in chapters_list
        if chapter.is_enabled and not chapter.is_deleted
    ]
    chapters_list = sorted(
        chapters_list,
        key=lambda cp: cp.order,
        reverse=True
    )

    if chapters_list:
        return chapters_list[0]


def get_next_playlist(current_walkthrough):
    """Get next playlist."""
    """
        Get next playlist for a given walkthrough.
        If this is a last playlist or there is only single playlist,
            get playlist of next section under parent if exists.
        If there is no section exists after current section
            under parent select nothing.
    """
    next_playlist = None
    current_section = current_walkthrough.playlist.section
    current_playlist = current_walkthrough.playlist
    user_groups = getattr(g.user, 'groups', None)
    for plist in current_section.playlists:
        # Filter deleted, disabled, selecting same or lower order playlist
        wt_list = [
            wt for wt in plist.walkthroughs
            if wt.is_enabled and not wt.is_deleted]
        if (
            plist.is_deleted or not plist.is_enabled or
            plist.id == current_playlist.id or
            plist.order < current_playlist.order or not wt_list or
            (
                user_groups and
                not is_author() and
                plist.has_groups() and
                not plist.is_restricted_to_groups(user_groups)
            )

        ):
            continue

        if not next_playlist or plist.order < next_playlist.order:
            next_playlist = plist

    if next_playlist:
        translation = get_translation(next_playlist)
        next_playlist.name = unicode(translation.name)
        demo_list = [
            demo for demo in next_playlist.walkthroughs
            if demo.is_enabled and not demo.is_deleted]
        first_demo = None
        for demo in demo_list:
            if not first_demo or demo.order < first_demo.order:
                first_demo = demo

        next_playlist.first_demo = first_demo

    return next_playlist


def load_chapter_metadata(chapter):
    chapter.next_playlist = get_next_playlist(chapter)
    chapter.section = chapter.playlist.section
    chapter.section.name = unicode(
        get_translation(chapter.playlist.section).name
    )
    chapter.next_section = get_next_section(
        chapter.playlist.section
    )
    chapter.next_walkthrough = get_next_sibbling_in_playlist(chapter)
    chapter.prev_walkthrough = get_previous_walkthrough(chapter)
    chapter.activities = get_walkthrough_activities(chapter)

    tenant = chapter.tenant
    tenant._user_groups = tenant.user_groups if tenant.flags.is_private else None
    if tenant._user_groups:
        set_group_author(tenant._user_groups)

    return chapter


def get_chapter_api(slug):
    """Get details of published chapter."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    cache = getattr(current_app, 'cache', None)
    chapter = Walkthrough.query.filter_by(
        tenant_id=tenant_id,
        slug=slug,
        is_deleted=False
    ).first()

    if not chapter:
        old_demo = get_latest_entity(
            slug=slug, entity_type=unicode("walkthrough"))
        return {
            'status': 'REDIRECT',
            'slug': old_demo.slug
        }

    author = is_author()
    playlist = chapter.playlist
    user = g.user
    user_groups = getattr(user, 'groups', None)
    if (
        not chapter.is_enabled or
        playlist.is_deleted or
        not playlist.is_enabled or
        not playlist.section.is_available()
    ):
        return {
            'status': 'NOT_FOUND'
        }

    if (
        user_groups and
        not author and
        chapter.has_groups() and
        not chapter.is_restricted_to_groups(user_groups)
    ):
        return {
            'status': 'FORBIDDEN'
        }

    section = playlist.section
    if (
        not is_audience() and not user.is_active() and
        (
            section.get_category().is_private or
            section.is_private
        ) or
        (
            user_groups and
            not author and
            section.has_groups() and
            not section.is_restricted_to_groups(user_groups)
        )
    ):
        return {
            'status': 'FORBIDDEN'
        }

    # session's locale 'key' is returned if 'tenant' arg is not passed.
    cache_entity = check_user_get_cache_entity('walkthrough', user)
    key = construct_cache_key_list(cache_entity, slug)
    cache_data = cache.get(key[0])
    if cache_data and cache_data.get('tenant'):

        if chapter:
            next_chapter = get_next_sibbling_in_playlist(chapter)
            if next_chapter:
                next_chapter = format_data(
                    marshal(next_chapter, next_walkthrough_api_fields)
                )

            cache_data['next_walkthrough'] = next_chapter
            cache_data['next_section'] = get_next_section(
                chapter.playlist.section
            )

            prev_chapter = get_previous_walkthrough(chapter)
            if prev_chapter:
                prev_chapter = format_data(
                    marshal(prev_chapter, next_walkthrough_api_fields)
                )
            cache_data['prev_walkthrough'] = prev_chapter

        return {
            'status': 'FOUND',
            'chapter': cache_data
        }

    chapter = get_complete_walkthrough_details(chapter)
    chapter_details = load_chapter_metadata(chapter)

    api_result = format_data(
        marshal(chapter_details, chapter_api_fields)
    )
    if not author:
        add_to_api_cache(
            entity=cache_entity, api_data=api_result, slug=slug
        )

    return {
        'status': 'FOUND',
        'chapter': api_result
    }


def get_next_section(current_section):
    if current_section.parent:
        categories = []
        for category in current_section.parent.children:
            if(
                category.is_enabled and
                not category.is_deleted and
                not category.is_private
            ):
                user_groups = getattr(g.user, 'groups', None)
                if (
                    user_groups and
                    not is_author and
                    category.has_groups() and
                    not category.is_restricted_to_groups(user_groups)
                ):
                    continue

                categories.append(category)

        for section in categories:
            playlists_having_demos = get_available_playlists(section.playlists)
            if section.order == current_section.order and len(categories) == 1:
                return
            if section.order > current_section.order\
                    and playlists_having_demos:
                new_section = dict()
                new_section['name'] = unicode(get_translation(section).name)
                new_section['slug'] = section.slug
                return new_section


def get_previous_chapter(current_playlist):
    """
    Return previous chapter in the playlist page w.r.t current chapter.

    The previous chapter returned is dependent upon 'is_author'.
    If 'is_author' is True then a DraftWalkthrough object is returned,
    else a Walkthrough object is returned.
    params:
        current_playlist- SqlAlchemy Playlist model object.
    Returns None if playlist data is empty.
    """
    playlists = get_available_playlists(current_playlist.section.playlists)

    if not playlists:
        return

    playlists = sorted(playlists, key=lambda pl: pl.order)
    if len(playlists) == 1:
        prev_playlist = playlists[0]

    # In list of playlists, if the current chapter's playlist is in 1st position,
    # then return last playlist in that list.
    elif playlists.index(current_playlist) == 0:
        prev_playlist = playlists[-1]

    else:
        # Slice the list, and return the previous element in the sliced list.
        prev_playlist = playlists[:playlists.index(current_playlist)][-1]

    prev_chapters = prev_playlist.draft_walkthroughs if is_author(
    ) else prev_playlist.walkthroughs
    return get_last_chapter(prev_chapters)


def get_previous_walkthrough(current_walkthrough):
    """Get previous walkthrough."""
    if is_author():
        walkthrough_list = [
            wt for wt in current_walkthrough.playlist.draft_walkthroughs
            if wt.is_enabled and not wt.is_deleted]
    else:
        walkthrough_list = []
        user_groups = getattr(g.user, 'groups', None)
        for wt in current_walkthrough.playlist.walkthroughs:
            if wt.is_enabled and not wt.is_deleted:
                if (
                    user_groups and
                    wt.has_groups() and
                    not wt.is_restricted_to_groups(user_groups)
                ):
                    continue

                walkthrough_list.append(wt)

    walkthrough_list = sorted(
        walkthrough_list, key=lambda wt: wt.order, reverse=True)
    for walkthrough in walkthrough_list:
        if walkthrough.order < current_walkthrough.order:
            walkthrough_details = update_chapter_display_info(walkthrough)
            if walkthrough_details:
                walkthrough_details['slide_index'] = len(walkthrough.slides)
                return walkthrough_details

    prev_walkthrough = get_previous_chapter(current_walkthrough.playlist)
    if prev_walkthrough:
        walkthrough_details = update_chapter_display_info(prev_walkthrough)
        if walkthrough_details:
            walkthrough_details['slide_index'] = len(prev_walkthrough.slides)
            return walkthrough_details


def get_section_api(slug):

    tenant_id = getattr(current_app, 'tenant_id', None)
    cache = getattr(current_app, 'cache', None)

    if is_author():
        section_in_db = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.slug == slug) &
            (Section.is_deleted.__eq__(False))
        ).first()
        if not section_in_db:
            old_section = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode("section")) &
                (SlugRevision.old_slug == unicode(slug))
            ).first()
            if old_section:
                # Check if new version of old section exists
                available_section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    id=int(old_section.entity_id),
                    is_deleted=False
                ).first()
                if available_section:
                    return {
                        'slug': available_section.slug,
                        'status': 'REDIRECT'
                    }
            return {
                'status': 'NOT_FOUND'
            }

        # get complete section details
        section = get_complete_section_details(section_in_db)

        return {
            'section': format_data(marshal(section, section_api_fields)),
            'status': 'FOUND'
        }
    elif is_audience():
        section_in_db = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.slug == slug) &
            (Section.is_deleted.__eq__(False)) &
            (Section.is_enabled.__eq__(True))
        ).first()
        if not section_in_db:
            old_section = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode("section")) &
                (SlugRevision.old_slug == unicode(slug))
            ).first()
            if old_section:
                # Check if new version of old section exists
                available_section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    id=int(old_section.entity_id),
                    is_deleted=False
                ).first()
                if available_section:
                    return {
                        'slug': available_section.slug,
                        'status': 'REDIRECT'
                    }
            return {
                'status': 'NOT_FOUND'
            }

        # get complete section details
        audience_company = AudienceCompany.query.filter(
            (AudienceCompany.is_enabled.__eq__(True)) &
            (AudienceCompany.is_deleted.__eq__(False)) &
            (AudienceCompany.tenant_id == tenant_id) &
            (AudienceCompany.unique_link_id ==
             request.args.get('company'))
        ).first()
        section = get_complete_section_details(
            section_in_db,
            audience_company=audience_company
        )
        return {
            'section': format_data(marshal(section, section_api_fields)),
            'status': 'FOUND'
        }
    else:
        user = g.user
        user_groups = getattr(g.user, 'groups', None)
        cache_entity = check_user_get_cache_entity('section', user)
        section_key = construct_cache_key_list(entity=cache_entity, slug=slug)
        section_in_cache = cache.get(section_key[0])

        # If the section not in cache
        if not section_in_cache:
            section_in_db = Section.query.filter(
                (Section.tenant_id == tenant_id) &
                (Section.slug == slug) &
                (Section.is_deleted.__eq__(False))
            ).first()

            if not section_in_db:
                old_section = SlugRevision.query.filter(
                    (SlugRevision.tenant_id == tenant_id) &
                    (SlugRevision.entity_type == unicode("section")) &
                    (SlugRevision.old_slug == unicode(slug))
                ).first()
                if old_section:
                    # Check if new version of old section exists
                    available_section = Section.query.filter_by(
                        tenant_id=tenant_id,
                        id=int(old_section.entity_id),
                        is_deleted=False
                    ).first()
                    if available_section:
                        return {
                            'slug': available_section.slug,
                            'status': 'REDIRECT'
                        }
                return {
                    'status': 'NOT_FOUND'
                }

            if (
                (user_groups and
                    section_in_db.has_groups() and
                    not section_in_db.is_restricted_to_groups(user_groups)) or
                (section_in_db.is_private and user.is_anonymous())
            ):
                return {
                    'status': 'FORBIDDEN'
                }
            elif not section_in_db.is_available():
                return {
                    'status': 'NOT_FOUND'
                }

            # get complete section details
            section = get_complete_section_details(section_in_db)
            section_in_cache = format_data(marshal(section,
                                                   section_api_fields))
            add_to_api_cache(entity=cache_entity,
                             api_data=section_in_cache, slug=slug)

        section_in_cache['tenant'] = get_tenant_api()
        return {
            'section': section_in_cache,
            'status': 'FOUND'
        }


def get_recently_viewed_chapters():
    """Function to fetch recently viewed contents by the logged in User."""
    tenant_id = current_app.tenant_id
    recent_activities_limit = 5

    recent_activities = WalkthroughActivity.query.join(
        UserActivity
    ).distinct(
        WalkthroughActivity.walkthrough_id
    ).filter(
        UserActivity.tenant_id == tenant_id
    )
    if g.user.get_id():
        recent_activities = recent_activities.filter(
            UserActivity.user_id == g.user.id
        )
    recent_activities = recent_activities.with_entities(
        WalkthroughActivity.walkthrough_id,
        WalkthroughActivity.created_at
    ).all()
    # No limit or 'order by' in the above query, because of the distinct param.
    # More info - https://dzone.com/articles/how-sql-distinct-and-order-by-are-related

    # Sorting and limiting the list of values.
    recent_activities = sorted(
        recent_activities, key=lambda x: x.created_at, reverse=True
    )[:recent_activities_limit]

    # Check the walkthrough_id for valid walkthroughs.
    chapter_ids = [activity.walkthrough_id for activity in recent_activities]
    valid_chapters = get_valid_chapters(chapter_ids)

    # Sorting the valid_chapters with sort_order of 'recent_activities'.
    valid_chapters = [
        chapter for i in recent_activities
        for chapter in valid_chapters
        if chapter.Walkthrough.id == i.walkthrough_id
    ]

    recent_chapters = []
    for chapter in valid_chapters:

        chapter_name = chapter.Walkthrough.get_name()
        section = chapter.Section
        product = section.get_category()
        product_name = product.get_name()
        breadcrumb = u'{} > {} > {}'.format(
            product_name, section.get_name(), chapter_name
        )
        if section == product:
            breadcrumb = u'{} > {}'.format(product_name, chapter_name)

        recent_chapters.append({
            'slug': chapter.Walkthrough.slug,
            'name': chapter_name,
            'url': build_url(section.slug, chapter.Walkthrough.slug),
            'breadcrumb': breadcrumb
        })
    return recent_chapters


def get_tenant_api():
    tenant_id = getattr(current_app, 'tenant_id', None)
    cache = getattr(current_app, 'cache', None)

    user = None
    tenant = None
    if is_author() and 'author' in session:
        user = session['author']
    elif 'user' in session:
        user = session['user']

    if not user:
        tenant = Tenant.query.get(tenant_id)

    locale_id = user['locale'] if user else tenant.default_locale_id

    # when 'tenant' arg is not passed, it returns a single item list.
    tenant_key = construct_cache_key_list(entity='tenant', locale_id=locale_id)
    tenant_in_cache = cache.get(tenant_key[0]) if not is_author() else None
    if not tenant_in_cache:
        if not tenant:
            tenant = Tenant.query.get(tenant_id)
        tenant.title = tenant.title or ""
        tenant_header_footer = get_tenant_header_footer()
        tenant._header = tenant_header_footer.get('header', None)
        footer = tenant_header_footer.get('footer', {})
        if footer:
            if not footer.links:
                footer.links = []
            tenant._footer = footer
        tenant._applications = [{
            'unique_id': app.unique_id.lower(),
            'name': app.name,
            'description': app.description
        } for app in tenant.applications if app.is_enabled]

        if tenant.template.lower() == u'avaya':
            apps_dict = {}
            for app in tenant._applications:
                apps_dict[app['unique_id']] = app

            tenant._applications = []

            # For avaya template we are displaying apps in the below order
            apps_order = ['journeys', 'pitch',
                          'news', 'events', 'bulletin_board']
            for x in apps_order:
                if apps_dict.get(x):
                    tenant._applications.append(apps_dict[x])

        tenant._user_groups = tenant.user_groups if tenant.flags.is_private else None
        if tenant._user_groups:
            set_group_author(tenant._user_groups)

        tenant_in_cache = format_data(marshal(tenant,
                                              section_tenant_api_fields))
        if not is_author():
            add_to_api_cache(entity='tenant', api_data=tenant_in_cache)

    return tenant_in_cache


def get_tenant_header_footer():
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    user = session['author'] if is_author() else session['user']
    locale_id = user['locale'] if user else tenant.default_locale_id

    tenant_header_footer = dict()
    tenant_header = TenantHeaderTranslations.query.join(TenantHeader).filter(
        (TenantHeader.tenant_id == tenant_id) &
        (TenantHeader.is_deleted.__eq__(False)) &
        (TenantHeaderTranslations.language_id == locale_id)).first()
    if tenant_header:
        tenant_header_footer['header'] = tenant_header.title

    tenant_footer = TenantFooterTranslations.query.join(TenantFooter).filter(
        (TenantFooter.tenant_id == tenant_id) &
        (TenantFooter.is_deleted.__eq__(False)) &
        (TenantFooterTranslations.language_id == locale_id)).first()
    if tenant_footer:
        tenant_header_footer['footer'] = tenant_footer

    return tenant_header_footer


def get_trending_demos(section=None, limit=10):
    """
    Return by default 10 Trending demos list.

    If 'section' is specified then,
    fetch only demos related to that section.
    Return empty list for blacklisted tenants.
    """
    tenant_id = getattr(current_app, 'tenant_id')
    tenant = Tenant.query.get(tenant_id)

    tenant_template = tenant.template.lower()
    if (tenant_template in current_app.config['RECENT_TREND_BLACKLIST_TENANTS'])\
            or (tenant_template == "dell" and not section):
        return []

    get_tags = False
    if tenant_template in (u'default', u'grid'):
        get_tags = True

    chapters = []
    if section:
        chapters = get_all_chapters_from_sections(sections=[section])

    else:
        all_products = Section.query.filter(
            (Section.tenant_id == tenant.id) &
            (Section.parent_id.is_(None)) &
            (Section.is_deleted.__eq__(False)) &
            (Section.is_enabled.__eq__(True))
        ).all()
        chapters = get_all_chapters_from_sections(all_products)

    start_date, end_date, prev_start_date, prev_end_date = get_time_bounds(
        'week',
        timezone=tenant.timezone
    )
    chapters_ids = [chapter.id for chapter in chapters]

    if not chapters_ids:
        return []

    _chapters = Walkthrough.query.join(
        VisitActivity,
        VisitActivity.walkthrough_id == Walkthrough.id
    ).filter(
        (VisitActivity.tenant_id == tenant.id) &
        (VisitActivity.walkthrough_id.in_(chapters_ids)) &
        (VisitActivity.created_at.between(start_date, end_date))
    ).with_entities(
        Walkthrough,
        func.count(Walkthrough.id).label('count')
    ).group_by(
        Walkthrough.id,
        Walkthrough.slug
    ).order_by(
        desc('count'),
        Walkthrough.slug
    ).all()[:limit]

    author = is_author()
    user = session.get('author') if author else session.get('user')
    locale = (
        user['locale']
        if user and user.get('locale')
        else tenant.default_locale_id
    )

    trending_chapters = []
    user_groups = getattr(g.user, 'groups', None)
    for _chapter in _chapters:
        chapter = _chapter.Walkthrough
        if(
            not check_parent_available(chapter.playlist.section) or
            (
                user_groups and
                not author and
                chapter.has_groups() and
                not chapter.is_restricted_to_groups(user_groups)
            )
        ):
            continue

        trending_chapters.append(
            get_chapter_details(chapter, locale, get_tags)
        )

    return trending_chapters


def get_recent_demos(section=None, limit=10):
    """
    Return by default 10 Recent demos list.

    If 'section' is specified then,
    fetch only demos related to that section.
    Return empty list for blacklisted tenants.
    """
    tenant_id = getattr(current_app, 'tenant_id')
    tenant = Tenant.query.get(tenant_id)

    tenant_template = tenant.template.lower()
    if (tenant_template in current_app.config['RECENT_TREND_BLACKLIST_TENANTS'])\
            or (tenant_template == "dell" and not section):
        return []

    get_tags = False
    if tenant.template.lower() in (u'default', u'grid', u'avaya'):
        get_tags = True

    chapters = []
    if section:
        chapters = get_all_chapters_from_sections(sections=[section])

    else:
        all_products = Section.query.filter(
            (Section.tenant_id == tenant.id) &
            (Section.parent_id.is_(None)) &
            (Section.is_deleted.__eq__(False)) &
            (Section.is_enabled.__eq__(True))
        ).all()
        chapters = get_all_chapters_from_sections(all_products)

    chapters = sorted(
        chapters,
        key=lambda chapter: chapter.created_at,
        reverse=True
    )[:limit]

    author = is_author()
    user = session.get('author') if author else session.get('user')
    locale = (
        user['locale']
        if user and user.get('locale')
        else tenant.default_locale_id
    )

    recent_chapters = []
    user_groups = getattr(g.user, 'groups', None)
    for chapter in chapters:
        section = chapter.playlist.section
        if(
            not check_parent_available(section) or
            (
                user_groups and
                not author and
                chapter.has_groups() and
                not chapter.is_restricted_to_groups(user_groups)
            )
        ):
            continue

        recent_chapters.append(
            get_chapter_details(chapter, locale, get_tags)
        )

    return recent_chapters


def get_valid_chapters(chapter_ids):
    """
    Return a list of valid chapters.

    Check if a chapter has been deleted/disabled.
    Check if the playlist associated with the chapter has been deleted/disabled.
    Check if the section associated with the playlist has been deleted/disabled.
    Check for user group restrictions for chapter/playlist/section.
    """
    valid_chapters = []
    if not chapter_ids:
        return valid_chapters

    chapters = Walkthrough.query.join(
        Playlist
    ).join(
        Section
    ).filter(
        Walkthrough.tenant_id == current_app.tenant_id,
        Walkthrough.id.in_(chapter_ids),
        Walkthrough.is_deleted.__eq__(False),
        Walkthrough.is_enabled.__eq__(True),
        Playlist.is_deleted.__eq__(False),
        Playlist.is_enabled.__eq__(True),
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True),
    ).with_entities(
        Walkthrough, Playlist, Section
    ).all()

    user_groups = getattr(g.user, 'groups', None)

    for chapter in chapters:
        # Validity check.
        if (
            chapter and
            chapter.Section.is_available() and
            chapter not in valid_chapters
        ):
            # Purposefully separated 2 'ifs' to maitain code readability.
            # Restrictions check.
            if (
                user_groups and
                chapter.Walkthrough.has_groups() and
                not chapter.Walkthrough.is_restricted_to_groups(user_groups)
            ):
                continue

            valid_chapters.append(chapter)

    return valid_chapters


def get_walkthrough_activities(walkthrough):
    """Return a dict containing different walkthrough activities."""
    if not is_author():
        return []

    activity_feeds = ActivityFeed.query.filter_by(
        draft_walkthrough_id=walkthrough.id).all()
    walkthrough_activities = []
    activity_list = []
    backup_activity_list = []
    action_list = []
    remaining_actions_list = []
    version = 1
    for activity in activity_feeds:
        activity_dict = {}
        activity_dict['action'] = activity.action
        activity_dict['user_name'] = activity.primary_user
        activity_dict['activity_date'] = activity.created_at
        activity_list.insert(0, activity_dict)
        backup_activity_list.insert(0, activity_dict)
        if activity.action == u'published':
            activity_feed = {}
            activity_feed['version'] = version
            activity_feed['actions'] = activity_list
            walkthrough_activities.append(activity_feed)
            version += 1
            activity_list = []
    for actions in (item['actions'] for item in walkthrough_activities):
        for act in actions:
            action_list.append(act)
    for activity in backup_activity_list:
        if activity not in action_list:
            remaining_actions_list.append(activity)
    if remaining_actions_list:
        activity_feed = {}
        activity_feed['version'] = version
        activity_feed['actions'] = remaining_actions_list
        walkthrough_activities.append(activity_feed)
    walkthrough_activities.reverse()
    return walkthrough_activities


def get_available_languages(is_author=False):
    """
    Return the tenant locales, including default and supported locales.

    Used in all the supporting apps at author mode.
    """
    tenant_id = current_app.tenant_id
    tenant = Tenant.query.get(tenant_id)
    available_languages = sorted(list(set(
                                 [tenant.default_locale] + tenant.supported_locales)),
                                 key=lambda k: k.name)
    for language in available_languages:
        if language.id == tenant.default_locale_id:
            language._is_default = True
            break

    user = session['author'] if is_author else session['user']
    all_languages = {
        'selected': {
            'name': user['language'],
            'locale': user['locale']
        },
        'languages': available_languages
    }
    return format_data(marshal(all_languages, locale_api_fields))


def get_usergroups(group_ids):
    """
    Function to get fetch user-groups.

    Returns list of usergroups or empty list if group_ids is None.
    """
    if not group_ids:
        return []
    return UserGroup.query.filter(
        UserGroup.tenant_id == current_app.tenant_id,
        UserGroup.id.in_(group_ids)
    ).order_by(UserGroup.id).all()


def create_update_tags(tags_list):
    """
    Create a new tag if not present in DB.

    params:
        tags_list- list of tag names to query from DB.

    Returns a list of created/matched tag ids.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    tag_ids = []
    for tag_name in tags_list:
        tag_name = unicode(tag_name.strip())
        tag = Tag.query.filter(
            (func.trim(Tag.name) == tag_name) &
            (Tag.tenant_id == tenant_id)
        ).first()
        if not tag:
            tag = Tag()
            tag.tenant_id = tenant_id
            tag.name = tag_name

            db.session.add(tag)
            db.session.flush()
        tag_ids.append(tag.id)
    return tag_ids


def set_group_author(user_groups):
    """Set is_author flag if the group has the role id 1,2."""
    for grp in user_groups:
        if grp.role_id in (1, 2):
            grp._is_author = True


def validate_user_group(ip_group_ids, tenant_id):
    """
    Validate UserGroup info w.r.t 'ip_group_ids'.

    params:
        ip_group_ids - list of group_ids.
        tenant_id  - Tenant's id.
    Raise error if:
        there is no 'restricted_to_groupids' data.
        tenant's user_group is missing.
        invalid input user_groups.
    """
    if not ip_group_ids:
        raise SharedemosException(
            412,
            message='RESTRICTED_TO_GROUPS MISSING'
        )

    user_groups = UserGroup.query.filter(
        UserGroup.tenant_id == tenant_id).all()
    if not user_groups:
        raise SharedemosException(
            412,
            message='USER_GROUPS IN TENANT MISSING'
        )

    user_groups = [grp.id for grp in user_groups]
    # Validate ip_group_ids user_group_ids with tenant's user_group_ids.
    if (
        [
            group_id
            for group_id in ip_group_ids
            if group_id not in user_groups
        ]
    ):
        raise SharedemosException(
            412,
            message='INVALID USER_GROUP'
        )


def create_temporary_file(html_data):
    """
    Create a temporary html file.

    Params:
        html_data: HTML elements as a String.

    Return:
        Temporary file object.
    """
    tempdir = os.path.join(os.path.abspath('sharedemos'), 'static', 'tmp')
    if not os.path.exists(tempdir):
        os.makedirs(tempdir)
    temp_file = tempfile.NamedTemporaryFile(
        suffix='.html',
        dir=tempdir
    )
    temp_file.write(html_data.encode('utf-8'))
    temp_file.flush()
    return temp_file


def get_formatted_rte_content_and_slide_notes(
    walkthrough,
    default_locale_id,
    locale_id
):
    """
    Get Formatted TextEditor's HTML content and slide notes for PDF.

    Params:
        walkthrough: Sqlalchemy Walkthrough object.
        default_locale_id: String, Tenant default locale.
        locale_id: String, Session specific locale.
    """
    walkthrough._slides = []
    for slide in walkthrough.slides:
        if slide.primary_resource.resource_type in\
                ['360', 'sandbox'] or slide.is_deleted:
            continue

        if slide.primary_resource and\
                slide.primary_resource.resource_type \
                == unicode("content"):

            rte_content = slide.primary_resource.content
            if locale_id != default_locale_id:
                av_locales = [
                    l.language_id
                    for l in slide.tenant.tenant_languages
                    if l.is_public]
                if is_author() or locale_id in av_locales:
                    multilingual_res = ResourceModel.query.filter(
                        (ResourceModel.tenant_id == slide.tenant_id) &
                        (ResourceModel.resource_type == u'content') &
                        (ResourceModel.meta_data['default_res_id']
                         .astext.cast(db.Integer).isnot(None)) &
                        (ResourceModel.meta_data['default_res_id']
                         .astext.cast(db.Integer) ==
                         slide.primary_resource_id) &
                        (ResourceModel.meta_data['is_deleted']
                         .astext.cast(db.Boolean).__eq__(False)) &
                        (ResourceModel.language_id == locale_id)
                    ).first()

                    if multilingual_res:
                        rte_content = multilingual_res.content

            slide.primary_resource._text_editor_html =\
                format_texteditor_content(rte_content)

        slide_trans = get_translation(slide)
        if slide_trans and slide_trans.notes:
            notes = slide_trans.notes
            slide.has_notes = True
            slide.notes = {}
            for page_num in notes:
                slide.notes[page_num] = {
                    'title': BeautifulSoup(
                        notes[page_num].get('title', '') or '',
                        'lxml'
                    ).text,
                    'body': BeautifulSoup(
                        notes[page_num].get('body', '') or '',
                        'lxml'
                    ).text,
                    'link': notes[page_num].get('link')
                }
        walkthrough._slides.append(slide)
    return walkthrough


def is_restricted_to_groups(user_groups, entity, author):
    """
    Check user access for section/playlist/chapter.

    Params:
        user_groups: List of user_group object
        entity: Sqlalchemy object of section/playlist/chapter.
    Return:
        Default False.
        True If entity is restricted to user group.
    """
    if (
            user_groups and
            not author and
            entity and
            entity.has_groups() and
            not entity.is_restricted_to_groups(user_groups)
    ):
        return True

    return False


def update_chapter_display_info(chapter):
    """
    Function to update image and thumbnail for a given chapter.

    I/P: Sqlalchemy Object of walkthrough
    """
    resource = chapter.get_thumbnail_resource()
    if resource:
        resource._thumbnail = chapter.get_thumbnail()
    return {
        "name": chapter.get_name(),
        "image": resource,
        "slug": chapter.slug
    }
