$(document).ready(function(){
	// Events
	var IS_TITLE_VALID = false;

	$('#create_library_form input').on('keyup', validateCreateLibrary);
	$('#create_library_form input[type=submit]').on('click', submitCreateLibrary);

	function validateCreateLibrary(e) {
		var formID = this.form.id;
		var fieldName = e.currentTarget;
		switch(fieldName.name) {
			case 'lib_title' : IS_TITLE_VALID = validateLibraryTitle(fieldName);
							   break;
		}
		if(IS_TITLE_VALID) {
			$('#'+formID+' input[type=submit]').removeAttr('disabled');
		}
		else {
			$('#'+formID+' input[type=submit]').attr('disabled', 'disabled');
		}
	}

	function validateLibraryTitle(fieldName) {
		var titleValue = fieldName.value;
		if(titleValue == '' || titleValue == undefined) {
			return false;
		}
		return true;
	}

	function submitCreateLibrary(e) {
		e.preventDefault();
		closePopup(e)
	}

});