@export_pdf
Feature: Sharedemos Selenium Testing of Export PDF Functionality

	Scenario:Section, Sub Section, Playlist and Demo Creation
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		Given user creates a section "Export PDF Main Section" with "Export PDF Main Section description" as description
        And user creates a subsection "Export PDF Sub Section" under "Export PDF Main Section" with "Export PDF Sub Section description" as description
        And user creates a playlist "Export PDF Playlist" under "Export PDF Sub Section" with "Export PDF playlist description" as description
        And user creates a demo "Export-PDF-Demo" under "Export PDF Playlist"

    Scenario:Checking for Export PDF Link in Playlist Page
    	Then user switches to "edit" page
    	Given user selects "Export PDF Main Section"
		And user selects "Export PDF Sub Section"
		Then "export-to-pdf-link" link should "not be" Visible

	Scenario:Enabling the Export PDF Link in Settings Page
    	Given user is in settings page
    	And clicks on "advanced" link in settings page
    	And user toggles the export pdf button
		And user presses save button in advanced settings page

	Scenario:Checking for Export PDF Link in Playlist Page
		Then user switches to "edit" page
    	Given user selects "Export PDF Main Section"
		And user selects "Export PDF Sub Section"
		Then "export-to-pdf-link" link should "be" Visible
		And user clicks on "export-to-pdf-link" link
    	And "Export PDF Sub Section.pdf" file should be downloaded