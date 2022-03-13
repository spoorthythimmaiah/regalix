import json
import datetime as dt
from behave import given
from mock import patch
from sharedemos.models import AudienceCompany, AudienceEmployee
from ..libs.utils import construct_dict_from_string, login


@given(u'User lands in audience page')
def load_audience_page(context):
    context.page = context.tenant_client.get('/dashboard/audiences/')


@given(u'Admin adds a company with data "{data}" to "{domain}" audience page')
def add_company(context, domain, data):
    data_dict = construct_dict_from_string(data)
    context.page = context.tenant_client.post('/api/audience-company/',
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'Admin adds a user related to company with data "{data}" to the "{company}" company of "{domain}" audience page')
def add_user(context, domain, data, company):
    with patch("smtplib.SMTP") as mock_smtp:
        data_dict = construct_dict_from_string(data)
        company = AudienceCompany.query.filter_by(name=company).first()
        data_dict['company_id'] = company.id
        context.page = context.tenant_client.post('/api/audience-employee/' + str(company.id),
                                                  data=data_dict,
                                                  follow_redirects=True)
        context.mail_body = mock_smtp.return_value.sendmail.call_args
        if context.mail_body:
            mail_body_args = context.mail_body.call_list()[0][0][2].partition('href="')
            audience_register_link = mail_body_args[2].partition('" style=')
            audience_register_link = audience_register_link[0].partition("/audiences/")
            context.app.audience_url = "/audiences/" + audience_register_link[2]


@given(u'Admin edits user "{employee}" with data "{data}" of "{company}" company of "{domain}" audience page')
def edit_user(context, domain, data, company, employee):
    data_dict = construct_dict_from_string(data)
    company = AudienceCompany.query.filter_by(name=company).first()
    employee = AudienceEmployee.query.filter_by(first_name=employee).first()
    data_dict['company_id'] = company.id
    context.page = context.tenant_client.patch('/api/audience-employee/' + str(company.id) + "/" + str(employee.id),
                                               data=data_dict,
                                               follow_redirects=True)


@given(u'Admin shares the contents "{contents}" with "{data}" related to company "{company}" to "{domain}" audience page')
def share_content(context, domain, data, contents, company):
    data_dict = construct_dict_from_string(data)
    content_list = contents.split(" and ")
    data_dict['section_list'] = content_list
    if data_dict.get('company_enabled') == u'False':
        data_dict['company_enabled'] = False
    if data_dict.get('link_expiry_date') is None:
        data_dict['link_expiry_date'] = dt.datetime.today().strftime("%m/%d/%Y")
    company = AudienceCompany.query.filter_by(name=company).first()
    context.page = context.tenant_client.post('/api/audience-content/' + str(company.id),
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@given(u'Admin edits a company data with "{data}" of company "{company}" to "{domain}" audience page')
def edit_company(context, domain, data, company):
    data_dict = construct_dict_from_string(data)
    company = AudienceCompany.query.filter_by(name=company).first()
    context.page = context.tenant_client.patch('/api/audience-company/' + str(company.id),
                                               data=data_dict,
                                               follow_redirects=True)


@given(u'User wants to see the Shared Private content by accessing the audience URL sent to his mail')
def audience_url_for_shared_content(context):
    context.page = context.tenant_client.get(context.app.audience_url)


@given(u'User signups to the audience signup page with the data "{data}"')
def user_signup(context, data):
    data_dict = construct_dict_from_string(data)
    context.page = context.tenant_client.post(context.app.audience_url + "user",
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'Audience User wants to see the Shared Private content')
def all_shared_content_for_audience_user(context):
    audience_register_link = context.app.audience_url.split("audiences/")
    context.page = context.tenant_client.get("api/section?company=" + audience_register_link[1])


@given(u'Audience User wants to see the "{section}" Private content')
def particular_section_private_content_for_audience_user(context, section):
    section = section.lower().replace(" ", "-")
    audience_register_link = context.app.audience_url.split("audiences/")
    context.page = context.tenant_client.get("api/section/" + section + "?company=" + audience_register_link[1])


@given(u'Normal User wants to see the private contents')
def noraml_user_content(context):
    login(context)
    context.page = context.tenant_client.get('/api/section/')


@given(u'Normal User wants to see the "{section}" Private content')
def normal_section_content(context, section):
    login(context)
    section = section.lower().replace(" ", "-")
    context.page = context.tenant_client.get("api/section/" + section)


@given(u'Admin wants to delete a user "{employee}" of the "{company}" company related to "testing.sharedemos.com:5000" domain')
def delete_user(context, company, employee):
    company = AudienceCompany.query.filter_by(name=company).first()
    employee = AudienceEmployee.query.filter_by(first_name=employee).first()
    context.page = context.tenant_client.delete('/api/audience-employee/' + str(company.id) + "/" + str(employee.id))


@given(u'Admin want to see all the users realted to the company "{company}" of "{domain}" domain')
def all_users(context, company, domain):
    company = AudienceCompany.query.filter_by(name=company).first()
    context.page = context.tenant_client.get('/api/audience-employee/' + str(company.id))
    if context.page.data.find("Forbidden") != -1:
        login(context)
        context.page = context.tenant_client.get('/api/audience-employee/' + str(company.id))
