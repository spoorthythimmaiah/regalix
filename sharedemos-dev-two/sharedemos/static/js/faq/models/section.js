/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var FAQSection = Backbone.Model.extend({

        urlRoot: "/api/faq-section/"
    });

    return FAQSection;
});