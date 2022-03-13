from collections import OrderedDict
from datetime import datetime, time, timedelta

from flask import current_app, jsonify, request
from flask.ext.restful import Resource
from sqlalchemy import case, desc, func

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.decorators import has_analyst_access
from sharedemos.libs.helpers import add_date_time
from sharedemos.libs.model import get_progress_difference
from sharedemos.models import (
    CompletionActivity,
    ReferralTracking,
    Section,
    SectionTranslations,
    Tenant,
    User,
    UserGroup,
    UserGroupMappings,
    UserActivity,
    VisitActivity,
    Walkthrough
)


def get_previous_dates(start_date, end_date):
    days_difference = (start_date - end_date).days
    previous_start_date = add_date_time(start_date, days=days_difference)
    return previous_start_date, start_date


def calculate_site_visitors(start_date, end_date, product_id):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    visitors = VisitActivity.query.join(
        UserActivity)
    if tenant.flags.is_private and tenant.user_groups:
        visitors = visitors.join(User).join(
            UserGroupMappings
        ).join(
            UserGroup
        ).filter(
            User.role_id != 1,
            UserGroup.role_id != 1,
        )

    visitors = visitors.filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        UserActivity.created_at.between(start_date, end_date),
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        visitors = visitors.filter(
            VisitActivity.product_id == product_id
        )

    visitors = visitors.with_entities(
        func.count(
            func.distinct(VisitActivity.report_user_id)
        ).label('uq_visitors')
    ).first()

    return int(visitors.uq_visitors)


def get_site_visitors(start_date, end_date, product_id=0):
    visitors = calculate_site_visitors(start_date, end_date, product_id)

    pr_start_date, pr_end_date = get_previous_dates(start_date, end_date)
    pr_visitors = calculate_site_visitors(
        pr_start_date,
        pr_end_date,
        product_id
    )

    return {
        "count": int(visitors),
        "progress": get_progress_difference(visitors, pr_visitors)
    }


def calculate_demo_views(start_date, end_date, product_id):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    views = VisitActivity.query.join(
        UserActivity)
    if tenant.flags.is_private and tenant.user_groups:
        views = views.join(User).join(
            UserGroupMappings
        ).join(
            UserGroup
        ).filter(
            User.role_id != 1,
            UserGroup.role_id != 1,
        )

    views = views.filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.walkthrough_id.isnot(None),
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        views = views.filter(
            VisitActivity.product_id == product_id
        )
    views = views.count()

    return views


def get_demo_views(start_date, end_date, product_id=0):
    views = calculate_demo_views(start_date, end_date, product_id)

    pr_start_date, pr_end_date = get_previous_dates(start_date, end_date)

    pr_views = calculate_demo_views(pr_start_date, pr_end_date, product_id)

    return {
        "count": views,
        "progress": get_progress_difference(
            views, pr_views
        )
    }


def calculate_completion_rate(start_date, end_date, product_id):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    query = CompletionActivity.query.join(
        UserActivity)
    if tenant.flags.is_private and tenant.user_groups:
        query = query.join(User).join(
            UserGroupMappings
        ).join(
            UserGroup
        ).filter(
            User.role_id != 1,
            UserGroup.role_id != 1,
        )

    query = query.filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(start_date, end_date)
    )

    if product_id:
        query = query.filter(
            CompletionActivity.product_id == product_id
        )

    query = query.with_entities(
        CompletionActivity.id,
        CompletionActivity.report_user_id,
        CompletionActivity.entity_total,
        CompletionActivity.entity_complete
    ).group_by(
        CompletionActivity.id,
        CompletionActivity.report_user_id,
    )

    started = query.count()
    completed = query.having(
        CompletionActivity.entity_total <= CompletionActivity.entity_complete
    ).count()

    completion_rate = round(
        (completed / float(started or 1)) * 100, 2
    )

    return completion_rate


def get_completion_rate(start_date, end_date, product_id=0):
    completion_rate = calculate_completion_rate(
        start_date, end_date, product_id)

    pr_start_date, pr_end_date = get_previous_dates(start_date, end_date)

    pr_completion_rate = calculate_completion_rate(
        pr_start_date, pr_end_date, product_id)

    return {
        "percentage": completion_rate,
        "progress": get_progress_difference(
            completion_rate,
            pr_completion_rate
        )
    }


def get_trending_categories(start_date, end_date, product_id=0):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    _top_views = VisitActivity.query.join(
        UserActivity
    ).join(
        Section, Section.id == VisitActivity.product_id
    ).join(
        SectionTranslations
    ).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.product_id.isnot(None),
        SectionTranslations.language_id == tenant.default_locale_id,
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        _top_views = _top_views.filter(
            VisitActivity.product_id == product_id,
            VisitActivity.product_id != VisitActivity.section_id,
        )
    else:
        _top_views = _top_views.filter(
            VisitActivity.product_id == VisitActivity.section_id,
        )

    _top_views = _top_views.with_entities(
        SectionTranslations.name,
        func.count(VisitActivity.report_user_id).label('views')
    ).group_by(
        SectionTranslations.name
    ).order_by(
        desc('views')
    ).limit(10).all()

    _top_views = [{'name': tv.name, 'views': int(tv.views)}
                  for tv in _top_views]
    return _top_views


def get_trending_chapters(start_date, end_date, product_id=0):
    tenant_id = getattr(current_app, 'tenant_id', None)
    _top_views = VisitActivity.query.join(
        UserActivity
    ).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.walkthrough_id.isnot(None),
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        _top_views = _top_views.filter(
            VisitActivity.product_id == product_id
        )

    _top_views = _top_views.with_entities(
        VisitActivity.walkthrough_id,
        func.count(VisitActivity.walkthrough_id).label('views')
    ).group_by(
        VisitActivity.walkthrough_id
    ).order_by(
        desc('views')
    ).all()

    _top_views = {tv.walkthrough_id: int(tv.views) for tv in _top_views}

    top_completions = CompletionActivity.query.join(
        UserActivity
    ).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(start_date, end_date)
    )

    if product_id:
        top_completions = top_completions.filter(
            CompletionActivity.product_id == product_id
        )

    top_completions = top_completions.with_entities(
        CompletionActivity.walkthrough_id,
        CompletionActivity.report_user_id,
        CompletionActivity.entity_total,
        CompletionActivity.entity_complete
    ).group_by(
        CompletionActivity.id,
        CompletionActivity.report_user_id
    ).all()

    _top_completions = dict()
    for tc in top_completions:
        if tc.walkthrough_id not in _top_completions:
            _top_completions[tc.walkthrough_id] = {
                'started': 0,
                'completed': 0
            }

        _top_completions[tc.walkthrough_id]['started'] += 1
        if tc.entity_complete >= tc.entity_total:
            _top_completions[tc.walkthrough_id]['completed'] += 1

    for wid, data in _top_completions.items():
        completion_rate = round(
            (data['completed'] / float(data['started'] or 1)) * 100, 2
        )
        _top_completions[wid] = completion_rate

    ch_id_list = set(_top_completions.keys()).union(_top_views.keys())
    chapters = []
    if ch_id_list:
        chapters = Walkthrough.query.filter(
            Walkthrough.id.in_(ch_id_list),
            Walkthrough.tenant_id == tenant_id,
        ).all()

    trending_chapters = list()
    for _ch in chapters:
        _product = _ch.playlist.section.get_category()
        _section = _ch.playlist.section
        _prod_name = unicode(_product)
        _section_name = unicode(_section)
        _ch_name = unicode(_ch)

        if _product.id == _section.id:
            breadcrumb = "%s > %s" % (_prod_name, _ch_name)
        else:
            breadcrumb = "%s > %s > %s" % (
                _prod_name,
                _section_name,
                _ch_name
            )

        trending_chapters.append({
            'walkthrough': _ch_name,
            'views': _top_views.get(_ch.id, 0),
            'completion_rate': _top_completions.get(_ch.id, 0.0),
            'breadcrumb': breadcrumb
        })

    trending_chapters = sorted(
        trending_chapters,
        key=lambda x: x['views'],
        reverse=True
    )

    return trending_chapters


def get_geography_data(start_date, end_date, product_id=0):
    tenant_id = getattr(current_app, 'tenant_id', None)
    visitors = VisitActivity.query.join(
        UserActivity
    ).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.country_iso_code.isnot(None),
        UserActivity.country.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        UserActivity.created_at.between(start_date, end_date),
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        visitors = visitors.filter(
            VisitActivity.product_id == product_id
        )

    visitors = visitors.with_entities(
        UserActivity.country,
        UserActivity.country_iso_code,
        func.count(
            func.distinct(
                VisitActivity.report_user_id
            )
        ).label('visitor_count')
    ).group_by(
        UserActivity.country,
        UserActivity.country_iso_code,
    ).order_by(
        desc('visitor_count')
    ).all()

    visitors = {
        v.country_iso_code: {
            'count': v.visitor_count,
            'name': v.country
        } for v in visitors
    }

    visitors = OrderedDict(
        sorted(
            visitors.items(),
            key=lambda k: k[1]['count'],
            reverse=True)
    )

    return visitors


def get_referral_data(start_date, end_date, product_id=0):
    select_case = case([(
        func.split_part(
            func.split_part(
                ReferralTracking.source, '//', 2
            ), '/', 1
        ) != '',
        func.split_part(
            func.split_part(
                ReferralTracking.source, '//', 2
            ), '/', 1
        )
    ), ],
        else_=ReferralTracking.source
    )
    tenant_id = getattr(current_app, 'tenant_id', None)
    visitors = ReferralTracking.query.join(
        UserActivity
    ).join(
        VisitActivity
    ).filter(
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        UserActivity.created_at.between(start_date, end_date),
        ReferralTracking.created_at.between(start_date, end_date)
    )

    if product_id:
        visitors = visitors.filter(
            VisitActivity.product_id == product_id
        )

    visitors = visitors.with_entities(
        select_case.label('referer'),
        func.count(
            func.distinct(
                ReferralTracking.user_id
            )
        ).label('referral_count')
    ).group_by(
        'referer'
    ).order_by(
        desc('referral_count')
    ).all()

    visitors = [{
        'name': v.referer,
        'count': int(v.referral_count)
    } for v in visitors]

    return visitors


def get_graph_slots(start_date, end_date, date_range='week', utcoffset=0):
    date_format_string = "%Y,%m,%d"
    graph_slots = list()
    if date_range == 'custom':
        days_difference = (end_date - start_date).days
        if days_difference <= 7:
            date_range = 'week'
        elif days_difference <= 31:
            date_range = 'month'
        elif days_difference <= 90:
            date_range = 'quarter'
        elif days_difference <= 180:
            date_range = 'half-year'
        else:
            date_range = 'year'

    if date_range in ['today', 'yesterday']:
        key = add_date_time(start_date, minutes=-utcoffset)
        graph_slots.append({
            'key': key.strftime(date_format_string),
            'start_date': start_date,
            'end_date': end_date
        })

    elif date_range == 'week':
        while start_date < end_date:
            key = add_date_time(start_date, minutes=-utcoffset)
            graph_slots.append({
                'key': key.strftime(date_format_string),
                'start_date': start_date,
                'end_date': add_date_time(start_date, days=1)
            })
            start_date += timedelta(days=1)

    elif date_range in ['month', 'quarter']:
        week_start_date = start_date
        while week_start_date < end_date:
            week_end_date = add_date_time(week_start_date, weeks=1)
            if week_end_date > end_date:
                week_end_date = end_date
            key = add_date_time(week_start_date, minutes=-utcoffset)
            graph_slots.append({
                'key': key.strftime(date_format_string),
                'start_date': week_start_date,
                'end_date': week_end_date
            })
            week_start_date = week_end_date

    elif date_range in ['half-year', 'year']:
        add_offset = False
        while start_date < end_date:
            next_month_date = add_date_time(start_date, months=1)
            next_month_start_date = datetime(
                next_month_date.year,
                next_month_date.month,
                1
            )

            month_end_date = add_date_time(
                next_month_start_date,
                minutes=utcoffset
            )

            if month_end_date > end_date:
                month_end_date = end_date

            if add_offset:
                start_date = add_date_time(start_date, minutes=utcoffset)

            if start_date != month_end_date:
                key = add_date_time(start_date, minutes=-utcoffset)
                graph_slots.append({
                    'key': key.strftime(date_format_string),
                    'start_date': start_date,
                    'end_date': month_end_date
                })

            start_date = next_month_start_date
            add_offset = True

    return graph_slots


def get_graph_data(start_date, end_date, product_id=0, date_range='week',
                   utcoffset=0):

    demo_views = []
    site_visitors = []
    slots = []
    date_slots = get_graph_slots(start_date, end_date, date_range, utcoffset)

    for _s in date_slots:
        views = calculate_demo_views(
            _s['start_date'],
            _s['end_date'],
            product_id
        )
        demo_views.append(views)
        visitors = calculate_site_visitors(
            _s['start_date'],
            _s['end_date'],
            product_id
        )
        site_visitors.append(visitors)
        slots.append(_s['key'])

    return {
        'geography': get_geography_data(start_date, end_date, product_id),
        'referrals': get_referral_data(start_date, end_date, product_id),
        'visitors_vs_views': {
            'demo_views': demo_views,
            'site_visitors': site_visitors,
            'slots': slots
        },
        'trending_categories': get_trending_categories(
            start_date, end_date, product_id
        )
    }


def get_time_bounds(date_range, start_date=None, end_date=None):
    if not end_date:
        end_date = add_date_time(datetime.utcnow(), days=1)
        end_date = datetime.combine(end_date, time())

    if date_range == 'custom':
        if not start_date:
            raise SharedemosException(
                400,
                message="Start date required"
            )
        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d")
        except Exception:
            raise SharedemosException(
                400,
                message="Please check start date format(YYYY-MM-DD)"
            )

        if not end_date:
            raise SharedemosException(
                400,
                message="End date required"
            )
        try:
            end_date = datetime.strptime(end_date, "%Y-%m-%d")
        except Exception:
            raise SharedemosException(
                400,
                message="Please check end date format(YYYY-MM-DD)"
            )

        end_date = add_date_time(end_date, days=1)

    if date_range == 'today':
        start_date = add_date_time(end_date, days=-1)
    elif date_range == 'yesterday':
        end_date = add_date_time(end_date, days=-1)
        start_date = add_date_time(end_date, days=-1)
    elif date_range == 'week':
        start_date = add_date_time(end_date, days=-7)
    elif date_range == 'month':
        start_date = add_date_time(end_date, months=-1)
    elif date_range == 'quarter':
        start_date = add_date_time(end_date, months=-3)
    elif date_range == 'half-year':
        start_date = add_date_time(end_date, months=-6)
    elif date_range == 'year':
        start_date = add_date_time(end_date, years=-1)

    return {
        'start_date': start_date,
        'end_date': end_date
    }


class NewReportsApi(Resource):

    @has_analyst_access
    def get(self):
        # Offset - Browser offset to UTC(in secs)
        utc_offset = int(request.args.get('offset', 0))
        date_range = request.args.get('date_range', 'week')
        product_id = int(request.args.get('product_id', 0) or 0)
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        """
            Allowed options for date_range:
                today, yesterday, week(default), month, quarter,
                half-year, year, custom
            For 'custom' date_range, start and end date is required
        """
        date_slots = get_time_bounds(date_range, start_date, end_date)

        start_date = date_slots['start_date']
        end_date = date_slots['end_date']

        if start_date > end_date:
            raise SharedemosException(
                400,
                message="Start date should be less than end date"
            )

        if utc_offset:
            start_date = add_date_time(
                date_slots['start_date'],
                minutes=utc_offset
            )
            end_date = add_date_time(
                date_slots['end_date'],
                minutes=utc_offset
            )

        return jsonify({
            "users": get_site_visitors(start_date, end_date, product_id),
            "views": get_demo_views(start_date, end_date, product_id),
            "completions": get_completion_rate(
                start_date, end_date, product_id),
            "trending_chapters": get_trending_chapters(
                start_date, end_date, product_id),
            "graphs": get_graph_data(
                start_date, end_date, product_id, date_range, utc_offset)
        })
