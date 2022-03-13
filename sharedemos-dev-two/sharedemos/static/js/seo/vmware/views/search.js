'use strict';
import $ from 'jquery';
import _ from 'underscore';
import jcf from 'jcf';
import Backbone from 'backbone';
import Common from '../../../tenant/common';
import searchTemplate from '../templates/search.handlebars';
import getSearchResults from '../../common/views/search';


const searchView = Backbone.View.extend({
    el: 'body',
    template: searchTemplate,

    // Default icons
    ASSET_ICON: "/static/images/section-default-link-icon.png",
    CHECKLIST_ICON: "/static/images/vmware/checklist-app-icon.png",
    JOURNEY_ICON: "/static/images/journey-thumb-icon.png",
    FAQ_ICON: "/static/images/vmware/faq-app-icon.png",
    LIBRARY_ICON: "/static/images/vmware/library-app-icon.png",
    PATHFINDER_ICON: "/static/images/vmware/pathfinder-app-icon.png",
    SAMPLE_EXCHANGE_ICON: "/static/images/vmware/sample-exchange-app-icon.png",
    events: {
        'focus input[name=search-site]': 'activateSearch',
        'keyup input[name=search-site]': 'searchSite',
        'click [data-attr=cancel-search]': 'cancelSearch',
        'click .clear-search': 'clearSearch',
        'click .scroll-to-top': 'scrollToTop',
        'click .search-apps-list li':'selectApp',
        'click .search-container .download': Common.downloadSample,
        'click .toggle-search-filter': 'toggleSearchFilter'
    },

    initialize() {
        Common.LOCAL_STORAGE.removeItem('selectedApp');
        if(document.viewType == 'sample_exchange'){
            Common.LOCAL_STORAGE.setItem('selectedApp', document.viewType);
        }
    },
    
    activateSearch(event) {
        $('body').removeClass('search-active searched').addClass('search-active searched');
        $('.grayout').show();   
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
        this.activateSearch();
        if(event.currentTarget.value.length >= 2){
            $('body').removeClass('search-active searched').addClass('search-active searched');
            this.$('.clear-search').show();
            getSearchResults(this);
        }else{
            this.renderSearchResults();
        }
    },

    selectApp(event) {
        var selectedApp = event.currentTarget.dataset.appId;
        if(selectedApp == Common.LOCAL_STORAGE.getItem('selectedApp')) return;
        $('.search-apps-list li.active').removeClass('active');
        $(`.${selectedApp}`).addClass('active');
        
        let selectedAppResultCount = this.$(`li#${selectedApp}`).length;
        let allAppsResultCount = this.$(`.search-content-list ul li.search-list`).length;
        
        if (selectedApp == 'all'){
            this.$(`.search-content-list ul li.search-list`).show();
            selectedAppResultCount = allAppsResultCount;
        }
        else {
            this.$(`li#${selectedApp}`).show();
            this.$(`.search-content-list ul li:not(#${selectedApp})`).hide();
        }

        this.$('span#all').text(allAppsResultCount);
        this.$('span#display-count').text(selectedAppResultCount);

        let appName = selectedApp.split('_').join(' ');
        this.$('#result-from-app').text(appName);
        this.$('span#display-result-title').text(
            ` search result${selectedAppResultCount > 1 ? 's':''}`
        );

        // Show/hide no results found message.
        if (selectedAppResultCount == 0){
            this.$('div.search-no-result').addClass('active')
        }
        else{
            this.$('div.search-no-result').removeClass('active')
        }
    Common.LOCAL_STORAGE.setItem('selectedApp', selectedApp);
    },

    clearSearch() {
       this.$el.find('input[name=search-site]').val('').focus();
       this.renderSearchResults();
    },

    cancelSearch() {
       this.clearSearch();
       $('.grayout').hide();
       $('.search-result-wrapper').remove();
       this.$el.find('.clear-search').hide();
       $('body').removeClass('search-active searched');
       this.initialize();
    },

    renderSearchResults(searchResults={}) {
        $('.search-result-wrapper').remove();
        let libraryResult = [], appsResult = [], links = [], root = this;
        const localeId = SDCookies.getItem('user_locale');
        let searchResultsList = searchResults.hits || [];
        var selectedApp = Common.LOCAL_STORAGE.getItem("selectedApp") || 'all';
        $.each(searchResultsList, function(count, searchResult){
            let title = searchResult[`title_${localeId}`];
            if(localeId && title && !_.contains(links, searchResult.url)) {
                // url keywork doesn't work in handlebars so alias it as link.
                // Attribute aliasing in object destructuring.
                let {
                    url: link, category, author_name = "", is_asset = false
                } = searchResult;
                if(is_asset){
                    if (searchResult[`asset_url_${localeId}`]) {
                        link = searchResult[`asset_url_${localeId}`];
                    }else{
                        link = searchResult[`asset_url_${document.defaultLocaleID}`];
                    }
                }
                
                let imageUrl = searchResult[`image_url_${document.defaultLocaleID}`],
                    breadcrumb = searchResult[`breadcrumb_${localeId}`],
                    defaultIcon = false;
                if (searchResult[`image_url_${localeId}`]){
                    imageUrl = searchResult[`image_url_${localeId}`];
                }
                if (!imageUrl) {
                    defaultIcon = true;
                    if(is_asset) {
                        category = "linked_asset"
                    }
                    imageUrl = root.getDefaultImage(category);
                }
                //Breadcrumb for sample-exchange
                if (category === 'sample_exchange') breadcrumb = `Home > sample-exchange > ${title}`;

                let resultObj = { 
                    defaultIcon, imageUrl, link, title, breadcrumb, author_name, category
                };
                // when selectedApp is 'all'
                // library results should be listed first in search result,
                // followed by other apps results,
                // Hence library results and apps results are pushed to separate array and 
                // only appsResult array is sorted in alphabetical order.
                // finally concatinate both arrays.
                category === 'library' ? libraryResult.push(resultObj) : appsResult.push(resultObj);
                // links array is used to filter duplicate results,
                // in case of FAQ, Pathfinder, Checklist apps.
                links.push(link);
            }
        })
        
        
        appsResult = _.chain(appsResult).sortBy('category').value();
        
        if(selectedApp == 'sample_exchange'){
            appsResult = _.chain(appsResult)
                        .sortBy('category')
                        .sortBy('tags')
                        .sortBy('author_name')
                        .sortBy('lastUpdated')
                        .sortBy('downloadCount').reverse().value();
        }
        // Concatinates two arrays. ES6 Spread syntax. 
        let resultList = [...libraryResult, ...appsResult];
        //Count of results against respective app.
        let counter = _.countBy(resultList,'category');
        let libraryCount = counter.library || 0, faqCount = counter.faq || 0,
            checklistCount = counter.checklist || 0, pathfinderCount = counter.pathfinder || 0,
            samplesCount = counter.sample_exchange || 0, totalCount = resultList.length || 0,
            journeysCount = counter.journeys || 0;
        $('body').append(this.template({
            'results': resultList,
            'selectedApp': selectedApp,
            'apps': document.apps
        }));

        // If user selects the app using left panel and changes the search text,
        // then need to alter the counts based on results.
        // Display count in result message i.e displaying {count} search result.
        // Display no result message.
        let displayCount = this.$('span#display-count');
        let noResult = this.$('div.search-no-result');
        var selectedAppResultCount;

        switch (selectedApp){
            case 'all':
            selectedAppResultCount = totalCount;
            break;
            case 'library':
            selectedAppResultCount = libraryCount;
            break;
            case 'checklist':
            selectedAppResultCount = checklistCount;
            break;
            case 'faq':
            selectedAppResultCount = faqCount;
            break;
            case 'pathfinder':
            selectedAppResultCount = pathfinderCount;
            break;
            case 'sample_exchange':
            selectedAppResultCount = samplesCount;
            break;
            case 'journeys':
            selectedAppResultCount = journeysCount;
            break;
        }
        displayCount.text(selectedAppResultCount);
        (selectedAppResultCount == 0)?noResult.addClass('active'):noResult.removeClass('active');
        this.$('span#display-result-title').text(
            " search result" + ((selectedAppResultCount > 1)?"s":"")
        );

        // Set count of result against respective app.
        this.$('span#all').text(totalCount);
        this.$('span#library').text(libraryCount);
        this.$('span#pathfinder').text(pathfinderCount);
        this.$('span#faq').text(faqCount);
        this.$('span#checklist').text(checklistCount);
        this.$('span#sample_exchange').text(samplesCount);
        this.$('span#journeys').text(journeysCount);

        //set app name.
        let appName = selectedApp.split('_').join(' ');
        this.$('#result-from-app').text(appName);
        
        //If seleted app is all show all contents.
        if(selectedApp == 'all'){
            this.$(`.search-content-list ul li`).show();
        }else{
            // If select app is not all, hide the contents apps which are not selected.             
            this.$(`.search-content-list ul li:not(#${selectedApp})`).hide();
        }
        this.$('.search-result-wrapper').scroll(function(){
            root.toggleScrollToTop();
        });
      
        jcf.replaceAll();
    },

    // Search filter is hidden in mobile and this function toggles the filter view
    toggleSearchFilter() {
        $('.search-container').toggleClass('show-search-filter');
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
    },

    getDefaultImage(category) {
        // Function to build url for default icons
        var defaultIcon = "";
        switch(category) {
            case "checklist": defaultIcon = this.CHECKLIST_ICON;
            break;
            case "faq": defaultIcon = this.FAQ_ICON;
            break;
            case "linked_asset": defaultIcon = this.ASSET_ICON;
            break;
            case "pathfinder": defaultIcon = this.PATHFINDER_ICON;
            break;
            case "sample_exchange": defaultIcon = this.SAMPLE_EXCHANGE_ICON;
            break;
            case "journeys": defaultIcon = this.JOURNEY_ICON;
            break;
            default: defaultIcon = this.LIBRARY_ICON;
            break;

        }
        return `${document.cdn_url}${defaultIcon}`;
    }
});

export default searchView;
