import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, when, then


@given(u'user clicks on Add New Cta button')
def click_add_new_cta(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_class_name('add-cta-btn')
        context.browser.execute_script("arguments[0].scrollIntoView(false)", element)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on ADD CTA')
def click_add_cta_submit(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.edit-overlay .popup-wrap .popup-box .popup-footer .save[value="ADD CTA"]')
        element.click()
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'CTA Button is added under "{section}"')
def confirm_cta_button_addition(context, section):
    time.sleep(2)
    context.execute_steps(u'''
        Given user selects "{section}"
        '''.format(section=section))
    try:
        element = context.browser.find_element_by_css_selector('.sign-up .cta-link')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'clicking on the "{cta_button}" opens the link "{link}"')
def click_cta_button(context, cta_button, link):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('.sign-up .cta-link')
        for element in elements:
            if element.is_displayed():
                element.click()
        time.sleep(4)
        for handle in context.browser.window_handles:
            context.browser.switch_to_window(handle)
        assert 'www.google.co.in' in context.browser.current_url
        context.browser.close()
        for handle in context.browser.window_handles:
            context.browser.switch_to_window(handle)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects CTA FORM')
def select_cta_form(context):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('label.css-radio-label[for="cta_form"]')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters "{field}" as cta_field')
def enter_cta_field(context, field):
    try:
        element = context.browser.find_element_by_class_name('add-cta-field')
        element.click()
        field_elements = context.browser.find_elements_by_name('cta_field')
        length = len(field_elements)
        field_elements[length - 1].send_keys(field)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'CTA Form is added under "{section}"')
def confirm_cta_form_addition(context, section):
    time.sleep(3)
    context.execute_steps(u'''
        Given user selects "{section}"
        '''.format(section=section))
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.section-pwt-list .sign-up .sign-up-btn')
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters nothing in "{link}" field')
def enter_nothing_in_link(context, link):
    try:
        element = context.browser.find_element_by_name(link)
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on the CTA form')
def click_cta_form(context):
    try:
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.section-pwt-list .sign-up .sign-up-btn')
        for element in elements:
            if element.is_displayed():
                element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'user clicks on submit')
def click_submit(context):
    try:
        time.sleep(4)
        element = context.browser.find_element_by_css_selector('.overlay .sign-up-wrap .sign-box .form-footer input[type="submit"]')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'form details like Name "{name}" and Company "{company}" gets updated in the leads page')
def update_leads_page(context, name, company):
    time.sleep(4)
    context.browser.get(context.base_tenant_url + "/dashboard/leads/")
    time.sleep(1)
    try:
        name_elements = context.browser.find_elements_by_css_selector('.report-area .lead-report .lead-row .name')
        company_elements = context.browser.find_elements_by_css_selector('.report-area .lead-report .lead-row .company')
        check_presence(context, name_elements, name)
        check_presence(context, company_elements, company)
    except NoSuchElementException:
        assert False, 'Element not found'


def check_presence(context, elements, item):
    for element in elements:
        if item in element.text:
            assert True
            break
    else:
        assert False, 'Could not add' + element


@then(u'"{message}" should be displayed as error')
def display_error(context, message):
    try:
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.error-message')
        for element in elements:
            if element.is_displayed():
                assert message in element.text
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects "{select_option}" under CALL-To-ACTION')
def select_call_to_action(context, select_option):
    try:
        select_element = context.browser.find_element_by_css_selector('div#create-edit-section div#list-playlist-name')
        context.browser.execute_script("arguments[0].scrollIntoView(false)", select_element)
        select_element.click()
        time.sleep(2)
        option_elements = context.browser.find_elements_by_css_selector('div#create-edit-section div#list-playlist-name ul.dropdown-list li')
        for option in option_elements:
            if select_option in option.text:
                option.click()
                break
        else:
            assert False, select_option + ' option not found'
    except NoSuchElementException:
        assert False, 'Element not found'
