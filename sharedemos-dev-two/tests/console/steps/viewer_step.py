from behave import given, then
from bs4 import BeautifulSoup
from sharedemos.models import Tenant, db
import json


@then(u'Viewer option is not available in the add user popup')
def no_viewer_option(context):
    soup = BeautifulSoup(context.page.data)
    data = soup.select('div label.permission-type')
    for item in data:
        assert "Viewer" not in item.text


@given(u'user makes the entire app as private')
def tenant_private(context):
    with context.app.app_context():
        tenant = Tenant.query.filter(Tenant.name == 'testing').first()
        tenant.flags.is_private = True
        db.session.commit()


@then(u'Viewer option is available in the add user popup')
def viewer_available(context):
    soup = BeautifulSoup(context.page.data)
    data = soup.select('div label.permission-type')[3].text
    assert "Viewer" in data


@given(u'Admin gets the user details')
def get_users(context):
    context.page = context.tenant_client.get('/api/user')


@then(u'role_id should be "{role_id}" for the user with email "{email}"')
def confirm_viewer_role_id(context, role_id, email):
    result = json.loads(context.page.data)
    for item in result:
        if item['email'] == email:
            if item['role_id'] == int(role_id):
                assert True
            else:
                assert False, 'User role is not viewer'
