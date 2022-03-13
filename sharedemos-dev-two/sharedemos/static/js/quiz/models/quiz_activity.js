/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var QuizActivity = Backbone.Model.extend({
        urlRoot: "/quiz-activity"
    });

    return QuizActivity;
});