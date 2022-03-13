/*global define */
define([
	'backbone'
], function(backbone){
	'use strict';

	var SampleExchangeActivity = Backbone.Model.extend({

		urlRoot: "/sample-exchange-activity",
	});

	return SampleExchangeActivity;
});