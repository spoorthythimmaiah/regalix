$(document).ready(function(){	
	$('#av_type').attr({'onclick':"hideShowEmbed()"});
	$('#embed_url').parentsUntil('fieldset').css({'display':'none'})
	});


//Function to hide or show embed text field 
function hideShowEmbed(){
	var dropDownVal = $('#av_type').val();
	if(dropDownVal == 'embed'){
		$('#av_resource').parentsUntil("fieldset").css({'display':'none'});
		$('#embed_url').parentsUntil('fieldset').css({'display':''})
	}
	else{
		$('#av_resource').parentsUntil("fieldset").css({'display':''});
		$('#embed_url').parentsUntil('fieldset').css({'display':'none'})
	}
}