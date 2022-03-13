@admin
Feature: Sharedemos Selenium Testing of admin page

	Scenario:Tenant creation with empty name field
		Given admin lands in "tenant" creation page
		And "admin" enters "vmw.sharedemos.com:5000" as "domain"
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error" 

	Scenario:Tenant creation with empty domain field
		Given admin lands in "tenant" creation page
		And "admin" enters "Demo" as "name" 
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error" 

	@important
	Scenario:Successful tenant creation
		Given admin lands in "tenant" creation page
		And "admin" enters "Demo" as "name" 
		And "admin" enters "vmw.sharedemos.com:5000" as "domain"
		And admin selects "US/Pacific" as "Timezone"
		And "admin" enters "Testing Footer" as "footer_text"
		When "admin" clicks on submit
		Then "Demo" is added as entry in table

	Scenario:Creating a tenant by choosing invalid file type for logo
		Given admin lands in "tenant" creation page
		And "admin" enters "Demo" as "name" 
		And "admin" enters "vmw.sharedemos.com:5000" as "domain"
		And admin uploads a file for "logo"
		And admin selects "US/Pacific" as "Timezone"
		When "admin" clicks on submit
		Then "Invalid file extension" should be displayed as "error"

	Scenario:Creating a tenant by chosing invalid file type for Favicon
		Given admin lands in "tenant" creation page
		And "admin" enters "Demo" as "name" 
		And "admin" enters "vmw.sharedemos.com:5000" as "domain"
		And admin uploads a file for "favicon"
		And admin selects "US/Pacific" as "Timezone"
		When "admin" clicks on submit
		Then "Invalid file extension" should be displayed as "error"

	Scenario:User creation with empty first_name field
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant" 
		And "admin" enters "aaa@bbb.com" as "email" 
		And "admin" enters "aaa" as "password"
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error" 

	Scenario:User creation with empty email field
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant"
		And "admin" enters "Preeti" as "first_name" 
		And "admin" enters "xyz" as "password"
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error"

	@important
	Scenario:Successful user creation with admin as role
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant"
		And admin selects "admin" as "role"
		And "admin" enters "Preeti" as "first_name"
		And "admin" enters "Habbu" as "last_name"
		And "admin" enters "abc@xyz.com" as "email" 
		And "admin" enters "xyz" as "password"
		When "admin" clicks on submit
		Then "abc@xyz.com" is added as entry in table 

	@login
	Scenario:Successful user creation with author as role
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant"
		And admin selects "author" as "role"
		And "admin" enters "Anita" as "first_name"
		And "admin" enters "abcxyz" as "last_name"
		And "admin" enters "anita@gmail.com" as "email" 
		And "admin" enters "123" as "password"
		When "admin" clicks on submit
		Then "anita@gmail.com" is added as entry in table  

	@login
	@audiences
	Scenario:Successful user creation with analyst as role
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant"
		And admin selects "analyst" as "role"
		And "admin" enters "Jyoti" as "first_name"
		And "admin" enters "Habbu" as "last_name"
		And "admin" enters "jyoti@gmail.com" as "email" 
		And "admin" enters "123" as "password"
		When "admin" clicks on submit
		Then "jyoti@gmail.com" is added as entry in table  

	@audiences
	Scenario:Another Successful user creation with author as role
		Given admin lands in "user" creation page
		And admin selects "Demo" as "tenant"
		And admin selects "author" as "role"
		And "admin" enters "Roopa" as "first_name"
		And "admin" enters "Patil" as "last_name"
		And "admin" enters "roopa@gmail.com" as "email" 
		And "admin" enters "rpatil" as "password"
		When "admin" clicks on submit
		Then "roopa@gmail.com" is added as entry in table  
  
	Scenario:Existing user creation
		Given admin lands in "user" creation page 
		And admin selects "Demo" as "tenant"
		And "admin" enters "Preeti" as "first_name" 
		And "admin" enters "Habbu" as "last_name" 
		And "admin" enters "abc@xyz.com" as "email" 
		And "admin" enters "xyz" as "password"
		When "admin" clicks on submit
		Then error should be displayed

	Scenario:Language creation with empty id field
		Given admin lands in "languages" creation page
		And "admin" enters "English" as "name"
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error"

	Scenario:Language creation with empty name field
		Given admin lands in "languages" creation page
		And "admin" enters "en_US" as "id"
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error"

	@important
	Scenario:Successful language creation
		Given admin lands in "languages" creation page
		And "admin" enters "en_US" as "id"
		And "admin" enters "English" as "name"
		When "admin" clicks on submit
		Then "en_US" is added as entry in table

	Scenario:Language creation with an existing ID
		Given admin lands in "languages" creation page
		And "admin" enters "en_US" as "id"
		And "admin" enters "Hindi" as "name"
		When "admin" clicks on submit
		Then "Already exists." should be displayed as "error"

	Scenario:Creating a Tenant Theme With empty Background color field
		Given admin lands in "tenanttheme" creation page
		And "admin" enters "Blue" as "progress_bar_color" 
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error"

	Scenario:Creating a Tenant Theme With empty progress bar color field
		Given admin lands in "tenanttheme" creation page
		And "admin" enters "Red" as "background_color" 
		When "admin" clicks on submit
		Then "This field is required." should be displayed as "error"

	Scenario:Successful Tenant Theme creation
		Given admin lands in "tenanttheme" creation page
		And "admin" enters "#242424" as "background_color" 
		And "admin" enters "#ffffff" as "progress_bar_color" 
		And "admin" enters "#ffae00" as "title_color"
		And "admin" enters "#ffa600" as "paragraph_color"
		And admin selects "Demo" as "tenant" 
		When "admin" clicks on submit
		Then "#242424" is added as entry in table
		And "#ffffff" is added as entry in table
		And "#ffae00" is added as entry in table
		And "#ffa600" is added as entry in table
