/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Icon = Backbone.Model.extend({

        urlRoot: "/api/icon",

    });

    return Icon;
});