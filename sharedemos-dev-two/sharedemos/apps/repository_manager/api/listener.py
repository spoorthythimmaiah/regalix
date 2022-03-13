"""Repository Manager Listener API."""
import urllib
from uuid import uuid4

from flask import current_app, jsonify, session, url_for
from flask_restful import Resource, reqparse

from sharedemos.apps.repository_manager.models import(
    Connector,
    Listener,
    SyncLog
)
from sharedemos.models import db, Tenant, Section
from sharedemos.apps.repository_manager.main import RepositoryManager
from sharedemos.apps.repository_manager.utils import (
    decrypt_password,
    establish_repository_connection,
    initiate_sync_process
)
from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.api import delete_cache_with_pattern


parser = reqparse.RequestParser()
parser.add_argument("connector_id", required=True, type=unicode,
                    location="json", help="connector uuid required")
parser.add_argument('parent', type=unicode, location='json', default=None)
parser.add_argument("root_folder", required=True, type=unicode,
                    location="json", help="root folder  required")
parser.add_argument("relative_folder_path", required=True, type=unicode,
                    location="json", help="relative folder path required")


class RepositoryListenerApi(Resource):
    """Listener API handles POST."""

    @app_subscription_required("REPOSITORY_MANAGER")
    def post(self):
        """Create a new listener."""
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name
            )

        post_data = parser.parse_args()

        connector = Connector.query.filter(
            Connector.uuid == post_data["connector_id"],
            Connector.tenant_id == tenant_id,
            Connector.sync_enabled.__eq__(True)
        ).first_or_404()

        listener = Listener()
        listener.uuid = uuid4()
        listener.connector_id = connector.id
        listener.root_folder = post_data["root_folder"]
        listener.created_by = session.get("user_id")
        listener.modified_by = session.get("user_id")

        root_folder_path = urllib.quote(
            post_data["relative_folder_path"].strip("/")
        )
        callback = 'https://{}{}'.format(
            tenant.domain,
            url_for('repository_manager.callback')
        )
        connector_response = establish_repository_connection({
            "call_back_url": callback,
            "site_url": connector.site_url,
            "root_folder_path": root_folder_path,
            "user_name": connector.username,
            "user_password": decrypt_password(connector.password),
            "environment": current_app.config['PROJECT_ENV']
        })

        # send api request to sync_on_demand(Sharepoint service.)
        # create a section with given folder name and
        sync_response = initiate_sync_process(
            connector_response["client_token"]
        )
        if sync_response.get("status") != "success":
            raise SharedemosException(500, sync_response.get("status_message"))

        parent_id = None
        if post_data["parent"]:
            parent = Section.query.filter(
                Section.tenant_id == tenant_id,
                Section.slug == post_data["parent"]
            ).first_or_404()
            parent_id = parent.id

        # Initiate repository_manager instance with basic information.
        repository_manager = RepositoryManager(
            default_locale_id=tenant.default_locale_id,
            is_hidden=True,
            is_private=tenant.flags.is_private,
            user_id=session.get("user_id")
        )
        section = repository_manager.create_section({
            "name": post_data["root_folder"],
            "parent_id": parent_id
        })

        listener.client_token = connector_response["client_token"]
        listener.section_id = section.id
        db.session.add(listener)
        db.session.flush()

        sync_log = SyncLog()
        sync_log.uuid = uuid4()
        sync_log.sync_type = u"INTIAL_SYNC"
        sync_log.status = [u"IN_PROGRESS"]
        sync_log.listener_id = listener.id

        if sync_response.get("description"):
            sync_log.description = [sync_response["description"]]

        db.session.add(sync_log)
        db.session.commit()

        from sharedemos.tasks import delete_api_cache_data

        if not section.parent_id:
            delete_cache_with_pattern(
                delete_entity_type='all_products',
                clear_all_products=True,
                tenant=tenant
            )
        else:
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
            'tenant_id': tenant.id
        })

        return jsonify(status='CREATED')
