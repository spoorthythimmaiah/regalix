import os
from datetime import datetime
from math import ceil
import urllib
from flask import (
    g,
    Blueprint,
    abort,
    current_app,
    render_template,
    redirect,
    request,
    send_file,
    session,
    url_for
)
from flask.ext.login import current_user
import pytz
import requests
from sqlalchemy import func, asc, desc, distinct
from sharedemos.models import (
    ActivityFeed,
    Application,
    db,
    DraftJourney,
    Leads,
    LeadsGenerated,
    Option,
    Path,
    PathFinderActivity,
    Question,
    SearchActivity,
    Section,
    SectionTranslations,
    SlugRevision,
    Suggestion,
    Tenant,
    TenantTheme,
    TopicActivity,
    User,
    UserActivity,
    VisitActivity,
)
from sharedemos.libs.helpers import (
    CSVWriter,
    get_default_translation,
    get_translation,
    log_last_activity,
    namegen_filename,
    remove_pdf
)
from sharedemos.libs.forms import TenantForm
from sharedemos.libs.model import (
    admin_permission,
    author_permission,
    analyst_permission,
    get_time_bounds,
    get_progress_difference
)
from sharedemos.libs.decorators import (
    app_subscription_required,
    login_required
)
from sharedemos.libs.utils import get_tenant_api

dashboard = Blueprint('dashboard', __name__)

ACTION_LIST = [
    'created', 'deleted', 'denied', 'disabled',
    'edited', 'enabled', 'granted', 'hidden',
    'published', 'removed', 'reordered', 'shown'
]
ALLOWED_AUDIO_FORMATS = ['mp3', 'webm', 'ogg']
ALLOWED_DOC_FORMATS = ['pdf']
ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
ALLOWED_VIDEO_FORMATS = ['mp4']


def change_products_privacy(tenant, is_private):

    Section.query.filter(
        (Section.tenant_id == tenant.id) &
        (Section.is_deleted.__eq__(False)) &
        (Section.parent_id.is_(None))
    ).update({
        Section.is_private: is_private
    })

    # Clear all_products, trending-recent and specific section cache.
    from sharedemos.tasks import delete_api_cache_data, update_algolia_content
    delete_api_cache_data.delay({
        'delete_pattern': True,
        'entity': 'section',
        'clear_all_products': True,
        'tenant_id': tenant.id
    })

    update_algolia_content.delay({
        'entity': 'tenant',
        'action': 'PRIVACY_UPDATE',
        'tenant_id': tenant.id,
        'is_public': not(is_private)
    })


def get_leads_report(start_date, end_date, tenant_id, category):
    leads_generated = LeadsGenerated.query.filter(
        (LeadsGenerated.from_date.between(start_date, end_date)) &
        (LeadsGenerated.tenant_id == tenant_id)
    )

    if category != 'all':
        leads_generated = leads_generated.filter(
            LeadsGenerated.product == category
        ).with_entities(
            func.sum(LeadsGenerated.leads_count).label('leads_count'),
            (LeadsGenerated.section).label('section_name')
        )
    else:
        leads_generated = leads_generated.with_entities(
            func.sum(LeadsGenerated.leads_count).label('leads_count'),
            (LeadsGenerated.product).label('section_name')
        )

    leads_generated = leads_generated.group_by('section_name').order_by(
        desc('leads_count')).all()

    leads_generated = [{
        'name': lead.section_name.encode('utf8'),
        'value': int(lead.leads_count)
    } for lead in leads_generated]

    return leads_generated


def get_categories_to_filter(default_locale_id, with_slug=False):
    """Get actual categories detail for dropdown/filtering."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    categories = Section.query.join(
        SectionTranslations
    ).filter(
        SectionTranslations.language_id == default_locale_id,
        Section.tenant_id == tenant_id,
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True),
        Section.is_hidden.__eq__(False),
        Section.parent_id.is_(None)
    ).with_entities(
        Section.id,
        Section.slug,
        SectionTranslations.name
    ).order_by(Section.order).all()
    categories_list = [{
        'id': category.id,
        'name': category.name,
        'slug': unicode(category.slug) if with_slug else category.name
    } for category in categories]

    return categories_list


def get_collaborators():
    tenant_id = getattr(current_app, 'tenant_id', None)
    activities_list = ActivityFeed.query.\
        join(User, ActivityFeed.primary_user_id == User.id).\
        filter(ActivityFeed.tenant_id == tenant_id,
               User.id != g.user.id,
               User.is_deleted.__eq__(False)).\
        distinct(ActivityFeed.primary_user_id).\
        order_by(
            ActivityFeed.primary_user_id, ActivityFeed.created_at.desc()
        ).limit(5).all()
    return [activity.primary_user for activity in activities_list]


def get_box_entries(access_token, folder_id='0', tree=dict()):
    """Get and format data from Box app post authorization."""
    url = current_app.config['BOX_FOLDER_API_URL'] % (str(folder_id))
    folders_request = requests.get(url, headers={
        'Authorization': 'Bearer ' + access_token})

    if folders_request.status_code == 200 and\
            (folders_request.json()['shared_link'] or folder_id == '0'):

        if folder_id not in tree:
            tree[folder_id] = dict()

        for entry in folders_request.json()['item_collection']['entries']:
            if not entry['shared_link']:
                continue

            if entry['type'] == 'folder':
                if 'folders' not in tree[folder_id]:
                    tree[folder_id]['folders'] = dict()
                tree[folder_id]['folders'][entry['id']] = {
                    'name': entry['name'],
                    'description': entry['description'],
                }

                get_box_entries(access_token, folder_id=entry['id'],
                                tree=tree[folder_id]['folders'])
            elif entry['type'] == 'file' and entry['shared_link']:
                # Check browser supportive files
                file_ext = entry['name'].split('.')[-1] or ''
                if file_ext.lower() not in (
                        ALLOWED_AUDIO_FORMATS + ALLOWED_DOC_FORMATS +
                        ALLOWED_IMAGE_FORMATS + ALLOWED_VIDEO_FORMATS):
                    continue

                if 'files' not in tree[folder_id]:
                    tree[folder_id]['files'] = dict()

                tree[folder_id]['files'][entry['id']] = {
                    'name': entry['name'],
                    'url': entry['shared_link']['url']
                }
            elif entry['type'] == 'web_link' and entry['shared_link']:
                if 'web_links' not in tree[folder_id]:
                    tree[folder_id]['web_links'] = dict()

                tree[folder_id]['web_links'][entry['id']] = {
                    'name': entry['name'],
                    'url': entry['shared_link']['url']
                }

    return tree


def get_searches_data(cur_start_date, cur_end_date, search_index_list):
    """Query Search activity."""
    """ return top-searched results,
        and searches with zero results.
        Results are ordered w.r.t 'count'.
    """

    top_searches_ = []
    zero_search_results_ = []

    for search_index in search_index_list:
        search_activities = SearchActivity.query.filter(
            SearchActivity.search_index_id == search_index.id,
            SearchActivity.from_date.between(cur_start_date, cur_end_date)
        ).all()

        for result in search_activities:
            top_searches_.append({'word': result.word, 'count': result.count})
            if result.avg_hit_count == 0:
                zero_search_results_.append({'word': result.word,
                                             'count': result.count})

    top_searches = sorted(top_searches_,
                          key=lambda top_search: top_search['count'],
                          reverse=True)
    zero_search_results = sorted(zero_search_results_,
                                 key=lambda zero_search: zero_search['count'],
                                 reverse=True)
    return top_searches, zero_search_results


def write_leads_to_csv(leads):
    """Write Leads information to CSV File before download."""
    today = datetime.today()
    filename = os.path.join(current_app.config['MEDIA_FOLDER'],
                            "leads_" +
                            datetime.strftime(today, '%b_%d') + '.csv')
    with open(filename, 'w') as csvfile:
        writer = CSVWriter(file_object=csvfile)
        header = ['Date Time', 'Name', 'Email', 'Company', 'Designation',
                  'Tenant', 'Category', 'Section', 'Walkthrough']
        writer.writerow(header)

        for lead in leads:
            product_translation = get_default_translation(lead.product)
            writer.writerow([
                unicode(lead.created_at),
                unicode(lead.user_data.get('Name', '') or
                        lead.user_data.get('name', '') or
                        lead.user_data.get('NAME', '')),
                unicode(lead.user_data.get('Email', '') or
                        lead.user_data.get('email', '') or
                        lead.user_data.get('EMAIL', '')),
                unicode(lead.user_data.get('Company', '') or
                        lead.user_data.get('company', '') or
                        lead.user_data.get('COMPANY', '')),
                unicode(lead.user_data.get('Designation', '') or
                        lead.user_data.get('designation', '') or
                        lead.user_data.get('DESIGNATION', '')),
                lead.tenant.name,
                product_translation.name,
                unicode(lead.section) if lead.section else '',
                unicode(lead.walkthrough) if lead.walkthrough else '',
            ])
    return filename


def get_tenant_apps(tenant_apps):
    """
    Return a list containing all apps.

    The list includes both enabled and
    disabled entities in sorted order.
    params:
        tenant_apps - List containing sqlalchemy Application objects.
    """
    apps_excluded_list = [u'sandbox', u'sample_exchange']
    applications = Application.query.filter(
        Application.unique_id.notin_(apps_excluded_list)).all()

    tenant_apps = [
        app for app in tenant_apps
        if app.unique_id not in apps_excluded_list
    ]

    enabled_apps = []
    for app in tenant_apps:
        if app.is_enabled:
            # Tenant subscribed apps which are enabled are appended to a list,
            # the same app is removed from all application list.
            enabled_apps.append({'id': app.unique_id, 'is_enabled': True})
            applications.remove(app)

    # Combining sorted lists of enabled and disabled apps.
    return (
        sorted(
            enabled_apps,
            key=lambda i: i.get('id')
        ) +
        sorted(
            [{'id': app.unique_id, 'is_enabled': False}
                for app in applications],
            key=lambda i: i.get('id')
        )
    )


def write_demo_report_to_csv(demos):
    """Write results to CSV file."""
    """
        demo visits, completion rate and avg frames completed
    """

    today = datetime.today()
    filename = os.path.join(current_app.config['MEDIA_FOLDER'],
                            "demo_report_" +
                            datetime.strftime(today, '%b_%d') + '.csv')
    with open(filename, 'w') as csvfile:
        writer = CSVWriter(file_object=csvfile)
        header = ['Demo', 'Category', 'Total Views', 'Completion Rate',
                  'Avg. Frames completed']
        writer.writerow(header)

        for demo in demos:
            writer.writerow([
                unicode(demo.walkthrough),
                unicode(demo.section),
                unicode(demo.visit_count),
                unicode(round(demo.completion_rate, 2)) + '%',
                unicode(demo.average_frames_completed) +
                ' out of ' + unicode(demo.total_slides_count),
            ])
    return filename


def write_viewer_report_to_csv(viewer_details):
    """Write demo visits and visit counts to csv file."""
    today = datetime.today()
    filename = os.path.join(current_app.config['MEDIA_FOLDER'],
                            "viewer_report_" +
                            datetime.strftime(today, '%b_%d') + '.csv')
    with open(filename, 'w') as csvfile:
        writer = CSVWriter(file_object=csvfile)
        header = ['Full Name', 'Email', 'Total Visits', 'Total Views']
        writer.writerow(header)

        for viewer_detail in viewer_details:
            writer.writerow([
                unicode(viewer_detail.first_name + ' ' +
                        viewer_detail.last_name),
                unicode(viewer_detail.email),
                unicode(viewer_detail.visits),
                unicode(viewer_detail.demo_views)
            ])
    return filename


def get_pathfinder_report(start_date, end_date, path_id=None):
    tenant_id = getattr(current_app, 'tenant_id', None)

    path_activities = PathFinderActivity.query.filter(
        (PathFinderActivity.tenant_id == tenant_id) &
        (PathFinderActivity.created_at.between(start_date, end_date)))

    start_events = path_activities.filter(
        PathFinderActivity.event_type == u'StartEvent')
    goal_events = path_activities.filter(
        PathFinderActivity.event_type == u'GoalEvent')

    # paths started
    starts_count = start_events.with_entities(
        PathFinderActivity.event_type,
        PathFinderActivity.report_user_id
    ).group_by(
        PathFinderActivity.event_type,
        PathFinderActivity.report_user_id
    ).count()

    # paths completed
    goals_count = goal_events.with_entities(
        PathFinderActivity.event_type,
        PathFinderActivity.report_user_id
    ).group_by(
        PathFinderActivity.event_type,
        PathFinderActivity.report_user_id
    ).count()

    goal_events_query = goal_events.with_entities(
        PathFinderActivity.option_id,
        PathFinderActivity.report_user_id
    ).group_by(
        PathFinderActivity.option_id,
        PathFinderActivity.report_user_id
    ).all()

    option_ids = [event.option_id for event in goal_events_query]

    suggestions = Suggestion.query.filter(
        Suggestion.is_deleted.__eq__(False),
        Suggestion.option_id.in_(option_ids)
    ).with_entities(
        Suggestion.option_id,
        func.count(Suggestion.id)
    ).group_by(Suggestion.option_id).all() if option_ids else []

    option_suggestions = dict(suggestions)

    results_suggested = sum([
        option_suggestions.get(ele, 0) for ele in option_ids])

    # completion rate
    completion_rate = round(((
        float(goals_count) / starts_count
    ) * 100), 2) if starts_count else 0

    return {
        'starts': starts_count,
        'goals': goals_count,
        'completion_rate': completion_rate,
        'results_suggested': results_suggested,
    }


def path_completion_rate_between_dates(path, st_date, end_date):
    starts = PathFinderActivity.query.filter(
        (PathFinderActivity.tenant_id == path.tenant_id) &
        (PathFinderActivity.path_id == path.id) &
        (PathFinderActivity.created_at.between(st_date, end_date)) &
        (PathFinderActivity.event_type == u'StartEvent')
    ).with_entities(
        PathFinderActivity.path_id,
        func.count(
            func.distinct(
                PathFinderActivity.report_user_id)).label('clicks')
    ).group_by(
        PathFinderActivity.path_id
    ).first()

    goals = PathFinderActivity.query.filter(
        (PathFinderActivity.tenant_id == path.tenant_id) &
        (PathFinderActivity.path_id == path.id) &
        (PathFinderActivity.created_at.between(st_date, end_date)) &
        (PathFinderActivity.event_type == u'GoalEvent')
    ).with_entities(
        func.count(
            func.distinct(
                PathFinderActivity.report_user_id)).label('clicks')
    ).group_by(
        PathFinderActivity.path_id
    ).first()

    if not goals:
        return 0

    return round(goals.clicks / float((starts.clicks or 1)) * 100, 2)


def get_most_traversed_path(paths, st_date, end_date, filter_path=None,
                            opt_clicks_data=None, most_traversed=None):
    if not most_traversed:
        most_traversed = []
    if not opt_clicks_data:
        opt_clicks_data = {}
        tenant_id = getattr(current_app, 'tenant_id', None)
        activities = PathFinderActivity.query.filter(
            (PathFinderActivity.tenant_id == tenant_id) &
            (PathFinderActivity.created_at.between(st_date, end_date))
        )
        if filter_path:
            activities = activities.filter(
                PathFinderActivity.path_id == filter_path.id)

        activities = activities.with_entities(
            PathFinderActivity.option_id,
            func.count(PathFinderActivity.option_id).label('count')
        ).group_by(
            PathFinderActivity.option_id
        ).all()

        for act in activities:
            opt_clicks_data[act.option_id] = act.count

    if not filter_path:
        for path in paths:
            most_traversed = get_most_traversed_path(paths, st_date, end_date,
                                                     path, opt_clicks_data,
                                                     most_traversed)
    if not filter_path or not filter_path.question or\
            filter_path.question.is_deleted:
        return most_traversed

    options = list()
    for op in filter_path.question.options:
        if not op.is_deleted:
            option = dict()
            translation = get_translation(op)
            option['option_id'] = op.id
            option['name'] = translation.text
            if translation.icon:
                option['icon'] = translation.icon.path
            option['clicks'] = opt_clicks_data.get(op.id, 0)
            options.append(option)
    most_traversed.append({
        'question': filter_path.question,
        'options': options
    })

    return most_traversed


@dashboard.route('/')
@login_required
def home():
    redirect_url = url_for('dashboard.library')
    if current_user.role_id == 4:
        redirect_url = url_for('main.home')

    return redirect(redirect_url)


@dashboard.route('/reports/')
@login_required
@analyst_permission.require()
def category_reports():

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    categories = get_categories_to_filter(tenant.default_locale_id)
    groups = [{'id': group.id, 'name': group.name}
              for group in tenant.user_groups if group.role_id != 1]

    template_args = dict(
        page="library",
        sub_menu="reports",
        tenant=tenant,
        tenant_apps=get_tenant_apps(tenant.applications),
        categories=categories,
        tenant_groups=groups,
    )

    return render_template('dashboard/library/reports/categories.html',
                           **template_args)


@dashboard.route('/new_reports/')
@login_required
@analyst_permission.require()
def new_reports():

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    categories = Section.query.join(
        SectionTranslations
    ).filter(
        Section.tenant_id == tenant_id,
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True),
        Section.is_hidden.__eq__(False),
        Section.parent_id.is_(None),
        SectionTranslations.language_id == tenant.default_locale_id
    ).with_entities(
        Section.id,
        SectionTranslations.name
    ).order_by(
        Section.order
    ).all()

    offset = datetime.now(
        pytz.timezone(tenant.timezone)
    ).utcoffset().total_seconds()

    if offset:
        offset /= 60

    template_args = dict(
        page="library",
        sub_menu="reports",
        tenant=tenant,
        tenant_apps=get_tenant_apps(tenant.applications),
        categories=categories,
        offset=offset
    )

    return render_template('dashboard/library/reports/reports.html',
                           **template_args)


@dashboard.route('/journeys/')
@app_subscription_required("JOURNEYS")
@author_permission.require()
def journeys():
    """Dashboard journeys Overview Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    tenant_details = get_tenant_api()
    draft_journey = DraftJourney.query.filter(
        DraftJourney.tenant_id == tenant_id,
        DraftJourney.is_deleted.__eq__(False)
    ).count()

    template_args = {
        'page': 'journeys',
        'journey_count': int(draft_journey),
        'sub_menu': 'overview',
        'user_groups': tenant_details['user_groups'],
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('dashboard/journeys/overview.html',
                           **template_args)


@dashboard.route('/quiz/')
@app_subscription_required("QUIZ")
@author_permission.require()
def quiz():
    """Dashboard Quiz Overview Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    tenant_details = get_tenant_api()

    template_args = {
        'page': 'quiz',
        'sub_menu': 'overview',
        'user_groups': tenant_details['user_groups'],
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('quiz/overview.html', **template_args)


@dashboard.route('/quiz/reports/')
@app_subscription_required("QUIZ")
@login_required
@analyst_permission.require()
def quiz_reports():
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    tenant_details = get_tenant_api()

    template_args = {
        'page': 'quiz',
        'sub_menu': 'reports',
        'user_groups': tenant_details['user_groups'],
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('quiz/reports.html', **template_args)


@dashboard.route('/pitch/reports/')
@dashboard.route('/pitch/')
@dashboard.route('/pitch/reports/<uuid>')
@dashboard.route('/pitch/reports/<uuid>/user_details')
@app_subscription_required("PITCH")
@author_permission.require()
def pitch(uuid=None):
    """Dashboard PitchApp overview, report page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    template_args = {
        'page': 'pitch',
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('dashboard/apps/pitch/index.html',
                           **template_args)


@dashboard.route(
    '/reports/viewer/<path:category_id>/' +
    '<any("today", "yesterday", "week", "month", "quarter",' +
    '"half-year", "year"):date_range>'
)
@dashboard.route(
    '/reports/viewer/<path:category_id>/<any("custom"):date_range>/' +
    '<from_date>/<to_date>'
)
@dashboard.route('/reports/viewer/',
                 defaults={"category_id": "all", "date_range": "week"})
@analyst_permission.require()
def viewer_reports(category_id, date_range, from_date=None, to_date=None):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    if not tenant.flags.is_private:
        abort(403)

    category = None
    formatted_frm_date = datetime.strptime(
        from_date, '%Y-%m-%d') if from_date else None
    formatted_to_date = datetime.strptime(
        to_date, '%Y-%m-%d') if to_date else None
    cur_st_date, cur_end_date, prev_st_date, prev_end_date = get_time_bounds(
        date_range,
        formatted_frm_date,
        formatted_to_date,
        timezone=tenant.timezone
    )

    visit_details = VisitActivity.query.join(UserActivity).join(User).filter(
        User.role_id == 4,
        UserActivity.tenant_id == tenant_id,
        VisitActivity.created_at.between(cur_st_date, cur_end_date),
        UserActivity.user_id.isnot(None))

    category = None
    if category_id != 'all':
        product = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_deleted.__eq__(False)) &
            (Section.slug == category_id)
        ).first()
        category = product
        if not category:
            return redirect(url_for('dashboard.viewer_reports'))

        _visit_details = visit_details.filter(
            VisitActivity.product.__eq__(category)).with_entities(
            User.unique_user_id, User.first_name, User.last_name,
            User.picture_url, User.email, UserActivity.user_id,
            func.count(VisitActivity.walkthrough_id).label('demo_views'),
            func.count(distinct(UserActivity.unique_user_id)).label('visits')
        ).group_by(
            User.unique_user_id, User.first_name, User.last_name,
            User.picture_url, User.email, UserActivity.user_id,
            UserActivity.user_id
        ).order_by(desc('demo_views')).order_by(User.first_name).all()

        category = dict()
        category['name'] = product
        category['slug'] = product.slug

    else:

        _visit_details = visit_details.with_entities(
            User.unique_user_id, User.first_name, User.last_name,
            User.picture_url, User.email, UserActivity.user_id,
            func.count(VisitActivity.walkthrough_id).label('demo_views'),
            func.count(distinct(UserActivity.unique_user_id)).label('visits')
        ).group_by(
            User.unique_user_id, User.first_name, User.last_name,
            User.picture_url, User.email, UserActivity.user_id,
            UserActivity.user_id
        ).order_by(desc('demo_views')).order_by(User.first_name).all()

    if not category:
        category = {
            'name': 'all',
            'slug': 'all'
        }

    # Check Downloading file
    if request.args.get('download'):
        csv_file = write_viewer_report_to_csv(_visit_details)
        return send_file(csv_file, as_attachment=True)

    # Pagination
    page = int(request.args.get('page', 1) or 1)
    page_limit = current_app.config['PAGE_LIMIT']
    total_pages = int(ceil(len(_visit_details) / float(page_limit)))
    if total_pages and page > total_pages:
        page = total_pages
    _visit_details = _visit_details[(page - 1) * page_limit:page_limit * page]

    template_args = dict(
        visits=_visit_details,
        page="viewers",
        date_range=date_range,
        from_date=from_date,
        to_date=to_date,
        category=category,
        categories=get_categories_to_filter(tenant.default_locale_id,
                                            with_slug=True),
        tenant=tenant,
        tenant_apps=get_tenant_apps(tenant.applications),
        total_pages=total_pages,
        page_number=page,
        page_limit=page_limit,
    )

    return render_template('dashboard/library/reports/viewer.html',
                           **template_args)


@dashboard.route(
    '/reports/demo/<path:category_id>/<any("today", "yesterday", "week",' +
    '"month", "quarter", "half-year", "year"):date_range>'
)
@dashboard.route(
    '/reports/demo/<path:category_id>/<any("custom"):date_range>/' +
    '<from_date>/<to_date>'
)
@dashboard.route('/reports/demo/',
                 defaults={"category_id": "all", "date_range": "week"})
@login_required
@analyst_permission.require()
def demo_reports(category_id, date_range, from_date=None, to_date=None):
    """Demo reports."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    category = None
    if category_id != 'all':
        product = Section.query.join(SectionTranslations).filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_deleted.__eq__(False)) &
            (SectionTranslations.language_id == tenant.default_locale_id) &
            (SectionTranslations.name == category_id)
        ).first()
        category = product
        if not category:
            return redirect(url_for('dashboard.demo_reports'))

        category = dict()
        category['name'] = category_id
        category['slug'] = product.slug

    # Threshold dates
    formatted_frm_date = datetime.strptime(
        from_date, '%Y-%m-%d') if from_date else None
    formatted_to_date = datetime.strptime(
        to_date, '%Y-%m-%d') if to_date else None
    cur_st_date, cur_end_date, prev_st_date, prev_end_date = get_time_bounds(
        date_range,
        formatted_frm_date,
        formatted_to_date,
        timezone=tenant.timezone
    )

    demos = TopicActivity.query.filter(
        (TopicActivity.from_date.between(cur_st_date, cur_end_date)) &
        (TopicActivity.walkthrough.isnot(None)) &
        (TopicActivity.tenant_id == tenant_id)
    )

    if category:
        demos = demos.filter(TopicActivity.product == category['name'])

    demos = demos.with_entities(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough,
        TopicActivity.total_slides_count,
        func.sum(TopicActivity.overall_visit_count).label('visit_count'),
        func.avg(TopicActivity.completion_rate).label('completion_rate'),
        func.avg(TopicActivity.average_frames_completed).label(
            'average_frames_completed'),
    ).group_by(
        TopicActivity.product,
        TopicActivity.section,
        TopicActivity.walkthrough,
        TopicActivity.total_slides_count
    )

    sort_by = desc
    if request.args.get('sort_by') and request.args.get('sort_by') == 'asc':
        sort_by = asc
    demos = demos.order_by(sort_by('visit_count'), TopicActivity.walkthrough)

    # Check Downloading file
    if request.args.get('download'):
        csv_file = write_demo_report_to_csv(demos)
        return send_file(csv_file, as_attachment=True)

    # Pagination
    page = int(request.args.get('page', 1) or 1)
    page_limit = current_app.config['PAGE_LIMIT']
    total_pages = int(ceil(demos.count() / float(page_limit)))
    if total_pages and page > total_pages:
        page = total_pages
    demos = demos.offset((page - 1) * page_limit).limit(page_limit)

    if not category:
        category = {
            'name': 'all',
            'slug': 'all'
        }

    template_args = dict(
        page="demos",
        date_range=date_range,
        from_date=from_date,
        to_date=to_date,
        total_pages=total_pages,
        category=category,
        categories=get_categories_to_filter(tenant.default_locale_id),
        demos=demos,
        page_number=page,
        page_limit=page_limit,
        tenant=tenant,
        tenant_apps=get_tenant_apps(tenant.applications),
        sort_by='asc' if sort_by == asc else 'desc'
    )

    return render_template('dashboard/library/reports/demos.html',
                           **template_args)


@dashboard.route('/library/', methods=['GET', 'POST'])
@login_required
@author_permission.require()
def library():
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    form = TenantForm(request.form, obj=tenant)

    if 'create_site_page' in session:
        page_type = "Create"
    else:
        page_type = "Edit"

    collaborators_list = get_collaborators()
    show_more_collaborators = True if len(collaborators_list) > 4 else False

    template_args = {
        "page": "library",
        "page_type": page_type,
        "sub_menu": "overview",
        "form": form,
        "tenant": tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
        "collaborators": collaborators_list[:4],
        "show_more_collaborators": show_more_collaborators,
        "box_auth_url": current_app.config['BOX_AUTH_URL'] +
        '?' + urllib.urlencode({
            'response_type': 'code',
            'client_id': current_app.config['BOX_CLIENT_ID'],
            'state': session['_id']
        })
    }

    return render_template('dashboard/library/overview.html', **template_args)


@dashboard.route('/feedback/')
@app_subscription_required("RATING")
@login_required
@admin_permission.require()
def feedback():

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    categories = get_categories_to_filter(tenant.default_locale_id)

    template_args = dict(
        page="library",
        sub_menu="feedback",
        tenant=tenant,
        tenant_apps=get_tenant_apps(tenant.applications),
        categories=categories,
    )
    return render_template('dashboard/library/feedback.html',
                           **template_args)


@dashboard.route('/library/settings', methods=['GET', 'POST'])
@login_required
@admin_permission.require()
def library_settings():
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    tenant_flag = tenant.flags
    form = TenantForm(request.form, obj=tenant)

    if 'create_site_page' in session:
        page_type = "Create"
    else:
        page_type = "Edit"

    # Check if form is valid
    if request.method == 'POST':
        if not admin_permission.can():
            abort(403)

        if form.is_general.data:
            if request.files.get('logo'):
                form.logo.data = request.files['logo']

            if request.files.get('favicon'):
                form.favicon.data = request.files['favicon']

            if form.validate():
                tenant.name = form.name.data

                if form.logo.data:
                    if tenant.logo:
                        old_tenant_logo = os.path.join(
                            current_app.config['MEDIA_FOLDER'], tenant.logo)
                        if os.access(old_tenant_logo, os.R_OK):
                            os.remove(old_tenant_logo)

                    filename = namegen_filename(None, form.logo.data)
                    form.logo.data.save(
                        os.path.join(current_app.config['MEDIA_FOLDER'],
                                     filename))
                    tenant.logo = filename
                elif form.remove_logo.data and form.remove_logo.data == 'True':
                    tenant.logo = None

                if form.favicon.data:
                    if tenant.favicon:
                        old_tenant_favicon = os.path.join(
                            current_app.config['MEDIA_FOLDER'], tenant.favicon)
                        if os.access(old_tenant_favicon, os.R_OK):
                            os.remove(old_tenant_favicon)

                    favicon_filename = namegen_filename(None,
                                                        form.favicon.data)
                    form.favicon.data.save(
                        os.path.join(current_app.config['MEDIA_FOLDER'],
                                     favicon_filename))
                    tenant.favicon = favicon_filename

                if form.title.data:
                    tenant.title = form.title.data
                else:
                    tenant.title = u'Product Walkthroughs'

                tenant.description = form.description.data or None

                theme = TenantTheme()
                theme.background_color = form.background_color.data or\
                    current_app.config["DEFAULT_BACKGROUND_COLOR"]
                theme.progress_bar_color = form.progress_bar_color.data or\
                    current_app.config["DEFAULT_FILL_COLOR"]
                theme.title_color = form.title_color.data or\
                    current_app.config["DEFAULT_TITLE_COLOR"]
                theme.paragraph_color = form.paragraph_color.data or\
                    current_app.config["DEFAULT_PARAGRAPH_COLOR"]
                tenant.theme = theme

                form.domain.data = unicode(tenant.domain)
                form.timezone.data = unicode(tenant.timezone)
                form.logo.data = tenant.logo
                form.favicon.data = tenant.favicon
                session.pop('create_site_page', None)
            else:
                form.logo.data = tenant.logo
                form.favicon.data = tenant.favicon

        else:
            # Advanced Settings.
            tenant_flag.box_integration_enabled = form.enable_box.data
            # Only set the value, if the option has been changed.
            if tenant_flag.is_private != form.is_private.data:
                tenant_flag.is_private = form.is_private.data
                change_products_privacy(tenant, tenant_flag.is_private)

            tenant_flag.can_download = form.can_download.data
            """
            TODO:
                Delete cached playlist sections to enable/disable offline mode
            Problem:
                Cache will not provide keys to iterate and delete individually
            """
            tenant_flag.allow_offline = form.allow_offline.data
            tenant_flag.can_embed = form.can_embed.data
            tenant_flag.chapter_autoflow = form.chapter_autoflow.data
            tenant_flag.show_notes = form.show_notes.data
            tenant_flag.enable_homepage_banner = form.enable_homepage_banner.data
            tenant_flag.is_announcement_widget_enabled = form.enable_announcement_widget.data
        from sharedemos.tasks import delete_api_cache_data
        delete_api_cache_data.delay({
            'entity': 'tenant',
            'tenant_id': tenant.id
        })
        log_last_activity('updated', 'tenant', tenant)

        db.session.add(tenant)
        db.session.commit()

        # Remove the PDFs generated, when tenant settings are updated.
        remove_pdf()

        if page_type == 'Create':
            return redirect(url_for('main.edit'))
        else:
            return redirect(url_for('dashboard.library_settings'))

    elif tenant.theme:
        form.background_color.data = tenant.theme.background_color
        form.progress_bar_color.data = tenant.theme.progress_bar_color
        form.title_color.data = tenant.theme.title_color
        form.paragraph_color.data = tenant.theme.paragraph_color

    template_args = {
        "page": "library",
        "page_type": page_type,
        "sub_menu": "settings",
        "form": form,
        "tenant": tenant,
        "is_announcement_widget_enabled": tenant_flag.is_announcement_widget_enabled,
        "enable_homepage_banner": tenant_flag.enable_homepage_banner,
        "widget": tenant.announcement_widget,
        "homepage_banner": tenant.homepage_banner,
        "tenant_apps": get_tenant_apps(tenant.applications),
        "box_auth_url": current_app.config['BOX_AUTH_URL'] + '?' +
        urllib.urlencode({
            'response_type': 'code',
            'client_id': current_app.config['BOX_CLIENT_ID'],
            'state': session['_id']
        })
    }

    return render_template('dashboard/library/settings.html', **template_args)


@dashboard.route(
    '/leads/<any("today", "yesterday", "week", "month", "quarter",' +
    '"half-year", "year"):date_range>/<category_id>'
)
@dashboard.route(
    '/leads/<any("custom"):date_range>/<category_id>/<from_date>/<to_date>',
)
@dashboard.route('/leads/',
                 defaults={"date_range": "today", "category_id": "all"})
@login_required
@analyst_permission.require()
def leads(date_range, category_id, from_date=None, to_date=None):
    # Threshold dates
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    formatted_frm_date = datetime.strptime(
        from_date, '%Y-%m-%d') if from_date else None
    formatted_to_date = datetime.strptime(
        to_date, '%Y-%m-%d') if to_date else None
    cur_st_date, cur_end_date, prev_st_date, prev_end_date = get_time_bounds(
        date_range,
        formatted_frm_date,
        formatted_to_date,
        timezone=tenant.timezone
    )

    # Get leads for selected date
    leads = Leads.query.filter(
        Leads.tenant_id == tenant_id,
        Leads.created_at.between(cur_st_date, cur_end_date)
    )

    # Filter leads by selected category/parent section
    category = None
    if category_id != 'all':
        product = Section.query.join(SectionTranslations).filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_deleted.__eq__(False)) &
            (SectionTranslations.language_id == tenant.default_locale_id) &
            (SectionTranslations.name == category_id)
        ).first()
        category = product
        if not category:
            return redirect(url_for('.leads'))

        translation = get_default_translation(category)
        category.name = translation.name
        category.title = translation.title
        category.slug = translation.name

    if category:
        leads = leads.filter_by(product_id=category.id)
    else:
        category = {
            'name': 'All Categories',
            'title': 'All Categories',
            'slug': 'all'
        }

    # Check Downloading file
    if request.args.get('download'):
        csv_file = write_leads_to_csv(leads)
        return send_file(csv_file, as_attachment=True)

    # Pagination
    page = int(request.args.get('page', 1) or 1)
    page_limit = current_app.config['PAGE_LIMIT']
    total_pages = int(ceil(leads.count() / float(page_limit)))
    if total_pages and page > total_pages:
        page = total_pages

    leads = leads.offset((page - 1) * page_limit).limit(page_limit)
    # Get lead category information
    leads_data = list()
    for lead in leads:
        translation = get_default_translation(lead.product)
        data = {
            'created_at': lead.created_at,
            'user_name': lead.user_data.get('name') or
            lead.user_data.get('NAME') or lead.user_data.get('Name', 'N/A'),
            'user_email': lead.user_data.get('email') or
            lead.user_data.get('EMAIL') or lead.user_data.get('Email', 'N/A'),
            'user_company': lead.user_data.get('company') or
            lead.user_data.get('COMPANY') or
            lead.user_data.get('Company', 'N/A'),
            'product_name': translation.name,
            'user_designation': lead.user_data.get('designation') or
            lead.user_data.get('DESIGNATION') or
            lead.user_data.get('Designation', 'N/A')
        }

        leads_data.append(data)

    template_args = {
        "page": "leads",
        "sub_menu": "overview",
        "date_range": date_range,
        "category": category,
        "categories": get_categories_to_filter(tenant.default_locale_id),
        "leads": leads_data,
        "from_date": from_date,
        "to_date": to_date,
        "tenant": tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
        "page_number": page,
        "total_pages": total_pages,
    }
    return render_template('dashboard/leads/overview.html', **template_args)


@dashboard.route(
    '/activity/<from_date>/<to_date>/<entity>/<entity_id>',
)
@dashboard.route(
    '/activity/<from_date>/<to_date>/<entity>',
)
@dashboard.route('/activity')
@login_required
@author_permission.require()
def activity(from_date=None, to_date=None, entity=None, entity_id=None):
    """
    Render activity template with filter options.

    Filter options inlcudes - search, date, author, category
    params:
        from_date   - string date input, None by default.
        to_date     - string date input, None by default.
        entity      - string data, can have values like
                      'section','product','user'. None by default.
        entity_id   - string data, can have values if slug or email id.
                      None by default.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    category = None
    author = None
    if entity in ['section', 'product'] and entity_id:
        category = Section.query.filter(Section.slug == entity_id).first()
        if not category:
            slug_revision = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode('section')) &
                (SlugRevision.old_slug == entity_id)
            ).first()

            if slug_revision:
                category = Section.query.filter(
                    Section.slug == slug_revision.new_slug).first()

    elif entity == 'user' and entity_id:
        author = User.query.filter(User.tenant_id == tenant_id,
                                   User.email == entity_id).first_or_404()

    # Fetch all categories,
    # since any category can only be created/deleted by an author/admin
    # which will have an activity_feed record.
    all_categories = Section.query.join(SectionTranslations).filter(
        Section.tenant_id == tenant_id,
        Section.parent_id.is_(None),
        SectionTranslations.language_id == session['author']['locale']
    ).with_entities(
        Section.id,
        SectionTranslations.name
    ).order_by(SectionTranslations.name).all()
    """
        Fetch any user (user's role might be changed or
        user might have been be removed)
        with activity_feed data.
    """
    users = User.query.filter(
        User.tenant_id == tenant_id,
        User.activity_feed.any()
    ).order_by(User.first_name).all()

    template_args = {
        "action_list": ACTION_LIST,
        "page": "activity",
        "sub_menu": "overview",
        "tenant": tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
        'all_categories': all_categories,
        'users': users,
        'entity': entity if entity else '',
        'author': author if author else '',
        'category': category if category else '',
        'from_date': from_date,
        'to_date': to_date,
    }
    return render_template('dashboard/activity/overview.html', **template_args)


@dashboard.route('/account-settings/')
@login_required
def accountsettings():
    """Account settings page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    template_args = {
        "fname": current_user.first_name,
        "lname": current_user.last_name,
        "email": current_user.email,
        "page": "account-settings",
        "tenant": tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('dashboard/account-settings.html', **template_args)


@dashboard.route('/users/<any("1", "2", "3", "4"):role_id>')
@dashboard.route('/users/', defaults={"role_id": "0"})
@login_required
@admin_permission.require()
def users(role_id):
    """User permission page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    users = User.query.filter_by(tenant_id=tenant_id, is_deleted=False)
    total_users = users.count()
    admins_count = users.filter(User.role_id == 1).count()
    authors_count = users.filter(User.role_id == 2).count()
    analysts_count = users.filter(User.role_id == 3).count()
    viewers_count = users.filter(User.role_id == 4).count()

    role_id = int(role_id)
    if role_id:
        users = users.filter(User.role_id == role_id)

    users = users.order_by(User.first_name, User.email)

    # Pagination
    page = int(request.args.get('page', 1) or 1)
    page_limit = 20
    total_pages = int(ceil(users.count() / float(page_limit)))
    if total_pages and page > total_pages:
        page = total_pages

    users = users.offset((page - 1) * page_limit).limit(page_limit)

    template_args = {
        "page": "users",
        "tenant": tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
        "num_of_users": total_users,
        "num_of_admins": admins_count,
        "num_of_authors": authors_count,
        "num_of_analysts": analysts_count,
        "num_of_viewers": viewers_count,
        "users": users.all(),
        "role_id": role_id,
        "currentUserEmail": current_user.email,
        "page_number": page,
        "total_pages": total_pages
    }
    return render_template('dashboard/users.html', **template_args)


@dashboard.route('/audience/')
@app_subscription_required("AUDIENCE")
@login_required
@author_permission.require()
def audience():
    """Audience & Private Sharing."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    if tenant_id:
        tenant = Tenant.query.get(tenant_id)
        if 'AUDIENCE' not in [app.unique_id.upper()
                              for app in tenant.applications
                              if app.is_enabled]:
            return redirect(url_for('dashboard.library'))

        template_args = {
            "page": "audience",
            "tenant": tenant,
            "tenant_apps": get_tenant_apps(tenant.applications),
        }
        return render_template('dashboard/audience.html', **template_args)

    return render_template('home.html')


@dashboard.route('/authorize-box')
@login_required
@author_permission.require()
def box_authorize():
    template_args = {
        "code": request.args.get('code'),
        "state": request.args.get('state')
    }
    return render_template('dashboard/box_authorize.html', **template_args)


@dashboard.route('/read-box-content')
@login_required
@author_permission.require()
def read_box_content():
    """Get user's box app content."""
    if not request.args and ('state' not in request.args or
                             'code' not in request.args) and\
            session['_id'] != request.args.get('state'):
        return redirect(url_for('dashboard.library'))

    payload = {
        'grant_type': 'authorization_code',
        'client_id': current_app.config['BOX_CLIENT_ID'],
        'client_secret': current_app.config['BOX_CLIENT_SECRET'],
        'code': request.args.get('code')
    }
    token = requests.post(current_app.config['BOX_TOKEN_API_URL'], payload)

    if token.status_code == 200:
        if 'box' not in session['user']:
            session['user']['box'] = dict()

        user_id = str(session['user']['user_id'])
        if user_id not in session['user']['box']:
            session['user']['box'][user_id] = dict()

        session['user']['box'][user_id] = {
            'access_token': token.json()['access_token'],
            'refresh_token': token.json()['refresh_token']
        }
        box_user_id = 'box_user_' + str(session['user']['user_id'])
        if not current_app.box_cache.get(box_user_id):
            box_entries = get_box_entries(token.json()['access_token'],
                                          tree=dict())
            current_app.box_cache.set(box_user_id, box_entries)

        return redirect(url_for('main.edit'))

    return redirect(url_for('dashboard.library'))


@dashboard.route('/pathfinder/')
@app_subscription_required("PATHFINDER")
@author_permission.require()
def pathfinder():
    """Dashboard Pathfinder Overview Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    template_args = {
        'page': 'pathfinder',
        'sub_menu': 'overview',
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('dashboard/pathfinder/overview.html',
                           **template_args)


@dashboard.route(
    '/pathfinder/reports/<any("today", "yesterday", "week", "month",' +
    '"quarter", "half-year", "year"):date_range>/<path_id>'
)
@dashboard.route(
    '/pathfinder/reports/<any("custom"):date_range>/<path_id>/<from_date>' +
    '/<to_date>',
)
@dashboard.route('/pathfinder/reports/',
                 defaults={"date_range": "week", "path_id": "all"})
@app_subscription_required("PATHFINDER")
@login_required
@author_permission.require()
def pathfinder_reports(path_id, date_range, from_date=None, to_date=None):
    """Dashboard Pathfinder Reports Page."""
    formatted_frm_date = datetime.strptime(
        from_date, '%Y-%m-%d') if from_date else None
    formatted_to_date = datetime.strptime(
        to_date, '%Y-%m-%d') if to_date else None

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    cur_st_date, cur_end_date, prev_st_date, prev_end_date = get_time_bounds(
        date_range,
        formatted_frm_date,
        formatted_to_date,
        timezone=tenant.timezone
    )
    cur_report = get_pathfinder_report(cur_st_date, cur_end_date)
    prev_report = get_pathfinder_report(prev_st_date, prev_end_date)

    paths = Path.query.join(
        Path.questions
    ).join(
        Question.options
    ).filter(
        Path.tenant_id == tenant_id,
        Path.is_deleted.__eq__(False),
        Path.is_enabled.__eq__(True),
        Question.path_id == Path.id,
        Question.is_deleted.__eq__(False),
        Question.is_enabled.__eq__(True),
        Option.question_id == Question.id,
        Option.is_deleted.__eq__(False),
        Option.is_enabled.__eq__(True)
    ).order_by(Path.order).all()

    popular_path_list = list()

    if path_id == 'all':
        popular_paths = PathFinderActivity.query.filter(
            (PathFinderActivity.tenant_id == tenant_id) &
            (PathFinderActivity.created_at.between(
                cur_st_date, cur_end_date)) &
            (PathFinderActivity.event_type == u'StartEvent')
        ).with_entities(
            PathFinderActivity.path_id,
            func.count(
                func.distinct(
                    PathFinderActivity.report_user_id)).label('clicks')
        ).group_by(
            PathFinderActivity.path_id
        ).order_by(
            desc('clicks')
        ).limit(10).all()

        paths_dict = {path.id: path for path in paths}
        for p_path in popular_paths:
            # Popular paths may include deleted path data - Skip those paths
            if not paths_dict.get(p_path.path_id):
                continue

            completion_rate = path_completion_rate_between_dates(
                paths_dict[p_path.path_id],
                cur_st_date, cur_end_date)
            popular_path_list.append({
                'name': unicode(paths_dict.get(p_path.path_id) or ""),
                'clicks': p_path.clicks,
                'completion_rate': str(
                    round(completion_rate, 1)
                ).rstrip('0').rstrip('.')
            })

    path = None
    if path_id != 'all':
        path = Path.query.filter(
            Path.slug == path_id,
            Path.is_deleted.__eq__(False)
        ).first_or_404()

    most_traversed = get_most_traversed_path(paths=paths,
                                             st_date=cur_st_date,
                                             end_date=cur_end_date,
                                             filter_path=path)

    most_traversed.sort(key=lambda x: x['options'][0]['clicks'], reverse=True)
    starts_progress = get_progress_difference(cur_report['starts'],
                                              prev_report['starts'])
    goals_progress = get_progress_difference(cur_report['goals'],
                                             prev_report['goals'])
    completion_rate_progress = get_progress_difference(
        cur_report['completion_rate'],
        prev_report['completion_rate'])
    results_suggested_progress = get_progress_difference(
        cur_report['results_suggested'], prev_report['results_suggested'])

    template_args = {
        'page': 'pathfinder',
        'sub_menu': 'reports',
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
        'from_date': from_date,
        'to_date': to_date,
        'paths': paths,
        'path_id': path_id,
        'path': path,
        'date_range': date_range,
        'starts': "{:,}".format(cur_report['starts']),
        'starts_progress': "{:,}".format(
            round(starts_progress, 1)).rstrip('0').rstrip('.'),
        'goals': "{:,}".format(cur_report['goals']),
        'goals_progress': "{:,}".format(
            round(goals_progress, 1)).rstrip('0').rstrip('.'),
        'completion_rate': "{:,}".format(
            round(cur_report['completion_rate'], 1)).rstrip('0').rstrip('.'),
        'completion_rate_progress': "{:,}".format(
            round(completion_rate_progress, 1)).rstrip('0').rstrip('.'),
        'results_suggested': "{:,}".format(cur_report['results_suggested']),
        'results_suggested_progress': "{:,}".format(
            round(results_suggested_progress, 1)).rstrip('0').rstrip('.'),
        'popular_paths': popular_path_list,
        'most_traversed': most_traversed
    }

    return render_template('dashboard/pathfinder/reports.html',
                           **template_args)


@dashboard.route('/brand/', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
@author_permission.require()
def brand():
    """Dashboard brand logos Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    page_type = "Edit"

    """
    logos_list = [logo for logo in tenant.logos_list if not logo.is_deleted]
    if request.method == 'POST':
        logo_file = request.files.get('upload_logo')
        if logo_file:
            try:
                path = namegen_filename(None, logo_file)
                logo_file.save(os.path.join(current_app.config['MEDIA_FOLDER'],
                                            path))
                new_logo = TenantLogos()
                new_logo.name = unicode(logo_file.filename)
                new_logo.path = unicode(path)
                new_logo.tenant = tenant
                db.session.add(new_logo)
                db.session.commit()
                logos_list.append(new_logo)
                return redirect(url_for('dashboard.brand'))
            except Exception as e:
                return {'msg': 'LOGO_ERROR'}

    if request.method == 'PUT':
        logo_path = request.form.get('path')
        if logo_path:
            # Make all the other logos non-default
            for logo in logos_list:
                logo.is_default = False
                db.session.add(logo)

            tenant_logo = TenantLogos.query.\
                filter(TenantLogos.tenant == tenant,
                       TenantLogos.path == logo_path,
                       TenantLogos.is_deleted.__eq__(False)).first_or_404()
            tenant_logo.is_default = True
            db.session.add(tenant_logo)
            db.session.commit()
        logos_collection = [{'name': logo.name, 'path': logo.path,
                             'isDefault': logo.is_default}
                            for logo in logos_list]
        return jsonify(logosList=logos_collection)

    if request.method == 'DELETE':
        logo_path = request.form.get('path')
        if logo_path:
            tenant_logo = TenantLogos.query.\
                filter(TenantLogos.tenant == tenant,
                       TenantLogos.path == logo_path,
                       TenantLogos.is_deleted.__eq__(False)).first_or_404()
            tenant_logo.is_deleted = True
            db.session.add(tenant_logo)
            db.session.commit()
        logos_collection = [{'name': logo.name, 'path': logo.path,
                             'isDefault': logo.is_default}
                            for logo in tenant.logos_list
                            if not logo.is_deleted]
        return jsonify(logosList=logos_collection)
    """

    template_args = {
        'page': 'brand',
        'page_type': page_type,
        'sub_menu': 'logos',
        'logosList': [],
        'tenant': tenant
    }

    return render_template('dashboard/brand/logos.html', **template_args)


@dashboard.route('/brand/colors')
@login_required
@author_permission.require()
def brand_colors():
    """Dashboard brand Colors Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    page_type = "Edit"

    template_args = {
        'page': 'brand',
        'page_type': page_type,
        'sub_menu': 'colors',
        'tenant': tenant
    }
    return render_template('dashboard/brand/colors.html', **template_args)


@dashboard.route('/brand/images')
@login_required
@author_permission.require()
def brand_images():
    """Dashboard brand Images Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    page_type = "Edit"

    template_args = {
        'page': 'brand',
        'page_type': page_type,
        'sub_menu': 'images',
        'tenant': tenant
    }
    return render_template('dashboard/brand/images.html', **template_args)


@dashboard.route('/brand/icons')
@login_required
@author_permission.require()
def brand_icons():
    """Dashboard brand Icons Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    page_type = "Edit"

    template_args = {
        'page': 'brand',
        'page_type': page_type,
        'sub_menu': 'icons',
        'tenant': tenant
    }
    return render_template('dashboard/brand/icons.html', **template_args)
