/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var LinkedinUser = Backbone.Model.extend({

        urlRoot: "/api/user/linkedin"
    });

    return LinkedinUser;
});