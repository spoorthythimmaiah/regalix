(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./sharedemos/static/js/apps/sample_exchange/models/sample_exchange.js":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/models/sample_exchange.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js");
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);

const SampleExchange = backbone__WEBPACK_IMPORTED_MODULE_0___default.a.Model.extend({
  urlRoot: "/api/sample-exchange/"
});
/* harmony default export */ __webpack_exports__["default"] = (SampleExchange);

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/routers/router.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/routers/router.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js");
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/home */ "./sharedemos/static/js/apps/sample_exchange/views/home.js");
/* harmony import */ var _views_sample__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/sample */ "./sharedemos/static/js/apps/sample_exchange/views/sample.js");






class Router extends backbone__WEBPACK_IMPORTED_MODULE_0___default.a.Router {
  constructor() {
    super();
  } // Define Backbone Routes.


  routes() {
    return {
      '': 'home',
      ':sampleId': 'routeHandler'
    };
  }

  home() {
    new _views_home__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }

  routeHandler(sampleId) {
    new _views_sample__WEBPACK_IMPORTED_MODULE_2__["default"](sampleId);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/templates/home.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/templates/home.handlebars ***!
  \*****************************************************************************/
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

  return "            <label>Languages :</label>\n            <div class=\"samples-filter\">\n                <span id=\"selected-filter\">All Samples</span>\n                <span class=\"glyphicon glyphicon-play\"></span>\n            </div>\n            <div class=\"filter-list\">\n                <table class=\"filter-options\">\n                    <tr>\n                        <td><input id=\"all\" name=\"filter\" class=\"options\" value=\"\" type=\"checkbox\" checked></td>\n                        <td>All Samples</td>\n                    </tr>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":20},"end":{"line":34,"column":29}}})) != null ? stack1 : "")
    + "                </table>\n            </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <tr>\n                            <td><input name=\"filter\" data-filter class=\"options tags\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" type=\"checkbox\"\n                                    checked>\n                            </td>\n                            <td>"
    + alias2(alias1(depth0, depth0))
    + "</td>\n                        </tr>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\n    <div class=\"sample-breadcrumb\">\n        <a href=\"/\">Home</a> > "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0)) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"details\">\n        <h1>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h1>\n        <p>"
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0)) != null ? stack1 : "")
    + "<br>\n        </p>\n        <h2>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"result_title") : depth0), depth0))
    + "</h2>\n    </div>\n    <div class='sample_count'>\n        <p>Displaying <span>0</span> results</p>\n    </div>\n    <div class=\"filtering-block\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"platform") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":8},"end":{"line":37,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"sorting-block\">\n        <label>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"sort by",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":15},"end":{"line":40,"column":35}}}))
    + ":</label>\n        <ul class=\"sorting-options\">\n            <li class=\"active\" data-item='lastUpdated'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"recently updated",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":55},"end":{"line":42,"column":84}}}))
    + "</li>\n            <li data-item='downloadCount'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"downloads",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":42},"end":{"line":43,"column":63}}}))
    + "</li>\n            <li data-item='name'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":33},"end":{"line":44,"column":51}}}))
    + "</li>\n            <li data-item='author-name'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"author",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":40},"end":{"line":45,"column":59}}}))
    + "</li>\n        </ul>\n    </div>\n    <div class=\"sample-holder\">\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"loading samples...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":8},"end":{"line":49,"column":38}}}))
    + "\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/templates/new_sample.handlebars":
/*!***********************************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/templates/new_sample.handlebars ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"container\">\n	<div class=\"row\">\n		<div class=\"new-sample col-lg-8\">\n\n			<h1>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add new sample",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":33}}}))
    + "</h1>\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"sample title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":38},"end":{"line":6,"column":62}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a title for the suggestion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":26},"end":{"line":7,"column":70}}}))
    + ".</div>\n			<input name=\"title\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\"Text\">\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"sample description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":38},"end":{"line":9,"column":68}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description for this code sample",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":26},"end":{"line":10,"column":84}}}))
    + ".</div>\n			<div class=\"description-wrap\">\n				<div class=\"toolbar-wrap\" style=\"margin-bottom: 16px;\">\n					<div class=\"select-layout\">\n						<div class=\"layout-selection\">\n							<ul>\n								<li data-layout=\"1\">\n									<img src=\"/static/images/author/layout1.png\">\n								</li>\n								<li data-layout=\"2\">\n									<img src=\"/static/images/author/layout2.png\">\n								</li>\n								<li data-layout=\"3\">\n									<img src=\"/static/images/author/layout3.png\">\n								</li>\n								<li data-layout=\"4\">\n									<img src=\"/static/images/author/layout4.png\">\n								</li>\n							</ul>\n						</div>\n					</div>\n					<div id=\"toolbar\" style=\"margin-bottom: 16px;\"></div>\n					<div class=\"content-done\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"done",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":32,"column":31},"end":{"line":32,"column":46}}}))
    + "</div>\n					<div class=\"content-saving\"></div>\n				</div>\n				<div class=\"sample-description\"></div>\n			</div>\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"license",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":38},"end":{"line":37,"column":57}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a license for this code sample",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":38,"column":26},"end":{"line":38,"column":75}}}))
    + ".</div>\n			<select name=\"license\">\n				<option value=\"MIT\">MIT License</option>\n			</select>\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"tags",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":38},"end":{"line":42,"column":54}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tags that best describe this code sample",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":26},"end":{"line":43,"column":82}}}))
    + ".</div>\n			<div class=\"tag-holder\"></div>\n			<input class=\"tag-input\" name=\"tag\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\"Text\">\n			<div class=\"add-tag\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tag",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":24},"end":{"line":46,"column":43}}}))
    + "</div>\n\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload zip file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":48,"column":38},"end":{"line":48,"column":65}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload your code sample in a zip file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":26},"end":{"line":49,"column":75}}}))
    + ".</div>\n			<div class=\"zip-holder\">\n				<img class=\"zip-image\" src=\"/static/images/zipicon.png\">\n				<label for=\"zip-upload\" class=\"upload-zip\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":52,"column":47},"end":{"line":52,"column":70}}}))
    + "</label>\n				<input id=\"zip-upload\" type=\"file\">\n			</div>\n			<div class=\"submit-sample\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"submit sample",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":55,"column":30},"end":{"line":55,"column":55}}}))
    + "</div>\n		</div>\n	</div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/templates/sample.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/templates/sample.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container\">\n	<div class=\"sample-breadcrumb\">\n		<a href=\"/\">Home</a> > <a href=\"/sample-exchange\">"
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"sample_page_title") : depth0), depth0)) != null ? stack1 : "")
    + "</a> > "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n	</div>\n	<div class=\"sample-holder\">\n		<div class=\"sample\">\n			<div class=\"info\">\n				<div class=\"sample-details\">\n					<h1 class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</h1>\n					<p class=\"author\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"published by",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":23},"end":{"line":10,"column":47}}}))
    + ": "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"author") : stack1)) != null ? lookupProperty(stack1,"fullName") : stack1), depth0))
    + "</p>\n					<div class=\"statistics\">\n						<div class=\"downloads\">\n							<img src=\"/static/images/vmware/downloads.png\">\n							"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"downloads",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":7},"end":{"line":14,"column":28}}}))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"downloadCount") : stack1), depth0))
    + " \n						</div>\n						<div class=\"updated\">\n							<img src=\"/static/images/vmware/updated.png\">\n							"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"updated",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":7},"end":{"line":18,"column":26}}}))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"lastUpdated") : stack1), depth0))
    + "\n						</div>\n					</div>\n					<div class=\"tag-holder\"></div>\n				 </div>\n				<div class=\"actions\">\n					<div data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "\" data-name=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" data-url=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"sample") : depth0)) != null ? lookupProperty(stack1,"downloadUrl") : stack1), depth0))
    + "\" class=\"download\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"download",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":119},"end":{"line":24,"column":139}}}))
    + "</div>\n				</div>\n			</div>\n			<div class=\"sample-content\"></div>\n		</div>\n	</div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/templates/sample_preview.handlebars":
/*!***************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/templates/sample_preview.handlebars ***!
  \***************************************************************************************/
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

  return "    <a href=\"/sample-exchange/"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" target=\"_blank\">\n    <div class=\"sample_preview\">\n        <div class=\"sample-details\">\n            <h3 class=\"title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</h3>\n            <p class=\"author\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"published by",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":54}}}))
    + ": "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"author") : depth0)) != null ? lookupProperty(stack1,"fullName") : stack1), depth0))
    + "</p>\n            <div class=\"tag-holder\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":12,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"statistics\">\n                <div class=\"downloads\">\n                    <img src=\"/static/images/vmware/downloads.png\"/>\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"downloads",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":24},"end":{"line":17,"column":45}}}))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"downloadCount") : depth0), depth0))
    + "\n                 </div>\n                 <div class=\"created\">\n                    <span class=\"glyphicon glyphicon-plus-sign\"></span>\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"created",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":20},"end":{"line":21,"column":39}}}))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"createdAt") : depth0), depth0))
    + "\n                </div>\n                <div class=\"updated\">\n                    <img src=\"/static/images/vmware/updated.png\"/>\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"updated",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":24},"end":{"line":25,"column":43}}}))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"recentlyUpdated") : depth0), depth0))
    + "\n                </div>\n            </div>\n        </div>\n        <div class=\"actions\">\n            <div class=\"download\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" data-url=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"downloadUrl") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"download",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":105},"end":{"line":30,"column":125}}}))
    + "</div>\n        </div>\n    </div>\n    </a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":24},"end":{"line":11,"column":31}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"tag\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"samples") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":34,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/views/home.js":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/views/home.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js");
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tenant_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../tenant/common */ "./sharedemos/static/js/tenant/common.js");
/* harmony import */ var _tenant_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tenant_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _templates_home_handlebars__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../templates/home.handlebars */ "./sharedemos/static/js/apps/sample_exchange/templates/home.handlebars");
/* harmony import */ var _templates_home_handlebars__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_templates_home_handlebars__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_sample_exchange__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/sample_exchange */ "./sharedemos/static/js/apps/sample_exchange/models/sample_exchange.js");
/* harmony import */ var _templates_sample_preview_handlebars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/sample_preview.handlebars */ "./sharedemos/static/js/apps/sample_exchange/templates/sample_preview.handlebars");
/* harmony import */ var _templates_sample_preview_handlebars__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_sample_preview_handlebars__WEBPACK_IMPORTED_MODULE_6__);










class HomeView extends backbone__WEBPACK_IMPORTED_MODULE_0___default.a.View {
  constructor() {
    super();
    this.sampleDataSet = {};
    this.samplesList = [];
  }

  el() {
    return "#block_container";
  }

  events() {
    return {
      "click .actions .download": _tenant_common__WEBPACK_IMPORTED_MODULE_3___default.a.downloadSample,
      "click ul.sorting-options li": "sortSamplesBy",
      "click .filter-options tr td input": "selectFilter",
      "mouseleave .filter-options": "selectAllSamples"
    };
  }

  initialize() {
    this.load();
  }

  load() {
    let samples = new _models_sample_exchange__WEBPACK_IMPORTED_MODULE_5__["default"]();
    let root = this;
    root.$el.html(`<img class="loading-icon" src="/static/images/vmware/loading.gif" />`);
    samples.fetch({
      success(response) {
        if (response.attributes.all_samples.length) {
          // sampleDataset is object used to filter and render the data.
          root.sampleDataSet = {};

          for (let sample of response.attributes.all_samples || []) {
            root.sampleDataSet = { ...root.sampleDataSet,
              ...sample
            };
          }

          root.$el.html(_templates_home_handlebars__WEBPACK_IMPORTED_MODULE_4___default()(response.attributes.samples_api_data));
          root.loadSamples();
        } else {
          root.$el.html(`<div class='no-content'>NO CONTENT</div>`);
        }

        _tenant_common__WEBPACK_IMPORTED_MODULE_3___default.a.logSampleExchangeActivity();
      },

      error(xhr, status_code, message) {
        console.log(xhr, status_code, message);
      }

    });
  }

  loadSamples() {
    let filters = this.getFilters();
    this.samplesList = [];

    for (let filter of filters) {
      this.samplesList = [...this.samplesList, ...(this.sampleDataSet[filter] || [])];
    }

    this.samplesList = underscore__WEBPACK_IMPORTED_MODULE_2___default.a.uniq(this.samplesList, "id");
    this.sortSamples();
    this.renderSamples();
  }

  getFilters() {
    //get filter parameters name which are checked.
    return underscore__WEBPACK_IMPORTED_MODULE_2___default.a.map(this.$(".filter-list .tags:checked"), _el => _el.value);
  }

  sortSamples() {
    let filterAttr = this.$("ul.sorting-options li.active").attr("data-item");
    if (filterAttr == "author-name") this.samplesList = underscore__WEBPACK_IMPORTED_MODULE_2___default.a.chain(this.samplesList).sortBy(sample => sample.author.fullName.toLowerCase()).value();else {
      this.samplesList = underscore__WEBPACK_IMPORTED_MODULE_2___default.a.sortBy(this.samplesList, filterAttr);
    }

    if (filterAttr == "downloadCount" || filterAttr == "lastUpdated") {
      this.samplesList.reverse();
    }

    for (let sample of this.samplesList) {
      sample.name = sample.name.trim();
      sample.recentlyUpdated = _tenant_common__WEBPACK_IMPORTED_MODULE_3___default.a.getDateDifference(new Date(sample.lastUpdated));
      sample.createdAt = _tenant_common__WEBPACK_IMPORTED_MODULE_3___default.a.getDateDifference(new Date(sample.created));
    }
  }

  sortSamplesBy(event) {
    this.$("ul.sorting-options li").removeClass("active");
    this.$(event.currentTarget).addClass("active");
    this.sortSamples();
    this.renderSamples();
  }

  renderSamples() {
    this.$(`.sample_count span`).text(`${this.samplesList.length}`);
    this.$(".sample-holder").html(_templates_sample_preview_handlebars__WEBPACK_IMPORTED_MODULE_6___default()({
      samples: this.samplesList
    }));
  }

  selectAllSamples() {
    /*If 'All samples' is deselected and and leave from the dropdown,
          show all the samples by default*/
    if (!this.$("input[name=filter]:checked").length) {
      this.$(`#selected-filter`).text("All Samples");
      this.$("input[name=filter]").prop("checked", true);
    }

    this.loadSamples();
  }

  selectFilter(event) {
    const filtersAvailable = this.$("input[data-filter]").length;
    let filtersChecked = 0;

    if (this.$(event.target).attr("id") === "all") {
      this.$("input[data-filter]").prop("checked", this.$("#all").prop("checked"));
    } else {
      filtersChecked = this.$("input[data-filter]:checked").length;
      this.$("#all").prop("checked", filtersAvailable === filtersChecked);
    }

    if (this.$("#all").prop("checked")) {
      this.$(`#selected-filter`).text("All Samples");
    } else {
      filtersChecked = this.$("input[data-filter]:checked").length;

      if (filtersChecked === 1) {
        this.$(`#selected-filter`).text(this.$("input[data-filter]:checked").val());
      } else {
        this.$(`#selected-filter`).text(`${filtersChecked} selected`);
      }
    }

    this.loadSamples();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (HomeView);

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/views/new_sample.js":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/views/new_sample.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../templates/new_sample.handlebars */ "./sharedemos/static/js/apps/sample_exchange/templates/new_sample.handlebars"), __webpack_require__(/*! froalaeditor */ "./sharedemos/static/libs/froala/js/froala_editor.min.js"), __webpack_require__(/*! froalaalign */ "./sharedemos/static/libs/froala/js/plugins/align.min.js"), __webpack_require__(/*! froalacharcounter */ "./sharedemos/static/libs/froala/js/plugins/char_counter.min.js"), __webpack_require__(/*! froalacodeview */ "./sharedemos/static/libs/froala/js/plugins/code_view.min.js"), __webpack_require__(/*! froalacolors */ "./sharedemos/static/libs/froala/js/plugins/colors.min.js"), __webpack_require__(/*! froalaembedly */ "./sharedemos/static/libs/froala/js/third_party/embedly.min.js"), __webpack_require__(/*! froalaemoticons */ "./sharedemos/static/libs/froala/js/plugins/emoticons.min.js"), __webpack_require__(/*! froalaentities */ "./sharedemos/static/libs/froala/js/plugins/entities.min.js"), __webpack_require__(/*! froalafontfamily */ "./sharedemos/static/libs/froala/js/plugins/font_family.min.js"), __webpack_require__(/*! froalafontsize */ "./sharedemos/static/libs/froala/js/plugins/font_size.min.js"), __webpack_require__(/*! froalaforms */ "./sharedemos/static/libs/froala/js/plugins/forms.min.js"), __webpack_require__(/*! froalafullscreen */ "./sharedemos/static/libs/froala/js/plugins/fullscreen.min.js"), __webpack_require__(/*! froalahelp */ "./sharedemos/static/libs/froala/js/plugins/help.min.js"), __webpack_require__(/*! froalaimage */ "./sharedemos/static/libs/froala/js/plugins/image.min.js"), __webpack_require__(/*! froalainlinestyle */ "./sharedemos/static/libs/froala/js/plugins/inline_style.min.js"), __webpack_require__(/*! froalalinebreaker */ "./sharedemos/static/libs/froala/js/plugins/line_breaker.min.js"), __webpack_require__(/*! froalalink */ "./sharedemos/static/libs/froala/js/plugins/link.min.js"), __webpack_require__(/*! froalalists */ "./sharedemos/static/libs/froala/js/plugins/lists.min.js"), __webpack_require__(/*! froalaparagraphformat */ "./sharedemos/static/libs/froala/js/plugins/paragraph_format.min.js"), __webpack_require__(/*! froalaparagraphstyle */ "./sharedemos/static/libs/froala/js/plugins/paragraph_style.min.js"), __webpack_require__(/*! froalaprint */ "./sharedemos/static/libs/froala/js/plugins/print.min.js"), __webpack_require__(/*! froalaquickinsert */ "./sharedemos/static/libs/froala/js/plugins/quick_insert.min.js"), __webpack_require__(/*! froalaquote */ "./sharedemos/static/libs/froala/js/plugins/quote.min.js"), __webpack_require__(/*! froalasave */ "./sharedemos/static/libs/froala/js/plugins/save.min.js"), __webpack_require__(/*! froalaspecialcharacters */ "./sharedemos/static/libs/froala/js/plugins/special_characters.min.js"), __webpack_require__(/*! froalatable */ "./sharedemos/static/libs/froala/js/plugins/table.min.js"), __webpack_require__(/*! froalaurl */ "./sharedemos/static/libs/froala/js/plugins/url.min.js"), __webpack_require__(/*! froalavideo */ "./sharedemos/static/libs/froala/js/plugins/video.min.js"), __webpack_require__(/*! froalawordpaste */ "./sharedemos/static/libs/froala/js/plugins/word_paste.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, NewTemplate) {
  'use strict';

  var NewSampleView = Backbone.View.extend({
    el: '#main_container',
    events: {
      'click .add-tag': 'addTag',
      'click .submit-sample': 'saveSample'
    },
    initialize: function () {
      var root = this;
      this.$('#block_container').html(NewTemplate);
      this.$('.sample-description').froalaEditor({
        key: Common.FROALA_KEY,
        toolbarContainer: '#toolbar',
        charCounterCount: false,
        toolbarSticky: true,
        colorsDefaultTab: 'text',
        colorsStep: 7,
        tableResizerOffset: 10,
        colorsBackground: Common.FROALA_COLORS_BACKGROUND,
        colorsText: Common.FROALA_COLORS_TEXT,
        imageEditButtons: Common.FROALA_IMAGE_EDIT_BUTTONS,
        toolbarButtons: Common.FROALA_TOOLBAR_BUTTONS,
        // Set the image upload parameter.
        imageUploadParam: 'editor_image_file',
        // Set the image upload URL.
        imageUploadURL: '/api/resource/rte-asset?author=1',
        // Additional upload params.
        imageUploadParams: {
          'csrf_token': $('meta[name=csrf-token]').attr('content')
        },
        // Set request type.
        imageUploadMethod: 'POST'
      });
    },
    addTag: function () {
      var tagInput = this.$('.tag-input');

      if (tagInput.val()) {
        var newTag = '<div class="tag">' + tagInput.val() + '</div>';
        this.$('.tag-holder').append(newTag);
        tagInput.val('');
      }
    },
    validateFields: function () {
      var valid = true;
      var titleInput = this.$('input[name=title]');
      var licenseInput = this.$('select[name=license]');
      var tagName = this.$('input[name=tag]');

      if (!titleInput.val()) {
        valid = false;
        titleInput.addClass('error');
      } else {
        titleInput.removeClass('error');
      }

      if (!licenseInput.val()) {
        valid = false;
        licenseInput.addClass('error');
      } else {
        licenseInput.removeClass('error');
      }

      if (!this.$('.sample-description').froalaEditor('html.get', true)) {
        valid = false;
        this.$('.fr-element.fr-view').addClass('error');
      } else {
        this.$('.fr-element.fr-view').removeClass('error');
      }

      if (this.$('.tag-holder .tag').length < 1) {
        valid = false;
        tagName.addClass('error');
      } else {
        tagName.removeClass('error');
      }

      return valid;
    },
    saveSample: function () {
      if (!this.validateFields()) {
        return;
      }

      var sampleTitle = this.$('input[name=title]').val();
      var sampleLicense = this.$('select[name=license]').val();
      var sampleDescription = this.$('.sample-description').froalaEditor('html.get', true);
      var tags = this.$('.tag-holder .tag');

      var sampleTags = _.map(tags, function (elem) {
        return elem.textContent;
      });

      var sampleFile = this.$('#zip-upload').val();
    }
  });
  return NewSampleView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/apps/sample_exchange/views/sample.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/apps/sample_exchange/views/sample.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js");
/* harmony import */ var underscore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(underscore__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js");
/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_handlebars_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js");
/* harmony import */ var _helpers_handlebars_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_helpers_handlebars_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tenant_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../tenant/common */ "./sharedemos/static/js/tenant/common.js");
/* harmony import */ var _tenant_common__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tenant_common__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _models_sample_exchange__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/sample_exchange */ "./sharedemos/static/js/apps/sample_exchange/models/sample_exchange.js");
/* harmony import */ var _templates_sample_handlebars__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../templates/sample.handlebars */ "./sharedemos/static/js/apps/sample_exchange/templates/sample.handlebars");
/* harmony import */ var _templates_sample_handlebars__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_templates_sample_handlebars__WEBPACK_IMPORTED_MODULE_6__);










class SampleView extends backbone__WEBPACK_IMPORTED_MODULE_2___default.a.View {
  constructor(sampleId) {
    super(sampleId);
  }

  el() {
    return '#main_container';
  }

  events() {
    return {
      'click .sample-holder .download': _tenant_common__WEBPACK_IMPORTED_MODULE_4___default.a.downloadSample
    };
  }

  initialize(sampleId) {
    this.$("#block_container").html(`<img class="loading-icon" src="/static/images/vmware/loading.gif" />`);
    let root = this;
    let sample = new _models_sample_exchange__WEBPACK_IMPORTED_MODULE_5__["default"]({
      id: sampleId
    });
    sample.fetch({
      success(model, response) {
        if (!response) {
          root.$("#block_container").html(`<div class='no-content'>NO CONTENT</div>`);
          return;
        }

        response.lastUpdated = _tenant_common__WEBPACK_IMPORTED_MODULE_4___default.a.getDateDifference(new Date(response.lastUpdated));
        root.$('#block_container').html(_templates_sample_handlebars__WEBPACK_IMPORTED_MODULE_6___default()({
          'sample': response,
          'sample_page_title': document.sample_page_title
        }));
        root.$('#block_container .sample-content').append(jquery__WEBPACK_IMPORTED_MODULE_1___default.a.parseHTML(`${response.readmeHtml || ''}${response.repositoryReadmeHtml || ''}`));
        root.$('.sample-content a').attr('target', '_blank');

        for (let tag of response.tags || []) {
          root.$('.tag-holder').append(`<div class="tag">  ${tag.name} </div>`);
        }

        root.fixImages();
        _tenant_common__WEBPACK_IMPORTED_MODULE_4___default.a.logSampleExchangeActivity({
          sample_id: response.id,
          sample_name: response.name,
          sample_author: response.author.fullName
        });
      }

    });
  }

  async fixImages() {
    await this.$('.sample-content').find('img').each((index, ele) => {
      let src = jquery__WEBPACK_IMPORTED_MODULE_1___default()(ele).attr('src');

      if (src.indexOf('https://') == -1 && src.indexOf('http://') == -1) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(ele).attr('src', `https://code.vmware.com${src}`);
      }
    });
  }

}

/* harmony default export */ __webpack_exports__["default"] = (SampleView);

/***/ })

}]);
//# sourceMappingURL=21.5b8500.js.map