/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var FeedbackReports = Backbone.Model.extend({
        urlRoot: "/api/rate-content",
    });

    return FeedbackReports;
});