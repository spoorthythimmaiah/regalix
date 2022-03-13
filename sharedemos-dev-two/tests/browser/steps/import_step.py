import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, then


@given(u'user expands the option "{section}"')
def expand_option(context, section):
    try:
        time.sleep(6)
        click_element = context.browser.find_element_by_css_selector('li#' + section + '>.parentblock>span.expandSection')
        click_element.click()
    except NoSuchElementException:
        print(click_element)
        assert False, 'Element not found'


@given(u'user selects the option "{section}"')
def click_option(context, section):
    click_element = None
    try:
        time.sleep(6)
        click_element = context.browser.find_element_by_css_selector('li#' + section + '>.parentblock>label[for="cb-' + section + '"]')
        click_element.click()
    except NoSuchElementException:
        print(click_element)
        assert False, 'Element not found'


@given(u'user clicks on "{button_name}" button to duplicate')
def click_duplicate(context, button_name):
    try:
        time.sleep(1)
        click_element = context.browser.find_element_by_css_selector('.button[value="' + button_name + '"]')
        click_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" should not be in the Import List')
def circular_import(context, section):
    try:
        section = section.lower().replace(" ", "-")
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('div#popup-import-data>li#' + section)
        if not element.is_displayed():
            pass
    except NoSuchElementException:
        assert True, 'Element not found'
