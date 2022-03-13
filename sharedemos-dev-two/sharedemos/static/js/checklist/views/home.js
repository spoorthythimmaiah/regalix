/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../models/checklist',
        '../collections/checklist_collection',
        '../templates/checklist_home.handlebars',
        '../templates/checklist_block.handlebars',
        'utils',
], function (_, $, Backbone, Common, Checklist,
             ChecklistCollection, ChecklistHomeTemplate,
             ChecklistBlockTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({

        el: '#main_container',

        CHECKLIST_ICON: "/static/images/checklist-banner1.png",
        template: ChecklistHomeTemplate,

        events: {
            'click .filter' : 'changeHomeViewType',
            'click .checklist_wrap .explore' : 'exploreChecklist',
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
        },

        initialize: function() {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});

            this.is_edit = false;
            if(document.isEdit){
                this.is_edit = true;
            }

            this.checklist = new ChecklistCollection();

            this.listenTo(this.checklist, 'sync', this.render);
            this.checklist.fetch({reset: true});
        },

        render : function(){
            this.loadChecklistHome(this.checklist.models.pop().attributes);
            $('.footer').children('.counts').each(function(){
                var text = $(this).html().split(' ');
                let noun_form = ' Check';
                if ((parseInt(text[0]) != 1)) noun_form +='s';
                $(this).html(text[0] + noun_form);
            });
            utils.setSEOData(document.app_name, window.location.href);
            Backbone.trigger("home_rendered", this);
        },

        changeHomeViewType : function(event){
            $('.checklists').hide();
            $('.filter').removeClass('active');
            var viewTypeId = $(event.currentTarget).attr('id');
            $(event.currentTarget).addClass('active');
            $('.' + viewTypeId + '_list').show();
        },

        exploreChecklist: function(event){
            var checklistId = this.$(event.currentTarget).attr('data-slug');
            if(checklistId){
                Backbone.history.navigate('/' + checklistId, {trigger: true});
            }
        },

        loadChecklistHome : function(checklists){
            var is_edit = this.is_edit;
            this.$el.find('#block_container').html(this.template({'is_edit' : is_edit}));
            var root = this;
            _.each(checklists.featured_checklists, function(checklist) {
                if((checklist.items_count > 0 && checklist.is_featured )|| is_edit){
                    root.setIconSource(checklist);
                    $('.checklist_list .featured_list').append(ChecklistBlockTemplate({"checklist" : checklist, 'is_edit' : is_edit}));
                }
            });
            if (!is_edit){
                _.each(checklists.trending_checklists, function(checklist) {
                    if(checklist.items_count > 0){
                        root.setIconSource(checklist);
                        $('.checklist_list .trending_list').append(ChecklistBlockTemplate({"checklist" : checklist}));
                    }
                });
                _.each(checklists.recent_checklists, function(checklist) {
                    if(checklist.items_count > 0){
                        root.setIconSource(checklist);
                        $('.checklist_list .recent_list').append(ChecklistBlockTemplate({"checklist" : checklist}));
                    }
                });
                _.each(checklists.featured_checklists, function(checklist) {
                    if(checklist.items_count > 0 ){
                        root.setIconSource(checklist);
                        $('.checklist_list .all_list').append(ChecklistBlockTemplate({"checklist" : checklist}));
                    }
                });
                this.$('.checklists').hide();
                this.$('.all_list').show();
            }
        },

        setIconSource: function(checklist){
            if (!checklist.icon)
                checklist.icon = {
                    url: `${document.cdn_url}${this.CHECKLIST_ICON}`
                }
        },

        triggerSearchGAEvent: function(event){
            var linkElement = $(event.currentTarget);
            var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();
            if(linkElement.hasClass("walkthrough-entry")) {
                Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
            } else {
                Common.triggerGAevent('Section Search', searchBreadcrumb);
            }
        },

    });
    
    return HomeView;
});
