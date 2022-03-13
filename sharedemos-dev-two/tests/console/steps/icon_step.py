import os
from behave import given
from ..libs.utils import construct_dict_from_string


@given(u'User creates an icon with "{data}" to "{domain}" page')
def icon_create(context, domain, data):
    data_dict = construct_dict_from_string(data)
    if data_dict.get('icon'):
        icon_filestorage_obj = open(os.path.join(context.base_path, 'assets/images/' + data_dict['icon']))
        data_dict['icon'] = icon_filestorage_obj
    context.page = context.tenant_client.post('/api/icon',
                                              data=data_dict,
                                              follow_redirects=True,)


@given(u'User deletes an icon with id "{id}" to "{domain}" page')
def icon_delete(context, domain, id):
    context.page = context.tenant_client.delete('/api/icon/' + id,
                                                follow_redirects=True,)
