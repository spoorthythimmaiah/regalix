function checkMainPassword(){
	var root = $('#main_pwd');
	if((root).val().length >= 6){
		(root).parent().children('label').removeClass('label incorrect');
		(root).parent().children('label').addClass('label correct');
		checkRetypePassword();
		return true;
	}
	checkRetypePassword();
	(root).parent().children('label').removeClass('label correct');
	(root).parent().children('label').addClass('label incorrect');
	$('#continueBtn').css("visibility", "hidden");
	return false;
}

function checkRetypePassword(){
	var root = $('#re_pwd');
	if((root).val() == $('#main_pwd').val() && (root).val().length != 0 && (root).val().length >= 6){
		(root).parent().children('label').removeClass('label incorrect');
		(root).parent().children('label').addClass('label correct');
		$('#continueBtn').css("visibility","visible");
		return true;
	}
	if((root).val().length == 0){
		(root).parent().children('label').removeClass('label correct');
		return false;
	}
	(root).parent().children('label').removeClass('label correct');
	(root).parent().children('label').addClass('label incorrect');
	$('#continueBtn').css("visibility", "hidden");
	return false;
}

function validateForm(){
	return checkMainPassword() && checkRetypePassword()
}

$(document).ready(function(){
	$('.fixed-left-nav').addClass('blurr');
	$('#nav_menu, #menu_footer').addClass('hide');

	$('#main_pwd').on('keyup', checkMainPassword);
	$('#re_pwd').on('keyup', checkRetypePassword);
})
