@login_required
@audience
Feature: As a Tester I want to See 
		 Admin actions like 
		 Adding a Company
		 Adding a User for specified Company
		 Sharing the Private Contents with User
		 Testing the Visbility of Private Contents for the Normal User
		 and Audience User actions like
		 Audience User Sign Up
		 Testing the Visbility of Private Contents for the Audience User 


	Scenario: Adding a Company with empty Company Name
		Given Admin adds a company with data "company_website_url as http://regalix.com" to "testing.sharedemos.com:5000" audience page
		Then "FAILED" should be displayed

	Scenario: Adding a Company with empty Company URL
		Given Admin adds a company with data "company_name as Regalix" to "testing.sharedemos.com:5000" audience page
		Then "FAILED" should be displayed

	Scenario: Adding a Company with required fields
		Given Admin adds a company with data "company_name as Regalix.Inc and company_website_url as http://regalix.com" to "testing.sharedemos.com:5000" audience page
		Then "SUCCESS" should be displayed

	Scenario: Editing the Company Name
		Given Admin edits a company data with "company_name as Regalix and company_website_url as http://regalix.com" of company "Regalix.Inc" to "testing.sharedemos.com:5000" audience page
		Then "SUCCESS" should be displayed

	Scenario: Adding a Existng Company
		Given Admin adds a company with data "company_name as Regalix.Inc and company_website_url as http://regalix.com" to "testing.sharedemos.com:5000" audience page
		Then "EXISTS" should be displayed

	Scenario: Adding a Main Section with required fields as a Private Section
		Given User posts data as "name as Private Section and description as Testing Private Section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Private Section for name and Testing Private Section for description" should be in the response

	Scenario: Adding a First Sub Section with required fields
		Given User posts data as "name as Private Sub Section and description as Private Sub Section and show as True and parent as private-section and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Private Sub Section for name and Private Sub Section for description" should be in the response

	Scenario: Adding a Second Sub Section with required fields
		Given User posts data as "name as Private Test Sub Section and description as Testing Private Sub Section and show as True and parent as private-section and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Private Test Sub Section for name and Testing Private Sub Section for description" should be in the response

    Scenario: Creating a Playlist with required fields for Audience Purpose
        Given User creates a playlist with "name as Private Playlist and section_id as private-test-sub-section and description as Testing Private Playlist" to "testing.sharedemos.com:5000" edit page 
        Then "Private Playlist for name and Testing Private Playlist for description" should be in the response

	Scenario: Creating a WalkThrough with required fields for Audience Purpose
		Given User creates walkthrough with "name as Private WalkThrough" with the playlist "Private Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Private WalkThrough for name" should be in the Draft data

    Scenario: Creating a Image Resource for Private walkthrough
        Given User creates resource with "name as Private Image and is_new as true and external as false and walkthrough as private-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
        Then "Private WalkThrough for name and image for resource_type" should be in the Draft data

	Scenario: Publishing the Walkthrough Private WalkThrough
		Then User publishes walkthrough "Private WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
		And "Private WalkThrough for name" should be in the Published data
	
	Scenario: Adding a User with empty First Name to the Created Company
		Given Admin adds a user related to company with data "employee_lname as Satish and employee_email as arjun.nas@gmail.com and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "FAILED" should be displayed

	Scenario: Adding a User with empty Last Name to the Created Company
		Given Admin adds a user related to company with data "employee_fname as Arjun and employee_email as arjun.nas@gmail.com and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "FAILED" should be displayed

	Scenario: Adding a User with empty Email to the Created Company
		Given Admin adds a user related to company with data "employee_fname as Arjun and employee_lname as Satish and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "FAILED" should be displayed

	Scenario: Adding a User with required fields to the Created Company
		Given Admin adds a user related to company with data "employee_fname as Arjun and employee_lname as Satish and employee_email as arjun.nas@gmail.com and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "SUCCESS" should be displayed

	Scenario: Editing the User Name
		Given Admin edits user "Arjun" with data "employee_fname as Nagarjun and employee_lname as Satish and employee_email as nagarjun.nas@gmail.com and employee_designation as Devloper" of "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "SUCCESS" should be displayed

	Scenario: Adding a Existing User to the Created Company
		Given Admin adds a user related to company with data "employee_fname as Nagarjun and employee_lname as Satish and employee_email as nagarjun.nas@gmail.com and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
		Then "EXISTS" should be displayed

	Scenario: Getting all the Users Related to the Company
        Given Admin want to see all the users realted to the company "Regalix" of "testing.sharedemos.com:5000" domain
        Then "Nagarjun for first_name and Satish for last_name" should be in the response

	Scenario: Sharing the Private Content to the User with a Expired Expiry Date
        Given Admin shares the contents "private-section" with "share_content_type as custom and company_enabled as True and link_expiry_date as 12/08/2015" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed 

    Scenario: Signing Up to See the Private Content Shared to the User
		Given User wants to see the Shared Private content by accessing the audience URL sent to his mail 
		Then "Oops! Something went wrong." should be displayed

	Scenario: Sharing the Private Content to the User with No Private Content
        Given Admin shares the contents "private-section" with "share_content_type as None and company_enabled as False" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed 

    Scenario: Signing Up to See the Private Content Shared to the User
        Given User wants to see the Shared Private content by accessing the audience URL sent to his mail 
        Then "Oops! Something went wrong." should be displayed

    Scenario: Sharing the Private Content to the User with No Private Content
        Given Admin shares the contents "private-section" with "share_content_type as custom and company_enabled as True" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed

    Scenario: Sharing the Private Content to the User
        Given Admin shares the contents "main-section-altered" with "share_content_type as custom and company_enabled as True" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed

    Scenario: Testing the Visbility of Private Contents for the Audience User before Signup
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

    Scenario: Signing Up to See the Private Content Shared to the User
        Given User wants to see the Shared Private content by accessing the audience URL sent to his mail
        Then "You've been invited!" should be displayed
        Given User signups to the audience signup page with the data "first_name as Nagarjun and last_name as Satish and email as nagarjun.nas@gmail.com and designation as Devloper"

	Scenario: Testing the Visbility of Private Contents for the Audience User when there is no Private Content
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

    Scenario: Testing the Visbility of Private Contents for the Normal User when there is no Private Content
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

	Scenario: Altering a Section Private/Public from the slug 
        Given User wants to alter a section with the slug "Private Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Private Section and description as Testing Private Section and show as True and private as True" 
        Then "Private Section for name" should be in the response

    Scenario: Sharing the Private Content to the User with Private Content
        Given Admin shares the contents "private-section" with "share_content_type as custom and company_enabled as True" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed 

    Scenario: Testing the Visbility of Private Contents for the Normal User
        Given Normal User wants to see the private contents
        Then "Main Section Altered for name and Testing Done for description" should be in the response
        Then "Private Section for name and Testing Private Section for description" should not be in the response

    Scenario: Testing the Visbility of Private Contents for the Audience User
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

    Scenario: Testing the Visbility of Child of the Shared Private Contents for the Audience User
        Given Audience User wants to see the "Private Test Sub Section" Private content  
        Then "Private WalkThrough for name and Private Playlist for name" should be in the response

    Scenario: Deleting a User 
        Given Admin wants to delete a user "Nagarjun" of the "Regalix" company related to "testing.sharedemos.com:5000" domain 
        Then "SUCCESS" should be displayed

    Scenario: Testing the Visbility of Private Contents for the Deleted Audience User
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

    Scenario: Re-Adding the Deleted User with required fields
        Given Admin adds a user related to company with data "employee_fname as Nagarjun and employee_lname as Satish and employee_email as nagarjun.nas@gmail.com and employee_designation as Devloper" to the "Regalix" company of "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed

    Scenario: Testing the Visbility of Private Contents for the Re-added Audience User
        Given Audience User wants to see the Shared Private content  
        Then "Main Section Altered for name and Testing Done for description and Private Section for name and Testing Private Section for description" should be in the response

    Scenario: Testing the Visbility of Private Contents for the Normal User
        Given Normal User wants to see the private contents
        Then "Main Section Altered for name and Testing Done for description" should be in the response
        Then "Private Section for name and Testing Private Section for description" should not be in the response

    Scenario: Altering a Section Private/Public from the slug 
        Given User wants to alter a section with the slug "Private Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Private Section and description as Testing Private Section and show as True and private as False" 
        Then "Private Section for name" should be in the response 

    Scenario: Altering a Section Private/Public from the slug 
        Given User wants to alter a section with the slug "Private Test Sub Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Private Test Sub Section and description as Testing Private Test Sub Section and show as True and private as True" 
        Then "Private Test Sub Section for name" should be in the response 

    Scenario: Testing the Visbility of Recent Private Contents for the Audience User
        Given Current User logsout
        Given Audience User wants to see the "Private Section" Private content  
        Then "Private Sub Section for name and Private Sub Section for description" should be in the response
        Then "Private Test Sub Section for name and Testing Private Sub Section for description" should not be in the response

    Scenario: Testing the Visbility of Private Contents for the Normal User
        Given Normal User wants to see the "Private Section" Private content
        Then "Private Sub Section for name and Private Sub Section for description" should be in the response
        Then "Private Test Sub Section for name and Testing Private Sub Section for description" should not be in the response

    Scenario: Sharing the Private Content to the User
        Given Admin logins to the domain
        Given Admin shares the contents "private-test-sub-section" with "share_content_type as custom and company_enabled as True" related to company "Regalix" to "testing.sharedemos.com:5000" audience page
        Then "SUCCESS" should be displayed

    Scenario: Another User Sign Up to See the Shared Private Content  
        Given Current User logsout 
        Given User wants to see the Shared Private content by accessing the audience URL sent to his mail
        Then "You've been invited!" should be displayed
        Given User signups to the audience signup page with the data "first_name as Arjun and last_name as Satish and email as arjun.nas@gmail.com and designation as Devloper"

    Scenario: Testing the Visbility of Recent Shared Private Content for the Audience User
        Given Audience User wants to see the "Private Section" Private content  
        Then "Private Sub Section for name and Private Sub Section for description and Private Test Sub Section for name and Testing Private Test Sub Section for description" should be in the response

    Scenario: Testing the Visbility of Child of the Recent Shared Private Content for the Audience User
        Given Audience User wants to see the "Private Test Sub Section" Private content  
        Then "Private WalkThrough for name" should be in the response

    Scenario: Testing the Visbility of Private Contents for the Normal User
        Given Normal User wants to see the "Private Section" Private content
        Then "Private Sub Section for name and Private Sub Section for description" should be in the response
        Then "Private Test Sub Section for name and Testing Private Sub Section for description" should not be in the response

    Scenario: Getting all the Users Related to the Company
        Given Admin want to see all the users realted to the company "Regalix" of "testing.sharedemos.com:5000" domain
        Then "Nagarjun for first_name and Satish for last_name and Arjun for first_name and Satish for last_name" should be in the response

    Scenario: Deleting the Sub Section Section from the slug 
    	Given Admin logins to the domain
		Given User wants to delete a section with the slug "Private Test Sub Section" related to "testing.sharedemos.com:5000" domain 
		Then "ok for delete" should be in the response 

	Scenario: Testing the Visbility of Deleted Shared Private Content for the Audience User
        Given Audience User wants to see the "Private Section" Private content  
        Then "Private Sub Section for name and Private Sub Section for description" should be in the response
        Then "Private Test Sub Section for name and Testing Private Test Sub Section for description" should not be in the response

    Scenario: Testing the Visbility of Child of the Recently deleted Private Content for the Audience User
        Given Audience User wants to see the "Private Test Sub Section" Private content  
        Then "Private WalkThrough for name and Private Playlist for name" should not be in the response