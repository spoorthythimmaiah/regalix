$(document).ready(function(){

	/* Events */
	$('.create_new_btn').on('click', createNew);
	$('.close_full_popup').on('click', closeFullPopup);
	$('[data-char-count]').on('keyup', inputCharLimit);

	$('.category-dd, .time-interval-dd, .custom_dropdown').click( function(event){
		$(event.currentTarget).children('.dd-menu').toggle();
	})
	$('body').click(function(event){
		if(!($(event.target).hasClass('category-dd') || $(event.target).hasClass('custom_dropdown') || $(event.target).hasClass('category') || $(event.target).hasClass('time-interval-dd') || $(event.target).hasClass('interval'))){
			$('.dd-menu').hide();
		}
	})
	$('ul.dd-menu').niceScroll({
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
	$('.activity-area .activity-filter , .new-user-block, #duplicateItemIn, #nav_menu').niceScroll();
	$('[data-toggle="popover"]').popover({
		html: true
	});
	$('#cutsom').on('click', function(){
		$('.time-interval-dd .interval').text("custom days");
		$(".time-interval-dd .dd-menu li").removeClass("active");
		$(this).addClass("active");
		$('.custome-date').show();
		$('.dd-menu').hide();
	})
	$('.search-category, .search-author, .search-action').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('selected')
	});

	$('.activity-feeds .hamburger').on('click', toggleFilter);

	updateProfilePic();
	$('.trim-input').on('focusout', function(event){
		event.currentTarget.value = $.trim(event.currentTarget.value);
    });
});

$(window).load(function(){
	overlaycalc();
});
$(window).resize(function(){
   overlaycalc();
});

function overlaycalc(){
	var wheight = $(window).height() - 150;
	$('.popup .settings , .new-user-block').css({
		"max-height": wheight
	});
}
// Update the profile pics in the dashboard, and in account-settings.
function updateProfilePic(){
	$.each($('.profile-img'), function(index, element){
		$(element).attr({
			'data-height': 34,
			"data-width": 34,
			"data-char-count": 2,
			"data-font-size": 14
		}).initial().css({'border-radius': '50px', '-moz-border-radius': '50px'});

		var pic_url = $(element).attr('picture-url');
		if(pic_url){
			var img = new Image();
			img.onload = function() {
				$(element).attr('src', pic_url);
			};
			img.src = pic_url;
		}
	});
}
function toggleFilter() {
	$(this).toggleClass('is-active');
	if($(this).hasClass('is-active')) {
		$('.activity-area').addClass('expanded');
	}
	else {
		$('.activity-area').removeClass('expanded');
	}
}

function createNew(e) {
	var popupName = $(this).data('form-name');
	showFullPopup(popupName);
}

function showFullPopup(popupName) {
	$('body').addClass('fixedHeight');
	$('.full_popup_block, .'+popupName).addClass('active');
	$('.'+popupName+', .full_popup_overlay').addClass('animated slideInUp');
	setTimeout(function(){
		$('.'+popupName+', .full_popup_overlay').removeClass('animated slideInUp');
	},500);
}

function closeFullPopup(e) {
	var popupName = $(e.currentTarget).data('popup');
	$('.'+popupName+', .full_popup_overlay').addClass('animated slideOutDown');
	setTimeout(function(){
		$('.'+popupName+', .full_popup_overlay').removeClass('animated slideOutDown');
		$('.full_popup_block, .'+popupName).removeClass('active');
	},500);
	// clear form data 
	var form = $(e.currentTarget).data('popup'); 
	if(form) {
		resetFullForm(form);
	}
	$('body').removeClass('fixedHeight');
}

function resetFullForm(formID) {
	$('#'+formID+'_'+'form')[0].reset();
	$('#'+formID+'_'+'form input[type=submit]').attr('disabled', 'disabled');
}

function inputCharLimit(e) {
	var totalLimit = $(this).attr('maxlength'); 
	var curLength = $(this).val().length; 
	var remainingLimit;
	if(curLength <= totalLimit) {
		remainingLimit = (totalLimit - curLength);
		$(this).siblings().find('.chars-left').text(remainingLimit);
	}
}