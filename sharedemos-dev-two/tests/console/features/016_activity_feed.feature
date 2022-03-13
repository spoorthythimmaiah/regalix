@activity_feed
@get_the_app
@login_required
Feature:testing activity feed

Scenario:Testing that the "Activity Feed" link appears on the header bar of the dashboard
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	Then "Activity" should be displayed

Scenario:Clicking on the link 'Activity Feed' should open Activity Feed page
	Given user clicks on the activity link
	Then "Activity Feed" should be displayed 
	And "FILTER" should be displayed
	And "Date" should be displayed
	And "Author" should be displayed
	And "Categories" should be displayed

Scenario: Adding author user for testing activity feed
	Given Admin posts data as "first_name as Jyoti and last_name as Habbu and email as jyoti.habbu@gmail.com and role_id as 2 and sections as []" to "testing.sharedemos.com:5000" user permissions page
	Then "Jyoti for first_name and Habbu for last_name and jyoti.habbu@gmail.com for email" should be in the response
	Given added user is verfied from the Mail 
	Then "Congratulations on joining ShareDemos." should be displayed
	Given User sets password as "password as abc123"
	Then "library" should be displayed

Scenario: Adding another author user for testing activity feed
	Given Current User logsout
	And User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And Admin posts data as "first_name as Swati and last_name as Shah and email as swati.shah@gmail.com and role_id as 2 and sections as []" to "testing.sharedemos.com:5000" user permissions page
	Then "Swati for first_name and Shah for last_name and swati.shah@gmail.com for email" should be in the response
	Given added user is verfied from the Mail 
	Then "Congratulations on joining ShareDemos." should be displayed
	Given User sets password as "password as xyz123"
	Then "library" should be displayed

Scenario:User A Jyoti creates a main section
	Given Current User logsout
	And User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User posts data as "name as Jyoti Main Section and description as Testing Main Section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Jyoti Main Section for name and Testing Main Section for description" should be in the response 

Scenario: User A Jyoti edits the section description
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User wants to alter a section with the slug "Jyoti Main Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Jyoti Main Section and description as Testing Done and show as True and private as False" 
	Then "Testing Done for description" should be in the response

Scenario:User A Jyoti creates a sub section
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User posts data as "name as Jyoti sub section and description as A Sub Section and show as True and parent as jyoti-main-section and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Jyoti sub section for name and A Sub Section for description" should be in the response

Scenario:User A Jyoti creates a playlist
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User creates a playlist with "name as Jyoti playlist and section_id as jyoti-sub-section and description as Testing Normal Playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Jyoti playlist for name and Testing Normal Playlist for description" should be in the response

Scenario:User A Jyoti creates a demo/walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User creates walkthrough with "name as Jyoti WalkThrough" with the playlist "Jyoti playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Jyoti WalkThrough for name" should be in the Draft data

Scenario:User A Jyoti adds an image
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123" 
	And User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as jyoti-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
	Then "Jyoti WalkThrough for name and image for resource_type" should be in the Draft data

Scenario:User A publishes the demo
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
    And user publishes walkthrough "Jyoti WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    Then "Jyoti WalkThrough for name" should be in the Published data

Scenario:User A Jyoti creates another demo/walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User creates walkthrough with "name as Jyoti Delete WalkThrough" with the playlist "Jyoti playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Jyoti Delete WalkThrough for name" should be in the Draft data

Scenario:User A deletes a walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
    And User deletes the "Jyoti Delete WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "DELETED for status" should be in the Published data

Scenario: User A deletes a playlist
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User deletes a playlist "Jyoti playlist" of "testing.sharedemos.com:5000" edit page 
	Then "Jyoti playlist for name and Testing Normal Playlist for description" should be in the response

Scenario: User A deletes a subsection
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And User wants to delete a subsection "Jyoti sub section" related to "testing.sharedemos.com:5000" domain 
	Then "ok for delete" should be in the response 

Scenario:Get the activity feed
	Given User logins to "testing.sharedemos.com:5000" domain with "email as jyoti.habbu@gmail.com and password as abc123"
	And user lands in activity feed page

	Then "Jyoti Habbu for user_name and deleted for action and section for entity and Jyoti sub section for section_name and Jyoti Main Section for product_name" should be in the response "0"

	Then "Jyoti Habbu for user_name and deleted for action and playlist for entity and Jyoti playlist for playlist_name and Jyoti Main Section for product_name" should be in the response "1"

	Then "Jyoti Habbu for user_name and deleted for action and walkthrough for entity and Jyoti Delete WalkThrough for draft_walkthrough_name and Jyoti Main Section for product_name" should be in the response "2"

	And "Jyoti Habbu for user_name and created for action and walkthrough for entity and Jyoti Delete WalkThrough for draft_walkthrough_name and Jyoti Main Section for product_name" should be in the response "3"

	And "Jyoti Habbu for user_name and published for action and Jyoti WalkThrough for draft_walkthrough_name and walkthrough for entity and Jyoti Main Section for product_name" should be in the response "4"

	And "Jyoti Habbu for user_name and created for action and Jyoti WalkThrough for draft_walkthrough_name and walkthrough for entity and Jyoti Main Section for product_name" should be in the response "5"

	And "Jyoti Habbu for user_name and created for action and playlist for entity and Jyoti playlist for playlist_name and Jyoti Main Section for product_name" should be in the response "6"

	And "Jyoti Habbu for user_name and created for action and section for entity and Jyoti Main Section for product_name and Jyoti sub section for section_name" should be in the response "7"

	And "Jyoti Habbu for user_name and edited for action and product for entity and Jyoti Main Section for product_name and Jyoti Main Section for section_name" should be in the response "8"

	And "Jyoti Habbu for user_name and created for action and product for entity and Jyoti Main Section for product_name and Jyoti Main Section for section_name" should be in the response "9" 


Scenario:User B Swati creates a main section
	Given Current User logsout
	And User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User posts data as "name as Swati Main Section and description as Testing Swati Main Section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Swati Main Section for name and Testing Swati Main Section for description" should be in the response 

Scenario: User B Swati edits the section description
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User wants to alter a section with the slug "Swati Main Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as Swati Main Section and description as Testing Done and show as True and private as False" 
	Then "Testing Done for description" should be in the response

Scenario:User B Swati creates a sub section
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User posts data as "name as Swati sub section and description as A Sub Section and show as True and parent as swati-main-section and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Swati sub section for name and A Sub Section for description" should be in the response

Scenario:User B Swati creates a playlist
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User creates a playlist with "name as Swati playlist and section_id as swati-sub-section and description as Testing Normal Playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Swati playlist for name and Testing Normal Playlist for description" should be in the response

Scenario:User B Swati creates a demo/walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User creates walkthrough with "name as Swati WalkThrough" with the playlist "Swati playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Swati WalkThrough for name" should be in the Draft data

Scenario:User B Swati adds an image
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123" 
	And User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as swati-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
	Then "Swati WalkThrough for name and image for resource_type" should be in the Draft data

Scenario:User B Swati publishes the demo
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
    And user publishes walkthrough "Swati WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    Then "Swati WalkThrough for name" should be in the Published data

Scenario:User B Swati creates another demo/walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User creates walkthrough with "name as Swati Delete WalkThrough" with the playlist "Swati playlist" to "testing.sharedemos.com:5000" edit page 
	Then "Swati Delete WalkThrough for name" should be in the Draft data

Scenario:User B deletes a walkthrough
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
    And User deletes the "Swati Delete WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "DELETED for status" should be in the Published data

Scenario: User B deletes a playlist
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User deletes a playlist "Swati playlist" of "testing.sharedemos.com:5000" edit page 
	Then "Swati playlist for name and Testing Normal Playlist for description" should be in the response

Scenario: User B deletes a subsection
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And User wants to delete a subsection "Swati sub section" related to "testing.sharedemos.com:5000" domain 
	Then "ok for delete" should be in the response 

@freeze_timing
Scenario:Get the activity feed
	Given User logins to "testing.sharedemos.com:5000" domain with "email as swati.shah@gmail.com and password as xyz123"
	And user lands in activity feed page

	Then "Swati Shah for user_name and deleted for action and section for entity and Swati sub section for section_name and Swati Main Section for product_name" should be in the response "0"

	Then "Swati Shah for user_name and deleted for action and playlist for entity and Swati playlist for playlist_name and Swati Main Section for product_name" should be in the response "1"

	Then "Swati Shah for user_name and deleted for action and walkthrough for entity and Swati Delete WalkThrough for draft_walkthrough_name and Swati Main Section for product_name" should be in the response "2"

	And "Swati Shah for user_name and created for action and walkthrough for entity and Swati Delete WalkThrough for draft_walkthrough_name and Swati Main Section for product_name" should be in the response "3"

	And "Swati Shah for user_name and published for action and Swati WalkThrough for draft_walkthrough_name and walkthrough for entity and Swati Main Section for product_name" should be in the response "4"

	And "Swati Shah for user_name and created for action and Swati WalkThrough for draft_walkthrough_name and walkthrough for entity and Swati Main Section for product_name" should be in the response "5"

	And "Swati Shah for user_name and created for action and playlist for entity and Swati playlist for playlist_name and Swati Main Section for product_name" should be in the response "6"

	And "Swati Shah for user_name and created for action and section for entity and Swati Main Section for product_name and Swati sub section for section_name" should be in the response "7"

	And "Swati Shah for user_name and edited for action and product for entity and Swati Main Section for product_name and Swati Main Section for section_name" should be in the response "8"

	And "Swati Shah for user_name and created for action and product for entity and Swati Main Section for product_name and Swati Main Section for section_name" should be in the response "9" 


Scenario:Testing search filter based on user name
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user searches the activity feed for the "user" "Swati"
	Then search results for the "user_name" "Swati Shah" are displayed

Scenario:Testing search filter based on section title
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user searches the activity feed for the "section" "Jyoti Main Section"
	Then search results for the "product_name" "Jyoti Main Section" are displayed

Scenario:Testing search filter based on walkthrough title
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user searches the activity feed for the "walkthrough" "Swati WalkThrough"
	Then search results for the "draft_walkthrough_name" "Swati WalkThrough" are displayed

Scenario:Testing date filter from previous day to present day
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed from previous day to present day
	Then date filter result for previous day to present day is displayed

Scenario:Testing date filter from previous day to next day
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed from previous day to next day
	Then date filter result for previous day to next day is displayed

Scenario:Testing date filter from present day to next day
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity from present day to next day
	Then date filter result for present to next day is displayed

Scenario:Testing filter based on author A
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for author with firstname as "Jyoti" and lastname as "Habbu"
	Then author filter result related to author "Jyoti Habbu" is displayed

Scenario:Testing filter based on author B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for author with firstname as "Swati" and lastname as "Shah"
	Then author filter result related to author "Swati Shah" is displayed

Scenario:Activity feed filter for both authors A and B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for authors A and B with author A's firstname as "Jyoti" and lastname as "Habbu" and author B's firstname as "Swati" and lastname as "Shah"
	Then authors filter results related to authors A "Jyoti Habbu" and B "Swati Shah" are displayed
	
Scenario:Activity feed filter based on category A
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for category "Jyoti Main Section"
	Then category filter result for the category "Jyoti Main Section" is displayed

Scenario:Activity feed filter based on category B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for category "Swati Main Section"
	Then category filter result for the category "Swati Main Section" is displayed

Scenario:Activity feed filter for both categories A and B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed for both the categories "Jyoti Main Section" and "Swati Main Section"
	Then category filter result for the categories "Jyoti Main Section" and "Swati Main Section" are displayed

Scenario:Activity feed filter for the author A and category A
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed based on author with firstname as "Jyoti" and lastname as "Habbu" and category "Jyoti Main Section"
	Then filter results for the author "Jyoti Habbu" and category "Jyoti Main Section" are displayed

Scenario:Activity feed filter for the author B and category B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed based on author with firstname as "Swati" and lastname as "Shah" and category "Swati Main Section"
	Then filter results for the author "Swati Shah" and category "Swati Main Section" are displayed

Scenario:Activity feed filter for the author A and category B
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed based on author with firstname as "Jyoti" and lastname as "Habbu" and category "Swati Main Section"
	Then nothing should be displayed

Scenario: Activity feed filter for the author B and category A
	Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
	And user filters the activity feed based on author with firstname as "Swati" and lastname as "Shah" and category "Jyoti Main Section"
	Then nothing should be displayed
