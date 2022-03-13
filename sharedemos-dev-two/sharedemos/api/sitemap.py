
"""Build a sitemap tree for library content.

    In order to achieve this, we can't afford to have DB calls in loop.
    We need to keep the data ready.
    Data required from 5 Tables:
        section
        playlist
        draft_walkthrough
        draft_slide
        section_restricted_users
    IDEA:
        1. Get all sections in order of time created(timestamp not necessarily works for all content)
            update section metadata
            keep data mapping using dictionary
            remove deleted/disabled section using section's parent_id(this will result in all active content in the site)
        2. Get all playlists
            update playlist metadata
            remove orphan playlists using playlist's section_id(compare with avaiable section data in step 1)
        3. Get all draft slide and draft chapter
            keep slide count for all chapters in a dictionary
            update chapter metadata + update slide count for each chapter
            ####################################################################
                * reason not used joins between chapter and slide table
                - Chapters may not have slides all the time,
                author can keep placeholders for content to be added later
                - If we join above 2 tables, then chapters with no slides will be filtered out
                    and not considered as there is no relationship exists yet
                - so slide count computation is isolated
            ####################################################################
            remove orphan chapters using chapter's playlist_id(compare with avaiable playlist data in step 2)
        4. Loop through each chapter and update playlist information.
        5. Loop through each playlist
            update section information
            update demos/slide count for each parent section
        6. Update children information(from top to bottom)
        7. Filter results to get only products.
        8. Get section restriction info for logged in user.
        9. Apply restriction for given product path.

"""
from flask import current_app, g
from flask.ext.restful import Resource

from sqlalchemy import BOOLEAN, and_, case, func

from sharedemos.libs.decorators import has_author_access
from sharedemos.models import (
    DraftSlide,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Playlist,
    PlaylistTranslations,
    Section,
    SectionsRestrictedUsers,
    SectionTranslations,
    Tenant
)


class SitemapManager(object):

    def __init__(self):
        self.tenant_id = current_app.tenant_id
        self.chapters = {}
        self.playlists = {}
        self.sections = {}
        self.sitemap = []

        self.load_sitemap()

    def get_row_data(self, row, columns=[]):
        cols = {}
        for col in columns:
            cols[col] = getattr(row, col)

        return cols

    def load_chapters(self):
        sl_list = DraftSlide.query.filter(
            DraftSlide.is_deleted.__eq__(False),
            DraftSlide.tenant_id == self.tenant_id
        ).with_entities(
            DraftSlide.walkthrough_id,
            func.count(DraftSlide.id).label("slides_count")
        ).group_by(
            DraftSlide.walkthrough_id
        ).all()

        slides_store = {_sl.walkthrough_id: _sl.slides_count for _sl in sl_list}

        chapter_list = DraftWalkthrough.query.filter(
            DraftWalkthrough.tenant_id == self.tenant_id,
            DraftWalkthrough.is_enabled.__eq__(True),
            DraftWalkthrough.is_deleted.__eq__(False),
        ).join(
            Tenant
        ).join(
            DraftWalkthroughTranslations,
            and_(
                DraftWalkthroughTranslations.walkthrough_id == DraftWalkthrough.id,
                DraftWalkthroughTranslations.language_id == Tenant.default_locale_id
            )
        ).with_entities(
            DraftWalkthrough.id,
            DraftWalkthroughTranslations.name,
            DraftWalkthrough.order,
            DraftWalkthrough.playlist_id,
            DraftWalkthrough.slug
        ).group_by(
            DraftWalkthrough.id,
            DraftWalkthroughTranslations.name
        ).order_by(
            DraftWalkthrough.created_at
        ).all()

        for _c in chapter_list:
            # Clean up chapters under deleted or disabled playlists
            if _c.playlist_id not in self.playlists:
                continue

            _chapter = self.get_row_data(
                _c,
                columns=["id", "name", "order", "playlist_id", "slug"]
            )
            _chapter["slides_count"] = slides_store.get(_c.id, 0)
            self.chapters[_c.id] = _chapter

    def load_playlists(self):
        p_list = Playlist.query.filter(
            Playlist.tenant_id == self.tenant_id,
            Playlist.is_enabled.__eq__(True),
            Playlist.is_deleted.__eq__(False),
        ).join(
            Tenant
        ).join(
            PlaylistTranslations,
            and_(
                PlaylistTranslations.playlist_id == Playlist.id,
                PlaylistTranslations.language_id == Tenant.default_locale_id
            )
        ).with_entities(
            Playlist.id,
            PlaylistTranslations.name,
            Playlist.order,
            Playlist.section_id,
        ).order_by(
            Playlist.created_at
        ).all()

        self.playlists = {
            _p.id: self.get_row_data(_p, columns=[
                "id", "name", "order", "section_id"])
            for _p in p_list
            if _p.section_id in self.sections
        }

    def load_sections(self):
        section_list = Section.query.filter(
            Section.tenant_id == self.tenant_id,
            Section.is_enabled.__eq__(True),
            Section.is_deleted.__eq__(False),
            Tenant.id == self.tenant_id
        ).join(
            Tenant
        ).join(
            SectionTranslations,
            and_(
                SectionTranslations.section_id == Section.id,
                SectionTranslations.language_id == Tenant.default_locale_id
            )
        ).with_entities(
            Section.id,
            SectionTranslations.name,
            case(
                [(SectionTranslations.resource_id.cast(BOOLEAN), True), ],
                else_=False
            ).label("is_asset"),
            Section.order,
            Section.parent_id,
            Section.slug
        ).order_by(
            Section.created_at
        ).all()

        self.sections = {
            _s.id: self.get_row_data(_s, columns=[
                "id", "is_asset", "name", "order", "parent_id", "slug"])
            for _s in section_list
        }

        for _s in self.sections.copy():
            if not self.is_section_available(self.sections[_s]["parent_id"]):
                self.sections.pop(_s)
                continue

            if not self.sections[_s]["is_asset"]:
                self.sections[_s]["demos_count"] = 0
                self.sections[_s]["slides_count"] = 0

    def load_sitemap(self):
        self.load_sections()
        self.load_playlists()
        self.load_chapters()

        self.update_asset_count()

        for _sid in self.sections:
            self.update_children_info(_sid)

        self.sitemap = sorted(
            [self.sections[sid] for sid in self.sections
             if not self.sections[sid]["parent_id"]],
            key=lambda i: i["order"]
        )

        self.set_content_privacy()

    def is_section_available(self, section_id):
        if not section_id:
            return True
        if section_id in self.sections:
            return self.is_section_available(
                self.sections[section_id]["parent_id"]
            )
        return False

    def update_asset_count(self):
        for _chid in self.chapters:
            _plid = self.chapters[_chid]["playlist_id"]
            _pl = self.playlists[_plid]
            _ch = self.chapters[_chid]
            if "chapters" not in _pl:
                _pl.update({
                    "chapters": [],
                    "slides_count": 0,
                    "demos_count": 0
                })

            _chapters = _pl["chapters"]
            _chapters.append(_ch)
            _pl["demos_count"] += 1
            _pl["slides_count"] += _ch["slides_count"]
            _pl["chapters"] = sorted(_chapters, key=lambda i: i['order'])

        for _plid in self.playlists:
            _pl = self.playlists[_plid]
            _sid = _pl["section_id"]
            _s = self.sections[_sid]
            if "playlists" not in _s:
                _s.update({
                    "playlists": [],
                    "slides_count": 0,
                    "demos_count": 0
                })

            _playlists = _s["playlists"]
            _playlists.append(self.playlists[_plid])
            _s["playlists"] = sorted(_playlists, key=lambda i: i['order'])

            _dc = self.playlists[_plid].get("demos_count", 0)
            _sc = self.playlists[_plid].get("slides_count", 0)
            _s["demos_count"] += _dc
            _s["slides_count"] += _sc

            self.update_chapter_count(
                _sid,
                count={
                    "demos": _dc,
                    "slides": _sc,
                }
            )

    def update_chapter_count(self, section_id, **kwargs):
        _section = self.sections[section_id]
        _pid = _section["parent_id"]
        if _pid:
            _parent = self.sections[_pid]
            if "demos_count" not in _parent:
                _parent["demos_count"] = 0

            if "slides_count" not in _parent:
                _parent["slides_count"] = 0

            _parent["demos_count"] += kwargs["count"]["demos"]
            _parent["slides_count"] += kwargs["count"]["slides"]
            self.update_chapter_count(_pid, **kwargs)

    def update_children_info(self, section_id):
        _section = self.sections[section_id]
        _children = [
            self.sections[_sid]
            for _sid, _s in self.sections.copy().items()
            if _s["parent_id"] == section_id
        ]
        if _children:
            _section["children"] = sorted(_children, key=lambda i: i["order"])

    def set_content_privacy(self):
        if g.user.is_active() and g.user.is_author():
            sections = SectionsRestrictedUsers.query.filter(
                SectionsRestrictedUsers.user_id == g.user.id,
                SectionsRestrictedUsers.is_granted.__eq__(False)
            ).all()

            section_ids = [_s.section_id for _s in sections]

            for _s in self.sitemap:
                _s["editable"] = False if _s["id"] in section_ids else True
                self.update_privacy(_s)

    def update_privacy(self, section):
        for _ch in section.get("children", []):
            _ch["editable"] = section["editable"]
            self.update_privacy(_ch)


class SiteMapApi(Resource):

    @has_author_access
    def get(self):
        """Site map data for dashboard."""
        sm = SitemapManager()
        return sm.sitemap, 200
