@cta
Feature: Selenium testing of CTA
	Scenario:Creating new section and subsection
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
        And user creates a section "CTA-Section" with "Testing" as description
        And user creates a subsection "CTA-Sub-Section" under "CTA-Section" with "Testing subsection" as description
        
	Scenario: Adding a new CTA button without required fields to check error message
		Given user is in authoring mode
    	And user clicks on edit option of "CTA-Section"
		And user clicks on "edit" icon of "CTA-Section"
		And user clicks on Add New Cta button
		When user clicks on ADD CTA
		Then "Provide a name" should be displayed as "error message"

	Scenario: Adding a new CTA button without entering the button text to check error message
		Given "user" enters "www.google.com" as "cta_link"
		When user clicks on ADD CTA
		Then "Provide a name" should be displayed as "error message"

	Scenario: Adding a new CTA button without entering the link to check error message
		Given "user" enters "Parent-CTA-Button" as "cta_button_text"
		And user enters nothing in "cta_link" field
		When user clicks on ADD CTA
		Then "Provide a url" should be displayed as "error message"

    Scenario: Successfully adding a new CTA button for a section and checking that clicking on the button takes the user to external link
		Given "user" enters "Parent-CTA-Button" as "cta_button_text"
		And "user" enters "www.google.com" as "cta_link"
		When user clicks on ADD CTA
		And user clicks on "save"
		Then CTA Button is added under "CTA-Section"
		And clicking on the "CTA Button" opens the link "www.google.com"

	Scenario:Adding a new CTA form without entering the title of the form to check error message
		Given user is in authoring mode
		And user clicks on edit option of "CTA-Section"
		And user clicks on "edit" icon of "CTA-Section"
		And user clicks on Add New Cta button
		And user selects CTA FORM
		When user clicks on ADD CTA
		Then "Provide a form title" should be displayed as "error message"

	Scenario:Successfully adding a new CTA form
		Given "user" enters "CTA-Form" as "cta_form_title"
		And user enters "Name" as cta_field
		And user enters "Company" as cta_field
		When user clicks on ADD CTA
		And user clicks on "save"
		Then CTA Form is added under "CTA-Section"

	Scenario:Submitting a CTA form without required fields to check error message
		Given user clicks on the CTA form
		When user clicks on submit
		Then "Please fill this field" should be displayed as error

	Scenario:Successfully submitting a CTA form
		Given "user" enters "Preeti Habbu" as "Name"
		And "user" enters "Regalix" as "Company"
		When user clicks on submit
		Then form details like Name "Preeti Habbu" and Company "Regalix" gets updated in the leads page

	Scenario:Adding a new CTA button to child section
		Given user is in authoring mode
		And user selects "CTA-Section"
		And user clicks on edit option of "CTA-Sub-Section"
		And user clicks on "edit" icon of "CTA-Sub-Section"
		And user clicks on Add New Cta button
		And "user" enters "Child-CTA-Button" as "cta_button_text"
		And "user" enters "www.google.com" as "cta_link"
		When user clicks on ADD CTA
		And user clicks on "save"
		Then CTA Button is added under "CTA-Sub-Section"
		And clicking on the "CTA Button" opens the link "www.google.com"

	Scenario:Adding a new CTA form to child section
		Given user is in authoring mode
		And user selects "CTA-Section"
		And "layout" popup box appears
		And user selects "Category" layout
        And user enters "CTA-Second-Sub-Section" as "section-name"
        And user enters "testing cta" as "section-description"
        And user selects "CTA-Form" under CALL-To-ACTION
        When user clicks on "save"
        Then "CTA-Second-Sub-Section" is present as section
        And CTA Form is added under "CTA-Second-Sub-Section"

	Scenario:Successfully submitting a child CTA form
		Given user clicks on the CTA form
		And "user" enters "Keerti Habbu" as "Name"
		And "user" enters "Microsoft" as "Company"
		When user clicks on submit
		Then form details like Name "Keerti Habbu" and Company "Microsoft" gets updated in the leads page
