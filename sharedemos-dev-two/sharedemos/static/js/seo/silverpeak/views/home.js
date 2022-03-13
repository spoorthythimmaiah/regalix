/* global define */
define(['underscore',
		'jquery',
		'backbone'
	],
function(_, $, Backbone){
    'use strict';

    var HomeView = Backbone.View.extend({
		el: '.split-playlist-container',

        events: {
            'click .banner-media-launcher': 'showBannerMedia',
            'click .hide-media-popup': ()=> { $('body').removeClass('show-media')},
        },

        showBannerMedia: function(event) {
            this.$el.parents('body').addClass('show-media');
            if (this.$('.media-link').hasClass('media-src-added')) return;
            if (this.$(event.currentTarget).hasClass('wistia')) {
                this.$('.media-slider').find('iframe').show();
            }else{
                let imgSource = this.$('.media-link').data('media-link');
                let imgEle =  `<img src="${imgSource}" alt="banner-image" />`;
                this.$('.media-link').after(imgEle);
            }
            this.$('.media-link').addClass('media-src-added');
        },
    });

    return HomeView
});
