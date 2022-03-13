from selenium.common.exceptions import NoSuchElementException
from behave import then


@then('"{source_demo}" position is changed with "{destination_demo}"')
def demo_position_change(context, source_demo, destination_demo):
    try:
        demo = source_demo.lower()
        elements = context.browser.find_elements_by_css_selector('.pwt-list li')
        if elements[2].get_attribute('slug') == demo:
            assert True
        else:
            assert False, 'Could not change the position of demo'
    except NoSuchElementException:
        assert False, 'Element not found'
