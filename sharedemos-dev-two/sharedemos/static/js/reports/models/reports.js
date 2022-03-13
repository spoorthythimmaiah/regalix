/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ReportsApi = Backbone.Model.extend({
        urlRoot: "/api/new_reports",
    });

    return ReportsApi;
});