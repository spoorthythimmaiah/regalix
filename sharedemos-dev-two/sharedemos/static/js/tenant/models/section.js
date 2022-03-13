/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Section = Backbone.Model.extend({

        urlRoot: "/api/section",

    });

    return Section;
});