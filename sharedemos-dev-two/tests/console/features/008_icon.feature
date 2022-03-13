@login_required
@icon
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a Icon
		 Deleting a Icon

	Scenario: Creating a Icon with empty Name field
		Given User creates an icon with "icon as two.jpg" to "testing.sharedemos.com:5000" page
		Then "Icon name required" should be displayed

	Scenario: Creating a Icon with empty Image field
		Given User creates an icon with "name as Section Icon" to "testing.sharedemos.com:5000" page
		Then "Icon file required" should be displayed

	Scenario: Creating a Icon with required fields
		Given User creates an icon with "name as Section Icon and icon as two.jpg" to "testing.sharedemos.com:5000" page
		Then "Section Icon for name" should be in the response 

	Scenario: Deleteing a Icon
		Given User deletes an icon with id "1" to "testing.sharedemos.com:5000" page
		Then "DELETED for status" should be in the response 