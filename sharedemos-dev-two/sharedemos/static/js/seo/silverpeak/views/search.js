'use strict';

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Common from '../../../tenant/common';
import getSearchResults from '../../common/views/search';
import searchTemplate from '../templates/search.handlebars';


const searchView = Backbone.View.extend({
    el: 'body',
    template: searchTemplate,

    events: {
        'keyup input[name=search-site]': 'searchSite',
        'click .clear-search': 'cancelSearch',
    },

    cancelSearch() {
        let searchInput = this.$el.find('.search-site');
        if (searchInput.val()) {
            searchInput.val('');
            this.renderSearchResults();
        }
        searchInput.focus();
        this.$('.clear-search').hide();
        this.$('.search-bar-result-wrapper').remove();
    },

    searchSite(event) {
        if (event.keyCode == 27) {
            return this.cancelSearch();
        }

        if (!event.isTrigger && !Common.isValidCharacter(event)) return

        this.searchContent(event);
        // trigger google analytics.
        this.triggerGAevent('Search', document.page || 'Home');
    },

    searchContent(event) {
        if (event.currentTarget.value.length >= 2) {
            this.$('.clear-search').show();
            getSearchResults(this);
        } else if (event.currentTarget.value.length === 0) {
            this.cancelSearch();
        } else {
            this.$('.clear-search').hide();
            this.renderSearchResults();
        }
    },

    renderSearchResults(searchResults={}) {
        this.$('.search-bar-result-wrapper').getNiceScroll().remove();
        this.$('.search-bar-result-wrapper').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            searchResultsList = searchResults.hits || [];

        _.each(searchResultsList, function (searchResult) {
            let title = searchResult[`title_${localeId}`]
            if (localeId && title) {
                // Attribute aliasing using object destructuring.
                let {url: link, is_asset = false} = searchResult;
                if (is_asset) {
                    if (searchResult[`asset_url_${localeId}`]) {
                        link = searchResult[`asset_url_${localeId}`];
                    } else {
                        link = searchResult[`asset_url_${document.defaultLocaleID}`];
                    }
                }
                resultList.push({link, title});
            }
        });

        if (resultList.length) {
            this.$('.search-bar-holder').append(this.template({
                'results': resultList
            }));
            this.$(".search-bar-result-wrapper").niceScroll({
                preservenativescrolling: false
            });
        }
    },

    triggerGAevent(name, value) {
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    }
});

export default searchView;
