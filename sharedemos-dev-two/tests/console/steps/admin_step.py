from behave import given, then
from sharedemos.models import Tenant
from ..libs.utils import construct_dict_from_string, get_tenant_app


@then(u'"{msg}" should be displayed for "{tag}"')
def check_the_message(context, msg, tag):
    element = '<input id="' + tag + '" name="' + tag + '" type="text" value="">'
    assert msg in context.page.data
    assert element in context.page.data


@given(u'Admin creates tenant with "{values}"')
def tenant_create(context, values):
    data_dict = construct_dict_from_string(values)
    context.page = context.client.post('/admin/tenant/new/', data=data_dict, follow_redirects=True)
    if data_dict.get("domain"):
        context.app.domain = data_dict.get("domain")


@given(u'Admin creates User with "{values}"')
def user_create(context, values):
    data_dict = construct_dict_from_string(values)
    if(data_dict.get("tenant")):
        tenant_id = Tenant.query.filter_by(name=data_dict.get("tenant")).first()
        data_dict["tenant"] = tenant_id.id
    else:
        data_dict["tenant"] = 0
    if data_dict.get("role") == "admin":
        data_dict["role"] = 1
    elif data_dict.get("role") == "author":
        data_dict["role"] = 2
    elif data_dict.get("role") == "analyst":
        data_dict["role"] = 3
    context.page = context.client.post('/admin/user/new/', data=data_dict, follow_redirects=True)


@given(u'Admin creates langauage with "{values}"')
def language_create(context, values):
    data_dict = construct_dict_from_string(values)
    context.page = context.client.post('/admin/languages/new/', data=data_dict, follow_redirects=True)


@given(u'Admin creates theme for a tenant "{values}"')
def tenant_theme_create(context, values):
    data_dict = construct_dict_from_string(values)
    if(data_dict.get("tenant")):
        tenant_id = Tenant.query.filter_by(name=data_dict.get("tenant")).first()
        data_dict["tenant"] = tenant_id.id
    else:
        data_dict["tenant"] = 0
    context.page = context.client.post('/admin/tenanttheme/new/', data=data_dict, follow_redirects=True)


@given(u'User creates a app for "{domain}"')
def app_create(context, domain):
    context.tenant_client = get_tenant_app(domain)
