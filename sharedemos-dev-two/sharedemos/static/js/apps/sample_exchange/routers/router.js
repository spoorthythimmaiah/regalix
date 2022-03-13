'use strict';

import Backbone  from 'backbone';

import HomeView from '../views/home';
import SampleView from '../views/sample';


class Router extends Backbone.Router {

    constructor () {
        super();
    }
    // Define Backbone Routes.
    routes() { 
        return {
            '': 'home',
            ':sampleId': 'routeHandler'
        }
    }

    home() {
        new HomeView()
    }

    routeHandler(sampleId) {
        new SampleView(sampleId);
    }
}

export default Router;
