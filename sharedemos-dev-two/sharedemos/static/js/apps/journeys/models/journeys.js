/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Journeys = Backbone.Model.extend({
        urlRoot: "/api/journey",
    });

    return Journeys;
});