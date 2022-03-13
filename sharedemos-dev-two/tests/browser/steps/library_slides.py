import os
import time

from behave import given, then, when
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains


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


@given(u'user clicks on plus button to create a new slide')
def click_plus_button(context):
    try:
        time.sleep(3)
        plus_button = context.browser.find_element_by_css_selector('.create-new.slide')
        plus_button.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects "{file_type}" icon')
def select_file_type(context, file_type):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_class_name(file_type)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads an image "{file_name}"')
def upload_image(context, file_name):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#upload-slide-image.slide-file')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads an invalid file for image upload')
def upload_invalid_image_file(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('#upload-slide-image.slide-file')
        path = os.path.join(context.base_path, "assets/audios/audio1.mp3")
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user switches to preview mode from "{mode_type}" mode')
def switch_to_preview_mode(context, mode_type):
    time.sleep(2)
    url = context.browser.current_url
    if mode_type == "edit":
        preview_url = url.replace("edit", "preview", 1)
    elif mode_type == "live":
        preview_url = url.replace("#!/", "preview/#!/", 1)
    context.browser.get(preview_url)
    time.sleep(3)


@given(u'user switches to edit mode from "{mode_type}" mode')
def switch_to_edit_mode(context, mode_type):
    url = context.browser.current_url
    if mode_type == "preview":
        edit_url = url.replace("preview", "edit", 1)
    elif mode_type == "live":
        edit_url = url.replace('#!/', 'edit/#!/', 1)
    context.browser.get(edit_url)
    time.sleep(3)


@then(u'image is uploaded in slide "{number}" of "{mode_type}" mode')
def check_image_upload(context, number, mode_type):
    try:
        time.sleep(10)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' img')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters "{link}" as url input for "{file_type}"')
def enter_url(context, link, file_type):
    try:
        url = context.browser.find_element_by_css_selector('.upload_media_block .url_input[media-type="' + file_type + '"]')
        url.send_keys(link)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on upload button for "{file_type}"')
def click_upload(context, file_type):
    try:
        upload = context.browser.find_element_by_css_selector(
            '.upload_media_block .url_input[media-type="' + file_type + '"] + .url_upload')
        upload.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects URL option for "{file_type}" upload')
def select_url_option(context, file_type):
    try:
        element = context.browser.find_element_by_css_selector(
            '.upload_media_block label[for="upload-slide-' + file_type + '"] + .resourceUrl')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads a video "{file_name}"')
def upload_video(context, file_name):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#upload-slide-video.slide-file')
        path = os.path.join(context.base_path, "assets/videos/" + file_name)
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads an invalid file for video')
def upload_invalid_video_file(context):
    try:
        element = context.browser.find_element_by_css_selector('#upload-slide-video.slide-file')
        path = os.path.join(context.base_path, "assets/images/avatar.jpg")
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video is uploaded in slide "{number}" of "{mode_type}" mode')
def confirm_video_upload(context, number, mode_type):
    try:
        time.sleep(3)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' video')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video is embedded in slide "{number}" of "{mode_type}" mode')
def confirm_video_embed(context, number, mode_type):
    try:
        time.sleep(4)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' iframe')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads an audio file "{file_name}"')
def upload_audio_file(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('#upload-slide-audio.slide-file')
        path = os.path.join(context.base_path, "assets/audios/" + file_name)
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user uploads an invalid file for audio')
def upload_invalid_audio_file(context):
    try:
        element = context.browser.find_element_by_css_selector('#upload-slide-audio.slide-file')
        path = os.path.join(context.base_path, "assets/images/profile.png")
        if "firefox" in context.browser.name:
            callscript(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'audio is "{upload_type}" in slide "{number}" of "{mode_type}" mode')
def confirm_audio_embed(context, upload_type, number, mode_type):
    try:
        time.sleep(4)
        assertmode(context, mode_type)
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' audio')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'link is added to the slide "{number}" of "{mode_type}" mode')
def confirm_link_addition(context, number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' .slide_link')
        assert element
    except NoSuchElementException:
        assert False, "Element not found"


@then(u'clicking on the Open Document in slide "{number}" of "{mode_type}" mode will open the link "{link}"')
def open_link(context, link, number, mode_type):
    try:
        time.sleep(5)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' .slide_link a')
        element.click()
        for handle in context.browser.window_handles:
            context.browser.switch_to_window(handle)
        time.sleep(3)
        assert 'www.google.co.in' in context.browser.current_url
        context.browser.close()
        for handle in context.browser.window_handles:
            context.browser.switch_to_window(handle)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user loads the slide "{path}"')
def load_slide(context, path):
    time.sleep(1)
    context.browser.get(context.base_tenant_url + "/edit/#!/" + path)
    time.sleep(2)


@then(u'"{error_message}" error message should be displayed')
def display_error_message(context, error_message):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('label.error-message')
        for element in elements:
            if element.text == error_message:
                assert True
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on close icon')
def click_close(context):
    try:
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.slide_options .close')
        for element in elements:
            if element.is_displayed():
                element.click()
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on close icon')
def click_close_icon(context):
    context.execute_steps(u'''
        Then user clicks on close icon
        ''')


@given(u'user clicks on up arrow mark')
def click_up_arrow(context):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('.slides_wraper .slide-rearrange')
        element.click()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user rearranges the slide "{source_number}" with "{destination_number}"')
def change_slide_order(context, source_number, destination_number):
    try:
        time.sleep(2)
        source_element = context.browser.find_element_by_css_selector('.slides_container .slide[order="' + destination_number + '"]')
        destination_element = context.browser.find_element_by_css_selector('.slides_container .slide[order="' + source_number + '"]')
        ActionChains(context.browser).drag_and_drop(source_element, destination_element).perform()
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'slide "{source_number}" is exchanged with slide "{destination_number}" in edit mode')
def check_slide_order(context, source_number, destination_number):
    try:
        time.sleep(1)
        url = context.browser.current_url
        assert "edit" in url
        slide = context.browser.find_element_by_css_selector('.slides_container .slide[order="' + destination_number + '"]')
        if slide.value_of_css_property("background-image"):
            assert True
        else:
            assert False, 'Failed to rearrange'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'slide "{source_number}" is exchanged with slide "{destination_number}" in "{mode_type}" mode')
def check_slide_order_in_preview(context, source_number, destination_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#slider' + destination_number + ' img')
        assert element
    except NoSuchElementException:
        assert False, 'Failed to rearrange'


@then(u'user closes the option for adding new slides')
def close_new_slide_option(context):
    try:
        context.execute_steps(u'Given user clicks on plus button to create a new slide')
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on "{icon_type}" icon in side-panel')
def click_icon_side_panel(context, icon_type):
    try:
        time.sleep(5)
        context.browser.execute_script('$(".side-panel ul div.' + icon_type + '-item").click();')
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user enters "{text}" as notes title')
def enter_notes_title(context, text):
    try:
        time.sleep(2)
        context.browser.execute_script('$(".notes-wrap-inner h1").click();')
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.notes-wrap-inner h1')
        element.click()
        element.clear()
        element.send_keys(text)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user enters "{text}" as notes description')
def enter_notes_description(context, text):
    try:
        time.sleep(2)
        context.browser.execute_script('$(".notes-wrap-inner .anim1 p").click();')
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.notes-wrap-inner .anim1 p')
        element.click()
        element.clear()
        element.send_keys(text)
        outof_focus_element = context.browser.find_element_by_css_selector('.notes-wrap .notes-wrap-inner')
        outof_focus_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{text}" is added as notes title in "{mode_type}" mode')
def confirm_notes_title(context, text, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('.notes-wrap-inner h1')
        assert text in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{text}" is added as notes description in "{mode_type}" mode')
def confirm_notes_description(context, text, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('.notes-wrap-inner .anim1 p')
        assert text in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on pin hotspot icon')
def click_pin_hotspot_icon(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('div.edit-drop-pin')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks at the desired place on slide "{number}" to create a pin hotspot')
def click_desired_place(context, number):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('#slider' + number + ' img')
        ActionChains(context.browser).move_to_element_with_offset(element, 250, 250).click().perform()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on pin hotspot "{number}" in slide "{slide_number}"')
def click_pin_hotspot(context, number, slide_number):
    try:
        time.sleep(4)
        hotspots = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        time.sleep(2)
        for hotspot in hotspots:
            if hotspot.text == number:
                hotspot.click()
                break
        else:
            assert False, 'hotspot' + number + ' not found'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on pin hotspot "{number}" in slide "{slide_number}" again')
def click_visited_pin_hotspot(context, number, slide_number):
    try:
        time.sleep(1)
        hotspot = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .drop_pin.pin-active .pin-opener')
        hotspot.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on pin hotspot "{number}" in slide "{slide_number}"')
def click_pinhotspot(context, number, slide_number):
    context.execute_steps(u'''
        when user clicks on pin hotspot "{number}" in slide "{slide_number}"
        '''.format(number=number, slide_number=slide_number))


@when(u'user enters "{text}" as pin hotspot title')
def enter_pin_hotspot_title(context, text):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.pin-tooltip h1')
        element.click()
        element.clear()
        element.send_keys(text)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user enters "{text}" as pin hotspot description')
def enter_pin_hotspot_description(context, text):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.pin-tooltip p')
        element.click()
        element.clear()
        element.send_keys(text)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{text}" is added as pin hotspot title in "{mode_type}" mode')
def confirm_pin_title(context, text, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.pin-tooltip h1')
        assert text in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{text}" is added as pin hotspot description in "{mode_type}" mode')
def confirm_pin_description(context, text, mode_type):
    try:
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('.pin-tooltip p')
        assert text in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user selects "{position}" as pin hotspot\'s tooltip position')
def select_pin_hotspot_position(context, position):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('div.pin-tooltip-position.' + position)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'pin hotspot\'s tooltip position is changed to "{position}" in "{mode_type}" mode')
def confirm_tooltip_position(context, position, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('.pin-tooltip.' + position)
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'pin hotspot "{number}" is created in slide "{slide_number}" in "{mode_type}" mode')
def confirm_pin_hotspot(context, mode_type, number, slide_number):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        for element in elements:
            if element.text == number:
                assert True
                break
        else:
            assert False, 'Pin hotspot not created'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on highlight hotspot icon')
def click_highlight_hotspot_icon(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.edit-highlighter')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user selects a portion on slide "{number}"')
def select_hotspot_portion(context, number):
    try:
        element = context.browser.find_element_by_id('slider' + number)
        ActionChains(context.browser).drag_and_drop_by_offset(element, 250, 150).perform()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user changes the highlight color to "{color}"')
def change_highlight_color(context, color):
    context.browser.execute_script("document.getElementsByClassName('color-box')[0].style.backgroundColor = '" + color + "';")


@then(u'highlight hotspot "{number}" is created successfully in slide "{slide_number}" in "{mode_type}" mode')
def confirm_highlight_hotspot(context, number, mode_type, slide_number):
    try:
        time.sleep(3)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + number)
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'highlight hotspot "{hotspot_number}" in slide "{slide_number}" color is changed to "{color}" in "{mode_type}" mode')
def confirm_highlight_color_change(context, hotspot_number, slide_number, color, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + hotspot_number)
        border = element.value_of_css_property("border-color")
        time.sleep(3)
        if border == color:
            assert True
        else:
            assert False, 'Highlight color not changed'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on highlight hotspot "{button_type}" of hotspot "{number}" in slide "{slide_number}"')
def click_hotspot_edit(context, button_type, number, slide_number):
    try:
        if button_type == "delete":
            context.highlight_length = len(context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .hotspot'))
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + number)
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        edit_element = context.browser.find_element_by_css_selector(
            'div#slider' + slide_number + ' .hotspot#hotspot' + number + ' .hotspot-edit-options .hotspot-' + button_type)
        edit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user selects "{link_type}" as highlight hotspot link')
def select_link(context, link_type):
    try:
        context.hotspot_link = link_type
        time.sleep(2)
        if link_type == "previous":
            element = context.browser.find_element_by_css_selector(
                '.link-option input#prev.css-radio[type="radio"] + label.css-radio-label ')
        elif link_type == "External link":
            element = context.browser.find_element_by_css_selector(
                '.link-option input#elink.css-radio[type="radio"] + label.css-radio-label ')
        else:
            element = context.browser.find_element_by_css_selector(
                '.link-option input#' + link_type + '.css-radio[type="radio"] + label.css-radio-label ')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on highlight hotspot "{number}" of slide "{slide_number}"')
def click_on_hotspot(context, number, slide_number):
    try:
        time.sleep(3)
        current_url = context.browser.current_url
        slide_number = current_url[-1:]
        context.slide = int(slide_number)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + number)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on highlight hotspot "{number}" of slide "{slide_number}"')
def click_hotspot_icon(context, number, slide_number):
    time.sleep(2)
    context.execute_steps(u'''
        When user clicks on highlight hotspot "{number}" of slide "{slide_number}"
        '''.format(number=number, slide_number=slide_number))


@then(u'"{slide_type}" slide is loaded in "{mode_type}" mode')
def load_slide_type(context, slide_type, mode_type):
    try:
        assertmode(context, mode_type)
        current_slide = int(context.browser.current_url[-1:])
        if slide_type == 'previous':
            value = (current_slide == context.slide - 1)
        elif slide_type == 'next':
            value = (current_slide == context.slide + 1)
        if value:
            assert True
        else:
            assert False, 'Could not load ' + slide_type + ' slide'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on forward arrow')
def click_forward_arrow(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.dt-btn-next svg')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on forward arrow')
def click_forward(context):
    context.execute_steps(u'''
        Given user clicks on forward arrow
        ''')


@then(u'user loads the slide "{slide}"')
def load_specific_slide(context, slide):
    context.browser.get(context.base_tenant_url + "/edit/#!/" + slide)
    time.sleep(2)


@then(u'user clicks on "{icon}" icon in side-panel')
def click_notes_icon(context, icon):
    time.sleep(1)
    context.execute_steps(u'''
        Given user clicks on "{icon}" icon in side-panel
        '''.format(icon=icon))


@when(u'user clicks on "{icon}" icon in side-panel')
def click_notes(context, icon):
    context.execute_steps(u'''
        Given user clicks on "{icon}" icon in side-panel
        '''.format(icon=icon))


@then(u'user loads the slide "{slide}" in preview mode')
def load_slide_in_preview(context, slide):
    context.browser.get(context.base_tenant_url + "/preview/#!/" + slide)


@given(u'user publishes the work done')
def publish(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('#edit_container .edit-controls .publish')
        element.click()
        time.sleep(1)
        confirm_element = context.browser.find_element_by_css_selector(
            '.edit-overlay .popup-wrap .popup-box .popup-footer .confirm-publish')
        confirm_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user loads the live demo "{demo_path}"')
def load_live_demo(context, demo_path):
    context.browser.get(context.base_tenant_url + '/#!/' + demo_path)


@then(u'user loads the live demo "{demo_path}"')
def load_live_demo_path(context, demo_path):
    context.browser.get(context.base_tenant_url + '/#!/' + demo_path)


@given(u'user loads the live demo "{demo_path}"')
def load_live_demo_slide(context, demo_path):
    context.browser.get(context.base_tenant_url + '/#!/' + demo_path)


@when(u'user selects slide "{number}" from dropdown')
def select_dropdown_slide(context, number):
    try:
        element = context.browser.find_element_by_css_selector("select#goto-slide-no > option[value='" + number + "']")
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'slide "{number}" is loaded in "{mode_type}" mode')
def confirm_slide_load(context, number, mode_type):
    time.sleep(1)
    assertmode(context, mode_type)
    url = context.browser.current_url
    slide_number = url[-1:]
    if slide_number == number:
        assert True
    else:
        assert False, 'Slide ' + number + ' is not loaded'


@when(u'user enters "{link}" in external link')
def enter_external_link(context, link):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_id('e-link')
        element.send_keys(link)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'external link "{link}" is opened')
def confirm_external_link(context, link):
    for handle in context.browser.window_handles:
        context.browser.switch_to_window(handle)
    time.sleep(3)
    assert 'www.google.co.in' in context.browser.current_url
    context.browser.close()
    for handle in context.browser.window_handles:
        context.browser.switch_to_window(handle)


@then(u'no action is taken and user is in the same slide "{number}" in "{mode_type}" mode')
def confirm_no_action(context, number, mode_type):
    assertmode(context, mode_type)
    if context.browser.current_url[-1:] == number:
        assert True
    else:
        assert False, 'Some action is taken'


@when(u'user deletes the pin hotspot "{number}" from slide "{slide_number}"')
def delete_pin_hotspot(context, number, slide_number):
    try:
        time.sleep(1)
        hotspots = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        context.pin_length = len(hotspots)
        for hotspot in hotspots:
            if hotspot.text == number:
                hotspot.click()
                break
        else:
            assert False, 'hotspot' + number + ' not found'
        time.sleep(1)
        element = context.browser.find_element_by_class_name('pin-delete')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'pin hotspot "{number}" is deleted from slide "{slide_number}" in "{mode_type}" mode')
def confirm_pin_hotspot_delete(context, number, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        elements = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        length = len(elements)
        if length == context.pin_length - 1:
            assert True
        else:
            assert False, 'Could not delete the pin hotspot'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'highlight hotspot "{number}" is deleted from slide "{slide_number}" in "{mode_type}" mode')
def confirm_highlight_hotspot_delete(context, number, slide_number, mode_type):
    assertmode(context, mode_type)
    try:
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .hotspot')
        if len(elements) == context.highlight_length - 1:
            assert True
        else:
            assert False, 'Could not delete highlight hotspot'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on settings icon')
def click_settings_icon(context):
    try:
        time.sleep(4)
        context.browser.execute_script('$(".slide_settings").click();')
    except NoSuchElementException:
        assert False, 'Element not found'


def callscript_method(context, element, path):
    context.browser.execute_script("arguments[0].style.display='block'", element)
    element.send_keys(path)
    context.browser.execute_script("arguments[0].style.display='none'", element)


@when(u'user replaces the image in slide "{slide_number}" with "{file_name}"')
def replace_slide_image(context, slide_number, file_name):
    try:
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' img')
        context.old_image_source = slide.get_attribute("src")
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-image[type="file"]')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@then(u'image in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_image_replace(context, slide_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' img')
        new_source = slide.get_attribute("src")
        if context.old_image_source == new_source:
            assert False, 'Could not replace the image'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user switches to live mode from "{mode_type}" mode')
def switch_to_live(context, mode_type):
    time.sleep(1)
    url = context.browser.current_url
    if mode_type == "edit":
        live_url = url.replace("edit/", "", 1)
    elif mode_type == "preview":
        live_url = url.replace("preview/", "", 1)
    context.browser.get(live_url)
    time.sleep(2)


@then(u'user switches to edit mode from "{mode_type}" mode')
def switch_edit_mode(context, mode_type):
    context.execute_steps(u'''
        Given user switches to edit mode from "{mode_type}" mode
        '''.format(mode_type=mode_type))


@then(u'user publishes the work done')
def publish_work(context):
    context.execute_steps(u'''
        Given user publishes the work done''')


@then(u'user switches to live mode from "{mode_type}" mode')
def switch_live_mode(context, mode_type):
    context.execute_steps(u'''
        When user switches to live mode from "{mode_type}" mode
        '''.format(mode_type=mode_type))


@when(u'user replaces the video in slide "{slide_number}" with "{file_name}"')
def replace_slide_video(context, slide_number, file_name):
    try:
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' video source')
        context.old_video_source = slide.get_attribute("src")
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-video-file[type="file"]')
        path = os.path.join(context.base_path, "assets/videos/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@when(u'user adds "{file_name}" as video cover for video in slide "{slide_number}"')
def add_video_cover(context, file_name, slide_number):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#add-replace-cover[type="file"]')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_video_replace(context, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' video source')
        new_video_source = slide.get_attribute("src")
        if context.old_video_source == new_video_source:
            assert False, 'Could not replace the video'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video cover is added for video in slide "{slide_number}" in "{mode_type}" mode')
def confirm_video_cover_addition(context, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' video')
        if element.get_attribute('poster'):
            assert True
        else:
            assert False, 'Failed to add a video cover'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user replaces the video cover for video in slide "{slide_number}" with "{file_name}"')
def replace_video_cover(context, slide_number, file_name):
    try:
        video_element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' video')
        context.old_cover_source = video_element.get_attribute('poster')
        element = context.browser.find_element_by_css_selector('.replace_media .block input#add-replace-cover[type="file"]')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'video cover of the video in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_video_cover_replace(context, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' video')
        if element.get_attribute('poster') == context.old_cover_source:
            assert False, 'Failed to replace the video cover'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user replaces the embedded video in slide "{slide_number}" with the new url "{url}"')
def enter_video_url(context, slide_number, url):
    try:
        time.sleep(1)
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' iframe')
        context.old_embedv_source = slide.get_attribute("src")
        element = context.browser.find_element_by_css_selector(
            '.edit-overlay .popup-wrap .popup-box .block input.url_input[type="text"]')
        element.send_keys(url)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'embedded video in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_embed_video_replace(context, slide_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' iframe')
        if slide.get_attribute("src") == context.old_embedv_source:
            assert False, 'Could not replace the video'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user replaces the audio file in slide "{slide_number}" with "{file_name}"')
def replace_audio(context, slide_number, file_name):
    try:
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' audio source')
        context.old_audio_source = slide.get_attribute("src")
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-audio-file[type="file"]')
        path = os.path.join(context.base_path, "assets/audios/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@when(u'user "{operation}" the "{file_name}" as audio cover for audio in slide "{slide_number}"')
def add_audio_cover(context, operation, file_name, slide_number):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#add-replace-cover[type="file"]')
        path = os.path.join(context.base_path, "assets/images/" + file_name)
        time.sleep(1)
        cover_element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .slide_audio .banner_image')
        context.old_audio_cover = cover_element.get_attribute('src')
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'audio file in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_audio_replace(context, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        slide = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' audio source')
        new_audio_source = slide.get_attribute("src")
        if context.old_audio_source == new_audio_source:
            assert False, 'Could not replace the audio'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'audio cover is "{operation}" for audio file in slide "{slide_number}" in "{mode_type}" mode')
def confirm_audio_cover_addition(context, operation, slide_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .slide_audio .banner_image')
        if element.get_attribute('src') == context.old_audio_cover:
            assert False, 'Failed to add a audio cover'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user enters "{url}" as link URL in slide "{slide_number}"')
def enter_link_url(context, url, slide_number):
    try:
        time.sleep(1)
        url_element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .slide_link .link_title + a')
        context.old_href = url_element.get_attribute('href')
        element = context.browser.find_element_by_css_selector(
            '.edit-overlay .popup-wrap .popup-box .block input.url_input[type="text"]')
        element.send_keys(url)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'link in slide "{slide_number}" is replaced in "{mode_type}" mode')
def confirm_link_replace(context, slide_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        url_element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .slide_link .link_title + a')
        if url_element.get_attribute('href') == context.old_href:
            assert False, 'Could not replace the link'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{error_message}" error message should be shown')
def show_error_message(context, error_message):
    try:
        elements = context.browser.find_elements_by_css_selector('.popup-slide-settings .error-message')
        for element in elements:
            assert error_message in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user tries to replace the image with invalid file "{file_name}"')
def replace_image_invalid(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-image[type="file"]')
        path = os.path.join(context.base_path, "assets/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@then(u'user clicks the "{button_type}" button')
def click_cancel(context, button_type):
    context.execute_steps(u'''
        When user clicks on "{button_type}"
        '''.format(button_type=button_type))


@when(u'user tries to replace the video with invalid file "{file_name}"')
def replace_video_invalid(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-video-file[type="file"]')
        path = os.path.join(context.base_path, "assets/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@when('user tries to replace the video cover with invalid file "{file_name}"')
def replace_video_cover_invalid(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#add-replace-cover[type="file"]')
        path = os.path.join(context.base_path, "assets/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user tries to replace the "{file}" with invalid url "{url}"')
def invalid_video_url(context, file, url):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector(
            '.edit-overlay .popup-wrap .popup-box .block input.url_input[type="text"]')
        element.send_keys(url)
        time.sleep(1)
        out_of_focus_elements = context.browser.find_elements_by_css_selector('.edit-overlay .popup-wrap .popup-box .popup-title')
        for element in out_of_focus_elements:
            if element.is_displayed():
                element.click()
                break
        else:
            assert False, 'No such element'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user tries to replace the audio with invalid file "{file_name}"')
def replace_audio_invalid(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#replace-audio-file[type="file"]')
        path = os.path.join(context.base_path, "assets/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'element not found'


@when(u'user tries to replace the audio cover with invalid file "{file_name}"')
def replace_audio_cover_invalid(context, file_name):
    try:
        element = context.browser.find_element_by_css_selector('.replace_media .block input#add-replace-cover[type="file"]')
        path = os.path.join(context.base_path, "assets/" + file_name)
        time.sleep(1)
        if "firefox" in context.browser.name:
            callscript_method(context, element, path)
        else:
            element.send_keys(path)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on delete icon in side panel')
def click_delete_icon(context):
    try:
        time.sleep(2)
        slides = context.browser.find_elements_by_css_selector('ul.slidesContainer li.slide')
        context.slide_length = len(slides)
        context.browser.execute_script('$(".side-panel ul div.delete-slide").click();')
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'slide is deleted from the player in "{mode_type}" mode')
def confirm_slide_delete(context, mode_type):
    try:
        time.sleep(3)
        assertmode(context, mode_type)
        slides = context.browser.find_elements_by_css_selector('ul.slidesContainer li.slide')
        if len(slides) == context.slide_length - 1:
            assert True
        else:
            assert False, 'could not delete the slide'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'drags the pin hotspot "{number}" in slide "{slide_number}" to new position')
def drag_pin_hotspot(context, number, slide_number):
    try:
        time.sleep(2)
        hotspots = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        time.sleep(1)
        for hotspot in hotspots:
            if hotspot.text == number:
                context.old_position = hotspot.location
                ActionChains(context.browser).drag_and_drop_by_offset(hotspot, -600, 200).perform()
                time.sleep(1)
                break
        else:
            assert False, 'hotspot' + number + ' not found'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'pin hotspot "{number}" position is changed in slide "{slide_number}" in "{mode_type}" mode')
def confirm_pin_reposition(context, number, slide_number, mode_type):
    try:
        time.sleep(2)
        assertmode(context, mode_type)
        hotspots = context.browser.find_elements_by_css_selector('div#slider' + slide_number + ' .drop_pin .pin-opener span')
        time.sleep(1)
        for hotspot in hotspots:
            if hotspot.text == number:
                if hotspot.location == context.old_position:
                    assert False, 'Failed to reposition the hotspots'
                else:
                    assert True
                break
        else:
            assert False, 'hotspot' + number + ' not found'
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user drags the highlight hotspot "{number}" in slide "{slide_number}" to new position')
def drag_highlight_hotspot(context, number, slide_number):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + number)
        context.old_highlight_position = element.location
        ActionChains(context.browser).drag_and_drop_by_offset(element, 300, 200).perform()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'highlight hotspot "{number}" position is changed in slide "{slide_number}" in "{mode_type}" mode')
def confirm_highlight_reposition(context, number, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + number)
        if context.old_highlight_position == element.location:
            assert False, 'Failed to reposition the hotspot'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user resizes the highlight hotspot "{hotspot_number}" in slide "{slide_number}"')
def resize_highlight_hotspot(context, hotspot_number, slide_number):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + hotspot_number)
        context.old_highlight_size = element.size
        resize_element = context.browser.find_element_by_css_selector('.ui-resizable-handle.ui-resizable-sw.ui-selectee')
        ActionChains(context.browser).drag_and_drop_by_offset(resize_element, 150, 100).perform()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'highlight hotspot "{hotspot_number}" in slide "{slide_number}" is resized in "{mode_type}" mode')
def confirm_highlight_hotspot_resize(context, hotspot_number, slide_number, mode_type):
    try:
        time.sleep(1)
        assertmode(context, mode_type)
        element = context.browser.find_element_by_css_selector('div#slider' + slide_number + ' .hotspot#hotspot' + hotspot_number)
        if element.size == context.old_highlight_size:
            assert False, 'Could not resize the highlight hotspot'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'
