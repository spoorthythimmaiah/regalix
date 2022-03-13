/*global define*/
define([
    'underscore',
    'backbone',
    '../../../tenant/common',
    '../views/player',
], function (_, Backbone, Common, PlayerView) {
    'use strict';

    var PlayerRouter = Backbone.Router.extend({
        routes: {
            "": "loadSlide",
            ":chapterID/": "loadSlide",
            ":chapterID/:slide_index": "loadSlide",
            ":chapterID/:slide_index/": "loadSlide",
        },

        initialize : function(attrs){
            this.view = null;
            this.productID = attrs.productID;
            this.sectionID = attrs.sectionID;
            this.chapterID = attrs.chapterID;
            this.slideIndex = attrs.slideIndex || 1;
            return this;
        },

        loadSlide : function(chapterID, slide_index){
            if(!chapterID){
                this.view = null;
                return;
            }
            slide_index = (slide_index && parseInt(slide_index)) || 1;
            if(this.view){
                if(chapterID && chapterID !== this.chapterID){
                    this.chapterID = chapterID;
                    this.view.load(this.productID, this.sectionID, chapterID, slide_index);
                }else{
                    this.view.moveToSlide(slide_index);
                }
            }else{
                // Initialize Main view
                var view = new PlayerView({
                    'product': this.productID,
                    'section': this.sectionID, 
                    'chapter': this.chapterID,
                    'slide_index': this.slideIndex || slide_index
                });
                this.view = view;
            }
        }
    });

    return PlayerRouter;
});
