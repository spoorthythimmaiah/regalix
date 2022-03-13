from behave import given, then


@given(u'User lands in homepage')
def load_home_page(context):
    context.page = context.client.get('/')


@given(u'User lands in admin page')
def load_admin_page(context):
    context.page = context.client.get('/admin/')


@then(u'"{msg}" should be displayed')
def check_the_loaded_page(context, msg):
    assert msg in context.page.data


@then(u'"{msg}" should not be displayed')
def check_the_not_loaded_page(context, msg):
    assert msg not in context.page.data
