(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./sharedemos/static/js/helpers/handlebars/localTime.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/js/helpers/handlebars/localTime.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (dateTime, options) {
  var localTime = new Date(dateTime);

  if (options && typeof options == "string") {
    options = JSON.parse(options);
  }

  var formattedDate = localTime.toUTCString();
  formattedDate = new Date(formattedDate).toLocaleString('en-US', options);
  return formattedDate;
};

/***/ }),

/***/ "./sharedemos/static/js/reports/models/reports_data.js":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/reports/models/reports_data.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var ReportsData = Backbone.Model.extend({
    urlRoot: "/api/reports/data"
  });
  return ReportsData;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/reports/models/reports_graph.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/js/reports/models/reports_graph.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var ReportsGraph = Backbone.Model.extend({
    urlRoot: "/api/reports/graph"
  });
  return ReportsGraph;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/reports/models/viewer_reports.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/js/reports/models/viewer_reports.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var ViewerReports = Backbone.Model.extend({
    urlRoot: "/api/reports/viewer"
  });
  return ViewerReports;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/social_share.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/social_share.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"col-xs-12\"> \r\n        <div class=\"=outside\">\r\n            <div class=\"total_shares col-md-6\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"total_shares") : depth0), depth0))
    + "</div>\r\n            <div class=\"col-md-6\" id=\"social_share_graph\"></div>\r\n        </div>\r\n        <div class='reports_data_list col-md-6'>\r\n            <div class=\"reports_header col-xs-12\">\r\n                <div class=\"col-xs-10\"><span>SOCIAL CHANNEL</span></div>\r\n                <div class=\"col-xs-2 text-right\"><span>SHARES</span></div>\r\n            </div>\r\n            <div class=\"reports_list\" id=\"social_share_reports\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"social_shares") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":20,"column":25}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"reports_data_row col-xs-12\">\r\n                        <div class=\"col-xs-2\"><i class=\"fa fa-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "-square\"></i></div>\r\n                        <div class=\"col-xs-8 social-share-label\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"label") : depth0), depth0))
    + "</div>\r\n                        <div class=\"col-xs-2 text-right\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"data") : depth0), depth0))
    + "</div>\r\n                    </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"no-report\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"No data available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":27},"end":{"line":25,"column":56}}}))
    + "</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4>Social Sharing</h4>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"total_shares") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":26,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/viewer_detail.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/viewer_detail.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <span class=\"group-name "
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <span>First time on-boarding on "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/localTime.js */ "./sharedemos/static/js/helpers/handlebars/localTime.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"onboard_at") : depth0),"{\"month\": \"long\", \"day\": \"numeric\", \"year\": \"numeric\"}",{"name":"localTime","hash":{},"data":data,"loc":{"start":{"line":14,"column":52},"end":{"line":14,"column":133}}}))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"detail-popup\" class=\"details-popUpModal\">\n    <div class=\"details-content\" id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"user_id") : depth0), depth0))
    + ">\n        <div class=\"details-closeButton\">\n            <span class=\"details-closebtn\">&times;</span>\n        </div>\n        <div class=\"details-header\">\n            <img class=\"profile\" data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"initials") : depth0), depth0))
    + "\" picture-url=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"profile_picture") : depth0), depth0))
    + "\">\n            <div class=\"name-content\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"fullname") : depth0), depth0))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":11,"column":25}}})) != null ? stack1 : "")
    + "                <br>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"onboard_at") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":16},"end":{"line":15,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </div>\n        <div class=\"popup-userStatus\">\n            <div class=\"viewer-sub-title\">User Status</div>\n            <div class=\"custom-dropdown\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 col-xs-12 custom-date\">\n                        <div class=\"viewer-subtitle-custom\">\n                            From\n                        </div>\n                        <input id=\"fromDate\" type=\"text\" name=\"from-date\" class=\"datepicker-here\" readonly=\"true\">\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 custom-date\">\n                        <div class=\"viewer-subtitle-custom\">\n                            To\n                        </div>\n                        <input id=\"toDate\" type=\"text\" name=\"to-date\" class=\"datepicker-here\" readonly=\"true\">\n                    </div>\n                </div>\n            </div>\n            <div class=\"time-interval\">\n                <span class=\"viewer-interval\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"dateTitle") : depth0), depth0))
    + "</span>\n                <ul class=\"viewer-time-menu\" id='viewer-metrics'>\n                    <li data-attr='today' data-title='today'>today</li>\n                    <li data-attr='yesterday' data-title='yesterday'>yesterday</li>\n                    <li data-attr='week' data-title='Last 7 Days'>1 week</li>\n                    <li data-attr='month' data-title='Last 30 days'>30 days</li>\n                    <li data-attr='quarter' data-title='Last 3 months'>3 months</li>\n                    <li data-attr='half-year' data-title='Last 6 months'>6 months</li>\n                    <li data-attr='year' data-title='Last 12 months'>12 months</li>\n                    <li data-attr='custom' data-title='Custom Days'>Custom</li>\n                </ul>\n            </div>\n        </div>\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/reports/templates/viewer_report.handlebars */ "./sharedemos/static/js/reports/templates/viewer_report.handlebars"),depth0,{"name":"viewer_report","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/viewer_report.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/viewer_report.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "dn";
},"3":function(container,depth0,helpers,partials,data) {
    return "up";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"viewer-report\">\n    <div class=\"card-block\">\n        <div class=\"viewer-card\">\n            <h6>Chapters Consumed</h6>\n            <div class=\"details-count\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_views") : depth0)) != null ? lookupProperty(stack1,"count") : stack1), depth0))
    + "</div>\n            <div class=\"cards_stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":36},"end":{"line":6,"column":91}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":91},"end":{"line":6,"column":147}}})) != null ? stack1 : "")
    + "\">\n                <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":7,"column":22},"end":{"line":7,"column":61}}}))
    + "&#37 from last period</span>\n            </div>\n        </div>\n        <div class=\"viewer-card\">\n            <h6>Completion Rate</h6>\n            <div class=\"details-count\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"completion_rate") : depth0)) != null ? lookupProperty(stack1,"percentage") : stack1), depth0))
    + "&#37</div>\n            <div class=\"cards_stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"completion_rate") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":36},"end":{"line":13,"column":93}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"completion_rate") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":93},"end":{"line":13,"column":151}}})) != null ? stack1 : "")
    + "\">\n                <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"completion_rate") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":14,"column":22},"end":{"line":14,"column":63}}}))
    + "&#37 from last period</span>\n            </div>\n        </div>\n        <div class=\"viewer-card\">\n            <h6>Most visited chapter</h6>\n            <div>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"most_visited_chapter") : depth0), depth0))
    + "</div>  \n        </div>\n    </div>\n    <div class=\"graph-align\">\n        <h3>Views</h3>\n        <div id=\"graph-block\"></div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/viewers.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/viewers.handlebars ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"viewer-row\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"user_id") : depth0), depth0))
    + "\">\n    <div class=\"viewer-name\">\n        <img class=\"profile\" data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"initials") : depth0), depth0))
    + "\" picture-url=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"profile_picture") : depth0), depth0))
    + "\">\n        <div class=\"name-block\">\n            <span class=\"name\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"fullname") : depth0), depth0))
    + "</span><br>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":9,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"email\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"email") : depth0), depth0))
    + "</div>\n    <div class=\"date-added\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/localTime.js */ "./sharedemos/static/js/helpers/handlebars/localTime.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"date_added") : depth0),"{\"year\": \"numeric\", \"month\": \"2-digit\", \"day\": \"2-digit\"}",{"name":"localTime","hash":{},"data":data,"loc":{"start":{"line":13,"column":28},"end":{"line":13,"column":112}}}))
    + "</div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <span class=\"group-name "
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <nav>\n        <ul class=\"pagination\">\n            <li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"prevDisable") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":33},"end":{"line":19,"column":80}}})) != null ? stack1 : "")
    + "\"  data-page=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pagePrev") : stack1), depth0))
    + "\" >\n                <a class=\"page-link\">Previous</a>\n            </li>\n            \n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pages") : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":12},"end":{"line":27,"column":21}}})) != null ? stack1 : "")
    + "\n            <li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"nextDisable") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":33},"end":{"line":29,"column":80}}})) != null ? stack1 : "")
    + "\"  data-page=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pageNext") : stack1), depth0))
    + "\">\n                <a class=\"page-link\">Next</a>\n            </li>\n        </ul>\n    </nav>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentPage") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":37},"end":{"line":24,"column":71}}})) != null ? stack1 : "")
    + "\"  data-page="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"pageNo") : depth0), depth0))
    + ">\n                    <a class=\"page-link\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"pageNo") : depth0), depth0))
    + "</a>\n                </li>    \n";
},"8":function(container,depth0,helpers,partials,data) {
    return " active ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"viewers") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":15,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"is_paginated") : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":0},"end":{"line":34,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/views/reports.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/reports/views/reports.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/reports_data */ "./sharedemos/static/js/reports/models/reports_data.js"), __webpack_require__(/*! ../models/reports_graph */ "./sharedemos/static/js/reports/models/reports_graph.js"), __webpack_require__(/*! ../models/viewer_reports */ "./sharedemos/static/js/reports/models/viewer_reports.js"), __webpack_require__(/*! ../templates/site_traffic.handlebars */ "./sharedemos/static/js/reports/templates/site_traffic.handlebars"), __webpack_require__(/*! ../templates/trending_chapters.handlebars */ "./sharedemos/static/js/reports/templates/trending_chapters.handlebars"), __webpack_require__(/*! ../templates/referrals.handlebars */ "./sharedemos/static/js/reports/templates/referrals.handlebars"), __webpack_require__(/*! ../templates/geography.handlebars */ "./sharedemos/static/js/reports/templates/geography.handlebars"), __webpack_require__(/*! ../templates/social_share.handlebars */ "./sharedemos/static/js/reports/templates/social_share.handlebars"), __webpack_require__(/*! ../templates/viewer_detail.handlebars */ "./sharedemos/static/js/reports/templates/viewer_detail.handlebars"), __webpack_require__(/*! ../templates/viewers.handlebars */ "./sharedemos/static/js/reports/templates/viewers.handlebars"), __webpack_require__(/*! ../templates/viewer_report.handlebars */ "./sharedemos/static/js/reports/templates/viewer_report.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, ReportsData, ReportsGraph, ViewerReports, SiteTrafficTemplate, TrendingChaptersTemplate, ReferralsTemplate, GeographyTemplate, SocialShareTemplate, ViewerDetailTemplate, ViewersTemplate, ViewerReportTemplate) {
  'use strict';

  var ReportsView = Backbone.View.extend({
    el: '#library_reports',
    REFERRAL_GRAPH_COLORS: ["#0a316b", "#0948a7", "#0156d5", "#066afe", "#639bfc", "#95b5f2", "#b5ccf6", "#cfddf7", "#ebf1fc", "#e9e9e9"],
    SOCIAL_MEDIA_GRAPH_COLORS: ["#0bae5b", "#2fbd75", "#58d996", "#83eeb8"],
    VIEWERS_LIST: {},
    VIEWERS_PER_PAGE: 20,
    events: {
      'click .dd-menu li': 'filterReports',
      'click .load_more_reports': 'loadMore',
      'click .sort': 'sortPopularChapters',
      'click .viewer-row:not(.disabled)': 'viewerPopupShow',
      'click .time-interval': function (event) {
        this.$(event.currentTarget).children('.viewer-time-menu').toggle();
      },
      'click .viewer-time-menu li': 'filterViewerData',
      'click #detail-popup .details-closebtn': 'viewerPopupClose',
      'click .page-item': 'renderViewersByPage',
      'change #multiselect': function () {
        this.fetchViewers();
      }
    },
    initialize: function () {
      this.$('#multiselect').multiselect({
        allSelectedText: 'All',
        includeSelectAllOption: true
      }).multiselect('selectAll', false).multiselect('updateButtonText');
      var fromDateElem = $('#from-date'),
          toDateElem = $('#to-date');
      var root = this;
      fromDateElem.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: function (selectedDate, date) {
          var toDate = toDateElem.val();
          toDateElem.datepicker().data('datepicker').update('minDate', date);

          if (selectedDate && toDate) {
            root.loadReports({
              'date_range': 'custom',
              'from_date': selectedDate,
              'to_date': toDate,
              'category_id': $('#categories li.active').attr('data-attr')
            });
          }
        }
      });
      toDateElem.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: function (selectedDate, date) {
          var fromDate = fromDateElem.val();
          fromDateElem.datepicker().data('datepicker').update('maxDate', date || new Date());

          if (selectedDate && fromDate) {
            root.loadReports({
              'date_range': 'custom',
              'from_date': fromDate,
              'to_date': selectedDate,
              'category_id': $('#categories li.active').attr('data-attr')
            });
          }
        }
      });

      if (document.fromDate && document.toDate) {
        if (document.categoryId == 'all') {
          this.$('.category-dd .category').html('All Categories');
        } else {
          this.$('.category-dd .category').html(document.categoryId);
        }

        this.$('#categories li, #metrics li').removeClass('active');
        this.$('#categories li[data-attr="' + document.categoryId + '"]').addClass('active');
        this.$('.time-interval-dd .interval').html('custom');
        this.$('#metrics li[data-attr="' + document.dateRange + '"]').addClass('active');
        this.$('.custome-date').show();
        var f_date = new Date(document.fromDate);
        var t_date = new Date(document.toDate);
        this.$('#from-date').data('datepicker').selectDate(new Date(f_date.getTime() + f_date.getTimezoneOffset() * 60000));
        this.$('#to-date').data('datepicker').selectDate(new Date(t_date.getTime() + t_date.getTimezoneOffset() * 60000));
      } else {
        this.loadReports({
          'date_range': 'week',
          'category_id': 'all'
        });
      }

      if (!document.isAuthor) {
        $('#content_menu li').removeClass('active');
        $('#content_menu, .nav-pills li[role="overview"]').addClass('disabled');
        $('#home-icon').attr('href', '');
      }
    },
    filterViewerData: function (event) {
      let date = event.target.dataset;
      let dateRange = date.attr,
          dateTitle = date.title;
      this.$('.time-interval .viewer-interval').html(dateTitle);
      this.$('#viewer-metrics li').removeClass('active');
      this.$(event.target).addClass('active');

      if (dateRange == 'custom') {
        this.$('.custom-date').show();
        this.customDate();
      } else {
        this.$('.custom-date').hide();
        let args = {
          'date_range': dateRange,
          'category_id': this.$('#categories li.active').data('attr')
        };
        this.renderViewerData(args);
      }
    },
    customDate: function () {
      let dateRange = this.$('#metrics li.active').attr('data-attr'),
          fromDateEle = this.$('#fromDate'),
          toDateEle = this.$('#toDate'); // allow user to select different date range

      if (dateRange == 'custom') {
        let selectedFromDate = this.$('#from-date').val(),
            selectedToDate = this.$('#to-date').val();
        fromDateEle = this.$('#fromDate').val(selectedFromDate);
        toDateEle = this.$('#toDate').val(selectedToDate);
      }

      let root = this;
      fromDateEle.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: function (selectedDate, date) {
          let toDate = toDateEle.val();
          toDateEle.datepicker().data('datepicker').update('minDate', date);

          if (selectedDate && toDate) {
            root.renderViewerData({
              'date_range': 'custom',
              'from_date': selectedDate,
              'to_date': toDate,
              'category_id': root.$('#categories li.active').data('attr')
            });
          }
        }
      });
      toDateEle.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: function (selectedDate, date) {
          let fromDate = fromDateEle.val();
          fromDateEle.datepicker().data('datepicker').update('maxDate', date || new Date());

          if (selectedDate && fromDate) {
            root.renderViewerData({
              'date_range': 'custom',
              'from_date': fromDate,
              'to_date': selectedDate,
              'category_id': root.$('#categories li.active').data('attr')
            });
          }
        }
      });
    },
    renderViewerData: function (args) {
      let userId = this.userId,
          root = this;
      let viewerReports = new ViewerReports({
        'id': userId
      });
      viewerReports.fetch({
        data: args
      }).done(function (response) {
        response.dateRange = args.date_range;

        if (response.chapter_views.count) {
          root.$('#viewer-report').html(ViewerReportTemplate(response));
          root.loadViewerGraph(response);
        } else {
          root.$('#viewer-report').html('<div class="no-data">No data available</div>');
        }
      });
    },
    filterReports: function (event) {
      var date_range = 'week';
      var category_id = 'all';

      if (event.target.parentElement.id == 'metrics') {
        date_range = event.target.getAttribute('data-attr');
        this.$('.time-interval-dd .interval').html(date_range);
        this.$('#metrics li').removeClass('active');
        this.$(event.target).addClass('active');

        if (date_range == 'custom') {
          $('.custome-date').show();
          return false;
        } else {
          $('.custome-date').hide();
        }

        this.$('#from-date').data('datepicker').clear();
        this.$('#to-date').data('datepicker').clear();
        category_id = $('#categories li.active').attr('data-attr');
        this.$('.time-interval-dd .interval').html(event.target.getAttribute('data-title'));
        this.$('#metrics li').removeClass('active');
        this.$(event.target).addClass('active');
      } else if (event.target.parentElement.id == 'categories') {
        let categoryData = this.$(event.target).data();
        category_id = categoryData.attr;
        let categoryName = categoryData.attr;
        date_range = this.$('#metrics li.active').attr('data-attr');

        if (category_id == 'all') {
          this.$('.category-dd .category').html('All Categories');
        } else {
          this.$('.category-dd .category').html(categoryName);
        }

        this.$('#categories li').removeClass('active');
        this.$(event.target).addClass('active');
      }

      var attrs = {
        'date_range': date_range,
        'category_id': category_id
      };

      if (date_range == 'custom') {
        var from_date = $('#from-date').datepicker().data('datepicker');
        var to_date = $('#to-date').datepicker().data('datepicker');

        if (from_date.selectedDates.length && to_date.selectedDates.length) {
          attrs['from_date'] = $('#from-date').val();
          attrs['to_date'] = $('#to-date').val();
          this.loadReports(attrs);
        }
      } else {
        this.loadReports(attrs);
      }
    },
    loadReports: function (data) {
      $("<div id='loading_data'></div>").appendTo('#main_container');
      var numbers_loaded = false;
      var graphs_loaded = false;
      var reports_data = new ReportsData();
      var root = this;

      if (document.isPrivateTenant) {
        root.fetchViewers();
      }

      reports_data.fetch({
        data: data
      }).done(function (response) {
        root.$('#user_analytics').html(SiteTrafficTemplate({
          'users': response.site_visitors,
          'views': response.demo_views,
          'completions': {
            'percentage': response.completion_rate.count,
            'progress': response.completion_rate.progress
          }
        }));
        root.$('[data-toggle="popover"]').popover({
          html: true
        });
        root.trending_chapters = response.trending_chapters;
        root.sort_chapters_by = 'views';
        root.loadMoreChapters = false;
        root.loadTrendingChapters();
      }).fail(function (response) {
        console.log('Loading numbers data failed...');
      }).always(function () {
        numbers_loaded = true;

        if (graphs_loaded) {
          $('#loading_data')[0].remove();
        }
      });
      var reports_graph = new ReportsGraph();
      reports_graph.fetch({
        data: data
      }).done(function (response) {
        root.loadVisitorsVsViewsGraph(response.visitors_vs_views);
        root.loadTrendingCategories(response);
        root.loadReferrals(response);
        root.loadGeography(response);

        if (response.social_shares) {
          root.loadSocialShareData(response.social_shares);
        }
      }).fail(function (response) {
        console.log('Loading graph data failed...');
      }).always(function () {
        graphs_loaded = true;

        if (numbers_loaded) {
          $('#loading_data')[0].remove();
        }
      });
    },
    getFilters: function () {
      let dateRange = this.$('#metrics li.active').data('attr'),
          groupIds = [];

      _.each(this.$('#multiselect option:selected'), element => groupIds.push(element.value));

      if (dateRange == 'custom') {
        let fromDate = this.$('#from-date').datepicker().data('datepicker'),
            toDate = this.$('#to-date').datepicker().data('datepicker');

        if (fromDate.selectedDates.length && toDate.selectedDates.length) {
          var selectedFromDate = this.$('#from-date').val(),
              selectedToDate = this.$('#to-date').val();
        }
      }

      return {
        'date_range': dateRange,
        'from_date': selectedFromDate,
        'to_date': selectedToDate,
        'category_id': this.$('#categories li.active').data('attr'),
        'group_ids': groupIds
      };
    },
    fetchViewers: function (currentPage = 1) {
      let root = this,
          args = this.getFilters();
      args.page = currentPage;
      root.groupIds = args.group_ids;
      root.$('#viewers-block').empty().addClass('loading-viewers');
      let viewers_data = new ViewerReports();
      viewers_data.fetch({
        data: args,
        traditional: true
      }).done(function (response) {
        root.paginationDetails = response.pagination_details; // need page-no as additional info along with response.

        response.page = currentPage;
        root.updateViewersList(response);
        root.renderViewers(response);
      });
    },
    renderViewersByPage: function (event) {
      let currentPage = parseInt(this.$(event.currentTarget).data('page'));

      if (this.VIEWERS_LIST[currentPage]) {
        let args = {
          'viewers': this.VIEWERS_LIST[currentPage],
          'page': currentPage,
          'pagination_details': this.paginationDetails
        };
        this.renderViewers(args);
      } else {
        this.fetchViewers(currentPage);
      }
    },
    paginate: function (pageNo, totalViewers) {
      let pagination = {
        is_paginated: true
      };
      let noOfPages = parseInt(totalViewers / this.VIEWERS_PER_PAGE);

      if (noOfPages == 0) {
        pagination.is_paginated = false;
      } else if (noOfPages != 0 && totalViewers % this.VIEWERS_PER_PAGE > 0) {
        noOfPages += 1;
      }

      if (pageNo == 1) {
        pagination.prevDisable = true;
      } else if (pageNo == noOfPages) {
        pagination.nextDisable = true;
      }

      ;
      pagination.pagePrev = pageNo - 1;
      pagination.pageNext = pageNo + 1;
      let startPageNo, endPageNo;

      if (noOfPages <= 4) {
        startPageNo = 1;
        endPageNo = noOfPages;
      } else {
        if (pageNo < 4) {
          startPageNo = 1;
          endPageNo = 4;
        } else {
          /*when user clicks 4 next concurrent 4 page numbers will be displayed
              if data avaliable for all pages*/
          startPageNo = parseInt(pageNo / 4) * 4;
          endPageNo = startPageNo + 4;

          if (endPageNo >= noOfPages) {
            startPageNo = noOfPages - 4;
            endPageNo = noOfPages;
          }
        }
      }

      pagination.pages = [];

      for (var i = startPageNo; i <= endPageNo; i++) {
        var page = {
          "pageNo": i
        };

        if (i == pageNo) {
          page.currentPage = true;
        }

        ;
        pagination["pages"].push(page);
      }

      ;
      return pagination;
    },
    loadViewerGraph: function (response) {
      let views = [],
          root = this,
          graph = response.graph_data,
          chart_interval = 86400000,
          completion_rate = response.graph_data.completion_rate;

      if (graph.slots.length > 0) {
        response.graph_data.demo_views.map(function (val, index) {
          views.push([root.getGraphDate(graph.slots[index]), val]);
        });
        let dateRange = response.dateRange,
            tick_size = 'day',
            unit_between = 1,
            format = "%b\n\n%d",
            Max = 0,
            Min = 0,
            multiplier = 2;

        switch (dateRange) {
          case 'today':
            multiplier = 0.5;
            tick_size = 'day';
            break;

          case 'yesterday':
            multiplier = 0.5;
            tick_size = 'day';
            break;

          case 'week':
            multiplier = 0.5;
            tick_size = 'day';
            unit_between = 1;
            break;

          case 'month':
            multiplier = 1.5;
            unit_between = 3;
            break;

          case 'quarter':
            multiplier = 3.5;
            unit_between = 7;
            break;

          case 'half-year':
            multiplier = 7;
            unit_between = 14;
            break;

          case 'year':
            multiplier = 15.5;
            tick_size = 'month';
            format = "%b";
            break;

          case 'custom':
            if (graph.slots.length) {
              let dayone = root.getGraphDate(graph.slots[0]);
              let daytwo = root.getGraphDate(graph.slots[graph.slots.length - 1]);
              let daysdiff = root.dayDifference(dayone, daytwo);

              if (daysdiff >= 730) {
                //2years~
                tick_size = 'year';
                format = "%Y";
                multiplier = 365;
              } else if (daysdiff >= 365) {
                //year
                tick_size = 'month';
                format = "%b";
                multiplier = 15.5;
              } else if (daysdiff >= 108) {
                //half-year~
                unit_between = 14;
                multiplier = 7;
              } else if (daysdiff >= 54) {
                //Quarter~
                unit_between = 7;
                multiplier = 3.5;
              } else if (daysdiff >= 28) {
                //Month~
                unit_between = 3;
                multiplier = 1.5;
              } else {
                multiplier = 2;
              }
            }

            break;
        }

        Max = root.getGraphDate(graph.slots[graph.slots.length - 1]) + chart_interval * multiplier;
        Min = root.getGraphDate(graph.slots[0]) - chart_interval * multiplier;
        $.plot("#graph-block", [{
          data: views,
          label: 'Demo Views Curve',
          curvedLines: {
            apply: true,
            monotonicFit: true,
            fill: true
          },
          points: {
            symbol: "circle",
            fillColor: "#1e9fb4",
            radius: 5,
            show: true
          },
          lines: {
            show: true,
            fill: true
          }
        }], {
          grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#ecf1f5",
            borderWidth: 0,
            margin: 30
          },
          legend: false,
          xaxis: {
            max: Max,
            min: Min,
            mode: "time",
            timeformat: format,
            tickSize: [unit_between, tick_size],
            tickLength: 0
          },
          colors: ['rgba(30, 159, 180, 0.5)']
        });
        $("#graph-block").bind("plothover", function (event, pos, item) {
          $("#tooltip").remove();

          if (item) {
            if (item.series.label === 'Demo Views Curve') {
              let tooltip = "No Views";
              let hoverPoint = completion_rate[item.dataIndex];
              let chapterName = Object.keys(hoverPoint)[0];
              let chCompleteRate = hoverPoint[chapterName] && hoverPoint[chapterName].toFixed(2);

              if (hoverPoint) {
                tooltip = `The demo ${chapterName} is consumed ${chCompleteRate} %`;
              }

              $('<div id="tooltip">' + tooltip + '</div>').css({
                'top': 0,
                'left': 150
              }).appendTo("#graph-block").fadeIn(200);
            }
          }
        });
      } else {
        this.$('#graph-block').html('<div class="no-record">No Records Found</div>');
      }
    },
    updateViewersList: function (data) {
      let viewer = data.viewers,
          pageIndex = this.paginationDetails.start_page; //push the split array with index

      this.allViewerList = _.chunk(viewer, this.VIEWERS_PER_PAGE);

      _.each(this.allViewerList, (ele, index) => {
        this.VIEWERS_LIST[pageIndex] = this.allViewerList[index];
        pageIndex += 1;
      });
    },
    renderViewers: function (data) {
      let viewerList = {},
          totalViewers = this.paginationDetails.total_viewers;
      viewerList.viewers = this.VIEWERS_LIST[data.page];
      this.$('.viewer-header .viewers-count').html(this.groupIds.length ? totalViewers : 0); //to build the pagination if the viewer count is greater than 20

      if (totalViewers > this.VIEWERS_PER_PAGE) {
        viewerList.pagination = this.paginate(data.page, totalViewers);
      }

      if (data.viewers.length && this.groupIds.length) {
        this.$('.report-viewers-block #viewers-block').html(ViewersTemplate(viewerList));
        this.updateProfilePic();
      } else {
        this.$('#viewers-block').html('<div class="no-viewer-report">No Records Found</div>');
      }

      this.$('#viewers-block').removeClass('loading-viewers');
    },
    updateProfilePic: function () {
      _.each($('.profile'), function (element, index) {
        $(element).attr({
          'data-height': 34,
          "data-width": 34,
          "data-char-count": 2,
          "data-font-size": 14
        }).initial().css({
          'border-radius': '50px',
          '-moz-border-radius': '50px'
        });
        var pic_url = $(element).attr('picture-url');

        if (pic_url) {
          var img = new Image();

          img.onload = function () {
            $(element).attr('src', pic_url);
          };

          img.src = pic_url;
        }
      });
    },
    viewerPopupShow: function (e) {
      if (this.$(".viewer-row").hasClass('selected')) {
        return;
      }

      this.$(".viewer-row").addClass("selected");
      let args = this.getFilters(),
          userId = parseInt(this.$(e.currentTarget).data('id')),
          dateTitle = this.$('#metrics li.active').data('title'),
          root = this;
      this.userId = userId;
      let selectedViewer = new ViewerReports({
        'id': userId
      });
      selectedViewer.fetch({
        data: args
      }).done(function (response) {
        response.dateTitle = dateTitle;
        response.dateRange = args.date_range;
        root.$('#viewer-popup').html(ViewerDetailTemplate(response)).show(); // To display the custom date

        if (args.date_range == 'custom') {
          root.$('.custom-date').show();
          root.customDate();
        }

        root.$(".details-popUpModal").addClass("bounceInDown").show();
        root.updateProfilePic();
        root.loadViewerGraph(response);
      });
      return this;
    },
    viewerPopupClose: function () {
      this.$(".details-popUpModal").hide();
      this.$(".viewer-row").removeClass("selected");
    },
    loadTrendingChapters: function () {
      let tr_ch = this.trending_chapters;
      let first_sort_by = this.sort_chapters_by == 'views' ? 'completion_rate' : 'views';
      let sec_sort_by = this.sort_chapters_by;
      tr_ch = _.chain(tr_ch).sortBy(first_sort_by).sortBy(sec_sort_by).reverse().value();
      tr_ch = _.first(tr_ch, 10);
      this.$('.most_popular_chapters .data_block').html(TrendingChaptersTemplate({
        'trending_chapters': tr_ch,
        'sort_by': this.sort_chapters_by,
        'load_more': this.loadMoreChapters
      }));
    },
    sortPopularChapters: function (event) {
      if ($(event.target).parent().hasClass('active')) {
        return true;
      }

      this.sort_chapters_by = this.sort_chapters_by == 'views' ? 'completion_rate' : 'views';
      this.loadTrendingChapters();
    },
    loadGeography: function (response) {
      let geography_list = _.map(response.geography, function (val, key) {
        return val;
      });

      this.$('.geography_chart_block').html(GeographyTemplate({
        'geography': geography_list
      }));

      if (!$.isEmptyObject(response.geography)) {
        let mapGeoJSON = Highcharts.maps['custom/world'],
            data = []; // Generate non-random data for the map

        var country_iso_code_key = 'iso-a2';

        _.each(mapGeoJSON.features, function (feature, index) {
          let countryISOCode = feature.properties[country_iso_code_key];
          let visit_count = response.geography[countryISOCode] && response.geography[countryISOCode]['count'] || 0;
          data.push({
            key: countryISOCode,
            value: visit_count
          });
        }); // Instantiate chart


        $("#geography").highcharts('Map', {
          title: {
            text: ''
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          navigation: {
            buttonOptions: {
              enabled: false
            }
          },
          colorAxis: {
            min: 0,
            stops: [[0, '#EFEFFF'], [0.5, Highcharts.getOptions().colors[0]], [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]]
          },
          legend: {
            enabled: false
          },
          series: [{
            data: data,
            mapData: mapGeoJSON,
            joinBy: [country_iso_code_key, 'key'],
            name: 'Visits',
            states: {
              hover: {
                color: Highcharts.getOptions().colors[2]
              }
            }
          }, {
            type: 'mapline',
            name: "Separators",
            data: Highcharts.geojson(mapGeoJSON, 'mapline'),
            nullColor: 'gray',
            showInLegend: false,
            enableMouseTracking: false
          }]
        });
      }
    },
    loadReferrals: function (response) {
      let attrs = {},
          referrals = response.referrals;
      attrs['total_referrals'] = referrals.reduce((sum, referral) => sum + referral.count, 0);
      attrs['referrals'] = referrals;
      $('.referral_chart_block').html(ReferralsTemplate(attrs));

      if (response.referrals.length > 0) {
        var referral_list = referrals.map(({
          count: data,
          name: label
        }) => ({
          data,
          label
        })); // Instantiate Pie Chart

        $.plot("#referral", referral_list, {
          series: {
            pie: {
              show: true,
              innerRadius: .5,
              shadow: {
                top: 5,
                left: 15,
                alpha: .3
              },
              stroke: {
                width: 0
              },
              label: {
                show: false,
                radius: 3 / 4,
                background: {
                  opacity: 0,
                  color: '#000'
                },
                threshold: 0.1
              },
              highlight: {
                opacity: .08
              }
            }
          },
          grid: {
            hoverable: true,
            clickable: true
          },
          colors: this.REFERRAL_GRAPH_COLORS,
          legend: {
            show: false
          }
        });
        this.$("#referral").bind("plothover", function (event, pos, item) {
          $("#tooltip").remove();

          if (item) {
            let tooltip = item.series.label + ' : ' + parseFloat(item.series.percent).toFixed(2) + '%';
            $('<div id="tooltip">' + tooltip + '</div>').css({
              top: pos.pageY - 50,
              left: pos.pageX - 70
            }).appendTo("body").fadeIn(200);
          }
        });
      }
    },
    loadTrendingCategories: function (response) {
      if (response.trending_categories.length > 0) {
        let trending_categories = [];
        let x_axis_labels = [];

        _.each(response.trending_categories, function (val, index) {
          let word = val.views == 1 ? ' View' : ' Views';
          trending_categories.push([index, val.views, val.section + ' : ' + val.views + word]);

          if (val.section.length > 10) {
            val.section = val.section.substring(0, 10) + '...';
          }

          x_axis_labels.push([index, val.section]);
        });

        $.plot($("#top_trending_cat_chart"), [{
          data: trending_categories,
          label: "Page Views"
        }], {
          series: {
            bars: {
              order: 2,
              align: "center",
              show: true,
              lineWidth: 1,
              barWidth: .6,
              fill: true,
              fillColor: {
                colors: [{
                  opacity: 1
                }, {
                  opacity: 1
                }]
              }
            },
            shadowSize: 2
          },
          legend: {
            show: !1
          },
          grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#ecf1f5",
            borderWidth: 0,
            margin: 30
          },
          colors: ["#ffc40d"],
          xaxis: {
            autoscaleMargin: 0,
            ticks: x_axis_labels,
            tickDecimals: 0,
            tickLength: 0
          },
          yaxis: {
            autoscaleMargin: .5,
            ticks: 5,
            tickDecimals: 0
          }
        });
        this.$("#top_trending_cat_chart").bind("plothover", function (event, pos, item) {
          $("#tooltip").remove();

          if (item) {
            let tooltip = item.series.data[item.dataIndex][2];
            $('<div id="tooltip">' + tooltip + '</div>').css({
              top: item.pageY - 50,
              left: item.pageX - 70
            }).appendTo("body").fadeIn(200);
          }
        });
      } else {
        this.$('#top_trending_cat_chart').html('<div class="no-report">No Records Found</div');
      }
    },
    loadVisitorsVsViewsGraph: function (response) {
      let visitors = [],
          views = [],
          root = this,
          chart_interval = 86400000;

      if (response.slots.length > 0) {
        response.site_visitors.map(function (val, index) {
          visitors.push([root.getGraphDate(response.slots[index]), val]);
        });
        response.demo_views.map(function (val, index) {
          views.push([root.getGraphDate(response.slots[index]), val]);
        });
        let date_range = $('#metrics li.active').attr('data-attr'),
            tick_size = 'day',
            unit_between = 1,
            format = "%b\n\n%d",
            Max = 0,
            Min = 0,
            multiplier = 2;

        switch (date_range) {
          case 'today':
            multiplier = 0.5;
            tick_size = 'day';
            break;

          case 'yesterday':
            multiplier = 0.5;
            tick_size = 'day';
            break;

          case 'week':
            multiplier = 0.5;
            tick_size = 'day';
            unit_between = 1;
            break;

          case 'month':
            multiplier = 1.5;
            unit_between = 3;
            break;

          case 'quarter':
            multiplier = 3.5;
            unit_between = 7;
            break;

          case 'half-year':
            multiplier = 7;
            unit_between = 14;
            break;

          case 'year':
            multiplier = 15.5;
            tick_size = 'month';
            format = "%b";
            break;

          case 'custom':
            if (response.slots.length) {
              let dayone = root.getGraphDate(response.slots[0]);
              let daytwo = root.getGraphDate(response.slots[response.slots.length - 1]);
              let daysdiff = root.dayDifference(dayone, daytwo);

              if (daysdiff >= 730) {
                //2years~
                tick_size = 'year';
                format = "%Y";
                multiplier = 365;
              } else if (daysdiff >= 365) {
                //year
                tick_size = 'month';
                format = "%b";
                multiplier = 15.5;
              } else if (daysdiff >= 108) {
                //half-year~
                unit_between = 14;
                multiplier = 7;
              } else if (daysdiff >= 54) {
                //Quarter~
                unit_between = 7;
                multiplier = 3.5;
              } else if (daysdiff >= 28) {
                //Month~
                unit_between = 3;
                multiplier = 1.5;
              } else {
                multiplier = 2;
              }
            }

            break;
        }

        Max = root.getGraphDate(response.slots[response.slots.length - 1]) + chart_interval * multiplier;
        Min = root.getGraphDate(response.slots[0]) - chart_interval * multiplier;
        $.plot("#spline_chart", [{
          data: visitors,
          label: 'Site Visitors Curve',
          curvedLines: {
            apply: true,
            monotonicFit: true
          }
        }, {
          data: views,
          label: 'Demo Views Curve',
          curvedLines: {
            apply: true,
            monotonicFit: true
          }
        }, {
          data: views,
          label: 'Demo Views',
          points: {
            symbol: "circle",
            fillColor: "#1e9fb4",
            radius: 5,
            show: true
          },
          lines: {
            show: false
          }
        }, {
          data: visitors,
          label: 'Site Visitors',
          points: {
            symbol: "square",
            fillColor: "#222838",
            radius: 5,
            show: true
          },
          lines: {
            show: false
          }
        }], {
          series: {
            curvedLines: {
              active: true
            },
            lines: {
              show: true,
              fill: true,
              fillColor: {
                colors: [{
                  opacity: 1
                }, {
                  opacity: 1
                }]
              }
            }
          },
          grid: {
            hoverable: true,
            clickable: true,
            tickColor: "#ecf1f5",
            borderWidth: 0,
            margin: 30
          },
          legend: false,
          xaxis: {
            max: Max,
            min: Min,
            mode: "time",
            timeformat: format,
            tickSize: [unit_between, tick_size],
            tickLength: 0
          },
          colors: ['rgba(34, 40, 56, 0.5)', 'rgba(30, 159, 180, 0.5)']
        });
        $("#spline_chart").bind("plothover", function (event, pos, item) {
          $("#tooltip").remove();

          if (item) {
            if (item.series.label === 'Site Visitors' || item.series.label === 'Demo Views') {
              let tooltip = item.series.label + ': ' + item.series.data[item.dataIndex][1];
              $('<div id="tooltip">' + tooltip + '</div>').css({
                'top': item.pageY - 50,
                'left': item.pageX - 70
              }).appendTo("body").fadeIn(200);
            }
          }
        });
      } else {
        $('#spline_chart').html('<div class="no-report">No Records Found</div>');
      }
    },
    loadSocialShareData: function (social_shares) {
      let resultSet = [];

      _.each(social_shares.sources, (share, index) => {
        resultSet.push({
          label: share.medium,
          data: share.count
        });
      });

      this.$('.social_share_block').html(SocialShareTemplate({
        "total_shares": social_shares["total"],
        "social_shares": resultSet
      }));

      if (social_shares['total'] > 0) {
        // Instantiate Pie Chart
        if (!this.$("#social_share_graph").length) return;
        $.plot("#social_share_graph", resultSet, {
          series: {
            pie: {
              show: true,
              radius: 0.8,
              innerRadius: 0.4,
              shadow: {
                top: 5,
                left: 15,
                alpha: .3
              },
              stroke: {
                width: 0
              },
              label: {
                show: false
              },
              highlight: {
                opacity: .08
              }
            }
          },
          grid: {
            hoverable: true
          },
          colors: this.SOCIAL_MEDIA_GRAPH_COLORS,
          legend: {
            show: false
          }
        });
        this.$("#social_share_graph").bind("plothover", (event, pos, item) => {
          $("#tooltip").remove();

          if (item) {
            var tooltip = `${item.series.label} : ${item.series.datapoints.points[1]}`;
            $(`<div id="tooltip"> ${tooltip} </div>`).css({
              top: pos.pageY - 50,
              left: pos.pageX - 70
            }).appendTo("body").show();
          }
        });
      }
    },
    dayDifference: function (time1, time2) {
      let timeDiff = Math.abs(time2 - time1);
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    loadMore: function (event) {
      this.$(event.target).parent().children('.reports_data_row').removeClass('hidden');
      this.$(event.target).remove();
      this.loadMoreChapters = true;
    },
    getGraphDate: function (date_string) {
      var date_string_list = date_string.split(',');
      var year = parseInt(date_string_list[0]);
      var month = parseInt(date_string_list[1]) - 1;
      var day = parseInt(date_string_list[2]);
      var tzOffset = new Date();
      tzOffset = tzOffset.getTimezoneOffset() * 60 * 1000;
      var time = new Date(year, month, day).getTime() - tzOffset;
      return time;
    }
  });
  return ReportsView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=22.213692.js.map