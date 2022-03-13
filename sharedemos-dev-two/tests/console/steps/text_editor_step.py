import os
import json
from behave import given, then, when
from sharedemos.models import Tenant
from bs4 import BeautifulSoup
from ..libs.utils import construct_dict_from_string, construct_dict_type_string_from_string


@then(u'"{values}" should be in the Draft data of page')
def something(context, values):
    result = context.page.data
    custom_result = json.loads(result)
    context.image_path = str(custom_result['primary_resource']['path'])
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item in context.page.data


@then(u'user creates text editor resource with "{data}" to "{domain}" edit page')
def create_text_editor_resource(context, data, domain):
    data_dict = construct_dict_from_string(data)
    path = "/static/media/" + context.image_path
    if 'two.jpg' in data_dict['content']:
        replace_result = data_dict['content'].replace('two.jpg', path, 1)
        data_dict['content'] = replace_result
    context.page = context.tenant_client.post('/api/resource', data=data_dict, follow_redirects=True)


@given(u'user publishes walkthrough "{slug}" with "{data}" to "{domain}" edit page')
def publish_text_editor(context, slug, data, domain):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@given(u'Admin Edits the "{tenant_name}" tenant with "{values}"')
def edit_tenant(context, tenant_name, values):
    tenant = Tenant.query.filter(Tenant.name == tenant_name).first()
    tenant_id = str(tenant.id)
    data_dict = construct_dict_from_string(values)
    if data_dict.get('logo') != unicode('None'):
        resource_filestorage_obj = open(os.path.join(context.base_path, 'assets/images/' + data_dict['logo']))
        data_dict['logo'] = resource_filestorage_obj
    context.page = context.client.post('/admin/tenant/edit/?url=/admin/tenant/&id=' + tenant_id, data=data_dict, follow_redirects=True)


@then(u'"{message}" should be displayed in page')
def display_message(context, message):
    soup = BeautifulSoup(context.page.data)
    tr = soup.find('td', text='testing').parent
    td = tr.findAll('td')[5].img.get('src')
    context.path = td.split('?')[0]


@then(u'"{footer_text}" as footer text and footer image should be present in home page')
def confirm_footer(context, footer_text):
    context.page = context.tenant_client.get('/')
    assert context.path and footer_text in context.page.data
