'use strict';
import 'cookies';
import searchView from './views/search';

(()=> {
    if(!SDCookies.hasItem('user_locale')) {
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    new searchView();
})()
