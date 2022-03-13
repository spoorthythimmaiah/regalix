@slides
Feature: Selenium testing of library slides

Scenario:Upload image in slide and checking in edit and preview mode
    Given user selects "Slide-Demo" demo
    And user clicks on plus button to create a new slide
    And user selects "add_image" icon
    When user uploads an image "penguin_images.jpeg"
    Then image is uploaded in slide "1" of "edit" mode
    And user switches to preview mode from "edit" mode
    And image is uploaded in slide "1" of "preview" mode

Scenario: Adding image to the slide by an URL and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode                                                                           
    And user clicks on plus button to create a new slide                                                                  
    And user selects "add_image" icon                                                                                      
    And user selects URL option for "image" upload                                                                                            
    And user enters "http://www.indiaonrent.com/forwards/n/nature-beauty-amazing/res/5mavuy.jpg" as url input for "image"
    When user clicks on upload button for "image"                                                                                            
    Then image is uploaded in slide "2" of "edit" mode
    And user switches to preview mode from "edit" mode
    And image is uploaded in slide "2" of "preview" mode

Scenario:Upload video in a slide and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode 
    And user clicks on plus button to create a new slide
    And user selects "add_video" icon
    When user uploads a video "video1.mp4"
    Then video is uploaded in slide "3" of "edit" mode
    And user switches to preview mode from "edit" mode
    Then video is uploaded in slide "3" of "preview" mode

Scenario:Embed video in a slide and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode 
    And user clicks on plus button to create a new slide
    And user selects "add_video" icon
    And user selects URL option for "video" upload
    And user enters "https://www.youtube.com/watch?v=e569xmuPUjs" as url input for "embed"
    When user clicks on upload button for "embed"
    Then video is embedded in slide "4" of "edit" mode
    And user switches to preview mode from "edit" mode
    Then video is embedded in slide "4" of "preview" mode

Scenario:Uploading an audio file in a slide and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode
    And user clicks on plus button to create a new slide
    And user selects "add_audio" icon
    When user uploads an audio file "audio1.mp3"
    Then audio is "uploaded" in slide "5" of "edit" mode
    And user switches to preview mode from "edit" mode
    And audio is "uploaded" in slide "5" of "preview" mode

Scenario:Adding an audio file to a slide by an URL and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode
    And user clicks on plus button to create a new slide
    And user selects "add_audio" icon
    And user selects URL option for "audio" upload
    And user enters "http://www.noiseaddicts.com/samples_1w72b820/4929.mp3" as url input for "audio"
    When user clicks on upload button for "audio"
    Then audio is "embedded" in slide "6" of "edit" mode
    And user switches to preview mode from "edit" mode
    Then audio is "embedded" in slide "6" of "preview" mode

Scenario:Adding a link to a slide and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode
    And user clicks on plus button to create a new slide
    And user selects "add_link" icon
    And user enters "http://www.google.com" as url input for "link"
    When user clicks on upload button for "link"
    Then link is added to the slide "7" of "edit" mode
    And clicking on the Open Document in slide "7" of "edit" mode will open the link "http://www.google.com"
    And user switches to preview mode from "edit" mode
    And link is added to the slide "7" of "preview" mode
    And clicking on the Open Document in slide "7" of "preview" mode will open the link "http://www.google.com"

Scenario:Adding an image to a slide by uploading invalid file to check error message
    Given user clicks on plus button to create a new slide                                                                  
    And user selects "add_image" icon
    When user uploads an invalid file for image upload
    Then "Oops! Please upload a valid image file." error message should be displayed
 
Scenario:Adding an image to a slide by entering invalid URL to check error   message                                                                                     
    Given user selects URL option for "image" upload                                                                                            
    And user enters "https://www.google.com" as url input for "image"                                                  When user clicks on upload button for "image" 
    Then "Oops! Please enter a valid image URL." error message should be displayed

Scenario:Adding a video to a slide by uploading invalid file to check error message
    Given user clicks on close icon
    And user selects "add_video" icon
    When user uploads an invalid file for video
    Then "Oops! Please upload a valid video file." error message should be displayed

Scenario: Embedding a video in a slide by entering invalid URL to check error message
    Given user selects URL option for "video" upload
    And user enters "https://www.google.com" as url input for "embed"
    When user clicks on upload button for "embed"
    Then "Oops! Please enter a valid video URL." error message should be displayed

Scenario: Adding an audio to a slide by uploading invalid file type to check error message
    Given user clicks on close icon
    And user selects "add_audio" icon
    When user uploads an invalid file for audio
    Then "Oops! Please upload a valid audio file." error message should be displayed

Scenario: Adding an audio to a slide by entering invalid URL to check error message
    Given user selects URL option for "audio" upload
    And user enters "http://www.google.com" as url input for "audio"
    When user clicks on upload button for "audio"
    Then "Oops! Please enter a valid audio URL." error message should be displayed

Scenario:Adding a link to a slide by entering invalid link to check error message
    Given user clicks on close icon
    And user selects "add_link" icon
    And user enters "some invalid stuff" as url input for "link"
    When user clicks on upload button for "link"
    Then "Oops! Please enter a valid URL." error message should be displayed
    And user clicks on close icon
    And user closes the option for adding new slides

Scenario: Adding notes to a slide and checking in edit mode, preview mode and live mode
    Given user loads the slide "file-section/sub-section/slide-demo/1"
    And user clicks on "notes" icon in side-panel
    When user enters "English Penguin" as notes title
    And user enters "Testing English Penguin" as notes description
    Then "English Penguin" is added as notes title in "edit" mode
    And "Testing English Penguin" is added as notes description in "edit" mode
    And user clicks on "notes" icon in side-panel
    And user switches to preview mode from "edit" mode
    And user clicks on "notes" icon in side-panel
    And "English Penguin" is added as notes title in "preview" mode
    And "Testing English Penguin" is added as notes description in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user selects "Slide-Demo" demo
    And user switches to live mode from "edit" mode
    Then "English Penguin" is added as notes title in "live" mode
    And "Testing English Penguin" is added as notes description in "live" mode

Scenario: Adding a pin hotspot to a slide and checking in edit and preview mode
    Given user switches to edit mode from "live" mode
    When user clicks on pin hotspot icon
    And user clicks at the desired place on slide "1" to create a pin hotspot
    Then pin hotspot "1" is created in slide "1" in "edit" mode
    And user switches to preview mode from "edit" mode
    And pin hotspot "1" is created in slide "1" in "preview" mode

Scenario:Creating a highlight hotspot and checking in edit and preview mode
    Given user switches to edit mode from "preview" mode
    And user loads the slide "file-section/sub-section/slide-demo/2"
    When user clicks on highlight hotspot icon
    And user selects a portion on slide "2"
    And user clicks on "save"
    Then highlight hotspot "1" is created successfully in slide "2" in "edit" mode
    And user switches to preview mode from "edit" mode
    And highlight hotspot "1" is created successfully in slide "2" in "preview" mode

Scenario:Publishing the work and checking for all slides in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo"
    Then image is uploaded in slide "1" of "live" mode
    And user clicks on forward arrow
    And image is uploaded in slide "2" of "live" mode
    And user clicks on forward arrow
    And video is uploaded in slide "3" of "live" mode
    And user clicks on forward arrow
    And video is embedded in slide "4" of "live" mode
    And user clicks on forward arrow
    And audio is "uploaded" in slide "5" of "live" mode
    And user clicks on forward arrow
    And audio is "embedded" in slide "6" of "live" mode
    And user clicks on forward arrow
    And link is added to the slide "7" of "live" mode
    And clicking on the Open Document in slide "7" of "live" mode will open the link "http://www.google.com"

Scenario: Rearranging the slides and checking in edit and preview mode
    Given user is in authoring mode
    And user loads the slide "file-section/sub-section/slide-demo/1"
    And user clicks on up arrow mark
    When user rearranges the slide "2" with "3"
    Then slide "2" is exchanged with slide "3" in edit mode
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And slide "2" is exchanged with slide "3" in "preview" mode

Scenario:Publishing the changes and Checking that the slides are rearranged in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    Then slide "2" is exchanged with slide "3" in "live" mode

Scenario:Checking that pin hotspot is created in live mode
    Given user loads the live demo "file-section/sub-section/slide-demo/1"
    Then pin hotspot "1" is created in slide "1" in "live" mode

Scenario:Checking that highlight hotspot is created in live mode
    Given user loads the live demo "file-section/sub-section/slide-demo/3"
    Then highlight hotspot "1" is created successfully in slide "3" in "live" mode

Scenario: Adding title and description to a pin hotspot and checking in edit and preview mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/1"
    when user clicks on pin hotspot "1" in slide "1"
    And user enters "Penguins" as pin hotspot title
    And user enters "Something about penguins" as pin hotspot description
    And user clicks on pin hotspot "1" in slide "1" again
    And user clicks on pin hotspot "1" in slide "1"
    Then "Penguins" is added as pin hotspot title in "edit" mode
    And "Something about penguins" is added as pin hotspot description in "edit" mode
    And user switches to preview mode from "edit" mode
    And user clicks on pin hotspot "1" in slide "1"
    And "Penguins" is added as pin hotspot title in "preview" mode
    And "Something about penguins" is added as pin hotspot description in "preview" mode

Scenario:Publishing the changes and checking that the title and description are added to a pin hotspot in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/1"
    And user clicks on pin hotspot "1" in slide "1"
    Then "Penguins" is added as pin hotspot title in "live" mode
    And "Something about penguins" is added as pin hotspot description in "live" mode

Scenario: Changing the pin hotspot's tooltip position to right and checking in edit mode and preview mode 
    Given user switches to edit mode from "live" mode
    When user clicks on pin hotspot "1" in slide "1"
    And user selects "right" as pin hotspot's tooltip position
    Then pin hotspot's tooltip position is changed to "right" in "edit" mode
    And user switches to preview mode from "edit" mode
    And user clicks on pin hotspot "1" in slide "1"
    And pin hotspot's tooltip position is changed to "right" in "preview" mode
    
Scenario:Publishing the changes and checking that pin hotspot's tooltip position is at right in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/1"
    And user clicks on pin hotspot "1" in slide "1"
    Then pin hotspot's tooltip position is changed to "right" in "live" mode

Scenario: Changing the pin hotspot's tooltip position to left and checking in edit mode and preview mode 
    Given user switches to edit mode from "live" mode
    When user clicks on pin hotspot "1" in slide "1"
    And user selects "left" as pin hotspot's tooltip position
    Then pin hotspot's tooltip position is changed to "left" in "edit" mode
    And user switches to preview mode from "edit" mode
    And user clicks on pin hotspot "1" in slide "1"
    And pin hotspot's tooltip position is changed to "left" in "preview" mode

Scenario:Publishing the changes and checking that pin hotspot's tooltip position is at left in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/1"
    And user clicks on pin hotspot "1" in slide "1"
    Then pin hotspot's tooltip position is changed to "left" in "live" mode
    
Scenario: Changing the pin hotspot's tooltip position to top and checking in edit mode and preview mode 
    Given user switches to edit mode from "live" mode
    When user clicks on pin hotspot "1" in slide "1"
    And user selects "top" as pin hotspot's tooltip position
    Then pin hotspot's tooltip position is changed to "top" in "edit" mode
    And user switches to preview mode from "edit" mode
    And user clicks on pin hotspot "1" in slide "1"
    And pin hotspot's tooltip position is changed to "top" in "preview" mode

Scenario:Publishing the changes and checking that pin hotspot's tooltip position is at top in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/1"
    And user clicks on pin hotspot "1" in slide "1"
    Then pin hotspot's tooltip position is changed to "top" in "live" mode
    
Scenario: Changing the pin hotspot's tooltip position to bottom and checking in edit mode and preview mode 
    Given user switches to edit mode from "live" mode
    When user clicks on pin hotspot "1" in slide "1"
    And user selects "bottom" as pin hotspot's tooltip position
    Then pin hotspot's tooltip position is changed to "bottom" in "edit" mode
    And user switches to preview mode from "edit" mode
    And user clicks on pin hotspot "1" in slide "1"
    And pin hotspot's tooltip position is changed to "bottom" in "preview" mode

Scenario:Publishing the changes and checking that pin hotspot's tooltip position is at bottom in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/1"
    And user clicks on pin hotspot "1" in slide "1"
    Then pin hotspot's tooltip position is changed to "bottom" in "live" mode

Scenario:Repositioning the pin hotspot
    When user clicks on pin hotspot icon
    And drags the pin hotspot "1" in slide "1" to new position
    Then pin hotspot "1" position is changed in slide "1" in "edit" mode
    And user switches to preview mode from "edit" mode
    Then pin hotspot "1" position is changed in slide "1" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/1"
    Then pin hotspot "1" position is changed in slide "1" in "live" mode

Scenario:Repositioning the highlight hotspot
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user drags the highlight hotspot "1" in slide "3" to new position
    Then highlight hotspot "1" position is changed in slide "3" in "edit" mode
    And user switches to preview mode from "edit" mode
    Then highlight hotspot "1" position is changed in slide "3" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/3"
    Then highlight hotspot "1" position is changed in slide "3" in "live" mode

Scenario:Resizing the highlight hotspot
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user resizes the highlight hotspot "1" in slide "3"
    Then highlight hotspot "1" in slide "3" is resized in "edit" mode
    And user switches to preview mode from "edit" mode
    Then highlight hotspot "1" in slide "3" is resized in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/3"
    Then highlight hotspot "1" in slide "3" is resized in "live" mode

Scenario:Changing the highlight hotspot color
    Given user switches to edit mode from "live" mode
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user changes the highlight color to "rgb(204,12,67)"
    And user clicks on "save"
    Then highlight hotspot "1" in slide "3" color is changed to "rgb(204, 12, 67)" in "edit" mode
    And user switches to preview mode from "edit" mode 
    And highlight hotspot "1" in slide "3" color is changed to "rgb(204, 12, 67)" in "preview" mode

Scenario:Publishing the changes and checking that highlight hotspot color is changed in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    Then highlight hotspot "1" in slide "3" color is changed to "rgb(204, 12, 67)" in "live" mode
    
Scenario:Changing the highlight hotspot link to next slide and checking that clicking on the hotspot loads the next slide in edit mode and preview mode
    Given user switches to edit mode from "live" mode
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user selects "next" as highlight hotspot link
    And user clicks on "save"
    And user clicks on highlight hotspot "1" of slide "3"
    Then "next" slide is loaded in "edit" mode
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And user clicks on highlight hotspot "1" of slide "3"
    And "next" slide is loaded in "preview" mode

Scenario:Publishing the changes and checking that highlight hotspot link is set to next slide in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    And user clicks on highlight hotspot "1" of slide "3"
    Then "next" slide is loaded in "live" mode

Scenario:Changing the highlight hotspot link to previous slide and checking in edit mode and preview mode that clicking on the hotspot loads the previous slide
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user selects "previous" as highlight hotspot link
    And user clicks on "save"
    And user clicks on highlight hotspot "1" of slide "3"
    Then "previous" slide is loaded in "edit" mode
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And user clicks on highlight hotspot "1" of slide "3"
    And "previous" slide is loaded in "preview" mode

Scenario:Publishing the changes and checking that highlight hotspot link is set to previous slide in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    And user clicks on highlight hotspot "1" of slide "3"
    Then "previous" slide is loaded in "live" mode

Scenario:Changing the highlight hotspot link to a particular slide and checking in edit mode and preview mode that clicking on the hotspot loads the particular slide
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user selects "goto" as highlight hotspot link
    And user selects slide "5" from dropdown
    And user clicks on "save"
    And user clicks on highlight hotspot "1" of slide "3"
    Then slide "5" is loaded in "edit" mode
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And user clicks on highlight hotspot "1" of slide "3"
    And slide "5" is loaded in "preview" mode

Scenario:Publishing the changes and checking that highlight hotspot link is set to a particular slide in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    And user clicks on highlight hotspot "1" of slide "3"
    Then slide "5" is loaded in "live" mode

Scenario:Changing the highlight hotspot link to an external link and checking in edit mode and preview mode that clicking on the hotspot opens the external link
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user selects "External link" as highlight hotspot link
    And user enters "http://google.com" in external link
    And user clicks on "save"
    And user clicks on highlight hotspot "1" of slide "3" 
    Then external link "http://google.com" is opened 
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And user clicks on highlight hotspot "1" of slide "3"
    And external link "http://google.com" is opened 

Scenario:Publishing the changes and checking that highlight hotspot link is set to an external link in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    And user clicks on highlight hotspot "1" of slide "3"
    Then external link "http://google.com" is opened 

Scenario:Changing the highlight hotspot link to no action and checking in edit mode and preview mode that clicking on the hotspot does not take any action
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "edit" of hotspot "1" in slide "3"
    And user selects "nolink" as highlight hotspot link
    And user clicks on "save"
    And user clicks on highlight hotspot "1" of slide "3"
    Then no action is taken and user is in the same slide "3" in "edit" mode
    And user switches to preview mode from "edit" mode
    And user loads the slide "file-section/sub-section/slide-demo/3" in preview mode
    And user clicks on highlight hotspot "1" of slide "3"
    And no action is taken and user is in the same slide "3" in "preview" mode

Scenario:Publishing the changes and checking that highlight hotspot link is set to no action in live mode
    Given user switches to edit mode from "preview" mode
    And user publishes the work done
    When user loads the live demo "file-section/sub-section/slide-demo/3"
    And user clicks on highlight hotspot "1" of slide "3"
    Then no action is taken and user is in the same slide "3" in "live" mode

Scenario:Deleting the pin hotspot and checking in edit mode, preview mode and live mode 
    When user deletes the pin hotspot "1" from slide "1"
    Then pin hotspot "1" is deleted from slide "1" in "edit" mode
    And user switches to preview mode from "edit" mode
    And pin hotspot "1" is deleted from slide "1" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/1"
    And pin hotspot "1" is deleted from slide "1" in "live" mode

Scenario:Deleting the highlight hotspot and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    When user clicks on highlight hotspot icon
    And user clicks on highlight hotspot "delete" of hotspot "1" in slide "3"
    Then highlight hotspot "1" is deleted from slide "3" in "edit" mode
    And user switches to preview mode from "edit" mode
    And highlight hotspot "1" is deleted from slide "3" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/3"
    ANd highlight hotspot "1" is deleted from slide "3" in "live" mode

Scenario:Replacing the image in a slide and checking that the image is replaced in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/1"
    And user clicks on settings icon
    When user replaces the image in slide "1" with "sunset.jpg"
    And user clicks on "save"
    Then image in slide "1" is replaced in "edit" mode
    And user switches to preview mode from "edit" mode
    Then image in slide "1" is replaced in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/1"
    And image in slide "1" is replaced in "live" mode

Scenario:Replacing the uploaded video and adding a video cover and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/2"
    And user clicks on settings icon
    When user replaces the video in slide "2" with "catvideo.mp4"
    And user adds "flowers.jpg" as video cover for video in slide "2"
    And user clicks on "save"
    Then video in slide "2" is replaced in "edit" mode
    And video cover is added for video in slide "2" in "edit" mode
    And user switches to preview mode from "edit" mode
    Then video in slide "2" is replaced in "preview" mode
    And video cover is added for video in slide "2" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/2"
    Then video in slide "2" is replaced in "live" mode
    And video cover is added for video in slide "2" in "live" mode


Scenario:Replacing the added video cover and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user clicks on settings icon
    When user replaces the video cover for video in slide "2" with "cat.jpeg"
    And user clicks on "save"
    Then video cover of the video in slide "2" is replaced in "edit" mode
    And user switches to preview mode from "edit" mode
    And video cover of the video in slide "2" is replaced in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/2"
    Then video cover of the video in slide "2" is replaced in "live" mode


Scenario:Replacing the embedded video and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/4"
    And user clicks on settings icon
    And user replaces the embedded video in slide "4" with the new url "https://www.youtube.com/watch?v=DPEJB-FCItk"
    When user clicks on "save"
    Then embedded video in slide "4" is replaced in "edit" mode
    And user switches to preview mode from "edit" mode
    And embedded video in slide "4" is replaced in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/4"
    And embedded video in slide "4" is replaced in "live" mode


Scenario:Replacing the audio, adding an audio cover and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/5"
    And user clicks on settings icon
    When user replaces the audio file in slide "5" with "audio2.mp3"
    And user "adds" the "flower1.jpg" as audio cover for audio in slide "5"
    And user clicks on "save"
    Then audio file in slide "5" is replaced in "edit" mode
    And audio cover is "added" for audio file in slide "5" in "edit" mode
    And user switches to preview mode from "edit" mode
    Then audio file in slide "5" is replaced in "preview" mode
    And audio cover is "added" for audio file in slide "5" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/5"
    Then audio file in slide "5" is replaced in "live" mode
    And audio cover is "added" for audio file in slide "5" in "live" mode


Scenario:Replacing the added audio cover and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user clicks on settings icon
    When user "replaces" the "flower2.jpg" as audio cover for audio in slide "5"
    And user clicks on "save"
    Then audio cover is "replaced" for audio file in slide "5" in "edit" mode
    And user switches to preview mode from "edit" mode
    Then audio cover is "replaced" for audio file in slide "5" in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/5"
    Then audio cover is "replaced" for audio file in slide "5" in "live" mode

Scenario:Replacing the link added to a slide and checking in edit mode, preview mode and live mode
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/7"
    And user clicks on settings icon
    When user enters "https://www.wikipedia.org/" as link URL in slide "7" 
    And user clicks on "save"
    Then link in slide "7" is replaced in "edit" mode
    And user switches to preview mode from "edit" mode
    Then link in slide "7" is replaced in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/7"
    Then link in slide "7" is replaced in "live" mode

Scenario:Trying to replace the image in a slide with invalid file to check the error message
    Given user switches to edit mode from "live" mode
    And user loads the slide "file-section/sub-section/slide-demo/3"
    And user clicks on settings icon
    When user tries to replace the image with invalid file "videos/video1.mp4"
    Then "Oops! Please upload a valid image file." error message should be shown
    And user clicks the "cancel" button

Scenario:Trying to replace the uploaded video and video cover with invalid file to check error messages
    Given user loads the slide "file-section/sub-section/slide-demo/2"
    And user clicks on settings icon
    When user tries to replace the video with invalid file "images/cat.jpeg"
    And user tries to replace the video cover with invalid file "audios/audio1.mp3"
    Then "Oops! Please upload a valid video file." error message should be shown
    And user clicks the "cancel" button

Scenario:Trying to replace the embedded video with invalid url to check error message
    Given user loads the slide "file-section/sub-section/slide-demo/4"
    And user clicks on settings icon
    When user tries to replace the "video" with invalid url "www.google.com"
    Then "Oops! Please enter a valid video URL." error message should be shown
    And user clicks the "cancel" button

Scenario:Trying to replace the audio file and its cover with invalid files to check error message
    Given user loads the slide "file-section/sub-section/slide-demo/5"
    And user clicks on settings icon
    When user tries to replace the audio with invalid file "images/flower1.jpg"
    And user tries to replace the audio cover with invalid file "audios/audio2.mp3"
    Then "Oops! Please upload a valid audio file" error message should be shown
    And user clicks the "cancel" button

Scenario:Trying to replace a link in a slide with invalid url to check error message
    Given user loads the slide "file-section/sub-section/slide-demo/7"
    And user clicks on settings icon
    When user tries to replace the "link" with invalid url "abcd"
    Then "Oops! Please enter a valid URL." error message should be shown
    And user clicks the "cancel" button

Scenario:Deleting a slide from player and checking in edit, preview and live mode
    Given user loads the slide "file-section/sub-section/slide-demo/6"
    When user clicks on delete icon in side panel
    And user "delete"s the "Slide"
    Then slide is deleted from the player in "edit" mode
    And user switches to preview mode from "edit" mode
    Then slide is deleted from the player in "preview" mode
    And user switches to edit mode from "preview" mode
    And user publishes the work done
    And user loads the live demo "file-section/sub-section/slide-demo/6"
    Then slide is deleted from the player in "live" mode
