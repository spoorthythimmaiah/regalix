from flask import current_app
from flask.ext.restful import fields, Resource, marshal

from sharedemos.models import Tag
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access


tag_details = {
    'name': fields.String,
}


class TagApi(Resource):

    method_decorators = [has_author_access]

    def get(self, search_text=None):
        tenant_id = getattr(current_app, 'tenant_id', None)
        tags = list()
        if search_text:
            tags = Tag.query.filter(
                (Tag.tenant_id == tenant_id) &
                (Tag.name.ilike("%" + search_text + "%"))
            ).all()

        return format_data(marshal(tags, tag_details, envelope='tags'))
