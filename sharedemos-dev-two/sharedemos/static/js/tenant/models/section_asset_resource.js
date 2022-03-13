/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SectionAssetResource = Backbone.Model.extend({

        urlRoot: "/api/resource/section-asset-link",

    });

    return SectionAssetResource;
});