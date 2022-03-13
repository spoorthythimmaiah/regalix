/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../collections/quiz',
        '../templates/home.handlebars',
        'utils',
], function (_, $, Backbone, Common, QuizCollections, HomeTemplate) {
    'use strict';

    var HomeView = Backbone.View.extend({

       el: '#main_container',
       QUIZ_ICON: "/static/images/checklist-banner1.png",

        events: {
            'click .quiz': 'selectQuiz',
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
        },

        initialize: function() {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});

            this.quizCollections = new QuizCollections();
            this.listenTo(this.quizCollections, 'sync', this.render);
            this.quizCollections.fetch({reset: true});
        },

        render: function(){
            var root = this;
            _.each(this.quizCollections.attributes, function(quiz){
                if(!quiz.icon){
                    quiz.icon = {
                        url: `${document.cdn_url}${root.QUIZ_ICON}`,
                        name: quiz.name
                    }
                }
            })
            this.$('#block_container').html(HomeTemplate({quizs: this.quizCollections.attributes}));
            utils.setSEOData(document.app_name, window.location.href);
            Backbone.trigger("home_rendered", this);
        },

        selectQuiz: function(event){
            var quizId = this.$(event.currentTarget).attr('data-slug');
            if(quizId){
                Backbone.history.navigate('/' + quizId, {trigger: true});
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
