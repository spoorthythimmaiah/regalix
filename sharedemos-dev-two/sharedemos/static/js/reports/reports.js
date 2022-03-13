/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    './views/reports',
], function ($, Backbone, ReportsView) {
    new ReportsView();
});