from datetime import datetime
from flask import current_app, request
from sqlalchemy import func, desc
from flask.ext.restful import Resource

from sharedemos.libs.decorators import has_analyst_access
from sharedemos.libs.helpers import get_translation
from sharedemos.libs.model import (
    get_time_bounds
)
from sharedemos.models import (
    Option,
    PathFinderActivity,
    Tenant
)


class PathReportsApi(Resource):

    @has_analyst_access
    def get(self):

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        from_date = None
        to_date = None

        if request.args.get('from_date'):
            from_date = request.args.get('from_date')
        if request.args.get('to_date'):
            to_date = request.args.get('to_date')
        date_range = request.args.get('date_range')
        path_id = request.args.get('path_id')
        option_id = request.args.get('option_id')

        if from_date:
            from_date = datetime.strptime(
                from_date, '%Y-%m-%d')
        if to_date:
            to_date = datetime.strptime(
                to_date, '%Y-%m-%d')
        cur_start_date, cur_end_date, p_sd, pr_ed = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        current_option = Option.query.get(option_id)
        if current_option.next_question:
            next_question_options = current_option.next_question.options
            options_id = [option.id for option in next_question_options]
            tenant_id = getattr(current_app, 'tenant_id', None)
            activities = PathFinderActivity.query.filter(
                (PathFinderActivity.tenant_id == tenant_id) &
                (PathFinderActivity.created_at.between(
                    cur_start_date, cur_end_date)) &
                (PathFinderActivity.option_id.in_(options_id))
            )

            if path_id != 'all':
                activities = activities.filter(
                    PathFinderActivity.path_id == int(path_id))

            activities = activities.with_entities(
                PathFinderActivity.option_id,
                func.count(PathFinderActivity.option_id).label('count')
            ).group_by(
                PathFinderActivity.option_id
            ).order_by(
                desc('count')
            ).all()

            opt_clicks_data = dict()
            most_traversed = dict()
            for act in activities:
                opt_clicks_data[act.option_id] = act.count

            options = list()
            for option in next_question_options:
                if not option.is_deleted:
                    option_dict = dict()
                    translation = get_translation(option)
                    option_dict['option_id'] = option.id
                    option_dict['name'] = translation.text
                    if translation.icon:
                        option_dict['icon'] = translation.icon.path
                    option_dict['clicks'] = opt_clicks_data.get(option.id, 0)
                    options.append(option_dict)

            options.sort(key=lambda x: x['clicks'], reverse=True)

            translation = get_translation(current_option.next_question)
            most_traversed['question'] = translation.text
            most_traversed['options'] = options

            return most_traversed
        else:
            return {'STATUS': False}
