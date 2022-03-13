from flask import current_app, request, session
from flask.ext.restful import Resource

from sharedemos.libs.api import is_author
from sharedemos.models import (
    db,
    Downloads,
    Tenant,
    UserActivity
)


def log_download_activity(activity):
    """
    Log Download activity.
    params:
        activity: Dictionary.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    user = session['author'] if is_author() else session['user']
    locale_id = user['locale'] if user else tenant.default_locale_id

    user_session_id = session['user']['user_id']
    user = UserActivity.query.filter(
        UserActivity.unique_user_id == user_session_id
    ).first_or_404()

    download = Downloads()
    download.tenant_id = tenant_id
    download.entity_type = activity.get("entity_type", "")
    download.entity_id = int(activity.get("entity_id", 0))
    download.entity_name = activity.get("name", "")
    download.url = activity.get("url")
    download.user_id = user.id
    download.language_id = locale_id
    db.session.add(download)
    db.session.commit()


class DownloadApi(Resource):

    def post(self):
        log_download_activity(request.json)

        return request.json, 200
