/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    '../../../tenant/common',
    '../models/journeys',
    '../models/tags_options',
    '../../../tenant/models/product-tree',
    '../templates/welcome.handlebars',
    '../templates/create_journeys.handlebars',
    '../templates/list_journeys.handlebars',
    '../templates/journey_assets.handlebars',
    '../templates/popups.handlebars',
    '../templates/tags.handlebars',
    '../templates/tag_options.handlebars',
    '../templates/site-map/main.handlebars',
    'airDatepicker',
    'airDatepickerEn',
], function ($, _, Backbone, Common, Journeys, TagsOptions, ProductTree, welcomeTemplate, createJourneysTemplate, listJourneysTemplate, journeyAssetsTemplate, popupsTemplate, tagTemplate, tagOptionsTemplate, journeySiteMapTemplate) {
    'use strict';

    var EditView = Backbone.View.extend({

        selectedJourneySlug: null, // this variable is used to trak current journey selection
        SITE_MAP_DATA: null,
        journeyTags: [],
        journeyTagOptions: [],

        el: '#main_container',
        template: popupsTemplate,
    	events: {
            "click .create-new.journeys, .work-area.journeys .edit-journey-btn": "createJourneyPopup",
            "click .close_full_popup": "closeJourneyPopup",
            "click .trigger-inplace-popup": "replacePopup",
            "mouseenter .journey-hidden-actions": "toggleJourneyActions",
            "mouseleave .journey-hidden-actions": "toggleJourneyActions",

            // New/Edit Journey
            "submit form[name=create-journeys-form]": "saveJourney",
            "keyup #create-journeys-form input": "validateJourney",
            "click .journey-tabs [data-tab]": 'toggleEditTabs',
            "click .journey-create-tag": 'createTag',
            "click .journey-delete-tag": 'deleteTag',
            "click .delete-tag-group": 'deleteTagGroup',
            "click .journey-create-tag-group": 'createTagGroup',

            // upload journey cover
            "change .journeys-cover-btn": "uploadJourneyCover",
            
            // privacy options events
            "click .journeys-privacy-btn": "toggleJourneyPrivacyList",
            "click #create-journeys-form .journeys-privacy-opt li:not('.is-author')": "togglePrivacyOption",

            // chapters event
            "click .add-chapters-to-journeys": "showAddChaptersToJourneysPopup",
            "click .browser-chapters": "browserChapters",
            "click .add-journey-chapters-popup .cancel": "hideAddChaptersToJourneysPopup",
            "click #chapters-list-wrap .expandSection": "toogleSitMapSections",
            "click form[name=save-assets] .save": "saveAssetsDetails",
            "click .remove-journey-link": "removeAsset",
            "change #chapters-list-wrap .css-checkbox": "updateChooseChapterButtonText",
            'click .chapters-list-popup .save':'addInternalLink',

            // CTA events
            "click .add-cta-to-journeys": "showAddCTAToJourneysPopup",
            "click .add-journeys-cta-popup .cancel": "hideAddCTAToJourneysPopup",
            "click form[name=journey-cta] .save": "saveCTADetails",
            "keyup input[type=url]": "updateUrl",

            // Publish, Disable, Enable, Delete Journey
            "click .publish-journey": "showPublishJourneyPopup",
            "click .confirm-publish-journey .confirm-publish": "confirmPublishJourney",
            "click .confirm-publish-journey .cancel": function() { this.closePopup('confirm-publish-journey') },
            "click .change-journey-status": "showEnableDisableJourneyPopup",
            "click .disable-journey .cancel": function() { this.closePopup('disable-journey') },
            "click .enable-journey .cancel": function() { this.closePopup('enable-journey') },
            "click .disable-journey .disable, .enable-journey .enable": "enableDisableJourney",
            "click .delete-journey": "showDeleteJourneyPopup",
            "click .delete-journey-popup .delete": "deleteJourney",
            "click .delete-journey-popup .cancel": function() { this.closePopup('delete-journey-popup') },
        
            // language warning
            "click .create-warning .cancel": "closeLanguageWarningPopup",

            // error popup
            "click .failed-case .cancel": function() { this.closePopup('failed-case') },
        },
        
        initialize() {
            this.listAllJourneys();
            this.renderPopupTemplate();
        },

        getTagsAndOptions() {
            let tagsOptions = new TagsOptions();
            let root = this;
            tagsOptions.fetch({
                success(model, response) {
                    root.journeyTags = response.tags;
                    root.journeyTagOptions = response.options;
                    root.initAutoComplete();
                },
                error(status, error) {
                    console.log(error.statusText)
                }
            });
        },
        renderPopupTemplate() {
            this.$('#dashboard-popups').html(this.template());
        },
        
        /**
        * 'End of life' air-datepicker initializer.
        */
        initEolDatePicker: function(element){
            element.datepicker({
                language: 'en',
                dateFormat: "yyyy-mm-dd",
                minDate: new Date(),
                timeFormat: 'hh:ii aa',
                autoClose: true,
                clearButton: true,
                timepicker: true,
                onSelect: (selectedDate, date, inst) => {
                    this.$(inst.el).data('datetime', "");
                    if(date) {
                        // Set the datetime in the format - 'yyyy-mm-ddThh:mm'.
                        this.$(inst.el).data('datetime', date.toISOString().slice(0, 16))
                    }
                },
            });
        },

        toggleEditTabs(event) {
            let selectedTab = this.$(event.currentTarget).data('tab');
            this.$('[data-tab]').removeClass('active');
            this.$(`[data-tab=${selectedTab}]`).addClass('active');
        },

        createTagGroup(){
            this.$('.journey-tagging .journey-tag-groups-wrap').append(tagTemplate());
            this.$('.delete-tag-group').removeClass('disabled');
	    this.initAutoComplete();        
	},

        createTag(event){
            var name = this.$(event.currentTarget).parent().find('.tag-input').val();
            if (name.length <= 2) {
                this.$(event.currentTarget).parent().find('.tag-input').addClass('error');
                this.$(event.currentTarget).parents('form').find('[type="submit"]').attr('disabled', 'disabled');
                return;
            }
            this.$(event.currentTarget).parent().find('.tag-input').val('').removeClass('error');
            let attr = {};
            attr.name = name;
            this.$(event.currentTarget).parents('.journey-tag-group').find(".tag-collections").append(tagOptionsTemplate(attr));
	    this.initAutoComplete()        
 	},
        
        deleteTag(event){
            this.$(event.currentTarget).parent().remove()
        },

        deleteTagGroup(event){
            if($('.journey-tag-group').length == 1) {
                this.$(event.currentTarget).addClass('disabled');
                return;
            }
            this.$(event.currentTarget).parent().parent().remove()
        },

        listAllJourneys() {
            let journeys = new Journeys();
            this.$('.journeys-list-wrap').empty();
            let root = this;
            journeys.fetch({
                success(model, response) {
                    if(!response.length) {
                        root.$('.journeys-list-wrap').html(welcomeTemplate());
                        return;
                    }
                    _.each(response, (journey) => {
                        if (journey.icon_path) {
                            journey.icon_path = Common.DEFAULT_MEDIA_PATH + journey.icon_path
                        }
                        journey.user_groups = journey.restricted_to_group_details
                        journey.isPrivateTenant = document.isPrivateTenant;
                        root.$('.journeys-list-wrap').append(listJourneysTemplate(journey));
                    });
                    root.initializeJourneySortable();
                },
                error(model, response){
                    console.log(response.statusText);
                }
            });
        },

        initializeJourneySortable(){
            var root = this
            this.$(".journeys-list-wrap").sortable({
                placeholder: 'highlight',
                handle: ".journey-drag",
                forcePlaceholderSize: true,
                containment: "parent",

                update : function(event, ui) {
                    let journey = new Journeys({
                        "id": ui.item.data("journey-slug"),                        
                        "afterJourneySlug": ui.item.prev().data("journey-slug"),
                        "reorder": true,
                    });
                    journey.save(null, {
                        patch: true,
                        success: function(){
                            root.$(".journeys-list-wrap").sortable("refresh");
                        }, error: function(xhr, status_code, message){
                            root.showPopup('failed-case');
                            let errorMessage = "Reorder failed, please try agin";
                            root.$('.failed-case .popup-info').text(errorMessage);
                            root.$(".journeys-list-wrap").sortable("cancel");
                        }
                    })
                }
            });
        },
        createJourneyPopup(e) {
            if($(e.currentTarget).hasClass('create-new') 
                && document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
                return this.switchLanguageWarning();
            }

            let attr = {
                isPrivateTenant: document.isPrivateTenant,
                add_journey: true,
                isEdit: false,
                user_groups: JSON.parse(JSON.stringify(document.user_groups))
            };
            var expireAt;
            // Retrive particular journey details only on edit
            let ele = $(e.currentTarget);
            if(ele.hasClass('edit-journey-btn')) {
                attr.isEdit = true
                attr.slug = ele.parents('.journeys-details-wrap').data('journey-slug');
                let journey = new Journeys({id: attr.slug});
                $.when(journey.fetch({
                    async: false,
                    processData: true
                })).done(function(response, status, xhr){
                    attr.journeyName= response.name;
                    attr.description = response.description;
                    attr.tags = response.tags;
                    if(response.expire_at){
                        expireAt = new Date(response.expire_at);
                        attr.expireAt = expireAt.toISOString().slice(0, 16);
                    }
                });
                let selectedGroupIds = [];
                ele.parents('.journeys-details-wrap').find('.journeys-privacy-opt li').each(function() {
                    selectedGroupIds.push($(this).data('group-id'))
                });
                _.each(attr.user_groups, (group) =>{
                    group.is_default = false;
                    if(selectedGroupIds.includes(group._id))
                        group.is_selected = true
                })
            }
            this.$(".create-journeys-wrap").html(createJourneysTemplate(attr));
            
            // initializing the air datepicker
            this.initEolDatePicker(this.$('#journey_expire_at'));
            if(expireAt) {
                this.$('#journey_expire_at')
                        .val(expireAt.toLocaleString({},{'hour12': true})
                        .replace(/\//g, '-'));
            }
            
            this.updateSelectedGroupsInfo();
            var popupName = $(e.currentTarget).data('form-name');
            $('body').addClass('fixedHeight');
            this.$('.full_popup_block, .'+popupName).addClass('active');
            this.$(`.${popupName}, .full_popup_overlay`).addClass('animated slideInUp');
            setTimeout(() => {
                this.$(`.${popupName}, .full_popup_overlay`).removeClass('animated slideInUp');
            },500);
            this.getTagsAndOptions();
        },

        updateSelectedGroupsInfo() {
            let selectedGroupsElem = this.$('#create-journeys-form .journeys-privacy-opt li.selected');
            let selectedGroupsTitle = Array.from(selectedGroupsElem, group => group.innerText);
            this.$('#create-journeys-form .journeys-privacy-btn').text(selectedGroupsTitle.join(', '));
        },

        validateJourney(e) {
            var formID = $(e.currentTarget).parents('form').attr('id');
            var fieldName = e.currentTarget;
            var fieldValue = fieldName.value;
            if(!fieldValue || fieldValue == '') {
                $(e.currentTarget).addClass('error')
                $('#'+formID+' input[type=submit]').attr('disabled', 'disabled');
            }
            else {
                $(e.currentTarget).removeClass('error');
                $('#'+formID+' input[type=submit]').removeAttr('disabled');
            }
        },

        // Create or Edit Journey on submit
        saveJourney(e) {
            e.preventDefault();
            let showError = false;
            const currentFormName = $(e.currentTarget).attr('name');
            const formName = "form[name=" + currentFormName + "]"; 
            const journeyName = $(formName + " input[name='name']");
            const journeyDescription = $(formName + " textarea[name='description']");
            let selectedGroupIds = [];
            let tags = [];
            let expire_at = this.$('#journey_expire_at');

            if (document.isPrivateTenant && document.user_groups.length) {
                _.each($('#create-journeys-form .journeys-privacy-opt li.selected'), elem => {
                    selectedGroupIds.push($(elem).data('group-id'));
                });
                if (!selectedGroupIds.length) {
                    this.customErrorMessage(
                        'Select atleast one privacy type',
                        $('.journeys-privacy-list').parent());
                    showError = true;
                }
            }
            
            if (!journeyName.val()) {
                this.customErrorMessage('Provide a Journey Name', $(journeyName).parent(), $(journeyName));
                showError = true;
                this.$('[data-tab]').removeClass('active');
                this.$('[data-tab="information"]').addClass('active');
            }        

            _.each($('.journey-tag-group'), elem => {
                let name  = $(elem).find('[name="keyvalues"]').val();
                if (name.length <= 2) {
                    showError = true;
                    $(elem).find('[name="keyvalues"]').addClass('error');
                    this.$('[data-tab]').removeClass('active');
                    this.$('[data-tab="tags"]').addClass('active');
                }
                let options = [];
                _.each($(elem).find('.tag-collections .tag-wrap .tag'), (tag) => {
                    let name = $(tag).text();                                
                    options.push(name.toLowerCase());
                });
                if (options.length <= 0) {
                    showError = true
                    $(elem).find('[name="tag"]').addClass('error');
                    this.$('[data-tab]').removeClass('active');
                    this.$('[data-tab="tags"]').addClass('active');
                }
                var group = {};
                group.name = name.toLowerCase();
                group.options = options;
                tags.push(group);
            })     
            if (showError) return;
            $('.edit-tool-tip').remove();
            let data = {
                "name": journeyName.val(),
                "description": journeyDescription.val(),
                "restricted_to_groupids": selectedGroupIds,
                "tags": tags
            }
            if($(e.currentTarget).data('journey-slug')) {
                data.id =  $(e.currentTarget).data('journey-slug');
            }
            if(expire_at.val()) data.expire_at = expire_at.data('datetime') || null;

            // Creating/editing journey action in progress
            let submitElem = $(e.currentTarget).find('input:submit');
            submitElem.val('Submitting...');
            // Submit success
            let journey = new Journeys(data)
            var root = this;
            journey.save(null, {
                success(model, response){
                    if(response){
                        root.$('.create_journeys').find('input:submit').val('Success!');
                        root.listAllJourneys();
                        setTimeout(function() {
                            root.closeJourneyPopup('create_journeys')
                            return;
                        }, 500);
                    }
                }, error(model, response, xhr){
                    console.log(response.statusText);
                }
            });
        },

        uploadJourneyCover(e) {
            let target = e.currentTarget;
            let file = target.files[0];
            if (!file || !file.type.startsWith('image/')){ return }
            const img = document.createElement("img");
            img.classList.add("journey-cover");
            $(target).next().empty();
            $(target).next().append(img);
            const reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);

            var iconData = new FormData();
            iconData.append('icon', file)
            iconData.append('name', $(target).attr("id"))
            var journey = new Journeys({"id": $(target).attr("id")})

            journey.save(iconData, {
                processData: false,
                cache: false,
                contentType: false,
                patch: true,
                data: iconData,
                success(response){
                    console.log("Icon uploaded successfully");
                },
                error(xhr, status_code, error_message){
                    console.log(error_message);
                }
            })
        },

        /**
         * Close Full Page Popup:
         * This function can be triggered on click or direct call by passing a popup name as attribue
         * Hence 'e' can be both event or popup name as string
         */
        closeJourneyPopup(e) {
            let popupName = (e.type != undefined) ? $(e.currentTarget).data('popup') : e;
            this.$('.'+popupName+', .full_popup_overlay').addClass('animated slideOutDown');
            setTimeout(function(){
                this.$('.'+popupName+', .full_popup_overlay').removeClass('animated slideOutDown');
                this.$(".create-journeys-wrap").empty()
            },500);
            $('body').removeClass('fixedHeight');
        },

        toggleJourneyPrivacyList(e) {
            this.$(e.currentTarget).toggleClass('active');
            this.$(e.currentTarget).siblings('.journeys-privacy-opt').toggleClass('hide');
        },

        togglePrivacyOption(e) {
            this.$(e.currentTarget).toggleClass('selected');
            this.updateSelectedGroupsInfo();
        },

        showAddChaptersToJourneysPopup(e) {
            this.$('.journey-assets').empty();
            var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
            this.$('form[name=save-assets] .save, form[name=save-assets] .browser-chapters').attr('id', journeySlug);

            // fetch journey assets
            let journeyAssets = new Journeys({id: journeySlug});
            let journeyAssetsDetails;
            var root = this;
            $.when(journeyAssets.fetch({
                async: false,
                processData: true
            })).done(function(response, status, xhr){
                journeyAssetsDetails = response.assets;
                root.showPopup('add-journey-chapters-popup');
                if(journeyAssetsDetails.length){
                    root.$('.add-journey-chapters-popup .form-action-type').text("edit");
                }
                _.each(journeyAssetsDetails, (asset) => {
                    asset.breadcrumb = `Home > ${asset.section.slug} > ${asset.slug}`
                    if(asset.product.slug != asset.section.slug) {
                        asset.breadcrumb = `Home > ${asset.product.slug} > ${asset.slug}`
                    }
                });
                root.$('.journey-assets').html(journeyAssetsTemplate(journeyAssetsDetails));
                root.initializeJourneyAssetsSortable();
            });
        },

        // Journey Asset reorder
        initializeJourneyAssetsSortable(){
            this.$(".journey-assets").sortable({
                placeholder: 'highlight',
                handle: ".journey-asset-drag",
                containment: "parent",
            });
        },

        getSelectedJourneySlug(e) {
            this.selectedJourneySlug =  $(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
            return this.selectedJourneySlug;
        },

        // Display sitemap tree based on restriction already choosen by user
        browserChapters(e) {
            let selectedGroupIds = [];
            let journeySlug = this.$(e.currentTarget).attr('id');
            this.$('.chapters-list-popup .save').text('choose');
            let selectedGroups = this.$(`.journeys-details-wrap[data-journey-slug=${journeySlug}]`).find('.journeys-privacy-opt li');
            _.each(selectedGroups, group => {
                selectedGroupIds.push(parseInt($(group).data('group-id')));
            });
            Common.fetchSiteMapData()
            .then((data) => {
                let siteMapData = Common.updateSitemapData(data, selectedGroupIds);
                // preselecting the journey assets in tree structure
                let journeyAsset = this.$(".journey-assets .journey-link-details a")
                let journeyAssetIds = [];
                _.each(journeyAsset, (asset) => {
                    journeyAssetIds.push($(asset).data("id"));
                })
                this.preSelectJourneyAssets(siteMapData, journeyAssetIds);

                this.$el.find('#chapters-list-wrap').html(
                    siteMapData.length ? journeySiteMapTemplate({'siteMapData': siteMapData}) :
                    `<div> ${this.NO_RECORDS_TEXT} </div>`
                );
                this.$("#chapters-list-wrap .loading-icon").hide()
            })
            .catch((e) => {
                console.log(e)
                this.$el.find('#chapters-list-wrap').html('<div>Oops! Something went wrong.</div>');
            })
        },

        preSelectJourneyAssets(siteMapData, journeyAssetIds){
            _.each(siteMapData, (data) => {
                if(data.children && data.children.length){
                    data.children = this.preSelectJourneyAssets(data.children, journeyAssetIds);
                }
                _.each(data.playlists, (playlist) => {
                    _.each(playlist.demos, (chapter) => {
                        if(journeyAssetIds.includes(chapter.walkthrough_id))
                            chapter.is_selected = true;
                    });
                });
            });
            return siteMapData;
        },

        updateUrl(e){
            var parentBlock = this.$(e.currentTarget).parent('.cta-input-wrap');
            $('.edit-tool-tip').remove();
            if(e.altKey || ([8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]).indexOf(e.keyCode) !== -1) return;
            var value = $(e.target).val();
            if(value && value.length && value.length > 4 && value.indexOf('http') !== 0){
                $(e.target).val('https://' + value);
            }
        },

        saveCTADetails(e) {
            e.preventDefault();
            let showError = false;
            let ctaTitle = this.$('#journey-cta-btn');
            let ctaLink = this.$('#journey-cta-link');
            if(!ctaTitle.val()){
                this.customErrorMessage('Provide a title for the link.', $(ctaTitle).parent(), $(ctaTitle));
                showError = true;
            }
            if(!ctaLink.val()){
                this.customErrorMessage('Provide a title for the link.', $(ctaLink).parent(), $(ctaLink));
                showError = true;
            }
            if (!Common.validateUrl(ctaLink.val())) {
                this.customErrorMessage('Oops! Please enter a valid URL.', $(ctaLink).parent(), $(ctaLink));
                showError = true
            }
            if(showError) {
                return;
            }
            $('.edit-tool-tip').remove();
            let journeySlug = this.$(e.currentTarget).attr('id');
            let journeyName = this.$(e.currentTarget).attr('name');
            let ctaDetails = {
                "id": journeySlug,
                "is_cta": true,
                "options": {
                    "type": "link",
                    "cta_text": ctaTitle.val(),
                    "cta_link": ctaLink.val()
                },
                "name": journeyName,
                "slug": journeySlug
            }
            let journey = new Journeys(ctaDetails);
            this.actionInProgress('add-journeys-cta-popup')
            var root = this;
            journey.save(null, {
                patch: true,
                wait: true,
                success(response){
                    root.actionSuccess('add-journeys-cta-popup', false);
                },
                error(xhr, status_code, error_message){
                    console.log("error: " + error_message);
                }
            });
        },

        hideAddChaptersToJourneysPopup() {
            this.closePopup('add-journey-chapters-popup');
            this.$('.journey-assets').empty();
        },

        showAddCTAToJourneysPopup(e) {
            var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
            var journeyName = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-name');
            this.$('form[name=journey-cta] .save').attr({'id': journeySlug, 'name': journeyName});

            let journeyDetails = new Journeys({id: journeySlug});
            let journeyCTADetails;
            let root = this;
            $.when(journeyDetails.fetch({
                async: false,
                processData: true
            })).done(function(response, status, xhr){
                journeyCTADetails = response.cta_details;
                
                let ctaText = (journeyCTADetails.cta_button !== null) ? journeyCTADetails.cta_button.cta_text : '';
                let ctaLink = (journeyCTADetails.cta_button !== null) ? journeyCTADetails.cta_button.cta_link : '';
                let actionTypeText = (ctaText || ctaLink) ? 'edit' : 'add';
                if(actionTypeText == 'add') {
                    if(document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
                        return root.switchLanguageWarning();
                    }
                }

                root.$('.add-journeys-cta-popup .form-action-type').text(actionTypeText);
                root.$('form[name=journey-cta] #journey-cta-btn').val(ctaText);
                root.$('form[name=journey-cta] #journey-cta-link').val(ctaLink);
                root.showPopup('add-journeys-cta-popup');
            });
        },

        hideAddCTAToJourneysPopup() {
            this.closePopup('add-journeys-cta-popup');
        },

        toogleSitMapSections(e) {
            var icon = this.$(e.currentTarget);
            icon.toggleClass('expanded');
            icon.parent().siblings('ul').toggle();
        },

        toggleJourneyActions(e) {
            $('.journey-actions-list').addClass('hidden');
            if (e.type == "mouseenter") {
                $(e.currentTarget).find('.journey-actions-list').removeClass('hidden');
            }
        },

        // save all the selected chapters
        saveAssetsDetails(e) {
            e.preventDefault();
            $('.edit-tool-tip').remove();
            var assetsDetails = {};
            assetsDetails.is_asset = true;
            assetsDetails.id = this.$(e.currentTarget).attr('id');
            assetsDetails.asset = [];
            var assets = this.$('.journey-assets li');
            var root = this;
            _.each(assets, function(elem, index){
                let linkElem = root.$(elem).find('.journey-link-url');
                assetsDetails.asset.push({
                    'asset_type': linkElem.data('type'),
                    'asset_id': linkElem.data('id'),
                    'order': index + 1,
                });
            });
            let journey = new Journeys(assetsDetails);
            this.actionInProgress('add-journey-chapters-popup');
            var root = this;
            journey.save(null, {
                patch: true,
                wait: true,
                success(response){
                    root.actionSuccess('add-journey-chapters-popup', false);
                },
                error(xhr, status_code, error_message){
                    console.log("error: " + error_message);
                }
            });

        },

        // Delete chapter from the journey assets
        removeAsset(e) {
            $(e.currentTarget).parents('.journey-link-data').remove();
        },

        // update choose button text upon choosing chapters from the sitemap
        updateChooseChapterButtonText(e) {
            let saveElem = this.$('.chapters-list-popup .save');
            let assetsCount = this.$('#chapters-list-wrap .css-checkbox:checked').length;
            if (!(assetsCount)) {
                $(saveElem).text('SAVE').removeClass('assets-selected');
            } else {
                $(saveElem).text(`CHOOSE CHAPTERS(${assetsCount})`).addClass('assets-selected');
            }
        },

        // choose assets to journey
        addInternalLink(e) {
            var selectedLinks =  this.$('#chapters-list-wrap .css-checkbox:checked');
            if(selectedLinks.length) {
                this.$('.journey-assets').empty();
            }
            let assets = []
            _.each(selectedLinks, (selectedLink)=>{
                assets.push(this.updateInternalLink(selectedLink));
            });  
            this.$('.journey-assets').html(journeyAssetsTemplate(assets));
            this.replacePopup(e);
        },

        // append selected chapter to the assets lists in view
        updateInternalLink(selectedLink) {
            var selectedElement = selectedLink;
            var link = window.location.origin + "/t/";
            var mainListElement = this.$(selectedElement).parents()
                    .closest("li[data-slug='"+ $(selectedElement).attr('slug-id')+"']");
            var elementType = mainListElement.attr('data-item');
            if(elementType == 'chapter'){
                link += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';

                if(mainListElement.closest("li[data-item='section']").length){
                    link += mainListElement.closest("li[data-item='section']").attr('data-slug') + '/';
                }
            }
            link += mainListElement.attr('data-slug');
            let productSlug = mainListElement.closest("li[data-item='category']").attr('data-slug'),
                sectionSlug = mainListElement.closest("li[data-item='section']").attr('data-slug'),
                data = $(selectedElement).parents("li").data();
            
            if(data.item == 'chapter'){
                var asset = {
                    type: "chapter",
                    link: link,
                    name: data.name,
                    id: data.id,
                    slug: data.slug,
                    breadcrumb: `Home > ${sectionSlug} > ${data.slug}`
                }
                if(productSlug != sectionSlug){
                    asset.breadcrumb = `Home > ${productSlug} > ${data.slug}`;
                }
                return asset
            }
        },

        // Publish Journey Popup
        showPublishJourneyPopup(e) {
            var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
            this.$('.confirm-publish-journey .confirm-publish').attr('id', journeySlug);
            this.showPopup('confirm-publish-journey');
        },

        // Confirm Publish Journey
        confirmPublishJourney(e) {
            let journeySlug = this.$(e.currentTarget).attr('id');
            var journey = new Journeys({id: journeySlug, is_publish: true});
            this.actionInProgress('confirm-publish-journey')
            var root = this;
            journey.save(null, {
                patch: true,
                wait: true,
                success(response){
                    root.actionSuccess('confirm-publish-journey', false);
                    root.listAllJourneys();         
                },
                error(xhr, response, error_message){
                    let status, duration;
                    if(response.status == 404 && response.responseJSON.message === "NO_CONTENT"){
                        status = 'no-content';
                        duration = 5000;
                    }
                    root.actionFailed('confirm-publish-journey', status, duration);
                }
            });
        },

        // Enable , Disable Journey Popup
        showEnableDisableJourneyPopup(e) {
            if (this.$(e.target).parents('.journey-actions').siblings('.journeys-details').hasClass('disabled')) {
                var enable_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
                this.$('.enable-journey .enable').attr('id', enable_id);
                this.showPopup('enable-journey');
            } else{
                var disable_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
                this.$('.disable-journey .disable').attr('id', disable_id);
                this.showPopup('disable-journey');
            };
        },

        // Enable, Disable Journey Status
        enableDisableJourney(e) {
            let journeySlug = this.$(e.currentTarget).attr('id');
            let is_enabled = !(this.$(e.currentTarget).hasClass('disable'));
            var journey = new Journeys({id: journeySlug, is_enabled: is_enabled});
            is_enabled ? this.actionInProgress('enable-journey') :
                this.actionInProgress('disable-journey')

            var root = this;
            journey.save(null, {
                patch: true,
                wait: true,
                success(response){
                    is_enabled ? root.actionSuccess('enable-journey', false) :
                        root.actionSuccess('disable-journey', false);
                    root.listAllJourneys();
                    // root.section_id ? root.current_view.load(root.section_id, true) :
                    //     root.current_view = new HomeView();
                },
                error(xhr, status_code, error_message){
                    is_enabled ? root.actionFailed('enable-journey') : root.actionFailed('disable-journey');
                }
            });
        },

        // Show Delete Journey Popup
        showDeleteJourneyPopup(e){
            var delete_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
            this.$('.delete-journey-popup .delete').attr('id', delete_id);
            this.showPopup('delete-journey-popup');
        },

        // Delete Journey
        deleteJourney(e) {
            var delete_id = this.$(e.currentTarget).attr('id');
            var journey = new Journeys({
                id: delete_id
            });
            this.actionInProgress('delete-journey-popup');

            var root = this;
            journey.destroy({
                wait:true,
                success(){
                    root.actionSuccess('delete-journey-popup', false);
                    root.listAllJourneys();               
                },
                error(xhr, status_code, error_message){
                    root.actionFailed('delete-journey-popup');
                }
            });
        },

        // Common function to show popup
        showPopup(popupName) {
            this.$(".dashboard-overlay").css({
                "display": "table"
            });
            this.$(`.dashboard-overlay .popup-box.${popupName}`).show().addClass("bounceInDown");
            setTimeout(() => {
                this.$(`.dashboard-overlay .popup-box.${popupName}`).removeClass("bounceInDown");
            }, 300);
        },

        // Show language warning while creating Journey/CTA from other than default language
        switchLanguageWarning(){
            this.showPopup('create-warning');
            var warningMsg = `Switch to '${document.defaultLocale}' language to create a new content !`;
            this.$('.create-warning .popup-info').text(warningMsg);
        },

        // Close Language warning popup
        closeLanguageWarningPopup() {
            this.closePopup('create-warning');
            $('body').removeClass('fixedHeight');
        },

        // Common function to close popup
        closePopup(popupName, showOverlay) {
            this.$('.edit-tool-tip').remove();
            this.$(".dashboard-overlay ." + popupName).addClass("bounceOutUp");
            setTimeout(() => {
                this.$(".dashboard-overlay .popup-box." + popupName).hide().removeClass("bounceOutUp");
                if(!showOverlay) {
                    this.$(".dashboard-overlay").hide();
                }
            }, 300);
        },

        initAutoComplete() {
            let root = this;
            this.$(".tags-autoComplete").autocomplete({
                source: root.journeyTags
            });
            this.$(".options-autoComplete").autocomplete({
                source: root.journeyTagOptions
            })
        },

        /**
         * This is a comman function to hide current popup and show a new popup without animation
         * Comman attribues to pass
         *  ele with class name --> trigger-inplace-popup
         *  ele with hide data attr --> data-hidePopup="popup class name to hide"
         *  ele with show data attr --> data-showPopup="popup class name to show"
         */
        replacePopup(e) {
            let popUpData = e.target.dataset;
            if(popUpData.showpopup) {
                this.$(`.${popUpData.showpopup}`).removeClass('hidden');
            }
            if(popUpData.hidepopup) {
                this.$(`.${popUpData.hidepopup}`).addClass('hidden');
            }       
        },

        // Custom error messages
        customErrorMessage(message, target, elem){
            this.$('.edit-tool-tip').remove();
            var editToolTip = '<div class="edit-tool-tip">'+message+'</div>';
            target.append(editToolTip);
            if(elem) elem.focus();
        },

        // On submit - Animate progress 
        actionInProgress(target){
            this.$('.' + target + ' .adding').addClass("slide-in is-submitted");
        },
        
        // On submit - Failed
        actionFailed(target, status='failed', duration=1000){
            setTimeout(() => {
                this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
                this.$(`.${target} .${status}`).addClass("slide-in");
                setTimeout(() => {
                    this.$(`.${target} .${status}`).removeClass("slide-in");
                }, duration);
            }, 1000);
        },
        
        // On submit - success
        actionSuccess(target, retain_popup){
            let root = this;
            this.$('.' + target + ' .adding').removeClass("slide-in is-submitted");
            this.$('.' + target + ' .added').addClass("slide-in");
            setTimeout(function(){
                this.$('.' + target + ' .added').removeClass("slide-in");
                if(!retain_popup) root.closePopup(target);
            }, 1000);
        }
    });

    return EditView
});
