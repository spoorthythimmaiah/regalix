/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    './views/sitemap',
    '../helpers/sync',
    'cookies'
], function ($, Backbone, SiteMapView) {

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    try {
        new SiteMapView();        
    } catch (error){
        console.log('SiteMap Load Error: ', error);
    }

});