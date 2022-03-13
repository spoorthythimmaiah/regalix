/*global define*/
define(['underscore',
        'jquery',
        'backbone',
        '../common',
        '../models/sitemap',
        '../models/section',
        '../models/playlist',
        '../models/walkthrough',
        '../templates/dashboard/sitemap/main.handlebars',
        '../templates/dashboard/sitemap/popups.handlebars',
        '../../helpers/handlebars/i18n'
], function (_, $, Backbone, Common,
             SiteMap, Section, Playlist, Demo,
             SiteMapMainTemplate, SiteMapPopupTemplate, Translate) {
    'use strict';

    var SiteMapView = Backbone.View.extend({
        // Render the dashboard SiteMap view and handle events - reordering, deleting, launching urls.

        el: '#siteMap-block',

    	events: {
            'click .sitemap-popup-block .cancel': 'closeDeletePopup',
            'click .sitemap-popup-block .delete': 'deleteElement',
            'click .remove-element': 'showDeletePopup',
            'click .launch-btn': 'launchUrl',
            'mouseover li div':'hideOptions',
            'mouseout li div': 'showOptions',
        },

        NO_RECORDS_TEXT: 'No content added yet!',

    	initialize: function () {
            this.siteMap = new SiteMap();
            this.render();
        },

        render: function () {
            var root = this;
            this.siteMap.fetch({
                success: function(model, response){
                    root.$('#siteMap-loading-block').hide();
                    if (response){
                        root.$el.find('#siteMap').html(SiteMapMainTemplate({'siteMapData': response}));
                        root.loadSortbaleOptions();
                    }else{
                        root.$el.find('#siteMap').html('<div>' + root.NO_RECORDS_TEXT + '</div>');
                    }
                },
                error: function(xhr, status_code, message){
                    console.log("siteMap fetch error:", xhr, status_code, message)
                }
            });
        },

        loadSortbaleOptions: function(){
            var root = this;
            this.$el.find('#siteMap').sortableLists({
                placeholderCss: {'background-color': '#e8f0fd',},
                hintCss: {'background-color':'#bbf'},
                listSelector: 'ul',
                insertZone: 30,
                insertZonePlus: true,
                scroll: 100,
                onChange: function( currentEle)
                {
                    // Called whenever an element's position is changed.
                    // Use this function cause, it will be triggered whenever a change happens,
                    // so simply clicking an element wont trigger this.
                    var afterEleSlug = '';
                    if(currentEle.prev().length){
                        afterEleSlug = currentEle.prev().attr('data-slug');
                    }

                    // Send Backbone model call request with 
                    // currentElement, target parent slug, after-element-slug.
                    root.reorderElement(currentEle,
                                        currentEle.attr('target-parent-slug'),
                                        afterEleSlug);
                },
                isAllowed: function( currentEle, hint, target ){
                    // Be carefull if you test some ul/ol elements here.
                    // Sometimes ul/ols are dynamically generated,
                    // and so they do not have some attributes as natural ul/ols.

                    // Be careful also if the hint is not visible.
                    // It has only display none so it is at the
                    // previous place where it was before(excluding first moves before showing).

                    var targetItem = target.attr('data-item'),
                        currentlyDragged = currentEle.attr('data-item');

                    // Restricted Sections, Asset Linked Sections scenario.
                    if(target.hasClass('undraggable')
                       || target.hasClass('asset-linked')){
                        hint.css({'background-color':'#000',
                                  'height':'10px',});
                        return false;
                    }
                    // category scenario.
                    if(currentlyDragged == 'category' && targetItem == 'playlist'
                       || currentlyDragged == 'category' && targetItem == 'demo'
                       || currentlyDragged == 'category' && target.children().children("li[data-item='playlist']").length)
                    {
                        hint.css({'background-color':'#000',
                                  'height':'10px',});
                        return false;
                    }

                    // Section scenario.
                    if(currentlyDragged == 'section' && targetItem == 'playlist'
                        || currentlyDragged == 'section' && targetItem == 'demo'
                        || currentlyDragged == 'section' && target.children().children("li[data-item='playlist']").length)
                    {
                        hint.css({'background-color':'#000',
                                  'height':'10px',});
                        return false;
                    }

                    // Playlist scenario.
                    if(currentlyDragged == 'playlist' && targetItem == null
                        || currentlyDragged == 'playlist' && targetItem == 'demo'
                        || currentlyDragged == 'playlist' && targetItem == 'playlist'
                        || currentlyDragged == 'playlist' && target.children().children("li[data-item='section']").length
                        ){
                        hint.css({'background-color':'#000',
                                  'height':'10px',});
                        return false;
                    }

                    // Demo scenario.
                    if(currentlyDragged == 'demo' && targetItem != 'playlist'){
                        hint.css({'background-color':'#000',
                                  'height':'10px',});
                        return false;
                    }

                    // Allow the user to drag n drop.
                    hint.css({'background-color':'#E1EBFF',
                              'height':'10px',
                              'border-top':'1px solid #f2f2f2',
                              'border-bottom': '1px solid #f2f2f2'});
                    var currentSlug = currentEle.attr('data-slug');
                    var targetParentSlug = target.attr('data-slug');

                    // Set the target slug attribute to the Current Element.
                    // Change the attributes according to the dropped.
                    if(targetParentSlug){
                        currentEle.attr('target-parent-slug', targetParentSlug);
                        if(currentEle.attr('data-item') == 'category'){
                            currentEle.attr('data-item', 'section');
                        }
                    }
                    // If the element is dropped as outside a Product.
                    else{
                        currentEle.attr('target-parent-slug', "");
                        if(currentEle.attr('data-item') == 'section'){
                            currentEle.attr('data-item', 'category');
                        }
                    }
                    return true;
                },
                opener: {
                     active: true,
                     close: '/static/images/hide_nav_icon.png',
                     open: '/static/images/expand_nav_icon.png',
                     openerCss: {
                         'display': 'inline-block',
                         'width': '13px',
                         'height': '13px',
                         'float': 'left',
                         'margin': '8px 5px 0px 0px',
                         'background-position': 'center center',
                         'background-repeat': 'no-repeat',
                         'background-size': '100%'
                     },
                     openerClass: ''
                },
                ignoreClass: 'undraggable',
            });
        },

        launchUrl: function(event){
            var launchElement = event.currentTarget;
            launchElement.href = "/edit/#!/";
            var mainListElement = this.$(launchElement).parents().closest("li[data-slug='"+$(launchElement).attr('slug-id')+"']");
            var elementType = mainListElement.attr('data-item');
            if(elementType == 'demo'){
                launchElement.href += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';

                if(mainListElement.closest("li[data-item='section']").length){
                    launchElement.href += mainListElement.closest("li[data-item='section']").attr('data-slug') + '/';
                }
            }
            else if(elementType == 'section' && mainListElement.closest("li[data-item='category']").attr('data-slug')){
                launchElement.href += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';
            }

            launchElement.href += mainListElement.attr('data-slug');
            this.$(launchElement).children().find('span').click(1);
        },

        showOptions: function(event){
            // Display 'delete-icon, launch-btn' on hover. 
            this.$(event.currentTarget).children('.remove-element,.lib-cat-launch').addClass('hide');
        },

        hideOptions: function(event){
            this.$(event.currentTarget).children().removeClass('hide')
        },

        reorderElement: function(currentElement, parentSlug, afterElementSlug){
            // Reorder the items(category/section/playlist/demo) thru Backbone calls.
            // Args:
            //      currentElement  - DOM object of currently dragged element.
            //      parentSlug      - String/Integer slug/id data of the parent if exists.
            //      afterElementSlug    - String slug data of the element after the current Element.

            var patchData = {
                'reorder': 'tree_reorder',
                'target_parent_slug': parentSlug,
                'after_ele_slug': afterElementSlug
            };

            var modelApi;
            var dataItem = $(currentElement).attr('data-item');
            var dataSlug = $(currentElement).attr('data-slug');
            if ( dataItem == 'section' || dataItem == 'category'){
                patchData.id = dataSlug;
                modelApi = new Section(patchData);
            }else if (dataItem == 'playlist'){
                patchData.id = parseInt(dataSlug);
                modelApi = new Playlist(patchData);
            }else if(dataItem == 'demo'){
                patchData.id = dataSlug;
                patchData.target_parent_slug = parseInt(parentSlug);
                modelApi = new Demo(patchData);
            }

            // TODO: Display a popup confirmation before re-ordering.
            var root = this;
            modelApi.save(null, {
                patch: true,
                success: function(responseStatus, msg, jqXhr){
                    root.fetchAndUpdateCount();
                },
                error: function(responseStatus, msg, statusText){
                    window.location.reload(true);
                }
            });
        },

        fetchAndUpdateCount: function(){
            var root = this;
            this.siteMap.fetch({
                success: function(model, response){
                    if (response)
                        root.updateDemoSlideCount(response);
                    else
                        root.$el.find('#siteMap').html('<div>' + root.NO_RECORDS_TEXT + '</div>');
                },
                error: function(xhr, status_code, message){
                    console.log("siteMap fetch error:", xhr, status_code, message)
                }
            });
        },

        updateDemoSlideCount: function(siteMapData){
            var root = this;
            var getText = function(count, item){
                // Since this function is used only inside the 'updateDemoSlideCount',
                // its defined with limited scope. 
                return (count > 1) ? (count + ' ' + item + 's') : (count + ' ' + item);
            };

            var updatePlaylistSlideCount = function(playlists=[]){
                // Since this function is used only inside the 'updateDemoSlideCount',
                // its defined with limited scope.
                _.each(playlists, function(playlist, index){
                    _.each(playlist.demos, function(demo, index){
                        root.$('li[data-slug="' + demo.slug + '"][data-item="demo"] span.demo-slide-count')
                            .text(getText(demo.slides_count, 'Slide'));
                    });
                });
            };

            var updateSectionSlideCount = function(sections, type){
                // Recursive function to update demos/slide count,
                // on section, subsections, playlists levels.
                _.each(sections, function(section, index){
                    root.$('li[data-slug="' + section.slug + '"] span.' + type + '-demo-count')
                        .text(getText(section.demos_count, 'Demo'));
                    root.$('li[data-slug="' + section.slug + '"] span.' + type + '-slide-count')
                        .text(getText(section.slides_count, 'Slide'));
                    if (section.children)
                        updateSectionSlideCount(section.children, 'section');
                    else if (section.playlists)
                        updatePlaylistSlideCount(section.playlists);
                });
            };
            // Loop thru the sitemap data and only update the demo, slide count using slug.
            updateSectionSlideCount(siteMapData, 'category');
        },

        closeDeletePopup: function(event){
            this.$('.sitemap-popup .sitemap-popup-block').addClass('bounceOutUp');
            setTimeout(function(){
                $('#sitemap-popup-overlay').css('display', 'none');
                this.$('.sitemap-popup .sitemap-popup-block').removeClass('bounceOutUp');
            }, 300);
        },

        showDeletePopup: function(event){
            var deleteItem = this.$(event.currentTarget).closest('li').attr('data-item');
            var deleteSlug = this.$(event.currentTarget).closest('li').attr('data-slug');
            var templateVars = {
                'slug': deleteSlug,
                'item': deleteItem,
                'displayClass': 'visible',
                'popupTitle': 'delete ' + deleteItem,
                'popupMsg': 'Are you sure you want to delete this ' + deleteItem + ' ?',
                'contentAction': 'delete'
            }
            this.$el.find('#siteMap-popup').html(SiteMapPopupTemplate(templateVars));
            $('#sitemap-popup-overlay').css('display', 'table-cell');
            this.$('.sitemap-popup .sitemap-popup-block').addClass('bounceInDown');
            var root = this;
            setTimeout(function(){
                root.$('.sitemap-popup .sitemap-popup-block').removeClass("bounceInDown");
            }, 300);

        },

        deleteElement: function(event){
            this.$('.sitemap-popup .action-progress').addClass('slide-in');
            var deleteSlug = this.$(event.currentTarget).parents('.sitemap-popup').attr('data-slug');
            var deleteType = this.$(event.currentTarget).parents('.sitemap-popup').attr('data-item');
            var root = this;

            if(!deleteSlug || !deleteType){
                this.$('.sitemap-popup .action-progress').addClass('is-submitted')
                    .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                        root.$('.sitemap-popup .action-failed').addClass('slide-in');
                    });
                setTimeout(function(){
                    root.closeDeletePopup(event);
                }, 2000)
                return;
            }

            var modelApi;
            if(deleteType == 'category' || deleteType == 'section') modelApi = new Section({id: deleteSlug});
            else if(deleteType == 'demo') modelApi = new Demo({id: deleteSlug});

            modelApi.destroy({
                wait: true,
                success: function(responseStatus, msg, jqXhr){
                    // Display the success ux.
                    root.$('.sitemap-popup .action-progress').addClass('is-submitted')
                        .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                            root.$('.sitemap-popup .action-success').addClass('slide-in');
                        });

                    // Update the count and Remove the element from the sitemap.
                    setTimeout(function(){
                        root.fetchAndUpdateCount();
                        // Update the total demos/slides count on the library info block.
                        if(window.updateDemosSlidesCount) window.updateDemosSlidesCount();
                        root.$('li[data-item="' + deleteType + '"][data-slug="' + deleteSlug + '"]').remove();
                        root.closeDeletePopup(event);
                    }, 2000);

                },
                error: function(responseStatus, msg, statusText){
                    root.$('.sitemap-popup .action-progress').addClass('is-submitted')
                        .one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                            root.$('.sitemap-popup .action-failed').addClass('slide-in');
                        });
                    setTimeout(function(){
                        window.location.reload(true);
                    }, 2000);
                }
            });
        },

    });
    return SiteMapView;
});