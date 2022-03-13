(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-board-links.handlebars":
/*!********************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-board-links.handlebars ***!
  \********************************************************************************************/
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

  return "            <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"bulletin-link-url\" data-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link_type") : depth0), depth0))
    + "\"\n            data-linkid=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"bulletin-link-url\" data-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link_type") : depth0), depth0))
    + "\" \n            data-product=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_id") : depth0), depth0))
    + "\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_id") : depth0), depth0))
    + "\" \n            data-chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"chapter_id") : depth0), depth0))
    + "\" target=\"_blank\" data-groups=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\"\n            data-linkid=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">"
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"breadcrumb") : depth0), depth0)) != null ? stack1 : "")
    + "\n            </a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"edit-bulletin-link\" data-hidePopup=\"create-bulletin-popup\" data-showPopup=\"create-bulletin-link-popup\" data-type=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"link_type") : depth0), depth0))
    + "\" >"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":164},"end":{"line":17,"column":179}}}))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"bulletin-link-data\">\n    <div class=\"bulletin-link-details\">\n        <div class=\"bulletin-link-title\">"
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"link_type") : depth0),"==","external",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":7,"column":20}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"link_type") : depth0),"==","internal",{"name":"compare","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":14,"column":20}}})) != null ? stack1 : "")
    + "        <div class=\"bulletin-link-edit camel-case\">\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"link_type") : depth0),"==","external",{"name":"compare","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":18,"column":24}}})) != null ? stack1 : "")
    + "            <span class=\"remove-bulletin-link\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":47},"end":{"line":19,"column":64}}}))
    + "</span>\n        </div>\n    </div>\n    <div class=\"bulletin-board-link-drag no-action ui-sortable-handle\"></div>\n</li>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-browse-link.handlebars":
/*!********************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-browse-link.handlebars ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"bulletin-browse-link-popup hidden\">\n    <div class=\"popup-title camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":65}}}))
    + "</div>\n    <div class=\"popup-back-icon trigger-inplace-popup\" data-hidePopup=\"bulletin-browse-link-popup\" data-showPopup=\"create-bulletin-popup\"></div>\n    <div class=\"content-block\">\n        <ul id=\"bulltein-sitemap\" class=\"sitemap-tree\">\n            <img class=\"loading-icon\" src=\"/static/images/loading_icon.gif\" />\n        </ul>\n    </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"back rippleEffect trigger-inplace-popup\" data-hidePopup=\"bulletin-browse-link-popup\" data-showPopup=\"create-bulletin-popup\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"back",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":148},"end":{"line":11,"column":163}}}))
    + "</div>\n            <div class=\"save suggestions_selected\" data-hidePopup=\"bulletin-browse-link-popup\" data-showPopup=\"create-bulletin-popup\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":134},"end":{"line":12,"column":149}}}))
    + "</div>\n        </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-external-link.handlebars":
/*!**********************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-external-link.handlebars ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"create-bulletin-link-popup hidden\">\n    <div class=\"popup-title camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":62}}}))
    + "</div>\n    <div class=\"popup-back-icon trigger-inplace-popup\" data-hidePopup=\"create-bulletin-link-popup\" data-showPopup=\"create-bulletin-popup\"></div>\n    <div class=\"content-block\">\n        <div class=\"block\">\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"external link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":47},"end":{"line":6,"column":71}}}))
    + "</div>\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":35},"end":{"line":7,"column":70}}}))
    + ".</div>\n            <div class=\"input_wrap\">\n            <div class='error-msg' id=\"link-title-validation\"></div>\n                <input type=\"text\" class=\"bulletin-external-link-title trim-input\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Text to Display",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":115},"end":{"line":10,"column":141}}}))
    + "\"/>\n            </div>\n            <div class='error-msg' id=\"link-validation\"></div>\n            <div class=\"bulletin-link-wrap\">\n                <input type=\"url\" class=\"bulletin-external-link-url trim-input\" autocomplete=\"off\" placeholder=\"http://\"/>\n                <div class=\"add-external-link capital-letter bulletin-btn\" data-showPopup=\"create-bulletin-popup\" data-hidePopup=\"create-bulletin-link-popup\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":158},"end":{"line":15,"column":172}}}))
    + "</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"back rippleEffect trigger-inplace-popup\" data-hidePopup=\"create-bulletin-link-popup\" data-showPopup=\"create-bulletin-popup\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"back",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":148},"end":{"line":21,"column":163}}}))
    + "</div>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/create-bulletin.handlebars":
/*!***************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/create-bulletin.handlebars ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":27}}}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":33}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"block\">\n                <div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"allow access to",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":51},"end":{"line":27,"column":78}}}))
    + "</div>\n                <input type=\"text\" placeholder=\"Select user groups\" class=\"usr-grp-dropdown\" id=\"bboard-usr-grp-dropdown\" readonly=\"true\" data-toggle=\"collapse\" data-target=\"#bboard-usr-grps-list\" aria-expanded=\"false\" aria-controls=\"bboard-usr-grps-list\" value=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"restrictedToGroups") : depth0), depth0))
    + "\" data-selected-groups=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"restrictedToGroupIds") : depth0), depth0))
    + "\"/>\n                <div id=\"bboard-usr-grps-list\" class=\"collapse usr-grps-list\">\n                    <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"userGroupOptions") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":20},"end":{"line":37,"column":29}}})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n                <div>&nbsp;</div>\n            </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <li "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":28},"end":{"line":32,"column":87}}})) != null ? stack1 : "")
    + ">\n                            <input type=\"checkbox\" name=\"user-group\" value=\"\" id=\"bboard-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"user-group-items\" data-attr-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " data-attr-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isChecked") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":178},"end":{"line":33,"column":212}}})) != null ? stack1 : "")
    + "  "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":214},"end":{"line":33,"column":256}}})) != null ? stack1 : "")
    + " />\n                            <label for=\"bboard-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\"></label>\n                            <span> "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </span>\n                        </li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " class=\"selected-disabled\" ";
},"9":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"11":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-board-links.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-board-links.handlebars"),depth0,{"name":"bulletin-board-links","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "hide-external";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form name='bulletin-board-data' class=\"create-bulletin-popup\" id='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"bulletinBoard") : depth0)) != null ? lookupProperty(stack1,"_id") : stack1), depth0))
    + "'>\n    <div class=\"popup-title camel-case\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":37}}}))
    + "\n    </div>\n    <div class=\"content-block\">\n        <div class=\"block\">\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":47},"end":{"line":12,"column":62}}}))
    + "</div>\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"choose a title for this bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":35},"end":{"line":13,"column":84}}}))
    + ".</div>\n            <div class=\"input_wrap\">\n                <input type=\"text\" class=\"bulletin-board-title trim-input\" name=\"name\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"Name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":119},"end":{"line":15,"column":134}}}))
    + "\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"bulletinBoard") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n            </div>\n        </div>\n        <div class=\"block\">\n            <div class=\"title description\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":43},"end":{"line":19,"column":65}}}))
    + "</div>\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"write a short description that best describes the content in this bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":35},"end":{"line":20,"column":126}}}))
    + ".</div>\n            <div class=\"input_wrap\">\n                <textarea class=\"bulletin-board-desc trim-input\" name=\"description\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":116},"end":{"line":22,"column":138}}}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"bulletinBoard") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n            </div>									\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"showRestrictionOption") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":42,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":31},"end":{"line":44,"column":46}}}))
    + "</div>\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"choose link/s to display on bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":35},"end":{"line":45,"column":88}}}))
    + ".</div>\n            <ol class=\"bulletin-links-list\" id=\"link-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"bulletinBoard") : depth0)) != null ? lookupProperty(stack1,"links") : stack1),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":16},"end":{"line":50,"column":25}}})) != null ? stack1 : "")
    + "            </ol>\n            <div class=\"bulletin-link-wrap\">\n                <div class=\"bulletin-external-link-btn capital-letter trigger-inplace-popup bulletin-btn "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"isHidden") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":105},"end":{"line":53,"column":141}}})) != null ? stack1 : "")
    + "\"\n                data-hidePopup=\"create-bulletin-popup\" data-showPopup=\"create-bulletin-link-popup\">     "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"external link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":54,"column":104},"end":{"line":54,"column":128}}}))
    + "\n                </div>\n                <div class=\"bulletin-browse-link-btn capital-letter trigger-inplace-popup  bulletin-btn\" data-hidePopup=\"create-bulletin-popup\" data-showPopup=\"bulletin-browse-link-popup\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"browse link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":57,"column":20},"end":{"line":57,"column":42}}}))
    + "\n                </div>\n            </div>                                  \n        </div>\n        </div>\n    </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"cancel rippleEffect\" rel=\"create-bulletin-board\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":65,"column":73},"end":{"line":65,"column":90}}}))
    + "</div>\n            <input type=\"submit\" class=\"save rippleEffect capital-letter\" value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":66,"column":81},"end":{"line":66,"column":96}}}))
    + "\" />\n        </div>\n        <div class=\"form-failed\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":69,"column":12},"end":{"line":69,"column":42}}}))
    + "\n        </div>\n        <div class=\"form-sent\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":72,"column":12},"end":{"line":72,"column":42}}}))
    + "\n        </div>\n        <div class=\"form-sending\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":75,"column":12},"end":{"line":75,"column":29}}}))
    + "...\n            <div class=\"cd-loading\"></div>\n        </div>\n    </div>\n</form>\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-external-link.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-external-link.handlebars"),depth0,{"name":"bulletin-external-link","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/bulletin-browse-link.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-browse-link.handlebars"),depth0,{"name":"bulletin-browse-link","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/main.handlebars":
/*!*************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/site-map/main.handlebars ***!
  \*************************************************************************************/
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

  return "    <li class=\"sitemap-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":28},"end":{"line":2,"column":60}}})) != null ? stack1 : "")
    + "\" data-item=\"category\"\n    data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" data-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n        <div style=\"margin-left:10px\" class=\"parentblock\">\n            <span class=\"expandSection\"></span>\n            <span class=\"siteMapTitle\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>     \n            <input id=\"tree-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" slug-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" type=\"checkbox\" class=\"css-checkbox\">\n            <label for=\"tree-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"css-label\"></label>\n        </div>\n\n        <ul class=\"category\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":12,"column":12},"end":{"line":18,"column":21}}})) != null ? stack1 : "")
    + "        </ul>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars"),depth0,{"name":"render-sections","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":16},"end":{"line":17,"column":25}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars"),depth0,{"name":"render-playlists","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"siteMapData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":21,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars":
/*!*************************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=container.hooks.helperMissing, alias5="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":23},"end":{"line":9,"column":55}}})) != null ? stack1 : "")
    + "\" data-item=\"chapter\" \n            data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" \n            data-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"walkthrough_id") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n                <div style=\"margin-left:10px\" class=\"parentblock\">\n                    <span class=\"demoIcon\"></span>\n                    <span class=\"siteMapTitle\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":14,"column":47},"end":{"line":14,"column":55}}}) : helper)))
    + "</span>\n                <input id=\"tree-"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":15,"column":32},"end":{"line":15,"column":40}}}) : helper)))
    + "\" slug-id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":15,"column":51},"end":{"line":15,"column":59}}}) : helper)))
    + "\" type=\"checkbox\" class=\"css-checkbox\">\n                <label for=\"tree-"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":16,"column":33},"end":{"line":16,"column":41}}}) : helper)))
    + "\" class=\"css-label\"></label>\n                </div>\n                <ul class=\"demo\" id=\""
    + alias3(alias2((depths[2] != null ? lookupProperty(depths[2],"slug") : depths[2]), depth0))
    + "_"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":18,"column":52},"end":{"line":18,"column":60}}}) : helper)))
    + "\"></ul>\n            </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li data-item=\"playlist\" class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":64}}})) != null ? stack1 : "")
    + "\" data-slug=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"playlist_id") || (depth0 != null ? lookupProperty(depth0,"playlist_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playlist_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":77},"end":{"line":1,"column":92}}}) : helper)))
    + "\"\ndata-groups=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"groups") || (depth0 != null ? lookupProperty(depth0,"groups") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groups","hash":{},"data":data,"loc":{"start":{"line":2,"column":13},"end":{"line":2,"column":23}}}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":36},"end":{"line":2,"column":44}}}) : helper)))
    + "\">\n    <div style=\"margin-left:10px\" class=\"parentblock\">\n        <span class=\"playlistIcon\"></span>\n        <span class=\"siteMapTitle\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":35},"end":{"line":5,"column":43}}}) : helper)))
    + "</span>\n    </div>\n    <ul class=\"playlist\" id=\""
    + alias4(container.lambda((depths[1] != null ? lookupProperty(depths[1],"slug") : depths[1]), depth0))
    + "_"
    + alias4(((helper = (helper = lookupProperty(helpers,"playlist_id") || (depth0 != null ? lookupProperty(depth0,"playlist_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playlist_id","hash":{},"data":data,"loc":{"start":{"line":7,"column":41},"end":{"line":7,"column":56}}}) : helper)))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"demos") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":20,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars":
/*!************************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-sections.handlebars"),depth0,{"name":"render-sections","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":17,"column":21}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/render-playlists.handlebars"),depth0,{"name":"render-playlists","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class = \""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":47}}})) != null ? stack1 : "")
    + "\" data-item=\"section\" \ndata-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" \ndata-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n    <div style=\"margin-left:10px\" class=\"parentblock\">\n        <span class=\"expandSection\"></span>\n        <span class=\"siteMapTitle\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n        <input id=\"tree-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" slug-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" type=\"checkbox\" class=\"css-checkbox\">\n        <label for=\"tree-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"css-label\"></label>\n    </div>\n\n    <ul class=\"section\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":12,"column":8},"end":{"line":18,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"usePartial":true,"useData":true});

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

/***/ "./sharedemos/static/js/tenant/models/box.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/box.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Box = Backbone.Model.extend({
    urlRoot: "/api/box"
  });
  return Box;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/document_parser.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/document_parser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var DocumentParser = Backbone.Model.extend({
    urlRoot: '/api/document-parser'
  });
  return DocumentParser;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/journey_tree.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/journey_tree.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var JourneyTree = Backbone.Model.extend({
    urlRoot: "/api/journey-tree"
  });
  return JourneyTree;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/playlist.js":
/*!********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/playlist.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Playlist = Backbone.Model.extend({
    urlRoot: "/api/playlist"
  });
  return Playlist;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/repository_listener.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/repository_listener.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var repositoryListener = Backbone.Model.extend({
    urlRoot: "/api/repository-listener"
  });
  return repositoryListener;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/resource.js":
/*!********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/resource.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Resource = Backbone.Model.extend({
    urlRoot: "/api/resource"
  });
  return Resource;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/rte_resource.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/rte_resource.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var RteResource = Backbone.Model.extend({
    urlRoot: "/api/resource/rte-asset",
    idAttribute: 'path'
  });
  return RteResource;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/section_asset_resource.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/section_asset_resource.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var SectionAssetResource = Backbone.Model.extend({
    urlRoot: "/api/resource/section-asset-link"
  });
  return SectionAssetResource;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/slide.js":
/*!*****************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/slide.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Slide = Backbone.Model.extend({
    urlRoot: "/api/slide"
  });
  return Slide;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/tag.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/tag.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Tag = Backbone.Model.extend({
    urlRoot: "/api/tags/"
  });
  return Tag;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/content-editor.handlebars":
/*!******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/content-editor.handlebars ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Text editor -->\r\n<div class=\"text-editor-wrap\">\r\n    <div class=\"toolbar-wrap\" style=\"margin-bottom: 16px;\">\r\n    	<div class=\"select-layout\">\r\n			<div class=\"layout-selection\">\r\n				<ul>\r\n					<li data-layout=\"1\">\r\n						<img src=\"/static/images/author/layout1.png\">\r\n					</li>\r\n					<li data-layout=\"2\">\r\n						<img src=\"/static/images/author/layout2.png\">\r\n					</li>\r\n					<li data-layout=\"3\">\r\n						<img src=\"/static/images/author/layout3.png\">\r\n					</li>\r\n					<li data-layout=\"4\">\r\n						<img src=\"/static/images/author/layout4.png\">\r\n					</li>\r\n				</ul>\r\n			</div>\r\n		</div>\r\n        <div id=\"toolbar\" style=\"margin-bottom: 16px;\">\r\n        </div>\r\n        <div class=\"content-done\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"done",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":34},"end":{"line":24,"column":49}}}))
    + "</div>\r\n        <div class=\"content-saving\"></div>\r\n    </div>\r\n    <div class=\"content-editor-wrap content-slide-wrap "
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"document_styles") : depth0), depth0))
    + "\">\r\n    	Lorem ipsum\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/content-layout.handlebars":
/*!******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/content-layout.handlebars ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"col-sm-12 layout\">\r\n		<img src=\"/static/images/author/imagethumb.png\"  align=\"right\" width=\"50%\" style=\"margin-right:0px;\" />\r\n		<h1>Title</h1>\r\n		<p>Write Something</p>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"col-sm-12 layout\">\r\n		<img src=\"/static/images/author/imagethumb.png\"  align=\"left\" width=\"50%\" style=\"margin-right:0px;\" />\r\n		<h1>Title</h1>\r\n		<p>Write Something</p>\r\n	</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "	<div> \r\n		<div class=\"col-sm-6 \">\r\n			<h1>Title</h1>\r\n			<p>Write Something</p>\r\n		</div>\r\n		<div class=\"col-sm-6 \">\r\n			<img src=\"/static/images/author/imagethumb.png\"  />\r\n			<img src=\"/static/images/author/imagethumb.png\"  />\r\n		</div>\r\n	</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	<div> \r\n		<div class=\"col-sm-6 \">\r\n			<img src=\"/static/images/author/imagethumb.png\"  />\r\n			<img src=\"/static/images/author/imagethumb.png\"  />\r\n		</div>\r\n		<div class=\"col-sm-6 \">\r\n			<h1>Title</h1>\r\n			<p>Write Something</p>\r\n		</div>\r\n	</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"layout_one") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"layout_two") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":0},"end":{"line":15,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"layout_three") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":0},"end":{"line":28,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"layout_four") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":0},"end":{"line":41,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/cta/form.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/cta/form.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":27}}}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":29}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\"";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"fileName") : depth0), depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form class=\"create-cta-block\" name=\"create-cta\">\n    <div class=\"popup-title capital-letter\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"uniqueId") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "        &nbsp"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cta",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":13},"end":{"line":8,"column":27}}}))
    + "\n    </div>\n    <div class=\"content-block\">\n        <div class=\"block cta-link-block\">\n            <input type=\"radio\" id=\"cta_link\" name=\"cta_type\"  class=\"css-radio\" checked=\"checked\" cta-type=\"link\">\n            <label class=\"css-radio-label\" for=\"cta_link\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":58},"end":{"line":13,"column":73}}}))
    + "</label>\n            <br>\n            <div class=\"cta-block\">\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"provide a URL to redirect your users to ",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":39},"end":{"line":16,"column":90}}}))
    + "</div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" name=\"link_title\" class=\"cta_link\" placeholder=\"button text\" autocomplete=\"off\" "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":119},"end":{"line":18,"column":176}}})) != null ? stack1 : "")
    + " />\n                </div>\n                <div class=\"input_wrap\">\n                    <input type=\"url\" name=\"cta_link\" class=\"cta_link\" placeholder=\"http://\" autocomplete=\"off\" "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":112},"end":{"line":21,"column":169}}})) != null ? stack1 : "")
    + " />\n                </div>\n            </div>\n        </div>\n        <div class=\"block cta-pdf-block disabled\" >\n            <input type=\"radio\" id=\"cta_pdf\" name=\"cta_type\" class=\"css-radio\" cta-type=\"pdf\" />\n            <label class=\"css-radio-label\" for=\"cta_pdf\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":57},"end":{"line":27,"column":71}}}))
    + "</label>\n            <br>\n            <div class=\"cta-block\">\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a file to share with your visitors",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":39},"end":{"line":30,"column":91}}}))
    + "</div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" name=\"pdf_title\" class=\"cta_pdf\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"button text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":32,"column":85},"end":{"line":32,"column":107}}}))
    + "\"  autocomplete=\"off\" "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":129},"end":{"line":32,"column":185}}})) != null ? stack1 : "")
    + " / >\n                </div>\n                <input type=\"file\" class=\"drag-file\" id=\"upload-cta-file\" accept=\"application/pdf\" name=\"cta\">\n                <div class=\"file-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"fileName") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":39},"end":{"line":35,"column":74}}})) != null ? stack1 : "")
    + "</div>\n                <label id=\"remove-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":40},"end":{"line":36,"column":57}}}))
    + "</label>\n                <label for=\"upload-cta-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":66},"end":{"line":37,"column":88}}}))
    + "</label>                \n            </div>\n        </div>\n    </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"cancel-cta rippleEffect\" >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":50},"end":{"line":43,"column":67}}}))
    + "</div>\n            <div class=\"save-cta-btn rippleEffect\" data-unique-id=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"uniqueId") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":81},"end":{"line":44,"column":98}}}))
    + "</div>\n        </div>\n        <div class=\"form-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":33},"end":{"line":46,"column":63}}}))
    + "</div>\n        <div class=\"form-sent\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":47,"column":31},"end":{"line":47,"column":61}}}))
    + "</div>\n        <div class=\"form-sending\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":48,"column":34},"end":{"line":48,"column":51}}}))
    + "...<div class=\"cd-loading\"></div></div>\n    </div>\n</form>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/cta/list.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/cta/list.handlebars ***!
  \************************************************************************/
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

  return "    <div class=\"cta-button\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"ctaId") : depth0), depth0))
    + "\" data-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" data-text=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "\" data-href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-file-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"fileName") : depth0), depth0))
    + "\" data-unique-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uniqueId") : depth0), depth0))
    + "\">\n        <div class=\"cta-text\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":8,"column":20}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":11,"column":20}}})) != null ? stack1 : "")
    + "        <div class=\"cta-edit-delete-section\">   \n            <div class=\"cta-edit-button\">Edit</div>\n            <div class=\"cta-delete-button\">Remove</div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"cta-link-name\">\n                <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "</a>\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"cta-file-name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"fileName") : depth0), depth0))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/demo-form.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/demo-form.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":69},"end":{"line":2,"column":84}}}));
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":92},"end":{"line":2,"column":109}}}));
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " walkthrough-id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter") : depth0)) != null ? lookupProperty(stack1,"tags") : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":33,"column":33}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/tags.handlebars */ "./sharedemos/static/js/tenant/templates/edit/tags.handlebars"),depth0,{"name":"tags","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class='block'>\n                    <div class=\"title capitalize-text "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":54},"end":{"line":42,"column":99}}})) != null ? stack1 : "")
    + " hidden\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable restrictions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":108},"end":{"line":42,"column":138}}}))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":20},"end":{"line":47,"column":27}}})) != null ? stack1 : "")
    + "\n                    <input type=\"checkbox\" name=\"chapter_enable_restrictions\" id=\"chapter_enable_restrictions\" class=\"css-checkbox hidden\" data-toggle=\"collapse\" data-target=\"#chapter-usr-grps-to-restrict\" aria-expanded=\"false\" aria-controls=\"chapter-usr-grps-to-restrict\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":273},"end":{"line":49,"column":317}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":318},"end":{"line":49,"column":363}}})) != null ? stack1 : "")
    + "/>\n                    <label for=\"chapter_enable_restrictions\" class=\"css-label hidden\"></label>\n\n                    <div class=\"collapse "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":41},"end":{"line":52,"column":80}}})) != null ? stack1 : "")
    + "\" id=\"chapter-usr-grps-to-restrict\">\n                        <div>\n                            <div class=\"user-groups\">\n\n                                <div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"allow access to",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":67},"end":{"line":56,"column":94}}}))
    + "</div>\n                                <input type=\"text\" placeholder=\"Select user groups\" class=\"usr-grp-dropdown\" id=\"chapter-usr-grp-dropdown\" readonly=\"true\" data-toggle=\"collapse\" data-target=\"#chapter-usr-grps-list\" aria-expanded=\"false\" aria-controls=\"chapter-usr-grps-list\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":275},"end":{"line":57,"column":390}}})) != null ? stack1 : "")
    + " />\n\n                                <div id=\"chapter-usr-grps-list\" class=\"collapse usr-grps-list\">\n                                    <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"userGroupOptions") : depth0),{"name":"each","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":36},"end":{"line":67,"column":45}}})) != null ? stack1 : "")
    + "                                    </ul>\n                                </div>\n                                <div>&nbsp;</div>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"15":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"sub-title disabled\">\n                            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"restrictions already set in a parent content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":28},"end":{"line":45,"column":84}}}))
    + "\n                        </div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"19":function(container,depth0,helpers,partials,data) {
    return " in ";
},"21":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroups") : depth0), depth0))
    + "\" data-selected-groups=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroupIds") : depth0), depth0))
    + "\" ";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <li "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":44},"end":{"line":62,"column":103}}})) != null ? stack1 : "")
    + " >\n                                            <input type=\"checkbox\" name=\"user-group\" value=\"\" id=\"chapter-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"user-group-items\" data-attr-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " data-attr-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isChecked") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":195},"end":{"line":63,"column":229}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":230},"end":{"line":63,"column":272}}})) != null ? stack1 : "")
    + " />\n                                            <label for=\"chapter-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\"></label>\n                                            <span> "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </span>\n                                        </li>\n";
},"24":function(container,depth0,helpers,partials,data) {
    return " class=\"selected-disabled\" ";
},"26":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-datetime="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0), depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box popup-create-chapter\">\n    <div class=\"popup-title\"><span id=\"chapter-head\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":53},"end":{"line":2,"column":116}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":117},"end":{"line":2,"column":135}}}))
    + "</span></div>\n    <form name='walkthrough-data' playlist-id="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"playlist_id") : depth0), depth0))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":61},"end":{"line":3,"column":122}}})) != null ? stack1 : "")
    + ">\n        <div class=\"content-block\">\n            <div class=\"block\">\n                <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"chapter name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":51},"end":{"line":6,"column":74}}}))
    + "</div>\n                <div class=\"sub-title\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"pick a name that your users will easily understand",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":81}}}))
    + ".\n                </div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" name=\"name\" class=\"edit-pwt-title trim-input\" maxlength=\"85\" autocomplete=\"off\" placeholder=\"Name\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"chapter") : depth0)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":138},"end":{"line":11,"column":189}}})) != null ? stack1 : "")
    + "/>\n                    <div class=\"counter\">\n                        <span data-counter>"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"name_limit") : depth0), depth0))
    + "</span><span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":71},"end":{"line":13,"column":97}}}))
    + "</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"block\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"tags",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":35},"end":{"line":18,"column":50}}}))
    + "</div>\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tags that best describe this chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":39},"end":{"line":19,"column":90}}}))
    + ".</div>\n                <div class=\"add_tags\">\n                    <input type=\"text\" class=\"add_tag trim-input\" placeholder=\"tag\" autocomplete=\"off\" />\n                    <div class=\"save_tag rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tag",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":55},"end":{"line":22,"column":73}}}))
    + "</div>\n                    <div class=\"suggestion_tags\">\n                        <ul></ul>\n                    </div>\n                </div><br>\n                <div class=\"input_wrap\">\n                    <div class=\"category_tags\">\n                        <ul>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"chapter") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":34,"column":31}}})) != null ? stack1 : "")
    + "                        </ul>\n                    </div>\n                </div>\n            </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showRestrictionOption") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":12},"end":{"line":76,"column":19}}})) != null ? stack1 : "")
    + "\n            <div class=\"block\">\n                <div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"end of life",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":79,"column":51},"end":{"line":79,"column":73}}}))
    + "</div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" placeholder=\"Click to select date-time\" class=\"datepicker-here\" id=\"chapter_expire_at\" readonly=\"true\" data-position=\"top right\" data-timepicker=\"true\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":191},"end":{"line":81,"column":246}}})) != null ? stack1 : "")
    + " />\n                    <div>&nbsp;</div>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"popup-footer\">\n            <div class=\"form-footer\">\n                <div class=\"cancel rippleEffect\" rel=\"popup-create-chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":76},"end":{"line":90,"column":93}}}))
    + "</div>\n                <input type=\"submit\" class=\"save rippleEffect capital-letter\" value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":91,"column":85},"end":{"line":91,"column":100}}}))
    + "\" />\n            </div>\n            <div class=\"form-failed\">\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":94,"column":16},"end":{"line":94,"column":46}}}))
    + "\n            </div>\n            <div class=\"form-sent\">\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":97,"column":16},"end":{"line":97,"column":46}}}))
    + "\n            </div>\n            <div class=\"form-sending\">\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":100,"column":16},"end":{"line":100,"column":33}}}))
    + "...\n                <div class=\"cd-loading\"></div>\n            </div>\n        </div>\n    </form>\n</div>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/document-parser-form.handlebars":
/*!************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/document-parser-form.handlebars ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<!-- document upload -->\r\n<div class=\"document-parser-container\">\r\n    <p class=\"capital-letter popup-container-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":52},"end":{"line":3,"column":74}}}))
    + "</p>\r\n    <p class=\"popup-container-desc\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Upload dita-zip/docx file to create your content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":36},"end":{"line":4,"column":96}}}))
    + "</p>\r\n    <div class=\"document-parser-file-block\">\r\n        <div class=\"document-parser-drop-zone dita\" data-type=\"dita\">\r\n            <div class=\"parser-upload-btn\">\r\n                <input type=\"file\" id=\"doc-parser-dita\" class=\"visually-hidden document-upload\" data-type=\"dita\" accept=\".zip\" />\r\n                <label for=\"doc-parser-dita\" class=\"capital-letter\" data-type=\"dita\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"dita as a zip file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":85},"end":{"line":9,"column":114}}}))
    + "</label>\r\n                <p class=\"drag-drop-txt capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or drag & drop",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":56},"end":{"line":10,"column":81}}}))
    + "</p>\r\n            </div>\r\n        </div>\r\n        <div class=\"document-parser-drop-zone docx\" data-type=\"docx\">\r\n            <div class=\"parser-upload-btn\">\r\n                <input type=\"file\" id=\"doc-parser-fileElem\" class=\"visually-hidden document-upload\" data-type=\"docx\" accept=\".docx, application/vnd.openxmlformats-officedocument.wordprocessingml.document\" />\r\n                <label for=\"doc-parser-fileElem\" class=\"capital-letter\" data-type=\"docx\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"docx file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":89},"end":{"line":16,"column":109}}}))
    + "</label>\r\n                <p class=\"drag-drop-txt capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or drag & drop",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":56},"end":{"line":17,"column":81}}}))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <p class=\"import-filetype-msg\">Supported file types: .docx, .zip</p>\r\n</div>\r\n<!-- uploaded document parsing status -->\r\n<div class=\"parser-document-status hidden\">\r\n    <p class=\"capital-letter status-inprogress\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"still loading thank you for your patience...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":48},"end":{"line":25,"column":103}}}))
    + "</p>\r\n    <p class=\"capital-letter status-done hidden\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"congrats! your chapter(s) are ready to go...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":49},"end":{"line":26,"column":104}}}))
    + "</p>\r\n    <ul>\r\n        <li class=\"parser-uploading-doc row\">\r\n            <div class=\"col-xs-12 col-md-3 status-text\">Uploading Document</div>\r\n            <div class=\"status col-xs-12 col-md-7\"><span></span></div>\r\n        </li>\r\n        <li class=\"parser-parsing-data row\">\r\n            <div class=\"col-xs-12 col-md-3 status-text\">Parsing Data</div>\r\n            <div class=\"status col-xs-12 col-md-7\"><span></span></div>\r\n        </li>\r\n        <li class=\"parser-genrating-chapter row\">\r\n            <div class=\"col-xs-12 col-md-3 status-text\">Generating Chapters</div>\r\n            <div class=\"status col-xs-12 col-md-7\"><span></span></div>\r\n        </li>\r\n    </ul>\r\n</div>\r\n<div class=\"parser-document-status-error hidden\">\r\n    <p class=\"capital-letter status-error\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! something was wrong at this time..",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":43},"end":{"line":43,"column":94}}}))
    + "</p>\r\n    <div class=\"description\"></div>\r\n</div>\r\n<div class=\"parser-document-status-warning hidden\">\r\n    <p class=\"capital-letter status-warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure cancel the uploading?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":47,"column":45},"end":{"line":47,"column":90}}}))
    + "</p>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/editpopup.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/editpopup.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"repository-category\">\r\n                            <div class=\"integration-icon\"></div>\r\n                            <div class=\"layout_label capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"integration",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":69},"end":{"line":122,"column":92}}}))
    + "</div>\r\n                        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n<div class=\"edit-overlay\">\r\n    <div class=\"popup-wrap\">\r\n        <!-- Box or category option -->\r\n        <div class=\"popup-box box-category-option\">\r\n            <div class=\"capital-letter popup-title \">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create a category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":44}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <div class=\"select-box-option\">\r\n                    <div class=\"box-icon\"></div>\r\n                    <div class=\"bc-option-label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"box import",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":64},"end":{"line":12,"column":85}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"select-cat-option\">\r\n                    <div class=\"category-icon\"><span class=\"add-cat-icon\"></span></div>\r\n                    <div class=\"bc-option-label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":64},"end":{"line":16,"column":85}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"box-category-option\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":66},"end":{"line":21,"column":83}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- End Box or category option -->\r\n        <!-- Layout option -->\r\n        <div class=\"popup-box layout_selection_block\">\r\n            <div id=\"select_view_layout\">\r\n                <h3 class=\"capital-letter popup-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a layout",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":55},"end":{"line":29,"column":81}}}))
    + "</h3>\r\n                <div class=\"layouts\">\r\n                    <div class=\"category_layout_block\">\r\n                        <div class=\"category_layout\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":33,"column":65},"end":{"line":33,"column":84}}}))
    + "</div>\r\n                    </div>\r\n                    <div class=\"playlist_layout_block\">\r\n                        <div class=\"playlist_layout\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":65},"end":{"line":37,"column":84}}}))
    + "</div>\r\n                    </div>\r\n                    <div class=\"import_doc_block\" data-open=\"upload-docx-documents-block\" data-close=\"layout_selection_block\">\r\n                        <div class=\"import_doc_icon\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"import document",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":65},"end":{"line":41,"column":91}}}))
    + "</div>\r\n                    </div>\r\n                    <div class=\"import_box_block enabled\">\r\n                        <div class=\"import_box_layout\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"box import",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":65},"end":{"line":45,"column":86}}}))
    + "</div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"popup-footer\">\r\n                    <div class=\"form-footer\">\r\n                        <div class=\"cancel\" rel=\"layout_selection_block\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":73},"end":{"line":50,"column":90}}}))
    + "</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- End Layout option -->\r\n\r\n        <!-- Import Doc -->\r\n        <div class=\"popup-box upload-docx-documents-block\">\r\n            <div class=\"popup-title capital-letter\">\r\n                <div class=\"show-layout-popup popup-back-icon\" data-close=\"upload-docx-documents-block\" data-open=\"layout_selection_block\"></div>\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload document",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":61,"column":16},"end":{"line":61,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"import-popup-main-container\">\r\n                <!-- will append DOM from upload-content-document.handlebars  -->\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect capital-letter\" rel=\"upload-docx-documents-block\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":68,"column":102},"end":{"line":68,"column":119}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- End of Import Doc -->\r\n        \r\n        <!-- Box Content -->\r\n        <div class=\"popup-box box-content-block\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select box content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":16},"end":{"line":77,"column":45}}}))
    + "\r\n            </div>\r\n            <form name='box_content_form'>\r\n                <ul id=\"box-content-list\"></ul>\r\n                <div class=\"popup-footer\">\r\n                    <div class=\"form-footer\">\r\n                        <div class=\"cancel\" rel=\"box-content-block\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":83,"column":68},"end":{"line":83,"column":85}}}))
    + "</div>\r\n                        <input type='submit' class=\"import-box-data\" disabled value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"IMPORT",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":84,"column":85},"end":{"line":84,"column":102}}}))
    + "\"/>\r\n                    </div>\r\n                    <div class=\"form-failed capital-letter\">\r\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! import failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":87,"column":24},"end":{"line":87,"column":54}}}))
    + "\r\n                    </div>\r\n                    <div class=\"form-sent capital-letter\">\r\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! content imported successfully",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":24},"end":{"line":90,"column":73}}}))
    + "   \r\n                    </div>\r\n                    <div class=\"form-sending capital-letter\">\r\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"importing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":93,"column":24},"end":{"line":93,"column":44}}}))
    + "...\r\n                        <div class=\"cd-loading\"></div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <!-- End Box Content -->\r\n        <!-- Create New Bulletin board -->\r\n        <div class=\"popup-box create-bulletin-board\"></div>\r\n        <!-- End Create New Bulletin board -->\r\n        <!-- Category type popup -->\r\n        <div class=\"popup-box choose-category-type\">\r\n            <div class=\"popup-title capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose category type",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":106,"column":20},"end":{"line":106,"column":51}}}))
    + "\r\n            </div>\r\n            <div class=\"block\">\r\n                <p class=\"capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"type",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":109,"column":42},"end":{"line":109,"column":57}}}))
    + "</p>\r\n                <div class=\"layouts\">\r\n                    <div class=\"category-options category-default\">\r\n                        <div class=\"category-default-icon\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":113,"column":65},"end":{"line":113,"column":85}}}))
    + "</div>\r\n                    </div>\r\n                    <div class=\"category-options category-link-asset\">\r\n                        <div class=\"category-link-asset-icon\"></div>\r\n                        <div class=\"layout_label capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link asset",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":117,"column":65},"end":{"line":117,"column":87}}}))
    + "</div>\r\n                    </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"repository_manager") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":119,"column":20},"end":{"line":124,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect capital-letter\" rel=\"choose-category-type\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":129,"column":95},"end":{"line":129,"column":112}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- End of category type popup -->\r\n\r\n        <!-- Link category popup -->\r\n        <div class=\"popup-box create-edit-link-category\">\r\n            <div id=\"create-edit-link-category\"></div>\r\n        </div>\r\n        <!-- End of link category popup  -->\r\n\r\n        <!-- Choose Integration popup -->\r\n        <div class=\"popup-box repository-connector-list\"></div>\r\n        <!-- End of choose integration popup  -->\r\n\r\n        <!-- Enable and Disable section popup -->\r\n        <div class=\"popup-box popup-disable\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":148,"column":16},"end":{"line":148,"column":43}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this section will not be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":151,"column":37},"end":{"line":151,"column":96}}}))
    + ".</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to disable this section from view?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":152,"column":37},"end":{"line":152,"column":104}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-disable\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":73},"end":{"line":156,"column":90}}}))
    + "</div>\r\n                    <div class=\"disable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":157,"column":54},"end":{"line":157,"column":72}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":160,"column":20},"end":{"line":160,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":163,"column":20},"end":{"line":163,"column":53}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":166,"column":20},"end":{"line":166,"column":40}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box popup-enable\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":173,"column":16},"end":{"line":173,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this section will be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":176,"column":37},"end":{"line":176,"column":92}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to enable this section from view?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":177,"column":37},"end":{"line":177,"column":103}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-enable\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":181,"column":72},"end":{"line":181,"column":89}}}))
    + "</div>\r\n                    <div class=\"enable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":182,"column":53},"end":{"line":182,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":185,"column":20},"end":{"line":185,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":188,"column":20},"end":{"line":188,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":191,"column":20},"end":{"line":191,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Enable and Disable section popup -->\r\n\r\n        <!-- Delete section popup -->\r\n        <div class=\"popup-box popup-delete\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":201,"column":16},"end":{"line":201,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class= \"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":204,"column":38},"end":{"line":204,"column":77}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this entire section?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":205,"column":37},"end":{"line":205,"column":100}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-delete\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":209,"column":72},"end":{"line":209,"column":89}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":210,"column":53},"end":{"line":210,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":213,"column":20},"end":{"line":213,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":216,"column":20},"end":{"line":216,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":219,"column":20},"end":{"line":219,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Delete section popup -->\r\n\r\n        <!-- section edit popup -->\r\n        <div class=\"popup-box popup-edit\">\r\n            <div id=\"create-edit-section\"></div>\r\n        </div>\r\n        <!-- End Of section edit popup -->\r\n        <!-- Enable and Disable Chapter popup -->\r\n        <div class=\"popup-box popup-disable-chapter\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":234,"column":16},"end":{"line":234,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this chapter will not be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":237,"column":37},"end":{"line":237,"column":96}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to disable this chapter from view?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":238,"column":37},"end":{"line":238,"column":104}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-disable-chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":242,"column":81},"end":{"line":242,"column":98}}}))
    + "</div>\r\n                    <div class=\"disable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":243,"column":54},"end":{"line":243,"column":72}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":246,"column":20},"end":{"line":246,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":249,"column":20},"end":{"line":249,"column":53}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":252,"column":20},"end":{"line":252,"column":40}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box popup-enable-chapter\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":259,"column":16},"end":{"line":259,"column":41}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this chapter will be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":262,"column":37},"end":{"line":262,"column":92}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to enable this chapter from view?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":263,"column":37},"end":{"line":263,"column":103}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-enable-chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":267,"column":80},"end":{"line":267,"column":97}}}))
    + "</div>\r\n                    <div class=\"enable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":268,"column":53},"end":{"line":268,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":271,"column":20},"end":{"line":271,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":274,"column":20},"end":{"line":274,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":277,"column":20},"end":{"line":277,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Enable and Disable chapter popup -->\r\n\r\n        <!-- Create chapter popup -->\r\n        <div id=\"create-edit-demo\"></div>\r\n        <!--End of Enable and Disable popup -->\r\n        <!-- Delete chapter popup -->\r\n        <div class=\"popup-box popup-delete-chapter\">\r\n            <div class=\"popup-title capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":290,"column":20},"end":{"line":290,"column":45}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":293,"column":37},"end":{"line":293,"column":76}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this entire chapter?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":294,"column":37},"end":{"line":294,"column":100}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-delete-chapter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":298,"column":80},"end":{"line":298,"column":97}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":299,"column":53},"end":{"line":299,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":302,"column":20},"end":{"line":302,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":305,"column":20},"end":{"line":305,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":308,"column":20},"end":{"line":308,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Delete Chapter popup -->\r\n        <!-- Delete multiple chapter popup -->\r\n        <div class=\"popup-box popup-delete-multiple-chapters\">\r\n            <div class=\"popup-title capital-letter\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":317,"column":12},"end":{"line":317,"column":37}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n            <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure want to delete all selected chapters?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":320,"column":33},"end":{"line":320,"column":94}}}))
    + "</p><br>\r\n            <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"if you delete chapters, you will permanently lose your content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":321,"column":33},"end":{"line":321,"column":107}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n            <div class=\"form-footer\">\r\n                <div class=\"cancel rippleEffect\" rel=\"popup-delete-multiple-chapters\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":325,"column":86},"end":{"line":325,"column":103}}}))
    + "</div>\r\n                <div class=\"confirm-delete-multiple-chapters to-do-action rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":326,"column":88},"end":{"line":326,"column":105}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":329,"column":16},"end":{"line":329,"column":61}}}))
    + "\r\n            </div>\r\n            <div class=\"form-sent\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":332,"column":16},"end":{"line":332,"column":48}}}))
    + "\r\n            </div>\r\n            <div class=\"form-sending\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":335,"column":16},"end":{"line":335,"column":35}}}))
    + "...\r\n                <div class=\"cd-loading\"></div>\r\n            </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box popup-delete-multiple-playlists\">\r\n            <div class=\"popup-title capital-letter\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":342,"column":12},"end":{"line":342,"column":38}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n            <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure want to delete all selected playlists?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":345,"column":33},"end":{"line":345,"column":95}}}))
    + "</p><br>\r\n            <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"if you delete playlists, you will permanently lose your content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":346,"column":33},"end":{"line":346,"column":108}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n            <div class=\"form-footer\">\r\n                <div class=\"cancel rippleEffect\" rel=\"popup-delete-multiple-playlists\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":350,"column":87},"end":{"line":350,"column":104}}}))
    + "</div>\r\n                <div class=\"confirm-delete-multiple-playlists to-do-action rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":351,"column":89},"end":{"line":351,"column":106}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":354,"column":16},"end":{"line":354,"column":61}}}))
    + "\r\n            </div>\r\n            <div class=\"form-sent\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":357,"column":16},"end":{"line":357,"column":48}}}))
    + "\r\n            </div>\r\n            <div class=\"form-sending\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":360,"column":16},"end":{"line":360,"column":35}}}))
    + "...\r\n                <div class=\"cd-loading\"></div>\r\n            </div>\r\n            </div>\r\n        </div>\r\n        <!-- Confirm publish -->\r\n        <div class=\"popup-box confirm-publish-demo\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":368,"column":16},"end":{"line":368,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":371,"column":37},"end":{"line":371,"column":76}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":372,"column":37},"end":{"line":372,"column":93}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"confirm-publish-demo\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":376,"column":67},"end":{"line":376,"column":84}}}))
    + "</div>\r\n                    <div class=\"confirm-publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":377,"column":49},"end":{"line":377,"column":67}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":380,"column":20},"end":{"line":380,"column":60}}}))
    + ".\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":383,"column":20},"end":{"line":383,"column":81}}}))
    + ".\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":386,"column":20},"end":{"line":386,"column":41}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End Confirm publish -->\r\n\r\n        <!-- slide hotspot popup -->\r\n        <div class=\"popup-box popup-save-hotspot\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"highlight link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":396,"column":16},"end":{"line":396,"column":41}}}))
    + "\r\n            </div>\r\n            <div class=\"content-block\" id=\"create-edit-popup\"></div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-save-hotspot\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":401,"column":78},"end":{"line":401,"column":95}}}))
    + "</div>\r\n                    <div class=\"save rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":402,"column":51},"end":{"line":402,"column":66}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":405,"column":20},"end":{"line":405,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":408,"column":20},"end":{"line":408,"column":50}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"sending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":411,"column":20},"end":{"line":411,"column":38}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of silde hotspot popup -->\r\n        <!-- Update delete popup -->\r\n        <div class=\"popup-box popup-delete-media\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete media",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":420,"column":16},"end":{"line":420,"column":39}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":423,"column":16},"end":{"line":423,"column":55}}}))
    + "<br />\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this media?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":424,"column":16},"end":{"line":424,"column":70}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"popup-delete-media\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":428,"column":78},"end":{"line":428,"column":95}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":429,"column":53},"end":{"line":429,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":432,"column":20},"end":{"line":432,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":435,"column":20},"end":{"line":435,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":438,"column":20},"end":{"line":438,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Update silde hotspot popup -->\r\n        <!-- Update delete popup -->\r\n        <div class=\"popup-box custom-message\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"your request failed!!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":447,"column":16},"end":{"line":447,"column":48}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info message-content\"></div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"continue rippleEffect\" rel=\"custom-message\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"ok",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":452,"column":76},"end":{"line":452,"column":89}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Update silde hotspot popup -->\r\n\r\n        <!-- Playlist popup -->\r\n        <div class=\"popup-box popup-create-playlist\" id=\"create-edit-playlist\"></div>\r\n        <!-- Playlist popup end -->\r\n\r\n\r\n        <!-- ENABLE, DISABLE, DELETE Playlist -->\r\n        <div class=\"popup-box enable-playlist\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":466,"column":16},"end":{"line":466,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this playlist and underlying demos will be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":469,"column":37},"end":{"line":469,"column":114}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to enable this playlist?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":470,"column":37},"end":{"line":470,"column":94}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"enable-playlist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":474,"column":75},"end":{"line":474,"column":92}}}))
    + "</div>\r\n                    <div class=\"enable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":475,"column":53},"end":{"line":475,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":478,"column":20},"end":{"line":478,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":481,"column":20},"end":{"line":481,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":484,"column":20},"end":{"line":484,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box disable-playlist\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":491,"column":16},"end":{"line":491,"column":43}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this playlist and underlying demos will not be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":494,"column":37},"end":{"line":494,"column":118}}}))
    + ".</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to disable this playlist?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":495,"column":37},"end":{"line":495,"column":95}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"disable-playlist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":499,"column":76},"end":{"line":499,"column":93}}}))
    + "</div>\r\n                    <div class=\"disable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":500,"column":54},"end":{"line":500,"column":72}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":503,"column":20},"end":{"line":503,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":506,"column":20},"end":{"line":506,"column":53}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":509,"column":20},"end":{"line":509,"column":40}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box delete-playlist\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":516,"column":16},"end":{"line":516,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":519,"column":37},"end":{"line":519,"column":76}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this entire playlist?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":520,"column":37},"end":{"line":520,"column":101}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"delete-playlist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":524,"column":75},"end":{"line":524,"column":92}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":525,"column":53},"end":{"line":525,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":528,"column":20},"end":{"line":528,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":531,"column":20},"end":{"line":531,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":534,"column":20},"end":{"line":534,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Playlist popup ends -->\r\n\r\n        <!-- Slide settings popup -->\r\n        <div class=\"popup-box popup-slide-settings\"></div>\r\n\r\n        <!-- pdf warning popup -->\r\n        <div class=\"popup-box pdf-warning\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"warning",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":547,"column":16},"end":{"line":547,"column":34}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                \r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"pdf-warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"ok",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":554,"column":58},"end":{"line":554,"column":71}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- non-default language create warning popup -->\r\n        <div class=\"popup-box create-warning\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"warning",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":562,"column":16},"end":{"line":562,"column":34}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                \r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"create-warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"OK",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":569,"column":61},"end":{"line":569,"column":74}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- text editor done notification -->\r\n        <div class=\"popup-box text-editor-warning\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"changes not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":577,"column":16},"end":{"line":577,"column":44}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"it looks like your changes have not been saved.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":580,"column":16},"end":{"line":580,"column":74}}}))
    + "<br>\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you want to try to save your changes again?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":581,"column":16},"end":{"line":581,"column":73}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"textedit-exit rippleEffect\" >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"exit anyway",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":585,"column":61},"end":{"line":585,"column":83}}}))
    + "</div>\r\n                    <div class=\"try-again rippleEffect\" >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"try again",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":586,"column":57},"end":{"line":586,"column":77}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <!-- 360 frames delete worning popup -->\r\n        <div class=\"popup-box frame-360-delete-warning\">\r\n            <div class=\"frame-delete-warning image-warning\">\r\n                <div class=\"popup-title capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":595,"column":20},"end":{"line":595,"column":43}}}))
    + "\r\n                </div>\r\n                <div class=\"popup-info sub-title\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this image ?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":598,"column":20},"end":{"line":598,"column":75}}}))
    + "\r\n                </div>\r\n            </div>\r\n            <div class=\"frame-delete-warning 360-warning\">\r\n                <div class=\"popup-title capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete frame",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":603,"column":20},"end":{"line":603,"column":43}}}))
    + "\r\n                </div>\r\n                <div class=\"popup-info\">\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this frame is part of your 360",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":606,"column":43},"end":{"line":606,"column":84}}}))
    + "<sup> o </sup><span id=\"case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"view",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":606,"column":114},"end":{"line":606,"column":129}}}))
    + "</span>.</div>\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this frame ?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":607,"column":43},"end":{"line":607,"column":98}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"frame-360-delete-warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":612,"column":84},"end":{"line":612,"column":101}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":613,"column":53},"end":{"line":613,"column":70}}}))
    + "</div>\r\n                </div>            \r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box delete-bulletin-board\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":619,"column":16},"end":{"line":619,"column":48}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":622,"column":37},"end":{"line":622,"column":76}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this entire bulletin board?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":623,"column":37},"end":{"line":623,"column":107}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"delete-bulletin-board\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":627,"column":81},"end":{"line":627,"column":98}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":628,"column":53},"end":{"line":628,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":631,"column":20},"end":{"line":631,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":634,"column":20},"end":{"line":634,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":637,"column":20},"end":{"line":637,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box enable-bboard\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":644,"column":16},"end":{"line":644,"column":48}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this bulletin board will be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":647,"column":37},"end":{"line":647,"column":99}}}))
    + ".</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to enable this bulletin board?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":648,"column":37},"end":{"line":648,"column":100}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"enable-bboard\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":652,"column":73},"end":{"line":652,"column":90}}}))
    + "</div>\r\n                    <div class=\"enable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":653,"column":53},"end":{"line":653,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":656,"column":20},"end":{"line":656,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":659,"column":20},"end":{"line":659,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":662,"column":20},"end":{"line":662,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box disable-bboard\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":669,"column":16},"end":{"line":669,"column":49}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this bulletin board will not be visible to your viewers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":672,"column":37},"end":{"line":672,"column":103}}}))
    + ".</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to disable this bulletin board?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":673,"column":37},"end":{"line":673,"column":101}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"disable-bboard\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":677,"column":74},"end":{"line":677,"column":91}}}))
    + "</div>\r\n                    <div class=\"disable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":678,"column":54},"end":{"line":678,"column":72}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":681,"column":20},"end":{"line":681,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":684,"column":20},"end":{"line":684,"column":53}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":687,"column":20},"end":{"line":687,"column":40}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"popup-box duplicate-bboard\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"copy bulletin board",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":694,"column":16},"end":{"line":694,"column":46}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this will create identical version ",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":697,"column":37},"end":{"line":697,"column":83}}}))
    + ".</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to copy this bulletin board?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":698,"column":37},"end":{"line":698,"column":98}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"duplicate-bboard\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":702,"column":76},"end":{"line":702,"column":93}}}))
    + "</div>\r\n                    <div class=\"duplicate rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"copy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":703,"column":56},"end":{"line":703,"column":71}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":706,"column":20},"end":{"line":706,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"copied successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":709,"column":20},"end":{"line":709,"column":51}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"copying",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":712,"column":20},"end":{"line":712,"column":38}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- notes edit popup -->\r\n        <div class=\"popup-box create-edit-notes\">\r\n            <div id=\"create-edit-notes\"></div>\r\n        </div>\r\n        <!-- End of notes edit popup -->\r\n\r\n        <!-- Delete chapter popup -->\r\n        <div class=\"popup-box popup-delete-notes\">\r\n            <div class=\"popup-title capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete notes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":726,"column":20},"end":{"line":726,"column":43}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":729,"column":16},"end":{"line":729,"column":55}}}))
    + "<br />\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to delete this entire notes?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":730,"column":16},"end":{"line":730,"column":77}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect capital-letter\" rel=\"popup-delete-notes\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":734,"column":93},"end":{"line":734,"column":110}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":735,"column":68},"end":{"line":735,"column":85}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":738,"column":20},"end":{"line":738,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":741,"column":20},"end":{"line":741,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending capital-letter\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":744,"column":20},"end":{"line":744,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Delete Chapter popup -->\r\n    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/film-strip.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/film-strip.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class='slide' "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_image") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":86}}})) != null ? stack1 : "")
    + " order="
    + alias2(((helper = (helper = lookupProperty(helpers,"order") || (depth0 != null ? lookupProperty(depth0,"order") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"order","hash":{},"data":data,"loc":{"start":{"line":6,"column":93},"end":{"line":6,"column":102}}}) : helper)))
    + " slide-type=\""
    + alias2(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"primary_resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1), depth0))
    + "\"></div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "style=\"background-image:url('"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"src") || (depth0 != null ? lookupProperty(depth0,"src") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"src","hash":{},"data":data,"loc":{"start":{"line":6,"column":67},"end":{"line":6,"column":74}}}) : helper)))
    + "'); \"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='slides_wraper'>\r\n	<div class=\"slide-rearrange\"></div>\r\n	<div class='slides_box mCustomScrollbar' data-mcs-axis=\"yx\" data-mcs-setWidth=\"100%\" data-mcs-theme=\"minimal\">\r\n		<div class='slides_container'>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"slides") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":7,"column":12}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/hotspot.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/hotspot.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"block\">\n    <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"highlight color",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":23},"end":{"line":2,"column":49}}}))
    + "</div>\n    <div class=\"sub-title\">\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a highlight color for your hotspot",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":60}}}))
    + ".\n    </div>\n    <div class=\"color-option\">\n        <div class=\"custom-hotspot-color\">\n            <div class=\"color-box\"></div>\n        </div>\n    </div>\n</div>\n<div class=\"block\">\n    <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"highlight link timer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":23},"end":{"line":13,"column":54}}}))
    + "</div>\n    <div class=\"sub-title\">\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"set a timer after which the hotspot is displayed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":8},"end":{"line":15,"column":67}}}))
    + ".\n    </div>\n    <div class=\"hotspot-timer\">\n        <label><input type=\"text\" id=\"hotspot-timer\" name=\"hotspot-timer\" placeholder=\"Ex: 10\"> Seconds</label>\n    </div>\n</div>\n<div class=\"block\">\n    <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":39},"end":{"line":22,"column":54}}}))
    + "</div>\n    <div class=\"sub-title\">\n        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link hotspot to another slide or external content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":24,"column":68}}}))
    + ".\n    </div>\n    <div class=\"link-option\">\n        <span class='camel-case'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"next",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":33},"end":{"line":27,"column":48}}}))
    + ":</span> <input type=\"radio\" id=\"next\" name=\"goto\" class=\"css-radio capital-letter\" value=\"next\" checked=\"checked\"><label class=\"css-radio-label\" for=\"next\"></label><br/>\n        <span  class='camel-case'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"previous",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":34},"end":{"line":28,"column":53}}}))
    + ":</span> <input type=\"radio\" id=\"prev\" name=\"goto\" class=\"css-radio\" value=\"prev\"><label class=\"css-radio-label\" for=\"prev\"></label><br/>\n        <div>\n            <span class='camel-case'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"go to",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":37},"end":{"line":30,"column":53}}}))
    + ":</span> <input type=\"radio\" id=\"goto\" name=\"goto\" class=\"css-radio\" value=\"goto\"><label class=\"css-radio-label\" for=\"goto\"></label> \n            <select id=\"goto-slide-no\"></select>\n        </div>\n        <div>\n            <span  class='camel-case'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"external link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":34,"column":38},"end":{"line":34,"column":62}}}))
    + ":</span> <input type=\"radio\" id=\"elink\" name=\"goto\" class=\"css-radio\" value=\"elink\"><label class=\"css-radio-label\" for=\"elink\"></label><input class=\"url_input\" type=\"text\" name=\"elink\" id=\"e-link\" placeholder=\"http://\" media-type=\"link\"><div class=\"error-message\"></div>\n        </div>\n        <span  class='camel-case'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"no action",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":36,"column":34},"end":{"line":36,"column":54}}}))
    + ":</span> <input type=\"radio\" id=\"nolink\" name=\"goto\" class=\"css-radio\" value=\"next\"><label class=\"css-radio-label\" for=\"nolink\"></label><br/>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/journey-list.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/journey-list.handlebars ***!
  \****************************************************************************/
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

  return "                    <li class=\"sitemap-item parentblock "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":56},"end":{"line":6,"column":88}}})) != null ? stack1 : "")
    + "\"\n                    data-groups=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n                        <span class=\"siteMapTitle\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>     \n                        <input id=\"tree-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" type=\"checkbox\" class=\"css-checkbox\">\n                        <label for=\"tree-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"css-label\"></label>\n                    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"journey-browse-popup\">\n    <div class=\"popup-title camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":65}}}))
    + "</div>\n    <div class=\"content-block\">\n            <ul id=\"journey-sitemap\" class=\"sitemap-tree\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"journeys") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":12,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n   </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"journey-back rippleEffect trigger-inplace-popup\" data-hidePopup=\"journey-browse-popup\" data-showPopup=\"section-edit-block\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"back",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":17,"column":147},"end":{"line":17,"column":162}}}))
    + "</div>\n            <div class=\"save-selected-journeys\" data-hidePopup=\"joureny-browse-popup\"\n            data-showPopup=\"section-edit-block\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":48},"end":{"line":19,"column":63}}}))
    + "</div>\n        </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/new-slide-options.handlebars":
/*!*********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/new-slide-options.handlebars ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"demo_welcome_block\">\n    <div class=\"welcome_content\">\n        <h1 class=\"camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"start creating your asset",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":67}}}))
    + "</h1>\n        <h2 class=\"sub-title\"><pre class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"let's get started by adding your files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":53},"end":{"line":5,"column":103}}}))
    + ".</pre><pre class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"click on the green button to begin",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":133},"end":{"line":5,"column":178}}}))
    + ".</pre></h2>\n    </div>\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"options add_sandbox\" type=\"slide_sandbox\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add sandbox",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":66,"column":36},"end":{"line":66,"column":58}}}))
    + "</div>\n                <div class=\"title2\">JSON</div>\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "    <div class=\"slide_options\" data-slide=\"slide_sandbox\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop a json file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":259,"column":41},"end":{"line":259,"column":77}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select the option below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":260,"column":35},"end":{"line":260,"column":72}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"sandbox\" id='upload-slide-sandbox' name='json_resource' accept=\".json\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-sandbox'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":264,"column":78},"end":{"line":264,"column":101}}}))
    + "</label>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show_start_message") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":8,"column":7}}})) != null ? stack1 : "")
    + "<!--  slide fade overlay -->\n<div class=\"author_fade\">\n    <div class=\"new_slide_options\">\n        <div class=\"options_block\">\n            <div class=\"options add_image\" type=\"slide_image\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":36},"end":{"line":15,"column":56}}}))
    + "</div>\n                <div class=\"title2\">jpg, png</div>\n            </div>\n            <div class=\"options add_video\" type=\"slide_video\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":36},"end":{"line":20,"column":56}}}))
    + "</div>\n                <div class=\"title2\">MP4, WMV, MPEG4</div>\n            </div>\n            <div class=\"options add_audio\" type=\"slide_audio\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":36},"end":{"line":25,"column":56}}}))
    + "</div>\n                <div class=\"title2\">MP3, WAV</div>\n            </div>\n            <div class=\"options add_text\" type=\"slide_content\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text editor",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":36},"end":{"line":30,"column":58}}}))
    + "</div>\n                <div class=\"title2\">Text</div>\n            </div>\n            <div class=\"options add_pdf\" type=\"slide_pdf\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":36},"end":{"line":35,"column":54}}}))
    + "</span></div>\n                <div class=\"title2\">PDF</div>\n            </div>\n            <div class=\"options add_ppt\" type=\"slide_ppt\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add presentation",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":36},"end":{"line":40,"column":63}}}))
    + "</span></div>\n                <div class=\"title2\">PPT, PPTX</div>\n            </div>\n            <div class=\"options add_360\" type=\"slide_360\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":36},"end":{"line":45,"column":50}}}))
    + " 360<sup>0</sup> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"view",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":67},"end":{"line":45,"column":82}}}))
    + "</div>\n                <div class=\"title2\">JPG, PNG</div>\n            </div>\n            <div class=\"options add_iframe\" type=\"slide_iframe\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add html",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":36},"end":{"line":50,"column":55}}}))
    + "</div>\n                <div class=\"title2\">zip, HTML</div>\n            </div>\n            <div class=\"options add_link\" type=\"slide_link\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":55,"column":36},"end":{"line":55,"column":55}}}))
    + "</div>\n                <div class=\"title2\">URL</div>\n            </div>\n            <div class=\"options add_file_uploader\" type=\"slide_file\">\n                <div class=\"icon\"></div>\n                <div class=\"title1\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file upload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":60,"column":36},"end":{"line":60,"column":58}}}))
    + "</div>\n                <div class=\"title2\">1GB limit</div>\n            </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_sandbox_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":12},"end":{"line":69,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n\n    <!--Upload image to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_image\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop an image file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":41},"end":{"line":77,"column":79}}}))
    + " <br> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or multiple images",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":85},"end":{"line":77,"column":114}}}))
    + " </div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select one of the options below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":35},"end":{"line":78,"column":80}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"image\" multiple id='upload-slide-image' name='image_resource' accept=\".jpg, .jpeg, .png, .gif, .bmp|images/*\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-image'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":82,"column":76},"end":{"line":82,"column":99}}}))
    + "</label>\n            <div class='resourceUrl rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":83,"column":50},"end":{"line":83,"column":64}}}))
    + "</div><br />\n            <div class=\"upload-url\">\n                <input class='url_input' type='text' media-type='image' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":86,"column":53},"end":{"line":86,"column":70}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\"></label>\n        </div>\n    </div>\n\n    <!--Upload Video to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_video\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop a video file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":96,"column":41},"end":{"line":96,"column":78}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select one of the options below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":97,"column":35},"end":{"line":97,"column":80}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"video\" id='upload-slide-video' name='video_resource' accept=\".mp4, .webm, .ogg\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-video'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":101,"column":76},"end":{"line":101,"column":98}}}))
    + "</label>\n            <div class='resourceUrl rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"embed url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":102,"column":50},"end":{"line":102,"column":70}}}))
    + "</div><br />\n            <div class=\"upload-url \">\n                <input class='url_input' type='text' placeholder='Youtube, Vimeo or BrightCove url' media-type='embed' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"embed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":105,"column":53},"end":{"line":105,"column":69}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload audio to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_audio\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop an audio file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":115,"column":41},"end":{"line":115,"column":79}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select one of the options below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":116,"column":35},"end":{"line":116,"column":80}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"audio\"  id='upload-slide-audio' name='audio_resource' accept=\".mp3, .webm, .ogg\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-audio'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":120,"column":76},"end":{"line":120,"column":98}}}))
    + "</label>\n            <div class='resourceUrl rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"URL",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":121,"column":50},"end":{"line":121,"column":64}}}))
    + "</div><br />\n            <div class=\"upload-url\">\n                <input class='url_input' type='text' media-type='audio' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":124,"column":53},"end":{"line":124,"column":70}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload pdf to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_pdf\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop a",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":134,"column":41},"end":{"line":134,"column":67}}}))
    + " <span class='capital-letter'>pdf</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":134,"column":108},"end":{"line":134,"column":123}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select one of the options below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":135,"column":35},"end":{"line":135,"column":80}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"pdf\" id='upload-slide-pdf' name='pdf_resource' accept=\".pdf\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-pdf'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":139,"column":74},"end":{"line":139,"column":96}}}))
    + "</label>\n            <div class='resourceUrl rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"pdf url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":140,"column":50},"end":{"line":140,"column":68}}}))
    + "</div><br />\n            <div class=\"upload-url \">\n                <input class='url_input' type='text' placeholder='PDF url' media-type='pdf' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":53},"end":{"line":143,"column":70}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload link to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_link\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\" ></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"link to content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":153,"column":41},"end":{"line":153,"column":67}}}))
    + "</div>\n            <div class=\"sub_title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enter a url to link outside content",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":154,"column":45},"end":{"line":154,"column":91}}}))
    + "</div>\n            <div class=\"upload-url active\">\n                <input class='url_input' type='text' media-type='link' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":157,"column":53},"end":{"line":157,"column":72}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!-- upload progress block -->\n    <div class=\"upload_media_status\">\n        <div class=\"options_block\">\n            <div class=\"upload_status_update\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"uploading",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":166,"column":46},"end":{"line":166,"column":66}}}))
    + "...</div>\n            <div class=\"file-progressbar\">\n                <div class=\"file-progressbar-status\"></div>\n            </div>\n            <div class=\"upload_status_successs\"></div>\n            <div class=\"upload_status_failed\">\n                <div class=\"upload_fail_block\">\n                    <div class=\"upload_retry\">\n                        <span class=\"upload_retry_button\"></span>\n                        <span class=\"upload_retry_text camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"retry",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":175,"column":67},"end":{"line":175,"column":83}}}))
    + "</span>\n                    </div>\n                    <div class=\"upload_cancel\">\n                        <span class=\"upload_cancel_button\"></span>\n                        <span class=\"upload_cancel_text camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":179,"column":68},"end":{"line":179,"column":85}}}))
    + "</span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"malware-error\">\n                <div class=\"malware-image\"></div>\n                <div class=\"malware-detected\">Malware Detected!</div>\n                <p>This file may not be safe, please verify with your IT department. Please upload a different asset</p>\n                <button class=\"close-button btn\">CLOSE</button>\n            </div>    \n        </div>\n    </div>\n\n    <!--Upload link to slide -->\n    <div class=\"slide_options\" data-slide=\"slide_iframe\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\" ></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload html code",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":196,"column":41},"end":{"line":196,"column":68}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select the options below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":197,"column":35},"end":{"line":197,"column":70}}}))
    + "</div>\n            <label class='uploadFile rippleEffect' for='upload-iframe-zip'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":198,"column":75},"end":{"line":198,"column":98}}}))
    + "</label>\n            <div class='resourceUrl rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"embed url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":199,"column":50},"end":{"line":199,"column":70}}}))
    + "</div><br />\n            <div class=\"html-zip-block\">\n                <input type='file' class='slide-file' media-type=\"html5\" id='upload-iframe-zip' name='iframe_zip_resource' accept=\".zip, .html\" />\n            </div>\n            <div class=\"upload-url\">\n                <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"paste your iframe html below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":204,"column":39},"end":{"line":204,"column":78}}}))
    + "</div>\n                <input class='url_input' type='text' media-type='iframe' />\n                <div class='url_upload rippleEffect'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add iframe",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":206,"column":53},"end":{"line":206,"column":74}}}))
    + "</div>\n            </div>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload file to slide-->\n    <div class=\"slide_options\" data-slide=\"slide_file\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a file for download",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":216,"column":41},"end":{"line":216,"column":78}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop a file or browse your computer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":217,"column":35},"end":{"line":217,"column":90}}}))
    + "</div>\n            <p>Supported file types Doc, pdf, ppt, image, audio, video, zip, text</p>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"file\" id='upload-slide-file' name='file_resource' accept=\".zip, .html, .ppt, .pptx, .jpg, .pdf, .gif, .jpeg, .mp3, .mp4, .webm, .ogg, .doc, .docx, .txt\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-file'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":222,"column":75},"end":{"line":222,"column":97}}}))
    + "</label>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload image to 360 slide -->\n    <div class=\"slide_options\" data-slide=\"slide_360\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop the image files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":231,"column":41},"end":{"line":231,"column":81}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or select the option below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":232,"column":35},"end":{"line":232,"column":72}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"360\" id='upload-slide-360' name='image_resource' accept=\".jpg, .jpeg, .png, .gif, .bmp|images/*\" multiple />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-360'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse files",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":236,"column":74},"end":{"line":236,"column":97}}}))
    + "</label>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n    <!--Upload image to 360 slide -->\n    <div class=\"slide_options\" data-slide=\"slide_ppt\">\n        <div class=\"upload_media_block\">\n            <div class=\"close\"></div>\n            <div class=\"title sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"drag and drop ppt/pptx file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":245,"column":41},"end":{"line":245,"column":79}}}))
    + "</div>\n            <div class=\"sub_title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"or click on browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":246,"column":35},"end":{"line":246,"column":69}}}))
    + "</div>\n            <div class=\"slide-file-block drag\">\n                <input type='file' class='slide-file' media-type=\"ppt\" id='upload-slide-ppt' name='ppt_resource' accept=\".ppt, .pptx\" />\n            </div>\n            <label class='uploadFile rippleEffect' for='upload-slide-ppt'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":250,"column":74},"end":{"line":250,"column":96}}}))
    + "</label>\n            <label class=\"error-message\" ></label>\n        </div>\n    </div>\n\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_sandbox_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":255,"column":4},"end":{"line":268,"column":11}}})) != null ? stack1 : "")
    + "\n    <div class=\"slide-360-preview-wrap\">\n        <div class=\"slide_option_360\">\n            <div class=\"close\"></div>\n            <div class=\"title\"></div>\n            <div class=\"done-360\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"done",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":274,"column":34},"end":{"line":274,"column":49}}}))
    + "</div>\n        </div>\n        <div class=\"slide_360_frames_wrap\">\n            <ul>\n                <li class=\"add-frame\">\n                    <input type='file' id='add-slide-360-frames' accept=\".jpg, .jpeg, .png, .gif, .bmp|images/*\" multiple />\n                    <label class='upload-frames' for='add-slide-360-frames'></label>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/notes-form.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/notes-form.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":22},"end":{"line":3,"column":37}}}));
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":45},"end":{"line":3,"column":59}}}));
},"5":function(container,depth0,helpers,partials,data) {
    return "edit";
},"7":function(container,depth0,helpers,partials,data) {
    return "add";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"notes-edit-block\">\n    <div class=\"popup-title\">\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":3,"column":66}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"notes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":67},"end":{"line":3,"column":83}}}))
    + "\n    </div>\n    <form enctype=\"multipart/form-data\" name=\"slide-notes-data\" form-type=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":5,"column":75},"end":{"line":5,"column":112}}})) != null ? stack1 : "")
    + "\">\n        <div class=\"content-block\">\n            <div class=\"block\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"notes title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":35},"end":{"line":8,"column":57}}}))
    + "</div>\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a title for your notes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":39},"end":{"line":9,"column":78}}}))
    + ".</div>\n                <div class=\"input_wrap\">\n                    <div class=\"notes-title\" contenteditable=\"true\"></div>\n                </div>            \n            </div>\n            <div class=\"block\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"notes body",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":35},"end":{"line":15,"column":56}}}))
    + "</div>\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write the body for your notes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":39},"end":{"line":16,"column":79}}}))
    + ".</div>\n                <div class=\"input_wrap\">\n                    <div class=\"notes-body\" contenteditable=\"true\"></div>\n                </div>\n            </div>\n            <hr>\n            <button class=\"show-advanced-options capital-letter\" type=\"button\" data-toggle=\"collapse\" data-target=\"#advanced-notes-content\" aria-expanded=\"false\" aria-controls=\"advanced-notes-content\">advanced</button>\n            <div id=\"advanced-notes-content\" class=\"collapse\">\n                <div class=\"block\">\n                    <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"button title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":55},"end":{"line":25,"column":78}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add a display title for a button at the bottom of your notes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":43},"end":{"line":26,"column":114}}}))
    + ".</div>\n                    <div class=\"input_wrap\">\n                        <input type=\"text\" name=\"name\" class=\"notes-link-title trim-input\" maxlength=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"notesLinkTitleLimit") : depth0), depth0))
    + "\" autocomplete=\"off\" placeholder=\"Title\" value=\"\"/>\n                        <div class=\"counter\">\n                            <span data-counter>25</span><span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":63},"end":{"line":30,"column":89}}}))
    + "</span>\n                        </div>\n                        <label class=\"error-message sub-title notes-url-title\"></label>\n                    </div>            \n                </div>\n\n                <div class=\"block upload-resource\">\n                    <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":39},"end":{"line":37,"column":61}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image or video to be displayed when the button is clicked",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":38,"column":43},"end":{"line":38,"column":121}}}))
    + ".</div>\n                    <input type=\"file\" class=\"drag-file\" id=\"upload-notes-link-file\" accept=\".webm, .mp4, .jpg, .jpeg, .png, .gif, .bmp|images/\" name=\"icon\">\n                    <img class=\"drag\" id=\"upload-file-preview\" />\n                    <div class=\"file-name\"></div>\n                    <label id=\"remove-img\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":43},"end":{"line":42,"column":60}}}))
    + "</label>\n                    <label for=\"upload-notes-link-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload media",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":77},"end":{"line":43,"column":100}}}))
    + "</label>\n                    <label class=\"notes-link-url rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"embed url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":63},"end":{"line":44,"column":83}}}))
    + "</label>\n                    <label class=\"error-message sub-title notes-url-resource clearfix\"></label>\n                    <input type=\"text\" class=\"notes-url-link url_input\" placeholder=\"http://\" autocomplete=\"off\" media-type=\"embed\" />\n                    <label class=\"error-message sub-title notes-url\"></label>\n                </div>\n            </div>\n        </div>\n        <div class=\"popup-footer\">\n            <div class=\"form-footer\">\n                <div class=\"cancel rippleEffect\" rel=\"create-edit-notes\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":53,"column":73},"end":{"line":53,"column":90}}}))
    + "</div>\n                <input type=\"submit\" class=\"save capital-letter\" value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":54,"column":72},"end":{"line":54,"column":87}}}))
    + "\" />\n            </div>\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":52},"end":{"line":56,"column":82}}}))
    + "</div>\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":57,"column":50},"end":{"line":57,"column":80}}}))
    + "</div>\n            <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":58,"column":53},"end":{"line":58,"column":70}}}))
    + "...<div class=\"cd-loading\"></div></div>\n        </div>\n    </form>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/playlist-form.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/playlist-form.handlebars ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":53},"end":{"line":2,"column":68}}}));
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":76},"end":{"line":2,"column":93}}}));
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"block\">\n				<div class=\"title capitalize-text "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":38},"end":{"line":26,"column":83}}})) != null ? stack1 : "")
    + " hidden\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable restrictions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":92},"end":{"line":26,"column":122}}}))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":4},"end":{"line":31,"column":11}}})) != null ? stack1 : "")
    + "				<input type=\"checkbox\" name=\"playlist_enable_restrictions\" id=\"playlist_enable_restrictions\" class=\"css-checkbox hidden\" data-toggle=\"collapse\" data-target=\"#playlist-usr-grps-to-restrict\" aria-expanded=\"false\" aria-controls=\"playlist-usr-grps-to-restrict\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":261},"end":{"line":32,"column":305}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":306},"end":{"line":32,"column":351}}})) != null ? stack1 : "")
    + " />\n				<label for=\"playlist_enable_restrictions\" class=\"css-label hidden\"></label>\n\n				<div class=\"collapse "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":25},"end":{"line":35,"column":64}}})) != null ? stack1 : "")
    + "\" id=\"playlist-usr-grps-to-restrict\">\n					<div>\n					    <div class=\"user-groups\">\n\n					        <div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"allow access to",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":39,"column":48},"end":{"line":39,"column":75}}}))
    + "</div>\n					        <input type=\"text\" placeholder=\"Select user groups\" class=\"usr-grp-dropdown\" id=\"playlist-usr-grp-dropdown\" readonly=\"true\" data-toggle=\"collapse\" data-target=\"#playlist-usr-grps-list\" aria-expanded=\"false\" aria-controls=\"playlist-usr-grps-list\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":259},"end":{"line":40,"column":374}}})) != null ? stack1 : "")
    + " />\n\n					        <div id=\"playlist-usr-grps-list\" class=\"collapse usr-grps-list\">\n					            <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"userGroupOptions") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":17},"end":{"line":50,"column":26}}})) != null ? stack1 : "")
    + "					            </ul>\n					        </div>\n					        <div>&nbsp;</div>\n\n					    </div>\n					</div>\n				</div>\n			</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"10":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"sub-title disabled\">\n						"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"restrictions already set in a parent content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":6},"end":{"line":29,"column":62}}}))
    + "\n					</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"14":function(container,depth0,helpers,partials,data) {
    return " in ";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroups") : depth0), depth0))
    + "\" data-selected-groups=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroupIds") : depth0), depth0))
    + "\" ";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					                <li "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":25},"end":{"line":45,"column":84}}})) != null ? stack1 : "")
    + " >\n					                    <input type=\"checkbox\" name=\"user-group\" value=\"\" id=\"playlist-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"user-group-items\" data-attr-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " data-attr-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isChecked") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":177},"end":{"line":46,"column":211}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":212},"end":{"line":46,"column":254}}})) != null ? stack1 : "")
    + " />\n					                    <label for=\"playlist-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\"></label>\n					                    <span> "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </span>\n					                </li>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return " class=\"selected-disabled\" ";
},"21":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-datetime="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0), depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<form name='playlist-data' playlist_id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"playlistId") : depth0), depth0))
    + "\" >\n	<div class=\"popup-title camel-case\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":37},"end":{"line":2,"column":100}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":101},"end":{"line":2,"column":120}}}))
    + "</div>\n	<div class=\"content-block\">\n		<div class=\"block\">\n			<div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"playlist title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":38},"end":{"line":5,"column":63}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"choose a title for this playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":69}}}))
    + ".</div>\n			<div class=\"input_wrap\">\n				<input type=\"text\" maxlength=\"85\" class=\"edit-playlist-title trim-input\" name=\"name\" autocomplete=\"off\" placeholder=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"Name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":121},"end":{"line":8,"column":136}}}))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":138},"end":{"line":8,"column":173}}})) != null ? stack1 : "")
    + "/>\n				<div class=\"counter\">\n					<span data-counter>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name_limit") : depth0), depth0))
    + "</span> <span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":53},"end":{"line":10,"column":79}}}))
    + "</span>\n				</div>\n			</div>\n		</div>\n		<div class=\"block\">\n			<div class=\"title description\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"playlist description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":34},"end":{"line":15,"column":65}}}))
    + "</div>\n			<div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"write a short description that best describes the content in this playlist",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":26},"end":{"line":16,"column":111}}}))
    + ".</div>\n			<div class=\"input_wrap\">\n				<textarea maxlength=\"250\" class=\"edit-playlist-desc trim-input\" name=\"description\" autocomplete=\"off\" placeholder=\"Description\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</textarea>\n				<div class=\"counter\">\n					<span data-counter>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description_limit") : depth0), depth0))
    + "</span><span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":59},"end":{"line":20,"column":85}}}))
    + "</span>\n				</div>\n			</div>									\n		</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"showRestrictionOption") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":2},"end":{"line":59,"column":9}}})) != null ? stack1 : "")
    + "\n		<div class=\"block\">\n			<div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"end of life",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":62,"column":38},"end":{"line":62,"column":60}}}))
    + "</div>\n			<div class=\"input_wrap\">\n			    <input type=\"text\" placeholder=\"Click to select date-time\" class=\"datepicker-here\" id=\"playlist_expire_at\" readonly=\"true\" data-position=\"top right\" data-timepicker=\"true\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":179},"end":{"line":64,"column":234}}})) != null ? stack1 : "")
    + " />\n			    <div>&nbsp;</div>\n			</div>\n		</div>\n\n	</div>\n\n	<div class=\"popup-footer\">\n		<div class=\"form-footer\">\n			<div class=\"cancel rippleEffect\" rel=\"popup-create-playlist\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":73,"column":64},"end":{"line":73,"column":81}}}))
    + "</div>\n			<input type=\"submit\" class=\"save rippleEffect capital-letter\" value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":74,"column":72},"end":{"line":74,"column":87}}}))
    + "\" />\n		</div>\n		<div class=\"form-failed\">\n			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":3},"end":{"line":77,"column":33}}}))
    + "\n		</div>\n		<div class=\"form-sent\">\n			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":80,"column":3},"end":{"line":80,"column":33}}}))
    + "\n		</div>\n		<div class=\"form-sending\">\n			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":83,"column":3},"end":{"line":83,"column":20}}}))
    + "...\n			<div class=\"cd-loading\"></div>\n		</div>\n	</div>\n</form>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/product-edit-block.handlebars":
/*!**********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/product-edit-block.handlebars ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"col-md-6 col-sm-6 col-xs-12 pwt-wrap\">\n    <div class=\"pwt-box \" slug=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\">\n        <div class=\"left icon\">\n            <div class=\"outer-circle\">\n                <div class=\"inner-circle progress\">\n                    <div class=\"icon-down-arrow\">\n                        <img src=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":42}}}) : helper)))
    + "\">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"right\">\n            <div class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n            <div class=\"pwt-details\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list-popup.handlebars":
/*!*******************************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list-popup.handlebars ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"repository-connector-list-popup\">\n    <div class=\"connector-list-popup\">\n        <div class=\"popup-title camel-case\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Choose Integration",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":3,"column":44},"end":{"line":3,"column":73}}}))
    + "</div>\n        <div class=\"show-layout-popup popup-back-icon\" data-close=\"repository-connector-list\" data-open=\"choose-category-type\"></div>\n        <div class=\"content-block\">\n            <div class=\"loading-icon-wrapper\">\n                <img class=\"loading-icon\" src=\"/static/images/loading_icon.gif\" />\n            </div>\n        </div>\n    </div>\n</div>\n\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/repository_manager/folder-list-popup.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/folder-list-popup.handlebars"),depth0,{"name":"folder-list-popup","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list.handlebars":
/*!*************************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list.handlebars ***!
  \*************************************************************************************************/
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

  return "        <li class=\"connector-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sync_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":34},"end":{"line":3,"column":90}}})) != null ? stack1 : "")
    + "\" id="
    + alias4(((helper = (helper = lookupProperty(helpers,"connector_id") || (depth0 != null ? lookupProperty(depth0,"connector_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"connector_id","hash":{},"data":data,"loc":{"start":{"line":3,"column":95},"end":{"line":3,"column":111}}}) : helper)))
    + " data-hidePopup=\"repository-connector-list-popup\" data-showPopup=\"connector-folder-list-popup\">\n            <div class=\"icon-wrapper\">\n                <span class=\"icon "
    + alias4(((helper = (helper = lookupProperty(helpers,"platform") || (depth0 != null ? lookupProperty(depth0,"platform") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"platform","hash":{},"data":data,"loc":{"start":{"line":5,"column":34},"end":{"line":5,"column":46}}}) : helper)))
    + "\"></span>\n            </div>\n            <h6>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":24}}}) : helper)))
    + "</h6>\n            <span class=\"connector-url\" title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"site_url") || (depth0 != null ? lookupProperty(depth0,"site_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"site_url","hash":{},"data":data,"loc":{"start":{"line":8,"column":47},"end":{"line":8,"column":59}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"site_url") || (depth0 != null ? lookupProperty(depth0,"site_url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"site_url","hash":{},"data":data,"loc":{"start":{"line":8,"column":61},"end":{"line":8,"column":73}}}) : helper)))
    + "</span>\n            <div class=\"sync-status capital-letter\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sync_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":9,"column":52},"end":{"line":9,"column":100}}})) != null ? stack1 : "")
    + "</div>\n        </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " trigger-inplace-popup active";
},"4":function(container,depth0,helpers,partials,data) {
    return "active";
},"6":function(container,depth0,helpers,partials,data) {
    return "offline";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"connector-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":11,"column":13}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/repository_manager/folder-list-popup.handlebars":
/*!****************************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/repository_manager/folder-list-popup.handlebars ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"connector-folder-list-popup hidden\">\n    <div class=\"popup-title camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Choose Folder to Link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":40},"end":{"line":2,"column":72}}}))
    + "</div>\n    <div class=\"popup-back-icon trigger-inplace-popup\" data-hidePopup=\"connector-folder-list-popup\" data-showPopup=\"repository-connector-list-popup\"></div>\n    <div hidden class=\"content-block\">\n        <div class=\"loading-icon-wrapper\">\n            <img class=\"loading-icon\" src=\"/static/images/loading_icon.gif\" />\n        </div>\n    </div>\n    <div hidden class=\"content-block-list\">\n    </div>\n    <div hidden class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"link-selected-repository-folder\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Link to this folder",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":57},"end":{"line":13,"column":87}}}))
    + "</div>\n        </div>\n        <div class=\"form-failed\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! something went wrong",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":12},"end":{"line":16,"column":49}}}))
    + "\n        </div>\n        <div class=\"form-sent\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Importing Content!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":19,"column":41}}}))
    + "\n        </div>\n        <div class=\"form-sending\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"linking to Folder",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":12},"end":{"line":22,"column":40}}}))
    + "...\n            <div class=\"cd-loading\"></div>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/repository_manager/main-folder.handlebars":
/*!**********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/repository_manager/main-folder.handlebars ***!
  \**********************************************************************************************/
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

  return "        <li class=\"connector-folder parent-folder\" data-relative-folder-path=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"folder_level_path") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-root-folder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n            <div style=\"margin-left:10px\" class=\"parentblock\">\n                <span class=\"expand-folder\"></span>\n                <span class=\"folder-title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>     \n                <input id=\"folder-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" type=\"checkbox\" class=\"radio-btn\">\n                <label for=\"folder-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" class=\"radio-label\"></label>\n            </div>\n\n            <ul class=\"sub-folder-wrapper\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":14,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n        </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars"),depth0,{"name":"sub-folders","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<ul class=\"folder-wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":17,"column":13}}})) != null ? stack1 : "")
    + "</ul>";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars":
/*!**********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return " class=\"expand-folder\" ";
},"3":function(container,depth0,helpers,partials,data) {
    return " class=\"expand-folder expanded\" ";
},"5":function(container,depth0,helpers,partials,data) {
    return " style=\"display: none;\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/sub-folders.handlebars"),depth0,{"name":"sub-folders","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"connector-folder\" data-relative-folder-path=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"folder_level_path") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-root-folder=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n    <div style=\"margin-left:10px\" class=\"sub-folder\">\n        <span "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":14},"end":{"line":3,"column":100}}})) != null ? stack1 : "")
    + " ></span>\n        <span class=\"folder-title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n        <input id=\"folder-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" type=\"checkbox\" class=\"radio-btn\">\n        <label for=\"folder-"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" class=\"radio-label\"></label>\n    </div>\n\n    <ul class=\"sub-folder-wrapper\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":47},"end":{"line":9,"column":94}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":12,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/section-edit-block.handlebars":
/*!**********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/section-edit-block.handlebars ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"col-md-12 col-sm-12 pwt-wrap\">\n    <div class=\"pwt-box\" slug=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\">\n        <div class=\"left\">\n            <div class=\"outer-circle\">\n                <div class=\"inner-circle\">\n                    <div class=\"progress\">\n                        <div class=\"icon-down-arrow\">\n                            <img src=\""
    + alias2(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":8,"column":38},"end":{"line":8,"column":46}}}) : helper)))
    + "\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"right\">\n            <div class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n            <div class=\"pwt-description\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/section-form.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/section-form.handlebars ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":27}}}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":33}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"asset",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":9,"column":28}}}))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "            "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":11,"column":31}}}))
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "asset";
},"11":function(container,depth0,helpers,partials,data) {
    return "default";
},"13":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"asset title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":24},"end":{"line":19,"column":46}}}))
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"category title",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":24},"end":{"line":21,"column":49}}}))
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose a title for this asset",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":24},"end":{"line":26,"column":64}}}))
    + ".\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose a title for this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":24},"end":{"line":28,"column":67}}}))
    + ".\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\"";
},"25":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"asset description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":24},"end":{"line":40,"column":52}}}))
    + "\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"category description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":42,"column":24},"end":{"line":42,"column":55}}}))
    + "\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"write a short description that best describes the content in this asset",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":47,"column":24},"end":{"line":47,"column":106}}}))
    + ".\n";
},"31":function(container,depth0,helpers,partials,data) {
    return "                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"write a short description that best describes the content in this page",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":24},"end":{"line":49,"column":105}}}))
    + ".\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"block asset-link "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":45},"end":{"line":58,"column":91}}})) != null ? stack1 : "")
    + "\">\n                    <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload asset file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":59,"column":55},"end":{"line":59,"column":83}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload your asset file. your file will open on a separate tab.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":60,"column":43},"end":{"line":60,"column":116}}}))
    + "</div>\n                    <input type=\"file\" class=\"drag-file\" id=\"upload-link-file\" accept=\"application/pdf\" name=\"file\" resource-id="
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"id") : stack1), depth0))
    + " >\n                    <div class=\"file-name\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"meta_data") : stack1)) != null ? lookupProperty(stack1,"file_name") : stack1),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.program(38, data, 0),"data":data,"loc":{"start":{"line":63,"column":24},"end":{"line":67,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                    <label id=\"remove-asset\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":69,"column":45},"end":{"line":69,"column":62}}}))
    + "</label>\n                    <label for=\"upload-link-file\" class=\"rippleEffect\">\n                        <span class='upload-text'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":71,"column":50},"end":{"line":71,"column":72}}}))
    + "</span>\n                        <span class='progress-text hide'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"uploading . . .",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":72,"column":57},"end":{"line":72,"column":83}}}))
    + "</span>\n                        <span class='error-text hide'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload error",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":73,"column":54},"end":{"line":73,"column":77}}}))
    + "</span>\n                    </label>\n                </div>\n                <div class=\"block custom-url-block "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1),{"name":"unless","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":51},"end":{"line":76,"column":98}}})) != null ? stack1 : "")
    + "\">\n                    <div class=\"title\"> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"custom url name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":40},"end":{"line":77,"column":66}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a custom url name for this asset.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":43},"end":{"line":78,"column":94}}}))
    + "</div>\n                    <div class=\"custom-url-preview\">"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "</div>\n                    <div class=\"input_wrap\">\n                        <input type=\"text\" name=\"url\" class=\"section-url trim-input\" maxlength=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"urlMaxLength") : depth0), depth0))
    + "\" autocomplete=\"off\" placeholder=\"url\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":151},"end":{"line":81,"column":228}}})) != null ? stack1 : "")
    + "/>\n                        <div class=\"counter\"><span data-counter>"
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"name_limit") : stack1), depth0))
    + "</span> <span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":82,"column":113},"end":{"line":82,"column":139}}}))
    + "</span></div>\n                    </div>\n                </div>\n";
},"34":function(container,depth0,helpers,partials,data) {
    return "asset-added";
},"36":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"meta_data") : stack1)) != null ? lookupProperty(stack1,"file_name") : stack1), depth0))
    + "\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n";
},"40":function(container,depth0,helpers,partials,data) {
    return "hide";
},"42":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"linked_asset") : stack1)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"";
},"44":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"col-md-6\">\n                        <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"public/private",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":97,"column":43},"end":{"line":97,"column":68}}}))
    + "</div>\n                        <div class=\"sub-title\">\n                            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"toggle privacy for this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":99,"column":28},"end":{"line":99,"column":71}}}))
    + ".\n                        </div>\n                        <input type=\"checkbox\" name=\"private\" id=\"private\" class=\"css-checkbox\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isPrivateTenant") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":96},"end":{"line":101,"column":136}}})) != null ? stack1 : "")
    + "/>\n                        <label for=\"private\" class=\"css-label\"></label>\n                    </div>\n";
},"45":function(container,depth0,helpers,partials,data) {
    return " checked ";
},"47":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"showExportOption") : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":107,"column":16},"end":{"line":119,"column":23}}})) != null ? stack1 : "");
},"48":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"block row\">\n                        <div class=\"col-md-6\">\n                            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"export to pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":110,"column":47},"end":{"line":110,"column":71}}}))
    + "</div>\n                            <div class=\"sub-title\">\n                                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"toggle pdf export for this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":112,"column":32},"end":{"line":112,"column":78}}}))
    + ". \n                            </div>\n                            <input type=\"checkbox\" id=\"export_to_pdf\" name=\"export_to_pdf\" class=\"css-checkbox\" \n                            "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"can_download") : stack1),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":115,"column":28},"end":{"line":115,"column":74}}})) != null ? stack1 : "")
    + "/>\n                            <label for=\"export_to_pdf\" class=\"css-label\"></label>\n                        </div>\n                    </div>\n";
},"50":function(container,depth0,helpers,partials,data) {
    return "image-added";
},"52":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\"";
},"54":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1)) != null ? lookupProperty(stack1,"name") : stack1), depth0));
},"56":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"block create-cta-btn\">\n                    <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"call to action button",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":134,"column":39},"end":{"line":134,"column":71}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Create CTA button to share links or files with your visitors",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":135,"column":43},"end":{"line":135,"column":114}}}))
    + ".</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showCreateCta") : depth0),{"name":"if","hash":{},"fn":container.program(57, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":136,"column":20},"end":{"line":138,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"cta-list\"></div>\n                <hr>\n";
},"57":function(container,depth0,helpers,partials,data) {
    return "                        <label for=\"create-cta\" class=\"rippleEffect\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create cta",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":137,"column":69},"end":{"line":137,"column":90}}}))
    + "</label>\n";
},"59":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "                <div class=\"block select-journey-btn\">\n                    <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Related Journeys",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":146,"column":39},"end":{"line":146,"column":66}}}))
    + "</div>\n                    <div class=\"sub-title\">\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Select the related Journeys to appear on Category page",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":148,"column":24},"end":{"line":148,"column":89}}}))
    + ".\n                    </div>\n                    <div class=\"rippleEffect browse-journey\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Choose Journeys",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":150,"column":61},"end":{"line":150,"column":87}}}))
    + "</div>\n                </div>\n                <div class=\"journey-list\">\n                    <ol class=\"journey-link-list\">\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/section-journey-list.handlebars */ "./sharedemos/static/js/tenant/templates/edit/section-journey-list.handlebars"),depth0,{"name":"section-journey-list","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                    </ol>\n                </div>\n                <hr>\n";
},"61":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "                    <div class=\"block\">\n                        <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":164,"column":43},"end":{"line":164,"column":66}}}))
    + "</div>\n                        <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a video to this category by embedding the url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":165,"column":47},"end":{"line":165,"column":110}}}))
    + "</div>\n                        <div class=\"video\"></div>\n                        <div class=\"video-link\">\n                            <input type=\"text\" class=\"video-upload\" placeholder=\"http://\" autocomplete=\"off\" />\n                            <div class=\"upload-section-video capital-letter rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":169,"column":90},"end":{"line":169,"column":107}}}))
    + "</div>\n                        </div>\n                    </div>\n";
},"63":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/edit/tags.handlebars */ "./sharedemos/static/js/tenant/templates/edit/tags.handlebars"),depth0,{"name":"tags","data":data,"indent":"                                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"65":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"block\">\n\n                        <div class=\"title capitalize-text "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(66, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":196,"column":58},"end":{"line":196,"column":103}}})) != null ? stack1 : "")
    + " hidden\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable restrictions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":196,"column":112},"end":{"line":196,"column":142}}}))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(68, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":197,"column":24},"end":{"line":201,"column":31}}})) != null ? stack1 : "")
    + "\n                        <input type=\"checkbox\" name=\"section_enable_restrictions\" id=\"section_enable_restrictions\" class=\"css-checkbox hidden\" data-toggle=\"collapse\" data-target=\"#section-usr-grps-to-restrict\" aria-expanded=\"false\" aria-controls=\"section-usr-grps-to-restrict\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":203,"column":277},"end":{"line":203,"column":321}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"restrictionsDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(66, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":203,"column":322},"end":{"line":203,"column":367}}})) != null ? stack1 : "")
    + " />\n                        <label for=\"section_enable_restrictions\" class=\"css-label hidden\"></label>\n\n                        <div class=\"collapse "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(70, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":206,"column":45},"end":{"line":206,"column":84}}})) != null ? stack1 : "")
    + "\" id=\"section-usr-grps-to-restrict\">\n                            <div>\n                                <div class=\"user-groups\">\n\n                                    <div class=\"title capitalize-text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"allow access to",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":210,"column":71},"end":{"line":210,"column":98}}}))
    + "</div>\n                                    <input type=\"text\" placeholder=\"Select user groups\" class=\"usr-grp-dropdown\" id=\"section-usr-grp-dropdown\" readonly=\"true\" data-toggle=\"collapse\" data-target=\"#section-usr-grps-list\" aria-expanded=\"false\" aria-controls=\"section-usr-grps-list\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRestrictionEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(72, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":211,"column":279},"end":{"line":211,"column":394}}})) != null ? stack1 : "")
    + " />\n\n                                    <div id=\"section-usr-grps-list\" class=\"collapse usr-grps-list\">\n                                        <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"userGroupOptions") : depth0),{"name":"each","hash":{},"fn":container.program(74, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":215,"column":40},"end":{"line":221,"column":49}}})) != null ? stack1 : "")
    + "                                        </ul>\n                                    </div>\n                                    <div>&nbsp;</div>\n\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n";
},"66":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"68":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"sub-title disabled\">\n                                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"restrictions already set in a parent content.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":199,"column":32},"end":{"line":199,"column":88}}}))
    + "\n                            </div>\n";
},"70":function(container,depth0,helpers,partials,data) {
    return " in ";
},"72":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroups") : depth0), depth0))
    + "\" data-selected-groups=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"restrictedToGroupIds") : depth0), depth0))
    + "\" ";
},"74":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <li "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(75, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":216,"column":48},"end":{"line":216,"column":107}}})) != null ? stack1 : "")
    + ">\n                                                <input type=\"checkbox\" name=\"user-group\" value=\"\" id=\"section-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"user-group-items\" data-attr-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " data-attr-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isChecked") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":217,"column":199},"end":{"line":217,"column":233}}})) != null ? stack1 : "")
    + "  "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"selectedDisabled") : depth0),{"name":"if","hash":{},"fn":container.program(66, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":217,"column":235},"end":{"line":217,"column":277}}})) != null ? stack1 : "")
    + " />\n                                                <label for=\"section-usr-grp-"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\"></label>\n                                                <span> "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </span>\n                                            </li>\n";
},"75":function(container,depth0,helpers,partials,data) {
    return " class=\"selected-disabled\" ";
},"77":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-datetime="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0), depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"section-edit-block\">\n    <div class=\"popup-title camel-case\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <form enctype=\"multipart/form-data\" name=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":14,"column":46},"end":{"line":14,"column":88}}})) != null ? stack1 : "")
    + "-section-data\">\n        <div class=\"content-block\">\n            <div class=\"block\">\n                <div class=\"title mandatory-field\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":18,"column":20},"end":{"line":22,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"sub-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":25,"column":20},"end":{"line":29,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" name=\"name\" class=\"section-name trim-input\" maxlength=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"titleMaxLength") : depth0), depth0))
    + "\" autocomplete=\"off\" placeholder=\"Name\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":152},"end":{"line":32,"column":203}}})) != null ? stack1 : "")
    + "/>\n                    <div class=\"counter\"><span data-counter>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"name_limit") : stack1), depth0))
    + "</span> <span>"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":33,"column":96},"end":{"line":33,"column":122}}}))
    + "</span></div>\n                </div>            \n            </div>\n            <input type=\"hidden\" name=\"parent\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":47},"end":{"line":36,"column":97}}})) != null ? stack1 : "")
    + "/>\n            <div class=\"block\">\n                <div class=\"title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data,"loc":{"start":{"line":39,"column":20},"end":{"line":43,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"sub-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.program(31, data, 0),"data":data,"loc":{"start":{"line":46,"column":20},"end":{"line":50,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"input_wrap\">\n                    <textarea name=\"description\" class=\"section-description trim-input\" maxlength=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"descriptionMaxLength") : depth0), depth0))
    + "\" placeholder=\"Description\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</textarea>\n                    <div class=\"counter\"><span data-counter>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"description_limit") : stack1), depth0))
    + "</span> <span>"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":54,"column":103},"end":{"line":54,"column":129}}}))
    + "</span></div>\n                </div>\n            </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":12},"end":{"line":85,"column":19}}})) != null ? stack1 : "")
    + "            <div class=\"block row\">\n                <div class=\"col-md-6\">\n                    <div class=\"title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"hide/show",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":88,"column":39},"end":{"line":88,"column":59}}}))
    + "</div>\n                    <div class=\"sub-title\">\n                        "
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"toggle visibility for this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":24},"end":{"line":90,"column":70}}}))
    + ". \n                    </div>\n                    <input type=\"checkbox\" id=\"show\" name=\"show\" class=\"css-checkbox\" checked />\n                    <label for=\"show\" class=\"css-label\"></label>\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showPrivateOption") : depth0),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":16},"end":{"line":104,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"unless","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":106,"column":12},"end":{"line":120,"column":23}}})) != null ? stack1 : "")
    + "            <div class=\"block "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":30},"end":{"line":121,"column":68}}})) != null ? stack1 : "")
    + "\">\n                <div class=\"title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"thumbnail cover",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":35},"end":{"line":122,"column":61}}}))
    + "</div>\n                <div class=\"sub-title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a thumbnail cover to illustrate this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":123,"column":39},"end":{"line":123,"column":102}}}))
    + ".</div>\n                <input type=\"file\" class=\"drag-file\" id=\"upload-file\" accept=\"image/*\" name=\"icon\">\n                <img class=\"drag\" id=\"upload-file-preview\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1),{"name":"if","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":125,"column":59},"end":{"line":125,"column":112}}})) != null ? stack1 : "")
    + "/>\n                <div class=\"file-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1),{"name":"if","hash":{},"fn":container.program(54, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":126,"column":39},"end":{"line":126,"column":87}}})) != null ? stack1 : "")
    + "</div>\n                <label id=\"remove-img\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":127,"column":39},"end":{"line":127,"column":56}}}))
    + "</label>\n                <label for=\"upload-file\" class=\"rippleEffect\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":128,"column":62},"end":{"line":128,"column":79}}}))
    + "</label>\n            </div>\n            <hr>\n            <!-- cta button section -->\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"unless","hash":{},"fn":container.program(56, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":132,"column":12},"end":{"line":142,"column":23}}})) != null ? stack1 : "")
    + "            \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isJourneyEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(59, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":144,"column":12},"end":{"line":158,"column":19}}})) != null ? stack1 : "")
    + "\n            <button class=\"show-advanced-options capital-letter\" type=\"button\" data-toggle=\"collapse\" data-target=\"#advanced-cat-content\">advanced</button>\n            <div id=\"advanced-cat-content\" class=\"collapse\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"isAsset") : depth0),{"name":"unless","hash":{},"fn":container.program(61, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":162,"column":16},"end":{"line":172,"column":27}}})) != null ? stack1 : "")
    + "                <div class=\"block\">\n                    <div class=\"title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"tags",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":174,"column":39},"end":{"line":174,"column":54}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tags that best describe this category",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":175,"column":43},"end":{"line":175,"column":95}}}))
    + ".</div>\n                    <div class=\"add_tags\">\n                        <input type=\"text\" class=\"add_tag trim-input\" placeholder=\"Tag\" autocomplete=\"off\" />\n                        <div class=\"save_tag rippleEffect capital-letter\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"add tag",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":178,"column":74},"end":{"line":178,"column":92}}}))
    + "</div>\n                        <div class=\"suggestion_tags\">\n                            <ul></ul>\n                        </div>\n                    </div><br>\n                    <div class=\"input_wrap\">\n                        <div class=\"category_tags\">\n                            <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"tags") : stack1),{"name":"each","hash":{},"fn":container.program(63, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":186,"column":28},"end":{"line":188,"column":37}}})) != null ? stack1 : "")
    + "                            </ul>\n                        </div>\n                    </div>\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"showRestrictionOption") : depth0),{"name":"if","hash":{},"fn":container.program(65, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":193,"column":16},"end":{"line":231,"column":23}}})) != null ? stack1 : "")
    + "                <div class=\"block\">\n                    <div class=\"title capitalize-text\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"end of life",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":233,"column":55},"end":{"line":233,"column":77}}}))
    + "</div>\n                    <div class=\"input_wrap\">\n                        <input type=\"text\" placeholder=\"Click to select date-time\" class=\"datepicker-here\" id=\"section_expire_at\" readonly=\"true\" data-position=\"top right\" data-timepicker=\"true\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"eolExpireAt") : depth0),{"name":"if","hash":{},"fn":container.program(77, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":235,"column":195},"end":{"line":235,"column":250}}})) != null ? stack1 : "")
    + " />\n                        <div>&nbsp;</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"popup-footer\">\n            <div class=\"form-footer\">\n                <div class=\"cancel rippleEffect\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":243,"column":49},"end":{"line":243,"column":66}}}))
    + "</div>\n                <input type=\"submit\" class=\"save\" value=\""
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"SAVE",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":244,"column":57},"end":{"line":244,"column":72}}}))
    + "\" />\n            </div>\n            <div class=\"form-failed\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":246,"column":37},"end":{"line":246,"column":67}}}))
    + "</div>\n            <div class=\"form-sent\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":247,"column":35},"end":{"line":247,"column":65}}}))
    + "</div>\n            <div class=\"form-sending\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":248,"column":38},"end":{"line":248,"column":55}}}))
    + "...<div class=\"cd-loading\"></div></div>\n        </div>\n    </form>\n</div>\n<div class=\"cta-form\"></div>\n<div class=\"journey-form\"></div>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/section-journey-list.handlebars":
/*!************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/section-journey-list.handlebars ***!
  \************************************************************************************/
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

  return "	<li class=\"section-joureny-list\">\n		<div class= \"list-item\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n			<div class=\"name\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n			<div class=\"journey-link-remove\">Remove</div>\n		</div>\n		<div class=\"journey-link-drag no-action ui-sortable-handle\"></div>\n	</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"journeyList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/slide-info.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/slide-info.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"slide_info_details\">\r\n			<div class=\"info_version\">v"
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"version") : depth0), depth0))
    + "<span class=\"slide_info_separator\">-</span></div>\r\n			<div class=\"slide_details\">\r\n"
    + ((stack1 = container.hooks.blockHelperMissing.call(depth0,alias1((depth0 != null ? lookupProperty(depth0,"actions") : depth0), depth0),{"name":"actions","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":14,"column":16}}})) != null ? stack1 : "")
    + "			</div>\r\n		</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<div class=\"slide_activity_detail\">\r\n						<span class=\"slide_info_label\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"action") : depth0), depth0))
    + " on</span>\r\n						<span class=\"slide_activity_date\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/localTime.js */ "./sharedemos/static/js/helpers/handlebars/localTime.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"activity_date") : depth0),{"name":"localTime","hash":{},"data":data,"loc":{"start":{"line":11,"column":40},"end":{"line":11,"column":67}}}))
    + " </span>\r\n						by <span class=\"slide_activity_by\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"user_name") : depth0), depth0))
    + ".</span>\r\n					</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- slide Info -->\r\n<div class=\"slide_info\">\r\n	<div class=\"info_arrow\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"activities") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":1},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/slide-settings.handlebars":
/*!******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/slide-settings.handlebars ***!
  \******************************************************************************/
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

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":31},"end":{"line":8,"column":55}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different image file to replace the image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":15},"end":{"line":10,"column":76}}}))
    + "(.jpg, .jpeg, .png, .gif, .bmp)\n            </div>  \n            <input type=\"file\" id='replace-image' accept=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"image_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='image' />\n            <img class=\"drag\" />\n            <div class=\"file-name\"></div>\n            <label for=\"replace-image\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":60},"end":{"line":15,"column":77}}}))
    + "</label>\n            <div class=\"error-message\"></div>\n        </div>\n        <div class=\"block\">\n            <div class=\"title\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_background_audio") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":19,"column":31},"end":{"line":19,"column":108}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":109},"end":{"line":19,"column":125}}}))
    + "</div>\n            <div class=\"sub-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_background_audio") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":25,"column":23}}})) != null ? stack1 : "")
    + "            </div>  \n            <input type=\"file\" id='add-replace-audio' accept=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"audio_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='audio' />\n            <label for=\"add-replace-audio\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"BROWSE",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":64},"end":{"line":28,"column":81}}}))
    + "</label>\n            <div class=\"img-audio file-name\"></div>\n            <div class=\"error-message\"></div> \n        </div>       \n";
},"2":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":59},"end":{"line":19,"column":73}}}));
},"4":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"replace",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":83},"end":{"line":19,"column":101}}}));
},"6":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose an audio to use as image back ground audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":22,"column":16},"end":{"line":22,"column":76}}}))
    + "(.wav, .mp3)\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose a different audio file to replace the existing audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":16},"end":{"line":24,"column":86}}}))
    + "(.wav, .mp3)\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":31},"end":{"line":35,"column":55}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different audio file to replace the existing audio",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":15},"end":{"line":37,"column":85}}}))
    + "(.wav, .mp3)\n            </div>  \n            <input type=\"file\" id='replace-audio-file' accept=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"audio_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='audio' />\n            <div class=\"file-name\"></div>\n            <label for=\"replace-audio-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":65},"end":{"line":41,"column":82}}}))
    + "</label>\n            <div class=\"error-message\"></div>\n        </div>\n        <div class=\"block\">\n            <div class=\"title\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_cover") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":45,"column":31},"end":{"line":45,"column":97}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"audio cover",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":98},"end":{"line":45,"column":120}}}))
    + "</div>\n            <div class=\"sub-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_cover") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":47,"column":16},"end":{"line":51,"column":23}}})) != null ? stack1 : "")
    + "            </div>  \n            <input type=\"file\" id='add-replace-cover' accept=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"image_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='image' />\n            <img class=\"drag\" />\n            <div class=\"file-name\"></div>\n            <label for=\"add-replace-cover\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":64},"end":{"line":56,"column":81}}}))
    + "</label>\n            <div class=\"error-message\"></div> \n        </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose an image to use as audio cover",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":48,"column":16},"end":{"line":48,"column":64}}}))
    + "(.jpg, .jpeg, .png, .gif, .bmp)\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose a different image to replace existing audio cover",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":16},"end":{"line":50,"column":83}}}))
    + "(.jpg, .jpeg, .png, .gif, .bmp)\n";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":62,"column":31},"end":{"line":62,"column":55}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different video file to replace the existing video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":64,"column":15},"end":{"line":64,"column":85}}}))
    + "(.mp4, .wmv, .mpeg4)\n            </div>  \n            <input type=\"file\" id='replace-video-file' accept=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"video_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='video' />\n            <div class=\"file-name\"></div>\n            <label for=\"replace-video-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":68,"column":65},"end":{"line":68,"column":82}}}))
    + "</label>\n            <div class=\"error-message\"></div>\n        </div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace embed video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":74,"column":31},"end":{"line":74,"column":61}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace this existing video with another embedded video using a url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":76,"column":15},"end":{"line":76,"column":93}}}))
    + ".\n            </div> \n            <div class=\"video-link\">\n                <input type=\"text\" class=\"url_input\" name=\"replace_resource\" placeholder=\"Youtube, Vimeo or BrightCove url\" autocomplete=\"off\" media-type='embed' />\n            </div>\n            <div class=\"error-message\"></div>\n        </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace link",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":86,"column":31},"end":{"line":86,"column":54}}}))
    + "</div>\n            <div class=\"sub-title\">\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace this link with another link using a destination url",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":88,"column":16},"end":{"line":88,"column":86}}}))
    + ".\n            </div> \n            <div class=\"url-link\">\n                <input type=\"text\" class=\"url_input\" name=\"replace_resource\" placeholder=\"enter a link\" autocomplete=\"off\" media-type=\"link\" />\n            </div>\n            <div class=\"error-message\"></div> \n        </div>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"footer icon",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":98,"column":31},"end":{"line":98,"column":53}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose an icon or image to be presented at the footer of the page",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":100,"column":15},"end":{"line":100,"column":91}}}))
    + ".\n            </div>  \n            <input type=\"file\" id='replace-image' accept=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"image_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='image' />\n            <img class=\"drag\" id='footer-image'/>\n            <div class=\"file-name\"></div>\n            <label for=\"replace-image\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":105,"column":60},"end":{"line":105,"column":77}}}))
    + "</label>\n            <div class=\"error-message\"></div>\n        </div>     \n        <div class=\"block\">\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":109,"column":47},"end":{"line":109,"column":69}}}))
    + "<div class=\"counter\">(<span id=\"footer-description-counter\">200</span> "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":109,"column":140},"end":{"line":109,"column":166}}}))
    + ")</div></div>\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"provide a footer text for all the pages in this frame",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":110,"column":35},"end":{"line":110,"column":99}}}))
    + ".</div>\n            <div class=\"input_wrap\">\n                <textarea name=\"footer\" class=\"footer-description trim-input\" id='footer-text' maxlength=\"200\" placeholder=\"Footer\"></textarea>\n            </div>\n        </div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"block\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":118,"column":35},"end":{"line":118,"column":57}}}))
    + "</div>\n                <div class=\"sub-title\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different pdf file to replace the existing pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":120,"column":20},"end":{"line":120,"column":86}}}))
    + "\n                </div>  \n                <input type=\"file\" id='replace-pdf' accept=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"pdf_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='pdf' />\n                <img class=\"drag\" src=\"/static/images/pdf-thumb.png\"/>\n                <div class=\"file-name\"></div>\n                <label for=\"replace-pdf\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":125,"column":62},"end":{"line":125,"column":79}}}))
    + "</label>\n                <div class=\"error-message\"></div>\n            </div>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"block\">\n                <div class=\"title\">name</div>\n                <div class=\"sub-title\">choose a name for this file.</div>\n                <div class=\"input_wrap\">\n                    <input type=\"text\" name=\"file_name\" class=\"section-name trim-input\" maxlength=\"110\" autocomplete=\"off\" placeholder=\"Name\" value=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n                    <div class=\"counter\"><span data-counter=\"\">110</span> <span>characters Left</span></div>\n                </div>            \n            </div>\n            <div class=\"block file\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"replace file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":139,"column":35},"end":{"line":139,"column":58}}}))
    + "</div>\n                <div class=\"sub-title\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"choose a different file to replace the existing file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":141,"column":20},"end":{"line":141,"column":83}}}))
    + "\n                </div>  \n                <input type=\"file\" id='replace-file' accept=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"fileOptions") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type=\"file\" />\n                <div class=\"file-name\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"fileName") : depth0), depth0))
    + "</div>\n                <label for=\"replace-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":145,"column":63},"end":{"line":145,"column":80}}}))
    + "</label>\n                <div class=\"error-message\"></div>\n            </div>\n            <div class=\"block "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":148,"column":30},"end":{"line":148,"column":60}}})) != null ? stack1 : "")
    + "\">\n                <div class=\"title\">upload image/icon</div>\n                <div class=\"sub-title\">upload an image/icon to go with your file.</div>\n                <input type=\"file\" class=\"drag-file\" id=\"upload-file\" accept=\"image/*\" name=\"file_cover_image\">\n                <img class=\"drag\" id=\"upload-file-preview\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":152,"column":59},"end":{"line":152,"column":96}}})) != null ? stack1 : "")
    + ">\n                <div class=\"file-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":153,"column":39},"end":{"line":153,"column":71}}})) != null ? stack1 : "")
    + "</div>\n                <label id=\"remove-img\">remove</label>\n                <label for=\"upload-file\" class=\"rippleEffect\">upload file</label>\n            </div>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "image-added";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\"";
},"30":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0));
},"32":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"block\">\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace ppt",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":160,"column":35},"end":{"line":160,"column":57}}}))
    + "</div>\n                <div class=\"sub-title\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different ppt file to replace the existing ppt",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":162,"column":20},"end":{"line":162,"column":86}}}))
    + "\n                </div>  \n                <input type=\"file\" id='replace-ppt' accept=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"ppt_options") : depth0), depth0))
    + "\" name=\"replace_resource\" media-type='ppt' />\n                <img class=\"drag\" src=\"/static/images/author/slide_icon_ppt.png\"/>\n                <div class=\"file-name\"></div>\n                <label for=\"replace-ppt\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":167,"column":62},"end":{"line":167,"column":79}}}))
    + "</label>\n                <div class=\"error-message\"></div>\n            </div>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace html code",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":173,"column":31},"end":{"line":173,"column":59}}}))
    + "</div>\n            <div class=\"sub-title\">\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"paste your new iframe html below",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":175,"column":16},"end":{"line":175,"column":59}}}))
    + ".\n            </div> \n            <div class=\"url-link\">\n                <input type=\"text\" class=\"url_input sub-title\" name=\"replace_resource\" placeholder=\"enter a iframe\" autocomplete=\"off\" media-type=\"iframe\" />\n            </div>\n            <div class=\"error-message\"></div> \n        </div>\n";
},"36":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace zip",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":185,"column":31},"end":{"line":185,"column":53}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different zip file to replace the existing file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":187,"column":15},"end":{"line":187,"column":82}}}))
    + "\n            </div>  \n            <input type=\"file\" id='replace-zip-file' accept=\".zip, .html\" name=\"replace_resource\" media-type='html5' />\n            <label for=\"replace-zip-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":190,"column":63},"end":{"line":190,"column":80}}}))
    + "</label>\n            <div class=\"file-name\"></div>\n            <div class=\"error-message\"></div>\n        </div>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block\">\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"replace sandbox",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":197,"column":31},"end":{"line":197,"column":57}}}))
    + "</div>\n            <div class=\"sub-title\">\n               "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a different json file to replace the existing file",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":199,"column":15},"end":{"line":199,"column":83}}}))
    + "\n            </div>  \n            <input type=\"file\" id='replace-sandbox-file' accept=\".json\" name=\"replace_resource\" media-type='sandbox' />\n            <label for=\"replace-sandbox-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":202,"column":67},"end":{"line":202,"column":84}}}))
    + "</label>\n            <div class=\"file-name\"></div>\n            <div class=\"error-message\"></div>\n        </div>\n";
},"40":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-title capital-letter\">\n    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"media settings",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":29}}}))
    + "\n</div>\n<form name='replace-media'>\n    <div class=\"content-block replace_media\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_image") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":32,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_audio") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":8},"end":{"line":59,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_video") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":60,"column":8},"end":{"line":71,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_embed") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":8},"end":{"line":83,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_link") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":84,"column":8},"end":{"line":95,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_content") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":8},"end":{"line":115,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_pdf") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":116,"column":8},"end":{"line":128,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replaceFile") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":129,"column":8},"end":{"line":157,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_ppt") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":158,"column":8},"end":{"line":170,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_iframe") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":171,"column":8},"end":{"line":182,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_html5") : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":183,"column":8},"end":{"line":194,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"replace_sandbox") : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":195,"column":8},"end":{"line":206,"column":15}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"popup-footer\">\n        <div class=\"form-footer\">\n            <div class=\"cancel rippleEffect\" rel=\"popup-slide-settings\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":210,"column":72},"end":{"line":210,"column":89}}}))
    + "</div>\n            <input class=\"save rippleEffect\" type=\"submit\" value=\"SAVE\" "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"enableSaveButton") : depth0),{"name":"unless","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":211,"column":72},"end":{"line":211,"column":119}}})) != null ? stack1 : "")
    + " />\n        </div>\n        <div class=\"form-failed\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":214,"column":12},"end":{"line":214,"column":57}}}))
    + "\n        </div>\n        <div class=\"form-sent\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":217,"column":12},"end":{"line":217,"column":42}}}))
    + "\n        </div>\n        <div class=\"form-sending\">\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":220,"column":12},"end":{"line":220,"column":29}}}))
    + "...\n            <div class=\"cd-loading\"></div>\n        </div>\n    </div>\n</form>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/tags.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/tags.handlebars ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<li>\n    <div class='tags' name='tags' value=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "<span class='close'>x</span></div>\n</li>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/edit/video-block.handlebars":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/edit/video-block.handlebars ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"video_id") : depth0), depth0))
    + "\" class=\"video-block row\">\n    <iframe src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"video_src") : depth0), depth0))
    + "\" class=\"col-md-6\" name=\"video\" poster="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"video_poster") : depth0), depth0))
    + "></iframe>\n    <div class=\"col-md-6\">\n        <div class='video-title'>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"video_title") : depth0), depth0))
    + "</div>\n        <div class=\"capital-letter delete-video\" rel=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"video_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":68},"end":{"line":5,"column":85}}}))
    + "</div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/edit.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/edit.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! jcf */ "./sharedemos/static/libs/jcf/jcf.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/box */ "./sharedemos/static/js/tenant/models/box.js"), __webpack_require__(/*! ../models/document_parser */ "./sharedemos/static/js/tenant/models/document_parser.js"), __webpack_require__(/*! ../models/journey_tree */ "./sharedemos/static/js/tenant/models/journey_tree.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../models/section_asset_resource */ "./sharedemos/static/js/tenant/models/section_asset_resource.js"), __webpack_require__(/*! ../models/walkthrough */ "./sharedemos/static/js/tenant/models/walkthrough.js"), __webpack_require__(/*! ../models/icon */ "./sharedemos/static/js/tenant/models/icon.js"), __webpack_require__(/*! ../models/resource */ "./sharedemos/static/js/tenant/models/resource.js"), __webpack_require__(/*! ../models/rte_resource */ "./sharedemos/static/js/tenant/models/rte_resource.js"), __webpack_require__(/*! ../models/cta */ "./sharedemos/static/js/tenant/models/cta.js"), __webpack_require__(/*! ../models/playlist */ "./sharedemos/static/js/tenant/models/playlist.js"), __webpack_require__(/*! ../models/product-tree */ "./sharedemos/static/js/tenant/models/product-tree.js"), __webpack_require__(/*! ../models/slide */ "./sharedemos/static/js/tenant/models/slide.js"), __webpack_require__(/*! ../models/tag */ "./sharedemos/static/js/tenant/models/tag.js"), __webpack_require__(/*! ../models/repository_connector */ "./sharedemos/static/js/tenant/models/repository_connector.js"), __webpack_require__(/*! ../models/repository_listener */ "./sharedemos/static/js/tenant/models/repository_listener.js"), __webpack_require__(/*! ../../apps/bulletin_board/models/bulletin_board */ "./sharedemos/static/js/apps/bulletin_board/models/bulletin_board.js"), __webpack_require__(/*! ../templates/edit/editpopup.handlebars */ "./sharedemos/static/js/tenant/templates/edit/editpopup.handlebars"), __webpack_require__(/*! ../../apps/bulletin_board/templates/create-bulletin.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/create-bulletin.handlebars"), __webpack_require__(/*! ../../apps/bulletin_board/templates/bulletin-board-links.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/bulletin-board-links.handlebars"), __webpack_require__(/*! ../../apps/bulletin_board/templates/site-map/main.handlebars */ "./sharedemos/static/js/apps/bulletin_board/templates/site-map/main.handlebars"), __webpack_require__(/*! ../templates/edit/film-strip.handlebars */ "./sharedemos/static/js/tenant/templates/edit/film-strip.handlebars"), __webpack_require__(/*! ../templates/edit/section-form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/section-form.handlebars"), __webpack_require__(/*! ../templates/edit/cta/form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/cta/form.handlebars"), __webpack_require__(/*! ../templates/edit/journey-list.handlebars */ "./sharedemos/static/js/tenant/templates/edit/journey-list.handlebars"), __webpack_require__(/*! ../templates/edit/section-journey-list.handlebars */ "./sharedemos/static/js/tenant/templates/edit/section-journey-list.handlebars"), __webpack_require__(/*! ../templates/edit/cta/list.handlebars */ "./sharedemos/static/js/tenant/templates/edit/cta/list.handlebars"), __webpack_require__(/*! ../templates/edit/playlist-form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/playlist-form.handlebars"), __webpack_require__(/*! ../templates/edit/demo-form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/demo-form.handlebars"), __webpack_require__(/*! ../templates/edit/notes-form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/notes-form.handlebars"), __webpack_require__(/*! ../templates/edit/new-slide-options.handlebars */ "./sharedemos/static/js/tenant/templates/edit/new-slide-options.handlebars"), __webpack_require__(/*! ../templates/edit/product-edit-block.handlebars */ "./sharedemos/static/js/tenant/templates/edit/product-edit-block.handlebars"), __webpack_require__(/*! ../templates/edit/section-edit-block.handlebars */ "./sharedemos/static/js/tenant/templates/edit/section-edit-block.handlebars"), __webpack_require__(/*! ../templates/edit/video-block.handlebars */ "./sharedemos/static/js/tenant/templates/edit/video-block.handlebars"), __webpack_require__(/*! ../templates/edit/hotspot.handlebars */ "./sharedemos/static/js/tenant/templates/edit/hotspot.handlebars"), __webpack_require__(/*! ../templates/edit/slide-settings.handlebars */ "./sharedemos/static/js/tenant/templates/edit/slide-settings.handlebars"), __webpack_require__(/*! ../templates/edit/tags.handlebars */ "./sharedemos/static/js/tenant/templates/edit/tags.handlebars"), __webpack_require__(/*! ../templates/pin.handlebars */ "./sharedemos/static/js/tenant/templates/pin.handlebars"), __webpack_require__(/*! ../templates/edit/content-editor.handlebars */ "./sharedemos/static/js/tenant/templates/edit/content-editor.handlebars"), __webpack_require__(/*! ../templates/edit/content-layout.handlebars */ "./sharedemos/static/js/tenant/templates/edit/content-layout.handlebars"), __webpack_require__(/*! ../templates/edit/slide-info.handlebars */ "./sharedemos/static/js/tenant/templates/edit/slide-info.handlebars"), __webpack_require__(/*! ../templates/edit/document-parser-form.handlebars */ "./sharedemos/static/js/tenant/templates/edit/document-parser-form.handlebars"), __webpack_require__(/*! ../templates/edit/repository_manager/connector-list-popup.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list-popup.handlebars"), __webpack_require__(/*! ../templates/edit/repository_manager/connector-list.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/connector-list.handlebars"), __webpack_require__(/*! ../templates/edit/repository_manager/folder-list-popup.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/folder-list-popup.handlebars"), __webpack_require__(/*! ../templates/edit/repository_manager/main-folder.handlebars */ "./sharedemos/static/js/tenant/templates/edit/repository_manager/main-folder.handlebars"), __webpack_require__(/*! ../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js"), __webpack_require__(/*! ./home */ "./sharedemos/static/js/tenant/views/home.js"), __webpack_require__(/*! ./slide */ "./sharedemos/static/js/tenant/views/slide.js"), __webpack_require__(/*! ./section-list */ "./sharedemos/static/js/tenant/views/section-list.js"), __webpack_require__(/*! atwho */ "./sharedemos/static/libs/jquery-atwho/jquery.atwho.min.js"), __webpack_require__(/*! cookies */ "./sharedemos/static/js/helpers/cookies.js"), __webpack_require__(/*! jquery.ui */ "./sharedemos/static/libs/jquery-ui/jquery-ui.min.js"), __webpack_require__(/*! airDatepicker */ "./sharedemos/static/libs/air-datepicker/js/datepicker.min.js"), __webpack_require__(/*! airDatepickerEn */ "./sharedemos/static/libs/air-datepicker/js/lang/datepicker.en.js"), __webpack_require__(/*! jquery.nicescroll */ "./sharedemos/static/libs/jquery-nicescroll/jquery.nicescroll.min.js"), __webpack_require__(/*! colpick */ "./sharedemos/static/libs/colpick/colpick.js"), __webpack_require__(/*! jquery.select2 */ "./sharedemos/static/libs/jquery-select2/select2.min.js"), __webpack_require__(/*! jcf.scrollable */ "./sharedemos/static/libs/jcf/jcf.scrollable.js"), __webpack_require__(/*! froalaeditor */ "./sharedemos/static/libs/froala/js/froala_editor.min.js"), __webpack_require__(/*! froalaalign */ "./sharedemos/static/libs/froala/js/plugins/align.min.js"), __webpack_require__(/*! froalacharcounter */ "./sharedemos/static/libs/froala/js/plugins/char_counter.min.js"), __webpack_require__(/*! froalacodeview */ "./sharedemos/static/libs/froala/js/plugins/code_view.min.js"), __webpack_require__(/*! froalacolors */ "./sharedemos/static/libs/froala/js/plugins/colors.min.js"), __webpack_require__(/*! froalaembedly */ "./sharedemos/static/libs/froala/js/third_party/embedly.min.js"), __webpack_require__(/*! froalaemoticons */ "./sharedemos/static/libs/froala/js/plugins/emoticons.min.js"), __webpack_require__(/*! froalaentities */ "./sharedemos/static/libs/froala/js/plugins/entities.min.js"), __webpack_require__(/*! froalafontfamily */ "./sharedemos/static/libs/froala/js/plugins/font_family.min.js"), __webpack_require__(/*! froalafontsize */ "./sharedemos/static/libs/froala/js/plugins/font_size.min.js"), __webpack_require__(/*! froalaforms */ "./sharedemos/static/libs/froala/js/plugins/forms.min.js"), __webpack_require__(/*! froalafullscreen */ "./sharedemos/static/libs/froala/js/plugins/fullscreen.min.js"), __webpack_require__(/*! froalahelp */ "./sharedemos/static/libs/froala/js/plugins/help.min.js"), __webpack_require__(/*! froalaimage */ "./sharedemos/static/libs/froala/js/plugins/image.min.js"), __webpack_require__(/*! froalainlinestyle */ "./sharedemos/static/libs/froala/js/plugins/inline_style.min.js"), __webpack_require__(/*! froalalinebreaker */ "./sharedemos/static/libs/froala/js/plugins/line_breaker.min.js"), __webpack_require__(/*! froalalink */ "./sharedemos/static/libs/froala/js/plugins/link.min.js"), __webpack_require__(/*! froalalists */ "./sharedemos/static/libs/froala/js/plugins/lists.min.js"), __webpack_require__(/*! froalaparagraphformat */ "./sharedemos/static/libs/froala/js/plugins/paragraph_format.min.js"), __webpack_require__(/*! froalaparagraphstyle */ "./sharedemos/static/libs/froala/js/plugins/paragraph_style.min.js"), __webpack_require__(/*! froalaprint */ "./sharedemos/static/libs/froala/js/plugins/print.min.js"), __webpack_require__(/*! froalaquickinsert */ "./sharedemos/static/libs/froala/js/plugins/quick_insert.min.js"), __webpack_require__(/*! froalaquote */ "./sharedemos/static/libs/froala/js/plugins/quote.min.js"), __webpack_require__(/*! froalasave */ "./sharedemos/static/libs/froala/js/plugins/save.min.js"), __webpack_require__(/*! froalaspecialcharacters */ "./sharedemos/static/libs/froala/js/plugins/special_characters.min.js"), __webpack_require__(/*! froalatable */ "./sharedemos/static/libs/froala/js/plugins/table.min.js"), __webpack_require__(/*! froalaurl */ "./sharedemos/static/libs/froala/js/plugins/url.min.js"), __webpack_require__(/*! froalavideo */ "./sharedemos/static/libs/froala/js/plugins/video.min.js"), __webpack_require__(/*! froalawordpaste */ "./sharedemos/static/libs/froala/js/plugins/word_paste.min.js"), __webpack_require__(/*! froalafontawesome */ "./sharedemos/static/libs/froala/js/third_party/font_awesome.min.js"), __webpack_require__(/*! froalalineheight */ "./sharedemos/static/libs/froala/js/plugins/line_height.min.js"), __webpack_require__(/*! froalauploadfile */ "./sharedemos/static/libs/froala/js/plugins/file.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, jcf, Backbone, Common, BoxApi, DocumentParser, JourneyTree, Section, SectionAssetResource, Walkthrough, Icon, Resource, RteResource, Cta, Playlist, ProductTree, Slide, Tags, RepositoryConnector, RepositoryListener, BulletinBoard, EditTemplate, CreateBulletin, BulletinBoardLinks, BulletinMainSiteMap, FilmStrip, SectionForm, CtaForm, JourneyList, SectionJourneyList, CtaList, PlaylistForm, DemoForm, NotesForm, NewSlideOptions, ProductBlock, SectionBlock, VideoBlock, Hotspot, SlideSettings, TagTemplate, Pin, ContentEditor, ContentLayout, SlideInfo, DocumentParserTemplate, RepositoryConnectorListPopup, RepositoryConnectorList, ConnectorFolderListPopup, ConnectorFolderTree, Translate, HomeView, SlideView, SectionListView, atwho) {
  'use strict';

  var EditView = Backbone.View.extend({
    // ALL CAPS Variables are used for constants and config
    el: '#edit_container',
    cm: Common,
    template: EditTemplate,
    filmStrip: FilmStrip,
    newSlideOptions: NewSlideOptions,
    productBlock: ProductBlock,
    sectionBlock: SectionBlock,
    videoBlock: VideoBlock,
    sectionForm: SectionForm,
    demoForm: DemoForm,
    notesForm: NotesForm,
    hotSpot: Hotspot,
    SlideSettings: SlideSettings,
    contentEditor: ContentEditor,
    contentLayout: ContentLayout,
    slideInfo: SlideInfo,
    timerId: null,
    ALLOWED_IMAGE_FORMATS: ['.gif, .jfif, .jpg, .jpeg, .png, .bmp'],
    ALLOWED_AUDIO_FORMATS: ['.mp3, .webm, .ogg'],
    ALLOWED_VIDEO_FORMATS: ['.mp4, .webm, .ogg'],
    ALLOWED_DOC_FORMATS: ['.pdf'],
    ALLOWED_PPT_FORMATS: ['.ppt', '.pptx'],
    ALLOWED_FILE_FORMATS: ['.ppt', '.pptx', '.pdf', '.zip', '.jpg', '.gif', '.jpeg', '.mp3', '.mp4', '.webm', '.ogg', '.txt', '.doc', '.docx'],
    CHAPTERS_LIST: [],
    SITE_MAP_DATA: null,
    PLACEHOLDER_TEXT: 'Click to edit',
    SECTION_TITLE_LIMIT: 110,
    PLAYLIST_TITLE_LIMIT: 85,
    CHAPTER_TITLE_LIMIT: 85,
    NOTES_LINK_TITLE_LIMIT: 25,
    SECTION_DESCRIPTION_LIMIT: 260,
    SECTION_ASSET_URL_LIMIT: 255,
    PLAYLIST_DESCRIPTION_LIMIT: 250,
    DEFAULT_FILE_ICON: "/static/images/thumb-file.jpg",
    NO_RECORDS_TEXT: 'No content added yet!',
    events: {
      'click .header .hidden-xs .logo, .search-categories .search-data a.search-links': function () {
        Common.closeSearchBox();
      },
      'click .exit': 'exitEdit',
      'click .publish': 'confirmPublish',
      'click .confirm-publish': 'publishChapter',
      'click .edit-controls .delete-items': 'showDeleteMultipleItemsPopup',
      'click .confirm-delete-multiple-chapters': 'confirmDeleteMultipleChapters',
      'click .confirm-delete-multiple-playlists': 'confirmDeleteMultiplePlaylists',
      'click .edit-controls .select-all-items:not(.disable)': 'selectAllItems',
      'click .edit-controls .deselect-all-items': 'deselectAllItems',
      'click .preview': 'previewDemo',
      'focusout .trim-input': 'trimInput',
      'click #box-content-list input[type=checkbox]': 'addRemoveSelection',
      'keyup .section-name, .section-description, .callout-description, \
                   .edit-playlist-title, .edit-playlist-desc, .edit-pwt-title, \
                   #advanced-notes-content .notes-link-title, \
                   .custom-url-block .section-url': 'updateCharCount',
      // bulletin board related events
      'click .create-new-bulletin, .edit-bulletin-board': 'createEditBulletinBoard',
      'click .trigger-inplace-popup': 'updatePopupTexts',
      'click .bulletin-browse-link-btn': 'renderBulletinSiteMap',
      'click .enable-bulletin-board': 'showEnableDisableBulletinBoard',
      'click .enable-bboard .enable, .disable-bboard .disable': 'enableDisableBulletinBoard',
      'click .delete-bboard': 'showDeleteBulletinBoard',
      'click .delete-bulletin-board .delete': 'deleteBulletinBoard',
      'click .add-external-link': 'addExternalLink',
      'click .bulletin-browse-link-popup .save': 'addInternalLink',
      'click .edit-bulletin-link': 'editExternalLink',
      'click .remove-bulletin-link': 'removeBulletinLink',
      'click .duplicate-bulletin-board': 'showDuplicateBulletinBoard',
      'click .duplicate': 'duplicateBulletinBoard',
      'submit form[name=bulletin-board-data]': 'submitBulletinBoardDetails',
      'mouseover .sitemap-tree li div': 'showSiteMapOptions',
      'mouseout .sitemap-tree li div': 'hideSiteMapOptions',
      'change #bulltein-sitemap .css-checkbox': 'updateAddButtonText',
      'click .bulletin-board-block .edit-hamburger, \
                    .hide-bulletinboard-options': 'toggleBulletinEditOptions',
      //section related event
      'click .create-new:not(.slide)': 'showCreateLayout',
      'click .close_selection_layout': 'hideCreateLayout',
      'click .popup-edit .cancel': 'hideEditPopup',
      'submit form[name=default-section-data], form[name=asset-section-data]': 'submitSectionDetails',
      'click .popup-edit .upload-section-video': 'previewSectionVideo',
      'click .delete-video': 'deleteSectionVideo',
      'change #upload-file': 'previewIcon',
      'change #upload-link-file': 'uploadAsset',
      'click #remove-img, #remove-asset, #remove-file': 'removeAsset',
      'input .custom-url-block .section-url': 'updateCustomUrl',
      'click .notes-link-url': 'showNotesLinkUpload',
      'click .box-category-option .select-cat-option': 'showCategoryLayoutCloseBox',
      'click .layouts .repository-category': 'showRepositoryConnectorList',
      'click .repository-connector-list .connector-item.active': 'getRepositoryConnectorFolders',
      'click .connector-folder input[type=checkbox]': 'toggleConnectorFolderSelection',
      'click .connector-folder-list-popup .link-selected-repository-folder': 'startCreatingConnectorFolders',
      'click .box-category-option .select-box-option, .import_box_block': 'getBoxData',
      'submit form[name=box_content_form]': 'saveBoxEntries',
      'click .duplicate-section': 'duplicateSection',
      //section manupulations functions
      'click .category_layout_block:not(.disabled)': 'createNewCategory',
      'click .cancel, .continue': 'hidePopup',
      'click .pwt-box .edit-hamburger, .pwt-box .edit-hamburger *': 'showEditOptions',
      'click .edit .enable': 'showEnableDisablePopup',
      'click .choose-category-type .category-options': 'showCategoryLayoutCloseType',
      'click .oedit': 'createEditSection',
      'click .edit .delete': 'showDeleteSectionPopup',
      'click .popup-enable .enable': 'enableSection',
      'click .popup-disable .disable': 'disableSection',
      'click .popup-delete .delete': 'deleteSection',
      // doc-parser
      'click .import_doc_block, .show-layout-popup': 'toggleDocumentParserPopup',
      'change .document-upload': 'uploadContentFiles',
      'dragover .document-parser-drop-zone': 'preventDefaultDragover',
      'dragleave .document-parser-drop-zone': 'deactiveContentDocDropZone',
      'drop .document-parser-drop-zone': 'uploadContentDoc',
      //CTA events
      'click div.create-cta-btn label[for=create-cta]': 'showCreateCTAPopup',
      'click div.cancel-cta': 'hideCreateCTAPopup',
      'change input[name=cta_type]': function () {
        this.$('.create-cta-block .block').toggleClass('disabled');
      },
      'click .popup-footer div.save-cta-btn': 'addCtaDetails',
      'click .cta-delete-button': 'removeCTA',
      'click .cta-edit-button': 'editCTA',
      'change #upload-cta-file': 'validateCtaPdf',
      //Section Journey Event
      'click div.browse-journey': 'showJourenyPopup',
      'click div.journey-back': 'hideJourneyPopup',
      'click div.save-selected-journeys': 'selectJourneys',
      'click .journey-link-remove': 'removeJourneyLink',
      //Tags and CTA for sections
      'keyup .add_tag': 'getTagSuggesions',
      'click .suggestion_tags ul li': 'selectTagFromSuggestion',
      'click .tags .close': 'removeTag',
      'click form[name="default-section-data"] .save_tag, \
                   form[name="asset-section-data"] .save_tag, \
                   form[name="walkthrough-data"] .save_tag': 'createTag',
      'keyup input[type=url]': 'updateUrl',
      'click #list-playlist-name': function () {
        Common.toggleDropDownDisplay();
      },
      'click .dropdown-list li': 'selectPlayListFromDropDown',
      'click .show-advanced-options': 'scrollToAdvancedOptions',
      // Playlist functions
      'click .playlist_layout_block:not(.disabled)': 'createPlaylist',
      'click .playlist-left .edit-hamburger': 'showPlayListOptions',
      'submit form[name=playlist-data]': 'savePlaylist',
      'click .edit-plist': 'editPlaylist',
      'click .enable-plist': 'showEnableDisablePlaylist',
      'click .delete-plist': 'showDeletePlaylist',
      'click .enable-playlist .enable': 'enablePlaylist',
      'click .disable-playlist .disable': 'disablePlaylist',
      'click .delete-playlist .delete': 'deletePlaylist',
      'click .playlist-left .select-playlist': 'selectMultiplePlaylists',
      //Demo list functions
      'submit form[name=walkthrough-data]': 'saveChapter',
      'click .chapter-edit-hamburger': 'toggleChapterEditOptions',
      'click .chapter-enable': 'toggleEnableDisableChapter',
      'click .popup-enable-chapter .enable': 'enableChapter',
      'click .popup-disable-chapter .disable': 'disableChapter',
      'click .chapter-delete': 'showDeleteChapterPopup',
      'click .popup-delete-chapter .delete': 'deleteChapter',
      'click .chapter-duplicate': 'duplicateChapter',
      'click li .select-chapter': 'selectMultipleChapters',
      //Player functions
      'click .demo_layout_block:not(.disabled)': 'createNewDemo',
      'click .wt-title-edit:not(.disabled), .chapter-edit, .add-new-chapter': 'showCreateChapter',
      'click .create-new.slide': 'showAddSlide',
      'click div[type=slide_options_close]': 'hideAddSlide',
      'click .new_slide_options .options': 'showAddSlideOption',
      'click .slide_options .close': 'hideAddSlideOption',
      'click .resourceUrl': 'showUploadUrl',
      'click .upload_media_block .uploadFile': 'hideUploadUrl',
      'dragover .drag': 'dragOverNewSlide',
      'click div[type=slide_settings]': 'showSlideSettings',
      'click div[type=edit-highlighter]': 'toggleHotspotEdit',
      'click div[type=delete-slide]': 'showDeleteSlidePopup',
      'click .popup-delete-media .delete': 'deleteSlide',
      'click .popup-box.popup-save-hotspot .save': 'saveHotspot',
      'click .popup-box.popup-save-hotspot .cancel': 'cancelHotspot',
      'click .hotspot-edit': 'editHotspot',
      'click .hotspot-delete': 'deleteHotspot',
      'click .slide-rearrange': 'toggleSlideRearrange',
      'keydown .notes p, .notes h1, .url_input, .pin-tooltip h1, .pin-tooltip p, .content-editor-wrap': function (event) {
        event.stopPropagation();
      },
      'focus .notes p, .notes h1, .pin-tooltip p, .pin-tooltip h1': 'editContentFocus',
      'click .add-new-notes, .notes .edit-notes, .pagination li[data-page="new"]': 'createEditNotes',
      'submit form[name=slide-notes-data]': 'saveSlideNotes',
      'click .notes .delete-notes': 'showNotesDeletePopup',
      'click .popup-delete-notes .delete': 'deleteNotes',
      'blur .pin-tooltip p, .pin-tooltip h1': 'updatePinNotes',
      'click div[type=edit-drop-pin]': 'togglePinEdit',
      'click [slide-type=image].pin-cursor, [slide-type=360] .product-frame.pin-cursor': 'locatePin',
      'click .pin-delete': 'deletePin',
      'change .slide-file': 'previewSlideMedia',
      'change #add-slide-360-frames': 'add360SlideFrames',
      'change #upload-notes-link-file': 'previewNotesLinkResource',
      'click .url_upload': 'urlMediaUpload',
      'keyup .url_input': 'updateUrl',
      'blur .popup-slide-settings .url_input': 'updateUrl',
      'keyup .popup-slide-settings .url_input': 'updateUrl',
      'change form[name=replace-media] input[media-type]': 'previewReplaceSlideMedia',
      'submit form[name=replace-media]': 'replaceSlideMedia',
      'change input[name=goto]': 'calloutGoto',
      'click #box-content-list .expandSection': 'toogleSitMapNavigation',
      'click #bulltein-sitemap .expandSection, .connector-folder .expand-folder': 'toogleSitMapSections',
      'mouseenter .slide_information': 'demoInfo',
      'mouseleave .slide_information': 'demoInfo',
      'click  .slides_wraper .slide': 'filmstripSlideNavigation',
      'keyup #hotspot-timer': 'restrictValToNumber',
      'click .content-slide-edit': 'showTextEditor',
      'click .content-done': 'checkContentSaved',
      'click .textedit-exit': 'exitTextEditor',
      'click .try-again': 'retrySaveTextContent',
      'click .layout-selection li': 'selectLayout',
      'click .upload_cancel, .malware-error .close-button': 'displayUploadBox',
      'click .upload_retry': 'retryUpload',
      'click .slide_option_360 .close': 'close360Preview',
      'click .slide_360_frames_wrap li span': 'delete360FrameWarning',
      'click .frame-360-delete-warning .delete': 'delete360Frame',
      'click .done-360:not(.disabled)': 'initiateSaveMultipleImages',

      /* sortable */
      'dragstart .sortable-item': 'sortableDragStarted',
      'dragover .sortable-item, .dropzone': 'sortableDraggingOver',
      'dragleave .sortable-item, .dropzone': 'sortableDraggingLeave',
      'drop .sortable-item, .dropzone': 'sortableElemDropped',
      'dragend .slide_360_frames_wrap ul': 'deleteDropZones',

      /* Restricted Access */
      'click .usr-grps-list .user-group-items': 'selectUserGroups'
    },
    // edit view initial functions
    initialize: function (attrs) {
      $(window).on('resize', {
        'root': this
      }, this.onWindowResize);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      this.listenTo(Backbone, 'view_rendered', this.viewRender);
      this.listenTo(Backbone, 'playlist_rendered', this.playListRender);
      this.listenTo(Backbone, 'player_view_rendered', this.playerViewRender);
      this.listenTo(Backbone, 'slide_changed', this.slideChanged);
      this.listenTo(Backbone, 'before_slide_change', this.disablePinHotspotEdit);
      this.listenTo(Backbone, 'player_menu_height_set', this.resetPlayerLeftMenuHeight);
      this.listenTo(Backbone, 'side_info_opened', this.toggleAddSlideButton);
      this.listenTo(Backbone, 'cta_toggled', this.ctaToggled);
      this.listenTo(Backbone, 'walkthrough_opened', this.resetPlayerOptions);
      this.listenTo(Backbone, 'back_to_playlist', this.resetPlayerOptions);
      this.listenTo(Backbone, 'cta_overlay_opened', this.sectionCtaToggled);
      this.listenTo(Backbone, 'cta_overlay_closed', this.sectionCtaToggled);
      this.listenTo(Backbone, 'notes_changed', this.setNotesEditOptions);
      this.render();
      this.overlayCalc();
      this.refreshEveryHour();
      this.current_view = null;
      this.dragSvgIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve">\
                                    <polygon fill-rule="evenodd" clip-rule="evenodd" points="95,50 83.75,38.75 83.75,44.375 55.625,44.375 55.625,16.25 61.25,16.25   50,5 38.75,16.25 44.375,16.25 44.375,44.375 16.25,44.375 16.25,38.75 5,50 16.25,61.25 16.25,55.625 44.375,55.625 44.375,83.75   38.75,83.75 50,95 61.25,83.75 55.625,83.75 55.625,55.625 83.75,55.625 83.75,61.25 "/>\
                                </svg>';
    },
    onWindowResize: function (e) {
      var root = e.data.root;
      root.overlayCalc();
    },
    render: function () {
      let attrs = {
        repository_manager: document.repository_manager
      };
      this.$('#edit-popups').html(this.template(attrs));
      this.clearLocalStorage(['currentFrameNum', 'framesPath', 'userActions', 'remotePDFUrl']);
      return this;
    },
    initView: function (view) {
      this.product = this.product_id = this.section = this.section_id = this.walkthrough = this.walkthrough_id, this.tenant = null;
      this.current_view = view;

      if (this.current_view) {
        this.product = view.product;
        this.product_id = view.product_id;
        this.section = view.section;
        this.section_id = view.section_id;
        this.walkthrough = view.walkthrough;
        this.walkthrough_id = view.walkthrough_id;
        this.tenant = this.current_view.section && this.current_view.section.get('tenant');

        if (this.tenant.template == 'dell' && this.section.attributes['bulletin_board_list'].length >= 1) {
          this.$('.create-new-bulletin').hide();
        }
      }
    },
    // edit view initial functions
    // Create/Edit section functions
    viewRender: function (view) {
      this.$('.create-new').removeClass('active');
      var viewSection = view.section; // Hide 'Create-New' button for restricted-sections.

      if (viewSection.get('can_edit') != undefined && !viewSection.get('can_edit')) {
        $('.create-new').hide();
        $('.create-new-bulletin').hide();
      } else {
        this.$('.create-new').removeClass('slide').removeAttr('parent').show();
      }

      $('#edit_container .publish, #edit_container .preview').removeAttr('walkthrough').addClass('disable');
      var editOptions = "<div class='edit'>\
                                   <div class='enable no-action rippleEffect'></div>\
                                   <div class='duplicate-section no-action rippleEffect'></div>\
                                   <div class='oedit no-action rippleEffect'></div>\
                                   <div class='delete no-action rippleEffect'></div>\
                               </div>";
      this.$(".pwt-wrap .edit").remove();
      this.$(".pwt-wrap").append(editOptions);
      var editButton = "<div class='right-wrapper'><div class='edit-hamburger no-action'><span class='no-action'></span></div>\
                              <div class='section-drag no-action '>" + this.dragSvgIcon + "</div></div>";
      this.$(".pwt-wrap .right").find('.edit-hamburger, .section-drag').remove();
      this.$(".pwt-wrap .right").append(editButton);
      this.$(".create-section").removeAttr('parent');
      this.initializeSortable();
      this.initializeBulletinBoardSortable();
      this.initView(view);

      if (this.section_id) {
        this.$(".create-new").attr('parent', this.section_id);

        if (this.section && this.section.get('children') && !this.section.get('children').length) {
          this.$(".create-section").attr('parent', this.section_id);
        }
      }
    },
    //intial sortable for section re-ordering
    initializeSortable: function () {
      var root = this;
      this.$(".sortable").sortable({
        placeholder: 'highlight',
        handle: ".section-drag",
        containment: "parent",
        update: function (event, ui) {
          var cur_ele_slug = ui.item.find('.pwt-box').attr('slug');
          var prev_ele_slug = ui.item.prev().find('.pwt-box').attr('slug');
          var section = new Section({
            'id': cur_ele_slug,
            'reorder': 'section',
            'target_parent_slug': root.section && root.section.get('slug') || '',
            'after_ele_slug': prev_ele_slug
          });
          section.save(null, {
            patch: true,
            success: function () {
              root.$(".sortable").sortable("refresh");
            },
            error: function (xhr, status_code, message) {
              root.$(".sortable").sortable("cancel");
            }
          });
        }
      });
    },
    // Initialize Bulletin Board Sortable
    initializeBulletinBoardSortable: function () {
      var root = this;
      this.$('.bulletin-board-sortable').sortable({
        placeholder: 'highlight',
        handle: '.bulletin-board-drag',
        containment: 'parent',
        update: function (event, ui) {
          var choosen_entity_id = ui.item.attr("id");
          var target_entity_id = ui.item.prev().attr("id");
          var bboard = new BulletinBoard({
            "id": choosen_entity_id,
            "target_entity_id": target_entity_id,
            "reorder": "bulletin_board",
            "section_slug": root.section_id
          });
          bboard.save(null, {
            patch: true,
            success: function () {
              root.$(".bulletin-board-sortable").sortable("refresh");
            },
            error: function (xhr, status_code, message) {
              root.$(".bulletin-board-sortable").sortable("cancel");
            }
          });
        }
      });
    },
    initializeBulletinBoardLinkSortable: function () {
      this.$(".bulletin-links-list").sortable({
        placeholder: 'highlight',
        handle: ".bulletin-board-link-drag",
        containment: "parent"
      });
    },
    initializeSectionJourneyLinkSortable: function () {
      this.$(".journey-link-list").sortable({
        placeholder: 'highlight',
        handle: ".journey-link-drag",
        containment: "parent"
      });
    },
    updatePopupTexts: function (event) {
      /** update bulletin board popups text */
      let popUpData = event.currentTarget.dataset;

      if (popUpData.showpopup == "bulletin-browse-link-popup") {
        this.$('.bulletin-browse-link-popup .save').text('save');
      } else if (popUpData.showpopup == "create-bulletin-link-popup") {
        this.$('.create-bulletin-link-popup .popup-title').text('create link');
        this.$('.add-external-link').text('add');
        this.$('#link-title-validation, #link-validation').text('');
        this.$('.create-bulletin-link-popup input').val('');
      }

      this.replacePopup(event);
    },

    /**
     * This is a comman function to hide current popup and show a new popup without animation
     * Comman attribues to pass
     *  ele with class name --> trigger-inplace-popup
     *  ele with hide data attr --> data-hidePopup="popup class name to hide"
     *  ele with show data attr --> data-showPopup="popup class name to show"
     */
    replacePopup: function (event, is_edit = false) {
      let popUpData = event.currentTarget.dataset;

      if (popUpData.showpopup) {
        $(`.${popUpData.showpopup}`).removeClass('hidden');
      }

      if (popUpData.hidepopup) {
        $(`.${popUpData.hidepopup}`).addClass('hidden');
      }
    },

    /**
    * 'End of life' air-datepicker initializer.
    */
    initEolDatePicker: function (element) {
      element.datepicker({
        language: 'en',
        dateFormat: "yyyy-mm-dd",
        minDate: new Date(),
        timeFormat: 'hh:ii aa',
        autoClose: true,
        clearButton: true,
        timepicker: true,
        onSelect: (selectedDate, date, inst) => {
          this.$(inst.el).data('datetime', "");

          if (date) {
            // Set the datetime in the format - 'yyyy-mm-ddThh:mm'.
            this.$(inst.el).data('datetime', date.toISOString().slice(0, 16));
          }
        }
      });
    },

    // Display repository connectors list
    showRepositoryConnectorList() {
      this.popupClose('choose-category-type', true);
      setTimeout(() => {
        this.popupShow('repository-connector-list');
        this.$('.repository-connector-list').html(RepositoryConnectorListPopup);
        Common.getRepositoryConnectorList().then(data => {
          const connectors = data.map(connector => {
            if (connector.site_url.includes('sharepoint')) {
              connector.platform = 'sharepoint';
            }

            return connector;
          });
          this.$('.repository-connector-list-popup .content-block').html(RepositoryConnectorList(connectors));
        }).catch(e => {
          this.$('.repository-connector-list-popup .content-block').html(e.message);
        });
      }, 200);
    },

    // Get all repository folders list 
    getRepositoryConnectorFolders(event) {
      this.$('.connector-folder-list-popup .content-block').show();
      this.$('.connector-folder-list-popup .popup-footer').hide();
      this.$('.connector-folder-list-popup .content-block-list').empty();
      let connectorId = $(event.currentTarget).attr("id"),
          repositoryConnector = new RepositoryConnector({
        id: connectorId
      }),
          root = this;
      repositoryConnector.fetch({
        async: true,
        data: {
          'listing_folders': true
        },

        success(response) {
          root.$('.connector-folder-list-popup .content-block').hide();
          root.$('.connector-folder-list-popup .content-block-list').html(ConnectorFolderTree(response.attributes.folders)).show();
          root.$('.connector-folder-list-popup .popup-footer').show();
          root.$(".link-selected-repository-folder").data({
            "connector-id": connectorId,
            "parent": root.section_id
          });
        },

        error(xhr, status) {
          root.$('.connector-folder-list-popup .content-block, .connector-folder-list-popup .popup-footer').hide();
          root.$('.connector-folder-list-popup .content-block-list').html(status.statusText);
        }

      });
    },

    // select and unselect of repository folders
    toggleConnectorFolderSelection(event) {
      this.$(`.connector-folder input[type=checkbox]:not(#${event.target.id})`).prop('checked', false);
    },

    // start creating section and chapters from repository
    startCreatingConnectorFolders() {
      if (!this.$('.connector-folder input[type=checkbox]:checked').length) {
        return;
      }

      this.actionInProgress('connector-folder-list-popup');
      let listenerData = this.$('.connector-folder input[type=checkbox]:checked').parents("li").data();
      let folderDetails = {
        "connector_id": $(event.target).data("connector-id"),
        "relative_folder_path": listenerData.relativeFolderPath,
        "root_folder": listenerData.rootFolder,
        "parent": $(event.target).data("parent")
      };
      let repositoryListener = new RepositoryListener(folderDetails);
      var root = this;
      repositoryListener.save(null, {
        success() {
          let post_success = () => {
            root.$(".popup-box.repository-connector-list").empty();
          };

          root.actionSuccess('repository-connector-list', post_success);
          if (root.section_id) root.current_view.load(root.section_id, true);else root.current_view = new HomeView();
        },

        error(xhr, status) {
          root.actionFailed('connector-folder-list-popup');
        }

      });
    },

    // Display the category add/edit popup after box-import popup.
    showCategoryLayoutCloseBox: function (event) {
      var root = this;
      this.popupClose('box-category-option', true);
      setTimeout(function () {
        // Display 'Asset-Link'/'Default-Category' option.
        let popupName = 'choose-category-type';
        root.popupShow(popupName);
        root.$('.' + popupName + ' .layouts').attr('show-private', true); // root.createEditSection(event, true);
      }, 200);
    },
    // Display the category add/edit popup after category-type popup.
    showCategoryLayoutCloseType: function (event) {
      this.popupClose('choose-category-type', true);
      var root = this;
      setTimeout(function () {
        root.createEditSection(event);
      }, 200);
    },

    /**
    * Return True if restriction is set in parent entity else false.
    */
    checkIsRestrictionSetInParent: function (section) {
      return section.is_restriction_set_in_parent || section.restricted_to_group_details && section.restricted_to_group_details.length;
    },

    /**
    * Return an object containing restricted to group details.
    * restrictedToGroups    - Array containing selected group names.
    * restrictedToGroupIds  - Array containing selected group ids.
    * userGroupOptions      - Object containg selected group entities.
    * isRestrictionEnabled  - Boolean value.
    */
    getRestrictedToGroupDetails: function (restrictedToGrps, userGroups) {
      let restrictedToGroups = [];
      let restrictedToGroupIds = [];
      let isRestrictionEnabled = false;
      var setDefaultUserGroup = true;
      let userGroupOptions = userGroups;

      if (restrictedToGrps && restrictedToGrps.length) {
        _.each(restrictedToGrps, grp => {
          restrictedToGroups.push(grp.name);
          restrictedToGroupIds.push(grp._id);
        });

        _.each(userGroupOptions, grp => {
          if (restrictedToGroupIds.includes(grp._id)) {
            grp.isChecked = true;
            setDefaultUserGroup = false;
          } else {
            grp.isChecked = false;
          }
        });

        isRestrictionEnabled = true;
      }

      if (setDefaultUserGroup) {
        _.each(userGroupOptions, grp => {
          // Set the default user_group as checked,
          // only if none of the user_groups are selected while getting api-data.  
          if (grp.is_default) {
            grp.isChecked = true;
            restrictedToGroups = [grp.name];
            restrictedToGroupIds = [grp._id];
            isRestrictionEnabled = true;
          }
        });
      } // Set the user-group with admin/author role as checked and disabled.


      _.each(userGroupOptions, grp => {
        if (grp.is_author) {
          grp.isChecked = grp.selectedDisabled = true;
          if ($.inArray(grp.name, restrictedToGroups) == -1) restrictedToGroups.push(grp.name);
          if ($.inArray(grp._id, restrictedToGroupIds) == -1) restrictedToGroupIds.push(grp._id);
        }
      });

      return {
        restrictedToGroups: restrictedToGroups,
        restrictedToGroupIds: restrictedToGroupIds,
        userGroupOptions: userGroupOptions,
        isRestrictionEnabled: isRestrictionEnabled
      };
    },

    /**
    * Displays the popup for creating/editing category/section.
    * Invoked at HomePage/SectionList pages.
    * Invoked directly by 'edit' button on the categories/sections edit-options.
    * When invoked thru 'edit' button, api 'GET' is called and form is prepopulated. 
    */
    createEditSection: function (event) {
      var currentElement = this.$(event.currentTarget);
      var element = currentElement.parent().siblings('.pwt-box.active');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      var showPrivateOption = Boolean(currentElement.parent().attr('show-private'));
      currentElement.parent().removeAttr('show-private');
      var isAsset = currentElement.hasClass('category-link-asset');
      var sectionSlug = element.attr('slug');
      this.$('form[name=default-section-data], form[name=asset-section-data]').removeAttr('section-id disabled');
      var root = this;

      if (sectionSlug) {
        this.fetchAndUpdateSectionPopup(sectionSlug);
      } else {
        var section = new Object();
        section.name_limit = root.SECTION_TITLE_LIMIT;
        section.description_limit = root.SECTION_DESCRIPTION_LIMIT;
        let layoutType = {
          'isEdit': false,
          'isAsset': isAsset
        };
        let options = {
          'showPrivateOption': showPrivateOption,
          'showExportOption': false
        };
        this.updateSectionPopup(section, layoutType, options);
      }

      this.$(".popup-edit input[name=parent]").val(this.section_id);
      this.overlayCalc();
      this.$('.popup-box .content-block').niceScroll();
      this.popupShow("popup-edit");
      this.initEolDatePicker(this.$('#section_expire_at'));
      this.initializeSectionJourneyLinkSortable();
    },

    /**
    * While editing a section, fetch the details using id(slug),
    * call 'updateSectionPopup' to update the edit window with the fetched details.
    * If section has a CTA, fetch and update the CTA details.
    * param:
    *   sectionId   - String slug id.
    */
    fetchAndUpdateSectionPopup: function (sectionId) {
      var root = this;
      var showExportOption = false;
      var section = new Section({
        id: sectionId
      });
      section.fetch({
        async: false,
        success: function (resp) {
          var sectionData = section.attributes;
          var nameLength = sectionData && sectionData.name && sectionData.name.length || 0;
          var descriptionLength = sectionData && sectionData.description && sectionData.description.length || 0;
          sectionData.name_limit = root.SECTION_TITLE_LIMIT - nameLength;
          sectionData.description_limit = root.SECTION_DESCRIPTION_LIMIT - descriptionLength;
          var showPrivateOption = sectionData.parent ? false : true;

          if (sectionData.tenant.can_download) {
            _.filter(sectionData.playlists, function (playlist) {
              if (playlist.is_enabled == true) {
                showExportOption = true;
              }
            });
          }

          let layoutType = {
            'isEdit': true,
            'isAsset': Boolean(sectionData.linked_asset)
          };
          let options = {
            'showPrivateOption': showPrivateOption,
            'showExportOption': showExportOption
          };
          let formName = 'form[name=default-section-data]';

          if (sectionData.linked_asset) {
            let urlLength = sectionData.linked_asset.name && sectionData.linked_asset.name.length || 0;
            sectionData.linked_asset.name_limit = root.SECTION_ASSET_URL_LIMIT - urlLength;
            sectionData.linked_asset.url = window.location.origin + Common.SECTION_ASSET_ROUTE + sectionData.linked_asset.name;
            formName = 'form[name=asset-section-data]';
          }

          root.updateSectionPopup(sectionData, layoutType, options);
          if (sectionData.linked_asset && sectionData.linked_asset.language_id != document.current_locale) root.$('.custom-url-block .section-url').addClass('disabled').attr('disabled', true);
          root.$(formName).attr('section-id', sectionId);
          root.$(".popup-edit input[name=show]").prop('checked', !resp.get('is_hidden'));
          root.$(".popup-edit input[name=private]").prop('checked', resp.get('is_private'));

          _.each(resp.get('videos'), function (video) {
            root.renderVideoDetails(video.link);
          });

          if (sectionData.expire_at) {
            let expire_at = new Date(sectionData.expire_at);
            root.$('#section_expire_at').val(expire_at.toLocaleString({}, {
              'hour12': true
            }).replace(/\//g, '-'));
          }
        }
      });
    },
    renderBulletinSiteMap: function () {
      Common.fetchSiteMapData().then(data => {
        let selectedGroupIds = [];
        let selectedGroups = this.$('#bboard-usr-grp-dropdown');

        if (selectedGroups.attr('data-selected-groups')) {
          _.each(selectedGroups.attr('data-selected-groups').split(","), gId => {
            selectedGroupIds.push(parseInt(gId));
          });
        }

        let siteMapData = Common.updateSitemapData(data, selectedGroupIds);
        this.$el.find('#bulltein-sitemap').html(siteMapData.length ? BulletinMainSiteMap({
          'siteMapData': siteMapData
        }) : `<div> ${this.NO_RECORDS_TEXT} </div>`);
        this.$("#bulltein-sitemap .loading-icon").hide();
      }).catch(e => {
        this.$el.find('#bulltein-sitemap').html('<div>Oops! Something went wrong.</div>');
      });
    },
    submitBulletinBoardDetails: function (event) {
      event.preventDefault();
      var showError = false,
          currentFormName = this.$(event.currentTarget).attr('name'),
          formName = "form[name=" + currentFormName + "]";
      var bulletinBoardName = this.$(formName + " input[name='name']");
      var bulletinBoardDescription = this.$(formName + " textarea");
      var bulletinBoardLinksLength = this.$('.bulletin-links-list li').length;

      if (!bulletinBoardName.val()) {
        this.customErrorMessage('Provide a name', this.$(bulletinBoardName).parent(), this.$(bulletinBoardName));
        showError = true;
      } else if (bulletinBoardName.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a name without special characters', this.$(bulletinBoardName).parent(), this.$(bulletinBoardName));
        showError = true;
      } else if (bulletinBoardLinksLength == 0) {
        this.customErrorMessage('Provide atleast one link', this.$('#link-container'), this.$(bulletinBoardLinksLength));
        showError = true;
      }

      if (showError) return false;
      let selectedGroupIds = [];
      let selectedGroups = this.$('#bboard-usr-grp-dropdown');

      if (selectedGroups.attr('data-selected-groups')) {
        _.each(selectedGroups.attr('data-selected-groups').split(","), gId => {
          selectedGroupIds.push(parseInt(gId));
        });
      }

      var linkDetails = [];
      var links = this.$('.bulletin-links-list li');
      var root = this;

      _.each(links, function (elem, index) {
        let linkElem = root.$(elem).find('.bulletin-link-url');
        let linkType = linkElem.data('type');
        let linkGrupIds = [];

        if (linkElem.attr('data-groups')) {
          _.each(linkElem.attr('data-groups').split(','), gId => {
            linkGrupIds.push(parseInt(gId));
          });
        }

        ;

        if (linkType == 'internal' && !_.difference(selectedGroupIds, linkGrupIds).length == 0) {
          linkElem.parents(`.bulletin-link-data`).remove();
          return;
        }

        let url, breadcrumb;

        if (linkType == 'internal') {
          breadcrumb = linkElem.html();
          url = root.$(elem).find('.bulletin-link-url').attr('href');
        } else {
          url = linkElem.html();
        }

        var linkDataAttr = linkElem.data();
        linkDetails.push({
          'title': root.$(elem).find('.bulletin-link-title').html(),
          'url': url,
          'type': linkElem.data('type'),
          'order': index + 1,
          'breadcrumb': breadcrumb,
          'groups': linkGrupIds,
          'link_id': linkDataAttr.linkid || null,
          'product_id': linkDataAttr.product || null,
          'section_id': linkDataAttr.section || null,
          'chapter_id': linkDataAttr.chapter || null
        });
      });

      this.$(formName).attr('disabled', 'disabled');
      this.actionInProgress('create-bulletin-board');
      this.removeCustomErrorMessage();
      var bulletinBoardData = {
        section_slug: this.section_id,
        name: bulletinBoardName.val(),
        description: bulletinBoardDescription.val(),
        links: linkDetails,
        restricted_to_groupids: selectedGroupIds
      };

      if (this.$(formName).attr('id')) {
        bulletinBoardData.id = this.$(formName).attr('id');
      }

      var bulletinBoard = new BulletinBoard(bulletinBoardData);
      var root = this;
      bulletinBoard.save(null, {
        success: function (response) {
          root.actionSuccess('create-bulletin-board');
          root.section_id ? root.current_view.load(root.section_id, true) : root.current_view = new HomeView();
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('create-bulletin-board');
        }
      });
    },
    // show select button on hovering category, section, chapter
    showSiteMapOptions: function (event) {
      this.$(event.currentTarget).children('.select-sitemap-content').removeClass('hide');
    },
    hideSiteMapOptions: function (event) {
      this.$(event.currentTarget).children('.select-sitemap-content').addClass('hide');
    },

    /**
    * Populate the sectionForm template with section details.
    * params:
    *   section     - Backbone model/Object.
    *   layoutType  - Json data containing layout flags 'isEdit', 'isAsset'.
    *   options     - Json data containing flags for 'showPrivateOption', 'showExportOption'.
    */
    updateSectionPopup: function (section, layoutType, options) {
      let grpDetails = {};
      let isRestrictionSetInParent = false;
      let showRestrictionOption = false;
      let restrictionsDisabled = true;
      let template = this.tenant.template;

      let isJourneyEnabled = _.some(this.tenant.applications, function (app) {
        return app.unique_id.toLowerCase() == 'journeys' && template == 'vmware';
      });

      if (document.isPrivateTenant) {
        let parentSection = this.current_view.section.attributes;
        isRestrictionSetInParent = section.is_restriction_set_in_parent || parentSection.is_restriction_set_in_parent || parentSection.restricted_to_group_details && parentSection.restricted_to_group_details.length;
        let tenantUsrGrps = section.tenant && section.tenant.user_groups ? section.tenant.user_groups : this.tenant.user_groups;
        let userGroups = [];
        let restrictedToGroupDetails = layoutType.isEdit ? section.restricted_to_group_details : parentSection.restricted_to_group_details; // If restriction is set in parent entity,
        // then in child entity, only the options which are selected in parent should be selectable.

        if (isRestrictionSetInParent) {
          if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
            userGroups = parentSection.restricted_to_group_details;
            restrictionsDisabled = false;
          }
        } else {
          userGroups = tenantUsrGrps;
          restrictionsDisabled = false;
        } // 'userGroups' will be tenant's user-groups in case of 'product',
        // it will parent's restricted_to_groups in case of 'section' inside a 'product'.


        grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

        showRestrictionOption = Boolean(tenantUsrGrps && tenantUsrGrps.length);
      }

      let eolExpireAt;

      if (section.expire_at) {
        eolExpireAt = new Date(section.expire_at);
        eolExpireAt = eolExpireAt.toISOString().slice(0, 16);
      }

      this.$('#create-edit-section').html(this.sectionForm({
        titleMaxLength: this.SECTION_TITLE_LIMIT,
        descriptionMaxLength: this.SECTION_DESCRIPTION_LIMIT,
        urlMaxLength: this.SECTION_ASSET_URL_LIMIT,
        section: section,
        isAsset: layoutType.isAsset,
        isEdit: layoutType.isEdit,
        eolExpireAt: eolExpireAt,
        showCreateCta: document.defaultLocaleID == document.current_locale,
        isPrivateTenant: document.isPrivateTenant,
        isJourneyEnabled: isJourneyEnabled,
        showPrivateOption: options.showPrivateOption,
        showExportOption: options.showExportOption,
        showRestrictionOption: showRestrictionOption,
        restrictionsDisabled: restrictionsDisabled,
        isRestrictionEnabled: grpDetails.isRestrictionEnabled,
        restrictedToGroups: grpDetails.restrictedToGroups,
        restrictedToGroupIds: grpDetails.restrictedToGroupIds,
        userGroupOptions: grpDetails.userGroupOptions,
        journeyList: section.journey_list
      })); //adding cta list to section popup

      this.sectionCtaList = [];
      this.removedCtaIds = [];

      if (!layoutType.isAsset) {
        _.each(section.cta_list, cta => {
          this.sectionCtaList.push({
            ctaId: cta.cta_id,
            type: cta.type,
            text: cta.text,
            href: cta.href,
            fileName: cta.name,
            uniqueId: _.uniqueId('cta_')
          });
        });

        this.addCtaList();
      }
    },
    selectPlayListFromDropDown: function (event) {
      var currentTrg = this.$(event.currentTarget);

      if (!currentTrg.hasClass('active')) {
        currentTrg.addClass('active');
        currentTrg.siblings().removeClass('active');
      }

      var pl_name = currentTrg.text();
      var pl_value = currentTrg.val();
      var selectedValue = currentTrg.parents('#list-playlist-name').children('span');
      selectedValue.attr('value', pl_value);
      selectedValue.text(pl_name);
    },
    showBulletinBoardPopup: function (bulletinBoardData, isEdit) {
      let grpDetails = {};
      let isRestrictionSetInParent = false;
      let showRestrictionOption = false;

      if (document.isPrivateTenant) {
        let bulletinBoardSection = this.current_view.section.attributes;
        isRestrictionSetInParent = bulletinBoardSection.is_restriction_set_in_parent || bulletinBoardSection.restricted_to_group_details && bulletinBoardSection.restricted_to_group_details.length;
        let tenantUsrGrps = bulletinBoardSection.tenant && bulletinBoardSection.tenant.user_groups ? bulletinBoardSection.tenant.user_groups : this.tenant.user_groups;
        let restrictedToGroupDetails = isEdit ? bulletinBoardData.restricted_to_group_details : bulletinBoardSection.restricted_to_group_details; // If restriction is set in Section
        // then in bulletin board, only the options which are selected in section should be selectable.

        let userGroups = [];

        if (isRestrictionSetInParent) {
          if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
            userGroups = bulletinBoardSection.restricted_to_group_details;
          }
        } else {
          userGroups = tenantUsrGrps;
        } // 'userGroups' will be tenant's user-groups in case of 'product level bulletin board',


        grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

        showRestrictionOption = tenantUsrGrps && tenantUsrGrps.length > 0;
      }

      this.$('.create-bulletin-board').html(CreateBulletin({
        'isEdit': isEdit,
        'isHidden': document.defaultLocaleID !== SDCookies.getItem('author_locale'),
        bulletinBoard: bulletinBoardData,
        restrictedToGroups: grpDetails.restrictedToGroups,
        restrictedToGroupIds: grpDetails.restrictedToGroupIds,
        userGroupOptions: grpDetails.userGroupOptions,
        showRestrictionOption: showRestrictionOption
      }));
      this.popupShow('create-bulletin-board');
      this.initializeBulletinBoardLinkSortable();
    },
    fetchBulletinBoardDetails: function (bbId) {
      var bulletinBoard = new BulletinBoard({
        id: bbId
      });
      var root = this;
      bulletinBoard.fetch({
        async: false,
        success: function (model, response) {
          let isEdit = true;
          root.showBulletinBoardPopup(response, isEdit);
        }
      });
    },
    createEditBulletinBoard: function (event) {
      // Insert the bulletin popup
      var element = this.$(event.currentTarget).parents('.bulletin-board-block');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      var bbId = parseInt(element.attr('id'));

      if (bbId) {
        this.fetchBulletinBoardDetails(bbId);
      } else {
        if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();
        let isEdit = false;
        this.showBulletinBoardPopup(isEdit);
      }
    },
    showEnableDisableBulletinBoard: function (event) {
      var element = this.$(event.currentTarget).parents('.bulletin-board-block');
      if (element.hasClass('uneditable')) return false;

      if (this.$(event.target).parents('.bulletin-board-block').hasClass('disabled')) {
        var enable_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
        this.$('.enable-bboard .enable').attr('id', enable_id);
        this.popupShow('enable-bboard');
      } else {
        var disable_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
        this.$('.disable-bboard .disable').attr('id', disable_id);
        this.popupShow('disable-bboard');
      }

      ;
    },
    enableDisableBulletinBoard: function (event) {
      let bboard_id = this.$(event.currentTarget).attr('id');
      let is_enabled = !this.$(event.currentTarget).hasClass('disable');
      var bulletinBoard = new BulletinBoard({
        id: bboard_id,
        is_enabled: is_enabled
      });
      is_enabled ? this.actionInProgress('enable-bboard') : this.actionInProgress('disable-bboard');
      var root = this;
      bulletinBoard.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          is_enabled ? root.actionSuccess('enable-bboard') : root.actionSuccess('disable-bboard');
          root.section_id ? root.current_view.load(root.section_id, true) : root.current_view = new HomeView();
        },
        error: function (xhr, status_code, error_message) {
          is_enabled ? root.actionFailed('enable-bboard') : root.actionFailed('disable-bboard');
        }
      });
    },
    showDeleteBulletinBoard: function (event) {
      var element = this.$(event.currentTarget).parents('.bulletin-board-block');
      if (element.hasClass('uneditable')) return false;
      var delete_id = this.$(event.currentTarget).parents('.bulletin-board-block.active').attr('id');
      this.$('.delete-bulletin-board .delete').attr('id', delete_id);
      this.popupShow('delete-bulletin-board');
    },
    deleteBulletinBoard: function (event) {
      var delete_id = this.$(event.currentTarget).attr('id');
      var bulletinBoard = new BulletinBoard({
        id: delete_id
      });
      this.actionInProgress('delete-bulletin-board');
      var root = this;
      bulletinBoard.destroy({
        wait: true,
        success: function () {
          root.actionSuccess('delete-bulletin-board');
          root.section_id ? root.current_view.load(root.section_id, true) : root.current_view = new HomeView();
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('delete-bulletin-board');
        }
      });
    },
    addExternalLink: function (event) {
      this.$('.error-msg').text("");
      let is_edit = this.$(event.currentTarget).attr('is_edit');
      let linkTitle = this.$('.bulletin-external-link-title').val();
      let linkHref = this.$('.bulletin-external-link-url').val();

      if (!linkTitle) {
        this.$('#link-title-validation').text('Provide a title for the link.');
        return;
      }

      if (!linkHref) {
        this.$('#link-validation').text('Provide a URL.');
        return;
      }

      if (!Common.validateUrl(linkHref)) {
        this.$('#link-validation').text('Oops! Please enter a valid URL.');
        return;
      }

      if (is_edit) {
        this.$(`li.editing .bulletin-link-title`).text(linkTitle);
        this.$(`li.editing a`).attr('href', linkHref).text(linkHref);
        this.$(`li.editing .edit-bulletin-link`).attr({
          'data-title': linkTitle,
          'data-href': linkHref,
          'data-type': 'external'
        });
        this.$(`li.editing`).removeClass('editing');
        this.$(event.currentTarget).text('add').removeAttr('is_edit');
      } else {
        let linkDetails = [];
        let link = {
          name: linkTitle,
          url: linkHref,
          link_type: 'external'
        };
        linkDetails = link;
        this.$('.bulletin-links-list').append(BulletinBoardLinks(link));
      }

      this.replacePopup(event);
      this.initializeBulletinBoardLinkSortable();
    },
    editExternalLink: function (event) {
      this.$('.error-msg').text("");
      let is_edit = true;
      let parentElem = this.$(event.currentTarget).parents('li');
      parentElem.addClass('editing');
      let title = parentElem.find('.bulletin-link-title').text();
      let linkUrl = parentElem.find('.bulletin-link-url').text();
      this.$(`.bulletin-external-link-title`).val(title);
      this.$(`.bulletin-external-link-url`).val(linkUrl);
      this.replacePopup(event, is_edit);
      this.$(`.create-bulletin-link-popup .popup-title`).text('edit link');
      this.$(`.add-external-link`).text('update').attr({
        'is_edit': is_edit
      });
    },
    removeBulletinLink: function (event) {
      this.$(event.currentTarget).parents('li').remove();
      this.initializeBulletinBoardLinkSortable();
    },
    removeJourneyLink: function (event) {
      this.$(event.currentTarget).parents('li').remove();
      this.initializeSectionJourneyLinkSortable();
    },
    addInternalLink: function (e) {
      var selectedLinks = this.$('#bulltein-sitemap .css-checkbox:checked');

      _.each(selectedLinks, selectedLink => {
        this.insertInternalLink(selectedLink);
      });

      this.replacePopup(e);
    },
    insertInternalLink: function (selectedLink) {
      this.removeCustomErrorMessage();
      let linkDetails = [];
      var selectedElement = selectedLink;
      var link = {
        link_type: 'internal'
      };
      link.href = window.location.origin + "/t/";
      var mainListElement = this.$(selectedElement).parents().closest("li[data-slug='" + $(selectedElement).attr('slug-id') + "']");
      let mainListElementData = mainListElement.data();
      link.groups = mainListElementData.groups;
      var elementType = mainListElementData.item;

      if (elementType == 'chapter') {
        link.href += mainListElement.closest("li[data-item='category']").data('slug') + '/';

        if (mainListElement.closest("li[data-item='section']").length) {
          link.href += mainListElement.closest("li[data-item='section']").data('slug') + '/';
        }
      } else if (elementType == 'section' && mainListElement.closest("li[data-item='category']").data('slug')) {
        link.href += mainListElement.closest("li[data-item='category']").data('slug') + '/';
      }

      link.href += mainListElementData.slug;
      let productSlug = mainListElement.closest("li[data-item='category']").data('slug');
      let sectionSlug = mainListElement.closest("li[data-item='section']").data('slug');
      let selectedElementData = $(selectedElement).parents("li").data();
      let entityType = selectedElementData.item;
      let dataSlug = selectedElementData.slug;
      let dataId = selectedElementData.id;
      link.product_id = mainListElement.closest("li[data-item='category']").data('id');
      link.section_id = mainListElement.closest("li[data-item='section']").data('id');
      link.name = selectedElementData.name;
      link.url = link.href;

      if (entityType == 'category' || entityType == 'section') {
        link.breadcrumb = `Home > ${productSlug} > ${dataSlug}`;

        if (productSlug == dataSlug) {
          link.breadcrumb = `Home > ${dataSlug}`;
        }
      } else if (entityType == 'chapter') {
        link.chapter_id = dataId;
        link.breadcrumb = `Home > ${productSlug} > ${dataSlug}`;

        if (sectionSlug) {
          link.breadcrumb = `Home > ${productSlug} > ${sectionSlug} > ${dataSlug}`;
        }
      }

      linkDetails = link;
      this.$('.bulletin-links-list').append(BulletinBoardLinks(linkDetails));
    },
    duplicateBulletinBoard: function (event) {
      let bbId = this.$('.duplicate-bboard .duplicate').attr('id');
      var bboard = new BulletinBoard({
        id: bbId,
        copy: true,
        section_slug: this.section_id
      });
      this.actionInProgress('duplicate-bboard');
      var root = this;
      bboard.save(null, {
        patch: true,
        success: function (response) {
          root.actionSuccess('duplicate-bboard');
          root.section_id ? root.current_view.load(root.section_id, true) : root.current_view = new HomeView();
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('duplicate-bboard');
        }
      });
    },
    showDuplicateBulletinBoard: function (event) {
      var element = this.$(event.currentTarget).parents().find('.bulletin-board-block.active');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      var bbId = parseInt(element.attr('id'));
      this.$('.duplicate-bboard .duplicate').attr('id', bbId);
      this.popupShow('duplicate-bboard');
    },
    updateAddButtonText: function () {
      let saveElem = this.$('.bulletin-browse-link-popup .save');
      let suggestionsCount = this.$('#bulltein-sitemap .css-checkbox:checked').length;

      if (!suggestionsCount) {
        $(saveElem).text('SAVE').removeClass('suggestions_selected');
      } else {
        $(saveElem).text(`ADD ${suggestionsCount} CONTENT`).addClass('suggestions_selected');
      }
    },
    showCreateLayout: function (event) {
      if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();
      var hasParent = this.$(event.currentTarget).attr('parent');

      if (this.tenant.enable_box_integration && !hasParent) {
        this.popupShow('box-category-option');
      } else if (!hasParent && !this.tenant.enable_box_integration || this.hasChildren(this.section)) {
        // Display public/private option in all types of tenants.
        // Display 'Asset-Link'/'Default-Category' option.
        let popupName = 'choose-category-type';
        this.popupShow(popupName);
        if (!hasParent) this.$('.' + popupName + ' .layouts').attr('show-private', true);
      } else {
        if (this.hasPlaylists(this.section)) {
          if (!this.tenant.enable_box_integration) {
            this.createPlaylist();
            return;
          }

          $('.layouts .playlist_layout_block, .layouts .import_box_block').addClass('enabled');
          $('.layouts .category_layout_block ').addClass('disabled');
        } else {
          $('.layouts .category_layout_block, .layouts .playlist_layout_block').addClass('enabled');
        }

        if (this.tenant.enable_box_integration) {
          $('.layouts .import_box_block').removeClass('disabled').addClass('enabled');
        } else {
          $('.layouts .import_box_block').removeClass('enabled').addClass('disabled');
        }

        this.popupShow('layout_selection_block');
      }
    },
    hideCreateLayout: function (popupName) {
      $('#layout_selection_block').removeClass('active');
      setTimeout(function () {
        $('.grey_layout_bg').removeClass('active');
      }, 500);
      $('.layouts div').removeClass('enabled disabled');
    },
    toogleSitMapNavigation: function (event) {
      var icon = this.$(event.currentTarget);

      if (icon.hasClass('expanded')) {
        icon.removeClass('expanded');
        icon.parent().siblings('li').hide();
      } else {
        icon.addClass('expanded');
        icon.parent().siblings('li').show();
      }
    },
    toogleSitMapSections: function (event) {
      var icon = this.$(event.currentTarget);
      icon.toggleClass('expanded');
      icon.parent().siblings('ul').toggle();
    },
    demoInfo: function (event) {
      var slideInfoEl = document.getElementsByClassName('slide_info')[0];
      slideInfoEl.classList.remove('push-aside');
      this.$('.slide_information .slide_info').toggle();

      if (event.type == 'mouseenter') {
        // set slide_information position dynamically
        var slideInfoPos = slideInfoEl.getBoundingClientRect().left;

        if (slideInfoPos < 10) {
          slideInfoEl.classList.add('push-aside');
        }
      }
    },
    hideEditPopup: function () {
      this.$('form .tooltip').hide();
      this.popupClose("popup-edit");
    },
    previewSectionVideo: function () {
      var video_url = this.$('form[name=default-section-data] .video-upload').val();

      if (video_url) {
        this.renderVideoDetails(video_url);
        this.$('form[name=default-section-data] .video-upload').val("");
      }
    },
    deleteSectionVideo: function (event) {
      var video_id = this.$(event.currentTarget).attr('rel');
      this.$('form[name=default-section-data] .video #' + video_id).remove();
    },
    renderVideoDetails: function (video_url) {
      var videoDetails = Common.getEmbedVideoDetails(video_url);

      if (videoDetails) {
        var video = this.renderVideoBlock(videoDetails.src, videoDetails.title, videoDetails.thumbnail_url);
        this.$('.video').append(video);
        this.removeCustomErrorMessage();
      } else {
        this.customErrorMessage('Enter valid URL', this.$('.video-link'));
      }
    },
    renderVideoBlock: function (video_src, video_title, video_poster) {
      var video_block_id = 1;
      var video_blocks = this.$('form[name=default-section-data] .video-block');

      if (video_blocks.length) {
        video_block_id = parseInt(this.$('form[name=default-section-data] .video-block:last').attr('id')) + 1;
      }

      var video = this.videoBlock({
        'video_id': video_block_id,
        'video_src': video_src,
        'video_title': video_title,
        'video_poster': video_poster
      });
      return video;
    },
    // Function to load an Icon file into the HTML DOM.
    previewIcon: function (event) {
      var asset = event.target.files[0];

      if (!asset || !/\.(gif|jfif|jpg|jpeg|tiff|png|svg|pdf)$/i.test(asset.name)) {
        return false;
      }

      this.$('#upload-file-preview').attr('src', URL.createObjectURL(asset));
      let target = $(event.currentTarget);
      let assetClass = 'image-added';
      this.$(target).parent().addClass(assetClass).find('.file-name').text(asset.name);
      this.$(target).parent().addClass(assetClass).find('.edit-tool-tip').remove();
    },
    // Function to upload the section asset and append response id to DOM.
    uploadAsset: function (event) {
      event.preventDefault();
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      var asset = event.target.files[0];

      if (!asset || !/\.(pdf)$/i.test(asset.name)) {
        return false;
      }

      var assetData = new FormData();
      assetData.append('section_asset_resource', asset);
      assetData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      this.$(event.currentTarget).addClass('disabled');
      this.$('label[for=upload-link-file] span').addClass('hide');
      this.$('label[for=upload-link-file] .progress-text').removeClass('hide');
      this.$('.custom-url-block').addClass('hide');
      let assetResource = new SectionAssetResource({
        id: this.$(event.currentTarget).attr('resource-id') || null
      });
      var root = this;
      assetResource.save(assetData, {
        processData: false,
        cache: false,
        contentType: false,
        data: assetData,
        success: function (model, response) {
          // Set the id, name of the resource to 'input' DOM.
          // Set the custom url data and display it on the form.
          let target = root.$(event.currentTarget);
          root.$(target).attr('resource-id', response.id);
          let fileName = response.meta_data.file_name ? response.meta_data.file_name : response.name;
          root.$(target).parent().addClass('asset-added').find('.file-name').text(fileName);
          root.$(target).parent().find('.edit-tool-tip').remove();
          root.$('.custom-url-block .section-url').val(response.name).attr('maxlength', root.SECTION_ASSET_URL_LIMIT);
          root.$('.custom-url-block .counter span[data-counter]').text(root.SECTION_ASSET_URL_LIMIT - response.name.length);
          root.$('.custom-url-block .custom-url-preview').text(window.location.origin + Common.SECTION_ASSET_ROUTE + response.name);
          root.$('.custom-url-block').removeClass('hide');
          root.$('.custom-url-block .section-url').removeAttr('disabled').removeClass('disabled');
          root.$('label[for=upload-link-file] span').addClass('hide');
          root.$('label[for=upload-link-file] .upload-text').removeClass('hide');
          root.$(target).removeClass('disabled');
        },
        error: function (xhr, status_code, error_message) {
          root.$('label[for=upload-link-file] span').addClass('hide');
          root.$('label[for=upload-link-file] .error-text').removeClass('hide');
        }
      });
    },
    // Remove any assets like images, pdf.
    removeAsset: function (event) {
      if (this.$(event.currentTarget).parent().hasClass('asset-added')) {
        // If form is asset-linked, then reset the custom url block.
        this.$('.custom-url-block .custom-url-preview').text('');
        this.$('.custom-url-block .section-url').attr('value', '');
        this.$('.custom-url-block').addClass('hide');
      }

      this.$(event.currentTarget).parent().removeClass('image-added asset-added file-added').find('#upload-file-preview').removeAttr('src').attr('data-remove-image', true);
      this.$(event.currentTarget).parent().find('.file-name').empty();
      this.$(event.currentTarget).parent().find("label[for=upload-cta-file]").val("");
      this.$(event.currentTarget).siblings('input[type=file]').val('');
      this.removeCustomErrorMessage();
    },
    previewNotesLinkResource: function (event) {
      var target = $(event.currentTarget);
      var resource = event.target.files[0];

      if (!resource || !/\.(gif|jfif|jpg|jpeg|tiff|png|mp4|svg|webm|ogg)$/i.test(resource.name)) {
        return false;
      }

      if (resource.type == "video/mp4" || resource.type == "video/webm" || resource.type == "video/ogg") {
        this.$('#upload-file-preview').attr('src', '/static/images/author/thumb-video.jpg');
      } else {
        this.$('#upload-file-preview').attr('src', URL.createObjectURL(resource));
      }

      this.$(target).parent().addClass('image-added').find('.file-name').text(resource.name);
      this.$(event.currentTarget).parents('.block').removeClass('add-resource-url');
      this.$(event.currentTarget).parents('.block').addClass('image-added');
    },
    showNotesLinkUpload: function (event) {
      this.$(event.currentTarget).parents('.block').addClass('add-resource-url');
    },
    trimInput: function (event) {
      //Function to remove spaces for the value from input tags.
      event.currentTarget.value = $.trim(event.currentTarget.value);
    },

    /**
    * Validate the section details from 'sectionForm',
    * save the details as w.r.t 'asset' or 'default' section.
    */
    submitSectionDetails: function (event) {
      event.preventDefault();
      var showError = false,
          currentFormName = this.$(event.currentTarget).attr('name'),
          formName = "form[name=" + currentFormName + "]";
      var sectionName = this.$(formName + " input[name='name']"),
          sectionDescription = this.$(formName + " textarea"),
          sectionLinkResource = this.$('#upload-link-file'),
          customUrlInput = this.$('.custom-url-block .section-url'),
          resourceName = customUrlInput.val();
      let restrictionsEnabled = this.$("#section_enable_restrictions").is(":checked");
      let selectedGroups = this.$("#section-usr-grp-dropdown");
      let expire_at = this.$('#section_expire_at');

      if (!sectionName.val()) {
        this.customErrorMessage('Provide a name', this.$(sectionName).parent(), this.$(sectionName));
        showError = true;
      } else if (sectionName.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(sectionName).parent(), this.$(sectionName));
        showError = true;
      } else if (sectionName.val().length > this.SECTION_TITLE_LIMIT) {
        this.customErrorMessage('Maximum ' + this.SECTION_TITLE_LIMIT + ' characters allowed', this.$(sectionName).parent(), this.$(sectionName));
        showError = true;
      } else if (sectionDescription.val().length > this.SECTION_DESCRIPTION_LIMIT) {
        this.customErrorMessage('Maximum ' + this.SECTION_DESCRIPTION_LIMIT + ' characters allowed', this.$(sectionDescription).parent(), this.$(sectionDescription));
        showError = true;
      } else if (currentFormName == 'asset-section-data' && !sectionLinkResource.parents().hasClass('asset-added')) {
        this.customErrorMessage('Upload a valid PDF file', sectionLinkResource.parent(), this.$(sectionLinkResource));
        showError = true;
      } else if (resourceName && customUrlInput.siblings('.error-msg').length) {
        showError = true;
      } else if (restrictionsEnabled && !selectedGroups.attr("data-selected-groups")) {
        this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
        showError = true;
      }

      if (showError || this.$(formName).attr("disabled")) return false;
      this.$(formName).attr('disabled', 'disabled');
      this.actionInProgress('popup-edit');
      this.removeCustomErrorMessage();
      var iconFile = this.$('#upload-file').val();
      var resourceId = parseInt(sectionLinkResource.attr('resource-id'));
      var root = this; // If the section is of 'asset-link' type,
      // then get the name from the input field,
      // call in a 'PUT' request to update the Resource name,
      // and get the 'resource-id', pass is it as an argument for either to
      // 'saveIconSection'(Save icon first and then section details)
      // or 'saveSection' (Just save the default section details).

      setTimeout(function () {
        // Send api resource 'PUT' request only when,
        // url input is not disabled,
        // url input has a name value,
        // form is 'asset-section-data' and has 'asset-added',
        // or when it has asset resource file.  
        if (!customUrlInput.hasClass('disabled') && resourceName && currentFormName == 'asset-section-data' && (sectionLinkResource.parents().hasClass('asset-added') || sectionLinkResource[0].files[0])) {
          let assetResource = new SectionAssetResource({
            id: resourceId
          });
          var assetData = new FormData();
          assetData.append('name', resourceName);
          assetData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
          assetResource.save(assetData, {
            type: 'PUT',
            processData: false,
            cache: false,
            contentType: false,
            data: assetData,
            success: function (model, response) {
              if (iconFile) root.saveIconSection(formName, resourceId);else root.saveSection(formName, null, resourceId);
            },
            error: function (xhr, status, error_response) {
              console.log('Updating Resource Error- ', status.responseText, error_response);
              root.actionFailed('popup-edit');
            }
          });
        } else if (iconFile) {
          root.saveIconSection(formName, resourceId);
        } else {
          root.saveSection(formName, null, resourceId);
        }
      }, 1000);
    },

    /**
    * Save the icon, of the section, save the section details,
    * if the section has asset linked, then save the resourceId.
    * params:
    *   formName      - String value of the form name - eg: 'form[name=default-section-data]'.
    *   resourceId    - Integer value of resource id, 'null' by default.
    */
    saveIconSection: function (formName, resourceId = null) {
      var iconData = new FormData();
      iconData.append('icon', this.$('#upload-file')[0].files[0]);
      iconData.append('name', this.$(formName + ' input[name=name]').val());
      iconData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      let icon = new Icon();
      var root = this;
      icon.save(iconData, {
        processData: false,
        cache: false,
        contentType: false,
        data: iconData,
        success: function (model, response) {
          root.saveSection(formName, response.icon_id, resourceId);
        },
        error: function (xhr, status_code, error_message) {
          root.removeSectionResourceOnError(SectionAssetResource, resourceId);
          root.actionFailed('popup-edit');
        }
      });
    },

    /**
    * Create/Save section details, common function for both normal/asset-link sections.
    * If there is any error in saving the section detials,
    * then remove the icon resource which was previously saved.
    * params:
    *   formName    - String value of the form name - eg: 'form[name=default-section-data]'.
    *   iconId      - Integer value of icon id, 'null' by default.
    *   resourceId  - Integer value of resource id, 'null' by default.
    */
    saveSection: function (formName, iconId = null, resourceId = null) {
      var sectionData = {
        id: this.$(formName).attr('section-id'),
        parent: undefined,
        video: [],
        related_products: [],
        tags: [],
        show: false
      };

      _.each(this.$(formName + ' [name]:not([type=file])'), function (field) {
        var name = field.name || field.getAttribute('name'),
            value = field.value || field.getAttribute('value'),
            type = field.type || field.getAttribute('name'),
            lname = field.localName;
        sectionData[name] = type === 'checkbox' ? field.checked : type === 'select-multiple' ? _.compact(_.map(field.options, function (option) {
          if (option.selected) return option.value;
        })) : lname === 'iframe' ? $.isArray(sectionData[name]) ? sectionData[name].concat({
          'video_url': field.src,
          'poster_url': field.getAttribute('poster')
        }) : {
          'video_url': field.src,
          'poster_url': field.getAttribute('poster')
        } : sectionData[name] === undefined ? value : $.isArray(sectionData[name]) ? sectionData[name].concat(value) : [sectionData[name], value];
      });

      if (iconId) {
        sectionData.icon_id = iconId;
      } else if (this.$('#upload-file-preview').attr('data-remove-image')) {
        sectionData.remove_icon = true;
      }

      if (resourceId) sectionData.resource_id = resourceId;

      if (this.$("#section_enable_restrictions").is(":checked")) {
        sectionData['is_restriction_enabled'] = true;
        let selectedGroupIds = [];
        let selectedGroups = this.$("#section-usr-grp-dropdown");

        if (selectedGroups.attr("data-selected-groups")) {
          _.each(selectedGroups.attr("data-selected-groups").split(","), gId => {
            selectedGroupIds.push(parseInt(gId));
          });
        }

        sectionData['restricted_to_groupids'] = selectedGroupIds;
      } else {
        sectionData['is_restriction_enabled'] = false;
      }

      let selectedJourenysIds = [];
      let sectionJourenys = this.$('.section-joureny-list .list-item');

      _.each(sectionJourenys, journeyElem => {
        selectedJourenysIds.push(parseInt(journeyElem.dataset.id));
      });

      sectionData['journey_ids'] = selectedJourenysIds;
      if (this.$('#section_expire_at').val()) sectionData['expire_at'] = this.$('#section_expire_at').data('datetime') || null;
      var formData = new FormData();

      _.each(sectionData, (val, key) => {
        if (typeof val == "object" && val != null) val = JSON.stringify(val);
        formData.append(key, val === null ? '' : val);
      });

      formData = this.addCtaData(formData);
      this.edit_section = new Section(sectionData);
      var root = this;
      $.when(this.edit_section.save(formData, {
        processData: false,
        cache: false,
        contentType: false,
        data: formData
      })).done(function (response, textStatus, jqXhr) {
        if (response && jqXhr.status && $.inArray(jqXhr.status, [400, 404, 412, 418, 500]) != -1) {
          root.removeSectionResourceOnError(Icon, iconId);
          root.removeSectionResourceOnError(SectionAssetResource, resourceId);
          root.actionFailed('popup-edit');
          return;
        }

        if (Common.product_details && Common.product_details.id == root.edit_section.id) {
          Common.product_details = root.edit_section;
        }

        if (root.section_id) root.current_view.load(root.section_id, true);else root.current_view = new HomeView();
        root.actionSuccess('popup-edit');
      }).fail(function (response, textStatus, jqXhr) {
        root.removeSectionResourceOnError(Icon, iconId);
        root.removeSectionResourceOnError(SectionAssetResource, resourceId);
        root.actionFailed('popup-edit', response.statusText);
      });
    },
    // adding all cta inforamation to section form data
    addCtaData: function (formData) {
      //adding cta details to section form
      var ctaDetails = {
        'added': [],
        'removed': [],
        'edited': []
      };

      _.each(this.sectionCtaList, cta => {
        if (cta.ctaId && !cta.isEdited) return;
        let ctaData = {
          options: {
            text: cta.text,
            type: cta.type
          },
          ctaId: cta.ctaId,
          name: formData.get('name')
        };

        if (cta.type == 'link') {
          ctaData.name = formData.get('name');
          ctaData.options.href = cta.href;
        } else if (cta.type == 'pdf') {
          ctaData.name = cta.fileName;

          if (cta.pdfFile) {
            formData.append(cta.uniqueId, cta.pdfFile);
            ctaData.file = cta.uniqueId;
          }
        }

        if (cta.isEdited) ctaDetails.edited.push(ctaData);else ctaDetails.added.push(ctaData);
      });

      if (this.removedCtaIds) ctaDetails.removed = this.removedCtaIds;
      formData.append("cta_list", JSON.stringify(ctaDetails));
      return formData;
    },

    /**
    * Update the custom url field for the linked-asset.
    * Trigger a function after 1.5 sec of keyup,
    * add 'disabled' flag to prevent multiple function call.
    */
    updateCustomUrl: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      this.$(event.currentTarget).addClass('disabled');
      var root = this;
      setTimeout(function () {
        root.getUpdatedAssetUrl(root.$(event.currentTarget));
      }, 1500);
    },

    /**
    * Call in a ResourceModel 'GET' request to generate a new name,
    * based on the user input.
    * Disable the input DOM before reading the value.
    * Re-enable the input element after the success response, remove the 'disabled' flag.
    * This method doesn't update the model's name.
    * params:
    *   element- Input DOM element.
    */
    getUpdatedAssetUrl: function (element) {
      element.attr('disabled', true);
      let resourceName = element.val();

      if (!resourceName) {
        element.removeClass('disabled').removeAttr('disabled');
        return;
      }

      this.removeCustomErrorMessage();
      let assetResource = new SectionAssetResource({
        id: this.$('#upload-link-file').attr('resource-id')
      });
      var root = this;
      assetResource.fetch({
        data: {
          'name': resourceName
        },
        processData: true,
        success: function (model, response) {
          element.val(response.name).removeClass('disabled').removeAttr('disabled').focus();
          root.$('.custom-url-block .custom-url-preview').text(window.location.origin + Common.SECTION_ASSET_ROUTE + response.name);
        },
        error: function (xhr, status, error_response) {
          console.log('Updating Resource Name Error- ', status.responseText, error_response); // If the name exists, then display the error msg & enable the input.

          if (status.responseJSON.message == 'NAME EXISTS') {
            let customUrl = root.$('.custom-url-block .section-url');
            root.customErrorMessage('Name exists, please provide a different name', customUrl.parent(), root.$(customUrl));
            element.removeClass('disabled').removeAttr('disabled').focus();
          }
        }
      });
    },

    /**
    * Remove any intermediate resources like SectionIcon/SectionAssetResource,
    * which were created before the error.
    * params:
    *   sectionResModel - Backbone Model object.
    *   sectionResId    - Integer value of the id.
    */
    removeSectionResourceOnError: function (sectionResModel, sectionResId) {
      if (sectionResId) {
        let sectionRes = new sectionResModel({
          id: sectionResId
        });
        sectionRes.destroy();
      }
    },
    // Loading suggesion tags.
    getTagSuggesions: function (event) {
      if (!Common.isValidCharacter(event)) return false;
      var tag_text = event.currentTarget.value;

      if (tag_text) {
        var tags = new Tags({
          id: tag_text
        });
        var root = this;
        tags.fetch({
          async: false,
          success: function (data) {
            root.$('.suggestion_tags ul').empty();

            if (data && data.get('tags') && data.get('tags').length) {
              _.each(data.get('tags'), function (tag) {
                var li = $("<li />");
                $(li).attr('value', tag.name);
                $(li).text(tag.name);
                root.$('.suggestion_tags ul').append($(li));
              });
            }
          }
        });
      }
    },
    // Chose a tag from suggesion.
    selectTagFromSuggestion: function (event) {
      this.$('.add_tag').val(event.target.textContent);
      this.$('.suggestion_tags ul').empty();
    },
    // Create a tag for section.
    createTag: function (event) {
      var formName = $(event.currentTarget).closest('form').attr('name');
      var tagElement = this.$('form[name="' + formName + '"] .add_tag');
      var tags = tagElement.val();
      var tagsList = [];
      var availableTags = this.$('form[name="' + formName + '"] .category_tags ul li .tags');

      _.each(availableTags, function (elem) {
        tagsList.push(elem.getAttribute('value'));
      }); // Split tags by comma separate, trim each tag and return Array of unique tags.


      tags = _.unique($.map(tags.split(','), $.trim));

      _.each(tags, tag => {
        if (tag.length != 0 && !tagsList.includes(tag)) {
          this.$('.category_tags ul').append(TagTemplate(tag));
        }

        ;
      }); // Clear the input tag, clear the suggestions list.


      tagElement.val("");
      this.$('form[name="' + formName + '"] .suggestion_tags ul').html("");
    },
    // Delete tag.
    removeTag: function (event) {
      this.$(event.currentTarget).parents("li").remove();
    },
    // CTA functions.
    showCreateCTAPopup: function (cta_data) {
      this.$('.section-edit-block').hide();
      this.$("#create-edit-section .cta-form").html(CtaForm(cta_data));
    },
    hideCreateCTAPopup: function (event) {
      this.$('.section-edit-block').show();
      this.$('.create-cta-block').hide();
    },
    // adding new cta details to section form
    addCtaDetails: function (event) {
      event.preventDefault(); // cta form validation

      let ctaType = this.$('input[name=cta_type]:checked').attr("cta-type");
      let isvalid = this.validateCtaData(ctaType);
      if (!isvalid) return false; // constructing cta data

      let uniqueId = this.$(event.currentTarget).data("unique-id");
      let ctaData = {
        type: ctaType,
        uniqueId: uniqueId || _.uniqueId('cta_')
      }; //fetching data from cta-form

      if (ctaType == 'link') {
        ctaData.text = this.$('input[name=link_title]').val();
        ctaData.href = this.$('input[name=cta_link]').val();
      } else if (ctaType == 'pdf') {
        ctaData.text = this.$('input[name=pdf_title]').val();
        ctaData.fileName = this.$(".cta-pdf-block .file-name").text(); // Mapping key for reading file object

        if (this.$("#upload-cta-file")[0].files[0]) {
          ctaData.pdfFile = this.$("#upload-cta-file")[0].files[0];
        }
      }

      ctaData.ctaId = this.$(`.cta-button[data-unique-id=${ctaData.uniqueId}]`).data("cta-id"); // updating this.sectionCtaList goes here

      let index = _.findIndex(this.sectionCtaList, cta => {
        return cta.uniqueId == ctaData.uniqueId;
      });

      if (index == -1) {
        this.sectionCtaList.push(ctaData);
      } else {
        if (this.sectionCtaList[index].ctaId == ctaData.ctaId) ctaData.isEdited = true;
        this.sectionCtaList[index] = ctaData;
      }

      this.addCtaList();
      this.hideCreateCTAPopup();
    },
    editCTA: function (event) {
      let ctaData = this.$(event.target).parents(".cta-button").data();
      let ctaDetails = {
        type: ctaData.type,
        text: ctaData.text,
        uniqueId: ctaData.uniqueId
      };

      if (ctaData.type == 'pdf') {
        ctaDetails.fileName = ctaData.fileName;
      } else if (ctaData.type == 'link') {
        ctaDetails.href = ctaData.href;
      }

      this.showCreateCTAPopup(ctaDetails);
      this.preFillCtaForm(ctaData.type);
    },
    removeCTA: function (event) {
      let ctaData = this.$(event.target).parents(".cta-button").data();
      this.sectionCtaList = _.filter(this.sectionCtaList, cta => {
        return cta.uniqueId !== ctaData.uniqueId;
      });
      if (ctaData.ctaId) this.removedCtaIds.push(ctaData.ctaId);
      this.addCtaList();
    },
    addCtaList: function () {
      this.$(".section-edit-block .cta-list").html(CtaList({
        cta_list: this.sectionCtaList
      }));
      this.$(".create-cta-btn label[for=create-cta]").removeClass("hide");

      if (this.sectionCtaList.length >= 2) {
        this.$(".create-cta-btn label[for=create-cta]").addClass("hide");
      }
    },
    // validate cta form data
    validateCtaData: function (ctaType) {
      let isValid = true;

      if (ctaType == 'link') {
        var linkTitle = this.$("input[name=link_title]");
        var link = this.$("input[name=cta_link]");

        if (!linkTitle.val()) {
          this.customErrorMessage('Provide a name', this.$(linkTitle).parent(), linkTitle);
          isValid = false;
        } else if (!link.val()) {
          this.customErrorMessage('Provide a url', this.$(link).parent(), link);
          isValid = false;
        } else if (!Common.validateUrl(link.val())) {
          this.customErrorMessage('Oops! Please enter a valid URL', this.$(link).parent(), link);
          isValid = false;
        }
      } else if (ctaType == 'pdf') {
        var pdfTitle = this.$("input[name=pdf_title]");

        if (!pdfTitle.val()) {
          this.customErrorMessage('Provide a pdf title', this.$(pdfTitle).parent(), pdfTitle);
          isValid = false;
        } else if (this.$(".cta-pdf-block .file-name").text()) {
          return true;
        } else if (!this.$("#upload-cta-file")[0].files[0]) {
          this.customErrorMessage('Please upload a PDF file', $(".cta-pdf-block .cta-block"), $(".cta-pdf-block .cta-block"));
          isValid = false;
        }
      }

      return isValid;
    },
    // validate cta pdf, allow only pdf files
    validateCtaPdf: function (event) {
      this.removeCustomErrorMessage();
      var ctaPdf = event.target.files[0];

      if (!ctaPdf || !/\.(pdf)$/i.test(ctaPdf.name)) {
        this.customErrorMessage("Please upload a PDF file", $(".cta-pdf-block .cta-block"), $(".cta-pdf-block .cta-block"));
        return false;
      }

      this.$(event.target).parent().addClass("file-added").find('.file-name').text(ctaPdf.name);
    },
    // preselecting cta type while editing cta
    preFillCtaForm: function (ctaType) {
      if (ctaType == 'pdf') {
        this.$(".cta-pdf-block .cta-block").addClass("file-added");
        this.$(".create-cta-block .cta-pdf-block").removeClass("disabled");
        this.$(".content-block .cta-link-block").addClass("disabled");
        this.$('.cta-pdf-block input[type=radio]').prop('checked', true);
        this.$('.cta-link-block input[type=radio]').prop('checked', false);
      }

      this.$(`div .save-cta-btn`).text('update');
    },
    updateUrl: function (event) {
      var parentBlock = this.$(event.currentTarget).parents('.block');

      if (parentBlock.hasClass('error')) {
        parentBlock.removeClass('error');
        parentBlock.find('.error-message').text('');
      }

      if (event.altKey || [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(event.keyCode) !== -1) return;
      var value = $(event.target).val();

      if (value && value.length && value.length > 4 && value.indexOf('http') !== 0) {
        $(event.target).val('https://' + value);
      }
    },
    // Section manupulation functions
    showEditOptions: function (event) {
      event.stopImmediatePropagation();

      if (this.$(event.target).parents(".pwt-box").hasClass("active")) {
        this.$(event.target).parents(".pwt-box").removeClass("active");
      } else {
        this.$(".pwt-box").removeClass("active");
        this.$(event.target).parents(".pwt-box").addClass("active");
      }

      return false;
    },
    toggleBulletinEditOptions: function (event) {
      event.stopImmediatePropagation();
      let elem = this.$(event.target).parents(".bulletin-board-block");

      if (elem.hasClass("active")) {
        elem.removeClass("active");
      } else {
        this.$(".bulletin-board-block").removeClass("active");
        elem.addClass("active");
      }
    },
    showEnableDisablePopup: function (event) {
      var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
      if (element.hasClass('uneditable')) return false;

      if (this.$(event.target).parent().siblings().hasClass("disabled")) {
        var enable_id = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
        this.$('.popup-enable .enable').attr('slug', enable_id);
        this.popupShow("popup-enable");
      } else {
        var disable_id = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
        this.$('.popup-disable .disable').attr('slug', disable_id);
        this.popupShow("popup-disable");
      }

      ;
    },
    showDeleteSectionPopup: function (event) {
      var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
      if (element.hasClass('uneditable')) return false;
      var delete_id = element.attr('slug');
      this.$('.popup-delete .delete').attr('slug', delete_id);
      this.popupShow("popup-delete");
      let popupTitle = 'delete category';
      if (this.$(element).hasClass('asset-linked')) popupTitle = 'delete asset';
      this.$('.popup-delete .popup-title.capital-letter').text(popupTitle);
    },
    enableSection: function (event) {
      var enable_id = this.$(event.currentTarget).attr('slug');
      var section = new Section({
        id: enable_id,
        is_enabled: true
      });
      this.actionInProgress('popup-enable');
      var root = this;
      section.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          if (root.section_id) {
            root.current_view.load(root.section_id, true);
          } else {
            root.current_view = new HomeView();
          }

          root.actionSuccess('popup-enable');
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-enable');
        }
      });
    },
    disableSection: function (event) {
      var disable_id = this.$(event.currentTarget).attr('slug');
      var section = new Section({
        id: disable_id,
        is_enabled: false
      });
      this.actionInProgress('popup-disable');
      var root = this;
      section.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          if (root.section_id) {
            root.current_view.load(root.section_id, true);
          } else {
            root.current_view = new HomeView();
          }

          root.actionSuccess('popup-disable');
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-disable');
        }
      });
    },
    deleteSection: function (event) {
      var delete_id = this.$(event.currentTarget).attr('slug');
      var section = new Section({
        id: delete_id
      });
      this.actionInProgress('popup-delete');
      var root = this;
      section.destroy({
        wait: true,
        success: function () {
          if (root.section_id) {
            root.current_view.load(root.section_id, true);
          } else {
            root.current_view = new HomeView();
          }

          root.actionSuccess('popup-delete');
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-delete');
        }
      });
    },
    //End of Create/Edit section functions
    // Playlist functions
    playListRender: function (view) {
      this.initView(view);
      this.$('.create-new').removeClass('active');
      this.$el.removeClass('new_slide_active');
      $('#edit_container .publish, #edit_container .preview, #edit_container .select-all-items, #edit_container .delete-items').removeAttr('walkthrough').addClass('disable');
      $('#edit_container .select-all-items').removeClass('hide');
      $('#edit_container .deselect-all-items').addClass('hide');
      var plist_edit_options = "<div class='edit-hamburger no-action'></div>\
                                <div class='playlist-drag no-action'>" + this.dragSvgIcon + "</div>\
                                <div class='edit'>\
                                    <div class='enable-plist no-action rippleEffect'></div>\
                                    <div class='edit-plist no-action rippleEffect'></div>\
                                    <div class='delete-plist no-action rippleEffect'></div>\
                                </div>";
      this.$('.playlist-left').append(plist_edit_options);
      var demo_edit_options = "<div class='chapter-edit-options no-action'>\
                                        <div class='chapter-edit no-action rippleEffect'></div>\
                                        <div class='chapter-enable no-action rippleEffect'></div>\
                                        <div class='chapter-duplicate no-action rippleEffect'></div>\
                                        <div class='chapter-delete no-action rippleEffect'></div>\
                                     </div>\
                                     <div class='walkthrough-drag no-action'>" + this.dragSvgIcon + "</div>\
                                     <div class='chapter-edit-hamburger no-action'></div>";
      this.$('.pwt-list li').append(demo_edit_options);
      var viewSection = view.section; // Hide 'Create-New' button for restricted-sections.

      if (viewSection.get('can_edit') != undefined && !viewSection.get('can_edit')) {
        $('.create-new').hide();
      } else {
        this.$('.create-new').removeClass('slide').attr('parent', this.section_id).show();
      }

      this.initializeDemoSortable();
      this.initializeBulletinBoardSortable();
    },

    /**
    * Invoked inside the Category/Product,
    * for creating child sections.
    */
    createNewCategory: function (event) {
      var root = this;
      this.popupClose('layout_selection_block');
      setTimeout(function () {
        // Display 'Asset-Link'/'Default-Category' option.
        root.popupShow('choose-category-type');
      }, 400);
    },

    /**
     * Toggle import document parser popup
     */
    toggleDocumentParserPopup: function (event) {
      // This works only with one level deep DOM
      let ele = event.target;
      let openPopupBlock = 'open' in ele.dataset ? ele.dataset.open : ele.parentElement.dataset.open;
      let closePopupBlock = 'close' in ele.dataset ? ele.dataset.close : ele.parentElement.dataset.close;
      this.popupClose(closePopupBlock);
      setTimeout(() => {
        this.popupShow(openPopupBlock);
        this.$('.import-popup-main-container').html(DocumentParserTemplate);
      }, 400);
    },
    showPlayListOptions: function (event) {
      var ele = this.$(event.currentTarget);

      if (ele.hasClass('enabled')) {
        ele.removeClass('enabled');
        ele.siblings('.edit-hamburger').removeClass('enabled');
        ele.siblings('.edit').removeClass('active');
        ele.parent().removeClass('active');
      } else {
        ele.addClass('enabled');
        ele.siblings('.edit-hamburger').addClass('enabled');
        ele.siblings('.edit').addClass('active');
        ele.parent().addClass('active');
      }
    },
    showEnableDisablePlaylist: function (event) {
      var element = this.$(event.currentTarget).parents('.playlist-block');
      if (element.hasClass('uneditable')) return false;

      if (this.$(event.target).parents('.playlist-block').hasClass("disabled")) {
        var enable_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
        this.$('.enable-playlist .enable').attr('playlist_id', enable_id);
        this.popupShow("enable-playlist");
      } else {
        var disable_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
        this.$('.disable-playlist .disable').attr('playlist_id', disable_id);
        this.popupShow("disable-playlist");
      }

      ;
    },
    showDeletePlaylist: function (event) {
      var element = this.$(event.currentTarget).parents('.playlist-block');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      var delete_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
      this.$('.delete-playlist .delete').attr('playlist_id', delete_id);
      this.popupShow("delete-playlist");
    },
    createPlaylist: function (event) {
      this.popupClose('layout_selection_block');
      let showRestrictionOption = false;
      let isRestrictionSetInParent = false;
      let restrictionsDisabled = true;
      let grpDetails = {};
      let userGroups = [];

      if (document.isPrivateTenant) {
        let section = this.current_view.section.attributes;
        isRestrictionSetInParent = this.checkIsRestrictionSetInParent(section);
        let restrictedToGroupDetails = section.restricted_to_group_details; // If restriction is set in parent entity,
        // then in child entity, only the options which are selected in parent should be selectable.

        if (isRestrictionSetInParent) {
          if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
            userGroups = restrictedToGroupDetails;
            restrictionsDisabled = false;
          }
        } else {
          userGroups = this.tenant.user_groups;
          restrictionsDisabled = false;
        }

        grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

        showRestrictionOption = Boolean(this.tenant.user_groups && this.tenant.user_groups.length);
      }

      setTimeout(() => {
        this.popupShow("popup-create-playlist");
        this.$("#create-edit-playlist").html(PlaylistForm({
          name_limit: this.PLAYLIST_TITLE_LIMIT,
          description_limit: this.PLAYLIST_DESCRIPTION_LIMIT,
          showRestrictionOption: showRestrictionOption,
          restrictionsDisabled: restrictionsDisabled,
          isRestrictionEnabled: grpDetails.isRestrictionEnabled,
          restrictedToGroups: grpDetails.restrictedToGroups,
          restrictedToGroupIds: grpDetails.restrictedToGroupIds,
          userGroupOptions: grpDetails.userGroupOptions
        }));
        this.initEolDatePicker(this.$('#playlist_expire_at'));
      }, 400);
      this.$('.popup-box .content-block').niceScroll();
    },
    editPlaylist: function (event) {
      var element = this.$(event.currentTarget).parents('.playlist-block');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      this.removeCustomErrorMessage();
      this.$('form[name=playlist-data]').removeAttr('disabled');
      var playlist_id = this.$(event.currentTarget).parents('.playlist-left').attr('playlist_id');
      var playlist = new Playlist({
        id: playlist_id
      });
      var root = this;
      playlist.fetch({
        success: function (model, response) {
          let grpDetails = {};
          let userGroups = [];
          let isRestrictionEnabled = false;
          let isRestrictionSetInParent = false;
          let showRestrictionOption = false;
          let restrictionsDisabled = true;

          if (document.isPrivateTenant) {
            let section = root.current_view.section.attributes;
            isRestrictionSetInParent = root.checkIsRestrictionSetInParent(section);
            let restrictedToGroupDetails = response.restricted_to_group_details;

            if (isRestrictionSetInParent) {
              if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
                userGroups = section.restricted_to_group_details;
                ;
                restrictionsDisabled = false;
              }
            } else {
              userGroups = response.tenant.user_groups;
              restrictionsDisabled = false;
            }

            grpDetails = root.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

            showRestrictionOption = Boolean(response.tenant.user_groups && response.tenant.user_groups.length);
          }

          root.popupShow("popup-create-playlist");

          if (response.expire_at) {
            let expireAt = new Date(response.expire_at);
            response.expire_at = expireAt.toISOString().slice(0, 16);
          }

          root.$("#create-edit-playlist").html(PlaylistForm({
            playlistId: playlist_id,
            is_edit: true,
            name: response.name,
            description: response.description,
            name_limit: root.PLAYLIST_TITLE_LIMIT - (response.name.length || 0),
            description_limit: root.PLAYLIST_DESCRIPTION_LIMIT - (response.description && response.description.length || 0),
            showRestrictionOption: showRestrictionOption,
            restrictionsDisabled: restrictionsDisabled,
            isRestrictionEnabled: grpDetails.isRestrictionEnabled,
            restrictedToGroups: grpDetails.restrictedToGroups,
            restrictedToGroupIds: grpDetails.restrictedToGroupIds,
            userGroupOptions: grpDetails.userGroupOptions,
            eolExpireAt: response.expire_at
          }));
          root.initEolDatePicker(root.$('#playlist_expire_at'));

          if (response.expire_at) {
            let expire_at = new Date(response.expire_at);
            root.$('#playlist_expire_at').val(expire_at.toLocaleString({}, {
              'hour12': true
            }).replace(/\//g, '-'));
          }
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-create-playlist');
        }
      });
      this.$('.popup-box .content-block').niceScroll();
    },
    savePlaylist: function (event) {
      event.preventDefault();
      var errorFlag = false;
      var playlist_title = this.$("form[name=playlist-data] input[name='name']");
      var playlist_desc = this.$("form[name=playlist-data] textarea[name='description']");
      let restrictionsEnabled = this.$("#playlist_enable_restrictions").is(":checked");
      let selectedGroups = this.$("form[name='playlist-data'] .usr-grp-dropdown");
      let expire_at = this.$('#playlist_expire_at');

      if (playlist_title.val() == "") {
        this.customErrorMessage('Provide a title', this.$(playlist_title).parent(), playlist_title);
        errorFlag = true;
      } else if (playlist_title.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a title with atleast an alphanumeric character', this.$(playlist_title).parent(), playlist_title);
        errorFlag = true;
      } else if (playlist_title.val().length > this.PLAYLIST_TITLE_LIMIT) {
        this.customErrorMessage('Maximum ' + this.PLAYLIST_TITLE_LIMIT + ' characters allowed', this.$(playlist_title).parent(), playlist_title);
        errorFlag = true;
      } else if (restrictionsEnabled && !selectedGroups.attr("data-selected-groups")) {
        this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
        errorFlag = true;
      }

      if (errorFlag || this.$("form[name=playlist-data]").attr("disabled")) return;
      this.$("form[name=playlist-data]").attr("disabled", 'disabled');
      this.actionInProgress('popup-create-playlist');
      var playlistData = {
        section_id: this.section_id,
        name: playlist_title.val(),
        description: playlist_desc.val()
      };

      if (this.$("form[name=playlist-data]").attr('playlist_id')) {
        playlistData.id = this.$("form[name=playlist-data]").attr('playlist_id');
      }

      let selectedGroupIds = [];

      if (selectedGroups.attr("data-selected-groups")) {
        _.each(selectedGroups.attr("data-selected-groups").split(","), gId => {
          selectedGroupIds.push(parseInt(gId));
        });
      }

      playlistData["is_restriction_enabled"] = restrictionsEnabled;
      playlistData["restricted_to_groupids"] = selectedGroupIds;
      if (expire_at.val()) playlistData['expire_at'] = expire_at.data('datetime') || null;
      var playlist = new Playlist(playlistData);
      var root = this;
      playlist.save(null, {
        success: function (response) {
          root.actionSuccess('popup-create-playlist');
          root.current_view.load(root.section_id, true);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-create-playlist');
        },
        complete: function () {
          root.$("form[name=playlist-data]").removeAttr('playlist_id');
        }
      });
    },
    enablePlaylist: function (event) {
      var enable_id = this.$(event.currentTarget).attr('playlist_id');
      var playlist = new Playlist({
        id: enable_id,
        is_enabled: true
      });
      this.actionInProgress('enable-playlist');
      var root = this;
      playlist.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          root.actionSuccess('enable-playlist');
          root.current_view.load(root.section_id, true);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('enable-playlist');
        }
      });
    },
    disablePlaylist: function (event) {
      var disable_id = this.$(event.currentTarget).attr('playlist_id');
      var playlist = new Playlist({
        id: disable_id,
        is_enabled: false
      });
      this.actionInProgress('disable-playlist');
      var root = this;
      playlist.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          root.actionSuccess('disable-playlist');
          root.current_view.load(root.section_id, true);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('disable-playlist');
        }
      });
    },
    deletePlaylist: function (event) {
      var delete_id = this.$(event.currentTarget).attr('playlist_id');
      var playlist = new Playlist({
        id: delete_id
      });
      this.actionInProgress('delete-playlist');
      var root = this;
      playlist.destroy({
        wait: true,
        success: function () {
          root.current_view.load(root.section_id, true);
          root.actionSuccess('delete-playlist');
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('delete-playlist');
        }
      });
    },
    // Create/Edit demo list.
    createNewDemo: function (event) {
      var root = this;
      this.popupClose('layout_selection_block');
      setTimeout(function () {
        root.showCreateChapter(event);
      }, 400);
    },
    showCreateChapter: function (e) {
      var element = this.$(e.currentTarget).parents('li');
      if (element.hasClass('uneditable')) return false;
      this.$("form[name=walkthrough-data]").removeAttr("disabled");

      var updateChapterForm = () => {
        this.$('form[name=walkthrough-data] .tooltip').hide();
        this.popupShow("popup-create-chapter");
        this.$('.popup-box .content-block').niceScroll();
        this.initEolDatePicker(this.$('#chapter_expire_at'));
      };

      var expire_at;

      var setEolArgs = args => {
        if (args.chapter.expire_at) {
          expire_at = new Date(args.chapter.expire_at);
          args.eolExpireAt = expire_at.toISOString().slice(0, 16);
        }

        return args;
      };

      var args = {};
      var root = this; // Edit chapter form inside chapter.

      if (this.walkthrough && this.$(e.currentTarget).hasClass('wt-title-edit')) {
        args.is_edit = true;
        args.name_limit = this.CHAPTER_TITLE_LIMIT - (this.walkthrough.attributes.name.length || 0);
        args.playlist_id = this.walkthrough.attributes.playlist.playlist_id;
        args.chapter = this.walkthrough.attributes;
        args.showRestrictionOption = false;
        let grpDetails = {};
        let userGroups = [];
        let isRestrictionEnabled = false;
        let isRestrictionSetInParent = false;
        let restrictionsDisabled = true;

        if (document.isPrivateTenant) {
          isRestrictionSetInParent = args.chapter.is_restriction_set_in_parent || this.checkIsRestrictionSetInParent(this.current_view.section.attributes);
          let tenantUserGroups = args.chapter.tenant.user_groups;
          let restrictedToGroupDetails = args.chapter.restricted_to_group_details; // If restriction is set in parent entity,
          // then in child entity, only the options which are selected in parent should be selectable.

          if (isRestrictionSetInParent) {
            if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
              userGroups = args.chapter.playlist.restricted_to_group_details;
              restrictionsDisabled = false;
            }
          } else {
            userGroups = tenantUserGroups;
            restrictionsDisabled = false;
          }

          grpDetails = this.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

          args.showRestrictionOption = Boolean(tenantUserGroups && tenantUserGroups.length && args.chapter.published);
        }

        args.restrictionsDisabled = restrictionsDisabled;
        args.isRestrictionEnabled = grpDetails.isRestrictionEnabled;
        args.restrictedToGroups = grpDetails.restrictedToGroups;
        args.restrictedToGroupIds = grpDetails.restrictedToGroupIds;
        args.userGroupOptions = grpDetails.userGroupOptions;
        args = setEolArgs(args);
        this.$('#create-edit-demo').html(this.demoForm(args));
        updateChapterForm();

        if (expire_at) {
          this.$('#chapter_expire_at').val(expire_at.toLocaleString({}, {
            'hour12': true
          }).replace(/\//g, '-'));
        }
      } else {
        // Edit chapter form in playlist page.
        if (this.$(e.currentTarget).hasClass('chapter-edit')) {
          var ch_id = this.$(e.currentTarget).parents('li.active').attr('slug');
          var chapter = new Walkthrough({
            id: ch_id
          });
          chapter.fetch({
            success: function (model, response) {
              let grpDetails = {};
              let userGroups = [];
              let isRestrictionSetInParent = false;
              let showRestrictionOption = false;
              let restrictionsDisabled = true;

              if (document.isPrivateTenant) {
                isRestrictionSetInParent = response.is_restriction_set_in_parent || root.checkIsRestrictionSetInParent(root.current_view.section.attributes);
                let tenantUserGroups = response.tenant.user_groups;
                let restrictedToGroupDetails = response.restricted_to_group_details;

                if (isRestrictionSetInParent) {
                  if (restrictedToGroupDetails && restrictedToGroupDetails.length) {
                    userGroups = response.playlist.restricted_to_group_details;
                    restrictionsDisabled = false;
                  }
                } else {
                  userGroups = tenantUserGroups;
                  restrictionsDisabled = false;
                }

                grpDetails = root.getRestrictedToGroupDetails(restrictedToGroupDetails, userGroups); // Restriction option is based on Tenant Privacy and Tenant UserGroups.

                showRestrictionOption = Boolean(tenantUserGroups && tenantUserGroups.length && response.published);
              }

              let eolArgs = {
                chapter: response
              };
              eolArgs = setEolArgs(eolArgs);
              root.$('#create-edit-demo').html(root.demoForm({
                is_edit: true,
                chapter: response,
                name_limit: root.CHAPTER_TITLE_LIMIT - (response.name.length || 0),
                playlist_id: response.playlist.playlist_id,
                showRestrictionOption: showRestrictionOption,
                restrictionsDisabled: restrictionsDisabled,
                isRestrictionEnabled: grpDetails.isRestrictionEnabled,
                restrictedToGroups: grpDetails.restrictedToGroups,
                restrictedToGroupIds: grpDetails.restrictedToGroupIds,
                userGroupOptions: grpDetails.userGroupOptions,
                eolExpireAt: eolArgs.eolExpireAt
              }));
              updateChapterForm();

              if (expire_at) {
                root.$('#chapter_expire_at').val(expire_at.toLocaleString({}, {
                  'hour12': true
                }).replace(/\//g, '-'));
              }
            }
          });
        } else {
          // Create chapter form.
          if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
            return this.switchLanguageWarning();
          }

          let playlistId = this.$(e.currentTarget).parent().attr('playlist_id');
          var isRestrictionSetInParent = false;
          var grpDetails = {}; // 'showRestrictionOption' in create chapter is always 'false',
          // 'showRestrictionOption' should be available in edit chapter popup and only for published.

          this.$('#create-edit-demo').html(this.demoForm({
            playlist_id: playlistId,
            name_limit: this.CHAPTER_TITLE_LIMIT,
            showRestrictionOption: false,
            isRestrictionSetInParent: isRestrictionSetInParent,
            isRestrictionEnabled: grpDetails.isRestrictionEnabled,
            restrictedToGroups: grpDetails.restrictedToGroups,
            restrictedToGroupIds: grpDetails.restrictedToGroupIds,
            tenantUserGroups: grpDetails.tenantUserGroups
          }));
          updateChapterForm();
        }
      }
    },
    saveChapter: function (event) {
      event.preventDefault();
      var errorFlag = false;
      var walkthrough_title = this.$("form[name=walkthrough-data] input[name='name']");
      let restrictionsEnabled = this.$("#chapter_enable_restrictions").is(":checked");
      let selectedGroups = this.$("form[name='walkthrough-data'] .usr-grp-dropdown");
      let expire_at = this.$('#chapter_expire_at');

      if (walkthrough_title.val() == "") {
        this.customErrorMessage('Provide a title for demo', this.$(walkthrough_title).parent(), walkthrough_title);
        errorFlag = true;
      } else if (walkthrough_title.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a title with atleast an alphanumeric character', this.$(walkthrough_title).parent(), walkthrough_title);
        errorFlag = true;
      } else if (walkthrough_title.val().length > this.CHAPTER_TITLE_LIMIT) {
        this.customErrorMessage('Maximum ' + this.CHAPTER_TITLE_LIMIT + ' characters allowed', this.$(walkthrough_title).parent());
        errorFlag = true;
      } else if (restrictionsEnabled && !selectedGroups.attr("data-selected-groups")) {
        this.customErrorMessage('Please select a group', this.$(selectedGroups).parent());
        errorFlag = true;
      }

      if (errorFlag || this.$("form[name=walkthrough-data]").attr("disabled")) return;
      this.removeCustomErrorMessage();
      this.$("form[name=walkthrough-data]").attr("disabled", "disabled");
      var walkthrough_data = {
        id: this.$('form[name=walkthrough-data]').attr('walkthrough-id'),
        playlist_id: this.$("form[name='walkthrough-data']").attr('playlist-id'),
        tags: []
      };

      _.each(this.$('form[name=walkthrough-data] [name]:not([type=file])'), function (field) {
        var name = field.name || field.getAttribute('name'),
            value = field.value || field.getAttribute('value'),
            type = field.type || field.getAttribute('name');
        walkthrough_data[name] = walkthrough_data[name] === undefined ? value : $.isArray(walkthrough_data[name]) ? walkthrough_data[name].concat(value) : [walkthrough_data[name], value];
      });

      let selectedGroupIds = [];

      if (selectedGroups.attr("data-selected-groups")) {
        _.each(selectedGroups.attr("data-selected-groups").split(","), gId => {
          selectedGroupIds.push(parseInt(gId));
        });
      }

      walkthrough_data["is_restriction_enabled"] = restrictionsEnabled;
      walkthrough_data["restricted_to_groupids"] = selectedGroupIds;
      if (expire_at.val()) walkthrough_data['expire_at'] = expire_at.data('datetime') || null;
      var walkthrough = new Walkthrough(walkthrough_data);
      var root = this;
      this.actionInProgress('popup-create-chapter');
      walkthrough.save(null, {
        success: function (model, response) {
          if (response && response.status && $.inArray(response.status, [400, 404, 412, 418, 500]) != -1) {
            root.actionFailed('popup-create-chapter');
            return;
          }

          if (root.walkthrough) {
            root.$('#player-container span[type=demo-title]').text(response.title);
            root.walkthrough.attributes.title = response.title;
            root.walkthrough.attributes.name = response.title;
            root.walkthrough.attributes.is_restriction_set_in_parent = response.is_restriction_set_in_parent;
            root.walkthrough.attributes.restricted_to_group_details = response.restricted_to_group_details;
            root.walkthrough.attributes.tenant.user_groups = response.tenant.user_groups;

            if (!Common.CURRENT_SLIDE || Common.CURRENT_SLIDE <= 1) {
              Common.loadWalkthrough(root.product_id, root.section_id, model.get('slug'));
            } else {
              Common.loadWalkthrough(root.product_id, root.section_id, model.get('slug'), Common.CURRENT_SLIDE);
            }
          } else {
            root.current_view.load(root.section_id, true);
          }

          root.actionSuccess('popup-create-chapter');
        },
        error: function (model, response, xhr) {
          root.actionFailed('popup-create-chapter');
        }
      });
    },
    initializeDemoSortable: function () {
      var root = this;
      this.$(".pwt-list.sortable").sortable({
        placeholder: 'highlight',
        handle: ".walkthrough-drag",
        containment: ".reorder-bounds",
        connectWith: ".pwt-list.sortable",
        stop: function (event, ui) {
          // 'stop' event triggered only once- when demo sorted across playlist.
          var cur_ele_slug = ui.item.attr('slug');
          var prev_ele_slug = ui.item.prev().attr('slug'); // Changing the reorder request from playlist to walkthrough api.
          // 'id' - walkthrough-slug -- currentDemoSlug.

          var walkthrough_details = {
            'id': ui.item.attr('slug'),
            'reorder': 'demo',
            'target_parent_slug': ui.item.parents('ul').attr('playlist_id'),
            'after_ele_slug': ui.item.prev().attr('slug')
          };
          var walkthrough = new Walkthrough(walkthrough_details);
          walkthrough.save(null, {
            patch: true,
            success: function () {
              root.current_view.load(root.section_id, true);
            },
            error: function (xhr, status_code, message) {
              root.$(".pwt-list.sortable").sortable("cancel");
            }
          });
        }
      });
      this.$(".section-playlist-list").sortable({
        placeholder: 'highlight',
        handle: ".playlist-drag",
        stop: function (event, ui) {
          // Changing the reorder request from playlist
          // 'id' - playlist -id
          var playlist_details = {
            'id': ui.item.find('.playlist-left').attr('playlist_id'),
            'reorder': 'playlist',
            'after_ele_slug': ui.item.prev().find('.playlist-left').attr('playlist_id'),
            'within_section': true
          };
          var playlist = new Playlist(playlist_details);
          playlist.save(null, {
            patch: true,
            success: function () {
              root.current_view.load(root.section_id, true);
            },
            error: function (xhr, status_code, message) {
              root.$(".section-playlist-list").sortable("cancel");
            }
          });
        }
      });
    },
    toggleChapterEditOptions: function (event) {
      if (this.$(event.target).parents(".pwt-list li").hasClass("active")) {
        this.$(event.target).parents(".pwt-list li").removeClass("active");
      } else {
        this.$(".pwt-list li").removeClass("active");
        this.$(event.target).parents(".pwt-list li").addClass("active");
      }
    },
    toggleEnableDisableChapter: function (event) {
      var element = this.$(event.currentTarget).parents('li');
      if (element.hasClass('uneditable')) return false;

      if (this.$(event.target).parents("li").hasClass("disabled")) {
        var enable_id = this.$(event.currentTarget).parents('li').attr('slug');
        this.$('.popup-enable-chapter .enable').attr('slug', enable_id);
        this.popupShow("popup-enable-chapter");
      } else {
        var disable_id = this.$(event.currentTarget).parents('li').attr('slug');
        this.$('.popup-disable-chapter .disable').attr('slug', disable_id);
        this.popupShow("popup-disable-chapter");
      }

      ;
    },
    enableChapter: function (event) {
      var enable_id = this.$(event.currentTarget).attr('slug');
      var walkthrough = new Walkthrough({
        id: enable_id,
        is_enabled: true
      });
      this.actionInProgress('popup-enable-chapter');
      var root = this;
      walkthrough.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          setTimeout(function () {
            root.actionSuccess('popup-enable-chapter', root.current_view.load(root.section_id, true));
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-enable-chapter');
        }
      });
    },
    disableChapter: function (event) {
      var disable_id = this.$(event.currentTarget).attr('slug');
      var walkthrough = new Walkthrough({
        id: disable_id,
        is_enabled: false
      });
      this.actionInProgress('popup-disable-chapter');
      var root = this;
      walkthrough.save(null, {
        patch: true,
        wait: true,
        success: function (response) {
          setTimeout(function () {
            root.actionSuccess('popup-disable-chapter', root.current_view.load(root.section_id, true));
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-disable-chapter');
        }
      });
    },
    showDeleteChapterPopup: function (event) {
      var element = this.$(event.currentTarget).parents('li');
      if (element.hasClass('uneditable')) return false;
      var delete_id = element.attr('slug');
      this.$('.popup-delete-chapter .delete').attr('slug', delete_id);
      this.popupShow("popup-delete-chapter");
    },
    deleteChapter: function (event) {
      var delete_id = this.$(event.currentTarget).attr('slug');
      var walkthrough = new Walkthrough({
        id: delete_id
      });
      this.actionInProgress('popup-delete-chapter');
      var root = this;
      walkthrough.destroy({
        wait: true,
        success: function () {
          setTimeout(function () {
            root.current_view.load(root.section_id, true);

            var post_success = function () {
              root.$(".pwt-list li.active[slug=" + delete_id + "]").remove();
            };

            root.actionSuccess('popup-delete-chapter', post_success);
          }, 1000);
        },
        error: function (xhr, status_code, error_message) {
          root.actionFailed('popup-delete-chapter');
        }
      });
    },
    //End of Create/Edit demo lis
    // Create/Edit demo player.
    playerViewRender: function (view) {
      if (view.walkthrough.get('can_edit') != undefined && !view.walkthrough.get('can_edit')) {
        this.$('.create-new').hide();
      } else {
        this.$('.create-new').addClass('slide').show();
      }

      this.hideAddSlide();
      this.initView(view);
      var activities = this.walkthrough.get('activities');

      var is_sandbox_enabled = _.some(this.tenant.applications, function (app) {
        return app.unique_id.toLowerCase() == 'sandbox';
      });

      this.$('#player-container .player_wrap').append(this.newSlideOptions({
        'show_start_message': !this.currentViewHasSlides(),
        'is_sandbox_enabled': is_sandbox_enabled
      }));
      this.$('#player-container').append(this.contentEditor({
        document_styles: document.documentStyles
      }));
      this.$('.slide_information').append(this.slideInfo({
        'activities': activities
      }));
      this.slider = view.sudoSlider;

      if (view.walkthrough.get('can_edit')) {
        this.$('.side-info-opener').append("<div class='wt-title-edit'>");
      }

      if (!view.slide_views.length) {
        this.$('.demo_welcome_block').addClass('active');
        this.$('.notes-item, .side-panel').hide();
      } else if (view.walkthrough.get('can_edit')) {
        // Remove slide-settings button for TextEditor slide.
        this.$('.slides-Container [slide-type=content] .content-slide-wrap').append("<div class='content-slide-edit'></div>");
      }

      ;
      this.$('.side-panel ul').append("<li><div class='edit-drop-pin' type='edit-drop-pin'></div></li>\
                                             <li><div class='edit-highlighter' type='edit-highlighter'></div></li>\
                                             <li><div class='delete-slide' type='delete-slide'></div></li>");
      var root = this;

      _.each(this.current_view.slide_views, function (view) {
        root.addHotspotEditOptions(view);
      });

      this.addPinEditOptions(); // Allow users to publish only if demo has slides, and if the author has access to it.

      if (this.currentViewHasSlides()) {
        if (view.walkthrough.get('can_edit')) {
          $('#edit_container .publish, #edit_container .preview').attr('walkthrough', this.walkthrough.get('slug')).removeClass('disable').addClass('rippleEffect');
          this.$('.player_wrapper').append("<div class='slide_settings' type='slide_settings'></div>");
        } else {
          this.$('.pagination li[data-page="new"]').hide();
        }

        this.initializeFilmStrip();
      } else {
        $('#edit_container .publish, #edit_container .preview').removeAttr('walkthrough').addClass('disable').removeClass('rippleEffect');
      }

      if ($(this.el).hasClass('text-editor-active')) this.$el.removeClass('text-editor-active');
    },
    toggleAddSlideButton: function () {
      this.$('#player-container').hasClass('side-info-active') ? this.$(".create-new.slide").fadeOut() : this.$(".create-new.slide").fadeIn();
    },
    resetPlayerOptions: function () {
      if (this.$el.hasClass('new_slide_active')) {
        this.$el.removeClass('new_slide_active');
        this.$('.create-new.slide').removeClass('active');
      }

      Common.product_details = null;
    },

    /**
    * Triggers on every slide navigation
    * to operate on slide properties such as slide notes to control placeholder.
    */
    slideChanged: function () {
      var current_slide = this.currentSlide();
      if (!current_slide) return; // Remove slide-settings if the slide is TextEditor.

      current_slide.primary_resource.type == "content" ? this.$('.player_wrapper .slide_settings').hide() : this.$('.player_wrapper .slide_settings').show();
      this.loadPinContent();
      this.setFilmStripCurrentSlide(current_slide.order);
      this.toggleNotesHotspotsEditOptions();
    },
    ctaToggled: function () {
      if (this.$('#player-container').hasClass('cta-active')) {
        this.$('.edit-drop-pin, .edit-highlighter, .delete-slide').addClass('disabled');
      } else {
        this.$('.edit-drop-pin, .edit-highlighter, .delete-slide').removeClass('disabled');
      }

      this.toggleNotesHotspotsEditOptions();
    },
    sectionCtaToggled: function () {
      this.$('.overlay').hasClass('section-cta-active') ? this.$(".create-new").fadeOut() : this.$(".create-new").fadeIn();
    },
    loadPinContent: function () {
      var root = this;

      _.each(this.$('#slider' + Common.CURRENT_SLIDE + ' .drop_pin .pin-tooltip h1, #slider' + Common.CURRENT_SLIDE + ' .drop_pin .pin-tooltip p'), function (ele) {
        // Set the contenteditable to false and dont load default placeholder text, if 'can_edit' is false.
        if (root.walkthrough.get('can_edit')) {
          ele.setAttribute('contenteditable', true);
        } else {
          ele.setAttribute('contenteditable', false);
        }

        if (!ele.textContent) {
          if (document.defaultLocaleID != SDCookies.getItem('author_locale')) {
            ele.setAttribute('contenteditable', false);
            root.$(ele).text("Switch to '" + document.defaultLocale + "' language to add content");
          } else if (ele.contentEditable == 'true') {
            root.$(ele).text(root.PLACEHOLDER_TEXT);
          }
        }
      }); // Remove the 'delete' button inside the pin-hotspot content.


      if (!this.walkthrough.get('can_edit')) this.$('.drop_pin .pin-tooltip .pin-delete').remove();
    },
    setFilmStripCurrentSlide: function (order) {
      this.$('.slides_wraper .slides_container .slide').removeClass('active');
      this.$('.slides_wraper .slides_container .slide[order=' + order + ']').addClass('active');
    },
    toggleNotesHotspotsEditOptions: function () {
      var slideType = this.$('#slider' + this.currentSlide().order).attr('slide-type');

      if (this.walkthrough.get('can_edit')) {
        if (slideType == '360') {
          this.$('.edit-drop-pin').removeClass('disabled');
          this.$('.edit-highlighter').addClass('disabled');
        } else if (['content', 'pdf'].includes(slideType)) {
          this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
        } else if (['file'].includes(slideType)) {
          this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
        } else {
          this.$('.edit-drop-pin, .edit-highlighter').removeClass('disabled');
        }

        if (slideType == 'sandbox') {
          this.$('.notes h1').hide();
          if (this.$('.notes p').attr('contenteditable') == 'false') this.$('.notes p').attr('contenteditable', true);
        } else {
          this.$('.notes h1').show();
        } // Set Add Slide notes options.


        this.setNotesEditOptions();
      } else {
        this.$('.edit-drop-pin, .edit-highlighter').addClass('disabled');
        this.$('.delete-slide').addClass('disabled');
      }

      var current_slide = this.currentSlide();
      var unEditableNotesText = "Switch to '" + document.defaultLocale + "' language to add content";

      if (!current_slide.title) {
        if (document.defaultLocaleID !== SDCookies.getItem('author_locale') && slideType != 'sandbox' && !current_slide.is_translation_available) {
          this.$('.notes h1').attr('contenteditable', false).text(unEditableNotesText);
        } else if (this.$('.notes h1').attr('contenteditable') == 'true' && !this.$('.notes p').text().length) {
          this.$('.notes h1').text(this.PLACEHOLDER_TEXT);
        }
      }

      if (!current_slide.text) {
        if (document.defaultLocaleID !== SDCookies.getItem('author_locale') && slideType != 'sandbox' && !current_slide.is_translation_available) {
          this.$('.notes p').attr('contenteditable', false).text(unEditableNotesText);
        } else if (this.$('.notes p').attr('contenteditable') == 'true' && !this.$('.notes p').text().length) {
          this.$('.notes p').text(this.PLACEHOLDER_TEXT);
        }
      }
    },
    // Upload a resource and create a New-Slide preview.
    previewSlideMedia: function (event) {
      this.$('.slide_options.active').removeClass('error');
      this.$('.slide_options.active .error-message').text('');
      var currElem = this.$(event.currentTarget);
      var mediaType = currElem.attr('media-type');
      var mediaFilesCount = event.currentTarget.files;

      if (mediaType == "360" || mediaType == "image" && mediaFilesCount.length > 1) {
        this.previewMultipleImagesSettings({
          'action': 'newFrame',
          'images': mediaFilesCount,
          'classType': 'new',
          'mediaType': mediaType
        });
        return this.$(event.currentTarget).replaceWith(this.$(event.currentTarget).val('').clone(true));
      }

      ;
      var media = event.target.files[0];
      var validationResult = this.mediaValidation(event, media);

      if (!validationResult[0]) {
        this.$('.slide_options.active').addClass('error');
        this.$('.slide_options.active .error-message').text(validationResult[1]);
        return this.$(event.currentTarget).replaceWith(this.$(event.currentTarget).val('').clone(true));
      }

      ;
      this.hideCancelSlideOptionIcon();
      var uploadJsonData = {
        'media': media,
        'mediaType': mediaType,
        'resourceList': [] // 'resourceList' is used while uploading pdf(single pages).

      };
      this.uploadResource(uploadJsonData);
    },
    // Convert base64/URLEncoded data component to raw binary data held in a string.
    dataURItoBlob: function (dataURI) {
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);else byteString = unescape(dataURI.split(',')[1]); // separate out the mime component

      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // write the bytes of the string to a typed array

      var imgArray = new Uint8Array(byteString.length);

      for (var i = 0; i < byteString.length; i++) {
        imgArray[i] = byteString.charCodeAt(i);
      }

      return new Blob([imgArray], {
        type: mimeString
      });
    },
    getImageData: function (dataURL) {
      var root = this;
      var imageData = {};

      if (dataURL.startsWith('data:image')) {
        // If the url is a data url then return the blob data.
        imageData.type = 'BLOB';
        imageData.data = this.dataURItoBlob(dataURL);
      } else {
        // If the url is the http url, then return its name along with its position value.
        imageData.type = 'NAME';
        imageData.data = dataURL.match(/.*\/(.*)()$/)[1].split('?_')[0];
        ;
      }

      return imageData;
    },

    /**
    * Upload request to resource-api done by:
    * initiateSaveMultipleImages, saveSingle360Frame,
    * uploadResource, replaceSlideMedia, urlMediaUpload,
    * showTextEditor, saveTextEditorContent.
    */
    uploadResource: function (uploadJsonData) {
      var curSlideOrder = this.currentViewHasSlides() ? Common.CURRENT_SLIDE + 1 : 1;
      var walkthroughSlug = this.walkthrough.get('slug');
      var data = this.getResourceFormData({
        type: uploadJsonData.mediaType,
        is_new: 'true'
      });
      var progressBarData = {};
      data.append('resource', uploadJsonData.media);
      this.resource = new Resource(data);
      var root = this;
      this.resource.save(data, {
        xhr: function () {
          var xhr = new XMLHttpRequest(); // Upload progress.

          xhr.upload.addEventListener("progress", function (e) {
            root.uploadProgress(e, uploadJsonData.mediaType, progressBarData);
          }, false);
          xhr.upload.addEventListener("error", function (e) {
            // Upload error event goes here.
            root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
            root.$('.uploadFile, .resourceUrl').removeClass('disabled');
            root.uploadFailure();
            root.$('.upload_retry').removeClass('embed');
            root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
          }, false);
          return xhr;
        },
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (xhr, response) {
          if (response.status == 'SLIDE_ERROR') {
            root.uploadError(uploadJsonData, xhr.status);
            return;
          } // 'resourceList' is used to store resource paths,
          // in-case any error occurs while uploading, this list is used to remove resources.


          if (response.primary_resource && response.primary_resource.path) {
            uploadJsonData.resourceList.push(response.primary_resource.path);
          }

          root.uploadSuccess();
          setTimeout(function () {
            root.hideAddSlide(); // Fetch updated walkthrough and render new player

            root.current_view.walkthrough = new Walkthrough({
              id: root.walkthrough_id
            });
            $.when(root.current_view.walkthrough.fetch()).done(function () {
              root.current_view.render();
              Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
            });
          }, 1800);
        },
        error: function (model, xhr, message) {
          if (xhr.status == 412) uploadJsonData.error_message = Translate(xhr.responseJSON.message);
          root.uploadError(uploadJsonData, xhr.status);
        }
      });
    },
    getResourceFormData: function (jsonData) {
      var curSlideOrder = this.currentViewHasSlides() ? Common.CURRENT_SLIDE + 1 : 1;

      if (jsonData.is_new == 'false') {
        curSlideOrder = Common.CURRENT_SLIDE;
      }

      var walkthroughSlug = this.walkthrough.get('slug');
      var data = new FormData();
      data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      data.append('walkthrough', walkthroughSlug);
      data.append('slide_order', curSlideOrder);
      data.append('is_new', jsonData.is_new);
      data.append('external', 'false');
      data.append('type', jsonData.type);
      return data;
    },
    add360SlideFrames: function (event) {
      var statusTxt = this.$('.slide-360-preview-wrap').attr('media-type') == 'image' ? 'Adding... ' : 'Stitching... ';
      this.$('.upload_media_status').addClass('active');
      this.$('.upload_status_update').html(statusTxt);
      this.$(".file-progressbar").show();
      this.$(".file-progressbar-status").css({
        'width': '100%'
      });
      var framesData = {
        'action': 'newFrame',
        'images': event.currentTarget.files,
        'mediaType': this.$('.slide-360-preview-wrap').attr('media-type')
      }; // While adding a single new frame -- 'update'.
      // While adding new Slide, new frames -- 'new'.

      framesData.classType = this.$el.hasClass('slide-360-settings-active') ? 'update' : 'new';
      this.previewMultipleImagesSettings(framesData);
      $(event.currentTarget).replaceWith($(event.currentTarget).val('').clone(true));
      setTimeout(function () {
        this.$('.upload_media_status').removeClass('active');
        this.$('.upload_status_update').html('Uploading... ');
        this.$(".file-progressbar-status").css({
          'width': '0%'
        });
      }, 1000);
    },

    /**
    * 'Edit Your Frames' overlay.
    * params:
    *   framesData - 
    *       {'action': 'newFrame/editFrame',
    *        'images': 'img-List',
    *        'classType': 'new/update',
    *        'count': 'frames-count',
    *        'path': 'frames-path'}.
    */
    previewMultipleImagesSettings: function (framesData) {
      var root = this,
          sortableTitle;
      this.$('.create-new').hide(); // Set the mediaType for the "Done" button.

      this.$('.done-360:not(.disabled)').attr('mediaType', framesData.mediaType);
      framesData.mediaType == 'image' ? sortableTitle = 'Edit your images' : sortableTitle = 'Edit your frames';
      this.$('.slide-360-preview-wrap').addClass('active ' + framesData.classType).attr('media-type', framesData.mediaType).find('.title').html(sortableTitle);

      if (framesData.action == 'newFrame') {
        this.$('.slide_options').removeClass('active');
        var previewImgCount = this.$('.slide_360_frames_wrap ul li[order]').length;

        _.each(framesData.images, function (image, index) {
          var reader = new FileReader();
          var imgPreview = '<li class="sortable-item" draggable="true" order="' + (previewImgCount + index) + '">' + '<img draggable="false" src />' + '<span draggable="false"></span>' + '<div draggable="false">' + image.name + '</div>' + '</li>';

          if (framesData.classType == 'update') {
            imgPreview = '<li class="sortable-item" draggable="true" tag_id="NewFrame" order="' + (previewImgCount + index) + '">' + '<img draggable="false" src />' + '<span draggable="false"></span>' + '<div draggable="false">' + image.name + '</div>' + '</li>';
            root.track360UserActions('newFrameEdit', 'true');
          }

          $(imgPreview).insertBefore('.slide_360_frames_wrap ul li:last-child'); // Add HTML tag and then set source to avoid delay in loading image source

          reader.addEventListener("load", function () {
            $('.slide_360_frames_wrap ul li[order="' + (previewImgCount + index) + '"] img').attr('src', this.result);
          });
          reader.readAsDataURL(image);
        });
      } else if (framesData.action == 'editFrame') {
        var current_slide = this.currentSlide();
        var frameDivList = this.$('#slider' + current_slide.order + ' .product-viewer').children();

        for (var i = 0; i < framesData.count; i++) {
          var spanEle = '';

          if ($(frameDivList[i]).children('div.drop_pin').length) {
            $(frameDivList[i]).children('div.drop_pin').each(function (index, ele) {
              spanEle += '<span pin-id="' + ele.getAttribute('pin-id') + '"></span>';
            });
          } // To prevent browser image cache 'cb' - cache-buster.


          var path = `${framesData.path}/${i + 1}.jpg`;
          $(`<li class="sortable-item" draggable="true">
                       <img draggable="false" src=${path} />
                       <span draggable="false"></span>
                       <div draggable="false">${i + 1}.jpg</div>${spanEle}</li>`).insertBefore('.slide_360_frames_wrap ul li:last-child');
        }
      }

      if (framesData.mediaType !== "image") {
        setTimeout(function () {
          root.check360Frames();
        }, 1000);
      }
    },
    sortableDragStarted: function (e) {
      this.createDropZones(e);
      document.source = e.currentTarget;
      $('.sortable-item, .dropzone').addClass('droppable-zone');
      e.originalEvent.dataTransfer.setData("text/plain", e.currentTarget.innerHTML);
      e.originalEvent.dataTransfer.effectAllowed = "move";
    },
    sortableDraggingOver: function (e) {
      e.preventDefault();
      $(e.currentTarget).addClass('drop-here');
      e.originalEvent.dataTransfer.dropEffect = "move";
    },
    sortableDraggingLeave: function (e) {
      $(e.currentTarget).removeClass('drop-here');
    },
    sortableElemDropped: function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.source.innerHTML = e.currentTarget.innerHTML;
      e.currentTarget.innerHTML = e.originalEvent.dataTransfer.getData("text/plain");
      this.deleteDropZones(e);
      this.track360UserActions('reOrderFrame', 'true');
    },
    createDropZones: function (e) {
      if (!document.fakesActive) {
        this.$(e.currentTarget).parent().children('.sortable-item').each(function () {
          $("<li class='dropzone'></li>").insertAfter(this);
        });
        this.$(e.currentTarget).parent().prepend("<li class='dropzone'></li>");
        document.fakesActive = true;
      }
    },
    deleteDropZones: function (e) {
      $(".slide_360_frames_wrap ul li").removeClass('droppable-zone drop-here');
      this.$(".slide_360_frames_wrap ul").children(':not(.add-frame)').each(function () {
        if (!$(this).text()) {
          $(this).remove();
        } else {
          $(this).removeClass("dropzone").addClass('sortable-item').attr('draggable', true);
        }
      });
      fakesActive = false;
    },
    // Disables the Done button if there are only two image frames.
    check360Frames: function () {
      if (this.$('.player_wrap .slide_360_frames_wrap li img').length < 3) {
        this.$('.done-360').addClass('disabled');
      } else {
        this.$('.done-360').removeClass('disabled');
      }

      ;
    },
    track360UserActions: function (event, data) {
      var userActions = JSON.parse(localStorage.getItem('userActions')) || {};
      var listData = userActions[event] || [];
      userActions[event] = listData.concat(data);
      localStorage.setItem('userActions', JSON.stringify(userActions));
    },
    close360Preview: function () {
      this.$('.slide-360-preview-wrap').removeClass('active new update').removeAttr('media-type');
      this.$('.slide_360_frames_wrap ul li').not('.add-frame').remove();
      this.$('.create-new').show();

      if (!this.$el.hasClass('slide-360-settings-active')) {
        this.showSlidesOption();
      } else {
        this.$el.removeClass('slide-360-settings-active');
      }

      ;
      this.clearLocalStorage(['userActions']); // Remove the attribute on "Done" button once the preview is closed.

      this.$('.done-360:not(.disabled)').removeAttr('mediaType');
      this.showCancelSlideOptionIcon();
    },
    delete360FrameWarning: function (event) {
      var index = this.$(event.currentTarget).parent().index();
      var delete_warning_for = this.$('.slide-360-preview-wrap').attr('media-type');
      this.$('.frame-360-delete-warning .delete').attr('data-index', index);
      this.$('.frame-delete-warning').hide();
      this.$('.' + delete_warning_for + '-warning').show();
      this.popupShow('frame-360-delete-warning');
    },
    delete360Frame: function (event) {
      var frameno = parseInt(this.$(event.currentTarget).attr('data-index'));
      var deleteFrameElement = this.$(".slide_360_frames_wrap ul li").eq(frameno);
      var spanPinList = deleteFrameElement.children('span[pin-id]');
      var mediaType = this.$('.slide-360-preview-wrap').attr('media-type');
      var pinIdList = [];

      for (var i = 0; i < spanPinList.length; i++) {
        pinIdList.push(spanPinList[i].getAttribute('pin-id'));
      } // If the 'li' is newly added image resource, then don't track its removal.


      if (!deleteFrameElement.attr('tag_id')) {
        var imgSrc = deleteFrameElement.children('img')[0].src;
        var imgName = imgSrc.match(/.*\/(.*)()$/)[1].split('?_')[0];
        this.track360UserActions('deleteFrame', [imgName]);
      }

      this.track360UserActions('deletePin', pinIdList);
      deleteFrameElement.remove();
      var root = this;

      _.each(this.$(".slide_360_frames_wrap ul li[order]"), function (elem, idx) {
        root.$(elem).attr('order', idx);
      });

      this.popupClose('frame-360-delete-warning');

      if (mediaType !== 'image') {
        this.check360Frames();
      }
    },

    /**
    * Initiating saving of 360 frames, send 'action_event' - 'initiate' signal to Resource api.
    * Also used in Multiple Image as Slides upload.
    */
    initiateSaveMultipleImages: function () {
      var root = this;
      this.hideCancelSlideOptionIcon();
      var imgFramesList = $('.player_wrap .slide_360_frames_wrap li img');
      if (imgFramesList.length == 0) return;
      var is_new = 'true';
      var path = '';
      var mediaType = $('.done-360:not(.disabled)').attr('mediaType');
      var data = this.getResourceFormData({
        'type': mediaType,
        'is_new': is_new
      }); // If the mediaType is '360', then send 'initiate' signal,
      // else upload/save the mulitple images as slides. 

      var actionEvent, imgFramesData;

      if (mediaType == '360') {
        actionEvent = 'initiate';
      } else {
        actionEvent = 'images-multiple'; // For Multiple Img upload, imgFramesData is a list containing only slides' order.

        imgFramesData = [];

        for (var i = 0; i < imgFramesList.length; i++) {
          var imgData = root.getImageData(imgFramesList[i].src); // imgFramesData contains images' order starting from 0, which is used for slide_order.

          imgFramesData.push(i);
          data.append('resource_' + i, imgData.data);
        }
      }

      var userActions = {};
      var deleteFrame = []; // While 'editing' set 'is_new' as false, and set the 'path'.

      if (this.$('.slide-360-preview-wrap').hasClass('active update')) {
        var current_slide = this.currentSlide();
        path = current_slide.primary_resource.path;
        is_new = 'false';
        data = this.getResourceFormData({
          'type': mediaType,
          'is_new': is_new
        });
        actionEvent = 'edit';
        userActions = JSON.parse(localStorage.getItem('userActions'));
        if (userActions) deleteFrame = userActions['deleteFrame'];
        imgFramesData = {};

        for (var i = 0; i < imgFramesList.length; i++) {
          var imgData = this.getImageData(imgFramesList[i].src); // JSON data containing imgFrame position as 'key', and imgData as 'value'.

          if (imgData.type == 'BLOB') {
            // New image files are appended as file resources with current imgFrame postion number.
            imgFramesData[i + 1] = 'img_resource';
            data.append('resource_' + (i + 1), imgData.data);
          } else if (imgData.type == 'NAME') {
            // For repositioned images, only file names are sent.
            imgFramesData[i + 1] = imgData.data;
          }
        }
      }

      data.append('frames', JSON.stringify({
        'action_event': actionEvent,
        'path': path,
        'user_actions': userActions,
        'img_frames_data': imgFramesData
      }));
      this.resource = new Resource(data);
      this.resource.save(data, {
        xhr: function () {
          var xhr = new XMLHttpRequest(); // Upload progress

          xhr.upload.addEventListener("progress", function (e) {
            root.uploadProgress(e, mediaType);
          }, false);
          xhr.upload.addEventListener("error", function (e) {
            // Upload error event goes here
            root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
            root.$('.uploadFile, .resourceUrl').removeClass('disabled');
            root.uploadFailure();
            root.$('.upload_retry').removeClass('embed');
            root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
          }, false);
          return xhr;
        },
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (xhr, response) {
          if (response.status == 'MULTI_IMAGE_UPLOAD_SUCCESS') {
            setTimeout(function () {
              root.hideAddSlide();
              root.$el.removeClass('slide-360-settings-active');
              var curSlideOrder = root.currentViewHasSlides() ? Common.CURRENT_SLIDE + 1 : 1; // Fetch updated walkthrough and render new player

              root.current_view.walkthrough = new Walkthrough({
                id: root.walkthrough_id
              });
              $.when(root.current_view.walkthrough.fetch()).done(function () {
                root.current_view.render();
                Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
              });
            }, 1500);
          } else if (response.path) {
            root.clearLocalStorage(['userActions', 'currentFrameNum', 'framesPath']);

            if (is_new == 'false') {
              // Update hotspots alog with frames.
              if (userActions && userActions['deletePin']) root.updatePin360Frames('delete', userActions['deletePin']);
              var listItem = $('.player_wrap .slide_360_frames_wrap li');
              root.updatePin360Frames('change-frame', listItem);
              setTimeout(function () {
                root.hideAddSlide();
                root.$el.removeClass('slide-360-settings-active');
                var curSlideOrder = Common.CURRENT_SLIDE; // Fetch updated walkthrough and render new player

                root.current_view.walkthrough = new Walkthrough({
                  id: root.walkthrough_id
                });
                $.when(root.current_view.walkthrough.fetch()).done(function () {
                  root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
                });
              }, 1500);
              return;
            } else if (actionEvent != 'edit') {
              root.save360Images({
                'imgFramesList': imgFramesList,
                'totalFrames': imgFramesList.length,
                'currentFrameNum': 0,
                'path': response.path,
                'is_new': is_new
              }); // List indexing starts from '0'.
            }
          } // Remove the attribute on "Done" button once the uploading is initiated.


          root.$('.done-360:not(.disabled)').removeAttr('mediaType');
        },
        error: function (xhr, status_code, response) {
          root.uploadError({
            'mediaType': mediaType
          }, status_code.status);
        }
      });
    },
    save360Images: function (framesData) {
      var root = this; // Start saving the image frames, untill all the frames are saved.

      if (framesData.currentFrameNum < framesData.totalFrames) {
        var img = framesData.imgFramesList[framesData.currentFrameNum];
        var imgData = this.getImageData(img.src);

        if (imgData.type == 'BLOB') {
          framesData.imgBlob = imgData.data;
        } else if (imgData.type == 'NAME') {
          framesData.imgName = imgData.imgName;
        }

        localStorage.setItem('currentFrameNum', framesData.currentFrameNum);
        localStorage.setItem('framesPath', framesData.path);
        this.saveSingle360Frame(framesData);
      } else if (framesData.currentFrameNum == framesData.totalFrames) {
        setTimeout(function () {
          root.hideAddSlide();
          root.$el.removeClass('slide-360-settings-active');
          var curSlideOrder = root.currentViewHasSlides() ? Common.CURRENT_SLIDE + 1 : 1;

          if (framesData.is_new == 'false') {
            curSlideOrder = Common.CURRENT_SLIDE;
          } // Fetch updated walkthrough and render new player


          root.current_view.walkthrough = new Walkthrough({
            id: root.walkthrough_id
          });
          $.when(root.current_view.walkthrough.fetch()).done(function () {
            root.current_view.render();
            Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
          });
        }, 1500);
        this.clearLocalStorage(['currentFrameNum', 'framesPath']);
      }
    },

    /**
    * Set 'action_event' as 'save_frame', and save one frame at a time thru Resource api,
    * increment currentFrame after saving.
    */
    saveSingle360Frame: function (framesData) {
      var root = this;
      var mediaType = '360';
      var data = this.getResourceFormData({
        type: mediaType,
        is_new: framesData.is_new
      });
      data.append('frames', JSON.stringify({
        'action_event': 'save_frame',
        'path': framesData.path,
        'frame_number': (framesData.currentFrameNum + 1).toString(),
        // Indexing starts from 0, so increment by 1.
        'img_name': framesData.imgName
      }));
      data.append('resource', framesData.imgBlob);
      this.resource = new Resource(data);
      this.resource.save(data, {
        xhr: function () {
          var xhr = new XMLHttpRequest(); // Upload progress

          xhr.upload.addEventListener("progress", function (e) {
            root.uploadProgress(e, mediaType, {
              'current': framesData.currentFrameNum + 1,
              'total': framesData.totalFrames,
              'is_new': framesData.is_new
            });
          }, false);
          xhr.upload.addEventListener("error", function (e) {
            // Upload error event goes here
            root.$('.slide-file[media-type=' + uploadJsonData.mediaType + ']').removeAttr('disabled');
            root.$('.uploadFile, .resourceUrl').removeClass('disabled');
            root.uploadFailure();
            root.$('.upload_retry').removeClass('embed');
            root.$('.upload_media_status').attr('media-type', uploadJsonData.mediaType);
          }, false);
          return xhr;
        },
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (xhr, response) {
          framesData.currentFrameNum += 1;
          framesData.imgBlob = null;
          framesData.imgName = null;
          root.save360Images(framesData);
        },
        error: function (xhr, status_code, response) {
          root.uploadError({
            'mediaType': mediaType
          }, status_code.status);
        }
      });
    },
    updatePin360Frames: function (action, listItem) {
      var root = this;

      if (action == 'change-frame') {
        listItem.each(function (index, ele) {
          if ($(ele).children('span[pin-id]').length) {
            $(ele).children('span[pin-id]').each(function (i, e) {
              var pinId = parseInt(e.getAttribute('pin-id'));
              var frameNum = index + 1;
              var slide = new Slide({
                id: Common.CURRENT_SLIDE,
                walkthrough_id: root.walkthrough_id,
                entity: {
                  type: 'pin',
                  event: action,
                  entity_id: pinId,
                  value: {
                    frame_number: frameNum.toString()
                  }
                }
              });
              slide.save(null, {
                patch: true,
                error: function (xhr, status_code, response) {
                  throw 'UpdatePinError- ' + response.status;
                }
              });
            });
          }
        });
      } else if (action == 'delete') {
        listItem.forEach(function (ele, index) {
          var pinId = parseInt(ele);
          var slide = new Slide({
            id: Common.CURRENT_SLIDE,
            walkthrough_id: root.walkthrough_id,
            entity: {
              type: 'pin',
              event: action,
              entity_id: pinId
            }
          }); // Remove the Pin entry, and its span element.

          slide.save(null, {
            patch: true,
            success: function () {
              root.$('span[pin-id="' + pinId + '"]').remove();
            },
            error: function (xhr, status_code, response) {
              throw 'DeletePinError- ' + response.status;
            }
          });
        });
      }
    },
    // Upload progress event goes here.
    uploadProgress: function (event, mediaType, progressBarData) {
      var uploadCountText = '',
          uploadText = '';

      if (mediaType == '360' || mediaType == 'pdf') {
        uploadText = 'Updating... ';
      }

      var loadedProgress, totalProgress;

      if (!$.isEmptyObject(progressBarData)) {
        var progressText = '';

        if (mediaType == 'pdf') {
          progressText = ' pages';
        } else if (mediaType == '360') {
          progressText = ' frames';
        }

        uploadCountText = progressBarData.current + ' out of ' + progressBarData.total + progressText;

        if (progressBarData.is_new && progressBarData.is_new == 'false') {
          uploadText = 'Updating... ' + uploadCountText;
        } else {
          uploadText = 'Uploading... ' + uploadCountText;
        }

        loadedProgress = progressBarData.current;
        totalProgress = progressBarData.total;
      } else {
        loadedProgress = event.loaded;
        totalProgress = event.total;
      }

      this.$('.slide-file[media-type=' + mediaType + ']').attr('disabled', 'disabled');
      this.$('.uploadFile, .resourceUrl').addClass('disabled');

      if (event.lengthComputable) {
        this.$(".new_slide_options, .slide_options").removeClass('active');
        this.$(".upload_media_status").addClass('active');
        this.$('.upload_status_update').html(uploadText);
        this.$(".file-progressbar").show();
        var percentLoaded = parseInt(loadedProgress / totalProgress * 100, 10);
        this.$(".file-progressbar-status").css({
          'width': percentLoaded + '%'
        });
      }
    },
    uploadSuccess: function () {
      this.$(".file-progressbar-status").css({
        'width': '100%'
      }).addClass('success');
      this.$('.upload_status_update').html('<div class="update_status_success"><span>Great!</span> Upload completed</div>');
      setTimeout(function () {
        this.$(".file-progressbar").removeClass('success').hide();
        this.$(".upload_status_successs").addClass('active');
      }, 500);
    },
    uploadError: function (jsonErrorData, status_code) {
      this.$('.slide-file[media-type=' + jsonErrorData.mediaType + ']').removeAttr('disabled');
      this.$('.uploadFile, .resourceUrl').removeClass('disabled');

      if (status_code != 418) {
        this.uploadFailure(jsonErrorData.error_message);
      } else {
        this.malwareFound();
      }

      this.$('.upload_media_status').attr('media-type', jsonErrorData.mediaType);
      this.$('.upload_retry').removeClass('embed'); // Send an api request to delete the resource.

      if (jsonErrorData.resourceList) {
        for (var i = 0; i < jsonErrorData.resourceList.length; i++) {
          var resource = new Resource({
            id: jsonErrorData.resourceList[i]
          });
          resource.destroy();
        }
      }
    },
    malwareFound: function () {
      $('.slide-file').val('');
      this.$('.slide_360_frames_wrap').find('li[class="sortable-item"]').remove();
      this.$(".new_slide_options, .slide_options, .upload_status_failed").removeClass('active');
      this.$(".upload_media_status").addClass('active');
      this.$('.upload_status_update').empty();
      this.$(".file-progressbar-status").css({
        'width': '100%'
      }).addClass('failed');
      setTimeout(function () {
        this.$(".file-progressbar-status").removeClass('failed');
        this.$(".file-progressbar").hide();
        this.$(".malware-error").addClass('active');
      }, 350);
    },
    uploadFailure: function (error_message) {
      this.$(".new_slide_options, .slide_options, .malware-error").removeClass('active');
      this.$(".upload_media_status").addClass('active');
      this.$(".file-progressbar-status").css({
        'width': '100%'
      }).addClass('failed');

      if (error_message) {
        this.$('.upload_status_update').html('<div class="update_status_failed"><span>Oops!</span> ' + error_message + '</div>');
      } else {
        this.$('.upload_status_update').html('<div class="update_status_failed"><span>Oops!</span> Something went wrong</div>');
      }

      setTimeout(function () {
        this.$(".file-progressbar-status").removeClass('failed');
        this.$(".file-progressbar").hide();
        this.$(".upload_status_failed").addClass('active');

        if (error_message) {
          this.$(".upload_retry").hide();
        }
      }, 350);
    },
    displayUploadBox: function () {
      this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
      this.$('.create-new').show();
      this.$('.side-info-opener .icon, .wt-title-edit').removeClass('disabled');

      if (this.$el.hasClass('slide-360-settings-active')) {
        this.close360Preview();
      } else {
        this.showSlidesOption();
      }
    },
    retryUpload: function (event) {
      var mediaType = $('.upload_media_status').attr('media-type');

      if (mediaType == '360') {
        // If type is 360, then get the currentFrame and path, send it back to server.
        var framesData = {};
        var is_new = 'true';
        framesData.path = localStorage.getItem('framesPath'); // Set the mediaType for the "Done" button.

        this.$('.done-360:not(.disabled)').attr('mediaType', mediaType); // While editing - 'retry'. 

        if (this.$('.slide-360-preview-wrap').hasClass('active update')) {
          this.initiateSaveMultipleImages();
        } else {
          framesData.currentFrameNum = eval(localStorage.getItem('currentFrameNum'));
          framesData.imgFramesList = $('.player_wrap .slide_360_frames_wrap li img');
          framesData.totalFrames = $('.player_wrap .slide_360_frames_wrap li img').length;
          framesData.is_new = is_new;
          this.save360Images(framesData);
        }

        this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
        return;
      }

      if ($(event.currentTarget).hasClass('embed')) {
        this.$('.author_fade [data-slide = slide_' + mediaType + '] .url_upload').trigger('click');
      } else {
        this.$('.author_fade [data-slide = slide_' + mediaType + '] .slide-file').trigger('change');
      }

      this.$(".upload_media_status, .upload_status_failed, .malware-error").removeClass('active');
    },
    clearLocalStorage: function (itemsList) {
      _.each(itemsList, function (item) {
        localStorage.removeItem(item);
      });
    },
    replaceSlideMedia: function (event) {
      event.preventDefault();
      this.$('form[name=replace-media] input[type=submit]').prop('disabled', true);
      var validation = true,
          mediaType = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).attr('media-type');

      if (mediaType == 'link') {
        var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();

        if (!url.trim()) {
          validation = false;
        } else if (!Common.validateUrl(url)) {
          validation = false;
        } else {
          this.actionInProgress('popup-slide-settings');
          var unfurlData = this.urlUnfurling(url, "/url-unfurl");

          if (unfurlData.isError) {
            validation = false;
            this.actionFailed('popup-slide-settings');
          }
        }
      } else if (mediaType == 'iframe') {
        var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();

        if (!url.trim()) {
          validation = false;
        } else if (!Common.validateUrl(url)) {
          validation = false;
        }
      } else if (mediaType == 'embed') {
        var url = this.$('form[name=replace-media] input[name=replace_resource]').eq(0).val();
        var videoDetails = Common.getEmbedVideoDetails(url);

        if (!url.trim() || !videoDetails) {
          validation = false;
        }
      } else if (mediaType == "file") {
        return this.replaceFileSlide();
      }

      if (!validation) {
        var parentBlock = this.$('form[name=replace-media] input[name=replace_resource]').parents('.block');
        parentBlock.addClass('error');
        parentBlock.find('.error-message').text('Not a valid URL');
        return;
      }

      this.actionInProgress('popup-slide-settings');
      var root = this;

      _.each(this.$('form[name=replace-media] input[name=replace_resource]'), function (ele) {
        if (ele.value) {
          let mediaType = ele.getAttribute('media-type');

          var data = new FormData(),
              isExternal = _.contains(['embed', 'link', 'iframe'], ele.getAttribute('media-type'));

          data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
          data.append('walkthrough', root.walkthrough.get('slug'));
          data.append('slide_order', Common.CURRENT_SLIDE);
          data.append('is_new', 'false');
          data.append('external', isExternal.toString());
          data.append('type', mediaType);

          if (ele.getAttribute('media-type') == 'embed') {
            data.append('thumbnail_url', videoDetails['thumbnail_url']);
            data.append('path', videoDetails['src']);
          } else if (ele.getAttribute('media-type') == 'link') {
            data.append('path', ele.value);
            data.append('frames', JSON.stringify(unfurlData.metaData));
          } else if (ele.getAttribute('media-type') == 'iframe') {
            data.append('path', ele.value);
          }

          if (ele.files && ele.files[0]) {
            data.append('resource', ele.files[0]);
          }

          var resource = new Resource(data);
          resource.save(data, {
            processData: false,
            cache: false,
            contentType: false,
            data: data,
            success: function () {
              root.actionSuccess('popup-slide-settings');
              root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, Common.CURRENT_SLIDE);
            },
            error: function () {
              return root.actionFailed('popup-slide-settings');
            }
          });
        }
      });
    },
    // Function to replace file or adding name and icon to a file type slide.
    replaceFileSlide: function () {
      let fileName = this.$('form[name=replace-media] input[name=file_name]').val(),
          fileObject = this.$('form[name=replace-media] input[name=replace_resource]'),
          coverImage = this.$('form[name=replace-media] input[name=file_cover_image]'),
          mediaType = "file",
          root = this;
      var data = new FormData();

      if (this.$('#upload-file-preview').attr('data-remove-image')) {
        data.append("cover_image_removed", "true");
      }

      data.append("walkthrough", this.walkthrough.get("slug"));
      data.append("slide_order", Common.CURRENT_SLIDE);
      data.append("is_new", "false");
      data.append("external", "false");
      data.append("type", mediaType);
      data.append("file_name", fileName);

      if (fileObject[0].files && fileObject[0].files[0]) {
        data.append("resource", fileObject[0].files[0]);
      }

      if (coverImage[0].files && coverImage[0].files[0]) {
        data.append("cover_image", coverImage[0].files[0]);
      }

      var resource = new Resource(data);
      resource.save(data, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function () {
          root.actionSuccess("popup-slide-settings");
          root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, Common.CURRENT_SLIDE);
        },
        error: function () {
          return root.actionFailed("popup-slide-settings");
        }
      });
    },
    previewReplaceSlideMedia: function (event) {
      var media = event.target.files && event.target.files[0];
      var mediaType = this.$(event.currentTarget).attr('media-type');
      if (['link', 'iframe', 'embed', 'wistia'].includes(mediaType)) return;
      var validationResult = this.mediaValidation(event, media);

      if (!validationResult[0]) {
        this.$(event.currentTarget).parent('.block').addClass('error');
        this.$(event.currentTarget).parent('.block').find('.error-message').text(validationResult[1]);
        this.$('form[name=replace-media] input[type=submit]').prop('disabled', true);
        return;
      } else {
        this.$(event.currentTarget).parent('.block').removeClass('error');
      }

      this.$(event.currentTarget).siblings('.file-name').text(media.name);

      if (mediaType == 'image') {
        this.$(event.currentTarget).siblings('img').attr('src', URL.createObjectURL(media));
      }

      if (!$('.popup-slide-settings .block').hasClass('error')) {
        this.$('form[name=replace-media] input[type=submit]').prop('disabled', false);
      }
    },
    urlUnfurling: function (url, endPoint) {
      var isError = false;
      var metaData, errorMessage;
      Backbone.ajax({
        async: false,
        dateType: "application/json",
        url: endPoint,
        data: {
          external_url: encodeURI(url)
        },
        success: function (response) {
          metaData = response;
        },
        error: function (requestObject, error, errorThrown) {
          isError = true;
          errorMessage = requestObject.responseJSON.message;
          console.log(error);
        }
      });
      return {
        isError: isError,
        metaData: metaData,
        errorMessage: errorMessage
      };
    },

    /**
    * Method to upload remote slide types.
    * 'link', 'embed', 'remote_pdf', 'iframe'.
    */
    urlMediaUpload: function (event) {
      if (this.$(event.currentTarget).parent().hasClass('disabled')) return;
      var type = this.$(event.currentTarget).siblings('input').attr('media-type'),
          validationResult = this.urlValidation(this.$(event.currentTarget).siblings('input'));

      if (!validationResult[0]) {
        this.$(event.currentTarget).parents('.slide_options').addClass('error');
        this.$(event.currentTarget).parents('.slide_options').find('.error-message').text(validationResult[1]);
        setTimeout(function () {
          this.$(event.currentTarget).parents('.slide_options').removeClass('error');
          this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
        }, 2000);
        return;
      }

      var url,
          unfurlData,
          data = {
        'walkthrough': this.walkthrough.get('slug'),
        'is_new': 'true',
        'external': 'true',
        'type': type
      };

      if (type == 'embed') {
        url = this.$(event.currentTarget).siblings('input').attr('embeded-url');
        data['thumbnail_url'] = Common.getEmbedVideoDetails(url)['thumbnail_url'];
      } else if (type == 'pdf') {
        data.type = 'remote_pdf';
        url = this.$(event.currentTarget).siblings('input').val();
      } else if (type == 'link') {
        url = this.$(event.currentTarget).siblings('input').val();
        this.$(".slide_options").removeClass('active');
        this.$(".upload_media_status").addClass('active');
        this.$('.upload_status_update').html('fetching...');
        unfurlData = this.urlUnfurling(url, "/url-unfurl");

        if (unfurlData.isError) {
          this.$(".slide_options[data-slide='slide_link']").addClass('active');
          this.$(".upload_media_status").removeClass('active');
          this.$('.upload_status_update').html('');
          this.$(event.currentTarget).parents('.slide_options').addClass('error');
          this.$(event.currentTarget).parents('.slide_options').find('.error-message').text("Enter a valid URL");
          setTimeout(function () {
            this.$(event.currentTarget).parents('.slide_options').removeClass('error');
            this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
          }, 2000);
          return;
        }
      } else if (type == 'iframe') {
        url = this.$(event.currentTarget).siblings('input').val();
        unfurlData = this.urlUnfurling(url, "/url-validate");

        if (unfurlData.isError) {
          this.$(".slide_options[data-slide='slide_iframe']").addClass('active');
          this.$(".upload_media_status").removeClass('active');
          this.$('.upload_status_update').html('');
          this.$(event.currentTarget).parents('.slide_options').addClass('error');
          this.$(event.currentTarget).parents('.slide_options').find('.error-message').text(unfurlData.errorMessage);
          setTimeout(function () {
            this.$(event.currentTarget).parents('.slide_options').removeClass('error');
            this.$(event.currentTarget).parents('.slide_options').find('.error-message').text('');
          }, 2000);
          return;
        }
      } else {
        url = this.$(event.currentTarget).siblings('input').val();
      }

      this.hideCancelSlideOptionIcon();
      this.$('.slide-file[media-type=' + type + ']').attr('disabled', 'disabled');
      this.$('.uploadFile, .resourceUrl, .upload-url, .upload-url').addClass('disabled');
      this.$('.slide_options.active .upload_media_block .close').addClass('disabled');
      var currentSlideOrder = this.currentViewHasSlides() ? Common.CURRENT_SLIDE + 1 : 1;
      data['slide_order'] = currentSlideOrder;
      data['path'] = url;
      if (type == 'link') data.frames = JSON.stringify(unfurlData.metaData);
      var root = this,
          resource = new Resource();
      resource.save(data, {
        success: function (xhr, response) {
          root.$(".new_slide_options, .slide_options").removeClass('active');
          root.$(".upload_media_status").addClass('active');
          root.$('.upload_status_update').html('Uploading...');
          root.$(".file-progressbar").show();
          root.uploadSuccess();
          setTimeout(function () {
            root.hideAddSlide(); // Fetch updated walkthrough and render new player

            root.current_view.walkthrough = new Walkthrough({
              id: root.walkthrough_id
            });
            $.when(root.current_view.walkthrough.fetch()).done(function () {
              root.current_view.render();
              Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, currentSlideOrder);
            });
          }, 1500);
        },
        error: function (xhr, response) {
          root.$('.slide-file[media-type=' + type + ']').removeAttr('disabled');
          root.$('.uploadFile, .resourceUrl, .upload-url, .upload-url').removeClass('disabled');
          root.$('.upload_retry').addClass('embed');
          root.$('.upload_media_status').attr('media-type', type);

          if (response.status == 418) {
            root.malwareFound();
          } else {
            root.uploadFailure();
          }
        }
      });
    },
    urlValidation: function (object) {
      var url = this.$(object).val().trim(),
          type = this.$(object).attr('media-type'),
          message = '',
          validation = false;

      switch (type) {
        case 'audio':
          if (!(url.match(/\.(mp3|wav)$/) != null)) {
            validation = false;
            message = "Oops! Please enter a valid audio URL.";
          } else {
            validation = true;
          }

          break;

        case 'embed':
          var videoDetails = Common.getEmbedVideoDetails(url);

          if (!videoDetails) {
            validation = false;
            message = "Oops! Please enter a valid video URL.";
          } else {
            this.$(object).attr('embeded-url', videoDetails.src);
            validation = true;
          }

          break;

        case 'iframe':
          if (!(url.match(/^(https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/) != null)) {
            validation = false;
            message = "Oops! Please enter a valid/Secure(HTTPS) URL.";
          } else {
            validation = true;
          }

          break;

        case 'image':
          if (!(url.match(/\.(jfif|jpeg|jpg|gif|png)$/) != null)) {
            validation = false;
            message = "Oops! Please enter a valid image URL.";
          } else {
            validation = true;
          }

          break;

        case 'link':
          if (!Common.validateUrl(url)) {
            validation = false;
            message = "Oops! Please enter a valid URL.";
          } else {
            validation = true;
          }

          break;

        case 'pdf':
          if (!(url.toLowerCase().match(/\.(pdf)$/) != null)) {
            validation = false;
            message = "Oops! Please enter a valid pdf URL.";
          } else {
            validation = true;
          }

          break;
      }

      if (!validation && message == '') {
        message = 'Oops! Something went wrong';
      }

      return [validation, Translate(message)];
    },
    mediaValidation: function (object, media) {
      var type = this.$(object.currentTarget).attr('media-type');
      var message,
          validStatus = false;
      let fileSizeMB = ['wistia', 'pdf', 'html5', 'video', 'file'].includes(type) ? media.size / 1000000 : '';

      if (type == 'image') {
        if (!media || !/\.(jfif|jpg|jpeg|png|gif)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid image file.";
        } else {
          validStatus = true;
        }
      } else if (type == 'video') {
        if (!media || !/\.(mp4|wmv|mpeg4|webm|ogg)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid video file.";
        } else if (fileSizeMB > Common.VIDEO_FILE_MAX_SIZE) {
          validStatus = false;
          message = `Your video cannot be uploaded because it's too large.
                               Allowed limit: ${Common.VIDEO_FILE_MAX_SIZE}MB.`;
        } else {
          validStatus = true;
        }
      } else if (type == 'audio') {
        if (!media || !/\.(mp3|wav)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid audio file.";
        } else {
          validStatus = true;
        }
      } else if (type == 'pdf') {
        if (!media || !/\.(pdf)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid pdf file.";
        } else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE) {
          validStatus = false;
          message = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE}MB.`;
        } else {
          validStatus = true;
        }
      } else if (type == 'html5') {
        if (!media || !/\.(zip|html)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid zip or html file.";
        } else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE) {
          validStatus = false;
          message = `Please upload a zip or html file which is less than
                               ${Common.DEFAULT_FILE_MAX_SIZE}MB.`;
        } else {
          validStatus = true;
        }
      } else if (type == 'sandbox') {
        if (!media || !/\.(json)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid json file.";
        } else {
          validStatus = true;
        }
      } else if (type == 'ppt') {
        if (!media || !/\.(ppt|pptx)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid ppt file.";
        } else {
          validStatus = true;
        }
      } else if (type == 'file') {
        if (!media || !/\.(ppt|pptx|pdf|zip|html|jpg|gif|jpeg|mp3|mp4|webm|ogg|txt|doc|docx)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid file";
        } else if (fileSizeMB > Common.DEFAULT_FILE_MAX_SIZE) {
          validStatus = false;
          message = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE} MB.`;
        } else {
          validStatus = true;
        }
      } else if (!validStatus && !message) {
        message = "Oops! Something went wrong";
      }

      return [validStatus, message];
    },
    showAddSlide: function (event) {
      if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
        return this.switchLanguageWarning();
      }

      if (!this.$(event.currentTarget).hasClass('active')) {
        this.showSlidesOption();
      } else {
        this.hideAddSlide();
      }
    },
    showSlidesOption: function () {
      this.$('.new_slide_options, .create-new').addClass('active');
      this.$el.addClass('new_slide_active');
      this.$('.options_block .options').addClass('bounceDownIn');
      setTimeout(function () {
        this.$('.new_slide_active .options_block .options').removeClass('bounceDownIn');
      }, 1000);
    },

    /**
    Clears the global variable CHAPTERS_LIST, once a chapter has been published.
    */
    clearChaptersList: function () {
      this.CHAPTERS_LIST = [];
    },

    /**
    * Send a GET request to Walkthrough api and fetch the chapters list.
    * Store it in CHAPTERS_LIST variable.
    */
    getChaptersList: function () {
      var walkthrough = new Walkthrough(),
          root = this;
      $.when(walkthrough.fetch({
        async: false,
        data: {
          get_details: 1
        },
        processData: true
      })).done(function (response, status, xhr) {
        root.CHAPTERS_LIST = response.map(chapter => {
          // Add tenant domain to each object in response.
          // ES6 Spread syntax.
          chapter.domain = window.location.origin;
          return chapter;
        });
      });
      return this.CHAPTERS_LIST;
    },
    hideAddSlide: function () {
      var root = this;
      this.$('.options_block .options').addClass('bounceUpOut');
      setTimeout(function () {
        root.$el.removeClass('new_slide_active');
        setTimeout(function () {
          this.$('.options_block .options').removeClass('bounceUpOut');
          this.$('.slide_options').removeClass('active');
        }, 500);
      }, 600);
      this.$('.create-new.slide, .upload_media_status, .upload_status_failed, new_slide_options').removeClass('active');
    },
    hideCancelSlideOptionIcon: function () {
      this.$('.create-new').hide();
      this.$('.side-info-opener .icon, .wt-title-edit').addClass('disabled');
    },
    showAddSlideOption: function (event) {
      this.$('.new_slide_options').removeClass('active');
      var slideType = this.$(event.currentTarget).attr('type');
      this.hideCancelSlideOptionIcon();

      if (slideType == "slide_content") {
        this.hideAddSlide();
        this.showTextEditor('new');
      } else {
        this.$('[data-slide ="' + slideType + '"]').addClass('active');
      }
    },
    showCancelSlideOptionIcon: function () {
      this.$('.create-new').show();
      this.$('.side-info-opener .icon, .wt-title-edit').removeClass('disabled');
    },
    showJourenyPopup: function (event) {
      this.$('.section-edit-block').hide();
      let journeys = new JourneyTree();
      let root = this;
      journeys.fetch({
        success: function (resp) {
          root.$("#create-edit-section .journey-form").html(JourneyList({
            'journeys': resp.attributes
          }));
        },
        error: function (xhr, status_code, message) {
          console.log("journeys fetch error:", xhr, status_code, message);
        }
      });
    },
    selectJourneys: function (event) {
      let selectedJourneys = this.$('#journey-sitemap .css-checkbox:checked');
      let journeyIds = [];

      _.each(selectedJourneys, journey => {
        let journeyDetails = {};
        let {
          name,
          id
        } = journey.parentElement.dataset;
        journeyIds.push({
          name,
          id
        });
      });

      this.$(".section-edit-block .journey-list ol").append(SectionJourneyList({
        'journeyList': journeyIds
      }));
      this.hideJourneyPopup();
      this.initializeSectionJourneyLinkSortable();
    },
    hideJourneyPopup: function (event) {
      this.$('.section-edit-block').show();
      this.$('.journey-browse-popup').hide();
    },
    getTextEditorOptions: function () {
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var uploadMethod = 'POST';
      var uploadParam = 'editor_file';
      let theme = $('#theme-name').attr('data-theme');
      let defaultOptions = {
        key: Common.FROALA_KEY,
        charCounterCount: false,
        toolbarSticky: true,
        colorsDefaultTab: 'text',
        colorsStep: 7,
        colorsHEXInput: true,
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
      };
      const defaultBMCOptions = {
        colorsText: Common.FROALA_BMC_COLORS_TEXT,
        tableStyles: Common.FROALA_BMC_TABLE_STYLES,
        tableMultipleStyles: false,
        paragraphMultipleStyles: false,
        inlineStyles: Common.FROALA_BMC_INLINE_STYLES,
        tableColors: Common.FROALA_BMC_TABLE_COLORS,
        fontSizeUnit: 'pt'
      };
      const defaultHELPOptions = {
        colorsText: Common.FROALA_HELP_COLORS_TEXT,
        tableStyles: Common.FROALA_HELP_TABLE_STYLES,
        tableMultipleStyles: false,
        paragraphMultipleStyles: false,
        inlineStyles: Common.FROALA_HELP_INLINE_STYLES,
        tableColors: Common.FROALA_HELP_TABLE_COLORS,
        fontSizeUnit: 'pt'
      };
      const defaultDEOptions = {
        inlineStyles: Common.FROALA_DE_INLINE_STYLES,
        tableColors: Common.FROALA_DE_TABLE_COLORS,
        tableStyles: Common.FROALA_DE_TABLE_STYLES,
        tableMultipleStyles: false,
        paragraphMultipleStyles: false,
        fontSizeUnit: 'pt'
      };

      switch (theme) {
        case 'bmc':
          return { ...defaultOptions,
            ...defaultBMCOptions
          };
          break;

        case 'helpsite':
          return { ...defaultOptions,
            ...defaultHELPOptions
          };
          break;

        case 'designeverest':
          return { ...defaultOptions,
            ...defaultDEOptions
          };
          break;

        default:
          return defaultOptions;
      }
    },
    showTextEditor: function (type) {
      let currentSlide = Common.CURRENT_SLIDE;
      $('#edit_container').addClass('text-editor-active');
      let content = "<h1>Title</h1><p>Write Something</p>";

      if (type == "new") {
        this.$('.select-layout').removeClass('disabled');
        this.$('.content-editor-wrap').addClass('NEW');
      } else {
        // Add a class name EDIT to the save button while editing, its checked inside saveTextEditorContent().
        content = this.$(`#slider${currentSlide} .content-slide-wrap .content-slide`).html();
        this.$('.content-editor-wrap').addClass('EDIT');
        this.$('.select-layout').addClass('disabled');
      }

      this.$('.content-editor-wrap').html(content); //this.froalaImageCaption();

      this.rteEmbedURL(); // Define data source for atwho.js

      var chaptersList = this.CHAPTERS_LIST.length ? this.CHAPTERS_LIST : this.getChaptersList(); // Define config for At.JS.

      var atJsConfig = {
        at: "@",
        data: chaptersList,
        searchKey: 'name',
        displayTpl: '<li>${name}</li>',
        insertTpl: '<a target="_blank" href=${domain}/#!/${url}>${atwho-at}${name}</a>',
        limit: null
      };
      var root = this;
      this.$('.content-editor-wrap').on('froalaEditor.initialized', function (e, editor) {
        /**  
         * Condition: On copy paste
         * Issue: If pasted content has table and table wider than container, it overflows
         * Action: Add wrapper div.fr-table-wrapper to restict the overflow
        */
        editor.events.on('paste.after', function (event) {
          let tableElem = $(this.el).find('table');

          for (let i = 0; i < tableElem.length; i++) {
            let tableWrapper = $(tableElem[i]).parent().hasClass('fr-table-wrapper');

            if (!tableWrapper) {
              $(tableElem[i]).wrap('<div class="fr-table-wrapper"></div>');
            }
          }
        });
        editor.$el.atwho(atJsConfig);
        editor.events.on('keydown', function (e) {
          if (e.which == $.FroalaEditor.KEYCODE.ENTER && editor.$el.atwho('isSelecting')) {
            return false;
          }
        }, true);
        editor.events.on('table.inserted', function (table) {
          $(table).wrap('<div class="fr-table-wrapper"></div>');
        });
      }).froalaEditor(root.getTextEditorOptions());
      $('.content-editor-wrap').on('froalaEditor.contentChanged', function (e, editor) {
        root.contentChanged();
      }); // Add download attr to the added file.

      $('.content-editor-wrap').on('froalaEditor.file.inserted', function (e, editor, $file, response) {
        // response will be the resource api response.
        response = JSON.parse(response);
        $file.attr('download', response.name);
      }); // Delete Locally uploded File.

      $('.content-editor-wrap').on('froalaEditor.file.unlink', function (e, editor, $file) {
        let filePath = $file.href.split("/").slice(-1)[0];
        root.deleteTextEditorUploadedFile(filePath);
      }); //  Delete locally uploaded Image.

      $('.content-editor-wrap').on('froalaEditor.image.removed', function (e, editor, $img) {
        let imagePath = $img.attr('src').split("/").slice(-1)[0];
        root.deleteTextEditorUploadedFile(imagePath);
      });
      $('.content-editor-wrap').on('froalaEditor.paste.after', function (e, editor) {
        editor.$el.find('a').attr('target', '_blank');
      });
    },
    froalaImageCaption: function () {
      var root = this; // Define popup template.

      $.extend($.FroalaEditor.POPUP_TEMPLATES, {
        "customPlugin.popup": '[_BUTTONS_][_CUSTOM_LAYER_]'
      }); // Define popup buttons.

      $.extend($.FroalaEditor.DEFAULTS, {
        popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2']
      }); // The custom popup is defined inside a plugin (new or existing).

      $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
        // Create custom popup.
        function initPopup() {
          // Popup buttons.
          var popup_buttons = ''; // Create the list of buttons.

          if (editor.opts.popupButtons.length > 1) {
            popup_buttons += '<div class="fr-buttons">';
            popup_buttons += editor.button.buildList(editor.opts.popupButtons);
            popup_buttons += '</div>';
          } // Load popup template.


          var template = {
            buttons: popup_buttons,
            custom_layer: '<div class="custom-layer">\
                                            <div class="fr-input-line">\
                                                <input name="caption" type="text" class="fr-caption-attr" placeholder="Caption" tabindex="1" dir="auto" >\
                                            </div>\
                                            <div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertCaption" tabIndex="2">Insert</button></div>\
                                        </div>'
          }; // Replace image with caption container

          var $popup = editor.popups.create('customPlugin.popup', template);
          return $popup;
        } // Show the popup


        function showPopup() {
          // Get the popup object defined above.
          var $popup = editor.popups.get('customPlugin.popup'); // If popup doesn't exist then create it.
          // To improve performance it is best to create the popup when it is first needed
          // and not when the editor is initialized.

          if (!$popup) $popup = initPopup(); // Set the editor toolbar as the popup's container.

          editor.popups.setContainer('customPlugin.popup', editor.$tb); // This will trigger the refresh event assigned to the popup.
          // editor.popups.refresh('customPlugin.popup');
          // This custom popup is opened by pressing a button from the editor's toolbar.
          // Get the button's object in order to place the popup relative to it.

          var $btn = $('.fr-command[data-cmd="imageCaption"]'); // Set the popup's position.

          var left = $btn.offset().left + $btn.outerWidth() / 2 - 45; //var top = ($btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10)) - 85;

          var top = $('.fr-popup.fr-desktop.fr-active').css('top').replace("px", ""); // Show the custom popup.
          // The button's outerHeight is required in case the popup needs to be displayed above it.

          editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
        } // Hide the custom popup.


        function hidePopup() {
          editor.popups.hide('customPlugin.popup');
        } // Methods visible outside the plugin.


        return {
          showPopup: showPopup,
          hidePopup: hidePopup
        };
      }; // image caption button


      $.FroalaEditor.DefineIcon('imageCaption', {
        NAME: 'file-text'
      });
      $.FroalaEditor.RegisterCommand('imageCaption', {
        title: 'Image Caption',
        focus: false,
        undo: false,
        refreshAfterCallback: false,
        callback: function () {
          var img = this.image.get()[0];
          root.img = img;
          this.customPlugin.showPopup(); //read existing caption text

          if ($(img).parent().next().prop('nodeName') == "FIGCAPTION") {
            var caption = $(img).parent().next().text();
            $('input[name="caption"]').val(caption);
          } else if ($(img).next().prop('nodeName') == "FIGCAPTION") {
            var caption = $(img).next().text();
            $('input[name="caption"]').val(caption);
          } else {
            $('input[name="caption"]').val("");
          }
        }
      }); // Define custom popup close button icon and command.

      $.FroalaEditor.DefineIcon('popupClose', {
        NAME: 'times'
      });
      $.FroalaEditor.RegisterCommand('popupClose', {
        title: 'Close',
        undo: false,
        focus: false,
        callback: function () {
          this.customPlugin.hidePopup();
        }
      }); //Insert image caption

      $.FroalaEditor.RegisterCommand('imageInsertCaption', {
        title: '',
        undo: false,
        focus: false,
        callback: function () {
          var img = root.img;
          var caption = $('input[name="caption"]').val();

          if ($(img).parent().next().prop('nodeName') == "FIGCAPTION") {
            $(img).parent().next().text(caption);
          } else if ($(img).next().prop('nodeName') == "FIGCAPTION") {
            $(img).next().text(caption);
          } else {
            if ($(img).hasClass('fr-fil')) {
              var align = 'fr-left';
            } else if ($(img).hasClass('fr-fir')) {
              var align = 'fr-right';
            } else {
              var align = "";
            }

            var captionHtml = '<div class="caption-container ' + align + '" >\
                                                <figure>\
                                                    <img class="fr-dib fr-draggable" data-name="test 1"  src="' + $(img).attr('src') + '" style="width:300px">\
                                                    <figcaption class="caption pull-center">' + caption + '</figcaption>\
                                                </figure>\
                                            </div>';
            $(img).parent().replaceWith(captionHtml);
          }

          ;
          root.saveTextEditorContent('save');
          this.customPlugin.hidePopup();
        }
      }); //trigger image align event

      this.$('.content-editor-wrap').on('froalaEditor.commands.after', function (e, editor, cmd, param1, param2) {
        if (cmd == 'imageAlign' && $(editor.image.get()[0]).parents('.caption-container').length != 0) {
          if ($(editor.image.get()[0]).hasClass('fr-fil')) {
            $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-right').addClass('fr-left');
          } else if ($(editor.image.get()[0]).hasClass('fr-fir')) {
            $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-left').addClass('fr-right');
          } else {
            $(editor.image.get()[0]).parents('.caption-container').removeClass('fr-right fr-left');
          }

          $(editor.image.get()[0]).trigger("click");
        }

        ;
      }); //trigger image remove event

      this.$('.content-editor-wrap').on('froalaEditor.image.beforeRemove', function (e, editor, $img) {
        if ($img.parents('.caption-container') != 0) {
          $img.parents('.caption-container').remove();
        }

        ;
      });
    },
    rteEmbedURL: function () {
      var root = this; // Define popup template.

      $.extend($.FroalaEditor.POPUP_TEMPLATES, {
        'customPlugin.popup': '[_BUTTONS_][_CUSTOM_LAYER_]'
      }); // Define popup buttons.

      $.extend($.FroalaEditor.DEFAULTS, {
        popupButtons: ['popupClose', '|', 'popupButton1', 'popupButton2']
      }); // The custom popup is defined inside a plugin (new or existing).

      $.FroalaEditor.PLUGINS.customPlugin = function (editor) {
        // Create custom popup.
        function initPopup() {
          // Load popup template.
          var template = $.FroalaEditor.POPUP_TEMPLATES.customPopup;
          if (typeof template == 'function') template = template.apply(editor); // Popup buttons.

          var popup_buttons = ''; // Create the list of buttons.

          if (editor.opts.popupButtons.length > 1) {
            popup_buttons += '<div class="fr-buttons">';
            popup_buttons += editor.button.buildList(editor.opts.popupButtons);
            popup_buttons += '</div>';
          } // Load popup template.


          var template = {
            buttons: popup_buttons,
            custom_layer: '<div class="custom-layer">\
                                            <div class="fr-input-line">\
                                                <input name="embedURL" type="text" class="fr-embed-attr" placeholder="Enter embed URL" tabindex="1" dir="auto" >\
                                            </div>\
                                            <div class="fr-error"></div>\
                                            <div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="insertEmbedURL" tabIndex="2">Embed</button></div>\
                                        </div>'
          }; // Create popup.

          var $popup = editor.popups.create('customPlugin.popup', template);
          return $popup;
        } // Show the popup


        function showPopup() {
          // Get the popup object defined above.
          var $popup = editor.popups.get('customPlugin.popup'); // If popup doesn't exist then create it.
          // To improve performance it is best to create the popup when it is first needed
          // and not when the editor is initialized.

          if (!$popup) $popup = initPopup(); // Set the editor toolbar as the popup's container.

          editor.popups.setContainer('customPlugin.popup', editor.$tb); // If the editor is not displayed when a toolbar button is pressed, then set BODY as the popup's container.
          // editor.popups.setContainer('customPlugin.popup', $('body'));
          // Trigger refresh for the popup.
          // editor.popups.refresh('customPlugin.popup');
          // This custom popup is opened by pressing a button from the editor's toolbar.
          // Get the button's object in order to place the popup relative to it.

          var $btn = $('.fr-command[data-cmd="embedURL"]'); // Compute the popup's position.

          var left = $btn.offset().left + $btn.outerWidth() / 2;
          var top = $btn.offset().top + (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10); // Show the custom popup.
          // The button's outerHeight is required in case the popup needs to be displayed above it.

          editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
        } // Hide the custom popup.


        function hidePopup() {
          editor.popups.hide('customPlugin.popup');
        } // Methods visible outside the plugin.


        return {
          showPopup: showPopup,
          hidePopup: hidePopup
        };
      }; // embed demo


      $.FroalaEditor.DefineIcon('embedURL', {
        NAME: 'embed-url'
      });
      $.FroalaEditor.RegisterCommand('embedURL', {
        title: 'Embed link',
        focus: false,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
          root.$('.content-editor-wrap').froalaEditor('markers.insert');
          this.customPlugin.showPopup();
          root.$('.fr-input-line input[name="embedURL"]').val("");
          root.$('.fr-error').text('');
        }
      }); // Define custom popup close button icon and command.

      $.FroalaEditor.DefineIcon('popupClose', {
        NAME: 'times'
      });
      $.FroalaEditor.RegisterCommand('popupClose', {
        title: 'Close',
        undo: false,
        focus: false,
        callback: function () {
          this.customPlugin.hidePopup();
        }
      });
      $.FroalaEditor.DefineIcon('insertEmbedURL', {
        NAME: 'froala-embed-url'
      });
      $.FroalaEditor.RegisterCommand('insertEmbedURL', {
        title: 'Embed link',
        focus: false,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
          var embedURL = root.$('.fr-input-line input[name="embedURL"]').val();
          var iframe = $($.parseHTML(embedURL));
          $(iframe).addClass('fr-iframe');
          var width = root.$('.fr-wrapper').width();
          var height = width / 16 * 9;
          var url = $(iframe).prop("src");
          root.$('.content-editor-wrap').froalaEditor('placeholder.hide');

          if ($(iframe).prop("tagName") == "IFRAME" && $(iframe).attr('height') && $(iframe).attr('width') && $(iframe).attr('src') && Common.validateUrl(url)) {
            if ($('.fr-marker').length) {
              $(iframe).insertAfter('.fr-marker');
            } else {
              root.$('.content-editor-wrap').froalaEditor('html.insert', iframe, true);
            }

            root.$('.content-editor-wrap .fr-iframe').css({
              'position': 'relative',
              'width': width,
              'height': height
            });
            root.$('.content-editor-wrap').froalaEditor('markers.remove');
            root.saveTextEditorContent('save');
            this.customPlugin.hidePopup();
          } else {
            root.$('.fr-error').text('Enter valid Iframe URL with height and width');
            return;
          }

          ;
        }
      });
    },
    contentChanged: function () {
      var root = this;
      this.$('.content-editor-wrap').addClass('draft');
      clearTimeout(this.timerId);
      this.timerId = setTimeout(function () {
        root.checkContent();
        root.saveTextEditorContent('save');
      }, 3000);
    },
    selectLayout: function (event) {
      var attrs = {};
      var layout = this.$(event.currentTarget).attr('data-layout');

      switch (layout) {
        case "1":
          attrs.layout_one = true;
          break;

        case "2":
          attrs.layout_two = true;
          break;

        case "3":
          attrs.layout_three = true;
          break;

        case "4":
          attrs.layout_four = true;
          break;
      }

      this.$('.content-editor-wrap .fr-view').html(this.contentLayout(attrs));
      this.$('.fr-wrapper').removeClass('show-placeholder');
    },
    checkContent: function (event) {
      if ($('.content-editor-wrap .fr-element').text() == '') {
        $('.select-layout').removeClass('disabled');
      } else {
        $('.select-layout').addClass('disabled');
      }

      ;
    },
    saveTextEditorContent: function (saveType) {
      this.saveType = saveType;
      this.$('.content-saving').removeClass('error').text('saving changes...');
      var current_slide = Common.CURRENT_SLIDE;
      var textEditorSaveBtn = $('.content-editor-wrap');
      var newHtmlContent = this.$('.content-editor-wrap').froalaEditor('html.get', true);
      var is_new_slide = 'true';
      var curSlideOrder = this.currentViewHasSlides() ? current_slide + 1 : 1;

      if (textEditorSaveBtn.hasClass('EDIT')) {
        is_new_slide = 'false';
        curSlideOrder -= 1;
      } else if (textEditorSaveBtn.hasClass('NEWEDIT')) {
        is_new_slide = 'false';
      }

      ;
      var contentData = {
        'walkthrough': this.walkthrough.get('slug'),
        'slide_order': curSlideOrder,
        'is_new': is_new_slide,
        'external': 'false',
        'type': 'content',
        'content': newHtmlContent
      };
      var resource = new Resource();
      var root = this;
      resource.save(contentData, {
        // same method as used inside urlMediaUpload() 'success' response. 
        success: function (response) {
          setTimeout(function () {
            root.$('.content-saving').removeClass('error').addClass('saving-progress').text('changes saved.');
            setTimeout(function () {
              root.$('.content-saving').removeClass('saving-progress').text('');
            }, 2000);
            root.$('.content-editor-wrap').removeClass('draft');

            if (root.saveType == 'saveretry') {
              root.exitTextEditor();
            }

            if ($('.content-editor-wrap').hasClass('NEW')) $('.content-editor-wrap').removeClass('NEW').addClass('NEWEDIT');
          }, 500);
        },
        error: function () {
          root.$('.content-saving').addClass('error').text('Error saving changes.');
          setTimeout(function () {
            root.$('.content-saving').removeClass('error saving-progress').text('');
          }, 2000);

          if (root.saveType == 'saveretry') {
            root.popupClose('text-editor-warning');
          }

          ;
        }
      });
    },
    checkContentSaved: function () {
      if (this.$('.content-editor-wrap').hasClass('draft')) {
        this.popupShow('text-editor-warning');
      } else {
        this.exitTextEditor();
      }
    },
    exitTextEditor: function () {
      var root = this;
      var current_slide = Common.CURRENT_SLIDE;
      var curSlideOrder = this.currentViewHasSlides() ? current_slide + 1 : 1;

      if ($('.content-editor-wrap').hasClass('EDIT') || $('.content-editor-wrap').hasClass('NEW')) {
        curSlideOrder -= 1;
      }

      ;
      root.$('.content-editor-wrap').froalaEditor('destroy');
      this.popupClose('text-editor-warning');
      this.hideAddSlide(); // Fetch updated walkthrough and render new player

      this.current_view.$el.html('');
      root.current_view.walkthrough = new Walkthrough({
        id: root.walkthrough_id
      });
      $.when(this.current_view.walkthrough.fetch()).done(function () {
        root.current_view.render();
        Common.loadWalkthrough(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
        root.$el.removeClass('text-editor-active');
      });
    },
    retrySaveTextContent: function () {
      clearTimeout(this.timerId);
      this.popupClose('text-editor-warning');

      if (this.$('.content-editor-wrap').hasClass('draft')) {
        this.saveTextEditorContent('saveretry');
      } else {
        this.exitTextEditor();
      }
    },
    deleteTextEditorUploadedFile: function (filePath) {
      if (!filePath) return;
      let rteResource = new RteResource({
        path: filePath
      });
      rteResource.destroy();
    },
    hideAddSlideOption: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      this.$('.new_slide_options').addClass('active');
      var slideType = this.$(event.currentTarget).parents('.slide_options').attr('data-slide');
      this.$('[data-slide ="' + slideType + '"]').removeClass('active');
      this.$('[data-slide ="' + slideType + '"] .upload-url').hide();
      this.$('.slide-file-block').removeClass('upload_box_border');
      this.$('.slide_options').removeClass('error');
      this.showCancelSlideOptionIcon();
    },
    showUploadUrl: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      this.$(event.currentTarget).siblings('.upload-url').toggle();
    },
    hideUploadUrl: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      this.$(event.currentTarget).siblings('.upload-url').hide();
      this.$('.url_input').val('');
    },
    dragOverNewSlide: function () {
      this.$('.slide_options.active .slide-file-block').addClass('upload_box_border');
    },
    editContentFocus: function (event) {
      if (this.$(event.currentTarget).text() == this.PLACEHOLDER_TEXT) {
        this.$(event.currentTarget).text("");
      }

      ;
    },
    editContentFocusOut: function (event) {
      if (!this.$(event.currentTarget).text().length) {
        this.$(event.currentTarget).text(this.PLACEHOLDER_TEXT);
      }

      ;
    },
    showSlideSettings: function () {
      var current_slide = this.currentSlide();
      var primary_resource = current_slide.primary_resource;

      if (primary_resource.type == "360") {
        return this.show360SlideSettings();
      }

      ;
      var secondary_resource = current_slide.secondary_resource;
      var resource_type = primary_resource.type;
      var attrs = {};

      if (current_slide && !_.isEmpty(primary_resource)) {
        if (resource_type == 'audio') {
          attrs.replace_audio = true;
          attrs.audio_options = this.ALLOWED_AUDIO_FORMATS.toString();

          if (_.isEmpty(secondary_resource)) {
            attrs.add_cover = true;
          } else {
            attrs.replace_cover = true;
          }

          attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
        } else if (resource_type == 'video') {
          attrs.replace_video = true;
          attrs.video_options = this.ALLOWED_VIDEO_FORMATS.toString();

          if (_.isEmpty(secondary_resource)) {
            attrs.add_cover = true;
          } else {
            attrs.replace_cover = true;
          }

          attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
        } else if (resource_type == 'wistia') {
          attrs.replace_video = true;
        } else if (resource_type == 'embed') {
          attrs.enableSaveButton = true;
          attrs.replace_embed = true;

          if (_.isEmpty(secondary_resource)) {
            attrs.add_cover = true;
          } else {
            attrs.replace_cover = true;
          }

          attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
        } else if (resource_type == 'pdf') {
          if (primary_resource.meta_data && primary_resource.meta_data.source_type == 'ppt') {
            attrs.replace_ppt = true;
            attrs.ppt_options = this.ALLOWED_PPT_FORMATS.toString();
          } else {
            attrs.replace_pdf = true;
            attrs.pdf_options = this.ALLOWED_DOC_FORMATS.toString();
          }
        } else if (resource_type == 'file') {
          attrs.replaceFile = true;
          attrs.name = primary_resource.name;
          attrs.fileOptions = this.ALLOWED_FILE_FORMATS.toString();
          attrs.fileName = `${primary_resource.name}${primary_resource.meta_data.type}`;
          attrs.enableSaveButton = true;

          if (primary_resource.meta_data.thumbnail_url) {
            attrs.icon = {
              url: primary_resource.meta_data.thumbnail_url,
              name: this.walkthrough.attributes.name
            };
          }
        } else if (resource_type == 'link') {
          attrs.enableSaveButton = true;
          attrs.replace_link = true;
        } else if (resource_type == 'image') {
          attrs.replace_image = true;

          if (_.isEmpty(secondary_resource)) {
            attrs.add_background_audio = true;
          } else {
            attrs.replace_background_audio = true;
          }

          attrs.audio_options = this.ALLOWED_AUDIO_FORMATS.toString();
          attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
        } else if (resource_type == 'content') {
          attrs.replace_content = true;
          attrs.image_options = this.ALLOWED_IMAGE_FORMATS.toString();
        } else if (resource_type == 'iframe') {
          attrs.enableSaveButton = true;
          attrs.replace_iframe = true;
        } else if (resource_type == 'html5') {
          attrs.replace_html5 = true;
        } else if (resource_type == 'sandbox') {
          attrs.replace_sandbox = true;
        }

        ;
      }

      this.$('.popup-slide-settings').html(this.SlideSettings(attrs));
      this.$('.popup-slide-settings .block').removeClass('error');
      this.popupShow('popup-slide-settings');
    },
    show360SlideSettings: function () {
      var current_slide = this.currentSlide();
      this.$('.new_slide_options').removeClass('active');
      this.$el.addClass('slide-360-settings-active');
      return this.previewMultipleImagesSettings({
        'action': 'editFrame',
        'classType': 'update',
        'count': current_slide.primary_resource.meta_data.count,
        'path': current_slide.primary_resource.path,
        'mediaType': '360'
      });
    },
    addHotspotEditOptions: function (slide_view) {
      var root = this;

      _.each(slide_view.$el.find('.hotspot'), function (hsp, index) {
        var hsp_id = slide_view.slide.hotspots[index] && slide_view.slide.hotspots[index].id;
        var hotspotedit = "<div class='hotspot-edit-options' rel=" + hsp_id + ">\
                                       <div class='hotspot-edit'></div>\
                                       <div class='hotspot-delete'></div>\
                                   </div>";
        root.$(hsp).append(hotspotedit);
      });
    },
    addPinEditOptions: function () {
      this.$('.drop_pin .pin-tooltip .pin-delete').remove();
      this.$('.drop_pin .pin-tooltip').append("<div class='pin-delete'>delete</div>");
    },
    toggleHotspotEdit: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;

      if (this.$('#player-container').hasClass('drop-pin-active')) {
        this.disablePinEdit();
      }

      var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE - 1];

      if (this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length || !this.canAnnotate(cur_slide_view.slide)) {
        return this.$('#player-container').removeClass('area-highlighter-active');
      }

      if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
        return this.switchLanguageWarning();
      }

      this.$('#player-container').toggleClass('area-highlighter-active');
      var cur_slide = this.currentSlide();
      var currentSlide = this.$("#slider" + cur_slide.order);

      if (this.$('#player-container').hasClass('area-highlighter-active')) {
        var root = this;
        this.$(currentSlide).find(".hotspot-edit-options").addClass("active");

        _.each(this.$("#slider" + cur_slide.order + ' .hotspot'), function (elem, index) {
          root.initResizeDrag(elem, currentSlide);
        });

        currentSlide.addClass('cursor');
        var gen_box = null,
            i = 1,
            width,
            height,
            x_begin,
            x_end,
            y_begin,
            y_end;
        currentSlide.selectable({
          start: function (e, ui) {
            //get the mouse position on start
            x_begin = e.pageX;
            y_begin = e.pageY;
          },
          stop: function (e, ui) {
            //get the mouse position on stop
            x_end = e.pageX;
            y_end = e.pageY;
            var drag_left = false;
            var drag_right = false;

            if (x_end - x_begin >= 1) {
              width = x_end - x_begin;
              height = y_end - y_begin;
              drag_right = true;
            } else {
              width = x_begin - x_end;
              height = y_end - y_begin;
              drag_left = true;
            }

            var globalVar = Math.floor(Math.random() * 500 + 100);
            $(this).append('<div id="hotspot' + globalVar + '" class="hotspot hsedit hsnew" style="top:' + y_begin + 'px; left:' + x_begin + 'px; width:' + width + 'px; height:' + height + 'px;"></div>');
            var hspot = $("#hotspot" + globalVar);
            hspot.draggable({
              containment: currentSlide
            });
            hspot.resizable({
              handles: 'all',
              containment: currentSlide
            });

            if (drag_right) {
              root.$(hspot).offset({
                left: x_begin - 3,
                top: y_begin - 3
              });
            }

            if (drag_left) {
              root.$(hspot).offset({
                left: x_end - 3,
                top: y_begin - 3
              });
            }

            hspot.draggable("destroy");
            hspot.resizable("destroy");
            root.showSaveHotspot();
            root.initResizeDrag(hspot, currentSlide);
          }
        });
      } else {
        currentSlide.removeClass('cursor');
        $(currentSlide).find(".hotspot-edit-options").removeClass("active");

        _.each(this.$('.hotspot'), function (elem, index) {
          if ($(elem).data("uiDraggable")) {
            $(elem).draggable("destroy");
          }

          if ($(elem).data("uiResizable")) {
            $(elem).resizable("destroy");
          }
        });

        if (currentSlide.data("uiSelectable")) {
          currentSlide.removeClass('cursor');
          currentSlide.selectable("destroy");
        }

        ;
      }
    },
    showSaveHotspot: function (hotspot_data) {
      this.$('#create-edit-popup').removeAttr('hotspot-id');
      this.$('#create-edit-popup').html(this.hotSpot()).niceScroll();

      if (hotspot_data) {
        this.$('#create-edit-popup').attr('hotspot-id', hotspot_data.id);

        if (hotspot_data.display) {
          if (hotspot_data.display.color && hotspot_data.display.color != 'transparent') {
            this.$(".color-box").css({
              "background-color": hotspot_data.display.color
            });
          }

          if (hotspot_data.display.delay) {
            this.$('#hotspot-timer').val(hotspot_data.display.delay);
          }
        }

        if (hotspot_data.action && hotspot_data.hotspot_type == "goto") {
          if (hotspot_data.action.slide_number == 'next') {
            this.$('#next').attr('checked', true);
          } else if (hotspot_data.action.slide_number == 'prev') {
            this.$('#prev').attr('checked', true);
          } else if (hotspot_data.action.slide_number == 'noaction') {
            this.$('#nolink').attr('checked', true);
          } else {
            this.$('#goto').attr('checked', true);
            this.$(".link-option select").innerHTML = "";
            this.$(".link-option select option").remove();

            if (this.currentViewHasSlides()) {
              for (var i = 1; i <= this.current_view.slide_views.length; i++) {
                this.$(".link-option select").append('<option value="' + i + '">Slide ' + i + '</option>');
              }
            }

            this.$('#goto-slide-no').val(hotspot_data.action.slide_number).show();
          }
        } else if (hotspot_data.action && hotspot_data.hotspot_type == 'link') {
          this.$('#elink').attr('checked', true);
          this.$('#e-link').val(hotspot_data.action.href).show();
        }
      }

      this.$('.color-box').colpick({
        layout: 'rgb',
        submit: 0,
        colorScheme: 'light',
        onBeforeShow: function (el) {
          $(el).find('.colpick_submit').remove();
        },
        onChange: function (hsb, hex, rgb, el, bySetColor) {
          $(el).attr("style", "background: #" + hex);
        }
      });
      this.popupShow("popup-save-hotspot");
    },

    /**
     * Global : Restrict input value to number
     */
    restrictValToNumber: function (e) {
      let elem = e.currentTarget;
      let elemVal = elem.value.replace(/[^0-9]/, '');
      elem.value = !elemVal ? '' : elemVal;
    },
    saveHotspot: function () {
      var root = this;
      var hotspot_data = {
        'callout': {},
        'hotspot_type': 'goto',
        'action': {
          'slide_number': 'next'
        },
        'display': {
          'color': 'transparent'
        },
        'event': 'create'
      };

      if (this.$('#prev').is(':checked')) {
        hotspot_data.action.slide_number = 'prev';
      } else if (this.$('#goto').is(':checked')) {
        hotspot_data.action.slide_number = this.$('#goto-slide-no').val();
      } else if (this.$('#elink').is(':checked')) {
        var validationResult = this.urlValidation(this.$('#e-link'));
        var urlPattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;

        if (validationResult[0]) {
          hotspot_data.hotspot_type = 'link';
          hotspot_data.action = {
            'href': this.$('#e-link').val()
          };
        } else {
          this.$('.popup-save-hotspot .error-message').text(validationResult[1]).show();
          return;
        }
      } else if (this.$('#nolink').is(':checked')) {
        hotspot_data.action.slide_number = "noaction";
      }

      hotspot_data.display.color = this.rgb2hex(this.$('.color-box').css('background-color'));

      if (this.$('#hotspot-timer').val()) {
        hotspot_data.display.delay = parseInt(this.$('#hotspot-timer').val());
      }

      var cur_slide = this.currentSlide();
      var frame_width = this.$("#slider" + cur_slide.order).width();
      var frame_height = this.$("#slider" + cur_slide.order).height();
      var hspot = this.$(".hotspot.hsedit");
      var hotspot_id = this.$('#create-edit-popup').attr('hotspot-id');

      if (hotspot_id) {
        hspot = this.$('.hotspot-edit-options[rel=' + hotspot_id + ']').parent();
        hotspot_data.id = hotspot_id;
      }

      var top = (parseFloat($(hspot).css("top").replace("px", "")) / frame_height * 100).toFixed(2) + '%',
          height = (parseFloat($(hspot).css("height").replace("px", "")) / frame_height * 100).toFixed(2) + '%',
          left = (parseFloat($(hspot).css("left").replace("px", "")) / frame_width * 100).toFixed(2) + '%',
          width = (parseFloat($(hspot).css("width").replace("px", "")) / frame_width * 100).toFixed(2) + '%';
      hotspot_data.display['top'] = top;
      hotspot_data.display['height'] = height;
      hotspot_data.display['left'] = left;
      hotspot_data.display['width'] = width;
      this.actionInProgress('popup-save-hotspot');
      this.walkthrough.save({
        'hotspot': hotspot_data,
        'slide_order': Common.CURRENT_SLIDE
      }, {
        patch: true,
        success: function (response) {
          _.each(['hotspot', 'slide_order'], function (key) {
            root.walkthrough.unset(key, {
              silent: true
            });
          });

          root.actionSuccess('popup-save-hotspot');
          var slides = root.walkthrough.get('slides');
          var new_hotspot;

          if (hotspot_id) {
            new_hotspot = _.find(slides[Common.CURRENT_SLIDE - 1].hotspots, function (hsp) {
              return hsp.id == hotspot_id;
            });
          } else {
            new_hotspot = _.last(slides[Common.CURRENT_SLIDE - 1].hotspots);
          }

          root.drawHotSpot(hspot, new_hotspot);
          root.updateSlideEditView();
        },
        error: function (response, xhr) {
          root.actionFailed('popup-save-hotspot');
        }
      });
    },
    cancelHotspot: function () {
      this.$(".hotspot.hsnew").remove();
      this.$('#create-edit-popup').removeAttr('hotspot-id');
      this.popupClose("popup-save-hotspot");
    },
    calloutGoto: function (event) {
      var option = event.currentTarget.value;
      this.$(".link-option input[type=text]").hide();
      this.$(".link-option select").hide();

      if (option == "elink") {
        this.$(".link-option input[type=text]").show();
      } else if (option == "goto") {
        this.$(".link-option select").innerHTML = "";
        this.$(".link-option select option").remove();

        if (this.currentViewHasSlides()) {
          var slides = this.current_view.slide_views.length;

          for (var i = 1; i <= slides; i++) {
            this.$(".link-option select").append('<option value="' + i + '">Slide ' + i + '</option>');
          }
        }

        this.$(".link-option select").show();
      }
    },
    drawHotSpot: function (hspot, hotspot_data) {
      var cur_slide = this.currentSlide();
      this.$(hspot).css({
        "border-color": hotspot_data.display.color
      }).attr("border-color", hotspot_data.display.color);

      if (!this.$(hspot).find(".hotspot-edit-options").length) {
        var hotspotedit = "<div class='hotspot-edit-options active' rel='" + hotspot_data.id + "'>\
                                       <div class='hotspot-edit'></div>\
                                       <div class='hotspot-delete'></div>\
                                   </div>";
      }

      hspot.off('click');
      hspot.on('click', function () {
        if (hspot.data('uiDraggable') || hspot.data('uiResizable') || hspot.data('uiSelectable')) return;
        var slide_number = 'next';

        if (hotspot_data.action && hotspot_data.action.slide_number != undefined) {
          slide_number = hotspot_data.action.slide_number;
        }

        hspot.trigger('scroll_slide', slide_number);
      });
      this.$(hspot).removeClass("hsedit hsnew hsupdate");
    },
    editHotspot: function (event) {
      this.$(event.currentTarget).parent().parent().addClass("hsedit");
      var hsp_id = this.$(event.currentTarget).parent().attr('rel');

      var editing_hotspot = _.find(this.current_view.slide_views[Common.CURRENT_SLIDE - 1].slide.hotspots, function (hsp) {
        return hsp.id == hsp_id;
      });

      this.showSaveHotspot(editing_hotspot);
    },
    deleteHotspot: function (event) {
      var hsp_id = this.$(event.currentTarget).parent().attr('rel');
      var hotspot_data = {
        'event': 'delete',
        'id': parseInt(hsp_id)
      };
      var element = this.$(event.currentTarget).parents('.hotspot');
      var root = this;
      this.walkthrough.save({
        'hotspot': hotspot_data,
        'slide_order': Common.CURRENT_SLIDE
      }, {
        patch: true,
        success: function (response) {
          _.each(['hotspot', 'slide_order'], function (key) {
            root.walkthrough.unset(key, {
              silent: true
            });
          });

          root.$(element).remove();
          root.updateSlideEditView();
        }
      });
    },
    initResizeDrag: function (hotspot, current_slide) {
      var root = this;
      this.$(hotspot).draggable({
        containment: current_slide,
        stop: function (event, ui) {
          root.resizeHotspot(event.target, function () {
            ui.helper.css(ui.originalPosition);
          });
        }
      });
      this.$(hotspot).resizable({
        handles: 'all',
        containment: current_slide,
        stop: function (event, ui) {
          root.resizeHotspot(event.target, function () {
            ui.element.css(ui.originalSize);
          });
        }
      });
    },
    resizeHotspot: function (element, error_callback) {
      var hsp_id = this.$(element).find('.hotspot-edit-options').attr('rel');
      var hotspot_data = {
        'display': {
          'color': 'transparent'
        },
        'event': 'create'
      };
      hotspot_data.id = hsp_id;
      hotspot_data.display.color = this.$(element).attr('border-color');
      var cur_slide = this.currentSlide();
      var frame_width = this.$("#slider" + cur_slide.order).width();
      var frame_height = this.$("#slider" + cur_slide.order).height();
      var top = (parseFloat($(element).css("top").replace("px", "")) / frame_height * 100).toFixed(2) + '%',
          height = (parseFloat($(element).css("height").replace("px", "")) / frame_height * 100).toFixed(2) + '%',
          left = (parseFloat($(element).css("left").replace("px", "")) / frame_width * 100).toFixed(2) + '%',
          width = (parseFloat($(element).css("width").replace("px", "")) / frame_width * 100).toFixed(2) + '%';

      _.each(cur_slide.hotspots, hsp => {
        if (hsp.id === parseInt(hsp_id) && hsp.display.delay) {
          hotspot_data.display.delay = hsp.display.delay;
        }
      });

      hotspot_data.display['top'] = top;
      hotspot_data.display['height'] = height;
      hotspot_data.display['left'] = left;
      hotspot_data.display['width'] = width;
      var root = this;
      this.walkthrough.save({
        'hotspot': hotspot_data,
        'slide_order': Common.CURRENT_SLIDE
      }, {
        patch: true,
        success: function (response) {
          _.each(['hotspot', 'slide_order'], function (key) {
            root.walkthrough.unset(key, {
              silent: true
            });
          });

          root.updateSlideEditView();
        },
        error: function (response, xhr) {
          if (error_callback) {
            error_callback();
          }
        }
      });
    },
    updateSlideEditView: function () {
      this.disablePinHotspotEdit(); // Get latest slide details

      var slides = this.walkthrough.get('slides'); // Current slide view

      var cur_sl_view = this.currentSlideView(); // Update latest slide details

      cur_sl_view.slide = slides[Common.CURRENT_SLIDE - 1];
      cur_sl_view.slide.tenant = this.current_view.tenant; // Load current slide assets

      cur_sl_view.asset_load_status = false;
      cur_sl_view && cur_sl_view.render() && cur_sl_view.loadAsset(); // Add hotspot edit options for newly rendered view

      this.addHotspotEditOptions(cur_sl_view); // add pin edit options for newly rendered view

      this.addPinEditOptions(); // load pin content

      this.loadPinContent(); // Re initialize filmstrip

      this.initializeFilmStrip();
    },
    currentSlideView: function () {
      var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE - 1];
      return cur_slide_view;
    },
    currentSlide: function () {
      var cur_sl_view = this.currentSlideView();
      var cur_slide = cur_sl_view && cur_sl_view.slide;
      return cur_slide;
    },
    disablePinHotspotEdit: function () {
      this.disablePinEdit();
      this.disableHotspotEdit();
    },
    disableHotspotEdit: function () {
      if (this.$('#player-container').hasClass('area-highlighter-active')) {
        this.$('#player-container').removeClass('area-highlighter-active');
        var cur_slide = this.currentSlide();
        this.$("#slider" + cur_slide.order).removeClass('cursor').find(".hotspot-edit-options").removeClass("active");

        _.each(this.$("#slider" + cur_slide.order + '.hotspot'), function (elem, index) {
          if ($(elem).data("uiDraggable")) {
            $(elem).draggable("destroy");
          }

          if ($(elem).data("uiResizable")) {
            $(elem).resizable("destroy");
          }
        });

        if (this.$("#slider" + cur_slide.order).data("uiSelectable")) {
          this.$("#slider" + cur_slide.order).removeClass('cursor');
          this.$("#slider" + cur_slide.order).selectable("destroy");
        }

        ;
      }
    },
    disablePinEdit: function () {
      if (this.$('#player-container').hasClass('drop-pin-active')) {
        this.$('#player-container').removeClass('drop-pin-active');
        var cur_slide = this.currentSlide();
        this.$("#slider" + cur_slide.order + ", #slider" + cur_slide.order + " .product-frame").removeClass('pin-cursor');
        var root = this;

        _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function (elem, index) {
          root.removeDragPin(elem);
        });
      }

      ;
    },
    initializeFilmStrip: function () {
      // If the parent(walkthrough) 'Product' is not editable, then hide the filmstrip and return.
      if (!this.walkthrough.get('can_edit')) {
        this.$('.slides_wraper').hide();
        return;
      }

      var root = this;
      var slides = this.walkthrough.get('slides');

      _.each(slides, function (slide, idx) {
        slide.is_image = false;

        if (slide.primary_resource.type == 'image') {
          slide.is_image = true;
          slide.src = slide.primary_resource.path;
        } else if (slide.primary_resource.type == 'pdf') {
          slide.is_image = true;
          let thumbnail = slide.primary_resource.thumbnail;
          slide.src = thumbnail || `${document.cdn_url}/static/images/pdf-thumb.png`;
        } else if (slide.primary_resource.type == 'video' && slide.secondary_resource) {
          slide.is_image = true;
          slide.src = slide.secondary_resource.path;
        } else if (slide.primary_resource.type == '360') {
          slide.is_image = true;
          slide.src = `${slide.primary_resource.path}/1.jpg`;
        } else if (slide.primary_resource.type == 'link') {
          slide.is_image = true;

          if (slide.primary_resource.meta_data.icon) {
            slide.src = slide.primary_resource.meta_data.icon;
          } else {
            slide.src = `${document.cdn_url}${Common.DEFAULT_EXTERNAL_LINK_ICON}`;
          }
        } else if (['embed', 'wistia'].includes(slide.primary_resource.type) && slide.primary_resource.thumbnail) {
          slide.is_image = true;
          slide.src = slide.primary_resource.thumbnail;
        } else if (slide.secondary_resource) {
          slide.is_image = true;
          slide.src = slide.secondary_resource.path;
        } else if (slide.primary_resource.type == 'sandbox') {
          slide.is_image = true;
          var sandbox = root.current_view.slide_views[idx].sandbox;

          if (sandbox.has_images) {
            slide.src = root.current_view.slide_views[idx].getSanboxPath(slide.primary_resource.meta_data.path, sandbox.has_images.index, 'image');
          } else {
            slide.src = `${document.cdn_url}${Common.DEFAULT_VIDEO_POSTER}`;
          }
        } else if (slide.primary_resource.type == "file") {
          slide.is_image = true;
          slide.src = `${document.cdn_url + root.DEFAULT_FILE_ICON}`;

          if (slide.primary_resource.meta_data && slide.primary_resource.meta_data.thumbnail_url) {
            slide.src = slide.primary_resource.meta_data.thumbnail_url;
          }
        }
      });

      this.$('.slides_wraper').remove();
      this.$('#player-container .player_wrap').append(this.filmStrip({
        'slides': slides
      })); // Add custom scroll

      this.$('.slides_wraper .slides_box').mCustomScrollbar();
      this.$('.mCustomScrollBox').attr('tabindex', '-1');
      var root = this; // Make sortable

      this.$(".slides_wraper .slides_box .slides_container").sortable({
        items: ".slide",
        containment: "parent",
        axis: "x",
        cursor: "move",
        tolerance: "intersect",
        change: function (e, ui) {
          var w = ui.helper.outerWidth(true),
              elem = $(".mCustomScrollBox"),
              elemWidth = elem.width(),
              moveBy = root.$(".slides_container .slide").outerWidth(true) * 3,
              mouseCoordsX = e.pageX - elem.offset().left;

          if (mouseCoordsX < w) {
            root.$(".slides_box").mCustomScrollbar("scrollTo", "+=" + moveBy);
          } else if (mouseCoordsX > elemWidth - w) {
            root.$(".slides_box").mCustomScrollbar("scrollTo", "-=" + moveBy);
          }
        },
        update: function (event, ui) {
          var cur_order = ui.item.attr('order');
          var prev_order = ui.item.prev().attr('order');
          var slide_details = {};
          slide_details = {
            'reorder': 'slide',
            'target': cur_order,
            'after': prev_order
          };
          root.walkthrough.save(slide_details, {
            patch: true,
            success: function () {
              root.current_view.$el.html('');
              root.current_view.load(root.current_view.product_id, root.current_view.section_id, root.current_view.walkthrough_id, Common.CURRENT_SLIDE);
            },
            error: function (xhr, status_code, message) {
              root.$(".slides_wrap .slides_box .slides_container").sortable("cancel");
            }
          });
        }
      });
    },
    filmstripSlideNavigation: function (event) {
      Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, parseInt(this.$(event.currentTarget).attr('order')));
    },
    toggleSlideRearrange: function () {
      this.$('.slides_wraper').toggleClass('active');
      this.$('.slides_wraper').hasClass('active') ? this.$(".create-new.slide").fadeOut() : this.$(".create-new.slide").fadeIn();
    },
    createEditNotes: function (event) {
      var isEdit = this.$(event.currentTarget).hasClass('edit-notes');
      this.$('#create-edit-notes').html(this.notesForm({
        'isEdit': isEdit,
        'notesLinkTitleLimit': this.NOTES_LINK_TITLE_LIMIT
      }));

      if (this.$(event.currentTarget).attr('data-page') == "new") {
        // If its a new note pop-up, then data-page is length of the 'li' elements,
        // so that it'll have the latest/new number value.
        var lastActive = $('.pagination li.active').attr('data-page');
        this.$('.pagination li').removeClass('active'); // When the 'author' cancels the action, focus the notes page on last-active page.

        this.$(event.currentTarget).attr('data-page', this.$('.pagination ul li').length).attr('last-active', lastActive).addClass('active');
      } else if (!isEdit && document.defaultLocaleID !== SDCookies.getItem('author_locale')) return this.switchLanguageWarning();

      if (isEdit) {
        var pageNumber = this.$('.pagination li.active').attr('data-page');
        this.prefillNotesEdit(this.currentSlide().notes, pageNumber);
      }

      this.popupShow("create-edit-notes");
      this.overlayCalc();
      this.$('.popup-box .content-block').niceScroll();
    },
    prefillNotesEdit: function (notes, pageNumber) {
      this.$('.notes-edit-block .notes-title').html(notes[pageNumber].title);
      this.$('.notes-edit-block .notes-body').html(notes[pageNumber].body);

      if (notes[pageNumber].link) {
        this.$('#advanced-notes-content .notes-link-title').val(notes[pageNumber].link.title);
        this.$('#advanced-notes-content .notes-link-title').siblings().find('span[data-counter]').text(this.NOTES_LINK_TITLE_LIMIT - (notes[pageNumber].link.title || "").length);

        if (notes[pageNumber].link.type == 'INTERNAL') {
          this.$('#advanced-notes-content .upload-resource').addClass('image-added');
          this.$('#upload-file-preview').attr('src', '/static/media/' + notes[pageNumber].link.resource);
        } else {
          this.$('#advanced-notes-content .notes-url-link').val(notes[pageNumber].link.resource);
          this.$('.notes-link-url').parents('.block').addClass('add-resource-url');
        }
      }
    },
    getNotesFormData: function () {
      var notesData = new FormData();
      notesData.append('walkthrough_id', this.walkthrough_id);
      notesData.append('slide_order', Common.CURRENT_SLIDE);
      notesData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      return notesData;
    },
    saveSlideNotes: function (event) {
      event.preventDefault();
      var validation = true;
      this.$('.create-edit-notes .error-message').text('').removeClass('active');
      var slideType = this.$("#slider" + Common.CURRENT_SLIDE).attr('slide-type');
      var notesBody = this.$('.notes-edit-block .notes-body').html().trim();
      var notesData = this.getNotesFormData();
      notesData.append('notes', true);
      var root = this;
      this.actionInProgress('create-edit-notes');

      if (slideType == 'sandbox') {
        notesData.append('is_sandbox', true);
        notesData.append('body', notesBody);
        notesData.append('frame_number', $('.sandbox-frame.active').children('div').attr('data-current-frame'));
      } else {
        var pageNumber = this.$('.pagination li.active').attr('data-page') || '1';
        var notesTitle = this.$('.notes-edit-block .notes-title').html().trim();
        var notesLinkTitle = this.$('#advanced-notes-content .notes-link-title').val();
        var notesLinkResource = this.$('#upload-notes-link-file')[0].files[0];
        var notesLinkImg = $('#upload-file-preview').attr('src');
        var notesLinkUrl = this.$('#advanced-notes-content .notes-url-link').val();
        var notesLinkMediaType;

        if (notesLinkResource) {
          notesLinkMediaType = 'INTERNAL';
          notesData.append('resource', notesLinkResource);
        } else if (notesLinkImg) {
          notesLinkMediaType = 'INTERNAL';
          notesData.append('link_image_url', notesLinkImg.split('/static/media/')[1]);
        } else if (notesLinkUrl) {
          notesLinkMediaType = 'EXTERNAL';
          var videoDetails = Common.getEmbedVideoDetails(notesLinkUrl);

          if (videoDetails) {
            notesData.append('link_url', videoDetails.src);
            root.$('.create-edit-notes .error-message').text('').removeClass('active');
          } else {
            root.actionFailed('create-edit-notes');
            root.$('.create-edit-notes .error-message.notes-url').text(Translate("please enter a valid video url")).addClass('active');
            validation = false;
          }
        }

        if ((notesLinkImg || notesLinkUrl) && !notesLinkTitle) {
          root.$('.create-edit-notes .error-message.notes-url-title').text(Translate("please enter link title")).addClass('active');
          validation = false;
        } else if (notesLinkTitle) {
          if (!(notesLinkImg || notesLinkUrl)) {
            root.$('.create-edit-notes .error-message.notes-url-resource').text(Translate("please enter resource")).addClass('active');
            validation = false;
          }
        }

        notesData.append('page_number', pageNumber);
        notesData.append('title', notesTitle);
        notesData.append('body', notesBody);
        notesData.append('link_title', notesLinkTitle);
        notesData.append('link_type', notesLinkMediaType);
      }

      var slide = new Slide({
        id: Common.CURRENT_SLIDE
      });

      if (!validation) {
        root.actionFailed('create-edit-notes');
        return;
      }

      slide.save(notesData, {
        processData: false,
        cache: false,
        contentType: false,
        patch: true,
        data: notesData,
        success: function (response, model) {
          root.updateSlideNotesView(model.notes, pageNumber);
          root.actionSuccess('create-edit-notes');
        },
        error: function (xhr, response) {
          root.actionFailed('create-edit-notes');
        }
      });
    },
    setNotesEditOptions: function (e) {
      var currentSlide = this.$("#slider" + Common.CURRENT_SLIDE);
      var slideType = currentSlide.attr('slide-type');

      if (this.$('.notes').hasClass('no-notes')) {
        this.$('.notes').addClass('add-notes');
      } else {
        this.$('.pagination li[data-page="new"]').show();
        this.$('.pagination, .page-prev, .page-next').show();
      }

      if (slideType == "sandbox") {
        this.$('.notes').removeClass('add-notes no-notes');
        this.$('.notes-edit-options').hide();
      } else {
        this.$('.notes-edit-options').show();
      }

      if (this.walkthrough && !this.walkthrough.get('can_edit')) this.$('.pagination li[data-page="new"]').hide();
      jcf.replaceAll();
    },
    updateSlideNotesView: function (slideNotes, pageNumber) {
      this.currentSlide().notes = slideNotes;

      if (!slideNotes) {
        // If all the notes are deleted, then 'slideNotes' will be empty.
        this.currentSlideView().setSlideNotes();
      } else {
        this.$('.pagination li[data-page="new"]').show();
        this.currentSlideView().updateSlideNotes(slideNotes, pageNumber);
      }

      this.$('.pagination li[data-page]').removeAttr('last-active');
      this.setNotesEditOptions();
    },
    showNotesDeletePopup: function (event) {
      var pageNumber = this.$('.pagination ul li.active').attr('data-page');
      this.$('.popup-delete-notes').attr('data-page', pageNumber);
      this.popupShow("popup-delete-notes");
    },
    deleteNotes: function (event) {
      this.actionInProgress('popup-delete-notes');
      var slide = new Slide({
        id: Common.CURRENT_SLIDE
      });
      var root = this;
      var notesData = this.getNotesFormData();
      notesData.append('delete', true);
      notesData.append('page_number', this.$('.popup-delete-notes').attr('data-page'));
      slide.save(notesData, {
        processData: false,
        cache: false,
        contentType: false,
        patch: true,
        data: notesData,
        success: function (response, model) {
          root.updateSlideNotesView(model.notes);
          root.actionSuccess('popup-delete-notes');
        },
        error: function (xhr, response) {
          root.actionFailed('popup-delete-notes');
        }
      });
    },
    togglePinEdit: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      var root = this;
      this.disableHotspotEdit(); //check is current slide is image/360

      var cur_slide_view = this.current_view.slide_views[Common.CURRENT_SLIDE - 1];

      if (this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length || !this.canAnnotate(cur_slide_view.slide)) {
        return this.$('#player-container').removeClass('drop-pin-active');
      }

      if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
        return this.switchLanguageWarning();
      }

      this.$('#player-container').toggleClass('drop-pin-active');
      var cur_slide = this.currentSlide();
      var currentSlide = this.$("#slider" + cur_slide.order);
      var slideType = currentSlide.attr('slide-type');

      if (slideType == 'image') {
        if (this.$('#player-container').hasClass('drop-pin-active')) {
          currentSlide.addClass('pin-cursor');

          _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function (elem, index) {
            root.initDragPin(elem, currentSlide);
          });
        } else {
          currentSlide.removeClass('pin-cursor');

          _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function (elem, index) {
            root.removeDragPin(elem);
          });
        }
      } else {
        if (this.$('#player-container').hasClass('drop-pin-active')) {
          this.$(currentSlide).find('.product-frame').addClass('pin-cursor');

          _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function (elem, index) {
            root.initDragPin(elem, currentSlide);
          });
        } else {
          this.$("#slider" + cur_slide.order + " .product-frame").removeClass('pin-cursor');

          _.each(this.$("#slider" + cur_slide.order + ' .drop_pin'), function (elem, index) {
            root.removeDragPin(elem);
          });
        }
      }

      ;
    },
    locatePin: function (event) {
      if (!$(event.target).hasClass("slide_image")) {
        return;
      }

      ;
      var cur_slide = this.currentSlide();
      var frame_width = this.$(event.currentTarget).width();
      var frame_height = this.$(event.currentTarget).height();
      var left = (event.offsetX / frame_width * 100).toFixed(2) + '%';
      var top = (event.offsetY / frame_height * 100).toFixed(2) + '%';
      var frameNum = this.$(event.currentTarget).attr('data-frame') || null;
      var slide = new Slide({
        id: Common.CURRENT_SLIDE,
        walkthrough_id: this.walkthrough_id,
        entity: {
          type: 'pin',
          event: 'create',
          value: {
            top: top,
            left: left,
            frame_number: frameNum
          }
        }
      });
      var root = this;
      slide.save(null, {
        patch: true,
        success: function (model, response) {
          var latest_pin = _.last(response.pins);

          root.current_view.slide_views[Common.CURRENT_SLIDE - 1].slide.pins.push(latest_pin);
          var attrs = {
            position: '',
            left: latest_pin.display.left,
            top: latest_pin.display.top,
            frameNum: latest_pin.display.frame_number
          };
          attrs.order = response.primary_resource.type == '360' ? '+' : latest_pin.order;
          attrs.title = latest_pin.callout && latest_pin.callout.title || root.PLACEHOLDER_TEXT, attrs.body = latest_pin.callout && latest_pin.callout.body || root.PLACEHOLDER_TEXT;
          if (latest_pin.id) attrs.id = latest_pin.id;
          var dropPoint = Pin(attrs);
          root.$(event.currentTarget).append(dropPoint).removeClass('pin-cursor');
          root.$('.drop_pin[pin-id=' + latest_pin.id + '] .pin-tooltip').append("<div class='pin-delete'>delete</div>");
          root.loadPinContent();
          root.disablePinEdit();
        }
      });
    },
    updatePinNotes: function (event) {
      var text = this.$(event.currentTarget).text().trim();
      var text_type = this.$(event.currentTarget).attr('target');
      var pin_id = this.$(event.currentTarget).parents('.drop_pin').attr('pin-id');
      var cur_slide = this.currentSlide();

      var pin = _.find(cur_slide.pins, function (p) {
        return p.id == pin_id;
      });

      if (pin && !pin.callout && text || pin.callout && text != (pin.callout[text_type] || "")) {
        var slide = new Slide({
          id: Common.CURRENT_SLIDE,
          walkthrough_id: this.walkthrough_id,
          entity: {
            'type': 'pin',
            'event': 'pin-' + text_type,
            'value': text,
            'entity_id': pin_id
          }
        });
        slide.save(null, {
          patch: true,
          success: function (model, response) {
            var pin = _.find(cur_slide.pins, function (p) {
              return p.id == pin_id;
            });

            if (!pin.callout) {
              pin.callout = {};
            }

            pin.callout[text_type] = text;
          }
        });
      }

      this.editContentFocusOut(event);
    },
    deletePin: function (event) {
      var slide = new Slide({
        id: Common.CURRENT_SLIDE,
        walkthrough_id: this.walkthrough_id,
        entity: {
          'type': 'pin',
          'event': 'delete',
          'entity_id': this.$(event.currentTarget).parents('.drop_pin').attr('pin-id')
        }
      });
      var root = this;
      slide.save(null, {
        patch: true,
        success: function (model, response) {
          root.$(event.currentTarget).parents('.drop_pin').remove();
          response.tenant = root.current_view.tenant;
          root.current_view.slide_views[Common.CURRENT_SLIDE - 1].slide = response;
          root.current_view.slide_views[Common.CURRENT_SLIDE - 1].asset_load_status = false;
          root.current_view.slide_views[Common.CURRENT_SLIDE - 1].render();
          root.current_view.slide_views[Common.CURRENT_SLIDE - 1].loadAsset();
          root.$('#slider' + Common.CURRENT_SLIDE + ' .drop_pin  .pin-tooltip').append("<div class='pin-delete'>delete</div>");

          if (root.$('#player-container').hasClass('drop-pin-active')) {
            root.$('#slider' + Common.CURRENT_SLIDE).addClass('pin-cursor');

            _.each(root.$("#slider" + Common.CURRENT_SLIDE + ' .drop_pin'), function (elem, index) {
              root.initDragPin(elem, root.$('#slider' + Common.CURRENT_SLIDE));
            });
          } else {
            root.$('#slider' + Common.CURRENT_SLIDE).removeClass('pin-cursor');

            _.each(root.$("#slider" + Common.CURRENT_SLIDE + ' .drop_pin'), function (elem, index) {
              root.removeDragPin(elem);
            });
          } // Current slide view


          var cur_sl_view = root.currentSlideView();
          root.addHotspotEditOptions(cur_sl_view);
          Backbone.trigger("slide_changed");
        }
      });
    },
    initDragPin: function (pin, current_slide) {
      if (!this.$(pin).data("uiDraggable")) {
        var root = this;
        this.$(pin).draggable({
          handle: ".pin-opener",
          containment: 'parent',
          stop: function (event, ui) {
            root.relocatePin(event, function () {
              ui.helper.css(ui.originalPosition);
            });

            if (ui.helper.hasClass('pin-active')) {
              // passing pin and current slide as parameter
              Common.positionPinTooltip(this.firstElementChild, $(this).parent());
            }
          }
        });
      }
    },
    removeDragPin: function (pin) {
      if ($(pin).data("uiDraggable")) {
        $(pin).draggable("destroy");
      }
    },
    relocatePin: function (event, error_callback) {
      var cur_slide = this.currentSlide();
      var slideType = cur_slide.primary_resource.type;

      if (slideType != 'image' && slideType != '360') {
        error_callback && error_callback();
        return;
      }

      ;

      if (slideType == "360") {
        var frame_width = this.$(event.target).parent().width();
        var frame_height = this.$(event.target).parent().height();
        var frameNum = this.$(event.target).parent().attr('data-frame');
      } else {
        var frame_width = this.$("#slider" + cur_slide.order).width();
        var frame_height = this.$("#slider" + cur_slide.order + ' .slide_image').height();
        var frameNum = null;
      }

      ;
      var left = (event.target.offsetLeft / frame_width * 100).toFixed(2) + '%';
      var top = (event.target.offsetTop / frame_height * 100).toFixed(2) + '%';
      var pin_id = parseInt(this.$(event.target).attr('pin-id'));
      var slide = new Slide({
        id: Common.CURRENT_SLIDE,
        walkthrough_id: this.walkthrough_id,
        entity: {
          type: 'pin',
          event: 'relocate',
          entity_id: pin_id,
          value: {
            top: top,
            left: left,
            frame_number: frameNum
          }
        }
      });
      var root = this;
      slide.save(null, {
        patch: true,
        error: function () {
          error_callback && error_callback();
        }
      });
    },
    showDeleteSlidePopup: function () {
      if (this.$('.delete-slide').hasClass('disabled')) return;

      if (this.currentViewHasSlides() && Common.CURRENT_SLIDE <= this.current_view.slide_views.length) {
        this.popupShow("popup-delete-media");
      }
    },
    deleteSlide: function () {
      if (this.currentViewHasSlides() && Common.CURRENT_SLIDE > this.current_view.slide_views.length) return;
      this.actionInProgress('popup-delete-media');
      var root = this;
      this.walkthrough.save({
        'delete_slide': Common.CURRENT_SLIDE
      }, {
        patch: true,
        success: function (response) {
          root.walkthrough.unset('delete_slide', {
            silent: true
          });
          root.actionSuccess('popup-delete-media', function () {
            var curSlideOrder = Common.CURRENT_SLIDE;

            if (root.walkthrough && root.walkthrough.get('slides')) {
              if (Common.CURRENT_SLIDE > root.walkthrough.get('slides').length) {
                curSlideOrder = root.walkthrough.get('slides').length;
              }
            }

            root.current_view.$el.html('');
            root.current_view.load(root.product_id, root.section_id, root.walkthrough_id, curSlideOrder);
          });
        },
        error: function (response, xhr) {
          root.actionFailed('popup-delete-media');
        }
      });
    },
    canAnnotate: function (slide) {
      if (!slide) {
        slide = this.currentSlide();
      }

      if (!slide.primary_resource || !(slide.primary_resource.type == '360' || slide.primary_resource.type == 'image')) {
        return false;
      }

      return true;
    },
    //End of Create/Edit demo player
    //General functions (functon may used for section and player both)
    overlayCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    hidePopup: function (event) {
      if ($(event.currentTarget).hasClass('disabled')) return;
      var popupName = $(event.currentTarget).attr('rel');
      var formType = $(event.currentTarget).closest('form').attr('form-type');

      if (popupName) {
        this.popupClose(popupName); // If the popup is a notes add popup, then reset the data-page attrib to 'new'.

        if (popupName == 'create-edit-notes' && formType == 'add') {
          this.$('.pagination li').removeClass('active');
          var newNoteLi = this.$('.pagination ul li[data-page="' + this.$('.pagination ul li').length + '"]');
          var lastActive = newNoteLi.attr('last-active');
          newNoteLi.attr('data-page', "new");
          this.$('.pagination li[data-page]').removeAttr('last-active');
          this.$('.pagination ul li[data-page="' + lastActive + '"]').addClass('active');
        }
      }

      if ($(event.target).hasClass("reload")) {
        this.current_view.load(this.section_id, true);
        this.$('#edit-popups').html(this.template());
      }
    },
    popupShow: function (popupName) {
      Common.KEY_NAVIGATION = false;
      this.$(".edit-overlay").css({
        "display": "table"
      });
      this.$(".edit-overlay .popup-box." + popupName).show();
      this.$(".edit-overlay .popup-box." + popupName).addClass("bounceInDown");
      setTimeout(() => {
        this.$(".edit-overlay .popup-box." + popupName).removeClass("bounceInDown");
      }, 300);
    },
    popupClose: function (popupName, showOverlay) {
      this.$(".edit-overlay ." + popupName).addClass("bounceOutUp");
      setTimeout(() => {
        this.$(".edit-overlay .popup-box." + popupName).hide();
        this.$(".edit-overlay .popup-box." + popupName).removeClass("bounceOutUp");

        if (!showOverlay) {
          this.$(".edit-overlay").hide();
        }
      }, 300);
      Common.KEY_NAVIGATION = true;
    },
    customErrorMessage: function (message, target, elem) {
      this.removeCustomErrorMessage();
      var editToolTip = '<div class="edit-tool-tip error-msg cta">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.focus();
    },

    removeCustomErrorMessage() {
      this.$('.edit-tool-tip').remove();
    },

    actionSuccess: function (target, post_success, retain_popup) {
      this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
      this.$('.' + target + ' .form-sent').addClass("slide-in");
      var root = this;
      setTimeout(function () {
        root.$('.' + target + ' .form-sent').removeClass("slide-in");
        if (!retain_popup) root.popupClose(target);

        if (post_success) {
          post_success();
        }
      }, 1000);
    },
    actionInProgress: function (target) {
      this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
    },
    actionFailed: function (target, message) {
      var root = this;
      setTimeout(function () {
        this.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
        let targetElement = this.$('.' + target + ' .form-failed');
        if (message) targetElement.html(Translate(message)).addClass("slide-in");else targetElement.addClass("slide-in");
        setTimeout(function () {
          root.$('.' + target + ' .form-failed').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    updateCharCount: function (event) {
      var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));

      if (this.$(event.currentTarget).val().length <= maxChar) {
        var leftChar = maxChar - this.$(event.currentTarget).val().length;
        this.$(event.currentTarget).parents('.block').find('span[data-counter]').text(leftChar);
      }
    },
    exitEdit: function () {
      window.location.replace('/dashboard/library');
    },
    confirmPublish: function (event) {
      if ($(event.currentTarget).hasClass('disable')) return;
      this.popupShow('confirm-publish-demo');
    },
    publishChapter: function () {
      this.actionInProgress('confirm-publish-demo');

      if (this.walkthrough) {
        var root = this;
        this.walkthrough.save({
          publish: true
        }, {
          patch: true,
          wait: true,
          success: function (response) {
            root.walkthrough.unset('publish', {
              silent: true
            });
            root.actionSuccess('confirm-publish-demo', function () {
              root.clearChaptersList();

              if (root.product_id == root.section_id) {
                // reset common.product_details to fetch updated playlists
                Common.product_details = null;
                Backbone.history.navigate('#!/' + root.product_id, {
                  trigger: true
                });
              } else {
                Backbone.history.navigate('#!/' + root.product_id + '/' + root.section_id, {
                  trigger: true
                });
              }
            });
          },
          error: function (response, xhr) {
            root.actionFailed('confirm-publish-demo');
          }
        });
      } else this.publishMultipleChapter();
    },
    publishMultipleChapter: function () {
      var root = this;
      var chapterList = [];

      _.each(this.$('.multiChapter-selection-active li.chapter-selected'), element => chapterList.push($(element).attr("slug")));

      var walkthrough = new Walkthrough({
        id: '',
        chapterList: chapterList,
        publish: true
      });
      walkthrough.save(null, {
        patch: true,
        success: function (response) {
          root.clearChaptersList();
          let failedChapters = response.attributes.failed_chapters;

          if (failedChapters.length > 0) {
            _.each(root.$('.multiChapter-selection-active li.chapter-selected'), function (element) {
              if (failedChapters.indexOf($(element).attr("slug")) == -1) {
                $(element).removeClass("chapter-selected");
              }
            });

            root.addRetryOption('confirm-publish-demo', failedChapters.length, chapterList.length, 'publish');
          } else {
            root.actionSuccess('confirm-publish-demo', () => root.current_view.load(root.section_id, true));
          }
        },
        error: function (response, xhr) {
          root.actionFailed('confirm-publish-demo');
        }
      });
    },
    addRetryOption: function (target, failedChaptersLength, totalChaptersLength, method) {
      this.actionFailed(target);
      this.$(`.${target} .to-do-action`).text(Translate("retry"));
      this.$(`.${target} .form-footer .cancel`).addClass("reload");
      this.$(`.${target} .popup-info.sub-title`).text(`${failedChaptersLength} 
                                    ${Translate("out of")} ${totalChaptersLength}
                                    ${Translate(`chapter(s) failed, please click retry to ${method} failed chapter(s) again`)}`);
    },
    showDeleteMultipleItemsPopup: function (event) {
      if ($(event.currentTarget).hasClass('disable')) return;

      if ($('.playlist-block').hasClass('playlist-selected')) {
        this.popupShow('popup-delete-multiple-playlists');
      } else {
        this.popupShow('popup-delete-multiple-chapters');
      }
    },
    confirmDeleteMultipleChapters: function (event) {
      this.actionInProgress('popup-delete-multiple-chapters');
      var root = this;
      var chaptersList = [];

      _.each(this.$('.multiChapter-selection-active li.chapter-selected'), element => chaptersList.push($(element).attr("slug")));

      var walkthrough = new Walkthrough({
        id: ''
      });
      walkthrough.destroy({
        wait: true,
        data: JSON.stringify({
          chaptersList: chaptersList
        }),
        processData: true,
        contentType: 'application/json',
        success: function (model, response) {
          root.clearChaptersList();
          let failedChapters = response.failed_chapters;

          if (failedChapters.length > 0) {
            _.each(root.$('.multiChapter-selection-active li.chapter-selected'), function (element) {
              if (failedChapters.indexOf($(element).attr("slug")) == -1) {
                $(element).removeClass("chapter-selected");
              }
            });

            root.addRetryOption('popup-delete-multiple-chapters', failedChapters.length, chaptersList.length, 'delete');
          } else {
            root.actionSuccess('popup-delete-multiple-chapters', () => root.current_view.load(root.section_id, true));
          }
        },
        error: function (response, xhr) {
          root.actionFailed('popup-delete-multiple-chapters');
        }
      });
    },
    confirmDeleteMultiplePlaylists: function (event) {
      this.actionInProgress('popup-delete-multiple-playlists');
      var root = this;
      var playlistsList = [];

      _.each(this.$('.multiPlaylist-selection-active.playlist-selected .playlist-left'), element => playlistsList.push(Number($(element).attr("playlist_id"))));

      var playlist = new Playlist({
        id: ''
      });
      playlist.destroy({
        wait: true,
        data: JSON.stringify({
          playlist_ids: playlistsList
        }),
        processData: true,
        contentType: 'application/json',
        success: function (model, response) {
          let failedPlaylists = response.failed_playlists;

          if (failedPlaylists && failedPlaylists.length > 0) {
            _.each(root.$('.multiPlaylist-selection-active.playlist-selected'), function (element) {
              if (failedPlaylists.indexOf($(element).attr("playlist_id")) == -1) {
                $(element).removeClass("playlist-selected");
              }
            });

            root.addRetryOption('popup-delete-multiple-playlists', failedPlaylists.length, playlistsList.length, 'delete');
          } else {
            root.actionSuccess('popup-delete-multiple-playlists', () => root.current_view.load(root.section_id, true));
          }
        },
        error: function (response, xhr) {
          root.actionFailed('popup-delete-multiple-playlists');
        }
      });
    },
    previewDemo: function (event) {
      if ($(event.currentTarget).hasClass('disable')) return;
      window.open(window.location.href.replace('edit', 'preview'), '_blank');
    },
    rgb2hex: function (rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }

      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    },
    hasChildren: function (section) {
      if (section && section.get('children') && section.get('children').length) {
        return true;
      }

      return false;
    },
    hasPlaylists: function (section) {
      if (section && section.get('playlists') && section.get('playlists').length) {
        return true;
      }

      return false;
    },
    currentViewHasSlides: function () {
      if (this.current_view && this.current_view.slide_views && this.current_view.slide_views.length) {
        return true;
      }

      return false;
    },

    /* Box data */
    getBoxData: function (event) {
      if (this.$(event.currentTarget).hasClass('disabled')) return;
      var root = this;
      var appendTo = 'box-content-list';
      this.$('#' + appendTo).empty();
      this.$('#' + appendTo).niceScroll();
      var box_api = new BoxApi();
      box_api.fetch({
        success: function (resp) {
          if ($('#layout_selection_block').hasClass('active')) {
            root.hideCreateLayout('box-category-option');
          } else {
            root.popupClose('box-category-option', true);
          }

          setTimeout(function () {
            root.popupShow('box-content-block');
            root.buildBoxListData(resp.attributes[0], appendTo, 'folders', 0, 'parent'); // check if its a playlist page

            if (root.hasPlaylists(root.section)) root.enableFilesDisableFolder();
          }, 400);
        },
        error: function (model, response) {
          if (response.status == 302 && response.responseJSON.redirect_url) {
            window.location.href = response.responseJSON.redirect_url;
          }
        }
      });
    },
    buildBoxListData: function (data, appendTo, listType, leftSpace, parent) {
      leftSpace += 10;
      var root = this;

      if (data.folders) {
        $.each(data.folders, function (index, elem) {
          if (index == 'files' || index == 'folders') {
            root.buildBoxListData(elem, appendTo, index, leftSpace, parent);
          } else if (typeof elem == 'object') {
            var list = '<li class="' + parent + '" data-list-type="' + listType + '" id="' + index + '">';
            list += '<div class="list-details li_' + parent + '" style="padding-left:' + leftSpace + 'px">';
            list += '<div class="expandSection"><span class="expandIcon"></span></div>';
            list += '<span class="list-title">' + elem.name + '</span>';
            list += '<input type="checkbox" id="li-' + index + '" class="css-checkbox" data-value="' + index + '" name="' + listType + '">';
            list += '<label for="li-' + index + '" class="css-label"></label>';
            list += '</div>';
            list += '</li>';
            $('#' + appendTo).append(list);
            root.buildBoxListData(elem, index, listType, leftSpace, 'child');
          }
        });
      }

      if (data.files) {
        $.each(data.files, function (index, elem) {
          if (index == 'files') {
            root.buildBoxListData(elem, appendTo, index, leftSpace, parent);
          } else if (typeof elem == 'object') {
            var list = '<li class="' + parent + '" data-list-type="files" id="' + index + '">';
            list += '<div class="list-details li_' + parent + '" style="padding-left:' + leftSpace + 'px">';
            list += '<div class="expandSection"><span class="expandIcon"></span></div>';
            list += '<span class="list-title">' + elem.name + '</span>';
            list += '<input type="checkbox" id="li-' + index + '" class="css-checkbox" data-value="' + index + '" name="files">';
            list += '<label for="li-' + index + '" class="css-label"></label>';
            list += '</div>';
            list += '</li>';
            $('#' + appendTo).append(list);
            root.buildBoxListData(elem, index, 'files', leftSpace, 'child');
          }
        });
      }
    },
    saveBoxEntries: function (event) {
      event.preventDefault();
      this.actionInProgress('box-content-block');
      var content = {
        'folders': [],
        'files': [],
        'parent': this.section_id
      };

      _.each(this.$('input[type=checkbox][name=folders]:checked:not(:disabled)'), function (folder) {
        content.folders.push($(folder).attr('data-value'));
      });

      _.each(this.$('input[type=checkbox][name=files]:checked:not(:disabled)'), function (file) {
        content.files.push($(file).attr('data-value'));
      });

      var box_api = new BoxApi();
      var root = this;
      box_api.save(content, {
        success: function () {
          root.actionSuccess('box-content-block', function () {
            if (root.section_id) {
              root.current_view.load(root.section_id, true);
            } else {
              root.current_view = new HomeView();
            }
          });
        },
        error: function () {
          root.actionFailed('box-content-block');
        }
      });
    },
    duplicateSection: function (event) {
      var element = this.$(event.currentTarget).parent().siblings('.pwt-box.active');
      if (element.hasClass('disabled') || element.hasClass('uneditable')) return false;
      var source_slug = this.$(event.currentTarget).parent().siblings('.pwt-box.active').attr('slug');
      var section = new Section({
        id: source_slug,
        copy: true,
        parent: this.section_id
      });
      $('.grey_layout_bg').addClass('active').append($('<span>', {
        id: 'loading_icon'
      }));
      var root = this;
      section.save(null, {
        patch: true,
        success: function (response) {
          if (root.section_id) {
            root.current_view.load(root.section_id, true);
          } else {
            root.current_view = new HomeView();
          }
        },
        error: function (xhr, status_code, error_message) {
          console.log('error', status_code, error_message);
        },
        complete: function () {
          $('.grey_layout_bg').removeClass('active').empty();
        }
      });
    },
    duplicateChapter: function (event) {
      var element = this.$(event.currentTarget).parents('li');
      if (element.hasClass('uneditable')) return false;
      var walkthrough_slug = element.attr('slug');
      var walkthrough = new Walkthrough({
        id: walkthrough_slug,
        copy: true
      });
      $('.grey_layout_bg').addClass('active').append($('<span>', {
        id: 'loading_icon'
      }));
      var root = this;
      walkthrough.save(null, {
        patch: true,
        success: function (response) {
          if (root.section_id) {
            root.current_view.load(root.section_id, true);
          } else {
            root.current_view = new HomeView();
          }
        },
        error: function (xhr, status_code, error_message) {
          console.log('error', status_code, error_message);
        },
        complete: function () {
          $('.grey_layout_bg').removeClass('active').empty();
        }
      });
    },
    addRemoveSelection: function (event) {
      var elem = this.$(event.currentTarget);
      var childElem = elem.closest('li').find('li .css-checkbox');
      var chilListElem = elem.closest('li').find('li .list-details');

      if (elem.is(':checked')) {
        childElem.prop('checked', true);
        childElem.attr('disabled', true);
        elem.parent('.list-details').addClass('selected');
        chilListElem.removeClass('selected');
      } else {
        childElem.prop('checked', false);
        childElem.attr('disabled', false);
        elem.parent('.list-details').removeClass('selected');
        chilListElem.removeClass('selected');
      }

      if (this.$('#box-content-list input[type=checkbox]:checked').length) {
        this.$('.box-content-block .import-box-data').removeAttr('disabled');
      } else {
        this.$('.box-content-block .import-box-data').attr('disabled', true);
      }
    },
    enableFilesDisableFolder: function () {
      $('#box-content-list .css-checkbox').attr('disabled', true);
      $('#box-content-list input[name=files]').attr('disabled', false);
      $('#box-content-list .child').each(function () {
        if ($(this).attr('data-list-type') == 'files') {
          if ($(this).siblings('li').attr('data-list-type') !== 'folders') {
            $(this).prev('.list-details').find('.css-checkbox').attr('disabled', false);
          }
        }
      });
    },
    scrollToAdvancedOptions: function (e) {
      this.$(e.currentTarget).toggleClass('advance-visible');
      var root = this;
      setTimeout(function () {
        root.$('form[name=default-section-data] .content-block, .content-block').animate({
          scrollTop: 750
        }, 'slow');
        root.$('form[name=asset-section-data] .content-block, .content-block').animate({
          scrollTop: 950
        }, 'slow');
      }, 500);
    },
    switchLanguageWarning: function () {
      this.popupShow('create-warning');
      var warningMsg = "Switch to '" + document.defaultLocale + "' language to create a new content !";
      this.$('.create-warning .popup-info').text(warningMsg);
    },
    refreshEveryHour: function () {
      setTimeout(function () {
        var timeLeft = 59,
            cinterval;
        $('#reload-message').fadeIn(200);
        $('#reload-counter').html(timeLeft);

        var timeDec = function () {
          timeLeft--;
          $('#reload-counter').html(timeLeft);

          if (timeLeft === 0) {
            clearInterval(cinterval);
            return false;
          }
        };

        cinterval = setInterval(timeDec, 1000);
      }, 1000 * 60 * 59);
    },

    /**
     * Select/Deselect Individual chapter for multiple publishing
     */
    selectMultipleChapters: function (e) {
      if (this.$(e.currentTarget).parents('.playlist-block').hasClass('disabled') || this.$(e.currentTarget).parents('.playlist-block').hasClass('uneditable') || this.$(e.currentTarget).parents('li').hasClass('no-slides') || this.$('.playlist-block').hasClass('playlist-selected')) return;
      e.stopPropagation();
      this.$(e.currentTarget).parents('li').toggleClass('chapter-selected');
      let totalChaptersSelected = document.getElementsByClassName('chapter-selected').length;
      /**
       * Add/Remove Multi-Chapter Selection option for chapters 
       * Active/deactivate "Publish" button
       */

      if (totalChaptersSelected > 0) {
        $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').removeClass('disable');
        this.$('.pwt-list').addClass('multiChapter-selection-active');
      } else {
        $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').addClass('disable');
        this.$('.pwt-list').removeClass('multiChapter-selection-active');
      }
    },
    selectMultiplePlaylists: function (e) {
      e.stopPropagation();
      this.deselectAllChapters(e);
      this.$(e.currentTarget).parents('.playlist-block').toggleClass('playlist-selected');
      let totalPlaylistsSelected = document.getElementsByClassName('playlist-selected').length;
      this.$('.playlist-block.playlist-selected  li').addClass('chapter-selected');

      if (totalPlaylistsSelected > 0) {
        $('.edit-controls .deselect-all-items').addClass('hide');
        $('.edit-controls .select-all-items').removeClass('hide, disable');
        $('.edit-controls .publish').addClass('disable');
        $('.edit-controls .delete-items').removeClass('disable');
        this.$('.playlist-block').addClass('multiPlaylist-selection-active');
      } else {
        $('.edit-controls .publish, .edit-controls .select-all-items, .edit-controls .delete-items').addClass('disable');
        this.$('.playlist-block').removeClass('multiPlaylist-selection-active');
      }
    },
    // Select all Items
    selectAllItems: function (e) {
      if (this.$('.playlist-block').hasClass('multiPlaylist-selection-active')) {
        this.selectAllPlaylists(e);
      } else {
        this.selectAllChapters(e);
      }
    },
    // Select all Playlists
    selectAllPlaylists: function (e) {
      this.$(e.currentTarget).addClass('hide');
      this.$('.deselect-all-items').removeClass('hide');
      this.$('.delete-items').removeClass('disable');
      this.$('.playlist-block').addClass('playlist-selected');
      this.$('.playlist-block .pwt-list li').addClass('chapter-selected');
    },
    // Select all chapters
    selectAllChapters: function (e) {
      this.$('.playlist-block:not(.disabled, .uneditable) .pwt-list li:not(.no-slides)').addClass('chapter-selected');
      this.$(e.currentTarget).addClass('hide');
      this.$('.deselect-all-items').removeClass('hide');
      this.$('.delete-items').removeClass('disable');
    },
    // Deselect all selected items
    deselectAllItems: function (e) {
      if (this.$('.playlist-block').hasClass('playlist-selected')) {
        this.deselectAllPlaylists(e);
      } else {
        this.deselectAllChapters(e);
      }
    },
    deselectAllPlaylists: function (e) {
      this.$('.playlist-block').removeClass('playlist-selected');
      this.$('.pwt-list li.chapter-selected').removeClass('chapter-selected');
      this.$('.deselect-all-items').addClass('hide');
      this.$('.select-all-items, .delete-items, .edit-controls .publish').addClass('disable');
      this.$('.select-all-items').removeClass('hide');
      this.$('.playlist-block').removeClass('multiPlaylist-selection-active');
    },
    deselectAllChapters: function (e) {
      this.$('.pwt-list li.chapter-selected').removeClass('chapter-selected');
      this.$('.deselect-all-items').addClass('hide');
      this.$('.select-all-items, .delete-items, .edit-controls .publish').addClass('disable');
      this.$('.select-all-items').removeClass('hide');
      this.$('.pwt-list').removeClass('multiChapter-selection-active');
    },

    /**
    * Set the data, value of 'usr-grp-dropdown' w.r.t to groups selected.
    */
    selectUserGroups: function (event) {
      this.removeCustomErrorMessage();
      let usrGrpValues = [];
      let usrGrpIds = [];
      let formName = this.$(event.currentTarget).closest('form').attr('name');
      let selectGrpList = this.$(`form[name='${formName}'] .user-group-items:checked`);

      _.each(selectGrpList, elem => {
        usrGrpValues.push(this.$(elem).attr('data-attr-name'));
        usrGrpIds.push(this.$(elem).attr('data-attr-id'));
      });

      this.$(`form[name='${formName}'] .usr-grp-dropdown`).val(usrGrpValues).attr('data-selected-groups', usrGrpIds);
    },

    /**
     * Content Document Parser starts here.
     */
    //prevent browser's default behaviour on dragover
    preventDefaultDragover: function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.add('upload_box_border');
    },
    // Highlight the dropzone
    deactiveContentDocDropZone: function () {
      event.target.classList.remove('upload_box_border');
    },
    //  Dropped Content document parser
    uploadContentDoc: function (e) {
      event.stopPropagation();
      event.preventDefault();
      const dt = event.dataTransfer;
      const files = dt.files;
      this.handleDocFiles(files[0], this.$(event.target).data('type'));
    },
    // Uploaded Content document
    uploadContentFiles: function (event) {
      const files = event.target.files;
      this.handleDocFiles(files[0], this.$(event.target).data('type'));
    },
    // Validate docx and dita zip files.
    // validate filesize and format of the uploaded document. 
    validateDocument: function (docFile, docType) {
      let status = {
        valid: true,
        msg: ''
      };

      if (docFile.size / 1000000 > Common.DEFAULT_FILE_MAX_SIZE) {
        status.valid = false;
        status.msg = `Please upload a file which is less than ${Common.DEFAULT_FILE_MAX_SIZE}MB.`;
      } else if (_.contains(["docx", "dita"], docType)) {
        if (docType == 'docx' && !/\.(docx)$/i.test(docFile.name)) {
          status.valid = false;
          status.msg = 'Please upload a valid docx file';
        } else if (docType == 'dita' && !/\.(zip)$/i.test(docFile.name)) {
          status.valid = false;
          status.msg = 'Please upload a valid dita zip file';
        }
      } else {
        status.valid = false;
        status.msg = 'Please upload a valid docx/dita zip file.';
      }

      return status;
    },
    // Send a POST request to documnet parser API after validating the uploaded document.
    handleDocFiles: function (docFile, docType) {
      let validationStatus = this.validateDocument(docFile, docType);
      this.$('.document-parser-container, .show-layout-popup popup-back-icon').addClass('hidden');
      this.$('.parser-document-status').removeClass('hidden');

      if (!validationStatus.valid) {
        this.showDocError(validationStatus.msg);
        return;
      } else {
        this.$('.parser-document-status .status').removeClass('progress success');
        this.$('.show-layout-popup.popup-back-icon').addClass('hidden');
        this.$('.parser-uploading-doc .status').addClass('progress');
        this.$('.popup-box.upload-docx-documents-block .cancel').addClass('disabled');
        var docData = new FormData();
        docData.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
        docData.append('section_slug', this.section_id);
        docData.append('document_type', docType);
        docData.append('document', docFile);
        var root = this;
        var docParser = new DocumentParser();
        docParser.save(docData, {
          processData: false,
          cache: false,
          contentType: false,
          data: docData,
          success: (model, response) => {
            root.$('.upload-docx-documents-block').attr('filename', response.filename).attr('status', response.status);
            root.docParserStatusHandler(5000);
          },
          error: (xhr, status, message) => {
            let msg = 'ERROR';
            if (status && status.responseJSON) msg = status.responseJSON.message;else if (message) msg = message.textStatus;
            root.showDocError(msg);
          }
        });
      }
    },
    showDocError: function (msg, description) {
      this.$('.popup-box.upload-docx-documents-block .cancel').removeClass('disabled');
      this.$('.parser-document-status .status').removeClass('progress success');
      this.$('.parser-uploading-doc .status-text').addClass('error');
      this.$('.parser-document-status-error').removeClass('hidden');
      this.$('.parser-document-status-error p').html(msg);
      if (description) this.$('.parser-document-status-error .description').html(description);
    },

    /**
    * Call DocParser api every 5 seconds and update status.
    */
    docParserStatusHandler: function (interval) {
      if (interval === undefined) interval = 5000;
      setTimeout(() => {
        let docStatus = this.$('.upload-docx-documents-block').attr('status');
        let description = this.$('.upload-docx-documents-block').attr('description');
        let filename = this.$('.upload-docx-documents-block').attr('filename');
        this.$('.popup-box.upload-docx-documents-block .cancel').addClass('disabled'); // If DocParser is having a 'failed' status then show the error msg.

        if ($.inArray(docStatus, document.DOCUMENT_PARSER_FAIL_STATUS) !== -1) {
          this.showDocError(docStatus, description);
        } else if (docStatus != 'IMPORT_COMPLETE') {
          var root = this;
          let docParser = new DocumentParser({
            id: filename
          }); // pass in a filename.

          docParser.fetch({
            success: function (model, response) {
              // If doc importing is successful, then re-load the view.
              if (response.status == 'IMPORT_COMPLETE') {
                root.$('.parser-document-status .status').removeClass('progress').addClass('success');
                root.$('.parser-document-status .status-inprogress').addClass('hidden');
                root.$('.parser-document-status .status-done').removeClass('hidden');
                setTimeout(function () {
                  root.$('.popup-box.upload-docx-documents-block').hide();
                  root.popupClose('layout_selection_block');
                  root.current_view.load(root.section_id, true);
                }, 1000);
                return;
              }

              root.$('.upload-docx-documents-block').attr({
                'filename': response.filename,
                'status': response.status,
                'description': response.description
              });
              root.$('.parser-document-status .status').removeClass('progress success');
              root.$('.show-layout-popup.popup-back-icon').addClass('hidden');
              root.$('.parser-uploading-doc .status').addClass('success');
              root.$('.parser-parsing-data .status').addClass('progress');

              if ($.inArray(response.status, ['PARSING_COMPLETE', 'COMPLETED']) !== -1) {
                root.$('.parser-uploading-doc .status, .parser-parsing-data .status').removeClass('progress').addClass('success');
                root.$('.parser-genrating-chapter .status').addClass('progress');
              }

              root.docParserStatusHandler(interval);
            },
            error: function (xhr, status, message) {
              let msg = 'ERROR';
              if (message) msg = message.textStatus;
              root.showDocError(msg);
            }
          });
        }
      }, interval);
    }
    /**
     * Content Document Parse ends here
     */

  });
  return EditView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/libs/colpick/colpick.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/libs/colpick/colpick.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
colpick Color Picker
Copyright 2013 Jose Vargas. Licensed under GPL license. Based on Stefan Petre's Color Picker www.eyecon.ro, dual licensed under the MIT and GPL licenses

For usage and examples: colpick.com/plugin
 */
(function ($) {
  var colpick = function () {
    var tpl = '<div class="colpick"><div class="colpick_color"><div class="colpick_color_overlay1"><div class="colpick_color_overlay2"><div class="colpick_selector_outer"><div class="colpick_selector_inner"></div></div></div></div></div><div class="colpick_hue"><div class="colpick_hue_arrs"><div class="colpick_hue_larr"></div><div class="colpick_hue_rarr"></div></div></div><div class="colpick_new_color"></div><div class="colpick_current_color"></div><div class="colpick_hex_field"><div class="colpick_field_letter">#</div><input type="text" maxlength="6" size="6" /></div><div class="colpick_rgb_r colpick_field"><div class="colpick_field_letter">R</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_g colpick_field"><div class="colpick_field_letter">G</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_rgb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_h colpick_field"><div class="colpick_field_letter">H</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_s colpick_field"><div class="colpick_field_letter">S</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_hsb_b colpick_field"><div class="colpick_field_letter">B</div><input type="text" maxlength="3" size="3" /><div class="colpick_field_arrs"><div class="colpick_field_uarr"></div><div class="colpick_field_darr"></div></div></div><div class="colpick_submit"></div></div>',
        defaults = {
      showEvent: 'click',
      onShow: function () {},
      onBeforeShow: function () {},
      onHide: function () {},
      onChange: function () {},
      onSubmit: function () {},
      colorScheme: 'light',
      color: '3289c7',
      livePreview: true,
      flat: false,
      layout: 'full',
      submit: 1,
      submitText: 'OK',
      height: 156
    },
        //Fill the inputs of the plugin
    fillRGBFields = function (hsb, cal) {
      var rgb = hsbToRgb(hsb);
      $(cal).data('colpick').fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end();
    },
        fillHSBFields = function (hsb, cal) {
      $(cal).data('colpick').fields.eq(4).val(Math.round(hsb.h)).end().eq(5).val(Math.round(hsb.s)).end().eq(6).val(Math.round(hsb.b)).end();
    },
        fillHexFields = function (hsb, cal) {
      $(cal).data('colpick').fields.eq(0).val(hsbToHex(hsb));
    },
        //Set the round selector position
    setSelector = function (hsb, cal) {
      $(cal).data('colpick').selector.css('backgroundColor', '#' + hsbToHex({
        h: hsb.h,
        s: 100,
        b: 100
      }));
      $(cal).data('colpick').selectorIndic.css({
        left: parseInt($(cal).data('colpick').height * hsb.s / 100, 10),
        top: parseInt($(cal).data('colpick').height * (100 - hsb.b) / 100, 10)
      });
    },
        //Set the hue selector position
    setHue = function (hsb, cal) {
      $(cal).data('colpick').hue.css('top', parseInt($(cal).data('colpick').height - $(cal).data('colpick').height * hsb.h / 360, 10));
    },
        //Set current and new colors
    setCurrentColor = function (hsb, cal) {
      $(cal).data('colpick').currentColor.css('backgroundColor', '#' + hsbToHex(hsb));
    },
        setNewColor = function (hsb, cal) {
      $(cal).data('colpick').newColor.css('backgroundColor', '#' + hsbToHex(hsb));
    },
        //Called when the new color is changed
    change = function (ev) {
      var cal = $(this).parent().parent(),
          col;

      if (this.parentNode.className.indexOf('_hex') > 0) {
        cal.data('colpick').color = col = hexToHsb(fixHex(this.value));
        fillRGBFields(col, cal.get(0));
        fillHSBFields(col, cal.get(0));
      } else if (this.parentNode.className.indexOf('_hsb') > 0) {
        cal.data('colpick').color = col = fixHSB({
          h: parseInt(cal.data('colpick').fields.eq(4).val(), 10),
          s: parseInt(cal.data('colpick').fields.eq(5).val(), 10),
          b: parseInt(cal.data('colpick').fields.eq(6).val(), 10)
        });
        fillRGBFields(col, cal.get(0));
        fillHexFields(col, cal.get(0));
      } else {
        cal.data('colpick').color = col = rgbToHsb(fixRGB({
          r: parseInt(cal.data('colpick').fields.eq(1).val(), 10),
          g: parseInt(cal.data('colpick').fields.eq(2).val(), 10),
          b: parseInt(cal.data('colpick').fields.eq(3).val(), 10)
        }));
        fillHexFields(col, cal.get(0));
        fillHSBFields(col, cal.get(0));
      }

      setSelector(col, cal.get(0));
      setHue(col, cal.get(0));
      setNewColor(col, cal.get(0));
      cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 0]);
    },
        //Change style on blur and on focus of inputs
    blur = function (ev) {
      $(this).parent().removeClass('colpick_focus');
    },
        focus = function () {
      $(this).parent().parent().data('colpick').fields.parent().removeClass('colpick_focus');
      $(this).parent().addClass('colpick_focus');
    },
        //Increment/decrement arrows functions
    downIncrement = function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      var field = $(this).parent().find('input').focus();
      var current = {
        el: $(this).parent().addClass('colpick_slider'),
        max: this.parentNode.className.indexOf('_hsb_h') > 0 ? 360 : this.parentNode.className.indexOf('_hsb') > 0 ? 100 : 255,
        y: ev.pageY,
        field: field,
        val: parseInt(field.val(), 10),
        preview: $(this).parent().parent().data('colpick').livePreview
      };
      $(document).mouseup(current, upIncrement);
      $(document).mousemove(current, moveIncrement);
    },
        moveIncrement = function (ev) {
      ev.data.field.val(Math.max(0, Math.min(ev.data.max, parseInt(ev.data.val - ev.pageY + ev.data.y, 10))));

      if (ev.data.preview) {
        change.apply(ev.data.field.get(0), [true]);
      }

      return false;
    },
        upIncrement = function (ev) {
      change.apply(ev.data.field.get(0), [true]);
      ev.data.el.removeClass('colpick_slider').find('input').focus();
      $(document).off('mouseup', upIncrement);
      $(document).off('mousemove', moveIncrement);
      return false;
    },
        //Hue slider functions
    downHue = function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      var current = {
        cal: $(this).parent(),
        y: $(this).offset().top
      };
      $(document).on('mouseup touchend', current, upHue);
      $(document).on('mousemove touchmove', current, moveHue);
      var pageY = ev.type == 'touchstart' ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
      change.apply(current.cal.data('colpick').fields.eq(4).val(parseInt(360 * (current.cal.data('colpick').height - (pageY - current.y)) / current.cal.data('colpick').height, 10)).get(0), [current.cal.data('colpick').livePreview]);
      return false;
    },
        moveHue = function (ev) {
      var pageY = ev.type == 'touchmove' ? ev.originalEvent.changedTouches[0].pageY : ev.pageY;
      change.apply(ev.data.cal.data('colpick').fields.eq(4).val(parseInt(360 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, pageY - ev.data.y))) / ev.data.cal.data('colpick').height, 10)).get(0), [ev.data.preview]);
      return false;
    },
        upHue = function (ev) {
      fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
      fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
      $(document).off('mouseup touchend', upHue);
      $(document).off('mousemove touchmove', moveHue);
      return false;
    },
        //Color selector functions
    downSelector = function (ev) {
      ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
      var current = {
        cal: $(this).parent(),
        pos: $(this).offset()
      };
      current.preview = current.cal.data('colpick').livePreview;
      $(document).on('mouseup touchend', current, upSelector);
      $(document).on('mousemove touchmove', current, moveSelector);
      var payeX, pageY;

      if (ev.type == 'touchstart') {
        pageX = ev.originalEvent.changedTouches[0].pageX, pageY = ev.originalEvent.changedTouches[0].pageY;
      } else {
        pageX = ev.pageX;
        pageY = ev.pageY;
      }

      change.apply(current.cal.data('colpick').fields.eq(6).val(parseInt(100 * (current.cal.data('colpick').height - (pageY - current.pos.top)) / current.cal.data('colpick').height, 10)).end().eq(5).val(parseInt(100 * (pageX - current.pos.left) / current.cal.data('colpick').height, 10)).get(0), [current.preview]);
      return false;
    },
        moveSelector = function (ev) {
      var payeX, pageY;

      if (ev.type == 'touchmove') {
        pageX = ev.originalEvent.changedTouches[0].pageX, pageY = ev.originalEvent.changedTouches[0].pageY;
      } else {
        pageX = ev.pageX;
        pageY = ev.pageY;
      }

      change.apply(ev.data.cal.data('colpick').fields.eq(6).val(parseInt(100 * (ev.data.cal.data('colpick').height - Math.max(0, Math.min(ev.data.cal.data('colpick').height, pageY - ev.data.pos.top))) / ev.data.cal.data('colpick').height, 10)).end().eq(5).val(parseInt(100 * Math.max(0, Math.min(ev.data.cal.data('colpick').height, pageX - ev.data.pos.left)) / ev.data.cal.data('colpick').height, 10)).get(0), [ev.data.preview]);
      return false;
    },
        upSelector = function (ev) {
      fillRGBFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
      fillHexFields(ev.data.cal.data('colpick').color, ev.data.cal.get(0));
      $(document).off('mouseup touchend', upSelector);
      $(document).off('mousemove touchmove', moveSelector);
      return false;
    },
        //Submit button
    clickSubmit = function (ev) {
      var cal = $(this).parent();
      var col = cal.data('colpick').color;
      cal.data('colpick').origColor = col;
      setCurrentColor(col, cal.get(0));
      cal.data('colpick').onSubmit(col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el);
    },
        //Show/hide the color picker
    show = function (ev) {
      // Prevent the trigger of any direct parent
      ev.stopPropagation();
      var cal = $('#' + $(this).data('colpickId'));
      cal.data('colpick').onBeforeShow.apply(this, [cal.get(0)]);
      var pos = $(this).offset();
      var top = pos.top + this.offsetHeight;
      var left = pos.left;
      var viewPort = getViewport();
      var calW = cal.width();

      if (left + calW > viewPort.l + viewPort.w) {
        left -= calW;
      }

      cal.css({
        left: left + 'px',
        top: top + 'px'
      });

      if (cal.data('colpick').onShow.apply(this, [cal.get(0)]) != false) {
        cal.show();
      } //Hide when user clicks outside


      $('html').mousedown({
        cal: cal
      }, hide);
      cal.mousedown(function (ev) {
        ev.stopPropagation();
      });
    },
        hide = function (ev) {
      if (ev.data.cal.data('colpick').onHide.apply(this, [ev.data.cal.get(0)]) != false) {
        ev.data.cal.hide();
      }

      $('html').off('mousedown', hide);
    },
        getViewport = function () {
      var m = document.compatMode == 'CSS1Compat';
      return {
        l: window.pageXOffset || (m ? document.documentElement.scrollLeft : document.body.scrollLeft),
        w: window.innerWidth || (m ? document.documentElement.clientWidth : document.body.clientWidth)
      };
    },
        //Fix the values if the user enters a negative or high value
    fixHSB = function (hsb) {
      return {
        h: Math.min(360, Math.max(0, hsb.h)),
        s: Math.min(100, Math.max(0, hsb.s)),
        b: Math.min(100, Math.max(0, hsb.b))
      };
    },
        fixRGB = function (rgb) {
      return {
        r: Math.min(255, Math.max(0, rgb.r)),
        g: Math.min(255, Math.max(0, rgb.g)),
        b: Math.min(255, Math.max(0, rgb.b))
      };
    },
        fixHex = function (hex) {
      var len = 6 - hex.length;

      if (len > 0) {
        var o = [];

        for (var i = 0; i < len; i++) {
          o.push('0');
        }

        o.push(hex);
        hex = o.join('');
      }

      return hex;
    },
        restoreOriginal = function () {
      var cal = $(this).parent();
      var col = cal.data('colpick').origColor;
      cal.data('colpick').color = col;
      fillRGBFields(col, cal.get(0));
      fillHexFields(col, cal.get(0));
      fillHSBFields(col, cal.get(0));
      setSelector(col, cal.get(0));
      setHue(col, cal.get(0));
      setNewColor(col, cal.get(0));
    };

    return {
      init: function (opt) {
        opt = $.extend({}, defaults, opt || {}); //Set color

        if (typeof opt.color == 'string') {
          opt.color = hexToHsb(opt.color);
        } else if (opt.color.r != undefined && opt.color.g != undefined && opt.color.b != undefined) {
          opt.color = rgbToHsb(opt.color);
        } else if (opt.color.h != undefined && opt.color.s != undefined && opt.color.b != undefined) {
          opt.color = fixHSB(opt.color);
        } else {
          return this;
        } //For each selected DOM element


        return this.each(function () {
          //If the element does not have an ID
          if (!$(this).data('colpickId')) {
            var options = $.extend({}, opt);
            options.origColor = opt.color; //Generate and assign a random ID

            var id = 'collorpicker_' + parseInt(Math.random() * 1000);
            $(this).data('colpickId', id); //Set the tpl's ID and get the HTML

            var cal = $(tpl).attr('id', id); //Add class according to layout

            cal.addClass('colpick_' + options.layout + (options.submit ? '' : ' colpick_' + options.layout + '_ns')); //Add class if the color scheme is not default

            if (options.colorScheme != 'light') {
              cal.addClass('colpick_' + options.colorScheme);
            } //Setup submit button


            cal.find('div.colpick_submit').html(options.submitText).click(clickSubmit); //Setup input fields

            options.fields = cal.find('input').change(change).blur(blur).focus(focus);
            cal.find('div.colpick_field_arrs').mousedown(downIncrement).end().find('div.colpick_current_color').click(restoreOriginal); //Setup hue selector

            options.selector = cal.find('div.colpick_color').on('mousedown touchstart', downSelector);
            options.selectorIndic = options.selector.find('div.colpick_selector_outer'); //Store parts of the plugin

            options.el = this;
            options.hue = cal.find('div.colpick_hue_arrs');
            huebar = options.hue.parent(); //Paint the hue bar

            var UA = navigator.userAgent.toLowerCase();
            var isIE = navigator.appName === 'Microsoft Internet Explorer';
            var IEver = isIE ? parseFloat(UA.match(/msie ([0-9]{1,}[\.0-9]{0,})/)[1]) : 0;
            var ngIE = isIE && IEver < 10;
            var stops = ['#ff0000', '#ff0080', '#ff00ff', '#8000ff', '#0000ff', '#0080ff', '#00ffff', '#00ff80', '#00ff00', '#80ff00', '#ffff00', '#ff8000', '#ff0000'];

            if (ngIE) {
              var i, div;

              for (i = 0; i <= 11; i++) {
                div = $('<div></div>').attr('style', 'height:8.333333%; filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + '); -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=' + stops[i] + ', endColorstr=' + stops[i + 1] + ')";');
                huebar.append(div);
              }
            } else {
              stopList = stops.join(',');
              huebar.attr('style', 'background:-webkit-linear-gradient(top,' + stopList + '); background: -o-linear-gradient(top,' + stopList + '); background: -ms-linear-gradient(top,' + stopList + '); background:-moz-linear-gradient(top,' + stopList + '); -webkit-linear-gradient(top,' + stopList + '); background:linear-gradient(to bottom,' + stopList + '); ');
            }

            cal.find('div.colpick_hue').on('mousedown touchstart', downHue);
            options.newColor = cal.find('div.colpick_new_color');
            options.currentColor = cal.find('div.colpick_current_color'); //Store options and fill with default color

            cal.data('colpick', options);
            fillRGBFields(options.color, cal.get(0));
            fillHSBFields(options.color, cal.get(0));
            fillHexFields(options.color, cal.get(0));
            setHue(options.color, cal.get(0));
            setSelector(options.color, cal.get(0));
            setCurrentColor(options.color, cal.get(0));
            setNewColor(options.color, cal.get(0)); //Append to body if flat=false, else show in place

            if (options.flat) {
              cal.appendTo(this).show();
              cal.css({
                position: 'relative',
                display: 'block'
              });
            } else {
              cal.appendTo(document.body);
              $(this).on(options.showEvent, show);
              cal.css({
                position: 'absolute'
              });
            }
          }
        });
      },
      //Shows the picker
      showPicker: function () {
        return this.each(function () {
          if ($(this).data('colpickId')) {
            show.apply(this);
          }
        });
      },
      //Hides the picker
      hidePicker: function () {
        return this.each(function () {
          if ($(this).data('colpickId')) {
            $('#' + $(this).data('colpickId')).hide();
          }
        });
      },
      //Sets a color as new and current (default)
      setColor: function (col, setCurrent) {
        setCurrent = typeof setCurrent === "undefined" ? 1 : setCurrent;

        if (typeof col == 'string') {
          col = hexToHsb(col);
        } else if (col.r != undefined && col.g != undefined && col.b != undefined) {
          col = rgbToHsb(col);
        } else if (col.h != undefined && col.s != undefined && col.b != undefined) {
          col = fixHSB(col);
        } else {
          return this;
        }

        return this.each(function () {
          if ($(this).data('colpickId')) {
            var cal = $('#' + $(this).data('colpickId'));
            cal.data('colpick').color = col;
            cal.data('colpick').origColor = col;
            fillRGBFields(col, cal.get(0));
            fillHSBFields(col, cal.get(0));
            fillHexFields(col, cal.get(0));
            setHue(col, cal.get(0));
            setSelector(col, cal.get(0));
            setNewColor(col, cal.get(0));
            cal.data('colpick').onChange.apply(cal.parent(), [col, hsbToHex(col), hsbToRgb(col), cal.data('colpick').el, 1]);

            if (setCurrent) {
              setCurrentColor(col, cal.get(0));
            }
          }
        });
      }
    };
  }(); //Color space convertions


  var hexToRgb = function (hex) {
    var hex = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
    return {
      r: hex >> 16,
      g: (hex & 0x00FF00) >> 8,
      b: hex & 0x0000FF
    };
  };

  var hexToHsb = function (hex) {
    return rgbToHsb(hexToRgb(hex));
  };

  var rgbToHsb = function (rgb) {
    var hsb = {
      h: 0,
      s: 0,
      b: 0
    };
    var min = Math.min(rgb.r, rgb.g, rgb.b);
    var max = Math.max(rgb.r, rgb.g, rgb.b);
    var delta = max - min;
    hsb.b = max;
    hsb.s = max != 0 ? 255 * delta / max : 0;

    if (hsb.s != 0) {
      if (rgb.r == max) hsb.h = (rgb.g - rgb.b) / delta;else if (rgb.g == max) hsb.h = 2 + (rgb.b - rgb.r) / delta;else hsb.h = 4 + (rgb.r - rgb.g) / delta;
    } else hsb.h = -1;

    hsb.h *= 60;
    if (hsb.h < 0) hsb.h += 360;
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;
    return hsb;
  };

  var hsbToRgb = function (hsb) {
    var rgb = {};
    var h = hsb.h;
    var s = hsb.s * 255 / 100;
    var v = hsb.b * 255 / 100;

    if (s == 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      var t1 = v;
      var t2 = (255 - s) * v / 255;
      var t3 = (t1 - t2) * (h % 60) / 60;
      if (h == 360) h = 0;

      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }

    return {
      r: Math.round(rgb.r),
      g: Math.round(rgb.g),
      b: Math.round(rgb.b)
    };
  };

  var rgbToHex = function (rgb) {
    var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
    $.each(hex, function (nr, val) {
      if (val.length == 1) {
        hex[nr] = '0' + val;
      }
    });
    return hex.join('');
  };

  var hsbToHex = function (hsb) {
    return rgbToHex(hsbToRgb(hsb));
  };

  $.fn.extend({
    colpick: colpick.init,
    colpickHide: colpick.hidePicker,
    colpickShow: colpick.showPicker,
    colpickSetColor: colpick.setColor
  });
  $.extend({
    colpick: {
      rgbToHex: rgbToHex,
      rgbToHsb: rgbToHsb,
      hsbToHex: hsbToHex,
      hsbToRgb: hsbToRgb,
      hexToHsb: hexToHsb,
      hexToRgb: hexToRgb
    }
  });
})(jQuery);

/***/ }),

/***/ "./sharedemos/static/libs/jquery-atwho/jquery.atwho.min.js":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/libs/jquery-atwho/jquery.atwho.min.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jquery.atwho - v1.4.0 %>
* Copyright (c) 2015 chord.luo <chord.luo@gmail.com>;
* homepage: http://ichord.github.com/At.js
* Licensed MIT
*/
!function (t, e) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (t) {
    return e(t);
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(0, function (t) {
  var e,
      i,
      n,
      r,
      o,
      s,
      a,
      l,
      h,
      u,
      c = [].slice,
      p = function (t, e) {
    for (var i in e) f.call(e, i) && (t[i] = e[i]);

    function n() {
      this.constructor = t;
    }

    return n.prototype = e.prototype, t.prototype = new n(), t.__super__ = e.prototype, t;
  },
      f = {}.hasOwnProperty;

  e = t, n = function () {
    function t(t) {
      this.currentFlag = null, this.controllers = {}, this.aliasMaps = {}, this.$inputor = e(t), this.setupRootElement(), this.listen();
    }

    return t.prototype.createContainer = function (t) {
      var i;
      return null != (i = this.$el) && i.remove(), e(t.body).append(this.$el = e("<div class='atwho-container'></div>"));
    }, t.prototype.setupRootElement = function (t, i) {
      var n;
      if (null == i && (i = !1), t) this.window = t.contentWindow, this.document = t.contentDocument || this.window.document, this.iframe = t;else {
        this.document = this.$inputor[0].ownerDocument, this.window = this.document.defaultView || this.document.parentWindow;

        try {
          this.iframe = this.window.frameElement;
        } catch (t) {
          if (n = t, this.iframe = null, e.fn.atwho.debug) throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n" + n);
        }
      }
      return this.createContainer((this.iframeAsRoot = i) ? this.document : document);
    }, t.prototype.controller = function (t) {
      var e, i, n, r;
      if (this.aliasMaps[t]) i = this.controllers[this.aliasMaps[t]];else for (n in r = this.controllers) if (e = r[n], n === t) {
        i = e;
        break;
      }
      return i || this.controllers[this.currentFlag];
    }, t.prototype.setContextFor = function (t) {
      return this.currentFlag = t, this;
    }, t.prototype.reg = function (t, e) {
      var i, n;
      return n = (i = this.controllers)[t] || (i[t] = this.$inputor.is("[contentEditable]") ? new s(this, t) : new h(this, t)), e.alias && (this.aliasMaps[e.alias] = t), n.init(e), this;
    }, t.prototype.listen = function () {
      return this.$inputor.on("compositionstart", (t = this, function (e) {
        var i;
        return null != (i = t.controller()) && i.view.hide(), t.isComposing = !0, null;
      })).on("compositionend", function (t) {
        return function (e) {
          return t.isComposing = !1, null;
        };
      }(this)).on("keyup.atwhoInner", function (t) {
        return function (e) {
          return t.onKeyup(e);
        };
      }(this)).on("keydown.atwhoInner", function (t) {
        return function (e) {
          return t.onKeydown(e);
        };
      }(this)).on("blur.atwhoInner", function (t) {
        return function (e) {
          var i;
          if (i = t.controller()) return i.expectedQueryCBId = null, i.view.hide(e, i.getOpt("displayTimeout"));
        };
      }(this)).on("click.atwhoInner", function (t) {
        return function (e) {
          return t.dispatch(e);
        };
      }(this)).on("scroll.atwhoInner", function (t) {
        return function () {
          var e;
          return e = t.$inputor.scrollTop(), function (i) {
            var n, r;
            return n = i.target.scrollTop, e !== n && null != (r = t.controller()) && r.view.hide(i), e = n, !0;
          };
        };
      }(this)());
      var t;
    }, t.prototype.shutdown = function () {
      var t, e;

      for (t in e = this.controllers) e[t].destroy(), delete this.controllers[t];

      return this.$inputor.off(".atwhoInner"), this.$el.remove();
    }, t.prototype.dispatch = function (t) {
      var e, i, n, r;

      for (e in r = [], n = this.controllers) i = n[e], r.push(i.lookUp(t));

      return r;
    }, t.prototype.onKeyup = function (t) {
      var i;

      switch (t.keyCode) {
        case a.ESC:
          t.preventDefault(), null != (i = this.controller()) && i.view.hide();
          break;

        case a.DOWN:
        case a.UP:
        case a.CTRL:
        case a.ENTER:
          e.noop();
          break;

        case a.P:
        case a.N:
          t.ctrlKey || this.dispatch(t);
          break;

        default:
          this.dispatch(t);
      }
    }, t.prototype.onKeydown = function (t) {
      var i, n;
      if ((n = null != (i = this.controller()) ? i.view : void 0) && n.visible()) switch (t.keyCode) {
        case a.ESC:
          t.preventDefault(), n.hide(t);
          break;

        case a.UP:
          t.preventDefault(), n.prev();
          break;

        case a.DOWN:
          t.preventDefault(), n.next();
          break;

        case a.P:
          if (!t.ctrlKey) return;
          t.preventDefault(), n.prev();
          break;

        case a.N:
          if (!t.ctrlKey) return;
          t.preventDefault(), n.next();
          break;

        case a.TAB:
        case a.ENTER:
        case a.SPACE:
          if (!n.visible()) return;
          if (!this.controller().getOpt("spaceSelectsMatch") && t.keyCode === a.SPACE) return;
          if (!this.controller().getOpt("tabSelectsMatch") && t.keyCode === a.TAB) return;
          n.highlighted() ? (t.preventDefault(), n.choose(t)) : n.hide(t);
          break;

        default:
          e.noop();
      }
    }, t;
  }(), r = function () {
    function t(t, i) {
      this.app = t, this.at = i, this.$inputor = this.app.$inputor, this.id = this.$inputor[0].id || this.uid(), this.expectedQueryCBId = null, this.setting = null, this.query = null, this.pos = 0, this.range = null, 0 === (this.$el = e("#atwho-ground-" + this.id, this.app.$el)).length && this.app.$el.append(this.$el = e("<div id='atwho-ground-" + this.id + "'></div>")), this.model = new l(this), this.view = new u(this);
    }

    return t.prototype.uid = function () {
      return (Math.random().toString(16) + "000000000").substr(2, 8) + new Date().getTime();
    }, t.prototype.init = function (t) {
      return this.setting = e.extend({}, this.setting || e.fn.atwho.default, t), this.view.init(), this.model.reload(this.setting.data);
    }, t.prototype.destroy = function () {
      return this.trigger("beforeDestroy"), this.model.destroy(), this.view.destroy(), this.$el.remove();
    }, t.prototype.callDefault = function () {
      var t, i, n;
      n = arguments[0], t = 2 <= arguments.length ? c.call(arguments, 1) : [];

      try {
        return o[n].apply(this, t);
      } catch (t) {
        return i = t, e.error(i + " Or maybe At.js doesn't have function " + n);
      }
    }, t.prototype.trigger = function (t, e) {
      var i, n;
      return null == e && (e = []), e.push(this), n = (i = this.getOpt("alias")) ? t + "-" + i + ".atwho" : t + ".atwho", this.$inputor.trigger(n, e);
    }, t.prototype.callbacks = function (t) {
      return this.getOpt("callbacks")[t] || o[t];
    }, t.prototype.getOpt = function (t, e) {
      try {
        return this.setting[t];
      } catch (t) {
        return t, null;
      }
    }, t.prototype.insertContentFor = function (t) {
      var i, n;
      return n = this.getOpt("insertTpl"), i = e.extend({}, t.data("item-data"), {
        "atwho-at": this.at
      }), this.callbacks("tplEval").call(this, n, i, "onInsert");
    }, t.prototype.renderView = function (t) {
      var e,
          i = this,
          n = function (t) {
        return i.getOpt("limit") ? t.slice(0, i.getOpt("limit")) : t;
      };

      return e = this.getOpt("searchKey"), t = this.callbacks("sorter").call(this, this.query.text, n(t), e), this.view.render(n(t));
    }, t.arrayToDefaultHash = function (t) {
      var i, n, r, o;
      if (!e.isArray(t)) return t;

      for (o = [], i = 0, r = t.length; i < r; i++) n = t[i], e.isPlainObject(n) ? o.push(n) : o.push({
        name: n
      });

      return o;
    }, t.prototype.lookUp = function (t) {
      var e, i;
      if ((!t || "click" !== t.type || this.getOpt("lookUpOnClick")) && (!this.getOpt("suspendOnComposing") || !this.app.isComposing)) return (e = this.catchQuery(t)) ? (this.app.setContextFor(this.at), (i = this.getOpt("delay")) ? this._delayLookUp(e, i) : this._lookUp(e), e) : (this.expectedQueryCBId = null, e);
    }, t.prototype._delayLookUp = function (t, e) {
      var i, n, r;
      return i = Date.now ? Date.now() : new Date().getTime(), this.previousCallTime || (this.previousCallTime = i), 0 < (n = e - (i - this.previousCallTime)) && n < e ? (this.previousCallTime = i, this._stopDelayedCall(), this.delayedCallTimeout = setTimeout((r = this, function () {
        return r.previousCallTime = 0, r.delayedCallTimeout = null, r._lookUp(t);
      }), e)) : (this._stopDelayedCall(), this.previousCallTime !== i && (this.previousCallTime = 0), this._lookUp(t));
    }, t.prototype._stopDelayedCall = function () {
      if (this.delayedCallTimeout) return clearTimeout(this.delayedCallTimeout), this.delayedCallTimeout = null;
    }, t.prototype._generateQueryCBId = function () {
      return {};
    }, t.prototype._lookUp = function (t) {
      var i;
      return i = function (t, e) {
        if (t === this.expectedQueryCBId) return e && e.length > 0 ? this.renderView(this.constructor.arrayToDefaultHash(e)) : this.view.hide();
      }, this.expectedQueryCBId = this._generateQueryCBId(), this.model.query(t.text, e.proxy(i, this, this.expectedQueryCBId));
    }, t;
  }(), h = function (t) {
    function i() {
      return i.__super__.constructor.apply(this, arguments);
    }

    return p(i, r), i.prototype.catchQuery = function () {
      var t, e, i, n, r, o, s;
      if (e = this.$inputor.val(), t = this.$inputor.caret("pos", {
        iframe: this.app.iframe
      }), s = e.slice(0, t), !((n = "string" == typeof (r = this.callbacks("matcher").call(this, this.at, s, this.getOpt("startWithSpace")))) && r.length < this.getOpt("minLen", 0))) return n && r.length <= this.getOpt("maxLen", 20) ? (i = (o = t - r.length) + r.length, this.pos = o, r = {
        text: r,
        headPos: o,
        endPos: i
      }, this.trigger("matched", [this.at, r.text])) : (r = null, this.view.hide()), this.query = r;
    }, i.prototype.rect = function () {
      var t, i, n;
      if (t = this.$inputor.caret("offset", this.pos - 1, {
        iframe: this.app.iframe
      })) return this.app.iframe && !this.app.iframeAsRoot && (i = e(this.app.iframe).offset(), t.left += i.left, t.top += i.top), n = this.app.document.selection ? 0 : 2, {
        left: t.left,
        top: t.top,
        bottom: t.top + t.height + n
      };
    }, i.prototype.insert = function (t, e) {
      var i, n, r, o, s;
      return s = "" + (r = (n = (i = this.$inputor).val()).slice(0, Math.max(this.query.headPos - this.at.length, 0))) + (t += o = "" === (o = this.getOpt("suffix")) ? o : o || " ") + n.slice(this.query.endPos || 0), i.val(s), i.caret("pos", r.length + t.length, {
        iframe: this.app.iframe
      }), i.is(":focus") || i.focus(), i.change();
    }, i;
  }(), s = function (t) {
    function i() {
      return i.__super__.constructor.apply(this, arguments);
    }

    return p(i, r), i.prototype._getRange = function () {
      var t;
      if ((t = this.app.window.getSelection()).rangeCount > 0) return t.getRangeAt(0);
    }, i.prototype._setRange = function (t, i, n) {
      if (null == n && (n = this._getRange()), n) return i = e(i)[0], "after" === t ? (n.setEndAfter(i), n.setStartAfter(i)) : (n.setEndBefore(i), n.setStartBefore(i)), n.collapse(!1), this._clearRange(n);
    }, i.prototype._clearRange = function (t) {
      var e;
      if (null == t && (t = this._getRange()), e = this.app.window.getSelection(), null == this.ctrl_a_pressed) return e.removeAllRanges(), e.addRange(t);
    }, i.prototype._movingEvent = function (t) {
      var e;
      return "click" === t.type || (e = t.which) === a.RIGHT || e === a.LEFT || e === a.UP || e === a.DOWN;
    }, i.prototype._unwrap = function (t) {
      var i;
      return (i = (t = e(t).unwrap().get(0)).nextSibling) && i.nodeValue && (t.nodeValue += i.nodeValue, e(i).remove()), t;
    }, i.prototype.catchQuery = function (t) {
      var i, n, r, o, s, l, h, u, c, p, f, d;

      if ((d = this._getRange()) && d.collapsed) {
        if (t.which === a.ENTER) return (n = e(d.startContainer).closest(".atwho-query")).contents().unwrap(), n.is(":empty") && n.remove(), (n = e(".atwho-query", this.app.document)).text(n.text()).contents().last().unwrap(), void this._clearRange();

        if (/firefox/i.test(navigator.userAgent)) {
          if (e(d.startContainer).is(this.$inputor)) return void this._clearRange();
          t.which === a.BACKSPACE && d.startContainer.nodeType === document.ELEMENT_NODE && (c = d.startOffset - 1) >= 0 ? ((r = d.cloneRange()).setStart(d.startContainer, c), e(r.cloneContents()).contents().last().is(".atwho-inserted") && (s = e(d.startContainer).contents().get(c), this._setRange("after", e(s).contents().last()))) : t.which === a.LEFT && d.startContainer.nodeType === document.TEXT_NODE && (i = e(d.startContainer.previousSibling)).is(".atwho-inserted") && 0 === d.startOffset && this._setRange("after", i.contents().last());
        }

        if (e(d.startContainer).closest(".atwho-inserted").addClass("atwho-query").siblings().removeClass("atwho-query"), (n = e(".atwho-query", this.app.document)).length > 0 && n.is(":empty") && 0 === n.text().length && n.remove(), this._movingEvent(t) || n.removeClass("atwho-inserted"), n.length > 0) switch (t.which) {
          case a.LEFT:
            return this._setRange("before", n.get(0), d), void n.removeClass("atwho-query");

          case a.RIGHT:
            return this._setRange("after", n.get(0).nextSibling, d), void n.removeClass("atwho-query");
        }
        if (n.length > 0 && (f = n.attr("data-atwho-at-query")) && (n.empty().html(f).attr("data-atwho-at-query", null), this._setRange("after", n.get(0), d)), (r = d.cloneRange()).setStart(d.startContainer, 0), l = "string" == typeof (u = this.callbacks("matcher").call(this, this.at, r.toString(), this.getOpt("startWithSpace"))), 0 === n.length && l && (o = d.startOffset - this.at.length - u.length) >= 0 && (d.setStart(d.startContainer, o), n = e("<span/>", this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass("atwho-query"), d.surroundContents(n.get(0)), h = n.contents().last().get(0), /firefox/i.test(navigator.userAgent) ? (d.setStart(h, h.length), d.setEnd(h, h.length), this._clearRange(d)) : this._setRange("after", h, d)), !(l && u.length < this.getOpt("minLen", 0))) return l && u.length <= this.getOpt("maxLen", 20) ? (p = {
          text: u,
          el: n
        }, this.trigger("matched", [this.at, p.text]), this.query = p) : (this.view.hide(), this.query = {
          el: n
        }, n.text().indexOf(this.at) >= 0 && (this._movingEvent(t) && n.hasClass("atwho-inserted") ? n.removeClass("atwho-query") : !1 !== this.callbacks("afterMatchFailed").call(this, this.at, n) && this._setRange("after", this._unwrap(n.text(n.text()).contents().first()))), null);
      }
    }, i.prototype.rect = function () {
      var t, i;
      return i = this.query.el.offset(), this.app.iframe && !this.app.iframeAsRoot && (t = e(this.app.iframe).offset(), i.left += t.left - this.$inputor.scrollLeft(), i.top += t.top - this.$inputor.scrollTop()), i.bottom = i.top + this.query.el.height(), i;
    }, i.prototype.insert = function (t, e) {
      var i, n, r, o;
      return r = "" === (r = this.getOpt("suffix")) ? r : r || " ", i = e.data("item-data"), this.query.el.removeClass("atwho-query").addClass("atwho-inserted").html(t).attr("data-atwho-at-query", "" + i["atwho-at"] + this.query.text), (n = this._getRange()) && (n.setEndAfter(this.query.el[0]), n.collapse(!1), n.insertNode(o = this.app.document.createTextNode("⁠" + r)), this._setRange("after", o, n)), this.$inputor.is(":focus") || this.$inputor.focus(), this.$inputor.change();
    }, i;
  }(), l = function () {
    function t(t) {
      this.context = t, this.at = this.context.at, this.storage = this.context.$inputor;
    }

    return t.prototype.destroy = function () {
      return this.storage.data(this.at, null);
    }, t.prototype.saved = function () {
      return this.fetch() > 0;
    }, t.prototype.query = function (t, e) {
      var i, n, r;
      return n = this.fetch(), r = this.context.getOpt("searchKey"), n = this.context.callbacks("filter").call(this.context, t, n, r) || [], i = this.context.callbacks("remoteFilter"), n.length > 0 || !i && 0 === n.length ? e(n) : i.call(this.context, t, e);
    }, t.prototype.fetch = function () {
      return this.storage.data(this.at) || [];
    }, t.prototype.save = function (t) {
      return this.storage.data(this.at, this.context.callbacks("beforeSave").call(this.context, t || []));
    }, t.prototype.load = function (t) {
      if (!this.saved() && t) return this._load(t);
    }, t.prototype.reload = function (t) {
      return this._load(t);
    }, t.prototype._load = function (t) {
      return "string" == typeof t ? e.ajax(t, {
        dataType: "json"
      }).done((i = this, function (t) {
        return i.save(t);
      })) : this.save(t);
      var i;
    }, t;
  }(), u = function () {
    function t(t) {
      this.context = t, this.$el = e("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"), this.timeoutID = null, this.context.$el.append(this.$el), this.bindEvent();
    }

    return t.prototype.init = function () {
      var t;
      return t = this.context.getOpt("alias") || this.context.at.charCodeAt(0), this.$el.attr({
        id: "at-view-" + t
      });
    }, t.prototype.destroy = function () {
      return this.$el.remove();
    }, t.prototype.bindEvent = function () {
      var t, i;
      return (t = this.$el.find("ul")).on("mouseenter.atwho-view", "li", function (i) {
        return t.find(".cur").removeClass("cur"), e(i.currentTarget).addClass("cur");
      }).on("click.atwho-view", "li", (i = this, function (n) {
        return t.find(".cur").removeClass("cur"), e(n.currentTarget).addClass("cur"), i.choose(n), n.preventDefault();
      }));
    }, t.prototype.visible = function () {
      return this.$el.is(":visible");
    }, t.prototype.highlighted = function () {
      return this.$el.find(".cur").length > 0;
    }, t.prototype.choose = function (t) {
      var e, i;
      if ((e = this.$el.find(".cur")).length && (i = this.context.insertContentFor(e), this.context._stopDelayedCall(), this.context.insert(this.context.callbacks("beforeInsert").call(this.context, i, e), e), this.context.trigger("inserted", [e, t]), this.hide(t)), this.context.getOpt("hideWithoutSuffix")) return this.stopShowing = !0;
    }, t.prototype.reposition = function (t) {
      var i, n, r, o;
      return i = this.context.app.iframeAsRoot ? this.context.app.window : window, t.bottom + this.$el.height() - e(i).scrollTop() > e(i).height() && (t.bottom = t.top - this.$el.height()), t.left > (r = e(i).width() - this.$el.width() - 5) && (t.left = r), n = {
        left: t.left,
        top: t.bottom
      }, null != (o = this.context.callbacks("beforeReposition")) && o.call(this.context, n), this.$el.offset(n), this.context.trigger("reposition", [n]);
    }, t.prototype.next = function () {
      var t, e;
      return (e = (t = this.$el.find(".cur").removeClass("cur")).next()).is("label") && (e = t.next().next()), e.length || (e = this.$el.find("li:first")), e.addClass("cur"), this.scrollTop(Math.max(0, t.innerHeight() * (e.index() + 2) - this.$el.height()));
    }, t.prototype.prev = function () {
      var t, e;
      return (e = (t = this.$el.find(".cur").removeClass("cur")).prev()).is("label") && (e = t.prev().prev()), e.length || (e = this.$el.find("li:last")), e.addClass("cur"), this.scrollTop(Math.max(0, t.innerHeight() * (e.index() + 2) - this.$el.height()));
    }, t.prototype.scrollTop = function (t) {
      var e;
      return (e = this.context.getOpt("scrollDuration")) ? this.$el.animate({
        scrollTop: t
      }, e) : this.$el.scrollTop(t);
    }, t.prototype.show = function () {
      var t;
      if (!this.stopShowing) return this.visible() || (this.$el.show(), this.$el.scrollTop(0), this.context.trigger("shown")), (t = this.context.rect()) ? this.reposition(t) : void 0;
      this.stopShowing = !1;
    }, t.prototype.hide = function (t, e) {
      var i, n;
      if (this.visible()) return isNaN(e) ? (this.$el.hide(), this.context.trigger("hidden", [t])) : (n = this, i = function () {
        return n.hide();
      }, clearTimeout(this.timeoutID), this.timeoutID = setTimeout(i, e));
    }, t.prototype.render = function (t) {
      var i, n, r, o, s, a, l;

      if (e.isArray(t) && t.length > 0) {
        for (this.$el.find("ul").empty(), n = this.$el.find("ul"), l = this.context.getOpt("displayTpl"), r = 0, s = t.length; r < s; r++) if (o = t[r], o = e.extend({}, o, {
          "atwho-at": this.context.at
        }), a = this.context.callbacks("tplEval").call(this.context, l, o, "onDisplay"), (i = e(this.context.callbacks("highlighter").call(this.context, a, this.context.query.text))).data("item-data", o), this.$el.find("#playlist" + o.playlist_id).length) i.insertAfter(this.$el.find("#playlist" + o.playlist_id));else {
          var h = e(`<label id=playlist${o.playlist_id}>${o.playlist_name}</label>`);
          n.append(h), i.insertAfter(this.$el.find("#playlist" + o.playlist_id));
        }

        return this.show(), this.context.getOpt("highlightFirst") ? n.find("li:first").addClass("cur") : void 0;
      }

      this.hide();
    }, t;
  }(), a = {
    DOWN: 40,
    UP: 38,
    ESC: 27,
    TAB: 9,
    ENTER: 13,
    CTRL: 17,
    A: 65,
    P: 80,
    N: 78,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    BACKSPACE: 8,
    SPACE: 32
  }, o = {
    beforeSave: function (t) {
      return r.arrayToDefaultHash(t);
    },
    matcher: function (t, e, i, n) {
      var r, o, s;
      return t = t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), i && (t = "(?:^|\\s)" + t), r = decodeURI("%C3%80"), o = decodeURI("%C3%BF"), (s = new RegExp(t + "([A-Za-z" + r + "-" + o + "0-9_" + (n ? " " : "") + "'.+-]*)$|" + t + "([^\\x00-\\xff]*)$", "gi").exec(e)) ? s[2] || s[1] : null;
    },
    filter: function (t, e, i) {
      var n, r, o, s;

      for (n = [], r = 0, s = e.length; r < s; r++) o = e[r], ~new String(o[i]).toLowerCase().indexOf(t.toLowerCase()) && n.push(o);

      return n;
    },
    remoteFilter: null,
    sorter: function (t, e, i) {
      var n, r, o, s;
      if (!t) return e;

      for (n = [], r = 0, s = e.length; r < s; r++) (o = e[r]).atwho_order = new String(o[i]).toLowerCase().indexOf(t.toLowerCase()), o.atwho_order > -1 && n.push(o);

      return n.sort(function (t, e) {
        return t.atwho_order - e.atwho_order;
      });
    },
    tplEval: function (t, e) {
      var i;
      i = t;

      try {
        return "string" != typeof t && (i = t(e)), i.replace(/\$\{([^\}]*)\}/g, function (t, i, n) {
          return e[i];
        });
      } catch (t) {
        return t, "";
      }
    },
    highlighter: function (t, e) {
      var i;
      return e ? (i = new RegExp(">\\s*(\\w*?)(" + e.replace("+", "\\+") + ")(\\w*)\\s*<", "ig"), t.replace(i, function (t, e, i, n) {
        return "> " + e + "<strong>" + i + "</strong>" + n + " <";
      })) : t;
    },
    beforeInsert: function (t, e) {
      return t;
    },
    beforeReposition: function (t) {
      return t;
    },
    afterMatchFailed: function (t, e) {}
  }, i = {
    load: function (t, e) {
      var i;
      if (i = this.controller(t)) return i.model.load(e);
    },
    isSelecting: function () {
      var t;
      return !!(null != (t = this.controller()) ? t.view.visible() : void 0);
    },
    hide: function () {
      var t;
      return null != (t = this.controller()) ? t.view.hide() : void 0;
    },
    reposition: function () {
      var t;
      if (t = this.controller()) return t.view.reposition(t.rect());
    },
    setIframe: function (t, e) {
      return this.setupRootElement(t, e), null;
    },
    run: function () {
      return this.dispatch();
    },
    destroy: function () {
      return this.shutdown(), this.$inputor.data("atwho", null);
    }
  }, e.fn.atwho = function (t) {
    var r, o;
    return r = arguments, o = null, this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function () {
      var s, a;
      return (a = (s = e(this)).data("atwho")) || s.data("atwho", a = new n(this)), "object" != typeof t && t ? i[t] && a ? o = i[t].apply(a, Array.prototype.slice.call(r, 1)) : e.error("Method " + t + " does not exist on jQuery.atwho") : a.reg(t.at, t);
    }), null != o ? o : this;
  }, e.fn.atwho.default = {
    at: void 0,
    alias: void 0,
    data: null,
    displayTpl: "<li>${name}</li>",
    insertTpl: "${atwho-at}${name}",
    callbacks: o,
    searchKey: "name",
    suffix: void 0,
    hideWithoutSuffix: !1,
    startWithSpace: !0,
    highlightFirst: !0,
    limit: 5,
    maxLen: 20,
    minLen: 0,
    displayTimeout: 300,
    delay: null,
    spaceSelectsMatch: !1,
    tabSelectsMatch: !0,
    editableAtwhoQueryAttrs: {},
    scrollDuration: 150,
    suspendOnComposing: !0,
    lookUpOnClick: !0
  }, e.fn.atwho.debug = !1;
});

/***/ }),

/***/ "./sharedemos/static/libs/jquery-nicescroll/jquery.nicescroll.min.js":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/libs/jquery-nicescroll/jquery.nicescroll.min.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* jquery.nicescroll 3.6.0 InuYaksa*2014 MIT http://nicescroll.areaaperta.com */
(function (f) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(function (f) {
  var y = !1,
      D = !1,
      N = 0,
      O = 2E3,
      x = 0,
      H = ["webkit", "ms", "moz", "o"],
      s = window.requestAnimationFrame || !1,
      t = window.cancelAnimationFrame || !1;
  if (!s) for (var P in H) {
    var E = H[P];
    s || (s = window[E + "RequestAnimationFrame"]);
    t || (t = window[E + "CancelAnimationFrame"] || window[E + "CancelRequestAnimationFrame"]);
  }

  var v = window.MutationObserver || window.WebKitMutationObserver || !1,
      I = {
    zindex: "auto",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorcolor: "#424242",
    cursorwidth: "5px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "5px",
    scrollspeed: 60,
    mousescrollstep: 24,
    touchbehavior: !1,
    hwacceleration: !0,
    usetransition: !0,
    boxzoom: !1,
    dblclickzoom: !0,
    gesturezoom: !0,
    grabcursorenabled: !0,
    autohidemode: !0,
    background: "",
    iframeautoresize: !0,
    cursorminheight: 32,
    preservenativescrolling: !0,
    railoffset: !1,
    railhoffset: !1,
    bouncescroll: !0,
    spacebarenabled: !0,
    railpadding: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0
    },
    disableoutline: !0,
    horizrailenabled: !0,
    railalign: "right",
    railvalign: "bottom",
    enabletranslate3d: !0,
    enablemousewheel: !0,
    enablekeyboard: !0,
    smoothscroll: !0,
    sensitiverail: !0,
    enablemouselockapi: !0,
    cursorfixedheight: !1,
    directionlockdeadzone: 6,
    hidecursordelay: 400,
    nativeparentscrolling: !0,
    enablescrollonselection: !0,
    overflowx: !0,
    overflowy: !0,
    cursordragspeed: .3,
    rtlmode: "auto",
    cursordragontouch: !1,
    oneaxismousemode: "auto",
    scriptpath: function () {
      var f = document.getElementsByTagName("script"),
          f = f[f.length - 1].src.split("?")[0];
      return 0 < f.split("/").length ? f.split("/").slice(0, -1).join("/") + "/" : "";
    }(),
    preventmultitouchscrolling: !0
  },
      F = !1,
      Q = function () {
    if (F) return F;
    var f = document.createElement("DIV"),
        c = f.style,
        h = navigator.userAgent,
        m = navigator.platform,
        d = {
      haspointerlock: "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document
    };
    d.isopera = "opera" in window;
    d.isopera12 = d.isopera && "getUserMedia" in navigator;
    d.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini);
    d.isie = "all" in document && "attachEvent" in f && !d.isopera;
    d.isieold = d.isie && !("msInterpolationMode" in c);
    d.isie7 = d.isie && !d.isieold && (!("documentMode" in document) || 7 == document.documentMode);
    d.isie8 = d.isie && "documentMode" in document && 8 == document.documentMode;
    d.isie9 = d.isie && "performance" in window && 9 <= document.documentMode;
    d.isie10 = d.isie && "performance" in window && 10 == document.documentMode;
    d.isie11 = "msRequestFullscreen" in f && 11 <= document.documentMode;
    d.isie9mobile = /iemobile.9/i.test(h);
    d.isie9mobile && (d.isie9 = !1);
    d.isie7mobile = !d.isie9mobile && d.isie7 && /iemobile/i.test(h);
    d.ismozilla = "MozAppearance" in c;
    d.iswebkit = "WebkitAppearance" in c;
    d.ischrome = "chrome" in window;
    d.ischrome22 = d.ischrome && d.haspointerlock;
    d.ischrome26 = d.ischrome && "transition" in c;
    d.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window;
    d.hasmstouch = window.MSPointerEvent || !1;
    d.hasw3ctouch = window.PointerEvent || !1;
    d.ismac = /^mac$/i.test(m);
    d.isios = d.cantouch && /iphone|ipad|ipod/i.test(m);
    d.isios4 = d.isios && !("seal" in Object);
    d.isios7 = d.isios && "webkitHidden" in document;
    d.isandroid = /android/i.test(h);
    d.haseventlistener = "addEventListener" in f;
    d.trstyle = !1;
    d.hastransform = !1;
    d.hastranslate3d = !1;
    d.transitionstyle = !1;
    d.hastransition = !1;
    d.transitionend = !1;
    m = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];

    for (h = 0; h < m.length; h++) if ("undefined" != typeof c[m[h]]) {
      d.trstyle = m[h];
      break;
    }

    d.hastransform = !!d.trstyle;
    d.hastransform && (c[d.trstyle] = "translate3d(1px,2px,3px)", d.hastranslate3d = /translate3d/.test(c[d.trstyle]));
    d.transitionstyle = !1;
    d.prefixstyle = "";
    d.transitionend = !1;

    for (var m = "transition webkitTransition msTransition MozTransition OTransition OTransition KhtmlTransition".split(" "), n = " -webkit- -ms- -moz- -o- -o -khtml-".split(" "), p = "transitionend webkitTransitionEnd msTransitionEnd transitionend otransitionend oTransitionEnd KhtmlTransitionEnd".split(" "), h = 0; h < m.length; h++) if (m[h] in c) {
      d.transitionstyle = m[h];
      d.prefixstyle = n[h];
      d.transitionend = p[h];
      break;
    }

    d.ischrome26 && (d.prefixstyle = n[1]);
    d.hastransition = d.transitionstyle;

    a: {
      h = ["-webkit-grab", "-moz-grab", "grab"];
      if (d.ischrome && !d.ischrome22 || d.isie) h = [];

      for (m = 0; m < h.length; m++) if (n = h[m], c.cursor = n, c.cursor == n) {
        c = n;
        break a;
      }

      c = "url(//mail.google.com/mail/images/2/openhand.cur),n-resize";
    }

    d.cursorgrabvalue = c;
    d.hasmousecapture = "setCapture" in f;
    d.hasMutationObserver = !1 !== v;
    return F = d;
  },
      R = function (k, c) {
    function h() {
      var b = a.doc.css(e.trstyle);
      return b && "matrix" == b.substr(0, 6) ? b.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1;
    }

    function m() {
      var b = a.win;
      if ("zIndex" in b) return b.zIndex();

      for (; 0 < b.length && 9 != b[0].nodeType;) {
        var g = b.css("zIndex");
        if (!isNaN(g) && 0 != g) return parseInt(g);
        b = b.parent();
      }

      return !1;
    }

    function d(b, g, q) {
      g = b.css(g);
      b = parseFloat(g);
      return isNaN(b) ? (b = w[g] || 0, q = 3 == b ? q ? a.win.outerHeight() - a.win.innerHeight() : a.win.outerWidth() - a.win.innerWidth() : 1, a.isie8 && b && (b += 1), q ? b : 0) : b;
    }

    function n(b, g, q, c) {
      a._bind(b, g, function (a) {
        a = a ? a : window.event;
        var c = {
          original: a,
          target: a.target || a.srcElement,
          type: "wheel",
          deltaMode: "MozMousePixelScroll" == a.type ? 0 : 1,
          deltaX: 0,
          deltaZ: 0,
          preventDefault: function () {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            return !1;
          },
          stopImmediatePropagation: function () {
            a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.cancelBubble = !0;
          }
        };
        "mousewheel" == g ? (c.deltaY = -.025 * a.wheelDelta, a.wheelDeltaX && (c.deltaX = -.025 * a.wheelDeltaX)) : c.deltaY = a.detail;
        return q.call(b, c);
      }, c);
    }

    function p(b, g, c) {
      var d, e;
      0 == b.deltaMode ? (d = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaX), e = -Math.floor(a.opt.mousescrollstep / 54 * b.deltaY)) : 1 == b.deltaMode && (d = -Math.floor(b.deltaX * a.opt.mousescrollstep), e = -Math.floor(b.deltaY * a.opt.mousescrollstep));
      g && a.opt.oneaxismousemode && 0 == d && e && (d = e, e = 0, c && (0 > d ? a.getScrollLeft() >= a.page.maxw : 0 >= a.getScrollLeft()) && (e = d, d = 0));
      d && (a.scrollmom && a.scrollmom.stop(), a.lastdeltax += d, a.debounced("mousewheelx", function () {
        var b = a.lastdeltax;
        a.lastdeltax = 0;
        a.rail.drag || a.doScrollLeftBy(b);
      }, 15));

      if (e) {
        if (a.opt.nativeparentscrolling && c && !a.ispage && !a.zoomactive) if (0 > e) {
          if (a.getScrollTop() >= a.page.maxh) return !0;
        } else if (0 >= a.getScrollTop()) return !0;
        a.scrollmom && a.scrollmom.stop();
        a.lastdeltay += e;
        a.debounced("mousewheely", function () {
          var b = a.lastdeltay;
          a.lastdeltay = 0;
          a.rail.drag || a.doScrollBy(b);
        }, 15);
      }

      b.stopImmediatePropagation();
      return b.preventDefault();
    }

    var a = this;
    this.version = "3.6.0";
    this.name = "nicescroll";
    this.me = c;
    this.opt = {
      doc: f("body"),
      win: !1
    };
    f.extend(this.opt, I);
    this.opt.snapbackspeed = 80;
    if (k) for (var G in a.opt) "undefined" != typeof k[G] && (a.opt[G] = k[G]);
    this.iddoc = (this.doc = a.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
    this.ispage = /^BODY|HTML/.test(a.opt.win ? a.opt.win[0].nodeName : this.doc[0].nodeName);
    this.haswrapper = !1 !== a.opt.win;
    this.win = a.opt.win || (this.ispage ? f(window) : this.doc);
    this.docscroll = this.ispage && !this.haswrapper ? f(window) : this.win;
    this.body = f("body");
    this.iframe = this.isfixed = this.viewport = !1;
    this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
    this.istextarea = "TEXTAREA" == this.win[0].nodeName;
    this.forcescreen = !1;
    this.canshowonmouseevent = "scroll" != a.opt.autohidemode;
    this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = !1;
    this.scroll = {
      x: 0,
      y: 0
    };
    this.scrollratio = {
      x: 0,
      y: 0
    };
    this.cursorheight = 20;
    this.scrollvaluemax = 0;
    this.isrtlmode = "auto" == this.opt.rtlmode ? "rtl" == (this.win[0] == window ? this.body : this.win).css("direction") : !0 === this.opt.rtlmode;
    this.observerbody = this.observerremover = this.observer = this.scrollmom = this.scrollrunning = !1;

    do this.id = "ascrail" + O++; while (document.getElementById(this.id));

    this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail = !1;
    this.visibility = !0;
    this.hidden = this.locked = this.railslocked = !1;
    this.cursoractive = !0;
    this.wheelprevented = !1;
    this.overflowx = a.opt.overflowx;
    this.overflowy = a.opt.overflowy;
    this.nativescrollingarea = !1;
    this.checkarea = 0;
    this.events = [];
    this.saved = {};
    this.delaylist = {};
    this.synclist = {};
    this.lastdeltay = this.lastdeltax = 0;
    this.detected = Q();
    var e = f.extend({}, this.detected);
    this.ishwscroll = (this.canhwscroll = e.hastransform && a.opt.hwacceleration) && a.haswrapper;
    this.hasreversehr = this.isrtlmode && !e.iswebkit;
    this.istouchcapable = !1;
    !e.cantouch || e.isios || e.isandroid || !e.iswebkit && !e.ismozilla || (this.istouchcapable = !0, e.cantouch = !1);
    a.opt.enablemouselockapi || (e.hasmousecapture = !1, e.haspointerlock = !1);

    this.debounced = function (b, g, c) {
      var d = a.delaylist[b];
      a.delaylist[b] = g;
      d || setTimeout(function () {
        var g = a.delaylist[b];
        a.delaylist[b] = !1;
        g.call(a);
      }, c);
    };

    var r = !1;

    this.synched = function (b, g) {
      a.synclist[b] = g;

      (function () {
        r || (s(function () {
          r = !1;

          for (var b in a.synclist) {
            var g = a.synclist[b];
            g && g.call(a);
            a.synclist[b] = !1;
          }
        }), r = !0);
      })();

      return b;
    };

    this.unsynched = function (b) {
      a.synclist[b] && (a.synclist[b] = !1);
    };

    this.css = function (b, g) {
      for (var c in g) a.saved.css.push([b, c, b.css(c)]), b.css(c, g[c]);
    };

    this.scrollTop = function (b) {
      return "undefined" == typeof b ? a.getScrollTop() : a.setScrollTop(b);
    };

    this.scrollLeft = function (b) {
      return "undefined" == typeof b ? a.getScrollLeft() : a.setScrollLeft(b);
    };

    var A = function (a, g, c, d, e, f, h) {
      this.st = a;
      this.ed = g;
      this.spd = c;
      this.p1 = d || 0;
      this.p2 = e || 1;
      this.p3 = f || 0;
      this.p4 = h || 1;
      this.ts = new Date().getTime();
      this.df = this.ed - this.st;
    };

    A.prototype = {
      B2: function (a) {
        return 3 * a * a * (1 - a);
      },
      B3: function (a) {
        return 3 * a * (1 - a) * (1 - a);
      },
      B4: function (a) {
        return (1 - a) * (1 - a) * (1 - a);
      },
      getNow: function () {
        var a = 1 - (new Date().getTime() - this.ts) / this.spd,
            g = this.B2(a) + this.B3(a) + this.B4(a);
        return 0 > a ? this.ed : this.st + Math.round(this.df * g);
      },
      update: function (a, g) {
        this.st = this.getNow();
        this.ed = a;
        this.spd = g;
        this.ts = new Date().getTime();
        this.df = this.ed - this.st;
        return this;
      }
    };

    if (this.ishwscroll) {
      this.doc.translate = {
        x: 0,
        y: 0,
        tx: "0px",
        ty: "0px"
      };
      e.hastranslate3d && e.isios && this.doc.css("-webkit-backface-visibility", "hidden");

      this.getScrollTop = function (b) {
        if (!b) {
          if (b = h()) return 16 == b.length ? -b[13] : -b[5];
          if (a.timerscroll && a.timerscroll.bz) return a.timerscroll.bz.getNow();
        }

        return a.doc.translate.y;
      };

      this.getScrollLeft = function (b) {
        if (!b) {
          if (b = h()) return 16 == b.length ? -b[12] : -b[4];
          if (a.timerscroll && a.timerscroll.bh) return a.timerscroll.bh.getNow();
        }

        return a.doc.translate.x;
      };

      this.notifyScrollEvent = function (a) {
        var g = document.createEvent("UIEvents");
        g.initUIEvent("scroll", !1, !0, window, 1);
        g.niceevent = !0;
        a.dispatchEvent(g);
      };

      var K = this.isrtlmode ? 1 : -1;
      e.hastranslate3d && a.opt.enabletranslate3d ? (this.setScrollTop = function (b, g) {
        a.doc.translate.y = b;
        a.doc.translate.ty = -1 * b + "px";
        a.doc.css(e.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
        g || a.notifyScrollEvent(a.win[0]);
      }, this.setScrollLeft = function (b, g) {
        a.doc.translate.x = b;
        a.doc.translate.tx = b * K + "px";
        a.doc.css(e.trstyle, "translate3d(" + a.doc.translate.tx + "," + a.doc.translate.ty + ",0px)");
        g || a.notifyScrollEvent(a.win[0]);
      }) : (this.setScrollTop = function (b, g) {
        a.doc.translate.y = b;
        a.doc.translate.ty = -1 * b + "px";
        a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
        g || a.notifyScrollEvent(a.win[0]);
      }, this.setScrollLeft = function (b, g) {
        a.doc.translate.x = b;
        a.doc.translate.tx = b * K + "px";
        a.doc.css(e.trstyle, "translate(" + a.doc.translate.tx + "," + a.doc.translate.ty + ")");
        g || a.notifyScrollEvent(a.win[0]);
      });
    } else this.getScrollTop = function () {
      return a.docscroll.scrollTop();
    }, this.setScrollTop = function (b) {
      return a.docscroll.scrollTop(b);
    }, this.getScrollLeft = function () {
      return a.detected.ismozilla && a.isrtlmode ? Math.abs(a.docscroll.scrollLeft()) : a.docscroll.scrollLeft();
    }, this.setScrollLeft = function (b) {
      return a.docscroll.scrollLeft(a.detected.ismozilla && a.isrtlmode ? -b : b);
    };

    this.getTarget = function (a) {
      return a ? a.target ? a.target : a.srcElement ? a.srcElement : !1 : !1;
    };

    this.hasParent = function (a, g) {
      if (!a) return !1;

      for (var c = a.target || a.srcElement || a || !1; c && c.id != g;) c = c.parentNode || !1;

      return !1 !== c;
    };

    var w = {
      thin: 1,
      medium: 3,
      thick: 5
    };

    this.getDocumentScrollOffset = function () {
      return {
        top: window.pageYOffset || document.documentElement.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft
      };
    };

    this.getOffset = function () {
      if (a.isfixed) {
        var b = a.win.offset(),
            g = a.getDocumentScrollOffset();
        b.top -= g.top;
        b.left -= g.left;
        return b;
      }

      b = a.win.offset();
      if (!a.viewport) return b;
      g = a.viewport.offset();
      return {
        top: b.top - g.top,
        left: b.left - g.left
      };
    };

    this.updateScrollBar = function (b) {
      if (a.ishwscroll) a.rail.css({
        height: a.win.innerHeight() - (a.opt.railpadding.top + a.opt.railpadding.bottom)
      }), a.railh && a.railh.css({
        width: a.win.innerWidth() - (a.opt.railpadding.left + a.opt.railpadding.right)
      });else {
        var g = a.getOffset(),
            c = g.top,
            e = g.left - (a.opt.railpadding.left + a.opt.railpadding.right),
            c = c + d(a.win, "border-top-width", !0),
            e = e + (a.rail.align ? a.win.outerWidth() - d(a.win, "border-right-width") - a.rail.width : d(a.win, "border-left-width")),
            f = a.opt.railoffset;
        f && (f.top && (c += f.top), a.rail.align && f.left && (e += f.left));
        a.railslocked || a.rail.css({
          top: c,
          left: e,
          height: (b ? b.h : a.win.innerHeight()) - (a.opt.railpadding.top + a.opt.railpadding.bottom)
        });
        a.zoom && a.zoom.css({
          top: c + 1,
          left: 1 == a.rail.align ? e - 20 : e + a.rail.width + 4
        });

        if (a.railh && !a.railslocked) {
          c = g.top;
          e = g.left;
          if (f = a.opt.railhoffset) f.top && (c += f.top), f.left && (e += f.left);
          b = a.railh.align ? c + d(a.win, "border-top-width", !0) + a.win.innerHeight() - a.railh.height : c + d(a.win, "border-top-width", !0);
          e += d(a.win, "border-left-width");
          a.railh.css({
            top: b - (a.opt.railpadding.top + a.opt.railpadding.bottom),
            left: e,
            width: a.railh.width
          });
        }
      }
    };

    this.doRailClick = function (b, g, c) {
      var e;
      a.railslocked || (a.cancelEvent(b), g ? (g = c ? a.doScrollLeft : a.doScrollTop, e = c ? (b.pageX - a.railh.offset().left - a.cursorwidth / 2) * a.scrollratio.x : (b.pageY - a.rail.offset().top - a.cursorheight / 2) * a.scrollratio.y, g(e)) : (g = c ? a.doScrollLeftBy : a.doScrollBy, e = c ? a.scroll.x : a.scroll.y, b = c ? b.pageX - a.railh.offset().left : b.pageY - a.rail.offset().top, c = c ? a.view.w : a.view.h, g(e >= b ? c : -c)));
    };

    a.hasanimationframe = s;
    a.hascancelanimationframe = t;
    a.hasanimationframe ? a.hascancelanimationframe || (t = function () {
      a.cancelAnimationFrame = !0;
    }) : (s = function (a) {
      return setTimeout(a, 15 - Math.floor(+new Date() / 1E3) % 16);
    }, t = clearInterval);

    this.init = function () {
      a.saved.css = [];
      if (e.isie7mobile || e.isoperamini) return !0;
      e.hasmstouch && a.css(a.ispage ? f("html") : a.win, {
        "-ms-touch-action": "none"
      });
      a.zindex = "auto";
      a.zindex = a.ispage || "auto" != a.opt.zindex ? a.opt.zindex : m() || "auto";
      !a.ispage && "auto" != a.zindex && a.zindex > x && (x = a.zindex);
      a.isie && 0 == a.zindex && "auto" == a.opt.zindex && (a.zindex = "auto");

      if (!a.ispage || !e.cantouch && !e.isieold && !e.isie9mobile) {
        var b = a.docscroll;
        a.ispage && (b = a.haswrapper ? a.win : a.doc);
        e.isie9mobile || a.css(b, {
          "overflow-y": "hidden"
        });
        a.ispage && e.isie7 && ("BODY" == a.doc[0].nodeName ? a.css(f("html"), {
          "overflow-y": "hidden"
        }) : "HTML" == a.doc[0].nodeName && a.css(f("body"), {
          "overflow-y": "hidden"
        }));
        !e.isios || a.ispage || a.haswrapper || a.css(f("body"), {
          "-webkit-overflow-scrolling": "touch"
        });
        var g = f(document.createElement("div"));
        g.css({
          position: "relative",
          top: 0,
          "float": "right",
          width: a.opt.cursorwidth,
          height: "0px",
          "background-color": a.opt.cursorcolor,
          border: a.opt.cursorborder,
          "background-clip": "padding-box",
          "-webkit-border-radius": a.opt.cursorborderradius,
          "-moz-border-radius": a.opt.cursorborderradius,
          "border-radius": a.opt.cursorborderradius
        });
        g.hborder = parseFloat(g.outerHeight() - g.innerHeight());
        g.addClass("nicescroll-cursors");
        a.cursor = g;
        var c = f(document.createElement("div"));
        c.attr("id", a.id);
        c.addClass("nicescroll-rails nicescroll-rails-vr");
        var d,
            h,
            k = ["left", "right", "top", "bottom"],
            J;

        for (J in k) h = k[J], (d = a.opt.railpadding[h]) ? c.css("padding-" + h, d + "px") : a.opt.railpadding[h] = 0;

        c.append(g);
        c.width = Math.max(parseFloat(a.opt.cursorwidth), g.outerWidth());
        c.css({
          width: c.width + "px",
          zIndex: a.zindex,
          background: a.opt.background,
          cursor: "default"
        });
        c.visibility = !0;
        c.scrollable = !0;
        c.align = "left" == a.opt.railalign ? 0 : 1;
        a.rail = c;
        g = a.rail.drag = !1;
        !a.opt.boxzoom || a.ispage || e.isieold || (g = document.createElement("div"), a.bind(g, "click", a.doZoom), a.bind(g, "mouseenter", function () {
          a.zoom.css("opacity", a.opt.cursoropacitymax);
        }), a.bind(g, "mouseleave", function () {
          a.zoom.css("opacity", a.opt.cursoropacitymin);
        }), a.zoom = f(g), a.zoom.css({
          cursor: "pointer",
          "z-index": a.zindex,
          backgroundImage: "url(" + a.opt.scriptpath + "zoomico.png)",
          height: 18,
          width: 18,
          backgroundPosition: "0px 0px"
        }), a.opt.dblclickzoom && a.bind(a.win, "dblclick", a.doZoom), e.cantouch && a.opt.gesturezoom && (a.ongesturezoom = function (b) {
          1.5 < b.scale && a.doZoomIn(b);
          .8 > b.scale && a.doZoomOut(b);
          return a.cancelEvent(b);
        }, a.bind(a.win, "gestureend", a.ongesturezoom)));
        a.railh = !1;
        var l;
        a.opt.horizrailenabled && (a.css(b, {
          "overflow-x": "hidden"
        }), g = f(document.createElement("div")), g.css({
          position: "absolute",
          top: 0,
          height: a.opt.cursorwidth,
          width: "0px",
          "background-color": a.opt.cursorcolor,
          border: a.opt.cursorborder,
          "background-clip": "padding-box",
          "-webkit-border-radius": a.opt.cursorborderradius,
          "-moz-border-radius": a.opt.cursorborderradius,
          "border-radius": a.opt.cursorborderradius
        }), e.isieold && g.css({
          overflow: "hidden"
        }), g.wborder = parseFloat(g.outerWidth() - g.innerWidth()), g.addClass("nicescroll-cursors"), a.cursorh = g, l = f(document.createElement("div")), l.attr("id", a.id + "-hr"), l.addClass("nicescroll-rails nicescroll-rails-hr"), l.height = Math.max(parseFloat(a.opt.cursorwidth), g.outerHeight()), l.css({
          height: l.height + "px",
          zIndex: a.zindex,
          background: a.opt.background
        }), l.append(g), l.visibility = !0, l.scrollable = !0, l.align = "top" == a.opt.railvalign ? 0 : 1, a.railh = l, a.railh.drag = !1);
        a.ispage ? (c.css({
          position: "fixed",
          top: "0px",
          height: "100%"
        }), c.align ? c.css({
          right: "0px"
        }) : c.css({
          left: "0px"
        }), a.body.append(c), a.railh && (l.css({
          position: "fixed",
          left: "0px",
          width: "100%"
        }), l.align ? l.css({
          bottom: "0px"
        }) : l.css({
          top: "0px"
        }), a.body.append(l))) : (a.ishwscroll ? ("static" == a.win.css("position") && a.css(a.win, {
          position: "relative"
        }), b = "HTML" == a.win[0].nodeName ? a.body : a.win, f(b).scrollTop(0).scrollLeft(0), a.zoom && (a.zoom.css({
          position: "absolute",
          top: 1,
          right: 0,
          "margin-right": c.width + 4
        }), b.append(a.zoom)), c.css({
          position: "absolute",
          top: 0
        }), c.align ? c.css({
          right: 0
        }) : c.css({
          left: 0
        }), b.append(c), l && (l.css({
          position: "absolute",
          left: 0,
          bottom: 0
        }), l.align ? l.css({
          bottom: 0
        }) : l.css({
          top: 0
        }), b.append(l))) : (a.isfixed = "fixed" == a.win.css("position"), b = a.isfixed ? "fixed" : "absolute", a.isfixed || (a.viewport = a.getViewport(a.win[0])), a.viewport && (a.body = a.viewport, 0 == /fixed|absolute/.test(a.viewport.css("position")) && a.css(a.viewport, {
          position: "relative"
        })), c.css({
          position: b
        }), a.zoom && a.zoom.css({
          position: b
        }), a.updateScrollBar(), a.body.append(c), a.zoom && a.body.append(a.zoom), a.railh && (l.css({
          position: b
        }), a.body.append(l))), e.isios && a.css(a.win, {
          "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
          "-webkit-touch-callout": "none"
        }), e.isie && a.opt.disableoutline && a.win.attr("hideFocus", "true"), e.iswebkit && a.opt.disableoutline && a.win.css({
          outline: "none"
        }));
        !1 === a.opt.autohidemode ? (a.autohidedom = !1, a.rail.css({
          opacity: a.opt.cursoropacitymax
        }), a.railh && a.railh.css({
          opacity: a.opt.cursoropacitymax
        })) : !0 === a.opt.autohidemode || "leave" === a.opt.autohidemode ? (a.autohidedom = f().add(a.rail), e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursor)), a.railh && (a.autohidedom = a.autohidedom.add(a.railh)), a.railh && e.isie8 && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "scroll" == a.opt.autohidemode ? (a.autohidedom = f().add(a.rail), a.railh && (a.autohidedom = a.autohidedom.add(a.railh))) : "cursor" == a.opt.autohidemode ? (a.autohidedom = f().add(a.cursor), a.railh && (a.autohidedom = a.autohidedom.add(a.cursorh))) : "hidden" == a.opt.autohidemode && (a.autohidedom = !1, a.hide(), a.railslocked = !1);
        if (e.isie9mobile) a.scrollmom = new L(a), a.onmangotouch = function () {
          var b = a.getScrollTop(),
              c = a.getScrollLeft();
          if (b == a.scrollmom.lastscrolly && c == a.scrollmom.lastscrollx) return !0;
          var g = b - a.mangotouch.sy,
              e = c - a.mangotouch.sx;

          if (0 != Math.round(Math.sqrt(Math.pow(e, 2) + Math.pow(g, 2)))) {
            var d = 0 > g ? -1 : 1,
                f = 0 > e ? -1 : 1,
                q = +new Date();
            a.mangotouch.lazy && clearTimeout(a.mangotouch.lazy);
            80 < q - a.mangotouch.tm || a.mangotouch.dry != d || a.mangotouch.drx != f ? (a.scrollmom.stop(), a.scrollmom.reset(c, b), a.mangotouch.sy = b, a.mangotouch.ly = b, a.mangotouch.sx = c, a.mangotouch.lx = c, a.mangotouch.dry = d, a.mangotouch.drx = f, a.mangotouch.tm = q) : (a.scrollmom.stop(), a.scrollmom.update(a.mangotouch.sx - e, a.mangotouch.sy - g), a.mangotouch.tm = q, g = Math.max(Math.abs(a.mangotouch.ly - b), Math.abs(a.mangotouch.lx - c)), a.mangotouch.ly = b, a.mangotouch.lx = c, 2 < g && (a.mangotouch.lazy = setTimeout(function () {
              a.mangotouch.lazy = !1;
              a.mangotouch.dry = 0;
              a.mangotouch.drx = 0;
              a.mangotouch.tm = 0;
              a.scrollmom.doMomentum(30);
            }, 100)));
          }
        }, c = a.getScrollTop(), l = a.getScrollLeft(), a.mangotouch = {
          sy: c,
          ly: c,
          dry: 0,
          sx: l,
          lx: l,
          drx: 0,
          lazy: !1,
          tm: 0
        }, a.bind(a.docscroll, "scroll", a.onmangotouch);else {
          if (e.cantouch || a.istouchcapable || a.opt.touchbehavior || e.hasmstouch) {
            a.scrollmom = new L(a);

            a.ontouchstart = function (b) {
              if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
              a.hasmoving = !1;

              if (!a.railslocked) {
                var c;
                if (e.hasmstouch) for (c = b.target ? b.target : !1; c;) {
                  var g = f(c).getNiceScroll();
                  if (0 < g.length && g[0].me == a.me) break;
                  if (0 < g.length) return !1;
                  if ("DIV" == c.nodeName && c.id == a.id) break;
                  c = c.parentNode ? c.parentNode : !1;
                }
                a.cancelScroll();
                if ((c = a.getTarget(b)) && /INPUT/i.test(c.nodeName) && /range/i.test(c.type)) return a.stopPropagation(b);
                !("clientX" in b) && "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);
                a.forcescreen && (g = b, b = {
                  original: b.original ? b.original : b
                }, b.clientX = g.screenX, b.clientY = g.screenY);
                a.rail.drag = {
                  x: b.clientX,
                  y: b.clientY,
                  sx: a.scroll.x,
                  sy: a.scroll.y,
                  st: a.getScrollTop(),
                  sl: a.getScrollLeft(),
                  pt: 2,
                  dl: !1
                };
                if (a.ispage || !a.opt.directionlockdeadzone) a.rail.drag.dl = "f";else {
                  var g = f(window).width(),
                      d = f(window).height(),
                      q = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                      h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                      d = Math.max(0, h - d),
                      g = Math.max(0, q - g);
                  a.rail.drag.ck = !a.rail.scrollable && a.railh.scrollable ? 0 < d ? "v" : !1 : a.rail.scrollable && !a.railh.scrollable ? 0 < g ? "h" : !1 : !1;
                  a.rail.drag.ck || (a.rail.drag.dl = "f");
                }
                a.opt.touchbehavior && a.isiframe && e.isie && (g = a.win.position(), a.rail.drag.x += g.left, a.rail.drag.y += g.top);
                a.hasmoving = !1;
                a.lastmouseup = !1;
                a.scrollmom.reset(b.clientX, b.clientY);

                if (!e.cantouch && !this.istouchcapable && !b.pointerType) {
                  if (!c || !/INPUT|SELECT|TEXTAREA/i.test(c.nodeName)) return !a.ispage && e.hasmousecapture && c.setCapture(), a.opt.touchbehavior ? (c.onclick && !c._onclick && (c._onclick = c.onclick, c.onclick = function (b) {
                    if (a.hasmoving) return !1;

                    c._onclick.call(this, b);
                  }), a.cancelEvent(b)) : a.stopPropagation(b);
                  /SUBMIT|CANCEL|BUTTON/i.test(f(c).attr("type")) && (pc = {
                    tg: c,
                    click: !1
                  }, a.preventclick = pc);
                }
              }
            };

            a.ontouchend = function (b) {
              if (!a.rail.drag) return !0;

              if (2 == a.rail.drag.pt) {
                if (b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;
                a.scrollmom.doMomentum();
                a.rail.drag = !1;
                if (a.hasmoving && (a.lastmouseup = !0, a.hideCursor(), e.hasmousecapture && document.releaseCapture(), !e.cantouch)) return a.cancelEvent(b);
              } else if (1 == a.rail.drag.pt) return a.onmouseup(b);
            };

            var n = a.opt.touchbehavior && a.isiframe && !e.hasmousecapture;

            a.ontouchmove = function (b, c) {
              if (!a.rail.drag || b.targetTouches && a.opt.preventmultitouchscrolling && 1 < b.targetTouches.length || b.pointerType && 2 != b.pointerType && "touch" != b.pointerType) return !1;

              if (2 == a.rail.drag.pt) {
                if (e.cantouch && e.isios && "undefined" == typeof b.original) return !0;
                a.hasmoving = !0;
                a.preventclick && !a.preventclick.click && (a.preventclick.click = a.preventclick.tg.onclick || !1, a.preventclick.tg.onclick = a.onpreventclick);
                b = f.extend({
                  original: b
                }, b);
                "changedTouches" in b && (b.clientX = b.changedTouches[0].clientX, b.clientY = b.changedTouches[0].clientY);

                if (a.forcescreen) {
                  var g = b;
                  b = {
                    original: b.original ? b.original : b
                  };
                  b.clientX = g.screenX;
                  b.clientY = g.screenY;
                }

                var d,
                    g = d = 0;
                n && !c && (d = a.win.position(), g = -d.left, d = -d.top);
                var q = b.clientY + d;
                d = q - a.rail.drag.y;
                var h = b.clientX + g,
                    u = h - a.rail.drag.x,
                    k = a.rail.drag.st - d;
                a.ishwscroll && a.opt.bouncescroll ? 0 > k ? k = Math.round(k / 2) : k > a.page.maxh && (k = a.page.maxh + Math.round((k - a.page.maxh) / 2)) : (0 > k && (q = k = 0), k > a.page.maxh && (k = a.page.maxh, q = 0));
                var l;
                a.railh && a.railh.scrollable && (l = a.isrtlmode ? u - a.rail.drag.sl : a.rail.drag.sl - u, a.ishwscroll && a.opt.bouncescroll ? 0 > l ? l = Math.round(l / 2) : l > a.page.maxw && (l = a.page.maxw + Math.round((l - a.page.maxw) / 2)) : (0 > l && (h = l = 0), l > a.page.maxw && (l = a.page.maxw, h = 0)));
                g = !1;
                if (a.rail.drag.dl) g = !0, "v" == a.rail.drag.dl ? l = a.rail.drag.sl : "h" == a.rail.drag.dl && (k = a.rail.drag.st);else {
                  d = Math.abs(d);
                  var u = Math.abs(u),
                      z = a.opt.directionlockdeadzone;

                  if ("v" == a.rail.drag.ck) {
                    if (d > z && u <= .3 * d) return a.rail.drag = !1, !0;
                    u > z && (a.rail.drag.dl = "f", f("body").scrollTop(f("body").scrollTop()));
                  } else if ("h" == a.rail.drag.ck) {
                    if (u > z && d <= .3 * u) return a.rail.drag = !1, !0;
                    d > z && (a.rail.drag.dl = "f", f("body").scrollLeft(f("body").scrollLeft()));
                  }
                }
                a.synched("touchmove", function () {
                  a.rail.drag && 2 == a.rail.drag.pt && (a.prepareTransition && a.prepareTransition(0), a.rail.scrollable && a.setScrollTop(k), a.scrollmom.update(h, q), a.railh && a.railh.scrollable ? (a.setScrollLeft(l), a.showCursor(k, l)) : a.showCursor(k), e.isie10 && document.selection.clear());
                });
                e.ischrome && a.istouchcapable && (g = !1);
                if (g) return a.cancelEvent(b);
              } else if (1 == a.rail.drag.pt) return a.onmousemove(b);
            };
          }

          a.onmousedown = function (b, c) {
            if (!a.rail.drag || 1 == a.rail.drag.pt) {
              if (a.railslocked) return a.cancelEvent(b);
              a.cancelScroll();
              a.rail.drag = {
                x: b.clientX,
                y: b.clientY,
                sx: a.scroll.x,
                sy: a.scroll.y,
                pt: 1,
                hr: !!c
              };
              var g = a.getTarget(b);
              !a.ispage && e.hasmousecapture && g.setCapture();
              a.isiframe && !e.hasmousecapture && (a.saved.csspointerevents = a.doc.css("pointer-events"), a.css(a.doc, {
                "pointer-events": "none"
              }));
              a.hasmoving = !1;
              return a.cancelEvent(b);
            }
          };

          a.onmouseup = function (b) {
            if (a.rail.drag) {
              if (1 != a.rail.drag.pt) return !0;
              e.hasmousecapture && document.releaseCapture();
              a.isiframe && !e.hasmousecapture && a.doc.css("pointer-events", a.saved.csspointerevents);
              a.rail.drag = !1;
              a.hasmoving && a.triggerScrollEnd();
              return a.cancelEvent(b);
            }
          };

          a.onmousemove = function (b) {
            if (a.rail.drag && 1 == a.rail.drag.pt) {
              if (e.ischrome && 0 == b.which) return a.onmouseup(b);
              a.cursorfreezed = !0;
              a.hasmoving = !0;

              if (a.rail.drag.hr) {
                a.scroll.x = a.rail.drag.sx + (b.clientX - a.rail.drag.x);
                0 > a.scroll.x && (a.scroll.x = 0);
                var c = a.scrollvaluemaxw;
                a.scroll.x > c && (a.scroll.x = c);
              } else a.scroll.y = a.rail.drag.sy + (b.clientY - a.rail.drag.y), 0 > a.scroll.y && (a.scroll.y = 0), c = a.scrollvaluemax, a.scroll.y > c && (a.scroll.y = c);

              a.synched("mousemove", function () {
                a.rail.drag && 1 == a.rail.drag.pt && (a.showCursor(), a.rail.drag.hr ? a.hasreversehr ? a.doScrollLeft(a.scrollvaluemaxw - Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollLeft(Math.round(a.scroll.x * a.scrollratio.x), a.opt.cursordragspeed) : a.doScrollTop(Math.round(a.scroll.y * a.scrollratio.y), a.opt.cursordragspeed));
              });
              return a.cancelEvent(b);
            }
          };

          if (e.cantouch || a.opt.touchbehavior) a.onpreventclick = function (b) {
            if (a.preventclick) return a.preventclick.tg.onclick = a.preventclick.click, a.preventclick = !1, a.cancelEvent(b);
          }, a.bind(a.win, "mousedown", a.ontouchstart), a.onclick = e.isios ? !1 : function (b) {
            return a.lastmouseup ? (a.lastmouseup = !1, a.cancelEvent(b)) : !0;
          }, a.opt.grabcursorenabled && e.cursorgrabvalue && (a.css(a.ispage ? a.doc : a.win, {
            cursor: e.cursorgrabvalue
          }), a.css(a.rail, {
            cursor: e.cursorgrabvalue
          }));else {
            var p = function (b) {
              if (a.selectiondrag) {
                if (b) {
                  var c = a.win.outerHeight();
                  b = b.pageY - a.selectiondrag.top;
                  0 < b && b < c && (b = 0);
                  b >= c && (b -= c);
                  a.selectiondrag.df = b;
                }

                0 != a.selectiondrag.df && (a.doScrollBy(2 * -Math.floor(a.selectiondrag.df / 6)), a.debounced("doselectionscroll", function () {
                  p();
                }, 50));
              }
            };

            a.hasTextSelected = "getSelection" in document ? function () {
              return 0 < document.getSelection().rangeCount;
            } : "selection" in document ? function () {
              return "None" != document.selection.type;
            } : function () {
              return !1;
            };

            a.onselectionstart = function (b) {
              a.ispage || (a.selectiondrag = a.win.offset());
            };

            a.onselectionend = function (b) {
              a.selectiondrag = !1;
            };

            a.onselectiondrag = function (b) {
              a.selectiondrag && a.hasTextSelected() && a.debounced("selectionscroll", function () {
                p(b);
              }, 250);
            };
          }
          e.hasw3ctouch ? (a.css(a.rail, {
            "touch-action": "none"
          }), a.css(a.cursor, {
            "touch-action": "none"
          }), a.bind(a.win, "pointerdown", a.ontouchstart), a.bind(document, "pointerup", a.ontouchend), a.bind(document, "pointermove", a.ontouchmove)) : e.hasmstouch ? (a.css(a.rail, {
            "-ms-touch-action": "none"
          }), a.css(a.cursor, {
            "-ms-touch-action": "none"
          }), a.bind(a.win, "MSPointerDown", a.ontouchstart), a.bind(document, "MSPointerUp", a.ontouchend), a.bind(document, "MSPointerMove", a.ontouchmove), a.bind(a.cursor, "MSGestureHold", function (a) {
            a.preventDefault();
          }), a.bind(a.cursor, "contextmenu", function (a) {
            a.preventDefault();
          })) : this.istouchcapable && (a.bind(a.win, "touchstart", a.ontouchstart), a.bind(document, "touchend", a.ontouchend), a.bind(document, "touchcancel", a.ontouchend), a.bind(document, "touchmove", a.ontouchmove));
          if (a.opt.cursordragontouch || !e.cantouch && !a.opt.touchbehavior) a.rail.css({
            cursor: "default"
          }), a.railh && a.railh.css({
            cursor: "default"
          }), a.jqbind(a.rail, "mouseenter", function () {
            if (!a.ispage && !a.win.is(":visible")) return !1;
            a.canshowonmouseevent && a.showCursor();
            a.rail.active = !0;
          }), a.jqbind(a.rail, "mouseleave", function () {
            a.rail.active = !1;
            a.rail.drag || a.hideCursor();
          }), a.opt.sensitiverail && (a.bind(a.rail, "click", function (b) {
            a.doRailClick(b, !1, !1);
          }), a.bind(a.rail, "dblclick", function (b) {
            a.doRailClick(b, !0, !1);
          }), a.bind(a.cursor, "click", function (b) {
            a.cancelEvent(b);
          }), a.bind(a.cursor, "dblclick", function (b) {
            a.cancelEvent(b);
          })), a.railh && (a.jqbind(a.railh, "mouseenter", function () {
            if (!a.ispage && !a.win.is(":visible")) return !1;
            a.canshowonmouseevent && a.showCursor();
            a.rail.active = !0;
          }), a.jqbind(a.railh, "mouseleave", function () {
            a.rail.active = !1;
            a.rail.drag || a.hideCursor();
          }), a.opt.sensitiverail && (a.bind(a.railh, "click", function (b) {
            a.doRailClick(b, !1, !0);
          }), a.bind(a.railh, "dblclick", function (b) {
            a.doRailClick(b, !0, !0);
          }), a.bind(a.cursorh, "click", function (b) {
            a.cancelEvent(b);
          }), a.bind(a.cursorh, "dblclick", function (b) {
            a.cancelEvent(b);
          })));
          e.cantouch || a.opt.touchbehavior ? (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.ontouchend), a.bind(document, "mousemove", a.ontouchmove), a.onclick && a.bind(document, "click", a.onclick), a.opt.cursordragontouch && (a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.cursorh && a.bind(a.cursorh, "mousedown", function (b) {
            a.onmousedown(b, !0);
          }), a.cursorh && a.bind(a.cursorh, "mouseup", a.onmouseup))) : (a.bind(e.hasmousecapture ? a.win : document, "mouseup", a.onmouseup), a.bind(document, "mousemove", a.onmousemove), a.onclick && a.bind(document, "click", a.onclick), a.bind(a.cursor, "mousedown", a.onmousedown), a.bind(a.cursor, "mouseup", a.onmouseup), a.railh && (a.bind(a.cursorh, "mousedown", function (b) {
            a.onmousedown(b, !0);
          }), a.bind(a.cursorh, "mouseup", a.onmouseup)), !a.ispage && a.opt.enablescrollonselection && (a.bind(a.win[0], "mousedown", a.onselectionstart), a.bind(document, "mouseup", a.onselectionend), a.bind(a.cursor, "mouseup", a.onselectionend), a.cursorh && a.bind(a.cursorh, "mouseup", a.onselectionend), a.bind(document, "mousemove", a.onselectiondrag)), a.zoom && (a.jqbind(a.zoom, "mouseenter", function () {
            a.canshowonmouseevent && a.showCursor();
            a.rail.active = !0;
          }), a.jqbind(a.zoom, "mouseleave", function () {
            a.rail.active = !1;
            a.rail.drag || a.hideCursor();
          })));
          a.opt.enablemousewheel && (a.isiframe || a.bind(e.isie && a.ispage ? document : a.win, "mousewheel", a.onmousewheel), a.bind(a.rail, "mousewheel", a.onmousewheel), a.railh && a.bind(a.railh, "mousewheel", a.onmousewheelhr));
          a.ispage || e.cantouch || /HTML|^BODY/.test(a.win[0].nodeName) || (a.win.attr("tabindex") || a.win.attr({
            tabindex: N++
          }), a.jqbind(a.win, "focus", function (b) {
            y = a.getTarget(b).id || !0;
            a.hasfocus = !0;
            a.canshowonmouseevent && a.noticeCursor();
          }), a.jqbind(a.win, "blur", function (b) {
            y = !1;
            a.hasfocus = !1;
          }), a.jqbind(a.win, "mouseenter", function (b) {
            D = a.getTarget(b).id || !0;
            a.hasmousefocus = !0;
            a.canshowonmouseevent && a.noticeCursor();
          }), a.jqbind(a.win, "mouseleave", function () {
            D = !1;
            a.hasmousefocus = !1;
            a.rail.drag || a.hideCursor();
          }));
        }

        a.onkeypress = function (b) {
          if (a.railslocked && 0 == a.page.maxh) return !0;
          b = b ? b : window.e;
          var c = a.getTarget(b);
          if (c && /INPUT|TEXTAREA|SELECT|OPTION/.test(c.nodeName) && (!c.getAttribute("type") && !c.type || !/submit|button|cancel/i.tp) || f(c).attr("contenteditable")) return !0;

          if (a.hasfocus || a.hasmousefocus && !y || a.ispage && !y && !D) {
            c = b.keyCode;
            if (a.railslocked && 27 != c) return a.cancelEvent(b);
            var g = b.ctrlKey || !1,
                d = b.shiftKey || !1,
                e = !1;

            switch (c) {
              case 38:
              case 63233:
                a.doScrollBy(72);
                e = !0;
                break;

              case 40:
              case 63235:
                a.doScrollBy(-72);
                e = !0;
                break;

              case 37:
              case 63232:
                a.railh && (g ? a.doScrollLeft(0) : a.doScrollLeftBy(72), e = !0);
                break;

              case 39:
              case 63234:
                a.railh && (g ? a.doScrollLeft(a.page.maxw) : a.doScrollLeftBy(-72), e = !0);
                break;

              case 33:
              case 63276:
                a.doScrollBy(a.view.h);
                e = !0;
                break;

              case 34:
              case 63277:
                a.doScrollBy(-a.view.h);
                e = !0;
                break;

              case 36:
              case 63273:
                a.railh && g ? a.doScrollPos(0, 0) : a.doScrollTo(0);
                e = !0;
                break;

              case 35:
              case 63275:
                a.railh && g ? a.doScrollPos(a.page.maxw, a.page.maxh) : a.doScrollTo(a.page.maxh);
                e = !0;
                break;

              case 32:
                a.opt.spacebarenabled && (d ? a.doScrollBy(a.view.h) : a.doScrollBy(-a.view.h), e = !0);
                break;

              case 27:
                a.zoomactive && (a.doZoom(), e = !0);
            }

            if (e) return a.cancelEvent(b);
          }
        };

        a.opt.enablekeyboard && a.bind(document, e.isopera && !e.isopera12 ? "keypress" : "keydown", a.onkeypress);
        a.bind(document, "keydown", function (b) {
          b.ctrlKey && (a.wheelprevented = !0);
        });
        a.bind(document, "keyup", function (b) {
          b.ctrlKey || (a.wheelprevented = !1);
        });
        a.bind(window, "blur", function (b) {
          a.wheelprevented = !1;
        });
        a.bind(window, "resize", a.lazyResize);
        a.bind(window, "orientationchange", a.lazyResize);
        a.bind(window, "load", a.lazyResize);

        if (e.ischrome && !a.ispage && !a.haswrapper) {
          var r = a.win.attr("style"),
              c = parseFloat(a.win.css("width")) + 1;
          a.win.css("width", c);
          a.synched("chromefix", function () {
            a.win.attr("style", r);
          });
        }

        a.onAttributeChange = function (b) {
          a.lazyResize(a.isieold ? 250 : 30);
        };

        !1 !== v && (a.observerbody = new v(function (b) {
          b.forEach(function (b) {
            if ("attributes" == b.type) return f("body").hasClass("modal-open") ? a.hide() : a.show();
          });
          if (document.body.scrollHeight != a.page.maxh) return a.lazyResize(30);
        }), a.observerbody.observe(document.body, {
          childList: !0,
          subtree: !0,
          characterData: !1,
          attributes: !0,
          attributeFilter: ["class"]
        }));
        a.ispage || a.haswrapper || (!1 !== v ? (a.observer = new v(function (b) {
          b.forEach(a.onAttributeChange);
        }), a.observer.observe(a.win[0], {
          childList: !0,
          characterData: !1,
          attributes: !0,
          subtree: !1
        }), a.observerremover = new v(function (b) {
          b.forEach(function (b) {
            if (0 < b.removedNodes.length) for (var c in b.removedNodes) if (a && b.removedNodes[c] == a.win[0]) return a.remove();
          });
        }), a.observerremover.observe(a.win[0].parentNode, {
          childList: !0,
          characterData: !1,
          attributes: !1,
          subtree: !1
        })) : (a.bind(a.win, e.isie && !e.isie9 ? "propertychange" : "DOMAttrModified", a.onAttributeChange), e.isie9 && a.win[0].attachEvent("onpropertychange", a.onAttributeChange), a.bind(a.win, "DOMNodeRemoved", function (b) {
          b.target == a.win[0] && a.remove();
        })));
        !a.ispage && a.opt.boxzoom && a.bind(window, "resize", a.resizeZoom);
        a.istextarea && a.bind(a.win, "mouseup", a.lazyResize);
        a.lazyResize(30);
      }

      if ("IFRAME" == this.doc[0].nodeName) {
        var M = function () {
          a.iframexd = !1;
          var b;

          try {
            b = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
          } catch (c) {
            a.iframexd = !0, b = !1;
          }

          if (a.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
          a.forcescreen = !0;
          a.isiframe && (a.iframe = {
            doc: f(b),
            html: a.doc.contents().find("html")[0],
            body: a.doc.contents().find("body")[0]
          }, a.getContentSize = function () {
            return {
              w: Math.max(a.iframe.html.scrollWidth, a.iframe.body.scrollWidth),
              h: Math.max(a.iframe.html.scrollHeight, a.iframe.body.scrollHeight)
            };
          }, a.docscroll = f(a.iframe.body));

          if (!e.isios && a.opt.iframeautoresize && !a.isiframe) {
            a.win.scrollTop(0);
            a.doc.height("");
            var g = Math.max(b.getElementsByTagName("html")[0].scrollHeight, b.body.scrollHeight);
            a.doc.height(g);
          }

          a.lazyResize(30);
          e.isie7 && a.css(f(a.iframe.html), {
            "overflow-y": "hidden"
          });
          a.css(f(a.iframe.body), {
            "overflow-y": "hidden"
          });
          e.isios && a.haswrapper && a.css(f(b.body), {
            "-webkit-transform": "translate3d(0,0,0)"
          });
          "contentWindow" in this ? a.bind(this.contentWindow, "scroll", a.onscroll) : a.bind(b, "scroll", a.onscroll);
          a.opt.enablemousewheel && a.bind(b, "mousewheel", a.onmousewheel);
          a.opt.enablekeyboard && a.bind(b, e.isopera ? "keypress" : "keydown", a.onkeypress);
          if (e.cantouch || a.opt.touchbehavior) a.bind(b, "mousedown", a.ontouchstart), a.bind(b, "mousemove", function (b) {
            return a.ontouchmove(b, !0);
          }), a.opt.grabcursorenabled && e.cursorgrabvalue && a.css(f(b.body), {
            cursor: e.cursorgrabvalue
          });
          a.bind(b, "mouseup", a.ontouchend);
          a.zoom && (a.opt.dblclickzoom && a.bind(b, "dblclick", a.doZoom), a.ongesturezoom && a.bind(b, "gestureend", a.ongesturezoom));
        };

        this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function () {
          M.call(a.doc[0], !1);
        }, 500);
        a.bind(this.doc, "load", M);
      }
    };

    this.showCursor = function (b, c) {
      a.cursortimeout && (clearTimeout(a.cursortimeout), a.cursortimeout = 0);

      if (a.rail) {
        a.autohidedom && (a.autohidedom.stop().css({
          opacity: a.opt.cursoropacitymax
        }), a.cursoractive = !0);
        a.rail.drag && 1 == a.rail.drag.pt || ("undefined" != typeof b && !1 !== b && (a.scroll.y = Math.round(1 * b / a.scrollratio.y)), "undefined" != typeof c && (a.scroll.x = Math.round(1 * c / a.scrollratio.x)));
        a.cursor.css({
          height: a.cursorheight,
          top: a.scroll.y
        });

        if (a.cursorh) {
          var d = a.hasreversehr ? a.scrollvaluemaxw - a.scroll.x : a.scroll.x;
          !a.rail.align && a.rail.visibility ? a.cursorh.css({
            width: a.cursorwidth,
            left: d + a.rail.width
          }) : a.cursorh.css({
            width: a.cursorwidth,
            left: d
          });
          a.cursoractive = !0;
        }

        a.zoom && a.zoom.stop().css({
          opacity: a.opt.cursoropacitymax
        });
      }
    };

    this.hideCursor = function (b) {
      a.cursortimeout || !a.rail || !a.autohidedom || a.hasmousefocus && "leave" == a.opt.autohidemode || (a.cursortimeout = setTimeout(function () {
        a.rail.active && a.showonmouseevent || (a.autohidedom.stop().animate({
          opacity: a.opt.cursoropacitymin
        }), a.zoom && a.zoom.stop().animate({
          opacity: a.opt.cursoropacitymin
        }), a.cursoractive = !1);
        a.cursortimeout = 0;
      }, b || a.opt.hidecursordelay));
    };

    this.noticeCursor = function (b, c, d) {
      a.showCursor(c, d);
      a.rail.active || a.hideCursor(b);
    };

    this.getContentSize = a.ispage ? function () {
      return {
        w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
        h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      };
    } : a.haswrapper ? function () {
      return {
        w: a.doc.outerWidth() + parseInt(a.win.css("paddingLeft")) + parseInt(a.win.css("paddingRight")),
        h: a.doc.outerHeight() + parseInt(a.win.css("paddingTop")) + parseInt(a.win.css("paddingBottom"))
      };
    } : function () {
      return {
        w: a.docscroll[0].scrollWidth,
        h: a.docscroll[0].scrollHeight
      };
    };

    this.onResize = function (b, c) {
      if (!a || !a.win) return !1;

      if (!a.haswrapper && !a.ispage) {
        if ("none" == a.win.css("display")) return a.visibility && a.hideRail().hideRailHr(), !1;
        a.hidden || a.visibility || a.showRail().showRailHr();
      }

      var d = a.page.maxh,
          e = a.page.maxw,
          f = a.view.h,
          h = a.view.w;
      a.view = {
        w: a.ispage ? a.win.width() : parseInt(a.win[0].clientWidth),
        h: a.ispage ? a.win.height() : parseInt(a.win[0].clientHeight)
      };
      a.page = c ? c : a.getContentSize();
      a.page.maxh = Math.max(0, a.page.h - a.view.h);
      a.page.maxw = Math.max(0, a.page.w - a.view.w);

      if (a.page.maxh == d && a.page.maxw == e && a.view.w == h && a.view.h == f) {
        if (a.ispage) return a;
        d = a.win.offset();
        if (a.lastposition && (e = a.lastposition, e.top == d.top && e.left == d.left)) return a;
        a.lastposition = d;
      }

      0 == a.page.maxh ? (a.hideRail(), a.scrollvaluemax = 0, a.scroll.y = 0, a.scrollratio.y = 0, a.cursorheight = 0, a.setScrollTop(0), a.rail.scrollable = !1) : (a.page.maxh -= a.opt.railpadding.top + a.opt.railpadding.bottom, a.rail.scrollable = !0);
      0 == a.page.maxw ? (a.hideRailHr(), a.scrollvaluemaxw = 0, a.scroll.x = 0, a.scrollratio.x = 0, a.cursorwidth = 0, a.setScrollLeft(0), a.railh.scrollable = !1) : (a.page.maxw -= a.opt.railpadding.left + a.opt.railpadding.right, a.railh.scrollable = !0);
      a.railslocked = a.locked || 0 == a.page.maxh && 0 == a.page.maxw;
      if (a.railslocked) return a.ispage || a.updateScrollBar(a.view), !1;
      a.hidden || a.visibility ? a.hidden || a.railh.visibility || a.showRailHr() : a.showRail().showRailHr();
      a.istextarea && a.win.css("resize") && "none" != a.win.css("resize") && (a.view.h -= 20);
      a.cursorheight = Math.min(a.view.h, Math.round(a.view.h / a.page.h * a.view.h));
      a.cursorheight = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorheight);
      a.cursorwidth = Math.min(a.view.w, Math.round(a.view.w / a.page.w * a.view.w));
      a.cursorwidth = a.opt.cursorfixedheight ? a.opt.cursorfixedheight : Math.max(a.opt.cursorminheight, a.cursorwidth);
      a.scrollvaluemax = a.view.h - a.cursorheight - a.cursor.hborder - (a.opt.railpadding.top + a.opt.railpadding.bottom);
      a.railh && (a.railh.width = 0 < a.page.maxh ? a.view.w - a.rail.width : a.view.w, a.scrollvaluemaxw = a.railh.width - a.cursorwidth - a.cursorh.wborder - (a.opt.railpadding.left + a.opt.railpadding.right));
      a.ispage || a.updateScrollBar(a.view);
      a.scrollratio = {
        x: a.page.maxw / a.scrollvaluemaxw,
        y: a.page.maxh / a.scrollvaluemax
      };
      a.getScrollTop() > a.page.maxh ? a.doScrollTop(a.page.maxh) : (a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y)), a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)), a.cursoractive && a.noticeCursor());
      a.scroll.y && 0 == a.getScrollTop() && a.doScrollTo(Math.floor(a.scroll.y * a.scrollratio.y));
      return a;
    };

    this.resize = a.onResize;

    this.lazyResize = function (b) {
      b = isNaN(b) ? 30 : b;
      a.debounced("resize", a.resize, b);
      return a;
    };

    this.jqbind = function (b, c, d) {
      a.events.push({
        e: b,
        n: c,
        f: d,
        q: !0
      });
      f(b).bind(c, d);
    };

    this.bind = function (b, c, d, f) {
      var h = "jquery" in b ? b[0] : b;
      "mousewheel" == c ? window.addEventListener || "onwheel" in document ? a._bind(h, "wheel", d, f || !1) : (b = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", n(h, b, d, f || !1), "DOMMouseScroll" == b && n(h, "MozMousePixelScroll", d, f || !1)) : h.addEventListener ? (e.cantouch && /mouseup|mousedown|mousemove/.test(c) && a._bind(h, "mousedown" == c ? "touchstart" : "mouseup" == c ? "touchend" : "touchmove", function (a) {
        if (a.touches) {
          if (2 > a.touches.length) {
            var b = a.touches.length ? a.touches[0] : a;
            b.original = a;
            d.call(this, b);
          }
        } else a.changedTouches && (b = a.changedTouches[0], b.original = a, d.call(this, b));
      }, f || !1), a._bind(h, c, d, f || !1), e.cantouch && "mouseup" == c && a._bind(h, "touchcancel", d, f || !1)) : a._bind(h, c, function (b) {
        (b = b || window.event || !1) && b.srcElement && (b.target = b.srcElement);
        "pageY" in b || (b.pageX = b.clientX + document.documentElement.scrollLeft, b.pageY = b.clientY + document.documentElement.scrollTop);
        return !1 === d.call(h, b) || !1 === f ? a.cancelEvent(b) : !0;
      });
    };

    e.haseventlistener ? (this._bind = function (b, c, d, e) {
      a.events.push({
        e: b,
        n: c,
        f: d,
        b: e,
        q: !1
      });
      b.addEventListener(c, d, e || !1);
    }, this.cancelEvent = function (a) {
      if (!a) return !1;
      a = a.original ? a.original : a;
      a.preventDefault();
      a.stopPropagation();
      a.preventManipulation && a.preventManipulation();
      return !1;
    }, this.stopPropagation = function (a) {
      if (!a) return !1;
      a = a.original ? a.original : a;
      a.stopPropagation();
      return !1;
    }, this._unbind = function (a, c, d, e) {
      a.removeEventListener(c, d, e);
    }) : (this._bind = function (b, c, d, e) {
      a.events.push({
        e: b,
        n: c,
        f: d,
        b: e,
        q: !1
      });
      b.attachEvent ? b.attachEvent("on" + c, d) : b["on" + c] = d;
    }, this.cancelEvent = function (a) {
      a = window.event || !1;
      if (!a) return !1;
      a.cancelBubble = !0;
      a.cancel = !0;
      return a.returnValue = !1;
    }, this.stopPropagation = function (a) {
      a = window.event || !1;
      if (!a) return !1;
      a.cancelBubble = !0;
      return !1;
    }, this._unbind = function (a, c, d, e) {
      a.detachEvent ? a.detachEvent("on" + c, d) : a["on" + c] = !1;
    });

    this.unbindAll = function () {
      for (var b = 0; b < a.events.length; b++) {
        var c = a.events[b];
        c.q ? c.e.unbind(c.n, c.f) : a._unbind(c.e, c.n, c.f, c.b);
      }
    };

    this.showRail = function () {
      0 == a.page.maxh || !a.ispage && "none" == a.win.css("display") || (a.visibility = !0, a.rail.visibility = !0, a.rail.css("display", "block"));
      return a;
    };

    this.showRailHr = function () {
      if (!a.railh) return a;
      0 == a.page.maxw || !a.ispage && "none" == a.win.css("display") || (a.railh.visibility = !0, a.railh.css("display", "block"));
      return a;
    };

    this.hideRail = function () {
      a.visibility = !1;
      a.rail.visibility = !1;
      a.rail.css("display", "none");
      return a;
    };

    this.hideRailHr = function () {
      if (!a.railh) return a;
      a.railh.visibility = !1;
      a.railh.css("display", "none");
      return a;
    };

    this.show = function () {
      a.hidden = !1;
      a.railslocked = !1;
      return a.showRail().showRailHr();
    };

    this.hide = function () {
      a.hidden = !0;
      a.railslocked = !0;
      return a.hideRail().hideRailHr();
    };

    this.toggle = function () {
      return a.hidden ? a.show() : a.hide();
    };

    this.remove = function () {
      a.stop();
      a.cursortimeout && clearTimeout(a.cursortimeout);
      a.doZoomOut();
      a.unbindAll();
      e.isie9 && a.win[0].detachEvent("onpropertychange", a.onAttributeChange);
      !1 !== a.observer && a.observer.disconnect();
      !1 !== a.observerremover && a.observerremover.disconnect();
      !1 !== a.observerbody && a.observerbody.disconnect();
      a.events = null;
      a.cursor && a.cursor.remove();
      a.cursorh && a.cursorh.remove();
      a.rail && a.rail.remove();
      a.railh && a.railh.remove();
      a.zoom && a.zoom.remove();

      for (var b = 0; b < a.saved.css.length; b++) {
        var c = a.saved.css[b];
        c[0].css(c[1], "undefined" == typeof c[2] ? "" : c[2]);
      }

      a.saved = !1;
      a.me.data("__nicescroll", "");
      var d = f.nicescroll;
      d.each(function (b) {
        if (this && this.id === a.id) {
          delete d[b];

          for (var c = ++b; c < d.length; c++, b++) d[b] = d[c];

          d.length--;
          d.length && delete d[d.length];
        }
      });

      for (var h in a) a[h] = null, delete a[h];

      a = null;
    };

    this.scrollstart = function (b) {
      this.onscrollstart = b;
      return a;
    };

    this.scrollend = function (b) {
      this.onscrollend = b;
      return a;
    };

    this.scrollcancel = function (b) {
      this.onscrollcancel = b;
      return a;
    };

    this.zoomin = function (b) {
      this.onzoomin = b;
      return a;
    };

    this.zoomout = function (b) {
      this.onzoomout = b;
      return a;
    };

    this.isScrollable = function (a) {
      a = a.target ? a.target : a;
      if ("OPTION" == a.nodeName) return !0;

      for (; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
        var c = f(a),
            c = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
        if (/scroll|auto/.test(c)) return a.clientHeight != a.scrollHeight;
        a = a.parentNode ? a.parentNode : !1;
      }

      return !1;
    };

    this.getViewport = function (a) {
      for (a = a && a.parentNode ? a.parentNode : !1; a && 1 == a.nodeType && !/^BODY|HTML/.test(a.nodeName);) {
        var c = f(a);
        if (/fixed|absolute/.test(c.css("position"))) return c;
        var d = c.css("overflowY") || c.css("overflowX") || c.css("overflow") || "";
        if (/scroll|auto/.test(d) && a.clientHeight != a.scrollHeight || 0 < c.getNiceScroll().length) return c;
        a = a.parentNode ? a.parentNode : !1;
      }

      return !1;
    };

    this.triggerScrollEnd = function () {
      if (a.onscrollend) {
        var b = a.getScrollLeft(),
            c = a.getScrollTop();
        a.onscrollend.call(a, {
          type: "scrollend",
          current: {
            x: b,
            y: c
          },
          end: {
            x: b,
            y: c
          }
        });
      }
    };

    this.onmousewheel = function (b) {
      if (!a.wheelprevented) {
        if (a.railslocked) return a.debounced("checkunlock", a.resize, 250), !0;
        if (a.rail.drag) return a.cancelEvent(b);
        "auto" == a.opt.oneaxismousemode && 0 != b.deltaX && (a.opt.oneaxismousemode = !1);
        if (a.opt.oneaxismousemode && 0 == b.deltaX && !a.rail.scrollable) return a.railh && a.railh.scrollable ? a.onmousewheelhr(b) : !0;
        var c = +new Date(),
            d = !1;
        a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
        a.checkarea = c;
        if (a.nativescrollingarea) return !0;
        if (b = p(b, !1, d)) a.checkarea = 0;
        return b;
      }
    };

    this.onmousewheelhr = function (b) {
      if (!a.wheelprevented) {
        if (a.railslocked || !a.railh.scrollable) return !0;
        if (a.rail.drag) return a.cancelEvent(b);
        var c = +new Date(),
            d = !1;
        a.opt.preservenativescrolling && a.checkarea + 600 < c && (a.nativescrollingarea = a.isScrollable(b), d = !0);
        a.checkarea = c;
        return a.nativescrollingarea ? !0 : a.railslocked ? a.cancelEvent(b) : p(b, !0, d);
      }
    };

    this.stop = function () {
      a.cancelScroll();
      a.scrollmon && a.scrollmon.stop();
      a.cursorfreezed = !1;
      a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
      a.noticeCursor();
      return a;
    };

    this.getTransitionSpeed = function (b) {
      var c = Math.round(10 * a.opt.scrollspeed);
      b = Math.min(c, Math.round(b / 20 * a.opt.scrollspeed));
      return 20 < b ? b : 0;
    };

    a.opt.smoothscroll ? a.ishwscroll && e.hastransition && a.opt.usetransition && a.opt.smoothscroll ? (this.prepareTransition = function (b, c) {
      var d = c ? 20 < b ? b : 0 : a.getTransitionSpeed(b),
          f = d ? e.prefixstyle + "transform " + d + "ms ease-out" : "";
      a.lasttransitionstyle && a.lasttransitionstyle == f || (a.lasttransitionstyle = f, a.doc.css(e.transitionstyle, f));
      return d;
    }, this.doScrollLeft = function (b, c) {
      var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
      a.doScrollPos(b, d, c);
    }, this.doScrollTop = function (b, c) {
      var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
      a.doScrollPos(d, b, c);
    }, this.doScrollPos = function (b, c, d) {
      var f = a.getScrollTop(),
          h = a.getScrollLeft();
      (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - h) * (b - h)) && a.cancelScroll();
      0 == a.opt.bouncescroll && (0 > c ? c = 0 : c > a.page.maxh && (c = a.page.maxh), 0 > b ? b = 0 : b > a.page.maxw && (b = a.page.maxw));
      if (a.scrollrunning && b == a.newscrollx && c == a.newscrolly) return !1;
      a.newscrolly = c;
      a.newscrollx = b;
      a.newscrollspeed = d || !1;
      if (a.timer) return !1;
      a.timer = setTimeout(function () {
        var d = a.getScrollTop(),
            f = a.getScrollLeft(),
            h,
            k;
        h = b - f;
        k = c - d;
        h = Math.round(Math.sqrt(Math.pow(h, 2) + Math.pow(k, 2)));
        h = a.newscrollspeed && 1 < a.newscrollspeed ? a.newscrollspeed : a.getTransitionSpeed(h);
        a.newscrollspeed && 1 >= a.newscrollspeed && (h *= a.newscrollspeed);
        a.prepareTransition(h, !0);
        a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
        0 < h && (!a.scrollrunning && a.onscrollstart && a.onscrollstart.call(a, {
          type: "scrollstart",
          current: {
            x: f,
            y: d
          },
          request: {
            x: b,
            y: c
          },
          end: {
            x: a.newscrollx,
            y: a.newscrolly
          },
          speed: h
        }), e.transitionend ? a.scrollendtrapped || (a.scrollendtrapped = !0, a.bind(a.doc, e.transitionend, a.onScrollTransitionEnd, !1)) : (a.scrollendtrapped && clearTimeout(a.scrollendtrapped), a.scrollendtrapped = setTimeout(a.onScrollTransitionEnd, h)), a.timerscroll = {
          bz: new A(d, a.newscrolly, h, 0, 0, .58, 1),
          bh: new A(f, a.newscrollx, h, 0, 0, .58, 1)
        }, a.cursorfreezed || (a.timerscroll.tm = setInterval(function () {
          a.showCursor(a.getScrollTop(), a.getScrollLeft());
        }, 60)));
        a.synched("doScroll-set", function () {
          a.timer = 0;
          a.scrollendtrapped && (a.scrollrunning = !0);
          a.setScrollTop(a.newscrolly);
          a.setScrollLeft(a.newscrollx);
          if (!a.scrollendtrapped) a.onScrollTransitionEnd();
        });
      }, 50);
    }, this.cancelScroll = function () {
      if (!a.scrollendtrapped) return !0;
      var b = a.getScrollTop(),
          c = a.getScrollLeft();
      a.scrollrunning = !1;
      e.transitionend || clearTimeout(e.transitionend);
      a.scrollendtrapped = !1;

      a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);

      a.prepareTransition(0);
      a.setScrollTop(b);
      a.railh && a.setScrollLeft(c);
      a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
      a.timerscroll = !1;
      a.cursorfreezed = !1;
      a.showCursor(b, c);
      return a;
    }, this.onScrollTransitionEnd = function () {
      a.scrollendtrapped && a._unbind(a.doc[0], e.transitionend, a.onScrollTransitionEnd);
      a.scrollendtrapped = !1;
      a.prepareTransition(0);
      a.timerscroll && a.timerscroll.tm && clearInterval(a.timerscroll.tm);
      a.timerscroll = !1;
      var b = a.getScrollTop(),
          c = a.getScrollLeft();
      a.setScrollTop(b);
      a.railh && a.setScrollLeft(c);
      a.noticeCursor(!1, b, c);
      a.cursorfreezed = !1;
      0 > b ? b = 0 : b > a.page.maxh && (b = a.page.maxh);
      0 > c ? c = 0 : c > a.page.maxw && (c = a.page.maxw);
      if (b != a.newscrolly || c != a.newscrollx) return a.doScrollPos(c, b, a.opt.snapbackspeed);
      a.onscrollend && a.scrollrunning && a.triggerScrollEnd();
      a.scrollrunning = !1;
    }) : (this.doScrollLeft = function (b, c) {
      var d = a.scrollrunning ? a.newscrolly : a.getScrollTop();
      a.doScrollPos(b, d, c);
    }, this.doScrollTop = function (b, c) {
      var d = a.scrollrunning ? a.newscrollx : a.getScrollLeft();
      a.doScrollPos(d, b, c);
    }, this.doScrollPos = function (b, c, d) {
      function e() {
        if (a.cancelAnimationFrame) return !0;
        a.scrollrunning = !0;
        if (n = 1 - n) return a.timer = s(e) || 1;
        var b = 0,
            c,
            d,
            g = d = a.getScrollTop();

        if (a.dst.ay) {
          g = a.bzscroll ? a.dst.py + a.bzscroll.getNow() * a.dst.ay : a.newscrolly;
          c = g - d;
          if (0 > c && g < a.newscrolly || 0 < c && g > a.newscrolly) g = a.newscrolly;
          a.setScrollTop(g);
          g == a.newscrolly && (b = 1);
        } else b = 1;

        d = c = a.getScrollLeft();

        if (a.dst.ax) {
          d = a.bzscroll ? a.dst.px + a.bzscroll.getNow() * a.dst.ax : a.newscrollx;
          c = d - c;
          if (0 > c && d < a.newscrollx || 0 < c && d > a.newscrollx) d = a.newscrollx;
          a.setScrollLeft(d);
          d == a.newscrollx && (b += 1);
        } else b += 1;

        2 == b ? (a.timer = 0, a.cursorfreezed = !1, a.bzscroll = !1, a.scrollrunning = !1, 0 > g ? g = 0 : g > a.page.maxh && (g = a.page.maxh), 0 > d ? d = 0 : d > a.page.maxw && (d = a.page.maxw), d != a.newscrollx || g != a.newscrolly ? a.doScrollPos(d, g) : a.onscrollend && a.triggerScrollEnd()) : a.timer = s(e) || 1;
      }

      c = "undefined" == typeof c || !1 === c ? a.getScrollTop(!0) : c;
      if (a.timer && a.newscrolly == c && a.newscrollx == b) return !0;
      a.timer && t(a.timer);
      a.timer = 0;
      var f = a.getScrollTop(),
          h = a.getScrollLeft();
      (0 > (a.newscrolly - f) * (c - f) || 0 > (a.newscrollx - h) * (b - h)) && a.cancelScroll();
      a.newscrolly = c;
      a.newscrollx = b;
      a.bouncescroll && a.rail.visibility || (0 > a.newscrolly ? a.newscrolly = 0 : a.newscrolly > a.page.maxh && (a.newscrolly = a.page.maxh));
      a.bouncescroll && a.railh.visibility || (0 > a.newscrollx ? a.newscrollx = 0 : a.newscrollx > a.page.maxw && (a.newscrollx = a.page.maxw));
      a.dst = {};
      a.dst.x = b - h;
      a.dst.y = c - f;
      a.dst.px = h;
      a.dst.py = f;
      var k = Math.round(Math.sqrt(Math.pow(a.dst.x, 2) + Math.pow(a.dst.y, 2)));
      a.dst.ax = a.dst.x / k;
      a.dst.ay = a.dst.y / k;
      var l = 0,
          m = k;
      0 == a.dst.x ? (l = f, m = c, a.dst.ay = 1, a.dst.py = 0) : 0 == a.dst.y && (l = h, m = b, a.dst.ax = 1, a.dst.px = 0);
      k = a.getTransitionSpeed(k);
      d && 1 >= d && (k *= d);
      a.bzscroll = 0 < k ? a.bzscroll ? a.bzscroll.update(m, k) : new A(l, m, k, 0, 1, 0, 1) : !1;

      if (!a.timer) {
        (f == a.page.maxh && c >= a.page.maxh || h == a.page.maxw && b >= a.page.maxw) && a.checkContentSize();
        var n = 1;
        a.cancelAnimationFrame = !1;
        a.timer = 1;
        a.onscrollstart && !a.scrollrunning && a.onscrollstart.call(a, {
          type: "scrollstart",
          current: {
            x: h,
            y: f
          },
          request: {
            x: b,
            y: c
          },
          end: {
            x: a.newscrollx,
            y: a.newscrolly
          },
          speed: k
        });
        e();
        (f == a.page.maxh && c >= f || h == a.page.maxw && b >= h) && a.checkContentSize();
        a.noticeCursor();
      }
    }, this.cancelScroll = function () {
      a.timer && t(a.timer);
      a.timer = 0;
      a.bzscroll = !1;
      a.scrollrunning = !1;
      return a;
    }) : (this.doScrollLeft = function (b, c) {
      var d = a.getScrollTop();
      a.doScrollPos(b, d, c);
    }, this.doScrollTop = function (b, c) {
      var d = a.getScrollLeft();
      a.doScrollPos(d, b, c);
    }, this.doScrollPos = function (b, c, d) {
      var e = b > a.page.maxw ? a.page.maxw : b;
      0 > e && (e = 0);
      var f = c > a.page.maxh ? a.page.maxh : c;
      0 > f && (f = 0);
      a.synched("scroll", function () {
        a.setScrollTop(f);
        a.setScrollLeft(e);
      });
    }, this.cancelScroll = function () {});

    this.doScrollBy = function (b, c) {
      var d = 0,
          d = c ? Math.floor((a.scroll.y - b) * a.scrollratio.y) : (a.timer ? a.newscrolly : a.getScrollTop(!0)) - b;

      if (a.bouncescroll) {
        var e = Math.round(a.view.h / 2);
        d < -e ? d = -e : d > a.page.maxh + e && (d = a.page.maxh + e);
      }

      a.cursorfreezed = !1;
      e = a.getScrollTop(!0);
      if (0 > d && 0 >= e) return a.noticeCursor();
      if (d > a.page.maxh && e >= a.page.maxh) return a.checkContentSize(), a.noticeCursor();
      a.doScrollTop(d);
    };

    this.doScrollLeftBy = function (b, c) {
      var d = 0,
          d = c ? Math.floor((a.scroll.x - b) * a.scrollratio.x) : (a.timer ? a.newscrollx : a.getScrollLeft(!0)) - b;

      if (a.bouncescroll) {
        var e = Math.round(a.view.w / 2);
        d < -e ? d = -e : d > a.page.maxw + e && (d = a.page.maxw + e);
      }

      a.cursorfreezed = !1;
      e = a.getScrollLeft(!0);
      if (0 > d && 0 >= e || d > a.page.maxw && e >= a.page.maxw) return a.noticeCursor();
      a.doScrollLeft(d);
    };

    this.doScrollTo = function (b, c) {
      c && Math.round(b * a.scrollratio.y);
      a.cursorfreezed = !1;
      a.doScrollTop(b);
    };

    this.checkContentSize = function () {
      var b = a.getContentSize();
      b.h == a.page.h && b.w == a.page.w || a.resize(!1, b);
    };

    a.onscroll = function (b) {
      a.rail.drag || a.cursorfreezed || a.synched("scroll", function () {
        a.scroll.y = Math.round(a.getScrollTop() * (1 / a.scrollratio.y));
        a.railh && (a.scroll.x = Math.round(a.getScrollLeft() * (1 / a.scrollratio.x)));
        a.noticeCursor();
      });
    };

    a.bind(a.docscroll, "scroll", a.onscroll);

    this.doZoomIn = function (b) {
      if (!a.zoomactive) {
        a.zoomactive = !0;
        a.zoomrestore = {
          style: {}
        };
        var c = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "),
            d = a.win[0].style,
            h;

        for (h in c) {
          var k = c[h];
          a.zoomrestore.style[k] = "undefined" != typeof d[k] ? d[k] : "";
        }

        a.zoomrestore.style.width = a.win.css("width");
        a.zoomrestore.style.height = a.win.css("height");
        a.zoomrestore.padding = {
          w: a.win.outerWidth() - a.win.width(),
          h: a.win.outerHeight() - a.win.height()
        };
        e.isios4 && (a.zoomrestore.scrollTop = f(window).scrollTop(), f(window).scrollTop(0));
        a.win.css({
          position: e.isios4 ? "absolute" : "fixed",
          top: 0,
          left: 0,
          "z-index": x + 100,
          margin: "0px"
        });
        c = a.win.css("backgroundColor");
        ("" == c || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(c)) && a.win.css("backgroundColor", "#fff");
        a.rail.css({
          "z-index": x + 101
        });
        a.zoom.css({
          "z-index": x + 102
        });
        a.zoom.css("backgroundPosition", "0px -18px");
        a.resizeZoom();
        a.onzoomin && a.onzoomin.call(a);
        return a.cancelEvent(b);
      }
    };

    this.doZoomOut = function (b) {
      if (a.zoomactive) return a.zoomactive = !1, a.win.css("margin", ""), a.win.css(a.zoomrestore.style), e.isios4 && f(window).scrollTop(a.zoomrestore.scrollTop), a.rail.css({
        "z-index": a.zindex
      }), a.zoom.css({
        "z-index": a.zindex
      }), a.zoomrestore = !1, a.zoom.css("backgroundPosition", "0px 0px"), a.onResize(), a.onzoomout && a.onzoomout.call(a), a.cancelEvent(b);
    };

    this.doZoom = function (b) {
      return a.zoomactive ? a.doZoomOut(b) : a.doZoomIn(b);
    };

    this.resizeZoom = function () {
      if (a.zoomactive) {
        var b = a.getScrollTop();
        a.win.css({
          width: f(window).width() - a.zoomrestore.padding.w + "px",
          height: f(window).height() - a.zoomrestore.padding.h + "px"
        });
        a.onResize();
        a.setScrollTop(Math.min(a.page.maxh, b));
      }
    };

    this.init();
    f.nicescroll.push(this);
  },
      L = function (f) {
    var c = this;
    this.nc = f;
    this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
    this.snapy = this.snapx = !1;
    this.demuly = this.demulx = 0;
    this.lastscrolly = this.lastscrollx = -1;
    this.timer = this.chky = this.chkx = 0;

    this.time = function () {
      return +new Date();
    };

    this.reset = function (f, k) {
      c.stop();
      var d = c.time();
      c.steptime = 0;
      c.lasttime = d;
      c.speedx = 0;
      c.speedy = 0;
      c.lastx = f;
      c.lasty = k;
      c.lastscrollx = -1;
      c.lastscrolly = -1;
    };

    this.update = function (f, k) {
      var d = c.time();
      c.steptime = d - c.lasttime;
      c.lasttime = d;
      var d = k - c.lasty,
          n = f - c.lastx,
          p = c.nc.getScrollTop(),
          a = c.nc.getScrollLeft(),
          p = p + d,
          a = a + n;
      c.snapx = 0 > a || a > c.nc.page.maxw;
      c.snapy = 0 > p || p > c.nc.page.maxh;
      c.speedx = n;
      c.speedy = d;
      c.lastx = f;
      c.lasty = k;
    };

    this.stop = function () {
      c.nc.unsynched("domomentum2d");
      c.timer && clearTimeout(c.timer);
      c.timer = 0;
      c.lastscrollx = -1;
      c.lastscrolly = -1;
    };

    this.doSnapy = function (f, k) {
      var d = !1;
      0 > k ? (k = 0, d = !0) : k > c.nc.page.maxh && (k = c.nc.page.maxh, d = !0);
      0 > f ? (f = 0, d = !0) : f > c.nc.page.maxw && (f = c.nc.page.maxw, d = !0);
      d ? c.nc.doScrollPos(f, k, c.nc.opt.snapbackspeed) : c.nc.triggerScrollEnd();
    };

    this.doMomentum = function (f) {
      var k = c.time(),
          d = f ? k + f : c.lasttime;
      f = c.nc.getScrollLeft();
      var n = c.nc.getScrollTop(),
          p = c.nc.page.maxh,
          a = c.nc.page.maxw;
      c.speedx = 0 < a ? Math.min(60, c.speedx) : 0;
      c.speedy = 0 < p ? Math.min(60, c.speedy) : 0;
      d = d && 60 >= k - d;
      if (0 > n || n > p || 0 > f || f > a) d = !1;
      f = c.speedx && d ? c.speedx : !1;

      if (c.speedy && d && c.speedy || f) {
        var s = Math.max(16, c.steptime);
        50 < s && (f = s / 50, c.speedx *= f, c.speedy *= f, s = 50);
        c.demulxy = 0;
        c.lastscrollx = c.nc.getScrollLeft();
        c.chkx = c.lastscrollx;
        c.lastscrolly = c.nc.getScrollTop();
        c.chky = c.lastscrolly;

        var e = c.lastscrollx,
            r = c.lastscrolly,
            t = function () {
          var d = 600 < c.time() - k ? .04 : .02;
          c.speedx && (e = Math.floor(c.lastscrollx - c.speedx * (1 - c.demulxy)), c.lastscrollx = e, 0 > e || e > a) && (d = .1);
          c.speedy && (r = Math.floor(c.lastscrolly - c.speedy * (1 - c.demulxy)), c.lastscrolly = r, 0 > r || r > p) && (d = .1);
          c.demulxy = Math.min(1, c.demulxy + d);
          c.nc.synched("domomentum2d", function () {
            c.speedx && (c.nc.getScrollLeft() != c.chkx && c.stop(), c.chkx = e, c.nc.setScrollLeft(e));
            c.speedy && (c.nc.getScrollTop() != c.chky && c.stop(), c.chky = r, c.nc.setScrollTop(r));
            c.timer || (c.nc.hideCursor(), c.doSnapy(e, r));
          });
          1 > c.demulxy ? c.timer = setTimeout(t, s) : (c.stop(), c.nc.hideCursor(), c.doSnapy(e, r));
        };

        t();
      } else c.doSnapy(c.nc.getScrollLeft(), c.nc.getScrollTop());
    };
  },
      w = f.fn.scrollTop;

  f.cssHooks.pageYOffset = {
    get: function (k, c, h) {
      return (c = f.data(k, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollTop() : w.call(k);
    },
    set: function (k, c) {
      var h = f.data(k, "__nicescroll") || !1;
      h && h.ishwscroll ? h.setScrollTop(parseInt(c)) : w.call(k, c);
      return this;
    }
  };

  f.fn.scrollTop = function (k) {
    if ("undefined" == typeof k) {
      var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollTop() : w.call(this);
    }

    return this.each(function () {
      var c = f.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollTop(parseInt(k)) : w.call(f(this), k);
    });
  };

  var B = f.fn.scrollLeft;
  f.cssHooks.pageXOffset = {
    get: function (k, c, h) {
      return (c = f.data(k, "__nicescroll") || !1) && c.ishwscroll ? c.getScrollLeft() : B.call(k);
    },
    set: function (k, c) {
      var h = f.data(k, "__nicescroll") || !1;
      h && h.ishwscroll ? h.setScrollLeft(parseInt(c)) : B.call(k, c);
      return this;
    }
  };

  f.fn.scrollLeft = function (k) {
    if ("undefined" == typeof k) {
      var c = this[0] ? f.data(this[0], "__nicescroll") || !1 : !1;
      return c && c.ishwscroll ? c.getScrollLeft() : B.call(this);
    }

    return this.each(function () {
      var c = f.data(this, "__nicescroll") || !1;
      c && c.ishwscroll ? c.setScrollLeft(parseInt(k)) : B.call(f(this), k);
    });
  };

  var C = function (k) {
    var c = this;
    this.length = 0;
    this.name = "nicescrollarray";

    this.each = function (d) {
      for (var f = 0, h = 0; f < c.length; f++) d.call(c[f], h++);

      return c;
    };

    this.push = function (d) {
      c[c.length] = d;
      c.length++;
    };

    this.eq = function (d) {
      return c[d];
    };

    if (k) for (var h = 0; h < k.length; h++) {
      var m = f.data(k[h], "__nicescroll") || !1;
      m && (this[this.length] = m, this.length++);
    }
    return this;
  };

  (function (f, c, h) {
    for (var m = 0; m < c.length; m++) h(f, c[m]);
  })(C.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function (f, c) {
    f[c] = function () {
      var f = arguments;
      return this.each(function () {
        this[c].apply(this, f);
      });
    };
  });

  f.fn.getNiceScroll = function (k) {
    return "undefined" == typeof k ? new C(this) : this[k] && f.data(this[k], "__nicescroll") || !1;
  };

  f.extend(f.expr[":"], {
    nicescroll: function (k) {
      return f.data(k, "__nicescroll") ? !0 : !1;
    }
  });

  f.fn.niceScroll = function (k, c) {
    "undefined" != typeof c || "object" != typeof k || "jquery" in k || (c = k, k = !1);
    c = f.extend({}, c);
    var h = new C();
    "undefined" == typeof c && (c = {});
    k && (c.doc = f(k), c.win = f(this));
    var m = !("doc" in c);
    m || "win" in c || (c.win = f(this));
    this.each(function () {
      var d = f(this).data("__nicescroll") || !1;
      d || (c.doc = m ? f(this) : c.doc, d = new R(c, f(this)), f(this).data("__nicescroll", d));
      h.push(d);
    });
    return 1 == h.length ? h[0] : h;
  };

  window.NiceScroll = {
    getjQuery: function () {
      return f;
    }
  };
  f.nicescroll || (f.nicescroll = new C(), f.nicescroll.options = I);
});

/***/ }),

/***/ "./sharedemos/static/libs/jquery-select2/select2.min.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/libs/jquery-select2/select2.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (a) {
  var b = function () {
    if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
    var b;
    return function () {
      if (!b || !b.requirejs) {
        b ? c = b : b = {};
        var a, c, d;
        !function (b) {
          function e(a, b) {
            return u.call(a, b);
          }

          function f(a, b) {
            var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n = b && b.split("/"),
                o = s.map,
                p = o && o["*"] || {};
            if (a && "." === a.charAt(0)) if (b) {
              for (n = n.slice(0, n.length - 1), a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.concat(a), k = 0; k < a.length; k += 1) if (m = a[k], "." === m) a.splice(k, 1), k -= 1;else if (".." === m) {
                if (1 === k && (".." === a[2] || ".." === a[0])) break;
                k > 0 && (a.splice(k - 1, 2), k -= 2);
              }

              a = a.join("/");
            } else 0 === a.indexOf("./") && (a = a.substring(2));

            if ((n || p) && o) {
              for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                if (d = c.slice(0, k).join("/"), n) for (l = n.length; l > 0; l -= 1) if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
                  f = e, h = k;
                  break;
                }
                if (f) break;
                !i && p && p[d] && (i = p[d], j = k);
              }

              !f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"));
            }

            return a;
          }

          function g(a, c) {
            return function () {
              return n.apply(b, v.call(arguments, 0).concat([a, c]));
            };
          }

          function h(a) {
            return function (b) {
              return f(b, a);
            };
          }

          function i(a) {
            return function (b) {
              q[a] = b;
            };
          }

          function j(a) {
            if (e(r, a)) {
              var c = r[a];
              delete r[a], t[a] = !0, m.apply(b, c);
            }

            if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
            return q[a];
          }

          function k(a) {
            var b,
                c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a];
          }

          function l(a) {
            return function () {
              return s && s.config && s.config[a] || {};
            };
          }

          var m,
              n,
              o,
              p,
              q = {},
              r = {},
              s = {},
              t = {},
              u = Object.prototype.hasOwnProperty,
              v = [].slice,
              w = /\.js$/;
          o = function (a, b) {
            var c,
                d = k(a),
                e = d[0];
            return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
              f: e ? e + "!" + a : a,
              n: a,
              pr: e,
              p: c
            };
          }, p = {
            require: function (a) {
              return g(a);
            },
            exports: function (a) {
              var b = q[a];
              return "undefined" != typeof b ? b : q[a] = {};
            },
            module: function (a) {
              return {
                id: a,
                uri: "",
                exports: q[a],
                config: l(a)
              };
            }
          }, m = function (a, c, d, f) {
            var h,
                k,
                l,
                m,
                n,
                s,
                u = [],
                v = typeof d;

            if (f = f || a, "undefined" === v || "function" === v) {
              for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1) if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(a);else if ("exports" === k) u[n] = p.exports(a), s = !0;else if ("module" === k) h = u[n] = p.module(a);else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);else {
                if (!m.p) throw new Error(a + " missing " + k);
                m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k];
              }

              l = d ? d.apply(q[a], u) : void 0, a && (h && h.exports !== b && h.exports !== q[a] ? q[a] = h.exports : l === b && s || (q[a] = l));
            } else a && (q[a] = d);
          }, a = c = n = function (a, c, d, e, f) {
            if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f);

            if (!a.splice) {
              if (s = a, s.deps && n(s.deps, s.callback), !c) return;
              c.splice ? (a = c, c = d, d = null) : a = b;
            }

            return c = c || function () {}, "function" == typeof d && (d = e, e = f), e ? m(b, a, c, d) : setTimeout(function () {
              m(b, a, c, d);
            }, 4), n;
          }, n.config = function (a) {
            return n(a);
          }, a._defined = q, d = function (a, b, c) {
            b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c]);
          }, d.amd = {
            jQuery: !0
          };
        }(), b.requirejs = a, b.require = c, b.define = d;
      }
    }(), b.define("almond", function () {}), b.define("jquery", [], function () {
      var b = a || $;
      return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b;
    }), b.define("select2/utils", ["jquery"], function (a) {
      function b(a) {
        var b = a.prototype,
            c = [];

        for (var d in b) {
          var e = b[d];
          "function" == typeof e && "constructor" !== d && c.push(d);
        }

        return c;
      }

      var c = {};
      c.Extend = function (a, b) {
        function c() {
          this.constructor = a;
        }

        var d = {}.hasOwnProperty;

        for (var e in b) d.call(b, e) && (a[e] = b[e]);

        return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
      }, c.Decorate = function (a, c) {
        function d() {
          var b = Array.prototype.unshift,
              d = c.prototype.constructor.length,
              e = a.prototype.constructor;
          d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments);
        }

        function e() {
          this.constructor = d;
        }

        var f = b(c),
            g = b(a);
        c.displayName = a.displayName, d.prototype = new e();

        for (var h = 0; h < g.length; h++) {
          var i = g[h];
          d.prototype[i] = a.prototype[i];
        }

        for (var j = function (a) {
          var b = function () {};

          (a in d.prototype) && (b = d.prototype[a]);
          var e = c.prototype[a];
          return function () {
            var a = Array.prototype.unshift;
            return a.call(arguments, b), e.apply(this, arguments);
          };
        }, k = 0; k < f.length; k++) {
          var l = f[k];
          d.prototype[l] = j(l);
        }

        return d;
      };

      var d = function () {
        this.listeners = {};
      };

      return d.prototype.on = function (a, b) {
        this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b];
      }, d.prototype.trigger = function (a) {
        var b = Array.prototype.slice;
        this.listeners = this.listeners || {}, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
      }, d.prototype.invoke = function (a, b) {
        for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b);
      }, c.Observable = d, c.generateChars = function (a) {
        for (var b = "", c = 0; a > c; c++) {
          var d = Math.floor(36 * Math.random());
          b += d.toString(36);
        }

        return b;
      }, c.bind = function (a, b) {
        return function () {
          a.apply(b, arguments);
        };
      }, c._convertData = function (a) {
        for (var b in a) {
          var c = b.split("-"),
              d = a;

          if (1 !== c.length) {
            for (var e = 0; e < c.length; e++) {
              var f = c[e];
              f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f];
            }

            delete a[b];
          }
        }

        return a;
      }, c.hasScroll = function (b, c) {
        var d = a(c),
            e = c.style.overflowX,
            f = c.style.overflowY;
        return e !== f || "hidden" !== f && "visible" !== f ? "scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth : !1;
      }, c.escapeMarkup = function (a) {
        var b = {
          "\\": "&#92;",
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#47;"
        };
        return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function (a) {
          return b[a];
        });
      }, c.appendMany = function (b, c) {
        if ("1.7" === a.fn.jquery.substr(0, 3)) {
          var d = a();
          a.map(c, function (a) {
            d = d.add(a);
          }), c = d;
        }

        b.append(c);
      }, c;
    }), b.define("select2/results", ["jquery", "./utils"], function (a, b) {
      function c(a, b, d) {
        this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this);
      }

      return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<ul class="select2-results__options" role="tree"></ul>');
        return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b;
      }, c.prototype.clear = function () {
        this.$results.empty();
      }, c.prototype.displayMessage = function (b) {
        var c = this.options.get("escapeMarkup");
        this.clear(), this.hideLoading();
        var d = a('<li role="treeitem" class="select2-results__option"></li>'),
            e = this.options.get("translations").get(b.message);
        d.append(c(e(b.args))), this.$results.append(d);
      }, c.prototype.append = function (a) {
        this.hideLoading();
        var b = [];
        if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", {
          message: "noResults"
        }));
        a.results = this.sort(a.results);

        for (var c = 0; c < a.results.length; c++) {
          var d = a.results[c],
              e = this.option(d);
          b.push(e);
        }

        this.$results.append(b);
      }, c.prototype.position = function (a, b) {
        var c = b.find(".select2-results");
        c.append(a);
      }, c.prototype.sort = function (a) {
        var b = this.options.get("sorter");
        return b(a);
      }, c.prototype.setClasses = function () {
        var b = this;
        this.data.current(function (c) {
          var d = a.map(c, function (a) {
            return a.id.toString();
          }),
              e = b.$results.find(".select2-results__option[aria-selected]");
          e.each(function () {
            var b = a(this),
                c = a.data(this, "data"),
                e = "" + c.id;
            null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false");
          });
          var f = e.filter("[aria-selected=true]");
          f.length > 0 ? f.first().trigger("mouseenter") : e.first().trigger("mouseenter");
        });
      }, c.prototype.showLoading = function (a) {
        this.hideLoading();
        var b = this.options.get("translations").get("searching"),
            c = {
          disabled: !0,
          loading: !0,
          text: b(a)
        },
            d = this.option(c);
        d.className += " loading-results", this.$results.prepend(d);
      }, c.prototype.hideLoading = function () {
        this.$results.find(".loading-results").remove();
      }, c.prototype.option = function (b) {
        var c = document.createElement("li");
        c.className = "select2-results__option";
        var d = {
          role: "treeitem",
          "aria-selected": "false"
        };
        b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]);

        for (var e in d) {
          var f = d[e];
          c.setAttribute(e, f);
        }

        if (b.children) {
          var g = a(c),
              h = document.createElement("strong");
          h.className = "select2-results__group";
          {
            a(h);
          }
          this.template(b, h);

          for (var i = [], j = 0; j < b.children.length; j++) {
            var k = b.children[j],
                l = this.option(k);
            i.push(l);
          }

          var m = a("<ul></ul>", {
            "class": "select2-results__options select2-results__options--nested"
          });
          m.append(i), g.append(h), g.append(m);
        } else this.template(b, c);

        return a.data(c, "data", b), c;
      }, c.prototype.bind = function (b) {
        var c = this,
            d = b.id + "-results";
        this.$results.attr("id", d), b.on("results:all", function (a) {
          c.clear(), c.append(a.data), b.isOpen() && c.setClasses();
        }), b.on("results:append", function (a) {
          c.append(a.data), b.isOpen() && c.setClasses();
        }), b.on("query", function (a) {
          c.showLoading(a);
        }), b.on("select", function () {
          b.isOpen() && c.setClasses();
        }), b.on("unselect", function () {
          b.isOpen() && c.setClasses();
        }), b.on("open", function () {
          c.$results.attr("aria-expanded", "true"), c.$results.attr("aria-hidden", "false"), c.setClasses(), c.ensureHighlightVisible();
        }), b.on("close", function () {
          c.$results.attr("aria-expanded", "false"), c.$results.attr("aria-hidden", "true"), c.$results.removeAttr("aria-activedescendant");
        }), b.on("results:toggle", function () {
          var a = c.getHighlightedResults();
          0 !== a.length && a.trigger("mouseup");
        }), b.on("results:select", function () {
          var a = c.getHighlightedResults();

          if (0 !== a.length) {
            var b = a.data("data");
            "true" == a.attr("aria-selected") ? c.trigger("close") : c.trigger("select", {
              data: b
            });
          }
        }), b.on("results:previous", function () {
          var a = c.getHighlightedResults(),
              b = c.$results.find("[aria-selected]"),
              d = b.index(a);

          if (0 !== d) {
            var e = d - 1;
            0 === a.length && (e = 0);
            var f = b.eq(e);
            f.trigger("mouseenter");
            var g = c.$results.offset().top,
                h = f.offset().top,
                i = c.$results.scrollTop() + (h - g);
            0 === e ? c.$results.scrollTop(0) : 0 > h - g && c.$results.scrollTop(i);
          }
        }), b.on("results:next", function () {
          var a = c.getHighlightedResults(),
              b = c.$results.find("[aria-selected]"),
              d = b.index(a),
              e = d + 1;

          if (!(e >= b.length)) {
            var f = b.eq(e);
            f.trigger("mouseenter");
            var g = c.$results.offset().top + c.$results.outerHeight(!1),
                h = f.offset().top + f.outerHeight(!1),
                i = c.$results.scrollTop() + h - g;
            0 === e ? c.$results.scrollTop(0) : h > g && c.$results.scrollTop(i);
          }
        }), b.on("results:focus", function (a) {
          a.element.addClass("select2-results__option--highlighted");
        }), b.on("results:message", function (a) {
          c.displayMessage(a);
        }), a.fn.mousewheel && this.$results.on("mousewheel", function (a) {
          var b = c.$results.scrollTop(),
              d = c.$results.get(0).scrollHeight - c.$results.scrollTop() + a.deltaY,
              e = a.deltaY > 0 && b - a.deltaY <= 0,
              f = a.deltaY < 0 && d <= c.$results.height();
          e ? (c.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (c.$results.scrollTop(c.$results.get(0).scrollHeight - c.$results.height()), a.preventDefault(), a.stopPropagation());
        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) {
          var d = a(this),
              e = d.data("data");
          return "true" === d.attr("aria-selected") ? void (c.options.get("multiple") ? c.trigger("unselect", {
            originalEvent: b,
            data: e
          }) : c.trigger("close")) : void c.trigger("select", {
            originalEvent: b,
            data: e
          });
        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function () {
          var b = a(this).data("data");
          c.getHighlightedResults().removeClass("select2-results__option--highlighted"), c.trigger("results:focus", {
            data: b,
            element: a(this)
          });
        });
      }, c.prototype.getHighlightedResults = function () {
        var a = this.$results.find(".select2-results__option--highlighted");
        return a;
      }, c.prototype.destroy = function () {
        this.$results.remove();
      }, c.prototype.ensureHighlightVisible = function () {
        var a = this.getHighlightedResults();

        if (0 !== a.length) {
          var b = this.$results.find("[aria-selected]"),
              c = b.index(a),
              d = this.$results.offset().top,
              e = a.offset().top,
              f = this.$results.scrollTop() + (e - d),
              g = e - d;
          f -= 2 * a.outerHeight(!1), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f);
        }
      }, c.prototype.template = function (b, c) {
        var d = this.options.get("templateResult"),
            e = this.options.get("escapeMarkup"),
            f = d(b);
        null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f);
      }, c;
    }), b.define("select2/keys", [], function () {
      var a = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DELETE: 46
      };
      return a;
    }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }

      return b.Extend(d, b.Observable), d.prototype.render = function () {
        var b = a('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');
        return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b;
      }, d.prototype.bind = function (a) {
        var b = this,
            d = (a.id + "-container", a.id + "-results");
        this.container = a, this.$selection.on("focus", function (a) {
          b.trigger("focus", a);
        }), this.$selection.on("blur", function (a) {
          b.trigger("blur", a);
        }), this.$selection.on("keydown", function (a) {
          b.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
        }), a.on("results:focus", function (a) {
          b.$selection.attr("aria-activedescendant", a.data._resultId);
        }), a.on("selection:update", function (a) {
          b.update(a.data);
        }), a.on("open", function () {
          b.$selection.attr("aria-expanded", "true"), b.$selection.attr("aria-owns", d), b._attachCloseHandler(a);
        }), a.on("close", function () {
          b.$selection.attr("aria-expanded", "false"), b.$selection.removeAttr("aria-activedescendant"), b.$selection.removeAttr("aria-owns"), b.$selection.focus(), b._detachCloseHandler(a);
        }), a.on("enable", function () {
          b.$selection.attr("tabindex", b._tabindex);
        }), a.on("disable", function () {
          b.$selection.attr("tabindex", "-1");
        });
      }, d.prototype._attachCloseHandler = function (b) {
        a(document.body).on("mousedown.select2." + b.id, function (b) {
          var c = a(b.target),
              d = c.closest(".select2"),
              e = a(".select2.select2-container--open");
          e.each(function () {
            var b = a(this);

            if (this != d[0]) {
              var c = b.data("element");
              c.select2("close");
            }
          });
        });
      }, d.prototype._detachCloseHandler = function (b) {
        a(document.body).off("mousedown.select2." + b.id);
      }, d.prototype.position = function (a, b) {
        var c = b.find(".selection");
        c.append(a);
      }, d.prototype.destroy = function () {
        this._detachCloseHandler(this.container);
      }, d.prototype.update = function () {
        throw new Error("The `update` method must be defined in child classes.");
      }, d;
    }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c) {
      function d() {
        d.__super__.constructor.apply(this, arguments);
      }

      return c.Extend(d, b), d.prototype.render = function () {
        var a = d.__super__.render.call(this);

        return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
      }, d.prototype.bind = function (a) {
        var b = this;

        d.__super__.bind.apply(this, arguments);

        var c = a.id + "-container";
        this.$selection.find(".select2-selection__rendered").attr("id", c), this.$selection.attr("aria-labelledby", c), this.$selection.on("mousedown", function (a) {
          1 === a.which && b.trigger("toggle", {
            originalEvent: a
          });
        }), this.$selection.on("focus", function () {}), this.$selection.on("blur", function () {}), a.on("selection:update", function (a) {
          b.update(a.data);
        });
      }, d.prototype.clear = function () {
        this.$selection.find(".select2-selection__rendered").empty();
      }, d.prototype.display = function (a) {
        var b = this.options.get("templateSelection"),
            c = this.options.get("escapeMarkup");
        return c(b(a));
      }, d.prototype.selectionContainer = function () {
        return a("<span></span>");
      }, d.prototype.update = function (a) {
        if (0 === a.length) return void this.clear();
        var b = a[0],
            c = this.display(b),
            d = this.$selection.find(".select2-selection__rendered");
        d.empty().append(c), d.prop("title", b.title || b.text);
      }, d;
    }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
      function d() {
        d.__super__.constructor.apply(this, arguments);
      }

      return c.Extend(d, b), d.prototype.render = function () {
        var a = d.__super__.render.call(this);

        return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
      }, d.prototype.bind = function () {
        var b = this;
        d.__super__.bind.apply(this, arguments), this.$selection.on("click", function (a) {
          b.trigger("toggle", {
            originalEvent: a
          });
        }), this.$selection.on("click", ".select2-selection__choice__remove", function (c) {
          var d = a(this),
              e = d.parent(),
              f = e.data("data");
          b.trigger("unselect", {
            originalEvent: c,
            data: f
          });
        });
      }, d.prototype.clear = function () {
        this.$selection.find(".select2-selection__rendered").empty();
      }, d.prototype.display = function (a) {
        var b = this.options.get("templateSelection"),
            c = this.options.get("escapeMarkup");
        return c(b(a));
      }, d.prototype.selectionContainer = function () {
        var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
        return b;
      }, d.prototype.update = function (a) {
        if (this.clear(), 0 !== a.length) {
          for (var b = [], d = 0; d < a.length; d++) {
            var e = a[d],
                f = this.display(e),
                g = this.selectionContainer();
            g.append(f), g.prop("title", e.title || e.text), g.data("data", e), b.push(g);
          }

          var h = this.$selection.find(".select2-selection__rendered");
          c.appendMany(h, b);
        }
      }, d;
    }), b.define("select2/selection/placeholder", ["../utils"], function () {
      function a(a, b, c) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c);
      }

      return a.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = {
          id: "",
          text: b
        }), b;
      }, a.prototype.createPlaceholder = function (a, b) {
        var c = this.selectionContainer();
        return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
      }, a.prototype.update = function (a, b) {
        var c = 1 == b.length && b[0].id != this.placeholder.id,
            d = b.length > 1;
        if (d || c) return a.call(this, b);
        this.clear();
        var e = this.createPlaceholder(this.placeholder);
        this.$selection.find(".select2-selection__rendered").append(e);
      }, a;
    }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) {
      function c() {}

      return c.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
          d._handleClear(a);
        }), b.on("keypress", function (a) {
          d._handleKeyboardClear(a, b);
        });
      }, c.prototype._handleClear = function (a, b) {
        if (!this.options.get("disabled")) {
          var c = this.$selection.find(".select2-selection__clear");

          if (0 !== c.length) {
            b.stopPropagation();

            for (var d = c.data("data"), e = 0; e < d.length; e++) {
              var f = {
                data: d[e]
              };
              if (this.trigger("unselect", f), f.prevented) return;
            }

            this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle");
          }
        }
      }, c.prototype._handleKeyboardClear = function (a, c, d) {
        d.isOpen() || (c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c);
      }, c.prototype.update = function (b, c) {
        if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) {
          var d = a('<span class="select2-selection__clear">&times;</span>');
          d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d);
        }
      }, c;
    }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
      function d(a, b, c) {
        a.call(this, b, c);
      }

      return d.prototype.render = function (b) {
        var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');
        this.$searchContainer = c, this.$search = c.find("input");
        var d = b.call(this);
        return d;
      }, d.prototype.bind = function (a, b, d) {
        var e = this;
        a.call(this, b, d), b.on("open", function () {
          e.$search.attr("tabindex", 0), e.$search.focus();
        }), b.on("close", function () {
          e.$search.attr("tabindex", -1), e.$search.val(""), e.$search.focus();
        }), b.on("enable", function () {
          e.$search.prop("disabled", !1);
        }), b.on("disable", function () {
          e.$search.prop("disabled", !0);
        }), this.$selection.on("focusin", ".select2-search--inline", function (a) {
          e.trigger("focus", a);
        }), this.$selection.on("focusout", ".select2-search--inline", function (a) {
          e.trigger("blur", a);
        }), this.$selection.on("keydown", ".select2-search--inline", function (a) {
          a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
          var b = a.which;

          if (b === c.BACKSPACE && "" === e.$search.val()) {
            var d = e.$searchContainer.prev(".select2-selection__choice");

            if (d.length > 0) {
              var f = d.data("data");
              e.searchRemoveChoice(f), a.preventDefault();
            }
          }
        }), this.$selection.on("input", ".select2-search--inline", function () {
          e.$selection.off("keyup.search");
        }), this.$selection.on("keyup.search input", ".select2-search--inline", function (a) {
          e.handleSearch(a);
        });
      }, d.prototype.createPlaceholder = function (a, b) {
        this.$search.attr("placeholder", b.text);
      }, d.prototype.update = function (a, b) {
        this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch();
      }, d.prototype.handleSearch = function () {
        if (this.resizeSearch(), !this._keyUpPrevented) {
          var a = this.$search.val();
          this.trigger("query", {
            term: a
          });
        }

        this._keyUpPrevented = !1;
      }, d.prototype.searchRemoveChoice = function (a, b) {
        this.trigger("unselect", {
          data: b
        }), this.trigger("open"), this.$search.val(b.text + " ");
      }, d.prototype.resizeSearch = function () {
        this.$search.css("width", "25px");
        var a = "";
        if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();else {
          var b = this.$search.val().length + 1;
          a = .75 * b + "em";
        }
        this.$search.css("width", a);
      }, d;
    }), b.define("select2/selection/eventRelay", ["jquery"], function (a) {
      function b() {}

      return b.prototype.bind = function (b, c, d) {
        var e = this,
            f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
            g = ["opening", "closing", "selecting", "unselecting"];
        b.call(this, c, d), c.on("*", function (b, c) {
          if (-1 !== a.inArray(b, f)) {
            c = c || {};
            var d = a.Event("select2:" + b, {
              params: c
            });
            e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
          }
        });
      }, b;
    }), b.define("select2/translation", ["jquery", "require"], function (a, b) {
      function c(a) {
        this.dict = a || {};
      }

      return c.prototype.all = function () {
        return this.dict;
      }, c.prototype.get = function (a) {
        return this.dict[a];
      }, c.prototype.extend = function (b) {
        this.dict = a.extend({}, b.all(), this.dict);
      }, c._cache = {}, c.loadPath = function (a) {
        if (!(a in c._cache)) {
          var d = b(a);
          c._cache[a] = d;
        }

        return new c(c._cache[a]);
      }, c;
    }), b.define("select2/diacritics", [], function () {
      var a = {
        "Ⓐ": "A",
        "Ａ": "A",
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ầ": "A",
        "Ấ": "A",
        "Ẫ": "A",
        "Ẩ": "A",
        "Ã": "A",
        "Ā": "A",
        "Ă": "A",
        "Ằ": "A",
        "Ắ": "A",
        "Ẵ": "A",
        "Ẳ": "A",
        "Ȧ": "A",
        "Ǡ": "A",
        "Ä": "A",
        "Ǟ": "A",
        "Ả": "A",
        "Å": "A",
        "Ǻ": "A",
        "Ǎ": "A",
        "Ȁ": "A",
        "Ȃ": "A",
        "Ạ": "A",
        "Ậ": "A",
        "Ặ": "A",
        "Ḁ": "A",
        "Ą": "A",
        "Ⱥ": "A",
        "Ɐ": "A",
        "Ꜳ": "AA",
        "Æ": "AE",
        "Ǽ": "AE",
        "Ǣ": "AE",
        "Ꜵ": "AO",
        "Ꜷ": "AU",
        "Ꜹ": "AV",
        "Ꜻ": "AV",
        "Ꜽ": "AY",
        "Ⓑ": "B",
        "Ｂ": "B",
        "Ḃ": "B",
        "Ḅ": "B",
        "Ḇ": "B",
        "Ƀ": "B",
        "Ƃ": "B",
        "Ɓ": "B",
        "Ⓒ": "C",
        "Ｃ": "C",
        "Ć": "C",
        "Ĉ": "C",
        "Ċ": "C",
        "Č": "C",
        "Ç": "C",
        "Ḉ": "C",
        "Ƈ": "C",
        "Ȼ": "C",
        "Ꜿ": "C",
        "Ⓓ": "D",
        "Ｄ": "D",
        "Ḋ": "D",
        "Ď": "D",
        "Ḍ": "D",
        "Ḑ": "D",
        "Ḓ": "D",
        "Ḏ": "D",
        "Đ": "D",
        "Ƌ": "D",
        "Ɗ": "D",
        "Ɖ": "D",
        "Ꝺ": "D",
        "Ǳ": "DZ",
        "Ǆ": "DZ",
        "ǲ": "Dz",
        "ǅ": "Dz",
        "Ⓔ": "E",
        "Ｅ": "E",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ề": "E",
        "Ế": "E",
        "Ễ": "E",
        "Ể": "E",
        "Ẽ": "E",
        "Ē": "E",
        "Ḕ": "E",
        "Ḗ": "E",
        "Ĕ": "E",
        "Ė": "E",
        "Ë": "E",
        "Ẻ": "E",
        "Ě": "E",
        "Ȅ": "E",
        "Ȇ": "E",
        "Ẹ": "E",
        "Ệ": "E",
        "Ȩ": "E",
        "Ḝ": "E",
        "Ę": "E",
        "Ḙ": "E",
        "Ḛ": "E",
        "Ɛ": "E",
        "Ǝ": "E",
        "Ⓕ": "F",
        "Ｆ": "F",
        "Ḟ": "F",
        "Ƒ": "F",
        "Ꝼ": "F",
        "Ⓖ": "G",
        "Ｇ": "G",
        "Ǵ": "G",
        "Ĝ": "G",
        "Ḡ": "G",
        "Ğ": "G",
        "Ġ": "G",
        "Ǧ": "G",
        "Ģ": "G",
        "Ǥ": "G",
        "Ɠ": "G",
        "Ꞡ": "G",
        "Ᵹ": "G",
        "Ꝿ": "G",
        "Ⓗ": "H",
        "Ｈ": "H",
        "Ĥ": "H",
        "Ḣ": "H",
        "Ḧ": "H",
        "Ȟ": "H",
        "Ḥ": "H",
        "Ḩ": "H",
        "Ḫ": "H",
        "Ħ": "H",
        "Ⱨ": "H",
        "Ⱶ": "H",
        "Ɥ": "H",
        "Ⓘ": "I",
        "Ｉ": "I",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ĩ": "I",
        "Ī": "I",
        "Ĭ": "I",
        "İ": "I",
        "Ï": "I",
        "Ḯ": "I",
        "Ỉ": "I",
        "Ǐ": "I",
        "Ȉ": "I",
        "Ȋ": "I",
        "Ị": "I",
        "Į": "I",
        "Ḭ": "I",
        "Ɨ": "I",
        "Ⓙ": "J",
        "Ｊ": "J",
        "Ĵ": "J",
        "Ɉ": "J",
        "Ⓚ": "K",
        "Ｋ": "K",
        "Ḱ": "K",
        "Ǩ": "K",
        "Ḳ": "K",
        "Ķ": "K",
        "Ḵ": "K",
        "Ƙ": "K",
        "Ⱪ": "K",
        "Ꝁ": "K",
        "Ꝃ": "K",
        "Ꝅ": "K",
        "Ꞣ": "K",
        "Ⓛ": "L",
        "Ｌ": "L",
        "Ŀ": "L",
        "Ĺ": "L",
        "Ľ": "L",
        "Ḷ": "L",
        "Ḹ": "L",
        "Ļ": "L",
        "Ḽ": "L",
        "Ḻ": "L",
        "Ł": "L",
        "Ƚ": "L",
        "Ɫ": "L",
        "Ⱡ": "L",
        "Ꝉ": "L",
        "Ꝇ": "L",
        "Ꞁ": "L",
        "Ǉ": "LJ",
        "ǈ": "Lj",
        "Ⓜ": "M",
        "Ｍ": "M",
        "Ḿ": "M",
        "Ṁ": "M",
        "Ṃ": "M",
        "Ɱ": "M",
        "Ɯ": "M",
        "Ⓝ": "N",
        "Ｎ": "N",
        "Ǹ": "N",
        "Ń": "N",
        "Ñ": "N",
        "Ṅ": "N",
        "Ň": "N",
        "Ṇ": "N",
        "Ņ": "N",
        "Ṋ": "N",
        "Ṉ": "N",
        "Ƞ": "N",
        "Ɲ": "N",
        "Ꞑ": "N",
        "Ꞥ": "N",
        "Ǌ": "NJ",
        "ǋ": "Nj",
        "Ⓞ": "O",
        "Ｏ": "O",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Ồ": "O",
        "Ố": "O",
        "Ỗ": "O",
        "Ổ": "O",
        "Õ": "O",
        "Ṍ": "O",
        "Ȭ": "O",
        "Ṏ": "O",
        "Ō": "O",
        "Ṑ": "O",
        "Ṓ": "O",
        "Ŏ": "O",
        "Ȯ": "O",
        "Ȱ": "O",
        "Ö": "O",
        "Ȫ": "O",
        "Ỏ": "O",
        "Ő": "O",
        "Ǒ": "O",
        "Ȍ": "O",
        "Ȏ": "O",
        "Ơ": "O",
        "Ờ": "O",
        "Ớ": "O",
        "Ỡ": "O",
        "Ở": "O",
        "Ợ": "O",
        "Ọ": "O",
        "Ộ": "O",
        "Ǫ": "O",
        "Ǭ": "O",
        "Ø": "O",
        "Ǿ": "O",
        "Ɔ": "O",
        "Ɵ": "O",
        "Ꝋ": "O",
        "Ꝍ": "O",
        "Ƣ": "OI",
        "Ꝏ": "OO",
        "Ȣ": "OU",
        "Ⓟ": "P",
        "Ｐ": "P",
        "Ṕ": "P",
        "Ṗ": "P",
        "Ƥ": "P",
        "Ᵽ": "P",
        "Ꝑ": "P",
        "Ꝓ": "P",
        "Ꝕ": "P",
        "Ⓠ": "Q",
        "Ｑ": "Q",
        "Ꝗ": "Q",
        "Ꝙ": "Q",
        "Ɋ": "Q",
        "Ⓡ": "R",
        "Ｒ": "R",
        "Ŕ": "R",
        "Ṙ": "R",
        "Ř": "R",
        "Ȑ": "R",
        "Ȓ": "R",
        "Ṛ": "R",
        "Ṝ": "R",
        "Ŗ": "R",
        "Ṟ": "R",
        "Ɍ": "R",
        "Ɽ": "R",
        "Ꝛ": "R",
        "Ꞧ": "R",
        "Ꞃ": "R",
        "Ⓢ": "S",
        "Ｓ": "S",
        "ẞ": "S",
        "Ś": "S",
        "Ṥ": "S",
        "Ŝ": "S",
        "Ṡ": "S",
        "Š": "S",
        "Ṧ": "S",
        "Ṣ": "S",
        "Ṩ": "S",
        "Ș": "S",
        "Ş": "S",
        "Ȿ": "S",
        "Ꞩ": "S",
        "Ꞅ": "S",
        "Ⓣ": "T",
        "Ｔ": "T",
        "Ṫ": "T",
        "Ť": "T",
        "Ṭ": "T",
        "Ț": "T",
        "Ţ": "T",
        "Ṱ": "T",
        "Ṯ": "T",
        "Ŧ": "T",
        "Ƭ": "T",
        "Ʈ": "T",
        "Ⱦ": "T",
        "Ꞇ": "T",
        "Ꜩ": "TZ",
        "Ⓤ": "U",
        "Ｕ": "U",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ũ": "U",
        "Ṹ": "U",
        "Ū": "U",
        "Ṻ": "U",
        "Ŭ": "U",
        "Ü": "U",
        "Ǜ": "U",
        "Ǘ": "U",
        "Ǖ": "U",
        "Ǚ": "U",
        "Ủ": "U",
        "Ů": "U",
        "Ű": "U",
        "Ǔ": "U",
        "Ȕ": "U",
        "Ȗ": "U",
        "Ư": "U",
        "Ừ": "U",
        "Ứ": "U",
        "Ữ": "U",
        "Ử": "U",
        "Ự": "U",
        "Ụ": "U",
        "Ṳ": "U",
        "Ų": "U",
        "Ṷ": "U",
        "Ṵ": "U",
        "Ʉ": "U",
        "Ⓥ": "V",
        "Ｖ": "V",
        "Ṽ": "V",
        "Ṿ": "V",
        "Ʋ": "V",
        "Ꝟ": "V",
        "Ʌ": "V",
        "Ꝡ": "VY",
        "Ⓦ": "W",
        "Ｗ": "W",
        "Ẁ": "W",
        "Ẃ": "W",
        "Ŵ": "W",
        "Ẇ": "W",
        "Ẅ": "W",
        "Ẉ": "W",
        "Ⱳ": "W",
        "Ⓧ": "X",
        "Ｘ": "X",
        "Ẋ": "X",
        "Ẍ": "X",
        "Ⓨ": "Y",
        "Ｙ": "Y",
        "Ỳ": "Y",
        "Ý": "Y",
        "Ŷ": "Y",
        "Ỹ": "Y",
        "Ȳ": "Y",
        "Ẏ": "Y",
        "Ÿ": "Y",
        "Ỷ": "Y",
        "Ỵ": "Y",
        "Ƴ": "Y",
        "Ɏ": "Y",
        "Ỿ": "Y",
        "Ⓩ": "Z",
        "Ｚ": "Z",
        "Ź": "Z",
        "Ẑ": "Z",
        "Ż": "Z",
        "Ž": "Z",
        "Ẓ": "Z",
        "Ẕ": "Z",
        "Ƶ": "Z",
        "Ȥ": "Z",
        "Ɀ": "Z",
        "Ⱬ": "Z",
        "Ꝣ": "Z",
        "ⓐ": "a",
        "ａ": "a",
        "ẚ": "a",
        "à": "a",
        "á": "a",
        "â": "a",
        "ầ": "a",
        "ấ": "a",
        "ẫ": "a",
        "ẩ": "a",
        "ã": "a",
        "ā": "a",
        "ă": "a",
        "ằ": "a",
        "ắ": "a",
        "ẵ": "a",
        "ẳ": "a",
        "ȧ": "a",
        "ǡ": "a",
        "ä": "a",
        "ǟ": "a",
        "ả": "a",
        "å": "a",
        "ǻ": "a",
        "ǎ": "a",
        "ȁ": "a",
        "ȃ": "a",
        "ạ": "a",
        "ậ": "a",
        "ặ": "a",
        "ḁ": "a",
        "ą": "a",
        "ⱥ": "a",
        "ɐ": "a",
        "ꜳ": "aa",
        "æ": "ae",
        "ǽ": "ae",
        "ǣ": "ae",
        "ꜵ": "ao",
        "ꜷ": "au",
        "ꜹ": "av",
        "ꜻ": "av",
        "ꜽ": "ay",
        "ⓑ": "b",
        "ｂ": "b",
        "ḃ": "b",
        "ḅ": "b",
        "ḇ": "b",
        "ƀ": "b",
        "ƃ": "b",
        "ɓ": "b",
        "ⓒ": "c",
        "ｃ": "c",
        "ć": "c",
        "ĉ": "c",
        "ċ": "c",
        "č": "c",
        "ç": "c",
        "ḉ": "c",
        "ƈ": "c",
        "ȼ": "c",
        "ꜿ": "c",
        "ↄ": "c",
        "ⓓ": "d",
        "ｄ": "d",
        "ḋ": "d",
        "ď": "d",
        "ḍ": "d",
        "ḑ": "d",
        "ḓ": "d",
        "ḏ": "d",
        "đ": "d",
        "ƌ": "d",
        "ɖ": "d",
        "ɗ": "d",
        "ꝺ": "d",
        "ǳ": "dz",
        "ǆ": "dz",
        "ⓔ": "e",
        "ｅ": "e",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ề": "e",
        "ế": "e",
        "ễ": "e",
        "ể": "e",
        "ẽ": "e",
        "ē": "e",
        "ḕ": "e",
        "ḗ": "e",
        "ĕ": "e",
        "ė": "e",
        "ë": "e",
        "ẻ": "e",
        "ě": "e",
        "ȅ": "e",
        "ȇ": "e",
        "ẹ": "e",
        "ệ": "e",
        "ȩ": "e",
        "ḝ": "e",
        "ę": "e",
        "ḙ": "e",
        "ḛ": "e",
        "ɇ": "e",
        "ɛ": "e",
        "ǝ": "e",
        "ⓕ": "f",
        "ｆ": "f",
        "ḟ": "f",
        "ƒ": "f",
        "ꝼ": "f",
        "ⓖ": "g",
        "ｇ": "g",
        "ǵ": "g",
        "ĝ": "g",
        "ḡ": "g",
        "ğ": "g",
        "ġ": "g",
        "ǧ": "g",
        "ģ": "g",
        "ǥ": "g",
        "ɠ": "g",
        "ꞡ": "g",
        "ᵹ": "g",
        "ꝿ": "g",
        "ⓗ": "h",
        "ｈ": "h",
        "ĥ": "h",
        "ḣ": "h",
        "ḧ": "h",
        "ȟ": "h",
        "ḥ": "h",
        "ḩ": "h",
        "ḫ": "h",
        "ẖ": "h",
        "ħ": "h",
        "ⱨ": "h",
        "ⱶ": "h",
        "ɥ": "h",
        "ƕ": "hv",
        "ⓘ": "i",
        "ｉ": "i",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ĩ": "i",
        "ī": "i",
        "ĭ": "i",
        "ï": "i",
        "ḯ": "i",
        "ỉ": "i",
        "ǐ": "i",
        "ȉ": "i",
        "ȋ": "i",
        "ị": "i",
        "į": "i",
        "ḭ": "i",
        "ɨ": "i",
        "ı": "i",
        "ⓙ": "j",
        "ｊ": "j",
        "ĵ": "j",
        "ǰ": "j",
        "ɉ": "j",
        "ⓚ": "k",
        "ｋ": "k",
        "ḱ": "k",
        "ǩ": "k",
        "ḳ": "k",
        "ķ": "k",
        "ḵ": "k",
        "ƙ": "k",
        "ⱪ": "k",
        "ꝁ": "k",
        "ꝃ": "k",
        "ꝅ": "k",
        "ꞣ": "k",
        "ⓛ": "l",
        "ｌ": "l",
        "ŀ": "l",
        "ĺ": "l",
        "ľ": "l",
        "ḷ": "l",
        "ḹ": "l",
        "ļ": "l",
        "ḽ": "l",
        "ḻ": "l",
        "ſ": "l",
        "ł": "l",
        "ƚ": "l",
        "ɫ": "l",
        "ⱡ": "l",
        "ꝉ": "l",
        "ꞁ": "l",
        "ꝇ": "l",
        "ǉ": "lj",
        "ⓜ": "m",
        "ｍ": "m",
        "ḿ": "m",
        "ṁ": "m",
        "ṃ": "m",
        "ɱ": "m",
        "ɯ": "m",
        "ⓝ": "n",
        "ｎ": "n",
        "ǹ": "n",
        "ń": "n",
        "ñ": "n",
        "ṅ": "n",
        "ň": "n",
        "ṇ": "n",
        "ņ": "n",
        "ṋ": "n",
        "ṉ": "n",
        "ƞ": "n",
        "ɲ": "n",
        "ŉ": "n",
        "ꞑ": "n",
        "ꞥ": "n",
        "ǌ": "nj",
        "ⓞ": "o",
        "ｏ": "o",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "ồ": "o",
        "ố": "o",
        "ỗ": "o",
        "ổ": "o",
        "õ": "o",
        "ṍ": "o",
        "ȭ": "o",
        "ṏ": "o",
        "ō": "o",
        "ṑ": "o",
        "ṓ": "o",
        "ŏ": "o",
        "ȯ": "o",
        "ȱ": "o",
        "ö": "o",
        "ȫ": "o",
        "ỏ": "o",
        "ő": "o",
        "ǒ": "o",
        "ȍ": "o",
        "ȏ": "o",
        "ơ": "o",
        "ờ": "o",
        "ớ": "o",
        "ỡ": "o",
        "ở": "o",
        "ợ": "o",
        "ọ": "o",
        "ộ": "o",
        "ǫ": "o",
        "ǭ": "o",
        "ø": "o",
        "ǿ": "o",
        "ɔ": "o",
        "ꝋ": "o",
        "ꝍ": "o",
        "ɵ": "o",
        "ƣ": "oi",
        "ȣ": "ou",
        "ꝏ": "oo",
        "ⓟ": "p",
        "ｐ": "p",
        "ṕ": "p",
        "ṗ": "p",
        "ƥ": "p",
        "ᵽ": "p",
        "ꝑ": "p",
        "ꝓ": "p",
        "ꝕ": "p",
        "ⓠ": "q",
        "ｑ": "q",
        "ɋ": "q",
        "ꝗ": "q",
        "ꝙ": "q",
        "ⓡ": "r",
        "ｒ": "r",
        "ŕ": "r",
        "ṙ": "r",
        "ř": "r",
        "ȑ": "r",
        "ȓ": "r",
        "ṛ": "r",
        "ṝ": "r",
        "ŗ": "r",
        "ṟ": "r",
        "ɍ": "r",
        "ɽ": "r",
        "ꝛ": "r",
        "ꞧ": "r",
        "ꞃ": "r",
        "ⓢ": "s",
        "ｓ": "s",
        "ß": "s",
        "ś": "s",
        "ṥ": "s",
        "ŝ": "s",
        "ṡ": "s",
        "š": "s",
        "ṧ": "s",
        "ṣ": "s",
        "ṩ": "s",
        "ș": "s",
        "ş": "s",
        "ȿ": "s",
        "ꞩ": "s",
        "ꞅ": "s",
        "ẛ": "s",
        "ⓣ": "t",
        "ｔ": "t",
        "ṫ": "t",
        "ẗ": "t",
        "ť": "t",
        "ṭ": "t",
        "ț": "t",
        "ţ": "t",
        "ṱ": "t",
        "ṯ": "t",
        "ŧ": "t",
        "ƭ": "t",
        "ʈ": "t",
        "ⱦ": "t",
        "ꞇ": "t",
        "ꜩ": "tz",
        "ⓤ": "u",
        "ｕ": "u",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ũ": "u",
        "ṹ": "u",
        "ū": "u",
        "ṻ": "u",
        "ŭ": "u",
        "ü": "u",
        "ǜ": "u",
        "ǘ": "u",
        "ǖ": "u",
        "ǚ": "u",
        "ủ": "u",
        "ů": "u",
        "ű": "u",
        "ǔ": "u",
        "ȕ": "u",
        "ȗ": "u",
        "ư": "u",
        "ừ": "u",
        "ứ": "u",
        "ữ": "u",
        "ử": "u",
        "ự": "u",
        "ụ": "u",
        "ṳ": "u",
        "ų": "u",
        "ṷ": "u",
        "ṵ": "u",
        "ʉ": "u",
        "ⓥ": "v",
        "ｖ": "v",
        "ṽ": "v",
        "ṿ": "v",
        "ʋ": "v",
        "ꝟ": "v",
        "ʌ": "v",
        "ꝡ": "vy",
        "ⓦ": "w",
        "ｗ": "w",
        "ẁ": "w",
        "ẃ": "w",
        "ŵ": "w",
        "ẇ": "w",
        "ẅ": "w",
        "ẘ": "w",
        "ẉ": "w",
        "ⱳ": "w",
        "ⓧ": "x",
        "ｘ": "x",
        "ẋ": "x",
        "ẍ": "x",
        "ⓨ": "y",
        "ｙ": "y",
        "ỳ": "y",
        "ý": "y",
        "ŷ": "y",
        "ỹ": "y",
        "ȳ": "y",
        "ẏ": "y",
        "ÿ": "y",
        "ỷ": "y",
        "ẙ": "y",
        "ỵ": "y",
        "ƴ": "y",
        "ɏ": "y",
        "ỿ": "y",
        "ⓩ": "z",
        "ｚ": "z",
        "ź": "z",
        "ẑ": "z",
        "ż": "z",
        "ž": "z",
        "ẓ": "z",
        "ẕ": "z",
        "ƶ": "z",
        "ȥ": "z",
        "ɀ": "z",
        "ⱬ": "z",
        "ꝣ": "z",
        "Ά": "Α",
        "Έ": "Ε",
        "Ή": "Η",
        "Ί": "Ι",
        "Ϊ": "Ι",
        "Ό": "Ο",
        "Ύ": "Υ",
        "Ϋ": "Υ",
        "Ώ": "Ω",
        "ά": "α",
        "έ": "ε",
        "ή": "η",
        "ί": "ι",
        "ϊ": "ι",
        "ΐ": "ι",
        "ό": "ο",
        "ύ": "υ",
        "ϋ": "υ",
        "ΰ": "υ",
        "ω": "ω",
        "ς": "σ"
      };
      return a;
    }), b.define("select2/data/base", ["../utils"], function (a) {
      function b() {
        b.__super__.constructor.call(this);
      }

      return a.Extend(b, a.Observable), b.prototype.current = function () {
        throw new Error("The `current` method must be defined in child classes.");
      }, b.prototype.query = function () {
        throw new Error("The `query` method must be defined in child classes.");
      }, b.prototype.bind = function () {}, b.prototype.destroy = function () {}, b.prototype.generateResultId = function (b, c) {
        var d = b.id + "-result-";
        return d += a.generateChars(4), d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4);
      }, b;
    }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        this.$element = a, this.options = b, d.__super__.constructor.call(this);
      }

      return b.Extend(d, a), d.prototype.current = function (a) {
        var b = [],
            d = this;
        this.$element.find(":selected").each(function () {
          var a = c(this),
              e = d.item(a);
          b.push(e);
        }), a(b);
      }, d.prototype.select = function (a) {
        var b = this;
        if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
        if (this.$element.prop("multiple")) this.current(function (d) {
          var e = [];
          a = [a], a.push.apply(a, d);

          for (var f = 0; f < a.length; f++) {
            var g = a[f].id;
            -1 === c.inArray(g, e) && e.push(g);
          }

          b.$element.val(e), b.$element.trigger("change");
        });else {
          var d = a.id;
          this.$element.val(d), this.$element.trigger("change");
        }
      }, d.prototype.unselect = function (a) {
        var b = this;
        if (this.$element.prop("multiple")) return a.selected = !1, c(a.element).is("option") ? (a.element.selected = !1, void this.$element.trigger("change")) : void this.current(function (d) {
          for (var e = [], f = 0; f < d.length; f++) {
            var g = d[f].id;
            g !== a.id && -1 === c.inArray(g, e) && e.push(g);
          }

          b.$element.val(e), b.$element.trigger("change");
        });
      }, d.prototype.bind = function (a) {
        var b = this;
        this.container = a, a.on("select", function (a) {
          b.select(a.data);
        }), a.on("unselect", function (a) {
          b.unselect(a.data);
        });
      }, d.prototype.destroy = function () {
        this.$element.find("*").each(function () {
          c.removeData(this, "data");
        });
      }, d.prototype.query = function (a, b) {
        var d = [],
            e = this,
            f = this.$element.children();
        f.each(function () {
          var b = c(this);

          if (b.is("option") || b.is("optgroup")) {
            var f = e.item(b),
                g = e.matches(a, f);
            null !== g && d.push(g);
          }
        }), b({
          results: d
        });
      }, d.prototype.addOptions = function (a) {
        b.appendMany(this.$element, a);
      }, d.prototype.option = function (a) {
        var b;
        a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title);

        var d = c(b),
            e = this._normalizeItem(a);

        return e.element = b, c.data(b, "data", e), d;
      }, d.prototype.item = function (a) {
        var b = {};
        if (b = c.data(a[0], "data"), null != b) return b;
        if (a.is("option")) b = {
          id: a.val(),
          text: a.text(),
          disabled: a.prop("disabled"),
          selected: a.prop("selected"),
          title: a.prop("title")
        };else if (a.is("optgroup")) {
          b = {
            text: a.prop("label"),
            children: [],
            title: a.prop("title")
          };

          for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
            var g = c(d[f]),
                h = this.item(g);
            e.push(h);
          }

          b.children = e;
        }
        return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b;
      }, d.prototype._normalizeItem = function (a) {
        c.isPlainObject(a) || (a = {
          id: a,
          text: a
        }), a = c.extend({}, {
          text: ""
        }, a);
        var b = {
          selected: !1,
          disabled: !1
        };
        return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a);
      }, d.prototype.matches = function (a, b) {
        var c = this.options.get("matcher");
        return c(a, b);
      }, d;
    }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
      function d(a, b) {
        var c = b.get("data") || [];
        d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
      }

      return b.Extend(d, a), d.prototype.select = function (a) {
        var b = this.$element.find("option").filter(function (b, c) {
          return c.value == a.id.toString();
        });
        0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a);
      }, d.prototype.convertToOptions = function (a) {
        function d(a) {
          return function () {
            return c(this).val() == a.id;
          };
        }

        for (var e = this, f = this.$element.find("option"), g = f.map(function () {
          return e.item(c(this)).id;
        }).get(), h = [], i = 0; i < a.length; i++) {
          var j = this._normalizeItem(a[i]);

          if (c.inArray(j.id, g) >= 0) {
            var k = f.filter(d(j)),
                l = this.item(k),
                m = (c.extend(!0, {}, l, j), this.option(l));
            k.replaceWith(m);
          } else {
            var n = this.option(j);

            if (j.children) {
              var o = this.convertToOptions(j.children);
              b.appendMany(n, o);
            }

            h.push(n);
          }
        }

        return h;
      }, d;
    }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
      function d(b, c) {
        this.ajaxOptions = this._applyDefaults(c.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), a.__super__.constructor.call(this, b, c);
      }

      return b.Extend(d, a), d.prototype._applyDefaults = function (a) {
        var b = {
          data: function (a) {
            return {
              q: a.term
            };
          },
          transport: function (a, b, d) {
            var e = c.ajax(a);
            return e.then(b), e.fail(d), e;
          }
        };
        return c.extend({}, b, a, !0);
      }, d.prototype.processResults = function (a) {
        return a;
      }, d.prototype.query = function (a, b) {
        function d() {
          var d = f.transport(f, function (d) {
            var f = e.processResults(d, a);
            e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f);
          }, function () {});
          e._request = d;
        }

        var e = this;
        null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);
        var f = c.extend({
          type: "GET"
        }, this.ajaxOptions);
        "function" == typeof f.url && (f.url = f.url(a)), "function" == typeof f.data && (f.data = f.data(a)), this.ajaxOptions.delay && "" !== a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d();
      }, d;
    }), b.define("select2/data/tags", ["jquery"], function (a) {
      function b(b, c, d) {
        var e = d.get("tags"),
            f = d.get("createTag");
        if (void 0 !== f && (this.createTag = f), b.call(this, c, d), a.isArray(e)) for (var g = 0; g < e.length; g++) {
          var h = e[g],
              i = this._normalizeItem(h),
              j = this.option(i);

          this.$element.append(j);
        }
      }

      return b.prototype.query = function (a, b, c) {
        function d(a, f) {
          for (var g = a.results, h = 0; h < g.length; h++) {
            var i = g[h],
                j = null != i.children && !d({
              results: i.children
            }, !0),
                k = i.text === b.term;
            if (k || j) return f ? !1 : (a.data = g, void c(a));
          }

          if (f) return !0;
          var l = e.createTag(b);

          if (null != l) {
            var m = e.option(l);
            m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l);
          }

          a.results = g, c(a);
        }

        var e = this;
        return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d);
      }, b.prototype.createTag = function (b, c) {
        var d = a.trim(c.term);
        return "" === d ? null : {
          id: d,
          text: d
        };
      }, b.prototype.insertTag = function (a, b, c) {
        b.unshift(c);
      }, b.prototype._removeOldTags = function () {
        var b = (this._lastTag, this.$element.find("option[data-select2-tag]"));
        b.each(function () {
          this.selected || a(this).remove();
        });
      }, b;
    }), b.define("select2/data/tokenizer", ["jquery"], function (a) {
      function b(a, b, c) {
        var d = c.get("tokenizer");
        void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
      }

      return b.prototype.bind = function (a, b, c) {
        a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field");
      }, b.prototype.query = function (a, b, c) {
        function d(a) {
          e.select(a);
        }

        var e = this;
        b.term = b.term || "";
        var f = this.tokenizer(b, this.options, d);
        f.term !== b.term && (this.$search.length && (this.$search.val(f.term), this.$search.focus()), b.term = f.term), a.call(this, b, c);
      }, b.prototype.tokenizer = function (b, c, d, e) {
        for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function (a) {
          return {
            id: a.term,
            text: a.term
          };
        }; h < g.length;) {
          var j = g[h];

          if (-1 !== a.inArray(j, f)) {
            var k = g.substr(0, h),
                l = a.extend({}, c, {
              term: k
            }),
                m = i(l);
            e(m), g = g.substr(h + 1) || "", h = 0;
          } else h++;
        }

        return {
          term: g
        };
      }, b;
    }), b.define("select2/data/minimumInputLength", [], function () {
      function a(a, b, c) {
        this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        return b.term = b.term || "", b.term.length < this.minimumInputLength ? void this.trigger("results:message", {
          message: "inputTooShort",
          args: {
            minimum: this.minimumInputLength,
            input: b.term,
            params: b
          }
        }) : void a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumInputLength", [], function () {
      function a(a, b, c) {
        this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        return b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength ? void this.trigger("results:message", {
          message: "inputTooLong",
          args: {
            maximum: this.maximumInputLength,
            input: b.term,
            params: b
          }
        }) : void a.call(this, b, c);
      }, a;
    }), b.define("select2/data/maximumSelectionLength", [], function () {
      function a(a, b, c) {
        this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c);
      }

      return a.prototype.query = function (a, b, c) {
        var d = this;
        this.current(function (e) {
          var f = null != e ? e.length : 0;
          return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", {
            message: "maximumSelected",
            args: {
              maximum: d.maximumSelectionLength
            }
          }) : void a.call(d, b, c);
        });
      }, a;
    }), b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
      function c(a, b) {
        this.$element = a, this.options = b, c.__super__.constructor.call(this);
      }

      return b.Extend(c, b.Observable), c.prototype.render = function () {
        var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
        return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b;
      }, c.prototype.position = function () {}, c.prototype.destroy = function () {
        this.$dropdown.remove();
      }, c;
    }), b.define("select2/dropdown/search", ["jquery", "../utils"], function (a) {
      function b() {}

      return b.prototype.render = function (b) {
        var c = b.call(this),
            d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
        return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c;
      }, b.prototype.bind = function (b, c, d) {
        var e = this;
        b.call(this, c, d), this.$search.on("keydown", function (a) {
          e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
        }), this.$search.on("input", function () {
          a(this).off("keyup");
        }), this.$search.on("keyup input", function (a) {
          e.handleSearch(a);
        }), c.on("open", function () {
          e.$search.attr("tabindex", 0), e.$search.focus(), window.setTimeout(function () {
            e.$search.focus();
          }, 0);
        }), c.on("close", function () {
          e.$search.attr("tabindex", -1), e.$search.val("");
        }), c.on("results:all", function (a) {
          if (null == a.query.term || "" === a.query.term) {
            var b = e.showSearch(a);
            b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
          }
        });
      }, b.prototype.handleSearch = function () {
        if (!this._keyUpPrevented) {
          var a = this.$search.val();
          this.trigger("query", {
            term: a
          });
        }

        this._keyUpPrevented = !1;
      }, b.prototype.showSearch = function () {
        return !0;
      }, b;
    }), b.define("select2/dropdown/hidePlaceholder", [], function () {
      function a(a, b, c, d) {
        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d);
      }

      return a.prototype.append = function (a, b) {
        b.results = this.removePlaceholder(b.results), a.call(this, b);
      }, a.prototype.normalizePlaceholder = function (a, b) {
        return "string" == typeof b && (b = {
          id: "",
          text: b
        }), b;
      }, a.prototype.removePlaceholder = function (a, b) {
        for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
          var e = b[d];
          this.placeholder.id === e.id && c.splice(d, 1);
        }

        return c;
      }, a;
    }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
      function b(a, b, c, d) {
        this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1;
      }

      return b.prototype.append = function (a, b) {
        this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
      }, b.prototype.bind = function (b, c, d) {
        var e = this;
        b.call(this, c, d), c.on("query", function (a) {
          e.lastParams = a, e.loading = !0;
        }), c.on("query:append", function (a) {
          e.lastParams = a, e.loading = !0;
        }), this.$results.on("scroll", function () {
          var b = a.contains(document.documentElement, e.$loadingMore[0]);

          if (!e.loading && b) {
            var c = e.$results.offset().top + e.$results.outerHeight(!1),
                d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1);
            c + 50 >= d && e.loadMore();
          }
        });
      }, b.prototype.loadMore = function () {
        this.loading = !0;
        var b = a.extend({}, {
          page: 1
        }, this.lastParams);
        b.page++, this.trigger("query:append", b);
      }, b.prototype.showLoadingMore = function (a, b) {
        return b.pagination && b.pagination.more;
      }, b.prototype.createLoadingMore = function () {
        var b = a('<li class="option load-more" role="treeitem"></li>'),
            c = this.options.get("translations").get("loadingMore");
        return b.html(c(this.lastParams)), b;
      }, b;
    }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
      function c(a, b, c) {
        this.$dropdownParent = c.get("dropdownParent") || document.body, a.call(this, b, c);
      }

      return c.prototype.bind = function (a, b, c) {
        var d = this,
            e = !1;
        a.call(this, b, c), b.on("open", function () {
          d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function () {
            d._positionDropdown(), d._resizeDropdown();
          }), b.on("results:append", function () {
            d._positionDropdown(), d._resizeDropdown();
          }));
        }), b.on("close", function () {
          d._hideDropdown(), d._detachPositioningHandler(b);
        }), this.$dropdownContainer.on("mousedown", function (a) {
          a.stopPropagation();
        });
      }, c.prototype.position = function (a, b, c) {
        b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({
          position: "absolute",
          top: -999999
        }), this.$container = c;
      }, c.prototype.render = function (b) {
        var c = a("<span></span>"),
            d = b.call(this);
        return c.append(d), this.$dropdownContainer = c, c;
      }, c.prototype._hideDropdown = function () {
        this.$dropdownContainer.detach();
      }, c.prototype._attachPositioningHandler = function (c) {
        var d = this,
            e = "scroll.select2." + c.id,
            f = "resize.select2." + c.id,
            g = "orientationchange.select2." + c.id,
            h = this.$container.parents().filter(b.hasScroll);
        h.each(function () {
          a(this).data("select2-scroll-position", {
            x: a(this).scrollLeft(),
            y: a(this).scrollTop()
          });
        }), h.on(e, function () {
          var b = a(this).data("select2-scroll-position");
          a(this).scrollTop(b.y);
        }), a(window).on(e + " " + f + " " + g, function () {
          d._positionDropdown(), d._resizeDropdown();
        });
      }, c.prototype._detachPositioningHandler = function (c) {
        var d = "scroll.select2." + c.id,
            e = "resize.select2." + c.id,
            f = "orientationchange.select2." + c.id,
            g = this.$container.parents().filter(b.hasScroll);
        g.off(d), a(window).off(d + " " + e + " " + f);
      }, c.prototype._positionDropdown = function () {
        var b = a(window),
            c = this.$dropdown.hasClass("select2-dropdown--above"),
            d = this.$dropdown.hasClass("select2-dropdown--below"),
            e = null,
            f = (this.$container.position(), this.$container.offset());
        f.bottom = f.top + this.$container.outerHeight(!1);
        var g = {
          height: this.$container.outerHeight(!1)
        };
        g.top = f.top, g.bottom = f.top + g.height;
        var h = {
          height: this.$dropdown.outerHeight(!1)
        },
            i = {
          top: b.scrollTop(),
          bottom: b.scrollTop() + b.height()
        },
            j = i.top < f.top - h.height,
            k = i.bottom > f.bottom + h.height,
            l = {
          left: f.left,
          top: g.bottom
        };
        c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l);
      }, c.prototype._resizeDropdown = function () {
        this.$dropdownContainer.width();
        var a = {
          width: this.$container.outerWidth(!1) + "px"
        };
        this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.width = "auto"), this.$dropdown.css(a);
      }, c.prototype._showDropdown = function () {
        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
      }, c;
    }), b.define("select2/dropdown/minimumResultsForSearch", [], function () {
      function a(b) {
        for (var c = 0, d = 0; d < b.length; d++) {
          var e = b[d];
          e.children ? c += a(e.children) : c++;
        }

        return c;
      }

      function b(a, b, c, d) {
        this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
      }

      return b.prototype.showSearch = function (b, c) {
        return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c);
      }, b;
    }), b.define("select2/dropdown/selectOnClose", [], function () {
      function a() {}

      return a.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), b.on("close", function () {
          d._handleSelectOnClose();
        });
      }, a.prototype._handleSelectOnClose = function () {
        var a = this.getHighlightedResults();
        a.length < 1 || this.trigger("select", {
          data: a.data("data")
        });
      }, a;
    }), b.define("select2/dropdown/closeOnSelect", [], function () {
      function a() {}

      return a.prototype.bind = function (a, b, c) {
        var d = this;
        a.call(this, b, c), b.on("select", function (a) {
          d._selectTriggered(a);
        }), b.on("unselect", function (a) {
          d._selectTriggered(a);
        });
      }, a.prototype._selectTriggered = function (a, b) {
        var c = b.originalEvent;
        c && c.ctrlKey || this.trigger("close");
      }, a;
    }), b.define("select2/i18n/en", [], function () {
      return {
        errorLoading: function () {
          return "The results could not be loaded.";
        },
        inputTooLong: function (a) {
          var b = a.input.length - a.maximum,
              c = "Please delete " + b + " character";
          return 1 != b && (c += "s"), c;
        },
        inputTooShort: function (a) {
          var b = a.minimum - a.input.length,
              c = "Please enter " + b + " or more characters";
          return c;
        },
        loadingMore: function () {
          return "Loading more results…";
        },
        maximumSelected: function (a) {
          var b = "You can only select " + a.maximum + " item";
          return 1 != a.maximum && (b += "s"), b;
        },
        noResults: function () {
          return "No results found";
        },
        searching: function () {
          return "Searching…";
        }
      };
    }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
      function D() {
        this.reset();
      }

      D.prototype.apply = function (l) {
        if (l = a.extend({}, this.defaults, l), null == l.dataAdapter) {
          if (l.dataAdapter = null != l.ajax ? o : null != l.data ? n : m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
            var C = b(l.amdBase + "compat/query");
            l.dataAdapter = j.Decorate(l.dataAdapter, C);
          }

          if (null != l.initSelection) {
            var D = b(l.amdBase + "compat/initSelection");
            l.dataAdapter = j.Decorate(l.dataAdapter, D);
          }
        }

        if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
          if (l.multiple) l.dropdownAdapter = u;else {
            var E = j.Decorate(u, v);
            l.dropdownAdapter = E;
          }

          if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
            var F = b(l.amdBase + "compat/dropdownCss");
            l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
          }

          l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
        }

        if (null == l.selectionAdapter) {
          if (l.selectionAdapter = l.multiple ? e : d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
            var G = b(l.amdBase + "compat/containerCss");
            l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
          }

          l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
        }

        if ("string" == typeof l.language) if (l.language.indexOf("-") > 0) {
          var H = l.language.split("-"),
              I = H[0];
          l.language = [l.language, I];
        } else l.language = [l.language];

        if (a.isArray(l.language)) {
          var J = new k();
          l.language.push("en");

          for (var K = l.language, L = 0; L < K.length; L++) {
            var M = K[L],
                N = {};

            try {
              N = k.loadPath(M);
            } catch (O) {
              try {
                M = this.defaults.amdLanguageBase + M, N = k.loadPath(M);
              } catch (P) {
                l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                continue;
              }
            }

            J.extend(N);
          }

          l.translations = J;
        } else {
          var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
              R = new k(l.language);
          R.extend(Q), l.translations = R;
        }

        return l;
      }, D.prototype.reset = function () {
        function b(a) {
          function b(a) {
            return l[a] || a;
          }

          return a.replace(/[^\u0000-\u007E]/g, b);
        }

        function c(d, e) {
          if ("" === a.trim(d.term)) return e;

          if (e.children && e.children.length > 0) {
            for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
              var h = e.children[g],
                  i = c(d, h);
              null == i && f.children.splice(g, 1);
            }

            return f.children.length > 0 ? f : c(d, f);
          }

          var j = b(e.text).toUpperCase(),
              k = b(d.term).toUpperCase();
          return j.indexOf(k) > -1 ? e : null;
        }

        this.defaults = {
          amdBase: "./",
          amdLanguageBase: "./i18n/",
          closeOnSelect: !0,
          debug: !1,
          dropdownAutoWidth: !1,
          escapeMarkup: j.escapeMarkup,
          language: C,
          matcher: c,
          minimumInputLength: 0,
          maximumInputLength: 0,
          maximumSelectionLength: 0,
          minimumResultsForSearch: 0,
          selectOnClose: !1,
          sorter: function (a) {
            return a;
          },
          templateResult: function (a) {
            return a.text;
          },
          templateSelection: function (a) {
            return a.text;
          },
          theme: "default",
          width: "resolve"
        };
      }, D.prototype.set = function (b, c) {
        var d = a.camelCase(b),
            e = {};
        e[d] = c;

        var f = j._convertData(e);

        a.extend(this.defaults, f);
      };
      var E = new D();
      return E;
    }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
      function e(b, e) {
        if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
          var f = a(this.get("amdBase") + "compat/inputData");
          this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
        }
      }

      return e.prototype.fromElement = function (a) {
        var c = ["select2"];
        null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (this.options.dir = a.prop("dir") ? a.prop("dir") : a.closest("[dir]").prop("dir") ? a.closest("[dir]").prop("dir") : "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl")));
        var e = {};
        e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();
        var f = b.extend(!0, {}, e);
        f = d._convertData(f);

        for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);

        return this;
      }, e.prototype.get = function (a) {
        return this.options[a];
      }, e.prototype.set = function (a, b) {
        this.options[a] = b;
      }, e;
    }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
      var e = function (a, c) {
        null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this);
        var d = a.attr("tabindex") || 0;
        a.data("old-tabindex", d), a.attr("tabindex", "-1");
        var f = this.options.get("dataAdapter");
        this.dataAdapter = new f(a, this.options);
        var g = this.render();

        this._placeContainer(g);

        var h = this.options.get("selectionAdapter");
        this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g);
        var i = this.options.get("dropdownAdapter");
        this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g);
        var j = this.options.get("resultsAdapter");
        this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
        var k = this;
        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function (a) {
          k.trigger("selection:update", {
            data: a
          });
        }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this);
      };

      return c.Extend(e, c.Observable), e.prototype._generateId = function (a) {
        var b = "";
        return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = "select2-" + b;
      }, e.prototype._placeContainer = function (a) {
        a.insertAfter(this.$element);

        var b = this._resolveWidth(this.$element, this.options.get("width"));

        null != b && a.css("width", b);
      }, e.prototype._resolveWidth = function (a, b) {
        var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

        if ("resolve" == b) {
          var d = this._resolveWidth(a, "style");

          return null != d ? d : this._resolveWidth(a, "element");
        }

        if ("element" == b) {
          var e = a.outerWidth(!1);
          return 0 >= e ? "auto" : e + "px";
        }

        if ("style" == b) {
          var f = a.attr("style");
          if ("string" != typeof f) return null;

          for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) {
            var j = g[h].replace(/\s/g, ""),
                k = j.match(c);
            if (null !== k && k.length >= 1) return k[1];
          }

          return null;
        }

        return b;
      }, e.prototype._bindAdapters = function () {
        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
      }, e.prototype._registerDomEvents = function () {
        var b = this;
        this.$element.on("change.select2", function () {
          b.dataAdapter.current(function (a) {
            b.trigger("selection:update", {
              data: a
            });
          });
        }), this._sync = c.bind(this._syncAttributes, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._sync);
        var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        null != d ? (this._observer = new d(function (c) {
          a.each(c, b._sync);
        }), this._observer.observe(this.$element[0], {
          attributes: !0,
          subtree: !1
        })) : this.$element[0].addEventListener && this.$element[0].addEventListener("DOMAttrModified", b._sync, !1);
      }, e.prototype._registerDataEvents = function () {
        var a = this;
        this.dataAdapter.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerSelectionEvents = function () {
        var b = this,
            c = ["toggle"];
        this.selection.on("toggle", function () {
          b.toggleDropdown();
        }), this.selection.on("*", function (d, e) {
          -1 === a.inArray(d, c) && b.trigger(d, e);
        });
      }, e.prototype._registerDropdownEvents = function () {
        var a = this;
        this.dropdown.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerResultsEvents = function () {
        var a = this;
        this.results.on("*", function (b, c) {
          a.trigger(b, c);
        });
      }, e.prototype._registerEvents = function () {
        var a = this;
        this.on("open", function () {
          a.$container.addClass("select2-container--open");
        }), this.on("close", function () {
          a.$container.removeClass("select2-container--open");
        }), this.on("enable", function () {
          a.$container.removeClass("select2-container--disabled");
        }), this.on("disable", function () {
          a.$container.addClass("select2-container--disabled");
        }), this.on("focus", function () {
          a.$container.addClass("select2-container--focus");
        }), this.on("blur", function () {
          a.$container.removeClass("select2-container--focus");
        }), this.on("query", function (b) {
          a.isOpen() || a.trigger("open"), this.dataAdapter.query(b, function (c) {
            a.trigger("results:all", {
              data: c,
              query: b
            });
          });
        }), this.on("query:append", function (b) {
          this.dataAdapter.query(b, function (c) {
            a.trigger("results:append", {
              data: c,
              query: b
            });
          });
        }), this.on("keypress", function (b) {
          var c = b.which;
          a.isOpen() ? c === d.ENTER ? (a.trigger("results:select"), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle"), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous"), b.preventDefault()) : c === d.DOWN ? (a.trigger("results:next"), b.preventDefault()) : (c === d.ESC || c === d.TAB) && (a.close(), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || (c === d.DOWN || c === d.UP) && b.altKey) && (a.open(), b.preventDefault());
        });
      }, e.prototype._syncAttributes = function () {
        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable")) : this.trigger("enable");
      }, e.prototype.trigger = function (a, b) {
        var c = e.__super__.trigger,
            d = {
          open: "opening",
          close: "closing",
          select: "selecting",
          unselect: "unselecting"
        };

        if (a in d) {
          var f = d[a],
              g = {
            prevented: !1,
            name: a,
            args: b
          };
          if (c.call(this, f, g), g.prevented) return void (b.prevented = !0);
        }

        c.call(this, a, b);
      }, e.prototype.toggleDropdown = function () {
        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
      }, e.prototype.open = function () {
        this.isOpen() || (this.trigger("query", {}), this.trigger("open"));
      }, e.prototype.close = function () {
        this.isOpen() && this.trigger("close");
      }, e.prototype.isOpen = function () {
        return this.$container.hasClass("select2-container--open");
      }, e.prototype.enable = function (a) {
        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == a || 0 === a.length) && (a = [!0]);
        var b = !a[0];
        this.$element.prop("disabled", b);
      }, e.prototype.data = function () {
        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
        var a = [];
        return this.dataAdapter.current(function (b) {
          a = b;
        }), a;
      }, e.prototype.val = function (b) {
        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();
        var c = b[0];
        a.isArray(c) && (c = a.map(c, function (a) {
          return a.toString();
        })), this.$element.val(c).trigger("change");
      }, e.prototype.destroy = function () {
        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._sync), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && this.$element[0].removeEventListener("DOMAttrModified", this._sync, !1), this._sync = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null;
      }, e.prototype.render = function () {
        var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
        return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b;
      }, e;
    }), b.define("jquery.select2", ["jquery", "require", "./select2/core", "./select2/defaults"], function (a, b, c, d) {
      if (b("jquery.mousewheel"), null == a.fn.select2) {
        var e = ["open", "close", "destroy"];

        a.fn.select2 = function (b) {
          if (b = b || {}, "object" == typeof b) return this.each(function () {
            {
              var d = a.extend({}, b, !0);
              new c(a(this), d);
            }
          }), this;

          if ("string" == typeof b) {
            var d = this.data("select2");
            null == d && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2.");
            var f = Array.prototype.slice.call(arguments, 1),
                g = d[b](f);
            return a.inArray(b, e) > -1 ? this : g;
          }

          throw new Error("Invalid arguments for Select2: " + b);
        };
      }

      return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
    }), b.define("jquery.mousewheel", ["jquery"], function (a) {
      return a;
    }), {
      define: b.define,
      require: b.require
    };
  }(),
      c = b.require("jquery.select2");

  return a.fn.select2.amd = b, c;
});

/***/ })

}]);
//# sourceMappingURL=15.bc7792.js.map