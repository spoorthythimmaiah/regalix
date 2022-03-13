@login_required
@authoring
Feature: As a Tester I want to See 
		 User actions like 
		 Creating a Playlist
		 Editing a Playlist
		 Renaming the playlist
		 Enabling and Disabling the playlist

	Scenario: Creating a Playlist with Empty Name
		Given User creates a playlist with "section_id as sub-section and description as Testing First Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Playlist name required" should be displayed

	Scenario: Creating a Playlist with Empty Description
		Given User creates a playlist with "name as First Playlist and section_id as sub-section" to "testing.sharedemos.com:5000" edit page 
		Then "Playlist description required" should be displayed

	Scenario: Creating a Playlist with Empty Section
		Given User creates a playlist with "name as First Playlist and description as Testing First Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Section id required" should be displayed

	Scenario: Creating a Playlist with required fields for General Purpose
		Given User creates a playlist with "name as Normal First Playlist and section_id as sub-section and description as Testing Normal Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Normal First Playlist for name and Testing Normal Playlist for description" should be in the response

	Scenario: Creating a Playlist with required fields for Deleting Purpose
		Given User creates a playlist with "name as Delete Playlist and section_id as sub-section and description as Testing Delete Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "Delete Playlist for name and Testing Delete Playlist for description" should be in the response	

	Scenario: Editing the Playlist
		Given User edits a playlist "Normal First Playlist" with data "name as First Playlist and section_id as sub-section and description as Testing First Playlist" to "testing.sharedemos.com:5000" edit page 
		Then "First Playlist for name and Testing First Playlist for description" should be in the response	

	Scenario: Disabling the Playlist
		Given User disables a playlist "First Playlist" of "testing.sharedemos.com:5000" edit page 
		Then "First Playlist for name and Testing First Playlist for description" should be in the response	

	Scenario: Enabling the Playlist
		Given User enables a playlist "First Playlist" of "testing.sharedemos.com:5000" edit page 
		Then "First Playlist for name and Testing First Playlist for description" should be in the response	

	Scenario: Deleting the Playlist
		Given User deletes a playlist "Delete Playlist" of "testing.sharedemos.com:5000" edit page 
		Then "Delete Playlist for name and Testing Delete Playlist for description" should be in the response	