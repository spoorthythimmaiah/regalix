/*global define*/
'use strict';

define(['jquery',
        'underscore',
        'jcf',
        './models/check_redirect_url',
        './models/cta_analytics',
        './models/download',
        './models/product-tree',
        './models/repository_connector',
        './models/audio_video_analytics',
        './models/sample_exchange_activity',
        './models/visit',
        './templates/languages.handlebars',
        './templates/search-results.handlebars',
        './templates/texteditor_preview.handlebars',
        './templates/notes-links-popup.handlebars',
        './templates/image-popup.handlebars',
        './templates/check-default-locale-popup.handlebars',
        'jcf.scrollable',
        'cookies',
        'wheelzoom',
        '../helpers/sync'
], function (
    $, _, jcf, CheckRedirect, CTAAnalytics, Download,
    ProductTree, RepositoryConnector, AudioVideoAnalytics, SampleExchangeActivity,
    VisitActivity, LanguageListTemplate, SearchResultsTemplate,
    texteditorPreview, NotesLinkPopup, ImagePopup, CheckDefaultLocalePopup
) {
    return {
        // key constants
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        BACKSPACE: 8,
        CURRENT_SLIDE: 0,
        DEFAULT_AUDIO_ICON: '/static/images/thumb-audio.png',
        DEFAULT_IFRAME_ICON:'/static/images/author/thumb-iframe.jpg',
        DEFAULT_CHAPTER_ICON: '/static/images/default_chapter_icon.jpg',
        DEFAULT_LINK_ICON: '/static/images/default_link_icon.png',
        DEFAULT_EXTERNAL_LINK_ICON: '/static/images/author/thumb-link.jpg',
        DEFAULT_MEDIA_PATH: '/static/media/',
        DEFAULT_VIDEO_POSTER: '/static/images/video-thumb.jpg',
        ENTER_KEY: 13,
        EXTERNAL_RESOURCE_PATH: '/static/media/external_icons/',
        ESCAPE_KEY: 27,
        VIDEO_FILE_MAX_SIZE: 500,
        DEFAULT_FILE_MAX_SIZE: 700,
        KEY_NAVIGATION: true,
        LETTER_I: 73,
        LETTER_Y: 89,
        LOCAL_STORAGE: window.sessionStorage || window.localStorage,
        LOREM_IPSUM: '',
        SPACEBAR: 32,
        SHOW_HOTSPOT: true,
        SLIDE_TRANSITION_EFFECT: 'fade',
        SLIDE_TRANSITION_SPEED: 'normal', //  'fast', 'normal', 'slow' or  400, 800 and 1200
        SECTION_IMAGE_PATH: '/static/images/section-default-icon.png',
        SECTION_ASSET_ROUTE: '/section-assets/',
        SECTION_LINK_TYPE_IMAGE_PATH: '/static/images/section-default-link-icon.png',
        SKIP_SANDBOX: false,
        SUGGESTION_PLACEHOLDER: {
            "title": "Perfect! We've found recommended content that should help you with your problem.",
            "body": "These steps should help you align Professional Services solutions with the customer's current challenges."
        },
        VISIT_STACK: [],
        USER_SHOW_NOTES: false,

        // Froala settings
        FROALA_KEY: 'MB1C2D1C1lG4J4A14A7D3D6A5C2H4D3gSXSE1LHAFJVCXCLS==',
        FROALA_RESOURCE_UPLOAD_URL: '/api/resource/rte-asset?author=1',
        FROALA_COLORS_BACKGROUND: [
            '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
            '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
            '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
            '#FAC51C', '#F37934', '#D14841', '#CC1F26', '#7C706B', '#D1D5D8', 'REMOVE'   
        ],
        FROALA_COLORS_TEXT: [
            '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
            '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
            '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
            '#FAC51C', '#F37934', '#D14841', '#CC1F26', '#7C706B', '#D1D5D8', 'REMOVE' ,
            '#275B58', '#408975', '#808080', '#FF3D6F' 
        ],
        FROALA_IMAGE_EDIT_BUTTONS: [
            'imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|',
            'imageLink', 'linkOpen', 'linkEdit', 'linkRemove',
            '-', 'imageDisplay','imageStyle', 'imageAlt', 'imageSize'
        ],
        FROALA_TOOLBAR_BUTTONS: [
            'bold', 'italic', 'underline', 'strikeThrough', 'fontFamily',
            'fontSize', '|', 'color', '|', 'paragraphFormat', 'align',
            'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink',
            'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote',
            'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll',
            'subscript', 'superscript', 'importTextFromURL', 'embedURL',
            'print', 'specialCharacters', 'help', 'fontAwesome', 'lineHeight','inlineStyle'
        ],
        FROALA_FONT_FAMILY: {
            "Arial, Helvetica, sans-serif": 'Arial',
            "franklin-gothic-urw, sans-serif": 'Franklin Gothic',
            "Georgia, serif": 'Georgia',
            "Impact, Charcoal, sans-serif": 'Impact',
            "Tahoma, Geneva, sans-serif": 'Tahoma',
            "Times New Roman, Times, serif, -webkit-standard": 'Times New Roman',
            "Verdana, Geneva, sans-serif": 'Verdana',
            "Calibri, sans-serif": 'Calibri',
            "Open Sans": 'Open Sans'
        },
        // Froala BMC settings
        FROALA_BMC_COLORS_TEXT: ['#000000','#FE5000','#00427E','#FF0000', '#8D8D8D'],
        FROALA_BMC_TABLE_COLORS: ['#54ACD2', '#efefef'],
        FROALA_BMC_TABLE_STYLES: {
            'bmc-table': 'BMC Table',
            'bmc-table-two': 'BMC Table Two'
        },
        FROALA_BMC_INLINE_STYLES: {
             'BMC heading one': 'font-family: Arial, Helvetica, sans-serif; font-size: 30pt; color: #fe5000;',
             'BMC heading two': 'font-family: Arial, Helvetica, sans-serif; font-size: 18pt; color: #00427e;',
             'BMC heading three': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #000; font-weight: bold;',
             'BMC normal': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #000;',
             'BMC warning': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #f00;'
        },
        // Froala HELP settings
        FROALA_HELP_COLORS_TEXT: ['#000000', '#40435b', '#828b90', '#066AFE', '#23CE00'],
        FROALA_HELP_TABLE_COLORS: ['#779de8', '#99a3a7'],
        FROALA_HELP_TABLE_STYLES: {
            'help-table': 'HELP Table',
            'help-table-two': 'HELP Table Two'
        },
        FROALA_HELP_INLINE_STYLES: {
             'HELP heading one': 'font-family:  franklin-gothic-urw, Helvetica, sans-serif; font-size: 30px; color: #066AFE;',
             'HELP heading two': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 24px; color: #40435B;',
             'HELP heading three': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 18px; color: #000; font-weight: bold;',
             'HELP normal': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #000;',
             'HELP callout': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #828B90;',
             'HELP warning': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #23CE00;'
        },

        // Froala DE settings
        FROALA_DE_INLINE_STYLES: {
             'Heading one': 'font-family:  Open Sans; font-size: 24px; color: #275B58;',
             'Heading two': 'font-family:  Open Sans; font-size: 18px; color: #408975;',
             'Heading three': 'font-family: Open sans; font-size: 14px; color: #000; font-weight: bold;',
             'Normal': 'font-family: Open sans; font-size: 14px; color: #000; text-align: justify;',
             'Errors/warnings': 'font-family: Open sans; font-size: 14px; color: #FF3D6F;',
             'Call out': 'font-family: Open sans; font-size: 18px; color: #808080'
        },
        FROALA_DE_TABLE_COLORS: ['#268974', '#F4F4F4'],
        FROALA_DE_TABLE_STYLES: {
            'de-table': 'DE Table'
        },

        toggleMobileShare: function(root, event){
            root.$('#player-container').toggleClass('mobile-social-active').removeClass('language-active notes-active share-active');
        },

        toggleMobileFullScreen: function(root, event){
            root.$('#player-container').toggleClass('mobile-full-screen-active').removeClass('language-active notes-active share-active');
        },

        changeLanguage: function(event){
            var val = $(event.currentTarget).attr('lvalue');
            var root = (event.data && event.data.root) || this;
            if(document.requestParameters){
                SDCookies.setItem('author_locale', val, null, '/');
            }else{
                SDCookies.setItem('user_locale', val, null, '/');
            }
            var changedLanguage = $(event.currentTarget).text();
            root.triggerGAevent('Header', 'Change Language - ' + changedLanguage);
            window.location.reload(true);
        },

        changeLanguageMobile: function(event){
            var val = $(event.currentTarget).children("option:selected").attr('lvalue');
            var root = (event.data && event.data.root) || this;
            if(document.requestParameters){
                SDCookies.setItem('author_locale', val, null, '/');
            }else{
                SDCookies.setItem('user_locale', val, null, '/');
            }
            var changedLanguage = $(event.currentTarget).text();
            root.triggerGAevent('Header', 'Change Language - ' + changedLanguage);
            window.location.reload(true);
        },

        checkRedirect: function(url){
            if(url){
                var split_url = url.split('/');
                this.model = new CheckRedirect({product: split_url[0], section: split_url[1], walkthrough: split_url[2]});

                var root = this;
                $.when(this.model.fetch()).done(function(){
                    var new_url = root.model.get('new_url');
                    Backbone.history.navigate('#!/' + new_url, {trigger: true});
                }).fail(function(){
                    Backbone.history.navigate("/", {trigger: true});
                })
            }
        },

        isDefaultLocale: function(root) {
            if (document.defaultLocaleID != document.current_locale){
                root.$('.popup-wrap').html(CheckDefaultLocalePopup({'default_language':document.defaultLocale}));
                root.$('.popup-overlay').addClass('active');
                return false;
            }
            return true;   
        },

        downloadSample: function(event){
            event.preventDefault();
            var attrs = {
                "entity_type": "SAMPLE",
                "entity_id": event.target.dataset.id,
                "name": event.target.dataset.name,
                "url": event.target.dataset.url
            }
            var download = new Download();
            download.save(attrs, {
                success: function(model, response){
                    var link = document.createElement("a");
                    link.download = attrs.name;
                    link.href = attrs.url;
                    document.body.appendChild(link);
                    link.click();
                }, error: function(xhr, status_code, message){
                    console.log(xhr, status_code, message);
                }
            });
        },

        getEmbedVideoDetails: function(video_url){
           
            //url rewrite
            var api_request_url, video_details;
            if(!(/^(\/\/|http:|https:).*/.test(video_url))){
                video_url = window.location.protocol + '//' + video_url;
            }

            //api url rewrite
            if(/youtu/i.test(video_url)){
                var youtube_video_id = this.youtube_parser(video_url);
                if (youtube_video_id != 'error') {
                    api_request_url = 'https://www.youtube.com/oembed?url=http://youtube.com/watch?v=' + youtube_video_id;
                }
            }else if(/vimeo/i.test(video_url)){
                api_request_url = 'https://vimeo.com/api/oembed.json?url=' + video_url;
            }else if(/brightcove/i.test(video_url)){
                var urlData = new URL(video_url)
                var videoId = urlData.searchParams.get('videoId')
                var accountId = urlData.pathname.split("/")[1]
                var apiBaseURL = 'https://edge.api.brightcove.com/playback/v1'
                var requestURL = apiBaseURL + '/accounts/' + accountId + '/videos/' + videoId;

                var urlConfig = video_url.replace('index.html', 'config.json')
                $.ajax({
                    url: urlConfig,
                    type: "GET",
                    async: false,
                    success: function(data, status){
                        $.ajax({
                            url: requestURL,
                            type: "GET",
                            async: false,
                            headers: {'Accept': 'application/json;pk=' + data.video_cloud.policy_key},
                            success: function(response){
                                video_details = {'title': response.name, 'thumbnail_url': response.poster, 'src': video_url};
                            },
                            error: function(xhr, status_code, message){
                                console.log(xhr.responseJSON['message'])
                            }
                        });
                    },
                    error: function(xhr, status_code, message){
                        console.log(xhr.responseJSON['message'])
                    }
                });
            }

            // api call to get video details        
            if(api_request_url){
                $.ajax({
                    url: '/embed-data',
                    data: {
                        'api_request_url':api_request_url
                    },
                     dataType: "json",
                     async: false,
                     success: function (response) {
                      video_details = response;
                    },
                    error:function(xhr,status_code,message){
                           console.log(xhr.responseJSON['message'])
                    }

                });
            }
            return video_details;
        },

        getSuggestionImageSrc: function(suggestion){
            var imageSrc = '/static/images/default_chapter_icon.jpg';
            if(suggestion.external_url)
                imageSrc = suggestion.external_url.icon || this.DEFAULT_LINK_ICON;
            else if(suggestion.resource){
                let resource = suggestion.resource;
                let resource_type = resource.resource_type;
                let media_path = resource_type == 'link' ? this.EXTERNAL_RESOURCE_PATH : this.DEFAULT_MEDIA_PATH
                let meta_data = resource.meta_data || {} ;
                if (resource_type == 'image'){
                    imageSrc = media_path + resource.path;
                }else if(resource_type == 'sandbox'){
                    imageSrc = resource.path;
                }else if(resource_type == '360'){
                    imageSrc = `${media_path}${resource.path}/1.jpg`;
                }else if (resource_type == 'link'){
                    imageSrc = media_path + resource.meta_data.icon_name;
                }else if (resource_type == 'embed'){
                    imageSrc = meta_data.thumbnail_url ?
                        meta_data.thumbnail_url : this.DEFAULT_LINK_ICON;
                }else if(resource_type == 'pdf' && meta_data.thumbnail_url){
                        imageSrc = media_path + meta_data.thumbnail_url;
                }
            }

            return imageSrc;
        },
        
        updatePathfinderIconSrc: function(data){
            if(data.icon){
                data.image_src = this.DEFAULT_MEDIA_PATH + data.icon.path;
            }
            if (data.options){
                var root = this;
                _.each(data.options, function(option){
                    if(option.icon){
                        option.image_src = root.DEFAULT_MEDIA_PATH + option.icon.path;
                    }
                })
            }
            return data;
        },
        
        getLastVisit: function(){
            if(this.VISIT_STACK.length){
                return this.VISIT_STACK[this.VISIT_STACK.length - 1];
            }
            return null;
        },

        generateUUID : function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        },

        getParent: function(){
            if(this.VISIT_STACK.length){
                return this.VISIT_STACK[this.VISIT_STACK.length - 2];
            }
            return null;
        },

        getProductTree: function(product_id, section_id, callback){
            this.product_tree = new ProductTree({product: product_id, section: section_id});
            this.product_tree.on('change', _.bind(function(){
                this.resetVisits();
                this.setVisit({'name': 'Home', 'slug': null});
                var root = this;
                _.each(this.product_tree.get('path'), function(section){
                    section.description = section.description || root.LOREM_IPSUM;
                    root.setVisit(section);
                });
                callback && callback();
            }, this));
            var root = this;
            $.when(this.product_tree.fetch()).fail(function(jqXHR, textStatus, errorThrown){
                root.modelFetchErrorHandler(jqXHR, textStatus, errorThrown);
            })
        },

        getProgressClass: function(progress){
            var p_class;
            if(progress >= 10 && progress < 20){
                p_class = 'fill10';
            }else if(progress >= 20 && progress < 30){
                p_class = 'fill20';
            }else if(progress >= 30 && progress < 40){
                p_class = 'fill30';
            }else if(progress >= 40 && progress < 50){
                p_class = 'fill40';
            }else if(progress >= 50 && progress < 60){
                p_class = 'fill50';
            }else if(progress >= 60 && progress < 70){
                p_class = 'fill60';
            }else if(progress >= 70 && progress < 80){
                p_class = 'fill70';
            }else if(progress >= 80 && progress < 90){
                p_class = 'fill80';
            }else if(progress >= 90 && progress < 100){
                p_class = 'fill90';
            }else if(progress >= 100){
                p_class = 'fill100';
            }
            return p_class;
        },

        hideEntities: function(){
            if (document.isPrivateTenant && document.isUserAnonymous) 
                $('.open-path-finder').hide();
            else
                $('.open-path-finder').show(); 
        },

        isCharKey: function(e){
            if(e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105 || e.which == 91){
                return true
            }
            return false
        },

        isValidCharacter: function(e){
            return (this.isCharKey(e) || e.keyCode === this.BACKSPACE)
        },

        loadWalkthrough: function(product, section, walkthrough, slide_index){
            if (product == section) {
                var walkthrough_url = '#!/' + product + '/' + walkthrough;
            } else {
                var walkthrough_url = '#!/' + product + '/' + section + '/' + walkthrough;
            }

            if(!slide_index){
                // if showThankyou page has been displayed, remove it.
                $('#player-container').removeClass('cta-active');
                $(".slidesContainer").css("z-index" , "0");
                slide_index = 1;                
            }
            Backbone.history.navigate(walkthrough_url + '/' + slide_index, {trigger: true});
        },

        loadLanguages: function(languages){
            var l_list = _.filter(languages.languages, function(lang){
                return lang.locale !== languages.selected.locale;
            });
            var l_selected = languages.selected;
            var default_language = _.find(languages.languages, function(lang){ return lang.default_locale == true; });
            var locale_available = _.find(languages.languages, function(lang){ return languages.selected.locale == lang.locale;});
            if(!locale_available){
                l_selected = default_language;
                l_list = _.filter(l_list, function(lang){return lang.locale !== l_selected.locale});
            }
            $('.sd-language').html(LanguageListTemplate({'selected': l_selected, 'languages': l_list}));
            var _this = this;
            $("#user-language li").on('click', {'root': this}, function(e){_this.changeLanguage(e)});
        },

        trackCTAAnalytics: function(cta_id, product, section, chapter){
            if(!document.isOffline && ['home', 'journey'].includes(
                document.viewType.toLocaleLowerCase())
            ) {
                var args = {'cta_id': cta_id};
                if(product){
                    args['product'] = product
                }
                if(section){
                    if(chapter || product !== section){
                        args['section'] = section
                    }
                }
                if(chapter){
                    args['chapter'] = chapter
                }
                this.cta_activity = new CTAAnalytics(args);
                this.cta_activity.save();
            }
        },

        downloadResource: function(event) {
            /** Since downloading from CDN(i.e Cross domian) doesn't allow
                to re-name the downloaded file to its original name,
                Files will be downloaded from our server. 
            */
            event.preventDefault();
            let data = event.currentTarget.dataset;
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = this.DEFAULT_MEDIA_PATH + data.url.split('/').pop();
            a.download = data.name;
            document.body.appendChild(a);
            a.click();
            // log download activity.
            this.logDownloads(data);
            // remove anchor tag from Body.
            document.body.removeChild(a);      
        },

        logDownloads: function(data) {
            let attrs = {
                "entity_type": "RESOURCE",
                "entity_id": data.id,
                "name": data.name,
                "url": window.location.href
            }
            let download = new Download(attrs);
            download.save();
        },

        logSampleExchangeActivity: function(visit_args={}) {
            let SamplesActivity = new SampleExchangeActivity(visit_args);
            SamplesActivity.save();       
        },

        logVisitActivity: function(product, section, walkthrough){
            if(!document.isOffline && document.viewType == 'home'){
                var visit_args = {};
                if(product){
                    visit_args['product'] = product
                }
                if(section){
                    visit_args['section'] = section
                }
                if(walkthrough){
                    visit_args['walkthrough'] = walkthrough
                }
                this.visit_activity = new VisitActivity(visit_args);
                this.visit_activity.save();
            }
        },

        modelFetchErrorHandler: function(jqXHR, textStatus, errorThrown){
            if(jqXHR.status == 404){
                var complete_url = Backbone.history.getHash();
                return this.checkRedirect(complete_url.split('!/')[1]);
            }else if(jqXHR.status == 400){
                SDCookies.removeItem('user_locale');
                SDCookies.removeItem('author_locale');
                window.location.reload();
            }
        },

        positionPinTooltip: function(elem, currentSlide) {
            var toolTip = $('.pin-active .pin-tooltip');
            var elemOffsetTop = elem.offsetParent.offsetTop;
            var elemOffsetLeft = elem.offsetParent.offsetLeft;
            var elemOffsetRight = currentSlide.width() - (elemOffsetLeft + 40);// adding arrow height
            var elemOffsetBottom = currentSlide.height() - (elemOffsetTop + 40);
            var activePinTooltipWidth = $('.pin-active .pin-tooltip').width() + 40;
            var activePinTooltipHeight = $('.pin-active .pin-tooltip').height() + 40;
            if ( elemOffsetTop > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth/2 && elemOffsetRight > activePinTooltipWidth/2 ) {
                toolTip.attr('data-pin-position','top');
            } else if( elemOffsetBottom > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth/2 && elemOffsetRight > activePinTooltipWidth/2 ) {
                toolTip.attr('data-pin-position','bottom');
            } else if (elemOffsetTop > activePinTooltipHeight/2 && elemOffsetBottom > activePinTooltipHeight/2 && elemOffsetLeft > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','left');
            } else if (elemOffsetTop > activePinTooltipHeight/2 && elemOffsetBottom > activePinTooltipHeight/2 && elemOffsetRight > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','right');
            } else if (elemOffsetBottom > activePinTooltipHeight && elemOffsetRight > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','bottom-left');
            } else if (elemOffsetBottom > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','bottom-right');
            } else if (elemOffsetTop > activePinTooltipHeight && elemOffsetRight > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','top-left');
            } else if (elemOffsetTop > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth ) {
                toolTip.attr('data-pin-position','top-right');
            }

            // set dynamic height for tooltip
            let pinBlock = toolTip.find('.pin-block');
            pinBlock.height('auto');
            if (toolTip.data('pin-position') == 'bottom' && activePinTooltipHeight > elemOffsetBottom){
                pinBlock.height(elemOffsetBottom - 80);
            } else if (toolTip.data('pin-position') == 'top' && activePinTooltipHeight > elemOffsetTop){
                pinBlock.height(elemOffsetTop - 80);
            }
        },

        removeLastVisit: function(){
            this.VISIT_STACK.pop();
        },

        resetVisits: function() {
            this.VISIT_STACK = [];
        },

        searchTags: function(event){
            var searchTagText = event.target.textContent;
            $("#search-terms").val('tags: ' + searchTagText).trigger('keyup');
        },

        setVisit: function(section){
            this.VISIT_STACK.push(section);
        },

        toggleDropDownDisplay: function() {
            var enabled = $('.dropdown-list');
            if(enabled.is(':visible')) {
                enabled.hide();
            }
            else {
                enabled.show();
            }
            $('#create-edit-demo ul.dropdown-list').niceScroll();
        },

        transition: function (direction) {
            if(document.template_folder !== 'default') {
                var newPage = $(".page-container:not(.page-current)");
                $(newPage).addClass('page-current');
                return;
            } 
                var VISIT_STACK = this.VISIT_STACK;
                switch(direction) {
                case 'next':
                    direction = +1;
                    break;
                case 'prev':
                    direction = -1;
                    break;
                default:
                    direction = 0;
                };
                var iflow = (VISIT_STACK.length || 1) + direction;
                var oflow = $('.block_container').attr('data-flow') || iflow;
                $('.block_container').attr('data-flow', iflow);
                var lastPage = $(".page-container.page-current");
                var newPage = $(".page-container:not(.page-current)");

                if (iflow == oflow) {
                    $(newPage).addClass('page-current');
                    $(lastPage).remove();
                } else if (iflow  >  oflow ) {
                    $(newPage).addClass("page-moveFromRight page-current");
                    $(lastPage).addClass("page-moveToLeft");
                    setTimeout(function(){
                        $(newPage).removeClass("page-moveFromRight ");
                        $(lastPage).remove();
                    }, 1000);
                } else{
                    $(newPage).addClass("page-moveFromLeft page-current");
                    $(lastPage).addClass("page-moveToRight");
                    setTimeout(function(){
                        $(newPage).removeClass("page-moveFromLeft");
                        $(lastPage).remove();
                    }, 1000);
                }
        },

        tooltip: function() {
            $('[data-toggle="tooltip"]').tooltip();
        },

        triggerGAevent: function(category, action){
            !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', category, action);
        },

        trimSentence: function(string, length){
            var trimmedString = string.length > length ? string.substring(0, length - 3) + "..." : string.substring(0, length);
            return trimmedString;
        },

        updateUrl: function(e){
            if(e.altKey || ([8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]).indexOf(e.keyCode) !== -1) return;
            var value = e.target.value.trim();
            if(value && value.length && value.length >= 4 && value.indexOf('http') !== 0){
                e.target.value = 'http://' + value;
            }
        },

        validateUrl: function(url){
            return url.length && url.match(/^(http[s]?):\/\/([^/:]+\.[a-z]{2,10}|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]+)?(\/.*)?$/g);
        },

        validateEmail: function(email){
            var emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+[\.]{1,})+([a-zA-Z0-9]{2,4})+$");
            return email && email.length && emailRegex.test(email);
        },

        validateCharLimit: function(text, limit){
            return  text.length <= limit ?  false :  true;
        },

        verifyParent: function(product, current_parent){
            var parent_in_stack = this.getLastVisit();
            if(!parent_in_stack){
                return false;
            }

            if(current_parent && current_parent.slug != parent_in_stack.slug){
                if(this.VISIT_STACK.length){
                    this.removeLastVisit();
                    return this.verifyParent(product, current_parent);
                }else{
                    return false;
                }
            }

            if(this.VISIT_STACK.length >= 2){
                if(this.VISIT_STACK[1].slug != product) {
                    return false;
                }
            }
            return true;
        },

        youtube_parser: function(url){
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match&&match[2].length==11){
                return match[2];
            }else{
                return 'error';
            }
        },

        // Algolia search
        clearInputText: function(e){
            $('#search-terms').val("");
            $('.search-input-cancel, .search-result').removeClass('active');
        },

        closePathFinder: function() {
          $('.path-finder-block').removeClass('active');
          $('.pf-close, .pf-nav, .send_pf_result').hide();
          $('#select-pf').empty();
        },

        closeSearchBox: function(){
            $('#search-terms').val("");
            $('.search-result, .search-overlay, .search-input-cancel, .search_input_block, #search-terms').removeClass('active');
        },

        getSearchResults: function(){
            var searchTerm = $('#search-terms').val();
            var client = algoliasearch(document.algolia_app_id, document.algolia_search_key);
            var index = client.initIndex(document.algolia_tenant_index);
            var searchParams = {
                    hitsPerPage: 20,
                    facets: '["category"]',
                    filters: "is_enabled=1 AND category:'library'"    // 1 is evaluated to Boolean true in Algolia.
            };
            if(document.isUserAnonymous){
                searchParams.filters += ' AND is_public=1';
            }

            if(document.userGroups){
                let groupsFilterList = [];
                _.each(document.userGroups, (grpId, idx) =>{
                    groupsFilterList.push(`groups=${grpId}`);
                });
                let groupsFilterText = groupsFilterList.join(' OR ');
                searchParams.filters += ` AND ${groupsFilterText}`;
            }
            var root = this;
            if(searchTerm && searchTerm.startsWith("tags: ")){
                searchTerm = searchTerm.replace("tags: ", "");
                searchParams.restrictSearchableAttributes = 'tags';
                index.search(searchTerm, searchParams, $.proxy(root.searchCallback, root));
            }
            else{
                index.search(searchTerm, searchParams, $.proxy(root.searchCallback, root));
            }
        },

        renderSearchResults: function(searchResultsList){
            var localeId = SDCookies.getItem('user_locale');
            var filteredResultsList = [];
            var root = this;
            _.each(searchResultsList, function(searchResult){
                if(localeId && searchResult["title_" + localeId]){
                    searchResult.title = searchResult["title_" + localeId];
                    searchResult.breadcrumb = searchResult["breadcrumb_" + localeId];
                    let url = searchResult.url;
                    if (searchResult['is_asset']){
                        if (searchResult["asset_url_" + localeId]){
                            url = searchResult["asset_url_" + localeId];
                        }else{
                            url = searchResult["asset_url_" + document.defaultLocaleID];
                        }
                    }
                    searchResult.demo_url = url;
                    filteredResultsList.push(searchResult);
                }
            })

            $('#search-result').html(SearchResultsTemplate({'search_results_list': filteredResultsList}));
        },

        searchCallback: function(err, content){
            this.renderSearchResults(content.hits);
        },

        searchWalkthrough: function(event) {
            var search_term = $('#search-terms').val();
            $('.search_input_block').addClass('active');
            if(event.keyCode == 27){
                if(search_term != ''){
                    $('#search-terms').val("");
                    $('.search-result, #input, .search_input_block').removeClass('active');
                }else{
                    $('.search-result, #input, .search-overlay, .search_input_block').removeClass('active');
                }
            }
            else{
                var common = event.data.common;
                $('.search-result, .search-input-cancel').addClass('active');
                if(search_term == ''){
                    $('.search-categories .search-data').hide();
                    $('.search-input-cancel').removeClass('active');
                }else{
                    this.getSearchResults();
                }
            }
        },

        showMobileSearchBox: function(event) {
            var _ua = window.navigator.userAgent;
            var isIDevice = _ua.match(/iphone|ipod|ipad/i);
            if(isIDevice) {
                $('.search-overlay').addClass('idevice');
            }
            $('.search-overlay, #search-terms, .search_input_block').addClass('active');
        },

        showSearchBox: function(event){
            var common = event.data.common;
            if($('.path-finder-block').hasClass('active')) {
                common.closePathFinder();
            }
            common.searchWalkthrough(event);
            if (event.currentTarget.value.length >= 2) {
                var _ua = window.navigator.userAgent;
                var isIDevice = _ua.match(/iphone|ipod|ipad/i);
                if(isIDevice) {
                    $('.search-overlay').addClass('idevice');
                }
                $('.search-overlay').addClass('active');
                var searchLocation;
                var pageUrl  = window.Backbone.history.location.hash;
                if(pageUrl == "#!/"){
                    searchLocation = 'Home';
                }
                else if(pageUrl.split('/').length == 2){
                    searchLocation = 'Category';
                }
                else if(pageUrl.split('/').length == 3){
                    searchLocation = 'Playlist';
                }
                else if(pageUrl.split('/').length >= 4){
                    searchLocation = 'Player';
                }
                common.triggerGAevent('Search', searchLocation);
            };
        },

        setPaginationNotes: function(root, event){
            if (root.$(event.currentTarget).hasClass('disabled')) return;

            let requestedPage = root.$(event.currentTarget).attr('data-page');
            let activePage =parseInt(root.$('.pagination li.active').attr('data-page'));
            let pageLength = root.$('.pagination li:not([data-page="new"])').length;

            if(requestedPage == "next") {
                requestedPage = activePage + 1;
            }else if(requestedPage == "prev"){
                requestedPage = activePage - 1;
            }

            if (requestedPage == activePage || requestedPage > pageLength) return;

            let currentSlideView = root.slide_views[this.CURRENT_SLIDE-1]
            currentSlideView.updateSlideNotes(currentSlideView.slide.notes, requestedPage);

            requestedPage = parseInt(requestedPage);
            if(requestedPage == 1){
                root.$('.pagination-wrap .page-prev').addClass('disabled');
            } else if(requestedPage == pageLength){
                root.$('.pagination-wrap .page-next').addClass('disabled');
                root.$('.pagination-wrap .page-prev').removeClass('disabled');
            } else if(requestedPage > 1 && requestedPage < pageLength){
                root.$('.pagination-wrap .page-next, .pagination-wrap .page-prev').removeClass('disabled');
            }
            Backbone.trigger('notes_changed');
            jcf.replaceAll();
        },

        showNotesLinkPopup: function(root, event){
            var resourceLink = root.$(event.currentTarget).attr('data-link-resource');
            var isExternal = (root.$(event.currentTarget).attr('data-link-type') == 'EXTERNAL');
            var isInternalVideo =  (!resourceLink || (/\.(mp4|webm)$/i).test(resourceLink)) ? true: false;
            root.$('.overlay').html(NotesLinkPopup({'isExternal': isExternal, 'resourceLink': resourceLink, 'isInternalVideo': isInternalVideo})).addClass('notes-links-popup-active');

            root.$el.addClass('notes-popup-active');
            var windowHeight = $(window).height() - 200;
            root.$('.notes-link-popup-wrap .popup-wrap').css({"max-height": windowHeight});
        },

        closeNotesLinkPopup: function(root, event){
            root.$('.overlay').html("").removeClass('notes-links-popup-active');
            root.$el.removeClass('notes-popup-active');
        },
        
        showImagePopup: function(root, event){
            let resourceLink = root.$(event.currentTarget).attr('src');
            root.$('.overlay').html(ImagePopup({'resourceLink': resourceLink})).addClass('image-popup-active');
            wheelzoom(document.querySelectorAll('.scroll-zoom'));
            // only for regalix theme.
            $('a[data-template=regalix]').removeClass('nav-back-button');
            root.$('.create-new').hide();
        },

        closeImagePopup: function(root, event){
            root.$('.overlay').empty().removeClass('image-popup-active');
            root.$el.removeClass('notes-popup-active');
            $('a[data-template=regalix]').addClass('nav-back-button');
            root.$('.create-new').show();
        },

        toggleFade: function(root, event){
            if (root.$('#player-container').hasClass('side-info-active')) {
                root.$('#player-container').toggleClass('side-info-active');
                root.$('.content-avg-rating').toggle('hide');
                Backbone.trigger("side_info_opened");
            } else if(root.$(event.target).hasClass('notes-link-popup-wrap')){ 
                this.closeNotesLinkPopup(root, event);
            }
        },

        getDateDifference: function (date) {
            var diff = (new Date()) - date;
            if( diff > 2592000000){
                var days = Math.floor(diff/(2592000000));
                return (days + (days > 1 ? ' months' : ' month') + ' ago')
            } else if ( diff > 86400000  ){
                var days = Math.floor(diff/(86400000));
                return (days + (days > 1 ? ' days' : ' day') + ' ago')
            } else {
                var days = Math.floor(diff/(1000*60*60));
                return (days + (days > 1 ? ' hours' : ' hour') + ' ago')
            }
        },

        enhanceVideoURL: function(vidSrc) {
            let videoData = {};
            videoData.src = vidSrc;

            if(typeof YT != 'undefined'){
                var youtubeVidCheckRegex = /(?:https?:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(\?)?/;
                var vidSrcParams = videoData.src.match(youtubeVidCheckRegex);

                // To check if iframe is youtube's or not.
                if (vidSrcParams != null) {
                    // To check if the url contains some extra parameters.
                    if(vidSrcParams[2]=="?") {
                        let jsapiRegex = /enablejsapi=1/;
                        let jsapiSource = videoData.src.match(jsapiRegex);
                        // If JS API is not enabled, then enable it.
                        if(!jsapiSource){
                            videoData.src = videoData.src + "&enablejsapi=1";
                        }
                    }
                    // If the url contains no extra parameters.
                    else {
                        videoData.src = videoData.src + "?enablejsapi=1";
                    }
                    videoData.embedType = 'youtube';
                }
            }
            if(typeof $f != 'undefined'){
                var vimeoVidCheckRegex = /(?:https?:)?\/\/player\.vimeo\.com\/video\/([\w-]{8})(\?)?/;
                var vidSrcParams = videoData.src.match(vimeoVidCheckRegex);
                // To check if iframe is vimeo's or not.
                if (vidSrcParams != null) {
                    var vimeoVidId = vidSrcParams[1];
                    let apiRegex = /&api=1&player_id=/;
                    let apiSource = videoData.src.match(apiRegex);

                    if(!apiSource){
                        videoData.src = videoData.src + "?&api=1&player_id="+vimeoVidId;
                    }
                    videoData.embedType = 'vimeo';
                }
            }
            if(typeof Wistia != 'undefined'){
                let wistiaVidCheckRegex = /(?:https?:)?\/\/fast\.wistia\.net\/embed\/iframe\/([\w-]{1,})(\?)?/;
                let vidSrcParams = videoData.src.match(wistiaVidCheckRegex);

                if(vidSrcParams != null){
                    videoData.embedType = 'wistia';
                }
            }
            return videoData;
        },

        checkSlideAndLogActivity: function(playerContext) {
            if(document.viewType == 'edit') return;
            var curSlide = playerContext.slide_views[this.CURRENT_SLIDE-1] && playerContext.slide_views[this.CURRENT_SLIDE-1].slide;
            let isVideo = false;
            let isAudio = false;
            if(curSlide && curSlide['primary_resource'] != undefined) {
                if(['embed', 'video' ,'wistia'].includes(curSlide['primary_resource']['type'])) {
                    isVideo = true;
                } else if(curSlide['primary_resource']['type'] == 'audio'){
                    isAudio = true;
                }
            }
            if(playerContext.slide_views[this.CURRENT_SLIDE-1]){
                playerContext.slide_views[this.CURRENT_SLIDE-1].user_visited = true;
            }
            playerContext.progress = playerContext.getDemoProgress();
            if(isVideo){
                this.logVideoActivity(playerContext, playerContext.slide_views[this.CURRENT_SLIDE-1]);
            }
            else if(isAudio){
                this.logAudioActivity(playerContext);
            }
            else{
                if(playerContext.lastLoadedSlideIndex != this.CURRENT_SLIDE){
                    this.postLogActivity(playerContext, playerContext.lastLoadedSlideIndex);
                }
                this.preLogActivity(playerContext);
            }
        },

        logVideoActivity: function (playerContext, currentSlide) {
            var root = this;
            $('iframe').each(function() {
                if($(this).attr('src')) {
                    var video = $(this);
                    var vidSrc = video.attr('src');

                    if(typeof YT != 'undefined'){
                        var youtubeVidCheckRegex = /(?:https?:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(\?)?/;
                        var vidSrcParams = vidSrc.match(youtubeVidCheckRegex);

                        // To check if iframe is youtube's or not.
                        if (vidSrcParams != null) {
                            video.attr('id', vidSrcParams[1]);                     // vidSrcParams[1] == Youtube Video ID.
                            let resPath = video.attr('resPath');
                            root.newYtPlayer(playerContext, vidSrcParams[1], resPath);
                        }
                    }

                    if(typeof $f != 'undefined'){
                        // To check if iframe is vimeo's or not.
                        if (vidSrcParams != null) {
                            var vimeoPlayer = $f(video[0]);
                            // When the vimeoPlayer is ready, add listeners for playback, pause, finish.
                            vimeoPlayer.addEvent('ready', function() {
                                let resPath = video.attr('resPath');
                                vimeoPlayer.addEvent('play', function(){
                                    root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'embed');
                                });
                                vimeoPlayer.addEvent('pause', function(){
                                    root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'embed');
                                });
                                vimeoPlayer.addEvent('finish', function(){
                                    root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'embed');
                                    root.preLogActivity(playerContext);                             // Call preLogActivity when video playback is finished.
                                });
                            });
                        }
                    }

                    if(typeof Wistia != 'undefined'){
                        let wistiaVidCheckRegex = /(?:https?:)?\/\/fast\.wistia\.net\/embed\/iframe\/([\w-]{1,})(\?)?/;
                        let vidSrcParams = vidSrc.match(wistiaVidCheckRegex);

                        if(vidSrcParams != null){
                            let wistiaVideoId = vidSrcParams[1];
                            let currentResource = currentSlide.slide.primary_resource;
                            let currentVideoParams = currentResource.path.match(wistiaVidCheckRegex);
                            if ( currentVideoParams && currentVideoParams[1] == wistiaVideoId){
                                window._wq = window._wq || [];
                                window._wq.push({ id: wistiaVideoId, onReady: function(vid) {

                                    let wistiaVideo = Wistia.api(wistiaVideoId);
                                    let resPath = video.attr('resPath');
                                    wistiaVideo.bind("play", function() {
                                        root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'wistia');
                                    });

                                    wistiaVideo.bind("pause", function(t) {
                                        root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'wistia');
                                    });

                                    wistiaVideo.bind("end", function(t) {
                                        root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'wistia');
                                        root.preLogActivity(playerContext);
                                    });

                                }});
                            }
                        }
                    }
                }
            });

            $('video').each(function(){
                if(!$(this).hasClass('Events-Tagged')){
                    root.addAVEvents(playerContext, this);
                    $(this).addClass('Events-Tagged');                              // To Avoid multiple times event-bindings.
                }
            });
        },

        newYtPlayer: function (playerContext, id, resPath) {
            var root = this;
            var ytPlayer = new YT.Player(id, {
                events: {
                    'onReady': (event)=> { event.target.playVideo() },
                    'onStateChange': function(event){
                        root.onYtPlayerStateChange(playerContext, root, event, resPath);
                    },
                }
            });
        },

        onYtPlayerStateChange: function (playerContext, root, event, resPath) {
            if(event.data == YT.PlayerState.PLAYING)
                root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'embed');

            if (event.data == YT.PlayerState.PAUSED)
                root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'embed');

            if (event.data == YT.PlayerState.ENDED){
                root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'embed');
                root.preLogActivity(playerContext);
            }
        },

        logAudioActivity: function(playerContext){
            var root = this;
            $('audio').each(function(){
                if(!$(this).hasClass('Events-Tagged')){
                    root.addAVEvents(playerContext, this);
                    $(this).addClass('Events-Tagged');                              // To Avoid multiple times event-bindings.
                }
            });
        },

        addAVEvents: function(playerContext, avElement){                                           // Function to Bind Audio-Video Events.
            var root = this;
            $(avElement).on({
                playing: function(){
                    root.logAudioVideoAnalytics(playerContext, avElement, 'playing');
                },

                pause: function(){
                    root.logAudioVideoAnalytics(playerContext, avElement, 'paused');
                },

                ended: function(){
                    root.logAudioVideoAnalytics(playerContext, avElement, 'ended');
                    root.preLogActivity(playerContext);                                             // Call preLogActivity when video playback is finished.
                },
            });
        },

        logAudioVideoAnalytics: function(playerContext, avElement, av_event, res_type){
            var av_resource = avElement;
            if(!res_type){
                av_resource = avElement.currentSrc.split('/').pop();                // To get the resource path-name.
            }
            var av_analytics = new AudioVideoAnalytics({
                walkthrough: playerContext.walkthrough_id || playerContext.chapter_id,
                resource: av_resource,
                events: av_event,
                resource_type: res_type,
            });
            av_analytics.save();
        },

        preLogActivity: function(playerContext){
            // Function to create new WalkthroughActivity on each visit to a slide.
            if(document.isOffline) return;

            var wtActivity = playerContext.walkthroughActivityList[this.CURRENT_SLIDE - 1];
            if(wtActivity.get('id') || wtActivity.get('duration')){
                wtActivity.unset('duration');
                wtActivity.unset('id');                                         // force backbone-model to send 'POST' request.
            }
            var root = this;
            wtActivity.save({}, {
                success: function(model, response){
                    if(!playerContext.demo_completed && playerContext.progress == 100){
                        playerContext.demo_completed = true;
                        root.triggerGAevent('Player', 'Topic Complete');
                    }
                }
            });
        },

        postLogActivity: function(playerContext, slideIndex){
            // Function to upate 'duration' of the last WalkthroughActivity.
            var wtActivity = playerContext.walkthroughActivityList[slideIndex - 1];
            if(wtActivity.isNew()) return;
            var duration = parseInt(($.now() - playerContext.TIME_SPENT) / 1000);
            wtActivity.set({'duration': duration});
            wtActivity.save();
            playerContext.TIME_SPENT = $.now();
        },

        /**
         * Get product tree API data
         * This function returns a Promise
         */

        fetchSiteMapData: async function() {
            try {
                let siteMap = new ProductTree();
                const response = await fetch(siteMap.urlRoot)
                const data = await response.json()
                return data
            } catch (e) {
                console.log(e)
                throw e;
            }
        },

        updateSitemapData: function(siteMapData, selectedGroups){
            _.each(siteMapData, (elem, index) =>{
                var isAllowed =_.difference(selectedGroups, elem.groups).length === 0;
                if (!isAllowed) {
                    elem.disabled = true;
                    elem = _.omit(elem, "children", "playlists", "demos");
                } else {
                    if( elem.children && elem.children.length > 0 ){
                        elem.children = this.updateSitemapData(elem.children, selectedGroups);
                    } else if( elem.playlists && elem.playlists.length > 0 ){
                        elem.playlists = this.updateSitemapData(elem.playlists, selectedGroups);
                    } else if( elem.demos && elem.demos.length > 0 ){
                        elem.demos = this.updateSitemapData(elem.demos, selectedGroups);
                    }
                };
            });
            return siteMapData;
        },

        /**
         * Get integration connectors list
         * This function returns a Promise
         */

        getRepositoryConnectorList: async function() {
            try {
                let repository_connector = new RepositoryConnector();
                const response = await fetch(repository_connector.urlRoot)
                const data = await response.json()
                return data
            } catch (e) {
                console.log(e)
                throw e;
            }
        },

    };
});
