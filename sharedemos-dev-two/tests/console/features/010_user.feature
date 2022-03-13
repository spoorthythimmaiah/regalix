@login_required
@users
Feature: As a Tester I want to See 
		 Admin actions like 
		 Creating a User and giving Authorization
		 Editing a user and and his Details

	Scenario: Verifying the Admin User Permissions Page
		Given Admin lands in "testing.sharedemos.com:5000" user permissions page
		Then "User Permissions" should be displayed 

	Scenario: Adding a User with Empty First name
		Given Admin posts data as "re_add as None and last_name as Varma and email as nagarjun.nas@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "First Name required" should be displayed

	Scenario: Adding a User with Empty Email ID
		Given Admin posts data as "re_add as None and first_name as Arjun and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Email required" should be displayed

	Scenario: Adding user with required fields and as Admin
		Given Admin posts data as "first_name as Arjun and last_name as Varma and email as nagarjun.nas@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Arjun for first_name and Varma for last_name and nagarjun.nas@gmail.com for email" should be in the response 
		Given added user is verfied from the Mail 
		Then "Congratulations on joining ShareDemos." should be displayed
		Given User sets password as "password as 123456"
		Then "library" should be displayed

	Scenario: Adding user with required fields and as Admin
		Given Admin posts data as "first_name as Arun and last_name as Kumar and email as arunkumar@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response
		Given added user is verfied from the Mail 
		Then "Congratulations on joining ShareDemos." should be displayed
		Given User sets password as "password as 123456"
		Then "library" should be displayed

	Scenario: Altering users First Name
		Given Admin renames the user as "first_name as Nagarjun and last_name as Varma and email as nagarjun.nas@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Nagarjun for first_name and Varma for last_name and nagarjun.nas@gmail.com for email" should be in the response 

	Scenario: Altering users Last Name
		Given Admin renames the user as "first_name as Nagarjun and last_name as Satish and email as nagarjun.nas@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Nagarjun for first_name and Satish for last_name and nagarjun.nas@gmail.com for email" should be in the response 

	Scenario: Altering users Role as Author
		Given Admin alters the role of the user as "first_name as Arun and last_name as Kumar and email as arunkumar@gmail.com and role_id as 2 and sections as [] and remove_restrictions as 'false'" to "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response 

	Scenario: Verifying the Author User Login with all required fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as arunkumar@gmail.com and password as 123456"
		Then "library" should be displayed
		And "Permissions" should not be displayed

	Scenario: Getting the Author Users
		Given Admin wants to get author users of "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response
		And "Nagarjun for first_name and Satish for last_name and nagarjun.nas@gmail.com for email" should not be in the response

	Scenario: Altering users Role as Analyst
		Given Admin logins to the domain
		Given Admin alters the role of the user as "first_name as Arun and last_name as Kumar and email as arunkumar@gmail.com and role_id as 3" to "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response

	Scenario: Verifying the Analyst User Login with all required fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as arunkumar@gmail.com and password as 123456"
		Then "Metrics" should be displayed
		And "Library" should not be displayed
		And "Permissions" should not be displayed
 	
 	Scenario: Getting the Analyst Users
		Given Admin wants to get analyst users of "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response
		And "Nagarjun for first_name and Satish for last_name and nagarjun.nas@gmail.com for email" should not be in the response
	
	Scenario: Getting the Admin Users
		Given Admin wants to get admin users of "testing.sharedemos.com:5000" user permissions page
		Then "Nagarjun for first_name and Satish for last_name and nagarjun.nas@gmail.com for email" should be in the response
		And "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should not be in the response

	Scenario: Deleting a User
		Given Admin deletes a user with "first_name as Arun and last_name as Kumar and email as arunkumar@gmail.com and role_id as 3" of "testing.sharedemos.com:5000" user permissions page
		Then "DELETED for status" should be in the response

	Scenario: Re-Adding deleted user 
		Given Admin re-adds user with data as "re_add as True and first_name as Arun and last_name as Kumar and email as arunkumar@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Arun for first_name and Kumar for last_name and arunkumar@gmail.com for email" should be in the response
		
	Scenario: Verifying the Re-added User Login with all required fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as arunkumar@gmail.com and password as 123456"
		Then "Library" should be displayed
		And "Permissions" should be displayed
	
	Scenario: Adding a new user to test case insensitive email
		Given Admin posts data as "first_name as Preeti and last_name as Habbu and email as habbu.preeti@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Preeti for first_name and Habbu for last_name and habbu.preeti@gmail.com for email" should be in the response

	Scenario:Trying to add a new user with same email id but in mix cases to check error message 
		Given Admin posts data as "first_name as Swati and last_name as Habbu and email as Habbu.Preeti@gmail.com and role_id as 1" to "testing.sharedemos.com:5000" user permissions page
		Then "Forbidden for message" should be in the response
