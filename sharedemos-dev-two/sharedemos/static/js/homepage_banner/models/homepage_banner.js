/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var HomepageBanner = Backbone.Model.extend({
        urlRoot: "/api/homepage-banner"
    });

    return HomepageBanner;
});