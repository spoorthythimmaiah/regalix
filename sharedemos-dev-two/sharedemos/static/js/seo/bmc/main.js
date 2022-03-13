$(document).ready(function () {

    $('.bmc-user-icon').on('click', () => {$('.bmc-nav-outer').toggleClass('logout-menu-active')});

    $('.black-overlay').on('click', () => {$('.bmc-nav-outer').removeClass('logout-menu-active')});

    $('.welcome-video-opener, .welcome-video-holder .hide-video-popup').on('click', () => {
        $body = $('body');
        $body.toggleClass('welcome-video-active');
        if($body.hasClass('welcome-video-active')){
            openWelcomeVideo();
        } else {
            closeWelcomeVideo();
        }
    });

    function openWelcomeVideo() {
        $('.welcome-video-holder .section-video').html(`<iframe class="popup-video" width="480" height="270" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" src="/static/media/bmc_helix_welcome_video_15Apr19.mp4" style="display: inline;"></iframe>`);
    }

    function closeWelcomeVideo() {
        $('.welcome-video-holder .section-video').html(``);
    }

    function playlistViewMore() {
        var seeMore = 'See More',
            showMore = '<div class="viewmore-chapters"></div>',
            readMore = '<span class="seemore-chapter-desc">' + seeMore + '</span>';


        $('[data-attr=thumbnail-view] .playlist-block').each(function (index) {
            var playlistChapters = $(this).find('ul');
            var chapterDesc = $(this).find('.chapter-desc');
            if (playlistChapters.height() > 185) {
                $(this).find('.chapters-list').addClass('min-chapters');
                $(this).find('.playlist-container').append(showMore);
            }
            if (chapterDesc.height() > 32) {
                $(chapterDesc).find('.min-chapter-desc').addClass('max-chapter-desc');
                $(chapterDesc).append(readMore);
            }
        });
    }

    if($('section.playlist-list').length){
        playlistViewMore();
    }
});