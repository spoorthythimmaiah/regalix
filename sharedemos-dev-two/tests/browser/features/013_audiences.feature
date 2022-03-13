@audiences
Feature: Selenium testing of Audiences feature

    Scenario:User with author role have access to audiences page
    	Given "author" user successfully logs in with "roopa@gmail.com" as email and "rpatil" as password
   		Then "Audiences" is displayed in the navigation bar
    	And "author" user have access to audiences page

    Scenario:User with analyst role dont have access to audiences page
    	Given "analyst" user successfully logs in with "jyoti@gmail.com" as email and "123" as password
    	Then "Audiences" is not displayed in the navigation bar
    	And user cannot load "/dashboard/audiences/" page

    Scenario:User with admin role have access to audiences page
  		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
    	Then "Audiences" is displayed in the navigation bar
    	And "admin" user have access to audiences page

	Scenario:Creating new section, subsection, playlist and demo
        Given user creates a section "Audience-Section" with "Testing" as description
        And user creates a subsection "Audience-Sub-Section" under "Audience-Section" with "Testing subsection" as description
        And user creates a playlist "Audience-Playlist" under "Audience-Sub-Section" with "Playlist to test audiences" as description
        And user creates a demo "Audience-Demo-Section" under "Audience-Playlist"

	Scenario:Uploading an image in slide
		Given user selects "Audience-Demo-Section" demo
		And user clicks on plus button to create a new slide
		And user selects "add_image" icon
		When user uploads an image "flowers.jpg"
		Then image is uploaded in slide "1" of "edit" mode
 
	Scenario:Publishing the demo
	    Given user publishes the demo
	    Then "Audience-Demo-Section" demo is present in live mode

    Scenario:Successfully adding a new company
    	Given admin user is in audiences page
    	And a popup box to add new company appears
	 	And "user" enters "Regalix" as "company_name" 
	 	And "user" enters "www.regalix.com" as "company_website_url" 
    	When "user" clicks on submit
		Then a new company with url "www.regalix.com" is added

    Scenario:Adding a new company with empty fields
    	Given a popup box to add new company appears
    	When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error

	 Scenario:Adding a new company with empty company name field
	 	Given "user" enters "www.regalix.com" as "company_website_url" 
    	When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error

	Scenario:Adding a new company with empty company website field
	 	Given "user" enters "Regalix" as "company_name" 
	 	And user enters nothing in company website
    	When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error

	Scenario:Successfully adding another new company
		Given "user" enters "Google" as "company_name" 
		And "user" enters "www.google.com" as "company_website_url"
		When "user" clicks on submit
		Then a new company with url "www.google.com" is added

	Scenario:Checking that the share button is disabled when there are no users added to the company
		Given there are no users in the company with url "www.regalix.com"
		Then share button for the company with url "www.regalix.com" is disabled

	Scenario:Adding user with empty first name field
		Given admin user clicks on "add-user" button of company with the url "www.regalix.com"
		And admin user enters "Habbu" as user lastname
		When admin user clicks on submit
		Then "Provide first name" should be displayed as "error message"

	Scenario:Adding user with empty last name field
		Given admin user enters "Preeti" as user firstname
		And admin user enters nothing in user lastname
		When admin user clicks on submit
		Then "Provide last name" should be displayed as "error message"

	Scenario:Adding user with empty email field
		Given admin user enters "Preeti" as user firstname
		And admin user enters "Habbu" as user lastname
		When admin user clicks on submit
		Then "Provide email" should be displayed as "error message"

	Scenario:Successfully adding user to the company Regalix when there is no category/resource in the PRIVATE mode. 
		Given admin user enters "Preeti" as user firstname
		And admin user enters "Habbu" as user lastname
		And admin user enters "phabbu@regalix-inc.com" as user email
		When admin user clicks on submit
		Then user with email "phabbu@regalix-inc.com" is added to the company with url "www.regalix.com"
		And a sign in link is sent to the mail "phabbu@regalix-inc.com"

	Scenario:Successfully adding user to the company Google when there is no category/resource in the PRIVATE mode. 
		Given admin user clicks on "add-user" button of company with the url "www.google.com"
		And admin user enters "Rashmi" as user firstname
		And admin user enters "Sajjan" as user lastname
		And admin user enters "rsajjan@google.com" as user email
		When admin user clicks on submit
		Then user with email "rsajjan@google.com" is added to the company with url "www.google.com"
		And a sign in link is sent to the mail "rsajjan@google.com"

	Scenario:User details in audiences gets updated according to the details entered in the sign in page when the email id entered in the sign in page is same as in the audiences page
		Given audience user clicks on the sign in link sent to "phabbu@regalix-inc.com"
		And "user" enters "Swati" as "first_name"
		And "user" enters "Habbu" as "last_name"
		And "user" enters "phabbu@regalix-inc.com" as "email"
		And "user" enters "Developer" as "designation"
		When "user" clicks on submit
		Then user is redirected to "PRODUCT WALKTHROUGHS" page
		And user details for user with email "phabbu@regalix-inc.com" gets updated to "Swati Habbu"

	@sign_in
	Scenario:A new user is created in audiences when the email id entered in the sign in page is different than that in the audiences page
		Given audience user clicks on the sign in link sent to "phabbu@regalix-inc.com"
		And "user" enters "Preeti" as "first_name"
		And "user" enters "Habbu" as "last_name"
		And "user" enters "habbu.preeti@gmail.com" as "email"
		And "user" enters "Developer" as "designation"
		When "user" clicks on submit
		Then user is redirected to "PRODUCT WALKTHROUGHS" page
		And a new user with email "habbu.preeti@gmail.com" is added to the company with url "www.regalix.com"

	Scenario:Trying to share a content with the newly created user when there is no private content in the edit site.
		Given admin user clicks on "share" button of company with the url "www.regalix.com"
		Then "No private content found in site!!" should be displayed as popup error

	Scenario:Changing the privacy of a category from public to private
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And main category "Audience-Section" is marked as "private"
		And child category "Audience-Sub-Section" is marked as private

	Scenario:Private contents are not visible to audience users before sharing the contents with them
		Given audience user clicks on the sign in link sent to "phabbu@regalix-inc.com"
		And "user" enters "Swati" as "first_name"
		And "user" enters "Habbu" as "last_name"
		And "user" enters "phabbu@regalix-inc.com" as "email"
		And "user" enters "Developer" as "designation"
		When "user" clicks on submit
		Then user is redirected to "PRODUCT WALKTHROUGHS" page
		And public category "File-Section" is visible to the "audience" user
		And private category "Audience-Section" is not visible to the "audience" user

	Scenario:Trying to share private contents with audience users without selecting any contents to check error message
    	Given admin user is in audiences page
    	And admin user clicks on "share" button of company with the url "www.regalix.com"
		When admin user clicks on save
		Then "Please select data to share" should be displayed as "error message"

	Scenario:Trying to share private contents with audience users without selecting the expiry date to check error message
		Given user selects a category "Audience-Section"
		When admin user clicks on save
		Then "Please select date of expiry" should be displayed as "error message"
		
	Scenario:Successfully sharing the private contents with the audience users and checking that both private and public contents are visible to the user
		Given user clicks on cancel button
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		And user selects a category "Audience-Section"
		And user selects current date as the date of expiry
		When admin user clicks on save
		And audience user of Regalix signs in
		Then public category "File-Section" is visible to the "audience" user
		And private category "Audience-Section" is visible to the "audience" user
		And private child category "Audience-Sub-Section" is visible to the "audience" user
		
	@sign_in
	Scenario:Private contents are not visible to public users
		Given public user loads the tenant
		Then private category "Audience-Section" is not visible to the "public" user
		And public category "File-Section" is visible to the "public" user

	Scenario:Editing the already created company profile
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin user is in audiences page
		And admin user clicks on "edit" button of company with the url "www.regalix.com"
		And "user" enters "Regalix India Pvt Ltd" as "company_name" 
		When "user" clicks on submit
		Then company name of the company with url "www.regalix.com" gets updated to "Regalix India Pvt Ltd"

	Scenario:Adding an existing company
		Given a popup box to add new company appears
		And "user" enters "Google" as "company_name" 
		And "user" enters "www.google.com" as "company_website_url"
		When "user" clicks on submit
		Then unsuccessfull message is displayed

	Scenario:Adding an existing user
		Given user clicks on cancel 
    	And admin user clicks on "add-user" button of company with the url "www.google.com"
		And admin user enters "Preeti" as user firstname
		And admin user enters "Habbu" as user lastname
		And admin user enters "rsajjan@google.com" as user email
		When admin user clicks on submit
		Then unsuccessfull message is displayed

	Scenario:Sharing the content with the newly created user when only a child of a main category is marked as Private and not the parent, and checking that audience user can access the child under the parent as well as all the content under the child
		Given user is in authoring mode
		And main category "Audience-Section" is marked as "public"
		And admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		And user selects a child category "Audience-Sub-Section"
		And user selects current date as the date of expiry
		When admin user clicks on save
		And audience user of Regalix company signs in
		Then public category "File-Section" is visible to the "audience" user
		And public parent "Audience-Section" is visible to "audience" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is visible to the "audience" user
		And child content "Audience-Demo-Section" of private child "Audience-Sub-Section" is visible to the "audience" user

	@sign_in
	Scenario:Checking that public parent is visible and,  private child and its contents are not visible to the public user when only a child of a main category is marked as private and not parent 
		Given public user loads the tenant
		Then public category "File-Section" is visible to the "public" user
		And public parent "Audience-Section" is visible to "public" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is not visible to the "public" user

	Scenario:Deleting the user and checking whether the user still can access the content using the url.
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin user is in audiences page
		And admin user deletes the audience user with email "phabbu@regalix-inc.com" under company with url "www.regalix.com"
		When audience user of Regalix company signs in
		Then public category "File-Section" is visible to the "audience" user
		And public parent "Audience-Section" is visible to "audience" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is visible to the "audience" user
		And child content "Audience-Demo-Section" of private child "Audience-Sub-Section" is visible to the "audience" user

	Scenario:Re-adding the deleted user and checking whether the user still can access the content using the url.
		Given admin user is in audiences page
		And admin user re-adds the audience user with email "phabbu@regalix-inc.com" under company with url "www.regalix.com"
		When audience user of Regalix signs in
		Then public category "File-Section" is visible to the "audience" user
		And public parent "Audience-Section" is visible to "audience" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is visible to the "audience" user
		And child content "Audience-Demo-Section" of private child "Audience-Sub-Section" is visible to the "audience" user

	Scenario:Trying to share content with the newly created user when only a child of a main category is marked as private and not the parent, and selecting the previous day date as the expiry date.
		Given admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.google.com"
		And user selects a child category "Audience-Sub-Section"
		And user selects previous day date as the date of expiry
		When admin user clicks on save
		And audience user of Google tries to sign in using the link sent
		Then 404 error page is displayed

	@sign_in
	Scenario:Checking that the public parent is visible and private child and its contents are not visible to the public user  when only a child of a main category is marked as private and not the parent, and previous day date is selected as expiry date
		Given public user loads the tenant
		Then public parent "Audience-Section" is visible to "public" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is not visible to the "public" user

	Scenario:Checking that the public categories are not visible in the 'Select Categories' popup in the Audience page.
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		Then public categories "File-Section" and "Video-Section" are not present in the select categories popup

	Scenario:Changing the privacy to "Private" in settings page 
		Given user is in settings page 
		And user toggles the privacy button to "private"
		And user clicks on the save button in settings page
		
	@sign_in
	Scenario:Checking that the categories are not visible in the public page after privacy button is made "Private" in settings page
		Given public user loads the tenant
		Then categories are not visible to the public user

	Scenario:Checking that all the categories are visible in the 'Select categories' popup in audience page when the privacy is changed to 'Private' in settings page
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		Then categories "File-Section" and "Video-Section" are present in the select categories popup

	Scenario:Again changing the privacy to "Public" in settings page and checking that categories are present in the public page
		Given user is in settings page 
		And user toggles the privacy button to "public"
		And user clicks on the save button in settings page
		And public user loads the tenant
		Then public category "File-Section" is visible to the "public" user
		And public category "Video-Section" is visible to the "public" user

	Scenario:Checking that the public categories are not visible in the 'Select Categories' popup in the Audience page when the privacy is changed back to 'Public' in settings page
		Given admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		Then public categories "File-Section" and "Video-Section" are not present in the select categories popup

	Scenario:Deleting the sub-category and checking that the deleted sub-category is not visible to the shared audience user
		Given user is in authoring mode
		And user selects "Audience-Section"
		And user clicks on edit option of "Audience-Sub-Section"
		And user clicks on "delete" icon of "Audience-Sub-Section"
		When user "delete"s the "section"
		And audience user of Regalix company signs in
		Then public parent "Audience-Section" is visible to "audience" user
		And private child "Audience-Sub-Section" of public parent "Audience-Section" is not visible to the "audience" user

	Scenario:Checking that the deleted sub-catogary is not visible under the sharable content in audiences page
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin user is in audiences page
		And admin user clicks on "share" button of company with the url "www.regalix.com"
		Then "No private content found in site!!" should be displayed as popup error
		