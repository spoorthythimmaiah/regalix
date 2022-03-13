@activity_feed
Feature: Selenium testing of Activity Feed Page
	
	Scenario: Verifying Activity Feed Page
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		When user clicks on "activity" button
		Then "Activity Feed" should be the heading of the Page

	Scenario: First User Adds Section for Activity Feed
		Then user switches to "edit" page
		Given user creates a section "Activity Main Section" with "Activity Main Section description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu created product Activity Main Section"

	Scenario: First User Adds Sub Section for Activity Feed
		Then user switches to "edit" page
		Given user creates a subsection "Activity Sub Section" under "Activity Main Section" with "Activity Sub Section description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu created section Activity Sub Section under Activity Main Section"

	Scenario: First User Adds Playlist for Activity Feed
		Then user switches to "edit" page
		Given user selects "Activity Main Section"
		And user creates a playlist "Activity Playlist" under "Activity Sub Section" with "Activity playlist description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu created playlist Activity Playlist under Activity Main Section"

	@previous_day
	Scenario: First User Adds Demo for Activity Feed
		Then user switches to "edit" page
		Given user selects "Activity Main Section"
		And user selects "Activity Sub Section"
		And user creates a demo "Activity-Demo" under "Activity Playlist"
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu created demo Activity-Demo under Activity Main Section"

	Scenario:Upload image in slide for Activity Feed
		Then user switches to "edit" page
		Given user selects "Activity Main Section"
		And user selects "Activity Sub Section"
	    And user selects "Activity-Demo" demo
	    And user clicks on plus button to create a new slide
	    And user selects "add_image" icon
	    When user uploads an image "sunset.jpg"
	    Then image is uploaded in slide "1" of "edit" mode
	    And user publishes the work done
	    Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu published demo Activity-Demo under Activity Main Section"

	Scenario: Editing the Name of Main Section for Activity Feed
		Then user switches to "edit" page
		Given user clicks on edit option of "Activity-Main-Section"
		And user clicks on "edit" icon of "Activity-Main-Section"
		And user enters "Activity Main Section One" as "section-name"
		When user clicks on "save"
		Then "Activity Main Section One" is present as section
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu edited product Activity Main Section One"

	Scenario:Deleting Demo for Activity Feed
		Then user switches to "edit" page
		Given user selects "Activity Main Section One"
		And user selects "Activity Sub Section"
	    And user "delete"s the demo "Activity-Demo"
		Then "Activity-Demo" demo is deleted
	    Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu deleted demo Activity-Demo under Activity Main Section One"

	Scenario:Adding Second Demo for Activity Feed
		Then user switches to "edit" page
		Given user selects "Activity Main Section One"
		And user selects "Activity Sub Section"
	    And user creates a demo "Second-Activity-Demo" under "Activity Playlist"
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Preeti Habbu created demo Second-Activity-Demo under Activity Main Section One"

	Scenario:Creating new user with admin permission for Activity Feed
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

	Scenario: Second User Adds Section for Activity Feed
		Given "admin" user successfully logs in with "dummymail@gmail.com" as email and "something" as password
		When user clicks on edit button
		Given user creates a section "Second Activity Main Section" with "Second Activity Main Section description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Keerti Habbu created product Second Activity Main Section"

	Scenario: Second User Adds Sub Section for Activity Feed
		Then user switches to "edit" page
		Given user creates a subsection "Second Activity Sub Section" under "Second Activity Main Section" with "Second Activity Sub Section description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Keerti Habbu created section Second Activity Sub Section under Second Activity Main Section"

	Scenario: Second User Adds Playlist for Activity Feed
		Then user switches to "edit" page
		Given user selects "Second Activity Main Section"
		And user creates a playlist "Second Activity Playlist" under "Second Activity Sub Section" with "Second Activity playlist description" as description
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Keerti Habbu created playlist Second Activity Playlist under Second Activity Main Section"

	Scenario: Second User Adds Demo for Activity Feed
		Then user switches to "edit" page
		Given user selects "Second Activity Main Section"
		And user selects "Second Activity Sub Section"
		And user creates a demo "Activity-Demo-Two" under "Second Activity Playlist"
		Then user switches to "activity" page 
		And user checks activity feed for the feed "Keerti Habbu created demo Activity-Demo-Two under Second Activity Main Section"

	Scenario:Upload image in slide for Activity Feed
		Then user switches to "edit" page
		Given user selects "Second Activity Main Section"
		And user selects "Second Activity Sub Section"
	    And user selects "Activity-Demo-Two" demo
	    And user clicks on plus button to create a new slide
	    And user selects "add_image" icon
	    When user uploads an image "sunset.jpg"
	    Then image is uploaded in slide "1" of "edit" mode
	    And user publishes the work done
	    Then user switches to "activity" page 
		And user checks activity feed for the feed "Keerti Habbu published demo Activity-Demo-Two under Second Activity Main Section"

	Scenario: Serach filtering action in the Activity Feed Page
		Then user switches to "activity" page 
		And user enters "Activity-Demo-Two" in search input
		Then user checks activity feed for the feed "Keerti Habbu created demo Activity-Demo-Two under Second Activity Main Section"
		Then user checks activity feed for the feed "Keerti Habbu published demo Activity-Demo-Two under Second Activity Main Section"

	Scenario: First Author filtering action in the Activity Feed Page
		Then user clears in search input
		And user "selects" the "author" as "Preeti Habbu" in filter list
		Then user checks activity feed for the feed "Preeti Habbu created demo Second-Activity-Demo under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu deleted demo Activity-Demo under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu edited product Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu published demo Activity-Demo under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created demo Activity-Demo under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created playlist Activity Playlist under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created section Activity Sub Section under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created product Activity Main Section One"

	Scenario: Second Author filtering action in the Activity Feed Page
		Then user "deselects" the "author" as "Preeti Habbu" in filter list
		And user "selects" the "author" as "Keerti Habbu" in filter list
		Then user checks activity feed for the feed "Keerti Habbu published demo Activity-Demo-Two under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created demo Activity-Demo-Two under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created playlist Second Activity Playlist under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created section Second Activity Sub Section under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created product Second Activity Main Section"

	Scenario: Section filtering action in the Activity Feed Page
		Then user "deselects" the "author" as "Keerti Habbu" in filter list
		And user "selects" the "category" as "Second Activity Main Section" in filter list
		Then user checks activity feed for the feed "Keerti Habbu published demo Activity-Demo-Two under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created demo Activity-Demo-Two under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created playlist Second Activity Playlist under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created section Second Activity Sub Section under Second Activity Main Section"
		And user checks activity feed for the feed "Keerti Habbu created product Second Activity Main Section"

	Scenario:Date filtering Action in the Activity Feed Page
		Then user "deselects" the "category" as "Second Activity Main Section" in filter list
		And user filters the date from day before yesterday to yesterday
		And user checks activity feed for the feed "Preeti Habbu created product Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created section Activity Sub Section under Activity Main Section One"
		And user checks activity feed for the feed "Preeti Habbu created playlist Activity Playlist under Activity Main Section One"