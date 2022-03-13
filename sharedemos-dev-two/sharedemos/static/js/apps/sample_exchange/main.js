'use strict';
import Backbone from 'backbone';

import 'cookies';
import '../../helpers/sync';

import Router from './routers/router';

( ()=> {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    $("link[rel*='shortcut']").attr("href",  document.favicon);
    new Router();
    Backbone.history.start({ pushState: true , root : '/sample-exchange/'});

})();
