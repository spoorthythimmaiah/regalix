"""Sharedemos Apps -Pitch utility functions page."""

from datetime import datetime, timedelta, time
import json
from uuid import uuid4

from flask import current_app, request

from sharedemos.libs.helpers import add_date_time
from sharedemos.models import db
from sharedemos.apps.pitch.models import PitchResult


def pitch_compare(data):
    """Store the result in DB matching with compare_id."""
    try:
        comparison_result = json.loads(data)
        compare_id = comparison_result['id']

        pitch_result = PitchResult.query.filter(
            PitchResult.compare_id == compare_id
        ).first()

        if not pitch_result:
            raise Exception(
                message='pitch_result for compare_id - {} NOT_FOUND.'.format(compare_id)
            )

        pitch_result.meta_data = comparison_result
        score = comparison_result['score']
        pitch_result.score = score

        db.session.add(pitch_result)
        db.session.commit()

    # If there are any exception, then log it in a file.
    except Exception as e:
        print e


def get_dates_from_request_args():
    """
    Return to_date and from_date.

    Calculate to_date, from_date based on metrics.
    Request args provides the time limit.
    By default if not provided,
    then metrics will be of last 7 days.
    The metric value for different types will be as follows.
    'today'     -> 24 hours,
    'yesterday' -> 1 day,
    'week'      -> 7 days,
    'month'     -> 30 days,
    'quarter'   -> 91 days,
    'half'      -> 182 days,
    'year'      -> 365 days.
    """
    to_date = datetime.combine(datetime.utcnow(), time(23, 59, 59))
    if 'to_date' in request.args:
        to_date = datetime.strptime(request.args['to_date'], '%Y-%m-%d')

    from_date = to_date - timedelta(days=7)
    if 'from_date' in request.args:
        from_date = datetime.strptime(request.args['from_date'], '%Y-%m-%d')

    if 'metrics' in request.args:
        if request.args['metrics'] == 'today':
            from_date = datetime.combine(datetime.utcnow(), time(0, 0, 0))

        elif request.args['metrics'] == 'yesterday':
            from_date = add_date_time(to_date, days=-1)

        elif request.args['metrics'] == 'month':
            from_date = add_date_time(to_date, months=-1)

        elif request.args['metrics'] == 'quarter':
            from_date = add_date_time(to_date, months=-3)

        elif request.args['metrics'] == 'half':
            from_date = add_date_time(to_date, months=-6)

        elif request.args['metrics'] == 'year':
            from_date = add_date_time(to_date, years=-1)

    return (from_date, to_date)


def get_user_proficiency(percent_user_score):
    """Determine Proficiency for user_score based on config scores."""
    user_proficiency = ''
    proficiency = current_app.config['PROFICIENCY']

    if percent_user_score <= proficiency['beginner']:
        user_proficiency = 'beginner'

    elif percent_user_score <= proficiency['mid-level']:
        user_proficiency = 'mid-level'

    elif percent_user_score <= proficiency['professional']:
        user_proficiency = 'professional'

    elif percent_user_score > proficiency['professional']:
        user_proficiency = 'rockstar'
    return user_proficiency


def get_uuid(length=6):
    """Return a uuid4 sliced by 'length'."""
    return unicode(uuid4().hex[:length])
