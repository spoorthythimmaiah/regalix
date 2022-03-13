/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var UserDetails = Backbone.Model.extend({

        urlRoot: "/post-user-details"
    });

    return UserDetails;
});