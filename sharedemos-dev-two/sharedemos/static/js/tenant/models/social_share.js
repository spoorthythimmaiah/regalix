/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SocialShare = Backbone.Model.extend({
        urlRoot: "/api/social-share"
    });

    return SocialShare;
});