/*global require*/
'use strict';

require([
    './views/audience',
    '../helpers/sync',
    'cookies',
], function (audienceView) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);
    new audienceView();
});