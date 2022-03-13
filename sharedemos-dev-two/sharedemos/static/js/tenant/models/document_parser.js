/*global define */
define([
	'backbone'
], function (Backbone) {
	'use strict';

	var DocumentParser = Backbone.Model.extend({

		urlRoot: '/api/document-parser',
	});

	return DocumentParser;
});