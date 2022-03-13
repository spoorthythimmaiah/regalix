import json
from behave import given, then
from sharedemos.models.playlist import PlaylistTranslations
from ..libs.utils import construct_dict_from_string


def patch_data(context, source_section, data):
    data_dict = construct_dict_from_string(data)
    slug = source_section.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1', data=json.dumps(data_dict),
                                               follow_redirects=True, content_type='application/json')


def get_section_details(context, section_name):
    data = json.loads(context.page.data)
    slug = section_name.lower().replace(" ", "-")
    for single_data in data:
        if single_data.get('slug') == slug:
            return single_data


def get_subsection_details(context, section_details, subsection_name):
    slug = subsection_name.lower().replace(" ", "-")
    data = section_details.get('children')
    for single_data in data:
        if single_data.get('slug') == slug:
            return single_data


def get_playlist_details(context, subsection_details, playlist_name):
    data = subsection_details.get('playlists')
    for single_data in data:
        if single_data.get('name') == playlist_name:
            return single_data


def get_walkthrough_details(context, playlist, walkthrough_name):
    slug = walkthrough_name.lower().replace(" ", "-")
    data = playlist.get('demos')
    for single_data in data:
        if single_data.get('slug') == slug:
            return single_data


@given(u'user creates a subcategory under the section "{section}" by importing the existing "{section_type}" with data as "{data}" to "{domain}" edit page')
def import_subsection(context, section, section_type, data, domain):
    patch_data(context, section, data)


@given(u'user moves the subsection "{source_section}" under a parent section with data as "{data}" to "{domain}" edit page')
def move_subsection(context, source_section, data, domain):
    patch_data(context, source_section, data)


@given(u'user moves the main section "{source_section}" under a subsection with data as "{data}" to "{domain}" edit page')
def move_main_section(context, source_section, data, domain):
    patch_data(context, source_section, data)


@given(u'user moves the main section "{source_section}" under another main section with data as "{data}" to "{domain}" edit page')
def move_main_section_under_main(context, source_section, data, domain):
    patch_data(context, source_section, data)


@given(u'user gets the product-tree details')
def get_product_tree(context):
    context.page = context.tenant_client.get('/api/product-tree?author=1&get_draft=1')


@then(u'there should be "{demo_count}" demos and "{slide_count}" slides in the main section "{section_name}"')
def section_demo_and_slide_count(context, demo_count, slide_count, section_name):
    try:
        section = get_section_details(context, section_name)
        assert int(demo_count) is section.get('demos_count') and int(slide_count) is section.get('slides_count')
    except Exception:
        assert False, 'Something went wrong'


@then(u'there should be "{demo_count}" demos and "{slide_count}" slides in the sub section "{subsection_name}" of main section "{section_name}"')
def subsection_demo_and_slide_count(context, demo_count, slide_count, subsection_name, section_name):
    try:
        section = get_section_details(context, section_name)
        subsection = get_subsection_details(context, section, subsection_name)
        assert int(demo_count) is subsection.get('demos_count') and int(slide_count) is subsection.get('slides_count')
    except Exception:
        assert False, 'Something went wrong'


@then(u'there should be "{slide_count}" slides in the walkthrough "{walkthrough_name}" under the playlist "{playlist_name}" of subsection "{subsection_name}" of main section "{section_name}"')
def demo_slide_count(context, slide_count, walkthrough_name, playlist_name, subsection_name, section_name):
    try:
        section = get_section_details(context, section_name)
        subsection = get_subsection_details(context, section, subsection_name)
        playlist = get_playlist_details(context, subsection, playlist_name)
        walkthrough = get_walkthrough_details(context, playlist, walkthrough_name)
        assert int(slide_count) is walkthrough.get('slides_count')
    except Exception:
        assert False, 'Something went wrong'


@given(u'user rearranges the demo "{demo_name}" with data as "{data}"')
def rearrange_demo(context, demo_name, data):
    data_dict = construct_dict_from_string(data)
    slug = demo_name.lower().replace(" ", "-")
    playlist_id = PlaylistTranslations.query.filter_by(name=data_dict.get('target_parent_slug')).first().playlist_id
    data_dict['target_parent_slug'] = playlist_id
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@then('"{status}" as status should be in the response')
def response_status(context, status):
    assert status in context.page.status


@given(u'user moves the playlist "{playlist_name}" into the subsection with data as "{data}"')
def rearrange_playlist(context, playlist_name, data):
    data_dict = construct_dict_from_string(data)
    playlist_id = PlaylistTranslations.query.filter_by(name=playlist_name).first().playlist_id
    context.page = context.tenant_client.patch('/api/playlist/' + str(playlist_id) + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@given(u'user moves the subsection "{subsection_name}" into a main section with data as "{data}"')
def rearrange_subsection(context, subsection_name, data):
    data_dict = construct_dict_from_string(data)
    slug = subsection_name.lower().replace(" ", "-")
    context.page = context.tenant_client.patch(
        '/api/section/' + slug + '?author=1',
        data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@given(u'user moves the section "{section_name}" with data as "{data}"')
def rearrange_section(context, section_name, data):
    data_dict = construct_dict_from_string(data)
    slug = section_name.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@given(u'user moves the demo "{demo_name}" with data as "{data}"')
def move_demo(context, demo_name, data):
    data_dict = construct_dict_from_string(data)
    slug = demo_name.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/walkthrough/' + slug + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@then(u'status as "{status_code}" should be in the response')
def check_status(context, status_code):
    data = '"status": ' + status_code
    assert data in context.page.data


@given(u'user moves the playlist "{playlist_name}" into an empty section with data as "{data}"')
def move_playlist_in_empty_section(context, playlist_name, data):
    data_dict = construct_dict_from_string(data)
    playlist_id = PlaylistTranslations.query.filter_by(name=playlist_name).first().playlist_id
    context.page = context.tenant_client.patch('/api/playlist/' + str(playlist_id) + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')


@given(u'user moves the section "{section_name}" into an empty section with data as "{data}"')
def move_section_in_empty_section(context, section_name, data):
    data_dict = construct_dict_from_string(data)
    slug = section_name.lower().replace(" ", "-")
    context.page = context.tenant_client.patch('/api/section/' + slug + '?author=1', data=json.dumps(data_dict), follow_redirects=True, content_type='application/json')
