@get_the_app
Feature: As a Tester I want to See 
		 Whether the Specific Domian Page is loaded or not 
		 User actions like Login with all possibilites

	Scenario: Verifying the Tenant Home Page
		Given User lands in "testing.sharedemos.com:5000" page
		Then "Product Walkthrough" should be displayed 

	Scenario: Verifying the Tenant User Login Page
		Given User lands in "testing.sharedemos.com:5000" login page
		Then "Sign In" should be displayed 

	Scenario: Verifying the Tenant User Login with wrong Email ID 
		Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun@gmail.com and password as 123456"
		Then "The email or password you entered is incorrect." should be displayed 

	Scenario: Verifying the Tenant User Login with wrong Fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun@gmail.com and password as 1234asd56"
		Then "The email or password you entered is incorrect." should be displayed

	Scenario: Verifying the Tenant User Login of another Tenant
		Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun@gmail.com and password as 1234asd56"
		Then "The email or password you entered is incorrect." should be displayed 

	Scenario: Verifying the Tenant User Login with empty email 
		Given User logins to "testing.sharedemos.com:5000" domain with "email as '' and password as 123456"
		Then "The email or password you entered is incorrect." should be displayed

	Scenario: Verifying the Tenant User Login with empty fileds 
		Given User logins to "testing.sharedemos.com:5000" domain with "email as '' and password as ''"
		Then "The email or password you entered is incorrect." should be displayed
	
	Scenario: Verifying the Tenant Admin User Login with all required fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
		Then "library" should be displayed

	Scenario: Verifying the Tenant Analyst User Login with all required fields
		Given User logins to "testing.sharedemos.com:5000" domain with "email as arjun.nas211993@gmail.com and password as 123456"
		Then "Metrics" should be displayed