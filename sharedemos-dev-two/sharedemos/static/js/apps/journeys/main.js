/*global require*/
'use strict';
require([
    'jquery',
    'backbone',
    './views/edit',
    './routers/router',
    '../../helpers/sync',
    'cookies'
], function ($, Backbone, EditView, JourneyRouter) {
    try {
        $("link[rel*='shortcut']").attr("href",  document.favicon);

        if(!document.is_author) {
            if(!SDCookies.hasItem('user_locale')){
                SDCookies.setItem('user_locale', document.current_locale, null, '/');
            }
            var rootUrl = '/j/';
            new JourneyRouter();
            Backbone.history.start({ pushState: true , root : rootUrl});
        } else {
            if(!SDCookies.hasItem('author_locale')){
                SDCookies.setItem('author_locale', document.author_locale, null, '/');
            }
            new EditView();
        }
        
    } catch (error){
        console.log("Something went wrong");
    }

});