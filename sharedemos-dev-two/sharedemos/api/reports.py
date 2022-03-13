from collections import OrderedDict
from datetime import datetime
from flask import current_app, request
from flask.ext.restful import Resource
from sqlalchemy import func

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import Tenant, TopicActivity
from sharedemos.libs.api import get_graph_slots
from sharedemos.libs.decorators import has_analyst_access, check_private_tenant
from sharedemos.libs.helpers import add_date_time

from sharedemos.libs.model import (
    get_time_bounds,
    get_progress_difference,
)
from sharedemos.libs.reports import (
    calculate_chapter_views,
    get_chapter_analytics,
    get_chapter_completion_rate,
    get_chapter_views,
    get_most_visited_chapter,
    get_top_visitors,
    get_social_shares,
    get_views_and_completion_rate,
    get_viewer_completion_rate,
    get_visitors_data,
    get_visitors_referral_data
)

from sharedemos.models import (
    Section,
    SectionTranslations,
    User,
    VisitorsGeography
)


def get_visitors_graph_data(date_range, category_id,
                            start_date=None, end_date=None):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    graph_slots = get_graph_slots(tenant, date_range, start_date, end_date)

    for slot in graph_slots:
        visit_data = get_visitors_data(
            slot['start_date'],
            slot['end_date'],
            tenant_id,
            category=category_id
        )
        cur_chapter_data = get_views_and_completion_rate(
            slot['start_date'], slot['end_date'], tenant_id,
            category=category_id)
        slot['site_visitors'] = visit_data['visitors']
        slot['demo_views'] = cur_chapter_data['views']
        slot['completion_rate'] = cur_chapter_data['completion_rate']

    return graph_slots


def get_trending_categories(start_date, end_date, tenant_id,
                            category_ids_list=None, category=None):
    trending_categories = dict()

    # Get all visits for given date
    visits = TopicActivity.query.filter(
        (TopicActivity.tenant_id == tenant_id) &
        (TopicActivity.from_date.between(start_date, end_date))
    )

    """
        Get all visits for a section,
        if selected, else get all visits for categories
    """
    if category:
        visits = visits.filter(
            (TopicActivity.product == category) &
            (TopicActivity.section != category)
        )
    else:
        visits = visits.filter(
            TopicActivity.product == TopicActivity.section
        )

    # filter visits for given categories
    if category_ids_list:
        visits = visits.filter(
            TopicActivity.product.in_(category_ids_list)
        )

    """
        If a category is selected select sub sections,
        else get all top level categories
    """
    if category:
        # count and group by section_ids
        grouped_visits = visits.with_entities(
            TopicActivity.section,
            func.sum(TopicActivity.overall_visit_count).label('count')
        ).group_by(TopicActivity.section).order_by(
            func.sum(TopicActivity.overall_visit_count).label('count')
        )

    else:
        # count and group by product
        grouped_visits = visits.with_entities(
            TopicActivity.product.label('section'),
            func.sum(TopicActivity.overall_visit_count).label('count')
        ).group_by(TopicActivity.product).order_by(
            func.sum(TopicActivity.overall_visit_count).label('count').desc()
        )

    # Consider sections having atleast 1 view
    grouped_visits = grouped_visits.having(
        func.sum(TopicActivity.overall_visit_count).label('count') > 0
    ).limit(10).all()

    for sv in grouped_visits:
        sec_id = sv[0]
        count = sv[1]
        trending_categories[sec_id] = {
            'section': sec_id,
            'count': count
        }

    return trending_categories


def get_visitors_geography_data(start_date, end_date, tenant_id, category):
    # Get visitors geography information

    visitors_geography = VisitorsGeography.query.filter(
        VisitorsGeography.from_date.between(start_date, end_date),
        VisitorsGeography.tenant_id == tenant_id,
        VisitorsGeography.country.__ne__(u'None'),
        VisitorsGeography.country_iso_code.__ne__(u'None')
    )

    if category == 'all':
        visitors_geography = visitors_geography.filter(
            VisitorsGeography.product.is_(None)
        )
    else:
        visitors_geography = visitors_geography.filter(
            VisitorsGeography.product == unicode(category)
        )

    visitors_geography = visitors_geography.with_entities(
        VisitorsGeography.country,
        VisitorsGeography.country_iso_code,
        func.sum(VisitorsGeography.visitors_count).label("visitors_count")
    ).group_by(
        VisitorsGeography.country,
        VisitorsGeography.country_iso_code
    ).order_by(
        func.sum(
            VisitorsGeography.visitors_count
        ).label("visitors_count").desc()
    )

    visitors_geography = {
        unicode(vg.country_iso_code): {
            'name': unicode(vg.country),
            'count': int(vg.visitors_count)
        }
        for vg in visitors_geography.all()
    }

    return visitors_geography


def get_viewer_graph_details(date_slots, user_id=None, date_range='week', category_id=None):
    """
    Function too get the details of chapter views and chapter having highest completion rate.

    Params:
        date_slots: Dictionary, contains current and previous start, end date.
        locale_id: String, Languages model id.
        user_id: Integer, User model id.
        date_range: String, ex: today, week, month etc.
    """
    demo_views = []
    slots = []
    chapter_views_completion_rate = []

    tenant_id = current_app.tenant_id
    tenant = Tenant.query.get(tenant_id)
    cur_start_date = date_slots['cur_start_date']
    cur_end_date = date_slots['cur_end_date']
    graph_slots = get_graph_slots(
        tenant, date_range, cur_start_date, cur_end_date)

    for _slot in graph_slots:
        views = calculate_chapter_views(
            _slot['start_date'], _slot['end_date'], tenant, user_id, category_id)
        demo_views.append(views)
        chapter_completion_rate = get_chapter_completion_rate(
            _slot['start_date'], _slot['end_date'], user_id, category_id)
        chapter_views_completion_rate.append(chapter_completion_rate)
        slots.append(_slot['key'])

    return {
        'demo_views': demo_views,
        'slots': slots,
        'completion_rate': chapter_views_completion_rate if chapter_views_completion_rate else 0
    }


class ReportsApi(Resource):

    @has_analyst_access
    def get(self, product, section, walkthrough, date_range='week',
            from_date=None, to_date=None):
        tenant_id = getattr(current_app, 'tenant_id', None)

        tenant = Tenant.query.get(tenant_id)
        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        cur_start_date, cur_end_date, psd, ped = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        activities = TopicActivity.query.filter(
            (TopicActivity.tenant_id == tenant_id) &
            (TopicActivity.from_date.between(cur_start_date, cur_end_date))
        )

        total_activities = activities.filter(
            TopicActivity.walkthrough.isnot(None)
        )

        if product:
            activities = activities.filter(
                TopicActivity.product == product
            )

        if section:
            activities = activities.filter(
                TopicActivity.section == section
            )

        if walkthrough:
            activities = activities.filter(
                TopicActivity.walkthrough == walkthrough
            )

        activities = activities.with_entities(
            TopicActivity.product,
            TopicActivity.section,
            TopicActivity.walkthrough,
            TopicActivity.total_slides_count,
            func.sum(TopicActivity.visit_count).label('visit_count'),
            func.avg(TopicActivity.completion_rate).label('completion_rate'),
            func.avg(
                TopicActivity.average_frames_completed
            ).label('average_frames_completed'),
            func.sum(
                TopicActivity.percent_completions_25
            ).label('percent_completions_25'),
            func.sum(
                TopicActivity.percent_completions_50
            ).label('percent_completions_50'),
            func.sum(
                TopicActivity.percent_completions_75
            ).label('percent_completions_75'),
            func.sum(
                TopicActivity.percent_completions_100
            ).label('percent_completions_100'),
        ).group_by(
            TopicActivity.product,
            TopicActivity.section,
            TopicActivity.walkthrough,
            TopicActivity.total_slides_count
        ).first()

        visit_count = activities.visit_count if activities else 0
        percent_25 = activities.percent_completions_25 if activities else 0
        percent_50 = activities.percent_completions_50 if activities else 0
        percent_75 = activities.percent_completions_75 if activities else 0
        percent_100 = activities.percent_completions_100 if activities else 0

        completions = {
            '100': percent_100
        }
        completions['75'] = completions['100'] + percent_75
        completions['50'] = completions['75'] + percent_50
        completions['25'] = completions['50'] + percent_25

        funnel_data = list()
        if activities and activities.total_slides_count:
            slide_count = 0
            slot = 'Slide 0 - 0'

            # 25% slot
            slot = str(slide_count + 1) + '-' +\
                str(activities.total_slides_count / 4)
            slide_count = activities.total_slides_count / 4
            funnel_data.append(['Slide ' + slot, completions['25']])

            # 50% slot
            slot = str(slide_count + 1) + '-' +\
                str(activities.total_slides_count / 2)
            slide_count = activities.total_slides_count / 2
            funnel_data.append(['Slide ' + slot, completions['50']])

            # 75% slot
            slot = str(slide_count + 1) + '-' +\
                str((activities.total_slides_count * 3) / 4)
            slide_count = (activities.total_slides_count * 3) / 4
            funnel_data.append(['Slide ' + slot, completions['75']])

            # 100% slot
            slot = str(slide_count + 1) + '-' +\
                str(activities.total_slides_count)
            funnel_data.append(['Slide ' + slot, completions['100']])

        total_activities = total_activities.with_entities(
            func.sum(TopicActivity.visit_count).label('visit_count'),
        ).first()

        total_visits = total_activities.visit_count if total_activities else 0
        percentage_contribution = round(
            (visit_count / float(total_visits or 1)) * 100, 2
        )

        timeline_data = []
        visit_timeline = get_graph_slots(tenant, date_range,
                                         cur_start_date, cur_end_date)
        for slot in visit_timeline:
            activities = TopicActivity.query.filter(
                (TopicActivity.tenant_id == tenant_id) &
                (TopicActivity.product == product) &
                (TopicActivity.section == section) &
                (TopicActivity.walkthrough == walkthrough) &
                (TopicActivity.from_date.between(
                    slot['start_date'], slot['end_date']))
            ).with_entities(
                TopicActivity.product,
                TopicActivity.section,
                TopicActivity.walkthrough,
                func.sum(TopicActivity.visit_count).label('visit_count'),
                func.avg(
                    TopicActivity.completion_rate).label('completion_rate'),
                func.avg(
                    TopicActivity.average_frames_completed
                ).label('average_frames_completed'),
            ).group_by(
                TopicActivity.product,
                TopicActivity.section,
                TopicActivity.walkthrough,
            ).first()
            filter_by = request.args.get('filter_by', 'views')
            if filter_by == 'completion_rate':
                val = 0
                if activities:
                    val = round(activities.completion_rate, 2)
                timeline_data.append([slot['key'], val])
            elif filter_by == 'avg_frames':
                val = 0
                if activities:
                    val = round(activities.average_frames_completed, 2)
                timeline_data.append([slot['key'], val])
            else:
                val = 0
                if activities:
                    val = activities.visit_count
                timeline_data.append([slot['key'], val])

        return {
            'product': product,
            'section': section,
            'walkthrough': walkthrough,
            'funnel_data': funnel_data,
            'percentage_contribution': percentage_contribution,
            'timeline_data': timeline_data,
        }


class ReportsGraphApi(Resource):

    @has_analyst_access
    def get(self):

        graph_data = {
            'geography': {},
            'referrals': [],
            'trending_categories': [],
            'visitors_vs_views': {
                'site_visitors': [],
                'demo_views': [],
                'slots': []
            }
        }
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        from_date = None
        to_date = None
        category = None

        if request.args.get('from_date'):
            from_date = request.args.get('from_date')
        if request.args.get('to_date'):
            to_date = request.args.get('to_date')
        date_range = request.args.get('date_range')
        category_id = request.args.get('category_id')

        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)
        cur_start_date, cur_end_date, pr_st_date, pr_ed_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        if category_id != 'all':
            product = Section.query.join(SectionTranslations).filter(
                (Section.tenant_id == tenant_id) &
                (Section.is_deleted.__eq__(False)) &
                (SectionTranslations.language_id == tenant.default_locale_id) &
                (SectionTranslations.name == category_id)
            ).first()
            if not product:
                raise SharedemosException(500, message='No Product Found')
            category = dict()
            category['name'] = category_id
            category['slug'] = product.slug

        cur_trending_categories = get_trending_categories(
            cur_start_date,
            cur_end_date,
            tenant_id,
            category=category['name'] if category else None
        )
        pr_trending_categories = get_trending_categories(
            pr_st_date,
            pr_ed_date,
            tenant_id,
            cur_trending_categories.keys(),
            category=category['name'] if category else None
        )

        trending_categories = list()
        for section_id, data in cur_trending_categories.items():
            prev_visits_count = 0
            if pr_trending_categories.get(section_id):
                prev_visits_count = pr_trending_categories[
                    section_id]['count']
            trending_categories.append({
                'views': data['count'],
                'section': data['section'],
                'progress': get_progress_difference(
                    data['count'], prev_visits_count)
            })

        trending_categories = sorted(trending_categories,
                                     key=lambda k: k['views'],
                                     reverse=True)

        graph_data['trending_categories'] = trending_categories

        visitors_geography = get_visitors_geography_data(
            cur_start_date,
            cur_end_date,
            tenant_id,
            category_id
        )
        visitors_geography = OrderedDict(
            sorted(visitors_geography.items(),
                   key=lambda k: k[1]['count'],
                   reverse=True)
        )
        graph_data['geography'] = visitors_geography

        visitors_referral = get_visitors_referral_data(
            cur_start_date, cur_end_date, tenant_id, category_id)
        visitors_referral = sorted(visitors_referral,
                                   key=lambda k: k['count'],
                                   reverse=True)
        graph_data['referrals'] = visitors_referral

        if not tenant.flags.is_private:
            sources = get_social_shares(
                cur_start_date, cur_end_date,
                category_id, tenant.default_locale_id
            )
            total = sum(dict(sources).values())
            sources = [{"medium": medium, "count": count}
                       for medium, count in sources]
            graph_data['social_shares'] = {
                "sources": sources,
                "total": total
            }

        visitors_data = get_visitors_graph_data(
            date_range,
            category_id,
            cur_start_date.replace(tzinfo=None),
            cur_end_date.replace(tzinfo=None)
        )

        for data in visitors_data:
            graph_data['visitors_vs_views']['slots'].append(data['key'])
            graph_data['visitors_vs_views'][
                'site_visitors'].append(data['site_visitors'])
            graph_data['visitors_vs_views'][
                'demo_views'].append(data['demo_views'])

        return graph_data


class ReportsDataApi(Resource):

    @has_analyst_access
    def get(self):

        report_data = {
            'site_visitors': {
                'count': 0,
                'progress': 0
            },
            'demo_views': {
                'count': 0,
                'progress': 0
            },
            'completion_rate': {
                'count': 0,
                'progress': 0
            },
            'trending_chapters': []
        }

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        from_date = None
        to_date = None
        category = None

        if request.args.get('from_date'):
            from_date = request.args.get('from_date')
        if request.args.get('to_date'):
            to_date = request.args.get('to_date')
        date_range = request.args.get('date_range')
        category_id = request.args.get('category_id')

        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)
        cur_start_date, cur_end_date, pr_st_date, pr_ed_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        cur_visit_data = get_visitors_data(
            cur_start_date,
            cur_end_date,
            tenant_id,
            category=category_id
        )
        prev_visit_data = get_visitors_data(
            pr_st_date,
            pr_ed_date,
            tenant_id,
            category=category_id
        )

        visit_progress = get_progress_difference(
            cur_visit_data['visitors'],
            prev_visit_data['visitors'])

        report_data['site_visitors']['count'] = cur_visit_data['visitors']
        report_data['site_visitors']['progress'] = visit_progress

        cur_chapter_data = get_views_and_completion_rate(
            cur_start_date,
            cur_end_date,
            tenant_id,
            category=category_id
        )
        prev_chapter_data = get_views_and_completion_rate(
            pr_st_date,
            pr_ed_date,
            tenant_id,
            category=category_id
        )
        views_progress = get_progress_difference(
            cur_chapter_data['views'],
            prev_chapter_data['views']
        )

        report_data['demo_views']['count'] = cur_chapter_data['views']
        report_data['demo_views']['progress'] = views_progress

        completion_rate_progress = get_progress_difference(
            cur_chapter_data['completion_rate'],
            prev_chapter_data['completion_rate']
        )

        report_data['completion_rate']['count'] = round(cur_chapter_data[
            'completion_rate'])
        report_data[
            'completion_rate']['progress'] = completion_rate_progress

        if category_id != 'all':
            product = Section.query.join(SectionTranslations).filter(
                (Section.tenant_id == tenant_id) &
                (Section.is_deleted.__eq__(False)) &
                (SectionTranslations.language_id == tenant.default_locale_id) &
                (SectionTranslations.name == category_id)
            ).first()
            if not product:
                raise SharedemosException(500, message='No Product Found')
            category = dict()
            category['name'] = category_id
            category['slug'] = product.slug

        current_trending_demos = get_chapter_analytics(
            cur_start_date,
            cur_end_date,
            category_id
        )

        trending_demos = list()
        for demo in current_trending_demos:
            if demo.product == demo.section:
                breadcrumb = "%s > %s" % (demo.product, demo.walkthrough)
            else:
                breadcrumb = "%s > %s > %s" % (demo.product,
                                               demo.section,
                                               demo.walkthrough)
            trending_demos.append({
                'walkthrough': demo.walkthrough,
                'views': demo.overall_visit_count,
                'completion_rate': round(demo.completion_rate),
                'breadcrumb': breadcrumb
            })

        trending_demos = sorted(trending_demos, key=lambda k: k['views'],
                                reverse=True)
        report_data['trending_chapters'] = trending_demos

        return report_data


class ViewerDetailsApi(Resource):

    @check_private_tenant
    @has_analyst_access
    def get(self, viewer_id=None):
        """Fetch details of a viewer."""
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        from_date = None
        to_date = None
        category_id = None
        group_ids = request.args.getlist('group_ids', type=int)
        if request.args.get('from_date'):
            from_date = request.args.get('from_date')
        if request.args.get('to_date'):
            to_date = request.args.get('to_date')
        date_range = request.args.get('date_range')
        category_id = category_name = request.args.get('category_id')
        page_no = request.args.get('page', default=1, type=int)
        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)
        cur_start_date, cur_end_date, pr_st_date, pr_ed_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )
        date_slots = {
            'cur_start_date': cur_start_date,
            'cur_end_date': cur_end_date,
            'prev_start_date': pr_st_date,
            'prev_end_date': pr_ed_date
        }
        if category_id != 'all':
            product = Section.query.join(SectionTranslations).filter(
                (Section.tenant_id == tenant_id) &
                (Section.is_deleted.__eq__(False)) &
                (SectionTranslations.language_id == tenant.default_locale_id) &
                (SectionTranslations.name == category_id)
            ).first()
            if not product:
                raise SharedemosException(500, message='No Product Found')

            category_id = product.id
            category_name = product.get_name()

        if viewer_id:
            user = User.query.filter(User.id == viewer_id).first_or_404()
            viewer_details = {
                'initials': user.initials,
                'fullname': user.fullname,
                'email': user.email,
                'profile_picture': user.picture_url
            }
            if user.groups:
                viewer_details['groups'] = user.user_group_slugs()
            if user.onboard_at:
                viewer_details['onboard_at'] = user.onboard_at.isoformat()
            viewer_details['chapter_views'] = get_chapter_views(
                date_slots, tenant, viewer_id, category_id)
            viewer_details['most_visited_chapter'] = get_most_visited_chapter(
                date_slots['cur_start_date'], date_slots['cur_end_date'],
                viewer_id, category_id)
            viewer_details['completion_rate'] = get_viewer_completion_rate(
                date_slots, tenant, viewer_id, category_id)
            viewer_details['graph_data'] = get_viewer_graph_details(
                date_slots, viewer_id, date_range, category_id)

            return viewer_details

        top_visitors_details = get_top_visitors(
            cur_start_date, cur_end_date, category_name, page_no, group_ids)

        return top_visitors_details
