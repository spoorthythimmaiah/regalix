/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Box = Backbone.Model.extend({

        urlRoot: "/api/box"
    });

    return Box;
});