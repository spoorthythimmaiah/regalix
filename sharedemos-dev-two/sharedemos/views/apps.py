import urllib

from flask import (
    Blueprint,
    abort,
    current_app,
    g,
    redirect,
    render_template,
    url_for
)

from .main import get_template_args, can_access_journey
from sharedemos.libs.bulletin_board import (
    get_bulletin_boards,
    get_bulletin_board_link_details
)
from sharedemos.libs.decorators import (
    app_subscription_required,
    author_permission,
    check_user_access,
    template_required
)
from sharedemos.libs.utils import (
    check_access_and_get_redirect,
    get_tenant_api,
    get_recently_viewed_chapters,
    get_recent_demos,
    get_section_api,
    get_products_api
)
from sharedemos.views.dashboard import get_tenant_apps
from sharedemos.models import Tenant
apps = Blueprint('apps', __name__)


@apps.route('/')
@template_required(['vmware', 'avaya', 'designeverest'])
@check_user_access
def home(**kwargs):
    """App Route Handler."""
    if kwargs.get('ret_url'):
        return redirect(kwargs.get('ret_url'))

    tenant_id = current_app.tenant_id
    template_args = get_template_args(tenant_id)

    if template_args['tenant'].template == u'avaya':
        return redirect(
            url_for('apps.feed'))

    tenant_settings = get_tenant_api()
    template_args.update({
        'api': {
            'tenant': tenant_settings
        }
    })
    return render_template('tenants/common/apps.html', **template_args)


@apps.route('/feed/')
@template_required(['avaya'])
@check_user_access
def feed(**kwargs):
    """Feed Route Handler."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    recent_chapters = get_recently_viewed_chapters()
    template_args.update({
        'api': {
            'view_type': 'feed',
            'tenant': get_tenant_api()
        },
        'recent_chapters': recent_chapters
    })
    return render_template('tenants/seo/avaya/feed.html', **template_args)


@apps.route('/library/<section>/')
@apps.route('/library/',
            defaults={'section': None})
@template_required(['avaya'])
@check_user_access
def library(section, **kwargs):
    """Library route Handler."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    template_args['recent_demos'] = get_recent_demos()
    featured_content = get_bulletin_boards()
    if featured_content:
        featured_content = featured_content[0]
        template_args['featured_content'] = get_bulletin_board_link_details(
            featured_content.bulletin_board_links,
            featured_content.tenant
        )

    if not section:
        template_args['api'] = get_products_api()
        template_args['view_type'] = 'home'
        return render_template(
            'tenants/seo/avaya/library.html', **template_args)

    response = get_section_api(section)

    if response['status'] == 'NOT_FOUND':
        abort(404)

    if response['status'] == 'FORBIDDEN':
        abort(403)

    if response['status'] == 'REDIRECT':
        return redirect(
            url_for(
                'apps.library',
                section=response['slug']
            )
        )

    if (
        response['section']['is_private'] and
        response['section']['product']['is_private'] and
        kwargs.get('ret_url')
    ):
        query_args = {
            'next': '/'
        }
        query_args.update(kwargs.get('args', {}))
        url = kwargs.get('ret_url') + '?{}'.format(
            urllib.urlencode(query_args))
        return redirect(url)

    if response['section']['linked_asset']:
        return redirect(
            url_for(
                'main.serve_section_assets',
                asset_name=response['section']['linked_asset']['name']
            )
        )

    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args.update(get_template_args(tenant_id))
    tenant_template = template_args['tenant'].template.lower()
    template_name = 'tenants/seo/' + tenant_template + '/section.html'

    if response['section']['playlists']:
        template_name = 'tenants/seo/' + tenant_template + '/playlist.html'

    linkedin_app = None
    for app in template_args['tenant'].tenant_applications:
        if app.application.unique_id.upper() in ['MESSAGING', 'RATING']:
            linkedin_app = app
            break

    template_args.update({
        'view_type': 'home',
        'api': response['section'],
        'linkedin_app': linkedin_app,
        "can_access_journey": can_access_journey()
    })

    if getattr(g.user, 'groups', None):
        template_args.update({
            'user_groups': [grp.id for grp in g.user.groups]
        })

    return render_template(template_name, **template_args)


@apps.route('/journeys/')
@check_user_access
def journeys_home(**kwargs):
    """Journey Home Page."""
    redirect_url = check_access_and_get_redirect(kwargs)
    if redirect_url:
        return redirect(redirect_url)

    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant = get_tenant_api()
    template_args.update({
        'api': {
            'view_type': 'journey',
            'tenant': tenant
        },
        'can_access_journey': can_access_journey(),
    })
    template_name = 'tenants/seo/' + tenant['template'] + '/journeys.html'
    return render_template(template_name, **template_args)


@apps.route('/repository-manager/')
@app_subscription_required("REPOSITORY_MANAGER")
@author_permission.require()
def repository_manager():
    """Dashboard repository Overview Page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    tenant_details = get_tenant_api()
    template_args = {
        'sub_menu': 'integration',
        'user_groups': tenant_details['user_groups'],
        'tenant': tenant,
        "tenant_apps": get_tenant_apps(tenant.applications),
    }
    return render_template('dashboard/library/repository_manager.html',
                           **template_args)
