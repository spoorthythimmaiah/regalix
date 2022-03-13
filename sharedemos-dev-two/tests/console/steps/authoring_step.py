import json
from behave import given, then
from ..libs.utils import construct_dict_from_string, construct_dict_type_string_from_string


@given(u'User lands in "{domain}" settings page')
def load_tenant_settings_page(context, domain):
    context.page = context.tenant_client.get('/dashboard/library/')


@given(u'User gets "{domain}" authoring page')
def load_tenant_authoring_page(context, domain):
    context.page = context.tenant_client.get('/edit/')


@given(u'User posts data as "{data}" to "{domain}" edit page')
def section_create(context, domain, data):
    data_dict = construct_dict_from_string(data)
    if data_dict.get('video'):
        video = []
        video_url = {}
        poster_url = {}
        video_url['video_url'] = data_dict.get('video')
        video.append(video_url)
        poster_url['poster_url'] = data_dict.get('poster')
        video.append(poster_url)
        data_dict['video'] = video
    else:
        data_dict["video"] = ''
    if data_dict.get('related_products'):
        related_products = []
        product = data_dict.get('related_products')
        product = product.lower().replace(" ", "-")
        related_products.append(product)
        data_dict["related_products"] = related_products
    else:
        data_dict["related_products"] = ''
    context.page = context.tenant_client.post('/api/section?author=1',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@given(u'User wants to get all the sections related to "{domain}" domain')
def getting_all_sections(context, domain):
    context.page = context.tenant_client.get('/api/section/')


@given(u'User wants to get a section with the slug "{slug}" related to "{domain}" domain')
def getting_a_section_with_slug(context, slug, domain):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/section/' + slug)


@given(u'User wants to delete a section with the slug "{slug}" related to "{domain}" domain')
def deleting_a_section_with_slug(context, slug, domain):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.delete('/api/section/' + slug)


@given(u'User wants to alter a section with the slug "{slug}" related to "{domain}" domain with the alteration "{data}"')
def section_alter(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    data_dict["related_products"] = ''
    data_dict["video"] = ''
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.put('/api/section/' + slug + '?author=1',
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')


@given(u'User wants to reorder a section with the slug "{slug}" related to "{domain}" domain with the alteration "{data}"')
def section_position_alter(context, slug, domain, data):
    data_dict = construct_dict_from_string(data)
    data_dict["related_products"] = ''
    data_dict["video"] = ''
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1',
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User wants to disable a section with the slug "{slug}" related to "{domain}" domain with the alteration "{data}"')
def section_disable(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1',
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User wants to enable a section with the slug "{slug}" related to "{domain}" domain with the alteration "{data}"')
def section_enable(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    data_dict["related_products"] = ''
    data_dict["video"] = ''
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1',
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User likes the Section and registers with "{values}" to "{domain}"')
def cta_functionality(context, values, domain):
    data_dict = construct_dict_from_string(values)
    if data_dict.get('product'):
        data_dict['product'] = data_dict['product'].lower().replace(" ", "-")
    if data_dict.get('section'):
        data_dict['section'] = data_dict['section'].lower().replace(" ", "-")
    if data_dict.get('walkthrough'):
        data_dict['walkthrough'] = data_dict['walkthrough'].lower().replace(" ", "-")
    context.page = context.tenant_client.post('/post-user-details',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@then(u'"{values}" should be in the response')
def check_output(context, values):
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item in context.page.data


@then(u'"{values}" should not be in the response')
def check_not_output(context, values):
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item not in context.page.data
