/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var connectorList = Backbone.Model.extend({

        urlRoot: "/api/repository-connector"
    });

    return connectorList;
});