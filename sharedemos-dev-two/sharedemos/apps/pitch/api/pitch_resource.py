"""Sharedemos Apps -PitchResource API page."""
from flask import current_app, jsonify
from flask.ext.restful import Resource, reqparse

from sqlalchemy.ext.mutable import MutableDict
from werkzeug.datastructures import FileStorage

from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import create_file
from sharedemos.models import Tenant, db

from sharedemos.apps.pitch.models import (
    Pitch,
    PitchSection,
    PitchSectionTranslations,
    PitchResource
)

parser = reqparse.RequestParser()
parser.add_argument(
    'resource', required=True, type=FileStorage,
    location='files', help='Recording resource required.'
)
parser.add_argument(
    'resource_type', location='form', type=unicode, help='Type recording.'
)
parser.add_argument(
    'section_uuid', location='form', type=unicode, help='PitchSection uuid.'
)


class PitchResourceApi(Resource):
    """PitchResource API to handle POST request."""

    @app_subscription_required('PITCH')
    def post(self):
        """
        Create a new Pitch Resource.

        Handles request coming from
            -PitchSection to create new base_pitch.
            -Recording to create new recording resource.
        """
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.filter(Tenant.id == tenant_id).first_or_404()

        post_data = parser.parse_args()
        if post_data.get('section_uuid'):
            """
            If the request is to save/submit recording from end user,
            then pre-validate the number of submitted recordings and
            raise error if max_attempt is reached.
            """
            section = PitchSection.query.join(Pitch).filter(
                Pitch.tenant_id == tenant_id,
                Pitch.is_deleted.__eq__(False),
                PitchSection.is_deleted.__eq__(False),
                PitchSection.uuid == post_data['section_uuid']
            ).first_or_404()

            locale_id = tenant.default_locale_id

            section_trans = PitchSectionTranslations.query.filter(
                PitchSectionTranslations.section_id == section.id,
                PitchSectionTranslations.language_id == locale_id
            ).first()
            attempts = len(section_trans.recordings)

            if section.max_attempts and attempts >= section.max_attempts:
                raise SharedemosException(400, message='LIMIT_REACHED')

        resource = PitchResource()
        resource.language_id = tenant.default_locale_id
        resource.meta_data = MutableDict()
        resource.tenant_id = tenant_id
        resource.path = create_file(post_data['resource'])
        resource.name = post_data['resource'].filename
        resource.resource_type = post_data.get('resource_type', u'video')

        db.session.add(resource)
        db.session.commit()

        return jsonify(status='CREATED', resource_id=resource.id)
