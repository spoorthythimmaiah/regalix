from collections import Counter, defaultdict
from datetime import datetime
from flask import current_app

from sqlalchemy import and_, func, desc
from sharedemos.models import (
    CompletionActivity,
    LeadsGenerated,
    SiteVisitors,
    Section,
    SectionTranslations,
    Playlist,
    SocialShare,
    Tenant,
    TopicActivity,
    User,
    UserActivity,
    UserGroup,
    UserGroupMappings,
    VisitActivity,
    VisitorsReferral,
    Walkthrough,
    WalkthroughActivity,
    WalkthroughTranslations
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.model import get_progress_difference


def get_completions(start_date, end_date, tenant_id, category=None):
    # Walkthrough Completions
    completion_activities = CompletionActivity.query.filter(
        (CompletionActivity.tenant_id == tenant_id) &
        (CompletionActivity.modified_at.between(start_date, end_date))
    )

    # filter activities based on selected category
    if category:
        completion_activities = completion_activities.filter(
            CompletionActivity.product_id == category.id
        )

    # started vs completed calculation
    completes = dict()
    completed = started = 0
    for activity in completion_activities:
        if activity.walkthrough_id not in completes:
            completes[activity.walkthrough_id] = {
                activity.report_user_id: False
            }

        if activity.entity_total <= activity.entity_complete:
            completes[activity.walkthrough_id][activity.report_user_id] = True
            started += 1
            completed += 1
        else:
            started += 1
            completes[activity.walkthrough_id][activity.report_user_id] = False

    # Average calculation
    averages = list()
    for wt_id, details in completes.items():
        total = len(details)
        finished = dict((user, status) for user, status in details.items()
                        if status is True)
        averages.append(len(finished) / (float(total) or 1))

    # Total completions vs total started
    average = completed / float(started or 1)

    return round(average, 2) * 100


def get_trending_demos(start_date, end_date, tenant_id, demo_list=[],
                       category=None, section=None, limit=10):

    # Get trending demos for given date

    visits = TopicActivity.query.filter(
        (TopicActivity.tenant_id == tenant_id) &
        (TopicActivity.from_date.between(start_date, end_date)) &
        (TopicActivity.walkthrough.isnot(None))
    )

    # Get all visits for a product, if selected, else get all visits for demos
    if category:
        visits = visits.filter(TopicActivity.product == category)
    # Get all visits for a section.
    if section:
        visits = visits.filter(TopicActivity.section == section)

    # filter results for selected demos
    if demo_list:
        demo_ids_list = [demo.walkthrough for demo in demo_list]
        visits = visits.filter(
            TopicActivity.walkthrough.in_(demo_ids_list)
        )

    # count and group walkthrough visits by walkthrough id
    base_query = visits.with_entities(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough,
        func.sum(TopicActivity.overall_visit_count).label('count')
    ).group_by(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough
    ).order_by(
        desc('count'),
        TopicActivity.walkthrough
    )
    visits = base_query.limit(limit).all() if limit else base_query.all()

    return visits


def get_guides_details(cur_trending_activities, prv_trending_activities,
                       tenant_id, end_date):
    """
    Get Top viewed guides(sections).

    Guide means Leaf sections containing playlist and chapters.
    Views of chapters is considered as views of a section.
    Ex: If views of two chapters of the section are 5 and 8 respectively then
        views of section is sum of 6 + 8 = 14.

    params:
        cur_trending_chapters &
        prv_trending_chapters    - List containing section, walkthrough,
                                   and walkthrough visits count
                                   entities of TopicActivity,
                                   with respect to time slots.
        tenant_id                - Integer.
    """
    cur_top_guides = [{'section': activity.section, 'views': activity.count}
                      for activity in cur_trending_activities]
    prv_top_guides = [{'section': activity.section, 'views': activity.count}
                      for activity in prv_trending_activities]

    """
    Taking chapters views as section view, append only
    section and count to current and previous top giudes list.
    Then sum the views of familiar section.
    Ex:
    cur_trending_chapters = [{'section':'s1', 'walkthrough':'ch1', 'count':10},
                             {'section':'s2', 'walkthrough':'ch2', 'count':10},
                             {'section':'s1', 'walkthrough':'ch3', 'count':10}]
    then cur_top_guides = [{'section':'s1', 'views':20},
                           {'section':'s2', 'views':10}]

    """

    cur_guides_dict = defaultdict(int)
    for guide in cur_top_guides:
        cur_guides_dict[guide['section']] += guide['views']

    cur_guides = [{'section': key, 'views': value}
                  for key, value in cur_guides_dict.items()]

    prv_guides_dict = defaultdict(int)
    for guide in prv_top_guides:
        prv_guides_dict[guide['section']] += guide['views']

    prv_guides = [{'section': key, 'views': value}
                  for key, value in prv_guides_dict.items()]

    prv_top_guides_views = {
        pd['section']: int(pd['views']) for pd in prv_guides
    }

    # Add progress_difference to the top_guides.
    for guide in cur_guides:
        guide.update(progress=get_progress_difference(
            guide['views'],
            prv_top_guides_views.get(guide['section'], 0)
        ))

    guides_details = {}
    guides = sorted(cur_guides, key=lambda x: x['views'])

    trending_guides = guides[-10:]
    trending_guides.reverse()
    guides_details['trending_guides'] = trending_guides

    # Get guides which are not in current_trending_activities.
    tenant = Tenant.query.get(tenant_id)
    sections_entities = Section.query.join(
        SectionTranslations).join(
        Playlist, Playlist.section_id == Section.id).join(
        Walkthrough, Walkthrough.playlist_id == Playlist.id).filter(
        Section.tenant_id == tenant_id,
        Section.created_at <= end_date,
        SectionTranslations.language_id == tenant.default_locale_id,
        Section.is_enabled.__eq__(True),
        Section.is_deleted.__eq__(False),
        Playlist.is_deleted.__eq__(False),
        Playlist.is_enabled.__eq__(True),
        Walkthrough.is_deleted.__eq__(False),
        Walkthrough.is_enabled.__eq__(True)
    ).with_entities(Section, SectionTranslations.name).all()

    active_guides = [activity.section for activity in cur_trending_activities]
    inactive_guides = []

    for section, section_name in sections_entities:
        if not section.is_available() or section_name in active_guides:
            continue
        inactive_guides.append(
            {'section': section_name,
             'views': 0,
             'progress': get_progress_difference(0, prv_top_guides_views.get(
                                                 section_name, 0)),
             'created_at': section.created_at
             }
        )

    inactive_guides = sorted(inactive_guides, key=lambda x: x['created_at'])

    # Get Least viewed guides which are not in trending guides list.
    least_viewed_guides = [guide for guide in guides[:10]
                           if guide not in trending_guides]

    guides_details['least_viewed_guides'] = (inactive_guides +
                                             least_viewed_guides)[:10]

    return guides_details


def get_time_on_demos(start_date, end_date, tenant_id, category=None):
    # Time spent on demos

    activities = WalkthroughActivity.query.filter(
        (WalkthroughActivity.tenant_id == tenant_id) &
        (WalkthroughActivity.created_at.between(start_date, end_date))
    )

    # filter activities based on selected category
    if category:
        activities = activities.filter(
            WalkthroughActivity.product_id == category.id)

    activities = activities.with_entities(
        func.sum(WalkthroughActivity.duration).label('total_time'),
    ).one()

    return activities.total_time or 0


def get_most_visited_chapter(start_date, end_date, user_id, category_id=None):
    """
    Function to get most visited chapter by user for the given duration.

    Params:
        user_id: Integer, User id.
        from_date, to_date: Datetime
    """
    tenant_id = current_app.tenant_id
    tenant = Tenant.query.get(tenant_id)

    most_visited_chapter = WalkthroughActivity.query.join(
        UserActivity).join(
        Walkthrough, WalkthroughActivity.walkthrough_id == Walkthrough.id).join(
        WalkthroughTranslations,
        and_(WalkthroughTranslations.walkthrough_id == Walkthrough.id,
             WalkthroughTranslations.language_id.__eq__(tenant.default_locale_id))).join(
        User, UserActivity.user_id == User.id).filter(
        WalkthroughActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        User.role_id != 1,
        User.id == user_id,
        WalkthroughActivity.walkthrough_id.isnot(None),
        WalkthroughActivity.created_at.between(start_date, end_date),
    )
    if category_id != 'all':
        most_visited_chapter = most_visited_chapter.filter(
            WalkthroughActivity.product_id == category_id
        )

    most_visited_chapter = most_visited_chapter.with_entities(
        func.count(WalkthroughActivity.walkthrough_id),
        (WalkthroughTranslations.name).label('chapter_name')).group_by(
        WalkthroughTranslations.name).order_by(desc(
            func.count(WalkthroughActivity.walkthrough_id))).first()

    return most_visited_chapter.chapter_name if most_visited_chapter else None


def get_top_visitors(start_date, end_date, category_id=None, page=1, group_ids=None, limit=20):
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
    tenant = Tenant.query.get(tenant_id)
    user = User.query.with_entities(User).filter(
        User.tenant_id == tenant_id,
        User.role_id == 4
    )
    viewers = VisitActivity.query.join(
        UserActivity).join(User).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        VisitActivity.walkthrough_id.isnot(None),
        User.role_id != 1,
        VisitActivity.created_at.between(start_date, end_date))

    if tenant.user_groups:
        user = user.join(
            UserGroupMappings, UserGroupMappings.user_id == User.id).join(
            UserGroup, UserGroup.id == UserGroupMappings.group_id).filter(
            UserGroup.role_id != 1)

        viewers = viewers.join(
            UserGroupMappings, UserGroupMappings.user_id == User.id).join(
            UserGroup, UserGroup.id == UserGroupMappings.group_id).filter(
            UserGroup.role_id != 1)

        if group_ids:
            viewers = viewers.filter(UserGroup.id.in_(group_ids))

    if category_id != 'all':
        product = Section.query.join(SectionTranslations).filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_deleted.__eq__(False)) &
            (SectionTranslations.language_id == tenant.default_locale_id) &
            (SectionTranslations.name == category_id)
        ).first()
        if not product:
            raise SharedemosException(500, message='No Product Found')

        viewers = viewers.filter(
            VisitActivity.product_id == product.id
        )

    all_viewers = viewers.all()
    viewers_dict = {}
    for viewer in all_viewers:
        if viewer.user_activity.user.id not in viewers_dict:
            viewers_dict[viewer.user_activity.user.id] = 1
        else:
            viewers_dict[viewer.user_activity.user.id] += 1

    all_users = user.all()
    users_dict = {}
    for user in all_users:
        user_id = user.id
        users_dict[user_id] = {}
        users_dict[user_id]['user_id'] = user_id
        users_dict[user_id]['fullname'] = user.fullname
        users_dict[user_id]['initials'] = user.initials
        if user.groups:
            users_dict[user_id]['groups'] = user.user_group_slugs()
        users_dict[user_id]['email'] = user.email
        users_dict[user_id]['profile_picture'] = user.picture_url
        users_dict[user_id]['date_added'] = user.created_at.isoformat()

    # For the first time, we are sending records required for the first four pages.
    # In one page, 20 records should show.So send 4*20=80 records
    # If avilable records are lessthan 80, send all avilable records ex:35
    # start_index depends on the page number
        # ex: if page=1, (1-1)*20 = 0
        # if page=6 (5-1)*20 = 80
    # end_index  should be 80 records more from the start_index

    start_index = ((page - 1) * limit)
    end_index = (page + 3) * limit
    top_viewers = sorted(
        viewers_dict, key=viewers_dict.get, reverse=True)[start_index:end_index]

    top_visitors = []
    for viewer in top_viewers:
        user_detail = users_dict[viewer]
        top_visitors.append(user_detail)

    top_visitors_details = {
        'pagination_details': {
            'total_viewers': len(viewers_dict),
            'start_page': page,
        },
        'viewers': top_visitors,
    }
    return top_visitors_details


def get_views(start_date, end_date, tenant_id, category=None):
    # Walkthrough Views
    visits = VisitActivity.query.filter(
        (VisitActivity.tenant_id == tenant_id) &
        (VisitActivity.created_at.between(start_date, end_date)) &
        (VisitActivity.walkthrough_id.isnot(None))
    )

    if category:
        visits = visits.filter(VisitActivity.product_id == category.id)

    revisits = dict()
    revisit_count = 0

    # Get total views and revisits
    total_views = visits.count()
    for visit in visits:
        if visit.report_user_id not in revisits:
            revisits[visit.report_user_id] = list()

        if visit.walkthrough_id in revisits[visit.report_user_id]:
            revisit_count += 1
        else:
            revisits[visit.report_user_id].append(visit.walkthrough_id)

    return {
        "total": total_views,
        "revisits": revisit_count
    }


def get_visitors_data(start_date, end_date, tenant_id, demo_ids_list=None,
                      category=None):
    """Get site visitors and sign up count for given date and category."""
    visitors = SiteVisitors.query.filter(
        (SiteVisitors.from_date.between(start_date, end_date)) &
        (SiteVisitors.tenant_id == tenant_id)
    )
    leads_generated = LeadsGenerated.query.filter(
        (LeadsGenerated.from_date.between(start_date, end_date)) &
        (LeadsGenerated.tenant_id == tenant_id)
    )
    if category == 'all':
        visitors = visitors.filter(SiteVisitors.product.is_(None))
        leads_generated = leads_generated.with_entities(
            func.sum(LeadsGenerated.leads_count).label('leads_count'),
            (LeadsGenerated.product).label('section_name')
        ).group_by('section_name')
    else:
        visitors = visitors.filter(SiteVisitors.product.__eq__(category))
        leads_generated = leads_generated.filter(
            LeadsGenerated.product == category
        ).with_entities(
            func.sum(LeadsGenerated.leads_count).label('leads_count'),
            (LeadsGenerated.section).label('section_name')
        ).group_by('section_name')

    visitors = visitors.with_entities(
        func.sum(
            SiteVisitors.site_visitors_count
        ).label("site_visitors_count"),
    ).first()

    visitors_count = visitors.site_visitors_count or 0 if visitors else 0
    user_signups = sum([lg.leads_count for lg in leads_generated.all()])

    return {
        'visitors': int(visitors_count),
        'signups': int(user_signups)
    }


def get_visitors_referral_data(start_date, end_date, tenant_id, category):
    visitors_referral = VisitorsReferral.query.filter(
        (VisitorsReferral.tenant_id == tenant_id) &
        (VisitorsReferral.from_date.between(start_date, end_date))
    )

    if category == 'all':
        visitors_referral = visitors_referral.filter(
            VisitorsReferral.product.is_(None)
        )
    else:
        visitors_referral = visitors_referral.filter(
            VisitorsReferral.product == category
        )

    # Get top 10 referrals & group remaining referrals under `others` category
    visitors_referral = visitors_referral.with_entities(
        VisitorsReferral.source,
        func.sum(
            VisitorsReferral.visitors_count
        ).label('visitors_count')
    ).group_by(
        VisitorsReferral.source
    ).having(
        func.sum(VisitorsReferral.visitors_count) > 0
    ).order_by(
        func.sum(
            VisitorsReferral.visitors_count
        ).label('visitors_count').desc()
    )

    visitors_referral_data = list()
    others = {'name': 'others', 'count': 0}
    for idx, vr in enumerate(visitors_referral.limit(10).all()):
        if idx < 10:
            source = vr.source
            if source == 'direct':
                source = source.capitalize()

            visitors_referral_data.append({
                'name': source,
                'count': int(vr.visitors_count)
            })
        else:
            others['count'] += int(vr.visitors_count)

    if others['count']:
        others['count'] = others['count']
        visitors_referral_data.append(others)

    return visitors_referral_data


def get_social_shares(start_date, end_date, category, locale_id):
    tenant_id = getattr(current_app, 'tenant_id', None)
    social_shares = SocialShare.query.filter(
        SocialShare.tenant_id == tenant_id,
        SocialShare.media_type.notin_([u'copyurl', u'copyembedurl']),
        SocialShare.created_at.between(start_date, end_date)
    )
    if category != 'all':
        social_shares = social_shares.join(
            SectionTranslations,
            SectionTranslations.section_id == SocialShare.product_id,
        ).filter(
            SectionTranslations.language_id == locale_id,
            SectionTranslations.name == category
        )
    social_shares = social_shares.with_entities(
        SocialShare.media_type,
        func.count(SocialShare.media_type).label("count")
    ).group_by(
        SocialShare.media_type
    ).order_by("count DESC").all()
    return social_shares


def get_vistors_and_views(start_date, end_date, tenant_id, category=None):
    # Demo views
    demo_views = VisitActivity.query.join(UserActivity).filter(
        (UserActivity.browser != 'BOT') &
        (UserActivity.browser != 'None') &
        (VisitActivity.tenant_id == tenant_id) &
        (VisitActivity.created_at.between(start_date, end_date)) &
        (VisitActivity.walkthrough_id.isnot(None))
    )

    # filter activities based on selected category
    if category:
        demo_views = demo_views.filter(VisitActivity.product_id == category.id)
        new_users = UserActivity.query.join(VisitActivity).filter(
            (UserActivity.tenant_id == tenant_id) &
            (UserActivity.browser != 'BOT') &
            (UserActivity.browser != 'None') &
            (UserActivity.created_at.between(start_date, end_date)) &
            (VisitActivity.product_id == category.id)
        ).group_by(UserActivity.id)

    else:
        # Get all users registered in the given time
        new_users = UserActivity.query.filter(
            (UserActivity.tenant_id == tenant_id) &
            (UserActivity.browser != 'BOT') &
            (UserActivity.browser != 'None') &
            (UserActivity.created_at.between(start_date, end_date))
        )

    return dict(new_users=new_users.count(), demo_views=demo_views.count())


def get_views_and_completion_rate(start_date, end_date, tenant_id,
                                  demo_ids_list=None, category=None):
    """Get demo views and completion rate for given date and category."""
    topic_activity = TopicActivity.query.filter(
        (TopicActivity.from_date.between(start_date, end_date)) &
        (TopicActivity.walkthrough.isnot(None)) &
        (TopicActivity.tenant_id == tenant_id)
    )
    if category != 'all':
        topic_activity = topic_activity.filter(
            TopicActivity.product.__eq__(category))

    topic_activity = topic_activity.with_entities(
        func.sum(
            TopicActivity.overall_visit_count).label("overall_visit_count"),
        func.avg(TopicActivity.completion_rate).label("completion_rate"),
    ).first()

    demo_views = 0
    completion_rate = 0
    if topic_activity:
        demo_views = topic_activity.overall_visit_count or 0
        completion_rate = round(topic_activity.completion_rate or 0, 2)

    return {
        'views': int(demo_views),
        'completion_rate': completion_rate
    }


def calculate_chapter_views(start_date, end_date, tenant,
                            user_id, category_id=None):
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
        UserActivity).join(User).filter(
        VisitActivity.tenant_id == tenant.id,
        UserActivity.tenant_id == tenant.id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.walkthrough_id.isnot(None),
        User.role_id != 1,
        User.id == user_id,
        VisitActivity.created_at.between(start_date, end_date)
    )
    if tenant.flags.is_private and tenant.user_groups:
        views = views.join(UserGroupMappings).join(
            UserGroup).filter(
            UserGroup.role_id != 1,
        )
    if category_id != 'all':
        views = views.filter(VisitActivity.product_id == category_id)

    chapter_views = views.with_entities(VisitActivity.walkthrough_id).count()
    return chapter_views


def get_chapter_views(date_slots, tenant, user_id,
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
        tenant, user_id, category_id)

    prev_chapter_views = calculate_chapter_views(
        date_slots['prev_start_date'],
        date_slots['prev_end_date'],
        tenant, user_id, category_id)

    return {
        "count": cur_chapter_views,
        "progress": get_progress_difference(cur_chapter_views,
                                            prev_chapter_views)
    }


def get_best_demoviews(start_date, end_date, tenant_id, category=None):
    """Get highest demo view Number and date in the given timespan."""
    topic_activity = TopicActivity.query.filter(
        (TopicActivity.from_date.between(start_date, end_date)) &
        (TopicActivity.walkthrough.isnot(None)) &
        (TopicActivity.tenant_id == tenant_id)
    )
    if category != 'all':
        topic_activity = topic_activity.filter(
            TopicActivity.product.__eq__(category))

    all_records = topic_activity.all()
    all_day_views = {}
    best_views = {}
    for record in all_records:
        if not all_day_views.get(str(record.from_date.date())):
            all_day_views[str(record.from_date.date())] = record.overall_visit_count
        else:
            all_day_views[str(record.from_date.date())] += record.overall_visit_count
    if all_day_views:
        max_views_date = max(all_day_views, key=all_day_views.get)
        max_views = all_day_views[max_views_date]
        best_views['max_views'] = max_views
        best_views['max_views_date'] = datetime.strptime(max_views_date, '%Y-%m-%d')
    return best_views


def get_chapter_analytics(start_date, end_date, category=None):
    """Get demo views and completion rate for given date and category."""
    tenant_id = getattr(current_app, 'tenant_id', None)

    topic_activity = TopicActivity.query.filter(
        (TopicActivity.from_date.between(start_date, end_date)) &
        (TopicActivity.walkthrough.isnot(None)) &
        (TopicActivity.tenant_id == tenant_id)
    )
    if category != 'all':
        topic_activity = topic_activity.filter(
            TopicActivity.product.__eq__(category))

    topic_activity = topic_activity.with_entities(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough,
        func.sum(TopicActivity.overall_visit_count).label(
            "overall_visit_count"),
        func.avg(TopicActivity.completion_rate).label("completion_rate"),
    ).group_by(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough
    ).order_by(
        desc('overall_visit_count'),
        desc('completion_rate')
    ).limit(50).all()

    return topic_activity


def get_site_visitors(start_date, end_date, product_id, tenant_id):

    visitors = VisitActivity.query.join(
        UserActivity).join(User).join(
        UserGroupMappings).join(UserGroup).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        User.role_id != 1,
        UserGroup.role_id != 1,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        UserActivity.created_at.between(start_date, end_date),
        VisitActivity.created_at.between(start_date, end_date)
    )

    if product_id:
        visitors = visitors.filter(VisitActivity.product_id == product_id)

    return visitors


def get_demo_views(start_date, end_date, product_id, tenant_id):

    views = VisitActivity.query.join(
        UserActivity).join(User).join(
        UserGroupMappings).join(UserGroup).filter(
        UserActivity.browser != u'BOT',
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.tenant_id == tenant_id,
        User.role_id != 1,
        UserGroup.role_id != 1,
        VisitActivity.created_at.between(start_date, end_date),
        VisitActivity.walkthrough_id.isnot(None)
    )

    if product_id:
        views = views.filter(
            VisitActivity.product_id == product_id
        )

    return views


def calculate_completion_rate(start_date, end_date, tenant,
                              user_id, category_id=None):
    """
    Function to calculate the completion rate.

    Params:
        start_date, end_date: Datetime Object.
        locale_id: String, Languages model id.
        user_id: Integer, User model id.
        category_id: Interger, Section model id.
    """
    query = CompletionActivity.query.join(
        UserActivity).join(User).filter(
        CompletionActivity.tenant_id == tenant.id,
        UserActivity.tenant_id == tenant.id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        User.role_id != 1,
        User.id == user_id,
        CompletionActivity.modified_at.between(
            start_date, end_date),
    )
    if category_id != 'all':
        query = query.filter(
            CompletionActivity.product_id == category_id
        )
    if tenant.user_groups:
        query = query.join(UserGroupMappings).join(
            UserGroup).filter(
            UserGroup.role_id != 1,
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


def get_viewer_completion_rate(date_slots, tenant, user_id, category_id=None):
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
        tenant,
        user_id,
        category_id
    )
    prev_completion_rate = calculate_completion_rate(
        date_slots['prev_start_date'],
        date_slots['prev_end_date'],
        tenant,
        user_id,
        category_id
    )

    return{
        'percentage': cur_completion_rate,
        'progress': get_progress_difference(cur_completion_rate,
                                            prev_completion_rate)
    }


def get_chapter_completion_rate(start_date, end_date, user_id,
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
    tenant = Tenant.query.get(tenant_id)

    chapters = CompletionActivity.query.join(
        UserActivity).join(User).join(
        Walkthrough, Walkthrough.id == CompletionActivity.walkthrough_id).join(
        WalkthroughTranslations,
        and_(WalkthroughTranslations.walkthrough_id == Walkthrough.id,
             WalkthroughTranslations.language_id == tenant.default_locale_id)).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        User.role_id != 1,
        User.id == user_id,
        CompletionActivity.modified_at.between(start_date, end_date))

    if tenant.user_groups:
        chapters = chapters.join(
            UserGroupMappings).join(
            UserGroup).filter(
            UserGroup.role_id != 1)

    if category_id != 'all':
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


def get_completion_rate(start_date, end_date, product_id, tenant_id):

    total_completion_rate = CompletionActivity.query.join(
        UserActivity).join(User).join(
        UserGroupMappings).join(UserGroup).filter(
        CompletionActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        User.role_id != 1,
        UserGroup.role_id != 1,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        CompletionActivity.modified_at.between(start_date, end_date)
    )
    if product_id:
        total_completion_rate = total_completion_rate.filter(
            CompletionActivity.product_id == product_id
        )

    return total_completion_rate


def get_popular_demos(start_date, end_date, tenant_id,
                      product_id, user_group=None, common_group=None):

    views = VisitActivity.query.join(UserActivity).join(
        User).join(
        UserGroupMappings).join(UserGroup).filter(
        VisitActivity.tenant_id == tenant_id,
        UserActivity.tenant_id == tenant_id,
        UserActivity.browser.isnot(None),
        UserActivity.ip_address.isnot(None),
        UserActivity.browser != u"BOT",
        UserActivity.version != u"BOT",
        UserActivity.platform != u"BOT",
        VisitActivity.walkthrough_id.isnot(None),
        User.id == UserActivity.user_id,
        VisitActivity.created_at.between(start_date, end_date)
    )

    if user_group:
        views = views.filter(UserGroup.slug == user_group)
    if product_id:
        views = views.filter(VisitActivity.product_id == product_id)

    if common_group:
        views = Counter([view.walkthrough_id for view in views.all()
                         if len(view.user_activity.user.groups) > 1])
    else:
        views = Counter([view.walkthrough_id for view in views.all()
                         if len(view.user_activity.user.groups) == 1])
    return views


def get_popular_demos_details(cur_popular_demos, prv_popular_demos, tenant_id):

    demos_id_list = cur_popular_demos.keys()
    demos = []
    if demos_id_list:
        demos = Walkthrough.query.filter(
            Walkthrough.id.in_(demos_id_list),
            Walkthrough.tenant_id == tenant_id,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True)
        ).all()
    trending_demos = list()

    for _demo in demos:
        progress = get_progress_difference(
            cur_popular_demos.get(_demo.id, 0), prv_popular_demos.get(
                _demo.id, 0))

        _section = _demo.playlist.section
        _product = _section.get_category()
        breadcrumb = "{} > {}".format(_section, _demo)
        if _product.id != _section.id:
            breadcrumb = "{} > {}".format(_product, breadcrumb)

        trending_demos.append({
            'walkthrough': _demo,
            'views': cur_popular_demos.get(_demo.id, 0),
            'breadcrumb': breadcrumb,
            'progress': progress
        })

    popular_demos_details = sorted(
        trending_demos,
        key=lambda x: x['views'],
        reverse=True
    )[:5]

    return popular_demos_details
