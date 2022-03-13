/*global define*/
define([
    'underscore',
    'jquery',
    'jcf',
    'backbone',
    '../common',
    '../templates/hotspot.handlebars',
    '../templates/pin.handlebars',
    '../templates/slide.handlebars',
    '../templates/bookmarks.handlebars',
    '../templates/notes-pagination.handlebars',
    'jquery.qtip',
    'jquery.ui'
], function (_, $, jcf, Backbone, Common, Hotspot, Pin, SlideTemplate, BookmarksTemplate, NotePagination) {
    'use strict';

    var SlideView = Backbone.View.extend({

        tagName: 'li',

        template: SlideTemplate,
        DEFAULT_FILE_ICON: "/static/images/thumb-file.jpg",

        events: {
            'click .slides-Container': 'triggerSlideClick',
            'click a[crosslinks="true"]': 'handleCrosslinks',

            //audio controll
            'click .audio-control': 'playAudio',
            'click .audio-backward': 'backwardAudio',
            'click .audio-farward': 'forwardAudio',
            'click .audio-timeline': 'seekAudio',
            'click .audio-mute': 'muteAudio',
            'click .annotation': 'resumePlayingSandbox',
            'click .toggle-sb-sc': 'toggleSandboxShortCuts',
            // PDF Viewer event.
            'click .pdf-launcher': 'launchPdf',
            'click #downloadFile': (event)=> {Common.downloadResource(event)}
        },

        initialize: function (attrs) {
            this.slide = attrs.data;            
            this.user_visited = false;
            this.asset_load_status = false;
            this.sandbox = {
                'current_frame': 0,
                'current_frame_index': 0,
                'has_images': false,
                'navigate': true,
                'loader_loaded': false,
                'loaded_frames': []
            };
            this.playerObject = attrs.data.playerObject;
            this.render();
        },

        render: function () {
            var template_vars = {
                order: this.slide.order
            };
            var pri_res = this.slide.primary_resource;
            var sec_res = this.slide.secondary_resource;
            if(pri_res){
                template_vars.type = pri_res.type;
                template_vars.src = pri_res.path;

                if(pri_res.type == 'pdf'){
                    template_vars.isPdf = true;
                    if(pri_res.meta_data.thumbnail_url){
                        template_vars.thumbnail_url = pri_res.thumbnail;
                    };                    
                }
                else if(pri_res.type == 'audio'){
                    template_vars.is_audio = true;
                }else if(pri_res.type == 'video'){
                    template_vars.is_video = true;
                }else if(pri_res.type == 'wistia'){
                    template_vars.is_wistia = true;
                }else if(pri_res.type == 'embed'){
                    template_vars.is_embed = true;
                }else if(pri_res.type == 'image' && !sec_res){
                    template_vars.is_image = true;
                }else if(pri_res.type == 'image' && sec_res.type == 'audio' ){
                   template_vars.is_image_with_audio = true;
                }else if(pri_res.type == 'link'){
                    template_vars.icon = '/static/images/author/thumb-link.jpg';
                    // Temporary fix to link type slide.
                    if (pri_res.meta_data.icon){
                        template_vars.icon = pri_res.meta_data.icon;
                    }
                    template_vars.meta_data = pri_res.meta_data;
                    let des = template_vars.meta_data.description;
                    if (des && des.length > 100){
                        template_vars.meta_data.description = des.substr(0, 100) + '...';
                    }
                    template_vars.is_link = true;
                }else if(pri_res.type == 'iframe'){
                    _.extend(template_vars, this.getURLProperties(pri_res.path));
                    template_vars.is_iframe = true;
                }else if(pri_res.type == 'html5'){
                    template_vars.is_iframe = true;
                    template_vars.src = pri_res.path;
                }else if(pri_res.type == 'content'){
                    template_vars.is_content = true;
                    template_vars.tenant_template = this.slide.tenant.template.toLowerCase();
                    template_vars.content = pri_res.content
                    if(!document.isPrivateTenant) {
                        let urlExp = new RegExp('"/static/media/', 'g');
                        template_vars.content = pri_res.content.replace(
                            urlExp, `"${document.cdn_url}${Common.DEFAULT_MEDIA_PATH}`
                        );
                    }
                    template_vars.document_styles = document.documentStyles;

                    if (document.tenantFooterImage){
                        template_vars.footer_image = Common.DEFAULT_MEDIA_PATH + document.tenantFooterImage;
                    }
                    template_vars.footer_text = this.slide.tenant.footer_text; 
                }else if(pri_res.type == '360'){
                    template_vars.is_360 = true;
                    template_vars.frames = [];
                    _.times(pri_res.meta_data.count, function(i){                        
                        template_vars.frames.push({
                            framePath : `${pri_res.path}/${(i + 1)}.jpg`
                        });
                    });
                } else if(pri_res.type == 'sandbox'){
                    template_vars.is_sandbox = true;
                    this.sandbox.has_images = _.find(pri_res.meta_data.frames, function(frame){
                        return frame.type == 'image';
                    });
                }else if(pri_res.type == 'file'){
                    let imageSrc = `${document.cdn_url}${this.DEFAULT_FILE_ICON}`;
                    if(pri_res.meta_data && pri_res.meta_data.thumbnail_url){
                        imageSrc = pri_res.meta_data.thumbnail_url;
                    }
                    template_vars.is_file = true;
                    template_vars.resource_id = pri_res.resource_id;
                    template_vars.path_name = pri_res.path;;
                    template_vars.file_title = pri_res.name;
                    template_vars.file_size = (pri_res.meta_data.size/1048576).toFixed(2);
                    template_vars.file_type = pri_res.meta_data.type.split('.')[1];
                    template_vars.file_name = pri_res.name + pri_res.meta_data.type;
                    template_vars.imageSrc = imageSrc;
                } 
           
                if(['embed', 'iframe', 'wistia'].includes(pri_res.type)){
                    template_vars.resPath = pri_res.path;
                    template_vars.title = pri_res.meta_data.title;
                    let videoData = Common.enhanceVideoURL(pri_res.path);
                    template_vars.src = videoData.src;
                    template_vars.embedType = videoData.embedType;
                }

                if(sec_res){
                    template_vars.sec_src = sec_res.path;
                }
            }
            this.$el.html(this.template(template_vars));
            // If slide type is RTE then add target attr to the hyper links.
            if (pri_res.type == 'content') {
                this.$('.fr-element.fr-view.content-slide').find('a').attr('target', '_blank');
                this.setEmbedIframeSrc();
            }

            _.each(this.slide.hotspots, this.appendHotSpot, this);
            _.each(this.slide.pins, this.appendPin, this);

            if (pri_res.type == '360') {
                this.initProductViewer(pri_res.meta_data.count)
                var root = this;
                this.$('.product-frame:first-child img').one('load', function(event){                    
                    root.updateCoverDimension(root.$(".product-frame:first-child img").attr("src"), -65);               
                })
            };
            if (pri_res.type == 'sandbox') {    
                this.loadFrame(pri_res.meta_data.frames[0].index);
                // activate first frame of a sandbox, only on first set of frames loaded
                this.$('#slider'+ this.slide.order +' .sandbox-player .sandbox-frame:first-child').addClass('active');
            }
            return this;
        },

        handleCrosslinks: function(event){
            event.preventDefault();
            let href = this.$(event.currentTarget).attr('href');
            if(document.viewType == "edit"){
                href += '?author=1';
            }else if(document.viewType == "home"){
                href += this.$(event.currentTarget).attr('scroll_to')
            }

            window.open(href, '_blank');
        },

        loadAsset : function(){
            if(this.asset_load_status) return;
            var pri_res = this.slide.primary_resource;
            if(pri_res){
                pri_res.source = pri_res.path;
            }
            var sec_res = this.slide.secondary_resource;
            if(sec_res){
                sec_res.source = sec_res.path;
            }
            var root = this;
            if(sec_res && sec_res.type == 'audio'){
                var audio = this.getAudio();
                audio.addEventListener('loadedmetadata', function(){
                    root.totalAudioDuration(event);
                });
            }
            if(pri_res){
                if(pri_res.type == 'audio' || pri_res.type == 'embed'){
                    if (pri_res.type == 'audio') {
                        var audio = this.getAudio();
                        audio.addEventListener('loadedmetadata', function(){
                            root.totalAudioDuration(event);
                        });
                    }
                    if(sec_res){
                        this.$('.slideArea .audio_banner').empty().append($("<img class='banner_image' src='" + sec_res.source + "'>"));
                    }
                }else if(pri_res.type == 'video'){
                    if(sec_res){
                        this.$('video').attr('poster', sec_res.source);                       
                    }                    
                }else if(pri_res.type == 'image'){
                    this.appendImageToSlideArea(pri_res);
                }
            }
            // code to fix slide width for slide
            this.$('[slide-type=image] img.slide_image').on('load', function(event){
                root.setSlideArea();               
            })
            this.asset_load_status = true;
        },

        launchPdf: function() {
            let resource = this.slide.primary_resource,
                url = resource.path,
                fileExtension = "pdf",
                downloadUrl = url,
                data = {};

            if (["ppt", "doc", "docx"].includes(resource.meta_data.source_type)) {
                fileExtension = resource.meta_data.source_name.split(".").slice(-1)[0]
                downloadUrl = resource.meta_data.source_name
            }

            data.tenant = {
                logo: this.slide.tenant.logo
            }
            data.pdf = {
                source_url: url,
                download_url: downloadUrl,
                title: resource.name,
                name: `${resource.name}.${fileExtension}`,
                resource_id: resource.resource_id
            }
            if(document.viewType != 'embed') {
                let {section, product } = this.slide;
                let chapter = this.slide.walkthrough.name;
                data.breadcrumb = product.slug === section.slug ?
                    `home > ${section.name} > ${chapter}` :
                    `home > ${product.name} > ${section.name} > ${chapter}`;
            }
            Backbone.trigger('launch_pdf', data)
        },

        setSlideArea: function(){
            var slideId = this.$(".slideArea").attr('id');
            var slideType = this.$("#" + slideId).attr('slide-type');
            if ($(window).width() < 766) {
                this.$("#" + slideId).css({'width' :'100%'});
                if (slideType == "content"){
                    this.setIframeArea();
                }
                return;
            };
            var hasSecResAudio = this.$("#" + slideId).parent().children().hasClass('image_with_audio');
            var playerWidth = $('#player').width();
            var playerHeight = $('#player').height();
            if(slideType == "image"){
                var image_src = this.$("#" + slideId + " img").attr("src");
                var imageWidth = 0;
                var imageHeight = 0;
                if(image_src){
                    var image = new Image();
                    image.addEventListener('load', () => {
                        imageWidth = image.naturalWidth;
                        imageHeight = image.naturalHeight;
                        if(imageHeight > imageWidth){
                            this.$("#" + slideId).css({'width': '100%'});
                        }else{
                            if(hasSecResAudio) playerHeight -= 50;
                            var newImageWidth = (imageWidth*playerHeight)/imageHeight;
                            var containerWidth = ((newImageWidth*100)/playerWidth) - 1;
                            if(containerWidth <= 100) {                    
                                this.$("#" + slideId).css({'width': containerWidth + '%'});
                            }else{
                                this.$("#" + slideId).css({'width': '98%'}); 
                            }
                        };
                    })
                    image.src = image_src;
                }
            }else if(slideType == "video"){
                var containerWidth = ((playerHeight*16)/9);
                if(playerWidth >= containerWidth) {                    
                    this.$("#" + slideId).css({'width': containerWidth});
                }else{
                    this.$("#" + slideId).css({'width': '98%'}); 
                }
            }else if(slideType == "360"){
                this.updateCoverDimension(this.$(".product-frame:first-child img").attr("src"), -65);
            }else if(slideType == "sandbox"){
                this.updateCoverDimension(this.$(".sandbox-player .sandbox-frame:first-child img").attr('src'));
            }else if (slideType == "content"){
                this.setIframeArea();
            };;
        },
        
        setIframeArea: function () {
            if (this.$('.fr-element .fr-iframe').length >= 1) {
                var iframeWidth = this.$('.fr-element').width() + 100;
                var iframeHeight = (iframeWidth*9)/16;
                this.$('.fr-element .fr-iframe').css({
                    "width" : iframeWidth,
                    "height" :iframeHeight
                });
            };
        },

        appendHotSpot: function (details) {
            details.hotspot_id = this.$('.hotspot').length + 1;
            var hotspot = $(Hotspot(details));
            if(details.display.color != "transparent"){
                var _event = details.action && details.action.event || 'click';
                hotspot.on('check_hotspot', function(){
                    hotspot.trigger(_event);
                });
            }
            if(details.hotspot_type == 'goto'){
                if(!details.action || details.action.slide_number != undefined && details.action.slide_number != "noaction"){
                    hotspot.click(function(){ // jump to slide number in walkthrough
                        if(hotspot.data('uiDraggable') || hotspot.data('uiResizable') || hotspot.data('uiSelectable')) return;
                        var slide_number = details.action && details.action.slide_number || 'next';
                        hotspot.trigger('scroll_slide', slide_number);
                    });
                }
            }
            this.$(".slideArea").append(hotspot);
        },

        appendPin: function (pin_data) {
            var attrs = {
                position: '',
                left: pin_data.display.left,
                top: pin_data.display.top,
            }
            var slideType = this.$('.slideArea').attr('slide-type');
            if (slideType == '360') {
                attrs.order = '+';
            } else {
                if (this.slide.pins.length > 1) {
                    attrs.order = pin_data.order
                } else {
                    attrs.order = '';
                }               
            };
            if(pin_data.callout){
                attrs.title = pin_data.callout.title,
                attrs.body = pin_data.callout.body
            }
            if(pin_data.id) attrs.id = pin_data.id;
            var pin = Pin(attrs);
            if (slideType == 'image') {
                this.$(".slideArea").append(pin);
            } else if(slideType=='360'){
                this.$('.slideArea .product-frame:nth-child('+pin_data.display.frame_number+')').append(pin);
            };
        },

        triggerHotspot: function(e){
            if(e.keyCode > 48 && e.keyCode < 58 && String.fromCharCode(e.keyCode)){
                this.$('#hotspot' + String.fromCharCode(e.keyCode)).trigger('check_hotspot');
            }
        },

        hideHotspot: function(){
            this.$('.info-tooltip').hide().removeClass('active');
        },

        /**
         * why: Realod the gif animation, to start the animation from beginning
         */
        animateGif: function() {
            let resource = this.slide.primary_resource;
            if(resource.type !== 'image') {
                return;
            }
            let imageType = this.$el.find('img').attr('image-type');
            if(imageType === 'image/gif') {
                this.$el.find('img').attr('src', resource.source);
            }
        },

        // Add image-type attribute to <img /> tag, if it is of type 'image/gif'
        appendImageToSlideArea: function(pri_res) {
            this.$('.slideArea').append($("<img class='slide_image' src='" + pri_res.source + "'>"));
            fetch(pri_res.source, { method: 'HEAD', mode: 'no-cors' })
            .then(response => response.headers.get('Content-type'))
            .then(contentType => {
                if(contentType && contentType === 'image/gif') {
                    this.$el.find('img').attr('image-type', contentType);
                }
            })
        },

        flashHotspot: function(){
            var root = this;
            setTimeout(function(){
                root.$('.info-tooltip').addClass('active');
            }, 1000)
        }, 

        addSandboxLoader: function(player) {
            this.playerView = player;
            var root = this;
            if(this.slide.primary_resource
                && this.slide.primary_resource.type == 'sandbox'
                && !this.sandbox.loader_loaded)
                {
                    this.$('.sb-buffering-container').addClass('sb-loading');
                    this.playerView.navigate_slide = false;
                    this.sandbox.navigate = false;
                    $(".customLink[target=next]").addClass('disabled');
                    $(".customLink[target=prev]").addClass('disabled');
                    setTimeout(function(){
                        root.$('.sb-buffering-container').removeClass('sb-loading'); 
                        root.sandbox.loader_loaded=true;
                        root.playerView.navigate_slide = true;
                        root.sandbox.navigate = true;
                        if(player.embed_playlist){
                            if(Common.CURRENT_SLIDE !== 1)
                                $(".customLink[target=prev]").removeClass('disabled');
                                $(".customLink[target=next]").removeClass('disabled');
                        } else {
                            $(".customLink[target=next], .customLink[target=prev]").removeClass('disabled');
                        }
                        
                    }, 5000);
                } else{
                    this.sandbox.navigate = true;
                }
        },

        triggerSlideClick: function (e) {
            this.$('.slides-Container').trigger('slide_click', e);
        },

        getURLProperties: function(url){
            if(!url.startsWith('http')){
                url = 'http://' + url
            }
            url = new URL(url);
            var data = {
                size: 0,
                name: url.origin,
                url_type: 'web'
            }

            var filename;
            var url_parts = _.compact(url.pathname.split('/'));
            if(url_parts.length){
                filename = url_parts[url_parts.length - 1]
                if(filename && filename.split('.')[1]){
                    data.name = filename;
                    data.url_type = filename.split('.')[1];
                }
            }
            return data;
        },

        // slide audio control functions
        playAudio: function(){
            var audio = this.getAudio();
            if(audio){
                if(audio.paused){
                    audio.play();
                    this.$('.audio-control').removeClass("play").addClass("pause autoplayed");
                }else{
                    audio.pause();
                    this.$('.audio-control').removeClass("pause").addClass("play");
                }
            }
            $(audio).on("timeupdate", {'root': this}, this.timeUpdate);
        },

        forwardAudio: function(){
            var audio = this.getAudio();
            if(audio && !audio.paused) {
                audio.currentTime = audio.currentTime + 5;
            }
        },

        backwardAudio: function(){
            var audio = this.getAudio();
            if(audio && !audio.paused) {
                audio.currentTime = audio.currentTime - 5;
            }
        },

        seekAudio: function(event){
            var audio = this.getAudio();
            if(audio){
                var duration = audio.duration;
                var position = event.offsetX;
                var timelineWidth = this.$(".audio-timeline").width();
                var seek_to = position / timelineWidth;
                if(!audio.paused) {
                    audio.currentTime = ((duration * seek_to * 100)/100).toFixed(2);
                };
            }
        },

        muteAudio: function(event){
            var audio = this.getAudio();
            if (!audio.muted) {
                audio.muted = true;
                this.$(event.currentTarget).addClass('muted');
            } else{
                audio.muted = false;
                this.$(event.currentTarget).removeClass('muted');
            };
        },

        totalAudioDuration: function(event) {
            var total = event.currentTarget.duration || 0;
            this.$(".audio-duration").text(this.timeConvertion(total));
        },

        timeUpdate: function (event) {
            // Synchronizes playhead position with current point in audio
            var root = event.data.root;
            var audio = event.currentTarget;
            root.updateAudioProgress(audio);

            var cduration = root.timeConvertion(audio.currentTime);
            root.$(".audio-currentTime").text(cduration);

            if (audio.currentTime == audio.duration) {
               audio.pause();
               root.$('.audio-control').removeClass("pause").addClass("play");
               root.$('.audio-progress').css({'width':'100%'});
            }
        },

        updateAudioProgress: function(audio){
            var timelineWidth = this.$(".audio-timeline").width();
            var playPercent = timelineWidth * (audio.currentTime / audio.duration);
            this.$(".audio-progress").css({
                "width": playPercent
            });
        },

        timeConvertion: function(duration){
            let durationMin = parseInt(duration / 60),
                durationSec = parseInt(duration % 60);
            if(durationMin == 0){
                durationMin += '0';
            }
            if(durationSec < 10){
                durationSec = '0' + durationSec;
            }
            return durationMin + ":" + durationSec;
        },

        getAudio: function(){
            if(this.$('audio').length){
                return this.$('audio')[0];
            }
        },

        initProductViewer: function(totalFrames){
            var root = this;
            this.$( ".slider360" ).slider({
                max: totalFrames - 1,
                slide: function( event, ui ) {
                    var framenum = ui.value + 1;
                    root.$('.product-viewer').find('.product-frame').removeClass('active');
                    root.$('.product-viewer').find('.product-frame:nth-child('+ framenum +')').addClass('active');
                }
            });
        },

        loadFrame: function(frameNo, fromBookmark){
            let sandboxFrames = this.slide.primary_resource.meta_data.frames;
            // check if all frames of sandbox are loaded
            if(this.allSandboxFramesLoaded()) {
                return true;
            }

            // if clicked on bookmark load 8 (previous 4 and next 3) frames including bookmark frame
            // if clicked next, load next 4 frames including current frame 
            let maxLoad = (fromBookmark) ? 8 : 4;
            let prev = false;
            for(let i=0;i<maxLoad;i++) {
                // get frame index using frame no
                let frameIndex = sandboxFrames.findIndex((frame) => {
                    return frame.index == frameNo;
                });
                if(fromBookmark && !prev) {
                    prev = true;
                    frameIndex = (frameIndex-4 < 0) ? 0 : frameIndex-4;  
                }
                if(sandboxFrames[frameIndex]) {
                    let nextFrame = sandboxFrames[frameIndex+1];
                    // if frame loaded to DOM
                    if(this.sandbox.loaded_frames.indexOf(sandboxFrames[frameIndex].index) != -1) {
                        // get the next frame by increasing the current index
                        if(nextFrame) {
                            frameNo = nextFrame.index;
                        } else {
                            break;
                        }
                    } else { 
                        // get frame data using frame index 
                        // load frame to DOM
                        let frame = sandboxFrames[frameIndex];
                        this.traverseThroughFramesAndAppend(frame, frameIndex);
                        if(nextFrame) {
                            frameNo = nextFrame.index;
                        } else {
                            break;
                        }
                    }
                }
            } 
        },

        allSandboxFramesLoaded: function() {
            let sandboxFrames = this.slide.primary_resource.meta_data.frames;
            // check if all frames of sandbox are loaded to DOM
            if( this.sandbox.loaded_frames.length == sandboxFrames.length) {
                return true;
            }
        },
        
        /**
         * Traverse through frames and append to DOM
         */
        traverseThroughFramesAndAppend: function(frame, idx) {
            this.sandbox.loaded_frames.push(frame.index);
            if(frame.type == "image"){
                var image_path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'image');
                this.$(`#slider${this.slide.order} .sandbox-player`).append(
                    `<div class="sandbox-frame" id="frame-${this.slide.order}-${frame.index}" data-frame-order="${idx}">
                        <img class="sandbox_image" src="${image_path}">
                    </div>`);
                if (idx == 0) {
                    this.$(`#frame-${this.slide.order}-${frame.index} img`).one('load', () => {
                        this.updateCoverDimension(image_path);
                    });
                };
                this.loadFrameAsset(frame);
            } else if(frame.type == "video"){
                var video_path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'video');
                this.$(`#slider${this.slide.order} .sandbox-player`).append(
                    `<div class="sandbox-frame" id="frame-${this.slide.order}-${frame.index}">
                        <video preload="none"><source src="${video_path}"></video>
                    </div>`);
            }
        },

        loadFrameAsset: function(frame){
            var annotation = frame.annotation;
            this.$('#frame-' +
                   this.slide.order +
                   '-' + frame.index)
                .append('<div data-current-frame="' + frame.index +
                        '"class="annotation" style="width:' + annotation.width +
                        '%;top:' + annotation.top +
                        '%;left:' + annotation.left +
                        '%;height:' + annotation.height +
                        '%;"></div>');
        },

        getSanboxPath: function(path, i, type){
            i = i.toString();
            if (i.length == 1) {
                i = "000"+i;
            } else if (i.length == 2) {
                 i = "00"+i;   
            } else if (i.length == 3) {
                 i = "0"+i;   
            }
            if(type == 'image'){
                path += '/frame-' + i + '.jpg'
            }else if(type == 'video'){
                path += '/video-' + i + '.mp4'
            }
            return path
        },

        updateCoverDimension: function(src, height_diff){
            if(!src) return
            var image = new Image();
            image.src = src;
            var imageWidth = image.naturalWidth;
            var imageHeight = image.naturalHeight;
            var playerHeight = $('#player').height()
            if(height_diff){
                playerHeight += height_diff;
            }
            var playerWidth = $('#player').width();

            var newImageWidth = (imageWidth * playerHeight) / imageHeight;
            var containerWidth = ((newImageWidth * 100) / playerWidth) - 1;
            containerWidth >= 100 ? this.$(".slideArea").css({'width': '100%'}) : this.$(".slideArea").css({'width': containerWidth + '%'});
        },

        resumePlayingSandbox: function(event){
            let curr_frame = parseInt(this.$(event.currentTarget).attr('data-current-frame'));
            $('.dt-btn-prev').removeClass('disabled');
            this.playSandbox(curr_frame);
        },

        gotoFrame: function(frameNo){
            if(this.$('#frame-'+ this.slide.order +'-' + frameNo).length){
                this.$('#slider'+ this.slide.order +' .sandbox-frame.active').removeClass('active');
                this.$('#frame-'+ this.slide.order +'-' + frameNo).addClass('active');
            }
        },

        navigateFrame: function(direction){
            if(!this.sandbox.navigate) return
            var cur_frameNo = parseInt($('#slider'+ this.slide.order +' .sandbox-frame.active').attr('id').split('-').pop());
            // get frame index using frame no
            let sandboxFrames = this.slide.primary_resource.meta_data.frames;
            let frameIndex = sandboxFrames.findIndex((frame) => {
                return frame.index == cur_frameNo;
            });

            if(direction == 'next' && this.$('#frame-'+ this.slide.order +'-' + (cur_frameNo+1)).length){
                this.playSandbox(cur_frameNo);
            }else if(direction == 'prev' && frameIndex > 0){
                let prevFrameNo = sandboxFrames[frameIndex-1].index;
                if(prevFrameNo >= 0 && !this.$('#frame-'+ this.slide.order +'-' + prevFrameNo).length) {
                    this.loadFrame(cur_frameNo, 'from_prev_navigation');
                }
                if(this.$('#slider'+ this.slide.order +' .sandbox-frame.active img').length){
                    prevFrameNo = sandboxFrames[frameIndex-2].index;
                }
                this.gotoFrame(prevFrameNo);
                this.setSandboxNotes();
            }
        },

        playSandbox: function(current_frame){
            if(!this.sandbox.navigate) return
            this.loadFrame(current_frame);
            // get frame index using frame no
            let sandboxFrames = this.slide.primary_resource.meta_data.frames;
            let frameIndex = sandboxFrames.findIndex((frame) => {
                return frame.index == current_frame;
            });
            let nextVideoFrameNo = sandboxFrames[frameIndex+1].index;
            let nextImageFrameNo;
            if(sandboxFrames[frameIndex+2]) {
                nextImageFrameNo = sandboxFrames[frameIndex+2].index;
            }
            let nextVideoFrameElem = `#frame-${this.slide.order}-${nextVideoFrameNo}`;
            if(this.$(`${nextVideoFrameElem}`).length){
                this.$(`${nextVideoFrameElem} video`).on('waiting', () => {
                    this.$(`#slider${this.slide.order} .loading-progress`).show();
                });
                this.$(`${nextVideoFrameElem} video`).on('playing', () => {
                    this.$(`#slider${this.slide.order} .loading-progress`).hide();
                    this.$(`${nextVideoFrameElem}`).addClass('active');
                    this.$(`#frame-${this.slide.order}-${current_frame}`).removeClass('active');
                });
                this.$(`${nextVideoFrameElem} video`).on('ended', () => {
                    if(this.$(`#frame-${this.slide.order}-${nextImageFrameNo}`).length){
                        this.$(`#slider${this.slide.order} .sandbox-player .sandbox-frame.active`).removeClass('active');
                        this.$(`#frame-${this.slide.order}-${nextImageFrameNo}`).addClass('active');
                        this.setSandboxNotes();
                    }
                    this.sandbox.navigate = true;
                    this.playerView.navigate_slide = true;
                })
                var videoElement = this.$(`${nextVideoFrameElem} video`);
                if(videoElement.length){
                    this.sandbox.navigate = false;
                    this.playerView.navigate_slide = false;
                    videoElement[0].play();
                }else{
                    this.gotoFrame(current_frame + 1);
                }
            }
        },

        setFramePosition: function(){
            if(this.$('#slider'+ this.slide.order +' .sandbox-frame.active .annotation').length){
                this.sandbox.current_frame = parseInt(this.$('#slider'+ this.slide.order +' .sandbox-frame.active .annotation').attr('data-current-frame'));
                var root = this;
                this.sandbox.current_frame_index = _.findIndex(this.slide.primary_resource.meta_data.frames, function(frame){
                    return frame.index == root.sandbox.current_frame;
                });
            }
        },

        setSandboxNotes: function() {
            $('.pagination-wrap').hide();
            $('.notes-link').text("").removeAttr('data-link-type').removeAttr('data-link-resource').removeClass('active');
            if (Common.CURRENT_SLIDE != this.slide.order) return;
            this.setFramePosition();
            var frame = this.slide.primary_resource.meta_data.frames && this.slide.primary_resource.meta_data.frames[this.sandbox.current_frame_index];
            let localeId = document.current_locale;
            let notes = '';
            if(frame && frame.notes && frame.notes[localeId])
                notes = frame.notes[localeId];
            $('.notes .notes-wrap-inner p').show().html(notes || "");
            $('.notes h1').text("");
            jcf.replaceAll();
        },

        setSlideNotes: function() {
            if(!this.slide) return;
            if (this.slide.primary_resource.type == "sandbox") return this.setSandboxNotes();
            if(this.slide.notes){
                this.updateSlideNotes(this.slide.notes);
            }else{
                this.clearSlideNotes();
            }
            Backbone.trigger('notes_changed');
        },

        updateSlideNotes: function(notes, pageNumber){
            // By default update to page '1'. 
            if (!pageNumber) pageNumber = '1';

            if (_.isEmpty(notes)) {
                this.clearSlideNotes();
                return;
            }
            $('.notes h1').show().html(notes[pageNumber].title || "");
            $('.notes .sub-inner p[target="body"]').show().html(notes[pageNumber].body || "");
            if(notes[pageNumber].link){
                var linkData = notes[pageNumber].link;
                if (linkData.title == ""){
                    $('.notes-link').removeClass('active');
                }else{
                    $('.notes-link').addClass('active'); 
                }
                $('.notes-link').text(linkData.title || "");
                $('.notes-link').attr("data-link-type", linkData.type || "");
                $('.notes-link').attr("data-link-resource", linkData.resource || "");
            }else{
                $('.notes-link').text("").removeAttr('data-link-type').removeAttr('data-link-resource');
            }
            $('.pagination-wrap').show().html(NotePagination({'notes': notes}));
            if (Object.keys(notes).length <= 1) $('.pagination, .page-prev, .page-next').hide();
            $('.pagination-wrap ul li').removeClass('active');
            $('.pagination-wrap ul li[data-page="' + pageNumber + '"]').addClass('active');
            $('.notes').removeClass('add-notes no-notes');
            var left = 90 - (parseInt(pageNumber)*30);
            $('.pagination ul').css('left', left+'px');
        },

        clearSlideNotes: function(){
            $('.notes').addClass('no-notes');
            $('.notes h1').hide().html("");
            $('.notes .sub-inner p').hide().html("");
            $('.notes-link').text("").removeAttr("data-link-type").removeAttr("data-link-resource").removeClass('active');
            $('.pagination-wrap').hide().html('');
        },

        toggleSandboxShortCuts: function(event) {
            this.$(event.currentTarget).toggleClass('active');
        },

        renderBookmarks: function(){
            _.each(this.slide.primary_resource.meta_data.frames, this.renderBookmark, this);
        },

        renderBookmark: function(frame){
            if(frame.type !== 'image' || $.isEmptyObject(frame.bookmarks)) return;
            var path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'image');
            let localeId = document.current_locale;
            let bookmarksTitle = '',
                bookmarksDescription = '';
            if(frame.bookmarks){
                if(frame.bookmarks.title && frame.bookmarks.title[localeId])
                    bookmarksTitle = frame.bookmarks.title[localeId];
                if(frame.bookmarks.description && frame.bookmarks.description[localeId])
                    bookmarksDescription = frame.bookmarks.description[localeId];
            }
            var attrs = {
                index: frame.index,
                title: bookmarksTitle,
                description: bookmarksDescription,
                image_src: path
            }
            var bookmarks = BookmarksTemplate(attrs);
            $('.sandbox-bookmarks .bookmarks-wrap').append(bookmarks);
        },

        checkAndNavigateSandboxFrame: function(navigationDirection){
            var frames = this.slide.primary_resource.meta_data.frames;
            var firstFrameIndex = frames[0].index;
            var lastFrameIndex = frames[frames.length-1].index;
            if (navigationDirection == "next" && !this.$(`#frame-${this.slide.order}-${lastFrameIndex}`).hasClass('active') ) {
                $('.dt-btn-prev').removeClass('disabled');
                this.navigateFrame("next");
                return true;
            } else if(navigationDirection == "prev" && !this.$(`#frame-${this.slide.order}-${firstFrameIndex}`).hasClass('active')){
                this.navigateFrame("prev");
                return true;
            } else {
                return false;
            }
        },

        setEmbedIframeSrc: function() {
            this.$('iframe').each( (index, video) => {
                let videoSrc = $(video).attr('src');
                if(videoSrc) {
                    let videoData = Common.enhanceVideoURL(videoSrc);
                    // Update iframe data only if it videoData has embedType property
                    if(videoData.embedType)
                        $(video).attr(videoData);
                }
            });
        }

    });

    return SlideView;
});
