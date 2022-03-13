/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../models/mail_suggestions',
        '../models/answer',
        '../models/path',
        '../models/option',
        '../models/path-activity',
        '../models/question',
        '../templates/mail_suggestions.handlebars',
        '../templates/paths.handlebars',
        '../templates/question.handlebars',
        '../templates/suggestions.handlebars',
        'utils',
], function (_, $, Backbone, Common, SuggestionMailer,
             Answer, Path, Option, PathActivity,
             Question, MailSuggestionsView,
             PathListView, QuestionView, SuggestionsView) {
    'use strict';

    var MainView = Backbone.View.extend({

        el: '#main_container',

        events: {
            'click .question-and-options ul li': 'selectOption',
            'click .available_pathfinders ul li[data-path]': 'openPath',
            'click .go-back-pf:not(.disabled)': function(event){ this.selectOption(event, {'nav': 'back'});},
            'click .go-fwd-pf:not(.disabled)': function(event){ this.selectOption(event, {'nav': 'next'});},
            'click .send_pf_result': 'sendSuggestions',
            'click .submit_suggestion.success': 'sendMail',
            'click .pf-suggestion-demo, .options-block .suggestions-block': 'openSuggestion',
            'click .pf-gray-bg': 'closeSuggestionPopup',
            'keyup #pf-email': 'validateEmail',
            'click .pf-icon': 'zoomImage',
            'click .zoom_close': 'closeZoomImage',
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
        },

        initialize: function(pathId) {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            utils.setSEOData(document.app_name, window.location.href);
            
            var attrs = {};
            this.pathId = pathId;
            if(this.pathId){
                attrs['id'] = this.pathId;
            }
            var path = new Path(attrs);
            var root = this;
            path.fetch({
                success: function(model, response){
                    if(attrs.id){
                        root.$('.pf-nav').show();
                        root.$('.go-back-pf').removeAttr('option-id').removeClass('disabled');
                        root.logPathActivity({entityType: 'StartEvent'});
                        if(response.question && response.question.question_id){
                            Common.updatePathfinderIconSrc(response.question);
                            root.$('#select-pf').attr('data-attr', 'option').attr('data-question-id', response.question.question_id);
                            root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response.question}));
                        }else{
                            root.$('#select-pf').attr('data-attr', 'question').attr('data-path', response.slug);
                        }
                        Backbone.trigger('question_rendered', response.question);
                    }else{
                        root.$('#select-pf').attr('data-attr', 'path');
                        _.each(response, function(path){
                            Common.updatePathfinderIconSrc(path);
                        })
                        root.$('#select-pf .available_pathfinders').html(PathListView({'paths': response}));
                        Backbone.trigger("view_rendered", this);
                    }
                },
                error: function(xhr, status_code, message){
                    console.log(xhr, status_code, message);
                }
            })
        },

        openPath: function(e){
            if(this.$(e.target).hasClass('pf-icon') || this.$(e.target).hasClass('pf_edit_option')) return;
            var url = '/path-finder'
            var pathId = this.$(e.currentTarget).attr('data-path');
            if(document.isAuthor){
                url = '/edit' + url;
            }
            window.location.href = url + '/' + pathId;
        },

        selectOption: function(event, data) {
            if(this.$(event.target).hasClass('pf-icon')) return;
            if(this.$(event.target).hasClass('pf_edit_option') || this.$(event.target).hasClass('pf_edit') || this.$(event.target).hasClass('img-magnifying')) return
            this.$('.send_pf_result').hide();
            var answerId, answer;
            if(this.$(event.currentTarget).attr('option-id')){
                answerId = this.$(event.currentTarget).attr('option-id');
            }else{
                var url = '/path-finder'
                if(document.isAuthor){
                    url = '/edit' + url;
                }
                window.location.href = url;
            }
            var root = this;
            // select option from arrow navingation
            this.fromKeyNavigation = data ? true: false;
            if(answerId){
                answer = new Answer({id: answerId});
                answer.fetch({
                    data: data || {},
                    success: function(model, response){
                        root.displayPathQuestions(response);
                    }
                })
            }
        },

        logPathActivity: function(pathDetails){
            if(!document.isAuthor){
                pathDetails['path_id'] = this.pathId;
                this.pathActivity = new PathActivity(pathDetails);
                this.pathActivity.save();
            }
        },

        displayPathQuestions: function(response){
            if(response.question){
                this.$('#select-pf').attr('data-attr', 'option').removeAttr('data-option-id').attr('data-question-id', response.question.question_id);
                if(!document.isAuthor && response.question.options.length == 0  && $.isEmptyObject(response.question.information)){
                    this.$('#select-pf .available_pathfinders').html("<h2 class='no-pf-result'>No results found!!</h2>");
                }else{
                    Common.updatePathfinderIconSrc(response.question);
                    this.$('#select-pf .available_pathfinders').html(QuestionView(response));
                }
                if(!this.fromKeyNavigation){
                     /*
                    !this.fromKeyNavigation - avoid the event tracking for arrow key navigations
                    navigationEvent - Event for the path traverse from an option/information to other 
                                    question's option.
                    */
                    this.pathDetails = {entityType: 'navigationEvent', option_id: response.previous_option_selected}
                    this.logPathActivity(this.pathDetails);
                }
                Backbone.trigger('question_rendered', response.question);
            } else if(response.information){
                this.$('#select-pf').attr('data-attr', 'information');
                this.$('#select-pf .available_pathfinders').html(QuestionView(response));
                Backbone.trigger("view_rendered", this);
                if(!this.fromKeyNavigation){
                    /* navigationEvent - Event for the path traverse from an option/information to other information. */
                    this.pathDetails = {entityType: 'navigationEvent', option_id: response.previous_option_selected}
                    this.logPathActivity(this.pathDetails);
                }
            }else{
                this.fromOptionId = response.previous_option_selected;
                this.listSuggestions(this.fromOptionId);
            }
            this.$('.go-fwd-pf').removeAttr('option-id').removeClass('disabled').addClass('disabled');
            this.$('.go-back-pf').removeAttr('option-id').removeClass('disabled');
            
            if(response.previous_option_selected){
                this.$('.go-back-pf').removeClass('disabled').attr('option-id', response.previous_option_selected);
            }
            if(response.next_option_selected){
                this.$('.go-fwd-pf').removeClass('disabled').attr('option-id', response.next_option_selected);
            }

            if(response.previous_option_selected || response.next_option_selected){
                this.$('.pf-nav').show();
            }else{
                this.$('.pf-nav').hide();
            }
            this.$('.path-finder-block').animate({scrollTop: 0}, 300);
        },

        listSuggestions: function(answer_id) {
            this.$('#select-pf').attr('data-attr', 'suggestions').removeAttr('data-question-id').attr('data-option-id', answer_id);
            var option = new Option({id: answer_id, child: 'suggestions'});
            var root = this;
            option.fetch({
                success: function(model, response){

                    var selectedSuggestionsList = [];

                    _.each(response.suggestions, function(suggestion){
                        if(suggestion.type == 'group'){
                            // Grouped suggestions.
                            _.each(suggestion.suggestions_list, function(suggestion){
                                suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
                                if (suggestion.total_slides)
                                    suggestion.totalSlides = (suggestion.total_slides == 1)? '1 slide': (suggestion.total_slides + ' slides');
                                selectedSuggestionsList.push(suggestion)
                            });
                        }else{
                            // Single/Discrete suggestions.
                            suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
                            if (suggestion.total_slides)
                                suggestion.totalSlides = (suggestion.total_slides == 1)? '1 slide': (suggestion.total_slides + ' slides');
                            selectedSuggestionsList.push(suggestion);
                        }
                    });

                    if(!selectedSuggestionsList.length){
                        if(document.isAuthor && response.message && (response.message.body ||response.message.title || false)){
                            root.$('#select-pf .available_pathfinders').html(SuggestionsView(response));
                            Backbone.trigger("view_rendered", root);  
                        }else{
                            root.pathDetails = {entityType: 'navigationEvent', option_id: answer_id};
                            root.logPathActivity(root.pathDetails);
                            root.$('#select-pf .available_pathfinders').html("<h2 class='no-pf-result'>No results found!!</h2>");
                        }
                    }else{
                        if(_.isEmpty(response.message)){
                            response.message = Common.SUGGESTION_PLACEHOLDER;
                        }
                        if(!document.isAuthor){
                           // need to filter !empty groups
                           response.suggestions = _.filter(response.suggestions, function(suggestion){
                                if((suggestion.chapter_slug || suggestion.external_url)||
                                   (!suggestion.chapter_slug && suggestion.suggestions_list.length))
                                    return suggestion;
                            });
                        }else{
                            response.isEdit = true;
                        }
                        root.$('#select-pf .available_pathfinders').html(SuggestionsView(response));
                        root.$('.send_pf_result').show();
                        if(!root.fromKeyNavigation){
                            /* GoalEvent - Event for the path traverse from an option/information to list suggestions. */
                            root.pathDetails = {entityType: 'GoalEvent', option_id: root.fromOptionId};
                            root.logPathActivity(root.pathDetails);
                        }
                        Backbone.trigger("view_rendered", root);
                    }
                }
            });
        },

        openSuggestion: function(event){
            if(this.$(event.target).hasClass('pf_edit_option') || this.$(event.target).hasClass('pf_edit')) return;
            var suggestion_type = $(event.currentTarget).find('a').attr('suggestion-type');
            if(suggestion_type == 'external-link'){
                var external_url = $(event.currentTarget).find('a').attr('external_url');
                window.open(external_url);
            }else{
                var product = $(event.currentTarget).find('a').attr('product');
                var section = $(event.currentTarget).find('a').attr('section');
                var chapter = $(event.currentTarget).find('a').attr('chapter');
                var url = product;
                if(section !== product){
                    url += '/' + section;
                }
                url += '/' + chapter;
                window.open(window.location.origin + '/#!/' + url);
            }
        },

        sendSuggestions: function() {
            this.$('#select-pf #suggestion_popup').html(MailSuggestionsView);
            var root = this;
            setTimeout(function() {
                root.$('#pf_save_popup').addClass('active');
            }, 300);
        },

        closeSuggestionPopup: function() {
            $('#select-pf #suggestion_popup').empty();
        },

        sendMail: function(){
            this.$('#pf-email, .submit_suggestion').removeClass('success');
            var mailer = new SuggestionMailer();
            var root = this;
            mailer.fetch({
                data: {'email': this.$('#pf-email').val(), 'option_id': this.fromOptionId},
                success: function(model, response){
                    root.$('.pf_receiver_details').hide();
                    root.$('.pf_success_block').show();
                    setTimeout(function() {
                        root.$('#pf_save_popup').removeClass('active');
                        root.$('#select-pf #suggestion_popup').empty();
                    }, 3000);
                },
                error: function(xhr, status_code, message){
                    console.log(xhr, status_code, message);
                    root.$('#pf-email, .submit_suggestion').removeClass('success');
                }
            })
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

        validateEmail: function() {
            if(Common.validateEmail(this.$('#pf-email').val())) {
                this.$('#pf-email, .submit_suggestion').removeClass('success').addClass('success');
            } else {
                this.$('#pf-email, .submit_suggestion').removeClass('success');
            }
        },

        zoomImage: function(event){
            if (this.$(event.currentTarget).hasClass('default')) return;
            var zoomImageSrc = this.$(event.currentTarget).parent().find('img').attr('src');
            var zoomImage = "<img class='zoom' src='"+ zoomImageSrc +"'><span class='zoom_close'></span>";
            this.$('.pathfinder_overlay .popup-wrap').html(zoomImage);
            this.$el.addClass('img_zoom');
        },

        closeZoomImage: function(){
            this.$el.removeClass('img_zoom');
            this.$('.pathfinder_overlay .popup-wrap').empty(); 
        }

    });

    return MainView;
});

