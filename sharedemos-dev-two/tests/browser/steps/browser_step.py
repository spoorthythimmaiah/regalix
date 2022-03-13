import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, when, then


@given(u'user loads home page')
def load_home_page(context):
    context.browser.get(context.root_url)


@given(u'"{user}" enters "{name}" as "{name_type}"')
def create_tenant(context, user, name, name_type):
    try:
        time.sleep(1)
        name_element = context.browser.find_element_by_name(name_type)
        time.sleep(1)
        name_element.clear()
        name_element.send_keys(name)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'"{user}" clicks on submit')
def click_submit_button(context, user):
    try:
        time.sleep(2)
        submit_element = context.browser.find_element_by_xpath("//input[@type='submit']")
        time.sleep(2)
        submit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" should be displayed as "{message_type}"')
def check_message(context, message, message_type):
    try:
        time.sleep(1)
        if message_type == "error message":
            message_elements = context.browser.find_elements_by_class_name('qtip-content')
            length = len(message_elements)
            if length > 1:
                assert message in message_elements[length - 1].text
            else:
                assert message in message_elements[0].text
        else:
            time.sleep(1)
            message_element = context.browser.find_element_by_class_name(message_type)
            assert message in message_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" should be displayed as heading')
def check_heading(context, message):
    try:
        time.sleep(5)
        message_element = context.browser.find_element_by_css_selector('.fs-banner .title1')
        assert message in message_element.text
    except NoSuchElementException:
        assert False, 'Element not found'
