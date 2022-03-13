/*global define */
'use strict';
import Backbone from 'backbone';
import HomeView from '../views/home';

const HelpSiteRouter = Backbone.Router.extend({
    routes: {
        "": "home"
    },

    initialize() {
        this.view = null;
        return this;
    },

    home() {
        this.loadView(new HomeView());
    },

    loadView(view) {
        if(this.view){
            this.view.undelegateEvents();
        }
        this.view = view;
    },

});


export default HelpSiteRouter;