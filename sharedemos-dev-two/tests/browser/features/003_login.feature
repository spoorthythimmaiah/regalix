@login
Feature: Sharedemos Selenium Testing of tenant login page

	Scenario:Login with empty fields
		Given user loads login page of demo tenant
		When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error

	Scenario:Login with empty username field
		Given user loads login page of demo tenant
		And "user" enters "xyz" as "password"
		When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error 

	Scenario:Login with empty password field
		Given user loads login page of demo tenant
		And "user" enters "abc@xyz.com" as "email"
		When "user" clicks on submit
		Then "Please fill out this field" should be dispalyed as validation error

	Scenario:Login with invalid password
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "abc@xyz.com" as "email" 
		And "user" enters "456abc" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then "The email or password you entered is incorrect." should be displayed as "error"

	Scenario:Login with invalid username
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "xxx@yyy.com" as "email" 
		And "user" enters "xyz" as "password"
		And "red" cross mark should appear for email field
		When "user" clicks on submit
		Then "The email or password you entered is incorrect." should be displayed as "error"
		
	Scenario:Successful login
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "abc@xyz.com" as "email" 
		And "user" enters "xyz" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then "admin" is successfully logged in 

	Scenario:Admin successful login and checking that admin is redirected to library page
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "abc@xyz.com" as "email" 
		And "user" enters "xyz" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then "admin" is redirected to Library page
	
	Scenario:Author successful login and checking that author is redirected to library page
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "anita@gmail.com" as "email" 
		And "user" enters "123" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then "author" is redirected to Library page

	Scenario:Analyst successful login and checking that analyst is redirected to reports page
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "jyoti@gmail.com" as "email" 
		And "user" enters "123" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then analyst is redirected to Reports page

	Scenario:Forgot password
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And user clicks on Forgot Password link
		And "user" enters "anita@gmail.com" as "email"
		When user clicks on reset button
		Then an email is sent to "anita@gmail.com"
		And "An email with reset link was sent to your email." message is displayed

	Scenario:Resetting the password by clicking on the reset link sent to user and checking that the user automatically logs in after resetting the password
		Given user clicks on the reset link sent to "anita@gmail.com"
		And user enters "phabbu" in New Password field
		And user enters "phabbu" in Re-Enter New Password field
		When "user" clicks on submit
		Then "author" is successfully logged in 

	Scenario:Rechecking that the user is able to login using the new password
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "anita@gmail.com" as "email" 
		And "user" enters "phabbu" as "password"
		And "green" cross mark should appear for email field
		When "user" clicks on submit
		Then "author" is successfully logged in 

	Scenario:Creating another tenant 
		Given admin lands in "tenant" creation page
		And "admin" enters "SecondTenant" as "name" 
		And "admin" enters "secondtenant.com:5000" as "domain"
		And admin selects "US/Pacific" as "Timezone"
		When "admin" clicks on submit
		Then "SecondTenant" is added as entry in table

	Scenario: Creating another user for SecondTenant
		Given admin lands in "user" creation page
		And admin selects "SecondTenant" as "tenant"
		And admin selects "analyst" as "role"
		And "admin" enters "Saksham" as "first_name"
		And "admin" enters "Habbu" as "last_name"
		And "admin" enters "saksham@gmail.com" as "email" 
		And "admin" enters "123" as "password"
		When "admin" clicks on submit
		Then "saksham@gmail.com" is added as entry in table

	Scenario:User belonging to a different tenant tries to login to another tenant
		Given user loads logout page of demo tenant
		And user loads login page of demo tenant
		And "user" enters "saksham@gmail.com" as "email" 
		And "user" enters "123" as "password"
		And "red" cross mark should appear for email field
		When "user" clicks on submit
		Then "The email or password you entered is incorrect." should be displayed as "error"
