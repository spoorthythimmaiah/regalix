/*global require*/
'use strict';

require([
    './routers/router',
    '../helpers/sync',
    'cookies'
], function (ChecklistRouter) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
	$("link[rel*='shortcut']").attr("href",  document.favicon);
	
	var rootUrl = '/check-list/';
    if(document.requestParameters) {rootUrl = '/preview/check-list'}
    new ChecklistRouter();
	Backbone.history.start({ pushState: true , root : rootUrl});
});