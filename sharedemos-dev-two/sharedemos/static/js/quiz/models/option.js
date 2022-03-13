/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var QuizOption = Backbone.Model.extend({
        urlRoot: "/api/quiz-option"
    });

    return QuizOption;
});