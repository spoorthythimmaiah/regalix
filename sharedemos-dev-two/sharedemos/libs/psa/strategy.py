from flask import request, session
from urllib import unquote

from social.strategies.flask_strategy import FlaskStrategy


class SDStrategy(FlaskStrategy):

    def request_is_secure(self):
        return request.is_secure

    def request_path(self):
        return request.path

    def request_port(self):
        return request.environ.get('SERVER_PORT')

    def request_get(self):
        return request.args

    def request_post(self):
        return request.form

    def request_data(self, merge=True):
        req_data = FlaskStrategy.request_data(self, merge)
        if request.method == 'POST':
            idp_name = 'default'
            if 'RelayState' in req_data:
                relaystate_split = req_data['RelayState'].split(':')

                idp_name = relaystate_split[0]

                redirect_url = ''
                if len(relaystate_split) > 1:
                    redirect_url = relaystate_split[1]

                redirect_url = unquote(redirect_url) if redirect_url else '/'

                session['hash_url'] = redirect_url
            elif request.view_args.get('usergroup'):
                idp_name = request.view_args['usergroup']
            req_data['RelayState'] = idp_name

        return req_data
