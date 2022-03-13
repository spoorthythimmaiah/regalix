import json
from behave import given
from ..libs.utils import construct_dict_from_string


@given(u'Admin wants to add a CTA button of "{data}" to "{domain}" edit page')
def cta_button(context, domain, data):
    all_data_dict = construct_dict_from_string(data)
    data_dict = {}
    if all_data_dict.get('name') is not None:
        data_dict['name'] = all_data_dict['name']
    if all_data_dict.get('text') is not None:
        options_dict = {}
        options_dict['text'] = all_data_dict['text']
        options_dict['campaign_message'] = all_data_dict['campaign_message']
        options_dict['type'] = all_data_dict['type']
        if all_data_dict.get('fields') is not None:
            options_dict['fields'] = all_data_dict['fields'].split(",")
        if all_data_dict.get('href') is not None:
            options_dict['href'] = all_data_dict['href']
        data_dict['options'] = options_dict
    context.page = context.tenant_client.post('/api/cta',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@given(u'Admin wants to get all the cta buttons related to "{domain}" domain')
def getting_all_cta_buttons(context, domain):
    context.page = context.tenant_client.get('/api/cta/')
