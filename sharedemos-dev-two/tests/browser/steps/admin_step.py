import os
import time
from behave import given, then
from selenium.common.exceptions import NoSuchElementException


@given(u'admin lands in "{page_type}" creation page')
def load_page(context, page_type):
    context.browser.get(context.root_url + '/admin/' + page_type + '/new')


@given(u'admin selects "{name}" as "{field}"')
def create_tenant(context, name, field):
    try:
        if field == "tenant":
            element = context.browser.find_element_by_css_selector('#s2id_tenant .select2-choice')
        elif field == "role":
            element = context.browser.find_element_by_css_selector('#s2id_role .select2-choice')
        elif field == "Timezone":
            element = context.browser.find_element_by_css_selector('#s2id_timezone .select2-choice')
        element.click()
        time.sleep(1)
        subcontainerclass = ".select2-drop:not([style*='display: none'])"
        selecteditem = context.browser.find_elements_by_css_selector(subcontainerclass + " .select2-results li.select2-result-selectable")
        for option in selecteditem:
            if option.text == name:
                option.click()
                break
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{data}" is added as entry in table')
def check_table_data(context, data):
    try:
        data_element = context.browser.find_element_by_class_name('table')
        assert data in data_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin uploads a file for "{image_type}"')
def upload_logo(context, image_type):
    element = context.browser.find_element_by_id(image_type)
    element.send_keys(os.path.join(context.base_path, "assets/test.txt"))


@then(u'error should be displayed')
def display_error(context):
    try:
        element = context.browser.find_element_by_css_selector('.alert.alert-error')
        assert "Integrity error" in element.text
    except NoSuchElementException:
        assert False, 'Element not found'
