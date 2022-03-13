@multilingual 
Feature: Multilingual content test case scenarios
	
    @browser_locale
    @browser_language_priorities
    Scenario:Creating another language with different language Id (to check for multilingual content loading in main page).
		Given admin lands in "languages" creation page
		And "admin" enters "zh" as "id"
		And "admin" enters "Chinese" as "name"
		When "admin" clicks on submit
		Then "Chinese" is added as entry in table

    @browser_locale
    @browser_language_priorities
    Scenario:Creating sections for checking contents in default language and chinese language
        Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And user creates a section "English-Section-1" with "English section description" as description
        And user creates a subsection "English-Subsection-1" under "English-Section-1" with "English subsection description" as description
        And user creates a playlist "English-Playlist" under "English-Subsection-1" with "English playlist description" as description
        And user creates a demo "English-Demo" under "English-Playlist"
        And user adds a slide under "English-Demo"
        And user adds a notes "English-Title" as title and "English-Description" as description 
        And user adds a pin hotspot in the slide "1"
        And user adds "English pin title" as pin hotspot title and "English pin description" as pin hotspot description for pin hotspot "1" in slide "1"
    
	Scenario:Checking section contents in edit mode for default language
        Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
        And user is in authoring mode
        Then section content is in "English" language

    Scenario:Checking subsection contents in edit mode for default language
        Given user selects "English-Section-1"
        Then subsection content is in "English" language

    Scenario:Checking playlist contents and demo contents in edit mode for default language
        Given user selects "English-Subsection-1"
        Then playlist content is in "English" language
        And demo content is in "English" language

    Scenario:Checking slide notes in edit mode for default language
        Given user selects "English-Demo" demo
        And user clicks on "notes" icon in side-panel
        Then slide notes content is in "English" language

    Scenario:Checking pin hotspot contents in edit mode for default language
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "English" language
        And pin hotspot description is in "English" language

    @browser_locale
    @browser_language_priorities
    Scenario:Changing the language from default(English) to chinese and Editing the contents
    	Given user changes the language to "Chinese" from side-panel
    	And user is in authoring mode
    	Then user edits the contents of "section" "English-Section-1" to "Chinese-Section-1" as title and "Chinese section description" as description
        And user edits the contents of "subsection" "English-Subsection-1" to "Chinese-Subsection-1" as title and "Chinese subsection description" as description
        And user edits the contents of playlist "English-Playlist" to "Chinese-Playlist" with "Chinese playlist description" as description
        And user edits the contents of demo "English-Demo" to "Chinese-Demo"
        And user edits the slide notes contents to "Chinese-Title" as title and "Chinese-Description" as description 
        And user edits the pin hotspot "1" in slide "1" contents to "Chinese pin title" as pin hotspot title and "Chinese pin description" as pin hotspot description
        

    Scenario:Checking section contents in edit mode for Chinese language
        Given user is in authoring mode
        Then section content is in "Chinese" language

    Scenario:Checking subsection contents in edit mode for Chinese language
        Given user selects "Chinese-Section-1"
        Then subsection content is in "Chinese" language

    Scenario:Checking playlist contents and demo contents in edit mode for Chinese language
        Given user selects "Chinese-Subsection-1"
        Then playlist content is in "Chinese" language
        And demo content is in "Chinese" language

    Scenario:Checking slide notes contents in edit mode for chinese language
        Given user selects the demo "Chinese-Demo"
        And user clicks on "notes" icon in side-panel
        Then slide notes content is in "Chinese" language

    Scenario:Checking pin hotspot contents in edit mode for chinese language
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language

    @browser_locale
    @browser_language_priorities
    Scenario:Publishing the demo and changing the language to English
        Given user publishes the demo
        And user changes the language to "English"
       
    Scenario:Checking section contents in live mode for default language
        Given user loads domain page
        Then section content is in "English" language

    Scenario:Checking subsection contents in live mode for default language
        Given user selects "English-Section-1"
        Then subsection content is in "English" language

    Scenario:Checking playlist contents and demo contents in live mode for default language (English)
        Given user selects "English-Subsection-1"
        Then playlist content is in "English" language
        And demo content is in "English" language

    Scenario:Checking slide notes contents in live mode for default language (English)
        Given user selects "English-Demo" demo
        Then slide notes content is in "English" language

    Scenario:Checking pin hotspot contents in live mode for default language (English)
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "English" language
        And pin hotspot description is in "English" language

    Scenario:Changing the language from default(English) to chinese and checking section contents in live mode for Chinese language
        Given user changes the language to "Chinese" from side-panel
        And user loads domain page
        Then section content is in "Chinese" language

    Scenario:Checking subsection contents in live mode for Chinese language
        Given user selects "Chinese-Section-1"
        Then subsection content is in "Chinese" language

    Scenario:Checking playlist contents and demo contents in live mode for Chinese language
        Given user selects "Chinese-Subsection-1"
        Then playlist content is in "Chinese" language
        And demo content is in "Chinese" language

    Scenario:Checking slide notes contents in live mode for Chinese language
        Given user selects the demo "Chinese-Demo"
        Then slide notes content is in "Chinese" language

    Scenario:Checking pin hotspot contents in live mode for Chinese language
        Given user clicks on pin hotspot "1" in slide "1"
        Then pin hotspot title is in "Chinese" language
        And pin hotspot description is in "Chinese" language