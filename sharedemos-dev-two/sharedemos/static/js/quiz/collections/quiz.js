/*global define */
define([
    'backbone',
    '../models/quiz'
], function (Backbone, Quiz) {
    'use strict';

    var QuizCollection = Backbone.Collection.extend({
        model: Quiz,
        urlRoot: "/api/quiz"
    });

    return Quiz;
});
