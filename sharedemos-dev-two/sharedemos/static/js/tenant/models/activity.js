/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Activity = Backbone.Model.extend({

        urlRoot: "/walkthrough-activity"
    });

    return Activity;
});