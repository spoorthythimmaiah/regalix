
/*global define*/
define(['underscore',
        'jquery',
        'backbone',
         '../../tenant/common',
         '../../tenant/models/activity',
        '../../pdf_viewer/views/pdf_viewer',
        '../../helpers/sync'

], function (
    _, $,
    Backbone,
    Common,
    WalkthroughActivity,
    PdfView,
) {
    'use strict';

    var LaunchpadView = Backbone.View.extend({

        el: '#launchpad_container',

        events: {
          'click .launch-pdf': 'launchPdf',
          'click .toggle-side-bar': 'toggleSidemenu',
          'click .content-nav': 'launchpadNavigate',
          'click .fullscreen': 'toggleFullScreen',

          'click a[crosslinks="true"]': 'handleCrosslinksScrollTo',
          'click #downloadFile': (event)=> {Common.downloadResource(event)},
          'click .content-slide-wrap img': function(event){Common.showImagePopup(this, event)},
          'click .image-popup-close': function(event){Common.closeImagePopup(this, event)},
          'click a.cta-btn': (e)=> Common.trackCTAAnalytics(e.currentTarget.dataset.ctaId)
        },

        initialize: function () {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            this.render();
        },

        render: function(){
            /* set target blank to all a tags in RTE slide */
            this.$('.content-slide-wrap').find('a').attr('target', '_blank');
            Common.logVisitActivity(document.product.slug, document.section.slug, document.chapter_slug);
            this.enhanceEmbedIframeSrc();    
            this.logLaunchpadActivity();
            return this;
        },

        enhanceEmbedIframeSrc: function() {
            $('iframe').each(function() {
                if($(this).attr('src')) {
                    let video = $(this);
                    let vidSrc = video.attr('src');
                    let videoData = Common.enhanceVideoURL(vidSrc);
                    // Update iframe data only if it videoData has embedType property
                    if(videoData && videoData.embedType) {
                        $(this).attr('src', videoData.src)
                        $(this).attr('embedType', videoData.embedType);
                    }
                }
            });
        },

         // on window resize functions
        onWindowResize: function (e) {
            var dataRoot = e.data.root;
            if (!dataRoot.isInFullscreen()) {
                dataRoot.returnFromFullscreen();
            }
        },

        handleCrosslinksScrollTo: function(event){
            event.preventDefault();
            let scrollTo = this.$(event.currentTarget).attr('scroll_to');
            let href = this.$(event.currentTarget).attr('href');
            if(scrollTo){
                href += scrollTo;
            }
            
            window.open(href, '_blank');
        },

        launchpadNavigate: function(event){
            if (this.$(event.target).hasClass('disable')) return;

            let currentSlideno = parseInt(this.$('.slide-wrapper .slide.active').data('slide-no'));
            this.mediaPause();
            let updatedSlideno;

            /* set new active slide no */
            if (this.$(event.target).hasClass('next')) {
                updatedSlideno = currentSlideno + 1;
            } else {
                updatedSlideno = currentSlideno - 1;
            }

            /* Hide and show slide based on navigation*/
            this.$('.slide-wrapper .slide.active').removeClass('active');
            this.$(`.slide-content ul.slide-wrapper .slide:nth-child(${updatedSlideno})`).addClass('active');
            /* Reset navigation arrows*/
            this.$('.content-nav').removeClass('disable');
            if(updatedSlideno == 1) this.$('.content-nav.prev').addClass('disable');
            if(updatedSlideno == this.$(`.slide-content ul.slide-wrapper .slide`).length) this.$('.content-nav.next').addClass('disable');
            this.logLaunchpadActivity();
        },

        mediaPause: function(){
            var current_slide = this.$('.slide-wrapper .slide.active').find('iframe');
            if(current_slide && current_slide.attr('embedType') == 'wistia' && typeof Wistia != 'undefined'){
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
            const slideType = current_slide.attr('embedType');
            const iframePlayer = current_slide[0];
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

        launchPdf: function(event){
            var data = this.$(event.target).data();
            this.pdfviewer = new PdfView();
            let downloadUrl = data.url;
            if (data.type === 'ppt') {
                downloadUrl = data.url.replace(data.url.split('/').pop(), data.pptSource);
            }
            data.pdf = {
                download_url: downloadUrl,
                name: data.fileName,
                source_url: data.url,
                title: data.title,
                resource_id: data.id
            }
            data.tenant =  {
                logo: data.tenant_logo
            }
            this.pdfviewer.launchPdfViewer(data)
        },

        toggleSidemenu: function(){
            this.$('.launch-pad-player-wrapper').toggleClass('side-bar-open');
        },

        logLaunchpadActivity: function(){
            let slideOrder = this.$('.slide-wrapper .slide.active').data('slide-no');
            let chapterActivity = new WalkthroughActivity({
                slide_index: slideOrder,
                walkthrough: document.chapter_slug,
                section: document.section.slug,
                product: document.product.slug
            });
            chapterActivity.save()
        },

        // fulscreen functions

        toggleFullScreen: function(){
            if (!this.isInFullscreen()) {
                this.requestFullscreen();
                this.prepareFullscreen();
            } else {
                this.exitFullscreen();
                this.returnFromFullscreen();
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
            this.$el.attr('attr-fullscreen', true);
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
           this.$el.removeAttr('attr-fullscreen');
        },

    });

    return LaunchpadView;
});
