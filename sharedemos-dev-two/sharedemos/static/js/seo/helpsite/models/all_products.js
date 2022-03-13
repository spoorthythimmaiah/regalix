/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AllProducts = Backbone.Model.extend({
        urlRoot: "/api/product-tree",
    });

    return AllProducts;
});