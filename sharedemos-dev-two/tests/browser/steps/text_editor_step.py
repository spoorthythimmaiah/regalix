import os
import time
from selenium.common.exceptions import NoSuchElementException
from behave import then


def assertmode(context, mode_type):
    if mode_type == 'live':
        return
    else:
        url = context.browser.current_url
        assert mode_type in url


def callscript(context, element, path):
    context.browser.execute_script(
        "arguments[0].style.height='20px'; arguments[0].style.width='20px'; arguments[0].style.opacity='1'", element)
    element.send_keys(path)


@then(u'user clears title and body of the editor')
def clear_title_and_body(context):
    try:
        element = context.browser.find_element_by_css_selector('.fr-element h1')
        time.sleep(2)
        element.clear()
        element = context.browser.find_element_by_css_selector('.fr-element p')
        time.sleep(2)
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on "{file_type}" icon to add "{type}" in editor')
def click_image_button(context, file_type, type):
    try:
        element = context.browser.find_element_by_css_selector('button.fr-command[data-cmd="insert' + file_type + '"]')
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user uploads an "{file_type}" in editor with file "{file_name}"')
def upload_image_file(context, file_name, file_type):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('.fr-' + file_type + '-upload-layer .fr-form input')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on the editor panel')
def click_editor(context):
    try:
        element = context.browser.find_element_by_css_selector('.fr-wrapper .fr-element')
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'inserts a link with url "{url}" and text as "{url_text}" with "{tab_option}" option in editor')
def link(context, url, url_text, tab_option):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('.fr-link-insert-layer .fr-input-line input[placeholder="URL"]')
        time.sleep(2)
        element.click()
        element.clear()
        element.send_keys(url)
        element = context.browser.find_element_by_css_selector('.fr-link-insert-layer .fr-input-line input[placeholder="Text"]')
        time.sleep(2)
        element.click()
        element.clear()
        element.send_keys(url_text)
        if tab_option == "open in new tab":
            element = context.browser.find_element_by_css_selector('.fr-link-insert-layer .fr-checkbox-line .fr-checkbox input')
            time.sleep(2)
            element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user enters "{url}" as url input in editor')
def upload_video(context, url):
    try:
        time.sleep(3)
        content_element = context.browser.find_element_by_css_selector('.fr-video-by-url-layer .fr-input-line input')
        content_element.click()
        content_element.clear()
        content_element.send_keys(url)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on Insert to insert "{button_type}"')
def click_insert(context, button_type):
    try:
        if button_type == "video":
            element = context.browser.find_element_by_css_selector('.fr-action-buttons button[data-cmd="videoInsertByURL"]')
            time.sleep(2)
            element.click()
        elif button_type == "link":
            element = context.browser.find_element_by_css_selector('.fr-action-buttons button[data-cmd="linkInsert"]')
            time.sleep(2)
            element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on Done')
def click_done_button(context):
    try:
        element = context.browser.find_element_by_class_name("content-save")
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{file_type}" is displayed in the text slide in "{mode_type}" mode')
def media_file_displayed(context, file_type, mode_type):
    try:
        assertmode(context, mode_type)
        time.sleep(5)
        if file_type == "Image":
            element = context.browser.find_element_by_css_selector(".fr-element p a img.fr-dib")
            if element.is_displayed():
                pass
            else:
                assert False, 'No Image'
        elif file_type == "Video":
            element = context.browser.find_element_by_css_selector(".fr-element p .fr-video")
            if element.is_displayed():
                pass
            else:
                assert False, 'No Video'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'File with the name "{link_name}" is displayed in the slide in "{mode_type}" mode')
def file_displayed(context, link_name, mode_type):
    try:
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector(".fr-element p .fr-file")
        if element.is_displayed():
            assert link_name in element.text
        else:
            assert False, 'No Video'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'Link with the url "{url}" and name "{link_name}" is displayed in the slide in "{mode_type}" mode')
def link_displayed(context, url, link_name, mode_type):
    try:
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('.fr-element p a[href="' + url + '"]')
        if element.is_displayed():
            assert link_name in element.text
        else:
            assert False, 'No Video'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{text}" is displayed as text in the text slide footer in "{mode_type}" mode')
def footer_text_display(context, text, mode_type):
    try:
        element = context.browser.find_element_by_class_name("content-footer-text")
        assert text in element.text
    except NoSuchElementException:
        assert False, 'Element not found'
