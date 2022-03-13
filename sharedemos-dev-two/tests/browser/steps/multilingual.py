import time
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.action_chains import ActionChains
from behave import then, given


@then(u'section content is in "{language}" language')
def check_section_language(context, language):
    try:
        time.sleep(2)
        title_element = context.browser.find_element_by_css_selector('.pwt-list .pwt-box[slug="english-section-1"] .title')
        description_element = context.browser.find_element_by_css_selector('.pwt-list .pwt-box[slug="english-section-1"] .pwt-details')
        if language == "English":
            assert "English-Section-1" in title_element.text
            assert "English section description" in description_element.text
        elif language == "Chinese":
            assert "Chinese-Section-1" in title_element.text
            assert "Chinese section description" in description_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'subsection content is in "{language}" language')
def check_subsection_language(context, language):
    try:
        time.sleep(2)
        title_element = context.browser.find_element_by_css_selector('.section-pwt-list .pwt-box[slug="english-subsection-1"] .title')
        description_element = context.browser.find_element_by_css_selector('.section-pwt-list .pwt-box[slug="english-subsection-1"] .pwt-description')
        if language == "English":
            assert "English-Subsection-1" in title_element.text
            assert "English subsection description" in description_element.text
        elif language == "Chinese":
            assert "Chinese-Subsection-1" in title_element.text
            assert "Chinese subsection description" in description_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'playlist content is in "{language}" language')
def check_playlist_language(context, language):
    try:
        time.sleep(2)
        title_element = context.browser.find_element_by_xpath("//div/h3[contains(text(), '" + language + "-Playlist')]")
        assert title_element
        description_element = context.browser.find_element_by_xpath("//div/p[contains(text(), '" + language + " playlist description')]")
        assert description_element
    except NoSuchElementException:
        assert False, 'Playlist content is not in ' + language


@then(u'demo content is in "{language}" language')
def check_demo_language(context, language):
    try:
        time.sleep(3)
        title_element = context.browser.find_element_by_css_selector('.pwt-list li[slug="english-demo"] .title ')
        if language == "English":
            assert "English-Demo" in title_element.text
        elif language == "Chinese":
            assert "Chinese-Demo" in title_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user changes the language to "{language}"')
def change_language(context, language):
    try:
        time.sleep(2)
        element = context.browser.find_element_by_css_selector('.header .sd-language')
        hover = ActionChains(context.browser).move_to_element(element)
        hover.perform()
        time.sleep(2)
        if language == "Chinese":
            language_element = context.browser.find_element_by_css_selector('.header .sd-language ul.language-dd li[lvalue="zh"]')
        elif language == "English":
            language_element = context.browser.find_element_by_css_selector('.header .sd-language ul.language-dd li[lvalue="en_US"]')
        time.sleep(5)
        language_element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user edits the contents of "{section_type}" "{section_name_1}" to "{section_name_2}" as title and "{description}" as description')
def edit_section_contents(context, section_type, section_name_1, section_name_2, description):
    if section_type == "subsection":
        context.execute_steps(u'''
            Given user selects "Chinese-Section-1"
            ''')
        time.sleep(1)
    context.execute_steps(u'''
        Given user clicks on edit option of "{section_name_1}"
        And user clicks on "edit" icon of "{section_name_1}"
        And user enters "{section_name_2}" as "section-name"
        And user enters "{description}" as "section-description"
        When user clicks on "save"
        Then "{section_name_2}" is added as walkthrough
        '''.format(section_name_1=section_name_1, section_name_2=section_name_2, description=description))


@then(u'user edits the contents of demo "{demo_1}" to "{demo_2}"')
def edit_demo_contents(context, demo_1, demo_2):
    context.execute_steps(u'''
        Given user selects "{demo_1}" demo
        '''.format(demo_1=demo_1))
    time.sleep(1)
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.side-info-opener .wt-title-edit')
        context.browser.execute_script("arguments[0].style.display='block'", element)
        element.click()
        context.browser.execute_script("arguments[0].style.display='none'", element)
    except NoSuchElementException:
        assert False, 'Element not found'
    context.execute_steps(u'''
        Given user enters "{demo_2}" as "demo title"
        When user clicks on "save"
        '''.format(demo_2=demo_2))


@then(u'user edits the contents of playlist "{playlist_1}" to "{playlist_2}" with "{description}" as description')
def edit_playlist_contents(context, playlist_1, playlist_2, description):
    context.execute_steps(u'''
        Given user selects "Chinese-Subsection-1"
        And user clicks on edit option of playlist "{playlist_1}"
        And user clicks on "edit" icon of playlist "{playlist_1}"
        And user enters "{playlist_2}" as "playlist name"
        And user enters "{description}" as "playlist description"
        When user clicks on "save"
        Then playlist name is updated to "{playlist_2}"
        And playlist description is updated to "{description}"
        '''.format(playlist_1=playlist_1, playlist_2=playlist_2, description=description))


@then(u'user closes the browser')
def close_browser(context):
    context.browser.close()


@given(u'user selects the demo "{demo_name}"')
def select_demo(context, demo_name):
    try:
        time.sleep(3)
        element = context.browser.find_element_by_css_selector('.pwt-list li[slug="english-demo"]')
        element.click()
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user creates a section "{section_name}" with "{description}" as description')
def create_section(context, section_name, description):
    context.execute_steps(u'''
        Given user is in authoring mode
        And "section" popup box appears
        And user enters "{section_name}" as "section-name"
        And user enters "{description}" as "section-description"
        When user clicks on "save"
        Then "{section_name}" is added as walkthrough
        '''.format(section_name=section_name, description=description))


@given(u'user creates a subsection "{subsection_name}" under "{section_name}" with "{description}" as description')
def create_subsection(context, subsection_name, section_name, description):
    context.execute_steps(u'''
        Given user selects "{section_name}"
        And "layout" popup box appears
        And user selects "Category" layout
        And user enters "{subsection_name}" as "section-name"
        And user enters "{description}" as "section-description"
        When user clicks on "save"
        Then "{subsection_name}" is added as walkthrough
        '''.format(section_name=section_name, subsection_name=subsection_name, description=description))


@given(u'user creates a playlist "{playlist_name}" under "{section_name}" with "{description}" as description')
def playlist_creation(context, playlist_name, section_name, description):
    context.execute_steps(u'''
        Given user selects "{section_name}"
        And "layout" popup box appears
        And user selects "Playlist" layout
        And user enters "{playlist_name}" as "playlist name"
        And user enters "{description}" as "playlist description"
        When user clicks on "save"
        Then "{playlist_name}" playlist is added
        '''.format(section_name=section_name, playlist_name=playlist_name, description=description))


@given(u'user creates a demo "{demo_name}" under "{playlist_name}"')
def create_demo(context, demo_name, playlist_name):
    context.execute_steps(u'''
        Given "layout" popup box appears
        And user selects "Demo" layout
        And user selects "{playlist_name}" playlist
        And user enters "{demo_name}" as "demo title"
        When user clicks on "save"
        Then "{demo_name}" is added as demo
        '''.format(playlist_name=playlist_name, demo_name=demo_name))


@given(u'user adds a slide under "{demo_name}"')
def add_slide(context, demo_name):
    context.execute_steps(u'''
    Given user selects "{demo_name}" demo
    And user clicks on plus button to create a new slide
    And user selects "add_image" icon
    And user selects URL option for "image" upload
    And user enters "http://joyofsix.typepad.com/joyofsix/images/44334153_3e9114058d.jpg" as url input for "image"
    When user clicks on upload button for "image"
    Then image is uploaded in slide "1" of "edit" mode
    '''.format(demo_name=demo_name))


@given(u'user adds a notes "{title}" as title and "{description}" as description')
def add_title_description(context, title, description):
    context.execute_steps(u'''
    Given user clicks on "notes" icon in side-panel
    When user enters "{title}" as notes title
    And user enters "{description}" as notes description
    Then "{title}" is added as notes title in "edit" mode
    And "{description}" is added as notes description in "edit" mode
    And user clicks on "notes" icon in side-panel
    '''.format(title=title, description=description))
    time.sleep(2)


@then(u'slide notes content is in "{language}" language')
def notes_content_language(context, language):
    try:
        time.sleep(2)
        title_element = context.browser.find_element_by_css_selector('.notes h1')
        description_element = context.browser.find_element_by_css_selector('.notes p')
        if language == "English":
            assert "English-Title" in title_element.text
            assert "English-Description" in description_element.text
        elif language == "Chinese":
            assert "Chinese-Title" in title_element.text
            assert "Chinese-Description" in description_element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user edits the slide notes contents to "{title}" as title and "{description}" as description')
def edit_slide_content(context, title, description):
    context.execute_steps(u'''
        Given user clicks on "notes" icon in side-panel
        ''')
    try:
        time.sleep(4)
        title_element = context.browser.find_element_by_css_selector('.notes h1')
        description_element = context.browser.find_element_by_css_selector('.notes p')
        title_element.clear()
        title_element.send_keys(title)
        description_element.clear()
        description_element.send_keys(description)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user changes the language to "{language}" from side-panel')
def change_language_side_panel(context, language):
    time.sleep(2)
    context.execute_steps(u'''
         Given user clicks on "language" icon in side-panel
         ''')
    try:
        time.sleep(1)
        if language == "Chinese":
            element = context.browser.find_element_by_css_selector('.language .languages li[lvalue="zh"]')
        elif language == "English":
            element = context.browser.find_element_by_css_selector('.language .languages li[lvalue="en_US"]')
        time.sleep(1)
        element.click()
        time.sleep(1)
    except NoSuchElementException:
        assert False, 'Element not found'


@given(u'user adds a pin hotspot in the slide "{slide_number}"')
def add_pin_hotspot(context, slide_number):
    context.execute_steps(u'''
    When user clicks on pin hotspot icon
    And user clicks at the desired place on slide "{slide_number}" to create a pin hotspot
    Then pin hotspot "1" is created in slide "{slide_number}" in "edit" mode
        '''.format(slide_number=slide_number))


@given(u'user adds "{title}" as pin hotspot title and "{description}" as pin hotspot description for pin hotspot "{hotspot_number}" in slide "{slide_number}"')
def add_pin_title(context, title, description, hotspot_number, slide_number):
    context.execute_steps(u'''
    When user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}"
    And user enters "{title}" as pin hotspot title
    And user enters "{description}" as pin hotspot description
    And user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}" again
    And user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}"
    Then "{title}" is added as pin hotspot title in "edit" mode
    And "{description}" is added as pin hotspot description in "edit" mode
        '''.format(hotspot_number=hotspot_number, slide_number=slide_number, title=title, description=description))
    time.sleep(10)


@given(u'user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}"')
def click_pin_hotspot(context, hotspot_number, slide_number):
    context.execute_steps(u'''
    When user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}"
        '''.format(hotspot_number=hotspot_number, slide_number=slide_number))


@then(u'pin hotspot title is in "{language}" language')
def confirm_pin_title_language(context, language):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.pin-tooltip h1')
        if language == "English":
            assert "English pin title" in element.text
        elif language == "Chinese":
            assert "Chinese pin title" in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'pin hotspot description is in "{language}" language')
def confirm_pin_description_language(context, language):
    try:
        time.sleep(1)
        element = context.browser.find_element_by_css_selector('.pin-tooltip p')
        if language == "English":
            assert "English pin description" in element.text
        elif language == "Chinese":
            assert "Chinese pin description" in element.text
    except NoSuchElementException:
        assert False, 'Element not found'


@then(u'user edits the pin hotspot "{hotspot_number}" in slide "{slide_number}" contents to "{title}" as pin hotspot title and "{description}" as pin hotspot description')
def change_pin_contents(context, hotspot_number, slide_number, title, description):
    try:
        context.execute_steps(u'''
            Given user clicks on "notes" icon in side-panel
            When user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}"
        '''.format(hotspot_number=hotspot_number, slide_number=slide_number))

        time.sleep(2)
        title_element = context.browser.find_element_by_css_selector('.pin-tooltip h1')
        title_element.clear()
        title_element.send_keys(title)
        description_element = context.browser.find_element_by_css_selector('.pin-tooltip p')
        description_element.clear()
        description_element.send_keys(description)
        time.sleep(1)
        context.execute_steps(u'''
            When user clicks on pin hotspot "{hotspot_number}" in slide "{slide_number}" again
        '''.format(hotspot_number=hotspot_number, slide_number=slide_number))
        time.sleep(10)

    except NoSuchElementException:
        assert False, 'Element not found'
