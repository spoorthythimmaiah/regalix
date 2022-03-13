@imageWithAudio_html_360
@login_required
Feature:testing Adding audio to image slide

Scenario: Creating a main section 
    Given User posts data as "name as ImageAudio HTML 360 section and description as Testing audio with image, html iframe slide & 360 degree view and show as True and private as False" to "testing.sharedemos.com:5000" edit page
    Then "ImageAudio HTML 360 section for name and Testing audio with image, html iframe slide & 360 degree view for description" should be in the response

Scenario: Creating a Playlist 
	Given User creates a playlist with "name as ImageAudio HTML 360 playlist and section_id as imageaudio-html-360-section and description as Testing audio with image, html iframe slide & 360 degree view playlist" to "testing.sharedemos.com:5000" edit page 
	Then "ImageAudio HTML 360 playlist for name and Testing audio with image, html iframe slide & 360 degree view playlist for description" should be in the response

Scenario: Creating a WalkThrough 
	Given User creates walkthrough with "name as ImageAudio HTML 360 walkthrough" with the playlist "ImageAudio HTML 360 playlist" to "testing.sharedemos.com:5000" edit page 
	Then "ImageAudio HTML 360 walkthrough for name" should be in the Draft data

Scenario: Creating an Internal Image Resource for ImageAudio HTML 360 walkthrough
	Given User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
	Then "ImageAudio HTML 360 walkthrough for name and image for resource_type" should be in the Draft data

Scenario: Adding audio file to image slide
	Given User creates resource with "name as SectionResourceAudio and is_new as False and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as ringtone.mp3 and slide_order as 1 and type as audio and path as None" to "testing.sharedemos.com:5000" edit page
	Then "ImageAudio HTML 360 walkthrough" for name and "audio" for resource_type should be in the Draft data as secondary resource

Scenario: Getting a WalkThrough before Publishing the work of image with audio slide
	Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
	Then "SectionResourceImage Internal for name and SectionResourceAudio for name" should not be in the Published data
	And "ImageAudio HTML 360 walkthrough for name and image for type and audio for type" should be in the Draft data of "ImageAudio HTML 360 walkthrough" walkthrough

Scenario: Publishing the Work of image with audio slide
    Then User publishes walkthrough "ImageAudio HTML 360 walkthrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    And "ImageAudio HTML 360 walkthrough for name and image for type and audio for type" should be in the Published data

Scenario: Getting a WalkThrough after Publising
    Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "ImageAudio HTML 360 walkthrough for name and image for type and audio for type" should be in the Published data

Scenario: Creating iframe Resource for Html iframe walkthrough
	Given User creates resource with "name as SectionResourceIframe and is_new as true and external as true and walkthrough as imageaudio-html-360-walkthrough and resource as None and slide_order as 2 and type as iframe and path as https://www.sharedemos.com/" to "testing.sharedemos.com:5000" edit page 
	Then "ImageAudio HTML 360 walkthrough for name and iframe for resource_type and https://www.sharedemos.com/ for path" should be in the Draft data

Scenario: Getting a WalkThrough before publishing the work of html iframe slide
	Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
	Then "SectionResourceIframe for name" should not be in the Published data
	And "ImageAudio HTML 360 walkthrough for name and iframe for type" should be in the Draft data of "ImageAudio HTML 360 walkthrough" walkthrough

Scenario: Publishing the Work of Html iframe slide
    Then User publishes walkthrough "ImageAudio HTML 360 walkthrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    And "ImageAudio HTML 360 walkthrough for name and iframe for type" should be in the Published data

Scenario: Getting a WalkThrough after Publising the work of html iframe slide
    Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "ImageAudio HTML 360 walkthrough for name and iframe for type" should be in the Published data

Scenario:Intiating event for adding resource to 360 degree view slide
	Given User creates resource with "name as Resource360Image and is_new as true and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as None and slide_order as 3 and type as 360 and path as None" with action_event as "initiate" to "testing.sharedemos.com:5000"
	Then new folder path is returned
	And User creates resource with "name as Resource360Image and is_new as true and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as 360home-01.png and slide_order as 3 and type as 360 and path as None" with action_event as "save_frame" and frame_number as "1" to "testing.sharedemos.com:5000"
	
	And User creates resource with "name as Resource360Image and is_new as true and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as 360home-02.png and slide_order as 3 and type as 360 and path as None" with action_event as "save_frame" and frame_number as "2" to "testing.sharedemos.com:5000"
	
	And User creates resource with "name as Resource360Image and is_new as true and external as false and walkthrough as imageaudio-html-360-walkthrough and resource as 360home-03.png and slide_order as 3 and type as 360 and path as None" with action_event as "save_frame" and frame_number as "3" to "testing.sharedemos.com:5000"

Scenario: Getting a WalkThrough before publishing the work of 360 degree view slide
	Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
	Then "Resource360Image for name and 360 for type" should not be in the Published data
	And "ImageAudio HTML 360 walkthrough for name and 360 for type" should be in the Draft data of "ImageAudio HTML 360 walkthrough" walkthrough

Scenario: Publishing the Work of 360 degree view slide
    Then User publishes walkthrough "ImageAudio HTML 360 walkthrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    And "ImageAudio HTML 360 walkthrough for name and 360 for type" should be in the Published data

Scenario: Getting a WalkThrough after Publising the work of 360 degree view slide
    Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "ImageAudio HTML 360 walkthrough for name and 360 for type" should be in the Published data

Scenario: Creating a Pin for walkthrough
    Given User creates a pin with "type as pin and event as create" with position "top as 30% and left as 30%" with frame_number as "2" to slide "3" of walkthrough "ImageAudio HTML 360 walkthrough" of "testing.sharedemos.com:5000" edit page
    Then "30% for left and 30% for top" should be in the Draft data

Scenario: Creating a Pin Title for walkthrough
    Given User gives data for pin with "entity_id as 3 and type as pin and event as pin-title and value as 360 frame pin heading" to slide "3" of walkthrough "ImageAudio HTML 360 walkthrough" of "testing.sharedemos.com:5000" edit page
    Then "360 frame pin heading for title" should be in the Draft data

Scenario: Creating a Pin Body for walkthrough
    Given User gives data for pin with "entity_id as 3 and type as pin and event as pin-body and value as 360 frame pin body" to slide "3" of walkthrough "ImageAudio HTML 360 walkthrough" of "testing.sharedemos.com:5000" edit page
    Then "360 frame pin body for body" should be in the Draft data

Scenario: Getting a WalkThrough without Publishing the work of adding pin hotspot to 360 frame
    Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "360 frame pin heading for title and 360 frame pin body for body" should not be in the Published data
    And "360 frame pin heading for title and 360 frame pin body for body" should be in the Draft data of "ImageAudio HTML 360 walkthrough" walkthrough

Scenario: Publishing the Work of adding pin hotspot to 360 frame
    Then User publishes walkthrough "ImageAudio HTML 360 walkthrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    And "360 frame pin heading for title and 360 frame pin body for body" should be in the Published data

Scenario: Getting a WalkThrough after Publising
    Given User gets "ImageAudio HTML 360 walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "360 frame pin heading for title and 360 frame pin body for body" should be in the Published data
