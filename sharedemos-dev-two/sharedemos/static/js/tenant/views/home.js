/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../common',
        '../models/section',
        '../../apps/bulletin_board/models/bulletin_board',
        '../templates/' + document.template_folder + '/home.handlebars',
        '../templates/' + document.template_folder + '/home-sections-all.handlebars',
        '../templates/' + document.template_folder + '/recent-trending-demos.handlebars',
        'utils',
], function (_, $, Backbone, Common, Section, BulletinBoard,
            HomeTemplate, AllProductsTemplate, RecentDemosTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({

        el: '#block_container',

        template: HomeTemplate,
        all_products_template: AllProductsTemplate,
        demos_template: RecentDemosTemplate,

        events: {
            'click .home-container .pwt-box, .category-container .pwt-box': 'winWidth',
            'click .fs-banner .all': 'showAllProducts',
            'click .trending': 'showTrendingDemos',
            'click .mostrecent': 'showRecentDemos',
            'click .recent': 'launchDemo',
            'click .tags-span': function(event){Common.searchTags(event)},
            'mousemove .boxtemp .pwt-list .pwt-box .left': 'tiltImageMouseMove',
            'mouseleave .boxtemp .pwt-list .pwt-box .left': 'tiltImageMouseLeave',
        },

        initialize: function (attrs) {
            this.section = new Section();
            var root = this;
            this.section.fetch().done(function(response){
                if(response.ret_url){
                    let redirect_url = response.ret_url;
                    _.extend(response.args, {
                        next: window.location.pathname + window.location.hash
                    })
                    redirect_url += '?' + $.param(response.args);
                    window.location.href = window.location.origin + redirect_url;
                }else{
                    root.render()
                }
            }).fail(function(attrs, textStatus, xhr){
                Common.modelFetchErrorHandler(attrs, xhr);
            });
        },

        render: function () {
            Common.product_details = null;
            var tenant = this.section.get('tenant');
            Common.resetVisits();
            var isBulletinBoardEnabled = _.some(this.section.attributes.tenant.applications, function(app){
                    return app.unique_id.toLowerCase() == 'bulletin_board'})
            var template_vars = {
                'tenant_title': (tenant && tenant.title) ||  'PRODUCT WALKTHROUGHS',
                'tenant_privacy_link': document.privacy_link,
                'bulletinBoardData': this.section.get('bulletin_board_list'),
                'isBulletinBoardEnabled': isBulletinBoardEnabled,
                'isPrivateTenant': this.section.attributes.tenant.is_private,
                'can_edit':document.viewType == 'edit',

            }

            Common.loadLanguages(this.section.get('locales'));
            this.$el.html(this.template(template_vars));
            var root = this;
            _.each(this.section.get('all_products'), function(section){
                if ((['home', 'audience']).indexOf(document.viewType) !== -1 && section.is_enabled == undefined) {
                    section.is_enabled = true;
                }
                section.is_visible = !section.is_hidden;
                if(!section.description){
                    section.description = Common.LOREM_IPSUM;
                }
                if(section.linked_asset){
                    section.icon = section.icon || {url: Common.SECTION_LINK_TYPE_IMAGE_PATH}
                }else{
                    section.icon = section.icon || {url: Common.SECTION_IMAGE_PATH};

                }
            });
            _.each(this.section.get('trending_demos'), this.setDefaultThumbnail, this);
            _.each(this.section.get('recent_demos'), this.setDefaultThumbnail, this);
            this.renderAllProducts();
            var trendingContentLength = false, mostRecentLength = false;
            if(document.viewType != 'home'){
              this.$('#home-container .mostrecent, #home-container .trending').addClass('hide');
            }else{
                if(!this.section.get('trending_demos').length && !this.section.get('recent_demos').length){
                    this.$(".filter").addClass('hide');
                }
                if(!this.section.get('trending_demos').length){
                    this.$(".filter.trending").addClass('hide');
                }else{
                    this.renderTrendingDemos();
                    trendingContentLength = true;
                }
                if(!this.section.get('recent_demos').length){
                    this.$(".filter.mostrecent").addClass('hide');
                }else{
                    this.renderRecentDemos();
                    mostRecentLength = true;
                }
                /* only for box template */
                if(document.template_folder == 'box') {
                    if(trendingContentLength == true) {
                        this.$(".filter.trending, .home-container.trending").addClass('active');
                    } else if(trendingContentLength == false && mostRecentLength == true) {
                        this.$(".filter.mostrecent, .home-container.mostrecent").addClass('active');
                    }
                }
            }
            Common.setVisit({'name': 'Home', 'slug': null});
            Common.transition();

            var title = tenant.name || 'Product Walkthroughs'
            utils.setSEOData(title, window.location.href, tenant.description)
            Common.logVisitActivity();
            Backbone.trigger("view_rendered", this);
            if(document.isPrivateTenant){
                $('.social-sharing').addClass('hide');
            }else{
                $('.social-sharing').removeClass('hide');
            }
            Common.tooltip();
        },

        setDefaultThumbnail: function(demo){            
            if(!demo.image_src) 
                switch(true){
                    case demo.slide_type == 'audio':
                        demo.image_src = Common.DEFAULT_AUDIO_ICON;
                        break;
                    case demo.slide_type == 'link' || demo.slide_type == 'embed':
                        demo.image_src = Common.DEFAULT_LINK_ICON;
                        break;
                    case demo.slide_type == 'iframe' || demo.slide_type =='html5':
                        demo.image_src = Common.DEFAULT_IFRAME_ICON;
                        break;
                    default:
                        demo.image_src = Common.DEFAULT_CHAPTER_ICON;
                    }
        },

        winWidth: function(e) {
            if($(window).width() > 991 ) {
                this.launchSection(e);
            } else {
                this.rippleEffect(e);
            }
        },

        rippleEffect: function(event) {
            var box = event.currentTarget;
            var x = event.pageX;
            var y = event.pageY;
            var clickY = y - $(box).offset().top;
            var clickX = x - $(box).offset().left;
            var setX = parseInt(clickX);
            var setY = parseInt(clickY);
            $(box).find("svg").remove();
            $(box).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');
            setTimeout(function(){
              var c = $(box).find("circle");
              c.animate(
                {
                  "r" :$(box).outerWidth()
                },
                {
                  easing: "linear",
                  duration: 200,
                  step : function(val){
                    c.attr("r", val);
                  },
                  complete : function() {
                    var section_id =  $(box).attr('slug');
                    Backbone.history.navigate('#!/' + section_id, {trigger: true});
                  }
                }
              );
            });
        },

        launchSection: function(event){
            if (this.$(event.target).hasClass("no-action") ||
                this.$(event.currentTarget).hasClass("disabled") ||
                this.$(event.target).hasClass('tags-span') ||
                this.$(event.currentTarget).children().hasClass('sync-inprogress')) return;

            var section_id = $(event.currentTarget).attr('slug');
            Backbone.history.navigate('#!/' + section_id, {trigger: true});
        },

        launchDemo: function(event){
            if(this.$(event.target).hasClass('tags-span')) return;
            var product_id = $(event.currentTarget).attr('product');
            var section_id = $(event.currentTarget).attr('section');
            var demo_id = $(event.currentTarget).attr('demo');
            Common.loadWalkthrough(product_id, section_id, demo_id);
        },

        unload: function(){
            utils.removeSEOData();
            this.undelegateEvents();
        },

        renderAllProducts: function(){
            if(document.viewType == 'edit'){
                var isEditView = true;
            }
            var template_vars = {
                'sections': this.section.get('all_products'),
                'editView': isEditView,
                'is_author': document.viewType=='edit',
            }
            this.$('.home-container.all, .category-container.all').html(this.all_products_template(template_vars));
        },

        showAllProducts: function(){
            this.$(".filter, .home-container").removeClass('active');
            this.$(".filter.all, .home-container.all").addClass('active');
        },

        renderTrendingDemos: function(){
            var template_vars = {
                'demos': this.section.get('trending_demos'),
            }
            this.$('.home-container.trending').html(this.demos_template(template_vars));
        },

        showTrendingDemos: function(){
            this.$(".filter, .home-container").removeClass('active');
            this.$(".filter.trending, .home-container.trending").addClass('active');
        },

        renderRecentDemos: function(){
            var template_vars = {
                'demos': this.section.get('recent_demos'),
            }
            this.$('.home-container.mostrecent').html(this.demos_template(template_vars));
        },

        showRecentDemos: function(){
            this.$(".filter, .home-container").removeClass('active');
            this.$(".filter.mostrecent, .home-container.mostrecent").addClass('active');
        },

        tiltImageMouseMove: function(e) {
            var curTarg = e.currentTarget,
            eX          = e.offsetX,
            eY          = e.offsetY,
            dim         = e.currentTarget.getBoundingClientRect(),
            w           = dim.width/2,
            h           = dim.height/2,
            tiltLimit   = 5,
            posX        = ( h - eY ) * ( tiltLimit / h ),
            posY        = ( w - eX ) * ( tiltLimit / w ) * -1;

            $(curTarg).find('.thumbnail_block').css({
                'transform': 'rotateX( ' + posX + 'deg ) rotateY( ' + posY + 'deg )',
                'box-shadow': ( posY * -1 ) + 'px ' + ( posX + 5 ) + 'px 17px 0 rgba( 55, 55, 55, 0.1 )'
            });
        },
        tiltImageMouseLeave: function(e) {
            var curTarg = e.currentTarget;
            var $el = $(curTarg).find('.thumbnail_block');

            $el.removeAttr( 'style' ).addClass( 'hover--ending' );

            setTimeout( function() {
                $el.removeClass( 'hover--ending' );
            }, 500 );
        }

    });

    return HomeView;
});
