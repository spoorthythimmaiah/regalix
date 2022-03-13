'use strict';

import MasterJourney from '../../../apps/journeys/views/home'

var journeyView = MasterJourney.extend({

    events: {...MasterJourney.prototype.events,
        'click .filter-close-button, .filter-button': 'toggleFilterSection'
    },
 
    toggleFilterSection(){
        $('.filters-wrapper').toggle();
    },

});

export default journeyView
