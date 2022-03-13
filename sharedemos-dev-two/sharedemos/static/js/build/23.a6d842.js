(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

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

/***/ "./sharedemos/static/js/tenant/models/section.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/section.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Section = Backbone.Model.extend({
    urlRoot: "/api/section"
  });
  return Section;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/sitemap.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/sitemap.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var SiteMap = Backbone.Model.extend({
    urlRoot: "/api/sitemap"
  });
  return SiteMap;
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

/***/ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/main.handlebars":
/*!*********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/dashboard/sitemap/main.handlebars ***!
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

  return "    <li class=\"sortableListsClosed "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":35},"end":{"line":2,"column":77}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":78},"end":{"line":2,"column":113}}})) != null ? stack1 : "")
    + "\" data-item=\"category\" data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\n\n        <div style=\"margin-left:10px\" class=\"parentblock "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":57},"end":{"line":4,"column":99}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":100},"end":{"line":4,"column":135}}})) != null ? stack1 : "")
    + "\">\n\n            <span class=\"expandSection "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":39},"end":{"line":6,"column":81}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":82},"end":{"line":6,"column":117}}})) != null ? stack1 : "")
    + "\"></span>\n\n            <span class=\"siteMapTitle "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":38},"end":{"line":8,"column":80}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":81},"end":{"line":8,"column":116}}})) != null ? stack1 : "")
    + "\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":18,"column":23}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":29,"column":19}}})) != null ? stack1 : "")
    + "\n        </div>\n\n        <ul class=\"category\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":12},"end":{"line":45,"column":19}}})) != null ? stack1 : "")
    + "        </ul>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "undraggable";
},"4":function(container,depth0,helpers,partials,data) {
    return "asset-linked";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"category-demo-count item-count "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":56},"end":{"line":11,"column":98}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":99},"end":{"line":11,"column":134}}})) != null ? stack1 : "")
    + "\">\n                "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"demos_count") : depth0), depth0))
    + " Asset"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"demos_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":37},"end":{"line":12,"column":82}}})) != null ? stack1 : "")
    + ",\n            </span>\n\n            <span class=\"category-slide-count item-count "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":57},"end":{"line":15,"column":99}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":100},"end":{"line":15,"column":135}}})) != null ? stack1 : "")
    + "\">\n                "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slides_count") : depth0), depth0))
    + " Slide"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"slides_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":38},"end":{"line":16,"column":84}}})) != null ? stack1 : "")
    + "\n            </span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "s";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"remove-element click-btn hide undraggable\" title=\"Delete Item\"></span>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":16},"end":{"line":28,"column":27}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <span class=\"lib-cat-launch hide\">\n                        <a slug-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"ripple launch-btn click-btn undraggable\" target=\"_blank\">\n                            <span class=\"click-btn undraggable\">launch</span>\n                        </a>\n                    </span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":16},"end":{"line":44,"column":27}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":36,"column":20},"end":{"line":42,"column":29}}})) != null ? stack1 : "")
    + "\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars"),depth0,{"name":"render_sections","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":24},"end":{"line":41,"column":33}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars"),depth0,{"name":"render_playlists","data":data,"indent":"                            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"siteMapData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":48,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/popups.handlebars":
/*!***********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/dashboard/sitemap/popups.handlebars ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"sitemap-popup "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"displayClass") : depth0), depth0))
    + "\" data-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" data-item=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"item") : depth0), depth0))
    + "\">\n    <div class=\"sitemap-popup-overlay\" id=\"sitemap-popup-overlay\">\n        <div class=\"sitemap-popup-block popup-box\">\n            <div class=\"popup-title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"popupTitle") : depth0), depth0))
    + "</div>\n            <div class=\"popup-msg\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"popupMsg") : depth0), depth0))
    + "</div>\n            <div class=\"popup-footer\">\n                <div class=\"cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":36},"end":{"line":7,"column":55}}}))
    + "</div>\n                <div class=\"content-action "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"contentAction") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"contentAction") : depth0), depth0))
    + "</div>\n                <div class=\"action-success\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"contentAction") : depth0), depth0))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"successfull!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":62},"end":{"line":9,"column":85}}}))
    + "</div>\n                <div class=\"action-failed\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":10,"column":43},"end":{"line":10,"column":68}}}))
    + "</div>\n                <div class=\"action-progress\">\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"progress...",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":12,"column":20},"end":{"line":12,"column":42}}}))
    + "\n                    <div class=\"cd-loading\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars":
/*!*********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li class=\"\" data-item=\"demo\" data-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\n                <div style=\"margin-left:10px\" class=\"parentblock\">\n                    <span class=\"demoIcon\"></span>\n                    <span class=\"siteMapTitle\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n                    <span class=\"demo-slide-count item-count\">\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slides_count") : depth0), depth0))
    + " Slide"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"slides_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":46},"end":{"line":13,"column":92}}})) != null ? stack1 : "")
    + "\n                    </span>\n                    <span class=\"hide remove-element click-btn undraggable\" title=\"Delete Item\"></span>\n                    <span class=\"hide lib-cat-launch\">\n                        <a slug-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"ripple launch-btn click-btn undraggable\" target=\"_blank\">\n                    <span class=\"click-btn undraggable\">launch</span></a>\n                    </span>\n                </div>\n                <ul class=\"demo\" id=\""
    + alias2(alias1((depths[2] != null ? lookupProperty(depths[2],"slug") : depths[2]), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\"></ul>\n            </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "s";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"\" data-item=\"playlist\" data-slug=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n    <div style=\"margin-left:10px\" class=\"parentblock\">\n        <span class=\"playlistIcon\"></span>\n        <span class=\"siteMapTitle\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n    </div>\n    <ul class=\"playlist\" id=\""
    + alias2(alias1((depths[1] != null ? lookupProperty(depths[1],"slug") : depths[1]), depth0))
    + "_"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"id") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chapters") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":23,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars":
/*!********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "undraggable";
},"3":function(container,depth0,helpers,partials,data) {
    return "asset-linked";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <span class=\"section-demo-count item-count "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":51},"end":{"line":10,"column":93}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":94},"end":{"line":10,"column":129}}})) != null ? stack1 : "")
    + "\">\n            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"demos_count") : depth0), depth0))
    + " Demo"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"demos_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":32},"end":{"line":11,"column":77}}})) != null ? stack1 : "")
    + ",\n        </span>\n\n        <span class=\"section-slide-count item-count "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":52},"end":{"line":14,"column":94}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":95},"end":{"line":14,"column":130}}})) != null ? stack1 : "")
    + "\">\n            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slides_count") : depth0), depth0))
    + " Slide"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"slides_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":34},"end":{"line":15,"column":80}}})) != null ? stack1 : "")
    + "\n        </span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "s";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <span class=\"hide remove-element click-btn undraggable\" title=\"Delete Item\"></span>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":12},"end":{"line":27,"column":23}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"hide lib-cat-launch\">\n                    <a slug-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" class=\"ripple launch-btn click-btn undraggable\" target=\"_blank\">\n                        <span class=\"click-btn undraggable\">launch</span>\n                    </a>\n                </span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":12},"end":{"line":41,"column":23}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"children") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data,"loc":{"start":{"line":34,"column":16},"end":{"line":40,"column":25}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_sections.handlebars"),depth0,{"name":"render_sections","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":20},"end":{"line":39,"column":29}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/render_playlists.handlebars"),depth0,{"name":"render_playlists","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<li class=\"sortableListsClosed "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":31},"end":{"line":1,"column":73}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":74},"end":{"line":1,"column":109}}})) != null ? stack1 : "")
    + "\" data-item=\"section\" data-slug=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\">\n                            \n    <div style=\"margin-left:10px\" class=\"parentblock "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":53},"end":{"line":3,"column":95}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":96},"end":{"line":3,"column":131}}})) != null ? stack1 : "")
    + "\">\n\n        <span class=\"expandSection "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":35},"end":{"line":5,"column":77}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":78},"end":{"line":5,"column":113}}})) != null ? stack1 : "")
    + "\"></span>\n\n        <span class=\"siteMapTitle "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":34},"end":{"line":7,"column":76}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":77},"end":{"line":7,"column":112}}})) != null ? stack1 : "")
    + "\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\n\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":17,"column":19}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":28,"column":15}}})) != null ? stack1 : "")
    + "\n    </div>\n    <ul class=\"section\" id=\""
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "\" style=\"display: none;\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editable") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":8},"end":{"line":42,"column":15}}})) != null ? stack1 : "")
    + "    </ul>\n</li>";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/sitemap.js":
/*!******************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/sitemap.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/sitemap */ "./sharedemos/static/js/tenant/models/sitemap.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../models/playlist */ "./sharedemos/static/js/tenant/models/playlist.js"), __webpack_require__(/*! ../models/walkthrough */ "./sharedemos/static/js/tenant/models/walkthrough.js"), __webpack_require__(/*! ../templates/dashboard/sitemap/main.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/main.handlebars"), __webpack_require__(/*! ../templates/dashboard/sitemap/popups.handlebars */ "./sharedemos/static/js/tenant/templates/dashboard/sitemap/popups.handlebars"), __webpack_require__(/*! ../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, SiteMap, Section, Playlist, Demo, SiteMapMainTemplate, SiteMapPopupTemplate, Translate) {
  'use strict';

  var SiteMapView = Backbone.View.extend({
    // Render the dashboard SiteMap view and handle events - reordering, deleting, launching urls.
    el: '#siteMap-block',
    events: {
      'click .sitemap-popup-block .cancel': 'closeDeletePopup',
      'click .sitemap-popup-block .delete': 'deleteElement',
      'click .remove-element': 'showDeletePopup',
      'click .launch-btn': 'launchUrl',
      'mouseover li div': 'hideOptions',
      'mouseout li div': 'showOptions'
    },
    NO_RECORDS_TEXT: 'No content added yet!',
    initialize: function () {
      this.siteMap = new SiteMap();
      this.render();
    },
    render: function () {
      var root = this;
      this.siteMap.fetch({
        success: function (model, response) {
          root.$('#siteMap-loading-block').hide();

          if (response) {
            root.$el.find('#siteMap').html(SiteMapMainTemplate({
              'siteMapData': response
            }));
            root.loadSortbaleOptions();
          } else {
            root.$el.find('#siteMap').html('<div>' + root.NO_RECORDS_TEXT + '</div>');
          }
        },
        error: function (xhr, status_code, message) {
          console.log("siteMap fetch error:", xhr, status_code, message);
        }
      });
    },
    loadSortbaleOptions: function () {
      var root = this;
      this.$el.find('#siteMap').sortableLists({
        placeholderCss: {
          'background-color': '#e8f0fd'
        },
        hintCss: {
          'background-color': '#bbf'
        },
        listSelector: 'ul',
        insertZone: 30,
        insertZonePlus: true,
        scroll: 100,
        onChange: function (currentEle) {
          // Called whenever an element's position is changed.
          // Use this function cause, it will be triggered whenever a change happens,
          // so simply clicking an element wont trigger this.
          var afterEleSlug = '';

          if (currentEle.prev().length) {
            afterEleSlug = currentEle.prev().attr('data-slug');
          } // Send Backbone model call request with 
          // currentElement, target parent slug, after-element-slug.


          root.reorderElement(currentEle, currentEle.attr('target-parent-slug'), afterEleSlug);
        },
        isAllowed: function (currentEle, hint, target) {
          // Be carefull if you test some ul/ol elements here.
          // Sometimes ul/ols are dynamically generated,
          // and so they do not have some attributes as natural ul/ols.
          // Be careful also if the hint is not visible.
          // It has only display none so it is at the
          // previous place where it was before(excluding first moves before showing).
          var targetItem = target.attr('data-item'),
              currentlyDragged = currentEle.attr('data-item'); // Restricted Sections, Asset Linked Sections scenario.

          if (target.hasClass('undraggable') || target.hasClass('asset-linked')) {
            hint.css({
              'background-color': '#000',
              'height': '10px'
            });
            return false;
          } // category scenario.


          if (currentlyDragged == 'category' && targetItem == 'playlist' || currentlyDragged == 'category' && targetItem == 'demo' || currentlyDragged == 'category' && target.children().children("li[data-item='playlist']").length) {
            hint.css({
              'background-color': '#000',
              'height': '10px'
            });
            return false;
          } // Section scenario.


          if (currentlyDragged == 'section' && targetItem == 'playlist' || currentlyDragged == 'section' && targetItem == 'demo' || currentlyDragged == 'section' && target.children().children("li[data-item='playlist']").length) {
            hint.css({
              'background-color': '#000',
              'height': '10px'
            });
            return false;
          } // Playlist scenario.


          if (currentlyDragged == 'playlist' && targetItem == null || currentlyDragged == 'playlist' && targetItem == 'demo' || currentlyDragged == 'playlist' && targetItem == 'playlist' || currentlyDragged == 'playlist' && target.children().children("li[data-item='section']").length) {
            hint.css({
              'background-color': '#000',
              'height': '10px'
            });
            return false;
          } // Demo scenario.


          if (currentlyDragged == 'demo' && targetItem != 'playlist') {
            hint.css({
              'background-color': '#000',
              'height': '10px'
            });
            return false;
          } // Allow the user to drag n drop.


          hint.css({
            'background-color': '#E1EBFF',
            'height': '10px',
            'border-top': '1px solid #f2f2f2',
            'border-bottom': '1px solid #f2f2f2'
          });
          var currentSlug = currentEle.attr('data-slug');
          var targetParentSlug = target.attr('data-slug'); // Set the target slug attribute to the Current Element.
          // Change the attributes according to the dropped.

          if (targetParentSlug) {
            currentEle.attr('target-parent-slug', targetParentSlug);

            if (currentEle.attr('data-item') == 'category') {
              currentEle.attr('data-item', 'section');
            }
          } // If the element is dropped as outside a Product.
          else {
              currentEle.attr('target-parent-slug', "");

              if (currentEle.attr('data-item') == 'section') {
                currentEle.attr('data-item', 'category');
              }
            }

          return true;
        },
        opener: {
          active: true,
          close: '/static/images/hide_nav_icon.png',
          open: '/static/images/expand_nav_icon.png',
          openerCss: {
            'display': 'inline-block',
            'width': '13px',
            'height': '13px',
            'float': 'left',
            'margin': '8px 5px 0px 0px',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
            'background-size': '100%'
          },
          openerClass: ''
        },
        ignoreClass: 'undraggable'
      });
    },
    launchUrl: function (event) {
      var launchElement = event.currentTarget;
      launchElement.href = "/edit/#!/";
      var mainListElement = this.$(launchElement).parents().closest("li[data-slug='" + $(launchElement).attr('slug-id') + "']");
      var elementType = mainListElement.attr('data-item');

      if (elementType == 'demo') {
        launchElement.href += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';

        if (mainListElement.closest("li[data-item='section']").length) {
          launchElement.href += mainListElement.closest("li[data-item='section']").attr('data-slug') + '/';
        }
      } else if (elementType == 'section' && mainListElement.closest("li[data-item='category']").attr('data-slug')) {
        launchElement.href += mainListElement.closest("li[data-item='category']").attr('data-slug') + '/';
      }

      launchElement.href += mainListElement.attr('data-slug');
      this.$(launchElement).children().find('span').click(1);
    },
    showOptions: function (event) {
      // Display 'delete-icon, launch-btn' on hover. 
      this.$(event.currentTarget).children('.remove-element,.lib-cat-launch').addClass('hide');
    },
    hideOptions: function (event) {
      this.$(event.currentTarget).children().removeClass('hide');
    },
    reorderElement: function (currentElement, parentSlug, afterElementSlug) {
      // Reorder the items(category/section/playlist/demo) thru Backbone calls.
      // Args:
      //      currentElement  - DOM object of currently dragged element.
      //      parentSlug      - String/Integer slug/id data of the parent if exists.
      //      afterElementSlug    - String slug data of the element after the current Element.
      var patchData = {
        'reorder': 'tree_reorder',
        'target_parent_slug': parentSlug,
        'after_ele_slug': afterElementSlug
      };
      var modelApi;
      var dataItem = $(currentElement).attr('data-item');
      var dataSlug = $(currentElement).attr('data-slug');

      if (dataItem == 'section' || dataItem == 'category') {
        patchData.id = dataSlug;
        modelApi = new Section(patchData);
      } else if (dataItem == 'playlist') {
        patchData.id = parseInt(dataSlug);
        modelApi = new Playlist(patchData);
      } else if (dataItem == 'demo') {
        patchData.id = dataSlug;
        patchData.target_parent_slug = parseInt(parentSlug);
        modelApi = new Demo(patchData);
      } // TODO: Display a popup confirmation before re-ordering.


      var root = this;
      modelApi.save(null, {
        patch: true,
        success: function (responseStatus, msg, jqXhr) {
          root.fetchAndUpdateCount();
        },
        error: function (responseStatus, msg, statusText) {
          window.location.reload(true);
        }
      });
    },
    fetchAndUpdateCount: function () {
      var root = this;
      this.siteMap.fetch({
        success: function (model, response) {
          if (response) root.updateDemoSlideCount(response);else root.$el.find('#siteMap').html('<div>' + root.NO_RECORDS_TEXT + '</div>');
        },
        error: function (xhr, status_code, message) {
          console.log("siteMap fetch error:", xhr, status_code, message);
        }
      });
    },
    updateDemoSlideCount: function (siteMapData) {
      var root = this;

      var getText = function (count, item) {
        // Since this function is used only inside the 'updateDemoSlideCount',
        // its defined with limited scope. 
        return count > 1 ? count + ' ' + item + 's' : count + ' ' + item;
      };

      var updatePlaylistSlideCount = function (playlists = []) {
        // Since this function is used only inside the 'updateDemoSlideCount',
        // its defined with limited scope.
        _.each(playlists, function (playlist, index) {
          _.each(playlist.demos, function (demo, index) {
            root.$('li[data-slug="' + demo.slug + '"][data-item="demo"] span.demo-slide-count').text(getText(demo.slides_count, 'Slide'));
          });
        });
      };

      var updateSectionSlideCount = function (sections, type) {
        // Recursive function to update demos/slide count,
        // on section, subsections, playlists levels.
        _.each(sections, function (section, index) {
          root.$('li[data-slug="' + section.slug + '"] span.' + type + '-demo-count').text(getText(section.demos_count, 'Demo'));
          root.$('li[data-slug="' + section.slug + '"] span.' + type + '-slide-count').text(getText(section.slides_count, 'Slide'));
          if (section.children) updateSectionSlideCount(section.children, 'section');else if (section.playlists) updatePlaylistSlideCount(section.playlists);
        });
      }; // Loop thru the sitemap data and only update the demo, slide count using slug.


      updateSectionSlideCount(siteMapData, 'category');
    },
    closeDeletePopup: function (event) {
      this.$('.sitemap-popup .sitemap-popup-block').addClass('bounceOutUp');
      setTimeout(function () {
        $('#sitemap-popup-overlay').css('display', 'none');
        this.$('.sitemap-popup .sitemap-popup-block').removeClass('bounceOutUp');
      }, 300);
    },
    showDeletePopup: function (event) {
      var deleteItem = this.$(event.currentTarget).closest('li').attr('data-item');
      var deleteSlug = this.$(event.currentTarget).closest('li').attr('data-slug');
      var templateVars = {
        'slug': deleteSlug,
        'item': deleteItem,
        'displayClass': 'visible',
        'popupTitle': 'delete ' + deleteItem,
        'popupMsg': 'Are you sure you want to delete this ' + deleteItem + ' ?',
        'contentAction': 'delete'
      };
      this.$el.find('#siteMap-popup').html(SiteMapPopupTemplate(templateVars));
      $('#sitemap-popup-overlay').css('display', 'table-cell');
      this.$('.sitemap-popup .sitemap-popup-block').addClass('bounceInDown');
      var root = this;
      setTimeout(function () {
        root.$('.sitemap-popup .sitemap-popup-block').removeClass("bounceInDown");
      }, 300);
    },
    deleteElement: function (event) {
      this.$('.sitemap-popup .action-progress').addClass('slide-in');
      var deleteSlug = this.$(event.currentTarget).parents('.sitemap-popup').attr('data-slug');
      var deleteType = this.$(event.currentTarget).parents('.sitemap-popup').attr('data-item');
      var root = this;

      if (!deleteSlug || !deleteType) {
        this.$('.sitemap-popup .action-progress').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
          root.$('.sitemap-popup .action-failed').addClass('slide-in');
        });
        setTimeout(function () {
          root.closeDeletePopup(event);
        }, 2000);
        return;
      }

      var modelApi;
      if (deleteType == 'category' || deleteType == 'section') modelApi = new Section({
        id: deleteSlug
      });else if (deleteType == 'demo') modelApi = new Demo({
        id: deleteSlug
      });
      modelApi.destroy({
        wait: true,
        success: function (responseStatus, msg, jqXhr) {
          // Display the success ux.
          root.$('.sitemap-popup .action-progress').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            root.$('.sitemap-popup .action-success').addClass('slide-in');
          }); // Update the count and Remove the element from the sitemap.

          setTimeout(function () {
            root.fetchAndUpdateCount(); // Update the total demos/slides count on the library info block.

            if (window.updateDemosSlidesCount) window.updateDemosSlidesCount();
            root.$('li[data-item="' + deleteType + '"][data-slug="' + deleteSlug + '"]').remove();
            root.closeDeletePopup(event);
          }, 2000);
        },
        error: function (responseStatus, msg, statusText) {
          root.$('.sitemap-popup .action-progress').addClass('is-submitted').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            root.$('.sitemap-popup .action-failed').addClass('slide-in');
          });
          setTimeout(function () {
            window.location.reload(true);
          }, 2000);
        }
      });
    }
  });
  return SiteMapView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=23.a6d842.js.map