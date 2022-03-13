define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ViewerReports = Backbone.Model.extend({
        urlRoot: "/api/reports/viewer",
    });
    return ViewerReports;
});