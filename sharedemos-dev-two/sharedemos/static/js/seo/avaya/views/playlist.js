'use strict';

$(document).ready(function(){
    var localStorage = window.sessionStorage || window.localStorage;
    $(document).on('click', '.viewmore-chapters', (event)=>{
        $(event.currentTarget).prev().toggleClass('min-chapters');
    });
    $('[data-toggle]').click(function(){
        if(!$(this).hasClass('active')) {
            $('[data-toggle]').toggleClass('active');
            $('[data-attr=thumbnail-view], [data-attr=row-view]').toggle();
            let thumbnailId = $(this).attr('id');
            if (thumbnailId == 'playlist-thumbnail-view'){
                $('#vmw-playlist').addClass('playlist-thumbnail');
            }else{
                $('#vmw-playlist').removeClass('playlist-thumbnail');
            }
        localStorage.setItem('playlistView', thumbnailId);
        }
    });

    function playlistView(toggleValue,attrValue){
        $(`[data-toggle=${toggleValue}]`).addClass('active');
        $(`[data-attr=${attrValue}]`).toggle();
        if (toggleValue == 'thumbnail'){
            $('#vmw-playlist').addClass('playlist-thumbnail');
        }else{
            $('#vmw-playlist').removeClass('playlist-thumbnail');
        }
    }

    (() => {
        var seeMore = 'See More',
            showMore = '<div class="viewmore-chapters"></div>',
            readMore = '<span class="seemore-chapter-desc">' + seeMore + '</span>';

            var selectedView = localStorage.getItem("playlistView");
            let hasSinglePlaylist = $('main.container').attr('data-playlist');
            if (!selectedView){
                (hasSinglePlaylist == 'True')?
                playlistView('row','row-view'):playlistView('thumbnail','thumbnail-view');
                
            }else{
                (selectedView=='playlist-thumbnail-view')?
                playlistView('thumbnail','thumbnail-view'):playlistView('row','row-view');
            }

        $('[data-attr=thumbnail-view] .playlist-block').each(function(index){
            var playlistChapters  = $(this).find('ul');
            var chapterDesc   =  $(this).find('.chapter-desc');
            if(playlistChapters.height() > 185) {
                $(this).find('.chapters-list').addClass('min-chapters');
                $(this).find('.playlist-container').append(showMore);
            }
            if(chapterDesc.height() > 32) {
                $(chapterDesc).find('.min-chapter-desc').addClass('max-chapter-desc');
                $(chapterDesc).append(readMore);
            }
        });
    })()
})
