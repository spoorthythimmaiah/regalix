"""Sharedemos Apps -PitchRecording API page."""
import os
import requests
from flask import g, current_app, jsonify, url_for
from flask.ext.restful import Resource, reqparse

from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import db

from sharedemos.apps.pitch.models import (
    Pitch,
    PitchSection,
    PitchRecording,
    PitchResult
)

parser = reqparse.RequestParser()
parser.add_argument(
    'pitch_version', type=int, required=True,
    location='json', help='Pitch version required.'
)
parser.add_argument(
    'section_uuid', type=unicode, required=True,
    location='json', help='PitchSection uuid required.'
)
parser.add_argument(
    'resource_id', required=True, type=int,
    location='json', help='Recording resource id.'
)


class PitchRecordingApi(Resource):
    """Pitch Recording API to handle POST request."""

    @app_subscription_required('PITCH')
    def post(self):
        """
        Create new recording record submitted by a user.

        Note: Attempts code has been removed, as its not being used.
        On re-taking if a recording exists, then modify its data,
        send the same recording id to create new result.
        """
        tenant_id = current_app.tenant_id

        post_data = parser.parse_args()
        section = PitchSection.query.join(Pitch).filter(
            Pitch.tenant_id == tenant_id,
            Pitch.is_deleted.__eq__(False),
            Pitch.version == post_data['pitch_version'],
            PitchSection.is_deleted.__eq__(False),
            PitchSection.uuid == post_data['section_uuid']
        ).first_or_404()

        pitch = section.pitch
        if pitch.is_restricted_to_groups([g.user.id]):
            raise SharedemosException(401)

        locale_id = pitch.tenant.default_locale_id

        recording = None
        for trans in section.translations:
            if trans.language_id == locale_id:
                for rec in trans.recordings:
                    if rec.submitted_by == g.user.id:
                        recording = rec
                        break
                break

        if not recording:
            recording = PitchRecording()
            recording.submitted_by = g.user.id
            recording.tenant_id = tenant_id
            recording.section_trans_id = trans.id

        recording.resource_id = post_data['resource_id']

        db.session.add(recording)
        db.session.commit()

        if recording.section_translation.base_pitch_resource_id:
            # Send a POST request to Pitch Comparison API(P_C_A) Service.
            # Store the response id in PitchResult.
            baseline = recording.section_translation.base_pitch_resource.meta_data['compare_id']
            callback = 'https://{}{}?user={}&password={}'.format(
                section.tenant.domain,
                url_for('pitch.compare_callback'),
                current_app.config['AUTH_USER'],
                current_app.config['AUTH_PASSWORD'],
            )
            resource_file = os.path.join(
                current_app.config['MEDIA_FOLDER'], recording.resource.path
            )

            try:
                with open(resource_file, 'rb') as media_file:
                    response = requests.post(
                        current_app.config['PITCH_COMPARISON_API_URL'],
                        headers={
                            'baseline': baseline,
                            'callback': callback
                        },
                        data=media_file
                    )
                    response = response.json()
                    pitch_result = PitchResult(
                        compare_id=response['id'],
                        recording_id=recording.id,
                        tenant_id=tenant_id,
                        base_score=section.base_score
                    )
                    db.session.add(pitch_result)
                    db.session.commit()
            # Any exceptions related to P_C_A service call will be logged onto a file.
            except Exception as e:
                print e

        return jsonify(status='CREATED')
