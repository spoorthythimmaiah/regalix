/*global require*/
'use strict';

require([
    './routers/router',
    '../helpers/sync',
    'cookies'
], function (QuizRouter) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);
    new QuizRouter();
    Backbone.history.start({hashChange:false, pushState:true, root:'/quiz'});
});
