@viewer
@get_the_app
@login_required
Feature:testing Viewer user

Scenario:Testing that there is no Viewer option available under add user pop up before making the entire domain as private in the settings page
    Given Admin lands in "testing.sharedemos.com:5000" user permissions page
    Then Viewer option is not available in the add user popup
    
@tenant_private 
Scenario:Making the entire domain as private in the settings page
    Given user makes the entire app as private
    And Admin lands in "testing.sharedemos.com:5000" user permissions page
    Then Viewer option is available in the add user popup

Scenario:Adding a user with viewer permissions
    Given Admin posts data as "first_name as Keerti and last_name as Habbu and email as keerti.habbu@gmail.com and role_id as 4" to "testing.sharedemos.com:5000" user permissions page
    Then "Keerti for first_name and Habbu for last_name and keerti.habbu@gmail.com for email" should be in the response
    Given added user is verfied from the Mail 
    Then "Congratulations on joining ShareDemos." should be displayed
    Given User sets password as "password as xyzabc"
    Then "Product Walkthroughs" should be displayed
    And "Library" should not be displayed

Scenario:Getting user details and checking that viewer user is added with role id 4
    Given User logins to "testing.sharedemos.com:5000" domain with "email as nagarjun.nas21@gmail.com and password as 123456"
    And Admin gets the user details
    Then "Keerti for first_name and Habbu for last_name and keerti.habbu@gmail.com for email" should be in the response
    And role_id should be "4" for the user with email "keerti.habbu@gmail.com"