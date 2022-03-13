/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var BulletinBoard = Backbone.Model.extend({

        urlRoot: "/api/bulletin-board",

    });

    return BulletinBoard;
});