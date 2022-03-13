/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Visit = Backbone.Model.extend({

        urlRoot: "/visit-activity"
    });

    return Visit;
});