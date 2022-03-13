import os
import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, then, when
from bs4 import BeautifulSoup


@given(u'user loads login page of demo tenant')
def load_login_page(context):
    context.browser.get(context.base_tenant_url + "/login")


@given(u'user loads logout page of demo tenant')
def load_logout_page(context):
    context.browser.get(context.base_tenant_url + "/logout")


@then(u'"{user}" is successfully logged in')
def check_login_title(context, user):
    try:
        time.sleep(5)
        title_element = context.browser.find_element_by_class_name('dashboard-main-title')
        if user == 'admin' or user == 'author':
            title = "Library"
        elif user == 'analyst':
            title = "Reports"
        time.sleep(1)
        assert title in title_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" should be dispalyed as validation error')
def display_validation(context, message):
    try:
        element = context.browser.find_element_by_css_selector("input:invalid")
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{user}" is redirected to Library page')
def library_page_redirect(context, user):
    time.sleep(4)
    url = context.browser.current_url
    if url == context.base_tenant_url + '/dashboard/library/':
        assert True
    else:
        assert False, 'Oops ' + user + ' is not redirected to library page'


@then(u'analyst is redirected to Reports page')
def reports_page_redirect(context):
    time.sleep(4)
    url = context.browser.current_url
    if url == context.base_tenant_url + '/dashboard/reports/':
        assert True
    else:
        assert False, 'Oops analyst is not redirected to reports page'


@given(u'user clicks on Forgot Password link')
def click_forgot_password(context):
    try:
        link_element = context.browser.find_element_by_class_name('fpwd')
        link_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'an email is sent to "{mail_id}"')
def confirm_email_sent(context, mail_id):
    time.sleep(2)
    file_name = mail_id[:-10] + '.html'
    dirpath = os.path.join(context.base_path, "tmp")
    filelist = os.listdir(dirpath)
    for fileName in filelist:
        if fileName == file_name:
            assert True
            break
    else:
        assert False, 'Unable to send the mail'


@when(u'user clicks on reset button')
def click_reset_button(context):
    try:
        button_element = context.browser.find_element_by_class_name('reset-submit')
        button_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then('"{message}" message is displayed')
def reset_link_message(context, message):
    try:
        message_element = context.browser.find_element_by_css_selector('div.check-mail p')
        assert message in message_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on the reset link sent to "{mail_id}"')
def click_reset_link(context, mail_id):
    file_name = mail_id[:-10] + '.html'
    path = os.path.join(context.base_path, "tmp/" + file_name)
    html_page = open(path, 'r')
    soup = BeautifulSoup(html_page)
    for link in soup.findAll('a'):
        href_link = link.get('href')
    context.browser.get(href_link)


@given(u'user enters "{password}" in New Password field')
def enter_new_password(context, password):
    try:
        new_password_element = context.browser.find_element_by_id('newPwd')
        new_password_element.send_keys(password)
    except NoSuchElementException:
        assert False, 'New Password element not found'


@given(u'user enters "{password}" in Re-Enter New Password field')
def re_enter_new_password(context, password):
    try:
        re_enter_element = context.browser.find_element_by_id('reenterPwd')
        re_enter_element.send_keys(password)
    except NoSuchElementException:
        assert False, 'Re Enter password element not found'


@then(u'user cannot login as the submit button is disabled')
def button_disable(context):
    try:
        element = context.browser.find_element_by_css_selector('input#sign-in-btn[disabled="disabled"]')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'"{color}" cross mark should appear for email field')
def cross_mark(context, color):
    try:
        if color == "red":
            element = context.browser.find_element_by_css_selector('label.error')
            assert element
        elif color == "green":
            element = context.browser.find_element_by_css_selector('label.success')
            assert element
    except NoSuchElementException:
        assert False, 'Element not found'
