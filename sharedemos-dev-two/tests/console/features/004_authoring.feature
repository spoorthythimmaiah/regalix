@login_required
@authoring
@audience
@product_tree
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a Main Section
		 Creating a Sub Section
		 Hiding a Section
		 Deleting a Section
		 Altering a Section

	Scenario: Verifying the Tenant Settings Page
		Given User lands in "testing.sharedemos.com:5000" settings page
		Then "Library" should be displayed 

	Scenario: Verifying the Tenant Authoring Page
		Given User gets "testing.sharedemos.com:5000" authoring page
		Then "EXIT" should be displayed 

	Scenario: Adding a Main Section with empty name
		Given User posts data as "description as Testing Main Section and show as True" to "testing.sharedemos.com:5000" edit page
		Then "Name required" should be displayed

	Scenario: Adding a Main Section with empty description
		Given User posts data as "name as Main Section and show as True" to "testing.sharedemos.com:5000" edit page
		Then "Description required" should be displayed

	Scenario: Adding a Main Section with empty show/hide
		Given User posts data as "name as Main Section and description as Testing Main Section" to "testing.sharedemos.com:5000" edit page
		Then "Show/Hide flag required" should be displayed

	Scenario: Adding a Main Section with required fields
		Given User posts data as "name as Main Section and description as Testing Main Section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Main Section for name and Testing Main Section for description and false for is_hidden and false for is_private" should be in the response 

	Scenario: Adding a Main Section with required fields and Video
		Given User posts data as "name as Video Section and description as Testing Video Section and show as True and private as False" to "testing.sharedemos.com:5000 and video as www.youtube.com/watch?v=NkyEOrQiGMQ and poster as https://i.ytimg.com/vi/NkyEOrQiGMQ/hqdefault.jpg" edit page
		Then "Video Section for name and Testing Video Section for description and false for is_hidden and false for is_private" should be in the response 

	Scenario: Adding a Sub Section with required fields
		Given User posts data as "name as Sub Section and description as A Sub Section and show as True and parent as main-section and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Sub Section for name and A Sub Section for description and false for is_hidden and false for is_private" should be in the response

	Scenario: Adding a Sub Section with required fields and Hiding 
		Given User posts data as "name as Sub Hiding Section and description as Hiding Sub Section and show as False and parent as main-section and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Sub Hiding Section for name and Hiding Sub Section for description and true for is_hidden and false for is_private" should be in the response

	Scenario: Adding a Sub Section with required fields and Realated Products 
		Given User posts data as "name as Sub Related Section and description as Related Sub Section and show as True and parent as main-section and related_products as Sub Hiding Section and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Sub Related Section for name and Related Sub Section for description and false for is_hidden and false for is_private" should be in the response 

	Scenario: Getting all Sections
		Given User wants to get all the sections related to "testing.sharedemos.com:5000" domain
		Then "Main Section for name" should be in the response 

	Scenario: Getting a specific Section from the slug
		Given User wants to get a section with the slug "Main Section" related to "testing.sharedemos.com:5000" domain
		Then "Main Section for name and Testing Main Section for description" should be in the response 

	Scenario: Adding a Main Section with required fields with hiding 
		Given User posts data as "name as Hiding Section and description as Hiding and show as False and private as False" to "testing.sharedemos.com:5000" edit page
		Then "Hiding Section for name and Hiding for description and true for is_hidden and false for is_private" should be in the response 

	Scenario: Getting a hided Section from the slug 
		Given User wants to get all the sections related to "testing.sharedemos.com:5000" domain
		Then "Hiding Section for name and Hiding for description" should not be in the response
		Given User wants to get a section with the slug "Hiding Section" related to "testing.sharedemos.com:5000" domain 
		Then "Hiding Section for name and Hiding for description and false for is_private" should be in the response 

	Scenario: Deleting a Section from the slug 
		Given User wants to delete a section with the slug "Hiding Section" related to "testing.sharedemos.com:5000" domain 
		Then "ok for delete" should be in the response 

	Scenario: Altering a Section Name from the slug 
		Given User wants to alter a section with the slug "Main Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Main Section Altered and description as testing and show as True and private as False" 
		Then "Main Section Altered for name" should be in the response 

	Scenario: Altering a Section Description from the slug 
		Given User wants to alter a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "name as Main Section Altered and description as Testing Done and show as True and private as False" 
		Then "Testing Done for description" should be in the response 

	Scenario: Hiding the Section from the slug
		Given User wants to alter a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "name as Main Section Altered and description as Testing Done and show as False and private as False" 
		Then "Main Section Altered for name and Testing Done for description and true for is_hidden and false for is_private" should be in the response
		Given User wants to get all the sections related to "testing.sharedemos.com:5000" domain
		Then "Main Section Altered for name and Testing Done for description" should not be in the response 

	Scenario: Unhiding the Section from the slug 
		Given User wants to alter a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "name as Main Section Altered and description as Testing Done and show as True and private as False" 
		Then "Main Section Altered for name and Testing Done for description and false for is_hidden and false for is_private" should be in the response

	Scenario: Altering a Section postion from the slug 
		Given User wants to reorder a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "after_ele_slug as video-section and reorder as section and id as main-section-altered and target_parent_slug as " 
		Then "UPDATED for status" should be in the response 

	Scenario: Disabling a Section from the slug 
		Given User wants to disable a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "is_enabled as False and id as main-section-altered"
		Then "Main Section Altered for name and false for is_enabled" should be in the response 

	Scenario: Enabling a Section from the slug
		Given User wants to enable a section with the slug "Main Section Altered" related to "testing.sharedemos.com:5000" domain with the alteration "is_enabled as True and id as main-section-altered"
		Then "Main Section Altered for name and true for is_enabled" should be in the response
