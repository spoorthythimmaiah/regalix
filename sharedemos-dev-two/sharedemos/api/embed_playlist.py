from flask import g, current_app
from flask.ext.restful import Resource, fields, marshal

from sharedemos.api.custom_fields import MediaURL, NestedJSON
from sharedemos.libs.api import (
    format_data,
    is_chapter_available
)
from sharedemos.libs.exceptions import SharedemosException

from sharedemos.libs.helpers import get_translation
from sharedemos.libs.utils import get_tenant_header_footer
from sharedemos.models import (
    Playlist,
    Section,
    Tenant,
    Walkthrough
)
from .walkthrough import get_complete_walkthrough_details

parent_section = {
    'name': fields.String,
    'slug': fields.String,
}

hotspot_display = {
    'height': fields.String,
    'left': fields.String,
    'top': fields.String,
    'width': fields.String,
    'color': fields.String,
    'delay': fields.Integer
}

hotspot_action = {
    'target': fields.String,
    'href': fields.String,
    'slide_number': fields.String,
}

hotspot_callout = {
    'tooltip_position': fields.String,
    'text': fields.String,
    'auto_open': fields.Integer,
    'auto_close': fields.Integer
}

hotspots = {
    'id': fields.Integer,
    'action': NestedJSON(hotspot_action, allow_null=True),
    'callout': NestedJSON(hotspot_callout, allow_null=True),
    'display': fields.Nested(hotspot_display, allow_null=True),
    'hotspot_type': fields.String()
}

pin_display = {
    'position': fields.String,
    'left': fields.String,
    'top': fields.String,
    'frame_number': fields.Integer,
}

pin_callout = {
    'title': fields.String,
    'body': fields.String
}

pins = {
    'id': fields.Integer,
    'order': fields.Integer,
    'callout': NestedJSON(pin_callout, allow_empty=True),
    'display': fields.Nested(pin_display, allow_null=True),
}


resource_details = {
    'frames': fields.Raw,
    'path': fields.String(attribute='cdn_url'),
    'count': fields.Integer,
    'desc': fields.String,
    'title': fields.String,
    'url': fields.String,
    'site_name': fields.String,
    'icon': fields.String,
    'thumbnail_url': fields.String,
    'source_type': fields.String,
    'source_name': MediaURL,
    'type': fields.String,
}

resource = {
    'resource_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'path': fields.String(attribute="_path"),
    'thumbnail': fields.String(attribute="_thumbnail"),
    'type': fields.String(attribute='resource_type'),
    'content': fields.String,
    'meta_data': NestedJSON(resource_details, allow_empty=True)
}

slide_details = {
    'hotspots': fields.Nested(hotspots, allow_null=True),
    'pins': fields.Nested(pins, allow_null=True),
    'primary_resource': fields.Nested(resource,
                                      allow_null=True,
                                      attribute=lambda x: (
                                          x._multilingual_resource or
                                          x.primary_resource)),
    'secondary_resource': fields.Nested(resource, allow_null=True),
    'name': fields.String,
    'order': fields.Integer,
    'notes': fields.Raw
}

playlist_details = {
    "order": fields.Integer,
    "name": fields.String,
    "description": fields.String
}

next_playlist = {
    'name': fields.String,
    "section": fields.Nested({"slug": fields.String}),
    'first_demo': fields.Nested({"slug": fields.String}),
}

current_walkthrough_details = {
    "slug": fields.String,
    "name": fields.String,
    "title": fields.String,
    "slides": fields.Nested(slide_details, attribute='slides_',
                            allow_null=True),
    "section": fields.Nested(parent_section, allow_null=True),
    'product': fields.Nested(parent_section, allow_null=True),
    "playlist": fields.Nested(playlist_details),
    "slide_transition_effect": fields.String,
}

walkthrough_details = {
    "slug": fields.String,
    "name": fields.String,
    "title": fields.String,
    "first_slide_image": fields.String,
    "total_slides": fields.Integer,
    "resource_type": fields.String
}

sibling_playlist = {
    "name": fields.String,
    "description": fields.String,
    "walkthroughs": fields.Nested(walkthrough_details,
                                  attribute='walkthroughs_')
}

current_playlist = {
    "name": fields.String,
    "description": fields.String,
    "walkthroughs": fields.Nested(walkthrough_details,
                                  attribute='walkthroughs_'),
    "current_walkthrough_details": fields.Nested(current_walkthrough_details)
}
tenant_details = {
    "description": fields.String,
    "favicon": MediaURL,
    "footer_text": fields.String(attribute="_footer_text"),
    "header": fields.String(attribute="_header"),
    "logo": MediaURL,
    "name": fields.String,
    "template": fields.String,
    "title": fields.String(default=u""),
}
embed_details = {
    "current_playlist": fields.Nested(current_playlist),
    "next_playlist": fields.Nested(sibling_playlist, allow_null=True),
    "tenant": fields.Nested(tenant_details)
}


def get_playlist_details(playlist, slug, is_current_playlist=False):
    walkthrough_list = [wt for wt in playlist.walkthroughs
                        if wt.is_enabled and not wt.is_deleted]
    trans = get_translation(playlist)
    playlist.name = trans.name
    playlist.description = trans.description

    playlist.walkthroughs_ = list()
    for walkthrough in walkthrough_list:
        chapter = get_complete_walkthrough_details(walkthrough)
        if is_current_playlist and walkthrough.slug == slug:
            playlist.current_walkthrough_details = chapter

        elif not is_chapter_available(chapter):
            continue

        chapter.total_slides = len(chapter.slides_)
        chapter.resource_type = None
        if chapter.slides_:
            frst_sl = chapter.slides_[0]
            chapter.resource_type = frst_sl.primary_resource.resource_type
        chapter.first_slide_image = chapter.get_thumbnail()

        playlist.walkthroughs_.append(chapter)
    return playlist


def check_available(section):
    if not section:
        return True

    if not section.is_enabled or section.is_deleted or section.is_private:
        return False

    return check_available(section.parent)


class EmbedPlayListApi(Resource):

    def get(self, slug):
        tenant_id = getattr(current_app, 'tenant_id')
        tenant = Tenant.query.get(tenant_id)
        if (not hasattr(g, 'user') or g.user.is_anonymous()) and\
                tenant.flags.is_private:
            raise SharedemosException(404)

        chapter = Walkthrough.query.join(
            Playlist).join(Section).filter(
            Walkthrough.tenant_id == tenant_id,
            Walkthrough.slug == slug,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True),
            Playlist.is_deleted.__eq__(False),
            Playlist.is_enabled.__eq__(True),
            Section.is_deleted.__eq__(False),
            Section.is_enabled.__eq__(True),
        ).with_entities(Walkthrough, Playlist, Section).first_or_404()

        if not check_available(chapter.Section):
            raise SharedemosException(404)

        result = dict()
        result['current_playlist'] = get_playlist_details(
            chapter.Playlist, slug, is_current_playlist=True)

        # Get tenant details
        tenant_header_footer = get_tenant_header_footer()
        tenant._header = tenant_header_footer.get('header')
        footer = tenant_header_footer.get('footer')
        if footer:
            tenant._footer_text = footer.text

        result['tenant'] = tenant

        current_playlist_order = chapter.Playlist.order
        current_section_id = chapter.Section.id

        next_playlist = Playlist.query.join(Walkthrough).filter(
            Playlist.section_id == current_section_id,
            Playlist.tenant_id == tenant_id,
            Playlist.order > current_playlist_order,
            Playlist.is_deleted.__eq__(False),
            Playlist.is_enabled.__eq__(True),
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True)).first()

        if next_playlist:
            result['next_playlist'] = get_playlist_details(next_playlist, slug)

        api_result = format_data(marshal(result, embed_details))
        return api_result, 200
