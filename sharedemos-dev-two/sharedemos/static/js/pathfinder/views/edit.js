/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../../tenant/models/walkthrough',
        '../models/path',
        '../models/option',
        '../models/question',
        '../models/suggestions',
        '../models/suggestions_groups',
        '../templates/add_new.handlebars',
        '../templates/question.handlebars',
        '../templates/popups.handlebars',
        '../templates/edit_option.handlebars',
        '../templates/suggestions.handlebars',
        '../templates/url_unfurling.handlebars',
        '../templates/tree_view.handlebars',
        'jquery.ui',
        'jquery.nestedSortable',

], function (_, $, Backbone, Common, Walkthrough, Path, Option, Question, 
             Suggestions, SuggestionsGroups, AddNew, QuestionView, Popups,
             EditOptions, SuggestionsView, UrlUnfurlView, TreeView) {
    'use strict';

    var PathView = Backbone.View.extend({

        el: '#main_container',

        events: {
            'click .add_block, .choose_layout, .add_option .back, .add_link .back,\
                   .pf_edit_option[data-popup="add_next_question"], .pf_edit_option[data-popup="add_suggestions_warning"],\
                   .pf_edit_option[data-popup="add_link"], .content_suggestion:not(.disabled) .browse,\
                   .add_suggested_chapters .back': 'showPopup',
            'click .add_suggestions_warning .continue': 'gotoSuggestion',
            'click .add_suggested_chapters .add': 'addSuggestions',
            'click .pf_edit .pf_edit_option.edit': 'editEntity',
            'click .pf_edit .delete': 'confirmDelete',
            'click .delete_entity .delete': 'deleteEntity',
            'keyup .content-block textarea, .content-block input' : 'charCounter',
            'click .cancel': 'hidePopup',
            'click .advanced': 'showAdvanced',
            'change #upload-file': 'previewImage',
            'click .remove_file': 'removeImage',
            'click .popup-box.add_path .save': 'savePath',
            'click .popup-box.add_question .save': 'saveQuestion',
            'click .popup-box.add_option .save': 'saveOption',
            'click .popup-box.add_link .link': 'saveLink',
            'click .popup-box.edit_suggestion .save': 'updateExternalSuggestion',
            'keyup .search': 'searchList',
            'click .edit_suggestions_headers .save': 'saveSuggestionMessage',
            'change .chapters .css-checkbox': 'updateAddButtonText',
            'change .add_suggestions .css-radio, .add_suggestions_group .css-radio': 'switchSuggestionType',
            'click .content_suggestion:not(.disabled) .add_suggestion_link' : 'addSuggestionLink',
            'click .remove': 'removeExternalLink',
            'click .save_suggestions': 'saveSuggestions',
            'keyup input[type=url]': Common.updateUrl,
            'click .save_suggestions_group': 'saveUpdateSuggestionsGroup',
            'click .publish_pf:not(.disabled)': 'confirmPublishPath',
            'click .publish_pathfinder': 'publishPathFinder',
            'click .header .expand-tree': 'expandCollapseTree',
            'click .tree-view-btn': 'showTreeView',
            'click .cancel-btn': 'closeTreeView',
            'click .tree-view-block .path-finder-tree .folder-icon': 'toggleTreeQuestion',
            'click .view-block': 'viewQuestion',
        },

        initialize: function() {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            this.prev_option_id = null;
            this.edit_option = null;
            this.question = null;
            this.listenTo(Backbone, 'view_rendered', this.render);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            Common.loadLanguages(document.locales);
            this.listenTo(Backbone, 'question_rendered', function(question){
                this.question = question;
                this.render();
            });
        },

        onWindowResize: function (e){
            e.data.root.overlayCalc();
        },

        render: function(){
            var page = this.$('#select-pf').attr('data-attr');
            var can_add_options = true, attrs = {}, edit_attrs = {};
            if(this.$('.available_pathfinders ul li .pf-option-cta').length){
                can_add_options = false;
            }
            if(page != 'path') {
                var can_publish = this.canPublish();
                this.$(".tree-view-btn").addClass("tree-view-btn-show")
                if(can_publish || document.can_publish){
                    this.$('.publish_pf').removeClass('disabled');
                }
            }

            if(page == 'path'){
                attrs.add_path = true;
                edit_attrs.edit_path = true;
                this.$('.available_pathfinders ul li').append(EditOptions(edit_attrs));
            }else if(page == 'question'){
                attrs.add_question = true;
                edit_attrs.edit_question = true;
                this.$('.question-and-options .pf-header').append(EditOptions(edit_attrs));
            }else if(page == 'option'){
                edit_attrs.edit_option = true;
                var opt_map = {};
                var options = (this.question.options.length && this.question.options) || this.question.information && [this.question.information] || [];
                _.each(options, function(opt){
                    opt_map[opt.option_id] = opt;
                })
                var root = this;
                _.each(this.$('.available_pathfinders ul[data-answer] li'), function(opt_ele){
                    var opt_id = root.$(opt_ele).attr('option-id');
                    var has_suggestions = opt_map[opt_id] && opt_map[opt_id].has_suggestions || opt_map[opt_id] && opt_map[opt_id].suggestion_header;
                    var has_next_q = Boolean(opt_map[opt_id] && opt_map[opt_id].next_question_id);
                    edit_attrs.can_add_suggestion = !has_suggestions && !has_next_q;
                    edit_attrs.can_add_question = !has_next_q && !has_suggestions;
                    edit_attrs.update_question_link = !has_suggestions && has_next_q;
                    root.$(opt_ele).append(EditOptions(edit_attrs));
                })
                edit_attrs.edit_option = false;
                edit_attrs.edit_question = true;
                this.$('.question-and-options .pf-header').append(EditOptions(edit_attrs));
                attrs.add_option = true;
            }else if(page == 'suggestions'){
                attrs.add_results_to = true;
                attrs.add_suggestions = true;
                edit_attrs.edit_suggestions = true;
                edit_attrs.remove_suggestion = true;
                edit_attrs.same_locale = false;
                if (document.defaultLocaleID == document.current_locale)
                {
                    edit_attrs.same_locale = true;
                }
                this.$('.pf-suggestion-demo').append(EditOptions(edit_attrs));
                edit_attrs.edit_suggestions_headers = true;
                edit_attrs.edit_suggestions = false;
                edit_attrs.remove_suggestion = false;
                this.$('.pf-suggestions-header').append(EditOptions(edit_attrs));
                edit_attrs.edit_suggestions_group = true;
                edit_attrs.edit_suggestions_headers = false;
                edit_attrs.remove_suggestion = false;
                edit_attrs.edit_suggestions = false;
                this.$('.pf-suggestions-group-header').append(EditOptions(edit_attrs));
                var root = this;
                this.initNestedSortable();
                this.allowSuggestionsDrag();
            }

            this.$('.available_pathfinders .add_block').remove();
            if(attrs.add_option && !can_add_options) return
            if(page == 'path' || page == 'option'){
                var root = this;
                if(this.$('.available_pathfinders ul li').length == 1) {
                    this.$('.available_pathfinders .pf_drag').hide();
                }
                (this.$('.available_pathfinders ul li').length > 1) && this.$('.available_pathfinders ul').removeAttr('data-type').attr('data-type', page).sortable({
                    placeholder: 'highlight',
                    handle: '.pf_drag',
                    containment: "parent",
                    update : function(event, ui) {
                        var new_position = ui.item.index() + 1;
                        var entity, entity_id;
                        if(root.$(event.target).attr('data-type') == 'path'){
                            entity_id = root.$(ui.item).attr('data-path');
                            entity = new Path();
                        }else if(root.$(event.target).attr('data-type') == 'option'){
                            entity_id = root.$(ui.item).attr('option-id');
                            entity = new Option();
                        }
                        entity.save({
                            'id': entity_id,
                            'reorder': new_position,
                        }, {
                            patch: true,
                            error: function(xhr, status_code, message){
                                console.log(xhr, status_code, message);
                                root.$(event.target).sortable("cancel");
                            }
                        })
                    }
                })
            }
            this.$('.available_pathfinders').append(AddNew(attrs));
        },

        allowSuggestionsDrag: function(){
            $('.pf_drag').show();
            if($('.pf-suggestion > li').length ==1) {
                $('.pf_drag').hide();
                if($('.suggestion_group li').length) {
                    $('.pf_drag').show();  
                    $('.pf-suggestions-group-header .pf_drag').hide();
                }
            }
        },

        initNestedSortable: function() {
            var root = this;
            this.$('.pf-suggestion').nestedSortable({
                forcePlaceholderSize: true,
                handle: '.pf_drag',
                items: 'li',
                toleranceElement: '> div',
                disableNestingClass: 'pf-suggestion-demo',
                containment: ".path-finder-block",
                isAllowed: function(placeholder, placeholderParent, currentItem) {
                   if(!placeholder.parents().hasClass('suggestion_group') || !currentItem.hasClass('suggestion_group')) {
                       return true;
                   }
                },
                update: function(event, ui){

                    var suggestionPageOrder = root.suggestionPageElementsOrder();

                    var entity, entityId, newPosition, parentGroupId, data, parentGroupId;
                    parentGroupId = ui.item.parents('li').attr('group-id');
                    if(parentGroupId){
                        newPosition = ui.item.index() + 1;
                    }else{
                        newPosition = ui.item.index();
                    }
                    if(ui.item.hasClass('suggestion_group')){
                        entity = new SuggestionsGroups();
                        entityId = root.$(ui.item).attr('group-id');
                    }else{
                        entity = new Suggestions();
                        entityId = root.$(ui.item).attr('suggestion-id');
                        var nextSuggestion = root.$(ui.item).next('li.pf-suggestion-demo').eq(0).attr('suggestion-id');
                    }
                    root.allowSuggestionsDrag();

                    data = {
                        id: entityId,
                        reorder: newPosition,
                        to_group: parentGroupId,
                        next_suggestion: nextSuggestion,
                        order_data: suggestionPageOrder
                    }

                    entity.save(data, {
                        patch: true,
                        error: function(xhr, status_code, message){
                            console.log(xhr, status_code, message);
                            root.$(event.target).sortable("cancel");
                        }
                    })

                    

                }
            }); 
            
        },

        suggestionPageElementsOrder: function(){
            var suggestionPageOrder = [];
            _.each(this.$('.pf-suggestion').children('li'), function(element){
                if(element.classList.contains('pf-suggestion-demo')){
                    suggestionPageOrder.push(element.getAttribute('suggestion-id'));
                }else{
                    var groupId = element.getAttribute('group-id');
                    var groupData = {'groupId': groupId};
                    suggestionPageOrder.push(groupData);
                }
            })

            return suggestionPageOrder;
        },

        canPublish: function(){
            var questions_options_elem = this.$('#select-pf .pf-available-options .available_pathfinders .question-and-options');
            var questions_elements =  questions_options_elem.children('.pf-header');
            var option_elements =  questions_options_elem.children('ul').children('li');

            var can_publish = true;
            if(questions_elements.length == 0){
                can_publish = false;
            }else if(option_elements.length == 0){
                can_publish = false;
            }

            return can_publish;
        },

        confirmPublishPath: function(event){
            var page = this.$('#select-pf').attr('data-attr');
            var popupName = event.currentTarget.getAttribute('data-popup');
            /* Allow user to publish if not in path page */
            if(page == 'path') {
                return;
            }
            var attrs = {};
            attrs.publish_path_finder = true;
            this.$('.popup-wrap').html(Popups(attrs));
            this.overlayCalc();
            this.$el.addClass(popupName);
        },

        publishPathFinder: function(event){
            var pathId = window.location.href.split('/path-finder/')[1]
            var path = new Path();
            var root = this;
            this.actionInProgress('confirm_publish_pf');
            path.save({
                'id': pathId,
                'publish': true,
            }, {
                patch: true,
                success: function(model, response){
                    document.can_publish = true;
                    root.actionSuccess('confirm_publish_pf');
                },
                error: function(xhr, status_code, message){
                    console.log(xhr, status_code, message);
                    root.actionFailed('confirm_publish_pf');
                }
            })
        },

        showTreeView: function(){
            this.$el.addClass('tree-view')
            this.$('.tree-view-block').html(TreeView({'treeViewer': true, 'loading': true}))
            var path = new Path({id: document.path_id});
            var root = this
            path.fetch({
                data: { get_tree: true},
                success: function(model, response){
                    root.$('.tree-view-block .path-tree-loading').hide()
                    root.$('.tree-view-block .path-finder-tree').html(TreeView({'next_question': response.question}))
                },
                error: function(xhr, status_code, error_message){
                    root.$('.tree-view-block .path-tree-loading').hide()
                    root.$('.tree-view-block').html(TreeView({'treeViewer': true, 'loadingFailed': true}))
                    setTimeout(function(){
                        window.location.reload()
                    }, 500);
                    console.log('error', error_message);
                }
            });
        },

        closeTreeView: function(event){
            this.$el.removeClass('tree-view');
            this.$('.tree-view-block').html('');
        },

        toggleTreeQuestion: function(event){
            var element = this.$(event.currentTarget).parent().parent();
            if (element.hasClass('empty')) return;
            if(element.hasClass("open")){
                element.toggleClass("open closed");
                element.find('.open').toggleClass("open closed");
            }else{
                element.toggleClass("closed open");
            }
        },

        expandCollapseTree: function(event){
            var element = this.$(event.currentTarget);
            if(element.hasClass("open")){
                element.toggleClass("open closed");
                this.$(".header .expand-collapse-text").text("Expand All");
                this.$(".path-finder-tree .open").toggleClass("open closed");
            }else{
                element.toggleClass("open closed");
                this.$(".header .expand-collapse-text").text("Collapse All");
                this.$(".path-finder-tree .closed").toggleClass("closed open");
            }
        },

        viewQuestion: function(event){
            var questionId = this.$(event.currentTarget).parent().children().eq(1).attr("question-id")
            var optionId = this.$(event.currentTarget).parent().siblings().attr('option-id')
            var question = new Question({'id': questionId});
            var root = this
            question.fetch({
                success: function(model, response){
                    root.closeTreeView();
                    root.$('.send_pf_result').hide();
                    root.$('.go-back-pf').attr('option-id', optionId)
                    root.$(".path-finder-block #select-pf")
                        .attr('data-question-id', response.question_id)
                        .attr('data-attr', 'option');
                    Common.updatePathfinderIconSrc(response);
                    root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                    Backbone.trigger('question_rendered', response);
                }
            })
        },

        showPopup: function(event){
            var targetElem = this.$(event.currentTarget);
            this.$el.removeClass('add_path add_question choose_option add_option add_next_question add_link add_suggestions_warning add_suggestions add_suggestions_group add_results_to edit_suggestions_headers add_suggested_chapters remove_suggestions_warning');
            var popupName = event.currentTarget.getAttribute('data-popup');
            var popupFrom = this.$(event.currentTarget).data('popup-from');
            var attrs = {};
            attrs.is_edit = false;
            if (!Common.isDefaultLocale(this)){
                this.overlayCalc();
                this.$('.pathfinder_overlay').addClass('check-default-language');
                return;
            }

            if (popupName == "add_path"){
                attrs.add_path = true;
                attrs.title_limit = 100;
                attrs.description_limit = 200;
                this.$('.popup-wrap').html(Popups(attrs));
            } else if (popupName == "add_question"){
                attrs.add_question = true;
                attrs.title_limit = 200;
                attrs.description_limit = 1000;
                this.$('.popup-wrap').html(Popups(attrs));
            } else if(popupName == "add_next_question"){
                attrs.add_next_question = true;
                attrs.title_limit = 200;
                attrs.description_limit = 1000;
                var prev_option_id = $(event.currentTarget).parents('li').attr('option-id');
                if(prev_option_id){
                    this.prev_option_id = prev_option_id;
                }
                this.$('.popup-wrap').html(Popups(attrs));
            } else if (popupName == "choose_option"){
                attrs.can_add_cta = !this.$('.available_pathfinders ul li').length;
                attrs.choose_option = true;
                if ($(event.currentTarget).hasClass('switch_option')) {
                    attrs.is_edit = true;
                    attrs.option_id = this.$('.popup-box.add_option').attr('data-option');
                    if (this.$('.available_pathfinders ul li').length == 1) {
                        attrs.can_add_cta = true;
                    };
                };
                this.$('.popup-wrap').html(Popups(attrs));
            } else if (popupName == "add_option"){
                if ($(event.currentTarget).parents('.popup-box').hasClass('switch_option')) {
                    this.showEditOption(event);
                    return;
                };
                attrs.add_option = true;
                attrs.description_limit = 250;
                var option_type = $(event.currentTarget).attr('data-option-type');
                if (option_type == "text") {
                    attrs.option_text = true;
                } else if (option_type=="image") {
                    attrs.option_image = true;
                } else if (option_type == "text_image") {
                    attrs.option_image = true;
                    attrs.option_text = true;
                } else if (option_type == "cta") {
                    attrs.option_cta = true;
                    attrs.description_limit = 100;
                };
                this.$('.popup-wrap').html(Popups(attrs));
                this.$('.popup-box.add_option').attr('data-option-type', option_type);
            } else if(popupName == "add_link"){
                if(!$(event.currentTarget).hasClass("update")){
                    attrs.unlinked_option = true;
                }
                attrs.add_link = true;
                var currentOptionId = $(event.currentTarget).parents('li').attr('option-id');
                if(currentOptionId){
                    this.prev_option_id = currentOptionId;
                }
                var questions = new Question();
                var root = this;
                questions.fetch({
                    data: {'path_id': document.path_id, 'current_option_id': currentOptionId},
                    success: function(model, response){
                        response = _.reject(response, function(question){ return question.question_id == $('#select-pf').attr('data-question-id');});
                        attrs.questions = response;
                        root.$('.popup-wrap').html(Popups(attrs));
                        root.overlayCalc();
                    }
                })
            } else if(popupName == "add_suggestions_warning"){
                attrs.add_suggestions_warning = true;
                attrs.prev_option_id = $(event.currentTarget).parents('li').attr('option-id');
                this.$('.popup-wrap').html(Popups(attrs));
            }else if(popupName == "add_results_to") {
                attrs.add_results_to = true;
                this.$('.popup-wrap').html(Popups(attrs));
                this.overlayCalc();
                this.$el.addClass(popupName);
            }else if (popupName == "add_suggestions"){
                attrs.add_suggestions = true;
                this.$('.popup-wrap').html(Popups(attrs));
                this.overlayCalc();
                this.$el.addClass(popupName);
            }else if (popupName == "add_suggestions_group"){
                attrs.add_suggestions_group = true;
                attrs.title_limit = 100;
                attrs.description_limit = 200;
                if(this.$('.popup-wrap .selected_chapters').data('group-chapters') || (targetElem.hasClass('back'))){
                    this.$('.popup-wrap .popup-box').hide();
                    this.$('.popup-wrap .popup-box.'+popupName).show();
                } else {
                    this.$('.popup-wrap').html(Popups(attrs));
                }
                this.overlayCalc();
                this.$el.addClass(popupName);
            }else if(popupName == "add_suggested_chapters"){
                this.$('.content_suggestion').removeClass('disabled').addClass('disabled');
                this.$('.popup-box.add_suggested_chapters').remove();
                var option_id = this.$('#select-pf').attr('data-option-id');
                var suggestionsListType = this.$(event.currentTarget).parents().hasClass('add_suggestions')
                var root = this;
                var option = new Option()
                option.set('id', option_id);
                option.set('child', 'suggestions');
                option.fetch({
                    success: function(model, response){
                        var chapters = new Walkthrough();
                        chapters.fetch({
                            success: function(mod, resp){
                                root.$('.content_suggestion').removeClass('disabled');
                                attrs.add_suggested_chapters = true;
                                var selectedSuggestionsList = []
                                _.each(response.suggestions, function(suggestion){
                                    if(suggestion.type === 'group'){
                                        selectedSuggestionsList = selectedSuggestionsList.concat(suggestion.suggestions_list);
                                    }else{
                                        selectedSuggestionsList.push(suggestion);
                                    }
                                });
                                
                                var currentGroupSuggestions = $('.popup-wrap .selected_chapters').data('group-chapters')
                                var groupSelectedSuggestions = [];
                                if(currentGroupSuggestions && currentGroupSuggestions.length){
                                    groupSelectedSuggestions = _.map(currentGroupSuggestions, function(entity){
                                        return entity.chapter_slug;
                                    });
                                }

                                // filtering the selected demos from walkthrough api response
                                var _chapters = _.map(selectedSuggestionsList, function(entity){
                                    return entity.chapter_slug;
                                });
                                var newDemos = [];

                                // if option does not have any suggestions selected then walkthrough resp will be the new demos
                                if (!_chapters.length){
                                    newDemos = resp;
                                }else{
                                    _.each(resp, function(ch){
                                        // if selected chapter is found, then filter it from main 'resp'.
                                        if(_chapters.indexOf(ch.slug) == -1){
                                            newDemos.push(ch);
                                        }
                                        if(groupSelectedSuggestions.indexOf(ch.slug) != -1){
                                            ch.selected = true;
                                            newDemos.push(ch);
                                        }
                                    })
                                }

                                attrs.chapters = newDemos;

                                // hide suggestion group popup on list browse 
                                if(popupFrom) {
                                    root.$('.'+popupFrom).hide();
                                    root.$('.popup-wrap').append(Popups(attrs));
                                    root.$('.add_suggested_chapters .back').attr('data-popup', popupFrom);
                                } else {
                                    root.$('.popup-wrap').html(Popups(attrs));
                                }
                                root.overlayCalc();
                                root.updateAddButtonText();
                            }
                        })
                    }
                })
            }
            this.overlayCalc();
            this.$el.addClass(popupName);
        },

        updateAddButtonText: function(){
            var suggestionsCount = this.$('.css-checkbox:checked').length;
            if (suggestionsCount>0) {
                this.$('.footer .add').text('ADD ' + suggestionsCount + " SUGGESTED CHAPTER").addClass('suggestions_selected');
            } else {
                this.$('.footer .add').text('SAVE').removeClass('suggestions_selected');
            }
        },


        switchSuggestionType: function(event){
            this.$('.content_suggestion').addClass('disabled')
            this.$(event.currentTarget).siblings('.content_suggestion').removeClass('disabled');
            var suggestionType = this.$(event.currentTarget).attr('id');
            if(suggestionType == 'link_external'){
                $('.suggestion_link').removeAttr('disabled');
                if(!$('.url_unfurling_block').length){
                     $('.save_suggestions').attr('disabled', true);
                }
            }else{
                if(this.$('.popup-wrap .selected_chapters').data('selected-chapters').length){
                    $('.save_suggestions').removeAttr('disabled');
                }
                $('.suggestion_link').attr('disabled', true);
            }
            $('.suggestion_link').removeClass('error');
        },

        addSuggestionLink: function(event){
            var suggestion_link_ele = this.$('.suggestion_link');
            suggestion_link_ele.removeClass('error');
            var externalUrl = suggestion_link_ele.val().trim();
            if(!externalUrl){
                suggestion_link_ele.addClass('error');
                suggestion_link_ele.focus();
                return;
            }
            var validUrl = Common.validateUrl(externalUrl);
            if (!validUrl) { 
                suggestion_link_ele.addClass('error');
                suggestion_link_ele.focus();
                return;
            }

            this.$(event.currentTarget).parent().addClass('loading');

            var root = this;
            this.$('#link_chapter').attr('disabled', true);
            Backbone.ajax({
                dataType: "json",
                url: "/url-unfurl",
                data: {external_url: encodeURI(externalUrl)},
                success: function (response) {
                    var externalLink = {}
                    externalLink.response = response
                    externalLink.desc = response.description;
                    if(!externalLink.desc){
                        externalLink.desc = response.title;
                    }
                    if(externalLink.desc && externalLink.desc.length > 100){
                        externalLink.desc = externalLink.desc.substring(0, 101) + '...';
                    }
                    externalLink.icon = response.icon || Common.DEFAULT_LINK_ICON;
                    root.$('#link_chapter').attr('disabled', true);
                    root.$(event.currentTarget).parent().removeClass('loading')
                    root.$('.suggestion_link').val('');
                    root.$('.save_suggestions').removeAttr('disabled');
                    root.$('.external-links').append(UrlUnfurlView(externalLink))
                    root.$('.url_unfurling_block').last().data('response', response);
                },
                error: function(error){
                    root.$(event.currentTarget).parent().removeClass('loading')
                    console.log(error)
                    suggestion_link_ele.addClass('error');
                    suggestion_link_ele.focus();
                }
            })
        },

        saveSuggestions: function(e){
            var optionId = this.$('#select-pf').attr('data-option-id');
            var option = new Option();

            var suggestionType = this.$('.suggetsion_type input:checked').attr('id')
            
            var root = this;
            var attrs = {'id': optionId};
            attrs['suggestions'] = {}

            var hasSuggestions = $('.suggestion_group').length || $('.pf-suggestion-demo').length;

            if (!hasSuggestions){
                attrs['suggestions']['message'] = {'title': this.$('.pf-suggestion h2').text(), 'body': this.$('.pf-suggestion p').text()}
            }

            if (suggestionType == 'link_external'){
                var externalLinks = []
                var totalExternalLinkEles = this.$('.url_unfurling_block');
                _.each(totalExternalLinkEles, function(element, index) {
                    externalLinks.push(totalExternalLinkEles.eq(index).data('response'))
                });

                if (!externalLinks.length) return;
                this.actionInProgress('add_suggestions');
                attrs['suggestions']['external_links'] = externalLinks
            }else{

                var selectedChapters = this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked')
                var _chapters = _.map(selectedChapters, function(elem){return elem.value;});

                var has_suggestions = _.some(this.question.options, function(opt){
                    return opt.option_id == optionId && opt.has_suggestions;
                });
                if(!selectedChapters.length) return;
                this.actionInProgress('add_suggestions');
                attrs['suggestions']['chapters'] = _chapters
            }
            option.save(attrs,{
                patch: true,
                success: function(model, response){
                    root.actionSuccess('add_suggestions', function(){
                        root.listSuggestions(response);
                    });
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed('add_suggestions');
                }
            })
        },

        saveUpdateSuggestionsGroup: function(event){
            var title_ele = this.$('.popup-box.add_suggestions_group input[name=title]');
            title_ele.removeClass('error');
            if(!title_ele.val().trim()){
                title_ele.addClass('error');
                title_ele.focus();
                return;
            }
            var description_ele = this.$('.popup-box.add_suggestions_group textarea[name=description]');
            description_ele.removeClass('error');
            if(!description_ele.val().trim()){
                description_ele.addClass('error');
                description_ele.focus();
                return;
            }

            var suggestionType = this.$('.suggetsion_type input:checked').attr('id')
            
            var suggestionsList = []
            if (suggestionType == 'link_external'){
                var totalExternalLinkEles = this.$('.url_unfurling_block');
                _.each(totalExternalLinkEles, function(element, index) {
                    suggestionsList.push(totalExternalLinkEles.eq(index).data('response'))
                });

            }else{

                var modifiedChapters = this.$('.popup-wrap .selected_chapters').data('selected-chapters');
                var groupChapters = this.$('.popup-wrap .selected_chapters').data('group-chapters');
                /* Need to check only for undefined value.
                    if he edit the group and without clicking the internal library browse balue will be undefined.
                    if he clear all selection then value will be 0.
                */
                if(modifiedChapters == undefined){
                    suggestionsList = _.map(groupChapters, function(elem){return elem.chapter_id;});
                }else{
                    suggestionsList = modifiedChapters;
                }
            }


            this.actionInProgress('add_suggestions_group');
            var optionId = this.$('#select-pf').attr('data-option-id');
            var message = {'title': this.$('.pf-suggestion h2').text(), 'body': this.$('.pf-suggestion p').text()}
            var data = {
                title: title_ele.val().trim(),
                description: description_ele.val().trim(),
                option_id: optionId,
                csrf_token: $('meta[name=csrf-token]').attr('content'),
                suggestions: suggestionsList,
                suggestions_type: suggestionType,
            };

            var hasImage = $('.pf-suggestion-icon').attr('src');
            if (!hasImage){
                data['suggestion_header_message'] = message
            }


            var groupId = this.$('.popup-box.add_suggestions_group').attr('group-id');
            if (groupId){
                data['id'] = groupId;
            }

            var suggestionsGroups = new SuggestionsGroups(data);
            var root = this;
            $.when(suggestionsGroups.save()).done(function(response){
                root.actionSuccess('add_suggestions_group', function(){
                   root.listSuggestions(response);
                });
            }).fail(function(attrs, textStatus, xhr){
                root.actionFailed('add_suggestions_group');
            })

        },

        removeExternalLink: function(e){
            this.$(e.currentTarget).parents('.url_unfurling_block').remove()
            if(this.$('.url_unfurling_block').length == 0){
                this.$('#link_chapter').attr('disabled', false);
                this.$('.save_suggestions').attr('disabled', true);
            }

        },

        gotoSuggestion: function(e){
            var option_id = this.$(e.currentTarget).attr('data-prev-option-id');
            this.popupClose('add_suggestions_warning');
            this.$('#select-pf .available_pathfinders').html(SuggestionsView({'message': Common.SUGGESTION_PLACEHOLDER}));
            this.$('#select-pf').removeAttr('data-option').removeAttr('data-question-id').attr('data-attr', 'suggestions').attr('data-option-id', option_id);
            this.$('.available_pathfinders').append(AddNew({'add_suggestions': true}));
            var edit_attrs = {};
            edit_attrs.edit_suggestions_headers = true;
            this.$('.pf-suggestions-header').append(EditOptions(edit_attrs));
        },

        editEntity: function(e){
            this.$el.removeClass('add_path add_question choose_option add_option add_next_question add_link');
            var popupName = this.$(e.currentTarget).attr('data-popup');
            var attrs = {};
            attrs.is_edit = true;
            if(popupName == "add_path"){
                attrs.add_path = true;
                var path_id = this.$(e.currentTarget).parents('li').attr('data-path');
                var path = new Path({'id': path_id});
                var root = this;
                path.fetch({
                    success: function(model, response){
                        attrs.title_limit = 100 - (response.title && response.title.length || 0);
                        attrs.description_limit = 200 - (response.description && response.description.length || 0);
                        root.$('.popup-wrap').html(Popups(attrs));
                        root.$('.popup-box.add_path').attr('data-path', path_id);
                        root.$('.popup-wrap [name=title]').val(response.title);
                        root.$('.popup-wrap [name=description]').val(response.description);
                        if(response.icon && response.icon.path){
                            root.$('.popup-wrap .file_name').text(response.icon.path);
                            root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
                            root.$('.popup-wrap .block:last-child').addClass('image_added');
                        }
                        root.overlayCalc();
                        root.$el.addClass(popupName);
                    }
                })
            }else if(popupName == "add_question"){
                attrs.add_question = true;
                var question_id = this.$('#select-pf').attr('data-question-id');
                var question = new Question({'id': question_id});
                var root = this;
                question.fetch({
                    success: function(model, response){
                        attrs.title_limit = 200 - (response.text && response.text.length || 0);
                        attrs.description_limit = 1000 - (response.subtext && response.subtext.length || 0);
                        root.$('.popup-wrap').html(Popups(attrs));
                        root.$('.popup-wrap [name=title]').val(response.text);
                        root.$('.popup-wrap [name=description]').val(response.subtext);
                        if(response.icon && response.icon.path){
                            root.$('.popup-wrap .file_name').text(response.icon.path);
                            root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
                            root.$('.popup-wrap .block:last-child').addClass('image_added');
                        }
                        root.overlayCalc();
                        root.$el.addClass(popupName);
                    }
                })
            }else if(popupName == "add_option"){
                attrs.add_option = true;
                var answer_type = this.$('.question-and-options ul').attr('data-answer');
                var option_id = this.$(e.currentTarget).parents('li').attr('option-id');
                var option = new Option({'id': option_id});
                var root = this;
                option.fetch({
                    success: function(model, response){
                        root.edit_option = response;
                        attrs.description_limit = 250 - (response.text && response.text.length || 0);
                        if (answer_type == "information") {
                            attrs.option_cta = true;
                            attrs.description_limit = 100 - (response.text && response.text.length || 0);
                        } else {
                            if(response.icon && response.icon.path){
                                attrs.option_image = true
                            }
                            if(response.text.length){
                                attrs.option_text = true;
                            }
                        }
                        root.$('.popup-wrap').html(Popups(attrs));
                        if (answer_type == "information") {
                            root.$('.popup-box.add_option').attr('data-option-type', "cta");
                        } else if(attrs.option_image && attrs.option_text){
                            root.$('.popup-box.add_option').attr('data-option-type', "text_image");
                        } else if(attrs.option_image){
                            root.$('.popup-box.add_option').attr('data-option-type', "image");
                        } else if(attrs.option_text){
                            root.$('.popup-box.add_option').attr('data-option-type', "text");
                        } 

                        root.$('.popup-box.add_option').attr('data-option', option_id);
                        root.$('.popup-wrap [name=description]').val(response.text);
                        if(response.icon && response.icon.path){
                            root.$('.popup-wrap .file_name').text(response.icon.path);
                            root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
                            root.$('.popup-wrap .block[img_block]').addClass('image_added');
                        }
                        root.overlayCalc();
                        root.$el.addClass(popupName);
                    }
                })
            }else if(popupName == "add_suggestions_group"){
                attrs.add_suggestions_group = true;
                var groupId = this.$(e.currentTarget).parents('.suggestion_group').attr('group-id');
                var suggestionsGroup = new SuggestionsGroups({id: groupId});
                var root = this;
                suggestionsGroup.fetch({
                    success:function(model, response){
                        attrs.title_limit = 100 - (response.title && response.title.length || 0);
                        attrs.description_limit = 200 - (response.description && response.description.length || 0);
                        root.$('.popup-wrap').html(Popups(attrs));
                        root.$('.popup-wrap [name=title]').val(response.title);
                        root.$('.popup-wrap [name=description]').val(response.description);
                        root.$('.popup-wrap .add_suggestions_group').attr('group-id', response.id);
                        var internalChapters = _.filter(response.suggestions_list, function(suggestion){
                            return suggestion.chapter_slug;
                        });
                        root.$('.popup-wrap .selected_chapters').data('group-chapters', internalChapters);
                        if(internalChapters.length == 1){
                            root.$('.popup-wrap .selected_chapters').html(internalChapters.length + ' CHAPTER SELECTED');
                        }else{
                            root.$('.popup-wrap .selected_chapters').html(internalChapters.length + ' CHAPTERS SELECTED');
                        }
                        root.$('.'+popupName+' .cancel').removeClass('add_block').attr('rel', popupName);
                        root.overlayCalc();
                        root.$el.addClass(popupName);
                    },
                    failure: function(error){
                        console.log(error);
                    }
                })
            } else if(popupName == "edit_suggestions_headers"){
                attrs.edit_suggestions_headers = true;
                attrs.title  = this.$('.pf-suggestions-header h2').text();
                attrs.description = this.$('.pf-suggestions-header p').text();
                attrs.title_limit = 120 - (attrs.title && attrs.title.length || 0);
                attrs.description_limit = 2000 - (attrs.description && attrs.description.length || 0);
                this.$('.popup-wrap').html(Popups(attrs));
                if(this.$('.pf-suggestion-icon').attr('src')){
                    this.$('.popup-wrap .file_name').text(this.$('.pf-suggestion-icon').attr('src').split('/media/')[1]);
                    this.$('.popup-wrap .img-preview').attr('src', this.$('.pf-suggestion-icon').attr('src'));
                    this.$('.popup-wrap .block:last-child').addClass('image_added');
                }
                this.overlayCalc();
                this.$el.addClass(popupName);

            } else if(popupName == "edit_suggestion"){
                attrs.edit_suggestion = true;
                var suggestionId = this.$(e.currentTarget).parents('.pf-suggestion-demo').attr('suggestion-id');
                var suggestion = new Suggestions({id: suggestionId});
                var root = this;
                suggestion.fetch({
                    success: function(model, response){
                        attrs.title  = response.external_link.title;
                        attrs.title_limit = 200 - (attrs.title && attrs.title.length || 0);
                        attrs.suggestion_id = suggestionId;
                        root.$('.popup-wrap').html(Popups(attrs));
                        root.overlayCalc();
                        root.$el.addClass(popupName);
                    },
                    error: function(xhr, status_code, error_message){
                        console.log(xhr, status_code, error_message);
                    }
                })
            }
        },

        deleteEntity: function(e){
            var entity_type = this.$(e.currentTarget).attr('data-type');
            var entity_id = this.$(e.currentTarget).attr('data-id');
            this.actionInProgress('delete_entity');
            var root = this;
            if(entity_type == 'path'){
                var path = new Path({id: entity_id});
                path.destroy({
                    success: function(){
                        root.actionSuccess('delete_entity', function(){
                            window.location.reload();
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('delete_entity');
                    }
                })
            }else if(entity_type == 'question'){
                var question = new Question({id: entity_id});
                question.destroy({
                    success: function(model, response){
                        if(response.prev_question_id){
                            var question = new Question({'id': question_id});
                            question.fetch({
                                success: function(model, response){
                                    root.actionSuccess('delete_entity', function(){
                                        Common.updatePathfinderIconSrc(response);
                                        root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                                        root.render();
                                    });
                                }, error: function(xhr, status_code, error_message){
                                    root.actionFailed('delete_entity');
                                }
                            })
                        }else{
                            root.actionSuccess('delete_entity', function(){
                                window.location.reload();
                            });
                        }
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('delete_entity');
                    }
                })
            }else if(entity_type == 'option'){
                var option = new Option({id: entity_id});
                var question_id = this.$('#select-pf').attr('data-question-id');
                option.destroy({
                    success: function(){
                        var question = new Question({'id': question_id});
                        question.fetch({
                            success: function(model, response){
                                root.actionSuccess('delete_entity', function(){
                                    Common.updatePathfinderIconSrc(response);
                                    root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                                    if(document.can_publish == undefined){
                                        root.$('.publish_pf').addClass('disabled');
                                    }
                                    root.render();
                                });
                            }, error: function(xhr, status_code, error_message){
                                root.actionFailed('delete_entity');
                            }
                        })
                    }
                })
            }else if(entity_type == 'suggestion'){
                var suggestion = new Suggestions({id: entity_id});
                suggestion.destroy({
                    success: function(model, response){
                        root.actionSuccess('delete_entity', function(){
                            root.listSuggestions(response);
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('delete_entity');
                    }

                })
            }else if(entity_type == 'group'){
                var suggestion_group = new SuggestionsGroups({id: entity_id});
                suggestion_group.destroy({
                    success: function(model, response){
                        root.actionSuccess('delete_entity', function(){
                            root.listSuggestions(response);
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('delete_entity');
                    }

                })
            }
        },

        showEditOption: function(event){
            var attrs = {};
            attrs.is_edit = true;
            var answer_type = this.$('ul').attr('data-answer');        
            var option_type = event.currentTarget.getAttribute('data-option-type');
            var popupName = event.currentTarget.getAttribute('data-popup');
            var option_id = this.$('.popup-box').attr('data-option');
            attrs.add_option = true;
            attrs.description_limit = 250 - (this.edit_option.text && this.edit_option.text.length || 0);
            if (option_type == "text" || option_type =="text_image") {
                attrs.option_text = true
            }
            if (option_type == "image" || option_type =="text_image"){
                attrs.option_image = true
            }
            if (attrs.option_image && attrs.option_text) this.$('.popup-box.add_option').attr('data-option-type', "text_image");
            if (option_type == "cta") {
                attrs.option_cta = true;
                if (answer_type == "information") {
                    attrs.description_limit = 100 - (this.edit_option.text && this.edit_option.text.length || 0);
                } else {
                    attrs.description_limit = 100;
                };
            }
            this.$('.popup-wrap').html(Popups(attrs));
            this.$('.popup-box.add_option').attr('data-option-type', option_type);
            this.$('.popup-box.add_option').attr('data-option', option_id);
            if (option_type == "cta" && answer_type == "information") {
                this.$('.popup-wrap [name=description]').val(this.edit_option.text);
            } else if (option_type == "cta" && answer_type != "information") {
                this.$('.popup-wrap [name=description]').val("");
            } else if (option_type != "cta" && answer_type == "information") {
                this.$('.popup-wrap [name=description]').val("");
            } else {
                this.$('.popup-wrap [name=description]').val(this.edit_option.text);
            }
            if(this.edit_option.icon && this.edit_option.icon.path){
                this.$('.popup-wrap .file_name').text(this.edit_option.icon.path);
                this.$('.popup-wrap .img-preview').attr('src', '/static/media/' + this.edit_option.icon.path);
                this.$('.popup-wrap .block[img_block]').addClass('image_added');
            }
            this.overlayCalc();
            this.$el.addClass(popupName);
        },

        confirmDelete: function(e){ 
            var entity_type = this.$(e.currentTarget).attr('data-attr');
            var attrs = {};
            attrs.delete_entity = true;
            attrs.entity_type = entity_type;
            if (entity_type == "path") {
                attrs.entity_id = this.$(e.currentTarget).parents('li').attr('data-path');
            } else if(entity_type == "question"){
                attrs.entity_id = this.$('#select-pf').attr('data-question-id');
            } else if(entity_type == "option"){
                attrs.entity_id = this.$(e.currentTarget).parents('li').attr('option-id');
            }else if(entity_type == "suggestion"){
                attrs.entity_id = this.$(e.currentTarget).parents('div .pf-suggestion-demo').attr('suggestion-id');
            }else if(entity_type == "group"){
                attrs.entity_id = this.$(e.currentTarget).parents('.suggestion_group').attr('group-id');
            }
            this.$('.popup-wrap').html(Popups(attrs));
            this.overlayCalc();
            this.$el.addClass('delete_entity');
        },

        hidePopup: function(event){
            var popupName = this.$(event.currentTarget).attr('rel');
            if (popupName){
                if(popupName == 'add_suggested_chapters'){
                    this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked').removeAttr('checked');
                    this.$('.footer .add').text('ADD').removeClass('suggestions_selected');
                }
                if (popupName == 'check-default-language'){
                    this.$('.pathfinder_overlay').removeClass('check-default-language');
                }
                this.popupClose(popupName);
            }

        },

        popupClose: function(popupName){
            this.$el.removeClass();
            this.$('.popup-wrap').html("");
        },

        showAdvanced: function(event){
            this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
            setTimeout(function(){
                $('.popup-box .content-block').animate({scrollTop :750},'slow');
            }, 100);
        },

        previewImage: function(event){
            var image = event.target.files[0];
            if (!image || !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(image.name)) {
                return false;
            }
            this.$(event.currentTarget).parents('.block').find('.file_name').text(image.name);
            this.$('.img-preview').attr('src', URL.createObjectURL(image)).removeAttr('data-remove');
            this.$(event.currentTarget).parents('.block').addClass('image_added');
        },

        removeImage: function(event){
            this.$(event.currentTarget).parents('.block').removeClass('image_added');
            this.$('.img-preview').removeAttr('src').removeAttr('style').attr('data-remove', true);
        },

        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        charCounter: function(event){
            this.$(event.currentTarget).removeClass('error');
            var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));
            if (this.$(event.currentTarget).val().length <= maxChar) {
                var leftChar = maxChar - this.$(event.currentTarget).val().length;
                this.$(event.currentTarget).parents('.block').find('.counter').text(leftChar + " characters left");
            }
        },

        savePath: function(){
            var titleElement = this.$('.popup-box.add_path input[name=title]');
            titleElement.removeClass('error');
            if(!titleElement.val().trim() || titleElement.val().trim().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                titleElement.addClass('error');
                titleElement.focus();
                return;
            }
            var description = this.$('.popup-box.add_path textarea[name=description]').val().trim();
            
            this.actionInProgress('add_path');
            var attrs = {}, data = new FormData();
            var path_id = this.$('.popup-box.add_path').attr('data-path');
            data.append('title', titleElement.val().trim())
            data.append('description', description)
            data.append('csrf_token', $('meta[name=csrf-token]').attr('content'))
            if(path_id){
                attrs['id'] = path_id
                var remove_icon = this.$('.img-preview').attr('data-remove');
                if(remove_icon){
                    data.append('remove_icon', remove_icon);
                }
            }
            var icon_file = this.$('.popup-box.add_path :file').val();
            if(icon_file){
                data.append('icon', this.$('.popup-box.add_path :file')[0].files[0])
            }

            var path = new Path();
            var root = this;
            path.save(
                attrs, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: data,
                    success: function(model, response){
                        root.actionSuccess('add_path', function(){
                            window.location.reload();
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('add_path');
                    }
                }
            )
        },

        saveQuestion: function(){
            var titleElement = this.$('.popup-box.add_question textarea[name=title]');
            titleElement.removeClass('error');
            if(!titleElement.val().trim()){
                titleElement.addClass('error');
                titleElement.focus();
                return;
            }
            var description = this.$('.popup-box.add_question textarea[name=description]').val().trim();
            
            this.actionInProgress('add_question');
            var attrs = {}, data = new FormData();
            data.append('title', titleElement.val().trim())
            data.append('description', description)
            data.append('csrf_token', $('meta[name=csrf-token]').attr('content'))

            var path_id = window.location.href.split('/path-finder/')[1]
            data.append('path_id', path_id)

            if(this.prev_option_id){
                data.append('prev_option_id', this.prev_option_id)
            }
            var icon_file = this.$('.popup-box.add_question :file').val();
            if(icon_file){
                data.append('icon', this.$('.popup-box.add_question :file')[0].files[0])
            }
            var question_id = this.$('#select-pf').attr('data-question-id');
            if(!this.prev_option_id && question_id){
                attrs['id'] = question_id
                var remove_icon = this.$('.img-preview').attr('data-remove');
                if(remove_icon){
                    data.append('remove_icon', remove_icon);
                }
            }
            var question = new Question();
            var root = this;
            question.save(
                attrs, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: data,
                    success: function(model, response){
                        root.question = response;
                        root.actionSuccess('add_question', function(){
                            if(root.prev_option_id){
                                root.$('.go-back-pf').removeClass('disabled').attr('option-id', root.prev_option_id);
                                root.prev_option_id = null;
                            }
                            Common.updatePathfinderIconSrc(response);
                            root.$('#select-pf')
                                .removeAttr('data-path')
                                .attr('data-attr', 'option')
                                .attr('data-question-id', response.question_id);
                            root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                            root.render();
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('add_question');
                    }
            })
        },

        saveOption: function(e){
            var attrs = {}, data = new FormData();
            var option_type = this.$('.popup-box').attr("data-option-type");
            if (["text", "text_image", "cta"].indexOf(option_type) !== -1) {
                var description_ele = this.$('.popup-box.add_option textarea[name=description]');
                description_ele.removeClass('error');
                if(!description_ele.val().trim()){
                    description_ele.addClass('error');
                    description_ele.focus();
                    return;
                }
                data.append('description', description_ele.val().trim())
            };

            if (["image", "text_image"].indexOf(option_type) !== -1){
                if(!this.hasImage()) return;
            }

            this.actionInProgress('add_option');
            var question_id = this.$('#select-pf').attr('data-question-id');
            data.append('question_id', question_id)
            data.append('csrf_token', $('meta[name=csrf-token]').attr('content'))

            var option_id = this.$('.popup-box.add_option').attr('data-option');
            var option_type = this.$('.popup-box.add_option').attr('data-option-type');
            if(option_type == 'cta'){
                data.append('is_cta', true);
            }
            if(option_id){
                attrs['id'] = option_id
                var remove_icon;
                if(this.edit_option && this.edit_option.icon && ["text", "cta"].indexOf(option_type) !== -1){
                    remove_icon = true;
                }else{
                    remove_icon = this.$('.img-preview').attr('data-remove');
                }
                if(remove_icon){
                    data.append('remove_icon', remove_icon);
                }
            }
            if(this.$('.popup-box.add_option :file').val())
                data.append('icon', this.$('.popup-box.add_option :file')[0].files[0]);

            var option = new Option();
            var root = this;
            option.save(
                attrs, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: data,
                    success: function(){
                        root.edit_option = null;
                        root.$('.popup-box.add_option').removeAttr('data-option-type');
                        root.actionSuccess('add_option', function(){
                            var question = new Question({'id': question_id});
                            question.fetch({
                                success: function(model, response){
                                    Common.updatePathfinderIconSrc(response);
                                    root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                                    var can_publish = root.canPublish();
                                    if(can_publish || document.can_publish){
                                        root.$('.publish_pf').removeClass('disabled');
                                    }
                                    root.render();
                                }
                            })
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('add_option');
                    }
            })
        },

        addSuggestions: function(e){
            var selectedChapters = this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked')
            var _chapters = _.map(selectedChapters, function(elem){return elem.id;});
            $('.selected_chapters').data('selected-chapters', _chapters);
            var backTo = this.$(e.currentTarget).siblings('.back').attr('data-popup');
            this.$el.removeClass().addClass(backTo);
            $('.'+backTo).show();
            if(selectedChapters.length == 1){
                $('.selected_chapters').html(selectedChapters.length + ' CHAPTER SELECTED');
            }else{
                $('.selected_chapters').html(selectedChapters.length + ' CHAPTERS SELECTED');
            }
            if(selectedChapters.length){
                $('.save_suggestions').removeAttr('disabled')
            }else{
                $('.save_suggestions').attr('disabled', true);
            }
            $('.popup-box.add_suggested_chapters').hide();
        },

        listSuggestions: function(response){
            response.isEdit = true;
            _.each(response.suggestions, function(suggestion){
                if(suggestion.type == 'group'){
                    // Group suggestions.
                    _.each(suggestion.suggestions_list, function(suggestion){
                        suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
                        if (suggestion.total_slides)
                            suggestion.totalSlides = (suggestion.total_slides == 1)? '1 slide': (suggestion.total_slides + ' slides');
                    });
                }else{
                    // Single/Discrete suggestions.
                    suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
                    if (suggestion.total_slides)
                        suggestion.totalSlides = (suggestion.total_slides == 1)? '1 slide': (suggestion.total_slides + ' slides');
                }
            });
            this.$('#select-pf .available_pathfinders').html(SuggestionsView(response));

            if($('.pf-suggestion-demo').length) $('.send_pf_result').show();
            else $('.send_pf_result').hide();

            this.$('.available_pathfinders').append(AddNew({'add_suggestions': true}));
            this.render()
        },

        saveSuggestionMessage: function(e){
            var attrs = {}, data = new FormData();
            var option_id = this.$('#select-pf').attr('data-option-id');
            var title_ele = this.$('.edit_suggestions_headers textarea[name=title]');
            title_ele.removeClass('error');
            if(!title_ele.val().trim()){
                title_ele.addClass('error');
                title_ele.focus();
                return;
            }
            var description_ele = this.$('.edit_suggestions_headers textarea[name=description]');
            description_ele.removeClass('error');
            if(!description_ele.val().trim()){
                description_ele.addClass('error');
                description_ele.focus();
                return;
            }

            data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
            data.append('title', title_ele.val());
            data.append('body', description_ele.val());

            if(option_id){
                attrs['id'] = option_id
                var remove_icon = this.$('.img-preview').attr('data-remove');
                if(remove_icon){
                    data.append('remove_icon', remove_icon);
                }
            }
            var icon_file = this.$('.popup-box.edit_suggestions_headers :file').val();
            if(icon_file){
                data.append('icon', this.$('.popup-box.edit_suggestions_headers :file')[0].files[0])
            }
            this.actionInProgress('edit_suggestions_headers');
            var option = new Option();
            var root = this;
            option.save(
                attrs, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: data,
                    patch: true,
                    success: function(model, response){
                        root.actionSuccess('edit_suggestions_headers', function(){
                            root.listSuggestions(response)
                        });
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('edit_suggestions_headers');
                    }
            })
        },

        hasImage: function(){
            var src = $('.popup-box .img-preview').attr('src');
            $('.img-preview').removeClass('error');
            if( !src)  {
                $('.img-preview').addClass('error');
                return false;
            } else {
                return true;
            }
        },

        saveLink: function(event){
            var selected_question = this.$('.popup-box.add_link input[type=radio]:checked').val();
            if((selected_question || selected_question == '') && this.prev_option_id){
                if(!$(event.currentTarget).hasClass("link") || selected_question == '') selected_question = null;
                this.actionInProgress('add_link');
                var option = new Option();
                var root = this;
                option.save({
                    'id': this.prev_option_id,
                    'next_question_id': selected_question
                },{
                    patch: true,
                    success: function(model, response){
                        root.actionSuccess('add_link');
                        root.$('#select-pf')
                            .attr('data-attr', 'option')
                            .removeAttr('data-option-id')
                            .attr('data-question-id', response.question_id);
                        Common.updatePathfinderIconSrc(response);
                        root.$('#select-pf .available_pathfinders').html(QuestionView({'question': response}));
                        root.$('.go-back-pf').removeClass('disabled').attr('option-id', root.prev_option_id);
                        root.prev_option_id = null;
                        Backbone.trigger('question_rendered', response);
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed('add_link');
                    }
                })
            }
        },

        searchList: function(event){
            var popup_height = this.$('.content-block').css('height');
            this.$('.content-block').css('min-height', popup_height);
            var searchText = event.currentTarget.value;
            var pattern = RegExp(searchText, 'i');
            this.$('.search_block div').hide();
             _.each(this.$('.search_block div'), function(opt_ele){
                var text = $(opt_ele).find('label').text();
                if(pattern.test(text)){
                    $(opt_ele).show();
                }    
            })
        },

        actionSuccess: function(target, post_success, retain_popup){
            var root = this;
            setTimeout(function(){
                root.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
                root.$('.' + target + ' .form-sent').addClass("slide-in");
                setTimeout(function(){
                    root.$('.' + target + ' .form-sent').removeClass("slide-in");
                    if(!retain_popup) root.popupClose(target);
                    if(post_success){
                        post_success();
                    }
                }, 1000);
            },1000)
        },

        actionInProgress: function(target){
            this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
        },

        actionFailed: function(target){
            var root = this;
            setTimeout(function(){
                this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
                this.$('.' + target + ' .form-failed').addClass("slide-in");
                setTimeout(function(){
                    root.$('.' + target + ' .form-failed').removeClass("slide-in");
                }, 1000);
            }, 1000);
        },

        updateExternalSuggestion: function(event){
            var title_ele = this.$('.popup-box.edit_suggestion textarea[name=title]');
            title_ele.removeClass('error');
            if(!title_ele.val().trim()){
                title_ele.addClass('error');
                title_ele.focus();
                return;
            }

            this.actionInProgress('edit_suggestion');
            var suggestionId = this.$(event.currentTarget).attr('data-id');
            var data = {
                title: title_ele.val().trim(),
                csrf_token: $('meta[name=csrf-token]').attr('content'),
                suggestion_id: suggestionId,
            };
            var suggestion = new Suggestions({id: suggestionId});
            var root = this;
            suggestion.save(data,{
                success: function(model, response){
                    root.actionSuccess('edit_suggestion', function(){
                        root.listSuggestions(response);
                    });
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed('edit_suggestion');
                }
            });

        },
    });

    return PathView;
});
