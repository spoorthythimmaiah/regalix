from flask import current_app, g, request
from flask.ext.restful import Resource, fields, marshal

from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.api import add_to_api_cache, construct_cache_key_list, format_data
from sharedemos.libs.helpers import get_tenant_walkthrough_slides_counts

count_details = {
    'total_slides': fields.Integer(default=0),
    'total_demos': fields.Integer(default=0),
}


class DashboardApi(Resource):

    @has_author_access
    def get(self):
        get_cache = False if request.args.get('get_cache') and request.args.get('get_cache') == 'False' else True
        tenant_id = getattr(current_app, 'tenant_id', None)

        entity = 'dashboard_user_' + str(g.user.id)

        # Cache contents of Demos Count and Slides Count.
        cache = getattr(current_app, 'cache', None)
        dashboard_count_key = construct_cache_key_list(entity=entity)
        demos_slides_count = cache.get(dashboard_count_key[0])
        if not demos_slides_count or not get_cache:
            demos_slides_count = get_tenant_walkthrough_slides_counts(tenant_id)
            add_to_api_cache(entity=entity, api_data=demos_slides_count)

        counts = {'total_demos': demos_slides_count.get('total_draft_demos'), 'total_slides': demos_slides_count.get('total_draft_slides')}
        return format_data(marshal(counts, count_details))
