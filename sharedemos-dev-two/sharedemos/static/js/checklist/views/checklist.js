/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../models/checklist',
        '../models/checklist_item_activity',
        '../templates/checklist.handlebars',
        '../templates/checklist_section.handlebars',
        '../templates/checklist_item.handlebars',
        '../templates/checklist_suggestion.handlebars',
        '../templates/checklist_results.handlebars',
        '../templates/popup.handlebars',
], function (_, $, Backbone, Common, Checklist, ChecklistItemActivity, ChecklistMainTemplate, ChecklistSectionTemplate, ChecklistItemTemplate, ChecklistSuggestionTemplate, ChecklistResultsTemplate, PopupTemplate) {
    'use strict';

    var ChecklistView = Backbone.View.extend({

        el: '#main_container',

        events: {
            'click .filter' : 'changeHomeViewType',
            'click .start_over' : 'exploreChecklist',
            'click .return-home' : 'backToHome',
            'click .checklist_item .arrow' : 'toggleChecklistText',
            'click .checklist_steps_menu .steps' : 'nextChecklistSection',
            'click .checklist_item .check' : 'logChecklistItemActivity',
            'click .get_result' : 'showChecklistResults',
            'click .results_close': 'closeChecklistResults',
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
            'click .export' : 'showExportPopup',
            'click .export-back': 'hidePopup',
            'click .download': 'exportResults',
        },

        initialize: function(checklist_slug) {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});

            this.is_edit = false;
            if(document.isEdit){
                this.is_edit = true;
            }
            this.view_type = document.viewType;

            this.checklist = new Checklist({'id' : checklist_slug});
            this.listenTo(this.checklist, 'sync', this.render);
            this.checklist.fetch({reset: true});
            this.lastResults = {};
        },

        render: function(){
            this.$el.find('#block_container').html(ChecklistMainTemplate({'checklist' : this.checklist.attributes, 'is_edit' : this.is_edit ,'view_type' : this.view_type}));
            if (this.checklist.attributes.checklist_sections.length > 0){
                this.loadChecklistItems(this.checklist.attributes.checklist_sections);
            }
            Backbone.trigger("checklist_rendered", this);
        },

        backToHome: function(){
            Backbone.history.navigate('/', {trigger: true});
        },

        closeChecklistResults: function(){
            this.$el.find('#block_container').removeClass('result_active');
            this.$('.result_block').html('');
            this.$el.find('.result_rate, .results_title').removeClass('hidden');
            this.$el.find('.overall_rate').addClass('hidden');
        },

        exploreChecklist: function(event){
            var checklistId = this.$(event.currentTarget).attr('data-slug');
            this.$el.find('#block_container').removeClass('result_active');
            if(checklistId){
                Backbone.history.loadUrl(Backbone.history.fragment);
            }
            Backbone.trigger("checklist_rendered", this);
        },

        loadChecklistItems: function(checklist_sections){
            var is_edit = this.is_edit;

            if(document.requestParameters) {is_edit = true;}

            _.each(checklist_sections, function(checklist_section, index) {
                $('.checklist_step_wrap').append(ChecklistSectionTemplate({"checklist_section" : checklist_section, 'index' : index + 1, 'is_edit' : is_edit}));
                _.each(checklist_section.checklist_items, function(checklist_item, index) {
                    $('#section_' + checklist_section.checklist_section_id).append(ChecklistItemTemplate({"checklist_item" : checklist_item, 'is_edit' : is_edit}));
                    _.each(checklist_item.suggestions, function(suggestion, index) {
                        $('#item_' + checklist_item.checklist_item_id + ' .sortable-wrap').append(ChecklistSuggestionTemplate({"suggestion" : suggestion, 'is_edit' : is_edit}));
                    });
                });
            });

            is_edit = this.is_edit;
            
            if(is_edit == false){
                this.$('.checklist_section').hide();
                this.$('#section_' + checklist_sections[0].checklist_section_id).show();
                this.$('.checklist_steps_menu .steps').removeClass('active');
                this.$('.checklist_steps_menu .steps[data-id="' + checklist_sections[0].checklist_section_id + '"]').first().addClass('active');
            }
        },

        logChecklistItemActivity: function(event){

            this.$(event.currentTarget).parents('.checklist_item').toggleClass('selected');
            
            if (document.viewType == 'main_checklist'){
                var total_checks_count = 0;
                $('.check').each(function(){
                    if ($(this).parents('.checklist_item').hasClass('selected') == true){
                        total_checks_count ++;
                    }
                });

                var noun_form =  total_checks_count == 1 ? 'Check' : 'Checks' ;
                $('.noun_form').html(noun_form);

                if(total_checks_count > 0){
                    $('.checklist_result_block').addClass('selected');
                }else{
                    $('.checklist_result_block').removeClass('selected');
                }

                $('.total_checks_count').html(total_checks_count);

                var checklistSlug = $('.checklist_header').attr('data-id');
                var checklistSectionId = $(event.currentTarget).parents('.checklist_section').attr('data-id');
                var checklistId = $(event.currentTarget).parents('.checklist_wrap').find('.checklist_header').attr('checklist-id')
                var checklistItemId = $(event.currentTarget).attr('data-id');
                var checklistSessionId = document.checklist_session;
                var isDone = $(event.currentTarget).parents('.checklist_item').hasClass('selected');
                var attrs = {'checklist_item_id' : checklistItemId, 
                             'is_done' : isDone,
                             'checklist_id': checklistId,
                             'checklist_slug' : checklistSlug,
                             'checklist_section_id' : checklistSectionId,
                             'checklist_session_id' : checklistSessionId,
                            };
                var checklistItemActivity = new ChecklistItemActivity(attrs);
                checklistItemActivity.save();
            }
                
                var total_count = this.$('.checklist_item').length;
                var completion_rate = (total_checks_count/total_count*100).toFixed(0);
            
                this.$('.checklist_result_block').addClass('result_active');
                this.$('.result_title').text(completion_rate +'%');
                this.$('.progress_bar .progress_status').css({'width' : completion_rate +'%'});
                this.$('.progress_percent').text(completion_rate +'%');
        },

        nextChecklistSection: function(event){
            var root = this;
            var checklist_section_id = $(event.currentTarget).attr('data-id');
            this.$('.checklist_section').hide();
            this.$('#section_' + checklist_section_id).show();
            this.$('.checklist_steps_menu .steps').removeClass('active');
            this.$('.checklist_steps_menu .steps[data-id="' + checklist_section_id + '"]').first().addClass('active');
            $('.checklist_item').each(function(){
                if ($(this).hasClass('open')){
                    $(this).children().children('.arrow').trigger('click')
                }
            });
        },

        showChecklistResults : function(event){
            var checklist = {'title': $('.checklist_title').text().trim(),
                             'checklist_sections': []};
            var totalItems = 0;
            var checkedItems = 0;
            $('.checklist_section').each(function(){
                var checklistSection = {'title': $(this).find('.steps_title .title').text(),
                                        'checklist_items': [],
                                        'has_suggestions': false};
                var sectionTotalItems = 0;
                var sectionCheckedItems = 0;
                $(this).children('.checklist_item').each(function(){
                    totalItems += 1;
                    sectionTotalItems += 1;
                    var checklistItem = {'title': $(this).find('.head .title').text().trim(),
                                         'checked': $(this).hasClass('selected'),
                                         'suggestions': []};

                    if(!checklistItem['checked']){
                        $(this).children('.info_block').find('.suggested_content_wrap').each(function(){
                            var suggestion = {
                                'name': $(this).find('.suggested_content_info .desc').text().trim(),
                                'thumbnail': $(this).find('a.suggested_content .suggested_content_icon img').attr('src'),
                                'link': $(this).find('a.suggested_content').attr('href')
                            };
                            checklistItem['suggestions'].push(suggestion);
                            checklistSection['has_suggestions'] = !checklistItem['checked'];
                        });
                    }else{
                        checkedItems += 1;
                        sectionCheckedItems += 1;
                    }
                    checklistSection['checklist_items'].push(checklistItem);
                });
                checklistSection['section_total_items'] = sectionTotalItems;
                checklistSection['section_checked_items'] = sectionCheckedItems;
                checklistSection['completion_percent'] = (sectionCheckedItems /sectionTotalItems*100).toFixed(0);
                checklist['checklist_sections'].push(checklistSection);
            });
            checklist["total_items"] = totalItems;
            checklist["checked_items"] = checkedItems;
            checklist["completion_rate"] = (checkedItems/totalItems*100).toFixed(0);

            this.lastResults = checklist;
            this.$el.find('#block_container').addClass('result_active');
            this.$el.find('.result_rate , .result_title').addClass('hidden');
            this.$el.find('.overall_rate').removeClass('hidden');
            this.$('.result_block').html(ChecklistResultsTemplate({'checklists': checklist}));
        },

        showExportPopup: function(event){
            var emailInput = this.$('input[name="email"]');
            var errorFlag = false;
            if(!emailInput.val()){
                this.customErrorMessage('Provide a valid email', this.$(emailInput).parent(), this.$(emailInput));
                errorFlag = true;
            }
            if (errorFlag) return false;
            this.removeErrorMessages();
            var attrs = {};

            attrs['export'] = true;

            this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            this.$('.popup-overlay').addClass('active');
            this.overlayCalc();
        },

        customErrorMessage: function(message, target, elem){
            this.$('.edit-tool-tip').remove();
            var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
            target.append(editToolTip);
            if(elem) elem.addClass('error');
        },

        removeErrorMessages: function(){
            this.$('.edit-tool-tip').remove();
            this.$('input, textarea').removeClass('error')
        },

        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        hidePopup: function(){
            this.$('.popup-overlay').removeClass('active');
            this.$('.popup-wrap').empty();
        },

        actionSuccess: function(){
            var root = this;
            setTimeout(function(){
                root.$('.form-sending').removeClass("slide-in is-submitted");
                root.$('.form-sent').addClass("slide-in");
                setTimeout(function(){
                    root.$('.form-sent').removeClass("slide-in");
                }, 1000);
            },1000)
        },

        actionInProgress: function(){
            this.$('.form-sending').addClass("slide-in is-submitted");
        },

        actionFailed: function(){
            var root = this;
            setTimeout(function(){
                root.$('.form-sending').removeClass("slide-in is-submitted");
                root.$('.form-failed').addClass("slide-in");
                setTimeout(function(){
                    root.$('.form-failed').removeClass("slide-in");
                }, 1000);
            }, 1000);
        },

        exportResults: function(event){
            var root = this;
            this.actionInProgress();

            var userEmail = $('#user_email').val();
            var checkListResults = this.lastResults;
            var csrfToken = $('meta[name=csrf-token]').attr("content");

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/check-list-export');
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
            xhr.responseType = 'blob';

            xhr.send(JSON.stringify({
                        email: userEmail,
                        send_email: $('#email-export').is(':checked'),
                        show_suggested: $('#suggested-content-export').is(':checked'),
                        checklist_results: checkListResults,
                    }
                    , null, '\t'));

            xhr.onload = function(e) {
                if (this.status == 200) {
                    var a = document.createElement("a");
                    a.style = "display: none";
                    document.body.appendChild(a);
                    a.href = window.URL.createObjectURL(this.response);
                    a.download = checkListResults['title'] + '_checklist.pdf';
                    a.click();
                    root.actionSuccess();
                    setTimeout(function () {
                        root.$('.popup-overlay').removeClass('active');
                        root.$('.popup-wrap').empty();
                        window.URL.revokeObjectURL(a.href);
                    }, 2000)
                } else {
                    root.actionFailed();
                    setTimeout(function () {
                        root.$('.popup-overlay').removeClass('active');
                        root.$('.popup-wrap').empty();
                    }, 2000)
                }
            };
        },

        toggleChecklistText: function(event){
            if (this.$(event.currentTarget).parents('.checklist_item').hasClass('open')) {
                this.$(event.currentTarget).parents('.checklist_item').removeClass("open");
                this.$(event.currentTarget).parents('.checklist_item').find('.info_block').slideUp('linear');
            } else {
                this.$(event.currentTarget).parents('.checklist_item').addClass("open");
                this.$(event.currentTarget).parents('.checklist_item').find('.info_block').slideDown('linear');
            };
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
    
    return ChecklistView;
});
