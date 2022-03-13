@login_required
@authoring
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a Walkthrough
		 Publishing a Walkthrough
		 Renaming a Walkthrough
		 Giving a Text to Walhthrough Slide
		 Creating a Image Resource for walkthrough
		 Creating a Video Resource for walkthrough
		 Creating a HotSpot for walkthrough
		 Deleting a slide of walkthrough

	Scenario: Creating a WalkThrough with required fields for General Purpose
		Given User creates walkthrough with "name as Main WalkThrough" with the playlist "First Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Main WalkThrough for name" should be in the Draft data

	Scenario: Creating a WalkThrough with required fields for Hiding and Deleting Purpose
		Given User creates walkthrough with "name as Hiding WalkThrough" with the playlist "First Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Hiding WalkThrough for name" should be in the Draft data 

	Scenario: Creating a Internal Image Resource for Main walkthrough
		Given User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as main-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
		Then "Main WalkThrough for name and image for resource_type" should be in the Draft data

	Scenario: Getting a WalkThrough without Publishing
		Given User gets "Main WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
		Then "SectionResourceImage Internal for name" should not be in the Published data
		And "Main WalkThrough for name and image for type" should be in the Draft data of "Main WalkThrough" walkthrough

	 Scenario: Publishing the Work of Image Resource Slide 
        Then User publishes walkthrough "Main WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Main WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough 
        Given User gets "Main WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough for name" should be in the Published data

    Scenario: Creating a Internal Image Resource for Hiding walkthrough
        Given User creates resource with "name as ResourceImage Internal and is_new as true and external as false and walkthrough as hiding-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
        Then "Hiding WalkThrough for name and image for resource_type" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Hiding WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "ResourceImage Internal for name" should not be in the Published data
        And "Hiding WalkThrough for name and image for type" should be in the Draft data of "Hiding WalkThrough" walkthrough

     Scenario: Publishing the Work of Image Resource Slide of Hiding Walkthrough 
        Then User publishes walkthrough "Hiding WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Hiding WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Hiding WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Hiding WalkThrough for name and image for type" should be in the Published data

    Scenario: Disabling a WalkThrough
        Given User disables the "Hiding WalkThrough" walkthrough with "is_enabled as False and id as hiding-walkthrough" in "testing.sharedemos.com:5000" edit page
        Given User gets "Hiding WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "status" should be displayed 

    Scenario: Enabling a WalkThrough
        Given User enables the "Hiding WalkThrough" walkthrough with "is_enabled as True and id as hiding-walkthrough" in "testing.sharedemos.com:5000" edit page
        Given User gets "Hiding WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Hiding WalkThrough for name" should be in the Published data 

    Scenario: Deleting a WalkThrough
        Given User deletes the "Hiding WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "DELETED for status" should be in the Published data

    Scenario: Getting a WalkThrough 
        Given User gets "Main WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough for name" should be in the Published data

    Scenario: Renaming a WalkThrough 
        Given User renames walkthrough "Main WalkThrough" with "name as Main WalkThrough Altered and section as sub-section" to "testing.sharedemos.com:5000" edit page
        Then "Main WalkThrough Altered for name" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name" should not be in the Published data
        And "Main WalkThrough Altered for name" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of Renaming
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Main WalkThrough Altered for name" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name" should be in the Published data

     Scenario: Giving text to WalkThrough slide
        Given User gives text walkthrough "Main WalkThrough Altered" with "text as Text Test and slide_order as 1  and type as body" to "testing.sharedemos.com:5000" edit page 
        Then "Text Test for text" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Text Test for text" should not be in the Published data
        And "Text Test for text" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of giving the text to slide
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Text Test for text" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Text Test for text" should be in the Published data

    Scenario: Creating a External Image Resource for walkthrough
		Given User creates resource with external url with "name as SectionResourceImage External and is_new as true and external as true and walkthrough as main-walkthrough-altered and resource as None and slide_order as 2 and type as image and path as http://www.icelandprocruises.com/media/img/gallery/home/0006-gallery-iceland-godafoss.jpg" to "testing.sharedemos.com:5000" edit page 
		Then "Main WalkThrough Altered for name and image for resource_type" should be in the Draft data

	Scenario: Getting a WalkThrough without Publishing
		Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
		Then "SectionResourceImage External for name" should not be in the Published data
		And "Main WalkThrough Altered for name and image for type" should be in the Draft data of "Main WalkThrough Altered" walkthrough

	 Scenario: Publishing the Work of Image Resource Slide 
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Main WalkThrough Altered for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name and image for type" should be in the Published data

    Scenario: Creating a Internal Video Resource for walkthrough with Uploading the Video
        Given User creates resource with "name as SectionResourceVideo Intenal and is_new as true and external as false and walkthrough as main-walkthrough-altered and resource as video_song.mp4 and slide_order as 3 and type as video and path as None" to "testing.sharedemos.com:5000" edit page
        Then "Main WalkThrough Altered for name and video for resource_type" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "SectionResourceVideo Internal for name" should not be in the Published data
        And "Main WalkThrough Altered for name and video for type" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of Video Resource Slide
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Main WalkThrough Altered for name and video for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name and video for type" should be in the Published data

    Scenario: Creating a External Video Resource for walkthrough with Uploading the Video
        Given User creates resource with "name as SectionResourceVideo External and is_new as true and external as true and walkthrough as main-walkthrough-altered and resource as None and slide_order as 4 and type as embed and path as https://www.youtube.com/watch?v=NkyEOrQiGMQ" to "testing.sharedemos.com:5000" edit page
        Then "Main WalkThrough Altered for name and embed for resource_type" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "SectionResourceVideo External for name" should not be in the Published data
        And "Main WalkThrough Altered for name and embed for type" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of Video Resource Slide
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Main WalkThrough Altered for name and embed for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name and embed for type" should be in the Published data

    Scenario: Creating a HotSpot for walkthrough
        Given User creates a hotspot with "slide_order as 1 and hotspot_type as goto and slide_number as next and text as A HotSpot and my as Bottom Center and at as top center and color as rgb(0,0,0) and width as 10% and top as 10% and left as 10% and height as 10% and event as create" to walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "A HotSpot for text" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "A HotSpot for text" should not be in the Published data
        And "A HotSpot for text" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of Creating Hotspot
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "A HotSpot for text" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "A HotSpot for text" should be in the Published data

    Scenario: Editing a HotSpot of walkthrough Link as Previous
        Given User edits a hotspot with "slide_order as 1 and hotspot_type as goto and slide_number as prev and text as A HotSpot and my as Bottom Center and at as top center and color as rgb(0,0,0) and width as 10% and top as 10% and left as 10% and height as 10% and event as create" to walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "prev for slide_number" should be in the Draft data

    Scenario: Editing a HotSpot of walkthrough Link as Goto Slide
        Given User edits a hotspot with "slide_order as 1 and hotspot_type as goto and slide_number as 2 and text as A HotSpot and my as Bottom Center and at as top center and color as rgb(0,0,0) and width as 10% and top as 10% and left as 10% and height as 10% and event as create" to walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "2 for slide_number" should be in the Draft data

    Scenario: Editing a HotSpot of walkthrough Link as External Link
        Given User edits a hotspot with "slide_order as 1 and hotspot_type as goto and href as http://www.google.com and text as A HotSpot and my as Bottom Center and at as top center and color as rgb(0,0,0) and width as 10% and top as 10% and left as 10% and height as 10% and event as create" to walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "http://www.google.com" should be displayed in Draft data

    Scenario: Creating a Pin for walkthrough
        Given User creates a pin with "type as pin and event as create" with position "top as 20% and left as 20%" with frame_number as "None" to slide "1" of walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "20% for left and 20% for top" should be in the Draft data

    Scenario: Creating a Pin Title for walkthrough
        Given User gives data for pin with "entity_id as 1 and type as pin and event as pin-title and value as A Pin" to slide "1" of walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "A Pin for title" should be in the Draft data

    Scenario: Creating a Pin Body for walkthrough
        Given User gives data for pin with "entity_id as 1 and type as pin and event as pin-body and value as Testing Pin" to slide "1" of walkthrough "Main WalkThrough Altered" of "testing.sharedemos.com:5000" edit page
        Then "Testing Pin for body" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "A Pin for title and Testing Pin for body" should not be in the Published data
        And "A Pin for title and Testing Pin for body" should be in the Draft data of "Main WalkThrough Altered" walkthrough

    Scenario: Publishing the Work of Creating Pin
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "A Pin for title and Testing Pin for body" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "A Pin for title and Testing Pin for body" should be in the Published data

    Scenario: Altering a Slide position from the slug 
        Given User wants to reoder a slide with the slug "Main WalkThrough Altered" realted to "testing.sharedemos.com:5000" domain with the alteration "after as 1 and reorder as slide and target as 3" 
        Then User publishes walkthrough "Main WalkThrough Altered" with "publish as True" to "testing.sharedemos.com:5000" edit page
        Then "Main WalkThrough Altered for name" should be in the Published data

    Scenario: Deleting a slide of walkthrough
        Given User deletes slide of walkthrough "Main WalkThrough Altered" with "delete_slide as 4" of "testing.sharedemos.com:5000" edit page
        Then "SectionResourceVideo for name" should not be in the Published data

    Scenario: Getting a WalkThrough 
        Given User gets "Main WalkThrough Altered" walkthrough of "testing.sharedemos.com:5000" page
        Then "Main WalkThrough Altered for name and A Pin for title and Testing Pin for body" should be in the Published data

    Scenario: Verfying CTA Form for Walkthrough
        Given User likes the Walkthrough and registers with "product as Main Section Altered and Name as Ashraf and Email as ashu@gmail.com and Company as Regalix and section as Main Section Altered and walkthrough as Main WalkThrough Altered" to "testing.sharedemos.com:5000" 
        Then "success for status" should be in the response
 
    Scenario: Creating a WalkThrough with required fields for Reordering Purpose
        Given User creates walkthrough with "name as Reorder WalkThrough" with the playlist "First Playlist" to "testing.sharedemos.com:5000" edit page 
        Then "Reorder WalkThrough for name" should be in the Draft data

    Scenario: Creating a Internal Image Resource for Reorder walkthrough
        Given User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as reorder-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
        Then "Reorder WalkThrough for name and image for resource_type" should be in the Draft data

    Scenario: Getting a WalkThrough without Publishing
        Given User gets "Reorder WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "SectionResourceImage Internal for name" should not be in the Published data
        And "Reorder WalkThrough for name and image for type" should be in the Draft data of "Reorder WalkThrough" walkthrough

     Scenario: Publishing the Work of Image Resource Slide of Reorder Walkthrough 
        Then User publishes walkthrough "Reorder WalkThrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
        And "Reorder WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Reorder WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Reorder WalkThrough for name and image for type" should be in the Published data

    Scenario: Getting a WalkThrough after Publising
        Given User gets "Reorder WalkThrough" walkthrough of "testing.sharedemos.com:5000" page
        Then "Reorder WalkThrough for name" should be in the Published data