/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var Checklist = Backbone.Model.extend({
        urlRoot: "/api/checklist"
   	});

    return Checklist;
});