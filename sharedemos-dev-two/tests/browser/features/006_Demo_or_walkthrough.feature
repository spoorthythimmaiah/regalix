@demo
Feature: Selenium testing of Demo or walkthrough

Scenario:Successful Demo creation
	Given "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist01" playlist
	And user enters "Demo-Section" as "demo title"
	When user clicks on "save"
	Then "Demo-Section" is added as demo

Scenario:Demo creation with empty title field
	Given "layout" popup box appears
	And user selects "Demo" layout
	When user clicks on "save"
	Then "Provide a title for demo" should be displayed as "error message"

Scenario:Demo creation by entering maximum characters for demo name
	Given user selects "Playlist02" playlist
	And user enters "01234567890123456789012345678901234567890123456789" as "demo title"
	When user clicks on "save"
	Then "01234567890123456789012345678901234567890123456789" is added as demo

Scenario:Hiding/Disabling a Demo in edit mode and checking in live mode before publishing the demo
	Given user "disable"s the demo "Demo-Section"
	Then "Demo-Section" demo is disabled in edit mode
	And user switches to live mode from "edit" mode
	And "Demo-Section" demo is not present in live mode

Scenario:Unhiding/Enabling a Demo in edit mode and checking in live mode before publishing the demo
	Given user switches to edit mode from "live" mode
	And user "enable"s the demo "Demo-Section"
	Then "Demo-Section" demo is enabled in edit mode
	And user switches to live mode from "edit" mode
	And "Demo-Section" demo is not present in live mode

Scenario:Uploading an image in slide
	Given user switches to edit mode from "live" mode
	And user selects "Demo-Section" demo
	And user clicks on plus button to create a new slide
	And user selects "add_image" icon
	When user uploads an image "sunset.jpg"
	Then image is uploaded in slide "1" of "edit" mode
 
Scenario:Publishing the demo
    Given user publishes the demo
    Then user switches to live mode from "edit" mode
    And "Demo-Section" demo is present in live mode

Scenario:Hiding/Disabling a Demo in edit mode and checking in live mode after publishing the demo
	Given user switches to edit mode from "live" mode
	And user "disable"s the demo "Demo-Section"
	Then "Demo-Section" demo is disabled in edit mode
	And user switches to live mode from "edit" mode
	And "Demo-Section" demo is not present in live mode

Scenario:Unhiding/Enabling a Demo in edit mode and checking in live mode after publishing the demo
	Given user switches to edit mode from "live" mode
	And user "enable"s the demo "Demo-Section"
	Then "Demo-Section" demo is enabled in edit mode
	And user switches to live mode from "edit" mode
	And "Demo-Section" demo is present in live mode


Scenario:Creating another demo to test repositioning of demo
	Given user switches to edit mode from "live" mode
	And "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist01" playlist
	And user enters "Second-Demo" as "demo title"
	When user clicks on "save"
	Then "Second-Demo" is added as demo

@slides
Scenario:Creating another demo to test slides
	Given "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist01" playlist
	And user enters "Slide-Demo" as "demo title"
	When user clicks on "save"
	Then "Slide-Demo" is added as demo

Scenario:Creating another demo to test deleting of demo
	Given "layout" popup box appears
	And user selects "Demo" layout
	And user selects "Playlist02" playlist
	And user enters "Delete-Demo" as "demo title"
	When user clicks on "save"
	Then "Delete-Demo" is added as demo

Scenario:Rearranging/Changing position of a demo within same playlist
	Given user rearranges the position of "Demo-Section" with "Second-Demo" 
	Then "Demo-Section" position is changed

Scenario:Rearranging/Changing position of a demo outside the playlist
	Given user rearranges the position of "Demo-Section" with "Delete-Demo" 
	Then "Demo-Section" position is changed

Scenario:Deleting a demo
	Given user "delete"s the demo "Delete-Demo"
	Then "Delete-Demo" demo is deleted

Scenario:Editing the name of a demo
	Given user selects "Demo-Section" demo
	when user edits the name of a demo to "Edit-Demo-Section"
	Then demo name is changed to "Edit-Demo-Section" inside the player
	And demo name is changed to "Edit-Demo-Section" outside of player