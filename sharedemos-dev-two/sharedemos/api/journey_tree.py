from flask import current_app
from flask.ext.restful import Resource, fields, marshal

from sharedemos.models import Journey
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.utils import user_groups_fields

journey_fields = {
    'name': fields.String(attribute='_name'),
    'restricted_to_group_details': fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
    'slug': fields.String(default=''),
    'id': fields.Integer
}


class JourneyTreeApi(Resource):

    @has_author_access
    def get(self):
        """Function to get the journey details."""
        tenant_id = current_app.tenant_id
        journeys = Journey.query.filter(
            Journey.tenant_id == tenant_id,
            Journey.is_deleted.__eq__(False),
            Journey.is_enabled.__eq__(True)
        ).order_by(Journey.order).all()

        all_journey_details = []
        for journey in journeys:
            journey._name = journey.get_name()
            journey._restricted_to_group_details = journey.restricted_to_groups
            all_journey_details.append(journey)
        return marshal(all_journey_details, journey_fields), 200
