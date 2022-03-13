(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./sharedemos/static/js/apps/journeys/models/journeys.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/models/journeys.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Journeys = Backbone.Model.extend({
    urlRoot: "/api/journey"
  });
  return Journeys;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/models/tags_options.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/models/tags_options.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var TagsOptions = Backbone.Model.extend({
    urlRoot: "/api/journey/tags-and-options"
  });
  return TagsOptions;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/routers/router.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/routers/router.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../views/launchpad */ "./sharedemos/static/js/apps/journeys/views/launchpad.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, LaunchPadView) {
  'use strict';

  var JourneyRouter = Backbone.Router.extend({
    routes: {
      ":journey": "routeHandler"
    },
    initialize: function () {
      this.view = null;
      return this;
    },
    routeHandler: function (journey) {
      this.loadView(new LaunchPadView(journey));
    },
    loadView: function (view) {
      if (this.view) {
        this.view.undelegateEvents();
      }

      this.view = view;
    }
  });
  return JourneyRouter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/create_journeys.handlebars":
/*!*********************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/create_journeys.handlebars ***!
  \*********************************************************************************/
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

  return "    <!-- New Journey Popup -->\r\n    <section class=\"full_popup_block\">\r\n        <div class=\"full_popup_overlay\"></div>\r\n        <div class=\"full_popup_box create_journeys\">\r\n            <div class=\"close_full_popup\" data-popup=\"create_journeys\"></div>\r\n            <div class=\"full_popup_content\">\r\n                <h4>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":8,"column":20},"end":{"line":8,"column":66}}})) != null ? stack1 : "")
    + " Journey</h4>\r\n                <form class=\"text-left\" data-journey-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" name=\"create-journeys-form\" id=\"create-journeys-form\" enctype=\"multipart/form-data\">\r\n                    <input type=\"hidden\" name=\"is_general\" value=\"Yes\">\r\n\r\n                    <div class=\"journey-tabs\">\r\n                        <div class=\"journey-info active\" data-tab=\"information\">information</div>\r\n                        <div class=\"journey-tag\" data-tab=\"tags\">tagging</div>\r\n                    </div>\r\n\r\n                    <div class=\"journey-information active\" data-tab=\"information\">\r\n                        <div class=\"form-group col-xs-12\">\r\n                            <label for=\"company\" class=\"mandatory-field uppercase\">journey name</label>\r\n                            <div class=\"sub-title\">Provide a name for this journey.</div>\r\n                            <div class=\"input_wrap\">\r\n                                <input type=\"text\" placeholder=\"Name\" name=\"name\" class=\"section-name form-control\" autocomplete=\"off\" value=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"journeyName") : depth0), depth0))
    + "\">\r\n                            </div>\r\n                        </div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"isPrivateTenant") : depth0),"&&",((stack1 = (depth0 != null ? lookupProperty(depth0,"user_groups") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":24},"end":{"line":42,"column":36}}})) != null ? stack1 : "")
    + "                        <div class=\"form-group col-xs-12\">\r\n                            <label for=\"message\" class=\"uppercase\">journey description</label>\r\n                            <div class=\"sub-title\">Write a short description for this journey.</div>\r\n                            <div class=\"input_wrap\">\r\n                                <textarea placeholder=\"Description\" name=\"description\" class=\"section-description form-control\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</textarea>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group col-xs-12\">\r\n                            <label for=\"eol\" class=\"uppercase\">end of life</label>\r\n                            <div class=\"input_wrap\">\r\n                                <input type=\"text\" name=\"eol\" placeholder=\"Click to select date-time\" class=\"datepicker-here form-control\" id=\"journey_expire_at\" readonly=\"true\" data-position=\"top right\" data-timepicker=\"true\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"expireAt") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":227},"end":{"line":53,"column":276}}})) != null ? stack1 : "")
    + " />\r\n                                <div>&nbsp;</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <!--journey tagging section-->\r\n                    <div class=\"journey-tagging\" data-tab=\"tags\">              \r\n                        <div class=\"form-group col-xs-12\">\r\n                            <label for=\"company\" class=\"mandatory-field\">Add tags</label>\r\n                            <div class=\"sub-title\">create tag to your journey to help organize and identify them.</div>\r\n                            <div class=\"journey-tag-groups-wrap\">                               \r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":32},"end":{"line":66,"column":41}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":32},"end":{"line":69,"column":43}}})) != null ? stack1 : "")
    + "                            </div>                                        \r\n                            <button type=\"button\" class=\"journey-create-tag-group btn\">Add Tag Group</button>\r\n                        </div>\r\n                    </div>\r\n                    <!--end of journey tagging section-->\r\n                    <input type=\"submit\" name=\"submit\" value=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":75,"column":62},"end":{"line":75,"column":98}}})) != null ? stack1 : "")
    + " JOURNEY\" class=\"btn\" name=\"create-journeys-form\" data-popup=\"create_journeys\" "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"isEdit") : depth0),{"name":"unless","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":75,"column":177},"end":{"line":75,"column":214}}})) != null ? stack1 : "")
    + ">\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </section>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " Edit ";
},"4":function(container,depth0,helpers,partials,data) {
    return " Add New ";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"form-group col-xs-12\">\r\n                            <label for=\"company\" class=\"mandatory-field\">Allow Access To</label>\r\n                            <div class=\"sub-title\">Who do you want this journey to be visible for? Select all that apply.</div>\r\n                            <div class=\"input_wrap journeys-privacy-list\">\r\n                                <div class=\"section-name form-control journeys-privacy-btn\" data-default-text=\"Select Groups\">Select Groups</div>\r\n                                <ul class=\"journeys-privacy-opt hide\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"user_groups") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":36},"end":{"line":38,"column":45}}})) != null ? stack1 : "")
    + "                                </ul>\r\n                            </div>\r\n                        </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":33,"column":40},"end":{"line":37,"column":47}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <li data-group-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " class=\"selected is-author\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</li>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <li data-group-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + " "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_default") : depth0),"||",(depth0 != null ? lookupProperty(depth0,"is_selected") : depth0),{"name":"compare","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":75},"end":{"line":36,"column":153}}})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</li>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "class=\"selected\"";
},"13":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "data-datetime="
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"expireAt") : depth0), depth0));
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/tags.handlebars */ "./sharedemos/static/js/apps/journeys/templates/tags.handlebars"),depth0,{"name":"tags","data":data,"indent":"                                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "SAVE";
},"19":function(container,depth0,helpers,partials,data) {
    return "ADD";
},"21":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"add_journey") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":80,"column":7}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/journey_assets.handlebars":
/*!********************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/journey_assets.handlebars ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li class=\"journey-link-data\">\r\n        <div class=\"journey-link-details\">\r\n            <div class=\"journey-link-title\">"
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","chapter",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":7,"column":24}}})) != null ? stack1 : "")
    + "            <div class=\"journey-link-edit camel-case\">\r\n                <span class=\"remove-journey-link\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":50},"end":{"line":9,"column":67}}}))
    + "</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"journey-asset-drag no-action ui-sortable-handle\"></div>\r\n    </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\" class=\"journey-link-url\" data-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\" data-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"breadcrumb") : depth0), depth0))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":14,"column":9}}})) != null ? stack1 : "")
    + "\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/launchpad.handlebars":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/launchpad.handlebars ***!
  \***************************************************************************/
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

  return "                <img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"tenantLogo") : depth0), depth0))
    + "\" alt=\"tenant-logo\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"logo-text\">SHAREDEMOS</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"journey-content\" data-journey-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\"\r\n                         data-journey-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"assets") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":24},"end":{"line":25,"column":33}}})) != null ? stack1 : "")
    + "                    </div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <p data-chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</p>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_details") : depth0)) != null ? lookupProperty(stack1,"cta_button") : stack1)) != null ? lookupProperty(stack1,"cta_link") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":12},"end":{"line":37,"column":19}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <a href=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_details") : depth0)) != null ? lookupProperty(stack1,"cta_button") : stack1)) != null ? lookupProperty(stack1,"cta_link") : stack1), depth0))
    + "\" target=\"_blank\">\r\n                    <div class=\"side-bar-cta\" data-journey-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\r\n                        "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_details") : depth0)) != null ? lookupProperty(stack1,"cta_button") : stack1)) != null ? lookupProperty(stack1,"cta_text") : stack1), depth0))
    + "\r\n                    </div>\r\n                </a>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"journey-pages\" data-journey-slug=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"assets") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":24},"end":{"line":64,"column":33}}})) != null ? stack1 : "")
    + "                    </div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"launch-page\" data-chapter=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\r\n                                <h1 class=\"content-title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</h1>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","chapter",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":32},"end":{"line":62,"column":44}}})) != null ? stack1 : "")
    + "                            </div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <div class=\"chapter-launcher\">\r\n                                        <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"thumbnail") : depth0), depth0))
    + "\">\r\n                                        <div\r\n                                       class=\"playerframe-link\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\"\r\n                                       data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" data-chapter-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\r\n                                        launch\r\n                                        </div>\r\n                                    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"launch-pad-player-wrapper active side-bar-open\">\r\n    <div class=\"launch-pad-side-bar\">\r\n        <a href=\"/\">\r\n            <div class=\"exit-launch-pad-player\"></div>\r\n        </a>\r\n        <div class=\"launch-pad-company-logo-holder\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tenantLogo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":7,"column":12},"end":{"line":11,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n        <h1 class=\"launch-pad-title\"></h1>\r\n        <div class=\"launch-pad-slide-controllers\">\r\n            <div class=\"prev-launch-pad\"></div>\r\n            <div class=\"next-launch-pad\"></div>\r\n        </div>\r\n        <div class=\"inner\">\r\n            <div class=\"journeys-holder\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":16},"end":{"line":27,"column":25}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":8},"end":{"line":38,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"launch-pad-main-screen\">\r\n        <div class=\"toggle-launch-pad-side-bar\">\r\n            <div></div>\r\n            <div></div>\r\n            <div></div>\r\n        </div>\r\n        <div class=\"launch-pad-main-container\">\r\n            <div class=\"content\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":16},"end":{"line":66,"column":25}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/list_journeys.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/list_journeys.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return " enabled ";
},"3":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <img class=\"journey-cover\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"icon_path") : depth0), depth0))
    + "\"/>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                            <p class=\"upper-case\"><span>Add Cover</span></p>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "edit";
},"11":function(container,depth0,helpers,partials,data) {
    return "add";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"input_wrap selected-journeys-privacy-list\">\r\n                            <label class=\"uppercase\">visibility</label>\r\n                            <div class=\"section-name form-control journeys-privacy-btn\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user_groups") : depth0)) != null ? lookupProperty(stack1,"length") : stack1), depth0))
    + " Group"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"user_groups") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",1,{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":116},"end":{"line":27,"column":167}}})) != null ? stack1 : "")
    + " Selected</div>\r\n                            <ul class=\"selected journeys-privacy-opt hide\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"user_groups") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":32},"end":{"line":31,"column":41}}})) != null ? stack1 : "")
    + "                            </ul>\r\n                        </div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "s";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <li data-group-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"_id") : depth0), depth0))
    + "\" class=\"selected\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</li>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "draft-mode";
},"20":function(container,depth0,helpers,partials,data) {
    return "published";
},"22":function(container,depth0,helpers,partials,data) {
    return "Draft";
},"24":function(container,depth0,helpers,partials,data) {
    return " Disable ";
},"26":function(container,depth0,helpers,partials,data) {
    return " Enable ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"work-area journeys journeys-details-wrap journey-background shadow\" data-journey-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\"  data-journey-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\r\n    <div class=\"tenant-wrap\">\r\n        <div class=\"tenant-details row\">\r\n            <div class=\"journeys-details "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":93}}})) != null ? stack1 : "")
    + "\">\r\n                <div class=\"col-sm-4\">\r\n                    <input type=\"file\" name=\"journeys-cover-btn\" id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"journeys-cover-btn\" accept=\"image/*\">\r\n                    <label class=\"journeys-cover\" for=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon_path") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":12,"column":31}}})) != null ? stack1 : "")
    + "                    </label>\r\n                </div>\r\n                <div class=\"col-sm-8\">\r\n                    <div class=\"journeys-title\"><span class=\"journeys-name\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span><span class=\"edit-journey-btn\" data-form-name=\"create_journeys\"></span>\r\n                    </div>\r\n                    <p class=\"journeys-description\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</p>\r\n                    <div class=\"journeys-btns\">\r\n                        <div>\r\n                            <div class=\"add-chapters-to-journeys uppercase\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"assets") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":21,"column":76},"end":{"line":21,"column":112}}})) != null ? stack1 : "")
    + " chapters</div>\r\n                            <div class=\"add-cta-to-journeys uppercase\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_details") : depth0)) != null ? lookupProperty(stack1,"cta_button") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":22,"column":71},"end":{"line":22,"column":123}}})) != null ? stack1 : "")
    + " cta button</div>\r\n                        </div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"isPrivateTenant") : depth0),"&&",((stack1 = (depth0 != null ? lookupProperty(depth0,"user_groups") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":24},"end":{"line":34,"column":36}}})) != null ? stack1 : "")
    + "                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"journey-drag no-action ui-sortable-handle\"></div>\r\n            <div class=\"journey-actions\">\r\n                <span class=\"journey-status uppercase "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"unless","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":54},"end":{"line":40,"column":96}}})) != null ? stack1 : "")
    + "\">\r\n                    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":41,"column":20},"end":{"line":41,"column":66}}})) != null ? stack1 : "")
    + "\r\n                </span>\r\n                <div class=\"journey-hidden-actions\">\r\n                    <div class=\"journey-actions-btn\">...</div>\r\n                    <div class=\"journey-actions-list hidden\">\r\n                        <ul>\r\n                            <li class=\"publish-journey\">Publish</li>\r\n                            <li class=\"change-journey-status\">\r\n                                "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data,"loc":{"start":{"line":49,"column":32},"end":{"line":49,"column":82}}})) != null ? stack1 : "")
    + "\r\n                            </li>\r\n                            <li class=\"delete-journey\">Delete</li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/popups.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/popups.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"dashboard-overlay\">\r\n    <div class=\"popup-wrap\">\r\n        <!-- non-default language create warning popup -->\r\n        <div class=\"popup-box create-warning\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"warning",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":6,"column":34}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info text-center\"></div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"create-warning\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"OK",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":61},"end":{"line":11,"column":74}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Error message popup -->\r\n        <div class=\"popup-box failed-case\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"something went wrong",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":18,"column":47}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info text-center\"></div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"failed-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"OK",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":58},"end":{"line":23,"column":71}}}))
    + "</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Chapter popups -->\r\n        <div class=\"popup-box add-journey-chapters-popup\">\r\n            <!-- 1st popup -->\r\n            <div class=\"chapters-popup-landing\">\r\n                <div class=\"camel-case popup-title\">\r\n                   <span class=\"form-action-type\">add</span> chapters\r\n                </div>\r\n                <form name=\"save-assets\" class=\"save-assets\">\r\n                    <div class=\"popup-info\">\r\n                        <label>\r\n                            <span class=\"mandatory-field uppercase\">choose chapters</span>\r\n                        </label>\r\n                        <p>Select the chapters from your library that you would like to add to this journey. You can select chapters compatible with your visibility preferences.</p>\r\n                        <div class=\"uppercase trigger-inplace-popup browser-chapters black-bg-btn\" data-hidePopup=\"chapters-popup-landing\" data-showPopup=\"chapters-list-popup\">browse your library</div>\r\n                        <ul class=\"journey-assets\"></ul>\r\n                    </div>\r\n                    <div class=\"popup-footer\">\r\n                        <div class=\"form-footer\">\r\n                            <div class=\"cancel\">cancel</div>\r\n                            <input type=\"submit\" class=\"save\" value=\"save\" />\r\n                        </div>\r\n                        <div class=\"failed\">oops! adding failed</div>\r\n                        <div class=\"added\">added successfully!</div>\r\n                        <div class=\"adding\">\r\n                            adding...\r\n                            <div class=\"cd-loading\"></div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <!-- 2nd popup -->\r\n            <div class=\"chapters-list-popup hidden\">\r\n                <div class=\"popup-title camel-case\">choose chapters to add</div>\r\n                <div class=\"back trigger-inplace-popup\" data-hidePopup=\"chapters-list-popup\" data-showPopup=\"chapters-popup-landing\"></div>\r\n                <div class=\"content-block\">\r\n                    <ul id=\"chapters-list-wrap\" class=\"sitemap-tree\">\r\n                        <img class=\"loading-icon\" src=\"/static/images/loading_icon.gif\" />\r\n                    </ul>\r\n                </div>\r\n                <div class=\"popup-footer\">\r\n                    <div class=\"form-footer\">\r\n                        <div class=\"backbtn rippleEffect trigger-inplace-popup\" data-hidePopup=\"chapters-list-popup\" data-showPopup=\"chapters-popup-landing\">cancel</div>\r\n                        <div class=\"save\" data-hidePopup=\"chapters-list-popup\" data-showPopup=\"chapters-popup-landing\">choose</div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- CTA Popup -->\r\n        <div class=\"popup-box add-journeys-cta-popup\">\r\n            <div class=\"camel-case popup-title\">\r\n                <span class=\"form-action-type\">add</span> CTA button\r\n            </div>\r\n            <form name=\"journey-cta\" class=\"journey-cta\">\r\n                <div class=\"popup-info\">\r\n                    <label>\r\n                        <span class=\"mandatory-field uppercase\">add a call-to-action button</span>\r\n                    </label>\r\n                    <p>Add a custom CTA button to be displayed in the bottom corner of this journey. Choose the text to be displayed and website link to redirect your use to.</p>\r\n                    <div class=\"blocks\">\r\n                        <div class=\"cta-input-wrap\">\r\n                            <input id=\"journey-cta-btn\" name=\"journey-cta-btn\" type=\"text\" placeholder=\"Button Text\" maxlength=\"25\" autocomplete=\"off\">\r\n                        </div>\r\n                        </br>\r\n                        <div class=\"cta-input-wrap\">\r\n                            <input id=\"journey-cta-link\" class=\"trim-input\" autocomplete=\"off\" name=\"journey-cta-link\" type=\"url\" placeholder=\"http://\">\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"popup-footer\">\r\n                    <div class=\"form-footer\">\r\n                        <div class=\"cancel\">cancel</div>\r\n                        <input type=\"button\" class=\"save\" value=\"save\">\r\n                    </div>\r\n                    <div class=\"failed\">oops! saving failed</div>\r\n                    <div class=\"added\">saved successfully!</div>\r\n                    <div class=\"adding\">saving...<div class=\"cd-loading\"></div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n        <!-- Confirm publish -->\r\n        <div class=\"popup-box confirm-publish-journey\">\r\n            <div class=\"popup-title capital-letter\">\r\n                "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":110,"column":16},"end":{"line":110,"column":42}}}))
    + "\r\n            </div>\r\n            <div class=\"popup-info sub-title text-center\">\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":113,"column":37},"end":{"line":113,"column":76}}}))
    + "</p><br>\r\n                <p class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":114,"column":37},"end":{"line":114,"column":93}}}))
    + "</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel\" rel=\"confirm-publish-journey\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":118,"column":70},"end":{"line":118,"column":87}}}))
    + "</div>\r\n                    <div class=\"confirm-publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":119,"column":49},"end":{"line":119,"column":67}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":20},"end":{"line":122,"column":60}}}))
    + ".\r\n                </div>\r\n                <div class=\"form-sent added\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":125,"column":20},"end":{"line":125,"column":81}}}))
    + ".\r\n                </div>\r\n                <div class=\"form-failed no-content\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Please add at least one chapter to publish journey",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":128,"column":20},"end":{"line":128,"column":81}}}))
    + ".\r\n                </div>\r\n                <div class=\"form-sending adding\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":131,"column":20},"end":{"line":131,"column":41}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Enable Journey -->\r\n        <div class=\"popup-box enable-journey\">\r\n            <div class=\"popup-title capital-letter\">Enable Journey</div>\r\n            <div class=\"popup-info text-center\">\r\n                <p class=\"sub-title\">This Journey will be visible to your viewers</p><br>\r\n                <p class=\"sub-title\">Are you sure you want to enable this Journey?</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"enable-journey\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":145,"column":74},"end":{"line":145,"column":91}}}))
    + "</div>\r\n                    <div class=\"enable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":146,"column":53},"end":{"line":146,"column":70}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":149,"column":20},"end":{"line":149,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent added\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":152,"column":20},"end":{"line":152,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending adding\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":155,"column":20},"end":{"line":155,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Disable Journey -->\r\n        <div class=\"popup-box disable-journey\">\r\n            <div class=\"popup-title capital-letter\">Disable Journey</div>\r\n            <div class=\"popup-info text-center\">\r\n                <p class=\"sub-title\">This Journey will not be visible to your viewers.</p><br>\r\n                <p class=\"sub-title\">Are you sure you want to disable this Journey?</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect\" rel=\"disable-journey\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":169,"column":75},"end":{"line":169,"column":92}}}))
    + "</div>\r\n                    <div class=\"disable rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":170,"column":54},"end":{"line":170,"column":72}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":173,"column":20},"end":{"line":173,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent added\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabled successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":176,"column":20},"end":{"line":176,"column":53}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending adding\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":179,"column":20},"end":{"line":179,"column":40}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- Delete chapter popup -->\r\n        <div class=\"popup-box delete-journey-popup\">\r\n            <div class=\"popup-title capital-letter\">\r\n                    Delete Journey\r\n            </div>\r\n            <div class=\"popup-info sub-title text-center\">\r\n                <p>You've made some cool stuff!</p></br>\r\n                <p>Are you sure you want to delete this Journey?'</p>\r\n            </div>\r\n            <div class=\"popup-footer\">\r\n                <div class=\"form-footer\">\r\n                    <div class=\"cancel rippleEffect capital-letter\" rel=\"delete-journey-popup\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":195,"column":95},"end":{"line":195,"column":112}}}))
    + "</div>\r\n                    <div class=\"delete rippleEffect capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":196,"column":68},"end":{"line":196,"column":85}}}))
    + "</div>\r\n                </div>\r\n                <div class=\"form-failed capital-letter failed\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":199,"column":20},"end":{"line":199,"column":65}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sent capital-letter added\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleted successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":202,"column":20},"end":{"line":202,"column":52}}}))
    + "\r\n                </div>\r\n                <div class=\"form-sending capital-letter adding\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":205,"column":20},"end":{"line":205,"column":39}}}))
    + "...\r\n                    <div class=\"cd-loading\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--End of Delete Chapter popup -->\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/site-map/main.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/site-map/main.handlebars ***!
  \*******************************************************************************/
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
    + "\" data-item=\"category\" data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n        <div style=\"margin-left:10px\" class=\"parentblock\">\n            <span class=\"expandSection\"></span>\n            <span class=\"siteMapTitle\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>     \n        </div>\n\n        <ul class=\"category\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":15,"column":21}}})) != null ? stack1 : "")
    + "        </ul>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars */ "./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars"),depth0,{"name":"render-sections","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":14,"column":25}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars */ "./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars"),depth0,{"name":"render-playlists","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"siteMapData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":18,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars":
/*!*******************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars ***!
  \*******************************************************************************************/
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
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":23},"end":{"line":8,"column":55}}})) != null ? stack1 : "")
    + "\" data-item=\"chapter\" data-id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"walkthrough_id") : depth0), depth0))
    + "\" data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n                <div style=\"margin-left:10px\" class=\"parentblock\">\n                    <span class=\"demoIcon\"></span>\n                    <span class=\"siteMapTitle\">"
    + alias3(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":47},"end":{"line":11,"column":55}}}) : helper)))
    + "</span>\n                <input id=\"tree-"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":12,"column":32},"end":{"line":12,"column":40}}}) : helper)))
    + "\" slug-id=\""
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":12,"column":51},"end":{"line":12,"column":59}}}) : helper)))
    + "\" type=\"checkbox\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_selected") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":77},"end":{"line":12,"column":112}}})) != null ? stack1 : "")
    + "class=\"css-checkbox\">\n                <label for=\"tree-"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":13,"column":33},"end":{"line":13,"column":41}}}) : helper)))
    + "\" class=\"css-label\"></label>\n                </div>\n                <ul class=\"demo\" id=\""
    + alias3(alias2((depths[2] != null ? lookupProperty(depths[2],"slug") : depths[2]), depth0))
    + "_"
    + alias3(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":15,"column":52},"end":{"line":15,"column":60}}}) : helper)))
    + "\"></ul>\n            </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return " checked ";
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
    + "\" data-groups=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"groups") || (depth0 != null ? lookupProperty(depth0,"groups") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"groups","hash":{},"data":data,"loc":{"start":{"line":1,"column":107},"end":{"line":1,"column":117}}}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":130},"end":{"line":1,"column":138}}}) : helper)))
    + "\">\n    <div style=\"margin-left:10px\" class=\"parentblock\">\n        <span class=\"playlistIcon\"></span>\n        <span class=\"siteMapTitle\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":35},"end":{"line":4,"column":43}}}) : helper)))
    + "</span>\n    </div>\n    <ul class=\"playlist\" id=\""
    + alias4(container.lambda((depths[1] != null ? lookupProperty(depths[1],"slug") : depths[1]), depth0))
    + "_"
    + alias4(((helper = (helper = lookupProperty(helpers,"playlist_id") || (depth0 != null ? lookupProperty(depth0,"playlist_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"playlist_id","hash":{},"data":data,"loc":{"start":{"line":6,"column":41},"end":{"line":6,"column":56}}}) : helper)))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"demos") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":17,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars":
/*!******************************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return " disabled ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars */ "./sharedemos/static/js/apps/journeys/templates/site-map/render-sections.handlebars"),depth0,{"name":"render-sections","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":13,"column":21}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars */ "./sharedemos/static/js/apps/journeys/templates/site-map/render-playlists.handlebars"),depth0,{"name":"render-playlists","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class = \""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"disabled") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":13},"end":{"line":1,"column":47}}})) != null ? stack1 : "")
    + "\" data-item=\"section\" data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-groups=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"groups") : depth0), depth0))
    + "\" data-name=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n    <div style=\"margin-left:10px\" class=\"parentblock\">\n        <span class=\"expandSection\"></span>\n        <span class=\"siteMapTitle\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n    </div>\n\n    <ul class=\"section\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":14,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/tag_options.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/tag_options.handlebars ***!
  \*****************************************************************************/
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

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":37},"end":{"line":3,"column":45}}}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda(depth0, depth0));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"tag-wrap\">\n    <div class=\"col-xs-10\">\n        <div class=\"tag\">"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":3,"column":25},"end":{"line":3,"column":68}}})) != null ? stack1 : "")
    + "</div>\n    </div>\n    <div class=\"col-xs-2  journey-delete-tag\">\n        <img src=\"/static/images/icon-delete3.png\">\n    </div>        \n</div> ";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/tags.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/tags.handlebars ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/apps/journeys/templates/tag_options.handlebars */ "./sharedemos/static/js/apps/journeys/templates/tag_options.handlebars"),depth0,{"name":"tag_options","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"journey-tag-group row\">\n    <div class=\"col-xs-4\">\n        <input type=\"text\" placeholder=\"Key values\" name=\"keyvalues\" class=\"form-control\n        tags-autoComplete\" autocomplete=\"off\" value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\">\n    </div> \n                                \n    <div class=\"col-xs-8\">\n        <div class=\"tag-collections\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"options") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":11,"column":17}}})) != null ? stack1 : "")
    + "        </div>\n        <input type=\"text\" placeholder=\"Input\" name=\"tag\" class=\"form-control tag-input options-autoComplete\" autocomplete=\"off\">\n        <button type=\"button\" class=\"journey-create-tag btn\">add tag</button>\n        <button type=\"button\" class=\"delete-tag-group btn\">delete group</button>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/welcome.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/welcome.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"welcome_msg journey-wrap\" >\r\n    <div class=\"welcome_txt\">\r\n        <h1>Welcome to Journeys</h1>\r\n        <p>Group content that exists in your library to create meaningful journeys.</p>\r\n    </div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/views/edit.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/views/edit.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/journeys */ "./sharedemos/static/js/apps/journeys/models/journeys.js"), __webpack_require__(/*! ../models/tags_options */ "./sharedemos/static/js/apps/journeys/models/tags_options.js"), __webpack_require__(/*! ../../../tenant/models/product-tree */ "./sharedemos/static/js/tenant/models/product-tree.js"), __webpack_require__(/*! ../templates/welcome.handlebars */ "./sharedemos/static/js/apps/journeys/templates/welcome.handlebars"), __webpack_require__(/*! ../templates/create_journeys.handlebars */ "./sharedemos/static/js/apps/journeys/templates/create_journeys.handlebars"), __webpack_require__(/*! ../templates/list_journeys.handlebars */ "./sharedemos/static/js/apps/journeys/templates/list_journeys.handlebars"), __webpack_require__(/*! ../templates/journey_assets.handlebars */ "./sharedemos/static/js/apps/journeys/templates/journey_assets.handlebars"), __webpack_require__(/*! ../templates/popups.handlebars */ "./sharedemos/static/js/apps/journeys/templates/popups.handlebars"), __webpack_require__(/*! ../templates/tags.handlebars */ "./sharedemos/static/js/apps/journeys/templates/tags.handlebars"), __webpack_require__(/*! ../templates/tag_options.handlebars */ "./sharedemos/static/js/apps/journeys/templates/tag_options.handlebars"), __webpack_require__(/*! ../templates/site-map/main.handlebars */ "./sharedemos/static/js/apps/journeys/templates/site-map/main.handlebars"), __webpack_require__(/*! airDatepicker */ "./sharedemos/static/libs/air-datepicker/js/datepicker.min.js"), __webpack_require__(/*! airDatepickerEn */ "./sharedemos/static/libs/air-datepicker/js/lang/datepicker.en.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, _, Backbone, Common, Journeys, TagsOptions, ProductTree, welcomeTemplate, createJourneysTemplate, listJourneysTemplate, journeyAssetsTemplate, popupsTemplate, tagTemplate, tagOptionsTemplate, journeySiteMapTemplate) {
  'use strict';

  var EditView = Backbone.View.extend({
    selectedJourneySlug: null,
    // this variable is used to trak current journey selection
    SITE_MAP_DATA: null,
    journeyTags: [],
    journeyTagOptions: [],
    el: '#main_container',
    template: popupsTemplate,
    events: {
      "click .create-new.journeys, .work-area.journeys .edit-journey-btn": "createJourneyPopup",
      "click .close_full_popup": "closeJourneyPopup",
      "click .trigger-inplace-popup": "replacePopup",
      "mouseenter .journey-hidden-actions": "toggleJourneyActions",
      "mouseleave .journey-hidden-actions": "toggleJourneyActions",
      // New/Edit Journey
      "submit form[name=create-journeys-form]": "saveJourney",
      "keyup #create-journeys-form input": "validateJourney",
      "click .journey-tabs [data-tab]": 'toggleEditTabs',
      "click .journey-create-tag": 'createTag',
      "click .journey-delete-tag": 'deleteTag',
      "click .delete-tag-group": 'deleteTagGroup',
      "click .journey-create-tag-group": 'createTagGroup',
      // upload journey cover
      "change .journeys-cover-btn": "uploadJourneyCover",
      // privacy options events
      "click .journeys-privacy-btn": "toggleJourneyPrivacyList",
      "click #create-journeys-form .journeys-privacy-opt li:not('.is-author')": "togglePrivacyOption",
      // chapters event
      "click .add-chapters-to-journeys": "showAddChaptersToJourneysPopup",
      "click .browser-chapters": "browserChapters",
      "click .add-journey-chapters-popup .cancel": "hideAddChaptersToJourneysPopup",
      "click #chapters-list-wrap .expandSection": "toogleSitMapSections",
      "click form[name=save-assets] .save": "saveAssetsDetails",
      "click .remove-journey-link": "removeAsset",
      "change #chapters-list-wrap .css-checkbox": "updateChooseChapterButtonText",
      'click .chapters-list-popup .save': 'addInternalLink',
      // CTA events
      "click .add-cta-to-journeys": "showAddCTAToJourneysPopup",
      "click .add-journeys-cta-popup .cancel": "hideAddCTAToJourneysPopup",
      "click form[name=journey-cta] .save": "saveCTADetails",
      "keyup input[type=url]": "updateUrl",
      // Publish, Disable, Enable, Delete Journey
      "click .publish-journey": "showPublishJourneyPopup",
      "click .confirm-publish-journey .confirm-publish": "confirmPublishJourney",
      "click .confirm-publish-journey .cancel": function () {
        this.closePopup('confirm-publish-journey');
      },
      "click .change-journey-status": "showEnableDisableJourneyPopup",
      "click .disable-journey .cancel": function () {
        this.closePopup('disable-journey');
      },
      "click .enable-journey .cancel": function () {
        this.closePopup('enable-journey');
      },
      "click .disable-journey .disable, .enable-journey .enable": "enableDisableJourney",
      "click .delete-journey": "showDeleteJourneyPopup",
      "click .delete-journey-popup .delete": "deleteJourney",
      "click .delete-journey-popup .cancel": function () {
        this.closePopup('delete-journey-popup');
      },
      // language warning
      "click .create-warning .cancel": "closeLanguageWarningPopup",
      // error popup
      "click .failed-case .cancel": function () {
        this.closePopup('failed-case');
      }
    },

    initialize() {
      this.listAllJourneys();
      this.renderPopupTemplate();
    },

    getTagsAndOptions() {
      let tagsOptions = new TagsOptions();
      let root = this;
      tagsOptions.fetch({
        success(model, response) {
          root.journeyTags = response.tags;
          root.journeyTagOptions = response.options;
          root.initAutoComplete();
        },

        error(status, error) {
          console.log(error.statusText);
        }

      });
    },

    renderPopupTemplate() {
      this.$('#dashboard-popups').html(this.template());
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

    toggleEditTabs(event) {
      let selectedTab = this.$(event.currentTarget).data('tab');
      this.$('[data-tab]').removeClass('active');
      this.$(`[data-tab=${selectedTab}]`).addClass('active');
    },

    createTagGroup() {
      this.$('.journey-tagging .journey-tag-groups-wrap').append(tagTemplate());
      this.$('.delete-tag-group').removeClass('disabled');
      this.initAutoComplete();
    },

    createTag(event) {
      var name = this.$(event.currentTarget).parent().find('.tag-input').val();

      if (name.length <= 2) {
        this.$(event.currentTarget).parent().find('.tag-input').addClass('error');
        this.$(event.currentTarget).parents('form').find('[type="submit"]').attr('disabled', 'disabled');
        return;
      }

      this.$(event.currentTarget).parent().find('.tag-input').val('').removeClass('error');
      let attr = {};
      attr.name = name;
      this.$(event.currentTarget).parents('.journey-tag-group').find(".tag-collections").append(tagOptionsTemplate(attr));
      this.initAutoComplete();
    },

    deleteTag(event) {
      this.$(event.currentTarget).parent().remove();
    },

    deleteTagGroup(event) {
      if ($('.journey-tag-group').length == 1) {
        this.$(event.currentTarget).addClass('disabled');
        return;
      }

      this.$(event.currentTarget).parent().parent().remove();
    },

    listAllJourneys() {
      let journeys = new Journeys();
      this.$('.journeys-list-wrap').empty();
      let root = this;
      journeys.fetch({
        success(model, response) {
          if (!response.length) {
            root.$('.journeys-list-wrap').html(welcomeTemplate());
            return;
          }

          _.each(response, journey => {
            if (journey.icon_path) {
              journey.icon_path = Common.DEFAULT_MEDIA_PATH + journey.icon_path;
            }

            journey.user_groups = journey.restricted_to_group_details;
            journey.isPrivateTenant = document.isPrivateTenant;
            root.$('.journeys-list-wrap').append(listJourneysTemplate(journey));
          });

          root.initializeJourneySortable();
        },

        error(model, response) {
          console.log(response.statusText);
        }

      });
    },

    initializeJourneySortable() {
      var root = this;
      this.$(".journeys-list-wrap").sortable({
        placeholder: 'highlight',
        handle: ".journey-drag",
        forcePlaceholderSize: true,
        containment: "parent",
        update: function (event, ui) {
          let journey = new Journeys({
            "id": ui.item.data("journey-slug"),
            "afterJourneySlug": ui.item.prev().data("journey-slug"),
            "reorder": true
          });
          journey.save(null, {
            patch: true,
            success: function () {
              root.$(".journeys-list-wrap").sortable("refresh");
            },
            error: function (xhr, status_code, message) {
              root.showPopup('failed-case');
              let errorMessage = "Reorder failed, please try agin";
              root.$('.failed-case .popup-info').text(errorMessage);
              root.$(".journeys-list-wrap").sortable("cancel");
            }
          });
        }
      });
    },

    createJourneyPopup(e) {
      if ($(e.currentTarget).hasClass('create-new') && document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
        return this.switchLanguageWarning();
      }

      let attr = {
        isPrivateTenant: document.isPrivateTenant,
        add_journey: true,
        isEdit: false,
        user_groups: JSON.parse(JSON.stringify(document.user_groups))
      };
      var expireAt; // Retrive particular journey details only on edit

      let ele = $(e.currentTarget);

      if (ele.hasClass('edit-journey-btn')) {
        attr.isEdit = true;
        attr.slug = ele.parents('.journeys-details-wrap').data('journey-slug');
        let journey = new Journeys({
          id: attr.slug
        });
        $.when(journey.fetch({
          async: false,
          processData: true
        })).done(function (response, status, xhr) {
          attr.journeyName = response.name;
          attr.description = response.description;
          attr.tags = response.tags;

          if (response.expire_at) {
            expireAt = new Date(response.expire_at);
            attr.expireAt = expireAt.toISOString().slice(0, 16);
          }
        });
        let selectedGroupIds = [];
        ele.parents('.journeys-details-wrap').find('.journeys-privacy-opt li').each(function () {
          selectedGroupIds.push($(this).data('group-id'));
        });

        _.each(attr.user_groups, group => {
          group.is_default = false;
          if (selectedGroupIds.includes(group._id)) group.is_selected = true;
        });
      }

      this.$(".create-journeys-wrap").html(createJourneysTemplate(attr)); // initializing the air datepicker

      this.initEolDatePicker(this.$('#journey_expire_at'));

      if (expireAt) {
        this.$('#journey_expire_at').val(expireAt.toLocaleString({}, {
          'hour12': true
        }).replace(/\//g, '-'));
      }

      this.updateSelectedGroupsInfo();
      var popupName = $(e.currentTarget).data('form-name');
      $('body').addClass('fixedHeight');
      this.$('.full_popup_block, .' + popupName).addClass('active');
      this.$(`.${popupName}, .full_popup_overlay`).addClass('animated slideInUp');
      setTimeout(() => {
        this.$(`.${popupName}, .full_popup_overlay`).removeClass('animated slideInUp');
      }, 500);
      this.getTagsAndOptions();
    },

    updateSelectedGroupsInfo() {
      let selectedGroupsElem = this.$('#create-journeys-form .journeys-privacy-opt li.selected');
      let selectedGroupsTitle = Array.from(selectedGroupsElem, group => group.innerText);
      this.$('#create-journeys-form .journeys-privacy-btn').text(selectedGroupsTitle.join(', '));
    },

    validateJourney(e) {
      var formID = $(e.currentTarget).parents('form').attr('id');
      var fieldName = e.currentTarget;
      var fieldValue = fieldName.value;

      if (!fieldValue || fieldValue == '') {
        $(e.currentTarget).addClass('error');
        $('#' + formID + ' input[type=submit]').attr('disabled', 'disabled');
      } else {
        $(e.currentTarget).removeClass('error');
        $('#' + formID + ' input[type=submit]').removeAttr('disabled');
      }
    },

    // Create or Edit Journey on submit
    saveJourney(e) {
      e.preventDefault();
      let showError = false;
      const currentFormName = $(e.currentTarget).attr('name');
      const formName = "form[name=" + currentFormName + "]";
      const journeyName = $(formName + " input[name='name']");
      const journeyDescription = $(formName + " textarea[name='description']");
      let selectedGroupIds = [];
      let tags = [];
      let expire_at = this.$('#journey_expire_at');

      if (document.isPrivateTenant && document.user_groups.length) {
        _.each($('#create-journeys-form .journeys-privacy-opt li.selected'), elem => {
          selectedGroupIds.push($(elem).data('group-id'));
        });

        if (!selectedGroupIds.length) {
          this.customErrorMessage('Select atleast one privacy type', $('.journeys-privacy-list').parent());
          showError = true;
        }
      }

      if (!journeyName.val()) {
        this.customErrorMessage('Provide a Journey Name', $(journeyName).parent(), $(journeyName));
        showError = true;
        this.$('[data-tab]').removeClass('active');
        this.$('[data-tab="information"]').addClass('active');
      }

      _.each($('.journey-tag-group'), elem => {
        let name = $(elem).find('[name="keyvalues"]').val();

        if (name.length <= 2) {
          showError = true;
          $(elem).find('[name="keyvalues"]').addClass('error');
          this.$('[data-tab]').removeClass('active');
          this.$('[data-tab="tags"]').addClass('active');
        }

        let options = [];

        _.each($(elem).find('.tag-collections .tag-wrap .tag'), tag => {
          let name = $(tag).text();
          options.push(name.toLowerCase());
        });

        if (options.length <= 0) {
          showError = true;
          $(elem).find('[name="tag"]').addClass('error');
          this.$('[data-tab]').removeClass('active');
          this.$('[data-tab="tags"]').addClass('active');
        }

        var group = {};
        group.name = name.toLowerCase();
        group.options = options;
        tags.push(group);
      });

      if (showError) return;
      $('.edit-tool-tip').remove();
      let data = {
        "name": journeyName.val(),
        "description": journeyDescription.val(),
        "restricted_to_groupids": selectedGroupIds,
        "tags": tags
      };

      if ($(e.currentTarget).data('journey-slug')) {
        data.id = $(e.currentTarget).data('journey-slug');
      }

      if (expire_at.val()) data.expire_at = expire_at.data('datetime') || null; // Creating/editing journey action in progress

      let submitElem = $(e.currentTarget).find('input:submit');
      submitElem.val('Submitting...'); // Submit success

      let journey = new Journeys(data);
      var root = this;
      journey.save(null, {
        success(model, response) {
          if (response) {
            root.$('.create_journeys').find('input:submit').val('Success!');
            root.listAllJourneys();
            setTimeout(function () {
              root.closeJourneyPopup('create_journeys');
              return;
            }, 500);
          }
        },

        error(model, response, xhr) {
          console.log(response.statusText);
        }

      });
    },

    uploadJourneyCover(e) {
      let target = e.currentTarget;
      let file = target.files[0];

      if (!file || !file.type.startsWith('image/')) {
        return;
      }

      const img = document.createElement("img");
      img.classList.add("journey-cover");
      $(target).next().empty();
      $(target).next().append(img);
      const reader = new FileReader();

      reader.onload = function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      }(img);

      reader.readAsDataURL(file);
      var iconData = new FormData();
      iconData.append('icon', file);
      iconData.append('name', $(target).attr("id"));
      var journey = new Journeys({
        "id": $(target).attr("id")
      });
      journey.save(iconData, {
        processData: false,
        cache: false,
        contentType: false,
        patch: true,
        data: iconData,

        success(response) {
          console.log("Icon uploaded successfully");
        },

        error(xhr, status_code, error_message) {
          console.log(error_message);
        }

      });
    },

    /**
     * Close Full Page Popup:
     * This function can be triggered on click or direct call by passing a popup name as attribue
     * Hence 'e' can be both event or popup name as string
     */
    closeJourneyPopup(e) {
      let popupName = e.type != undefined ? $(e.currentTarget).data('popup') : e;
      this.$('.' + popupName + ', .full_popup_overlay').addClass('animated slideOutDown');
      setTimeout(function () {
        this.$('.' + popupName + ', .full_popup_overlay').removeClass('animated slideOutDown');
        this.$(".create-journeys-wrap").empty();
      }, 500);
      $('body').removeClass('fixedHeight');
    },

    toggleJourneyPrivacyList(e) {
      this.$(e.currentTarget).toggleClass('active');
      this.$(e.currentTarget).siblings('.journeys-privacy-opt').toggleClass('hide');
    },

    togglePrivacyOption(e) {
      this.$(e.currentTarget).toggleClass('selected');
      this.updateSelectedGroupsInfo();
    },

    showAddChaptersToJourneysPopup(e) {
      this.$('.journey-assets').empty();
      var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
      this.$('form[name=save-assets] .save, form[name=save-assets] .browser-chapters').attr('id', journeySlug); // fetch journey assets

      let journeyAssets = new Journeys({
        id: journeySlug
      });
      let journeyAssetsDetails;
      var root = this;
      $.when(journeyAssets.fetch({
        async: false,
        processData: true
      })).done(function (response, status, xhr) {
        journeyAssetsDetails = response.assets;
        root.showPopup('add-journey-chapters-popup');

        if (journeyAssetsDetails.length) {
          root.$('.add-journey-chapters-popup .form-action-type').text("edit");
        }

        _.each(journeyAssetsDetails, asset => {
          asset.breadcrumb = `Home > ${asset.section.slug} > ${asset.slug}`;

          if (asset.product.slug != asset.section.slug) {
            asset.breadcrumb = `Home > ${asset.product.slug} > ${asset.slug}`;
          }
        });

        root.$('.journey-assets').html(journeyAssetsTemplate(journeyAssetsDetails));
        root.initializeJourneyAssetsSortable();
      });
    },

    // Journey Asset reorder
    initializeJourneyAssetsSortable() {
      this.$(".journey-assets").sortable({
        placeholder: 'highlight',
        handle: ".journey-asset-drag",
        containment: "parent"
      });
    },

    getSelectedJourneySlug(e) {
      this.selectedJourneySlug = $(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
      return this.selectedJourneySlug;
    },

    // Display sitemap tree based on restriction already choosen by user
    browserChapters(e) {
      let selectedGroupIds = [];
      let journeySlug = this.$(e.currentTarget).attr('id');
      this.$('.chapters-list-popup .save').text('choose');
      let selectedGroups = this.$(`.journeys-details-wrap[data-journey-slug=${journeySlug}]`).find('.journeys-privacy-opt li');

      _.each(selectedGroups, group => {
        selectedGroupIds.push(parseInt($(group).data('group-id')));
      });

      Common.fetchSiteMapData().then(data => {
        let siteMapData = Common.updateSitemapData(data, selectedGroupIds); // preselecting the journey assets in tree structure

        let journeyAsset = this.$(".journey-assets .journey-link-details a");
        let journeyAssetIds = [];

        _.each(journeyAsset, asset => {
          journeyAssetIds.push($(asset).data("id"));
        });

        this.preSelectJourneyAssets(siteMapData, journeyAssetIds);
        this.$el.find('#chapters-list-wrap').html(siteMapData.length ? journeySiteMapTemplate({
          'siteMapData': siteMapData
        }) : `<div> ${this.NO_RECORDS_TEXT} </div>`);
        this.$("#chapters-list-wrap .loading-icon").hide();
      }).catch(e => {
        console.log(e);
        this.$el.find('#chapters-list-wrap').html('<div>Oops! Something went wrong.</div>');
      });
    },

    preSelectJourneyAssets(siteMapData, journeyAssetIds) {
      _.each(siteMapData, data => {
        if (data.children && data.children.length) {
          data.children = this.preSelectJourneyAssets(data.children, journeyAssetIds);
        }

        _.each(data.playlists, playlist => {
          _.each(playlist.demos, chapter => {
            if (journeyAssetIds.includes(chapter.walkthrough_id)) chapter.is_selected = true;
          });
        });
      });

      return siteMapData;
    },

    updateUrl(e) {
      var parentBlock = this.$(e.currentTarget).parent('.cta-input-wrap');
      $('.edit-tool-tip').remove();
      if (e.altKey || [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(e.keyCode) !== -1) return;
      var value = $(e.target).val();

      if (value && value.length && value.length > 4 && value.indexOf('http') !== 0) {
        $(e.target).val('https://' + value);
      }
    },

    saveCTADetails(e) {
      e.preventDefault();
      let showError = false;
      let ctaTitle = this.$('#journey-cta-btn');
      let ctaLink = this.$('#journey-cta-link');

      if (!ctaTitle.val()) {
        this.customErrorMessage('Provide a title for the link.', $(ctaTitle).parent(), $(ctaTitle));
        showError = true;
      }

      if (!ctaLink.val()) {
        this.customErrorMessage('Provide a title for the link.', $(ctaLink).parent(), $(ctaLink));
        showError = true;
      }

      if (!Common.validateUrl(ctaLink.val())) {
        this.customErrorMessage('Oops! Please enter a valid URL.', $(ctaLink).parent(), $(ctaLink));
        showError = true;
      }

      if (showError) {
        return;
      }

      $('.edit-tool-tip').remove();
      let journeySlug = this.$(e.currentTarget).attr('id');
      let journeyName = this.$(e.currentTarget).attr('name');
      let ctaDetails = {
        "id": journeySlug,
        "is_cta": true,
        "options": {
          "type": "link",
          "cta_text": ctaTitle.val(),
          "cta_link": ctaLink.val()
        },
        "name": journeyName,
        "slug": journeySlug
      };
      let journey = new Journeys(ctaDetails);
      this.actionInProgress('add-journeys-cta-popup');
      var root = this;
      journey.save(null, {
        patch: true,
        wait: true,

        success(response) {
          root.actionSuccess('add-journeys-cta-popup', false);
        },

        error(xhr, status_code, error_message) {
          console.log("error: " + error_message);
        }

      });
    },

    hideAddChaptersToJourneysPopup() {
      this.closePopup('add-journey-chapters-popup');
      this.$('.journey-assets').empty();
    },

    showAddCTAToJourneysPopup(e) {
      var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
      var journeyName = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-name');
      this.$('form[name=journey-cta] .save').attr({
        'id': journeySlug,
        'name': journeyName
      });
      let journeyDetails = new Journeys({
        id: journeySlug
      });
      let journeyCTADetails;
      let root = this;
      $.when(journeyDetails.fetch({
        async: false,
        processData: true
      })).done(function (response, status, xhr) {
        journeyCTADetails = response.cta_details;
        let ctaText = journeyCTADetails.cta_button !== null ? journeyCTADetails.cta_button.cta_text : '';
        let ctaLink = journeyCTADetails.cta_button !== null ? journeyCTADetails.cta_button.cta_link : '';
        let actionTypeText = ctaText || ctaLink ? 'edit' : 'add';

        if (actionTypeText == 'add') {
          if (document.defaultLocaleID !== SDCookies.getItem('author_locale')) {
            return root.switchLanguageWarning();
          }
        }

        root.$('.add-journeys-cta-popup .form-action-type').text(actionTypeText);
        root.$('form[name=journey-cta] #journey-cta-btn').val(ctaText);
        root.$('form[name=journey-cta] #journey-cta-link').val(ctaLink);
        root.showPopup('add-journeys-cta-popup');
      });
    },

    hideAddCTAToJourneysPopup() {
      this.closePopup('add-journeys-cta-popup');
    },

    toogleSitMapSections(e) {
      var icon = this.$(e.currentTarget);
      icon.toggleClass('expanded');
      icon.parent().siblings('ul').toggle();
    },

    toggleJourneyActions(e) {
      $('.journey-actions-list').addClass('hidden');

      if (e.type == "mouseenter") {
        $(e.currentTarget).find('.journey-actions-list').removeClass('hidden');
      }
    },

    // save all the selected chapters
    saveAssetsDetails(e) {
      e.preventDefault();
      $('.edit-tool-tip').remove();
      var assetsDetails = {};
      assetsDetails.is_asset = true;
      assetsDetails.id = this.$(e.currentTarget).attr('id');
      assetsDetails.asset = [];
      var assets = this.$('.journey-assets li');
      var root = this;

      _.each(assets, function (elem, index) {
        let linkElem = root.$(elem).find('.journey-link-url');
        assetsDetails.asset.push({
          'asset_type': linkElem.data('type'),
          'asset_id': linkElem.data('id'),
          'order': index + 1
        });
      });

      let journey = new Journeys(assetsDetails);
      this.actionInProgress('add-journey-chapters-popup');
      var root = this;
      journey.save(null, {
        patch: true,
        wait: true,

        success(response) {
          root.actionSuccess('add-journey-chapters-popup', false);
        },

        error(xhr, status_code, error_message) {
          console.log("error: " + error_message);
        }

      });
    },

    // Delete chapter from the journey assets
    removeAsset(e) {
      $(e.currentTarget).parents('.journey-link-data').remove();
    },

    // update choose button text upon choosing chapters from the sitemap
    updateChooseChapterButtonText(e) {
      let saveElem = this.$('.chapters-list-popup .save');
      let assetsCount = this.$('#chapters-list-wrap .css-checkbox:checked').length;

      if (!assetsCount) {
        $(saveElem).text('SAVE').removeClass('assets-selected');
      } else {
        $(saveElem).text(`CHOOSE CHAPTERS(${assetsCount})`).addClass('assets-selected');
      }
    },

    // choose assets to journey
    addInternalLink(e) {
      var selectedLinks = this.$('#chapters-list-wrap .css-checkbox:checked');

      if (selectedLinks.length) {
        this.$('.journey-assets').empty();
      }

      let assets = [];

      _.each(selectedLinks, selectedLink => {
        assets.push(this.updateInternalLink(selectedLink));
      });

      this.$('.journey-assets').html(journeyAssetsTemplate(assets));
      this.replacePopup(e);
    },

    // append selected chapter to the assets lists in view
    updateInternalLink(selectedLink) {
      var selectedElement = selectedLink;
      var link = window.location.origin + "/t/";
      var mainListElement = this.$(selectedElement).parents().closest("li[data-slug='" + $(selectedElement).attr('slug-id') + "']");
      var elementType = mainListElement.attr('data-item');

      if (elementType == 'chapter') {
        link += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';

        if (mainListElement.closest("li[data-item='section']").length) {
          link += mainListElement.closest("li[data-item='section']").attr('data-slug') + '/';
        }
      }

      link += mainListElement.attr('data-slug');
      let productSlug = mainListElement.closest("li[data-item='category']").attr('data-slug'),
          sectionSlug = mainListElement.closest("li[data-item='section']").attr('data-slug'),
          data = $(selectedElement).parents("li").data();

      if (data.item == 'chapter') {
        var asset = {
          type: "chapter",
          link: link,
          name: data.name,
          id: data.id,
          slug: data.slug,
          breadcrumb: `Home > ${sectionSlug} > ${data.slug}`
        };

        if (productSlug != sectionSlug) {
          asset.breadcrumb = `Home > ${productSlug} > ${data.slug}`;
        }

        return asset;
      }
    },

    // Publish Journey Popup
    showPublishJourneyPopup(e) {
      var journeySlug = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
      this.$('.confirm-publish-journey .confirm-publish').attr('id', journeySlug);
      this.showPopup('confirm-publish-journey');
    },

    // Confirm Publish Journey
    confirmPublishJourney(e) {
      let journeySlug = this.$(e.currentTarget).attr('id');
      var journey = new Journeys({
        id: journeySlug,
        is_publish: true
      });
      this.actionInProgress('confirm-publish-journey');
      var root = this;
      journey.save(null, {
        patch: true,
        wait: true,

        success(response) {
          root.actionSuccess('confirm-publish-journey', false);
          root.listAllJourneys();
        },

        error(xhr, response, error_message) {
          let status, duration;

          if (response.status == 404 && response.responseJSON.message === "NO_CONTENT") {
            status = 'no-content';
            duration = 5000;
          }

          root.actionFailed('confirm-publish-journey', status, duration);
        }

      });
    },

    // Enable , Disable Journey Popup
    showEnableDisableJourneyPopup(e) {
      if (this.$(e.target).parents('.journey-actions').siblings('.journeys-details').hasClass('disabled')) {
        var enable_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
        this.$('.enable-journey .enable').attr('id', enable_id);
        this.showPopup('enable-journey');
      } else {
        var disable_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
        this.$('.disable-journey .disable').attr('id', disable_id);
        this.showPopup('disable-journey');
      }

      ;
    },

    // Enable, Disable Journey Status
    enableDisableJourney(e) {
      let journeySlug = this.$(e.currentTarget).attr('id');
      let is_enabled = !this.$(e.currentTarget).hasClass('disable');
      var journey = new Journeys({
        id: journeySlug,
        is_enabled: is_enabled
      });
      is_enabled ? this.actionInProgress('enable-journey') : this.actionInProgress('disable-journey');
      var root = this;
      journey.save(null, {
        patch: true,
        wait: true,

        success(response) {
          is_enabled ? root.actionSuccess('enable-journey', false) : root.actionSuccess('disable-journey', false);
          root.listAllJourneys(); // root.section_id ? root.current_view.load(root.section_id, true) :
          //     root.current_view = new HomeView();
        },

        error(xhr, status_code, error_message) {
          is_enabled ? root.actionFailed('enable-journey') : root.actionFailed('disable-journey');
        }

      });
    },

    // Show Delete Journey Popup
    showDeleteJourneyPopup(e) {
      var delete_id = this.$(e.currentTarget).parents('.journeys-details-wrap').data('journey-slug');
      this.$('.delete-journey-popup .delete').attr('id', delete_id);
      this.showPopup('delete-journey-popup');
    },

    // Delete Journey
    deleteJourney(e) {
      var delete_id = this.$(e.currentTarget).attr('id');
      var journey = new Journeys({
        id: delete_id
      });
      this.actionInProgress('delete-journey-popup');
      var root = this;
      journey.destroy({
        wait: true,

        success() {
          root.actionSuccess('delete-journey-popup', false);
          root.listAllJourneys();
        },

        error(xhr, status_code, error_message) {
          root.actionFailed('delete-journey-popup');
        }

      });
    },

    // Common function to show popup
    showPopup(popupName) {
      this.$(".dashboard-overlay").css({
        "display": "table"
      });
      this.$(`.dashboard-overlay .popup-box.${popupName}`).show().addClass("bounceInDown");
      setTimeout(() => {
        this.$(`.dashboard-overlay .popup-box.${popupName}`).removeClass("bounceInDown");
      }, 300);
    },

    // Show language warning while creating Journey/CTA from other than default language
    switchLanguageWarning() {
      this.showPopup('create-warning');
      var warningMsg = `Switch to '${document.defaultLocale}' language to create a new content !`;
      this.$('.create-warning .popup-info').text(warningMsg);
    },

    // Close Language warning popup
    closeLanguageWarningPopup() {
      this.closePopup('create-warning');
      $('body').removeClass('fixedHeight');
    },

    // Common function to close popup
    closePopup(popupName, showOverlay) {
      this.$('.edit-tool-tip').remove();
      this.$(".dashboard-overlay ." + popupName).addClass("bounceOutUp");
      setTimeout(() => {
        this.$(".dashboard-overlay .popup-box." + popupName).hide().removeClass("bounceOutUp");

        if (!showOverlay) {
          this.$(".dashboard-overlay").hide();
        }
      }, 300);
    },

    initAutoComplete() {
      let root = this;
      this.$(".tags-autoComplete").autocomplete({
        source: root.journeyTags
      });
      this.$(".options-autoComplete").autocomplete({
        source: root.journeyTagOptions
      });
    },

    /**
     * This is a comman function to hide current popup and show a new popup without animation
     * Comman attribues to pass
     *  ele with class name --> trigger-inplace-popup
     *  ele with hide data attr --> data-hidePopup="popup class name to hide"
     *  ele with show data attr --> data-showPopup="popup class name to show"
     */
    replacePopup(e) {
      let popUpData = e.target.dataset;

      if (popUpData.showpopup) {
        this.$(`.${popUpData.showpopup}`).removeClass('hidden');
      }

      if (popUpData.hidepopup) {
        this.$(`.${popUpData.hidepopup}`).addClass('hidden');
      }
    },

    // Custom error messages
    customErrorMessage(message, target, elem) {
      this.$('.edit-tool-tip').remove();
      var editToolTip = '<div class="edit-tool-tip">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.focus();
    },

    // On submit - Animate progress 
    actionInProgress(target) {
      this.$('.' + target + ' .adding').addClass("slide-in is-submitted");
    },

    // On submit - Failed
    actionFailed(target, status = 'failed', duration = 1000) {
      setTimeout(() => {
        this.$(`.${target} .adding`).removeClass("slide-in is-submitted");
        this.$(`.${target} .${status}`).addClass("slide-in");
        setTimeout(() => {
          this.$(`.${target} .${status}`).removeClass("slide-in");
        }, duration);
      }, 1000);
    },

    // On submit - success
    actionSuccess(target, retain_popup) {
      let root = this;
      this.$('.' + target + ' .adding').removeClass("slide-in is-submitted");
      this.$('.' + target + ' .added').addClass("slide-in");
      setTimeout(function () {
        this.$('.' + target + ' .added').removeClass("slide-in");
        if (!retain_popup) root.closePopup(target);
      }, 1000);
    }

  });
  return EditView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/views/launchpad.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/views/launchpad.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/journeys */ "./sharedemos/static/js/apps/journeys/models/journeys.js"), __webpack_require__(/*! ../templates/launchpad.handlebars */ "./sharedemos/static/js/apps/journeys/templates/launchpad.handlebars"), __webpack_require__(/*! slick */ "./sharedemos/static/libs/slick/slick.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Journeys, Launchpad) {
  'use strict';

  var LaunchpadView = Backbone.View.extend({
    el: '#main_container',
    template: Launchpad,
    DEFAULT_LINK_ICON: `/static/images/${document.template}/journey/default_asset.jpg`,
    DEFAULT_HTML_ICON: `/static/images/${document.template}/journey/default_asset.jpg`,
    events: {
      'click .toggle-launch-pad-side-bar': () => {
        $('.launch-pad-player-wrapper').toggleClass('side-bar-open');
      },
      'click .journey-content p': 'changePage',
      'afterChange .journeys-holder': 'handleJourneyChange',
      'scroll .launch-page.active': 'launchPageScroll'
    },

    initialize(journeyId) {
      let journeys = new Journeys();
      this.journeySlug = journeyId;
      let initialSlide;
      let root = this;
      journeys.fetch({
        success(model, response) {
          let journeyAvailable = response.some((journey, i) => {
            initialSlide = i;
            return journey.slug == root.journeySlug;
          });

          if (!journeyAvailable) {
            window.location.href = '/';
          }

          _.each(response, journey => {
            _.each(journey.assets, asset => {
              if (!asset.thumbnail) {
                asset.thumbnail = `${document.cdn_url + root.DEFAULT_LINK_ICON}`;

                if (asset.first_slide == "html5") {
                  asset.thumbnail = `${document.cdn_url + root.DEFAULT_HTML_ICON}`;
                }
              }
            });
          });

          response.tenantLogo = root.$('#launch-pad-holder').data('logo');
          root.$('#launch-pad-holder').html(root.template(response));
          root.displayJourney();
          root.$('.journeys-holder').slick({
            prevArrow: $('.prev-launch-pad'),
            nextArrow: $('.next-launch-pad'),
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            initialSlide: initialSlide
          });
        }

      });
    },

    displayJourney() {
      this.$('.journey-content p, .launch-page.active, .next-chapter-pop, .side-bar-cta').removeClass('active');
      this.$('.launch-pad-title').html(this.$(`.journey-content[data-journey-slug=${this.journeySlug}]`).attr('data-journey-name'));
      this.$(`.journey-pages[data-journey-slug=${this.journeySlug}] .launch-page:nth-child(1)`).addClass('active');
      this.$(`.journey-content[data-journey-slug=${this.journeySlug}] p:nth-child(1)`).addClass('active');
      this.$(`.side-bar-cta[data-journey-slug=${this.journeySlug}]`).addClass('active');
    },

    changePage(e) {
      let root = this;
      let chapter = this.$(e.currentTarget).attr('data-chapter');
      root.$('.journey-content p, .launch-page.active, .next-chapter-pop').removeClass('active');
      root.$(`.journey-pages[data-journey-slug=${root.journeySlug}] .launch-page[data-chapter=${chapter}], .journey-content[data-journey-slug=${root.journeySlug}] p[data-chapter=${chapter}]`).addClass('active');
    },

    handleJourneyChange() {
      let root = this;
      root.journeySlug = root.$('.journey-content.slick-current').attr('data-journey-slug');
      Backbone.history.navigate(root.journeySlug, {
        replace: true
      });
      root.displayJourney();
    },

    launchPageScroll(e) {
      let page = this.$(e.currentTarget);

      if (page.scrollTop() + page.innerHeight() >= page[0].scrollHeight) {
        page.find('.next-chapter-pop').addClass('active');
      } else {
        page.find('.next-chapter-pop').removeClass('active');
      }
    }

  });
  return LaunchpadView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=17.23d226.js.map