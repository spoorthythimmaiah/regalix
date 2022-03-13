$(window).load(function(){
    $('#newPwd').on('keyup', checkMainPassword);
    $('#reenterPwd').on('keyup', checkRetypePassword);
})

function checkMainPassword(){
    var root = $('#newPwd');
    if((root).val().length >= 6){
        if($('#reenterPwd').val().length){
            if($('#reenterPwd').val() == $('#newPwd').val()){
                (root).parent().children('label').removeClass('error').addClass('success');
                $('#reenterPwd').parent().children('label').removeClass('error').addClass('success');
                $('#submit').removeAttr('disabled').removeClass('disabled');
            }else{
                (root).parent().children('label').addClass('error').removeClass('success');
                $('#submit').attr('disabled', 'disabled').addClass('disabled');
            }
        }else{
            (root).parent().children('label').removeClass('error').addClass('success');
        }
    } else {
        (root).parent().children('label').addClass('error').removeClass('success');
        $('#submit').attr('disabled', 'disabled').addClass('disabled');
    }
}

function checkRetypePassword(){
    var root = $('#reenterPwd');
    if((root).val() == $('#newPwd').val() && (root).val().length != 0){
        (root).parent().children('label').removeClass('error').addClass('success');
        $('#submit').removeAttr('disabled').removeClass('disabled');
    }  else {
        (root).parent().children('label').addClass('error').removeClass('success');
        $('#submit').attr('disabled', 'disabled').addClass('disabled');
    }
}
