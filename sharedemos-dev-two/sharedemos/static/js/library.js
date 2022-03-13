$(document).ready(function(){

    $('#settingsBtn').on('click', function(){
        $('.general-settings').show();
    });
    $('.show_advanced_setting').on('click', function(){
        $('.general-settings').hide();
        $('.advanced-settings').show();
    });
    $('.show_general_setting').on('click', function(){
        $('.general-settings').show();
        $('.advanced-settings').hide();
    });
    // widget events
    $('#enable-announcement-widget').on('click', showAnnouncementWidgetForm);
    $('.add-widget-tag').on('click', addWidgetTag);
    $('.category-tags').on('click', '.tags .close', removeWidgetTag);
    $('form[name=site-widget]').submit(submitWidgetDetails);
    $('.trim-input').on('focusout', function(event){
        event.currentTarget.value = $.trim(event.currentTarget.value);
    });
    $('.widget-edit').on('click', editWidget);
    $('.home-widget-popup .cancel').on('click', cancelWidget);

    $('#create_library_form input').on('keyup', validateCreateEditLibrary);
    $('.edit-lib-title').on('click', function(e){showEditPopup($(this).data('form-name'))})
    
    $('#general-settings .cancel').on('click', function(){
        $("#general-settings input[name=name]").val(default_tenant_name);
        $("#general-settings input[name=domain]").val(default_domain);
        $("#general-settings input[name=is_private]").prop('checked', tenant_privacy);
        $("#general-settings input[name=title]").val(default_title);
        if($("#sd-logo-filename").length) {
            $("#sd-logo-filename").text(default_logo_name);
        }
        $("#sd-logo-preview").attr("src", default_logo_src);
        $("#sd-favicon-filename").text(default_favicon_name);
        $("#sd-favicon-preview").attr("src", default_favicon_src);
        $('#sd-logo-filename').removeAttr('style');
        $('#sd-favicon-filename').removeAttr('style');
    });

    $('.button.save, .button.continue').on('click', function(event){
        var title_color = $("input[name='title_color']:checked").val();
        $('<input>').attr({
            type: 'hidden',
            id: 'title_color',
            name: 'title_color',
            value: title_color,
        }).appendTo(this.form);
        var paragraph_color = $("input[name='paragraph_color']:checked").val();
        $('<input>').attr({
            type: 'hidden',
            id: 'paragraph_color',
            name: 'paragraph_color',
            value: paragraph_color,
        }).appendTo(this.form);
        validateForm(event);
    });

    $('.settings').niceScroll({
        horizrailenabled : false,
        cursorminheight : 20,
        hidecursordelay : 2000,
        autohidemode: false,
        railpadding : {
            top:0,
            right:3,
            left:0,
            bottom:0
        }
    });
    
    $('#box_integration').on('click', function() {
        if($(this).is(':checked')) {
            showBoxPopUp();
            $('.box-integration .adv-setting-toggle').addClass('active');
        }else{
            $('.box-integration .adv-setting-toggle').removeClass('active');
        }
    });
    $('.integration-block-footer .activate-box').on('click', function() {
        enableBoxIntegration();
    });
    $('.integration-block-footer .inactivate-box').on('click', function() {
        closeBoxPopUp();
    });

    $('.color').each(function() {
        var root = $(this);
        var curColor = $(this).data('color');
        root.colpick({
            layout:'hex',
            submit:0,
            colorScheme:'light',
            color: curColor,
            onChange:function(hsb,hex,rgb,el,bySetColor) {
                color = "#"+hex;
                $(el).css({
                    "background" : color
                })
                $(el).attr("data-color", color);
                var id = $(el).attr("id");
                $('input[name=' + id + ']').val(color);
                if ($(el).hasClass('color1')) {
                    $('.block.color1').css({
                        "background" : color
                    })
                } else if($(el).hasClass('color2')) {
                    $('.progress.color2').css({
                        "background": color
                    })
                } else if($(el).hasClass('color3')) {
                    $('.big.color3').css({
                        "background": color
                    })
                } else if($(el).hasClass('color4')) {
                    $('.small.color4').css({
                        "background": color
                    })
                };
            }
        });
    });
            

    $('.site-title, .site-description').keyup(function(){
        charCounter(event);
    });

    loadColors();
    if($('#home-title-counter').length) {
        $('#home-title-counter').text(50 - $('#welcomeId').val().length);
    }
    if($('#name-counter').length) {
        $('#name-counter').text(50 - $('#titleId').val().length);
    }
    if($('#description-counter').length) {
        $('#description-counter').text(150 - $('.site-description').val().length);
    }
    $('.activate-box').click(function(){
        $('#box_integration').attr('checked', true);
        $('.user-popups-overlay').addClass("bounceOutUp");
        setTimeout(function(){
            $(".user-popups, .box-integration-block").hide();
            $(".user-popups-overlay").removeClass("bounceOutUp");
        }, 300);
    });

    updateDemosSlidesCount();
    updateTenantLastUpdated();
});

function showEditPopup(popupName) {
    $('body').addClass('fixedHeight');
    $('.full_popup_block, .'+popupName).addClass('active');
    $('.'+popupName).addClass('animated bounceInDown');
    setTimeout(function(){
        $('.'+popupName).removeClass('animated bounceInDown');
    },500);
}

function showBoxPopUp() {
    $('.user-popups').css({"display": "table"});
    $('.box-integration-block').show();
    $(".user-popups-overlay").addClass("bounceInDown");
     setTimeout(function(){
        $(".user-popups-overlay").removeClass("bounceInDown");
    }, 300);
}

function closeBoxPopUp() {
    if($('#box_integration').is(':checked')) {
        $('.box-integration .adv-setting-toggle').removeClass('active');
        $('#box_integration').removeAttr('checked');
    }
    $('.user-popups-overlay').addClass("bounceOutUp");
    setTimeout(function(){
        $(".user-popups, .box-integration-block").hide();
        $(".user-popups-overlay").removeClass("bounceOutUp");
    }, 300);
}

function enableBoxIntegration() {
    $('.user-popups-overlay').addClass("bounceOutUp");
    setTimeout(function(){
        $(".user-popups, .box-integration-block").hide();
        $(".user-popups-overlay").removeClass("bounceOutUp");
    }, 300);
}

function loadColors(){
    var colors = ['.color1', '.color2', '.color3', '.color4'], i;
    for (i=1; i <= colors.length; i++){
        $('.color'+i+'').css({
            "background" : $('.color'+i+'[data-color]').attr('data-color')
        });
    }
}

function previewImage(event){
    var file_name = event.files[0].name;
    if (!(/\.(gif|jpg|jpeg|tiff|png|ico)$/i).test(file_name)) {              
        $('#' + event.id + '-filename').text("Select only image files").css({
            'color': 'red'
        });
        $('#' + event.id).val("");
        return false;
    }
    $('#' + event.id + '-filename').removeAttr('style');
    $(event).parents('.upload').addClass('image-added').find('#' + event.id + '-filename').text(file_name);
    $('#' + event.id + '-preview').attr('src', URL.createObjectURL(event.files[0]));
};

function removeSelectedImg(event) {
    var ele_name = event.id.replace('-', '_');
    $('input[type=hidden][name='+ ele_name +']').val("True");
    var ele_name = event.id.split('-')[1];
    $('input[type=file][name='+ ele_name +']').val("");
    $(event).parents('.upload').removeClass('image-added').find('.tenant-logo-block img').removeAttr('src');
    $(event).parents('.upload').find('.file-name').empty();
}

function validateForm(event){
    var siteTitle = $("#general-settings input[name=name]").val(),
        homePageTitle = $("#general-settings input[name=title]").val();

    if(!siteTitle){
        $('.error-msg.site-title').addClass('show-error-msg');
    } else {
        $('.error-msg.site-title').removeClass('show-error-msg');
    }
    if(!homePageTitle){
        $('.error-msg.homepage-title').addClass('show-error-msg');
    }
    else{
        $('.error-msg.homepage-title').removeClass('show-error-msg');
    }
    if(($('.error-msg').hasClass('show-error-msg'))){
        event.preventDefault();
    }

}

function charCounter(event){
    var maxChar = parseInt($(event.currentTarget).attr('maxlength'));
    if ($(event.currentTarget).val().length <= maxChar) {
        var leftChar = maxChar - $(event.currentTarget).val().length;
        $(event.currentTarget).parents('.blocks').find('.counter').text("("+leftChar+ " characters left)");
    }
}

function trimInput(event){
    event.currentTarget.value = $.trim(event.currentTarget.value);
}

function getCountSuffix(value, entity){
    if(value == 1){
        return value + ' ' + entity;
    }
    return value + ' ' + entity + 's';
}

function updateTenantLastUpdated(){
    // Convert server datetime to browser's specific localtime.
    if($('#tenant_updated').length) {
        var localTime = new Date(tenantUpdatedDatetime + " UTC");
        $('#tenant_updated').text("Last Updated: " + localTime.toLocaleDateString());
    }
}

function updateDemosSlidesCount(){
    // updates the Demo and Slide Counts in library
    $.ajax({
            url: '/api/dashboard',
            dataType: 'json',
            success: function(response){
                if(response){
                    var count = getCountSuffix(response.total_demos, 'Asset') + ' ' + getCountSuffix(response.total_slides, 'Slide');
                    $('.demo-details').text(count);
                }
            },
            error: function(){
                console.log('error')
            }
        });
}

function validateCreateEditLibrary(e) {
    var formID = this.form.id;
    var fieldName = e.currentTarget;
    var titleValue = fieldName.value;
    if(titleValue == '' || titleValue == undefined) {
        $('#'+formID+' input[type=submit]').attr('disabled', 'disabled');
    }
    else {
        $('#'+formID+' input[type=submit]').removeAttr('disabled');
    }
}

function submitCreateEditLibrary(e) {
    e.preventDefault();
    closeFullPopup(e);
}

/**
 * Common function to show popup
 */
function showPopup(popupName) {
    $(".dashboard-overlay").css({
        "display": "table"
    });
    $(".dashboard-overlay .popup-box." + popupName).show().addClass("bounceInDown");
     setTimeout(function(){
        $(".dashboard-overlay .popup-box." + popupName).removeClass("bounceInDown");
    }, 300);
}
/**
 * Common function to close popup
 */
function closePopup(popupName, showOverlay) {
    $(".dashboard-overlay ." + popupName).addClass("bounceOutUp");
    setTimeout(function(){
        $(".dashboard-overlay .popup-box." + popupName).hide().removeClass("bounceOutUp");
        if(!showOverlay) {
            $(".dashboard-overlay").hide();
        }
    }, 300);
}
/**
 * Display home widget popup
 */
    function showAnnouncementWidgetForm(event){
        let widgetId = $('#enable-announcement-widget').attr('data-id');
        if(event.currentTarget.checked && !widgetId) {
            $('.popup-box .popup-info').niceScroll();
            showPopup('home-widget-popup');
        }
    };

/**
 * Hide home widget popup
 */
    function cancelWidget(event){
        closePopup('home-widget-popup');
        let widgetId = $('#enable-announcement-widget').attr('data-id');
        $('#enable-announcement-widget').attr('checked', widgetId ? true: false);
    };

/**
 * add widget tag to list
 */
function addWidgetTag(event){
    var formName = $(event.currentTarget).closest('form').attr('name');
    var tagElement = $('form[name="' + formName +'"] .widget-tag');
    var tagText = tagElement.val();
    var tagsList = [];
    var availableTags = $('form[name="' + formName +'"] .category-tags ul li .tags');
    $.each(availableTags, function(index, elem){
        // slice x(remove close button) from available_tags textContent ex: vSANx to vSAN   
        tagsList.push(elem.textContent.slice(0,-1));
    });
    
    if (tagText.length != 0 && !tagsList.includes(tagText)) {
        var tagHtml = "<li>\
        <div class='tags' name='tags' value='" + tagText + "'>"+ tagText +"<span class='close'>x</span></div>\
        </li>";
        $('.category-tags ul').append(tagHtml);
    };
    // Clear the input tag, clear the suggestions list.
    tagElement.val("");
    $('form[name="' + formName +'"] .suggestion_tags ul').html("");
}

/**
 * Remove tag from widget
 */
function removeWidgetTag(event){
    $(event.currentTarget).parents("li").remove();
}

/**
 * submit widget details
 */
var announcementWidgetApiUrl = "/api/announcement-widget/?author=1";
function submitWidgetDetails(event){
    event.preventDefault();
    var showError = false;
    var currentFormName = $(event.currentTarget).attr('name');
    var formName = "form[name=" + currentFormName + "]"; 
    var widgetText = $(formName + " input[name='widget-link-text']");
    var widgetDescription = $(formName + " textarea[name='widget-description']");
    var resultPageTitle = $(formName + " input[name='result-page-title']");

    if (!widgetText.val()) {
        customErrorMessage('Provide a Link Text', $(widgetText).parent(), $(widgetText));
        showError = true;
    } else if (!$('.category-tags ul li').length) {
        customErrorMessage('Add atleast one tag', $('.category-tags').parent(), $('.widget-tag'));
        showError = true;
    } else if (!resultPageTitle.val()) {
        customErrorMessage('Provide a Page Title', $(resultPageTitle).parent(), $(resultPageTitle));
        showError = true;
    }

    if (showError || $(formName).attr("disabled")) return false;
    $(formName).attr('disabled', 'disabled');
    var allTags =[];
    var formData = new FormData();
    formData.append('title', widgetText.val());
    formData.append('description', widgetDescription.val());
    formData.append('result_title', resultPageTitle.val());
    $('.category-tags .tags').each(function() {
        allTags.push($(this).attr('value')); 
    });
    formData.append('tags', JSON.stringify(allTags));
    formData.append('widget_id', $('#enable-announcement-widget').attr('data-id'));
    formData.append('csrf_token', $("meta[name=csrf-token]").attr('content'));
    var widgetId = $('#enable-announcement-widget').attr('data-id');
    $('.edit-tool-tip').remove();
    $.ajax({
        url:announcementWidgetApiUrl,
        type: widgetId ? 'PUT' : 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(response){ 
            setTimeout(function(){
                actionSuccess('site-widget');
                $(formName).removeAttr('disabled');
                $('.widget-edit').attr('data-id', response.id).addClass('active');
                $('#enable-announcement-widget').attr('data-id', response.id);
            }, 1000);
        },
        error:function(){
            actionFailed('site-widget');
        }
    });
    actionInProgress('site-widget');
}

/**
 * Edit Widget details
 */
function editWidget(event){
    event.preventDefault();
    $.ajax({
        url: announcementWidgetApiUrl,
        type: 'GET',
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(response){
            showPopup('home-widget-popup');
            $('.category-tags ul').html("");
            $('[name="widget-link-text"]').val(response.title);
            $('[name="widget-description"]').val(response.description);
            $('[name="result-page-title"]').val(response.result_title);
            $.each(response.tags , function(index, value){
                $('.category-tags ul').append(
                    "<li>\
                    <div class='tags' name='tags' value='"+ value +"'>"+ value +"<span class='close'>x</span></div>\
                    </li>")
            })
        },
        error: function(response){
            console.log(response.message)
        }
    });
}

/**
 * Custom error messages
 */
function customErrorMessage(message, target, elem){
    $('.edit-tool-tip').remove();
    var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
    target.append(editToolTip);
    if(elem) elem.focus();
}

/**
 * On submit - Animate progress 
 */
function actionInProgress(target){
   $('.' + target + ' .adding').addClass("slide-in is-submitted");
}

/**
 * On submit - Failed
 */
function actionFailed(target){
    setTimeout(function(){
        $('.' + target + ' .adding').removeClass("slide-in is-submitted");
        $('.' + target + ' .failed').addClass("slide-in");
        setTimeout(function(){
            $('.' + target + ' .failed').removeClass("slide-in");
        }, 1000);
    }, 1000);
}

/**
 * On submit - success
 */
function actionSuccess(target){
    $('.' + target + ' .adding').removeClass("slide-in is-submitted");
    $('.' + target + ' .added').addClass("slide-in");
    setTimeout(function(){
        $('.' + target + ' .added').removeClass("slide-in");
        closePopup('home-widget-popup');
    }, 1000);
}