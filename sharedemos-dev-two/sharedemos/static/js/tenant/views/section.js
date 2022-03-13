/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../common',
        '../models/cta',
        '../models/section',
        '../models/user-details',
        '../views/section-list',
        '../templates/' + document.template_folder + '/section.handlebars',
        '../templates/' + document.template_folder + '/section-playlist.handlebars',
        '../templates/' + document.template_folder + '/playlist.handlebars',
        '../templates/box/playlist.handlebars',
        '../templates/cta_form.handlebars',
        '../../helpers/handlebars/i18n',
        'utils',
        'jquery.sudoslider',
], function (
    _, $,
    Backbone,
    Common,
    Cta,
    Section,
    UserDetails,
    SectionListView,
    SectionTemplate,
    SectionPlaylistTemplate,
    PlaylistTemplate,
    BoxPlaylistTemplate,
    CTAForm,
    translate
) {
    'use strict';
    var SectionView = Backbone.View.extend({

        el: '#block_container',

        template: SectionTemplate,
        section_playlist_template: SectionPlaylistTemplate,
        playlist_template: PlaylistTemplate,
        box_playlist_list_view_template: BoxPlaylistTemplate,

        events: {
            'blur input': 'checkInput',
            'click .form-footer .cancel': 'cancelSubmit',
            'click .hide-video-popup': 'hideVideos',
            'click .newtemp .viewmore-demos': 'displayMoreDemos',
            'click .playlist-right li .title': 'openWalkthrough',
            'click .playlist-view-opt li': 'switchPlaylistViewInGridTemp',
            'click .readmore-demo-desc': 'toggleDescView',
            'click .related-products-list': 'openRelatedProduct',
            'click .section-pwt-menu': 'openSection',
            'click .sign-up-btn': 'showSignup',
            'click .tags-span': function(event){Common.searchTags(event)},
            'click .video-link': 'videoPopup',
            'click .watch-videos': 'displayVideos',
            'click [data-cta-id]': 'trackCTAAnalytics',
            'submit form': 'submitUserDetails',
        },

        initialize: function (attrs) {
            this.load(attrs.section);
            $(window).on('resize', {'root': this}, this.onWindowResize);
        },

        load: function(section_id, reloadIfProduct){
            this.product_id = Common.product_details.id;
            this.section_id = section_id;

            if (Common.product_details.id == this.section_id && (reloadIfProduct == undefined || !reloadIfProduct)) {
                this.section = Common.product_details;
                this.loadData();
            } else {
                this.section = new Section({id: section_id});
                var root = this;
                $.when(this.section.fetch()).done(function(response){
                    if(response.ret_url){
                        let redirect_url = response.ret_url;
                        _.extend(response.args, {
                            next: window.location.pathname + window.location.hash
                        })
                        redirect_url += '?' + $.param(response.args);
                        window.location.href = window.location.origin + redirect_url;
                    }else{
                        if (Common.product_details.id == root.section_id) {
                            Common.product_details = root.section;
                        }
                        root.loadData()
                    }
                }).fail(function(attrs, textStatus, xhr){
                    if(attrs.status == 302){
                        if(root.product_id != root.section_id){
                            Backbone.history.navigate('#!/' + root.product_id + '/' + attrs.responseJSON, {trigger: true});
                        }else{
                            Backbone.history.navigate('#!/' + attrs.responseJSON, {trigger: true});
                        }
                    }else{
                        Common.modelFetchErrorHandler(attrs, xhr);
                    }
                })
            }
        },

        loadData: function(){
            // Check whether the product/section has asset-link,
            if(this.section.get('linked_asset')){
                var linked_asset = this.section.get('linked_asset');
                var url = window.location.origin +
                          Common.SECTION_ASSET_ROUTE +
                          linked_asset.name;
                if(document.viewType == 'edit') url += '?author=1';
                let newTab = window.open(url, '_blank');
                if (newTab) {
                    //Browser has allowed it to be opened.
                    newTab.focus();
                } else {
                    //Browser has blocked it.
                    alert('Please allow popups for this website');
                }
                window.history.back();
                return;
            }

            var last_visit = Common.getLastVisit();
            if(last_visit && last_visit.slug){
                var current_parent = this.section.get('parent');
                if(!current_parent){
                    Common.resetVisits();
                    Common.setVisit({'name': 'Home', 'slug': null});
                    this.trackVisit();
                    return this.render();
                }
                if(!Common.verifyParent(this.product_id, current_parent)){
                    return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
                }
            }else if(!Common.VISIT_STACK.length){
                return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
            }
            this.trackVisit();
            this.render();
        },

        render: function () {
            var parent = this.section.get('parent')|| {'name': 'Home', 'slug': null};
            if(!parent.description){
                parent.description = Common.LOREM_IPSUM;
            }

            var videos = this.section.get('videos');
            _.each(videos, function(video){
                if(!video.poster_image){
                    video.poster_image = Common.DEFAULT_VIDEO_POSTER;
                    var video_details = Common.getEmbedVideoDetails(video.link);
                    if(video_details){
                        video.poster_image = video_details.thumbnail_url;
                    }
                }
            });
            var sectionIcon = this.section.get('icon') || {url: Common.SECTION_IMAGE_PATH}
            let export_pdf_link = `/export-to-pdf/${this.section_id}`
            if(['edit', 'preview'].indexOf(document.viewType) !== -1){
                export_pdf_link = `${export_pdf_link}?author=1`
            }else if(document.viewType == 'audience'){
                export_pdf_link = `${export_pdf_link}?company=${document.company_id}`
            }
            var isEditView = false;
            if(document.viewType == 'edit'){
                isEditView = true;
            }

            var can_download = this.section.get('tenant') && (this.section.get('tenant').can_download && this.section.get('can_download'));
            var is_author = document.viewType == 'edit';
            var isBulletinBoardEnabled = _.some(this.section.attributes.tenant.applications, function(app){
                    return app.unique_id.toLowerCase() == 'bulletin_board'})
            var template_vars = {
                'name': this.section.get('name'),
                'description': this.section.get('description') || Common.LOREM_IPSUM,
                'icon': sectionIcon,
                'videos': videos,
                'parent': Common.getParent() || parent,
                'product': this.product_id,
                'section': this.section_id,
                'playlists': this.section.get('playlists'),
                'cta_list': this.section.get('cta_list'),
                'export_pdf_link': export_pdf_link,
                'tenant_privacy_link': document.privacy_link,
                'content_exists': true,
                'can_download': can_download,
                'editView': isEditView,
                'is_author': is_author,
                'can_edit': this.section.get('can_edit'),
                'bulletinBoardData':this.section.get('bulletin_board_list'),
                'isBulletinBoardEnabled': isBulletinBoardEnabled,
                'isPrivateTenant': document.isPrivateTenant,

            };

            if(this.section.get('playlists') && this.section.get('playlists').length){
                var enabled_playlists = _.filter(this.section.get('playlists'), function(playlist){
                    if(playlist.is_enabled == true || playlist.is_enabled == undefined){
                        var enabled_demos = _.filter(playlist.walkthroughs, function(wt){
                            if(wt.is_enabled || wt.is_enabled == undefined) return wt;
                        })
                        if(!isEditView){
                            playlist.walkthroughs = enabled_demos;
                        }
                        if(enabled_demos.length) return playlist;
                    }
                });
                
                if(!enabled_playlists.length){
                    template_vars['content_exists'] = false;
                    template_vars['can_download'] = false;
                }

                template_vars['related_products'] = parent['related_products'] || [];
                this.$el.html(this.section_playlist_template(template_vars));
                if(document.template_folder == 'box') {
                    // showHide Player Title on scroll
                    var lastScrollTop = 0;
                    this.$('.pwt-section').on('scroll', function(){
                        var tableOffsetBottom = $('.fs-banner').height();
                        if(this.scrollTop > tableOffsetBottom) {
                           $(this).addClass('ShowSectionTitle'); 
                        }else{
                            $(this).removeClass('ShowSectionTitle'); 
                        }
                    });
                }
            } else {
                template_vars['related_products'] = this.section.get('related_products') || [];
                this.$el.html(this.template(template_vars));
            }
            Common.loadLanguages(this.section.get('locales'));
            let playlistView = Common.LOCAL_STORAGE.getItem('playlistView');
            playlistView?this.listSections(playlistView):this.listSections('gridView');
            Common.transition();
            var icon = this.getIcon();
            var seoTitle = `${this.section.get('name')} | ${this.section.get('tenant').name}`;
            utils.setSEOData(seoTitle, window.location.href, this.section.get('description'), icon);
            Common.logVisitActivity(this.product_id, this.section_id);
            this.initializeSudoSlider();
            this.areaCalculation();
        },

        listSections: function(playlisttemp){
            if(this.section.get('children') && this.section.get('children').length){
                var sub_sections = this.section.get('children');
                _.each(sub_sections, function(section){
                    if(!section.description){
                        section.description = Common.LOREM_IPSUM;
                    }
                    section.progress_class = Common.getProgressClass(section.progress);
                });
                this.sectionListView = new SectionListView({
                    sections: sub_sections,
                    product_id: this.product_id,
                    canEdit: this.section.get('can_edit')
                });
                this.$('.section-pwt-list.right_section').html(this.sectionListView.render().el);
                Backbone.trigger("view_rendered", this);
            }else if(this.section.get('playlists') && this.section.get('playlists').length){
                var root = this;
                root.$('.section-playlist-list.right_section').empty();
                _.each(this.section.get('playlists'), function(plist, index){
                    if ((['home', 'audience']).indexOf(document.viewType) !== -1 && plist.is_enabled == undefined && plist.walkthroughs.length) {
                        plist.is_enabled = true;
                    }
                    if(!plist.description){
                        plist.description = Common.LOREM_IPSUM;
                    }

                    plist.translations_available = plist.translations_available || _.find(plist.walkthroughs, function(wt){ return wt.translations_available == true; })
                    var plistCounter = index + 1;
                    _.each(plist.walkthroughs, function(wt){
                        if ((['home', 'audience']).indexOf(document.viewType) !== -1 && wt.is_enabled == undefined) {
                            wt.is_enabled = true;
                        }
                        if (wt.slug == root.walkthrough_id){
                            wt.current_wt = true;
                        }
                        wt.progress_class = Common.getProgressClass(wt.percentage);
                        if(wt.published === null) wt.published = false;
                        if(wt.name && wt.name.length > 45){
                            wt.wt_name = wt.name.substring(0, 44) + '...';
                        }
                        else{
                            wt.wt_name = wt.name;
                        }
                    });
                    var is_author = document.viewType=='edit';
                    if(playlisttemp == 'listView') {
                        root.$('#playlist-thumbnail-view').removeClass('active');
                        root.$('#playlist-row-view').addClass('active');
                        root.$('#section-playlist').addClass('boxtemp');
                        root.$('.section-playlist-list.right_section').append(root.box_playlist_list_view_template({playlist: plist, playlistCounter: plistCounter, can_edit: plist.can_edit, is_author: is_author}));
                    }
                    else {
                        root.$('#playlist-row-view').removeClass('active');
                        root.$('#playlist-thumbnail-view').addClass('active');
                        root.$('.section-playlist-list.right_section').append(root.playlist_template({playlist: plist, playlistCounter: plistCounter, can_edit: plist.can_edit, is_author: is_author}));
                    }
                });
                // newtemp addition
                var expandDemoView = $('.section-playlist-list').hasClass('demo-leng-toggle');
                if(document.viewType != 'edit' && expandDemoView && (playlisttemp !== 'listView')) {
                    root.addViewMoreButton();
                }
                // Offline mode only for tenant allow offline is TRUE
                if(this.section.get('tenant') && this.section.get('tenant').allow_offline && document.viewType != 'edit'){
                    //check for the cached section if present show color else disable it
                    $('#avaiable_for_offline').show();
                    this.checkCachedSection()                    
                }
                Backbone.trigger("playlist_rendered", this);
            }else{
                Backbone.trigger("view_rendered", this);
            }
            // Hide the social sharing icons if tenant or section is private.
            if(this.section.attributes.product.is_private){
                $('.social-sharing').addClass('hide');
            }else{
                $('.social-sharing').removeClass('hide');
            }
            Common.tooltip();
        },

        addViewMoreButton: function() {
            var translated_text = translate('READ MORE')
            var root = this,
                showMore = '<div class="viewmore-demos"></div>',
                readMore = '<span class="readmore-demo-desc">' + translated_text + '</span>';

            _.each(this.$('.playlist-block'), function(elem, index){
                var playlistBlock  =  root.$(elem).find('.playlist-left');
                var playlistDemos  =  root.$(elem).find('ul').height();
                var playlistDesc   =  root.$(elem).find('p').height();
                if(playlistDemos > 185) {
                    playlistBlock.find('.playlist-right').addClass('grid-pl-toggle-demos');
                    playlistBlock.append(showMore);
                }
                if(playlistDesc > 36) {
                    playlistBlock.find('.grd-playlist-desc').addClass('max-demo-desc');
                    playlistBlock.find('p').append(readMore);
                }
            });
        },

        displayMoreDemos: function(event) {
            var target = $(event.currentTarget);
            this.$(target).prev().toggleClass('grid-pl-toggle-demos');
        },

        toggleDescView: function(event) {
            var target = $(event.currentTarget);
            (this.$(target).prev().hasClass('max-demo-desc'))?this.$(target).text(translate('READ LESS')):this.$(target).text(translate('READ MORE'));
            this.$(target).prev().toggleClass('max-demo-desc');
        },

        checkCachedSection: function(){
            var urlArray = window.location.href.split('/')
            var leafNodeSection = urlArray[urlArray.length-1]
            var localStorageTanantName = window.location.origin + '_sections'
            if(navigator.serviceWorker && navigator.serviceWorker.controller){
                var sections = JSON.parse(localStorage.getItem(localStorageTanantName));
                if(sections && sections.indexOf(leafNodeSection) != -1){
                    $('#main_container').removeClass().addClass('available_offline download-active');
                    var walkthroughs_list = $('.pwt-list li');
                    for(var i=0; i<walkthroughs_list.length; i++){
                        var slug = walkthroughs_list[i].getAttribute('slug');
                        var failedWalkthroughs = window.location.origin + '_failed_walkthroughs';
                        var entityList = JSON.parse(localStorage.getItem(failedWalkthroughs))
                        if(entityList && entityList.indexOf(slug) != -1){
                            $('#main_container').removeClass().addClass('downloading-error');
                            $('.download_offline').removeClass().addClass('restart_download');
                            $('.avaiable_for_offline p').html('Oops! Try again:');
                            $('#'+slug).addClass('downloading-slug-error');
                        }
                        var progress = 100
                        var angle = -90 + ((progress-75)/100)*360;
                        $("#"+slug+" .animate-50-75-b, #"+slug+" .animate-25-50-b, #"+slug+" .animate-0-25-b").css("transform","rotate(0deg)");
                        $("#"+slug+" .animate-75-100-b").css("transform","rotate("+angle+"deg)");
                    }
                }else{
                    // show with diabled option
                    $('#main_container').removeClass('available_offline download-active');
                }
            }else{
                localStorage.removeItem(localStorageTanantName);
            }
        },


        getIcon: function(){
            var icon = this.section.get('icon') && this.section.get('icon').path;
            if(!icon){
                var parent = this.section.get('parent');
                icon = parent && parent.icon && parent.icon.path;
                if(!icon){
                    icon = Common.product_details && Common.product_details.get('icon') && Common.product_details.get('icon').path;
                }
            }
            return icon
        },

        trackVisit: function(){
            var current_section = {
                'name': this.section.get('name'),
                'slug': this.section.get('slug'),
                'description': this.section.get('description') || Common.LOREM_IPSUM
            }
            Common.setVisit(current_section);
        },

        trackCTAAnalytics: function(e){
            Common.trackCTAAnalytics(
                e.currentTarget.dataset.ctaId,
                this.product_id,
                this.section_id
            );
        },

        initializeSudoSlider: function () {
            var root = this;
            this.sudoSlider = this.$(".video-slider").sudoSlider({
                touch : true,
                prevNext : false,
                responsive : true,
                numeric:true,
                effect : "slide ",
                customLink : 'div.customLink, button.customLink',
                afterAnimation: (event)=> {
                    _.each(this.$('iframe.popup-video'), (element)=> {
                        $(element).attr('src', $(element).attr('src'))
                    });
                }
            });
            if(!this.$(".video-slider").length) {
                this.$('.section-vid-block .sign-up').addClass('txt-left-align');
            }
        },

        openSection: function(event){
            var target_slug = $(event.currentTarget).attr('slug');
            if(target_slug !== undefined && target_slug !== ""){
                if(target_slug == this.product_id){
                    Backbone.history.navigate('#!/' + target_slug , {trigger: true});
                }else{
                    Backbone.history.navigate('#!/' + this.product_id + '/' + target_slug , {trigger: true});
                }
            }else if(target_slug == ""){
                Backbone.history.navigate('#!/', {trigger: true});
            }
        },

        openWalkthrough: function(event){
            let element = this.$(event.currentTarget).parent('li');
            if (element.is(".no-action, .tags-span") ||
                element.parents('.playlist-block').hasClass("disabled")) return;

            // check for same walkthrough before loading
            var walkthrough_id = $(event.currentTarget).parent('li').attr('slug');
            if(this.walkthrough_id == walkthrough_id) return

            if (this.product_id == this.section_id) {
                Backbone.history.navigate('#!/' + this.product_id + '/' + walkthrough_id, {trigger: true});
            } else {
                Backbone.history.navigate('#!/' + this.product_id + '/' + this.section_id + '/' + walkthrough_id, {trigger: true});
            }
        },

        openRelatedProduct: function(event){
            var section = $(event.currentTarget).attr('section');
            var product = $(event.currentTarget).attr('product');
            if(section == product){
                Backbone.history.navigate('#!/' + product, {trigger: true});
            }else{
                Backbone.history.navigate('#!/' + product + '/' + section , {trigger: true});
            }
        },

        onWindowResize: function(e){
            var root = e.data.root;
            root.areaCalculation();
        },

        areaCalculation: function(){
            if($(window).width() > 991) {
                var left_pane = this.$('.left-pane').last().height();
                var center_pane = this.$('.center-pane').last().height();
                var right_pane = this.$('.right-pane').last().height();
                var maxheight =  Math.max(left_pane, center_pane, right_pane);
                if ( maxheight <= ($(window).height()-$('.header').height())) {
                    this.$('.left-pane, .right-pane, .center-pane').css('min-height',($(window).height() - $('.header').height()));
                }else{
                    this.$('.left-pane, .right-pane, .center-pane, .leaf-wrap').css('min-height',maxheight);
                };
            } else{
                this.$('.left-pane, .right-pane, .center-pane').css('min-height', 50);
            }
        },

        videoPopup: function(event){
            event.stopPropagation();
            var videolink = this.$(event.target).attr('data-video-link');
            var videoBlock = this.$(event.target).parent();
            this.$(videoBlock).find(".popup-video").attr("src", videolink).show();
        },

        showSignup: function(event){
            let cta_id = this.$(event.currentTarget).data('cta-id');
            let cta = new Cta({id: cta_id});
            let root = this;
            $.when(cta.fetch()).done(function(){
                let args = cta.attributes;
                args['product'] = root.product_id;
                args['section'] = root.section_id;
                root.$(".overlay .sign-up-wrap").html(CTAForm(args));
                root.$('.overlay').addClass('section-cta-active');
                root.$(".sign-box ").addClass("bounceInDown");
                setTimeout(function(){
                    root.$(".sign-box ").removeClass("bounceInDown");
                }, 500);
                root.$('.sign-up-wrap .form-footer').css({
                    'display': 'inline-block'
                })
                Backbone.trigger("cta_overlay_opened");
            })
        },

        cancelSubmit: function(){
            this.$(".sign-box ").addClass("bounceOutUp");
            var root = this;

            setTimeout(function(){
                root.$('.overlay').removeClass('section-cta-active');
                Backbone.trigger("cta_overlay_closed");
                root.$(".sign-box ").removeClass("bounceOutUp");
                root.$('input[type=text]').val("");
                this.$('.error-message').hide();
            }, 300);
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
                let user_details = new UserDetails(user_data);

                user_details.save().done(function(){
                    root.$('.form-sending').removeClass("slide-in is-submitted");
                    root.$('.form-sent').addClass("slide-in");
                    setTimeout(function(){
                        root.$('.form-sent').removeClass("slide-in");
                        root.cancelSubmit();
                    }, 3000);
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

        checkInput: function(event){
            var root = this;
            if (!$(event.currentTarget).val().trim()) {
                root.$(event.currentTarget).siblings('.error-message').show();
            } else{
                root.$(event.currentTarget).siblings('.error-message').hide();
            };
        },

        unload: function(){
            $(document).off('resize', this.onWindowResize);
            utils.removeSEOData();
            this.undelegateEvents();
        },

        displayVideos : function(e) {
            var videoSection = this.$('.section-video');
            var videoSlider = this.$('.video-slider');
            if(document.template_folder !== 'default') {
                $('#block_container').toggleClass('show-videos');
                if($(videoSlider).html() == '' ) {
                    var UL = '<ul></ul>';
                    $(videoSlider).append(UL);
                    var videos = this.section.get('videos');
                    _.each(videos, function(video){
                        if(!video.poster_image){
                            video.poster_image = Common.DEFAULT_VIDEO_POSTER;
                            var video_details = Common.getEmbedVideoDetails(video.link);
                            if(video_details){
                                video.poster_image = video_details.thumbnail_url;
                            }
                        }
                        let ele = `<li><div class="video-link" data-video-link=${video.link}>
                            <img src="${video.poster_image}" style="width:100%" ></div>
                            <iframe class="popup-video" width="480" height="270"  frameborder="0"
                                webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </li>`;
                        $('.video-slider ul').append(ele);
                    });
                    videoSection.removeClass('rendered');
                    $('#video-slider-block .controls').remove();
                }
            }
            if(!videoSection.hasClass('rendered')) {
                videoSection.addClass('rendered')
                this.initializeSudoSlider();
            }
            if(this.$('.slidesContainer li.slide').length > 1) {
                videoSlider.addClass('multiple-vid');
            }
            else {
                videoSlider.removeClass('multiple-vid');
            }
            if($(window).width() < 991 && document.template_folder == 'default') {
                videoSection.slideToggle();
                this.$('.watch-videos').toggleClass('opened');
                if(this.$(e.currentTarget).hasClass('opened')) {
                    var target = this.$(e.currentTarget).attr('target');
                    if( target.length ) {
                        $('.pwt-section').animate({
                            scrollTop: $(target).offset().top - 60
                        }, 1000);
                    }
                }
            }
        },

        hideVideos: function() {
            $('#block_container').removeClass('show-videos');
            $('.video-slider').empty();
        },

        switchPlaylistViewInGridTemp: function(e) {
            var target = $(e.currentTarget);
            if(target.hasClass('active') || $('#main_container').hasClass('downloading')) return;
            target.siblings().removeClass('active');
            target.addClass('active');
            if(target.attr('id') == 'playlist-row-view') {
                Common.LOCAL_STORAGE.setItem('playlistView', 'listView');
                this.listSections('listView');
            }
            else {
                this.$('#section-playlist').removeClass('boxtemp');
                Common.LOCAL_STORAGE.removeItem('playlistView');
                this.listSections();
            }
        }

    });

    return SectionView;
});
