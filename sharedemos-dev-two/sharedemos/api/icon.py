import werkzeug
from flask import current_app, jsonify
from flask.ext.restful import Resource, fields, reqparse, marshal

from sharedemos.models import db, IconLibrary
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    create_file,
    log_last_activity,
)

icon_details = {
    'icon_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'path': fields.String,
}

parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=unicode, location='form',
                    help='Icon name required')
parser.add_argument('icon', required=True,
                    type=werkzeug.datastructures.FileStorage,
                    location='files', help='Icon file required')


def create_icon(icon_data):
    icon_hex_name = create_file(icon_data['icon'])
    # update/insert icon
    tenant_id = getattr(current_app, 'tenant_id', None)
    icon_lib = IconLibrary()
    icon_lib.name = unicode(icon_data['name'])
    icon_lib.path = icon_hex_name
    icon_lib.tenant_id = tenant_id
    return icon_lib


class IconApi(Resource):
    method_decorators = [has_author_access]

    def post(self):
        post_data = parser.parse_args()
        icon_library = create_icon(post_data)

        db.session.add(icon_library)
        log_last_activity('created', 'icon', icon_library)
        db.session.commit()
        return format_data(marshal(icon_library, icon_details)), 200

    def delete(self, id):
        """Delete icon entity from IconLibray."""
        if not id:
            raise SharedemosException(
                400,
                message="ICON " + SharedemosException.ID_MISSING
            )
        try:
            icon = IconLibrary.query.get(id)
            db.session.delete(icon)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise SharedemosException(
                400,
                message=str(e)
            )

        else:
            log_last_activity('deleted', 'icon', entity_id=id)
            db.session.commit()

        return jsonify(status='DELETED')
