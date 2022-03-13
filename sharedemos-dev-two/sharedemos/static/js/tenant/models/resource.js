/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Resource = Backbone.Model.extend({

        urlRoot: "/api/resource",

    });

    return Resource;
});