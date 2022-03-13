/*global require*/
'use strict';

require([
    './views/main',
    './views/edit',
    '../helpers/sync',
    'cookies'
], function (MainView, EditView) {
    $("link[rel*='shortcut']").attr("href", document.favicon);
    if(document.requestParameters){
        if(!SDCookies.hasItem('author_locale')){
            SDCookies.setItem('author_locale', document.current_locale, null, '/');
        }
    }else if(!SDCookies.hasItem('user_locale')){
            SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    new MainView(document.group_slug);
    if(document.requestParameters){
        new EditView();
    }
    Backbone.history.start();
});