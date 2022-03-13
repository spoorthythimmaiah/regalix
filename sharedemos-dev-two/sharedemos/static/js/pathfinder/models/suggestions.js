/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Suggestions = Backbone.Model.extend({

        urlRoot: "/api/suggestions"
    });

    return Suggestions;
});