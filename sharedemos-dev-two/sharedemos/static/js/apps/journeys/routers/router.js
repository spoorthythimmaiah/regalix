/*global define */
define([
    'underscore',
    'backbone',
    '../views/launchpad'
], function (_, Backbone, LaunchPadView){
    'use strict';

    var JourneyRouter = Backbone.Router.extend({
        routes: {
            ":journey": "routeHandler"
        },

        initialize: function(){
            this.view = null;
            return this;
        },

        routeHandler: function(journey){
            this.loadView(new LaunchPadView(journey));
        },

        loadView : function(view){
            if(this.view){
                this.view.undelegateEvents();
            }
            this.view = view;
        },

    });


    return JourneyRouter;
});