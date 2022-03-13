/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../../../tenant/common',
        '../templates/new_sample.handlebars',
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

], function (_, $, Backbone, Common, NewTemplate,) {
    'use strict';

    var NewSampleView = Backbone.View.extend({

        el: '#main_container',

        events: {
            'click .add-tag' : 'addTag',
            'click .submit-sample' : 'saveSample'
        },

        initialize : function () {
            var root = this;
            this.$('#block_container').html(NewTemplate);
            this.$('.sample-description').froalaEditor({
                key: Common.FROALA_KEY,
                toolbarContainer: '#toolbar',
                charCounterCount: false,
                toolbarSticky: true,
                colorsDefaultTab: 'text',
                colorsStep: 7,
                tableResizerOffset: 10,
                colorsBackground: Common.FROALA_COLORS_BACKGROUND,
                colorsText: Common.FROALA_COLORS_TEXT,
                imageEditButtons: Common.FROALA_IMAGE_EDIT_BUTTONS,
                toolbarButtons: Common.FROALA_TOOLBAR_BUTTONS,

                // Set the image upload parameter.
                imageUploadParam: 'editor_image_file',
                // Set the image upload URL.
                imageUploadURL: '/api/resource/rte-asset?author=1',

                // Additional upload params.
                imageUploadParams: {
                    'csrf_token': $('meta[name=csrf-token]').attr('content')
                },
                // Set request type.
                imageUploadMethod: 'POST',
            });
        },

        addTag : function () {
            var tagInput = this.$('.tag-input');
            if( tagInput.val() ){
                var newTag = '<div class="tag">' + tagInput.val() + '</div>';
                this.$('.tag-holder').append(newTag);
                tagInput.val('');
            }
        },

        validateFields : function() {
            var valid = true;
            var titleInput = this.$('input[name=title]');
            var licenseInput = this.$('select[name=license]');
            var tagName = this.$('input[name=tag]');

            if( ! titleInput.val()){
                valid = false;
                titleInput.addClass('error');
            } else {
                titleInput.removeClass('error');
            }
            if( ! licenseInput.val()){
                valid = false;
                licenseInput.addClass('error');
            } else {
                licenseInput.removeClass('error');
            }
            if( ! this.$('.sample-description').froalaEditor('html.get', true)){
                valid = false;
                this.$('.fr-element.fr-view').addClass('error');
            } else {
                this.$('.fr-element.fr-view').removeClass('error');
            }
            if( this.$('.tag-holder .tag').length < 1 ){
                valid = false;
                tagName.addClass('error');
            } else {
                tagName.removeClass('error');
            }

            return valid;
        },

        saveSample : function () {
            if(!this.validateFields()){return}
            var sampleTitle = this.$('input[name=title]').val();
            var sampleLicense = this.$('select[name=license]').val();
            var sampleDescription = this.$('.sample-description').froalaEditor('html.get', true);
            var tags = this.$('.tag-holder .tag');
            var sampleTags = _.map(tags, function(elem){return elem.textContent;});
            var sampleFile = this.$('#zip-upload').val();
        }
    });

    return NewSampleView
});