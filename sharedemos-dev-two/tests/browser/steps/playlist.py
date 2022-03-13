import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, then
from selenium.webdriver.common.action_chains import ActionChains


@then(u'"{title}" playlist is added')
def add_playlist(context, title):
    time.sleep(2)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + title + "')]")
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on edit option of playlist "{playlist}"')
def edit_playlist(context, playlist):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]")
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        time.sleep(1)
        edit_element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]/following-sibling::div[contains(@class, 'edit-hamburger')]")
        edit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on "{edit}" icon of playlist "{playlist}"')
def click_edit_icon(context, edit, playlist):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.playlist-left .edit.active .' + edit + '-plist')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'playlist name is updated to "{new_playlist}"')
def update_playlist_name(context, new_playlist):
    time.sleep(2)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + new_playlist + "')]")
        assert element
    except NoSuchElementException:
        assert False, 'playlist name not updated'


@then(u'playlist description is updated to "{description}"')
def update_description(context, description):
    time.sleep(2)
    try:
        element = context.browser.find_element_by_xpath("//div/p[contains(text(), '" + description + "')]")
        assert element
    except NoSuchElementException:
        assert False, 'playlist description not updated'


@then(u'"{playlist}" playlist is disabled')
def playlist_disabled(context, playlist):
    time.sleep(1)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]/parent::div/parent::div[contains(@class, 'disabled')]")
        assert element
    except NoSuchElementException:
        assert False, playlist + ' not disabled'


@then(u'playlist "{playlist}" is not visible in the live mode')
def playlist_invisible(context, playlist):
    time.sleep(3)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]")
        if element:
            assert False, playlist + ' should not be visible'
    except NoSuchElementException:
        assert True


@then(u'"{playlist}" playlist is enabled')
def playlist_enabled(context, playlist):
    time.sleep(2)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]/parent::div/parent::div[contains(@class, 'disabled')]")
        if element:
            assert False, playlist + ' not enabled'
    except NoSuchElementException:
        assert True


@then(u'playlist "{playlist}" is visible in the live mode')
def playlist_visible(context, playlist):
    time.sleep(3)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]")
        assert element
    except NoSuchElementException:
        assert False, playlist + ' not visible'


@then(u'playlist "{playlist}" is deleted')
def playlist_deleted(context, playlist):
    time.sleep(1)
    try:
        element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + playlist + "')]")
        if element:
            assert False, 'Could not delete'
    except NoSuchElementException:
        assert True
