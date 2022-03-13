/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Answer = Backbone.Model.extend({

        urlRoot: "/api/answer"
    });

    return Answer;
});