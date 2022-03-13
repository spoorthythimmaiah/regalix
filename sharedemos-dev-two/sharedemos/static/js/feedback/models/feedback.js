/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Feedback = Backbone.Model.extend({
        urlRoot: "/api/feedback",
    });

    return Feedback;
});