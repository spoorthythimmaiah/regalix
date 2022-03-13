/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SuggestionMailer = Backbone.Model.extend({

        urlRoot: "/mail-pathfinder-suggestions/"
    });

    return SuggestionMailer;
});