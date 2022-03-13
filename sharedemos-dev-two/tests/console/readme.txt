Steps to Run the Console Based Tests:

> Change to Project folder and run the Command as follows :

	behave tests/console/

  To Run Authoring Features : behave tests/console/ --tags=important,authoring -k

  To Run One Level Deep Demos Features : behave tests/console/ --tags=important,one_level_deep_demos -k

  To Run Icon Features : behave tests/console/ --tags=important,icon -k

  To Run Product Tree Features : behave tests/console/ --tags=important,product_tree -k

  To Run User Features : behave tests/console/ --tags=important,users -k

  To Run Multilingual Features : behave tests/console/ --tags=important,multi_lingual -k

  To Run Audience Features : behave tests/console/ --tags=important,audience -k

  To Run CTA Forms Features : behave tests/console/ --tags=important,cta_forms -k

  To run import category and sitemaps features : behave tests/console/ --tags=important,import_feature -k

  To run text editor features : behave tests/console/ --tags=important,text_editor -k

  To run activity feed features : behave tests/console/ --tags=important,activity_feed -k

  To run viewer user features : behave tests/console/ --tags=important,viewer -k

  To run export pdf features : behave tests/console/ --tags=important,export_pdf -k


Scenarios Covered in Feature Files:

> 001_basic.feature
	
  1.Verifying the Admin Page Loading.

> 002_admin.feature
  
  1.Creating a Tenant with required fields and without required fields.
  2.Creating a Another Tenant with required fields for another tenant user login purpose.
  3.Creating a Tenant Theme with required fields and without required fields.
  4.Creating a Tenant User with required fields and without required fields.
  5.Creating a Another User for the another tenant with required fields for another tenant user login purpose.
  6.Creating a Language with required fields and without required fields.

> 003_login.feature

  1.Verifying the Tenant Home Page and User Login Page Loading. 
  2.Verifying the Tenant User Login with wrong and empty Email ID, wrong Password and empty fields and 
    Checking for error messages.
  3.Verifying the another Tenant User Login and Checking for error messages.
  4.Verifying the Tenant Admin User Login, Tenant Analyst User Login with required fields.

> 004_authoring.feature

  1.Verifying the Tenant Settings and Authoring Page Loading.
  2.Adding a Main Product with video, related links and required fields for Normal and Deleting Purpose.
  3.Adding a Sub Section with required fields.
  4.Editing the name and description of a Section.	
  5.Enabling and Disabling a Section.
  6.Hiding and UnHiding a Section.
  7.Altering a Section postion.
  8.Deleting a Section.

> 005_playlist.feature

  1.Adding a Playlist with required fields for Normal and Deleting Purpose.
  2.Editing the name and description of a Playlist.	
  3.Enabling and Disabling a Playlist.
  4.Deleting a Playlist.

> 006_walkthrough.feature

  1.Adding a Demo with required fields for Normal, Hiding and Deleting Purpose.
  2.Creating a Image Slide for Demo.
  3.Creating a Video Slide for Demo.
  4.Creating a Text Slide for Demo.
  5.Creating a HotSpot for the Image Slide in Demo.
  6.Looking for the Slide data before and after publishing the demo.
  7.Publishing the Demo.
  8.Editing the name of a Demo.	
  9.Enabling and Disabling a Demo.
  10.Altering a Demo postion.
  11.Deleting a Demo.


> 007_one_level_deep_demos.feature
  
  1.Creating section, adding playlist under main section
  2.Editing, Enabling, Disabling and deleting of playlist along with validations
  3.Creating, hiding, unhiding of walkthroghs
  4.Publishing of walkthrogh
  5.Repositioning of walkthrogh and deleting of walkthroghs
  6.Editing demo name
  7.uploading of image in slide 

> 008_icon.feature

  1.Creating a Icon with required fields.
  2.Deleting a Icon.

> 009_product_tree.feature

  1.Getting a Product Tree with the Product Name.
  2.Getting a Product Tree with the Product Name and Section Name.

> 010_user.feature

  1.Verifying the Tenant Admin User Permissions Page Loading.
  2.Adding User as Admin with required fields.
  3.Altering users First Name, Last Name and Role as Author.
  4.Verifying the Author User Login with all required fields.
  5.Altering users Role as Analyst.
  6.Verifying the Analyst User Login with all required fields
  7.Deleting and Re-Adding a User.
  8.Verifying the Re-added User Login with all required fields.

> 011_multi_language.feature

  1.Adding a Main Product, Sub Section, Playlist and Demo with required fields for Multilingual purpose.
  2.Editing the Main Product, Sub Section, Playlist and Demo by changing the languange to Chinese from English.
  3.Verfying the Main Product, Sub Section, Playlist and Demo data in both the languanges 
    i.e Chinese and English.
  4.Verfying the Main Product, Sub Section, Playlist and Demo data by making the German as browser 
    First Language and Chinese as Second Language as priority.

> 012_audience.feature

  1.Adding Company with required fields.
  2.Editing the Company Name.
  3.Adding a Existng Company and Checking for error messages. 
  4.Adding a Main Product, 2 Sub Section, Playlist and Demo with required fields for Audience purpose.
  5.Adding a User with required fields and without required fields to the Created Company.
  6.Editing the User Name.
  7.Adding a Existing User to the Created Company.
  8.Sharing the Private Content to the User with a Expired Expiry Date and with a Valid Expiry date.
  10.Sharing the Private Content to the User with No Private Content and Private Content.
  11.Signing Up to See the Private Content Shared to the User.
  12.Testing the Visbility of Private Shared Contents for the Audience User before and after Signup, 
     for Normal User and for Audience User.
  13.Altering the Private/Public for Main Product, Sub Section alternatively.
  14.Testing the Visbility of Private Shared Contents for Normal User and for Audience User after alteration.
  15.Deleting and Testing the Visbility of Private Shared Contents a Delted Audience User.
  16.Re-adding the deleted User and testing the Visbility of Private Shared Contents a Delted Audience User.
  16.Deleting the Main Product, Sub Section alternatively and testing the Visbility 
     of Private Shared Contents a Delted Audience User.

> 013_cta.feature

  1.Adding a CTA Form Button and CTA URL Button with required fields.

>014_import_category.feature
  1.Creating a subcategory by importing an existing subsection and section
  2.Testing circular import
  3.Deleting an item from site map
  4.Testing the number of demos and slides in the main section, subsection and walkthrough
  5.Rearranging demos within and outside of the playlist, subsection and section using sitemap
  6.Rearranging playlist within and outside of a subsection and section
  7.Rearranging subsection within and outside of a main section
  8.Rearranging main section
  9.Moving a playlist, subsection and section into an empty section

>015_text_editor.feature
  1.Adding text editor slide including all the features of text editor
  2.Editing the tenant to add logo and footer_text and checking that footer is present in text editor walkthrough

>016_activity_feed.feature
  1.Activity feed of crearting, editing and deleting of section, subsection, playlist and demo
  2.Activity feed of publishing a demo
  3.Testing search filter based on user name, section title, walkthrough title
  4.Testing filter based on date, author and category

>017_viewer_user.feature
  1.Testing that there is no Viewer option available under add user pop up before making the entire domain as private in the settings page
  2.Adding a user with viewer permissions and checking that viewer user is added with role id 4

>018_export_pdf.feature
  1.Testing that the export to pdf link is not seen before enabling the export to pdf option in settings page and is available after enabling.
  2.Checking that clicking on export to pdf link downloads the pdf