/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../common',
        '../../helpers/handlebars/i18n'
], function (_, $, Backbone, Common, translate) {
    'use strict';

    var MainView = Backbone.View.extend({

        el: '#main_container',

    	events: {
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
            'click .offline-mode .enable': function(e){this.registerServiceWorker(e);},
            'click .download_offline':'triggerDownloadOffline',
            'click .offline-footer .cancel':'cancelDownloadOffline',
            'click .restart_download': 'restartDownloadOffline',
            'click .offline-footer .disable-offline': 'disableOfflineDownload',
            'click .header .hidden-xs .logo, .search-categories .search-data a.search-links': function(){Common.closeSearchBox();},
      },

    	initialize: function () {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            Common.hideEntities();
    	},

	    triggerSearchGAEvent: function(event){
	    	var linkElement = $(event.currentTarget);
	    	var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();
	    	if(linkElement.hasClass("walkthrough-entry")) {
                Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
	    	} else {
                Common.triggerGAevent('Section Search', searchBreadcrumb);
	    	}
	    },

         triggerDownloadOffline: function(event) {
            var container = $('#main_container');
            var root = this;
            this.$('.overlay').addClass('offline-mode-active');
            if($(container).hasClass('download-active')){
                this.$(".disable-offline-mode").addClass("bounceInDown");
                setTimeout(function(){
                    root.$(".offline-mode").removeClass("bounceInDown");
                }, 500);
            }
            else {
                $(container).addClass('download-active');
                this.$(".offline-mode").addClass("bounceInDown");
                setTimeout(function(){
                    root.$(".offline-mode").removeClass("bounceInDown");
                }, 500);
            }
        },


        registerServiceWorker: function(event){
            var root = this;
            if(navigator.serviceWorker) {
                if(navigator.serviceWorker.controller === null){
                    navigator.serviceWorker.register("/service-worker-js", {scope: '/'}).then(function(registration) {
                        root.localStorageTenantName = window.location.origin + '_sections'
                        localStorage.setItem(root.localStorageTenantName, JSON.stringify(new Array))
                        registration.installing.addEventListener('statechange', function(e) {
                            if(e.target.state == 'activated'){
                                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                                root.startDownloadOffline(event); 
                                root.$el.addClass('download-active');
                            }
                        })
                        return navigator.serviceWorker.ready;
                    }).catch(function(err) {
                        // registration failed
                        console.log('ServiceWorker registration failed: ', err);
                        root.cancelDownloadOffline(event);
                    });
                }else{
                    root.startDownloadOffline(event);
                }
           }else{
                alert('Offline Mode not supported by your Browser');
           }
        },

        unRegisterServiceWorker: function(event){
            if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(var i=0; i<registrations.length;i++){
                        if(registrations[i].scope == (window.location.origin + '/')){
                            registrations[i].unregister();
                            window.location.reload();
                        }
                    };
                });
            }       
        },
        
        startDownloadOffline: function(event) {
            var downloadStatus = 'downloading';
            if(navigator.serviceWorker.controller){
                // product tree caching 
                var productTreeDetails = Common.visit_activity
                var product_slug = productTreeDetails.get('product');
                var section_slug = productTreeDetails.get('section');
                var domainPath = window.location.origin

                var productTreeData =  {'prductTree': true, 'product_slug': product_slug, 'section_slug': section_slug, 'domain': domainPath}
                this.webpageServiceWorkerCommunication(productTreeData);

                var walkthroughs = localStorage.getItem('walkthroughs');             
                if(!walkthroughs){
                  var staticCacheData = {'is_staticAssets': true, 'domain': domainPath}
                  this.webpageServiceWorkerCommunication(staticCacheData)
                  var allProductsData = {'allProducts': true, 'domain': domainPath}
                  this.webpageServiceWorkerCommunication(allProductsData);
                  var messageData = {'section': section_slug, 'domain': domainPath, 'is_section': true, 'themeCache': true}
                }else{
                  var messageData = {'section': section_slug, 'domain': domainPath, 'is_section': true, 'themeCache': true}
                }         
                this.webpageServiceWorkerCommunication(messageData);
                
                localStorage.setItem('walkthroughs', true);
                var tenantFooterImage = document.tenantFooterImage
                var walkthroughs_list = $('.pwt-list li');
                this.remainingWalkthroughs = walkthroughs_list.length;
                for(var i=0; i<walkthroughs_list.length; i++){
                    this.walkthrough_slug = walkthroughs_list[i].getAttribute('slug');
                    // slug wise downloading function
                    var data = {'section': section_slug, 'walkthrough': this.walkthrough_slug, 'domain': domainPath, 'is_walkthrough': true, 'tenantFooterImage': tenantFooterImage}
                    this.webpageServiceWorkerCommunication(data);
                }

                this.localStorageCacheManagement(section_slug, 'add');
            }
            $('#main_container').addClass(downloadStatus);
            // this.successPlaylistOffline();        
            this.cancelDownloadOffline(event);
        },

        localStorageCacheManagement: function(section, action) {
            var cacheName = window.location.origin + '_sections';
            var sections = JSON.parse(localStorage.getItem(cacheName));
            if (action == 'add') {
                sections.push(section);
            } else {
                var index = sections.indexOf(section)
                if (index > -1) {
                    sections.splice(index, 1);
                }
            }
            localStorage.setItem(cacheName, JSON.stringify(sections));
            return sections.length
        },


        failedEntityManagement: function(entity, slug, action){
            var cacheName = window.location.origin + '_failed_' + entity;
            var cacheEntity = localStorage.getItem(cacheName);
            if (!cacheEntity){
                localStorage.setItem(cacheName, JSON.stringify(new Array))
            }

            var entityList = JSON.parse(localStorage.getItem(cacheName))
            if(action == 'add' && entityList.indexOf(slug) == -1){
                entityList.push(slug);
            }
            if (action == 'remove'){
                var index = entityList.indexOf(slug)
                entityList.splice(index, 1);
            }
            localStorage.setItem(cacheName, JSON.stringify(entityList));
        },

        cancelDownloadOffline: function(event) { 
            this.$(".offline-mode, .disable-offline-mode").addClass("bounceOutUp");
            var root = this;
           
            setTimeout(function(){
                root.$(".offline-mode, .disable-offline-mode").removeClass("bounceOutUp");
                root.$(".overlay").removeClass('offline-mode-active');
            }, 100);

            if($(event.target).hasClass('disable-cancel') || $('#main_container').hasClass('downloading')) return;
            $('#main_container').toggleClass('download-active');
       },

        downloadingPlaylistOffline: function(slug, progress) {
            if(progress < 25){
                var angle = -90 + (progress/100)*360;
                $("#"+slug+" .animate-0-25-b").css("transform","rotate("+angle+"deg)");
            }
            else if(progress >= 25 && progress < 50){
                var angle = -90 + ((progress-25)/100)*360;
                $("#"+slug+" .animate-0-25-b").css("transform","rotate(0deg)");
                $("#"+slug+" .animate-25-50-b").css("transform","rotate("+angle+"deg)");
            }
            else if(progress >= 50 && progress < 75){
                var angle = -90 + ((progress-50)/100)*360;
                $("#"+slug+" .animate-25-50-b, #"+slug+" .animate-0-25-b").css("transform","rotate(0deg)");
                $("#"+slug+" .animate-50-75-b").css("transform","rotate("+angle+"deg)");
            }
            else if(progress >= 75 && progress <= 100){
                var angle = -90 + ((progress-75)/100)*360;
                $("#"+slug+" .animate-50-75-b, #"+slug+" .animate-25-50-b, #"+slug+" .animate-0-25-b").css("transform","rotate(0deg)");
                $("#"+slug+" .animate-75-100-b").css("transform","rotate("+angle+"deg)");

                if(progress == 100){
                    this.remainingWalkthroughs = this.remainingWalkthroughs - 1;
                    if(this.remainingWalkthroughs == 0){
                        if(!$('.downloading-slug-error').length){
                            this.successPlaylistOffline();
                        }
                        else{
                            this.errorPlaylistOffline()
                        }
                    }
                }
            }
        },

        errorPlaylistOffline: function() {
            $('#main_container').removeClass().addClass('downloading-error');
            $('.download_offline').removeClass().addClass('restart_download');
            var first_translated_text = translate("Oops");
            var second_translated_text = translate("Try again");
            $('.avaiable_for_offline p').html(first_translated_text + "! " + second_translated_text + ":");
        },

        restartDownloadOffline: function() {
            if (navigator.onLine){
                $('#main_container').removeClass().addClass('download-active downloading');
                $('.restart_download').removeClass().addClass('download_offline');
                $('.avaiable_for_offline p').html('available offline:');
                var urlArray = window.location.href.split('/')
                var leafNodeSection = urlArray[urlArray.length-1]
                var domainPath = window.location.origin
                var walkthroughs_list = $('.pwt-list li.downloading-slug-error');
                this.remainingWalkthroughs = walkthroughs_list.length;
                for(var i=0; i<walkthroughs_list.length; i++){
                    this.walkthrough_slug = walkthroughs_list[i].getAttribute('slug');
                    // slug wise downloading function
                    $('#'+this.walkthrough_slug).removeClass('downloading-slug-error');
                    this.failedEntityManagement("walkthroughs", this.walkthrough_slug, 'remove');
                    var data = {'section': leafNodeSection, 'walkthrough': this.walkthrough_slug, 'domain': domainPath, 'is_section': false, 'tenantFooterImage': tenantFooterImage, 'is_walkthrough': true}
                    this.webpageServiceWorkerCommunication(data);
                }
            }else{
                alert('No Internet Connection!!!!!');
            }
        },

        successPlaylistOffline: function() {
            $('#main_container').removeClass('downloading').addClass('available_offline');
            $('.download_offline').removeClass().addClass('download_success');
            var translated_text = translate("Success");
            $('.avaiable_for_offline p').html(translated_text + "!");
            setTimeout(function() {
                $('#main_container').addClass('download-active');
                var translated_text = translate("Available offline");
                $('.avaiable_for_offline p').html(translated_text + ":");
                $('.download_success').removeClass().addClass('download_offline');
            }, 3000);
        },

        disableOfflineDownload: function(event) {
            $('#main_container').removeClass('available_offline');
            this.cancelDownloadOffline(event);
            var urlArray = window.location.href.split('/')
            var leafNodeSection = urlArray[urlArray.length-1]
            var domainPath = window.location.origin;
            if(navigator.serviceWorker.controller){
               var sectionCount = this.localStorageCacheManagement(leafNodeSection, 'remove');
               if(sectionCount == 0){
                  var data = {'clearCacheStorage': true}
                  this.webpageServiceWorkerCommunication(data);
                  localStorage.removeItem('walkthroughs');
               } else{
                  var cacheNames = [domainPath + '_' + leafNodeSection]
                  var data = {'section':leafNodeSection, 'delete_section': true, 'cacheNames': cacheNames}
                  this.webpageServiceWorkerCommunication(data);
               }
            }
            $('.spiner-holder-2').removeAttr("style");
        },

        webpageServiceWorkerCommunication: function(data){
            var root = this;
            if (navigator.serviceWorker.controller) {
                var messageChannel = new MessageChannel();
                messageChannel.port1.onmessage = function(event) {
                    if(event.data.is_error){
                        if(event.data.error_entity == 'section'){
                            root.errorPlaylistOffline();                      
                            $('.pwt-list li').addClass('downloading-slug-error')
                        }else{
                            $('#'+event.data.walkthrough_slug).addClass('downloading-slug-error');
                            // add each slug to corresponding failed section-wise walkthroughs 
                            root.failedEntityManagement('walkthroughs', event.data.walkthrough_slug, 'add')
                            root.downloadingPlaylistOffline(event.data.walkthrough_slug, event.data.data_cached_in_percentage);
                        }
                    }else{
                        root.downloadingPlaylistOffline(event.data.slug, event.data.data_cached_in_percentage);
                    }
                    if(event.data.unregister){
                        var failedWalkthroughs = window.location.origin + '_failed_walkthroughs'
                        localStorage.removeItem(failedWalkthroughs);
                        root.unRegisterServiceWorker(event);
                    }
                }
                navigator.serviceWorker.controller.postMessage(data, [messageChannel.port2]);
            } else {
                console.log("No ServiceWorker");
            }
        },
	});

    return MainView;
});
