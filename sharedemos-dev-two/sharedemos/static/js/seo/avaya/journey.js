'use strict';

import 'cookies';
import MasterJourneys from './views/journey';

(()=>{

    if(!SDCookies.hasItem('user_locale')){
        SDCookies.setItem('user_locale', document.current_locale, null, '/');
    }
    try {
        new MasterJourneys();      
    } catch (error){
        console.log('Journey Load Error: ', error);
    }

})()
