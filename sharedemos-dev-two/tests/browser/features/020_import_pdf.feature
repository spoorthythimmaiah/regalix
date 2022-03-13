Feature: Sharedemos Selenium Testing of PDF to Slides Functionality

	Scenario:Section, Sub Section and Demo Creation
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		Given user creates a section "Import PDF Main Section" with "Import PDF Main Section description" as description
        And user creates a subsection "Import PDF Sub Section" under "Import PDF Main Section" with "Import PDF Sub Section description" as description
        And user creates a playlist "Import PDF Playlist" under "Import PDF Sub Section" with "Import PDF playlist description" as description
        And user creates a demo "Import-PDF-Demo" under "Import PDF Playlist"

    Scenario:Upload PDF for image slides
    	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		When user clicks on edit button
		Then user is in authoring mode
		Given user selects "Import PDF Main Section"
		And user selects "Import PDF Sub Section"
		And user selects "Import-PDF-Demo" demo
	    And user clicks on plus button to create a new slide
	    And user selects "add_pdf" icon
	    When user uploads an pdf file "Sample.pdf"
	    Then "5" pages of pdf is present as image slides in "edit" mode

	Scenario:Checking the PDF Image Slides in Preview mode
		Then user switches to preview mode from "edit" mode
		And "5" pages of pdf is present as image slides in "preview" mode

	Scenario:Checking the PDF Image Slides in Live mode
		Then user switches to edit mode from "preview" mode
		And user publishes the work done
		And user switches to live mode from "edit" mode
		And "5" pages of pdf is present as image slides in "live" mode
