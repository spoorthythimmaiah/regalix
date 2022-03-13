/*global require*/
'use strict';
import Backbone from 'backbone';

import * as Router from './routers/router';

document.initializePlayer = (args) => {
    // Set User Locale.
    if (!SDCookies.hasItem('user_locale')) {
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }

    let {chapterID, productID, sectionID, slideIndex} = args;

    // Initialize Player Routing and Start Backbone.history().
    new Router({ productID, sectionID, chapterID, slideIndex });

    let chapterRoot = `/t/${sectionID}/`,
        chapterUrl = `${chapterRoot + chapterID}/${parseInt(slideIndex) > 1 ? slideIndex : ''}`;

    if (!window.history.state || !Object.entries(window.history.state).length) {
        window.history.pushState({
                'product': productID,
                'section': sectionID,
                'chapter': chapterID,
                'slideIndex': slideIndex
            },
            null,
            chapterUrl)
    }
    if (Backbone.History.started) {
        Backbone.history.stop();
    }
    document.page = 'Player';
    Backbone.history.start({ pushState: true, root: chapterRoot });
}
