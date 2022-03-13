(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./sharedemos/static/js/tenant/models/icon.js":
/*!****************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/icon.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Icon = Backbone.Model.extend({
    urlRoot: "/api/icon"
  });
  return Icon;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/file.min.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/file.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (i) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (E) {
  E.extend(E.FE.POPUP_TEMPLATES, {
    "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]"
  }), E.extend(E.FE.DEFAULTS, {
    fileUpload: !0,
    fileUploadURL: null,
    fileUploadParam: "file",
    fileUploadParams: {},
    fileUploadToS3: !1,
    fileUploadMethod: "POST",
    fileMaxSize: 10485760,
    fileAllowedTypes: ["*"],
    fileInsertButtons: ["fileBack", "|"],
    fileUseSelectedText: !1
  }), E.FE.PLUGINS.file = function (f) {
    var r,
        p = "https://i.froala.com/upload",
        l = 2,
        d = 3,
        u = 4,
        c = 5,
        v = 6,
        i = {};

    function g() {
      var e = f.popups.get("file.insert");
      e || (e = S()), e.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), e.find(".fr-file-progress-bar-layer").addClass("fr-active"), e.find(".fr-buttons").hide(), n(f.language.translate("Uploading"), 0);
    }

    function o(e) {
      var t = f.popups.get("file.insert");
      t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-file-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e && (f.events.focus(), f.popups.hide("file.insert")));
    }

    function n(e, t) {
      var i = f.popups.get("file.insert");

      if (i) {
        var r = i.find(".fr-file-progress-bar-layer");
        r.find("h3").text(e + (t ? " " + t + "%" : "")), r.removeClass("fr-error"), t ? (r.find("div").removeClass("fr-indeterminate"), r.find("div > span").css("width", t + "%")) : r.find("div").addClass("fr-indeterminate");
      }
    }

    function h(e, t, i) {
      f.edit.on(), f.events.focus(!0), f.selection.restore(), f.opts.fileUseSelectedText && f.selection.text().length && (t = f.selection.text()), f.html.insert('<a href="' + e + '" target="_blank" id="fr-inserted-file" class="fr-file">' + t + "</a>");
      var r = f.$el.find("#fr-inserted-file");
      r.removeAttr("id"), f.popups.hide("file.insert"), f.undo.saveStep(), C(), f.events.trigger("file.inserted", [r, i]);
    }

    function m(e) {
      var t = this.status,
          i = this.response,
          r = this.responseXML,
          o = this.responseText;

      try {
        if (f.opts.fileUploadToS3) {
          if (201 == t) {
            var n = function (e) {
              try {
                var t = E(e).find("Location").text(),
                    i = E(e).find("Key").text();
                return !1 === f.events.trigger("file.uploadedToS3", [t, i, e], !0) ? (f.edit.on(), !1) : t;
              } catch (r) {
                return U(u, e), !1;
              }
            }(r);

            n && h(n, e, i || r);
          } else U(u, i || r);
        } else if (200 <= t && t < 300) {
          var a = function (e) {
            try {
              if (!1 === f.events.trigger("file.uploaded", [e], !0)) return f.edit.on(), !1;
              var t = JSON.parse(e);
              return t.link ? t : (U(l, e), !1);
            } catch (i) {
              return U(u, e), !1;
            }
          }(o);

          a && h(a.link, e, i || o);
        } else U(d, i || o);
      } catch (s) {
        U(u, i || o);
      }
    }

    function b() {
      U(u, this.response || this.responseText || this.responseXML);
    }

    function y(e) {
      if (e.lengthComputable) {
        var t = e.loaded / e.total * 100 | 0;
        n(f.language.translate("Uploading"), t);
      }
    }

    function U(e, t) {
      f.edit.on(), function (e) {
        g();
        var t = f.popups.get("file.insert").find(".fr-file-progress-bar-layer");
        t.addClass("fr-error");
        var i = t.find("h3");
        i.text(e), f.events.disableBlur(), i.focus();
      }(f.language.translate("Something went wrong. Please try again.")), f.events.trigger("file.error", [{
        code: e,
        message: i[e]
      }, t]);
    }

    function w() {
      f.edit.on(), o(!0);
    }

    function a(e) {
      if (void 0 !== e && 0 < e.length) {
        if (!1 === f.events.trigger("file.beforeUpload", [e])) return !1;
        var t,
            i = e[0];
        if ((null === f.opts.fileUploadURL || f.opts.fileUploadURL == p) && !f.opts.fileUploadToS3) return s = i, (l = new FileReader()).addEventListener("load", function () {
          for (var e = l.result, t = atob(l.result.split(",")[1]), i = [], r = 0; r < t.length; r++) i.push(t.charCodeAt(r));

          e = window.URL.createObjectURL(new Blob([new Uint8Array(i)], {
            type: s.type
          })), f.file.insert(e, s.name, null);
        }, !1), g(), l.readAsDataURL(s), !1;
        if (i.size > f.opts.fileMaxSize) return U(c), !1;
        if (f.opts.fileAllowedTypes.indexOf("*") < 0 && f.opts.fileAllowedTypes.indexOf(i.type.replace(/file\//g, "")) < 0) return U(v), !1;

        if (f.drag_support.formdata && (t = f.drag_support.formdata ? new FormData() : null), t) {
          var r;
          if (!1 !== f.opts.fileUploadToS3) for (r in t.append("key", f.opts.fileUploadToS3.keyStart + new Date().getTime() + "-" + (i.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", i.type), f.opts.fileUploadToS3.params) f.opts.fileUploadToS3.params.hasOwnProperty(r) && t.append(r, f.opts.fileUploadToS3.params[r]);

          for (r in f.opts.fileUploadParams) f.opts.fileUploadParams.hasOwnProperty(r) && t.append(r, f.opts.fileUploadParams[r]);

          t.append(f.opts.fileUploadParam, i);
          var o = f.opts.fileUploadURL;
          f.opts.fileUploadToS3 && (o = f.opts.fileUploadToS3.uploadURL ? f.opts.fileUploadToS3.uploadURL : "https://" + f.opts.fileUploadToS3.region + ".amazonaws.com/" + f.opts.fileUploadToS3.bucket);
          var n = f.core.getXHR(o, f.opts.fileUploadMethod);
          n.onload = function () {
            m.call(n, i.name);
          }, n.onerror = b, n.upload.onprogress = y, n.onabort = w, g();
          var a = f.popups.get("file.insert");
          a && a.off("abortUpload").on("abortUpload", function () {
            4 != n.readyState && n.abort();
          }), n.send(t);
        }
      }

      var s, l;
    }

    function s() {
      o();
    }

    function S(e) {
      if (e) return f.popups.onHide("file.insert", s), !0;
      var t;
      f.opts.fileUpload || f.opts.fileInsertButtons.splice(f.opts.fileInsertButtons.indexOf("fileUpload"), 1), t = '<div class="fr-buttons">' + f.button.buildList(f.opts.fileInsertButtons) + "</div>";
      var i = "";
      f.opts.fileUpload && (i = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-' + f.id + '"><strong>' + f.language.translate("Drop file") + "</strong><br>(" + f.language.translate("or click") + ')<div class="fr-form"><input type="file" name="' + f.opts.fileUploadParam + '" accept="' + (0 <= f.opts.fileAllowedTypes.indexOf("*") ? "/" : "") + f.opts.fileAllowedTypes.join(", ").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-file-upload-layer-' + f.id + '" role="button"></div></div>');
      var r,
          o = {
        buttons: t,
        upload_layer: i,
        progress_bar: '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>'
      },
          n = f.popups.create("file.insert", o);
      return r = n, f.events.$on(r, "dragover dragenter", ".fr-file-upload-layer", function () {
        return E(this).addClass("fr-drop"), !1;
      }, !0), f.events.$on(r, "dragleave dragend", ".fr-file-upload-layer", function () {
        return E(this).removeClass("fr-drop"), !1;
      }, !0), f.events.$on(r, "drop", ".fr-file-upload-layer", function (e) {
        e.preventDefault(), e.stopPropagation(), E(this).removeClass("fr-drop");
        var t = e.originalEvent.dataTransfer;
        t && t.files && (r.data("instance") || f).file.upload(t.files);
      }, !0), f.helpers.isIOS() && f.events.$on(r, "touchstart", '.fr-file-upload-layer input[type="file"]', function () {
        E(this).trigger("click");
      }), f.events.$on(r, "change", '.fr-file-upload-layer input[type="file"]', function () {
        if (this.files) {
          var e = r.data("instance") || f;
          e.events.disableBlur(), r.find("input:focus").blur(), e.events.enableBlur(), e.file.upload(this.files);
        }

        E(this).val("");
      }, !0), n;
    }

    function e(e) {
      f.node.hasClass(e, "fr-file");
    }

    function t(e) {
      var t = e.originalEvent.dataTransfer;

      if (t && t.files && t.files.length) {
        var i = t.files[0];

        if (i && "undefined" != typeof i.type) {
          if (i.type.indexOf("image") < 0) {
            if (!f.opts.fileUpload) return e.preventDefault(), e.stopPropagation(), !1;
            f.markers.remove(), f.markers.insertAtPoint(e.originalEvent), f.$el.find(".fr-marker").replaceWith(E.FE.MARKERS), f.popups.hideAll();
            var r = f.popups.get("file.insert");
            return r || (r = S()), f.popups.setContainer("file.insert", f.$sc), f.popups.show("file.insert", e.originalEvent.pageX, e.originalEvent.pageY), g(), a(t.files), e.preventDefault(), e.stopPropagation(), !1;
          }
        } else i.type.indexOf("image") < 0 && (e.preventDefault(), e.stopPropagation());
      }
    }

    function C() {
      var e,
          t = Array.prototype.slice.call(f.el.querySelectorAll("a.fr-file")),
          i = [];

      for (e = 0; e < t.length; e++) i.push(t[e].getAttribute("href"));

      if (r) for (e = 0; e < r.length; e++) i.indexOf(r[e].getAttribute("href")) < 0 && f.events.trigger("file.unlink", [r[e]]);
      r = t;
    }

    return i[1] = "File cannot be loaded from the passed link.", i[l] = "No link in upload response.", i[d] = "Error during file upload.", i[u] = "Parsing response failed.", i[c] = "File is too large.", i[v] = "File file type is invalid.", i[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", {
      _init: function () {
        f.events.on("drop", t), f.events.$on(f.$win, "keydown", function (e) {
          var t = e.which,
              i = f.popups.get("file.insert");
          i && t == E.FE.KEYCODE.ESC && i.trigger("abortUpload");
        }), f.events.on("destroy", function () {
          var e = f.popups.get("file.insert");
          e && e.trigger("abortUpload");
        }), f.events.on("link.beforeRemove", e), f.$wp && (C(), f.events.on("contentChanged", C)), S(!0);
      },
      showInsertPopup: function () {
        var e = f.$tb.find('.fr-command[data-cmd="insertFile"]'),
            t = f.popups.get("file.insert");
        if (t || (t = S()), o(), !t.hasClass("fr-active")) if (f.popups.refresh("file.insert"), f.popups.setContainer("file.insert", f.$tb), e.is(":visible")) {
          var i = e.offset().left + e.outerWidth() / 2,
              r = e.offset().top + (f.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          f.popups.show("file.insert", i, r, e.outerHeight());
        } else f.position.forSelection(t), f.popups.show("file.insert");
      },
      upload: a,
      insert: h,
      back: function () {
        f.events.disableBlur(), f.selection.restore(), f.events.enableBlur(), f.popups.hide("file.insert"), f.toolbar.showInline();
      },
      hideProgressBar: o
    };
  }, E.FE.DefineIcon("insertFile", {
    NAME: "file-o",
    FA5NAME: "file"
  }), E.FE.RegisterCommand("insertFile", {
    title: "Upload File",
    undo: !1,
    focus: !0,
    refreshAfterCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("file.insert")) : this.file.showInsertPopup();
    },
    plugin: "file"
  }), E.FE.DefineIcon("fileBack", {
    NAME: "arrow-left"
  }), E.FE.RegisterCommand("fileBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.file.back();
    },
    refresh: function (e) {
      this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    }
  }), E.FE.RegisterCommand("fileDismissError", {
    title: "OK",
    callback: function () {
      this.file.hideProgressBar(!0);
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/line_height.min.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/line_height.min.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (n) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (o) {
  o.extend(o.FE.DEFAULTS, {
    lineHeights: {
      Default: "",
      Single: "1",
      1.15: "1.15",
      1.5: "1.5",
      Double: "2"
    }
  }), o.FE.PLUGINS.lineHeight = function (r) {
    return {
      _init: function () {},
      apply: function (e) {
        r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore();
        var t = r.selection.blocks();
        r.selection.save();

        for (var n = 0; n < t.length; n++) o(t[n]).css("line-height", e), "" === o(t[n]).attr("style") && o(t[n]).removeAttr("style");

        r.html.unwrap(), r.selection.restore();
      },
      refreshOnShow: function (e, t) {
        var n = r.selection.blocks();

        if (n.length) {
          var i = o(n[0]);
          t.find(".fr-command").each(function () {
            var e = o(this).data("param1"),
                t = 0 <= (i.attr("style") || "").indexOf("line-height: " + e + ";");
            o(this).toggleClass("fr-active", t).attr("aria-selected", t);
          });
        }
      }
    };
  }, o.FE.RegisterCommand("lineHeight", {
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.lineHeights;

      for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command ' + n + '" tabIndex="-1" role="option" data-cmd="lineHeight" data-param1="' + t[n] + '" title="' + this.language.translate(n) + '">' + this.language.translate(n) + "</a></li>");

      return e += "</ul>";
    },
    title: "Line Height",
    callback: function (e, t) {
      this.lineHeight.apply(t);
    },
    refreshOnShow: function (e, t) {
      this.lineHeight.refreshOnShow(e, t);
    },
    plugin: "lineHeight"
  }), o.FE.DefineIcon("lineHeight", {
    NAME: "arrows-v",
    FA5NAME: "arrows-alt-v"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/third_party/font_awesome.min.js":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/third_party/font_awesome.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (a) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (u) {
  u.extend(u.FE.DEFAULTS, {
    fontAwesomeTemplate: '<i class="fa fa-[NAME] fr-deletable" aria-hidden="true">&nbsp;</i>',
    fontAwesomeSets: [{
      title: "Web Application Icons",
      list: ["address-book", "address-book-o", "address-card", "address-card-o", "adjust", "american-sign-language-interpreting", "anchor", "archive", "area-chart", "arrows", "arrows-h", "arrows-v", "asl-interpreting ", "assistive-listening-systems", "asterisk", "at", "audio-description", "automobile ", "balance-scale", "ban", "bank ", "bar-chart", "bar-chart-o ", "barcode", "bars", "bath", "bathtub ", "battery ", "battery-0 ", "battery-1 ", "battery-2 ", "battery-3 ", "battery-4 ", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-o", "bell-slash", "bell-slash-o", "bicycle", "binoculars", "birthday-cake", "blind", "bluetooth", "bluetooth-b", "bolt", "bomb", "book", "bookmark", "bookmark-o", "braille", "briefcase", "bug", "building", "building-o", "bullhorn", "bullseye", "bus", "cab ", "calculator", "calendar", "calendar-check-o", "calendar-minus-o", "calendar-o", "calendar-plus-o", "calendar-times-o", "camera", "camera-retro", "car", "caret-square-o-down", "caret-square-o-left", "caret-square-o-right", "caret-square-o-up", "cart-arrow-down", "cart-plus", "cc", "certificate", "check", "check-circle", "check-circle-o", "check-square", "check-square-o", "child", "circle", "circle-o", "circle-o-notch", "circle-thin", "clock-o", "clone", "close ", "cloud", "cloud-download", "cloud-upload", "code", "code-fork", "coffee", "cog", "cogs", "comment", "comment-o", "commenting", "commenting-o", "comments", "comments-o", "compass", "copyright", "creative-commons", "credit-card", "credit-card-alt", "crop", "crosshairs", "cube", "cubes", "cutlery", "dashboard ", "database", "deaf", "deafness ", "desktop", "diamond", "dot-circle-o", "download", "drivers-license ", "drivers-license-o ", "edit ", "ellipsis-h", "ellipsis-v", "envelope", "envelope-o", "envelope-open", "envelope-open-o", "envelope-square", "eraser", "exchange", "exclamation", "exclamation-circle", "exclamation-triangle", "external-link", "external-link-square", "eye", "eye-slash", "eyedropper", "fax", "feed ", "female", "fighter-jet", "file-archive-o", "file-audio-o", "file-code-o", "file-excel-o", "file-image-o", "file-movie-o ", "file-pdf-o", "file-photo-o ", "file-picture-o ", "file-powerpoint-o", "file-sound-o ", "file-video-o", "file-word-o", "file-zip-o ", "film", "filter", "fire", "fire-extinguisher", "flag", "flag-checkered", "flag-o", "flash ", "flask", "folder", "folder-o", "folder-open", "folder-open-o", "frown-o", "futbol-o", "gamepad", "gavel", "gear ", "gears ", "gift", "glass", "globe", "graduation-cap", "group ", "hand-grab-o ", "hand-lizard-o", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o ", "handshake-o", "hard-of-hearing ", "hashtag", "hdd-o", "headphones", "heart", "heart-o", "heartbeat", "history", "home", "hotel ", "hourglass", "hourglass-1 ", "hourglass-2 ", "hourglass-3 ", "hourglass-end", "hourglass-half", "hourglass-o", "hourglass-start", "i-cursor", "id-badge", "id-card", "id-card-o", "image ", "inbox", "industry", "info", "info-circle", "institution ", "key", "keyboard-o", "language", "laptop", "leaf", "legal ", "lemon-o", "level-down", "level-up", "life-bouy ", "life-buoy ", "life-ring", "life-saver ", "lightbulb-o", "line-chart", "location-arrow", "lock", "low-vision", "magic", "magnet", "mail-forward ", "mail-reply ", "mail-reply-all ", "male", "map", "map-marker", "map-o", "map-pin", "map-signs", "meh-o", "microchip", "microphone", "microphone-slash", "minus", "minus-circle", "minus-square", "minus-square-o", "mobile", "mobile-phone ", "money", "moon-o", "mortar-board ", "motorcycle", "mouse-pointer", "music", "navicon ", "newspaper-o", "object-group", "object-ungroup", "paint-brush", "paper-plane", "paper-plane-o", "paw", "pencil", "pencil-square", "pencil-square-o", "percent", "phone", "phone-square", "photo ", "picture-o", "pie-chart", "plane", "plug", "plus", "plus-circle", "plus-square", "plus-square-o", "podcast", "power-off", "print", "puzzle-piece", "qrcode", "question", "question-circle", "question-circle-o", "quote-left", "quote-right", "random", "recycle", "refresh", "registered", "remove ", "reorder ", "reply", "reply-all", "retweet", "road", "rocket", "rss", "rss-square", "s15 ", "search", "search-minus", "search-plus", "send ", "send-o ", "server", "share", "share-alt", "share-alt-square", "share-square", "share-square-o", "shield", "ship", "shopping-bag", "shopping-basket", "shopping-cart", "shower", "sign-in", "sign-language", "sign-out", "signal", "signing ", "sitemap", "sliders", "smile-o", "snowflake-o", "soccer-ball-o ", "sort", "sort-alpha-asc", "sort-alpha-desc", "sort-amount-asc", "sort-amount-desc", "sort-asc", "sort-desc", "sort-down ", "sort-numeric-asc", "sort-numeric-desc", "sort-up ", "space-shuttle", "spinner", "spoon", "square", "square-o", "star", "star-half", "star-half-empty ", "star-half-full ", "star-half-o", "star-o", "sticky-note", "sticky-note-o", "street-view", "suitcase", "sun-o", "support ", "tablet", "tachometer", "tag", "tags", "tasks", "taxi", "television", "terminal", "thermometer ", "thermometer-0 ", "thermometer-1 ", "thermometer-2 ", "thermometer-3 ", "thermometer-4 ", "thermometer-empty", "thermometer-full", "thermometer-half", "thermometer-quarter", "thermometer-three-quarters", "thumb-tack", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up", "ticket", "times", "times-circle", "times-circle-o", "times-rectangle ", "times-rectangle-o ", "tint", "toggle-down ", "toggle-left ", "toggle-off", "toggle-on", "toggle-right ", "toggle-up ", "trademark", "trash", "trash-o", "tree", "trophy", "truck", "tty", "tv ", "umbrella", "universal-access", "university", "unlock", "unlock-alt", "unsorted ", "upload", "user", "user-circle", "user-circle-o", "user-o", "user-plus", "user-secret", "user-times", "users", "vcard ", "vcard-o ", "video-camera", "volume-control-phone", "volume-down", "volume-off", "volume-up", "warning ", "wheelchair", "wheelchair-alt", "wifi", "window-close", "window-close-o", "window-maximize", "window-minimize", "window-restore", "wrench"]
    }, {
      title: "Accessibility Icons",
      list: ["american-sign-language-interpreting", "asl-interpreting ", "assistive-listening-systems", "audio-description", "blind", "braille", "cc", "deaf", "deafness ", "hard-of-hearing ", "low-vision", "question-circle-o", "sign-language", "signing ", "tty", "universal-access", "volume-control-phone", "wheelchair", "wheelchair-alt"]
    }, {
      title: "Hand Icons",
      list: ["hand-grab-o ", "hand-lizard-o", "hand-o-down", "hand-o-left", "hand-o-right", "hand-o-up", "hand-paper-o", "hand-peace-o", "hand-pointer-o", "hand-rock-o", "hand-scissors-o", "hand-spock-o", "hand-stop-o ", "thumbs-down", "thumbs-o-down", "thumbs-o-up", "thumbs-up"]
    }, {
      title: "Transportation Icons",
      list: ["ambulance", "automobile ", "bicycle", "bus", "cab ", "car", "fighter-jet", "motorcycle", "plane", "rocket", "ship", "space-shuttle", "subway", "taxi", "train", "truck", "wheelchair", "wheelchair-alt"]
    }, {
      title: "Gender Icons",
      list: ["genderless", "intersex ", "mars", "mars-double", "mars-stroke", "mars-stroke-h", "mars-stroke-v", "mercury", "neuter", "transgender", "transgender-alt", "venus", "venus-double", "venus-mars"]
    }, {
      title: "Form Control Icons",
      list: ["check-square", "check-square-o", "circle", "circle-o", "dot-circle-o", "minus-square", "minus-square-o", "plus-square", "plus-square-o", "square", "square-o"]
    }, {
      title: "Payment Icons",
      list: ["cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "credit-card", "credit-card-alt", "google-wallet", "paypal"]
    }, {
      title: "Chart Icons",
      list: ["area-chart", "bar-chart", "bar-chart-o ", "line-chart", "pie-chart"]
    }, {
      title: "Currency Icons",
      list: ["bitcoin ", "btc", "cny ", "dollar ", "eur", "euro ", "gbp", "gg", "gg-circle", "ils", "inr", "jpy", "krw", "money", "rmb ", "rouble ", "rub", "ruble ", "rupee ", "shekel ", "sheqel ", "try", "turkish-lira ", "usd", "viacoin", "won ", "yen"]
    }, {
      title: "Text Editor Icons",
      list: ["align-center", "align-justify", "align-left", "align-right", "bold", "chain ", "chain-broken", "clipboard", "columns", "copy ", "cut ", "dedent ", "eraser", "file", "file-o", "file-text", "file-text-o", "files-o", "floppy-o", "font", "header", "indent", "italic", "link", "list", "list-alt", "list-ol", "list-ul", "outdent", "paperclip", "paragraph", "paste ", "repeat", "rotate-left ", "rotate-right ", "save ", "scissors", "strikethrough", "subscript", "superscript", "table", "text-height", "text-width", "th", "th-large", "th-list", "underline", "undo", "unlink"]
    }, {
      title: "Brand Icons",
      list: ["500px", "adn", "amazon", "android", "angellist", "apple", "bandcamp", "behance", "behance-square", "bitbucket", "bitbucket-square", "bitcoin ", "black-tie", "bluetooth", "bluetooth-b", "btc", "buysellads", "cc-amex", "cc-diners-club", "cc-discover", "cc-jcb", "cc-mastercard", "cc-paypal", "cc-stripe", "cc-visa", "chrome", "codepen", "codiepie", "connectdevelop", "contao", "css3", "dashcube", "delicious", "deviantart", "digg", "dribbble", "dropbox", "drupal", "edge", "eercast", "empire", "envira", "etsy", "expeditedssl", "fa ", "facebook", "facebook-f ", "facebook-official", "facebook-square", "firefox", "first-order", "flickr", "font-awesome", "fonticons", "fort-awesome", "forumbee", "foursquare", "free-code-camp", "ge ", "get-pocket", "gg", "gg-circle", "git", "git-square", "github", "github-alt", "github-square", "gitlab", "gittip ", "glide", "glide-g", "google", "google-plus", "google-plus-circle ", "google-plus-official", "google-plus-square", "google-wallet", "gratipay", "grav", "hacker-news", "houzz", "html5", "imdb", "instagram", "internet-explorer", "ioxhost", "joomla", "jsfiddle", "lastfm", "lastfm-square", "leanpub", "linkedin", "linkedin-square", "linode", "linux", "maxcdn", "meanpath", "medium", "meetup", "mixcloud", "modx", "odnoklassniki", "odnoklassniki-square", "opencart", "openid", "opera", "optin-monster", "pagelines", "paypal", "pied-piper", "pied-piper-alt", "pied-piper-pp", "pinterest", "pinterest-p", "pinterest-square", "product-hunt", "qq", "quora", "ra ", "ravelry", "rebel", "reddit", "reddit-alien", "reddit-square", "renren", "resistance ", "safari", "scribd", "sellsy", "share-alt", "share-alt-square", "shirtsinbulk", "simplybuilt", "skyatlas", "skype", "slack", "slideshare", "snapchat", "snapchat-ghost", "snapchat-square", "soundcloud", "spotify", "stack-exchange", "stack-overflow", "steam", "steam-square", "stumbleupon", "stumbleupon-circle", "superpowers", "telegram", "tencent-weibo", "themeisle", "trello", "tripadvisor", "tumblr", "tumblr-square", "twitch", "twitter", "twitter-square", "usb", "viacoin", "viadeo", "viadeo-square", "vimeo", "vimeo-square", "vine", "vk", "wechat ", "weibo", "weixin", "whatsapp", "wikipedia-w", "windows", "wordpress", "wpbeginner", "wpexplorer", "wpforms", "xing", "xing-square", "y-combinator", "y-combinator-square ", "yahoo", "yc ", "yc-square ", "yelp", "yoast", "youtube", "youtube-play", "youtube-square"]
    }]
  }), u.FE.PLUGINS.fontAwesome = function (n) {
    var i,
        l,
        t = "font_awesome";

    function c(e, o) {
      n.events.disableBlur(), e.focus(), o.preventDefault(), o.stopPropagation();
    }

    return {
      _init: function () {},
      show: function () {
        if (!i) {
          var e = "<h4>" + n.language.translate("Font Awesome") + "</h4>",
              o = function () {
            for (var e = '<div class="fr-font-awesome-modal">', o = 0; o < n.opts.fontAwesomeSets.length; o++) {
              for (var a = n.opts.fontAwesomeSets[o], t = a.list, r = '<div class="fr-font-awesome-list"><p class="fr-font-awesome-title">' + n.language.translate(a.title) + "</p>", s = 0; s < t.length; s++) {
                var i = t[s];
                r += '<span class="fr-command fr-font-awesome" tabIndex="-1" role="button" value="' + i + '">' + n.opts.fontAwesomeTemplate.replace(/\[NAME\]/g, i) + '<span class="fr-sr-only">' + n.language.translate("Example of") + i + "&nbsp;&nbsp;&nbsp;</span></span>";
              }

              e += r + "</div>";
            }

            return e += "</div>";
          }(),
              a = n.modals.create(t, e, o);

          i = a.$modal, a.$head, l = a.$body, n.events.$on(u(n.o_win), "resize", function () {
            (i.data("instance") || n).modals.resize(t);
          }), n.events.bindClick(l, ".fr-font-awesome", function (e) {
            var o = i.data("instance") || n,
                a = u(e.currentTarget);
            o.fontAwesome.insert(a);
          }), n.events.$on(l, "keydown", function (e) {
            var o = e.which,
                a = l.find("span.fr-font-awesome:focus:first");
            if (!(a.length || o != u.FE.KEYCODE.F10 || n.keys.ctrlKey(e) || e.shiftKey) && e.altKey) return c(l.find("span.fr-font-awesome:first"), e), !1;

            if (o == u.FE.KEYCODE.TAB || o == u.FE.KEYCODE.ARROW_LEFT || o == u.FE.KEYCODE.ARROW_RIGHT) {
              var t = null,
                  r = null,
                  s = !1;
              return o == u.FE.KEYCODE.ARROW_LEFT || o == u.FE.KEYCODE.ARROW_RIGHT ? (r = o == u.FE.KEYCODE.ARROW_RIGHT, s = !0) : r = !e.shiftKey, a.length ? (s && (t = r ? a.nextAll("span.fr-font-awesome:first") : a.prevAll("span.fr-font-awesome:first")), t && t.length || (t = r ? a.parent().next().find("span.fr-font-awesome:first") : a.parent().prev().find("span.fr-font-awesome:" + (s ? "last" : "first"))).length || (t = l.find("span.fr-font-awesome:" + (r ? "first" : "last")))) : t = l.find("span.fr-font-awesome:" + (r ? "first" : "last")), c(t, e), !1;
            }

            if (o != u.FE.KEYCODE.ENTER || !a.length) return !0;
            (i.data("instance") || n).fontAwesome.insert(a);
          }, !0);
        }

        n.modals.show(t), n.modals.resize(t);
      },
      hide: function () {
        n.modals.hide(t);
      },
      insert: function (e) {
        n.fontAwesome.hide(), n.undo.saveStep(), n.html.insert(n.opts.fontAwesomeTemplate.replace(/\[NAME\]/g, e.attr("value")), !0), n.undo.saveStep();
      }
    };
  }, u.FroalaEditor.DefineIcon("fontAwesome", {
    NAME: "font-awesome",
    FA5NAME: "font-awesome-flag",
    template: function () {
      return "font_awesome_5" == this.opts.iconsTemplate ? "font_awesome_5b" : u.FE.ICON_DEFAULT_TEMPLATE || this.opts.iconsTemplate;
    }
  }), u.FE.RegisterCommand("fontAwesome", {
    title: "Font Awesome",
    icon: "fontAwesome",
    undo: !1,
    focus: !1,
    modal: !0,
    callback: function () {
      this.fontAwesome.show();
    },
    plugin: "fontAwesome",
    showOnMobile: !0
  });
});

/***/ })

}]);
//# sourceMappingURL=13.4ff195.js.map