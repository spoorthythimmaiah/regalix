/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../common',
        '../templates/' + document.template_folder + '/section-list.handlebars'
], function (_, $, Backbone, Common, SectionListTemplate) {
    'use strict';

    var SectionListView = Backbone.View.extend({

        template: SectionListTemplate,

        events: {
            'click .pwt-box': 'openSection',
            'click .tags-span': function(event){Common.searchTags(event)},
        },

        initialize: function (attrs) {
            this.sections = attrs.sections;
            this.product_id = attrs.product_id;
            this.canEdit = attrs.canEdit;
        },

        render: function () {
            var section_list = $.extend( true, {}, this.sections)
            _.each(section_list, function(section){
                if ((['home', 'audience']).indexOf(document.viewType) !== -1 && section.is_enabled == undefined) {
                    section.is_enabled = true;
                }
                section.is_visible = !section.is_hidden;
                if(section.linked_asset){
                    section.icon = section.icon || {url: Common.SECTION_LINK_TYPE_IMAGE_PATH};
                }else{
                    section.icon = section.icon || {url: Common.SECTION_IMAGE_PATH};
                }
            });
            this.$el.html(this.template({
                'sections': section_list,
                'can_edit': this.canEdit,
                'is_author': document.viewType=='edit',
            })).addClass('sortable row');
            return this;
        },

        openSection: function(event){
            if (this.$(event.target).hasClass("no-action") ||
                this.$(event.currentTarget).hasClass("disabled") ||
                this.$(event.target).hasClass('tags-span') ||
                this.$(event.currentTarget).children().hasClass('sync-inprogress')) return;
            var section_id = $(event.currentTarget).attr('slug');
            Backbone.history.navigate('#!/' + this.product_id + '/' + section_id, {trigger: true});
        },

    });

    return SectionListView;
});
