/*global define*/
define([
    'underscore',
    'backbone',
    '../../tenant/common',
    '../views/home',
    '../views/checklist',
], function (_, Backbone, Common, HomeView, ChecklistView) {
    'use strict';

    var ChecklistRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            ":checklist": "routeHandler",
        },

        initialize : function(){
            this.view = null;
            return this;
        },

        home : function(){
            this.loadView(new HomeView());
        },

        routeHandler: function(checklist){
            this.loadView(new ChecklistView(checklist), checklist);
        },

        loadView : function(view, checklist){
            if(this.view){
                this.view.undelegateEvents();
            }
            if(checklist){
                document.checklist_session = Common.generateUUID();
            }
            this.view = view;
        },

    });

    return ChecklistRouter;
});
