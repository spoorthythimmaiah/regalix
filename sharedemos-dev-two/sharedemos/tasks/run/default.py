import requests

from flask import current_app
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.models import (
    db,
    ReportTenant,
    Resource as ResourceModel,
    Slide
)
from sharedemos.libs.algolia import (
    init_algolia,
    uuid_from_id,
)
from sharedemos.tasks.factory import celery
from sharedemos.tasks.libs import convert_html_to_image
from sharedemos.libs.url import static_url


@celery.task(queue='default')
def create_update_tenant(tenant_data):
    """Create_update_tenant."""
    tenant = ReportTenant.query.get(tenant_data['id'])
    '''if tenant has domain get uuid for old domain for comparision purpose
     if domain has changed'''

    if not tenant:
        tenant = ReportTenant()
        tenant.id = tenant_data['id']
    tenant.name = tenant_data['name']
    tenant.domain = tenant_data['domain']
    tenant.title = tenant_data['title']
    tenant.timezone = tenant_data['timezone']
    db.session.add(tenant)
    db.session.commit()


@celery.task(queue='default')
def server_side_image_generation(data_dict):
    """Server_side_image_generation."""
    slide = Slide.query.get(data_dict['slide_id'])
    if slide and slide.primary_resource:
        resource_trans = slide.primary_resource.translations()
        for re_trans in resource_trans:
            image_file_name = convert_html_to_image(
                re_trans.content,
                data_dict['host'],
                re_trans.language_id)
            resource = ResourceModel()
            resource.language_id = re_trans.language_id
            resource.tenant_id = re_trans.tenant_id
            resource.name = re_trans.name
            resource.resource_type = u'image'
            resource.path = unicode(image_file_name)
            resource.meta_data = MutableDict()

            if resource.language_id == re_trans.tenant.default_locale_id:
                default_res_id = re_trans.id
            else:
                resource.meta_data = MutableDict({
                    'default_res_id': default_res_id
                })
            db.session.add(resource)
            db.session.flush()

            if re_trans.language_id == re_trans.tenant.default_locale_id:
                slide.secondary_resource_id = resource.id
            db.session.add(slide)
            db.session.commit()

            # Update thumbnail path to algolia after generating it.
            thumbnail_url = static_url(filename="media/" + resource.path)
            algolia_index = init_algolia(slide.tenant.domain)
            object_id = uuid_from_id(slide.walkthrough.id, 'walkthrough')
            algolia_index.partial_update_object({
                'objectID': object_id,
                'image_url_' + re_trans.language_id: thumbnail_url
            })


@celery.task(queue='default')
def update_wistia_thumbnail(resource):
    """Fetch and update new thumbnail from wistia."""
    resource = ResourceModel.query.get(resource['resource_id'])
    if resource:
        try:
            response = requests.get(
                current_app.config.get('WISTIA_GET_IFRAME_URL') +
                resource.meta_data['wistia_hashed_id']
            ).json()
            if response and 'thumbnail_url' in response:
                resource.meta_data['thumbnail_url'] = unicode(
                    response['thumbnail_url'])
        except Exception as e:
            print e
        else:
            db.session.add(resource)
            db.session.commit()
