/*global define*/
define([
    'underscore',
    'backbone',
    '../../tenant/common',
    '../views/home',
    '../views/quiz',
    '../views/edit',
], function (_, Backbone, Common, HomeView, QuizView, QuizEditView) {
    'use strict';

    var QuizRouter = Backbone.Router.extend({
        routes: {
            "": "home",
            ":quiz": "routeHandler",
        },

        initialize : function(){
            this.view = null;
            return this;
        },

        home : function(){
            this.loadView(new HomeView());
        },

        routeHandler: function(quiz){
            this.loadView(new QuizView(quiz), quiz);
        },

        loadView : function(view, quiz){
            if(this.view){
                this.view.undelegateEvents();
            }
            if(quiz){
                document.quiz_session = Common.generateUUID();
            }
            this.view = view;
        },

    });

    return QuizRouter;
});
