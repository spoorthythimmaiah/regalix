/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',  
        '../models/quiz', 
        '../models/option',      
        '../models/question', 
        '../templates/quiz_start.handlebars',
        '../templates/quiz.handlebars',
        '../templates/add_blocks.handlebars',
        '../templates/edit.handlebars',
        '../templates/popup.handlebars',
        '../../helpers/handlebars/i18n',
], function (_, $, Backbone, Common, Quiz,
             QuizOption, QuizQuestion, QuizStartTemplate, QuizTemplate,
             AddBlockTemplate, EditTemplate, PopupTemplate, Translate) {
    'use strict';

    var EditView = Backbone.View.extend({

        el: '#main_container',

        AUDIO_ICON: "/static/images/thumb-audio.png",
        VIDEO_ICON: "/static/images/video-thumb.jpg",

        QUIZ_TITLE_LIMIT: 150,
        QUIZ_DESCRIPTION_LIMIT: 500,
        QUIZ_CERTIFICATION_LIMIT: 1000,
        QUESTION_TITLE_LIMIT: 200,
        QUESTION_DESCRIPTION_LIMIT: 500,
        MATCHING_ANSWER_TEXT_LIMIT: 250,
        ANSWER_TEXT_LIMIT: 100,
        ANSWER_DESCRIPTION_LIMIT: 350,

        ALLOWED_AUDIO_TYPE : ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3'],
        ALLOWED_VIDEO_TYPE : ['video/mp4', 'video/webm', 'video/ogg'],
        ALLOWED_IMAGE_TYPE : ['image/jpeg', 'image/gif', 'image/jpg', 'image/tiff', 'image/png'],
        
        events: {
            'click .quiz-start': 'startQuiz',

            /* authoring events*/
            'click .add-block:not(.disabled)': 'showPopupAttrs',
            'click .quiz-nav.prev.disabled': 'showAlert',
            'click .quiz-nav.next.disabled': 'showAlert',
            'click .popup-title .back': 'backPopup',
            'keyup .content-block textarea, .content-block input' : 'charCounter',
            'click .content-block textarea, .content-block input[name="due_date"]' : 'removeErrorMessages',
            'click .advanced': 'showAdvanced',
            'change #upload-file': 'previewImage',
            'click .remove-file': 'removeImage',
            'click .choose-layout:not(.disabled)[data-answer-type]': 'chooseAnswerOptionType',
            'click .choose-layout[data-type]': 'showPopupAttrs',
            'click .option-check': 'switchOption',
            'click .change-answer-type': 'changeAnswerType',
            'change .css-radio': 'switchRadio',
            'click .popup-box[data-popup="quiz"] .save': 'submitQuiz',
            'click .popup-box[data-popup="question"] .save': 'submitQuestion',
            'click .popup-box[data-popup="save-answer"] .save': 'submitAnswer',
            'click .popup-box[data-popup="save-item"] .save': 'submitAnswerItem',
            'click .quiz-edit-option.edit' : 'editEntity',
            'click .quiz-edit-option.duplicate': 'duplicateEntity',
            'click .quiz-edit-option.delete' : 'showPopupAttrs',
            'click .confirm-delete': 'deleteEntity',
            'click .cancel': 'hidePopup',
            'click .checklist-item .check, .checklist-item .title': 'selectChecklist',
            'click .publish-quiz:not(.disabled)': 'showPopupAttrs',
            'click .confirm-publish-quiz': 'publishQuiz',
        },

        initialize: function(slugId) {
            this.edit_mode = true;
            this.listenTo(Backbone, 'home_rendered', this.homeRender);
            this.listenTo(Backbone, 'quiz_rendered', this.quizRender);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            Common.loadLanguages(document.locales);
        },

        homeRender: function(view){
            this.$('.publish-quiz').addClass('disabled');
            this.view = view;
            var attrs = {};
            attrs.add_quiz = true;
            this.$('.quiz-list').append(EditTemplate(attrs));
            attrs ={};
            attrs.edit_quiz = true;
            attrs.quiz_edit = true;
            attrs.quiz_sorting = true;
            this.$('.quiz-list-wrap').append(EditTemplate(attrs));
            this.initializeSortable();
        },

        initializeSortable: function(){
            var root = this;
            this.$(".sortable").sortable({
                update : function(event, ui) {
                    var currentQuizSlug = ui.item.attr('quiz-id');
                    var previousQuizSlug = ui.item.prev().attr('quiz-id');
                    
                    var quizDetails = {};
                    quizDetails = {
                        'id': currentQuizSlug,
                        'reorder': 'quiz',
                        'after_ele_slug': previousQuizSlug
                    }

                    var quiz = new Quiz(quizDetails);
                    quiz.save(null, {
                        patch: true,
                        success: function(){
                            root.$(".sortable").sortable("refresh");
                        }, error: function(xhr, status_code, message){
                            root.$(".sortable").sortable("cancel");
                        }
                    })
                }
            });
        },

        quizRender: function(view){
            this.is_graded = view.is_graded
            this.view = view;
            var root = this;
            var questions = view.quiz.changed.questions;
            if(! _.isEmpty(questions)) {
                this.$('.publish-quiz').removeClass('disabled');
                var attrs = {};
                attrs.edit_quiz = true;
                attrs.edit_question = true;
                this.$('.question-wrap .question').append(EditTemplate(attrs))
                this.$('.question-wrap .navigation-wrap .next').addClass('disabled');
                _.each(questions, function(question, index){
                    root.addNewBlock(question);
                    if(!question.options.length){
                        root.$(`#question_block_${index} .options-wrap .change-answer-type`).addClass('active')
                    }                   
                    var attrs ={};
                    attrs.edit_quiz = true;
                    attrs.edit_answer = true;
                    var option_type = question.option_type.split('_').reverse()[0];
                    if (option_type == 'sortable'){
                        option_type = 'select';
                    }
                    attrs.popup = option_type;
                    attrs.option_type = question.option_type;
                    if (question.option_type.includes('select') || question.option_type == 'sortable'){
                        root.$('.question-wrap[question-id="' + question.question_id +'"] .options-wrap .option-item').append(EditTemplate(attrs));
                        if( question.option_type == 'sortable'){
                            var attrs = {};
                            attrs.edit_sort_option = true;
                            root.$('.question-wrap[question-id="' + question.question_id +'"] .options-wrap .option-item').append(EditTemplate(attrs));
                            root.initSortable();
                        }
                    }else{
                        root.$('.question-wrap[question-id="' + question.question_id +'"] .options-wrap .option-item .match-wrap').append(EditTemplate(attrs));
                    }
                    var elem_index = parseInt(index) + 1;
                    var elem_id = 'question_block_' + elem_index;
                    root.navigationOptions(elem_id, question.option_type);
                });
                attrs = {};
                attrs['add_next_question'] = true;
                this.$('.question-wrap:last .navigation-wrap .next').hide();
                this.$('.question-wrap:last').append(EditTemplate(attrs));
                var last_elem_id = this.$('.question-wrap:last').attr('id');
                var option_type = this.$('.question-wrap:last .options-wrap').attr('data-option-type');
                this.navigationOptions(last_elem_id, option_type);
            } else {
                var attrs = {};
                attrs.add_question = true;
                this.$('.quiz-wrap').html(EditTemplate(attrs));
            }
            
        },

        actionSuccess: function(){
            setTimeout(function(){
                this.$('.form-sending').removeClass("slide-in is-submitted");
                this.$('.form-sent').addClass("slide-in");
                setTimeout(function(){
                    this.$('.form-sent').removeClass("slide-in");
                }, 1000);
            },1000)
        },

        actionInProgress: function(){
            this.$('.form-sending').addClass("slide-in is-submitted");
        },

        actionFailed: function(){
            setTimeout(function(){
                this.$('.form-sending').removeClass("slide-in is-submitted");
                this.$('.form-failed').addClass("slide-in");
                setTimeout(function(){
                    this.$('.form-failed').removeClass("slide-in");
                }, 1000);
            }, 1000);
        },

        addEditOptions: function(edit_entity_type, entity, option_type){
            var attrs = {};
            attrs.edit_quiz = true;
            if(edit_entity_type == 'question'){
                attrs.edit_question = true;
            }else{
                attrs.edit_quiz = true;
                attrs.edit_answer = true;
                var mod_option_type = option_type.split('_').reverse()[0];
                if (mod_option_type == 'sortable'){
                    mod_option_type = 'select';
                    attrs.edit_sort_option = true;
                }
                attrs.popup = mod_option_type;
                attrs.option_type = option_type;
            }
            if(this.$(entity).hasClass('match-block')){
                this.$(entity).parent().append(EditTemplate(attrs));
            } else {
                this.$(entity).append(EditTemplate(attrs));                
            }
            this.initSortable();
        },

        addNewBlock : function(question){
            var attrs = {};
            var question_id = question.question_id;
            if (question.option_type != '') {
                attrs[question.option_type] = true;
                this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap').append(EditTemplate(attrs));
                if(this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap .option-item.active').length > 0){
                    this.$('.add-block[data-type="matching_left"]').hide();
                    this.$('.add-block[data-type="matching_right"]').removeClass('disabled');
                }
            } else {
                attrs['choose_answer_option_type'] = true;
                this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap').append(EditTemplate(attrs));
            }
        },

        addNewQuestionBlock: function(event){
            this.$('.pagination .circle.active').removeClass('active');
            this.$('.quiz-wrap .question-wrap.active').removeClass('active');
            var attrs = {};
            attrs['add_question'] = true;
            this.$('.quiz-wrap').append(EditTemplate(attrs));
            if(this.$('.question-wrap').length){  
                attrs['block_type'] = 'previous_button';
            }
            this.$('.quiz-wrap').append(AddBlockTemplate(attrs));
        },

        addOptionBlock: function(option_response, option_type){
            option_response['block_type'] = option_type;
            var option_id = option_response.option_id;
            if (option_type == 'matching_left'){
                this.$('.question-wrap.active .options-wrap .add-block.left').before('<div class="option-item active" option-id="' + option_id + '"></div>')
                this.$('.add-block[data-type="matching_left"]').hide();
                this.$('.add-block[data-type="matching_right"]').removeClass('disabled');
            }else if(option_type == 'matching_right'){
                this.$('.add-block[data-type="matching_left"]').show();
                this.$('.add-block[data-type="matching_right"]').addClass('disabled');
                this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]').removeClass('active');
            }

            var active_elem;
            if(option_type.includes('matching')){
                this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]').append(AddBlockTemplate(option_response));
                active_elem = this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"] .match-wrap .match-block');
            }else{
                if(option_type == 'sortable'){
                    var sortable_wrap = this.$('.question-wrap.active .options-wrap .sortable-wrap');
                    if(sortable_wrap.length == 0){
                        this.$('.question-wrap.active .options-wrap .add-block').before('<div class="sortable-wrap"></div>');
                    }
                    this.$('.question-wrap.active .options-wrap .sortable-wrap').append(AddBlockTemplate(option_response));
                    active_elem = this.$('.question-wrap.active .options-wrap .sortable-wrap .option-item[option-id="' + option_id + '"]');
                }else{
                    this.$('.question-wrap.active .options-wrap .add-block').before(AddBlockTemplate(option_response));
                    active_elem = this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]');
                }
            }

            this.addEditOptions('answer', active_elem, option_type);
            var elem_id = this.$('.question-wrap.active').attr('id');
            this.$('.question-wrap.active .options-wrap .change-answer-type').removeClass('active');
            this.navigationOptions(elem_id, option_type);
        },

        backPopup: function(event){
            this.showPopupAttrs(event);
            this.$('.popup-box').attr('edit_answer', true);
        },

        canPublish: function(){
            var root = this;
            var can_publish = true;
            var error_message;
            this.$('.question-wrap').each(function(){
                var option_type = root.$(this).children('.options-wrap').attr('data-option-type');
                var selected_options = root.$(this).children('.options-wrap').children('.option-item.selected');
                var normal_options = root.$(this).children('.options-wrap').children('.option-item');
                var sortable_options = root.$(this).children('.options-wrap').children('.sortable-wrap').children('.option-item');
                var active_options = root.$(this).children('.options-wrap').children('.option-item.active');
                if(option_type.includes('select') && (selected_options.length == 0 || normal_options.length < 2)){
                    can_publish = false;
                }else if(option_type.includes('matching') && (active_options.length > 0 || normal_options.length < 2)){
                    can_publish = false;
                }else if(option_type == 'sortable' && sortable_options.length < 2 ){
                    can_publish = false;
                }else if(option_type == ''){
                    can_publish = false;
                }
            });
            var can_publish_data = {
                'can_publish' : can_publish,
                'error_message' : 'One Or More Questions has not been answered Correctly!'
            }
            return can_publish_data;
        },

        charCounter: function(event){
            this.removeErrorMessages();
            var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));
            var charLength = this.$(event.currentTarget).val().length;
            if ( charLength <= maxChar) {
                var leftChar = maxChar - this.$(event.currentTarget).val().length;
                this.$(event.currentTarget).parents('.block').find('.counter').text(leftChar + " characters left");
            }
        },

        changeAnswerType: function(event){
            let attr = {
                choose_answer_option_type: true,
                is_edit: false,
                question_id: this.$('.question-wrap.active').attr('question-id')
            };
            this.showPopup(attr);
        },

        chooseAnswerOptionType: function(event){
            var root = this;
            var question_id = this.$('.question-wrap.active').attr('question-id');
            this.answerType = event.currentTarget.getAttribute('data-answer-type');
            var question_data = { 
                'id' : question_id,
                'option_type' : this.answerType
            };

            var quizQuestion = new QuizQuestion(question_data);
            
            quizQuestion.save(null, {
                patch: true,
                success: function(response, xhr, status){ 
                    var attrs = {};
                    attrs[root.answerType] = true;
                    root.$('.question-wrap.active .add-block[data-popup="choose_answer_option_type"]').remove();
                    root.$('.question-wrap.active .options-wrap').attr('data-option-type', root.answerType);
                    root.$('.question-wrap.active .options-wrap .add-block').remove();
                    root.$('.question-wrap.active .options-wrap').append(EditTemplate(attrs));
                    root.$('.publish-quiz').removeClass('disabled');
                    root.$('.question-wrap.active .add-block.new').removeClass('disabled')
                    root.hidePopup();
                    root.$('.quiz-wrap .question-wrap.active .options-wrap .change-answer-type').addClass('active')
                }
            })
        },

        chooseItemType: function(event){
            var attrs = {}; 
            var popupName = this.$(event.currentTarget).attr('data-type'); 
            var popupType = this.$(event.currentTarget).attr('data-item-type'); 
            attrs[popupName] = true;
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

        deleteEntity: function(event){
            var root = this;
            var entity_type = this.$(event.currentTarget).attr('data-type');
            this.actionInProgress();
            if(entity_type == 'question'){
                var question_id = this.$('.question-wrap.active').attr('question-id');
                var question = new QuizQuestion({id: question_id});
                question.destroy({
                    success: function(){
                        root.actionSuccess();
                        setTimeout(function(){
                            root.$('.question-wrap.active').remove();
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment)
                        }, 2000);
                    }, error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }else if(entity_type == 'answer'){
                this.option_id = this.$(event.currentTarget).attr('data-id'); 
                var option = new QuizOption({id: this.option_id });
                var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
                option.destroy({
                    data: { 'option_type': option_type },
                    processData: true,
                    success: function(){
                        root.actionSuccess();
                        root.$('.question-wrap.active .option-item[option-id="' + root.option_id  + '"]').remove();
                        var elem_id = root.$('.question-wrap.active').attr('id');
                        root.navigationOptions(elem_id, option_type);
                        if(option_type == 'matching'){
                            root.$('.add-block.left').show();
                        }
                        setTimeout(function(){
                            root.hidePopup();
                            if (root.$('.question-wrap.active .options-wrap .option-item').length == 0){
                                root.$('.question-wrap.active .options-wrap .change-answer-type').addClass('active');
                            }
                        }, 2000);
                    }, error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }else{
                this.quiz_id = this.$(event.currentTarget).attr('data-id'); 
                var quiz = new Quiz({id: this.quiz_id });
                quiz.destroy({
                    data: null,
                    processData: true,
                    success: function(){
                        root.$('li[quiz-id=' + root.quiz_id +']').remove();
                        root.actionSuccess();
                        
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }, error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }
        },

        displayEditedMatchOption: function(option_elem, item){
            if(item.text){
                if(this.$(option_elem).children('p').length > 0){
                    this.$(option_elem).children('p').html(item.text);
                }else{
                    this.$(option_elem).append('<p>' + item.text + '</p>')
                }
            }else{
                this.$(option_elem).children('p').remove();
            }
            if(item.image){
                if(this.$(option_elem).children('img').length > 0){
                    this.$(option_elem).children('img').attr('src', '/static/media/' + item.image)
                }else{
                    this.$(option_elem).append('<img src="/static/media/' + item.image + '"></img>')
                }
            }else{
                this.$(option_elem).children('img').remove();
            }
        },

        displayEditedOtherOptions: function(active_option, option_response, option_type, adding_block){
            if(option_response.description && option_type.includes('select')){
                this.$(active_option).children(adding_block).children('.description').html('');
                if(this.$(active_option).children(adding_block).children('.description').length > 0){
                    this.$(active_option).children(adding_block).children('.description').html(option_response.description);
                }else{
                    this.$(active_option).children(adding_block).prepend('<div class="description"></div>');
                    this.$(active_option).children(adding_block).children('.description').html(option_response.description);
                }
            }else{
                this.$(active_option).children(adding_block).children('.description').remove();
            }
            
            if(option_response.icon){
                this.$(active_option).children(adding_block).children('img').attr('src','');
                if(this.$(active_option).children(adding_block).children('img').length > 0){
                    this.$(active_option).children(adding_block).children('img').attr('src', option_response.icon.url);
                }else{
                    this.$(active_option).children(adding_block).append('<img></img>')
                    this.$(active_option).children(adding_block).children('img').attr('src', option_response.icon.url);
                }
            }else{
                this.$(active_option).children(adding_block).children('img').remove();
            }
        },

        editEntity: function(event){
            var root = this;
            var popupName = this.$(event.currentTarget).attr('data-popup');
            var current_event = event;
            var attrs = {};
            attrs[popupName]= true;
            var root = this;
            if(popupName == "question"){
                var question_id = this.$('.question-wrap.active').attr('question-id');
                var question = new QuizQuestion({'id': question_id});
                question.fetch({
                    success: function(model, response){
                        var titleLimit = root.QUESTION_TITLE_LIMIT - response.title.length,
                            descriptionLimit = root.QUESTION_DESCRIPTION_LIMIT - response.description.length;
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_question', true);
                        root.$('.popup-box [name=title]').val(response.title);
                        root.$('#question_title_counter').html(`${titleLimit} Characters Left`);
                        root.$('.popup-box [name=description]').val(response.description);
                        root.$('.popup-box [name=points]').val(response.points);
                        root.$('#question_desc_counter').html(`${descriptionLimit} Characters Left`);
                        if(response.resource && response.resource.url){
                            let previewImage = response.resource.url;
                            if(response.resource.type == "video") {
                                previewImage = `${document.cdn_url}${root.VIDEO_ICON}`;
                            } else if(response.resource.type == "audio") {
                                previewImage = `${document.cdn_url}${root.AUDIO_ICON}`;
                            }
                            root.$('.popup-box .img-preview').attr('src', previewImage);
                            root.$('.popup-box .file-name').text(response.resource.name);
                            root.$('.popup-box .block:last-child').addClass('image-added');
                        }
                    }
                })
            }else if(popupName.includes('select') || popupName == 'sortable'){
                var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
                var option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
                var option = new QuizOption({'id': option_id});
                option.fetch({
                    data: { 'option_type': option_type },
                    processData: true,
                    success: function(model, response){
                        var textLimit = root.ANSWER_TEXT_LIMIT - response.text.length;
                        var descriptionLimit = root.ANSWER_DESCRIPTION_LIMIT - response.description.length;
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_answer', true);
                        root.$('.popup-box [name=title]').val(response.text);
                        root.$('#answer_title_counter').html(`${textLimit} Characters Left`);
                        root.$('.popup-box [name=description]').val(response.description);
                        root.$('#answer_desc_counter').html(`${descriptionLimit} Characters left`);
                        if(response.icon && response.icon.url){
                            root.$('.popup-box .file-name').text(response.icon.name);
                            root.$('.popup-box .img-preview').attr('src', response.icon.url);
                            root.$('.popup-box .block:last-child').addClass('image-added');
                        }
                    }
                })
            }else if(["left", "right", "matching"].includes(popupName)){
                var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
                var option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
                var option = new QuizOption({'id': option_id});
                var attrs = {};
                attrs.add_item = true;
                var text_element = this.$(event.target).parents('.match-wrap').find('p').length;
                var image_element = this.$(event.target).parents('.match-wrap').find('img').length; 
                var option_type;
                if(text_element > 0 && image_element > 0){
                    attrs.option_text = true;
                    attrs.option_image = true; 
                } 
                if(text_element > 0){
                    attrs.option_text = true;
                }else if(image_element > 0){
                    attrs.option_image = true; 
                }
                var option_side = this.$(event.currentTarget).parents('.match-wrap').attr('class').split(' ')[1];
                attrs.option_type = 'matching_' + option_side;
                attrs.option_id = option_id; 
                option.fetch({
                    data: { 'option_type': option_type },
                    processData: true,
                    success: function(model, response){
                        root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                        root.$('.popup-overlay').addClass('active');
                        root.overlayCalc();
                        var option = response.item_right;
                        if(option_side == 'left'){
                            option = response.item_left;
                        }
                        root.$('.popup-box').attr('edit_answer', true);
                        root.$('.popup-box [name=description]').val(option.text);
                        if(option.text){
                            let descriptionLimit = root.MATCHING_ANSWER_TEXT_LIMIT - option.text.length;
                            root.$('#item_desc_counter').html(`${descriptionLimit} Characters Left`);
                        }
                        if (option.image){
                            root.$('.popup-box .img-preview').attr('src', option.image);
                            root.$('.popup-box .block:last-child').addClass('image-added');
                        }
                    }
                })             
            }else{
                var quiz_id = this.$(event.currentTarget).parents('li').attr('quiz-id');
                var quiz = new Quiz({'id': quiz_id});
                quiz.fetch({
                    processData: true,
                    success: function(model, response){
                        var titleLimit = root.QUIZ_TITLE_LIMIT - response.name.length,
                            descriptionLimit = root.QUIZ_DESCRIPTION_LIMIT - response.description.length;
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_quiz', true);
                        root.$('.popup-box [name=title]').val(response.name);
                        root.$('#quiz_title_counter').html(`${titleLimit} Characters Left`);
                        root.$('.popup-box [name=description]').val(response.description);
                        root.$('#quiz_desc_counter').html(`${descriptionLimit} Characters Left`);
                        root.$('.option-check').removeClass('active');
                        
                        if(response.is_sequential_questions){
                            root.$('#sequential .option-check:contains("sequential")').addClass('active');
                        }else{
                            root.$('#sequential .option-check:contains("random")').addClass('active');
                        }
                        
                        if(response.can_skip){
                            root.$('#skip .option-check:contains("yes")').addClass('active');
                        }else{
                            root.$('#skip .option-check:contains("no")').addClass('active');
                        }

                        if(response.time_limit > 0){
                            root.$('#nolimit').removeAttr('checked').parents('.radio-block').addClass('disabled');
                            root.$('#time').prop('checked', true).parents('.radio-block').removeClass('disabled');
                            root.$('.radio-block input[name="minutes"]').attr('disabled', false).val(response.time_limit);
                        }

                        if (response.due_date){
                            var date_data = response.due_date.split(' ')[0].split('-');
                            var due_date = date_data[2] + '/' + date_data[1] + '/' + date_data[0];
                            root.$('#due_date').val(due_date);
                        }
                        
                        if(response.is_unlimited == true){
                            root.$('#noreattemp').removeAttr('checked').parent().addClass('disabled');
                            root.$('#unlimited').prop('checked', true).parent().removeClass('disabled');
                            root.$('#times').removeAttr('checked').parent().addClass('disabled');
                            root.$('.radio-block input[name="attempts_value"]').attr('disabled', true);
                        }
                        else if(response.re_attempts_count > 0){
                                root.$('#noreattemp').removeAttr('checked').parent().addClass('disabled');
                                root.$('#unlimited').removeAttr('checked').parent().addClass('disabled');
                                root.$('#times').prop('checked', true).parent().removeClass('disabled');
                                root.$('.radio-block input[name="attempts_value"]').attr('disabled', false);
                                root.$('.radio-block input[name="attempts_value"]').val(response.re_attempts_count);
                            }
                        else{
                                root.$('#times').removeAttr('checked').parent().addClass('disabled');
                                root.$('.radio-block input[name="attempts_value"]').attr('disabled', true);
                                root.$('#unlimited').removeAttr('checked').parent().addClass('disabled');
                                root.$('#noreattemp').prop('checked', true).parent().removeClass('disabled');
                            }

                        if(response.grading_style == 'pass_or_fail'){
                            root.$('#r_points').removeAttr('checked').parents('.radio-block').addClass('disabled');
                            root.$('#pass').prop('checked', true).parents('.radio-block').removeClass('disabled');
                            root.$('.radio-block input[name="pass_marks"]').attr('disabled', false).val(response.grading_points);
                        }

                        if(response.icon && response.icon.url){
                            root.$('.popup-box .file-name').text(response.icon.name);
                            root.$('.popup-box .img-preview').attr('src', response.icon.url);
                            root.$('.popup-box .block:nth-last-child(2)').addClass('image-added');
                        }

                        root.$('.popup-box [name=certification]').val(response.certification);
                        var certificationLimit = root.QUIZ_CERTIFICATION_LIMIT - response.certification.length;
                        root.$('#quiz_cert_counter').html(`${certificationLimit} Characters Left`);
                    }
                })
            }
        },

        duplicateEntity: function(event){
            let quizSlug = this.$(event.currentTarget).parents('li').attr('quiz-id');
            $('.grey_layout_bg').addClass('active').append($('<span>',{id:'loading_icon'}));
            let quiz = new Quiz({'id': quizSlug, 'copy': true});
            quiz.save(null,{ 
                patch: true,
                success(response){
                    setTimeout(() => {
                        Backbone.history.loadUrl(Backbone.history.fragment);
                    }, 2000);

                },
                complete(){
                    $('.grey_layout_bg').removeClass('active').empty();
                }
            })
        },

        hidePopup: function(popupName){
            this.$('.popup-overlay').removeClass('active');
            this.$('.popup-wrap').html("");
        },

        initSortable: function(event) {
            var root = this;
            this.$(".sortable-wrap").sortable({
                handle: ".quiz-drag",
                containment: "parent",
                update: function(event, ui){
                    var option_id = ui.item.attr('option-id');
                    var options_order = {}; 
                    root.$('.question-wrap.active .options-wrap .option-item').each(function(index){
                        var option_id = 'option_' + $(this).attr('option-id');
                        var index = parseInt(index + 1);
                        options_order[option_id] = index;
                    });

                    var option_data = { 
                        'id' : option_id,
                        'option_type' : 'sortable',
                        'options_order' : options_order,
                        'reorder' : true
                    };

                    var quizOption = new QuizOption(option_data);
                    
                    quizOption.save(null, { patch: true});                   
                }
            });            
        },

        navigationOptions: function(active_elem_id, option_type){
            var alert = true;
            var normal_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item');
            var selected_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item.selected');
            var active_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item.active');
            var sortable_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .sortable-wrap .option-item');
            if(option_type.includes('select') && (selected_options.length == 0 ||  normal_options.length < 2)){
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
                if(this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
                }
                alert = false;
            }else if(option_type.includes('matching') && (active_options.length > 0 || normal_options.length < 2)){
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
                if(this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
                }
                alert = false;
            }else if(option_type == 'sortable' && sortable_options.length < 2 ){
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
                this.$('.question-wrap#' + active_elem_id + ' .add-block.new').hide();
                if(this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
                }
                alert = false;
            }else if(option_type){
                var elem_id = this.$('.question-wrap#' + active_elem_id + '').attr('id');
                var index = elem_id.split('_')[2];
                var next_index = parseInt(elem_id.split('_')[2]) + 1;
                var prev_index = parseInt(elem_id.split('_')[2]) - 1;
                elem_id = elem_id.replace(index, next_index);
                if(!prev_index){
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').hide();
                }
                if(this.$('#' + elem_id).length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').removeClass('disabled').show();
                }else{
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
                    this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
                }
                elem_id = elem_id.replace(next_index, prev_index);
                if(this.$('#' + elem_id).length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').removeClass('disabled').show();
                }
            }else{
                if (this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0){
                    this.$('.question-wrap#' + active_elem_id + ' .add-block.new').addClass('disabled').show();
                    this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
                }
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
                this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
                alert = false;
            }
            return alert;
        },

        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        previewImage: function(event){
            this.removeErrorMessages();
            var resource = event.target.files[0];
            if (!resource || !(/\.(gif|jpg|jpeg|tiff|png|mp4|webm|ogg|mp3|wav)$/i).test(resource.name)) {
                return false;
            }
            if(this.ALLOWED_VIDEO_TYPE.indexOf(resource.type) >= 0){
                let filesizeMB = resource.size/1000000;
                if (filesizeMB > Common.VIDEO_FILE_MAX_SIZE){
                    var message = "Your video cannot be uploaded because it's too large.Allowed limit :" +Common.VIDEO_FILE_MAX_SIZE+ "MB."
                    this.$(event.currentTarget).parents('.block').find('.error-message').text(message);
                    return false;
                }
            this.$('.img-preview').attr('src', '/static/images/author/thumb-video.jpg').removeAttr('data-remove');
            }else if(this.ALLOWED_AUDIO_TYPE.indexOf(resource.type) >= 0){
                this.$('.img-preview').attr('src', '/static/images/thumb-audio.png').removeAttr('data-remove');
            }else{
            this.$('.img-preview').attr('src', URL.createObjectURL(resource)).removeAttr('data-remove');
            }
            this.$(event.currentTarget).parents('.block').find('.error-message').text("");
            this.$(event.currentTarget).parents('.block').find('.file-name').text(resource.name);
            this.$(event.currentTarget).parents('.block').addClass('image-added');
        },

        publishQuiz: function(event){
            var root = this;
            var can_publish_data = this.canPublish();
            if (!can_publish_data.can_publish) {
                this.hidePopup();
                var attrs = {};
                attrs.alert = true;
                attrs.alert_message =  can_publish_data.error_message;
                this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                this.$('.popup-overlay').addClass('active');
                this.overlayCalc();
                return;
            }
            this.actionInProgress();
            var quiz_data = {
                'id' : document.slugId,
                'publish' : true
            }
            this.quiz = new Quiz(quiz_data);
            setTimeout(function(){
                root.quiz.save(null, {
                    patch: true,
                    success: function(response, xhr, status){
                        root.actionSuccess();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }, error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }, 1000);
        },

        removeErrorMessages: function(){
            this.$('.edit-tool-tip').remove();
            this.$('input').removeClass('error');
            this.$('textarea').removeClass('error');
        },

        removeImage: function(event){
            this.$(event.currentTarget).parents('.block').removeClass('image-added');
            this.$('.img-preview').removeAttr('src').removeAttr('style').attr('data-remove', true);
            this.$('.upload-file').val('');
        },

        saveAnswer: function(answer_data, option_type){
            if(option_type.includes('select')){
                this.$('.question-wrap.active .choose-answer').text(Translate("check the correct answer")).removeClass('error')
            }
            else{
                this.$('.question-wrap.active .choose-answer').text(" ").removeClass('error')
            }
            var root = this;
            this.quizOption = new QuizOption();
            setTimeout(function(){
                root.quizOption.save(
                    null, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: answer_data,
                        success: function(response){
                            var option_response = response.attributes;
                            root.actionSuccess();
                            root.addOptionBlock(option_response, option_type);
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }, error: function(response){
                            root.actionFailed();
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }
                    }
                )
            }, 1000);
        },

        saveEditedAnswer: function(option_id, options_data, option_type){
            var root = this;
            this.quizOption = new QuizOption({'id' : option_id});
            setTimeout(function(){
                root.quizOption.save(
                    null, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: options_data,
                        success: function(response){
                            root.actionSuccess();
                            var option_response = response.attributes;
                            var active_option = root.$('.option-item[option-id="' + option_id + '"]');
                            root.$(active_option).children('.info-block').removeAttr('style');
                            root.$(active_option).removeClass('open');
                            if (option_type.includes('select')){
                                root.$(active_option).children('.title').html(option_response.text);
                                if(!option_response.description) {
                                    root.$(active_option).children('.info-block').empty();
                                }
                                if(!option_response.description && !option_response.icon){
                                    root.$(active_option).children('.arrow').hide();
                                }else{
                                    if (root.$(active_option).children('.arrow').length == 0){
                                        root.$(active_option).children('.info-block').before('<div class="arrow"></div>')
                                    }
                                    root.$(active_option).children('.arrow').show();
                                    root.displayEditedOtherOptions(active_option, option_response, option_type, '.info-block')
                                }
                            }else if(option_type == 'sortable'){
                                root.$(active_option).children('.order-info').children('h2').html(option_response.text);
                                root.displayEditedOtherOptions(active_option, option_response, option_type, '.order-info')
                            }else{
                                var option_side = option_type.split('_')[1];
                                
                                if(option_side == 'left'){
                                    var left_option = root.$(active_option).children('.match-wrap.left').children('.match-block');
                                    root.displayEditedMatchOption(left_option, option_response.item_left);
                                }else{
                                    var right_option = root.$(active_option).children('.match-wrap.right').children('.match-block');
                                    root.displayEditedMatchOption(right_option, option_response.item_right);
                                }
                            }
                            
                            var elem_id = root.$('.question-wrap.active').attr('id');
                            root.navigationOptions(elem_id, option_type);
                            
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }, error: function(response){
                            root.actionFailed();
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }
                    }
                )
            }, 1000);
        },

        saveEditedQuestion: function(question_id, question_data){
            var root = this;
            this.quizQuestion = new QuizQuestion({'id' : question_id});
            setTimeout(function(){
                root.quizQuestion.save(
                    null, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: question_data,
                        success: function(response){
                            root.actionSuccess();
                            var question_response = response.attributes;
                            if(question_response.resource
                               && _.indexOf(["audio", "video"], question_response.resource.type) != -1) {
                                let thumbnail = root.AUDIO_ICON;
                                if(question_response.resource.type == "video") {
                                    thumbnail = root.VIDEO_ICON;
                                }
                                question_response.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
                            }
                            question_response['update_question'] = true;
                            question_response['index'] = parseInt(root.$('.question-wrap.active').attr('id').split('_')[2])
                            var active_question = root.$('.question-wrap.active .question');
                            root.$(active_question).html(AddBlockTemplate(question_response));
                            var attrs = {};
                            attrs.edit_quiz = true;
                            attrs.edit_question = true;
                            root.$(active_question).append(EditTemplate(attrs));
                            var total_points = parseInt(root.$('.total-points').text()) + question_response.points - parseInt(root.$('.question-points').text())
                            root.$('.quiz-main-wrap .left-pannel .question-points').html(question_response.points);
                            root.$('.quiz-main-wrap .left-pannel .total-points').html(total_points);
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }, error: function(response){
                            root.actionFailed();
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }
                    }
                )
            }, 1000);
        },

        saveQuestion: function(question_data){
            var root = this;
            this.$('.question-wrap.active .navigation-wrap .next').removeClass('disabled');
            this.quizQuestion = new QuizQuestion();
            setTimeout(function(){
                root.quizQuestion.save(
                    null, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: question_data,
                        success: function(response){
                            root.actionSuccess();
                            var question_response = response.attributes;
                            if(question_response.resource
                               && _.indexOf(["audio", "video"], question_response.resource.type) != -1) {
                                let thumbnail = root.AUDIO_ICON;
                                if(question_response.resource.type == "video") {
                                    thumbnail = root.VIDEO_ICON;
                                }
                                question_response.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
                            }
                            question_response['index'] = root.$(".question-wrap:last").length > 0 ? parseInt($(".question-wrap:last").attr('id').split('_')[2]) + 1 : 1;
                            question_response['block_type'] = "question";
                            
                            root.$('.add-block[data-popup="question"]').remove();
                            root.$('.quiz-wrap').append(AddBlockTemplate(question_response));
                            question_response['block_type'] = "";
                            question_response['update_question'] = true;
                            root.$('.question-wrap.active .question').html(AddBlockTemplate(question_response));
                            
                            var question_response_id = question_response.question_id;
                            root.$('.question-wrap[question-id="' + question_response_id + '"]').addClass('active');
                            
                            var active_elem = root.$('.question-wrap.active .question');
                            root.addEditOptions('question', active_elem);
                            root.addNewBlock(question_response);

                            root.$('.question-wrap .add-block.new').remove();
                            
                            var attrs = {};
                            attrs['add_next_question'] = true;
                            root.$('.question-wrap.active').append(EditTemplate(attrs));
                            
                            question_response['pagination'] = true;
                            question_response['first_question'] = false;
                            if(question_response['index'] == 1){
                                question_response['first_question'] = true;
                                root.$(".quiz-main-wrap .quiz-pagination-wrap").append(EditTemplate(question_response));
                            }else{
                                root.$(".quiz-main-wrap .pagination").append(EditTemplate(question_response));
                            }
                            
                            var total_points = parseInt(root.$('.quiz-main-wrap .left-pannel .total-points').html())+ question_response.points
                            root.$('.quiz-main-wrap .left-pannel .question-points').html(question_response.points);
                            root.$('.quiz-main-wrap .left-pannel .total-points').html(total_points);
                            var elem_id = root.$('.question-wrap.active').attr('id');
                            root.navigationOptions(elem_id, question_response.option_type);
                            
                            root.$('.question-wrap[question-id="' + question_response_id + '"] .navigation-wrap .next').addClass('disabled');
                            root.$('.publish-quiz').addClass('disabled');
                            
                            var elem_id = root.$('.question-wrap.active').attr('id');
                            var index = elem_id.split('_')[2];
                            var prev_index = parseInt(elem_id.split('_')[2]) - 1;
                            elem_id = elem_id.replace(index, prev_index);
                            if(root.$('#' + elem_id).length > 0){
                                var prev_question_option_type = root.$('.question-wrap#' + elem_id + ' .options-wrap').attr('data-option-type');
                                root.navigationOptions(elem_id, prev_question_option_type);
                                root.$('.question-wrap.active .navigation-wrap .prev').show();
                            }

                            root.$('.previous_button').remove();

                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }, error: function(response){
                            root.actionFailed();
                            setTimeout(function(){
                                root.hidePopup();
                            }, 2000);
                        }
                    }
                )
            }, 1000);
        },

        saveQuiz: function(data, quizId){
            var root = this;
            this.quiz = new Quiz({'id': quizId || null});            
            this.quiz.save(
                null, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: data,
                    success: function(response){
                        root.actionSuccess();
                        setTimeout(() => {
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }, 2000);
                    }, error: function(response){
                        root.actionFailed();
                        setTimeout(() => {
                            root.hidePopup();
                        }, 2000);
                    }
                }
            )
        },

        selectChecklist: function(event){
            var root = this;
            setTimeout(function(){
                this.option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
                var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
                var option_data = { 
                    'id' : option_id,
                    'is_correct_option' : this.$(event.currentTarget).parents('.option-item').hasClass('selected') ? true : false,
                    'option_type' : this.option_type,
                    'correct_option' : true
                };
                if(option_data['is_correct_option']){
                   this.$('.question-wrap.active .choose-answer').removeClass('error')
                }
                var quizOption = new QuizOption(option_data);

                quizOption.save(null, {
                    patch: true,
                    success: function(response, xhr, status){
                        setTimeout(function(){
                            var elem_id = root.$('.question-wrap.active').attr('id');
                            root.navigationOptions(elem_id, option_data['option_type']);
                        }, 500);
                    }
                })
            }, 500);
        },

        showAlert: function(){
            var elem_id = this.$('.question-wrap.active').attr('id');
            var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
            if(!this.navigationOptions(elem_id, option_type)){
                this.validateQuizQuestion()
            }
        },

        showPopupAttrs: function(event){
            var target_class = this.$(event.currentTarget).attr('class').split(' ').reverse()[0];
            if (target_class != 'edit' && target_class != 'publish-quiz'){
                if (!Common.isDefaultLocale(this)){
                this.overlayCalc();
                return;
            }
            }
            var attrs = {};
            attrs['is_graded']= this.is_graded;
            var edit_answer = this.$('.popup-box').attr('edit_answer');
           
            var popupName = this.$(event.currentTarget).attr('data-popup'); 
            var popupType = this.$(event.currentTarget).attr('data-type');
            var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
            
            if (option_type && popupName == 'question' && target_class =='new'){
                if(!this.validateQuizQuestion())
                    return false;
            }
            
            if (popupType && (popupType.includes('matching') || popupType == 'sortable' || popupType == 'item_style')){
                var option_type = this.$(event.currentTarget).attr('data-item-type');
                if (option_type == "text_image"){
                    var types = option_type.split('_');
                    attrs['option_' + types[0]] = true;
                    attrs['option_' + types[1]] = true;
                }else if(option_type == "text" || option_type == "image"){
                    attrs['option_' + option_type] = true;
                }
            } 
            attrs[popupName] = true;
            attrs['option_type'] = popupType;
            
            var quiz_id = this.$(event.currentTarget).parents('li').attr('quiz-id');
            if(quiz_id !== undefined){
                attrs['quiz_id'] = quiz_id;
            }else if(edit_answer != undefined){
                 attrs['quiz_id'] = this.$('.popup-box .content-block .block').attr('data-id');
            }

            var question_id = this.$(event.currentTarget).parents('.question-wrap').attr('question-id');
            if(question_id == undefined){
                attrs['question_id'] = this.$('.question-wrap.active').attr('question-id');
            }else{
                attrs['question_id'] = question_id;
            }

            var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
            if(option_id !== undefined){
                attrs['option_id'] = option_id;
            }else if(edit_answer != undefined){
                 attrs['option_id'] = this.$('.popup-box .content-block .block').attr('data-id');
            }
            
            if(target_class == 'edit'){
                attrs.is_edit = true;
            }else{
                attrs.is_edit = false;
            }

            if(target_class == 'new'){
                this.addNewQuestionBlock();
            }else{
                if(target_class=='publish-quiz' && attrs['question_id']){
                   if(!this.validateQuizQuestion())
                        return false
                }
                this.showPopup(attrs);
                if (attrs.quiz) {
                    this.$("#due_date").datepicker({ 
                        language: 'en',
                        autoClose: true,
                        minDate: new Date(),
                        dateFormat: "dd/mm/yyyy",
                    });
                };
            }
        },

        validateQuizQuestion: function(){
            var selected_options = this.$('.question-wrap.active .options-wrap .option-item.selected');
            var normal_options = this.$('.question-wrap.active .options-wrap .option-item');
            var match_options = this.$('.question-wrap.active .options-wrap .option-item.active');
            var target_elem = this.$('.question-wrap.active .choose-answer');
            var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type'); 
                if(normal_options.length < 2 || match_options.length > 0){
                    target_elem.text(Translate("add minimum two answers")).addClass('error');    
                    return false;
                }else if (selected_options.length == 0 && option_type.includes('select')){
                    target_elem.text(Translate("check the correct answer")).addClass('error');
                    return false;
                }
            return true
        },

        showPopup: function(attrs){
            this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            this.$('.popup-overlay').addClass('active');
            this.overlayCalc();
        },
        
        showAdvanced: function(event){
            this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
            setTimeout(function(){
                this.$('.popup-box .content-block').animate({scrollTop :750},'slow');
            }, 100);
        },

        submitAnswer: function(event){
            var answer_title = this.$('input[name="title"]');
            var answer_description = this.$('textarea[name="description"]').val();
            var option_type = this.$(event.currentTarget).attr('data-type');
            var question_id = this.$('.question-wrap.active').attr('question-id');
            var icon_file = this.$('.popup-box :file').val() ? this.$('.popup-box :file')[0].files[0] : null;
            var remove_icon = this.$('.img-preview').attr('data-remove');
            
            var error_flag = false;

            if (!answer_title.val()) {
                this.customErrorMessage('Provide a title for the answer', this.$(answer_title).parent(), this.$(answer_title));
                error_flag = true;
            }

            if (error_flag) return false;

            this.removeErrorMessages();

            var answer_data = new FormData();
            answer_data.append('title', answer_title.val());
            answer_data.append('description', answer_description);
            answer_data.append('option_type', option_type);
            answer_data.append('question_id', question_id);
            answer_data.append('icon',icon_file);
            answer_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
            if(remove_icon){
                answer_data.append('remove_icon', remove_icon);
            }

            this.actionInProgress();

            var edit_answer = this.$('.popup-box').attr('edit_answer');
            if(edit_answer){
                var option_id = this.$(event.currentTarget).attr('data-id');
                this.saveEditedAnswer(option_id, answer_data, option_type);
            }else{
                this.saveAnswer(answer_data, option_type);
            }
            
        },

        submitAnswerItem: function(event){
            var answer_description = this.$('textarea[name="description"]');
            var option_type = this.$(event.currentTarget).attr('data-type');
            var question_id = this.$('.question-wrap.active').attr('question-id');
            var option_id = this.$('.question-wrap.active .options-wrap .option-item.active').length > 0 ? this.$('.question-wrap.active .options-wrap .option-item.active').attr('option-id') : null;
            var icon = this.$('input[name="upload-file"]');
            var edit_answer = this.$('.popup-box').attr('edit_answer') == undefined ? false : this.$('.popup-box').attr('edit_answer');
            var img_preview = this.$('.img-preview').attr('src');
            
            var item_type = this.$('.popup-box .content-block').attr('data-type');

            var error_flag = false;
            if ( (item_type == 'text' || item_type == 'text_image') && !answer_description.val()) {
                this.customErrorMessage('Briefly describe your option', this.$(answer_description).parent(), this.$(answer_description));
                error_flag = true;
            } else if ((item_type == 'image' || item_type == 'text_image') && ((edit_answer == false && !icon.val()) || (edit_answer == "true" && img_preview == undefined))) {
                this.customErrorMessage('Please Provide a Image', this.$(icon).parent(), this.$(icon));
                error_flag = true;
            }

            if (error_flag) return false;

            this.removeErrorMessages();

            var icon_file = this.$('input[name="upload-file"]').val() ? this.$('.popup-box :file')[0].files[0] : null;

            var answer_data = new FormData();
            if(answer_description.val()){
                answer_data.append('description', answer_description.val());
            }
            answer_data.append('option_type', option_type);
            answer_data.append('question_id',question_id);
            answer_data.append('option_id', option_id);
            answer_data.append('icon', icon_file);
            answer_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

            this.actionInProgress();

            if(edit_answer){
                var remove_icon = this.$('.img-preview').attr('data-remove');
                var option_id = this.$(event.currentTarget).attr('data-id');
                if(remove_icon){
                    answer_data.append('remove_icon', remove_icon);
                }
                this.saveEditedAnswer(option_id, answer_data, option_type);
            }else{
                this.saveAnswer(answer_data, option_type);
            }
        },

        submitQuestion: function(event){
            var question_id;
            var active_question = this.$('.question-wrap.active');
            if(active_question.length > 0){
                question_id = this.$('.question-wrap.active').attr('question-id');
            } 
            var question_title = this.$('input[name="title"]');
            var question_description = this.$('textarea[name="description"]');
            var question_points = this.$('input[name="points"]').val();
            var question_points_elem = this.$('input[name="points"]');
            var quiz_slug = document.slugId;
            var resource_file = this.$('.popup-box :file')[0].files[0];
            if (resource_file){
                var resource_type = resource_file.type
                if (this.ALLOWED_VIDEO_TYPE.indexOf(resource_type) >= 0){
                    resource_type = 'video'
                }else if(this.ALLOWED_AUDIO_TYPE.indexOf(resource_type) >= 0){
                    resource_type = 'audio'
                }else if (this.ALLOWED_IMAGE_TYPE.indexOf(resource_type) >= 0){
                    resource_type = 'image'
                }
            }
            var error_flag = false;
            if (!question_title.val()) {
                this.customErrorMessage('Provide a title for the question', this.$(question_title).parent(), this.$(question_title));
                error_flag = true;
            } else if (question_points_elem.length > 0 && !question_points) {
                this.customErrorMessage('Provide the points for the Question', this.$(question_points_elem).parent(), this.$(question_points_elem));
                error_flag = true;
            } else if (question_points_elem.length > 0 && question_points.match(/^\d+$/) == null) {
                this.customErrorMessage('Points Value must be integer', this.$(question_points_elem).parent(), this.$(question_points_elem));
                error_flag = true;
            };

            if (error_flag) return false;

            this.removeErrorMessages();

            var question_data = new FormData();
            question_data.append('title', question_title.val());
            question_data.append('description', question_description.val());
            if(question_points != undefined){
                question_data.append('points', question_points);
            }
            question_data.append('quiz_id', quiz_slug);
            question_data.append('resource', resource_file);
            question_data.append('resource_type', resource_type);
            question_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

            this.actionInProgress();
            var edit_question = this.$('.popup-box').attr('edit_question');
            if(edit_question){
                var remove_resource = this.$('.img-preview').attr('data-remove');
                if(remove_resource){
                    question_data.append('remove_resource', remove_resource);
                }
                this.saveEditedQuestion(question_id, question_data);
            }else{
                this.saveQuestion(question_data);
            }
        },

        submitQuiz: function(event){ 
            var title = this.$('input[name="title"]');
            var description = this.$('textarea[name="description"]');
            var certification = this.$('textarea[name="certification"]');
            var date = this.$('input[name="due_date"]');
            
            var time_limit =  this.$('.radio-block:not(.disabled) input[name="time"]');
            var time_limit_val_elem =  this.$('.radio-block:not(.disabled) input[name="minutes"]');
            
            var re_attempt =  this.$('.radio-block:not(.disabled) input[name="attempts"]');
            var re_attempt_val_elem =  this.$('.radio-block:not(.disabled) input[name="attempts_value"]');
            
            var grading_points =  this.$('.radio-block:not(.disabled) input[name="result"]');
            var grading_points_val_elem =  this.$('.radio-block:not(.disabled) input[name="pass_marks"]');
            
            var icon_file = this.$('.popup-box :file')[0].files[0];
            
            var error_flag = false;
            if (!title.val()) {
                this.customErrorMessage('Provide a title for the quiz', this.$(title).parent(), this.$(title));
                error_flag = true;
            } else if (time_limit.val() == 'time' && !time_limit_val_elem.val() ) {
                this.customErrorMessage('Provide the time limit for the quiz', this.$(time_limit).parent(), this.$(time_limit));
                error_flag = true;
            } else if (time_limit.val() == 'time' && time_limit_val_elem.val().match(/^\d+$/) == null) {
                this.customErrorMessage('Time limit Value must be integer', this.$(time_limit).parent(), this.$(time_limit));
                error_flag = true;
            } else if (re_attempt.val() == 'attempts' && !re_attempt_val_elem.val() ) {
                this.customErrorMessage('Provide the number of attempts for the quiz', this.$(re_attempt).parent(), this.$(re_attempt));
                error_flag = true;
            } else if (re_attempt.val() == 'attempts' && re_attempt_val_elem.val().match(/^\d+$/) == null) {
                this.customErrorMessage('Attempts Value must be integer', this.$(re_attempt).parent(), this.$(re_attempt));
                error_flag = true;
            } else if (grading_points.val() == 'pass_marks' && !grading_points_val_elem.val() ) {
                this.customErrorMessage('Provide the passing marks for the quiz', this.$(grading_points).parent(), this.$(grading_points));
                error_flag = true;
            } else if (grading_points.val() == 'pass_marks' && grading_points_val_elem.val().match(/^\d+$/) == null) {
                this.customErrorMessage('Marks Value must be integer', this.$(grading_points).parent(), this.$(grading_points));
                error_flag = true;
            } else if (!certification.val()) {
                this.customErrorMessage('Briefly describe certification for your quiz', this.$(certification).parent(), this.$(certification));
                error_flag = true;
            };

            if (error_flag) return false;

            this.removeErrorMessages();

            var quiz_data = new FormData();
            quiz_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
            quiz_data.append('name', title.val());
            quiz_data.append('description', description.val());
            quiz_data.append('certification', certification.val());
            if(this.$('#sequential .option-check.active').html() == 'sequential'){
                quiz_data.append('is_sequential', true);
            }
            if(this.$('#skip .option-check.active').html() == 'yes'){
                quiz_data.append('can_skip', true);
            }
            quiz_data.append('due_date', date.val());
            if(time_limit.val() == 'time'){
                quiz_data.append('time_limit', time_limit_val_elem.val());
            }else{
                quiz_data.append('time_limit', 0);
            }

            if(re_attempt.val() == 'attempts'){
                quiz_data.append('re_attempts_count', re_attempt_val_elem.val());
            }else if(re_attempt.val() == 'noreattempts'){
                quiz_data.append('re_attempts_count', 0);
            }

            if(grading_points.val() == 'points'){
                quiz_data.append('grading_style', 'points');
            }else{
                quiz_data.append('grading_style', 'pass_or_fail');
            }

            if(grading_points.val() == 'pass_marks'){
                quiz_data.append('grading_points', grading_points_val_elem.val());
            }else{
                quiz_data.append('grading_points', 0);
            }

            if(icon_file){
                quiz_data.append('icon',icon_file);
            }

            this.actionInProgress();

            var quizId = this.$(event.currentTarget).attr('data-id'),
                removeIcon = this.$('.img-preview').attr('data-remove');
            if(removeIcon){
                quiz_data.append('remove_icon', removeIcon);
            }
            this.saveQuiz(quiz_data, quizId);
        },

        switchOption: function(event){
            this.$(event.currentTarget).parent().find('.option-check').removeClass('active');
            this.$(event.currentTarget).addClass('active');
        },

        switchRadio: function(event){
            this.$(event.currentTarget).parents('.block').find('.radio-block').addClass('disabled');
            this.$(event.currentTarget).parents('.radio-block').removeClass('disabled');            
            this.$(event.currentTarget).parents('.block').find('.radio-block.disabled').find('input[type="text"]').attr('disabled', true);
            this.$(event.currentTarget).parents('.block').find('.radio-block').find('input[type="text"]').val('');
            this.$(event.currentTarget).parents('.block').find('.radio-block:not(.disabled)').find('input[type="text"]').attr('disabled', false);
        },
    });

    return EditView;
});
