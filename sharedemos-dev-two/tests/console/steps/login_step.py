from behave import given
from ..libs.utils import get_tenant_app, construct_dict_from_string


@given(u'User lands in "{domain}" page')
def load_tenant_page(context, domain):
    context.page = context.tenant_client.get('/')


@given(u'User lands in "{domain}" login page')
def load_tenant_login_page(context, domain):
    context.page = context.tenant_client.get('/login/')


@given(u'User logins to "{domain}" domain with "{values}"')
def tenant_login(context, values, domain):
    context.tenant_client = get_tenant_app(domain)
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.post('/complete/email/',
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'User logs in to "{domain}" domain for language "{language}" with "{values}"')
def tenant_logs_in(context, values, domain, language):
    language = language.split(" ")
    if len(language) == 1:
        context.tenant_client = get_tenant_app(domain)
        context.tenant_client.application.config['DEFAULT_LOCALE'] = language[0]
    else:
        context.tenant_client = get_tenant_app(domain, language[1])
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.post('/complete/email/',
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'User logs in to "{domain}" domain with languages priority "{languages}" with "{values}"')
def tenant_logs_in_diff_id(context, values, domain, languages):
    context.tenant_client = get_tenant_app(domain, languages)
    data_dict = construct_dict_from_string(values)
    context.page = context.tenant_client.post('/complete/email/',
                                              data=data_dict,
                                              follow_redirects=True)
