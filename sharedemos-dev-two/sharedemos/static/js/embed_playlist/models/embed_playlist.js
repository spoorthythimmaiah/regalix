/*global define */
'use strict';

import Backbone from 'backbone'

var EmbedPlaylist = Backbone.Model.extend({

    urlRoot: "/api/embed/",

});

export default EmbedPlaylist;