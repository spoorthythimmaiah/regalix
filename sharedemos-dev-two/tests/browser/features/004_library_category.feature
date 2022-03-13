@library_category
Feature: Selenium testing of library page
	
	@playlist
	@demo
	@slides
	@audiences
	Scenario: Tenant edit
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		When user clicks on edit button
		Then user is in authoring mode

	Scenario: Create category with empty fields
		Given "section" popup box appears
		When user clicks on "save"
		Then "Provide a name for category" should be displayed as error message
		And "Briefly describe your category" should be displayed as "error message"

	Scenario: Create category with empty name field
		Given user is in authoring mode
		And "section" popup box appears
		And user enters nothing in "section-name"
		And user enters "Testing" as "section-description"
		When user clicks on "save"
		Then "Provide a name for category" should be displayed as "error message"

	Scenario: Create category with empty description field
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "First-Section" as "section-name"
		And user enters nothing in "section-description"
		When user clicks on "save" 
		Then "Briefly describe your category" should be displayed as "error message"

	Scenario: Successful category creation
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "First-Section" as "section-name"
		And user enters "Testing" as "section-description"
		When user clicks on "save"
		Then "First-Section" is present as section

	Scenario: Create a category by entering maximum characters in category name
		Given "section" popup box appears
		And user enters "1maximumcharacters2maximumcharacters3maximumcharacters" as "section-name"
		And user enters "Testing maximum characters for category name" as "section-description"
		When user clicks on "save"
		Then only first 50 characters "1maximumcharacters2maximumcharacters3maximumcharac" are added as category name

	Scenario: Create a category by entering maximum characters in category description
		Given "section" popup box appears
		And user enters "Test-Description" as "section-name"
		And user enters "TestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacterTestmaximumcharacter_andmore" as "section-description"
		When user clicks on "save"
		Then "Test-Description" is present as section
		And only first 200 characters are added as category description for "Test-Description" category

	@playlist
	@demo
	@slides
	@audiences
	Scenario: Category creation by uploading an image file
		Given "section" popup box appears
		And user enters "File-Section" as "section-name"
		And user enters "Testing" as "section-description"
		And user uploads a "profile.png" icon in section creation
		When user clicks on "save"
		Then "File-Section" is present as section
		And image is uploaded in section

	Scenario:Repositioning a category
		Given user is in live mode
		And user is in authoring mode
		And user changes the "First-Section" position to "File-Section"
		Then "First-Section" section position is changed
		And user switches to live mode from "edit" mode
		Then "First-Section" section position is changed

	Scenario: Category creation by uploading invalid video URL
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "Invalid-Section" as "section-name"
		And user enters "Testing" as "section-description"
		And user uploads a "http://www.google.com" video in section creation
		Then "Enter valid URL" error should be displayed

	@audiences
	Scenario: Category creation by uploading a valid video URL
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "Video-Section" as "section-name"
		And user enters "Testing" as "section-description"
		And user uploads a "https://www.youtube.com/watch?v=7M-jsjLB20Y" video in section creation
		When user clicks on "save"
		Then "Video-Section" is present as section
		And video is uploaded in section

	Scenario: Category creation with hidden visibility
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "Toggle-Section" as "section-name"
		And user enters "Testing" as "section-description"
		And user toggles visibility to "hide"
		When user clicks on "save"
		Then "Toggle-Section" is present as section
		And "Toggle-Section" is not present as section in live mode

	Scenario:Disable First-Section
		Given user is in authoring mode
		And user clicks on edit option of "First-Section"
		And user clicks on "enable" icon of "First-Section"
		When user "disable"s the "section"
		Then "First-Section" is disabled
		And "First-Section" is not present as section in live mode 
		
	Scenario:Enable First-Section
		Given user is in authoring mode
		And user clicks on edit option of "First-Section"
		And user clicks on "enable" icon of "First-Section"
		When user "enable"s the "section"
		Then "First-Section" is enabled
	
	Scenario: Update image
		Given user clicks on edit option of "File-Section"
		And user clicks on "edit" icon of "File-Section"
		And user uploads a "avatar.jpg" icon in section creation
		When user clicks on "save"
		Then "File-Section" is present as section

	Scenario:Hiding a section
		Given user is in authoring mode
		And user clicks on edit option of "First-Section"
		And user clicks on "edit" icon of "First-Section"
		And user toggles visibility to "hide"
		When user clicks on "save"
		Then "First-Section" is present as section
		And "First-Section" is not present as section in live mode

	Scenario:unhiding a section
		Given user is in authoring mode
		And user clicks on edit option of "First-Section"
		And user clicks on "edit" icon of "First-Section"
		And user toggles visibility to "show"
		When user clicks on "save"
		Then "First-Section" is present as section
		And "First-Section" is present as section in live mode

	Scenario:Updating a section name and description
		Given user is in authoring mode
		And user clicks on edit option of "First-Section"
		And user clicks on "edit" icon of "First-Section"
		And user enters "Demo-Section" as "section-name"
		And user enters "Testing Demo section" as "section-description"
		When user clicks on "save"
		Then "Demo-Section" is present as section
		And "Demo-Section" is present as section in live mode

	Scenario:Deleting a Section
		Given user clicks on edit option of "Demo-Section"
		And user clicks on "delete" icon of "Demo-Section"
		When user "delete"s the "section"
		Then "Demo-Section" is deleted

	Scenario:Update video upload
		Given user clicks on edit option of "Video-Section"
		And user clicks on "edit" icon of "Video-Section"
		And user uploads a "https://www.youtube.com/watch?v=N3i32rhrX-s" video in section creation
		And user deletes "The Cutest Crying Baby in the World" video
		When "The Cutest Crying Baby in the World" video is deleted
		And user clicks on "save"
		Then "Video-Section" is present as section
		
	@playlist
	@demo
	@slides
	Scenario:Sub section creation
		Given user is in authoring mode
		And user selects "File-Section"
		And "layout" popup box appears
		And user selects "Category" layout
		And user enters "Sub-Section" as "section-name"
		And user enters "Testing subsection" as "section-description"
		When user clicks on "save"
		Then "Sub-Section" is present as section

	Scenario:Second Sub section creation
		Given user is in authoring mode
		And user selects "File-Section"
		And "layout" popup box appears
		And user selects "Category" layout
		And user enters "Second-Sub-Section" as "section-name"
		And user enters "Testing subsection" as "section-description"
		When user clicks on "save"
		Then "Second-Sub-Section" is present as section
		And user switches to live mode from "edit" mode
		And "Second-Sub-Section" is present as section

	Scenario:Disable Sub-Section
		Given user is in authoring mode
		And user selects "File-Section"
		And user clicks on edit option of "Sub-Section"
		And user clicks on "enable" icon of "Sub-Section"
		When user "disable"s the "section"
		Then "Sub-Section" is disabled
		And "Sub-Section" is present as section
		
	Scenario:Enable Sub-Section
		Given user is in authoring mode
		And user selects "File-Section"
		And user clicks on edit option of "Sub-Section"
		And user clicks on "enable" icon of "Sub-Section"
		When user "enable"s the "section"
		Then "Sub-Section" is enabled
		And user switches to live mode from "edit" mode
		And "Sub-Section" is present as section
	
	Scenario:Hiding Sub-section
		Given user is in authoring mode
		And user selects "File-Section"
		And user clicks on edit option of "Sub-Section"
		And user clicks on "edit" icon of "Sub-Section"
		And user toggles visibility to "hide"
		When user clicks on "save"
		Then "Sub-Section" is present as section
		And user switches to live mode from "edit" mode
		And "Sub-Section" is not present as section

	Scenario:Unhiding Sub-section
		Given user is in authoring mode
		And user selects "File-Section"
		And user clicks on edit option of "Sub-Section"
		And user clicks on "edit" icon of "Sub-Section"
		And user toggles visibility to "show"
		When user clicks on "save"
		Then "Sub-Section" is present as section
		And user switches to live mode from "edit" mode
		And "Sub-Section" is present as section

	Scenario:Updating a Sub-Section name and description
		Given user is in authoring mode
		And user selects "File-Section"
		And user clicks on edit option of "Sub-Section"
		And user clicks on "edit" icon of "Sub-Section"
		And user enters "Sub-One-Section" as "section-name"
		And user enters "Testing Sub section" as "section-description"
		When user clicks on "save"
		Then "Sub-One-Section" is present as section
		And user switches to live mode from "edit" mode
		And "Sub-One-Section" is present as section

	Scenario:Deleting a Sub Section
		Given user is in authoring mode
		And user selects "File-Section"
		Given user clicks on edit option of "Second-Sub-Section"
		And user clicks on "delete" icon of "Second-Sub-Section"
		When user "delete"s the "section"
		Then "Second-Sub-Section" is deleted

	Scenario:Creating a Private section
		Given user is in authoring mode
		And "section" popup box appears
		And user enters "Private-Section" as "section-name"
		And user enters "Testing Private" as "section-description"
		And user toggles private button to "private"
		When user clicks on "save"
		Then "Private-Section" is present as section
		And "Private-Section" is not present as section in live mode

	Scenario:Changing the privacy to Private in settings page
		Given user is in settings page 
		And clicks on "advanced" link
		And user toggles the privacy button to "private"
		And user presses save button in advanced settings page
		Given user loads logout page of demo tenant
		And user loads tenant home page
        Then "Sign in to vmw.sharedemos.com:5000" should be displayed as heading of login page

	Scenario: Editing privacy of a Section
		Given user loads tenant home page
		And "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
        When user clicks on edit button
		Then user is in authoring mode
		Given user clicks on edit option of "Private-Section"
		And user clicks on "edit" icon of "Private-Section"
		Then private toggle button should not be present

	Scenario:Changing the privacy to Public in settings page
		Given user is in settings page 
		And clicks on "advanced" link
		And user toggles the privacy button to "private"
		And user presses save button in advanced settings page
		Given user loads logout page of demo tenant
		And user loads tenant home page
        Then "PRODUCT WALKTHROUGHS" should be displayed as heading 

    Scenario:Editing privacy of a Section
    	Then "Private-Section" is not present as section in live mode
    	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
        When user clicks on edit button
		Then user is in authoring mode
		Given user clicks on edit option of "Private-Section"
		And user clicks on "edit" icon of "Private-Section"
		And user toggles private button to "public"
		When user clicks on "save"
		Then "Private-Section" is present as section
		And "Private-Section" is not present as section in live mode