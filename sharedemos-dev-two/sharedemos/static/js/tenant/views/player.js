
/*global define*/
define(['underscore',
        'jquery',
        'jcf',
        'backbone',
        '../common',
        '../models/cta',
        '../models/section',
        '../models/walkthrough',
        '../models/activity',
        '../models/linkedin_user',
        '../models/rate_content',
        '../models/social_share',
        '../models/user-details',
        '../views/slide',
        '../../pdf_viewer/views/pdf_viewer',
        '../templates/comments.handlebars',
        '../templates/cta_form.handlebars',
        '../templates/player.handlebars',
        '../templates/playlist.handlebars',
        'utils',
        'cookies',
        'jquery.sudoslider',
        'jquery.qtip',
        'bootstrap',
        'jcf.scrollable',
        'slick'
], function (
    _, $, jcf,
    Backbone,
    Common,
    Cta,
    Section,
    Walkthrough,
    WalkthroughActivity,
    LinkedinUser,
    Rating,
    SocialShare,
    UserDetails,
    SlideView,
    PdfView,
    CommentsTemplate,
    CTAForm,
    PlayerTemplate,
    PlaylistTemplate
) {
    'use strict';

    var PlayerView = Backbone.View.extend({

        el: '#block_container',

        template: PlayerTemplate,
        playlisttemplate: PlaylistTemplate,
        RATINGS_CLICKED: false,

        events: {
            //side-panel and toggle  events
            'click .fade': function(event){Common.toggleFade(this, event)},
            'click .side-info-opener .icon:not(.disabled)': 'toggleSideMenu',
            'click .notes-opener, .mobile-menu-toggle': function(event){
                                this.showOrHideNotes({'action': 'toggle', 'event': event});
                            },
            'click .comments-opener': 'toggleCommentsBlock',
            'click .full-screen-opener': 'toggleFullScreen',
            'click .language-opener': 'toggleLanguage',
            'click .social-share': 'showShareOptions',
            'click ul.languages li': 'changeLanguage',
            'click .social-icon:not([data-social-login=linkedin])': 'shareLink',
            'click .bookmark-opener': 'showSandboxBookmarks',
            'click .walkthrough-lists li': 'openWalkthrough',
            'click #social-share-options .close-icon': 'closeShareOption',
            'click .social-share.mobile': function (event) {Common.toggleMobileShare(this,event)},
            'click .fullscreen-item, .close-mobile-full-screen': function (event) {Common.toggleMobileFullScreen(this,event)},


            //player events
            'click .customLink[target=prev]': 'gotoPrevSlide',
            'click .customLink[target=next]': 'gotoNextSlide',
            'scroll_slide .hotspot': 'scrollSlide',
            'scroll_slide .overlay': 'scrollSlide',
            'click .side-info .back': 'backToPlaylist',
            'click .next-section-name': 'loadNextSection',
            'click .pwt-list li' : function(){Common.triggerGAevent('Menu', 'Walkthrough')},
            'click .pin-opener': 'toggleDropPin',
            'click .close-embed-url': 'hideEmbedURLBox',
            'click .bookmarks-container': 'jumpToSandboxSection',
            'click div[data-social-login="linkedin"]': 'processLinkedinLogin',
            'submit form[name=comments-form]': 'postFrameComment',
            'click .avg-rating-star': 'loginToRateContent',
            'click .popup-footer .cancel': 'closePopup',
            'click svg.rating': 'rateContent',
            'click #content-rating-stars .submit' : 'submitContentRating',
            'click .pagination li:not([data-page="new"]), .pagination-wrap .page-next, .pagination-wrap .page-prev': function(event){Common.setPaginationNotes(this, event)},
            'click .notes-link': function(event){Common.showNotesLinkPopup(this, event)},
            'click .note-popup-close': function(event){Common.closeNotesLinkPopup(this, event)},
            'click .sandbox-help:not(.disabled)' : function(){this.popupShow('sandbox-help')},
            'click .sandbox-help-close': function(){this.popupClose('sandbox-help')},
            'click .fr-view img': function(event){Common.showImagePopup(this, event)},
            'click .image-popup-close': function(event){Common.closeImagePopup(this, event)},

            //CTA form functions
            'click .cta-signup': 'showSignup',
            'click .form-footer .cancel': 'closeSignUp',
            'blur form[name=lead] input': 'checkInput',
            'submit form[name=lead]': 'submitUserDetails',
            'click .cta-link': 'showThankyou',
            'click .explore-btn': 'openWalkthrough',
            'click .cta-image': 'openWalkthroughMobile',
            'click [data-cta-id]': 'trackCTAAnalytics',
        },

        initialize: function (attrs) {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            $(document).on('keydown', {'root': this}, this.keyDownHandler);
            $(document).on('change', '.mobile-language-select', {'root': Common}, Common.changeLanguage);
            this.listenTo(Backbone, 'launch_pdf', data => this.pdfviewer && this.pdfviewer.launchPdfViewer(data));
            this.listenTo(Backbone, 'linkedin_login', this.loginUser);
            this.listenTo(Backbone, 'load_comments', this.loadComments);
            this.load(attrs.product, attrs.section, attrs.walkthrough, attrs.slide_index);
        },

        load: function (product, section, walkthrough, slide_index) {
            this.product_id = product;
            this.section_id = section;
            this.walkthrough_id = walkthrough;
            Common.CURRENT_SLIDE = slide_index || 1;
            this.navigate_slide = true;
            this.progress = 0;
            this.demo_completed = false;
            
            this.walkthrough = new Walkthrough({id: this.walkthrough_id});

            var root = this;

            if (this.section_id) {
                this.section = new Section({id: this.section_id});
                $.when(this.section.fetch()).done(function(response){
                    if(response.ret_url){
                        let redirect_url = response.ret_url;
                        _.extend(response.args, {
                            next: window.location.pathname + window.location.hash
                        })
                        redirect_url += '?' + $.param(response.args);
                        window.location.href = window.location.origin + redirect_url;
                    }else{
                        root.fetchWalkthrough();
                    }
                }).fail(function(attrs, textStatus, xhr){
                    if(attrs.status == 302){
                        Common.loadWalkthrough(root.product_id, attrs.responseJSON, root.walkthrough_id)
                    }else{
                        Common.modelFetchErrorHandler(attrs, xhr);
                    }
                });
            } else {
                this.section_id = this.product_id;
                this.section = Common.product_details;
                root.fetchWalkthrough();
            }
        },

        fetchWalkthrough:function(){
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
                            walkthrough: root.walkthrough_id,
                            section: root.section_id,
                            product: root.product_id})
                    );
                });
                return root.loadData();
            }).fail(function(attrs, textStatus, xhr){
                if(attrs.status == 302){
                    Common.loadWalkthrough(root.product_id, root.section_id, attrs.responseJSON)
                }else{
                    Common.modelFetchErrorHandler(attrs, xhr);
                }
            })
        },

        loadScripts: function(){

            $('script[type="application/ld+json"]').remove();
            $('#product_analytics').html('');

            if(document.viewType && document.viewType != 'edit' && document.viewType != 'preview'){
                var first_slide = this.walkthrough && this.walkthrough.get('slides') && this.walkthrough.get('slides').length && this.walkthrough.get('slides')[0];
                if(first_slide && first_slide['primary_resource']['type'] == "image" || (first_slide['secondary_resource'] && first_slide['secondary_resource']['type'] == "image" )){   
                    var first_slide_image_path;
                    if(first_slide['secondary_resource'] && first_slide['secondary_resource']['type'] == "image" ){
                        first_slide_image_path = first_slide['secondary_resource']['path']
                    }else{
                        first_slide_image_path = first_slide['primary_resource']['path']   
                    }
                    var logo_image_path = $(".logo img").attr('src');
                    var logo_image_width = $(".logo img").width();
                    var logo_image_height = $(".logo img").height();
                    $('head').append('<script type="application/ld+json">'
                                         +'{'
                                         +'"@context": "https://schema.org/",'
                                         +'"@type": "TechArticle",'
                                         +'"mainEntityOfPage":{'
                                            +'"@type":"WebPage",'
                                            +'"@id":"'+window.location.origin+'"'
                                            +'},'
                                         +'"headline": "'+ this.walkthrough.get('name') +'",'
                                         +'"image": {'
                                            +'"@type": "ImageObject",'
                                            +'"url": "https://' + window.location.hostname +'/static/media/' + first_slide_image_path+'",'
                                            +'"height":'+ first_slide['image_height']+','
                                            +'"width":'+ first_slide['image_width']
                                         +'},'
                                         +'"datePublished": "'+ first_slide['created_at'] +'",'
                                         +'"dateModified": "'+ first_slide['modified_at'] +'",'
                                         +'"author": {'
                                            +'"@type": "Organization",'
                                            +'"name": "'+ document.org_name +'"'
                                         +'},'
                                         +'"publisher": {'
                                            +'"@type": "Organization",'
                                            +'"name": "'+ document.org_name +'",'
                                            +'"logo": {'
                                              +'"@type": "ImageObject",'
                                              +'"url": "https://' + window.location.hostname + logo_image_path +'",'
                                              +'"height":'+ logo_image_height +','
                                              +'"width":'+ logo_image_width
                                          +'}'
                                         +'},'
                                         +'"description": "'+ first_slide['text'] +'"'
                                        +'}'
                                    +'</script>');
                }
                
                var product_analytics = Common.product_details.get('analytics');
                $('#product_analytics').html(product_analytics || "");
            }
        },

        loadData: function(){
            if(!this.verifyWalkthroughParent()) return false;

            if(!Common.VISIT_STACK.length){
                return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
            }

            if (this.product_id == this.section_id) {
                var current_parent = Common.product_details;
            } else {
                var current_parent = this.section.get('parent');
            }
            if(!Common.verifyParent(this.product_id, current_parent)){
                return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
            }

            this.render();
        },

        verifyWalkthroughParent: function(){
            var current_walkthrough_slug = this.walkthrough.get('slug');
            var verified = false;

            _.some(this.section.get('playlists'), function(playlist) {
                return _.some(playlist.walkthroughs, function(demo) {
                    if(demo.slug == current_walkthrough_slug) {
                        verified = true;
                        return true;
                    }
                });
            });

            if(verified) return verified;

            var complete_url = Backbone.history.getHash();
            return Common.checkRedirect(complete_url.split('!/')[1]);
        },

        render: function () {
            // reseting the value every time a demo loads.
            document.NOTES_RESET_PLAYER_WIDTH = undefined;
            document.RESET_PLAYER_WIDTH = undefined;

            $('body').addClass('player-loaded');
            this.user_details_saved = false;
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
            if(document.viewType == 'edit') {
                var isEditView = true;
            }

            var template_vars = {
                'walkthrough': {
                    'name': this.walkthrough.get('name'),
                    'slug': this.walkthrough.get('slug'),
                },
                'next_walkthrough': this.walkthrough.get('next_walkthrough'),
                'section': {
                    'name': this.section.get('name'),
                    'slug': this.section.get('slug'),
                    'cta_list': this.section.get('cta_list'),
                },
                'product': {
                    'name': Common.product_details.get('name'),
                    'slug': Common.product_details.get('slug'),
                    'is_private': this.section.attributes.product.is_private || false,
                },
                'tags': this.walkthrough.get('tags'),
                'locales': l_list,
                'can_embed': this.section.get('tenant') && this.section.get('tenant').can_embed || false,
                'published': Boolean(this.walkthrough.get('published')),
                'tenant': this.walkthrough.get('tenant'),
                'is_enabled': this.walkthrough.get('is_enabled'),
                'live_mode': document.viewType == 'home',
                'editView': isEditView,
            };

            if(this.walkthrough.get('next_section') && this.walkthrough.get('next_section').slug){
                template_vars['next_section'] = this.walkthrough.get('next_section')
            }

            template_vars['show_notes_edit'] = (document.viewType=='edit') && this.walkthrough.get('can_edit');
            
            this.$el.html(this.template(template_vars));
            // Update the avg-ratings of the demo.
            this.updateDemoRatings(this.walkthrough.get('average_rating'));

            Common.transition('next');

            this.loadPlayList();

            let hasPdf = _.some(
                this.walkthrough.attributes.slides,
                function(slide) {
                    return slide.primary_resource.type === "pdf";   
                });
            if(hasPdf) this.pdfviewer = new PdfView();

            this.slide_views = new Array();
            
            // let {section, product, walkthrough} = template_vars;
            _.each(this.walkthrough.get('slides'), this.addSlide, this);

            this.slide_views[Common.CURRENT_SLIDE-1] && this.slide_views[Common.CURRENT_SLIDE-1].setSlideNotes();

            this.progress = this.getDemoProgress();
            if(this.progress == 0) Common.triggerGAevent('Player', 'Topic Start');

            var current_slide = Common.CURRENT_SLIDE;
            this.initializeSudoSlider(current_slide);
            this.setPWTmenuArea();
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
                var seoTitle = `${this.walkthrough.get('name')} | ${this.section.get('name')} | ${this.section.get('tenant').name}`;
                utils.setSEOData(seoTitle, window.location.href, first_slide.text, cover_image)
            }

            // App Analytics tracking
            this.trackVisit();
            Common.logVisitActivity(this.product_id, this.section_id, this.walkthrough_id);

            navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? this.$('.full-screen-opener').hide() : 0;

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

            // showHide Player Title on scroll
            this.$('.player_wrap').on('scroll', function(){
                var scrollTop = $(this).scrollTop();
                var minHeight = 10;
                (scrollTop && scrollTop > minHeight) ? $(this).addClass('hideTitle') : $(this).removeClass('hideTitle');
            });
            if(this.isInFullscreen()){
                this.prepareFullscreen();
            }
            this.loadScripts();
            Backbone.trigger("player_view_rendered", this);
            if(!document.isUserAnonymous){
                Backbone.trigger("load_comments");
            }
            Backbone.trigger("slide_changed");
        },
 

        loadPlayList: function(){
            var root = this;
            var walkthroughs = [];
            var playlists = this.section.get('playlists');
            _.some(this.section.get('playlists'), function(playlist) {
                return _.some(playlist.walkthroughs, function(demo) {
                    if(demo.slug == root.walkthrough_id) {
                        walkthroughs = playlist.walkthroughs;
                        return true;
                    }
                });
            });

            if (document.viewType == 'edit'){
                var enabled_playlists = [];
                _.each(this.section.get('playlists'), function(playlist){
                    if (playlist.is_enabled){
                        var new_playlist = new Object() ;
                        var prop;
                        for(prop in playlist){
                            new_playlist[prop] = playlist[prop]
                        }
                        new_playlist.walkthroughs = playlist.walkthroughs
                        enabled_playlists.push(new_playlist)
                    }
                });
                playlists = enabled_playlists;
            }

            var template_vars = {
                'playlists': playlists
            };
            this.$('.walkthrough-lists').html(this.playlisttemplate(template_vars));
            document.querySelector(".pwt-list li[slug='" + this.walkthrough_id + "']").classList.add('active')
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
            this.$('.player_slider #sdemos-player-box').append(view.el);
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
                    root.$('div.qtip:visible').qtip('hide');
                    root.mediaPause();
                    Backbone.trigger("before_slide_change");
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
                    Backbone.trigger("slide_changed");
                    root.adjustNavPosition();
                    root.hideEmbedURLBox();
                    setTimeout(function(){
                        root.alignFullScreenImageToCenter();
                    }, 600);
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
            var cur_slide = this.slide_views[current_slide_index] && this.slide_views[current_slide_index].slide;
            var currentPrimaryResource = cur_slide.primary_resource;
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
                    if(resource && resource.type=="sandbox"){
                        if (e.keyCode == Common.LETTER_Y){
                            root.toggleSandboxHotspot();
                        } else if(e.keyCode == Common.LETTER_I && sandbox.has_images && sandbox.navigate){
                            root.showSandboxBookmarks();
                        }
                    }
                }
                if (e.which == Common.ARROW_RIGHT) {
                    root.gotoNextSlide(e);
                } else if (e.which == Common.ARROW_LEFT) {
                    root.gotoPrevSlide(e);
                } else if (e.which == Common.SPACEBAR) {
                    // disable slide navigation on last/lead submit slide
                    if(Common.CURRENT_SLIDE != root.$(".source-area ul li.slide").length && !$("#edit_container").length){
                        root.gotoNextSlide(e);
                    }
                } else if (Common.SHOW_HOTSPOT) {
                    root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].triggerHotspot(e);
                }
            };
        },

        // on window resize functions
        onWindowResize: function (e) {
            var root = e.data.root;
            if (root.isInFullscreen()) {
                if(!this.$('#player-container').hasClass('fullscreen-active')) {
                    root.prepareFullscreen();
                }
            } else if(this.$('#player-container').hasClass('fullscreen-active')) {
                root.returnFromFullscreen();
            }
            root.setPWTmenuArea();
            root.setPlayerArea();
            root.slide_views[Common.CURRENT_SLIDE-1] && root.slide_views[Common.CURRENT_SLIDE-1].setSlideArea();
        },

        toggleNavigationArrows: function(){
            // allow navigation for author 
            if(this.slide_views &&  $('#edit_container').length > 0){
                this.$(".customLink[target]").removeClass('disabled');
                return;
            }

            this.$(".customLink[target]").removeClass('disabled').addClass('disabled');
            if(this.slide_views && this.slide_views.length){
                if(this.$('#player-container').hasClass('cta-active')){
                    this.$(".customLink[target=next]").addClass('disabled');
                    this.$(".customLink[target=prev]").removeClass('disabled');
                }else if(Common.CURRENT_SLIDE == 1){
                    this.$(".customLink[target=next]").removeClass('disabled');
                    if(this.section.get('tenant') && this.section.get('tenant').chapter_autoflow || this.slide_views[Common.CURRENT_SLIDE-1].slide.primary_resource.type === 'sandbox'){
                        this.$(".customLink[target=prev]").removeClass('disabled');
                    }else{
                        this.$(".customLink[target=prev]").addClass('disabled');
                    }
                }else{
                    this.$(".customLink[target]").removeClass('disabled');
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
                if(document.viewType == 'edit' || this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('next_walkthrough')){
                    return Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('next_walkthrough').slug);                    
                }

                if (!$('#edit_container').length) {
                    this.$('#player-container').addClass('cta-active');
                    this.showOrHideNotes();
                    Backbone.trigger("cta_toggled");
                };
                if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('comments-active') || this.$('#player-container').hasClass('language-active')) {
                    this.$('#player-container').removeClass('notes-active comments-active language-active');
                    this.resetPlayerWidth(this.$('.notes'));
                }
                this.$(".slidesContainer").css("z-index" , "-1");
                var cta_list = this.section.get('cta_list');
                if(!this.endOfSlide) Common.postLogActivity(this, Common.CURRENT_SLIDE);
                if(this.user_details_saved || !cta_list.length || document.isOffline){
                    this.showThankyou();
                    this.endOfSlide = true;
                }else if(cta_list.length){
                    this.$('.signup-box').hide();
                    this.endOfSlide = true;
                }
                this.toggleNavigationArrows();

            } else if(this.slide_views && this.navigate_slide && (next_slide_idx <= this.slide_views.length)) {
                this.navigate_slide = false;
                this.$(".overlay").removeAttr('style')
                this.$(".slidesContainer").css("z-index" , "0");
                this.toggleNavigationArrows();
                Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, next_slide_idx);
            };
        },

        gotoPrevSlide: function (event) {
            if($(event.currentTarget).hasClass('disabled')) return;

            var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];

            /* navigation for sandbox slide */
            if(!this.$('#player-container').hasClass('cta-active') && current_slide.slide.primary_resource.type == 'sandbox' && current_slide.checkAndNavigateSandboxFrame('prev')) return;

            this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;

            if(Common.CURRENT_SLIDE-1 && !this.$(".cta-active .info-cta:visible").length && this.navigate_slide){
                this.navigate_slide = false;
                var prev_slide_idx = Common.CURRENT_SLIDE - 1 || 1;
                this.endOfSlide = false;
                Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, prev_slide_idx);
            }else if(document.viewType == 'edit' || this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('prev_walkthrough')){
                return Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('prev_walkthrough').slug, this.walkthrough.get('prev_walkthrough').slide_index);
            }
            // This block is only triggered when coming back from Thank-you page.
            if (this.$('#player-container').hasClass('cta-active')) {
                this.$('#player-container').removeClass('cta-active');
                this.showOrHideNotes();
                Backbone.trigger("cta_toggled");
            };
            this.toggleNavigationArrows();
        },
    
        moveToSlide: function(slide_index){
            this.toggleNavigationArrows();
            var slide_index = parseInt(slide_index);
            Common.CURRENT_SLIDE = slide_index || 1;

            this.sudoSlider && this.sudoSlider.goToSlide(Common.CURRENT_SLIDE);
            this.$('#player-container').removeClass('cta-active');
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
            Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, slide_number);
        },

        replayWalkthrough: function(e){
            this.scrollSlide(e, 1);
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
    
        setPWTmenuArea: function(){
            var menuBlock = this.$('.side-info .frame');
            var bottom_height = this.$(".side-info .bottom").outerHeight();
            if ($('#edit_container').length) {
                bottom_height += 46;
            };
            
            $(menuBlock).css({
                "top" : '80px',
                "bottom" : bottom_height
            });

            Backbone.trigger("player_menu_height_set");
        },

        setPlayerArea: function () {  
            let playerWidth = this.$('.player_wrapper').width(),
                playerHeight = this.$('.player_wrapper').height();
            this.$('.wistia-player-block iframe')
                .attr({'width': '100%', 'height': '100%'});

            if($(window).width() > 991) {
                this.$(`.slides-Container[slide-type="audio"], 
                        .slides-Container[slide-type="embed"], 
                        .slides-Container[slide-type="link"], 
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
                        .slides-Container[slide-type="embed"], 
                        .slides-Container[slide-type="link"], 
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

        //side controll pannel functions

        toggleSideMenu: function(){
            this.$('#player-container').toggleClass('side-info-active');
            this.$('.content-avg-rating').toggle('hide');
            Backbone.trigger("side_info_opened");
        },

        showOrHideNotes: function(jsonObj){
            var playerContainer = this.$('#player-container');
            playerContainer.removeClass('comments-active language-active sandbox-bookmarks-active mobile-social-active share-active');
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
                this.$('.sb-bookmark-item, .sandbox-help').addClass('active');
            } else {
                playerContainer.removeClass('sandbox-bookmarks-active');
                this.$('.sb-bookmark-item, .sandbox-help').removeClass('active');
            };
            current_slide.slide.primary_resource.type == "content" || isCTAopen ? this.$('.notes-opener').addClass('disabled') : this.$('.notes-opener').removeClass('disabled');
            this.resetPlayerWidth(this.$('.notes'));
            this.adjustSudoSlider();
        },

        toggleCommentsBlock: function(){
            if (this.$('.comments-opener').hasClass('disabled')) return;
            this.$('#player-container').removeClass('notes-active language-active sandbox-bookmarks-active');
            this.$('#player-container').toggleClass('comments-active');
            this.resetPlayerWidth(this.$('.comments'));
        },

        toggleLanguage: function(){
            if (this.$('.language-opener').hasClass('disabled')) return;
            this.$('#player-container').removeClass('notes-active comments-active sandbox-bookmarks-active mobile-social-active share-active');
            this.$('#player-container').toggleClass('language-active');
            this.resetPlayerWidth(this.$('.language'));
            this.adjustSudoSlider();
        },

        showShareOptions: function(){
            this.$('#player-container').addClass('share-active');
            this.$('.share-popup-wrap').addClass('jcf-scrollable');
            this.$('#social-share-options').addClass('popup-in');
            setTimeout(function(){
                jcf.replaceAll();
            }, 500)
        },

        closeShareOption: function(){
            this.$('#social-share-options').removeClass('popup-in').addClass('popup-out');
            var root = this;
            setTimeout( function(){
                root.$('#player-container').removeClass('share-active');   
                root.$('.share-popup-wrap').removeClass('jcf-scrollable');             
            }, 500)
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
        
        changeLanguage: function(event){
            var val = $(event.currentTarget).attr('lvalue');
            var ck_name = 'user_locale';
            if(document.requestParameters){
                ck_name = 'author_locale';
            }
            if(val != SDCookies.getItem(ck_name)){
                Common.changeLanguage(event);
            }
        },

        resetPlayerWidth: function(sideWrap, callFromTextEdit){
            var root = this;
            if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('comments-active') || this.$('#player-container').hasClass('language-active')  || this.$('#player-container').hasClass('sandbox-bookmarks-active')) {
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
                        var slide_width = playerWidth - 146;
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

                        var slide_width = this.$('#player-container').hasClass('fullscreen-active') ? playerWidth - 127: playerWidth - 146;

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

        // adjust sudolider when som width changes
        adjustSudoSlider: function(){
            var root = this;
            setTimeout(function(){
                root.sudoSlider.adjust();
            }, 1000);
        },

        backToPlaylist: function(event){
            Backbone.trigger("back_to_playlist");
            var sectionUrl = `#!/${this.product_id}`;
            if(this.product_id != this.section_id){
                sectionUrl = `${sectionUrl}/${this.section_id}`;
            }
            Backbone.history.navigate(sectionUrl, {trigger: true});

        },

        loadNextSection: function(event){
            this.$('#player-container').removeClass('side-info-active');
            Common.triggerGAevent('Menu', 'next section');
            var next_section = $(event.currentTarget).attr('section');
            
            if ( this.walkthrough.get('next_section') && this.walkthrough.get('next_section').slug) {
                var section_url = '#!/' + this.product_id + '/' + next_section;
            }

            Backbone.history.navigate(section_url, {trigger: true});
        },
        // side controll pannel functions


        //fullscreen related fnctions
        toggleFullScreen: function(){
            if (!this.isInFullscreen()) {
                this.requestFullscreen();
                this.prepareFullscreen();
                Common.triggerGAevent('Player', 'Fullscreen');
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

        prepareFullscreen: function() {
            var root = this;
            this.$('#player-container').addClass('fullscreen-active');
            setTimeout(function(){
                root.showOrHideNotes();
                root.adjustSudoSlider();
                root.alignFullScreenImageToCenter();
           }, 600);
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
        // end of full screen functions

        // CTA page functions
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

        getDemoProgress: function(){
            var slides_visited = _.reject(this.slide_views, function(slide) {
                return !slide.user_visited;
            });
            return Math.round(((slides_visited.length || 0) / (this.slide_views.length || 1)) * 100);
        },

        showThankyou: function(){
            this.$('.signup-block').hide();
            this.$('.thanku-block').show();
        },

        openWalkthrough: function(event){
            if(this.$(event.target).hasClass('tags-span')) return;
            var walkthrough_id = $(event.currentTarget).attr('slug');
            Common.loadWalkthrough(this.product_id, this.section_id, walkthrough_id);
        },

        openWalkthroughMobile: function(event){
            if($(window).width() < 991) {
                if(this.$(event.target).hasClass('tags-span')) return;
                var walkthrough_id = this.$(event.currentTarget).siblings('.explore-btn').attr('slug');
                Common.loadWalkthrough(this.product_id, this.section_id, walkthrough_id);
            }
        },
        // End of CTA page functions

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

        //general functions
        trackVisit: function(){
            var current_section = {
                'name': this.walkthrough.get('name'),
                'slug': this.walkthrough.get('slug'),
                'description': this.walkthrough.get('description') || Common.LOREM_IPSUM
            }
            Common.setVisit(current_section);
        },

        whenAll: function(objects, event, callback, context){
            var callbackWrapper =  _.after(objects.length, callback);
            context = context || this;
            _.each(objects, function(obj){
                obj.once(event, callbackWrapper, context)
            });
        }, 

        toggleDropPin: function(event){
            var currentSlide = this.$("#slider" + Common.CURRENT_SLIDE);
            if (this.$(event.currentTarget).parent().hasClass('pin-active')) {
                this.$(event.currentTarget).parent().removeClass('pin-active').addClass('anim-end');
            } else {
                if (document.viewType != 'edit' && this.$(event.currentTarget).parent().find('h1').text()=="" && this.$(event.currentTarget).parent().find('p').text()=="") {
                    return;
                };
                this.$(currentSlide).find('.drop_pin.pin-active').removeClass('pin-active').addClass('anim-end');
                this.$(event.currentTarget).parent().removeClass('anim-end').addClass('pin-active visited');
                Common.positionPinTooltip(event.currentTarget, currentSlide);
            };
        },
 
        unload: function(){
            $(window).off('resize', this.onWindowResize);
            $(window).off('keydown', this.keyDownHandler);
            utils.removeSEOData();
            this.undelegateEvents();
            $('#product_analytics').html('');
            setTimeout( function(){
                $('body').removeClass('player-loaded');
            }, 1000)
        },        

        trackCTAAnalytics: function(e){
            Common.trackCTAAnalytics(
                e.currentTarget.dataset.ctaId,
                this.product_id,
                this.section_id,
                this.walkthrough_id
            );
        },

        shareLink: function(event){
            let socialShare = $(event.currentTarget).attr('social-share'),
                url = encodeURIComponent(window.location.href),
                title = encodeURIComponent($('meta[property="og:title"]').attr("content")),
                summary = encodeURIComponent($('meta[property="og:description"]').attr("content")),
                getScreenWidth = window.outerWidth,
                width = 575,
                height = 400, 
                left = (getScreenWidth - width) / 2,
                options = `width=${width},height=${height},top=${top},left=${left}`;

            let data = {
                'chapter_slug': this.walkthrough_id,
                'section_slug': this.section_id,
                'product_slug': this.product_id,
                'media_type': socialShare
            }
            let social_share = new SocialShare(data);
            social_share.save();

            if(socialShare == "twitter") {
                window.open(`http://twitter.com/share?text=${title}&url=${url}`, 'twitter_share', `status=1,${options}`);
            } else if(socialShare == 'linkedin') {
                window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '',options)
            } else if(socialShare == 'facebook') {
                window.open(`http://www.facebook.com/sharer/sharer.php?&u=${url}&title=${title}`, 'facebook_share', options);
            } else if(socialShare == 'reddit') {
                window.open(`http://www.reddit.com/submit?url=${url}&title=${title}`, 'reddit_share', options);
            } else if(socialShare == 'copyurl'){
                if($('.copyurl').hasClass('active')) return;
                $('.copyurl').addClass('active');
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(window.location.href).select();
                document.execCommand("copy");
                $temp.remove();
                this.$('.copyurl .title').text('URL Copied!');
                setTimeout(function(){
                    this.$('.copyurl .title').text('Share with URL');
                    $('.copyurl').removeClass('active');
                },1000);
            }
            else if(socialShare == 'copyembedurl'){
                if($(".embed-url-box .embedURL").has('input').length) {
                    this.showEmbedURLBox();
                    return;
                }

                var demoPath  = this.section_id + '/' + this.walkthrough_id
                if(this.section_id != this.product_id)
                {
                    demoPath = this.product_id + '/' + demoPath
                }
                var embedUrl = '<iframe width="900" height="600" src="' + window.location.origin + '/embed/' + demoPath +'" frameborder="0" allowfullscreen  style="border: 1px solid #e7ecf2;"></iframe>'
                this.$(".embed-url-box .embedURL").append($('<input>',{type: 'text', val: embedUrl}));
                this.showEmbedURLBox(); 
           }
        },

        hideEmbedURLBox: function() {
            this.$(".embed-url-box").slideUp();
        },

        showEmbedURLBox: function(){
            this.$(".embed-url-box").slideDown();
            this.$(".embed-url-box .embedURL input").select();
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

        processLinkedinLogin: function(e){
            var root = this;
            IN.User.authorize(function(){
                if(root.$(e.currentTarget).attr('data-source') == 'rate' && !document.isUserAnonymous){
                    root.$('#content-rating-login').remove();
                    root.loginToRateContent(e);
                }
            });
        },

        /* Messaging */
        loginUser: function(linkedin_data){
            delete(linkedin_data.id)
            linkedin_data.role_id = 5

            var root = this;
            var user = new LinkedinUser();
            user.save(
                linkedin_data,
                {
                    success: function(model, response){
                        document.isUserAnonymous = false;
                        if(root.tenant.is_messaging_enabled){
                            root.loadComments();
                        }
                        if(root.tenant.is_rating_enabled && root.RATINGS_CLICKED){
                            root.$('#content-rating-login').remove();
                            root.loginToRateContent();
                        }
                    }
                }
            )
        },

        loadComments: function(){
            this.$('.lin-container-login').remove();
            this.$('.comments-area .comment-list').html(CommentsTemplate({'comments': [1]}));
            this.$('.comments-area').show();
        },

        postFrameComment: function(event) {
            event.preventDefault();
            var root = this;
            this.$(event.currentTarget).children('input[type=submit]').attr('disabled', 'disabled');
            this.$(event.currentTarget).addClass('posting-comment');
            setTimeout(function(){
                root.$(event.currentTarget).children('textarea').val('');
                root.$(event.currentTarget).removeClass('posting-comment');
                root.$('.no-comments').hide();
            }, 2000)
        },

        /* Content Rating */
        loginToRateContent: function(event) {
            this.RATINGS_CLICKED = true;
            if(document.isUserAnonymous){
                this.popupShow('content-rating-login');
            }else{
                var rate = new Rating({id: this.walkthrough_id});
                var root = this;
                rate.fetch({data: {'current_user_rating': true}}).done(function(response, message){
                    root.$('#content-rating-stars .stars').attr('data-stars', response);
                    root.popupShow('content-rating-stars');
                    root.RATINGS_CLICKED = false;
                }).error(function(response, message){
                    if(response.responseJSON == 'UNAUTHORIZED'){
                        window.location.reload();
                    }
                })
            }
        },

        rateContent: function(event) {
            var elem = this.$(event.currentTarget);
            var rateCount = elem.attr('data-rating');
            elem.parent('.stars').attr('data-stars', rateCount);
        },

        submitContentRating: function(event) {
            var stars_rated = parseInt(this.$('.stars').attr('data-stars'));
            if(stars_rated == 0) return;

            var parentEleme = this.$(event.currentTarget).parents('.popup-footer').find('.rating-submit-status');
            parentEleme.show();
            setTimeout(function(){
                parentEleme.find('.rating-submit-inprogress').addClass('active');
            },100);

            var rate = new Rating({
                'slug': this.walkthrough_id,
                'rate_value': stars_rated
            });
            var root = this;
            rate.save({}, {
                success: function(model, response){
                    setTimeout(function(){
                        parentEleme.find('.rating-submit-inprogress').removeClass('active');
                        parentEleme.find('.rating-submit-success').addClass('active');
                        setTimeout(function(){
                            // hide popup and remove all extra class
                            root.popupClose('content-rating-stars');
                            root.$('.rating-submit-status').hide().children('div').removeClass('active');
                        }, 2500);
                        root.updateDemoRatings(response.avg_ratings);
                    },1500);
                }, error: function(){
                    parentEleme.find('.rating-submit-inprogress').removeClass('active');
                    parentEleme.find('.rating-submit-failed').addClass('active');
                    setTimeout(function(){
                        root.popupClose('content-rating-stars');
                    }, 1500);
                }
            })
        },

        updateDemoRatings: function(avgRatings){
            var ratingsPercentage =  avgRatings / 5 * 85;
            this.$('.content-avg-rating .current-avg-rating').width(ratingsPercentage);
        },

    });
    return PlayerView;
});
