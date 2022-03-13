@login_required
@multi_lingual
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a Main Section of Differnet Language
		 Creating a Sub Section of Differnet Language
		 Creating a Walkthorugh of Differnet Language

	Scenario: Adding a Main Section with required fields for Multilingual purpose
		Given User posts data as "name as English Section and description as English Section Description and show as True and private as False" to "testing.sharedemos.com:5000" edit page
		Then "English Section for name and English Section Description for description" should be in the response 

	Scenario: Adding a Sub Section with required fields for Multilingual purpose
        Given User posts data as "name as English Sub Section and description as English Sub Section Description and show as True and private as False and parent as english-section" to "testing.sharedemos.com:5000" edit page
        Then "English Sub Section for name and English Sub Section Description for description" should be in the response 

    Scenario: Creating a Playlist with required fields for Multilingual Purpose
		Given User creates a playlist with "name as English Playlist and section_id as english-sub-section and description as Testing English Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "English Playlist for name and Testing English Playlist for description" should be in the response

    Scenario: Creating a WalkThrough with required fields for Multilingual Purpose
        Given User creates walkthrough with "name as English WalkThrough" with the playlist "English Playlist" to "testing.sharedemos.com:5000" edit page 
        Then "English WalkThrough for name" should be in the Draft data

    Scenario: Creating a Image Resource for English walkthrough
		Given User creates resource with "name as English Image and is_new as true and external as false and walkthrough as english-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
		Then "English WalkThrough for name and image for resource_type" should be in the Draft data

	Scenario: Getting a WalkThrough without Publishing
		Given User gets "English WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "SectionResourceImage Internal for name" should not be in the Published data
		And "English WalkThrough for name and image for type" should be in the Draft data of "English WalkThrough" walkthrough

	Scenario: Getting Main Section and its Sub Section from the slug 
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "English Section for name and English Section Description for description and English Sub Section for name and English Sub Section Description for description" should be in the response

	@changing_language_to_chinese
    Scenario: Changing the Language ID and altering the newly created Section 
        Given User alters a section with the slug "English Section" for the language "Chinese" related to "testing.sharedemos.com:5000" domain with the alteration "name as Chinese Section and description as Chinese Section Description and show as True and private as False" 
        Then "Chinese Section for name and Chinese Section Description for description" should be in the response 

    @changing_language_to_chinese
    Scenario: Changing the Language ID and altering the newly created Sub Section 
        Given User alters a section with the slug "English Sub Section" for the language "Chinese" related to "testing.sharedemos.com:5000" domain with the alteration "name as Chinese Sub Section and description as Chinese Sub Section Description and show as True and private as False" 
        Then "Chinese Sub Section for name and Chinese Sub Section Description for description" should be in the response

    @changing_language_to_chinese
    Scenario: Changing the Language ID and altering the newly created Sub Section 
        Given User alters the name and description of playlist "English Playlist" with "name as Chinese Playlist and description as Testing Chinese Playlist and section_id as english-sub-section" to "testing.sharedemos.com:5000" edit page
		Then "Chinese Playlist for name" should be in the response	

    @changing_language_to_chinese
	Scenario: Changing the Language ID and altering the newly created Walkthrough
		Given User alters the name of walkthrough "English WalkThrough" with "name as Chinese WalkThrough and section as english-sub-section" to "testing.sharedemos.com:5000" edit page
		Then "Chinese WalkThrough for name" should be in the Draft data

	@changing_language_to_chinese
	Scenario: Getting Main Section and its Sub Section from the slug 
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "Chinese Section for name and Chinese Section Description for description and Chinese Sub Section for name and Chinese Sub Section Description for description" should be in the response

	@changing_language_to_chinese
	Scenario: Getting a WalkThrough in the Draft Mode
		Given User gets "English WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "Chinese WalkThrough for name" should not be in the Published data
		And "Chinese WalkThrough for name" should be in the Draft data of "English WalkThrough" walkthrough

    Scenario: Publishing the Work of Image Resource Slide and Walkthrough 
        Then User publishes walkthrough "English WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "English WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "English WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "English WalkThrough for name and image for type" should be in the Published data

	Scenario: Getting Main Section and its Sub Section from the slug 
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "English Section for name and English Section Description for description and English Sub Section for name and English Sub Section Description for description" should be in the response

	Scenario: Getting a WalkThrough in Live Mode
		Given User gets "English WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "English WalkThrough for name" should be in the Published data

	@changing_language_to_chinese
	Scenario: Getting a specific Main Section and Sub Section from the slug
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "Chinese Section for name and Chinese Section Description for description and Chinese Sub Section for name and Chinese Sub Section Description for description" should be in the response

	@changing_language_to_chinese
	Scenario: Getting a WalkThrough in Live mode
		Given User gets "English WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "Chinese WalkThrough for name" should be in the Published data

	@default_language_as_chinese
	Scenario: Getting a specific Main Section and Sub Section from the slug 
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "Chinese Section for name and Chinese Section Description for description and Chinese Sub Section for name and Chinese Sub Section Description for description" should be in the response

	@browser_language_priorities_with_german_first_and_chinese_as_second
	Scenario: Getting a specific Main Section and Sub Section from the slug 
		Given User wants to get a section with the slug "English Section" related to "testing.sharedemos.com:5000" domain
		Then "Chinese Section for name and Chinese Section Description for description and Chinese Sub Section for name and Chinese Sub Section Description for description" should be in the response