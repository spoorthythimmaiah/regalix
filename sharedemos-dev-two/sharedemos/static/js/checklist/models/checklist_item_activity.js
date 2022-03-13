/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var ChecklistItemActivity = Backbone.Model.extend({

        urlRoot: "/checklist-item-activity"
    });

    return ChecklistItemActivity;
});