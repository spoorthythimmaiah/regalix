var theForm = document.forms[0];
var nameRegex = new RegExp("^[^\\\]\.\~\`\!\@\#\$\%\^\&\*\(\)\_\+\=\{\>\<\:\;\,\?\{\}\"/\\/ \|[ 0-9]+$"); // No Special chars except - (hyphen)
var emailRegex = /^([a-zA-Z0-9_\.\-])+$/;
var fullEmailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$(document).ready(function(){

	$('#firstName').on('blur', function(){
		fnameValidate(this);
	});
	$('#lastName').on('blur', function(){
		lnameValidate(this);
	});
	$('#email').on('blur', function(){
		emailValidate(this);
	});
	$('#confirmEmail').on('blur', function(){
		confirmEmailValidate(this);
	});
	$('#password').on('blur', function(){
		passwordValidate(this);
	});
	$('#confirmPassword').on('blur', function(){
		confirmPasswordValidate(this);
	});
	$('#fullemail').on('blur', function(){
		fullEmailValidate(this);
	});
});

function validateAccountForm() {
	var firstName = $('#firstName');
	var lastName = $("#lastName");
	var email = $('#email');
	var confirmEmail = $('#confirmEmail');		

    var validationStatus = fnameValidate(firstName[0]) &&
			      		   lnameValidate(lastName[0]) &&
			      		   emailValidate(email[0]) &&
			      		   confirmEmailValidate(confirmEmail[0]);
			      		   
	return validationStatus;
}

function fnameValidate(thisElement){
	removeErrorTags(thisElement);

	if($(thisElement).val() == undefined || !nameRegex.test($(thisElement).val())) {
        displaySignInErrorMsg(thisElement, theForm.firstName);
        return false;
    }
    displaySuccess(thisElement, theForm.firstName);
    return true;
}

function lnameValidate(thisElement){
	removeErrorTags(thisElement);

	if($(thisElement).val() == undefined || !nameRegex.test($(thisElement).val())) {
        displaySignInErrorMsg(thisElement, theForm.lastName);
        return false;
    }
    displaySuccess(thisElement, theForm.lastName);
    return true;
}

function emailValidate(thisElement) {
	removeErrorTags(thisElement);

	if($(thisElement).val() == undefined || !emailRegex.test($(thisElement).val())) {
        displaySignInErrorMsg(thisElement, theForm.email);
        return false;
    }

	displaySuccess(thisElement, theForm.email);
	return true;
}

function confirmEmailValidate(thisElement) {
	removeErrorTags(thisElement);

	if($(thisElement).val() !== $('#email').val() || $(thisElement).val() == "" ) {
    	displaySignInErrorMsg(thisElement, theForm.confirmEmail);
        return false;
    }
    displaySuccess(thisElement, theForm.confirmEmail);
    return true;
}

/* Signin validation */
function signinAccountForm() {
	var fullemail = $('#fullemail');
	var password = $('#password');		

    var signInValidationStatus = fullEmailValidate(fullemail[0]) &&
		      		   			 passwordValidate(password[0]);
			      		   
	return signInValidationStatus;
}

function fullEmailValidate(thisElement) {
	removeErrorTags(thisElement);

	if($(thisElement).val() == undefined || !fullEmailRegex.test($(thisElement).val())) {
        displaySignInErrorMsg(thisElement, theForm.fullemail);
        return false;
    }

	displaySuccess(thisElement, theForm.fullemail);
	return true;
}

function passwordValidate(thisElement) {
	removeErrorTags(thisElement);

	if($(thisElement).val() == undefined || $(thisElement).val() == "" ) {
        displaySignInErrorMsg(thisElement, theForm.password);
        return false;
    }
    displaySuccess(thisElement, theForm.password);
    return true;
}

/* Choose a Password */

function choosePassword() {
	var password = $('#password');
	var confirmPassword = $('#confirmPassword');		

    var signInValidationStatus = passwordValidate(password[0]) &&
                                 confirmPasswordValidate(confirmPassword[0]);
			      		   
	return signInValidationStatus;
}

function confirmPasswordValidate(thisElement) {
	removeErrorTags(thisElement);

	if($(thisElement).val() !== $('#password').val() || $(thisElement).val() == "" ) {
    	displaySignInErrorMsg(thisElement, theForm.confirmPassword);
        return false;
    }
    displaySuccess(thisElement, theForm.confirmPassword);
    return true;
}

// Reset Password validation
function ResetPassword() {
	var fullemail = $('#fullemail');

    var resetPasswordStatus = fullEmailValidate(fullemail[0])
			      		   
	return resetPasswordStatus;
}

/* show error or success icon */

function displaySignInErrorMsg(thisElement, afterElement){
    $('<label class="field_status error '+ thisElement.id+'"></label>').insertAfter(afterElement);
}

function removeErrorTags(thisElement){
	$('.field_status.'+thisElement.id).remove();
}

function displaySuccess(thisElement, afterElement){
	$('<label class="field_status success '+ thisElement.id+'"></label>').insertAfter(afterElement);
}