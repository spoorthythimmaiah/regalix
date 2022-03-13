'use strict';

import searchView from './views/search';
import 'cookies';
(()=>{
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    return new searchView()
})()