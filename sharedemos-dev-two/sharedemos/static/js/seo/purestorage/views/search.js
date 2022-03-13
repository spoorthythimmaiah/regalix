'use strict';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Common from '../../../tenant/common';
import searchTemplate from '../templates/search.handlebars';
import getSearchResults from '../../common/views/search';


const searchView = Backbone.View.extend({
    el: 'body',
    template: searchTemplate,

    JOURNEY_ICON: "/static/images/journey-thumb-icon.png",
    LIBRARY_ICON: "/static/images/purestorage/category-bg.jpg",
    ASSET_ICON: "/static/images/section-default-link-icon.png",
    events: {
        'click .ps-search-icon': 'activateSearch',
        'click [data-attr=cancel-search]': 'cancelSearch',
        'keyup input[name=search-site]': 'searchSite',
        'click .clear-search': 'clearSearch',
        'click .scroll-to-top': 'scrollToTop',
    },
    
    activateSearch() {
        $('body').addClass('search-active searched');
        $('.grayout').show();
        this.$el.find('input[name=search-site]').focus();
    },

    cancelSearch() {
        this.clearSearch();
        $('.grayout').hide();
        $('.search-result-wrapper').remove();
        $('body').removeClass('search-active searched');
    },

    clearSearch() {
        this.$el.find('input[name=search-site]').val('').focus();
        this.renderSearchResults();
    },

    searchSite(event) {
        if(event.keyCode == 27){
            return this.cancelSearch();
        }

        if(!event.isTrigger && !Common.isValidCharacter(event)) return

        this.searchContent(event);
        // trigger google analytics.
        this.triggerGAevent('Search', document.page || 'Home');
    },

    searchContent(event) {
        if(event.currentTarget.value.length >= 2){
            this.$('.clear-search').show();
            getSearchResults(this);
        }else{
            this.renderSearchResults();
        }
    },
    
    renderSearchResults(searchResults={}) {
        $('.search-result-wrapper').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            root = this;
        //Attribute aliasing in object destructuring.
        let {query = '', hits: searchResultsList = [] } = searchResults;
        $.each(searchResultsList, function(count, searchResult){
            let title = searchResult[`title_${localeId}`];
            if(localeId && title) {
                let {url: link, is_asset = false, category} = searchResult;
                if(is_asset){
                    if (searchResult[`asset_url_${localeId}`]) {
                        link = searchResult[`asset_url_${localeId}`];
                    }else {
                        link = searchResult[`asset_url_${document.defaultLocaleID}`];
                    }
                }
                let imageUrl = searchResult[`image_url_${document.defaultLocaleID}`];
                if (searchResult[`image_url_${localeId}`]){
                    imageUrl = searchResult[`image_url_${localeId}`];
                }
                if (!imageUrl) {
                    imageUrl = `${document.cdn_url}${
                        category === 'journeys' ? root.JOURNEY_ICON :
                        is_asset ? root.ASSET_ICON : root.LIBRARY_ICON }`;
                }

                resultList.push({imageUrl, link, title});
            }
        })

        $('body').append(this.template({
            'results': resultList,
            'query': query
        }));
        this.$('.search-result-wrapper').scroll(function(){
            root.toggleScrollToTop();
        });
    },

    scrollToTop: function() {
        this.$('.search-result-wrapper').animate({scrollTop: 0}, 200);
        return false;
    },

    toggleScrollToTop: function() {
        (this.$('.search-result-wrapper').scrollTop() >= 200) ? $('.scroll-to-top').fadeIn() : $('.scroll-to-top').fadeOut(); 
    },

    triggerGAevent: function(name, value){
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    }
});

export default searchView;
