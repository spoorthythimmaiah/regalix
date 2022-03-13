/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Question = Backbone.Model.extend({

        urlRoot: "/api/question"
    });

    return Question;
});