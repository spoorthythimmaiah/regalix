/*global require*/
'use strict';

require([
    './routers/router',
    './views/edit',
    '../helpers/sync',
    'cookies'
], function (ChecklistRouter, EditView) {
    if(!SDCookies.hasItem('author_locale')){
        SDCookies.setItem('author_locale', document.current_locale, null, '/');
    }
	$("link[rel*='shortcut']").attr("href", document.favicon);
    		
    new ChecklistRouter();
	Backbone.history.start({ pushState: true,root : 'edit/check-list/' });
	new EditView();
});