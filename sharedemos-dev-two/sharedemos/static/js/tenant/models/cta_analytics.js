/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var CTAAnalytics = Backbone.Model.extend({

        urlRoot: "/cta-analytics"
    });

    return CTAAnalytics;
});