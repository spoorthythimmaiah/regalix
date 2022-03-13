import os
import time
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from behave import given, when, then


@given(u'"{user_type}" user successfully logs in with "{email}" as email and "{password}" as password')
def admin_successfull_login(context, user_type, email, password):
    context.execute_steps(u'''
        Given user loads logout page of demo tenant
        And user loads login page of demo tenant
        And "user" enters "{email}" as "email"
        And "user" enters "{password}" as "password"
        When "user" clicks on submit
        Then "{user_type}" is successfully logged in
    '''.format(user_type=user_type, email=email, password=password))


@when(u'user clicks on edit button')
def click_edit_button(context):
    try:
        element = context.browser.find_element_by_link_text("Edit")
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on "{edit}"')
def click_edit(context, edit):
    try:
        time.sleep(1)
        click_element = context.browser.find_elements_by_class_name(edit)
        for element in click_element:
            if element.is_displayed():
                element.click()
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" should be displayed as error message')
def display_error_message(context, message):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_class_name('qtip-content')
        assert message in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters "{content}" as "{class_name}"')
def enter_content(context, content, class_name):
    try:
        if class_name == 'demo title':
            class_name = "edit-pwt-title"
        elif class_name == 'playlist name':
            class_name = "edit-playlist-title"
        elif class_name == 'playlist description':
            class_name = "edit-playlist-desc"
        time.sleep(2)
        content_element = context.browser.find_element_by_class_name(class_name)
        context.browser.execute_script("arguments[0].scrollIntoView()", content_element)
        time.sleep(2)
        content_element.clear()
        content_element.send_keys(content)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters nothing in "{field}"')
def empty_field(context, field):
    try:
        if field == 'playlist description':
            field = "edit-playlist-desc"
        element = context.browser.find_element_by_class_name(field)
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user is in authoring mode')
def enter_authoring_mode(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_class_name('create-new')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'"{section}" popup box appears')
def popupbox_appear(context, section):
    try:
        time.sleep(5)
        if section == "section" or section == "layout":
            class_name = 'create-new'
        elif section == "Demo":
            class_name = 'create-walkthrough'
        elif section == "Category":
            class_name = 'create-section'
        time.sleep(1)
        element = context.browser.find_element_by_class_name(class_name)
        element.click()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is present as section')
def check_section_added(context, section):
    try:
        time.sleep(4)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert True
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'image is uploaded in section')
def section_image_uploaded(context):
    try:
        element = context.browser.find_element_by_css_selector('.pwt-wrap .pwt-box[slug="file-section"] .icon img')
        attribute = element.get_attribute("src")
        if attribute == "/static/images/section-default-icon.png":
            assert False, 'Could not upload'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video is uploaded in section')
def section_video_uploaded(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.pwt-wrap .pwt-box[slug="video-section"]')
        element.click()
        time.sleep(1)
        video_element = context.browser.find_element_by_css_selector('.col-md-6 .section-pwt-list .section-video')
        assert video_element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user toggles visibility to "{visibility}"')
def toggle_visibility(context, visibility):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('input.css-checkbox[type="checkbox"] + label.css-label[for=' + visibility + ']')
        time.sleep(1)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user toggles private button to "{privacy}"')
def toggle_privacy(context, privacy):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('input.css-checkbox[type="checkbox"] + label.css-label[for="private"]')
        time.sleep(1)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is not present as section in live mode')
def public_section_check(context, section):
    try:
        context.browser.get(context.base_tenant_url)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert False, 'Should not display'
                break
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is present as section in live mode')
def public_section(context, section):
    try:
        context.browser.get(context.base_tenant_url)
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert True
                break
        else:
            assert False, 'visibility not changed'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user uploads a "{image}" icon in section creation')
def section_image_upload(context, image):
    try:
        context.browser.execute_script("$('#upload-file').show()")
        element = context.browser.find_element_by_id('upload-file')
        context.browser.execute_script("arguments[0].scrollIntoView(false)", element)
        time.sleep(1)
        element.send_keys(os.path.join(context.base_path, "assets/images/" + image))
        context.browser.execute_script("$('#upload-file').hide()")
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user uploads a "{video_url}" video in section creation')
def section_video_upload(context, video_url):
    try:
        element = context.browser.find_element_by_class_name('video-upload')
        time.sleep(1)
        context.browser.execute_script("arguments[0].scrollIntoView(true)", element)
        element.send_keys(video_url)
        upload_element = context.browser.find_element_by_class_name('upload-section-video')
        upload_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user is in authoring mode')
def authoring_mode(context):
    time.sleep(2)
    context.browser.get(context.base_tenant_url + "/edit")


@given(u'user clicks on edit option of "{section}"')
def click_section_edit(context, section):
    try:
        time.sleep(5)
        section_name = section.lower()
        element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + section_name + '"]')
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        time.sleep(2)
        edit_element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + section_name + '"] .edit-hamburger')
        time.sleep(5)
        edit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user "{action}"s the "{section}"')
def click_edit_option(context, action, section):
    try:
        elements = context.browser.find_elements_by_css_selector('.edit-overlay .popup-wrap .popup-box .popup-footer ' + '.' + action)
        time.sleep(1)
        for element in elements:
            if element.is_displayed():
                element.click()
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is disabled')
def disable_section(context, section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-box.disabled .title')
        element_found = False
        for element in elements:
            if element.text == section:
                element_found = True
                break
        assert element_found, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is enabled')
def enable_section(context, section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-box.disabled .title')
        for element in elements:
            if element.text == section:
                assert False, 'Not enabled'
                break
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on "{edit}" icon of "{section}"')
def click_edit_icon(context, edit, section):
    try:
        time.sleep(1)
        if edit == "edit":
            edit = "oedit"
        section_name = section.lower()
        edit_element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + section_name + '"] + .edit .' + edit)
        time.sleep(1)
        edit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user deletes "{video_title}" video')
def delete_video_section(context, video_title):
    try:
        video_element = context.browser.find_element_by_xpath("//div[contains(., '" + video_title + "')]/following-sibling::div")
        time.sleep(1)
        context.browser.execute_script("arguments[0].scrollIntoView(true)", video_element)
        video_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'"{video_title}" video is deleted')
def check_deleted_video(context, video_title):
    try:
        video_elements = context.browser.find_elements_by_css_selector('.edit-overlay .popup-wrap .popup-box .block .video-title')
        for element in video_elements:
            if element.text == video_title:
                assert False, 'Video not deleted'
                break
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{section}" is deleted')
def section_delete(context, section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert False, 'Could not delete'
                break
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'close the edit option')
def close_edit_option(context):
    try:
        elements = context.browser.find_elements_by_class_name('edit-hamburger')
        for element in elements:
            if element.is_displayed():
                element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" error should be displayed')
def display_error(context, message):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_class_name('qtip-content')
        assert message in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user changes the "{source_section}" position to "{destination_section}"')
def change_position(context, source_section, destination_section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-list .pwt-box .title')
        count = 0
        for element in elements:
            count += 1
            if element.text == source_section:
                context.source_position = count
            elif element.text == destination_section:
                context.destination_position = count
        destination_element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + destination_section.lower() + '"]')
        source_element_handle = context.browser.find_element_by_css_selector('.pwt-box[slug="' + source_section.lower() + '"]')
        ActionChains(context.browser).move_to_element(source_element_handle).perform()
        source_element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + source_section.lower() + '"] .section-drag svg polygon')
        time.sleep(3)
        ActionChains(context.browser).drag_and_drop(source_element, destination_element).perform()
    except NoSuchElementException:
        assert False, 'Element not found'


@then('"{section_name}" section position is changed')
def confirm_position(context, section_name):
    try:
        elements = context.browser.find_elements_by_css_selector('.pwt-list .pwt-box .title')
        count = 0
        for element in elements:
            count += 1
            if element.text == section_name:
                if count == context.destination_position:
                    assert True
                    break
                else:
                    assert False, 'Position not changed with the destination element'
        else:
            assert False, 'No match found for ' + section_name
    except NoSuchElementException:
        assert False, 'Element not found'


@then('only first 50 characters "{category_name}" are added as category name')
def max_charactes_category_name(context, category_name):
    try:
        time.sleep(4)
        element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + category_name.lower() + '"] .title')
        count = 0
        for character in element.text:
            count += 1
        if count is 50:
            assert True
        else:
            assert False, 'Category name is not 50 characters long'
    except NoSuchElementException:
        assert False, 'Element not found'


@then('only first 200 characters are added as category description for "{category_name}" category')
def max_characters_category_desc(context, category_name):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.pwt-box[slug="' + category_name.lower() + '"] .pwt-details')
        count = 0
        for character in element.text:
            count += 1
        if count is 200:
            assert True
        else:
            assert False, 'Category description is not 200 characters long'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects "{layout_type}" layout')
def select_layout(context, layout_type):
    try:
        time.sleep(1)
        if layout_type == 'Category':
            element = context.browser.find_element_by_css_selector('.layouts .category_layout')
        elif layout_type == 'Playlist':
            element = context.browser.find_element_by_css_selector('.layouts .playlist_layout')
        elif layout_type == 'Demo':
            element = context.browser.find_element_by_css_selector('.layouts .demo_layout')
        elif layout_type == 'Import':
            element = context.browser.find_element_by_css_selector('.layouts .import_layout')
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user is in live mode')
def live_mode(context):
    time.sleep(2)
    context.browser.get(context.base_tenant_url)


@then(u'private toggle button should not be present')
def display_private_toggle(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_id('private')
        if element:
            assert False, 'Element found'
    except NoSuchElementException:
        pass
