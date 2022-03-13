Feature: As a Tester I want to See 
		 Admin actions like 
		 Creating Tenant with all Possibilities 
		 Creating a User relevant to the Tenant

	Scenario: Creating a Tenant with empty domain
		Given Admin creates tenant with "name as testing"
		Then "This field is required." should be displayed for "domain"

	Scenario: Creating a Tenant with empty username
		Given Admin creates tenant with "domain as testing.sharedemos.com:5000"
		Then "This field is required." should be displayed for "name"

	@important
	Scenario: Creating a Tenant for Normal Purpose 
		Given Admin creates tenant with "name as testing and domain as testing.sharedemos.com:5000 and timezone as US/Pacific and crm_settings as {}"
		Then "With selected" should be displayed

	Scenario: Creating a Tenant Theme with Empty Background Color
		Given Admin creates theme for a tenant "tenant as testing and progress_bar_color as #000000 and title_color as #1874CD and paragraph_color as #B0171F" 
		Then "This field is required." should be displayed for "background_color"

	Scenario: Creating a Tenant Theme with Empty Progress Bar Color
		Given Admin creates theme for a tenant "tenant as testing and background_color as #01ACD4 and title_color as #1874CD and paragraph_color as #B0171F" 
		Then "This field is required." should be displayed for "progress_bar_color"

	Scenario: Creating a Tenant Theme with Empty Title Color
		Given Admin creates theme for a tenant "tenant as testing and background_color as #01ACD4 and progress_bar_color as #000000 and paragraph_color as #B0171F" 
		Then "This field is required." should be displayed for "title_color"

	Scenario: Creating a Tenant Theme with Empty Paragraph Color
		Given Admin creates theme for a tenant "tenant as testing and background_color as #01ACD4 and progress_bar_color as #000000 and title_color as #1874CD" 
		Then "This field is required." should be displayed for "paragraph_color"

	Scenario: Creating a Tenant Theme with Empty Tenant
		Given Admin creates theme for a tenant "background_color as #01ACD4 and progress_bar_color as #000000 and title_color as #1874CD and paragraph_color as #B0171F" 
		Then "Not a valid choice" should be displayed

	@important
	Scenario: Creating a Tenant Theme with all required fields
		Given Admin creates theme for a tenant "tenant as testing and background_color as #01ACD4 and progress_bar_color as #000000 and title_color as #1874CD and paragraph_color as #B0171F" 
		Then "With selected" should be displayed

	Scenario: Creating a Tenant for Checking the Another tenant Login Purpose
		Given Admin creates tenant with "name as anotherTesting and domain as anotherTesting.sharedemos.com:5000 and timezone as US/Pacific and crm_settings as {}"
		Then "With selected" should be displayed

	Scenario: Creating user with empty tenant
		Given Admin creates User with "first_name as Nagarjun and email as nagarjun.nas21@gmail.com and password as 123456"
		Then "Not a valid choice" should be displayed

	Scenario: Creating user with empty first name
		Given Admin creates User with "tenant as testing and email as nagarjun.nas21@gmail.com and password as 123456"
		Then "This field is required." should be displayed for "first_name"

	Scenario: Creating user with empty email
		Given Admin creates User with "tenant as testing and first_name as Nagarjun and password as 123456"
		Then "This field is required." should be displayed for "email"

	@important
	Scenario: Creating user for testing.sharedemos.com:5000 domain with required fields as Admin
		Given Admin creates User with "tenant as testing and role as admin and first_name as Nagarjun and last_name as satish and email as nagarjun.nas21@gmail.com and password as 123456 and unique_user_id as a1b2c3"
		Then "With selected" should be displayed

	Scenario: Creating user for testing.sharedemos.com:5000 domain with required fields as Analyst
		Given Admin creates User with "tenant as testing and role as analyst and first_name as Arjun and last_name as Varma and email as arjun.nas211993@gmail.com and password as 123456"
		Then "With selected" should be displayed

	Scenario: Creating user for anotherTesting.sharedemos.com:5000 domain with required fields
		Given Admin creates User with "tenant as anotherTesting and role as admin and first_name as Nagarjuna and last_name as Varma and email as nagarjun.varma@gmail.com and password as 123456"
		Then "With selected" should be displayed

	Scenario: Creating Language with empty ID
		Given Admin creates langauage with "name as en_English"
		Then "This field is required." should be displayed for "id"

	Scenario: Creating Language with empty Name
		Given Admin creates langauage with "id as en_US"
		Then "This field is required." should be displayed for "name"
	
	@important
	Scenario: Creating Language with required fields
		Given Admin creates langauage with "id as en_US and name as English"
		Then "With selected" should be displayed

	@multi_lingual
	Scenario: Creating Another Language with required fields
		Given Admin creates langauage with "id as zh_CN and name as Chinese"
		Then "With selected" should be displayed

	Scenario: Creating Language with Existing ID
		Given Admin creates langauage with "id as en_US and name as en_Eng"
		Then "Already exists." should be displayed
