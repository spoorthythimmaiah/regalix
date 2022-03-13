from sharedemos.libs.core import create_app
from sharedemos.models import Tenant


def get_tenant_app(domain, language=None):
    app = create_app('sharedemos', 'testing')

    tenant_id = Tenant.get_tenant_for_domain(domain)
    app.tenant_id = tenant_id

    app.wsgi_app = FlaskTestClientProxy(app.wsgi_app, language)

    return app.test_client()


def construct_dict_from_string(values):
    individual = values.split(" and ")
    values_array = []
    data = {}
    for item in individual:
        values_array.append(item.split(" as "))
    for item2 in values_array:
        if item2[1] == u'True':
            item2[1] = True
        if item2[1] == u'False':
            item2[1] = False
        data[str(item2[0])] = item2[1]
    return data


def construct_dict_type_string_from_string(values):
    individual = values.split(" and ")
    values_array = []
    data = []
    for item in individual:
        values_array.append(item.split(" for "))
    for item2 in values_array:
        if item2[0] == "true":
            string = '"' + item2[1] + '": ' + item2[0]
        elif item2[0] == "false":
            string = '"' + item2[1] + '": ' + item2[0]
        else:
            string = '"' + item2[1] + '": "' + item2[0] + '"'
        data.append(string)
    return data


def construct_list_of_tuples(values):
    individual = values.split(" and ")
    values_array = []
    data = []
    for item in individual:
        values_array.append(item.split(" for "))
    for item2 in values_array:
        tuple_item = (item2[1], item2[0])
        data.append(tuple_item)
    return data


def login(context):
    context.execute_steps(u'Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"')


class FlaskTestClientProxy(object):
    def __init__(self, app, language):
        self.app = app
        self.language = language

    def __call__(self, environ, start_response):
        environ['REMOTE_ADDR'] = environ.get('REMOTE_ADDR', '127.0.0.1')
        environ['HTTP_USER_AGENT'] = environ.get('HTTP_USER_AGENT', 'behave/1.0 console/1.0')
        if self.language is not None and self.language != "en_US":
            environ['HTTP_ACCEPT_LANGUAGE'] = environ.get('HTTP_ACCEPT_LANGUAGE', self.language)
        return self.app(environ, start_response)
