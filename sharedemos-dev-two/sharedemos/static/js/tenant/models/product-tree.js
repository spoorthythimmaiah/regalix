/*global define */
define([
    'backbone'
], function (Backbone) {
    'use strict';

    var FullPath = Backbone.Model.extend({

        urlRoot: "/api/product-tree",
        url : function(){
            var url = this.urlRoot;
            if(this.get('product')){
                url += '/' + this.get('product')
            }
            if(this.get('section')){
                url += '/' + this.get('section')
            }
            return url;
        }
    });

    return FullPath;
});