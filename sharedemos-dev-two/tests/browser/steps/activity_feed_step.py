import time

from datetime import datetime, timedelta
from behave import when, then
from selenium.common.exceptions import NoSuchElementException


@when(u'user clicks on "{icon_button}" button')
def click_activity_button(context, icon_button):
    try:
        element = context.browser.find_element_by_id(icon_button + "-icon")
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'"{heading}" should be the heading of the Page')
def heading(context, heading):
    try:
        element = context.browser.find_element_by_css_selector(".activity-feeds-block h1")
        time.sleep(2)
        assert heading in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user switches to "{page_type}" page')
def change_page(context, page_type):
    try:
        if page_type == "edit":
            context.browser.get('http://vmw.sharedemos.com:5000/edit')
        elif page_type == "activity":
            context.browser.get("http://vmw.sharedemos.com:5000/dashboard/activity")
        elif page_type == "library":
            context.browser.get("http://vmw.sharedemos.com:5000/dashboard/library")
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user checks activity feed for the feed "{feed}"')
def section_feed(context, feed):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('div.activity-details')
        for element in elements:
            if element.text == feed:
                assert True
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clicks on menu icon in activity page')
def menu(context):
    try:
        element = context.browser.find_element_by_class_name("hamburger-box")
        time.sleep(2)
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user enters "{search_text}" in search input')
def search(context, search_text):
    try:
        element = context.browser.find_element_by_id("search-activity-post")
        time.sleep(2)
        element.click()
        element.clear()
        element.send_keys(search_text)
        time.sleep(5)
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user "{option}" the "{option_type}" as "{author}" in filter list')
def author_filter(context, author, option, option_type):
    try:
        time.sleep(2)
        elements = context.browser.find_elements_by_css_selector('div.search-' + option_type + '-list a.search-' + option_type + ' em')
        for element in elements:
            if element.text == author:
                element.click()
                break
        else:
            assert False, 'No match'
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user clears in search input')
def search_input(context):
    try:
        element = context.browser.find_element_by_id("search-activity-post")
        time.sleep(2)
        element.click()
        element.clear()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user filters the date from day before yesterday to yesterday')
def date_filter(context):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_id("search-from")
        element.click()
        time.sleep(2)
        from_date = datetime.now() - timedelta(days=2)
        context.browser.execute_script("$('div.datepicker--cell-day[data-date=" + str(from_date.day) + "]').click();")
        time.sleep(2)
        to_date = datetime.now() - timedelta(days=1)
        element = context.browser.find_element_by_id("search-until")
        element.click()
        time.sleep(2)
        context.browser.execute_script("$('div.datepicker--cell-day[data-date=" + str(to_date.day) + "]')[1].click();")
        time.sleep(2)
        time.sleep(2)
    except NoSuchElementException:
        assert False, 'Element not found'
