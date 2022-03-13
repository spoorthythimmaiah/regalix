import os
import time

from behave import given, then
from selenium.common.exceptions import NoSuchElementException


@given(u'clicks on "{link_name}" link in settings page')
def click_link(context, link_name):
    try:
        element = context.browser.find_element_by_class_name("show_" + link_name + "_setting")
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{link_name}" link should "{criteria}" Visible')
def check_link(context, link_name, criteria):
    try:
        time.sleep(2)
        if criteria == "not be":
            try:
                element = context.browser.find_element_by_class_name(link_name)
            except NoSuchElementException:
                pass
        elif criteria == "be":
            element = context.browser.find_element_by_class_name(link_name)
            time.sleep(2)
            if element.is_displayed():
                pass
            else:
                assert False, 'Link is not Displayed'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user toggles the export pdf button')
def toggle_privacy_button(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('input[type=checkbox]#can_download + label.css-toggle-label[for="can_download"]')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on the save button in advanced settings page')
def click_save_button(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.advanced-settings .setup-tenant .button-wrap .button.save')
        element.click()
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on "{link_name}" link')
def download_pdf(context, link_name):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_class_name(link_name)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{file_name}" file should be downloaded')
def downloaded_pdf(context, file_name):
    try:
        time.sleep(8)
        home_dir = os.environ['HOME']
        if os.path.isfile(home_dir + "/Downloads/" + file_name):
            pass
        else:
            assert False, 'Not Downloaded'
    except NoSuchElementException:
        assert False, 'Element not found'
