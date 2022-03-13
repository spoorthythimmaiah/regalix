/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var FAQGroup = Backbone.Model.extend({

        urlRoot: "/api/faq-group/"
    });

    return FAQGroup;
});