@import
Feature: Sharedemos Selenium Testing of Section Import Functionality

	Scenario:Section, Sub Section and Demo Creation
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		Given user creates a section "Import Main Section" with "Import Main Section description" as description
        And user creates a subsection "Import Sub Section" under "Import Main Section" with "Import Sub Section description" as description
        And user creates a playlist "Import Playlist" under "Import Sub Section" with "Import playlist description" as description
        And user creates a demo "Import-Demo" under "Import Playlist"

	Scenario: Successful Import Category Creation
		Given user creates a section "Import Section" with "Import Section description" as description

	Scenario:Successful Section Import
		Given user is in authoring mode
		Given user selects "Import Section"
		And "layout" popup box appears
		And user selects "Import" layout
		And user expands the option "import-main-section"
		And user selects the option "import-sub-section"
		And user clicks on "DUPLICATE" button to duplicate
		Then "Import Sub Section" is present as section

	Scenario:Successful Section Import
        Given user is in authoring mode
        Given user selects "Import Section"
	    And "layout" popup box appears
	    And user selects "Import" layout
	    And user selects the option "import-main-section"
	    And user clicks on "DUPLICATE" button to duplicate
	    Then "Import Main Section" is present as section 

	Scenario:Circular Section Import
		Given user is in authoring mode
        Given user selects "Import Section"
	    And "layout" popup box appears
	    And user selects "Import" layout
	    Then "Import Section" should not be in the Import List


