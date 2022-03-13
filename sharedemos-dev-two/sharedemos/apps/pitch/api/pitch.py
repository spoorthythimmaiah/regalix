"""Sharedemos Apps -Pitch API page."""
import re

from flask import g, current_app, jsonify, session, url_for
from flask.ext.restful import fields, Resource, marshal, reqparse

from sharedemos.api.custom_fields import MediaURL
from sharedemos.libs.api import format_data, is_author
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access,
    login_required
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import copy_file_from_src, build_url
from sharedemos.libs.utils import get_usergroups, set_group_author, validate_user_group
from sharedemos.models import (
    IconLibrary,
    Playlist,
    Section,
    Tenant,
    Walkthrough,
    db
)

from sharedemos.apps.pitch.utils import get_uuid
from sharedemos.apps.pitch.models import (
    DraftPitch,
    DraftPitchTranslations,
    DraftPitchSection,
    DraftPitchSectionTranslations,
    DraftPitchRelatedAssetAssociation,
    Pitch,
    PitchTranslations,
    PitchSection,
    PitchSectionTranslations,
    PitchResource,
    PitchRelatedAssetAssociation
)

related_content_fields = {
    "id": fields.Integer,
    "slug": fields.String,
    "name": fields.String(attribute='_name'),
    "url": fields.String(attribute='_url')
}

user_groups_fields = {
    "_id": fields.Integer(attribute='id'),
    "name": fields.String,
    "is_default": fields.Boolean,
    "is_author": fields.Boolean(attribute='_is_author'),
}

icon_fields = {
    '_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path"),
}

resource_fields = {
    '_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path"),
}

section_api_fields = {
    "uuid": fields.String,
    "title": fields.String,
    "description": fields.String,
    "time_limit": fields.Integer,
    "score": fields.Integer(attribute='base_score'),
    "keywords": fields.List(fields.Raw),
    "base_pitch": fields.Nested(
        resource_fields, allow_null=True, attribute='PitchResource'
    ),
    "has_completed": fields.Boolean,    # Not required for authoring.
    "recording_resource": fields.Nested(
        resource_fields, allow_null=True,
    ),
}

pitch_fields = {
    "uuid": fields.String,
    "title": fields.String,
    "description": fields.String,
    "version": fields.Integer,
    "thumbnail": fields.Nested(
        icon_fields, allow_null=True, attribute='IconLibrary'
    ),
    "tags": fields.List(fields.Raw),
    "sections": fields.Nested(section_api_fields, allow_null=True),
    "sections_count": fields.Integer,
    "is_published": fields.Boolean,
    "created_at": fields.DateTime,
    "restricted_to_groups": fields.Nested(
        user_groups_fields,
        default=[]
    ),
    "related_content": fields.Nested(related_content_fields, allow_null=True),
}

all_pitches_fields = {
    # Tenant's usergroups.
    'user_groups': fields.Nested(user_groups_fields, default=[]),
    'pitches': fields.Nested(pitch_fields, allow_null=True),
}


def get_related_content(related_assets, tenant_template=None):
    """Return list of valid chapters."""
    chapter_ids = [i.chapter_id for i in related_assets]

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
        Walkthrough,
        Playlist,
        Section
    ).all()

    valid_chapters = []
    for chapter in chapters:
        if chapter.Section.is_available():
            chapter.Walkthrough._name = chapter.Walkthrough.get_name()
            if tenant_template in (u'avaya', u'dell'):
                chapter.Walkthrough._url = url_for(
                    'main.launchpad',
                    section=chapter.Section.slug,
                    chapter=chapter.Walkthrough.slug
                )
            else:
                chapter.Walkthrough._url = build_url(
                    chapter.Section.slug, chapter.Walkthrough.slug
                )
            valid_chapters.append(chapter.Walkthrough)

    return valid_chapters


def get_locale_pitches(base_query, base_pitch, base_pitch_trans, locale):
    """Return list of pitches with locale details."""
    return base_query.filter(
        base_pitch_trans.language_id == locale
    ).with_entities(
        base_pitch.order,
        base_pitch.uuid,
        base_pitch.created_at,
        base_pitch_trans.title,
        base_pitch_trans.description,
        base_pitch_trans,
        base_pitch,
        IconLibrary
    ).all()


def get_locale_sections(base_query, base_section, base_section_trans, locale):
    """
    Return list of sections including locale details.

    Each section tuple will contain-
    section.order, section.uuid, section.time_limit, section.base_score,
    trans.language_id, trans.title, trans.description, trans.keywords,
    PitchResource and PitchSection instances.
    """
    return base_query.filter(
        base_section_trans.language_id == locale
    ).with_entities(
        base_section.order,
        base_section.uuid,
        base_section.time_limit,
        base_section.base_score,
        base_section_trans.language_id,
        base_section_trans.title,
        base_section_trans.description,
        PitchResource,
        base_section,
        base_section_trans
    ).all()


pitch_parser = reqparse.RequestParser()
pitch_parser.add_argument(
    'title', type=unicode, required=True, location='json', help='Pitch title required'
)
pitch_parser.add_argument('description', type=unicode,
                          default="", location='json')
pitch_parser.add_argument('restricted_to_groupids',
                          type=list, location='json', default=[])
pitch_parser.add_argument('tags', type=list, location='json', default=[])
pitch_parser.add_argument('icon_id', type=int, location='json')
pitch_parser.add_argument('chapter_ids', type=list, location='json')


class PitchApi(Resource):
    """
    Pitch API to handle GET, POST, PUT, DELETE requests.

    This API supports only for tenant_default_locale.
    """

    method_decorators = [app_subscription_required('PITCH')]

    @login_required
    def get(self, uuid=None, version=None):
        """
        Return draft_pitch or pitch details based on is_author.

        Return list of pitch details if the uuid is None.
        Return Pitch specific details along with section details,
        if uuid is valid.
        Endsite details are fetched/stored in cache.
        """
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        default_locale = tenant.default_locale_id
        tenant._user_groups = tenant.user_groups if tenant.flags.is_private else []
        if tenant._user_groups:
            set_group_author(tenant._user_groups)

        tenant_template = tenant.template
        author = is_author()

        if author:
            base_query = DraftPitch.query.join(
                DraftPitchTranslations
            ).outerjoin(
                IconLibrary
            ).filter(
                DraftPitch.tenant_id == tenant_id,
                DraftPitch.is_deleted.__eq__(False),
            )

            if not uuid:
                pitches = get_locale_pitches(
                    base_query, DraftPitch,
                    DraftPitchTranslations, default_locale
                )

                pitches = sorted(pitches, key=lambda pitch: pitch.order)
                pitches = [pitch._asdict() for pitch in pitches]
                for _pitch in pitches:
                    trans = _pitch['DraftPitchTranslations']
                    _pitch['tags'] = trans.tags or []
                    _pitch['restricted_to_groups'] = _pitch['DraftPitch'].restricted_to_groups
                    _pitch['is_published'] = bool(
                        _pitch['DraftPitch'].published)
                    if _pitch['DraftPitch'].related_assets:
                        _pitch['related_content'] = get_related_content(
                            _pitch['DraftPitch'].related_assets,
                            tenant_template
                        )

                return format_data(marshal(
                    {
                        'user_groups': tenant._user_groups,
                        'pitches': pitches
                    },
                    all_pitches_fields
                ))

            # if uuid, then return specific draft_pitch details.
            base_query = base_query.filter(
                DraftPitch.uuid == uuid
            )

            draft_pitch = base_query.filter(
                DraftPitchTranslations.language_id == default_locale
            ).with_entities(
                DraftPitch.uuid,
                DraftPitch.created_at,
                DraftPitchTranslations.title,
                DraftPitchTranslations.description,
                DraftPitchTranslations,
                DraftPitch
            ).first_or_404()

            draft_pitch = draft_pitch._asdict()
            draft_pitch['tags'] = draft_pitch['DraftPitchTranslations'].tags
            draft_pitch['restricted_to_groups'] = draft_pitch['DraftPitch'].restricted_to_groups
            draft_pitch['is_published'] = bool(
                draft_pitch['DraftPitch'].published)

            section_query = draft_pitch['DraftPitch'].sections_query().outerjoin(
                PitchResource
            )

            sections = get_locale_sections(
                section_query,
                DraftPitchSection, DraftPitchSectionTranslations,
                default_locale
            )

            sections = sorted(sections, key=lambda sec: sec.order)
            sections = [section._asdict() for section in sections]
            for _section in sections:
                section_trans = _section['DraftPitchSectionTranslations']
                _section['keywords'] = section_trans.keywords
            draft_pitch['sections'] = sections

            return format_data(marshal(draft_pitch, pitch_fields))

        # if not author, then fetch published content.
        base_query = Pitch.query.join(
            PitchTranslations
        ).outerjoin(
            IconLibrary
        ).filter(
            Pitch.tenant_id == tenant_id,
            Pitch.is_deleted.__eq__(False),
        )

        if not uuid:
            base_query = base_query.join(
                DraftPitch, DraftPitch.latest_pitch_id == Pitch.id
            )
            pitches = get_locale_pitches(
                base_query, Pitch, PitchTranslations, default_locale
            )

            pitches = sorted(pitches, key=lambda pitch: pitch.order)
            pitches = [pitch._asdict() for pitch in pitches]
            for _pitch in pitches:
                trans = _pitch['PitchTranslations']
                _pitch['tags'] = trans.tags or []
                _pitch['sections_count'] = _pitch['Pitch'].sections_query().count()
                _pitch['version'] = _pitch['Pitch'].version

            return format_data(marshal(
                {
                    'user_groups': tenant._user_groups,
                    'pitches': pitches
                },
                all_pitches_fields
            ))

        # if uuid, then fetch specific pitch details.
        base_query = base_query.filter(
            Pitch.uuid == uuid,
            PitchTranslations.language_id == default_locale
        )

        if version:
            _pitch = base_query.filter(
                Pitch.version == version
            ).with_entities(Pitch, PitchTranslations).first_or_404()
        else:
            _pitch = base_query.order_by(
                Pitch.version.desc()
            ).limit(1).with_entities(
                Pitch, PitchTranslations
            ).first_or_404()

        pitch = _pitch.Pitch
        pitch_trans = _pitch.PitchTranslations

        user_groups = getattr(g.user, 'groups', None)

        # Check for restrictions and raise error.
        if(
            user_groups and
            pitch.has_groups() and
            not pitch.is_restricted_to_groups(user_groups)
        ):
            raise SharedemosException(403)

        # These attribute assignments are made inorder to,
        # get inline with api_fields.
        pitch.title = pitch_trans.title
        pitch.description = pitch_trans.description
        pitch.tags = pitch_trans.tags
        pitch.IconLibrary = pitch_trans.icon

        if pitch.related_assets:
            pitch.related_content = get_related_content(
                pitch.related_assets,
                tenant_template
            )

        section_query = pitch.sections_query().outerjoin(
            PitchResource, PitchResource.id == PitchSectionTranslations.base_pitch_resource_id
        )

        sections = get_locale_sections(
            section_query,
            PitchSection, PitchSectionTranslations,
            default_locale
        )

        sections = sorted(sections, key=lambda sec: sec.order)
        sections = [section._asdict() for section in sections]

        for sec_dict in sections:
            sec_trans = sec_dict['PitchSectionTranslations']
            sec_dict['keywords'] = sec_trans.keywords

            recordings = sec_trans.recordings
            recordings = [
                rec for rec in recordings if rec.submitted_by == g.user.id]
            if recordings:
                # recordings will be sorted by 'created_at',
                # hence assign the latest created recording to the sec_dict.
                latest_record = recordings[-1]
                sec_dict['recording_resource'] = latest_record.resource
                if len(recordings) >= sec_dict['PitchSection'].max_attempts:
                    sec_dict['has_completed'] = True
            # For end user, the base-pitch should not shown.
            sec_dict['PitchResource'] = None

        pitch.sections = sections

        return format_data(marshal(pitch, pitch_fields))

    @has_author_access
    def post(self):
        """Create a new DraftPitch."""
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)

        author_locale = session['author']['locale']
        if author_locale != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name
            )

        post_data = pitch_parser.parse_args()
        invalid_title = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('title')
        )

        if invalid_title:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'title'
            )

        if (
            post_data.get('description') and
            len(post_data['description']) > 300
        ):
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description'
            )

        draft_pitch = DraftPitch()
        draft_pitch.tenant_id = tenant_id
        draft_pitch.uuid = get_uuid(length=12)
        draft_pitch.order = (
            len(
                DraftPitch.query.filter(
                    DraftPitch.tenant_id == tenant_id,
                    DraftPitch.is_deleted.__eq__(False)
                ).all()
            ) + 1
        )
        draft_pitch.created_by = g.user.id

        if post_data.get('chapter_ids'):
            chapters = Walkthrough.query.filter(
                Walkthrough.id.in_(post_data['chapter_ids']),
                Walkthrough.tenant_id == tenant_id
            ).all()
            for chapter in chapters:
                association = DraftPitchRelatedAssetAssociation()
                association.chapter_id = chapter.id
                association.tenant_id = tenant_id
                draft_pitch.related_assets.append(association)

        draft_pitch_trans = DraftPitchTranslations()
        draft_pitch_trans.language_id = tenant.default_locale_id
        draft_pitch_trans.title = post_data['title']
        draft_pitch_trans.description = post_data.get('description')
        draft_pitch_trans.tags = post_data.get('tags')
        draft_pitch_trans.icon_id = post_data.get('icon_id')
        draft_pitch_trans.pitch = draft_pitch

        group_ids = post_data.get('restricted_to_groupids')
        if group_ids:
            validate_user_group(
                group_ids,
                tenant_id
            )   # raises exception if validation fails.
            draft_pitch.restricted_to_groups = get_usergroups(
                group_ids
            )
        else:
            draft_pitch.restricted_to_groups = []

        db.session.add_all([draft_pitch_trans, draft_pitch])
        db.session.commit()

        return jsonify(status='CREATED')

    @has_author_access
    def put(self, uuid):
        """Update Pitch title, description, tags."""
        tenant_id = current_app.tenant_id
        draft_pitch = DraftPitch.query.filter(
            DraftPitch.tenant_id == tenant_id,
            DraftPitch.uuid == uuid,
            DraftPitch.is_deleted.__eq__(False)
        ).first_or_404()

        put_data = pitch_parser.parse_args()
        invalid_title = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('title')
        )

        if invalid_title:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'title'
            )

        if (
            put_data.get('description') and
            len(put_data['description']) > 300
        ):
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description'
            )

        draft_pitch.modified_by = g.user.id

        if put_data['chapter_ids'] is not None:

            # While editing, the author can add/remove chapters.
            # So in the model, we are removing all the existing ones,
            # and adding the new chapters' association.
            # This is necessary in sqlalchemy for this type of association
            # as we can't just empty the 'related_assets list' and append new ones.

            if draft_pitch.related_assets:
                # An extra 'if' is needed, inorder to accomodate
                # the intermediate 'commit'.
                for related_asset in draft_pitch.related_assets:
                    db.session.delete(related_asset)
                db.session.commit()

            if put_data['chapter_ids']:
                chapters = Walkthrough.query.filter(
                    Walkthrough.id.in_(put_data['chapter_ids']),
                    Walkthrough.tenant_id == tenant_id
                ).all()

                for chapter in chapters:
                    association = DraftPitchRelatedAssetAssociation()
                    association.chapter_id = chapter.id
                    association.tenant_id = tenant_id
                    draft_pitch.related_assets.append(association)

        tenant = draft_pitch.tenant
        draft_pitch_trans = DraftPitchTranslations.query.filter(
            DraftPitchTranslations.pitch_id == draft_pitch.id,
            DraftPitchTranslations.language_id == tenant.default_locale_id
        ).first()

        draft_pitch_trans.title = put_data['title']
        draft_pitch_trans.description = put_data.get('description')
        draft_pitch_trans.tags = put_data.get('tags')
        draft_pitch_trans.icon_id = put_data.get('icon_id')

        group_ids = put_data.get('restricted_to_groupids')
        if group_ids:
            validate_user_group(
                group_ids,
                tenant_id
            )   # raises exception if validation fails.
            draft_pitch.restricted_to_groups = get_usergroups(
                group_ids
            )
        else:
            draft_pitch.restricted_to_groups = []

        db.session.add_all([draft_pitch_trans, draft_pitch])
        db.session.commit()

        return jsonify(status='MODIFIED')

    @has_author_access
    def patch(self, uuid):
        """Publish the Pitch."""
        tenant_id = current_app.tenant_id
        draft_pitch = DraftPitch.query.filter(
            DraftPitch.tenant_id == tenant_id,
            DraftPitch.uuid == uuid,
            DraftPitch.is_deleted.__eq__(False)
        ).first_or_404()

        pitch = Pitch()
        pitch.version = len(draft_pitch.published) + 1
        pitch.tenant_id = draft_pitch.tenant_id
        pitch.uuid = draft_pitch.uuid
        pitch.order = draft_pitch.order
        pitch.created_by = g.user.id
        pitch.draft_id = draft_pitch.id
        pitch.restricted_to_groups = draft_pitch.restricted_to_groups

        if draft_pitch.related_assets:
            chapter_ids = [i.chapter_id for i in draft_pitch.related_assets]

            for chapter_id in chapter_ids:
                association = PitchRelatedAssetAssociation()
                association.chapter_id = chapter_id
                association.tenant_id = tenant_id
                pitch.related_assets.append(association)

        for draft_pitch_trans in draft_pitch.translations:
            pitch_trans = PitchTranslations()
            pitch_trans.language_id = draft_pitch_trans.language_id
            pitch_trans.title = draft_pitch_trans.title
            pitch_trans.description = draft_pitch_trans.description
            pitch_trans.tags = draft_pitch_trans.tags
            pitch_trans.pitch = pitch

            if draft_pitch_trans.icon_id:
                copy_status = copy_file_from_src(draft_pitch_trans.icon.path)
                if copy_status.get('msg') == 'COPY_ERROR':
                    raise SharedemosException(500, copy_status.get('msg'))
                new_icon = draft_pitch_trans.icon.duplicate()
                new_icon.path = copy_status.get('path')

                pitch_trans.icon = new_icon
                db.session.add(new_icon)
            db.session.add(pitch_trans)

        draft_pitch_sections = draft_pitch.sections_query().all()
        # Publishing empty pitch is not allowed.
        if not draft_pitch_sections:
            raise SharedemosException(500, 'NO_CONTENT')

        for draft_section in draft_pitch_sections:
            new_section = PitchSection()
            new_section.uuid = draft_section.uuid
            new_section.tenant_id = draft_section.tenant_id
            new_section.order = draft_section.order
            new_section.base_score = draft_section.base_score
            new_section.max_attempts = draft_section.max_attempts
            new_section.time_limit = draft_section.time_limit
            new_section.draft = draft_section
            new_section.pitch = pitch

            for draft_sec_trans in draft_section.translations:
                section_trans = PitchSectionTranslations()
                section_trans.language_id = draft_sec_trans.language_id
                section_trans.title = draft_sec_trans.title
                section_trans.description = draft_sec_trans.description
                section_trans.keywords = draft_sec_trans.keywords
                section_trans.base_pitch_resource_id = draft_sec_trans.base_pitch_resource_id
                section_trans.section = new_section
                db.session.add(section_trans)
            db.session.add(new_section)

        draft_pitch.latest_pitch = pitch
        db.session.add_all([pitch, draft_pitch])
        db.session.commit()

        return jsonify(status='PUBLISHED')

    @has_author_access
    def delete(self, uuid):
        """Mark Pitch as deleted."""
        tenant_id = current_app.tenant_id
        draft_pitch = DraftPitch.query.filter(
            DraftPitch.tenant_id == tenant_id,
            DraftPitch.uuid == uuid,
            DraftPitch.is_deleted.__eq__(False)
        ).first_or_404()

        draft_pitch.is_deleted = True
        for pitch in draft_pitch.published:
            pitch.is_deleted = True
            db.session.add(pitch)

        db.session.add(draft_pitch)
        db.session.commit()

        return jsonify(status='DELETED')
