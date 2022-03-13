(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./sharedemos/static/js/seo/dell/templates/data_slider.handlebars":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/seo/dell/templates/data_slider.handlebars ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <a href=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" target=\"_blank\">\r\n            <div class=\"slider-item\">\r\n                <div class=\"slider-icon\">\r\n                    <img src=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"image_src") || (depth0 != null ? lookupProperty(depth0,"image_src") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"image_src","hash":{},"data":data,"loc":{"start":{"line":7,"column":30},"end":{"line":7,"column":43}}}) : helper)))
    + "\" alt=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":50},"end":{"line":7,"column":58}}}) : helper)))
    + "\" />\r\n                </div>\r\n                <h4 title=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":27},"end":{"line":9,"column":35}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":35},"end":{"line":9,"column":82}}})) != null ? stack1 : "")
    + "\">\r\n                    "
    + alias1(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":20},"end":{"line":10,"column":28}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias2,(depth0 != null ? lookupProperty(depth0,"section_name") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":28},"end":{"line":10,"column":75}}})) != null ? stack1 : "")
    + "\r\n                </h4>\r\n            </div>\r\n        </a>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " - "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"section_name") || (depth0 != null ? lookupProperty(depth0,"section_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"section_name","hash":{},"data":data,"loc":{"start":{"line":9,"column":59},"end":{"line":9,"column":75}}}) : helper)));
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"slider-nav\"></div>\r\n<div class=\"slider-content\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"chapters") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":14,"column":13}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/seo/dell/templates/data_slider_navbar.handlebars":
/*!*******************************************************************************!*\
  !*** ./sharedemos/static/js/seo/dell/templates/data_slider_navbar.handlebars ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"slider-header\">\n    <div class=\"slider-content-type\">\n        <div class=\"selected-slider-type text-capitalize\">Featured</div>\n        <ul class=\"slider-type-options\">\n            <li class=\"active-slider-type\" data-value=\"featured\">Featured</li>\n            <li data-value=\"recent\">Recently Added</li>\n            <li data-value=\"trending\">Trending</li>\n        </ul>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/seo/dell/views/dataSlider.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/seo/dell/views/dataSlider.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../templates/data_slider_navbar.handlebars */ "./sharedemos/static/js/seo/dell/templates/data_slider_navbar.handlebars"), __webpack_require__(/*! ../templates/data_slider.handlebars */ "./sharedemos/static/js/seo/dell/templates/data_slider.handlebars"), __webpack_require__(/*! slick */ "./sharedemos/static/libs/slick/slick.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, sliderNavBar, sliderTemplate) {
  var sliderView = Backbone.View.extend({
    el: '#data-slider',
    navbarTemplate: sliderNavBar,
    template: sliderTemplate,
    DEFAULT_AUDIO_ICON: '/static/images/thumb-audio.png',
    DEFAULT_CHAPTER_ICON: '/static/images/default_chapter_icon.jpg',
    DEFAULT_EXTERNAL_LINK_ICON: '/static/images/thumb-external.jpg',
    DEFAULT_FILE_ICON: '/static/images/dell/thumb-file.jpg',
    DEFAULT_LINKED_ASSET_ICON: '/static/images/thumb-pdf.jpg',
    DEFAULT_LINK_ICON: '/static/images/author/thumb-link.jpg',
    DEFAULT_IFRAME_ICON: '/static/images/author/thumb-iframe.jpg',
    DEFAULT_SECTION_ICON: '/static/images/dell/default-thumbnail.jpg',
    SLIDER_DATA_MAP: {
      'featured': document.featuredChapters,
      'recent': document.recentChapters,
      'trending': document.trendingChapters
    },
    SLIDER_OPTIONS: {
      'featured': 'featured',
      'recent': 'recently added',
      'trending': 'trending'
    },
    events: {
      "click .slider-content-type": 'toggleOptions',
      "click .slider-type-options li": 'selectOption'
    },

    initialize() {
      if (this.SLIDER_DATA_MAP['featured'].length || this.SLIDER_DATA_MAP['recent'].length || this.SLIDER_DATA_MAP['trending'].length) {
        this.render();
      }
    },

    render: function () {
      this.$el.find('#data-slider-navbar').html(this.navbarTemplate);
      let chapters = [];
      let selectedOption = 'featured';

      if (this.SLIDER_DATA_MAP['featured'].length) {
        chapters = this.SLIDER_DATA_MAP['featured'];
      } else if (this.SLIDER_DATA_MAP['recent'].length) {
        chapters = this.SLIDER_DATA_MAP['recent'];
        selectedOption = 'recent';
      } else if (this.SLIDER_DATA_MAP['trending'].length) {
        chapters = this.SLIDER_DATA_MAP['trending'];
        selectedOption = 'trending';
      }

      this.renderSlider(selectedOption);
      return this;
    },

    initSlider(chapters) {
      _.each(chapters, chapter => {
        let image_src = chapter.image_src;
        let link_type = chapter.link_type;

        if (link_type === 'external') {
          image_src = this.DEFAULT_EXTERNAL_LINK_ICON;
        } else if (link_type === 'internal' && chapter.is_linked_asset && !image_src) {
          image_src = this.DEFAULT_LINKED_ASSET_ICON;
        } else if (!image_src) {
          switch (true) {
            case chapter.slide_type == 'asset':
              image_src = this.DEFAULT_LINKED_ASSET_ICON;
              break;

            case chapter.slide_type == 'audio':
              image_src = this.DEFAULT_AUDIO_ICON;
              break;

            case chapter.slide_type == 'file':
              image_src = this.DEFAULT_FILE_ICON;
              break;

            case chapter.slide_type == 'link' || chapter.slide_type == 'embed':
              image_src = this.DEFAULT_LINK_ICON;
              break;

            case chapter.slide_type == 'iframe' || chapter.slide_type == 'html5':
              image_src = this.DEFAULT_IFRAME_ICON;
              break;

            case chapter.slide_type == 'section':
              image_src = this.DEFAULT_SECTION_ICON;
              break;

            default:
              image_src = this.DEFAULT_CHAPTER_ICON;
          }
        }

        chapter.image_src = image_src;
      });

      this.$el.find('#data-slider-content').html(this.template({
        chapters: chapters
      }));
      var root = this;
      this.$el.find('.slider-content').slick({
        infinite: false,
        appendArrows: root.$el.find('.slider-nav'),
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
    },

    renderSlider: function (selectedOption) {
      this.$el.find('.slider-type-options li').removeClass('active-slider-type');
      this.$el.find(`.slider-type-options li[data-value=${selectedOption}]`).addClass('active-slider-type');
      this.$el.find('.selected-slider-type').html(this.SLIDER_OPTIONS[selectedOption]);
      this.initSlider(this.SLIDER_DATA_MAP[selectedOption]);
    },
    selectOption: function (e) {
      let selectedOption = this.$(e.currentTarget).data('value');
      this.renderSlider(selectedOption);
    },
    toggleOptions: function (e) {
      let filterElem = this.$el.find('.slider-content-type');
      !filterElem.hasClass('active') ? filterElem.addClass('active') : filterElem.removeClass('active');
    }
  });
  return sliderView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=29.db9a84.js.map