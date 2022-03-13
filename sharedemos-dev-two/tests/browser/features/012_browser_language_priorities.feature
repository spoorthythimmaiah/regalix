@browser_language_priorities
@set_browser_locale_with_language_priorities 
Feature: Setting browser language priorities to German, Chinese and English and testing contents when German language contents are not available

	Scenario:In edit mode, checking that section content is in Chinese language when German language contents are not available
	    Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password 
	    And user is in authoring mode
	    Then section content is in "Chinese" language

	Scenario:In edit mode, checking that subsection content is in Chinese language when German language contents are not available
	    Given user selects "Chinese-Section-1"
	    Then subsection content is in "Chinese" language

	Scenario:In edit mode, checking that playlist content and demo content is in Chinese language when German language contents are not available
	    Given user selects "Chinese-Subsection-1"
	    Then playlist content is in "Chinese" language
	    And demo content is in "Chinese" language

	Scenario:In edit mode, checking that slide content is in Chinese language when German language contents are not available
		Given user selects the demo "Chinese-Demo"
        And user clicks on "notes" icon in side-panel
        Then slide notes content is in "Chinese" language

    Scenario:In edit mode, checking that pin hotspot content is in Chinese language when German language contents are not available
    	Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language

	Scenario:In live mode, checking that section content is in Chinese language when German language contents are not available
        Given user loads domain page
        Then section content is in "Chinese" language

    Scenario:In live mode, checking that subsection content is in Chinese language when German language contents are not available
        Given user selects "Chinese-Section-1"
        Then subsection content is in "Chinese" language

    Scenario:In live mode, checking that playlist content and demo content is in Chinese language when German language contents are not available
        Given user selects "Chinese-Subsection-1"
        Then playlist content is in "Chinese" language
        And demo content is in "Chinese" language

    Scenario:In live mode, checking that slide content is in Chinese language when German language contents are not available
    	Given user selects the demo "Chinese-Demo"
        Then slide notes content is in "Chinese" language

    Scenario:In live mode, checking that pin hotspot content is in Chinese language when German language contents are not available
    	Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language