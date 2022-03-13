@one_level_deep_demo
Feature: Selelium testing of One level deep demo

Scenario:Creating a main product
	Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
	And user creates a section "One-level-deep-section" with "Testing one level deep demo" as description

Scenario:Successful playlist creation
	Given user selects "One-level-deep-section"
	And "layout" popup box appears
	And user selects "Playlist" layout
	And user enters "Playlist01" as "playlist name"
	And user enters "First playlist" as "playlist description"
	When user clicks on "save"
	Then "Playlist01" playlist is added 

Scenario:Creating a playlist with empty fields to check error messages
	Given "layout" popup box appears
	And user selects "Playlist" layout
	When user clicks on "save"
	Then "Provide a title" should be displayed as error message
	And "Provide a description" should be displayed as "error message"

Scenario:Creating a playlist with empty name field to check error message
	Given user enters "First playlist" as "playlist description"
	When user clicks on "save"
	Then "Provide a title" should be displayed as error message

Scenario:Creating a playlist with empty description field to check error message
	Given user enters "Playlist01" as "playlist name"
	And user enters nothing in "playlist description"
	When user clicks on "save"
	Then "Provide a description" should be displayed as "error message"
	And user clicks the "cancel" button

Scenario:Another successful playlist creation
	Given "layout" popup box appears
	And user selects "Playlist" layout
	And user enters "Playlist02" as "playlist name"
	And user enters "Second playlist" as "playlist description"
	When user clicks on "save"
	Then "Playlist02" playlist is added 

Scenario:Adding another playlist for deleting
	Given "layout" popup box appears
	And user selects "Playlist" layout
	And user enters "Playlist03" as "playlist name"
	And user enters "Third playlist" as "playlist description"
	When user clicks on "save"
	Then "Playlist03" playlist is added 

Scenario:Editing the playlist 
	Given user clicks on edit option of playlist "Playlist03"
	And user clicks on "edit" icon of playlist "Playlist03"
	And user enters "Delete Playlist" as "playlist name"
	And user enters "Playlist to test delete" as "playlist description"
	When user clicks on "save"
	Then playlist name is updated to "Delete Playlist"
	And playlist description is updated to "Playlist to test delete"


Scenario:Disabling playlist and checking that the disabled playlist is not visible in the live mode
	Given user clicks on edit option of playlist "Playlist02"
	And user clicks on "enable" icon of playlist "Playlist02"
	When user "disable"s the "playlist"
	Then "Playlist02" playlist is disabled
	And user switches to live mode from "edit" mode
	And playlist "Playlist02" is not visible in the live mode


Scenario:Enabling the disabled playlist and checking that the playlist is visible in the live mode
	Given user switches to edit mode from "live" mode
	And user clicks on edit option of playlist "Playlist02"
	And user clicks on "enable" icon of playlist "Playlist02"
	When user "enable"s the "playlist"
	Then "Playlist02" playlist is enabled
	And user switches to live mode from "edit" mode
	And playlist "Playlist02" is visible in the live mode

Scenario:Deleting the playlist
	Given user switches to edit mode from "live" mode
	And user clicks on edit option of playlist "Delete Playlist"
	And user clicks on "delete" icon of playlist "Delete Playlist"
	When user "delete"s the "playlist"
	Then playlist "Delete Playlist" is deleted

Scenario:Successful Demo creation
	Given "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist01" playlist
	And user enters "One-level-deep-demo" as "demo title"
	When user clicks on "save"
	Then "One-level-deep-demo" is added as demo

Scenario:Demo creation with empty title field
	Given "layout" popup box appears
	And user selects "Demo" layout
	When user clicks on "save"
	Then "Provide a title for demo" should be displayed as "error message"

Scenario:Demo creation by entering maximum characters for demo name
	Given user selects "Playlist01" playlist
	And user enters "12345678912345678912345678912345678912345678912345" as "demo title"
	When user clicks on "save"
	Then "12345678912345678912345678912345678912345678912345" is added as demo
 
Scenario:Hiding/Disabling a Demo in edit mode and checking in live mode before publishing the demo
	Given user "disable"s the demo "One-level-deep-demo"
	Then "One-level-deep-demo" demo is disabled in edit mode
	And user switches to live mode from "edit" mode
	And "One-level-deep-demo" demo is not present in live mode

Scenario:Unhiding/Enabling a Demo in edit mode and checking in live mode before publishing the demo
	Given user switches to edit mode from "live" mode
	And user "enable"s the demo "One-level-deep-demo"
	Then "One-level-deep-demo" demo is enabled in edit mode
	And user switches to live mode from "edit" mode
	And "One-level-deep-demo" demo is not present in live mode
 
Scenario:Uploading an image in slide
	Given user switches to edit mode from "live" mode
	And user selects "One-level-deep-demo" demo
	And user clicks on plus button to create a new slide
	And user selects "add_image" icon
	When user uploads an image "cat.jpeg"
	Then image is uploaded in slide "1" of "edit" mode
 
Scenario:Publishing the demo
    Given user publishes the demo
    Then user switches to live mode from "edit" mode
    And "One-level-deep-demo" demo is present in live mode

Scenario:Hiding/Disabling a Demo in edit mode and checking in live mode after publishing the demo
	Given user switches to edit mode from "live" mode
	And user "disable"s the demo "One-level-deep-demo"
	Then "One-level-deep-demo" demo is disabled in edit mode
	And user switches to live mode from "edit" mode
	And "One-level-deep-demo" demo is not present in live mode

Scenario:Unhiding/Enabling a Demo in edit mode and checking in live mode after publishing the demo
	Given user switches to edit mode from "live" mode
	And user "enable"s the demo "One-level-deep-demo"
	Then "One-level-deep-demo" demo is enabled in edit mode
	And user switches to live mode from "edit" mode
	And "One-level-deep-demo" demo is present in live mode

Scenario:Creating another demo to test repositioning of demo
	Given user switches to edit mode from "live" mode
	And "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist01" playlist
	And user enters "Second-one-level-deep-demo" as "demo title"
	When user clicks on "save"
	Then "Second-one-level-deep-demo" is added as demo

Scenario:Creating another demo to test deleting of demo
	Given "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist02" playlist
	And user enters "Delete-one-level-deep-demo" as "demo title"
	When user clicks on "save"
	Then "Delete-one-level-deep-demo" is added as demo

Scenario:Rearranging/Changing position of a demo within same playlist
	Given user rearranges the position of "One-level-deep-demo" with "Second-one-level-deep-demo"
	Then "One-level-deep-demo" position is changed 

Scenario:Rearranging/Changing position of a demo outside the playlist
	Given user rearranges the position of "One-level-deep-demo" with "Delete-one-level-deep-demo" 
	Then "One-level-deep-demo" position is changed

Scenario:Deleting a demo
	Given user "delete"s the demo "Delete-one-level-deep-demo"
	Then "Delete-one-level-deep-demo" demo is deleted

Scenario:Upload image in slide and checking in edit mode, preview mode and live mode
    Given user selects "One-level-deep-demo" demo
    And user clicks on plus button to create a new slide
    And user selects "add_image" icon
    When user uploads an image "flower2.jpg"
    Then image is uploaded in slide "2" of "edit" mode
    And user switches to preview mode from "edit" mode
    And image is uploaded in slide "2" of "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
   	And user loads the live demo "one-level-deep-section/one-level-deep-demo/2"
    Then image is uploaded in slide "2" of "live" mode

Scenario:Editing the name of a demo
	Given user switches to edit mode from "live" mode 
	when user edits the name of a demo to "Edit-One-level-deep-demo"
	Then demo name is changed to "Edit-One-level-deep-demo" inside the player
	And demo name is changed to "Edit-One-level-deep-demo" outside of player
