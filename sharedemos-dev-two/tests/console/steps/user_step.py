import json
from behave import given
from mock import patch
from ..libs.utils import construct_dict_from_string, login


@given(u'Admin deletes a user with "{values}" of "{domain}" user permissions page')
def deleting_user(context, values, domain):
    login(context)
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.delete('/api/user',
                                                data=json.dumps(data_dict),
                                                follow_redirects=True,
                                                content_type='application/json')


@given(u'Admin lands in "{domain}" user permissions page')
def load_user_premissions_page(context, domain):
    context.page = context.tenant_client.get('/dashboard/users/')


@given(u'Admin posts data as "{values}" to "{domain}" user permissions page')
def adding_user(context, values, domain):
    with patch("smtplib.SMTP") as mock_smtp:
        data_dict = construct_dict_from_string(values)
        context.page = context.tenant_client.post('/api/user',
                                                  data=data_dict,
                                                  follow_redirects=True)
        context.mail_body = mock_smtp.return_value.sendmail.call_args
        if context.mail_body:
            mail_body_args = context.mail_body.call_list()[0][0][2].partition('href="')
            register_link = mail_body_args[2].partition('" style=')
            register_link = register_link[0].partition("/register/")
            context.register_link = "/register/" + register_link[2]


@given(u'Admin re-adds user with data as "{values}" to "{domain}" user permissions page')
def re_adding_user(context, values, domain):
    login(context)
    with patch("smtplib.SMTP") as mock_smtp:
        data_dict = construct_dict_from_string(values)
        if data_dict.get("re_add") == u'True':
            data_dict['re_add'] = True
        context.page = context.tenant_client.post('/api/user',
                                                  data=data_dict,
                                                  follow_redirects=True)
        context.mail_body = mock_smtp.return_value.sendmail.call_args
        if context.mail_body:
            mail_body_args = context.mail_body.call_list()[0][0][2].partition('href="')
            register_link = mail_body_args[2].partition('" style=')
            register_link = register_link[0].partition("/register/")
            context.re_add_register_link = "/register/" + register_link[2]


@given(u'Admin renames the user as "{values}" to "{domain}" user permissions page')
def renaming_user(context, values, domain):
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.put('/api/user',
                                             data=data_dict,
                                             follow_redirects=True)


@given(u'Admin alters the role of the user as "{values}" to "{domain}" user permissions page')
def role_user(context, values, domain):
    login(context)
    data_dict = construct_dict_from_string(values)
    if data_dict['role_id'] == '2':
        data_dict['remove_restrictions'] = '"false"'
    context.page = context.tenant_client.put('/api/user',
                                             data=data_dict,
                                             follow_redirects=True)


@given(u'Admin wants to get admin users of "{domain}" user permissions page')
def admin_users(context, domain):
    login(context)
    context.page = context.tenant_client.get('/api/user/1')


@given(u'Admin wants to get author users of "{domain}" user permissions page')
def author_users(context, domain):
    login(context)
    context.page = context.tenant_client.get('/api/user/2')


@given(u'Admin wants to get analyst users of "{domain}" user permissions page')
def analyst_users(context, domain):
    login(context)
    context.page = context.tenant_client.get('/api/user/3')


@given(u'added user is verfied from the Mail')
def verfiying_users(context):
    context.page = context.tenant_client.get(context.register_link)


@given(u're-added user is verfied from the Mail')
def verfiying_re_added_users(context):
    context.page = context.tenant_client.get(context.re_add_register_link)


@given(u'User sets password as "{values}"')
def set_password(context, values):
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.post(context.register_link,
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'Admin logins to the domain')
def admin_login(context):
    login(context)


@given(u'Current User logsout')
def admin_logout(context):
    context.page = context.tenant_client.get('/logout/')
