/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var TagsOptions = Backbone.Model.extend({
        urlRoot: "/api/journey/tags-and-options",
    });

    return TagsOptions;
});