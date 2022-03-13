/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AudioVideoAnalytics = Backbone.Model.extend({

        urlRoot: "/audio-video-analytics"
    });

    return AudioVideoAnalytics;
});