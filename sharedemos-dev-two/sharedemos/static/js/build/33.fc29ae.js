(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./sharedemos/static/js/seo/silverpeak/views/home.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/seo/silverpeak/views/home.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone) {
  'use strict';

  var HomeView = Backbone.View.extend({
    el: '.split-playlist-container',
    events: {
      'click .banner-media-launcher': 'showBannerMedia',
      'click .hide-media-popup': () => {
        $('body').removeClass('show-media');
      }
    },
    showBannerMedia: function (event) {
      this.$el.parents('body').addClass('show-media');
      if (this.$('.media-link').hasClass('media-src-added')) return;

      if (this.$(event.currentTarget).hasClass('wistia')) {
        this.$('.media-slider').find('iframe').show();
      } else {
        let imgSource = this.$('.media-link').data('media-link');
        let imgEle = `<img src="${imgSource}" alt="banner-image" />`;
        this.$('.media-link').after(imgEle);
      }

      this.$('.media-link').addClass('media-src-added');
    }
  });
  return HomeView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=33.fc29ae.js.map