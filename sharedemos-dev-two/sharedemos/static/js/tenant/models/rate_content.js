/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var RateContent = Backbone.Model.extend({

        urlRoot: "/api/rate"
    });

    return RateContent;
});