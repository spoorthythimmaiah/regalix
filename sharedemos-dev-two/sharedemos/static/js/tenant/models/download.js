/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Download = Backbone.Model.extend({

        urlRoot: "/api/download",

    });

    return Download;
});