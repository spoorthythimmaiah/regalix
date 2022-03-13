/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var QnA = Backbone.Model.extend({

        urlRoot: "/api/faq-qna/"
    });

    return QnA;
});