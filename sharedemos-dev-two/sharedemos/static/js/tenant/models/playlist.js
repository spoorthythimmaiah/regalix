/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Playlist = Backbone.Model.extend({

        urlRoot: "/api/playlist"
    });

    return Playlist;
});