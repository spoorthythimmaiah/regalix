/*global define*/
define(['underscore',
        'jquery',
        'jcf',
        'backbone',
        '../common',
        '../models/box',
        '../models/document_parser',
        '../models/journey_tree',
        '../models/section',
        '../models/section_asset_resource',
        '../models/walkthrough',
        '../models/icon',
        '../models/resource',
        '../models/rte_resource',
        '../models/cta',
        '../models/playlist',
        '../models/product-tree',
        '../models/slide',
        '../models/tag',
        '../models/repository_connector',
        '../models/repository_listener',
        '../../apps/bulletin_board/models/bulletin_board',
        '../templates/edit/editpopup.handlebars',
        '../../apps/bulletin_board/templates/create-bulletin.handlebars',
        '../../apps/bulletin_board/templates/bulletin-board-links.handlebars',
        '../../apps/bulletin_board/templates/site-map/main.handlebars',
        '../templates/edit/film-strip.handlebars',
        '../templates/edit/section-form.handlebars',
        '../templates/edit/cta/form.handlebars',
        '../templates/edit/journey-list.handlebars',
        '../templates/edit/section-journey-list.handlebars',
        '../templates/edit/cta/list.handlebars',
        '../templates/edit/playlist-form.handlebars',
        '../templates/edit/demo-form.handlebars',
        '../templates/edit/notes-form.handlebars',
        '../templates/edit/new-slide-options.handlebars',
        '../templates/edit/product-edit-block.handlebars',
        '../templates/edit/section-edit-block.handlebars',
        '../templates/edit/video-block.handlebars',
        '../templates/edit/hotspot.handlebars',
        '../templates/edit/slide-settings.handlebars',
        '../templates/edit/tags.handlebars',
        '../templates/pin.handlebars',
        '../templates/edit/content-editor.handlebars',
        '../templates/edit/content-layout.handlebars',
        '../templates/edit/slide-info.handlebars',
        '../templates/edit/document-parser-form.handlebars',
        '../templates/edit/repository_manager/connector-list-popup.handlebars',
        '../templates/edit/repository_manager/connector-list.handlebars',
        '../templates/edit/repository_manager/folder-list-popup.handlebars',
        '../templates/edit/repository_manager/main-folder.handlebars',
        '../../helpers/handlebars/i18n',
        './home',
        './slide',
        './section-list',
        'atwho',
        'cookies',
        'jquery.ui',
        'airDatepicker',
        'airDatepickerEn',
        'jquery.nicescroll',
        'colpick',
        'jquery.select2',
        'jcf.scrollable',
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

], function (_, $, jcf,  Backbone, Common, BoxApi, DocumentParser, JourneyTree,
             Section, SectionAssetResource, Walkthrough,
             Icon, Resource, RteResource,  Cta, Playlist,
             ProductTree, Slide, Tags, RepositoryConnector, RepositoryListener, BulletinBoard, 
             EditTemplate, CreateBulletin,
             BulletinBoardLinks, BulletinMainSiteMap,
             FilmStrip, SectionForm, CtaForm, JourneyList, SectionJourneyList,
             CtaList, PlaylistForm, DemoForm, NotesForm,
             NewSlideOptions, ProductBlock, SectionBlock,
             VideoBlock, Hotspot, SlideSettings,
             TagTemplate, Pin, ContentEditor, ContentLayout,
             SlideInfo, DocumentParserTemplate, RepositoryConnectorListPopup,
             RepositoryConnectorList, ConnectorFolderListPopup, ConnectorFolderTree,
             Translate, HomeView, SlideView,
             SectionListView, atwho) {
    'use strict';
    var EditView = Backbone.View.extend({

        // ALL CAPS Variables are used for constants and config
        el: '#edit_container',
        cm: Common,
        template: EditTemplate,
        filmStrip: FilmStrip,
        newSlideOptions: NewSlideOptions,
        productBlock: ProductBlock,
        sectionBlock: SectionBlock,
        videoBlock: VideoBlock,
        sectionForm: SectionForm,
        demoForm: DemoForm,
        notesForm: NotesForm,
        hotSpot: Hotspot,
        SlideSettings: SlideSettings,
        contentEditor: ContentEditor,
        contentLayout: ContentLayout,
        slideInfo: SlideInfo,
        timerId: null,
        ALLOWED_IMAGE_FORMATS: ['.gif, .jfif, .jpg, .jpeg, .png, .bmp'],
        ALLOWED_AUDIO_FORMATS: ['.mp3, .webm, .ogg'],
        ALLOWED_VIDEO_FORMATS: ['.mp4, .webm, .ogg'],
        ALLOWED_DOC_FORMATS: ['.pdf'],
        ALLOWED_PPT_FORMATS: ['.ppt', '.pptx'],
        ALLOWED_FILE_FORMATS: ['.ppt', '.pptx', '.pdf', '.zip', '.jpg', '.gif', '.jpeg', '.mp3', '.mp4', '.webm', '.ogg', '.txt', '.doc', '.docx'],
        CHAPTERS_LIST: [],
        SITE_MAP_DATA: null,
        PLACEHOLDER_TEXT: 'Click to edit',
        SECTION_TITLE_LIMIT: 110,
        PLAYLIST_TITLE_LIMIT: 85,
        CHAPTER_TITLE_LIMIT: 85,
        NOTES_LINK_TITLE_LIMIT: 25,
        SECTION_DESCRIPTION_LIMIT: 260,
        SECTION_ASSET_URL_LIMIT: 255,
        PLAYLIST_DESCRIPTION_LIMIT: 250,
        DEFAULT_FILE_ICON: "/static/images/thumb-file.jpg",
        NO_RECORDS_TEXT: 'No content added yet!',

        events: {
            'click .header .hidden-xs .logo, .search-categories .search-data a.search-links': function(){Common.closeSearchBox();},
            'click .exit': 'exitEdit',
            'click .publish': 'confirmPublish',
            'click .confirm-publish': 'publishChapter',
            'click .edit-controls .delete-items': 'showDeleteMultipleItemsPopup',
            'click .confirm-delete-multiple-chapters': 'confirmDeleteMultipleChapters',
            'click .confirm-delete-multiple-playlists': 'confirmDeleteMultiplePlaylists',
            'click .edit-controls .select-all-items:not(.disable)': 'selectAllItems',
            'click .edit-controls .deselect-all-items': 'deselectAllItems',
            'click .preview': 'previewDemo',
            'focusout .trim-input': 'trimInput',
            'click #box-content-list input[type=checkbox]':'addRemoveSelection',
            'keyup .section-name, .section-description, .callout-description, \
                   .edit-playlist-title, .edit-playlist-desc, .edit-pwt-title, \
                   #advanced-notes-content .notes-link-title, \
                   .custom-url-block .section-url': 'updateCharCount',

            // bulletin board related events
            'click .create-new-bulletin, .edit-bulletin-board': 'createEditBulletinBoard',
            'click .trigger-inplace-popup': 'updatePopupTexts',
            'click .bulletin-browse-link-btn': 'renderBulletinSiteMap',
            'click .enable-bulletin-board': 'showEnableDisableBulletinBoard',
            'click .enable-bboard .enable, .disable-bboard .disable':'enableDisableBulletinBoard',
            'click .delete-bboard': 'showDeleteBulletinBoard',
            'click .delete-bulletin-board .delete':'deleteBulletinBoard',
            'click .add-external-link':'addExternalLink',
            'click .bulletin-browse-link-popup .save':'addInternalLink',
            'click .edit-bulletin-link':'editExternalLink',
            'click .remove-bulletin-link': 'removeBulletinLink',
            'click .duplicate-bulletin-board': 'showDuplicateBulletinBoard',
            'click .duplicate': 'duplicateBulletinBoard',
            'submit form[name=bulletin-board-data]': 'submitBulletinBoardDetails',
            'mouseover .sitemap-tree li div':'showSiteMapOptions',
            'mouseout .sitemap-tree li div': 'hideSiteMapOptions',
            'change #bulltein-sitemap .css-checkbox': 'updateAddButtonText',
            'click .bulletin-board-block .edit-hamburger, \
                    .hide-bulletinboard-options': 'toggleBulletinEditOptions',

            //section related event
            'click .create-new:not(.slide)': 'showCreateLayout',
            'click .close_selection_layout':'hideCreateLayout',
            'click .popup-edit .cancel' : 'hideEditPopup',
            'submit form[name=default-section-data], form[name=asset-section-data]': 'submitSectionDetails',
            'click .popup-edit .upload-section-video': 'previewSectionVideo',
            'click .delete-video': 'deleteSectionVideo',
            'change #upload-file': 'previewIcon',
            'change #upload-link-file': 'uploadAsset',
            'click #remove-img, #remove-asset, #remove-file': 'removeAsset',
            'input .custom-url-block .section-url': 'updateCustomUrl',
            'click .notes-link-url': 'showNotesLinkUpload',
            'click .box-category-option .select-cat-option' : 'showCategoryLayoutCloseBox',
            'click .layouts .repository-category': 'showRepositoryConnectorList',
            'click .repository-connector-list .connector-item.active': 'getRepositoryConnectorFolders',
            'click .connector-folder input[type=checkbox]':'toggleConnectorFolderSelection',
            'click .connector-folder-list-popup .link-selected-repository-folder': 'startCreatingConnectorFolders',
            'click .box-category-option .select-box-option, .import_box_block' : 'getBoxData',
            'submit form[name=box_content_form]': 'saveBoxEntries',
            'click .duplicate-section' : 'duplicateSection',
            
            //section manupulations functions
            'click .category_layout_block:not(.disabled)': 'createNewCategory',
            'click .cancel, .continue': 'hidePopup',
            'click .pwt-box .edit-hamburger, .pwt-box .edit-hamburger *': 'showEditOptions',
            'click .edit .enable': 'showEnableDisablePopup',
            'click .choose-category-type .category-options': 'showCategoryLayoutCloseType',
            'click .oedit': 'createEditSection',
            'click .edit .delete': 'showDeleteSectionPopup',
            'click .popup-enable .enable' : 'enableSection',
            'click .popup-disable .disable' : 'disableSection',
            'click .popup-delete .delete': 'deleteSection',
            // doc-parser
            'click .import_doc_block, .show-layout-popup': 'toggleDocumentParserPopup',
            'change .document-upload': 'uploadContentFiles',
            'dragover .document-parser-drop-zone': 'preventDefaultDragover',
            'dragleave .document-parser-drop-zone': 'deactiveContentDocDropZone',
            'drop .document-parser-drop-zone': 'uploadContentDoc',

            //CTA events
            'click div.create-cta-btn label[for=create-cta]': 'showCreateCTAPopup',
            'click div.cancel-cta': 'hideCreateCTAPopup',
            'change input[name=cta_type]': function(){
                this.$('.create-cta-block .block').toggleClass('disabled')
            },
            'click .popup-footer div.save-cta-btn': 'addCtaDetails',
            'click .cta-delete-button' : 'removeCTA',
            'click .cta-edit-button' : 'editCTA',
            'change #upload-cta-file': 'validateCtaPdf',

            //Section Journey Event
            'click div.browse-journey': 'showJourenyPopup',
            'click div.journey-back': 'hideJourneyPopup',
            'click div.save-selected-journeys': 'selectJourneys',
            'click .journey-link-remove':'removeJourneyLink',
            //Tags and CTA for sections
            'keyup .add_tag': 'getTagSuggesions',
            'click .suggestion_tags ul li': 'selectTagFromSuggestion',
            'click .tags .close': 'removeTag',
            'click form[name="default-section-data"] .save_tag, \
                   form[name="asset-section-data"] .save_tag, \
                   form[name="walkthrough-data"] .save_tag': 'createTag',
            'keyup input[type=url]': 'updateUrl',
            'click #list-playlist-name': function(){Common.toggleDropDownDisplay()},
            'click .dropdown-list li':'selectPlayListFromDropDown',
            'click .show-advanced-options': 'scrollToAdvancedOptions',

            // Playlist functions
            'click .playlist_layout_block:not(.disabled)':'createPlaylist',
            'click .playlist-left .edit-hamburger':'showPlayListOptions',
            'submit form[name=playlist-data]': 'savePlaylist',
            'click .edit-plist': 'editPlaylist',
            'click .enable-plist': 'showEnableDisablePlaylist',
            'click .delete-plist': 'showDeletePlaylist',
            'click .enable-playlist .enable': 'enablePlaylist',
            'click .disable-playlist .disable': 'disablePlaylist',
            'click .delete-playlist .delete': 'deletePlaylist',
            'click .playlist-left .select-playlist': 'selectMultiplePlaylists',

            //Demo list functions
            'submit form[name=walkthrough-data]': 'saveChapter',
            'click .chapter-edit-hamburger': 'toggleChapterEditOptions',
            'click .chapter-enable': 'toggleEnableDisableChapter',
            'click .popup-enable-chapter .enable': 'enableChapter',
            'click .popup-disable-chapter .disable': 'disableChapter',
            'click .chapter-delete': 'showDeleteChapterPopup',
            'click .popup-delete-chapter .delete': 'deleteChapter',
            'click .chapter-duplicate': 'duplicateChapter',
            'click li .select-chapter': 'selectMultipleChapters',

            //Player functions
            'click .demo_layout_block:not(.disabled)': 'createNewDemo',
            'click .wt-title-edit:not(.disabled), .chapter-edit, .add-new-chapter': 'showCreateChapter',
            'click .create-new.slide': 'showAddSlide',
            'click div[type=slide_options_close]': 'hideAddSlide',
            'click .new_slide_options .options': 'showAddSlideOption',
            'click .slide_options .close': 'hideAddSlideOption',
            'click .resourceUrl': 'showUploadUrl',
            'click .upload_media_block .uploadFile': 'hideUploadUrl',
            'dragover .drag': 'dragOverNewSlide',
            'click div[type=slide_settings]': 'showSlideSettings',
            'click div[type=edit-highlighter]': 'toggleHotspotEdit',
            'click div[type=delete-slide]': 'showDeleteSlidePopup',
            'click .popup-delete-media .delete': 'deleteSlide',
            'click .popup-box.popup-save-hotspot .save': 'saveHotspot',
            'click .popup-box.popup-save-hotspot .cancel': 'cancelHotspot',
            'click .hotspot-edit': 'editHotspot',
            'click .hotspot-delete': 'deleteHotspot',
            'click .slide-rearrange': 'toggleSlideRearrange',
            'keydown .notes p, .notes h1, .url_input, .pin-tooltip h1, .pin-tooltip p, .content-editor-wrap': function(event){event.stopPropagation()},
            'focus .notes p, .notes h1, .pin-tooltip p, .pin-tooltip h1': 'editContentFocus',
            'click .add-new-notes, .notes .edit-notes, .pagination li[data-page="new"]': 'createEditNotes',
            'submit form[name=slide-notes-data]': 'saveSlideNotes',
            'click .notes .delete-notes': 'showNotesDeletePopup',
            'click .popup-delete-notes .delete': 'deleteNotes',
            'blur .pin-tooltip p, .pin-tooltip h1': 'updatePinNotes',
            'click div[type=edit-drop-pin]': 'togglePinEdit',
            'click [slide-type=image].pin-cursor, [slide-type=360] .product-frame.pin-cursor': 'locatePin',
            'click .pin-delete': 'deletePin',
            'change .slide-file': 'previewSlideMedia',
            'change #add-slide-360-frames': 'add360SlideFrames',
            'change #upload-notes-link-file': 'previewNotesLinkResource',
            'click .url_upload': 'urlMediaUpload',
            'keyup .url_input': 'updateUrl',
            'blur .popup-slide-settings .url_input': 'updateUrl',
            'keyup .popup-slide-settings .url_input': 'updateUrl',
            'change form[name=replace-media] input[media-type]': 'previewReplaceSlideMedia',
            'submit form[name=replace-media]': 'replaceSlideMedia',
            'change input[name=goto]': 'calloutGoto',
            'click #box-content-list .expandSection': 'toogleSitMapNavigation',
            'click #bulltein-sitemap .expandSection, .connector-folder .expand-folder': 'toogleSitMapSections',
            'mouseenter .slide_information': 'demoInfo',
            'mouseleave .slide_information': 'demoInfo',
            'click  .slides_wraper .slide': 'filmstripSlideNavigation',
            'keyup #hotspot-timer': 'restrictValToNumber',

            'click .content-slide-edit': 'showTextEditor',
            'click .content-done' : 'checkContentSaved',
            'click .textedit-exit': 'exitTextEditor',
            'click .try-again': 'retrySaveTextContent',
            'click .layout-selection li': 'selectLayout',
            'click .upload_cancel, .malware-error .close-button': 'displayUploadBox',
            'click .upload_retry': 'retryUpload',
            'click .slide_option_360 .close': 'close360Preview',
            'click .slide_360_frames_wrap li span': 'delete360FrameWarning',
            'click .frame-360-delete-warning .delete': 'delete360Frame',
            'click .done-360:not(.disabled)': 'initiateSaveMultipleImages',

            /* sortable */
            'dragstart .sortable-item': 'sortableDragStarted',
            'dragover .sortable-item, .dropzone': 'sortableDraggingOver',
            'dragleave .sortable-item, .dropzone': 'sortableDraggingLeave',
            'drop .sortable-item, .dropzone': 'sortableElemDropped',
            'dragend .slide_360_frames_wrap ul': 'deleteDropZones',

            /* Restricted Access */
            'click .usr-grps-list .user-group-items': 'selectUserGroups',
        },

        // edit view initial functions
        initialize: function (attrs) {
            $(window).on('resize', {'root': this}, this.onWindowResize);
            this.$("#user-language li").on('click', {'root': Common}, function(e){Common.changeLanguage(e)});
            this.listenTo(Backbone, 'view_rendered', this.viewRender);
            this.listenTo(Backbone, 'playlist_rendered', this.playListRender);
            this.listenTo(Backbone, 'player_view_rendered', this.playerViewRender);
            this.listenTo(Backbone, 'slide_changed', this.slideChanged);
            this.listenTo(Backbone, 'before_slide_change', this.disablePinHotspotEdit);
            this.listenTo(Backbone, 'player_menu_height_set', this.resetPlayerLeftMenuHeight);
            this.listenTo(Backbone, 'side_info_opened', this.toggleAddSlideButton);
            this.listenTo(Backbone, 'cta_toggled', this.ctaToggled);
            this.listenTo(Backbone, 'walkthrough_opened', this.resetPlayerOptions);
            this.listenTo(Backbone, 'back_to_playlist', this.resetPlayerOptions);
            this.listenTo(Backbone, 'cta_overlay_opened', this.sectionCtaToggled);
            this.listenTo(Backbone, 'cta_overlay_closed', this.sectionCtaToggled);
            this.listenTo(Backbone, 'notes_changed', this.setNotesEditOptions);
            this.render();
            this.overlayCalc();
            this.refreshEveryHour();
            this.current_view = null;
            this.dragSvgIcon =  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve">\
                                    <polygon fill-rule="evenodd" clip-rule="evenodd" points="95,50 83.75,38.75 83.75,44.375 55.625,44.375 55.625,16.25 61.25,16.25   50,5 38.75,16.25 44.375,16.25 44.375,44.375 16.25,44.375 16.25,38.75 5,50 16.25,61.25 16.25,55.625 44.375,55.625 44.375,83.75   38.75,83.75 50,95 61.25,83.75 55.625,83.75 55.625,55.625 83.75,55.625 83.75,61.25 "/>\
                                </svg>';
        },

        onWindowResize: function (e){
            var root = e.data.root;
            root.overlayCalc();
        },

        render: function () {
            let attrs = {
                repository_manager: document.repository_manager
            }
            this.$('#edit-popups').html(this.template(attrs));
            this.clearLocalStorage(['currentFrameNum', 'framesPath', 'userActions', 'remotePDFUrl']);
            return this;
        },

        initView: function(view){
            this.product = this.product_id = this.section = this.section_id = this.walkthrough = this.walkthrough_id, this.tenant = null;
            this.current_view = view;

            if(this.current_view){
                this.product = view.product;
                this.product_id = view.product_id;
                this.section = view.section;
                this.section_id = view.section_id;
                this.walkthrough = view.walkthrough;
                this.walkthrough_id = view.walkthrough_id;
                this.tenant = this.current_view.section && this.current_view.section.get('tenant');
                if (this.tenant.template == 'dell' &&
                    this.section.attributes['bulletin_board_list'].length >=1){
                    this.$('.create-new-bulletin').hide();
                }
            }
        },

        // edit view initial functions
        // Create/Edit section functions
        viewRender: function(view) {
            this.$('.create-new').removeClass('active');
            var viewSection = view.section;
            // Hide 'Create-New' button for restricted-sections.
            if((viewSection.get('can_edit') != undefined && !viewSection.get('can_edit'))){
                $('.create-new').hide();
                $('.create-new-bulletin').hide()
            }else{
                this.$('.create-new').removeClass('slide').removeAttr('parent').show();
            }            
            $('#edit_container .publish, #edit_container .preview').removeAttr('walkthrough').addClass('disable');
            var editOptions = "<div class='edit'>\
                                   <div class='enable no-action rippleEffect'></div>\
                                   <div class='duplicate-section no-action rippleEffect'></div>\
                                   <div class='oedit no-action rippleEffect'></div>\
                                   <div class='delete no-action rippleEffect'></div>\
                               </div>";
            this.$(".pwt-wrap .edit").remove()
            this.$(".pwt-wrap").append(editOptions);
            var editButton = "<div class='right-wrapper'><div class='edit-hamburger no-action'><span class='no-action'></span></div>\
                              <div class='section-drag no-action '>"+ this.dragSvgIcon +"</div></div>";
            this.$(".pwt-wrap .right").find('.edit-hamburger, .section-drag').remove()
            this.$(".pwt-wrap .right").append(editButton);
            this.$(".create-section").removeAttr('parent');
            this.initializeSortable();
            this.initializeBulletinBoardSortable();
            this.initView(view);
            if(this.section_id){
                this.$(".create-new").attr('parent', this.section_id);
                if(this.section && this.section.get('children') && !this.section.get('children').length){
                    this.$(".create-section").attr('parent', this.section_id);
                }
            }
        },

        //intial sortable for section re-ordering
        initializeSortable: function(){
            var root = this;
            this.$(".sortable").sortable({
                placeholder: 'highlight',
                handle: ".section-drag",
                containment: "parent",
                update : function(event, ui) {
                    var cur_ele_slug = ui.item.find('.pwt-box').attr('slug');
                    var prev_ele_slug = ui.item.prev().find('.pwt-box').attr('slug');

                    var section = new Section({
                        'id': cur_ele_slug,
                        'reorder': 'section',
                        'target_parent_slug': (root.section && root.section.get('slug')) || '',
                        'after_ele_slug': prev_ele_slug
                    });
                    section.save(null, {
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

        // Initialize Bulletin Board Sortable
        initializeBulletinBoardSortable: function() {
            var root = this;
            this.$('.bulletin-board-sortable').sortable({
                placeholder: 'highlight',
                handle: '.bulletin-board-drag',
                containment: 'parent',

                update : function(event, ui) {
                    var choosen_entity_id = ui.item.attr("id");
                    var target_entity_id = ui.item.prev().attr("id");
                    var bboard = new BulletinBoard({
                        "id": choosen_entity_id,
                        "target_entity_id": target_entity_id,
                        "reorder": "bulletin_board",
                        "section_slug": root.section_id
                    });
                    bboard.save(null, {
                        patch: true,
                        success: function(){
                            root.$(".bulletin-board-sortable").sortable("refresh");
                        }, error: function(xhr, status_code, message){
                            root.$(".bulletin-board-sortable").sortable("cancel");
                        }
                    })
                }
            }); 
        },

        initializeBulletinBoardLinkSortable: function() {
            this.$(".bulletin-links-list").sortable({
                placeholder: 'highlight',
                handle: ".bulletin-board-link-drag",
                containment: "parent",
            }); 
        },
        initializeSectionJourneyLinkSortable: function() {
            this.$(".journey-link-list").sortable({
                placeholder: 'highlight',
                handle: ".journey-link-drag",
                containment: "parent",
            }); 
        },


        updatePopupTexts: function(event){
            /** update bulletin board popups text */
            let popUpData = event.currentTarget.dataset;
            if (popUpData.showpopup == "bulletin-browse-link-popup") {
                this.$('.bulletin-browse-link-popup .save').text('save');
            } else if( popUpData.showpopup == "create-bulletin-link-popup"){
                this.$('.create-bulletin-link-popup .popup-title').text('create link');
                this.$('.add-external-link').text('add');
                this.$('#link-title-validation, #link-validation').text('');
                this.$('.create-bulletin-link-popup input').val('');
            }
            this.replacePopup(event);
        },

        /**
         * This is a comman function to hide current popup and show a new popup without animation
         * Comman attribues to pass
         *  ele with class name --> trigger-inplace-popup
         *  ele with hide data attr --> data-hidePopup="popup class name to hide"
         *  ele with show data attr --> data-showPopup="popup class name to show"
         */
        replacePopup: function(event, is_edit=false) {
            let popUpData = event.currentTarget.dataset;
            if(popUpData.showpopup) {
                $(`.${popUpData.showpopup}`).removeClass('hidden');
            }
            if(popUpData.hidepopup) {
                $(`.${popUpData.hidepopup}`).addClass('hidden');
            }       
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

        // Display repository connectors list
        showRepositoryConnectorList() {
            this.popupClose('choose-category-type', true);
            setTimeout(() => {
                this.popupShow('repository-connector-list');
                this.$('.repository-connector-list').html(RepositoryConnectorListPopup)
                Common.getRepositoryConnectorList()
                .then((data) => {
                    const connectors = data.map((connector) => {
                        if(connector.site_url.includes('sharepoint')) {
                            connector.platform = 'sharepoint'
                        }
                        return connector;
                    }) 
                    this.$('.repository-connector-list-popup .content-block').html(RepositoryConnectorList(connectors))
                })
                .catch((e) => {
                    this.$('.repository-connector-list-popup .content-block').html(e.message)
                })
            }, 200);
        },

        // Get all repository folders list 
        getRepositoryConnectorFolders(event) {
            this.$('.connector-folder-list-popup .content-block').show();
            this.$('.connector-folder-list-popup .popup-footer').hide();
            this.$('.connector-folder-list-popup .content-block-list').empty();
            let connectorId = $(event.currentTarget).attr("id"),
                repositoryConnector = new RepositoryConnector({id: connectorId}),
                root = this;
            repositoryConnector.fetch({
                async: true,
                data: {'listing_folders': true},
                success(response) {
                    root.$('.connector-folder-list-popup .content-block').hide()
                    root.$('.connector-folder-list-popup .content-block-list').html(
                        ConnectorFolderTree(response.attributes.folders)
                    ).show();
                    root.$('.connector-folder-list-popup .popup-footer').show();
                    root.$(".link-selected-repository-folder").data({
                        "connector-id": connectorId,
                        "parent": root.section_id
                    });
                },
                error(xhr, status) {
                    root.$('.connector-folder-list-popup .content-block, .connector-folder-list-popup .popup-footer').hide();
                    root.$('.connector-folder-list-popup .content-block-list').html(status.statusText);
                }
            })
        },

        // select and unselect of repository folders
        toggleConnectorFolderSelection(event) {
            this.$(`.connector-folder input[type=checkbox]:not(#${event.target.id})`).prop('checked', false);
        },

        // start creating section and chapters from repository
        startCreatingConnectorFolders() {
            if(!this.$('.connector-folder input[type=checkbox]:checked').length) {
                return;
            }
            this.actionInProgress('connector-folder-list-popup');
            let listenerData = this.$('.connector-folder input[type=checkbox]:checked').parents("li").data();
            let folderDetails = {
                "connector_id": $(event.target).data("connector-id"),
                "relative_folder_path": listenerData.relativeFolderPath,
                "root_folder": listenerData.rootFolder,
                "parent": $(event.target).data("parent")
            };
            let repositoryListener = new RepositoryListener(folderDetails);
            var root = this;
            repositoryListener.save(null, {
                success() {
                    let post_success = () => {
                        root.$(".popup-box.repository-connector-list").empty();
                    }
                    root.actionSuccess('repository-connector-list', post_success);
                    if(root.section_id) root.current_view.load(root.section_id, true);
                    else root.current_view = new HomeView();
                },
                error(xhr, status) {
                    root.actionFailed('connector-folder-list-popup');
                }
            })
        },

        // Display the category add/edit popup after box-import popup.
        showCategoryLayoutCloseBox: function(event) {
            var root = this
            this.popupClose('box-category-option', true);
            setTimeout(function() {
                // Display 'Asset-Link'/'Default-Category' option.
                let popupName = 'choose-category-type'; 
                root.popupShow(popupName);
                root.$('.' + popupName + ' .layouts').attr('show-private', true);
                // root.createEditSection(event, true);
            }, 200);
        },

        // Display the category add/edit popup after category-type popup.
        showCategoryLayoutCloseType: function(event){
            this.popupClose('choose-category-type', true);
            var root = this;
            setTimeout(function(){
                root.createEditSection(event);
            }, 200);
        },

        /**
        * Return True if restriction is set in parent entity else false.
        */
        checkIsRestrictionSetInParent: function(section){
            return (
                section.is_restriction_set_in_parent
                || (section.restricted_to_group_details
                    && section.restricted_to_group_details.length)
            );
        },

        /**
        * Return an object containing restricted to group details.
        * restrictedToGroups    - Array containing selected group names.
        * restrictedToGroupIds  - Array containing selected group ids.
        * userGroupOptions      - Object containg selected group entities.
        * isRestrictionEnabled  - Boolean value.
        */
        getRestrictedToGroupDetails: function(restrictedToGrps, userGroups){
            let restrictedToGroups = [];
            let restrictedToGroupIds = [];
            let isRestrictionEnabled = false;
            var setDefaultUserGroup = true;
            let userGroupOptions = userGroups;
            if(restrictedToGrps && restrictedToGrps.length){
                _.each(restrictedToGrps, (grp) => {
                    restrictedToGroups.push(grp.name);
                    restrictedToGroupIds.push(grp._id);
                });
                _.each(userGroupOptions, (grp)=>{
                    if(restrictedToGroupIds.includes(grp._id)){
                        grp.isChecked = true;
                        setDefaultUserGroup = false;
                    }else{
                        grp.isChecked = false;
                    }
                });
                isRestrictionEnabled = true;
            }

            if(setDefaultUserGroup){
                _.each(userGroupOptions, (grp) =>{
                    // Set the default user_group as checked,
                    // only if none of the user_groups are selected while getting api-data.  
                    if(grp.is_default){
                        grp.isChecked = true;
                        restrictedToGroups = [grp.name];
                        restrictedToGroupIds = [grp._id];
                        isRestrictionEnabled = true;
                    }
                });
            }

            // Set the user-group with admin/author role as checked and disabled.
            _.each(userGroupOptions, (grp) => {
                if(grp.is_author){
                    grp.isChecked = grp.selectedDisabled = true;

                    if($.inArray(grp.name, restrictedToGroups) == -1)
                        restrictedToGroups.push(grp.name);

                    if($.inArray(grp._id, restrictedToGroupIds) == -1)
                        restrictedToGroupIds.push(grp._id);
                }
            });

            return {
                restrictedToGroups: restrictedToGroups,
                restrictedToGroupIds: restrictedToGroupIds,
                userGroupOptions: userGroupOptions,
                isRestrictionEnabled: isRestrictionEnabled,
            }
        },

        /**
        * Displays the popup for creating/editing category/section.
        * Invoked at HomePage/SectionList pages.
        * Invoked directly by 'edit' button on the categories/sections edit-options.
        * When invoked thru 'edit' button, api 'GET' is called and form is prepopulated. 
        */
        createEditSection: function(event){

            var currentElement = this.$(event.currentTarget);
            var element = currentElement.parent().siblings('.pwt-box.active');
            if(element.hasClass('disabled') || element.hasClass('uneditable')) return false;

            var showPrivateOption = Boolean(currentElement.parent().attr('show-private'));
            currentElement.parent().removeAttr('show-private');
            var isAsset = currentElement.hasClass('category-link-asset');

            var sectionSlug = element.attr('slug');
            this.$('form[name=default-section-data], form[name=asset-section-data]').removeAttr('section-id disabled');
            
            var root = this;
            if(sectionSlug){
                this.fetchAndUpdateSectionPopup(sectionSlug);
            }else{
                var section = new Object()
                section.name_limit = root.SECTION_TITLE_LIMIT;
                section.description_limit = root.SECTION_DESCRIPTION_LIMIT;

                let layoutType = {'isEdit': false, 'isAsset': isAsset};
                let options = {
                    'showPrivateOption': showPrivateOption,
                    'showExportOption': false
                };
                this.updateSectionPopup(section, layoutType, options);
            }
            this.$(".popup-edit input[name=parent]").val(this.section_id);
            this.overlayCalc();
            this.$('.popup-box .content-block').niceScroll();
            this.popupShow("popup-edit");
            this.initEolDatePicker(this.$('#section_expire_at'));
            this.initializeSectionJourneyLinkSortable();
        },

        /**
        * While editing a section, fetch the details using id(slug),
        * call 'updateSectionPopup' to update the edit window with the fetched details.
        * If section has a CTA, fetch and update the CTA details.
        * param:
        *   sectionId   - String slug id.
        */
        fetchAndUpdateSectionPopup: function(sectionId){

            var root = this;
            var showExportOption = false;
            var section = new Section({id: sectionId});
            section.fetch({
                async: false,
                success:function(resp){
                    var sectionData = section.attributes;
                    var nameLength = sectionData && sectionData.name && sectionData.name.length || 0;
                    var descriptionLength = sectionData && sectionData.description && sectionData.description.length || 0;
                    sectionData.name_limit = root.SECTION_TITLE_LIMIT - nameLength;
                    sectionData.description_limit = root.SECTION_DESCRIPTION_LIMIT - descriptionLength;

                    var showPrivateOption = sectionData.parent ? false : true; 
                    if(sectionData.tenant.can_download){
                        _.filter(sectionData.playlists, function(playlist){
                            if(playlist.is_enabled == true){
                                showExportOption = true;
                            }
                        });
                    }
                    let layoutType = {'isEdit': true,
                                      'isAsset': Boolean(sectionData.linked_asset)};
                    let options = {'showPrivateOption': showPrivateOption,
                                   'showExportOption': showExportOption};
                    let formName = 'form[name=default-section-data]';
                    if(sectionData.linked_asset){
                        let urlLength = sectionData.linked_asset.name && sectionData.linked_asset.name.length || 0;
                        sectionData.linked_asset.name_limit = root.SECTION_ASSET_URL_LIMIT - urlLength;
                        sectionData.linked_asset.url = window.location.origin +
                                                       Common.SECTION_ASSET_ROUTE +
                                                       sectionData.linked_asset.name;
                        formName = 'form[name=asset-section-data]';
                    }
                    root.updateSectionPopup(sectionData, layoutType, options);
                    if(sectionData.linked_asset && sectionData.linked_asset.language_id != document.current_locale)
                        root.$('.custom-url-block .section-url')
                            .addClass('disabled')
                            .attr('disabled', true);
                    root.$(formName).attr('section-id', sectionId);
                    root.$(".popup-edit input[name=show]").prop('checked', !resp.get('is_hidden'));
                    root.$(".popup-edit input[name=private]").prop('checked', resp.get('is_private'));
                    _.each(resp.get('videos'), function(video){
                        root.renderVideoDetails(video.link);
                    });

                    if(sectionData.expire_at){
                        let expire_at = new Date(sectionData.expire_at);
                        root.$('#section_expire_at')
                            .val(expire_at.toLocaleString({},{'hour12': true}).replace(/\//g, '-'));
                    }

                }
            });
        },

        renderBulletinSiteMap: function() {
            Common.fetchSiteMapData()
            .then((data) => {
                let selectedGroupIds = [];
                let selectedGroups = this.$('#bboard-usr-grp-dropdown');
                if(selectedGroups.attr('data-selected-groups')){
                    _.each(selectedGroups.attr('data-selected-groups').split(","), gId => {
                        selectedGroupIds.push(parseInt(gId));
                    });
                }
                let siteMapData = Common.updateSitemapData(data, selectedGroupIds);
                this.$el.find('#bulltein-sitemap').html(
                    siteMapData.length ? BulletinMainSiteMap({'siteMapData': siteMapData}) :
                    `<div> ${this.NO_RECORDS_TEXT} </div>`
                );
                this.$("#bulltein-sitemap .loading-icon").hide()
            })
            .catch((e) => {
                this.$el.find('#bulltein-sitemap').html('<div>Oops! Something went wrong.</div>');
            })

        },
        
        submitBulletinBoardDetails: function(event){
            event.preventDefault();
            var showError = false,
                currentFormName = this.$(event.currentTarget).attr('name'),
                formName = "form[name=" + currentFormName + "]";

            var bulletinBoardName = this.$(formName + " input[name='name']");
            var bulletinBoardDescription = this.$(formName + " textarea");
            var bulletinBoardLinksLength = this.$('.bulletin-links-list li').length;
            if (!bulletinBoardName.val()) {
                this.customErrorMessage('Provide a name', this.$(bulletinBoardName).parent(), this.$(bulletinBoardName));
                showError = true;
            } else if(bulletinBoardName.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a name without special characters', this.$(bulletinBoardName).parent(), this.$(bulletinBoardName));
                showError = true;
            } else if(bulletinBoardLinksLength == 0){
                this.customErrorMessage('Provide atleast one link', this.$('#link-container'), this.$(bulletinBoardLinksLength));
                showError = true;
            }
            if (showError) return false;
            let selectedGroupIds = [];
            let selectedGroups = this.$('#bboard-usr-grp-dropdown');
            if(selectedGroups.attr('data-selected-groups')){
                _.each(selectedGroups.attr('data-selected-groups').split(","), (gId)=>{
                   selectedGroupIds.push(parseInt(gId));
                });
            }
            var linkDetails = [];
            var links = this.$('.bulletin-links-list li');
            var root = this;

            _.each(links, function(elem, index){
                let linkElem = root.$(elem).find('.bulletin-link-url');
                let linkType = linkElem.data('type');
                let linkGrupIds = []
                if(linkElem.attr('data-groups')){
                    _.each(linkElem.attr('data-groups').split(','), gId =>{
                        linkGrupIds.push(parseInt(gId));
                    })
                };

                if (linkType == 'internal' && (!(_.difference(selectedGroupIds, linkGrupIds)).length == 0)){
                    linkElem.parents(`.bulletin-link-data`).remove();
                    return;
                }
                let url, breadcrumb;
                if (linkType == 'internal'){
                    breadcrumb = linkElem.html();
                    url = root.$(elem).find('.bulletin-link-url').attr('href');
                }else{
                    url = linkElem.html();
                }
                var linkDataAttr = linkElem.data();
                linkDetails.push({
                    'title':root.$(elem).find('.bulletin-link-title').html(),
                    'url': url,
                    'type': linkElem.data('type'),
                    'order': index + 1,
                    'breadcrumb': breadcrumb,
                    'groups': linkGrupIds,
                    'link_id': linkDataAttr.linkid ||null,
                    'product_id': linkDataAttr.product || null,
                    'section_id': linkDataAttr.section || null,
                    'chapter_id': linkDataAttr.chapter || null,
                });

            })
            this.$(formName).attr('disabled', 'disabled');  
            this.actionInProgress('create-bulletin-board');
            this.removeCustomErrorMessage();
            var bulletinBoardData = {
                section_slug: this.section_id,
                name: bulletinBoardName.val(),
                description: bulletinBoardDescription.val(),
                links: linkDetails,
                restricted_to_groupids: selectedGroupIds
            };
            if(this.$(formName).attr('id')){
                bulletinBoardData.id = this.$(formName).attr('id');
            }
            var bulletinBoard = new BulletinBoard(bulletinBoardData);
            var root = this;
            bulletinBoard.save(null,{
                success:function(response){
                    root.actionSuccess('create-bulletin-board');
                    root.section_id ? root.current_view.load(root.section_id, true) :
                        root.current_view = new HomeView();                     
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('create-bulletin-board');
                },
            });
        },

        // show select button on hovering category, section, chapter
        showSiteMapOptions: function(event){
            this.$(event.currentTarget).children('.select-sitemap-content').removeClass('hide');
        },

        hideSiteMapOptions: function(event){
            this.$(event.currentTarget).children('.select-sitemap-content').addClass('hide')
        },

        /**
        * Populate the sectionForm template with section details.
        * params:
        *   section     - Backbone model/Object.
        *   layoutType  - Json data containing layout flags 'isEdit', 'isAsset'.
        *   options     - Json data containing flags for 'showPrivateOption', 'showExportOption'.
        */
        updateSectionPopup: function(section, layoutType, options){
            let grpDetails = {};
            let isRestrictionSetInParent = false;
            let showRestrictionOption = false;
            let restrictionsDisabled = true;
            let template = this.tenant.template;
            let isJourneyEnabled = _.some(this.tenant.applications, function(app){
                return app.unique_id.toLowerCase() == 'journeys' && template == 'vmware'
            });
            if(document.isPrivateTenant){

                let parentSection = this.current_view.section.attributes;
                isRestrictionSetInParent = (
                    section.is_restriction_set_in_parent
                    || parentSection.is_restriction_set_in_parent
                    || (parentSection.restricted_to_group_details
                        && parentSection.restricted_to_group_details.length)
                );

                let tenantUsrGrps = (section.tenant && section.tenant.user_groups) ?
                    section.tenant.user_groups : this.tenant.user_groups;
                let userGroups = [];
                let restrictedToGroupDetails = (layoutType.isEdit) ?
                    section.restricted_to_group_details : parentSection.restricted_to_group_details;

                // If restriction is set in parent entity,
                // then in child entity, only the options which are selected in parent should be selectable.
                if(isRestrictionSetInParent){
                    if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                        userGroups = parentSection.restricted_to_group_details;
                        restrictionsDisabled = false;
                    }
                }else{
                    userGroups = tenantUsrGrps;
                    restrictionsDisabled = false;
                }
                // 'userGroups' will be tenant's user-groups in case of 'product',
                // it will parent's restricted_to_groups in case of 'section' inside a 'product'.

                grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                showRestrictionOption = Boolean(tenantUsrGrps && tenantUsrGrps.length);
            }

            let eolExpireAt;
            if (section.expire_at){
                eolExpireAt = new Date(section.expire_at);
                eolExpireAt = eolExpireAt.toISOString().slice(0, 16);
            }

            this.$('#create-edit-section').html(this.sectionForm({
                titleMaxLength: this.SECTION_TITLE_LIMIT,
                descriptionMaxLength: this.SECTION_DESCRIPTION_LIMIT,
                urlMaxLength: this.SECTION_ASSET_URL_LIMIT,
                section: section,
                isAsset: layoutType.isAsset,
                isEdit: layoutType.isEdit,
                eolExpireAt: eolExpireAt,
                showCreateCta: document.defaultLocaleID == document.current_locale,
                isPrivateTenant: document.isPrivateTenant,
                isJourneyEnabled: isJourneyEnabled,
                showPrivateOption: options.showPrivateOption,
                showExportOption: options.showExportOption,
                showRestrictionOption: showRestrictionOption,
                restrictionsDisabled: restrictionsDisabled,
                isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                restrictedToGroups: grpDetails.restrictedToGroups,
                restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                userGroupOptions: grpDetails.userGroupOptions,
                journeyList:section.journey_list
            }));
            
            //adding cta list to section popup
            this.sectionCtaList = []
            this.removedCtaIds  = []
            if(!layoutType.isAsset){
                _.each(section.cta_list, cta => {
                    this.sectionCtaList.push({
                        ctaId: cta.cta_id,
                        type: cta.type,
                        text: cta.text,
                        href: cta.href,
                        fileName: cta.name,
                        uniqueId: _.uniqueId('cta_')
                    })
                })
                this.addCtaList();
            }
        },

        selectPlayListFromDropDown: function(event) {
            var currentTrg = this.$(event.currentTarget);
            if(!currentTrg.hasClass('active')) {
                currentTrg.addClass('active');
                currentTrg.siblings().removeClass('active');
            }
            var pl_name = currentTrg.text();
            var pl_value = currentTrg.val();
            var selectedValue = currentTrg.parents('#list-playlist-name').children('span');
            selectedValue.attr('value',pl_value);
            selectedValue.text(pl_name);
        },

        showBulletinBoardPopup: function(bulletinBoardData, isEdit){
            let grpDetails = {};
            let isRestrictionSetInParent = false;
            let showRestrictionOption = false;
            if(document.isPrivateTenant){
                let bulletinBoardSection = this.current_view.section.attributes;
                isRestrictionSetInParent = (
                    bulletinBoardSection.is_restriction_set_in_parent
                    || (bulletinBoardSection.restricted_to_group_details
                        && bulletinBoardSection.restricted_to_group_details.length)
                );
                let tenantUsrGrps = (bulletinBoardSection.tenant &&
                    bulletinBoardSection.tenant.user_groups) ?
                    bulletinBoardSection.tenant.user_groups : this.tenant.user_groups;
                let restrictedToGroupDetails = isEdit ?
                    bulletinBoardData.restricted_to_group_details : bulletinBoardSection.restricted_to_group_details;

                // If restriction is set in Section
                // then in bulletin board, only the options which are selected in section should be selectable.
                let userGroups = [];
                if(isRestrictionSetInParent){
                    if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                        userGroups = bulletinBoardSection.restricted_to_group_details;
                    }
                }else{
                    userGroups = tenantUsrGrps;
                }
                // 'userGroups' will be tenant's user-groups in case of 'product level bulletin board',

                grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                showRestrictionOption = tenantUsrGrps && tenantUsrGrps.length>0;

            }
            this.$('.create-bulletin-board').html(CreateBulletin({
                'isEdit': isEdit,
                'isHidden': document.defaultLocaleID !== SDCookies.getItem('author_locale'),
                bulletinBoard: bulletinBoardData,
                restrictedToGroups: grpDetails.restrictedToGroups,
                restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                userGroupOptions: grpDetails.userGroupOptions,
                showRestrictionOption: showRestrictionOption
            }));
            this.popupShow('create-bulletin-board');
            this.initializeBulletinBoardLinkSortable();
        },

        fetchBulletinBoardDetails: function(bbId){
            var bulletinBoard = new BulletinBoard({
                id:bbId
            })
            var root = this;
            bulletinBoard.fetch({
                async:false,
                success:function(model, response){
                    let isEdit = true;
                    root.showBulletinBoardPopup(response, isEdit)
                }
            })

        },

        createEditBulletinBoard: function(event) {
            // Insert the bulletin popup
            var element = this.$(event.currentTarget).parents('.bulletin-board-block');
            if(element.hasClass('disabled') || element.hasClass('uneditable')) return false;
            var bbId = parseInt(element.attr('id'));
            if (bbId){
                this.fetchBulletinBoardDetails(bbId)
            }else{
                if(document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();
                let isEdit = false;
                this.showBulletinBoardPopup(isEdit)
            }
        },

        showEnableDisableBulletinBoard: function(event){
            var element = this.$(event.currentTarget).parents('.bulletin-board-block');
            if(element.hasClass('uneditable')) return false;
            if (this.$(event.target).parents('.bulletin-board-block').hasClass('disabled')) {
                var enable_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
                this.$('.enable-bboard .enable').attr('id', enable_id);
                this.popupShow('enable-bboard');
            } else{
                var disable_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
                this.$('.disable-bboard .disable').attr('id', disable_id);
                this.popupShow('disable-bboard');
            };
        },

        enableDisableBulletinBoard: function(event){
            let bboard_id = this.$(event.currentTarget).attr('id');
            let is_enabled = !(this.$(event.currentTarget).hasClass('disable'));
            var bulletinBoard = new BulletinBoard({id: bboard_id, is_enabled: is_enabled});
            is_enabled ? this.actionInProgress('enable-bboard') :
                this.actionInProgress('disable-bboard')

            var root = this;
            bulletinBoard.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    is_enabled ? root.actionSuccess('enable-bboard') :
                        root.actionSuccess('disable-bboard');
                    root.section_id ? root.current_view.load(root.section_id, true) :
                        root.current_view = new HomeView();
                },
                error:function(xhr, status_code, error_message){
                    is_enabled ? root.actionFailed('enable-bboard') : root.actionFailed('disable-bboard');
                }
            });
        },

        showDeleteBulletinBoard: function(event){
            var element = this.$(event.currentTarget).parents('.bulletin-board-block');
            if(element.hasClass('uneditable')) return false;
            var delete_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
            this.$('.delete-bulletin-board .delete').attr('id', delete_id);
            this.popupShow('delete-bulletin-board');
        },

        deleteBulletinBoard: function(event){
            var delete_id = this.$(event.currentTarget).attr('id');
            var bulletinBoard = new BulletinBoard({
                id: delete_id
            });
            this.actionInProgress('delete-bulletin-board');

            var root = this;
            bulletinBoard.destroy({
                wait:true,
                success:function(){
                    root.actionSuccess('delete-bulletin-board');
                    root.section_id ? root.current_view.load(root.section_id, true) :
                        root.current_view = new HomeView();                    
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('delete-bulletin-board');
                }
            });
        },

        addExternalLink: function(event) {
            this.$('.error-msg').text("");
            let is_edit = this.$(event.currentTarget).attr('is_edit');
            let linkTitle = this.$('.bulletin-external-link-title').val();
            let linkHref = this.$('.bulletin-external-link-url').val();
            if(!linkTitle){
                this.$('#link-title-validation').text('Provide a title for the link.')
                return
            }
            if(!linkHref){
                this.$('#link-validation').text('Provide a URL.');
                return
            }
            if (!Common.validateUrl(linkHref)) {
                this.$('#link-validation').text('Oops! Please enter a valid URL.');
               return
            }
            if(is_edit){
                this.$(`li.editing .bulletin-link-title`).text(linkTitle);
                this.$(`li.editing a`).attr('href', linkHref).text(linkHref);
                this.$(`li.editing .edit-bulletin-link`).attr({
                    'data-title': linkTitle,
                    'data-href': linkHref,
                    'data-type': 'external'
                });
                this.$(`li.editing`).removeClass('editing');
                this.$(event.currentTarget).text('add').removeAttr('is_edit');
            }
            else{
                let linkDetails = [];
                let link = {
                    name: linkTitle,
                    url:linkHref,
                    link_type: 'external' 
                };
                linkDetails = link;
                this.$('.bulletin-links-list').append(BulletinBoardLinks(link));
            }
            this.replacePopup(event);
            this.initializeBulletinBoardLinkSortable();
        },

        editExternalLink: function(event){
            this.$('.error-msg').text("");
            let is_edit = true;
            let parentElem = this.$(event.currentTarget).parents('li');
            parentElem.addClass('editing');
            let title = parentElem.find('.bulletin-link-title').text();
            let linkUrl = parentElem.find('.bulletin-link-url').text();
            this.$(`.bulletin-external-link-title`).val(title);
            this.$(`.bulletin-external-link-url`).val(linkUrl);
            this.replacePopup(event, is_edit);
            this.$(`.create-bulletin-link-popup .popup-title`).text('edit link');
            this.$(`.add-external-link`).text('update').attr({
                'is_edit': is_edit,
            });
        },

        removeBulletinLink : function(event){
            this.$(event.currentTarget).parents('li').remove();
            this.initializeBulletinBoardLinkSortable();
        },

        removeJourneyLink: function(event){
            this.$(event.currentTarget).parents('li').remove();
            this.initializeSectionJourneyLinkSortable();
        },

        addInternalLink: function(e){
            var selectedLinks =  this.$('#bulltein-sitemap .css-checkbox:checked');
            _.each(selectedLinks, (selectedLink)=>{
                this.insertInternalLink(selectedLink);
            });  

            this.replacePopup(e);
        },

        insertInternalLink : function(selectedLink) {
            this.removeCustomErrorMessage();
            let linkDetails = [];
            var selectedElement = selectedLink;
            var link = {
                link_type:'internal',
            };
            link.href = window.location.origin + "/t/";
            var mainListElement = this.$(selectedElement).parents()
                    .closest("li[data-slug='"+ $(selectedElement).attr('slug-id')+"']");
            let mainListElementData = mainListElement.data();
            link.groups = mainListElementData.groups;
            var elementType = mainListElementData.item;
            if(elementType == 'chapter'){
                link.href += mainListElement.closest("li[data-item='category']").data('slug') + '/';

                if(mainListElement.closest("li[data-item='section']").length){
                    link.href += mainListElement.closest("li[data-item='section']").data('slug') + '/';
                }
            }
            else if(elementType == 'section' && mainListElement.closest("li[data-item='category']").data('slug')){
                link.href += mainListElement.closest("li[data-item='category']").data('slug') + '/';
            }
            link.href += mainListElementData.slug;
            let productSlug = mainListElement.closest("li[data-item='category']").data('slug');
            let sectionSlug = mainListElement.closest("li[data-item='section']").data('slug');
            let selectedElementData = $(selectedElement).parents("li").data()
            let entityType = selectedElementData.item;
            let dataSlug = selectedElementData.slug;
            let dataId = selectedElementData.id;
            link.product_id = mainListElement.closest("li[data-item='category']").data('id');
            link.section_id = mainListElement.closest("li[data-item='section']").data('id');
            link.name = selectedElementData.name;
            link.url = link.href;
            if ((entityType == 'category') || (entityType == 'section')){
                link.breadcrumb =`Home > ${productSlug} > ${dataSlug}`;   
                if(productSlug == dataSlug){
                    link.breadcrumb = `Home > ${dataSlug}`;
                }
            } else if(entityType == 'chapter'){
                link.chapter_id = dataId;
                link.breadcrumb = `Home > ${productSlug} > ${dataSlug}`;               
                if(sectionSlug)
                {
                    link.breadcrumb = `Home > ${productSlug} > ${sectionSlug} > ${dataSlug}`
                }  
            }
            linkDetails = link;
            this.$('.bulletin-links-list').append(BulletinBoardLinks(linkDetails));
        },

        duplicateBulletinBoard: function(event){
            let bbId = this.$('.duplicate-bboard .duplicate').attr('id');
            var bboard = new BulletinBoard({
                id: bbId,
                copy: true,
                section_slug: this.section_id
            });
            this.actionInProgress('duplicate-bboard');
            var root = this;
            bboard.save(null, {
                patch: true,
                success:function(response){
                    root.actionSuccess('duplicate-bboard');
                   root.section_id ? root.current_view.load(root.section_id, true) :
                        root.current_view = new HomeView(); 
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('duplicate-bboard');
                },
            });
        },

        showDuplicateBulletinBoard: function(event){
            var element = this.$(event.currentTarget).parents().find('.bulletin-board-block.active');
            if(element.hasClass('disabled') || (element.hasClass('uneditable'))) return false;
            var bbId = parseInt(element.attr('id'));
            this.$('.duplicate-bboard .duplicate').attr('id', bbId);
            this.popupShow('duplicate-bboard');
        },

        updateAddButtonText: function(){
            let saveElem = this.$('.bulletin-browse-link-popup .save');
            let suggestionsCount = this.$('#bulltein-sitemap .css-checkbox:checked').length;
            if (!(suggestionsCount)) {
                $(saveElem).text('SAVE').removeClass('suggestions_selected');
            } else {
                $(saveElem).text(`ADD ${suggestionsCount} CONTENT`).addClass('suggestions_selected');
            }
        },

        showCreateLayout: function(event) {
            if(document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();

            var hasParent = this.$(event.currentTarget).attr('parent');
            if(this.tenant.enable_box_integration && !hasParent) {
                this.popupShow('box-category-option');

            }else if(!hasParent && !this.tenant.enable_box_integration || this.hasChildren(this.section)){
                // Display public/private option in all types of tenants.
                // Display 'Asset-Link'/'Default-Category' option.
                let popupName = 'choose-category-type';
                this.popupShow(popupName);
                if(!hasParent)  this.$('.' + popupName + ' .layouts').attr('show-private', true);
            }else{
                if(this.hasPlaylists(this.section)){
                    if(!this.tenant.enable_box_integration) {
                        this.createPlaylist();
                        return;
                    }
                    $('.layouts .playlist_layout_block, .layouts .import_box_block').addClass('enabled');
                    $('.layouts .category_layout_block ').addClass('disabled');
                }else{
                    $('.layouts .category_layout_block, .layouts .playlist_layout_block').addClass('enabled');
                }
                if(this.tenant.enable_box_integration){
                    $('.layouts .import_box_block').removeClass('disabled').addClass('enabled');
                }else {
                    $('.layouts .import_box_block').removeClass('enabled').addClass('disabled');
                }
                this.popupShow('layout_selection_block');
            }
        },

        hideCreateLayout: function(popupName) {
            $('#layout_selection_block').removeClass('active');
            setTimeout(function(){
                $('.grey_layout_bg').removeClass('active');
            }, 500);
            $('.layouts div').removeClass('enabled disabled');
        },

        toogleSitMapNavigation: function(event) {
            var icon = this.$(event.currentTarget);
            if(icon.hasClass('expanded')) {
                icon.removeClass('expanded');
                icon.parent().siblings('li').hide();
            }
            else {
                icon.addClass('expanded');
                icon.parent().siblings('li').show();
            }
        },

        toogleSitMapSections: function(event) {
            var icon = this.$(event.currentTarget);
            icon.toggleClass('expanded');
            icon.parent().siblings('ul').toggle();
        },

        demoInfo: function(event) {
            var slideInfoEl = document.getElementsByClassName('slide_info')[0];
            slideInfoEl.classList.remove('push-aside');
            this.$('.slide_information .slide_info').toggle();
            if(event.type == 'mouseenter') {
                // set slide_information position dynamically
                var slideInfoPos = slideInfoEl.getBoundingClientRect().left;
                if(slideInfoPos < 10) { 
                    slideInfoEl.classList.add('push-aside');
                }
            }
        },

        hideEditPopup: function(){
            this.$('form .tooltip').hide();
            this.popupClose("popup-edit")
        },

        previewSectionVideo: function(){
            var video_url = this.$('form[name=default-section-data] .video-upload').val();
            if(video_url){
                this.renderVideoDetails(video_url);
                this.$('form[name=default-section-data] .video-upload').val("");
            }
        },

        deleteSectionVideo: function(event){
            var video_id = this.$(event.currentTarget).attr('rel');
            this.$('form[name=default-section-data] .video #' + video_id).remove();
        },

        renderVideoDetails: function(video_url){
            var videoDetails = Common.getEmbedVideoDetails(video_url);
            if (videoDetails) {
                var video = this.renderVideoBlock(videoDetails.src, videoDetails.title, videoDetails.thumbnail_url);
                this.$('.video').append(video);
                this.removeCustomErrorMessage();
            } else {
                this.customErrorMessage('Enter valid URL', this.$('.video-link'));
            }
        },

        renderVideoBlock: function(video_src, video_title, video_poster){
            var video_block_id = 1
            var video_blocks = this.$('form[name=default-section-data] .video-block');
            if(video_blocks.length){
                video_block_id = parseInt(this.$('form[name=default-section-data] .video-block:last').attr('id')) + 1
            }
            var video = this.videoBlock({
                'video_id': video_block_id,
                'video_src': video_src,
                'video_title': video_title,
                'video_poster': video_poster
            });
            return video;
        },

        // Function to load an Icon file into the HTML DOM.
        previewIcon: function(event){
            var asset = event.target.files[0];
            if (!asset || !(/\.(gif|jfif|jpg|jpeg|tiff|png|svg|pdf)$/i).test(asset.name)) {
                return false;
            }
            this.$('#upload-file-preview').attr('src', URL.createObjectURL(asset));
            let target = $(event.currentTarget);
            let assetClass = 'image-added';
            this.$(target).parent().addClass(assetClass).find('.file-name').text(asset.name);
            this.$(target).parent().addClass(assetClass).find('.edit-tool-tip').remove();
        },

        // Function to upload the section asset and append response id to DOM.
        uploadAsset: function(event){
            event.preventDefault();
            if(this.$(event.currentTarget).hasClass('disabled')) return;
            var asset = event.target.files[0];
            if (!asset || !(/\.(pdf)$/i).test(asset.name)) {
                return false;
            }

            var assetData = new FormData();
            assetData.append('section_asset_resource', asset);
            assetData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

            this.$(event.currentTarget).addClass('disabled');
            this.$('label[for=upload-link-file] span').addClass('hide');
            this.$('label[for=upload-link-file] .progress-text').removeClass('hide');
            this.$('.custom-url-block').addClass('hide');
            let assetResource = new SectionAssetResource({id: this.$(event.currentTarget).attr('resource-id') || null});
            var root = this;
            assetResource.save(
                assetData, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: assetData,
                    success: function(model, response){
                        // Set the id, name of the resource to 'input' DOM.
                        // Set the custom url data and display it on the form.
                        let target = root.$(event.currentTarget);
                        root.$(target).attr('resource-id', response.id);
                        let fileName = response.meta_data.file_name ?
                            response.meta_data.file_name : response.name;
                        root.$(target).parent().addClass('asset-added').find('.file-name').text(fileName);
                        root.$(target).parent().find('.edit-tool-tip').remove();
                        root.$('.custom-url-block .section-url')
                            .val(response.name)
                            .attr('maxlength', root.SECTION_ASSET_URL_LIMIT);
                        root.$('.custom-url-block .counter span[data-counter]')
                            .text(root.SECTION_ASSET_URL_LIMIT - response.name.length);
                        root.$('.custom-url-block .custom-url-preview')
                            .text(window.location.origin + Common.SECTION_ASSET_ROUTE + response.name);

                        root.$('.custom-url-block').removeClass('hide');
                        root.$('.custom-url-block .section-url')
                            .removeAttr('disabled')
                            .removeClass('disabled');
                        root.$('label[for=upload-link-file] span').addClass('hide');
                        root.$('label[for=upload-link-file] .upload-text').removeClass('hide');
                        root.$(target).removeClass('disabled');
                    },
                    error: function(xhr, status_code, error_message){
                        root.$('label[for=upload-link-file] span').addClass('hide');
                        root.$('label[for=upload-link-file] .error-text').removeClass('hide');
                    }
            });
        },

        // Remove any assets like images, pdf.
        removeAsset: function(event){
            if(this.$(event.currentTarget).parent().hasClass('asset-added')){
                // If form is asset-linked, then reset the custom url block.
                this.$('.custom-url-block .custom-url-preview').text('');
                this.$('.custom-url-block .section-url').attr('value', '');
                this.$('.custom-url-block').addClass('hide');
            }
            this.$(event.currentTarget).parent()
                .removeClass('image-added asset-added file-added')
                .find('#upload-file-preview')
                .removeAttr('src')
                .attr('data-remove-image', true);
            this.$(event.currentTarget).parent().find('.file-name').empty();
            this.$(event.currentTarget).parent().find("label[for=upload-cta-file]").val("");
            this.$(event.currentTarget).siblings('input[type=file]').val('');
            this.removeCustomErrorMessage();
        },

        previewNotesLinkResource: function(event){
            var target = $(event.currentTarget);
            var resource = event.target.files[0];
            if (!resource || !(/\.(gif|jfif|jpg|jpeg|tiff|png|mp4|svg|webm|ogg)$/i).test(resource.name)) {
                return false;
            }
            if((resource.type == "video/mp4")||(resource.type == "video/webm")||(resource.type == "video/ogg")){               
                this.$('#upload-file-preview').attr('src', '/static/images/author/thumb-video.jpg');
            }else{
                this.$('#upload-file-preview').attr('src', URL.createObjectURL(resource));
            }
            this.$(target).parent().addClass('image-added').find('.file-name').text(resource.name);
            this.$(event.currentTarget).parents('.block').removeClass('add-resource-url');
            this.$(event.currentTarget).parents('.block').addClass('image-added');
        },  

        showNotesLinkUpload: function(event){
            this.$(event.currentTarget).parents('.block').addClass('add-resource-url');
        },

        trimInput: function(event){
            //Function to remove spaces for the value from input tags.
            event.currentTarget.value = $.trim(event.currentTarget.value);
        },

        /**
        * Validate the section details from 'sectionForm',
        * save the details as w.r.t 'asset' or 'default' section.
        */
        submitSectionDetails:function(event){

            event.preventDefault();
            var showError = false,
                currentFormName = this.$(event.currentTarget).attr('name'),
                formName = "form[name=" + currentFormName + "]";

            var sectionName = this.$(formName + " input[name='name']"),
                sectionDescription = this.$(formName + " textarea"),
                sectionLinkResource = this.$('#upload-link-file'),
                customUrlInput = this.$('.custom-url-block .section-url'),
                resourceName = customUrlInput.val();
                let restrictionsEnabled = this.$("#section_enable_restrictions").is(":checked");
                let selectedGroups = this.$("#section-usr-grp-dropdown");
                let expire_at = this.$('#section_expire_at');


            if (!sectionName.val()) {
                this.customErrorMessage('Provide a name', this.$(sectionName).parent(), this.$(sectionName));
                showError = true;
            } else if(sectionName.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(sectionName).parent(), this.$(sectionName));
                showError = true;
            } else if (sectionName.val().length > this.SECTION_TITLE_LIMIT ) {
                this.customErrorMessage('Maximum ' + this.SECTION_TITLE_LIMIT + ' characters allowed', this.$(sectionName).parent(), this.$(sectionName));
                showError = true;
            } else if (sectionDescription.val().length > this.SECTION_DESCRIPTION_LIMIT ) {
                this.customErrorMessage('Maximum ' + this.SECTION_DESCRIPTION_LIMIT + ' characters allowed', this.$(sectionDescription).parent(), this.$(sectionDescription));
                showError = true;
            } else if (currentFormName == 'asset-section-data' &&
                       !sectionLinkResource.parents().hasClass('asset-added')){
                this.customErrorMessage('Upload a valid PDF file', sectionLinkResource.parent(), this.$(sectionLinkResource));
                showError = true;
            } else if (resourceName && customUrlInput.siblings('.error-msg').length) {
                showError = true;
            } else if(restrictionsEnabled && !selectedGroups.attr("data-selected-groups")){
                this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
                showError = true;
            }

            if (showError || this.$(formName).attr("disabled")) return false;
            this.$(formName).attr('disabled', 'disabled');

            this.actionInProgress('popup-edit');
            this.removeCustomErrorMessage();
            var iconFile = this.$('#upload-file').val();
            var resourceId = parseInt(sectionLinkResource.attr('resource-id'));
            var root = this;

            // If the section is of 'asset-link' type,
            // then get the name from the input field,
            // call in a 'PUT' request to update the Resource name,
            // and get the 'resource-id', pass is it as an argument for either to
            // 'saveIconSection'(Save icon first and then section details)
            // or 'saveSection' (Just save the default section details).
            setTimeout(function(){

                // Send api resource 'PUT' request only when,
                // url input is not disabled,
                // url input has a name value,
                // form is 'asset-section-data' and has 'asset-added',
                // or when it has asset resource file.  
                if(!customUrlInput.hasClass('disabled') &&
                    resourceName && currentFormName == 'asset-section-data' &&
                    (sectionLinkResource.parents().hasClass('asset-added') ||
                     sectionLinkResource[0].files[0]))
                {
                    let assetResource = new SectionAssetResource({
                        id: resourceId
                    });
                    var assetData = new FormData();
                    assetData.append('name', resourceName);
                    assetData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
                    assetResource.save(
                        assetData, {
                            type: 'PUT',
                            processData: false,
                            cache: false,
                            contentType: false,
                            data: assetData,
                            success: function(model, response){
                                if(iconFile)
                                    root.saveIconSection(formName, resourceId);    
                                else
                                    root.saveSection(formName, null, resourceId);
                            },
                            error: function(xhr, status, error_response){
                                console.log('Updating Resource Error- ', status.responseText, error_response);
                                root.actionFailed('popup-edit');                                
                            }
                    });
                }else if(iconFile){
                    root.saveIconSection(formName, resourceId);
                }else{
                    root.saveSection(formName, null, resourceId);
                }

            }, 1000);
        },

        /**
        * Save the icon, of the section, save the section details,
        * if the section has asset linked, then save the resourceId.
        * params:
        *   formName      - String value of the form name - eg: 'form[name=default-section-data]'.
        *   resourceId    - Integer value of resource id, 'null' by default.
        */
        saveIconSection: function(formName, resourceId=null){

            var iconData = new FormData();
            iconData.append('icon', this.$('#upload-file')[0].files[0])
            iconData.append('name', this.$(formName + ' input[name=name]').val())
            iconData.append('csrf_token', $('meta[name=csrf-token]').attr('content'))

            let icon = new Icon();
            var root = this;
            icon.save(
                iconData, {
                processData: false,
                cache: false,
                contentType: false,
                data: iconData,
                success: function(model, response){
                    root.saveSection(formName, response.icon_id, resourceId);
                }, error: function(xhr, status_code, error_message){
                    root.removeSectionResourceOnError(SectionAssetResource, resourceId);
                    root.actionFailed('popup-edit');
                }
            });
        },

        /**
        * Create/Save section details, common function for both normal/asset-link sections.
        * If there is any error in saving the section detials,
        * then remove the icon resource which was previously saved.
        * params:
        *   formName    - String value of the form name - eg: 'form[name=default-section-data]'.
        *   iconId      - Integer value of icon id, 'null' by default.
        *   resourceId  - Integer value of resource id, 'null' by default.
        */
        saveSection: function(formName, iconId=null, resourceId=null){

            var sectionData = {
                id: this.$(formName).attr('section-id'),
                parent: undefined,
                video: [],
                related_products: [],
                tags: [],
                show: false,
            };

            _.each(this.$(formName + ' [name]:not([type=file])'), function(field){
                var name = field.name || field.getAttribute('name'),
                value = field.value || field.getAttribute('value'),
                type = field.type || field.getAttribute('name'),
                lname = field.localName;

                sectionData[name] = type === 'checkbox' ? field.checked
                  : type === 'select-multiple' ? _.compact(_.map(field.options, function(option){if(option.selected)return option.value}))
                  : lname === 'iframe' ? $.isArray(sectionData[name]) ? sectionData[name].concat({'video_url': field.src, 'poster_url': field.getAttribute('poster')}): {'video_url': field.src, 'poster_url': field.getAttribute('poster')}
                  : sectionData[name] === undefined ? value
                  : $.isArray( sectionData[name] ) ? sectionData[name].concat(value)
                  : [ sectionData[name], value ];
            });
            if(iconId){
                sectionData.icon_id = iconId;
            }else if(this.$('#upload-file-preview').attr('data-remove-image')){
                sectionData.remove_icon = true;
            }
            if (resourceId) sectionData.resource_id = resourceId;

            if(this.$("#section_enable_restrictions").is(":checked")) {
                sectionData['is_restriction_enabled'] = true;
                let selectedGroupIds = [];
                let selectedGroups = this.$("#section-usr-grp-dropdown");
                if(selectedGroups.attr("data-selected-groups")){
                    _.each(selectedGroups.attr("data-selected-groups").split(","), (gId)=>{
                        selectedGroupIds.push(parseInt(gId));
                    });
                }
                sectionData['restricted_to_groupids'] = selectedGroupIds;
            }else{
                sectionData['is_restriction_enabled'] = false;
            }
            let selectedJourneysIds = []
            let sectionJourneys = this.$('.section-joureny-list .list-item')
            _.each(sectionJourneys, (journeyElem)=>{
                selectedJourneysIds.push(parseInt(journeyElem.dataset.id));
            })
            sectionData['journey_ids'] = selectedJourneysIds

            if(this.$('#section_expire_at').val())
                sectionData['expire_at'] = this.$('#section_expire_at').data('datetime') || null;

            var formData = new FormData();
            _.each(sectionData, (val, key) => {
                if(typeof(val) == "object" && val != null)
                    val = JSON.stringify(val);
                formData.append(key, val === null ? '': val)
            });

            formData = this.addCtaData(formData)
            this.edit_section = new Section(sectionData);
            var root = this;
            $.when(this.edit_section.save(formData, {
                processData: false,
                cache: false,
                contentType: false,
                data: formData,
            })).done(function(response, textStatus, jqXhr){
                if(response && jqXhr.status && $.inArray(jqXhr.status, [400, 404, 412, 418, 500]) != -1){
                    root.removeSectionResourceOnError(Icon, iconId);
                    root.removeSectionResourceOnError(SectionAssetResource, resourceId);
                    root.actionFailed('popup-edit');
                    return;
                }
                if (Common.product_details && Common.product_details.id == root.edit_section.id) {
                    Common.product_details = root.edit_section;
                }
                if(root.section_id) root.current_view.load(root.section_id, true);
                else root.current_view = new HomeView();
                
                root.actionSuccess('popup-edit');
            }).fail(function(response, textStatus, jqXhr){
                root.removeSectionResourceOnError(Icon, iconId);
                root.removeSectionResourceOnError(SectionAssetResource, resourceId);
                root.actionFailed('popup-edit', response.statusText);
            });
        },

        // adding all cta inforamation to section form data
        addCtaData: function(formData){
            //adding cta details to section form
            var ctaDetails = {
                'added': [], 'removed': [], 'edited': []
            };

            _.each(this.sectionCtaList, cta => {
                if(cta.ctaId && !cta.isEdited) return;
                let ctaData = {
                    options: {
                        text: cta.text,
                        type: cta.type
                    },
                    ctaId: cta.ctaId,
                    name: formData.get('name')
                };
                if(cta.type == 'link'){
                    ctaData.name = formData.get('name')
                    ctaData.options.href = cta.href
                } else if(cta.type == 'pdf'){
                    ctaData.name = cta.fileName
                    if(cta.pdfFile ){
                        formData.append(cta.uniqueId, cta.pdfFile);                        
                        ctaData.file = cta.uniqueId;
                    }
                }
                if(cta.isEdited) ctaDetails.edited.push(ctaData)
                else ctaDetails.added.push(ctaData)
            })
            if(this.removedCtaIds) ctaDetails.removed = this.removedCtaIds
            formData.append("cta_list", JSON.stringify(ctaDetails))
            return formData
        },

        /**
        * Update the custom url field for the linked-asset.
        * Trigger a function after 1.5 sec of keyup,
        * add 'disabled' flag to prevent multiple function call.
        */
        updateCustomUrl: function(event){

            if(this.$(event.currentTarget).hasClass('disabled')) return;
            this.$(event.currentTarget).addClass('disabled');
            var root = this;
            setTimeout(function(){
                root.getUpdatedAssetUrl(root.$(event.currentTarget));
            }, 1500);
        },

        /**
        * Call in a ResourceModel 'GET' request to generate a new name,
        * based on the user input.
        * Disable the input DOM before reading the value.
        * Re-enable the input element after the success response, remove the 'disabled' flag.
        * This method doesn't update the model's name.
        * params:
        *   element- Input DOM element.
        */
        getUpdatedAssetUrl: function(element){

            element.attr('disabled', true);
            let resourceName = element.val();
            if(!resourceName){
                element.removeClass('disabled')
                       .removeAttr('disabled');
                return;
            }
            this.removeCustomErrorMessage();
            let assetResource = new SectionAssetResource({
                id: this.$('#upload-link-file').attr('resource-id')
            });
            var root = this;
            assetResource.fetch({
                data: {'name': resourceName},
                processData: true,
                success: function(model, response){
                    element.val(response.name)
                                .removeClass('disabled')
                                .removeAttr('disabled')
                                .focus();
                    root.$('.custom-url-block .custom-url-preview')
                        .text(window.location.origin + Common.SECTION_ASSET_ROUTE + response.name);
                },
                error: function(xhr, status, error_response){
                    console.log('Updating Resource Name Error- ', status.responseText, error_response);
                    // If the name exists, then display the error msg & enable the input.
                    if (status.responseJSON.message == 'NAME EXISTS'){
                        let customUrl = root.$('.custom-url-block .section-url');
                        root.customErrorMessage(
                            'Name exists, please provide a different name',
                            customUrl.parent(),
                            root.$(customUrl));
                        element.removeClass('disabled')
                               .removeAttr('disabled')
                               .focus();
                    }
                }
            });
        },

        /**
        * Remove any intermediate resources like SectionIcon/SectionAssetResource,
        * which were created before the error.
        * params:
        *   sectionResModel - Backbone Model object.
        *   sectionResId    - Integer value of the id.
        */
        removeSectionResourceOnError: function(sectionResModel, sectionResId){

            if(sectionResId){
                let sectionRes = new sectionResModel({id: sectionResId});
                sectionRes.destroy();
            }
        },

        // Loading suggesion tags.
        getTagSuggesions: function(event){
            if(!Common.isValidCharacter(event)) return false
            var tag_text = event.currentTarget.value;
            if(tag_text){
                var tags = new Tags({id: tag_text})
                var root = this;
                tags.fetch({
                    async:false,
                    success: function(data){
                        root.$('.suggestion_tags ul').empty();
                        if(data && data.get('tags') && data.get('tags').length){
                            _.each(data.get('tags'), function(tag){
                                var li = $("<li />");
                                $(li).attr('value', tag.name);
                                $(li).text(tag.name);
                                root.$('.suggestion_tags ul').append($(li));
                            });
                        }
                    }
                })
            }
        },

        // Chose a tag from suggesion.
        selectTagFromSuggestion: function(event){
            this.$('.add_tag').val(event.target.textContent);
            this.$('.suggestion_tags ul').empty();
        },

        // Create a tag for section.
        createTag: function(event){
            var formName = $(event.currentTarget).closest('form').attr('name');
            var tagElement = this.$('form[name="' + formName +'"] .add_tag');
            var tags = tagElement.val();
            var tagsList = [];
            var availableTags = this.$('form[name="' + formName +'"] .category_tags ul li .tags');
            _.each((availableTags), function(elem){   
                tagsList.push(elem.getAttribute('value'));
            });
            // Split tags by comma separate, trim each tag and return Array of unique tags.
            tags =_.unique($.map(tags.split(','), $.trim));
            _.each(tags, (tag)=> {
                if (tag.length != 0 && !tagsList.includes(tag)) {
                    this.$('.category_tags ul').append(TagTemplate(tag));
                };
            });
            // Clear the input tag, clear the suggestions list.
            tagElement.val("");
            this.$('form[name="' + formName +'"] .suggestion_tags ul').html("");
        },

        // Delete tag.
        removeTag: function(event){
           this.$(event.currentTarget).parents("li").remove()
        },

        // CTA functions.
        showCreateCTAPopup: function(cta_data){
            this.$('.section-edit-block').hide();
            this.$("#create-edit-section .cta-form").html(CtaForm(cta_data));
        },

        hideCreateCTAPopup: function(event){
            this.$('.section-edit-block').show();
            this.$('.create-cta-block').hide();
        },

        // adding new cta details to section form
        addCtaDetails: function(event){
            event.preventDefault();

            // cta form validation
            let ctaType = this.$('input[name=cta_type]:checked').attr("cta-type");
            let isvalid = this.validateCtaData(ctaType);
            if (!isvalid) return false;

            // constructing cta data
            let uniqueId = this.$(event.currentTarget).data("unique-id");
            let ctaData = {
                type: ctaType,
                uniqueId: uniqueId || _.uniqueId('cta_')
            };

            //fetching data from cta-form
            if(ctaType == 'link'){
                ctaData.text = this.$('input[name=link_title]').val();
                ctaData.href = this.$('input[name=cta_link]').val();
            } else if(ctaType == 'pdf'){
                ctaData.text = this.$('input[name=pdf_title]').val();
                ctaData.fileName = this.$(".cta-pdf-block .file-name").text();
                
                // Mapping key for reading file object
                if(this.$("#upload-cta-file")[0].files[0]){
                    ctaData.pdfFile = this.$("#upload-cta-file")[0].files[0];    
                }
            }
            
            ctaData.ctaId = this.$(`.cta-button[data-unique-id=${ctaData.uniqueId}]`)
                                .data("cta-id")

            // updating this.sectionCtaList goes here
            let index = _.findIndex(this.sectionCtaList, cta => {
                return cta.uniqueId == ctaData.uniqueId
            });
            
            if(index == -1){
                this.sectionCtaList.push(ctaData);
            }else{
                if(this.sectionCtaList[index].ctaId == ctaData.ctaId)
                    ctaData.isEdited = true;
                this.sectionCtaList[index] = ctaData;
            }
            
            this.addCtaList();          
            this.hideCreateCTAPopup(); 
        },

        editCTA: function(event){
            let ctaData = this.$(event.target).parents(".cta-button").data();
            let ctaDetails = {
                type: ctaData.type,
                text: ctaData.text,
                uniqueId: ctaData.uniqueId
            }
            if(ctaData.type == 'pdf'){
                ctaDetails.fileName = ctaData.fileName
            }else if(ctaData.type == 'link'){
                ctaDetails.href = ctaData.href
            }
            this.showCreateCTAPopup(ctaDetails);
            this.preFillCtaForm(ctaData.type);
        },

        removeCTA: function(event){
            let ctaData = this.$(event.target).parents(".cta-button").data();
            this.sectionCtaList = _.filter(this.sectionCtaList, cta => {
                return cta.uniqueId !== ctaData.uniqueId
            })
            if(ctaData.ctaId)  this.removedCtaIds.push(ctaData.ctaId);
            this.addCtaList();
        },

        addCtaList: function(){
            this.$(".section-edit-block .cta-list")
                .html(CtaList({cta_list: this.sectionCtaList}))
            this.$(".create-cta-btn label[for=create-cta]").removeClass("hide");
            if(this.sectionCtaList.length >= 2) {
                this.$(".create-cta-btn label[for=create-cta]").addClass("hide");    
            }
        },

        // validate cta form data
        validateCtaData: function(ctaType){
            let isValid = true;
            if(ctaType == 'link'){
                var linkTitle = this.$("input[name=link_title]");
                var link = this.$("input[name=cta_link]");
                if (!linkTitle.val()) {
                    this.customErrorMessage('Provide a name', this.$(linkTitle).parent(), linkTitle);
                    isValid = false;
                }else if (!link.val()) {
                    this.customErrorMessage('Provide a url', this.$(link).parent(), link);
                    isValid = false;
                } else if (!Common.validateUrl(link.val())) {
                    this.customErrorMessage('Oops! Please enter a valid URL', this.$(link).parent(), link);
                    isValid = false;
                }
            } else if(ctaType == 'pdf'){
                var pdfTitle = this.$("input[name=pdf_title]");
                if (!pdfTitle.val()) {
                    this.customErrorMessage(
                        'Provide a pdf title', 
                        this.$(pdfTitle).parent(),
                        pdfTitle
                    );
                    isValid = false;
                } 
                else if(this.$(".cta-pdf-block .file-name").text()){
                    return true;
                }
                else if(!this.$("#upload-cta-file")[0].files[0]) {
                    this.customErrorMessage(
                        'Please upload a PDF file', 
                        $(".cta-pdf-block .cta-block"),
                        $(".cta-pdf-block .cta-block")
                    );
                    isValid = false;
                }
            }
            return isValid;
        },

        // validate cta pdf, allow only pdf files
        validateCtaPdf: function(event){
            this.removeCustomErrorMessage();
            var ctaPdf = event.target.files[0];
            if (!ctaPdf || !(/\.(pdf)$/i).test(ctaPdf.name)) {
                this.customErrorMessage(
                    "Please upload a PDF file",
                    $(".cta-pdf-block .cta-block"),
                    $(".cta-pdf-block .cta-block")
                );
                return false;
            }
            this.$(event.target).parent().addClass("file-added")
                                .find('.file-name').text(ctaPdf.name);
        },

        // preselecting cta type while editing cta
        preFillCtaForm:function(ctaType){
            if(ctaType == 'pdf'){
                this.$(".cta-pdf-block .cta-block").addClass("file-added");
                this.$(".create-cta-block .cta-pdf-block").removeClass("disabled");
                this.$(".content-block .cta-link-block").addClass("disabled");
                this.$('.cta-pdf-block input[type=radio]').prop('checked', true);
                this.$('.cta-link-block input[type=radio]').prop('checked', false);
            }
            this.$(`div .save-cta-btn`).text('update');
        },

        updateUrl: function(event){
            var parentBlock = this.$(event.currentTarget).parents('.block');
            if(parentBlock.hasClass('error')){
                parentBlock.removeClass('error');
                parentBlock.find('.error-message').text('');
            }
            if(event.altKey || ([8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]).indexOf(event.keyCode) !== -1) return;
            var value = $(event.target).val();
            if(value && value.length && value.length > 4 && value.indexOf('http') !== 0){
                $(event.target).val('https://' + value);
            }
        },

        // Section manupulation functions
        showEditOptions: function(event){
            event.stopImmediatePropagation();
            if (this.$(event.target).parents(".pwt-box").hasClass("active")){
                this.$(event.target).parents(".pwt-box").removeClass("active");
            }else{
                this.$(".pwt-box").removeClass("active");
                this.$(event.target).parents(".pwt-box").addClass("active");
            }
            return false;
        },

        toggleBulletinEditOptions: function(event) {
            event.stopImmediatePropagation();
            let elem = this.$(event.target).parents(".bulletin-board-block");
            if (elem.hasClass("active")){
                elem.removeClass("active");
            }else{
                this.$(".bulletin-board-block").removeClass("active");
                elem.addClass("active");
            }
        },

        showEnableDisablePopup: function(event){
            var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
            if(element.hasClass('uneditable')) return false;
            if (this.$(event.target).parent().siblings().hasClass("disabled")) {
                var enable_id = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
                this.$('.popup-enable .enable').attr('slug', enable_id);
                this.popupShow("popup-enable");
            } else{
                var disable_id = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
                this.$('.popup-disable .disable').attr('slug', disable_id);
                this.popupShow("popup-disable");
            };
        },

        showDeleteSectionPopup: function(event){
            var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
            if(element.hasClass('uneditable')) return false;
            var delete_id = element.attr('slug');
            this.$('.popup-delete .delete').attr('slug', delete_id);
            this.popupShow("popup-delete");
            let popupTitle = 'delete category';
            if(this.$(element).hasClass('asset-linked'))
                popupTitle = 'delete asset';
            this.$('.popup-delete .popup-title.capital-letter').text(popupTitle);
        },

        enableSection:function(event){
            var enable_id = this.$(event.currentTarget).attr('slug');
            var section = new Section({id: enable_id, is_enabled: true});

            this.actionInProgress('popup-enable');

            var root = this;
            section.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    if(root.section_id){
                        root.current_view.load(root.section_id, true);
                    }else{
                        root.current_view = new HomeView();
                    }
                    root.actionSuccess('popup-enable');
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-enable');
                }
            });
        },

        disableSection: function(event){
            var disable_id = this.$(event.currentTarget).attr('slug');
            var section = new Section({id: disable_id, is_enabled: false});
            this.actionInProgress('popup-disable');

            var root = this;
            section.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    if(root.section_id){
                        root.current_view.load(root.section_id, true);
                    }else{
                        root.current_view = new HomeView();
                    }
                    root.actionSuccess('popup-disable');
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-disable');
                }
            });
        },

        deleteSection: function(event){
            var delete_id = this.$(event.currentTarget).attr('slug');
            var section = new Section({id: delete_id});
            this.actionInProgress('popup-delete');

            var root = this;

            section.destroy({
                wait:true,
                success:function(){
                    if(root.section_id){
                        root.current_view.load(root.section_id, true);
                    }else{
                        root.current_view = new HomeView();
                    }
                    root.actionSuccess('popup-delete');
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-delete');
                }
            });
        },

        //End of Create/Edit section functions

        // Playlist functions
        playListRender: function(view){
            this.initView(view);
            this.$('.create-new').removeClass('active');
            this.$el.removeClass('new_slide_active');
            $('#edit_container .publish, #edit_container .preview, #edit_container .select-all-items, #edit_container .delete-items').removeAttr('walkthrough').addClass('disable');
            $('#edit_container .select-all-items').removeClass('hide');
            $('#edit_container .deselect-all-items').addClass('hide');
            var plist_edit_options = "<div class='edit-hamburger no-action'></div>\
                                <div class='playlist-drag no-action'>"+ this.dragSvgIcon +"</div>\
                                <div class='edit'>\
                                    <div class='enable-plist no-action rippleEffect'></div>\
                                    <div class='edit-plist no-action rippleEffect'></div>\
                                    <div class='delete-plist no-action rippleEffect'></div>\
                                </div>";
            this.$('.playlist-left').append(plist_edit_options);
            var demo_edit_options = "<div class='chapter-edit-options no-action'>\
                                        <div class='chapter-edit no-action rippleEffect'></div>\
                                        <div class='chapter-enable no-action rippleEffect'></div>\
                                        <div class='chapter-duplicate no-action rippleEffect'></div>\
                                        <div class='chapter-delete no-action rippleEffect'></div>\
                                     </div>\
                                     <div class='walkthrough-drag no-action'>"+ this.dragSvgIcon +"</div>\
                                     <div class='chapter-edit-hamburger no-action'></div>";
            this.$('.pwt-list li').append(demo_edit_options);
            var viewSection = view.section;

            // Hide 'Create-New' button for restricted-sections.
            if((viewSection.get('can_edit') != undefined && !viewSection.get('can_edit'))){
                $('.create-new').hide();
            }
            else{
                this.$('.create-new').removeClass('slide').attr('parent', this.section_id).show();
            }
            this.initializeDemoSortable();
            this.initializeBulletinBoardSortable();
        },

        /**
        * Invoked inside the Category/Product,
        * for creating child sections.
        */
        createNewCategory: function(event) {
            var root = this;
            this.popupClose('layout_selection_block')
            setTimeout(function(){
                // Display 'Asset-Link'/'Default-Category' option.
                root.popupShow('choose-category-type');
            },400);

        },

        /**
         * Toggle import document parser popup
         */
        toggleDocumentParserPopup: function(event) {
            // This works only with one level deep DOM
            let ele = event.target;
            let openPopupBlock = ('open' in ele.dataset) ? ele.dataset.open : ele.parentElement.dataset.open;
            let closePopupBlock = ('close' in ele.dataset) ? ele.dataset.close : ele.parentElement.dataset.close;
            this.popupClose(closePopupBlock);
            setTimeout(() => {
                this.popupShow(openPopupBlock);
                this.$('.import-popup-main-container').html(DocumentParserTemplate);
            }, 400);
        },

        showPlayListOptions: function(event) {
            var ele = this.$(event.currentTarget);
            if(ele.hasClass('enabled')) {
                ele.removeClass('enabled');
                ele.siblings('.edit-hamburger').removeClass('enabled');
                ele.siblings('.edit').removeClass('active');
                ele.parent().removeClass('active');
            }
            else {
                ele.addClass('enabled');
                ele.siblings('.edit-hamburger').addClass('enabled');
                ele.siblings('.edit').addClass('active');
                ele.parent().addClass('active');
            }
        },

        showEnableDisablePlaylist: function(event){
            var element = this.$(event.currentTarget).parents('.playlist-block');
            if(element.hasClass('uneditable')) return false;
            if (this.$(event.target).parents('.playlist-block').hasClass("disabled")) {
                var enable_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
                this.$('.enable-playlist .enable').attr('playlist_id', enable_id);
                this.popupShow("enable-playlist");
            } else{
                var disable_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
                this.$('.disable-playlist .disable').attr('playlist_id', disable_id);
                this.popupShow("disable-playlist");
            };
        },

        showDeletePlaylist: function(event){
            var element = this.$(event.currentTarget).parents('.playlist-block');
            if(element.hasClass('disabled') || element.hasClass('uneditable')) return false;
            var delete_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
            this.$('.delete-playlist .delete').attr('playlist_id', delete_id);
            this.popupShow("delete-playlist");
        },

        createPlaylist: function(event) {
            this.popupClose('layout_selection_block');
            let showRestrictionOption = false;
            let isRestrictionSetInParent = false;
            let restrictionsDisabled = true;
            let grpDetails = {};
            let userGroups = [];

            if(document.isPrivateTenant){

                let section = this.current_view.section.attributes;
                isRestrictionSetInParent = this.checkIsRestrictionSetInParent(section);
                let restrictedToGroupDetails = section.restricted_to_group_details;

                // If restriction is set in parent entity,
                // then in child entity, only the options which are selected in parent should be selectable.
                if(isRestrictionSetInParent){
                    if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                        userGroups = restrictedToGroupDetails;
                        restrictionsDisabled = false;
                    }
                }else{
                    userGroups = this.tenant.user_groups;
                    restrictionsDisabled = false;
                }

                grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                showRestrictionOption = Boolean(this.tenant.user_groups && this.tenant.user_groups.length);

            }

            setTimeout(() => {
                this.popupShow("popup-create-playlist");
                this.$("#create-edit-playlist").html(PlaylistForm({
                    name_limit: this.PLAYLIST_TITLE_LIMIT,
                    description_limit: this.PLAYLIST_DESCRIPTION_LIMIT,
                    showRestrictionOption: showRestrictionOption,
                    restrictionsDisabled: restrictionsDisabled,
                    isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                    restrictedToGroups: grpDetails.restrictedToGroups,
                    restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                    userGroupOptions: grpDetails.userGroupOptions,
                }));
                this.initEolDatePicker(this.$('#playlist_expire_at'));

            }, 400);
            this.$('.popup-box .content-block').niceScroll();
        },

        editPlaylist: function(event){
            var element = this.$(event.currentTarget).parents('.playlist-block');
            if(element.hasClass('disabled') || element.hasClass('uneditable')) return false;
            this.removeCustomErrorMessage();
            this.$('form[name=playlist-data]').removeAttr('disabled');
            var playlist_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
            var playlist = new Playlist({
                id: playlist_id
            });

            var root = this;
            playlist.fetch({
                success: function(model, response){

                    let grpDetails = {};
                    let userGroups = [];
                    let isRestrictionEnabled = false;
                    let isRestrictionSetInParent = false;
                    let showRestrictionOption = false;
                    let restrictionsDisabled = true;

                    if(document.isPrivateTenant){

                        let section = root.current_view.section.attributes;
                        isRestrictionSetInParent = root.checkIsRestrictionSetInParent(section);
                        let restrictedToGroupDetails = response.restricted_to_group_details;

                        if(isRestrictionSetInParent){
                            if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                                userGroups = section.restricted_to_group_details;;
                                restrictionsDisabled = false;
                            }
                        }else{
                            userGroups = response.tenant.user_groups;
                            restrictionsDisabled = false;
                        }

                        grpDetails = root.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                        // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                        showRestrictionOption = Boolean(response.tenant.user_groups && response.tenant.user_groups.length);

                    }
                    root.popupShow("popup-create-playlist");

                    if(response.expire_at){
                        let expireAt = new Date(response.expire_at);
                        response.expire_at = expireAt.toISOString().slice(0, 16);
                    }
                    root.$("#create-edit-playlist").html(PlaylistForm({
                        playlistId: playlist_id,
                        is_edit: true,
                        name: response.name,
                        description: response.description,
                        name_limit: root.PLAYLIST_TITLE_LIMIT - (response.name.length || 0),
                        description_limit: root.PLAYLIST_DESCRIPTION_LIMIT - (response.description && response.description.length || 0),
                        showRestrictionOption: showRestrictionOption,
                        restrictionsDisabled: restrictionsDisabled,
                        isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                        restrictedToGroups: grpDetails.restrictedToGroups,
                        restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                        userGroupOptions: grpDetails.userGroupOptions,
                        eolExpireAt: response.expire_at
                    }));
                    root.initEolDatePicker(root.$('#playlist_expire_at'));

                    if(response.expire_at){
                        let expire_at = new Date(response.expire_at);
                        root.$('#playlist_expire_at')
                            .val(expire_at.toLocaleString({},{'hour12': true})
                            .replace(/\//g, '-'));
                    }
                }, error: function(xhr, status_code, error_message){
                    root.actionFailed('popup-create-playlist');
                }
            });
            this.$('.popup-box .content-block').niceScroll();
        },

        savePlaylist: function(event){
            event.preventDefault();
            var errorFlag = false;
            var playlist_title = this.$("form[name=playlist-data] input[name='name']");
            var playlist_desc = this.$("form[name=playlist-data] textarea[name='description']");
            let restrictionsEnabled = this.$("#playlist_enable_restrictions").is(":checked");
            let selectedGroups = this.$("form[name='playlist-data'] .usr-grp-dropdown");
            let expire_at = this.$('#playlist_expire_at');

            if (playlist_title.val() == "") {
                this.customErrorMessage('Provide a title', this.$(playlist_title).parent(), playlist_title);
                errorFlag = true;
            } else if(playlist_title.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null){
                this.customErrorMessage('Provide a title with atleast an alphanumeric character', this.$(playlist_title).parent(), playlist_title);
                errorFlag = true;
            } else if (playlist_title.val().length > this.PLAYLIST_TITLE_LIMIT ) {
                this.customErrorMessage('Maximum '+ this.PLAYLIST_TITLE_LIMIT +' characters allowed', this.$(playlist_title).parent(), playlist_title);
                errorFlag = true;
            } else if(restrictionsEnabled && !selectedGroups.attr("data-selected-groups")){
                this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
                errorFlag = true;
            }

            if(errorFlag || this.$("form[name=playlist-data]").attr("disabled")) return;
            this.$("form[name=playlist-data]").attr("disabled", 'disabled');
            this.actionInProgress('popup-create-playlist');

            var playlistData = {
                section_id: this.section_id,
                name: playlist_title.val(),
                description: playlist_desc.val(),
            }

            if(this.$("form[name=playlist-data]").attr('playlist_id')){
                playlistData.id = this.$("form[name=playlist-data]").attr('playlist_id');
            }

            let selectedGroupIds = [];
            if(selectedGroups.attr("data-selected-groups")){
                _.each(selectedGroups.attr("data-selected-groups").split(","), (gId)=>{
                    selectedGroupIds.push(parseInt(gId));
                });
            }
            playlistData["is_restriction_enabled"] = restrictionsEnabled;
            playlistData["restricted_to_groupids"] = selectedGroupIds; 

            if(expire_at.val())
                playlistData['expire_at'] = expire_at.data('datetime') || null;

            var playlist = new Playlist(playlistData);

            var root = this;
            playlist.save(null, {
                success:function(response){
                    root.actionSuccess('popup-create-playlist');
                    root.current_view.load(root.section_id, true);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-create-playlist');
                },
                complete: function(){
                    root.$("form[name=playlist-data]").removeAttr('playlist_id');
                }
            });
        },

        enablePlaylist: function(event){
            var enable_id = this.$(event.currentTarget).attr('playlist_id');
            var playlist = new Playlist({id: enable_id, is_enabled: true});
            this.actionInProgress('enable-playlist');

            var root = this;
            playlist.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    root.actionSuccess('enable-playlist');
                    root.current_view.load(root.section_id, true);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('enable-playlist');
                }
            });
        },

        disablePlaylist: function(event){
            var disable_id = this.$(event.currentTarget).attr('playlist_id');
            var playlist = new Playlist({id: disable_id, is_enabled: false});
            this.actionInProgress('disable-playlist');

            var root = this;
            playlist.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    root.actionSuccess('disable-playlist');
                    root.current_view.load(root.section_id, true);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('disable-playlist');
                }
            });
        },

        deletePlaylist: function(event){
            var delete_id = this.$(event.currentTarget).attr('playlist_id');
            var playlist = new Playlist({id: delete_id});
            this.actionInProgress('delete-playlist');

            var root = this;
            playlist.destroy({
                wait:true,
                success:function(){
                    root.current_view.load(root.section_id, true);
                    root.actionSuccess('delete-playlist');
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('delete-playlist');
                }
            });
        },

        // Create/Edit demo list.
        createNewDemo: function(event) {
            var root = this;
            this.popupClose('layout_selection_block');
            setTimeout(function(){
                root.showCreateChapter(event);
            },400);
        },

        showCreateChapter: function(e){
            var element = this.$(e.currentTarget).parents('li');
            if(element.hasClass('uneditable')) return false;

            this.$("form[name=walkthrough-data]").removeAttr("disabled");

            var updateChapterForm = () => {
                this.$('form[name=walkthrough-data] .tooltip').hide();
                this.popupShow("popup-create-chapter");
                this.$('.popup-box .content-block').niceScroll();
                this.initEolDatePicker(this.$('#chapter_expire_at'));
            }

            var expire_at;
            var setEolArgs = (args)=>{
                if(args.chapter.expire_at){
                    expire_at = new Date(args.chapter.expire_at);
                    args.eolExpireAt = expire_at.toISOString().slice(0, 16);
                }
                return args;
            }

            var args = {};
            var root = this;
            // Edit chapter form inside chapter.
            if(this.walkthrough && this.$(e.currentTarget).hasClass('wt-title-edit')){
                args.is_edit = true;
                args.name_limit = this.CHAPTER_TITLE_LIMIT - (this.walkthrough.attributes.name.length || 0);
                args.playlist_id = this.walkthrough.attributes.playlist.playlist_id;
                args.chapter = this.walkthrough.attributes;
                args.showRestrictionOption = false;

                let grpDetails = {};
                let userGroups = [];
                let isRestrictionEnabled = false;
                let isRestrictionSetInParent = false;
                let restrictionsDisabled = true;

                if(document.isPrivateTenant){

                    isRestrictionSetInParent = (
                        args.chapter.is_restriction_set_in_parent
                        || this.checkIsRestrictionSetInParent(this.current_view.section.attributes)
                    );
                    let tenantUserGroups = args.chapter.tenant.user_groups;

                    let restrictedToGroupDetails = args.chapter.restricted_to_group_details;

                    // If restriction is set in parent entity,
                    // then in child entity, only the options which are selected in parent should be selectable.
                    if(isRestrictionSetInParent){
                        if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                            userGroups = args.chapter.playlist.restricted_to_group_details;
                            restrictionsDisabled = false;
                        }
                    }else{
                        userGroups = tenantUserGroups;
                        restrictionsDisabled = false;
                    }

                    grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                    // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                    args.showRestrictionOption = Boolean(tenantUserGroups && tenantUserGroups.length && args.chapter.published);
                }

                args.restrictionsDisabled = restrictionsDisabled;
                args.isRestrictionEnabled = grpDetails.isRestrictionEnabled;
                args.restrictedToGroups = grpDetails.restrictedToGroups;
                args.restrictedToGroupIds = grpDetails.restrictedToGroupIds;
                args.userGroupOptions = grpDetails.userGroupOptions;
                args = setEolArgs(args);

                this.$('#create-edit-demo').html(this.demoForm(args));
                updateChapterForm();
                if(expire_at){
                    this.$('#chapter_expire_at')
                        .val(expire_at.toLocaleString({},{'hour12': true})
                        .replace(/\//g, '-'));
                }

            }else{
                // Edit chapter form in playlist page.
                if(this.$(e.currentTarget).hasClass('chapter-edit')){
                    var ch_id = this.$(e.currentTarget).parents('li.active').attr('slug')
                    var chapter = new Walkthrough({id: ch_id});
                    chapter.fetch({
                        success: function(model, response){
                            let grpDetails = {};
                            let userGroups = [];
                            let isRestrictionSetInParent = false;
                            let showRestrictionOption = false;
                            let restrictionsDisabled = true;

                            if(document.isPrivateTenant){
                                isRestrictionSetInParent = (
                                    response.is_restriction_set_in_parent
                                    || root.checkIsRestrictionSetInParent(root.current_view.section.attributes)
                                );

                                let tenantUserGroups = response.tenant.user_groups;
                                let restrictedToGroupDetails = response.restricted_to_group_details;
                                if(isRestrictionSetInParent){
                                    if(restrictedToGroupDetails && restrictedToGroupDetails.length){
                                        userGroups = response.playlist.restricted_to_group_details;
                                        restrictionsDisabled = false;
                                    }
                                }else{
                                    userGroups = tenantUserGroups;
                                    restrictionsDisabled = false;
                                }
                                grpDetails = root.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups);
                                // Restriction option is based on Tenant Privacy and Tenant UserGroups.
                                showRestrictionOption = Boolean(tenantUserGroups && tenantUserGroups.length && response.published);
                            }
                            let eolArgs = {chapter: response}; 
                            eolArgs = setEolArgs(eolArgs);
                            root.$('#create-edit-demo').html(root.demoForm({
                                is_edit: true,
                                chapter: response,
                                name_limit: root.CHAPTER_TITLE_LIMIT - (response.name.length || 0),
                                playlist_id: response.playlist.playlist_id,
                                showRestrictionOption: showRestrictionOption,
                                restrictionsDisabled: restrictionsDisabled,
                                isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                                restrictedToGroups: grpDetails.restrictedToGroups,
                                restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                                userGroupOptions: grpDetails.userGroupOptions,
                                eolExpireAt: eolArgs.eolExpireAt
                            }));
                            updateChapterForm();
                            if(expire_at){
                                root.$('#chapter_expire_at')
                                    .val(expire_at.toLocaleString({},{'hour12': true})
                                    .replace(/\//g, '-'));
                            }
                        }
                    })
                } else {
                    // Create chapter form.
                    if(document.defaultLocaleID !== SDCookies.getItem('author_locale')){
                        return this.switchLanguageWarning();
                    }
                    let playlistId = this.$(e.currentTarget).parent().attr('playlist_id');
                    var isRestrictionSetInParent = false;
                    var grpDetails = {};

                    // 'showRestrictionOption' in create chapter is always 'false',
                    // 'showRestrictionOption' should be available in edit chapter popup and only for published.
                    this.$('#create-edit-demo').html(this.demoForm({
                        playlist_id: playlistId,
                        name_limit: this.CHAPTER_TITLE_LIMIT,
                        showRestrictionOption: false,
                        isRestrictionSetInParent: isRestrictionSetInParent,
                        isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                        restrictedToGroups: grpDetails.restrictedToGroups,
                        restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                        tenantUserGroups: grpDetails.tenantUserGroups,
                    }));
                    updateChapterForm();
                }
            }
        },

        saveChapter: function(event){
            event.preventDefault();
            var errorFlag = false;
            var walkthrough_title = this.$("form[name=walkthrough-data] input[name='name']");
            let restrictionsEnabled = this.$("#chapter_enable_restrictions").is(":checked");
            let selectedGroups = this.$("form[name='walkthrough-data'] .usr-grp-dropdown");
            let expire_at = this.$('#chapter_expire_at');

            if (walkthrough_title.val() == "") {
                this.customErrorMessage('Provide a title for demo', this.$(walkthrough_title).parent(), walkthrough_title);
                errorFlag = true;
            } else if(walkthrough_title.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
                this.customErrorMessage('Provide a title with atleast an alphanumeric character', this.$(walkthrough_title).parent(), walkthrough_title);
                errorFlag = true;
            } else if (walkthrough_title.val().length > this.CHAPTER_TITLE_LIMIT ) {
                this.customErrorMessage('Maximum ' + this.CHAPTER_TITLE_LIMIT + ' characters allowed', this.$(walkthrough_title).parent());
                errorFlag = true;
            } else if(restrictionsEnabled && !selectedGroups.attr("data-selected-groups")){
                this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
                errorFlag = true;
            }

            if(errorFlag || this.$("form[name=walkthrough-data]").attr("disabled")) return;

            this.removeCustomErrorMessage();
            this.$("form[name=walkthrough-data]").attr("disabled", "disabled");

            var walkthrough_data = {
                id: this.$('form[name=walkthrough-data]').attr('walkthrough-id'),
                playlist_id: this.$("form[name='walkthrough-data']").attr('playlist-id'),
                tags: []
            };

            _.each(this.$('form[name=walkthrough-data] [name]:not([type=file])'), function(field){
                var name = field.name || field.getAttribute('name'),
                value = field.value || field.getAttribute('value'),
                type = field.type || field.getAttribute('name')

                walkthrough_data[name] = walkthrough_data[name] === undefined ? value
                  : $.isArray( walkthrough_data[name] ) ? walkthrough_data[name].concat(value)
                  : [ walkthrough_data[name], value ];
            });

            let selectedGroupIds = [];
            if(selectedGroups.attr("data-selected-groups")){
                _.each(selectedGroups.attr("data-selected-groups").split(","), (gId)=>{
                    selectedGroupIds.push(parseInt(gId));
                });
            }

            walkthrough_data["is_restriction_enabled"] = restrictionsEnabled;
            walkthrough_data["restricted_to_groupids"] = selectedGroupIds;

            if(expire_at.val())
                walkthrough_data['expire_at'] = expire_at.data('datetime') || null;

            var walkthrough = new Walkthrough(walkthrough_data);
            var root = this;
            this.actionInProgress('popup-create-chapter');

            walkthrough.save(null, {
                success: function(model, response){
                    if(response && response.status && $.inArray(response.status, [400, 404, 412, 418, 500]) != -1){
                        root.actionFailed('popup-create-chapter');
                        return;
                    }
                    if(root.walkthrough){
                        root.$('#player-container span[type=demo-title]').text(response.title);
                        root.walkthrough.attributes.title = response.title;
                        root.walkthrough.attributes.name = response.title;
                        root.walkthrough.attributes.is_restriction_set_in_parent = response.is_restriction_set_in_parent;
                        root.walkthrough.attributes.restricted_to_group_details = response.restricted_to_group_details;
                        root.walkthrough.attributes.tenant.user_groups = response.tenant.user_groups;
                        if(!Common.CURRENT_SLIDE || Common.CURRENT_SLIDE <= 1){
                            Common.loadWalkthrough(root.product_id, root.section_id, model.get('slug'))
                        }else{
                            Common.loadWalkthrough(root.product_id, root.section_id, model.get('slug'), Common.CURRENT_SLIDE);
                        }
                    }else{
                        root.current_view.load(root.section_id, true);
                    }
                    root.actionSuccess('popup-create-chapter');
                }, error: function(model, response, xhr){
                    root.actionFailed('popup-create-chapter');
                }
            });
        },

        initializeDemoSortable: function(){
            var root = this;
            this.$(".pwt-list.sortable" ).sortable({
                placeholder: 'highlight',
                handle: ".walkthrough-drag",
                containment: ".reorder-bounds",
                connectWith: ".pwt-list.sortable",
                stop : function(event, ui) {                    // 'stop' event triggered only once- when demo sorted across playlist.
                    var cur_ele_slug = ui.item.attr('slug');
                    var prev_ele_slug = ui.item.prev().attr('slug');

                    // Changing the reorder request from playlist to walkthrough api.
                    // 'id' - walkthrough-slug -- currentDemoSlug.
                    var walkthrough_details = {
                        'id': ui.item.attr('slug'),
                        'reorder': 'demo',
                        'target_parent_slug': ui.item.parents('ul').attr('playlist_id'),
                        'after_ele_slug': ui.item.prev().attr('slug'),
                    }
                    var walkthrough = new Walkthrough(walkthrough_details);

                    walkthrough.save(null, {
                        patch: true,
                        success: function(){
                            root.current_view.load(root.section_id, true);
                        }, error: function(xhr, status_code, message){
                            root.$(".pwt-list.sortable").sortable("cancel");
                        }
                    })
                }
            });

            this.$(".section-playlist-list" ).sortable({
                placeholder: 'highlight',
                handle: ".playlist-drag",
                stop : function(event, ui) { 
                    // Changing the reorder request from playlist
                    // 'id' - playlist -id
                    var playlist_details = {
                        'id': ui.item.find('.playlist-left').attr('playlist_id'),
                        'reorder': 'playlist',
                        'after_ele_slug': ui.item.prev().find('.playlist-left').attr('playlist_id'),
                        'within_section': true,
                    }
                    var playlist = new Playlist(playlist_details);

                    playlist.save(null, {
                        patch: true,
                        success: function(){
                            root.current_view.load(root.section_id, true);
                        }, error: function(xhr, status_code, message){
                            root.$(".section-playlist-list").sortable("cancel");
                        }
                    })


                }
            });
        },

        toggleChapterEditOptions: function(event){
            if (this.$(event.target).parents(".pwt-list li").hasClass("active")){
                this.$(event.target).parents(".pwt-list li").removeClass("active");
            }else{
                this.$(".pwt-list li").removeClass("active");
                this.$(event.target).parents(".pwt-list li").addClass("active");
            }
        },

        toggleEnableDisableChapter: function(event){
            var element = this.$(event.currentTarget).parents('li');
            if(element.hasClass('uneditable')) return false;
            if (this.$(event.target).parents("li").hasClass("disabled")) {
                var enable_id = this.$(event.currentTarget).parents('li').attr('slug');
                this.$('.popup-enable-chapter .enable').attr('slug', enable_id);
                this.popupShow("popup-enable-chapter");
            } else{
                var disable_id = this.$(event.currentTarget).parents('li').attr('slug');
                this.$('.popup-disable-chapter .disable').attr('slug', disable_id);
                this.popupShow("popup-disable-chapter");
            };
        },

        enableChapter:function(event){
            var enable_id = this.$(event.currentTarget).attr('slug');
            var walkthrough = new Walkthrough({id: enable_id, is_enabled: true});

            this.actionInProgress('popup-enable-chapter');

            var root = this;
            walkthrough.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    setTimeout(function(){
                        root.actionSuccess('popup-enable-chapter', root.current_view.load(root.section_id, true));
                    }, 1000);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-enable-chapter');
                }
            });
        },

        disableChapter: function(event){
            var disable_id = this.$(event.currentTarget).attr('slug');
            var walkthrough = new Walkthrough({id: disable_id, is_enabled: false});
            this.actionInProgress('popup-disable-chapter');

            var root = this;
            walkthrough.save(null, {
                patch: true,
                wait: true,
                success:function(response){
                    setTimeout(function(){
                        root.actionSuccess('popup-disable-chapter', root.current_view.load(root.section_id, true));
                    }, 1000);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-disable-chapter');
                }
            });
        },

        showDeleteChapterPopup: function(event){
            var element = this.$(event.currentTarget).parents('li');
            if(element.hasClass('uneditable')) return false;

            var delete_id = element.attr('slug');
            this.$('.popup-delete-chapter .delete').attr('slug', delete_id);
            this.popupShow("popup-delete-chapter");
        },

        deleteChapter: function(event){
            var delete_id = this.$(event.currentTarget).attr('slug');
            var walkthrough = new Walkthrough({id: delete_id});
            this.actionInProgress('popup-delete-chapter');

            var root = this;

            walkthrough.destroy({
                wait:true,
                success:function(){
                    setTimeout(function(){
                        root.current_view.load(root.section_id, true);
                        var post_success = function(){
                            root.$(".pwt-list li.active[slug=" + delete_id + "]").remove();
                        }
                        root.actionSuccess('popup-delete-chapter', post_success);
                    }, 1000);
                },
                error:function(xhr, status_code, error_message){
                    root.actionFailed('popup-delete-chapter');
                }
            });
        },
        //End of Create/Edit demo lis

        // Create/Edit demo player.
        playerViewRender: function(view){
            if(view.walkthrough.get('can_edit') != undefined && !view.walkthrough.get('can_edit')){
                this.$('.create-new').hide();
            }else{
                this.$('.create-new').addClass('slide').show();
            }
            this.hideAddSlide();
            this.initView(view);
            var activities = this.walkthrough.get('activities');
            var is_sandbox_enabled = _.some(this.tenant.applications, function(app){return app.unique_id.toLowerCase() == 'sandbox'})
            this.$('#player-container .player_wrap').append(this.newSlideOptions({
                'show_start_message': !(this.currentViewHasSlides()),
                'is_sandbox_enabled': is_sandbox_enabled
            }));
            this.$('#player-container').append(this.contentEditor({document_styles: document.documentStyles}));
            this.$('.slide_information').append(this.slideInfo({'activities': activities}));
            this.slider = view.sudoSlider;
            if (view.walkthrough.get('can_edit')){
                this.$('.side-info-opener').append("<div class='wt-title-edit'>");
            }
            if (!view.slide_views.length) {
                this.$('.demo_welcome_block').addClass('active');
                this.$('.notes-item, .side-panel').hide();
            }else if(view.walkthrough.get('can_edit')){
                // Remove slide-settings button for TextEditor slide.
                this.$('.slides-Container [slide-type=content] .content-slide-wrap').append("<div class='content-slide-edit'></div>");
            };
            this.$('.side-panel ul').append("<li><div class='edit-drop-pin' type='edit-drop-pin'></div></li>\
                                             <li><div class='edit-highlighter' type='edit-highlighter'></div></li>\
                                             <li><div class='delete-slide' type='delete-slide'></div></li>");

            var root = this;
            _.each(this.current_view.slide_views, function(view){
                root.addHotspotEditOptions(view);
            });

            this.addPinEditOptions();
            // Allow users to publish only if demo has slides, and if the author has access to it.
            if(this.currentViewHasSlides()){
                if(view.walkthrough.get('can_edit')){
                    $('#edit_container .publish, #edit_container .preview').attr(
                    'walkthrough', this.walkthrough.get('slug')).removeClass('disable').addClass('rippleEffect');

                    this.$('.player_wrapper').append("<div class='slide_settings' type='slide_settings'></div>");
                }else{
                    this.$('.pagination li[data-page="new"]').hide();
                }
                this.initializeFilmStrip();

            }else{
                $('#edit_container .publish, #edit_container .preview').removeAttr(
                    'walkthrough').addClass('disable').removeClass('rippleEffect');
            }

            if($(this.el).hasClass('text-editor-active')) this.$el.removeClass('text-editor-active');
        },

        toggleAddSlideButton: function(){
            this.$('#player-container').hasClass('side-info-active') ? this.$(".create-new.slide").fadeOut() : this.$(".create-new.slide").fadeIn();
        },

        resetPlayerOptions: function(){
            if (this.$el.hasClass('new_slide_active')) {
                this.$el.removeClass('new_slide_active');
                this.$('.create-new.slide').removeClass('active');
            }
            Common.product_details = null;
        },

        /**
        * Triggers on every slide navigation
        * to operate on slide properties such as slide notes to control placeholder.
        */
        slideChanged: function(){
            var current_slide = this.currentSlide();
            if(!current_slide) return;

            // Remove slide-settings if the slide is TextEditor.
            current_slide.primary_resource.type == "content" ? this.$('.player_wrapper .slide_settings').hide() : this.$('.player_wrapper .slide_settings').show();

            this.loadPinContent();
            this.setFilmStripCurrentSlide(current_slide.order);
            this.toggleNotesHotspotsEditOptions();
        },

        ctaToggled: function(){
            if (this.$('#player-container').hasClass('cta-active')) {
                this.$('.edit-drop-pin, .edit-highlighter, .delete-slide').addClass('disabled');
            } else {
                this.$('.edit-drop-pin, .edit-highlighter, .delete-slide').removeClass('disabled');
            }
            this.toggleNotesHotspotsEditOptions();
        },

        sectionCtaToggled: function(){
            this.$('.overlay').hasClass('section-cta-active') ? this.$(".create-new").fadeOut() : this.$(".create-new").fadeIn();  
        },

        loadPinContent: function(){
            var root = this;
            _.each(this.$('#slider' + Common.CURRENT_SLIDE + ' .drop_pin .pin-tooltip h1, #slider'+ Common.CURRENT_SLIDE + ' .drop_pin .pin-tooltip p'), function(ele){
                // Set the contenteditable to false and dont load default placeholder text, if 'can_edit' is false.
                if(root.walkthrough.get('can_edit')){
                    ele.setAttribute('contenteditable', true);
                }else{
                    ele.setAttribute('contenteditable', false);
                }
                if(!ele.textContent){
                    if(document.defaultLocaleID != SDCookies.getItem('author_locale')){
                        ele.setAttribute('contenteditable', false);
                        root.$(ele).text("Switch to '" + document.defaultLocale + "' language to add content");
                    }else if(ele.contentEditable == 'true'){
                        root.$(ele).text(root.PLACEHOLDER_TEXT);
                    }   
                }
            });
            // Remove the 'delete' button inside the pin-hotspot content.
            if(!this.walkthrough.get('can_edit')) this.$('.drop_pin .pin-tooltip .pin-delete').remove();
        },

        setFilmStripCurrentSlide: function(order){
            this.$('.slides_wraper .slides_container .slide').removeClass('active');
            this.$('.slides_wraper .slides_container .slide[order=' + order + ']').addClass('active');
        },

        toggleNotesHotspotsEditOptions: function(){
            var slideType = this.$('#slider' + this.currentSlide().order).attr('slide-type');

            if (this.walkthrough.get('can_edit')){
                if (slideType == '360') {
                    this.$('.edit-drop-pin').removeClass('disabled');
                    this.$('.edit-highlighter').addClass('disabled');
                }else if(['content', 'pdf'].includes(slideType)){
                    this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
                }else if(['file'].includes(slideType)){
                    this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
                }else{
                    this.$('.edit-drop-pin, .edit-highlighter').removeClass('disabled');
                }

                if(slideType == 'sandbox'){
                    this.$('.notes h1').hide();
                    if (this.$('.notes p').attr('contenteditable') == 'false') this.$('.notes p').attr('contenteditable', true);
                }else{
                    this.$('.notes h1').show();
                }
                // Set Add Slide notes options.
                this.setNotesEditOptions();

            }else{
                this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
                this.$('.delete-slide').addClass('disabled');
            }

            var current_slide = this.currentSlide();
            var unEditableNotesText = "Switch to '" + document.defaultLocale + "' language to add content";
            if(!current_slide.title){
                if(document.defaultLocaleID !== SDCookies.getItem('author_locale') &&
                   slideType != 'sandbox' &&
                   !current_slide.is_translation_available){
                    this.$('.notes h1').attr('contenteditable', false).text(unEditableNotesText);
                }else if(this.$('.notes h1').attr('contenteditable') == 'true' && !this.$('.notes p').text().length){
                    this.$('.notes h1').text(this.PLACEHOLDER_TEXT);
                }
            }
            if(!current_slide.text){
                if(document.defaultLocaleID !== SDCookies.getItem('author_locale') &&
                   slideType != 'sandbox' &&
                   !current_slide.is_translation_available){
                    this.$('.notes p').attr('contenteditable', false).text(unEditableNotesText);
                }else if(this.$('.notes p').attr('contenteditable') == 'true' && !this.$('.notes p').text().length){
                    this.$('.notes p').text(this.PLACEHOLDER_TEXT);
                }
            }
        },

        // Upload a resource and create a New-Slide preview.
        previewSlideMedia: function(event){
            this.$('.slide_options.active').removeClass('error');
            this.$('.slide_options.active .error-message').text('');
            var currElem = this.$(event.currentTarget);
            var mediaType = currElem.attr('media-type');
            var mediaFilesCount = event.currentTarget.files; 
            if (mediaType == "360" || (mediaType == "image" && mediaFilesCount.length > 1)) {
                this.previewMultipleImagesSettings({
                    'action':'newFrame',
                    'images': mediaFilesCount,
                    'classType': 'new',
                    'mediaType': mediaType
                });
                return this.$(event.currentTarget).replaceWith(this.$(event.currentTarget).val('').clone(true));
            };
            var media = event.target.files[0];
            var validationResult = this.mediaValidation(event, media);
            if (!validationResult[0]) {
                this.$('.slide_options.active').addClass('error');
                this.$('.slide_options.active .error-message').text(validationResult[1]);
                return this.$(event.currentTarget).replaceWith(this.$(event.currentTarget).val('').clone(true));
            };
            this.hideCancelSlideOptionIcon();

            var uploadJsonData = {
                'media': media,
                'mediaType': mediaType,
                'resourceList': []// 'resourceList' is used while uploading pdf(single pages).
                };
            this.uploadResource(uploadJsonData);
        },

        // Convert base64/URLEncoded data component to raw binary data held in a string.
        dataURItoBlob: function(dataURI) {
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var imgArray = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                imgArray[i] = byteString.charCodeAt(i);
            }
            return new Blob([imgArray], {type:mimeString});
        },

        getImageData: function(dataURL){
            var root = this;
            var imageData = {};
            if(dataURL.startsWith('data:image')){
                // If the url is a data url then return the blob data.
                imageData.type = 'BLOB';
                imageData.data = this.dataURItoBlob(dataURL);
            }else{
                // If the url is the http url, then return its name along with its position value.
                imageData.type = 'NAME';
                imageData.data = dataURL.match(/.*\/(.*)()$/)[1].split('?_')[0];;
            }
            return imageData
        },

        /**
        * Upload request to resource-api done by:
        * initiateSaveMultipleImages, saveSingle360Frame,
        * uploadResource, replaceSlideMedia, urlMediaUpload,
        * showTextEditor, saveTextEditorContent.
        */
        uploadResource: function(uploadJsonData){
            var curSlideOrder = this.currentViewHasSlides()?(Common.CURRENT_SLIDE + 1):1;
            var walkthroughSlug =  this.walkthrough.get('slug');

            var data = this.getResourceFormData({type: uploadJsonData.mediaType, is_new: 'true'});
            var progressBarData = {};
            data.append('resource', uploadJsonData.media);
            this.resource = new Resource(data);
            var root = this;
            this.resource.save(data, {
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    // Upload progress.
                    xhr.upload.addEventListener("progress", function(e){
                        root.uploadProgress(e, uploadJsonData.mediaType, progressBarData);
                    }, false);

                    xhr.upload.addEventListener("error", function(e){
                        // Upload error event goes here.
                        root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
                        root.$('.uploadFile, .resourceUrl').removeClass('disabled');
                        root.uploadFailure();
                        root.$('.upload_retry').removeClass('embed');
                        root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
                    }, false);
                    return xhr;
                },
                processData: false,
                cache: false,
                contentType: false,
                data: data,
                success: function(xhr, response){
                    if(response.status == 'SLIDE_ERROR'){
                        root.uploadError(uploadJsonData, xhr.status);
                        return;
                    }
                    // 'resourceList' is used to store resource paths,
                    // in-case any error occurs while uploading, this list is used to remove resources.
                    if(response.primary_resource && response.primary_resource.path){
                        uploadJsonData.resourceList.push(response.primary_resource.path)
                    }

                    root.uploadSuccess();
                    setTimeout(function(){
                        root.hideAddSlide();
                        // Fetch updated walkthrough and render new player
                        root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
                        $.when(root.current_view.walkthrough.fetch()).done(function(){
                            root.current_view.render();
                            Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder)
                        })
                    }, 1800);
                },
                error: function(model, xhr, message){
                    if(xhr.status == 412)
                        uploadJsonData.error_message = Translate(xhr.responseJSON.message);
                    root.uploadError(uploadJsonData, xhr.status);
                }
            });
        },

        getResourceFormData: function(jsonData){
            var curSlideOrder = this.currentViewHasSlides()?(Common.CURRENT_SLIDE + 1):1;
            if(jsonData.is_new == 'false'){
                curSlideOrder = Common.CURRENT_SLIDE;
            }
            var walkthroughSlug =  this.walkthrough.get('slug');
            var data = new FormData();
            data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
            data.append('walkthrough', walkthroughSlug);
            data.append('slide_order', curSlideOrder);
            data.append('is_new', jsonData.is_new);
            data.append('external', 'false');
            data.append('type', jsonData.type);
            return data;
        },

        add360SlideFrames: function(event){
            var statusTxt = (this.$('.slide-360-preview-wrap').attr('media-type') == 'image') ? 'Adding... ' : 'Stitching... ';  
            this.$('.upload_media_status').addClass('active');
            this.$('.upload_status_update').html(statusTxt);
            this.$(".file-progressbar").show();
            this.$(".file-progressbar-status").css({'width':'100%'});
            var framesData = {'action': 'newFrame',
                              'images': event.currentTarget.files,
                              'mediaType': this.$('.slide-360-preview-wrap').attr('media-type')}

            // While adding a single new frame -- 'update'.
            // While adding new Slide, new frames -- 'new'.
            framesData.classType = (this.$el.hasClass('slide-360-settings-active'))? 'update': 'new';

            this.previewMultipleImagesSettings(framesData);
            $(event.currentTarget).replaceWith($(event.currentTarget).val('').clone(true));
            setTimeout(function(){
                this.$('.upload_media_status').removeClass('active');
                this.$('.upload_status_update').html('Uploading... ');
                this.$(".file-progressbar-status").css({'width':'0%'});
            }, 1000)

        },

        /**
        * 'Edit Your Frames' overlay.
        * params:
        *   framesData - 
        *       {'action': 'newFrame/editFrame',
        *        'images': 'img-List',
        *        'classType': 'new/update',
        *        'count': 'frames-count',
        *        'path': 'frames-path'}.
        */
        previewMultipleImagesSettings: function(framesData) {

            var root = this, sortableTitle;
            this.$('.create-new').hide();
            // Set the mediaType for the "Done" button.
            this.$('.done-360:not(.disabled)').attr('mediaType', framesData.mediaType);

            (framesData.mediaType == 'image') ? (sortableTitle = 'Edit your images') : (sortableTitle = 'Edit your frames');
            this.$('.slide-360-preview-wrap').addClass('active ' + framesData.classType).attr('media-type',framesData.mediaType).find('.title').html(sortableTitle);
            if(framesData.action == 'newFrame'){
                this.$('.slide_options').removeClass('active');
                var previewImgCount = this.$('.slide_360_frames_wrap ul li[order]').length;
                _.each(framesData.images, function(image, index){
                    var reader = new FileReader();
                    var imgPreview = '<li class="sortable-item" draggable="true" order="' + (previewImgCount + index) + '">' +
                        '<img draggable="false" src />' +
                        '<span draggable="false"></span>' +
                        '<div draggable="false">' + image.name + '</div>' +
                        '</li>';
                    if(framesData.classType == 'update'){
                        imgPreview = '<li class="sortable-item" draggable="true" tag_id="NewFrame" order="' + (previewImgCount + index) + '">' +
                            '<img draggable="false" src />' +
                            '<span draggable="false"></span>' +
                            '<div draggable="false">' + image.name + '</div>' +
                            '</li>';
                            root.track360UserActions('newFrameEdit', 'true');
                    }
                    $(imgPreview).insertBefore('.slide_360_frames_wrap ul li:last-child');

                    // Add HTML tag and then set source to avoid delay in loading image source
                    reader.addEventListener("load", function () {
                        $('.slide_360_frames_wrap ul li[order="' + (previewImgCount + index) + '"] img').attr('src', this.result);
                    });
                    reader.readAsDataURL(image);
                });

            }else if(framesData.action == 'editFrame'){
                var current_slide = this.currentSlide()
                var frameDivList = this.$('#slider'+current_slide.order+' .product-viewer').children()
                for (var i = 0; i < framesData.count ; i++) {
                    var spanEle = '';
                    if($(frameDivList[i]).children('div.drop_pin').length){
                        $(frameDivList[i]).children('div.drop_pin').each(function(index, ele){
                            spanEle += '<span pin-id="'+ele.getAttribute('pin-id')+'"></span>';
                        });
                    }
                    // To prevent browser image cache 'cb' - cache-buster.
                    var path = `${framesData.path}/${i+1}.jpg`
                    $(`<li class="sortable-item" draggable="true">
                       <img draggable="false" src=${path} />
                       <span draggable="false"></span>
                       <div draggable="false">${i+1}.jpg</div>${spanEle}</li>`
                    ).insertBefore('.slide_360_frames_wrap ul li:last-child');
                }
            }
            if(framesData.mediaType !== "image") {
                setTimeout(function(){root.check360Frames()}, 1000);
            }
        },

        sortableDragStarted: function(e) {
            this.createDropZones(e);
            document.source = e.currentTarget;
            $('.sortable-item, .dropzone').addClass('droppable-zone');
            e.originalEvent.dataTransfer.setData("text/plain", e.currentTarget.innerHTML);
            e.originalEvent.dataTransfer.effectAllowed = "move";
        },

        sortableDraggingOver: function(e) {
            e.preventDefault();
            $(e.currentTarget).addClass('drop-here');
            e.originalEvent.dataTransfer.dropEffect = "move";
        },

        sortableDraggingLeave: function(e) {
            $(e.currentTarget).removeClass('drop-here');
        },

        sortableElemDropped: function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.source.innerHTML = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = e.originalEvent.dataTransfer.getData("text/plain");
            this.deleteDropZones(e);
            this.track360UserActions('reOrderFrame', 'true');
        },

        createDropZones: function(e) {
            if(!document.fakesActive){
                this.$(e.currentTarget).parent().children('.sortable-item').each(function () {
                    $( "<li class='dropzone'></li>" ).insertAfter(this);
                })
                this.$(e.currentTarget).parent().prepend( "<li class='dropzone'></li>") ;
                document.fakesActive = true;
            }
        },

        deleteDropZones: function(e) {
            $(".slide_360_frames_wrap ul li").removeClass('droppable-zone drop-here');
            this.$(".slide_360_frames_wrap ul").children(':not(.add-frame)').each(function () {
               if(!$(this).text()){
                   $(this).remove();
               }else{
                   $(this).removeClass("dropzone").addClass('sortable-item').attr('draggable',true);
               }
            });
            fakesActive = false;
        },

        // Disables the Done button if there are only two image frames.
        check360Frames: function(){
            if (this.$('.player_wrap .slide_360_frames_wrap li img').length < 3) {
                this.$('.done-360').addClass('disabled');
            } else {
                this.$('.done-360').removeClass('disabled');
            };
        },

        track360UserActions: function(event, data){
            var userActions = JSON.parse(localStorage.getItem('userActions')) || {};
            var listData = userActions[event] || [];
            userActions[event] = listData.concat(data);
            localStorage.setItem('userActions', JSON.stringify(userActions));
        },

        close360Preview: function(){
            this.$('.slide-360-preview-wrap').removeClass('active new update').removeAttr('media-type');
            this.$('.slide_360_frames_wrap ul li').not('.add-frame').remove()
            this.$('.create-new').show();
            if (!this.$el.hasClass('slide-360-settings-active')) {
                this.showSlidesOption();
            } else {
                this.$el.removeClass('slide-360-settings-active')
            };
            this.clearLocalStorage(['userActions']);
            // Remove the attribute on "Done" button once the preview is closed.
            this.$('.done-360:not(.disabled)').removeAttr('mediaType');
            this.showCancelSlideOptionIcon();
        },

        delete360FrameWarning: function(event){
           var index = this.$(event.currentTarget).parent().index();
           var delete_warning_for = this.$('.slide-360-preview-wrap').attr('media-type');
           this.$('.frame-360-delete-warning .delete').attr('data-index', index);
           this.$('.frame-delete-warning').hide();
           this.$('.'+delete_warning_for+'-warning').show();
           this.popupShow('frame-360-delete-warning');
        },

        delete360Frame: function(event){
            var frameno =  parseInt(this.$(event.currentTarget).attr('data-index'));
            var deleteFrameElement = this.$(".slide_360_frames_wrap ul li").eq(frameno);
            var spanPinList = deleteFrameElement.children('span[pin-id]');
            var mediaType = this.$('.slide-360-preview-wrap').attr('media-type');
            var pinIdList = [];
            for(var i=0; i<spanPinList.length; i++){
                pinIdList.push(spanPinList[i].getAttribute('pin-id'));
            }
            // If the 'li' is newly added image resource, then don't track its removal.
            if(!deleteFrameElement.attr('tag_id')){
                var imgSrc = deleteFrameElement.children('img')[0].src;
                var imgName = imgSrc.match(/.*\/(.*)()$/)[1].split('?_')[0];
                this.track360UserActions('deleteFrame', [imgName]);
            }
            this.track360UserActions('deletePin', pinIdList);
            deleteFrameElement.remove();
            var root = this;
            _.each(this.$(".slide_360_frames_wrap ul li[order]"), function(elem, idx){
                root.$(elem).attr('order', idx);
            });
            this.popupClose('frame-360-delete-warning');
            if(mediaType !== 'image') {
                this.check360Frames();
           }
        },

        /**
        * Initiating saving of 360 frames, send 'action_event' - 'initiate' signal to Resource api.
        * Also used in Multiple Image as Slides upload.
        */
        initiateSaveMultipleImages: function(){

            var root = this;
            this.hideCancelSlideOptionIcon();
            var imgFramesList = $('.player_wrap .slide_360_frames_wrap li img');
            if (imgFramesList.length==0) return;
            var is_new = 'true';
            var path = '';
            var mediaType = $('.done-360:not(.disabled)').attr('mediaType');
            var data = this.getResourceFormData({'type': mediaType, 'is_new': is_new});

            // If the mediaType is '360', then send 'initiate' signal,
            // else upload/save the mulitple images as slides. 
            var actionEvent, imgFramesData;
            if(mediaType == '360'){
                actionEvent = 'initiate';
            }else{
                actionEvent = 'images-multiple';
                // For Multiple Img upload, imgFramesData is a list containing only slides' order.
                imgFramesData = [];
                for(var i=0; i<imgFramesList.length; i++){
                    var imgData = root.getImageData(imgFramesList[i].src);
                    // imgFramesData contains images' order starting from 0, which is used for slide_order.
                    imgFramesData.push(i);
                    data.append('resource_' + i, imgData.data);
                }
            }

            var userActions = {};
            var deleteFrame = [];

            // While 'editing' set 'is_new' as false, and set the 'path'.
            if(this.$('.slide-360-preview-wrap').hasClass('active update')){
                var current_slide = this.currentSlide();
                path = current_slide.primary_resource.path;
                is_new = 'false'
                data = this.getResourceFormData({'type': mediaType, 'is_new': is_new});
                actionEvent = 'edit';
                userActions = JSON.parse(localStorage.getItem('userActions'));
                if(userActions) deleteFrame = userActions['deleteFrame'];

                imgFramesData = {};
                for(var i=0; i<imgFramesList.length; i++){
                    var imgData = this.getImageData(imgFramesList[i].src);
                    // JSON data containing imgFrame position as 'key', and imgData as 'value'.
                    if(imgData.type == 'BLOB'){
                        // New image files are appended as file resources with current imgFrame postion number.
                        imgFramesData[i+1] = 'img_resource';
                        data.append('resource_' + (i+1), imgData.data);
                    }else if(imgData.type == 'NAME'){
                        // For repositioned images, only file names are sent.
                        imgFramesData[i+1] = imgData.data;
                    }
                }
            }

            data.append('frames', JSON.stringify({'action_event': actionEvent,
                                                  'path': path,
                                                  'user_actions': userActions,
                                                  'img_frames_data': imgFramesData}));
            this.resource = new Resource(data);
            this.resource.save(data, {
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    // Upload progress
                    xhr.upload.addEventListener("progress", function(e){
                        root.uploadProgress(e, mediaType);
                    }, false);

                    xhr.upload.addEventListener("error", function(e){
                        // Upload error event goes here
                        root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
                        root.$('.uploadFile, .resourceUrl').removeClass('disabled');
                        root.uploadFailure();
                        root.$('.upload_retry').removeClass('embed');
                        root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
                    }, false);
                    return xhr;
                },
                processData: false,
                cache: false,
                contentType: false,
                data: data,
                success: function(xhr, response){
                    if(response.status == 'MULTI_IMAGE_UPLOAD_SUCCESS'){

                        setTimeout(function(){
                            root.hideAddSlide();
                            root.$el.removeClass('slide-360-settings-active');
                            var curSlideOrder = root.currentViewHasSlides()?(Common.CURRENT_SLIDE + 1):1;

                            // Fetch updated walkthrough and render new player
                            root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
                            $.when(root.current_view.walkthrough.fetch()).done(function(){
                                root.current_view.render();
                                Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder)
                            });
                        }, 1500);

                    }else if(response.path){

                        root.clearLocalStorage(['userActions', 'currentFrameNum', 'framesPath']);
                        if(is_new == 'false'){
                            // Update hotspots alog with frames.
                            if(userActions && userActions['deletePin']) root.updatePin360Frames('delete', userActions['deletePin']);
                            var listItem = $('.player_wrap .slide_360_frames_wrap li');
                            root.updatePin360Frames('change-frame', listItem);
                            setTimeout(function(){
                                root.hideAddSlide();
                                root.$el.removeClass('slide-360-settings-active');
                                var curSlideOrder = Common.CURRENT_SLIDE;
                                // Fetch updated walkthrough and render new player
                                root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
                                $.when(root.current_view.walkthrough.fetch()).done(function(){
                                    root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
                                });
                            }, 1500);
                            return;
                        }else if(actionEvent != 'edit'){
                            root.save360Images({'imgFramesList': imgFramesList, 'totalFrames': imgFramesList.length,
                                                'currentFrameNum': 0, 'path': response.path, 'is_new': is_new}); // List indexing starts from '0'.
                        }

                    }
                    // Remove the attribute on "Done" button once the uploading is initiated.
                    root.$('.done-360:not(.disabled)').removeAttr('mediaType');
                },
                error: function(xhr, status_code, response){
                    root.uploadError({'mediaType': mediaType}, status_code.status);
                }
            });
        },

        save360Images: function(framesData){
            var root = this;
            // Start saving the image frames, untill all the frames are saved.
            if(framesData.currentFrameNum < framesData.totalFrames){
                var img = framesData.imgFramesList[framesData.currentFrameNum];
                var imgData = this.getImageData(img.src);
                if(imgData.type == 'BLOB'){
                    framesData.imgBlob = imgData.data;
                }else if(imgData.type == 'NAME'){
                    framesData.imgName = imgData.imgName;
                }
                localStorage.setItem('currentFrameNum', framesData.currentFrameNum);
                localStorage.setItem('framesPath', framesData.path);
                this.saveSingle360Frame(framesData);
            }else if(framesData.currentFrameNum == framesData.totalFrames){
                setTimeout(function(){
                    root.hideAddSlide();
                    root.$el.removeClass('slide-360-settings-active');
                    var curSlideOrder = root.currentViewHasSlides()?(Common.CURRENT_SLIDE + 1):1;
                    if(framesData.is_new == 'false'){
                        curSlideOrder = Common.CURRENT_SLIDE;
                    }
                    // Fetch updated walkthrough and render new player
                    root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
                    $.when(root.current_view.walkthrough.fetch()).done(function(){
                       root.current_view.render();
                        Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder)
                    });
                }, 1500);
                this.clearLocalStorage(['currentFrameNum', 'framesPath']);
            }
        },

        /**
        * Set 'action_event' as 'save_frame', and save one frame at a time thru Resource api,
        * increment currentFrame after saving.
        */
        saveSingle360Frame: function(framesData){

            var root = this;
            var mediaType = '360';
            var data = this.getResourceFormData({type: mediaType, is_new: framesData.is_new});
            data.append('frames',
                        JSON.stringify({'action_event': 'save_frame', 'path': framesData.path,
                                        'frame_number': (framesData.currentFrameNum + 1).toString(), // Indexing starts from 0, so increment by 1.
                                        'img_name': framesData.imgName}));

            data.append('resource', framesData.imgBlob);
            this.resource = new Resource(data);
            this.resource.save(data, {
                xhr: function() {
                    var xhr = new XMLHttpRequest();
                    // Upload progress
                    xhr.upload.addEventListener("progress", function(e){
                        root.uploadProgress(e, mediaType, {'current': framesData.currentFrameNum + 1,
                                                           'total': framesData.totalFrames,
                                                           'is_new': framesData.is_new});
                    }, false);

                    xhr.upload.addEventListener("error", function(e){
                        // Upload error event goes here
                        root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
                        root.$('.uploadFile, .resourceUrl').removeClass('disabled');
                        root.uploadFailure();
                        root.$('.upload_retry').removeClass('embed');
                        root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
                    }, false);
                    return xhr;
                },
                processData: false,
                cache: false,
                contentType: false,
                data: data,
                success: function(xhr, response){
                    framesData.currentFrameNum += 1;
                    framesData.imgBlob = null;
                    framesData.imgName = null;
                    root.save360Images(framesData);
                },
                error: function(xhr, status_code, response){
                    root.uploadError({'mediaType': mediaType}, status_code.status);
                },
            });
        },

        updatePin360Frames: function(action, listItem){
            var root = this;
            if(action == 'change-frame'){
                listItem.each(function(index, ele){
                    if($(ele).children('span[pin-id]').length){
                        $(ele).children('span[pin-id]').each(function(i, e){
                            var pinId = parseInt(e.getAttribute('pin-id'));
                            var frameNum = index+1;
                            var slide = new Slide({id: Common.CURRENT_SLIDE,
                                                   walkthrough_id: root.walkthrough_id,
                                                   entity: {
                                                        type: 'pin',
                                                        event: action,
                                                        entity_id: pinId,
                                                        value: {
                                                            frame_number: frameNum.toString(),
                                                        }
                                                    }
                                                });
                            slide.save(null, {
                                patch: true,
                                error: function(xhr, status_code, response){throw 'UpdatePinError- ' + response.status},
                            });
                        });
                    }
                });
            }else if(action == 'delete'){
                listItem.forEach(function(ele, index){
                    var pinId = parseInt(ele);
                    var slide = new Slide({id: Common.CURRENT_SLIDE,
                                           walkthrough_id: root.walkthrough_id,
                                           entity: {
                                                type: 'pin',
                                                event: action,
                                                entity_id: pinId,
                                            }
                                        });
                    // Remove the Pin entry, and its span element.
                    slide.save(null, {
                               patch: true,
                               success: function(){root.$('span[pin-id="'+pinId+'"]').remove()},
                               error: function(xhr, status_code, response){throw 'DeletePinError- ' + response.status},
                    });
                });
            }
        },

        // Upload progress event goes here.
        uploadProgress: function(event, mediaType, progressBarData){
            var uploadCountText = '', uploadText = '';
            if(mediaType == '360' || mediaType == 'pdf'){
                uploadText = 'Updating... ';
            }
            var loadedProgress, totalProgress;
            if(!$.isEmptyObject(progressBarData)){
                var progressText = '';
                if(mediaType == 'pdf'){
                    progressText = ' pages';
                }else if(mediaType == '360'){
                    progressText = ' frames';
                }
                uploadCountText = progressBarData.current + ' out of ' + progressBarData.total + progressText;
                if(progressBarData.is_new && progressBarData.is_new == 'false'){
                    uploadText = 'Updating... ' + uploadCountText;
                }else{
                    uploadText = 'Uploading... ' + uploadCountText;
                }
                loadedProgress = progressBarData.current;
                totalProgress = progressBarData.total;
            }
            else{
                loadedProgress = event.loaded;
                totalProgress = event.total;
            }
            this.$('.slide-file[media-type=' + mediaType + ']').attr('disabled', 'disabled');
            this.$('.uploadFile, .resourceUrl').addClass('disabled');
             if (event.lengthComputable) {
                this.$(".new_slide_options, .slide_options").removeClass('active'); 
                this.$(".upload_media_status").addClass('active');
                this.$('.upload_status_update').html(uploadText);
                this.$(".file-progressbar").show();
                var percentLoaded = (parseInt( (loadedProgress / totalProgress * 100), 10));
                this.$(".file-progressbar-status").css({'width':percentLoaded+'%'});
            }
        },

        uploadSuccess: function(){
            this.$(".file-progressbar-status").css({'width':'100%'}).addClass('success');
            this.$('.upload_status_update').html('<div class="update_status_success"><span>Great!</span> Upload completed</div>')
            setTimeout(function(){
                this.$(".file-progressbar").removeClass('success').hide();
                this.$(".upload_status_successs").addClass('active');
            }, 500)            
        },

        uploadError: function(jsonErrorData, status_code){
            this.$('.slide-file[media-type=' + jsonErrorData.mediaType + ']').removeAttr('disabled');
            this.$('.uploadFile, .resourceUrl').removeClass('disabled');
            if(status_code != 418){
                this.uploadFailure(jsonErrorData.error_message);
            }else{
                this.malwareFound();
            }
            this.$('.upload_media_status').attr('media-type', jsonErrorData.mediaType);   
            this.$('.upload_retry').removeClass('embed');
            // Send an api request to delete the resource.
            if(jsonErrorData.resourceList){
                for(var i= 0; i < jsonErrorData.resourceList.length; i++){
                    var resource = new Resource({
                        id: jsonErrorData.resourceList[i],
                    })
                    resource.destroy();
                }
            }
        },

        malwareFound: function(){
            $('.slide-file').val('');
            this.$('.slide_360_frames_wrap').find('li[class="sortable-item"]').remove();
            this.$(".new_slide_options, .slide_options, .upload_status_failed").removeClass('active');
            this.$(".upload_media_status").addClass('active');
            this.$('.upload_status_update').empty();
            this.$(".file-progressbar-status").css({'width':'100%'}).addClass('failed');
            setTimeout(function(){
                this.$(".file-progressbar-status").removeClass('failed');
                this.$(".file-progressbar").hide();
                this.$(".malware-error").addClass('active');
            }, 350)
        },

        uploadFailure: function(error_message){
            this.$(".new_slide_options, .slide_options, .malware-error").removeClass('active');
            this.$(".upload_media_status").addClass('active'); 
            this.$(".file-progressbar-status").css({'width':'100%'}).addClass('failed');
            if (error_message){
                this.$('.upload_status_update').html('<div class="update_status_failed"><span>Oops!</span> '+ error_message +'</div>');
            }else{
                this.$('.upload_status_update').html('<div class="update_status_failed"><span>Oops!</span> Something went wrong</div>');
            }
            setTimeout(function(){
                this.$(".file-progressbar-status").removeClass('failed');
                this.$(".file-progressbar").hide();
                this.$(".upload_status_failed").addClass('active');
                if(error_message){
                    this.$(".upload_retry").hide();
                }
            }, 350)
        },

        displayUploadBox: function(){
            this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
            this.$('.create-new').show();
            this.$('.side-info-opener .icon, .wt-title-edit').removeClass('disabled');
            if(this.$el.hasClass('slide-360-settings-active')) {
                this.close360Preview();
            } else {
                this.showSlidesOption();
            }
        },

        retryUpload: function(event){
            var mediaType = $('.upload_media_status').attr('media-type');
            if(mediaType == '360'){
                // If type is 360, then get the currentFrame and path, send it back to server.
                var framesData = {};
                var is_new = 'true';
                framesData.path = localStorage.getItem('framesPath');

                // Set the mediaType for the "Done" button.
                this.$('.done-360:not(.disabled)').attr('mediaType', mediaType);

                // While editing - 'retry'. 
                if(this.$('.slide-360-preview-wrap').hasClass('active update')){
                    this.initiateSaveMultipleImages();
                }else{
                    framesData.currentFrameNum = eval(localStorage.getItem('currentFrameNum'));
                    framesData.imgFramesList = $('.player_wrap .slide_360_frames_wrap li img');
                    framesData.totalFrames = $('.player_wrap .slide_360_frames_wrap li img').length;
                    framesData.is_new = is_new;
                    this.save360Images(framesData);
                }
                this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
                return;
            }

            if($(event.currentTarget).hasClass('embed')) {
                this.$('.author_fade [data-slide = slide_'+ mediaType+'] .url_upload').trigger('click');
            } else {
                this.$('.author_fade [data-slide = slide_'+ mediaType+'] .slide-file').trigger('change');
            }
            this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
        },

        clearLocalStorage: function(itemsList){
            _.each(itemsList, function(item){
                localStorage.removeItem(item);
            });
        },

        replaceSlideMedia: function(event){
            event.preventDefault();
            this.$('form[name=replace-media] input[type=submit]').prop('disabled', true);
            var validation = true,
                mediaType = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).attr('media-type');
            if(mediaType == 'link'){
                var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();
                if(!url.trim()){
                    validation = false;
                }else if(!Common.validateUrl(url)) {
                    validation = false;
                }else{
                    this.actionInProgress('popup-slide-settings');
                    var unfurlData = this.urlUnfurling(url, "/url-unfurl");
                    if(unfurlData.isError){
                        validation = false;
                        this.actionFailed('popup-slide-settings');
                    }
                }
            }else if(mediaType == 'iframe'){
                var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();
                if(!url.trim()){
                    validation = false;
                }else if(!Common.validateUrl(url)) {
                    validation = false;
                }
            }else if(mediaType == 'embed'){
                var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();
                var videoDetails = Common.getEmbedVideoDetails(url)
                if(!url.trim() || !videoDetails){
                    validation = false;
                }
            }else if(mediaType == "file"){
                return this.replaceFileSlide();
            }

            if(!validation) {
                var parentBlock = this.$('form[name=replace-media] input[name=replace_resource]').parents('.block');
                parentBlock.addClass('error');
                parentBlock.find('.error-message').text('Not a valid URL')
                return;
            }

            this.actionInProgress('popup-slide-settings');
            var root = this;
            _.each(this.$('form[name=replace-media] input[name=replace_resource]'), function(ele){
                if(ele.value){
                    let mediaType = ele.getAttribute('media-type');
                    var data = new FormData(),
                        isExternal = _.contains(['embed', 'link', 'iframe'], ele.getAttribute('media-type'));
                    data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
                    data.append('walkthrough', root.walkthrough.get('slug'));
                    data.append('slide_order', Common.CURRENT_SLIDE);
                    data.append('is_new', 'false');
                    data.append('external', isExternal.toString());
                    data.append('type', mediaType);
                    if(ele.getAttribute('media-type') == 'embed'){
                        data.append('thumbnail_url', videoDetails['thumbnail_url'])
                        data.append('path', videoDetails['src'])
                    }else if(ele.getAttribute('media-type') == 'link'){
                        data.append('path', ele.value);
                        data.append('frames', JSON.stringify(unfurlData.metaData))

                    }else if(ele.getAttribute('media-type') == 'iframe' ){
                        data.append('path', ele.value);
                    }

                    if(ele.files && ele.files[0]){
                        data.append('resource', ele.files[0]);
                    }

                    var resource = new Resource(data);

                    resource.save(data, {
                        processData: false,
                        cache: false,
                        contentType: false,
                        data: data,
                        success: function(){
                            root.actionSuccess('popup-slide-settings');
                            root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, Common.CURRENT_SLIDE);
                        },
                        error: function(){
                            return root.actionFailed('popup-slide-settings');
                        }
                    });
                }
            });
        },

        // Function to replace file or adding name and icon to a file type slide.
        replaceFileSlide: function(){
            let fileName = this.$('form[name=replace-media] input[name=file_name]').val(),
                fileObject = this.$('form[name=replace-media] input[name=replace_resource]'),
                coverImage = this.$('form[name=replace-media] input[name=file_cover_image]'),
                mediaType = "file",
                root = this;
            var data = new FormData();
            if(this.$('#upload-file-preview').attr('data-remove-image')){
                data.append("cover_image_removed", "true")
            }
            data.append("walkthrough", this.walkthrough.get("slug"));
            data.append("slide_order", Common.CURRENT_SLIDE);
            data.append("is_new", "false");
            data.append("external", "false");
            data.append("type", mediaType);
            data.append("file_name", fileName);
            if(fileObject[0].files && fileObject[0].files[0]){
                data.append("resource", fileObject[0].files[0]);
            }
            if(coverImage[0].files && coverImage[0].files[0]){
                data.append("cover_image", coverImage[0].files[0])
            }

            var resource = new Resource(data);
            resource.save(data, {
                processData: false,
                cache: false,
                contentType: false,
                data: data,
                success: function(){
                    root.actionSuccess("popup-slide-settings");
                    root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, Common.CURRENT_SLIDE);
                },
                error: function(){
                    return root.actionFailed("popup-slide-settings");
                }
            });
        },

        previewReplaceSlideMedia: function(event){
            var media = event.target.files && event.target.files[0];
            var mediaType = this.$(event.currentTarget).attr('media-type');
            if(['link', 'iframe', 'embed', 'wistia'].includes(mediaType))
                return;

            var validationResult = this.mediaValidation(event, media);
            if(!validationResult[0]){
                this.$(event.currentTarget).parent('.block').addClass('error');
                this.$(event.currentTarget).parent('.block').find('.error-message').text(validationResult[1]);
                this.$('form[name=replace-media] input[type=submit]').prop('disabled', true);
                return;
            } else {
                this.$(event.currentTarget).parent('.block').removeClass('error');
            }

            this.$(event.currentTarget).siblings('.file-name').text(media.name);
            if(mediaType == 'image'){
                this.$(event.currentTarget).siblings('img').attr('src', URL.createObjectURL(media));
            }
            if(!$('.popup-slide-settings .block') .hasClass('error')){
                this.$('form[name=replace-media] input[type=submit]').prop('disabled', false);
            }
        },

        urlUnfurling: function(url, endPoint){
            var isError = false;
            var metaData, errorMessage;
            Backbone.ajax({
                    async: false,
                    dateType: "application/json",
                    url: endPoint,
                    data: {external_url: encodeURI(url)},
                    success: function (response) {
                        metaData = response;
                    },
                    error: function(requestObject, error, errorThrown){
                        isError = true;
                        errorMessage = requestObject.responseJSON.message;
                        console.log(error);
                    }
                })
            return {isError: isError, metaData: metaData, errorMessage: errorMessage}
        },

        /**
        * Method to upload remote slide types.
        * 'link', 'embed', 'remote_pdf', 'iframe'.
        */
        urlMediaUpload: function(event){
            if(this.$(event.currentTarget).parent().hasClass('disabled')) return;

            var type = this.$(event.currentTarget).siblings('input').attr('media-type'),
                validationResult = this.urlValidation(this.$(event.currentTarget).siblings('input'));
            if(!validationResult[0]){
                this.$(event.currentTarget).parents('.slide_options').addClass('error');
                this.$(event.currentTarget).parents('.slide_options').find('.error-message').text(validationResult[1]);
                setTimeout( function(){ 
                    this.$(event.currentTarget).parents('.slide_options').removeClass('error');
                    this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
                }, 2000);
                return;
            }

            var url, unfurlData,
                data = {
                    'walkthrough': this.walkthrough.get('slug'),
                    'is_new': 'true',
                    'external': 'true',
                    'type': type,
                };
            if(type == 'embed'){
                url = this.$(event.currentTarget).siblings('input').attr('embeded-url');
                data['thumbnail_url'] = Common.getEmbedVideoDetails(url)['thumbnail_url'];

            } else if(type == 'pdf'){
                data.type = 'remote_pdf';
                url = this.$(event.currentTarget).siblings('input').val();

            } else if(type == 'link'){
                url = this.$(event.currentTarget).siblings('input').val();
                this.$(".slide_options").removeClass('active'); 
                this.$(".upload_media_status").addClass('active');
                this.$('.upload_status_update').html('fetching...');

                unfurlData = this.urlUnfurling(url, "/url-unfurl");
                if(unfurlData.isError){
                    this.$(".slide_options[data-slide='slide_link']").addClass('active'); 
                    this.$(".upload_media_status").removeClass('active');
                    this.$('.upload_status_update').html('');
                    this.$(event.currentTarget).parents('.slide_options').addClass('error');
                    this.$(event.currentTarget).parents('.slide_options').find('.error-message').text("Enter a valid URL");
                    setTimeout( function(){ 
                        this.$(event.currentTarget).parents('.slide_options').removeClass('error');
                        this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
                    }, 2000);
                    return;
                }           

            } else if(type == 'iframe'){
                url = this.$(event.currentTarget).siblings('input').val();
                unfurlData = this.urlUnfurling(url, "/url-validate");
                if(unfurlData.isError){
                    this.$(".slide_options[data-slide='slide_iframe']").addClass('active'); 
                    this.$(".upload_media_status").removeClass('active');
                    this.$('.upload_status_update').html('');
                    this.$(event.currentTarget).parents('.slide_options').addClass('error');
                    this.$(event.currentTarget).parents('.slide_options').find('.error-message').text(unfurlData.errorMessage);
                    setTimeout( function(){ 
                        this.$(event.currentTarget).parents('.slide_options').removeClass('error');
                        this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
                    }, 2000);
                    return;
                }

            } else {
                url = this.$(event.currentTarget).siblings('input').val();
            }

            this.hideCancelSlideOptionIcon();
            this.$('.slide-file[media-type=' + type + ']').attr('disabled', 'disabled');
            this.$('.uploadFile, .resourceUrl, .upload-url, .upload-url').addClass('disabled');
            this.$('.slide_options.active .upload_media_block .close').addClass('disabled');

            var currentSlideOrder = this.currentViewHasSlides()?(Common.CURRENT_SLIDE + 1):1; 
            data['slide_order'] = currentSlideOrder;
            data['path'] = url;
            if(type == 'link') data.frames =  JSON.stringify(unfurlData.metaData);

            var root = this,
                resource = new Resource();
            resource.save(data, {
                success: function(xhr, response){
                    root.$(".new_slide_options, .slide_options").removeClass('active'); 
                    root.$(".upload_media_status").addClass('active');
                    root.$('.upload_status_update').html('Uploading...');
                    root.$(".file-progressbar").show();
                    root.uploadSuccess();
                    setTimeout(function(){
                        root.hideAddSlide();
                        // Fetch updated walkthrough and render new player
                        root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
                        $.when(root.current_view.walkthrough.fetch()).done(function(){
                            root.current_view.render();
                            Common.loadWalkthrough(
                                root.product_id,
                                root.section_id,
                                root.walkthrough_id,
                                currentSlideOrder);
                        });
                    }, 1500);            
                },
                error: function(xhr, response ){
                    root.$('.slide-file[media-type=' + type + ']').removeAttr('disabled');
                    root.$('.uploadFile, .resourceUrl, .upload-url, .upload-url').removeClass('disabled');
                    root.$('.upload_retry').addClass('embed');
                    root.$('.upload_media_status').attr('media-type',  type );   
                    if(response.status == 418){
                        root.malwareFound();
                    }else{
                        root.uploadFailure();
                    }
                }
            });
        },

        urlValidation: function(object){
            var url = this.$(object).val().trim(),
                type = this.$(object).attr('media-type'),
                message='',
                validation = false;

            switch (type)
            {
                case 'audio':
                    if(!(url.match(/\.(mp3|wav)$/) != null)) {
                        validation = false;
                        message ="Oops! Please enter a valid audio URL.";
                    }else{ validation = true;}
                    break;

                case 'embed':
                    var videoDetails = Common.getEmbedVideoDetails(url);
                    if (!videoDetails) {
                        validation = false;
                        message ="Oops! Please enter a valid video URL.";
                    } else {
                        this.$(object).attr('embeded-url', videoDetails.src);
                        validation = true;
                    }
                    break;

                case 'iframe':
                    if (!(url.match(/^(https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/)!= null)) {
                        validation = false;
                        message ="Oops! Please enter a valid/Secure(HTTPS) URL.";
                    }else{ validation = true; }
                    break;

                case 'image':
                    if(!(url.match(/\.(jfif|jpeg|jpg|gif|png)$/) != null)) {
                        validation = false;
                        message ="Oops! Please enter a valid image URL.";
                    }else{ validation = true; }
                    break;

                case 'link':
                    if (!Common.validateUrl(url)) {
                        validation = false;
                        message ="Oops! Please enter a valid URL.";
                    }else{ validation = true; }
                    break;

                case 'pdf':
                    if(!(url.toLowerCase().match(/\.(pdf)$/) != null)){
                        validation = false;
                        message = "Oops! Please enter a valid pdf URL.";
                    }else{ validation = true; }
                    break;
            }

            if (!validation && message == ''){
                message = 'Oops! Something went wrong';
            }
            return [validation, Translate(message)];
        },

        mediaValidation: function(object, media){
            var type = this.$(object.currentTarget).attr('media-type');

            var message, validStatus = false;
            let fileSizeMB = ['wistia', 'pdf', 'html5', 'video', 'file'].includes(type) ? (media.size / 1000000) : '';
            if (type == 'image') {
                if (!media || !(/\.(jfif|jpg|jpeg|png|gif)$/i).test(media.name)) {
                    validStatus = false;
                    message ="Oops! Please upload a valid image file.";
                }else{
                    validStatus = true;
                }

            }else if (type == 'video') {
                if (!media || !(/\.(mp4|wmv|mpeg4|webm|ogg)$/i).test(media.name)) {
                    validStatus = false;
                    message ="Oops! Please upload a valid video file.";
                }else if (fileSizeMB > Common.VIDEO_FILE_MAX_SIZE) {
                    validStatus = false;
                    message = `Your video cannot be uploaded because it's too large.
                               Allowed limit: ${Common.VIDEO_FILE_MAX_SIZE}MB.`;
                }else{
                    validStatus = true;
                }

            }else if (type == 'audio') {
                if (!media || !(/\.(mp3|wav)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid audio file.";
                }else{
                    validStatus = true;
                }

            }else if (type == 'pdf') {
                if (!media || !(/\.(pdf)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid pdf file.";
                }else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE){
                    validStatus = false;
                    message = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE}MB.`
                }else{
                    validStatus = true;
                }

            }else if (type == 'html5') {
                if (!media || !(/\.(zip|html)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid zip or html file.";
                }else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE){
                    validStatus = false;
                    message = `Please upload a zip or html file which is less than
                               ${Common.DEFAULT_FILE_MAX_SIZE}MB.`;
                }else{
                    validStatus = true;
                }
            }else if(type == 'sandbox'){
                if (!media || !(/\.(json)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid json file.";
                }else{
                    validStatus = true;
                }
            }else if(type == 'ppt'){
                if (!media || !(/\.(ppt|pptx)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid ppt file.";
                }else{
                    validStatus = true;
                }
            } else if(type == 'file'){
                if(!media || !(/\.(ppt|pptx|pdf|zip|html|jpg|gif|jpeg|mp3|mp4|webm|ogg|txt|doc|docx)$/i).test(media.name)) {
                    validStatus = false;
                    message = "Oops! Please upload a valid file";
                }else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE){
                    validStatus = false;
                    message = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE} MB.`;
                }else{
                    validStatus = true;
                }
            } else if(!validStatus && !message){
                message = "Oops! Something went wrong";
            }

            return [validStatus, message];
        },

        showAddSlide: function(event){
            if(document.defaultLocaleID !== SDCookies.getItem('author_locale')){
                return this.switchLanguageWarning();
            }
            if (!this.$(event.currentTarget).hasClass('active')) {
                this.showSlidesOption();
            } else {
                this.hideAddSlide();
            }
        },

        showSlidesOption: function(){
            this.$('.new_slide_options, .create-new').addClass('active');
            this.$el.addClass('new_slide_active');
            this.$('.options_block .options').addClass('bounceDownIn');
            setTimeout(function(){
                this.$('.new_slide_active .options_block .options').removeClass('bounceDownIn');
            }, 1000);
        },

        /**
        Clears the global variable CHAPTERS_LIST, once a chapter has been published.
        */
        clearChaptersList: function(){
            this.CHAPTERS_LIST = [];
        },

        /**
        * Send a GET request to Walkthrough api and fetch the chapters list.
        * Store it in CHAPTERS_LIST variable.
        */
        getChaptersList: function(){
            var walkthrough = new Walkthrough(),
                root=this;
            $.when(walkthrough.fetch({
                async: false,
                data: {get_details: 1},
                processData: true
            })).done(function(response, status, xhr){
                root.CHAPTERS_LIST = response.map( chapter=> {
                    // Add tenant domain to each object in response.
                    // ES6 Spread syntax.
                    chapter.domain = window.location.origin
                    return chapter;
                })
            });
            return this.CHAPTERS_LIST;
        },

        hideAddSlide: function(){
            var root = this;
            this.$('.options_block .options').addClass('bounceUpOut');
            setTimeout(function(){
                root.$el.removeClass('new_slide_active');
                setTimeout(function(){
                    this.$('.options_block .options').removeClass('bounceUpOut');
                    this.$('.slide_options').removeClass('active');
                }, 500)
            }, 600)
            this.$('.create-new.slide, .upload_media_status, .upload_status_failed, new_slide_options').removeClass('active');
        },

        hideCancelSlideOptionIcon: function() {
            this.$('.create-new').hide();
            this.$('.side-info-opener .icon, .wt-title-edit').addClass('disabled');
        },

        showAddSlideOption: function(event){
            this.$('.new_slide_options').removeClass('active');
            var slideType  = this.$(event.currentTarget).attr('type');
            this.hideCancelSlideOptionIcon();
            if (slideType == "slide_content") {
                this.hideAddSlide();
                this.showTextEditor('new');
            } else{
                this.$('[data-slide ="'+slideType+'"]').addClass('active');
            }
        },

        showCancelSlideOptionIcon: function() {
            this.$('.create-new').show();
            this.$('.side-info-opener .icon, .wt-title-edit').removeClass('disabled');
        },

        showJourenyPopup: function(event){
            this.$('.section-edit-block').hide();
            let journeys = new JourneyTree()
            let root = this;
            journeys.fetch({
                success:function(resp){
                    root.$("#create-edit-section .journey-form").html(
                        JourneyList({'journeys':resp.attributes}));
                },
                error:function(xhr, status_code, message){
                    console.log("journeys fetch error:", xhr, status_code, message)
                }
            })
        },

        selectJourneys:function(event){
            let selectedJourneys =  this.$('#journey-sitemap .css-checkbox:checked');
            let journeyIds = []
            _.each(selectedJourneys, (journey)=>{
                let {name, id} = journey.parentElement.dataset
                journeyIds.push({name, id});
            });
            this.$(".section-edit-block .journey-list ol")
                .append(SectionJourneyList({'journeyList': journeyIds}));
            this.hideJourneyPopup();
            this.initializeSectionJourneyLinkSortable();
        },

        hideJourneyPopup: function(event){
            this.$('.section-edit-block').show();
            this.$('.journey-browse-popup').hide();
        },
        getTextEditorOptions: function(){
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var uploadMethod = 'POST';
            var uploadParam = 'editor_file';
            let theme = $('#theme-name').attr('data-theme');
            let defaultOptions = {
                key: Common.FROALA_KEY,
                            charCounterCount: false,
                            toolbarSticky: true,
                            colorsDefaultTab: 'text',
                            colorsStep: 7,
                            colorsHEXInput: true,
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
                                type:'image'
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
            };
            const defaultBMCOptions = {
                colorsText: Common.FROALA_BMC_COLORS_TEXT,
                            tableStyles: Common.FROALA_BMC_TABLE_STYLES,
                            tableMultipleStyles: false,
                            paragraphMultipleStyles: false,
                            inlineStyles: Common.FROALA_BMC_INLINE_STYLES,
                            tableColors: Common.FROALA_BMC_TABLE_COLORS,
                            fontSizeUnit: 'pt'
            };
            const defaultHELPOptions = {
                colorsText: Common.FROALA_HELP_COLORS_TEXT,
                tableStyles: Common.FROALA_HELP_TABLE_STYLES,
                tableMultipleStyles: false,
                paragraphMultipleStyles: false,
                inlineStyles: Common.FROALA_HELP_INLINE_STYLES,
                tableColors: Common.FROALA_HELP_TABLE_COLORS,
                fontSizeUnit: 'pt'
            };
            const defaultDEOptions = {
                inlineStyles: Common.FROALA_DE_INLINE_STYLES,
                tableColors: Common.FROALA_DE_TABLE_COLORS,
                tableStyles: Common.FROALA_DE_TABLE_STYLES,
                tableMultipleStyles: false,
                paragraphMultipleStyles: false,
                fontSizeUnit: 'pt'
            }

            switch(theme){
                case 'bmc':
                    return {...defaultOptions, ...defaultBMCOptions}
                    break;
                case 'helpsite':
                    return {...defaultOptions, ...defaultHELPOptions}
                    break;
                case 'designeverest':
                    return {...defaultOptions, ...defaultDEOptions}
                    break;
                default:
                    return(
                        defaultOptions
                    )
            }
        },

        showTextEditor: function(type){
            let currentSlide = Common.CURRENT_SLIDE;
            $('#edit_container').addClass('text-editor-active');
            let content =  "<h1>Title</h1><p>Write Something</p>";
            if (type == "new") {                
                this.$('.select-layout').removeClass('disabled');
                this.$('.content-editor-wrap').addClass('NEW');
            } else {
                // Add a class name EDIT to the save button while editing, its checked inside saveTextEditorContent().
                content = this.$(`#slider${currentSlide} .content-slide-wrap .content-slide`).html();
                this.$('.content-editor-wrap').addClass('EDIT');
                this.$('.select-layout').addClass('disabled');      
            }
            this.$('.content-editor-wrap').html(content);

            //this.froalaImageCaption();

            this.rteEmbedURL();

            // Define data source for atwho.js
            var chaptersList = (this.CHAPTERS_LIST.length)? this.CHAPTERS_LIST : this.getChaptersList();
            // Define config for At.JS.
            var atJsConfig = {
                at: "@",
                data: chaptersList,
                searchKey: 'name',
                displayTpl: '<li>${name}</li>',
                insertTpl: '<a target="_blank" href=${domain}/#!/${url}>${atwho-at}${name}</a>',
                limit: null
            }
            var root = this;

            this.$('.content-editor-wrap').on('froalaEditor.initialized', function (e, editor) {
                /**  
                 * Condition: On copy paste
                 * Issue: If pasted content has table and table wider than container, it overflows
                 * Action: Add wrapper div.fr-table-wrapper to restict the overflow
                */
                editor.events.on('paste.after', function(event) {
                    let tableElem = $(this.el).find('table');
                    for(let i=0;i<tableElem.length;i++) {
                        let tableWrapper = $(tableElem[i]).parent().hasClass('fr-table-wrapper');
                        if(!tableWrapper) {
                            $(tableElem[i]).wrap('<div class="fr-table-wrapper"></div>');
                        }
                    }
                });
                editor.$el.atwho(atJsConfig);
                editor.events.on('keydown', function (e) {
                    if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
                        return false;
                    }
                }, true);
                editor.events.on('table.inserted', function(table) {
                    $(table).wrap('<div class="fr-table-wrapper"></div>')
                });
            }).froalaEditor(root.getTextEditorOptions());

            $('.content-editor-wrap').on('froalaEditor.contentChanged', function (e, editor) {
                root.contentChanged();
            });
            // Add download attr to the added file.
            $('.content-editor-wrap').on('froalaEditor.file.inserted',function (e, editor, $file, response) {
               // response will be the resource api response.
               response = JSON.parse(response);
               $file.attr('download', response.name);
            });
            // Delete Locally uploded File.
            $('.content-editor-wrap').on('froalaEditor.file.unlink',function (e, editor, $file) {
               let filePath = ($file.href).split("/").slice(-1)[0];
               root.deleteTextEditorUploadedFile(filePath);

            });
            //  Delete locally uploaded Image.
            $('.content-editor-wrap').on('froalaEditor.image.removed',function (e, editor, $img) {
               let imagePath = ($img.attr('src')).split("/").slice(-1)[0];
               root.deleteTextEditorUploadedFile(imagePath);

            });

            $('.content-editor-wrap').on('froalaEditor.paste.after', function (e, editor) {
                editor.$el.find('a').attr('target', '_blank');
            });

        },

        froalaImageCaption: function(){
            var root = this;
            // Define popup template.
            $.extend($.FroalaEditor.POPUP_TEMPLATES, {
                "customPlugin.popup": '[_BUTTONS_][_CUSTOM_LAYER_]'
            });

            // Define popup buttons.
            $.extend($.FroalaEditor.DEFAULTS, {
                popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2'],
            });

            // The custom popup is defined inside a plugin (new or existing).
            $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
                // Create custom popup.
                function initPopup () {
                    // Popup buttons.
                    var popup_buttons = '';

                    // Create the list of buttons.
                    if (editor.opts.popupButtons.length > 1) {
                        popup_buttons += '<div class="fr-buttons">';
                        popup_buttons += editor.button.buildList(editor.opts.popupButtons);
                        popup_buttons += '</div>';
                    }

                    // Load popup template.
                    var template = {
                        buttons: popup_buttons,
                        custom_layer:   '<div class="custom-layer">\
                                            <div class="fr-input-line">\
                                                <input name="caption" type="text" class="fr-caption-attr" placeholder="Caption" tabindex="1" dir="auto" >\
                                            </div>\
                                            <div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertCaption" tabIndex="2">Insert</button></div>\
                                        </div>'
                    };

                    // Replace image with caption container
                    var $popup = editor.popups.create('customPlugin.popup', template);

                    return $popup;
                }

                // Show the popup
                function showPopup () {
                    // Get the popup object defined above.
                    var $popup = editor.popups.get('customPlugin.popup');

                    // If popup doesn't exist then create it.
                    // To improve performance it is best to create the popup when it is first needed
                    // and not when the editor is initialized.
                    if (!$popup) $popup = initPopup();

                    // Set the editor toolbar as the popup's container.
                    editor.popups.setContainer('customPlugin.popup', editor.$tb);

                    // This will trigger the refresh event assigned to the popup.
                    // editor.popups.refresh('customPlugin.popup');

                    // This custom popup is opened by pressing a button from the editor's toolbar.
                    // Get the button's object in order to place the popup relative to it.
                    
                    var $btn = $('.fr-command[data-cmd="imageCaption"]');
                    
                    // Set the popup's position.
                    var left = ($btn.offset().left + $btn.outerWidth() / 2) - 45;
                    //var top = ($btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10)) - 85;
                    var top = $('.fr-popup.fr-desktop.fr-active').css('top').replace("px", "");
                    // Show the custom popup.
                    // The button's outerHeight is required in case the popup needs to be displayed above it.
                    editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
                }

                // Hide the custom popup.
                function hidePopup () {
                    editor.popups.hide('customPlugin.popup');
                }

                // Methods visible outside the plugin.
                return {
                    showPopup: showPopup,
                    hidePopup: hidePopup
                }
            }

            // image caption button
            $.FroalaEditor.DefineIcon('imageCaption', {NAME: 'file-text'});
            $.FroalaEditor.RegisterCommand('imageCaption', {
                title: 'Image Caption',
                  focus: false,
                  undo: false,
                  refreshAfterCallback: false,
                  callback: function () {
                    var img = this.image.get()[0];
                    root.img = img;
                    this.customPlugin.showPopup();

                    //read existing caption text
                    if ($(img).parent().next().prop('nodeName') == "FIGCAPTION") {
                        var caption = $(img).parent().next().text();
                        $('input[name="caption"]').val(caption);
                    } else if ($(img).next().prop('nodeName') == "FIGCAPTION") {
                        var caption = $(img).next().text();
                        $('input[name="caption"]').val(caption);
                    } else {
                        $('input[name="caption"]').val("");
                    }
                }
            });

            // Define custom popup close button icon and command.
            $.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
            $.FroalaEditor.RegisterCommand('popupClose', {
                title: 'Close',
                undo: false,
                focus: false,
                callback: function () {
                    this.customPlugin.hidePopup();
                }
            });

            //Insert image caption
            $.FroalaEditor.RegisterCommand('imageInsertCaption', {
                title: '',
                undo: false,
                focus: false,
                callback: function () {
                    var img = root.img;
                    var caption = $('input[name="caption"]').val();
                    if ($(img).parent().next().prop('nodeName') == "FIGCAPTION") {
                        $(img).parent().next().text(caption);
                    } else if ($(img).next().prop('nodeName') == "FIGCAPTION") {
                        $(img).next().text(caption);
                    } else  {
                        if ($(img).hasClass('fr-fil')) {
                            var align = 'fr-left';
                        } else if ($(img).hasClass('fr-fir')) {
                            var align = 'fr-right';
                        } else {
                            var align ="";
                        }
                        var captionHtml = '<div class="caption-container '+ align +'" >\
                                                <figure>\
                                                    <img class="fr-dib fr-draggable" data-name="test 1"  src="' + $(img).attr('src') + '" style="width:300px">\
                                                    <figcaption class="caption pull-center">' + caption + '</figcaption>\
                                                </figure>\
                                            </div>';
                        $(img).parent().replaceWith(captionHtml)
                    }; 
                    root.saveTextEditorContent('save');
                    this.customPlugin.hidePopup();
                }
            });
            
            //trigger image align event
            this.$('.content-editor-wrap').on('froalaEditor.commands.after', function (e, editor, cmd, param1, param2) {
                if (cmd == 'imageAlign' && $(editor.image.get()[0]).parents('.caption-container').length !=0) { 
                    if($(editor.image.get()[0]).hasClass('fr-fil')){
                        $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-right').addClass('fr-left');
                    } else if($(editor.image.get()[0]).hasClass('fr-fir')){
                        $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-left').addClass('fr-right');
                    } else {
                        $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-right fr-left');
                    }
                    $(editor.image.get()[0]).trigger("click");
                };
            });

            //trigger image remove event
            this.$('.content-editor-wrap').on('froalaEditor.image.beforeRemove', function (e, editor, $img) {
                if ($img.parents('.caption-container') != 0) {
                    $img.parents('.caption-container').remove()
                };
            });

        },

        rteEmbedURL: function(){
            var root = this;

            // Define popup template.
            $.extend($.FroalaEditor.POPUP_TEMPLATES, {
                'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
            });
             
            // Define popup buttons.
            $.extend($.FroalaEditor.DEFAULTS, {
                popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2'],
            });
             
            // The custom popup is defined inside a plugin (new or existing).
            $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
                // Create custom popup.
                function initPopup () {
                    // Load popup template.
                    var template = $.FroalaEditor.POPUP_TEMPLATES.customPopup;
                    if (typeof template == 'function') template = template.apply(editor);
                 
                    // Popup buttons.
                    var popup_buttons = '';
                 
                    // Create the list of buttons.
                    if (editor.opts.popupButtons.length > 1) {
                        popup_buttons += '<div class="fr-buttons">';
                        popup_buttons += editor.button.buildList(editor.opts.popupButtons);
                        popup_buttons += '</div>';
                    }
           
                    // Load popup template.
                    var template = {
                        buttons: popup_buttons,
                        custom_layer:   '<div class="custom-layer">\
                                            <div class="fr-input-line">\
                                                <input name="embedURL" type="text" class="fr-embed-attr" placeholder="Enter embed URL" tabindex="1" dir="auto" >\
                                            </div>\
                                            <div class="fr-error"></div>\
                                            <div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="insertEmbedURL" tabIndex="2">Embed</button></div>\
                                        </div>'
                    };

                    // Create popup.
                    var $popup = editor.popups.create('customPlugin.popup', template);
             
                    return $popup;
                }
             
                // Show the popup
                function showPopup () {
                    // Get the popup object defined above.
                    var $popup = editor.popups.get('customPlugin.popup');
                 
                    // If popup doesn't exist then create it.
                    // To improve performance it is best to create the popup when it is first needed
                    // and not when the editor is initialized.
                    if (!$popup) $popup = initPopup();
                 
                    // Set the editor toolbar as the popup's container.
                    editor.popups.setContainer('customPlugin.popup', editor.$tb);
                 
                    // If the editor is not displayed when a toolbar button is pressed, then set BODY as the popup's container.
                    // editor.popups.setContainer('customPlugin.popup', $('body'));
                 
                    // Trigger refresh for the popup.
                    // editor.popups.refresh('customPlugin.popup');
                 
                    // This custom popup is opened by pressing a button from the editor's toolbar.
                    // Get the button's object in order to place the popup relative to it.
                    var $btn = $('.fr-command[data-cmd="embedURL"]');
                 
                    // Compute the popup's position.
                    var left = $btn.offset().left + $btn.outerWidth() / 2;
                    var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);
                 
                    // Show the custom popup.
                    // The button's outerHeight is required in case the popup needs to be displayed above it.
                    editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
                }
             
                // Hide the custom popup.
                function hidePopup () {
                    editor.popups.hide('customPlugin.popup');
                }
             
                // Methods visible outside the plugin.
                return {
                    showPopup: showPopup,
                    hidePopup: hidePopup
                }
            }
            
            // embed demo
            $.FroalaEditor.DefineIcon('embedURL', {NAME: 'embed-url'});
            $.FroalaEditor.RegisterCommand('embedURL', {
                title: 'Embed link',
                focus: false,
                undo: true,
                refreshAfterCallback: false,
                callback: function () {
                    root.$('.content-editor-wrap').froalaEditor('markers.insert');
                    this.customPlugin.showPopup();
                    root.$('.fr-input-line input[name="embedURL"]').val("");
                    root.$('.fr-error').text('');
                }
            });

            // Define custom popup close button icon and command.
            $.FroalaEditor.DefineIcon('popupClose', { NAME: 'times' });
            $.FroalaEditor.RegisterCommand('popupClose', {
                title: 'Close',
                undo: false,
                focus: false,
                callback: function () {
                    this.customPlugin.hidePopup();
                }
            });

            $.FroalaEditor.DefineIcon('insertEmbedURL', {NAME: 'froala-embed-url'});
            $.FroalaEditor.RegisterCommand('insertEmbedURL', {
                title: 'Embed link',
                focus: false,
                undo: true,
                refreshAfterCallback: false,
                callback: function () {
                    var embedURL = root.$('.fr-input-line input[name="embedURL"]').val()
                    var iframe  = $($.parseHTML(embedURL));
                    $(iframe).addClass('fr-iframe');
                    var width = root.$('.fr-wrapper').width();
                    var height = (width/16)*9;
                    var url = $(iframe).prop("src");
                    root.$('.content-editor-wrap').froalaEditor('placeholder.hide');                    
                    if ($(iframe).prop("tagName") == "IFRAME" && $(iframe).attr('height') && $(iframe).attr('width') && $(iframe).attr('src') && Common.validateUrl(url)) {
                        if($('.fr-marker').length){
                            $(iframe).insertAfter('.fr-marker');
                        }else{
                            root.$('.content-editor-wrap').froalaEditor('html.insert', iframe, true);
                        }
                        root.$('.content-editor-wrap .fr-iframe').css({
                            'position': 'relative',
                            'width': width,
                            'height': height
                        });
                        root.$('.content-editor-wrap').froalaEditor('markers.remove');
                    
                        root.saveTextEditorContent('save');
                        this.customPlugin.hidePopup();
                    }  else {
                        root.$('.fr-error').text('Enter valid Iframe URL with height and width');
                        return;
                    };
                }
            });            
        },

        contentChanged: function(){
            var root = this;
            this.$('.content-editor-wrap').addClass('draft');
            clearTimeout(this.timerId);
            this.timerId = setTimeout(function(){
                root.checkContent();
                root.saveTextEditorContent('save');
            }, 3000)
        },

        selectLayout: function(event){
            var attrs = {};
            var layout = this.$(event.currentTarget).attr('data-layout');
            switch(layout) {
            case "1":
                attrs.layout_one = true;
                break;
            case "2":
                attrs.layout_two = true;
                break;
            case "3":
                attrs.layout_three = true;
                break;
            case "4":
                attrs.layout_four = true;
                break;             
            }
            this.$('.content-editor-wrap .fr-view').html(this.contentLayout(attrs));
            this.$('.fr-wrapper').removeClass('show-placeholder');
        },

        checkContent: function(event){
            if ($('.content-editor-wrap .fr-element').text() == '') {
                $('.select-layout').removeClass('disabled'); 
            } else {
                $('.select-layout').addClass('disabled'); 
            };
        },

        saveTextEditorContent: function(saveType){
            this.saveType = saveType;
            this.$('.content-saving').removeClass('error').text('saving changes...');
            var current_slide = Common.CURRENT_SLIDE;
            var textEditorSaveBtn = $('.content-editor-wrap');
            var newHtmlContent = this.$('.content-editor-wrap').froalaEditor('html.get', true);
            var is_new_slide = 'true';
            var curSlideOrder = this.currentViewHasSlides()?(current_slide + 1):1;
            
            if(textEditorSaveBtn.hasClass('EDIT')){
                is_new_slide = 'false';
                curSlideOrder -=1;
            } else if (textEditorSaveBtn.hasClass('NEWEDIT')) {
                is_new_slide = 'false';
            };

            var contentData = {
                'walkthrough': this.walkthrough.get('slug'),
                'slide_order': curSlideOrder,
                'is_new': is_new_slide,
                'external': 'false',
                'type': 'content',
                'content': newHtmlContent,
            }

            var resource = new Resource();
            var root = this;
            resource.save(contentData, {
                // same method as used inside urlMediaUpload() 'success' response. 
                success: function(response){
                    setTimeout(function () {
                        root.$('.content-saving').removeClass('error').addClass('saving-progress').text('changes saved.');
                        setTimeout(function(){
                            root.$('.content-saving').removeClass('saving-progress').text('');
                        }, 2000);
                        root.$('.content-editor-wrap').removeClass('draft');
                        if (root.saveType=='saveretry') {
                            root.exitTextEditor();
                        }
                        if ($('.content-editor-wrap').hasClass('NEW')) $('.content-editor-wrap').removeClass('NEW').addClass('NEWEDIT');
                    },500);
                },
                error: function(){
                    root.$('.content-saving').addClass('error').text('Error saving changes.');
                    setTimeout(function(){
                        root.$('.content-saving').removeClass('error saving-progress').text('');
                    }, 2000);
                    if (root.saveType=='saveretry') {
                        root.popupClose('text-editor-warning');
                    };
                },
            });
        },

        checkContentSaved: function(){
            if (this.$('.content-editor-wrap').hasClass('draft')) {
                this.popupShow('text-editor-warning');
            } else {
                this.exitTextEditor();
            }
        },

        exitTextEditor: function(){
            var root = this;
            var current_slide = Common.CURRENT_SLIDE;
            var curSlideOrder = this.currentViewHasSlides()?(current_slide + 1):1;
            if ($('.content-editor-wrap').hasClass('EDIT') || $('.content-editor-wrap').hasClass('NEW')) {
                curSlideOrder -= 1;
            };
            root.$('.content-editor-wrap').froalaEditor('destroy');
            this.popupClose('text-editor-warning');
            this.hideAddSlide();
            // Fetch updated walkthrough and render new player
            this.current_view.$el.html('');
            root.current_view.walkthrough = new Walkthrough({id: root.walkthrough_id});
            $.when(this.current_view.walkthrough.fetch()).done(function(){
                root.current_view.render();
                Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder)
                root.$el.removeClass('text-editor-active');
            })
        },

        retrySaveTextContent: function(){
            clearTimeout(this.timerId);
            this.popupClose('text-editor-warning');
            if (this.$('.content-editor-wrap').hasClass('draft')){
                this.saveTextEditorContent('saveretry');
            }else{
                this.exitTextEditor();
            }
        },

        deleteTextEditorUploadedFile: function(filePath) {
            if (!filePath) return;
            let rteResource = new RteResource({path: filePath});
            rteResource.destroy()
        },

        hideAddSlideOption: function(event){
            if (this.$(event.currentTarget).hasClass('disabled')) return;

            this.$('.new_slide_options').addClass('active');
            var slideType  =   this.$(event.currentTarget).parents('.slide_options').attr('data-slide');
            this.$('[data-slide ="' + slideType + '"]').removeClass('active');
            this.$('[data-slide ="' + slideType + '"] .upload-url').hide();
            this.$('.slide-file-block').removeClass('upload_box_border');
            this.$('.slide_options').removeClass('error');
            this.showCancelSlideOptionIcon();
        },

        showUploadUrl: function(event){
            if (this.$(event.currentTarget).hasClass('disabled')) return;
            this.$(event.currentTarget).siblings('.upload-url').toggle();
        },

        hideUploadUrl: function(event){
            if(this.$(event.currentTarget).hasClass('disabled')) return;
            this.$(event.currentTarget).siblings('.upload-url').hide();
            this.$('.url_input').val('');
        },

        dragOverNewSlide: function(){
            this.$('.slide_options.active .slide-file-block').addClass('upload_box_border');
        },

        editContentFocus: function(event){
            if(this.$(event.currentTarget).text() == this.PLACEHOLDER_TEXT) {
                this.$(event.currentTarget).text("");
            };
        },

        editContentFocusOut: function(event){
            if(!this.$(event.currentTarget).text().length) {
                this.$(event.currentTarget).text(this.PLACEHOLDER_TEXT);
            };
        },

        showSlideSettings: function(){
            var current_slide = this.currentSlide();
            var primary_resource = current_slide.primary_resource;

            if (primary_resource.type=="360") {
               return this.show360SlideSettings();
            };

            var secondary_resource = current_slide.secondary_resource;
            var resource_type = primary_resource.type;
            var attrs = {};
            if(current_slide && !_.isEmpty(primary_resource)){
                if(resource_type == 'audio'){
                    attrs.replace_audio = true;
                    attrs.audio_options = this.ALLOWED_AUDIO_FORMATS.toString();
                    if(_.isEmpty(secondary_resource)){
                        attrs.add_cover = true;
                    }else{
                        attrs.replace_cover = true;
                    }
                    attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
                }else if(resource_type == 'video'){
                    attrs.replace_video = true;
                    attrs.video_options = this.ALLOWED_VIDEO_FORMATS.toString();
                    if(_.isEmpty(secondary_resource)){
                        attrs.add_cover = true;
                    }else{
                        attrs.replace_cover = true;
                    }
                    attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
                }else if(resource_type == 'wistia'){
                    attrs.replace_video = true;
                }else if(resource_type == 'embed'){
                    attrs.enableSaveButton = true;
                    attrs.replace_embed = true;
                    if(_.isEmpty(secondary_resource)){
                        attrs.add_cover = true;
                    }else{
                        attrs.replace_cover = true;
                    }
                    attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
                }else if(resource_type == 'pdf'){
                    if(primary_resource.meta_data &&
                        primary_resource.meta_data.source_type == 'ppt') {
                        attrs.replace_ppt = true;
                        attrs.ppt_options = this.ALLOWED_PPT_FORMATS.toString();
                    }else {
                        attrs.replace_pdf = true;
                        attrs.pdf_options = this.ALLOWED_DOC_FORMATS.toString();
                    }
                }else if(resource_type == 'file'){
                    attrs.replaceFile = true;
                    attrs.name = primary_resource.name;
                    attrs.fileOptions = this.ALLOWED_FILE_FORMATS.toString();
                    attrs.fileName = `${primary_resource.name}${primary_resource.meta_data.type}`;
                    attrs.enableSaveButton = true;
                    if(primary_resource.meta_data.thumbnail_url){
                        attrs.icon = {
                            url: primary_resource.meta_data.thumbnail_url,
                            name: this.walkthrough.attributes.name
                        }
                    }
                }else if(resource_type == 'link'){
                    attrs.enableSaveButton = true;
                    attrs.replace_link = true;
                }else if(resource_type == 'image'){
                    attrs.replace_image = true;
                    if(_.isEmpty(secondary_resource)){
                        attrs.add_background_audio = true;
                    }else{
                        attrs.replace_background_audio = true;
                    }
                    attrs.audio_options = this.ALLOWED_AUDIO_FORMATS.toString();
                    attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
                } else if(resource_type == 'content'){
                    attrs.replace_content = true;
                    attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
                } else if (resource_type == 'iframe') {
                    attrs.enableSaveButton = true;
                    attrs.replace_iframe = true;
                } else if(resource_type == 'html5'){
                    attrs.replace_html5 = true;
                } else if(resource_type == 'sandbox'){
                    attrs.replace_sandbox = true;
                };
            }
            this.$('.popup-slide-settings').html(this.SlideSettings(attrs));
            this.$('.popup-slide-settings .block').removeClass('error');
            this.popupShow('popup-slide-settings');
        },

        show360SlideSettings: function(){
            var current_slide = this.currentSlide();
            this.$('.new_slide_options').removeClass('active');
            this.$el.addClass('slide-360-settings-active');
            return this.previewMultipleImagesSettings({
                'action': 'editFrame', 'classType': 'update',
                'count': current_slide.primary_resource.meta_data.count,
                'path': current_slide.primary_resource.path,
                'mediaType': '360'
            });
        },

        addHotspotEditOptions: function(slide_view){
            var root = this;
            _.each(slide_view.$el.find('.hotspot'), function(hsp, index){
                var hsp_id = slide_view.slide.hotspots[index] && slide_view.slide.hotspots[index].id;
                var hotspotedit = "<div class='hotspot-edit-options' rel=" + hsp_id + ">\
                                       <div class='hotspot-edit'></div>\
                                       <div class='hotspot-delete'></div>\
                                   </div>";
                root.$(hsp).append(hotspotedit);
            });
        },

        addPinEditOptions: function(){
            this.$('.drop_pin .pin-tooltip .pin-delete').remove();
            this.$('.drop_pin .pin-tooltip').append("<div class='pin-delete'>delete</div>");
        },

        toggleHotspotEdit: function(event){
            if(this.$(event.currentTarget).hasClass('disabled')) return;
            if(this.$('#player-container').hasClass('drop-pin-active')) {
                this.disablePinEdit();
            }

            var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE-1];
            if(this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length || !this.canAnnotate(cur_slide_view.slide)){
                return this.$('#player-container').removeClass('area-highlighter-active');
            }

            if(document.defaultLocaleID !== SDCookies.getItem('author_locale')){
                return this.switchLanguageWarning();
            }

            this.$('#player-container').toggleClass('area-highlighter-active');
            var cur_slide = this.currentSlide();
            var currentSlide = this.$("#slider" + cur_slide.order);
            if (this.$('#player-container').hasClass('area-highlighter-active')) {
                var root =  this;
                this.$(currentSlide).find(".hotspot-edit-options").addClass("active");
                _.each(this.$("#slider" + cur_slide.order + ' .hotspot'), function(elem, index){
                    root.initResizeDrag(elem, currentSlide);
                });
                currentSlide.addClass('cursor');
                var gen_box = null, i=1, width, height, x_begin, x_end, y_begin, y_end;
                currentSlide.selectable({
                    start: function(e, ui) {
                        //get the mouse position on start
                        x_begin = e.pageX;
                        y_begin = e.pageY;
                    },
                    stop: function(e, ui){
                        //get the mouse position on stop
                        x_end = e.pageX;
                        y_end = e.pageY;
                        var drag_left = false;
                        var drag_right = false;
                        if (x_end - x_begin >=1){
                            width = x_end - x_begin;
                            height = y_end - y_begin;
                            drag_right = true;
                        } else {
                            width = x_begin - x_end;
                            height = y_end - y_begin;
                            drag_left = true;
                        }
                        var globalVar = Math.floor((Math.random() * 500) + 100);
                        $(this).append('<div id="hotspot' + globalVar + '" class="hotspot hsedit hsnew" style="top:'+ y_begin +'px; left:'+ x_begin + 'px; width:' + width + 'px; height:' + height + 'px;"></div>');

                        var hspot = $("#hotspot" + globalVar);
                        hspot.draggable({containment: currentSlide});
                        hspot.resizable({handles:'all', containment: currentSlide});

                        if(drag_right){
                            root.$(hspot).offset({left: x_begin - 3, top: y_begin - 3});
                        }
                        if(drag_left){
                            root.$(hspot).offset({left: x_end - 3, top: y_begin - 3});
                        }
                        hspot.draggable("destroy");
                        hspot.resizable("destroy");
                        root.showSaveHotspot();
                        root.initResizeDrag(hspot, currentSlide);
                    }
                });
            }else{
                currentSlide.removeClass('cursor');
                $(currentSlide).find(".hotspot-edit-options").removeClass("active");
                _.each(this.$('.hotspot'), function(elem, index){
                    if($(elem).data("uiDraggable")){
                        $(elem).draggable("destroy");
                    }
                    if($(elem).data("uiResizable")){
                        $(elem).resizable("destroy");
                    }
                });

                if (currentSlide.data("uiSelectable")) {
                    currentSlide.removeClass('cursor');
                    currentSlide.selectable("destroy");
                };
            }

        },

        showSaveHotspot: function(hotspot_data){
            this.$('#create-edit-popup').removeAttr('hotspot-id');
            this.$('#create-edit-popup').html(this.hotSpot()).niceScroll();
            if(hotspot_data){
                this.$('#create-edit-popup').attr('hotspot-id', hotspot_data.id);

                if(hotspot_data.display){
                    if(hotspot_data.display.color && hotspot_data.display.color != 'transparent'){
                        this.$(".color-box").css({"background-color": hotspot_data.display.color});
                    }
                    if(hotspot_data.display.delay) {
                        this.$('#hotspot-timer').val(hotspot_data.display.delay);
                    }
                }

                if(hotspot_data.action && hotspot_data.hotspot_type == "goto"){
                    if(hotspot_data.action.slide_number == 'next' ){
                        this.$('#next').attr('checked', true)
                    }else if(hotspot_data.action.slide_number == 'prev'){
                        this.$('#prev').attr('checked', true)
                    }else if(hotspot_data.action.slide_number == 'noaction'){
                        this.$('#nolink').attr('checked', true)
                    }else{
                        this.$('#goto').attr('checked', true);
                        this.$(".link-option select").innerHTML = "";
                        this.$(".link-option select option").remove();
                        if(this.currentViewHasSlides()){
                            for(var i=1; i <= this.current_view.slide_views.length; i++){
                                this.$(".link-option select").append('<option value="'+ i +'">Slide '+ i +'</option>')
                            }
                        }
                        this.$('#goto-slide-no').val(hotspot_data.action.slide_number).show();
                    }
                } else if(hotspot_data.action && hotspot_data.hotspot_type == 'link'){
                        this.$('#elink').attr('checked', true);
                        this.$('#e-link').val(hotspot_data.action.href).show();
                }
            }
            this.$('.color-box').colpick({
                layout: 'rgb',
                submit: 0,
                colorScheme: 'light',
                onBeforeShow: function(el) {
                    $(el).find('.colpick_submit').remove();
                },
                onChange: function(hsb, hex, rgb, el, bySetColor) {
                    $(el).attr("style", "background: #" + hex);
                }
            })
            this.popupShow("popup-save-hotspot");
        },

        /**
         * Global : Restrict input value to number
         */  
        restrictValToNumber: function(e) {
            let elem =  e.currentTarget;
            let elemVal = elem.value.replace(/[^0-9]/,'');
            elem.value = (!elemVal) ? '' : elemVal;
        },

        saveHotspot: function(){
            var root = this;
            var hotspot_data = {
                'callout': {},
                'hotspot_type': 'goto',
                'action': {
                    'slide_number': 'next'
                },
                'display': {
                    'color': 'transparent'
                },
                'event': 'create'
            };


            if(this.$('#prev').is(':checked')){
                hotspot_data.action.slide_number = 'prev';
            }else if(this.$('#goto').is(':checked')){
                hotspot_data.action.slide_number = this.$('#goto-slide-no').val();
            }else if(this.$('#elink').is(':checked')){
                var validationResult = this.urlValidation(this.$('#e-link'));
                var urlPattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
                if(validationResult[0]){
                    hotspot_data.hotspot_type = 'link';
                    hotspot_data.action = {'href' : this.$('#e-link').val()};
                }else{
                    this.$('.popup-save-hotspot .error-message').text(validationResult[1]).show();
                    return;
                }
            }
            else if(this.$('#nolink').is(':checked')){
                hotspot_data.action.slide_number = "noaction";
            }

            hotspot_data.display.color = this.rgb2hex(this.$('.color-box').css('background-color'));
            if(this.$('#hotspot-timer').val()) {
                hotspot_data.display.delay = parseInt(this.$('#hotspot-timer').val());
            }
            var cur_slide = this.currentSlide();
            var frame_width = this.$("#slider" + cur_slide.order).width();
            var frame_height = this.$("#slider" + cur_slide.order).height();
            var hspot = this.$(".hotspot.hsedit");
            var hotspot_id = this.$('#create-edit-popup').attr('hotspot-id');
            if(hotspot_id){
                hspot = this.$('.hotspot-edit-options[rel=' + hotspot_id + ']').parent();
                hotspot_data.id = hotspot_id;
            }
            var top  = ((parseFloat($(hspot).css("top").replace("px", ""))/frame_height) * 100).toFixed(2) + '%',
                height = ((parseFloat($(hspot).css("height").replace("px", ""))/frame_height) * 100).toFixed(2) + '%',
                left = ((parseFloat($(hspot).css("left").replace("px", ""))/frame_width) * 100).toFixed(2) + '%',
                width = ((parseFloat($(hspot).css("width").replace("px", ""))/frame_width) * 100).toFixed(2) + '%'

            hotspot_data.display['top'] = top
            hotspot_data.display['height'] = height
            hotspot_data.display['left'] = left
            hotspot_data.display['width'] = width
            this.actionInProgress('popup-save-hotspot');

            this.walkthrough.save({
                'hotspot': hotspot_data,
                'slide_order': Common.CURRENT_SLIDE,
            }, {
                patch: true,
                success: function(response){
                    _.each(['hotspot', 'slide_order'], function(key){
                        root.walkthrough.unset(key, {silent: true});
                    });
                    root.actionSuccess('popup-save-hotspot');
                    var slides = root.walkthrough.get('slides');
                    var new_hotspot;
                    if(hotspot_id){
                        new_hotspot = _.find(slides[Common.CURRENT_SLIDE - 1].hotspots, function(hsp){
                            return hsp.id == hotspot_id;
                        });
                    }else{
                        new_hotspot = _.last(slides[Common.CURRENT_SLIDE - 1].hotspots);
                    }
                    root.drawHotSpot(hspot, new_hotspot);
                    root.updateSlideEditView();
                }, error: function(response, xhr){
                    root.actionFailed('popup-save-hotspot');
                }
            });
        },

        cancelHotspot: function(){
            this.$(".hotspot.hsnew").remove();
            this.$('#create-edit-popup').removeAttr('hotspot-id');
            this.popupClose("popup-save-hotspot");
        },

        calloutGoto: function(event){
            var option =  event.currentTarget.value;
            this.$(".link-option input[type=text]").hide();
            this.$(".link-option select").hide();

            if(option == "elink"){
                this.$(".link-option input[type=text]").show();
            }else if(option == "goto"){
                this.$(".link-option select").innerHTML = "";
                this.$(".link-option select option").remove();
                if(this.currentViewHasSlides()){
                    var slides = this.current_view.slide_views.length;
                    for(var i=1; i<= slides; i++){
                        this.$(".link-option select").append('<option value="'+ i +'">Slide '+ i +'</option>')
                    }
                }
                this.$(".link-option select").show();
            }
        },

        drawHotSpot: function(hspot, hotspot_data){
            var cur_slide = this.currentSlide();
            this.$(hspot).css({"border-color": hotspot_data.display.color}).attr("border-color", hotspot_data.display.color);
            if(!this.$(hspot).find(".hotspot-edit-options").length){
                var hotspotedit = "<div class='hotspot-edit-options active' rel='" + hotspot_data.id + "'>\
                                       <div class='hotspot-edit'></div>\
                                       <div class='hotspot-delete'></div>\
                                   </div>";
            }

            hspot.off('click');
            hspot.on('click', function(){
                if(hspot.data('uiDraggable') || hspot.data('uiResizable') || hspot.data('uiSelectable')) return;

                var slide_number = 'next'
                if(hotspot_data.action && hotspot_data.action.slide_number != undefined){
                    slide_number = hotspot_data.action.slide_number;
                }
                hspot.trigger('scroll_slide', slide_number)
            });
            this.$(hspot).removeClass("hsedit hsnew hsupdate");
        },

        editHotspot: function(event){
            this.$(event.currentTarget).parent().parent().addClass("hsedit");
            var hsp_id = this.$(event.currentTarget).parent().attr('rel');
            var editing_hotspot = _.find(this.current_view.slide_views[Common.CURRENT_SLIDE-1].slide.hotspots, function(hsp){
                return hsp.id == hsp_id;
            });

            this.showSaveHotspot(editing_hotspot);
        },

        deleteHotspot: function(event){
            var hsp_id = this.$(event.currentTarget).parent().attr('rel');
            var hotspot_data = {
                'event': 'delete',
                'id': parseInt(hsp_id)
            }
            var element = this.$(event.currentTarget).parents('.hotspot');
            var root = this;
            this.walkthrough.save({
                'hotspot': hotspot_data,
                'slide_order': Common.CURRENT_SLIDE,
            }, {
                patch: true,
                success: function(response){
                    _.each(['hotspot', 'slide_order'], function(key){
                        root.walkthrough.unset(key, {silent: true});
                    });
                    root.$(element).remove();
                    root.updateSlideEditView();
                }
            });
        },

        initResizeDrag: function(hotspot, current_slide){
            var root = this;
            this.$(hotspot).draggable({
                containment: current_slide,
                stop: function( event, ui ) {
                    root.resizeHotspot(event.target, function(){
                        ui.helper.css(ui.originalPosition);
                    });
                }
            });
            this.$(hotspot).resizable({
                handles: 'all',
                containment: current_slide,
                stop: function( event, ui ) {
                    root.resizeHotspot(event.target, function(){
                        ui.element.css(ui.originalSize);
                    });
                }
            });
        },

        resizeHotspot: function(element, error_callback){
            var hsp_id = this.$(element).find('.hotspot-edit-options').attr('rel');

            var hotspot_data = {
                'display': {
                    'color': 'transparent'
                },
                'event': 'create'
            };

            hotspot_data.id = hsp_id;
            hotspot_data.display.color = this.$(element).attr('border-color');
            var cur_slide = this.currentSlide();
            var frame_width = this.$("#slider" + cur_slide.order).width();
            var frame_height = this.$("#slider" + cur_slide.order).height();
            var top  = ((parseFloat($(element).css("top").replace("px", ""))/frame_height) * 100).toFixed(2) + '%',
                height = ((parseFloat($(element).css("height").replace("px", ""))/frame_height) * 100).toFixed(2) + '%',
                left = ((parseFloat($(element).css("left").replace("px", ""))/frame_width) * 100).toFixed(2) + '%',
                width = ((parseFloat($(element).css("width").replace("px", ""))/frame_width) * 100).toFixed(2) + '%'
            _.each(cur_slide.hotspots, (hsp)=> {
                if (hsp.id === parseInt(hsp_id) && hsp.display.delay) {
                   hotspot_data.display.delay = hsp.display.delay;
                }
            })
            hotspot_data.display['top'] = top
            hotspot_data.display['height'] = height
            hotspot_data.display['left'] = left
            hotspot_data.display['width'] = width

            var root = this;
            this.walkthrough.save({
                'hotspot': hotspot_data,
                'slide_order': Common.CURRENT_SLIDE,
            }, {
                patch: true,
                success: function(response){
                    _.each(['hotspot', 'slide_order'], function(key){
                        root.walkthrough.unset(key, {silent: true});
                    });
                    root.updateSlideEditView();
                }, error: function(response, xhr){
                    if(error_callback){
                        error_callback();
                    }
                }
            });
        },

        updateSlideEditView: function(){
            this.disablePinHotspotEdit();
            // Get latest slide details
            var slides = this.walkthrough.get('slides');

            // Current slide view
            var cur_sl_view = this.currentSlideView()

            // Update latest slide details
            cur_sl_view.slide = slides[Common.CURRENT_SLIDE - 1];
            cur_sl_view.slide.tenant = this.current_view.tenant;

            // Load current slide assets
            cur_sl_view.asset_load_status = false;
            cur_sl_view && cur_sl_view.render() && cur_sl_view.loadAsset();

            // Add hotspot edit options for newly rendered view
            this.addHotspotEditOptions(cur_sl_view);

            // add pin edit options for newly rendered view
            this.addPinEditOptions();

            // load pin content
            this.loadPinContent();

            // Re initialize filmstrip
            this.initializeFilmStrip();
        },

        currentSlideView: function(){
            var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE - 1];
            return cur_slide_view;
        },

        currentSlide: function(){
            var cur_sl_view = this.currentSlideView();
            var cur_slide = cur_sl_view && cur_sl_view.slide;
            return cur_slide;
        },
        disablePinHotspotEdit: function(){
            this.disablePinEdit();
            this.disableHotspotEdit();
        },

        disableHotspotEdit: function(){
            if (this.$('#player-container').hasClass('area-highlighter-active')) {
                this.$('#player-container').removeClass('area-highlighter-active');
                var cur_slide = this.currentSlide();
                this.$("#slider" + cur_slide.order).removeClass('cursor').find(".hotspot-edit-options").removeClass("active");
                _.each(this.$("#slider" + cur_slide.order + '.hotspot'), function(elem, index){
                    if($(elem).data("uiDraggable")){
                        $(elem).draggable("destroy");
                    }
                    if($(elem).data("uiResizable")){
                        $(elem).resizable("destroy");
                    }
                });

                if (this.$("#slider" + cur_slide.order).data("uiSelectable")) {
                    this.$("#slider" + cur_slide.order).removeClass('cursor');
                    this.$("#slider" + cur_slide.order).selectable("destroy");
                };
            }
        },

        disablePinEdit: function(){
            if (this.$('#player-container').hasClass('drop-pin-active')) {
                this.$('#player-container').removeClass('drop-pin-active');
                var cur_slide = this.currentSlide();
                this.$("#slider" + cur_slide.order + ", #slider"+cur_slide.order+" .product-frame").removeClass('pin-cursor');
                var root = this;
                 _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function(elem, index){
                    root.removeDragPin(elem);
                });
            };
        },

        initializeFilmStrip: function(){
            // If the parent(walkthrough) 'Product' is not editable, then hide the filmstrip and return.
            if(!this.walkthrough.get('can_edit')){
                this.$('.slides_wraper').hide();
                return;
            }
            var root = this;
            var slides = this.walkthrough.get('slides');
            _.each(slides, function(slide, idx){
                slide.is_image = false;
                if(slide.primary_resource.type == 'image'){
                    slide.is_image = true;
                    slide.src = slide.primary_resource.path;
                }else if(slide.primary_resource.type == 'pdf'){
                    slide.is_image = true;
                    let thumbnail = slide.primary_resource.thumbnail
                    slide.src = thumbnail || `${document.cdn_url}/static/images/pdf-thumb.png`;
                }else if(slide.primary_resource.type == 'video' && slide.secondary_resource){
                    slide.is_image = true;
                    slide.src = slide.secondary_resource.path;
                }else if(slide.primary_resource.type == '360'){
                    slide.is_image = true;
                    slide.src =  `${slide.primary_resource.path}/1.jpg`;
                }else if(slide.primary_resource.type == 'link'){
                    slide.is_image = true;
                    if(slide.primary_resource.meta_data.icon){
                        slide.src = slide.primary_resource.meta_data.icon;
                    }else{
                        slide.src = `${document.cdn_url}${Common.DEFAULT_EXTERNAL_LINK_ICON}`;
                    }   
                }else if(['embed', 'wistia'].includes(slide.primary_resource.type) && slide.primary_resource.thumbnail){
                    slide.is_image = true;
                    slide.src = slide.primary_resource.thumbnail;
                }else if(slide.secondary_resource){
                    slide.is_image = true;
                    slide.src = slide.secondary_resource.path;
                } else if(slide.primary_resource.type == 'sandbox'){
                    slide.is_image = true;
                    var sandbox = root.current_view.slide_views[idx].sandbox;
                    if(sandbox.has_images){
                        slide.src = root.current_view.slide_views[idx].getSanboxPath(slide.primary_resource.meta_data.path, sandbox.has_images.index, 'image');
                    }else{
                        slide.src = `${document.cdn_url}${Common.DEFAULT_VIDEO_POSTER}`;
                    }
                } else if(slide.primary_resource.type == "file"){
                    slide.is_image = true;
                    slide.src = `${document.cdn_url + root.DEFAULT_FILE_ICON}`;
                    if(slide.primary_resource.meta_data && slide.primary_resource.meta_data.thumbnail_url){
                        slide.src = slide.primary_resource.meta_data.thumbnail_url;
                    }
                }
            })
            this.$('.slides_wraper').remove();
            this.$('#player-container .player_wrap').append(this.filmStrip({'slides': slides}));

            // Add custom scroll
            this.$('.slides_wraper .slides_box').mCustomScrollbar();
            this.$('.mCustomScrollBox').attr('tabindex', '-1')
            var root = this;
            // Make sortable
            this.$(".slides_wraper .slides_box .slides_container").sortable({
                items: ".slide",
                containment: "parent",
                axis: "x",
                cursor: "move",
                tolerance: "intersect",
                change:function(e, ui){
                    var w = ui.helper.outerWidth(true),
                        elem = $(".mCustomScrollBox"),
                        elemWidth = elem.width(),
                        moveBy = root.$(".slides_container .slide").outerWidth(true) * 3,
                        mouseCoordsX = e.pageX - elem.offset().left;
                    if(mouseCoordsX < w){
                        root.$(".slides_box").mCustomScrollbar("scrollTo", "+=" + moveBy);
                    }else if(mouseCoordsX > (elemWidth - w)){
                        root.$(".slides_box").mCustomScrollbar("scrollTo", "-=" + moveBy);
                    }
                },
                update : function(event, ui) {
                    var cur_order = ui.item.attr('order');
                    var prev_order = ui.item.prev().attr('order');

                    var slide_details = {};
                    slide_details = {
                        'reorder': 'slide',
                        'target': cur_order,
                        'after': prev_order,
                    }

                    root.walkthrough.save(slide_details, {
                        patch: true,
                        success: function(){
                            root.current_view.$el.html('');
                            root.current_view.load(root.current_view.product_id, root.current_view.section_id, root.current_view.walkthrough_id, Common.CURRENT_SLIDE)
                        }, error: function(xhr, status_code, message){
                            root.$(".slides_wrap .slides_box .slides_container").sortable("cancel");
                        }
                    })
                }
            });
        },

        filmstripSlideNavigation: function(event){
            Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, parseInt(this.$(event.currentTarget).attr('order')));
        },

        toggleSlideRearrange: function(){
            this.$('.slides_wraper').toggleClass('active');
            this.$('.slides_wraper').hasClass('active') ? this.$(".create-new.slide").fadeOut() : this.$(".create-new.slide").fadeIn();
        },

        createEditNotes: function(event){
            var isEdit = this.$(event.currentTarget).hasClass('edit-notes');
            this.$('#create-edit-notes')
                .html(this.notesForm({'isEdit': isEdit,
                                      'notesLinkTitleLimit': this.NOTES_LINK_TITLE_LIMIT}));
            if(this.$(event.currentTarget).attr('data-page') == "new"){
                // If its a new note pop-up, then data-page is length of the 'li' elements,
                // so that it'll have the latest/new number value.
                var lastActive = $('.pagination li.active').attr('data-page');
                this.$('.pagination li').removeClass('active');
                // When the 'author' cancels the action, focus the notes page on last-active page.
                this.$(event.currentTarget)
                .attr('data-page', this.$('.pagination ul li').length)
                .attr('last-active', lastActive)
                .addClass('active');
            }else if(!isEdit && document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();
            if(isEdit){
                var pageNumber = this.$('.pagination li.active').attr('data-page');
                this.prefillNotesEdit(this.currentSlide().notes, pageNumber);
            }
            this.popupShow("create-edit-notes");
            this.overlayCalc();
            this.$('.popup-box .content-block').niceScroll();
        },

        prefillNotesEdit: function(notes, pageNumber){
            this.$('.notes-edit-block .notes-title').html(notes[pageNumber].title)
            this.$('.notes-edit-block .notes-body').html(notes[pageNumber].body);
            if(notes[pageNumber].link){
                this.$('#advanced-notes-content .notes-link-title').val(notes[pageNumber].link.title);
                this.$('#advanced-notes-content .notes-link-title')
                    .siblings()
                    .find('span[data-counter]')
                    .text(this.NOTES_LINK_TITLE_LIMIT - (notes[pageNumber].link.title || "").length);
                if(notes[pageNumber].link.type == 'INTERNAL'){
                    this.$('#advanced-notes-content .upload-resource').addClass('image-added');
                    this.$('#upload-file-preview').attr('src', '/static/media/' + notes[pageNumber].link.resource);
                }else{
                    this.$('#advanced-notes-content .notes-url-link').val(notes[pageNumber].link.resource);
                    this.$('.notes-link-url').parents('.block').addClass('add-resource-url');
                }
            }

        },

        getNotesFormData: function(){
            var notesData = new FormData();
            notesData.append('walkthrough_id', this.walkthrough_id);
            notesData.append('slide_order', Common.CURRENT_SLIDE);
            notesData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
            return notesData;
        },

        saveSlideNotes: function(event){
            event.preventDefault();
            var validation = true;
            this.$('.create-edit-notes .error-message').text('').removeClass('active');
            var slideType = this.$("#slider" + Common.CURRENT_SLIDE).attr('slide-type');
            var notesBody = this.$('.notes-edit-block .notes-body').html().trim();
            var notesData = this.getNotesFormData();
            notesData.append('notes', true);
            var root = this;
            this.actionInProgress('create-edit-notes');
            if (slideType == 'sandbox'){
                notesData.append('is_sandbox', true);
                notesData.append('body', notesBody);
                notesData.append('frame_number', $('.sandbox-frame.active').children('div').attr('data-current-frame'));
            }else{
                var pageNumber = this.$('.pagination li.active').attr('data-page') || '1';
                var notesTitle = this.$('.notes-edit-block .notes-title').html().trim();
                var notesLinkTitle = this.$('#advanced-notes-content .notes-link-title').val();

                var notesLinkResource = this.$('#upload-notes-link-file')[0].files[0];
                var notesLinkImg = $('#upload-file-preview').attr('src');
                var notesLinkUrl = this.$('#advanced-notes-content .notes-url-link').val();
                var notesLinkMediaType;

                if(notesLinkResource){
                    notesLinkMediaType = 'INTERNAL';
                    notesData.append('resource', notesLinkResource);

                }else if(notesLinkImg) {
                    notesLinkMediaType = 'INTERNAL';
                    notesData.append('link_image_url', notesLinkImg.split('/static/media/')[1]);

                }else if(notesLinkUrl){
                    notesLinkMediaType = 'EXTERNAL';
                    var videoDetails = Common.getEmbedVideoDetails(notesLinkUrl);
                    if (videoDetails) {
                        notesData.append('link_url', videoDetails.src);
                        root.$('.create-edit-notes .error-message').text('').removeClass('active');
                    } else {
                        root.actionFailed('create-edit-notes'); 
                        root.$('.create-edit-notes .error-message.notes-url').text(Translate("please enter a valid video url")).addClass('active');
                        validation = false;
                    }

                } 
                if((notesLinkImg || notesLinkUrl) && !notesLinkTitle){
                    root.$('.create-edit-notes .error-message.notes-url-title').text(Translate("please enter link title")).addClass('active');
                    validation = false;
                } else if(notesLinkTitle){
                    if (!(notesLinkImg || notesLinkUrl)) {
                        root.$('.create-edit-notes .error-message.notes-url-resource').text(Translate("please enter resource")).addClass('active');
                        validation = false;
                    }
                }

                notesData.append('page_number', pageNumber);
                notesData.append('title', notesTitle);
                notesData.append('body', notesBody);
                notesData.append('link_title', notesLinkTitle);
                notesData.append('link_type', notesLinkMediaType);
            }
            var slide = new Slide({id: Common.CURRENT_SLIDE});
            if(!validation) {
                root.actionFailed('create-edit-notes'); 
               return;
            }
            slide.save(notesData,{
                processData: false,
                cache: false,
                contentType: false,
                patch: true,
                data: notesData,
                success: function(response, model){
                    root.updateSlideNotesView(model.notes, pageNumber);
                    root.actionSuccess('create-edit-notes');
                },
                error: function(xhr, response){
                    root.actionFailed('create-edit-notes');
                }
            });
        },

        setNotesEditOptions: function(e){
            var currentSlide = this.$("#slider" + Common.CURRENT_SLIDE);
            var slideType = currentSlide.attr('slide-type');
            if(this.$('.notes').hasClass('no-notes')){
                this.$('.notes').addClass('add-notes');
            }else{
                this.$('.pagination li[data-page="new"]').show();
                this.$('.pagination, .page-prev, .page-next').show();
            }

            if(slideType == "sandbox"){
                this.$('.notes').removeClass('add-notes no-notes');  
                this.$('.notes-edit-options').hide();
            } else {
                this.$('.notes-edit-options').show();
            }
            if (this.walkthrough && !this.walkthrough.get('can_edit'))
                this.$('.pagination li[data-page="new"]').hide();
            jcf.replaceAll();
        },

        updateSlideNotesView: function(slideNotes, pageNumber){
            this.currentSlide().notes = slideNotes;
            if(!slideNotes){
                // If all the notes are deleted, then 'slideNotes' will be empty.
                this.currentSlideView().setSlideNotes();
            }else{
                this.$('.pagination li[data-page="new"]').show();
                this.currentSlideView().updateSlideNotes(slideNotes, pageNumber);
            }
            this.$('.pagination li[data-page]').removeAttr('last-active');
            this.setNotesEditOptions();
        },

        showNotesDeletePopup: function(event){
            var pageNumber = this.$('.pagination ul li.active').attr('data-page');
            this.$('.popup-delete-notes').attr('data-page', pageNumber);
            this.popupShow("popup-delete-notes");
        },

        deleteNotes: function(event){
            this.actionInProgress('popup-delete-notes');
            var slide = new Slide({id: Common.CURRENT_SLIDE});
            var root = this;
            var notesData = this.getNotesFormData();
            notesData.append('delete', true);
            notesData.append('page_number', this.$('.popup-delete-notes').attr('data-page'));
            slide.save(notesData,{
                processData: false,
                cache: false,
                contentType: false,
                patch: true,
                data: notesData,
                success: function(response, model){
                    root.updateSlideNotesView(model.notes);
                    root.actionSuccess('popup-delete-notes');
                },
                error: function(xhr, response){
                    root.actionFailed('popup-delete-notes');
                }
            })
        },

        togglePinEdit: function(event){
            if(this.$(event.currentTarget).hasClass('disabled')) return;
            var root = this;
            this.disableHotspotEdit();

            //check is current slide is image/360
            var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE-1];
            if(this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length || !this.canAnnotate(cur_slide_view.slide)){
                return this.$('#player-container').removeClass('drop-pin-active');
            }

            if(document.defaultLocaleID !== SDCookies.getItem('author_locale')){
                return this.switchLanguageWarning();
            }

            this.$('#player-container').toggleClass('drop-pin-active');
            var cur_slide = this.currentSlide();
            var currentSlide = this.$("#slider" + cur_slide.order);
            var slideType = currentSlide.attr('slide-type');

            if (slideType=='image') {
                if (this.$('#player-container').hasClass('drop-pin-active')) {
                    currentSlide.addClass('pin-cursor');
                    _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function(elem, index){
                        root.initDragPin(elem, currentSlide);
                    });
                } else {
                    currentSlide.removeClass('pin-cursor');
                     _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function(elem, index){
                        root.removeDragPin(elem);
                    });
                }
            } else {
                  if (this.$('#player-container').hasClass('drop-pin-active')) {
                    this.$(currentSlide).find('.product-frame').addClass('pin-cursor');
                    _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function(elem, index){
                        root.initDragPin(elem, currentSlide);
                    });
                } else {
                    this.$("#slider"+cur_slide.order+" .product-frame" ).removeClass('pin-cursor');
                    _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function(elem, index){
                        root.removeDragPin(elem);
                    });
                }
            };
        },

        locatePin: function(event){
            if (!$(event.target).hasClass("slide_image")) {
                return;
            };
            var cur_slide = this.currentSlide();
            var frame_width = this.$(event.currentTarget).width();
            var frame_height = this.$(event.currentTarget).height();

            var left =  ((event.offsetX / frame_width) * 100).toFixed(2) + '%';
            var top =  ((event.offsetY / frame_height) * 100).toFixed(2) + '%';
            var frameNum = this.$(event.currentTarget).attr('data-frame') || null;
            var slide = new Slide({
                id: Common.CURRENT_SLIDE,
                walkthrough_id: this.walkthrough_id,
                entity: {
                    type: 'pin',
                    event: 'create',
                    value: {
                        top: top,
                        left: left,
                        frame_number: frameNum
                    }
                }
            });

            var root = this;
            slide.save(null, {
                patch: true,
                success: function(model, response){
                    var latest_pin = _.last(response.pins);
                    root.current_view.slide_views[Common.CURRENT_SLIDE-1].slide.pins.push(latest_pin);
                    var attrs = {
                        position: '',
                        left: latest_pin.display.left,
                        top: latest_pin.display.top,
                        frameNum: latest_pin.display.frame_number,
                    }
                    attrs.order = (response.primary_resource.type == '360') ? '+': latest_pin.order;
                    attrs.title = (latest_pin.callout && latest_pin.callout.title) || root.PLACEHOLDER_TEXT,
                    attrs.body = (latest_pin.callout && latest_pin.callout.body) || root.PLACEHOLDER_TEXT
                    if(latest_pin.id) attrs.id = latest_pin.id;
                    var dropPoint = Pin(attrs);
                    root.$(event.currentTarget).append(dropPoint).removeClass('pin-cursor');
                    root.$('.drop_pin[pin-id=' + latest_pin.id + '] .pin-tooltip').append("<div class='pin-delete'>delete</div>");
                    root.loadPinContent();
                    root.disablePinEdit();
                }
            });
        },

        updatePinNotes: function(event){
            var text = this.$(event.currentTarget).text().trim();
            var text_type = this.$(event.currentTarget).attr('target');
            var pin_id = this.$(event.currentTarget).parents('.drop_pin').attr('pin-id');
            var cur_slide =  this.currentSlide();
            var pin = _.find(cur_slide.pins, function(p){
                return p.id == pin_id;
            });

            if(pin && (!pin.callout && text) || (pin.callout && text != (pin.callout[text_type] || ""))){
                var slide = new Slide({
                    id: Common.CURRENT_SLIDE,
                    walkthrough_id: this.walkthrough_id,
                    entity: {
                        'type': 'pin',
                        'event': 'pin-' + text_type,
                        'value': text,
                        'entity_id': pin_id
                    }
                });

                slide.save(null, {
                    patch: true,
                    success: function(model, response){
                        var pin = _.find(cur_slide.pins, function(p){
                            return p.id == pin_id;
                        });
                        if(!pin.callout){
                            pin.callout = {};
                        }
                        pin.callout[text_type] = text;
                    }
                })
            }

            this.editContentFocusOut(event);
        },

        deletePin: function(event){
            var slide = new Slide({
                id: Common.CURRENT_SLIDE,
                walkthrough_id: this.walkthrough_id,
                entity: {
                    'type': 'pin',
                    'event': 'delete',
                    'entity_id': this.$(event.currentTarget).parents('.drop_pin').attr('pin-id')
                }
            });

            var root = this;
            slide.save(null, {
                patch: true,
                success: function(model, response){
                    root.$(event.currentTarget).parents('.drop_pin').remove();
                    response.tenant = root.current_view.tenant;
                    root.current_view.slide_views[Common.CURRENT_SLIDE - 1].slide = response;
                    root.current_view.slide_views[Common.CURRENT_SLIDE - 1].asset_load_status = false;
                    root.current_view.slide_views[Common.CURRENT_SLIDE - 1].render();
                    root.current_view.slide_views[Common.CURRENT_SLIDE - 1].loadAsset();
                    root.$('#slider' + Common.CURRENT_SLIDE + ' .drop_pin  .pin-tooltip').append("<div class='pin-delete'>delete</div>");
                    if (root.$('#player-container').hasClass('drop-pin-active')) {
                        root.$('#slider' + Common.CURRENT_SLIDE).addClass('pin-cursor');
                        _.each(root.$("#slider" + Common.CURRENT_SLIDE + ' .drop_pin'), function(elem, index){
                            root.initDragPin(elem, root.$('#slider' + Common.CURRENT_SLIDE));
                        });
                    } else {
                        root.$('#slider' + Common.CURRENT_SLIDE).removeClass('pin-cursor');
                         _.each(root.$("#slider" + Common.CURRENT_SLIDE + ' .drop_pin'), function(elem, index){
                            root.removeDragPin(elem);
                        });
                    }
                    // Current slide view
                    var cur_sl_view = root.currentSlideView()
                    root.addHotspotEditOptions(cur_sl_view);
                    Backbone.trigger("slide_changed");
                }
            });
        },

        initDragPin: function(pin, current_slide){
            if(!this.$(pin).data("uiDraggable")){
                var root = this;
                this.$(pin).draggable({
                    handle: ".pin-opener",
                    containment: 'parent',
                    stop: function( event, ui) {
                        root.relocatePin(event, function(){
                            ui.helper.css(ui.originalPosition);
                        });
                        if(ui.helper.hasClass('pin-active')){
                            // passing pin and current slide as parameter
                            Common.positionPinTooltip(this.firstElementChild, $(this).parent());
                        }
                    }
                });
            }
        },

        removeDragPin: function(pin){
            if($(pin).data("uiDraggable")){
                $(pin).draggable("destroy");
            }
        },

        relocatePin: function(event, error_callback){
            var cur_slide = this.currentSlide();
            var slideType = cur_slide.primary_resource.type;
            if (slideType != 'image' &&  slideType != '360') {
                error_callback && error_callback()
                return;
            };
            if (slideType == "360") {
                var frame_width = this.$(event.target).parent().width();
                var frame_height = this.$(event.target).parent().height();
                var frameNum = this.$(event.target).parent().attr('data-frame');
            } else {
                var frame_width = this.$("#slider" + cur_slide.order).width();
                var frame_height = this.$("#slider" + cur_slide.order + ' .slide_image').height();
                var frameNum = null;
            };
            var left =  ((event.target.offsetLeft / frame_width) * 100).toFixed(2) + '%';
            var top =  ((event.target.offsetTop / frame_height) * 100).toFixed(2) + '%';
            var pin_id = parseInt(this.$(event.target).attr('pin-id'));
            var slide = new Slide({
                id: Common.CURRENT_SLIDE,
                walkthrough_id: this.walkthrough_id,
                entity: {
                    type: 'pin',
                    event: 'relocate',
                    entity_id: pin_id,
                    value: {
                        top: top,
                        left: left,
                        frame_number: frameNum
                    }
                }
            });

            var root = this;
            slide.save(null, {
                patch: true,
                error: function(){
                    error_callback && error_callback();
                }
            });
        },

        showDeleteSlidePopup: function(){
            if(this.$('.delete-slide').hasClass('disabled')) return;
            if(this.currentViewHasSlides() && Common.CURRENT_SLIDE <= this.current_view.slide_views.length){
                this.popupShow("popup-delete-media")
            }
        },

        deleteSlide: function(){
            if(this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length) return;

            this.actionInProgress('popup-delete-media');
            var root = this;

            this.walkthrough.save({
                'delete_slide': Common.CURRENT_SLIDE,
            }, {
                patch: true,
                success: function(response){
                    root.walkthrough.unset('delete_slide', { silent: true })
                    root.actionSuccess('popup-delete-media', function(){
                        var curSlideOrder = Common.CURRENT_SLIDE;
                        if(root.walkthrough && root.walkthrough.get('slides')){
                            if(Common.CURRENT_SLIDE > root.walkthrough.get('slides').length){
                                curSlideOrder = root.walkthrough.get('slides').length;
                            }
                        }
                        root.current_view.$el.html('');
                        root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
                    });
                }, error: function(response, xhr){
                    root.actionFailed('popup-delete-media');
                }
            });
        },

        canAnnotate: function(slide){
            if(!slide){
                slide = this.currentSlide();
            }
            if(!slide.primary_resource || !(slide.primary_resource.type == '360' || slide.primary_resource.type == 'image')){
                return false;
            }
            return true;
        },
        //End of Create/Edit demo player


        //General functions (functon may used for section and player both)
        overlayCalc: function(){
            var windowHeight = $(window).height() - 200;
            this.$('.popup-box .content-block').css({"max-height": windowHeight});
        },

        hidePopup: function(event){
            if($(event.currentTarget).hasClass('disabled')) return;
            var popupName = $(event.currentTarget).attr('rel');
            var formType = $(event.currentTarget).closest('form').attr('form-type');
            if(popupName){
                this.popupClose(popupName);
                // If the popup is a notes add popup, then reset the data-page attrib to 'new'.
                if (popupName == 'create-edit-notes' && formType == 'add'){
                    this.$('.pagination li').removeClass('active');
                    var newNoteLi = this.$('.pagination ul li[data-page="' + this.$('.pagination ul li').length + '"]');
                    var lastActive = newNoteLi.attr('last-active');
                    newNoteLi.attr('data-page', "new");
                    this.$('.pagination li[data-page]').removeAttr('last-active');
                    this.$('.pagination ul li[data-page="' + lastActive + '"]').addClass('active');                    
                }

            }
            if($(event.target).hasClass("reload")) {
                this.current_view.load(this.section_id, true);
                this.$('#edit-popups').html(this.template());
            }
        },

        popupShow: function(popupName){
            Common.KEY_NAVIGATION = false;
            this.$(".edit-overlay").css({
                "display": "table"
            });
            this.$(".edit-overlay .popup-box." + popupName).show();
            this.$(".edit-overlay .popup-box." + popupName).addClass("bounceInDown");
             setTimeout(() => {
                this.$(".edit-overlay .popup-box." + popupName).removeClass("bounceInDown");
            }, 300);
        },

        popupClose: function(popupName, showOverlay){
            this.$(".edit-overlay ." + popupName).addClass("bounceOutUp");
            setTimeout(() => {
                this.$(".edit-overlay .popup-box." + popupName).hide();
                this.$(".edit-overlay .popup-box." + popupName).removeClass("bounceOutUp");
                if(!showOverlay) {
                    this.$(".edit-overlay").hide();
                }
            }, 300);
            Common.KEY_NAVIGATION = true;
        },

        customErrorMessage: function(message, target, elem){
            this.removeCustomErrorMessage();
            var editToolTip = '<div class="edit-tool-tip error-msg cta">' + message + '</div>';
            target.append(editToolTip);
            if(elem) elem.focus();
        },

        removeCustomErrorMessage(){
            this.$('.edit-tool-tip').remove();
        },

        actionSuccess: function(target, post_success, retain_popup){
            this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
            this.$('.' + target + ' .form-sent').addClass("slide-in");

            var root = this;
            setTimeout(function(){
                root.$('.' + target + ' .form-sent').removeClass("slide-in");
                if(!retain_popup) root.popupClose(target);
                if(post_success){
                    post_success();
                }
            }, 1000);
        },

        actionInProgress: function(target){
            this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
        },

        actionFailed: function(target, message){
            var root = this;
            setTimeout(function(){
                this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
                let targetElement = this.$('.' + target + ' .form-failed');
                if (message)
                    targetElement.html(Translate(message)).addClass("slide-in");
                else
                    targetElement.addClass("slide-in");
                setTimeout(function(){
                    root.$('.' + target + ' .form-failed').removeClass("slide-in");
                }, 1000);
            }, 1000);
        },

        updateCharCount: function(event){
            var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));
            if (this.$(event.currentTarget).val().length <= maxChar) {
                var leftChar = maxChar - this.$(event.currentTarget).val().length;
                this.$(event.currentTarget).parents('.block').find('span[data-counter]').text(leftChar);
            }
        },

        exitEdit: function(){
            window.location.replace('/dashboard/library');
        },

        confirmPublish: function(event){
            if($(event.currentTarget).hasClass('disable')) return;
            this.popupShow('confirm-publish-demo');
        },

        publishChapter: function(){
            this.actionInProgress('confirm-publish-demo');
            if(this.walkthrough){
                var root = this;
                this.walkthrough.save({
                    publish: true
                }, {
                    patch: true,
                    wait: true,
                    success: function(response){
                        root.walkthrough.unset('publish', {silent: true})
                        root.actionSuccess('confirm-publish-demo', function(){
                            root.clearChaptersList();
                            if (root.product_id == root.section_id) {
                                // reset common.product_details to fetch updated playlists
                                Common.product_details = null;
                                Backbone.history.navigate('#!/' + root.product_id, {trigger: true});
                            } else {
                                Backbone.history.navigate('#!/' + root.product_id + '/' + root.section_id, {trigger: true});
                            }
                        });
                    },
                    error: function(response, xhr){
                        root.actionFailed('confirm-publish-demo');
                    }
                });
            } else this.publishMultipleChapter();
        }, 

        publishMultipleChapter: function(){
            var root = this;
            var chapterList = [];
            _.each(this.$('.multiChapter-selection-active li.chapter-selected'),
                   (element) =>  chapterList.push($(element).attr("slug"))
            );
            var walkthrough = new Walkthrough({id:'', chapterList: chapterList, publish: true})
            walkthrough.save(null,{
                patch: true,
                success:function(response){
                    root.clearChaptersList();
                    let failedChapters = response.attributes.failed_chapters
                    if(failedChapters.length > 0) {
                        _.each(root.$('.multiChapter-selection-active li.chapter-selected'), function(element){
                            if(failedChapters.indexOf($(element).attr("slug")) == -1){
                                $(element).removeClass("chapter-selected");
                            }
                        });
                        root.addRetryOption('confirm-publish-demo', failedChapters.length, chapterList.length, 'publish')
                    }
                    else {
                        root.actionSuccess('confirm-publish-demo', () =>
                            root.current_view.load(root.section_id, true)
                        );
                    }
                },
                error: function(response, xhr){
                    root.actionFailed('confirm-publish-demo');
                }
            });
        },

        addRetryOption: function(target, failedChaptersLength, totalChaptersLength, method){
            this.actionFailed(target);
            this.$(`.${target} .to-do-action`).text(Translate("retry"));
            this.$(`.${target} .form-footer .cancel`).addClass("reload");
            this.$(`.${target} .popup-info.sub-title`).text(`${failedChaptersLength} 
                                    ${Translate("out of")} ${totalChaptersLength}
                                    ${Translate(`chapter(s) failed, please click retry to ${method} failed chapter(s) again`)}`);
        },

        showDeleteMultipleItemsPopup: function(event){
            if($(event.currentTarget).hasClass('disable')) return;
            if($('.playlist-block').hasClass('playlist-selected'))
            {
                this.popupShow('popup-delete-multiple-playlists');
            }
            else
            {
                this.popupShow('popup-delete-multiple-chapters');
            }
        },

        confirmDeleteMultipleChapters: function(event) {
            this.actionInProgress('popup-delete-multiple-chapters');
            var root = this;
            var chaptersList = [];
            _.each(this.$('.multiChapter-selection-active li.chapter-selected'),
                   (element) =>  chaptersList.push($(element).attr("slug"))
            );
            var walkthrough = new Walkthrough({id: ''});
            walkthrough.destroy({
                wait: true,
                data: JSON.stringify({chaptersList:chaptersList}),
                processData: true,
                contentType: 'application/json',
                success:function(model, response){
                    root.clearChaptersList();
                    let failedChapters = response.failed_chapters
                    if(failedChapters.length > 0) {
                        _.each(root.$('.multiChapter-selection-active li.chapter-selected'), function(element){
                            if(failedChapters.indexOf($(element).attr("slug")) == -1){
                                $(element).removeClass("chapter-selected");
                            }
                        });
                        root.addRetryOption('popup-delete-multiple-chapters', failedChapters.length, chaptersList.length, 'delete')
                    }
                    else {
                        root.actionSuccess('popup-delete-multiple-chapters', () =>
                            root.current_view.load(root.section_id, true)
                        );
                    }
                },
                error: function(response, xhr){
                    root.actionFailed('popup-delete-multiple-chapters');
                }
            });
        },

        confirmDeleteMultiplePlaylists: function(event) {
            this.actionInProgress('popup-delete-multiple-playlists');
            var root = this;
            var playlistsList = [];
            _.each(this.$('.multiPlaylist-selection-active.playlist-selected .playlist-left'),
                   (element) =>  playlistsList.push(Number($(element).attr("playlist_id")))
            );  
            var playlist = new Playlist({id: ''});
            playlist.destroy({
                wait: true,
                data: JSON.stringify({playlist_ids:playlistsList}),
                processData: true,
                contentType: 'application/json',
                success:function(model, response){
                    let failedPlaylists = response.failed_playlists
                    if(failedPlaylists && failedPlaylists.length > 0) {
                        _.each(root.$('.multiPlaylist-selection-active.playlist-selected'), function(element){
                            if(failedPlaylists.indexOf($(element).attr("playlist_id")) == -1){
                                $(element).removeClass("playlist-selected");
                            }
                        });
                        root.addRetryOption('popup-delete-multiple-playlists', failedPlaylists.length, playlistsList.length, 'delete')
                    }
                    else {
                        root.actionSuccess('popup-delete-multiple-playlists', () =>
                            root.current_view.load(root.section_id, true)
                        );
                    }
                },
                error: function(response, xhr){
                    root.actionFailed('popup-delete-multiple-playlists');
                }
            });
        },

        previewDemo: function(event){
            if($(event.currentTarget).hasClass('disable')) return;
            window.open(window.location.href.replace('edit', 'preview'),'_blank')
        },

        rgb2hex: function(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        },

        hasChildren: function(section){
            if(section && section.get('children') && section.get('children').length){
                return true;
            }
            return false;
        },

        hasPlaylists: function(section){
            if(section && section.get('playlists') && section.get('playlists').length){
                return true;
            }
            return false;
        },

        currentViewHasSlides: function(){
            if(this.current_view && this.current_view.slide_views && this.current_view.slide_views.length){
                return true;
            }
            return false;
        },

        /* Box data */
        getBoxData: function(event){
            if(this.$(event.currentTarget).hasClass('disabled')) return;
            var root = this; 
            var appendTo = 'box-content-list';
            this.$('#' + appendTo).empty();
            this.$('#' + appendTo).niceScroll();
            var box_api = new BoxApi();
            box_api.fetch({
                success:function(resp){
                    if($('#layout_selection_block').hasClass('active')) {
                        root.hideCreateLayout('box-category-option');
                    } else {
                        root.popupClose('box-category-option', true);
                    }
                    setTimeout(function() {
                        root.popupShow('box-content-block');
                        root.buildBoxListData(resp.attributes[0], appendTo, 'folders', 0, 'parent');
                        // check if its a playlist page
                        if(root.hasPlaylists(root.section)) root.enableFilesDisableFolder();
                    }, 400);                    
                }, error: function(model, response){
                    if(response.status == 302 && response.responseJSON.redirect_url){
                        window.location.href = response.responseJSON.redirect_url;
                    }
                }
            })
        },

        buildBoxListData: function(data, appendTo, listType, leftSpace, parent) {
            leftSpace += 10;
            var root = this;
            if(data.folders) {
                $.each(data.folders, function(index, elem) {
                    if(index == 'files' || index == 'folders') {
                        root.buildBoxListData(elem, appendTo, index, leftSpace, parent);
                    } else if(typeof(elem) == 'object') {
                        var list  = '<li class="'+parent+'" data-list-type="'+listType+'" id="'+index+'">';
                            list += '<div class="list-details li_'+parent+'" style="padding-left:'+leftSpace+'px">';
                            list += '<div class="expandSection"><span class="expandIcon"></span></div>';
                            list += '<span class="list-title">'+elem.name+'</span>';
                            list += '<input type="checkbox" id="li-'+index+'" class="css-checkbox" data-value="'+index+'" name="'+listType+'">';
                            list += '<label for="li-'+index+'" class="css-label"></label>';
                            list += '</div>';
                            list += '</li>';
                        $('#'+appendTo).append(list);
                        root.buildBoxListData(elem, index, listType, leftSpace, 'child');
                    }
                });
            } 
            if(data.files) {
                $.each(data.files, function(index, elem) {
                    if(index == 'files') {
                        root.buildBoxListData(elem, appendTo, index, leftSpace, parent);
                    } else if(typeof(elem) == 'object') {
                        var list  = '<li class="'+parent+'" data-list-type="files" id="'+index+'">';
                            list += '<div class="list-details li_'+parent+'" style="padding-left:'+leftSpace+'px">';
                            list += '<div class="expandSection"><span class="expandIcon"></span></div>';
                            list += '<span class="list-title">'+elem.name+'</span>';
                            list += '<input type="checkbox" id="li-'+index+'" class="css-checkbox" data-value="'+index+'" name="files">';
                            list += '<label for="li-'+index+'" class="css-label"></label>';
                            list += '</div>';
                            list += '</li>';
                        $('#'+appendTo).append(list);
                        root.buildBoxListData(elem, index, 'files', leftSpace, 'child');
                    }
                });
            }
        },

        saveBoxEntries: function(event){
            event.preventDefault();
            this.actionInProgress('box-content-block');
            var content = {
                'folders': [],
                'files': [],
                'parent': this.section_id
            }
            _.each(this.$('input[type=checkbox][name=folders]:checked:not(:disabled)'), function(folder){
                content.folders.push($(folder).attr('data-value'));
            });

            _.each(this.$('input[type=checkbox][name=files]:checked:not(:disabled)'), function(file){
                content.files.push($(file).attr('data-value'));
            });

            var box_api = new BoxApi()
            var root = this;
            box_api.save(content, {
                success: function(){
                    root.actionSuccess('box-content-block', function(){
                        if(root.section_id){
                            root.current_view.load(root.section_id, true);
                        }else{
                            root.current_view = new HomeView();
                        }
                    });
                }, error: function(){
                    root.actionFailed('box-content-block');
                }
            })
        },

        duplicateSection: function(event){
            var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
            if(element.hasClass('disabled') || element.hasClass('uneditable')) return false;

            var source_slug = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
            var section = new Section({
                id: source_slug,
                copy: true,
                parent: this.section_id
            });

            $('.grey_layout_bg').addClass('active').append($('<span>',{id:'loading_icon'}));
            var root = this;
            section.save(null, {
                patch: true,
                success:function(response){
                    if(root.section_id){
                        root.current_view.load(root.section_id, true);
                    }else{
                        root.current_view = new HomeView();
                    }
                },
                error:function(xhr, status_code, error_message){
                    console.log('error', status_code, error_message)
                },
                complete: function() {
                    $('.grey_layout_bg').removeClass('active').empty();
                }
            });
        },
        
        duplicateChapter: function(event){
            var element = this.$(event.currentTarget).parents('li');
            if(element.hasClass('uneditable')) return false;

            var walkthrough_slug = element.attr('slug');
            var walkthrough = new Walkthrough({
                id: walkthrough_slug,
                copy:true
            });

           $('.grey_layout_bg').addClass('active').append($('<span>',{id:'loading_icon'}));
            var root = this;
            walkthrough.save(null, {
                patch: true,
                success:function(response){
                    if(root.section_id){
                        root.current_view.load(root.section_id, true);
                    }else{
                        root.current_view = new HomeView();
                    }
                },
                error:function(xhr, status_code, error_message){
                    console.log('error', status_code, error_message)
                },
                complete: function() {
                    $('.grey_layout_bg').removeClass('active').empty();
                }
            });
            
        },

        addRemoveSelection: function(event) {
            var elem = this.$(event.currentTarget);
            var childElem = elem.closest('li').find('li .css-checkbox');
            var chilListElem = elem.closest('li').find('li .list-details');
            
            if(elem.is(':checked')) {
                childElem.prop('checked', true);
                childElem.attr('disabled', true);
                elem.parent('.list-details').addClass('selected');
                chilListElem.removeClass('selected')
            } else {
                childElem.prop('checked', false);
                childElem.attr('disabled', false);
                elem.parent('.list-details').removeClass('selected');
                chilListElem.removeClass('selected');
            }   
            if(this.$('#box-content-list input[type=checkbox]:checked').length){
                this.$('.box-content-block .import-box-data').removeAttr('disabled');
            }else{
                this.$('.box-content-block .import-box-data').attr('disabled', true);
            }
        },

        enableFilesDisableFolder: function() {
            $('#box-content-list .css-checkbox').attr('disabled', true);
            $('#box-content-list input[name=files]').attr('disabled', false);
            $('#box-content-list .child').each(function() {
                if($(this).attr('data-list-type') == 'files') {
                    if($(this).siblings('li').attr('data-list-type') !== 'folders') {
                        $(this).prev('.list-details').find('.css-checkbox').attr('disabled', false);
                    }
                }
            });
        },

        scrollToAdvancedOptions: function(e) {
            this.$(e.currentTarget).toggleClass('advance-visible');
            var root = this;
            setTimeout(function(){
                root.$('form[name=default-section-data] .content-block, .content-block').animate({scrollTop :750},'slow');
                root.$('form[name=asset-section-data] .content-block, .content-block').animate({scrollTop :950},'slow');
            }, 500);
        },

        switchLanguageWarning: function(){
            this.popupShow('create-warning');
            var warningMsg = "Switch to '" + document.defaultLocale + "' language to create a new content !" ;
            this.$('.create-warning .popup-info').text(warningMsg);
        },

        refreshEveryHour: function() {
            setTimeout(function(){
                var timeLeft = 59,
                    cinterval;
                $('#reload-message').fadeIn(200);
                $('#reload-counter').html(timeLeft);
                var timeDec = function (){
                    timeLeft--;
                    $('#reload-counter').html(timeLeft);
                    if(timeLeft === 0){
                        clearInterval(cinterval);
                        return false;
                    }
                };
                cinterval = setInterval(timeDec, 1000);
            }, 1000*60*59);
        },

        /**
         * Select/Deselect Individual chapter for multiple publishing
         */
        selectMultipleChapters: function(e) {
            if(
                this.$(e.currentTarget).parents('.playlist-block').hasClass('disabled') || 
                this.$(e.currentTarget).parents('.playlist-block').hasClass('uneditable') || 
                this.$(e.currentTarget).parents('li').hasClass('no-slides') ||
                this.$('.playlist-block').hasClass('playlist-selected')
            ) return;

            e.stopPropagation();
            this.$(e.currentTarget).parents('li').toggleClass('chapter-selected');
            let totalChaptersSelected = document.getElementsByClassName('chapter-selected').length;
            /**
             * Add/Remove Multi-Chapter Selection option for chapters 
             * Active/deactivate "Publish" button
             */
            if (totalChaptersSelected > 0) {
                $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').removeClass('disable');
                this.$('.pwt-list').addClass('multiChapter-selection-active'); 
            } else {
                $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').addClass('disable');
                this.$('.pwt-list').removeClass('multiChapter-selection-active')
            }
        },

        selectMultiplePlaylists: function(e) {
            e.stopPropagation();
            this.deselectAllChapters(e);
            this.$(e.currentTarget).parents('.playlist-block').toggleClass('playlist-selected');
            let totalPlaylistsSelected = document.getElementsByClassName('playlist-selected').length;
            this.$('.playlist-block.playlist-selected  li').addClass('chapter-selected');
            if (totalPlaylistsSelected > 0) {
                $('.edit-controls .deselect-all-items').addClass('hide');
                $('.edit-controls .select-all-items').removeClass('hide, disable');
                $('.edit-controls .publish').addClass('disable');
                $('.edit-controls .delete-items').removeClass('disable');
                this.$('.playlist-block').addClass('multiPlaylist-selection-active'); 
            } else {
                $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').addClass('disable');
                this.$('.playlist-block').removeClass('multiPlaylist-selection-active');
            }
        },

        // Select all Items
        selectAllItems: function(e) {
            if(this.$('.playlist-block').hasClass('multiPlaylist-selection-active')){
                this.selectAllPlaylists(e);
            }
            else
            {
                this.selectAllChapters(e);
            }
        },

        // Select all Playlists
        selectAllPlaylists: function(e) {
            this.$(e.currentTarget).addClass('hide');
            this.$('.deselect-all-items').removeClass('hide');
            this.$('.delete-items').removeClass('disable');
            this.$('.playlist-block').addClass('playlist-selected');
            this.$('.playlist-block .pwt-list li').addClass('chapter-selected');
        },

        // Select all chapters
        selectAllChapters: function(e) {
            this.$('.playlist-block:not(.disabled, .uneditable) .pwt-list li:not(.no-slides)').addClass('chapter-selected');
            this.$(e.currentTarget).addClass('hide');
            this.$('.deselect-all-items').removeClass('hide');
            this.$('.delete-items').removeClass('disable');
        },

        // Deselect all selected items
        deselectAllItems: function(e) {
            if(this.$('.playlist-block').hasClass('playlist-selected')){
                this.deselectAllPlaylists(e);
            }
            else
            {
                this.deselectAllChapters(e);
            }
        },
        deselectAllPlaylists: function(e) {
            this.$('.playlist-block').removeClass('playlist-selected');
            this.$('.pwt-list li.chapter-selected').removeClass('chapter-selected');
            this.$('.deselect-all-items').addClass('hide');
            this.$('.select-all-items, .delete-items, .edit-controls .publish').addClass('disable');
            this.$('.select-all-items').removeClass('hide');
            this.$('.playlist-block').removeClass('multiPlaylist-selection-active')
        },
        deselectAllChapters: function(e) {
            this.$('.pwt-list li.chapter-selected').removeClass('chapter-selected');
            this.$('.deselect-all-items').addClass('hide');
            this.$('.select-all-items, .delete-items, .edit-controls .publish').addClass('disable');
            this.$('.select-all-items').removeClass('hide');
            this.$('.pwt-list').removeClass('multiChapter-selection-active')
        },

        /**
        * Set the data, value of 'usr-grp-dropdown' w.r.t to groups selected.
        */
        selectUserGroups: function(event){
            this.removeCustomErrorMessage();
            let usrGrpValues = [];
            let usrGrpIds = [];
            let formName = this.$(event.currentTarget).closest('form').attr('name');
            let selectGrpList = this.$(`form[name='${formName}'] .user-group-items:checked`);
            _.each(selectGrpList, (elem) => {
                usrGrpValues.push(this.$(elem).attr('data-attr-name'));
                usrGrpIds.push(this.$(elem).attr('data-attr-id'));
            });
            this.$(`form[name='${formName}'] .usr-grp-dropdown`)
                .val(usrGrpValues)
                .attr('data-selected-groups', usrGrpIds);
        },

        /**
         * Content Document Parser starts here.
         */

        //prevent browser's default behaviour on dragover
        preventDefaultDragover: function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.target.classList.add('upload_box_border');
        },

        // Highlight the dropzone
        deactiveContentDocDropZone: function() {
            event.target.classList.remove('upload_box_border');
        },

        //  Dropped Content document parser
        uploadContentDoc: function(e) {
            event.stopPropagation();
            event.preventDefault();

            const dt = event.dataTransfer;
            const files = dt.files;
          
            this.handleDocFiles(files[0], this.$(event.target).data('type'));
        },

        // Uploaded Content document
        uploadContentFiles: function(event) {
            const files = event.target.files
            this.handleDocFiles(files[0], this.$(event.target).data('type'));
        },

        // Validate docx and dita zip files.
        // validate filesize and format of the uploaded document. 
        validateDocument: function(docFile, docType){
            let status = {
                valid: true,
                msg: ''
            };

            if((docFile.size / 1000000) > Common.DEFAULT_FILE_MAX_SIZE){
                status.valid = false;
                status.msg = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE}MB.`;

            }else if(_.contains(["docx", "dita",], docType)){

                if(docType == 'docx' && (!(/\.(docx)$/i).test(docFile.name))){
                    status.valid = false;
                    status.msg = 'Please upload a valid docx file';

                }else if((docType == 'dita') && !(/\.(zip)$/i).test(docFile.name)){
                    status.valid = false;
                    status.msg = 'Please upload a valid dita zip file';

                }

            }else {
                status.valid = false;
                status.msg = 'Please upload a valid docx/dita zip file.'
            }

            return status;
        },

        // Send a POST request to documnet parser API after validating the uploaded document.
        handleDocFiles: function(docFile, docType) {
            let validationStatus = this.validateDocument(docFile, docType);

            this.$('.document-parser-container, .show-layout-popup popup-back-icon').addClass('hidden');
            this.$('.parser-document-status').removeClass('hidden');

            if(!validationStatus.valid){
                this.showDocError(validationStatus.msg);
                return;

            } else {
                this.$('.parser-document-status .status').removeClass('progress success');
                this.$('.show-layout-popup.popup-back-icon').addClass('hidden');
                this.$('.parser-uploading-doc .status').addClass('progress');
                this.$('.popup-box.upload-docx-documents-block .cancel').addClass('disabled');
                var docData = new FormData();
                docData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
                docData.append('section_slug', this.section_id);
                docData.append('document_type', docType);
                docData.append('document', docFile);

                var root = this;
                var docParser = new DocumentParser();
                docParser.save(docData, {
                    processData: false,
                    cache: false,
                    contentType: false,
                    data: docData,
                    success: (model, response) => {
                        root.$('.upload-docx-documents-block')
                            .attr('filename', response.filename)
                            .attr('status', response.status);
                        root.docParserStatusHandler(5000);
                    },
                    error: (xhr, status, message) => {
                        let msg = 'ERROR';
                        if(status && status.responseJSON)
                            msg = status.responseJSON.message;
                        else if(message)
                            msg = message.textStatus;
                        root.showDocError(msg);
                    }
                });
            }
        },

        showDocError: function(msg, description){
            this.$('.popup-box.upload-docx-documents-block .cancel').removeClass('disabled');
            this.$('.parser-document-status .status').removeClass('progress success');
            this.$('.parser-uploading-doc .status-text').addClass('error');
            this.$('.parser-document-status-error').removeClass('hidden');
            this.$('.parser-document-status-error p').html(msg);
            if(description)
                this.$('.parser-document-status-error .description').html(description);
        },

        /**
        * Call DocParser api every 5 seconds and update status.
        */
        docParserStatusHandler: function(interval){
            if(interval === undefined) interval = 5000;

            setTimeout(() => {
                let docStatus = this.$('.upload-docx-documents-block').attr('status');
                let description = this.$('.upload-docx-documents-block').attr('description');
                let filename = this.$('.upload-docx-documents-block').attr('filename');

                this.$('.popup-box.upload-docx-documents-block .cancel').addClass('disabled');

                // If DocParser is having a 'failed' status then show the error msg.
                if($.inArray(docStatus, document.DOCUMENT_PARSER_FAIL_STATUS) !== -1){
                    this.showDocError(docStatus, description);

                } else if(docStatus != 'IMPORT_COMPLETE'){
                    var root = this;
                    let docParser = new DocumentParser({id: filename}); // pass in a filename.
                    docParser.fetch({
                        success: function(model, response){

                            // If doc importing is successful, then re-load the view.
                            if(response.status == 'IMPORT_COMPLETE'){
                                root.$('.parser-document-status .status')
                                    .removeClass('progress')
                                    .addClass('success');
                                root.$('.parser-document-status .status-inprogress')
                                    .addClass('hidden');
                                root.$('.parser-document-status .status-done')
                                    .removeClass('hidden');
                                setTimeout(function() {
                                    root.$('.popup-box.upload-docx-documents-block').hide();
                                    root.popupClose('layout_selection_block');
                                    root.current_view.load(root.section_id, true);
                                }, 1000);
                                return;
                            }

                            root.$('.upload-docx-documents-block')
                                .attr({
                                    'filename': response.filename,
                                    'status': response.status,
                                    'description': response.description
                                });
                            root.$('.parser-document-status .status').removeClass('progress success');
                            root.$('.show-layout-popup.popup-back-icon').addClass('hidden');

                            root.$('.parser-uploading-doc .status').addClass('success');
                            root.$('.parser-parsing-data .status').addClass('progress');
                            if($.inArray(response.status, ['PARSING_COMPLETE', 'COMPLETED']) !== -1){
                                root.$('.parser-uploading-doc .status, .parser-parsing-data .status')
                                    .removeClass('progress')
                                    .addClass('success');
                                root.$('.parser-genrating-chapter .status').addClass('progress');
                            }
                            root.docParserStatusHandler(interval);
                        },
                        error: function(xhr, status, message){
                            let msg = 'ERROR';
                            if(message)
                                msg = message.textStatus;
                            root.showDocError(msg);
                        }
                    })

                }
            }, interval);

        }
        
        /**
         * Content Document Parse ends here
         */

    });

    return EditView;

});
