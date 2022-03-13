/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var SuggestionsGroups = Backbone.Model.extend({

        urlRoot: "/api/suggestions_groups"
    });

    return SuggestionsGroups;
});