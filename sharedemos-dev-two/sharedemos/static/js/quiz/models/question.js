/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var QuizQuestion = Backbone.Model.extend({
        urlRoot: "/api/quiz-question"
    });

    return QuizQuestion;
});