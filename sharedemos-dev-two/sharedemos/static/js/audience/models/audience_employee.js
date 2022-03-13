/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var AudienceEmployee = Backbone.Model.extend({

        urlRoot: "/api/audience-employee/",

        url : function(){
            var url = this.urlRoot + this.get('audience_id');
            if(this.get('id')){
                url += '/' + this.get('id')
            }
            return url;
        }
    });

    return AudienceEmployee;
});