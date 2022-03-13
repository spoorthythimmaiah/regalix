/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Urlunfurl = Backbone.Model.extend({

        urlRoot: "/url-unfurl"
    });

    return Urlunfurl;
});