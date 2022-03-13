(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./sharedemos/static/js/feedback/models/feedback-reports.js":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/feedback/models/feedback-reports.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var FeedbackReports = Backbone.Model.extend({
    urlRoot: "/api/rate-content"
  });
  return FeedbackReports;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/feedback/models/feedback.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/feedback/models/feedback.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Feedback = Backbone.Model.extend({
    urlRoot: "/api/feedback"
  });
  return Feedback;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/feedback/templates/breadcrumb.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/feedback/templates/breadcrumb.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " >\n<span class=\"product\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + " \"  "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"section_details") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":73},"end":{"line":3,"column":117}}})) != null ? stack1 : "")
    + " >"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_name") : stack1), depth0))
    + "</span>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " load-ratings ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"section_details") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " >\n<span class=\"section\"  data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section_details") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chapter_details") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":121},"end":{"line":7,"column":165}}})) != null ? stack1 : "")
    + " >"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section_details") : depth0)) != null ? lookupProperty(stack1,"section_name") : stack1), depth0))
    + "</span> \n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " >\n<span class=\"chapter\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section_details") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" data-chapter-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_details") : depth0)) != null ? lookupProperty(stack1,"chapter_id") : stack1), depth0))
    + "\" >"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_details") : depth0)) != null ? lookupProperty(stack1,"chapter_name") : stack1), depth0))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<span id=\"home-page\" class=\"home-page\">Home page</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"product_details") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":4,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1),"!==",((stack1 = (depth0 != null ? lookupProperty(depth0,"section_details") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1),{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":0},"end":{"line":9,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter_details") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":0},"end":{"line":12,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/feedback/templates/feedback-categories.handlebars":
/*!********************************************************************************!*\
  !*** ./sharedemos/static/js/feedback/templates/feedback-categories.handlebars ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"search-result records row\" data-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"category_id") || (depth0 != null ? lookupProperty(depth0,"category_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category_id","hash":{},"data":data,"loc":{"start":{"line":8,"column":52},"end":{"line":8,"column":67}}}) : helper)))
    + "\">\n        <div class=\"category-title col-xs-7\" load-ratings data-product-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"product_id") || (depth0 != null ? lookupProperty(depth0,"product_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"product_id","hash":{},"data":data,"loc":{"start":{"line":9,"column":75},"end":{"line":9,"column":89}}}) : helper)))
    + "\" data-section-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"section_id") || (depth0 != null ? lookupProperty(depth0,"section_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"section_id","hash":{},"data":data,"loc":{"start":{"line":9,"column":108},"end":{"line":9,"column":122}}}) : helper)))
    + "\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":9,"column":124},"end":{"line":9,"column":191}}})) != null ? stack1 : "")
    + "</div>\n        <div class=\"col-xs-1\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_deleted") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":11,"column":9},"end":{"line":15,"column":10}}})) != null ? stack1 : "")
    + "		</div>\n        <div class=\"ratings col-xs-2\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"ratings") || (depth0 != null ? lookupProperty(depth0,"ratings") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ratings","hash":{},"data":data,"loc":{"start":{"line":17,"column":38},"end":{"line":17,"column":49}}}) : helper)))
    + "</div>\n        <div class=\"comments col-xs-2\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"comments") || (depth0 != null ? lookupProperty(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data,"loc":{"start":{"line":18,"column":39},"end":{"line":18,"column":51}}}) : helper)))
    + "</div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"section_name") || (depth0 != null ? lookupProperty(depth0,"section_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"section_name","hash":{},"data":data,"loc":{"start":{"line":9,"column":144},"end":{"line":9,"column":160}}}) : helper)));
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"product_name") || (depth0 != null ? lookupProperty(depth0,"product_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"product_name","hash":{},"data":data,"loc":{"start":{"line":9,"column":168},"end":{"line":9,"column":184}}}) : helper)));
},"6":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"cat-deleted-section-icon rating\"></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":3},"end":{"line":15,"column":3}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"cat-disabled-section-icon rating\"></div>\n			";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"search-result header row\">\n    <div class=\"category-title col-xs-7\">Category name</div>\n    <div class=\"col-xs-1\"></div>\n    <div class=\"ratings col-xs-2\">ratings</div>\n    <div class=\"comments col-xs-2\">comments</div>\n</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"categories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":0},"end":{"line":20,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/feedback/templates/feedbacks.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/feedback/templates/feedbacks.handlebars ***!
  \**********************************************************************/
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

  return "	<div class=\"feedback-wrap\">\r\n		<div class=\"feedback-content\">\r\n			<div class=\"content-ratings\" data-rating=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"ratings") : depth0), depth0))
    + "\"></div>\r\n			<p class=\"comment\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"comments") : depth0), depth0))
    + "</p>\r\n			<div class=\"chapter-link\" chapter_id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"chapter_id") : depth0), depth0))
    + " class=\"chapter-link\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"chapter_name") : depth0), depth0))
    + "\r\n			</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_deleted") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":17,"column":3},"end":{"line":21,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n		<div class=\"feedback-date\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/localTime.js */ "./sharedemos/static/js/helpers/handlebars/localTime.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"created_at") : depth0),"{\"year\": \"numeric\", \"month\": \"short\", \"day\": \"numeric\", \"hour\": \"numeric\", \"minute\": \"numeric\"}",{"name":"localTime","hash":{},"data":data,"loc":{"start":{"line":23,"column":29},"end":{"line":23,"column":151}}}))
    + "</div>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"deleted-walkthrough-icon rating\" title=\"Chapter Deleted\"></span>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":3},"end":{"line":21,"column":3}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"disabled-walkthrough-icon rating\" title=\"Chapter Disabled\"></span>\r\n			";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<nav aria-label=\"Page navigation example\">\r\n  <ul class=\"pagination\">\r\n    <li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"prevDisable") : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":25},"end":{"line":31,"column":72}}})) != null ? stack1 : "")
    + "\"  data-page=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pagePrev") : stack1), depth0))
    + "\" ><a class=\"page-link\">Previous</a></li>\r\n    \r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pages") : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":4},"end":{"line":35,"column":13}}})) != null ? stack1 : "")
    + "\r\n    <li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"nextDisable") : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":25},"end":{"line":37,"column":72}}})) != null ? stack1 : "")
    + "\"  data-page="
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"pageNext") : stack1), depth0))
    + "><a class=\"page-link\">Next</a></li>\r\n  </ul>\r\n</nav>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    	<li class=\"page-item "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"currentPage") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":26},"end":{"line":34,"column":60}}})) != null ? stack1 : "")
    + "\"  data-page="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"pageNo") : depth0), depth0))
    + "><a class=\"page-link\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"pageNo") : depth0), depth0))
    + "</a></li>    \r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return " active ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"rating-list-title\">\r\n    Avg. Playlist Rating\r\n</div>\r\n<div class=\"content-ratings avg-rating\" data-rating=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avg_rating") : depth0), depth0))
    + "\"><span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avg_rating") : depth0), depth0))
    + "</span></div>\r\n<div class=\"feedback-sorting-wrap row\">\r\n	<div class=\"sort-by-ratings\" data-sorting=\"rating\" >rating</div>\r\n	<div class=\"sort-by-date\" data-sorting=\"date\" >date submitted</div>\r\n</div>\r\n<div class=\"feedbacks-list\" product_id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product_details") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\" section_id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section_details") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" chapter_id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter_details") : depth0)) != null ? lookupProperty(stack1,"chapter_id") : stack1), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"content_ratings") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":1},"end":{"line":25,"column":10}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"pagination") : depth0)) != null ? lookupProperty(stack1,"is_paginated") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":0},"end":{"line":40,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/feedback/templates/main.handlebars":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/js/feedback/templates/main.handlebars ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "down";
},"3":function(container,depth0,helpers,partials,data) {
    return "up";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Ratings Received</p>\n    <h1 class=\"card-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"rating_received") : depth0)) != null ? lookupProperty(stack1,"count") : stack1), depth0))
    + " Ratings</h1>\n    <p class=\"feedback-stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"rating_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":29},"end":{"line":4,"column":88}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"rating_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":88},"end":{"line":4,"column":146}}})) != null ? stack1 : "")
    + "\">\n        "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"rating_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1), depth0))
    + "% FROM LAST PERIOD\n    </p>\n</div>\n<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Feedback Received</p>\n    <h1 class=\"card-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"feedback_received") : depth0)) != null ? lookupProperty(stack1,"count") : stack1), depth0))
    + " Comments</h1>\n    <p class=\"feedback-stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"feedback_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":90}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"feedback_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":91},"end":{"line":11,"column":150}}})) != null ? stack1 : "")
    + "\">\n        "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"feedback_received") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1), depth0))
    + "% FROM LAST PERIOD\n    </p>\n</div>\n<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Highest Rated Section</p>\n    <h2 load-ratings class=\"card-title\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_section") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" \n    data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_section") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_section") : depth0)) != null ? lookupProperty(stack1,"section_name") : stack1), depth0))
    + "</h2>\n    <div class=\"content-ratings\" data-rating=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_section") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_section") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "</span></div>\n</div>\n<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Lowest Rated Section</p>\n    <h2 load-ratings class=\"card-title\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_section") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_section") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_section") : depth0)) != null ? lookupProperty(stack1,"section_name") : stack1), depth0))
    + "</h2>\n    <div class=\"content-ratings\" data-rating=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_section") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_section") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "</span></div>\n</div>\n<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Highest Rated Chapter</p>\n    <h2 class=\"card-title\" load-ratings data-chapter-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"chapter_id") : stack1), depth0))
    + "\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"chapter_name") : stack1), depth0))
    + "</h2>\n    <div class=\"content-ratings\" data-rating=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"highest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "</span></div>\n</div>\n<div class=\"feedback-cards shadow\">\n    <p class=\"card-title\">Lowest Rated Chapter</p>\n    <h2 class=\"card-title\" load-ratings data-chapter-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"chapter_id") : stack1), depth0))
    + "\"\n    data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"section_id") : stack1), depth0))
    + "\" \n    data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"product_id") : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"chapter_name") : stack1), depth0))
    + "</h2>\n    <div class=\"content-ratings\" data-rating=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"lowest_rated_chapter") : depth0)) != null ? lookupProperty(stack1,"avg_rating") : stack1), depth0))
    + "</span></div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/feedback/views/feedback.js":
/*!*********************************************************!*\
  !*** ./sharedemos/static/js/feedback/views/feedback.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/feedback-reports */ "./sharedemos/static/js/feedback/models/feedback-reports.js"), __webpack_require__(/*! ../models/feedback */ "./sharedemos/static/js/feedback/models/feedback.js"), __webpack_require__(/*! ../templates/main.handlebars */ "./sharedemos/static/js/feedback/templates/main.handlebars"), __webpack_require__(/*! ../templates/feedback-categories.handlebars */ "./sharedemos/static/js/feedback/templates/feedback-categories.handlebars"), __webpack_require__(/*! ../templates/breadcrumb.handlebars */ "./sharedemos/static/js/feedback/templates/breadcrumb.handlebars"), __webpack_require__(/*! ../templates/feedbacks.handlebars */ "./sharedemos/static/js/feedback/templates/feedbacks.handlebars"), __webpack_require__(/*! ../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, FeedbackReports, Feedback, Template, FeedbackCategories, Breadcrumb, FeedbacksTemplate, Translate) {
  'use strict';

  var FeedbackView = Backbone.View.extend({
    el: '#feedback_wrap',
    DATA: {},
    events: {
      'click .dd-menu li, .breadcrumb .home-page': 'filterRatings',
      'click [load-ratings]': 'loadRatings',
      'click .feedback-wrap .chapter-link': 'loadChapterRatings',
      'click .page-item': 'loadRatingsByPage',
      'click .feedback-sorting-wrap div': 'sortFeedback'
    },
    initialize: function () {
      var fromDateElem = this.$('#from-date'),
          toDateElem = this.$('#to-date');
      fromDateElem.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        maxDate: new Date(),
        autoClose: true,
        clearButton: true,
        onSelect: (selectedDate, date) => {
          var toDate = toDateElem.val();
          toDateElem.datepicker().data('datepicker').update('minDate', date);

          if (selectedDate && toDate) {
            this.loadFeedback({
              'date_range': 'custom',
              'from_date': selectedDate,
              'to_date': toDate,
              'category_id': this.$('#categories li.active').attr('data-attr')
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
        onSelect: (selectedDate, date) => {
          var fromDate = fromDateElem.val();
          fromDateElem.datepicker().data('datepicker').update('maxDate', date || new Date());

          if (selectedDate && fromDate) {
            this.loadFeedback({
              'date_range': 'custom',
              'from_date': fromDate,
              'to_date': selectedDate,
              'category_id': this.$('#categories li.active').attr('data-attr')
            });
          }
        }
      });
      this.render();
    },
    render: function () {
      this.loadFeedback({
        date_range: 'week',
        category_id: 'all'
      });
    },
    filterRatings: function (event) {
      var date_range = this.$(".time-interval-dd .interval").attr("data-attr");
      var category_id = 'all';

      if (event.currentTarget.parentElement.id == 'metrics') {
        date_range = event.currentTarget.getAttribute('data-attr');
        this.$('#metrics li').removeClass('active');
        this.$(event.currentTarget).addClass('active');
        this.$('.time-interval-dd .interval').attr('data-attr', date_range).html(event.currentTarget.getAttribute('data-title'));

        if (date_range == 'custom') {
          this.$('.custome-date').show();
          return false;
        } else {
          this.$('.custome-date').hide();
        }

        this.$('#from-date').data('datepicker').clear();
        this.$('#to-date').data('datepicker').clear();
        category_id = this.$('#categories li.active').attr('product_id');
        this.$('#metrics li').removeClass('active');
        this.$(event.currentTarget).addClass('active');
      } else if (event.currentTarget.parentElement.id == 'categories') {
        category_id = event.currentTarget.getAttribute('product_id');
        if (category_id) this.$(".breadcrumb").attr("product_id", parseInt(category_id));
        date_range = this.$('#metrics li.active').attr('data-attr');

        if (category_id == 'all') {
          this.$('.category-dd .category').html('All Categories');
        } else {
          this.$('.category-dd .category').html(event.currentTarget.textContent);
        }

        this.$('#categories li').removeClass('active');
        this.$(event.currentTarget).addClass('active');
      }

      let attrs = {
        'date_range': date_range,
        'category_id': category_id || "all"
      };

      if (date_range == 'custom') {
        var from_date = this.$('#from-date').datepicker().data('datepicker');
        var to_date = this.$('#to-date').datepicker().data('datepicker');

        if (from_date.selectedDates.length && to_date.selectedDates.length) {
          attrs['from_date'] = this.$('#from-date').val();
          attrs['to_date'] = this.$('#to-date').val();
          this.loadFeedback(attrs);
        }
      } else {
        if (event.currentTarget.id == 'home-page') {
          this.$('#categories li').removeClass('active');
          this.$('.category-dd span.category').text('All Categories');
          this.$('[data-attr=all]').addClass('active');
        }

        this.loadFeedback(attrs);
      }
    },
    loadFeedback: function (data) {
      var feedbackReports = new FeedbackReports();
      this.$('.feedback-search-wrap').addClass('loading');
      feedbackReports.fetch({
        data: data
      }).done(response => {
        this.$('.feedback-list-wrap').empty();
        this.$('.breadcrumb').html(Breadcrumb(response));
        this.$('.feedback-cards-wrap').html(Template(response));
        this.$('.feedback-search-result-wrap').html(FeedbackCategories(response));
        this.$('.feedback-search-wrap').removeClass('loading');
      }).fail(response => {
        console.log('Loading numbers data failed...');
      });
    },
    loadRatings: function (event) {
      let data = {};
      let {
        sectionId,
        productId,
        chapterId
      } = event.currentTarget.dataset;
      var targetElement = this.$(event.currentTarget);
      var date_range = this.$('.interval').attr('data-attr');
      data.page = 1;
      data.star_filtering = data.date_filtering = "descending";
      data.date_filtering = "descending";
      data.section_id = sectionId;
      data.product_id = productId;
      data.chapter_id = chapterId;

      if (date_range == "custom") {
        let from_date = this.$('#from-date').datepicker().data('datepicker');
        let to_date = this.$('#to-date').datepicker().data('datepicker');

        if (from_date.selectedDates.length && to_date.selectedDates.length) {
          data.from_date = this.$('#from-date').val();
          data.to_date = this.$('#to-date').val();
        } else {
          data.date_range = "week";
        }
      } else {
        data.date_range = date_range;
      }

      this.DATA = data;
      this.renderRatings(data);
    },
    loadChapterRatings: function (event) {
      this.DATA.chapter_id = parseInt(this.$(event.currentTarget).attr("chapter_id")); // reset page no to 1 while for new chapter ratings loading.

      this.DATA.page = 1;
      this.renderRatings(this.DATA);
    },
    loadRatingsByPage: function (event) {
      this.DATA.page = parseInt(this.$(event.currentTarget).attr("data-page"));
      this.renderRatings(this.DATA);
    },
    sortFeedback: function (event) {
      var arrow = this.$(event.currentTarget);
      var dataSorting = arrow.attr('data-sorting');
      this.$('.feedback-sorting-wrap div').removeClass('active');

      if (arrow.hasClass('up')) {
        arrow.removeClass('up').addClass('down active');
        dataSorting == "rating" ? this.DATA.star_filtering = "descending" : this.DATA.date_filtering = "descending";
      } else {
        arrow.removeClass('down').addClass('up active');
        dataSorting == "rating" ? this.DATA.star_filtering = "ascending" : this.DATA.date_filtering = "ascending";
      }

      this.renderRatings(this.DATA);
    },
    renderRatings: function (data) {
      let feedback = new Feedback();
      this.$('.feedback-search-wrap').addClass('loading');
      feedback.fetch({
        data: data
      }).done(response => {
        this.$('.breadcrumb').html(Breadcrumb(response));

        if (response.is_leaf_node) {
          response.pagination = this.buildPagination(response.page, response.total_rating);
          this.$('.feedback-search-result-wrap').empty();
          ;
          this.$('.feedback-list-wrap').html(FeedbacksTemplate(response));
          this.setSortingArrows();
        } else {
          this.$('.feedback-list-wrap').empty();
          this.$('.feedback-search-result-wrap').html(FeedbackCategories(response));
        }

        this.$('.feedback-search-wrap').removeClass('loading');
      }).fail(response => {
        console.log("Feedbacks loading failed..");
      });
    },
    buildPagination: function (pageNo, totalRatings) {
      var pagination = {
        is_paginated: true
      };
      var noOfPages = parseInt(totalRatings / 10);

      if (noOfPages == 0) {
        pagination.is_paginated = false;
      } else if (noOfPages != 0 && totalRatings % 10 > 0) {
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

      if (noOfPages <= 10) {
        startPageNo = 1;
        endPageNo = noOfPages;
      } else {
        if (pageNo <= 4) {
          startPageNo = 1;
          endPageNo = 10;
        } else {
          if (pageNo + 5 >= noOfPages) {
            startPageNo = noOfPages - 9;
            endPageNo = noOfPages;
          } else {
            startPageNo = pageNo - 4;
            endPageNo = pageNo + 5;
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
    setSortingArrows: function () {
      this.DATA.star_filtering == "ascending" ? this.$('.sort-by-ratings').addClass('up') : this.$('.sort-by-ratings').addClass('down');
      this.DATA.date_filtering == "ascending" ? this.$('.sort-by-date').addClass('up') : this.$('.sort-by-date').addClass('down');
    }
  });
  return FeedbackView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/helpers/cookies.js":
/*!*************************************************!*\
  !*** ./sharedemos/static/js/helpers/cookies.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

SDCookies = function () {
  var SDCookies = {
    getItem: function (sKey) {
      if (!sKey || !this.hasItem(sKey)) {
        return null;
      }

      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return;
      }

      var sExpires = "";

      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
            break;

          case String:
            sExpires = "; expires=" + vEnd;
            break;

          case Date:
            sExpires = "; expires=" + vEnd.toGMTString();
            break;
        }
      }

      document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
      if (!sKey || !this.hasItem(sKey)) {
        return;
      }

      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
      return new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    keys:
    /* optional method: you can safely remove it! */
    function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);

      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = unescape(aKeys[nIdx]);
      }

      return aKeys;
    }
  };
  return SDCookies;
}();

/***/ }),

/***/ "./sharedemos/static/js/helpers/handlebars/compare.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/helpers/handlebars/compare.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);

    case "!=":
      return v1 != v2 ? options.fn(this) : options.inverse(this);

    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);

    case "!==":
      return v1 !== v2 ? options.fn(this) : options.inverse(this);

    case "&&":
      return v1 && v2 ? options.fn(this) : options.inverse(this);

    case "||":
      return v1 || v2 ? options.fn(this) : options.inverse(this);

    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);

    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);

    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);

    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);

    default:
      return eval("" + v1 + operator + v2) ? options.fn(this) : options.inverse(this);
  }
};

/***/ }),

/***/ "./sharedemos/static/js/helpers/handlebars/i18n.js":
/*!*********************************************************!*\
  !*** ./sharedemos/static/js/helpers/handlebars/i18n.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (translating_string) {
  return window.I18next != undefined ? window.I18next.t(translating_string) : translating_string;
};

/***/ }),

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

/***/ "./sharedemos/static/js/helpers/sync.js":
/*!**********************************************!*\
  !*** ./sharedemos/static/js/helpers/sync.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Backbone) {
  'use strict';

  var _sync = Backbone.sync;

  Backbone.sync = function (method, model, options) {
    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
    }

    ;

    function sameOrigin(url) {
      // test that a given url is a same-origin URL
      // url could be relative or scheme relative or absolute
      var host = document.location.host; // host + port

      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin; // Allow absolute or scheme relative URLs to same origin

      return url == origin || url.slice(0, origin.length + 1) == origin + '/' || url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/' || // or any other URL that isn't scheme relative or absolute i.e relative.
      !/^(\/\/|http:|https:).*/.test(url);
    }

    ;

    options.beforeSend = function (xhr, settings) {
      var csrftoken = $('meta[name=csrf-token]').attr('content');

      if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      }

      if (document.requestParameters) {
        var base_url = settings.url.split('?');

        if (base_url.length > 1) {
          settings.url = base_url[0] + document.requestParameters() + '&' + base_url[1];
        } else {
          settings.url = settings.url + document.requestParameters();
        }
      }

      if (settings.type == 'GET' && document.isOffline) {
        settings.url += '.json';
      }
    };

    return _sync(method, model, options);
  };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=20.cca295.js.map