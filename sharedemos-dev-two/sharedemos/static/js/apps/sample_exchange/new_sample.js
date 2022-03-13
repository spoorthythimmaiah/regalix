/*global require*/
'use strict';

require([
    './routers/router',
    './views/new_sample',
    '../../helpers/sync',
    'cookies'
], function (SampleExchangeRouter, NewView) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    $("link[rel*='shortcut']").attr("href",  document.favicon);

    var rootUrl = '/new-sample-exchange/';
    new SampleExchangeRouter();
    Backbone.history.start({ pushState: true , root : rootUrl});
    new NewView();
});