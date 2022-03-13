/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../models/checklist',
        '../models/checklist_section',
        '../models/checklist_item',
        '../models/checklist_suggestion',
        '../../tenant/models/product-tree',
        '../templates/edit.handlebars',
        '../templates/popup.handlebars',
        '../templates/checklist_block.handlebars',
        '../templates/checklist_section.handlebars',
        '../templates/checklist_item.handlebars',
        '../templates/checklist_suggestion.handlebars',
        '../templates/url_unfurling.handlebars',
        '../templates/chapter.handlebars',
        '../../helpers/handlebars/i18n',
], function (_, $, Backbone, Common, Checklist, ChecklistSection, ChecklistItem, ChecklistSuggestion, ProductTree, EditTemplate, PopupTemplate, ChecklistBlockTemplate, ChecklistSectionBlockTemplate, ChecklistItemBlockTemplate, ChecklistSuggestionTemplate, UrlUnfurlTemplate, ChapterTemplate,Translate) {
    'use strict';

    var EditView = Backbone.View.extend({

        el: '#main_container',
        CHECKLIST_TITLE_LIMIT: 200,
        CHECKLIST_DESCRIPTION_LIMIT: 500,
        SECTION_TITLE_LIMIT: 50,
        ITEM_TITLE_LIMIT: 100,
        ITEM_DESCRIPTION_LIMIT: 350,
        SUGGESTION_TITLE_LIMIT: 200,

        events: {
            'click .preview' : 'previewChecklist',
            'click .add-block:not(.disabled)': 'showPopupAttrs',
            'click .popup-title .back': 'goBack',
            'click .cancel': 'hidePopup',
            'click .option-check': 'switchOption',
            'click .advanced': 'showAdvanced',
            'change #upload-file': 'previewImage',
            'click .remove-file': 'removeImage',
            'keyup .content-block textarea, .content-block input' : 'charCounter',
            'click .popup-box[data-popup="checklist"] .save': 'submitChecklist',
            'click .popup-box[data-popup="checklist_section"] .save': 'submitChecklistSection',
            'click .popup-box[data-popup="checklist_item"] .save': 'submitChecklistItem',
            'click .popup-box[data-popup="checklist_suggestion"] .save': 'saveSuggestions',
            'click .popup-box[data-popup="edit_suggestion"] .save': 'saveEditedSuggestion',
            'keyup .popup-box[data-popup="checklist_suggestion"] input[name="search"]': 'searchDemos',

            'click .checklist-edit-option.edit' : 'editEntity',
            'click .confirm-delete': 'deleteEntity',
            'click .confirm-enable, .confirm-disable' : 'enableDisableChecklist',
           
            'click .checklist-edit-option.delete' : 'showPopupAttrs',
            'click .checklist-edit-option.enable, .checklist-edit-option.disable' : 'showPopupAttrs',

            'click .publish-checklist:not(.disabled)': 'showPopupAttrs',
            'click .confirm-publish-checklist': 'publishChecklist',

            'click .content_suggestion:not(.disabled) .browse' : 'browseLibrary',
            'click .content_suggestion:not(.disabled) .add_suggestion_link' : 'addSuggestionLink',
            'click .remove': 'removeExternalLink',
            'click .demo .css-checkbox': 'updateAddButtonText',
            'click #site_map .category': 'toggleTreeContent',
            'keyup input[type=url]': Common.updateUrl,
            'change .suggetsion_type .css-radio': 'switchSuggestionType',
        },

        initialize: function() {
            this.listenTo(Backbone, 'home_rendered', this.homeRender);
            this.listenTo(Backbone, 'checklist_rendered', this.checklistRender);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            Common.loadLanguages(document.locales);
            this.is_edit = false;
            this.item_name;
            this.item_description;
            this.section_id;
            this._chapters = [];
            if(document.isEdit){
                this.is_edit = true;
            }
        },

        hidePopup: function(popupName){
            this.$('.popup-overlay').removeClass('active');
            this.$('.popup-wrap').empty();
        },

        homeRender : function(view){
            this.$('.preview').addClass('disable');
            this.$('.publish-checklist').addClass('disabled');
            this.view = view;
            var attrs = {};
            attrs.add_checklist = true;
            this.$('.checklist_list').append(EditTemplate(attrs));
            attrs = {};
            var root = this;
            _.each(this.$('.checklist_list ul li'), function(checklist){
                attrs.edit_checklist = true;
                attrs.checklist_edit = true;
                attrs.is_disabled = root.$(checklist).hasClass('disabled');
                root.$(checklist).find('.checklist_wrap').append(EditTemplate(attrs));
            })
        },

        checklistRender : function(view){
            this.$('.preview').removeClass('disable');
            this.$('.publish-checklist').removeClass('disabled');
            var attrs = {};
            attrs.add_checklist_item = true;
            this.$('.checklist_section').append(EditTemplate(attrs));
            attrs = {};
            attrs.count = this.$('.checklist_step_wrap .checklist_section').length + 1
            attrs.add_checklist_section= true;
            this.$('.checklist_wrap').append(EditTemplate(attrs));
            attrs = {};
            attrs.edit_checklist = true;
            attrs.checklist_edit_step = true;
            this.$('.steps_title').append(EditTemplate(attrs));
            attrs = {};
            attrs.edit_checklist = true;
            attrs.checklist_edit_item = true;
            this.$('.checklist_item .head').append(EditTemplate(attrs));
            attrs = {};
            attrs.add_suggestion = true;
            this.$('.checklist_item .info_block').append(EditTemplate(attrs));
            attrs = {};
            attrs.edit_checklist = true;
            attrs.checklist_edit_suggestion = true;
            this.$('.suggested_content_wrap[data-type="walkthrough"]').children('.suggested_content').append(EditTemplate(attrs));
            attrs.is_external_link = true;
            this.$('.suggested_content_wrap[data-type="external_link"]').children('.suggested_content').append(EditTemplate(attrs));
            this.initSortable();
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

        addSuggestionLink: function(event){
            var root = this;
            root.$('.save').addClass('disabled');
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
                    if (!response.icon){
                        externalLink.icon = '/static/images/default_link_icon.png';
                    }else{
                        externalLink.icon = response.icon;
                    }
                    root.$('.save').removeClass('disabled');
                    root.$(event.currentTarget).parent().removeClass('loading')
                    root.$('.suggestion_link').val('');
                    root.$('.external-links').append(UrlUnfurlTemplate(externalLink))
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

        clearChapterCache: function(){
            this._chapters = [];
        },

        cacheChapterSuggestions: function(event){
            var selectedChapters = this.$('.css-checkbox:checked');
            this._chapters = _.map(selectedChapters, function(elem){return elem.value;});
        },

        cacheItemInfo: function(event){
            this.item_name =  this.$('.popup-box [name=title]').val();
            this.item_description = this.$('.popup-box [name=description]').val();
            this.section_id = this.$('.popup-box .save').attr('section-id');
        },

        browseLibrary: function(event){

            this.cacheItemInfo(event);

            this.showPopupAttrs(event);
            var root = this;
            var tree = new ProductTree();
            tree.fetch({
                data: {get_cache: 'False', author: 1},
                success: function(model, response){
                    root.loadChapters(response, "demo-library", 0, "section", "");
                },
                error: function(xhr, status_code, message){
                    console.log("tree fetch error:", xhr, status_code, message)
                }
            });
        },

        searchDemos: function(){
            var input = $("input[name='search']").val().toUpperCase();
            $('#demo-library').children().each( function () {
               if( $(this).find('h1').text().toUpperCase().indexOf(input) > -1){
                   $(this).show();
               } else {
                   $(this).hide();
               }
            });
        },

        loadChapters: function(data, id, level, type, parent){
            var root = this;

            level += 1;

            for (var i =0; i < data.length; i++) {
                var chapter = {};
                chapter.breadcrumb = '';
                if(parent != ''){
                        chapter.breadcrumb = parent + ' > ' + data[i].name;
                    } else{
                        chapter.breadcrumb = data[i].name;
                    }
                if (type == "demo") {
                    chapter.slug = data[i].slug;
                    chapter.name = data[i].name;
                    chapter.checked = false;
                    if(root._chapters.includes(chapter.slug)){ chapter.checked = true }
                    $('#' + id).append(ChapterTemplate(chapter));
                }

                if (data[i].children) {
                    root.loadChapters(data[i].children, id, level, "section", chapter.breadcrumb)
                } else if (data[i].playlists) {
                    root.loadChapters(data[i].playlists, id, level, "playlists", chapter.breadcrumb)
                } else if (data[i].demos) {
                    root.loadChapters(data[i].demos, id, level, "demo", chapter.breadcrumb)
                }
            }
        },

        buildTree: function(data, id, level, type){
            var root = this;
            level += 1;
            for (var i = 0; i < data.length; i++) {
                if (type == "section") {
                    var html = "<div id=" + data[i].slug + " data-item='section' class='category-list level" + level + "'>\
                                    <div class='category closed'>\
                                        <span class='icon'></span>" + data[i].name +"\
                                    </div>\
                                </div>"
                } else if(type == "playlists"){
                    var html = "<div id='" + id + "-" + level + "-" + data[i].order + "' data-item='playlist' class='category-list level" + level + "'>\
                                    <div class='playlist'><span class='icon'></span>" + data[i].name + "</div>\
                                </div>"
                } else {
                    var input;
                    if(_.indexOf(root.selected_categories, data[i].slug) !== -1){
                        input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value="+ data[i].slug +" class='css-checkbox' checked/>"
                    }else{
                        input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value="+ data[i].slug +" class='css-checkbox' />"
                    }
                    var html = "<div class='category-list level" + level + "' data-item='chapter'>\
                                    <div class='demo'><span class='icon'></span>" + data[i].name + input +"\
                                            <label for='ch-" + data[i].slug + "' class='css-label'></label>\
                                </div>"
                };
                $('#' + id).append(html);
                var parent_id;
                if(data[i].children){
                    parent_id = data[i].slug;
                    root.buildTree(data[i].children, parent_id, level, "section")
                } else if (data[i].playlists){
                    parent_id = data[i].slug;
                    root.buildTree(data[i].playlists, parent_id, level, "playlists")
                }else if (data[i].demos) {
                    parent_id = id + '-' + level + '-' + data[i].order;
                    root.buildTree(data[i].demos, parent_id, level, "demo")
               };
            }
        },

        canPublish: function(){
            var root = this;
            var can_publish = true;
            var can_publish_data = {};
            var error_message;
            var checklist_sections = this.$('.checklist_section');

            if (checklist_sections.length == 0){
                can_publish = false;
                return can_publish;
            }

            $(checklist_sections).each(function(){
                var checklist_items = root.$(this).children('.checklist_item');
                if(checklist_items.length == 0){
                    can_publish = false;
                    return can_publish;
                }
            });

            return can_publish;
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
            this.$('.edit-tool-tip').remove();
            var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
            target.append(editToolTip);
            if(elem) elem.addClass('error');
        },


        deleteEntity: function(event){
            var root = this;
            var entity_type = this.$(event.currentTarget).attr('data-type');
            this.actionInProgress();
            if(entity_type == 'checklist'){
                var slug = this.$(event.target).attr('data-checklist-slug');
                var checklist = new Checklist({id: slug});

                checklist.destroy({
                    success: function(){
                        root.actionSuccess();

                        setTimeout(function(){
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }, 2000);
                    },
                    error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }else if(entity_type == 'checklist step'){
                var checklist_section_id = this.$(event.currentTarget).attr('data-section-id');
                var checklist_section = new ChecklistSection({id: checklist_section_id});

                checklist_section.destroy({
                    success: function(){
                        root.actionSuccess();

                        setTimeout(function(){
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }, 2000);

                    },
                    error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }else if(entity_type == 'checklist item'){
                var checklist_item_id = this.$(event.currentTarget).attr('data-item-id');
                var checklist_item = new ChecklistItem({id: checklist_item_id });

                checklist_item.destroy({
                    success: function(){
                        root.actionSuccess();

                        setTimeout(function(){
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }, 2000);
                    },
                    error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }else{
                var checklist_suggestion_id = this.$(event.currentTarget).attr('data-suggestion-id');
                var checklist_suggestion = new ChecklistSuggestion({id: checklist_suggestion_id });

                checklist_suggestion.destroy({
                    success: function(){
                        root.actionSuccess();

                        setTimeout(function(){
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
                        }, 2000);
                    },
                    error: function(response){
                        root.actionFailed();
                        setTimeout(function(){
                            root.hidePopup();
                        }, 2000);
                    }
                })
            }
        },


        enableDisableChecklist: function(event){ 
            var slug = this.$(event.currentTarget).attr('data-checklist-slug');
            var is_enabled = this.$(event.currentTarget).hasClass('enable')

            this.actionInProgress();

            var checklist = new Checklist({'id': slug, 'is_enabled': is_enabled});
            var root = this;
            checklist.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    root.actionSuccess();
                    setTimeout(function(){
                        root.hidePopup();
                        Backbone.history.loadUrl(Backbone.history.fragment);
                    }, 2000);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed();
                }
            });
        },

        editEntity: function(event){
            var popupName = this.$(event.currentTarget).attr('data-popup');
            var current_event = event;
            var attrs = {};
            attrs[popupName]= true;
            var root = this;
            root.cacheChapterSuggestions(event);
            if(popupName == "checklist"){
                var checklistSlug = root.$(event.target).parents('li').attr('data-checklist-slug');
                var checklist = new Checklist({'id': checklistSlug});
                checklist.fetch({
                    success: function(model, response){
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_checklist', true);

                        root.$('.popup-box [name=title]').val(response.title);
                        var checklist_title_limit = root.CHECKLIST_TITLE_LIMIT - response.title.length;
                        root.$('#checklist_title_counter').html(checklist_title_limit + " " + Translate("characters left"));

                        root.$('.popup-box [name=description]').val(response.description);
                        var checklist_description_limit = root.CHECKLIST_DESCRIPTION_LIMIT - response.description.length;
                        root.$('#checklist_desc_counter').html(checklist_description_limit + " " + Translate("characters left"));

                        root.$('#featured .option-check').removeClass('active');
                        if(response.is_featured){
                            root.$('#featured .option-check:contains("yes")').addClass('active');
                        }else{
                            root.$('#featured .option-check:contains("no")').addClass('active');
                        }

                        if(response.icon && response.icon.url){
                            root.$('.popup-box .file-name').text(response.icon.name);
                            root.$('.popup-box .img-preview').attr('src', response.icon.url);
                            root.$('.popup-box .block:last-child').addClass('image-added');
                        }
                    }
                })
            }else if(popupName == 'checklist_section'){
                var checklistSectionId = root.$(event.target).parents('.checklist_section').attr('data-id');
                var checklist_section = new ChecklistSection({'id': parseInt(checklistSectionId)});
                checklist_section.fetch({
                    success: function(model, response){
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_checklist_section', true);
                        
                        root.$('.popup-box [name=name]').val(response.title);
                        var section_title_limit = root.SECTION_TITLE_LIMIT - response.title.length;
                        root.$('#checklist_section_title_counter').html(section_title_limit + " " + Translate("characters left"));
                    }
                })
            }else if(popupName == 'checklist_item'){

                var checklistItemId = root.$(event.target).parents('.checklist_item').attr('data-id') || root.$(event.target).attr('data-id') ;
                if(parseInt(checklistItemId)){
                    var checklist_item = new ChecklistItem({'id': parseInt(checklistItemId)});
                    checklist_item.fetch({
                        success: function (model, response) {
                           root.showPopupAttrs(current_event);
                           root.$('.popup-box').attr('edit_checklist_item', true);

                           root.$('.popup-box [name=title]').val(response.title);
                           var item_title_limit = root.ITEM_TITLE_LIMIT - response.title.length;
                           root.$('#checklist_item_title_counter').html(item_title_limit + " " + Translate("characters left"));

                           root.$('.popup-box [name=description]').val(response.description);
                           var item_description_limit = root.ITEM_DESCRIPTION_LIMIT - response.description.length;
                           root.$('#checklist_desc_counter').html(item_description_limit + " " + Translate("characters left"));
                       }
                   })
                } else {
                   root.showPopupAttrs(current_event);
                   root.$('.popup-box').attr('edit_checklist_item', false);

                   root.$('.popup-box [name=title]').val(root.item_name);
                   var item_title_limit = root.ITEM_TITLE_LIMIT - root.item_name.length;
                   root.$('#checklist_item_title_counter').html(item_title_limit + " " + Translate("characters left"));

                   root.$('.popup-box [name=description]').val(root.item_description);
                   var item_description_limit = root.ITEM_DESCRIPTION_LIMIT - this.item_description.length;
                   root.$('#checklist_desc_counter').html(item_description_limit + " " + Translate("characters left"));

                   root.$('.popup-box .selected_chapters').html(root._chapters.length + " " + Translate("chapter selected"));
               }
            }else{
                event.preventDefault();
                var checklistSuggestionId = root.$(event.target).parents('.suggested_content_wrap').attr('data-id');
                var checklist_suggestion = new ChecklistSuggestion({'id': parseInt(checklistSuggestionId)});
                checklist_suggestion.fetch({
                    success: function(model, response){
                        root.showPopupAttrs(current_event);
                        root.$('.popup-box').attr('edit_checklist_suggestion', true);

                        root.$('.popup-box [name=title]').val(response.title);
                        var suggestion_title_limit = root.SUGGESTION_TITLE_LIMIT - response.title.length;
                        root.$('#checklist_sugg_title_counter').html(suggestion_title_limit + " " + Translate("characters left"));
                    }
                })
            }
        },

        initSortable: function(event) {
            this.$(".sortable-wrap").sortable({
                handle: ".checklist_drag",
                containment: "parent",
                update: function(event, ui){
                    var suggestion_id = ui.item.attr('data-id');
                    var suggestions_order = {};

                    $(ui.item[0]).parents('.info_block').children('.sortable-wrap').children('.suggested_content_wrap').each(function(index){
                        var suggestion_id = 'suggestion_' + $(this).attr('data-id');
                        var index = parseInt(index + 1);
                        suggestions_order[suggestion_id] = index;
                    });

                    var suggestion_data = {
                        'id' : suggestion_id,
                        'suggestions_order' : suggestions_order,
                        'reorder' : true
                    };

                    var checklistSuggestion = new ChecklistSuggestion(suggestion_data);

                    checklistSuggestion.save(null, { patch: true});
                }
            });
        },

        listSuggestions: function(checklist_item){
            var root = this;
            var is_edit = this.is_edit;
            var checklist_item_elem = $('#item_' + checklist_item.checklist_item_id + ' .sortable-wrap');
            if(checklist_item_elem.length == 0){
                var sortable_div_elem = '<div class="suggestions_title">SUGGESTED CONTENT : </div>' +
                                        '<div class="sortable-wrap ui-sortable"></div>';
                 $('#item_' + checklist_item.checklist_item_id).children('.add-block').before(sortable_div_elem);
            }

            $('#item_' + checklist_item.checklist_item_id + ' .sortable-wrap').children('.suggested_content_wrap').remove();
            _.each(checklist_item.suggestions, function(suggestion, index) {
                root.$('#item_' + checklist_item.checklist_item_id + ' .sortable-wrap').append(ChecklistSuggestionTemplate({"suggestion" : suggestion, 'is_edit': is_edit}));
                var attrs = {};
                attrs.edit_checklist = true;
                attrs.checklist_edit_suggestion = true;
                if(suggestion.suggestion_type == 'external_link'){
                    attrs.is_external_link = true;
                }
                root.$('.suggested_content_wrap[data-id="' + suggestion.suggestion_id + '"] .suggested_content').append(EditTemplate(attrs));
                root.initSortable();
            });
        },

        modifyEditedBlock: function(entity_type, block_id, response){
            if(entity_type == 'checklist'){
                var checklist_elem = $('li[data-checklist-slug="' + block_id + '"]').children('.checklist_wrap');

                this.$(checklist_elem).children('.banner').children('label').html(response.title);

                this.$(checklist_elem).children('.info_block').children('.title').html(response.title);
                this.$(checklist_elem).children('.info_block').children('.description').html(response.description);
                this.$(checklist_elem).children('.info_block').children('.explore').attr('data-slug', response.slug);

                this.$(checklist_elem).children('.footer').children('.description').html(response.description);
                this.$(checklist_elem).children('.footer').children('.counts').html(response.items_count + ' Checks');

                if(response.icon){
                    this.$(checklist_elem).children('.banner').children('img').attr('src', '/static/media/' + response.icon.path);
                }else{
                    this.$(checklist_elem).children('.banner').children('img').attr('src', '/static/images/checklist-banner1.png');
                }

                this.$(checklist_elem).parents('li').attr('data-checklist-slug', response.slug);
            }else if(entity_type == 'checklist_section'){
                var checklist_section_elem = $('.checklist_section[data-id="' + block_id + '"]');

                this.$(checklist_section_elem).children('.steps_title').children('.title').html(response.title);
            }else{
                var checklist_item_elem = $('.checklist_item[data-id="' + block_id + '"]');

                this.$(checklist_item_elem).children('.head').children('.title').html(response.title);
                this.$(checklist_item_elem).children('.info_block').children('.text').html(response.description);
            }
        },

        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        previewChecklist: function(event){
            window.open(window.location.href.replace('edit', 'preview'),'_blank')
        },

        previewImage: function(event){
            this.removeErrorMessages();
            var image = event.target.files[0];
            if (!image || !(/\.(gif|jpg|jpeg|tiff|png)$/i).test(image.name)) {
                return false;
            }
            this.$(event.currentTarget).parents('.block').find('.file-name').text(image.name);
            this.$('.img-preview').attr('src', URL.createObjectURL(image)).removeAttr('data-remove');
            this.$(event.currentTarget).parents('.block').addClass('image-added');
        },

        publishChecklist: function(event){
            var root = this;
            var can_publish = this.canPublish();

            if (!can_publish) {
                this.hidePopup();
                var attrs = {};
                attrs.alert = true;
                attrs.alert_message =  'One or More Steps are not completed';
                this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
                this.$('.popup-overlay').addClass('active');
                this.overlayCalc();
                return;
            }
            this.actionInProgress();
            var checklist_data = {
                'id' : $('.checklist_header').attr('data-id'),
                'publish' : true
            }
            this.checklist = new Checklist(checklist_data);
            setTimeout(function(){
                root.checklist.save(null, {
                    patch: true,
                    success: function(response, xhr, status){
                        root.actionSuccess();
                        setTimeout(function(){
                            root.hidePopup();
                            Backbone.history.loadUrl(Backbone.history.fragment);
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
            this.$('input, textarea').removeClass('error')
        },

        removeImage: function(event){
            this.$(event.currentTarget).parents('.block').removeClass('image-added');
            this.$('.img-preview').removeAttr('src').removeAttr('style').attr('data-remove', true);
            this.$('.upload-file').val('');
        },

        removeExternalLink: function(e){
            this.$(e.currentTarget).parents('.url_unfurling_block').remove()
            if(this.$('.url_unfurling_block').length == 0){
                this.$('#link_chapter').attr('disabled', false);
            }
        },

        saveChecklist: function(checklist_data, checklist_object, edit_checklist){
            var root = this;
            this.is_edit_checklist = edit_checklist;

            this.checklist = checklist_object;
            setTimeout(function(){
                root.checklist.save(
                    null, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: checklist_data,
                        success: function(response){
                            root.actionSuccess();

                            var response = response.attributes;
                            var checklist_slug = response.slug;

                            if(root.is_edit_checklist == undefined){
                                root.$('ul.checklists.featured_list').append(ChecklistBlockTemplate({'checklist' : response, 'is_edit' : true}));

                                var attrs = {};
                                attrs.edit_checklist = true;
                                attrs.checklist_edit = true;
                                root.$('li[data-checklist-slug="' + checklist_slug + '"] .checklist_wrap').append(EditTemplate(attrs));
                            }else{
                                root.modifyEditedBlock('checklist', response.id, response);
                            }

                            setTimeout(function(){
                                root.hidePopup();
                                Backbone.history.loadUrl(Backbone.history.fragment);
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

        saveChecklistItem: function(checklist_item_object, edit_checklist_item, checklist_section_id){
            var root = this;
            this.is_edit_checklist_item = edit_checklist_item;
            this.checklist_section_id = checklist_section_id;
            this.checklist_item = checklist_item_object;

            setTimeout(function(){
                root.checklist_item.save(null, {
                        success: function(response){
                            root.actionSuccess();

                            var response = response.attributes;
                            var checklist_item_id = response.checklist_item_id;

                            if(root.is_edit_checklist_item == undefined){
                                var attrs = {};
                                attrs.checklist_item = response;
                                var checklist_section_elem = root.$('.checklist_section[data-id="' + root.checklist_section_id + '"]');
                                root.$(checklist_section_elem).children('.add-block').before(ChecklistItemBlockTemplate(attrs));
                                
                                attrs = {};
                                attrs.edit_checklist = true;
                                attrs.checklist_edit_item = true;
                                root.$(checklist_section_elem).children('.checklist_item[data-id="' + checklist_item_id + '"]').children('.head').append(EditTemplate(attrs));
                                attrs = {};
                                attrs.add_suggestion = true;
                                root.$(checklist_section_elem).children('.checklist_item[data-id="' + checklist_item_id + '"]').children('.info_block').append(EditTemplate(attrs));
                                root.saveLinkSuggestions(checklist_item_id);
                            }else{
                                root.modifyEditedBlock('checklist_item', response.id, response);
                            }

                            setTimeout(function(){
                                root.hidePopup();
                                Backbone.history.loadUrl(Backbone.history.fragment);
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

        saveChecklistSection: function(checklist_section_object, edit_checklist_section){
            var root = this;

            setTimeout(function(){
                checklist_section_object.save( null, {
                        success: function(response){
                            root.actionSuccess();
                            setTimeout(function(){
                                root.hidePopup();
                                Backbone.history.loadUrl(Backbone.history.fragment);
                                Backbone.trigger("checklist_rendered", root);
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

        saveEditedSuggestion: function(event){
            var root = this;
            var checklistSuggestionId = this.$(event.target).attr('data-id');
            var checklistSuggestionTitle = this.$('textarea[name="title"]');

            var errorFlag = false;
            if (!checklistSuggestionTitle.val()) {
                this.customErrorMessage('Provide a title for the suggestion', this.$(checklistSuggestionTitle).parent(), this.$(checklistSuggestionTitle));
                errorFlag = true;
            }

            if (errorFlag) return false;

            var checklist_suggestion_data = {
                'id': checklistSuggestionId,
                'title': checklistSuggestionTitle.val()
            }

            var checklist_suggestion = new ChecklistSuggestion(checklist_suggestion_data);
            this.actionInProgress();

            setTimeout(function(){
                checklist_suggestion.save(null, {
                        success: function(response){
                            root.actionSuccess();

                            var response = response.attributes;

                            var suggestion_elem = root.$('.suggested_content_wrap[data-id="' + response.id + '"]').children('.suggested_content');
                            root.$(suggestion_elem).children('.suggested_content_info').children('.desc').html(response.title);

                            setTimeout(function(){
                                root.hidePopup();
                                Backbone.history.loadUrl(Backbone.history.fragment);
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

        saveLinkSuggestions: function(checklistItemId){
            var checklistItem = new ChecklistItem();

            var suggestionType = this.$('.suggetsion_type input:checked').attr('id')

            var root = this;
            var attrs = {'id': checklistItemId};
            attrs['suggestions'] = {}

            var hasSuggestions = $('.suggestion_group').length || $('.pf-suggestion-demo').length;

            if (!hasSuggestions){
                attrs['suggestions']['message'] = {'title': this.$('.pf-suggestion h2').text(), 'body': this.$('.pf-suggestion p').text()}
            }

            var externalLinks = [];

            if (suggestionType == 'link_external'){
                var totalExternalLinkEles = this.$('.url_unfurling_block');
                _.each(totalExternalLinkEles, function(element, index) {
                    externalLinks.push(totalExternalLinkEles.eq(index).data('response'))
                });

                if (!externalLinks.length) return;
                this.actionInProgress('add_suggestions');
                attrs['suggestions']['external_links'] = externalLinks
            }

            attrs['suggestions']['chapters'] = this._chapters;

            if((this._chapters.length > 0) || externalLinks.length != 0) {

                checklistItem.save(attrs, {
                    patch: true,
                    success: function (model, response) {
                        root.actionSuccess();
                        root.listSuggestions(response);
                    }
                })
            }
            this.clearChapterCache();
        },

        goBack: function(event){

            var checklistItemId = this.$('.save').attr('data-id');
            if((parseInt(checklistItemId))){
                this.$(event.currentTarget).attr('data-popup', 'checklist_item');
                this.$(event.currentTarget).attr('data-id', checklistItemId);
                this.editEntity(event);
            } else {
                this.$(event.currentTarget).attr('data-popup', 'checklist_item');
                this.editEntity(event);
                this.$('.popup-box [name=title]').val(this.item_name);
                var checklist_item_title_char_count = root.ITEM_TITLE_LIMIT - this.item_name.length;
                this.$('#checklist_item_title_counter').html(checklist_item_title_char_count + ' Characters Left');

                this.$('.popup-box [name=description]').val(this.item_description);
                var checklist_item_desc_char_count = root.ITEM_DESCRIPTION_LIMIT - this.item_description.length;
                this.$('#checklist_desc_counter').html(checklist_item_desc_char_count + ' Characters Left');
            }
        },

        saveSuggestionsNewItem: function (event) {
            var root = this;
            root.actionInProgress();

            setTimeout(function () {
                root.$(event.currentTarget).attr('data-popup', 'checklist_item');
                root.cacheChapterSuggestions(event);
                root.showPopupAttrs(event);

                root.$('.popup-box [name=title]').val(root.item_name);
                var item_title_limit = root.ITEM_TITLE_LIMIT - root.item_name.length;
                root.$('#checklist_item_title_counter').html(item_title_limit + " " + Translate("characters left"));

                root.$('.popup-box [name=description]').val(root.item_description);
                var item_description_limit = root.ITEM_DESCRIPTION_LIMIT - root.item_description.length;
                root.$('#checklist_desc_counter').html(item_description_limit + " " + Translate("characters left"));

                if(root._chapters.length){
                    root.$('.popup-box .selected_chapters').html(root._chapters.length + " " + Translate("chapter selected"));
                } else {
                    root.$('.popup-box .selected_chapters').html('');
                }
            }, 2000);
        },

        saveSuggestions: function(event){
            var checklistItemId = this.$(event.target).attr('data-id');

            if(!(parseInt(checklistItemId))){
                this.saveSuggestionsNewItem(event);
                return;
            }

            var checklistItem = new ChecklistItem();

            var suggestionType = this.$('.suggetsion_type input:checked').attr('id')

            var root = this;
            var attrs = {'id': checklistItemId};
            attrs['suggestions'] = {};

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
                var selectedChapters = this.$('.css-checkbox:checked');
                var _chapters = _.map(selectedChapters, function(elem){return elem.value;});

                if(!selectedChapters.length) return;
                this.actionInProgress('add_suggestions');
                attrs['suggestions']['chapters'] = _chapters
            }

            checklistItem.save(attrs,{
                patch: true,
                success: function(model, response){
                    root.actionSuccess();

                    root.listSuggestions(response);

                    setTimeout(function(){
                        root.hidePopup();
                        Backbone.history.loadUrl(Backbone.history.fragment);
                    }, 2000);
                }, 
                error: function(xhr, status_code, error_message){
                    root.actionFailed('add_suggestions');
                }
            })
        },

        showAdvanced: function(event){
            this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
            setTimeout(function(){
                this.$('.popup-box .content-block').animate({scrollTop :750},'slow');
            }, 100);
        },

        showPopupAttrs: function(event){
            event.preventDefault();
            if(typeof this.$(event.currentTarget).attr('class')!= "undefined") {
                var target_class = this.$(event.currentTarget).attr('class').split(' ').reverse()[0];
                if (target_class != 'delete' && target_class != 'edit' && target_class != 'publish-checklist') {
                    if (!Common.isDefaultLocale(this)) {
                        this.overlayCalc();
                        return;
                    }
                }
            }
            var popupName = this.$(event.currentTarget).attr('data-popup');
            var popupType = this.$(event.currentTarget).attr('data-type');
            var attrs ={};
            attrs[popupName] = true;
            attrs['entity_type'] = popupType;

            var checklist_slug = this.$(event.currentTarget).parents('li').attr('data-checklist-slug');
            if(checklist_slug !== undefined){
                attrs['checklist_slug'] = checklist_slug;
            }

            var checklist_section_id = this.$(event.currentTarget).parents('.checklist_section').attr('data-id') || this.section_id;
            if(checklist_section_id !== undefined){
                attrs['section_id'] = checklist_section_id;
            }

            var checklist_item_id = this.$(event.currentTarget).parents('.checklist_item').attr('data-id');
            if(checklist_item_id !== undefined){
                attrs['item_id'] = checklist_item_id;
            }

            var checklist_suggestion_id = this.$(event.currentTarget).parents('.suggested_content_wrap').attr('data-id');
            if(checklist_suggestion_id !== undefined){
                attrs['suggestion_id'] = checklist_suggestion_id;
            }

            if(popupName == 'checklist_section'){
                var is_edit = this.$(event.currentTarget).hasClass('edit');
                if(is_edit){
                    attrs.index = this.$(event.takrget).parents('.steps_title').children('.index').html();
                }else{
                    attrs.index = this.$('.checklist_section').length + 1;
                }
            }

            if(this.$(event.currentTarget).hasClass('edit')){
                attrs.is_edit = true;
            }

            if(this.$(event.currentTarget).hasClass('delete')){
                attrs.entity_type = popupType.replace('-', ' ');
            }

            if(popupName == 'checklist_suggestion'){
                this.$('.footer .save').text('SAVE').removeClass('suggestions_selected');
            }

            var data_id = $(event.target).attr('data-id');
            if(data_id){
                attrs['item_id'] = data_id;
            }

            this.showPopup(attrs);
        },

        showPopup: function(attrs){
            this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            this.$('.popup-overlay').addClass('active');
            this.overlayCalc();
        },

        submitChecklist: function(event){
            var checklistTitle = this.$('input[name="title"]');
            var checklistDescription = this.$('textarea[name="description"]');
            var iconFile = this.$('.popup-box :file')[0].files[0];

            var errorFlag = false;
            if (!checklistTitle.val()) {
                this.customErrorMessage('Provide a title for the checklist', this.$(checklistTitle).parent(), this.$(checklistTitle));
                errorFlag = true;
            }

            if (errorFlag) return false;

            this.removeErrorMessages();

            var iconFile = this.$('input[name="upload-file"]').val() ? this.$('.popup-box :file')[0].files[0] : null;

            var checklistData = new FormData();
            checklistData.append('title', checklistTitle.val());
            checklistData.append('description', checklistDescription.val());
            checklistData.append('icon', iconFile);
            if(this.$('#featured .option-check.active').html() == 'yes'){
                checklistData.append('is_featured', true);
            }
            checklistData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

            this.actionInProgress();

            var editChecklist = this.$('.popup-box').attr('edit_checklist');
            if(editChecklist){
                var removeIcon = this.$('.img-preview').attr('data-remove');
                var checklistSlug = this.$(event.currentTarget).attr('data-id');
                if(removeIcon){
                    checklistData.append('remove_icon', removeIcon);
                }
                var checklist = new Checklist({'id' : checklistSlug});
                this.saveChecklist(checklistData, checklist, editChecklist);
            }else{
                var checklist = new Checklist();
                this.saveChecklist(checklistData, checklist, editChecklist);
            }
        },

        submitChecklistSection: function(event){
            var checklistSectionTitle = this.$('input[name="name"]');
            var checklistSlug = this.$('.checklist_header').attr('data-id');

            var errorFlag = false;
            if (!checklistSectionTitle.val()) {
                this.customErrorMessage('Provide a title for the checklist section', this.$(checklistSectionTitle).parent(), this.$(checklistSectionTitle));
                errorFlag = true;
            }

            if (errorFlag) return false;

            this.removeErrorMessages();

            var checklistSectionData = {
                'title' : checklistSectionTitle.val(),
                'checklist_slug' : checklistSlug
            }

            this.actionInProgress();

            var editChecklistSection = this.$('.popup-box').attr('edit_checklist_section');
            if(editChecklistSection){
                var checklistSectionId = this.$(event.currentTarget).attr('data-id');
                checklistSectionData['id'] = checklistSectionId
                var checklistSection = new ChecklistSection(checklistSectionData);
                this.saveChecklistSection(checklistSection, editChecklistSection);
            }else{
                var checklistSection = new ChecklistSection(checklistSectionData);
                this.saveChecklistSection(checklistSection, editChecklistSection);
            }
        },

        submitChecklistItem: function(event){
            var checklistItemTitle = this.$('input[name="title"]');
            var checklistItemDescription = this.$('textarea[name="description"]');
            var checklistSectionId = this.$(event.target).attr('section-id');

            var errorFlag = false;
            if (!checklistItemTitle.val()) {
                this.customErrorMessage('Provide a title for the checklist item', this.$(checklistItemTitle).parent(), this.$(checklistItemTitle));
                errorFlag = true;
            }
            if (errorFlag) return false;

            this.removeErrorMessages();

            var checklistItemData = {
                'title': checklistItemTitle.val(),
                'description': checklistItemDescription.val(),
                'checklist_section_id': checklistSectionId
            }

            this.actionInProgress();

            var editChecklistItem = this.$('.popup-box').attr('edit_checklist_item');
            if(editChecklistItem){
                var checklistItemId = this.$(event.currentTarget).attr('data-id');
                checklistItemData['id'] = checklistItemId;
                var checklistItem = new ChecklistItem(checklistItemData);
                this.saveLinkSuggestions(checklistItemId);
                this.saveChecklistItem(checklistItem, editChecklistItem, checklistSectionId);
            }else{
                var checklistItem = new ChecklistItem(checklistItemData);
                this.saveChecklistItem(checklistItem, editChecklistItem, checklistSectionId);
            }
        },

        switchOption: function(event){
            this.$(event.currentTarget).parent().find('.option-check').removeClass('active');
            this.$(event.currentTarget).addClass('active');
        },

        switchSuggestionType: function(event){
            this.$('.content_suggestion').addClass('disabled')
            this.$(event.currentTarget).siblings('.content_suggestion').removeClass('disabled');
            var suggestionType = this.$(event.currentTarget).attr('id');
            if(suggestionType == 'link_external'){
                $('.suggestion_link').attr('disabled', false);
            }else{
                $('.suggestion_link').attr('disabled', true);
            }
            $('.suggestion_link').removeClass('error');
        },

        toggleTreeContent: function(event){
            if(!this.$(event.currentTarget).hasClass('category') || this.$(event.currentTarget).hasClass('demo')) return;

            if (this.$(event.currentTarget).hasClass('closed')) {
                this.$(event.currentTarget).siblings().show();
                this.$(event.currentTarget).removeClass('closed').addClass('open');
            }else{
                this.$(event.currentTarget).siblings().hide();
                this.$(event.currentTarget).removeClass('open').addClass('closed');
            }
        },

        updateAddButtonText: function(){
            var suggestionsCount = this.$('.css-checkbox:checked').length;
            if (suggestionsCount>0) {
                this.$('.footer .save').text('ADD ' + suggestionsCount + " SUGGESTED CHAPTER").addClass('suggestions_selected');
            } else {
                this.$('.footer .save').text('SAVE').removeClass('suggestions_selected');
            }
        },

        updateAddStepText: function () {
            var steps = this.$('.checklist_step_wrap .checklist_section').length + 1;
            $(".add-block[data-popup='checklist_section'] h3").text('add step ' + steps.toString());
        }

    });

    return EditView;
});
