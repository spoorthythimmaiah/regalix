/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Cta = Backbone.Model.extend({

        urlRoot: "/api/cta"
    });

    return Cta;
});