/*global define */
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Option = Backbone.Model.extend({

        urlRoot: "/api/option",
        url: function() {
              var base = _.result(this, 'urlRoot');
              if (this.isNew()) return base;

              if(this.id){
                 base += '/' + encodeURIComponent(this.id);
              }

              if(this.get('child')){
                 base += '/' + encodeURIComponent(this.get('child'));
              }

              return base;
            },
    });

    return Option;
});