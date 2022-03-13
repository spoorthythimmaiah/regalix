 $(document).ready(function() {
    widthsettings();
    $('.menu:not(a[href=#])').click(function() {                        
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            $('.menu').removeClass("active");
            $(this).addClass("active");
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                exact_s = target.offset().top;
                $('html,body').animate({
                    scrollTop : exact_s
                }, 1000, function() {
                });
                return false;
            }
        }
    });

    $('#home-logo').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

$(window).resize(function(){
    widthsettings();
});

function widthsettings(){
    var windowheight = $(window).height();
    $('.login-wrapper, .price-wrapper, .explore-wrapper').css('min-height', windowheight);
    var videoheight = $(".video-bg1").height() ;
    if (windowheight > videoheight) {
        $('video').removeClass("video-width");
        $('video').addClass('video-height');                                       
    }else{
        $('video').removeClass("video-height");
        $('video').addClass('video-width');
    };
}