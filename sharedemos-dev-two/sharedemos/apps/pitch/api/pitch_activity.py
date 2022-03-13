"""Sharedemos Apps -Pitch Activity API page."""

from flask import abort, current_app, jsonify, session
from flask.ext.restful import fields, marshal, Resource, reqparse

from sharedemos.libs.decorators import (
    app_subscription_required,
    login_required
)
from sharedemos.models import db, User

from sharedemos.apps.pitch.models import (
    DraftPitch,
    Pitch,
    PitchSection,
    PitchSectionTranslations,
    PitchRecording,
    PitchActivity,
    PitchSectionActivity,
    PitchRecordingActivity,
    PitchResult
)
from sharedemos.apps.pitch.utils import (
    get_dates_from_request_args,
    get_user_proficiency
)

performer_fields = {
    'name': fields.String,
    'score': fields.Nested({
        'user_score': fields.Float,
        'total_score': fields.Float,
    })
}
pitch_user_fields = {
    'username': fields.String,
    'name': fields.String,
    'date': fields.DateTime,
    'total_score': fields.Float,
    'status': fields.String,
    'user_score': fields.Float,
    'proficiency': fields.String,
    'sections': fields.Raw,
}
participant_fields = {
    'total': fields.Integer,
    'pages': fields.Nested({
        'current': fields.Integer,
        'total': fields.Integer
    }),
    'users': fields.Nested(pitch_user_fields)
}
pitch_detail_fields = {
    'version': fields.Nested({
        'current': fields.Integer,
        'total': fields.Integer
    }),
    'title': fields.String,
    'created_at': fields.DateTime,
    'average_score': fields.Float,
    'top_performer': fields.Nested(performer_fields),
    'lowest_performer': fields.Nested(performer_fields),
    'most_passed_section': fields.String,
    'most_failed_section': fields.String,
    'sections_header': fields.List(fields.Integer),
    'participants': fields.Nested(participant_fields),
    'growth': fields.Nested({
        'participants': fields.Float,
        'average_score': fields.Float
    })
}

growth_fields = {
    'participants': fields.Float
}
pitch_fields = {
    'uuid': fields.String,
    'title': fields.String,
    'created_at': fields.DateTime,
    'sections': fields.Integer,
    'participants': fields.List(fields.Raw),
    'version': fields.String,
    'growth': fields.Nested(growth_fields),
}

all_pitches_fields = {
    'total_pitches': fields.Integer,
    'total_participants': fields.Integer,
    'pitches_list': fields.Nested(pitch_fields),
    'growth': fields.Nested(growth_fields)
}


pitch_parser = reqparse.RequestParser()
pitch_parser.add_argument(
    'uuid', type=unicode, required=True, location='json',
)
pitch_parser.add_argument(
    'version', type=int, required=True, location='json',
)


def get_participants_growth(pitches_activity, current_participants):
    """Return participants growth percentage compared to previous data."""
    prev_participants = []

    for a in pitches_activity:
        if a.user_id not in prev_participants:
            prev_participants.append(a.user_id)

    prev_participants = len(prev_participants)

    return (
        (current_participants - prev_participants) / float(prev_participants) * 100
    )


def get_pitch_activity(pitch_ids, from_date, to_date):
    """Return PitchActivity for the input date range."""
    return PitchActivity.query.filter(
        PitchActivity.pitch_id.in_(pitch_ids),
        PitchActivity.created_at.between(from_date, to_date),
        PitchActivity.tenant_id == current_app.tenant_id
    ).group_by(
        PitchActivity.pitch_id,
        PitchActivity.user_id
    ).with_entities(
        PitchActivity.pitch_id,
        PitchActivity.user_id
    ).all()


def update_pitch_participants(pitches_dict, pitches_activity, participant_key):
    """
    Update participants for different pitch version.

    'participant_key' may have 'prev_participants' or 'participants'
    as value depending upon the 'pitches_activity' time frame.
    """
    for activity in pitches_activity:
        pitch_id = activity.pitch_id
        if (
            pitches_dict.get(pitch_id) and
            activity.user_id not in pitches_dict[pitch_id][participant_key]
        ):
            pitches_dict[pitch_id][participant_key].append(activity.user_id)


class PitchActivityApi(Resource):
    """PitchActivityApi API handles requests related to Pitch."""

    method_decorators = [app_subscription_required('PITCH'), login_required]

    def get(self, uuid=None, version=None):
        """
        Return Pitch Activity log data.

        If uuid, version are not provided,
        then return the log data of all the latest pitches.
        If uuid is provided,
        then return the log data of all the versions of that pitch.
        If uuid and version are provided,
        then return the log data of the spceific pitch.

        Request args provides the time limit.
        By default if not provided,
        the report will consists of last 7 days' data.
        The metric value for different types will be as follows.
        'today'     -> 24 hours,
        'yesterday' -> 1 day,
        'week'      -> 7 days,
        'month'     -> 30 days,
        'quarter'   -> 91 days,
        'half'      -> 182 days,
        'year'      -> 365 days.
        """
        tenant_id = current_app.tenant_id

        from_date, to_date = get_dates_from_request_args()
        prev_to_date = from_date
        prev_from_date = prev_to_date - (to_date - from_date)

        base_query = Pitch.query.filter(
            Pitch.tenant_id == tenant_id,
            Pitch.is_deleted.__eq__(False),
        )
        if not uuid:
            # All pitches are queried to get only the report of the latest pitches.
            all_pitches = base_query.join(
                DraftPitch, DraftPitch.latest_pitch_id == Pitch.id
            ).all()

            if all_pitches:

                total_pitches = 0
                pitches_dict = {}

                for pitch in all_pitches:
                    total_pitches += 1
                    pitches_dict[pitch.id] = {
                        "participants": [],
                        "sections": pitch.sections_query().count(),
                        "created_at": pitch.created_at,
                        "title": pitch.get_name(),
                        "uuid": pitch.uuid
                    }

                pitches_activity = get_pitch_activity(
                    pitches_dict.keys(), from_date, to_date
                )

                total_participants = []

                for activity in pitches_activity:
                    pitch_id = activity.pitch_id

                    if activity.user_id not in total_participants:
                        total_participants.append(activity.user_id)

                    if (
                        pitches_dict.get(pitch_id) and
                        activity.user_id not in pitches_dict[pitch_id]['participants']
                    ):
                        pitches_dict[pitch_id]['participants'].append(activity.user_id)

                total_participants = len(total_participants)

                # To calculate growth, get activity for the previous time frame.
                prev_pitches_activity = get_pitch_activity(
                    pitches_dict.keys(), prev_from_date, prev_to_date
                )
                participants_growth = None

                if prev_pitches_activity:
                    participants_growth = get_participants_growth(
                        prev_pitches_activity, total_participants
                    )

                return marshal({
                    'total_pitches': total_pitches,
                    'total_participants': total_participants,
                    'pitches_list': sorted(
                        pitches_dict.values(), key=lambda x: x['title']
                    ),
                    'growth': {
                        'participants': participants_growth,
                    }
                }, all_pitches_fields)

        # If uuid, then fetch reports of different versions of pitch.
        pitches = base_query.filter(
            Pitch.uuid == uuid
        ).order_by(Pitch.version.desc()).all()

        if not pitches:
            abort(404, description='Pitches Not Found')

        pitch_details = {
            'version': {
                'total': len(pitches)
            },
            'title': '',
            'created_at': '',
            'average_score': 0,
            'top_performer': {
                'name': '',
                'score': {
                    'total_score': 0,
                    'user_score': 0
                }
            },
            'lowest_performer': {
                'name': '',
                'score': {
                    'total_score': 0,
                    'user_score': 0
                }
            },
            'most_passed_section': '',
            'most_failed_section': '',
            'participants': {}
        }

        pitch = None
        if version:
            for _pitch in pitches:
                if _pitch.version == version:
                    pitch = _pitch
                    break
        else:
            # If no version is specified, then fetch the latest version.
            pitch = pitches[0]

        if not pitch:
            abort(404, description='Pitch Not Found')

        pitch_details['version']['current'] = pitch.version
        pitch_details['title'] = pitch.get_name()
        pitch_details['created_at'] = pitch.created_at

        pitches_activity = get_pitch_activity(
            [pitch.id], from_date, to_date
        )

        pitch_details['participants'] = {
            'total': len(pitches_activity)
        }

        tenant = pitch.tenant

        # Recordings have 'section_trans_id' mapping,
        # so inorder to get the number of recordings for a pitch,
        # query the sections and get the corresponding recordings.
        sections_trans = pitch.sections_query().filter(
            PitchSectionTranslations.language_id == tenant.default_locale_id
        ).order_by(
            PitchSection.order
        ).with_entities(
            PitchSection,
            PitchSectionTranslations
        ).all()

        # In a pitch, the all sections' total score
        # will be constant for all users,
        # the user score depends on
        # whether he has submitted a recording for that section or not.
        sections_total_score = 0
        section_ids = []
        for st in sections_trans:
            section_ids.append(st.PitchSection.id)
            sections_total_score += st.PitchSection.base_score

        user_ids = [a.user_id for a in pitches_activity]
        pitch_details['sections_header'] = [st.PitchSection.id for st in sections_trans]

        recordings = PitchRecordingActivity.query.join(
            PitchRecording, PitchRecording.id == PitchRecordingActivity.recording_id
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
            PitchRecordingActivity.user_id.in_(user_ids),
            PitchRecordingActivity.section_id.in_(section_ids),
            PitchRecordingActivity.created_at.between(from_date, to_date)
        ).with_entities(
            PitchSectionTranslations,
            PitchSection,
            PitchResult,
            User
        ).all()

        user_records = {}
        sections_dict = {}      # Used in getting most-passed/ most-failed section names.

        passed_sections = []
        failed_sections = []
        pass_threshold = current_app.config['PITCH_PASS_THRESHOLD']

        # Filter recordings - One Recording entity might have many Results,
        # so filter the latest Result entity from list of recordings.
        filtered_records = {}
        # 'filtered_records' is a dict,
        # containing a tuple of User, PitchSection, PitchSectionTranslations as key
        # and PitchResult as value.
        for r in recordings:
            record_key = (r.User, r.PitchSection, r.PitchSectionTranslations)

            if record_key not in filtered_records:
                filtered_records[record_key] = r.PitchResult

            elif filtered_records[record_key].created_at < r.PitchResult.created_at:
                filtered_records[record_key] = r.PitchResult

        for record in filtered_records:

            user = record[0]
            section = record[1]
            sections_trans = record[2]
            result = filtered_records[record]

            # This assignment is necessary cause,
            # 'total_score' is a hybrid property, and everytime if we
            # keep on accessing it, it'll call the hybird property
            # which is not required in our case. So its been assigned
            # to a variable.
            res_total_score = result.total_score
            result_status = 'PENDING'
            if result.meta_data and result.score:
                result_status = 'COMPLETED'

            section_id = section.id
            section_base_score = section.base_score
            sections_dict[section_id] = sections_trans.title

            if user_records.get(user.id):
                user_records[user.id]['sections'][section_id] = {
                    'user_score': res_total_score,
                    'base_score': section_base_score,
                    'status': result_status
                }

                user_records[user.id]['total_score'] = sections_total_score

            else:
                user_records[user.id] = {
                    'username': user.username,
                    'name': user.fullname,
                    'date': result.created_at,
                    'sections': {
                        section_id: {
                            'user_score': res_total_score,
                            'base_score': section_base_score,
                            'status': result_status
                        }
                    },
                    'total_score': sections_total_score,
                    'user_score': 0,
                    'proficiency': ''
                }

            # Most passed, most failed section
            if section_base_score:
                percent_total_score = (
                    (res_total_score / section_base_score) * 100
                )
                if percent_total_score >= pass_threshold:
                    passed_sections.append(section_id)
                else:
                    failed_sections.append(section_id)

        # Iterate over the above user_records,
        # fetch respective record's result,
        # and then calculate the score based on weightages.
        # Assign proficiency.

        average_user_scores = 0
        average_total_scores = 0

        for user_id in user_records:

            sections = user_records[user_id]['sections']
            # This is the total user_score,
            # sum of all the section scores.
            user_score = 0

            for sec_id in sections:
                scores = sections[sec_id]
                user_score += scores['user_score']

            user_records[user_id]['user_score'] = user_score

            total_score = user_records[user_id]['total_score']
            percent_user_score = (user_score / total_score) * 100
            user_records[user_id]['proficiency'] = get_user_proficiency(
                percent_user_score
            )

            average_user_scores += user_score
            average_total_scores += total_score

        pitch_details['participants']['users'] = sorted(
            user_records.values(), key=lambda x: x['name']
        )

        # Get top, lowest performers.
        if pitch_details['participants']['users']:
            sorted_users = sorted(
                pitch_details['participants']['users'],
                key=lambda x: x['user_score'],
                reverse=True
            )
            pitch_details['top_performer'] = {
                'name': sorted_users[0]['name'],
                'score': {
                    'total_score': sorted_users[0]['total_score'],
                    'user_score': sorted_users[0]['user_score']
                }
            }
            if len(sorted_users) > 1:
                pitch_details['lowest_performer'] = {
                    'name': sorted_users[-1]['name'],
                    'score': {
                        'total_score': sorted_users[-1]['total_score'],
                        'user_score': sorted_users[-1]['user_score']
                    }
                }

        if average_total_scores:
            pitch_details['average_score'] = (
                average_user_scores / average_total_scores
            ) * 100

        # Find the most repeated entity in both lists.
        if passed_sections:
            most_passed_section_id = max(
                passed_sections, key=passed_sections.count
            )
            pitch_details['most_passed_section'] = sections_dict[most_passed_section_id]

        if failed_sections:
            most_failed_section_id = max(
                failed_sections, key=failed_sections.count
            )
            pitch_details['most_failed_section'] = sections_dict[most_failed_section_id]

        # Get previous pitch activity to calculate growth.
        prev_pitches_activity = get_pitch_activity(
            [pitch.id], prev_from_date, prev_to_date
        )

        current_participants = pitch_details['participants']['total']
        prev_participants = len(prev_pitches_activity)
        if prev_participants:
            pitch_details['growth'] = {
                'participants': (
                    (current_participants - prev_participants) / float(prev_participants) * 100
                )
            }

        return marshal(pitch_details, pitch_detail_fields)

    def post(self):
        """Log the data wher a user opens a pitch overview page."""
        tenant_id = current_app.tenant_id
        post_data = pitch_parser.parse_args()

        pitch = Pitch.query.filter(
            Pitch.tenant_id == tenant_id,
            Pitch.uuid == post_data['uuid'],
            Pitch.version == post_data['version'],
            Pitch.is_deleted.__eq__(False)
        ).first_or_404()

        db.session.add(PitchActivity(
            tenant_id=tenant_id,
            pitch_id=pitch.id,
            session_id=session['user']['user_id'],
            user_id=session['user_id']
        ))
        db.session.commit()

        return jsonify(status='CREATED')


section_parser = reqparse.RequestParser()
section_parser.add_argument(
    'pitch_uuid', type=unicode, required=True, location='json'
)
section_parser.add_argument(
    'pitch_version', type=int, required=True, location='json'
)
section_parser.add_argument(
    'uuid', type=unicode, required=True, location='json'
)


class PitchSectionActivityApi(Resource):
    """PitchSectionActivityApi handles requests related to PitchSection."""

    method_decorators = [app_subscription_required('PITCH'), login_required]

    def post(self):
        """Log the data when a user takes the pitch and lands on sections page."""
        tenant_id = current_app.tenant_id
        post_data = section_parser.parse_args()

        section = PitchSection.query.join(Pitch).filter(
            Pitch.tenant_id == tenant_id,
            Pitch.version == post_data['pitch_version'],
            Pitch.uuid == post_data['pitch_uuid'],
            PitchSection.uuid == post_data['uuid'],
            PitchSection.is_deleted.__eq__(False)
        ).with_entities(
            PitchSection,
            Pitch
        ).first_or_404()

        db.session.add(PitchSectionActivity(
            tenant_id=tenant_id,
            pitch_id=section.Pitch.id,
            section_id=section.PitchSection.id,
            session_id=session['user']['user_id'],
            user_id=session['user_id']
        ))
        db.session.commit()

        return jsonify(status='CREATED')


recording_parser = reqparse.RequestParser()
recording_parser.add_argument(
    'pitch_uuid', type=unicode, required=True, location='json'
)
recording_parser.add_argument(
    'pitch_version', type=int, required=True, location='json'
)
recording_parser.add_argument(
    'section_uuid', type=unicode, required=True, location='json'
)


class PitchRecordingActivityApi(Resource):
    """PitchRecordingActivityApi handles requests related to PitchRecording."""

    method_decorators = [app_subscription_required('PITCH'), login_required]

    def post(self):
        """Log the data when a user takes the pitch and submits the recording."""
        tenant_id = current_app.tenant_id
        post_data = recording_parser.parse_args()

        record = PitchRecording.query.join(
            PitchSectionTranslations, PitchSectionTranslations.id == PitchRecording.section_trans_id
        ).join(
            PitchSection, PitchSection.id == PitchSectionTranslations.section_id
        ).join(
            Pitch, Pitch.id == PitchSection.pitch_id
        ).filter(
            PitchRecording.submitted_by == session['user_id'],
            Pitch.tenant_id == tenant_id,
            Pitch.version == post_data['pitch_version'],
            Pitch.uuid == post_data['pitch_uuid'],
            PitchSection.uuid == post_data['section_uuid'],
            PitchSection.is_deleted.__eq__(False),
            PitchSectionTranslations.language_id == session['user']['locale']
        ).with_entities(
            PitchRecording,
            PitchSection
        ).first_or_404()

        db.session.add(PitchRecordingActivity(
            tenant_id=tenant_id,
            section_id=record.PitchSection.id,
            recording_id=record.PitchRecording.id,
            session_id=session['user']['user_id'],
            user_id=session['user_id']
        ))
        db.session.commit()

        return jsonify(status='CREATED')
