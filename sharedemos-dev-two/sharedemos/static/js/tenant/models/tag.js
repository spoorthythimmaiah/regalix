/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Tag = Backbone.Model.extend({

        urlRoot: "/api/tags/"
    });

    return Tag;
});