/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../templates/edit.handlebars',
        '../templates/popup.handlebars',
        '../templates/content-editor.handlebars',
        '../models/group',
        '../models/qna',
        '../models/section',
        '../../tenant/models/icon',
        'froalaeditor',
        'froalaalign',
        'froalacharcounter',
        'froalacodeview',
        'froalacolors',
        'froalaembedly',
        'froalaemoticons',
        'froalaentities',
        'froalafontfamily',
        'froalafontsize',
        'froalaforms',
        'froalafullscreen',
        'froalahelp',
        'froalaimage',
        'froalainlinestyle',
        'froalalinebreaker',
        'froalalink',
        'froalalists',
        'froalaparagraphformat',
        'froalaparagraphstyle',
        'froalaprint',
        'froalaquickinsert',
        'froalaquote',
        'froalasave',
        'froalaspecialcharacters',
        'froalatable',
        'froalaurl',
        'froalavideo',
        'froalawordpaste',
        'froalafontawesome',
        'froalalineheight',
        'froalauploadfile',
], function (_, $, Backbone, Common, EditTemplate, PopupTemplate, ContentEditor, Group, QnA, Section, Icon) {
    'use strict';

    var EditView = Backbone.View.extend({

        el: '#main_container',
        NAME_CHAR_LIMIT: 70,
        DESCRIPTION_CHAR_LIMIT: 100,

        events: {
            'click .add-block:not(.disabled), .faq-edit-option.delete': 'showPopup',
            'click .cancel': 'hidePopup',
            'click .advanced': 'showAdvanced',
            'change #upload-file': 'previewImage',
            'click .remove-file': 'removeImage',
            'keyup .content-block textarea, .content-block input' : 'charCounter',
            'click .publish-faq:not(.disabled)': 'showPopup',

            'click [data-popup="group"] .save': 'validateGroupInfo',
            'click [data-popup="section"] .save': 'saveSectionInfo',
            'click [data-popup="qna"] .save': 'saveQnAInfo',

            'click .faq-edit-option.edit' : 'editEntity',
            'click .popup-box.confirm_delete .delete' : 'deleteEntity',
            'click .popup-box.confirm_publish_faq .publish' : 'publishGroup',
            'click .thumb-wrap': 'showTextEditor',
            'click .content-done' : 'saveTextEditorChanges',
            'click .content-cancel' : 'cancelTextEditorChanges',
        },

        initialize: function() {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            this.listenTo(Backbone, 'home_rendered', this.renderHomeOptions);
            this.listenTo(Backbone, 'explore_faq', this.renderGroupOptions);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            Common.loadLanguages(document.locales);
        },  

        onWindowResize: function (e){
            e.data.root.overlayCalc();
        },

        renderHomeOptions: function(){
            this.group = null;
            var attrs = {
                'add_group': true
            };
            this.$('.faq-block').append(EditTemplate(attrs));
            attrs = {
                'edit_options': true,
                'edit_group': true
            }
            this.$('.faq-wrap').append(EditTemplate(attrs));
        },

        renderGroupOptions: function(view){
            this.view = view;
            var attrs = {
                'add_section': true
            };
            this.$('.faq-wrap').append(EditTemplate(attrs));
            attrs = {
                'add_qna': view.group.attributes.sections.length
            };
            this.$('.faq-section').append(EditTemplate(attrs));
            attrs = {
                'edit_options': true,
                'edit_qna': true  
            };
            this.$('.faq-item .head').append(EditTemplate(attrs));
            attrs = {
                'edit_options': true,
                'edit_section': true  
            };
            this.$('.faq-section .section-title').append(EditTemplate(attrs));
            if(!view.group.attributes.published){
                this.$('.publish-faq').removeClass('disabled').attr('data-slug', view.group.id);
            }else{
                this.$('.publish-faq').removeClass('disabled').addClass('disabled');
            }
            this.$('#block_container').append(ContentEditor());
        },

        validateGroupInfo: function(){
            var group_id = this.$(".popup-box[data-popup=group]").attr('data-slug');
            var group_name = this.$("[data-popup=group] input[name='name']");
            var group_description = this.$("[data-popup=group] textarea");
            var error_flag = false;
            if (!group_name.val()) {
                this.customErrorMessage('Provide a name for group', this.$(group_name).parent(),  this.$(group_name));
                error_flag = true;
            } else if(group_name.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(group_name).parent(),  this.$(group_name));
                error_flag = true;
            } else if (group_name.val().length > parseInt($(group_name).attr('maxlength'))) {
                this.customErrorMessage('Maximum ' + parseInt($(group_name).attr('maxlength')) + ' characters allowed', this.$(group_name).parent(),  this.$(group_name));
                error_flag = true;
            } else if (group_description.val().length > parseInt($(group_description).attr('maxlength')) ) {
                this.customErrorMessage('Maximum ' + parseInt($(group_description).attr('maxlength')) + ' characters allowed', this.$(group_description).parent(),  this.$(group_description));
                error_flag = true;
            }

            if (error_flag) return false;

            this.actionInProgress();

            var attrs = {
                'name': group_name.val(),
                'description': group_description.val(),
                'icon_id': this.$("[data-popup=group] .img-preview").attr('data-icon-id') || 0,
                'new_icon': false
            }
            if(group_id){
                attrs.id = group_id
            }

            var icon_file = this.$("[data-popup=group] input[type=file]");
            var icon_saved = true;
            if(icon_file.val()){
                icon_saved = false;
                var icon_data = new FormData();
                icon_data.append('icon', icon_file[0].files[0])
                icon_data.append('name', attrs['name'])
                icon_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'))

                var root = this;
                var icon = new Icon();
                icon.save(
                    icon_data, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: icon_data,
                        success: function(model, response){
                            attrs['icon_id'] = response.icon_id;
                            attrs['new_icon'] = true;
                            root.saveGroupInfo(attrs);
                        }, error: function(xhr, status_code, error_message){
                            root.actionFailed();
                        }
                    }
                )
            }

            if(icon_saved){
                this.saveGroupInfo(attrs);
            }
        },

        publishGroup: function(){
            var group = new Group({
                'id': this.view.group.id,
                'publish' : true
            });
            this.actionInProgress();
            var root = this;
            group.save(null, {
                patch: true,
                success: function(){
                    root.actionSuccess();
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed();
                }
            })
        },

        saveGroupInfo: function(attrs){
            var group = new Group(attrs);
            var root = this;
            group.save(null, {
                success: function(){
                    root.actionSuccess();
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }, error: function(xhr, status_code, error_message){
                    if(attrs.icon_id && attrs.new_icon){
                        var icon = new Icon({id: attrs.icon_id});
                        icon.destroy();
                    }
                    root.actionFailed();
                }
            })
        },

        saveSectionInfo: function(){
            var section_id = this.$(".popup-box[data-popup=section]").attr('data-id');
            var section_name = this.$("[data-popup=section] input[name='name']");
            var error_flag = false;
            if (!section_name.val()) {
                this.customErrorMessage('Provide a name for section', this.$(section_name).parent(),  this.$(section_name));
                error_flag = true;
            } else if(section_name.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a name with atleast an alphanumeric character',  this.$(section_name).parent(),  this.$(section_name));
                error_flag = true;
            } else if (section_name.val().length > parseInt($(section_name).attr('maxlength')) ) {
                this.customErrorMessage('Maximum ' + parseInt($(section_name).attr('maxlength')) + ' characters allowed',  this.$(section_name).parent(),  this.$(section_name));
                error_flag = true;
            }
            if (error_flag) return false;

            this.actionInProgress();

            var attrs = {
                'name': section_name.val(),
                'group_id': this.view.group.attributes.id
            }
            if(section_id){
                attrs.id = section_id;
            }

            var root = this;
            var section = new Section(attrs);
            section.save(null, {
                success: function(){
                    root.actionSuccess();
                    setTimeout(function(){
                        root.view.renderGroup(attrs.group_id);
                    }, 1000);
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed();
                }
            })
        },  

        saveQnAInfo: function(){
            var qna_id = this.$(".popup-box[data-popup=qna]").attr('data-id');
            var section_id = this.$(".popup-box[data-popup=qna]").attr('data-section-id');
            var qna_question = this.$("[data-popup=qna] input[name='question']");
            var qna_answer = this.$("[data-popup=qna] textarea");
            var error_flag = false;

            if (!qna_question.val()) {
                this.customErrorMessage('Provide a question', this.$(qna_question).parent(),  this.$(qna_question));
                error_flag = true;
            } else if(qna_question.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a question with atleast an alphanumeric character', this.$(qna_question).parent(),  this.$(qna_question));
                error_flag = true;
            } else if (qna_question.val().length > parseInt($(qna_question).attr('maxlength'))) {
                this.customErrorMessage('Maximum ' + parseInt($(qna_question).attr('maxlength')) + ' characters allowed', this.$(qna_question).parent(),  this.$(qna_question));
                error_flag = true;
            } else if (!qna_answer.val()) {
                this.customErrorMessage('Provide a answer for question', this.$(qna_answer).parent(),  this.$('[data-popup=qna]  .thumb-wrap'));
                error_flag = true;
            }

            if (error_flag) return false;

            this.actionInProgress();

            var attrs = {
                'group_id': this.view.group.id,
                'section_id': section_id,
                'question': qna_question.val(),
                'answer': qna_answer.val(),
            }
            if(qna_id){
                attrs.id = qna_id;
            }

            var root = this;
            var qna = new QnA(attrs);
            qna.save(null, {
                success: function(){
                    root.actionSuccess();
                    setTimeout(function(){
                        root.view.renderGroup(root.view.group.attributes.id);
                    }, 1000);
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed();
                }
            })
        },

        editEntity: function(event){
            var popupName = this.$(event.currentTarget).attr('data-popup');
            var attrs = {
                'is_edit': true
            };
            attrs[popupName] = true;
            var root = this;
            if(popupName == 'group'){
                var group_id = this.$(event.currentTarget).parents('li').attr('data-slug');
                var group = new Group({id: group_id});
                group.fetch({
                    success: function(model, group){
                        _.extend(attrs, group)
                        root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                        root.$('.popup-overlay').addClass('active');
                        root.overlayCalc();
                    }
                })
            }else if(popupName == 'section'){
                var section_id = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
                var section = new Section({id: section_id});
                section.fetch({
                    success: function(model, section){
                        _.extend(attrs, section)
                        root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                        root.$('.popup-overlay').addClass('active');
                        root.overlayCalc();
                    }
                })
            }else if(popupName == 'qna'){
                var qna_id = this.$(event.currentTarget).parents('.faq-item').attr('data-id');
                var qna = new QnA({id: qna_id});
                qna.fetch({
                    success: function(model, qna){
                        _.extend(attrs, qna)
                        root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                        root.$('.popup-overlay .popup-wrap #preview').html(attrs.answer);
                        root.$('.popup-overlay').addClass('active');
                        root.overlayCalc();
                    }
                })
            }
        },

        deleteEntity: function(event){
            var entityType = this.$(event.currentTarget).attr('data-type');
            this.actionInProgress();
            var root = this;
            var entityId = this.$(event.currentTarget).attr('data-id');
            if(entityType == 'group'){
                var group = new Group({id: entityId});
                group.destroy({
                    success: function(){
                        root.actionSuccess();
                        setTimeout(function(){
                            window.location.reload();
                        }, 1000);
                    }, error: function(xhr, status_code, error_message){
                        if(attrs.icon_id && attrs.new_icon){
                            var icon = new Icon({id: attrs.icon_id});
                            icon.destroy();
                        }
                        root.actionFailed();
                    }
                })
            }else if(entityType == 'section'){
                var section = new Section({id: entityId});
                section.destroy({
                    success: function(){
                        root.actionSuccess();
                        setTimeout(function(){
                            root.view.renderGroup(root.view.group.attributes.id);
                        }, 1000);
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed();
                    }
                })
            }else if(entityType == 'question'){
                var question = new QnA({id: entityId});
                question.destroy({
                    success: function(){
                        root.actionSuccess();
                        setTimeout(function(){
                            root.view.renderGroup(root.view.group.attributes.id);
                        }, 1000);
                    }, error: function(xhr, status_code, error_message){
                        root.actionFailed();
                    }
                })
            }
        },

        // Below are list of utility functions

        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        previewImage: function(event){
            this.removeErrorMessages();
            var image = event.target.files[0];
            if (!image || !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(image.name)) {
                return false;
            }
            this.$(event.currentTarget).parents('.block').find('.file-name').text(image.name);
            this.$('.img-preview').attr('src', URL.createObjectURL(image));
            this.$(event.currentTarget).parents('.block').addClass('image-added');
        },

        removeErrorMessages: function(){
            this.$('.edit-tool-tip').remove();
            this.$('input').removeClass('error');
            this.$('textarea').removeClass('error');
        },

        removeImage: function(event){
            this.$(event.currentTarget).parents('.block').removeClass('image-added');
            this.$('.img-preview').removeAttr('data-icon-id').removeAttr('src').removeAttr('style');
            this.$('.upload-file').val('');
        },

        showAdvanced: function(event){
            this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
            var root = this;
            setTimeout(function(){
                root.$('.popup-box .content-block').animate({scrollTop :750},'slow');
            }, 100);
        },

        showPopup: function(event){
            var popupName = this.$(event.currentTarget).attr('data-popup');
            let target_class = this.$(event.currentTarget);
            if (!(target_class.hasClass('delete') || target_class.hasClass('publish-faq'))){
                if (!Common.isDefaultLocale(this)) {
                    this.overlayCalc();
                    return;
                }
            }
            var attrs = {};
            attrs[popupName] = true;
            var entity_id;
            var entity_type = this.$(event.currentTarget).attr('data-type');
            if(entity_type == "group"){
                entity_id = this.$(event.currentTarget).parents('li').attr('data-slug');
            }else if(entity_type == "section" || entity_type == "qna"){
                entity_id = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
                attrs['section_id'] = entity_id;
            }else if(entity_type == "question"){
                attrs['section_id'] = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
                entity_id = this.$(event.currentTarget).parents('.faq-item').attr('data-id');
            }
            attrs['entity_type'] = entity_type;
            attrs['entity_id'] = entity_id;
            this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            this.$('.popup-overlay').addClass('active');
            this.overlayCalc();
        },

        hidePopup: function(){
            this.$('.popup-overlay').removeClass('active');
            this.$('.popup-wrap').html("");
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

        customErrorMessage: function(message, target, elem){
            // Custome error messages goes here
            this.$('.edit-tool-tip').remove();
            var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
            target.append(editToolTip);
            if(elem) elem.addClass('error');
        },

        showTextEditor: function(){
            $('#main_container').addClass('text-editor-active');
            var question = this.$('input[name="question"]').val();
            this.$('.text-editor-wrap .question span').text(question);
            var content =  this.$('textarea[name ="answer"]').val();

            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var uploadMethod = 'POST';
            var uploadParam = 'editor_file';

            if(content){
                this.$('.content-editor-wrap').html(content);
            }
            this.$('.content-editor-wrap').froalaEditor({
                key: Common.FROALA_KEY,
                toolbarContainer: '#toolbar',
                charCounterCount: false,
                toolbarSticky: true,
                colorsDefaultTab: 'text',
                colorsStep: 7,
                tableResizerOffset: 10,
                colorsBackground: Common.FROALA_COLORS_BACKGROUND,
                colorsText: Common.FROALA_COLORS_TEXT,
                fontFamily: Common.FROALA_FONT_FAMILY,
                imageEditButtons: Common.FROALA_IMAGE_EDIT_BUTTONS,
                toolbarButtons: Common.FROALA_TOOLBAR_BUTTONS,
                linkAlwaysBlank: true,

                // Set the image upload parameter.
                imageUploadParam: uploadParam,
                // Set the image upload URL.
                imageUploadURL: Common.FROALA_RESOURCE_UPLOAD_URL,

                // Additional upload params.
                imageUploadParams: {
                    csrf_token: csrf_token,
                    type: 'image'
                },
                // Set request type.
                imageUploadMethod: uploadMethod,

                // Set the file upload parameter.
                fileUploadParam: uploadParam,

                // Set the file upload URL.
                fileUploadURL: Common.FROALA_RESOURCE_UPLOAD_URL,

                // Additional upload params.
                fileUploadParams: {
                    csrf_token: csrf_token,
                    type: 'rte_link'
                },

                // Set request type.
                fileUploadMethod: uploadMethod,

                // Set max file size to 300MB(Should be in bytes).
                fileMaxSize: 1024 * 1024 * 300,

                // disable video upload from local
                videoUpload: false,
            });
            // Add download attr to the added file.
            $('.content-editor-wrap').on('froalaEditor.file.inserted',function (e, editor, $file, response) {
               // response will be the resource api response.
               response = JSON.parse(response);
               $file.attr('download', response.name);
            });
            $('.content-editor-wrap').on('froalaEditor.paste.after', function (e, editor) {
                editor.$el.find('a').attr('target', '_blank');
            });
        },

        saveTextEditorChanges: function(){
            var htmlContent = this.$('.content-editor-wrap').froalaEditor('html.get', true);
            this.$('textarea[name ="answer"]').text(htmlContent);
            this.$('.popup-overlay .popup-wrap #preview').html(htmlContent);
            this.$('.popup-overlay .thumb-wrap img').addClass('hidden');
            this.cancelTextEditorChanges();
        },

        cancelTextEditorChanges: function(){
            this.$('.content-editor-wrap').froalaEditor('destroy');
            $('#main_container').removeClass('text-editor-active');
        },

        actionSuccess: function(){
            var root = this;
            setTimeout(function(){
                root.$('.form-sending').removeClass("slide-in is-submitted");
                root.$('.form-sent').addClass("slide-in");
                setTimeout(function(){
                    root.$('.form-sent').removeClass("slide-in");
                    root.hidePopup();
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

    });
    
    return EditView;
});
