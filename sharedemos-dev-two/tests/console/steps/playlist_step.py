import json
from behave import given
from sharedemos.models import PlaylistTranslations
from ..libs.utils import construct_dict_from_string


@given(u'User creates a playlist with "{data}" to "{domain}" edit page')
def create_playlist(context, domain, data):
    data_dict = construct_dict_from_string(data)
    context.page = context.tenant_client.post('/api/playlist?author=1',
                                              data=json.dumps(data_dict),
                                              follow_redirects=True,
                                              content_type='application/json')


@given(u'User edits a playlist "{playlist}" with data "{data}" to "{domain}" edit page')
def editing_playlist(context, domain, data, playlist):
    data_dict = construct_dict_from_string(data)
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    context.page = context.tenant_client.put('/api/playlist/' + str(playlist.playlist_id) + '?author=1',
                                             data=json.dumps(data_dict),
                                             follow_redirects=True,
                                             content_type='application/json')


@given(u'User disables a playlist "{playlist}" of "{domain}" edit page')
def disabling_playlist(context, domain, playlist):
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    data_dict = {}
    data_dict['is_enabled'] = False
    data_dict['id'] = unicode(playlist.playlist_id)
    context.page = context.tenant_client.patch('/api/playlist/' + str(playlist.playlist_id) + '?author=1',
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User enables a playlist "{playlist}" of "{domain}" edit page')
def enabling_playlist(context, domain, playlist):
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    data_dict = {}
    data_dict['is_enabled'] = True
    data_dict['id'] = unicode(playlist.playlist_id)
    context.page = context.tenant_client.patch('/api/playlist/' + str(playlist.playlist_id) + '?author=1',
                                               data=json.dumps(data_dict),
                                               follow_redirects=True,
                                               content_type='application/json')


@given(u'User deletes a playlist "{playlist}" of "{domain}" edit page')
def deleting_playlist(context, domain, playlist):
    playlist = PlaylistTranslations.query.filter_by(name=playlist).first()
    context.page = context.tenant_client.delete('/api/playlist/' + str(playlist.playlist_id) + '?author=1',
                                                follow_redirects=True,
                                                content_type='application/json')
