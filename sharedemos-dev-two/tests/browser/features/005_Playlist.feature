@playlist
Feature: Selenium testing of Playlist

@demo
@slides
Scenario:Successful playlist creation
	Given user selects "Sub-Section"
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

@demo
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
	