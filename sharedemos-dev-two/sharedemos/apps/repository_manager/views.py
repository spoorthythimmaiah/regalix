"""Blueprint for handling repository manager's requests."""

import json

from flask import (
    Blueprint,
    current_app,
    jsonify,
    request
)

from sharedemos.apps.repository_manager.models import (
    db,
    Listener
)
from sharedemos.apps.repository_manager.main import RepositoryManager

repository_manager = Blueprint('repository_manager', __name__)


@repository_manager.route('/callback', methods=['POST'])
def callback():
    """
    Callback function for repository service.

    When the repository sevice completes processing the syncing,
    it sends a POST request to this URL with the details of
    parsed data.
    This function will invoke content creator,
    cache handlers. It'll also updates the sync log model with the sync status
    after each phase.
    """
    sync_data = json.loads(request.data)
    tenant_id = current_app.tenant_id
    listener = Listener.query.filter(
        Listener.client_token == unicode(sync_data["client_token"])
    ).first_or_404()

    sync_log = listener.get_latest_sync()
    section = listener.section

    repository_manager = RepositoryManager(
        user_id=section.created_by,
        section_id=section.id
    )
    if sync_data.get("status").lower() == "completed":
        response = repository_manager.read_json(
            sync_data["json_path"]
        )

        if response.get("status") == "CONTENT_CREATION_FAILED":
            db.session.rollback()
            section.is_deleted = True
            sync_log.status = sync_log.status + [u"FAILED"]
        else:
            sync_log.status = sync_log.status + \
                [unicode(sync_data['status'].upper())]
            if sync_data.get("status_message"):
                sync_log.description = sync_log.description + \
                    [unicode(sync_data["status_message"])]

            section.is_hidden = False

        db.session.add_all([section, sync_log])
        db.session.commit()
    else:
        sync_log.status = sync_log.status + [u"FAILED"]
        db.session.add(sync_log)
        db.session.commit()

    # sending mail to user
    repository_manager.notify_user(sync_log.status[-1])

    from sharedemos.tasks import delete_api_cache_data
    delete_api_cache_data.delay({
        'entity': 'section',
        'model_id': section.id,
        'delete_pattern': True,
        'delete_parent': bool(section.parent_id),
        'clear_all_products': not bool(section.parent_id),
        'tenant_id': tenant_id
    })

    delete_api_cache_data.delay({
        'delete_pattern': True,
        'entity': 'product_tree',
        'tenant_id': tenant_id
    })

    return jsonify({'SYNC_STATUS': sync_log.status[-1]})
