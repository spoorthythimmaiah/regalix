"""Sharedemos Apps -Pitch Result API page."""

from flask import current_app, jsonify, session
from flask.ext.restful import Resource, reqparse

from sharedemos.libs.decorators import (
    app_subscription_required,
    has_admin_access
)
from sharedemos.models import db
from sharedemos.apps.pitch.models import PitchResult


result_parser = reqparse.RequestParser()
result_parser.add_argument('similarity_of_pitch', type=float, location='json', default=0.0)
result_parser.add_argument('duration_of_pitch', type=float, location='json', default=0.0)
result_parser.add_argument('coverage_of_topics', type=float, location='json', default=0.0)
result_parser.add_argument('clarity_of_speech', type=float, location='json', default=0.0)


class PitchResultApi(Resource):
    """PitchResultApi handles 'PATCH' request."""

    method_decorators = [app_subscription_required('PITCH'), has_admin_access]

    def patch(self, compare_uuid):
        """Update results which are provided by an admin user."""
        result = PitchResult.query.filter(
            PitchResult.compare_id == compare_uuid,
            PitchResult.tenant_id == current_app.tenant_id
        ).first_or_404()

        result_data = result_parser.parse_args()

        if result_data['similarity_of_pitch']:
            result.score['similarity_of_pitch'] = result_data['similarity_of_pitch'] / 100.0

        if result_data['duration_of_pitch']:
            result.score['duration_of_pitch'] = result_data['duration_of_pitch'] / 100.0

        if result_data['coverage_of_topics']:
            result.score['coverage_of_topics'] = result_data['coverage_of_topics'] / 100.0

        if result_data['clarity_of_speech']:
            result.score['clarity_of_speech'] = result_data['clarity_of_speech'] / 100.0

        result.evaluated_by = session['user_id']
        db.session.add(result)
        db.session.commit()

        return jsonify(status='UPDATED')
