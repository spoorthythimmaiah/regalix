"""Sharedemos Apps -Pitch User Activity API page."""

from flask import abort, current_app
from flask.ext.restful import fields, marshal, Resource

from sharedemos.libs.url import static_url
from sharedemos.models import User

from sharedemos.apps.pitch.models import (
    Pitch,
    PitchSection,
    PitchSectionActivity,
    PitchSectionTranslations,
    PitchRecording,
    PitchRecordingActivity,
    PitchResource,
    PitchResult,
)
from sharedemos.apps.pitch.utils import (
    get_dates_from_request_args,
    get_user_proficiency
)

score_fields = {
    'uuid': fields.String,
    'clarity_of_speech': fields.Float,
    'coverage_of_topics': fields.Float,
    'similarity_of_base_pitch': fields.Float,
    'duration_of_pitch': fields.Float
}

user_detail_fields = {
    'pitch_name': fields.String,
    'username': fields.String,
    'name': fields.String,
    'proficiency': fields.String,
    'date': fields.DateTime,
    'profile_pic': fields.String,
    'scores': fields.Nested(score_fields),
    'sections': fields.Nested({
        'uuid': fields.String,
        'name': fields.String,
        'description': fields.String,
        'recording': fields.String,
        'user_score': fields.Float,
        'base_score': fields.Float,
        'scores': fields.Nested(score_fields)
    })
}


class PitchUserActivityApi(Resource):
    """PitchUserActivityApi handles GET request."""

    def get(self, pitch_uuid, username, version):
        """Return user details w.r.t pitch uuid, username and version."""
        tenant_id = current_app.tenant_id
        user = User.query.filter(
            User.tenant_id == tenant_id,
            User.username == username,
            User.is_deleted.__eq__(False)
        ).first_or_404()

        pitch = Pitch.query.filter(
            Pitch.tenant_id == tenant_id,
            Pitch.uuid == pitch_uuid,
            Pitch.version == version,
            Pitch.is_deleted.__eq__(False)
        ).first_or_404()

        from_date, to_date = get_dates_from_request_args()

        activities = PitchSectionActivity.query.filter(
            PitchSectionActivity.tenant_id == tenant_id,
            PitchSectionActivity.user_id == user.id,
            PitchSectionActivity.pitch_id == pitch.id,
            PitchSectionActivity.created_at.between(from_date, to_date),
        ).distinct(PitchSectionActivity.section_id).all()

        picture_url = static_url(filename='media/' + user.picture_url) if user.picture_url else None
        user_details = {
            'pitch_name': pitch.get_name(),
            'username': user.username,
            'name': user.fullname,
            'profile_pic': picture_url,
            'proficiency': '',
            'date': '',
            'scores': {
                'clarity_of_speech': 0,
                'coverage_of_topics': 0,
                'similarity_of_base_pitch': 0,
                'duration_of_pitch': 0
            },
            'sections': [
                {
                    'uuid': '',
                    'name': '',
                    'description': '',
                    'recording': '',
                    'scores': {
                        'uuid': '',
                        'clarity_of_speech': 0,
                        'coverage_of_topics': 0,
                        'similarity_of_base_pitch': 0,
                        'duration_of_pitch': 0
                    }
                }
            ]
        }

        section_ids = [a.section_id for a in activities]
        if not section_ids:
            abort(404, description='No Activities')

        # Get sections, results, resources from recordings.
        recordings = PitchRecordingActivity.query.join(
            PitchRecording, PitchRecording.id == PitchRecordingActivity.recording_id
        ).join(
            PitchResource, PitchResource.id == PitchRecording.resource_id
        ).join(
            PitchSection, PitchSection.id == PitchRecordingActivity.section_id
        ).join(
            PitchSectionTranslations, PitchSectionTranslations.section_id == PitchSection.id
        ).join(
            PitchResult, PitchResult.recording_id == PitchRecordingActivity.recording_id
        ).join(
            User, User.id == PitchRecordingActivity.user_id
        ).filter(
            PitchRecordingActivity.tenant_id == tenant_id,
            PitchRecordingActivity.user_id == user.id,
            PitchRecording.submitted_by == user.id,
            PitchRecordingActivity.section_id.in_(section_ids),
            PitchRecordingActivity.created_at.between(from_date, to_date)
        ).with_entities(
            PitchResult,
            PitchResource,
            PitchSection,
            PitchSectionTranslations,
            User
        ).all()

        # For every record submission, a recording activity will be created.
        # So get the latest submission's record for a section by the user.
        filtered_records = {}
        for r in recordings:
            record_key = (r.PitchSection, r.PitchSectionTranslations, r.PitchResource)

            if record_key not in filtered_records:
                filtered_records[record_key] = r.PitchResult

            elif filtered_records[record_key].created_at < r.PitchResult.created_at:
                filtered_records[record_key] = r.PitchResult

        total_count = 0
        section_details = {}
        result_date = None
        user_scores = {
            'clarity_of_speech': 0,
            'coverage_of_topics': 0,
            'similarity_of_base_pitch': 0,
            'duration_of_pitch': 0,
            'score': 0,
            'total_score': 0
        }

        for record in filtered_records:

            section = record[0]
            section_trans = record[1]
            resource = record[2]

            result = filtered_records[record]
            result_date = result.created_at
            score = result.score
            total_count += 1

            recording_file = static_url(filename='media/' + resource.path) if resource.path else None
            section_details[section] = {
                'uuid': section.uuid,
                'order': section.order,
                'name': section_trans.title,
                'description': section_trans.description,
                'recording': recording_file,
                'user_score': result.total_score,
                'base_score': section.base_score,
                'scores': {
                    'uuid': result.compare_id,
                    'clarity_of_speech': score['clarity_of_speech'] * 100.0,
                    'coverage_of_topics': score['coverage_of_topics'] * 100.0,
                    'similarity_of_base_pitch': score['similarity_of_pitch'] * 100.0,
                    'duration_of_pitch': score['duration_of_pitch'] * 100.0
                }
            }

            user_scores['score'] += result.total_score
            user_scores['total_score'] += section.base_score

            user_scores['clarity_of_speech'] += score['clarity_of_speech']
            user_scores['coverage_of_topics'] += score['coverage_of_topics']
            user_scores['similarity_of_base_pitch'] += score['similarity_of_pitch']
            user_scores['duration_of_pitch'] += score['duration_of_pitch']

        if total_count:
            user_details['scores'] = {
                'clarity_of_speech': (
                    user_scores['clarity_of_speech'] / total_count * 100
                ),
                'coverage_of_topics': (
                    user_scores['coverage_of_topics'] / total_count * 100
                ),
                'similarity_of_base_pitch': (
                    user_scores['similarity_of_base_pitch'] / total_count * 100
                ),
                'duration_of_pitch': (
                    user_scores['duration_of_pitch'] / total_count * 100
                )
            }

        if user_scores['total_score']:
            percent_user_score = (
                user_scores['score'] / user_scores['total_score']
            ) * 100
            user_details['proficiency'] = get_user_proficiency(percent_user_score)

        user_details['date'] = result_date
        user_details['sections'] = sorted(
            section_details.values(), key=lambda x: x['order']
        )

        return marshal(user_details, user_detail_fields)
