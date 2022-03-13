(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./sharedemos/static/js/faq/models/group.js":
/*!**************************************************!*\
  !*** ./sharedemos/static/js/faq/models/group.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var FAQGroup = Backbone.Model.extend({
    urlRoot: "/api/faq-group/"
  });
  return FAQGroup;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/faq/models/qna.js":
/*!************************************************!*\
  !*** ./sharedemos/static/js/faq/models/qna.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var QnA = Backbone.Model.extend({
    urlRoot: "/api/faq-qna/"
  });
  return QnA;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/faq/models/section.js":
/*!****************************************************!*\
  !*** ./sharedemos/static/js/faq/models/section.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var FAQSection = Backbone.Model.extend({
    urlRoot: "/api/faq-section/"
  });
  return FAQSection;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/content-editor.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/content-editor.handlebars ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<!-- Text editor -->\r\n<div class=\"text-editor-wrap\">\r\n    <div class=\"toolbar-wrap\" >\r\n        <div id=\"toolbar\"></div>\r\n        <div class=\"content-cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":36},"end":{"line":5,"column":53}}}))
    + "</div>\r\n        <div class=\"content-done\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Done",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":34},"end":{"line":6,"column":49}}}))
    + "</div>\r\n    </div>\r\n    <div class=\"question\"><b>Q:&nbsp;</b><span></span></div>\r\n    <div class=\"content-editor-wrap content-slide-wrap\">\r\n        <h1>Title</h1><p>Write Something</p>\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/edit.handlebars":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/edit.handlebars ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"group\">\r\n	    <img src=\"/static/images/author/add_pathfinder.png\" />\r\n	    <h3 class='capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add faq group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":32},"end":{"line":4,"column":56}}}))
    + "</h3>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"section\">\r\n	    <img src=\"/static/images/author/add_pathfinder.png\" />\r\n	    <h3 class='capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":32},"end":{"line":11,"column":54}}}))
    + "</h3>\r\n	</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"qna\" data-type=\"question\">\r\n	    <img src=\"/static/images/author/add_pathfinder.png\" />\r\n	    <h3 class='capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add question and answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":32},"end":{"line":18,"column":66}}}))
    + "</h3>\r\n	</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<div class=\"faq-edit\">\r\n		<div class=\"faq-edit-wrap\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_group") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":3},"end":{"line":33,"column":13}}})) != null ? stack1 : "")
    + "		    \r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_section") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":6},"end":{"line":42,"column":13}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_qna") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":6},"end":{"line":51,"column":13}}})) != null ? stack1 : "")
    + "\r\n		</div>\r\n	</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "		        <div class=\"faq-edit-option edit\" data-popup=\"group\" data-type=\"group\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":11},"end":{"line":28,"column":32}}}))
    + "\r\n		        </div>\r\n		        <div class=\"faq-edit-option delete\" data-popup=\"confirm_delete\" data-type=\"group\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":11},"end":{"line":31,"column":34}}}))
    + "\r\n		        </div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "		        <div class=\"faq-edit-option edit\" data-popup=\"section\" data-type=\"section\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":11},"end":{"line":37,"column":34}}}))
    + "\r\n		        </div>\r\n		        <div class=\"faq-edit-option delete\" data-popup=\"confirm_delete\" data-type=\"section\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":11},"end":{"line":40,"column":36}}}))
    + "\r\n		        </div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "		        <div class=\"faq-edit-option edit\" data-popup=\"qna\" data-type=\"question\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit q and a",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":11},"end":{"line":46,"column":34}}}))
    + "\r\n		        </div>\r\n		        <div class=\"faq-edit-option delete\" data-popup=\"confirm_delete\" data-type=\"question\">\r\n		        	"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete q and a",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":11},"end":{"line":49,"column":36}}}))
    + "\r\n		        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_group") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_section") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_qna") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":20,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_options") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":0},"end":{"line":55,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/group.handlebars":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/group.handlebars ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a class=\"export-pdf\" href=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editMode") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":32},"end":{"line":4,"column":60}}})) != null ? stack1 : "")
    + "/export-faq/"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"export faq",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":82},"end":{"line":4,"column":106}}}))
    + "</a>\r\n	<div class=\"faq-steps-menu\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":10,"column":11}}})) != null ? stack1 : "")
    + "	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "/edit";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"steps\">\r\n			<a href=\"#section-"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":8,"column":21},"end":{"line":8,"column":42}}}))
    + "\"><span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":8,"column":50},"end":{"line":8,"column":71}}}))
    + "</span> <div class=\"steps-name\">"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div></a>\r\n		</div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div id=\"section-"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":20,"column":20},"end":{"line":20,"column":41}}}))
    + "\" class=\"faq-section\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"editMode") : depths[1]),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":62},"end":{"line":20,"column":103}}})) != null ? stack1 : "")
    + ">\r\n			    <div class=\"section-title\"><span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":21,"column":40},"end":{"line":21,"column":61}}}))
    + "</span>"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"questions") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":7},"end":{"line":30,"column":13}}})) != null ? stack1 : "")
    + "			</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-id="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0));
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			    <div class=\"faq-item\""
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[2] != null ? lookupProperty(depths[2],"editMode") : depths[2]),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":28},"end":{"line":23,"column":72}}})) != null ? stack1 : "")
    + ">\r\n				    <div class=\"head\">\r\n				        <div class=\"title\">"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"question") : depth0), depth0))
    + "</div>\r\n				        <div class=\"arrow\"></div>\r\n				    </div>\r\n				    <div class=\"info-block fr-view\">"
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"answer") : depth0), depth0)) != null ? stack1 : "")
    + "</div>\r\n				</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"faq-main-wrap\">\r\n	<div class=\"return-home\">BACK</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"sections") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":12,"column":8}}})) != null ? stack1 : "")
    + "	<div class=\"faq-wrap\">\r\n		<div class=\"faq-header\">\r\n			<div class=\"faq-title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n			<div class=\"faq-description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n		</div>\r\n		<div class=\"faq-section-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":3},"end":{"line":32,"column":12}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n</div>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/group_list.handlebars":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/group_list.handlebars ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<li"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editMode") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":46}}})) != null ? stack1 : "")
    + ">\n		<div class='faq-wrap'>\n			<div class=\"banner\">\n	        	"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":10},"end":{"line":6,"column":53}}})) != null ? stack1 : "")
    + "\n				<label>"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</label>\n				<div class=\"banner-overlay\"></div>\n			</div>\n			<div class=\"info-block\">\n				<div class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n				<div class=\"description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n				<a href=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\" class=\"explore\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"explore",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":39},"end":{"line":13,"column":57}}}))
    + "</a>\n			</div>\n			<div class=\"footer\">\n				<div class=\"description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n				<div class=\"counts\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"questions_count") : depth0), depth0))
    + " "
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":44},"end":{"line":17,"column":63}}}))
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"questions_count") : depth0),">",1,{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":63},"end":{"line":17,"column":111}}})) != null ? stack1 : "")
    + "</div>\n			</div>\n		</div>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-slug="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0));
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">";
},"6":function(container,depth0,helpers,partials,data) {
    return "s";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"faq\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"groups") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":21,"column":10}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/home.handlebars":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/home.handlebars ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"fs-banner\"> \n	<div class=\"title1\">FAQ</div>\n</div>\n<div class=\"faq-block\"></div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/templates/popup.handlebars":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/faq/templates/popup.handlebars ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"group\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":82}}})) != null ? stack1 : "")
    + ">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":94}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"faq group name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":47},"end":{"line":8,"column":72}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"provide a name for this faq group (i.e. \"support faq\")",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":35},"end":{"line":9,"column":100}}}))
    + "</div>\r\n            <input name=\"name\" type=\"text\" maxlength=\"50\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":77},"end":{"line":10,"column":115}}})) != null ? stack1 : "")
    + " placeholder=\"Name\" />\r\n            <div class=\"counter\">50 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":36},"end":{"line":11,"column":62}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"faq group description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":31},"end":{"line":14,"column":63}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a description about this faq group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":35},"end":{"line":15,"column":86}}}))
    + ".</div>\r\n            <textarea name=\"description\" maxlength=\"350\" placeholder=\"Description\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":83},"end":{"line":16,"column":120}}})) != null ? stack1 : "")
    + "</textarea>\r\n            <div class=\"counter\">350 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":37},"end":{"line":17,"column":63}}}))
    + "</div>\r\n        </div>\r\n        <hr class=\"break\"/>\r\n        <div class=\"advanced\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":30},"end":{"line":20,"column":49}}}))
    + "</div>\r\n        <div class=\"block advanced-block"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":40},"end":{"line":21,"column":93}}})) != null ? stack1 : "")
    + "\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload cover image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":31},"end":{"line":22,"column":60}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a cover image to go with this faq group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":35},"end":{"line":23,"column":92}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":37},"end":{"line":25,"column":124}}})) != null ? stack1 : "")
    + ">\r\n            <div class=\"file-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":35},"end":{"line":26,"column":106}}})) != null ? stack1 : "")
    + "</div>\r\n            <div class=\"remove-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":37},"end":{"line":27,"column":54}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":37},"end":{"line":28,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"group\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":33,"column":51},"end":{"line":33,"column":68}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":34,"column":30},"end":{"line":34,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":48},"end":{"line":36,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":46},"end":{"line":37,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":38,"column":49},"end":{"line":38,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-slug="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0));
},"4":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit faq group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":23},"end":{"line":4,"column":48}}}));
},"6":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new faq group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":56},"end":{"line":4,"column":87}}}));
},"8":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\"";
},"10":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0));
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":55},"end":{"line":21,"column":86}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return " image-added";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":52},"end":{"line":25,"column":117}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " data-icon-id='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + "' src='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "'";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":26,"column":50},"end":{"line":26,"column":99}}})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0));
},"21":function(container,depth0,helpers,partials,data) {
    return "File name";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"section\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":44},"end":{"line":44,"column":80}}})) != null ? stack1 : "")
    + ">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.program(28, data, 0),"data":data,"loc":{"start":{"line":46,"column":8},"end":{"line":46,"column":86}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"section name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":47},"end":{"line":50,"column":70}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a name for this section of your faq group (i.e. 'recommended')",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":51,"column":35},"end":{"line":51,"column":115}}}))
    + ".</div>\r\n            <input name=\"name\" type=\"text\" maxlength=\"50\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":77},"end":{"line":52,"column":115}}})) != null ? stack1 : "")
    + " placeholder=\"Name\" />\r\n            <div class=\"counter\">50 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":53,"column":36},"end":{"line":53,"column":62}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer \">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"section\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":58,"column":53},"end":{"line":58,"column":70}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":59,"column":30},"end":{"line":59,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":61,"column":48},"end":{"line":61,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":62,"column":46},"end":{"line":62,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":63,"column":49},"end":{"line":63,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-id="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0));
},"26":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":23},"end":{"line":46,"column":46}}}));
},"28":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":54},"end":{"line":46,"column":79}}}));
},"30":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"popup-box\" data-popup=\"qna\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":69,"column":44},"end":{"line":69,"column":80}}})) != null ? stack1 : "")
    + " data-section-id="
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"section_id") : depth0), depth0))
    + ">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.program(33, data, 0),"data":data,"loc":{"start":{"line":71,"column":8},"end":{"line":71,"column":74}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Question and Answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":71,"column":75},"end":{"line":71,"column":105}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":75,"column":47},"end":{"line":75,"column":66}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a question to answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":76,"column":35},"end":{"line":76,"column":72}}}))
    + "</div>\r\n            <input name=\"question\" type=\"text\" maxlength=\"200\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":63},"end":{"line":77,"column":105}}})) != null ? stack1 : "")
    + " autocomplete=\"off\" placeholder=\"Question\" />\r\n            <div class=\"counter\">200 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":37},"end":{"line":78,"column":63}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block rte\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":81,"column":47},"end":{"line":81,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write and format the answer using text editor",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":82,"column":35},"end":{"line":82,"column":91}}}))
    + ".</div>\r\n            <div class=\"thumb-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":84,"column":16},"end":{"line":86,"column":27}}})) != null ? stack1 : "")
    + "                <div id=\"preview\" class=\"fr-view\"></div>\r\n            </div>\r\n            <textarea name=\"answer\" placeholder=\"Answer\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":89,"column":57},"end":{"line":89,"column":89}}})) != null ? stack1 : "")
    + "</textarea> \r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"qna\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":94,"column":49},"end":{"line":94,"column":66}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":95,"column":30},"end":{"line":95,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":97,"column":48},"end":{"line":97,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":98,"column":46},"end":{"line":98,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":99,"column":49},"end":{"line":99,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"31":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":71,"column":23},"end":{"line":71,"column":38}}}));
},"33":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":71,"column":46},"end":{"line":71,"column":67}}}));
},"35":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"question") : depth0), depth0))
    + "\"";
},"37":function(container,depth0,helpers,partials,data) {
    return "                    <img src='/static/images/author/RTE-thumb.png' />\r\n";
},"39":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"answer") : depth0), depth0));
},"41":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box confirm_delete\">\r\n    <div class=\"popup-title delete-title\">\r\n            delete "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":112,"column":19},"end":{"line":112,"column":58}}}))
    + "<br><br>\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"are you sure want to permanently delete this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":113,"column":19},"end":{"line":113,"column":74}}}))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "?\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_delete\">cancel</div>\r\n                <div class=\"confirm-delete delete\" data-type="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + " data-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_id") : depth0), depth0))
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":120,"column":99},"end":{"line":120,"column":116}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":52},"end":{"line":122,"column":92}}}))
    + ".</div>\r\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"success! your work has successfully been deleted.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":123,"column":50},"end":{"line":123,"column":111}}}))
    + "</div>\r\n            <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":124,"column":53},"end":{"line":124,"column":72}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"43":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box confirm_publish_faq\">\r\n    <div class=\"popup-title capital-letter\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":132,"column":12},"end":{"line":132,"column":38}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":137,"column":20},"end":{"line":137,"column":76}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_publish_faq\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":62},"end":{"line":143,"column":79}}}))
    + "</div>\r\n                <div class=\"confirm-publish-faq publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":144,"column":57},"end":{"line":144,"column":75}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":146,"column":52},"end":{"line":146,"column":92}}}))
    + ".</div>\r\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":147,"column":50},"end":{"line":147,"column":113}}}))
    + "\r\n            </div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":149,"column":38},"end":{"line":149,"column":59}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"group") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":41,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"section") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":0},"end":{"line":66,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"qna") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":68,"column":0},"end":{"line":102,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"confirm_delete") : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":104,"column":0},"end":{"line":127,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"publish_faq") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":129,"column":0},"end":{"line":152,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/faq/views/edit.js":
/*!************************************************!*\
  !*** ./sharedemos/static/js/faq/views/edit.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../templates/edit.handlebars */ "./sharedemos/static/js/faq/templates/edit.handlebars"), __webpack_require__(/*! ../templates/popup.handlebars */ "./sharedemos/static/js/faq/templates/popup.handlebars"), __webpack_require__(/*! ../templates/content-editor.handlebars */ "./sharedemos/static/js/faq/templates/content-editor.handlebars"), __webpack_require__(/*! ../models/group */ "./sharedemos/static/js/faq/models/group.js"), __webpack_require__(/*! ../models/qna */ "./sharedemos/static/js/faq/models/qna.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/faq/models/section.js"), __webpack_require__(/*! ../../tenant/models/icon */ "./sharedemos/static/js/tenant/models/icon.js"), __webpack_require__(/*! froalaeditor */ "./sharedemos/static/libs/froala/js/froala_editor.min.js"), __webpack_require__(/*! froalaalign */ "./sharedemos/static/libs/froala/js/plugins/align.min.js"), __webpack_require__(/*! froalacharcounter */ "./sharedemos/static/libs/froala/js/plugins/char_counter.min.js"), __webpack_require__(/*! froalacodeview */ "./sharedemos/static/libs/froala/js/plugins/code_view.min.js"), __webpack_require__(/*! froalacolors */ "./sharedemos/static/libs/froala/js/plugins/colors.min.js"), __webpack_require__(/*! froalaembedly */ "./sharedemos/static/libs/froala/js/third_party/embedly.min.js"), __webpack_require__(/*! froalaemoticons */ "./sharedemos/static/libs/froala/js/plugins/emoticons.min.js"), __webpack_require__(/*! froalaentities */ "./sharedemos/static/libs/froala/js/plugins/entities.min.js"), __webpack_require__(/*! froalafontfamily */ "./sharedemos/static/libs/froala/js/plugins/font_family.min.js"), __webpack_require__(/*! froalafontsize */ "./sharedemos/static/libs/froala/js/plugins/font_size.min.js"), __webpack_require__(/*! froalaforms */ "./sharedemos/static/libs/froala/js/plugins/forms.min.js"), __webpack_require__(/*! froalafullscreen */ "./sharedemos/static/libs/froala/js/plugins/fullscreen.min.js"), __webpack_require__(/*! froalahelp */ "./sharedemos/static/libs/froala/js/plugins/help.min.js"), __webpack_require__(/*! froalaimage */ "./sharedemos/static/libs/froala/js/plugins/image.min.js"), __webpack_require__(/*! froalainlinestyle */ "./sharedemos/static/libs/froala/js/plugins/inline_style.min.js"), __webpack_require__(/*! froalalinebreaker */ "./sharedemos/static/libs/froala/js/plugins/line_breaker.min.js"), __webpack_require__(/*! froalalink */ "./sharedemos/static/libs/froala/js/plugins/link.min.js"), __webpack_require__(/*! froalalists */ "./sharedemos/static/libs/froala/js/plugins/lists.min.js"), __webpack_require__(/*! froalaparagraphformat */ "./sharedemos/static/libs/froala/js/plugins/paragraph_format.min.js"), __webpack_require__(/*! froalaparagraphstyle */ "./sharedemos/static/libs/froala/js/plugins/paragraph_style.min.js"), __webpack_require__(/*! froalaprint */ "./sharedemos/static/libs/froala/js/plugins/print.min.js"), __webpack_require__(/*! froalaquickinsert */ "./sharedemos/static/libs/froala/js/plugins/quick_insert.min.js"), __webpack_require__(/*! froalaquote */ "./sharedemos/static/libs/froala/js/plugins/quote.min.js"), __webpack_require__(/*! froalasave */ "./sharedemos/static/libs/froala/js/plugins/save.min.js"), __webpack_require__(/*! froalaspecialcharacters */ "./sharedemos/static/libs/froala/js/plugins/special_characters.min.js"), __webpack_require__(/*! froalatable */ "./sharedemos/static/libs/froala/js/plugins/table.min.js"), __webpack_require__(/*! froalaurl */ "./sharedemos/static/libs/froala/js/plugins/url.min.js"), __webpack_require__(/*! froalavideo */ "./sharedemos/static/libs/froala/js/plugins/video.min.js"), __webpack_require__(/*! froalawordpaste */ "./sharedemos/static/libs/froala/js/plugins/word_paste.min.js"), __webpack_require__(/*! froalafontawesome */ "./sharedemos/static/libs/froala/js/third_party/font_awesome.min.js"), __webpack_require__(/*! froalalineheight */ "./sharedemos/static/libs/froala/js/plugins/line_height.min.js"), __webpack_require__(/*! froalauploadfile */ "./sharedemos/static/libs/froala/js/plugins/file.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, EditTemplate, PopupTemplate, ContentEditor, Group, QnA, Section, Icon) {
  'use strict';

  var EditView = Backbone.View.extend({
    el: '#main_container',
    NAME_CHAR_LIMIT: 70,
    DESCRIPTION_CHAR_LIMIT: 100,
    events: {
      'click .add-block:not(.disabled), .faq-edit-option.delete': 'showPopup',
      'click .cancel': 'hidePopup',
      'click .advanced': 'showAdvanced',
      'change #upload-file': 'previewImage',
      'click .remove-file': 'removeImage',
      'keyup .content-block textarea, .content-block input': 'charCounter',
      'click .publish-faq:not(.disabled)': 'showPopup',
      'click [data-popup="group"] .save': 'validateGroupInfo',
      'click [data-popup="section"] .save': 'saveSectionInfo',
      'click [data-popup="qna"] .save': 'saveQnAInfo',
      'click .faq-edit-option.edit': 'editEntity',
      'click .popup-box.confirm_delete .delete': 'deleteEntity',
      'click .popup-box.confirm_publish_faq .publish': 'publishGroup',
      'click .thumb-wrap': 'showTextEditor',
      'click .content-done': 'saveTextEditorChanges',
      'click .content-cancel': 'cancelTextEditorChanges'
    },
    initialize: function () {
      $(window).on('resize', {
        'root': this
      }, this.onWindowResize);
      this.listenTo(Backbone, 'home_rendered', this.renderHomeOptions);
      this.listenTo(Backbone, 'explore_faq', this.renderGroupOptions);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      Common.loadLanguages(document.locales);
    },
    onWindowResize: function (e) {
      e.data.root.overlayCalc();
    },
    renderHomeOptions: function () {
      this.group = null;
      var attrs = {
        'add_group': true
      };
      this.$('.faq-block').append(EditTemplate(attrs));
      attrs = {
        'edit_options': true,
        'edit_group': true
      };
      this.$('.faq-wrap').append(EditTemplate(attrs));
    },
    renderGroupOptions: function (view) {
      this.view = view;
      var attrs = {
        'add_section': true
      };
      this.$('.faq-wrap').append(EditTemplate(attrs));
      attrs = {
        'add_qna': view.group.attributes.sections.length
      };
      this.$('.faq-section').append(EditTemplate(attrs));
      attrs = {
        'edit_options': true,
        'edit_qna': true
      };
      this.$('.faq-item .head').append(EditTemplate(attrs));
      attrs = {
        'edit_options': true,
        'edit_section': true
      };
      this.$('.faq-section .section-title').append(EditTemplate(attrs));

      if (!view.group.attributes.published) {
        this.$('.publish-faq').removeClass('disabled').attr('data-slug', view.group.id);
      } else {
        this.$('.publish-faq').removeClass('disabled').addClass('disabled');
      }

      this.$('#block_container').append(ContentEditor());
    },
    validateGroupInfo: function () {
      var group_id = this.$(".popup-box[data-popup=group]").attr('data-slug');
      var group_name = this.$("[data-popup=group] input[name='name']");
      var group_description = this.$("[data-popup=group] textarea");
      var error_flag = false;

      if (!group_name.val()) {
        this.customErrorMessage('Provide a name for group', this.$(group_name).parent(), this.$(group_name));
        error_flag = true;
      } else if (group_name.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(group_name).parent(), this.$(group_name));
        error_flag = true;
      } else if (group_name.val().length > parseInt($(group_name).attr('maxlength'))) {
        this.customErrorMessage('Maximum ' + parseInt($(group_name).attr('maxlength')) + ' characters allowed', this.$(group_name).parent(), this.$(group_name));
        error_flag = true;
      } else if (group_description.val().length > parseInt($(group_description).attr('maxlength'))) {
        this.customErrorMessage('Maximum ' + parseInt($(group_description).attr('maxlength')) + ' characters allowed', this.$(group_description).parent(), this.$(group_description));
        error_flag = true;
      }

      if (error_flag) return false;
      this.actionInProgress();
      var attrs = {
        'name': group_name.val(),
        'description': group_description.val(),
        'icon_id': this.$("[data-popup=group] .img-preview").attr('data-icon-id') || 0,
        'new_icon': false
      };

      if (group_id) {
        attrs.id = group_id;
      }

      var icon_file = this.$("[data-popup=group] input[type=file]");
      var icon_saved = true;

      if (icon_file.val()) {
        icon_saved = false;
        var icon_data = new FormData();
        icon_data.append('icon', icon_file[0].files[0]);
        icon_data.append('name', attrs['name']);
        icon_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
        var root = this;
        var icon = new Icon();
        icon.save(icon_data, {
          processData: false,
          cache: false,
          contentType: false,
          data: icon_data,
          success: function (model, response) {
            attrs['icon_id'] = response.icon_id;
            attrs['new_icon'] = true;
            root.saveGroupInfo(attrs);
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed();
          }
        });
      }

      if (icon_saved) {
        this.saveGroupInfo(attrs);
      }
    },
    publishGroup: function () {
      var group = new Group({
        'id': this.view.group.id,
        'publish': true
      });
      this.actionInProgress();
      var root = this;
      group.save(null, {
        patch: true,
        success: function () {
          root.actionSuccess();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed();
        }
      });
    },
    saveGroupInfo: function (attrs) {
      var group = new Group(attrs);
      var root = this;
      group.save(null, {
        success: function () {
          root.actionSuccess();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          if (attrs.icon_id && attrs.new_icon) {
            var icon = new Icon({
              id: attrs.icon_id
            });
            icon.destroy();
          }

          root.actionFailed();
        }
      });
    },
    saveSectionInfo: function () {
      var section_id = this.$(".popup-box[data-popup=section]").attr('data-id');
      var section_name = this.$("[data-popup=section] input[name='name']");
      var error_flag = false;

      if (!section_name.val()) {
        this.customErrorMessage('Provide a name for section', this.$(section_name).parent(), this.$(section_name));
        error_flag = true;
      } else if (section_name.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(section_name).parent(), this.$(section_name));
        error_flag = true;
      } else if (section_name.val().length > parseInt($(section_name).attr('maxlength'))) {
        this.customErrorMessage('Maximum ' + parseInt($(section_name).attr('maxlength')) + ' characters allowed', this.$(section_name).parent(), this.$(section_name));
        error_flag = true;
      }

      if (error_flag) return false;
      this.actionInProgress();
      var attrs = {
        'name': section_name.val(),
        'group_id': this.view.group.attributes.id
      };

      if (section_id) {
        attrs.id = section_id;
      }

      var root = this;
      var section = new Section(attrs);
      section.save(null, {
        success: function () {
          root.actionSuccess();
          setTimeout(function () {
            root.view.renderGroup(attrs.group_id);
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed();
        }
      });
    },
    saveQnAInfo: function () {
      var qna_id = this.$(".popup-box[data-popup=qna]").attr('data-id');
      var section_id = this.$(".popup-box[data-popup=qna]").attr('data-section-id');
      var qna_question = this.$("[data-popup=qna] input[name='question']");
      var qna_answer = this.$("[data-popup=qna] textarea");
      var error_flag = false;

      if (!qna_question.val()) {
        this.customErrorMessage('Provide a question', this.$(qna_question).parent(), this.$(qna_question));
        error_flag = true;
      } else if (qna_question.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a question with atleast an alphanumeric character', this.$(qna_question).parent(), this.$(qna_question));
        error_flag = true;
      } else if (qna_question.val().length > parseInt($(qna_question).attr('maxlength'))) {
        this.customErrorMessage('Maximum ' + parseInt($(qna_question).attr('maxlength')) + ' characters allowed', this.$(qna_question).parent(), this.$(qna_question));
        error_flag = true;
      } else if (!qna_answer.val()) {
        this.customErrorMessage('Provide a answer for question', this.$(qna_answer).parent(), this.$('[data-popup=qna]  .thumb-wrap'));
        error_flag = true;
      }

      if (error_flag) return false;
      this.actionInProgress();
      var attrs = {
        'group_id': this.view.group.id,
        'section_id': section_id,
        'question': qna_question.val(),
        'answer': qna_answer.val()
      };

      if (qna_id) {
        attrs.id = qna_id;
      }

      var root = this;
      var qna = new QnA(attrs);
      qna.save(null, {
        success: function () {
          root.actionSuccess();
          setTimeout(function () {
            root.view.renderGroup(root.view.group.attributes.id);
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed();
        }
      });
    },
    editEntity: function (event) {
      var popupName = this.$(event.currentTarget).attr('data-popup');
      var attrs = {
        'is_edit': true
      };
      attrs[popupName] = true;
      var root = this;

      if (popupName == 'group') {
        var group_id = this.$(event.currentTarget).parents('li').attr('data-slug');
        var group = new Group({
          id: group_id
        });
        group.fetch({
          success: function (model, group) {
            _.extend(attrs, group);

            root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            root.$('.popup-overlay').addClass('active');
            root.overlayCalc();
          }
        });
      } else if (popupName == 'section') {
        var section_id = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
        var section = new Section({
          id: section_id
        });
        section.fetch({
          success: function (model, section) {
            _.extend(attrs, section);

            root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            root.$('.popup-overlay').addClass('active');
            root.overlayCalc();
          }
        });
      } else if (popupName == 'qna') {
        var qna_id = this.$(event.currentTarget).parents('.faq-item').attr('data-id');
        var qna = new QnA({
          id: qna_id
        });
        qna.fetch({
          success: function (model, qna) {
            _.extend(attrs, qna);

            root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            root.$('.popup-overlay .popup-wrap #preview').html(attrs.answer);
            root.$('.popup-overlay').addClass('active');
            root.overlayCalc();
          }
        });
      }
    },
    deleteEntity: function (event) {
      var entityType = this.$(event.currentTarget).attr('data-type');
      this.actionInProgress();
      var root = this;
      var entityId = this.$(event.currentTarget).attr('data-id');

      if (entityType == 'group') {
        var group = new Group({
          id: entityId
        });
        group.destroy({
          success: function () {
            root.actionSuccess();
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          },
          error: function (xhr, status_code, error_message) {
            if (attrs.icon_id && attrs.new_icon) {
              var icon = new Icon({
                id: attrs.icon_id
              });
              icon.destroy();
            }

            root.actionFailed();
          }
        });
      } else if (entityType == 'section') {
        var section = new Section({
          id: entityId
        });
        section.destroy({
          success: function () {
            root.actionSuccess();
            setTimeout(function () {
              root.view.renderGroup(root.view.group.attributes.id);
            }, 1000);
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed();
          }
        });
      } else if (entityType == 'question') {
        var question = new QnA({
          id: entityId
        });
        question.destroy({
          success: function () {
            root.actionSuccess();
            setTimeout(function () {
              root.view.renderGroup(root.view.group.attributes.id);
            }, 1000);
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed();
          }
        });
      }
    },
    // Below are list of utility functions
    overlayCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    previewImage: function (event) {
      this.removeErrorMessages();
      var image = event.target.files[0];

      if (!image || !/\.(gif|jpg|jpeg|tiff|png)$/i.test(image.name)) {
        return false;
      }

      this.$(event.currentTarget).parents('.block').find('.file-name').text(image.name);
      this.$('.img-preview').attr('src', URL.createObjectURL(image));
      this.$(event.currentTarget).parents('.block').addClass('image-added');
    },
    removeErrorMessages: function () {
      this.$('.edit-tool-tip').remove();
      this.$('input').removeClass('error');
      this.$('textarea').removeClass('error');
    },
    removeImage: function (event) {
      this.$(event.currentTarget).parents('.block').removeClass('image-added');
      this.$('.img-preview').removeAttr('data-icon-id').removeAttr('src').removeAttr('style');
      this.$('.upload-file').val('');
    },
    showAdvanced: function (event) {
      this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
      var root = this;
      setTimeout(function () {
        root.$('.popup-box .content-block').animate({
          scrollTop: 750
        }, 'slow');
      }, 100);
    },
    showPopup: function (event) {
      var popupName = this.$(event.currentTarget).attr('data-popup');
      let target_class = this.$(event.currentTarget);

      if (!(target_class.hasClass('delete') || target_class.hasClass('publish-faq'))) {
        if (!Common.isDefaultLocale(this)) {
          this.overlayCalc();
          return;
        }
      }

      var attrs = {};
      attrs[popupName] = true;
      var entity_id;
      var entity_type = this.$(event.currentTarget).attr('data-type');

      if (entity_type == "group") {
        entity_id = this.$(event.currentTarget).parents('li').attr('data-slug');
      } else if (entity_type == "section" || entity_type == "qna") {
        entity_id = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
        attrs['section_id'] = entity_id;
      } else if (entity_type == "question") {
        attrs['section_id'] = this.$(event.currentTarget).parents('.faq-section').attr('data-id');
        entity_id = this.$(event.currentTarget).parents('.faq-item').attr('data-id');
      }

      attrs['entity_type'] = entity_type;
      attrs['entity_id'] = entity_id;
      this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
      this.$('.popup-overlay').addClass('active');
      this.overlayCalc();
    },
    hidePopup: function () {
      this.$('.popup-overlay').removeClass('active');
      this.$('.popup-wrap').html("");
    },
    charCounter: function (event) {
      this.removeErrorMessages();
      var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));
      var charLength = this.$(event.currentTarget).val().length;

      if (charLength <= maxChar) {
        var leftChar = maxChar - this.$(event.currentTarget).val().length;
        this.$(event.currentTarget).parents('.block').find('.counter').text(leftChar + " characters left");
      }
    },
    customErrorMessage: function (message, target, elem) {
      // Custome error messages goes here
      this.$('.edit-tool-tip').remove();
      var editToolTip = '<div class="edit-tool-tip">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.addClass('error');
    },
    showTextEditor: function () {
      $('#main_container').addClass('text-editor-active');
      var question = this.$('input[name="question"]').val();
      this.$('.text-editor-wrap .question span').text(question);
      var content = this.$('textarea[name ="answer"]').val();
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var uploadMethod = 'POST';
      var uploadParam = 'editor_file';

      if (content) {
        this.$('.content-editor-wrap').html(content);
      }

      this.$('.content-editor-wrap').froalaEditor({
        key: Common.FROALA_KEY,
        toolbarContainer: '#toolbar',
        charCounterCount: false,
        toolbarSticky: true,
        colorsDefaultTab: 'text',
        colorsStep: 7,
        tableResizerOffset: 10,
        colorsBackground: Common.FROALA_COLORS_BACKGROUND,
        colorsText: Common.FROALA_COLORS_TEXT,
        fontFamily: Common.FROALA_FONT_FAMILY,
        imageEditButtons: Common.FROALA_IMAGE_EDIT_BUTTONS,
        toolbarButtons: Common.FROALA_TOOLBAR_BUTTONS,
        linkAlwaysBlank: true,
        // Set the image upload parameter.
        imageUploadParam: uploadParam,
        // Set the image upload URL.
        imageUploadURL: Common.FROALA_RESOURCE_UPLOAD_URL,
        // Additional upload params.
        imageUploadParams: {
          csrf_token: csrf_token,
          type: 'image'
        },
        // Set request type.
        imageUploadMethod: uploadMethod,
        // Set the file upload parameter.
        fileUploadParam: uploadParam,
        // Set the file upload URL.
        fileUploadURL: Common.FROALA_RESOURCE_UPLOAD_URL,
        // Additional upload params.
        fileUploadParams: {
          csrf_token: csrf_token,
          type: 'rte_link'
        },
        // Set request type.
        fileUploadMethod: uploadMethod,
        // Set max file size to 300MB(Should be in bytes).
        fileMaxSize: 1024 * 1024 * 300,
        // disable video upload from local
        videoUpload: false
      }); // Add download attr to the added file.

      $('.content-editor-wrap').on('froalaEditor.file.inserted', function (e, editor, $file, response) {
        // response will be the resource api response.
        response = JSON.parse(response);
        $file.attr('download', response.name);
      });
      $('.content-editor-wrap').on('froalaEditor.paste.after', function (e, editor) {
        editor.$el.find('a').attr('target', '_blank');
      });
    },
    saveTextEditorChanges: function () {
      var htmlContent = this.$('.content-editor-wrap').froalaEditor('html.get', true);
      this.$('textarea[name ="answer"]').text(htmlContent);
      this.$('.popup-overlay .popup-wrap #preview').html(htmlContent);
      this.$('.popup-overlay .thumb-wrap img').addClass('hidden');
      this.cancelTextEditorChanges();
    },
    cancelTextEditorChanges: function () {
      this.$('.content-editor-wrap').froalaEditor('destroy');
      $('#main_container').removeClass('text-editor-active');
    },
    actionSuccess: function () {
      var root = this;
      setTimeout(function () {
        root.$('.form-sending').removeClass("slide-in is-submitted");
        root.$('.form-sent').addClass("slide-in");
        setTimeout(function () {
          root.$('.form-sent').removeClass("slide-in");
          root.hidePopup();
        }, 1000);
      }, 1000);
    },
    actionInProgress: function () {
      this.$('.form-sending').addClass("slide-in is-submitted");
    },
    actionFailed: function () {
      var root = this;
      setTimeout(function () {
        root.$('.form-sending').removeClass("slide-in is-submitted");
        root.$('.form-failed').addClass("slide-in");
        setTimeout(function () {
          root.$('.form-failed').removeClass("slide-in");
        }, 1000);
      }, 1000);
    }
  });
  return EditView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/faq/views/main.js":
/*!************************************************!*\
  !*** ./sharedemos/static/js/faq/views/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../templates/home.handlebars */ "./sharedemos/static/js/faq/templates/home.handlebars"), __webpack_require__(/*! ../templates/group_list.handlebars */ "./sharedemos/static/js/faq/templates/group_list.handlebars"), __webpack_require__(/*! ../templates/group.handlebars */ "./sharedemos/static/js/faq/templates/group.handlebars"), __webpack_require__(/*! ../models/group */ "./sharedemos/static/js/faq/models/group.js"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, HomeTemplate, GroupListTemplate, GroupTemplate, Group) {
  'use strict';

  var FaqView = Backbone.View.extend({
    el: '#main_container',
    events: {
      'click .faq-item .arrow': 'toggleFaqInfo',
      'click .return-home': 'backToHome'
    },
    initialize: function (group_id) {
      this.$("#search-terms").on('keyup', {
        'root': this,
        'common': Common
      }, Common.showSearchBox);
      this.$("#search-label").on('click', {
        'root': Common
      }, Common.showMobileSearchBox);
      this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {
        'root': Common
      }, Common.closeSearchBox);
      this.$(".search-input-cancel").on('click', {
        'root': Common
      }, Common.clearInputText);

      if (group_id) {
        this.renderGroup(group_id);
      } else {
        this.renderHome();
      }
    },
    renderHome: function () {
      utils.setSEOData(document.app_name, window.location.href);
      var root = this;
      this.group = null;
      var groups = new Group();
      groups.fetch({
        success: function (model, groups) {
          _.each(groups, function (grp) {
            var path = window.location.pathname.split('/');

            var home_url = _.initial(path).join('/');

            grp.link = home_url + '/' + grp.slug;

            if (document.requestParameters) {
              grp.editMode = true;
            }
          });

          root.$el.find('#block_container').html(HomeTemplate());
          root.$('.faq-block').append(GroupListTemplate({
            'groups': groups
          }));
          Backbone.trigger("home_rendered", root);
        }
      });
    },
    renderGroup: function (group_id) {
      this.group = new Group({
        id: group_id
      });
      var root = this;
      this.group.fetch({
        success: function (model, group) {
          if (document.requestParameters) {
            group.editMode = true;
          }

          if (document.viewType == 'main_faq') {
            _.each(group.sections, function (section) {
              _.each(section.questions, function (question) {
                if (!document.isPrivateTenant) {
                  let urlExp = new RegExp('"/static/media/', 'g');
                  question.answer = question.answer.replace(urlExp, `"${document.cdn_url}${Common.DEFAULT_MEDIA_PATH}`);
                }
              });
            });
          }

          root.$el.find('#block_container').html(GroupTemplate(group));
          root.$('.fr-element.fr-view.content-slide').find('a').attr('target', '_blank');
          Backbone.trigger("explore_faq", root);
        }
      });
    },
    backToHome: function () {
      var path = window.location.pathname.split('/');

      var home_url = _.initial(path).join('/');

      window.location.href = home_url;
    },
    toggleFaqInfo: function (event) {
      var faqBlock = this.$(event.currentTarget).parents('.faq-item');

      if (this.$(faqBlock).hasClass('open')) {
        this.$(faqBlock).removeClass("open");
        this.$(faqBlock).find('.info-block').slideUp('linear');
      } else {
        this.$(faqBlock).addClass("open");
        this.$(faqBlock).find('.info-block').slideDown('linear');
      }

      ;
    }
  });
  return FaqView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/helpers/handlebars/math.js":
/*!*********************************************************!*\
  !*** ./sharedemos/static/js/helpers/handlebars/math.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
};

/***/ }),

/***/ "./sharedemos/static/js/utils.js":
/*!***************************************!*\
  !*** ./sharedemos/static/js/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

utils = function () {
  var utils = {
    SECTION_IMAGE_PATH: '/static/images/vmware/default-category-icon.png',
    setSEOData: function (title, url, description, image) {
      var image_path = window.location.origin;

      if (image) {
        image_path += '/static/media/' + image;
      } else {
        image_path += this.SECTION_IMAGE_PATH;
      }

      description = description || "";
      this.setPageTitle(title);
      this.setMetaDescription(description);
      this.setOpenGraphValues(title, url, description, image_path);
      this.setTwitterValues(title, url, description, image_path);
    },
    setMetaDescription: function (description) {
      $("meta[name='description']").attr("content", description);
    },
    setOpenGraphValues: function (title, url, description, image) {
      $('meta[property="og:type"]').attr("content", "website");
      $('meta[property="og:title"]').attr("content", title);
      $('meta[property="og:description"]').attr("content", description);
      $('meta[property="og:url"]').attr("content", url);
      $('meta[property="og:image"]').attr("content", image);
    },
    setPageTitle: function (title) {
      $("title").text(title);
    },
    setTwitterValues: function (title, url, description, image) {
      $('meta[name="twitter:card"]').attr("content", "summary");
      $('meta[name="twitter:title"]').attr("content", title);
      $('meta[name="twitter:url"]').attr("content", url);
      $('meta[name="twitter:description"]').attr("content", description);
      $('meta[name="twitter:image"]').attr("content", image);
    },
    removeSEOData: function () {
      $("title").text("");
      $('meta[name="description"], meta[property^="og"], meta[name^="twitter"]').attr("content", "");
    }
  };
  return utils;
}();

/***/ })

}]);
//# sourceMappingURL=19.e1e4b4.js.map