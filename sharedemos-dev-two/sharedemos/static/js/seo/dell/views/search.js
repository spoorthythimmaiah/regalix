/* global define */
// define([
'use strict';

import $ from   'jquery';
import _ from    'underscore';
import Backbone from    'backbone';
import Common from  '../../../tenant/common';
import searchTemplate from  '../templates/search.handlebars';
import getSearchResults from    '../../common/views/search';

var searchView = Backbone.View.extend({
    el: 'body',
    template: searchTemplate,

    ASSET_ICON: "/static/images/dell/icon-pdf.png",
    JOURNEY_ICON: "/static/images/journey-thumb-icon.png",
    PLAYLIST_ICON: "/static/images/dell/icon-playlist.png",

    events: {
        'click .search-icon, .category-tags li, .playlist-tags li': 'activateSearch',
        'click [data-attr=cancel-search]': 'cancelSearch',
        'keyup input[name=search-site]': 'searchSite',
        'click .clear-search': 'clearSearch',
        'click .scroll-to-top': 'scrollToTop',
        'click .search-filters .label-text': 'filtersSelect',
    },

    activateSearch(event) {
        this.$el.addClass('search-active searched');
        $('.grayout').show();
        this.$el.find('input[name=search-site]').focus();
    },

    cancelSearch() {
        this.clearSearch();
        $('.grayout').hide();
        $('.search-result-wrapper').remove();
        this.$el.removeClass('search-active searched');
    },

    clearSearch(){
        let searchInput = this.$el.find('input[name=search-site]');
        if(searchInput.val()){
            searchInput.val('');
            this.renderSearchResults();
        }
        searchInput.focus();
        this.$('.clear-search').hide();
    },

    filtersSelect(){
        let productFilterValues = [];
        _.each(this.$('.search-filters.product input:checked'), (filterElement)=>{
            productFilterValues.push($(filterElement).val());
        });

        let mediaFilterValues = [];
        _.each(this.$('.search-filters.media_type input:checked'), (filterElement)=>{
            mediaFilterValues.push($(filterElement).val());
        });

        if(!productFilterValues.length && !mediaFilterValues.length){
            this.$('.search-result-item').removeClass('hide');  
        }

        _.each(this.$('.search-result-item'), (result) => {
            let {product, media_type} = $(result).data();
            // media_type should be of type String.
            media_type = `${media_type}`;
            if (productFilterValues.length && mediaFilterValues.length) {

                if(
                    productFilterValues.includes(product) &&
                    mediaFilterValues.includes(media_type)
                ){
                    this.$(result).removeClass('hide');
                }else{
                    this.$(result).addClass('hide');
                }

            }else if(productFilterValues.length) {
                if(productFilterValues.includes(product)){
                    this.$(result).removeClass('hide');
                }else{
                    this.$(result).addClass('hide');
                }

            }else if(mediaFilterValues.length) {
                if(mediaFilterValues.includes(media_type)){
                    this.$(result).removeClass('hide');
                }else{
                    this.$(result).addClass('hide');
                }

            }
        });
        let resultCount = this.$('.search-result-item:not(.hide)').length;
        this.$('.search-total-count').text(`Displaying ${resultCount} results`);
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
            this.$('.clear-search').hide();
            this.renderSearchResults();
        }
    },

    renderSearchResults(searchResults={}) {
        $('.search-result-wrapper').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            root = this;
        let {query = '', hits: searchResultsList = []} = searchResults;

        let products = {};
        let mediaTypes = {};

        $.each(searchResultsList, function(count, searchResult) {
            let title = searchResult[`title_${localeId}`]
            if(localeId && title) {
                let typeLabel = null,
                    imageUrl = `${document.cdn_url}${root.PLAYLIST_ICON}`;
                // url keywork doesn't work in handlebars so alias it as link.
                // Attribute aliasing using object destructuring.
                let {
                    url : link, media_type, product, category, is_asset = false
                } = searchResult;

                if(is_asset){
                    imageUrl = `${document.cdn_url}${root.ASSET_ICON}`;
                    typeLabel = 'pdf';
                    link = searchResult[`asset_url_${document.defaultLocaleID}`];
                    if (searchResult[`asset_url_${localeId}`]) {
                        link = searchResult[`asset_url_${localeId}`];
                    }
                } else if(searchResult.is_leafnode) typeLabel = 'html';
                if (category === 'library') {
                    if (products[product]){
                        products[product] += 1;
                    }
                    else{
                        products[product] = 1;
                    }
                }

                if(media_type){
                    media_type = media_type === 'wistia' ? 'video': media_type;
                    mediaTypes[media_type] = mediaTypes[media_type] ? mediaTypes[media_type] + 1 : 1;
                }
                if (category === 'journeys') imageUrl = `${document.cdn_url + root.JOURNEY_ICON}`;
                let breadcrumb = searchResult[`breadcrumb_${localeId}`];
                resultList.push({
                    product, media_type, link, imageUrl, title, breadcrumb, typeLabel,
                });

            }
        });

        this.$el.append(this.template({
            'results': resultList,
            'products': products,
            'mediaTypes': mediaTypes,
            'query': query,
            'count': resultList.length,
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
