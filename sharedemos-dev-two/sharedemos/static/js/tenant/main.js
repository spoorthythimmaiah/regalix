/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'airbrake-js',
    './routers/router',
    './views/main',
    '../helpers/sync',
    'jquery.sudoslider',
    'cookies'
], function ($, Backbone, AirbrakeJs, Router, MainView) {

    if(document.projectEnv && document.projectEnv != 'development'){
        var airbrake = new AirbrakeJs(
            {
                projectId: document.airbrake_project_id, 
                projectKey: document.airbrake_api_key
            }
        );
        airbrake.addFilter(function(notice) {
          notice.context.environment = projectEnv;
          return notice;
        });
    }

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }

    try {
        // Initialize routing and start Backbone.history()
        new Router();
        Backbone.history.start();
        document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);

        new MainView();
    } catch (error){
        airbrake && airbrake.push(error);
    }

});
