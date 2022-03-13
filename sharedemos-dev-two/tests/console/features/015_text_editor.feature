@login_required
@text_editor
Feature: Testing adding text editor in a walkthrough slide

Scenario: Creating a main section for testing text editor
    Given User posts data as "name as Text Editor main section and description as Testing text editor main section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
    Then "Text Editor main section for name and Testing text editor main section for description" should be in the response

Scenario:Creating a subsection for testing text editor
    Given User posts data as "name as Text Editor sub section and description as Testing text editor sub section and show as True and parent as text-editor-main-section and private as False" to "testing.sharedemos.com:5000" edit page
    Then "Text Editor sub section for name and Testing text editor sub section for description" should be in the response

Scenario: Creating a Playlist with required fields
    Given User creates a playlist with "name as Text Editor playlist and section_id as text-editor-sub-section and description as Testing text editor playlist" to "testing.sharedemos.com:5000" edit page 
    Then "Text Editor playlist for name and Testing text editor playlist for description" should be in the response

Scenario: Creating a WalkThrough with required fields 
    Given User creates walkthrough with "name as Text Editor walkthrough" with the playlist "Text Editor playlist" to "testing.sharedemos.com:5000" edit page 
    Then "Text Editor walkthrough for name" should be in the Draft data

Scenario:Adding text editor in a slide
    Given User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as text-editor-walkthrough and resource as two.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 

    Then "Text Editor walkthrough for name and image for resource_type" should be in the Draft data of page

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as <h1><strong><u>Here is the title with bold letters & underlined</u></strong></h1><p><em><span style="color: rgb(26, 188, 156);">Subtitle in italic<s>&nbsp;&</s>&nbsp;<s>underlined</s></span></em></p><p><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 10px;"><span style="color: rgb(226, 80, 65);">Arial font with font size 10</span></span></span></p><p><span style="font-family: Georgia,serif;"><span style="font-size: 14px;"><span style="color: rgb(251, 160, 38);">Georgia font with size 14</span></span></span></p><p><span style="font-size: 24px;"><span style="color: rgb(85, 57, 130);">Impact font with size 24</span></span></p><p><br></p><p><span style="font-family: Tahoma,Geneva,sans-serif;"><span style="font-size: 36px;"><span style="color: rgb(163, 143, 132);">Tahoma font with size 36</span></span></span></p><p><br></p><p><span style="font-family: Times New Roman,Times,serif;"><span style="font-size: 60px;"><span style="color: rgb(71, 85, 119);">Times New Roman font with size 60</span></span></span></p><p><br></p><p><span style="font-family: Verdana,Geneva,sans-serif;"><span style="font-size: 96px;"><span style="color: rgb(184, 49, 47);">Verdana font with size 96</span></span></span></p><p><br></p><h1 style="text-align: left;">Paragraph heading 1 with left align</h1><p style="text-align: left;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris&nbsp;</p><p style="text-align: left;"><br></p><h2 style="text-align: center;">Paragraph heading 2 with center align</h2><p style="text-align: center;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p><p style="text-align: center;"><br></p><h3 style="text-align: right;">Paragraph heading 3 with right align</h3><p style="text-align: right; margin-left: 20px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris&nbsp;</p><h4 style="text-align: justify;"><br></h4><h4 style="text-align: justify;">Paragraph heading 4 with justified alignment</h4><p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris&nbsp;</p><pre>Paragraph code \nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori</pre><p><span style="font-size: 18px;">ordered list</span></p><ol><li>List Item 1</li><li>List Item 2</li></ol><p>Unordered List</p><ul><li>List Item 1</li><li>List Item 2</li></ul><p style="margin-left: 40px;">Increased Indentation</p><p style="margin-left: 20px;">Decreased Indentation</p><p><br></p> and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 2 and type as content and path as None" to "testing.sharedemos.com:5000" edit page 

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as <p><strong><span style="font-size: 18px;">Continued......</span></strong></p><p><a class="fr-green" href="https://froala.com" target="_blank">Froala</a>&nbsp;<a class="fr-strong" href="https://google.com" target="_blank">Google</a>&nbsp;<a href="https://facebook.com">Facebook</a> Yahoo&nbsp;</p><p><strong>Inserting image by uploading file</strong></p><p><a href="http://google.com"><img class="fr-dib fr-draggable fr-fil fr-rounded fr-bordered" src="two.jpg" style="width: 300px;" alt="Some image"></a></p><p><br></p><p style="text-align: center;"><strong>Inserting image by browsing &nbsp;&nbsp;</strong>&nbsp;<img class="fr-dib fr-draggable" src="http://i.froala.com/assets/photo9.jpg" data-id="9" data-type="image" data-name="Image 2016-03-20 at 20:03:09.jpg" style="width: 300px;"></p><p><br></p><p style="text-align: right;"><strong>Inserting image by Url</strong></p><p><img class="fr-dib fr-draggable fr-fir" src="http://wallpaperlayer.com/img/2015/7/best-hd-wallpapers-5271-5517-hd-wallpapers.jpg" style="width: 300px;"></p><p><br></p><p><br></p><p><br></p><p style="text-align: center;"><strong>Inserting video by URL</strong></p><p><strong><span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true"><iframe src="//www.youtube.com/embed/An2OaIbPSII" frameborder="0" allowfullscreen="" style="width: 650px; height: 350px;"></iframe></span></strong></p><p><br></p><p><strong>Inserting video by Embedded code</strong></p><p><span class="fr-video fr-dvb fr-draggable fr-fvl" contenteditable="false" draggable="true"><iframe width="560" height="315" src="https://www.youtube.com/embed/hS5CfP8n_js" frameborder="0" allowfullscreen=""></iframe></span><br></p><p>Uploading a file</p><p><a class="fr-file fr-green" href="http://i.froala.com/download/981515ff9bca9ca99a52fe5e0a94536d73b0c57c.jpg?1462796308">two.jpg</a></p><p><br></p><p>Inserting a table</p><table class="fr-dashed-borders fr-alternate-rows" style="width: 100%;"><thead><tr><th class="fr-highlighted fr-thick" style="vertical-align: middle; text-align: center;"><br>Header1<br></th><th class="fr-highlighted fr-thick" style="text-align: center; vertical-align: middle;">Header2<br></th><th class="fr-highlighted fr-thick" style="text-align: center; vertical-align: middle;">Header3<br></th></tr></thead><tbody><tr><td style="width: 33.3333%;">Row1Cell1<br></td><td style="width: 33.3333%;">Row1Cell2<br></td><td style="width: 33.3333%;">Row1Cell2<br></td></tr><tr><td style="width: 33.3333%;">Row2Cell1<br></td><td style="width: 33.3333%;">Row2Cell2<br></td><td style="width: 33.3333%;">Row2Cell3<br></td></tr></tbody></table><p><br></p><blockquote><p>Quote Increase&nbsp;</p></blockquote><p>Quote Decrease</p><p>Inserting horizontal line</p><hr><p><br></p> and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 3 and type as content and path as None" to "testing.sharedemos.com:5000" edit page 

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as <div class="col-sm-12 layout"> <img src="http://i.froala.com/assets/photo5.jpg" align="right" width="50%" style="margin-right:0px;" class="fr-draggable" data-id="5" data-type="image" data-name="Image 2016-06-15 at 03:06:58.jpg"> <h1>Single image on right side</h1><p>Here we are using existing layout of single image on right side & text on left side</p> </div>    and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 4 and type as content and path as None" to "testing.sharedemos.com:5000" edit page 

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as <div class="col-sm-12 layout"> <img src="http://i.froala.com/assets/photo3.jpg" align="left" width="50%" style="margin-right:0px;" class="fr-draggable" data-id="3" data-type="image" data-name="Image 2016-06-12 at 14:06:29.jpg"> <h1>&nbsp; Single image on left side</h1><p>&nbsp; &nbsp;Here we are using existing layout of single image on left side &amp; text on right side.</p> </div>    and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 5 and type as content and path as None" to "testing.sharedemos.com:5000" edit page

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as   <div>&nbsp; <div class="col-sm-6 "> <h1>Double images on right side</h1><p>Here we are using existing layout of double images on right side &amp; text on left side</p> </div><div class="col-sm-6 "> <img src="http://i.froala.com/assets/photo1.jpg" class="fr-draggable" data-id="1" data-type="image" data-name="Image 2016-05-13 at 18:05:04.jpg"> <img src="http://i.froala.com/assets/photo2.jpg" class="fr-draggable" data-id="2" data-type="image" data-name="Image 2016-05-18 at 07:05:16.jpg" style="width: 717px; height: 596.874px;"> </div> </div>    and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 6 and type as content and path as None" to "testing.sharedemos.com:5000" edit page

    And user creates text editor resource with "name as Text editor resource and is_new as true and content as <div>&nbsp; <div class="col-sm-6 "> <img src="http://i.froala.com/assets/photo4.jpg" class="fr-draggable" data-id="4" data-type="image" data-name="Image 2016-06-11 at 19:06:10.jpg"> <img src="http://i.froala.com/assets/photo10.jpg" class="fr-draggable" data-id="10" data-type="image" data-name="Image 2016-05-19 at 14:05:19.jpg"> </div><div class="col-sm-6 "> <h1>Double images on left side</h1><p>Here we are using existing layout of double images on left side &amp; text on right side.</p> </div> </div>   and external as false and walkthrough as text-editor-walkthrough and resource as None and slide_order as 7 and type as content and path as None" to "testing.sharedemos.com:5000" edit page

    And "Text Editor walkthrough for name and content for resource_type" should be in the Draft data


Scenario: Getting walkthrough details after adding text editor and before publishing the work
    Given User gets "Text Editor walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "Text editor resource for name" should not be in the Published data
    And "Text Editor walkthrough for name and content for type" should be in the Draft data of "Text Editor walkthrough" walkthrough

Scenario: Publishing the work of adding text editor to a slide
    Given user publishes walkthrough "Text Editor walkthrough" with "publish as True" to "testing.sharedemos.com:5000" edit page 
    Then "Text Editor walkthrough for name and content for type" should be in the Published data

Scenario: Getting walkthrough details after publishing the work of adding a text editor
    Given User gets "Text Editor walkthrough" walkthrough of "testing.sharedemos.com:5000" page
    Then "Text Editor walkthrough for name and content for type" should be in the Published data

Scenario: Editing the 'testing' tenant to add logo and footer_text and checking that footer is present in text editor walkthrough
    Given Admin Edits the "testing" tenant with "name as testing and domain as testing.sharedemos.com:5000 and footer_text as Powered by sharedemos and logo as three.jpg and timezone as US/Pacific and crm_settings as {}"
    Then "With selected" should be displayed in page
    And "Powered by sharedemos" as footer text and footer image should be present in home page

