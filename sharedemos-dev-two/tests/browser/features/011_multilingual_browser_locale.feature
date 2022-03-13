@browser_locale
@set_browser_locale
Feature: Changing browser default language to chinese and testing the contents for default browser language

    Scenario:In edit mode, checking that section content is in chinese language when browser default language is set to chinese
        Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password 
        And user is in authoring mode
        Then section content is in "Chinese" language
        
    Scenario:In edit mode, checking that subsection content is in chinese language when browser default language is set to chinese
        Given user selects "Chinese-Section-1"
        Then subsection content is in "Chinese" language

    Scenario:In edit mode, checking that playlist content and Demo content is in chinese language when browser default language is set to chinese
        Given user selects "Chinese-Subsection-1"
        Then playlist content is in "Chinese" language
        And demo content is in "Chinese" language

    Scenario:In edit mode, checking that slide notes content is in chinese language when browser default language is set to chinese
        Given user selects the demo "Chinese-Demo"
        And user clicks on "notes" icon in side-panel
        Then slide notes content is in "Chinese" language

    Scenario:In edit mode, checking that pin hotspot content is in chinese language when browser default language is set to chinese
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language

    Scenario:In live mode, checking that section content is in chinese language when browser default language is set to chinese
        Given user loads domain page
        Then section content is in "Chinese" language

    Scenario:In live mode, checking that subsection content is in chinese language when browser default language is set to chinese
        Given user selects "Chinese-Section-1"
        Then subsection content is in "Chinese" language

    Scenario:In live mode, checking that playlist content and demo content is in chinese language when browser default language is set to chinese
        Given user selects "Chinese-Subsection-1"
        Then playlist content is in "Chinese" language
        And demo content is in "Chinese" language

    Scenario:In live mode, checking that slide content is in chinese language when browser default language is set to chinese 
        Given user selects the demo "Chinese-Demo"
        Then slide notes content is in "Chinese" language

    Scenario:In live mode, checking that pin hotspot content is in chinese language when browser default language is set to chinese
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language