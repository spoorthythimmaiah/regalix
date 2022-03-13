(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

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

/***/ "./sharedemos/static/js/apps/journeys/templates/filters.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/filters.handlebars ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"journey-filter-block\" data-group=\""
    + alias2(alias1(blockParams[0][1], depth0))
    + "\">\n        <div class=\"filter-heading-block\">\n            <h4 class=\"filter-heading\">"
    + alias2(alias1(blockParams[0][1], depth0))
    + "</h4>\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":7,"column":8},"end":{"line":17,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div>\n                <div class=\"checkbox\">\n                    <label class=\"checkbox-label\" for=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-"
    + alias2(alias1(depth0, depth0))
    + "\" >\n                        <input type=\"checkbox\" class=\"filter-item\" data-group=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "\" id=\""
    + alias2(alias1(blockParams[1][1], depth0))
    + "-"
    + alias2(alias1(depth0, depth0))
    + "\" name=\""
    + alias2(alias1(depth0, depth0))
    + "\">\n                        <span class=\"checkbox-icon\"><i class=\"cr-icon glyphicon glyphicon-ok\"></i></span>\n                        "
    + alias2(alias1(depth0, depth0))
    + "\n                    </label>\n                </div>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Journeys filter -->\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":2,"column":0},"end":{"line":19,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/templates/items.handlebars":
/*!***********************************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/templates/items.handlebars ***!
  \***********************************************************************/
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

  return "        <div class=\"col-xs-12 col-sm-6 col-md-4 item-block-wrapper\">\n            <div class=\"item-block\">\n                <a href=\"/j/"
    + alias4(((helper = (helper = lookupProperty(helpers,"slug") || (depth0 != null ? lookupProperty(depth0,"slug") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"slug","hash":{},"data":data,"loc":{"start":{"line":6,"column":28},"end":{"line":6,"column":36}}}) : helper)))
    + "\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"icon_path") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":7,"column":20},"end":{"line":11,"column":27}}})) != null ? stack1 : "")
    + "                    <h5 class=\"card-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":12,"column":43},"end":{"line":12,"column":51}}}) : helper)))
    + "</h5>\n                </a>\n            </div>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img src=\"/static/media/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"icon_path") || (depth0 != null ? lookupProperty(depth0,"icon_path") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"icon_path","hash":{},"data":data,"loc":{"start":{"line":8,"column":48},"end":{"line":8,"column":61}}}) : helper)))
    + "\" class=\"card-img-top\" />\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                        <img src=\"/static/images/journey-default-icon.jpg\" class=\"card-img-top img-responsive center-block\" />\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<!-- Journeys list -->\n<div class=\"row items-block-wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":16,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/apps/journeys/views/home.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/apps/journeys/views/home.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/journeys */ "./sharedemos/static/js/apps/journeys/models/journeys.js"), __webpack_require__(/*! ../templates/filters.handlebars */ "./sharedemos/static/js/apps/journeys/templates/filters.handlebars"), __webpack_require__(/*! ../templates/items.handlebars */ "./sharedemos/static/js/apps/journeys/templates/items.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Journeys, Filters, JourneysList) {
  'use strict';

  var MasterJourneysView = Backbone.View.extend({
    el: '#main_container',
    journeysList: [],
    events: {
      'click .filter-item': 'filterJourney'
    },

    initialize() {
      this.listAllJourneys();
    },

    listAllJourneys() {
      let journeys = new Journeys();
      let root = this;
      journeys.fetch({
        success(model, resp) {
          if (!resp.length) {
            root.$('.journey-block').addClass('content-not-found');
            return;
          }

          if (resp['ret_url']) {
            let args = {
              next: window.location.pathname + window.location.hash
            };
            resp['ret_url'] += '?' + $.param(args);
            window.location.href = window.location.origin + resp['ret_url'];
          }

          root.journeysList = resp;
          let filters = {}; // Get filters group name and its options.
          // filters = {groupName(key): options(value)}

          _.each(resp, data => {
            _.each(data.tags, tag => {
              if (filters[tag.name]) {
                filters[tag.name] = _.unique(filters[tag.name].concat(tag.options)).sort();
              } else {
                filters[tag.name] = tag.options.sort();
              }
            });
          });

          root.$('.filters-block').html(Filters(filters));
          root.$('.items-block').html(JourneysList(resp));
          root.$('.journey-block').addClass('content-loaded');
        },

        error(model, resp) {
          console.log('something went wrong', model, resp);
        }

      });
    },

    validateJourney(journeyTags, checkedItems) {
      // 'checkedItems' is an object containing checked groups and options,
      // checkedItems = {'CHECKED_GROUP': ['LIST_OF_CHECKED_OPTIONS'], ...}
      // Check if the journey has all the groups which are checked,
      // and atleast one of the options in each group.
      let checkedGroups = Object.keys(checkedItems); // The journey tags will be in this format:
      // journeyTags = [{'name': 'GROUP_NAME', 'options': ['LIST OF OPTIONS']}, ...]
      // Now the below method converts it into:
      // formattedJourneyTags = { 'GROUP_NAME': ['LIST OF OPTIONS'], ... }

      let journeyGroups = [];
      let formattedJourneyTags = {};
      $.each(journeyTags, (idx, tag) => {
        journeyGroups.push(tag.name);
        formattedJourneyTags[tag.name] = tag.options;
      });
      var isValid = true;
      $.each(checkedGroups, (idx, grp) => {
        // Check if the journey has groups which are 'checked'.
        // Even if one of the checked group is not present in the journey,
        // then its not displayed, as there is an 'AND' condition
        // between the groups.
        let itemIndex = $.inArray(grp, journeyGroups);

        if (itemIndex === -1) {
          isValid = false;
          return false; // returning 'false' inside a $.each will actually
          // 'break' the entire execution and exits the iteration.
        }
      });
      if (!isValid) return false; // Check if any one of the journey options are checked.

      $.each(formattedJourneyTags, (journeyGroup, journeyOptions) => {
        let itemIndex = $.inArray(journeyGroup, checkedGroups);

        if (itemIndex !== -1) {
          let grp = checkedGroups[itemIndex];
          let checkedGrpOptions = checkedItems[grp];
          let booleanList = []; // The journey whose options doesn't have any one of the
          // checked option, will not be displayed.

          $.each(journeyOptions, (idx, option) => {
            if (checkedGrpOptions.includes(option)) {
              booleanList.push(true);
            } else {
              booleanList.push(false);
            }
          }); // The booleanList will contain all false values,
          // if the journey's options doesn't include any one of the checked option.

          let allFalses = _.every(booleanList, val => {
            return val === false;
          });

          if (allFalses) {
            isValid = false;
            return false;
          }
        }
      });
      return isValid;
    },

    getCheckedItems() {
      let filterBlocks = $('.journey-filter-block');
      let checkedItems = {};
      filterBlocks.each(function (idx, ele) {
        let groupName = $(ele).data('group');
        let optList = [];
        $.each($(`.filter-item[data-group="${groupName}"]:checked`), function (idx, opt) {
          optList.push($(opt).attr('name'));
        });
        if (optList.length) checkedItems[groupName] = optList;
      });
      return checkedItems;
    },

    filterJourney(e) {
      let checkedItems = this.getCheckedItems();
      let filteredJourneys = [];
      $.each(this.journeysList, (idx, journey) => {
        let isValid = this.validateJourney(journey.tags, checkedItems);
        if (isValid) filteredJourneys.push(journey);
      });
      this.$('.items-block').html(JourneysList(filteredJourneys));
    }

  });
  return MasterJourneysView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/helpers/cookies.js":
/*!*************************************************!*\
  !*** ./sharedemos/static/js/helpers/cookies.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

SDCookies = function () {
  var SDCookies = {
    getItem: function (sKey) {
      if (!sKey || !this.hasItem(sKey)) {
        return null;
      }

      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
        return;
      }

      var sExpires = "";

      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
            break;

          case String:
            sExpires = "; expires=" + vEnd;
            break;

          case Date:
            sExpires = "; expires=" + vEnd.toGMTString();
            break;
        }
      }

      document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
      if (!sKey || !this.hasItem(sKey)) {
        return;
      }

      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
      return new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie);
    },
    keys:
    /* optional method: you can safely remove it! */
    function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);

      for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
        aKeys[nIdx] = unescape(aKeys[nIdx]);
      }

      return aKeys;
    }
  };
  return SDCookies;
}();

/***/ })

}]);
//# sourceMappingURL=27.0bcc7e.js.map