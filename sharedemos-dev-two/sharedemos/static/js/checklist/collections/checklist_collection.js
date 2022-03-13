/*global define */
define([
    'backbone',
    '../models/checklist'
], function (Backbone, Checklist) {
    'use strict';

    var ChecklistCollection = Backbone.Collection.extend({
    	model : Checklist,
        url: "/api/checklist"
    });

    return ChecklistCollection;
});