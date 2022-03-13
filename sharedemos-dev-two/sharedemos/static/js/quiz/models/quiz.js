/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Quiz = Backbone.Model.extend({
        urlRoot: "/api/quiz"
    });

    return Quiz;
});