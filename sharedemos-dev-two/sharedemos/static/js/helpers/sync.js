/*global define */
define([
       'jquery',
       'backbone'
], function ($, Backbone) {
    'use strict';
    var _sync = Backbone.sync;

    Backbone.sync = function(method, model, options){

        function csrfSafeMethod(method) {
            // these HTTP methods do not require CSRF protection
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        };

        function sameOrigin(url) {
            // test that a given url is a same-origin URL
            // url could be relative or scheme relative or absolute
            var host = document.location.host; // host + port
            var protocol = document.location.protocol;
            var sr_origin = '//' + host;
            var origin = protocol + sr_origin;
            // Allow absolute or scheme relative URLs to same origin
            return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
                (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
                // or any other URL that isn't scheme relative or absolute i.e relative.
                !(/^(\/\/|http:|https:).*/.test(url));
        };

        options.beforeSend = function(xhr, settings){
            var csrftoken = $('meta[name=csrf-token]').attr('content');
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            }
            if(document.requestParameters){
                var base_url = settings.url.split('?')
                if(base_url.length > 1){
                    settings.url = base_url[0] + document.requestParameters() + '&' + base_url[1]
                }else{
                    settings.url = settings.url + document.requestParameters();
                }
            }
            if(settings.type == 'GET' && document.isOffline){
                settings.url += '.json';
            }
       };
       return _sync(method, model, options);
    };

});
