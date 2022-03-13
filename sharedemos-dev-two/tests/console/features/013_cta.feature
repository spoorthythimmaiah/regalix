@login_required
@cta_forms
Feature: As a Tester I want to See 
		 Admin actions like 
		 Creating a CTA Button for a Form with fields describrd by admin
		 Creating a CTA Button for a URL

	Scenario: Adding a CTA Form Button with empty name
		Given Admin wants to add a CTA button of "text as CTA Form Button and campaign_message as CTA Form Button and type as form and fields as Name,Email,Designation" to "testing.sharedemos.com:5000" edit page
		Then "CTA name required" should be displayed

	Scenario: Adding a CTA Form Button with empty Options
		Given Admin wants to add a CTA button of "name as CTA Form Button" to "testing.sharedemos.com:5000" edit page
		Then "CTA options required" should be displayed

	Scenario: Adding a CTA Form Button with required fields
		Given Admin wants to add a CTA button of "name as CTA Form Button and text as CTA Form Button and campaign_message as CTA Form Button and type as form and fields as Name,Email,Designation" to "testing.sharedemos.com:5000" edit page
		Then "CTA Form Button for name" should be in the response 

	Scenario: Adding a CTA URL Button with required fields
		Given Admin wants to add a CTA button of "name as CTA URL Button and text as CTA URL Button and campaign_message as CTA URL Button and type as link and href as http://google.com" to "testing.sharedemos.com:5000" edit page
		Then "CTA URL Button for name" should be in the response 

	Scenario: Getting all CTA Buttons
		Given Admin wants to get all the cta buttons related to "testing.sharedemos.com:5000" domain
		Then "CTA URL Button for name and CTA Form Button for name" should be in the response 