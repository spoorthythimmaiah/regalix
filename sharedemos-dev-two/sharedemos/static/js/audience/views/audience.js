/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',
        '../models/audience_company',
        '../models/audience_employee',
        '../../tenant/models/product-tree',
        '../../tenant/models/url_unfurl',
        '../templates/audience_list.handlebars',
        '../templates/overlay.handlebars',
], function (_, $, Backbone, Common, AudienceCompany, AudienceEmployee, ProductTree, WebsiteInfo, AudienceList, Overlay) {
    'use strict';

    var AudienceHomeView = Backbone.View.extend({

        el: '#audience_page',
        MESSAGE_LIMIT: 1000,

        events: {
            // company events
            'click .add-new.company, .company_details .company_edit': 'addEditCompany',
            'click #audience_overlay .create_profile.active': 'saveCompany',
            'keyup .add_company_modal input, .add_company_modal textarea': 'validateCompany',
            'click .goto_message.active': 'proceedToMessage',
            'click .backto_name': 'goToName',
            'click .cp_delete': 'confirmDeleteCompany',
            'click .delete_company_warning .delete': 'deleteCompany',

            // employee events
            'click .add_employee.new, .employee_details .edit': 'addEditEmployee',
            'click #audience_overlay .add_employee.active': 'saveEmployee',
            'keyup .add_employee_modal input': 'validateEmployee',
            'click .employee_details .delete': 'confirmDeleteEmployee',
            'click .delete_user_warning .delete': 'deleteEmployee',

            // share content events
            'click .browse_library': 'browseLibrary',
            'click #select-share-category input[type=checkbox]': 'pickContent',
            'click .choose_share_content_popup .choose': 'selectContent',
            'click .share_content.active, .link_expiry': 'startShare',
            'click .share_content_popup .share': 'shareContent',
            'click #select-share-category .category': 'toggleTreeContent',

            // miscellaneous events
            'keyup input[type=url]': Common.updateUrl,
            'click .add_company_modal .close, .add_employee_modal .close, .share_content_popup .cancel, .delete_user_warning .cancel, .delete_company_warning .cancel': 'resetUI',
            'click .choose_share_content_popup .cancel, .choose_share_content_popup .back': 'backToShareHome',
        },

        initialize: function() {
            $(window).on('resize', {'root': this}, this.modalHeightCalc);
            this.render();
        },

        // Company related functions
        render : function(){
            this.resetUI();
            var audiences_list = new AudienceCompany();
            var root = this;
            audiences_list.fetch({
                success: function(model, response){
                    root.$el.find('#audience_list').html(AudienceList({'audiences': response}));
                    root.loadInitials();
                }
            });
            this.modalHeightCalc();
            return this;
        },

        addEditCompany: function(event){
            this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]') && this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
            if(this.audience_id){
                this.audience = new AudienceCompany({'id': this.audience_id});
                var root = this;
                this.audience.fetch({
                    success: function(model, response){
                        response.is_company = true;
                        response.is_editing = true;
                        response.message_limit = root.MESSAGE_LIMIT;
                        root.$('#audience_overlay').html(Overlay(response)).addClass("add_company");
                    }
                });
            }else{
                this.$('#audience_overlay').html(Overlay({'is_company': true, message_limit: this.MESSAGE_LIMIT})).addClass("add_company");
            }
        },

        saveCompany: function(event){
            if(!this.$(event.currentTarget).hasClass('active')) return;
            var name = this.$("#audience_overlay .add_company_modal").find('input[name=name]').val().trim();
            var website = this.$("#audience_overlay .add_company_modal").find('input[name=website]').val().trim();
            var message = this.$("#audience_overlay .add_company_modal").find('textarea[name=message]').val().trim();

            var attrs = {
                'name': name,
                'website': website,
                'message': message,
                'icon': this.$('.add_company_modal input[type=url]').attr('data-icon')
            }
            if(this.audience_id){
                attrs.id = this.audience_id
            }
            var audience = new AudienceCompany(attrs);
            var root = this;
            this.$(event.currentTarget).removeClass('active');
            audience.save({}, {
                success: function(){
                    root.render();
                }
            })
        },

        validateCompany: function(event){
            var validated = true;
            if((["name", "website"]).indexOf(this.$(event.currentTarget).attr('name')) !== -1){
                if (this.$(event.currentTarget).attr('name') == "name") {
                    if (!event.currentTarget.value.trim().length) validated = false;
                    if(!Common.validateUrl(this.$(event.currentTarget).parents('.tab_block').find('input[name=website]').val())) validated = false;
                }
                if (this.$(event.currentTarget).attr('name') == "website") {
                    if(!this.$(event.currentTarget).parents('.tab_block').find('input[name=name]').val().length) validated = false;
                    if(!Common.validateUrl(event.currentTarget.value)) validated = false;
                }
                if(validated){
                    this.$('.goto_message').addClass('active');
                } else {
                    this.$('.goto_message').removeClass('active');
                }
            } else if(this.$(event.currentTarget).attr('name') == "message"){
                if (event.currentTarget.value.trim().length) {
                    this.$('.create_profile').addClass('active')
                } else {
                    this.$('.create_profile').removeClass('active')
                }
                var textLength = parseInt(this.$(event.currentTarget).attr('maxlength')) - this.$(event.currentTarget).val().length;
                this.$(event.currentTarget).parent('.block').find('.counter span').text(textLength);
            }
        },

        proceedToMessage: function(event){
            if(!this.$(event.currentTarget).hasClass('active')) return;
            this.$('.add_company_modal input[type=url]').siblings('.error').text("");
            var url = this.$('.add_company_modal input[type=url]').val();
            if(this.audience && this.audience.get('website_url') == url){
                this.$('.add_company_modal input[type=url]').attr('data-icon', this.audience.get('logo_file_name'))
                var target = this.$(event.currentTarget).attr('data-target');
                this.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
                this.$('.tab_menu_wrap .menu[data-target="'+ target +'"], .tab_block[data-target="'+ target +'"]').addClass('active');
            }else{
                var website_info = new WebsiteInfo();
                var root = this;
                website_info.fetch({
                    data: {external_url: encodeURI(url)},
                    success: function (model, response) {
                        root.$('.add_company_modal input[type=url]').val(response.url||url).attr('data-icon', response.icon_name||"")
                        var target = root.$(event.currentTarget).attr('data-target');
                        root.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
                        root.$('.tab_menu_wrap .menu[data-target="'+ target +'"], .tab_block[data-target="'+ target +'"]').addClass('active');  
                    },
                    error: function(model, response, options){
                        root.$('.add_company_modal input[type=url]').siblings('.error').text(response.responseJSON.message);
                    }
                    
                });
            }
        },

        goToName: function(event){
            var target = this.$(event.currentTarget).attr('data-target');
            this.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
            this.$('.tab_menu_wrap .menu[data-target="'+ target +'"],\
                   .tab_block[data-target="'+ target +'"], .tab_block[data-target="'+ target +'"] .goto_message').addClass('active');
        },

        confirmDeleteCompany: function(event){
            this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
            this.$('#audience_overlay').html(Overlay({'is_company_delete': true})).addClass("delete_company_warning_active");
        },

        deleteCompany: function(){
            var audience = new AudienceCompany({id: this.audience_id});
            this.actionInProgress('delete_company_warning')
            var root = this;
            audience.destroy({
                success: function(){
                    root.actionSuccess('delete_company_warning');
                    setTimeout(function(){
                        root.render();
                    }, 1500)
                },
                error: function(){
                    root.actionFailed('delete_company_warning');
               } 
            })
        },

        // Employee related functions
        addEditEmployee: function(event){
            this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
            this.employee_id = this.$(event.currentTarget).parent().attr('data-employee-id');
            if(this.employee_id){
                var employee = new AudienceEmployee({
                    'id': this.employee_id,
                    'audience_id': this.audience_id
                });
                var root = this;
                employee.fetch({
                    success: function(model, response){
                        response.is_employee = true;
                        response.is_editing = true;
                        root.$('#audience_overlay').html(Overlay(response)).addClass("add_employee");
                    }
                })
            }else{
                this.$('#audience_overlay').html(Overlay({'is_employee': true})).addClass("add_employee");
            }
        },

        saveEmployee: function(event){
            if(!this.$(event.currentTarget).hasClass('active')) return;
            this.$(".add_employee_modal").find('.error').text("");
            var fname = this.$(".add_employee_modal").find('input[name=firstName]').val().trim();
            var lname = this.$(".add_employee_modal").find('input[name=lastName]').val().trim();
            var email = this.$(".add_employee_modal").find('input[name=email]').val().trim();

            var attrs = {
                'first_name': fname,
                'last_name': lname,
                'email': email,
                'audience_id': this.audience_id
            }
            if(this.employee_id){
                attrs.id = this.employee_id
            }
            var employee = new AudienceEmployee(attrs);
            var root = this;
            this.$(event.currentTarget).removeClass('active');
            employee.save({}, {
                success: function(){
                    root.render();
                }, error: function(model, response, options){
                    console.log("Save employee failed:", model, response, options)
                    if(response.responseJSON && response.responseJSON.message == 'EXISTS'){
                        root.$(".add_employee_modal").find('input[name=email]').siblings('.error').text('User with given email already exists!!');
                    }
                    root.$(event.currentTarget).addClass('active');
                }
            })
        },

        validateEmployee: function(event){
            var validated = true;
            var fname = this.$(".add_employee_modal").find('input[name=firstName]').val().trim();
            var lname = this.$(".add_employee_modal").find('input[name=lastName]').val().trim();
            var email = this.$(".add_employee_modal").find('input[name=email]').val().trim();
            if(!fname || !lname || !email || !Common.validateEmail(email)){
                validated = false;
            }
            if(validated){
                this.$('.add_employee').addClass('active')
            }else{
                this.$('.add_employee').removeClass('active');
            }
        },

		confirmDeleteEmployee: function(event){
            this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
            this.employee_id = this.$(event.currentTarget).parent().attr('data-employee-id');
            this.$('#audience_overlay').html(Overlay({'is_employee_delete': true})).addClass("delete_user_warning_active");
        },

        deleteEmployee: function(){
            var employee = new AudienceEmployee({
                id: this.employee_id,
                audience_id: this.audience_id
            });
            this.actionInProgress('delete_user_warning');
            var root = this;
            employee.destroy({
                success: function(){
                    root.actionSuccess('delete_user_warning');
                    setTimeout(function(){
                        root.render();
                    }, 1500)
                },
                error: function(){
                    root.actionFailed('delete_user_warning');
               }
            })
        },

        // Share related functions
        browseLibrary: function(){
            this.$('#audience_overlay').removeClass('share_content_active').addClass('choose_share_content_active');
            this.$('#select-share-category').html("");
            this.modalHeightCalc();
            var root = this;
            var tree = new ProductTree();
            tree.fetch({
                data: {get_cache: 'False', author: 1},
                success: function(model, response){
                    root.selected_categories = root.$('.share_content_popup .category_selected').data('selected_categories');
                    root.buildTree(response, "select-share-category", 0, "section");
                    root.updateSelectCount();
                },
                error: function(xhr, status_code, message){
                    console.log("tree fetch error:", xhr, status_code, message)
                }
            });
        },

        backToShareHome: function(){
            this.$('#audience_overlay').removeClass('choose_share_content_active').addClass('share_content_active');
            this.$('.choose_share_content_popup .choose').removeClass('selected').text('CHOOSE');
        },

        startShare: function(event){
            this.audience_id = this.$(event.target).parents('.company_profile[data-audience-id]').attr('data-audience-id');
            this.audience = new AudienceCompany({id: this.audience_id});
            var root = this;
            this.audience.fetch({
                success: function(model, response){
                    root.$('#audience_overlay').html(Overlay({'is_share': true})).addClass("share_content_active");
                    var count = "";
                    if(response.sections.length){
                        count = response.sections.length + (response.sections.length==1?' CATEGORY':' CATEGORIES') + ' SELECTED';
                    }
                    root.$('.share_content_popup .category_selected').text(count).data('selected_categories', response.sections);
                    root.$('.expire_date').datepicker({
                        language: 'en',
                        dateFormat: "mm-dd-yyyy",
                        minDate: new Date(),
                        clearButton: true,
                        onSelect: function(selectedDate){
                            root.$('.expire_date').datepicker().data('datepicker').hide();
                        }
                    });
                    if(response.expire_at){
                        root.$('.expire_date').datepicker().data('datepicker').selectDate(new Date(response.expire_at));
                    }
                },
                error: function(xhr, status_code, message){
                    console.log("audience fetch error:", xhr, status_code, message)
                }
            });
        },

        shareContent: function(){
            var audience = new AudienceCompany();
            this.actionInProgress('share_content_popup');
            var root = this;
            audience.save({
                id: this.audience_id,
                section_list: this.$('.share_content_popup .category_selected').data('selected_categories'),
                link_expiry_date: this.$('.expire_date').val()
            }, {
                patch: true,
                success: function(model, response){
                    root.actionSuccess('share_content_popup');
                    setTimeout(function(){
                        root.render();
                    }, 1500)
                },
                error: function(){
                    root.actionFailed('share_content_popup');
                }
            })
        },

        pickContent: function(event){
            var level = this.$(event.target).parent().parent().attr('class').split(" ")[1].substr("5");
            level = parseInt(level);
            var root = this;
            for(var i=level-1;i>=1;i--) {
                root.$(event.target).parents(".level" + i).children('.category').find('.css-checkbox').attr('checked', false);
            };
            if (!this.$(event.target).parent().hasClass('no-child')) {
                this.$(event.target).parent().parent().find(".css-checkbox:gt(0)").attr('checked', false);
            };
            this.updateSelectCount();
        },

        updateSelectCount: function(){
            var total_selected = this.$('.choose_share_content_popup input[type=checkbox]:checked').length;
            if(total_selected){
                var count = 'CHOOSE ' + total_selected + (total_selected==1?' CATEGORY':' CATEGORIES');
                this.$('.choose_share_content_popup .choose').text(count).addClass('selected');
            }else{
                this.$('.choose_share_content_popup .choose').text('CHOOSE').removeClass('selected');
            }
        },

        selectContent: function(){
            var selected_list = this.$('.choose_share_content_popup input[type=checkbox]:checked');
            var _sections = _.map(selected_list, function(el){return el.value});
            var count = "";
            if(selected_list.length){
                count = selected_list.length + (selected_list.length==1?' CATEGORY':' CATEGORIES') + ' SELECTED';
            }
            this.$('.share_content_popup .category_selected').text(count).data('selected_categories', _sections);
            this.backToShareHome();
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

        /**** Miscellaneous functions ****/

        // reset UI/close all popups
        resetUI: function(){
            this.audience_id = this.audience = null;
            this.employee_id = null;
            this.$('#audience_overlay').empty().removeAttr("class");
        },

        // popup height calculation
        modalHeightCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('#select-share-category, .popup-box .content-block').css({
                "max-height": windowHeight
            })
        },

        // share tree builder
        buildTree: function(data, id, level, type){
            var root = this;
            level += 1;
            for (var i = 0; i < data.length; i++) {
                if (type == "section") {
                    var input;
                    if(_.indexOf(root.selected_categories, data[i].slug) !== -1){
                        input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value="+ data[i].slug +" class='css-checkbox' checked/>"
                    }else{
                        input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value="+ data[i].slug +" class='css-checkbox' />"
                    }
                    var html = "<div id=" + data[i].slug + " data-item='section' class='category-list level" + level + "'>\
                                    <div class='category closed'>\
                                        <span class='icon'></span>" + data[i].name + input +"\
                                            <label for='ch-" + data[i].slug + "' class='css-label'></label>\
                                    </div>\
                                </div>"
                } else if(type == "playlists"){
                    var html = "<div id='" + id + "-" + level + "-" + data[i].order + "' data-item='playlist' class='category-list level" + level + "'>\
                                    <div class='playlist'><span class='icon'></span>" + data[i].name + "</div>\
                                </div>"
                } else {
                    var html = "<div class='category-list level" + level + "' data-item='chapter'>\
                                    <div class='demo'><span class='icon'></span>" + data[i].name + "</div>\
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

        // Action Status
        actionInProgress: function(target){
            this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
        },

        actionSuccess: function(target){
            var root = this;
            setTimeout(function(){
                root.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
                root.$('.' + target + ' .form-sent').addClass("slide-in");
                setTimeout(function(){
                    root.$('.' + target + ' .form-sent').removeClass("slide-in");
                }, 1000);
            },1000)
        },

        actionFailed: function(target){
            var root = this;
            setTimeout(function(){
                root.$('.' + target + ' .form-sending').removeClass("slide-in");
                root.$('.' + target + ' .form-failed').addClass("slide-in");
                setTimeout(function(){
                    root.$('.' + target + ' .form-failed').removeClass("slide-in");
                }, 1000);
            }, 1000);
        },

        loadInitials: function(){
            this.$('img.profile-img').attr({
                'data-height': 34,
                "data-width": 34,
                "data-char-count": 2,
                "data-font-size": 14
            }).initial().css({'border-radius': '50px', '-moz-border-radius': '50px'});
        }

    });
    
    return AudienceHomeView;
});
