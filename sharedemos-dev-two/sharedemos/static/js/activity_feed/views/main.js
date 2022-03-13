import $ from 'jquery';
import * as Backbone from 'backbone';
import {on} from '../../helpers/decorator';
import ActivityView from './activity';
import ActivityCollection from '../collections/activity'

class MainView extends Backbone.View {

    el() {
        return $('#dashboard_activity');
    }

    initialize () {
        this.page = 1; // Initally loading first page with 20 activities
        this.searchPage = 1; // filter scroll page number
        this.isLastPage = false;  // true if more than one page exist for the collection fetch
        this.filterScrollable = false; // true if any parameter in the filter section has value
        this.filter_enabled = true;
        this.activitiesList = new ActivityCollection();
        this.listenTo(this.activitiesList, 'sync', this.render);
        this.initDates();
        $(window).on('scroll', {'root': this}, this.scrollAppend);
    }

    render() {
        this.$('.empty_data').hide();
        if (this.activitiesList.toJSON()[0].activity_details.length){
             this.isLastPage = this.activitiesList.toJSON()[0].is_last_page // to avoid request from scroll event if its has no next page
            if(this.activitiesList.toJSON()[0].page == 1 ){
                this.$('.activity-feed-list').empty();
            }
            this.activitiesList.toJSON()[0].activity_details.forEach((model) => {
                var activity = new ActivityView({model: model})
                this.$('.activity-feed-list').append(activity.render());
            })
        }else{
            this.$('.activity-feed-list').empty();
            this.$('.empty_data').show();
            this.filterScrollable = false;
            this.isLastPage = true;
        }
        this.loadUserProfilePictures(this);
        return this;
    }


    initDates() {
        var fromDateElem = $('#search-from'), toDateElem = $('#search-until');
        var root = this;
        fromDateElem.datepicker({
            language: 'en',
            dateFormat: "yyyy-mm-dd",
            maxDate: new Date(),
            position: "bottom right",
            autoClose: true,
            clearButton: true,
            onSelect: function(selectedDate, date){
                toDateElem.data('datepicker').update('minDate', date);
                if(root.filter_enabled) root.activityFilter();
            },
        });
        toDateElem.datepicker({
            language: 'en',
            dateFormat: "yyyy-mm-dd",
            maxDate: new Date(),
            position: "bottom right",
            autoClose: true,
            clearButton: true,
            onSelect: function(selectedDate, date){
                fromDateElem.data('datepicker').update('maxDate', date || new Date());
                root.activityFilter();
            }
        });

        if(window.entity){
            this.filter_enabled = false;
            fromDateElem.data('datepicker').selectDate(this.getDate(window.data["fromDate"]));
            this.filter_enabled = true;
            toDateElem.data('datepicker').selectDate(this.getDate(window.data["untillDate"]));
        }else{
            this.filterScrollable = true;
            this.activitiesList.fetch({
                traditional: true,
                data: window.data
            })
        }
    }

    @on('click .search-filter')
    activityFilter() {
        this.searchPage = 1;
        this.paginatedFilter();
    }

    @on('keyup #search-activity-post')
    searchPost(){
        this.activityFilter();
    }

    scrollAppend(event){
        var root = event.data.root;
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            root.page = root.page +  1
            if(root.filterScrollable && !root.isLastPage){
                root.searchPage = root.searchPage + 1
                root.paginatedFilter();
            }else if(!root.isLastPage){
                root.activitiesList.fetch({
                    traditional: true,
                    data: {
                        'page': root.page,
                    }
                })
            }
        }
    }

    selectedEntities(className){
        var filteredEntities = [];
        var entityList = this.$('.'+className).toArray();
        entityList.forEach((element) => {
            if (element.getAttribute('class').indexOf('selected') != -1){
                if(element.getAttribute('data-item') == 'hide/show') filteredEntities.push('hide', 'show');
                else filteredEntities.push(element.getAttribute('data-item'));
            }
        });
        return filteredEntities;
    }

    getSearchText(){
        var searchText = this.$('#search-activity-post').val().trim();
        if (searchText.length < 2){
               // for less than two character, search post disabled
               searchText = null;
            }
        return searchText
    }

    paginatedFilter(){
        let searchText = this.getSearchText(),
            fromDate = $('#search-from').val(),
            untillDate = $('#search-until').val(),
            filteredCategories = this.selectedEntities('search-category'),
            filteredAuthors = this.selectedEntities('search-author'),
            filteredActions = this.selectedEntities('search-action');

        if((fromDate && untillDate) || filteredActions || filteredAuthors || filteredCategories || searchText){
            this.filterScrollable = true;
        }
        this.activitiesList.fetch({
            traditional: true,
            data: {
                'actions': filteredActions,
                'authors': filteredAuthors,
                'categories': filteredCategories,
                'request_from': 'filter',
                'fromDate': fromDate,
                'untillDate': untillDate,
                'searchText': searchText,
                'page': this.searchPage,
            }
        })
    }

    loadUserProfilePictures(container){
        container.$('.author-icon').each(function(index, image){
            container.$(image).attr({
                'data-height': 34,
                "data-width": 34,
                "data-char-count": 2,
                "data-font-size": 14
            }).initial().css({'border-radius': '50px', '-moz-border-radius': '50px'});
            var pic_url = container.$(image).attr('picture-url');
            if(pic_url){
                var img = new Image();
                img.onload = function() {
                    container.$(image).attr('src', pic_url);
                };
                img.src = pic_url;
            }
        });
    }

    getDate(date_string){
        var date_string = date_string.split('-');

        var year = parseInt(date_string[0]);
        var month = parseInt(date_string[1]) - 1;
        var day = parseInt(date_string[2]);

        return new Date(year, month, day);
    }
}

export default MainView;
