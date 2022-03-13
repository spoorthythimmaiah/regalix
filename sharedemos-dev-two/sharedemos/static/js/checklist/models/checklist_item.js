/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ChecklistItem = Backbone.Model.extend({

        urlRoot: "/api/checklist-item"
    });

    return ChecklistItem;
});