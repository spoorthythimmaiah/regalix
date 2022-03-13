'use strict';
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import Common from '../../../tenant/common';
import SearchTemplate from '../templates/search.handlebars';
import getSearchResults from '../../common/views/search';

const searchView = Backbone.View.extend({
    el: 'body',
    template: SearchTemplate,

    events: {
        'keyup .search-input': 'searchSite',
        'click .clear-help-search': 'cancelSearch',
    },

    cancelSearch() {
        let searchInput = this.$el.find('.search-input');
        if (searchInput.val()) {
            searchInput.val('');
            this.renderSearchResults();
        }
        searchInput.focus();
        this.$('.search-results').remove();
        searchInput.removeClass('notEmpty')
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
        const searchInput = this.$('.search-input');
        (searchInput.val())? searchInput.addClass('notEmpty') : searchInput.removeClass('notEmpty');
        if (event.currentTarget.value.length >= 2) {
            getSearchResults(this);
        } else if (event.currentTarget.value.length === 0) {
            this.cancelSearch();
        } else {
            this.renderSearchResults();
        }
    },

    renderSearchResults(searchResults={}) {
        this.$('.search-results').getNiceScroll().remove();
        this.$('.search-results').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            searchResultsList = searchResults.hits || [];

        _.each(searchResultsList, function (searchResult, count) {
            let title = searchResult[`title_${localeId}`];
            if (localeId && title) {
                let link = searchResult.url;
                if (searchResult.is_asset) {
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
            this.$('.search-input-holder').append(
                this.template({'results': resultList})
            );
            this.$(".search-results").niceScroll({
                preservenativescrolling: false
            });
        }
    },

    triggerGAevent(name, value) {
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    }
});

export default searchView;
