from datetime import datetime
from flask import current_app
from flask.ext.restful import Resource, fields, marshal
from sharedemos.libs.decorators import has_analyst_access
from sharedemos.libs.model import get_time_bounds
from sharedemos.models import (
    CompletionActivity, Section,
    Tenant, UserActivity, User,
    VisitActivity
)
from sharedemos.libs.api import format_data
from sharedemos.libs.utils import get_tenant_header_footer


visit_activities = {
    'id': fields.Integer,
    'first_name': fields.String(attribute='user_activity.user.first_name'),
    'last_name': fields.String(attribute='user_activity.user.last_name'),
    'city': fields.String(attribute='user_activity.city'),
    'state': fields.String(attribute='user_activity.state'),
    'country': fields.String(attribute='user_activity.country'),
    'user_created_at': fields.DateTime(
        attribute='user_activity.user.created_at'),
    'walkthrough': fields.String(attribute='walkthrough_name'),
    'section': fields.String(attribute='section_name'),
    'completion_rate': fields.Float,
    'first_slide_image': fields.String,
    'first_slide_content': fields.String,
    'tenant_footer_text': fields.String(attribute='tenant._footer_text'),
    'tenant_footer_image': fields.String(attribute='tenant.logo'),
    'created_at': fields.DateTime,
}


class ViewerActivityApi(Resource):

    @has_analyst_access
    def get(self, viewer_id, category_id, date_range='week',
            from_date=None, to_date=None):

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        category = None
        formatted_frm_date = datetime.strptime(from_date, '%Y-%m-%d')\
            if from_date else None
        formatted_to_date = datetime.strptime(to_date, '%Y-%m-%d')\
            if to_date else None
        cur_start_date, cur_end_date, pst_date, pend_date = get_time_bounds(
            date_range,
            formatted_frm_date,
            formatted_to_date,
            timezone=tenant.timezone
        )

        visits = VisitActivity.query.join(UserActivity).join(User).filter(
            (User.unique_user_id == viewer_id) &
            (VisitActivity.tenant_id == tenant_id) &
            (VisitActivity.created_at.between(cur_start_date, cur_end_date)))

        initial_activity = visits.first()

        completion_activities = CompletionActivity.query.join(
            UserActivity
        ).join(User).filter(
            User.unique_user_id == viewer_id,
            CompletionActivity.tenant_id == tenant_id,
            CompletionActivity.created_at.between(cur_start_date, cur_end_date)
        )

        if category_id != 'all':
            category = Section.query.filter(
                (Section.tenant_id == tenant_id) &
                (Section.is_deleted.__eq__(False)) &
                (Section.slug == category_id)
            ).first()

            visits = visits.filter(
                VisitActivity.product == category
            ).order_by(VisitActivity.created_at).all()
            completion_activities = completion_activities.filter(
                CompletionActivity.product == category
            ).order_by(CompletionActivity.created_at).all()

        else:

            visits = visits.filter(
                VisitActivity.product_id.isnot(None)
            ).order_by(VisitActivity.created_at).all()
            completion_activities = completion_activities.filter(
                CompletionActivity.product_id.isnot(None)
            ).order_by(CompletionActivity.created_at).all()

        completion_activity = {
            '%s_%s' % (
                completion_activity.report_user_id,
                completion_activity.walkthrough.slug
            ): completion_activity
            for completion_activity in completion_activities}

        for visit in visits:
            walkthrough = visit.walkthrough
            if walkthrough:
                visit.walkthrough_name = walkthrough.get_name()
                v_ca = completion_activity.get(
                    '%s_%s' % (visit.report_user_id, walkthrough.slug))
                if walkthrough and v_ca:
                    completion_rate = (
                        float(v_ca.entity_complete) / v_ca.entity_total
                    ) * 100
                else:
                    completion_rate = 0
                visit.completion_rate = round(completion_rate, 2)
                thumbnail = walkthrough.get_thumbnail()
                if thumbnail:
                    visit.first_slide_image = thumbnail
            else:
                visit.section_name = visit.section.get_name()

        tenant_footer = get_tenant_header_footer()
        footer_text = tenant_footer.get('footer', {})
        if footer_text:
            tenant._footer_text = footer_text.text

        if not visits:
            visits = [initial_activity]

        return format_data(marshal(visits, visit_activities))
