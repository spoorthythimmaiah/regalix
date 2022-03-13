import time
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from behave import given, then, when


@given(u'user selects "{section}"')
def select_section(context, section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                element.click()
                time.sleep(2)
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{demo}" is added as demo')
def add_demo(context, demo):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo.lower() + '"]')
        assert element
    except NoSuchElementException:
        assert False, 'Could not add'


@given(u'user selects "{demo}" demo')
def select_demo(context, demo):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo.lower() + '"]')
        time.sleep(1)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user selects "{demo}" demo')
def select_demo_again(context, demo):
    context.execute_steps(u'''
        Given user selects "{demo}" demo
        '''.format(demo=demo))


@then(u'"{demo_name}" demo is present in live mode')
def live_demo_present(context, demo_name):
    time.sleep(2)
    demo = demo_name.lower()
    element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo + '"]')
    assert element


@then(u'"{demo_name}" demo is disabled in edit mode')
def confirm_demo_disable(context, demo_name):
    time.sleep(4)
    demo = demo_name.lower()
    try:
        element = context.browser.find_element_by_css_selector('.pwt-list li.disabled[slug="' + demo + '"]')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{demo_name}" demo is not present in live mode')
def live_demo_absent(context, demo_name):
    time.sleep(2)
    demo = demo_name.lower()
    try:
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug=' + demo + ']')
        if element:
            assert False, 'Oops,' + demo_name + ' demo shouldn\'t have displayed here'
    except NoSuchElementException:
        assert True


@then(u'"{demo_name}" demo is enabled in edit mode')
def confirm_demo_enable(context, demo_name):
    time.sleep(4)
    demo = demo_name.lower()
    try:
        element = context.browser.find_element_by_css_selector('.pwt-list li.disabled[slug="' + demo + '"]')
        if element:
            assert False, 'Not enabled'
    except NoSuchElementException:
        assert True


@given(u'user rearranges the position of "{source_section}" with "{destination_section}"')
def demo_rearrangement(context, source_section, destination_section):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('div ul.pwt-list li')
        count = 0
        for element in elements:
            count += 1
            if element.get_attribute('slug') == source_section.lower():
                context.source_demo_position = count
            elif element.get_attribute('slug') == destination_section.lower():
                context.destination_demo_position = count
        source = source_section.lower()
        destination = destination_section.lower()
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + source + '"]')
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        time.sleep(1)
        destination_element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + destination + '"]')
        source_element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + source + '"] .section-drag')
        time.sleep(2)
        ActionChains(context.browser).drag_and_drop(source_element, destination_element).perform()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{demo_name}" position is changed')
def confirm_demo_reposition(context, demo_name):
    try:
        elements = context.browser.find_elements_by_css_selector('div ul.pwt-list li')
        count = 0
        for element in elements:
            count += 1
            if element.get_attribute('slug') == demo_name.lower():
                if count == context.destination_demo_position:
                    assert True
                    break
                else:
                    assert False, 'Position not changed with the destination element'
        else:
            assert False, 'No match found for ' + demo_name
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'close the demo edit option')
def close_demo_edit(context):
    try:
        element = context.browser.find_element_by_css_selector('.pwt-list li.active .chapter-edit-hamburger')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{demo}" demo is deleted')
def confirm_delete(context, demo):
    try:
        time.sleep(4)
        demo_name = demo.lower()
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo_name + '"]')
        if element:
            assert False, 'Could not delete the demo'
    except NoSuchElementException:
        assert True


@given(u'user selects "{playlist}" playlist')
def select_playlist(context, playlist):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_css_selector('div#create-edit-demo div#list-playlist-name')
        element.click()
        time.sleep(3)
        select_options = context.browser.find_elements_by_css_selector('div#create-edit-demo div#list-playlist-name ul.dropdown-list li')
        for option in select_options:
            if playlist in option.text:
                option.click()
                break
        else:
            assert False, playlist + ' option not found'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user loads domain page')
def load_domain_page(context):
    context.browser.get(context.base_tenant_url)


@given(u'user publishes the demo')
def publish_demo(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_class_name('publish')
        element.click()
        time.sleep(1)
        confirm_element = context.browser.find_element_by_class_name('confirm-publish')
        time.sleep(2)
        confirm_element.click()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user "{edit}"s the demo "{demo_name}"')
def edit_demo(context, edit, demo_name):
    time.sleep(1)
    if edit == "delete":
        edit_icon = "delete"
    elif edit == "enable" or "disable":
        edit_icon = "enable"
    context.execute_steps(u'''
        Given user loads the demo "{demo_name}"
        And user clicks on edit option of demo "{demo_name}"
        And user clicks on "{edit_icon}" icon of demo "{demo_name}"
        When user "{edit}"s the "section"
        '''.format(demo_name=demo_name, edit=edit, edit_icon=edit_icon))


@given(u'user loads the demo "{demo_name}"')
def load_page(context, demo_name):
    if demo_name == 'Demo-Section':
        context.browser.get(context.base_tenant_url + '/edit/#!/file-section/sub-section')
        time.sleep(1)
    elif demo_name == 'One-level-deep-demo':
        context.browser.get(context.base_tenant_url + '/edit/#!/one-level-deep-section')


@given(u'user clicks on edit option of demo "{demo_name}"')
def click_demo_edit(context, demo_name):
    try:
        time.sleep(3)
        demo = demo_name.lower()
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo + '"]')
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        time.sleep(3)
        edit_element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo + '"] .chapter-edit-hamburger')
        if edit_element.is_displayed():
            edit_element.click()
        else:
            assert False, 'Could not edit the demo'
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on "{edit}" icon of demo "{demo_name}"')
def click_demo_enable(context, edit, demo_name):
    try:
        time.sleep(2)
        demo = demo_name.lower()
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo + '"] .chapter-edit-options .chapter-' + edit)
        time.sleep(3)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user edits the name of a demo to "{new_demo_name}"')
def edit_demo_name(context, new_demo_name):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.side-info-opener .wt-title-edit')
        context.browser.execute_script("arguments[0].style.display='block'", element)
        element.click()
        context.browser.execute_script("arguments[0].style.display='none'", element)
    except NoSuchElementException:
        assert False, 'Element not found'
    context.execute_steps(u'''
            Given user enters "{new_demo_name}" as "demo title"
            When user clicks on "save"
            '''.format(new_demo_name=new_demo_name))


@then(u'demo name is changed to "{new_demo_name}" inside the player')
def confirm_demo_name_edit(context, new_demo_name):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.side-info-opener span[type=demo-title]')
        assert new_demo_name in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'demo name is changed to "{new_demo_name}" outside of player')
def confirm_demo_name_change(context, new_demo_name):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.side-info-opener .icon')
        element.click()
        time.sleep(1)
        back_arrow = context.browser.find_element_by_css_selector('.side-info .back')
        back_arrow.click()
        time.sleep(1)
        demo_element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + new_demo_name.lower() + '"]')
        assert demo_element
    except NoSuchElementException:
        assert False, 'Element not found'
