import os
import json
from behave import given, then
from sharedemos.models import PlaylistTranslations
from ..libs.utils import construct_dict_from_string, construct_dict_type_string_from_string


@given(u'User gets "{slug}" walkthrough of "{domain}" page')
def getting_walkthrough(context, domain, slug):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/walkthrough/' + slug)


@given(u'User creates walkthrough with "{data}" with the playlist "{playlist}" to "{domain}" edit page')
def create_walkthrough(context, domain, data, playlist):
    data_dict = construct_dict_from_string(data)
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    data_dict['playlist_id'] = playlist.playlist_id
    context.page = context.tenant_client.post('/api/walkthrough/?author=1',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@then(u'User publishes walkthrough "{slug}" with "{data}" to "{domain}" edit page')
def publish_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User renames walkthrough "{slug}" with "{data}" to "{domain}" edit page')
def rename_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.put('/api/walkthrough/' + slug,
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')


@given(u'User gives text walkthrough "{slug}" with "{data}" to "{domain}" edit page')
def editing_text_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    final_data_dict = dict()
    final_data_dict['notes'] = data_dict
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(final_data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User wants to reoder a slide with the slug "{slug}" realted to "{domain}" domain with the alteration "{data}"')
def reordering_slide_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    data_dict['target'] = int(data_dict['target'])
    data_dict['after'] = int(data_dict['after'])
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User disables the "{slug}" walkthrough with "{data}" in "{domain}" edit page')
def hiding_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User enables the "{slug}" walkthrough with "{data}" in "{domain}" edit page')
def unhiding_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User creates resource with "{data}" to "{domain}" edit page')
def creating_a_resource(context, domain, data):
    data_dict = construct_dict_from_string(data)
    if data_dict.get('resource') != unicode('None') and data_dict.get('type') == u'image':
        resource_filestorage_obj = open(os.path.join(context.base_path, 'assets/images/' + data_dict['resource']))
        data_dict['resource'] = resource_filestorage_obj
    elif data_dict.get('resource') != unicode('None') and data_dict.get('type') == u'video':
        resource_filestorage_obj = open(os.path.join(context.base_path, 'assets/videos/' + data_dict['resource']))
        data_dict['resource'] = resource_filestorage_obj
    elif data_dict.get('resource') != unicode('None') and data_dict.get('type') == u'audio':
        resource_filestorage_obj = open(os.path.join(context.base_path, 'assets/audios/' + data_dict['resource']))
        data_dict['resource'] = resource_filestorage_obj

    context.page = context.tenant_client.post('/api/resource?author=1',
                                              data=data_dict,
                                              follow_redirects=True)


@then(u'User creates resource with "{data}" with action_event as "{action_event}" and frame_number as "{frame_number}" to "{domain}"')
def create_frame(context, data, action_event, frame_number, domain):
    data_dict = construct_dict_from_string(data)
    if data_dict.get('resource') != unicode('None') and data_dict.get('type') == u'360':
        resource_filestorage_obj = open(os.path.join(context.base_path, 'assets/images/' + data_dict['resource']))
        data_dict['resource'] = resource_filestorage_obj
    frame_data = '{"action_event":"' + action_event + '","path":"' + context.folder_path + '","frame_number":"' + frame_number + '"}'
    data_dict['frames'] = frame_data
    context.page = context.tenant_client.post('/api/resource', data=data_dict, follow_redirects=True)


@given(u'User creates resource with "{data}" with action_event as "{action_event}" to "{domain}"')
def intiate_360(context, data, action_event, domain):
    data_dict = construct_dict_from_string(data)
    frame_data = '{"action_event":"' + action_event + '","path":" "}'
    data_dict['frames'] = frame_data
    context.page = context.tenant_client.post('/api/resource',
                                              data=data_dict,
                                              follow_redirects=True)


@given(u'User creates resource with external url with "{data}" to "{domain}" edit page')
def creating_a_resource_external(context, domain, data):
    data_dict = construct_dict_from_string(data)
    context.page = context.tenant_client.post('/api/resource',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@given(u'User creates a hotspot with "{data}" to walkthrough "{slug}" of "{domain}" edit page')
def creating_a_hot_spot(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    data_dict_hotspot = {}
    hotspot_details = {}
    slide_number = {}
    text = {}
    display = {}
    if data_dict.get('id'):
        data_dict_hotspot['id'] = int(data_dict['id'])
    data_dict_hotspot['slide_order'] = int(data_dict['slide_order'])
    hotspot_details['hotspot_type'] = data_dict.get('hotspot_type')
    if data_dict.get('href'):
        href = {}
        href['href'] = data_dict.get('href')
        slide_number['slide_number'] = href
    else:
        slide_number['slide_number'] = data_dict.get('slide_number')
    hotspot_details['action'] = slide_number
    text['text'] = data_dict.get('text')
    if data_dict.get('my'):
        text['my'] = data_dict.get('my')
    if data_dict.get('at'):
        text['at'] = data_dict.get('at')
    hotspot_details['callout'] = text
    display['color'] = data_dict.get('color')
    display['width'] = data_dict.get('width')
    display['height'] = data_dict.get('height')
    display['top'] = data_dict.get('top')
    display['left'] = data_dict.get('left')
    hotspot_details['display'] = display
    hotspot_details['event'] = data_dict.get('event')
    data_dict_hotspot['hotspot'] = hotspot_details
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict_hotspot),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User edits a hotspot with "{data}" to walkthrough "{slug}" of "{domain}" edit page')
def editing_a_hot_spot(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    data_dict_hotspot = {}
    hotspot_details = {}
    slide_number = {}
    text = {}
    display = {}
    data_dict_hotspot['slide_order'] = int(data_dict['slide_order'])
    hotspot_details['hotspot_type'] = data_dict.get('hotspot_type')
    if data_dict.get('href'):
        href = {}
        href['href'] = data_dict.get('href')
        slide_number['slide_number'] = href
    else:
        slide_number['slide_number'] = data_dict.get('slide_number')
    hotspot_details['action'] = slide_number
    text['text'] = data_dict.get('text')
    if data_dict.get('my'):
        text['my'] = data_dict.get('my')
    if data_dict.get('at'):
        text['at'] = data_dict.get('at')
    hotspot_details['callout'] = text
    display['color'] = data_dict.get('color')
    display['width'] = data_dict.get('width')
    display['height'] = data_dict.get('height')
    display['top'] = data_dict.get('top')
    display['left'] = data_dict.get('left')
    hotspot_details['display'] = display
    hotspot_details['event'] = data_dict.get('event')
    data_dict_hotspot['hotspot'] = hotspot_details
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict_hotspot),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User deletes slide of walkthrough "{slug}" with "{data}" of "{domain}" edit page')
def deleting_a_slide(context, domain, slug, data):
    slug = slug.lower().replace(" ", "-")
    data_dict = construct_dict_from_string(data)
    data_dict['delete_slide'] = int(data_dict['delete_slide'])
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug,
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User likes the Walkthrough and registers with "{values}" to "{domain}"')
def cta_form(context, values, domain):
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


@given(u'User creates a pin with "{data}" with position "{position}" with frame_number as "{frame_number}" to slide "{slide}" of walkthrough "{walkthrough}" of "{domain}" edit page')
def creating_a_pin(context, domain, data, position, frame_number, walkthrough, slide):
    data_dict = construct_dict_from_string(data)
    data_dict_pin = dict()
    data_dict_pin['walkthrough_id'] = walkthrough.lower().replace(" ", "-")
    position_dict = construct_dict_from_string(position)
    if frame_number == "None":
        position_dict['frame_number'] = None
    else:
        position_dict['frame_number'] = int(frame_number)
    data_dict['value'] = position_dict
    data_dict_pin['entity'] = data_dict
    context.page = context.tenant_client.patch('/api/slide/' + slide,
                                               data=json.dumps(data_dict_pin),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User gives data for pin with "{data}" to slide "{slide}" of walkthrough "{walkthrough}" of "{domain}" edit page')
def giving_data_to_pin(context, domain, data, walkthrough, slide):
    data_dict = construct_dict_from_string(data)
    data_dict_pin = dict()
    data_dict_pin['walkthrough_id'] = walkthrough.lower().replace(" ", "-")
    data_dict_pin['entity'] = data_dict
    context.page = context.tenant_client.patch('/api/slide/' + slide,
                                               data=json.dumps(data_dict_pin),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User alters position of walkthrough of "{slug}" with "{data}" to "{domain}" edit page')
def reorder_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    playlist = PlaylistTranslations.query.filter_by(name=data_dict['id']).first()
    data_dict['id'] = unicode(playlist.playlist_id)
    data_dict['current_demo'] = data_dict['current_demo'].lower().replace(" ", "-")
    if data_dict.get('target_after_demo'):
        data_dict['target_after_demo'] = data_dict['target_after_demo'].lower().replace(" ", "-")
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/playlist/' + str(playlist.playlist_id),
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User deletes the "{slug}" walkthrough of "{domain}" page')
def deleting_walkthrough(context, domain, slug):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.delete('/api/walkthrough/' + slug + '?author=1')


@then(u'"{values}" should not be in the Published Data')
def check_not_publish_output(context, values):
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item not in context.page.data


@then(u'"{values}" should be in the Draft Data of "{slug}" walkthrough')
def check_not_draft_output(context, slug, values):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/walkthrough/' + slug + '?author=1')
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item in context.page.data


@then(u'"{values}" should be in the Draft data')
def check_draft_output(context, values):
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item in context.page.data


@then(u'"{name}" for name and "{resource_type}" for resource_type should be in the Draft data as secondary resource')
def check_secondary_resource(context, name, resource_type):
    data = json.loads(context.page.data)['secondary_resource']
    if data['name'] == name and data['resource_type'] == resource_type:
        assert True
    else:
        assert False, 'Something went wrong'


@then(u'"{values}" should be in the Published data')
def check_publish_output(context, values):
    string_list = construct_dict_type_string_from_string(values)
    for item in string_list:
        assert item in context.page.data


@then(u'"{msg}" should be displayed in Draft data')
def check_the_url(context, msg):
    assert msg in context.page.data


@then(u'new folder path is returned')
def display_res(context):
    context.folder_path = json.loads(context.page.data)['path']
