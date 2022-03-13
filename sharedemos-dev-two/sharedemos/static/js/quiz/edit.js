/*global require*/
'use strict';

require([
    './routers/router',
    './views/edit',
    '../helpers/sync',
    'cookies'
], function (QuizRouter, EditView) {
    if(!SDCookies.hasItem('author_locale')){
        SDCookies.setItem('author_locale', document.current_locale, null, '/');
    }
	document.favicon && $("link[rel*='shortcut']").attr("href", document.favicon);
    		
   	new QuizRouter();
	Backbone.history.start({hashChange:false, pushState:true, root:'/edit/quiz'});
	new EditView();
});