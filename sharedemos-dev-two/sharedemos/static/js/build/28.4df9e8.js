(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./sharedemos/static/js/homepage_banner/models/homepage_banner.js":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/homepage_banner/models/homepage_banner.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var HomepageBanner = Backbone.Model.extend({
    urlRoot: "/api/homepage-banner"
  });
  return HomepageBanner;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/homepage_banner/templates/create_form.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/homepage_banner/templates/create_form.handlebars ***!
  \*******************************************************************************/
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
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"add",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":26}}}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    return "image-added";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"background_image") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0));
},"11":function(container,depth0,helpers,partials,data) {
    return "resource-added";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","wistia",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":24},"end":{"line":59,"column":36}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","image",{"name":"compare","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":60,"column":24},"end":{"line":64,"column":36}}})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"meta_data") : stack1)) != null ? lookupProperty(stack1,"thumbnail_url") : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":50,"column":28},"end":{"line":58,"column":35}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <img class=\"drag\" id=\"upload-resource-preview\"\n                                     src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"meta_data") : stack1)) != null ? lookupProperty(stack1,"thumbnail_url") : stack1), depth0))
    + "\"\n                                     alt=\"banner-resource\">\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "                                <img class=\"drag\" id=\"upload-resource-preview\"\n                                     src=\"/static/images/author/img-icon.png\"\n                                     alt=\"banner-resource\">\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <img class=\"drag\" id=\"upload-resource-preview\"\n                                 src=\"/static/media/"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"path") : stack1), depth0))
    + "\"\n                                 alt=\"banner-resource\">\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "                        <img class=\"drag\" id=\"upload-resource-preview\"\n                             src=\"/static/images/author/img-icon.png\"\n                             alt=\"banner-resource\">\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0));
},"25":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/homepage_banner/templates/cta.handlebars */ "./sharedemos/static/js/homepage_banner/templates/cta.handlebars"),depth0,{"name":"cta","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box homepage-banner\">\n    <div class=\"popup-title\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":15}}})) != null ? stack1 : "")
    + "        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"homepage banner",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":34}}}))
    + "\n    </div>\n    <form name=\"homepage-banner\" class=\"homepage-banner\"\n          enctype=\"multipart/form-data\"\n          data-id=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"banner_id") : depth0), depth0))
    + "\">\n        <div class=\"popup-info\">\n            <div>\n                <label>\n                    <span>banner title</span>\n                    <input type=\"text\" class=\"trim-input\" name=\"banner-title\"\n                           id=\"banner-text\" placeholder=\"Name\"\n                           "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"title") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":27},"end":{"line":19,"column":67}}})) != null ? stack1 : "")
    + ">\n                </label>\n            </div>\n            <div>\n                <label>\n                    <span>banner description</span>\n                    <textarea class=\"trim-input\" name=\"banner-description\" placeholder=\"Description\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</textarea>\n                </label>\n            </div>\n            <div class=\"media-container row\">\n                <div class=\"block  col-xs-12 col-sm-6 col-md-6 banner-image "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"imageAdded") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":76},"end":{"line":29,"column":112}}})) != null ? stack1 : "")
    + "\">\n                    <div class=\"title banner\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload a banner image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":30,"column":46},"end":{"line":30,"column":78}}}))
    + "</div>\n                    <div class=\"sub-title banner-image-sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image for the banner",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":66},"end":{"line":31,"column":107}}}))
    + ".</div>\n                    <input type=\"file\" class=\"drag-file\" id=\"upload-banner-image\" accept=\"image/*\" name=\"background-image\" >\n                    <img class=\"drag\" id=\"banner-image-preview\"\n                    src=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"background_image") : depth0)) != null ? lookupProperty(stack1,"path") : stack1), depth0))
    + "\"\n                    alt=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"background_image") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" />\n                    <div class=\"file-name\">\n                        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"imageAdded") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":24},"end":{"line":37,"column":74}}})) != null ? stack1 : "")
    + "\n                    </div>\n                    <label id=\"remove-img\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"background_image") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":43},"end":{"line":39,"column":85}}})) != null ? stack1 : "")
    + ">\n                       "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":23},"end":{"line":40,"column":40}}}))
    + "</label>\n                    <label for=\"upload-banner-image\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":74},"end":{"line":41,"column":91}}}))
    + "</label>\n                </div>\n\n                <div class=\"block col-xs-12 col-sm-6 col-md-6 banner-resource "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":78},"end":{"line":44,"column":115}}})) != null ? stack1 : "")
    + "\">\n                    <div class=\"title banner\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload media",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":45,"column":46},"end":{"line":45,"column":69}}}))
    + "</div>\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image/video to go with this banner",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":43},"end":{"line":46,"column":98}}}))
    + ".</div>\n                    <input type=\"file\" class=\"drag-file\" id=\"upload-banner-resource\" accept=\"image/*,video/*\" name=\"banner-resource\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":48,"column":20},"end":{"line":69,"column":27}}})) != null ? stack1 : "")
    + "                    <div class=\"resource-name\">\n                        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":71,"column":24},"end":{"line":71,"column":64}}})) != null ? stack1 : "")
    + "\n                    </div>\n                    <label id=\"remove-resource\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":48},"end":{"line":73,"column":85}}})) != null ? stack1 : "")
    + " >"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":73,"column":87},"end":{"line":73,"column":104}}}))
    + "\n                    </label>\n                    <label for=\"upload-banner-resource\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":75,"column":77},"end":{"line":75,"column":94}}}))
    + "</label>\n                </div>\n            </div>\n\n            <div class=\"call-to-action\">\n                <div class=\"title banner\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"call to action",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":80,"column":42},"end":{"line":80,"column":67}}}))
    + "</div>\n                <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"create a call to action to go with this banner",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":81,"column":39},"end":{"line":81,"column":96}}}))
    + "</div>\n            </div>\n            <div class=\"row cta-action\">\n                <div class=\"col-xs-12 col-sm-8 col-md-8\">\n                    <label>\n                    <input type=\"url\" class=\"trim-input\"\n                           name=\"banner-cta-link\" id=\"banner-cta-link\"\n                           placeholder=\"https://\">\n                    </label>\n                </div>\n                <div class=\"col-xs-12 col-sm-3 col-md-3\">\n                    <label>\n                        <input type=\"text\" class=\"trim-input\"\n                               name=\"banner-cta-text\" id=\"banner-cta-text\" placeholder=\"BUTTON TEXT\">\n                    </label>\n                </div>\n                <div class=\"col-xs-12 col-sm-1 col-md-1\">\n                    <label>\n                        <span id=\"add-cta\">add</span>\n                    </label>\n                </div>\n            </div>\n            <div class=\"cta-block\" id=\"cta-container\">\n                <ol class=\"cta-items\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cta_details") : depth0),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":105,"column":20},"end":{"line":107,"column":29}}})) != null ? stack1 : "")
    + "                </ol>\n            </div>\n                \n        </div>\n        <div class=\"popup-footer\">\n            <div class=\"form-footer\">\n                <div class=\"cancel\">cancel</div>\n                <input type=\"submit\" class=\"save\" value=\"save\" name=\"homepage-banner\" />\n            </div>\n            <div class=\"failed\">oops! saving failed</div>\n            <div class=\"added\">saved successfully!</div>\n            <div class=\"adding\">saving...<div class=\"cd-loading\"></div>\n            </div>\n        </div>\n    </form>\n</div>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/homepage_banner/templates/cta.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/homepage_banner/templates/cta.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"cta-data\" data-title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":41}}}) : helper)))
    + "\" data-link=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":1,"column":54},"end":{"line":1,"column":62}}}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"cta_id") || (depth0 != null ? lookupProperty(depth0,"cta_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cta_id","hash":{},"data":data,"loc":{"start":{"line":1,"column":73},"end":{"line":1,"column":83}}}) : helper)))
    + "\">\n	<div class=\"cta-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":24},"end":{"line":2,"column":32}}}) : helper)))
    + "</div>\n	<div class=\"cta-link\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":3,"column":23},"end":{"line":3,"column":31}}}) : helper)))
    + "</div>\n	<div class=\"remove-cta\">remove CTA</div>\n</li>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/homepage_banner/views/edit.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/homepage_banner/views/edit.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/homepage_banner */ "./sharedemos/static/js/homepage_banner/models/homepage_banner.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../templates/create_form.handlebars */ "./sharedemos/static/js/homepage_banner/templates/create_form.handlebars"), __webpack_require__(/*! ../templates/cta.handlebars */ "./sharedemos/static/js/homepage_banner/templates/cta.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, HomepageBanner, Common, createForm, CtaTemplate) {
  "use strict";

  var editView = Backbone.View.extend({
    el: "#dashboard_settings",
    events: {
      'click input[name="enable_homepage_banner"]:not(.active)': 'showForm',
      'submit form[name=homepage-banner]': 'submitDetails',
      'change form[name=homepage-banner] input[name="banner-resource"],form[name=homepage-banner] input[name="background-image"]': 'validateMedia',
      'click #remove-img, #remove-resource': 'removeMedia',
      'click #add-cta': 'addCTA',
      'click .remove-cta': 'removeCTA',
      'click form[name=homepage-banner] .cancel': 'closeForm',
      'click .banner-edit.active': 'edit',
      'keyup input[type="url"]': 'updateCTAUrl'
    },
    actionFailed: function (target) {
      setTimeout(() => {
        this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
        this.$(`.${target} .failed`).addClass("slide-in");
        setTimeout(() => {
          this.$(`.${target} .failed`).removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    actionSuccess: function (target) {
      this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
      this.$(`.${target} .added`).addClass("slide-in");
      setTimeout(() => {
        this.$(`.${target} .added`).removeClass("slide-in");
        this.closeForm();
      }, 1000);
    },
    actionInProgress: function (target) {
      this.$(`.${target} .adding`).addClass("slide-in is-submitted");
    },
    addCTA: function (event) {
      this.removeCustomErrorMessage();
      let ctaUrl = this.$('input[name="banner-cta-link"]');

      if (!Common.validateUrl(ctaUrl.val())) {
        this.customErrorMessage('Please Enter a valid URL', ctaUrl);
        return false;
      }

      let ctaText = this.$('input[name="banner-cta-text"]');

      if (!ctaText.val()) {
        this.customErrorMessage('Please provide a name for CTA button', ctaText);
        return false;
      }

      let ctaData = {
        link: ctaUrl.val(),
        name: ctaText.val(),
        cta_id: null
      };
      this.$(ctaUrl).val('');
      this.$(ctaText).val('');
      this.$('#cta-container .cta-items').append(CtaTemplate(ctaData));
    },
    closeForm: function () {
      let popupName = 'homepage-banner';
      this.$(`.dashboard-overlay .${popupName}`).addClass("bounceOutUp");
      setTimeout(() => {
        this.$(`.dashboard-overlay .popup-box.${popupName}`).hide().removeClass("bounceOutUp");
        this.$(".dashboard-overlay").hide();
      }, 300);
    },
    customErrorMessage: function (message, target, elem) {
      this.removeCustomErrorMessage();
      var editToolTip = `<div class="error-message">${message}</div>`;
      target.after(editToolTip);
      if (elem) elem.focus();
    },
    edit: function (event) {
      let banner = new HomepageBanner();
      banner.fetch({
        success: (modle, response) => {
          this.showForm(event, response, true);
        },
        error: response => {
          console.log(response.message);
        }
      });
    },
    removeCTA: function (event) {
      let parent = this.$(event.currentTarget).parent();

      if (parent.attr('data-id')) {
        this.$(parent).addClass('hide').attr('attr-remove', true);
      } else {
        this.$(parent).remove();
      }
    },

    removeCustomErrorMessage() {
      this.$('.error-message').remove();
      this.$('.file-name, .resource-name').show();
    },

    removeMedia: function (event) {
      let fileNameClass = '.resource-name';
      let parentClass = 'resource-added';
      let target = $(event.currentTarget);
      let isBannerIcon = this.$(target).parent().hasClass('image-added');

      if (isBannerIcon) {
        fileNameClass = '.file-name';
        parentClass = 'image-added';

        if (event.currentTarget.hasAttribute('image-added')) {
          this.$(target).attr('data-remove-image', true);
        }
      } else if (event.currentTarget.hasAttribute('resource-added')) {
        this.$(target).attr('data-remove-resource', true);
      }

      this.$(target).parent().removeClass(parentClass).find(fileNameClass).empty();
      this.$(target).siblings('input[type=file]').val('');
      this.$(target).siblings('img').removeAttr('src');
    },
    submitDetails: function (event) {
      event.preventDefault();
      let currentFormName = this.$(event.currentTarget).attr('name');
      let formName = `form[name=${currentFormName}]`;
      let bannerTitle = this.$(`${formName} input[name='banner-title']`);
      let bgImageFile = this.$('#upload-banner-image').val();

      if (bannerTitle.val() && bannerTitle.val().match(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/) != null) {
        this.customErrorMessage('Provide a name with atleast an alphanumeric character', this.$(bannerTitle).parent(), this.$(bannerTitle));
        return;
      }

      this.removeCustomErrorMessage();
      this.saveDetails(formName);
    },
    saveDetails: function (formName) {
      let bannerData = new FormData();
      let bannerTitle = this.$(`${formName} input[name='banner-title']`).val();
      let bannerDescription = this.$(`${formName} textarea[name='banner-description']`).val();
      let ctaDetails = [];
      let ctaItems = this.$(`${formName} #cta-container .cta-items li`);

      _.each(ctaItems, (ele, index) => {
        let action;
        let data = this.$(ele).data();

        if (this.$(ele).attr('attr-remove') == 'true') {
          action = 'remove';
        } else if (!data.id) {
          action = 'add';
        }

        let cta = {
          name: data.title,
          options: {
            type: 'link',
            text: data.title,
            href: data.link
          },
          cta_id: data.id,
          action: action
        };
        ctaDetails.push(cta);
      });

      bannerData.append('title', bannerTitle);
      bannerData.append('description', bannerDescription);
      bannerData.append('cta_details', JSON.stringify(ctaDetails));

      if (this.$('#remove-img').attr('data-remove-image')) {
        bannerData.append('remove_background_image', true);
      }

      if (this.$('#remove-resource').attr('data-remove-resource')) {
        bannerData.append('remove_resource', true);
      }

      bannerData.append('background_image', this.$('#upload-banner-image')[0].files[0]);
      bannerData.append('banner_resource', this.$('#upload-banner-resource')[0].files[0]);
      let banner_id = this.$(`${formName}`).attr('data-id') || null;
      let banner = new HomepageBanner({
        id: banner_id
      });
      this.actionInProgress('homepage-banner');
      var root = this;
      banner.save(bannerData, {
        processData: false,
        cache: false,
        contentType: false,
        data: bannerData,
        success: function (response) {
          root.actionSuccess('homepage-banner');
          root.$('#enable_homepage_banner').addClass('active');

          if (["NOT CREATED", "DELETED"].includes(response.attributes.status)) {
            root.$(".banner-edit").removeClass("active");
            root.$("input#enable_homepage_banner").removeAttr("checked").removeClass("active");
          }
        },
        error: function (xhr, status, error) {
          console.log(status.responseText);
          root.actionFailed('homepage-banner');
        }
      });
    },
    showForm: function (event, data = {}, is_edit = false) {
      data.is_edit = is_edit;
      data.imageAdded = true;
      if (!event.currentTarget.checked && !is_edit) return;

      if (!data.background_image) {
        data.background_image = {
          path: `${document.cdn_url}/static/images/author/img-icon.png`,
          name: data.title
        };
        data.imageAdded = false;
      }

      this.$el.find('.popup-wrap').html(createForm(data));
      this.$(".dashboard-overlay").css({
        "display": "table"
      });
      let popupName = 'homepage-banner';
      this.$(`.dashboard-overlay .popup-box.${popupName}`).show().addClass("bounceInDown");
      setTimeout(() => {
        this.$(`.dashboard-overlay .popup-box.${popupName}`).removeClass("bounceInDown");
      }, 300);
    },
    updateCTAUrl: function (event) {
      this.removeCustomErrorMessage();
      if (event.altKey || [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(event.keyCode) !== -1) return;
      var value = $(event.target).val();

      if (value && value.length && value.length > 4 && value.indexOf('http') !== 0) {
        $(event.target).val('https://' + value);
      }
    },
    validateMedia: function (event) {
      let message,
          validStatus = true;
      this.removeCustomErrorMessage();
      let media = event.target.files && event.target.files[0];
      let type = media.type.split('/')[0];
      let fileSizeMB = type == 'video' ? media.size / 1000000 : '';
      let target = $(event.currentTarget);

      if (this.$(target).attr('id') == 'upload-banner-image' && type !== 'image') {
        message = 'Oops! Please upload a valid image file.';
        this.customErrorMessage(message, this.$('.file-name'));
        this.$('.file-name').hide();
        return;
      }

      if (!['image', 'video'].includes(type)) {
        validStatus = false;
        message = `${type} file not supported`;
      }

      if (type == 'image') {
        if (!media || !/\.(jfif|jpg|jpeg|png|gif)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid image file.";
        }
      } else if (type == 'video') {
        if (!media || !/\.(mp4|mkv|wmv|mpeg4|webm|ogg)$/i.test(media.name)) {
          validStatus = false;
          message = "Oops! Please upload a valid video file.";
        } else if (fileSizeMB > Common.VIDEO_FILE_MAX_SIZE) {
          validStatus = false;
          message = `File size is too large. Allowed limit: ${Common.VIDEO_FILE_MAX_SIZE}MB.`;
        }
      }

      if (this.$(target).attr('id') == 'upload-banner-image' && !validStatus) {
        this.customErrorMessage(message, this.$('.file-name'));
        this.$('.file-name').hide();
        return false;
      } else if (!validStatus) {
        this.customErrorMessage(message, this.$('.resource-name'));
        this.$('.resource-name').hide();
        return false;
      }

      if (this.$(target).attr('id') == 'upload-banner-image') {
        this.$('#banner-image-preview').attr('src', URL.createObjectURL(media));
        this.$(target).parent().addClass('image-added').find('.file-name').text(media.name);
      } else {
        if (type == 'image') this.$('#upload-resource-preview').attr('src', URL.createObjectURL(media));
        this.$(target).parent().addClass('resource-added').find('.resource-name').removeClass('hide').text(media.name);
        this.$('#resource-error-message').addClass('hide');
      }
    }
  });
  return editView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=28.4df9e8.js.map