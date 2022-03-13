@export_pdf
@login_required
Feature:testing Export to pdf feature

Scenario: Creating a main section for testing export to pdf
    Given User posts data as "name as Export Pdf main section and description as Testing export pdf main section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
    Then "Export Pdf main section for name and Testing export pdf main section for description" should be in the response

Scenario: Creating a subsection for testing text editor
    Given User posts data as "name as Export Pdf sub section and description as Testing export pdf sub section and show as True and parent as export-pdf-main-section and private as False" to "testing.sharedemos.com:5000" edit page
    Then "Export Pdf sub section for name and Testing export pdf sub section for description" should be in the response

Scenario: Creating a Playlist with required fields
    Given User creates a playlist with "name as Export Pdf playlist and section_id as export-pdf-sub-section and description as Testing export pdf playlist" to "testing.sharedemos.com:5000" edit page 
    Then "Export Pdf playlist for name and Testing export pdf playlist for description" should be in the response

Scenario: Creating a WalkThrough with required fields 
    Given User creates walkthrough with "name as Export Pdf walkthrough" with the playlist "Export Pdf playlist" to "testing.sharedemos.com:5000" edit page 
    Then "Export Pdf walkthrough for name" should be in the Draft data

Scenario:Testing that the export to pdf link is not seen before enabling the export to pdf option in settings page
	Given user gets the section details of "Export Pdf main section"
	Then export to pdf link is not available

Scenario:Export to pdf link is available after enabling the export to pdf option in settings page
	Given user enables the export to pdf feature
	And user gets the section details of "Export Pdf main section"
	Then export to pdf link is available

Scenario:Checking that clicking on export to pdf link downloads the pdf
	Given user clicks on the export to pdf link under "Export Pdf sub section"
	Then "200 OK" as status and "application/pdf" as content_type should be in the response