(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ }),

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

/***/ "./sharedemos/static/js/helpers/sync.js":
/*!**********************************************!*\
  !*** ./sharedemos/static/js/helpers/sync.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, Backbone) {
  'use strict';

  var _sync = Backbone.sync;

  Backbone.sync = function (method, model, options) {
    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
    }

    ;

    function sameOrigin(url) {
      // test that a given url is a same-origin URL
      // url could be relative or scheme relative or absolute
      var host = document.location.host; // host + port

      var protocol = document.location.protocol;
      var sr_origin = '//' + host;
      var origin = protocol + sr_origin; // Allow absolute or scheme relative URLs to same origin

      return url == origin || url.slice(0, origin.length + 1) == origin + '/' || url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/' || // or any other URL that isn't scheme relative or absolute i.e relative.
      !/^(\/\/|http:|https:).*/.test(url);
    }

    ;

    options.beforeSend = function (xhr, settings) {
      var csrftoken = $('meta[name=csrf-token]').attr('content');

      if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      }

      if (document.requestParameters) {
        var base_url = settings.url.split('?');

        if (base_url.length > 1) {
          settings.url = base_url[0] + document.requestParameters() + '&' + base_url[1];
        } else {
          settings.url = settings.url + document.requestParameters();
        }
      }

      if (settings.type == 'GET' && document.isOffline) {
        settings.url += '.json';
      }
    };

    return _sync(method, model, options);
  };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/common.js":
/*!***********************************************!*\
  !*** ./sharedemos/static/js/tenant/common.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/


!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jcf */ "./sharedemos/static/libs/jcf/jcf.js"), __webpack_require__(/*! ./models/check_redirect_url */ "./sharedemos/static/js/tenant/models/check_redirect_url.js"), __webpack_require__(/*! ./models/cta_analytics */ "./sharedemos/static/js/tenant/models/cta_analytics.js"), __webpack_require__(/*! ./models/download */ "./sharedemos/static/js/tenant/models/download.js"), __webpack_require__(/*! ./models/product-tree */ "./sharedemos/static/js/tenant/models/product-tree.js"), __webpack_require__(/*! ./models/repository_connector */ "./sharedemos/static/js/tenant/models/repository_connector.js"), __webpack_require__(/*! ./models/audio_video_analytics */ "./sharedemos/static/js/tenant/models/audio_video_analytics.js"), __webpack_require__(/*! ./models/sample_exchange_activity */ "./sharedemos/static/js/tenant/models/sample_exchange_activity.js"), __webpack_require__(/*! ./models/visit */ "./sharedemos/static/js/tenant/models/visit.js"), __webpack_require__(/*! ./templates/languages.handlebars */ "./sharedemos/static/js/tenant/templates/languages.handlebars"), __webpack_require__(/*! ./templates/search-results.handlebars */ "./sharedemos/static/js/tenant/templates/search-results.handlebars"), __webpack_require__(/*! ./templates/texteditor_preview.handlebars */ "./sharedemos/static/js/tenant/templates/texteditor_preview.handlebars"), __webpack_require__(/*! ./templates/notes-links-popup.handlebars */ "./sharedemos/static/js/tenant/templates/notes-links-popup.handlebars"), __webpack_require__(/*! ./templates/image-popup.handlebars */ "./sharedemos/static/js/tenant/templates/image-popup.handlebars"), __webpack_require__(/*! ./templates/check-default-locale-popup.handlebars */ "./sharedemos/static/js/tenant/templates/check-default-locale-popup.handlebars"), __webpack_require__(/*! jcf.scrollable */ "./sharedemos/static/libs/jcf/jcf.scrollable.js"), __webpack_require__(/*! cookies */ "./sharedemos/static/js/helpers/cookies.js"), __webpack_require__(/*! wheelzoom */ "./sharedemos/static/libs/wheelzoom/wheelzoom.js"), __webpack_require__(/*! ../helpers/sync */ "./sharedemos/static/js/helpers/sync.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function ($, _, jcf, CheckRedirect, CTAAnalytics, Download, ProductTree, RepositoryConnector, AudioVideoAnalytics, SampleExchangeActivity, VisitActivity, LanguageListTemplate, SearchResultsTemplate, texteditorPreview, NotesLinkPopup, ImagePopup, CheckDefaultLocalePopup) {
  return {
    // key constants
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39,
    BACKSPACE: 8,
    CURRENT_SLIDE: 0,
    DEFAULT_AUDIO_ICON: '/static/images/thumb-audio.png',
    DEFAULT_IFRAME_ICON: '/static/images/author/thumb-iframe.jpg',
    DEFAULT_CHAPTER_ICON: '/static/images/default_chapter_icon.jpg',
    DEFAULT_LINK_ICON: '/static/images/default_link_icon.png',
    DEFAULT_EXTERNAL_LINK_ICON: '/static/images/author/thumb-link.jpg',
    DEFAULT_MEDIA_PATH: '/static/media/',
    DEFAULT_VIDEO_POSTER: '/static/images/video-thumb.jpg',
    ENTER_KEY: 13,
    EXTERNAL_RESOURCE_PATH: '/static/media/external_icons/',
    ESCAPE_KEY: 27,
    VIDEO_FILE_MAX_SIZE: 500,
    DEFAULT_FILE_MAX_SIZE: 700,
    KEY_NAVIGATION: true,
    LETTER_I: 73,
    LETTER_Y: 89,
    LOCAL_STORAGE: window.sessionStorage || window.localStorage,
    LOREM_IPSUM: '',
    SPACEBAR: 32,
    SHOW_HOTSPOT: true,
    SLIDE_TRANSITION_EFFECT: 'fade',
    SLIDE_TRANSITION_SPEED: 'normal',
    //  'fast', 'normal', 'slow' or  400, 800 and 1200
    SECTION_IMAGE_PATH: '/static/images/section-default-icon.png',
    SECTION_ASSET_ROUTE: '/section-assets/',
    SECTION_LINK_TYPE_IMAGE_PATH: '/static/images/section-default-link-icon.png',
    SKIP_SANDBOX: false,
    SUGGESTION_PLACEHOLDER: {
      "title": "Perfect! We've found recommended content that should help you with your problem.",
      "body": "These steps should help you align Professional Services solutions with the customer's current challenges."
    },
    VISIT_STACK: [],
    USER_SHOW_NOTES: false,
    // Froala settings
    FROALA_KEY: 'MB1C2D1C1lG4J4A14A7D3D6A5C2H4D3gSXSE1LHAFJVCXCLS==',
    FROALA_RESOURCE_UPLOAD_URL: '/api/resource/rte-asset?author=1',
    FROALA_COLORS_BACKGROUND: ['#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC', '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000', '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF', '#FAC51C', '#F37934', '#D14841', '#CC1F26', '#7C706B', '#D1D5D8', 'REMOVE'],
    FROALA_COLORS_TEXT: ['#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC', '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000', '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF', '#FAC51C', '#F37934', '#D14841', '#CC1F26', '#7C706B', '#D1D5D8', 'REMOVE', '#275B58', '#408975', '#808080', '#FF3D6F'],
    FROALA_IMAGE_EDIT_BUTTONS: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
    FROALA_TOOLBAR_BUTTONS: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', '|', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'subscript', 'superscript', 'importTextFromURL', 'embedURL', 'print', 'specialCharacters', 'help', 'fontAwesome', 'lineHeight', 'inlineStyle'],
    FROALA_FONT_FAMILY: {
      "Arial, Helvetica, sans-serif": 'Arial',
      "franklin-gothic-urw, sans-serif": 'Franklin Gothic',
      "Georgia, serif": 'Georgia',
      "Impact, Charcoal, sans-serif": 'Impact',
      "Tahoma, Geneva, sans-serif": 'Tahoma',
      "Times New Roman, Times, serif, -webkit-standard": 'Times New Roman',
      "Verdana, Geneva, sans-serif": 'Verdana',
      "Calibri, sans-serif": 'Calibri',
      "Open Sans": 'Open Sans'
    },
    // Froala BMC settings
    FROALA_BMC_COLORS_TEXT: ['#000000', '#FE5000', '#00427E', '#FF0000', '#8D8D8D'],
    FROALA_BMC_TABLE_COLORS: ['#54ACD2', '#efefef'],
    FROALA_BMC_TABLE_STYLES: {
      'bmc-table': 'BMC Table',
      'bmc-table-two': 'BMC Table Two'
    },
    FROALA_BMC_INLINE_STYLES: {
      'BMC heading one': 'font-family: Arial, Helvetica, sans-serif; font-size: 30pt; color: #fe5000;',
      'BMC heading two': 'font-family: Arial, Helvetica, sans-serif; font-size: 18pt; color: #00427e;',
      'BMC heading three': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #000; font-weight: bold;',
      'BMC normal': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #000;',
      'BMC warning': 'font-family: Arial, Helvetica, sans-serif; font-size: 12pt; color: #f00;'
    },
    // Froala HELP settings
    FROALA_HELP_COLORS_TEXT: ['#000000', '#40435b', '#828b90', '#066AFE', '#23CE00'],
    FROALA_HELP_TABLE_COLORS: ['#779de8', '#99a3a7'],
    FROALA_HELP_TABLE_STYLES: {
      'help-table': 'HELP Table',
      'help-table-two': 'HELP Table Two'
    },
    FROALA_HELP_INLINE_STYLES: {
      'HELP heading one': 'font-family:  franklin-gothic-urw, Helvetica, sans-serif; font-size: 30px; color: #066AFE;',
      'HELP heading two': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 24px; color: #40435B;',
      'HELP heading three': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 18px; color: #000; font-weight: bold;',
      'HELP normal': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #000;',
      'HELP callout': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #828B90;',
      'HELP warning': 'font-family: franklin-gothic-urw, Helvetica, sans-serif; font-size: 16px; color: #23CE00;'
    },
    // Froala DE settings
    FROALA_DE_INLINE_STYLES: {
      'Heading one': 'font-family:  Open Sans; font-size: 24px; color: #275B58;',
      'Heading two': 'font-family:  Open Sans; font-size: 18px; color: #408975;',
      'Heading three': 'font-family: Open sans; font-size: 14px; color: #000; font-weight: bold;',
      'Normal': 'font-family: Open sans; font-size: 14px; color: #000; text-align: justify;',
      'Errors/warnings': 'font-family: Open sans; font-size: 14px; color: #FF3D6F;',
      'Call out': 'font-family: Open sans; font-size: 18px; color: #808080'
    },
    FROALA_DE_TABLE_COLORS: ['#268974', '#F4F4F4'],
    FROALA_DE_TABLE_STYLES: {
      'de-table': 'DE Table'
    },
    toggleMobileShare: function (root, event) {
      root.$('#player-container').toggleClass('mobile-social-active').removeClass('language-active notes-active share-active');
    },
    toggleMobileFullScreen: function (root, event) {
      root.$('#player-container').toggleClass('mobile-full-screen-active').removeClass('language-active notes-active share-active');
    },
    changeLanguage: function (event) {
      var val = $(event.currentTarget).attr('lvalue');
      var root = event.data && event.data.root || this;

      if (document.requestParameters) {
        SDCookies.setItem('author_locale', val, null, '/');
      } else {
        SDCookies.setItem('user_locale', val, null, '/');
      }

      var changedLanguage = $(event.currentTarget).text();
      root.triggerGAevent('Header', 'Change Language - ' + changedLanguage);
      window.location.reload(true);
    },
    changeLanguageMobile: function (event) {
      var val = $(event.currentTarget).children("option:selected").attr('lvalue');
      var root = event.data && event.data.root || this;

      if (document.requestParameters) {
        SDCookies.setItem('author_locale', val, null, '/');
      } else {
        SDCookies.setItem('user_locale', val, null, '/');
      }

      var changedLanguage = $(event.currentTarget).text();
      root.triggerGAevent('Header', 'Change Language - ' + changedLanguage);
      window.location.reload(true);
    },
    checkRedirect: function (url) {
      if (url) {
        var split_url = url.split('/');
        this.model = new CheckRedirect({
          product: split_url[0],
          section: split_url[1],
          walkthrough: split_url[2]
        });
        var root = this;
        $.when(this.model.fetch()).done(function () {
          var new_url = root.model.get('new_url');
          Backbone.history.navigate('#!/' + new_url, {
            trigger: true
          });
        }).fail(function () {
          Backbone.history.navigate("/", {
            trigger: true
          });
        });
      }
    },
    isDefaultLocale: function (root) {
      if (document.defaultLocaleID != document.current_locale) {
        root.$('.popup-wrap').html(CheckDefaultLocalePopup({
          'default_language': document.defaultLocale
        }));
        root.$('.popup-overlay').addClass('active');
        return false;
      }

      return true;
    },
    downloadSample: function (event) {
      event.preventDefault();
      var attrs = {
        "entity_type": "SAMPLE",
        "entity_id": event.target.dataset.id,
        "name": event.target.dataset.name,
        "url": event.target.dataset.url
      };
      var download = new Download();
      download.save(attrs, {
        success: function (model, response) {
          var link = document.createElement("a");
          link.download = attrs.name;
          link.href = attrs.url;
          document.body.appendChild(link);
          link.click();
        },
        error: function (xhr, status_code, message) {
          console.log(xhr, status_code, message);
        }
      });
    },
    getEmbedVideoDetails: function (video_url) {
      //url rewrite
      var api_request_url, video_details;

      if (!/^(\/\/|http:|https:).*/.test(video_url)) {
        video_url = window.location.protocol + '//' + video_url;
      } //api url rewrite


      if (/youtu/i.test(video_url)) {
        var youtube_video_id = this.youtube_parser(video_url);

        if (youtube_video_id != 'error') {
          api_request_url = 'https://www.youtube.com/oembed?url=http://youtube.com/watch?v=' + youtube_video_id;
        }
      } else if (/vimeo/i.test(video_url)) {
        api_request_url = 'https://vimeo.com/api/oembed.json?url=' + video_url;
      } else if (/brightcove/i.test(video_url)) {
        var urlData = new URL(video_url);
        var videoId = urlData.searchParams.get('videoId');
        var accountId = urlData.pathname.split("/")[1];
        var apiBaseURL = 'https://edge.api.brightcove.com/playback/v1';
        var requestURL = apiBaseURL + '/accounts/' + accountId + '/videos/' + videoId;
        var urlConfig = video_url.replace('index.html', 'config.json');
        $.ajax({
          url: urlConfig,
          type: "GET",
          async: false,
          success: function (data, status) {
            $.ajax({
              url: requestURL,
              type: "GET",
              async: false,
              headers: {
                'Accept': 'application/json;pk=' + data.video_cloud.policy_key
              },
              success: function (response) {
                video_details = {
                  'title': response.name,
                  'thumbnail_url': response.poster,
                  'src': video_url
                };
              },
              error: function (xhr, status_code, message) {
                console.log(xhr.responseJSON['message']);
              }
            });
          },
          error: function (xhr, status_code, message) {
            console.log(xhr.responseJSON['message']);
          }
        });
      } // api call to get video details        


      if (api_request_url) {
        $.ajax({
          url: '/embed-data',
          data: {
            'api_request_url': api_request_url
          },
          dataType: "json",
          async: false,
          success: function (response) {
            video_details = response;
          },
          error: function (xhr, status_code, message) {
            console.log(xhr.responseJSON['message']);
          }
        });
      }

      return video_details;
    },
    getSuggestionImageSrc: function (suggestion) {
      var imageSrc = '/static/images/default_chapter_icon.jpg';
      if (suggestion.external_url) imageSrc = suggestion.external_url.icon || this.DEFAULT_LINK_ICON;else if (suggestion.resource) {
        let resource = suggestion.resource;
        let resource_type = resource.resource_type;
        let media_path = resource_type == 'link' ? this.EXTERNAL_RESOURCE_PATH : this.DEFAULT_MEDIA_PATH;
        let meta_data = resource.meta_data || {};

        if (resource_type == 'image') {
          imageSrc = media_path + resource.path;
        } else if (resource_type == 'sandbox') {
          imageSrc = resource.path;
        } else if (resource_type == '360') {
          imageSrc = `${media_path}${resource.path}/1.jpg`;
        } else if (resource_type == 'link') {
          imageSrc = media_path + resource.meta_data.icon_name;
        } else if (resource_type == 'embed') {
          imageSrc = meta_data.thumbnail_url ? meta_data.thumbnail_url : this.DEFAULT_LINK_ICON;
        } else if (resource_type == 'pdf' && meta_data.thumbnail_url) {
          imageSrc = media_path + meta_data.thumbnail_url;
        }
      }
      return imageSrc;
    },
    updatePathfinderIconSrc: function (data) {
      if (data.icon) {
        data.image_src = this.DEFAULT_MEDIA_PATH + data.icon.path;
      }

      if (data.options) {
        var root = this;

        _.each(data.options, function (option) {
          if (option.icon) {
            option.image_src = root.DEFAULT_MEDIA_PATH + option.icon.path;
          }
        });
      }

      return data;
    },
    getLastVisit: function () {
      if (this.VISIT_STACK.length) {
        return this.VISIT_STACK[this.VISIT_STACK.length - 1];
      }

      return null;
    },
    generateUUID: function () {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    },
    getParent: function () {
      if (this.VISIT_STACK.length) {
        return this.VISIT_STACK[this.VISIT_STACK.length - 2];
      }

      return null;
    },
    getProductTree: function (product_id, section_id, callback) {
      this.product_tree = new ProductTree({
        product: product_id,
        section: section_id
      });
      this.product_tree.on('change', _.bind(function () {
        this.resetVisits();
        this.setVisit({
          'name': 'Home',
          'slug': null
        });
        var root = this;

        _.each(this.product_tree.get('path'), function (section) {
          section.description = section.description || root.LOREM_IPSUM;
          root.setVisit(section);
        });

        callback && callback();
      }, this));
      var root = this;
      $.when(this.product_tree.fetch()).fail(function (jqXHR, textStatus, errorThrown) {
        root.modelFetchErrorHandler(jqXHR, textStatus, errorThrown);
      });
    },
    getProgressClass: function (progress) {
      var p_class;

      if (progress >= 10 && progress < 20) {
        p_class = 'fill10';
      } else if (progress >= 20 && progress < 30) {
        p_class = 'fill20';
      } else if (progress >= 30 && progress < 40) {
        p_class = 'fill30';
      } else if (progress >= 40 && progress < 50) {
        p_class = 'fill40';
      } else if (progress >= 50 && progress < 60) {
        p_class = 'fill50';
      } else if (progress >= 60 && progress < 70) {
        p_class = 'fill60';
      } else if (progress >= 70 && progress < 80) {
        p_class = 'fill70';
      } else if (progress >= 80 && progress < 90) {
        p_class = 'fill80';
      } else if (progress >= 90 && progress < 100) {
        p_class = 'fill90';
      } else if (progress >= 100) {
        p_class = 'fill100';
      }

      return p_class;
    },
    hideEntities: function () {
      if (document.isPrivateTenant && document.isUserAnonymous) $('.open-path-finder').hide();else $('.open-path-finder').show();
    },
    isCharKey: function (e) {
      if (e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105 || e.which == 91) {
        return true;
      }

      return false;
    },
    isValidCharacter: function (e) {
      return this.isCharKey(e) || e.keyCode === this.BACKSPACE;
    },
    loadWalkthrough: function (product, section, walkthrough, slide_index) {
      if (product == section) {
        var walkthrough_url = '#!/' + product + '/' + walkthrough;
      } else {
        var walkthrough_url = '#!/' + product + '/' + section + '/' + walkthrough;
      }

      if (!slide_index) {
        // if showThankyou page has been displayed, remove it.
        $('#player-container').removeClass('cta-active');
        $(".slidesContainer").css("z-index", "0");
        slide_index = 1;
      }

      Backbone.history.navigate(walkthrough_url + '/' + slide_index, {
        trigger: true
      });
    },
    loadLanguages: function (languages) {
      var l_list = _.filter(languages.languages, function (lang) {
        return lang.locale !== languages.selected.locale;
      });

      var l_selected = languages.selected;

      var default_language = _.find(languages.languages, function (lang) {
        return lang.default_locale == true;
      });

      var locale_available = _.find(languages.languages, function (lang) {
        return languages.selected.locale == lang.locale;
      });

      if (!locale_available) {
        l_selected = default_language;
        l_list = _.filter(l_list, function (lang) {
          return lang.locale !== l_selected.locale;
        });
      }

      $('.sd-language').html(LanguageListTemplate({
        'selected': l_selected,
        'languages': l_list
      }));

      var _this = this;

      $("#user-language li").on('click', {
        'root': this
      }, function (e) {
        _this.changeLanguage(e);
      });
    },
    trackCTAAnalytics: function (cta_id, product, section, chapter) {
      if (!document.isOffline && ['home', 'journey'].includes(document.viewType.toLocaleLowerCase())) {
        var args = {
          'cta_id': cta_id
        };

        if (product) {
          args['product'] = product;
        }

        if (section) {
          if (chapter || product !== section) {
            args['section'] = section;
          }
        }

        if (chapter) {
          args['chapter'] = chapter;
        }

        this.cta_activity = new CTAAnalytics(args);
        this.cta_activity.save();
      }
    },
    downloadResource: function (event) {
      /** Since downloading from CDN(i.e Cross domian) doesn't allow
          to re-name the downloaded file to its original name,
          Files will be downloaded from our server. 
      */
      event.preventDefault();
      let data = event.currentTarget.dataset;
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = this.DEFAULT_MEDIA_PATH + data.url.split('/').pop();
      a.download = data.name;
      document.body.appendChild(a);
      a.click(); // log download activity.

      this.logDownloads(data); // remove anchor tag from Body.

      document.body.removeChild(a);
    },
    logDownloads: function (data) {
      let attrs = {
        "entity_type": "RESOURCE",
        "entity_id": data.id,
        "name": data.name,
        "url": window.location.href
      };
      let download = new Download(attrs);
      download.save();
    },
    logSampleExchangeActivity: function (visit_args = {}) {
      let SamplesActivity = new SampleExchangeActivity(visit_args);
      SamplesActivity.save();
    },
    logVisitActivity: function (product, section, walkthrough) {
      if (!document.isOffline && document.viewType == 'home') {
        var visit_args = {};

        if (product) {
          visit_args['product'] = product;
        }

        if (section) {
          visit_args['section'] = section;
        }

        if (walkthrough) {
          visit_args['walkthrough'] = walkthrough;
        }

        this.visit_activity = new VisitActivity(visit_args);
        this.visit_activity.save();
      }
    },
    modelFetchErrorHandler: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status == 404) {
        var complete_url = Backbone.history.getHash();
        return this.checkRedirect(complete_url.split('!/')[1]);
      } else if (jqXHR.status == 400) {
        SDCookies.removeItem('user_locale');
        SDCookies.removeItem('author_locale');
        window.location.reload();
      }
    },
    positionPinTooltip: function (elem, currentSlide) {
      var toolTip = $('.pin-active .pin-tooltip');
      var elemOffsetTop = elem.offsetParent.offsetTop;
      var elemOffsetLeft = elem.offsetParent.offsetLeft;
      var elemOffsetRight = currentSlide.width() - (elemOffsetLeft + 40); // adding arrow height

      var elemOffsetBottom = currentSlide.height() - (elemOffsetTop + 40);
      var activePinTooltipWidth = $('.pin-active .pin-tooltip').width() + 40;
      var activePinTooltipHeight = $('.pin-active .pin-tooltip').height() + 40;

      if (elemOffsetTop > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth / 2 && elemOffsetRight > activePinTooltipWidth / 2) {
        toolTip.attr('data-pin-position', 'top');
      } else if (elemOffsetBottom > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth / 2 && elemOffsetRight > activePinTooltipWidth / 2) {
        toolTip.attr('data-pin-position', 'bottom');
      } else if (elemOffsetTop > activePinTooltipHeight / 2 && elemOffsetBottom > activePinTooltipHeight / 2 && elemOffsetLeft > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'left');
      } else if (elemOffsetTop > activePinTooltipHeight / 2 && elemOffsetBottom > activePinTooltipHeight / 2 && elemOffsetRight > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'right');
      } else if (elemOffsetBottom > activePinTooltipHeight && elemOffsetRight > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'bottom-left');
      } else if (elemOffsetBottom > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'bottom-right');
      } else if (elemOffsetTop > activePinTooltipHeight && elemOffsetRight > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'top-left');
      } else if (elemOffsetTop > activePinTooltipHeight && elemOffsetLeft > activePinTooltipWidth) {
        toolTip.attr('data-pin-position', 'top-right');
      } // set dynamic height for tooltip


      let pinBlock = toolTip.find('.pin-block');
      pinBlock.height('auto');

      if (toolTip.data('pin-position') == 'bottom' && activePinTooltipHeight > elemOffsetBottom) {
        pinBlock.height(elemOffsetBottom - 80);
      } else if (toolTip.data('pin-position') == 'top' && activePinTooltipHeight > elemOffsetTop) {
        pinBlock.height(elemOffsetTop - 80);
      }
    },
    removeLastVisit: function () {
      this.VISIT_STACK.pop();
    },
    resetVisits: function () {
      this.VISIT_STACK = [];
    },
    searchTags: function (event) {
      var searchTagText = event.target.textContent;
      $("#search-terms").val('tags: ' + searchTagText).trigger('keyup');
    },
    setVisit: function (section) {
      this.VISIT_STACK.push(section);
    },
    toggleDropDownDisplay: function () {
      var enabled = $('.dropdown-list');

      if (enabled.is(':visible')) {
        enabled.hide();
      } else {
        enabled.show();
      }

      $('#create-edit-demo ul.dropdown-list').niceScroll();
    },
    transition: function (direction) {
      if (document.template_folder !== 'default') {
        var newPage = $(".page-container:not(.page-current)");
        $(newPage).addClass('page-current');
        return;
      }

      var VISIT_STACK = this.VISIT_STACK;

      switch (direction) {
        case 'next':
          direction = +1;
          break;

        case 'prev':
          direction = -1;
          break;

        default:
          direction = 0;
      }

      ;
      var iflow = (VISIT_STACK.length || 1) + direction;
      var oflow = $('.block_container').attr('data-flow') || iflow;
      $('.block_container').attr('data-flow', iflow);
      var lastPage = $(".page-container.page-current");
      var newPage = $(".page-container:not(.page-current)");

      if (iflow == oflow) {
        $(newPage).addClass('page-current');
        $(lastPage).remove();
      } else if (iflow > oflow) {
        $(newPage).addClass("page-moveFromRight page-current");
        $(lastPage).addClass("page-moveToLeft");
        setTimeout(function () {
          $(newPage).removeClass("page-moveFromRight ");
          $(lastPage).remove();
        }, 1000);
      } else {
        $(newPage).addClass("page-moveFromLeft page-current");
        $(lastPage).addClass("page-moveToRight");
        setTimeout(function () {
          $(newPage).removeClass("page-moveFromLeft");
          $(lastPage).remove();
        }, 1000);
      }
    },
    tooltip: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    triggerGAevent: function (category, action) {
      !document.requestParameters && typeof ga != 'undefined' && ga('fwt_tracker.send', 'event', category, action);
    },
    trimSentence: function (string, length) {
      var trimmedString = string.length > length ? string.substring(0, length - 3) + "..." : string.substring(0, length);
      return trimmedString;
    },
    updateUrl: function (e) {
      if (e.altKey || [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(e.keyCode) !== -1) return;
      var value = e.target.value.trim();

      if (value && value.length && value.length >= 4 && value.indexOf('http') !== 0) {
        e.target.value = 'http://' + value;
      }
    },
    validateUrl: function (url) {
      return url.length && url.match(/^(http[s]?):\/\/([^/:]+\.[a-z]{2,10}|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]+)?(\/.*)?$/g);
    },
    validateEmail: function (email) {
      var emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+[\.]{1,})+([a-zA-Z0-9]{2,4})+$");
      return email && email.length && emailRegex.test(email);
    },
    validateCharLimit: function (text, limit) {
      return text.length <= limit ? false : true;
    },
    verifyParent: function (product, current_parent) {
      var parent_in_stack = this.getLastVisit();

      if (!parent_in_stack) {
        return false;
      }

      if (current_parent && current_parent.slug != parent_in_stack.slug) {
        if (this.VISIT_STACK.length) {
          this.removeLastVisit();
          return this.verifyParent(product, current_parent);
        } else {
          return false;
        }
      }

      if (this.VISIT_STACK.length >= 2) {
        if (this.VISIT_STACK[1].slug != product) {
          return false;
        }
      }

      return true;
    },
    youtube_parser: function (url) {
      var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return 'error';
      }
    },
    // Algolia search
    clearInputText: function (e) {
      $('#search-terms').val("");
      $('.search-input-cancel, .search-result').removeClass('active');
    },
    closePathFinder: function () {
      $('.path-finder-block').removeClass('active');
      $('.pf-close, .pf-nav, .send_pf_result').hide();
      $('#select-pf').empty();
    },
    closeSearchBox: function () {
      $('#search-terms').val("");
      $('.search-result, .search-overlay, .search-input-cancel, .search_input_block, #search-terms').removeClass('active');
    },
    getSearchResults: function () {
      var searchTerm = $('#search-terms').val();
      var client = algoliasearch(document.algolia_app_id, document.algolia_search_key);
      var index = client.initIndex(document.algolia_tenant_index);
      var searchParams = {
        hitsPerPage: 20,
        facets: '["category"]',
        filters: "is_enabled=1 AND category:'library'" // 1 is evaluated to Boolean true in Algolia.

      };

      if (document.isUserAnonymous) {
        searchParams.filters += ' AND is_public=1';
      }

      if (document.userGroups) {
        let groupsFilterList = [];

        _.each(document.userGroups, (grpId, idx) => {
          groupsFilterList.push(`groups=${grpId}`);
        });

        let groupsFilterText = groupsFilterList.join(' OR ');
        searchParams.filters += ` AND ${groupsFilterText}`;
      }

      var root = this;

      if (searchTerm && searchTerm.startsWith("tags: ")) {
        searchTerm = searchTerm.replace("tags: ", "");
        searchParams.restrictSearchableAttributes = 'tags';
        index.search(searchTerm, searchParams, $.proxy(root.searchCallback, root));
      } else {
        index.search(searchTerm, searchParams, $.proxy(root.searchCallback, root));
      }
    },
    renderSearchResults: function (searchResultsList) {
      var localeId = SDCookies.getItem('user_locale');
      var filteredResultsList = [];
      var root = this;

      _.each(searchResultsList, function (searchResult) {
        if (localeId && searchResult["title_" + localeId]) {
          searchResult.title = searchResult["title_" + localeId];
          searchResult.breadcrumb = searchResult["breadcrumb_" + localeId];
          let url = searchResult.url;

          if (searchResult['is_asset']) {
            if (searchResult["asset_url_" + localeId]) {
              url = searchResult["asset_url_" + localeId];
            } else {
              url = searchResult["asset_url_" + document.defaultLocaleID];
            }
          }

          searchResult.demo_url = url;
          filteredResultsList.push(searchResult);
        }
      });

      $('#search-result').html(SearchResultsTemplate({
        'search_results_list': filteredResultsList
      }));
    },
    searchCallback: function (err, content) {
      this.renderSearchResults(content.hits);
    },
    searchWalkthrough: function (event) {
      var search_term = $('#search-terms').val();
      $('.search_input_block').addClass('active');

      if (event.keyCode == 27) {
        if (search_term != '') {
          $('#search-terms').val("");
          $('.search-result, #input, .search_input_block').removeClass('active');
        } else {
          $('.search-result, #input, .search-overlay, .search_input_block').removeClass('active');
        }
      } else {
        var common = event.data.common;
        $('.search-result, .search-input-cancel').addClass('active');

        if (search_term == '') {
          $('.search-categories .search-data').hide();
          $('.search-input-cancel').removeClass('active');
        } else {
          this.getSearchResults();
        }
      }
    },
    showMobileSearchBox: function (event) {
      var _ua = window.navigator.userAgent;

      var isIDevice = _ua.match(/iphone|ipod|ipad/i);

      if (isIDevice) {
        $('.search-overlay').addClass('idevice');
      }

      $('.search-overlay, #search-terms, .search_input_block').addClass('active');
    },
    showSearchBox: function (event) {
      var common = event.data.common;

      if ($('.path-finder-block').hasClass('active')) {
        common.closePathFinder();
      }

      common.searchWalkthrough(event);

      if (event.currentTarget.value.length >= 2) {
        var _ua = window.navigator.userAgent;

        var isIDevice = _ua.match(/iphone|ipod|ipad/i);

        if (isIDevice) {
          $('.search-overlay').addClass('idevice');
        }

        $('.search-overlay').addClass('active');
        var searchLocation;
        var pageUrl = window.Backbone.history.location.hash;

        if (pageUrl == "#!/") {
          searchLocation = 'Home';
        } else if (pageUrl.split('/').length == 2) {
          searchLocation = 'Category';
        } else if (pageUrl.split('/').length == 3) {
          searchLocation = 'Playlist';
        } else if (pageUrl.split('/').length >= 4) {
          searchLocation = 'Player';
        }

        common.triggerGAevent('Search', searchLocation);
      }

      ;
    },
    setPaginationNotes: function (root, event) {
      if (root.$(event.currentTarget).hasClass('disabled')) return;
      let requestedPage = root.$(event.currentTarget).attr('data-page');
      let activePage = parseInt(root.$('.pagination li.active').attr('data-page'));
      let pageLength = root.$('.pagination li:not([data-page="new"])').length;

      if (requestedPage == "next") {
        requestedPage = activePage + 1;
      } else if (requestedPage == "prev") {
        requestedPage = activePage - 1;
      }

      if (requestedPage == activePage || requestedPage > pageLength) return;
      let currentSlideView = root.slide_views[this.CURRENT_SLIDE - 1];
      currentSlideView.updateSlideNotes(currentSlideView.slide.notes, requestedPage);
      requestedPage = parseInt(requestedPage);

      if (requestedPage == 1) {
        root.$('.pagination-wrap .page-prev').addClass('disabled');
      } else if (requestedPage == pageLength) {
        root.$('.pagination-wrap .page-next').addClass('disabled');
        root.$('.pagination-wrap .page-prev').removeClass('disabled');
      } else if (requestedPage > 1 && requestedPage < pageLength) {
        root.$('.pagination-wrap .page-next, .pagination-wrap .page-prev').removeClass('disabled');
      }

      Backbone.trigger('notes_changed');
      jcf.replaceAll();
    },
    showNotesLinkPopup: function (root, event) {
      var resourceLink = root.$(event.currentTarget).attr('data-link-resource');
      var isExternal = root.$(event.currentTarget).attr('data-link-type') == 'EXTERNAL';
      var isInternalVideo = !resourceLink || /\.(mp4|webm)$/i.test(resourceLink) ? true : false;
      root.$('.overlay').html(NotesLinkPopup({
        'isExternal': isExternal,
        'resourceLink': resourceLink,
        'isInternalVideo': isInternalVideo
      })).addClass('notes-links-popup-active');
      root.$el.addClass('notes-popup-active');
      var windowHeight = $(window).height() - 200;
      root.$('.notes-link-popup-wrap .popup-wrap').css({
        "max-height": windowHeight
      });
    },
    closeNotesLinkPopup: function (root, event) {
      root.$('.overlay').html("").removeClass('notes-links-popup-active');
      root.$el.removeClass('notes-popup-active');
    },
    showImagePopup: function (root, event) {
      let resourceLink = root.$(event.currentTarget).attr('src');
      root.$('.overlay').html(ImagePopup({
        'resourceLink': resourceLink
      })).addClass('image-popup-active');
      wheelzoom(document.querySelectorAll('.scroll-zoom')); // only for regalix theme.

      $('a[data-template=regalix]').removeClass('nav-back-button');
      root.$('.create-new').hide();
    },
    closeImagePopup: function (root, event) {
      root.$('.overlay').empty().removeClass('image-popup-active');
      root.$el.removeClass('notes-popup-active');
      $('a[data-template=regalix]').addClass('nav-back-button');
      root.$('.create-new').show();
    },
    toggleFade: function (root, event) {
      if (root.$('#player-container').hasClass('side-info-active')) {
        root.$('#player-container').toggleClass('side-info-active');
        root.$('.content-avg-rating').toggle('hide');
        Backbone.trigger("side_info_opened");
      } else if (root.$(event.target).hasClass('notes-link-popup-wrap')) {
        this.closeNotesLinkPopup(root, event);
      }
    },
    getDateDifference: function (date) {
      var diff = new Date() - date;

      if (diff > 2592000000) {
        var days = Math.floor(diff / 2592000000);
        return days + (days > 1 ? ' months' : ' month') + ' ago';
      } else if (diff > 86400000) {
        var days = Math.floor(diff / 86400000);
        return days + (days > 1 ? ' days' : ' day') + ' ago';
      } else {
        var days = Math.floor(diff / (1000 * 60 * 60));
        return days + (days > 1 ? ' hours' : ' hour') + ' ago';
      }
    },
    enhanceVideoURL: function (vidSrc) {
      let videoData = {};
      videoData.src = vidSrc;

      if (typeof YT != 'undefined') {
        var youtubeVidCheckRegex = /(?:https?:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(\?)?/;
        var vidSrcParams = videoData.src.match(youtubeVidCheckRegex); // To check if iframe is youtube's or not.

        if (vidSrcParams != null) {
          // To check if the url contains some extra parameters.
          if (vidSrcParams[2] == "?") {
            let jsapiRegex = /enablejsapi=1/;
            let jsapiSource = videoData.src.match(jsapiRegex); // If JS API is not enabled, then enable it.

            if (!jsapiSource) {
              videoData.src = videoData.src + "&enablejsapi=1";
            }
          } // If the url contains no extra parameters.
          else {
              videoData.src = videoData.src + "?enablejsapi=1";
            }

          videoData.embedType = 'youtube';
        }
      }

      if (typeof $f != 'undefined') {
        var vimeoVidCheckRegex = /(?:https?:)?\/\/player\.vimeo\.com\/video\/([\w-]{8})(\?)?/;
        var vidSrcParams = videoData.src.match(vimeoVidCheckRegex); // To check if iframe is vimeo's or not.

        if (vidSrcParams != null) {
          var vimeoVidId = vidSrcParams[1];
          let apiRegex = /&api=1&player_id=/;
          let apiSource = videoData.src.match(apiRegex);

          if (!apiSource) {
            videoData.src = videoData.src + "?&api=1&player_id=" + vimeoVidId;
          }

          videoData.embedType = 'vimeo';
        }
      }

      if (typeof Wistia != 'undefined') {
        let wistiaVidCheckRegex = /(?:https?:)?\/\/fast\.wistia\.net\/embed\/iframe\/([\w-]{1,})(\?)?/;
        let vidSrcParams = videoData.src.match(wistiaVidCheckRegex);

        if (vidSrcParams != null) {
          videoData.embedType = 'wistia';
        }
      }

      return videoData;
    },
    checkSlideAndLogActivity: function (playerContext) {
      if (document.viewType == 'edit') return;
      var curSlide = playerContext.slide_views[this.CURRENT_SLIDE - 1] && playerContext.slide_views[this.CURRENT_SLIDE - 1].slide;
      let isVideo = false;
      let isAudio = false;

      if (curSlide && curSlide['primary_resource'] != undefined) {
        if (['embed', 'video', 'wistia'].includes(curSlide['primary_resource']['type'])) {
          isVideo = true;
        } else if (curSlide['primary_resource']['type'] == 'audio') {
          isAudio = true;
        }
      }

      if (playerContext.slide_views[this.CURRENT_SLIDE - 1]) {
        playerContext.slide_views[this.CURRENT_SLIDE - 1].user_visited = true;
      }

      playerContext.progress = playerContext.getDemoProgress();

      if (isVideo) {
        this.logVideoActivity(playerContext, playerContext.slide_views[this.CURRENT_SLIDE - 1]);
      } else if (isAudio) {
        this.logAudioActivity(playerContext);
      } else {
        if (playerContext.lastLoadedSlideIndex != this.CURRENT_SLIDE) {
          this.postLogActivity(playerContext, playerContext.lastLoadedSlideIndex);
        }

        this.preLogActivity(playerContext);
      }
    },
    logVideoActivity: function (playerContext, currentSlide) {
      var root = this;
      $('iframe').each(function () {
        if ($(this).attr('src')) {
          var video = $(this);
          var vidSrc = video.attr('src');

          if (typeof YT != 'undefined') {
            var youtubeVidCheckRegex = /(?:https?:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(\?)?/;
            var vidSrcParams = vidSrc.match(youtubeVidCheckRegex); // To check if iframe is youtube's or not.

            if (vidSrcParams != null) {
              video.attr('id', vidSrcParams[1]); // vidSrcParams[1] == Youtube Video ID.

              let resPath = video.attr('resPath');
              root.newYtPlayer(playerContext, vidSrcParams[1], resPath);
            }
          }

          if (typeof $f != 'undefined') {
            // To check if iframe is vimeo's or not.
            if (vidSrcParams != null) {
              var vimeoPlayer = $f(video[0]); // When the vimeoPlayer is ready, add listeners for playback, pause, finish.

              vimeoPlayer.addEvent('ready', function () {
                let resPath = video.attr('resPath');
                vimeoPlayer.addEvent('play', function () {
                  root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'embed');
                });
                vimeoPlayer.addEvent('pause', function () {
                  root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'embed');
                });
                vimeoPlayer.addEvent('finish', function () {
                  root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'embed');
                  root.preLogActivity(playerContext); // Call preLogActivity when video playback is finished.
                });
              });
            }
          }

          if (typeof Wistia != 'undefined') {
            let wistiaVidCheckRegex = /(?:https?:)?\/\/fast\.wistia\.net\/embed\/iframe\/([\w-]{1,})(\?)?/;
            let vidSrcParams = vidSrc.match(wistiaVidCheckRegex);

            if (vidSrcParams != null) {
              let wistiaVideoId = vidSrcParams[1];
              let currentResource = currentSlide.slide.primary_resource;
              let currentVideoParams = currentResource.path.match(wistiaVidCheckRegex);

              if (currentVideoParams && currentVideoParams[1] == wistiaVideoId) {
                window._wq = window._wq || [];

                window._wq.push({
                  id: wistiaVideoId,
                  onReady: function (vid) {
                    let wistiaVideo = Wistia.api(wistiaVideoId);
                    let resPath = video.attr('resPath');
                    wistiaVideo.bind("play", function () {
                      root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'wistia');
                    });
                    wistiaVideo.bind("pause", function (t) {
                      root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'wistia');
                    });
                    wistiaVideo.bind("end", function (t) {
                      root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'wistia');
                      root.preLogActivity(playerContext);
                    });
                  }
                });
              }
            }
          }
        }
      });
      $('video').each(function () {
        if (!$(this).hasClass('Events-Tagged')) {
          root.addAVEvents(playerContext, this);
          $(this).addClass('Events-Tagged'); // To Avoid multiple times event-bindings.
        }
      });
    },
    newYtPlayer: function (playerContext, id, resPath) {
      var root = this;
      var ytPlayer = new YT.Player(id, {
        events: {
          'onReady': event => {
            event.target.playVideo();
          },
          'onStateChange': function (event) {
            root.onYtPlayerStateChange(playerContext, root, event, resPath);
          }
        }
      });
    },
    onYtPlayerStateChange: function (playerContext, root, event, resPath) {
      if (event.data == YT.PlayerState.PLAYING) root.logAudioVideoAnalytics(playerContext, resPath, 'playing', 'embed');
      if (event.data == YT.PlayerState.PAUSED) root.logAudioVideoAnalytics(playerContext, resPath, 'paused', 'embed');

      if (event.data == YT.PlayerState.ENDED) {
        root.logAudioVideoAnalytics(playerContext, resPath, 'ended', 'embed');
        root.preLogActivity(playerContext);
      }
    },
    logAudioActivity: function (playerContext) {
      var root = this;
      $('audio').each(function () {
        if (!$(this).hasClass('Events-Tagged')) {
          root.addAVEvents(playerContext, this);
          $(this).addClass('Events-Tagged'); // To Avoid multiple times event-bindings.
        }
      });
    },
    addAVEvents: function (playerContext, avElement) {
      // Function to Bind Audio-Video Events.
      var root = this;
      $(avElement).on({
        playing: function () {
          root.logAudioVideoAnalytics(playerContext, avElement, 'playing');
        },
        pause: function () {
          root.logAudioVideoAnalytics(playerContext, avElement, 'paused');
        },
        ended: function () {
          root.logAudioVideoAnalytics(playerContext, avElement, 'ended');
          root.preLogActivity(playerContext); // Call preLogActivity when video playback is finished.
        }
      });
    },
    logAudioVideoAnalytics: function (playerContext, avElement, av_event, res_type) {
      var av_resource = avElement;

      if (!res_type) {
        av_resource = avElement.currentSrc.split('/').pop(); // To get the resource path-name.
      }

      var av_analytics = new AudioVideoAnalytics({
        walkthrough: playerContext.walkthrough_id || playerContext.chapter_id,
        resource: av_resource,
        events: av_event,
        resource_type: res_type
      });
      av_analytics.save();
    },
    preLogActivity: function (playerContext) {
      // Function to create new WalkthroughActivity on each visit to a slide.
      if (document.isOffline) return;
      var wtActivity = playerContext.walkthroughActivityList[this.CURRENT_SLIDE - 1];

      if (wtActivity.get('id') || wtActivity.get('duration')) {
        wtActivity.unset('duration');
        wtActivity.unset('id'); // force backbone-model to send 'POST' request.
      }

      var root = this;
      wtActivity.save({}, {
        success: function (model, response) {
          if (!playerContext.demo_completed && playerContext.progress == 100) {
            playerContext.demo_completed = true;
            root.triggerGAevent('Player', 'Topic Complete');
          }
        }
      });
    },
    postLogActivity: function (playerContext, slideIndex) {
      // Function to upate 'duration' of the last WalkthroughActivity.
      var wtActivity = playerContext.walkthroughActivityList[slideIndex - 1];
      if (wtActivity.isNew()) return;
      var duration = parseInt(($.now() - playerContext.TIME_SPENT) / 1000);
      wtActivity.set({
        'duration': duration
      });
      wtActivity.save();
      playerContext.TIME_SPENT = $.now();
    },

    /**
     * Get product tree API data
     * This function returns a Promise
     */
    fetchSiteMapData: async function () {
      try {
        let siteMap = new ProductTree();
        const response = await fetch(siteMap.urlRoot);
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    updateSitemapData: function (siteMapData, selectedGroups) {
      _.each(siteMapData, (elem, index) => {
        var isAllowed = _.difference(selectedGroups, elem.groups).length === 0;

        if (!isAllowed) {
          elem.disabled = true;
          elem = _.omit(elem, "children", "playlists", "demos");
        } else {
          if (elem.children && elem.children.length > 0) {
            elem.children = this.updateSitemapData(elem.children, selectedGroups);
          } else if (elem.playlists && elem.playlists.length > 0) {
            elem.playlists = this.updateSitemapData(elem.playlists, selectedGroups);
          } else if (elem.demos && elem.demos.length > 0) {
            elem.demos = this.updateSitemapData(elem.demos, selectedGroups);
          }
        }

        ;
      });

      return siteMapData;
    },

    /**
     * Get integration connectors list
     * This function returns a Promise
     */
    getRepositoryConnectorList: async function () {
      try {
        let repository_connector = new RepositoryConnector();
        const response = await fetch(repository_connector.urlRoot);
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/audio_video_analytics.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/audio_video_analytics.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var AudioVideoAnalytics = Backbone.Model.extend({
    urlRoot: "/audio-video-analytics"
  });
  return AudioVideoAnalytics;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/check_redirect_url.js":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/check_redirect_url.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var RedirectPath = Backbone.Model.extend({
    urlRoot: "/check-redirect/",
    url: function () {
      var url;

      if (this.get('walkthrough') != null) {
        url = this.urlRoot + this.get('product') + '/' + this.get('section') + '/' + this.get('walkthrough');
      } else if (this.get('section') != null) {
        url = this.urlRoot + this.get('product') + '/' + this.get('section');
      } else {
        url = this.urlRoot + this.get('product');
      }

      return url;
    }
  });
  return RedirectPath;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/cta_analytics.js":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/cta_analytics.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var CTAAnalytics = Backbone.Model.extend({
    urlRoot: "/cta-analytics"
  });
  return CTAAnalytics;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/download.js":
/*!********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/download.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Download = Backbone.Model.extend({
    urlRoot: "/api/download"
  });
  return Download;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/product-tree.js":
/*!************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/product-tree.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var FullPath = Backbone.Model.extend({
    urlRoot: "/api/product-tree",
    url: function () {
      var url = this.urlRoot;

      if (this.get('product')) {
        url += '/' + this.get('product');
      }

      if (this.get('section')) {
        url += '/' + this.get('section');
      }

      return url;
    }
  });
  return FullPath;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/repository_connector.js":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/repository_connector.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var connectorList = Backbone.Model.extend({
    urlRoot: "/api/repository-connector"
  });
  return connectorList;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/sample_exchange_activity.js":
/*!************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/sample_exchange_activity.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (backbone) {
  'use strict';

  var SampleExchangeActivity = Backbone.Model.extend({
    urlRoot: "/sample-exchange-activity"
  });
  return SampleExchangeActivity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/models/visit.js":
/*!*****************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/visit.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Visit = Backbone.Model.extend({
    urlRoot: "/visit-activity"
  });
  return Visit;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/check-default-locale-popup.handlebars":
/*!*************************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/check-default-locale-popup.handlebars ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box check-default-language\">\n    <div class=\"popup-title camelcase\">\n       WARNING\n    </div>\n    <div class=\"content-block\">\n        <div class=\"block\">\n            <div class=\"sub-title\">\n                Switch to '"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"default_language") || (depth0 != null ? lookupProperty(depth0,"default_language") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"default_language","hash":{},"data":data,"loc":{"start":{"line":8,"column":27},"end":{"line":8,"column":47}}}) : helper)))
    + "' language to create a new content !\n            </div>\n        </div>      \n    </div>\n    <div class=\"footer\">\n        <div class=\"block\">\n            <div class=\"cancel alert\" data-popup=\"alert\" rel=\"check-default-language\">OK</div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/image-popup.handlebars":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/image-popup.handlebars ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"image-popup-wrap\">\r\n	<div class=\"image-popup-close\"></div>\r\n	<div class=\"popup-box\">\r\n		<div class=\"popup-wrap\">\r\n			<img class=\"scroll-zoom\" src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"resourceLink") || (depth0 != null ? lookupProperty(depth0,"resourceLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"resourceLink","hash":{},"data":data,"loc":{"start":{"line":5,"column":33},"end":{"line":5,"column":49}}}) : helper)))
    + "\">\r\n			<div class=\"zoom-btn\">\r\n				<button class=\"zoom-in\"></button>\r\n				<button class=\"reset-zoom\"></button>\r\n				<button class=\"zoom-out\"></button>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/languages.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/languages.handlebars ***!
  \********************************************************************/
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

  return "    <li lvalue='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"locale") : depth0), depth0))
    + "' "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"selecte") : depth0)) != null ? lookupProperty(stack1,"locale") : stack1),"==",(depth0 != null ? lookupProperty(depth0,"locale") : depth0),{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":28},"end":{"line":4,"column":93}}})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "class=\"active\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"translation-dd\"><span id=\"selected_language\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"selected") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</span> <span class=\"glyphicon glyphicon-play\"></span></div>\n<ul class=\"language-dd\" id='user-language'>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"languages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":5,"column":13}}})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/notes-links-popup.handlebars":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/notes-links-popup.handlebars ***!
  \****************************************************************************/
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

  return "				<iframe allowFullScreen='allowFullScreen' src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"resourceLink") || (depth0 != null ? lookupProperty(depth0,"resourceLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"resourceLink","hash":{},"data":data,"loc":{"start":{"line":6,"column":51},"end":{"line":6,"column":67}}}) : helper)))
    + "\" width=\"800\" height=\"450\" frameborder=\"0\"></iframe>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isInternalVideo") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":14,"column":11}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<video width=\"800\" height=\"450\" controls>\r\n  						<source src=\"/static/media/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"resourceLink") || (depth0 != null ? lookupProperty(depth0,"resourceLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"resourceLink","hash":{},"data":data,"loc":{"start":{"line":10,"column":35},"end":{"line":10,"column":51}}}) : helper)))
    + "\" >\r\n					</video>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "					<img src=\"/static/media/"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"resourceLink") || (depth0 != null ? lookupProperty(depth0,"resourceLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"resourceLink","hash":{},"data":data,"loc":{"start":{"line":13,"column":29},"end":{"line":13,"column":45}}}) : helper)))
    + "\">\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"notes-link-popup-wrap\">\r\n	<div class=\"popup-box\">\r\n		<div class=\"note-popup-close\">x</div>\r\n		<div class=\"popup-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isExternal") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":5,"column":3},"end":{"line":15,"column":10}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/search-results.handlebars":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/search-results.handlebars ***!
  \*************************************************************************/
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

  return "                <li class=\"redirect-to\" >\n                    <span class=\"walkthroughs-icon\"></span>\n                    <a class=\"search-detail search-links walkthrough-entry\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"demo_url") : depth0), depth0))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_asset") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":96},"end":{"line":7,"column":134}}})) != null ? stack1 : "")
    + " >\n                        <div class=\"search-title search-detail\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</div>\n                        <div class=\"search-breadcrumb search-detail\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"breadcrumb") : depth0), depth0))
    + "</div>\n                    </a>\n                </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <li class=\"no-results sub-title\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"oops! no results found. please try a different search phrase.",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":49},"end":{"line":13,"column":121}}}))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"search-categories\">\n    <div class=\"search-data\">\n        <ul>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"search_results_list") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":14,"column":21}}})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/tenant/templates/texteditor_preview.handlebars":
/*!*****************************************************************************!*\
  !*** ./sharedemos/static/js/tenant/templates/texteditor_preview.handlebars ***!
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

  return "            <img class='content-footer-image' src='"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"footer_image") || (depth0 != null ? lookupProperty(depth0,"footer_image") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"footer_image","hash":{},"data":data,"loc":{"start":{"line":42,"column":51},"end":{"line":42,"column":67}}}) : helper)))
    + "' />\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class='content-footer-text'>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"footer_text") || (depth0 != null ? lookupProperty(depth0,"footer_text") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"footer_text","hash":{},"data":data,"loc":{"start":{"line":45,"column":45},"end":{"line":45,"column":60}}}) : helper)))
    + "</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel='stylesheet' type='text/css' href='/static/libs/froala/css/froala_style.css' />\n<style type='text/css'>\n    .outer-wrap{\n        position: relative;\n        margin: 30px;\n        display: inline-block;\n        height: 720px;\n        overflow: hidden;\n    }\n    .content-slide-wrap {\n        margin: 25px;\n        width: 1180px !important;\n        padding-bottom: 0px;\n        position: relative;\n        padding: 25px 25px;\n        min-height: 680px;\n    }\n    .layout{\n        min-height: 540px;\n    }\n    .content-footer{\n        position: relative;\n        bottom: 0;\n        text-align: center;\n        width: inherit;\n        font-size: 10px;\n        padding: 5px;\n        width: 100%;\n        display: inline-block;\n    }\n    .content-footer-image{\n        height: 36px;\n        display: block;\n        margin : 0px auto;\n    }\n</style>\n<div class='outer-wrap'>\n    <div class='content-slide-wrap'>\n        <div class='fr-view'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"html_content") || (depth0 != null ? lookupProperty(depth0,"html_content") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"html_content","hash":{},"data":data,"loc":{"start":{"line":39,"column":29},"end":{"line":39,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</div>\n        <div class='content-footer'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"footer_image") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":12},"end":{"line":43,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"footer_text") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":12},"end":{"line":46,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/libs/jcf/jcf.js":
/*!*******************************************!*\
  !*** ./sharedemos/static/libs/jcf/jcf.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.0
 */
;

(function (root, factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function ($) {
  'use strict'; // define version

  var version = '1.2.0'; // private variables

  var customInstances = []; // default global options

  var commonOptions = {
    optionsKey: 'jcf',
    dataKey: 'jcf-instance',
    rtlClass: 'jcf-rtl',
    focusClass: 'jcf-focus',
    pressedClass: 'jcf-pressed',
    disabledClass: 'jcf-disabled',
    hiddenClass: 'jcf-hidden',
    resetAppearanceClass: 'jcf-reset-appearance',
    unselectableClass: 'jcf-unselectable'
  }; // detect device type

  var isTouchDevice = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch,
      isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice); // create global stylesheet if custom forms are used

  var createStyleSheet = function () {
    var styleTag = $('<style>').appendTo('head'),
        styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet'); // crossbrowser style handling

    var addCSSRule = function (selector, rules, index) {
      if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + '{' + rules + '}', index);
      } else {
        styleSheet.addRule(selector, rules, index);
      }
    }; // add special rules


    addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
    addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
    addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
    addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);'); // detect rtl pages

    var html = $('html'),
        body = $('body');

    if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
      html.addClass(commonOptions.rtlClass);
    } // handle form reset event


    html.on('reset', function () {
      setTimeout(function () {
        api.refreshAll();
      }, 0);
    }); // mark stylesheet as created

    commonOptions.styleSheetCreated = true;
  }; // simplified pointer events handler


  (function () {
    var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
        touchEventsSupported = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch,
        eventList,
        eventMap = {},
        eventPrefix = 'jcf-'; // detect events to attach

    if (pointerEventsSupported) {
      eventList = {
        pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
        pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
        pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
        pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
      };
    } else {
      eventList = {
        pointerover: 'mouseover',
        pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
        pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
        pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
      };
    } // create event map


    $.each(eventList, function (targetEventName, fakeEventList) {
      $.each(fakeEventList.split(' '), function (index, fakeEventName) {
        eventMap[fakeEventName] = targetEventName;
      });
    }); // jQuery event hooks

    $.each(eventList, function (eventName, eventHandlers) {
      eventHandlers = eventHandlers.split(' ');
      $.event.special[eventPrefix + eventName] = {
        setup: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);else self['on' + fallbackEvent] = fixEvent;
          });
        },
        teardown: function () {
          var self = this;
          $.each(eventHandlers, function (index, fallbackEvent) {
            if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);else self['on' + fallbackEvent] = null;
          });
        }
      };
    }); // check that mouse event are not simulated by mobile browsers

    var lastTouch = null;

    var mouseEventSimulated = function (e) {
      var dx = Math.abs(e.pageX - lastTouch.x),
          dy = Math.abs(e.pageY - lastTouch.y),
          rangeDistance = 25;

      if (dx <= rangeDistance && dy <= rangeDistance) {
        return true;
      }
    }; // normalize event


    var fixEvent = function (e) {
      var origEvent = e || window.event,
          touchEventData = null,
          targetEventName = eventMap[origEvent.type];
      e = $.event.fix(origEvent);
      e.type = eventPrefix + targetEventName;

      if (origEvent.pointerType) {
        switch (origEvent.pointerType) {
          case 2:
            e.pointerType = 'touch';
            break;

          case 3:
            e.pointerType = 'pen';
            break;

          case 4:
            e.pointerType = 'mouse';
            break;

          default:
            e.pointerType = origEvent.pointerType;
        }
      } else {
        e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
      }

      if (!e.pageX && !e.pageY) {
        touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
        e.pageX = touchEventData.pageX;
        e.pageY = touchEventData.pageY;
      }

      if (origEvent.type === 'touchend') {
        lastTouch = {
          x: e.pageX,
          y: e.pageY
        };
      }

      if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
        return;
      } else {
        return ($.event.dispatch || $.event.handle).call(this, e);
      }
    };
  })(); // custom mousewheel/trackpad handler


  (function () {
    var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
        shimEventName = 'jcf-mousewheel';
    $.event.special[shimEventName] = {
      setup: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);else self['on' + fallbackEvent] = fixEvent;
        });
      },
      teardown: function () {
        var self = this;
        $.each(wheelEvents, function (index, fallbackEvent) {
          if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);else self['on' + fallbackEvent] = null;
        });
      }
    };

    var fixEvent = function (e) {
      var origEvent = e || window.event;
      e = $.event.fix(origEvent);
      e.type = shimEventName; // old wheel events handler

      if ('detail' in origEvent) {
        e.deltaY = -origEvent.detail;
      }

      if ('wheelDelta' in origEvent) {
        e.deltaY = -origEvent.wheelDelta;
      }

      if ('wheelDeltaY' in origEvent) {
        e.deltaY = -origEvent.wheelDeltaY;
      }

      if ('wheelDeltaX' in origEvent) {
        e.deltaX = -origEvent.wheelDeltaX;
      } // modern wheel event handler


      if ('deltaY' in origEvent) {
        e.deltaY = origEvent.deltaY;
      }

      if ('deltaX' in origEvent) {
        e.deltaX = origEvent.deltaX;
      } // handle deltaMode for mouse wheel


      e.delta = e.deltaY || e.deltaX;

      if (origEvent.deltaMode === 1) {
        var lineHeight = 16;
        e.delta *= lineHeight;
        e.deltaY *= lineHeight;
        e.deltaX *= lineHeight;
      }

      return ($.event.dispatch || $.event.handle).call(this, e);
    };
  })(); // extra module methods


  var moduleMixin = {
    // provide function for firing native events
    fireNativeEvent: function (elements, eventName) {
      $(elements).each(function () {
        var element = this,
            eventObject;

        if (element.dispatchEvent) {
          eventObject = document.createEvent('HTMLEvents');
          eventObject.initEvent(eventName, true, true);
          element.dispatchEvent(eventObject);
        } else if (document.createEventObject) {
          eventObject = document.createEventObject();
          eventObject.target = element;
          element.fireEvent('on' + eventName, eventObject);
        }
      });
    },
    // bind event handlers for module instance (functions beggining with "on")
    bindHandlers: function () {
      var self = this;
      $.each(self, function (propName, propValue) {
        if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
          // dont use $.proxy here because it doesn't create unique handler
          self[propName] = function () {
            return propValue.apply(self, arguments);
          };
        }
      });
    }
  }; // public API

  var api = {
    version: version,
    modules: {},
    getOptions: function () {
      return $.extend({}, commonOptions);
    },
    setOptions: function (moduleName, moduleOptions) {
      if (arguments.length > 1) {
        // set module options
        if (this.modules[moduleName]) {
          $.extend(this.modules[moduleName].prototype.options, moduleOptions);
        }
      } else {
        // set common options
        $.extend(commonOptions, moduleName);
      }
    },
    addModule: function (proto) {
      // proto is factory function
      if ($.isFunction(proto)) {
        proto = proto($, window);
      } // add module to list


      var Module = function (options) {
        // save instance to collection
        if (!options.element.data(commonOptions.dataKey)) {
          options.element.data(commonOptions.dataKey, this);
        }

        customInstances.push(this); // save options

        this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options); // bind event handlers to instance

        this.bindHandlers(); // call constructor

        this.init.apply(this, arguments);
      }; // parse options from HTML attribute


      var getInlineOptions = function (element) {
        var dataOptions = element.data(commonOptions.optionsKey),
            attrOptions = element.attr(commonOptions.optionsKey);

        if (dataOptions) {
          return dataOptions;
        } else if (attrOptions) {
          try {
            return $.parseJSON(attrOptions);
          } catch (e) {// ignore invalid attributes
          }
        }
      }; // set proto as prototype for new module


      Module.prototype = proto; // add mixin methods to module proto

      $.extend(proto, moduleMixin);

      if (proto.plugins) {
        $.each(proto.plugins, function (pluginName, plugin) {
          $.extend(plugin.prototype, moduleMixin);
        });
      } // override destroy method


      var originalDestroy = Module.prototype.destroy;

      Module.prototype.destroy = function () {
        this.options.element.removeData(this.options.dataKey);

        for (var i = customInstances.length - 1; i >= 0; i--) {
          if (customInstances[i] === this) {
            customInstances.splice(i, 1);
            break;
          }
        }

        if (originalDestroy) {
          originalDestroy.apply(this, arguments);
        }
      }; // save module to list


      this.modules[proto.name] = Module;
    },
    getInstance: function (element) {
      return $(element).data(commonOptions.dataKey);
    },
    replace: function (elements, moduleName, customOptions) {
      var self = this,
          instance;

      if (!commonOptions.styleSheetCreated) {
        createStyleSheet();
      }

      $(elements).each(function () {
        var moduleOptions,
            element = $(this);
        instance = element.data(commonOptions.dataKey);

        if (instance) {
          instance.refresh();
        } else {
          if (!moduleName) {
            $.each(self.modules, function (currentModuleName, module) {
              if (module.prototype.matchElement.call(module.prototype, element)) {
                moduleName = currentModuleName;
                return false;
              }
            });
          }

          if (moduleName) {
            moduleOptions = $.extend({
              element: element
            }, customOptions);
            instance = new self.modules[moduleName](moduleOptions);
          }
        }
      });
      return instance;
    },
    refresh: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);

        if (instance) {
          instance.refresh();
        }
      });
    },
    destroy: function (elements) {
      $(elements).each(function () {
        var instance = $(this).data(commonOptions.dataKey);

        if (instance) {
          instance.destroy();
        }
      });
    },
    replaceAll: function (context) {
      var self = this;
      $.each(this.modules, function (moduleName, module) {
        $(module.prototype.selector, context).each(function () {
          if (this.className.indexOf('jcf-ignore') < 0) {
            self.replace(this, moduleName);
          }
        });
      });
    },
    refreshAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function () {
            var instance = $(this).data(commonOptions.dataKey);

            if (instance) {
              instance.refresh();
            }
          });
        });
      } else {
        for (var i = customInstances.length - 1; i >= 0; i--) {
          customInstances[i].refresh();
        }
      }
    },
    destroyAll: function (context) {
      if (context) {
        $.each(this.modules, function (moduleName, module) {
          $(module.prototype.selector, context).each(function (index, element) {
            var instance = $(element).data(commonOptions.dataKey);

            if (instance) {
              instance.destroy();
            }
          });
        });
      } else {
        while (customInstances.length) {
          customInstances[0].destroy();
        }
      }
    }
  }; // always export API to the global window object

  window.jcf = api;
  return api;
});

/***/ }),

/***/ "./sharedemos/static/libs/jcf/jcf.scrollable.js":
/*!******************************************************!*\
  !*** ./sharedemos/static/libs/jcf/jcf.scrollable.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * JavaScript Custom Forms : Scrollbar Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.0
 */
jcf.addModule(function ($, window) {
  'use strict';

  var module = {
    name: 'Scrollable',
    selector: '.jcf-scrollable',
    plugins: {
      ScrollBar: ScrollBar
    },
    options: {
      mouseWheelStep: 150,
      handleResize: true,
      alwaysShowScrollbars: false,
      alwaysPreventMouseWheel: false,
      scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>'
    },
    matchElement: function (element) {
      return element.is('.jcf-scrollable');
    },
    init: function () {
      this.initStructure();
      this.attachEvents();
      this.rebuildScrollbars();
    },
    initStructure: function () {
      // prepare structure
      this.doc = $(document);
      this.win = $(window);
      this.realElement = $(this.options.element);
      this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(this.realElement); // set initial styles

      this.scrollWrapper.css('position', 'relative');
      this.realElement.css('overflow', 'hidden');
      this.vBarEdge = 0;
    },
    attachEvents: function () {
      // create scrollbars
      var self = this;
      this.vBar = new ScrollBar({
        holder: this.scrollWrapper,
        vertical: true,
        onScroll: function (scrollTop) {
          self.realElement.scrollTop(scrollTop);
        }
      });
      this.hBar = new ScrollBar({
        holder: this.scrollWrapper,
        vertical: false,
        onScroll: function (scrollLeft) {
          self.realElement.scrollLeft(scrollLeft);
        }
      }); // add event handlers

      this.realElement.on('scroll', this.onScroll);

      if (this.options.handleResize) {
        this.win.on('resize orientationchange load', this.onResize);
      } // add pointer/wheel event handlers


      this.realElement.on('jcf-mousewheel', this.onMouseWheel);
      this.realElement.on('jcf-pointerdown', this.onTouchBody);
    },
    onScroll: function () {
      this.redrawScrollbars();
    },
    onResize: function () {
      // do not rebuild scrollbars if form field is in focus
      if (!$(document.activeElement).is(':input')) {
        this.rebuildScrollbars();
      }
    },
    onTouchBody: function (e) {
      if (e.pointerType === 'touch') {
        this.touchData = {
          scrollTop: this.realElement.scrollTop(),
          scrollLeft: this.realElement.scrollLeft(),
          left: e.pageX,
          top: e.pageY
        };
        this.doc.on({
          'jcf-pointermove': this.onMoveBody,
          'jcf-pointerup': this.onReleaseBody
        });
      }
    },
    onMoveBody: function (e) {
      var targetScrollTop,
          targetScrollLeft,
          verticalScrollAllowed = this.verticalScrollActive,
          horizontalScrollAllowed = this.horizontalScrollActive;

      if (e.pointerType === 'touch') {
        targetScrollTop = this.touchData.scrollTop - e.pageY + this.touchData.top;
        targetScrollLeft = this.touchData.scrollLeft - e.pageX + this.touchData.left; // check that scrolling is ended and release outer scrolling

        if (this.verticalScrollActive && (targetScrollTop < 0 || targetScrollTop > this.vBar.maxValue)) {
          verticalScrollAllowed = false;
        }

        if (this.horizontalScrollActive && (targetScrollLeft < 0 || targetScrollLeft > this.hBar.maxValue)) {
          horizontalScrollAllowed = false;
        }

        this.realElement.scrollTop(targetScrollTop);
        this.realElement.scrollLeft(targetScrollLeft);

        if (verticalScrollAllowed || horizontalScrollAllowed) {
          e.preventDefault();
        } else {
          this.onReleaseBody(e);
        }
      }
    },
    onReleaseBody: function (e) {
      if (e.pointerType === 'touch') {
        delete this.touchData;
        this.doc.off({
          'jcf-pointermove': this.onMoveBody,
          'jcf-pointerup': this.onReleaseBody
        });
      }
    },
    onMouseWheel: function (e) {
      var currentScrollTop = this.realElement.scrollTop(),
          currentScrollLeft = this.realElement.scrollLeft(),
          maxScrollTop = this.realElement.prop('scrollHeight') - this.embeddedDimensions.innerHeight,
          maxScrollLeft = this.realElement.prop('scrollWidth') - this.embeddedDimensions.innerWidth,
          extraLeft,
          extraTop,
          preventFlag; // check edge cases

      if (!this.options.alwaysPreventMouseWheel) {
        if (this.verticalScrollActive && e.deltaY) {
          if (!(currentScrollTop <= 0 && e.deltaY < 0) && !(currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
            preventFlag = true;
          }
        }

        if (this.horizontalScrollActive && e.deltaX) {
          if (!(currentScrollLeft <= 0 && e.deltaX < 0) && !(currentScrollLeft >= maxScrollLeft && e.deltaX > 0)) {
            preventFlag = true;
          }
        }

        if (!this.verticalScrollActive && !this.horizontalScrollActive) {
          return;
        }
      } // prevent default action and scroll item


      if (preventFlag || this.options.alwaysPreventMouseWheel) {
        e.preventDefault();
      } else {
        return;
      }

      extraLeft = e.deltaX / 100 * this.options.mouseWheelStep;
      extraTop = e.deltaY / 100 * this.options.mouseWheelStep;
      this.realElement.scrollTop(currentScrollTop + extraTop);
      this.realElement.scrollLeft(currentScrollLeft + extraLeft);
    },
    setScrollBarEdge: function (edgeSize) {
      this.vBarEdge = edgeSize || 0;
      this.redrawScrollbars();
    },
    saveElementDimensions: function () {
      this.savedDimensions = {
        top: this.realElement.width(),
        left: this.realElement.height()
      };
      return this;
    },
    restoreElementDimensions: function () {
      if (this.savedDimensions) {
        this.realElement.css({
          width: this.savedDimensions.width,
          height: this.savedDimensions.height
        });
      }

      return this;
    },
    saveScrollOffsets: function () {
      this.savedOffsets = {
        top: this.realElement.scrollTop(),
        left: this.realElement.scrollLeft()
      };
      return this;
    },
    restoreScrollOffsets: function () {
      if (this.savedOffsets) {
        this.realElement.scrollTop(this.savedOffsets.top);
        this.realElement.scrollLeft(this.savedOffsets.left);
      }

      return this;
    },
    getContainerDimensions: function () {
      // save current styles
      var desiredDimensions, currentStyles, currentHeight, currentWidth;

      if (this.isModifiedStyles) {
        desiredDimensions = {
          width: this.realElement.innerWidth() + this.vBar.getThickness(),
          height: this.realElement.innerHeight() + this.hBar.getThickness()
        };
      } else {
        // unwrap real element and measure it according to CSS
        this.saveElementDimensions().saveScrollOffsets();
        this.realElement.insertAfter(this.scrollWrapper);
        this.scrollWrapper.detach(); // measure element

        currentStyles = this.realElement.prop('style');
        currentWidth = parseFloat(currentStyles.width);
        currentHeight = parseFloat(currentStyles.height); // reset styles if needed

        if (this.embeddedDimensions && currentWidth && currentHeight) {
          this.isModifiedStyles |= currentWidth !== this.embeddedDimensions.width || currentHeight !== this.embeddedDimensions.height;
          this.realElement.css({
            overflow: '',
            width: '',
            height: ''
          });
        } // calculate desired dimensions for real element


        desiredDimensions = {
          width: this.realElement.outerWidth(),
          height: this.realElement.outerHeight()
        }; // restore structure and original scroll offsets

        this.scrollWrapper.insertAfter(this.realElement);
        this.realElement.css('overflow', 'hidden').prependTo(this.scrollWrapper);
        this.restoreElementDimensions().restoreScrollOffsets();
      }

      return desiredDimensions;
    },
    getEmbeddedDimensions: function (dimensions) {
      // handle scrollbars cropping
      var fakeBarWidth = this.vBar.getThickness(),
          fakeBarHeight = this.hBar.getThickness(),
          paddingWidth = this.realElement.outerWidth() - this.realElement.width(),
          paddingHeight = this.realElement.outerHeight() - this.realElement.height(),
          resultDimensions;

      if (this.options.alwaysShowScrollbars) {
        // simply return dimensions without custom scrollbars
        this.verticalScrollActive = true;
        this.horizontalScrollActive = true;
        resultDimensions = {
          innerWidth: dimensions.width - fakeBarWidth,
          innerHeight: dimensions.height - fakeBarHeight
        };
      } else {
        // detect when to display each scrollbar
        this.saveElementDimensions();
        this.verticalScrollActive = false;
        this.horizontalScrollActive = false; // fill container with full size

        this.realElement.css({
          width: dimensions.width - paddingWidth,
          height: dimensions.height - paddingHeight
        });
        this.horizontalScrollActive = this.realElement.prop('scrollWidth') > this.containerDimensions.width;
        this.verticalScrollActive = this.realElement.prop('scrollHeight') > this.containerDimensions.height;
        this.restoreElementDimensions();
        resultDimensions = {
          innerWidth: dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
          innerHeight: dimensions.height - (this.horizontalScrollActive ? fakeBarHeight : 0)
        };
      }

      $.extend(resultDimensions, {
        width: resultDimensions.innerWidth - paddingWidth,
        height: resultDimensions.innerHeight - paddingHeight
      });
      return resultDimensions;
    },
    rebuildScrollbars: function () {
      // resize wrapper according to real element styles
      this.containerDimensions = this.getContainerDimensions();
      this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions); // resize wrapper to desired dimensions

      this.scrollWrapper.css({
        width: this.containerDimensions.width,
        height: this.containerDimensions.height
      }); // resize element inside wrapper excluding scrollbar size

      this.realElement.css({
        overflow: 'hidden',
        width: this.embeddedDimensions.width,
        height: this.embeddedDimensions.height
      }); // redraw scrollbar offset

      this.redrawScrollbars();
    },
    redrawScrollbars: function () {
      var viewSize, maxScrollValue; // redraw vertical scrollbar

      if (this.verticalScrollActive) {
        viewSize = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight;
        maxScrollValue = Math.max(this.realElement.prop('offsetHeight'), this.realElement.prop('scrollHeight')) - this.vBarEdge;
        this.vBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
        this.vBar.setValue(this.realElement.scrollTop());
      } else {
        this.vBar.hide();
      } // redraw horizontal scrollbar


      if (this.horizontalScrollActive) {
        viewSize = this.embeddedDimensions.innerWidth;
        maxScrollValue = this.realElement.prop('scrollWidth');

        if (maxScrollValue === viewSize) {
          this.horizontalScrollActive = false;
        }

        this.hBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
        this.hBar.setValue(this.realElement.scrollLeft());
      } else {
        this.hBar.hide();
      } // set "touch-action" style rule


      var touchAction = '';

      if (this.verticalScrollActive && this.horizontalScrollActive) {
        touchAction = 'none';
      } else if (this.verticalScrollActive) {
        touchAction = 'pan-x';
      } else if (this.horizontalScrollActive) {
        touchAction = 'pan-y';
      }

      this.realElement.css('touchAction', touchAction);
    },
    refresh: function () {
      this.rebuildScrollbars();
    },
    destroy: function () {
      // remove event listeners
      this.win.off('resize orientationchange load', this.onResize);
      this.realElement.off({
        'jcf-mousewheel': this.onMouseWheel,
        'jcf-pointerdown': this.onTouchBody
      });
      this.doc.off({
        'jcf-pointermove': this.onMoveBody,
        'jcf-pointerup': this.onReleaseBody
      }); // restore structure

      this.saveScrollOffsets();
      this.vBar.destroy();
      this.hBar.destroy();
      this.realElement.insertAfter(this.scrollWrapper).css({
        touchAction: '',
        overflow: '',
        width: '',
        height: ''
      });
      this.scrollWrapper.remove();
      this.restoreScrollOffsets();
    }
  }; // custom scrollbar

  function ScrollBar(options) {
    this.options = $.extend({
      holder: null,
      vertical: true,
      inactiveClass: 'jcf-inactive',
      verticalClass: 'jcf-scrollbar-vertical',
      horizontalClass: 'jcf-scrollbar-horizontal',
      scrollbarStructure: '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
      btnDecSelector: '.jcf-scrollbar-dec',
      btnIncSelector: '.jcf-scrollbar-inc',
      sliderSelector: '.jcf-scrollbar-slider',
      handleSelector: '.jcf-scrollbar-handle',
      scrollInterval: 300,
      scrollStep: 400 // px/sec

    }, options);
    this.init();
  }

  $.extend(ScrollBar.prototype, {
    init: function () {
      this.initStructure();
      this.attachEvents();
    },
    initStructure: function () {
      // define proporties
      this.doc = $(document);
      this.isVertical = !!this.options.vertical;
      this.sizeProperty = this.isVertical ? 'height' : 'width';
      this.fullSizeProperty = this.isVertical ? 'outerHeight' : 'outerWidth';
      this.invertedSizeProperty = this.isVertical ? 'width' : 'height';
      this.thicknessMeasureMethod = 'outer' + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1);
      this.offsetProperty = this.isVertical ? 'top' : 'left';
      this.offsetEventProperty = this.isVertical ? 'pageY' : 'pageX'; // initialize variables

      this.value = this.options.value || 0;
      this.maxValue = this.options.maxValue || 0;
      this.currentSliderSize = 0;
      this.handleSize = 0; // find elements

      this.holder = $(this.options.holder);
      this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
      this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
      this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
      this.slider = this.scrollbar.find(this.options.sliderSelector);
      this.handle = this.slider.find(this.options.handleSelector); // set initial styles

      this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
        touchAction: this.isVertical ? 'pan-x' : 'pan-y',
        position: 'absolute'
      });
      this.slider.css({
        position: 'relative'
      });
      this.handle.css({
        touchAction: 'none',
        position: 'absolute'
      });
    },
    attachEvents: function () {
      this.bindHandlers();
      this.handle.on('jcf-pointerdown', this.onHandlePress);
      this.slider.add(this.btnDec).add(this.btnInc).on('jcf-pointerdown', this.onButtonPress);
    },
    onHandlePress: function (e) {
      if (e.pointerType === 'mouse' && e.button > 1) {
        return;
      } else {
        e.preventDefault();
        this.handleDragActive = true;
        this.sliderOffset = this.slider.offset()[this.offsetProperty];
        this.innerHandleOffset = e[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty];
        this.doc.on('jcf-pointermove', this.onHandleDrag);
        this.doc.on('jcf-pointerup', this.onHandleRelease);
      }
    },
    onHandleDrag: function (e) {
      e.preventDefault();
      this.calcOffset = e[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset;
      this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue);
      this.triggerScrollEvent(this.value);
    },
    onHandleRelease: function () {
      this.handleDragActive = false;
      this.doc.off('jcf-pointermove', this.onHandleDrag);
      this.doc.off('jcf-pointerup', this.onHandleRelease);
    },
    onButtonPress: function (e) {
      var direction, clickOffset;

      if (e.pointerType === 'mouse' && e.button > 1) {
        return;
      } else {
        e.preventDefault();

        if (!this.handleDragActive) {
          if (this.slider.is(e.currentTarget)) {
            // slider pressed
            direction = this.handle.offset()[this.offsetProperty] > e[this.offsetEventProperty] ? -1 : 1;
            clickOffset = e[this.offsetEventProperty] - this.slider.offset()[this.offsetProperty];
            this.startPageScrolling(direction, clickOffset);
          } else {
            // scrollbar buttons pressed
            direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
            this.startSmoothScrolling(direction);
          }

          this.doc.on('jcf-pointerup', this.onButtonRelease);
        }
      }
    },
    onButtonRelease: function () {
      this.stopPageScrolling();
      this.stopSmoothScrolling();
      this.doc.off('jcf-pointerup', this.onButtonRelease);
    },
    startPageScrolling: function (direction, clickOffset) {
      var self = this,
          stepValue = direction * self.currentSize; // limit checker

      var isFinishedScrolling = function () {
        var handleTop = self.value / self.maxValue * (self.currentSliderSize - self.handleSize);

        if (direction > 0) {
          return handleTop + self.handleSize >= clickOffset;
        } else {
          return handleTop <= clickOffset;
        }
      }; // scroll by page when track is pressed


      var doPageScroll = function () {
        self.value += stepValue;
        self.setValue(self.value);
        self.triggerScrollEvent(self.value);

        if (isFinishedScrolling()) {
          clearInterval(self.pageScrollTimer);
        }
      }; // start scrolling


      this.pageScrollTimer = setInterval(doPageScroll, this.options.scrollInterval);
      doPageScroll();
    },
    stopPageScrolling: function () {
      clearInterval(this.pageScrollTimer);
    },
    startSmoothScrolling: function (direction) {
      var self = this,
          dt;
      this.stopSmoothScrolling(); // simple animation functions

      var raf = window.requestAnimationFrame || function (func) {
        setTimeout(func, 16);
      };

      var getTimestamp = function () {
        return Date.now ? Date.now() : new Date().getTime();
      }; // set animation limit


      var isFinishedScrolling = function () {
        if (direction > 0) {
          return self.value >= self.maxValue;
        } else {
          return self.value <= 0;
        }
      }; // animation step


      var doScrollAnimation = function () {
        var stepValue = (getTimestamp() - dt) / 1000 * self.options.scrollStep;

        if (self.smoothScrollActive) {
          self.value += stepValue * direction;
          self.setValue(self.value);
          self.triggerScrollEvent(self.value);

          if (!isFinishedScrolling()) {
            dt = getTimestamp();
            raf(doScrollAnimation);
          }
        }
      }; // start animation


      self.smoothScrollActive = true;
      dt = getTimestamp();
      raf(doScrollAnimation);
    },
    stopSmoothScrolling: function () {
      this.smoothScrollActive = false;
    },
    triggerScrollEvent: function (scrollValue) {
      if (this.options.onScroll) {
        this.options.onScroll(scrollValue);
      }
    },
    getThickness: function () {
      return this.scrollbar[this.thicknessMeasureMethod]();
    },
    setSize: function (size) {
      // resize scrollbar
      var btnDecSize = this.btnDec[this.fullSizeProperty](),
          btnIncSize = this.btnInc[this.fullSizeProperty](); // resize slider

      this.currentSize = size;
      this.currentSliderSize = size - btnDecSize - btnIncSize;
      this.scrollbar.css(this.sizeProperty, size);
      this.slider.css(this.sizeProperty, this.currentSliderSize);
      this.currentSliderSize = this.slider[this.sizeProperty](); // resize handle

      this.handleSize = Math.round(this.currentSliderSize * this.ratio);
      this.handle.css(this.sizeProperty, this.handleSize);
      this.handleSize = this.handle[this.fullSizeProperty]();
      return this;
    },
    setRatio: function (ratio) {
      this.ratio = ratio;
      return this;
    },
    setMaxValue: function (maxValue) {
      this.maxValue = maxValue;
      this.setValue(Math.min(this.value, this.maxValue));
      return this;
    },
    setValue: function (value) {
      this.value = value;

      if (this.value < 0) {
        this.value = 0;
      } else if (this.value > this.maxValue) {
        this.value = this.maxValue;
      }

      this.refresh();
    },
    setPosition: function (styles) {
      this.scrollbar.css(styles);
      return this;
    },
    hide: function () {
      this.scrollbar.detach();
      return this;
    },
    show: function () {
      this.scrollbar.appendTo(this.holder);
      return this;
    },
    refresh: function () {
      // recalculate handle position
      if (this.value === 0 || this.maxValue === 0) {
        this.calcOffset = 0;
      } else {
        this.calcOffset = this.value / this.maxValue * (this.currentSliderSize - this.handleSize);
      }

      this.handle.css(this.offsetProperty, this.calcOffset); // toggle inactive classes

      this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
      this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue);
      this.scrollbar.toggleClass(this.options.inactiveClass, this.maxValue === 0);
    },
    destroy: function () {
      // remove event handlers and scrollbar block itself
      this.btnDec.add(this.btnInc).off('jcf-pointerdown', this.onButtonPress);
      this.handle.off('jcf-pointerdown', this.onHandlePress);
      this.doc.off('jcf-pointermove', this.onHandleDrag);
      this.doc.off('jcf-pointerup', this.onHandleRelease);
      this.doc.off('jcf-pointerup', this.onButtonRelease);
      this.stopSmoothScrolling();
      this.stopPageScrolling();
      this.scrollbar.remove();
    }
  });
  return module;
});

/***/ }),

/***/ "./sharedemos/static/libs/wheelzoom/wheelzoom.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/libs/wheelzoom/wheelzoom.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
	the following code is modified by sharedemos team, some of the functionality added like doZoom.
	Wheelzoom 4.0.1
	license: MIT
	http://www.jacklmoore.com/wheelzoom
*/
window.wheelzoom = function () {
  var defaults = {
    zoom: 0.10,
    maxZoom: false,
    initialZoom: 1,
    initialX: 0.5,
    initialY: 0.5
  };

  var main = function (img, options) {
    if (!img || !img.nodeName || img.nodeName !== 'IMG') {
      return;
    }

    var settings = {};
    var width;
    var height;
    var bgWidth;
    var bgHeight;
    var bgPosX;
    var bgPosY;
    var previousEvent;
    var transparentSpaceFiller;

    function setSrcToBackground(img) {
      img.style.backgroundRepeat = 'no-repeat';
      img.style.backgroundImage = 'url("' + img.src + '")';
      transparentSpaceFiller = 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="' + img.naturalWidth + '" height="' + img.naturalHeight + '"></svg>');
      img.src = transparentSpaceFiller;
    }

    function updateBgStyle() {
      if (bgPosX > 0) {
        bgPosX = 0;
      } else if (bgPosX < width - bgWidth) {
        bgPosX = width - bgWidth;
      }

      if (bgPosY > 0) {
        bgPosY = 0;
      } else if (bgPosY < height - bgHeight) {
        bgPosY = height - bgHeight;
      }

      img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
      img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
    }

    function reset() {
      bgWidth = width;
      bgHeight = height;
      bgPosX = bgPosY = 0;
      updateBgStyle();
    }

    function onwheel(e) {
      var deltaY = 0;
      e.preventDefault();

      if (e.deltaY) {
        // FireFox 17+ (IE9+, Chrome 31+?)
        deltaY = e.deltaY;
      } else if (e.wheelDelta) {
        deltaY = -e.wheelDelta;
      } // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
      // We have to calculate the target element's position relative to the document, and subtrack that from the
      // cursor's position relative to the document.


      var rect = img.getBoundingClientRect();
      var offsetX = e.pageX - rect.left - window.pageXOffset;
      var offsetY = e.pageY - rect.top - window.pageYOffset; // Record the offset between the bg edge and cursor:

      var bgCursorX = offsetX - bgPosX;
      var bgCursorY = offsetY - bgPosY; // Use the previous offset to get the percent offset between the bg edge and cursor:

      var bgRatioX = bgCursorX / bgWidth;
      var bgRatioY = bgCursorY / bgHeight; // Update the bg size:

      if (deltaY < 0) {
        bgWidth += bgWidth * settings.zoom;
        bgHeight += bgHeight * settings.zoom;
      } else {
        bgWidth -= bgWidth * settings.zoom;
        bgHeight -= bgHeight * settings.zoom;
      }

      if (settings.maxZoom) {
        bgWidth = Math.min(width * settings.maxZoom, bgWidth);
        bgHeight = Math.min(height * settings.maxZoom, bgHeight);
      } // Take the percent offset and apply it to the new size:


      bgPosX = offsetX - bgWidth * bgRatioX;
      bgPosY = offsetY - bgHeight * bgRatioY; // Prevent zooming out beyond the starting size

      if (bgWidth <= width || bgHeight <= height) {
        reset();
      } else {
        updateBgStyle();
      }
    } //code overwritten for button functionality by sharedemos team


    function doZoom(deltaY) {
      // zoom always at the center of the image
      let offsetX = img.width / 2;
      let offsetY = img.height / 2; // Record the offset between the bg edge and the center of the image:

      let bgCenterX = offsetX - bgPosX;
      let bgCenterY = offsetY - bgPosY; // Use the previous offset to get the percent offset between the bg edge and the center of the image:

      let bgRatioX = bgCenterX / bgWidth;
      let bgRatioY = bgCenterY / bgHeight; // Update the bg size:

      if (deltaY < 0) {
        bgWidth += bgWidth * settings.zoom;
        bgHeight += bgHeight * settings.zoom;
      } else {
        bgWidth -= bgWidth * settings.zoom;
        bgHeight -= bgHeight * settings.zoom;
      }

      if (settings.maxZoom) {
        bgWidth = Math.min(width * settings.maxZoom, bgWidth);
        bgHeight = Math.min(height * settings.maxZoom, bgHeight);
      } // Take the percent offset and apply it to the new size:


      bgPosX = offsetX - bgWidth * bgRatioX;
      bgPosY = offsetY - bgHeight * bgRatioY; // Prevent zooming out beyond the starting size

      if (bgWidth <= width || bgHeight <= height) {
        reset();
      } else {
        updateBgStyle();
      }
    } //end of code 


    function drag(e) {
      e.preventDefault();
      bgPosX += e.pageX - previousEvent.pageX;
      bgPosY += e.pageY - previousEvent.pageY;
      previousEvent = e;
      updateBgStyle();
    }

    function removeDrag() {
      document.removeEventListener('mouseup', removeDrag);
      document.removeEventListener('mousemove', drag);
    } // Make the background draggable


    function draggable(e) {
      e.preventDefault();
      previousEvent = e;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', removeDrag);
    }

    function load() {
      var initial = Math.max(settings.initialZoom, 1);
      if (img.src === transparentSpaceFiller) return;
      var computedStyle = window.getComputedStyle(img, null);
      width = parseInt(computedStyle.width, 10);
      height = parseInt(computedStyle.height, 10);
      bgWidth = width * initial;
      bgHeight = height * initial;
      bgPosX = -(bgWidth - width) * settings.initialX;
      bgPosY = -(bgHeight - height) * settings.initialY;
      setSrcToBackground(img);
      img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
      img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
      img.addEventListener('wheelzoom.reset', reset); //code overwritten for button functionality by sharedemos team

      $(img).parent().find('.zoom-in').click(() => {
        doZoom(-100);
      });
      $(img).parent().find('.reset-zoom').click(() => {
        reset();
      });
      $(img).parent().find('.zoom-out').click(() => {
        doZoom(100);
      }); //end of code

      img.addEventListener('wheel', onwheel);
      img.addEventListener('mousedown', draggable);
    }

    var destroy = function (originalProperties) {
      img.removeEventListener('wheelzoom.destroy', destroy);
      img.removeEventListener('wheelzoom.reset', reset);
      img.removeEventListener('load', load);
      img.removeEventListener('mouseup', removeDrag);
      img.removeEventListener('mousemove', drag);
      img.removeEventListener('mousedown', draggable);
      img.removeEventListener('wheel', onwheel);
      img.style.backgroundImage = originalProperties.backgroundImage;
      img.style.backgroundRepeat = originalProperties.backgroundRepeat;
      img.src = originalProperties.src;
    }.bind(null, {
      backgroundImage: img.style.backgroundImage,
      backgroundRepeat: img.style.backgroundRepeat,
      src: img.src
    });

    img.addEventListener('wheelzoom.destroy', destroy);
    options = options || {};
    Object.keys(defaults).forEach(function (key) {
      settings[key] = options[key] !== undefined ? options[key] : defaults[key];
    });

    if (img.complete) {
      load();
    }

    img.addEventListener('load', load);
  }; // Do nothing in IE9 or below


  if (typeof window.btoa !== 'function') {
    return function (elements) {
      return elements;
    };
  } else {
    return function (elements, options) {
      if (elements && elements.length) {
        Array.prototype.forEach.call(elements, function (node) {
          main(node, options);
        });
      } else if (elements && elements.nodeName) {
        main(elements, options);
      }

      return elements;
    };
  }
}();

/***/ })

}]);
//# sourceMappingURL=2.6f0508.js.map