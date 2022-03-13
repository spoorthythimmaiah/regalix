/*global require*/
'use strict';

require([
    './views/launchpad',
    'cookies'
], function (LaunchpadView) {

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    try {
        new LaunchpadView();        
    } catch (error){
        console.log('Launchpad Load Error: ', error);
    }

});