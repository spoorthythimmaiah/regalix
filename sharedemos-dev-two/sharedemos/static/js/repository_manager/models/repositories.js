/*global define */
'use strict';
import Backbone from 'backbone';

const Repositories = Backbone.Model.extend({
    urlRoot: "/api/repository-connector/",
});

export default Repositories;