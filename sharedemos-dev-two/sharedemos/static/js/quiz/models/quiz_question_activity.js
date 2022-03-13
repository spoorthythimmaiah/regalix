/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var QuizQuestionActivity = Backbone.Model.extend({
        urlRoot: "/quiz-question-activity"
    });

    return QuizQuestionActivity;
});