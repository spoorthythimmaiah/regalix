from flask import (
    Blueprint,
    flash,
    jsonify,
    render_template,
    redirect,
    url_for
)
from flask.ext.principal import PermissionDenied

from social.exceptions import AuthException

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.utils import get_tenant_api


errors = Blueprint("errors", __name__)


@errors.app_errorhandler(AuthException)
def auth_exception(error):
    flash(error.message)
    return redirect(url_for('auth.login'))


@errors.app_errorhandler(SharedemosException)
def api_exception(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@errors.app_errorhandler(PermissionDenied)
def permission_denied(error):
    tenant = get_tenant_api()
    return render_template(
        'error_page/403.html',
        tenant=tenant,
    ), 403


@errors.app_errorhandler(403)
def forbidden(error):
    tenant = get_tenant_api()
    return render_template(
        'error_page/403.html',
        tenant=tenant,
    ), 403


@errors.app_errorhandler(404)
def not_found(error):
    return render_template(
        'error_page/404.html'
    ), 404


@errors.app_errorhandler(500)
def server_error(error):
    return render_template(
        'error_page/500.html',
    ), 500
