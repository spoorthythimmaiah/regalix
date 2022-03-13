@login_required
@product_tree
Feature: As a Tester I want to See 
		 User actions like 
		 Getting a Product Tree with Product Name
		 Getting a Product Tree with Product Name and Section Name

	Scenario: Getting a Product Tree with the Product Name 
		Given User gets product tree with "Main Section Altered" of "testing.sharedemos.com:5000" page
		Then "Main Section Altered for name" should be in the response

	Scenario: Getting a Product Tree with the Product Name and Section Name
		Given User gets product tree with "Main Section Altered" and "Sub Section" of "testing.sharedemos.com:5000" page
		Then "Main Section Altered for name and Sub Section for name" should be in the response