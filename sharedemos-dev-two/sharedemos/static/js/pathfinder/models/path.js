/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Path = Backbone.Model.extend({

        urlRoot: "/api/path"
    });

    return Path;
});