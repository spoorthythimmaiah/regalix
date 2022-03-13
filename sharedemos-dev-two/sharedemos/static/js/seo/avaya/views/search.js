import _ from 'underscore'
import $ from 'jquery'
import Backbone from 'backbone'
import searchTemplate from '../templates/search.handlebars'
import Common from '../../../tenant/common'
import getSearchResults from '../../common/views/search'

const searchView = Backbone.View.extend({
    el: 'body',

    DEFAULT_ICON: "/static/images/note.png",
    JOURNEY_ICON: "/static/images/journey-thumb-icon.png",
    events: {
        'click .search-icon' : 'activateSearch',
        'click [data-attr=cancel-search]': 'cancelSearch',
        'keyup input[name=search-site]': 'searchSite',
        'click .clear-search': 'clearSearch',
        'click .search-filters .label-text': 'filtersSelect',
        'click .scroll-to-top': 'scrollToTop'
    },

    activateSearch() {
        this.$el.addClass('search-active searched');
        $('.grayout').show();
        this.$el.find('input[name=search-site]').focus();
        $('.search-result-wrapper').show();
    },

    cancelSearch() {
        this.clearSearch();
        $('.grayout').hide();
        $('.search-result-wrapper').remove();
        this.$el.removeClass('search-active searched');
    },

    clearSearch() {
        let searchInput = this.$el.find('input[name=search-site]');
        if(searchInput.val()){
            searchInput.val('');
            this.renderSearchResults();
        }
        searchInput.focus();
        this.$('.clear-search').hide();
    },

    searchSite(event) {
        if(event.keyCode == 27){
            return this.cancelSearch();
        }

        if(!event.isTrigger && !Common.isValidCharacter(event)) return

        this.searchContent(event);
        // Trigger google analytics.
        this.triggerGAevent('Search', document.page || 'Home');
    },

    renderSearchResults(searchResults={}) {
        $('.search-result-wrapper').remove();
        let resultList = [],
            localeId = SDCookies.getItem('user_locale'),
            mediaTypes = {},
            root = this;
        
        let searchResultsList = searchResults.hits || [];

        $.each(searchResultsList, function(count, searchResult) {
            let title = searchResult[`title_${localeId}`];
            if(localeId && title) {
                let {
                    url: link, media_type, category, is_asset = false
                } = searchResult

                let breadcrumb =  searchResult[`breadcrumb_${localeId}`],
                    imageUrl = searchResult[`image_url_${document.defaultLocaleID}`],
                    typeLabel = null;

                if (!imageUrl) {
                    imageUrl = `${document.cdn_url}${
                        category === 'journeys' ? root.JOURNEY_ICON: root.DEFAULT_ICON }`;
                }

                if(is_asset){
                    typeLabel = 'pdf';
                    link = searchResult[`asset_url_${document.defaultLocaleID}`];
                    if (searchResult[`asset_url_${localeId}`]) {
                        link = searchResult[`asset_url_${localeId}`];
                    }
                } else if(searchResult.is_leafnode) typeLabel = 'html';

                if(media_type){
                    media_type = media_type === 'wistia' ? 'video': media_type;
                    mediaTypes[media_type] = mediaTypes[media_type] ? mediaTypes[media_type]+1 : 1;
                }

                resultList.push({
                    media_type, link, imageUrl, title, breadcrumb, typeLabel
                });
            }
        });

        this.$el.append(searchTemplate({ 
            resultList, mediaTypes
        }));
        this.$('.search-result-wrapper').scroll(function(){
            root.toggleScrollToTop();
        });
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
    
    triggerGAevent(name, value) {
        !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', name, value);
    },

    filtersSelect() {
        let mediaFilterValues = [];
        _.each(this.$('.search-filters.media_type input:checked'), (filterElement)=>{
            mediaFilterValues.push($(filterElement).val());
        });

        if(!mediaFilterValues.length) this.$('.search-result-item').removeClass('hide');	
        
        _.each(this.$('.search-result-item'), (result) => {
            result = this.$(result);
            // mediaType should be of type String. 
            let mediaType = `${result.data('media_type')}`;
            if (mediaFilterValues.length) {
                mediaFilterValues.includes(mediaType) ? result.removeClass('hide') : result.addClass('hide');
            }
        });
        let resultCount = this.$('.search-result-item:not(.hide)').length;
        this.$('.search-total-count').text(`Displaying ${resultCount} results`);
    },
    
    toggleScrollToTop: function() {
        (this.$('.search-result-wrapper').scrollTop() >= 200) ? $('.scroll-to-top').fadeIn() : $('.scroll-to-top').fadeOut();
    },

    scrollToTop: function() {
        this.$('.search-result-wrapper').animate({scrollTop: 0}, 200);
        return false;
    },
});

export default searchView;