/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Walkthrough = Backbone.Model.extend({

        urlRoot: "/api/walkthrough/"
    });

    return Walkthrough;
});