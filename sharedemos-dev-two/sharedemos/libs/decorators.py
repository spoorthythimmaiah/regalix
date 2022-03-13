import urllib
from functools import wraps

from flask import (
    abort,
    current_app,
    g, redirect,
    request,
    session,
    url_for
)

from flask.ext.restful.utils import error_data
from flask.ext.login import current_user

from sharedemos.libs.model import (
    admin_permission,
    analyst_permission,
    author_permission,
    commenter_permission
)
from sharedemos.libs.api import is_author
from sharedemos.models import TenantFlags, Tenant


route_handler_templates = [
    'bmc', 'dell', 'designeverest', 'helpsite', 'purestorage',
    'regalix', 'silverpeak', 'vmware']


def app_subscription_required(app_name):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            tenant_id = getattr(current_app, 'tenant_id', None)
            if not tenant_id:
                abort(404)

            tenant = Tenant.query.get(tenant_id)

            # check if tenant subscribed to the app
            if app_name.upper() not in [app.unique_id.upper()
                                        for app in tenant.applications
                                        if app.is_enabled]:
                abort(404)

            return func(*args, **kwargs)

        return wrapper
    return decorator


def check_user_access(func):
    """Check is user access state for site."""
    """
    If you decorate a vew with this, it will ensure that the requester
    has a valid JWT before calling the actual view.
    This does not check the freshness of the token.
    See also: fresh_jwt_required()
    :param func: The view function to decorate
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        if 'is_access_denied' in session and session['is_access_denied']:
            abort(403)

        # Attempt to decode the token
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if getattr(g, 'user', None) and g.user.is_anonymous() and\
                tenant.flags.is_private:
            kwargs.update({
                'ret_url': url_for('auth.login'),
                'args': {
                    'next': request.path
                }
            })
            if tenant.sp_public_certificate and tenant.sp_private_key:
                idp_set_at_tenant = tenant.idp_entity_id\
                    and tenant.idp_url\
                    and tenant.idp_x509cert
                if idp_set_at_tenant:
                    kwargs.update({
                        'ret_url': url_for('auth.saml_login'),
                        'args': {
                            'idp': 'default',
                            'RelayState': request.path
                        }
                    })

                user_groups = tenant.user_groups
                user_groups_with_idp = [grp for grp in user_groups
                                        if grp.idp_entity_id and
                                        grp.idp_url and
                                        grp.idp_x509cert]
                if user_groups_with_idp or\
                        (user_groups and idp_set_at_tenant):
                    kwargs.update({
                        'ret_url': url_for('auth.choose_login'),
                        'args': {
                            'next': request.path
                        }
                    })
        elif tenant.template and tenant.template.lower() == 'purestorage' and\
                request.endpoint != 'main.home' and\
                'is_nda_approved' in session and\
                not session['is_nda_approved']:
            return redirect(url_for('main.home'))
        return func(*args, **kwargs)
    return wrapper


def check_bot(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.user_agent.browser in current_app.config.get(
                'BOT_LIST', []) or\
                request.headers['User-Agent'].lower() == 'prerender' or\
                not session.get('user') or not session['user'].get('user_id')\
                or is_author():
            return 'SUCCESS', 200

        return func(*args, **kwargs)

    return wrapper


def check_box_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        box_user_id = 'box_user_' + str(session['user']['user_id'])
        if not current_app.box_cache.get(box_user_id):
            redirect_to_url = current_app.config['BOX_AUTH_REDIRECT_URL'] + \
                url_for('dashboard.box_authorize',
                        _external=True,
                        _scheme='http')

            box_auth_url = current_app.config['BOX_AUTH_URL'] +\
                '?' + urllib.urlencode({
                    'response_type': 'code',
                    'client_id': current_app.config['BOX_CLIENT_ID'],
                    'state': session['user']['user_id'],
                    'redirect_uri': redirect_to_url
                })
            return {'redirect_url': box_auth_url}, 302

        return func(*args, **kwargs)

    return wrapper


def has_admin_access(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # check for user's permission
        if not admin_permission.can():
            return error_data(403)

        return func(*args, **kwargs)

    return wrapper


def has_analyst_access(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # check for user's permission
        if not analyst_permission.can():
            return error_data(403)

        return func(*args, **kwargs)

    return wrapper


def has_author_access(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # check for user's permission
        if not author_permission.can():
            return error_data(403)

        return func(*args, **kwargs)

    return wrapper


def has_commenter_access(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # check for user's permission
        if not commenter_permission.can():
            return error_data(403)

        return func(*args, **kwargs)

    return wrapper


def login_required(func):
    """Protect view from anonymous user access."""
    """
    If you decorate a view with this, it will ensure that the current user is
    logged in and authenticated before calling the actual view. (If they are
    not, it calls the :attr:`LoginManager.unauthorized` callback.) For
    example::

        @app.route('/post')
        @login_required
        def post():
            pass

    If there are only certain times you need to require that your user is
    logged in, you can do so with::

        if not current_user.is_authenticated():
            return current_app.login_manager.unauthorized()

    ...which is essentially the code that this function adds to your views.

    It can be convenient to globally turn off authentication when unit
    testing. To enable this, if either of the application
    configuration variables `LOGIN_DISABLED` or `TESTING` is set to
    `True`, this decorator will be ignored.

    :param func: The view function to decorate.
    :type func: function
    """
    @wraps(func)
    def decorated_view(*args, **kwargs):
        if current_app.login_manager._login_disabled:
            return func(*args, **kwargs)
        elif not current_user.is_authenticated():
            tenant_id = getattr(current_app, 'tenant_id', None)
            tenant = Tenant.query.get(tenant_id)
            if tenant.flags.is_private:
                # check if user is admin/author
                if getattr(g, 'user', None) and g.user.is_anonymous():
                    if tenant.sp_public_certificate\
                            and tenant.sp_private_key:
                        if tenant.user_groups:
                            return redirect(
                                url_for('auth.choose_login', next=request.path)
                            )
                        return redirect(
                            url_for('auth.saml_login',
                                    idp='default',
                                    RelayState=request.path))

                    # redirect anonymous users to login page
                    return redirect(url_for('auth.login', next=request.path))
            return current_app.login_manager.unauthorized()
        return func(*args, **kwargs)
    return decorated_view


def redirect_logged_in_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if current_user.is_authenticated():
            redirect_url = url_for(
                current_app.config.get('DEFAULT_LOGIN_REDIRECT'),
            )
            if request.args.get("next"):
                redirect_url = request.args["next"]
            elif current_user.role_id in [4, 5]:
                redirect_url = url_for('main.home')

            return redirect(redirect_url)

        return func(*args, **kwargs)

    return wrapper


def template_required(template_list):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            tenant = Tenant.query.get(current_app.tenant_id)

            # check if tenant subscribed to the app
            if not tenant.template or\
                    tenant.template.lower() not in template_list:
                abort(404)

            return func(*args, **kwargs)

        return wrapper
    return decorator


def check_template():
    """
    Decorator to check tenant template.
    Specifically for route_handler func in main view Blueprint.
    """
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                tenant_template = Tenant.query.filter_by(
                    id=current_app.tenant_id).one().template
                if tenant_template not in route_handler_templates:
                    abort(404)

            except Exception:
                abort(404)

            return func(*args, **kwargs)

        return wrapper
    return decorator


def check_private_tenant(func):

    @wraps(func)
    def wrapper(*args, **kwargs):
        tenant_id = current_app.tenant_id
        flag = TenantFlags.query.filter(
            TenantFlags.tenant_id == tenant_id
        ).first()

        if not flag.is_private:
            abort(403)

        return func(*args, **kwargs)
    return wrapper


def check_user_group_access(user_groups):
    """Decorator to check the group access for logged in user."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            """Check whether logged-in user groups are inline with groups provided."""
            logged_in_user_groups = [grp.slug.lower() for grp in g.user.groups]

            if not any(i in logged_in_user_groups for i in user_groups):
                abort(403)

            return func(*args, **kwargs)

        return wrapper
    return decorator
