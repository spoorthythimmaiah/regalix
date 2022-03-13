/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ReportsGraph = Backbone.Model.extend({
        urlRoot: "/api/reports/graph",
    });

    return ReportsGraph;
});