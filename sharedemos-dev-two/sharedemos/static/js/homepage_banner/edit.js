/*global require*/
'use strict';

require([
    './views/edit',
     '../helpers/sync',
    'cookies'
], function (editHomepageBannerView) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    // Initialize HomePageBanner view.
    new editHomepageBannerView();
});
