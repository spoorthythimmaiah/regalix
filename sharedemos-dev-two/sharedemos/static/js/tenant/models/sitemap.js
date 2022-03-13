/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SiteMap = Backbone.Model.extend({

        urlRoot: "/api/sitemap",
    });

    return SiteMap;
});