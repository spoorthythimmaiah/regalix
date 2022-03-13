"""Sharedemos Apps -PitchSection API page."""
import os
import re
import requests

from flask import g, current_app, jsonify, session
from flask.ext.restful import Resource, reqparse

from sqlalchemy.ext.mutable import MutableDict

from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import Tenant, db

from sharedemos.apps.pitch.utils import get_uuid
from sharedemos.apps.pitch.models import (
    DraftPitch,
    DraftPitchSection,
    DraftPitchSectionTranslations,
)


def upload_baseline_resource(resource, keywords):
    """
    Call the P_C_A service to get a baseline id.

    Upload the base pitch and get the baseline id,
    store it in the resource meta_data field.
    """
    try:
        resource_file = os.path.join(
            current_app.config['MEDIA_FOLDER'], resource.path
        )
        with open(resource_file, 'rb') as media_file:
            response = requests.post(
                current_app.config['PITCH_BASELINE_API_URL'],
                headers={
                    'script': '',
                    'mandatory': keywords
                },
                data=media_file
            )
            response = response.json()
            resource.meta_data = MutableDict({'compare_id': response['id']})
            db.session.add(resource)
            db.session.commit()

    except Exception as e:
        print e


parser = reqparse.RequestParser()
parser.add_argument(
    'pitch_uuid', type=unicode, required=True, location='json', help='Pitch uuid required.'
)
parser.add_argument(
    'title', type=unicode, required=True, location='json', help='PitchSection title required.'
)
parser.add_argument('description', type=unicode, default="", location='json')
parser.add_argument(
    'time_limit', type=int, location="json", help='Time limit for recording in seconds.'
)
parser.add_argument('keywords', type=list, location='json', default=[])
parser.add_argument('score', required=True, type=int, location='json', help='Base score required.')
parser.add_argument('base_pitch_id', type=int, location='json', help='Base pitch id.')
parser.add_argument('max_attempts', type=int, location='json', help='Number of maximum attempts.')


class PitchSectionApi(Resource):
    """Pitch Section API to handle POST PUT DELETE request."""

    method_decorators = [app_subscription_required('PITCH'), has_author_access]

    def post(self):
        """Create new section."""
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)

        author_locale = session['author']['locale']
        if author_locale != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name
            )

        post_data = parser.parse_args()
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
            len(post_data['description']) > 500
        ):
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description'
            )

        draft_pitch = DraftPitch.query.filter(
            DraftPitch.tenant_id == tenant_id,
            DraftPitch.uuid == post_data['pitch_uuid'],
            DraftPitch.is_deleted.__eq__(False)
        ).first_or_404()

        draft_section = DraftPitchSection()
        draft_section.order = len(
            draft_pitch.sections_query().all()
        ) + 1
        draft_section.uuid = get_uuid(length=12)
        draft_section.base_score = post_data['score']
        draft_section.time_limit = post_data.get('time_limit')      # Stored in 'seconds'.
        draft_section.max_attempts = post_data.get('max_attempts')
        draft_section.pitch_id = draft_pitch.id
        draft_section.created_by = g.user.id
        draft_section.tenant_id = tenant_id

        draft_section_trans = DraftPitchSectionTranslations()
        draft_section_trans.title = post_data['title']
        draft_section_trans.description = post_data.get('description')
        draft_section_trans.keywords = post_data.get('keywords')
        draft_section_trans.base_pitch_resource_id = post_data.get('base_pitch_id')
        draft_section_trans.language_id = tenant.default_locale_id
        draft_section_trans.section = draft_section

        db.session.add_all([draft_section_trans, draft_section])
        db.session.commit()

        if post_data.get('base_pitch_id'):
            # Todo: Need to create a Compare_API class.
            upload_baseline_resource(
                draft_section_trans.base_pitch_resource,
                draft_section_trans.keywords
            )
        return jsonify(status='CREATED')

    def put(self, uuid):
        """Update PitchSection title, description, keywords."""
        tenant_id = current_app.tenant_id
        draft_section = DraftPitchSection.query.filter(
            DraftPitchSection.tenant_id == tenant_id,
            DraftPitchSection.uuid == uuid,
            DraftPitchSection.is_deleted.__eq__(False)
        ).first_or_404()

        draft_pitch = draft_section.pitch
        if draft_pitch.is_deleted:
            raise SharedemosException(404)

        put_data = parser.parse_args()
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
            len(put_data['description']) > 500
        ):
            raise SharedemosException(
                412, message=SharedemosException.LENGTH_EXCEEDED
                % 'description'
            )

        draft_section.modified_by = g.user.id
        if put_data.get('time_limit') is not None:
            draft_section.time_limit = put_data['time_limit']

        if put_data.get('score') is not None:
            draft_section.base_score = put_data['score']

        draft_section.max_attempts = put_data.get('max_attempts')

        draft_section_trans = DraftPitchSectionTranslations.query.filter(
            DraftPitchSectionTranslations.section_id == draft_section.id,
            DraftPitchSectionTranslations.language_id == draft_pitch.tenant.default_locale_id
        ).first_or_404()

        draft_section_trans.title = put_data['title']
        draft_section_trans.description = put_data.get('description')
        draft_section_trans.keywords = put_data.get('keywords')

        is_baseline_updated = None
        # If the base pitch resource has been updated,
        # then call P_C_A service to update the baseline record.
        if put_data.get('base_pitch_id'):
            is_baseline_updated = (
                draft_section_trans.base_pitch_resource_id != put_data['base_pitch_id']
            )
            draft_section_trans.base_pitch_resource_id = put_data.get('base_pitch_id')

        db.session.add_all([draft_section_trans, draft_section])
        db.session.commit()

        if is_baseline_updated:
            upload_baseline_resource(
                draft_section_trans.base_pitch_resource,
                draft_section_trans.keywords
            )

        return jsonify(status='MODIFIED')

    def delete(self, uuid):
        """
        Mark DraftPitchSection as deleted.

        Deletes only draft version,
        the endsite section is still accessible,
        the endsite sections will get deleted/inaccessible only
        when a pitch gets deleted.
        """
        tenant_id = current_app.tenant_id
        draft_section = DraftPitchSection.query.filter(
            DraftPitchSection.tenant_id == tenant_id,
            DraftPitchSection.uuid == uuid,
            DraftPitchSection.is_deleted.__eq__(False)
        ).first_or_404()

        draft_pitch = draft_section.pitch
        if draft_pitch.is_deleted:
            raise SharedemosException(404)

        draft_section.is_deleted = True
        db.session.add(draft_section)
        db.session.commit()

        # commit is used twice since we are using
        # synchronize_session = 'False' inorder to perform
        # efficient and reliable update once the session is expired.
        DraftPitchSection.query.filter(
            DraftPitchSection.order > draft_section.order
        ).update(
            {DraftPitchSection.order: DraftPitchSection.order - 1},
            synchronize_session=False
        )
        db.session.commit()

        return jsonify(status='DELETED')
