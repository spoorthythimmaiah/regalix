/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    './views/feedback',
    '../helpers/sync',
    'cookies'
], function ($, Backbone, FeedBackView) {

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    try {
        new FeedBackView();        
    } catch (error){
        console.log('Feedback Report Load Error: ', error);
    }

});