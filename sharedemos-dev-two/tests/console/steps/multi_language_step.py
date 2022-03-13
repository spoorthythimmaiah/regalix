import json
from behave import given
from sharedemos.models import PlaylistTranslations
from ..libs.utils import construct_dict_from_string


@given(u'User lands in different langauge "{domain}" page')
def load_tenant_page_of_different_langauge(context, domain):
    context.page = context.tenant_client.get('/')


@given(u'User alters a section with the slug "{slug}" for the language "{language}" related to "{domain}" domain with the alteration "{data}"')
def section_alter(context, domain, data, slug, language):
    data_dict = construct_dict_from_string(data)
    data_dict["related_products"] = ''
    data_dict["video"] = ''
    slug = slug.lower().replace(" ", "-")
    context.tenant_client.application.config['DEFAULT_LOCALE'] = context.app.config['DEFAULT_LOCALE']
    context.page = context.tenant_client.put('/api/section/' + slug,
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')


@given(u'User alters the name of walkthrough "{slug}" with "{data}" to "{domain}" edit page')
def rename_walkthrough(context, domain, data, slug):
    data_dict = construct_dict_from_string(data)
    slug = slug.lower().replace(" ", "-")
    context.tenant_client.application.config['DEFAULT_LOCALE'] = context.app.config['DEFAULT_LOCALE']
    context.page = context.tenant_client.put('/api/walkthrough/' + slug,
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')


@given(u'User alters the name and description of playlist "{playlist}" with "{data}" to "{domain}" edit page')
def rename_playlist(context, domain, data, playlist):
    data_dict = construct_dict_from_string(data)
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    context.tenant_client.application.config['DEFAULT_LOCALE'] = context.app.config['DEFAULT_LOCALE']
    context.page = context.tenant_client.put('/api/playlist/' + str(playlist.playlist_id),
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')
