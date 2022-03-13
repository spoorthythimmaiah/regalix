/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var RteResource = Backbone.Model.extend({

        urlRoot: "/api/resource/rte-asset",
        idAttribute: 'path'

    });
    return RteResource;
});