import re
import json
from werkzeug.datastructures import FileStorage

from flask import current_app, session
from flask.ext.restful import Resource, fields, reqparse, marshal
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import joinedload

from sharedemos.api.cta import create_cta
from sharedemos.api.custom_fields import MediaURL
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import (
    check_user_access,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    get_homepage_banner_details,
    get_locale_translation,
    save_independent_resources,
    upload_to_wistia
)
from sharedemos.libs.utils import (
    resource_api_fields
)
from sharedemos.models import (
    db,
    HomepageBanner,
    HomepageBannerTranslations,
    LeadCTAForm,
    Resource as ResourceModel,
    Tenant,
    TenantFlags
)

cta_details = {
    'cta_id': fields.Integer(attribute='_cta_id'),
    'name': fields.String(attribute='_name'),
    'link': fields.String(attribute='_link')
}

background_image_fields = {
    'path': MediaURL,
    'name': fields.String,
}
homepage_banner_api_fields = {
    'banner_id': fields.Integer(attribute='id'),
    'title': fields.String(attribute='_title'),
    'description': fields.String(attribute='_description'),
    'background_image': fields.Nested(
        background_image_fields,
        allow_null=True,
        attribute='_background_image'
    ),
    'resource': fields.Nested(
        resource_api_fields,
        allow_null=True,
        attribute='_resource'
    ),
    'cta_details': fields.Nested(
        cta_details, allow_null=True, attribute='_cta_details')
}


def save_resource(resource_file):
    if resource_file.mimetype.startswith('video'):
        resource = ResourceModel()
        resource.meta_data = MutableDict()
        resource.tenant_id = current_app.tenant_id
        resource.name = resource_file.filename
        upload_to_wistia(resource, resource_file)
    else:
        resource = save_independent_resources(
            resource_file,
            u'image'
        )

    db.session.add(resource)
    return resource


parser = reqparse.RequestParser()
parser.add_argument('title', type=unicode, location='form')
parser.add_argument('description', type=unicode, location='form')
parser.add_argument(
    'remove_background_image', type=lambda x: x == u'true',
    default=False, location='form'
)
parser.add_argument(
    'remove_resource', type=lambda x: x == u'true',
    default=False, location='form'
)
parser.add_argument('cta_details', type=json.loads, location='form')
parser.add_argument('background_image', type=FileStorage, location='files')

parser.add_argument('banner_resource', type=FileStorage, location='files')


class HomepageBannerApi(Resource):
    """Home Page Banner Api."""

    @check_user_access
    def get(self):
        tenant_id = current_app.tenant_id

        tenant_flag = TenantFlags.query.filter(
            TenantFlags.tenant_id == tenant_id
        ).first()

        if not tenant_flag.enable_homepage_banner:
            raise SharedemosException(
                400,
                message='HOMEPAGE BANNER ' +
                SharedemosException.FLAG_NOT_ENABLED
            )

        homepage_banner = get_homepage_banner_details()

        return format_data(
            marshal(homepage_banner, homepage_banner_api_fields)
        ), 200

    @has_author_access
    def post(self):
        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        post_data = parser.parse_args()
        if not [_data for _data in post_data.values() if _data]:
            return {"status": "NOT CREATED"}, 200

        if post_data.get("title"):
            invalid_name = re.match(
                r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
                post_data["title"]
            )

            if invalid_name:
                raise SharedemosException(
                    412,
                    message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        try:
            homepage_banner = HomepageBanner()
            homepage_banner.tenant_id = tenant_id
            homepage_banner.created_by = session.get('user_id')
            homepage_banner.modified_by = session.get('user_id')

            translation = HomepageBannerTranslations()
            translation.title = post_data['title']
            translation.description = post_data.get('description')
            translation.homepage_banner = homepage_banner
            translation.language_id = session['author']['locale']

            if post_data.get('background_image'):
                background_image = save_independent_resources(
                    post_data['background_image'],
                    u'image'
                )
                translation.background_image = background_image

            if post_data.get('banner_resource'):
                resource = save_resource(post_data['banner_resource'])
                translation.resource = resource

            db.session.add(translation)
            # Add cta to LeadCTA model.
            if post_data.get('cta_details'):
                for cta in post_data['cta_details']:
                    if cta.get('action') == u'add':
                        cta = create_cta(cta, tenant.default_locale_id)
                        homepage_banner.cta_list.append(cta)

            db.session.add(homepage_banner)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise SharedemosException(400, message=str(e))

        return {"status": "CREATED"}, 201

    @has_author_access
    def put(self, id):
        tenant_id = current_app.tenant_id

        homepage_banner = HomepageBanner.query.options(
            joinedload(HomepageBanner.tenant),
            joinedload(HomepageBanner.translations),
            joinedload(HomepageBanner.translations).joinedload(
                HomepageBannerTranslations.resource),
            joinedload(HomepageBanner.translations).joinedload(
                HomepageBannerTranslations.background_image),
            joinedload(HomepageBanner.cta_list),
            joinedload(HomepageBanner.cta_list).joinedload(
                LeadCTAForm.translations)
        ).filter(
            HomepageBanner.tenant_id == tenant_id,
            HomepageBanner.id == id
        ).first_or_404()

        put_data = parser.parse_args()
        if not [_data for _data in put_data.values() if _data]:
            db.session.delete(homepage_banner)
            db.session.commit()
            return {"status": "DELETED"}, 200

        if put_data.get("title"):
            invalid_name = re.match(
                r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
                put_data["title"]
            )

            if invalid_name:
                raise SharedemosException(
                    412,
                    message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        try:
            homepage_banner.modified_by = session.get('user_id')
            translation = get_locale_translation(homepage_banner)
            if not translation:
                translation = HomepageBannerTranslations()
                translation.language_id = session['author']['locale']
                translation.homepage_banner = homepage_banner

            translation.title = put_data['title']
            translation.description = put_data.get('description')

            resource_to_remove = []
            if put_data.get('remove_resource'):
                resource_to_remove.append(translation.resource)
                translation.resource = None

            if put_data.get('remove_background_image'):
                resource_to_remove.append(translation.background_image)
                translation.background_image = None

            if put_data.get('background_image'):
                background_image = save_independent_resources(
                    put_data['background_image'],
                    u'image'
                )
                translation.background_image = background_image

            if put_data.get('banner_resource'):
                resource = save_resource(put_data['banner_resource'])
                translation.resource = resource

            db.session.add(translation)

            if put_data.get('cta_details'):
                #  Delete removed cta from HomepageBannerCTA model.
                for cta in put_data['cta_details']:
                    if cta.get('action') == u'remove':
                        remove_cta = LeadCTAForm.query.get(cta['cta_id'])
                        homepage_banner.cta_list.remove(remove_cta)

                    elif cta.get('action') == u'add' and not cta.get('cta_id'):
                        tenant = homepage_banner.tenant
                        if session['author']['locale'] != tenant.default_locale_id:
                            raise SharedemosException(
                                412,
                                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                                % tenant.default_locale.name
                            )
                        cta = create_cta(cta, tenant.default_locale_id)
                        homepage_banner.cta_list.append(cta)

            db.session.add(homepage_banner)
            for resource in resource_to_remove:
                db.session.delete(resource)

            db.session.commit()

        except Exception as e:
            db.session.rollback()
            raise SharedemosException(
                400,
                message=str(e)
            )

        return {"status": "UPDATED"}, 200
