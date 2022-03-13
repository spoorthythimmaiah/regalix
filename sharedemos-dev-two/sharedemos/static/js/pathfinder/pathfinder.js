/*global require*/
'use strict';

require([
    './views/main',
    './views/edit',
    'cookies',
    '../helpers/sync',
], function (MainView, EditView) {
        // Call View

        if(document.isAuthor){
            if(!SDCookies.hasItem('author_locale')){
                SDCookies.setItem('author_locale', document.current_locale, null, '/');
            }
        }else if(!SDCookies.hasItem('user_locale')){
            SDCookies.setItem('user_locale', document.current_locale, null, '/');
        }

        document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);
        new MainView(document.path_id);
        if(document.isAuthor){
        	new EditView()
        }
});