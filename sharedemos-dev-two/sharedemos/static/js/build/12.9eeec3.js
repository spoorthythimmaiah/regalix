(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

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

/***/ "./sharedemos/static/js/helpers/handlebars/formatNumber.js":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/js/helpers/handlebars/formatNumber.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
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

/***/ "./sharedemos/static/js/reports/templates/geography.handlebars":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/geography.handlebars ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"no-report\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"No data available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":71},"end":{"line":2,"column":100}}}))
    + "</div>";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"reports_header col-xs-12\">\n            <div class=\"col-xs-10\"><span>country</span></div>\n            <div class=\"col-xs-2 text-right\"><span>visits</span></div>\n        </div>\n        <div class=\"reports_list\" id=\"referral_geography_reports\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"geography") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":16,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"load_more") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":12},"end":{"line":21,"column":23}}})) != null ? stack1 : "")
    + "        </div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"reports_data_row col-xs-12"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"load_more") : depths[1]),{"name":"unless","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":54},"end":{"line":12,"column":135}}})) != null ? stack1 : "")
    + "\">\n                  <div class=\"col-xs-10\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":13,"column":41},"end":{"line":13,"column":62}}}))
    + ". "
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n                  <div class=\"col-xs-2 text-right\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"count") : depth0),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":14,"column":51},"end":{"line":14,"column":78}}}))
    + "</div>\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),">",4,{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":78},"end":{"line":12,"column":124}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return " hidden ";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"geography") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",5,{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":12},"end":{"line":20,"column":24}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"load_more_referrals load_more_reports text-center col-xs-12\">load more</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4>Geography</h4>\n<div id=\"geography\">"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"geography") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":20},"end":{"line":2,"column":117}}})) != null ? stack1 : "")
    + "</div>\n<div class=\"reports_data_list\">\n    <div class='data_block'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"geography") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":23,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/referrals.handlebars":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/referrals.handlebars ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"total_referrals\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"total_referrals") : depth0), depth0))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"no-report\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"No data available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":35},"end":{"line":8,"column":64}}}))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"reports_header col-xs-12\">\n            <div class=\"col-xs-10\"><span>url name</span></div>\n            <div class=\"col-xs-2 text-right\"><span>visits</span></div>\n        </div>\n        <div class=\"reports_list\" id=\"referral_reports\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"referrals") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":25,"column":21}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"load_more") : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":30,"column":23}}})) != null ? stack1 : "")
    + "        </div>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"reports_data_row col-xs-12"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"load_more") : depths[1]),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":54},"end":{"line":21,"column":135}}})) != null ? stack1 : "")
    + "\">\n                  <div class=\"col-xs-10\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":22,"column":41},"end":{"line":22,"column":62}}}))
    + ". "
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n                  <div class=\"col-xs-2 text-right\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"count") : depth0),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":23,"column":51},"end":{"line":23,"column":73}}}))
    + "</div>\n                </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),">",4,{"name":"compare","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":78},"end":{"line":21,"column":124}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return " hidden ";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"referrals") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",5,{"name":"compare","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":12},"end":{"line":29,"column":24}}})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"load_more_referral_geo load_more_reports text-center col-xs-12\">load more</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<h4>Referrals</h4>\n<div class=\"referral_block\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"total_referrals") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":5,"column":11}}})) != null ? stack1 : "")
    + "    <div id=\"referral\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"referrals") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"unless","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":9,"column":19}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n<div class=\"reports_data_list\">\n    <div class='data_block'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"referrals") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":8},"end":{"line":32,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/site_traffic.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/site_traffic.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "dn";
},"3":function(container,depth0,helpers,partials,data) {
    return "up";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"lib_cards shadow\">\n    <div class=\"lib_cards_container\" id=\"site_visitors\">\n        <button data-trigger=\"hover\"\n            data-toggle=\"popover\"\n            data-placement=\"bottom\"\n            data-content=\"Site Visitors is the number of users that visited your content.\">\n            <span class=\"glyphicon glyphicon-question-sign\"></span>\n        </button>\n        <h6>Site Visitors</h6>\n        <div class=\"count\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"count") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":10,"column":27},"end":{"line":10,"column":55}}}))
    + "</div>\n        <div class=\"lib_cards_stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":36},"end":{"line":11,"column":83}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":83},"end":{"line":11,"column":131}}})) != null ? stack1 : "")
    + "\">\n            <span class=\""
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":25},"end":{"line":12,"column":72}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":72},"end":{"line":12,"column":120}}})) != null ? stack1 : "")
    + "\"></span>\n            <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":13,"column":18},"end":{"line":13,"column":49}}}))
    + "&#37 from last period</span>\n        </div>\n    </div>\n</div>\n<div class=\"lib_cards shadow\" id=\"demo_views\">\n    <div class=\"lib_cards_container\">\n        <button data-trigger=\"hover\"\n            data-toggle=\"popover\"\n            data-placement=\"bottom\"\n            data-content=\"Views is the number of users that viewed your chapters.\">\n            <span class=\"glyphicon glyphicon-question-sign\"></span>\n        </button>\n        <h6>Views</h6>\n        <div class=\"count\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"count") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":26,"column":27},"end":{"line":26,"column":55}}}))
    + "</div>\n        <div class=\"lib_cards_stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":36},"end":{"line":27,"column":83}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":83},"end":{"line":27,"column":131}}})) != null ? stack1 : "")
    + "\">\n            <span class=\""
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":25},"end":{"line":28,"column":72}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":72},"end":{"line":28,"column":120}}})) != null ? stack1 : "")
    + "\"></span>\n            <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"views") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":29,"column":18},"end":{"line":29,"column":49}}}))
    + "&#37 from last period</span>\n        </div>\n    </div>\n</div>\n<div class=\"lib_cards shadow\" id=\"completion_rate\">\n    <div class=\"lib_cards_container\">\n        <button data-trigger=\"hover\"\n            data-toggle=\"popover\"\n            data-placement=\"left\"\n            data-content=\"Completion Rate is calculated by dividing the number of users that visited your chapters with the number of users that completed a chapter from start to finish.\">\n            <span class=\"glyphicon glyphicon-question-sign\"></span>\n        </button>\n        <h6>Completion Rate</h6>\n        <div class=\"count\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"percentage") : stack1), depth0))
    + "&#37</div>\n        <div class=\"lib_cards_stats "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":36},"end":{"line":43,"column":89}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":89},"end":{"line":43,"column":143}}})) != null ? stack1 : "")
    + "\">\n            <span class=\""
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),"<",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":25},"end":{"line":44,"column":78}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),">=",0,{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":78},"end":{"line":44,"column":132}}})) != null ? stack1 : "")
    + "\"></span>\n            <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"completions") : depth0)) != null ? lookupProperty(stack1,"progress") : stack1),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":45,"column":18},"end":{"line":45,"column":55}}}))
    + "&#37 from last period</span>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/reports/templates/trending_chapters.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/reports/templates/trending_chapters.handlebars ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popular_chapters_header reports_header col-xs-12\">\n    <div class=\"chapters_title col-xs-7\">\n        <span>name</span>\n    </div>\n    <div class=\"chapters_clicks col-xs-2 text-center"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"sort_by") : depth0),"==","views",{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":52},"end":{"line":6,"column":105}}})) != null ? stack1 : "")
    + "\">\n        <span class=\"sort\">views</span>\n    </div>\n    <div class=\"chapters_comp_rate col-xs-3 text-center"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"sort_by") : depth0),"==","completion_rate",{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":55},"end":{"line":9,"column":118}}})) != null ? stack1 : "")
    + "\">\n        <span class=\"sort\">completion rate</span>\n    </div>\n</div>\n<div class=\"popular_chapters_list reports_list\" id=\"reports_trending_demos\" data-sort=\"descending\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"trending_chapters") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":23,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"load_more") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":4},"end":{"line":28,"column":15}}})) != null ? stack1 : "")
    + "</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"reports_data_row col-xs-12"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"load_more") : depths[1]),{"name":"unless","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":46},"end":{"line":15,"column":128}}})) != null ? stack1 : "")
    + "\">\n            <div class=\"chapters_title col-xs-7\">\n                <span>"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"walkthrough") : depth0), depth0))
    + "</span> \n                <div class=\"breadcrumb\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"breadcrumb") : depth0), depth0))
    + "</div>\n            </div>\n            <div class=\"chapters_clicks col-xs-2 text-center\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/formatNumber.js */ "./sharedemos/static/js/helpers/handlebars/formatNumber.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"views") : depth0),{"name":"formatNumber","hash":{},"data":data,"loc":{"start":{"line":20,"column":62},"end":{"line":20,"column":84}}}))
    + "</div> \n            <div class=\"chapters_comp_rate col-xs-3 text-center\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"completion_rate") : depth0), depth0))
    + "&#37</div>\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),">",4,{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":70},"end":{"line":15,"column":117}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "  hidden ";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"trending_chapters") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",5,{"name":"compare","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":27,"column":20}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"load_more_popular_chapters load_more_reports text-center col-xs-12\">load more</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "<div class=\"no-report\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"No data available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":23},"end":{"line":31,"column":52}}}))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"trending_chapters") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":32,"column":7}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

/***/ })

}]);
//# sourceMappingURL=12.9eeec3.js.map