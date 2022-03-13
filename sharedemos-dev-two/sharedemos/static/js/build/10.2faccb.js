(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./sharedemos/static/js/checklist/collections/checklist_collection.js":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/collections/checklist_collection.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/checklist */ "./sharedemos/static/js/checklist/models/checklist.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, Checklist) {
  'use strict';

  var ChecklistCollection = Backbone.Collection.extend({
    model: Checklist,
    url: "/api/checklist"
  });
  return ChecklistCollection;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/checklist/models/checklist.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/checklist/models/checklist.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Checklist = Backbone.Model.extend({
    urlRoot: "/api/checklist"
  });
  return Checklist;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/checklist/models/checklist_item_activity.js":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/models/checklist_item_activity.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var ChecklistItemActivity = Backbone.Model.extend({
    urlRoot: "/checklist-item-activity"
  });
  return ChecklistItemActivity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/checklist/routers/router.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/checklist/routers/router.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../views/home */ "./sharedemos/static/js/checklist/views/home.js"), __webpack_require__(/*! ../views/checklist */ "./sharedemos/static/js/checklist/views/checklist.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Common, HomeView, ChecklistView) {
  'use strict';

  var ChecklistRouter = Backbone.Router.extend({
    routes: {
      "": "home",
      ":checklist": "routeHandler"
    },
    initialize: function () {
      this.view = null;
      return this;
    },
    home: function () {
      this.loadView(new HomeView());
    },
    routeHandler: function (checklist) {
      this.loadView(new ChecklistView(checklist), checklist);
    },
    loadView: function (view, checklist) {
      if (this.view) {
        this.view.undelegateEvents();
      }

      if (checklist) {
        document.checklist_session = Common.generateUUID();
      }

      this.view = view;
    }
  });
  return ChecklistRouter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist.handlebars ***!
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

  return "		<div class=\"checklist_steps_menu\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"checklist_sections") : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":10,"column":12}}})) != null ? stack1 : "")
    + "		</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<div class=\"steps\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"checklist_section_id") : depth0), depth0))
    + "\">\r\n					<span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":7,"column":11},"end":{"line":7,"column":32}}}))
    + "</span> \r\n					<div class=\"steps-name\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</div>\r\n				</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":1},"end":{"line":45,"column":12}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"checklist_result_block\">\r\n			<div class=\"results_close\"></div>\r\n			<div class=\"checks_progress\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"progress",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":32},"end":{"line":28,"column":52}}}))
    + "</div>\r\n			<div class=\"progress_count\"><span class=\"total_checks_count\">0</span><span class=\"noun_form\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checks",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":96},"end":{"line":29,"column":114}}}))
    + "</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"marked",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":122},"end":{"line":29,"column":140}}}))
    + "</div>\r\n			<div class=\"result_title\">0</div>\r\n			<span class=\"result_rate\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"completion rate",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":29},"end":{"line":31,"column":56}}}))
    + "</span>\r\n            <h1 class=\"hidden overall_rate\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"overall completion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":32,"column":44},"end":{"line":32,"column":74}}}))
    + "</h1>\r\n			<div class=\"progress_bar\"><div class=\"progress_status\"></div></div>\r\n            <span class=\"progress_percent\"></span>\r\n			<div class=\"get_result\" data-slug=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"get results",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":58},"end":{"line":35,"column":81}}}))
    + "</div>\r\n			<div class=\"start_over\" data-slug=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"start over",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":58},"end":{"line":36,"column":80}}}))
    + "</div>\r\n			<div class=\"result_block\"></div>\r\n            <div class=\"email-block\">\r\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"download my results",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":39,"column":35},"end":{"line":39,"column":66}}}))
    + "</div>\r\n                <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enter your email to download a pdf with the results.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":39},"end":{"line":40,"column":103}}}))
    + "</div>\r\n                <input id=\"user_email\" name=\"email\" class=\"email-input\" placeholder=\"example@example.com\" type=\"email\">\r\n                <div class=\"export\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"export results",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":36},"end":{"line":42,"column":62}}}))
    + "</div>\r\n            </div>\r\n		</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"checklist_main_wrap\">\r\n	<div class=\"return-home\">back</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":1},"end":{"line":12,"column":12}}})) != null ? stack1 : "")
    + "	<div class=\"checklist_wrap\">\r\n		<div class=\"checklist_header\" data-id=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" checklist-id = \""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"checklist_id") : stack1), depth0))
    + "\">\r\n			<div class=\"checklist_title\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</div>\r\n			<div class=\"checklist_description\">\r\n				"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "\r\n			</div>	\r\n		</div>\r\n		<div class=\"checklist_step_wrap\">\r\n		</div>			\r\n	</div>\r\n</div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"view_type") : depth0),"==","main_checklist",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":0},"end":{"line":46,"column":12}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_block.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_block.handlebars ***!
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

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":67},"end":{"line":1,"column":119}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<div class=\"views\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"views_count") : stack1), depth0))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li data-checklist-slug=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":52},"end":{"line":1,"column":126}}})) != null ? stack1 : "")
    + "\">\n	<div class='checklist_wrap'>\n		<div class=\"banner\">		\n			<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\"/>\n			<label>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</label>\n			<div class=\"banner_overlay\"></div>\n		</div>\n		<div class=\"info_block\">\n			<div class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</div>\n			<div class=\"description\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n			<div data-slug='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "' class=\"explore\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"explore",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":55},"end":{"line":11,"column":74}}}))
    + "</div>\n		</div>\n		<div class=\"footer\">\n			<div class=\"description\">\n				"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "\n			</div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":3},"end":{"line":19,"column":14}}})) != null ? stack1 : "")
    + "			<div class=\"counts\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist") : depth0)) != null ? lookupProperty(stack1,"items_count") : stack1), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"checks",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":49},"end":{"line":20,"column":67}}}))
    + "</div>\n		</div>\n	</div>\n</li>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_home.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_home.handlebars ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "		<div class=\"trendig-menu\">\n			<div class=\"filter active\" id=\"all\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"all",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":39},"end":{"line":7,"column":54}}}))
    + "</div>\n			<div class=\"filter\" id=\"featured\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"featured",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":37},"end":{"line":8,"column":57}}}))
    + "</div>\n			<div class=\"filter\" id=\"trending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"trending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":37},"end":{"line":9,"column":57}}}))
    + "</div>\n			<div class=\"filter\" id=\"recent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"latest",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":35},"end":{"line":10,"column":53}}}))
    + "</div>\n		</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"fs-banner\"> \n	<div class=\"title1\">\n		"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklists",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":24}}}))
    + "\n	</div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":1},"end":{"line":12,"column":12}}})) != null ? stack1 : "")
    + "</div>\n<div class=\"checklist_list\">\n	<ul class=\"checklists all_list\"></ul>\n	<ul class=\"checklists featured_list\"></ul>\n	<ul class=\"checklists trending_list\"></ul>\n	<ul class=\"checklists recent_list\"></ul>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_item.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_item.handlebars ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"suggestions_title\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"suggested content : ",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":34},"end":{"line":12,"column":66}}}))
    + "</div>\n			<div class=\"sortable-wrap ui-sortable\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"checklist_item\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"checklist_item_id") : stack1), depth0))
    + "\">\n	<div class=\"head\">\n		<div class=\"check\" data-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"checklist_item_id") : stack1), depth0))
    + "\"></div>\n		<div class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</div>\n		<div class=\"arrow\"></div>\n	</div>\n	<div class=\"info_block\" id=\"item_"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"checklist_item_id") : stack1), depth0))
    + "\">\n		<div class=\"text\">\n			"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "\n		</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0)) != null ? lookupProperty(stack1,"suggestions") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":2},"end":{"line":14,"column":9}}})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_results.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_results.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <h1 class=\"step_title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h1>\n        <div class=\"progress_bar step\"><div class=\"progress_status\" style=\"width:"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"completion_percent") : depth0), depth0))
    + "%!important;\"></div></div>\n        <span class=\"progress_percent\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"completion_percent") : depth0), depth0))
    + "%</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"message\">\n			"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"you're doing a good job, but with a few tweaks, you can improve your",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":3},"end":{"line":12,"column":84}}}))
    + " "
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + ".\n		</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<div class=\"section_results\">\n        <div class=\"completion_circle\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_checked_items") : depth0), depth0))
    + "/"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_total_items") : depth0), depth0))
    + "</div>\n		<div class=\"title\">\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\"</div>\n		<div class=\"result_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"you completed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":28},"end":{"line":20,"column":53}}}))
    + " <span class=\"completed_length\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_checked_items") : depth0), depth0))
    + "</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"out of",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":118},"end":{"line":20,"column":136}}}))
    + " <span class=\"total_length\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_total_items") : depth0), depth0))
    + "</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"checklist items in this step.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":195},"end":{"line":20,"column":236}}}))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"has_suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":2},"end":{"line":23,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"checklist_items") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":2},"end":{"line":48,"column":11}}})) != null ? stack1 : "")
    + "	</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"description\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"here are some suggested resources that will help you based on the checklist items you didn’t mark.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":28},"end":{"line":22,"column":138}}}))
    + "</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"checked") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":12},"end":{"line":47,"column":23}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestions") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":16},"end":{"line":46,"column":23}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<div class=\"checklist_item_title\">\n						"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested for not checking",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":6},"end":{"line":28,"column":44}}}))
    + " “"
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "”\n					</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"suggestions") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":5},"end":{"line":45,"column":14}}})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"suggested_content_wrap\">\n							<a class=\"suggested_content\" href="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + " target=\"_blank\" tabindex=\"-1\">\n								<div class=\"suggested_content_icon\">\n									<img class=\"icon\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"thumbnail") : depth0), depth0))
    + "\">\n								</div>\n								<div class=\"suggested_content_info\">\n									<div class=\"desc\">\n										"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n									</div>\n									<div class=\"url\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "</div>\n								</div>\n								<div class=\"link\"></div>\n							</a>\n						</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"final_results\">\n\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"checklist_sections") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":7,"column":13}}})) != null ? stack1 : "")
    + "\n	<div class=\"completion_message\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"all done! looks like you've completed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":33},"end":{"line":9,"column":83}}}))
    + " <span class=\"completed_length\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"checked_items") : stack1), depth0))
    + "</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"out of",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":151},"end":{"line":9,"column":169}}}))
    + " <span class=\"total_length\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"total_items") : stack1), depth0))
    + "</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist items.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":231},"end":{"line":9,"column":259}}}))
    + "</div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"completion_rate") : stack1),"<",100,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":1},"end":{"line":14,"column":13}}})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"checklists") : depth0)) != null ? lookupProperty(stack1,"checklist_sections") : stack1),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":0},"end":{"line":50,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_section.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_section.handlebars ***!
  \*******************************************************************************/
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

  return "data-title=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_section") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0));
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"checklist_section\" data-id="
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_section") : depth0)) != null ? lookupProperty(stack1,"checklist_section_id") : stack1), depth0))
    + " id=\"section_"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_section") : depth0)) != null ? lookupProperty(stack1,"checklist_section_id") : stack1), depth0))
    + "\">\n	<div class=\"steps_title\" "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":26},"end":{"line":2,"column":96}}})) != null ? stack1 : "")
    + "\">\n		<span class=\"index\">"
    + alias2(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":3,"column":22},"end":{"line":3,"column":31}}}) : helper)))
    + "</span>\n		<span class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"checklist_section") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</span>\n	</div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":1},"end":{"line":7,"column":12}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/checklist_suggestion.handlebars":
/*!**********************************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/checklist_suggestion.handlebars ***!
  \**********************************************************************************/
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

  return "data-id="
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"suggestion_id") : stack1), depth0))
    + " data-type=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"suggestion_type") : stack1), depth0))
    + "\"";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"link\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"suggested_content_wrap\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":36},"end":{"line":1,"column":138}}})) != null ? stack1 : "")
    + ">\n	<a class=\"suggested_content\" href="
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"link") : stack1), depth0))
    + " target=\"_blank\" tabindex=\"-1\">\n		<div class=\"suggested_content_icon\">\n			<img class=\"icon\" src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\">\n		</div>\n		<div class=\"suggested_content_info\">\n			<div class=\"desc\">\n				"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "\n			</div>\n			<div class=\"url\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"suggestion") : depth0)) != null ? lookupProperty(stack1,"link") : stack1), depth0))
    + "</div>\n		</div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":2},"end":{"line":14,"column":13}}})) != null ? stack1 : "")
    + "	</a>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/templates/popup.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/checklist/templates/popup.handlebars ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"alert\">\r\n    <div class=\"popup-title\">\r\n        warning\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"sub-title text-center\">\r\n                "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"alert_message") : depth0), depth0))
    + "\r\n            </div>\r\n        </div>      \r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"alert_action") : depth0), depth0))
    + "\" data-popup=\"alert\">OK</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"checklist\">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":24,"column":96}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":47},"end":{"line":28,"column":74}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a checklist title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":35},"end":{"line":29,"column":70}}}))
    + "</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"200\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":92},"end":{"line":30,"column":114}}}))
    + "\" />\r\n            <div class=\"counter\" id=\"checklist_title_counter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"200 characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":62},"end":{"line":31,"column":93}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":34,"column":31},"end":{"line":34,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes your checklist.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":35},"end":{"line":35,"column":108}}}))
    + "</div>\r\n            <textarea name=\"description\" maxlength=\"500\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":70},"end":{"line":36,"column":94}}}))
    + "\"></textarea>\r\n            <div class=\"counter\" id=\"checklist_desc_counter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"500 characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":61},"end":{"line":37,"column":92}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"featured",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":31},"end":{"line":40,"column":51}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you want your checklist featured?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":35},"end":{"line":41,"column":83}}}))
    + "</div>\r\n            <div id=\"featured\">\r\n                <div class=\"option-check active\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"yes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":49},"end":{"line":43,"column":64}}}))
    + "</div>\r\n                <div class=\"option-check\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"no",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":42},"end":{"line":44,"column":56}}}))
    + "</div>\r\n            </div>\r\n        </div>\r\n        <hr class=\"break\"/>\r\n        <div class=\"advanced\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":48,"column":30},"end":{"line":48,"column":50}}}))
    + "</div>\r\n        <div class=\"block advanced-block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":31},"end":{"line":50,"column":55}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your checklist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":51,"column":35},"end":{"line":51,"column":88}}}))
    + "</div>\r\n            <input type=\"file\" name=\"upload-file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file-name\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":54,"column":35},"end":{"line":54,"column":56}}}))
    + "</div>\r\n            <div class=\"remove-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":55,"column":37},"end":{"line":55,"column":55}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":37},"end":{"line":56,"column":55}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"checklist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":61,"column":55},"end":{"line":61,"column":73}}}))
    + "</div>\r\n            <div class=\"save\" data-popup=\"checklist\" data-id=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"checklist_slug") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":62,"column":82},"end":{"line":62,"column":98}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":64,"column":33},"end":{"line":64,"column":64}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":65,"column":31},"end":{"line":65,"column":62}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":66,"column":34},"end":{"line":66,"column":55}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit checklist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":23},"end":{"line":24,"column":49}}}));
},"6":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new checklist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":57},"end":{"line":24,"column":89}}}));
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"checklist_section\">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":74,"column":8},"end":{"line":74,"column":92}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"step",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":47},"end":{"line":78,"column":63}}}))
    + " "
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"index") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":74},"end":{"line":78,"column":90}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose the name for this step of your checklist experience ( i.e. \"recommended\").",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":79,"column":35},"end":{"line":79,"column":128}}}))
    + "</div>\r\n            <input name=\"name\" type=\"text\" maxlength=\"50\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":80,"column":90},"end":{"line":80,"column":107}}}))
    + "\" />\r\n            <div class=\"counter\" id=\"checklist_section_title_counter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"50 Characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":81,"column":70},"end":{"line":81,"column":100}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer \">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"checklist_section\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":86,"column":63},"end":{"line":86,"column":81}}}))
    + "</div>\r\n            <div class=\"save\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"section_id") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":87,"column":30},"end":{"line":87,"column":79}}})) != null ? stack1 : "")
    + "  >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":87,"column":82},"end":{"line":87,"column":98}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":89,"column":33},"end":{"line":89,"column":64}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":31},"end":{"line":90,"column":62}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":91,"column":34},"end":{"line":91,"column":55}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit step",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":74,"column":23},"end":{"line":74,"column":44}}}));
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create step",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":74,"column":52},"end":{"line":74,"column":75}}}))
    + " "
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"index") : depth0), depth0));
},"13":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"section_id") : depth0), depth0))
    + "\"";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"checklist_item\">\r\n    <div class=\"popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":99,"column":8},"end":{"line":99,"column":106}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist item text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":103,"column":47},"end":{"line":103,"column":78}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write the main action text for this checklist item. (i.e. \"install software\")",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":104,"column":35},"end":{"line":104,"column":124}}}))
    + "</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":105,"column":92},"end":{"line":105,"column":108}}}))
    + "\" />\r\n            <div class=\"counter\" id=\"checklist_item_title_counter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"100 characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":106,"column":67},"end":{"line":106,"column":98}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"checklist item description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":109,"column":31},"end":{"line":109,"column":69}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a description about what this checklist item is for.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":110,"column":35},"end":{"line":110,"column":105}}}))
    + "</div>\r\n            <textarea name=\"description\" maxlength=\"350\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":111,"column":70},"end":{"line":111,"column":93}}}))
    + "\"></textarea>\r\n            <div class=\"counter\" id=\"checklist_desc_counter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"350 characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":112,"column":61},"end":{"line":112,"column":92}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block hide\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":115,"column":31},"end":{"line":115,"column":60}}}))
    + "</div>\r\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"provide your user with internal or external content related to this checklist item.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":116,"column":39},"end":{"line":116,"column":134}}}))
    + "</div>\r\n                <div class=\"suggetsion_type\">\r\n                    <input type=\"radio\" id=\"link_chapter\" name=\"cta_type\"  class=\"css-radio\" checked=\"checked\" value=\"cta-link\">\r\n                    <label class=\"css-radio-label\" for=\"link_chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapters from your internal library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":119,"column":70},"end":{"line":119,"column":117}}}))
    + "</label>\r\n                    <div class=\"content_suggestion\">\r\n                        <div class=\"browse\" data-popup=\"add_suggested_chapters\" data-popup-from=\"add_suggestions\" data-id=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse your library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":121,"column":136},"end":{"line":121,"column":167}}}))
    + "</div>\r\n                        <div class=\"selected_chapters\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"suggetsion_type\">\r\n                    <input type=\"radio\" id=\"link_external\" name=\"cta_type\"  class=\"css-radio\" value=\"cta-link\" >\r\n                    <label class=\"css-radio-label\" for=\"link_external\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":127,"column":71},"end":{"line":127,"column":107}}}))
    + "</label>\r\n                    <div class=\"content_suggestion disabled\">\r\n                        <div class=\"external-links\"></div>\r\n                        <input class=\"suggestion_link\" placeholder=\"http://\" type=\"url\" disabled=\"true\"/>\r\n                        <div class=\"add_suggestion_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":131,"column":57},"end":{"line":131,"column":72}}}))
    + "</div>\r\n                        <div class=\"loader\"></div>\r\n                    </div>\r\n                </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer \">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" data-popup=\"checklist_item\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":139,"column":60},"end":{"line":139,"column":78}}}))
    + "</div>\r\n            <div class=\"save\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"section_id") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":140,"column":30},"end":{"line":140,"column":83}}})) != null ? stack1 : "")
    + "\r\n            "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_id") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":141,"column":12},"end":{"line":141,"column":55}}})) != null ? stack1 : "")
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":141,"column":56},"end":{"line":141,"column":72}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":33},"end":{"line":143,"column":64}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":144,"column":31},"end":{"line":144,"column":62}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":145,"column":34},"end":{"line":145,"column":55}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit checklist item",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":99,"column":23},"end":{"line":99,"column":54}}}));
},"18":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new checklist item",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":99,"column":62},"end":{"line":99,"column":99}}}));
},"20":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "section-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"section_id") : depth0), depth0))
    + "\" ";
},"22":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\"";
},"24":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"checklist_suggestion\">\r\n    <div class=\"popup-title suggestion-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add suggestion",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":153,"column":12},"end":{"line":153,"column":38}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":157,"column":51},"end":{"line":157,"column":80}}}))
    + "</div>\r\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"provide your user with internal or external content related to this checklist item.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":158,"column":39},"end":{"line":158,"column":134}}}))
    + "</div>\r\n                <div class=\"suggetsion_type\">\r\n                    <input type=\"radio\" id=\"link_chapter\" name=\"cta_type\"  class=\"css-radio\" checked=\"checked\" value=\"cta-link\">\r\n                    <label class=\"css-radio-label\" for=\"link_chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapters from your internal library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":161,"column":70},"end":{"line":161,"column":117}}}))
    + "</label>\r\n                    <div class=\"content_suggestion\">\r\n                        <div class=\"browse\" data-popup=\"add_suggested_chapters\" data-popup-from=\"add_suggestions\" data-id=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse your library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":163,"column":136},"end":{"line":163,"column":167}}}))
    + "</div>\r\n                        <div class=\"selected_chapters\"></div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"suggetsion_type\">\r\n                    <input type=\"radio\" id=\"link_external\" name=\"cta_type\"  class=\"css-radio\" value=\"cta-link\" >\r\n                    <label class=\"css-radio-label\" for=\"link_external\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":169,"column":71},"end":{"line":169,"column":107}}}))
    + "</label>\r\n                    <div class=\"content_suggestion disabled\">\r\n                        <div class=\"external-links\"></div>\r\n                        <input class=\"suggestion_link\" placeholder=\"http://\" type=\"url\" disabled=\"true\"/>\r\n                        <div class=\"add_suggestion_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":173,"column":57},"end":{"line":173,"column":72}}}))
    + "</div>\r\n                        <div class=\"loader\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" data-popup=\"checklist_suggestion\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":182,"column":70},"end":{"line":182,"column":88}}}))
    + "</div>\r\n                <div class=\"save\" data-popup=\"checklist_suggestion\" data-id=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":183,"column":90},"end":{"line":183,"column":106}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops!saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":185,"column":37},"end":{"line":185,"column":67}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":186,"column":35},"end":{"line":186,"column":66}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":187,"column":38},"end":{"line":187,"column":59}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"26":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"edit_suggestion\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"edit suggestion text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":195,"column":8},"end":{"line":195,"column":40}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":199,"column":47},"end":{"line":199,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a title for the suggestion.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":200,"column":35},"end":{"line":200,"column":80}}}))
    + "</div>\r\n            <textarea name=\"title\" class=\"\" maxlength=\"200\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write something",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":201,"column":73},"end":{"line":201,"column":100}}}))
    + "\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</textarea>\r\n            <div class=\"counter\" id=\"checklist_sugg_title_counter\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title_limit") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":202,"column":83},"end":{"line":202,"column":110}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel\" rel=\"edit_suggestion\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":207,"column":54},"end":{"line":207,"column":72}}}))
    + "</div>\r\n            <div class=\"save\" data-id='"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"suggestion_id") : depth0), depth0))
    + "'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"update",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":208,"column":58},"end":{"line":208,"column":76}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops!saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":210,"column":33},"end":{"line":210,"column":63}}}))
    + "</div>\r\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":211,"column":31},"end":{"line":211,"column":62}}}))
    + "</div>\r\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":212,"column":34},"end":{"line":212,"column":55}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box confirm_delete\">\r\n    <div class=\"popup-title delete-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":220,"column":12},"end":{"line":220,"column":30}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":225,"column":19},"end":{"line":225,"column":60}}}))
    + "<br><br>\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure want to permanently delete this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":226,"column":19},"end":{"line":226,"column":75}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "?\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_delete\">cancel</div>\r\n                <div class=\"confirm-delete delete\" data-type=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\" \r\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"checklist_slug") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":234,"column":20},"end":{"line":234,"column":90}}})) != null ? stack1 : "")
    + "\r\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"section_id") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":235,"column":20},"end":{"line":235,"column":78}}})) != null ? stack1 : "")
    + "\r\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_id") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":236,"column":20},"end":{"line":236,"column":69}}})) != null ? stack1 : "")
    + "\r\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"suggestion_id") : depth0),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":237,"column":20},"end":{"line":237,"column":87}}})) != null ? stack1 : "")
    + ">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1," delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":238,"column":20},"end":{"line":238,"column":39}}}))
    + "\r\n                </div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":241,"column":37},"end":{"line":241,"column":79}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been deleted.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":242,"column":35},"end":{"line":242,"column":97}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":243,"column":38},"end":{"line":243,"column":61}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-checklist-slug=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"checklist_slug") : depth0), depth0))
    + "\"";
},"31":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-section-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"section_id") : depth0), depth0))
    + "\"";
},"33":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-item-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\"";
},"35":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-suggestion-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"suggestion_id") : depth0), depth0))
    + "\"";
},"37":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box confirm_disable\">\r\n    <div class=\"popup-title disable-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":251,"column":12},"end":{"line":251,"column":31}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":256,"column":19},"end":{"line":256,"column":35}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"will not be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":256,"column":52},"end":{"line":256,"column":99}}}))
    + "<br>\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to disable this ",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":257,"column":19},"end":{"line":257,"column":69}}}))
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"from view??",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":257,"column":85},"end":{"line":257,"column":108}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_disable\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":263,"column":58},"end":{"line":263,"column":76}}}))
    + "</div>\r\n                <div class=\"confirm-disable disable\" data-type=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\" data-checklist-slug=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"checklist_slug") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":264,"column":122},"end":{"line":264,"column":141}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":266,"column":37},"end":{"line":266,"column":83}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":267,"column":35},"end":{"line":267,"column":68}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":268,"column":38},"end":{"line":268,"column":62}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"39":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box confirm_enable\">\r\n    <div class=\"popup-title enable-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":276,"column":12},"end":{"line":276,"column":30}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":281,"column":19},"end":{"line":281,"column":35}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"will be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":281,"column":52},"end":{"line":281,"column":95}}}))
    + "<br>\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to enable this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":282,"column":19},"end":{"line":282,"column":67}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"from view??",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":282,"column":84},"end":{"line":282,"column":107}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_enable\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":288,"column":57},"end":{"line":288,"column":75}}}))
    + "</div>\r\n                <div class=\"confirm-enable enable\" data-type=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"entity_type") : depth0), depth0))
    + "\" data-checklist-slug=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"checklist_slug") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":289,"column":120},"end":{"line":289,"column":138}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":291,"column":37},"end":{"line":291,"column":83}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":292,"column":35},"end":{"line":292,"column":67}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":293,"column":38},"end":{"line":293,"column":61}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"41":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box confirm_publish_checklist\">\r\n    <div class=\"popup-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":301,"column":12},"end":{"line":301,"column":39}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":306,"column":20},"end":{"line":306,"column":77}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\" rel=\"confirm_publish_checklist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":312,"column":68},"end":{"line":312,"column":86}}}))
    + "</div>\r\n                <div class=\"confirm-publish-checklist publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":313,"column":63},"end":{"line":313,"column":82}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":315,"column":37},"end":{"line":315,"column":79}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":316,"column":35},"end":{"line":316,"column":99}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":317,"column":38},"end":{"line":317,"column":63}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"43":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"popup-box\" data-popup=\"checklist_suggestion\">\r\n        <div class=\"popup-title\">\r\n            <div class=\"back\" data-popup=\"add_suggestions\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\"></div>\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"browse library",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":326,"column":12},"end":{"line":326,"column":38}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"search_chapters\">\r\n                    <input name=\"search\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"search content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":331,"column":101},"end":{"line":331,"column":127}}}))
    + "\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"demo-library block\" id=\"demo-library\"></div>\r\n            <div class=\"block site_map hidden\" id=\"site_map\"></div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":339,"column":36},"end":{"line":339,"column":54}}}))
    + "</div>\r\n                <div class=\"save\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"item_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":340,"column":56},"end":{"line":340,"column":72}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":342,"column":37},"end":{"line":342,"column":68}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":343,"column":35},"end":{"line":343,"column":66}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saving...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":344,"column":38},"end":{"line":344,"column":59}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"45":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "    <div class=\"popup-box\" data-popup=\"export\">\r\n        <div class=\"popup-title\">\r\n            <div class=\"back export-back\"></div>\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"export results",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":353,"column":12},"end":{"line":353,"column":38}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"demo-library block\" id=\"demo-library\">\r\n                 <div class='demo'>\r\n                     <div>\r\n                         <h1>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"suggested content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":359,"column":29},"end":{"line":359,"column":58}}}))
    + "</h1>\r\n                         <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you want to include the suggested content links in the ",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":360,"column":28},"end":{"line":360,"column":98}}}))
    + "<span>pdf</span>?</p>\r\n                     </div>\r\n                     <input name=\"pdf\" type='checkbox' id=\"suggested-content-export\" class='css-checkbox' />\r\n                     <label for=\"suggested-content-export\" class='css-label'></label>\r\n                 </div>\r\n                <div class='demo'>\r\n                     <div>\r\n                         <h1>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"email copy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":367,"column":29},"end":{"line":367,"column":51}}}))
    + "</h1>\r\n                         <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"would you like an email copy of your results for your records?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":368,"column":28},"end":{"line":368,"column":102}}}))
    + "</p>\r\n                     </div>\r\n                     <input name=\"email\" type='checkbox' id=\"email-export\" class='css-checkbox' />\r\n                     <label for=\"email-export\" class='css-label'></label>\r\n                 </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"save download\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"download",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":377,"column":43},"end":{"line":377,"column":63}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! download failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":379,"column":37},"end":{"line":379,"column":70}}}))
    + "</div>\r\n            <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"download successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":380,"column":35},"end":{"line":380,"column":69}}}))
    + "</div>\r\n            <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"downloading...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":381,"column":38},"end":{"line":381,"column":64}}}))
    + "<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"alert") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"checklist") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":0},"end":{"line":69,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"checklist_section") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":71,"column":0},"end":{"line":94,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"checklist_item") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":0},"end":{"line":148,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggestions") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":150,"column":0},"end":{"line":190,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_suggestion") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":192,"column":0},"end":{"line":215,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"confirm_delete") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":217,"column":0},"end":{"line":246,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"confirm_disable") : depth0),{"name":"if","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":248,"column":0},"end":{"line":271,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"confirm_enable") : depth0),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":273,"column":0},"end":{"line":296,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"publish_checklist") : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":298,"column":0},"end":{"line":320,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_suggested_chapters") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":322,"column":0},"end":{"line":347,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"export") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":349,"column":0},"end":{"line":384,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/checklist/views/checklist.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/checklist/views/checklist.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/checklist */ "./sharedemos/static/js/checklist/models/checklist.js"), __webpack_require__(/*! ../models/checklist_item_activity */ "./sharedemos/static/js/checklist/models/checklist_item_activity.js"), __webpack_require__(/*! ../templates/checklist.handlebars */ "./sharedemos/static/js/checklist/templates/checklist.handlebars"), __webpack_require__(/*! ../templates/checklist_section.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_section.handlebars"), __webpack_require__(/*! ../templates/checklist_item.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_item.handlebars"), __webpack_require__(/*! ../templates/checklist_suggestion.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_suggestion.handlebars"), __webpack_require__(/*! ../templates/checklist_results.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_results.handlebars"), __webpack_require__(/*! ../templates/popup.handlebars */ "./sharedemos/static/js/checklist/templates/popup.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Checklist, ChecklistItemActivity, ChecklistMainTemplate, ChecklistSectionTemplate, ChecklistItemTemplate, ChecklistSuggestionTemplate, ChecklistResultsTemplate, PopupTemplate) {
  'use strict';

  var ChecklistView = Backbone.View.extend({
    el: '#main_container',
    events: {
      'click .filter': 'changeHomeViewType',
      'click .start_over': 'exploreChecklist',
      'click .return-home': 'backToHome',
      'click .checklist_item .arrow': 'toggleChecklistText',
      'click .checklist_steps_menu .steps': 'nextChecklistSection',
      'click .checklist_item .check': 'logChecklistItemActivity',
      'click .get_result': 'showChecklistResults',
      'click .results_close': 'closeChecklistResults',
      'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
      'click .export': 'showExportPopup',
      'click .export-back': 'hidePopup',
      'click .download': 'exportResults'
    },
    initialize: function (checklist_slug) {
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
      this.is_edit = false;

      if (document.isEdit) {
        this.is_edit = true;
      }

      this.view_type = document.viewType;
      this.checklist = new Checklist({
        'id': checklist_slug
      });
      this.listenTo(this.checklist, 'sync', this.render);
      this.checklist.fetch({
        reset: true
      });
      this.lastResults = {};
    },
    render: function () {
      this.$el.find('#block_container').html(ChecklistMainTemplate({
        'checklist': this.checklist.attributes,
        'is_edit': this.is_edit,
        'view_type': this.view_type
      }));

      if (this.checklist.attributes.checklist_sections.length > 0) {
        this.loadChecklistItems(this.checklist.attributes.checklist_sections);
      }

      Backbone.trigger("checklist_rendered", this);
    },
    backToHome: function () {
      Backbone.history.navigate('/', {
        trigger: true
      });
    },
    closeChecklistResults: function () {
      this.$el.find('#block_container').removeClass('result_active');
      this.$('.result_block').html('');
      this.$el.find('.result_rate, .results_title').removeClass('hidden');
      this.$el.find('.overall_rate').addClass('hidden');
    },
    exploreChecklist: function (event) {
      var checklistId = this.$(event.currentTarget).attr('data-slug');
      this.$el.find('#block_container').removeClass('result_active');

      if (checklistId) {
        Backbone.history.loadUrl(Backbone.history.fragment);
      }

      Backbone.trigger("checklist_rendered", this);
    },
    loadChecklistItems: function (checklist_sections) {
      var is_edit = this.is_edit;

      if (document.requestParameters) {
        is_edit = true;
      }

      _.each(checklist_sections, function (checklist_section, index) {
        $('.checklist_step_wrap').append(ChecklistSectionTemplate({
          "checklist_section": checklist_section,
          'index': index + 1,
          'is_edit': is_edit
        }));

        _.each(checklist_section.checklist_items, function (checklist_item, index) {
          $('#section_' + checklist_section.checklist_section_id).append(ChecklistItemTemplate({
            "checklist_item": checklist_item,
            'is_edit': is_edit
          }));

          _.each(checklist_item.suggestions, function (suggestion, index) {
            $('#item_' + checklist_item.checklist_item_id + ' .sortable-wrap').append(ChecklistSuggestionTemplate({
              "suggestion": suggestion,
              'is_edit': is_edit
            }));
          });
        });
      });

      is_edit = this.is_edit;

      if (is_edit == false) {
        this.$('.checklist_section').hide();
        this.$('#section_' + checklist_sections[0].checklist_section_id).show();
        this.$('.checklist_steps_menu .steps').removeClass('active');
        this.$('.checklist_steps_menu .steps[data-id="' + checklist_sections[0].checklist_section_id + '"]').first().addClass('active');
      }
    },
    logChecklistItemActivity: function (event) {
      this.$(event.currentTarget).parents('.checklist_item').toggleClass('selected');

      if (document.viewType == 'main_checklist') {
        var total_checks_count = 0;
        $('.check').each(function () {
          if ($(this).parents('.checklist_item').hasClass('selected') == true) {
            total_checks_count++;
          }
        });
        var noun_form = total_checks_count == 1 ? 'Check' : 'Checks';
        $('.noun_form').html(noun_form);

        if (total_checks_count > 0) {
          $('.checklist_result_block').addClass('selected');
        } else {
          $('.checklist_result_block').removeClass('selected');
        }

        $('.total_checks_count').html(total_checks_count);
        var checklistSlug = $('.checklist_header').attr('data-id');
        var checklistSectionId = $(event.currentTarget).parents('.checklist_section').attr('data-id');
        var checklistId = $(event.currentTarget).parents('.checklist_wrap').find('.checklist_header').attr('checklist-id');
        var checklistItemId = $(event.currentTarget).attr('data-id');
        var checklistSessionId = document.checklist_session;
        var isDone = $(event.currentTarget).parents('.checklist_item').hasClass('selected');
        var attrs = {
          'checklist_item_id': checklistItemId,
          'is_done': isDone,
          'checklist_id': checklistId,
          'checklist_slug': checklistSlug,
          'checklist_section_id': checklistSectionId,
          'checklist_session_id': checklistSessionId
        };
        var checklistItemActivity = new ChecklistItemActivity(attrs);
        checklistItemActivity.save();
      }

      var total_count = this.$('.checklist_item').length;
      var completion_rate = (total_checks_count / total_count * 100).toFixed(0);
      this.$('.checklist_result_block').addClass('result_active');
      this.$('.result_title').text(completion_rate + '%');
      this.$('.progress_bar .progress_status').css({
        'width': completion_rate + '%'
      });
      this.$('.progress_percent').text(completion_rate + '%');
    },
    nextChecklistSection: function (event) {
      var root = this;
      var checklist_section_id = $(event.currentTarget).attr('data-id');
      this.$('.checklist_section').hide();
      this.$('#section_' + checklist_section_id).show();
      this.$('.checklist_steps_menu .steps').removeClass('active');
      this.$('.checklist_steps_menu .steps[data-id="' + checklist_section_id + '"]').first().addClass('active');
      $('.checklist_item').each(function () {
        if ($(this).hasClass('open')) {
          $(this).children().children('.arrow').trigger('click');
        }
      });
    },
    showChecklistResults: function (event) {
      var checklist = {
        'title': $('.checklist_title').text().trim(),
        'checklist_sections': []
      };
      var totalItems = 0;
      var checkedItems = 0;
      $('.checklist_section').each(function () {
        var checklistSection = {
          'title': $(this).find('.steps_title .title').text(),
          'checklist_items': [],
          'has_suggestions': false
        };
        var sectionTotalItems = 0;
        var sectionCheckedItems = 0;
        $(this).children('.checklist_item').each(function () {
          totalItems += 1;
          sectionTotalItems += 1;
          var checklistItem = {
            'title': $(this).find('.head .title').text().trim(),
            'checked': $(this).hasClass('selected'),
            'suggestions': []
          };

          if (!checklistItem['checked']) {
            $(this).children('.info_block').find('.suggested_content_wrap').each(function () {
              var suggestion = {
                'name': $(this).find('.suggested_content_info .desc').text().trim(),
                'thumbnail': $(this).find('a.suggested_content .suggested_content_icon img').attr('src'),
                'link': $(this).find('a.suggested_content').attr('href')
              };
              checklistItem['suggestions'].push(suggestion);
              checklistSection['has_suggestions'] = !checklistItem['checked'];
            });
          } else {
            checkedItems += 1;
            sectionCheckedItems += 1;
          }

          checklistSection['checklist_items'].push(checklistItem);
        });
        checklistSection['section_total_items'] = sectionTotalItems;
        checklistSection['section_checked_items'] = sectionCheckedItems;
        checklistSection['completion_percent'] = (sectionCheckedItems / sectionTotalItems * 100).toFixed(0);
        checklist['checklist_sections'].push(checklistSection);
      });
      checklist["total_items"] = totalItems;
      checklist["checked_items"] = checkedItems;
      checklist["completion_rate"] = (checkedItems / totalItems * 100).toFixed(0);
      this.lastResults = checklist;
      this.$el.find('#block_container').addClass('result_active');
      this.$el.find('.result_rate , .result_title').addClass('hidden');
      this.$el.find('.overall_rate').removeClass('hidden');
      this.$('.result_block').html(ChecklistResultsTemplate({
        'checklists': checklist
      }));
    },
    showExportPopup: function (event) {
      var emailInput = this.$('input[name="email"]');
      var errorFlag = false;

      if (!emailInput.val()) {
        this.customErrorMessage('Provide a valid email', this.$(emailInput).parent(), this.$(emailInput));
        errorFlag = true;
      }

      if (errorFlag) return false;
      this.removeErrorMessages();
      var attrs = {};
      attrs['export'] = true;
      this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
      this.$('.popup-overlay').addClass('active');
      this.overlayCalc();
    },
    customErrorMessage: function (message, target, elem) {
      this.$('.edit-tool-tip').remove();
      var editToolTip = '<div class="edit-tool-tip">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.addClass('error');
    },
    removeErrorMessages: function () {
      this.$('.edit-tool-tip').remove();
      this.$('input, textarea').removeClass('error');
    },
    overlayCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    hidePopup: function () {
      this.$('.popup-overlay').removeClass('active');
      this.$('.popup-wrap').empty();
    },
    actionSuccess: function () {
      var root = this;
      setTimeout(function () {
        root.$('.form-sending').removeClass("slide-in is-submitted");
        root.$('.form-sent').addClass("slide-in");
        setTimeout(function () {
          root.$('.form-sent').removeClass("slide-in");
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
    },
    exportResults: function (event) {
      var root = this;
      this.actionInProgress();
      var userEmail = $('#user_email').val();
      var checkListResults = this.lastResults;
      var csrfToken = $('meta[name=csrf-token]').attr("content");
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/check-list-export');
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhr.setRequestHeader("X-CSRFToken", csrfToken);
      xhr.responseType = 'blob';
      xhr.send(JSON.stringify({
        email: userEmail,
        send_email: $('#email-export').is(':checked'),
        show_suggested: $('#suggested-content-export').is(':checked'),
        checklist_results: checkListResults
      }, null, '\t'));

      xhr.onload = function (e) {
        if (this.status == 200) {
          var a = document.createElement("a");
          a.style = "display: none";
          document.body.appendChild(a);
          a.href = window.URL.createObjectURL(this.response);
          a.download = checkListResults['title'] + '_checklist.pdf';
          a.click();
          root.actionSuccess();
          setTimeout(function () {
            root.$('.popup-overlay').removeClass('active');
            root.$('.popup-wrap').empty();
            window.URL.revokeObjectURL(a.href);
          }, 2000);
        } else {
          root.actionFailed();
          setTimeout(function () {
            root.$('.popup-overlay').removeClass('active');
            root.$('.popup-wrap').empty();
          }, 2000);
        }
      };
    },
    toggleChecklistText: function (event) {
      if (this.$(event.currentTarget).parents('.checklist_item').hasClass('open')) {
        this.$(event.currentTarget).parents('.checklist_item').removeClass("open");
        this.$(event.currentTarget).parents('.checklist_item').find('.info_block').slideUp('linear');
      } else {
        this.$(event.currentTarget).parents('.checklist_item').addClass("open");
        this.$(event.currentTarget).parents('.checklist_item').find('.info_block').slideDown('linear');
      }

      ;
    },
    triggerSearchGAEvent: function (event) {
      var linkElement = $(event.currentTarget);
      var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();

      if (linkElement.hasClass("walkthrough-entry")) {
        Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
      } else {
        Common.triggerGAevent('Section Search', searchBreadcrumb);
      }
    }
  });
  return ChecklistView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/checklist/views/home.js":
/*!******************************************************!*\
  !*** ./sharedemos/static/js/checklist/views/home.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/checklist */ "./sharedemos/static/js/checklist/models/checklist.js"), __webpack_require__(/*! ../collections/checklist_collection */ "./sharedemos/static/js/checklist/collections/checklist_collection.js"), __webpack_require__(/*! ../templates/checklist_home.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_home.handlebars"), __webpack_require__(/*! ../templates/checklist_block.handlebars */ "./sharedemos/static/js/checklist/templates/checklist_block.handlebars"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Checklist, ChecklistCollection, ChecklistHomeTemplate, ChecklistBlockTemplate) {
  'use strict';

  var HomeView = Backbone.View.extend({
    el: '#main_container',
    CHECKLIST_ICON: "/static/images/checklist-banner1.png",
    template: ChecklistHomeTemplate,
    events: {
      'click .filter': 'changeHomeViewType',
      'click .checklist_wrap .explore': 'exploreChecklist',
      'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent'
    },
    initialize: function () {
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
      this.is_edit = false;

      if (document.isEdit) {
        this.is_edit = true;
      }

      this.checklist = new ChecklistCollection();
      this.listenTo(this.checklist, 'sync', this.render);
      this.checklist.fetch({
        reset: true
      });
    },
    render: function () {
      this.loadChecklistHome(this.checklist.models.pop().attributes);
      $('.footer').children('.counts').each(function () {
        var text = $(this).html().split(' ');
        let noun_form = ' Check';
        if (parseInt(text[0]) != 1) noun_form += 's';
        $(this).html(text[0] + noun_form);
      });
      utils.setSEOData(document.app_name, window.location.href);
      Backbone.trigger("home_rendered", this);
    },
    changeHomeViewType: function (event) {
      $('.checklists').hide();
      $('.filter').removeClass('active');
      var viewTypeId = $(event.currentTarget).attr('id');
      $(event.currentTarget).addClass('active');
      $('.' + viewTypeId + '_list').show();
    },
    exploreChecklist: function (event) {
      var checklistId = this.$(event.currentTarget).attr('data-slug');

      if (checklistId) {
        Backbone.history.navigate('/' + checklistId, {
          trigger: true
        });
      }
    },
    loadChecklistHome: function (checklists) {
      var is_edit = this.is_edit;
      this.$el.find('#block_container').html(this.template({
        'is_edit': is_edit
      }));
      var root = this;

      _.each(checklists.featured_checklists, function (checklist) {
        if (checklist.items_count > 0 && checklist.is_featured || is_edit) {
          root.setIconSource(checklist);
          $('.checklist_list .featured_list').append(ChecklistBlockTemplate({
            "checklist": checklist,
            'is_edit': is_edit
          }));
        }
      });

      if (!is_edit) {
        _.each(checklists.trending_checklists, function (checklist) {
          if (checklist.items_count > 0) {
            root.setIconSource(checklist);
            $('.checklist_list .trending_list').append(ChecklistBlockTemplate({
              "checklist": checklist
            }));
          }
        });

        _.each(checklists.recent_checklists, function (checklist) {
          if (checklist.items_count > 0) {
            root.setIconSource(checklist);
            $('.checklist_list .recent_list').append(ChecklistBlockTemplate({
              "checklist": checklist
            }));
          }
        });

        _.each(checklists.featured_checklists, function (checklist) {
          if (checklist.items_count > 0) {
            root.setIconSource(checklist);
            $('.checklist_list .all_list').append(ChecklistBlockTemplate({
              "checklist": checklist
            }));
          }
        });

        this.$('.checklists').hide();
        this.$('.all_list').show();
      }
    },
    setIconSource: function (checklist) {
      if (!checklist.icon) checklist.icon = {
        url: `${document.cdn_url}${this.CHECKLIST_ICON}`
      };
    },
    triggerSearchGAEvent: function (event) {
      var linkElement = $(event.currentTarget);
      var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();

      if (linkElement.hasClass("walkthrough-entry")) {
        Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
      } else {
        Common.triggerGAevent('Section Search', searchBreadcrumb);
      }
    }
  });
  return HomeView;
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
//# sourceMappingURL=10.2faccb.js.map