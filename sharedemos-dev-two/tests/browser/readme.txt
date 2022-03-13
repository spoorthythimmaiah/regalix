Steps to run selenium tests:

1> Change the directory to /tests/browser and run scripts.py file 
	python scripts.py


2> Open another tab and run the following commands

	-> PROJ_ENV=testing python manage.py db downgrade base

	-> PROJ_ENV=testing python manage.py db upgrade

	-> PROJ_ENV=testing python manage.py runserver


3> Change the directory to /tests/browser and run the scenarios using the following commands

	-> behave (To run all scenarios)

	-> behave --tags=important (To run only the scenarios that are tagged as important)

	-> behave --tags=-important (To run all the scenarios except the scenarios that are tagged as important)

	-> behave --tags=one,two (To run scenarios that are tagged one or two)

	-> behave --tags=one --tags=two (To run only the scenarios that are tagged both one and two)


Description of feature files:

1> 001_main.feature:(run as -> behave --tags=main)

	- loading the home page


2> 002_admin.feature:(run as -> behave --tags=admin)

	- tenant creation, user creation, tenant theme creation and language creation in admin page along with validations


3> 003_login.feature:(run as -> behave --tags=important,login)

	- admin login, author login and analyst login along with validations.

	- Forgot password, resetting the password  

	- different tenant user login 


4> 004_library_category.feature:(run as -> behave --tags=important,library_category)

	- creating sections, subsections along with validations

	- Editing sections 

	- creating sections with image upload, video upload, and hidden visibility

	- Repositioning of sections

	- Enabling, disabling, Hiding and unhiding of sections

	- deleting sections


5> 005_Playlist.feature:(run as -> behave --tags=important,playlist)

	- Creating playlist with validations

	- Editing the playlist

	- Disabling and enabling the playlist

	- Deleting the playlist


6> 006_Demo_or_walkthrough.feature:(run as -> behave --tags=important,demo)

	- Walkthrogh/Demo creation with validations

	- Hiding/Disabling and unhiding/Enabling of walkthroughs

	- Publishing walkthroughs

	- Repositioning of walkthroughs 

	- Deleting of walkthroughs

	- Editing the walkthroughs


7> 007_slides.feature:(run as -> behave --tags=important,slides)

	- uploading of image, video and audio files in slide

	- Adding a link to a sldie 

	- Embedding of image, audio and video in slide by entering URL

	- uploading of invalid image, video and audio files in slide to check error messages

	- Embedding of image, audio and video in slide by entering invalid urls to check error messages

	- Adding a link to a sldie by entering invalid url to check error message

	- Adding notes, pin hotspot and highlight hotspot to a slide

	- Rearranging the slides

	- Adding title and descriptions to pin hotspots and changing the tooltip positions

	- Repositioning of pin hotspot and highlight hotspot

	- Resizing and changing the color of highlight hotspot

	- Changing the highlight hotspot links 

	- Deleting of pin hotspot and highlight hotspot

	- Replacing the image, video, audio and link from the slide

	- Adding and replacing the audio cover and video cover

	- Replacing the image, video, audio and link from the slide with invalid types to check error message

	- Deleting the slide from player


8> 008_One_level_deep_demo.feature:(run as -> behave --tags=important,one_level_deep_demo)

	- Creating section, adding playlist under main section

	- Editing, Enabling, Disabling and deleting of playlist along with validations

	- Creating, hiding, unhiding of walkthroghs

	- Publishing of walkthrogh

	- Repositioning of walkthrogh and deleting of walkthroghs

	- Editing demo name

	- uploading of image in slide 


9> 009_user_roles.feature:(run as -> behave --tags=important,user_roles)

	- Creating users to check validations

	- Creating new users with author permission, admin permission and analyst permissions

	- Activating the newly created users and checking that the users have assigned permissions

	- Changing the permissions of the user and rechecking

	- Removing the user and readding the removed user


10> 010_multilingual.feature:(run as -> behave --tags=important,multilingual )

	- Creating another language with different language Id

	- Checking section, subsection, playlist and demo contents in edit mode and live mode for default language

	- Changing the language from default(English) to chinese and Editing the contents of section, subsection and playlist

	- Checking section, subsection, playlist and demo contents in edit mode and live mode for Chinese language


11> 011_multilingual_browser_locale.feature:(run as -> behave --tags=important,browser_locale)

	- In edit mode, checking that section, subsection, playlist and demo content is in chinese language when browser default language is set to chinese

	- In live mode, checking that section, subsection, playlist and demo content is in chinese language when browser default language is set to chinese


12> 012_browser_language_priorities.feature:(run as -> behave --tags=important,browser_language_priorities)

	- Setting browser language priorities to German, Chinese and English and checking that section, subsection, playlist and demo content is in Chinese language when German language contents are not available in edit mode and live mode


13> 013_audiences.feature:(run as -> behave --tags=important,audiences)

	- checking that the user with admin role and author role have access to audiences page and Analyst user dont have access to audiences page

	- Adding a new company with validations

	- Checking that the share button is disabled when there are no users added to the company

	- Adding users to the company when there is no category/resource in the PRIVATE mode. 

	- User details in audiences gets updated according to the details entered in the sign in page when the email id entered in the sign in page is same as in the audiences page and a new user is created when it is different

	- Trying to share a content with the newly created user when there is no private content in the edit site

	- Checking that private contents are not visible to audience users before sharing the contents with them and are visible once the content is shared

	- Checking that private contents are not visible to public users

	- Editing the already created company profile, adding an existing company and user

	- Sharing the content with the newly created user when only a child of a main category is marked as Private and not the parent and checking the results for audience user and public user and also checking the results when previous day is selected as expiry date

 	- Deleting the user and checking whether the user still can access the content using the url, Readding the deleted user and checking for the same

 	- public categories are not visible in the 'Select Categories' popup in the Audience page.

 	- Checking that the categories are not visible in the public page after privacy button is made "Private" in settings page and vice versa

 	- Deleting the sub-category and checking that the deleted sub-category is not visible to the shared audience user and is not visible under the sharable content


 14>014_cta.feature:(run as -> behave --tags=important,cta)

 	- Adding a new CTA button to a section and child section and checking that clicking on the button takes the user to external link

 	- Adding a new CTA form to a section and subsection and successfully submitting a form