from sqlalchemy.sql.expression import func
from sharedemos.models import (
    CompletionActivity,
    db,
    ReportTenant,
    Section,
    UserActivity,
    VisitActivity,
    Tenant,
    Walkthrough,
    WalkthroughActivity
)
from sharedemos.libs.helpers import (
    add_date_time,
)
from sharedemos.tasks.factory import celery
from sharedemos.tasks.libs import (
    format_datetime,
    get_local_start_date,
    get_or_create_lead_data,
    get_or_create_site_visitor,
    get_or_create_topic_activity,
    log_visitor_geography,
    log_visitor_referral
)


@celery.task(queue='activity_tasks')
def add_leads(lead_activity):
    """Add_leads."""
    tenant = ReportTenant.query.get(lead_activity['tenant_id'])
    start_datetime = get_local_start_date(lead_activity['lead_date'],
                                          tenant.timezone)

    product = None
    if lead_activity.get('product_id'):
        product = Section.query.get(lead_activity['product_id'])

    section = None
    if lead_activity.get('section_id'):
        section = Section.query.get(lead_activity['section_id'])

    # Add to leads count
    leads_generated = get_or_create_lead_data(tenant.id, start_datetime,
                                              product, section)
    leads_generated.leads_count += 1
    db.session.add(leads_generated)

    db.session.commit()


@celery.task(queue='activity_tasks')
def add_user_activity(activity):
    """Add_user_activity."""
    tenant = ReportTenant.query.get(activity['tenant_id'])
    user_activity = UserActivity.query.get(activity['user_id'])
    product = section = walkthrough = None
    if activity.get('product_id'):
        product = Section.query.get(activity['product_id'])

    if activity.get('section_id'):
        section = Section.query.get(activity['section_id'])

    if activity.get('walkthrough_id'):
        walkthrough = Walkthrough.query.get(activity['walkthrough_id'])

    # Visit activity date is the key reference to identify duplicate activity
    activity_date = format_datetime(activity['visit_activity_date'])
    start_datetime = get_local_start_date(activity_date, tenant.timezone)

    if product:
        visitor_activity = get_or_create_site_visitor(start_datetime,
                                                      tenant.id, product)

        visit_activities = VisitActivity.query.filter(
            (VisitActivity.report_user_id == user_activity.id) &
            (VisitActivity.created_at.between(start_datetime, activity_date)) &
            (VisitActivity.product_id == product.id)
        )

        if visit_activities.count() == 1:
            visitor_activity.overall_site_visitors_count += 1

            if user_activity and user_activity.created_at >= start_datetime:
                visitor_activity.site_visitors_count += 1

            db.session.add(visitor_activity)

            log_visitor_geography(user_activity, tenant, start_datetime,
                                  product)
            log_visitor_referral(user_activity, tenant, start_datetime,
                                 product)

        demo_viewers = visit_activities.filter(
            VisitActivity.walkthrough_id.isnot(None))
        if walkthrough and demo_viewers.count() == 1:
            visitor_activity.overall_demo_visitors_count += 1

            if user_activity and user_activity.created_at >= start_datetime:
                visitor_activity.demo_visitors_count += 1

            db.session.add(visitor_activity)

    overall_visitor_activity = get_or_create_site_visitor(start_datetime,
                                                          tenant.id)

    visit_activities = VisitActivity.query.filter(
        (VisitActivity.report_user_id == user_activity.id) &
        (VisitActivity.created_at.between(start_datetime, activity_date))
    )

    if visit_activities.count() == 1:
        overall_visitor_activity.overall_site_visitors_count += 1

        if user_activity and user_activity.created_at >= start_datetime:
            overall_visitor_activity.site_visitors_count += 1

        db.session.add(overall_visitor_activity)
        log_visitor_geography(user_activity, tenant, start_datetime)
        log_visitor_referral(user_activity, tenant, start_datetime)

    demo_viewers = visit_activities.filter(
        VisitActivity.walkthrough_id.isnot(None))
    if walkthrough and demo_viewers.count() == 1:
        overall_visitor_activity.overall_demo_visitors_count += 1

        if user_activity and user_activity.created_at >= start_datetime:
            overall_visitor_activity.demo_visitors_count += 1

        db.session.add(overall_visitor_activity)

    if product:
        topic_activity = get_or_create_topic_activity(
            start_datetime, tenant.id, product, section, walkthrough)
        topic_activity.overall_visit_count += 1

        visit_activities = visit_activities.filter(
            (VisitActivity.product_id == product.id)
        )
        if section:
            visit_activities = visit_activities.filter(
                (VisitActivity.section_id == section.id)
            )
        if walkthrough:
            visit_activities = visit_activities.filter(
                (VisitActivity.walkthrough_id == walkthrough.id)
            )

        if visit_activities.count() == 1:
            topic_activity.visit_count += 1

        db.session.add(topic_activity)

    db.session.commit()


@celery.task(queue='activity_tasks')
def log_walkthrough_activity(activity):
    """Log_walkthrough_activity."""
    wt_activity_id = activity['activity_id']
    product_id = activity['product_id']
    section_id = activity['section_id']
    walkthrough_id = activity['walkthrough_id']
    user_id = activity['user_session_id']
    slide_index = int(activity['slide_index'])
    tenant_id = int(activity['tenant_id'])
    locale_requested = activity['locale_requested']
    current_time = activity['current_time']

    user = db.session.query(UserActivity).filter(
        UserActivity.tenant_id == tenant_id,
        UserActivity.unique_user_id == user_id
    ).first()

    # get activity and section details
    parent = db.session.query(Section).get(product_id)
    section = db.session.query(Section).get(section_id)
    walkthrough = db.session.query(Walkthrough).get(walkthrough_id)
    tenant = db.session.query(Tenant).get(tenant_id)

    slide_list = [sl for sl in walkthrough.slides if not sl.is_deleted]
    slide = None
    if len(slide_list) and len(slide_list) >= slide_index:
        slide = slide_list[slide_index - 1]
    is_locale_available = slide and slide.is_locale_available(locale_requested)
    if is_locale_available:
        slide_locale_served = locale_requested
    else:
        slide_locale_served = tenant.default_locale_id

    # Insert every chapter activity and mark it as revisited
    wt_activity = WalkthroughActivity.query.get(wt_activity_id)
    wt_activity.tenant_id = tenant_id
    wt_activity.report_user_id = user.id
    wt_activity.product_id = parent.id
    wt_activity.section_id = section.id
    wt_activity.walkthrough_id = walkthrough.id
    wt_activity.slide_index = slide_index
    wt_activity.locale_requested_code = locale_requested
    wt_activity.locale_served_code = slide_locale_served
    db.session.add(wt_activity)

    # Query all activities
    wt_activities = WalkthroughActivity.query.filter(
        WalkthroughActivity.tenant_id == tenant_id,
        WalkthroughActivity.report_user_id == user.id,
        WalkthroughActivity.product_id == parent.id,
        WalkthroughActivity.section_id == section.id,
        WalkthroughActivity.walkthrough_id == walkthrough.id,
        WalkthroughActivity.slide_index == slide_index
    ).order_by(WalkthroughActivity.id).all()

    # Check revisit flag
    revisit = True if len(wt_activities) > 1 else False

    # Get first activity
    first_activity = wt_activities[0]

    # Update all activity as revisited except first activity at this point
    WalkthroughActivity.query.filter(
        WalkthroughActivity.tenant_id == tenant_id,
        WalkthroughActivity.report_user_id == user.id,
        WalkthroughActivity.product_id == parent.id,
        WalkthroughActivity.section_id == section.id,
        WalkthroughActivity.walkthrough_id == walkthrough.id,
        WalkthroughActivity.slide_index == slide_index,
        WalkthroughActivity.id != first_activity.id
    ).update({'revisit': True})

    # Mark first activity as not revisited
    first_activity.revisit = False
    db.session.add(first_activity)
    db.session.commit()

    # check for existing completion activity
    cmpltd_activity = db.session.query(CompletionActivity).filter(
        CompletionActivity.tenant_id == tenant_id,
        CompletionActivity.report_user_id == user.id,
        CompletionActivity.product_id == parent.id,
        CompletionActivity.section_id == section.id,
        CompletionActivity.walkthrough_id == walkthrough.id
    ).first()

    if not cmpltd_activity:
        cmpltd_activity = CompletionActivity()
        cmpltd_activity.tenant_id = tenant_id
        cmpltd_activity.report_user_id = user.id
        cmpltd_activity.product_id = parent.id
        cmpltd_activity.section_id = section.id
        cmpltd_activity.walkthrough_id = walkthrough.id

        cmpltd_activity.entity_total = len(slide_list)
        cmpltd_activity.entity_complete = 0

        is_locale_available = walkthrough.is_locale_available(locale_requested)
        if is_locale_available:
            wt_locale_served = locale_requested
        else:
            wt_locale_served = tenant.default_locale_id

        cmpltd_activity.locale_requested_code = locale_requested
        cmpltd_activity.locale_served_code = wt_locale_served
        cmpltd_activity.created_at = current_time
        cmpltd_activity.modified_at = current_time

    # check and updated if slides are added/removed after activity is logged
    elif cmpltd_activity.entity_total != len(slide_list):
        cmpltd_activity.entity_total = len(slide_list)
        if cmpltd_activity.entity_complete > len(slide_list):
            cmpltd_activity.entity_complete = len(slide_list)

    # Avoid log if activity is duplicate/revisit
    if not revisit and \
            cmpltd_activity.entity_complete < cmpltd_activity.entity_total:
        cmpltd_activity.entity_complete += 1

    db.session.add(cmpltd_activity)
    db.session.commit()

    add_completion_activity({
        'tenant': tenant,
        'activity_date': str(cmpltd_activity.modified_at),
        'product': parent,
        'section': section,
        'walkthrough': walkthrough,
        'revisit': revisit
    })


def add_completion_activity(activity):
    """Add_completion_activity."""
    tenant = activity['tenant']
    product = section = walkthrough = None
    product = activity['product']
    section = activity['section']
    walkthrough = activity['walkthrough']

    # Completion activity date is the key to identify duplicate activity
    activity_date = format_datetime(activity['activity_date'])
    start_datetime = get_local_start_date(activity_date, tenant.timezone)

    topic_activity = get_or_create_topic_activity(
        start_datetime, tenant.id, product, section, walkthrough)

    attendees = CompletionActivity.query.filter(
        (CompletionActivity.tenant_id == tenant.id) &
        (CompletionActivity.modified_at.between(start_datetime, activity_date))
    ).with_entities(
        CompletionActivity.id,
        CompletionActivity.report_user_id,
        CompletionActivity.entity_total,
        CompletionActivity.entity_complete
    ).group_by(
        CompletionActivity.id,
        CompletionActivity.report_user_id,
    )
    if product:
        attendees = attendees.filter(
            CompletionActivity.product_id == product.id
        ).with_entities(
            CompletionActivity.product_id
        ).group_by(CompletionActivity.product_id)

    if section:
        attendees = attendees.filter(
            CompletionActivity.section_id == section.id
        ).with_entities(
            CompletionActivity.section_id
        ).group_by(CompletionActivity.section_id)

    if walkthrough:
        attendees = attendees.filter(
            CompletionActivity.walkthrough_id == walkthrough.id
        ).with_entities(
            CompletionActivity.walkthrough_id
        ).group_by(CompletionActivity.walkthrough_id)

    overall_started_count = attendees.count()
    overall_completions = attendees.having(
        CompletionActivity.entity_total <= CompletionActivity.entity_complete
    ).count()
    overall_completion_rate = round(
        (overall_completions / float(overall_started_count or 1)) * 100, 2
    )

    # We don't track revisited slides for avg frame completions
    if not activity['revisit'] and product and section and walkthrough:
        # Calculate Avg frames completed
        end_date = add_date_time(start_datetime, days=1, seconds=-1)
        wt_activities = WalkthroughActivity.query.filter(
            WalkthroughActivity.tenant_id == tenant.id,
            WalkthroughActivity.product_id == product.id,
            WalkthroughActivity.section_id == section.id,
            WalkthroughActivity.walkthrough_id == walkthrough.id,
            WalkthroughActivity.created_at.between(start_datetime, end_date),
            WalkthroughActivity.revisit.is_(False)
        ).with_entities(
            WalkthroughActivity.report_user_id,
            func.count(WalkthroughActivity.report_user_id).label('slide_count')
        ).group_by(
            WalkthroughActivity.report_user_id
        ).all()

        users = slide_count = 0
        for act in wt_activities:
            users += 1
            slide_count += act.slide_count
        topic_activity.average_frames_completed = round(
            slide_count / float(users or 1), 2
        )

        # Calculate percentage completed
        percentage_slots = {
            '0_25': 0,
            '26_50': 0,
            '51_75': 0,
            '76_100': 0
        }

        completion_activities = attendees.with_entities(
            CompletionActivity.report_user_id,
            CompletionActivity.entity_total,
            CompletionActivity.entity_complete
        ).all()
        for act in completion_activities:
            percentage = round(
                (act.entity_complete / float(act.entity_total or 1)) * 100, 2
            )
            if percentage <= 25:
                percentage_slots['0_25'] += 1
            elif percentage <= 50:
                percentage_slots['26_50'] += 1
            elif percentage <= 75:
                percentage_slots['51_75'] += 1
            else:
                percentage_slots['76_100'] += 1

        topic_activity.percent_completions_25 = percentage_slots['0_25']
        topic_activity.percent_completions_50 = percentage_slots['26_50']
        topic_activity.percent_completions_75 = percentage_slots['51_75']
        topic_activity.percent_completions_100 = percentage_slots['76_100']

    attendees = attendees.with_entities(
        CompletionActivity.report_user_id,
        CompletionActivity.walkthrough_id
    ).distinct(
        CompletionActivity.report_user_id,
        CompletionActivity.walkthrough_id
    )

    started_count = attendees.count()
    completions = attendees.having(
        CompletionActivity.entity_total <= CompletionActivity.entity_complete
    ).count()
    completion_rate = round((completions / float(started_count or 1)) * 100, 2)

    topic_activity.completion_count = completions
    topic_activity.completion_rate = completion_rate

    topic_activity.overall_completion_count = overall_completions
    topic_activity.overall_completion_rate = overall_completion_rate

    db.session.add(topic_activity)
    db.session.commit()
