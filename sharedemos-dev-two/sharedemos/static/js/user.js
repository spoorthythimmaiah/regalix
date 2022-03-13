$(document).ready(function(){

	// Add User button, '+' button.
	$(document).on('click', '.dashboard-users .add-new-user', function(){
		showUserPopup('newPopupSave', 'ADD USER');
		var activeElement = $('.usertypes a.active');
		if(activeElement.hasClass('user-authors')){
			$('.new-user-block input[user-group-id=2]').prop('checked', true);
		}
		else if(activeElement.hasClass('user-analysts')){
			$('.new-user-block input[user-group-id=3]').prop('checked', true);
		}
		else if(activeElement.hasClass('user-viewers')){
			$('.new-user-block input[user-group-id=4]').prop('checked', true);
		}
		else{
			$('.new-user-block input[user-group-id=1]').prop('checked', true);
		}
	});

	// Edit button on user profile.
	$(document).on('click', '.dashboard-users .user-edit', function(){
		showUserPopup('editPopupSave','EDIT USER');
		editUserData(this);
	});

	// Add, Edit UserForm Popup cancel button.
	$(document).on('click', '.popup-footer .user-form-footer .cancel', function(){
		$('.user-form-footer .save').removeAttr('id email'); // Clear out IDs.
		$('.error-fields').text(""); // Clear error msgs.
		localStorage.removeItem('SELECTED_CATEGORIES'); // Clear selected categories.
		localStorage.removeItem('REMOVE_ALL');
		$('.auth_cat_restriction').text('Select Categories');
		$('.user-popups-overlay').addClass("bounceOutUp");
		setTimeout(function(){
	        $(".user-popups, .user-add-popup").hide();
	        $(".user-popups-overlay").removeClass("bounceOutUp");
	    }, 300);
	    $('#addUserForm')[0].reset(); // Reset the form.
	});

	// Save button on New, Edit Popuup.
	$(document).on('click', '#newPopupSave', function(event){
		saveUserDetails(event, 'new');
	});
	$(document).on('click', '#editPopupSave', function(event){
		saveUserDetails(event, 'update');
	});

	// Remove button on user profile.
	$(document).on('click', '.user-activity .user-remove', function(){
		showDeletePopup(this);
	});
	// Delete button on DELETE USER Popup.
	$(document).on('click', '.del-cancel-footer .delete', function(){
		deleteUser(this);
	});
	$(document).on('click', '.permission-radio', function(event){
		showHideSelectCategories($(event.currentTarget).attr('user-group-id'));
	});
	// Authoring restriction by section
	$(document).on('click', '.auth_cat_restriction', function(){
		displayCategoryTree(this);
	});
	$(document).on('click', '.select_cat_footer .cancel', function(){
		hideCategoryTree(this);
	});
	$(document).on('click', '#category_list .expandSection', function(){
		toogleProdTreeNavigation(this);
	});
	$(document).on('click', '#category_list input[type=checkbox]', function(){
		addRemoveCatSelection(this);
	});
	$(document).on('click', '.auth_select_done.save.active', function(){
		saveSelectedCategories(this);
	});
	
	$('.user-pic img').each(function(idx, image){
		$(image).attr({
            'data-height': 34,
            "data-width": 34,
            "data-char-count": 2,
            "data-font-size": 14
        }).initial().css({'border-radius': '50px', '-moz-border-radius': '50px'});
        var pic_url = $(image).attr('picture-url');
        if(pic_url){
            var img = new Image();
            img.onload = function() {
                $(image).attr('src', pic_url);
            };
            img.src = pic_url;
        }
	});

	$('.trim-input').on('focusout', function(event){
        event.currentTarget.value = $.trim(event.currentTarget.value);
    });

    localStorage.removeItem('SELECTED_CATEGORIES'); // Clear selected categories.
    localStorage.removeItem('REMOVE_ALL');

    // On 'keyup' validate user input fields
    $('#addUserForm .trim-input').on('keyup', function(event){
    	validateInputFields(event);
    });

});


function validateInputFields(event){
	var inputField = $(event.currentTarget);
	var fieldName = inputField.attr('name');
	if(fieldName == 'first_name' || fieldName == 'last_name'){
		var nameRegex = new RegExp("^[^\\\]\.\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\{\>\<\:\;\,\?\{\}\"\[ 0-9]+$"); // Only Alphabets characters.
		var errorElementName = $('.error-fields.name');
		if(!nameRegex.test(inputField.val())){
			errorElementName.addClass('Error').text(" Names cannot have numbers or space or special characters");
		}else{
			errorElementName.removeClass('Error').text("");
		}
	}else if(fieldName == 'email'){
		var emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
		var errorElementEmail = $('.error-fields.email');
		if(!emailRegex.test(inputField.val())){
			errorElementEmail.addClass("Error").text(" Enter a valid email address ");
		}else{
			errorElementEmail.removeClass('Error').text("");

		}
	}
}

// Create a From Data to send via POST, PUT, DELETE requests.
function getFormData(newEmail, firstName, lastName, userGroupId){
	formData = new FormData();
	formData.append('csrf_token', $('.user-add-popup input[name="csrf_token"]').val());
	formData.append('email', newEmail);
	formData.append('first_name', firstName);
	formData.append('last_name', lastName);
	formData.append('role_id', userGroupId);
	return formData
}

// Prefill user data on the edit-form popup, when Edit button is clicked.
function preFillUserData(response){
	$('.new-user-block .user-first-name').val(response.first_name);
	$('.new-user-block .user-last-name').val(response.last_name);
	$('.new-user-block .user-email').val(response.email).prop('disabled', true);
	$('.new-user-block input[type=radio]:checked').removeAttr('checked');
	$('.new-user-block input[user-group-id='+response.role_id+']').prop('checked', true);
	showHideSelectCategories(response.role_id);
}

// Display the Popup, when New, Edit button clicked.
function showUserPopup(saveElementID, popupTitleText) {
	$('.new-user-block .user-email').prop('disabled', false);
	$('.user-popups').css({"display": "table"});
	$('.user-form-footer .save').attr('id', saveElementID); // Assign ID to Save button.
	$('.user-add-popup .popup-title').text(popupTitleText); // Change Title for NEW and EDIT
	$('.user-add-popup').show();
	$(".user-popups-overlay").addClass("bounceInDown");
     setTimeout(function(){
        $(".user-popups-overlay").removeClass("bounceInDown");
    }, 300);
}

// Remove the popups new, edit with some delay.
function removePopUpWithDelay(delay){
	$('.user-popups-overlay').addClass("bounceOutUp");
	setTimeout(function(){
        $(".user-popups, .user-add-popup, .user-popups, .user-remove-popup").hide();
        $(".user-popups-overlay").removeClass("bounceOutUp");
        $('.error-fields').removeClass("Error");
        $('.error-fields').text("");
        $('.user-adding , .new-user-added, .new-user-failed').removeClass('slide-in');
    }, delay);
	$('#addUserForm')[0].reset();
}

// Makes AJAX call to GET the Data using email;
function getUserData(email){
	$.ajax({
		url: '/api/user',
		type: 'GET',
		data: {'email': email},
		dataType: "json",
		success: function(response, status, xhr){
			preFillUserData(response);
		},
		error: function(response_status){
			console.log('GET ERROR' + response_status);
		},
	});
}

// Calls Ajax GET, and prefills the Edit Popup form.
function editUserData(thisElement){
	var email = $(thisElement.parentElement).attr('user-email'); // Gets the email to fetch data.
	if($(thisElement).hasClass('resend-invite')){
		$('.user-form-footer .save').attr('resend-invite', true);	// Assigns resend status to Save button for PUT.
	}
	getUserData(email);
	$('.user-form-footer .save').attr('email', email); // Assigns email to Save button for PUT.
}

function saveUserDetails(event, type){
	event.preventDefault();
	var requestType = (type=='new')?'POST':'PUT';
	var firstName = $('.new-user-block .user-first-name').val(),
		lastName = $('.new-user-block .user-last-name').val(),
		newEmail = $('.new-user-block .user-email').val(),
		userGroupId = parseInt($('.new-user-block input[type=radio]:checked').attr('user-group-id'));

	var usersData = getFormData(newEmail, firstName, lastName, userGroupId);
	if($(event.currentTarget).attr('resend-invite')){
		usersData.append('resend_invite', true);
	}
	if(userGroupId == 2){
		var selectedCategories = JSON.parse(localStorage.getItem('SELECTED_CATEGORIES')) || [];
		usersData.append('sections', JSON.stringify(selectedCategories));
		usersData.append('remove_restrictions', JSON.stringify(localStorage.getItem('REMOVE_ALL') || 'false'));
	}
	validateFormCallAjax(requestType, usersData, newEmail, userGroupId);
}

// New, Edit UserForm Validation and calls ajax POST or PUT.
// Throws an Error,
//  	if name, email fields are empty,
// 		if name fields contains special characters,
//		if email exists in DB.
function validateFormCallAjax(requestType, usersData, newEmail, userGroupId){
	var firstName = $('.new-user-block .user-first-name').val(),
		lastName = $('.new-user-block .user-last-name').val(),
		errorElementName = $('.error-fields.name'),
		errorElementEmail = $('.error-fields.email'),
		emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
		nameRegex = new RegExp("^[^\\\]\.\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\{\>\<\:\;\,\?\{\}\"\[ 0-9]+$"); // Only Alphabets characters.

	if(firstName == "" || lastName == ""){
		errorElementName.addClass('Error').text(" * fields cannot be empty");
		return;
	}
	else if(!nameRegex.test(firstName) || !nameRegex.test(lastName)){
		errorElementName.addClass('Error').text(" Names cannot have numbers or space or special characters");
		return;
	}
	else{
		errorElementName.removeClass('Error').text("");
	}

	if(requestType == 'PUT'){
		errorElementEmail.removeClass('Error').text("");
		callAjax(requestType, usersData, newEmail, firstName, lastName, userGroupId);
		return;
	}

	if(newEmail == ""){
		errorElementEmail.addClass("Error").text(" * fields cannot be empty");
		return;
	}
	else if(!(emailRegex.test(newEmail))){
		errorElementEmail.addClass("Error").text(" Enter a valid email address ");
		return;
	}
	else{
		$.ajax({
			url: '/api/user',
			type: 'GET',
			data: {'email': newEmail},
			dataType: "json",
			success: function(response){
				if(response.email){
					errorElementEmail.addClass('Error').text("User with this Email exists !");
				}
				else if(response.re_add){
					errorElementEmail.removeClass('Error').text("");
					usersData.append('re_add', true);
					callAjax(requestType, usersData, newEmail, firstName, lastName, userGroupId);
				}
				else{
					errorElementEmail.removeClass('Error').text("");
					callAjax(requestType, usersData, newEmail, firstName, lastName, userGroupId);
				}
			},
			error: function(){
				errorElementEmail.addClass('Error').text("Error !");
			}
		});
	}
}

// Performs Ajax POST or PUT
// requestType - POST, PUT
function callAjax(requestType, usersData, newEmail, firstName, lastName, userGroupId){
	$('.user-adding').addClass('slide-in');
	$.ajax({
		url: '/api/user',
		type: requestType,
		data: usersData,
		processData: false,
		contentType: false,
		dataType: "json",
		success: function(response){
			if(requestType == 'POST'){
				$('.user-adding').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
					$('.new-user-added.new').addClass('slide-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
						removePopUpWithDelay(600);
					});
				});
				window.location.reload();
			}
			else if(requestType == 'PUT'){
				$('.user-adding').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
					$('.new-user-added.edited').addClass('slide-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
						removePopUpWithDelay(600);
					});
				});
				window.location.reload();
			}
			localStorage.removeItem('SELECTED_CATEGORIES'); // Clear selected categories.
			localStorage.removeItem('REMOVE_ALL');
			$('.auth_cat_restriction').text('Select Categories');
		},
		error: function(response_status){
			$('.user-adding').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.new-user-failed').addClass('slide-in');
			});
			removePopUpWithDelay(1800);
		},
	});
}

// Displays the Delete User Popup.
function showDeletePopup(thisElement) {
	$('.user-popups').css({"display": "table"});
	$(".user-popups, .user-remove-popup").show();
	$('.user-remove-popup').show();
	$('.user-remove-popup .del-cancel-footer').attr('user-email', $(thisElement.parentElement).attr('user-email'));
	$(".user-popups-overlay").addClass("bounceInDown");
	$('.delete-failed').removeClass('slide-in');
    setTimeout(function(){
        $(".user-popups-overlay").removeClass("bounceInDown");
    }, 300);
    $('.popup-footer .del-cancel-footer .cancel').click(function(){
    	removeDeletePopup(100);
    });
}
// Removes the Delete User Popup.
function removeDeletePopup(delay) {
	setTimeout(function(){
		$('.user-popups-overlay').addClass("bounceOutUp");
		setTimeout(function(){
	        $(".user-popups, .user-remove-popup").hide();
	        $(".user-popups-overlay").removeClass("bounceOutUp");
	    }, 300);
	    $('.delete-progress, .delete-success, .new-user-added.deleted, .delete-failed').removeClass('slide-in');
	    $('.user-adding').removeClass('is-submitted');
	}, delay);
}
// Ajax DELETE request, when Delete button on Delete User Popup is clicked.
function deleteUser(thisElement){
	$('.delete-progress').addClass('slide-in');
	var email = $(thisElement.parentElement).attr('user-email');
	var usersData = getFormData(email);
	$.ajax({
		url: '/api/user/',
		type: 'DELETE',
		headers: {
            "X-CSRFToken": $('.user-add-popup input[name="csrf_token"]').val()
        },
        data: usersData,
		processData: false,
		contentType: false,
		success: function(response_status){
			$('.delete-progress').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.delete-success').addClass('slide-in');
			});
			window.location.reload();
		},
		error: function(response_status){
			$('.delete-progress').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.delete-failed').addClass('slide-in');
			});
			removeDeletePopup(1800);
		},
	});
}

function showHideSelectCategories(userGroupId){
	if(userGroupId != 2){
		$('.auth_cat_restriction').hide();
	}else{
		$('.auth_cat_restriction').show();
	}
}

// Authoring restriction by section
function displayCategoryTree(event) {
	this.$('.select_auth_cat').show();
	this.$('#category_list').html('<div class="auth_loading"></div>');
	this.$('.user-add-popup').hide();
    this.$('#category_list').niceScroll();
    var userEmail = $('.new-user-block .user-email').val();
    var root = this;
    $.ajax({ 
    	type: 'GET',
    	url: '/api/product-tree?author=1&get_draft=1&user=' + userEmail,
        success: function(data){
            if(data.length) {
                root.getImportableData(data, 'category_list', 'product', 0)
            }
            root.$('.grey_layout_bg').removeClass('active');
            root.$('.auth_loading').remove();
            if(root.$('#category_list input[type=checkbox]:checked').length){
		        root.$('.select_cat_footer .save').addClass('active');
		    }else{
		        root.$('.select_cat_footer .save').removeClass('active');
		    }
        },
        error: function(response_status){
			console.log('GET ERROR' + response_status);
		},
    });
}
function hideCategoryTree() {
	$('.select_auth_cat').hide();
	$('.user-add-popup').show();
}

function saveSelectedCategories(thisElement){
	hideCategoryTree();
	var selectedCategoriesList = $('#category_list .parentblock.selected ').parent();
	var slugsList = [];
	if(selectedCategoriesList.length){
		selectedCategoriesList.each(function(index, ele){
			slugsList.push(ele.id);
			localStorage.setItem('SELECTED_CATEGORIES', JSON.stringify(slugsList));
		});
		var auth_selected_text = (selectedCategoriesList.length > 1)? ('' + selectedCategoriesList.length + ' categories selected') : ('1 category selected'); 
		$('.auth_cat_restriction').text(auth_selected_text);
		localStorage.setItem('REMOVE_ALL', JSON.stringify(false));
	}else{
		localStorage.setItem('REMOVE_ALL', JSON.stringify(true));
	}
}

function getImportableData(data, appendTo, type, leftSpace) {
    leftSpace += 20;
    var elem_id, elem_value, icon, appendData;
     
    for(var i=0; i<data.length; i++){
        // Disable duplicate of links. 
        if(type == "playlist"){
            elem_id = appendTo + '-' + data[i].playlist_id;
            elem_value = data[i].playlist_id;
            icon = 'playlistIcon';
        }else if(type == "product" || type == "section"){
            elem_id = elem_value= data[i].slug;
            icon = 'expandSection';
        }else if(type == "demo"){
            elem_id = elem_value = data[i].slug;
            icon = 'demoIcon';
        }

        appendData = '<li data-item="' + type + '" id=' + elem_id + '>';
        var isSelected = false;
        if(type == 'product'){
    		// Check if the 'Product' is already marked as not-editable or get it from previously selected.
    		isSelected = !data[i].can_edit;
    		if(!isSelected){
	    		var selectedCatList = JSON.parse(localStorage.getItem('SELECTED_CATEGORIES')) || [];
	    		$.each(selectedCatList, function(index, ele){
	    			if(ele == elem_id){
	    				isSelected = true;
	    				return;
	    			}
	    		});
    		}
        }
        appendData += '<div style="padding-left:' + leftSpace + 'px" class="parentblock';
        appendData += (isSelected)? ' selected">' :'">';
        // Display select checkbox only for Products.
        if(type == "product"){
        	appendData += '<input type="checkbox" id="cb-' + elem_id + '" class="css-checkbox" value="' + elem_value + '" entity="' + type + '"';
        	appendData += (isSelected)? 'checked >' :'>';
        	appendData += '<label for="cb-' + elem_id + '" class="css-label"></label>';
        }
        appendData += '<span class="' + icon + '"></span>';
        appendData += '<span class="siteMapTitle">' + data[i].name + '</span>';
        appendData += '</div>';
        appendData += '</li>';

        $(document.getElementById(appendTo)).append(appendData);

        // Don't populate for links.
        if(data[i].children && !data[i].link){
            this.getImportableData(data[i].children, elem_id, "section", leftSpace);
        }else if(data[i].playlists){
            this.getImportableData(data[i].playlists, elem_id, "playlist", leftSpace);
        }else if(data[i].demos){
            this.getImportableData(data[i].demos, elem_id, "demo", leftSpace);
        }
    }
}
function toogleProdTreeNavigation(event) {
    var icon = this.$(event);
    if(icon.hasClass('expanded')) {
        icon.removeClass('expanded');
        icon.parent().siblings('li').hide();
    }
    else {
        icon.addClass('expanded');
        icon.parent().siblings('li').show();
    }
}
function addRemoveCatSelection(event) {
    var elem = this.$(event);
    var childElem = elem.closest('li').find('li .css-checkbox');
    var chilListElem = elem.closest('li').find('li div');
    
    if(elem.is(':checked')) {
        childElem.prop('checked', true);
        childElem.attr('disabled', true);
        elem.parent().addClass('selected');
        chilListElem.removeClass('selected')
    } else {
        childElem.prop('checked', false);
        childElem.attr('disabled', false);
        elem.parent().removeClass('selected');
        chilListElem.removeClass('selected');
    }
    this.$('.select_cat_footer .save').addClass('active');
}

function keyTypeCheck(event){
    var charCode = (event.keyCode ? event.keyCode : event.which);
    // Allow only numbers, Return, Backspace keys.
    return charCode == 13 || charCode >= 48 && charCode <= 57 || charCode == 8;
}