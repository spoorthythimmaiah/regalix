/*global require*/
'use strict';

require([
    'jquery',
    'backbone',
    'airbrake-js',
    './routers/router',
    './views/edit',
    '../helpers/sync',
    'cookies'
], function ($, Backbone, AirbrakeJs, Router, EditView) {

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

    if(!SDCookies.hasItem('author_locale')){
        SDCookies.setItem('author_locale', document.current_locale, null, '/');
    }

    try {
        require('malihu-custom-scrollbar-plugin')($);
        new EditView();
        // Initialize routing and start Backbone.history()
        new Router();
        Backbone.history.start();

        document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);

    }catch (error){
        airbrake && airbrake.push(error);
    }

});
