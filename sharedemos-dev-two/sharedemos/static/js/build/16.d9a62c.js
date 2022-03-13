(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./sharedemos/static/js/pathfinder/models/answer.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/answer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Answer = Backbone.Model.extend({
    urlRoot: "/api/answer"
  });
  return Answer;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/mail_suggestions.js":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/mail_suggestions.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var SuggestionMailer = Backbone.Model.extend({
    urlRoot: "/mail-pathfinder-suggestions/"
  });
  return SuggestionMailer;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/option.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/option.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone) {
  'use strict';

  var Option = Backbone.Model.extend({
    urlRoot: "/api/option",
    url: function () {
      var base = _.result(this, 'urlRoot');

      if (this.isNew()) return base;

      if (this.id) {
        base += '/' + encodeURIComponent(this.id);
      }

      if (this.get('child')) {
        base += '/' + encodeURIComponent(this.get('child'));
      }

      return base;
    }
  });
  return Option;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/path-activity.js":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/path-activity.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var PathActivity = Backbone.Model.extend({
    urlRoot: "/path-finder-activity"
  });
  return PathActivity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/path.js":
/*!********************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/path.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Path = Backbone.Model.extend({
    urlRoot: "/api/path"
  });
  return Path;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/question.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/question.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Question = Backbone.Model.extend({
    urlRoot: "/api/question"
  });
  return Question;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/suggestions.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/suggestions.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Suggestions = Backbone.Model.extend({
    urlRoot: "/api/suggestions"
  });
  return Suggestions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/models/suggestions_groups.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/models/suggestions_groups.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var SuggestionsGroups = Backbone.Model.extend({
    urlRoot: "/api/suggestions_groups"
  });
  return SuggestionsGroups;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/add_new.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/add_new.handlebars ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_block\" data-popup=\"add_path\">\r\n	<img src=\"/static/images/author/add_pathfinder.png\" />\r\n	<h3 class= 'capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":29},"end":{"line":4,"column":48}}}))
    + "</h3>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"add_question") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":21,"column":0}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_block\" data-popup=\"add_question\">\r\n	<img src=\"/static/images/author/add_pathfinder.png\" />\r\n	<h3 class= 'capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":29},"end":{"line":9,"column":52}}}))
    + "</h3>\r\n</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"add_option") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":11,"column":0},"end":{"line":21,"column":0}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_block\" data-popup=\"choose_option\">\r\n	<img src=\"/static/images/author/add_pathfinder.png\" />\r\n	<h3 class= 'capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":29},"end":{"line":14,"column":50}}}))
    + "</h3>\r\n</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"add_suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":0},"end":{"line":21,"column":0}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "<div class=\"add_block\" data-popup=\"add_results_to\">\r\n	<img src=\"/static/images/author/add_pathfinder.png\" />\r\n	<h3 class= 'capital-letter'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":29},"end":{"line":19,"column":61}}}))
    + "</h3>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"add_path") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":21,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/edit_option.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/edit_option.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "			<div class=\"pf_edit_option edit camel-case\" data-popup=\"add_path\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":69},"end":{"line":4,"column":89}}}))
    + "</div>\r\n			<div class=\"pf_edit_option delete camel-case\" data-attr=\"path\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":66},"end":{"line":5,"column":88}}}))
    + "</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "			<div class=\"pf_edit_option edit camel-case\" data-popup=\"add_question\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":73},"end":{"line":8,"column":97}}}))
    + "</div>\r\n			<div class=\"pf_edit_option delete camel-case\" data-attr=\"question\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":70},"end":{"line":9,"column":96}}}))
    + "</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_add_question") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":14,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_add_suggestion") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":3},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"update_question_link") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":3},"end":{"line":20,"column":10}}})) != null ? stack1 : "")
    + "			<div class=\"pf_edit_option edit camel-case\" data-popup=\"add_option\" data-option-type=\"text_image\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":101},"end":{"line":21,"column":123}}}))
    + "</div>\r\n			<div class=\"pf_edit_option delete camel-case\" data-attr=\"option\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":68},"end":{"line":22,"column":92}}}))
    + "</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"pf_edit_option camel-case\" data-popup=\"add_next_question\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add next question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":74},"end":{"line":13,"column":102}}}))
    + "</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"pf_edit_option camel-case\" data-popup=\"add_suggestions_warning\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add suggestions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":80},"end":{"line":16,"column":106}}}))
    + "</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"pf_edit_option update camel-case\" data-popup=\"add_link\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"update question link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":72},"end":{"line":19,"column":103}}}))
    + "</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"pf_edit_option edit camel-case\" data-popup=\"edit_suggestions_headers\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit header",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":85},"end":{"line":25,"column":107}}}))
    + "</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"same_locale") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":3},"end":{"line":30,"column":10}}})) != null ? stack1 : "")
    + "     			<div class=\"pf_edit_option delete camel-case\" data-popup=\"delete_entity\" data-attr=\"suggestion\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":104},"end":{"line":31,"column":121}}}))
    + "</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"pf_edit_option edit camel-case\" data-popup=\"edit_suggestion\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit suggestion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":78},"end":{"line":29,"column":104}}}))
    + "</div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "			<div class=\"pf_edit_option edit camel-case\" data-popup=\"add_suggestions_group\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":34,"column":82},"end":{"line":34,"column":103}}}))
    + "</div>\r\n			<div class=\"pf_edit_option delete camel-case\" data-attr=\"group\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":67},"end":{"line":35,"column":90}}}))
    + "</div>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"pf_drag\"></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pf_edit\">\r\n	<div class=\"pf_edit_wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_path") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":6,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_question") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":10,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_option") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":23,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_suggestions_headers") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":2},"end":{"line":26,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"remove_suggestion") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":2},"end":{"line":32,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_suggestions_group") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":8},"end":{"line":36,"column":9}}})) != null ? stack1 : "")
    + "	</div>\r\n</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_path") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":0},"end":{"line":41,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_option") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":0},"end":{"line":44,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/mail_suggestions.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/mail_suggestions.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"pf-gray-bg\"></div>\r\n<div id=\"pf_save_popup\">\r\n	<div class=\"save_header\">\r\n		<h4>Your <i>suggestions</i>, ready for you.</h4>\r\n		<p>Enter your email address and save these suggestions.</p>\r\n	</div>\r\n	<p>Brew a cup, we'll email you these custom suggestions.</p>\r\n	<div class=\"pf_receiver_details\">\r\n		<input type=\"email\" placeholder=\"Your Email Address\" name=\"pf-email\" id=\"pf-email\" autocomplete=\"off\">\r\n		<input type=\"button\" class=\"submit_suggestion\" value=\"send me this list\" />\r\n	</div>\r\n	<div class=\"pf_success_block\">\r\n		<div class=\"success_icon\"></div>\r\n		<div class=\"pf_success_msg\">Your custom suggestions have been sent!</div>\r\n	</div>\r\n	<div class=\"suggestion_note\">Don’t worry, we won’t spam.</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/paths.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/paths.handlebars ***!
  \********************************************************************/
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

  return "<h2 class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"what are you looking for today?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":22},"end":{"line":2,"column":64}}}))
    + "</h2>\n<p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select one of the available pathfinders to find a solution",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":21},"end":{"line":3,"column":90}}}))
    + ".</p>\n<ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"paths") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":4},"end":{"line":20,"column":13}}})) != null ? stack1 : "")
    + "</ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <li data-path='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\n        	<div class=\"pf-icon-wrap\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":13,"column":19}}})) != null ? stack1 : "")
    + "        	</div>\n            <div class=\"pf_desc\">\n               <h3>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h3>\n               <p>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</p>\n            </div>\n        </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img class=\"pf-icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"image_src") : depth0), depth0))
    + "\" />\n                <span class=\"img-magnifying\"></span>  \n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            	<img class=\"pf-icon default\" src=\"/static/images/default_path_icon.jpg\"/>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<h2 class=\"no-pf-result sub-title\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"no paths found at this time. try again later",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":35},"end":{"line":23,"column":90}}}))
    + "</h2>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"paths") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":24,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/popups.handlebars":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/popups.handlebars ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_path\">\r\n    <div class=\"popup-title camel-case\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":84}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":47},"end":{"line":9,"column":62}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enter path title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":35},"end":{"line":10,"column":62}}}))
    + "</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\"Path Title\" />\r\n            <div class=\"counter sub-title\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":59},"end":{"line":12,"column":85}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":31},"end":{"line":15,"column":53}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enter path description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":35},"end":{"line":16,"column":68}}}))
    + "</div>\r\n            <textarea name=\"description\" maxlength=\"200\" placeholder=\"Path Description\"></textarea>\r\n            <div class=\"counter sub-title\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":65},"end":{"line":18,"column":91}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":31},"end":{"line":21,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":35},"end":{"line":22,"column":82}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\" >\r\n            <img class=\"img-preview\">\r\n            <div class=\"file_name sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":45},"end":{"line":25,"column":65}}}))
    + "</div>\r\n            <div class=\"remove_file capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":52},"end":{"line":26,"column":69}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":37},"end":{"line":27,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_path\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":32,"column":47},"end":{"line":32,"column":64}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":33,"column":30},"end":{"line":33,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":33},"end":{"line":35,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":31},"end":{"line":36,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":34},"end":{"line":37,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":23},"end":{"line":5,"column":43}}}));
},"4":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":51},"end":{"line":5,"column":77}}}));
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_question\">\r\n    <div class=\"popup-title\">\r\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":45,"column":4},"end":{"line":45,"column":88}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":47},"end":{"line":49,"column":66}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a question about the following path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":35},"end":{"line":50,"column":87}}}))
    + ".</div>\r\n            <textarea name=\"title\" class=\"\" maxlength=\"200\" placeholder=\"Question\"></textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":52,"column":49},"end":{"line":52,"column":75}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":55,"column":31},"end":{"line":55,"column":62}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes your question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":35},"end":{"line":56,"column":105}}}))
    + ".</div>\r\n            <textarea name=\"description\" class=\"\" maxlength=\"1000\" placeholder=\"Description\"></textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":58,"column":55},"end":{"line":58,"column":81}}}))
    + "</div>\r\n        </div>\r\n        <hr class=\"break\"/>\r\n        <div class=\"advanced capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":61,"column":45},"end":{"line":61,"column":64}}}))
    + "</div>\r\n        <div class=\"block advanced-block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":63,"column":31},"end":{"line":63,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":64,"column":35},"end":{"line":64,"column":86}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file_name\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":67,"column":35},"end":{"line":67,"column":55}}}))
    + "</div>\r\n            <div class=\"remove_file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":68,"column":37},"end":{"line":68,"column":54}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":69,"column":37},"end":{"line":69,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_question\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":74,"column":51},"end":{"line":74,"column":68}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":75,"column":30},"end":{"line":75,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":33},"end":{"line":77,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":31},"end":{"line":78,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":79,"column":34},"end":{"line":79,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":19},"end":{"line":45,"column":43}}}));
},"9":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":51},"end":{"line":45,"column":81}}}));
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box choose_option"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":35},"end":{"line":85,"column":71}}})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_id") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":73},"end":{"line":85,"column":124}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_add_cta") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":125},"end":{"line":85,"column":161}}})) != null ? stack1 : "")
    + ">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":87,"column":8},"end":{"line":87,"column":86}}})) != null ? stack1 : "")
    + "        \r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"sub-title style\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":37},"end":{"line":90,"column":53}}}))
    + "</div>\r\n        <div class=\"block\">\r\n            <div class=\"choose_layout text\" data-popup=\"add_option\" data-option-type=\"text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":92,"column":92},"end":{"line":92,"column":107}}}))
    + "</div>\r\n            <div class=\"choose_layout image\" data-popup=\"add_option\" data-option-type=\"image\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":93,"column":94},"end":{"line":93,"column":110}}}))
    + "</div>\r\n            <div class=\"choose_layout text_image\" data-popup=\"add_option\" data-option-type=\"text_image\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text & image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":94,"column":104},"end":{"line":94,"column":127}}}))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_add_cta") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":12},"end":{"line":97,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"choose_option\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":102,"column":52},"end":{"line":102,"column":69}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return " switch_option";
},"14":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-option=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + "\"";
},"16":function(container,depth0,helpers,partials,data) {
    return " add_cta ";
},"18":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"switch option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":87,"column":23},"end":{"line":87,"column":47}}}));
},"20":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":87,"column":55},"end":{"line":87,"column":79}}}));
},"22":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"choose_layout cta capital-letter\" data-popup=\"add_option\" data-option-type=\"cta\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"cta button",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":96,"column":105},"end":{"line":96,"column":126}}}))
    + "</div>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box add_next_question\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create new question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":111,"column":8},"end":{"line":111,"column":38}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"sub-title style\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":114,"column":37},"end":{"line":114,"column":53}}}))
    + "</div>\r\n        <div class=\"block\">\r\n            <div class=\"choose_layout new_question capital-letter\" data-popup=\"add_question\" >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":116,"column":94},"end":{"line":116,"column":108}}}))
    + "</div>\r\n            <div class=\"choose_layout link capital-letter\" data-popup=\"add_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link existing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":117,"column":81},"end":{"line":117,"column":105}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_next_question\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":56},"end":{"line":122,"column":73}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"26":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box confirm_publish_pf\">\r\n    <div class=\"popup-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":131,"column":12},"end":{"line":131,"column":38}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":136,"column":20},"end":{"line":136,"column":76}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_publish_pf\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":142,"column":61},"end":{"line":142,"column":78}}}))
    + "</div>\r\n                <div class=\"publish_pathfinder publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":56},"end":{"line":143,"column":74}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":145,"column":37},"end":{"line":145,"column":77}}}))
    + ".</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":146,"column":35},"end":{"line":146,"column":96}}}))
    + ".!</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":147,"column":38},"end":{"line":147,"column":59}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_option\">  \r\n    <div class=\"popup-title\">\r\n        <div class=\"back "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":155,"column":25},"end":{"line":155,"column":60}}})) != null ? stack1 : "")
    + "\" data-popup=\"choose_option\" ></div>\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.program(33, data, 0),"data":data,"loc":{"start":{"line":156,"column":8},"end":{"line":156,"column":70}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.program(38, data, 0),"data":data,"loc":{"start":{"line":156,"column":70},"end":{"line":157,"column":48}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"content-block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":160,"column":4},"end":{"line":167,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":168,"column":4},"end":{"line":178,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_cta") : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":179,"column":4},"end":{"line":186,"column":11}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_option\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":190,"column":49},"end":{"line":190,"column":66}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":191,"column":30},"end":{"line":191,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":193,"column":33},"end":{"line":193,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":194,"column":31},"end":{"line":194,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":195,"column":34},"end":{"line":195,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "switch_option";
},"31":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":23},"end":{"line":156,"column":38}}}));
},"33":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":46},"end":{"line":156,"column":63}}}));
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":90},"end":{"line":156,"column":105}}}))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":156,"column":105},"end":{"line":156,"column":151}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":152},"end":{"line":156,"column":169}}}));
},"36":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"& image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":126},"end":{"line":156,"column":144}}}));
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.program(41, data, 0),"data":data,"loc":{"start":{"line":156,"column":169},"end":{"line":157,"column":41}}})) != null ? stack1 : "");
},"39":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"image option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":194},"end":{"line":156,"column":217}}}))
    + "\r\n        ";
},"41":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"option_cta") : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":157,"column":8},"end":{"line":157,"column":41}}})) != null ? stack1 : "");
},"42":function(container,depth0,helpers,partials,data) {
    return " CTA Button";
},"44":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":162,"column":47},"end":{"line":162,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes your option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":163,"column":35},"end":{"line":163,"column":103}}}))
    + ".</div>\r\n            <textarea name=\"description\" class=\"\" maxlength=\"250\" placeholder=\"Option Description\"></textarea>\r\n            <div class=\"counter\">"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":165,"column":55},"end":{"line":165,"column":81}}}))
    + "</div>\r\n       </div>\r\n";
},"46":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\" img_block>\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":170,"column":47},"end":{"line":170,"column":70}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":171,"column":35},"end":{"line":171,"column":84}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file_name\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":174,"column":35},"end":{"line":174,"column":55}}}))
    + "</div>\r\n            <div class=\"remove_file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":175,"column":37},"end":{"line":175,"column":54}}}))
    + "</div>\r\n            <label for=\"upload-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":176,"column":58},"end":{"line":176,"column":75}}}))
    + "</label>\r\n        </div>\r\n";
},"48":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cta button text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":181,"column":47},"end":{"line":181,"column":73}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write some text that will be displayed inside the button",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":182,"column":35},"end":{"line":182,"column":102}}}))
    + "</div>\r\n            <textarea name=\"description\" class=\"\" maxlength=\"100\" placeholder=\"Button Text\"></textarea>\r\n            <div class=\"counter\">"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":184,"column":55},"end":{"line":184,"column":81}}}))
    + "</div>\r\n        </div>\r\n";
},"50":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_link\">\r\n    <div class=\"popup-title\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"unlinked_option") : depth0),{"name":"if","hash":{},"fn":container.program(51, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":203,"column":8},"end":{"line":205,"column":15}}})) != null ? stack1 : "")
    + "        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link existing question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":206,"column":8},"end":{"line":206,"column":41}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <input class=\"search\" type=\"text\" placeholder=\"Search Content\" />\r\n            <div class=\"link_block search_block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"questions") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(53, data, 0),"inverse":container.program(59, data, 0),"data":data,"loc":{"start":{"line":212,"column":16},"end":{"line":228,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":234,"column":47},"end":{"line":234,"column":64}}}))
    + "</div>\r\n            <div class=\"link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":235,"column":30},"end":{"line":235,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":237,"column":33},"end":{"line":237,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":238,"column":31},"end":{"line":238,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":239,"column":34},"end":{"line":239,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"51":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"back\" data-popup=\"add_next_question\"></div>\r\n";
},"53":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"unlinked_option") : depth0),{"name":"unless","hash":{},"fn":container.program(54, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":213,"column":20},"end":{"line":218,"column":31}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"questions") : depth0),{"name":"each","hash":{},"fn":container.program(56, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":219,"column":20},"end":{"line":225,"column":29}}})) != null ? stack1 : "");
},"54":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"links\">\r\n                            <input type=\"radio\" name=\"radiog_lite\" id=\"none\" value=\"\" class=\"css-checkbox\">\r\n                            <label for=\"none\" class=\"css-label\">None</label>\r\n                        </div>\r\n";
},"56":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"links\">\r\n                        <input type=\"radio\" name=\"radiog_lite\" id=\"q"
    + alias2(alias1((data && lookupProperty(data,"index")), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"question_id") : depth0), depth0))
    + "\" class=\"css-checkbox\" \r\n                        "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_current") : depth0),{"name":"if","hash":{},"fn":container.program(57, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":222,"column":24},"end":{"line":222,"column":68}}})) != null ? stack1 : "")
    + ">\r\n                        <label for=\"q"
    + alias2(alias1((data && lookupProperty(data,"index")), depth0))
    + "\" class=\"css-label\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</label>\r\n                    </div>\r\n";
},"57":function(container,depth0,helpers,partials,data) {
    return " checked=\"checked\" ";
},"59":function(container,depth0,helpers,partials,data) {
    return "                    <p>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"no questions added yet!!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":227,"column":23},"end":{"line":227,"column":58}}}))
    + "</p>\r\n";
},"61":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box delete_entity\">\r\n    <div class=\"popup-title\">\r\n        Delete "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"you’ve made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":252,"column":35},"end":{"line":252,"column":74}}}))
    + "\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"are you sure you want to delete this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":253,"column":16},"end":{"line":253,"column":63}}}))
    + " "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "?\r\n            </div>\r\n        </div>      \r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"delete_entity\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":259,"column":52},"end":{"line":259,"column":69}}}))
    + "</div>\r\n            <div class=\"delete\" data-type='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "' data-id='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"entity_id") : depth0), depth0))
    + "'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":260,"column":84},"end":{"line":260,"column":101}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! deleting failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":262,"column":33},"end":{"line":262,"column":65}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":263,"column":31},"end":{"line":263,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":264,"column":34},"end":{"line":264,"column":53}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"63":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_suggestions_warning\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"confirm add suggestions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":272,"column":8},"end":{"line":272,"column":42}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"sub-title\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"adding suggested content for your users will finish this trail",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":277,"column":16},"end":{"line":277,"column":89}}}))
    + ".<br />\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you will not be able to add any further questions under this option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":278,"column":16},"end":{"line":278,"column":94}}}))
    + ".\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_suggestions_warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":284,"column":62},"end":{"line":284,"column":79}}}))
    + "</div>\r\n            <div class=\"continue\" data-prev-option-id="
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"prev_option_id") : depth0), depth0))
    + ">CONTINUE</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":287,"column":33},"end":{"line":287,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":288,"column":31},"end":{"line":288,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":289,"column":34},"end":{"line":289,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"65":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box edit_suggestions_headers\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit header text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":297,"column":8},"end":{"line":297,"column":35}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":301,"column":47},"end":{"line":301,"column":63}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a title for the results page header",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":302,"column":35},"end":{"line":302,"column":87}}}))
    + ".</div>\r\n            <textarea name=\"title\" class=\"\" maxlength=\"120\" placeholder=\"Write something\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":304,"column":49},"end":{"line":304,"column":75}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":307,"column":47},"end":{"line":307,"column":69}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a description to your header",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":308,"column":35},"end":{"line":308,"column":80}}}))
    + ".</div>\r\n            <textarea name=\"description\" class=\"\" maxlength=\"2000\" placeholder=\"Description\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":310,"column":55},"end":{"line":310,"column":81}}}))
    + "</div>\r\n        </div>\r\n        <hr class=\"break\"/>\r\n        <div class=\"advanced\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":313,"column":30},"end":{"line":313,"column":49}}}))
    + "</div>\r\n        <div class=\"block advanced-block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":315,"column":31},"end":{"line":315,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your suggestions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":316,"column":35},"end":{"line":316,"column":89}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file_name\">File name</div>\r\n            <div class=\"remove_file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":320,"column":37},"end":{"line":320,"column":54}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":321,"column":37},"end":{"line":321,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"edit_suggestions_headers\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":326,"column":63},"end":{"line":326,"column":80}}}))
    + "</div>\r\n            <div class=\"save\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":327,"column":30},"end":{"line":327,"column":45}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":329,"column":33},"end":{"line":329,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":330,"column":31},"end":{"line":330,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":331,"column":34},"end":{"line":331,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"67":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box edit_suggestion\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit suggestion text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":339,"column":8},"end":{"line":339,"column":39}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":343,"column":47},"end":{"line":343,"column":63}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a title for the suggestion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":344,"column":35},"end":{"line":344,"column":78}}}))
    + ".</div>\r\n            <textarea name=\"title\" class=\"\" maxlength=\"200\" placeholder=\"Write something\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":346,"column":49},"end":{"line":346,"column":75}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"edit_suggestion\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":351,"column":54},"end":{"line":351,"column":71}}}))
    + "</div>\r\n            <div class=\"save\" data-id='"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"suggestion_id") : depth0), depth0))
    + "'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"update",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":352,"column":58},"end":{"line":352,"column":75}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":354,"column":33},"end":{"line":354,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":355,"column":31},"end":{"line":355,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":356,"column":34},"end":{"line":356,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"69":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box add_results_to\">\r\n    <div class=\"popup-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add results",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":363,"column":29},"end":{"line":363,"column":51}}}))
    + "</div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"sub-title style\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":366,"column":41},"end":{"line":366,"column":57}}}))
    + "</div>\r\n            <div class=\"suggetsion_group\">\r\n                <div class=\"single_list_suggestion add_block\" data-popup=\"add_suggestions\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"single list",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":368,"column":91},"end":{"line":368,"column":113}}}))
    + "</div>\r\n                <div class=\"group_list_suggestion add_block\" data-popup=\"add_suggestions_group\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"group list",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":369,"column":96},"end":{"line":369,"column":117}}}))
    + "</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"add_results_to\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":375,"column":53},"end":{"line":375,"column":70}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"71":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box add_suggestions\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":385,"column":8},"end":{"line":385,"column":40}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":389,"column":47},"end":{"line":389,"column":75}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose suggested content from internal or external source to finish this path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":390,"column":35},"end":{"line":390,"column":123}}}))
    + ".</div>\r\n            <div class=\"suggetsion_type\">\r\n                <input type=\"radio\" id=\"link_chapter\" name=\"cta_type\"  class=\"css-radio\" checked=\"checked\" value=\"cta-link\">\r\n                <label class=\"css-radio-label\" for=\"link_chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapters from your internal library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":393,"column":66},"end":{"line":393,"column":112}}}))
    + "</label>\r\n                <div class=\"content_suggestion\">\r\n                    <div class=\"browse\" data-popup=\"add_suggested_chapters\" data-popup-from=\"add_suggestions\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse your library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":395,"column":110},"end":{"line":395,"column":140}}}))
    + "</div>\r\n                    <div class=\"selected_chapters\"></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"suggetsion_type\">\r\n                <input type=\"radio\" id=\"link_external\" name=\"cta_type\"  class=\"css-radio\" value=\"cta-link\" >\r\n                <label class=\"css-radio-label\" for=\"link_external\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":401,"column":67},"end":{"line":401,"column":102}}}))
    + "</label>\r\n                <div class=\"content_suggestion disabled\">\r\n                    <div class=\"external-links\"></div>\r\n                    <input class=\"suggestion_link\" placeholder=\"http://\" type=\"url\" disabled=\"true\"/>\r\n                    <div class=\"add_suggestion_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":405,"column":53},"end":{"line":405,"column":67}}}))
    + "</div>\r\n                    <div class=\"loader\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"add_block cancel\" data-popup=\"add_results_to\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":413,"column":70},"end":{"line":413,"column":87}}}))
    + "</div>\r\n            <div class=\"save_suggestions\" disabled=\"true\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":414,"column":58},"end":{"line":414,"column":73}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":416,"column":33},"end":{"line":416,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":417,"column":31},"end":{"line":417,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":418,"column":34},"end":{"line":418,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"73":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_suggestions_group\">\r\n    <div class=\"popup-title\">\r\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(74, data, 0),"inverse":container.program(76, data, 0),"data":data,"loc":{"start":{"line":426,"column":4},"end":{"line":426,"column":67}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":426,"column":68},"end":{"line":426,"column":102}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"group title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":430,"column":47},"end":{"line":430,"column":69}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a title for this group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":431,"column":35},"end":{"line":431,"column":75}}}))
    + "</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\"Name\" />\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":433,"column":49},"end":{"line":433,"column":75}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"group description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":436,"column":47},"end":{"line":436,"column":75}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that describes the suggested content in this group",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":437,"column":35},"end":{"line":437,"column":122}}}))
    + "</div>\r\n            <textarea name=\"description\" maxlength=\"200\" placeholder=\"Description\"></textarea>\r\n            <div class=\"counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":439,"column":55},"end":{"line":439,"column":81}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":442,"column":31},"end":{"line":442,"column":59}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose suggested content from internal or external source to finish this path",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":443,"column":35},"end":{"line":443,"column":123}}}))
    + ".</div>\r\n            <div class=\"suggetsion_type\">\r\n                <input type=\"radio\" id=\"link_chapter\" name=\"cta_type\"  class=\"css-radio\" checked=\"checked\" value=\"cta-link\">\r\n                <label class=\"css-radio-label\" for=\"link_chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapters from your internal library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":446,"column":66},"end":{"line":446,"column":112}}}))
    + "</label>\r\n                <div class=\"content_suggestion\">\r\n                    <div class=\"browse capital-letter\" data-popup=\"add_suggested_chapters\" data-popup-from=\"add_suggestions_group\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse your library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":448,"column":131},"end":{"line":448,"column":161}}}))
    + "</div>\r\n                    <div class=\"selected_chapters\"></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"suggetsion_type\">\r\n                <input type=\"radio\" id=\"link_external\" name=\"cta_type\"  class=\"css-radio\" value=\"cta-link\" >\r\n                <label class=\"css-radio-label\" for=\"link_external\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":454,"column":67},"end":{"line":454,"column":102}}}))
    + "</label>\r\n                <div class=\"content_suggestion disabled\">\r\n                    <div class=\"external-links\"></div>\r\n                    <input class=\"suggestion_link\" placeholder=\"http://\" type=\"url\" disabled=\"true\"/>\r\n                    <div class=\"add_suggestion_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":458,"column":53},"end":{"line":458,"column":67}}}))
    + "</div>\r\n                    <div class=\"loader\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"add_block cancel\" data-popup=\"add_results_to\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":466,"column":70},"end":{"line":466,"column":87}}}))
    + "</div>\r\n            <div class=\"save_suggestions_group\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(78, data, 0),"inverse":container.program(80, data, 0),"data":data,"loc":{"start":{"line":467,"column":48},"end":{"line":467,"column":110}}})) != null ? stack1 : "")
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":469,"column":33},"end":{"line":469,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":470,"column":31},"end":{"line":470,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":471,"column":34},"end":{"line":471,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"74":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":426,"column":20},"end":{"line":426,"column":35}}}))
    + " ";
},"76":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":426,"column":45},"end":{"line":426,"column":59}}}))
    + " ";
},"78":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"update",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":467,"column":63},"end":{"line":467,"column":80}}}));
},"80":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":467,"column":88},"end":{"line":467,"column":103}}}));
},"82":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box add_suggested_chapters\">\r\n    <div class=\"popup-title\">\r\n        <div class=\"back\"></div>\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":480,"column":8},"end":{"line":480,"column":33}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <input class=\"search\" type=\"text\" placeholder=\"Search Content\" />\r\n            <div class=\"chapter_block search_block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapters") : depth0),{"name":"each","hash":{},"fn":container.program(83, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":486,"column":16},"end":{"line":491,"column":25}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"back\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":497,"column":30},"end":{"line":497,"column":47}}}))
    + "</div>\r\n            <div class=\"add\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":498,"column":29},"end":{"line":498,"column":44}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":500,"column":33},"end":{"line":500,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":501,"column":31},"end":{"line":501,"column":61}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":502,"column":34},"end":{"line":502,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"83":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"chapters\">\r\n                    <input type=\"checkbox\" name=\"suggestions\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(84, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":488,"column":93},"end":{"line":488,"column":123}}})) != null ? stack1 : "")
    + " class=\"css-checkbox\">\r\n                    <label for=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"css-label\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</label>\r\n                </div>\r\n";
},"84":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Add paths -->\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_path") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":40,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_question") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":0},"end":{"line":82,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"choose_option") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":84,"column":0},"end":{"line":106,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_next_question") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":108,"column":0},"end":{"line":126,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"publish_path_finder") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":128,"column":0},"end":{"line":150,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_option") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":152,"column":0},"end":{"line":198,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_link") : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":200,"column":0},"end":{"line":242,"column":7}}})) != null ? stack1 : "")
    + "\r\n<!-- Delete Entitys -->\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"delete_entity") : depth0),{"name":"if","hash":{},"fn":container.program(61, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":245,"column":0},"end":{"line":267,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggestions_warning") : depth0),{"name":"if","hash":{},"fn":container.program(63, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":269,"column":0},"end":{"line":292,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_suggestions_headers") : depth0),{"name":"if","hash":{},"fn":container.program(65, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":294,"column":0},"end":{"line":334,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_suggestion") : depth0),{"name":"if","hash":{},"fn":container.program(67, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":336,"column":0},"end":{"line":359,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_results_to") : depth0),{"name":"if","hash":{},"fn":container.program(69, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":361,"column":0},"end":{"line":379,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(71, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":382,"column":0},"end":{"line":421,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggestions_group") : depth0),{"name":"if","hash":{},"fn":container.program(73, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":423,"column":0},"end":{"line":474,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggested_chapters") : depth0),{"name":"if","hash":{},"fn":container.program(82, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":476,"column":0},"end":{"line":505,"column":7}}})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/question.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/question.handlebars ***!
  \***********************************************************************/
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

  return "		<p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"subtext") : stack1), depth0))
    + "</p>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"pf-icon-wrap\">\r\n			<img class=\"pf-icon pf-question-icon\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"image_src") : stack1), depth0))
    + "\" />\r\n			<span class=\"img-magnifying\"></span>\r\n		</div>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<ul data-answer=\"option\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"options") : stack1),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":2},"end":{"line":26,"column":11}}})) != null ? stack1 : "")
    + "	</ul>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<li option-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depths[1] != null ? lookupProperty(depths[1],"current_option_selected") : depths[1]),"==",(depth0 != null ? lookupProperty(depth0,"option_id") : depth0),{"name":"compare","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":29},"end":{"line":17,"column":110}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":17,"column":111},"end":{"line":17,"column":173}}})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":3},"end":{"line":23,"column":10}}})) != null ? stack1 : "")
    + "			<div class=\"option_desc\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</div>\r\n		</li>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " class='active'";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " image"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"text") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":129},"end":{"line":17,"column":153}}})) != null ? stack1 : "")
    + " ";
},"10":function(container,depth0,helpers,partials,data) {
    return "_text";
},"12":function(container,depth0,helpers,partials,data) {
    return "text";
},"14":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"pf-icon-wrap\">\r\n				<img class=\"pf-icon pf-options-icon\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"image_src") : depth0), depth0))
    + "\" />\r\n				<span class=\"img-magnifying\"></span>\r\n			</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"information") : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":1},"end":{"line":34,"column":1}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<ul data-answer=\"information\">\r\n		<li option-cta option-id="
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"information") : stack1)) != null ? lookupProperty(stack1,"option_id") : stack1), depth0))
    + ">\r\n			<div class=\"pf-option-cta\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"information") : stack1)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</div>\r\n		</li>\r\n	</ul>\r\n	";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"question-and-options\">\r\n	<div class=\"pf-header\">\r\n		<h2>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</h2>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"subtext") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":6,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":2},"end":{"line":12,"column":9}}})) != null ? stack1 : "")
    + "	</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? lookupProperty(stack1,"options") : stack1)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.program(16, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":14,"column":1},"end":{"line":34,"column":8}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/render_tree.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/render_tree.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "        <span class=\"glyphicon glyphicon-link\"></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next_question") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":12,"column":15},"end":{"line":12,"column":97}}})) != null ? stack1 : "")
    + "\">\n        <div class=\"parentblock\" option-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + ">\n            <span class=\"folder-icon\"></span>\n            <span class=\"pf-type\">Option: </span>\n            <span class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</span>\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next_question") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":20,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":8},"end":{"line":49,"column":15}}})) != null ? stack1 : "")
    + "    </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " closed ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":12,"column":44},"end":{"line":12,"column":90}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return " empty ";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/pathfinder/templates/render_tree.handlebars */ "./sharedemos/static/js/pathfinder/templates/render_tree.handlebars"),depth0,{"name":"render_tree","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <ul class=\"options-block has_suggestions_block\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"suggestions") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":16},"end":{"line":47,"column":25}}})) != null ? stack1 : "")
    + "            </ul>        \n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","group",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":20},"end":{"line":37,"column":32}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","discrete",{"name":"compare","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":20},"end":{"line":46,"column":32}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class='group-suggestion'>\n                        <span>"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"suggestions_list") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":24},"end":{"line":35,"column":33}}})) != null ? stack1 : "")
    + "                        </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <li class=\"closed suggestions-block\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"url") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":29,"column":28},"end":{"line":33,"column":35}}})) != null ? stack1 : "")
    + "                            </li>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a external_url=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" target=\"_blank\" suggestion-type=\"external-link\">"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":30,"column":111},"end":{"line":30,"column":170}}})) != null ? stack1 : "")
    + "</a>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0));
},"18":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0));
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"slug") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":28},"end":{"line":33,"column":28}}})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a product=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "\" section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "\" chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" suggestion-type=\"demo\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</a>\n                            ";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <li class=\"closed suggestions-block\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"slug") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data,"loc":{"start":{"line":40,"column":28},"end":{"line":44,"column":35}}})) != null ? stack1 : "")
    + "                        </li>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a product=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "\" section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "\" chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" suggestion-type=\"demo\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</a>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"url") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":28},"end":{"line":44,"column":28}}})) != null ? stack1 : "");
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a external_url=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" target=\"_blank\" suggestion-type=\"external-link\">"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":43,"column":111},"end":{"line":43,"column":170}}})) != null ? stack1 : "")
    + "</a>\n                            ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"question-block\">\n    <span class=\"pf-type\">Question  : </span>\n    <span class=\"title\" question-id="
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_question") : depth0)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + ">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_question") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"next_question") : depth0)) != null ? lookupProperty(stack1,"is_linked") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":6,"column":11}}})) != null ? stack1 : "")
    + "    <span class=\"view-block\">VIEW</span>\n</div>\n\n<ul class=\"options-block\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"next_question") : depth0)) != null ? lookupProperty(stack1,"options") : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":0},"end":{"line":51,"column":9}}})) != null ? stack1 : "")
    + "</ul>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/suggestions.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/suggestions.handlebars ***!
  \**************************************************************************/
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

  return "		<div class=\"pf-icon-wrap\">\r\n			<img class=\"pf-icon pf-suggestion-icon\" src=\"/static/media/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"icon_path") : stack1), depth0))
    + "\" />\r\n			<span class=\"img-magnifying\"></span>\r\n		</div>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","group",{"name":"compare","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":48,"column":14}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","discrete",{"name":"compare","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":2},"end":{"line":70,"column":14}}})) != null ? stack1 : "")
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<li class=\"suggestion_group\" group-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + ">\r\n				<div class=\"pf-suggestions-group-header\">\r\n					<h2>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h2>\r\n					<p>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</p>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"isEdit") : depths[1]),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":5},"end":{"line":21,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n				<ol class=\"suggestion_list\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"suggestions_list") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":5},"end":{"line":45,"column":14}}})) != null ? stack1 : "")
    + "				</ol>\r\n			</li>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"pf_drag\"></div>\r\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<li class=\"pf-suggestion-demo "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":36},"end":{"line":25,"column":90}}})) != null ? stack1 : "")
    + "\" chapter=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0), depth0))
    + "\" suggestion-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + ">\r\n							<div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[2] != null ? lookupProperty(depths[2],"isEdit") : depths[2]),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":8},"end":{"line":29,"column":15}}})) != null ? stack1 : "")
    + "								<div class=\"pf-suggestion-icon\">\r\n									<img src=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"imageSrc") : depth0), depth0))
    + "\"/>\r\n								</div>\r\n								<div class=\"pf-suggestion-info\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":34,"column":9},"end":{"line":41,"column":16}}})) != null ? stack1 : "")
    + "								</div>\r\n							</div>\r\n						</li>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "external-suggestion";
},"10":function(container,depth0,helpers,partials,data) {
    return "									<div class=\"pf_drag\"></div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<a product=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "\" section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "\" chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0), depth0))
    + "\" suggestion-type=\"demo\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</a>\r\n										<div class=\"count\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"totalSlides") : depth0), depth0))
    + "</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<a external_url=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" target=\"_blank\" suggestion-type=\"external-link\">"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"title") : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":97},"end":{"line":38,"column":152}}})) != null ? stack1 : "")
    + "\r\n										</a>\r\n										<div class=\"link\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "</div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0));
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<li class=\"pf-suggestion-demo "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":33},"end":{"line":51,"column":87}}})) != null ? stack1 : "")
    + "\" chapter=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0), depth0))
    + "\" suggestion-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + ">\r\n				<div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"isEdit") : depths[1]),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":5},"end":{"line":55,"column":12}}})) != null ? stack1 : "")
    + "					<div class=\"pf-suggestion-icon\">\r\n						<img src=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"imageSrc") : depth0), depth0))
    + "\"/>\r\n					</div>\r\n					<div class=\"pf-suggestion-info\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.program(20, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":60,"column":6},"end":{"line":66,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n			</li>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a product=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "\" section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "\" chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"chapter_slug") : depth0), depth0))
    + "\" suggestion-type=\"demo\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</a>\r\n							<div class=\"count\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"totalSlides") : depth0), depth0))
    + "</div>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a external_url=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" target=\"_blank\" suggestion-type=\"external-link\">"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"title") : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":94},"end":{"line":64,"column":149}}})) != null ? stack1 : "")
    + "</a>\r\n							<div class=\"link\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"external_url") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ol class=\"pf-suggestion\">\r\n	<div class=\"pf-suggestions-header\">\r\n		<h2>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</h2>\r\n		<p>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"body") : stack1), depth0))
    + "</p>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"icon_path") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":2},"end":{"line":10,"column":9}}})) != null ? stack1 : "")
    + "	</div>\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"suggestions") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":1},"end":{"line":72,"column":10}}})) != null ? stack1 : "")
    + "	 \r\n</ol>\r\n<div id=\"suggestion_popup\"></div>\r\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/tree_view.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/tree_view.handlebars ***!
  \************************************************************************/
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

  return "    <div class=\"header\">\n            <div class=\"expand-tree closed \">\n                <span class=\"folder-icon\"></span>\n                <div class=\"expand-collapse-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"expand all",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":50},"end":{"line":5,"column":71}}}))
    + "</div>\n            </div>\n            <label class=\"caital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"tree view mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":41},"end":{"line":7,"column":66}}}))
    + "</label>\n            <div class=\"cancel-btn\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":53}}}))
    + "</div>\n    </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"loading") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":4},"end":{"line":12,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"path-finder-tree\"></div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"path-tree-loading\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"pathfinder tree data is loading",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":39},"end":{"line":11,"column":81}}}))
    + "...</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/pathfinder/templates/render_tree.handlebars */ "./sharedemos/static/js/pathfinder/templates/render_tree.handlebars"),depth0,{"name":"render_tree","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"tree-loading-failed\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"data loading failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":37},"end":{"line":19,"column":67}}}))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"treeViewer") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":14,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next_question") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":17,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"loadingFailed") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":0},"end":{"line":20,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/templates/url_unfurling.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/templates/url_unfurling.handlebars ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":7,"column":20},"end":{"line":7,"column":28}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"response") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"url_unfurling_block\">\n    <div class=\"thumb\">\n        <img src=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":26}}}) : helper)))
    + "\" />\n    </div>\n    <div class=\"info\">\n        <div class=\"description\">\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"desc") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":59}}})) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"link\">\n            "
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"response") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\n        </div>\n        <div class=\"remove\">REMOVE LINK</div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/views/edit.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/views/edit.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../../tenant/models/walkthrough */ "./sharedemos/static/js/tenant/models/walkthrough.js"), __webpack_require__(/*! ../models/path */ "./sharedemos/static/js/pathfinder/models/path.js"), __webpack_require__(/*! ../models/option */ "./sharedemos/static/js/pathfinder/models/option.js"), __webpack_require__(/*! ../models/question */ "./sharedemos/static/js/pathfinder/models/question.js"), __webpack_require__(/*! ../models/suggestions */ "./sharedemos/static/js/pathfinder/models/suggestions.js"), __webpack_require__(/*! ../models/suggestions_groups */ "./sharedemos/static/js/pathfinder/models/suggestions_groups.js"), __webpack_require__(/*! ../templates/add_new.handlebars */ "./sharedemos/static/js/pathfinder/templates/add_new.handlebars"), __webpack_require__(/*! ../templates/question.handlebars */ "./sharedemos/static/js/pathfinder/templates/question.handlebars"), __webpack_require__(/*! ../templates/popups.handlebars */ "./sharedemos/static/js/pathfinder/templates/popups.handlebars"), __webpack_require__(/*! ../templates/edit_option.handlebars */ "./sharedemos/static/js/pathfinder/templates/edit_option.handlebars"), __webpack_require__(/*! ../templates/suggestions.handlebars */ "./sharedemos/static/js/pathfinder/templates/suggestions.handlebars"), __webpack_require__(/*! ../templates/url_unfurling.handlebars */ "./sharedemos/static/js/pathfinder/templates/url_unfurling.handlebars"), __webpack_require__(/*! ../templates/tree_view.handlebars */ "./sharedemos/static/js/pathfinder/templates/tree_view.handlebars"), __webpack_require__(/*! jquery.ui */ "./sharedemos/static/libs/jquery-ui/jquery-ui.min.js"), __webpack_require__(/*! jquery.nestedSortable */ "./sharedemos/static/libs/nested-sortable/jquery.mjs.nestedSortable.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Walkthrough, Path, Option, Question, Suggestions, SuggestionsGroups, AddNew, QuestionView, Popups, EditOptions, SuggestionsView, UrlUnfurlView, TreeView) {
  'use strict';

  var PathView = Backbone.View.extend({
    el: '#main_container',
    events: {
      'click .add_block, .choose_layout, .add_option .back, .add_link .back,\
                   .pf_edit_option[data-popup="add_next_question"], .pf_edit_option[data-popup="add_suggestions_warning"],\
                   .pf_edit_option[data-popup="add_link"], .content_suggestion:not(.disabled) .browse,\
                   .add_suggested_chapters .back': 'showPopup',
      'click .add_suggestions_warning .continue': 'gotoSuggestion',
      'click .add_suggested_chapters .add': 'addSuggestions',
      'click .pf_edit .pf_edit_option.edit': 'editEntity',
      'click .pf_edit .delete': 'confirmDelete',
      'click .delete_entity .delete': 'deleteEntity',
      'keyup .content-block textarea, .content-block input': 'charCounter',
      'click .cancel': 'hidePopup',
      'click .advanced': 'showAdvanced',
      'change #upload-file': 'previewImage',
      'click .remove_file': 'removeImage',
      'click .popup-box.add_path .save': 'savePath',
      'click .popup-box.add_question .save': 'saveQuestion',
      'click .popup-box.add_option .save': 'saveOption',
      'click .popup-box.add_link .link': 'saveLink',
      'click .popup-box.edit_suggestion .save': 'updateExternalSuggestion',
      'keyup .search': 'searchList',
      'click .edit_suggestions_headers .save': 'saveSuggestionMessage',
      'change .chapters .css-checkbox': 'updateAddButtonText',
      'change .add_suggestions .css-radio, .add_suggestions_group .css-radio': 'switchSuggestionType',
      'click .content_suggestion:not(.disabled) .add_suggestion_link': 'addSuggestionLink',
      'click .remove': 'removeExternalLink',
      'click .save_suggestions': 'saveSuggestions',
      'keyup input[type=url]': Common.updateUrl,
      'click .save_suggestions_group': 'saveUpdateSuggestionsGroup',
      'click .publish_pf:not(.disabled)': 'confirmPublishPath',
      'click .publish_pathfinder': 'publishPathFinder',
      'click .header .expand-tree': 'expandCollapseTree',
      'click .tree-view-btn': 'showTreeView',
      'click .cancel-btn': 'closeTreeView',
      'click .tree-view-block .path-finder-tree .folder-icon': 'toggleTreeQuestion',
      'click .view-block': 'viewQuestion'
    },
    initialize: function () {
      $(window).on('resize', {
        'root': this
      }, this.onWindowResize);
      this.prev_option_id = null;
      this.edit_option = null;
      this.question = null;
      this.listenTo(Backbone, 'view_rendered', this.render);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      Common.loadLanguages(document.locales);
      this.listenTo(Backbone, 'question_rendered', function (question) {
        this.question = question;
        this.render();
      });
    },
    onWindowResize: function (e) {
      e.data.root.overlayCalc();
    },
    render: function () {
      var page = this.$('#select-pf').attr('data-attr');
      var can_add_options = true,
          attrs = {},
          edit_attrs = {};

      if (this.$('.available_pathfinders ul li .pf-option-cta').length) {
        can_add_options = false;
      }

      if (page != 'path') {
        var can_publish = this.canPublish();
        this.$(".tree-view-btn").addClass("tree-view-btn-show");

        if (can_publish || document.can_publish) {
          this.$('.publish_pf').removeClass('disabled');
        }
      }

      if (page == 'path') {
        attrs.add_path = true;
        edit_attrs.edit_path = true;
        this.$('.available_pathfinders ul li').append(EditOptions(edit_attrs));
      } else if (page == 'question') {
        attrs.add_question = true;
        edit_attrs.edit_question = true;
        this.$('.question-and-options .pf-header').append(EditOptions(edit_attrs));
      } else if (page == 'option') {
        edit_attrs.edit_option = true;
        var opt_map = {};
        var options = this.question.options.length && this.question.options || this.question.information && [this.question.information] || [];

        _.each(options, function (opt) {
          opt_map[opt.option_id] = opt;
        });

        var root = this;

        _.each(this.$('.available_pathfinders ul[data-answer] li'), function (opt_ele) {
          var opt_id = root.$(opt_ele).attr('option-id');
          var has_suggestions = opt_map[opt_id] && opt_map[opt_id].has_suggestions || opt_map[opt_id] && opt_map[opt_id].suggestion_header;
          var has_next_q = Boolean(opt_map[opt_id] && opt_map[opt_id].next_question_id);
          edit_attrs.can_add_suggestion = !has_suggestions && !has_next_q;
          edit_attrs.can_add_question = !has_next_q && !has_suggestions;
          edit_attrs.update_question_link = !has_suggestions && has_next_q;
          root.$(opt_ele).append(EditOptions(edit_attrs));
        });

        edit_attrs.edit_option = false;
        edit_attrs.edit_question = true;
        this.$('.question-and-options .pf-header').append(EditOptions(edit_attrs));
        attrs.add_option = true;
      } else if (page == 'suggestions') {
        attrs.add_results_to = true;
        attrs.add_suggestions = true;
        edit_attrs.edit_suggestions = true;
        edit_attrs.remove_suggestion = true;
        edit_attrs.same_locale = false;

        if (document.defaultLocaleID == document.current_locale) {
          edit_attrs.same_locale = true;
        }

        this.$('.pf-suggestion-demo').append(EditOptions(edit_attrs));
        edit_attrs.edit_suggestions_headers = true;
        edit_attrs.edit_suggestions = false;
        edit_attrs.remove_suggestion = false;
        this.$('.pf-suggestions-header').append(EditOptions(edit_attrs));
        edit_attrs.edit_suggestions_group = true;
        edit_attrs.edit_suggestions_headers = false;
        edit_attrs.remove_suggestion = false;
        edit_attrs.edit_suggestions = false;
        this.$('.pf-suggestions-group-header').append(EditOptions(edit_attrs));
        var root = this;
        this.initNestedSortable();
        this.allowSuggestionsDrag();
      }

      this.$('.available_pathfinders .add_block').remove();
      if (attrs.add_option && !can_add_options) return;

      if (page == 'path' || page == 'option') {
        var root = this;

        if (this.$('.available_pathfinders ul li').length == 1) {
          this.$('.available_pathfinders .pf_drag').hide();
        }

        this.$('.available_pathfinders ul li').length > 1 && this.$('.available_pathfinders ul').removeAttr('data-type').attr('data-type', page).sortable({
          placeholder: 'highlight',
          handle: '.pf_drag',
          containment: "parent",
          update: function (event, ui) {
            var new_position = ui.item.index() + 1;
            var entity, entity_id;

            if (root.$(event.target).attr('data-type') == 'path') {
              entity_id = root.$(ui.item).attr('data-path');
              entity = new Path();
            } else if (root.$(event.target).attr('data-type') == 'option') {
              entity_id = root.$(ui.item).attr('option-id');
              entity = new Option();
            }

            entity.save({
              'id': entity_id,
              'reorder': new_position
            }, {
              patch: true,
              error: function (xhr, status_code, message) {
                console.log(xhr, status_code, message);
                root.$(event.target).sortable("cancel");
              }
            });
          }
        });
      }

      this.$('.available_pathfinders').append(AddNew(attrs));
    },
    allowSuggestionsDrag: function () {
      $('.pf_drag').show();

      if ($('.pf-suggestion > li').length == 1) {
        $('.pf_drag').hide();

        if ($('.suggestion_group li').length) {
          $('.pf_drag').show();
          $('.pf-suggestions-group-header .pf_drag').hide();
        }
      }
    },
    initNestedSortable: function () {
      var root = this;
      this.$('.pf-suggestion').nestedSortable({
        forcePlaceholderSize: true,
        handle: '.pf_drag',
        items: 'li',
        toleranceElement: '> div',
        disableNestingClass: 'pf-suggestion-demo',
        containment: ".path-finder-block",
        isAllowed: function (placeholder, placeholderParent, currentItem) {
          if (!placeholder.parents().hasClass('suggestion_group') || !currentItem.hasClass('suggestion_group')) {
            return true;
          }
        },
        update: function (event, ui) {
          var suggestionPageOrder = root.suggestionPageElementsOrder();
          var entity, entityId, newPosition, parentGroupId, data, parentGroupId;
          parentGroupId = ui.item.parents('li').attr('group-id');

          if (parentGroupId) {
            newPosition = ui.item.index() + 1;
          } else {
            newPosition = ui.item.index();
          }

          if (ui.item.hasClass('suggestion_group')) {
            entity = new SuggestionsGroups();
            entityId = root.$(ui.item).attr('group-id');
          } else {
            entity = new Suggestions();
            entityId = root.$(ui.item).attr('suggestion-id');
            var nextSuggestion = root.$(ui.item).next('li.pf-suggestion-demo').eq(0).attr('suggestion-id');
          }

          root.allowSuggestionsDrag();
          data = {
            id: entityId,
            reorder: newPosition,
            to_group: parentGroupId,
            next_suggestion: nextSuggestion,
            order_data: suggestionPageOrder
          };
          entity.save(data, {
            patch: true,
            error: function (xhr, status_code, message) {
              console.log(xhr, status_code, message);
              root.$(event.target).sortable("cancel");
            }
          });
        }
      });
    },
    suggestionPageElementsOrder: function () {
      var suggestionPageOrder = [];

      _.each(this.$('.pf-suggestion').children('li'), function (element) {
        if (element.classList.contains('pf-suggestion-demo')) {
          suggestionPageOrder.push(element.getAttribute('suggestion-id'));
        } else {
          var groupId = element.getAttribute('group-id');
          var groupData = {
            'groupId': groupId
          };
          suggestionPageOrder.push(groupData);
        }
      });

      return suggestionPageOrder;
    },
    canPublish: function () {
      var questions_options_elem = this.$('#select-pf .pf-available-options .available_pathfinders .question-and-options');
      var questions_elements = questions_options_elem.children('.pf-header');
      var option_elements = questions_options_elem.children('ul').children('li');
      var can_publish = true;

      if (questions_elements.length == 0) {
        can_publish = false;
      } else if (option_elements.length == 0) {
        can_publish = false;
      }

      return can_publish;
    },
    confirmPublishPath: function (event) {
      var page = this.$('#select-pf').attr('data-attr');
      var popupName = event.currentTarget.getAttribute('data-popup');
      /* Allow user to publish if not in path page */

      if (page == 'path') {
        return;
      }

      var attrs = {};
      attrs.publish_path_finder = true;
      this.$('.popup-wrap').html(Popups(attrs));
      this.overlayCalc();
      this.$el.addClass(popupName);
    },
    publishPathFinder: function (event) {
      var pathId = window.location.href.split('/path-finder/')[1];
      var path = new Path();
      var root = this;
      this.actionInProgress('confirm_publish_pf');
      path.save({
        'id': pathId,
        'publish': true
      }, {
        patch: true,
        success: function (model, response) {
          document.can_publish = true;
          root.actionSuccess('confirm_publish_pf');
        },
        error: function (xhr, status_code, message) {
          console.log(xhr, status_code, message);
          root.actionFailed('confirm_publish_pf');
        }
      });
    },
    showTreeView: function () {
      this.$el.addClass('tree-view');
      this.$('.tree-view-block').html(TreeView({
        'treeViewer': true,
        'loading': true
      }));
      var path = new Path({
        id: document.path_id
      });
      var root = this;
      path.fetch({
        data: {
          get_tree: true
        },
        success: function (model, response) {
          root.$('.tree-view-block .path-tree-loading').hide();
          root.$('.tree-view-block .path-finder-tree').html(TreeView({
            'next_question': response.question
          }));
        },
        error: function (xhr, status_code, error_message) {
          root.$('.tree-view-block .path-tree-loading').hide();
          root.$('.tree-view-block').html(TreeView({
            'treeViewer': true,
            'loadingFailed': true
          }));
          setTimeout(function () {
            window.location.reload();
          }, 500);
          console.log('error', error_message);
        }
      });
    },
    closeTreeView: function (event) {
      this.$el.removeClass('tree-view');
      this.$('.tree-view-block').html('');
    },
    toggleTreeQuestion: function (event) {
      var element = this.$(event.currentTarget).parent().parent();
      if (element.hasClass('empty')) return;

      if (element.hasClass("open")) {
        element.toggleClass("open closed");
        element.find('.open').toggleClass("open closed");
      } else {
        element.toggleClass("closed open");
      }
    },
    expandCollapseTree: function (event) {
      var element = this.$(event.currentTarget);

      if (element.hasClass("open")) {
        element.toggleClass("open closed");
        this.$(".header .expand-collapse-text").text("Expand All");
        this.$(".path-finder-tree .open").toggleClass("open closed");
      } else {
        element.toggleClass("open closed");
        this.$(".header .expand-collapse-text").text("Collapse All");
        this.$(".path-finder-tree .closed").toggleClass("closed open");
      }
    },
    viewQuestion: function (event) {
      var questionId = this.$(event.currentTarget).parent().children().eq(1).attr("question-id");
      var optionId = this.$(event.currentTarget).parent().siblings().attr('option-id');
      var question = new Question({
        'id': questionId
      });
      var root = this;
      question.fetch({
        success: function (model, response) {
          root.closeTreeView();
          root.$('.send_pf_result').hide();
          root.$('.go-back-pf').attr('option-id', optionId);
          root.$(".path-finder-block #select-pf").attr('data-question-id', response.question_id).attr('data-attr', 'option');
          Common.updatePathfinderIconSrc(response);
          root.$('#select-pf .available_pathfinders').html(QuestionView({
            'question': response
          }));
          Backbone.trigger('question_rendered', response);
        }
      });
    },
    showPopup: function (event) {
      var targetElem = this.$(event.currentTarget);
      this.$el.removeClass('add_path add_question choose_option add_option add_next_question add_link add_suggestions_warning add_suggestions add_suggestions_group add_results_to edit_suggestions_headers add_suggested_chapters remove_suggestions_warning');
      var popupName = event.currentTarget.getAttribute('data-popup');
      var popupFrom = this.$(event.currentTarget).data('popup-from');
      var attrs = {};
      attrs.is_edit = false;

      if (!Common.isDefaultLocale(this)) {
        this.overlayCalc();
        this.$('.pathfinder_overlay').addClass('check-default-language');
        return;
      }

      if (popupName == "add_path") {
        attrs.add_path = true;
        attrs.title_limit = 100;
        attrs.description_limit = 200;
        this.$('.popup-wrap').html(Popups(attrs));
      } else if (popupName == "add_question") {
        attrs.add_question = true;
        attrs.title_limit = 200;
        attrs.description_limit = 1000;
        this.$('.popup-wrap').html(Popups(attrs));
      } else if (popupName == "add_next_question") {
        attrs.add_next_question = true;
        attrs.title_limit = 200;
        attrs.description_limit = 1000;
        var prev_option_id = $(event.currentTarget).parents('li').attr('option-id');

        if (prev_option_id) {
          this.prev_option_id = prev_option_id;
        }

        this.$('.popup-wrap').html(Popups(attrs));
      } else if (popupName == "choose_option") {
        attrs.can_add_cta = !this.$('.available_pathfinders ul li').length;
        attrs.choose_option = true;

        if ($(event.currentTarget).hasClass('switch_option')) {
          attrs.is_edit = true;
          attrs.option_id = this.$('.popup-box.add_option').attr('data-option');

          if (this.$('.available_pathfinders ul li').length == 1) {
            attrs.can_add_cta = true;
          }

          ;
        }

        ;
        this.$('.popup-wrap').html(Popups(attrs));
      } else if (popupName == "add_option") {
        if ($(event.currentTarget).parents('.popup-box').hasClass('switch_option')) {
          this.showEditOption(event);
          return;
        }

        ;
        attrs.add_option = true;
        attrs.description_limit = 250;
        var option_type = $(event.currentTarget).attr('data-option-type');

        if (option_type == "text") {
          attrs.option_text = true;
        } else if (option_type == "image") {
          attrs.option_image = true;
        } else if (option_type == "text_image") {
          attrs.option_image = true;
          attrs.option_text = true;
        } else if (option_type == "cta") {
          attrs.option_cta = true;
          attrs.description_limit = 100;
        }

        ;
        this.$('.popup-wrap').html(Popups(attrs));
        this.$('.popup-box.add_option').attr('data-option-type', option_type);
      } else if (popupName == "add_link") {
        if (!$(event.currentTarget).hasClass("update")) {
          attrs.unlinked_option = true;
        }

        attrs.add_link = true;
        var currentOptionId = $(event.currentTarget).parents('li').attr('option-id');

        if (currentOptionId) {
          this.prev_option_id = currentOptionId;
        }

        var questions = new Question();
        var root = this;
        questions.fetch({
          data: {
            'path_id': document.path_id,
            'current_option_id': currentOptionId
          },
          success: function (model, response) {
            response = _.reject(response, function (question) {
              return question.question_id == $('#select-pf').attr('data-question-id');
            });
            attrs.questions = response;
            root.$('.popup-wrap').html(Popups(attrs));
            root.overlayCalc();
          }
        });
      } else if (popupName == "add_suggestions_warning") {
        attrs.add_suggestions_warning = true;
        attrs.prev_option_id = $(event.currentTarget).parents('li').attr('option-id');
        this.$('.popup-wrap').html(Popups(attrs));
      } else if (popupName == "add_results_to") {
        attrs.add_results_to = true;
        this.$('.popup-wrap').html(Popups(attrs));
        this.overlayCalc();
        this.$el.addClass(popupName);
      } else if (popupName == "add_suggestions") {
        attrs.add_suggestions = true;
        this.$('.popup-wrap').html(Popups(attrs));
        this.overlayCalc();
        this.$el.addClass(popupName);
      } else if (popupName == "add_suggestions_group") {
        attrs.add_suggestions_group = true;
        attrs.title_limit = 100;
        attrs.description_limit = 200;

        if (this.$('.popup-wrap .selected_chapters').data('group-chapters') || targetElem.hasClass('back')) {
          this.$('.popup-wrap .popup-box').hide();
          this.$('.popup-wrap .popup-box.' + popupName).show();
        } else {
          this.$('.popup-wrap').html(Popups(attrs));
        }

        this.overlayCalc();
        this.$el.addClass(popupName);
      } else if (popupName == "add_suggested_chapters") {
        this.$('.content_suggestion').removeClass('disabled').addClass('disabled');
        this.$('.popup-box.add_suggested_chapters').remove();
        var option_id = this.$('#select-pf').attr('data-option-id');
        var suggestionsListType = this.$(event.currentTarget).parents().hasClass('add_suggestions');
        var root = this;
        var option = new Option();
        option.set('id', option_id);
        option.set('child', 'suggestions');
        option.fetch({
          success: function (model, response) {
            var chapters = new Walkthrough();
            chapters.fetch({
              success: function (mod, resp) {
                root.$('.content_suggestion').removeClass('disabled');
                attrs.add_suggested_chapters = true;
                var selectedSuggestionsList = [];

                _.each(response.suggestions, function (suggestion) {
                  if (suggestion.type === 'group') {
                    selectedSuggestionsList = selectedSuggestionsList.concat(suggestion.suggestions_list);
                  } else {
                    selectedSuggestionsList.push(suggestion);
                  }
                });

                var currentGroupSuggestions = $('.popup-wrap .selected_chapters').data('group-chapters');
                var groupSelectedSuggestions = [];

                if (currentGroupSuggestions && currentGroupSuggestions.length) {
                  groupSelectedSuggestions = _.map(currentGroupSuggestions, function (entity) {
                    return entity.chapter_slug;
                  });
                } // filtering the selected demos from walkthrough api response


                var _chapters = _.map(selectedSuggestionsList, function (entity) {
                  return entity.chapter_slug;
                });

                var newDemos = []; // if option does not have any suggestions selected then walkthrough resp will be the new demos

                if (!_chapters.length) {
                  newDemos = resp;
                } else {
                  _.each(resp, function (ch) {
                    // if selected chapter is found, then filter it from main 'resp'.
                    if (_chapters.indexOf(ch.slug) == -1) {
                      newDemos.push(ch);
                    }

                    if (groupSelectedSuggestions.indexOf(ch.slug) != -1) {
                      ch.selected = true;
                      newDemos.push(ch);
                    }
                  });
                }

                attrs.chapters = newDemos; // hide suggestion group popup on list browse 

                if (popupFrom) {
                  root.$('.' + popupFrom).hide();
                  root.$('.popup-wrap').append(Popups(attrs));
                  root.$('.add_suggested_chapters .back').attr('data-popup', popupFrom);
                } else {
                  root.$('.popup-wrap').html(Popups(attrs));
                }

                root.overlayCalc();
                root.updateAddButtonText();
              }
            });
          }
        });
      }

      this.overlayCalc();
      this.$el.addClass(popupName);
    },
    updateAddButtonText: function () {
      var suggestionsCount = this.$('.css-checkbox:checked').length;

      if (suggestionsCount > 0) {
        this.$('.footer .add').text('ADD ' + suggestionsCount + " SUGGESTED CHAPTER").addClass('suggestions_selected');
      } else {
        this.$('.footer .add').text('SAVE').removeClass('suggestions_selected');
      }
    },
    switchSuggestionType: function (event) {
      this.$('.content_suggestion').addClass('disabled');
      this.$(event.currentTarget).siblings('.content_suggestion').removeClass('disabled');
      var suggestionType = this.$(event.currentTarget).attr('id');

      if (suggestionType == 'link_external') {
        $('.suggestion_link').removeAttr('disabled');

        if (!$('.url_unfurling_block').length) {
          $('.save_suggestions').attr('disabled', true);
        }
      } else {
        if (this.$('.popup-wrap .selected_chapters').data('selected-chapters').length) {
          $('.save_suggestions').removeAttr('disabled');
        }

        $('.suggestion_link').attr('disabled', true);
      }

      $('.suggestion_link').removeClass('error');
    },
    addSuggestionLink: function (event) {
      var suggestion_link_ele = this.$('.suggestion_link');
      suggestion_link_ele.removeClass('error');
      var externalUrl = suggestion_link_ele.val().trim();

      if (!externalUrl) {
        suggestion_link_ele.addClass('error');
        suggestion_link_ele.focus();
        return;
      }

      var validUrl = Common.validateUrl(externalUrl);

      if (!validUrl) {
        suggestion_link_ele.addClass('error');
        suggestion_link_ele.focus();
        return;
      }

      this.$(event.currentTarget).parent().addClass('loading');
      var root = this;
      this.$('#link_chapter').attr('disabled', true);
      Backbone.ajax({
        dataType: "json",
        url: "/url-unfurl",
        data: {
          external_url: encodeURI(externalUrl)
        },
        success: function (response) {
          var externalLink = {};
          externalLink.response = response;
          externalLink.desc = response.description;

          if (!externalLink.desc) {
            externalLink.desc = response.title;
          }

          if (externalLink.desc && externalLink.desc.length > 100) {
            externalLink.desc = externalLink.desc.substring(0, 101) + '...';
          }

          externalLink.icon = response.icon || Common.DEFAULT_LINK_ICON;
          root.$('#link_chapter').attr('disabled', true);
          root.$(event.currentTarget).parent().removeClass('loading');
          root.$('.suggestion_link').val('');
          root.$('.save_suggestions').removeAttr('disabled');
          root.$('.external-links').append(UrlUnfurlView(externalLink));
          root.$('.url_unfurling_block').last().data('response', response);
        },
        error: function (error) {
          root.$(event.currentTarget).parent().removeClass('loading');
          console.log(error);
          suggestion_link_ele.addClass('error');
          suggestion_link_ele.focus();
        }
      });
    },
    saveSuggestions: function (e) {
      var optionId = this.$('#select-pf').attr('data-option-id');
      var option = new Option();
      var suggestionType = this.$('.suggetsion_type input:checked').attr('id');
      var root = this;
      var attrs = {
        'id': optionId
      };
      attrs['suggestions'] = {};
      var hasSuggestions = $('.suggestion_group').length || $('.pf-suggestion-demo').length;

      if (!hasSuggestions) {
        attrs['suggestions']['message'] = {
          'title': this.$('.pf-suggestion h2').text(),
          'body': this.$('.pf-suggestion p').text()
        };
      }

      if (suggestionType == 'link_external') {
        var externalLinks = [];
        var totalExternalLinkEles = this.$('.url_unfurling_block');

        _.each(totalExternalLinkEles, function (element, index) {
          externalLinks.push(totalExternalLinkEles.eq(index).data('response'));
        });

        if (!externalLinks.length) return;
        this.actionInProgress('add_suggestions');
        attrs['suggestions']['external_links'] = externalLinks;
      } else {
        var selectedChapters = this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked');

        var _chapters = _.map(selectedChapters, function (elem) {
          return elem.value;
        });

        var has_suggestions = _.some(this.question.options, function (opt) {
          return opt.option_id == optionId && opt.has_suggestions;
        });

        if (!selectedChapters.length) return;
        this.actionInProgress('add_suggestions');
        attrs['suggestions']['chapters'] = _chapters;
      }

      option.save(attrs, {
        patch: true,
        success: function (model, response) {
          root.actionSuccess('add_suggestions', function () {
            root.listSuggestions(response);
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('add_suggestions');
        }
      });
    },
    saveUpdateSuggestionsGroup: function (event) {
      var title_ele = this.$('.popup-box.add_suggestions_group input[name=title]');
      title_ele.removeClass('error');

      if (!title_ele.val().trim()) {
        title_ele.addClass('error');
        title_ele.focus();
        return;
      }

      var description_ele = this.$('.popup-box.add_suggestions_group textarea[name=description]');
      description_ele.removeClass('error');

      if (!description_ele.val().trim()) {
        description_ele.addClass('error');
        description_ele.focus();
        return;
      }

      var suggestionType = this.$('.suggetsion_type input:checked').attr('id');
      var suggestionsList = [];

      if (suggestionType == 'link_external') {
        var totalExternalLinkEles = this.$('.url_unfurling_block');

        _.each(totalExternalLinkEles, function (element, index) {
          suggestionsList.push(totalExternalLinkEles.eq(index).data('response'));
        });
      } else {
        var modifiedChapters = this.$('.popup-wrap .selected_chapters').data('selected-chapters');
        var groupChapters = this.$('.popup-wrap .selected_chapters').data('group-chapters');
        /* Need to check only for undefined value.
            if he edit the group and without clicking the internal library browse balue will be undefined.
            if he clear all selection then value will be 0.
        */

        if (modifiedChapters == undefined) {
          suggestionsList = _.map(groupChapters, function (elem) {
            return elem.chapter_id;
          });
        } else {
          suggestionsList = modifiedChapters;
        }
      }

      this.actionInProgress('add_suggestions_group');
      var optionId = this.$('#select-pf').attr('data-option-id');
      var message = {
        'title': this.$('.pf-suggestion h2').text(),
        'body': this.$('.pf-suggestion p').text()
      };
      var data = {
        title: title_ele.val().trim(),
        description: description_ele.val().trim(),
        option_id: optionId,
        csrf_token: $('meta[name=csrf-token]').attr('content'),
        suggestions: suggestionsList,
        suggestions_type: suggestionType
      };
      var hasImage = $('.pf-suggestion-icon').attr('src');

      if (!hasImage) {
        data['suggestion_header_message'] = message;
      }

      var groupId = this.$('.popup-box.add_suggestions_group').attr('group-id');

      if (groupId) {
        data['id'] = groupId;
      }

      var suggestionsGroups = new SuggestionsGroups(data);
      var root = this;
      $.when(suggestionsGroups.save()).done(function (response) {
        root.actionSuccess('add_suggestions_group', function () {
          root.listSuggestions(response);
        });
      }).fail(function (attrs, textStatus, xhr) {
        root.actionFailed('add_suggestions_group');
      });
    },
    removeExternalLink: function (e) {
      this.$(e.currentTarget).parents('.url_unfurling_block').remove();

      if (this.$('.url_unfurling_block').length == 0) {
        this.$('#link_chapter').attr('disabled', false);
        this.$('.save_suggestions').attr('disabled', true);
      }
    },
    gotoSuggestion: function (e) {
      var option_id = this.$(e.currentTarget).attr('data-prev-option-id');
      this.popupClose('add_suggestions_warning');
      this.$('#select-pf .available_pathfinders').html(SuggestionsView({
        'message': Common.SUGGESTION_PLACEHOLDER
      }));
      this.$('#select-pf').removeAttr('data-option').removeAttr('data-question-id').attr('data-attr', 'suggestions').attr('data-option-id', option_id);
      this.$('.available_pathfinders').append(AddNew({
        'add_suggestions': true
      }));
      var edit_attrs = {};
      edit_attrs.edit_suggestions_headers = true;
      this.$('.pf-suggestions-header').append(EditOptions(edit_attrs));
    },
    editEntity: function (e) {
      this.$el.removeClass('add_path add_question choose_option add_option add_next_question add_link');
      var popupName = this.$(e.currentTarget).attr('data-popup');
      var attrs = {};
      attrs.is_edit = true;

      if (popupName == "add_path") {
        attrs.add_path = true;
        var path_id = this.$(e.currentTarget).parents('li').attr('data-path');
        var path = new Path({
          'id': path_id
        });
        var root = this;
        path.fetch({
          success: function (model, response) {
            attrs.title_limit = 100 - (response.title && response.title.length || 0);
            attrs.description_limit = 200 - (response.description && response.description.length || 0);
            root.$('.popup-wrap').html(Popups(attrs));
            root.$('.popup-box.add_path').attr('data-path', path_id);
            root.$('.popup-wrap [name=title]').val(response.title);
            root.$('.popup-wrap [name=description]').val(response.description);

            if (response.icon && response.icon.path) {
              root.$('.popup-wrap .file_name').text(response.icon.path);
              root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
              root.$('.popup-wrap .block:last-child').addClass('image_added');
            }

            root.overlayCalc();
            root.$el.addClass(popupName);
          }
        });
      } else if (popupName == "add_question") {
        attrs.add_question = true;
        var question_id = this.$('#select-pf').attr('data-question-id');
        var question = new Question({
          'id': question_id
        });
        var root = this;
        question.fetch({
          success: function (model, response) {
            attrs.title_limit = 200 - (response.text && response.text.length || 0);
            attrs.description_limit = 1000 - (response.subtext && response.subtext.length || 0);
            root.$('.popup-wrap').html(Popups(attrs));
            root.$('.popup-wrap [name=title]').val(response.text);
            root.$('.popup-wrap [name=description]').val(response.subtext);

            if (response.icon && response.icon.path) {
              root.$('.popup-wrap .file_name').text(response.icon.path);
              root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
              root.$('.popup-wrap .block:last-child').addClass('image_added');
            }

            root.overlayCalc();
            root.$el.addClass(popupName);
          }
        });
      } else if (popupName == "add_option") {
        attrs.add_option = true;
        var answer_type = this.$('.question-and-options ul').attr('data-answer');
        var option_id = this.$(e.currentTarget).parents('li').attr('option-id');
        var option = new Option({
          'id': option_id
        });
        var root = this;
        option.fetch({
          success: function (model, response) {
            root.edit_option = response;
            attrs.description_limit = 250 - (response.text && response.text.length || 0);

            if (answer_type == "information") {
              attrs.option_cta = true;
              attrs.description_limit = 100 - (response.text && response.text.length || 0);
            } else {
              if (response.icon && response.icon.path) {
                attrs.option_image = true;
              }

              if (response.text.length) {
                attrs.option_text = true;
              }
            }

            root.$('.popup-wrap').html(Popups(attrs));

            if (answer_type == "information") {
              root.$('.popup-box.add_option').attr('data-option-type', "cta");
            } else if (attrs.option_image && attrs.option_text) {
              root.$('.popup-box.add_option').attr('data-option-type', "text_image");
            } else if (attrs.option_image) {
              root.$('.popup-box.add_option').attr('data-option-type', "image");
            } else if (attrs.option_text) {
              root.$('.popup-box.add_option').attr('data-option-type', "text");
            }

            root.$('.popup-box.add_option').attr('data-option', option_id);
            root.$('.popup-wrap [name=description]').val(response.text);

            if (response.icon && response.icon.path) {
              root.$('.popup-wrap .file_name').text(response.icon.path);
              root.$('.popup-wrap .img-preview').attr('src', '/static/media/' + response.icon.path);
              root.$('.popup-wrap .block[img_block]').addClass('image_added');
            }

            root.overlayCalc();
            root.$el.addClass(popupName);
          }
        });
      } else if (popupName == "add_suggestions_group") {
        attrs.add_suggestions_group = true;
        var groupId = this.$(e.currentTarget).parents('.suggestion_group').attr('group-id');
        var suggestionsGroup = new SuggestionsGroups({
          id: groupId
        });
        var root = this;
        suggestionsGroup.fetch({
          success: function (model, response) {
            attrs.title_limit = 100 - (response.title && response.title.length || 0);
            attrs.description_limit = 200 - (response.description && response.description.length || 0);
            root.$('.popup-wrap').html(Popups(attrs));
            root.$('.popup-wrap [name=title]').val(response.title);
            root.$('.popup-wrap [name=description]').val(response.description);
            root.$('.popup-wrap .add_suggestions_group').attr('group-id', response.id);

            var internalChapters = _.filter(response.suggestions_list, function (suggestion) {
              return suggestion.chapter_slug;
            });

            root.$('.popup-wrap .selected_chapters').data('group-chapters', internalChapters);

            if (internalChapters.length == 1) {
              root.$('.popup-wrap .selected_chapters').html(internalChapters.length + ' CHAPTER SELECTED');
            } else {
              root.$('.popup-wrap .selected_chapters').html(internalChapters.length + ' CHAPTERS SELECTED');
            }

            root.$('.' + popupName + ' .cancel').removeClass('add_block').attr('rel', popupName);
            root.overlayCalc();
            root.$el.addClass(popupName);
          },
          failure: function (error) {
            console.log(error);
          }
        });
      } else if (popupName == "edit_suggestions_headers") {
        attrs.edit_suggestions_headers = true;
        attrs.title = this.$('.pf-suggestions-header h2').text();
        attrs.description = this.$('.pf-suggestions-header p').text();
        attrs.title_limit = 120 - (attrs.title && attrs.title.length || 0);
        attrs.description_limit = 2000 - (attrs.description && attrs.description.length || 0);
        this.$('.popup-wrap').html(Popups(attrs));

        if (this.$('.pf-suggestion-icon').attr('src')) {
          this.$('.popup-wrap .file_name').text(this.$('.pf-suggestion-icon').attr('src').split('/media/')[1]);
          this.$('.popup-wrap .img-preview').attr('src', this.$('.pf-suggestion-icon').attr('src'));
          this.$('.popup-wrap .block:last-child').addClass('image_added');
        }

        this.overlayCalc();
        this.$el.addClass(popupName);
      } else if (popupName == "edit_suggestion") {
        attrs.edit_suggestion = true;
        var suggestionId = this.$(e.currentTarget).parents('.pf-suggestion-demo').attr('suggestion-id');
        var suggestion = new Suggestions({
          id: suggestionId
        });
        var root = this;
        suggestion.fetch({
          success: function (model, response) {
            attrs.title = response.external_link.title;
            attrs.title_limit = 200 - (attrs.title && attrs.title.length || 0);
            attrs.suggestion_id = suggestionId;
            root.$('.popup-wrap').html(Popups(attrs));
            root.overlayCalc();
            root.$el.addClass(popupName);
          },
          error: function (xhr, status_code, error_message) {
            console.log(xhr, status_code, error_message);
          }
        });
      }
    },
    deleteEntity: function (e) {
      var entity_type = this.$(e.currentTarget).attr('data-type');
      var entity_id = this.$(e.currentTarget).attr('data-id');
      this.actionInProgress('delete_entity');
      var root = this;

      if (entity_type == 'path') {
        var path = new Path({
          id: entity_id
        });
        path.destroy({
          success: function () {
            root.actionSuccess('delete_entity', function () {
              window.location.reload();
            });
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed('delete_entity');
          }
        });
      } else if (entity_type == 'question') {
        var question = new Question({
          id: entity_id
        });
        question.destroy({
          success: function (model, response) {
            if (response.prev_question_id) {
              var question = new Question({
                'id': question_id
              });
              question.fetch({
                success: function (model, response) {
                  root.actionSuccess('delete_entity', function () {
                    Common.updatePathfinderIconSrc(response);
                    root.$('#select-pf .available_pathfinders').html(QuestionView({
                      'question': response
                    }));
                    root.render();
                  });
                },
                error: function (xhr, status_code, error_message) {
                  root.actionFailed('delete_entity');
                }
              });
            } else {
              root.actionSuccess('delete_entity', function () {
                window.location.reload();
              });
            }
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed('delete_entity');
          }
        });
      } else if (entity_type == 'option') {
        var option = new Option({
          id: entity_id
        });
        var question_id = this.$('#select-pf').attr('data-question-id');
        option.destroy({
          success: function () {
            var question = new Question({
              'id': question_id
            });
            question.fetch({
              success: function (model, response) {
                root.actionSuccess('delete_entity', function () {
                  Common.updatePathfinderIconSrc(response);
                  root.$('#select-pf .available_pathfinders').html(QuestionView({
                    'question': response
                  }));

                  if (document.can_publish == undefined) {
                    root.$('.publish_pf').addClass('disabled');
                  }

                  root.render();
                });
              },
              error: function (xhr, status_code, error_message) {
                root.actionFailed('delete_entity');
              }
            });
          }
        });
      } else if (entity_type == 'suggestion') {
        var suggestion = new Suggestions({
          id: entity_id
        });
        suggestion.destroy({
          success: function (model, response) {
            root.actionSuccess('delete_entity', function () {
              root.listSuggestions(response);
            });
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed('delete_entity');
          }
        });
      } else if (entity_type == 'group') {
        var suggestion_group = new SuggestionsGroups({
          id: entity_id
        });
        suggestion_group.destroy({
          success: function (model, response) {
            root.actionSuccess('delete_entity', function () {
              root.listSuggestions(response);
            });
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed('delete_entity');
          }
        });
      }
    },
    showEditOption: function (event) {
      var attrs = {};
      attrs.is_edit = true;
      var answer_type = this.$('ul').attr('data-answer');
      var option_type = event.currentTarget.getAttribute('data-option-type');
      var popupName = event.currentTarget.getAttribute('data-popup');
      var option_id = this.$('.popup-box').attr('data-option');
      attrs.add_option = true;
      attrs.description_limit = 250 - (this.edit_option.text && this.edit_option.text.length || 0);

      if (option_type == "text" || option_type == "text_image") {
        attrs.option_text = true;
      }

      if (option_type == "image" || option_type == "text_image") {
        attrs.option_image = true;
      }

      if (attrs.option_image && attrs.option_text) this.$('.popup-box.add_option').attr('data-option-type', "text_image");

      if (option_type == "cta") {
        attrs.option_cta = true;

        if (answer_type == "information") {
          attrs.description_limit = 100 - (this.edit_option.text && this.edit_option.text.length || 0);
        } else {
          attrs.description_limit = 100;
        }

        ;
      }

      this.$('.popup-wrap').html(Popups(attrs));
      this.$('.popup-box.add_option').attr('data-option-type', option_type);
      this.$('.popup-box.add_option').attr('data-option', option_id);

      if (option_type == "cta" && answer_type == "information") {
        this.$('.popup-wrap [name=description]').val(this.edit_option.text);
      } else if (option_type == "cta" && answer_type != "information") {
        this.$('.popup-wrap [name=description]').val("");
      } else if (option_type != "cta" && answer_type == "information") {
        this.$('.popup-wrap [name=description]').val("");
      } else {
        this.$('.popup-wrap [name=description]').val(this.edit_option.text);
      }

      if (this.edit_option.icon && this.edit_option.icon.path) {
        this.$('.popup-wrap .file_name').text(this.edit_option.icon.path);
        this.$('.popup-wrap .img-preview').attr('src', '/static/media/' + this.edit_option.icon.path);
        this.$('.popup-wrap .block[img_block]').addClass('image_added');
      }

      this.overlayCalc();
      this.$el.addClass(popupName);
    },
    confirmDelete: function (e) {
      var entity_type = this.$(e.currentTarget).attr('data-attr');
      var attrs = {};
      attrs.delete_entity = true;
      attrs.entity_type = entity_type;

      if (entity_type == "path") {
        attrs.entity_id = this.$(e.currentTarget).parents('li').attr('data-path');
      } else if (entity_type == "question") {
        attrs.entity_id = this.$('#select-pf').attr('data-question-id');
      } else if (entity_type == "option") {
        attrs.entity_id = this.$(e.currentTarget).parents('li').attr('option-id');
      } else if (entity_type == "suggestion") {
        attrs.entity_id = this.$(e.currentTarget).parents('div .pf-suggestion-demo').attr('suggestion-id');
      } else if (entity_type == "group") {
        attrs.entity_id = this.$(e.currentTarget).parents('.suggestion_group').attr('group-id');
      }

      this.$('.popup-wrap').html(Popups(attrs));
      this.overlayCalc();
      this.$el.addClass('delete_entity');
    },
    hidePopup: function (event) {
      var popupName = this.$(event.currentTarget).attr('rel');

      if (popupName) {
        if (popupName == 'add_suggested_chapters') {
          this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked').removeAttr('checked');
          this.$('.footer .add').text('ADD').removeClass('suggestions_selected');
        }

        if (popupName == 'check-default-language') {
          this.$('.pathfinder_overlay').removeClass('check-default-language');
        }

        this.popupClose(popupName);
      }
    },
    popupClose: function (popupName) {
      this.$el.removeClass();
      this.$('.popup-wrap').html("");
    },
    showAdvanced: function (event) {
      this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
      setTimeout(function () {
        $('.popup-box .content-block').animate({
          scrollTop: 750
        }, 'slow');
      }, 100);
    },
    previewImage: function (event) {
      var image = event.target.files[0];

      if (!image || !/\.(gif|jpg|jpeg|tiff|png)$/i.test(image.name)) {
        return false;
      }

      this.$(event.currentTarget).parents('.block').find('.file_name').text(image.name);
      this.$('.img-preview').attr('src', URL.createObjectURL(image)).removeAttr('data-remove');
      this.$(event.currentTarget).parents('.block').addClass('image_added');
    },
    removeImage: function (event) {
      this.$(event.currentTarget).parents('.block').removeClass('image_added');
      this.$('.img-preview').removeAttr('src').removeAttr('style').attr('data-remove', true);
    },
    overlayCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    charCounter: function (event) {
      this.$(event.currentTarget).removeClass('error');
      var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));

      if (this.$(event.currentTarget).val().length <= maxChar) {
        var leftChar = maxChar - this.$(event.currentTarget).val().length;
        this.$(event.currentTarget).parents('.block').find('.counter').text(leftChar + " characters left");
      }
    },
    savePath: function () {
      var titleElement = this.$('.popup-box.add_path input[name=title]');
      titleElement.removeClass('error');

      if (!titleElement.val().trim() || titleElement.val().trim().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        titleElement.addClass('error');
        titleElement.focus();
        return;
      }

      var description = this.$('.popup-box.add_path textarea[name=description]').val().trim();
      this.actionInProgress('add_path');
      var attrs = {},
          data = new FormData();
      var path_id = this.$('.popup-box.add_path').attr('data-path');
      data.append('title', titleElement.val().trim());
      data.append('description', description);
      data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

      if (path_id) {
        attrs['id'] = path_id;
        var remove_icon = this.$('.img-preview').attr('data-remove');

        if (remove_icon) {
          data.append('remove_icon', remove_icon);
        }
      }

      var icon_file = this.$('.popup-box.add_path :file').val();

      if (icon_file) {
        data.append('icon', this.$('.popup-box.add_path :file')[0].files[0]);
      }

      var path = new Path();
      var root = this;
      path.save(attrs, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (model, response) {
          root.actionSuccess('add_path', function () {
            window.location.reload();
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('add_path');
        }
      });
    },
    saveQuestion: function () {
      var titleElement = this.$('.popup-box.add_question textarea[name=title]');
      titleElement.removeClass('error');

      if (!titleElement.val().trim()) {
        titleElement.addClass('error');
        titleElement.focus();
        return;
      }

      var description = this.$('.popup-box.add_question textarea[name=description]').val().trim();
      this.actionInProgress('add_question');
      var attrs = {},
          data = new FormData();
      data.append('title', titleElement.val().trim());
      data.append('description', description);
      data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      var path_id = window.location.href.split('/path-finder/')[1];
      data.append('path_id', path_id);

      if (this.prev_option_id) {
        data.append('prev_option_id', this.prev_option_id);
      }

      var icon_file = this.$('.popup-box.add_question :file').val();

      if (icon_file) {
        data.append('icon', this.$('.popup-box.add_question :file')[0].files[0]);
      }

      var question_id = this.$('#select-pf').attr('data-question-id');

      if (!this.prev_option_id && question_id) {
        attrs['id'] = question_id;
        var remove_icon = this.$('.img-preview').attr('data-remove');

        if (remove_icon) {
          data.append('remove_icon', remove_icon);
        }
      }

      var question = new Question();
      var root = this;
      question.save(attrs, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (model, response) {
          root.question = response;
          root.actionSuccess('add_question', function () {
            if (root.prev_option_id) {
              root.$('.go-back-pf').removeClass('disabled').attr('option-id', root.prev_option_id);
              root.prev_option_id = null;
            }

            Common.updatePathfinderIconSrc(response);
            root.$('#select-pf').removeAttr('data-path').attr('data-attr', 'option').attr('data-question-id', response.question_id);
            root.$('#select-pf .available_pathfinders').html(QuestionView({
              'question': response
            }));
            root.render();
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('add_question');
        }
      });
    },
    saveOption: function (e) {
      var attrs = {},
          data = new FormData();
      var option_type = this.$('.popup-box').attr("data-option-type");

      if (["text", "text_image", "cta"].indexOf(option_type) !== -1) {
        var description_ele = this.$('.popup-box.add_option textarea[name=description]');
        description_ele.removeClass('error');

        if (!description_ele.val().trim()) {
          description_ele.addClass('error');
          description_ele.focus();
          return;
        }

        data.append('description', description_ele.val().trim());
      }

      ;

      if (["image", "text_image"].indexOf(option_type) !== -1) {
        if (!this.hasImage()) return;
      }

      this.actionInProgress('add_option');
      var question_id = this.$('#select-pf').attr('data-question-id');
      data.append('question_id', question_id);
      data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      var option_id = this.$('.popup-box.add_option').attr('data-option');
      var option_type = this.$('.popup-box.add_option').attr('data-option-type');

      if (option_type == 'cta') {
        data.append('is_cta', true);
      }

      if (option_id) {
        attrs['id'] = option_id;
        var remove_icon;

        if (this.edit_option && this.edit_option.icon && ["text", "cta"].indexOf(option_type) !== -1) {
          remove_icon = true;
        } else {
          remove_icon = this.$('.img-preview').attr('data-remove');
        }

        if (remove_icon) {
          data.append('remove_icon', remove_icon);
        }
      }

      if (this.$('.popup-box.add_option :file').val()) data.append('icon', this.$('.popup-box.add_option :file')[0].files[0]);
      var option = new Option();
      var root = this;
      option.save(attrs, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function () {
          root.edit_option = null;
          root.$('.popup-box.add_option').removeAttr('data-option-type');
          root.actionSuccess('add_option', function () {
            var question = new Question({
              'id': question_id
            });
            question.fetch({
              success: function (model, response) {
                Common.updatePathfinderIconSrc(response);
                root.$('#select-pf .available_pathfinders').html(QuestionView({
                  'question': response
                }));
                var can_publish = root.canPublish();

                if (can_publish || document.can_publish) {
                  root.$('.publish_pf').removeClass('disabled');
                }

                root.render();
              }
            });
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('add_option');
        }
      });
    },
    addSuggestions: function (e) {
      var selectedChapters = this.$('.add_suggested_chapters .search_block input[name=suggestions]:checked');

      var _chapters = _.map(selectedChapters, function (elem) {
        return elem.id;
      });

      $('.selected_chapters').data('selected-chapters', _chapters);
      var backTo = this.$(e.currentTarget).siblings('.back').attr('data-popup');
      this.$el.removeClass().addClass(backTo);
      $('.' + backTo).show();

      if (selectedChapters.length == 1) {
        $('.selected_chapters').html(selectedChapters.length + ' CHAPTER SELECTED');
      } else {
        $('.selected_chapters').html(selectedChapters.length + ' CHAPTERS SELECTED');
      }

      if (selectedChapters.length) {
        $('.save_suggestions').removeAttr('disabled');
      } else {
        $('.save_suggestions').attr('disabled', true);
      }

      $('.popup-box.add_suggested_chapters').hide();
    },
    listSuggestions: function (response) {
      response.isEdit = true;

      _.each(response.suggestions, function (suggestion) {
        if (suggestion.type == 'group') {
          // Group suggestions.
          _.each(suggestion.suggestions_list, function (suggestion) {
            suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
            if (suggestion.total_slides) suggestion.totalSlides = suggestion.total_slides == 1 ? '1 slide' : suggestion.total_slides + ' slides';
          });
        } else {
          // Single/Discrete suggestions.
          suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
          if (suggestion.total_slides) suggestion.totalSlides = suggestion.total_slides == 1 ? '1 slide' : suggestion.total_slides + ' slides';
        }
      });

      this.$('#select-pf .available_pathfinders').html(SuggestionsView(response));
      if ($('.pf-suggestion-demo').length) $('.send_pf_result').show();else $('.send_pf_result').hide();
      this.$('.available_pathfinders').append(AddNew({
        'add_suggestions': true
      }));
      this.render();
    },
    saveSuggestionMessage: function (e) {
      var attrs = {},
          data = new FormData();
      var option_id = this.$('#select-pf').attr('data-option-id');
      var title_ele = this.$('.edit_suggestions_headers textarea[name=title]');
      title_ele.removeClass('error');

      if (!title_ele.val().trim()) {
        title_ele.addClass('error');
        title_ele.focus();
        return;
      }

      var description_ele = this.$('.edit_suggestions_headers textarea[name=description]');
      description_ele.removeClass('error');

      if (!description_ele.val().trim()) {
        description_ele.addClass('error');
        description_ele.focus();
        return;
      }

      data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      data.append('title', title_ele.val());
      data.append('body', description_ele.val());

      if (option_id) {
        attrs['id'] = option_id;
        var remove_icon = this.$('.img-preview').attr('data-remove');

        if (remove_icon) {
          data.append('remove_icon', remove_icon);
        }
      }

      var icon_file = this.$('.popup-box.edit_suggestions_headers :file').val();

      if (icon_file) {
        data.append('icon', this.$('.popup-box.edit_suggestions_headers :file')[0].files[0]);
      }

      this.actionInProgress('edit_suggestions_headers');
      var option = new Option();
      var root = this;
      option.save(attrs, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        patch: true,
        success: function (model, response) {
          root.actionSuccess('edit_suggestions_headers', function () {
            root.listSuggestions(response);
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('edit_suggestions_headers');
        }
      });
    },
    hasImage: function () {
      var src = $('.popup-box .img-preview').attr('src');
      $('.img-preview').removeClass('error');

      if (!src) {
        $('.img-preview').addClass('error');
        return false;
      } else {
        return true;
      }
    },
    saveLink: function (event) {
      var selected_question = this.$('.popup-box.add_link input[type=radio]:checked').val();

      if ((selected_question || selected_question == '') && this.prev_option_id) {
        if (!$(event.currentTarget).hasClass("link") || selected_question == '') selected_question = null;
        this.actionInProgress('add_link');
        var option = new Option();
        var root = this;
        option.save({
          'id': this.prev_option_id,
          'next_question_id': selected_question
        }, {
          patch: true,
          success: function (model, response) {
            root.actionSuccess('add_link');
            root.$('#select-pf').attr('data-attr', 'option').removeAttr('data-option-id').attr('data-question-id', response.question_id);
            Common.updatePathfinderIconSrc(response);
            root.$('#select-pf .available_pathfinders').html(QuestionView({
              'question': response
            }));
            root.$('.go-back-pf').removeClass('disabled').attr('option-id', root.prev_option_id);
            root.prev_option_id = null;
            Backbone.trigger('question_rendered', response);
          },
          error: function (xhr, status_code, error_message) {
            root.actionFailed('add_link');
          }
        });
      }
    },
    searchList: function (event) {
      var popup_height = this.$('.content-block').css('height');
      this.$('.content-block').css('min-height', popup_height);
      var searchText = event.currentTarget.value;
      var pattern = RegExp(searchText, 'i');
      this.$('.search_block div').hide();

      _.each(this.$('.search_block div'), function (opt_ele) {
        var text = $(opt_ele).find('label').text();

        if (pattern.test(text)) {
          $(opt_ele).show();
        }
      });
    },
    actionSuccess: function (target, post_success, retain_popup) {
      var root = this;
      setTimeout(function () {
        root.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
        root.$('.' + target + ' .form-sent').addClass("slide-in");
        setTimeout(function () {
          root.$('.' + target + ' .form-sent').removeClass("slide-in");
          if (!retain_popup) root.popupClose(target);

          if (post_success) {
            post_success();
          }
        }, 1000);
      }, 1000);
    },
    actionInProgress: function (target) {
      this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
    },
    actionFailed: function (target) {
      var root = this;
      setTimeout(function () {
        this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
        this.$('.' + target + ' .form-failed').addClass("slide-in");
        setTimeout(function () {
          root.$('.' + target + ' .form-failed').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    updateExternalSuggestion: function (event) {
      var title_ele = this.$('.popup-box.edit_suggestion textarea[name=title]');
      title_ele.removeClass('error');

      if (!title_ele.val().trim()) {
        title_ele.addClass('error');
        title_ele.focus();
        return;
      }

      this.actionInProgress('edit_suggestion');
      var suggestionId = this.$(event.currentTarget).attr('data-id');
      var data = {
        title: title_ele.val().trim(),
        csrf_token: $('meta[name=csrf-token]').attr('content'),
        suggestion_id: suggestionId
      };
      var suggestion = new Suggestions({
        id: suggestionId
      });
      var root = this;
      suggestion.save(data, {
        success: function (model, response) {
          root.actionSuccess('edit_suggestion', function () {
            root.listSuggestions(response);
          });
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('edit_suggestion');
        }
      });
    }
  });
  return PathView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/pathfinder/views/main.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/pathfinder/views/main.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/mail_suggestions */ "./sharedemos/static/js/pathfinder/models/mail_suggestions.js"), __webpack_require__(/*! ../models/answer */ "./sharedemos/static/js/pathfinder/models/answer.js"), __webpack_require__(/*! ../models/path */ "./sharedemos/static/js/pathfinder/models/path.js"), __webpack_require__(/*! ../models/option */ "./sharedemos/static/js/pathfinder/models/option.js"), __webpack_require__(/*! ../models/path-activity */ "./sharedemos/static/js/pathfinder/models/path-activity.js"), __webpack_require__(/*! ../models/question */ "./sharedemos/static/js/pathfinder/models/question.js"), __webpack_require__(/*! ../templates/mail_suggestions.handlebars */ "./sharedemos/static/js/pathfinder/templates/mail_suggestions.handlebars"), __webpack_require__(/*! ../templates/paths.handlebars */ "./sharedemos/static/js/pathfinder/templates/paths.handlebars"), __webpack_require__(/*! ../templates/question.handlebars */ "./sharedemos/static/js/pathfinder/templates/question.handlebars"), __webpack_require__(/*! ../templates/suggestions.handlebars */ "./sharedemos/static/js/pathfinder/templates/suggestions.handlebars"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, SuggestionMailer, Answer, Path, Option, PathActivity, Question, MailSuggestionsView, PathListView, QuestionView, SuggestionsView) {
  'use strict';

  var MainView = Backbone.View.extend({
    el: '#main_container',
    events: {
      'click .question-and-options ul li': 'selectOption',
      'click .available_pathfinders ul li[data-path]': 'openPath',
      'click .go-back-pf:not(.disabled)': function (event) {
        this.selectOption(event, {
          'nav': 'back'
        });
      },
      'click .go-fwd-pf:not(.disabled)': function (event) {
        this.selectOption(event, {
          'nav': 'next'
        });
      },
      'click .send_pf_result': 'sendSuggestions',
      'click .submit_suggestion.success': 'sendMail',
      'click .pf-suggestion-demo, .options-block .suggestions-block': 'openSuggestion',
      'click .pf-gray-bg': 'closeSuggestionPopup',
      'keyup #pf-email': 'validateEmail',
      'click .pf-icon': 'zoomImage',
      'click .zoom_close': 'closeZoomImage',
      'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent'
    },
    initialize: function (pathId) {
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
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      utils.setSEOData(document.app_name, window.location.href);
      var attrs = {};
      this.pathId = pathId;

      if (this.pathId) {
        attrs['id'] = this.pathId;
      }

      var path = new Path(attrs);
      var root = this;
      path.fetch({
        success: function (model, response) {
          if (attrs.id) {
            root.$('.pf-nav').show();
            root.$('.go-back-pf').removeAttr('option-id').removeClass('disabled');
            root.logPathActivity({
              entityType: 'StartEvent'
            });

            if (response.question && response.question.question_id) {
              Common.updatePathfinderIconSrc(response.question);
              root.$('#select-pf').attr('data-attr', 'option').attr('data-question-id', response.question.question_id);
              root.$('#select-pf .available_pathfinders').html(QuestionView({
                'question': response.question
              }));
            } else {
              root.$('#select-pf').attr('data-attr', 'question').attr('data-path', response.slug);
            }

            Backbone.trigger('question_rendered', response.question);
          } else {
            root.$('#select-pf').attr('data-attr', 'path');

            _.each(response, function (path) {
              Common.updatePathfinderIconSrc(path);
            });

            root.$('#select-pf .available_pathfinders').html(PathListView({
              'paths': response
            }));
            Backbone.trigger("view_rendered", this);
          }
        },
        error: function (xhr, status_code, message) {
          console.log(xhr, status_code, message);
        }
      });
    },
    openPath: function (e) {
      if (this.$(e.target).hasClass('pf-icon') || this.$(e.target).hasClass('pf_edit_option')) return;
      var url = '/path-finder';
      var pathId = this.$(e.currentTarget).attr('data-path');

      if (document.isAuthor) {
        url = '/edit' + url;
      }

      window.location.href = url + '/' + pathId;
    },
    selectOption: function (event, data) {
      if (this.$(event.target).hasClass('pf-icon')) return;
      if (this.$(event.target).hasClass('pf_edit_option') || this.$(event.target).hasClass('pf_edit') || this.$(event.target).hasClass('img-magnifying')) return;
      this.$('.send_pf_result').hide();
      var answerId, answer;

      if (this.$(event.currentTarget).attr('option-id')) {
        answerId = this.$(event.currentTarget).attr('option-id');
      } else {
        var url = '/path-finder';

        if (document.isAuthor) {
          url = '/edit' + url;
        }

        window.location.href = url;
      }

      var root = this; // select option from arrow navingation

      this.fromKeyNavigation = data ? true : false;

      if (answerId) {
        answer = new Answer({
          id: answerId
        });
        answer.fetch({
          data: data || {},
          success: function (model, response) {
            root.displayPathQuestions(response);
          }
        });
      }
    },
    logPathActivity: function (pathDetails) {
      if (!document.isAuthor) {
        pathDetails['path_id'] = this.pathId;
        this.pathActivity = new PathActivity(pathDetails);
        this.pathActivity.save();
      }
    },
    displayPathQuestions: function (response) {
      if (response.question) {
        this.$('#select-pf').attr('data-attr', 'option').removeAttr('data-option-id').attr('data-question-id', response.question.question_id);

        if (!document.isAuthor && response.question.options.length == 0 && $.isEmptyObject(response.question.information)) {
          this.$('#select-pf .available_pathfinders').html("<h2 class='no-pf-result'>No results found!!</h2>");
        } else {
          Common.updatePathfinderIconSrc(response.question);
          this.$('#select-pf .available_pathfinders').html(QuestionView(response));
        }

        if (!this.fromKeyNavigation) {
          /*
          !this.fromKeyNavigation - avoid the event tracking for arrow key navigations
          navigationEvent - Event for the path traverse from an option/information to other 
                         question's option.
          */
          this.pathDetails = {
            entityType: 'navigationEvent',
            option_id: response.previous_option_selected
          };
          this.logPathActivity(this.pathDetails);
        }

        Backbone.trigger('question_rendered', response.question);
      } else if (response.information) {
        this.$('#select-pf').attr('data-attr', 'information');
        this.$('#select-pf .available_pathfinders').html(QuestionView(response));
        Backbone.trigger("view_rendered", this);

        if (!this.fromKeyNavigation) {
          /* navigationEvent - Event for the path traverse from an option/information to other information. */
          this.pathDetails = {
            entityType: 'navigationEvent',
            option_id: response.previous_option_selected
          };
          this.logPathActivity(this.pathDetails);
        }
      } else {
        this.fromOptionId = response.previous_option_selected;
        this.listSuggestions(this.fromOptionId);
      }

      this.$('.go-fwd-pf').removeAttr('option-id').removeClass('disabled').addClass('disabled');
      this.$('.go-back-pf').removeAttr('option-id').removeClass('disabled');

      if (response.previous_option_selected) {
        this.$('.go-back-pf').removeClass('disabled').attr('option-id', response.previous_option_selected);
      }

      if (response.next_option_selected) {
        this.$('.go-fwd-pf').removeClass('disabled').attr('option-id', response.next_option_selected);
      }

      if (response.previous_option_selected || response.next_option_selected) {
        this.$('.pf-nav').show();
      } else {
        this.$('.pf-nav').hide();
      }

      this.$('.path-finder-block').animate({
        scrollTop: 0
      }, 300);
    },
    listSuggestions: function (answer_id) {
      this.$('#select-pf').attr('data-attr', 'suggestions').removeAttr('data-question-id').attr('data-option-id', answer_id);
      var option = new Option({
        id: answer_id,
        child: 'suggestions'
      });
      var root = this;
      option.fetch({
        success: function (model, response) {
          var selectedSuggestionsList = [];

          _.each(response.suggestions, function (suggestion) {
            if (suggestion.type == 'group') {
              // Grouped suggestions.
              _.each(suggestion.suggestions_list, function (suggestion) {
                suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
                if (suggestion.total_slides) suggestion.totalSlides = suggestion.total_slides == 1 ? '1 slide' : suggestion.total_slides + ' slides';
                selectedSuggestionsList.push(suggestion);
              });
            } else {
              // Single/Discrete suggestions.
              suggestion.imageSrc = Common.getSuggestionImageSrc(suggestion);
              if (suggestion.total_slides) suggestion.totalSlides = suggestion.total_slides == 1 ? '1 slide' : suggestion.total_slides + ' slides';
              selectedSuggestionsList.push(suggestion);
            }
          });

          if (!selectedSuggestionsList.length) {
            if (document.isAuthor && response.message && (response.message.body || response.message.title || false)) {
              root.$('#select-pf .available_pathfinders').html(SuggestionsView(response));
              Backbone.trigger("view_rendered", root);
            } else {
              root.pathDetails = {
                entityType: 'navigationEvent',
                option_id: answer_id
              };
              root.logPathActivity(root.pathDetails);
              root.$('#select-pf .available_pathfinders').html("<h2 class='no-pf-result'>No results found!!</h2>");
            }
          } else {
            if (_.isEmpty(response.message)) {
              response.message = Common.SUGGESTION_PLACEHOLDER;
            }

            if (!document.isAuthor) {
              // need to filter !empty groups
              response.suggestions = _.filter(response.suggestions, function (suggestion) {
                if (suggestion.chapter_slug || suggestion.external_url || !suggestion.chapter_slug && suggestion.suggestions_list.length) return suggestion;
              });
            } else {
              response.isEdit = true;
            }

            root.$('#select-pf .available_pathfinders').html(SuggestionsView(response));
            root.$('.send_pf_result').show();

            if (!root.fromKeyNavigation) {
              /* GoalEvent - Event for the path traverse from an option/information to list suggestions. */
              root.pathDetails = {
                entityType: 'GoalEvent',
                option_id: root.fromOptionId
              };
              root.logPathActivity(root.pathDetails);
            }

            Backbone.trigger("view_rendered", root);
          }
        }
      });
    },
    openSuggestion: function (event) {
      if (this.$(event.target).hasClass('pf_edit_option') || this.$(event.target).hasClass('pf_edit')) return;
      var suggestion_type = $(event.currentTarget).find('a').attr('suggestion-type');

      if (suggestion_type == 'external-link') {
        var external_url = $(event.currentTarget).find('a').attr('external_url');
        window.open(external_url);
      } else {
        var product = $(event.currentTarget).find('a').attr('product');
        var section = $(event.currentTarget).find('a').attr('section');
        var chapter = $(event.currentTarget).find('a').attr('chapter');
        var url = product;

        if (section !== product) {
          url += '/' + section;
        }

        url += '/' + chapter;
        window.open(window.location.origin + '/#!/' + url);
      }
    },
    sendSuggestions: function () {
      this.$('#select-pf #suggestion_popup').html(MailSuggestionsView);
      var root = this;
      setTimeout(function () {
        root.$('#pf_save_popup').addClass('active');
      }, 300);
    },
    closeSuggestionPopup: function () {
      $('#select-pf #suggestion_popup').empty();
    },
    sendMail: function () {
      this.$('#pf-email, .submit_suggestion').removeClass('success');
      var mailer = new SuggestionMailer();
      var root = this;
      mailer.fetch({
        data: {
          'email': this.$('#pf-email').val(),
          'option_id': this.fromOptionId
        },
        success: function (model, response) {
          root.$('.pf_receiver_details').hide();
          root.$('.pf_success_block').show();
          setTimeout(function () {
            root.$('#pf_save_popup').removeClass('active');
            root.$('#select-pf #suggestion_popup').empty();
          }, 3000);
        },
        error: function (xhr, status_code, message) {
          console.log(xhr, status_code, message);
          root.$('#pf-email, .submit_suggestion').removeClass('success');
        }
      });
    },
    triggerSearchGAEvent: function (event) {
      var linkElement = $(event.currentTarget);
      var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();

      if (linkElement.hasClass("walkthrough-entry")) {
        Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
      } else {
        Common.triggerGAevent('Section Search', searchBreadcrumb);
      }
    },
    validateEmail: function () {
      if (Common.validateEmail(this.$('#pf-email').val())) {
        this.$('#pf-email, .submit_suggestion').removeClass('success').addClass('success');
      } else {
        this.$('#pf-email, .submit_suggestion').removeClass('success');
      }
    },
    zoomImage: function (event) {
      if (this.$(event.currentTarget).hasClass('default')) return;
      var zoomImageSrc = this.$(event.currentTarget).parent().find('img').attr('src');
      var zoomImage = "<img class='zoom' src='" + zoomImageSrc + "'><span class='zoom_close'></span>";
      this.$('.pathfinder_overlay .popup-wrap').html(zoomImage);
      this.$el.addClass('img_zoom');
    },
    closeZoomImage: function () {
      this.$el.removeClass('img_zoom');
      this.$('.pathfinder_overlay .popup-wrap').empty();
    }
  });
  return MainView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/walkthrough.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/walkthrough.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Walkthrough = Backbone.Model.extend({
    urlRoot: "/api/walkthrough/"
  });
  return Walkthrough;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/libs/nested-sortable/jquery.mjs.nestedSortable.js":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/libs/nested-sortable/jquery.mjs.nestedSortable.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * jQuery UI Nested Sortable
 * v 2.1a / 2016-02-04
 * https://github.com/ilikenwf/nestedSortable
 *
 * Depends on:
 *	 jquery.ui.sortable.js 1.10+
 *
 * Copyright (c) 2010-2016 Manuele J Sarfatti and contributors
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
(function (factory) {
  "use strict";

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! jquery.ui */ "./sharedemos/static/libs/jquery-ui/jquery-ui.min.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  "use strict";

  function isOverAxis(x, reference, size) {
    return x > reference && x < reference + size;
  }

  $.widget("mjs.nestedSortable", $.extend({}, $.ui.sortable.prototype, {
    options: {
      disableParentChange: false,
      doNotClear: false,
      expandOnHover: 700,
      isAllowed: function () {
        return true;
      },
      isTree: false,
      listType: "ol",
      maxLevels: 0,
      protectRoot: false,
      rootID: null,
      rtl: false,
      startCollapsed: false,
      tabSize: 20,
      branchClass: "mjs-nestedSortable-branch",
      collapsedClass: "mjs-nestedSortable-collapsed",
      disableNestingClass: "mjs-nestedSortable-no-nesting",
      errorClass: "mjs-nestedSortable-error",
      expandedClass: "mjs-nestedSortable-expanded",
      hoveringClass: "mjs-nestedSortable-hovering",
      leafClass: "mjs-nestedSortable-leaf",
      disabledClass: "mjs-nestedSortable-disabled"
    },
    _create: function () {
      var self = this,
          err;
      this.element.data("ui-sortable", this.element.data("mjs-nestedSortable")); // mjs - prevent browser from freezing if the HTML is not correct

      if (!this.element.is(this.options.listType)) {
        err = "nestedSortable: " + "Please check that the listType option is set to your actual list type";
        throw new Error(err);
      } // if we have a tree with expanding/collapsing functionality,
      // force 'intersect' tolerance method


      if (this.options.isTree && this.options.expandOnHover) {
        this.options.tolerance = "intersect";
      }

      $.ui.sortable.prototype._create.apply(this, arguments); // prepare the tree by applying the right classes
      // (the CSS is responsible for actual hide/show functionality)


      if (this.options.isTree) {
        $(this.items).each(function () {
          var $li = this.item,
              hasCollapsedClass = $li.hasClass(self.options.collapsedClass),
              hasExpandedClass = $li.hasClass(self.options.expandedClass);

          if ($li.children(self.options.listType).length) {
            $li.addClass(self.options.branchClass); // expand/collapse class only if they have children

            if (!hasCollapsedClass && !hasExpandedClass) {
              if (self.options.startCollapsed) {
                $li.addClass(self.options.collapsedClass);
              } else {
                $li.addClass(self.options.expandedClass);
              }
            }
          } else {
            $li.addClass(self.options.leafClass);
          }
        });
      }
    },
    _destroy: function () {
      this.element.removeData("mjs-nestedSortable").removeData("ui-sortable");
      return $.ui.sortable.prototype._destroy.apply(this, arguments);
    },
    _mouseDrag: function (event) {
      var i,
          item,
          itemElement,
          intersection,
          self = this,
          o = this.options,
          scrolled = false,
          $document = $(document),
          previousTopOffset,
          parentItem,
          level,
          childLevels,
          itemAfter,
          itemBefore,
          newList,
          method,
          a,
          previousItem,
          nextItem,
          helperIsNotSibling; //Compute the helpers position

      this.position = this._generatePosition(event);
      this.positionAbs = this._convertPositionTo("absolute");

      if (!this.lastPositionAbs) {
        this.lastPositionAbs = this.positionAbs;
      } //Do scrolling


      if (this.options.scroll) {
        if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
          if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
            scrolled = this.scrollParent.scrollTop() + o.scrollSpeed;
            this.scrollParent.scrollTop(scrolled);
          } else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
            scrolled = this.scrollParent.scrollTop() - o.scrollSpeed;
            this.scrollParent.scrollTop(scrolled);
          }

          if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
            scrolled = this.scrollParent.scrollLeft() + o.scrollSpeed;
            this.scrollParent.scrollLeft(scrolled);
          } else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
            scrolled = this.scrollParent.scrollLeft() - o.scrollSpeed;
            this.scrollParent.scrollLeft(scrolled);
          }
        } else {
          if (event.pageY - $document.scrollTop() < o.scrollSensitivity) {
            scrolled = $document.scrollTop() - o.scrollSpeed;
            $document.scrollTop(scrolled);
          } else if ($(window).height() - (event.pageY - $document.scrollTop()) < o.scrollSensitivity) {
            scrolled = $document.scrollTop() + o.scrollSpeed;
            $document.scrollTop(scrolled);
          }

          if (event.pageX - $document.scrollLeft() < o.scrollSensitivity) {
            scrolled = $document.scrollLeft() - o.scrollSpeed;
            $document.scrollLeft(scrolled);
          } else if ($(window).width() - (event.pageX - $document.scrollLeft()) < o.scrollSensitivity) {
            scrolled = $document.scrollLeft() + o.scrollSpeed;
            $document.scrollLeft(scrolled);
          }
        }

        if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
          $.ui.ddmanager.prepareOffsets(this, event);
        }
      } //Regenerate the absolute position used for position checks


      this.positionAbs = this._convertPositionTo("absolute"); // mjs - find the top offset before rearrangement,

      previousTopOffset = this.placeholder.offset().top; //Set the helper position

      if (!this.options.axis || this.options.axis !== "y") {
        this.helper[0].style.left = this.position.left + "px";
      }

      if (!this.options.axis || this.options.axis !== "x") {
        this.helper[0].style.top = this.position.top + "px";
      } // mjs - check and reset hovering state at each cycle


      this.hovering = this.hovering ? this.hovering : null;
      this.mouseentered = this.mouseentered ? this.mouseentered : false; // mjs - let's start caching some variables

      (function () {
        var _parentItem = this.placeholder.parent().parent();

        if (_parentItem && _parentItem.closest(".ui-sortable").length) {
          parentItem = _parentItem;
        }
      }).call(this);
      level = this._getLevel(this.placeholder);
      childLevels = this._getChildLevels(this.helper);
      newList = document.createElement(o.listType); //Rearrange

      for (i = this.items.length - 1; i >= 0; i--) {
        //Cache variables and intersection, continue if no intersection
        item = this.items[i];
        itemElement = item.item[0];
        intersection = this._intersectsWithPointer(item);

        if (!intersection) {
          continue;
        } // Only put the placeholder inside the current Container, skip all
        // items form other containers. This works because when moving
        // an item from one container to another the
        // currentContainer is switched before the placeholder is moved.
        //
        // Without this moving items in "sub-sortables" can cause the placeholder to jitter
        // beetween the outer and inner container.


        if (item.instance !== this.currentContainer) {
          continue;
        } // No action if intersected item is disabled
        // and the element above or below in the direction we're going is also disabled


        if (itemElement.className.indexOf(o.disabledClass) !== -1) {
          // Note: intersection hardcoded direction values from
          // jquery.ui.sortable.js:_intersectsWithPointer
          if (intersection === 2) {
            // Going down
            itemAfter = this.items[i + 1];

            if (itemAfter && itemAfter.item.hasClass(o.disabledClass)) {
              continue;
            }
          } else if (intersection === 1) {
            // Going up
            itemBefore = this.items[i - 1];

            if (itemBefore && itemBefore.item.hasClass(o.disabledClass)) {
              continue;
            }
          }
        }

        method = intersection === 1 ? "next" : "prev"; // cannot intersect with itself
        // no useless actions that have been done before
        // no action if the item moved is the parent of the item checked

        if (itemElement !== this.currentItem[0] && this.placeholder[method]()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {
          // mjs - we are intersecting an element:
          // trigger the mouseenter event and store this state
          if (!this.mouseentered) {
            $(itemElement).mouseenter();
            this.mouseentered = true;
          } // mjs - if the element has children and they are hidden,
          // show them after a delay (CSS responsible)


          if (o.isTree && $(itemElement).hasClass(o.collapsedClass) && o.expandOnHover) {
            if (!this.hovering) {
              $(itemElement).addClass(o.hoveringClass);
              this.hovering = window.setTimeout(function () {
                $(itemElement).removeClass(o.collapsedClass).addClass(o.expandedClass);
                self.refreshPositions();

                self._trigger("expand", event, self._uiHash());
              }, o.expandOnHover);
            }
          }

          this.direction = intersection === 1 ? "down" : "up"; // mjs - rearrange the elements and reset timeouts and hovering state

          if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
            $(itemElement).mouseleave();
            this.mouseentered = false;
            $(itemElement).removeClass(o.hoveringClass);

            if (this.hovering) {
              window.clearTimeout(this.hovering);
            }

            this.hovering = null; // mjs - do not switch container if
            // it's a root item and 'protectRoot' is true
            // or if it's not a root item but we are trying to make it root

            if (o.protectRoot && !(this.currentItem[0].parentNode === this.element[0] && // it's a root item
            itemElement.parentNode !== this.element[0] // it's intersecting a non-root item
            )) {
              if (this.currentItem[0].parentNode !== this.element[0] && itemElement.parentNode === this.element[0]) {
                if (!$(itemElement).children(o.listType).length) {
                  itemElement.appendChild(newList);

                  if (o.isTree) {
                    $(itemElement).removeClass(o.leafClass).addClass(o.branchClass + " " + o.expandedClass);
                  }
                }

                if (this.direction === "down") {
                  a = $(itemElement).prev().children(o.listType);
                } else {
                  a = $(itemElement).children(o.listType);
                }

                if (a[0] !== undefined) {
                  this._rearrange(event, null, a);
                }
              } else {
                this._rearrange(event, item);
              }
            } else if (!o.protectRoot) {
              this._rearrange(event, item);
            }
          } else {
            break;
          } // Clear emtpy ul's/ol's


          this._clearEmpty(itemElement);

          this._trigger("change", event, this._uiHash());

          break;
        }
      } // mjs - to find the previous sibling in the list,
      // keep backtracking until we hit a valid list item.


      (function () {
        var _previousItem = this.placeholder.prev();

        if (_previousItem.length) {
          previousItem = _previousItem;
        } else {
          previousItem = null;
        }
      }).call(this);

      if (previousItem != null) {
        while (previousItem[0].nodeName.toLowerCase() !== "li" || previousItem[0].className.indexOf(o.disabledClass) !== -1 || previousItem[0] === this.currentItem[0] || previousItem[0] === this.helper[0]) {
          if (previousItem[0].previousSibling) {
            previousItem = $(previousItem[0].previousSibling);
          } else {
            previousItem = null;
            break;
          }
        }
      } // mjs - to find the next sibling in the list,
      // keep stepping forward until we hit a valid list item.


      (function () {
        var _nextItem = this.placeholder.next();

        if (_nextItem.length) {
          nextItem = _nextItem;
        } else {
          nextItem = null;
        }
      }).call(this);

      if (nextItem != null) {
        while (nextItem[0].nodeName.toLowerCase() !== "li" || nextItem[0].className.indexOf(o.disabledClass) !== -1 || nextItem[0] === this.currentItem[0] || nextItem[0] === this.helper[0]) {
          if (nextItem[0].nextSibling) {
            nextItem = $(nextItem[0].nextSibling);
          } else {
            nextItem = null;
            break;
          }
        }
      }

      this.beyondMaxLevels = 0; // mjs - if the item is moved to the left, send it one level up
      // but only if it's at the bottom of the list

      if (parentItem != null && nextItem == null && !(o.protectRoot && parentItem[0].parentNode == this.element[0]) && (o.rtl && this.positionAbs.left + this.helper.outerWidth() > parentItem.offset().left + parentItem.outerWidth() || !o.rtl && this.positionAbs.left < parentItem.offset().left)) {
        parentItem.after(this.placeholder[0]);
        helperIsNotSibling = !parentItem.children(o.listItem).children("li:visible:not(.ui-sortable-helper)").length;

        if (o.isTree && helperIsNotSibling) {
          parentItem.removeClass(this.options.branchClass + " " + this.options.expandedClass).addClass(this.options.leafClass);
        }

        if (typeof parentItem !== 'undefined') this._clearEmpty(parentItem[0]);

        this._trigger("change", event, this._uiHash()); // mjs - if the item is below a sibling and is moved to the right,
        // make it a child of that sibling

      } else if (previousItem != null && !previousItem.hasClass(o.disableNestingClass) && (previousItem.children(o.listType).length && previousItem.children(o.listType).is(":visible") || !previousItem.children(o.listType).length) && !(o.protectRoot && this.currentItem[0].parentNode === this.element[0]) && (o.rtl && this.positionAbs.left + this.helper.outerWidth() < previousItem.offset().left + previousItem.outerWidth() - o.tabSize || !o.rtl && this.positionAbs.left > previousItem.offset().left + o.tabSize)) {
        this._isAllowed(previousItem, level, level + childLevels + 1);

        if (!previousItem.children(o.listType).length) {
          previousItem[0].appendChild(newList);

          if (o.isTree) {
            previousItem.removeClass(o.leafClass).addClass(o.branchClass + " " + o.expandedClass);
          }
        } // mjs - if this item is being moved from the top, add it to the top of the list.


        if (previousTopOffset && previousTopOffset <= previousItem.offset().top) {
          previousItem.children(o.listType).prepend(this.placeholder);
        } else {
          // mjs - otherwise, add it to the bottom of the list.
          previousItem.children(o.listType)[0].appendChild(this.placeholder[0]);
        }

        if (typeof parentItem !== 'undefined') this._clearEmpty(parentItem[0]);

        this._trigger("change", event, this._uiHash());
      } else {
        this._isAllowed(parentItem, level, level + childLevels);
      } //Post events to containers


      this._contactContainers(event); //Interconnect with droppables


      if ($.ui.ddmanager) {
        $.ui.ddmanager.drag(this, event);
      } //Call callbacks


      this._trigger("sort", event, this._uiHash());

      this.lastPositionAbs = this.positionAbs;
      return false;
    },
    _mouseStop: function (event) {
      // mjs - if the item is in a position not allowed, send it back
      if (this.beyondMaxLevels) {
        this.placeholder.removeClass(this.options.errorClass);

        if (this.domPosition.prev) {
          $(this.domPosition.prev).after(this.placeholder);
        } else {
          $(this.domPosition.parent).prepend(this.placeholder);
        }

        this._trigger("revert", event, this._uiHash());
      } // mjs - clear the hovering timeout, just to be sure


      $("." + this.options.hoveringClass).mouseleave().removeClass(this.options.hoveringClass);
      this.mouseentered = false;

      if (this.hovering) {
        window.clearTimeout(this.hovering);
      }

      this.hovering = null;
      this._relocate_event = event;
      this._pid_current = $(this.domPosition.parent).parent().attr("id");
      this._sort_current = this.domPosition.prev ? $(this.domPosition.prev).next().index() : 0;

      $.ui.sortable.prototype._mouseStop.apply(this, arguments); //asybnchronous execution, @see _clear for the relocate event.

    },
    // mjs - this function is slightly modified
    // to make it easier to hover over a collapsed element and have it expand
    _intersectsWithSides: function (item) {
      var half = this.options.isTree ? .8 : .5,
          isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height * half, item.height),
          isOverTopHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, item.top - item.height * half, item.height),
          isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
          verticalDirection = this._getDragVerticalDirection(),
          horizontalDirection = this._getDragHorizontalDirection();

      if (this.floating && horizontalDirection) {
        return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;
      } else {
        return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && isOverTopHalf);
      }
    },
    _contactContainers: function () {
      if (this.options.protectRoot && this.currentItem[0].parentNode === this.element[0]) {
        return;
      }

      $.ui.sortable.prototype._contactContainers.apply(this, arguments);
    },
    _clear: function () {
      var i, item;

      $.ui.sortable.prototype._clear.apply(this, arguments); //relocate event


      if (!(this._pid_current === this._uiHash().item.parent().parent().attr("id") && this._sort_current === this._uiHash().item.index())) {
        this._trigger("relocate", this._relocate_event, this._uiHash());
      } // mjs - clean last empty ul/ol


      for (i = this.items.length - 1; i >= 0; i--) {
        item = this.items[i].item[0];

        this._clearEmpty(item);
      }
    },
    serialize: function (options) {
      var o = $.extend({}, this.options, options),
          items = this._getItemsAsjQuery(o && o.connected),
          str = [];

      $(items).each(function () {
        var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/),
            pid = ($(o.item || this).parent(o.listType).parent(o.items).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);

        if (res) {
          str.push((o.key || res[1]) + "[" + (o.key && o.expression ? res[1] : res[2]) + "]" + "=" + (pid ? o.key && o.expression ? pid[1] : pid[2] : o.rootID));
        }
      });

      if (!str.length && o.key) {
        str.push(o.key + "=");
      }

      return str.join("&");
    },
    toHierarchy: function (options) {
      var o = $.extend({}, this.options, options),
          ret = [];
      $(this.element).children(o.items).each(function () {
        var level = _recursiveItems(this);

        ret.push(level);
      });
      return ret;

      function _recursiveItems(item) {
        var id = ($(item).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/),
            currentItem;
        var data = $(item).data();

        if (data.nestedSortableItem) {
          delete data.nestedSortableItem; // Remove the nestedSortableItem object from the data
        }

        if (id) {
          currentItem = {
            "id": id[2]
          };
          currentItem = $.extend({}, currentItem, data); // Combine the two objects

          if ($(item).children(o.listType).children(o.items).length > 0) {
            currentItem.children = [];
            $(item).children(o.listType).children(o.items).each(function () {
              var level = _recursiveItems(this);

              currentItem.children.push(level);
            });
          }

          return currentItem;
        }
      }
    },
    toArray: function (options) {
      var o = $.extend({}, this.options, options),
          sDepth = o.startDepthCount || 0,
          ret = [],
          left = 1;

      if (!o.excludeRoot) {
        ret.push({
          "item_id": o.rootID,
          "parent_id": null,
          "depth": sDepth,
          "left": left,
          "right": ($(o.items, this.element).length + 1) * 2
        });
        left++;
      }

      $(this.element).children(o.items).each(function () {
        left = _recursiveArray(this, sDepth, left);
      });
      ret = ret.sort(function (a, b) {
        return a.left - b.left;
      });
      return ret;

      function _recursiveArray(item, depth, _left) {
        var right = _left + 1,
            id,
            pid,
            parentItem;

        if ($(item).children(o.listType).children(o.items).length > 0) {
          depth++;
          $(item).children(o.listType).children(o.items).each(function () {
            right = _recursiveArray($(this), depth, right);
          });
          depth--;
        }

        id = ($(item).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);

        if (depth === sDepth) {
          pid = o.rootID;
        } else {
          parentItem = $(item).parent(o.listType).parent(o.items).attr(o.attribute || "id").match(o.expression || /(.+)[-=_](.+)/);
          pid = parentItem[2];
        }

        if (id) {
          var data = $(item).children('div').data();
          var itemObj = $.extend(data, {
            "id": id[2],
            "parent_id": pid,
            "depth": depth,
            "left": _left,
            "right": right
          });
          ret.push(itemObj);
        }

        _left = right + 1;
        return _left;
      }
    },
    _clearEmpty: function (item) {
      function replaceClass(elem, search, replace, swap) {
        if (swap) {
          search = [replace, replace = search][0];
        }

        $(elem).removeClass(search).addClass(replace);
      }

      var o = this.options,
          childrenList = $(item).children(o.listType),
          hasChildren = childrenList.has('li').length;
      var doNotClear = o.doNotClear || hasChildren || o.protectRoot && $(item)[0] === this.element[0];

      if (o.isTree) {
        replaceClass(item, o.branchClass, o.leafClass, doNotClear);
      }

      if (!doNotClear) {
        childrenList.parent().removeClass(o.expandedClass);
        childrenList.remove();
      }
    },
    _getLevel: function (item) {
      var level = 1,
          list;

      if (this.options.listType) {
        list = item.closest(this.options.listType);

        while (list && list.length > 0 && !list.is(".ui-sortable")) {
          level++;
          list = list.parent().closest(this.options.listType);
        }
      }

      return level;
    },
    _getChildLevels: function (parent, depth) {
      var self = this,
          o = this.options,
          result = 0;
      depth = depth || 0;
      $(parent).children(o.listType).children(o.items).each(function (index, child) {
        result = Math.max(self._getChildLevels(child, depth + 1), result);
      });
      return depth ? result + 1 : result;
    },
    _isAllowed: function (parentItem, level, levels) {
      var o = this.options,
          // this takes into account the maxLevels set to the recipient list
      maxLevels = this.placeholder.closest(".ui-sortable").nestedSortable("option", "maxLevels"),
          // Check if the parent has changed to prevent it, when o.disableParentChange is true
      oldParent = this.currentItem.parent().parent(),
          disabledByParentchange = o.disableParentChange && ( //From somewhere to somewhere else, except the root
      typeof parentItem !== 'undefined' && !oldParent.is(parentItem) || typeof parentItem === 'undefined' && oldParent.is("li") //From somewhere to the root
      ); // mjs - is the root protected?
      // mjs - are we nesting too deep?

      if (disabledByParentchange || !o.isAllowed(this.placeholder, parentItem, this.currentItem)) {
        this.placeholder.addClass(o.errorClass);

        if (maxLevels < levels && maxLevels !== 0) {
          this.beyondMaxLevels = levels - maxLevels;
        } else {
          this.beyondMaxLevels = 1;
        }
      } else {
        if (maxLevels < levels && maxLevels !== 0) {
          this.placeholder.addClass(o.errorClass);
          this.beyondMaxLevels = levels - maxLevels;
        } else {
          this.placeholder.removeClass(o.errorClass);
          this.beyondMaxLevels = 0;
        }
      }
    }
  }));
  $.mjs.nestedSortable.prototype.options = $.extend({}, $.ui.sortable.prototype.options, $.mjs.nestedSortable.prototype.options);
});

/***/ })

}]);
//# sourceMappingURL=16.d9a62c.js.map