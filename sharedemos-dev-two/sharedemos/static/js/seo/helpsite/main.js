/*global require*/
'use strict';

import HelpSiteRouter from './routers/router';
import '../../helpers/sync';
import 'cookies';

(() => {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    $("link[rel*='shortcut']").attr("href",  document.favicon);

    var rootUrl = '/';
    new HelpSiteRouter();
    Backbone.history.start({ pushState: true , root : rootUrl});
})()