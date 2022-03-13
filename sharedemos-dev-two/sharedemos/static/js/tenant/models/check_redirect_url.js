/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var RedirectPath = Backbone.Model.extend({

        urlRoot: "/check-redirect/",
        url : function(){
            var url;
        	if(this.get('walkthrough')!= null){
        		url = this.urlRoot + this.get('product') + '/' + this.get('section') + '/' + this.get('walkthrough');
        	}
        	else if(this.get('section') != null){
            	url = this.urlRoot + this.get('product') + '/' + this.get('section');
        	}
        	else{
        		url = this.urlRoot + this.get('product');
        	}
            return url;
        }

    });

    return RedirectPath;
});