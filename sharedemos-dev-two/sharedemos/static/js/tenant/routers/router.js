/*global define*/
define([
    'underscore',
    'backbone',
    '../common',
    '../models/section',
    '../views/home',
    '../views/section',
    '../views/player'
], function (_, Backbone, Common, Section, HomeView, SectionView, PlayerView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            "!": "home",
            "!/": "home",
            "!/:product": "routeHandler",
            "!/:product/": "routeHandler",
            "!/:product/:param_01": "routeHandler",
            "!/:product/:param_01/": "routeHandler",
            "!/:product/:param_01/:param_02": "routeHandler",
            "!/:product/:param_01/:param_02/": "routeHandler",
            "!/:product/:param_01/:param_02/:slide_index": "routeHandler",
            "!/:product/:param_01/:param_02/:slide_index/": "routeHandler",
            "*splat": "trybang"
        },

        route: function(route, name, callback) {
            // NOTE : DO NOT TOUCH THIS METHOD
            // This is a core method of Backbone.Router
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (_.isFunction(name)) {
                callback = name;
                name = '';
            }
            if (!callback) callback = this[name];
            var router = this;
            Backbone.history.route(route, function(fragment) {
                // CUSTOMIZATION - Discard parts of URL after ampersand
                var newFragment = fragment.split('&')[0];
                var args = router._extractParameters(route, newFragment);
                if (router.execute(callback, args, name) !== false) {
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    router.trigger('route', name, args);
                    Backbone.history.trigger('route', router, name, args);
                }
            });
            return this;
        },

        trybang: function(splat) {
            if(/^[^!].*/.test(splat)) { // does not start with !
                this.navigate("#!/" + splat, {trigger: true});
            }
            return false;
        },

        initialize: function(){
            this.on('route', function(params, args) {
                var url_with_bang = Backbone.history.getFragment();
                var url = url_with_bang.substr(1) || '/';
                if(!document.requestParameters){
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
            });
        },

        home: function() {
            document.product = null;
            document.section = null;
            if(document.viewType && _.indexOf(['audience', 'home', 'edit', 'preview'], document.viewType) !== -1){
                this.loadView(HomeView);
                this.currentView = 'home';
                $('#avaiable_for_offline').hide();
            }
        },

        routeHandler: function(product, param_01, param_02, slide_index) {
            document.product = product
            document.section = param_01?param_01:product
            document.chapter = param_02
            var root = this;
            if (!Common.product_details || Common.product_details.id != product) {
                Common.product_details = new Section({id: product});
                $.when(Common.product_details.fetch()).fail(function(jqXHR, textStatus, errorThrown){
                    if(jqXHR.status == 302){
                        var url = Backbone.history.getHash();
                        // replaces old product slug with new slug(replace first occurance of string)
                        url = url.replace(product, jqXHR.responseJSON);
                        Backbone.history.navigate('#' + url, {trigger: true})
                    }else{
                        Common.modelFetchErrorHandler(jqXHR, textStatus, errorThrown);
                    }
                }).done(function(response){
                    if(response.ret_url){
                        let redirect_url = response.ret_url;
                        _.extend(response.args, {
                            next: window.location.pathname + window.location.hash
                        })
                        redirect_url += '?' + $.param(response.args);
                        window.location.href = window.location.origin + redirect_url;
                    }else{
                        root.loadProductDetails(product, param_01, param_02, slide_index) 
                    }
                })
            }
            else{
                this.loadProductDetails(product, param_01, param_02, slide_index)
            }
        },

        loadProductDetails: function(product, param_01, param_02, slide_index){
            $('#avaiable_for_offline').hide();
            var hasChildren = false;
            var hasPlaylists = false;
            if(Common.product_details){
                if(Common.product_details.get('children') && Common.product_details.get('children').length){
                    hasChildren = true;
                }
                if(Common.product_details.get('playlists') && Common.product_details.get('playlists').length){
                    hasPlaylists = true;
                }
            }
            if (param_01 && param_02 && slide_index) {
                this.player(Common.product_details.id, param_01, param_02, slide_index);
            } else if (hasChildren) {
                // check if children exists in api(not exists in all section api)
                if (param_01 && param_02) {
                    this.player(Common.product_details.id, param_01, param_02);
                } else {
                    this.section(Common.product_details.id, param_01);
                }
            } else if (hasPlaylists && param_01) {
                // If one level deep demo name is updated
                if(this.view && param_01 !== this.view.walkthrough_id){
                    var root = this;
                    $.when(Common.product_details.fetch()).fail(function(attrs, textStatus, xhr){
                        if(attrs.status == 302){
                            var url = Backbone.history.getHash();
                            // replaces old product slug with new slug(replace first occurance of string)
                            url = url.replace(product, attrs.responseJSON);
                            Backbone.history.navigate('#' + url, {trigger: true})
                        }else{
                            Common.modelFetchErrorHandler(attrs, xhr);
                        }
                    }).done(function(){
                        root.player(Common.product_details.id, null, param_01, param_02);
                    })
                }else{
                    this.player(Common.product_details.id, null, param_01, param_02);
                }
            } else {
                this.section(Common.product_details.id);
            }
            $('script[type="application/ld+json"]').remove();
            var icon;
            if(Common.product_details.attributes.icon && Common.product_details.attributes.icon.path){
                icon = window.location.hostname + '/static/media/' + Common.product_details.attributes.icon.path;
            }else{
                icon = window.location.hostname + Common.SECTION_IMAGE_PATH;
            }
            $('head').append('<script type="application/ld+json">'
                                 +'{'
                                 +'"@context": "https://schema.org/",'
                                 +'"@type": "Product",'
                                 +'"name": "' + Common.product_details.attributes.name + '",'
                                 +'"image": "' + icon + '",'
                                 +'"description": "' + Common.product_details.attributes.description + '",'
                                 +'"url" : "' + window.location.href + '",'
                                 +'"brand": {'
                                    +'"@type": "Product",'
                                    +'"name": "Product Walkthroughs"'
                                  +'}'
                                +'}'
                            +'</script>');
        },

        section: function(product, section) {
            if (this.currentView && this.currentView == 'section') {
                if(section){
                    this.view.load(section);
                }else{
                    this.view.load(product);
                }
            } else {
                if(section){
                    this.loadView(SectionView, {section: section});
                }else{
                    this.loadView(SectionView, {section: product});
                }
                this.currentView = 'section';
            }

            $('script[type="application/ld+json"]').remove();
        },

        player: function (product, section, walkthrough, slide_index) {
            if(slide_index){
                slide_index = parseInt(slide_index);
            }

            if (this.currentView && this.currentView == 'player') {
                if(this.view.product_id != product
                   || (this.view.section_id != section
                   && this.view.section_id != product)
                   || this.view.walkthrough_id != walkthrough){
                    this.view.load(product, section, walkthrough, slide_index)
                }else{
                    if(!this.view.slide_views){
                        this.view.loadData();
                    }
                    else if(slide_index && slide_index > this.view.slide_views.length){
                        slide_index = this.view.slide_views.length;
                        return Common.loadWalkthrough(this.view.product_id, this.view.section_id, this.view.walkthrough_id, slide_index);
                    }else{
                        this.view.moveToSlide(slide_index);
                    }
                }
            } else {
                this.loadView(PlayerView, {product: product, section: section, walkthrough: walkthrough, slide_index: slide_index});
                this.currentView = 'player';
            }
        },

        loadView: function(SDView, attrs) {
            this.view && this.view.unload && this.view.unload() ;
            this.view = new SDView(attrs);
        }
    });

    return AppRouter;
});
