@text_slide
Feature: Sharedemos Selenium Testing of Text Editor Slide Functionality

	Scenario:Section, Sub Section and Demo Creation
		Given "admin" user successfully logs in with "abc@xyz.com" as email and "xyz" as password
		Given user creates a section "Text Slide Main Section" with "Text Slide Main Section description" as description
        And user creates a subsection "Text Slide Sub Section" under "Text Slide Main Section" with "Text Slide Sub Section description" as description
        And user creates a playlist "Text Slide Playlist" under "Text Slide Sub Section" with "Text Slide playlist description" as description
        And user creates a demo "Text-Slide-Demo" under "Text Slide Playlist"

	Scenario:Adding a Text Slide to the Demo
		Given user selects "Text-Slide-Demo" demo
		And user clicks on plus button to create a new slide
		And user selects "add_text" icon
		Then user clears title and body of the editor
		And user clicks on "File" icon to add "file" in editor
		And user uploads an "file" in editor with file "sunset.jpg"
		And user clicks on "Video" icon to add "video" in editor
		And user enters "https://www.youtube.com/watch?v=0OoVtj-NA-o" as url input in editor
		And user clicks on Insert to insert "video"
		And user clicks on "Link" icon to add "image" in editor
		And inserts a link with url "google.com" and text as "Google" with "open in new tab" option in editor
		And user clicks on Insert to insert "link"
		And user clicks on "Image" icon to add "image" in editor
		And user uploads an "image" in editor with file "sunset.jpg"
		And user clicks on Done
		And "Image" is displayed in the text slide in "edit" mode
		And "Video" is displayed in the text slide in "edit" mode
		And Link with the url "http://google.com" and name "Google" is displayed in the slide in "edit" mode
		And File with the name "sunset.jpg" is displayed in the slide in "edit" mode
		And "Testing Footer" is displayed as text in the text slide footer in "edit" mode

	Scenario:Verfying the Slide in Preview Mode
		Then user switches to preview mode from "edit" mode
		And "Image" is displayed in the text slide in "preview" mode
		And "Video" is displayed in the text slide in "preview" mode
		And Link with the url "http://google.com" and name "Google" is displayed in the slide in "preview" mode
		And File with the name "sunset.jpg" is displayed in the slide in "preview" mode
		And "Testing Footer" is displayed as text in the text slide footer in "preview" mode

	Scenario:Verfying the Slide in Live Mode
		Then user switches to edit mode from "preview" mode
	    And user publishes the work done
	    And user switches to live mode from "edit" mode
		And "Image" is displayed in the text slide in "live" mode
		And "Video" is displayed in the text slide in "live" mode
		And Link with the url "http://google.com" and name "Google" is displayed in the slide in "live" mode
		And File with the name "sunset.jpg" is displayed in the slide in "live" mode
		And "Testing Footer" is displayed as text in the text slide footer in "live" mode
