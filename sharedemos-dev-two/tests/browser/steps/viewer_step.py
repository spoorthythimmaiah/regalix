import time

from behave import given, then
from selenium.common.exceptions import NoSuchElementException


@then(u'"{permission_type}" option in permission list "{criteria}" displayed')
def heading(context, permission_type, criteria):
    try:
        time.sleep(5)
        element_id = permission_type + "s"
        element = context.browser.find_element_by_xpath("//label.permission-type[@for='" + element_id + "']")
        time.sleep(5)
        if criteria == "should not be":
            if element.is_displayed():
                assert False, 'Viewer Option is Present'
            else:
                pass
        elif criteria == "should be":
            if element.is_displayed():
                pass
            else:
                assert False, 'Viewer Option is not Present'
    except NoSuchElementException:
        pass


@given(u'user loads tenant home page')
def load_home_page(context):
    context.browser.get(context.base_tenant_url)
    time.sleep(2)


@then(u'"{login_heading}" should be displayed as heading of login page')
def login_heading(context, login_heading):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector("div.login-form-block h4")
        time.sleep(2)
        for element in elements:
            if element.text == login_heading:
                assert True
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        pass


@given(u'clicks on "{button_type}" link')
def settings_page(context, button_type):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_class_name("show_" + button_type + "_setting")
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user presses save button in advanced settings page')
def advanced_save(context):
    try:
        time.sleep(5)
        context.browser.execute_script('$("#advanced-settings .row .col-sm-6 .button-wrap .save").click();')
        time.sleep(5)
    except NoSuchElementException:
        assert False, 'Element not found'
