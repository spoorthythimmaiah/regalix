from collections import OrderedDict
from datetime import datetime
from flask import current_app, request
from flask.ext.restful import Resource
from sqlalchemy import func, desc

from sharedemos.models import (
    CompletionActivity,
    ReferralTracking,
    Section,
    SectionTranslations,
    SocialShare,
    Tenant,
    TenantFlags,
    User,
    UserActivity,
    UserGroup,
    UserGroupMappings,
    VisitActivity,
    VisitorsGeography,
    Walkthrough,
    WalkthroughActivity,
    WalkthroughTranslations
)
from sharedemos.libs.api import get_graph_slots
from sharedemos.libs.decorators import has_analyst_access
from sharedemos.libs.helpers import add_date_time, get_translation
from sharedemos.libs.model import (
    get_time_bounds,
    get_progress_difference
)


def calculate_site_visitors(start_date, end_date, tenant, category_id=None):
    """
    Function to get the site visitor count.

    Params:
        start_date, end_date: datetime.
        tenant: Sqlalchemy tenant object.
        category_id: Integer, section model id.
    """
    visitors = VisitActivity.query.join(
        UserActivity
    ).filter(
        VisitActivity.tenant_id == tenant.id,
        UserActivity.tenant_id == tenant.id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        UserActivity.created_at.between(
            start_date, end_date),
        VisitActivity.created_at.between(
            start_date, end_date),
    )
    if tenant.flags.is_private and tenant.user_groups:
        visitors = visitors.join(User).join(UserGroupMappings).join(
            UserGroup).filter(
            User.role_id != 1,
            UserGroup.role_id != 1
        )

    if category_id:
        visitors = visitors.filter(
            VisitActivity.product_id == category_id
        )

    visitors = visitors.with_entities(
        func.count(
            func.distinct(VisitActivity.report_user_id)
        ).label('site_visitors')
    ).first()

    return int(visitors.site_visitors)


def get_site_visit_data(date_slots, tenant, category_id=None):
    """
    Function to get the site visit count.

    Params:
        date_slots: Dictionary, contains current start, end date and
                    Previous start, end date.
        tenant : Sqlalchemy tenant object.
        category-id: Integer, Section model id
    """
    cur_visit_data = calculate_site_visitors(
        date_slots['cur_start_date'],
        date_slots['cur_end_date'],
        tenant,
        category_id=category_id
    )
    prev_visit_data = calculate_site_visitors(
        date_slots['prev_start_date'],
        date_slots['prev_end_date'],
        tenant,
        category_id=category_id
    )

    return {
        "count": cur_visit_data,
        "progress": get_progress_difference(cur_visit_data,
                                            prev_visit_data)
    }


def calculate_chapter_views(start_date, end_date, locale_id, tenant,
                            user_id=None, category_id=None):
    """
    Function to get total number of chapter views.

    Params:
        start_date, end_date: Datetime object.
        locale_id: String, Languages model id.
        tenant: Sqlalchemy tenant object.
        user_id: Integer, User model id.
        category_id: Integer, Section model id.
    """
    views = VisitActivity.query.join(
        UserActivity
    ).filter(
        VisitActivity.tenant_id == tenant.id,
        UserActivity.tenant_id == tenant.id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.walkthrough_id.isnot(None),
        VisitActivity.locale_served_code == locale_id,
        VisitActivity.created_at.between(start_date, end_date)
    )
    if tenant.flags.is_private and tenant.user_groups and user_id:
        views = views.join(User).join(UserGroupMappings).join(
            UserGroup).filter(
            User.role_id != 1,
            UserGroup.role_id != 1,
            User.id == user_id
        )

    if category_id:
        views = views.filter(VisitActivity.product_id == category_id)

    chapter_views = views.with_entities(VisitActivity.walkthrough_id).count()
    return chapter_views


def get_chapter_views(date_slots, locale_id, tenant, user_id=None,
                      category_id=None):
    """
    Function to get chapter views and progress.

    Params:
        date_slots: Dictionary, contains current and previous start and end date.
        locale_id: String, Languages model id.
        tenant: Sqlalchemy tenant object.
        user_id: Integer, User model id.
        category_id: Integer, Section model id.
    """
    cur_chapter_views = calculate_chapter_views(
        date_slots['cur_start_date'],
        date_slots['cur_end_date'],
        locale_id, tenant, user_id, category_id)

    prev_chapter_views = calculate_chapter_views(
        date_slots['prev_start_date'],
        date_slots['prev_end_date'],
        locale_id, tenant, user_id, category_id)

    return {
        "count": cur_chapter_views,
        "progress": get_progress_difference(cur_chapter_views,
                                            prev_chapter_views)
    }


def calculate_completion_rate(start_date, end_date, locale_id, tenant,
                              user_id=None, category_id=None):
    """
    Function to calculate the completion rate.

    Params:
        start_date, end_date: Datetime Object.
        locale_id: String, Languages model id.
        user_id: Integer, User model id.
        category_id: Interger, Section model id.
    """
    query = CompletionActivity.query.join(
        UserActivity).filter(
        CompletionActivity.tenant_id == tenant.id,
        UserActivity.tenant_id == tenant.id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(
            start_date, end_date),
        CompletionActivity.locale_served_code == locale_id
    )
    if category_id:
        query = query.filter(
            CompletionActivity.product_id == category_id
        )
    if tenant.flags.is_private and tenant.user_groups and user_id:
        query = query.join(User).join(UserGroupMappings).join(
            UserGroup).filter(
            User.role_id != 1,
            UserGroup.role_id != 1,
            User.id == user_id
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


def get_completion_rate(date_slots, locale_id, tenant, user_id=None, category_id=None):
    """
    Function to get completion rate and its progress.

    Params:
        date_slots: Dictionary, contains current and previous start and end date.
        loale_id: String, Languages model id.
        user_id: Integer, User model id.
        category_id: Integer, Section model id.
    """
    cur_completion_rate = calculate_completion_rate(
        date_slots['cur_start_date'],
        date_slots['cur_end_date'],
        locale_id,
        tenant,
        user_id,
        category_id
    )
    prev_completion_rate = calculate_completion_rate(
        date_slots['prev_start_date'],
        date_slots['prev_end_date'],
        locale_id,
        tenant,
        user_id,
        category_id
    )

    return{
        'percentage': cur_completion_rate,
        'progress': get_progress_difference(cur_completion_rate,
                                            prev_completion_rate)
    }


def get_referral_data(start_date, end_date, tenant_id, category_id=None):
    """
    Function to get the site visit referrals data.

    Params:
        start_date, end_date: Datetime object.
        tenant_id, Integer, Tenant model id.
        category_id: Integer, Section model id.
    """
    query = ReferralTracking.query.join(UserActivity).join(
        VisitActivity).filter(
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        ReferralTracking.created_at.between(start_date, end_date),
        UserActivity.created_at.between(start_date, end_date),
    )
    if category_id:
        query = query.filter(
            VisitActivity.product_id == category_id
        )

    referrals = query.with_entities(
        ReferralTracking.source.label('referer'),
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

    referrals = [{
        'name': v_referral.referer,
        'count': int(v_referral.referral_count)
    } for v_referral in referrals]

    return referrals


def get_trending_categories(date_slots, locale_id, category_id=None, limit=5):
    """
    Function to get top most visited categories.

    Params:
       date_slots: Dictionary, Contains current and previous start and end date.
       locale_id: String, Languages model id.
       category_id: Integer, Section model id.
    """
    tenant_id = current_app.tenant_id
    query = VisitActivity.query.join(
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
        SectionTranslations.language_id == locale_id,
        VisitActivity.locale_served_code == locale_id,
        VisitActivity.created_at.between(
            date_slots['cur_start_date'], date_slots['cur_end_date'])
    )
    if category_id:
        query = query.filter(
            VisitActivity.product_id == category_id,
            VisitActivity.product_id != VisitActivity.section_id,
        )
    else:
        query = query.filter(
            VisitActivity.product_id == VisitActivity.section_id,
        )
    trending_categories = query.with_entities(
        SectionTranslations.name,
        func.count(VisitActivity.report_user_id).label('views'),
        VisitActivity.created_at,
        VisitActivity.id
    ).group_by(
        SectionTranslations.name,
        VisitActivity.created_at,
        VisitActivity.id
    ).order_by(
        desc('views')
    ).all()

    trending_categories = [{'name': t_category.name,
                            'views': int(t_category.views)}
                           for t_category in trending_categories]
    return trending_categories[:limit]


def get_trending_chapters(date_slots, locale_id, category_id=None, limit=5):
    """
    Function to get most visited chapters.

    Params:
        date_slots: Dictionary, contains current and previous start and end date.
        locale_id: String, Lanaguages model id.
        category_id: Integer, Section model id.
    """
    tenant_id = current_app.tenant_id
    trending_chapters = VisitActivity.query.join(
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
        VisitActivity.created_at.between(
            date_slots['cur_start_date'], date_slots['cur_end_date']),
        VisitActivity.locale_served_code == locale_id
    )

    if category_id:
        trending_chapters = trending_chapters.filter(
            VisitActivity.product_id == category_id
        )

    trending_chapters = trending_chapters.with_entities(
        VisitActivity.walkthrough_id,
        func.count(VisitActivity.walkthrough_id).label('views')
    ).group_by(
        VisitActivity.walkthrough_id
    ).order_by(
        desc('views')
    ).all()

    trending_chapters = {t_chapter.walkthrough_id: int(t_chapter.views)
                         for t_chapter in trending_chapters}

    top_completed_chapters = CompletionActivity.query.join(
        UserActivity
    ).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(
            date_slots['cur_start_date'], date_slots['cur_end_date']),
        CompletionActivity.locale_served_code == locale_id
    )

    if category_id:
        top_completed_chapters = top_completed_chapters.filter(
            CompletionActivity.product_id == category_id
        )

    top_completed_chapters = top_completed_chapters.with_entities(
        CompletionActivity.walkthrough_id,
        CompletionActivity.report_user_id,
        CompletionActivity.entity_total,
        CompletionActivity.entity_complete
    ).group_by(
        CompletionActivity.id,
        CompletionActivity.report_user_id
    ).all()

    completion_chapters = {}
    for tc_chapter in top_completed_chapters:
        if tc_chapter.walkthrough_id not in completion_chapters:
            completion_chapters[tc_chapter.walkthrough_id] = {
                'started': 0,
                'completed': 0
            }

        completion_chapters[tc_chapter.walkthrough_id]['started'] += 1
        if tc_chapter.entity_complete >= tc_chapter.entity_total:
            completion_chapters[tc_chapter.walkthrough_id]['completed'] += 1

    for wid, data in completion_chapters.items():
        completion_rate = round(
            (data['completed'] / float(data['started'] or 1)) * 100, 2
        )
        completion_chapters[wid] = completion_rate

    ch_id_list = set(completion_chapters.keys()).union(trending_chapters.keys())
    chapters = []
    if ch_id_list:
        chapters = Walkthrough.query.filter(
            Walkthrough.id.in_(ch_id_list),
            Walkthrough.tenant_id == tenant_id,
        ).all()

    top_trending_chapters = []
    for _ch in chapters:
        _product = _ch.playlist.section.get_category()
        _section = _ch.playlist.section
        _prod_name = unicode(_product)
        _section_name = unicode(_section)
        _ch_name = unicode(_ch)

        if _product.id == _section.id:
            breadcrumb = u"{} > {}".format(_prod_name, _ch_name)
        else:
            breadcrumb = u"{} > {} > {}".format(
                _prod_name,
                _section_name,
                _ch_name
            )

        top_trending_chapters.append({
            'walkthrough': _ch_name,
            'views': trending_chapters.get(_ch.id, 0),
            'completion_rate': completion_chapters.get(_ch.id, 0.0),
            'breadcrumb': breadcrumb
        })

    top_trending_chapters = sorted(
        top_trending_chapters,
        key=lambda x: x['views'],
        reverse=True
    )[:limit]

    return top_trending_chapters


def get_most_visited_chapter(start_date, end_date, user_id, locale_id, category_id=None):
    """
    Function to get most visited chapter by user for the given duration.

    Params:
        user_id: Integer, User id.
        from_date, to_date: Datetime
    """
    tenant_id = current_app.tenant_id
    most_visited_chapter = WalkthroughActivity.query.join(
        UserActivity).join(
        Walkthrough, WalkthroughActivity.walkthrough_id == Walkthrough.id).join(
        WalkthroughTranslations,
        WalkthroughTranslations.walkthrough_id == Walkthrough.id).join(
        User, UserActivity.user_id == User.id).filter(
        WalkthroughActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        User.role_id != 1,
        User.id == user_id,
        WalkthroughActivity.walkthrough_id.isnot(None),
        WalkthroughActivity.created_at.between(start_date, end_date),
        WalkthroughActivity.locale_served_code == locale_id
    )
    if category_id:
        most_visited_chapter = most_visited_chapter.filter(
            WalkthroughActivity.product_id == category_id
        )

    most_visited_chapter = most_visited_chapter.with_entities(
        func.count(WalkthroughActivity.walkthrough_id),
        (WalkthroughTranslations.name).label('chapter_name')).group_by(
        WalkthroughTranslations.name).order_by(desc(
            func.count(WalkthroughActivity.walkthrough_id))).first()

    return most_visited_chapter.chapter_name if most_visited_chapter else None


def get_viewer_completion_rate(date_slots, tenant_id, user_id):
    """
    Function to get completion rate for a particular user.

    Params:
        date_slots: Dictionary, contains current and previous start and end date.
        tenant_id: Sqlalchemy, Tenant model Id.
        user_id: Sqlalchemy User model Id.

    """
    query = CompletionActivity.query.join(
        UserActivity).join(
        User).join(
        UserGroupMappings, UserGroupMappings.user_id == User.id).join(
        UserGroup, UserGroup.id == UserGroupMappings.group_id).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserGroup.role_id != 1,
        User.role_id != 1,
        User.id == user_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(
            date_slots['cur_start_date'], date_slots['cur_end_date'])
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

    return {'completion_rate': completion_rate}


def get_chapter_completion_rate(start_date, end_date, locale_id, user_id,
                                category_id=None):
    """
    Function to get the chapter completion rate for a user.

    Params:
        start_date, end_date: Datetime object.
        locale_id: string, Languages model id.
        user_id: Integer, User model id.
        category_id: Integer, Setion model id.
    """
    tenant_id = current_app.tenant_id

    chapters = CompletionActivity.query.join(
        UserActivity).join(
        User).join(
        UserGroupMappings).join(
        UserGroup).join(Walkthrough,
                        Walkthrough.id == CompletionActivity.walkthrough_id).join(
        WalkthroughTranslations,
        WalkthroughTranslations.walkthrough_id == Walkthrough.id).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserGroup.role_id != 1,
        User.role_id != 1,
        User.id == user_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.locale_served_code == locale_id,
        CompletionActivity.modified_at.between(start_date, end_date))
    if category_id:
        chapters = chapters.filter(
            CompletionActivity.product_id == category_id
        )

    chapters = chapters.with_entities(
        CompletionActivity.id, CompletionActivity.entity_total,
        CompletionActivity.entity_complete,
        WalkthroughTranslations.name).distinct(Walkthrough.id).all()

    chapter_details = {}
    for _ch in chapters:
        chapter_name = _ch.name
        completion_rate = (_ch.entity_complete / float(_ch.entity_total)) * 100
        chapter_details.update({chapter_name: completion_rate})

    return max({key: value} for key, value in chapter_details.items()) if chapter_details else 0


def get_visitor_graph_details(date_slots, locale_id, user_id=None,
                              date_range='week'):
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
            _slot['start_date'], _slot['end_date'], locale_id, tenant, user_id)
        demo_views.append(views)
        chapter_completion_rate = get_chapter_completion_rate(
            _slot['start_date'], _slot['end_date'], locale_id, user_id)
        chapter_views_completion_rate.append(chapter_completion_rate)
        slots.append(_slot['key'])

    return {
        'demo_views': demo_views,
        'slots': slots,
        'completion_rate': chapter_views_completion_rate if chapter_views_completion_rate else 0
    }


def get_top_visitors(date_slots, locale_id, date_range='week', category_id=None, limit=5):
    """
    Function to get top visitors.

    Params:
        date_slots: Dictionary, contains current and previous start, end dates.
        locale_id: String, Languages.id
        date_range: String, ex:today, yesterday, week, month, year.
        category_id: Integer, Section id.
        Fetching the top five visitors based on chapter views.
        Following are the details of visitors we are fetching.
        Id, Fullname, Group, count of Chapter Viewed by a visitor.
        Most visited chapter, completion rate.
    """
    tenant_id = current_app.tenant_id

    top_viewers = VisitActivity.query.join(
        UserActivity).join(
        User).join(
        UserGroupMappings, UserGroupMappings.user_id == User.id).join(
        UserGroup, UserGroup.id == UserGroupMappings.group_id).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        User.role_id != 1,
        UserGroup.role_id != 1,
        User.id == UserActivity.user_id,
        VisitActivity.walkthrough_id.isnot(None),
        VisitActivity.locale_served_code == locale_id,
        VisitActivity.created_at.between(
            date_slots['cur_start_date'], date_slots['cur_end_date']))

    if category_id:
        top_viewers = top_viewers.filter(
            WalkthroughActivity.product_id == category_id
        )

    top_viewers = top_viewers.with_entities(
        func.count(VisitActivity.id).label('chapter_views'),
        User).group_by(
        User.id).order_by(desc('chapter_views')).limit(limit).all()

    top_visitors = []
    for visitor in top_viewers:
        visitor_details = {}
        user = visitor.User
        visitor_details['user_id'] = user.id
        visitor_details['initials'] = user.initials
        visitor_details['groups'] = user.user_group_slugs()
        visitor_details['fullname'] = user.fullname
        visitor_details['email'] = user.email
        visitor_details['profile_picture'] = user.picture_url
        visitor_details['date_added'] = user.created_at.isoformat()
        top_visitors.append(visitor_details)

    return top_visitors


def get_site_vs_views_data(start_date, end_date, tenant,
                           date_range='week', locale_id=None, category_id=None):
    """Function to get the graph data for site vs chapter views."""
    demo_views = []
    site_visitors = []
    slots = []
    user_id = None
    locale_id = locale_id if locale_id else tenant.default_locale_id

    date_slots = get_graph_slots(tenant, date_range, start_date, end_date)
    for _s in date_slots:
        views = calculate_chapter_views(
            _s['start_date'],
            _s['end_date'],
            locale_id,
            tenant,
            user_id,
            category_id,
        )
        demo_views.append(views)
        visitors = calculate_site_visitors(
            _s['start_date'],
            _s['end_date'],
            tenant
        )
        site_visitors.append(visitors)
        slots.append(_s['key'])
    return {
        'demo_views': demo_views,
        'site_visitors': site_visitors,
        'slots': slots
    }


def get_visitors_geography_data(start_date, end_date, tenant_id, category_id):
    # Get visitors geography information

    visitors_geography = VisitorsGeography.query.filter(
        VisitorsGeography.from_date.between(start_date, end_date),
        VisitorsGeography.tenant_id == tenant_id,
        VisitorsGeography.country.__ne__(u'None'),
        VisitorsGeography.country_iso_code.__ne__(u'None')
    )

    visitors_geography = visitors_geography.filter(
        VisitorsGeography.product.is_(None)
    )
    if category_id:
        section = Section.query.get(category_id)
        section_translation = get_translation(section)
        visitors_geography = visitors_geography.filter(
            VisitorsGeography.product == unicode(section_translation.name)
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


def get_social_shares(start_date, end_date, category_id, locale_id):
    tenant_id = current_app.tenant_id
    social_shares = SocialShare.query.filter(
        SocialShare.tenant_id == tenant_id,
        SocialShare.media_type.notin_([u'copyurl', u'copyembedurl']),
        SocialShare.created_at.between(start_date, end_date)
    )
    if category_id:
        social_shares = social_shares.join(
            Section, Section.id == SocialShare.product_id).join(
            SectionTranslations, SectionTranslations.section_id == Section.id).filter(
            SectionTranslations.language_id == locale_id,
            SectionTranslations.section_id == category_id
        )
    social_shares = social_shares.with_entities(
        SocialShare.media_type,
        func.count(SocialShare.media_type).label("count")
    ).group_by(
        SocialShare.media_type
    ).order_by(desc("count")).all()

    return social_shares


def parse_request_data(request):
        """Function to unfurl the request parameters and return data."""
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.join(TenantFlags).filter(Tenant.id == tenant_id).first()
        from_date = request.args.get('from_date')
        to_date = request.args.get('to_date')
        date_range = request.args.get('date_range', 'week')
        category_id = int(request.args.get('category_id', 0))
        locale_id = request.args.get('locale_id', tenant.default_locale_id)

        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)

        cur_start_date, cur_end_date, prev_start_date, prev_end_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )
        date_slots = {
            'cur_start_date': cur_start_date,
            'cur_end_date': cur_end_date,
            'prev_start_date': prev_start_date,
            'prev_end_date': prev_end_date
        }
        parsed_data = {
            'category_id': category_id,
            'date_range': date_range,
            'date_slots': date_slots,
            'locale_id': locale_id,
            'tenant': tenant

        }
        return parsed_data


class DashboardReportApi(Resource):

    @has_analyst_access
    def get(self):
        """Function to get the report based on date_range and locale_id requested."""
        report_data = {}

        request_data = parse_request_data(request)
        date_slots = request_data['date_slots']
        date_range = request_data['date_range']
        locale_id = request_data['locale_id']
        tenant = request_data['tenant']
        category_id = request_data['category_id']

        site_visit_data = get_site_visit_data(
            date_slots, tenant=tenant,
            category_id=category_id)

        chapter_views = get_chapter_views(
            date_slots, locale_id, tenant=tenant,
            category_id=category_id
        )

        completion_rate = get_completion_rate(
            date_slots, locale_id, tenant=tenant, category_id=category_id
        )

        trending_chapters = get_trending_chapters(
            date_slots, locale_id, category_id=category_id
        )
        trending_categories = get_trending_categories(
            date_slots, locale_id, category_id=category_id
        )
        referral_data = get_referral_data(
            date_slots['cur_start_date'],
            date_slots['cur_end_date'],
            tenant_id=tenant.id,
            category_id=category_id
        )
        site_vs_views = get_site_vs_views_data(
            date_slots['cur_start_date'],
            date_slots['cur_end_date'],
            tenant,
            category_id=category_id,
            date_range=date_range
        )
        visitors_geography = get_visitors_geography_data(
            date_slots['cur_start_date'],
            date_slots['cur_end_date'],
            tenant.id,
            category_id
        )
        visitors_geography = OrderedDict(
            sorted(visitors_geography.items(),
                   key=lambda k: k[1]['count'],
                   reverse=True)
        )

        if not tenant.flags.is_private:
            sources = get_social_shares(
                date_slots['cur_start_date'], date_slots['cur_end_date'],
                category_id, tenant.default_locale_id
            )
            total = sum(dict(sources).values())
            sources = [{"medium": medium, "count": count}
                       for medium, count in sources]
            report_data['social_shares'] = {
                "sources": sources,
                "total": total
            }

        if tenant.flags.is_private:
            top_visitors = get_top_visitors(
                date_slots, locale_id, date_range, category_id)
            report_data.update(viewers=top_visitors)

        report_data.update(
            site_visitors=site_visit_data,
            chapter_views=chapter_views,
            completion_rate=completion_rate,
            trending_chapters=trending_chapters,
            trending_categories=trending_categories,
            referrals=referral_data,
            site_vs_views=site_vs_views,
            geography=visitors_geography
        )
        return report_data


class ViewerDetailsApi(Resource):

    @has_analyst_access
    def get(self, viewer_id):
        """Fetch details of a viewer."""
        request_data = parse_request_data(request)
        user = User.query.filter(User.id == viewer_id).first_or_404()
        date_slots = request_data['date_slots']
        date_range = request_data['date_range']
        locale_id = request_data['locale_id']
        tenant = request_data['tenant']
        category_id = request_data['category_id']
        viewer_details = {
            'groups': user.user_group_slugs(),
            'initials': user.initials,
            'fullname': user.fullname,
            'email': user.email,
            'profile_picture': user.picture_url
        }
        if user.onboard_at:
            viewer_details['onboard_at'] = user.onboard_at.isoformat()
        viewer_details['chapter_views'] = get_chapter_views(
            date_slots, locale_id, tenant, viewer_id, category_id)
        viewer_details['most_visited_chapter'] = get_most_visited_chapter(
            date_slots['cur_start_date'], date_slots['cur_end_date'],
            viewer_id, locale_id)
        viewer_details['completion_rate'] = get_completion_rate(
            date_slots, locale_id, tenant, viewer_id)
        viewer_details['graph_data'] = get_visitor_graph_details(
            date_slots, locale_id, viewer_id, date_range)

        return viewer_details
