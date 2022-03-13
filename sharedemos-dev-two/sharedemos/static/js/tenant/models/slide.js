/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Slide = Backbone.Model.extend({

        urlRoot: "/api/slide"
    });

    return Slide;
});