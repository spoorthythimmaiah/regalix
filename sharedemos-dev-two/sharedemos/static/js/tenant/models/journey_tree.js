/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var JourneyTree = Backbone.Model.extend({

        urlRoot: "/api/journey-tree"
    });

    return JourneyTree;
});