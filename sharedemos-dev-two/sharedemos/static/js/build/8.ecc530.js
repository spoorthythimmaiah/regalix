(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./sharedemos/static/js/apps/bulletin_board/models/bulletin_board.js":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/apps/bulletin_board/models/bulletin_board.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var BulletinBoard = Backbone.Model.extend({
    urlRoot: "/api/bulletin-board"
  });
  return BulletinBoard;
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

/***/ "./sharedemos/static/js/tenant/models/activity.js":
/*!********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/activity.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Activity = Backbone.Model.extend({
    urlRoot: "/walkthrough-activity"
  });
  return Activity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/cta.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/cta.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Cta = Backbone.Model.extend({
    urlRoot: "/api/cta"
  });
  return Cta;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/linkedin_user.js":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/linkedin_user.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var LinkedinUser = Backbone.Model.extend({
    urlRoot: "/api/user/linkedin"
  });
  return LinkedinUser;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/rate_content.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/rate_content.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var RateContent = Backbone.Model.extend({
    urlRoot: "/api/rate"
  });
  return RateContent;
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

/***/ "./sharedemos/static/js/tenant/models/social_share.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/social_share.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var SocialShare = Backbone.Model.extend({
    urlRoot: "/api/social-share"
  });
  return SocialShare;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/user-details.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/user-details.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var UserDetails = Backbone.Model.extend({
    urlRoot: "/post-user-details"
  });
  return UserDetails;
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

/***/ "./sharedemos/static/js/tenant/routers/router.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/tenant/routers/router.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../views/home */ "./sharedemos/static/js/tenant/views/home.js"), __webpack_require__(/*! ../views/section */ "./sharedemos/static/js/tenant/views/section.js"), __webpack_require__(/*! ../views/player */ "./sharedemos/static/js/tenant/views/player.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Common, Section, HomeView, SectionView, PlayerView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      "": "home",
      "!": "home",
      "!/": "home",
      "!/:product": "routeHandler",
      "!/:product/": "routeHandler",
      "!/:product/:param_01": "routeHandler",
      "!/:product/:param_01/": "routeHandler",
      "!/:product/:param_01/:param_02": "routeHandler",
      "!/:product/:param_01/:param_02/": "routeHandler",
      "!/:product/:param_01/:param_02/:slide_index": "routeHandler",
      "!/:product/:param_01/:param_02/:slide_index/": "routeHandler",
      "*splat": "trybang"
    },
    route: function (route, name, callback) {
      // NOTE : DO NOT TOUCH THIS METHOD
      // This is a core method of Backbone.Router
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);

      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }

      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function (fragment) {
        // CUSTOMIZATION - Discard parts of URL after ampersand
        var newFragment = fragment.split('&')[0];

        var args = router._extractParameters(route, newFragment);

        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },
    trybang: function (splat) {
      if (/^[^!].*/.test(splat)) {
        // does not start with !
        this.navigate("#!/" + splat, {
          trigger: true
        });
      }

      return false;
    },
    initialize: function () {
      this.on('route', function (params, args) {
        var url_with_bang = Backbone.history.getFragment();
        var url = url_with_bang.substr(1) || '/';

        if (!document.requestParameters) {
          if (typeof ga != 'undefined') {
            ga('fwt_tracker.set', 'page', url);
            ga('fwt_tracker.send', 'pageview');
          } // VMWare tracking code


          if (window.s) {
            window.s.pageURL = [document.location.origin, url].join("");
            window.s.tl();
          }
        }
      });
    },
    home: function () {
      document.product = null;
      document.section = null;

      if (document.viewType && _.indexOf(['audience', 'home', 'edit', 'preview'], document.viewType) !== -1) {
        this.loadView(HomeView);
        this.currentView = 'home';
        $('#avaiable_for_offline').hide();
      }
    },
    routeHandler: function (product, param_01, param_02, slide_index) {
      document.product = product;
      document.section = param_01 ? param_01 : product;
      document.chapter = param_02;
      var root = this;

      if (!Common.product_details || Common.product_details.id != product) {
        Common.product_details = new Section({
          id: product
        });
        $.when(Common.product_details.fetch()).fail(function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status == 302) {
            var url = Backbone.history.getHash(); // replaces old product slug with new slug(replace first occurance of string)

            url = url.replace(product, jqXHR.responseJSON);
            Backbone.history.navigate('#' + url, {
              trigger: true
            });
          } else {
            Common.modelFetchErrorHandler(jqXHR, textStatus, errorThrown);
          }
        }).done(function (response) {
          if (response.ret_url) {
            let redirect_url = response.ret_url;

            _.extend(response.args, {
              next: window.location.pathname + window.location.hash
            });

            redirect_url += '?' + $.param(response.args);
            window.location.href = window.location.origin + redirect_url;
          } else {
            root.loadProductDetails(product, param_01, param_02, slide_index);
          }
        });
      } else {
        this.loadProductDetails(product, param_01, param_02, slide_index);
      }
    },
    loadProductDetails: function (product, param_01, param_02, slide_index) {
      $('#avaiable_for_offline').hide();
      var hasChildren = false;
      var hasPlaylists = false;

      if (Common.product_details) {
        if (Common.product_details.get('children') && Common.product_details.get('children').length) {
          hasChildren = true;
        }

        if (Common.product_details.get('playlists') && Common.product_details.get('playlists').length) {
          hasPlaylists = true;
        }
      }

      if (param_01 && param_02 && slide_index) {
        this.player(Common.product_details.id, param_01, param_02, slide_index);
      } else if (hasChildren) {
        // check if children exists in api(not exists in all section api)
        if (param_01 && param_02) {
          this.player(Common.product_details.id, param_01, param_02);
        } else {
          this.section(Common.product_details.id, param_01);
        }
      } else if (hasPlaylists && param_01) {
        // If one level deep demo name is updated
        if (this.view && param_01 !== this.view.walkthrough_id) {
          var root = this;
          $.when(Common.product_details.fetch()).fail(function (attrs, textStatus, xhr) {
            if (attrs.status == 302) {
              var url = Backbone.history.getHash(); // replaces old product slug with new slug(replace first occurance of string)

              url = url.replace(product, attrs.responseJSON);
              Backbone.history.navigate('#' + url, {
                trigger: true
              });
            } else {
              Common.modelFetchErrorHandler(attrs, xhr);
            }
          }).done(function () {
            root.player(Common.product_details.id, null, param_01, param_02);
          });
        } else {
          this.player(Common.product_details.id, null, param_01, param_02);
        }
      } else {
        this.section(Common.product_details.id);
      }

      $('script[type="application/ld+json"]').remove();
      var icon;

      if (Common.product_details.attributes.icon && Common.product_details.attributes.icon.path) {
        icon = window.location.hostname + '/static/media/' + Common.product_details.attributes.icon.path;
      } else {
        icon = window.location.hostname + Common.SECTION_IMAGE_PATH;
      }

      $('head').append('<script type="application/ld+json">' + '{' + '"@context": "https://schema.org/",' + '"@type": "Product",' + '"name": "' + Common.product_details.attributes.name + '",' + '"image": "' + icon + '",' + '"description": "' + Common.product_details.attributes.description + '",' + '"url" : "' + window.location.href + '",' + '"brand": {' + '"@type": "Product",' + '"name": "Product Walkthroughs"' + '}' + '}' + '</script>');
    },
    section: function (product, section) {
      if (this.currentView && this.currentView == 'section') {
        if (section) {
          this.view.load(section);
        } else {
          this.view.load(product);
        }
      } else {
        if (section) {
          this.loadView(SectionView, {
            section: section
          });
        } else {
          this.loadView(SectionView, {
            section: product
          });
        }

        this.currentView = 'section';
      }

      $('script[type="application/ld+json"]').remove();
    },
    player: function (product, section, walkthrough, slide_index) {
      if (slide_index) {
        slide_index = parseInt(slide_index);
      }

      if (this.currentView && this.currentView == 'player') {
        if (this.view.product_id != product || this.view.section_id != section && this.view.section_id != product || this.view.walkthrough_id != walkthrough) {
          this.view.load(product, section, walkthrough, slide_index);
        } else {
          if (!this.view.slide_views) {
            this.view.loadData();
          } else if (slide_index && slide_index > this.view.slide_views.length) {
            slide_index = this.view.slide_views.length;
            return Common.loadWalkthrough(this.view.product_id, this.view.section_id, this.view.walkthrough_id, slide_index);
          } else {
            this.view.moveToSlide(slide_index);
          }
        }
      } else {
        this.loadView(PlayerView, {
          product: product,
          section: section,
          walkthrough: walkthrough,
          slide_index: slide_index
        });
        this.currentView = 'player';
      }
    },
    loadView: function (SDView, attrs) {
      this.view && this.view.unload && this.view.unload();
      this.view = new SDView(attrs);
    }
  });
  return AppRouter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\-sections\\-all\\.handlebars$":
/*!**********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/home\-sections\-all\.handlebars$ ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/home-sections-all.handlebars": "./sharedemos/static/js/tenant/templates/box/home-sections-all.handlebars",
	"./default/home-sections-all.handlebars": "./sharedemos/static/js/tenant/templates/default/home-sections-all.handlebars",
	"./grid/home-sections-all.handlebars": "./sharedemos/static/js/tenant/templates/grid/home-sections-all.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\-sections\\-all\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\.handlebars$":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/home\.handlebars$ ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/home.handlebars": "./sharedemos/static/js/tenant/templates/box/home.handlebars",
	"./default/home.handlebars": "./sharedemos/static/js/tenant/templates/default/home.handlebars",
	"./grid/home.handlebars": "./sharedemos/static/js/tenant/templates/grid/home.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/playlist\\.handlebars$":
/*!***********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/playlist\.handlebars$ ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/playlist.handlebars": "./sharedemos/static/js/tenant/templates/box/playlist.handlebars",
	"./default/playlist.handlebars": "./sharedemos/static/js/tenant/templates/default/playlist.handlebars",
	"./grid/playlist.handlebars": "./sharedemos/static/js/tenant/templates/grid/playlist.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/playlist\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/recent\\-trending\\-demos\\.handlebars$":
/*!**************************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/recent\-trending\-demos\.handlebars$ ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/recent-trending-demos.handlebars": "./sharedemos/static/js/tenant/templates/box/recent-trending-demos.handlebars",
	"./default/recent-trending-demos.handlebars": "./sharedemos/static/js/tenant/templates/default/recent-trending-demos.handlebars",
	"./grid/recent-trending-demos.handlebars": "./sharedemos/static/js/tenant/templates/grid/recent-trending-demos.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/recent\\-trending\\-demos\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-list\\.handlebars$":
/*!****************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/section\-list\.handlebars$ ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/section-list.handlebars": "./sharedemos/static/js/tenant/templates/box/section-list.handlebars",
	"./default/section-list.handlebars": "./sharedemos/static/js/tenant/templates/default/section-list.handlebars",
	"./grid/section-list.handlebars": "./sharedemos/static/js/tenant/templates/grid/section-list.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-list\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-playlist\\.handlebars$":
/*!********************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/section\-playlist\.handlebars$ ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/section-playlist.handlebars": "./sharedemos/static/js/tenant/templates/box/section-playlist.handlebars",
	"./default/section-playlist.handlebars": "./sharedemos/static/js/tenant/templates/default/section-playlist.handlebars",
	"./grid/section-playlist.handlebars": "./sharedemos/static/js/tenant/templates/grid/section-playlist.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-playlist\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\.handlebars$":
/*!**********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates sync ^\.\/.*\/section\.handlebars$ ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./box/section.handlebars": "./sharedemos/static/js/tenant/templates/box/section.handlebars",
	"./default/section.handlebars": "./sharedemos/static/js/tenant/templates/default/section.handlebars",
	"./grid/section.handlebars": "./sharedemos/static/js/tenant/templates/grid/section.handlebars"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\.handlebars$";

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/bookmarks.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/bookmarks.handlebars ***!
  \********************************************************************/
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

  return "<div class=\"bookmark\">\n    <div class=\"bookmarks-container\" bookmark-index=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":2,"column":53},"end":{"line":2,"column":62}}}) : helper)))
    + "\">\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"image_src") || (depth0 != null ? lookupProperty(depth0,"image_src") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image_src","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":31}}}) : helper)))
    + "\" />\n        <h1>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":21}}}) : helper)))
    + "</h1>\n        <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":27}}}) : helper)))
    + "</h2>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"bulletin-board-block "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":45},"end":{"line":5,"column":86}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"can_edit") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":86},"end":{"line":5,"column":130}}})) != null ? stack1 : "")
    + "\" id="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":5,"column":135},"end":{"line":5,"column":142}}}) : helper)))
    + ">\r\n                <div class=\"bulletin-board-item\">\r\n                    <ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"links") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":24},"end":{"line":10,"column":33}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"has_more_links") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":24},"end":{"line":15,"column":31}}})) != null ? stack1 : "")
    + "                    </ul>\r\n                    <div class=\"right\">\r\n                        <div class='right-wrapper'>\r\n                            <div class='edit-hamburger no-action'><span class='no-action'></span></div>\r\n                            <div class='bulletin-board-drag no-action '>\r\n                                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 125\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\\\r\n                                    <polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" points=\"95,50 83.75,38.75 83.75,44.375 55.625,44.375 55.625,16.25 61.25,16.25   50,5 38.75,16.25 44.375,16.25 44.375,44.375 16.25,44.375 16.25,38.75 5,50 16.25,61.25 16.25,55.625 44.375,55.625 44.375,83.75   38.75,83.75 50,95 61.25,83.75 55.625,83.75 55.625,55.625 83.75,55.625 83.75,61.25 \"/>\\\r\n                                </svg>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class='edit'>\r\n                    <div class=\"hide-bulletinboard-options rippleEffect\"></div>\r\n                    <div class='enable-bulletin-board no-action rippleEffect'></div>\r\n                    <div class='duplicate-bulletin-board no-action rippleEffect'></div>\r\n                    <div class='edit-bulletin-board no-action rippleEffect'></div>\r\n                    <div class='delete-bboard no-action rippleEffect'></div>\r\n                </div>\r\n            </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"4":function(container,depth0,helpers,partials,data) {
    return "uneditable";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <li><a href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" target='_blank'>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</a></li>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"more_bb_links\">\r\n                                <a href=\"/bulletin-board-links/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"_id") || (depth0 != null ? lookupProperty(depth0,"_id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_id","hash":{},"data":data,"loc":{"start":{"line":13,"column":63},"end":{"line":13,"column":70}}}) : helper)))
    + "\" target='_blank'>Learn More</a>\r\n                            </div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"create-new-bulletin rippleEffect\"><p><span>+</span></br>add bulletin board</p></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container-title capital-letter\">bulletin board</div>\r\n<div class=\"row\">\r\n    <div class=\"bulletin-board-sortable\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"bulletinBoardData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":36,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":4},"end":{"line":40,"column":11}}})) != null ? stack1 : "")
    + "\r\n</div>\r\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/home-sections-all.handlebars":
/*!********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/home-sections-all.handlebars ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":23,"column":15}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":3},"end":{"line":22,"column":15}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<div class=\"pwt-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":5},"end":{"line":12,"column":16}}})) != null ? stack1 : "")
    + "					<div class=\"pwt-box ui-state-default "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":42},"end":{"line":13,"column":84}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":85},"end":{"line":13,"column":126}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":127},"end":{"line":13,"column":168}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n						<div class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"is_linked") : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":18},"end":{"line":14,"column":170}}})) != null ? stack1 : "")
    + "\" title=\""
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"sync_status") : stack1),"==","IN_PROGRESS",{"name":"compare","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":179},"end":{"line":14,"column":269}}})) != null ? stack1 : "")
    + "\"></div>\r\n						<div class=\"left icon\">\r\n							<div class=\"thumbnail_block\"><img class=\"theme-bg-color\" src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/></div>\r\n							<div class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n						</div>\r\n						<div class=\"right\"></div>\r\n					</div>\r\n				</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":11,"column":13}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Translations Available\"></div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "uneditable";
},"11":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " repository-linked "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"sync_status") : stack1),"!=","COMPLETED",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":73},"end":{"line":14,"column":162}}})) != null ? stack1 : "")
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    return " sync-inprogress ";
},"16":function(container,depth0,helpers,partials,data) {
    return "Sync in progress";
},"18":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"create-new rippleEffect\"><p><span>+</span></br>add category</p></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"container-title capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"categories",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":1,"column":44},"end":{"line":1,"column":65}}}))
    + "</div>\r\n<div class=\"row\">\r\n	<div class=\"sortable\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":24,"column":11}}})) != null ? stack1 : "")
    + "	</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":1},"end":{"line":28,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/home.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/home.handlebars ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"bulletin-board-container\">\r\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars */ "./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars"),depth0,{"name":"bulletin-board","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":79},"end":{"line":24,"column":104}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <div id=\"home-container\" class=\"page-container boxtemp\">\r\n	<div class=\"fs-banner\"> \r\n		<div class=\"title1\">\r\n			"
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_title") : depth0), depth0))
    + "\r\n		</div>\r\n	</div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"isBulletinBoardEnabled") : depth0),"&&",(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":1},"end":{"line":11,"column":13}}})) != null ? stack1 : "")
    + "	<div class=\"list-type\">\r\n		<div class=\"list-type-block\">\r\n			<div class=\"filter trending\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"trending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":32},"end":{"line":14,"column":51}}}))
    + "</div>\r\n			<div class=\"filter mostrecent\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"most recent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":34},"end":{"line":15,"column":56}}}))
    + "</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"pwt-list\">\r\n		<div class=\"home-container trending\"></div>\r\n		<div class=\"home-container mostrecent\"></div>\r\n		<div class=\"category-container all active\"></div>\r\n	</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":1},"end":{"line":25,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/playlist.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/playlist.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"playlist-block"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),{"name":"unless","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":81}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":82},"end":{"line":2,"column":124}}})) != null ? stack1 : "")
    + "\">\n        <div class=\"playlist_index\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"playlistCounter") : depth0), depth0))
    + "</div>\n        <div class=\"col-md-5 playlist-left\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":44},"end":{"line":4,"column":117}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":9,"column":23}}})) != null ? stack1 : "")
    + "            <div class=\"read\">\n                <div class=\"select-playlist\"></div>\n            </div>\n            <h3>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</h3>\n            <p>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</p>\n        </div>\n        <div class=\"col-md-7 playlist-right\">\n            <ul class=\"pwt-list sortable\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":42},"end":{"line":17,"column":115}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"walkthroughs") : stack1),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":71,"column":25}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":12},"end":{"line":76,"column":19}}})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"4":function(container,depth0,helpers,partials,data) {
    return " uneditable";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "playlist_id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1), depth0))
    + "\"";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"translations_available") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":16},"end":{"line":8,"column":23}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":102},"end":{"line":7,"column":135}}}))
    + "\"></div>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":20},"end":{"line":70,"column":32}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <li slug='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'  id='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "' class=\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":66},"end":{"line":20,"column":107}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"has_slides") : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":108},"end":{"line":20,"column":150}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"can_edit") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":151},"end":{"line":20,"column":196}}})) != null ? stack1 : "")
    + "\">\n                            <div class=\"read\">\n                                <div class=\"circle\">\n                                    <span class=\"chapter-index\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias3,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":23,"column":64},"end":{"line":23,"column":85}}}))
    + "</span>\n                                    <div class=\"select-chapter\"></div>\n                                </div>\n                                <div class=\"playlist-loader\">\n                                    <div class=\"playlist-loader-bg\"></div>        \n                                    <div class=\"spiner-holder-1 animate-0-25-a\">\n                                        <div class=\"spiner-holder-2 animate-0-25-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-25-50-a\">\n                                        <div class=\"spiner-holder-2 animate-25-50-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-50-75-a\">\n                                        <div class=\"spiner-holder-2 animate-50-75-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-75-100-a\">\n                                        <div class=\"spiner-holder-2 animate-75-100-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"title\">\n                                <div>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":36},"end":{"line":59,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",0,{"name":"compare","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":28},"end":{"line":68,"column":40}}})) != null ? stack1 : "")
    + "                        </li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"15":function(container,depth0,helpers,partials,data) {
    return "no-slides";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <span class=\"wt-draft\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"draft",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":53,"column":63},"end":{"line":53,"column":79}}}))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":40},"end":{"line":58,"column":47}}})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":40},"end":{"line":57,"column":47}}})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"wt-live\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"live",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":62},"end":{"line":56,"column":77}}}))
    + "</span>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <div class=\"playlist-tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":36},"end":{"line":66,"column":45}}})) != null ? stack1 : "")
    + "                                </div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":73,"column":12},"end":{"line":75,"column":19}}})) != null ? stack1 : "");
},"25":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"rippleEffect add-new-chapter\"><br><p><span>+</span></br>add asset</p></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),"||",(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"compare","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":80,"column":12}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/recent-trending-demos.handlebars":
/*!************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/recent-trending-demos.handlebars ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"recent-empty\"><p>nothing yet here</p></div>\r\n		<div class=\"recent-empty\"><p>nothing yet here</p></div>\r\n		<div class=\"recent-empty\"><p>nothing yet here</p></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<div class=\"recent\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "' demo='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n			<div class=\"preview_wrap\" style=\"background-image: url("
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"image_src") : depth0), depth0))
    + ");\" thumbnail_div='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n			</div>\r\n			<div class=\"information_wrap\">\r\n				<div class=\"title\">\r\n					"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n				</div>\r\n			</div>\r\n		</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row \">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"demos") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),"==",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":6,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"demos") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":1},"end":{"line":17,"column":10}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/section-list.handlebars":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/section-list.handlebars ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":43,"column":16}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":42,"column":20}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"col-md-6 col-xs-12 pwt-wrap\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":27}}})) != null ? stack1 : "")
    + "\n                <div class=\"pwt-box"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":77}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"can_edit") : depths[1]),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":78},"end":{"line":11,"column":122}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":123},"end":{"line":11,"column":164}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\n                    <div class=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"is_linked") : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":32},"end":{"line":12,"column":184}}})) != null ? stack1 : "")
    + "\" title=\""
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"sync_status") : stack1),"==","IN_PROGRESS",{"name":"compare","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":193},"end":{"line":12,"column":283}}})) != null ? stack1 : "")
    + "\"></div>\n                    <div class=\"left\">\n                        <div class=\"outer-circle\">\n                            <div class=\"inner-circle\">\n                                <div class=\"secondary-fill-color progress"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"progress_class") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":73},"end":{"line":16,"column":121}}})) != null ? stack1 : "")
    + "\">\n                                    <div class=\"section-icon\">\n                                        <img src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"right\">\n                        <div class=\"title\">\n                            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n                            <!-- This span tag for locked content -->\n                            <!-- <span class=\"lock\"></span> -->\n                        </div>\n                        <div class=\"pwt-description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":24},"end":{"line":37,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":8,"column":27}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":106},"end":{"line":7,"column":139}}}))
    + "\"></div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "uneditable";
},"11":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " repository-linked "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"repository_details") : depth0)) != null ? lookupProperty(stack1,"sync_status") : stack1),"!=","COMPLETED",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":87},"end":{"line":12,"column":176}}})) != null ? stack1 : "")
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    return " sync-inprogress ";
},"16":function(container,depth0,helpers,partials,data) {
    return "Sync in progress";
},"18":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"progress_class") : depth0), depth0));
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"labels-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":28},"end":{"line":35,"column":37}}})) != null ? stack1 : "")
    + "                            </div>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "                                <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":0},"end":{"line":48,"column":7}}})) != null ? stack1 : "");
},"24":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"create-new rippleEffect category\"><p><span>+</span></br>add category</p></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":44,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":0},"end":{"line":49,"column":7}}})) != null ? stack1 : "")
    + "\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/section-playlist.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/section-playlist.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":28},"end":{"line":63,"column":40}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":28},"end":{"line":66,"column":40}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":28},"end":{"line":69,"column":40}}})) != null ? stack1 : "")
    + "                        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"pdf-export camel-case\"><a class=\"export-to-pdf-link\" id='export-to-pdf' href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"export_pdf_link") : depth0), depth0))
    + "\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"export to pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":73,"column":139},"end":{"line":73,"column":163}}}))
    + "</a></div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"watch-videos capital-letter\" target=\"#video-slider-block\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"play video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":78,"column":98},"end":{"line":78,"column":119}}}))
    + "</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"section-video-popup\">\r\n                        <div class=\"hide-video-popup\"></div>\r\n                        <div class=\"section-video\">\r\n                            <div id=\"video-slider-block\">\r\n                                <div class=\"video-slider\">\r\n                                    <ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":88,"column":40},"end":{"line":95,"column":49}}})) != null ? stack1 : "")
    + "                                    </ul>\r\n                                </div>  \r\n                            </div>          \r\n                        </div>\r\n                    </div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <li>\r\n                                            <div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n                                                <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n                                            </div>                                      \r\n                                            <iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n                                        </li>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"related-products\">\r\n                            <div class='related-products-heading camel-case'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"related links",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":105,"column":77},"end":{"line":105,"column":101}}}))
    + ":</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":106,"column":28},"end":{"line":110,"column":37}}})) != null ? stack1 : "")
    + "                        </div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n                                "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n                            </div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":115,"column":97},"end":{"line":115,"column":122}}}))
    + "</a>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <div class=\"bulletin-board-container\">\r\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars */ "./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars"),depth0,{"name":"bulletin-board","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"create-new rippleEffect add-new-playlist\"><br><p><span>+</span></br>add playlist</p></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-playlist\" class=\"page-container newtemp boxtemp\">\r\n    <div class=\"overlay\">\r\n        <div class=\"sign-up-wrap\"></div>\r\n        <div class=\"offline-mode-block\">\r\n            <div class=\"offline-mode\"> \r\n                <div class=\"title capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":50},"end":{"line":6,"column":73}}}))
    + "</div>\r\n                <div class=\"offline-desc\">\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you'll be able to view these demos without an internet connection",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":43},"end":{"line":8,"column":120}}}))
    + ".</div>\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you wish to enable offline mode and download these playlists",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":43},"end":{"line":9,"column":118}}}))
    + "?</div>\r\n                </div>\r\n                <div class=\"footer\">\r\n                    <div class=\"offline-footer\">\r\n                        <div class=\"enable theme-bg-color\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":59},"end":{"line":13,"column":77}}}))
    + "</div>\r\n                        <div class=\"cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":44},"end":{"line":14,"column":61}}}))
    + "</div>\r\n                    </div>  \r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"disable-offline-block\">\r\n            <div class=\"disable-offline-mode\"> \r\n                <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":35},"end":{"line":21,"column":66}}}))
    + "</div>\r\n                <div class=\"offline-desc\">\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling offline mode will remove all this content from offline visibility",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":43},"end":{"line":23,"column":129}}}))
    + ".</div>\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to remove this content from offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":43},"end":{"line":24,"column":116}}}))
    + "?</div>\r\n                </div>\r\n                <div class=\"footer\">\r\n                    <div class=\"offline-footer\">\r\n                        <div class=\"disable-offline\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":53},"end":{"line":28,"column":71}}}))
    + "</div>\r\n                        <div class=\"cancel disable-cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":59},"end":{"line":29,"column":76}}}))
    + "</div>\r\n                    </div>  \r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"pwt-section\">\r\n        <div class=\"\">\r\n            <div class=\"fs-banner\">\r\n                <div class=\"section-pwt-list col-sm-12\">\r\n                    <div class=\"parent-section-icon\">\r\n                        <img src=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\r\n                        <div class=\"icon_overlay\"></div>\r\n                    </div>\r\n                    <div class=\"col-sm-2\">\r\n                        <div class=\"section-pwt-menu\" slug='"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'></div>\r\n                    </div>\r\n                    <div class=\"col-sm-8\">\r\n                        <div class=\"section-pwt-title\">\r\n                            "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n                        </div>\r\n                        <div class=\"section-pwt-title fixed-title\">\r\n                            <div class=\"section-pwt-menu\" slug='"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'></div>\r\n                            <span>"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</span>\r\n                            <div class=\"blur_overlay\"></div>\r\n                            <div class=\"fixed-title-bg\">\r\n                                <img src=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" />\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"section-pwt-description\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":24},"end":{"line":71,"column":33}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_download") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":24},"end":{"line":74,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\r\n                    <div class=\"col-sm-2 play-video-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":77,"column":24},"end":{"line":79,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":20},"end":{"line":101,"column":27}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":103,"column":20},"end":{"line":112,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":114,"column":16},"end":{"line":116,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"isBulletinBoardEnabled") : depth0),"&&",(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"compare","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":118,"column":12},"end":{"line":122,"column":24}}})) != null ? stack1 : "")
    + "            <div class=\"col-md-12 right-pane\">\r\n                <div class=\"playlist_counter\"></div>\r\n                <div class=\"section-playlist-list right_section reorder-bounds\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":126,"column":16},"end":{"line":128,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/box/section.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/box/section.handlebars ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":7},"end":{"line":26,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":7},"end":{"line":29,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":10},"end":{"line":32,"column":22}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"capital-letter watch-videos\" target=\"#video-slider-block\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"play video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":38,"column":77},"end":{"line":38,"column":98}}}))
    + "</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<div class=\"section-video-popup\">\r\n						<div class=\"hide-video-popup\"></div>\r\n						<div class=\"section-video\">\r\n							<div id=\"video-slider-block\">\r\n								<div class=\"video-slider\">\r\n									<ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":10},"end":{"line":55,"column":19}}})) != null ? stack1 : "")
    + "									</ul>\r\n								</div>		\r\n							</div>		\r\n	 					</div>\r\n	 				</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<li>\r\n											<div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n												<img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n											</div>										\r\n											<iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n										</li>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"related-products\">\r\n							<div class='related-products-heading'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Related Links",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":65,"column":45},"end":{"line":65,"column":69}}}))
    + ":</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":7},"end":{"line":70,"column":16}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n								"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n							</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":75,"column":82},"end":{"line":75,"column":107}}}))
    + "</a>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"bulletin-board-container\">\r\n"
    + ((stack1 = container.invokePartial(__webpack_require__(/*! ./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars */ "./sharedemos/static/js/tenant/templates/box/bulletin-board.handlebars"),depth0,{"name":"bulletin-board","data":data,"indent":"\t\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "				</div>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"create-new rippleEffect empty-layout\"><br><p><span>+</span></br>add layout</p></div>\r\n							<div class=\"create-new rippleEffect hide category\"><p><span>+</span></br>add category</p></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-container\" class=\"page-container newtemp boxtemp\">\r\n	<div class=\"overlay\">\r\n		<div class=\"sign-up-wrap\"></div>\r\n	</div>\r\n	<div class=\"pwt-section\">\r\n		<div class=\"\">\r\n			<div class=\"fs-banner\">\r\n				<div class=\"parent-section-icon\">\r\n					<img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\r\n					<div class=\"icon_overlay\"></div>\r\n				</div>\r\n				<div class=\"section-pwt-list col-sm-12\">\r\n					<div class=\"col-sm-2\">\r\n						<div class=\"section-pwt-menu\" slug='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\r\n						</div>\r\n					</div>	\r\n					<div class=\"col-sm-8\">\r\n						<div class=\"section-pwt-title\">\r\n							"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n						</div>\r\n						<div class=\"section-pwt-description\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":6},"end":{"line":34,"column":15}}})) != null ? stack1 : "")
    + "					</div>\r\n					<div class=\"col-sm-2 play-video-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":6},"end":{"line":39,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":5},"end":{"line":61,"column":12}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":5},"end":{"line":72,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":74,"column":4},"end":{"line":76,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"isBulletinBoardEnabled") : depth0),"&&",(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"compare","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":3},"end":{"line":82,"column":15}}})) != null ? stack1 : "")
    + "			<div class=\"row\">\r\n				<div class=\"col-md-12\">\r\n					<div class=\"section-pwt-list right_section\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":86,"column":6},"end":{"line":89,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"usePartial":true,"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/comments.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/comments.handlebars ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "<ul>\n    <li>\n        <img src=\"/static/images/avatar.png\">\n        <div class=\"the-comment\">\n            <p>For future updates, you’ll no longer need to update from the applainc?</p>\n            <span class=\"comment-date-time\">Just Now</span>\n        </div>\n    </li>\n    <li class=\"author-comment\">\n        <img src=\"/static/images/avatar.png\">\n        <div class=\"the-comment\">\n            <p>For future updates, you'll no longer need to update from the applaincesh?</p>\n            <span class=\"comment-date-time\">Tue, 2:03pm</span>\n        </div>\n    </li>\n</ul>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<p class=\"no-comments\">Only the author of this site will see your comment.</p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"comments") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":20,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/cta_form.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/cta_form.handlebars ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "    		<div class=\"block\">\n    			<div class=\"flabel\">"
    + alias2(alias1(depth0, depth0))
    + "</div>\n    			<input type=\"text\" name=\""
    + alias2(alias1(depth0, depth0))
    + "\" placeholder=\""
    + alias2(alias1(depth0, depth0))
    + "\" autocomplete=\"off\">\n    		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<input type=\"hidden\" name=\"walkthrough\" value='"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"chapter") : depth0), depth0))
    + "'/>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"sign-box\">\n	<form method=\"post\" name=\"lead\" enctype=\"multipart/form-data\">\n		<div class=\"title\">\n			"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_button") : depth0)) != null ? lookupProperty(stack1,"campaign_message") : stack1), depth0))
    + "\n		</div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"cta_button") : depth0)) != null ? lookupProperty(stack1,"fields") : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":2},"end":{"line":11,"column":11}}})) != null ? stack1 : "")
    + "		<input type=\"hidden\" name=\"product\" value='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "'/>\n		<input type=\"hidden\" name=\"section\" value='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'/>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"chapter") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "")
    + "		<div class=\"footer\">\n			<div class=\"form-footer\">\n    			<input type=\"submit\" value=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"SUBMIT",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":35},"end":{"line":19,"column":52}}}))
    + "\" class=\"theme-bg-color\">\n    			<div class=\"cancel capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":20,"column":42},"end":{"line":20,"column":59}}}))
    + "</div>\n    		</div>	\n    		<div class=\"form-failed capital-letter\">\n    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"oops! your submission was not sent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":7},"end":{"line":23,"column":52}}}))
    + "\n    		</div>	\n    		<div class=\"form-sent\">\n    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"sent successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":26,"column":7},"end":{"line":26,"column":36}}}))
    + "\n    		</div>\n    		<div class=\"form-sending\">\n    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"sending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":7},"end":{"line":29,"column":25}}}))
    + "...\n    			<div class=\"cd-loading\"></div>\n    		</div>\n		</div>\n	</form>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/home-sections-all.handlebars":
/*!************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/home-sections-all.handlebars ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":27,"column":14}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":26,"column":14}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"col-md-6 col-sm-6 col-xs-12 pwt-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":10,"column":15}}})) != null ? stack1 : "")
    + "\r\n				<div class=\"pwt-box "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":24},"end":{"line":12,"column":66}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":67},"end":{"line":12,"column":108}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":109},"end":{"line":12,"column":150}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n					<div class=\"left icon\">\r\n						<div class=\"outer-circle\">\r\n							<div class=\"inner-circle progress\">\r\n								<div class=\"section-icon\"><img src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/></div>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<div class=\"right\">\r\n						<div class=\"title theme-title-color\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n						<div class=\"pwt-details theme-paragraph-color\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":5},"end":{"line":9,"column":12}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":92},"end":{"line":8,"column":125}}}))
    + "\"></div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "uneditable";
},"11":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row sortable\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":28,"column":10}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/home.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/home.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<a class=\"privacy theme-title-color camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":16,"column":97},"end":{"line":16,"column":122}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <div id=\"home-container\" class=\"page-container theme-bg-color\">\r\n	<div class=\"fs-banner\"> \r\n		<div class=\"title1 theme-title-color\">\r\n			"
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_title") : depth0), depth0))
    + "\r\n		</div>\r\n		<div class=\"filter all theme-title-color active camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"all",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":62},"end":{"line":6,"column":76}}}))
    + "</div>\r\n		<div class=\"filter trending theme-title-color camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"trending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":60},"end":{"line":7,"column":79}}}))
    + "</div>\r\n		<div class=\"filter mostrecent theme-title-color camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"most recent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":62},"end":{"line":8,"column":84}}}))
    + "</div>\r\n	</div>\r\n	<div class=\"pwt-list\">\r\n		<div class=\"home-container all active\"></div>\r\n		<div class=\"home-container trending\"></div>\r\n		<div class=\"home-container mostrecent\"></div>\r\n	</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":1},"end":{"line":17,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/playlist.handlebars":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/playlist.handlebars ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"playlist-block"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),{"name":"unless","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":81}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_edit") : depth0),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":82},"end":{"line":2,"column":124}}})) != null ? stack1 : "")
    + "\">\n        <div class=\"col-md-6 playlist-left\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":44},"end":{"line":3,"column":117}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"unless","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":8,"column":23}}})) != null ? stack1 : "")
    + "            <h3>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</h3>\n            <p>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</p>\n        </div>\n        <div class=\"col-md-6 playlist-right\">\n            <ul class=\"pwt-list sortable\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":42},"end":{"line":13,"column":115}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"walkthroughs") : stack1),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":16},"end":{"line":64,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"4":function(container,depth0,helpers,partials,data) {
    return " uneditable";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "playlist_id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1), depth0))
    + "\"";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"translations_available") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":7,"column":23}}})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"right\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":103},"end":{"line":6,"column":136}}}))
    + "\"></div>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":20},"end":{"line":63,"column":32}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <li slug='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "' id='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "' class=\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":65},"end":{"line":16,"column":106}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"can_edit") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":107},"end":{"line":16,"column":152}}})) != null ? stack1 : "")
    + "\" >\n                            <div class=\"read\">\n                                <div class=\"circle\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias3,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":18,"column":52},"end":{"line":18,"column":73}}}))
    + "</div>\n                                <div class=\"playlist-loader\">\n                                    <div class=\"playlist-loader-bg\"></div>        \n                                    <div class=\"spiner-holder-1 animate-0-25-a\">\n                                        <div class=\"spiner-holder-2 animate-0-25-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-25-50-a\">\n                                        <div class=\"spiner-holder-2 animate-25-50-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-50-75-a\">\n                                        <div class=\"spiner-holder-2 animate-50-75-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-75-100-a\">\n                                        <div class=\"spiner-holder-2 animate-75-100-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"title\">\n                                <div>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " \n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":36},"end":{"line":52,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",0,{"name":"compare","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":28},"end":{"line":61,"column":40}}})) != null ? stack1 : "")
    + "                        </li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <span class=\"wt-draft\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"draft",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":46,"column":63},"end":{"line":46,"column":79}}}))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":40},"end":{"line":51,"column":47}}})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":48,"column":40},"end":{"line":50,"column":47}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"wt-live\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"live",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":62},"end":{"line":49,"column":77}}}))
    + "</span>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <div class=\"playlist-tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":36},"end":{"line":59,"column":45}}})) != null ? stack1 : "")
    + "                                </div>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),"||",(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"compare","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":68,"column":12}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/recent-trending-demos.handlebars":
/*!****************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/recent-trending-demos.handlebars ***!
  \****************************************************************************************/
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

  return "	<div class=\"recent\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "' demo='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n		<div class=\"preview_wrap\" style=\"background-image: url("
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"image_src") : depth0), depth0))
    + ");\" thumbnail_div='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n		</div>\r\n		<div class=\"information_wrap\">\r\n			<div class=\"title theme-title-color\">\r\n				"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n			</div>\r\n			<div class=\"links theme-paragraph-color\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"product_name") : depth0),"==",(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":13,"column":16}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"product_name") : depth0),"!=",(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":16,"column":16}}})) != null ? stack1 : "")
    + "			</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":3},"end":{"line":24,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"ratings pwt-tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":22,"column":13}}})) != null ? stack1 : "")
    + "			</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"new sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row \">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"demos") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":27,"column":10}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/section-list.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/section-list.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":42,"column":16}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":41,"column":20}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"col-md-12 col-sm-12 pwt-wrap\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":27}}})) != null ? stack1 : "")
    + "\n                <div class=\"pwt-box"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":77}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"can_edit") : depths[1]),{"name":"unless","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":78},"end":{"line":11,"column":122}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":123},"end":{"line":11,"column":164}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\n                    <div class=\"left\">\n                        <div class=\"outer-circle\">\n                            <div class=\"inner-circle\">\n                                <div class=\"progress\">\n                                    <div class=\"section-icon\">\n                                        <img src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"right\">\n                        <div class=\"title\">\n                            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n                            <!-- This span tag for locked content -->\n                            <!-- <span class=\"lock\"></span> -->\n                        </div>\n                        <div class=\"pwt-description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":36,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":8,"column":27}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":106},"end":{"line":7,"column":139}}}))
    + "\"></div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "uneditable";
},"11":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"labels-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":28},"end":{"line":34,"column":37}}})) != null ? stack1 : "")
    + "                            </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                                <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":9}}})) != null ? stack1 : "")
    + "\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/section-playlist.handlebars":
/*!***********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/section-playlist.handlebars ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"sign-up hidden-sm hidden-xs\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":7},"end":{"line":49,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":7},"end":{"line":52,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":10},"end":{"line":55,"column":22}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div><a class=\"export-to-pdf-link camel-case\" id='export-to-pdf' href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"export_pdf_link") : depth0), depth0))
    + "\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"export to pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":59,"column":99},"end":{"line":59,"column":123}}}))
    + "</a></div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"watch-videos\" target=\"#video-slider-block\">watch videos</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":8},"end":{"line":69,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":70,"column":8},"end":{"line":72,"column":23}}})) != null ? stack1 : "")
    + "							</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"section-video\">\r\n							<div id=\"video-slider-block\">\r\n								<div class=\"video-slider\">\r\n									<ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":10},"end":{"line":88,"column":19}}})) != null ? stack1 : "")
    + "									</ul>\r\n								</div>	\r\n							</div>			\r\n	 					</div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<li>\r\n											<div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n												<img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n											</div>										\r\n											<iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n										</li>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"related-products\">\r\n								<div class='related-products-heading'>Related Links:</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":97,"column":8},"end":{"line":101,"column":17}}})) != null ? stack1 : "")
    + "							</div>\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n									"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n								</div>\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<a class=\"privacy theme-title-color camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":106,"column":101},"end":{"line":106,"column":126}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-playlist\" class=\"page-container theme-bg-color\">\r\n	<div class=\"overlay\">\r\n		<div class=\"sign-up-wrap\"></div>\r\n	    <div class=\"offline-mode-block\">\r\n	    	<div class=\"offline-mode\"> \r\n	    		<div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":49}}}))
    + "</div>\r\n	    		<div class=\"offline-desc\">\r\n	    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you'll be able to view these demos without an internet connection",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":85}}}))
    + ". \r\n	    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you wish to enable offline mode and download these playlists",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":83}}}))
    + "?\r\n	    		</div>\r\n	    		<div class=\"footer\">\r\n					<div class=\"offline-footer\">\r\n		    			<div class=\"enable theme-bg-color capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":59},"end":{"line":13,"column":77}}}))
    + "</div>\r\n		    			<div class=\"cancel capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":44},"end":{"line":14,"column":61}}}))
    + "</div>\r\n		    		</div>	\r\n				</div>\r\n	    	</div>\r\n	    </div>\r\n	    <div class=\"disable-offline-block\">\r\n	    	<div class=\"disable-offline-mode\"> \r\n	    		<div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":26},"end":{"line":21,"column":57}}}))
    + "</div>\r\n	    		<div class=\"offline-desc\"> \r\n	    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling offline mode will remove all this content from offline visibility",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":8},"end":{"line":23,"column":94}}}))
    + ".\r\n	    			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to remove this content from offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":24,"column":81}}}))
    + "?\r\n	    		</div>\r\n	    		<div class=\"footer\">\r\n					<div class=\"offline-footer\">\r\n						<div class=\"disable-offline\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":35},"end":{"line":28,"column":53}}}))
    + "</div>\r\n		    			<div class=\"cancel disable-cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":44},"end":{"line":29,"column":61}}}))
    + "</div>\r\n		    		</div>	\r\n				</div>\r\n	    	</div>\r\n	    </div>\r\n	</div>\r\n	<div class=\"pwt-section\">\r\n		<div class=\"\">\r\n			<div class=\"row\">\r\n				<div class=\"col-md-4 left-pane theme-bg-color\">\r\n					<div class=\"section-pwt-list\">\r\n						<div class=\"section-pwt-menu theme-title-color\" slug='"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\r\n							<span class=\"hidden-xs hidden-sm\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":41},"end":{"line":41,"column":61}}}))
    + "</span>\r\n						</div>\r\n						<div class=\"section-pwt-title theme-title-color\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n						<div class=\"section-pwt-description theme-paragraph-color\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":6},"end":{"line":57,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_download") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":6},"end":{"line":60,"column":13}}})) != null ? stack1 : "")
    + "						<div class=\"section-vid-block visible-xs visible-sm\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":7},"end":{"line":64,"column":14}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":7},"end":{"line":74,"column":16}}})) != null ? stack1 : "")
    + "						</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":6},"end":{"line":93,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":94,"column":6},"end":{"line":103,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":105,"column":5},"end":{"line":107,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n				<div class=\"col-md-8 right-pane\">\r\n					<div class=\"section-playlist-list right_section reorder-bounds\"></div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/default/section.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/default/section.handlebars ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"sign-up hidden-sm hidden-xs\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":8},"end":{"line":21,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":8},"end":{"line":24,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":11},"end":{"line":27,"column":23}}})) != null ? stack1 : "")
    + "							</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"watch-videos\" target=\"#video-slider-block\">watch videos</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":8},"end":{"line":38,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":8},"end":{"line":41,"column":23}}})) != null ? stack1 : "")
    + "							</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"section-video\">\r\n							<div id=\"video-slider-block\">\r\n								<div class=\"video-slider\">\r\n									<ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":10},"end":{"line":57,"column":19}}})) != null ? stack1 : "")
    + "									</ul>\r\n								</div>	\r\n							</div>			\r\n	 					</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<li>\r\n											<div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n												<img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n											</div>										\r\n											<iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n										</li>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"related-products\">\r\n								<div class='related-products-heading'>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"Related Links",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":66,"column":46},"end":{"line":66,"column":70}}}))
    + ":</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":8},"end":{"line":71,"column":17}}})) != null ? stack1 : "")
    + "							</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n									"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n								</div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<a class=\"privacy theme-title-color\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":76,"column":90},"end":{"line":76,"column":115}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-container\" class=\"page-container theme-bg-color\">\r\n	<div class=\"overlay\">\r\n		<div class=\"sign-up-wrap\"></div>\r\n	</div>\r\n	<div class=\"pwt-section\">\r\n		<div class=\"\">\r\n			<div class=\"row\">\r\n				<div class=\"col-md-6 left-pane theme-bg-color\">\r\n					<div class=\"section-pwt-list\">\r\n						<div class=\"section-pwt-menu theme-title-color\" slug='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\r\n							<span class=\"hidden-xs hidden-sm\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"name") : stack1),{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":41},"end":{"line":11,"column":61}}}))
    + "</span>\r\n						</div>\r\n						<div class=\"section-pwt-title theme-title-color\">\r\n							"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n						</div>\r\n						<div class=\"section-pwt-description theme-paragraph-color\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":7},"end":{"line":29,"column":16}}})) != null ? stack1 : "")
    + "						<div class=\"section-vid-block visible-xs visible-sm\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":7},"end":{"line":33,"column":14}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":7},"end":{"line":43,"column":16}}})) != null ? stack1 : "")
    + "						</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":6},"end":{"line":62,"column":13}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":6},"end":{"line":73,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":75,"column":5},"end":{"line":77,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n				<div class=\"col-md-6 right-pane\">\r\n					<div class=\"section-pwt-list right_section\">\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/home-sections-all.handlebars":
/*!*********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/home-sections-all.handlebars ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":31,"column":14}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":2},"end":{"line":30,"column":14}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"col-md-6 col-xs-12 pwt-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":4},"end":{"line":10,"column":15}}})) != null ? stack1 : "")
    + "				<div class=\"pwt-box "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":24},"end":{"line":11,"column":66}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":67},"end":{"line":11,"column":108}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n					<div class=\"left icon\">\r\n						<div class=\"outer-circle\">\r\n							<div class=\"inner-circle progress secondary-fill-color\">\r\n								<div class=\"section-icon\"><img src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/></div>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					<div class=\"right\">\r\n						<div class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n						<div class=\"pwt-details\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n						<div class=\"pwt-tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":7},"end":{"line":25,"column":16}}})) != null ? stack1 : "")
    + "						</div>\r\n					</div>\r\n				</div>\r\n			</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":5},"end":{"line":9,"column":12}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":92},"end":{"line":8,"column":125}}}))
    + "\"></div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"11":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row sortable\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":32,"column":10}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/home.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/home.handlebars ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":18,"column":79},"end":{"line":18,"column":104}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <div id=\"home-container\" class=\"page-container newtemp\">\r\n	<div class=\"fs-banner\"> \r\n		<div class=\"title1 theme-bg-color theme-title-color\">\r\n			"
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_title") : depth0), depth0))
    + "\r\n		</div>\r\n		<div class=\"newtemp-bg-color\">\r\n			<div class=\"filter all active camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"all",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":45},"end":{"line":7,"column":59}}}))
    + "</div>\r\n			<div class=\"filter trending camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"trending",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":43},"end":{"line":8,"column":62}}}))
    + "</div>\r\n			<div class=\"filter mostrecent camel-case\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias2,"most recent",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":45},"end":{"line":9,"column":67}}}))
    + "</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"pwt-list newtemp-bg-color\">\r\n		<div class=\"home-container all active\"></div>\r\n		<div class=\"home-container trending\"></div>\r\n		<div class=\"home-container mostrecent\"></div>\r\n	</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":1},"end":{"line":19,"column":8}}})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/playlist.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/playlist.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"playlist-block"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),{"name":"unless","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":30},"end":{"line":2,"column":81}}})) != null ? stack1 : "")
    + " col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 grid_playlist_view\">\n        <div class=\"playlist-left\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":35},"end":{"line":3,"column":108}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":8,"column":23}}})) != null ? stack1 : "")
    + "            <h3><span>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span></h3>\n            <p><span class=\"grd-playlist-desc\">"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</span></p>\n            <ul class=\"pwt-list playlist-right sortable\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":57},"end":{"line":11,"column":130}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"walkthroughs") : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":62,"column":25}}})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "playlist_id=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"playlist_id") : stack1), depth0))
    + "\"";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"translations_available") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":7,"column":23}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":102},"end":{"line":6,"column":135}}}))
    + "\"></div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":20},"end":{"line":61,"column":32}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <li slug='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'  id='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "' "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":59},"end":{"line":14,"column":108}}})) != null ? stack1 : "")
    + ">\n                            <div class=\"read\">\n                                <div class=\"circle\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias3,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":16,"column":52},"end":{"line":16,"column":73}}}))
    + "</div>\n                                <div class=\"playlist-loader\">\n                                    <div class=\"playlist-loader-bg\"></div>        \n                                    <div class=\"spiner-holder-1 animate-0-25-a\">\n                                        <div class=\"spiner-holder-2 animate-0-25-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-25-50-a\">\n                                        <div class=\"spiner-holder-2 animate-25-50-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-50-75-a\">\n                                        <div class=\"spiner-holder-2 animate-50-75-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                    <div class=\"spiner-holder-1 animate-75-100-a\">\n                                        <div class=\"spiner-holder-2 animate-75-100-b\">\n                                            <div class=\"playlist-loader-spiner\"></div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"title\">\n                                <div>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":36},"end":{"line":50,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\n                            </div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"tags") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",0,{"name":"compare","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":28},"end":{"line":59,"column":40}}})) != null ? stack1 : "")
    + "                        </li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "class='disabled'";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <span class=\"wt-draft\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"draft",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":63},"end":{"line":44,"column":79}}}))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":40},"end":{"line":49,"column":47}}})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":40},"end":{"line":48,"column":47}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"wt-live\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"live",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":47,"column":62},"end":{"line":47,"column":77}}}))
    + "</span>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <div class=\"playlist-tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":36},"end":{"line":57,"column":45}}})) != null ? stack1 : "")
    + "                                </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "                                        <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"playlist") : depth0)) != null ? lookupProperty(stack1,"is_enabled") : stack1),"||",(depth0 != null ? lookupProperty(depth0,"is_author") : depth0),{"name":"compare","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":67,"column":12}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/recent-trending-demos.handlebars":
/*!*************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/recent-trending-demos.handlebars ***!
  \*************************************************************************************/
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

  return "	<div class=\"recent\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_slug") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_slug") : depth0), depth0))
    + "' demo='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n		<div class=\"preview_wrap\" style=\"background-image: url("
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"image_src") : depth0), depth0))
    + ");\" thumbnail_div='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\r\n		</div>\r\n		<div class=\"information_wrap\">\r\n			<div class=\"title\">\r\n				"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n			</div>\r\n			<div class=\"links\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"product_name") : depth0),"==",(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":4},"end":{"line":13,"column":16}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"product_name") : depth0),"!=",(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":4},"end":{"line":16,"column":16}}})) != null ? stack1 : "")
    + "			</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":3},"end":{"line":24,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section_name") : depth0), depth0))
    + " > "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "			<div class=\"ratings pwt-tags\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":4},"end":{"line":22,"column":13}}})) != null ? stack1 : "")
    + "			</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"new sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"row \">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"demos") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":27,"column":10}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/section-list.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/section-list.handlebars ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":42,"column":16}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_visible") : depth0),"||",(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":41,"column":20}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"col-md-6 col-xs-12 pwt-wrap\">\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_author") : depths[1]),{"name":"unless","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":27}}})) != null ? stack1 : "")
    + "\n                <div class=\"pwt-box"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"unless","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":35},"end":{"line":11,"column":77}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"linked_asset") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":78},"end":{"line":11,"column":119}}})) != null ? stack1 : "")
    + "\" slug='"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\n                    <div class=\"left\">\n                        <div class=\"outer-circle\">\n                            <div class=\"inner-circle\">\n                                <div class=\"secondary-fill-color progress"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"progress_class") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":73},"end":{"line":15,"column":121}}})) != null ? stack1 : "")
    + "\">\n                                    <div class=\"section-icon\">\n                                        <img src=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"right\">\n                        <div class=\"title\">\n                            "
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\n                            <!-- This span tag for locked content -->\n                            <!-- <span class=\"lock\"></span> -->\n                        </div>\n                        <div class=\"pwt-description\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":24},"end":{"line":36,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n\n            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"translations_available") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":8,"column":27}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"translation_available\" data-toggle=\"tooltip\" data-placement=\"left\" title=\""
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"Translations Available",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":7,"column":106},"end":{"line":7,"column":139}}}))
    + "\"></div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " disabled";
},"9":function(container,depth0,helpers,partials,data) {
    return "asset-linked ";
},"11":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"progress_class") : depth0), depth0));
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"labels-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":32,"column":28},"end":{"line":34,"column":37}}})) != null ? stack1 : "")
    + "                            </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                                <span class=\"sd-label theme-bg-color tags-span\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"sections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":43,"column":9}}})) != null ? stack1 : "")
    + "\n";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/section-playlist.handlebars":
/*!********************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/section-playlist.handlebars ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "								<div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":9},"end":{"line":53,"column":24}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":9},"end":{"line":56,"column":24}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":12},"end":{"line":59,"column":24}}})) != null ? stack1 : "")
    + "								</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "									<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "									<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"pdf-export camel-case\"><a class=\"export-to-pdf-link\" id='export-to-pdf' href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"export_pdf_link") : depth0), depth0))
    + "\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"export to pdf",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":63,"column":118},"end":{"line":63,"column":142}}}))
    + "</a></div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"watch-videos capital-letter\" target=\"#video-slider-block\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"play video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":68,"column":77},"end":{"line":68,"column":98}}}))
    + "</div>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<div class=\"section-video-popup\">\r\n						<div class=\"hide-video-popup\"></div>\r\n						<div class=\"section-video\">\r\n							<div id=\"video-slider-block\">\r\n								<div class=\"video-slider\">\r\n									<ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":10},"end":{"line":85,"column":19}}})) != null ? stack1 : "")
    + "									</ul>\r\n								</div>	\r\n							</div>			\r\n	 					</div>\r\n	 				</div>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "										<li>\r\n											<div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n												<img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n											</div>										\r\n											<iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n										</li>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"related-products\">\r\n							<div class='related-products-heading'>Related Links:</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":7},"end":{"line":99,"column":16}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n								"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n							</div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":104,"column":82},"end":{"line":104,"column":107}}}))
    + "</a>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "				<ul class=\"playlist-view-opt\">\r\n					<li id=\"playlist-row-view\"></li>\r\n					<li id=\"playlist-thumbnail-view\" class=\"active\"></li>\r\n				</ul>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-playlist\" class=\"page-container newtemp\">\r\n	<div class=\"overlay\">\r\n		<div class=\"sign-up-wrap\"></div>\r\n	    <div class=\"offline-mode-block\">\r\n	    	<div class=\"offline-mode\"> \r\n	    		<div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":49}}}))
    + "</div>\r\n	    		<div class=\"offline-desc\">\r\n		    		"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you'll be able to view these demos without an internet connection",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":8,"column":8},"end":{"line":8,"column":85}}}))
    + ".\r\n		    		"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you wish to enable offline mode and download these playlists",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":9,"column":83}}}))
    + "?\r\n	    		</div>\r\n	    		<div class=\"footer\">\r\n					<div class=\"offline-footer\">\r\n		    			<div class=\"enable theme-bg-color\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"enable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":44},"end":{"line":13,"column":62}}}))
    + "</div>\r\n		    			<div class=\"cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":14,"column":29},"end":{"line":14,"column":46}}}))
    + "</div>\r\n		    		</div>	\r\n				</div>\r\n	    	</div>\r\n	    </div>\r\n	    <div class=\"disable-offline-block\">\r\n	    	<div class=\"disable-offline-mode\"> \r\n	    		<div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":26},"end":{"line":21,"column":57}}}))
    + "</div>\r\n	    		<div class=\"offline-desc\">\r\n		    		"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disabling offline mode will remove all this content from offline visibility",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":23,"column":8},"end":{"line":23,"column":94}}}))
    + ".\r\n		    		<br>\r\n		    		"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to remove this content from offline mode",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":25,"column":8},"end":{"line":25,"column":81}}}))
    + "?</div>\r\n	    		<div class=\"footer\">\r\n					<div class=\"offline-footer\">\r\n						<div class=\"disable-offline\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"disable",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":35},"end":{"line":28,"column":53}}}))
    + "</div>\r\n		    			<div class=\"cancel disable-cancel\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":44},"end":{"line":29,"column":61}}}))
    + "</div>\r\n		    		</div>	\r\n				</div>\r\n	    	</div>\r\n	    </div>\r\n	</div>\r\n	<div class=\"pwt-section\">\r\n		<div class=\"\">\r\n			<div class=\"fs-banner theme-bg-color\">\r\n				<div class=\"section-pwt-list col-sm-12\">\r\n					<div class=\"col-sm-2\">\r\n						<div class=\"section-pwt-menu\" slug='"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\r\n							<span class=\"hidden-xs hidden-sm\"></span>\r\n						</div>\r\n					</div>\r\n					<div class=\"col-sm-8\">\r\n						<div class=\"section-pwt-title theme-title-color\">\r\n							"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n						</div>\r\n						<div class=\"section-pwt-description theme-paragraph-color\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":49,"column":7},"end":{"line":61,"column":16}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_download") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":6},"end":{"line":64,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n					<div class=\"col-sm-2 play-video-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":6},"end":{"line":69,"column":13}}})) != null ? stack1 : "")
    + "					</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":71,"column":5},"end":{"line":91,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":92,"column":5},"end":{"line":101,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":103,"column":4},"end":{"line":105,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n			<div class=\"col-md-12 right-pane newtemp-bg-color grid-view\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"content_exists") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":108,"column":4},"end":{"line":113,"column":11}}})) != null ? stack1 : "")
    + "				<div class=\"playlist_counter\"></div>\r\n				<div class=\"section-playlist-list right_section reorder-bounds demo-leng-toggle\"></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/grid/section.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/grid/section.handlebars ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"sign-up\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":7},"end":{"line":20,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":7},"end":{"line":23,"column":22}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":24,"column":10},"end":{"line":26,"column":22}}})) != null ? stack1 : "")
    + "						</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<button class=\"sign-up-btn\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "							<a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"watch-videos capital-letter\" target=\"#video-slider-block\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"play video",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":32,"column":76},"end":{"line":32,"column":97}}}))
    + "</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<div class=\"section-video-popup\">\r\n					<div class=\"hide-video-popup\"></div>\r\n					<div class=\"section-video\">\r\n						<div id=\"video-slider-block\">\r\n							<div class=\"video-slider\">\r\n								<ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":9},"end":{"line":49,"column":18}}})) != null ? stack1 : "")
    + "								</ul>\r\n							</div>		\r\n						</div>		\r\n 					</div>\r\n 				</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "									<li>\r\n										<div class=\"video-link\" data-video-link=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"link") : depth0), depth0))
    + "\">\r\n											<img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"poster_image") : depth0), depth0))
    + "\" style=\"width:100%\" >\r\n										</div>										\r\n										<iframe class=\"popup-video\" width=\"480\" height=\"270\"  frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n									</li>\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<div class=\"related-products\">\r\n						<div class='related-products-heading'>Related Links:</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":6},"end":{"line":63,"column":15}}})) != null ? stack1 : "")
    + "					</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "						<div class=\"related-products-list\" product='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"product") : depth0), depth0))
    + "' section='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"section") : depth0), depth0))
    + "'>\r\n							"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n						</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<a class=\"privacy camel-case\" href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"privacy policy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":68,"column":81},"end":{"line":68,"column":106}}}))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"section-container\" class=\"page-container newtemp\">\r\n	<div class=\"overlay\">\r\n		<div class=\"sign-up-wrap\"></div>\r\n	</div>\r\n	<div class=\"pwt-section\">\r\n		<div class=\"fs-banner theme-bg-color row\">\r\n			<div class=\"section-pwt-list col-sm-12\">\r\n				<div class=\"col-sm-2\">\r\n					<div class=\"section-pwt-menu\" slug='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"parent") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\r\n						<span class=\"hidden-xs hidden-sm\"></span>\r\n					</div>\r\n				</div>	\r\n				<div class=\"col-sm-8\">\r\n					<div class=\"section-pwt-title theme-title-color\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\r\n					<div class=\"section-pwt-description theme-paragraph-color\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"cta_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":5},"end":{"line":28,"column":14}}})) != null ? stack1 : "")
    + "				</div>\r\n				<div class=\"col-sm-2 play-video-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":5},"end":{"line":33,"column":12}}})) != null ? stack1 : "")
    + "				</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"videos") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"related_products") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":56,"column":4},"end":{"line":65,"column":11}}})) != null ? stack1 : "")
    + "			</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"tenant_privacy_link") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":3},"end":{"line":69,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n		<div class=\"row\">\r\n			<div class=\"col-md-12\">\r\n				<div class=\"section-pwt-list right_section newtemp-bg-color\">\\</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/hotspot.handlebars":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/hotspot.handlebars ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "delay-hotspot";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "style='"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"display") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":112},"end":{"line":1,"column":175}}})) != null ? stack1 : "")
    + ";"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"color") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":176},"end":{"line":1,"column":234}}})) != null ? stack1 : "")
    + ";"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"delay") : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":235},"end":{"line":2,"column":75}}})) != null ? stack1 : "")
    + ";'";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":129},"end":{"line":1,"column":166}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return alias2(alias1((data && lookupProperty(data,"key")), depth0))
    + ":"
    + alias2(alias1(depth0, depth0))
    + ";";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "border-color:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"color") : stack1), depth0));
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "animation: animatehotspot 0s "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"delay") : stack1), depth0))
    + "s forwards;\n    -webkit-animation: animatehotspot 0s "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"delay") : stack1), depth0))
    + "s forwards";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "border-color='"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"color") : stack1), depth0))
    + "'";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <a class='link' href='"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"action") : depth0)) != null ? lookupProperty(stack1,"href") : stack1),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":4,"column":26},"end":{"line":4,"column":87}}})) != null ? stack1 : "")
    + "' target='_blank'>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"action") : depth0)) != null ? lookupProperty(stack1,"href") : stack1), depth0));
},"16":function(container,depth0,helpers,partials,data) {
    return "javascript:;";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class='info-tooltip "
    + container.escapeExpression(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"callout") : depth0)) != null ? lookupProperty(stack1,"tooltip_position") : stack1), depth0))
    + "'>\n        <span class='arrow'></span>\n        <div class='close'></div>\n        <h2></h2>\n        <p>"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"callout") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0)) != null ? stack1 : "")
    + "</p>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='hotspot "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"delay") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":61}}})) != null ? stack1 : "")
    + "' id='hotspot"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"hotspot_id") : depth0), depth0))
    + "' "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"display") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":90},"end":{"line":2,"column":84}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"display") : depth0)) != null ? lookupProperty(stack1,"color") : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":85},"end":{"line":2,"column":145}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"hotspot_type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":5,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"callout") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/notes-pagination.handlebars":
/*!***************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/notes-pagination.handlebars ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li data-page=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":5,"column":27},"end":{"line":5,"column":35}}}) : helper)))
    + "\">\r\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"key") || (data && lookupProperty(data,"key"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data,"loc":{"start":{"line":6,"column":22},"end":{"line":6,"column":30}}}) : helper)))
    + "</span>\r\n            </li>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"page-prev\" data-page=\"prev\"><</div>\r\n<div class=\"pagination\">\r\n    <ul>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"notes") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":8,"column":17}}})) != null ? stack1 : "")
    + "        <li data-page=\"new\"><span>+</span></li>\r\n    </ul>\r\n</div>\r\n<div class=\"page-next\" data-page=\"next\">></div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/pin.handlebars":
/*!**************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/pin.handlebars ***!
  \**************************************************************/
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

  return "pin-id="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":75},"end":{"line":1,"column":81}}}) : helper)));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='drop_pin' style='top:"
    + alias4(((helper = (helper = lookupProperty(helpers,"top") || (depth0 != null ? lookupProperty(depth0,"top") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"top","hash":{},"data":data,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":40}}}) : helper)))
    + "; left:"
    + alias4(((helper = (helper = lookupProperty(helpers,"left") || (depth0 != null ? lookupProperty(depth0,"left") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data,"loc":{"start":{"line":1,"column":47},"end":{"line":1,"column":55}}}) : helper)))
    + ";' "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"id") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":58},"end":{"line":1,"column":88}}})) != null ? stack1 : "")
    + ">\n    <div class='pin-opener'><span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"order") || (depth0 != null ? lookupProperty(depth0,"order") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"order","hash":{},"data":data,"loc":{"start":{"line":2,"column":34},"end":{"line":2,"column":43}}}) : helper)))
    + "</span></div>\n    <div class='pin-tooltip'>\n        <span class='arrow'></span>\n        <div class='close'></div>\n        <div class=\"pin-block\">\n	        <h1 target='title'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":28},"end":{"line":7,"column":37}}}) : helper)))
    + "</h1>\n	        <p target='body'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"body") || (depth0 != null ? lookupProperty(depth0,"body") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data,"loc":{"start":{"line":8,"column":26},"end":{"line":8,"column":36}}}) : helper))) != null ? stack1 : "")
    + "</p>\n	    </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/player.handlebars":
/*!*****************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/player.handlebars ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "                                <li class=\"copyembedurl\">\n                                    <div class=\"social-icon\" social-share=\"copyembedurl\">\n                                        <span class=\"fa fa-code\" aria-hidden=\"true\"></span>\n                                        <span class=\"title camel-case\">embed player</span>\n                                    </div> \n                                    <div class=\"embed-url-box\">\n                                        <div>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"copy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":45},"end":{"line":50,"column":60}}}))
    + ": <span>&#8984;</span> - C "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"to copy",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":50,"column":87},"end":{"line":50,"column":105}}}))
    + "</div>\n                                        <div class=\"embedURL\"></div>\n                                        <div class=\"close-embed-url capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"close",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":52,"column":84},"end":{"line":52,"column":100}}}))
    + "</div>\n                                    </div>\n                                </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <span class=\"wt-draft\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"draft",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":79,"column":39},"end":{"line":79,"column":55}}}))
    + "</span>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"published") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":16},"end":{"line":84,"column":23}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_enabled") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":16},"end":{"line":83,"column":23}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                <span class=\"wt-live\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"live",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":82,"column":38},"end":{"line":82,"column":53}}}))
    + "</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                <!-- content avg rating -->\n                <div class=\"content-avg-rating\">\n                    <div class=\"avg-rating-star\">\n                        <div class=\"current-avg-rating\" style=\"width: 0%;\"></div>\n                    </div>\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <strong class=\"title capital-letter\">"
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"next section",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":105,"column":57},"end":{"line":105,"column":80}}}))
    + ":</strong>\n                    <div class=\"next-section-name\" section='"
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>\n                        "
    + alias1(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_section") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n                    </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"block\">\n                            <div class=\"text-block\">\n                                <div class=\"title-label camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"next chapter",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":124,"column":68},"end":{"line":124,"column":91}}}))
    + "</div>\n                                <div class=\"title\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n                            </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":127,"column":28},"end":{"line":129,"column":35}}})) != null ? stack1 : "")
    + "                            <div class=\"description\">\n                                "
    + ((stack1 = alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0)) != null ? stack1 : "")
    + "\n                            </div>\n                            <div class=\"explore-btn capital-letter\" slug='"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"explore",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":133,"column":101},"end":{"line":133,"column":119}}}))
    + "</div>\n                        </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <img class='cta-image' src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0)) != null ? lookupProperty(stack1,"image") : stack1)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\"/>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","form",{"name":"compare","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":140,"column":28},"end":{"line":145,"column":40}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","link",{"name":"compare","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":146,"column":28},"end":{"line":148,"column":40}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"type") : depth0),"==","pdf",{"name":"compare","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":149,"column":28},"end":{"line":151,"column":40}}})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <div class=\"text-block\">\n                                    <div class=\"title1\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"campaign_message") : depth0), depth0))
    + "</div>\n                                </div>\n                                <button class=\"cta-signup\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</button>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <a class=\"cta-link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_path") : depth0), depth0))
    + "\" data-cta-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"cta_id") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "style='display:none'";
},"23":function(container,depth0,helpers,partials,data) {
    return "                <li><div class=\"comments-item comments-opener\"><i class=\"icon-chat\"></i></div></li>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"is_private") : stack1),{"name":"unless","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":184,"column":16},"end":{"line":188,"column":27}}})) != null ? stack1 : "");
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <li>\n                    <div class=\"social-share mobile\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" data-walkthrough-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"walkthrough") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\"></div>\n                </li>\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"is_private") : stack1),{"name":"unless","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":204,"column":8},"end":{"line":206,"column":19}}})) != null ? stack1 : "");
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"social-share desktop\" data-overlay=\"social-share\" data-product-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" data-section-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\" data-walkthrough-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"walkthrough") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "\"></div>\n";
},"31":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"add-new-notes\">\n                        <div><span>+</span><br>add notes</div>\n                    </div>\n                    <div class=\"notes-edit-options\">\n                        <span class=\"delete-notes\">delete</span>\n                        <span class=\"edit-notes\">edit</span>\n                    </div>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <li"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":257,"column":39},"end":{"line":257,"column":79}}})) != null ? stack1 : "")
    + " lvalue='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"locale") : depth0), depth0))
    + "'>\n                                        <h3>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</h3>\n                                    </li>\n";
},"34":function(container,depth0,helpers,partials,data) {
    return " class=\"selected\"";
},"36":function(container,depth0,helpers,partials,data) {
    return "                            <p>"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"this content is not available in another language.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":268,"column":31},"end":{"line":268,"column":92}}}))
    + "</p>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"this content is available in another language. select a language to translate",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":271,"column":31},"end":{"line":271,"column":119}}}))
    + "</p>\n                            <div class=\"languages-selector\">\n                                <div>\n                                    <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"current language",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":274,"column":39},"end":{"line":274,"column":66}}}))
    + "</p>\n                                    <div class=\"selected-language\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"locales") : depth0),{"name":"each","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":276,"column":40},"end":{"line":278,"column":49}}})) != null ? stack1 : "")
    + "                                    </div>\n                                </div>\n                                <div>\n                                    <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"select language",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":282,"column":39},"end":{"line":282,"column":65}}}))
    + "</p>\n                                    <select class=\"mobile-language-select\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"locales") : depth0),{"name":"each","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":284,"column":40},"end":{"line":286,"column":49}}})) != null ? stack1 : "")
    + "                                    </select>\n                                </div>\n                            </div>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":277,"column":44},"end":{"line":277,"column":77}}})) != null ? stack1 : "")
    + "\n";
},"40":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " ";
},"42":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <option "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"selected") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":285,"column":52},"end":{"line":285,"column":96}}})) != null ? stack1 : "")
    + " lvalue='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"locale") : depth0), depth0))
    + "'> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </option>\n";
},"43":function(container,depth0,helpers,partials,data) {
    return " selected=\"selected\" ";
},"45":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"product") : depth0)) != null ? lookupProperty(stack1,"is_private") : stack1),{"name":"unless","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":299,"column":8},"end":{"line":323,"column":19}}})) != null ? stack1 : "");
},"46":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"mobile-share\">\n            <div class=\"inner\">\n                <div class=\"sub-inner\">\n                    <div class=\"mobile-share-block\">\n                        <h4>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"share this page",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":304,"column":28},"end":{"line":304,"column":54}}}))
    + "</h4>\n                        <p>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"share this page on your feed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":305,"column":27},"end":{"line":305,"column":66}}}))
    + "</p>\n                        <div class=\"share-icons\">\n                            <div class=\"social-icon\" social-share=\"twitter\"><span class=\"fa fa-twitter\" aria-hidden=\"true\"></span></div>\n                            <div class=\"social-icon\" social-share=\"linkedin\"><span class=\"fa fa-linkedin\" aria-hidden=\"true\"></span></div>\n                            <div class=\"social-icon\" social-share=\"facebook\"><span class=\"fa fa-facebook-square\" aria-hidden=\"true\"></span></div>\n                            <div class=\"social-icon\" social-share=\"reddit\"><span class=\"fa fa-reddit-square\" aria-hidden=\"true\"></span></div>\n                            <div class=\"social-icon\" social-share=\"copyurl\"><span class=\"copy-url-icon\"></span></div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_embed") : depth0),{"name":"if","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":312,"column":28},"end":{"line":317,"column":35}}})) != null ? stack1 : "")
    + "                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n";
},"47":function(container,depth0,helpers,partials,data) {
    return "                                <div class=\"social-icon\" social-share=\"copyembedurl\"><span class=\"fa fa-code\" aria-hidden=\"true\"></span></div>\n                                <div class=\"embed-url-box\">\n                                        <div class=\"embedURL\"></div>\n                                </div>\n";
},"49":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"create-new rippleEffect\"></div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"player-container\" class=\"page-container\">\n    <div class=\"player_wrap\"> \n        <!--  fade overlay -->\n        <div class=\"overlay\"></div>\n        <div class=\"custom-popup-wrapper\">\n            <div class=\"custom-popup popup-in default-player\" id=\"social-share-options\">\n                <div class=\"close-custom-popup close-icon\" data-close></div>\n                <div class=\"share-popup-wrap\">\n                    <div class=\"popup-scroll-wrap\">\n                        <h2>Share This Page</h2>\n                        <p class=\"popup-desc\">Share this page on your feed.</p>\n                        <ul>\n                            <li class=\"twitter\">\n                                <div class=\"social-icon\" social-share=\"twitter\">\n                                    <span class=\"fa fa-twitter\" aria-hidden=\"true\"></span>\n                                    <span class=\"title\">Share with Twitter</span>\n                                </div>\n                            </li>\n                            <li class=\"linkedin\">\n                                <div class=\"social-icon\" social-share=\"linkedin\">\n                                    <span class=\"fa fa-linkedin-square\" aria-hidden=\"true\"></span>\n                                    <span class=\"title\">Share with Linkedin</span>\n                                </div>\n                            </li>\n                            <li class=\"facebook\">\n                                <div class=\"social-icon\" social-share=\"facebook\">\n                                    <span class=\"fa fa-facebook-square\" aria-hidden=\"true\"></span>\n                                    <span class=\"title\">Share with Facebook</span>\n                                </div>\n                            </li>\n                            <li class=\"reddit\">\n                                <div class=\"social-icon\" social-share=\"reddit\">\n                                    <span class=\"fa fa-reddit-square\" aria-hidden=\"true\"></span>\n                                    <span class=\"title\">Share with Reddit</span>\n                                </div>\n                            </li>\n                            <li class=\"copyurl\">\n                                <div class=\"social-icon\" social-share=\"copyurl\">\n                                    <span class=\"copy-url-icon\"></span>\n                                    <span class=\"title\">Copy URL</span>\n                                </div>                       \n                            </li>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"can_embed") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":28},"end":{"line":55,"column":35}}})) != null ? stack1 : "")
    + "                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- left sidebar -->\n        <div class=\"player-left-sidebar\">\n            <a href=\"#\" class=\"circle-back-button\"></a>\n        </div>\n\n        <!-- prgress indicator -->\n        <div class=\"progress-line\">\n            <div></div>\n        </div>\n\n        <!-- mobile back button -->\n        <div class=\"mobile-back\">\n            <a href=\"#\"><i class=\"icon-left\"></i></a>\n        </div>\n\n        <!-- Walkthrough Title -->\n        <div class=\"side-info-opener\"><span class=\"icon\"><span></span></span><span type='demo-title'>"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"walkthrough") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span><span class=\"slide_information\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i></span>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"live_mode") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":78,"column":12},"end":{"line":85,"column":23}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"tenant") : depth0)) != null ? lookupProperty(stack1,"is_rating_enabled") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":86,"column":12},"end":{"line":93,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n\n        <!-- Toggle side menu block -->\n        <div class=\"side-info\">\n                <div class=\"inner\">\n                <div class=\"back capital-letter\" slug='"
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "'>"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"back",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":99,"column":73},"end":{"line":99,"column":88}}}))
    + "</div>\n                <div class=\"frame \">\n                    <div class=\"walkthrough-lists jcf-scrollable\"></div>\n                </div>\n                <div class=\"bottom\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next_section") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":104,"column":20},"end":{"line":109,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n\n        <!-- Player block -->\n        <div id=\"player\" class=\"player_wrapper\"> \n            <div class=\"player_slider source-area\" id=\"slider\">\n                <ul id=\"sdemos-player-box\"></ul>\n            </div>\n            <div class=\"info-cta\">\n                <div class=\"left\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"next_walkthrough") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":24},"end":{"line":135,"column":31}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"right\">\n                    <div class=\"block signup-block\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"cta_list") : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":139,"column":24},"end":{"line":152,"column":33}}})) != null ? stack1 : "")
    + "                    </div>\n                    <div class=\"block thanku-block\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"section") : depth0)) != null ? lookupProperty(stack1,"cta_list") : stack1)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":154,"column":52},"end":{"line":154,"column":110}}})) != null ? stack1 : "")
    + ">\n                        <div class=\"title1 sub-title\">"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"thank you",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":155,"column":54},"end":{"line":155,"column":74}}}))
    + "</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Mobile Menu toggle -->\n        <img class=\"mobile-menu-toggle\" src=\"/static/images/arrow-up-grey.png\">\n        <div class=\"close-mobile-full-screen\"></div>\n          \n        <!-- Right side controll button block -->\n        <div class=\"side-panel\">\n            <ul>\n                <li><div class=\"full-screen-item full-screen-opener\"><i class=\"icon-zoom\"></i></div></li>\n                <li><div class=\"notes-item notes-opener\"><i class=\"icon-document\"></i>\n                    <div class=\"notes-icon\">\n                        <div></div>\n                        <div></div>\n                        <div></div>\n                    </div>\n                </div></li>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"tenant") : depth0)) != null ? lookupProperty(stack1,"is_messaging_enabled") : stack1),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":176,"column":16},"end":{"line":178,"column":23}}})) != null ? stack1 : "")
    + "                <li><div class=\"language-item language-opener\"><i class=\"icon-earth\"></i></div></li>\n                <li><div class=\"sb-bookmark-item bookmark-opener\"><i class=\"icon-bookmark\"></i></div></li>\n                <li><div class=\"fullscreen-item fullscreen-opener\"></div></li>\n                <!-- social share -->\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"live_mode") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":183,"column":16},"end":{"line":189,"column":23}}})) != null ? stack1 : "")
    + "            </ul>\n\n            <!-- walkthrough player controlls -->\n            <div class=\"control-holder\">\n                <div class=\"btn-prev customLink\" target=\"prev\"><i class=\"icon-left\"></i></div>\n                <div class=\"btn-next customLink\" target=\"next\"><i class=\"icon-right\"></i></div>\n            </div>\n\n            <!-- sandbox help icon -->\n            <div class=\"sandbox-help\"></div>\n            \n        </div>\n        <!-- social share -->\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"live_mode") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":203,"column":8},"end":{"line":207,"column":15}}})) != null ? stack1 : "")
    + "\n        \n        <!-- desktop control buttons -->\n        <div class=\"dt-btn-prev customLink\" target=\"prev\"></div>\n        <div class=\"dt-btn-next customLink\" target=\"next\"></div>\n        <!-- Toggle Slides Notes -->\n        <div class=\"notes\">\n            <div class=\"inner\" >\n                <div class=\"sub-inner \">\n                    <div class=\"notes-wrap jcf-scrollable \">\n                        <div class=\"notes-wrap-outer\">\n                            <div class=\"notes-wrap-inner\">\n                                <h1 target=\"title\"></h1>\n                                <div class=\"anim1\">\n                                    <p target=\"body\"></p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"button-title\">\n                        <div class=\"notes-link\"></div>\n                    </div>\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"show_notes_edit") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":231,"column":16},"end":{"line":239,"column":23}}})) != null ? stack1 : "")
    + "                <div class=\"pagination-wrap\"></div>\n\n            </div>\n        </div>\n\n        <!-- languages -->\n        <div class=\"language\">\n            <div class=\"inner\">\n                <div class=\"sub-inner\">\n                    <div class=\"language-block jcf-scrollable\">\n                        <div class=\"languages-wrap-outer\">\n                            <div class=\"languages-wrap-inner\">\n                                <div class=\"title camel-case\">\n                                    "
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"languages",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":253,"column":36},"end":{"line":253,"column":56}}}))
    + "\n                                </div>\n                                <ul class=\"languages\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"locales") : depth0),{"name":"each","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":256,"column":36},"end":{"line":260,"column":45}}})) != null ? stack1 : "")
    + "                                </ul>  \n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"language-block-mobile\">\n                        <h4>"
    + alias3(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"language select",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":266,"column":28},"end":{"line":266,"column":54}}}))
    + "</h4>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"locales") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),"<",2,{"name":"compare","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":267,"column":24},"end":{"line":269,"column":36}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"locales") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">",1,{"name":"compare","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":270,"column":24},"end":{"line":290,"column":36}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- End of languages -->\n\n        <!-- mobile social share -->\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"live_mode") : depth0),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":298,"column":8},"end":{"line":324,"column":15}}})) != null ? stack1 : "")
    + "        <!-- sandbox bookmarks to section links -->\n        <div class=\"sandbox-bookmarks\">\n            <div class=\"inner\">\n                <div class=\"sub-inner\">\n                    <div class=\"sandbox-bookmark-wrap jcf-scrollable\">\n                        <ul class=\"bookmarks-wrap\"></ul>  \n                    </div>                    \n                </div>\n            </div>\n        </div>\n        <!-- End of sandbox bookmarks to section links -->\n\n        <div class=\"form-cta\">\n            <div class=\"sign-up-wrap\"></div>\n        </div>\n\n        <!-- comments -->\n        <div class=\"comments\">\n            <div class=\"inner\" >\n                <div class=\"sub-inner\">\n                    <div class=\"lin-container-login\">\n                        <p>Do you have a comment?</p>\n                        <div class=\"social-icon\" id=\"linkedin-login\" data-source=\"comment\" data-social-login=\"linkedin\">\n                            <span class=\"fa fa-linkedin-square\" aria-hidden=\"true\"></span>\n                            <span class=\"title\">Log in with Linkedin</span>\n                        </div>\n                    </div>\n                    <div class=\"comments-area\">   \n                        <div class=\"comment-list\"></div>\n                        <form class=\"comments-form\" name=\"comments-form\" method=\"POST\">\n                            <textarea placeholder=\"write your comment...\"></textarea>\n                            <div class=\"comment-footer\">\n                                <input type=\"submit\" name=\"post-comment\" value=\"POST COMMENT\">\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- Content Rating popup -->\n        <div class=\"player-popups\">\n            <div class=\"player-overlay\">\n                <div class=\"popup-wrap\">\n                    <!-- Login to rate a content/demo -->\n                    <div class=\"popup-box\" id=\"content-rating-login\">\n                        <div class=\"popup-title\">\n                            <h4>Your Opinion Counts!</h4>\n                            <p>Help "
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"tenant") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + " make content that matters to you. Log in with Linkedin to submit your rating.</p>\n                        </div>\n                        <div class=\"popup-body\">\n                            <div class=\"linkedin\">\n                                <div class=\"social-icon\" social-share=\"linkedin\" data-source=\"rate\" data-social-login=\"linkedin\">\n                                    <span class=\"fa fa-linkedin-square\" aria-hidden=\"true\"></span>\n                                    <span class=\"title\">Log in with Linkedin</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"popup-footer\">\n                            <div class=\"form-footer\">\n                                <div class=\"cancel rippleEffect just-cancel\" rel=\"popup-create-chapter\">CANCEL</div>\n                            </div>\n                        </div>\n                    </div>\n                    <!-- After login to rate a content/demo -->\n                    <div class=\"popup-box\" id=\"content-rating-stars\">\n                        <div class=\"popup-title\">\n                            <h4>Give this content a rate!</h4>\n                            <p>Help "
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"tenant") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + " make content that matters to you</p>\n                        </div>\n                        <div class=\"popup-body\">\n                            <div class=\"stars\" data-stars=\"0\">\n                                <svg width=\"86\" height=\"77\" class=\"star rating\" data-rating=\"1\">\n                                    <g>\n                                        <path fill=\"#ececec\" d=\"M61.948,25.151c-0.124-0.381-0.453-0.659-0.85-0.716l-19.454-2.826l-8.7-17.629\n                                        c-0.355-0.719-1.534-0.719-1.888,0l-8.7,17.629L2.902,24.435c-0.397,0.058-0.726,0.336-0.85,0.716s-0.021,0.799,0.266,1.079\n                                        l14.077,13.722l-3.323,19.376c-0.067,0.395,0.095,0.794,0.419,1.029c0.325,0.236,0.755,0.267,1.109,0.08L32,51.29l17.401,9.148\n                                        c0.154,0.081,0.322,0.121,0.49,0.121c0.218,0,0.435-0.068,0.619-0.201c0.324-0.235,0.486-0.635,0.419-1.029l-3.323-19.376\n                                        l14.077-13.722C61.969,25.95,62.072,25.532,61.948,25.151z\"></path>\n                                    </g>\n                                </svg>\n                                <svg width=\"86\" height=\"77\" class=\"star rating\" data-rating=\"2\">\n                                    <g>\n                                        <path fill=\"#ececec\" d=\"M61.948,25.151c-0.124-0.381-0.453-0.659-0.85-0.716l-19.454-2.826l-8.7-17.629\n                                        c-0.355-0.719-1.534-0.719-1.888,0l-8.7,17.629L2.902,24.435c-0.397,0.058-0.726,0.336-0.85,0.716s-0.021,0.799,0.266,1.079\n                                        l14.077,13.722l-3.323,19.376c-0.067,0.395,0.095,0.794,0.419,1.029c0.325,0.236,0.755,0.267,1.109,0.08L32,51.29l17.401,9.148\n                                        c0.154,0.081,0.322,0.121,0.49,0.121c0.218,0,0.435-0.068,0.619-0.201c0.324-0.235,0.486-0.635,0.419-1.029l-3.323-19.376\n                                        l14.077-13.722C61.969,25.95,62.072,25.532,61.948,25.151z\"></path>\n                                    </g>\n                                </svg>\n                                <svg width=\"86\" height=\"77\" class=\"star rating\" data-rating=\"3\">\n                                    <g>\n                                        <path fill=\"#ececec\" d=\"M61.948,25.151c-0.124-0.381-0.453-0.659-0.85-0.716l-19.454-2.826l-8.7-17.629\n                                        c-0.355-0.719-1.534-0.719-1.888,0l-8.7,17.629L2.902,24.435c-0.397,0.058-0.726,0.336-0.85,0.716s-0.021,0.799,0.266,1.079\n                                        l14.077,13.722l-3.323,19.376c-0.067,0.395,0.095,0.794,0.419,1.029c0.325,0.236,0.755,0.267,1.109,0.08L32,51.29l17.401,9.148\n                                        c0.154,0.081,0.322,0.121,0.49,0.121c0.218,0,0.435-0.068,0.619-0.201c0.324-0.235,0.486-0.635,0.419-1.029l-3.323-19.376\n                                        l14.077-13.722C61.969,25.95,62.072,25.532,61.948,25.151z\"></path>\n                                    </g>\n                                </svg>\n                                <svg width=\"86\" height=\"77\" class=\"star rating\" data-rating=\"4\">\n                                    <g>\n                                        <path fill=\"#ececec\" d=\"M61.948,25.151c-0.124-0.381-0.453-0.659-0.85-0.716l-19.454-2.826l-8.7-17.629\n                                        c-0.355-0.719-1.534-0.719-1.888,0l-8.7,17.629L2.902,24.435c-0.397,0.058-0.726,0.336-0.85,0.716s-0.021,0.799,0.266,1.079\n                                        l14.077,13.722l-3.323,19.376c-0.067,0.395,0.095,0.794,0.419,1.029c0.325,0.236,0.755,0.267,1.109,0.08L32,51.29l17.401,9.148\n                                        c0.154,0.081,0.322,0.121,0.49,0.121c0.218,0,0.435-0.068,0.619-0.201c0.324-0.235,0.486-0.635,0.419-1.029l-3.323-19.376\n                                        l14.077-13.722C61.969,25.95,62.072,25.532,61.948,25.151z\"></path>\n                                    </g>\n                                </svg>\n                                <svg width=\"86\" height=\"77\" class=\"star rating\" data-rating=\"5\">\n                                    <g>\n                                        <path fill=\"#ececec\" d=\"M61.948,25.151c-0.124-0.381-0.453-0.659-0.85-0.716l-19.454-2.826l-8.7-17.629\n                                        c-0.355-0.719-1.534-0.719-1.888,0l-8.7,17.629L2.902,24.435c-0.397,0.058-0.726,0.336-0.85,0.716s-0.021,0.799,0.266,1.079\n                                        l14.077,13.722l-3.323,19.376c-0.067,0.395,0.095,0.794,0.419,1.029c0.325,0.236,0.755,0.267,1.109,0.08L32,51.29l17.401,9.148\n                                        c0.154,0.081,0.322,0.121,0.49,0.121c0.218,0,0.435-0.068,0.619-0.201c0.324-0.235,0.486-0.635,0.419-1.029l-3.323-19.376\n                                        l14.077-13.722C61.969,25.95,62.072,25.532,61.948,25.151z\"></path>\n                                    </g>\n                                </svg>\n                            </div>\n                        </div>\n                        <div class=\"popup-footer\">\n                            <div class=\"form-footer\">\n                                <div class=\"cancel rippleEffect\" rel=\"popup-cancel-rating\">CANCEL</div>\n                                <div class=\"submit rippleEffect\" rel=\"popup-submit-rating\">SUBMIT</div>\n                            </div>\n                            <div class=\"rating-submit-status\">\n                                <div class=\"rating-submit-inprogress\"></div>\n                                <div class=\"rating-submit-success capital-letter\">rating successfully submitted! thank you.</div>\n                                <div class=\"rating-submit-failed capital-letter\">oops! your submission was not sent</div>\n                            </div>\n                        </div>\n                    </div>\n                    \n                    <!-- sandbox help info popup -->\n\n                    <div class=\"popup-box\" id=\"sandbox-help\">\n                        <h1>Tips &amp; Tricks</h1>\n                        <p>Navigate through this sandbox by clicking the designated hotspots or by using your left and right keyboard keys.\n                        You may click the \"?\" button at the top right corner to access the menu at any time.</p>\n                        <div class=\"controls\">\n                            <div class=\"control\">\n                                <div class=\"keys\">\n                                    <img class=\"key\" src=\"/static/images/left_key.png\">\n                                    <img class=\"key\" src=\"/static/images/right_key.png\">\n                                    <p>navigate</p>\n                                </div>\n                                <div class=\"keys\">\n                                    <div>\n                                        <img class=\"key\" src=\"/static/images/ctr_key.png\">\n                                        <img src=\"/static/images/plus.png\">\n                                        <img class=\"key\" src=\"/static/images/y_key.png\">\n                                    </div>\n                                    <p>toggle hotspot</p>\n                                </div>\n                                <div class=\"keys\">\n                                    <div>\n                                        <img class=\"key\" src=\"/static/images/ctr_key.png\">\n                                        <img src=\"/static/images/plus.png\">\n                                        <img class=\"key\" src=\"/static/images/j_key.png\">\n                                    </div>\n                                    <p>jump to section</p>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"sandbox-help-close\">Got it</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </div>\n    <div id=\"theme-name\" data-theme=\""
    + alias3(alias2(((stack1 = (depth0 != null ? lookupProperty(depth0,"tenant") : depth0)) != null ? lookupProperty(stack1,"template") : stack1), depth0))
    + "\"></div>\n    <!-- End of player page wrap-->    \n</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"editView") : depth0),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":498,"column":0},"end":{"line":500,"column":7}}})) != null ? stack1 : "")
    + "<div id='pdf-viewer-block' class=\"hide\"></div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/playlist.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/playlist.handlebars ***!
  \*******************************************************************/
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

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"walkthroughs") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":16,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"playlist_name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n    <ul class=\"pwt-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"walkthroughs") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":14,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li slug='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "'>\n              <div class=\"read\">\n                    <div class=\"circle\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":8,"column":40},"end":{"line":8,"column":61}}}))
    + "</div>\n              </div>\n              <div class=\"title\">\n                    <div>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n              </div>\n            </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"playlists") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":17,"column":9}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/slide.handlebars":
/*!****************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/slide.handlebars ***!
  \****************************************************************/
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

  return "           <audio>\n               <source src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"sec_src") : depth0), depth0))
    + "\">\n               Your browser does not support the audio element.\n           </audio>\n           <div class=\"image_with_audio\">\n               <div class=\"v-audio\">\n                   <div class=\"audio-backward\"></div>\n                   <div class=\"audio-control play\"></div>\n                   <div class=\"audio-farward\"></div>\n                   <div class=\"audio-mute\"></div>\n                   <div class=\"audio-currentTime\">00:00</div>\n                   <div class=\"audio-timeline\">\n                       <div class=\"audio-progress\"></div>\n                   </div>\n                   <div class=\"audio-duration\">00:00</div>\n               </div>\n           </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <audio preload=\"metadata\">\n                <source src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\">\n                Your browser does not support the audio element.\n            </audio>\n            <div class=\"slide_audio\">\n                <div class=\"audio_banner\">\n                    <img class='banner_image' src='/static/images/author/thumb-audio.png'>\n                </div>\n                <div class=\"v-audio\">\n                    <div class=\"audio-backward\"></div>\n                    <div class=\"audio-control play\"></div>\n                    <div class=\"audio-farward\"></div>\n                    <div class=\"audio-mute\"></div>\n                    <div class=\"audio-currentTime\">00:00</div>\n                    <div class=\"audio-timeline\">\n                        <div class=\"audio-progress\"></div>\n                    </div>\n                    <div class=\"audio-duration\">00:00</div>\n                </div>\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <video width=\"100%\" poster=\"\" >\n                  <source src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\" type=\"video/mp4\">\n                Your browser does not support the video tag.\n            </video>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"pdf-launcher\">\n                <div class=\"col-md-8\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"thumbnail_url") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":53,"column":20},"end":{"line":57,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n                <div class=\"col-md-4\">view pdf</div>\n            </div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"thumbnail_url") : depth0), depth0))
    + "\">\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                        <img src=\"/static/images/pdf-thumb.png\">\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <iframe allowFullScreen='allowFullScreen' embedType=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"embedType") : depth0), depth0))
    + "\" resPath=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"resPath") : depth0), depth0))
    + "\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class='wistia-player-block'>\n                <iframe src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\" resPath=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"resPath") : depth0), depth0))
    + "\" title=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\"\n                allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\"\n                class=\"wistia_embed\" name=\"wistia_embed\"\n                allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen>\n                </iframe>\n            </div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <a class='slide_link' href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" target=\"_blank\">\n                <div class=\"link_icon\">\n                    <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"icon") : depth0), depth0))
    + "\" />\n                </div>\n                <div class='link_information'>\n                    <div class=\"glyphicon glyphicon-link\" aria-hidden=\"true\"></div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"site_name") : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":81,"column":20},"end":{"line":83,"column":27}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"title") : stack1),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":84,"column":20},"end":{"line":86,"column":27}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"description") : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":87,"column":20},"end":{"line":89,"column":27}}})) != null ? stack1 : "")
    + "                    <div class=\"link\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "</div>\n                </div>\n            </a>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"link_name\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"site_name") : stack1), depth0))
    + "</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"link_title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"title") : stack1), depth0))
    + "</div>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"link_description\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"meta_data") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <!-- Text html content goes here -->\n            <div class=\"content-slide-wrap "
    + container.escapeExpression(alias1((depth0 != null ? lookupProperty(depth0,"document_styles") : depth0), depth0))
    + "\">\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_template") : depth0),"==","bmc",{"name":"compare","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":97,"column":16},"end":{"line":101,"column":28}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_template") : depth0),"==","designeverest",{"name":"compare","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":102,"column":16},"end":{"line":106,"column":28}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_template") : depth0),"==","vmware",{"name":"compare","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":107,"column":16},"end":{"line":111,"column":28}}})) != null ? stack1 : "")
    + "                <div class=\"fr-element fr-view content-slide\">\n                    "
    + ((stack1 = alias1((depth0 != null ? lookupProperty(depth0,"content") : depth0), depth0)) != null ? stack1 : "")
    + "\n                </div>\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias2,(depth0 != null ? lookupProperty(depth0,"tenant_template") : depth0),"==","vmware",{"name":"compare","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":115,"column":16},"end":{"line":117,"column":28}}})) != null ? stack1 : "")
    + "                <div class=\"content-footer\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"footer_image") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":119,"column":20},"end":{"line":121,"column":27}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"footer_text") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":122,"column":20},"end":{"line":124,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"rte-branding\">\n                    <img class =\"rte-header\" src=\"/static/images/bmc/rte_header_bmc.png\">\n                </div>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"rte-branding\">\n                    <img class =\"rte-header\" src=\"/static/images/designeverest/rte_header.png\">\n                </div>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"rte-branding\">\n                    <img class =\"rte-header\" alt=\"header-image\" align=\"right\" src=\"/static/images/vmware/rte_header_vmware.png\">\n                </div>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"footer-bar\"></div>\n";
},"32":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img class='content-footer-image' src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"footer_image") : depth0), depth0))
    + "\"></img>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class='content-footer-text'>"
    + ((stack1 = container.lambda((depth0 != null ? lookupProperty(depth0,"footer_text") : depth0), depth0)) != null ? stack1 : "")
    + "</div>\n";
},"36":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <iframe width=\"100%\" height=\"100%\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\" resPath=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"resPath") : depth0), depth0))
    + "\"></iframe>            \n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"product-360-viewer\">\n                <div class=\"product-viewer\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"frames") : depth0),{"name":"each","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":135,"column":20},"end":{"line":139,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n                <!-- 360 product viewer controlls -->\n                <div class=\"product-viewer-controls\">\n                    <div class=\"slider360\"></div>\n                </div>\n            </div>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"product-frame "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(data && lookupProperty(data,"index")),"==",0,{"name":"compare","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":136,"column":50},"end":{"line":136,"column":96}}})) != null ? stack1 : "")
    + "\" data-frame=\""
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":136,"column":110},"end":{"line":136,"column":131}}}))
    + "\">\n                            <img class=\"slide_image\" src=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"framePath") : depth0), depth0))
    + "\" alt=\"Product Preview\">\n                        </div>\n";
},"40":function(container,depth0,helpers,partials,data) {
    return " active ";
},"42":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"sandbox-viewer\">\n                <div class=\"sb-buffering-container\">\n                    <div class=\"sb-buffering-block\">\n                        <p>Loading demo...</p>\n                        <div class=\"sb-progress-bar\">\n                            <div class=\"sb-loader\"></div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"sandbox-player\" hotspot-status=\"show\"></div>\n                <!-- sandbox product loading UI -->\n                <div class=\"loading-progress\">\n                    <img src=\"/static/images/sandbox_loading_img.gif\"/>\n                </div>\n            </div>\n";
},"44":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"file_block\">\n                <div class=\"file_icon\">\n                    <img src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"imageSrc") : depth0), depth0))
    + "\">\n                </div>\n                <div class=\"file_information\">\n                    <div class=\"file_title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_title") : depth0), depth0))
    + "</div>\n                    <div class=\"file_type\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_type") : depth0), depth0))
    + " File</div>\n                    <div class=\"file_size\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_size") : depth0), depth0))
    + " MB</div>\n                </div>\n                <div class=\"download_file\">\n                    <a id=\"downloadFile\" data-url=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"path_name") : depth0), depth0))
    + "\"\n                        data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"file_name") : depth0), depth0))
    + "\" data-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"resource_id") : depth0), depth0))
    + ">\n                        Download File\n                    </a>\n                </div>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"slides-Container\" slide-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\" data-template=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"tenant_template") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_image_with_audio") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":20,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"slideArea width\" id=\"slider"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"order") : depth0), depth0))
    + "\" slide-type=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"type") : depth0), depth0))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_audio") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":8},"end":{"line":43,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_video") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":8},"end":{"line":49,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"isPdf") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":8},"end":{"line":61,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_embed") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":8},"end":{"line":64,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_wistia") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":65,"column":8},"end":{"line":73,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_link") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":74,"column":8},"end":{"line":93,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_content") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":94,"column":8},"end":{"line":127,"column":15}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_iframe") : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":128,"column":8},"end":{"line":130,"column":15}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_360") : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":132,"column":8},"end":{"line":146,"column":15}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_sandbox") : depth0),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":148,"column":8},"end":{"line":164,"column":15}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"is_file") : depth0),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":166,"column":8},"end":{"line":183,"column":15}}})) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/home.js":
/*!***************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/home.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../../apps/bulletin_board/models/bulletin_board */ "./sharedemos/static/js/apps/bulletin_board/models/bulletin_board.js"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\.handlebars$")("./" + document.template_folder + "/home.handlebars"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/home\\-sections\\-all\\.handlebars$")("./" + document.template_folder + "/home-sections-all.handlebars"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/recent\\-trending\\-demos\\.handlebars$")("./" + document.template_folder + "/recent-trending-demos.handlebars"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Section, BulletinBoard, HomeTemplate, AllProductsTemplate, RecentDemosTemplate) {
  'use strict';

  var HomeView = Backbone.View.extend({
    el: '#block_container',
    template: HomeTemplate,
    all_products_template: AllProductsTemplate,
    demos_template: RecentDemosTemplate,
    events: {
      'click .home-container .pwt-box, .category-container .pwt-box': 'winWidth',
      'click .fs-banner .all': 'showAllProducts',
      'click .trending': 'showTrendingDemos',
      'click .mostrecent': 'showRecentDemos',
      'click .recent': 'launchDemo',
      'click .tags-span': function (event) {
        Common.searchTags(event);
      },
      'mousemove .boxtemp .pwt-list .pwt-box .left': 'tiltImageMouseMove',
      'mouseleave .boxtemp .pwt-list .pwt-box .left': 'tiltImageMouseLeave'
    },
    initialize: function (attrs) {
      this.section = new Section();
      var root = this;
      this.section.fetch().done(function (response) {
        if (response.ret_url) {
          let redirect_url = response.ret_url;

          _.extend(response.args, {
            next: window.location.pathname + window.location.hash
          });

          redirect_url += '?' + $.param(response.args);
          window.location.href = window.location.origin + redirect_url;
        } else {
          root.render();
        }
      }).fail(function (attrs, textStatus, xhr) {
        Common.modelFetchErrorHandler(attrs, xhr);
      });
    },
    render: function () {
      Common.product_details = null;
      var tenant = this.section.get('tenant');
      Common.resetVisits();

      var isBulletinBoardEnabled = _.some(this.section.attributes.tenant.applications, function (app) {
        return app.unique_id.toLowerCase() == 'bulletin_board';
      });

      var template_vars = {
        'tenant_title': tenant && tenant.title || 'PRODUCT WALKTHROUGHS',
        'tenant_privacy_link': document.privacy_link,
        'bulletinBoardData': this.section.get('bulletin_board_list'),
        'isBulletinBoardEnabled': isBulletinBoardEnabled,
        'isPrivateTenant': this.section.attributes.tenant.is_private,
        'can_edit': document.viewType == 'edit'
      };
      Common.loadLanguages(this.section.get('locales'));
      this.$el.html(this.template(template_vars));
      var root = this;

      _.each(this.section.get('all_products'), function (section) {
        if (['home', 'audience'].indexOf(document.viewType) !== -1 && section.is_enabled == undefined) {
          section.is_enabled = true;
        }

        section.is_visible = !section.is_hidden;

        if (!section.description) {
          section.description = Common.LOREM_IPSUM;
        }

        if (section.linked_asset) {
          section.icon = section.icon || {
            url: Common.SECTION_LINK_TYPE_IMAGE_PATH
          };
        } else {
          section.icon = section.icon || {
            url: Common.SECTION_IMAGE_PATH
          };
        }
      });

      _.each(this.section.get('trending_demos'), this.setDefaultThumbnail, this);

      _.each(this.section.get('recent_demos'), this.setDefaultThumbnail, this);

      this.renderAllProducts();
      var trendingContentLength = false,
          mostRecentLength = false;

      if (document.viewType != 'home') {
        this.$('#home-container .mostrecent, #home-container .trending').addClass('hide');
      } else {
        if (!this.section.get('trending_demos').length && !this.section.get('recent_demos').length) {
          this.$(".filter").addClass('hide');
        }

        if (!this.section.get('trending_demos').length) {
          this.$(".filter.trending").addClass('hide');
        } else {
          this.renderTrendingDemos();
          trendingContentLength = true;
        }

        if (!this.section.get('recent_demos').length) {
          this.$(".filter.mostrecent").addClass('hide');
        } else {
          this.renderRecentDemos();
          mostRecentLength = true;
        }
        /* only for box template */


        if (document.template_folder == 'box') {
          if (trendingContentLength == true) {
            this.$(".filter.trending, .home-container.trending").addClass('active');
          } else if (trendingContentLength == false && mostRecentLength == true) {
            this.$(".filter.mostrecent, .home-container.mostrecent").addClass('active');
          }
        }
      }

      Common.setVisit({
        'name': 'Home',
        'slug': null
      });
      Common.transition();
      var title = tenant.name || 'Product Walkthroughs';
      utils.setSEOData(title, window.location.href, tenant.description);
      Common.logVisitActivity();
      Backbone.trigger("view_rendered", this);

      if (document.isPrivateTenant) {
        $('.social-sharing').addClass('hide');
      } else {
        $('.social-sharing').removeClass('hide');
      }

      Common.tooltip();
    },
    setDefaultThumbnail: function (demo) {
      if (!demo.image_src) switch (true) {
        case demo.slide_type == 'audio':
          demo.image_src = Common.DEFAULT_AUDIO_ICON;
          break;

        case demo.slide_type == 'link' || demo.slide_type == 'embed':
          demo.image_src = Common.DEFAULT_LINK_ICON;
          break;

        case demo.slide_type == 'iframe' || demo.slide_type == 'html5':
          demo.image_src = Common.DEFAULT_IFRAME_ICON;
          break;

        default:
          demo.image_src = Common.DEFAULT_CHAPTER_ICON;
      }
    },
    winWidth: function (e) {
      if ($(window).width() > 991) {
        this.launchSection(e);
      } else {
        this.rippleEffect(e);
      }
    },
    rippleEffect: function (event) {
      var box = event.currentTarget;
      var x = event.pageX;
      var y = event.pageY;
      var clickY = y - $(box).offset().top;
      var clickX = x - $(box).offset().left;
      var setX = parseInt(clickX);
      var setY = parseInt(clickY);
      $(box).find("svg").remove();
      $(box).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');
      setTimeout(function () {
        var c = $(box).find("circle");
        c.animate({
          "r": $(box).outerWidth()
        }, {
          easing: "linear",
          duration: 200,
          step: function (val) {
            c.attr("r", val);
          },
          complete: function () {
            var section_id = $(box).attr('slug');
            Backbone.history.navigate('#!/' + section_id, {
              trigger: true
            });
          }
        });
      });
    },
    launchSection: function (event) {
      if (this.$(event.target).hasClass("no-action") || this.$(event.currentTarget).hasClass("disabled") || this.$(event.target).hasClass('tags-span') || this.$(event.currentTarget).children().hasClass('sync-inprogress')) return;
      var section_id = $(event.currentTarget).attr('slug');
      Backbone.history.navigate('#!/' + section_id, {
        trigger: true
      });
    },
    launchDemo: function (event) {
      if (this.$(event.target).hasClass('tags-span')) return;
      var product_id = $(event.currentTarget).attr('product');
      var section_id = $(event.currentTarget).attr('section');
      var demo_id = $(event.currentTarget).attr('demo');
      Common.loadWalkthrough(product_id, section_id, demo_id);
    },
    unload: function () {
      utils.removeSEOData();
      this.undelegateEvents();
    },
    renderAllProducts: function () {
      if (document.viewType == 'edit') {
        var isEditView = true;
      }

      var template_vars = {
        'sections': this.section.get('all_products'),
        'editView': isEditView,
        'is_author': document.viewType == 'edit'
      };
      this.$('.home-container.all, .category-container.all').html(this.all_products_template(template_vars));
    },
    showAllProducts: function () {
      this.$(".filter, .home-container").removeClass('active');
      this.$(".filter.all, .home-container.all").addClass('active');
    },
    renderTrendingDemos: function () {
      var template_vars = {
        'demos': this.section.get('trending_demos')
      };
      this.$('.home-container.trending').html(this.demos_template(template_vars));
    },
    showTrendingDemos: function () {
      this.$(".filter, .home-container").removeClass('active');
      this.$(".filter.trending, .home-container.trending").addClass('active');
    },
    renderRecentDemos: function () {
      var template_vars = {
        'demos': this.section.get('recent_demos')
      };
      this.$('.home-container.mostrecent').html(this.demos_template(template_vars));
    },
    showRecentDemos: function () {
      this.$(".filter, .home-container").removeClass('active');
      this.$(".filter.mostrecent, .home-container.mostrecent").addClass('active');
    },
    tiltImageMouseMove: function (e) {
      var curTarg = e.currentTarget,
          eX = e.offsetX,
          eY = e.offsetY,
          dim = e.currentTarget.getBoundingClientRect(),
          w = dim.width / 2,
          h = dim.height / 2,
          tiltLimit = 5,
          posX = (h - eY) * (tiltLimit / h),
          posY = (w - eX) * (tiltLimit / w) * -1;
      $(curTarg).find('.thumbnail_block').css({
        'transform': 'rotateX( ' + posX + 'deg ) rotateY( ' + posY + 'deg )',
        'box-shadow': posY * -1 + 'px ' + (posX + 5) + 'px 17px 0 rgba( 55, 55, 55, 0.1 )'
      });
    },
    tiltImageMouseLeave: function (e) {
      var curTarg = e.currentTarget;
      var $el = $(curTarg).find('.thumbnail_block');
      $el.removeAttr('style').addClass('hover--ending');
      setTimeout(function () {
        $el.removeClass('hover--ending');
      }, 500);
    }
  });
  return HomeView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/player.js":
/*!*****************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/player.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! jcf */ "./sharedemos/static/libs/jcf/jcf.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/cta */ "./sharedemos/static/js/tenant/models/cta.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../models/walkthrough */ "./sharedemos/static/js/tenant/models/walkthrough.js"), __webpack_require__(/*! ../models/activity */ "./sharedemos/static/js/tenant/models/activity.js"), __webpack_require__(/*! ../models/linkedin_user */ "./sharedemos/static/js/tenant/models/linkedin_user.js"), __webpack_require__(/*! ../models/rate_content */ "./sharedemos/static/js/tenant/models/rate_content.js"), __webpack_require__(/*! ../models/social_share */ "./sharedemos/static/js/tenant/models/social_share.js"), __webpack_require__(/*! ../models/user-details */ "./sharedemos/static/js/tenant/models/user-details.js"), __webpack_require__(/*! ../views/slide */ "./sharedemos/static/js/tenant/views/slide.js"), __webpack_require__(/*! ../../pdf_viewer/views/pdf_viewer */ "./sharedemos/static/js/pdf_viewer/views/pdf_viewer.js"), __webpack_require__(/*! ../templates/comments.handlebars */ "./sharedemos/static/js/tenant/templates/comments.handlebars"), __webpack_require__(/*! ../templates/cta_form.handlebars */ "./sharedemos/static/js/tenant/templates/cta_form.handlebars"), __webpack_require__(/*! ../templates/player.handlebars */ "./sharedemos/static/js/tenant/templates/player.handlebars"), __webpack_require__(/*! ../templates/playlist.handlebars */ "./sharedemos/static/js/tenant/templates/playlist.handlebars"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js"), __webpack_require__(/*! cookies */ "./sharedemos/static/js/helpers/cookies.js"), __webpack_require__(/*! jquery.sudoslider */ "./sharedemos/static/libs/sudo-slider/jquery.sudoSlider.min.js"), __webpack_require__(/*! jquery.qtip */ "./sharedemos/static/libs/jquery-qtip/jquery.qtip.min.js"), __webpack_require__(/*! bootstrap */ "./sharedemos/static/libs/bootstrap/js/bootstrap.min.js"), __webpack_require__(/*! jcf.scrollable */ "./sharedemos/static/libs/jcf/jcf.scrollable.js"), __webpack_require__(/*! slick */ "./sharedemos/static/libs/slick/slick.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, jcf, Backbone, Common, Cta, Section, Walkthrough, WalkthroughActivity, LinkedinUser, Rating, SocialShare, UserDetails, SlideView, PdfView, CommentsTemplate, CTAForm, PlayerTemplate, PlaylistTemplate) {
  'use strict';

  var PlayerView = Backbone.View.extend({
    el: '#block_container',
    template: PlayerTemplate,
    playlisttemplate: PlaylistTemplate,
    RATINGS_CLICKED: false,
    events: {
      //side-panel and toggle  events
      'click .fade': function (event) {
        Common.toggleFade(this, event);
      },
      'click .side-info-opener .icon:not(.disabled)': 'toggleSideMenu',
      'click .notes-opener, .mobile-menu-toggle': function (event) {
        this.showOrHideNotes({
          'action': 'toggle',
          'event': event
        });
      },
      'click .comments-opener': 'toggleCommentsBlock',
      'click .full-screen-opener': 'toggleFullScreen',
      'click .language-opener': 'toggleLanguage',
      'click .social-share': 'showShareOptions',
      'click ul.languages li': 'changeLanguage',
      'click .social-icon:not([data-social-login=linkedin])': 'shareLink',
      'click .bookmark-opener': 'showSandboxBookmarks',
      'click .walkthrough-lists li': 'openWalkthrough',
      'click #social-share-options .close-icon': 'closeShareOption',
      'click .social-share.mobile': function (event) {
        Common.toggleMobileShare(this, event);
      },
      'click .fullscreen-item, .close-mobile-full-screen': function (event) {
        Common.toggleMobileFullScreen(this, event);
      },
      //player events
      'click .customLink[target=prev]': 'gotoPrevSlide',
      'click .customLink[target=next]': 'gotoNextSlide',
      'scroll_slide .hotspot': 'scrollSlide',
      'scroll_slide .overlay': 'scrollSlide',
      'click .side-info .back': 'backToPlaylist',
      'click .next-section-name': 'loadNextSection',
      'click .pwt-list li': function () {
        Common.triggerGAevent('Menu', 'Walkthrough');
      },
      'click .pin-opener': 'toggleDropPin',
      'click .close-embed-url': 'hideEmbedURLBox',
      'click .bookmarks-container': 'jumpToSandboxSection',
      'click div[data-social-login="linkedin"]': 'processLinkedinLogin',
      'submit form[name=comments-form]': 'postFrameComment',
      'click .avg-rating-star': 'loginToRateContent',
      'click .popup-footer .cancel': 'closePopup',
      'click svg.rating': 'rateContent',
      'click #content-rating-stars .submit': 'submitContentRating',
      'click .pagination li:not([data-page="new"]), .pagination-wrap .page-next, .pagination-wrap .page-prev': function (event) {
        Common.setPaginationNotes(this, event);
      },
      'click .notes-link': function (event) {
        Common.showNotesLinkPopup(this, event);
      },
      'click .note-popup-close': function (event) {
        Common.closeNotesLinkPopup(this, event);
      },
      'click .sandbox-help:not(.disabled)': function () {
        this.popupShow('sandbox-help');
      },
      'click .sandbox-help-close': function () {
        this.popupClose('sandbox-help');
      },
      'click .fr-view img': function (event) {
        Common.showImagePopup(this, event);
      },
      'click .image-popup-close': function (event) {
        Common.closeImagePopup(this, event);
      },
      //CTA form functions
      'click .cta-signup': 'showSignup',
      'click .form-footer .cancel': 'closeSignUp',
      'blur form[name=lead] input': 'checkInput',
      'submit form[name=lead]': 'submitUserDetails',
      'click .cta-link': 'showThankyou',
      'click .explore-btn': 'openWalkthrough',
      'click .cta-image': 'openWalkthroughMobile',
      'click [data-cta-id]': 'trackCTAAnalytics'
    },
    initialize: function (attrs) {
      $(window).on('resize', {
        'root': this
      }, this.onWindowResize);
      $(document).on('keydown', {
        'root': this
      }, this.keyDownHandler);
      $(document).on('change', '.mobile-language-select', {
        'root': Common
      }, Common.changeLanguage);
      this.listenTo(Backbone, 'launch_pdf', data => this.pdfviewer && this.pdfviewer.launchPdfViewer(data));
      this.listenTo(Backbone, 'linkedin_login', this.loginUser);
      this.listenTo(Backbone, 'load_comments', this.loadComments);
      this.load(attrs.product, attrs.section, attrs.walkthrough, attrs.slide_index);
    },
    load: function (product, section, walkthrough, slide_index) {
      this.product_id = product;
      this.section_id = section;
      this.walkthrough_id = walkthrough;
      Common.CURRENT_SLIDE = slide_index || 1;
      this.navigate_slide = true;
      this.progress = 0;
      this.demo_completed = false;
      this.walkthrough = new Walkthrough({
        id: this.walkthrough_id
      });
      var root = this;

      if (this.section_id) {
        this.section = new Section({
          id: this.section_id
        });
        $.when(this.section.fetch()).done(function (response) {
          if (response.ret_url) {
            let redirect_url = response.ret_url;

            _.extend(response.args, {
              next: window.location.pathname + window.location.hash
            });

            redirect_url += '?' + $.param(response.args);
            window.location.href = window.location.origin + redirect_url;
          } else {
            root.fetchWalkthrough();
          }
        }).fail(function (attrs, textStatus, xhr) {
          if (attrs.status == 302) {
            Common.loadWalkthrough(root.product_id, attrs.responseJSON, root.walkthrough_id);
          } else {
            Common.modelFetchErrorHandler(attrs, xhr);
          }
        });
      } else {
        this.section_id = this.product_id;
        this.section = Common.product_details;
        root.fetchWalkthrough();
      }
    },
    fetchWalkthrough: function () {
      var root = this;
      $.when(this.walkthrough.fetch()).done(function () {
        if (root.walkthrough && root.walkthrough.get('slides') && root.walkthrough.get('slides').length && Common.CURRENT_SLIDE > root.walkthrough.get('slides').length) {
          Common.CURRENT_SLIDE = root.walkthrough.get('slides').length;
        }

        root.lastLoadedSlideIndex = Common.CURRENT_SLIDE;
        root.TIME_SPENT = $.now();
        root.walkthroughActivityList = [];

        _.each(root.walkthrough.get('slides'), function (slide, index) {
          root.walkthroughActivityList.push(new WalkthroughActivity({
            slide_index: slide.order,
            walkthrough: root.walkthrough_id,
            section: root.section_id,
            product: root.product_id
          }));
        });

        return root.loadData();
      }).fail(function (attrs, textStatus, xhr) {
        if (attrs.status == 302) {
          Common.loadWalkthrough(root.product_id, root.section_id, attrs.responseJSON);
        } else {
          Common.modelFetchErrorHandler(attrs, xhr);
        }
      });
    },
    loadScripts: function () {
      $('script[type="application/ld+json"]').remove();
      $('#product_analytics').html('');

      if (document.viewType && document.viewType != 'edit' && document.viewType != 'preview') {
        var first_slide = this.walkthrough && this.walkthrough.get('slides') && this.walkthrough.get('slides').length && this.walkthrough.get('slides')[0];

        if (first_slide && first_slide['primary_resource']['type'] == "image" || first_slide['secondary_resource'] && first_slide['secondary_resource']['type'] == "image") {
          var first_slide_image_path;

          if (first_slide['secondary_resource'] && first_slide['secondary_resource']['type'] == "image") {
            first_slide_image_path = first_slide['secondary_resource']['path'];
          } else {
            first_slide_image_path = first_slide['primary_resource']['path'];
          }

          var logo_image_path = $(".logo img").attr('src');
          var logo_image_width = $(".logo img").width();
          var logo_image_height = $(".logo img").height();
          $('head').append('<script type="application/ld+json">' + '{' + '"@context": "https://schema.org/",' + '"@type": "TechArticle",' + '"mainEntityOfPage":{' + '"@type":"WebPage",' + '"@id":"' + window.location.origin + '"' + '},' + '"headline": "' + this.walkthrough.get('name') + '",' + '"image": {' + '"@type": "ImageObject",' + '"url": "https://' + window.location.hostname + '/static/media/' + first_slide_image_path + '",' + '"height":' + first_slide['image_height'] + ',' + '"width":' + first_slide['image_width'] + '},' + '"datePublished": "' + first_slide['created_at'] + '",' + '"dateModified": "' + first_slide['modified_at'] + '",' + '"author": {' + '"@type": "Organization",' + '"name": "' + document.org_name + '"' + '},' + '"publisher": {' + '"@type": "Organization",' + '"name": "' + document.org_name + '",' + '"logo": {' + '"@type": "ImageObject",' + '"url": "https://' + window.location.hostname + logo_image_path + '",' + '"height":' + logo_image_height + ',' + '"width":' + logo_image_width + '}' + '},' + '"description": "' + first_slide['text'] + '"' + '}' + '</script>');
        }

        var product_analytics = Common.product_details.get('analytics');
        $('#product_analytics').html(product_analytics || "");
      }
    },
    loadData: function () {
      if (!this.verifyWalkthroughParent()) return false;

      if (!Common.VISIT_STACK.length) {
        return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
      }

      if (this.product_id == this.section_id) {
        var current_parent = Common.product_details;
      } else {
        var current_parent = this.section.get('parent');
      }

      if (!Common.verifyParent(this.product_id, current_parent)) {
        return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
      }

      this.render();
    },
    verifyWalkthroughParent: function () {
      var current_walkthrough_slug = this.walkthrough.get('slug');
      var verified = false;

      _.some(this.section.get('playlists'), function (playlist) {
        return _.some(playlist.walkthroughs, function (demo) {
          if (demo.slug == current_walkthrough_slug) {
            verified = true;
            return true;
          }
        });
      });

      if (verified) return verified;
      var complete_url = Backbone.history.getHash();
      return Common.checkRedirect(complete_url.split('!/')[1]);
    },
    render: function () {
      // reseting the value every time a demo loads.
      document.NOTES_RESET_PLAYER_WIDTH = undefined;
      document.RESET_PLAYER_WIDTH = undefined;
      $('body').addClass('player-loaded');
      this.user_details_saved = false;
      this.tenant = this.walkthrough.get('tenant');
      Common.USER_SHOW_NOTES = this.tenant.show_notes || false;
      var l_list = this.walkthrough.get('locales').languages;
      var l_selected = this.walkthrough.get('locales').selected;

      var default_language = _.find(l_list, function (lang) {
        return lang.default_locale == true;
      });

      var locale_available = _.find(l_list, function (lang) {
        return l_selected.locale == lang.locale;
      });

      if (!locale_available) {
        l_selected = default_language;
      }

      _.each(l_list, function (lang) {
        if (lang.locale == l_selected.locale) {
          lang.selected = true;
        } else {
          lang.selected = false;
        }
      });

      if (document.viewType == 'edit') {
        var isEditView = true;
      }

      var template_vars = {
        'walkthrough': {
          'name': this.walkthrough.get('name'),
          'slug': this.walkthrough.get('slug')
        },
        'next_walkthrough': this.walkthrough.get('next_walkthrough'),
        'section': {
          'name': this.section.get('name'),
          'slug': this.section.get('slug'),
          'cta_list': this.section.get('cta_list')
        },
        'product': {
          'name': Common.product_details.get('name'),
          'slug': Common.product_details.get('slug'),
          'is_private': this.section.attributes.product.is_private || false
        },
        'tags': this.walkthrough.get('tags'),
        'locales': l_list,
        'can_embed': this.section.get('tenant') && this.section.get('tenant').can_embed || false,
        'published': Boolean(this.walkthrough.get('published')),
        'tenant': this.walkthrough.get('tenant'),
        'is_enabled': this.walkthrough.get('is_enabled'),
        'live_mode': document.viewType == 'home',
        'editView': isEditView
      };

      if (this.walkthrough.get('next_section') && this.walkthrough.get('next_section').slug) {
        template_vars['next_section'] = this.walkthrough.get('next_section');
      }

      template_vars['show_notes_edit'] = document.viewType == 'edit' && this.walkthrough.get('can_edit');
      this.$el.html(this.template(template_vars)); // Update the avg-ratings of the demo.

      this.updateDemoRatings(this.walkthrough.get('average_rating'));
      Common.transition('next');
      this.loadPlayList();

      let hasPdf = _.some(this.walkthrough.attributes.slides, function (slide) {
        return slide.primary_resource.type === "pdf";
      });

      if (hasPdf) this.pdfviewer = new PdfView();
      this.slide_views = new Array(); // let {section, product, walkthrough} = template_vars;

      _.each(this.walkthrough.get('slides'), this.addSlide, this);

      this.slide_views[Common.CURRENT_SLIDE - 1] && this.slide_views[Common.CURRENT_SLIDE - 1].setSlideNotes();
      this.progress = this.getDemoProgress();
      if (this.progress == 0) Common.triggerGAevent('Player', 'Topic Start');
      var current_slide = Common.CURRENT_SLIDE;
      this.initializeSudoSlider(current_slide);
      this.setPWTmenuArea();
      Common.checkSlideAndLogActivity(this);
      this.updateSlideCount();

      if (this.slide_views && this.slide_views.length) {
        var cover_image;
        var first_slide = this.slide_views[0].slide;

        if (first_slide) {
          if (first_slide.primary_resource && first_slide.primary_resource.type == 'image') {
            cover_image = first_slide.primary_resource.path;
          } else if (first_slide.secondary_resource && first_slide.secondary_resource.type == 'image') {
            cover_image = first_slide.secondary_resource.path;
          }
        }

        var seoTitle = `${this.walkthrough.get('name')} | ${this.section.get('name')} | ${this.section.get('tenant').name}`;
        utils.setSEOData(seoTitle, window.location.href, first_slide.text, cover_image);
      } // App Analytics tracking


      this.trackVisit();
      Common.logVisitActivity(this.product_id, this.section_id, this.walkthrough_id);
      navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? this.$('.full-screen-opener').hide() : 0;
      jcf.replaceAll();
      this.setPlayerArea();
      this.slide_views[Common.CURRENT_SLIDE - 1] && this.slide_views[Common.CURRENT_SLIDE - 1].setSlideArea();
      this.adjustNavPosition(); //preventing tab on these tags

      this.$('video, iframe').attr('tabindex', '-1'); // detect safari browser and hide copy url option

      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        this.$('li.copyurl').hide();
      } // showHide Player Title on scroll


      this.$('.player_wrap').on('scroll', function () {
        var scrollTop = $(this).scrollTop();
        var minHeight = 10;
        scrollTop && scrollTop > minHeight ? $(this).addClass('hideTitle') : $(this).removeClass('hideTitle');
      });

      if (this.isInFullscreen()) {
        this.prepareFullscreen();
      }

      this.loadScripts();
      Backbone.trigger("player_view_rendered", this);

      if (!document.isUserAnonymous) {
        Backbone.trigger("load_comments");
      }

      Backbone.trigger("slide_changed");
    },
    loadPlayList: function () {
      var root = this;
      var walkthroughs = [];
      var playlists = this.section.get('playlists');

      _.some(this.section.get('playlists'), function (playlist) {
        return _.some(playlist.walkthroughs, function (demo) {
          if (demo.slug == root.walkthrough_id) {
            walkthroughs = playlist.walkthroughs;
            return true;
          }
        });
      });

      if (document.viewType == 'edit') {
        var enabled_playlists = [];

        _.each(this.section.get('playlists'), function (playlist) {
          if (playlist.is_enabled) {
            var new_playlist = new Object();
            var prop;

            for (prop in playlist) {
              new_playlist[prop] = playlist[prop];
            }

            new_playlist.walkthroughs = playlist.walkthroughs;
            enabled_playlists.push(new_playlist);
          }
        });

        playlists = enabled_playlists;
      }

      var template_vars = {
        'playlists': playlists
      };
      this.$('.walkthrough-lists').html(this.playlisttemplate(template_vars));
      document.querySelector(".pwt-list li[slug='" + this.walkthrough_id + "']").classList.add('active');
    },
    addSlide: function (data) {
      let {
        walkthrough,
        tenant
      } = this;
      data.tenant = tenant;
      data.product = {
        name: walkthrough.attributes.product.name,
        slug: walkthrough.attributes.product.slug
      };
      data.section = {
        name: walkthrough.attributes.section.name,
        slug: walkthrough.attributes.section.slug
      };
      data.walkthrough = {
        name: walkthrough.attributes.name,
        slug: walkthrough.attributes.slug
      };
      var view = new SlideView({
        data: data
      });
      this.slide_views.push(view);
      this.$('.player_slider #sdemos-player-box').append(view.el);
    },
    initializeSudoSlider: function (current_slide) {
      var root = this;
      this.sudoSlider = this.$(".player_slider").sudoSlider({
        startSlide: current_slide,
        prevNext: false,
        responsive: true,
        speed: Common.SLIDE_TRANSITION_SPEED,
        effect: Common.SLIDE_TRANSITION_EFFECT,
        customLink: 'div.customLink',
        initCallback: function () {
          var actualCurSlide = Common.CURRENT_SLIDE;
          Common.CURRENT_SLIDE = root.sudoSlider.getValue('currentSlide');
          var total_slides = root.$(".player_slider ul li").length;
          root.toggleNavigationArrows();
          if (!root.slide_views.length) return;
          root.loadSlideAssets(Common.CURRENT_SLIDE);
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].flashHotspot();
          root.checkSlideVideo();
          root.checkImageAudioAndPlay(actualCurSlide);
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].addSandboxLoader(root);
        },
        beforeAnimation: function (next_slide_number) {
          if (!root.slide_views.length) return;
          Common.CURRENT_SLIDE = next_slide_number;
          root.loadSlideAssets(Common.CURRENT_SLIDE);
          root.$('div.qtip:visible').qtip('hide');
          root.mediaPause();
          Backbone.trigger("before_slide_change");
          root.slide_views[Common.CURRENT_SLIDE - 1].hideHotspot();
          root.slide_views[Common.CURRENT_SLIDE - 1].animateGif();
          $(root.slide_views[Common.CURRENT_SLIDE - 1].el).find('.delay-hotspot').hide();
        },
        afterAnimation: function () {
          var total_slides = root.$(".player_slider ul li").length;
          root.toggleNavigationArrows();
          root.navigate_slide = true;
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].setSlideNotes();
          root.checkSlideVideo();
          root.checkImageAudioAndPlay();
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].flashHotspot();
          root.updateSlideCount();
          Backbone.trigger("slide_changed");
          root.adjustNavPosition();
          root.hideEmbedURLBox();
          setTimeout(function () {
            root.alignFullScreenImageToCenter();
          }, 600);
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].addSandboxLoader(root);
          Common.checkSlideAndLogActivity(root);
          $(root.slide_views[Common.CURRENT_SLIDE - 1].el).find('.delay-hotspot').show();
          jcf.replaceAll();
        }
      });
    },
    adjustNavPosition: function () {
      var windowWidth = $(window).width();
      var playerWidth = this.$('.player_wrapper').outerWidth();

      if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('language-active')) {
        playerWidth = playerWidth + 400;
      }

      if (playerWidth < windowWidth) {
        var abc = windowWidth - playerWidth;
        if (abc < 20) this.$('.dt-btn-next').css("margin-right", abc);
      } else {
        this.$('.dt-btn-next').css("margin-right", "0px");
      }
    },
    loadSlideAssets: function (current_slide) {
      this.$('#player-container').removeClass('comments-active language-active'); // Disable notes if the slide is 'TextEditor'.

      var current_slide_index = current_slide - 1;
      var cur_slide = this.slide_views[current_slide_index] && this.slide_views[current_slide_index].slide;
      var currentPrimaryResource = cur_slide.primary_resource;
      var jsonObj = {};
      this.showOrHideNotes();
      this.slide_views[current_slide_index].loadAsset(); // Get previous slide

      var prev_slide_index = current_slide_index - 1;

      if (prev_slide_index > 0) {
        this.slide_views[prev_slide_index].loadAsset();
      } // Get next slide


      var next_slide_index = current_slide_index + 1;

      if (this.slide_views && next_slide_index <= this.slide_views.length - 1) {
        this.slide_views[next_slide_index].loadAsset();
      }
    },
    //Key Navigation handler
    keyDownHandler: function (e) {
      var root = e.data.root;
      var resource = root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].slide.primary_resource;
      var sandbox = root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].sandbox;

      if (Common.KEY_NAVIGATION) {
        if (e.ctrlKey) {
          if (resource && resource.type == "sandbox") {
            if (e.keyCode == Common.LETTER_Y) {
              root.toggleSandboxHotspot();
            } else if (e.keyCode == Common.LETTER_I && sandbox.has_images && sandbox.navigate) {
              root.showSandboxBookmarks();
            }
          }
        }

        if (e.which == Common.ARROW_RIGHT) {
          root.gotoNextSlide(e);
        } else if (e.which == Common.ARROW_LEFT) {
          root.gotoPrevSlide(e);
        } else if (e.which == Common.SPACEBAR) {
          // disable slide navigation on last/lead submit slide
          if (Common.CURRENT_SLIDE != root.$(".source-area ul li.slide").length && !$("#edit_container").length) {
            root.gotoNextSlide(e);
          }
        } else if (Common.SHOW_HOTSPOT) {
          root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].triggerHotspot(e);
        }
      }

      ;
    },
    // on window resize functions
    onWindowResize: function (e) {
      var root = e.data.root;

      if (root.isInFullscreen()) {
        if (!this.$('#player-container').hasClass('fullscreen-active')) {
          root.prepareFullscreen();
        }
      } else if (this.$('#player-container').hasClass('fullscreen-active')) {
        root.returnFromFullscreen();
      }

      root.setPWTmenuArea();
      root.setPlayerArea();
      root.slide_views[Common.CURRENT_SLIDE - 1] && root.slide_views[Common.CURRENT_SLIDE - 1].setSlideArea();
    },
    toggleNavigationArrows: function () {
      // allow navigation for author 
      if (this.slide_views && $('#edit_container').length > 0) {
        this.$(".customLink[target]").removeClass('disabled');
        return;
      }

      this.$(".customLink[target]").removeClass('disabled').addClass('disabled');

      if (this.slide_views && this.slide_views.length) {
        if (this.$('#player-container').hasClass('cta-active')) {
          this.$(".customLink[target=next]").addClass('disabled');
          this.$(".customLink[target=prev]").removeClass('disabled');
        } else if (Common.CURRENT_SLIDE == 1) {
          this.$(".customLink[target=next]").removeClass('disabled');

          if (this.section.get('tenant') && this.section.get('tenant').chapter_autoflow || this.slide_views[Common.CURRENT_SLIDE - 1].slide.primary_resource.type === 'sandbox') {
            this.$(".customLink[target=prev]").removeClass('disabled');
          } else {
            this.$(".customLink[target=prev]").addClass('disabled');
          }
        } else {
          this.$(".customLink[target]").removeClass('disabled');
        }
      }
    },
    gotoNextSlide: function (event) {
      if ($(event.currentTarget).hasClass('disabled')) return;
      var resource = this.slide_views[Common.CURRENT_SLIDE - 1] && this.slide_views[Common.CURRENT_SLIDE - 1].slide.primary_resource;
      /* navigation for sandbox slide */

      if (resource.type == 'sandbox' && this.slide_views[Common.CURRENT_SLIDE - 1].checkAndNavigateSandboxFrame('next')) return;
      var length = this.$(".source-area ul li.slide").length;
      var complete = parseInt(Common.CURRENT_SLIDE / length);
      var next_slide_idx = parseInt(Common.CURRENT_SLIDE) + 1;
      this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;

      if (complete && this.navigate_slide) {
        this.mediaPause();

        if (document.viewType == 'edit' || this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('next_walkthrough')) {
          return Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('next_walkthrough').slug);
        }

        if (!$('#edit_container').length) {
          this.$('#player-container').addClass('cta-active');
          this.showOrHideNotes();
          Backbone.trigger("cta_toggled");
        }

        ;

        if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('comments-active') || this.$('#player-container').hasClass('language-active')) {
          this.$('#player-container').removeClass('notes-active comments-active language-active');
          this.resetPlayerWidth(this.$('.notes'));
        }

        this.$(".slidesContainer").css("z-index", "-1");
        var cta_list = this.section.get('cta_list');
        if (!this.endOfSlide) Common.postLogActivity(this, Common.CURRENT_SLIDE);

        if (this.user_details_saved || !cta_list.length || document.isOffline) {
          this.showThankyou();
          this.endOfSlide = true;
        } else if (cta_list.length) {
          this.$('.signup-box').hide();
          this.endOfSlide = true;
        }

        this.toggleNavigationArrows();
      } else if (this.slide_views && this.navigate_slide && next_slide_idx <= this.slide_views.length) {
        this.navigate_slide = false;
        this.$(".overlay").removeAttr('style');
        this.$(".slidesContainer").css("z-index", "0");
        this.toggleNavigationArrows();
        Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, next_slide_idx);
      }

      ;
    },
    gotoPrevSlide: function (event) {
      if ($(event.currentTarget).hasClass('disabled')) return;
      var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];
      /* navigation for sandbox slide */

      if (!this.$('#player-container').hasClass('cta-active') && current_slide.slide.primary_resource.type == 'sandbox' && current_slide.checkAndNavigateSandboxFrame('prev')) return;
      this.lastLoadedSlideIndex = Common.CURRENT_SLIDE;

      if (Common.CURRENT_SLIDE - 1 && !this.$(".cta-active .info-cta:visible").length && this.navigate_slide) {
        this.navigate_slide = false;
        var prev_slide_idx = Common.CURRENT_SLIDE - 1 || 1;
        this.endOfSlide = false;
        Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, prev_slide_idx);
      } else if (document.viewType == 'edit' || this.section.get('tenant') && this.section.get('tenant').chapter_autoflow && this.walkthrough.get('prev_walkthrough')) {
        return Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough.get('prev_walkthrough').slug, this.walkthrough.get('prev_walkthrough').slide_index);
      } // This block is only triggered when coming back from Thank-you page.


      if (this.$('#player-container').hasClass('cta-active')) {
        this.$('#player-container').removeClass('cta-active');
        this.showOrHideNotes();
        Backbone.trigger("cta_toggled");
      }

      ;
      this.toggleNavigationArrows();
    },
    moveToSlide: function (slide_index) {
      this.toggleNavigationArrows();
      var slide_index = parseInt(slide_index);
      Common.CURRENT_SLIDE = slide_index || 1;
      this.sudoSlider && this.sudoSlider.goToSlide(Common.CURRENT_SLIDE);
      this.$('#player-container').removeClass('cta-active');
    },
    scrollSlide: function (event, slide_index) {
      var slide_number;

      if (slide_index == 'next') {
        return this.gotoNextSlide(event);
      } else if (slide_index == 'prev') {
        return this.gotoPrevSlide(event);
      } else if (slide_index == 'first') {
        slide_number = 1;
      } else if (slide_index == 'last') {
        slide_number = this.$(".source-area ul li.slide").length;
      } else {
        slide_number = parseInt(slide_index) || 1;
      }

      Common.CURRENT_SLIDE = slide_number;
      Common.loadWalkthrough(this.product_id, this.section_id, this.walkthrough_id, slide_number);
    },
    replayWalkthrough: function (e) {
      this.scrollSlide(e, 1);
    },
    mediaPause: function () {
      var current_slide = this.slide_views[this.lastLoadedSlideIndex - 1];

      if (current_slide && current_slide.slide.primary_resource.type == 'wistia' && typeof Wistia != 'undefined') {
        let wistiaVideos = Wistia.api.all();

        _.each(wistiaVideos, (vid, idx) => {
          vid.pause();
        });
      } else {
        var media = $('video, audio');

        for (var i = 0; i < media.length; i++) {
          if (!media[i].paused && !media[i].ended) {
            media[i].pause();

            if (media[i].tagName == 'AUDIO') {
              this.$('.audio-control').removeClass("pause").addClass("play");
            }
          }

          ;
        }
      }

      let command;
      const slideType = $(current_slide.el).find('iframe').attr('embedType');
      const iframePlayer = $(current_slide.el).find('iframe')[0];

      if (slideType == "vimeo") {
        command = {
          "method": "pause",
          "value": "true"
        };
      } else if (slideType == "youtube") {
        command = {
          "event": "command",
          "func": "pauseVideo"
        };
      }

      if (slideType && command && iframePlayer != undefined) {
        //post our command to the iframe.
        iframePlayer.contentWindow.postMessage(JSON.stringify(command), "*");
      }
    },
    updateSlideCount: function () {
      var current_slide = Common.CURRENT_SLIDE;

      if (this.slide_views && this.slide_views.length) {
        var total_slides = this.slide_views.length;
        var width = current_slide / total_slides * 100;
        this.$(".progress-line div").css("width", width + "%");
      }
    },
    setPWTmenuArea: function () {
      var menuBlock = this.$('.side-info .frame');
      var bottom_height = this.$(".side-info .bottom").outerHeight();

      if ($('#edit_container').length) {
        bottom_height += 46;
      }

      ;
      $(menuBlock).css({
        "top": '80px',
        "bottom": bottom_height
      });
      Backbone.trigger("player_menu_height_set");
    },
    setPlayerArea: function () {
      let playerWidth = this.$('.player_wrapper').width(),
          playerHeight = this.$('.player_wrapper').height();
      this.$('.wistia-player-block iframe').attr({
        'width': '100%',
        'height': '100%'
      });

      if ($(window).width() > 991) {
        this.$(`.slides-Container[slide-type="audio"], 
                        .slides-Container[slide-type="embed"], 
                        .slides-Container[slide-type="link"], 
                        .wistia-player-block iframe`).css({
          'min-height': playerHeight
        });
        this.$('.slides-Container[slide-type="iframe"], .slides-Container[slide-type="html5"]').css({
          'height': playerHeight
        }); // setting min full screen height to content slide

        this.$('.slides-Container .content-slide-wrap').css({
          'min-height': playerHeight - 20
        }); // setting min height for content 

        let footerHeight = this.$('.slides-Container .content-slide-wrap .content-footer').height();
        this.$('.slides-Container .content-slide-wrap .content-slide').css({
          'min-height': playerHeight - (footerHeight + 40 + 50)
        });
        this.$('.slides-Container[slide-type="video"] .slideArea video').css({
          'height': playerHeight
        });

        if (playerWidth > playerHeight) {
          this.$('#slider .slide').css({
            'min-height': playerHeight
          });
        } else {
          this.$('#slider .slide').css({
            'min-height': playerWidth * 9 / 16
          });
        }
      } else {
        this.$(`.slides-Container[slide-type="audio"], 
                        .slides-Container[slide-type="embed"], 
                        .slides-Container[slide-type="link"], 
                        .wistia-player-block iframe`).css({
          'min-height': playerWidth * 9 / 16
        });
        this.$('#slider .slide').css({
          'min-height': playerWidth * 9 / 16
        });
        this.$('.slides-Container[slide-type="iframe"]').css({
          'height': playerWidth * 9 / 16
        });
      }
    },
    //side controll pannel functions
    toggleSideMenu: function () {
      this.$('#player-container').toggleClass('side-info-active');
      this.$('.content-avg-rating').toggle('hide');
      Backbone.trigger("side_info_opened");
    },
    showOrHideNotes: function (jsonObj) {
      var playerContainer = this.$('#player-container');
      playerContainer.removeClass('comments-active language-active sandbox-bookmarks-active mobile-social-active share-active');
      var isFullscreen = this.isInFullscreen() ? true : false;
      var isCTAopen = this.$('#player-container').hasClass('cta-active') ? true : false;
      var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];

      if (jsonObj && jsonObj.action == 'toggle') {
        if (this.$('.notes-opener').hasClass('disabled')) return;
        playerContainer.toggleClass('notes-active');

        if (jsonObj.event && jsonObj.event.type == 'click') {
          Common.USER_SHOW_NOTES = !Common.USER_SHOW_NOTES;
        }
      } else if (current_slide.slide.primary_resource.type == "content" || isFullscreen || isCTAopen) {
        playerContainer.removeClass('notes-active');
      } else if (Common.USER_SHOW_NOTES) {
        playerContainer.addClass('notes-active');
      }

      ;

      if (current_slide.slide.primary_resource.type == "sandbox") {
        this.$('.sb-bookmark-item, .sandbox-help').addClass('active');
      } else {
        playerContainer.removeClass('sandbox-bookmarks-active');
        this.$('.sb-bookmark-item, .sandbox-help').removeClass('active');
      }

      ;
      current_slide.slide.primary_resource.type == "content" || isCTAopen ? this.$('.notes-opener').addClass('disabled') : this.$('.notes-opener').removeClass('disabled');
      this.resetPlayerWidth(this.$('.notes'));
      this.adjustSudoSlider();
    },
    toggleCommentsBlock: function () {
      if (this.$('.comments-opener').hasClass('disabled')) return;
      this.$('#player-container').removeClass('notes-active language-active sandbox-bookmarks-active');
      this.$('#player-container').toggleClass('comments-active');
      this.resetPlayerWidth(this.$('.comments'));
    },
    toggleLanguage: function () {
      if (this.$('.language-opener').hasClass('disabled')) return;
      this.$('#player-container').removeClass('notes-active comments-active sandbox-bookmarks-active mobile-social-active share-active');
      this.$('#player-container').toggleClass('language-active');
      this.resetPlayerWidth(this.$('.language'));
      this.adjustSudoSlider();
    },
    showShareOptions: function () {
      this.$('#player-container').addClass('share-active');
      this.$('.share-popup-wrap').addClass('jcf-scrollable');
      this.$('#social-share-options').addClass('popup-in');
      setTimeout(function () {
        jcf.replaceAll();
      }, 500);
    },
    closeShareOption: function () {
      this.$('#social-share-options').removeClass('popup-in').addClass('popup-out');
      var root = this;
      setTimeout(function () {
        root.$('#player-container').removeClass('share-active');
        root.$('.share-popup-wrap').removeClass('jcf-scrollable');
      }, 500);
    },
    toggleSandboxHotspot: function (e) {
      var sandboxPlayer = this.slide_views[Common.CURRENT_SLIDE - 1].$('.sandbox-player');
      sandboxPlayer.attr('hotspot-status') == "show" ? sandboxPlayer.attr('hotspot-status', 'hide') : sandboxPlayer.attr('hotspot-status', 'show');
    },
    showSandboxBookmarks: function () {
      if (this.$('.bookmark-opener').hasClass('disabled')) return;
      var root = this;
      this.$('.sandbox-bookmarks .bookmarks-wrap').empty();
      this.slide_views[Common.CURRENT_SLIDE - 1].renderBookmarks();
      this.$('#player-container').removeClass('notes-active language-active').toggleClass('sandbox-bookmarks-active');
      this.resetPlayerWidth(root.$('.sandbox-bookmarks'));
      setTimeout(function () {
        jcf.replaceAll();
      }, 500);
    },
    jumpToSandboxSection: function (e) {
      var frameNo = parseInt($(e.currentTarget).attr('bookmark-index'));
      this.slide_views[Common.CURRENT_SLIDE - 1].loadFrame(frameNo, 'from_bookmark');
      this.slide_views[Common.CURRENT_SLIDE - 1].gotoFrame(frameNo);
      this.slide_views[Common.CURRENT_SLIDE - 1].setSandboxNotes();
    },
    changeLanguage: function (event) {
      var val = $(event.currentTarget).attr('lvalue');
      var ck_name = 'user_locale';

      if (document.requestParameters) {
        ck_name = 'author_locale';
      }

      if (val != SDCookies.getItem(ck_name)) {
        Common.changeLanguage(event);
      }
    },
    resetPlayerWidth: function (sideWrap, callFromTextEdit) {
      var root = this;

      if (this.$('#player-container').hasClass('notes-active') || this.$('#player-container').hasClass('comments-active') || this.$('#player-container').hasClass('language-active') || this.$('#player-container').hasClass('sandbox-bookmarks-active')) {
        var windowWidth = parseInt($(window).width());
        var playerWidth = windowWidth - 400;

        if (windowWidth > 991) {
          if (playerWidth > 0) {
            this.$('#player').animate({
              'width': playerWidth
            }, function () {
              root.$('#player').css({
                width: 'calc(100% - 400px)'
              });
            });
            var slide_width = playerWidth - 146;
            this.$('.slidesContainer .slide:nth-child(' + Common.CURRENT_SLIDE + ')').animate({
              "width": slide_width
            }, function () {
              root.slide_views[Common.CURRENT_SLIDE - 1].setSlideArea();
            });
          }
        }

        ;
      } else {
        var windowWidth = parseInt($(window).width());

        if (windowWidth > 991) {
          setTimeout(function () {
            var playerWidth = windowWidth;
            this.$('#player').animate({
              'width': playerWidth
            }, function () {
              root.$('#player').css({
                width: '100%'
              });
            });
            var slide_width = this.$('#player-container').hasClass('fullscreen-active') ? playerWidth - 127 : playerWidth - 146;
            this.$('.slidesContainer .slide:nth-child(' + Common.CURRENT_SLIDE + ')').animate({
              "width": slide_width
            }, function () {
              root.slide_views[Common.CURRENT_SLIDE - 1].setSlideArea();
            });
          }, 200);
        }
      }

      if (sideWrap.hasClass('notes')) {
        document.NOTES_RESET_PLAYER_WIDTH = true;
      } else {
        document.NOTES_RESET_PLAYER_WIDTH = false;
      }

      document.RESET_PLAYER_WIDTH = callFromTextEdit || false;
    },
    // adjust sudolider when som width changes
    adjustSudoSlider: function () {
      var root = this;
      setTimeout(function () {
        root.sudoSlider.adjust();
      }, 1000);
    },
    backToPlaylist: function (event) {
      Backbone.trigger("back_to_playlist");
      var sectionUrl = `#!/${this.product_id}`;

      if (this.product_id != this.section_id) {
        sectionUrl = `${sectionUrl}/${this.section_id}`;
      }

      Backbone.history.navigate(sectionUrl, {
        trigger: true
      });
    },
    loadNextSection: function (event) {
      this.$('#player-container').removeClass('side-info-active');
      Common.triggerGAevent('Menu', 'next section');
      var next_section = $(event.currentTarget).attr('section');

      if (this.walkthrough.get('next_section') && this.walkthrough.get('next_section').slug) {
        var section_url = '#!/' + this.product_id + '/' + next_section;
      }

      Backbone.history.navigate(section_url, {
        trigger: true
      });
    },
    // side controll pannel functions
    //fullscreen related fnctions
    toggleFullScreen: function () {
      if (!this.isInFullscreen()) {
        this.requestFullscreen();
        this.prepareFullscreen();
        Common.triggerGAevent('Player', 'Fullscreen');
      } else {
        this.exitFullscreen();
        this.returnFromFullscreen();
      }
    },
    isInFullscreen: function () {
      return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    },
    requestFullscreen: function () {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    },
    exitFullscreen: function () {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    prepareFullscreen: function () {
      var root = this;
      this.$('#player-container').addClass('fullscreen-active');
      setTimeout(function () {
        root.showOrHideNotes();
        root.adjustSudoSlider();
        root.alignFullScreenImageToCenter();
      }, 600);
    },
    returnFromFullscreen: function () {
      var current_slide = this.slide_views[Common.CURRENT_SLIDE - 1];
      this.$('#player-container').removeClass('fullscreen-active');

      if (this.$('#player-container').hasClass('cta-active')) {
        this.showOrHideNotes();
        return;
      }

      if (current_slide && current_slide.slide && current_slide.slide.primary_resource && $.inArray(current_slide.slide.primary_resource.type, ['content', 'iframe', 'html5']) == -1) {
        this.showOrHideNotes();
      }

      this.adjustSudoSlider();
      this.$('.slides-Container').removeClass('v-align');
    },
    // end of full screen functions
    // CTA page functions
    showSignup: function (event) {
      let cta_id = this.$(event.currentTarget).data('cta-id');
      let cta = new Cta({
        id: cta_id
      });
      let root = this;
      $.when(cta.fetch()).done(function () {
        let args = cta.attributes;
        args['product'] = root.product_id;
        args['section'] = root.section_id;
        args['chapter'] = root.walkthrough_id;
        root.$("#player-container .sign-up-wrap").html(CTAForm(args));
        root.$('#player-container').addClass('form-cta-active');
        setTimeout(function () {
          root.$('.form-cta').addClass('active');
          root.$(".sign-box ").addClass("bounceInDown");
          setTimeout(function () {
            root.$(".sign-box ").removeClass("bounceInDown");
          }, 500);
        }, 300);
      });
    },
    closeSignUp: function () {
      this.$(".sign-box").addClass("bounceOutUp");
      this.$('#player-container').removeClass('form-cta-active');
      setTimeout(function () {
        this.$('.form-cta').removeClass('active');
        this.$(".sign-box ").removeClass("bounceOutUp");
        this.$('.error-message').hide();
      }, 300);
    },
    checkInput: function (event) {
      if (!this.$(event.currentTarget).val().trim()) {
        this.$(event.currentTarget).siblings('.error-message').show();
      } else {
        this.$(event.currentTarget).siblings('.error-message').hide();
      }

      ;
    },
    submitUserDetails: function (event) {
      event.preventDefault();
      var root = this;
      root.$('.error-message').hide();
      var validated = true;

      _.each(this.$('form[name=lead] input[type=text]'), function (elem, index) {
        if (validated && !$(elem).val().trim()) {
          validated = false;
          root.$(elem).siblings('.error-message').show();
        }
      });

      if (!validated) return false;
      root.$('.form-sending').addClass("slide-in is-submitted");
      setTimeout(function () {
        root.$('form[name=lead] input[type=submit]').attr('disabled', 'disabled');
        var user_data = {};

        _.each(root.$('form').serializeArray(), function (field) {
          user_data[field.name] = field.value;
        });

        root.user_details = new UserDetails(user_data);
        root.user_details.save().done(function () {
          root.$('.form-sending').removeClass("slide-in is-submitted");
          root.$('.form-sent').addClass("slide-in");
          setTimeout(function () {
            root.$('.form-sent').removeClass("slide-in");
            root.closeSignUp();
            root.showThankyou();
          }, 3000);
          root.user_details_saved = true;
        }).error(function () {
          root.$('.form-sending').removeClass("slide-in is-submitted");
          root.$('.form-failed').addClass("slide-in");
          setTimeout(function () {
            root.$('.form-failed').removeClass("slide-in");
          }, 3000);
        }).always(function () {
          root.$('form[name=lead] input[type=submit]').removeAttr('disabled');
        });
      }, 3000);
    },
    getDemoProgress: function () {
      var slides_visited = _.reject(this.slide_views, function (slide) {
        return !slide.user_visited;
      });

      return Math.round((slides_visited.length || 0) / (this.slide_views.length || 1) * 100);
    },
    showThankyou: function () {
      this.$('.signup-block').hide();
      this.$('.thanku-block').show();
    },
    openWalkthrough: function (event) {
      if (this.$(event.target).hasClass('tags-span')) return;
      var walkthrough_id = $(event.currentTarget).attr('slug');
      Common.loadWalkthrough(this.product_id, this.section_id, walkthrough_id);
    },
    openWalkthroughMobile: function (event) {
      if ($(window).width() < 991) {
        if (this.$(event.target).hasClass('tags-span')) return;
        var walkthrough_id = this.$(event.currentTarget).siblings('.explore-btn').attr('slug');
        Common.loadWalkthrough(this.product_id, this.section_id, walkthrough_id);
      }
    },
    // End of CTA page functions
    checkSlideVideo: function () {
      if (this.$('#slider' + Common.CURRENT_SLIDE).attr('slide-type') == "video") {
        this.$('#slider' + Common.CURRENT_SLIDE + ' video').attr('controls', 'controls');
      } else {
        this.$('.slideArea video').removeAttr('controls');
      }

      ;
    },
    checkImageAudioAndPlay: function (actualCurSlide) {
      var cur_slide = actualCurSlide ? actualCurSlide : Common.CURRENT_SLIDE;
      var current_slide = this.$('#slider' + cur_slide);

      if (current_slide.parent().children().hasClass('image_with_audio') && !current_slide.parent().find('.audio-control').hasClass('autoplayed')) {
        this.slide_views[cur_slide - 1].playAudio();
      }
    },
    //general functions
    trackVisit: function () {
      var current_section = {
        'name': this.walkthrough.get('name'),
        'slug': this.walkthrough.get('slug'),
        'description': this.walkthrough.get('description') || Common.LOREM_IPSUM
      };
      Common.setVisit(current_section);
    },
    whenAll: function (objects, event, callback, context) {
      var callbackWrapper = _.after(objects.length, callback);

      context = context || this;

      _.each(objects, function (obj) {
        obj.once(event, callbackWrapper, context);
      });
    },
    toggleDropPin: function (event) {
      var currentSlide = this.$("#slider" + Common.CURRENT_SLIDE);

      if (this.$(event.currentTarget).parent().hasClass('pin-active')) {
        this.$(event.currentTarget).parent().removeClass('pin-active').addClass('anim-end');
      } else {
        if (document.viewType != 'edit' && this.$(event.currentTarget).parent().find('h1').text() == "" && this.$(event.currentTarget).parent().find('p').text() == "") {
          return;
        }

        ;
        this.$(currentSlide).find('.drop_pin.pin-active').removeClass('pin-active').addClass('anim-end');
        this.$(event.currentTarget).parent().removeClass('anim-end').addClass('pin-active visited');
        Common.positionPinTooltip(event.currentTarget, currentSlide);
      }

      ;
    },
    unload: function () {
      $(window).off('resize', this.onWindowResize);
      $(window).off('keydown', this.keyDownHandler);
      utils.removeSEOData();
      this.undelegateEvents();
      $('#product_analytics').html('');
      setTimeout(function () {
        $('body').removeClass('player-loaded');
      }, 1000);
    },
    trackCTAAnalytics: function (e) {
      Common.trackCTAAnalytics(e.currentTarget.dataset.ctaId, this.product_id, this.section_id, this.walkthrough_id);
    },
    shareLink: function (event) {
      let socialShare = $(event.currentTarget).attr('social-share'),
          url = encodeURIComponent(window.location.href),
          title = encodeURIComponent($('meta[property="og:title"]').attr("content")),
          summary = encodeURIComponent($('meta[property="og:description"]').attr("content")),
          getScreenWidth = window.outerWidth,
          width = 575,
          height = 400,
          left = (getScreenWidth - width) / 2,
          options = `width=${width},height=${height},top=${top},left=${left}`;
      let data = {
        'chapter_slug': this.walkthrough_id,
        'section_slug': this.section_id,
        'product_slug': this.product_id,
        'media_type': socialShare
      };
      let social_share = new SocialShare(data);
      social_share.save();

      if (socialShare == "twitter") {
        window.open(`http://twitter.com/share?text=${title}&url=${url}`, 'twitter_share', `status=1,${options}`);
      } else if (socialShare == 'linkedin') {
        window.open(`http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`, '', options);
      } else if (socialShare == 'facebook') {
        window.open(`http://www.facebook.com/sharer/sharer.php?&u=${url}&title=${title}`, 'facebook_share', options);
      } else if (socialShare == 'reddit') {
        window.open(`http://www.reddit.com/submit?url=${url}&title=${title}`, 'reddit_share', options);
      } else if (socialShare == 'copyurl') {
        if ($('.copyurl').hasClass('active')) return;
        $('.copyurl').addClass('active');
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val(window.location.href).select();
        document.execCommand("copy");
        $temp.remove();
        this.$('.copyurl .title').text('URL Copied!');
        setTimeout(function () {
          this.$('.copyurl .title').text('Share with URL');
          $('.copyurl').removeClass('active');
        }, 1000);
      } else if (socialShare == 'copyembedurl') {
        if ($(".embed-url-box .embedURL").has('input').length) {
          this.showEmbedURLBox();
          return;
        }

        var demoPath = this.section_id + '/' + this.walkthrough_id;

        if (this.section_id != this.product_id) {
          demoPath = this.product_id + '/' + demoPath;
        }

        var embedUrl = '<iframe width="900" height="600" src="' + window.location.origin + '/embed/' + demoPath + '" frameborder="0" allowfullscreen  style="border: 1px solid #e7ecf2;"></iframe>';
        this.$(".embed-url-box .embedURL").append($('<input>', {
          type: 'text',
          val: embedUrl
        }));
        this.showEmbedURLBox();
      }
    },
    hideEmbedURLBox: function () {
      this.$(".embed-url-box").slideUp();
    },
    showEmbedURLBox: function () {
      this.$(".embed-url-box").slideDown();
      this.$(".embed-url-box .embedURL input").select();
    },
    alignFullScreenImageToCenter: function () {
      // set v-align centre for fullscren
      if ($('#player-container').hasClass('fullscreen-active')) {
        var slide_height = this.$('#slider' + Common.CURRENT_SLIDE).height();
        var image_height = this.$('#player').height();
        var getImageType = this.$('#slider' + Common.CURRENT_SLIDE).attr('slide-type');

        if (slide_height < image_height && (getImageType == 'image' || getImageType == 'sandbox')) {
          this.$('#slider' + Common.CURRENT_SLIDE).parent('.slides-Container').addClass('v-align');
        }
      }
    },
    closePopup: function (event) {
      this.$('.skip-sandbox').removeClass('goToPrev');
      var popupName = this.$(event.currentTarget).parents('.popup-box').attr('id');
      this.popupClose(popupName);
    },
    popupShow: function (popupName) {
      this.$(".player-overlay").css({
        "display": "table"
      });
      this.$(".popup-box#" + popupName).show();
      this.$(".popup-box#" + popupName).addClass("bounceInDown");
    },
    popupClose: function (popupName) {
      this.$(".player-overlay #" + popupName).addClass("bounceOutUp");
      setTimeout(function () {
        this.$(".player-overlay .popup-box#" + popupName).hide();
        this.$(".player-overlay .popup-box#" + popupName).removeClass("bounceOutUp");
        this.$(".player-overlay").hide();
      }, 300);
    },
    processLinkedinLogin: function (e) {
      var root = this;
      IN.User.authorize(function () {
        if (root.$(e.currentTarget).attr('data-source') == 'rate' && !document.isUserAnonymous) {
          root.$('#content-rating-login').remove();
          root.loginToRateContent(e);
        }
      });
    },

    /* Messaging */
    loginUser: function (linkedin_data) {
      delete linkedin_data.id;
      linkedin_data.role_id = 5;
      var root = this;
      var user = new LinkedinUser();
      user.save(linkedin_data, {
        success: function (model, response) {
          document.isUserAnonymous = false;

          if (root.tenant.is_messaging_enabled) {
            root.loadComments();
          }

          if (root.tenant.is_rating_enabled && root.RATINGS_CLICKED) {
            root.$('#content-rating-login').remove();
            root.loginToRateContent();
          }
        }
      });
    },
    loadComments: function () {
      this.$('.lin-container-login').remove();
      this.$('.comments-area .comment-list').html(CommentsTemplate({
        'comments': [1]
      }));
      this.$('.comments-area').show();
    },
    postFrameComment: function (event) {
      event.preventDefault();
      var root = this;
      this.$(event.currentTarget).children('input[type=submit]').attr('disabled', 'disabled');
      this.$(event.currentTarget).addClass('posting-comment');
      setTimeout(function () {
        root.$(event.currentTarget).children('textarea').val('');
        root.$(event.currentTarget).removeClass('posting-comment');
        root.$('.no-comments').hide();
      }, 2000);
    },

    /* Content Rating */
    loginToRateContent: function (event) {
      this.RATINGS_CLICKED = true;

      if (document.isUserAnonymous) {
        this.popupShow('content-rating-login');
      } else {
        var rate = new Rating({
          id: this.walkthrough_id
        });
        var root = this;
        rate.fetch({
          data: {
            'current_user_rating': true
          }
        }).done(function (response, message) {
          root.$('#content-rating-stars .stars').attr('data-stars', response);
          root.popupShow('content-rating-stars');
          root.RATINGS_CLICKED = false;
        }).error(function (response, message) {
          if (response.responseJSON == 'UNAUTHORIZED') {
            window.location.reload();
          }
        });
      }
    },
    rateContent: function (event) {
      var elem = this.$(event.currentTarget);
      var rateCount = elem.attr('data-rating');
      elem.parent('.stars').attr('data-stars', rateCount);
    },
    submitContentRating: function (event) {
      var stars_rated = parseInt(this.$('.stars').attr('data-stars'));
      if (stars_rated == 0) return;
      var parentEleme = this.$(event.currentTarget).parents('.popup-footer').find('.rating-submit-status');
      parentEleme.show();
      setTimeout(function () {
        parentEleme.find('.rating-submit-inprogress').addClass('active');
      }, 100);
      var rate = new Rating({
        'slug': this.walkthrough_id,
        'rate_value': stars_rated
      });
      var root = this;
      rate.save({}, {
        success: function (model, response) {
          setTimeout(function () {
            parentEleme.find('.rating-submit-inprogress').removeClass('active');
            parentEleme.find('.rating-submit-success').addClass('active');
            setTimeout(function () {
              // hide popup and remove all extra class
              root.popupClose('content-rating-stars');
              root.$('.rating-submit-status').hide().children('div').removeClass('active');
            }, 2500);
            root.updateDemoRatings(response.avg_ratings);
          }, 1500);
        },
        error: function () {
          parentEleme.find('.rating-submit-inprogress').removeClass('active');
          parentEleme.find('.rating-submit-failed').addClass('active');
          setTimeout(function () {
            root.popupClose('content-rating-stars');
          }, 1500);
        }
      });
    },
    updateDemoRatings: function (avgRatings) {
      var ratingsPercentage = avgRatings / 5 * 85;
      this.$('.content-avg-rating .current-avg-rating').width(ratingsPercentage);
    }
  });
  return PlayerView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/section-list.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/section-list.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-list\\.handlebars$")("./" + document.template_folder + "/section-list.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, SectionListTemplate) {
  'use strict';

  var SectionListView = Backbone.View.extend({
    template: SectionListTemplate,
    events: {
      'click .pwt-box': 'openSection',
      'click .tags-span': function (event) {
        Common.searchTags(event);
      }
    },
    initialize: function (attrs) {
      this.sections = attrs.sections;
      this.product_id = attrs.product_id;
      this.canEdit = attrs.canEdit;
    },
    render: function () {
      var section_list = $.extend(true, {}, this.sections);

      _.each(section_list, function (section) {
        if (['home', 'audience'].indexOf(document.viewType) !== -1 && section.is_enabled == undefined) {
          section.is_enabled = true;
        }

        section.is_visible = !section.is_hidden;

        if (section.linked_asset) {
          section.icon = section.icon || {
            url: Common.SECTION_LINK_TYPE_IMAGE_PATH
          };
        } else {
          section.icon = section.icon || {
            url: Common.SECTION_IMAGE_PATH
          };
        }
      });

      this.$el.html(this.template({
        'sections': section_list,
        'can_edit': this.canEdit,
        'is_author': document.viewType == 'edit'
      })).addClass('sortable row');
      return this;
    },
    openSection: function (event) {
      if (this.$(event.target).hasClass("no-action") || this.$(event.currentTarget).hasClass("disabled") || this.$(event.target).hasClass('tags-span') || this.$(event.currentTarget).children().hasClass('sync-inprogress')) return;
      var section_id = $(event.currentTarget).attr('slug');
      Backbone.history.navigate('#!/' + this.product_id + '/' + section_id, {
        trigger: true
      });
    }
  });
  return SectionListView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/section.js":
/*!******************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/section.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/cta */ "./sharedemos/static/js/tenant/models/cta.js"), __webpack_require__(/*! ../models/section */ "./sharedemos/static/js/tenant/models/section.js"), __webpack_require__(/*! ../models/user-details */ "./sharedemos/static/js/tenant/models/user-details.js"), __webpack_require__(/*! ../views/section-list */ "./sharedemos/static/js/tenant/views/section-list.js"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\.handlebars$")("./" + document.template_folder + "/section.handlebars"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/section\\-playlist\\.handlebars$")("./" + document.template_folder + "/section-playlist.handlebars"), __webpack_require__("./sharedemos/static/js/tenant/templates sync recursive ^\\.\\/.*\\/playlist\\.handlebars$")("./" + document.template_folder + "/playlist.handlebars"), __webpack_require__(/*! ../templates/box/playlist.handlebars */ "./sharedemos/static/js/tenant/templates/box/playlist.handlebars"), __webpack_require__(/*! ../templates/cta_form.handlebars */ "./sharedemos/static/js/tenant/templates/cta_form.handlebars"), __webpack_require__(/*! ../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js"), __webpack_require__(/*! jquery.sudoslider */ "./sharedemos/static/libs/sudo-slider/jquery.sudoSlider.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Cta, Section, UserDetails, SectionListView, SectionTemplate, SectionPlaylistTemplate, PlaylistTemplate, BoxPlaylistTemplate, CTAForm, translate) {
  'use strict';

  var SectionView = Backbone.View.extend({
    el: '#block_container',
    template: SectionTemplate,
    section_playlist_template: SectionPlaylistTemplate,
    playlist_template: PlaylistTemplate,
    box_playlist_list_view_template: BoxPlaylistTemplate,
    events: {
      'blur input': 'checkInput',
      'click .form-footer .cancel': 'cancelSubmit',
      'click .hide-video-popup': 'hideVideos',
      'click .newtemp .viewmore-demos': 'displayMoreDemos',
      'click .playlist-right li .title': 'openWalkthrough',
      'click .playlist-view-opt li': 'switchPlaylistViewInGridTemp',
      'click .readmore-demo-desc': 'toggleDescView',
      'click .related-products-list': 'openRelatedProduct',
      'click .section-pwt-menu': 'openSection',
      'click .sign-up-btn': 'showSignup',
      'click .tags-span': function (event) {
        Common.searchTags(event);
      },
      'click .video-link': 'videoPopup',
      'click .watch-videos': 'displayVideos',
      'click [data-cta-id]': 'trackCTAAnalytics',
      'submit form': 'submitUserDetails'
    },
    initialize: function (attrs) {
      this.load(attrs.section);
      $(window).on('resize', {
        'root': this
      }, this.onWindowResize);
    },
    load: function (section_id, reloadIfProduct) {
      this.product_id = Common.product_details.id;
      this.section_id = section_id;

      if (Common.product_details.id == this.section_id && (reloadIfProduct == undefined || !reloadIfProduct)) {
        this.section = Common.product_details;
        this.loadData();
      } else {
        this.section = new Section({
          id: section_id
        });
        var root = this;
        $.when(this.section.fetch()).done(function (response) {
          if (response.ret_url) {
            let redirect_url = response.ret_url;

            _.extend(response.args, {
              next: window.location.pathname + window.location.hash
            });

            redirect_url += '?' + $.param(response.args);
            window.location.href = window.location.origin + redirect_url;
          } else {
            if (Common.product_details.id == root.section_id) {
              Common.product_details = root.section;
            }

            root.loadData();
          }
        }).fail(function (attrs, textStatus, xhr) {
          if (attrs.status == 302) {
            if (root.product_id != root.section_id) {
              Backbone.history.navigate('#!/' + root.product_id + '/' + attrs.responseJSON, {
                trigger: true
              });
            } else {
              Backbone.history.navigate('#!/' + attrs.responseJSON, {
                trigger: true
              });
            }
          } else {
            Common.modelFetchErrorHandler(attrs, xhr);
          }
        });
      }
    },
    loadData: function () {
      // Check whether the product/section has asset-link,
      if (this.section.get('linked_asset')) {
        var linked_asset = this.section.get('linked_asset');
        var url = window.location.origin + Common.SECTION_ASSET_ROUTE + linked_asset.name;
        if (document.viewType == 'edit') url += '?author=1';
        let newTab = window.open(url, '_blank');

        if (newTab) {
          //Browser has allowed it to be opened.
          newTab.focus();
        } else {
          //Browser has blocked it.
          alert('Please allow popups for this website');
        }

        window.history.back();
        return;
      }

      var last_visit = Common.getLastVisit();

      if (last_visit && last_visit.slug) {
        var current_parent = this.section.get('parent');

        if (!current_parent) {
          Common.resetVisits();
          Common.setVisit({
            'name': 'Home',
            'slug': null
          });
          this.trackVisit();
          return this.render();
        }

        if (!Common.verifyParent(this.product_id, current_parent)) {
          return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
        }
      } else if (!Common.VISIT_STACK.length) {
        return Common.getProductTree(this.product_id, this.section_id, _.bind(this.render, this));
      }

      this.trackVisit();
      this.render();
    },
    render: function () {
      var parent = this.section.get('parent') || {
        'name': 'Home',
        'slug': null
      };

      if (!parent.description) {
        parent.description = Common.LOREM_IPSUM;
      }

      var videos = this.section.get('videos');

      _.each(videos, function (video) {
        if (!video.poster_image) {
          video.poster_image = Common.DEFAULT_VIDEO_POSTER;
          var video_details = Common.getEmbedVideoDetails(video.link);

          if (video_details) {
            video.poster_image = video_details.thumbnail_url;
          }
        }
      });

      var sectionIcon = this.section.get('icon') || {
        url: Common.SECTION_IMAGE_PATH
      };
      let export_pdf_link = `/export-to-pdf/${this.section_id}`;

      if (['edit', 'preview'].indexOf(document.viewType) !== -1) {
        export_pdf_link = `${export_pdf_link}?author=1`;
      } else if (document.viewType == 'audience') {
        export_pdf_link = `${export_pdf_link}?company=${document.company_id}`;
      }

      var isEditView = false;

      if (document.viewType == 'edit') {
        isEditView = true;
      }

      var can_download = this.section.get('tenant') && this.section.get('tenant').can_download && this.section.get('can_download');
      var is_author = document.viewType == 'edit';

      var isBulletinBoardEnabled = _.some(this.section.attributes.tenant.applications, function (app) {
        return app.unique_id.toLowerCase() == 'bulletin_board';
      });

      var template_vars = {
        'name': this.section.get('name'),
        'description': this.section.get('description') || Common.LOREM_IPSUM,
        'icon': sectionIcon,
        'videos': videos,
        'parent': Common.getParent() || parent,
        'product': this.product_id,
        'section': this.section_id,
        'playlists': this.section.get('playlists'),
        'cta_list': this.section.get('cta_list'),
        'export_pdf_link': export_pdf_link,
        'tenant_privacy_link': document.privacy_link,
        'content_exists': true,
        'can_download': can_download,
        'editView': isEditView,
        'is_author': is_author,
        'can_edit': this.section.get('can_edit'),
        'bulletinBoardData': this.section.get('bulletin_board_list'),
        'isBulletinBoardEnabled': isBulletinBoardEnabled,
        'isPrivateTenant': document.isPrivateTenant
      };

      if (this.section.get('playlists') && this.section.get('playlists').length) {
        var enabled_playlists = _.filter(this.section.get('playlists'), function (playlist) {
          if (playlist.is_enabled == true || playlist.is_enabled == undefined) {
            var enabled_demos = _.filter(playlist.walkthroughs, function (wt) {
              if (wt.is_enabled || wt.is_enabled == undefined) return wt;
            });

            if (!isEditView) {
              playlist.walkthroughs = enabled_demos;
            }

            if (enabled_demos.length) return playlist;
          }
        });

        if (!enabled_playlists.length) {
          template_vars['content_exists'] = false;
          template_vars['can_download'] = false;
        }

        template_vars['related_products'] = parent['related_products'] || [];
        this.$el.html(this.section_playlist_template(template_vars));

        if (document.template_folder == 'box') {
          // showHide Player Title on scroll
          var lastScrollTop = 0;
          this.$('.pwt-section').on('scroll', function () {
            var tableOffsetBottom = $('.fs-banner').height();

            if (this.scrollTop > tableOffsetBottom) {
              $(this).addClass('ShowSectionTitle');
            } else {
              $(this).removeClass('ShowSectionTitle');
            }
          });
        }
      } else {
        template_vars['related_products'] = this.section.get('related_products') || [];
        this.$el.html(this.template(template_vars));
      }

      Common.loadLanguages(this.section.get('locales'));
      let playlistView = Common.LOCAL_STORAGE.getItem('playlistView');
      playlistView ? this.listSections(playlistView) : this.listSections('gridView');
      Common.transition();
      var icon = this.getIcon();
      var seoTitle = `${this.section.get('name')} | ${this.section.get('tenant').name}`;
      utils.setSEOData(seoTitle, window.location.href, this.section.get('description'), icon);
      Common.logVisitActivity(this.product_id, this.section_id);
      this.initializeSudoSlider();
      this.areaCalculation();
    },
    listSections: function (playlisttemp) {
      if (this.section.get('children') && this.section.get('children').length) {
        var sub_sections = this.section.get('children');

        _.each(sub_sections, function (section) {
          if (!section.description) {
            section.description = Common.LOREM_IPSUM;
          }

          section.progress_class = Common.getProgressClass(section.progress);
        });

        this.sectionListView = new SectionListView({
          sections: sub_sections,
          product_id: this.product_id,
          canEdit: this.section.get('can_edit')
        });
        this.$('.section-pwt-list.right_section').html(this.sectionListView.render().el);
        Backbone.trigger("view_rendered", this);
      } else if (this.section.get('playlists') && this.section.get('playlists').length) {
        var root = this;
        root.$('.section-playlist-list.right_section').empty();

        _.each(this.section.get('playlists'), function (plist, index) {
          if (['home', 'audience'].indexOf(document.viewType) !== -1 && plist.is_enabled == undefined && plist.walkthroughs.length) {
            plist.is_enabled = true;
          }

          if (!plist.description) {
            plist.description = Common.LOREM_IPSUM;
          }

          plist.translations_available = plist.translations_available || _.find(plist.walkthroughs, function (wt) {
            return wt.translations_available == true;
          });
          var plistCounter = index + 1;

          _.each(plist.walkthroughs, function (wt) {
            if (['home', 'audience'].indexOf(document.viewType) !== -1 && wt.is_enabled == undefined) {
              wt.is_enabled = true;
            }

            if (wt.slug == root.walkthrough_id) {
              wt.current_wt = true;
            }

            wt.progress_class = Common.getProgressClass(wt.percentage);
            if (wt.published === null) wt.published = false;

            if (wt.name && wt.name.length > 45) {
              wt.wt_name = wt.name.substring(0, 44) + '...';
            } else {
              wt.wt_name = wt.name;
            }
          });

          var is_author = document.viewType == 'edit';

          if (playlisttemp == 'listView') {
            root.$('#playlist-thumbnail-view').removeClass('active');
            root.$('#playlist-row-view').addClass('active');
            root.$('#section-playlist').addClass('boxtemp');
            root.$('.section-playlist-list.right_section').append(root.box_playlist_list_view_template({
              playlist: plist,
              playlistCounter: plistCounter,
              can_edit: plist.can_edit,
              is_author: is_author
            }));
          } else {
            root.$('#playlist-row-view').removeClass('active');
            root.$('#playlist-thumbnail-view').addClass('active');
            root.$('.section-playlist-list.right_section').append(root.playlist_template({
              playlist: plist,
              playlistCounter: plistCounter,
              can_edit: plist.can_edit,
              is_author: is_author
            }));
          }
        }); // newtemp addition


        var expandDemoView = $('.section-playlist-list').hasClass('demo-leng-toggle');

        if (document.viewType != 'edit' && expandDemoView && playlisttemp !== 'listView') {
          root.addViewMoreButton();
        } // Offline mode only for tenant allow offline is TRUE


        if (this.section.get('tenant') && this.section.get('tenant').allow_offline && document.viewType != 'edit') {
          //check for the cached section if present show color else disable it
          $('#avaiable_for_offline').show();
          this.checkCachedSection();
        }

        Backbone.trigger("playlist_rendered", this);
      } else {
        Backbone.trigger("view_rendered", this);
      } // Hide the social sharing icons if tenant or section is private.


      if (this.section.attributes.product.is_private) {
        $('.social-sharing').addClass('hide');
      } else {
        $('.social-sharing').removeClass('hide');
      }

      Common.tooltip();
    },
    addViewMoreButton: function () {
      var translated_text = translate('READ MORE');
      var root = this,
          showMore = '<div class="viewmore-demos"></div>',
          readMore = '<span class="readmore-demo-desc">' + translated_text + '</span>';

      _.each(this.$('.playlist-block'), function (elem, index) {
        var playlistBlock = root.$(elem).find('.playlist-left');
        var playlistDemos = root.$(elem).find('ul').height();
        var playlistDesc = root.$(elem).find('p').height();

        if (playlistDemos > 185) {
          playlistBlock.find('.playlist-right').addClass('grid-pl-toggle-demos');
          playlistBlock.append(showMore);
        }

        if (playlistDesc > 36) {
          playlistBlock.find('.grd-playlist-desc').addClass('max-demo-desc');
          playlistBlock.find('p').append(readMore);
        }
      });
    },
    displayMoreDemos: function (event) {
      var target = $(event.currentTarget);
      this.$(target).prev().toggleClass('grid-pl-toggle-demos');
    },
    toggleDescView: function (event) {
      var target = $(event.currentTarget);
      this.$(target).prev().hasClass('max-demo-desc') ? this.$(target).text(translate('READ LESS')) : this.$(target).text(translate('READ MORE'));
      this.$(target).prev().toggleClass('max-demo-desc');
    },
    checkCachedSection: function () {
      var urlArray = window.location.href.split('/');
      var leafNodeSection = urlArray[urlArray.length - 1];
      var localStorageTanantName = window.location.origin + '_sections';

      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        var sections = JSON.parse(localStorage.getItem(localStorageTanantName));

        if (sections && sections.indexOf(leafNodeSection) != -1) {
          $('#main_container').removeClass().addClass('available_offline download-active');
          var walkthroughs_list = $('.pwt-list li');

          for (var i = 0; i < walkthroughs_list.length; i++) {
            var slug = walkthroughs_list[i].getAttribute('slug');
            var failedWalkthroughs = window.location.origin + '_failed_walkthroughs';
            var entityList = JSON.parse(localStorage.getItem(failedWalkthroughs));

            if (entityList && entityList.indexOf(slug) != -1) {
              $('#main_container').removeClass().addClass('downloading-error');
              $('.download_offline').removeClass().addClass('restart_download');
              $('.avaiable_for_offline p').html('Oops! Try again:');
              $('#' + slug).addClass('downloading-slug-error');
            }

            var progress = 100;
            var angle = -90 + (progress - 75) / 100 * 360;
            $("#" + slug + " .animate-50-75-b, #" + slug + " .animate-25-50-b, #" + slug + " .animate-0-25-b").css("transform", "rotate(0deg)");
            $("#" + slug + " .animate-75-100-b").css("transform", "rotate(" + angle + "deg)");
          }
        } else {
          // show with diabled option
          $('#main_container').removeClass('available_offline download-active');
        }
      } else {
        localStorage.removeItem(localStorageTanantName);
      }
    },
    getIcon: function () {
      var icon = this.section.get('icon') && this.section.get('icon').path;

      if (!icon) {
        var parent = this.section.get('parent');
        icon = parent && parent.icon && parent.icon.path;

        if (!icon) {
          icon = Common.product_details && Common.product_details.get('icon') && Common.product_details.get('icon').path;
        }
      }

      return icon;
    },
    trackVisit: function () {
      var current_section = {
        'name': this.section.get('name'),
        'slug': this.section.get('slug'),
        'description': this.section.get('description') || Common.LOREM_IPSUM
      };
      Common.setVisit(current_section);
    },
    trackCTAAnalytics: function (e) {
      Common.trackCTAAnalytics(e.currentTarget.dataset.ctaId, this.product_id, this.section_id);
    },
    initializeSudoSlider: function () {
      var root = this;
      this.sudoSlider = this.$(".video-slider").sudoSlider({
        touch: true,
        prevNext: false,
        responsive: true,
        numeric: true,
        effect: "slide ",
        customLink: 'div.customLink, button.customLink',
        afterAnimation: event => {
          _.each(this.$('iframe.popup-video'), element => {
            $(element).attr('src', $(element).attr('src'));
          });
        }
      });

      if (!this.$(".video-slider").length) {
        this.$('.section-vid-block .sign-up').addClass('txt-left-align');
      }
    },
    openSection: function (event) {
      var target_slug = $(event.currentTarget).attr('slug');

      if (target_slug !== undefined && target_slug !== "") {
        if (target_slug == this.product_id) {
          Backbone.history.navigate('#!/' + target_slug, {
            trigger: true
          });
        } else {
          Backbone.history.navigate('#!/' + this.product_id + '/' + target_slug, {
            trigger: true
          });
        }
      } else if (target_slug == "") {
        Backbone.history.navigate('#!/', {
          trigger: true
        });
      }
    },
    openWalkthrough: function (event) {
      let element = this.$(event.currentTarget).parent('li');
      if (element.is(".no-action, .tags-span") || element.parents('.playlist-block').hasClass("disabled")) return; // check for same walkthrough before loading

      var walkthrough_id = $(event.currentTarget).parent('li').attr('slug');
      if (this.walkthrough_id == walkthrough_id) return;

      if (this.product_id == this.section_id) {
        Backbone.history.navigate('#!/' + this.product_id + '/' + walkthrough_id, {
          trigger: true
        });
      } else {
        Backbone.history.navigate('#!/' + this.product_id + '/' + this.section_id + '/' + walkthrough_id, {
          trigger: true
        });
      }
    },
    openRelatedProduct: function (event) {
      var section = $(event.currentTarget).attr('section');
      var product = $(event.currentTarget).attr('product');

      if (section == product) {
        Backbone.history.navigate('#!/' + product, {
          trigger: true
        });
      } else {
        Backbone.history.navigate('#!/' + product + '/' + section, {
          trigger: true
        });
      }
    },
    onWindowResize: function (e) {
      var root = e.data.root;
      root.areaCalculation();
    },
    areaCalculation: function () {
      if ($(window).width() > 991) {
        var left_pane = this.$('.left-pane').last().height();
        var center_pane = this.$('.center-pane').last().height();
        var right_pane = this.$('.right-pane').last().height();
        var maxheight = Math.max(left_pane, center_pane, right_pane);

        if (maxheight <= $(window).height() - $('.header').height()) {
          this.$('.left-pane, .right-pane, .center-pane').css('min-height', $(window).height() - $('.header').height());
        } else {
          this.$('.left-pane, .right-pane, .center-pane, .leaf-wrap').css('min-height', maxheight);
        }

        ;
      } else {
        this.$('.left-pane, .right-pane, .center-pane').css('min-height', 50);
      }
    },
    videoPopup: function (event) {
      event.stopPropagation();
      var videolink = this.$(event.target).attr('data-video-link');
      var videoBlock = this.$(event.target).parent();
      this.$(videoBlock).find(".popup-video").attr("src", videolink).show();
    },
    showSignup: function (event) {
      let cta_id = this.$(event.currentTarget).data('cta-id');
      let cta = new Cta({
        id: cta_id
      });
      let root = this;
      $.when(cta.fetch()).done(function () {
        let args = cta.attributes;
        args['product'] = root.product_id;
        args['section'] = root.section_id;
        root.$(".overlay .sign-up-wrap").html(CTAForm(args));
        root.$('.overlay').addClass('section-cta-active');
        root.$(".sign-box ").addClass("bounceInDown");
        setTimeout(function () {
          root.$(".sign-box ").removeClass("bounceInDown");
        }, 500);
        root.$('.sign-up-wrap .form-footer').css({
          'display': 'inline-block'
        });
        Backbone.trigger("cta_overlay_opened");
      });
    },
    cancelSubmit: function () {
      this.$(".sign-box ").addClass("bounceOutUp");
      var root = this;
      setTimeout(function () {
        root.$('.overlay').removeClass('section-cta-active');
        Backbone.trigger("cta_overlay_closed");
        root.$(".sign-box ").removeClass("bounceOutUp");
        root.$('input[type=text]').val("");
        this.$('.error-message').hide();
      }, 300);
    },
    submitUserDetails: function (event) {
      event.preventDefault();
      var root = this;
      root.$('.error-message').hide();
      var validated = true;

      _.each(this.$('form[name=lead] input[type=text]'), function (elem, index) {
        if (validated && !$(elem).val().trim()) {
          validated = false;
          root.$(elem).siblings('.error-message').show();
        }
      });

      if (!validated) return false;
      root.$('.form-sending').addClass("slide-in is-submitted");
      setTimeout(function () {
        root.$('form[name=lead] input[type=submit]').attr('disabled', 'disabled');
        var user_data = {};

        _.each(root.$('form').serializeArray(), function (field) {
          user_data[field.name] = field.value;
        });

        let user_details = new UserDetails(user_data);
        user_details.save().done(function () {
          root.$('.form-sending').removeClass("slide-in is-submitted");
          root.$('.form-sent').addClass("slide-in");
          setTimeout(function () {
            root.$('.form-sent').removeClass("slide-in");
            root.cancelSubmit();
          }, 3000);
        }).error(function () {
          root.$('.form-sending').removeClass("slide-in is-submitted");
          root.$('.form-failed').addClass("slide-in");
          setTimeout(function () {
            root.$('.form-failed').removeClass("slide-in");
          }, 3000);
        }).always(function () {
          root.$('form[name=lead] input[type=submit]').removeAttr('disabled');
        });
      }, 3000);
    },
    checkInput: function (event) {
      var root = this;

      if (!$(event.currentTarget).val().trim()) {
        root.$(event.currentTarget).siblings('.error-message').show();
      } else {
        root.$(event.currentTarget).siblings('.error-message').hide();
      }

      ;
    },
    unload: function () {
      $(document).off('resize', this.onWindowResize);
      utils.removeSEOData();
      this.undelegateEvents();
    },
    displayVideos: function (e) {
      var videoSection = this.$('.section-video');
      var videoSlider = this.$('.video-slider');

      if (document.template_folder !== 'default') {
        $('#block_container').toggleClass('show-videos');

        if ($(videoSlider).html() == '') {
          var UL = '<ul></ul>';
          $(videoSlider).append(UL);
          var videos = this.section.get('videos');

          _.each(videos, function (video) {
            if (!video.poster_image) {
              video.poster_image = Common.DEFAULT_VIDEO_POSTER;
              var video_details = Common.getEmbedVideoDetails(video.link);

              if (video_details) {
                video.poster_image = video_details.thumbnail_url;
              }
            }

            let ele = `<li><div class="video-link" data-video-link=${video.link}>
                            <img src="${video.poster_image}" style="width:100%" ></div>
                            <iframe class="popup-video" width="480" height="270"  frameborder="0"
                                webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </li>`;
            $('.video-slider ul').append(ele);
          });

          videoSection.removeClass('rendered');
          $('#video-slider-block .controls').remove();
        }
      }

      if (!videoSection.hasClass('rendered')) {
        videoSection.addClass('rendered');
        this.initializeSudoSlider();
      }

      if (this.$('.slidesContainer li.slide').length > 1) {
        videoSlider.addClass('multiple-vid');
      } else {
        videoSlider.removeClass('multiple-vid');
      }

      if ($(window).width() < 991 && document.template_folder == 'default') {
        videoSection.slideToggle();
        this.$('.watch-videos').toggleClass('opened');

        if (this.$(e.currentTarget).hasClass('opened')) {
          var target = this.$(e.currentTarget).attr('target');

          if (target.length) {
            $('.pwt-section').animate({
              scrollTop: $(target).offset().top - 60
            }, 1000);
          }
        }
      }
    },
    hideVideos: function () {
      $('#block_container').removeClass('show-videos');
      $('.video-slider').empty();
    },
    switchPlaylistViewInGridTemp: function (e) {
      var target = $(e.currentTarget);
      if (target.hasClass('active') || $('#main_container').hasClass('downloading')) return;
      target.siblings().removeClass('active');
      target.addClass('active');

      if (target.attr('id') == 'playlist-row-view') {
        Common.LOCAL_STORAGE.setItem('playlistView', 'listView');
        this.listSections('listView');
      } else {
        this.$('#section-playlist').removeClass('boxtemp');
        Common.LOCAL_STORAGE.removeItem('playlistView');
        this.listSections();
      }
    }
  });
  return SectionView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/views/slide.js":
/*!****************************************************!*\
  !*** ./sharedemos/static/js/tenant/views/slide.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! jcf */ "./sharedemos/static/libs/jcf/jcf.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../templates/hotspot.handlebars */ "./sharedemos/static/js/tenant/templates/hotspot.handlebars"), __webpack_require__(/*! ../templates/pin.handlebars */ "./sharedemos/static/js/tenant/templates/pin.handlebars"), __webpack_require__(/*! ../templates/slide.handlebars */ "./sharedemos/static/js/tenant/templates/slide.handlebars"), __webpack_require__(/*! ../templates/bookmarks.handlebars */ "./sharedemos/static/js/tenant/templates/bookmarks.handlebars"), __webpack_require__(/*! ../templates/notes-pagination.handlebars */ "./sharedemos/static/js/tenant/templates/notes-pagination.handlebars"), __webpack_require__(/*! jquery.qtip */ "./sharedemos/static/libs/jquery-qtip/jquery.qtip.min.js"), __webpack_require__(/*! jquery.ui */ "./sharedemos/static/libs/jquery-ui/jquery-ui.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, jcf, Backbone, Common, Hotspot, Pin, SlideTemplate, BookmarksTemplate, NotePagination) {
  'use strict';

  var SlideView = Backbone.View.extend({
    tagName: 'li',
    template: SlideTemplate,
    DEFAULT_FILE_ICON: "/static/images/thumb-file.jpg",
    events: {
      'click .slides-Container': 'triggerSlideClick',
      'click a[crosslinks="true"]': 'handleCrosslinks',
      //audio controll
      'click .audio-control': 'playAudio',
      'click .audio-backward': 'backwardAudio',
      'click .audio-farward': 'forwardAudio',
      'click .audio-timeline': 'seekAudio',
      'click .audio-mute': 'muteAudio',
      'click .annotation': 'resumePlayingSandbox',
      'click .toggle-sb-sc': 'toggleSandboxShortCuts',
      // PDF Viewer event.
      'click .pdf-launcher': 'launchPdf',
      'click #downloadFile': event => {
        Common.downloadResource(event);
      }
    },
    initialize: function (attrs) {
      this.slide = attrs.data;
      this.user_visited = false;
      this.asset_load_status = false;
      this.sandbox = {
        'current_frame': 0,
        'current_frame_index': 0,
        'has_images': false,
        'navigate': true,
        'loader_loaded': false,
        'loaded_frames': []
      };
      this.playerObject = attrs.data.playerObject;
      this.render();
    },
    render: function () {
      var template_vars = {
        order: this.slide.order
      };
      var pri_res = this.slide.primary_resource;
      var sec_res = this.slide.secondary_resource;

      if (pri_res) {
        template_vars.type = pri_res.type;
        template_vars.src = pri_res.path;

        if (pri_res.type == 'pdf') {
          template_vars.isPdf = true;

          if (pri_res.meta_data.thumbnail_url) {
            template_vars.thumbnail_url = pri_res.thumbnail;
          }

          ;
        } else if (pri_res.type == 'audio') {
          template_vars.is_audio = true;
        } else if (pri_res.type == 'video') {
          template_vars.is_video = true;
        } else if (pri_res.type == 'wistia') {
          template_vars.is_wistia = true;
        } else if (pri_res.type == 'embed') {
          template_vars.is_embed = true;
        } else if (pri_res.type == 'image' && !sec_res) {
          template_vars.is_image = true;
        } else if (pri_res.type == 'image' && sec_res.type == 'audio') {
          template_vars.is_image_with_audio = true;
        } else if (pri_res.type == 'link') {
          template_vars.icon = '/static/images/author/thumb-link.jpg'; // Temporary fix to link type slide.

          if (pri_res.meta_data.icon) {
            template_vars.icon = pri_res.meta_data.icon;
          }

          template_vars.meta_data = pri_res.meta_data;
          let des = template_vars.meta_data.description;

          if (des && des.length > 100) {
            template_vars.meta_data.description = des.substr(0, 100) + '...';
          }

          template_vars.is_link = true;
        } else if (pri_res.type == 'iframe') {
          _.extend(template_vars, this.getURLProperties(pri_res.path));

          template_vars.is_iframe = true;
        } else if (pri_res.type == 'html5') {
          template_vars.is_iframe = true;
          template_vars.src = pri_res.path;
        } else if (pri_res.type == 'content') {
          template_vars.is_content = true;
          template_vars.tenant_template = this.slide.tenant.template.toLowerCase();
          template_vars.content = pri_res.content;

          if (!document.isPrivateTenant) {
            let urlExp = new RegExp('"/static/media/', 'g');
            template_vars.content = pri_res.content.replace(urlExp, `"${document.cdn_url}${Common.DEFAULT_MEDIA_PATH}`);
          }

          template_vars.document_styles = document.documentStyles;

          if (document.tenantFooterImage) {
            template_vars.footer_image = Common.DEFAULT_MEDIA_PATH + document.tenantFooterImage;
          }

          template_vars.footer_text = this.slide.tenant.footer_text;
        } else if (pri_res.type == '360') {
          template_vars.is_360 = true;
          template_vars.frames = [];

          _.times(pri_res.meta_data.count, function (i) {
            template_vars.frames.push({
              framePath: `${pri_res.path}/${i + 1}.jpg`
            });
          });
        } else if (pri_res.type == 'sandbox') {
          template_vars.is_sandbox = true;
          this.sandbox.has_images = _.find(pri_res.meta_data.frames, function (frame) {
            return frame.type == 'image';
          });
        } else if (pri_res.type == 'file') {
          let imageSrc = `${document.cdn_url}${this.DEFAULT_FILE_ICON}`;

          if (pri_res.meta_data && pri_res.meta_data.thumbnail_url) {
            imageSrc = pri_res.meta_data.thumbnail_url;
          }

          template_vars.is_file = true;
          template_vars.resource_id = pri_res.resource_id;
          template_vars.path_name = pri_res.path;
          ;
          template_vars.file_title = pri_res.name;
          template_vars.file_size = (pri_res.meta_data.size / 1048576).toFixed(2);
          template_vars.file_type = pri_res.meta_data.type.split('.')[1];
          template_vars.file_name = pri_res.name + pri_res.meta_data.type;
          template_vars.imageSrc = imageSrc;
        }

        if (['embed', 'iframe', 'wistia'].includes(pri_res.type)) {
          template_vars.resPath = pri_res.path;
          template_vars.title = pri_res.meta_data.title;
          let videoData = Common.enhanceVideoURL(pri_res.path);
          template_vars.src = videoData.src;
          template_vars.embedType = videoData.embedType;
        }

        if (sec_res) {
          template_vars.sec_src = sec_res.path;
        }
      }

      this.$el.html(this.template(template_vars)); // If slide type is RTE then add target attr to the hyper links.

      if (pri_res.type == 'content') {
        this.$('.fr-element.fr-view.content-slide').find('a').attr('target', '_blank');
        this.setEmbedIframeSrc();
      }

      _.each(this.slide.hotspots, this.appendHotSpot, this);

      _.each(this.slide.pins, this.appendPin, this);

      if (pri_res.type == '360') {
        this.initProductViewer(pri_res.meta_data.count);
        var root = this;
        this.$('.product-frame:first-child img').one('load', function (event) {
          root.updateCoverDimension(root.$(".product-frame:first-child img").attr("src"), -65);
        });
      }

      ;

      if (pri_res.type == 'sandbox') {
        this.loadFrame(pri_res.meta_data.frames[0].index); // activate first frame of a sandbox, only on first set of frames loaded

        this.$('#slider' + this.slide.order + ' .sandbox-player .sandbox-frame:first-child').addClass('active');
      }

      return this;
    },
    handleCrosslinks: function (event) {
      event.preventDefault();
      let href = this.$(event.currentTarget).attr('href');

      if (document.viewType == "edit") {
        href += '?author=1';
      } else if (document.viewType == "home") {
        href += this.$(event.currentTarget).attr('scroll_to');
      }

      window.open(href, '_blank');
    },
    loadAsset: function () {
      if (this.asset_load_status) return;
      var pri_res = this.slide.primary_resource;

      if (pri_res) {
        pri_res.source = pri_res.path;
      }

      var sec_res = this.slide.secondary_resource;

      if (sec_res) {
        sec_res.source = sec_res.path;
      }

      var root = this;

      if (sec_res && sec_res.type == 'audio') {
        var audio = this.getAudio();
        audio.addEventListener('loadedmetadata', function () {
          root.totalAudioDuration(event);
        });
      }

      if (pri_res) {
        if (pri_res.type == 'audio' || pri_res.type == 'embed') {
          if (pri_res.type == 'audio') {
            var audio = this.getAudio();
            audio.addEventListener('loadedmetadata', function () {
              root.totalAudioDuration(event);
            });
          }

          if (sec_res) {
            this.$('.slideArea .audio_banner').empty().append($("<img class='banner_image' src='" + sec_res.source + "'>"));
          }
        } else if (pri_res.type == 'video') {
          if (sec_res) {
            this.$('video').attr('poster', sec_res.source);
          }
        } else if (pri_res.type == 'image') {
          this.appendImageToSlideArea(pri_res);
        }
      } // code to fix slide width for slide


      this.$('[slide-type=image] img.slide_image').on('load', function (event) {
        root.setSlideArea();
      });
      this.asset_load_status = true;
    },
    launchPdf: function () {
      let resource = this.slide.primary_resource,
          url = resource.path,
          fileExtension = "pdf",
          downloadUrl = url,
          data = {};

      if (["ppt", "doc", "docx"].includes(resource.meta_data.source_type)) {
        fileExtension = resource.meta_data.source_name.split(".").slice(-1)[0];
        downloadUrl = resource.meta_data.source_name;
      }

      data.tenant = {
        logo: this.slide.tenant.logo
      };
      data.pdf = {
        source_url: url,
        download_url: downloadUrl,
        title: resource.name,
        name: `${resource.name}.${fileExtension}`,
        resource_id: resource.resource_id
      };

      if (document.viewType != 'embed') {
        let {
          section,
          product
        } = this.slide;
        let chapter = this.slide.walkthrough.name;
        data.breadcrumb = product.slug === section.slug ? `home > ${section.name} > ${chapter}` : `home > ${product.name} > ${section.name} > ${chapter}`;
      }

      Backbone.trigger('launch_pdf', data);
    },
    setSlideArea: function () {
      var slideId = this.$(".slideArea").attr('id');
      var slideType = this.$("#" + slideId).attr('slide-type');

      if ($(window).width() < 766) {
        this.$("#" + slideId).css({
          'width': '100%'
        });

        if (slideType == "content") {
          this.setIframeArea();
        }

        return;
      }

      ;
      var hasSecResAudio = this.$("#" + slideId).parent().children().hasClass('image_with_audio');
      var playerWidth = $('#player').width();
      var playerHeight = $('#player').height();

      if (slideType == "image") {
        var image_src = this.$("#" + slideId + " img").attr("src");
        var imageWidth = 0;
        var imageHeight = 0;

        if (image_src) {
          var image = new Image();
          image.addEventListener('load', () => {
            imageWidth = image.naturalWidth;
            imageHeight = image.naturalHeight;

            if (imageHeight > imageWidth) {
              this.$("#" + slideId).css({
                'width': '100%'
              });
            } else {
              if (hasSecResAudio) playerHeight -= 50;
              var newImageWidth = imageWidth * playerHeight / imageHeight;
              var containerWidth = newImageWidth * 100 / playerWidth - 1;

              if (containerWidth <= 100) {
                this.$("#" + slideId).css({
                  'width': containerWidth + '%'
                });
              } else {
                this.$("#" + slideId).css({
                  'width': '98%'
                });
              }
            }

            ;
          });
          image.src = image_src;
        }
      } else if (slideType == "video") {
        var containerWidth = playerHeight * 16 / 9;

        if (playerWidth >= containerWidth) {
          this.$("#" + slideId).css({
            'width': containerWidth
          });
        } else {
          this.$("#" + slideId).css({
            'width': '98%'
          });
        }
      } else if (slideType == "360") {
        this.updateCoverDimension(this.$(".product-frame:first-child img").attr("src"), -65);
      } else if (slideType == "sandbox") {
        this.updateCoverDimension(this.$(".sandbox-player .sandbox-frame:first-child img").attr('src'));
      } else if (slideType == "content") {
        this.setIframeArea();
      }

      ;
      ;
    },
    setIframeArea: function () {
      if (this.$('.fr-element .fr-iframe').length >= 1) {
        var iframeWidth = this.$('.fr-element').width() + 100;
        var iframeHeight = iframeWidth * 9 / 16;
        this.$('.fr-element .fr-iframe').css({
          "width": iframeWidth,
          "height": iframeHeight
        });
      }

      ;
    },
    appendHotSpot: function (details) {
      details.hotspot_id = this.$('.hotspot').length + 1;
      var hotspot = $(Hotspot(details));

      if (details.display.color != "transparent") {
        var _event = details.action && details.action.event || 'click';

        hotspot.on('check_hotspot', function () {
          hotspot.trigger(_event);
        });
      }

      if (details.hotspot_type == 'goto') {
        if (!details.action || details.action.slide_number != undefined && details.action.slide_number != "noaction") {
          hotspot.click(function () {
            // jump to slide number in walkthrough
            if (hotspot.data('uiDraggable') || hotspot.data('uiResizable') || hotspot.data('uiSelectable')) return;
            var slide_number = details.action && details.action.slide_number || 'next';
            hotspot.trigger('scroll_slide', slide_number);
          });
        }
      }

      this.$(".slideArea").append(hotspot);
    },
    appendPin: function (pin_data) {
      var attrs = {
        position: '',
        left: pin_data.display.left,
        top: pin_data.display.top
      };
      var slideType = this.$('.slideArea').attr('slide-type');

      if (slideType == '360') {
        attrs.order = '+';
      } else {
        if (this.slide.pins.length > 1) {
          attrs.order = pin_data.order;
        } else {
          attrs.order = '';
        }
      }

      ;

      if (pin_data.callout) {
        attrs.title = pin_data.callout.title, attrs.body = pin_data.callout.body;
      }

      if (pin_data.id) attrs.id = pin_data.id;
      var pin = Pin(attrs);

      if (slideType == 'image') {
        this.$(".slideArea").append(pin);
      } else if (slideType == '360') {
        this.$('.slideArea .product-frame:nth-child(' + pin_data.display.frame_number + ')').append(pin);
      }

      ;
    },
    triggerHotspot: function (e) {
      if (e.keyCode > 48 && e.keyCode < 58 && String.fromCharCode(e.keyCode)) {
        this.$('#hotspot' + String.fromCharCode(e.keyCode)).trigger('check_hotspot');
      }
    },
    hideHotspot: function () {
      this.$('.info-tooltip').hide().removeClass('active');
    },

    /**
     * why: Realod the gif animation, to start the animation from beginning
     */
    animateGif: function () {
      let resource = this.slide.primary_resource;

      if (resource.type !== 'image') {
        return;
      }

      let imageType = this.$el.find('img').attr('image-type');

      if (imageType === 'image/gif') {
        this.$el.find('img').attr('src', resource.source);
      }
    },
    // Add image-type attribute to <img /> tag, if it is of type 'image/gif'
    appendImageToSlideArea: function (pri_res) {
      this.$('.slideArea').append($("<img class='slide_image' src='" + pri_res.source + "'>"));
      fetch(pri_res.source, {
        method: 'HEAD',
        mode: 'no-cors'
      }).then(response => response.headers.get('Content-type')).then(contentType => {
        if (contentType && contentType === 'image/gif') {
          this.$el.find('img').attr('image-type', contentType);
        }
      });
    },
    flashHotspot: function () {
      var root = this;
      setTimeout(function () {
        root.$('.info-tooltip').addClass('active');
      }, 1000);
    },
    addSandboxLoader: function (player) {
      this.playerView = player;
      var root = this;

      if (this.slide.primary_resource && this.slide.primary_resource.type == 'sandbox' && !this.sandbox.loader_loaded) {
        this.$('.sb-buffering-container').addClass('sb-loading');
        this.playerView.navigate_slide = false;
        this.sandbox.navigate = false;
        $(".customLink[target=next]").addClass('disabled');
        $(".customLink[target=prev]").addClass('disabled');
        setTimeout(function () {
          root.$('.sb-buffering-container').removeClass('sb-loading');
          root.sandbox.loader_loaded = true;
          root.playerView.navigate_slide = true;
          root.sandbox.navigate = true;

          if (player.embed_playlist) {
            if (Common.CURRENT_SLIDE !== 1) $(".customLink[target=prev]").removeClass('disabled');
            $(".customLink[target=next]").removeClass('disabled');
          } else {
            $(".customLink[target=next], .customLink[target=prev]").removeClass('disabled');
          }
        }, 5000);
      } else {
        this.sandbox.navigate = true;
      }
    },
    triggerSlideClick: function (e) {
      this.$('.slides-Container').trigger('slide_click', e);
    },
    getURLProperties: function (url) {
      if (!url.startsWith('http')) {
        url = 'http://' + url;
      }

      url = new URL(url);
      var data = {
        size: 0,
        name: url.origin,
        url_type: 'web'
      };
      var filename;

      var url_parts = _.compact(url.pathname.split('/'));

      if (url_parts.length) {
        filename = url_parts[url_parts.length - 1];

        if (filename && filename.split('.')[1]) {
          data.name = filename;
          data.url_type = filename.split('.')[1];
        }
      }

      return data;
    },
    // slide audio control functions
    playAudio: function () {
      var audio = this.getAudio();

      if (audio) {
        if (audio.paused) {
          audio.play();
          this.$('.audio-control').removeClass("play").addClass("pause autoplayed");
        } else {
          audio.pause();
          this.$('.audio-control').removeClass("pause").addClass("play");
        }
      }

      $(audio).on("timeupdate", {
        'root': this
      }, this.timeUpdate);
    },
    forwardAudio: function () {
      var audio = this.getAudio();

      if (audio && !audio.paused) {
        audio.currentTime = audio.currentTime + 5;
      }
    },
    backwardAudio: function () {
      var audio = this.getAudio();

      if (audio && !audio.paused) {
        audio.currentTime = audio.currentTime - 5;
      }
    },
    seekAudio: function (event) {
      var audio = this.getAudio();

      if (audio) {
        var duration = audio.duration;
        var position = event.offsetX;
        var timelineWidth = this.$(".audio-timeline").width();
        var seek_to = position / timelineWidth;

        if (!audio.paused) {
          audio.currentTime = (duration * seek_to * 100 / 100).toFixed(2);
        }

        ;
      }
    },
    muteAudio: function (event) {
      var audio = this.getAudio();

      if (!audio.muted) {
        audio.muted = true;
        this.$(event.currentTarget).addClass('muted');
      } else {
        audio.muted = false;
        this.$(event.currentTarget).removeClass('muted');
      }

      ;
    },
    totalAudioDuration: function (event) {
      var total = event.currentTarget.duration || 0;
      this.$(".audio-duration").text(this.timeConvertion(total));
    },
    timeUpdate: function (event) {
      // Synchronizes playhead position with current point in audio
      var root = event.data.root;
      var audio = event.currentTarget;
      root.updateAudioProgress(audio);
      var cduration = root.timeConvertion(audio.currentTime);
      root.$(".audio-currentTime").text(cduration);

      if (audio.currentTime == audio.duration) {
        audio.pause();
        root.$('.audio-control').removeClass("pause").addClass("play");
        root.$('.audio-progress').css({
          'width': '100%'
        });
      }
    },
    updateAudioProgress: function (audio) {
      var timelineWidth = this.$(".audio-timeline").width();
      var playPercent = timelineWidth * (audio.currentTime / audio.duration);
      this.$(".audio-progress").css({
        "width": playPercent
      });
    },
    timeConvertion: function (duration) {
      let durationMin = parseInt(duration / 60),
          durationSec = parseInt(duration % 60);

      if (durationMin == 0) {
        durationMin += '0';
      }

      if (durationSec < 10) {
        durationSec = '0' + durationSec;
      }

      return durationMin + ":" + durationSec;
    },
    getAudio: function () {
      if (this.$('audio').length) {
        return this.$('audio')[0];
      }
    },
    initProductViewer: function (totalFrames) {
      var root = this;
      this.$(".slider360").slider({
        max: totalFrames - 1,
        slide: function (event, ui) {
          var framenum = ui.value + 1;
          root.$('.product-viewer').find('.product-frame').removeClass('active');
          root.$('.product-viewer').find('.product-frame:nth-child(' + framenum + ')').addClass('active');
        }
      });
    },
    loadFrame: function (frameNo, fromBookmark) {
      let sandboxFrames = this.slide.primary_resource.meta_data.frames; // check if all frames of sandbox are loaded

      if (this.allSandboxFramesLoaded()) {
        return true;
      } // if clicked on bookmark load 8 (previous 4 and next 3) frames including bookmark frame
      // if clicked next, load next 4 frames including current frame 


      let maxLoad = fromBookmark ? 8 : 4;
      let prev = false;

      for (let i = 0; i < maxLoad; i++) {
        // get frame index using frame no
        let frameIndex = sandboxFrames.findIndex(frame => {
          return frame.index == frameNo;
        });

        if (fromBookmark && !prev) {
          prev = true;
          frameIndex = frameIndex - 4 < 0 ? 0 : frameIndex - 4;
        }

        if (sandboxFrames[frameIndex]) {
          let nextFrame = sandboxFrames[frameIndex + 1]; // if frame loaded to DOM

          if (this.sandbox.loaded_frames.indexOf(sandboxFrames[frameIndex].index) != -1) {
            // get the next frame by increasing the current index
            if (nextFrame) {
              frameNo = nextFrame.index;
            } else {
              break;
            }
          } else {
            // get frame data using frame index 
            // load frame to DOM
            let frame = sandboxFrames[frameIndex];
            this.traverseThroughFramesAndAppend(frame, frameIndex);

            if (nextFrame) {
              frameNo = nextFrame.index;
            } else {
              break;
            }
          }
        }
      }
    },
    allSandboxFramesLoaded: function () {
      let sandboxFrames = this.slide.primary_resource.meta_data.frames; // check if all frames of sandbox are loaded to DOM

      if (this.sandbox.loaded_frames.length == sandboxFrames.length) {
        return true;
      }
    },

    /**
     * Traverse through frames and append to DOM
     */
    traverseThroughFramesAndAppend: function (frame, idx) {
      this.sandbox.loaded_frames.push(frame.index);

      if (frame.type == "image") {
        var image_path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'image');
        this.$(`#slider${this.slide.order} .sandbox-player`).append(`<div class="sandbox-frame" id="frame-${this.slide.order}-${frame.index}" data-frame-order="${idx}">
                        <img class="sandbox_image" src="${image_path}">
                    </div>`);

        if (idx == 0) {
          this.$(`#frame-${this.slide.order}-${frame.index} img`).one('load', () => {
            this.updateCoverDimension(image_path);
          });
        }

        ;
        this.loadFrameAsset(frame);
      } else if (frame.type == "video") {
        var video_path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'video');
        this.$(`#slider${this.slide.order} .sandbox-player`).append(`<div class="sandbox-frame" id="frame-${this.slide.order}-${frame.index}">
                        <video preload="none"><source src="${video_path}"></video>
                    </div>`);
      }
    },
    loadFrameAsset: function (frame) {
      var annotation = frame.annotation;
      this.$('#frame-' + this.slide.order + '-' + frame.index).append('<div data-current-frame="' + frame.index + '"class="annotation" style="width:' + annotation.width + '%;top:' + annotation.top + '%;left:' + annotation.left + '%;height:' + annotation.height + '%;"></div>');
    },
    getSanboxPath: function (path, i, type) {
      i = i.toString();

      if (i.length == 1) {
        i = "000" + i;
      } else if (i.length == 2) {
        i = "00" + i;
      } else if (i.length == 3) {
        i = "0" + i;
      }

      if (type == 'image') {
        path += '/frame-' + i + '.jpg';
      } else if (type == 'video') {
        path += '/video-' + i + '.mp4';
      }

      return path;
    },
    updateCoverDimension: function (src, height_diff) {
      if (!src) return;
      var image = new Image();
      image.src = src;
      var imageWidth = image.naturalWidth;
      var imageHeight = image.naturalHeight;
      var playerHeight = $('#player').height();

      if (height_diff) {
        playerHeight += height_diff;
      }

      var playerWidth = $('#player').width();
      var newImageWidth = imageWidth * playerHeight / imageHeight;
      var containerWidth = newImageWidth * 100 / playerWidth - 1;
      containerWidth >= 100 ? this.$(".slideArea").css({
        'width': '100%'
      }) : this.$(".slideArea").css({
        'width': containerWidth + '%'
      });
    },
    resumePlayingSandbox: function (event) {
      let curr_frame = parseInt(this.$(event.currentTarget).attr('data-current-frame'));
      $('.dt-btn-prev').removeClass('disabled');
      this.playSandbox(curr_frame);
    },
    gotoFrame: function (frameNo) {
      if (this.$('#frame-' + this.slide.order + '-' + frameNo).length) {
        this.$('#slider' + this.slide.order + ' .sandbox-frame.active').removeClass('active');
        this.$('#frame-' + this.slide.order + '-' + frameNo).addClass('active');
      }
    },
    navigateFrame: function (direction) {
      if (!this.sandbox.navigate) return;
      var cur_frameNo = parseInt($('#slider' + this.slide.order + ' .sandbox-frame.active').attr('id').split('-').pop()); // get frame index using frame no

      let sandboxFrames = this.slide.primary_resource.meta_data.frames;
      let frameIndex = sandboxFrames.findIndex(frame => {
        return frame.index == cur_frameNo;
      });

      if (direction == 'next' && this.$('#frame-' + this.slide.order + '-' + (cur_frameNo + 1)).length) {
        this.playSandbox(cur_frameNo);
      } else if (direction == 'prev' && frameIndex > 0) {
        let prevFrameNo = sandboxFrames[frameIndex - 1].index;

        if (prevFrameNo >= 0 && !this.$('#frame-' + this.slide.order + '-' + prevFrameNo).length) {
          this.loadFrame(cur_frameNo, 'from_prev_navigation');
        }

        if (this.$('#slider' + this.slide.order + ' .sandbox-frame.active img').length) {
          prevFrameNo = sandboxFrames[frameIndex - 2].index;
        }

        this.gotoFrame(prevFrameNo);
        this.setSandboxNotes();
      }
    },
    playSandbox: function (current_frame) {
      if (!this.sandbox.navigate) return;
      this.loadFrame(current_frame); // get frame index using frame no

      let sandboxFrames = this.slide.primary_resource.meta_data.frames;
      let frameIndex = sandboxFrames.findIndex(frame => {
        return frame.index == current_frame;
      });
      let nextVideoFrameNo = sandboxFrames[frameIndex + 1].index;
      let nextImageFrameNo;

      if (sandboxFrames[frameIndex + 2]) {
        nextImageFrameNo = sandboxFrames[frameIndex + 2].index;
      }

      let nextVideoFrameElem = `#frame-${this.slide.order}-${nextVideoFrameNo}`;

      if (this.$(`${nextVideoFrameElem}`).length) {
        this.$(`${nextVideoFrameElem} video`).on('waiting', () => {
          this.$(`#slider${this.slide.order} .loading-progress`).show();
        });
        this.$(`${nextVideoFrameElem} video`).on('playing', () => {
          this.$(`#slider${this.slide.order} .loading-progress`).hide();
          this.$(`${nextVideoFrameElem}`).addClass('active');
          this.$(`#frame-${this.slide.order}-${current_frame}`).removeClass('active');
        });
        this.$(`${nextVideoFrameElem} video`).on('ended', () => {
          if (this.$(`#frame-${this.slide.order}-${nextImageFrameNo}`).length) {
            this.$(`#slider${this.slide.order} .sandbox-player .sandbox-frame.active`).removeClass('active');
            this.$(`#frame-${this.slide.order}-${nextImageFrameNo}`).addClass('active');
            this.setSandboxNotes();
          }

          this.sandbox.navigate = true;
          this.playerView.navigate_slide = true;
        });
        var videoElement = this.$(`${nextVideoFrameElem} video`);

        if (videoElement.length) {
          this.sandbox.navigate = false;
          this.playerView.navigate_slide = false;
          videoElement[0].play();
        } else {
          this.gotoFrame(current_frame + 1);
        }
      }
    },
    setFramePosition: function () {
      if (this.$('#slider' + this.slide.order + ' .sandbox-frame.active .annotation').length) {
        this.sandbox.current_frame = parseInt(this.$('#slider' + this.slide.order + ' .sandbox-frame.active .annotation').attr('data-current-frame'));
        var root = this;
        this.sandbox.current_frame_index = _.findIndex(this.slide.primary_resource.meta_data.frames, function (frame) {
          return frame.index == root.sandbox.current_frame;
        });
      }
    },
    setSandboxNotes: function () {
      $('.pagination-wrap').hide();
      $('.notes-link').text("").removeAttr('data-link-type').removeAttr('data-link-resource').removeClass('active');
      if (Common.CURRENT_SLIDE != this.slide.order) return;
      this.setFramePosition();
      var frame = this.slide.primary_resource.meta_data.frames && this.slide.primary_resource.meta_data.frames[this.sandbox.current_frame_index];
      let localeId = document.current_locale;
      let notes = '';
      if (frame && frame.notes && frame.notes[localeId]) notes = frame.notes[localeId];
      $('.notes .notes-wrap-inner p').show().html(notes || "");
      $('.notes h1').text("");
      jcf.replaceAll();
    },
    setSlideNotes: function () {
      if (!this.slide) return;
      if (this.slide.primary_resource.type == "sandbox") return this.setSandboxNotes();

      if (this.slide.notes) {
        this.updateSlideNotes(this.slide.notes);
      } else {
        this.clearSlideNotes();
      }

      Backbone.trigger('notes_changed');
    },
    updateSlideNotes: function (notes, pageNumber) {
      // By default update to page '1'. 
      if (!pageNumber) pageNumber = '1';

      if (_.isEmpty(notes)) {
        this.clearSlideNotes();
        return;
      }

      $('.notes h1').show().html(notes[pageNumber].title || "");
      $('.notes .sub-inner p[target="body"]').show().html(notes[pageNumber].body || "");

      if (notes[pageNumber].link) {
        var linkData = notes[pageNumber].link;

        if (linkData.title == "") {
          $('.notes-link').removeClass('active');
        } else {
          $('.notes-link').addClass('active');
        }

        $('.notes-link').text(linkData.title || "");
        $('.notes-link').attr("data-link-type", linkData.type || "");
        $('.notes-link').attr("data-link-resource", linkData.resource || "");
      } else {
        $('.notes-link').text("").removeAttr('data-link-type').removeAttr('data-link-resource');
      }

      $('.pagination-wrap').show().html(NotePagination({
        'notes': notes
      }));
      if (Object.keys(notes).length <= 1) $('.pagination, .page-prev, .page-next').hide();
      $('.pagination-wrap ul li').removeClass('active');
      $('.pagination-wrap ul li[data-page="' + pageNumber + '"]').addClass('active');
      $('.notes').removeClass('add-notes no-notes');
      var left = 90 - parseInt(pageNumber) * 30;
      $('.pagination ul').css('left', left + 'px');
    },
    clearSlideNotes: function () {
      $('.notes').addClass('no-notes');
      $('.notes h1').hide().html("");
      $('.notes .sub-inner p').hide().html("");
      $('.notes-link').text("").removeAttr("data-link-type").removeAttr("data-link-resource").removeClass('active');
      $('.pagination-wrap').hide().html('');
    },
    toggleSandboxShortCuts: function (event) {
      this.$(event.currentTarget).toggleClass('active');
    },
    renderBookmarks: function () {
      _.each(this.slide.primary_resource.meta_data.frames, this.renderBookmark, this);
    },
    renderBookmark: function (frame) {
      if (frame.type !== 'image' || $.isEmptyObject(frame.bookmarks)) return;
      var path = this.getSanboxPath(this.slide.primary_resource.meta_data.path, frame.index, 'image');
      let localeId = document.current_locale;
      let bookmarksTitle = '',
          bookmarksDescription = '';

      if (frame.bookmarks) {
        if (frame.bookmarks.title && frame.bookmarks.title[localeId]) bookmarksTitle = frame.bookmarks.title[localeId];
        if (frame.bookmarks.description && frame.bookmarks.description[localeId]) bookmarksDescription = frame.bookmarks.description[localeId];
      }

      var attrs = {
        index: frame.index,
        title: bookmarksTitle,
        description: bookmarksDescription,
        image_src: path
      };
      var bookmarks = BookmarksTemplate(attrs);
      $('.sandbox-bookmarks .bookmarks-wrap').append(bookmarks);
    },
    checkAndNavigateSandboxFrame: function (navigationDirection) {
      var frames = this.slide.primary_resource.meta_data.frames;
      var firstFrameIndex = frames[0].index;
      var lastFrameIndex = frames[frames.length - 1].index;

      if (navigationDirection == "next" && !this.$(`#frame-${this.slide.order}-${lastFrameIndex}`).hasClass('active')) {
        $('.dt-btn-prev').removeClass('disabled');
        this.navigateFrame("next");
        return true;
      } else if (navigationDirection == "prev" && !this.$(`#frame-${this.slide.order}-${firstFrameIndex}`).hasClass('active')) {
        this.navigateFrame("prev");
        return true;
      } else {
        return false;
      }
    },
    setEmbedIframeSrc: function () {
      this.$('iframe').each((index, video) => {
        let videoSrc = $(video).attr('src');

        if (videoSrc) {
          let videoData = Common.enhanceVideoURL(videoSrc); // Update iframe data only if it videoData has embedType property

          if (videoData.embedType) $(video).attr(videoData);
        }
      });
    }
  });
  return SlideView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/libs/jquery-qtip/jquery.qtip.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/jquery-qtip/jquery.qtip.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* qTip2 v2.2.1 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Sat Sep 06 2014 23:12:07 */
!function (a, b, c) {
  !function (a) {
    "use strict";

     true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
  }(function (d) {
    "use strict";

    function e(a, b, c, e) {
      this.id = c, this.target = a, this.tooltip = F, this.elements = {
        target: a
      }, this._id = S + "-" + c, this.timers = {
        img: {}
      }, this.options = b, this.plugins = {}, this.cache = {
        event: {},
        target: d(),
        disabled: E,
        attr: e,
        onTooltip: E,
        lastClass: ""
      }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = E;
    }

    function f(a) {
      return a === F || "object" !== d.type(a);
    }

    function g(a) {
      return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then));
    }

    function h(a) {
      var b, c, e, h;
      return f(a) ? E : (f(a.metadata) && (a.metadata = {
        type: a.metadata
      }), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? b = a.content = {
        text: c = g(b) ? E : b
      } : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== E, delete b.ajax, b.text = function (a, b) {
        var f = c || d(this).attr(b.options.content.attr) || "Loading...",
            g = d.ajax(d.extend({}, e, {
          context: b
        })).then(e.success, F, e.error).then(function (a) {
          return a && h && b.set("content.text", a), a;
        }, function (a, c, d) {
          b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d);
        });
        return h ? f : (b.set("content.text", f), g);
      }), "title" in b && (d.isPlainObject(b.title) && (b.button = b.title.button, b.title = b.title.text), g(b.title || E) && (b.title = E))), "position" in a && f(a.position) && (a.position = {
        my: a.position,
        at: a.position
      }), "show" in a && f(a.show) && (a.show = a.show.jquery ? {
        target: a.show
      } : a.show === D ? {
        ready: D
      } : {
        event: a.show
      }), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? {
        target: a.hide
      } : {
        event: a.hide
      }), "style" in a && f(a.style) && (a.style = {
        classes: a.style
      }), d.each(R, function () {
        this.sanitize && this.sanitize(a);
      }), a);
    }

    function i(a, b) {
      for (var c, d = 0, e = a, f = b.split("."); e = e[f[d++]];) d < f.length && (c = e);

      return [c || a, f.pop()];
    }

    function j(a, b) {
      var c, d, e;

      for (c in this.checks) for (d in this.checks[c]) (e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b));
    }

    function k(a) {
      return V.concat("").join(a ? "-" + a + " " : " ");
    }

    function l(a, b) {
      return b > 0 ? setTimeout(d.proxy(a, this), b) : void a.call(this);
    }

    function m(a) {
      this.tooltip.hasClass(ab) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = l.call(this, function () {
        this.toggle(D, a);
      }, this.options.show.delay));
    }

    function n(a) {
      if (!this.tooltip.hasClass(ab) && !this.destroyed) {
        var b = d(a.relatedTarget),
            c = b.closest(W)[0] === this.tooltip[0],
            e = b[0] === this.options.show.target[0];
        if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try {
          a.preventDefault(), a.stopImmediatePropagation();
        } catch (f) {} else this.timers.hide = l.call(this, function () {
          this.toggle(E, a);
        }, this.options.hide.delay, this);
      }
    }

    function o(a) {
      !this.tooltip.hasClass(ab) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = l.call(this, function () {
        this.hide(a);
      }, this.options.hide.inactive));
    }

    function p(a) {
      this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
    }

    function q(a, c, e) {
      d(b.body).delegate(a, (c.split ? c : c.join("." + S + " ")) + "." + S, function () {
        var a = y.api[d.attr(this, U)];
        a && !a.disabled && e.apply(a, arguments);
      });
    }

    function r(a, c, f) {
      var g,
          i,
          j,
          k,
          l,
          m = d(b.body),
          n = a[0] === b ? m : a,
          o = a.metadata ? a.metadata(f.metadata) : F,
          p = "html5" === f.metadata.type && o ? o[f.metadata.name] : F,
          q = a.data(f.metadata.name || "qtipopts");

      try {
        q = "string" == typeof q ? d.parseJSON(q) : q;
      } catch (r) {}

      if (k = d.extend(D, {}, y.defaults, f, "object" == typeof q ? h(q) : F, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) {
        if (j = a.attr(k.content.attr), k.content.attr === E || !j) return E;
        k.content.text = j;
      }

      if (i.container.length || (i.container = m), i.target === E && (i.target = n), k.show.target === E && (k.show.target = n), k.show.solo === D && (k.show.solo = i.container.closest("body")), k.hide.target === E && (k.hide.target = n), k.position.viewport === D && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new A(i.at, D), i.my = new A(i.my), a.data(S)) if (k.overwrite) a.qtip("destroy", !0);else if (k.overwrite === E) return E;
      return a.attr(T, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(cb, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(S, g), g;
    }

    function s(a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    }

    function t(a, b) {
      var d,
          e,
          f = b.charAt(0).toUpperCase() + b.slice(1),
          g = (b + " " + rb.join(f + " ") + f).split(" "),
          h = 0;
      if (qb[b]) return a.css(qb[b]);

      for (; d = g[h++];) if ((e = a.css(d)) !== c) return qb[b] = d, e;
    }

    function u(a, b) {
      return Math.ceil(parseFloat(t(a, b)));
    }

    function v(a, b) {
      this._ns = "tip", this.options = b, this.offset = b.offset, this.size = [b.width, b.height], this.init(this.qtip = a);
    }

    function w(a, b) {
      this.options = b, this._ns = "-modal", this.init(this.qtip = a);
    }

    function x(a) {
      this._ns = "ie6", this.init(this.qtip = a);
    }

    var y,
        z,
        A,
        B,
        C,
        D = !0,
        E = !1,
        F = null,
        G = "x",
        H = "y",
        I = "width",
        J = "height",
        K = "top",
        L = "left",
        M = "bottom",
        N = "right",
        O = "center",
        P = "flipinvert",
        Q = "shift",
        R = {},
        S = "qtip",
        T = "data-hasqtip",
        U = "data-qtip-id",
        V = ["ui-widget", "ui-tooltip"],
        W = "." + S,
        X = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
        Y = S + "-fixed",
        Z = S + "-default",
        $ = S + "-focus",
        _ = S + "-hover",
        ab = S + "-disabled",
        bb = "_replacedByqTip",
        cb = "oldtitle",
        db = {
      ie: function () {
        for (var a = 4, c = b.createElement("div"); (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0]; a += 1);

        return a > 4 ? a : 0 / 0;
      }(),
      iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || E
    };

    z = e.prototype, z._when = function (a) {
      return d.when.apply(d, a);
    }, z.render = function (a) {
      if (this.rendered || this.destroyed) return this;
      var b,
          c = this,
          e = this.options,
          f = this.cache,
          g = this.elements,
          h = e.content.text,
          i = e.content.title,
          j = e.content.button,
          k = e.position,
          l = ("." + this._id + " ", []);
      return d.attr(this.target[0], "aria-describedby", this._id), f.posClass = this._createPosClass((this.position = {
        my: k.my,
        at: k.at
      }).my), this.tooltip = g.tooltip = b = d("<div/>", {
        id: this._id,
        "class": [S, Z, e.style.classes, f.posClass].join(" "),
        width: e.style.width || "",
        height: e.style.height || "",
        tracking: "mouse" === k.target && k.adjust.mouse,
        role: "alert",
        "aria-live": "polite",
        "aria-atomic": E,
        "aria-describedby": this._id + "-content",
        "aria-hidden": D
      }).toggleClass(ab, this.disabled).attr(U, this.id).data(S, this).appendTo(k.container).append(g.content = d("<div />", {
        "class": S + "-content",
        id: this._id + "-content",
        "aria-atomic": D
      })), this.rendered = -1, this.positioning = D, i && (this._createTitle(), d.isFunction(i) || l.push(this._updateTitle(i, E))), j && this._createButton(), d.isFunction(h) || l.push(this._updateContent(h, E)), this.rendered = D, this._setWidget(), d.each(R, function (a) {
        var b;
        "render" === this.initialize && (b = this(c)) && (c.plugins[a] = b);
      }), this._unassignEvents(), this._assignEvents(), this._when(l).then(function () {
        c._trigger("render"), c.positioning = E, c.hiddenDuringWait || !e.show.ready && !a || c.toggle(D, f.event, E), c.hiddenDuringWait = E;
      }), y.api[this.id] = this, this;
    }, z.destroy = function (a) {
      function b() {
        if (!this.destroyed) {
          this.destroyed = D;
          var a,
              b = this.target,
              c = b.attr(cb);
          this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function () {
            this.destroy && this.destroy();
          });

          for (a in this.timers) clearTimeout(this.timers[a]);

          b.removeData(S).removeAttr(U).removeAttr(T).removeAttr("aria-describedby"), this.options.suppress && c && b.attr("title", c).removeAttr(cb), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = F, delete y.api[this.id];
        }
      }

      return this.destroyed ? this.target : (a === D && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target);
    }, B = z.checks = {
      builtin: {
        "^id$": function (a, b, c, e) {
          var f = c === D ? y.nextid : c,
              g = S + "-" + f;
          f !== E && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e;
        },
        "^prerender": function (a, b, c) {
          c && !this.rendered && this.render(this.options.show.ready);
        },
        "^content.text$": function (a, b, c) {
          this._updateContent(c);
        },
        "^content.attr$": function (a, b, c, d) {
          this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c));
        },
        "^content.title$": function (a, b, c) {
          return c ? (c && !this.elements.title && this._createTitle(), void this._updateTitle(c)) : this._removeTitle();
        },
        "^content.button$": function (a, b, c) {
          this._updateButton(c);
        },
        "^content.title.(text|button)$": function (a, b, c) {
          this.set("content." + b, c);
        },
        "^position.(my|at)$": function (a, b, c) {
          "string" == typeof c && (this.position[b] = a[b] = new A(c, "at" === b));
        },
        "^position.container$": function (a, b, c) {
          this.rendered && this.tooltip.appendTo(c);
        },
        "^show.ready$": function (a, b, c) {
          c && (!this.rendered && this.render(D) || this.toggle(D));
        },
        "^style.classes$": function (a, b, c, d) {
          this.rendered && this.tooltip.removeClass(d).addClass(c);
        },
        "^style.(width|height)": function (a, b, c) {
          this.rendered && this.tooltip.css(b, c);
        },
        "^style.widget|content.title": function () {
          this.rendered && this._setWidget();
        },
        "^style.def": function (a, b, c) {
          this.rendered && this.tooltip.toggleClass(Z, !!c);
        },
        "^events.(render|show|move|hide|focus|blur)$": function (a, b, c) {
          this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c);
        },
        "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
          if (this.rendered) {
            var a = this.options.position;
            this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents();
          }
        }
      }
    }, z.get = function (a) {
      if (this.destroyed) return this;
      var b = i(this.options, a.toLowerCase()),
          c = b[0][b[1]];
      return c.precedance ? c.string() : c;
    };
    var eb = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
        fb = /^prerender|show\.ready/i;
    z.set = function (a, b) {
      if (this.destroyed) return this;
      {
        var c,
            e = this.rendered,
            f = E,
            g = this.options;
        this.checks;
      }
      return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function (b, c) {
        if (e && fb.test(b)) return void delete a[b];
        var h,
            j = i(g, b.toLowerCase());
        h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = eb.test(b) || f, a[b] = [j[0], j[1], c, h];
      }), h(g), this.positioning = D, d.each(a, d.proxy(j, this)), this.positioning = E, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? F : this.cache.event), this;
    }, z._update = function (a, b) {
      var c = this,
          e = this.cache;
      return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = D, a.then(function (a) {
        return e.waiting = E, c._update(a, b);
      }, F, function (a) {
        return c._update(a, b);
      })) : a === E || !a && "" !== a ? E : (a.jquery && a.length > 0 ? b.empty().append(a.css({
        display: "block",
        visibility: "visible"
      })) : b.html(a), this._waitForContent(b).then(function (a) {
        c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length);
      }))) : E;
    }, z._waitForContent = function (a) {
      var b = this.cache;
      return b.waiting = D, (d.fn.imagesLoaded ? a.imagesLoaded() : d.Deferred().resolve([])).done(function () {
        b.waiting = E;
      }).promise();
    }, z._updateContent = function (a, b) {
      this._update(a, this.elements.content, b);
    }, z._updateTitle = function (a, b) {
      this._update(a, this.elements.title, b) === E && this._removeTitle(E);
    }, z._createTitle = function () {
      var a = this.elements,
          b = this._id + "-title";
      a.titlebar && this._removeTitle(), a.titlebar = d("<div />", {
        "class": S + "-titlebar " + (this.options.style.widget ? k("header") : "")
      }).append(a.title = d("<div />", {
        id: b,
        "class": S + "-title",
        "aria-atomic": D
      })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (a) {
        d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4));
      }).delegate(".qtip-close", "mouseover mouseout", function (a) {
        d(this).toggleClass("ui-state-hover", "mouseover" === a.type);
      }), this.options.content.button && this._createButton();
    }, z._removeTitle = function (a) {
      var b = this.elements;
      b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = F, a !== E && this.reposition());
    }, z._createPosClass = function (a) {
      return S + "-pos-" + (a || this.options.position.my).abbrev();
    }, z.reposition = function (c, e) {
      if (!this.rendered || this.positioning || this.destroyed) return this;
      this.positioning = D;
      var f,
          g,
          h,
          i,
          j = this.cache,
          k = this.tooltip,
          l = this.options.position,
          m = l.target,
          n = l.my,
          o = l.at,
          p = l.viewport,
          q = l.container,
          r = l.adjust,
          s = r.method.split(" "),
          t = k.outerWidth(E),
          u = k.outerHeight(E),
          v = 0,
          w = 0,
          x = k.css("position"),
          y = {
        left: 0,
        top: 0
      },
          z = k[0].offsetWidth > 0,
          A = c && "scroll" === c.type,
          B = d(a),
          C = q[0].ownerDocument,
          F = this.mouse;
      if (d.isArray(m) && 2 === m.length) o = {
        x: L,
        y: K
      }, y = {
        left: m[0],
        top: m[1]
      };else if ("mouse" === m) o = {
        x: L,
        y: K
      }, (!r.mouse || this.options.hide.distance) && j.origin && j.origin.pageX ? c = j.origin : !c || c && ("resize" === c.type || "scroll" === c.type) ? c = j.event : F && F.pageX && (c = F), "static" !== x && (y = q.offset()), C.body.offsetWidth !== (a.innerWidth || C.documentElement.clientWidth) && (g = d(b.body).offset()), y = {
        left: c.pageX - y.left + (g && g.left || 0),
        top: c.pageY - y.top + (g && g.top || 0)
      }, r.mouse && A && F && (y.left -= (F.scrollX || 0) - B.scrollLeft(), y.top -= (F.scrollY || 0) - B.scrollTop());else {
        if ("event" === m ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? j.target = d(c.target) : c.target || (j.target = this.elements.target) : "event" !== m && (j.target = d(m.jquery ? m : this.elements.target)), m = j.target, m = d(m).eq(0), 0 === m.length) return this;
        m[0] === b || m[0] === a ? (v = db.iOS ? a.innerWidth : m.width(), w = db.iOS ? a.innerHeight : m.height(), m[0] === a && (y = {
          top: (p || m).scrollTop(),
          left: (p || m).scrollLeft()
        })) : R.imagemap && m.is("area") ? f = R.imagemap(this, m, o, R.viewport ? s : E) : R.svg && m && m[0].ownerSVGElement ? f = R.svg(this, m, o, R.viewport ? s : E) : (v = m.outerWidth(E), w = m.outerHeight(E), y = m.offset()), f && (v = f.width, w = f.height, g = f.offset, y = f.position), y = this.reposition.offset(m, y, q), (db.iOS > 3.1 && db.iOS < 4.1 || db.iOS >= 4.3 && db.iOS < 4.33 || !db.iOS && "fixed" === x) && (y.left -= B.scrollLeft(), y.top -= B.scrollTop()), (!f || f && f.adjustable !== E) && (y.left += o.x === N ? v : o.x === O ? v / 2 : 0, y.top += o.y === M ? w : o.y === O ? w / 2 : 0);
      }
      return y.left += r.x + (n.x === N ? -t : n.x === O ? -t / 2 : 0), y.top += r.y + (n.y === M ? -u : n.y === O ? -u / 2 : 0), R.viewport ? (h = y.adjusted = R.viewport(this, y, l, v, w, t, u), g && h.left && (y.left += g.left), g && h.top && (y.top += g.top), h.my && (this.position.my = h.my)) : y.adjusted = {
        left: 0,
        top: 0
      }, j.posClass !== (i = this._createPosClass(this.position.my)) && k.removeClass(j.posClass).addClass(j.posClass = i), this._trigger("move", [y, p.elem || p], c) ? (delete y.adjusted, e === E || !z || isNaN(y.left) || isNaN(y.top) || "mouse" === m || !d.isFunction(l.effect) ? k.css(y) : d.isFunction(l.effect) && (l.effect.call(k, this, d.extend({}, y)), k.queue(function (a) {
        d(this).css({
          opacity: "",
          height: ""
        }), db.ie && this.style.removeAttribute("filter"), a();
      })), this.positioning = E, this) : this;
    }, z.reposition.offset = function (a, c, e) {
      function f(a, b) {
        c.left += b * a.scrollLeft(), c.top += b * a.scrollTop();
      }

      if (!e[0]) return c;
      var g,
          h,
          i,
          j,
          k = d(a[0].ownerDocument),
          l = !!db.ie && "CSS1Compat" !== b.compatMode,
          m = e[0];

      do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent);

      return g && (g[0] !== k[0] || l) && f(g, 1), c;
    };

    var gb = (A = z.reposition.Corner = function (a, b) {
      a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, O).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b;
      var c = a.charAt(0);
      this.precedance = "t" === c || "b" === c ? H : G;
    }).prototype;

    gb.invert = function (a, b) {
      this[a] = this[a] === L ? N : this[a] === N ? L : b || this[a];
    }, gb.string = function (a) {
      var b = this.x,
          c = this.y,
          d = b !== c ? "center" === b || "center" !== c && (this.precedance === H || this.forceY) ? [c, b] : [b, c] : [b];
      return a !== !1 ? d.join(" ") : d;
    }, gb.abbrev = function () {
      var a = this.string(!1);
      return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "");
    }, gb.clone = function () {
      return new A(this.string(), this.forceY);
    }, z.toggle = function (a, c) {
      var e = this.cache,
          f = this.options,
          g = this.tooltip;

      if (c) {
        if (/over|enter/.test(c.type) && e.event && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this;
        e.event = d.event.fix(c);
      }

      if (this.waiting && !a && (this.hiddenDuringWait = D), !this.rendered) return a ? this.render(1) : this;
      if (this.destroyed || this.disabled) return this;
      var h,
          i,
          j,
          k = a ? "show" : "hide",
          l = this.options[k],
          m = (this.options[a ? "hide" : "show"], this.options.position),
          n = this.options.content,
          o = this.tooltip.css("width"),
          p = this.tooltip.is(":visible"),
          q = a || 1 === l.target.length,
          r = !c || l.target.length < 2 || e.target[0] === c.target;
      return (typeof a).search("boolean|number") && (a = !p), h = !g.is(":animated") && p === a && r, i = h ? F : !!this._trigger(k, [90]), this.destroyed ? this : (i !== E && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (this.mouse && (e.origin = d.event.fix(this.mouse)), d.isFunction(n.text) && this._updateContent(n.text, E), d.isFunction(n.title) && this._updateTitle(n.title, E), !C && "mouse" === m.target && m.adjust.mouse && (d(b).bind("mousemove." + S, this._storeMouse), C = D), o || g.css("width", g.outerWidth(E)), this.reposition(c, arguments[2]), o || g.css("width", ""), l.solo && ("string" == typeof l.solo ? d(l.solo) : d(W, l.solo)).not(g).not(l.target).qtip("hide", d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, C && !d(W + '[tracking="true"]:visible', l.solo).not(g).length && (d(b).unbind("mousemove." + S), C = E), this.blur(c)), j = d.proxy(function () {
        a ? (db.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof l.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({
          display: "",
          visibility: "",
          opacity: "",
          left: "",
          top: ""
        }), this._trigger(a ? "visible" : "hidden");
      }, this), l.effect === E || q === E ? (g[k](), j()) : d.isFunction(l.effect) ? (g.stop(1, 1), l.effect.call(g, this), g.queue("fx", function (a) {
        j(), a();
      })) : g.fadeTo(90, a ? 1 : 0, j), a && l.target.trigger("qtip-" + this.id + "-inactive"), this));
    }, z.show = function (a) {
      return this.toggle(D, a);
    }, z.hide = function (a) {
      return this.toggle(E, a);
    }, z.focus = function (a) {
      if (!this.rendered || this.destroyed) return this;
      var b = d(W),
          c = this.tooltip,
          e = parseInt(c[0].style.zIndex, 10),
          f = y.zindex + b.length;
      return c.hasClass($) || this._trigger("focus", [f], a) && (e !== f && (b.each(function () {
        this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1);
      }), b.filter("." + $).qtip("blur", a)), c.addClass($)[0].style.zIndex = f), this;
    }, z.blur = function (a) {
      return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass($), this._trigger("blur", [this.tooltip.css("zIndex")], a), this);
    }, z.disable = function (a) {
      return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass(ab) : this.disabled) : "boolean" != typeof a && (a = D), this.rendered && this.tooltip.toggleClass(ab, a).attr("aria-disabled", a), this.disabled = !!a, this);
    }, z.enable = function () {
      return this.disable(E);
    }, z._createButton = function () {
      var a = this,
          b = this.elements,
          c = b.tooltip,
          e = this.options.content.button,
          f = "string" == typeof e,
          g = f ? e : "Close tooltip";
      b.button && b.button.remove(), b.button = e.jquery ? e : d("<a />", {
        "class": "qtip-close " + (this.options.style.widget ? "" : S + "-icon"),
        title: g,
        "aria-label": g
      }).prepend(d("<span />", {
        "class": "ui-icon ui-icon-close",
        html: "&times;"
      })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function (b) {
        return c.hasClass(ab) || a.hide(b), E;
      });
    }, z._updateButton = function (a) {
      if (!this.rendered) return E;
      var b = this.elements.button;
      a ? this._createButton() : b.remove();
    }, z._setWidget = function () {
      var a = this.options.style.widget,
          b = this.elements,
          c = b.tooltip,
          d = c.hasClass(ab);
      c.removeClass(ab), ab = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass(ab, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(Z, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(S + "-icon", !a);
    }, z._storeMouse = function (a) {
      return (this.mouse = d.event.fix(a)).type = "mousemove", this;
    }, z._bind = function (a, b, c, e, f) {
      if (a && c && b.length) {
        var g = "." + this._id + (e ? "-" + e : "");
        return d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this)), this;
      }
    }, z._unbind = function (a, b) {
      return a && d(a).unbind("." + this._id + (b ? "-" + b : "")), this;
    }, z._trigger = function (a, b, c) {
      var e = d.Event("tooltip" + a);
      return e.originalEvent = c && d.extend({}, c) || this.cache.event || F, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = E, !e.isDefaultPrevented();
    }, z._bindEvents = function (a, b, c, e, f, g) {
      var h = c.filter(e).add(e.filter(c)),
          i = [];
      h.length && (d.each(b, function (b, c) {
        var e = d.inArray(c, a);
        e > -1 && i.push(a.splice(e, 1)[0]);
      }), i.length && (this._bind(h, i, function (a) {
        var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
        (b ? g : f).call(this, a);
      }), c = c.not(h), e = e.not(h))), this._bind(c, a, f), this._bind(e, b, g);
    }, z._assignInitialEvents = function (a) {
      function b(a) {
        return this.disabled || this.destroyed ? E : (this.cache.event = a && d.event.fix(a), this.cache.target = a && d(a.target), clearTimeout(this.timers.show), void (this.timers.show = l.call(this, function () {
          this.render("object" == typeof a || c.show.ready);
        }, c.prerender ? 0 : c.show.delay)));
      }

      var c = this.options,
          e = c.show.target,
          f = c.hide.target,
          g = c.show.event ? d.trim("" + c.show.event).split(" ") : [],
          h = c.hide.event ? d.trim("" + c.hide.event).split(" ") : [];
      this._bind(this.elements.target, ["remove", "removeqtip"], function () {
        this.destroy(!0);
      }, "destroy"), /mouse(over|enter)/i.test(c.show.event) && !/mouse(out|leave)/i.test(c.hide.event) && h.push("mouseleave"), this._bind(e, "mousemove", function (a) {
        this._storeMouse(a), this.cache.onTarget = D;
      }), this._bindEvents(g, h, e, f, b, function () {
        return this.timers ? void clearTimeout(this.timers.show) : E;
      }), (c.show.ready || c.prerender) && b.call(this, a);
    }, z._assignEvents = function () {
      var c = this,
          e = this.options,
          f = e.position,
          g = this.tooltip,
          h = e.show.target,
          i = e.hide.target,
          j = f.container,
          k = f.viewport,
          l = d(b),
          q = (d(b.body), d(a)),
          r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
          s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
      d.each(e.events, function (a, b) {
        c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g);
      }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function (a) {
        /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a);
      }), e.hide.fixed ? i = i.add(g.addClass(Y)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function () {
        clearTimeout(this.timers.show);
      }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function (a) {
        var b = d(a.target),
            c = this.rendered && !this.tooltip.hasClass(ab) && this.tooltip[0].offsetWidth > 0,
            e = b.parents(W).filter(this.tooltip[0]).length > 0;
        b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a);
      }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"), this._bind(i.add(g), y.inactiveEvents, o)), this._bindEvents(r, s, h, i, m, n), this._bind(h.add(g), "mousemove", function (a) {
        if ("number" == typeof e.hide.distance) {
          var b = this.cache.origin || {},
              c = this.options.hide.distance,
              d = Math.abs;
          (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a);
        }

        this._storeMouse(a);
      }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function (a) {
        return this.cache ? void (this.cache.onTarget = "mouseenter" === a.type) : E;
      }), this._bind(l, "mousemove", function (a) {
        this.rendered && this.cache.onTarget && !this.tooltip.hasClass(ab) && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
      })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : q, "resize", p), f.adjust.scroll && this._bind(q.add(f.container), "scroll", p);
    }, z._unassignEvents = function () {
      var c = this.options,
          e = c.show.target,
          f = c.hide.target,
          g = d.grep([this.elements.target[0], this.rendered && this.tooltip[0], c.position.container[0], c.position.viewport[0], c.position.container.closest("html")[0], a, b], function (a) {
        return "object" == typeof a;
      });
      e && e.toArray && (g = g.concat(e.toArray())), f && f.toArray && (g = g.concat(f.toArray())), this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive");
    }, d(function () {
      q(W, ["mouseenter", "mouseleave"], function (a) {
        var b = "mouseenter" === a.type,
            c = d(a.currentTarget),
            e = d(a.relatedTarget || a.target),
            f = this.options;
        b ? (this.focus(a), c.hasClass(Y) && !c.hasClass(ab) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.position.adjust.mouse && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass(_, b);
      }), q("[" + U + "]", X, o);
    }), y = d.fn.qtip = function (a, b, e) {
      var f = ("" + a).toLowerCase(),
          g = F,
          i = d.makeArray(arguments).slice(1),
          j = i[i.length - 1],
          k = this[0] ? d.data(this[0], S) : F;
      return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function () {
        var a = d.data(this, S);
        if (!a) return D;
        if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i);else {
          if (e === c && !d.isPlainObject(b)) return g = a.get(b), E;
          a.set(b, e);
        }
      }), g !== F ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(D, {}, a)), this.each(function (a) {
        var b, c;
        return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === E || c.length < 1 || y.api[c] ? y.nextid++ : c, b = r(d(this), c, k), b === E ? D : (y.api[c] = b, d.each(R, function () {
          "initialize" === this.initialize && this(b);
        }), void b._assignInitialEvents(j));
      }));
    }, d.qtip = e, y.api = {}, d.each({
      attr: function (a, b) {
        if (this.length) {
          var c = this[0],
              e = "title",
              f = d.data(c, "qtip");
          if (a === e && f && "object" == typeof f && f.options.suppress) return arguments.length < 2 ? d.attr(c, cb) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(cb, b));
        }

        return d.fn["attr" + bb].apply(this, arguments);
      },
      clone: function (a) {
        var b = (d([]), d.fn["clone" + bb].apply(this, arguments));
        return a || b.filter("[" + cb + "]").attr("title", function () {
          return d.attr(this, cb);
        }).removeAttr(cb), b;
      }
    }, function (a, b) {
      if (!b || d.fn[a + bb]) return D;
      var c = d.fn[a + bb] = d.fn[a];

      d.fn[a] = function () {
        return b.apply(this, arguments) || c.apply(this, arguments);
      };
    }), d.ui || (d["cleanData" + bb] = d.cleanData, d.cleanData = function (a) {
      for (var b, c = 0; (b = d(a[c])).length; c++) if (b.attr(T)) try {
        b.triggerHandler("removeqtip");
      } catch (e) {}

      d["cleanData" + bb].apply(this, arguments);
    }), y.version = "2.2.1", y.nextid = 0, y.inactiveEvents = X, y.zindex = 15e3, y.defaults = {
      prerender: E,
      id: E,
      overwrite: D,
      suppress: D,
      content: {
        text: D,
        attr: "title",
        title: E,
        button: E
      },
      position: {
        my: "top left",
        at: "bottom right",
        target: E,
        container: E,
        viewport: E,
        adjust: {
          x: 0,
          y: 0,
          mouse: D,
          scroll: D,
          resize: D,
          method: "flipinvert flipinvert"
        },
        effect: function (a, b) {
          d(this).animate(b, {
            duration: 200,
            queue: E
          });
        }
      },
      show: {
        target: E,
        event: "mouseenter",
        effect: D,
        delay: 90,
        solo: E,
        ready: E,
        autofocus: E
      },
      hide: {
        target: E,
        event: "mouseleave",
        effect: D,
        delay: 0,
        fixed: E,
        inactive: E,
        leave: "window",
        distance: E
      },
      style: {
        classes: "",
        widget: E,
        width: E,
        height: E,
        def: D
      },
      events: {
        render: F,
        move: F,
        show: F,
        hide: F,
        toggle: F,
        visible: F,
        hidden: F,
        focus: F,
        blur: F
      }
    };
    var hb,
        ib = "margin",
        jb = "border",
        kb = "color",
        lb = "background-color",
        mb = "transparent",
        nb = " !important",
        ob = !!b.createElement("canvas").getContext,
        pb = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
        qb = {},
        rb = ["Webkit", "O", "Moz", "ms"];
    if (ob) var sb = a.devicePixelRatio || 1,
        tb = function () {
      var a = b.createElement("canvas").getContext("2d");
      return a.backingStorePixelRatio || a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || 1;
    }(),
        ub = sb / tb;else var vb = function (a, b, c) {
      return "<qtipvml:" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (b || "") + ' style="behavior: url(#default#VML); ' + (c || "") + '" />';
    };
    d.extend(v.prototype, {
      init: function (a) {
        var b, c;
        c = this.element = a.elements.tip = d("<div />", {
          "class": S + "-tip"
        }).prependTo(a.tooltip), ob ? (b = d("<canvas />").appendTo(this.element)[0].getContext("2d"), b.lineJoin = "miter", b.miterLimit = 1e5, b.save()) : (b = vb("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(b + b), a._bind(d("*", c).add(c), ["click", "mousedown"], function (a) {
          a.stopPropagation();
        }, this._ns)), a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create();
      },
      _swapDimensions: function () {
        this.size[0] = this.options.height, this.size[1] = this.options.width;
      },
      _resetDimensions: function () {
        this.size[0] = this.options.width, this.size[1] = this.options.height;
      },
      _useTitle: function (a) {
        var b = this.qtip.elements.titlebar;
        return b && (a.y === K || a.y === O && this.element.position().top + this.size[1] / 2 + this.options.offset < b.outerHeight(D));
      },
      _parseCorner: function (a) {
        var b = this.qtip.options.position.my;
        return a === E || b === E ? a = E : a === D ? a = new A(b.string()) : a.string || (a = new A(a), a.fixed = D), a;
      },
      _parseWidth: function (a, b, c) {
        var d = this.qtip.elements,
            e = jb + s(b) + "Width";
        return (c ? u(c, e) : u(d.content, e) || u(this._useTitle(a) && d.titlebar || d.content, e) || u(d.tooltip, e)) || 0;
      },
      _parseRadius: function (a) {
        var b = this.qtip.elements,
            c = jb + s(a.y) + s(a.x) + "Radius";
        return db.ie < 9 ? 0 : u(this._useTitle(a) && b.titlebar || b.content, c) || u(b.tooltip, c) || 0;
      },
      _invalidColour: function (a, b, c) {
        var d = a.css(b);
        return !d || c && d === a.css(c) || pb.test(d) ? E : d;
      },
      _parseColours: function (a) {
        var b = this.qtip.elements,
            c = this.element.css("cssText", ""),
            e = jb + s(a[a.precedance]) + s(kb),
            f = this._useTitle(a) && b.titlebar || b.content,
            g = this._invalidColour,
            h = [];
        return h[0] = g(c, lb) || g(f, lb) || g(b.content, lb) || g(b.tooltip, lb) || c.css(lb), h[1] = g(c, e, kb) || g(f, e, kb) || g(b.content, e, kb) || g(b.tooltip, e, kb) || b.tooltip.css(e), d("*", c).add(c).css("cssText", lb + ":" + mb + nb + ";" + jb + ":0" + nb + ";"), h;
      },
      _calculateSize: function (a) {
        var b,
            c,
            d,
            e = a.precedance === H,
            f = this.options.width,
            g = this.options.height,
            h = "c" === a.abbrev(),
            i = (e ? f : g) * (h ? .5 : 1),
            j = Math.pow,
            k = Math.round,
            l = Math.sqrt(j(i, 2) + j(g, 2)),
            m = [this.border / i * l, this.border / g * l];
        return m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2)), m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2)), b = l + m[2] + m[3] + (h ? 0 : m[0]), c = b / l, d = [k(c * f), k(c * g)], e ? d : d.reverse();
      },
      _calculateTip: function (a, b, c) {
        c = c || 1, b = b || this.size;
        var d = b[0] * c,
            e = b[1] * c,
            f = Math.ceil(d / 2),
            g = Math.ceil(e / 2),
            h = {
          br: [0, 0, d, e, d, 0],
          bl: [0, 0, d, 0, 0, e],
          tr: [0, e, d, 0, d, e],
          tl: [0, 0, 0, e, d, e],
          tc: [0, e, f, 0, d, e],
          bc: [0, 0, d, 0, f, e],
          rc: [0, 0, d, g, 0, e],
          lc: [d, 0, d, e, 0, g]
        };
        return h.lt = h.br, h.rt = h.bl, h.lb = h.tr, h.rb = h.tl, h[a.abbrev()];
      },
      _drawCoords: function (a, b) {
        a.beginPath(), a.moveTo(b[0], b[1]), a.lineTo(b[2], b[3]), a.lineTo(b[4], b[5]), a.closePath();
      },
      create: function () {
        var a = this.corner = (ob || db.ie) && this._parseCorner(this.options.corner);

        return (this.enabled = !!this.corner && "c" !== this.corner.abbrev()) && (this.qtip.cache.corner = a.clone(), this.update()), this.element.toggle(this.enabled), this.corner;
      },
      update: function (b, c) {
        if (!this.enabled) return this;
        var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m = this.qtip.elements,
            n = this.element,
            o = n.children(),
            p = this.options,
            q = this.size,
            r = p.mimic,
            s = Math.round;
        b || (b = this.qtip.cache.corner || this.corner), r === E ? r = b : (r = new A(r), r.precedance = b.precedance, "inherit" === r.x ? r.x = b.x : "inherit" === r.y ? r.y = b.y : r.x === r.y && (r[b.precedance] = b[b.precedance])), f = r.precedance, b.precedance === G ? this._swapDimensions() : this._resetDimensions(), e = this.color = this._parseColours(b), e[1] !== mb ? (l = this.border = this._parseWidth(b, b[b.precedance]), p.border && 1 > l && !pb.test(e[1]) && (e[0] = e[1]), this.border = l = p.border !== D ? p.border : l) : this.border = l = 0, k = this.size = this._calculateSize(b), n.css({
          width: k[0],
          height: k[1],
          lineHeight: k[1] + "px"
        }), j = b.precedance === H ? [s(r.x === L ? l : r.x === N ? k[0] - q[0] - l : (k[0] - q[0]) / 2), s(r.y === K ? k[1] - q[1] : 0)] : [s(r.x === L ? k[0] - q[0] : 0), s(r.y === K ? l : r.y === M ? k[1] - q[1] - l : (k[1] - q[1]) / 2)], ob ? (g = o[0].getContext("2d"), g.restore(), g.save(), g.clearRect(0, 0, 6e3, 6e3), h = this._calculateTip(r, q, ub), i = this._calculateTip(r, this.size, ub), o.attr(I, k[0] * ub).attr(J, k[1] * ub), o.css(I, k[0]).css(J, k[1]), this._drawCoords(g, i), g.fillStyle = e[1], g.fill(), g.translate(j[0] * ub, j[1] * ub), this._drawCoords(g, h), g.fillStyle = e[0], g.fill()) : (h = this._calculateTip(r), h = "m" + h[0] + "," + h[1] + " l" + h[2] + "," + h[3] + " " + h[4] + "," + h[5] + " xe", j[2] = l && /^(r|b)/i.test(b.string()) ? 8 === db.ie ? 2 : 1 : 0, o.css({
          coordsize: k[0] + l + " " + (k[1] + l),
          antialias: "" + (r.string().indexOf(O) > -1),
          left: j[0] - j[2] * Number(f === G),
          top: j[1] - j[2] * Number(f === H),
          width: k[0] + l,
          height: k[1] + l
        }).each(function (a) {
          var b = d(this);
          b[b.prop ? "prop" : "attr"]({
            coordsize: k[0] + l + " " + (k[1] + l),
            path: h,
            fillcolor: e[0],
            filled: !!a,
            stroked: !a
          }).toggle(!(!l && !a)), !a && b.html(vb("stroke", 'weight="' + 2 * l + 'px" color="' + e[1] + '" miterlimit="1000" joinstyle="miter"'));
        })), a.opera && setTimeout(function () {
          m.tip.css({
            display: "inline-block",
            visibility: "visible"
          });
        }, 1), c !== E && this.calculate(b, k);
      },
      calculate: function (a, b) {
        if (!this.enabled) return E;
        var c,
            e,
            f = this,
            g = this.qtip.elements,
            h = this.element,
            i = this.options.offset,
            j = (g.tooltip.hasClass("ui-widget"), {});
        return a = a || this.corner, c = a.precedance, b = b || this._calculateSize(a), e = [a.x, a.y], c === G && e.reverse(), d.each(e, function (d, e) {
          var h, k, l;
          e === O ? (h = c === H ? L : K, j[h] = "50%", j[ib + "-" + h] = -Math.round(b[c === H ? 0 : 1] / 2) + i) : (h = f._parseWidth(a, e, g.tooltip), k = f._parseWidth(a, e, g.content), l = f._parseRadius(a), j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h)));
        }), j[a[c]] -= b[c === G ? 0 : 1], h.css({
          margin: "",
          top: "",
          bottom: "",
          left: "",
          right: ""
        }).css(j), j;
      },
      reposition: function (a, b, d) {
        function e(a, b, c, d, e) {
          a === Q && j.precedance === b && k[d] && j[c] !== O ? j.precedance = j.precedance === G ? H : G : a !== Q && k[d] && (j[b] = j[b] === O ? k[d] > 0 ? d : e : j[b] === d ? e : d);
        }

        function f(a, b, e) {
          j[a] === O ? p[ib + "-" + b] = o[a] = g[ib + "-" + b] - k[b] : (h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]], (o[a] = Math.max(h[0], h[1])) > h[0] && (d[b] -= k[b], o[b] = E), p[g[e] !== c ? e : b] = o[a]);
        }

        if (this.enabled) {
          var g,
              h,
              i = b.cache,
              j = this.corner.clone(),
              k = d.adjusted,
              l = b.options.position.adjust.method.split(" "),
              m = l[0],
              n = l[1] || l[0],
              o = {
            left: E,
            top: E,
            x: 0,
            y: 0
          },
              p = {};
          this.corner.fixed !== D && (e(m, G, H, L, N), e(n, H, G, K, M), (j.string() !== i.corner.string() || i.cornerTop !== k.top || i.cornerLeft !== k.left) && this.update(j, E)), g = this.calculate(j), g.right !== c && (g.left = -g.right), g.bottom !== c && (g.top = -g.bottom), g.user = this.offset, (o.left = m === Q && !!k.left) && f(G, L, N), (o.top = n === Q && !!k.top) && f(H, K, M), this.element.css(p).toggle(!(o.x && o.y || j.x === O && o.y || j.y === O && o.x)), d.left -= g.left.charAt ? g.user : m !== Q || o.top || !o.left && !o.top ? g.left + this.border : 0, d.top -= g.top.charAt ? g.user : n !== Q || o.left || !o.left && !o.top ? g.top + this.border : 0, i.cornerLeft = k.left, i.cornerTop = k.top, i.corner = j.clone();
        }
      },
      destroy: function () {
        this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove();
      }
    }), hb = R.tip = function (a) {
      return new v(a, a.options.style.tip);
    }, hb.initialize = "render", hb.sanitize = function (a) {
      if (a.style && "tip" in a.style) {
        var b = a.style.tip;
        "object" != typeof b && (b = a.style.tip = {
          corner: b
        }), /string|boolean/i.test(typeof b.corner) || (b.corner = D);
      }
    }, B.tip = {
      "^position.my|style.tip.(corner|mimic|border)$": function () {
        this.create(), this.qtip.reposition();
      },
      "^style.tip.(height|width)$": function (a) {
        this.size = [a.width, a.height], this.update(), this.qtip.reposition();
      },
      "^content.title|style.(classes|widget)$": function () {
        this.update();
      }
    }, d.extend(D, y.defaults, {
      style: {
        tip: {
          corner: D,
          mimic: E,
          width: 6,
          height: 6,
          border: D,
          offset: 0
        }
      }
    });
    var wb,
        xb,
        yb = "qtip-modal",
        zb = "." + yb;
    xb = function () {
      function a(a) {
        if (d.expr[":"].focusable) return d.expr[":"].focusable;
        var b,
            c,
            e,
            f = !isNaN(d.attr(a, "tabindex")),
            g = a.nodeName && a.nodeName.toLowerCase();
        return "area" === g ? (b = a.parentNode, c = b.name, a.href && c && "map" === b.nodeName.toLowerCase() ? (e = d("img[usemap=#" + c + "]")[0], !!e && e.is(":visible")) : !1) : /input|select|textarea|button|object/.test(g) ? !a.disabled : "a" === g ? a.href || f : f;
      }

      function c(a) {
        k.length < 1 && a.length ? a.not("body").blur() : k.first().focus();
      }

      function e(a) {
        if (i.is(":visible")) {
          var b,
              e = d(a.target),
              h = f.tooltip,
              j = e.closest(W);
          b = j.length < 1 ? E : parseInt(j[0].style.zIndex, 10) > parseInt(h[0].style.zIndex, 10), b || e.closest(W)[0] === h[0] || c(e), g = a.target === k[k.length - 1];
        }
      }

      var f,
          g,
          h,
          i,
          j = this,
          k = {};
      d.extend(j, {
        init: function () {
          return i = j.elem = d("<div />", {
            id: "qtip-overlay",
            html: "<div></div>",
            mousedown: function () {
              return E;
            }
          }).hide(), d(b.body).bind("focusin" + zb, e), d(b).bind("keydown" + zb, function (a) {
            f && f.options.show.modal.escape && 27 === a.keyCode && f.hide(a);
          }), i.bind("click" + zb, function (a) {
            f && f.options.show.modal.blur && f.hide(a);
          }), j;
        },
        update: function (b) {
          f = b, k = b.options.show.modal.stealfocus !== E ? b.tooltip.find("*").filter(function () {
            return a(this);
          }) : [];
        },
        toggle: function (a, e, g) {
          var k = (d(b.body), a.tooltip),
              l = a.options.show.modal,
              m = l.effect,
              n = e ? "show" : "hide",
              o = i.is(":visible"),
              p = d(zb).filter(":visible:not(:animated)").not(k);
          return j.update(a), e && l.stealfocus !== E && c(d(":focus")), i.toggleClass("blurs", l.blur), e && i.appendTo(b.body), i.is(":animated") && o === e && h !== E || !e && p.length ? j : (i.stop(D, E), d.isFunction(m) ? m.call(i, e) : m === E ? i[n]() : i.fadeTo(parseInt(g, 10) || 90, e ? 1 : 0, function () {
            e || i.hide();
          }), e || i.queue(function (a) {
            i.css({
              left: "",
              top: ""
            }), d(zb).length || i.detach(), a();
          }), h = e, f.destroyed && (f = F), j);
        }
      }), j.init();
    }, xb = new xb(), d.extend(w.prototype, {
      init: function (a) {
        var b = a.tooltip;
        return this.options.on ? (a.elements.overlay = xb.elem, b.addClass(yb).css("z-index", y.modal_zindex + d(zb).length), a._bind(b, ["tooltipshow", "tooltiphide"], function (a, c, e) {
          var f = a.originalEvent;
          if (a.target === b[0]) if (f && "tooltiphide" === a.type && /mouse(leave|enter)/.test(f.type) && d(f.relatedTarget).closest(xb.elem[0]).length) try {
            a.preventDefault();
          } catch (g) {} else (!f || f && "tooltipsolo" !== f.type) && this.toggle(a, "tooltipshow" === a.type, e);
        }, this._ns, this), a._bind(b, "tooltipfocus", function (a, c) {
          if (!a.isDefaultPrevented() && a.target === b[0]) {
            var e = d(zb),
                f = y.modal_zindex + e.length,
                g = parseInt(b[0].style.zIndex, 10);
            xb.elem[0].style.zIndex = f - 1, e.each(function () {
              this.style.zIndex > g && (this.style.zIndex -= 1);
            }), e.filter("." + $).qtip("blur", a.originalEvent), b.addClass($)[0].style.zIndex = f, xb.update(c);

            try {
              a.preventDefault();
            } catch (h) {}
          }
        }, this._ns, this), void a._bind(b, "tooltiphide", function (a) {
          a.target === b[0] && d(zb).filter(":visible").not(b).last().qtip("focus", a);
        }, this._ns, this)) : this;
      },
      toggle: function (a, b, c) {
        return a && a.isDefaultPrevented() ? this : void xb.toggle(this.qtip, !!b, c);
      },
      destroy: function () {
        this.qtip.tooltip.removeClass(yb), this.qtip._unbind(this.qtip.tooltip, this._ns), xb.toggle(this.qtip, E), delete this.qtip.elements.overlay;
      }
    }), wb = R.modal = function (a) {
      return new w(a, a.options.show.modal);
    }, wb.sanitize = function (a) {
      a.show && ("object" != typeof a.show.modal ? a.show.modal = {
        on: !!a.show.modal
      } : "undefined" == typeof a.show.modal.on && (a.show.modal.on = D));
    }, y.modal_zindex = y.zindex - 200, wb.initialize = "render", B.modal = {
      "^show.modal.(on|blur)$": function () {
        this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0);
      }
    }, d.extend(D, y.defaults, {
      show: {
        modal: {
          on: E,
          effect: D,
          blur: D,
          stealfocus: D,
          escape: D
        }
      }
    }), R.viewport = function (c, d, e, f, g, h, i) {
      function j(a, b, c, e, f, g, h, i, j) {
        var k = d[f],
            s = u[a],
            t = v[a],
            w = c === Q,
            x = s === f ? j : s === g ? -j : -j / 2,
            y = t === f ? i : t === g ? -i : -i / 2,
            z = q[f] + r[f] - (n ? 0 : m[f]),
            A = z - k,
            B = k + j - (h === I ? o : p) - z,
            C = x - (u.precedance === a || s === u[b] ? y : 0) - (t === O ? i / 2 : 0);
        return w ? (C = (s === f ? 1 : -1) * x, d[f] += A > 0 ? A : B > 0 ? -B : 0, d[f] = Math.max(-m[f] + r[f], k - C, Math.min(Math.max(-m[f] + r[f] + (h === I ? o : p), k + C), d[f], "center" === s ? k - x : 1e9))) : (e *= c === P ? 2 : 0, A > 0 && (s !== f || B > 0) ? (d[f] -= C + e, l.invert(a, f)) : B > 0 && (s !== g || A > 0) && (d[f] -= (s === O ? -C : C) + e, l.invert(a, g)), d[f] < q && -d[f] > B && (d[f] = k, l = u.clone())), d[f] - k;
      }

      var k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = e.target,
          t = c.elements.tooltip,
          u = e.my,
          v = e.at,
          w = e.adjust,
          x = w.method.split(" "),
          y = x[0],
          z = x[1] || x[0],
          A = e.viewport,
          B = e.container,
          C = (c.cache, {
        left: 0,
        top: 0
      });
      return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method ? (m = B.offset() || C, n = "static" === B.css("position"), k = "fixed" === t.css("position"), o = A[0] === a ? A.width() : A.outerWidth(E), p = A[0] === a ? A.height() : A.outerHeight(E), q = {
        left: k ? 0 : A.scrollLeft(),
        top: k ? 0 : A.scrollTop()
      }, r = A.offset() || C, ("shift" !== y || "shift" !== z) && (l = u.clone()), C = {
        left: "none" !== y ? j(G, H, y, w.x, L, N, I, f, h) : 0,
        top: "none" !== z ? j(H, G, z, w.y, K, M, J, g, i) : 0,
        my: l
      }) : C;
    }, R.polys = {
      polygon: function (a, b) {
        var c,
            d,
            e,
            f = {
          width: 0,
          height: 0,
          position: {
            top: 1e10,
            right: 0,
            bottom: 0,
            left: 1e10
          },
          adjustable: E
        },
            g = 0,
            h = [],
            i = 1,
            j = 1,
            k = 0,
            l = 0;

        for (g = a.length; g--;) c = [parseInt(a[--g], 10), parseInt(a[g + 1], 10)], c[0] > f.position.right && (f.position.right = c[0]), c[0] < f.position.left && (f.position.left = c[0]), c[1] > f.position.bottom && (f.position.bottom = c[1]), c[1] < f.position.top && (f.position.top = c[1]), h.push(c);

        if (d = f.width = Math.abs(f.position.right - f.position.left), e = f.height = Math.abs(f.position.bottom - f.position.top), "c" === b.abbrev()) f.position = {
          left: f.position.left + f.width / 2,
          top: f.position.top + f.height / 2
        };else {
          for (; d > 0 && e > 0 && i > 0 && j > 0;) for (d = Math.floor(d / 2), e = Math.floor(e / 2), b.x === L ? i = d : b.x === N ? i = f.width - d : i += Math.floor(d / 2), b.y === K ? j = e : b.y === M ? j = f.height - e : j += Math.floor(e / 2), g = h.length; g-- && !(h.length < 2);) k = h[g][0] - f.position.left, l = h[g][1] - f.position.top, (b.x === L && k >= i || b.x === N && i >= k || b.x === O && (i > k || k > f.width - i) || b.y === K && l >= j || b.y === M && j >= l || b.y === O && (j > l || l > f.height - j)) && h.splice(g, 1);

          f.position = {
            left: h[0][0],
            top: h[0][1]
          };
        }
        return f;
      },
      rect: function (a, b, c, d) {
        return {
          width: Math.abs(c - a),
          height: Math.abs(d - b),
          position: {
            left: Math.min(a, c),
            top: Math.min(b, d)
          }
        };
      },
      _angles: {
        tc: 1.5,
        tr: 7 / 4,
        tl: 5 / 4,
        bc: .5,
        br: .25,
        bl: .75,
        rc: 2,
        lc: 1,
        c: 0
      },
      ellipse: function (a, b, c, d, e) {
        var f = R.polys._angles[e.abbrev()],
            g = 0 === f ? 0 : c * Math.cos(f * Math.PI),
            h = d * Math.sin(f * Math.PI);

        return {
          width: 2 * c - Math.abs(g),
          height: 2 * d - Math.abs(h),
          position: {
            left: a + g,
            top: b + h
          },
          adjustable: E
        };
      },
      circle: function (a, b, c, d) {
        return R.polys.ellipse(a, b, c, c, d);
      }
    }, R.svg = function (a, c, e) {
      for (var f, g, h, i, j, k, l, m, n, o = (d(b), c[0]), p = d(o.ownerSVGElement), q = o.ownerDocument, r = (parseInt(c.css("stroke-width"), 10) || 0) / 2; !o.getBBox;) o = o.parentNode;

      if (!o.getBBox || !o.parentNode) return E;

      switch (o.nodeName) {
        case "ellipse":
        case "circle":
          m = R.polys.ellipse(o.cx.baseVal.value, o.cy.baseVal.value, (o.rx || o.r).baseVal.value + r, (o.ry || o.r).baseVal.value + r, e);
          break;

        case "line":
        case "polygon":
        case "polyline":
          for (l = o.points || [{
            x: o.x1.baseVal.value,
            y: o.y1.baseVal.value
          }, {
            x: o.x2.baseVal.value,
            y: o.y2.baseVal.value
          }], m = [], k = -1, i = l.numberOfItems || l.length; ++k < i;) j = l.getItem ? l.getItem(k) : l[k], m.push.apply(m, [j.x, j.y]);

          m = R.polys.polygon(m, e);
          break;

        default:
          m = o.getBBox(), m = {
            width: m.width,
            height: m.height,
            position: {
              left: m.x,
              top: m.y
            }
          };
      }

      return n = m.position, p = p[0], p.createSVGPoint && (g = o.getScreenCTM(), l = p.createSVGPoint(), l.x = n.left, l.y = n.top, h = l.matrixTransform(g), n.left = h.x, n.top = h.y), q !== b && "mouse" !== a.position.target && (f = d((q.defaultView || q.parentWindow).frameElement).offset(), f && (n.left += f.left, n.top += f.top)), q = d(q), n.left += q.scrollLeft(), n.top += q.scrollTop(), m;
    }, R.imagemap = function (a, b, c) {
      b.jquery || (b = d(b));
      var e,
          f,
          g,
          h,
          i,
          j = (b.attr("shape") || "rect").toLowerCase().replace("poly", "polygon"),
          k = d('img[usemap="#' + b.parent("map").attr("name") + '"]'),
          l = d.trim(b.attr("coords")),
          m = l.replace(/,$/, "").split(",");
      if (!k.length) return E;
      if ("polygon" === j) h = R.polys.polygon(m, c);else {
        if (!R.polys[j]) return E;

        for (g = -1, i = m.length, f = []; ++g < i;) f.push(parseInt(m[g], 10));

        h = R.polys[j].apply(this, f.concat(c));
      }
      return e = k.offset(), e.left += Math.ceil((k.outerWidth(E) - k.width()) / 2), e.top += Math.ceil((k.outerHeight(E) - k.height()) / 2), h.position.left += e.left, h.position.top += e.top, h;
    };
    var Ab,
        Bb = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
    d.extend(x.prototype, {
      _scroll: function () {
        var b = this.qtip.elements.overlay;
        b && (b[0].style.top = d(a).scrollTop() + "px");
      },
      init: function (c) {
        var e = c.tooltip;
        d("select, object").length < 1 && (this.bgiframe = c.elements.bgiframe = d(Bb).appendTo(e), c._bind(e, "tooltipmove", this.adjustBGIFrame, this._ns, this)), this.redrawContainer = d("<div/>", {
          id: S + "-rcontainer"
        }).appendTo(b.body), c.elements.overlay && c.elements.overlay.addClass("qtipmodal-ie6fix") && (c._bind(a, ["scroll", "resize"], this._scroll, this._ns, this), c._bind(e, ["tooltipshow"], this._scroll, this._ns, this)), this.redraw();
      },
      adjustBGIFrame: function () {
        var a,
            b,
            c = this.qtip.tooltip,
            d = {
          height: c.outerHeight(E),
          width: c.outerWidth(E)
        },
            e = this.qtip.plugins.tip,
            f = this.qtip.elements.tip;
        b = parseInt(c.css("borderLeftWidth"), 10) || 0, b = {
          left: -b,
          top: -b
        }, e && f && (a = "x" === e.corner.precedance ? [I, L] : [J, K], b[a[1]] -= f[a[0]]()), this.bgiframe.css(b).css(d);
      },
      redraw: function () {
        if (this.qtip.rendered < 1 || this.drawing) return this;
        var a,
            b,
            c,
            d,
            e = this.qtip.tooltip,
            f = this.qtip.options.style,
            g = this.qtip.options.position.container;
        return this.qtip.drawing = 1, f.height && e.css(J, f.height), f.width ? e.css(I, f.width) : (e.css(I, "").appendTo(this.redrawContainer), b = e.width(), 1 > b % 2 && (b += 1), c = e.css("maxWidth") || "", d = e.css("minWidth") || "", a = (c + d).indexOf("%") > -1 ? g.width() / 100 : 0, c = (c.indexOf("%") > -1 ? a : 1) * parseInt(c, 10) || b, d = (d.indexOf("%") > -1 ? a : 1) * parseInt(d, 10) || 0, b = c + d ? Math.min(Math.max(b, d), c) : b, e.css(I, Math.round(b)).appendTo(g)), this.drawing = 0, this;
      },
      destroy: function () {
        this.bgiframe && this.bgiframe.remove(), this.qtip._unbind([a, this.qtip.tooltip], this._ns);
      }
    }), Ab = R.ie6 = function (a) {
      return 6 === db.ie ? new x(a) : E;
    }, Ab.initialize = "render", B.ie6 = {
      "^content|style$": function () {
        this.redraw();
      }
    };
  });
}(window, document);

/***/ }),

/***/ "./sharedemos/static/libs/sudo-slider/jquery.sudoSlider.min.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/libs/sudo-slider/jquery.sudoSlider.min.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Sudo Slider v. 3.3.1 ( http://webbies.dk/SudoSlider/ ), licenced under GPL and MIT license */
(function (h, bb) {
  function Y(a, b, c, f, p) {
    if (h.isFunction(b)) f ? Y(a, ["", "Up", "Right", "Down", "Left", b], c, 0, p) : a[c] = function (a) {
      var c = [a].concat(p),
          k = c.length - 1;

      if (0 === f && 0 == c[k]) {
        var l = a.diff;
        c[k] = a.options.vertical ? 0 > l ? 1 : 3 : 0 > l ? 2 : 4;
      }

      b.apply(this, c);
    };else if (h.isArray(b)) for (var k = b.length - 1, v = b[k], l = 0; l < k; l++) {
      var n = p.slice();
      n.push(l);
      Y(a, v, c + b[l], f, n);
    } else h.each(b, function (b, k) {
      Y(a, k, c + b, f, p);
    });
  }

  function Z(a, b, c, f, p, k, v, l, n) {
    var q = a.options,
        M = q.ease,
        r = q.boxrows,
        m = q.boxcols,
        g = r * m,
        C = q.speed / (1 == g ? 1 : 2.5),
        w = ka(a, m, r, !l),
        y = q = 0,
        z = 0,
        F = [];
    F[y] = [];
    b && ga(w);
    p && ha(w);

    for (var t = 0; t < w.length; t++) F[y][z] = w[t], z++, z == m && (c && ga(F[y]), y++, z = 0, F[y] = []);

    y = [];
    if (1 == k) for (w = 0; w < 2 * m + 1; w++) {
      g = w;
      t = [];

      for (k = 0; k < r; k++) {
        if (0 <= g && g < m) {
          z = F[k][g];
          if (!z) return;
          t.push(z);
        }

        g--;
      }

      0 != t.length && y.push(t);
    } else if (2 == k) {
      var F = r / 2,
          z = b ? g : -1,
          U = b ? -1 : 1;

      for (k = 0; k < F; k++) {
        for (g = t = k; g < m - k - 1; g++) y[z += U] = w[t * m + g];

        g = m - k - 1;

        for (t = k; t < r - k - 1; t++) y[z += U] = w[t * m + g];

        t = r - k - 1;

        for (g = m - k - 1; g > k; g--) y[z += U] = w[t * m + g];

        g = k;

        for (t = r - k - 1; t > k; t--) y[z += U] = w[t * m + g];
      }
    } else for (w = 0; w < r; w++) for (g = 0; g < m; g++) y.push([F[w][g]]);
    l && a.goToNext();

    for (var N = 0, t = 0; t < y.length; t++) {
      r = y[t];
      h.isArray(r) || (r = [r]);

      for (m = 0; m < r.length; m++) (function (k, r) {
        function h(r) {
          var g = k(),
              q = g.children(),
              m = g.width(),
              w = g.height(),
              t = m,
              y = w,
              z = $(g.css("left")),
              u = $(g.css("top")),
              F = z,
              U = u,
              D = $(q.css("left")),
              J = $(q.css("top")),
              L = D,
              G = J;

          if (v) {
            var O, V;
            p ? (V = oa([-t, t]), O = oa([-y, y])) : (V = b != c ? -t : t, O = b ? -y : y);
            l ? (F -= 1.5 * V, U -= 1.5 * O) : g.css({
              left: z + 1.5 * V,
              top: u + 1.5 * O
            });
          }

          f && (l ? (L -= t / 2, F += t / 2, G -= y / 2, U += y / 2, y = t = 0) : (g.css({
            left: z + t / 2,
            top: u + y / 2
          }), q.css({
            left: D - t / 2,
            top: J - y / 2
          }), g.width(0).height(0), n && g.css({
            borderRadius: Q(w, m)
          })));
          l && g.css({
            opacity: 1
          });
          N++;
          pa(function () {
            za.ready(function () {
              R(q, {
                left: L,
                top: G
              }, C, M, !1, a);
              R(g, {
                opacity: l ? 0 : 1,
                width: t,
                height: y,
                left: F,
                top: U,
                borderRadius: f && l && n ? Q(w, m) : 0
              }, C, M, function () {
                N--;
                0 == N && a.callback();
              }, a);
            });
          }, r);
        }

        l || 150 > r ? h(r) : pa(L(h, [150]), r - 150);
      })(r[m], q);

      q += C / y.length * 1.5;
    }
  }

  function G(a, b, c, f, p, k, v, l) {
    for (var n = a.options, q = n.slices, M = n.speed / 2, r = n.ease, n = a.slider, m = ka(a, b ? q : 1, b ? 1 : q, !l), g = h(), C = 0; C < m.length; C++) g = g.add(m[C]());

    var w = 0,
        y = !1;
    c ? ga(g) : h(ga(g.get())).appendTo(n);
    f && ha(g);
    g.each(function (f) {
      f *= M / q;
      var g = h(this),
          n = g.width(),
          m = g.height(),
          C = g.css("left"),
          D = g.css("top"),
          u = b ? C : D,
          J = g.children()[b ? "width" : "height"]();
      1 == k ? u = 0 : 2 == k && (u = J / 2);
      c && (u = J - u);
      b ? g.css({
        width: p || v ? n : 0,
        left: u
      }) : g.css({
        height: p || v ? m : 0,
        top: u
      });
      l && (u = 1 == v ? -1 : 1, g.css({
        top: D,
        left: C,
        width: n,
        height: m,
        opacity: 1
      }), b ? D = u * m : C = u * n);
      v && (u = !0, 3 == v ? y = y ? u = !1 : !0 : 2 == v && (u = !1), b ? l ? D = (u ? -1 : 1) * m : g.css({
        bottom: u ? 0 : m,
        top: u ? m : 0,
        height: l ? m : 0
      }) : l ? C = (u ? -1 : 1) * n : g.css({
        right: u ? 0 : n,
        left: u ? n : 0,
        width: l ? n : 0
      }));
      w++;
      pa(L(R, [g, {
        width: n,
        height: m,
        opacity: l ? 0 : 1,
        left: C,
        top: D
      }, M, r, function () {
        w--;
        0 == w && a.callback();
      }, a]), f);
    });
    l && a.goToNext();
  }

  function Aa(a, b, c) {
    var f = 2 == c || 4 == c;
    c = 2 == c || 3 == c ? 1 : -1;
    var h = a.options,
        k = h.ease,
        h = h.speed,
        v = a.callback;

    if (b) {
      b = a.fromSlides;
      var l = aa(a, !0).hide();
      a.slider.append(l);
      var n = Q(l.height(), b.height()),
          q = Q(l.width(), b.width());
      l.css(f ? {
        left: c * q
      } : {
        top: c * n
      }).show();
      R(l, {
        left: 0,
        top: 0
      }, h, k, v, a);
    } else b = aa(a, !1), a.slider.append(b), a.goToNext(), l = a.toSlides, l = -1 == c ? b : l, n = l.height(), q = l.width(), R(b, f ? {
      left: c * q
    } : {
      top: c * n
    }, h, k, v, a);
  }

  function Ra(a) {
    var b = qa(a.slider),
        c = a.options,
        f = c.ease,
        c = c.speed,
        h = a.target,
        k = h.left,
        h = h.top;
    a.options.usecss ? R(b, {
      transform: "translate(" + k + "px, " + h + "px)"
    }, c, f, a.callback, a, !0) : R(b, {
      marginTop: h,
      marginLeft: k
    }, c, f, a.callback, a);
  }

  function R(a, b, c, f, h, k, v) {
    function l() {
      if (!v) {
        var b = {};
        b[r] = "0s";
        b[m] = "";
        b[M] = "";
        a.css(b);
      }
    }

    var n = !k || k.options.usecss;

    if (!1 !== O && n) {
      var q = {},
          M = O + "transition",
          n = ra(b);
      q[M] = n.join(" ") + ("" == O ? "" : " " + O + n.join(" " + O));
      var r = M + "-duration";
      q[r] = c + "ms";
      var m = M + "-timing-function";
      "swing" == f && (f = "ease-in-out");
      q[m] = f;
      k && k.stopCallbacks.push(l);
      f = O.replace(/\-/g, "");

      var g = f + ((f ? "T" : "t") + "ransitionend") + " transitionend",
          C = !1,
          w = function () {
        C || (C = !0, a.unbind(g), l(), h && h());
      };

      J(function () {
        20 > c ? (a.css(b), w()) : (a.css(q), J(function () {
          a.css(b);
          var f = +new Date();
          a.on(g, function (b) {
            a.is(b.target) && -100 < +new Date() - f - c && w();
          });
          setTimeout(w, c + 100);
        }));
      });
      return w;
    }

    a.animate(b, c, f, h);
  }

  function sa(a, b) {
    var c = a.options;
    c.boxcols = 1;
    c.boxrows = 1;
    c.speed = b;
    Z(a, !1);
  }

  function ka(a, b, c, f) {
    function p(b, c) {
      l.push(function () {
        var h = aa(a, f),
            h = ta(h, r * b, M * c, r, M);
        k.append(h);
        return h;
      });
    }

    var k = a.slider,
        v = a.options.vertical,
        l = [],
        n = v ? a.slider.width() : 0,
        q = v ? 0 : a.slider.height();
    a.toSlides.each(function () {
      var a = h(this);
      v ? q += a.height() : n += a.width();
    });

    for (var M = Math.ceil(n / b), r = Math.ceil(q / c), m = 0; m < c; m++) for (var g = 0; g < b; g++) p(m, g);

    return l;
  }

  function ta(a, b, c, f, p) {
    a.css({
      width: a.width(),
      height: a.height(),
      display: "block",
      top: -b,
      left: -c
    });
    return h("<div>").css({
      left: c,
      top: b,
      width: p,
      height: f,
      opacity: 0,
      overflow: "hidden",
      position: "absolute"
    }).append(a).addClass("sudo-box");
  }

  function aa(a, b) {
    var c = b ? a.toSlides : a.fromSlides,
        f = c.eq(0).position(),
        p = f.left,
        k = f.top,
        v = 0,
        l = 0,
        n = h("<div>").css({
      position: "absolute",
      top: 0,
      left: 0
    }).addClass("sudo-box");
    c.each(function (a, b) {
      var c = h(b),
          f = c.outerWidth(!0),
          g = c.outerHeight(!0),
          D = c.clone(),
          w = c.position(),
          c = w.left - p,
          w = w.top - k;
      D.css({
        position: "absolute",
        left: c,
        top: w,
        opacity: 1
      });
      v = Q(v, w + g);
      l = Q(l, c + f);
      n.append(D);
    });
    n.width(l).height(v);
    return n;
  }

  function L(a, b) {
    return function () {
      a.apply(ia, b);
    };
  }

  function ba(a, b, c) {
    if (a) {
      a = a.add(a.find("img")).filter("img");
      var f = a.length;
      f ? a.each(function () {
        var a = h(this),
            k = function () {
          a.off("load error", k);
          b ? (f--, 0 == f && c()) : c();
        };

        a.on("load error", k);
        if ("complete" == this.readyState) a.trigger("load");else if (this.readyState) this.src = this.src;else if (this.complete) a.trigger("load");else if (this.complete === ia) {
          var v = this.src;
          this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          this.src = v;
        }
      }) : c();
    } else c();
  }

  function nb(a) {
    for (var b = h.fn.jquery.split("."), c = b.length, f = 0; f < c; f++) if (a[f] && +b[f] < +a[f]) return !1;

    return !0;
  }

  function ra(a) {
    var b = [],
        c;

    for (c in a) b.push(c);

    return b;
  }

  function J(a) {
    setTimeout(a, 0);
  }

  function pa(a, b) {
    return setTimeout(a, b);
  }

  function ga(a) {
    return [].reverse.call(a);
  }

  function qa(a) {
    return a.children().not(".sudo-box");
  }

  function ua(a) {
    var b = {},
        c;

    for (c in a) b[c.toLowerCase()] = a[c];

    return b;
  }

  function ha(a) {
    for (var b, c, f = a.length; f; b = parseInt(Math.random() * f), c = a[--f], a[f] = a[b], a[b] = c);

    return a;
  }

  function $(a) {
    return parseFloat(a);
  }

  function Ba(a, b) {
    return (a % b + b) % b || 0;
  }

  function D(a) {
    return 0 > a ? -a : a;
  }

  function Q(a, b) {
    return a > b ? a : b;
  }

  function Ca(a, b) {
    return a < b ? a : b;
  }

  function Da(a) {
    if (h.isArray(a)) return ca(a);
    if (h.isFunction(a)) return a;
    a = a.replace(/^\s+|\s+$/g, "");

    if (-1 != a.indexOf(",")) {
      var b = a.split(",");
      return ca(b);
    }

    var c = ua(h.fn.sudoSlider.effects);
    a = a.toLowerCase().replace(/^\s+|\s+$/g, "");
    if (b = c[a]) return b;
    var b = [],
        f;

    for (f in c) f.match(new RegExp("^" + a.split("*").join(".*") + "$", "g")) && b.push(c[f]);

    return b.length ? ca(b) : Ra;
  }

  function ca(a) {
    return function (b) {
      var c = oa(a);
      return Da(c)(b);
    };
  }

  function oa(a) {
    return a[ha(ra(a))[0]];
  }

  function ob(a) {
    var b = "bez_" + a.join("_").replace(/\./g, "p"),
        c = h.easing;

    if (!h.isFunction(c[b])) {
      var f = function (a, b) {
        function c(v, r) {
          q[r] = 3 * a[r];
          h[r] = 3 * (b[r] - a[r]) - q[r];
          f[r] = 1 - q[r] - h[r];
          return v * (q[r] + v * (h[r] + v * f[r]));
        }

        var f = [0, 0],
            h = [0, 0],
            q = [0, 0];
        return function (a) {
          for (var b = a, k = 0, g; 14 > ++k;) {
            g = c(b, 0) - a;
            if (.001 > D(g)) break;
            b -= g / (q[0] + b * (2 * h[0] + 3 * f[0] * b));
          }

          return c(b, 1);
        };
      };

      c[b] = function (b, c, h, l, n) {
        return l * f([a[0], a[1]], [a[2], a[3]])(c / n) + h;
      };
    }

    return b;
  }

  var ia,
      W = function () {},
      O = function () {
    var a;

    a: {
      var b = h("<div>")[0].style;

      for (a in b) if (b = a.toLowerCase(), -1 !== b.indexOf("transition", b.length - 10)) break a;

      a = !1;
    }

    if (!1 === a) return !1;
    a = a.slice(0, a.length - 10);
    return 0 != a.length ? "-" + a + "-" : "";
  }(),
      Sa = h(bb),
      za = h(document);

  h.fn.sudoSlider = function (a) {
    var b = this;
    a = h.extend(ua({
      effect: "slide",
      speed: 1500,
      customLink: !1,
      controlsShow: !0,
      controlsFadeSpeed: 400,
      controlsFade: !0,
      insertAfter: !0,
      vertical: !1,
      slideCount: 1,
      moveCount: 1,
      startSlide: 1,
      responsive: !0,
      ease: "swing",
      auto: !1,
      pause: 2E3,
      resumePause: !1,
      continuous: !1,
      prevNext: !0,
      numeric: !1,
      numericText: [],
      slices: 15,
      boxCols: 8,
      boxRows: 4,
      initCallback: W,
      ajaxLoad: W,
      beforeAnimation: W,
      afterAnimation: W,
      history: !1,
      autoHeight: !0,
      autoWidth: !0,
      updateBefore: !1,
      ajax: !1,
      preloadAjax: 100,
      loadingText: "",
      prevHtml: '<a href="#" class="prevBtn"> previous </a>',
      nextHtml: '<a href="#" class="nextBtn"> next </a>',
      controlsAttr: 'class="controls"',
      numericAttr: 'class="numericControls"',
      interruptible: !1,
      useCSS: !0,
      loadStart: W,
      loadFinish: W,
      touch: !1,
      touchHandle: !1,
      destroyCallback: W,
      mouseTouch: !1,
      allowScroll: !0
    }), ua(a));
    !1 !== O && nb([1, 8, 0]) || (a.usecss = !1);
    return this.each(function () {
      function c() {
        var e = 0,
            a;

        for (a in da) d[e] = da[a], e++;

        S = !0;
        Ea = [];
        Ua = [];
        Fa = [];
        va = [];
        Ga = [];
        A = qa(H);
        e = A.length;
        a = h("<div>");
        e ? (Ha = A.is("ul")) || cb || (a.append(A), H.append(A = a)) : (H.append(A = a), Ha = !1);
        cb = !0;
        e = qa(A);
        e.filter("img").wrap("<div>");
        e = qa(A);
        x = [];
        B = e.length;
        e.each(function (e, a) {
          var b = h(a);
          x[e] = b;
          b.css({
            position: "relative"
          });
          "none" == b.css("display") && b.css("display", "inline");
        });
        A.addClass("slidesContainer");
        e.addClass("slide");

        if (d[31] && (a = d[31].length, a > B)) {
          for (e = 1; e <= a - B; e++) {
            var b;
            b = Ha ? "li" : "div";
            b = h("<" + b + ">" + d[33] + "</" + b + ">");
            A.append(b);
            x[B + (e - 1)] = b;
          }

          e = qa(A);
          B = a;
        }

        e.each(function (e, a) {
          Ea[e] = !1;
          ba(h(a), !0, function () {
            Ea[e] = !0;
          });
        });
        s = (s = !1 === X ? 0 : X) || 0;
        T = !0;
        Ia = [];
        wa = !1;
        H.css({
          overflow: "hidden"
        });
        "static" == H.css("position") && H.css({
          position: "relative"
        });
        e.css({
          "float": "left",
          listStyle: "none"
        });
        A.add(e).css({
          display: "block",
          position: "relative",
          margin: "0"
        });
        d[8] = parseInt(d[8], 10);
        P = d[8];
        d[8] += d[9] - 1;
        d[10] = parseInt(d[10], 10) - 1 || 0;
        d[0] = Da(d[0]);

        for (e = 0; e < B; e++) d[19][e] || "" == d[19][e] || (d[19][e] = e + 1), d[31][e] = d[31][e] || !1;

        d[5] = d[5] && !d[16];
        d[11] && p(!0);
        A[d[7] ? "height" : "width"](9E6)[d[7] ? "width" : "height"]("100%");
        d[29] = d[29] && !d[11];
        d[11] && Va(Sa, "resize focus", p, "");

        if (d[3]) {
          ja = h("<span " + d[36] + "></span>");
          H[d[6] ? "after" : "before"](ja);
          if (d[18]) for (Wa = h("<ol " + d[37] + "></ol>"), ja.prepend(Wa), b = (a = "pages" == d[18]) ? P : 1, e = 0; e < B - (d[16] || a ? 1 : P) + 1; e += b) Ia[e] = h('<li data-target="' + (e + 1) + '"><a href="#"><span>' + d[19][e] + "</span></a></li>").appendTo(Wa).click(function () {
            m(k(this) - 1, !0);
            return !1;
          });
          d[17] && (ta = r(d[35], "next"), db = r(d[34], "prev"));
        }

        e = [4, 1, 14];

        for (a = 0; a < e.length; a++) d[e[a]] = M(d[e[a]]);

        d[2] && Va(za, "click", f, d[2]);
        ba(sa(d[10], d[8]), !0, function () {
          if (!1 !== X) Ja(X, !1);else if (d[27]) {
            var e;
            if (e = Sa.hashchange) e(v);else if (e = h.address) e.change(v);else Sa.on("hashchange", v);
            v();
          } else Ja(d[10], !1);
          w(s);
        });
        d[31][d[10]] && la(d[10]);
        if (!0 === d[32]) for (a = 0; a < B; a++) d[31][a] && d[10] != a && la(a);else l();
      }

      function f() {
        var e;
        if (e = k(this)) "stop" == e ? (d[13] = !1, q()) : "start" == e ? (n(), d[13] = !0) : "block" == e ? T = !1 : "unblock" == e ? T = !0 : m(e == parseInt(e, 10) ? e - 1 : e, !0);
        return !1;
      }

      function p(e) {
        function a() {
          if ((H.is(":visible") && !S || !0 === e) && 0 != B) {
            var b;
            b = H.width();
            b = d[7] ? b : b / P;

            if (eb != b || !0 === e) {
              eb = b;

              for (var Ta = 0; Ta < B; Ta++) x[Ta].width(b);

              !1 !== Ka && n(Ka);
              xa();
              na();
              N(s);
              z(s, 0);
            }
          }
        }

        a();
        J(a);
        setTimeout(a, 20);
      }

      function k(e) {
        e = h(e);
        return e.attr("data-target") || e.attr("rel");
      }

      function v() {
        var e;

        a: {
          e = location.hash.substr(1);

          for (var a = 0; a < d[19].length; a++) if (d[19][a] == e) {
            e = a;
            break a;
          }

          e = e && !S ? s : d[10];
        }

        S ? Ja(e, !1) : m(e, !1);
      }

      function l() {
        if (!1 !== d[32]) {
          var e = parseInt(d[32], 10);
          if (d[31]) for (var a = 0; a < d[31].length; a++) if (d[31][a]) {
            clearTimeout(La);
            La = pa(function () {
              d[31][a] ? la(parseInt(a, 10)) : l();
            }, e);
            break;
          }
        }
      }

      function n(e) {
        e === ia && (e = x[s].attr("data-pause"), e = e !== ia ? parseInt(e, 10) : d[14]);
        Xa && (e = Q(e, 100));
        q();
        Ma = !0;
        Ka = e;
        Ya = pa(function () {
          Ma && (m("next", !1), Ka = !1);
        }, e);
      }

      function q(e) {
        Ya && clearTimeout(Ya);
        e || (Ma = !1);
      }

      function M(e) {
        return parseInt(e, 10) || 0 == e ? parseInt(e, 10) : "fast" == e ? 200 : "normal" == e || "medium" == e ? 400 : 600;
      }

      function r(e, a) {
        return h(e).prependTo(ja).click(function () {
          m(a, !0);
          return !1;
        });
      }

      function m(e, a, b) {
        if (T && !S) q(!0), wa || ua(e, a, b);else if (d[38] && ea) xa(), m(e, a, b);else if (Na = e, fb = a, gb = b, d[31]) for (a = e = $(e); a < e + P; a++) d[31][a] && la(K(a));
      }

      function g(e, a, b) {
        function c() {
          e || 0 != f.css("opacity") || f.css({
            visibility: "hidden"
          });
        }

        e = e ? 1 : 0;
        var f = h();
        d[3] && d[17] && (f = b ? ta : db);

        if (d[2]) {
          var g = h(d[2]);
          b = '="' + (b ? "next" : "prev") + '"]';
          g = g.filter("[rel" + b + ", [data-target" + b + "");
          f = f.add(g);
        }

        g = {
          opacity: e
        };
        e && f.css({
          visibility: "visible"
        });
        d[39] ? R(f, g, a, d[12], c) : f.animate(g, {
          queue: !1,
          duration: a,
          easing: d[12],
          callback: c
        });
      }

      function C(e, a) {
        g(e, a, !1);
        g(e < B - P, a, !0);
      }

      function w(e) {
        e = K(e) + 1;
        "pages" != d[18] || e != B - P + 1 || d[16] || (e = B);
        if (d[18]) for (var a = 0; a < Ia.length; ++a) y(Ia[a], e);
        d[2] && y(h(d[2]), e);
      }

      function y(e, a) {
        e && e.filter && (e.filter(".current").removeClass("current"), e.filter(function () {
          var e = k(this);
          if ("pages" == d[18]) for (var b = P - 1; 0 <= b; b--) {
            if (e == a - b) return !0;
          } else return e == a;
          return !1;
        }).addClass("current"));
      }

      function z(e, a) {
        hb = e = K(e);
        Za = +new Date() + a;
        (d[28] || d[29]) && F(e);
      }

      function F(e) {
        H.ready(function () {
          G(e);
          ba(x[e], !1, L(G, [e]));
        });
      }

      function t(e, a) {
        for (var b = 0, c = e; c < e + P; c++) {
          var f = x[K(c)];
          f && (f = f["outer" + (a ? "Height" : "Width")](!0), b = a == d[7] ? b + f : Q(f, b));
        }

        return b;
      }

      function G(e) {
        if (e == hb && H.is(":visible") && !S) {
          var a = Za - +new Date(),
              a = Q(a, 0),
              b = {};
          d[28] && (b.height = t(e, !0) || 1);
          d[29] && (b.width = t(e, !1) || 1);
          d[39] ? R(H, b, a, d[12]) : 0 == a ? H.stop().css(b) : H.animate(b, {
            queue: !1,
            duration: a,
            easing: d[12]
          });
        }
      }

      function N(e) {
        var a = u(e, !1);
        e = u(e, !0);
        W(a, e);
      }

      function W(e, a) {
        ib = e;
        jb = a;
        d[39] ? A.css({
          transform: "translate(" + e + "px, " + a + "px)"
        }) : (A.css({
          marginLeft: 0,
          marginTop: 0
        }), A.css({
          marginLeft: e,
          marginTop: a
        }));
      }

      function u(a, b) {
        var d = x[K(a)];
        return d && d.length ? -d.position()[b ? "top" : "left"] : 0;
      }

      function Y() {
        if (!1 !== Na) {
          var a = Na;
          Na = !1;
          J(L(m, [a, fb, gb]));
        }
      }

      function Z(a, b, d) {
        a = K(a);
        a = L(b ? fa : ga, [x[a], a + 1]);
        d ? a() : J(a);
      }

      function fa(a, b) {
        d[26].call(a, b);
      }

      function ga(a, b) {
        d[25].call(a, b);
      }

      function $(a) {
        return "next" == a ? aa(s + d[9], a) : "prev" == a ? aa(s - d[9], a) : "first" == a ? 0 : "last" == a ? B - 1 : aa(parseInt(a, 10), a);
      }

      function aa(a, b) {
        if (d[16]) return "next" == b || "prev" == b ? a : K(a);
        var c = B - P;
        return a > c ? s == c && "next" == b ? 0 : c : 0 > a ? 0 == s && "prev" == b ? c : 0 : a;
      }

      function la(a, b) {
        function c() {
          var b = new Image();
          b.src = g;
          var d = h(b);
          ba(d, !0, L(ma, [function () {
            k.empty().append(b);
            ca(a, !0);
          }]));
        }

        if (b) {
          var f = Fa[a];
          f || (f = Fa[a] = []);
          f.push(b);
        }

        if (Ga[a]) b && ba(x[a], !0, L(J, [b]));else if (!va[a]) {
          va[a] = !0;
          var g = d[31][a];

          if (g) {
            La && clearTimeout(La);
            var k = x[a],
                l = !1;
            h.ajax({
              url: g,
              success: function (b, d, f) {
                l = !0;
                ma(function () {
                  var d = f.getResponseHeader("Content-Type");
                  d && "i" != d.substr(0, 1) ? (k.html(b), ca(a, !1)) : c();
                });
              },
              complete: function () {
                l || c();
              }
            });
            d[31][a] = !1;
            da.ajax[a] = !1;
          } else J(b);
        }
      }

      function ma(a) {
        ea ? Ua.push(a) : J(a);
      }

      function ca(a, b) {
        var c = x[a];
        N(s);
        z(s, 0);
        ba(c, !0, L(ma, [function () {
          N(s);
          z(s, 0);
          Ga[a] = !0;
          ya(Fa[a]);
          l();
          J(function () {
            d[24].call(x[a], a + 1, b);
          });
          S && (S = !1, J(ha));
        }]));
      }

      function ha() {
        d[16] && Qa(s, 0);
        z(s, 0);
        N(s);
        Y();
        d[11] && p();
        d[13] && n();
        d[23].call(b);
        d[42] && oa();
        ba(sa(s, B), !1, L(ma, [function () {
          z(s, 0);
          N(s);
        }]));
      }

      function oa() {
        var a,
            b = !1,
            c = d[0];

        d[0] = function (d) {
          return b ? (b = !1, d.options.ease = a, Ra(d)) : c(d);
        };

        var f,
            g,
            k,
            l,
            n,
            m = [],
            q = [],
            r = 0,
            v = !1,
            w = 0,
            t = 0,
            y = 0,
            z = 0,
            p = function (c) {
          if (T) {
            var p = c.type,
                u,
                I,
                x,
                E = "m" == p.substr(0, 1);
            E ? (u = "mousedown", I = "mouseup", x = "") : (u = "touchstart", I = "touchend", x = "touchcancel", c = c.originalEvent);

            if (!v) {
              if (p != u) return;
              var A = c.target,
                  C = h(A);
              d[43] || (C = C.parents().add(A));
              if (C.filter(d[43] || H).length) v = !0;else return;
            }

            if (p != I && p != x) E ? (I = c.pageX, x = c.pageY) : (x = c.touches[0], I = x.pageX, x = x.pageY), p == u ? (w = I, t = x, c = I - w, E = x - t, ea = !0, na(), g = jb, f = ib, n = d[7] ? D(E) : D(c), l = k = +new Date()) : (p = I - w, u = x - t, A = d[7] ? D(u) : D(p), m[r] = A - n, C = +new Date(), q[r] = C - l, r = (r + 1) % 3, l = C, n = A, d[7] ? p = 0 : u = 0, W(f + p, g + u), p = I - w, p = D(x - t) > D(p), E = E ? !1 : d[46] ? d[7] ? !p : p : !1, E || c.preventDefault()), y = I - w, z = x - t;else {
              x = d[7] ? z : y;
              E = D(x);
              I = +new Date();

              for (u = p = c = 0; 3 > u; u++) A = q[u], A + 100 < I && (c += A, p += m[u]);

              u = d[7] ? H.height() : H.width();
              I = D(p) / c;
              c = .2 <= I || E >= u / 2;
              if (0 < p && 0 > E || 0 > p && 0 < E || 10 >= E) c = !1;
              x = 0 > x ? "next" : "prev";
              d[16] || (s + 1 == B ? "next" == x && (c = !1) : 0 == s && "prev" == x && (c = !1));
              E = c ? u - E : E;
              p = E / I * 1.3;
              u = Q(u / E * d[1], d[1] / 4);
              p = p < u ? Ca(p, d[1]) : Ca(u, d[1]);
              E = I * p / (E + I * p);
              I = 1 - E;
              a = d[39] ? "cubic-bezier(" + I + "," + E + ",0.3,1)" : ob([I || 0, E || 0, .3, 1]);
              T = !1;
              b = !0;
              c ? V($(x), p, !0, !0, !0) : V(s, p, !0, !0, !0);
              v = !1;
            }
          }
        };

        ra(za, p, ["touchstart", "touchmove", "touchend", "touchcancel"]);
        d[45] && ra(za, p, ["mousedown", "mousemove", "mouseup"]);
      }

      function ya(a) {
        for (; a && a.length;) a.splice(0, 1)[0]();
      }

      function ua(a, c, f) {
        var g = $(a),
            h = "next" == a || "prev" == a;
        a = K(g);
        if (a != s) if (T = !1, d[31]) {
          for (var k = 0, l = a; l < a + P; l++) {
            var p = K(l);
            Ea[p] && (d[31] ? d[31][p] ? 0 : !va[p] || Ga[p] : 1) || (k++, la(p, function () {
              k--;
              0 == k && (d[41].call(b, g + 1), V(g, f, c, h));
            }));
          }

          0 == k ? V(g, f, c, h) : d[40].call(b, g + 1);
        } else V(g, f, c, h);
      }

      function na() {
        d[39] && A.css(O + "transition-duration", "");
      }

      function ka(a) {
        if (K(a) != kb) {
          kb = a;
          na();

          for (var b = 0; b < B; b++) {
            var d = x[K(a + b)];
            A.append(d);
          }

          N(s);
        }
      }

      function Qa(a, b) {
        var d = Q(parseInt((B - b - P) / 2, 10), 0);
        a = Ba(a - d, B);
        ka(a);
      }

      function Aa(a) {
        var b = Ca(a, s);
        a = D(a - s);
        Qa(b, a);
      }

      function V(a, c, f, g, k) {
        d[30] && w(a);
        d[27] && f && (bb.location.hash = d[19][a]);
        d[5] && C(a, d[4]);

        for (var l = h(), n = h(), m = 0; m < P; m++) l = l.add(x[K(s + m)]), n = n.add(x[K(a + m)]);

        var m = -s + a,
            q;

        if (d[16] && !g) {
          g = D(m);
          q = a;
          var r = -s + a + B;
          D(r) < g && (q = a + B, m = r, g = D(m));
          r = -s + a - B;
          D(r) < g && (q = a - B, m = r);
        } else q = a;

        d[16] && !k && Aa(q);
        k = u(q, !1);
        g = u(q, !0);
        var v = x[K(a)],
            r = h.extend(!0, {}, da),
            t = d[1],
            y = v.attr("data-speed");
        y != ia && (t = parseInt(y, 10));
        c != ia && (t = parseInt(c, 10));
        r.speed = t;
        var F = d[0];
        (c = v.attr("data-effect")) && (F = Da(c));
        x[s] && (c = x[s].attr("data-effectout")) && (F = Da(c));
        ea = !0;
        lb = F;
        var G = !0;

        $a = function () {
          G = ea = !1;
          Ja(a, f);
          screen.fontSmoothingEnabled && n.style && n.style.removeAttribute("filter");
          d[16] && Qa(q, 0);
          Z(a, !0);
          d[11] && p();
          ya(Ua);
        };

        ab = {
          fromSlides: l,
          toSlides: n,
          slider: H,
          container: A,
          options: r,
          to: a + 1,
          from: s + 1,
          diff: m,
          target: {
            left: k,
            top: g
          },
          stopCallbacks: [],
          callback: function () {
            G && (G = !1, xa());
          },
          goToNext: function () {
            G && ba(h(".sudo-box", H), !0, L(N, [a]));
          }
        };
        z(a, t);
        J(function () {
          Z(a, !1, !0);
          F.call(b, ab);
        });
      }

      function xa() {
        if (ea) {
          Xa = !0;
          $a && $a();
          ya(ab.stopCallbacks);
          var a = lb.stop;
          a ? a() : (h(".sudo-box", H).remove(), A.stop());
          z(s, 0);
          N(s);
          Xa = !1;
        }
      }

      function Va(a, b, d, c) {
        a.on(b, c, d);
        mb.push(function () {
          a.off(b, c, d);
        });
      }

      function ra(a, b, d) {
        for (var c = 0; c < d.length; c++) Va(a, d[c], b);
      }

      function Ja(a, b) {
        T = !b && !d[13];
        s = a;
        na();
        z(s, 0);
        s = K(s);
        d[30] || w(s);
        N(s);
        T = !0;
        d[13] && (b ? (q(), d[15] && n(d[15])) : S || n());
        Y();
        d[5] && S && C(s, 0);
        !S || d[31][s] || va[s] || (S = !1, J(ha));
      }

      function sa(a, b) {
        for (var c = h(), d = 0; d < b; d++) c = c.add(x[K(a + d)]);

        return c;
      }

      function K(a) {
        return Ba(a, B);
      }

      function Oa() {
        xa();
        wa = !0;
        X = s;
        ya(mb);
        na();
        ja && ja.remove();
        ka(0);
        N(s);
        z(s, 0);
        d[44].call(b);
      }

      function Pa() {
        wa && c();
      }

      var S,
          Ha,
          A,
          x,
          Ea,
          B,
          s,
          T,
          Ia,
          Wa,
          wa,
          X = !1,
          ja,
          ta,
          db,
          Ya,
          Ma,
          P,
          La,
          H = h(this),
          hb,
          Za = 0,
          ea = !1,
          lb,
          $a,
          ab,
          Ua,
          Fa,
          va,
          Ga,
          Na = !1,
          fb,
          gb,
          cb = !1,
          d = [],
          da = h.extend(!0, {}, a),
          jb,
          ib,
          mb = [],
          Ka = !1,
          Xa = !1,
          eb = -1,
          kb = 0;
      b.destroy = Oa;
      b.init = Pa;

      b.getOption = function (a) {
        return da[a.toLowerCase()];
      };

      b.setOption = function (a, b) {
        Oa();
        if (h.isPlainObject(a)) for (var c in a) da[c.toLowerCase()] = a[c];else da[a.toLowerCase()] = b;
        Pa();
      };

      b.runWhenNotAnimating = ma;

      b.insertSlide = function (a, b, c, f) {
        Oa();
        b = 0 > b ? B - Ba(-b - 1, B + 1) : Ba(b, B + 1);
        a = h(a || "<div>");
        Ha ? a = h("<li>").prepend(a) : 1 != a.length && (a = h("<div>").prepend(a));
        b && 0 != b ? x[b - 1].after(a) : A.prepend(a);
        f ? X = f - 1 : (b <= X || !b || 0 == b) && X++;
        d[19].length < b && (d[19].length = b);
        d[19].splice(b, 0, c || parseInt(b, 10) + 1);
        Pa();
      };

      b.removeSlide = function (a) {
        a--;
        Oa();
        x[Ca(a, B - 1)].remove();
        d[19].splice(a, 1);
        a < X && X--;
        Pa();
      };

      b.goToSlide = function (a, b) {
        var c = a == parseInt(a, 10) ? a - 1 : a;
        J(L(m, [c, !0, b]));
      };

      b.block = function () {
        T = !1;
      };

      b.unblock = function () {
        T = !0;
      };

      b.startAuto = function () {
        d[13] = !0;
        n();
      };

      b.stopAuto = function () {
        d[13] = !1;
        q();
      };

      b.adjust = function () {
        var a = Q(Za - +new Date(), 0);
        z(s, a);
        ea || N(s);
      };

      b.getValue = function (a) {
        return {
          currentslide: s + 1,
          totalslides: B,
          clickable: T,
          destroyed: wa,
          autoanimation: Ma
        }[a.toLowerCase()];
      };

      b.getSlide = function (a) {
        return x[K(parseInt(a, 10) - 1)];
      };

      b.stopAnimation = xa;
      c();
    });
  };

  var pb = {
    box: {
      Random: ["", "GrowIn", "GrowInRounded", "GrowOut", "GrowOutRounded", "FlyIn", "FlyOut", function (a, b) {
        Z(a, !1, !1, 0 < b && 5 > b, !0, 0, 5 == b || 6 == b, 3 == b || 4 == b || 6 == b, 2 == b || 4 == b);
      }],
      Rain: ["", "GrowIn", "GrowInRounded", "GrowOut", "GrowOutRounded", "FlyIn", "FlyOut", ["UpLeft", "DownLeft", "DownRight", "UpRight", function (a, b, c) {
        Z(a, 0 == c || 3 == c, 1 == c || 3 == c, 1 <= b && 4 >= b, !1, 1, 5 == b || 6 == b, 6 == b || 3 == b || 4 == b, 2 == b || 4 == b);
      }]],
      Spiral: ["InWards", "OutWards", {
        "": function (a, b) {
          Z(a, b, !1, !1, !1, 2, !1, !1, !1);
        },
        Grow: ["In", "Out", ["", "Rounded", function (a, b, c, f) {
          Z(a, b, !1, !0, !1, 2, !1, c, f);
        }]]
      }]
    },
    fade: {
      "": function (a) {
        sa(a, a.options.speed);
      },
      OutIn: function (a) {
        var b = a.options,
            c = b.speed,
            b = b.ease,
            f = parseInt(.6 * c, 10),
            f = c - f;
        a.stopCallbacks.push(function () {
          a.fromSlides.stop().css({
            opacity: 1
          });
        });
        R(a.fromSlides, {
          opacity: 1E-4
        }, f, b, L(sa, [a, c]), a);
      }
    },
    foldRandom: ["Horizontal", "Vertical", function (a, b) {
      G(a, b, !1, !0);
    }],
    slide: Ra,
    stack: ["Up", "Right", "Down", "Left", ["", "Reverse", function (a, b, c) {
      var f = 0 < a.diff;
      c && (f = !f);
      Aa(a, f, ++b);
    }]],
    unnamed: ["", "Reveal", ["", "Vertical", ["", "Reverse", "Random", function (a, b, c, f) {
      var h = 1 == f;
      f = 2 == f;
      G(a, c, h, f, !1, 0, 1, b);
      G(a, c, h, f, !1, 0, 2, b);
    }]]]
  },
      fa = {};
  Y(fa, {
    blinds: ["1", "2", function (a, b, c) {
      b++;
      G(a, 2 == c || 4 == c, 1 == c || 4 == c, !1, !1, b);
    }],
    fold: function (a, b) {
      G(a, 2 == b || 4 == b, 1 == b || 4 == b);
    },
    push: ["Out", "In", Aa],
    reveal: function (a, b) {
      var c = 1 == b || 3 == b,
          f = a.options,
          h = f.ease,
          f = f.speed,
          k = aa(a, !0),
          v = k.width(),
          l = k.height(),
          n = ta(k, 0, 0, 0, 0).css({
        opacity: 1
      }).appendTo(a.slider),
          q = n.add(k);
      q.hide();
      c ? (n.css({
        width: v
      }), 1 == b && (k.css({
        top: -l
      }), n.css({
        bottom: 0,
        top: "auto"
      }))) : (n.css({
        height: l
      }), 4 == b && (k.css({
        left: -v
      }), n.css({
        right: 0,
        left: "auto"
      })));
      q.show();
      c ? q.width(v) : q.height(l);
      R(k, {
        left: 0,
        top: 0
      }, f, h, !1, a);
      R(n, {
        width: v,
        height: l
      }, f, h, a.callback, a);
    },
    slice: {
      "": ["", "Reveal", ["", "Reverse", "Random", function (a, b, c, f) {
        G(a, 1 == f || 3 == f, c, 2 == c, !1, 0, 1 == f || 4 == f ? 1 : 2, b);
      }]],
      Fade: function (a, b) {
        G(a, 2 == b || 4 == b, 1 == b || 4 == b, !1, !0);
      }
    },
    zip: function (a, b) {
      G(a, 2 == b || 4 == b, 1 == b || 4 == b, !1, !1, 0, 3);
    },
    unzip: function (a, b) {
      G(a, 2 == b || 4 == b, 1 == b || 4 == b, !1, !1, 0, 3, !0);
    }
  }, "", !0, []);
  Y(fa, pb, "", !1, []);
  fa.random = ca(fa);
  h.fn.sudoSlider.effects = fa;
})(jQuery, window);

/***/ })

}]);
//# sourceMappingURL=8.ecc530.js.map