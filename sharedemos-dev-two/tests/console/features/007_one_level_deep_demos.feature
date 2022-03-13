@login_required
@one_level_deep_demos
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a One level Deep Demo

	Scenario: Adding a Main Section with empty name
		Given User posts data as "description as Testing One level Section and show as True" to "testing.sharedemos.com:5000" edit page
		Then "Name required" should be displayed

	Scenario: Adding a Main Section with empty description
		Given User posts data as "name as One level Section and show as True" to "testing.sharedemos.com:5000" edit page
		Then "Description required" should be displayed

	Scenario: Adding a Main Section with empty show/hide
		Given User posts data as "name as One level Section and description as Testing One level Section" to "testing.sharedemos.com:5000" edit page
		Then "Show/Hide flag required" should be displayed

	Scenario: Adding a Main Section with required fields for One level Deep Purpose 
		Given User posts data as "name as One level Section and description as Testing One level Section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
		Then "One level Section for name and Testing One level Section for description and false for is_hidden and false for is_private" should be in the response 

	Scenario: Hiding the Section from the slug
		Given User wants to alter a section with the slug "One level Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as One level Section and description as Testing One level Section and show as False and private as False" 
		Then "One level Section for name and Testing One level Section for description and true for is_hidden and false for is_private" should be in the response
		Given User wants to get all the sections related to "testing.sharedemos.com:5000" domain
		Then "One level Section for name and Testing One level Section for description" should not be in the response 

	Scenario: Unhiding the Section from the slug 
		Given User wants to alter a section with the slug "One level Section" related to "testing.sharedemos.com:5000" domain with the alteration "name as One level Section and description as Testing One level Section and show as True and private as False" 
		Then "One level Section for name and Testing One level Section for description and false for is_hidden and false for is_private" should be in the response

	Scenario: Disabling a Section from the slug 
		Given User wants to disable a section with the slug "One level Section" related to "testing.sharedemos.com:5000" domain with the alteration "is_enabled as False and id as one-level-section"
		Then "One level Section for name and false for is_enabled" should be in the response 

	Scenario: Enabling a Section from the slug
		Given User wants to enable a section with the slug "One level Section" related to "testing.sharedemos.com:5000" domain with the alteration "is_enabled as True and id as one-level-section"
		Then "One level Section for name and true for is_enabled" should be in the response

	Scenario: Creating a Playlist with Empty Name
		Given User creates a playlist with "section_id as one-level-section and description as Testing One level Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Playlist name required" should be displayed

	Scenario: Creating a Playlist with Empty Description
		Given User creates a playlist with "name as One level Playlist and section_id as one-level-section" to "testing.sharedemos.com:5000" edit page 
		Then "Playlist description required" should be displayed

	Scenario: Creating a Playlist with Empty Section
		Given User creates a playlist with "name as One level Playlist and description as Testing One level Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Section id required" should be displayed

	Scenario: Creating a Playlist with required fields for One level Deep Purpose
		Given User creates a playlist with "name as One level Playlist and section_id as one-level-section and description as Testing One level Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "One level Playlist for name and Testing One level Playlist for description" should be in the response

	Scenario: Disabling the Playlist
		Given User disables a playlist "One level Playlist" of "testing.sharedemos.com:5000" edit page 
		Then "One level Playlist for name and Testing One level Playlist for description" should be in the response	

	Scenario: Enabling the Playlist
		Given User enables a playlist "One level Playlist" of "testing.sharedemos.com:5000" edit page 
		Then "One level Playlist for name and Testing One level Playlist for description" should be in the response	

	Scenario: Creating a WalkThrough with required fields for General Purpose
		Given User creates walkthrough with "name as One Level WalkThrough" with the playlist "One level Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "One Level WalkThrough for name" should be in the Draft data

	Scenario: Creating a Image Resource for One Level walkthrough
		Given User creates resource with "name as One Level Image and is_new as true and external as false and walkthrough as one-level-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
		Then "One Level WalkThrough for name and image for resource_type" should be in the Draft data

	Scenario: Getting a WalkThrough without Publishing
		Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "SectionResourceImage Internal for name" should not be in the Published data
		And "One Level WalkThrough for name and image for type" should be in the Draft data of "One Level WalkThrough" walkthrough

	 Scenario: Publishing the Work of Image Resource Slide 
        Then User publishes walkthrough "One Level WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "One Level WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level WalkThrough for name and image for type" should be in the Published data

    Scenario: Creating a Video Resource for walkthrough
        Given User creates resource with "name as One Level Video and is_new as true and external as false and walkthrough as one-level-walkthrough and resource as video_song.mp4 and slide_order as 2 and type as video and path as None" to "testing.sharedemos.com:5000" edit page
        Then "One Level WalkThrough for name and video for resource_type" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then " One Level Video for name" should not be in the Published data
        And "One Level WalkThrough for name and video for type" should be in the Draft data of "One Level WalkThrough" walkthrough

    Scenario: Publishing the Work of Video Resource Slide
        Then User publishes walkthrough "One Level WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "One Level WalkThrough for name and video for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level WalkThrough for name and video for type" should be in the Published data

    Scenario: Creating a HotSpot for walkthrough
        Given User creates a hotspot with "slide_order as 1 and hotspot_type as goto and slide_number as next and text as One Level HotSpot and my as Bottom Center and at as top center and color as rgb(0,0,0) and width as 10% and top as 10% and left as 10% and height as 10% and event as create" to walkthrough "One Level WalkThrough" of "testing.sharedemos.com:5000" edit page
        Then "One Level HotSpot for text" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level HotSpot for text" should not be in the Published data
        And "One Level HotSpot for text" should be in the Draft data of "One Level WalkThrough" walkthrough

    Scenario: Publishing the Work of Creating Hotspot
        Then User publishes walkthrough "One Level WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "One Level HotSpot for text" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level HotSpot for text" should be in the Published data

    Scenario: Creating a Pin for walkthrough
        Given User creates a pin with "type as pin and event as create" with position "top as 20% and left as 20%" with frame_number as "None" to slide "1" of walkthrough "One Level WalkThrough" of "testing.sharedemos.com:5000" edit page
        Then "20% for left and 20% for top" should be in the Draft data

    Scenario: Creating a Pin Title for walkthrough
        Given User gives data for pin with "entity_id as 2 and type as pin and event as pin-title and value as One Level Pin" to slide "1" of walkthrough "One Level WalkThrough" of "testing.sharedemos.com:5000" edit page
        Then "One Level Pin for title" should be in the Draft data

    Scenario: Creating a Pin Body for walkthrough
        Given User gives data for pin with "entity_id as 2 and type as pin and event as pin-body and value as Testing One Level Pin" to slide "1" of walkthrough "One Level WalkThrough" of "testing.sharedemos.com:5000" edit page
        Then "Testing One Level Pin for body" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level Pin for title and Testing One Level Pin for body" should not be in the Published data
        And "One Level Pin for title and Testing One Level Pin for body" should be in the Draft data of "One Level WalkThrough" walkthrough

    Scenario: Publishing the Work of Creating Pin
        Then User publishes walkthrough "One Level WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "One Level Pin for title and Testing One Level Pin for body" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "One Level WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "One Level Pin for title and Testing One Level Pin for body" should be in the Published data