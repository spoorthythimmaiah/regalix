import os
import time
from selenium.common.exceptions import NoSuchElementException
from behave import given, when, then
from bs4 import BeautifulSoup
from datetime import date, timedelta


def check_section(context, section):
    try:
        time.sleep(3)
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert True
                break
        else:
            assert False, 'Oops, ' + section + ' is not visible'
    except NoSuchElementException:
        assert False, 'Element not found'


def check_section_not_visible(context, section):
    time.sleep(2)
    try:
        elements = context.browser.find_elements_by_css_selector('.pwt-box .title')
        for element in elements:
            if element.text == section:
                assert False, 'Should not display'
                break
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user switches the window handle')
def switch_window(context):
    for handle in context.browser.window_handles:
        context.browser.switch_to_window(handle)


@given(u'admin user is in audiences page')
def load_audience_page(context):
    time.sleep(2)
    context.browser.get(context.base_tenant_url + "/dashboard/audiences/")


@given(u'a popup box to add new company appears')
def add_new_company_popup(context):
    try:
        element = context.browser.find_element_by_css_selector('.add-new.company')
        time.sleep(1)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'a new company with url "{url}" is added')
def confirm_new_company(context, url):
    try:
        time.sleep(6)
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + url + "')]")
        assert url in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user enters nothing in company website')
def enter_nothing_in_website(context):
    try:
        element = context.browser.find_element_by_css_selector('input[type="url"].full')
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin user clicks on "{button_type}" button of company with the url "{company_url}"')
def click_add_user(context, button_type, company_url):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/following-sibling::div/div[contains(@class, '" + button_type + "')]")
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin user enters "{lastname}" as user lastname')
def enter_lastname(context, lastname):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_css_selector('.block input.half[type="text"][name="employee_lname"]')
        element.clear()
        element.send_keys(lastname)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'admin user clicks on submit')
def click_submit(context):
    try:
        time.sleep(2)
        submit_element = context.browser.find_element_by_css_selector('.company-add-user-popup input[type="submit"]')
        time.sleep(2)
        submit_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given('admin user enters "{firstname}" as user firstname')
def enter_firstname(context, firstname):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_css_selector('.block input.half[type="text"][name="employee_fname"]')
        element.clear()
        element.send_keys(firstname)
    except NoSuchElementException:
        assert False, 'Element not found'


@given('admin user enters nothing in user lastname')
def enter_nothing_lastname(context):
    try:
        element = context.browser.find_element_by_css_selector('.block input.half[type="text"][name="employee_lname"]')
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@given('admin user enters "{email}" as user email')
def enter_email(context, email):
    try:
        element = context.browser.find_element_by_css_selector('input[type="email"].full')
        element.clear
        element.send_keys(email)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user with email "{email}" is added to the company with url "{company_url}"')
def confirm_added_user(context, email, company_url):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/parent::div/following-sibling::div/div[contains(@class, 'audiences')]/div[contains(@class, 'audience-details')]/div[contains(@class, 'audience-info')]/div[contains(text(), '" + email + "')]")
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'a sign in link is sent to the mail "{email}"')
def check_mail(context, email):
    file_name = email[:-10] + '.html'
    path = os.path.join(context.base_path, "tmp/" + file_name)
    html_page = open(path, 'r')
    soup = BeautifulSoup(html_page)
    if len(soup.findAll('a')):
        assert True
    else:
        assert False, 'Sign in  link not present in the mail'


@given(u'audience user clicks on the sign in link sent to "{email_id}"')
def click_signin_link(context, email_id):
    file_name = email_id[:-10] + '.html'
    path = os.path.join(context.base_path, "tmp/" + file_name)
    html_page = open(path, 'r')
    soup = BeautifulSoup(html_page)
    for link in soup.findAll('a'):
        href_link = link.get('href')
        break
    time.sleep(1)
    context.browser.get(href_link)
    time.sleep(3)


@then(u'user details for user with email "{email_id}" gets updated to "{new_name}"')
def user_details_update(context, email_id, new_name):
    context.browser.get(context.base_tenant_url + "/dashboard/audiences/")
    try:
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + email_id + "')]/preceding-sibling::div")
        assert new_name in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user is redirected to "{page_title}" page')
def load_walkthroughs(context, page_title):
    try:
        time.sleep(4)
        element = context.browser.find_element_by_css_selector('.fs-banner .title1')
        assert page_title in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'there are no users in the company with url "{company_url}"')
def confirm_no_user(context, company_url):
    try:
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/parent::div/following-sibling::div")
        assert "No added users yet." in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'share button for the company with url "{company_url}" is disabled')
def disable_share(context, company_url):
    try:
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/following-sibling::div/div[contains(@class, 'share')]")
        classes = element.get_attribute('class')
        assert "disabled" in classes
    except NoSuchElementException:
        assert False, 'Element not found'


@then('"{title}" is displayed in the navigation bar')
def display_title(context, title):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('.fixed-left-nav ul li a div')
        for element in elements:
            if title in element.text:
                assert True
                break
        else:
            assert False, title + " not found in the navigation bar"
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{user_type}" user have access to audiences page')
def audience_page_access(context, user_type):
    context.browser.get(context.base_tenant_url + "/dashboard/audiences/")
    try:
        element = context.browser.find_element_by_css_selector('.dashboard-work-area .work-area .dashboard-main-title')
        assert "Audiences" in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{title}" is not displayed in the navigation bar')
def title_absent_in_navbar(context, title):
    try:
        element = context.browser.find_element_by_css_selector('.fixed-left-nav ul li:last-child a div')
        if title not in element.text:
            assert True
        else:
            assert False, 'Audiences should not be displayed'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'a new user with email "{email_id}" is added to the company with url "{company_url}"')
def add_new_user(context, email_id, company_url):
    context.execute_steps(u'''
        Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
        And admin user is in audiences page ''')
    time.sleep(2)
    try:
        time.sleep(3)
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/parent::div/following-sibling::div/div[contains(@class, 'audiences')]/div[contains(@class, 'audience-details')]/div[contains(@class, 'audience-info')]/div[contains(text(), '" + email_id + "')]")
        assert element
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user toggles privacy to "{privacy}"')
def toggle_privacy(context, privacy):
    try:
        element = context.browser.find_element_by_css_selector('input.css-checkbox[type="checkbox"] + label[for="private"].css-label')
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'public category "{category}" is visible to the "{user_type}" user')
def show_public_category(context, category, user_type):
    time.sleep(4)
    check_section(context, category)


@then(u'private category "{category}" is not visible to the "{user_type}" user')
def private_category_not_shown(context, category, user_type):
    check_section_not_visible(context, category)


@then(u'private category "{category}" is visible to the "{user_type}" user')
def private_category_shown(context, category, user_type):
    check_section(context, category)


@given(u'user selects a category "{category}"')
def select_category(context, category):
    try:
        time.sleep(3)
        label_element = context.browser.find_element_by_css_selector('label[for="select-products"]')
        label_element.click()
        time.sleep(2)
        checkbox_element = context.browser.find_element_by_css_selector('label.css-label[for="ch-audience-section"]')
        checkbox_element.click()
        select_element = context.browser.find_element_by_css_selector('.popup-footer div.select.button')
        select_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects current date as the date of expiry')
def enter_expiry_date(context):
    try:
        element = context.browser.find_element_by_css_selector('input#link-expire-datetime')
        current_date = time.strftime("%m/%d/%Y")
        element.clear()
        element.send_keys(current_date)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'admin user clicks on save')
def click_save(context):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('.popup-footer input.button[value="SAVE"]')
        elements[2].click()
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'audience user of Regalix signs in')
def user_sign_in(context):
    context.execute_steps(u'''
        Given audience user clicks on the sign in link sent to "phabbu@regalix-inc.com"
        ''')


@when(u'audience user of Regalix company signs in')
def company_user_sign_in(context):
    context.execute_steps(u'''
        Given audience user clicks on the sign in link sent to "phabbu@regalix-inc.com"
        And "user" enters "Swati" as "first_name"
        And "user" enters "Habbu" as "last_name"
        And "user" enters "phabbu@regalix-inc.com" as "email"
        And "user" enters "Developer" as "designation"
        When "user" clicks on submit
        Then user is redirected to "PRODUCT WALKTHROUGHS" page
        ''')


@given(u'public user loads the tenant')
def load_tenant(context):
    context.browser.get(context.base_tenant_url)


@given(u'user clicks on cancel button')
def click_cancel_button(context):
    try:
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.popup-footer div.cancel.button')
        elements[2].click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user selects previous day date as the date of expiry')
def select_previous_day(context):
    try:
        element = context.browser.find_element_by_css_selector('input#link-expire-datetime')
        prev_date = date.today() - timedelta(2)
        yday_date = prev_date.strftime("%m/%d/%Y")
        element.send_keys(yday_date)
    except NoSuchElementException:
        assert False, 'Element not found'


@when(u'audience user of Google tries to sign in using the link sent')
def audience_sign_in(context):
    context.execute_steps(u'''
        Given audience user clicks on the sign in link sent to "rsajjan@google.com"
        ''')


@then(u'404 error page is displayed')
def error_page(context):
    try:
        element = context.browser.find_element_by_class_name('error_spage')
        assert element
    except NoSuchElementException:
        assert False, 'Something went wrong'


@then(u'company name of the company with url "{company_url}" gets updated to "{company_name}"')
def update_company_details(context, company_url, company_name):
    try:
        time.sleep(13)
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/preceding-sibling::div")
        assert company_name in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'unsuccessfull message is displayed')
def display_unsuccessfull(context):
    try:
        element = context.browser.find_element_by_css_selector('div.failed.slide-in')
        assert "OOPS! UNSUCCESSFULL" in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on cancel')
def click_cancel(context):
    try:
        time.sleep(5)
        element = context.browser.find_element_by_css_selector('.popup-footer div.cancel.button')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{message}" should be displayed as popup error')
def display_message(context, message):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_class_name('no-category')
        assert message in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'main category "{section}" is marked as "{privacy}"')
def mark_section_public(context, section, privacy):
    context.execute_steps(u'''
        Given user is in authoring mode
        And user clicks on edit option of "{section}"
        And user clicks on "edit" icon of "{section}"
        And user toggles privacy to "{privacy}"
        When user clicks on "save"
        '''.format(section=section, privacy=privacy))


@given(u'child category "{sub_section}" is marked as private')
def mark_subsection_private(context, sub_section):
    context.execute_steps(u'''
        Given user selects "Audience-Section"
        And user clicks on edit option of "{section}"
        And user clicks on "edit" icon of "{section}"
        And user toggles privacy to "public"
        When user clicks on "save"
        '''.format(section=sub_section))


@given(u'user selects a child category "{section}"')
def select_sub_category(context, section):
    try:
        time.sleep(2)
        label_element = context.browser.find_element_by_css_selector('label[for="select-products"]')
        label_element.click()
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('div.category.disabled.closed')
        element.click()
        time.sleep(1)
        checkbox_element = context.browser.find_element_by_css_selector('label.css-label[for="ch-audience-sub-section"]')
        checkbox_element.click()
        select_element = context.browser.find_element_by_css_selector('.popup-footer div.select.button')
        select_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'public parent "{section}" is visible to "{user_type}" user')
def public_parent_visible(context, section, user_type):
    time.sleep(3)
    check_section(context, section)


@then(u'private child "{child_section}" of public parent "{parent_section}" is visible to the "{user_type}" user')
def private_child_visible(context, child_section, parent_section, user_type):
    time.sleep(2)
    context.execute_steps(u'''
        Given user selects "{parent_section}"
        '''.format(parent_section=parent_section))
    time.sleep(2)
    check_section(context, child_section)


@then(u'child content "{child_content}" of private child "{child_section}" is visible to the "{user_type}" user')
def child_content_visible(context, child_content, child_section, user_type):
    time.sleep(2)
    context.execute_steps(u'''
        Given user selects "{child_section}"
        '''.format(child_section=child_section))
    time.sleep(5)
    try:
        elements = context.browser.find_elements_by_css_selector('.pwt-list li .title div')
        for element in elements:
            if element.text == child_content:
                assert True
                break
        else:
            assert False, 'Oops, child content of a private child ' + child_content + ' is not visible'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'private child "{child_section}" of public parent "{parent_section}" is not visible to the "{user_type}" user')
def private_child_not_visible(context, child_section, parent_section, user_type):
    time.sleep(2)
    context.execute_steps(u'''
        Given user selects "{parent_section}"
        '''.format(parent_section=parent_section))
    time.sleep(2)
    check_section_not_visible(context, child_section)


@then(u'"{demo_name}" demo is published')
def publish_demo(context, demo_name):
    context.execute_steps(u'''
        Given user loads domain page
        And user selects "Audience-Section"
        And user selects "Audience-Sub-Section"''')
    demo = demo_name.lower()
    element = context.browser.find_element_by_css_selector('.pwt-list li[slug="' + demo + '"]')
    assert element


@given(u'admin user deletes the audience user with email "{email_id}" under company with url "{company_url}"')
def delete_user(context, email_id, company_url):
    try:
        element = context.browser.find_element_by_xpath("//div[contains(text(), '" + company_url + "')]/parent::div/parent::div/parent::div/following-sibling::div/div[contains(@class, 'audiences')]/div[contains(@class, 'audience-details')]/div[contains(@class, 'audience-info')]/div[contains(text(), '" + email_id + "')]/following-sibling::div/div[contains(@class, 'remove')]")
        element.click()
        time.sleep(3)
        remove_element = context.browser.find_element_by_css_selector('.popup-footer .button[value="REMOVE"]')
        remove_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'admin user re-adds the audience user with email "{email_id}" under company with url "{company_url}"')
def re_add_user(context, email_id, company_url):
    context.execute_steps(u'''
        Given admin user clicks on "add-user" button of company with the url "{company_url}"
        And admin user enters "Swati" as user firstname
        And admin user enters "Habbu" as user lastname
        And admin user enters "{email_id}" as user email
        When admin user clicks on submit
        Then user with email "{email_id}" is added to the company with url "{company_url}"
    '''.format(company_url=company_url, email_id=email_id))


@then(u'private child category "{child_section}" is visible to the "{user_type}" user')
def child_visible(context, child_section, user_type):
    time.sleep(2)
    context.execute_steps(u'''
        Given user selects "Audience-Section"
        ''')
    time.sleep(2)
    check_section(context, child_section)


@then(u'public categories "{category1}" and "{category2}" are not present in the select categories popup')
def public_categories_not_present(context, category1, category2):
    try:
        elements = context.browser.find_elements_by_css_selector('.select-category .level1 .category.closed')
        for element in elements:
            if element.text == category1 or element.text == category2:
                assert False, 'category should not present'
        else:
            assert True
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user is in settings page')
def load_settings_page(context):
    context.browser.get(context.base_tenant_url + "/dashboard/library/")
    time.sleep(2)
    try:
        element = context.browser.find_element_by_id('settingsBtn')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user toggles the privacy button to "{privacy}"')
def toggle_privacy_button(context, privacy):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('input[type=checkbox]#private_tenant + label.css-toggle-label[for="private_tenant"]')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user clicks on the save button in settings page')
def click_save_button(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.button-wrap .button.save')
        element.click()
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'categories "{category1}" and "{category2}" are present in the select categories popup')
def public_categories_present(context, category1, category2):
    try:
        time.sleep(2)
        label_element = context.browser.find_element_by_css_selector('label[for="select-products"]')
        label_element.click()
        time.sleep(1)
        elements = context.browser.find_elements_by_css_selector('.select-category .level1 .category.closed')
        for element in elements:
            if element.text == category1:
                assert True
                break
        else:
            assert False, 'Category ' + category1 + ' not found'
        for element in elements:
            if element.text == category2:
                assert True
                break
        else:
            assert False, 'Category' + category2 + 'not found'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'categories are not visible to the public user')
def categories_not_visible(context):
    try:
        element = context.browser.find_element_by_class_name('error_spage')
        assert element
    except NoSuchElementException:
        assert False, 'Something went wrong'
