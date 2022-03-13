$(document).ready(function(){
	if(! document.isAuthor){
		$('#content_menu li').removeClass('active');
		$('#content_menu').addClass('disabled');
		$('#home-icon').attr('href', '/dashboard/library/reports')
	}

	$('.trim-input').on('focusout', function(event){
        event.currentTarget.value = $.trim(event.currentTarget.value);
    });
    /* activity settings profile pic upload */
	$('.profile_upload_btn').on('change', function(event) {
		validateProfilePic(event);
	});

	/* validate profile form */

	$('#profile-settings').submit(function(event) {
		event.preventDefault();
		$('.errorMsg').remove();
		var fName = this.fname;
		var lName = this.lname;
		var email = this.email;
		var emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
			nameRegex = new RegExp("^[^\\\]\.\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\{\>\<\:\;\,\?\{\}\"\[0-9]+$"); // Only Alphabets characters.

		if(fName.value == '' || !nameRegex.test(fName.value)) {
			fName.focus();
			var error_msg = "Please provide proper first name";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(fName);
			return false;
		}
		else if(lName.value && !nameRegex.test(lName.value)) {
			lName.focus();
			var error_msg = "Please provide proper last name";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(lName);
			return false;
		}
		else if(!emailRegex.test(email.value)) {
			email.focus();
			var error_msg = "Please provide a valid email address";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(email);
			return false;
		}
		// Final check to see if the image has been validated, since image.load() is triggered only when an image is loaded completely.
		if($('.upload_profile_pic').attr('error')){
			$(".upload_profile_pic").append('<div class="errorMsg">File size should not exceed max limit!!</div>')
			return false;
		}

		var formData = getFormData();

		var ppic = $('form[name=profile-settings] :file')[0].files[0];
		if(ppic){
			formData.append('profile_pic', ppic);
		}
		$.ajax({
			url: '/api/user',
			type: 'PUT',
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(response){
				window.location.href = "/dashboard/";
			},
			error: function(response){
				if(response.responseJSON && response.responseJSON.message == 'NAME_ERROR'){
					$('<div class="errorMsg">Error - Enter your names properly</div>').insertBefore($('.save').parent());
				}else{
					console.log(response.statusText);
				}
			}
		});
	});

	/* Acoount password settings */ 
	$('#password-settings').submit(function(event) {
		event.preventDefault();
		$('.errorMsg').remove();
		var password = this.password;
		var new_password = this.new_password;
		var confirm_new_password = this.confirm_new_password;

		if(password.value == '') {
			password.focus();
			var error_msg = "Please provide your current password";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(password);
			return false;
		}
		else if(new_password.value == '') {
			new_password.focus();
			var error_msg = "Please provide your new password";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(new_password);
			return false;
		}
		else if(confirm_new_password.value == '' || confirm_new_password.value !== new_password.value ) {
			confirm_new_password.focus();
			var error_msg = "Passwords do not match!";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter(confirm_new_password);
			return false;
		}
		if(password.value.length < 6 || new_password.value < 6 || confirm_new_password.value < 6){
			var error_msg = "Password should be greater than 6 characters";
			$('<div class="errorMsg">'+error_msg+'</div>').insertAfter($('#password'));
			return false;
		}
		var formData = getFormData();
		formData.append('old_pwd', this.password.value);
		formData.append('new_pwd', this.new_password.value);
		var root = this;
		$.ajax({
			url: '/api/user',
			type: 'PUT',
			data: formData,
			processData: false,
			contentType: false,
			dataType: 'json',
			success: function(response){
				window.location.href = "/dashboard/";
			},
			error: function(response){
				if(response.responseJSON.message == 'NO_MATCH'){
					password.focus();
					$('<div class="errorMsg"> Current Password Error</div>').insertAfter(password);
					return false;
				}else if(response.responseJSON.message == 'NAME_ERROR'){
					$('<div class="errorMsg">Error - Enter your names properly</div>').insertAfter(root);
				}
			}
		});
	}); 

	$('#email-settings').submit(function(event) {
		event.preventDefault();
	});

	function getFormData(){
		var formData = new FormData();
		formData.append('csrf_token', $('#profile-settings input[name="csrf_token"]').val());
		formData.append('email', $('#email').val());
		formData.append('first_name', $('#fname').val());
		formData.append('last_name', $('#lname').val());
		return formData;
	}

	function validateProfilePic(event) {
		$('.errorMsg').remove();
		var media = event.target.files[0];
		if(!media || !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(media.name)) {
			var media_error_msg = 'File type not supported!!';
			$(".upload_profile_pic").append('<div class="errorMsg">'+media_error_msg+'</div>');
			return false;
		}
		var image = new Image();
		image.src = URL.createObjectURL(media);
		$(image).load(function(){
			if(this.height > 500 || this.width > 500){
				var media_error_msg = 'File size should not exceed max limit!!';
				$(".upload_profile_pic").append('<div class="errorMsg">'+media_error_msg+'</div>').attr('error', 'ImgError');
			}
			else{
				$('#pp-img').remove();
				$('.upload_profile_pic').removeAttr('error');
				$('.profile_pic_img').html('<img id="pp-img" src="'+ URL.createObjectURL(media) +'">');	
			}
		});
	}
});
