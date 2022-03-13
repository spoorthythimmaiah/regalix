$(document).ready(function(){
	/* Events */
	$('#upload_logo').on('change', uploadLogo);
	$('.create_brand_logo .close_full_popup').on('click', clearAddLogoForm);
	$('.view_options .glyphicon').on('click', switchView);
	$('#brand_images, #brand_icons').on('change', handleBrandImage);
	$('#show_about_popup').on('click', aboutPopup);

    renderLogos(document.logosList);
    var defaultColor = $('#company_color').data('color');
    $('#company_color').colpick({
        colorScheme:'light',
    	color: defaultColor,
    	flat: false,
    	onChange: function(hsb, hex, rgb, el, bySetColor) {
    		color = "#" + hex;
            $(el).css({
                "background" : color
            }).attr("data-color", color);
            $('.site_color').css({
                "background" : color
            });
            $('.color_code').html('#' + hex);
    	}
    });

	function uploadLogo(e) {
		$('.uploaded_file_details .error').remove();
		var file = e.currentTarget.files[0];
		//check file type 
		if(file.type.indexOf("image") == -1) {
			var errorMsg = "Please upload an image!";
			uploadError(errorMsg);
			return false;
		}
		// check for file size
		if (file.size > 1024*1024*2) {
			var errorMsg = "File size is too big";
			uploadError(errorMsg);
			return false;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#logo_preview, .mock_site_header img').attr('src', reader.result);
			$('#logo_preview, .mock_site_header img').css({'background':'none','max-width':200+'px'})
		}
		reader.readAsDataURL(file);
		$('.logo_file_name').html(file.name);
		$('#create_brand_logo_form input[type=submit]').removeAttr('disabled');
	}

	function uploadError(errorMsg) {
		var error = $('<div>').addClass('error').html(errorMsg);
		$('.uploaded_file_details').append(error);
	}

	function clearAddLogoForm(e) {
		$('.mock_site_header img, #logo_preview').removeAttr('style').attr('src','');
		$('.logo_file_name').empty();
		$('#create_brand_logo_form .error').remove();
		$('#create_brand_logo_form input[type=submit]').attr('disabled','disabled');
	}

	function switchView(e) {
		var selectedView = $(e.currentTarget).attr('id');
		var currentView = $('.work-area .current_view').attr('id');
		if(selectedView !== 'th_'+currentView) {
			$(e.currentTarget).addClass('active').siblings().removeClass('active');
			$('.work-area .current_view').attr('id', 'th_'+selectedView);
		}
	}

	function handleBrandImage(e) {
		var files = e.target.files;
		var date = 	new Date(); 
		for(var i=0,f; f = files[i]; i++) {
			
			// check if file is image
			var isImg = f.type.split('/')[0];
			if(isImg != 'image') {
				continue;
			}
			var reader = new FileReader();
			reader.onload = (function(f) {
				return function(e){
					// add 3 dots if name is too long
					var imgName = 	(f.name.length > 24) ? 
									(f.name.split('.')[0].substring(0, 22) + '...' + f.name.split('.')[1]) : 
									(f.name);
					var imgSrc 	= 	e.target.result;
					var imgDate =	(date.getMonth() + 1) + '-' +date.getDate() + '-' + date.getFullYear();
					var imgDOM 	= 	'<div class="item_details">\
		                 				<div class="item_type"><img src='+imgSrc+'></div>\
								   		<p class="item_name" title='+f.name+'>'+imgName+'</p>\
								   		<div class="item_options">\
									   		<span class="img_date">'+imgDate+'</span>\
			 						       	<span class="delete_item"></span>\
									   	</div>\
									</div>';
					$('.image_list').append(imgDOM);
				};
			})(f);	
			reader.readAsDataURL(f);
		}
	}

	function aboutPopup(e) {
		e.preventDefault();
		var about = $(e.currentTarget);
		about.toggleClass('active');
	}
});


function actionInProgress(target) {
	$('.' + target + ' .set-action-progress').addClass('slide-in is-submitted');
}

function actionSuccess(target, callback){
	setTimeout(function(){
        $('.' + target + ' .set-action-progress').removeClass("slide-in is-submitted");
        $('.' + target + ' .set-action-success').addClass("slide-in");
        setTimeout(function(){
            $('.' + target + ' .set-action-success').removeClass("slide-in");
            hideActionPopup(50);
            if(callback) callback();
        }, 1000);
    },1000)
}

function actionFailed(target, callback){
    setTimeout(function(){
        $('.' + target + ' .set-action-progress').removeClass("slide-in is-submitted");
        $('.' + target + ' .set-action-failed').addClass("slide-in");
        setTimeout(function(){
            $('.' + target + ' .set-action-failed').removeClass("slide-in");
            hideActionPopup(50);
            if(callback) callback();
        }, 1000);
    }, 1000);
}


function changeDefaultLogo(e){
	var defaultLogoPath = $(e.currentTarget).attr('data-attr');
	formData = new FormData();
	formData.append('csrf_token', $('form input[name="csrf_token"]').val());
	formData.append('path', defaultLogoPath);
	actionInProgress('default-popups');
	$.ajax({
		url: '/dashboard/brand/',
		type: 'PUT',
		dataType: "json",
		data: formData,
		processData: false,
		contentType: false,
		success: function(response){
			actionSuccess('default-popups', function(){renderLogos(response.logosList)});
		},
		error: function(response){
			actionFailed('default-popups');
		}
	});
}

function deleteLogo(e){
	var defaultLogoPath = $(e.currentTarget).attr('data-attr');
	formData = new FormData();
	formData.append('path', defaultLogoPath);
	actionInProgress('default-popups');
	$.ajax({
		url: '/dashboard/brand/',
		type: 'DELETE',
		headers: {
            "X-CSRFToken": $('form input[name="csrf_token"]').val(),
        },
		data: formData,
		processData: false,
		contentType: false,
		success: function(response){
			actionSuccess('default-popups', function(){renderLogos(response.logosList)});
		},
		error: function(response){
			actionFailed('default-popups');
		}
	});
}

function hideActionPopup(delay) {
	setTimeout(function(){
		$('.default-popups-overlay').addClass("bounceOutUp");
		setTimeout(function(){
	        $(".default-popups, .default-remove-popup").hide();
	        $(".default-popups-overlay").removeClass("bounceOutUp");
	    }, 300);
	    $('.set-action-progress, .set-action-success, .set-action-failed').removeClass('slide-in');
	    $('.default-adding').removeClass('is-submitted');

		// Remove the 'click' event from the action-btn.
		$('.default-popups .popup-footer .cancel-footer .set-action-btn').off('click');
	}, delay);
}

function renderLogos(logosList){
	if(!logosList.length) {
		return;
	}
	var templateHead = `<div class="item_details_header">
	                    	<span class="item_name_header">Name</span>
	                    	<span class="item_status">Status</span>
	                	</div>`;
	var templateBody = ``;

	// 'Default' logo should be at first.
	var newList = []
	$.each(logosList, function(i, logo){
		if(typeof(logo) == 'string') logo = $.parseJSON(logo);
		if(logo.isDefault) newList.unshift(logo);
		else newList.push(logo);
	});

	// Build the template by iterating the response data.
	$.each(newList, function(index, logo){
		templateBody += `<div class="item_details">
                			<div class="item_type">
                				<img src="/static/media/` + logo.path + `">
                			</div>
            				<p class="item_name" title="` + logo.name + `">` + logo.name + `</p>
            				<div class="item_options">`;
        if(logo.isDefault){
        	templateBody += `<span class="make_default default">DEFAULT</span>`;
        }else{
        	templateBody += `<span class="make_default">MAKE DEFAULT</span>`
        }

        templateBody += `		<span class="delete_item"></span>
            				</div>
            			</div>`;
	});

	// Clear the old records and render new data.
	var currentView = $('.work-area .current_view').attr('id');
	$('#' + currentView).empty();
	$('#' + currentView).html(templateHead+templateBody);

	// Re-assign event-handlers.
	$('.item_options .make_default:not(.default)').on('click', function(e){
		// Show MAKE DEFAULT popup.
		var defaultLogoPath =  $(e.currentTarget).parent().siblings('.item_type').children('img').attr('src');
		defaultLogoPath = defaultLogoPath.replace('/static/media/', '');
		var popupText = {title: 'MAKE DEFAULT',
			 			 info: 'Would you like to make this logo as default?',
			 			 setActionBtn: 'SET AS DEFAULT',
			 			 dataAttr: defaultLogoPath,
			 			 progress: 'SETTING...',
			 			 success: 'SETTING SUCCESSFULL!',
			 			 failed: 'OOPS! SETTING FAILED'};
		showActionPopup(e, popupText, changeDefaultLogo);
	});

	$('.item_options .delete_item').on('click', function(e){
		var logoPath =  $(e.currentTarget).parent().siblings('.item_type').children('img').attr('src');
		logoPath = logoPath.replace('/static/media/', '');
		// Show DELETE LOGO popup.
		var popupText = {title: 'REMOVE LOGO',
			 			 info: 'This logo is part of your library. <br> Are you sure you want to remove this?',
			 			 setActionBtn: 'DELETE',
			 			 dataAttr: logoPath,
			 			 progress: 'DELETING...',
			 			 success: 'DELETED SUCCESSFULLY!',
			 			 failed: 'OOPS! DELETE FAILED'};
		showActionPopup(e, popupText, deleteLogo);
	});
}

function showActionPopup(e, popupText, eventHandler) {
	$('.default-popups').css({"display": "table"});
	$('.default-popups, .default-popup-block').show();
	$(".default-popups-overlay").addClass("bounceInDown");
	$('.set-action-failed').removeClass('slide-in');

	$('.default-popups .popup-title').text(popupText.title);
	$('.default-popups .popup-info ').html(popupText.info);

	// Assign the text, attr, and eventHandler to the action-btn
	$('.default-popups .popup-footer .cancel-footer .set-action-btn')
				.text(popupText.setActionBtn)
				.attr('data-attr', popupText.dataAttr)
				.on('click', eventHandler);

	// Set only the text of the div without affecting the child DOM.
	$('.default-popups .popup-footer .set-action-progress').contents()[0].nodeValue = popupText.progress;

	$('.default-popups .popup-footer .set-action-success').text(popupText.success);
	$('.default-popups .popup-footer .set-action-failed').text(popupText.failed);

    setTimeout(function(){
        $(".default-popups-overlay").removeClass("bounceInDown");
    }, 300);
    $('.popup-footer .cancel-footer .cancel-btn').click(function(){
    	hideActionPopup(100);
    });
}