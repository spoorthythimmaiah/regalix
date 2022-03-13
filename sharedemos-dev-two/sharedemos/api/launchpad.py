"""LaunchFeeder to fetch chapter/asset data."""
from flask import abort, current_app, g, session, url_for
from flask.ext.restful import fields, marshal

from sharedemos.api.custom_fields import MediaURL, NestedJSON
from sharedemos.libs.api import (
    add_to_api_cache,
    construct_cache_key_list,
    update_resource_url,
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.url import static_url
from sharedemos.libs.utils import get_asset_metadata
from sharedemos.models import (
    Journey,
    Playlist,
    Section,
    SlugRevision,
    UserGroup,
    Walkthrough
)


chapter_fields = {
    "name": fields.String,
    "slug": fields.String,
    "url": fields.String(attribute="_url")
}

cta_api_fields = {
    "cta_id": fields.Integer,
    "name": fields.String,
    "href": fields.String
}

hotspot_action = {
    "href": fields.String,
    "slide_number": fields.String,
    "target": fields.String,
}

hotspot_callout = {
    "auto_close": fields.Integer,
    "auto_open": fields.Integer,
    "text": fields.String,
    "tooltip_position": fields.String
}

hotspot_display = {
    "color": fields.String,
    "delay": fields.Integer,
    "height": fields.String,
    "left": fields.String,
    "top": fields.String,
    "width": fields.String,
}

hotspot_fields = {
    "action": NestedJSON(hotspot_action, allow_null=True),
    "callout": NestedJSON(
        hotspot_callout,
        allow_null=True
    ),
    "display": fields.Nested(hotspot_display, allow_null=True),
    "id": fields.Integer,
    "type": fields.String
}

pin_callout = {
    "title": fields.String,
    "body": fields.String
}

pin_display = {
    "position": fields.String,
    "left": fields.String,
    "top": fields.String,
    "frame_number": fields.Integer,
}

pin_fields = {
    "callout": NestedJSON(
        pin_callout,
        allow_empty=True
    ),
    "display": fields.Nested(pin_display, allow_null=True),
    "id": fields.Integer,
    "order": fields.Integer,
}

asset_container_fields = {
    "chapters": fields.Nested(
        chapter_fields,
        attribute="_chapters"
    ),
    "description": fields.String,
    "name": fields.String,
    "cta": fields.Nested(cta_api_fields, allow_null=True)
}

resource_metadata_fields = {
    "count": fields.Integer,
    "description": fields.String,
    "frames": fields.Raw,
    "icon": fields.String,
    "title": fields.String,
    "site_name": fields.String,
    "url": fields.String,
    "type": fields.String,
    "size": fields.Integer,
    "source_type": fields.String,
    "source_name": fields.String,
    "thumbnail_url": MediaURL
}

resource_fields = {
    'resource_id': fields.Integer(attribute='id'),
    "metadata": NestedJSON(
        resource_metadata_fields,
        attribute="meta_data",
        allow_null=True
    ),
    "name": fields.String,
    "path": fields.String(attribute="_path"),
    "thumbnail": fields.String(attribute="_thumbnail"),
    "file_name": fields.String(attribute="_file_name")
}

slide_fields = {
    "content": fields.String(attribute="primary_resource.content"),
    "hotspots": fields.Nested(hotspot_fields, allow_null=True),
    "notes": fields.Raw(attribute="_notes"),
    "order": fields.Integer,
    "pins": fields.Nested(pin_fields, allow_null=True),
    "resource": fields.Nested(
        resource_fields,
        attribute="primary_resource",
        allow_null=True
    ),
    "type": fields.String(attribute="primary_resource.resource_type")
}

tenant_fields = {
    "analytics": fields.String,
    "favicon": fields.String(attribute="_favicon"),
    "logo": fields.String(attribute="_logo"),
    "template": fields.String
}

api_fields = {
    "metadata": fields.Raw(attribute="_metadata"),
    "name": fields.String,
    "next": fields.Nested({
        "url": fields.String
    }, allow_null=True),
    "next_chapter": fields.Nested(
        chapter_fields,
        allow_null=True),
    "asset_container": fields.Nested(
        asset_container_fields,
        attribute="_asset_container"
    ),
    "previous": fields.Nested({
        "url": fields.String
    }, allow_null=True),
    "product": fields.Nested({
        "slug": fields.String,
        "is_private": fields.Boolean
    }),
    "section": fields.Nested({
        "slug": fields.String,
        "url": fields.String(attribute="url")
    }),
    "slides": fields.Nested(slide_fields, attribute="_slides"),
    "slug": fields.String,
    "tenant": fields.Nested(tenant_fields),
}


class LaunchpadFeeder(object):
    """
    Launchpad data feeder.

    Return asset/chapter data according to the service which calls this.
    If LaunchpadFeeder is called from 'library',
        then fetch chapter details of a specific section.
    If LaunchpadFeeder is called from 'journey',
        then fetch chapter details of a specific journey.

    **Not to confuse with Flask restful API service**
    """

    def __init__(self, entity_type, entity_slug=None):
        """Initialize the Feeder with entity_type, entity_slug."""
        self.entity_type = entity_type
        self.entity_slug = entity_slug
        self.tenant_id = current_app.tenant_id
        self.locale = session["user"]["locale"]
        self.user = g.user
        self.user_groups = getattr(self.user, 'groups', None)

        self.chapter_slug = None
        self.tenant = None

    def fetch_journey(self, slug):
        """Fetch and load the Journey."""
        journey = Journey.query.filter(
            Journey.tenant_id == self.tenant_id,
            Journey.slug == slug,
            Journey.is_enabled.__eq__(True),
            Journey.is_deleted.__eq__(False)
        )
        if (
            self.user.is_active() and
            self.user.is_viewer() and not
            self.user.is_admin()
        ):
            if self.user_groups:
                group_ids = [grp.id for grp in self.user_groups]
                journey = journey.filter(
                    Journey.restricted_to_groups.any(
                        UserGroup.id.in_(group_ids)
                    )
                )
        return journey.first()

    def fetch(self, slug=None):
        """
        Fetch the chapter details from the slug.

        The chapter details such as title, slides are fetched.
        The sibling chapters are fetched as well
        and are stored under a list called 'asset_container'.
        """
        # If the slug is not present,
        # then the enity should be 'journey'.
        # When a journey is loaded, in the url without chapter slug,
        # the first chapter in that journey is loaded.
        if not slug and self.entity_type != 'journey':
            return {"status": "NOT_FOUND"}

        chapter = None
        if self.entity_type == 'journey':
            self.journey = self.fetch_journey(self.entity_slug)
            if not self.journey:
                return {"status": "NOT_FOUND"}

            if slug:
                self.chapter_slug = slug

            else:
                # When a journey is accessed by journey slug and not by 'journey/chapter_slug',
                # then get the list of valid assets belonging to that journey
                # and display the first valid asset.
                first_asset = None
                for asset in self.journey.assets:
                    if not asset.is_deleted:

                        if asset.asset_type == u'chapter':
                            chapter = self.get_chapter(_id=asset.asset_id)
                            if not chapter:
                                continue

                            self.chapter_slug = chapter.Walkthrough.slug
                        first_asset = asset
                        break

                if not first_asset:
                    return {"status": "NOT_FOUND"}
        else:
            self.chapter_slug = slug

        cache = getattr(current_app, "cache", None)

        cache_key_pattern = "{}_launchpad".format(self.entity_type)
        if self.entity_type == 'journey' and self.entity_slug:
            cache_key_pattern = "{}_{}_launchpad".format(
                self.entity_type, self.entity_slug)

        keys_list = construct_cache_key_list(
            cache_key_pattern,
            self.chapter_slug
        )
        cache_data = cache.get(keys_list[0])
        if cache_data:
            return {
                "status": "FOUND",
                "result": cache_data
            }
        if not chapter:
            chapter = self.get_chapter(slug=self.chapter_slug)

        # check for slug change
        if not chapter:
            old_chapter = SlugRevision.query.filter(
                (SlugRevision.tenant_id == self.tenant_id) &
                (SlugRevision.entity_type == unicode("walkthrough")) &
                (SlugRevision.old_slug == self.chapter_slug)
            ).first()

            if old_chapter:
                old_chapter = Walkthrough.query.filter(
                    Walkthrough.tenant_id == self.tenant_id,
                    Walkthrough.slug == old_chapter.new_slug,
                    Walkthrough.is_deleted.__eq__(False)
                ).first()

                if old_chapter:
                    return {
                        "status": "REDIRECT",
                        "slug": old_chapter.slug
                    }
            return {
                "status": "NOT_FOUND"
            }

        self.chapter = chapter.Walkthrough
        self.tenant = self.chapter.tenant
        self.asset_container = None

        self.chapter.section = self.section = self.chapter.playlist.section
        self.chapter.product = self.product = self.section.get_category()

        # 'asset_container' will be playlist in 'library' app,
        # it can be journey object in case of 'journey' app.
        if self.entity_type == 'library':
            self.asset_container = self.chapter.playlist
            self.active_containers = [
                _p for _p in self.section.playlists
                if _p.is_enabled and not _p.is_deleted
            ]

        elif self.entity_type == 'journey':
            self.asset_container = self.journey
            self.active_containers = Journey.query.filter(
                Journey.tenant_id == self.tenant_id,
                Journey.is_deleted.__eq__(False),
                Journey.is_enabled.__eq__(True)
            ).order_by(Journey.order.asc()).all()

        # check for chapter availabilty
        chapter_translation = self.chapter.get_translation(self.locale)

        if (
            not chapter_translation or
            self.asset_container.is_deleted or
            not self.asset_container.is_enabled or
            not self.section.is_available()
        ):
            return {
                "status": "NOT_FOUND"
            }

        # check for content access restriction
        if self.user.is_anonymous() and (
                self.product.is_private or
                self.section.is_private
        ):
            return {
                "status": "FORBIDDEN"
            }

        if self.user_groups:
            # Chapter is restricted to group of audience
            # Check if user is anonymous and do not belong to that group
            if not self.user.is_active():
                return {
                    "status": "FORBIDDEN"
                }

            if self.chapter.has_groups() and \
                    not self.chapter.is_restricted_to_groups(self.user_groups):
                return {
                    "status": "FORBIDDEN"
                }

            if self.section.has_groups() and\
                    not self.section.is_restricted_to_groups(self.user_groups):
                return {
                    "status": "FORBIDDEN"
                }

        self.update_tenant_info()
        self.load_page_info()
        self.update_asset_container_info()
        self.update_siblings_info()
        self.update_sibling_chapter("previous")
        self.update_sibling_chapter("next")
        self.update_slides_info()

        if self.entity_type == 'library':
            self.update_section_info()

        self.chapter._asset_container = self.asset_container
        result = marshal(self.chapter, api_fields)
        add_to_api_cache(
            cache_key_pattern,
            result,
            slug=self.chapter_slug
        )
        return {
            "result": result,
            "status": "FOUND"
        }

    def get_chapter(self, _id=None, slug=None):
        """
        Get a valid chapter entity tuple with Walkthrough, Playlist, Section.

        Check the entity and its parent entity for deletion or disabled.
        """
        base_query = Walkthrough.query.join(Playlist).join(Section)

        if _id:
            base_query = base_query.filter(Walkthrough.id == _id)
        elif slug:
            base_query = base_query.filter(Walkthrough.slug == slug)
        else:
            raise SharedemosException(500)

        chapter = base_query.filter(
            Walkthrough.tenant_id == self.tenant_id,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True),
            Playlist.is_deleted.__eq__(False),
            Playlist.is_enabled.__eq__(True),
            Section.is_deleted.__eq__(False),
            Section.is_enabled.__eq__(True)
        ).with_entities(Walkthrough, Playlist, Section).first()

        if (
                chapter and
                chapter.Section.is_available()
        ):
            return chapter
        return None

    def get_assets_list(self, container, entity_type):
        """Return valid assets/chapters from the playlist/journey entity."""
        if entity_type == 'library':
            return [
                _c for _c in container.walkthroughs
                if not _c.is_deleted and _c.is_enabled
            ]

        restricted_groups = container.restricted_to_groups
        restricted_group_ids = {group.id for group in restricted_groups}
        assets_list = []

        for asset in container.assets:
            if asset.is_deleted:
                continue
            _asset = get_asset_metadata(asset, restricted_group_ids)
            if _asset:
                assets_list.append(_asset)
        return assets_list

    def load_page_info(self):
        """Get page metadata for given chapter."""
        if self.entity_type == 'library':
            parent_trans = self.section.get_translation(self.locale)

        elif self.entity_type == 'journey':
            parent_trans = self.asset_container.get_translation(self.locale)

        chapter_trans = self.chapter.get_translation(self.locale)

        title = u"{} | {} | {}".format(
            chapter_trans.name,
            parent_trans.name,
            self.tenant.name
        )
        self.chapter._metadata = {
            "title": title,
            "description": parent_trans.description,
            "image": self.chapter.get_thumbnail()
        }

    def update_asset_container_info(self):
        """Update Asset container's (playlist/journey) name and description."""
        translation = self.asset_container.get_translation(self.locale)
        self.asset_container.name = translation.name
        self.asset_container.description = translation.description

        if self.entity_type == u'journey':
            self.update_cta_info()

    def update_cta_info(self):
        _cta = self.asset_container.cta
        if _cta:
            _cta.cta_id = _cta.id
            cta_trans = _cta.get_translation()
            _cta.name = cta_trans.cta_button.get('cta_text')
            _cta.href = cta_trans.cta_button.get('cta_link')
            self.asset_container.cta = _cta

    def update_section_info(self):
        """Update section details including url, name and description."""
        self.section.url = url_for(
            "main.route_handler",
            section=self.section.slug
        )

    def update_siblings_info(self):
        """Update all chapter details inside current asset_container(playlist)."""
        all_chapters = []
        chapters = self.get_assets_list(self.asset_container, self.entity_type)

        if self.chapter not in chapters:
            abort(404)

        next_chapter = None
        for _c in chapters:
            translation = _c.get_locale_translation(self.locale)
            if translation:
                _c.name = translation.name
                if self.entity_type == 'library':
                    _c._url = url_for(
                        "main.launchpad",
                        section=self.section.slug,
                        chapter=_c.slug
                    )
                elif self.entity_type == 'journey':
                    _c._url = url_for(
                        "main.journey",
                        journey_slug=self.journey.slug,
                        chapter_slug=_c.slug
                    )

                all_chapters.append(_c)
        # Set next chapter in the order if not already set
        if not next_chapter and all_chapters.index(self.chapter) < len(all_chapters) - 1:
            next_chapter = all_chapters[all_chapters.index(self.chapter) + 1]
        self.chapter.next_chapter = next_chapter
        self.asset_container._chapters = all_chapters

    def update_sibling_chapter(self, op):
        """Update chapters in sibling asset containers."""
        current_container_index = self.active_containers.index(
            self.asset_container)
        if op == "previous":
            if current_container_index == 0:
                return
            available_containers = self.active_containers[:current_container_index]
            available_containers.reverse()
        elif op == "next":
            if current_container_index + 1 >= len(self.active_containers):
                return
            available_containers = self.active_containers[current_container_index + 1:]

        for container in available_containers:
            _chapters = self.get_assets_list(container, self.entity_type)
            if _chapters:
                url = None
                if self.entity_type == 'library':
                    url = url_for(
                        "main.launchpad",
                        section=self.section.slug,
                        chapter=_chapters[0].slug
                    )
                elif self.entity_type == 'journey':
                    url = url_for(
                        "main.journey",
                        journey_slug=container.slug,
                        chapter_slug=_chapters[0].slug
                    )
                setattr(self.chapter, op, {"url": url})
                break

    def update_slides_info(self):
        """Update all slides information."""
        available_slides = []
        slides = [_s for _s in self.chapter.slides if not _s.is_deleted]
        for _slide in slides:
            _t = _slide.get_locale_translation(self.locale)
            _slide._notes = _t.notes if _t else None

            for _hotspot in _slide.hotspots:
                _t = _hotspot.get_locale_translation(self.locale)
                _hotspot.callout = _t.callout if _t else None

            for _pin in _slide.pins:
                _t = _pin.get_locale_translation(self.locale)
                _pin.callout = _t.callout if _t else None

            update_resource_url(_slide.primary_resource)

            available_slides.append(_slide)

        self.chapter._slides = available_slides

    def update_tenant_info(self):
        """Set the required tenant info."""
        tenant = self.tenant
        if self.tenant.favicon:
            tenant._favicon = static_url(
                filename="media/" + tenant.favicon
            )
        if tenant.logo:
            tenant._logo = static_url(filename="media/" + tenant.logo)
