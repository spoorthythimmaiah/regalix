    /*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',  
        '../models/quiz',  
        '../models/quiz_question_activity',
        '../models/quiz_activity',
        '../templates/quiz_start.handlebars',
        '../templates/quiz.handlebars',
        '../templates/questions.handlebars',
        '../templates/popup.handlebars',
], function (_, $, Backbone, Common, Quiz, QuizQuestionActivity, QuizActivity, QuizStartTemplate, QuizTemplate, QuestionsTemplate, PopupTemplate) {
    'use strict';

    var MainView = Backbone.View.extend({

        el: '#main_container',

        AUDIO_ICON: "/static/images/thumb-audio.png",
        VIDEO_ICON: "/static/images/video-thumb.jpg",

        events: {
            'click .quiz-start': 'startQuiz',
            'click .checklist-item .arrow' : 'toggleChecklistText',
            'click .quiz-nav.prev:not(.disabled)': 'goToPrevQuestion',
            'click .quiz-nav.next:not(.disabled), .quiz-nav.skip:not(.disabled)': 'goToNextQuestion',
            'click .pagination .circle' : 'jumpToQuestion',
            'click .checklist-item .check, .checklist-item .title': 'selectAnswer',
            'click .match-wrap:not(.disabled) .match-block:not(.match-disabled)': 'matchAnswer',
            'keyup .order-input input': 'sortAnswer',
            'click .get-results:not(.disabled)': 'quizResults',
            'click .retry': 'goHome',
            'click .go-home': 'goHome',
            'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
            'click .audio-control': 'playAudio',
            'click .audio-backward': 'backwardAudio',
            'click .audio-farward': 'forwardAudio',
            'click .audio-timeline': 'seekAudio',
            'click .audio-mute': 'muteAudio',
            'click .question-icon[media-type=image]': 'zoomImage',
            'click .zoom_close': 'closeZoomImage'
        },

        initialize: function(slugId) {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});

            document.slugId = slugId;
            this.quiz = new Quiz({id: slugId})
            this.listenTo(this.quiz, 'sync', this.render)
            this.quiz.fetch({reset: true})
            this.clearLocalStorage();
        },

        render: function(){
            if(document.isAuthor){
                this.renderQuestions();
            }else{
                var status = this.quiz.changed.status;
                if(status == undefined){
                    this.$('#block_container').html(QuizStartTemplate({'quiz' : this.quiz.changed}));
                }else{
                    var attrs = {};
                    attrs['alert'] = true;
                    if(status == 'attempts'){
                        attrs['alert_message'] = 'YOUR RE-ATTEMPTS ARE OVER';
                    }else{
                        attrs['alert_message'] = 'YOUR DUE DATE IS COMPLETED';
                    }
                    attrs['alert_action'] = 'go-home'; 
                    this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                    this.$('.popup-overlay').addClass('active');
                    this.overlayCalc();
                }
            }
        },

        renderQuestions: function(){
            var questions = this.quiz.changed.questions;
            if(this.quiz.changed.grading_style == 'pass_or_fail'){
                this.is_graded = true
            }
            var root = this;
            _.each(questions, function(question){
                if(question.resource){
                    if(["audio", "video"].includes(question.resource.type)) {
                        let thumbnail = root.AUDIO_ICON;
                        if(question.resource.type == "video") {
                            thumbnail = root.VIDEO_ICON;
                        }
                        question.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
                    }
                }
            });
            var is_edit = document.isAuthor;
            this.can_skip = this.quiz.changed.can_skip;
            this.$('#block_container').html(QuestionsTemplate({
                is_graded: this.is_graded,
                questions: questions,
                is_edit : is_edit, 
                can_skip : this.can_skip
            }));
            
            this.$('.question-wrap:nth-child(1)').addClass('active');
            var points = this.$('.question-wrap.active').attr('data-points');
            this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
            this.$('.quiz-main-wrap .left-pannel .total-points').html(this.quiz.changed.total_points);
            this.$('.quiz-main-wrap .left-pannel .min-points').html(this.quiz.changed.grading_points);
            this.$('.pagination span:first').addClass('active');
            Backbone.trigger("quiz_rendered", this);
            if(!document.isAuthor){
                var results_btn_text;
                var results_btn_class; 
                if(this.can_skip){
                    results_btn_text = 'SKIP & GET RESULTS';
                    results_btn_class = '';
                }else{
                    results_btn_text = 'SUBMIT & GET RESULTS';
                    results_btn_class = 'disabled'; 
                }
                this.$('.question-wrap:last .navigation-wrap .next').remove();
                this.$('.question-wrap:last .navigation-wrap').append('<div class="quiz-nav get-results ' + results_btn_class + '"> ' + results_btn_text +'</div>');
                this.$('.question-wrap:last .navigation-wrap .skip').hide();
                if(this.quiz.changed.time_limit > 0){
                    var timeleft = this.quiz.changed.time_limit + ':00';
                    this.$('.time').html(timeleft);
                    this.countDownTimer();
                }else{
                    this.$('.quiz-timer').hide();
                }
            }
        },

        clearLocalStorage: function(event){
            $.each(localStorage, function (key, item) {
                if(key != 'algoliasearch-client-js'){
                    localStorage.removeItem(key);
                }
            });
        },

        countDownTimer : function(){
            var root = this;
            var timeleft = this.$('.time').html();
            document.time_interval = setInterval(function(){
                var timer = timeleft.split(':');
                var minutes = parseInt(timer[0], 10);
                var seconds = parseInt(timer[1], 10);

                --seconds;

                minutes = (seconds < 0) ? --minutes : minutes;
                if (minutes < 0) clearInterval(interval);

                seconds = (seconds < 0) ? 59 : seconds;
                seconds = (seconds < 10) ? '0' + seconds : seconds;
                this.$('.time').html(minutes + ':' + seconds);
                timeleft = minutes + ':' + seconds;
                if (minutes <= 0 && seconds <= 0 && document.slugId != ''){
                    clearTimeout();
                    document.timeOut = true;
                    root.quizResults();
                }
            },1000);
        },

        customErrorMessage: function(message, target, elem){
            this.$('.edit-tool-tip').remove();
            var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
            target.append(editToolTip);
            if(elem) elem.addClass('error');
        },

        goHome: function(){
            Backbone.history.navigate('/', {trigger:true});
            this.hidePopup(); 
        },

        jumpToQuestion: function(event){
            var questionId = $(event.currentTarget).attr('question_id');
            this.$('.question-wrap').removeClass('active');
            this.$('.quiz-wrap').children('.question-wrap[question-id="' + questionId + '"]').addClass('active');
            var index = parseInt($('.question-wrap.active').attr('id').split('_')[2]);
            var points = this.$('.question-wrap.active').attr('data-points');
            this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
            if(index == 1){this.$('.question-wrap .navigation-wrap .prev').removeClass('active');
            }
            this.$('.pagination .circle').removeClass('active');
            this.$('.pagination .circle[question_id="' + questionId + '"]').addClass('active');
            if (this.$('.quiz-wrap .question-wrap.active .option-item').length == 0){
                this.$('.quiz-wrap .question-wrap.active .options-wrap .change-answer-type').addClass('active');
            }
            if(index > 1){this.$('.question-wrap .navigation-wrap .prev').addClass('active');
            }
        },

        goToNextQuestion: function(event){
            var prev_question_id = this.$('.question-wrap.active').attr('question-id')
            this.mediaPause(prev_question_id);
	        var current_question_id = this.$('.question-wrap.active').attr('question-id');
            var is_next = this.$(event.currentTarget).hasClass('next');
            var is_answered = this.$(event.currentTarget).parents('.question-wrap').attr('answered');
            if(!document.isAuthor){
                var currentQuestionId = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2])
                if(is_next && is_answered == 'false'){
                    this.submitAnswer();
                    this.$(event.currentTarget).parents('.question-wrap').attr('answered', true);
                    if(this.$(event.currentTarget).parents('.question-wrap').attr('answered')){
                        this.$('.pagination').children('#question_block_'+ currentQuestionId +'').removeClass('skipped').addClass('answered');
                    }
                }else if(is_answered == 'false'){
                    this.$('.pagination').children('#question_block_'+ currentQuestionId +'').removeClass('answered').addClass('skipped');
                }
            }
            var index = parseInt($('.question-wrap.active').attr('id').split('_')[2]) + 1;
            this.$('.question-wrap').removeClass('active');
            this.$('.question-wrap:nth-child(' + index + ')').addClass('active');
            var points = this.$('.question-wrap.active').attr('data-points');
            this.$('.quiz-main-wrap .left-pannel .question-points').html(points)
            this.$('.pagination .circle').removeClass('active');
            this.$('#question_block_'+ index +'').first().addClass('active');
            if(index > 1){
                this.$('.question-wrap .navigation-wrap .prev').addClass('active');
            }
            var audio = this.getAudio(current_question_id);
            if(audio){this.updateAudioProgress(audio, current_question_id)
            }
           if(index > 1){this.$('.question-wrap .navigation-wrap .prev').addClass('active');
            }
        },

        goToPrevQuestion: function(event){
            var prev_question_id = this.$('.question-wrap.active').attr('question-id')
            this.mediaPause(prev_question_id);
            var index = this.$('.question-wrap.active').length > 0 ? parseInt($('.question-wrap.active').attr('id').split('_')[2]) - 1 : parseInt($('.question-wrap:last').attr('id').split('_')[2]);
            this.$('.question-wrap').removeClass('active');
            this.$('.question-wrap:nth-child(' + index + ')').addClass('active');
            var points = this.$('.question-wrap.active').attr('data-points');
            this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
            this.$('.pagination .circle').removeClass('active');
            this.$('#question_block_'+ index +'').first().addClass('active');
            this.$('.question-wrap.active .navigation-wrap .next').show();
            var current_question_id = this.$('.question-wrap.active').attr('question-id');
            var audio = this.getAudio(current_question_id);
            if(audio){this.updateAudioProgress(audio, current_question_id);
            }
            if(index == 1){this.$('.question-wrap .navigation-wrap .prev').removeClass('active');
            }
            if($('.add-block.question').length > 0){
                this.$('.add-block.question').remove();
                this.$('.previous_button').remove();
                this.$('.question-wrap.active .navigation-wrap .next').hide();
            }
        },

        hidePopup: function(popupName){
            this.$('.popup-overlay').removeClass('active');
            this.$('.popup-wrap').html("");
        },

        matchAnswer: function(event){
            if(!document.isAuthor){
                this.$(event.currentTarget).parents('.question-wrap').attr('answered', false);
                var target_elem = this.$(event.currentTarget);
                this.$(event.currentTarget).parents('.match-wrap').toggleClass('selected').attr('match', true);
                var match_side = this.$(event.currentTarget).parent().attr('class').split(' ')[1];

                var match_option_block = this.$('.question-wrap.active .options-wrap .option-item');
                if(match_side == "left"){
                    this.$(match_option_block).children('.match-wrap.left').addClass('disabled');
                    this.$(match_option_block).children('.match-wrap.right').removeClass('disabled');
                    this.$(match_option_block).children('.match-wrap.left').attr('left', true);
                }else{
                    this.$(match_option_block).children('.match-wrap.right').addClass('disabled');
                    this.$(match_option_block).children('.match-wrap.left').removeClass('disabled');
                    var matched_elements = this.$(match_option_block).children('.match-wrap[match="true"]');
                    this.$(matched_elements).addClass('match-disabled');
                    this.$(matched_elements).children('.match-block').addClass('match-disabled');
                    this.$(matched_elements).removeAttr('match');
                    this.saveMatched(matched_elements);
                }
                var selected_elem = this.$('.question-wrap.active .match-wrap.selected');
                this.navigationOption(selected_elem, 1);
            }
        },

        navigationOption: function(selected_elements, length_criteria){
            var get_results_elem = this.$('.question-wrap.active .navigation-wrap .get-results');
            if(selected_elements.length > parseInt(length_criteria)){
                this.$('.question-wrap.active .navigation-wrap .next').removeClass('disabled');
                this.$('.question-wrap.active .navigation-wrap .prev').removeClass('disabled');
                if(!this.can_skip){
                    $(get_results_elem).removeClass('disabled');
                }
                if(get_results_elem.length > 0){
                    this.$('.question-wrap.active').attr('answered', true);
                    $(get_results_elem).html('SUBMIT & GET RESULTS');
                }
            }else{
                var results_btn_text;
                this.$('.question-wrap.active .navigation-wrap .next').addClass('disabled');
                this.$('.question-wrap.active .navigation-wrap .skip').removeClass('disabled').addClass('active');
                if(document.viewType == 'edit_quiz'){
                    this.$('.question-wrap.active .navigation-wrap .prev').addClass('disabled');
                }
                if(!this.can_skip){
                    $(get_results_elem).addClass('disabled');
                }
                
                if(this.can_skip){
                    results_btn_text = 'SKIP & GET RESULTS';
                }else{
                    results_btn_text = 'SUBMIT & GET RESULTS';
                }
                
                if(get_results_elem.length > 0){
                    this.$('.question-wrap.active').attr('answered', false);
                    $(get_results_elem).html(results_btn_text);
                }
            }
        },

        overlayCalc: function(){
            var windowHeight = this.$(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        saveMatched: function(matched_elements){
            var root = this;
            var option_id;
            root.$(matched_elements).each(function(){
                if($(this).attr('left') == 'true'){
                    option_id = 'option_' + root.$(this).parents('.option-item').attr('option-id');
                    root.$(this).removeAttr('left')
                }
            });
            var option_data = {};
            root.$(matched_elements).each(function(){
                var child_elements = this.children[0].children;
                var data = {};
                var item_side = 'item_' + this.classList[1];
                root.$(child_elements).each(function(){
                    if( this.tagName == 'P'){
                        data['text'] = this.textContent;
                    }else{
                        data['image'] = this.src.split('media/')[1];
                    }
                });       
                option_data[item_side] = data;
            });
            localStorage.setItem(option_id, JSON.stringify(option_data));
        },

        sortAnswer: function(event){
            this.$(event.currentTarget).parents('.question-wrap').attr('answered', false);
            var sort_value = this.$(event.currentTarget).val()
            if(sort_value != ''){
                this.$(event.currentTarget).parents('.option-item').addClass('answered');
            }else{
                this.$(event.currentTarget).parents('.option-item').removeClass('answered');
            }
            var answered_elem = this.$('.question-wrap.active .option-item.answered');
            this.navigationOption(answered_elem, 0);
        },

        selectAnswer: function(event){
            var root = this;
            var clicked_elem = root.$(event.currentTarget);
            if(!document.isAuthor){
                root.$(clicked_elem).parents('.question-wrap').attr('answered', false);
            }
            var is_active = root.$(event.currentTarget).parent().hasClass('selected');
            var option_type = root.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
            if(option_type == 'single_select'){
                root.$('.question-wrap.active .checklist-item').removeClass('selected');
            }
            root.$(event.currentTarget).parent().toggleClass('selected');

            if(is_active && option_type == 'single_select'){
                root.$(event.currentTarget).parent().toggleClass("selected");
            }
            var selected_elem = root.$('.question-wrap.active .checklist-item.selected');
            this.$(event.currentTarget).parents('.question-wrap.active').find('.skip').addClass('disabled')
            root.navigationOption(selected_elem, 0);
        },

        startQuiz: function(event){
            var checkbox = this.$('input[type=checkbox]');
            var is_checked = this.$('input[type=checkbox]').prop('checked');
            if(is_checked){
                this.renderQuestions();
            }else{
                this.customErrorMessage('Please agree the agreement', this.$(checkbox).parent(), this.$(checkbox));
            }
        },

        submitAnswer: function(event){
            var root = this;
            var question_id = this.$('.question-wrap.active').attr('question-id');
            var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
            var options_data = {};
            if(option_type.includes('select')){
                var selected_elements = this.$('.question-wrap.active .checklist-item.selected');
                var options = [];
                this.$(selected_elements).each(function(){
                    var option_id = root.$(this).attr('option-id');
                    options.push(parseInt(option_id));
                });
                options_data['options'] = options;
            }else if(option_type.includes('matching')){
                var total_match_elements = root.$('.question-wrap.active .option-item').length;
                var options = [];
                root.$('.question-wrap.active .option-item .match-wrap.left').each(function(){
                    var option_data = {};
                    var option_id = 'option_' + root.$(this).parent().attr('option-id');
                    var option = localStorage.getItem(option_id);
                    if(option != null){
                        option_data[option_id] = JSON.parse(option);
                        options.push(option_data);
                    }            
                });
                options_data['options'] = options;
            }else{
                var sort_elements = root.$('.question-wrap.active .option-item');
                var options = [];
                for(var i=0;i < sort_elements.length;i++){
                    var option_data = {};
                    var option_id = 'option_' + root.$(sort_elements[i]).attr('option-id'); 
                    option_data[option_id] = parseInt(root.$(sort_elements[i]).children('.order-input').children('input').val());
                    options.push(option_data);
                }
                options_data['options'] = options;
            }

            var quiz_slug = document.slugId;
            var question_id = question_id;
            var quiz_session_id = document.quiz_session;
            var attrs = {'quiz_slug' : quiz_slug, 
                         'question_id' : question_id,
                         'quiz_session_id' : quiz_session_id,
                         'option_type' : option_type,
                         'options_data' : options_data,
                        };
  
            var quizQuestionActivity = new QuizQuestionActivity(attrs);
            quizQuestionActivity.save();
            this.clearLocalStorage();
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

        toggleChecklistText: function(event){
            var info_block_elem_len = this.$(event.currentTarget).parents('.checklist-item').find('.info-block').children().length;
            if(info_block_elem_len > 0){
                if (this.$(event.currentTarget).parents('.checklist-item').hasClass('open')) {
                    this.$(event.currentTarget).parents('.checklist-item').removeClass("open");
                    this.$(event.currentTarget).parents('.checklist-item').find('.info-block').slideUp('linear');
                } else {
                    this.$(event.currentTarget).parents('.checklist-item').addClass("open");
                    this.$(event.currentTarget).parents('.checklist-item').find('.info-block').slideDown('linear');
                }
            }
        }, 

        quizResults: function(event){
            var root = this;
            var is_answered = this.$('.question-wrap.active').attr('answered');
            if(is_answered == 'true' && !document.timeOut){
                this.submitAnswer();
                var current_question_id = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2]);
                this.$('.pagination').children('#question_block_'+current_question_id+'').addClass('answered');
                this.$('.question-wrap[answered = false]').addClass('skipped');
            }else{
                var current_question_id = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2]);
                this.$('.pagination').children('#question_block_'+current_question_id+'').removeClass('answered');
                this.$('.pagination').children('#question_block_'+current_question_id+'').addClass('skipped');
            }
            //If user directly jumps to last question and submit the result.
            //This is to indicate the skipped question in the pagination
            this.$('.question-wrap[answered="false"]').each(function(){
                root.$('.quiz-main-wrap').children('.pagination').find('#'+this.id+'').addClass('skipped');
            })
            var root = this;
            var quiz_slug = document.slugId;
            var quiz_session_id = document.quiz_session;
            var total_questions_count = this.$('.question-wrap').length;
            var attempted_questions_count = this.$('.question-wrap[answered="true"]').length;
            var skipped_questions_count = this.$('.question-wrap[answered="false"]').length;
            var time_left = this.$('.time').html();
            var is_timeout = document.timeOut;

            var attrs = {'quiz_slug' : quiz_slug, 
                         'total_questions_count' : total_questions_count,
                         'attempted_questions_count' : attempted_questions_count,
                         'skipped_questions_count' : skipped_questions_count,
                         'quiz_session_id' : quiz_session_id,
                         'time_left' : time_left,
                         'is_timeout' : is_timeout,
                        };

            var quizActivity = new QuizActivity(attrs);
            quizActivity.save(null, {
                success: function(response, xhr, status){ 
                    var attrs = {};
                    attrs['results'] = true;
                    if(document.timeOut){
                        response.attributes.time_out = document.timeOut;
                    }
                    clearTimeout(document.time_interval);
                    attrs['quiz_result'] = response.attributes;
                    root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                    root.$('.popup-overlay').addClass('active');
                    root.overlayCalc();
                }
            })
        },

        mediaPause: function(question_id){
            var media = $('video, audio');
            for(var i = 0; i < media.length; i++){
                if(!media[i].paused && !media[i].ended) {
                    media[i].pause();
                    if(media[i].tagName == 'AUDIO'){
                        var audio = this.getAudio(question_id);
                        if(audio){
                            audio.pause();
                            this.$('.question-wrap[question-id='+ question_id +']').find('.audio-control').removeClass("pause").addClass("play");
                            this.updateAudioProgress(audio, question_id)
                        }
                    }
                }
            }
        },

        playAudio: function(event){ 
            var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
            var audio = this.getAudio(question_id);
            if(audio){
                if(audio.paused){
                    audio.play();
                    this.$('.question-wrap[question-id='+question_id+']').find('.audio-control').removeClass("play").addClass("pause autoplayed");
                }else{
                    audio.pause();
                    this.$('.question-wrap[question-id='+question_id+']').find('.audio-control').removeClass("pause").addClass("play");
                }
            }
            $(audio).on("timeupdate", {'root': this}, this.timeUpdate);
        },

        forwardAudio: function(event){
            var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
            var audio = this.getAudio(question_id);
            if(audio && !audio.paused) {
                audio.currentTime = audio.currentTime + 5;
            }
        },

        backwardAudio: function(event){
            var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
            var audio = this.getAudio(question_id);
            if(audio && !audio.paused) {
                audio.currentTime = audio.currentTime - 5;
            }
        },

        seekAudio: function(event){
            var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
            var audio = this.getAudio(question_id);
            if(audio){
                var duration = audio.duration;
                var position = event.offsetX;
                var timelineWidth = this.$('.question-wrap[question-id='+question_id+']').find(".audio-timeline").width();
                var seek_to = position / timelineWidth;
                if(!audio.paused) {
                    audio.currentTime = ((duration * seek_to * 100)/100).toFixed(2);
                }
            }
        },

        muteAudio: function(event){
            var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
            var audio = this.getAudio(question_id);
            audio.muted = !audio.muted;
            this.$(event.currentTarget.toggleClass('muted'));
        },

        timeUpdate: function (event) {
            // Synchronizes playhead position with current point in audio
            var data_root = event.data.root;
            var audio = event.currentTarget;
            var question_id = $(event.target).parents('.question-wrap').attr('question-id')
            var current_question = data_root.$(".question-wrap[question-id="+question_id+"]")
            data_root.updateAudioProgress(audio, question_id);

            current_question
            .find(".audio-currentTime")
            .text(data_root.timeConvertion(audio.currentTime))

            current_question
            .find(".audio-duration")
            .text(data_root.timeConvertion(audio.duration));

            if (audio.currentTime == audio.duration) {
               audio.pause();
               current_question.find('.audio-control').removeClass("pause").addClass("play");
               current_question.find('.audio-progress').css({'width':'100%'});
            }
        },

        updateAudioProgress: function(audio, question_id){
            var timelineWidth = this.$('.question-wrap[question-id='+ question_id +']').find('.audio-timeline').width();
            var playPercent = timelineWidth * (audio.currentTime / audio.duration);
            this.$(".question-wrap[question-id="+question_id+"]").find('.audio-progress').css({
                "width": playPercent});
        },

        timeConvertion: function(duration){
            var durationMin = parseInt(duration / 60);
            var durationSec = parseInt(duration % 60);
            if(durationMin == 0){
                durationMin += '0';
            }
            if(durationSec < 10){
                durationSec = '0' + durationSec;
            }
            var duration = durationMin + ":" + durationSec;
            return duration;
        },

        getAudio: function(question_id){
            var audio_file = $('[question-id='+question_id+']').children().find('audio')
            if(audio_file.length){
                return audio_file[0];
            }
        },   

        zoomImage: function(event){
            if (this.$(event.currentTarget).hasClass('default')) return;
            var zoomImageSrc = this.$(event.currentTarget).attr('src');
            var zoomImage = "<img class='zoom' src='"+ zoomImageSrc +"'><span class='zoom_close'></span>";
            this.$('.popup-overlay').addClass('active')
            this.$('.popup-overlay .popup-wrap').html(zoomImage)
            this.$el.addClass('img_zoom');
        },

        closeZoomImage: function(){
            this.$el.removeClass('img_zoom');
            this.$('.popup-overlay').removeClass('active')
        }
    });

    return MainView;
});
