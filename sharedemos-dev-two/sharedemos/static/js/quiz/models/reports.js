'use strict';

import Backbone from 'backbone'

const ReportData = Backbone.Model.extend({

    urlRoot: "/api/quiz/reports",

});

export default ReportData;