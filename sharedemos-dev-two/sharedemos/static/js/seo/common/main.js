// global variables
document.navigate_slide = true;

// Redirect and open below links in new tab
var redirectRules = {
    "featurewalkthrough.vmware.com": {
        "product": {
            "vrealize-suite": "vrealize.vmware.com",
            "vcenter-site-recovery-manager-1": "storagehub.vmware.com/t/site-recovery-manager-3/",
            "vmware-cloud-management-1": "vrealize.vmware.com/t/vmware-cloud-management/"
        },
        "section": {}
    }
}

function getId(link, isProduct){
    // read link and return product/section ID
    if(isProduct && document.product){
        return document.product
    }
    var _l = link.split('/').filter(function(i, idx){if (idx > 3) return i});
    if(isProduct)
        return _l[0]
    else if(_l.length > 1)
        return _l[1]
    return "/"
}

document.triggerAnalytics = function(){
    if(!document.requestParameters){
        var url = window.location.pathname;
        if(url.startsWith('/t/')){
            url = url.substr(2);
        }
        if(typeof ga != 'undefined'){
            ga('fwt_tracker.set', 'page', url);
            ga('fwt_tracker.send', 'pageview');
        }
        // VMWare tracking code
        if(window.s){
            window.s.pageURL = [document.location.origin, url].join("");
            window.s.tl();
        }
    }
}

function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
        if (el.style[t] !== undefined){
            return animations[t];
        }
    }
}
var animationEvent = whichAnimationEvent();

$(document).ready(function(){

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }

    $('.category-list-link, .category-link').click(function(e){
        // Load product/section links in new tab if redirect rule is available 
        e.preventDefault();
        if(redirectRules && redirectRules[window.location.host]){
            var src = redirectRules[window.location.host];
            var prdt = getId(e.currentTarget.href, true);
            var sctn = getId(e.currentTarget.href, false);
            if(src.product[prdt]){
                return window.open("//" + src.product[prdt], '_blank');
            }else if(src.section[sctn]){
                return window.open("//" + src.section[sctn], '_blank');
            }
        }

        window.location.href = e.currentTarget.href;
    })

    $('.asset-linked').click(function(event){
        var productID = $(event.currentTarget).attr('data-product-id');
        var sectionID = $(event.currentTarget).attr('data-section-id');
        if(!document.isOffline){
            var visit_args = {}
            if(productID) visit_args['product'] = productID;
            if(sectionID) visit_args['section'] = sectionID;
            $.ajax({
                type: 'POST',
                url: '/visit-activity',
                data: JSON.stringify(visit_args),
                dataType: 'json',
                contentType: "application/json"
            });
        }

    })

    document.triggerAnalytics();
    if (typeof jcf !== 'undefined' ) {
        jcf.replaceAll();
    }

    /* Events */
    $('.watch-videos').on('click', showVideoPopup);
    $('.cta-pdf-btn').on('click', downloadCtaPDF);
    $('.preview-media:not(.wistia)').on('click', previewBannerMedia);
    $('.hide-video-popup, .hide-media-popup').on('click', hideVideoPopup);

    $('.export-pdf').click(function(event){
        // Function to download Library content as PDF.

        // Object Destructuring method.
        let {playlistId, sectionSlug} = event.currentTarget.dataset;
        let url = `/export-to-pdf/${sectionSlug}`;
        // If event is at Playlist level.
        if (playlistId) url = `${url}/${playlistId}`;
        if (sectionSlug || playlistId) window.open(url);
    });

    $('.category-tags li, .playlist-tags li, .chapter-tags li').click(function(e){
        e.preventDefault();
        $("input[name=search-site]").focus().val('tags: ' + e.target.textContent).trigger('keyup');
    });
    $(document).on('click', '[data-overlay]', showOverlay)
    $('body').on('click', '[data-close]', closeOverlay);
    $('body').on('click', '.social-icon', shareLink);
    $('body').on('click', '.close-embed-url', hideEmbedURLBox);
    $('body').on('click', '[data-language-options] .lang-box', function(e){
        e.preventDefault();
        var locale = $(e.currentTarget).attr('lvalue');
        SDCookies.setItem('user_locale', locale, null, '/');
        window.location.reload();
    });
    $(document).on('click', '.seemore-chapter-desc', toggleChapterDesc);
    $(document).on('click', '.viewmore-chapters', toggleChaptersList);
    $(document).on('click', '.playerframe-link', showPlayerOverlay);
    $(document).on('click', '[attr-search-result]', loadPlayer);
    $(document).on('click', '.player-overlay-active .vmw-back-button', function(e){
        closePlayerOverlay(e, true);
    });
    $(document).on('click', '.player-loaded:not(.player-overlay-active) .vmw-back-button', redirectToParentSection);
    $(window).bind('popstate', function(e){
        if(history.state === null){
            closePlayerOverlay(e);
        }else if(!$('body').hasClass('player-overlay-active') && history.state.product && history.state.section && history.state.chapter){
            loadChapterInOverlay(history.state.product, history.state.section, history.state.chapter);
        }
    });
    $('.mobile-social-sharing').on('click', () => {
        $('.social-sharing').toggleClass('social-sharing-active');
    })

    function showPlayerOverlay(event) {
        event.preventDefault();
        var productID = $(event.currentTarget).data('product-id');
        var sectionID = $(event.currentTarget).data('section-id');
        var chapterID = $(event.currentTarget).data('chapter-id');
        document.product = productID;
        document.section = sectionID;
        loadChapterInOverlay(productID, sectionID, chapterID);
    }

    function loadChapterInOverlay(productID, sectionID, chapterID){
        var url = window.location.pathname;
        var ch_id = '/' + chapterID + '/'
        if(chapterID && [productID, sectionID].indexOf(chapterID) == -1 && url.lastIndexOf(ch_id) !== -1){
            url = url.substr(0, url.lastIndexOf(ch_id)) + '/'
        }
        document.old_url = url + window.location.search;
        $('.container-block').append('<div class="grayout"></div>');
        $('body').addClass('player-overlay-active');
        var createPlayerframeEl = $('<div class="main-playerframe-wrapper" id="block_container"></div>');
        $('.container-block').append(createPlayerframeEl);
        $(createPlayerframeEl).one(animationEvent, function() {
                $('.main-playerframe-wrapper').html('<img class="loading-icon" src="/static/images/vmware/loading.gif" />');
                // this is to change the  full url if accessed from any other page like from any apps
                document.initializePlayer({productID, sectionID, chapterID});
        });
    }

    function downloadCtaPDF(event){
        event.preventDefault(); 
        const {url, name} = event.currentTarget.dataset;
        const ctaFile = document.createElement('a');
        ctaFile.href = url;
        ctaFile.download = name;
        document.body.appendChild(ctaFile);
        ctaFile.click();
        document.body.removeChild(ctaFile); 
    }

    function loadPlayer(e){
        e.preventDefault();
        var chapter_link = $(e.currentTarget).attr('href');
        var link = chapter_link;
        link = link.split('/').filter(function(i, idx){return idx > 1})
        var productID, sectionID, chapterID;
        productID = link[0];
        if(link.length > 2){
            sectionID = link[1];
            chapterID = link[2]
        }else{
            sectionID = productID;
            chapterID = link[1]
        }
        document.old_url = window.location.pathname + window.location.search;
        $('.container-block').append('<div class="grayout"></div>');
        $('body').addClass('player-overlay-active');
        var createPlayerframeEl = $('<div class="main-playerframe-wrapper" id="block_container"></div>');
        $('.container-block').append(createPlayerframeEl);
        $(createPlayerframeEl).one(animationEvent, function() {
            $('.main-playerframe-wrapper').html('<img class="loading-icon" src="/static/images/vmware/loading.gif" />');
            // this is to change the  full url if accessed from any other page like from any apps
            document.initializePlayer({productID, sectionID, chapterID});
        });
    }

    function closePlayerOverlay(event, goback) {
        event.preventDefault();
        var playerframeWrapper = $('.main-playerframe-wrapper');
        $(playerframeWrapper).addClass('hide-playerframe');
        $(playerframeWrapper).one(animationEvent, function() {
            $(this).remove();
            $('body').removeClass('player-overlay-active player-loaded');
            $('.grayout').remove();
            if(goback){
                history.pushState(null, null, document.old_url)
            }
            if(SDCookies.getItem('user_locale') != document.current_locale){
                window.location.reload()
            }
        });
        // remove embed option flag set by playerframe for chapter
        document.can_embed = false;
        // update page name
        document.page = 'Playlist';
    }

    function redirectToParentSection(event) {
        event.preventDefault();
        const ele = $(event.currentTarget);
        let parentUrl = productId = ele.data("product-id");
        const sectionId = ele.data("section-id");
        if(sectionId != productId) parentUrl = parentUrl + '/' + sectionId;
        window.location = `${window.location.origin}/t/${parentUrl}`;
    }

    function showOverlay(event) {
        event.preventDefault();
        var popupTarget = $(event.currentTarget).data('overlay');
        var popupHTML = $($('#' + popupTarget).html());
        if(popupTarget == 'social-share'){
            if(document.can_embed && $('body').hasClass('player-loaded')){
                popupHTML.find('.copyembedurl').removeClass('hide');
            }
        }else if(popupTarget == 'language-translations'){
            popupHTML.find('[data-current-language] .lang-box').attr('lvalue', document.locales.selected.locale).text(document.locales.selected.name)
            var available_translations = JSON.parse(event.currentTarget.dataset.languageOptions);
            $.each(available_translations, function(count, l_id){
                var language = $.grep(document.locales.languages, function(l){
                    return l_id !== document.locales.selected.locale && l.locale == l_id
                })
                if(language.length){
                    popupHTML.find('[data-language-options]').append("<li><a href='javascript:;' class='lang-box' lvalue='" + language[0].locale + "'>" + language[0].name + "</a></li>")
                }
            })
        }
        $('.custom-popup-wrapper').html(popupHTML);
        $('.custom-popup-wrapper .custom-popup').addClass('popup-in');
        $(".custom-popup.popup-in").one(animationEvent, function() {
            $(this).niceScroll({cursorwidth: 7});
        });
    }

    function closeOverlay(event){
        var el = $(event.target).parents('.popup-in');
        $(el).getNiceScroll().remove();
        $(el).removeClass('popup-in').addClass('popup-out');
        $(el).one(animationEvent, function() {
            $('.custom-popup-wrapper').empty();
            $(el).removeClass('popup-out');
        });
    }

    function triggerGAevent(name, value){
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    }

    function shareLink(event) {
        var shareWith = $(event.currentTarget).attr('social-share'),
            url = encodeURIComponent(window.location.href),
            title = encodeURIComponent($('meta[property="og:title"]').attr("content")),
            summary = encodeURIComponent($('meta[property="og:description"]').attr("content")),
            getScreenWidth = window.outerWidth,
            width = 575,
            height = 400,
            left = (getScreenWidth - width) / 2,
            options = `width=${width},height=${height},top=${top},left=${left}`;

        var data = {
            'chapter_slug': $(".page-container .vmw-social-share").data("walkthrough-id"),
            'section_slug': document.section,
            'product_slug': document.product,
            'media_type': shareWith
        }
        $.ajax({
            type: 'POST',
            url: '/api/social-share',
            data: JSON.stringify(data),
            headers: {
            "X-CSRFToken": $('meta[name=csrf-token]').attr('content')
            },
            dataType: 'json',
            contentType: "application/json"
        });
        if(shareWith == "twitter") {
            window.open(`http://twitter.com/share?text=${title}&url=${url}`, 'twitter_share', `status=1,${options}`);
        } else if(shareWith == 'linkedin') {
            window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '',options);
        } else if(shareWith == 'facebook'){
            window.open(`http://www.facebook.com/sharer/sharer.php?&u=${url}&title=${title}`, 'facebook_share', options);
        } else if(shareWith == 'reddit'){
            window.open(`http://www.reddit.com/submit?url=${url}&title=${title}`, 'reddit_share', options);
        } else if(shareWith == 'copyurl'){
            if($('.copyurl').hasClass('active')) return;
            $('.copyurl').addClass('active');
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(window.location.href).select();
            document.execCommand("copy");
            $temp.remove();
            $('.copyurl .title').text('URL Copied!');
            setTimeout(function(){
                $('.copyurl .title').text('Copy URL');
                $('.copyurl').removeClass('active');
            },1000);
        } else if(shareWith == 'copyembedurl'){
            var sectionId = $(".page-container .vmw-social-share").attr("data-section-id"),
                productId = $(".page-container .vmw-social-share").attr("data-product-id"),
                walkthroughId = $(".page-container .vmw-social-share").attr("data-walkthrough-id"),
                demoPath  = sectionId + '/' + walkthroughId;
            if(sectionId != productId) demoPath = productId + '/' + demoPath;
            var embedUrl = '<iframe width="900" height="600" src="' +
                            window.location.origin +
                            '/embed/' + demoPath +
                            '"frameborder="0" allowfullscreen style="border: 1px solid #e7ecf2;"></iframe>';
            $(".embed-url-box .embedURL").html($('<input>',{type: 'text', val: embedUrl}));
            $(".custom-popup.popup-in").animate({scrollTop: 250},'slow');
            showEmbedURLBox();
       }
    }

    function hideEmbedURLBox() {
        $(".embed-url-box").removeClass('slide-down');
    }

    function showEmbedURLBox() {
        $(".embed-url-box").addClass('slide-down');
        $(".embed-url-box .embedURL input").select();
    }

    function toggleChapterDesc(event) {
        var target = $(event.currentTarget);
        ($(target).prev().hasClass('max-chapter-desc'))?$(target).text('See Less'):$(target).text('See More');
        $(target).prev().toggleClass('max-chapter-desc');
    }

    function toggleChaptersList(event) {
        var target = $(event.currentTarget);
        $(target).prev().toggleClass('min-chapters');
    }

    function previewBannerMedia(event) {
        $('body').addClass('show-videos');
        if ($('.preview-media').hasClass('media-src-added')) return;
        let imgSource = $('.image-link').data('img-link');
        let imgEle =  `<img  class="popup-image popup-media" src="${imgSource}" alt="banner-image" />`;
        $('.image-link').after(imgEle);
        $('.preview-media').addClass('media-src-added');

    }

    function showVideoPopup(e) {
        let videoSlider =  $('.video-slider');
        $('body').toggleClass('show-videos');
        $.each($('.video-link'), (index, element)=> {
            let mediaSource;
            if ($(element).data('video-link')) {
                mediaSource = $(element).data('video-link');
                index === 0 && (mediaSource = `${mediaSource}&autoplay=1`);
                let iframeEle =  `<iframe class="popup-video popup-media"
                                    src="${mediaSource}"
                                    width="480" height="270" frameborder="0"
                                    webkitallowfullscreen mozallowfullscreen allowfullscreen>
                                </iframe>`;
                $(element).after(iframeEle);
            }else if ($(element).data('img-link')) {
                mediaSource = $(element).data('img-link');
                let imgEle =  `<img class="popup-image popup-media" src="${mediaSource}" />`;
                $(element).after(imgEle);
            }
        });
        initializeSudoSlider();
        $('.popup-media').show();
        if($('.slidesContainer li.slide').length > 1) {
            videoSlider.addClass('multiple-vid');
        }
        else {
            $('#video-slider-block .controls').remove();
            videoSlider.removeClass('multiple-vid');
        }
    }

    function initializeSudoSlider() {
        $(".video-slider").sudoSlider({
            touch : true,
            prevNext : false,
            responsive : true,
            numeric:true,
            effect : "slide ",
            customLink : 'div.customLink, button.customLink',
            afterAnimation: (event)=> {
                $.each(this.$('iframe.popup-video'), (index, element)=> {
                    let source = $(element).attr('src').replace('&autoplay=1', '');
                    $(element).attr('src', source);
                });
            }
        });
    }

    function hideVideoPopup() {
        $('body').removeClass('show-videos');
        $('#video-slider-block .controls').remove();
        $('iframe.popup-media').remove()
    }

    // Rating Feature
    $(document).on('mouseover', `.section.content-rating li,
                                 .chapter.content-rating li`, selectRating);
    $(document).on('mouseout', `.section.content-rating li,
                                .chapter.content-rating li`, deSelectRating);
    $(document).on('keyup', `#rating-feedback .feedback-text`, updateCharCount);
    $(document).on('click', `.section.content-rating li,
                             .chapter.content-rating li`, rateContent);
    $(document).on('click', '#rating-feedback .submit', function(){submitRating()});
    $(document).on('click', '#rating-feedback .cancel', popupClose);

    function selectRating(event){
        $('.content-rating li').removeClass("star-rated");
        $(event.target).prevAll("li").addBack().addClass("is_selected");
    }

    function deSelectRating(event){
        $(".content-rating li").removeClass("is_selected star-rated");
        let rating = $(event.target).parent("ul").attr("data-stars");
        if(rating){
            $(`.content-rating li:nth-child(${parseInt(rating)})`)
            .prevAll("li").addBack().addClass("star-rated");               
        }
    }

    function updateCharCount(event){
        var maxChar = parseInt($(event.currentTarget).attr('maxlength'));
        let charCount = $(event.currentTarget).val().length;
        if (charCount){
            $(event.target).parent().find('.error-msg').hide();
        }
        if (charCount <= maxChar) {
            var leftChar = maxChar - charCount;
            $(event.currentTarget).parents('.popup-body').find('span[data-counter]').text(leftChar);
        }
    }

    function updateContentRating(currentRating, entity){
        $(`.${entity}.content-rating li`).removeClass("star-rated");
        currentRating = Math.round(currentRating);
        $(`.${entity}.content-rating`).attr('data-stars', currentRating);
        $(`.${entity}.content-rating li:nth-child(${currentRating})`)
            .prevAll('li')
            .addBack()
            .addClass("star-rated");
    }

    function popupShow(entity){
        document.navigate_slide = false;
        $('.custom-popup-wrapper').html($($('#rating-popup').html()));
        $('.custom-popup-wrapper .custom-popup').addClass('popup-in');
        $('#rating-feedback').attr("data-target", entity);

    }
    function popupClose(){
        document.navigate_slide = true;

        $('#rating-feedback .error-msg').hide();
        $('#rating-feedback .feedback-text').val('');

        let entity = $("#rating-feedback").attr("data-target");
        let rating = $(`.${entity}.content-rating`).attr("prev-rating");
        updateContentRating(parseInt(rating) || 0, entity);
        $("#rating-popup").parents('.popup-in').removeClass("popup-in").addClass("popup-out");
        $('.custom-popup-wrapper').empty();
    }

    function rateContent(event) {
        let currentRating = parseInt($(event.target).attr("id"));
        let entity = 'section';
        if($(event.target).parent().attr("data-target") == 'chapter') entity = 'chapter';
        $(`.${entity}.content-rating`).attr("current-rating", currentRating);
        if (currentRating < 5){
            updateContentRating(currentRating, entity);
            popupShow(entity);
        } else{
            submitRating(entity);
        }
    }
    function validateRating(entity){
        if(!entity) entity = $("#rating-feedback").data("target");
        let currentRating = $(`.${entity}.content-rating`).attr('current-rating'),
            comment = $("#rating-feedback .popup-body .feedback-text").val();
        if(currentRating < 5 && !comment.trim()) {
            $("#rating-feedback .error-msg").show();
            return false;
        }
        $(`.${entity}.content-rating-block label`).show();
        $(`.${entity}.content-rating-block .content-rating`).hide();
        return {
            'rate_value': currentRating,
            'comment': comment,
            'chapter_slug': $(`.chapter.content-rating`).attr("chapter_id"),
            'section_slug': document.section,
            'product_slug': document.product,
            'entity': entity
        }

    }

    function submitRating(entity){
        var data = validateRating(entity);
        if(data) {
            $.ajax({
                type: 'POST',
                url: '/api/rate-content',
                data: JSON.stringify(data),
                headers: {
                "X-CSRFToken": $('meta[name=csrf-token]').attr('content')
                },
                dataType: 'json',
                contentType: "application/json",
                success: function(response){
                        popupClose();
                        setTimeout(() => {
                            $(`.content-rating-block label`).hide();
                            $(`.content-rating-block .content-rating`).show();
                        }, 2000);
                        updateContentRating(data['rate_value'], data['entity']);
                        $(`.${data['entity']}.content-rating`).attr("prev-rating", data['rate_value']);
                },
                error: function(error){
                    $('#rating-feedback .submit').addClass('error').text("something went wrong");
                },
            });
        }
    }
});
