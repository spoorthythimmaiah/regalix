import os
import time

from behave import when, then
from selenium.common.exceptions import NoSuchElementException


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


@when(u'user uploads an pdf file "{file_name}"')
def upload_image(context, file_name):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#upload-slide-pdf.slide-file')
        path = os.path.join(context.base_path, "assets/files/" + file_name)
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{number}" pages of pdf is present as image slides in "{mode_type}" mode')
def check_pdf_images_upload(context, number, mode_type):
    try:
        time.sleep(int(number) * 4)
        assertmode(context, mode_type)
        for value in range(1, int(number) + 1):
            time.sleep(2)
            element = context.browser.find_element_by_id('slider' + str(value))
            time.sleep(2)
            assert element
    except NoSuchElementException:
        assert False, 'Element not found'
