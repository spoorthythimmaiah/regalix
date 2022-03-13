/*global define*/
define(['underscore',
        'jquery',
        'jcf',
        'backbone',
        '../../../tenant/common',
        '../../../helpers/cookies',
        '../../../tenant/models/cta',
        '../../../tenant/models/section',
        '../../../tenant/models/walkthrough',
        '../../../tenant/models/activity',
        '../../../tenant/models/audio_video_analytics',
        '../../../tenant/models/linkedin_user',
        '../../../tenant/models/rate_content',
        '../../../tenant/models/user-details',
        '../../../tenant/views/slide',
        '../../../pdf_viewer/views/pdf_viewer',
        '../../../tenant/templates/cta_form.handlebars',
        '../templates/player.handlebars',
        'utils',
        'jquery.sudoslider',
        'bootstrap',
        'jcf.scrollable',
        'slick'
], function (
    _, $, jcf,
    Backbone,
    Common,
    SDCookies,
    Cta,
    Section,
    Walkthrough,
    WalkthroughActivity,
    AudioVideoAnalytics,
    LinkedinUser,
    Rating,
    UserDetails,
    SlideView,
    PdfView,
    CTAForm,
    PlayerTemplate
)  {
    'use strict';

    var PlayerView = Backbone.View.extend({

        el: '#block_container',

        template: PlayerTemplate,
        RATINGS_CLICKED: false,

        DEFAULT_MEDIA_PATH: '/static/media/',

        events: {
            //side-panel and toggle  events
            'click .notes-opener, .mobile-menu-toggle': function(event){
                                this.showOrHideNotes({'action': 'toggle', 'event': event});
                            },
            'click .full-screen-opener': 'toggleFullScreen',
            'click .language-opener': 'toggleLanguage',
            'click .bookmark-opener': 'showSandboxBookmarks',
            'click .social-share.mobile': function (event) {Common.toggleMobileShare(this,event)},
            'click .fullscreen-item, .close-mobile-full-screen': function (event) {Common.toggleMobileFullScreen(this,event)},

            //player events
            'click .overlay': function(event){Common.toggleFade(this, event)},
            'click .customLink[target=prev]': 'gotoPrevSlide',
            'click .customLink[target=next]': 'gotoNextSlide',
            'scroll_slide .hotspot': 'scrollSlide',
            'scroll_slide .overlay': 'scrollSlide',
            'click .pin-opener': 'toggleDropPin',
            'click .close-embed-url': 'hideEmbedURLBox',
            'click .bookmarks-container': 'jumpToSandboxSection',

            'click .popup-footer .cancel': 'closePopup',
            'click .pagination li:not([data-page="new"]), .pagination-wrap .page-next, .pagination-wrap .page-prev': function(event){Common.setPaginationNotes(this, event)},
            'click .notes-link': function(event){Common.showNotesLinkPopup(this, event)},
            'click .note-popup-close': function(event){Common.closeNotesLinkPopup(this, event)},
            'click .sandbox-help:not(.disabled)' : function(){this.popupShow('sandbox-help')},
            'click .sandbox-help-close': function(){this.popupClose('sandbox-help')},
            'click .fr-view img': function(event){Common.showImagePopup(this, event)},
            'click .image-popup-close': function(event){Common.closeImagePopup(this, event)},


            //CTA form functions
            'click .cta-signup': 'showSignup',
            'blur form[name=lead] input': 'checkInput',
            'click .form-footer .cancel': 'closeSignUp',
            'submit form[name=lead]': 'submitUserDetails',
            'click [data-cta-id]': 'trackCTAAnalytics',
            'click .explore-btn': 'openWalkthrough',
            'click .cta-image': 'openWalkthroughMobile',
        },

        initialize: function (attrs) {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            this.$el.html('<img class="loading-icon" src="/static/images/vmware/loading.gif" />');
            this.listenTo(Backbone, 'launch_pdf', data => this.pdfviewer && this.pdfviewer.launchPdfViewer(data));
            $(document).on('keydown', {'root': this}, this.keyDownHandler);
            $(document).on('click', 'ul.languages li:not(.selected)', {'root': Common}, Common.changeLanguage);
            $(document).on('change', '.mobile-language-select', {'root': Common}, Common.changeLanguage);
            this.load(attrs.product, attrs.section, attrs.chapter, attrs.slide_index);
            this.isFullscreen = false;
        },

        load: function(product, section, chapter, slide_index) {
            this.product_id = product;
            this.section_id = section;
            this.chapter_id = chapter;
            Common.CURRENT_SLIDE = slide_index || 1;
            this.navigate_slide = true;
            this.progress = 0;
            this.demo_completed = false;

            this.walkthrough = new Walkthrough({id: this.chapter_id});
            var root = this;

            this.product = new Section({id: this.product_id});
            $.when(this.product.fetch()).done(function(response){
                if(response.ret_url){
                    let redirect_url = response.ret_url;
                    _.extend(response.args, {
                        next: window.location.pathname + window.location.hash
                    })
                    redirect_url += '?' + $.param(response.args);
                    window.location.href = window.location.origin + redirect_url;
                }else{
                    root.fetchSection();
                }
            })
        },

        fetchSection: function(){
            if(this.product_id == this.section_id){
                this.section = this.product;
                this.fetchWalkthrough();
            }else{
                var root = this;
                this.section = new Section({id: this.section_id});
                $.when(this.section.fetch()).done(function(){
                    root.fetchWalkthrough();
                })
            }
        },

        fetchWalkthrough: function() {
            var root = this;
            $.when(this.walkthrough.fetch()).done(function(){
                if(root.walkthrough && root.walkthrough.get('slides') && root.walkthrough.get('slides').length && (Common.CURRENT_SLIDE > root.walkthrough.get('slides').length)){
                    Common.CURRENT_SLIDE = root.walkthrough.get('slides').length;
                }
                root.lastLoadedSlideIndex = Common.CURRENT_SLIDE;
                root.TIME_SPENT = $.now();
                root.walkthroughActivityList = [];
                _.each(root.walkthrough.get('slides'), function(slide, index){
                    root.walkthroughActivityList.push(
                        new WalkthroughActivity({
                            slide_index: slide.order,
                            walkthrough: root.chapter_id,
                            section: root.section_id,
                            product: root.product_id})
                    );
                });
                root.render();
            })
        },

        render: function() {
            // reseting the value every time a demo loads.
            document.NOTES_RESET_PLAYER_WIDTH = undefined;
            document.RESET_PLAYER_WIDTH = undefined;

            $('body').addClass('player-loaded');
            this.tenant = this.walkthrough.get('tenant');
            Common.USER_SHOW_NOTES = this.tenant.show_notes || false;

            var l_list = this.walkthrough.get('locales').languages
            var l_selected = this.walkthrough.get('locales').selected;
            var default_language = _.find(l_list, function(lang){
                return lang.default_locale == true;
            });
            var locale_available = _.find(l_list, function(lang){
                return l_selected.locale == lang.locale;
            });
            if(!locale_available){
                l_selected = default_language;
            }
            _.each(l_list, function(lang){
                if(lang.locale == l_selected.locale){
                    lang.selected = true
                }else{
                    lang.selected = false
                }
            });

            let ratingApp = this.section.get('tenant').applications.filter(
                app => app.unique_id.toLowerCase() === 'rating'
            );
            var template_vars = {
                'walkthrough': {    
                    'name': this.walkthrough.get('name'),
                    'slug': this.walkthrough.get('slug'),
                    'created_at': this.walkthrough.get("created_at"),
                },
                'product': this.product.attributes,
                'section': this.section.attributes,
                'next_walkthrough': this.walkthrough.get('next_walkthrough'),
                'can_embed': this.section.get('tenant') && this.section.get('tenant').can_embed || false,
                'tenant': this.tenant,
                'ratingApp': ratingApp,
                'locales': l_list
            };
            document.can_embed = template_vars.can_embed;
            if(this.walkthrough.get('next_section') && this.walkthrough.get('next_section').slug){
                template_vars['next_section'] = this.walkthrough.get('next_section')
            }
            this.$el.html(this.template(template_vars));
            // Update the avg-ratings of the demo.
            Common.transition('next');

            let hasPdf = _.some(
                this.walkthrough.attributes.slides,
                function(slide) {
                    return slide.primary_resource.type === "pdf";   
                });
            if(hasPdf) this.pdfviewer = new PdfView();
            this.slide_views = new Array();
            _.each(this.walkthrough.get('slides'), this.addSlide, this);
            this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].setSlideNotes();

            this.progress = this.getDemoProgress();

            var current_slide = Common.CURRENT_SLIDE;
            this.initializeSudoSlider(current_slide);

            Common.checkSlideAndLogActivity(this);
            this.updateSlideCount();
            Common.logVisitActivity(this.product_id, this.section_id, this.chapter_id);
            document.triggerAnalytics();
            jcf.replaceAll();
            this.setPlayerArea();
            this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();
            this.adjustNavPosition();
            //preventing tab on these tags
            this.$('video, iframe').attr('tabindex', '-1');
            // detect safari browser and hide copy url option
            if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
                this.$('li.copyurl').hide();
            }

            if(this.isInFullscreen()){
                this.prepareFullscreen();
            }

            /* SEO information update */

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
                var seoTitle = `${this.walkthrough.get('name')} | ${this.section.get('name')} | ${this.section.get('tenant').name}`;
                utils.setSEOData(seoTitle, window.location.href, first_slide.text, cover_image)
            }


        },

        loadWalkthrough: function(product, section, chapter, slide_index){
            if(!slide_index){
                slide_index = 1;                
            }
            var ch_url = chapter + "/" + (chapter == this.chapter_id ? slide_index: "")
            Backbone.history.navigate(ch_url, {trigger:true});
        },

        addSlide: function (data) {
            let {walkthrough, tenant} = this;
            data.tenant = tenant;
            data.product = {
                name: walkthrough.attributes.product.name,
                slug: walkthrough.attributes.product.slug,
            };
            data.section = {
                    name: walkthrough.attributes.section.name,
                    slug: walkthrough.attributes.section.slug
                };
            data.walkthrough = {
                name: walkthrough.attributes.name,
                slug: walkthrough.attributes.slug
            };
            var view = new SlideView({data: data});
            this.slide_views.push(view);
            this.$('#slider #sdemos-player-box').append(view.el);
        },

        initializeSudoSlider: function (current_slide) {
            var root = this;
            this.sudoSlider = this.$(".player_slider").sudoSlider({
                startSlide: current_slide,
                prevNext : false,
                responsive : true,
                speed: Common.SLIDE_TRANSITION_SPEED,
                effect: Common.SLIDE_TRANSITION_EFFECT,
                customLink : 'div.customLink',
                initCallback : function() {        
                    var actualCurSlide = Common.CURRENT_SLIDE
                    Common.CURRENT_SLIDE = root.sudoSlider.getValue('currentSlide');
                    var total_slides = root.$(".player_slider ul li").length;                  
                    root.toggleNavigationArrows();
                    if(!root.slide_views.length) return
                    root.loadSlideAssets(Common.CURRENT_SLIDE);
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].flashHotspot();
                    root.checkSlideVideo();
                    root.checkImageAudioAndPlay(actualCurSlide);
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].addSandboxLoader(root);
                },
                beforeAnimation : function(next_slide_number) {
                    if(!root.slide_views.length) return
                    Common.CURRENT_SLIDE = next_slide_number;
                    root.loadSlideAssets(Common.CURRENT_SLIDE);
                    root.mediaPause();
                    root.slide_views[Common.CURRENT_SLIDE-1].hideHotspot();
                    root.slide_views[Common.CURRENT_SLIDE-1].animateGif();
                    $(root.slide_views[Common.CURRENT_SLIDE-1].el).find('.delay-hotspot').hide();
                },
                afterAnimation : function() {
                    var total_slides = root.$(".player_slider ul li").length;
                    root.toggleNavigationArrows();
                    root.navigate_slide = true;
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].setSlideNotes();
                    root.checkSlideVideo();
                    root.checkImageAudioAndPlay();
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].flashHotspot();
                    root.updateSlideCount();
                    root.adjustNavPosition();
                    root.hideEmbedURLBox();
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].addSandboxLoader(root);
                    Common.checkSlideAndLogActivity(root);
                    $(root.slide_views[Common.CURRENT_SLIDE-1].el).find('.delay-hotspot').show();
                    jcf.replaceAll();
                }
            });            
        },

        adjustNavPosition: function(){
            var windowWidth = $(window).width();
            var playerWidth = this.$('.player_wrapper').outerWidth();
            if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('language-active')) {
                playerWidth = playerWidth + 400;
            }
            if (playerWidth < windowWidth) {
                var abc = windowWidth - playerWidth;
                if (abc < 20 ) this.$('.dt-btn-next').css( "margin-right", abc);
            } else {
                this.$('.dt-btn-next').css("margin-right" , "0px");
            }
        },

        loadSlideAssets: function(current_slide){
            this.$('#player-container').removeClass('comments-active language-active');
            // Disable notes if the slide is 'TextEditor'.
            var current_slide_index = current_slide - 1;
            var jsonObj = {};
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

        //Key Navigation handler
        keyDownHandler: function (e) {
            var root =  e.data.root;
            var resource = root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource;
            var sandbox = root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].sandbox;
            if (Common.KEY_NAVIGATION) {
                if (e.ctrlKey){
                    if(resource && resource.type=="sandbox" ){
                        if (e.keyCode == Common.LETTER_Y){
                            root.toggleSandboxHotspot();
                        } else if(e.keyCode == Common.LETTER_I && sandbox.has_images && sandbox.navigate){
                            root.showSandboxBookmarks();
                        }
                    }
                }
                if (e.which == Common.ARROW_RIGHT && document.navigate_slide) {
                    root.gotoNextSlide(e);
                } else if (e.which == Common.ARROW_LEFT && document.navigate_slide) {
                    root.gotoPrevSlide(e);
                } else if (Common.SHOW_HOTSPOT) {
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].triggerHotspot(e);
                }
            };
        },

        moveToSlide: function(slide_index){
            this.toggleNavigationArrows();
            Common.CURRENT_SLIDE = slide_index || 1;
            this.sudoSlider && this.sudoSlider.goToSlide(Common.CURRENT_SLIDE);
            this.$('#player-container').removeClass('cta-active');
        },

        // on window resize functions
        onWindowResize: function (e) {
            var dataRoot = e.data.root;
            if (dataRoot.isInFullscreen()) {
                if(!this.$('#player-container').hasClass('fullscreen-active') && this.isFullscreen) {
                    dataRoot.prepareFullscreen();
                }
            } else if(this.$('#player-container').hasClass('fullscreen-active')) {
                dataRoot.returnFromFullscreen();
            }
            dataRoot.setPlayerArea();
            dataRoot.slide_views && dataRoot.slide_views[Common.CURRENT_SLIDE-1] && dataRoot.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();
        },

        toggleNavigationArrows: function(){
            this.$(".customLink[target]").removeClass('disabled').addClass('disabled');
            if(!this.slide_views || !this.slide_views.length) return;
            let autoFlow = false;
            autoFlow = this.section.get('tenant')
                && this.section.get('tenant').chapter_autoflow 
                && (["library", "announcement_widget"].includes(document.app_name))

            this.$(".customLink[target]").removeClass('disabled');
            if(this.$('#player-container').hasClass('cta-active')){
                this.$(".customLink[target=next]").addClass('disabled');
                this.$(".customLink[target=prev]").removeClass('disabled');
            } else if(!autoFlow){
                if(Common.CURRENT_SLIDE == 1){
                    this.$(".customLink[target=prev]").addClass('disabled');
                }
                if(!(["library", "announcement_widget"].includes(document.app_name))
                      && Common.CURRENT_SLIDE == this.slide_views.length){
                    this.$(".customLink[target=next]").addClass('disabled');
                }
            } 
        },

        gotoNextSlide: function (event) {
            if($(event.currentTarget).hasClass('disabled')) return;

            var resource = this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource;

            /* navigation for sandbox slide */
            if (resource.type == 'sandbox' && this.slide_views[Common.CURRENT_SLIDE-1].checkAndNavigateSandboxFrame('next')) return;

            var length = this.$(".source-area ul li.slide").length;
            var complete = parseInt(Common.CURRENT_SLIDE / length);
            var next_slide_idx = parseInt(Common.CURRENT_SLIDE) + 1;
            this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;

            if (complete && this.navigate_slide) {
                this.mediaPause();
                if(this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('next_walkthrough')){
                    return this.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('next_walkthrough').slug);
                }

                this.$('#player-container').addClass('cta-active');
                this.showOrHideNotes();

                if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('language-active')) {
                    this.$('#player-container').removeClass('notes-active language-active');
                    this.resetPlayerWidth(this.$('.notes'));
                }
                this.$(".slidesContainer").css("z-index" , "-1");
                this.toggleNavigationArrows();

            } else if(this.slide_views && this.navigate_slide && (next_slide_idx <= this.slide_views.length)) {
                this.navigate_slide = false;
                this.$(".overlay").removeAttr('style')
                this.$(".slidesContainer").css("z-index" , "0");
                this.toggleNavigationArrows();
                this.loadWalkthrough(this.product_id, this.section_id, this.chapter_id, next_slide_idx);
            };
        },

        gotoPrevSlide: function (event) {
            if($(event.currentTarget).hasClass('disabled')) return;

            var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];

            /* navigation for sandbox slide */
            if(!this.$('#player-container').hasClass('cta-active') && current_slide.slide.primary_resource.type == 'sandbox' && this.slide_views[Common.CURRENT_SLIDE-1].checkAndNavigateSandboxFrame('prev')) return;
 
            this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;

            if(Common.CURRENT_SLIDE-1 && !this.$(".cta-active .info-cta:visible").length && this.navigate_slide){
                this.navigate_slide = false;
                var prev_slide_idx = Common.CURRENT_SLIDE - 1 || 1;
                this.endOfSlide = false;
                this.loadWalkthrough(this.product_id, this.section_id, this.chapter_id, prev_slide_idx);
            }else if(this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('prev_walkthrough')){
                return this.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('prev_walkthrough').slug, this.walkthrough.get('prev_walkthrough').slide_index);
            }
            // This block is only triggered when coming back from Thank-you page.
            if (this.$('#player-container').hasClass('cta-active')) {
                this.$('#player-container').removeClass('cta-active');
                this.showOrHideNotes();
            };
            this.toggleNavigationArrows();
        },

        scrollSlide: function(event, slide_index){
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
            this.loadWalkthrough(this.product_id, this.section_id, this.chapter_id, slide_number);
        },

        mediaPause: function(){
            var current_slide = this.slide_views[this.lastLoadedSlideIndex - 1];
            if(current_slide && current_slide.slide.primary_resource.type == 'wistia' && typeof Wistia != 'undefined'){
                let wistiaVideos = Wistia.api.all()
                _.each(wistiaVideos, (vid, idx) => {
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

        updateSlideCount: function(){
            var current_slide = Common.CURRENT_SLIDE;
            if(this.slide_views && this.slide_views.length){
                var total_slides = this.slide_views.length;
                var width = (current_slide / total_slides) * 100;
                this.$(".progress-line div").css("width", width + "%");
            }
        },

        setPlayerArea: function () {  
            let playerWidth = this.$('.player_wrapper').width(),
                playerHeight = this.$('.player_wrapper').height();
            this.$('.wistia-player-block iframe')
                .attr({'width': '100%', 'height': '100%'});

            if($(window).width() > 991) {
                this.$(`.slides-Container[slide-type="audio"], 
                        .slides-Container[slide-type="link"], 
                        .slides-Container[slide-type="embed"], 
                        .wistia-player-block iframe`)
                    .css({
                        'min-height' : playerHeight
                    });
                this.$('.slides-Container[slide-type="iframe"], .slides-Container[slide-type="html5"]').css({                        
                    'height' : playerHeight
                });
                // setting min full screen height to content slide
                this.$('.slides-Container .content-slide-wrap').css({
                    'min-height' : (playerHeight - 20)
                });
                // setting min height for content 
                let footerHeight = this.$('.slides-Container .content-slide-wrap .content-footer').height();
                this.$('.slides-Container .content-slide-wrap .content-slide').css({
                    'min-height' : (playerHeight - (footerHeight + 40 + 50))
                });
                this.$('.slides-Container[slide-type="video"] .slideArea video').css({                      
                    'height' : playerHeight,
                });
                if (playerWidth > playerHeight) {
                    this.$('#slider .slide').css({                       
                        'min-height' : playerHeight
                    });
                } else {
                    this.$('#slider .slide').css({                        
                        'min-height' : (playerWidth*9)/16
                    });
                }
            } else {
                this.$(`.slides-Container[slide-type="audio"], 
                        .slides-Container[slide-type="link"], 
                        .slides-Container[slide-type="embed"], 
                        .wistia-player-block iframe`)
                    .css({
                        'min-height' : (playerWidth*9)/16
                    });
                this.$('#slider .slide').css({
                    'min-height' : (playerWidth*9)/16
                });
                this.$('.slides-Container[slide-type="iframe"]').css({                        
                    'height' : (playerWidth*9)/16
                });
            }
        },

        showOrHideNotes: function(jsonObj){
            var playerContainer = this.$('#player-container');
            playerContainer.removeClass('comments-active language-active share-active sandbox-bookmarks-active mobile-social-active');
            var isFullscreen = this.isInFullscreen() ? true : false;
            var isCTAopen = this.$('#player-container').hasClass('cta-active') ? true : false ;
            var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];
            
            if(jsonObj && jsonObj.action == 'toggle') {
                if(this.$('.notes-opener').hasClass('disabled')) return;
                playerContainer.toggleClass('notes-active');
                if(jsonObj.event && jsonObj.event.type == 'click'){
                    Common.USER_SHOW_NOTES = !Common.USER_SHOW_NOTES;
                }
            }else if(current_slide.slide.primary_resource.type == "content" || isFullscreen || isCTAopen) {
                playerContainer.removeClass('notes-active');
            }else if(Common.USER_SHOW_NOTES){
                playerContainer.addClass('notes-active');
            };
            if (current_slide.slide.primary_resource.type == "sandbox") {
                this.$('.bookmark-opener, .sandbox-help').addClass('active');
            } else {
                this.$('#player-container').removeClass('sandbox-bookmarks-active');
                this.$('.bookmark-opener, .sandbox-help').removeClass('active');
            };
            current_slide.slide.primary_resource.type == "content" || isCTAopen ? this.$('.notes-opener').addClass('disabled') : this.$('.notes-opener').removeClass('disabled');
            this.resetPlayerWidth(this.$('.notes'));
            this.setPlayerArea();
        },

        toggleFullScreen: function(){
            if (!this.isInFullscreen()) {
                this.requestFullscreen();
                this.prepareFullscreen();
                Common.triggerGAevent('Player', 'Fullscreen');
                this.isFullscreen = true;
            } else {
                this.exitFullscreen();
                this.returnFromFullscreen();
                this.isFullscreen = false;
            }
        },

        isInFullscreen: function() {
            return (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            );
        },

        requestFullscreen: function() {
            if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        },

        prepareFullscreen: function() {
            var root = this;
            this.$('#player-container').addClass('fullscreen-active');
            setTimeout(function(){
                root.showOrHideNotes();
                root.alignFullScreenImageToCenter();
                root.adjustSudoSlider();
           }, 600);
        },

        exitFullscreen: function() {
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

        returnFromFullscreen: function() {
            var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];
            this.$('#player-container').removeClass('fullscreen-active');
            if(this.$('#player-container').hasClass('cta-active')){
                this.showOrHideNotes();
                return;
            }
            if(current_slide && current_slide.slide && current_slide.slide.primary_resource && $.inArray(current_slide.slide.primary_resource.type, ['content', 'iframe', 'html5']) == -1){
                this.showOrHideNotes();
            }
            this.adjustSudoSlider();
            this.$('.slides-Container').removeClass('v-align');
        },

        // adjust sudolider when dom width changes
        adjustSudoSlider: function(){
            var root = this;
            setTimeout(function(){
                root.sudoSlider.adjust();
            }, 1000);
        },

        alignFullScreenImageToCenter: function() {
           // set v-align centre for fullscren
           if($('#player-container').hasClass('fullscreen-active')) {
               var slide_height = this.$('#slider' + Common.CURRENT_SLIDE).height();
               var image_height = this.$('#player').height();
               var getImageType = this.$('#slider'+Common.CURRENT_SLIDE).attr('slide-type');
               if ( slide_height < image_height && (getImageType == 'image' || getImageType == 'sandbox') ) {
                   this.$('#slider'+Common.CURRENT_SLIDE).parent('.slides-Container').addClass('v-align');
               } 
            }
        },
         // end of full screen functions

        toggleLanguage: function(){
            if (this.$('.language-opener').hasClass('disabled')) return;
            this.$('#player-container').removeClass('notes-active sandbox-bookmarks-active mobile-social-active');
            this.$('#player-container').toggleClass('language-active');
            this.resetPlayerWidth(this.$('.language'));
        },

        toggleSandboxHotspot: function(e){
            var sandboxPlayer = this.slide_views[Common.CURRENT_SLIDE-1].$('.sandbox-player');
            sandboxPlayer.attr('hotspot-status') == "show" ? sandboxPlayer.attr('hotspot-status' , 'hide') : sandboxPlayer.attr('hotspot-status' , 'show');
        },

        showSandboxBookmarks: function(){
            if (this.$('.bookmark-opener').hasClass('disabled')) return;
            var root = this;
            this.$('.sandbox-bookmarks .bookmarks-wrap').empty();
            this.slide_views[Common.CURRENT_SLIDE-1].renderBookmarks();
            this.$('#player-container').removeClass('notes-active language-active').toggleClass('sandbox-bookmarks-active');
            this.resetPlayerWidth(root.$('.sandbox-bookmarks'));
            setTimeout(function(){
                jcf.replaceAll();
            }, 500);
        },  

        jumpToSandboxSection: function(e){
            var frameNo = parseInt($(e.currentTarget).attr('bookmark-index'));
            this.slide_views[Common.CURRENT_SLIDE-1].loadFrame(frameNo, 'from_bookmark');
            this.slide_views[Common.CURRENT_SLIDE-1].gotoFrame(frameNo);
            this.slide_views[Common.CURRENT_SLIDE-1].setSandboxNotes();
        },

        resetPlayerWidth: function(sideWrap, callFromTextEdit){
            var root = this;
            if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('language-active') || this.$('#player-container').hasClass('sandbox-bookmarks-active')) {
                var windowWidth = parseInt($(window).width());
                var playerWidth  = windowWidth - 400;
                if (windowWidth > 991) {                    
                    if (playerWidth > 0) {       
                        this.$('#player').animate({
                            'width': playerWidth
                        }, function(){
                             root.$('#player').css({
                                width: 'calc(100% - 400px)'
                             });
                        });                
                        var slide_width = playerWidth - 300;
                        this.$('.slidesContainer .slide:nth-child(' + Common.CURRENT_SLIDE + ')').animate({
                                "width" : slide_width
                        }, function(){
                            root.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();   
                        });
                    }
                };
            } else {
                var windowWidth = parseInt($(window).width());
                if (windowWidth > 991) {
                    setTimeout(function(){     
                        var playerWidth = windowWidth;
                             
                        this.$('#player').animate({
                            'width': playerWidth
                        }, function(){
                             root.$('#player').css({
                                width: '100%'
                             });
                        });

                        var slide_width = this.$('#player-container').hasClass('fullscreen-active') ? playerWidth - 127: playerWidth - 300;

                        this.$('.slidesContainer .slide:nth-child(' + Common.CURRENT_SLIDE + ')').animate({
                                "width" : slide_width
                        }, function(){
                            root.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();   
                        });      
                    }, 200)            
                }
            }
            if(sideWrap.hasClass('notes')){
                document.NOTES_RESET_PLAYER_WIDTH = true;
            }
            else{
                document.NOTES_RESET_PLAYER_WIDTH = false;   
            }
            document.RESET_PLAYER_WIDTH = callFromTextEdit || false;
        },

        showSignup: function(event){
            let cta_id = this.$(event.currentTarget).data('cta-id');
            let cta = new Cta({id: cta_id});
            let root = this;
            $.when(cta.fetch()).done(function(){
                let args = cta.attributes;
                args['product'] = root.product_id;
                args['section'] = root.section_id;
                args['chapter'] = root.walkthrough_id;
                root.$("#player-container .sign-up-wrap").html(CTAForm(args));
                root.$('#player-container').addClass('form-cta-active');
                setTimeout(function(){
                    root.$('.form-cta').addClass('active');
                    root.$(".sign-box ").addClass("bounceInDown");
                    setTimeout(function(){
                        root.$(".sign-box ").removeClass("bounceInDown");
                    }, 500);
                }, 300);
            });
        },

        closeSignUp: function(){
            this.$(".sign-box").addClass("bounceOutUp");
            this.$('#player-container').removeClass('form-cta-active');
             setTimeout(function(){
                this.$('.form-cta').removeClass('active');
                this.$(".sign-box ").removeClass("bounceOutUp");
                this.$('.error-message').hide();
            }, 300);
        },

        checkInput: function(event){
            if (!this.$(event.currentTarget).val().trim()) {
                this.$(event.currentTarget).siblings('.error-message').show();
            } else{
                this.$(event.currentTarget).siblings('.error-message').hide();
            };
        },

        submitUserDetails: function(event){
            event.preventDefault();
            var root = this;
            root.$('.error-message').hide();
            var validated = true;
            _.each(this.$('form[name=lead] input[type=text]'), function(elem, index){
                if(validated && !$(elem).val().trim()){
                    validated = false;
                    root.$(elem).siblings('.error-message').show();
                }
            });

            if(!validated) return false;

            root.$('.form-sending').addClass("slide-in is-submitted");
            setTimeout(function(){
                root.$('form[name=lead] input[type=submit]').attr('disabled', 'disabled');
                var user_data = {};
                _.each(root.$('form').serializeArray(), function(field){
                    user_data[field.name] = field.value;
                })
                root.user_details = new UserDetails(user_data);

                root.user_details.save().done(function(){
                    root.$('.form-sending').removeClass("slide-in is-submitted");
                    root.$('.form-sent').addClass("slide-in");
                    setTimeout(function(){
                        root.$('.form-sent').removeClass("slide-in");
                        root.closeSignUp();
                        root.showThankyou();
                    }, 3000);
                    root.user_details_saved = true;
                }).error(function(){
                    root.$('.form-sending').removeClass("slide-in is-submitted");
                    root.$('.form-failed').addClass("slide-in");
                    setTimeout(function(){
                        root.$('.form-failed').removeClass("slide-in");
                    }, 3000);
                }).always(function(){
                    root.$('form[name=lead] input[type=submit]').removeAttr('disabled');
                });
            }, 3000);
        },

        showThankyou: function(){
            this.$('.signup-block').hide();
            this.$('.thanku-block').show();
        },

        getDemoProgress: function(){
            var slides_visited = _.reject(this.slide_views, function(slide) {
                return !slide.user_visited;
            });
            return Math.round(((slides_visited.length || 0) / (this.slide_views.length || 1)) * 100);
        },

        openWalkthrough: function(event){
            var chapter_id = $(event.currentTarget).attr('slug');
            this.loadWalkthrough(this.product_id, this.section_id, chapter_id);
        },

        openWalkthroughMobile: function(event){
            if($(window).width() < 991) {
                if(this.$(event.target).hasClass('tags-span')) return;
                var chapter_id = this.$(event.currentTarget).siblings('.explore-btn').attr('slug');
                this.loadWalkthrough(this.product_id, this.section_id, chapter_id);
            }
        },

        checkSlideVideo: function(){
            if (this.$('#slider'+Common.CURRENT_SLIDE).attr('slide-type') == "video") {
                this.$('#slider'+Common.CURRENT_SLIDE+ ' video').attr('controls', 'controls');
            } else {
                this.$('.slideArea video').removeAttr('controls');
            };
        },

        checkImageAudioAndPlay: function(actualCurSlide) {
           var cur_slide = actualCurSlide ? actualCurSlide : Common.CURRENT_SLIDE;
           var current_slide = this.$('#slider'+ cur_slide);
           if(current_slide.parent().children().hasClass('image_with_audio') && (!current_slide.parent().find('.audio-control').hasClass('autoplayed'))) {
               this.slide_views[cur_slide-1].playAudio();
           }
       },

        hideEmbedURLBox: function() {
            this.$(".embed-url-box").slideUp();
        },

        toggleDropPin: function(event){
            var currentSlide = this.$("#slider" + Common.CURRENT_SLIDE);
            if (this.$(event.currentTarget).parent().hasClass('pin-active')) {
                this.$(event.currentTarget).parent().removeClass('pin-active').addClass('anim-end');
            } else {
                if (this.$(event.currentTarget).parent().find('h1').text()=="" && this.$(event.currentTarget).parent().find('p').text()=="") {
                    return;
                };
                this.$(currentSlide).find('.drop_pin.pin-active').removeClass('pin-active').addClass('anim-end');
                this.$(event.currentTarget).parent().removeClass('anim-end').addClass('pin-active visited');
                Common.positionPinTooltip(event.currentTarget, currentSlide);
            };
        },

        closePopup: function(event) {
            this.$('.skip-sandbox').removeClass('goToPrev');
            var popupName = this.$(event.currentTarget).parents('.popup-box').attr('id');
            this.popupClose(popupName);
        },

        popupShow: function(popupName){
            this.$(".player-overlay").css({
                "display": "table"
            });
            this.$(".popup-box#" + popupName).show();
            this.$(".popup-box#" + popupName).addClass("bounceInDown");
        },

        popupClose: function(popupName){
            this.$(".player-overlay #" + popupName).addClass("bounceOutUp");
            setTimeout(function(){
                this.$(".player-overlay .popup-box#" + popupName).hide();
                this.$(".player-overlay .popup-box#" + popupName).removeClass("bounceOutUp");
                    this.$(".player-overlay").hide();
            }, 300);
        },

        trackCTAAnalytics: function(e){
            Common.trackCTAAnalytics(
                e.currentTarget.dataset.ctaId,
                this.product_id,
                this.section_id,
                this.chapter_id
            );
        },

    });

    return PlayerView;
});
