/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    './views/new_reports',
], function ($, Backbone, ReportsView) {
    new ReportsView();
});