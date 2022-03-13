$(document).ready(function(){
    
    $('body').on("click", '.ripple, .rippleEffect', function(event){    
    	var ripple, rippleBox, d, x, y;
        rippleBox = $(event.currentTarget);
        if(rippleBox.find(".ripple-effect").length == 0) rippleBox.prepend("<span class='ripple-effect'></span>");
        rippleBox.removeClass('.animate');
        ripple = rippleBox.find(".ripple-effect");
        if(!ripple.height() && !ripple.width())
            {
                d = Math.max(rippleBox.outerWidth(), rippleBox.outerHeight());
                ripple.css({height: d, width: d});
           }
        x = event.pageX - rippleBox.offset().left - ripple.width()/2;
        y = event.pageY - rippleBox.offset().top - ripple.height()/2;
        ripple.css({top: y+'px', left: x+'px'}).addClass("animate");
        setTimeout(function(){
            ripple.remove();
        }, 600);            
    })

})
