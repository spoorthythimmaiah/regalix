@user_roles
Feature: Selenium testing of users with different roles

Scenario:Creating user with empty fields
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on create new user button
	When admin clicks on save button
	Then "fields cannot be empty" should be displayed as error under "name" field

Scenario:Creating user with empty first name field
	Given admin enters "Habbu" as user lastname
	And admin enters "testing@gmail.com" as user email
	When admin clicks on save button
	Then "fields cannot be empty" should be displayed as error under "name" field

Scenario:Creating user with empty last name field
	Given admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "tester" as user firstname
	And admin enters "testing@gmail.com" as user email
	When admin clicks on save button
	Then "fields cannot be empty" should be displayed as error under "name" field

Scenario:Creating user with empty email field
	Given admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "tester" as user firstname
	And admin enters "Habbu" as user lastname
	When admin clicks on save button
	Then "fields cannot be empty" should be displayed as error under "email" field

Scenario:Creating new user with author permission
	Given admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "Rashmi" as user firstname
	And admin enters "Sajjan" as user lastname
	And admin enters "xxx@gmail.com" as user email
	And admin gives "Authors" permission to user
	When admin clicks on save button
	Then user with email "xxx@gmail.com" is created

Scenario:Activating the newly created user and checking that the user have author permission
	Given user opens the mail "xxx@gmail.com" and sets the password as "abc123" by activating the link
	Then "Edit" button is displayed
	And "Preview" button is displayed
	And settings button is not displayed
	And permissions button is not displayed
	And user cannot load "/dashboard/users/" page

Scenario:Creating new user with analyst permission
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "Nagashree" as user firstname
	And admin enters "Athreya" as user lastname
	And admin enters "aaa@gmail.com" as user email
	And admin gives "Analysts" permission to user
	When admin clicks on save button
	Then user with email "aaa@gmail.com" is created

Scenario:Activating the newly created user and checking that the user have analyst permission
	Given user opens the mail "aaa@gmail.com" and sets the password as "xyz123" by activating the link
	Then "Edit" button is not displayed
	And "Preview" button is not displayed
	And settings button is not displayed
	And permissions button is not displayed
	And user cannot load "/edit/" page
	And user cannot load "/preview/" page
	And user cannot load "/dashboard/users/" page

Scenario:Creating new user with admin permission
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "Keerti" as user firstname
	And admin enters "Habbu" as user lastname
	And admin enters "dummymail@gmail.com" as user email
	And admin gives "Admins" permission to user
	When admin clicks on save button
	Then user with email "dummymail@gmail.com" is created

Scenario:Activating the newly created user and checking that the user have admin permission
	Given user opens the mail "dummymail@gmail.com" and sets the password as "something" by activating the link
	Then "Edit" button is displayed
	And "Preview" button is displayed
	And settings button is displayed
	And "Permissions" button is displayed

Scenario:Changing author permissions to analyst and rechecking
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on edit option of user "Rashmi Sajjan" with email "xxx@gmail.com"
	And admin gives "Analysts" permission to user
	When admin clicks on save
	Given user loads logout page of demo tenant
	When "analyst" user successfully logs in with "xxx@gmail.com" as email and "abc123" as password
	Then user permissions are changed from author to analyst

Scenario:Changing Analyst permissions to Admin and rechecking
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on edit option of user "Nagashree Athreya" with email "aaa@gmail.com"
	And admin gives "Admins" permission to user
	When admin clicks on save
	Given user loads logout page of demo tenant
	When "admin" user successfully logs in with "aaa@gmail.com" as email and "xyz123" as password
	Then user permissions are changed from analyst to admin

Scenario:Changing admin permissions to author and rechecking
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on edit option of user "Keerti Habbu" with email "dummymail@gmail.com"
	And admin gives "Authors" permission to user
	When admin clicks on save
	Given user loads logout page of demo tenant
	When "author" user successfully logs in with "dummymail@gmail.com" as email and "something" as password
	Then user permissions are changed from admin to author

Scenario:Removing user
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	When admin removes user "Rashmi Sajjan" with email "xxx@gmail.com"
	Then "Rashmi Sajjan" with email "xxx@gmail.com" has been removed
	And user with email "xxx@gmail.com" and password "abc123" cannot login

Scenario: Readding removed user
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "Jyoti" as user firstname
	And admin enters "Habbu" as user lastname
	And admin enters "xxx@gmail.com" as user email
	When admin clicks on save button
	Then user with email "xxx@gmail.com" is created

Scenario: Adding existing user
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	And admin clicks on create new user button
	And admin enters "Swati" as user firstname
	And admin enters "Habbu" as user lastname
	And admin enters "dummymail@gmail.com" as user email
	When admin clicks on save button
	Then "User with this Email exists !" should be displayed as error under "email" field

Scenario: Adding existing user with Mixed Cases
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And admin is in user Permissions page
	Given admin clicks on create new user button
	And admin enters "Keerti" as user firstname
	And admin enters "Habbu" as user lastname
	And admin enters "DummyMail@gmail.com" as user email
	When admin clicks on save button
	Then "User with this Email exists !" should be displayed as error under "email" field