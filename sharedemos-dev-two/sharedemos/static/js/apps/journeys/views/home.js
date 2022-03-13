/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../models/journeys',
        '../templates/filters.handlebars',
        '../templates/items.handlebars'
], function (_, $, Backbone, Journeys, Filters, JourneysList) {
    'use strict';

    var MasterJourneysView = Backbone.View.extend({

        el: '#main_container',

        journeysList : [],

        events: {
           'click .filter-item': 'filterJourney'
        },

        initialize() {
            this.listAllJourneys()
        },

        listAllJourneys() {
            let journeys = new Journeys();
            let root = this;
            journeys.fetch({
                success(model, resp) {
                    if(!resp.length) {
                        root.$('.journey-block').addClass('content-not-found')
                        return;
                    }
                    if(resp['ret_url']) {
                        let args = {
                            next: window.location.pathname + window.location.hash
                        }
                        resp['ret_url'] += '?' + $.param(args);
                        window.location.href = window.location.origin + resp['ret_url'];
                    }
                    root.journeysList = resp;

                    let filters = {}
                    // Get filters group name and its options.
                    // filters = {groupName(key): options(value)}
                    _.each(resp, (data)=> {
                        _.each(data.tags, (tag)=>{
                            if (filters[tag.name]){
                                filters[tag.name] = _.unique(filters[tag.name].concat(tag.options)).sort();
                            }else{
                                filters[tag.name] = tag.options.sort();
                            }
                        })

                    });
                    root.$('.filters-block').html(Filters(filters));
                    root.$('.items-block').html(JourneysList(resp));
                    root.$('.journey-block').addClass('content-loaded');
                },
                error(model, resp){
                    console.log( 'something went wrong', model, resp );
                }
            });
        },

        validateJourney(journeyTags, checkedItems){
            // 'checkedItems' is an object containing checked groups and options,
            // checkedItems = {'CHECKED_GROUP': ['LIST_OF_CHECKED_OPTIONS'], ...}

            // Check if the journey has all the groups which are checked,
            // and atleast one of the options in each group.

            let checkedGroups = Object.keys(checkedItems);

            // The journey tags will be in this format:
            // journeyTags = [{'name': 'GROUP_NAME', 'options': ['LIST OF OPTIONS']}, ...]

            // Now the below method converts it into:
            // formattedJourneyTags = { 'GROUP_NAME': ['LIST OF OPTIONS'], ... }

            let journeyGroups = [];
            let formattedJourneyTags = {};
            $.each(journeyTags, (idx, tag) => {
                journeyGroups.push(tag.name);
                formattedJourneyTags[tag.name] = tag.options;
            });

            var isValid = true;

            $.each(checkedGroups, (idx, grp)=> {

                // Check if the journey has groups which are 'checked'.
                // Even if one of the checked group is not present in the journey,
                // then its not displayed, as there is an 'AND' condition
                // between the groups.

                let itemIndex = $.inArray(grp, journeyGroups);

                if(itemIndex === -1){
                    isValid = false;
                    return false;
                    // returning 'false' inside a $.each will actually
                    // 'break' the entire execution and exits the iteration.
                }

            });

            if(!isValid)
                return false;

            // Check if any one of the journey options are checked.
            $.each(formattedJourneyTags, (journeyGroup, journeyOptions)=> {

                let itemIndex = $.inArray(journeyGroup, checkedGroups);
                if (itemIndex !== -1){

                    let grp = checkedGroups[itemIndex];
                    let checkedGrpOptions = checkedItems[grp];
                    let booleanList = [];

                    // The journey whose options doesn't have any one of the
                    // checked option, will not be displayed.
                    $.each(journeyOptions, (idx, option) => {

                        if(checkedGrpOptions.includes(option)){
                            booleanList.push(true);
                        }else{
                            booleanList.push(false);
                        }
                    });

                    // The booleanList will contain all false values,
                    // if the journey's options doesn't include any one of the checked option.

                    let allFalses = _.every(booleanList, (val) => {return val === false});

                    if(allFalses){
                        isValid = false;
                        return false;
                    }
                }

            });

            return isValid
        },

        getCheckedItems() {
            let filterBlocks = $('.journey-filter-block');

            let checkedItems = {};
            filterBlocks.each(function(idx, ele) {
                let groupName = $(ele).data('group');
                let optList = [];
                $.each($(`.filter-item[data-group="${groupName}"]:checked`), function(idx, opt) {
                    optList.push($(opt).attr('name'));
                } )
                if(optList.length)
                    checkedItems[groupName] = optList;
            });
            return checkedItems
        },

        filterJourney(e) {

            let checkedItems = this.getCheckedItems();
            let filteredJourneys = []

            $.each(this.journeysList, (idx, journey) => {

                let isValid = this.validateJourney(journey.tags, checkedItems);

                if(isValid)
                    filteredJourneys.push(journey)

            })

            this.$('.items-block').html(JourneysList(filteredJourneys));
        },
    });

    return MasterJourneysView;
});
