/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var PathActivity = Backbone.Model.extend({

        urlRoot: "/path-finder-activity"
    });

    return PathActivity;
});