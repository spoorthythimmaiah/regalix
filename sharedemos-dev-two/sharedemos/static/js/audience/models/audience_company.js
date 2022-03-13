/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AudienceCompany = Backbone.Model.extend({
        urlRoot: "/api/audience-company"
    });

    return AudienceCompany;
});