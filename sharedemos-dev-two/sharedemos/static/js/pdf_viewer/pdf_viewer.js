/*global require*/
'use strict';

require([
    './views/pdf_viewer',
    'cookies',
    '../helpers/sync',
], function (PdfViewer) {
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    // Initialize PDF view
    let viewer = new PdfViewer();
    viewer.launchPdfViewer(document.pdf);
});
