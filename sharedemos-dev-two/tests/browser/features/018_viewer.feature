@viewer
Feature: Selenium testing of Viewer Feature
	
	Scenario: Verifying No Viewer Option in Users Page
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin is in user Permissions page
		And admin clicks on create new user button
		Then "Viewer" option in permission list "should not be" displayed

	Scenario:Load Tenant Home page
        Given user loads tenant home page
        Then "PRODUCT WALKTHROUGHS" should be displayed as heading 

	Scenario:Changing the privacy to Private in settings page
		Given user is in settings page 
		And clicks on "advanced" link
		And user toggles the privacy button to "private"
		And user presses save button in advanced settings page

	Scenario: Adding User with Viewer Permission
		Given admin is in user Permissions page
		And admin clicks on create new user button
		Then "Viewer" option in permission list "should be" displayed
		Given user loads logout page of demo tenant
		Then "Sign in to vmw.sharedemos.com:5000" should be displayed as heading of login page

	Scenario:Load Tenant Home page
        Given user loads tenant home page
        Then "Sign in to vmw.sharedemos.com:5000" should be displayed as heading of login page

    Scenario:Creating new user with Viewer permission
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And admin is in user Permissions page
		And admin clicks on create new user button
		And admin enters "Arun" as user firstname
		And admin enters "Kumar" as user lastname
		And admin enters "arunkumar@gmail.com" as user email
		And admin gives "Viewers" permission to user
		When admin clicks on save button
		Then user with email "arunkumar@gmail.com" is created

	Scenario:Activating the newly created user and checking that the user have author permission
		Given user opens the mail "arunkumar@gmail.com" and sets the password as "123456" by activating the link
		Then "PRODUCT WALKTHROUGHS" should be displayed as heading 

	Scenario:Load Tenant Home page
		Given user loads logout page of demo tenant
		And user loads tenant home page
        Then "Sign in to vmw.sharedemos.com:5000" should be displayed as heading of login page
        Given "user" enters "arunkumar@gmail.com" as "email" 
		And "user" enters "123456" as "password"
		When "user" clicks on submit
		Then "PRODUCT WALKTHROUGHS" should be displayed as heading
	
	Scenario:Changing the privacy to Public in settings page
		Given user loads logout page of demo tenant 
		And "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		And user is in settings page 
		And clicks on "advanced" link
		And user toggles the privacy button to "private"
		And user presses save button in advanced settings page

	Scenario:Load Tenant Home page
        Given user loads tenant home page
        Then "PRODUCT WALKTHROUGHS" should be displayed as heading