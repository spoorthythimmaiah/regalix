$(document).ready(function(){
    var mobileCheck = (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    $('#email').on('focus', function(){
        $('.field_status.'+this.id).remove();
    }).on('blur', function(){
        var check_url = $(this).val();
        var theForm = $('#acct-signin')[0];
        $('.field_status.'+this.id).remove();

        if($(this).val() == ""){
            $('<label class="field_status error ' + this.id + '"></label>').insertAfter(theForm.email);
        }else{
            var getResponseEmail = callAjax('GET', '/check-user', check_url);           
            if(getResponseEmail != undefined && getResponseEmail.message == 'NOT FOUND'){
                $('<label class="field_status error '+ this.id+'"></label>').insertAfter(theForm.email);
                return;
            }
            $('<label class="field_status success '+ this.id+'"></label>').insertAfter(theForm.email);
        }
    });

    $('.trim-input').on('focusout', function(event){
        event.currentTarget.value = $.trim(event.currentTarget.value);
    });

    $('.login-header .navbar-toggle').on('click', function() {
        $('.fixed-bg').toggleClass('slide');
    });

    if(mobileCheck) {
        $('.menu-item').on('click', toggleDeviceSubMenu)
    }else{
        $('.menu-item').on('mouseover mouseout', toggleDesktopSubMenu)
    }

});

// Ajax function to GET or POST.
function callAjax(requestType, requestURL, requestData){
    if(requestType == 'GET'){
        requestURL = requestURL + '/' + requestData;
        requestData = null;
    }
    var responseMsg;
    $.ajax({
        type: requestType,
        headers: {'X-CSRFToken': $("meta[name='csrf-token']")[0].content},
        async: false,
        url: requestURL,
        data: requestData,
        dataType: 'json',
        contentType: "application/json;",
        success: function(response_msg, status, jqXHR){
            responseMsg = response_msg;
        },
    });

    return responseMsg;
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkMainPassword(){
    var root = $('#newPwd');
    if((root).val().length >= 6){
        (root).parent().children('span').removeClass('incorrect');
        (root).parent().children('span').addClass('correct');
        return true;
    }
    (root).parent().children('span').removeClass('correct');
    (root).parent().children('span').addClass('incorrect');
    return false;
}

function checkRetypePassword(){
    var root = $('#reenterPwd');
    if((root).val() == $('#newPwd').val() && (root).val().length != 0){
        (root).parent().children('span').removeClass('incorrect');
        (root).parent().children('span').addClass('correct');
        return true;
    }
    (root).parent().children('span').removeClass('correct');
    (root).parent().children('span').addClass('incorrect');
    return false;
}

function validateForm(){
    return checkMainPassword() && checkRetypePassword()
}

function checkEmailAddress() {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(this.value)) {
        $('.forgot-email-block .reset-submit').addClass('active');
    }
    else {
        $('.forgot-email-block .reset-submit').removeClass('active');
    }
}

function toggleDeviceSubMenu(e) {
    var link = $(e.currentTarget);
    link.siblings().removeClass('show-submenu');
    link.toggleClass('show-submenu');
}

function toggleDesktopSubMenu(e) {
    var link = $(e.currentTarget);
    link.siblings().removeClass('show-submenu');
    if(e.type == 'mouseover') {
        link.addClass('show-submenu');
    }
    else {
        link.removeClass('show-submenu');    
    }
}


$(window).load(function(){
    $('#newPwd').on('keyup', checkMainPassword);
    $('#reenterPwd').on('keyup', checkRetypePassword);
    $('.email-addr input[type=email]').on('keyup', checkEmailAddress)
    if(window.location.search){
        $('#hash_url').val(window.location.hash);
    }
})