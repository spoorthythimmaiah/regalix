/* global define */

import _ from 'underscore';
import Backbone from 'backbone';
import Common from '../../../tenant/common';
import searchTemplate from '../templates/search.handlebars';
import getSearchResults from '../../common/views/search';


const searchView = Backbone.View.extend({
    el: 'body',
    template: searchTemplate,

    ASSET_ICON: "/static/images/regalix/default_asset.jpg",
    JOURNEY_ICON: "/static/images/journey-thumb-icon.png",
    LIBRARY_ICON: "/static/images/regalix/default_asset.jpg",
    events: {
        'click .search-icon, .category-tags li, .playlist-tags li': 'activateSearch',
        'click [data-attr=cancel-search]': 'cancelSearch',
        'keyup input[name=search-site]': 'searchSite',
        'click .clear-search': 'clearSearch',
        'click .scroll-to-top': 'scrollToTop',
    },

    activateSearch() {
        this.$el.addClass('search-active searched');
        this.$('.grayout').show();
        this.$el.find('input[name=search-site]').focus();
    },

    cancelSearch() {
        this.clearSearch();
        this.$('.grayout').hide();
        this.$('.search-result-wrapper').remove();
        this.$el.removeClass('search-active searched');
    },

    clearSearch(){
        this.$el.find('input[name=search-site]').val('').focus();
        this.renderSearchResults();
    },

    searchSite(event) {
        if(event.keyCode == 27){
            return this.cancelSearch();
        }

        if(!event.isTrigger && !Common.isValidCharacter(event)) return

        this.searchContent(event);
        // Trigger google analytics
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
        this.$('.search-result-wrapper').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            root = this;
        let {query = '', hits: searchResultsList = []} = searchResults;

        _.each(searchResultsList, (searchResult) => {
            let title = searchResult[`title_${localeId}`];
            if (
                ['library', 'journeys'].includes(searchResult.category
                ) && title && (!searchResult.is_leafnode || searchResult.is_asset)
            ) {
                let link = searchResult.url;
                let imageUrl = searchResult[`image_url_${document.defaultLocaleID}`];
                if (searchResult[`image_url_${localeId}`]){
                    imageUrl = searchResult[`image_url_${localeId}`];
                }
                if (!imageUrl) {
                    imageUrl = `${document.cdn_url}${
                        searchResult.category === 'journeys' ?
                        root.JOURNEY_ICON : root.LIBRARY_ICON }`;
                }  
                resultList.push({imageUrl, link, title});
            }
        })
        this.$el.append(this.template({
            'results': resultList,
            'query': query
        }));
        this.$('.search-result-wrapper').scroll(function(){
            root.toggleScrollToTop();
        });
    },

    scrollToTop() {
        this.$('.search-result-wrapper').animate({scrollTop: 0}, 200);
        return false;
    },

    toggleScrollToTop() {
        (this.$('.search-result-wrapper').scrollTop() >= 200) ? $('.scroll-to-top').fadeIn() : $('.scroll-to-top').fadeOut();
    },

    triggerGAevent(name, value){
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    }
});

export default searchView;
