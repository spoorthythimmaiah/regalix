import _ from 'underscore';
import $ from 'jquery';
import jcf from 'jcf';
import Backbone from 'backbone';
import Common from '../../tenant/common';
import EmbedPlayList from '../models/embed_playlist';
import WalkthroughActivity from '../../tenant/models/activity';
import SlideView from '../../tenant/views/slide';
import PdfView from '../../pdf_viewer/views/pdf_viewer';
import PlayerTemplate from '../templates/embed_player.handlebars';
import 'utils';
import 'jquery.sudoslider';
import 'bootstrap';
import 'jcf.scrollable';

const PlayerView = Backbone.View.extend({

    el: '#block_container',

    template: PlayerTemplate,

    events: {
        //player events
        'click .fade':(event) => {Common.toggleFade(this, event)},
        'click .customLink[target=prev]': 'gotoPrevSlide',
        'click .customLink[target=next]': 'gotoNextSlide',
        'scroll_slide .hotspot': 'scrollSlide',
        'click .notes_opener:not(.disabled)': 'toggleNotes',
        'click .pin-opener': 'toggleDropPin',
        'click .demo-links:not(.active)': 'loadNextDemo',
        'click .expore_more': 'explorePlaylist',
        'click .side-info-opener .icon:not(.disabled)': 'toggleSideMenu',
        'click .fullscreen': 'toggleFullScreen',
        'click .popup-footer .cancel': 'closePopup',
        'click .pagination li:not([data-page="new"]), .pagination-wrap .page-next, .pagination-wrap .page-prev':(event) => {Common.setPaginationNotes(this, event)},
        'click .notes-link':(event) => {Common.showNotesLinkPopup(this, event)},
        'click .note-popup-close':(event) => {Common.closeNotesLinkPopup(this, event)},
        'click .fr-view img':(event) => {Common.showImagePopup(this, event)},
        'click .image-popup-close':(event) => {Common.closeImagePopup(this, event)}
    },

    initialize (attrs) {
        $(window).on('resize', {'root': this}, this.onWindowResize);
        this.$el.html('<img class="loading" src="/static/images/loading.gif" />');
        this.listenTo(Backbone, 'launch_pdf', data => this.pdfviewer && this.pdfviewer.launchPdfViewer(data));
        const {demo, section, product} = attrs;
        this.walkthrough_id = demo;
        this.section_id = section;
        this.product_id = product;
        this.progress = 0;
        this.demo_completed = false;
        this.load();
    },

    load(){
        this.embed_playlist = new EmbedPlayList({id: this.walkthrough_id})
        $.when(this.embed_playlist.fetch()).done((data, textStatus, xhr)=>{
            this.walkthrough = data.current_playlist.current_walkthrough_details;
            this.data = data;
            this.render();
        }).fail((attrs, textStatus, xhr)=>{
            console.log(attrs, textStatus, xhr);
            this.$el.html(
                '<img class="err_img" src="/static/images/broken-img-2.png">\
                <div class="error_spage_text">\
                <h1>Oops! Something went wrong.<br>The page you are looking for couldn’t be found.</h1>'
            )
        })  
    },

    render(){
        $('body').addClass('player-loaded');
        var template_vars = {
            'walkthrough': {
                'name': this.walkthrough.name,
                'slug': this.walkthrough.slug,
                'next_walkthrough': this.walkthrough.next_walkthrough
            },
            'currentPlaylist': this.data.current_playlist,
            'currentDemo': this.data.current_playlist.current_walkthrough_details,
        };
        if(this.data.next_playlist){
            template_vars['nextPlaylist'] = this.data.next_playlist;
        }
        this.$el.html(this.template(template_vars));
        Common.transition('next');

        let hasPdf = _.some(
            this.walkthrough.slides,
            function(slide) {
                return slide.primary_resource.type === "pdf";   
            });
        if(hasPdf) this.pdfviewer = new PdfView();
        this.slide_views = new Array();
        _.each(this.walkthrough.slides, this.addSlide, this);

        if(this.slide_views && this.slide_views.length){
            var cover_image;
            var first_slide = this.slide_views[0].slide;
            if(first_slide){
                if(first_slide.primary_resource && first_slide.primary_resource.type == 'image'){
                    cover_image = first_slide.primary_resource.path;
                }else if(first_slide.secondary_resource && first_slide.secondary_resource.type == 'image'){
                    cover_image = first_slide.secondary_resource.path;
                }
            }
            utils.setSEOData(this.walkthrough.name, window.location.href, first_slide.text, cover_image)
        }

        this.walkthroughActivityList = [];
        this.TIME_SPENT = $.now();
        _.each(this.walkthrough.slides, this.addWalkthroughActivity, this);

        this.progress = this.getDemoProgress();
        if(this.progress == 0) Common.triggerGAevent('Player', 'Topic Start');
        
        Common.CURRENT_SLIDE = Common.CURRENT_SLIDE || 1;
        this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;
        
        this.initializeSudoSlider(Common.CURRENT_SLIDE);

        Common.checkSlideAndLogActivity(this);
        
        this.updateSlideCount();
        
        if(this.slide_views && this.slide_views.length){
            var cover_image;
            var first_slide = this.slide_views[0].slide;
            if(first_slide){
                if(first_slide.primary_resource && first_slide.primary_resource.type == 'image'){
                    cover_image = first_slide.primary_resource.path;
                }else if(first_slide.secondary_resource && first_slide.secondary_resource.type == 'image'){
                    cover_image = first_slide.secondary_resource.path;
                }
            }
        }
        this.setPlayerArea();
        
        Common.logVisitActivity(this.product_id, this.section_id, this.walkthrough_id);
        this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].setSlideNotes();

        // showHide Player Title on scroll
        var lastScrollTop = 0;
        this.$('.player_wrap').on('scroll', function(){
            var scrollTop = $(this).scrollTop();
            var minHeight = 10;
            (scrollTop > lastScrollTop && scrollTop > minHeight) ? $(this).addClass('hideTitle') : $(this).removeClass('hideTitle');
            lastScrollTop = scrollTop;
        });
        this.$('.playlist-wrap').on('scroll',()=>{
            this.embedPlaylistHeaderPosition();
        });
        jcf.replaceAll();            
    },

    onWindowResize(e) {
        var root = e.data.root;
        if (root.isInFullscreen()) {
            if(!this.$('#player-container').hasClass('fullscreen-active')) {
                root.prepareFullscreen();
            }
        } else if(this.$('#player-container').hasClass('fullscreen-active')) {
            root.returnFromFullscreen();
        }
        root.setPlayerArea();
        root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();
    },

    getDemoProgress(){
        var slides_visited = _.reject(this.slide_views, function(slide) {
            return !slide.user_visited;
        });
        return Math.round(((slides_visited.length || 0) / (this.slide_views.length || 1)) * 100);
    },

    addSlide(data) {
        data.tenant = this.data.tenant;
        var view = new SlideView({data: data});
        this.slide_views.push(view);
        this.$('.player_slider #sdemos-player-box').append(view.el);
    },

    addWalkthroughActivity(slide){
        this.walkthroughActivityList.push(
            new WalkthroughActivity({
                slide_index: slide.order,
                walkthrough: this.walkthrough_id,
                section: this.section_id,
                product: this.product_id})
            );
    },

    initializeSudoSlider(current_slide) {
        var root = this;
        this.sudoSlider = this.$(".player_slider").sudoSlider({
            startSlide: current_slide,
            touch : true,
            prevNext : false,
            responsive : true,
            speed: Common.SLIDE_TRANSITION_SPEED,
            effect: Common.SLIDE_TRANSITION_EFFECT,
            customLink : 'div.customLink',
            initCallback() {        
                var actualCurSlide = Common.CURRENT_SLIDE             
                Common.CURRENT_SLIDE = root.sudoSlider.getValue('currentSlide');
                root.toggleNavigationArrows();
                if(!root.slide_views.length) return
                root.loadSlideAssets(Common.CURRENT_SLIDE);
                root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].flashHotspot();
                root.checkSlideVideo();
                root.checkImageAudioAndPlay(actualCurSlide);
                root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].addSandboxLoader(root);
            },
            beforeAnimation(next_slide_number) {
                if(!root.slide_views.length) return
                Common.CURRENT_SLIDE = next_slide_number;
                root.loadSlideAssets(Common.CURRENT_SLIDE);
                root.mediaPause();
                root.slide_views[Common.CURRENT_SLIDE-1].animateGif();
                $(root.slide_views[Common.CURRENT_SLIDE-1].el).find('.delay-hotspot').hide();
            },
            afterAnimation() {
                root.toggleNavigationArrows();
                root.checkSlideVideo();
                root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].flashHotspot();
                root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].setSlideNotes();
                root.updateSlideCount();
                root.checkImageAudioAndPlay();
                setTimeout(()=>{
                    root.adjustPlaylistWidth();
                },1000);
                root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].addSandboxLoader(root);
                Common.checkSlideAndLogActivity(root);
                $(root.slide_views[Common.CURRENT_SLIDE-1].el).find('.delay-hotspot').show();
                jcf.replaceAll()
            }
        });            
    },

    checkImageAudioAndPlay(actualCurSlide) {
        var cur_slide = actualCurSlide ? actualCurSlide : Common.CURRENT_SLIDE;
        var current_slide = this.$(`#slider${cur_slide}`);
        if(current_slide.parent().children().hasClass('image_with_audio') && (!current_slide.parent().find('.audio-control').hasClass('autoplayed'))) {
            this.slide_views[cur_slide-1].playAudio();
        }
    },

    loadSlideAssets(current_slide){
        var current_slide_index = current_slide - 1;
        this.showOrHideNotes();
        this.slide_views[current_slide_index].loadAsset();
        // Get previous slide
        var prev_slide_index = current_slide_index - 1;
        if(prev_slide_index > 0){
            this.slide_views[prev_slide_index].loadAsset();
        }
        // Get next slide
        var next_slide_index = current_slide_index + 1;
        if(this.slide_views && next_slide_index <= this.slide_views.length - 1){
            this.slide_views[next_slide_index].loadAsset();
        }
    },

    toggleNavigationArrows(){
        if(this.slide_views && this.slide_views.length){
            if(this.slide_views.length == 1 && Common.CURRENT_SLIDE == 1 ){
                (this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource.type == 'sandbox') ? this.$(".customLink[target=prev]").addClass('disabled'): this.$(".customLink[target=prev], .customLink[target=next]").addClass('disabled');
            }else if(this.slide_views.length == Common.CURRENT_SLIDE){
                if (this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource.type != 'sandbox') {
                    this.$(".customLink[target=next]").addClass('disabled');
                }
                this.$(".customLink[target=prev]").removeClass('disabled');
            }else if(Common.CURRENT_SLIDE == 1){
                this.$(".customLink[target=next]").removeClass('disabled');
                (this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource.type === 'sandbox') ? this.$(".customLink[target=prev]").removeClass('disabled') : this.$(".customLink[target=prev]").addClass('disabled');
            }else if(this.slide_views.length !== Common.CURRENT_SLIDE) {
                this.$(".customLink[target=prev], .customLink[target=next]").removeClass('disabled');
            }
        }
    },

    gotoNextSlide(event) {
        if($(event.currentTarget).hasClass('disabled')) return;

        var resource = this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource;

        /* navigation for sandbox slide */
        if (resource.type == 'sandbox' && this.slide_views[Common.CURRENT_SLIDE-1].checkAndNavigateSandboxFrame('next')) return;

        var length = this.$(".source-area ul li.slide").length;
        var complete = parseInt(Common.CURRENT_SLIDE / length);
        var next_slide_idx = parseInt(Common.CURRENT_SLIDE) + 1;
        this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;
        if (complete) {
            this.toggleNavigationArrows();
        } else if(this.slide_views && (next_slide_idx <= this.slide_views.length)) {
            this.toggleNavigationArrows();
            this.moveToSlide(Common.CURRENT_SLIDE+1);
        };
    },

    gotoPrevSlide(event) {
        if($(event.currentTarget).hasClass('disabled')) return;

        var resource = this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource;

        /* navigation for sandbox slide */
        if(!this.$('#player-container').hasClass('cta-active') && resource.type == 'sandbox' && this.slide_views[Common.CURRENT_SLIDE-1].checkAndNavigateSandboxFrame('prev')) return;

        if(Common.CURRENT_SLIDE-1){
            var prev_slide_idx = Common.CURRENT_SLIDE - 1 || 1;
            this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;
            this.moveToSlide(prev_slide_idx)
        }
        this.toggleNavigationArrows();
    },

    moveToSlide(slide_index){
        this.toggleNavigationArrows();
        var slide_index = parseInt(slide_index);
        Common.CURRENT_SLIDE = slide_index || 1;
        this.sudoSlider && this.sudoSlider.goToSlide(Common.CURRENT_SLIDE);
    },

    checkSlideVideo(){
        (this.$(`#slider${Common.CURRENT_SLIDE}`).attr('slide-type') == "video") ? this.$('#slider'+Common.CURRENT_SLIDE+ ' video').attr('controls', 'controls'): this.$('.slideArea video').removeAttr('controls');
    },

    scrollSlide(event, slide_index){
        var slide_number;
        if(slide_index == 'next'){
            return this.gotoNextSlide(event);
        }else if(slide_index == 'prev'){
            return this.gotoPrevSlide(event);
        }else if(slide_index == 'first'){
            slide_number = 1;
        }else if(slide_index == 'last'){
            slide_number = this.$(".source-area ul li.slide").length;
        }else{
            slide_number = parseInt(slide_index) || 1;
        }
        Common.CURRENT_SLIDE = slide_number;
    },

    closePopup(event) {
        this.$('.skip-sandbox').removeClass('goToPrev');
        var popupName = this.$(event.currentTarget).parents('.popup-box').attr('id');
        this.popupClose(popupName);
    },

    popupClose(popupName){
        this.$(`.player-overlay .popup-box#${popupName}`).addClass("bounceOutUp");
        setTimeout(()=>{
            this.$(`.player-overlay .popup-box#${popupName}`).hide();
            this.$(`.player-overlay .popup-box#${popupName}`).removeClass("bounceOutUp");
            this.$(".player-overlay").hide();
        }, 300);
    },

    popupShow(popupName){
        this.$(".player-overlay").css({
            "display": "table"
        });
        this.$(`.popup-box#${popupName}`).show();
        this.$(`.popup-box#${popupName}`).addClass("bounceInDown");
    },

    mediaPause(){
        var current_slide = this.slide_views[this.lastLoadedSlideIndex - 1];
        if(current_slide && current_slide.slide.primary_resource.type == 'wistia' && typeof Wistia != 'undefined'){
            let wistiaVideos = Wistia.api.all()
            _.each(wistiaVideos, vid => {
                vid.pause();
            });
        }else{
            var media = $('video, audio');
            for(var i = 0; i < media.length; i++){
                if(!media[i].paused && !media[i].ended) {
                    media[i].pause();
                    if(media[i].tagName == 'AUDIO'){
                        this.$('.audio-control').removeClass("pause").addClass("play");
                    }
                };
            }
        }
        let command;
        const slideType = $(current_slide.el).find('iframe').attr('embedType');
        const iframePlayer = $(current_slide.el).find('iframe')[0];
        if (slideType == "vimeo") {
            command = {
                "method": "pause",
                "value": "true"
            };
        }   
        else if(slideType == "youtube") {
            command = {
                "event": "command",
                "func": "pauseVideo"
            };
        }
        if (slideType && command && iframePlayer != undefined) {
            //post our command to the iframe.
            iframePlayer.contentWindow.postMessage(JSON.stringify(command), "*");
        }
    },
    
    updateSlideCount(){
        var current_slide = Common.CURRENT_SLIDE;
        if(this.slide_views && this.slide_views.length){
            var total_slides = this.slide_views.length;
            var width = (current_slide / total_slides) * 100;
            this.$(".progress-line div").css("width", width + "%");
        }
    },

    loadNextDemo(e){
        var demoSlug = $(e.currentTarget).attr('data-slug');
        if(demoSlug == this.walkthrough_id) return;
        var demoPath = (this.section_id == this.product_id) ? this.product_id + '/' + demoSlug : this.product_id + '/' + this.section_id + '/' + demoSlug;
        window.location.href = `/embed/${demoPath}`;
    },

    toggleDropPin(event){
        var currentSlide = this.$(`#slider${Common.CURRENT_SLIDE}`);
        if (this.$(event.currentTarget).parent().hasClass('pin-active')) {
            this.$(event.currentTarget).parent().removeClass('pin-active').addClass('anim-end');
        } else {
            if (this.$(event.currentTarget).parent().find('h1').text()=="" && this.$(event.currentTarget).parent().find('p').text()=="") {
                return;
            }
            this.$(currentSlide).find('.drop_pin.pin-active').removeClass('pin-active').addClass('anim-end');
            this.$(event.currentTarget).parent().removeClass('anim-end').addClass('pin-active visited');
            Common.positionPinTooltip(event.currentTarget, currentSlide);
        };
    },

    toggleSideMenu(){
        this.$('#player-container').toggleClass('side-info-active');
    },

    toggleNotes(){
        Common.USER_SHOW_NOTES = !Common.USER_SHOW_NOTES;
        this.$('#player-container').toggleClass('notes-active');
        this.resetPlayerWidth(this.$('.notes'));
        setTimeout(()=>{
            this.sudoSlider.adjust();
        }, 500);
    },

    showOrHideNotes() {
        var isFullscreen = this.isInFullscreen() ? true : false;
        var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];
        if(current_slide.slide.primary_resource.type == "content" || isFullscreen && Common.USER_SHOW_NOTES) {
            this.$('#player-container').removeClass('notes-active');
        } else if(Common.USER_SHOW_NOTES){
            this.$('#player-container').addClass('notes-active');
        }
        current_slide.slide.primary_resource.type == "content" ? this.$('.notes_opener').addClass('disabled') : this.$('.notes_opener').removeClass('disabled');
        this.resetPlayerWidth(this.$('.notes'));
        setTimeout(()=>{
            this.sudoSlider.adjust();
        }, 500);   
    },

    showPlaylistDetails() {
        this.$('#player-container').toggleClass('playlist-active');
        this.resetPlayerWidth(this.$('.playlist-list'));
        setTimeout(()=>{
            this.adjustPlaylistWidth();
        }, 1000)
        setTimeout(()=>{
            this.sudoSlider.adjust();
        }, 500);
        
    },

    setPlayerArea() {  
        let playerWidth = this.$('.player_wrapper').width(),
            playerHeight = this.$('.player_wrapper').height();
        this.$('.wistia-player-block iframe')
            .attr({'width': '100%', 'height': '100%'});

        this.$(`.slides-Container[slide-type="audio"], 
                .slides-Container[slide-type="link"], 
                .slides-Container[slide-type="embed"], 
                .wistia-player-block iframe`)
            .css({
                'min-height' : playerHeight
            });
        this.$('.slides-Container[slide-type="iframe"], .slides-Container[slide-type="html5"]').css({                        
            'height' : playerHeight
        })  
        // setting min full screen height to content slide
        this.$('.slides-Container .content-slide-wrap').css({
            'min-height' : (playerHeight - 20)
        })
        // setting min height for content 
        var footer_height = this.$('.slides-Container .content-slide-wrap .content-footer').height();
        this.$('.slides-Container .content-slide-wrap .content-slide').css({
            'min-height' : (playerHeight - (footer_height + 40 + 50))
        });
        this.$('.slides-Container[slide-type="video"] .slideArea video').css({                      
            'height' : playerHeight,
        })              
        if (playerWidth > playerHeight) {
            this.$('#slider .slide').css({                       
                'min-height' : playerHeight
            })                    
        } else {
            this.$('#slider .slide').css({                        
                'min-height' : (playerWidth*9)/16
            })  
        };                
                
    },

    resetPlayerWidth(){
        if (this.$('#player-container').hasClass('notes-active')) {
            var windowWidth = parseInt($(window).width());
            var playerWidth  = windowWidth - 420;
            if (playerWidth > 0) {       
                this.$('#player').animate({
                    'width': playerWidth
                }, ()=>{
                        this.$('#player').css({
                        width: 'calc(100% - 420px)'
                    });
                });                
                var slide_width = playerWidth - 120;
                this.$(`.slidesContainer .slide:nth-child(${Common.CURRENT_SLIDE})`).animate({
                        "width" : slide_width
                });
            }
        } else {
            var windowWidth = parseInt($(window).width());
            setTimeout(()=>{     
                var playerWidth = windowWidth;
                this.$('#player').animate({
                    'width': playerWidth
                }, ()=>{
                        this.$('#player').css({
                        width: '100%'
                    });
                });
                var slide_width = playerWidth - 150;
                this.$(`.slidesContainer .slide:nth-child(${Common.CURRENT_SLIDE})`).animate({
                        "width" : slide_width
                });      
            }, 200)            
        }
        setTimeout(()=>{
            this.sudoSlider.adjust();
        }, 500);
    },

    adjustPlaylistWidth() {
        var playerBlockHeight = $('#player').outerHeight();
        var platerSlideHeight = $('.player_slider').outerHeight();
        (platerSlideHeight > playerBlockHeight) ? $('.playlist-list').addClass('addSpace') : $('.playlist-list').removeClass('addSpace');
        jcf.replaceAll();
    },

    explorePlaylist() {
        var url = (_.indexOf(['vmware', 'purestorage'], document.template_folder) >= 0) ? window.location.origin + '/t/' : window.location.origin + '/#!/';  
        url += this.product_id
        if(this.product_id != this.section_id){
            url += '/' + this.section_id
        }
        window.open(url, '_blank');
    },

    embedPlaylistHeaderPosition() {
        let nextPlaylist = $('.next_playlist');
        let playlistList = this.$('.playlist-list');
        if(nextPlaylist.length) {
            let nextPlaylistOffsetTop = nextPlaylist.offset().top;
            if(nextPlaylistOffsetTop <= 0) {
                playlistList.addClass('next_fixed');
            } else if(nextPlaylistOffsetTop <= 115) {
                playlistList.addClass('current_absolute').removeClass('next_fixed');
            } else if(nextPlaylistOffsetTop > 115) {
                playlistList.removeClass('next_fixed current_absolute');
            }
        }
    },

    //fullscreen related fnctions
    toggleFullScreen(){
        if (!this.isInFullscreen()) {
            this.requestFullscreen();
            this.prepareFullscreen();
            Common.triggerGAevent('Player', 'Fullscreen');
        } else {
            this.exitFullscreen();
            this.returnFromFullscreen();
        }
    },

    isInFullscreen() {
        return (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
    },

    requestFullscreen() {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    },

    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },

    prepareFullscreen() {
        this.$('#player-container').addClass('fullscreen-active');
        if (this.$('#player-container').hasClass('notes-active')) {
            this.$('#player-container').removeClass('notes-active');
        };
        setTimeout(()=>{
            this.resetPlayerWidth(this.$('.notes'));
            this.sudoSlider.adjust();
            this.alignFullScreenImageToCenter();
        }, 600);
    },

    returnFromFullscreen() {
        this.$('#player-container').removeClass('fullscreen-active');            
        this.adjustSudoSlider();
        this.$('.slides-Container').removeClass('v-align');
        setTimeout(()=>{
            this.showOrHideNotes();
            this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();
        }, 500)
    },

    alignFullScreenImageToCenter() {
        // set v-align centre for fullscren
        if($('#player-container').hasClass('fullscreen-active')) {
            var slide_height = this.$(`#slider${Common.CURRENT_SLIDE}`).height();
            var image_height = this.$('#player').height();
            var getImageType = this.$(`#slider${Common.CURRENT_SLIDE}`).attr('slide-type');
            if ( slide_height < image_height && (getImageType == 'image' || getImageType == 'sandbox') ) {
                this.$(`#slider${Common.CURRENT_SLIDE}`).parent('.slides-Container').addClass('v-align');
            } 
        }
    },

    adjustSudoSlider(){
        setTimeout(()=>{
            this.sudoSlider.adjust();
        }, 1000);
    },
});

export default PlayerView;
