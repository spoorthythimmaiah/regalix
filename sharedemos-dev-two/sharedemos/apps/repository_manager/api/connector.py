"""Repository Manager Connector API."""
import urllib
from uuid import uuid4

from flask import current_app, jsonify, request, session, url_for
from flask_restful import Resource, fields, marshal, reqparse

from sharedemos.models import db, Tenant
from sharedemos.apps.repository_manager.models import Connector
from sharedemos.apps.repository_manager.utils import (
    decrypt_password,
    encrypt_password,
    establish_repository_connection,
    fetch_repository_folders
)
from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.exceptions import SharedemosException

connector_api_fields = {
    "name": fields.String,
    "notify_enabled": fields.Boolean,
    "root_folder": fields.String,
    "site_url": fields.String,
    "sync_enabled": fields.Boolean,
    "username": fields.String,
    "connector_id": fields.String(attribute="uuid")
}

parser = reqparse.RequestParser()
parser.add_argument("name", required=True, type=unicode,
                    location="json", help="name required")
parser.add_argument("site_url", required=True, type=unicode,
                    location="json", help="site url required")
parser.add_argument("root_folder", required=True, type=unicode,
                    location="json", help="root folder  required")
parser.add_argument("username", required=True, type=unicode,
                    location="json", help="user name required")
parser.add_argument("password", type=unicode,
                    location="json", default=None)
parser.add_argument("platform", type=unicode, location="json",
                    help="platform required")
parser.add_argument('sync_enabled', type=bool,
                    location='json', default=False)
parser.add_argument('notify_enabled', type=bool,
                    location='json', default=False)


def generate_tree_structure(root_folder):
    """Generating tree structure for a folders in repository."""
    tree = {
        "name": root_folder["name"],
        "id": root_folder["id"],
        "folder_level_path": root_folder["folder_level_path"]
    }
    for folder in root_folder["sub_folders"]:
        if 'children' not in tree:
            tree['children'] = list()
        tree['children'].append(generate_tree_structure(folder))

    return tree


class RepositoryConnectorApi(Resource):
    """Connector API handles GET, POST, PUT, DELETE requests."""

    method_decorators = [app_subscription_required('REPOSITORY_MANAGER')]

    def get(self, uuid=None):
        """
        Return Connector detail/list.

        If 'uuid' is none, then query all connectors,
        else query specific connector
        and return list of folders in a repository instance.
        """
        tenant_id = current_app.tenant_id
        base_query = Connector.query.filter(
            Connector.tenant_id == tenant_id,
            Connector.is_deleted.__eq__(False)
        )
        if uuid:
            connector = base_query.filter(
                Connector.uuid == uuid
            ).first_or_404()

            if request.args.get("listing_folders"):
                folders = fetch_repository_folders(connector.client_token)
                folder_tree = []
                for folder in folders["root_folder"]["sub_folders"]:
                    _tree = generate_tree_structure(folder)
                    folder_tree.append(_tree)
                return jsonify({
                    "folders": folder_tree
                })

            return marshal(connector, connector_api_fields)

        connectors = base_query.order_by(Connector.created_at).all()
        return marshal(connectors, connector_api_fields)

    def post(self):
        """Create a new connector."""
        post_data = parser.parse_args()

        # 'Password' is mandatory for post request and optional for put request
        # Because of this reason we are checking the password here.
        if not post_data["password"]:
            raise SharedemosException(400, message="password missing")

        tenant = Tenant.query.get(current_app.tenant_id)
        callback = 'https://{}{}'.format(
            tenant.domain,
            url_for('repository_manager.callback')
        )
        connection_response = establish_repository_connection({
            "call_back_url": callback,
            "site_url": post_data["site_url"],
            "root_folder_path": urllib.quote(post_data["root_folder"]),
            "user_name": post_data["username"],
            "user_password": post_data["password"],
            "environment": current_app.config["PROJECT_ENV"]
        })

        connector = Connector(
            uuid=uuid4(),
            platform=post_data["platform"],
            name=post_data["name"],
            site_url=post_data["site_url"],
            root_folder=post_data["root_folder"],
            username=post_data["username"],
            password=unicode(encrypt_password(post_data["password"])),
            sync_enabled=post_data["sync_enabled"],
            notify_enabled=post_data["notify_enabled"],
            tenant_id=current_app.tenant_id,
            client_token=connection_response["client_token"],
            created_by=session.get("user_id"),
            modified_by=session.get("user_id")
        )

        db.session.add(connector)
        db.session.commit()

        return marshal(connector, connector_api_fields)

    def put(self, uuid):
        """Modify the existing connector details."""
        put_data = parser.parse_args()

        connector = Connector.query.filter(
            Connector.tenant_id == current_app.tenant_id,
            Connector.uuid == uuid,
            Connector.is_deleted.__eq__(False)
        ).first_or_404()

        if (
            connector.site_url != put_data["site_url"] or
            connector.root_folder != put_data["root_folder"] or
            connector.username != put_data["username"]
        ):
            password = decrypt_password(connector.password)
            if put_data["password"]:
                password = put_data["password"]
                connector.password = encrypt_password(password)

            callback = "https://{}{}".format(
                connector.tenant.domain,
                url_for('repository_manager.callback')
            )
            connection_response = establish_repository_connection({
                "call_back_url": callback,
                "site_url": put_data["site_url"],
                "root_folder_path": urllib.quote(put_data["root_folder"]),
                "user_name": put_data["username"],
                "user_password": password,
                "environment": current_app.config["PROJECT_ENV"]
            })

            connector.client_token = connection_response["client_token"]

        connector.platform = put_data["platform"]
        connector.name = put_data["name"]
        connector.site_url = put_data["site_url"]
        connector.root_folder = put_data["root_folder"]
        connector.username = put_data["username"]
        connector.notify_enabled = put_data["notify_enabled"]
        connector.sync_enabled = put_data["sync_enabled"]

        db.session.add(connector)
        db.session.commit()

        return marshal(connector, connector_api_fields)

    def delete(self, uuid):
        """Soft-delete a connector."""
        connector = Connector.query.filter(
            Connector.tenant_id == current_app.tenant_id,
            Connector.uuid == uuid,
            Connector.is_deleted.__eq__(False)
        ).first_or_404()

        connector.is_deleted = True

        db.session.add(connector)
        db.session.commit()

        return {"delete": "ok"}, 200
