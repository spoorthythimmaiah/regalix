'use strict';

import PlayerView from './views/embed_player';
import 'cookies';

(()=>{  
    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    // Initialize Main view
    new PlayerView({'demo': document.demo, 'section': document.section, 'product': document.product});
})();
