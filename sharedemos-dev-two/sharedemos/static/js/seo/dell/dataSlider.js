/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    './views/dataSlider'
], function($, Backbone, DataSlider) {
    new DataSlider();
});
