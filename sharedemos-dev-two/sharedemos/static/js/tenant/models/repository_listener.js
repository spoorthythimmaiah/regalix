/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var repositoryListener = Backbone.Model.extend({

        urlRoot: "/api/repository-listener"
    });

    return repositoryListener;
});