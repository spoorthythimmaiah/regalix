/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../tenant/common',  
        '../templates/home.handlebars',
        '../templates/group_list.handlebars',
        '../templates/group.handlebars',
        '../models/group',
        'utils',
], function (_, $, Backbone, Common, HomeTemplate, GroupListTemplate, GroupTemplate, Group) {
    'use strict';

    var FaqView = Backbone.View.extend({

        el: '#main_container',

        events: {
            'click .faq-item .arrow' : 'toggleFaqInfo',
            'click .return-home' : 'backToHome',
        },

        initialize: function(group_id) {
            this.$("#search-terms").on('keyup', {'root': this, 'common': Common}, Common.showSearchBox);
            this.$("#search-label").on('click', {'root': Common}, Common.showMobileSearchBox);
            this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {'root': Common}, Common.closeSearchBox);
            this.$(".search-input-cancel").on('click', {'root': Common}, Common.clearInputText);
            if(group_id){
                this.renderGroup(group_id)
            }else{
                this.renderHome();
            }
        },

        renderHome: function(){
            utils.setSEOData(document.app_name, window.location.href);
            var root = this;
            this.group = null;
            var groups = new Group();
            groups.fetch({
                success: function(model, groups){
                    _.each(groups, function(grp){
                        var path = window.location.pathname.split('/')
                        var home_url = _.initial(path).join('/');
                        grp.link = home_url + '/' + grp.slug;
                        if(document.requestParameters){
                            grp.editMode = true;
                        }
                    })
                    root.$el.find('#block_container').html(HomeTemplate());
                    root.$('.faq-block').append(GroupListTemplate({'groups': groups}));
                    Backbone.trigger("home_rendered", root);
                }
            })
        },

        renderGroup: function(group_id){
            this.group = new Group({id: group_id});
            var root = this;
            this.group.fetch({
                success: function(model, group){
                    if(document.requestParameters){
                        group.editMode = true;
                    }
                    if(document.viewType == 'main_faq'){
                        _.each(group.sections, function(section){
                            _.each(section.questions, function(question){
                                if(!document.isPrivateTenant){
                                    let urlExp = new RegExp('"/static/media/', 'g');
                                    question.answer = question.answer.replace(
                                        urlExp, `"${document.cdn_url}${Common.DEFAULT_MEDIA_PATH}`
                                    );    
                                }
                            });
                        });
                    }
                    root.$el.find('#block_container').html(GroupTemplate(group));
                    root.$('.fr-element.fr-view.content-slide').find('a').attr('target', '_blank');
                    Backbone.trigger("explore_faq", root);
                }
            })
        },

        backToHome: function(){
            var path = window.location.pathname.split('/')
            var home_url = _.initial(path).join('/');
            window.location.href = home_url;
        },

        toggleFaqInfo: function(event){
            var faqBlock = this.$(event.currentTarget).parents('.faq-item');
            if (this.$(faqBlock).hasClass('open')) {
                this.$(faqBlock).removeClass("open");
                this.$(faqBlock).find('.info-block').slideUp('linear');
            } else {
                this.$(faqBlock).addClass("open");
                this.$(faqBlock).find('.info-block').slideDown('linear');
            };
        },

    });
    
    return FaqView;
});
