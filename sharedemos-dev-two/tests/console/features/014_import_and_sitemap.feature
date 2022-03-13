@login_required
@import_feature
Feature:Creating a category by importing existing category

Scenario: Creating a main section for importing
	Given User posts data as "name as Import Section and description as Testing import feature and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Import Section for name and Testing import feature for description" should be in the response

Scenario:Creating a subsection for importing
	Given User posts data as "name as Import Sub Section and description as Testing subsection import and show as True and parent as import-section and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Import Sub Section for name and Testing subsection import for description" should be in the response

Scenario:Creating a main section for testing import feature
	Given User posts data as "name as Testing Section and description as Testing section and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Testing Section for name and Testing section for description" should be in the response

Scenario:Creating a subcategory by importing an existing subsection
	Given user creates a subcategory under the section "Testing Section" by importing the existing "subsection" with data as "import as import-sub-section and type as section and id as testing-section" to "testing.sharedemos.com:5000" edit page
	Then "Import Sub Section for name and Testing subsection import for description" should be in the response

Scenario:Creating a subcategory by importing an existing section
	Given user creates a subcategory under the section "Testing Section" by importing the existing "section" with data as "import as import-section and type as product and id as testing-section" to "testing.sharedemos.com:5000" edit page
	Then "Import Section for name and Testing import feature for description" should be in the response

Scenario:Creating a main section Tiger P1 to test circular import
	Given User posts data as "name as Tiger P1 and description as Testing circular import using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Tiger P1 for name and Testing circular import using sitemaps for description" should be in the response

Scenario:Creating a sub section Tiger P1C1 to test circular import
	Given User posts data as "name as Tiger P1C1 and description as Testing circular import and show as True and parent as tiger-p1 and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Tiger P1C1 for name and Testing circular import for description" should be in the response

Scenario:Creating a main section Lion P1 to test circular import
	Given User posts data as "name as Lion P1 and description as Testing circular import using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Lion P1 for name and Testing circular import using sitemaps for description" should be in the response

Scenario:Creating a sub section Lion P1C1 to test circular import
	Given User posts data as "name as Lion P1C1 and description as Testing circular import and show as True and parent as lion-p1 and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Lion P1C1 for name and Testing circular import for description" should be in the response

Scenario:Duplicating Tiger P1C1 under Lion P1
	Given user creates a subcategory under the section "Lion P1" by importing the existing "subsection" with data as "import as tiger-p1c1 and type as section and id as lion-p1" to "testing.sharedemos.com:5000" edit page
	Then "Tiger P1C1 for name and Testing circular import for description" should be in the response

Scenario:Duplicating Lion P1 under Tiger P1
	Given user creates a subcategory under the section "Tiger P1" by importing the existing "section" with data as "import as lion-p1 and type as product and id as tiger-p1" to "testing.sharedemos.com:5000" edit page
	Then "Lion P1 for name and Testing circular import using sitemaps for description" should be in the response

Scenario:Trying to duplicate Tiger P1 under Lion P1 to produce circular import error
	Given user moves the main section "Tiger P1" under another main section with data as "target_parent_slug as lion-p1 and reorder as tree_reorder" to "testing.sharedemos.com:5000" edit page
	Then "Bad Request for message" should be in the response

Scenario:Creating a main section for deleting using sitemap
	Given User posts data as "name as Delete Sitemap Section and description as Testing delete using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Delete Sitemap Section for name and Testing delete using sitemaps for description" should be in the response

Scenario:Deleting an item from site map
	Given User wants to delete a section with the slug "Delete Sitemap Section" related to "testing.sharedemos.com:5000" domain 
	Then "ok for delete" should be in the response

Scenario:Creating a main section for reordering using sitemap
	Given User posts data as "name as Sitemap Section S1 and description as Testing reorder using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Section S1 for name and Testing reorder using sitemaps for description" should be in the response

Scenario:Creating a subsection for testing sitemaps
	Given User posts data as "name as Sitemap Subsection S1S1 and description as Testing subsection reordering and show as True and parent as sitemap-section-s1 and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Subsection S1S1 for name and Testing subsection reordering for description" should be in the response

Scenario:Creating another subsection for testing sitemaps
	Given User posts data as "name as Sitemap Subsection S1S2 and description as Testing subsection reordering and show as True and parent as sitemap-section-s1 and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Subsection S1S2 for name and Testing subsection reordering for description" should be in the response

Scenario: Creating a Playlist for reordering using sitemap
	Given User creates a playlist with "name as Sitemap Playlist S1S1P1 and section_id as sitemap-subsection-s1s1 and description as Testing playlist rearrange using sitemap" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Playlist S1S1P1 for name and Testing playlist rearrange using sitemap for description" should be in the response

Scenario: Creating another Playlist for reordering using sitemap
	Given User creates a playlist with "name as Sitemap Playlist S1S1P2 and section_id as sitemap-subsection-s1s1 and description as Testing playlist rearrange using sitemap" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Playlist S1S1P2 for name and Testing playlist rearrange using sitemap for description" should be in the response

Scenario: Creating a Playlist for reordering using sitemap
	Given User creates a playlist with "name as Sitemap Playlist S1S2P1 and section_id as sitemap-subsection-s1s2 and description as Testing playlist rearrange using sitemap" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Playlist S1S2P1 for name and Testing playlist rearrange using sitemap for description" should be in the response

Scenario: Creating a walkthrough
	Given User creates walkthrough with "name as Sitemap Demo S1S1P1D1" with the playlist "Sitemap Playlist S1S1P1" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P1D1 for name" should be in the Draft data

Scenario: Creating a walkthrough
	Given User creates walkthrough with "name as Sitemap Demo S1S1P1D2" with the playlist "Sitemap Playlist S1S1P1" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P1D2 for name" should be in the Draft data

Scenario: Creating a walkthrough
	Given User creates walkthrough with "name as Sitemap Demo S1S1P2D1" with the playlist "Sitemap Playlist S1S1P2" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P2D1 for name" should be in the Draft data

Scenario: Creating a walkthrough
	Given User creates walkthrough with "name as Sitemap Demo S1S1P2D2" with the playlist "Sitemap Playlist S1S1P2" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P2D2 for name" should be in the Draft data

Scenario: Creating an Internal Image Resource for Main walkthrough
	Given User creates resource with "name as SectionResourceImage Internal and is_new as true and external as false and walkthrough as sitemap-demo-s1s1p1d1 and resource as one.jpg and slide_order as 1 and type as image and path as None" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P1D1 for name and image for resource_type" should be in the Draft data

Scenario: Creating an External Image Resource for walkthrough
	Given User creates resource with external url with "name as SectionResourceImage External and is_new as true and external as true and walkthrough as sitemap-demo-s1s1p1d1 and resource as None and slide_order as 2 and type as image and path as http://www.icelandprocruises.com/media/img/gallery/home/0006-gallery-iceland-godafoss.jpg" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P1D1 for name and image for resource_type" should be in the Draft data

Scenario: Creating an External Video Resource for walkthrough with Uploading the Video
    Given User creates resource with "name as SectionResourceVideo External and is_new as true and external as true and walkthrough as sitemap-demo-s1s1p2d1 and resource as None and slide_order as 1 and type as embed and path as https://www.youtube.com/watch?v=NkyEOrQiGMQ" to "testing.sharedemos.com:5000" edit page
    Then "Sitemap Demo S1S1P2D1 for name and embed for resource_type" should be in the Draft data

Scenario: Creating an External Image Resource for walkthrough
	Given User creates resource with external url with "name as SectionResourceImage External and is_new as true and external as true and walkthrough as sitemap-demo-s1s1p2d1 and resource as None and slide_order as 2 and type as image and path as http://www.icelandprocruises.com/media/img/gallery/home/0006-gallery-iceland-godafoss.jpg" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Demo S1S1P2D1 for name and image for resource_type" should be in the Draft data

Scenario:Testing the number of demos and slides in the main section 
	Given user gets the product-tree details
	Then there should be "4" demos and "4" slides in the main section "Sitemap Section S1"

Scenario:Testing the number of demos and slides in the sub section 
	Given user gets the product-tree details
	Then there should be "4" demos and "4" slides in the sub section "Sitemap Subsection S1S1" of main section "Sitemap Section S1"

Scenario:Testing the number of demos and slides in the sub section 
	Given user gets the product-tree details
	Then there should be "0" demos and "0" slides in the sub section "Sitemap Subsection S1S2" of main section "Sitemap Section S1"

Scenario:Testing the number of slides in a walkthrough
	Given user gets the product-tree details
	Then there should be "2" slides in the walkthrough "Sitemap Demo S1S1P1D1" under the playlist "Sitemap Playlist S1S1P1" of subsection "Sitemap Subsection S1S1" of main section "Sitemap Section S1"
	And there should be "0" slides in the walkthrough "Sitemap Demo S1S1P1D2" under the playlist "Sitemap Playlist S1S1P1" of subsection "Sitemap Subsection S1S1" of main section "Sitemap Section S1"

Scenario:Testing the number of slides in a walkthrough 
	Given user gets the product-tree details
	Then there should be "2" slides in the walkthrough "Sitemap Demo S1S1P2D1" under the playlist "Sitemap Playlist S1S1P2" of subsection "Sitemap Subsection S1S1" of main section "Sitemap Section S1"
	And there should be "0" slides in the walkthrough "Sitemap Demo S1S1P2D2" under the playlist "Sitemap Playlist S1S1P2" of subsection "Sitemap Subsection S1S1" of main section "Sitemap Section S1"

Scenario:Rearranging demos within the same playlist using sitemap
	Given user rearranges the demo "Sitemap Demo S1S1P1D2" with data as "target_parent_slug as Sitemap Playlist S1S1P1 and reorder as demo"
	Then "201 CREATED" as status should be in the response

Scenario:Moving a demo from one playlist to another playlist within same subsection
	Given user rearranges the demo "Sitemap Demo S1S1P1D1" with data as "target_parent_slug as Sitemap Playlist S1S1P2 and reorder as demo"
	Then "201 CREATED" as status should be in the response

Scenario:Moving a demo from a playlist in one subsection to a playlist in another subsection within same section
	Given user rearranges the demo "Sitemap Demo S1S1P2D1" with data as "target_parent_slug as Sitemap Playlist S1S2P1 and reorder as demo"
	Then "201 CREATED" as status should be in the response

Scenario:Testing that the number of demos and slides in the subsection are reduced when a demo is moved to a different subsection
	Given user gets the product-tree details
	Then there should be "3" demos and "2" slides in the sub section "Sitemap Subsection S1S1" of main section "Sitemap Section S1"

Scenario:Testing that the number of demos and slides in the subsection are increased when a demo is moved into that subsection
	Given user gets the product-tree details
	Then there should be "1" demos and "2" slides in the sub section "Sitemap Subsection S1S2" of main section "Sitemap Section S1"

Scenario:Creating a main section for reordering using sitemap
	Given User posts data as "name as Sitemap Section S2 and description as Testing reorder using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Section S2 for name and Testing reorder using sitemaps for description" should be in the response

Scenario:Creating a subsection for testing sitemaps
	Given User posts data as "name as Sitemap Subsection S2S1 and description as Testing subsection reordering and show as True and parent as sitemap-section-s2 and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Subsection S2S1 for name and Testing subsection reordering for description" should be in the response

Scenario: Creating a Playlist for reordering using sitemap
	Given User creates a playlist with "name as Sitemap Playlist S2S1P1 and section_id as sitemap-subsection-s2s1 and description as Testing playlist rearrange using sitemap" to "testing.sharedemos.com:5000" edit page 
	Then "Sitemap Playlist S2S1P1 for name and Testing playlist rearrange using sitemap for description" should be in the response

Scenario:Testing the number of demos and slides in the main section before moving a demo into it 
	Given user gets the product-tree details
	Then there should be "0" demos and "0" slides in the main section "Sitemap Section S2" 

Scenario:Testing the number of demos and slides in the sub section before moving a demo into it
	Given user gets the product-tree details
	Then there should be "0" demos and "0" slides in the sub section "Sitemap Subsection S2S1" of main section "Sitemap Section S2"

Scenario:Moving a demo from one section to another section
	Given user rearranges the demo "Sitemap Demo S1S1P1D1" with data as "target_parent_slug as Sitemap Playlist S2S1P1 and reorder as demo"
	Then "201 CREATED" as status should be in the response

Scenario:Testing that the number of demos and slides in the main section are increased when a demo is moved into it
	Given user gets the product-tree details
	Then there should be "1" demos and "2" slides in the main section "Sitemap Section S2"

Scenario:Testing the number of demos and slides in the subsection are increased when a demo is moved into it
	Given user gets the product-tree details
	Then there should be "1" demos and "2" slides in the sub section "Sitemap Subsection S2S1" of main section "Sitemap Section S2"

Scenario:Rearranging a playlist within same subsection
	Given user moves the playlist "Sitemap Playlist S1S1P2" into the subsection with data as "target_parent_slug as sitemap-subsection-s1s1 and reorder as playlist"
	Then "200 OK" as status should be in the response

Scenario:Moving a playlist into another subsection of same main section
	Given user moves the playlist "Sitemap Playlist S1S1P1" into the subsection with data as "target_parent_slug as sitemap-subsection-s1s2 and reorder as playlist"
	Then "200 OK" as status should be in the response

Scenario:Testing that the number of demos and slides in the subsection are reduced by the number of demos and slides in the playlist when that playlist is moved from subsection
	Given user gets the product-tree details
	Then there should be "1" demos and "0" slides in the sub section "Sitemap Subsection S1S1" of main section "Sitemap Section S1"

Scenario:Testing that the number of demos and slides in the subsection are increased by the number of demos and slides in the playlist when that playlist is moved into subsection
	Given user gets the product-tree details
	Then there should be "2" demos and "2" slides in the sub section "Sitemap Subsection S1S2" of main section "Sitemap Section S1"

Scenario:Moving a playlist into a subsection of another main section
	Given user moves the playlist "Sitemap Playlist S1S2P1" into the subsection with data as "target_parent_slug as sitemap-subsection-s2s1 and reorder as playlist"
	Then "200 OK" as status should be in the response

Scenario:Testing that the number of demos and slides are reduced in a main section when a playlist is moved from that section to another section
	Given user gets the product-tree details
	Then there should be "2" demos and "0" slides in the main section "Sitemap Section S1"

Scenario:Testing that the number of demos and slides are increased in a main section when a playlist is moved into that section
	Given user gets the product-tree details
	Then there should be "2" demos and "4" slides in the main section "Sitemap Section S2"

Scenario:Rearranging a subsection within the same main section
	Given user moves the subsection "Sitemap Subsection S1S2" into a main section with data as "target_parent_slug as sitemap-section-s1 and reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response

Scenario:Moving a subsection into another main section
	Given user moves the subsection "Sitemap Subsection S1S2" into a main section with data as "target_parent_slug as sitemap-section-s2 and reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response

Scenario:Testing that the number of demos and slides are reduced in a main section when a subsection is moved from that section
	Given user gets the product-tree details
	Then there should be "1" demos and "0" slides in the main section "Sitemap Section S1"

Scenario:Testing that the number of demos and slides are increased in a main section when a subsection is moved into that section
	Given user gets the product-tree details
	Then there should be "3" demos and "4" slides in the main section "Sitemap Section S2"

Scenario:Rearranging a main section
	Given user moves the section "Sitemap Section S2" with data as "reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response

Scenario:Dragging and dropping a subsection outside creates a main category
	Given user moves the section "Sitemap Subsection S1S2" with data as "reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response

Scenario:Creating a main section
	Given User posts data as "name as Sitemap Section S3 and description as Testing reorder using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Section S3 for name and Testing reorder using sitemaps for description" should be in the response

Scenario:Creating a main section
	Given User posts data as "name as Sitemap Section S4 and description as Testing reorder using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Section S4 for name and Testing reorder using sitemaps for description" should be in the response

Scenario:Creating a main section
	Given User posts data as "name as Sitemap Section S5 and description as Testing reorder using sitemaps and show as True and private as False" to "testing.sharedemos.com:5000" edit page
	Then "Sitemap Section S5 for name and Testing reorder using sitemaps for description" should be in the response

Scenario:A playlist cannot be an independent identity
	Given user moves the playlist "Sitemap Playlist S1S1P1" into the subsection with data as "reorder as playlist"
	Then "404 NOT FOUND" as status should be in the response

Scenario:A demo cannot be an independent identity
	Given user moves the demo "Sitemap Demo S1S1P1D1" with data as "target_parent_slug as 0 and reorder as demo"
	Then status as "404" should be in the response

Scenario:Moving a playlist inside an empty section
	Given user moves the playlist "Sitemap Playlist S1S1P2" into an empty section with data as "target_parent_slug as sitemap-section-s3 and reorder as playlist"
	Then "200 OK" as status should be in the response

Scenario:Moving a subsection inside an empty section
	Given user moves the subsection "Sitemap Subsection S1S1" into a main section with data as "target_parent_slug as sitemap-section-s4 and reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response

Scenario:Moving a main section inside an empty section
	Given user moves the section "Sitemap Section S1" into an empty section with data as "target_parent_slug as sitemap-section-s5 and reorder as tree_reorder"
	Then "201 CREATED" as status should be in the response
