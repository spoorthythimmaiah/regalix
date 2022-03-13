/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ReportsData = Backbone.Model.extend({
        urlRoot: "/api/reports/data",
    });
    return ReportsData;
});