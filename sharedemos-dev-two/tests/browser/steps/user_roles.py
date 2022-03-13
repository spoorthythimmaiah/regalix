import os
import time
from selenium.common.exceptions import NoSuchElementException
from behave import then, given, when
from bs4 import BeautifulSoup


@then(u'"{edit}" button is displayed')
def display_edit_button(context, edit):
    try:
        element = context.browser.find_element_by_link_text(edit)
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{edit}" button is not displayed')
def donot_display_edit(context, edit):
    try:
        if context.browser.find_element_by_link_text(edit):
            assert False, 'Oops, You dont have access to this'
    except NoSuchElementException:
        assert True


@then(u'settings button is not displayed')
def donot_display_settings(context):
    try:
        if context.browser.find_element_by_id('settingsBtn'):
            assert False, 'Oops, You dont have access to this'
    except NoSuchElementException:
        assert True


@then(u'permissions button is not displayed')
def donot_display_permissions(context):
    try:
        if context.browser.find_element_by_link_text("Permissions"):
            assert False, 'Oops, You dont have access to this'
    except NoSuchElementException:
        assert True


@then(u'user cannot load "{url}" page')
def url_fail(context, url):
    context.browser.get(context.base_tenant_url + url)
    try:
        element = context.browser.find_element_by_class_name('error_spage')
        assert element
    except NoSuchElementException:
        assert False, 'Something went wrong'


@then(u'settings button is displayed')
def display_settings(context):
    try:
        element = context.browser.find_element_by_id('settingsBtn')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin clicks on Permissions button')
def click_permissions_button(context):
    try:
        element = context.browser.find_element_by_link_text('Permissions')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin clicks on edit option of user "{user}" with email "{email}"')
def click_user_edit(context, user, email):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.user-details .edit-remove[user-email="' + email + '"] .user-edit')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin enters "{name}" as user lastname')
def enter_lastname(context, name):
    try:
        element = context.browser.find_element_by_css_selector('.new-user-block .block input.user-last-name[type="text"]')
        time.sleep(1)
        element.send_keys(name)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'admin clicks on save')
def click_save(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_id('editPopupSave')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'admin clicks on save button')
def click_save_button(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_id('newPopupSave')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin is in user Permissions page')
def load_permissions_page(context):
    context.browser.get(context.base_tenant_url + '/dashboard/users/')


@given(u'admin gives "{permission}" permission to user')
def give_permisssions(context, permission):
    try:
        element = context.browser.find_element_by_css_selector('.new-user-block .block label.permission-type[for="' + permission + '"]')
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user permissions are changed from author to analyst')
def analytics_permissions(context):
    context.execute_steps(u'''
        Then "Edit" button is not displayed
        And "Preview" button is not displayed
        And settings button is not displayed
        And permissions button is not displayed
        And user cannot load "/edit/" page
        And user cannot load "/preview/" page
        And user cannot load "/dashboard/users/" page
        ''')


@then(u'user permissions are changed from analyst to admin')
def admin_permissions(context):
    context.execute_steps(u'''
        Then "Edit" button is displayed
        And "Preview" button is displayed
        And settings button is displayed
        And "Permissions" button is displayed
        ''')


@when(u'admin removes user "{user}" with email "{email}"')
def remove_user(context, user, email):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.user-details .edit-remove[user-email="' + email + '"] .user-remove')
        element.click()
        time.sleep(1)
        delete_element = context.browser.find_element_by_css_selector('.user-popups .popup-footer .del-cancel-footer .delete')
        delete_element.click()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{user}" with email "{email}" has been removed')
def test_removed_user(context, user, email):
    try:
        time.sleep(1)
        if context.browser.find_element_by_css_selector('.user-details-block .user-details .user-activity .edit-remove[user-email="' + email + '"]'):
            assert False, 'Could not delete the user'
    except NoSuchElementException:
        assert True


@then(u'user with email "{email}" and password "{password}" cannot login')
def login_denied(context, email, password):
    context.execute_steps(u'''
        Given user loads logout page of demo tenant
        And user loads login page of demo tenant
        And "user" enters "{email}" as "email"
        And "user" enters "{password}" as "password"
        When "user" clicks on submit
        Then "User with given email does not exist." should be displayed as "error"
        '''.format(email=email, password=password))


@given(u'admin clicks on create new user button')
def click_new_user_button(context):
    try:
        time.sleep(3)
        context.browser.execute_script('$(".add-new-user").click();')
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin enters "{name}" as user firstname')
def enter_firstname(context, name):
    try:
        element = context.browser.find_element_by_css_selector('.new-user-block .block input.user-first-name[type="text"]')
        time.sleep(1)
        element.send_keys(name)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin enters "{email}" as user email')
def enter_email(context, email):
    try:
        element = context.browser.find_element_by_css_selector('.new-user-block .block input.user-email[type="text"]')
        element.send_keys(email)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user with email "{email}" is created')
def user_created(context, email):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_xpath("//div[@user-email='" + email + "']")
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user opens the mail "{email}" and sets the password as "{password}" by activating the link')
def email_activate(context, email, password):
    time.sleep(1)
    file_name = email[:-10] + '.html'
    path = os.path.join(context.base_path, "tmp/" + file_name)
    html_page = open(path, 'r')
    soup = BeautifulSoup(html_page)
    for link in soup.findAll('a'):
        href_link = link.get('href')
    context.browser.get(href_link)
    password_element = context.browser.find_element_by_id('main_pwd')
    password_element.send_keys(password)
    repeat_password_element = context.browser.find_element_by_id('re_pwd')
    repeat_password_element.send_keys(password)
    continue_button = context.browser.find_element_by_id('continueBtn')
    continue_button.click()


@when(u'"{user_type}" user successfully logs in with "{email}" as email and "{password}" as password')
def user_login(context, user_type, email, password):
    context.execute_steps(u'''
        Given "{user_type}" user successfully logs in with "{email}" as email and "{password}" as password
        '''.format(user_type=user_type, email=email, password=password))


@then(u'user permissions are changed from admin to author')
def author_permissions(context):
    context.execute_steps(u'''
        Then "Edit" button is displayed
        And "Preview" button is displayed
        And settings button is not displayed
        And permissions button is not displayed
        And user cannot load "/dashboard/users/" page
        ''')


@then(u'"{error_message}" should be displayed as error under "{field}" field')
def display_error_message(context, error_message, field):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('i.error-fields.' + field + '.Error')
        assert error_message in element.text
    except NoSuchElementException:
        assert False, 'Element not found'
