(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./sharedemos/static/libs/froala/js/froala_editor.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/froala_editor.min.js ***!
  \***************************************************************/
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
}(function (M) {
  var s = function (e, t) {
    this.id = ++M.FE.ID;
    var n = {};
    t && t.documentReady && (n.toolbarButtons = ["fullscreen", "undo", "redo", "getPDF", "print", "|", "bold", "italic", "underline", "color", "clearFormatting", "|", "alignLeft", "alignCenter", "alignRight", "alignJustify", "|", "formatOL", "formatUL", "indent", "outdent", "-", "paragraphFormat", "|", "fontFamily", "|", "fontSize", "|", "insertLink", "insertImage", "quote"], n.paragraphFormatSelection = !0, n.fontFamilySelection = !0, n.fontSizeSelection = !0, n.placeholderText = "", n.quickInsertEnabled = !1, n.charCounterCount = !1), this.opts = M.extend(!0, {}, M.extend({}, s.DEFAULTS, n, "object" == typeof t && t));
    var r = JSON.stringify(this.opts);
    M.FE.OPTS_MAPPING[r] = M.FE.OPTS_MAPPING[r] || this.id, this.sid = M.FE.OPTS_MAPPING[r], M.FE.SHARED[this.sid] = M.FE.SHARED[this.sid] || {}, this.shared = M.FE.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = M(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow;
    var o = M(this.o_win).scrollTop();
    this.$oel.on("froala.doInit", M.proxy(function () {
      this.$oel.off("froala.doInit"), this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = M(this.doc), this.$win = M(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(M.FE.PLUGINS)), this.opts.initOnClick ? (this.load(M.FE.MODULES), this.$el.on("touchstart.init", function () {
        M(this).data("touched", !0);
      }), this.$el.on("touchmove.init", function () {
        M(this).removeData("touched");
      }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", M.proxy(function (e) {
        if ("touchend" == e.type && !this.$el.data("touched")) return !0;

        if (1 === e.which || !e.which) {
          this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(M.FE.MODULES), this.load(M.FE.PLUGINS);
          var t = e.originalEvent && e.originalEvent.originalTarget;
          t && "IMG" == t.tagName && M(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" == e.type && this.image && e.originalEvent && e.originalEvent.target && M(e.originalEvent.target).is("img") && setTimeout(M.proxy(function () {
            this.image.edit(M(e.originalEvent.target));
          }, this), 100), this.ready = !0, this.events.trigger("initialized");
        }
      }, this)), this.events.trigger("initializationDelayed")) : (this.load(M.FE.MODULES), this.load(M.FE.PLUGINS), M(this.o_win).scrollTop(o), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"));
    }, this)), this._init();
  };

  s.DEFAULTS = {
    initOnClick: !1,
    pluginsEnabled: null
  }, s.MODULES = {}, s.PLUGINS = {}, s.VERSION = "2.9.1", s.INSTANCES = [], s.OPTS_MAPPING = {}, s.SHARED = {}, s.ID = 0, s.prototype._init = function () {
    var e = this.$oel.prop("tagName");
    1 <= this.$oel.closest("label").length && console.warn("Note! It is not recommended to initialize the Froala Editor within a label tag.");
    var t = M.proxy(function () {
      "TEXTAREA" != e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = M('<iframe src="about:blank" frameBorder="0">'), this.$wp = M("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.$el = this.$iframe.contents().find("body"), this.el = this.$el.get(0), this.$head = this.$iframe.contents().find("head"), this.$html = this.$iframe.contents().find("html"), this.iframe_document = this.$iframe.get(0).contentWindow.document) : (this.$el = M("<div></div>"), this.el = this.$el.get(0), this.$wp = M("<div></div>").append(this.$el), this.$box.html(this.$wp)), this.$oel.trigger("froala.doInit");
    }, this),
        n = M.proxy(function () {
      this.$box = M("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val(), this.$oel.parents("form").on("submit." + this.id, M.proxy(function () {
        this.events.trigger("form.submit");
      }, this)), this.$oel.parents("form").on("reset." + this.id, M.proxy(function () {
        this.events.trigger("form.reset");
      }, this)), t();
    }, this),
        r = M.proxy(function () {
      this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit");
    }, this),
        o = M.proxy(function () {
      this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.trigger("froala.doInit");
    }, this),
        i = M.proxy(function () {
      this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function (e) {
        e.preventDefault();
      }), this.$oel.trigger("froala.doInit");
    }, this);
    this.opts.editInPopup ? i() : "TEXTAREA" == e ? n() : "A" == e ? r() : "IMG" == e ? o() : "BUTTON" == e || "INPUT" == e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, i()) : t();
  }, s.prototype.load = function (e) {
    for (var t in e) if (e.hasOwnProperty(t)) {
      if (this[t]) continue;
      if (M.FE.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
      if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" == t)) return !1;
    }
  }, s.prototype.destroy = function () {
    this.shared.count--, this.events.$off();
    var e = this.html.get();

    if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", undefined, !0), 0 === this.shared.count) {
      for (var t in this.shared) this.shared.hasOwnProperty(t) && (this.shared[t], M.FE.SHARED[this.sid][t] = null);

      delete M.FE.SHARED[this.sid];
    }

    this.$oel.parents("form").off("." + this.id), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core.destroy(e), M.FE.INSTANCES.splice(M.FE.INSTANCES.indexOf(this), 1);
  }, M.fn.froalaEditor = function (o) {
    for (var i = [], e = 0; e < arguments.length; e++) i.push(arguments[e]);

    if ("string" == typeof o) {
      var a = [];
      return this.each(function () {
        var e,
            t,
            n = M(this).data("froala.editor");
        if (!n) return console.warn("Editor should be initialized before calling the " + o + " method.");
        if (0 < o.indexOf(".") && n[o.split(".")[0]] ? (n[o.split(".")[0]] && (e = n[o.split(".")[0]]), t = o.split(".")[1]) : (e = n, t = o.split(".")[0]), !e[t]) return M.error("Method " + o + " does not exist in Froala Editor.");
        var r = e[t].apply(n, i.slice(1));
        r === undefined ? a.push(this) : 0 === a.length && a.push(r);
      }), 1 == a.length ? a[0] : a;
    }

    if ("object" == typeof o || !o) return this.each(function () {
      if (!M(this).data("froala.editor")) {
        new s(this, o);
      }
    });
  }, M.fn.froalaEditor.Constructor = s, M.FroalaEditor = s, M.FE = s, M.FE.XS = 0, M.FE.SM = 1, M.FE.MD = 2, M.FE.LG = 3;
  M.FE.LinkRegExCommon = "[a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_.]{1,}", M.FE.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;/~+#-\\'*-_{}]*)|())", M.FE.LinkRegExTLD = "((" + M.FE.LinkRegExCommon + ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))", M.FE.LinkRegExHTTP = "((ftp|http|https):\\/\\/" + M.FE.LinkRegExCommon + ")", M.FE.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@" + M.FE.LinkRegExCommon + ")", M.FE.LinkRegExWWW = "(www\\." + M.FE.LinkRegExCommon + "\\.[a-z0-9-]{2,24})", M.FE.LinkRegEx = "(" + M.FE.LinkRegExTLD + "|" + M.FE.LinkRegExHTTP + "|" + M.FE.LinkRegExWWW + "|" + M.FE.LinkRegExAuth + ")" + M.FE.LinkRegExEnd, M.FE.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], M.FE.MAIL_REGEX = /.+@.+\..+/i, M.FE.MODULES.helpers = function (i) {
    function e() {
      var e,
          t,
          n = {},
          r = (t = -1, "Microsoft Internet Explorer" == navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t);
      if (0 < r) n.msie = !0;else {
        var o = navigator.userAgent.toLowerCase(),
            i = /(edge)[ \/]([\w.]+)/.exec(o) || /(chrome)[ \/]([\w.]+)/.exec(o) || /(webkit)[ \/]([\w.]+)/.exec(o) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(o) || /(msie) ([\w.]+)/.exec(o) || o.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(o) || [],
            a = i[1] || "";
        i[2];
        i[1] && (n[a] = !0), n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0);
      }
      return n.msie && (n.version = r), n;
    }

    function t() {
      return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !o();
    }

    function n() {
      return /(Android)/g.test(navigator.userAgent) && !o();
    }

    function r() {
      return /(Blackberry)/g.test(navigator.userAgent);
    }

    function o() {
      return /(Windows Phone)/gi.test(navigator.userAgent);
    }

    function a(e) {
      return parseInt(e, 10) || 0;
    }

    var s;
    var l = null;
    return {
      _init: function () {
        i.browser = e(), function () {
          function e(e, t) {
            var i = e[t];

            e[t] = function (e) {
              var t,
                  n = !1,
                  r = !1;

              if (e && e.match(s)) {
                e = e.replace(s, ""), this.parentNode || (a.appendChild(this), r = !0);
                var o = this.parentNode;
                return this.id || (this.id = "rootedQuerySelector_id_" + new Date().getTime(), n = !0), t = i.call(o, "#" + this.id + " " + e), n && (this.id = ""), r && a.removeChild(this), t;
              }

              return i.call(this, e);
            };
          }

          var a = i.o_doc.createElement("div");

          try {
            a.querySelectorAll(":scope *");
          } catch (t) {
            var s = /^\s*:scope/gi;
            e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll");
          }
        }(), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function (e) {
          var t = this;
          if (!t) return null;
          if (!document.documentElement.contains(this)) return null;

          do {
            if (t.matches(e)) return t;
            t = t.parentElement;
          } while (null !== t);

          return null;
        });
      },
      isIOS: t,
      isMac: function () {
        return null == l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l;
      },
      isAndroid: n,
      isBlackberry: r,
      isWindowsPhone: o,
      isMobile: function () {
        return n() || t() || r();
      },
      isEmail: function (e) {
        return !/^(https?:|ftps?:|)\/\//i.test(e) && M.FE.MAIL_REGEX.test(e);
      },
      requestAnimationFrame: function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
          window.setTimeout(e, 1e3 / 60);
        };
      },
      getPX: a,
      screenSize: function () {
        var e = M('<div class="fr-visibility-helper"></div>').appendTo("body:first");

        try {
          var t = a(e.css("margin-left"));
          return e.remove(), t;
        } catch (n) {
          return M.FE.LG;
        }
      },
      isTouch: function () {
        return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
      },
      sanitizeURL: function (e) {
        return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(" + M.FE.LinkProtocols.join("|") + "):\\/\\/", "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}");
      },
      isArray: function (e) {
        return e && !e.propertyIsEnumerable("length") && "object" == typeof e && "number" == typeof e.length;
      },
      RGBToHex: function (e) {
        function t(e) {
          return ("0" + parseInt(e, 10).toString(16)).slice(-2);
        }

        try {
          return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : ("#" + t((e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))[1]) + t(e[2]) + t(e[3])).toUpperCase() : "";
        } catch (n) {
          return null;
        }
      },
      HEXtoRGB: function (e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, r) {
          return t + t + n + n + r + r;
        });
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? "rgb(" + parseInt(t[1], 16) + ", " + parseInt(t[2], 16) + ", " + parseInt(t[3], 16) + ")" : "";
      },
      isURL: function (e) {
        return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^" + M.FE.LinkRegExHTTP + M.FE.LinkRegExEnd + "$", "gi").test(e));
      },
      getAlignment: function (e) {
        var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");

        if (["left", "right", "justify", "center"].indexOf(t) < 0) {
          if (!s) {
            var n = M('<div dir="' + ("rtl" == i.opts.direction ? "rtl" : "auto") + '" style="text-align: ' + i.$el.css("text-align") + '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');
            M("body:first").append(n);
            var r = n.find("#s1").get(0).getBoundingClientRect().left,
                o = n.find("#s2").get(0).getBoundingClientRect().left;
            n.remove(), s = r < o ? "left" : "right";
          }

          t = s;
        }

        return t;
      },
      scrollTop: function () {
        return i.o_win.pageYOffset ? i.o_win.pageYOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollTop ? i.o_doc.documentElement.scrollTop : i.o_doc.body.scrollTop ? i.o_doc.body.scrollTop : 0;
      },
      scrollLeft: function () {
        return i.o_win.pageXOffset ? i.o_win.pageXOffset : i.o_doc.documentElement && i.o_doc.documentElement.scrollLeft ? i.o_doc.documentElement.scrollLeft : i.o_doc.body.scrollLeft ? i.o_doc.body.scrollLeft : 0;
      },
      isInViewPort: function (e) {
        var t = e.getBoundingClientRect();
        return 0 <= t.top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight);
      }
    };
  }, M.FE.MODULES.events = function (s) {
    var e,
        a = {};

    function t(e, t, n) {
      f(e, t, n);
    }

    function n(e) {
      if (void 0 === e && (e = !0), !s.$wp) return !1;
      if (s.helpers.isIOS() && s.$win.get(0).focus(), s.core.hasFocus()) return !1;

      if (!s.core.hasFocus() && e) {
        var t = s.$win.scrollTop();
        if (s.browser.msie && s.$box && s.$box.css("position", "fixed"), s.browser.msie && s.$wp && s.$wp.css("overflow", "visible"), i(), s.$el.focus(), s.events.trigger("focus"), o(), s.browser.msie && s.$box && s.$box.css("position", ""), s.browser.msie && s.$wp && s.$wp.css("overflow", "auto"), t != s.$win.scrollTop() && s.$win.scrollTop(t), !s.selection.info(s.el).atStart) return !1;
      }

      if (!s.core.hasFocus() || 0 < s.$el.find(".fr-marker").length) return !1;

      if (s.selection.info(s.el).atStart && s.selection.isCollapsed() && null != s.html.defaultTag()) {
        var n = s.markers.insert();

        if (n && !s.node.blockParent(n)) {
          M(n).remove();
          var r = s.$el.find(s.html.blockTagsQuery()).get(0);
          r && (M(r).prepend(M.FE.MARKERS), s.selection.restore());
        } else n && M(n).remove();
      }
    }

    var r = !1;

    function o() {
      e = !0;
    }

    function i() {
      e = !1;
    }

    function l() {
      return e;
    }

    function d(e, t, n) {
      var r,
          o = e.split(" ");

      if (1 < o.length) {
        for (var i = 0; i < o.length; i++) d(o[i], t, n);

        return !0;
      }

      void 0 === n && (n = !1), r = 0 !== e.indexOf("shared.") ? a[e] = a[e] || [] : s.shared._events[e] = s.shared._events[e] || [], n ? r.unshift(t) : r.push(t);
    }

    var c = [];

    function f(e, t, n, r, o) {
      "function" == typeof n && (o = r, r = n, n = !1);
      var i = o ? s.shared.$_events : c,
          a = o ? s.sid : s.id;
      n ? e.on(t.split(" ").join(".ed" + a + " ") + ".ed" + a, n, r) : e.on(t.split(" ").join(".ed" + a + " ") + ".ed" + a, r), i.push([e, t.split(" ").join(".ed" + a + " ") + ".ed" + a]);
    }

    function p(e) {
      for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1]);
    }

    function u(e, t, n) {
      if (!s.edit.isDisabled() || n) {
        var r, o;
        if (0 !== e.indexOf("shared.")) r = a[e];else {
          if (0 < s.shared.count) return !1;
          r = s.shared._events[e];
        }
        if (r) for (var i = 0; i < r.length; i++) if (!1 === (o = r[i].apply(s, t))) return !1;
        return !1 !== (o = s.$oel.triggerHandler("froalaEditor." + e, M.merge([s], t || []))) && o;
      }
    }

    function g() {
      for (var e in a) a.hasOwnProperty(e) && delete a[e];
    }

    function h() {
      for (var e in s.shared._events) s.shared._events.hasOwnProperty(e) && delete s.shared._events[e];
    }

    return {
      _init: function () {
        s.shared.$_events = s.shared.$_events || [], s.shared._events = {}, s.helpers.isMobile() ? (s._mousedown = "touchstart", s._mouseup = "touchend", s._move = "touchmove", s._mousemove = "touchmove") : (s._mousedown = "mousedown", s._mouseup = "mouseup", s._move = "", s._mousemove = "mousemove"), t(s.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function (e) {
          u(e.type, [e]);
        }), d("mousedown", function () {
          for (var e = 0; e < M.FE.INSTANCES.length; e++) M.FE.INSTANCES[e] != s && M.FE.INSTANCES[e].popups && M.FE.INSTANCES[e].popups.areVisible() && M.FE.INSTANCES[e].$el.find(".fr-marker").remove();
        }), t(s.$win, s._mousedown, function (e) {
          u("window.mousedown", [e]), o();
        }), t(s.$win, s._mouseup, function (e) {
          u("window.mouseup", [e]);
        }), t(s.$win, "cut copy keydown keyup touchmove touchend", function (e) {
          u("window." + e.type, [e]);
        }), t(s.$doc, "dragend drop", function (e) {
          u("document." + e.type, [e]);
        }), t(s.$el, "keydown keypress keyup input", function (e) {
          u(e.type, [e]);
        }), t(s.$el, "focus", function (e) {
          l() && (n(!1), !1 === r && u(e.type, [e]));
        }), t(s.$el, "blur", function (e) {
          l() && !0 === r && (u(e.type, [e]), o());
        }), d("focus", function () {
          r = !0;
        }), d("blur", function () {
          r = !1;
        }), o(), t(s.$el, "cut copy paste beforepaste", function (e) {
          u(e.type, [e]);
        }), d("destroy", g), d("shared.destroy", h);
      },
      on: d,
      trigger: u,
      bindClick: function (e, t, n) {
        f(e, s._mousedown, t, function (e) {
          var t, n;
          s.edit.isDisabled() || (n = M((t = e).currentTarget), s.edit.isDisabled() || s.node.hasClass(n.get(0), "fr-disabled") ? t.preventDefault() : "mousedown" === t.type && 1 !== t.which || (s.helpers.isMobile() || t.preventDefault(), (s.helpers.isAndroid() || s.helpers.isWindowsPhone()) && 0 === n.parents(".fr-dropdown-menu").length && (t.preventDefault(), t.stopPropagation()), n.addClass("fr-selected"), s.events.trigger("commands.mousedown", [n])));
        }, !0), f(e, s._mouseup + " " + s._move, t, function (e) {
          s.edit.isDisabled() || function (e, t) {
            var n = M(e.currentTarget);
            if (s.edit.isDisabled() || s.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault();
            if (("mouseup" !== e.type || 1 === e.which) && s.node.hasClass(n.get(0), "fr-selected")) if ("touchmove" != e.type) {
              if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !s.node.hasClass(n.get(0), "fr-selected")) return s.button.getButtons(".fr-selected", !0).removeClass("fr-selected");
              if (s.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging");
              var r = n.data("timeout");
              r && (clearTimeout(r), n.removeData("timeout")), t.apply(s, [e]);
            } else n.data("timeout") || n.data("timeout", setTimeout(function () {
              n.data("dragging", !0);
            }, 100));
          }(e, n);
        }, !0), f(e, "mousedown click mouseup", t, function (e) {
          s.edit.isDisabled() || e.stopPropagation();
        }, !0), d("window.mouseup", function () {
          s.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), o());
        }), f(e, "mouseenter", t, function () {
          M(this).hasClass("fr-options") && M(this).prev(".fr-btn").addClass("fr-btn-hover"), M(this).next(".fr-btn").hasClass("fr-options") && M(this).next(".fr-btn").addClass("fr-btn-hover");
        }), f(e, "mouseleave", t, function () {
          M(this).hasClass("fr-options") && M(this).prev(".fr-btn").removeClass("fr-btn-hover"), M(this).next(".fr-btn").hasClass("fr-options") && M(this).next(".fr-btn").removeClass("fr-btn-hover");
        });
      },
      disableBlur: i,
      enableBlur: o,
      blurActive: l,
      focus: n,
      chainTrigger: function (e, t, n) {
        if (!s.edit.isDisabled() || n) {
          var r, o;
          if (0 !== e.indexOf("shared.")) r = a[e];else {
            if (0 < s.shared.count) return !1;
            r = s.shared._events[e];
          }
          if (r) for (var i = 0; i < r.length; i++) void 0 !== (o = r[i].apply(s, [t])) && (t = o);
          return void 0 !== (o = s.$oel.triggerHandler("froalaEditor." + e, M.merge([s], [t]))) && (t = o), t;
        }
      },
      $on: f,
      $off: function () {
        p(c), c = [], 0 === s.shared.count && (p(s.shared.$_events), s.shared.$_events = []);
      }
    };
  }, M.FE.MODULES.node = function (a) {
    function s(e) {
      return e && "IFRAME" != e.tagName ? Array.prototype.slice.call(e.childNodes || []) : [];
    }

    function l(e) {
      return !!e && e.nodeType == Node.ELEMENT_NODE && 0 <= M.FE.BLOCK_TAGS.indexOf(e.tagName.toLowerCase());
    }

    function d(e) {
      var t = {},
          n = e.attributes;
      if (n) for (var r = 0; r < n.length; r++) {
        var o = n[r];
        t[o.nodeName] = o.value;
      }
      return t;
    }

    function t(e) {
      for (var t = "", n = d(e), r = Object.keys(n).sort(), o = 0; o < r.length; o++) {
        var i = r[o],
            a = n[i];
        a.indexOf("'") < 0 && 0 <= a.indexOf('"') ? t += " " + i + "='" + a + "'" : 0 <= a.indexOf('"') && 0 <= a.indexOf("'") ? t += " " + i + '="' + (a = a.replace(/"/g, "&quot;")) + '"' : t += " " + i + '="' + a + '"';
      }

      return t;
    }

    function n(e) {
      return e === a.el;
    }

    return {
      isBlock: l,
      isEmpty: function (e, t) {
        if (!e) return !0;
        if (e.querySelector("table")) return !1;
        var n = s(e);
        1 == n.length && l(n[0]) && (n = s(n[0]));

        for (var r = !1, o = 0; o < n.length; o++) {
          var i = n[o];

          if (!(t && a.node.hasClass(i, "fr-marker") || i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length)) {
            if ("BR" != i.tagName && 0 < (i.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
            if (r) return !1;
            "BR" == i.tagName && (r = !0);
          }
        }

        return !(e.querySelectorAll(M.FE.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector(a.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || 1 < e.querySelectorAll(M.FE.BLOCK_TAGS.join(",")).length || e.querySelector(a.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)"));
      },
      blockParent: function (e) {
        for (; e && e.parentNode !== a.el && (!e.parentNode || !a.node.hasClass(e.parentNode, "fr-inner"));) if (l(e = e.parentNode)) return e;

        return null;
      },
      deepestParent: function (e, t, n) {
        if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(a.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && a.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= M.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null;

        for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !a.node.hasClass(e.parentNode, "fr-inner") && (M.FE.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode;

        return e;
      },
      rawAttributes: d,
      attributes: t,
      clearAttributes: function (e) {
        for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
          var r = t[n];
          e.removeAttribute(r.nodeName);
        }
      },
      openTagString: function (e) {
        return "<" + e.tagName.toLowerCase() + t(e) + ">";
      },
      closeTagString: function (e) {
        return "</" + e.tagName.toLowerCase() + ">";
      },
      isFirstSibling: function e(t, n) {
        void 0 === n && (n = !0);

        for (var r = t.previousSibling; r && n && a.node.hasClass(r, "fr-marker");) r = r.previousSibling;

        return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r);
      },
      isLastSibling: function e(t, n) {
        void 0 === n && (n = !0);

        for (var r = t.nextSibling; r && n && a.node.hasClass(r, "fr-marker");) r = r.nextSibling;

        return !r || r.nodeType == Node.TEXT_NODE && "" === r.textContent && e(r);
      },
      isList: function (e) {
        return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName);
      },
      isLink: function (e) {
        return !!e && e.nodeType == Node.ELEMENT_NODE && "a" == e.tagName.toLowerCase();
      },
      isElement: n,
      contents: s,
      isVoid: function (e) {
        return e && e.nodeType == Node.ELEMENT_NODE && 0 <= M.FE.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase());
      },
      hasFocus: function (e) {
        return e === a.doc.activeElement && (!a.doc.hasFocus || a.doc.hasFocus()) && !!(n(e) || e.type || e.href || ~e.tabIndex);
      },
      isEditable: function (e) {
        return (!e.getAttribute || "false" != e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0;
      },
      isDeletable: function (e) {
        return e && e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable");
      },
      hasClass: function (e, t) {
        return e instanceof M && (e = e.get(0)), e && e.classList && e.classList.contains(t);
      },
      filter: function (e) {
        return a.browser.msie ? e : {
          acceptNode: e
        };
      }
    };
  }, M.FE.INVISIBLE_SPACE = "&#8203;", M.FE.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">' + M.FE.INVISIBLE_SPACE + "</span>", M.FE.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">' + M.FE.INVISIBLE_SPACE + "</span>", M.FE.MARKERS = M.FE.START_MARKER + M.FE.END_MARKER, M.FE.MODULES.markers = function (d) {
    function l() {
      if (!d.$wp) return null;

      try {
        var e = d.selection.ranges(0),
            t = e.commonAncestorContainer;
        if (t != d.el && 0 === d.$el.find(t).length) return null;
        var n = e.cloneRange(),
            r = e.cloneRange();
        n.collapse(!0);
        var o = M('<span class="fr-marker" style="display: none; line-height: 0;">' + M.FE.INVISIBLE_SPACE + "</span>", d.doc)[0];

        if (n.insertNode(o), o = d.$el.find("span.fr-marker").get(0)) {
          for (var i = o.nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) M(i).remove(), i = d.$el.find("span.fr-marker").get(0).nextSibling;

          return d.selection.clear(), d.selection.get().addRange(r), o;
        }

        return null;
      } catch (a) {
        console.warn("MARKER", a);
      }
    }

    function c() {
      d.$el.find(".fr-marker").remove();
    }

    return {
      place: function (e, t, n) {
        var r, o, i;

        try {
          var a = e.cloneRange();
          if (a.collapse(t), a.insertNode(M('<span class="fr-marker" data-id="' + n + '" data-type="' + t + '" style="display: ' + (d.browser.safari ? "none" : "inline-block") + '; line-height: 0;">' + M.FE.INVISIBLE_SPACE + "</span>", d.doc)[0]), !0 === t) for (i = (r = d.$el.find('span.fr-marker[data-type="true"][data-id="' + n + '"]').get(0)).nextSibling; i && i.nodeType === Node.TEXT_NODE && 0 === i.textContent.length;) M(i).remove(), i = r.nextSibling;

          if (!0 === t && !e.collapsed) {
            for (; !d.node.isElement(r.parentNode) && !i;) M(r.parentNode).after(r), i = r.nextSibling;

            if (i && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
              for (o = [i]; i = o[0], (o = d.node.contents(i))[0] && d.node.isBlock(o[0]););

              M(i).prepend(M(r));
            }
          }

          if (!1 === t && !e.collapsed) {
            if ((i = (r = d.$el.find('span.fr-marker[data-type="false"][data-id="' + n + '"]').get(0)).previousSibling) && i.nodeType === Node.ELEMENT_NODE && d.node.isBlock(i) && "HR" !== i.tagName) {
              for (o = [i]; i = o[o.length - 1], (o = d.node.contents(i))[o.length - 1] && d.node.isBlock(o[o.length - 1]););

              M(i).append(M(r));
            }

            r.parentNode && 0 <= ["TD", "TH"].indexOf(r.parentNode.tagName) && r.parentNode.previousSibling && !r.previousSibling && M(r.parentNode.previousSibling).append(r);
          }

          var s = d.$el.find('span.fr-marker[data-type="' + t + '"][data-id="' + n + '"]').get(0);
          return s && (s.style.display = "none"), s;
        } catch (l) {
          return null;
        }
      },
      insert: l,
      split: function () {
        d.selection.isCollapsed() || d.selection.remove();
        var e = d.$el.find(".fr-marker").get(0);
        if (null == e && (e = l()), null == e) return null;
        var t = d.node.deepestParent(e);
        if (t || (t = d.node.blockParent(e)) && "LI" != t.tagName && (t = null), t) if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" != t.tagName || t.parentNode.firstElementChild != t || d.node.isEmpty(t.parentNode) ? M(t).replaceWith('<span class="fr-marker"></span>') : M(t).append('<span class="fr-marker"></span>');else if (d.cursor.isAtStart(e, t)) M(t).before('<span class="fr-marker"></span>'), M(e).remove();else if (d.cursor.isAtEnd(e, t)) M(t).after('<span class="fr-marker"></span>'), M(e).remove();else {
          for (var n = e, r = "", o = ""; n = n.parentNode, r += d.node.closeTagString(n), o = d.node.openTagString(n) + o, n != t;);

          M(e).replaceWith('<span id="fr-break"></span>');
          var i = d.node.openTagString(t) + M(t).html() + d.node.closeTagString(t);
          i = i.replace(/<span id="fr-break"><\/span>/g, r + '<span class="fr-marker"></span>' + o), M(t).replaceWith(i);
        }
        return d.$el.find(".fr-marker").get(0);
      },
      insertAtPoint: function (e) {
        var t,
            n = e.clientX,
            r = e.clientY;
        c();
        var o = null;

        if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, r), (o = d.doc.createRange()).setStart(t.offsetNode, t.offset), o.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, r), (o = d.doc.createRange()).setStart(t.startContainer, t.startOffset), o.setEnd(t.startContainer, t.startOffset)), null !== o && "undefined" != typeof d.win.getSelection) {
          var i = d.win.getSelection();
          i.removeAllRanges(), i.addRange(o);
        } else if ("undefined" != typeof d.doc.body.createTextRange) try {
          (o = d.doc.body.createTextRange()).moveToPoint(n, r);
          var a = o.duplicate();
          a.moveToPoint(n, r), o.setEndPoint("EndToEnd", a), o.select();
        } catch (s) {
          return !1;
        }

        l();
      },
      remove: c
    };
  }, M.FE.MODULES.selection = function (S) {
    function s() {
      var e = "";
      return S.win.getSelection ? e = S.win.getSelection() : S.doc.getSelection ? e = S.doc.getSelection() : S.doc.selection && (e = S.doc.selection.createRange().text), e.toString();
    }

    function T() {
      return S.win.getSelection ? S.win.getSelection() : S.doc.getSelection ? S.doc.getSelection() : S.doc.selection.createRange();
    }

    function c(e) {
      var t = T(),
          n = [];

      if (t && t.getRangeAt && t.rangeCount) {
        n = [];

        for (var r = 0; r < t.rangeCount; r++) n.push(t.getRangeAt(r));
      } else n = S.doc.createRange ? [S.doc.createRange()] : [];

      return void 0 !== e ? n[e] : n;
    }

    function y() {
      var e = T();

      try {
        e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear();
      } catch (t) {}
    }

    function f(e, t) {
      var n = e;
      return n.nodeType == Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType == Node.TEXT_NODE && (n = n.parentNode), n;
    }

    function N() {
      if (S.$wp) {
        S.markers.remove();
        var e,
            t,
            n = c(),
            r = [];

        for (t = 0; t < n.length; t++) if (n[t].startContainer !== S.doc || S.browser.msie) {
          var o = (e = n[t]).collapsed,
              i = S.markers.place(e, !0, t),
              a = S.markers.place(e, !1, t);
          if (void 0 !== i && i || !o || (M(".fr-marker").remove(), S.selection.setAtEnd(S.el)), S.el.normalize(), S.browser.safari && !o) try {
            (e = S.doc.createRange()).setStartAfter(i), e.setEndBefore(a), r.push(e);
          } catch (s) {}
        }

        if (S.browser.safari && r.length) for (S.selection.clear(), t = 0; t < r.length; t++) S.selection.get().addRange(r[t]);
      }
    }

    function C() {
      var e,
          t = S.el.querySelectorAll('.fr-marker[data-type="true"]');
      if (!S.$wp) return S.markers.remove(), !1;
      if (0 === t.length) return !1;
      if (S.browser.msie || S.browser.edge) for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
      S.core.hasFocus() || S.browser.msie || S.browser.webkit || S.$el.focus(), y();
      var n = T();

      for (e = 0; e < t.length; e++) {
        var r = M(t[e]).data("id"),
            o = t[e],
            i = S.doc.createRange(),
            a = S.$el.find('.fr-marker[data-type="false"][data-id="' + r + '"]');
        (S.browser.msie || S.browser.edge) && a.css("display", "inline-block");
        var s = null;

        if (0 < a.length) {
          a = a[0];

          try {
            for (var l, d = !1, c = o.nextSibling; c && c.nodeType == Node.TEXT_NODE && 0 === c.textContent.length;) c = (l = c).nextSibling, M(l).remove();

            for (var f, p, u = a.nextSibling; u && u.nodeType == Node.TEXT_NODE && 0 === u.textContent.length;) u = (l = u).nextSibling, M(l).remove();

            if (o.nextSibling == a || a.nextSibling == o) {
              for (var g = o.nextSibling == a ? o : a, h = g == o ? a : o, m = g.previousSibling; m && m.nodeType == Node.TEXT_NODE && 0 === m.length;) m = (l = m).previousSibling, M(l).remove();

              if (m && m.nodeType == Node.TEXT_NODE) for (; m && m.previousSibling && m.previousSibling.nodeType == Node.TEXT_NODE;) m.previousSibling.textContent = m.previousSibling.textContent + m.textContent, m = m.previousSibling, M(m.nextSibling).remove();

              for (var E = h.nextSibling; E && E.nodeType == Node.TEXT_NODE && 0 === E.length;) E = (l = E).nextSibling, M(l).remove();

              if (E && E.nodeType == Node.TEXT_NODE) for (; E && E.nextSibling && E.nextSibling.nodeType == Node.TEXT_NODE;) E.nextSibling.textContent = E.textContent + E.nextSibling.textContent, E = E.nextSibling, M(E.previousSibling).remove();

              if (m && (S.node.isVoid(m) || S.node.isBlock(m)) && (m = null), E && (S.node.isVoid(E) || S.node.isBlock(E)) && (E = null), m && E && m.nodeType == Node.TEXT_NODE && E.nodeType == Node.TEXT_NODE) {
                M(o).remove(), M(a).remove();
                var v = m.textContent.length;
                m.textContent = m.textContent + E.textContent, M(E).remove(), S.opts.htmlUntouched || S.spaces.normalize(m), i.setStart(m, v), i.setEnd(m, v), d = !0;
              } else !m && E && E.nodeType == Node.TEXT_NODE ? (M(o).remove(), M(a).remove(), S.opts.htmlUntouched || S.spaces.normalize(E), s = M(S.doc.createTextNode("\u200b")), M(E).before(s), i.setStart(E, 0), i.setEnd(E, 0), d = !0) : !E && m && m.nodeType == Node.TEXT_NODE && (M(o).remove(), M(a).remove(), S.opts.htmlUntouched || S.spaces.normalize(m), s = M(S.doc.createTextNode("\u200b")), M(m).after(s), i.setStart(m, m.textContent.length), i.setEnd(m, m.textContent.length), d = !0);
            }

            if (!d) (S.browser.chrome || S.browser.edge) && o.nextSibling == a ? (f = A(a, i, !0) || i.setStartAfter(a), p = A(o, i, !1) || i.setEndBefore(o)) : (o.previousSibling == a && (a = (o = a).nextSibling), a.nextSibling && "BR" === a.nextSibling.tagName || !a.nextSibling && S.node.isBlock(o.previousSibling) || o.previousSibling && "BR" == o.previousSibling.tagName || (o.style.display = "inline", a.style.display = "inline", s = M(S.doc.createTextNode("\u200b"))), f = A(o, i, !0) || M(o).before(s) && i.setStartBefore(o), p = A(a, i, !1) || M(a).after(s) && i.setEndAfter(a)), "function" == typeof f && f(), "function" == typeof p && p();
          } catch (b) {
            console.warn("RESTORE RANGE", b);
          }
        }

        s && s.remove();

        try {
          n.addRange(i);
        } catch (b) {
          console.warn("ADD RANGE", b);
        }
      }

      S.markers.remove();
    }

    function A(e, t, n) {
      var r,
          o = e.previousSibling,
          i = e.nextSibling;
      return o && i && o.nodeType == Node.TEXT_NODE && i.nodeType == Node.TEXT_NODE ? (r = o.textContent.length, n ? (i.textContent = o.textContent + i.textContent, M(o).remove(), M(e).remove(), S.opts.htmlUntouched || S.spaces.normalize(i), function () {
        t.setStart(i, r);
      }) : (o.textContent = o.textContent + i.textContent, M(i).remove(), M(e).remove(), S.opts.htmlUntouched || S.spaces.normalize(o), function () {
        t.setEnd(o, r);
      })) : o && !i && o.nodeType == Node.TEXT_NODE ? (r = o.textContent.length, n ? (S.opts.htmlUntouched || S.spaces.normalize(o), function () {
        t.setStart(o, r);
      }) : (S.opts.htmlUntouched || S.spaces.normalize(o), function () {
        t.setEnd(o, r);
      })) : !(!i || o || i.nodeType != Node.TEXT_NODE) && (n ? (S.opts.htmlUntouched || S.spaces.normalize(i), function () {
        t.setStart(i, 0);
      }) : (S.opts.htmlUntouched || S.spaces.normalize(i), function () {
        t.setEnd(i, 0);
      }));
    }

    function x() {
      for (var e = c(), t = 0; t < e.length; t++) if (!e[t].collapsed) return !1;

      return !0;
    }

    function o(e) {
      var t,
          n,
          r = !1,
          o = !1;

      if (S.win.getSelection) {
        var i = S.win.getSelection();
        i.rangeCount && ((n = (t = i.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), r = "" === n.toString(), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), o = "" === n.toString());
      } else S.doc.selection && "Control" != S.doc.selection.type && ((n = (t = S.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), r = "" === n.text, n.moveToElementText(e), n.setEndPoint("StartToEnd", t), o = "" === n.text);

      return {
        atStart: r,
        atEnd: o
      };
    }

    function $(e, t) {
      void 0 === t && (t = !0);
      var n = M(e).html();
      n && n.replace(/\u200b/g, "").length != n.length && M(e).html(n.replace(/\u200b/g, ""));

      for (var r = S.node.contents(e), o = 0; o < r.length; o++) r[o].nodeType != Node.ELEMENT_NODE ? M(r[o]).remove() : ($(r[o], 0 === o), 0 === o && (t = !1));

      e.nodeType == Node.TEXT_NODE ? M(e).replaceWith('<span data-first="true" data-text="true"></span>') : t && M(e).attr("data-first", !0);
    }

    function O() {
      return 0 === M(this).find("fr-inner").length;
    }

    function p() {
      try {
        if (!S.$wp) return !1;

        for (var e = c(0).commonAncestorContainer; e && !S.node.isElement(e);) e = e.parentNode;

        return !!S.node.isElement(e);
      } catch (t) {
        return !1;
      }
    }

    function r(e, t) {
      if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;

      for (var n = e.firstChild; n && (S.node.isBlock(n) || t && !S.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).firstChild;

      e.innerHTML = M.FE.MARKERS + e.innerHTML;
    }

    function i(e, t) {
      if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;

      for (var n = e.lastChild; n && (S.node.isBlock(n) || t && !S.node.isVoid(n) && n.nodeType == Node.ELEMENT_NODE);) n = (e = n).lastChild;

      var r = S.doc.createElement("SPAN");
      r.setAttribute("id", "fr-sel-markers"), r.innerHTML = M.FE.MARKERS, e.appendChild(r);
      var o = e.querySelector("#fr-sel-markers");
      o.outerHTML = o.innerHTML;
    }

    return {
      text: s,
      get: T,
      ranges: c,
      clear: y,
      element: function () {
        var e = T();

        try {
          if (e.rangeCount) {
            var t,
                n = c(0),
                r = n.startContainer;

            if (r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length && r.nextSibling && (r = r.nextSibling), r.nodeType == Node.ELEMENT_NODE) {
              var o = !1;

              if (0 < r.childNodes.length && r.childNodes[n.startOffset]) {
                for (t = r.childNodes[n.startOffset]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;

                if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 1 < r.childNodes.length && 0 < n.startOffset && r.childNodes[n.startOffset - 1]) {
                  for (t = r.childNodes[n.startOffset - 1]; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;

                  t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0);
                }
              } else !n.collapsed && r.nextSibling && r.nextSibling.nodeType == Node.ELEMENT_NODE && (t = r.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0);

              !o && 0 < r.childNodes.length && M(r.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(r.childNodes[0].tagName) < 0 && (r = r.childNodes[0]);
            }

            for (; r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;

            for (var i = r; i && "HTML" != i.tagName;) {
              if (i == S.el) return r;
              i = M(i).parent()[0];
            }
          }
        } catch (a) {}

        return S.el;
      },
      endElement: function () {
        var e = T();

        try {
          if (e.rangeCount) {
            var t,
                n = c(0),
                r = n.endContainer;

            if (r.nodeType == Node.ELEMENT_NODE) {
              var o = !1;
              0 < r.childNodes.length && r.childNodes[n.endOffset] && M(r.childNodes[n.endOffset]).text() === s() ? (r = r.childNodes[n.endOffset], o = !0) : !n.collapsed && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE ? (t = r.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0) : !n.collapsed && 0 < r.childNodes.length && r.childNodes[n.endOffset] && (t = r.childNodes[n.endOffset].previousSibling).nodeType == Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (r = t, o = !0), !o && 0 < r.childNodes.length && M(r.childNodes[r.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(r.childNodes[r.childNodes.length - 1].tagName) < 0 && (r = r.childNodes[r.childNodes.length - 1]);
            }

            for (r.nodeType == Node.TEXT_NODE && 0 === n.endOffset && r.previousSibling && r.previousSibling.nodeType == Node.ELEMENT_NODE && (r = r.previousSibling); r.nodeType != Node.ELEMENT_NODE && r.parentNode;) r = r.parentNode;

            for (var i = r; i && "HTML" != i.tagName;) {
              if (i == S.el) return r;
              i = M(i).parent()[0];
            }
          }
        } catch (a) {}

        return S.el;
      },
      save: N,
      restore: C,
      isCollapsed: x,
      isFull: function () {
        if (x()) return !1;
        S.selection.save();
        var e,
            t = S.el.querySelectorAll("td, th, img, br");

        for (e = 0; e < t.length; e++) t[e].nextSibling && (t[e].innerHTML = '<span class="fr-mk">' + M.FE.INVISIBLE_SPACE + "</span>" + t[e].innerHTML);

        var n = !1,
            r = o(S.el);

        for (r.atStart && r.atEnd && (n = !0), t = S.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);

        return S.selection.restore(), n;
      },
      inEditor: p,
      remove: function () {
        if (x()) return !0;
        var t;
        N();

        var n = function (e) {
          for (var t = e.previousSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
            var n = t;
            t = t.previousSibling, M(n).remove();
          }

          return t;
        },
            r = function (e) {
          for (var t = e.nextSibling; t && t.nodeType == Node.TEXT_NODE && 0 === t.textContent.length;) {
            var n = t;
            t = t.nextSibling, M(n).remove();
          }

          return t;
        },
            o = S.$el.find('.fr-marker[data-type="true"]');

        for (t = 0; t < o.length; t++) for (var i = o[t]; !(n(i) || S.node.isBlock(i.parentNode) || S.$el.is(i.parentNode) || S.node.hasClass(i.parentNode, "fr-inner"));) M(i.parentNode).before(i);

        var a = S.$el.find('.fr-marker[data-type="false"]');

        for (t = 0; t < a.length; t++) {
          for (var s = a[t]; !(r(s) || S.node.isBlock(s.parentNode) || S.$el.is(s.parentNode) || S.node.hasClass(s.parentNode, "fr-inner"));) M(s.parentNode).after(s);

          s.parentNode && S.node.isBlock(s.parentNode) && S.node.isEmpty(s.parentNode) && !S.$el.is(s.parentNode) && !S.node.hasClass(s.parentNode, "fr-inner") && S.opts.keepFormatOnDelete && M(s.parentNode).after(s);
        }

        if (function () {
          for (var e = S.$el.find(".fr-marker"), t = 0; t < e.length; t++) if (M(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;

          return !0;
        }()) {
          !function e(t, n) {
            var r = S.node.contents(t.get(0));
            0 <= ["TD", "TH"].indexOf(t.get(0).tagName) && 1 == t.find(".fr-marker").length && S.node.hasClass(r[0], "fr-marker") && t.attr("data-del-cell", !0);

            for (var o = 0; o < r.length; o++) {
              var i = r[o];
              S.node.hasClass(i, "fr-marker") ? n = (n + 1) % 2 : n ? 0 < M(i).find(".fr-marker").length ? n = e(M(i), n) : ["TD", "TH"].indexOf(i.tagName) < 0 && !S.node.hasClass(i, "fr-inner") ? !S.opts.keepFormatOnDelete || 0 < S.$el.find("[data-first]").length || S.node.isVoid(i) ? M(i).remove() : $(i) : S.node.hasClass(i, "fr-inner") ? 0 === M(i).find(".fr-inner").length ? M(i).html("<br>") : M(i).find(".fr-inner").filter(O).html("<br>") : (M(i).empty(), M(i).attr("data-del-cell", !0)) : 0 < M(i).find(".fr-marker").length && (n = e(M(i), n));
            }

            return n;
          }(S.$el, 0);
          var l = S.$el.find('[data-first="true"]');
          if (l.length) S.$el.find(".fr-marker").remove(), l.append(M.FE.INVISIBLE_SPACE + M.FE.MARKERS).removeAttr("data-first"), l.attr("data-text") && l.replaceWith(l.html());else for (S.$el.find("table").filter(function () {
            return 0 < M(this).find("[data-del-cell]").length && M(this).find("[data-del-cell]").length == M(this).find("td, th").length;
          }).remove(), S.$el.find("[data-del-cell]").removeAttr("data-del-cell"), o = S.$el.find('.fr-marker[data-type="true"]'), t = 0; t < o.length; t++) {
            var d = o[t],
                c = d.nextSibling,
                f = S.$el.find('.fr-marker[data-type="false"][data-id="' + M(d).data("id") + '"]').get(0);

            if (f) {
              if (d && (!c || c != f)) {
                var p = S.node.blockParent(d),
                    u = S.node.blockParent(f),
                    g = !1,
                    h = !1;
                if (p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (g = !(p = null)), u && 0 <= ["UL", "OL"].indexOf(u.tagName) && (h = !(u = null)), M(d).after(f), p != u) if (null != p || g) {
                  if (null != u || h || 0 !== M(p).parentsUntil(S.$el, "table").length) p && u && 0 === M(p).parentsUntil(S.$el, "table").length && 0 === M(u).parentsUntil(S.$el, "table").length && 0 === M(p).find(u).length && 0 === M(u).find(p).length && (M(p).append(M(u).html()), M(u).remove());else {
                    for (c = p; !c.nextSibling && c.parentNode != S.el;) c = c.parentNode;

                    for (c = c.nextSibling; c && "BR" != c.tagName;) {
                      var m = c.nextSibling;
                      M(p).append(c), c = m;
                    }

                    c && "BR" == c.tagName && M(c).remove();
                  }
                } else {
                  var E = S.node.deepestParent(d);
                  E ? (M(E).after(M(u).html()), M(u).remove()) : 0 === M(u).parentsUntil(S.$el, "table").length && (M(d).next().after(M(u).html()), M(u).remove());
                }
              }
            } else f = M(d).clone().attr("data-type", !1), M(d).after(f);
          }
        }

        S.$el.find("li:empty").remove(), S.opts.keepFormatOnDelete || S.html.fillEmptyBlocks(), S.html.cleanEmptyTags(!0), S.opts.htmlUntouched || (S.clean.lists(), S.$el.find("li:empty").append("<br>"), S.spaces.normalize());
        var v = S.$el.find(".fr-marker:last").get(0),
            b = S.$el.find(".fr-marker:first").get(0);
        void 0 !== v && void 0 !== b && !v.nextSibling && b.previousSibling && "BR" == b.previousSibling.tagName && S.node.isElement(v.parentNode) && S.node.isElement(b.parentNode) && S.$el.append("<br>"), C();
      },
      blocks: function () {
        var e,
            t = [],
            n = T();

        if (p() && n.rangeCount) {
          var r = c();

          for (e = 0; e < r.length; e++) {
            var o,
                i = r[e],
                a = f(i.startContainer, i.startOffset),
                s = f(i.endContainer, i.endOffset);
            (S.node.isBlock(a) || S.node.hasClass(a, "fr-inner")) && t.indexOf(a) < 0 && t.push(a), (o = S.node.blockParent(a)) && t.indexOf(o) < 0 && t.push(o);

            for (var l = [], d = a; d !== s && d !== S.el;) l.indexOf(d) < 0 && d.children && d.children.length ? (l.push(d), d = d.children[0]) : d.nextSibling ? d = d.nextSibling : d.parentNode && (d = d.parentNode, l.push(d)), S.node.isBlock(d) && l.indexOf(d) < 0 && t.indexOf(d) < 0 && (d !== s || 0 < i.endOffset) && t.push(d);

            S.node.isBlock(s) && t.indexOf(s) < 0 && 0 < i.endOffset && t.push(s), (o = S.node.blockParent(s)) && t.indexOf(o) < 0 && t.push(o);
          }
        }

        for (e = t.length - 1; 0 < e; e--) M(t[e]).find(t).length && t.splice(e, 1);

        return t;
      },
      info: o,
      setAtEnd: i,
      setAtStart: r,
      setBefore: function (e, t) {
        void 0 === t && (t = !0);

        for (var n = e.previousSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling;

        return n ? (S.node.isBlock(n) ? i(n) : "BR" == n.tagName ? M(n).before(M.FE.MARKERS) : M(n).after(M.FE.MARKERS), !0) : !!t && (S.node.isBlock(e) ? r(e) : M(e).before(M.FE.MARKERS), !0);
      },
      setAfter: function (e, t) {
        void 0 === t && (t = !0);

        for (var n = e.nextSibling; n && n.nodeType == Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling;

        return n ? (S.node.isBlock(n) ? r(n) : M(n).before(M.FE.MARKERS), !0) : !!t && (S.node.isBlock(e) ? i(e) : M(e).after(M.FE.MARKERS), !0);
      },
      rangeElement: f
    };
  }, M.extend(M.FE.DEFAULTS, {
    htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
    htmlRemoveTags: ["script", "style"],
    htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
    htmlAllowedStyleProps: [".*"],
    htmlAllowComments: !0,
    htmlUntouched: !1,
    fullPage: !1
  }), M.FE.HTML5Map = {
    B: "STRONG",
    I: "EM",
    STRIKE: "S"
  }, M.FE.MODULES.clean = function (c) {
    var f, p, u, g;

    function o(e) {
      if (e.nodeType == Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
      var t,
          n = c.node.contents(e),
          r = [];

      for (t = 0; t < n.length; t++) n[t].nodeType != Node.ELEMENT_NODE || c.node.isVoid(n[t]) ? n[t].nodeType == Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length != n[t].textContent.length && o(n[t]);

      if (e.nodeType == Node.ELEMENT_NODE && !c.node.isVoid(e) && (e.normalize(), n = c.node.contents(e), r = e.querySelectorAll(".fr-marker"), n.length - r.length == 0)) {
        for (t = 0; t < n.length; t++) if (n[t].nodeType == Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;

        for (t = 0; t < r.length; t++) e.parentNode.insertBefore(r[t].cloneNode(!0), e);

        return e.parentNode.removeChild(e), !1;
      }
    }

    function s(e, t) {
      if (e.nodeType == Node.COMMENT_NODE) return "\x3c!--" + e.nodeValue + "--\x3e";
      if (e.nodeType == Node.TEXT_NODE) return t ? e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
      if (e.nodeType != Node.ELEMENT_NODE) return e.outerHTML;
      if (e.nodeType == Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;

      if (e.nodeType == Node.ELEMENT_NODE && "svg" == e.tagName) {
        var n = document.createElement("div"),
            r = e.cloneNode(!0);
        return n.appendChild(r), n.innerHTML;
      }

      if ("IFRAME" == e.tagName) return e.outerHTML.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
      var o = e.childNodes;
      if (0 === o.length) return e.outerHTML;

      for (var i = "", a = 0; a < o.length; a++) "PRE" == e.tagName && (t = !0), i += s(o[a], t);

      return c.node.openTagString(e) + i + c.node.closeTagString(e);
    }

    var a = [];

    function h(e) {
      var t = e.replace(/;;/gi, ";");
      return ";" != (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t;
    }

    function l(e) {
      var t;

      for (t in e) if (e.hasOwnProperty(t)) {
        var n = t.match(u),
            r = null;
        "style" == t && c.opts.htmlAllowedStyleProps.length && (r = e[t].match(g)), n && r ? e[t] = h(r.join(";")) : n && ("style" != t || r) || delete e[t];
      }

      for (var o = "", i = Object.keys(e).sort(), a = 0; a < i.length; a++) e[t = i[a]].indexOf('"') < 0 ? o += " " + t + '="' + e[t] + '"' : o += " " + t + "='" + e[t] + "'";

      return o;
    }

    function d(e, t) {
      var n,
          r = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
      M(r).append(e);
      var o = "";

      if (r) {
        var i = c.node.contents(r);

        for (n = 0; n < i.length; n++) t(i[n]);

        for (i = c.node.contents(r), n = 0; n < i.length; n++) o += s(i[n]);
      }

      return o;
    }

    function m(e, t, n) {
      a = [];
      var r = e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function (e) {
        return a.push(e), "[FROALA.EDITOR.SCRIPT " + (a.length - 1) + "]";
      }).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function (e) {
        return a.push(e), "[FROALA.EDITOR.NOSCRIPT " + (a.length - 1) + "]";
      }).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="').replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="'),
          o = null;
      c.opts.fullPage && (r = c.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (o = c.html.extractNode(e, "head") || "")), r = d(r, t), o && (o = d(o, t));

      var i = function (e, t, n) {
        if (c.opts.fullPage) {
          var r = c.html.extractDoctype(n),
              o = l(c.html.extractNodeAttrs(n, "html"));
          return t = null == t ? c.html.extractNode(n, "head") || "<title></title>" : t, r + "<html" + o + "><head" + l(c.html.extractNodeAttrs(n, "head")) + ">" + t + "</head><body" + l(c.html.extractNodeAttrs(n, "body")) + ">" + e + "</body></html>";
        }

        return e;
      }(r, o, e);

      return i.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function (e, t) {
        return 0 <= c.opts.htmlRemoveTags.indexOf("script") ? "" : a[parseInt(t, 10)];
      }).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function (e, t) {
        return 0 <= c.opts.htmlRemoveTags.indexOf("noscript") ? "" : a[parseInt(t, 10)].replace(/\&lt;/g, "<").replace(/\&gt;/g, ">");
      }).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="');
    }

    function E(e) {
      var t = c.doc.createElement("DIV");
      return t.innerText = e, t.textContent;
    }

    function v(e) {
      for (var t = c.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && v(t[n]);

      !function (e) {
        if ("SPAN" == e.tagName && 0 <= (e.getAttribute("class") || "").indexOf("fr-marker")) return;
        var t, n;
        if ("PRE" == e.tagName && 0 <= (n = (t = e).innerHTML).indexOf("\n") && (t.innerHTML = n.replace(/\n/g, "<br>")), e.nodeType == Node.ELEMENT_NODE && (e.getAttribute("data-fr-src") && 0 !== e.getAttribute("data-fr-src").indexOf("blob:") && e.setAttribute("data-fr-src", c.helpers.sanitizeURL(E(e.getAttribute("data-fr-src")))), e.getAttribute("href") && e.setAttribute("href", c.helpers.sanitizeURL(E(e.getAttribute("href")))), e.getAttribute("src") && e.setAttribute("src", c.helpers.sanitizeURL(E(e.getAttribute("src")))), e.getAttribute("data") && e.setAttribute("data", c.helpers.sanitizeURL(E(e.getAttribute("data")))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(e.tagName) && (e.innerHTML = e.innerHTML.trim())), !c.opts.pasteAllowLocalImages && e.nodeType == Node.ELEMENT_NODE && "IMG" == e.tagName && e.getAttribute("data-fr-src") && 0 === e.getAttribute("data-fr-src").indexOf("file://")) return e.parentNode.removeChild(e);

        if (e.nodeType == Node.ELEMENT_NODE && M.FE.HTML5Map[e.tagName] && "" === c.node.attributes(e)) {
          var r = M.FE.HTML5Map[e.tagName],
              o = "<" + r + ">" + e.innerHTML + "</" + r + ">";
          e.insertAdjacentHTML("beforebegin", o), (e = e.previousSibling).parentNode.removeChild(e.nextSibling);
        }

        if (c.opts.htmlAllowComments || e.nodeType != Node.COMMENT_NODE) {
          if (e.tagName && e.tagName.match(p)) e.parentNode.removeChild(e);else if (e.tagName && !e.tagName.match(f)) "svg" === e.tagName ? e.parentNode.removeChild(e) : c.browser.safari && "path" == e.tagName && e.parentNode && "svg" == e.parentNode.tagName || (c.browser.safari ? e.replaceWith(e.innerHTML) : e.outerHTML = e.innerHTML);else {
            var i = e.attributes;
            if (i) for (var a = i.length - 1; 0 <= a; a--) {
              var s = i[a],
                  l = s.nodeName.match(u),
                  d = null;
              "style" == s.nodeName && c.opts.htmlAllowedStyleProps.length && (d = s.value.match(g)), l && d ? s.value = h(d.join(";")) : l && ("style" != s.nodeName || d) || e.removeAttribute(s.nodeName);
            }
          }
        } else 0 !== e.data.indexOf("[FROALA.EDITOR") && e.parentNode.removeChild(e);
      }(e);
    }

    return {
      _init: function () {
        c.opts.fullPage && M.merge(c.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"]);
      },
      html: function (e, t, n, r) {
        void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = !1);
        var o,
            i = M.merge([], c.opts.htmlAllowedTags);

        for (o = 0; o < t.length; o++) 0 <= i.indexOf(t[o]) && i.splice(i.indexOf(t[o]), 1);

        var a = M.merge([], c.opts.htmlAllowedAttrs);

        for (o = 0; o < n.length; o++) 0 <= a.indexOf(n[o]) && a.splice(a.indexOf(n[o]), 1);

        return a.push("data-fr-.*"), a.push("fr-.*"), f = new RegExp("^" + i.join("$|^") + "$", "gi"), u = new RegExp("^" + a.join("$|^") + "$", "gi"), p = new RegExp("^" + c.opts.htmlRemoveTags.join("$|^") + "$", "gi"), g = c.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)" + c.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)") + ":.+?(?=(;)|$))", "gi") : null, e = m(e, v, !0);
      },
      toHTML5: function () {
        var e = c.el.querySelectorAll(Object.keys(M.FE.HTML5Map).join(","));

        if (e.length) {
          var t = !1;
          c.el.querySelector(".fr-marker") || (c.selection.save(), t = !0);

          for (var n = 0; n < e.length; n++) "" === c.node.attributes(e[n]) && M(e[n]).replaceWith("<" + M.FE.HTML5Map[e[n].tagName] + ">" + e[n].innerHTML + "</" + M.FE.HTML5Map[e[n].tagName] + ">");

          t && c.selection.restore();
        }
      },
      tables: function () {
        !function () {
          for (var e = c.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
            for (var n = e[t].children, r = !0, o = 0; o < n.length; o++) if ("TH" != n[o].tagName) {
              r = !1;
              break;
            }

            if (!1 !== r && 0 !== n.length) {
              for (var i = e[t]; i && "TABLE" != i.tagName && "THEAD" != i.tagName;) i = i.parentNode;

              var a = i;
              "THEAD" != a.tagName && (a = c.doc.createElement("THEAD"), i.insertBefore(a, i.firstChild)), a.appendChild(e[t]);
            }
          }
        }();
      },
      lists: function () {
        !function () {
          var e,
              t = [];

          do {
            if (t.length) {
              var n = t[0],
                  r = c.doc.createElement("ul");
              n.parentNode.insertBefore(r, n);

              do {
                var o = n;
                n = n.nextSibling, r.appendChild(o);
              } while (n && "LI" == n.tagName);
            }

            t = [];

            for (var i = c.el.querySelectorAll("li"), a = 0; a < i.length; a++) e = i[a], c.node.isList(e.parentNode) || t.push(i[a]);
          } while (0 < t.length);
        }(), function () {
          for (var e = c.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
            var n = e[t];

            if (c.node.isList(n.previousSibling) && c.node.openTagString(n) == c.node.openTagString(n.previousSibling)) {
              for (var r = c.node.contents(n), o = 0; o < r.length; o++) n.previousSibling.appendChild(r[o]);

              n.parentNode.removeChild(n);
            }
          }
        }(), function () {
          for (var e = c.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++) for (var n = c.node.contents(e[t]), r = null, o = n.length - 1; 0 <= o; o--) "LI" != n[o].tagName ? (r || (r = M("<li>")).insertBefore(n[o]), r.prepend(n[o])) : r = null;
        }(), function () {
          var e, t, n;

          do {
            t = !1;
            var r = c.el.querySelectorAll("li:empty");

            for (e = 0; e < r.length; e++) r[e].parentNode.removeChild(r[e]);

            var o = c.el.querySelectorAll("ul, ol");

            for (e = 0; e < o.length; e++) (n = o[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n));
          } while (!0 === t);
        }(), function () {
          for (var e = c.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
            var n = e[t],
                r = n.previousSibling;
            r && ("LI" == r.tagName ? r.appendChild(n) : M(n).wrap("<li></li>"));
          }
        }(), function () {
          for (var e = c.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
            var n = e[t];

            if (n.nextSibling) {
              var r = n.nextSibling,
                  o = M("<li>");
              M(n.parentNode).after(o);

              do {
                var i = r;
                r = r.nextSibling, o.append(i);
              } while (r);
            }
          }
        }(), function () {
          for (var e = c.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
            var n = e[t];
            if (c.node.isFirstSibling(n)) M(n).before("<br/>");else if (n.previousSibling && "BR" == n.previousSibling.tagName) {
              for (var r = n.previousSibling.previousSibling; r && c.node.hasClass(r, "fr-marker");) r = r.previousSibling;

              r && "BR" != r.tagName && M(n.previousSibling).remove();
            }
          }
        }(), function () {
          for (var e = c.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) M(e[t]).remove();
        }();
      },
      invisibleSpaces: function (e) {
        return e.replace(/\u200b/g, "").length == e.length ? e : c.clean.exec(e, o);
      },
      exec: m
    };
  }, M.FE.MODULES.spaces = function (l) {
    function r(e, t) {
      var n = e.previousSibling,
          r = e.nextSibling,
          o = e.textContent,
          i = e.parentNode;

      if (!l.html.isPreformatted(i)) {
        t && (o = o.replace(/[\f\n\r\t\v ]{2,}/g, " "), r && "BR" !== r.tagName && !l.node.isBlock(r) || !(l.node.isBlock(i) || l.node.isLink(i) && !i.nextSibling || l.node.isElement(i)) || (o = o.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !l.node.isBlock(n) || !(l.node.isBlock(i) || l.node.isLink(i) && !i.previousSibling || l.node.isElement(i)) || (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " !== o || !(n && l.node.isVoid(n) || r && l.node.isVoid(r)) || n && r && l.node.isVoid(n) && l.node.isVoid(r) || (o = "")), (!n && l.node.isBlock(r) || !r && l.node.isBlock(n)) && l.node.isBlock(i) && i !== l.el && (o = o.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (o = o.replace(new RegExp(M.FE.UNICODE_NBSP, "g"), " "));

        for (var a = "", s = 0; s < o.length; s++) 32 != o.charCodeAt(s) || 0 !== s && 32 != a.charCodeAt(s - 1) || n && r && l.node.isVoid(n) && l.node.isVoid(r) ? a += o[s] : a += M.FE.UNICODE_NBSP;

        (!r || r && l.node.isBlock(r) || r && r.nodeType == Node.ELEMENT_NODE && l.win.getComputedStyle(r) && "block" == l.win.getComputedStyle(r).display) && (a = a.replace(/ $/, M.FE.UNICODE_NBSP)), !n || l.node.isVoid(n) || l.node.isBlock(n) || 1 !== (a = a.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== a.charCodeAt(0) || !r || l.node.isVoid(r) || l.node.isBlock(r) || (a = " "), t || (a = a.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent != a && (e.textContent = a);
      }
    }

    function d(e, t) {
      if (void 0 !== e && e || (e = l.el), void 0 === t && (t = !1), !e.getAttribute || "false" != e.getAttribute("contenteditable")) if (e.nodeType == Node.TEXT_NODE) r(e, t);else if (e.nodeType == Node.ELEMENT_NODE) for (var n = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function (e) {
        for (var t = e.parentNode; t && t !== l.el;) {
          if ("STYLE" == t.tagName || "IFRAME" == t.tagName) return !1;
          if ("PRE" === t.tagName) return !1;
          t = t.parentNode;
        }

        return null != e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !l.node.hasClass(e.parentNode, "fr-marker");
      }), !1); n.nextNode();) r(n.currentNode, t);
    }

    return {
      normalize: d,
      normalizeAroundCursor: function () {
        for (var e = [], t = l.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
          for (var r = null, o = l.node.blockParent(t[n]), i = (r = o || t[n]).nextSibling, a = r.previousSibling; i && "BR" == i.tagName;) i = i.nextSibling;

          for (; a && "BR" == a.tagName;) a = a.previousSibling;

          r && e.indexOf(r) < 0 && e.push(r), a && e.indexOf(a) < 0 && e.push(a), i && e.indexOf(i) < 0 && e.push(i);
        }

        for (var s = 0; s < e.length; s++) d(e[s]);
      }
    };
  }, M.FE.UNICODE_NBSP = String.fromCharCode(160), M.FE.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], M.FE.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], M.extend(M.FE.DEFAULTS, {
    htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line"],
    htmlDoNotWrapTags: ["script", "style"],
    htmlSimpleAmpersand: !1,
    htmlIgnoreCSSProperties: [],
    htmlExecuteScripts: !0
  }), M.FE.MODULES.html = function (O) {
    function c() {
      return O.opts.enter == M.FE.ENTER_P ? "p" : O.opts.enter == M.FE.ENTER_DIV ? "div" : O.opts.enter == M.FE.ENTER_BR ? null : void 0;
    }

    function s(e, t) {
      return !(!e || e === O.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName));
    }

    function i(e) {
      var t,
          n = [],
          r = [];

      if (e) {
        var o = O.el.querySelectorAll(".fr-marker");

        for (t = 0; t < o.length; t++) {
          var i = O.node.blockParent(o[t]) || o[t];

          if (i) {
            var a = i.nextSibling,
                s = i.previousSibling;
            i && r.indexOf(i) < 0 && O.node.isBlock(i) && r.push(i), s && O.node.isBlock(s) && r.indexOf(s) < 0 && r.push(s), a && O.node.isBlock(a) && r.indexOf(a) < 0 && r.push(a);
          }
        }
      } else r = O.el.querySelectorAll(p());

      var l = p();

      for (l += "," + M.FE.VOID_ELEMENTS.join(","), l += ", .fr-inner", l += "," + O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)", t = r.length - 1; 0 <= t; t--) if (!(r[t].textContent && 0 < r[t].textContent.replace(/\u200B|\n/g, "").length || 0 < r[t].querySelectorAll(l).length)) {
        for (var d = O.node.contents(r[t]), c = !1, f = 0; f < d.length; f++) if (d[f].nodeType != Node.COMMENT_NODE && d[f].textContent && 0 < d[f].textContent.replace(/\u200B|\n/g, "").length) {
          c = !0;
          break;
        }

        c || n.push(r[t]);
      }

      return n;
    }

    function p() {
      return M.FE.BLOCK_TAGS.join(", ");
    }

    function e(e) {
      var t,
          n,
          r = M.merge([], M.FE.VOID_ELEMENTS);
      r = M.merge(r, O.opts.htmlAllowedEmptyTags), r = void 0 === e ? M.merge(r, M.FE.BLOCK_TAGS) : M.merge(r, M.FE.NO_DELETE_TAGS), t = O.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)");

      do {
        n = !1;

        for (var o = 0; o < t.length; o++) 0 !== t[o].attributes.length && void 0 === t[o].getAttribute("href") || (t[o].parentNode.removeChild(t[o]), n = !0);

        t = O.el.querySelectorAll("*:empty:not(" + r.join("):not(") + "):not(.fr-marker)");
      } while (t.length && n);
    }

    function a(e, t) {
      var n = c();

      if (t && (n = "div"), n) {
        for (var r = O.doc.createDocumentFragment(), o = null, i = !1, a = e.firstChild, s = !1; a;) {
          var l = a.nextSibling;
          if (a.nodeType == Node.ELEMENT_NODE && (O.node.isBlock(a) || 0 <= O.opts.htmlDoNotWrapTags.indexOf(a.tagName.toLowerCase()) && !O.node.hasClass(a, "fr-marker"))) o = null, r.appendChild(a.cloneNode(!0));else if (a.nodeType != Node.ELEMENT_NODE && a.nodeType != Node.TEXT_NODE) o = null, r.appendChild(a.cloneNode(!0));else if ("BR" == a.tagName) null == o ? (o = O.doc.createElement(n), s = !0, t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0)), o.appendChild(a.cloneNode(!0)), r.appendChild(o)) : !1 === i && (o.appendChild(O.doc.createElement("br")), t && (o.setAttribute("class", "fr-temp-div"), o.setAttribute("data-empty", !0))), o = null;else {
            var d = a.textContent;
            a.nodeType !== Node.TEXT_NODE || 0 < d.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || d.replace(/(^ *)|( *$)/g, "").length && d.indexOf("\n") < 0 ? (null == o && (o = O.doc.createElement(n), s = !0, t && o.setAttribute("class", "fr-temp-div"), r.appendChild(o), i = !1), o.appendChild(a.cloneNode(!0)), i || O.node.hasClass(a, "fr-marker") || a.nodeType == Node.TEXT_NODE && 0 === d.replace(/ /g, "").length || (i = !0)) : s = !0;
          }
          a = l;
        }

        s && (e.innerHTML = "", e.appendChild(r));
      }
    }

    function l(e, t) {
      for (var n = e.length - 1; 0 <= n; n--) a(e[n], t);
    }

    function t(e, t, n, r, o) {
      if (!O.$wp) return !1;
      void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), void 0 === o && (o = !1);
      var i = O.$wp.scrollTop();
      a(O.el, e), r && l(O.el.querySelectorAll(".fr-inner"), e), t && l(O.el.querySelectorAll("td, th"), e), n && l(O.el.querySelectorAll("blockquote"), e), o && l(O.el.querySelectorAll("li"), e), i != O.$wp.scrollTop() && O.$wp.scrollTop(i);
    }

    function n(e) {
      if (void 0 === e && (e = O.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;

      for (var t = O.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, O.node.filter(function (e) {
        return null != e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g);
      }), !1); t.nextNode();) {
        var n = t.currentNode;

        if (!s(n.parentNode, !0)) {
          var r = O.node.isBlock(n.parentNode) || O.node.isElement(n.parentNode),
              o = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");

          if (r) {
            var i = n.previousSibling,
                a = n.nextSibling;
            i && a && " " == o ? o = O.node.isBlock(i) && O.node.isBlock(a) ? "" : " " : (i || (o = o.replace(/^ */, "")), a || (o = o.replace(/ *$/, "")));
          }

          n.textContent = o;
        }
      }
    }

    function r(e, t, n) {
      var r = new RegExp(t, "gi").exec(e);
      return r ? r[n] : null;
    }

    function w(e) {
      var t = e.doctype,
          n = "<!DOCTYPE html>";
      return t && (n = "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">"), n;
    }

    function d(e) {
      var t = e.parentNode;

      if (t && (O.node.isBlock(t) || O.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
        for (var n = e.previousSibling, r = e.nextSibling; n && (n.nodeType == Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || O.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;

        if (r) return !1;
        n && t && "BR" != n.tagName && !O.node.isBlock(n) && !r && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !O.node.hasClass(n, "fr-marker") && (O.el == t && !r && O.opts.enter == M.FE.ENTER_BR && O.browser.msie || e.parentNode.removeChild(e));
      } else !t || O.node.isBlock(t) || O.node.isElement(t) || e.previousSibling || e.nextSibling || !O.node.isDeletable(e.parentNode) || d(e.parentNode);
    }

    function u() {
      O.opts.htmlUntouched || (e(), t(), n(), O.spaces.normalize(null, !0), O.html.fillEmptyBlocks(), O.clean.lists(), O.clean.tables(), O.clean.toHTML5(), O.html.cleanBRs()), O.selection.restore(), o(), O.placeholder.refresh();
    }

    function o() {
      O.node.isEmpty(O.el) && (null != c() ? O.el.querySelector(p()) || O.el.querySelector(O.opts.htmlDoNotWrapTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || (O.core.hasFocus() ? (O.$el.html("<" + c() + ">" + M.FE.MARKERS + "<br/></" + c() + ">"), O.selection.restore()) : O.$el.html("<" + c() + "><br/></" + c() + ">")) : O.el.querySelector("*:not(.fr-marker):not(br)") || (O.core.hasFocus() ? (O.$el.html(M.FE.MARKERS + "<br/>"), O.selection.restore()) : O.$el.html("<br/>")));
    }

    function g(e, t) {
      return r(e, "<" + t + "[^>]*?>([\\w\\W]*)</" + t + ">", 1);
    }

    function h(e, t) {
      var n = M("<div " + (r(e, "<" + t + "([^>]*?)>", 1) || "") + ">");
      return O.node.rawAttributes(n.get(0));
    }

    function m(e) {
      return (r(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ");
    }

    function E(e, t) {
      O.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t;
    }

    function F(e) {
      var t;
      (t = /:not\(([^\)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
      var n = 100 * (e.match(/(#[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(\[[^\]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s\+>~\.\[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^\)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s\+>~\.\[:]+)/g) || []).length + (e.match(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
      return n += ((e = (e = e.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")).match(/([^\s\+>~\.\[:]+)/g) || []).length;
    }

    function k(e) {
      if (O.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType == Node.ELEMENT_NODE) {
        var t,
            n = e.querySelectorAll('[class=""],[style=""]');

        for (t = 0; t < n.length; t++) {
          var r = n[t];
          "" === r.getAttribute("class") && r.removeAttribute("class"), "" === r.getAttribute("style") && r.removeAttribute("style");
        }

        if ("BR" === e.tagName) d(e);else {
          var o = e.querySelectorAll("br");

          for (t = 0; t < o.length; t++) d(o[t]);
        }
      }
    }

    function D(e, t) {
      return e[3] - t[3];
    }

    function f(e) {
      var t = O.doc.createElement("div");
      return t.innerHTML = e, null !== t.querySelector(p());
    }

    function v(e) {
      var t = null;
      if (void 0 === e && (t = O.selection.element()), O.opts.keepFormatOnDelete) return !1;
      var n,
          r,
          o = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
      if ((O.el.textContent.match(/\u200B/g) || []).length - O.el.querySelectorAll(".fr-marker").length == o) return !1;

      do {
        r = !1, n = O.el.querySelectorAll("*:not(.fr-marker)");

        for (var i = 0; i < n.length; i++) {
          var a = n[i];

          if (t != a) {
            var s = a.textContent;
            0 === a.children.length && 1 === s.length && 8203 == s.charCodeAt(0) && "TD" !== a.tagName && (M(a).remove(), r = !0);
          }
        }
      } while (r);
    }

    return {
      defaultTag: c,
      isPreformatted: s,
      emptyBlocks: i,
      emptyBlockTagsQuery: function () {
        return M.FE.BLOCK_TAGS.join(":empty, ") + ":empty";
      },
      blockTagsQuery: p,
      fillEmptyBlocks: function (e) {
        var t = i(e);
        O.node.isEmpty(O.el) && O.opts.enter === M.FE.ENTER_BR && t.push(O.el);

        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          "false" === r.getAttribute("contenteditable") || r.querySelector(O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),") + ":not(.fr-marker)") || O.node.isVoid(r) || "TABLE" != r.tagName && "TBODY" != r.tagName && "TR" != r.tagName && "UL" != r.tagName && "OL" != r.tagName && r.appendChild(O.doc.createElement("br"));
        }

        if (O.browser.msie && O.opts.enter == M.FE.ENTER_BR) {
          var o = O.node.contents(O.el);
          o.length && o[o.length - 1].nodeType == Node.TEXT_NODE && O.$el.append("<br>");
        }
      },
      cleanEmptyTags: e,
      cleanWhiteTags: v,
      cleanBlankSpaces: n,
      blocks: function () {
        return O.$el.get(0).querySelectorAll(p());
      },
      getDoctype: w,
      set: function (e) {
        var t,
            n,
            r,
            o = O.clean.html((e || "").trim(), [], [], O.opts.fullPage);

        if (O.opts.fullPage) {
          var i = g(o, "body") || (0 <= o.indexOf("<body") ? "" : o),
              a = h(o, "body"),
              s = g(o, "head") || "<title></title>",
              l = h(o, "head"),
              d = M("<div>").append(s).contents().each(function () {
            (this.nodeType == Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this);
          }).end().html().trim();
          s = M("<div>").append(s).contents().map(function () {
            return this.nodeType == Node.COMMENT_NODE ? "\x3c!--" + this.nodeValue + "--\x3e" : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : "";
          }).toArray().join("");
          var c = m(o),
              f = h(o, "html");
          E(O.$el, d + "\n" + i), O.node.clearAttributes(O.el), O.$el.attr(a), O.$el.addClass("fr-view"), O.$el.attr("spellcheck", O.opts.spellcheck), O.$el.attr("dir", O.opts.direction), E(O.$head, s), O.node.clearAttributes(O.$head.get(0)), O.$head.attr(l), O.node.clearAttributes(O.$html.get(0)), O.$html.attr(f), O.iframe_document.doctype.parentNode.replaceChild((t = c, n = O.iframe_document, (r = t.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i)) ? n.implementation.createDocumentType(r[1], r[3], r[4]) : n.implementation.createDocumentType("html")), O.iframe_document.doctype);
        } else E(O.$el, o);

        var p = O.edit.isDisabled();
        O.edit.on(), O.core.injectStyle(O.opts.iframeDefaultStyle + O.opts.iframeStyle), u(), O.opts.useClasses || (O.$el.find("[fr-original-class]").each(function () {
          this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class");
        }), O.$el.find("[fr-original-style]").each(function () {
          this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style");
        })), p && O.edit.off(), O.events.trigger("html.set");
      },
      get: function (e, t) {
        if (!O.$wp) return O.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
        var n = "";
        O.events.trigger("html.beforeGet");
        var r,
            o,
            i = [],
            a = {},
            s = [],
            l = O.el.querySelectorAll("input, textarea");

        for (r = 0; r < l.length; r++) l[r].setAttribute("value", l[r].value);

        if (!O.opts.useClasses && !t) {
          var d = new RegExp("^" + O.opts.htmlIgnoreCSSProperties.join("$|^") + "$", "gi");

          for (r = 0; r < O.doc.styleSheets.length; r++) {
            var c,
                f = 0;

            try {
              c = O.doc.styleSheets[r].cssRules, O.doc.styleSheets[r].ownerNode && "STYLE" == O.doc.styleSheets[r].ownerNode.nodeType && (f = 1);
            } catch ($) {}

            if (c) for (var p = 0, u = c.length; p < u; p++) if (c[p].selectorText && 0 < c[p].style.cssText.length) {
              var g,
                  h = c[p].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":");

              try {
                g = O.el.querySelectorAll(h);
              } catch ($) {
                g = [];
              }

              for (o = 0; o < g.length; o++) {
                !g[o].getAttribute("fr-original-style") && g[o].getAttribute("style") ? (g[o].setAttribute("fr-original-style", g[o].getAttribute("style")), i.push(g[o])) : g[o].getAttribute("fr-original-style") || (g[o].setAttribute("fr-original-style", ""), i.push(g[o])), a[g[o]] || (a[g[o]] = {});

                for (var m = 1e3 * f + F(c[p].selectorText), E = c[p].style.cssText.split(";"), v = 0; v < E.length; v++) {
                  var b = E[v].trim().split(":")[0];

                  if (b && !b.match(d) && (a[g[o]][b] || (a[g[o]][b] = 0) <= (g[o].getAttribute("fr-original-style") || "").indexOf(b + ":") && (a[g[o]][b] = 1e4), m >= a[g[o]][b] && (a[g[o]][b] = m, E[v].trim().length))) {
                    var S = E[v].trim().split(":");
                    S.splice(0, 1), s.push([g[o], b.trim(), S.join(":").trim(), m]);
                  }
                }
              }
            }
          }

          for (s.sort(D), r = 0; r < s.length; r++) {
            var T = s[r];
            T[0].style[T[1]] = T[2];
          }

          for (r = 0; r < i.length; r++) if (i[r].getAttribute("class") && (i[r].setAttribute("fr-original-class", i[r].getAttribute("class")), i[r].removeAttribute("class")), 0 < (i[r].getAttribute("fr-original-style") || "").trim().length) {
            var y = i[r].getAttribute("fr-original-style").split(";");

            for (o = 0; o < y.length; o++) if (0 < y[o].indexOf(":")) {
              var N = y[o].split(":"),
                  C = N[0];
              N.splice(0, 1), i[r].style[C.trim()] = N.join(":").trim();
            }
          }
        }

        if (O.node.isEmpty(O.el)) O.opts.fullPage && (n = w(O.iframe_document), n += "<html" + O.node.attributes(O.$html.get(0)) + ">" + O.$html.find("head").get(0).outerHTML + "<body></body></html>");else if (void 0 === e && (e = !1), O.opts.fullPage) {
          n = w(O.iframe_document), O.$el.removeClass("fr-view");
          var A = O.opts.heightMin;
          O.opts.heightMin = null, O.size.refresh(), n += "<html" + O.node.attributes(O.$html.get(0)) + ">" + O.$html.html() + "</html>", O.opts.heightMin = A, O.size.refresh(), O.$el.addClass("fr-view");
        } else n = O.$el.html();
        if (!O.opts.useClasses && !t) for (r = 0; r < i.length; r++) i[r].getAttribute("fr-original-class") && (i[r].setAttribute("class", i[r].getAttribute("fr-original-class")), i[r].removeAttribute("fr-original-class")), null != i[r].getAttribute("fr-original-style") && void 0 !== i[r].getAttribute("fr-original-style") ? (0 !== i[r].getAttribute("fr-original-style").length ? i[r].setAttribute("style", i[r].getAttribute("fr-original-style")) : i[r].removeAttribute("style"), i[r].removeAttribute("fr-original-style")) : i[r].removeAttribute("style");
        O.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), O.opts.htmlSimpleAmpersand && (n = n.replace(/\&amp;/gi, "&")), O.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = O.clean.invisibleSpaces(n), n = O.clean.exec(n, k);
        var x = O.events.chainTrigger("html.get", n);
        return "string" == typeof x && (n = x), n = (n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function (e) {
          return e.replace(/<br>/g, "\n");
        })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="');
      },
      getSelected: function () {
        var e,
            t,
            n = function (e, t) {
          for (; t && (t.nodeType == Node.TEXT_NODE || !O.node.isBlock(t)) && !O.node.isElement(t) && !O.node.hasClass(t, "fr-inner");) t && t.nodeType != Node.TEXT_NODE && M(e).wrapInner(O.node.openTagString(t) + O.node.closeTagString(t)), t = t.parentNode;

          t && e.innerHTML == t.innerHTML && (e.innerHTML = t.outerHTML);
        },
            r = "";

        if ("undefined" != typeof O.win.getSelection) {
          O.browser.mozilla && (O.selection.save(), 1 < O.$el.find('.fr-marker[data-type="false"]').length && (O.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), O.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), O.$el.find(".fr-marker").not('[data-id="0"]').remove()), O.selection.restore());

          for (var o = O.selection.ranges(), i = 0; i < o.length; i++) {
            var a = document.createElement("div");
            a.appendChild(o[i].cloneContents()), n(a, (t = e = void 0, t = null, O.win.getSelection ? (e = O.win.getSelection()) && e.rangeCount && (t = e.getRangeAt(0).commonAncestorContainer).nodeType != Node.ELEMENT_NODE && (t = t.parentNode) : (e = O.doc.selection) && "Control" != e.type && (t = e.createRange().parentElement()), null != t && (0 <= M.inArray(O.el, M(t).parents()) || t == O.el) ? t : null)), 0 < M(a).find(".fr-element").length && (a = O.el), r += a.innerHTML;
          }
        } else "undefined" != typeof O.doc.selection && "Text" == O.doc.selection.type && (r = O.doc.selection.createRange().htmlText);

        return r;
      },
      insert: function (e, t, n) {
        var r, o, i;
        if (O.selection.isCollapsed() || O.selection.remove(), r = t ? e : O.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (o = r, (i = O.doc.createElement("div")).innerHTML = o, O.selection.setAtEnd(i), r = i.innerHTML), O.node.isEmpty(O.el) && !O.opts.keepFormatOnDelete && f(r)) O.el.innerHTML = r;else {
          var a = O.markers.insert();

          if (a) {
            O.node.isLastSibling(a) && M(a).parent().hasClass("fr-deletable") && M(a).insertAfter(M(a).parent());
            var s = O.node.blockParent(a);

            if ((f(r) || n) && (O.node.deepestParent(a) || s && "LI" == s.tagName)) {
              if (s && "LI" == s.tagName && (r = function (e) {
                if (!O.html.defaultTag()) return e;
                var t = O.doc.createElement("div");
                t.innerHTML = e;

                for (var n = t.querySelectorAll(":scope > " + O.html.defaultTag()), r = n.length - 1; 0 <= r; r--) {
                  var o = n[r];
                  O.node.isBlock(o.previousSibling) || (o.previousSibling && !O.node.isEmpty(o) && M("<br>").insertAfter(o.previousSibling), o.outerHTML = o.innerHTML);
                }

                return t.innerHTML;
              }(r)), !(a = O.markers.split())) return !1;
              a.outerHTML = r;
            } else a.outerHTML = r;
          } else O.el.innerHTML = O.el.innerHTML + r;
        }
        u(), O.keys.positionCaret(), O.events.trigger("html.inserted");
      },
      wrap: t,
      unwrap: function () {
        O.$el.find("div.fr-temp-div").each(function () {
          this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && M(this).before("<br>"), M(this).attr("data-empty") || !this.nextSibling || O.node.isBlock(this.nextSibling) && !M(this.nextSibling).hasClass("fr-temp-div") ? M(this).replaceWith(M(this).html()) : M(this).replaceWith(M(this).html() + "<br>");
        }), O.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function () {
          return "" === M(this).attr("class");
        }).removeAttr("class");
      },
      escapeEntities: function (e) {
        return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;");
      },
      checkIfEmpty: o,
      extractNode: g,
      extractNodeAttrs: h,
      extractDoctype: m,
      cleanBRs: function () {
        for (var e = O.el.getElementsByTagName("br"), t = 0; t < e.length; t++) d(e[t]);
      },
      _init: function () {
        if (O.$wp) {
          var e = function () {
            v(), O.placeholder && setTimeout(O.placeholder.refresh, 0);
          };

          O.events.on("mouseup", e), O.events.on("keydown", e), O.events.on("contentChanged", o);
        }
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    height: null,
    heightMax: null,
    heightMin: null,
    width: null
  }), M.FE.MODULES.size = function (e) {
    function t() {
      n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0));
    }

    function n() {
      e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.height(e.opts.height), e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), e.opts.width && e.$box.width(e.opts.width);
    }

    return {
      _init: function () {
        if (!e.$wp) return !1;
        n(), e.$iframe && (e.events.on("keyup keydown", function () {
          setTimeout(t, 0);
        }, !0), e.events.on("commands.after html.set init initialized paste.after", t));
      },
      syncIframe: t,
      refresh: n
    };
  }, M.extend(M.FE.DEFAULTS, {
    language: null
  }), M.FE.LANGUAGE = {}, M.FE.MODULES.language = function (e) {
    var t;
    return {
      _init: function () {
        M.FE.LANGUAGE && (t = M.FE.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction);
      },
      translate: function (e) {
        return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e;
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    placeholderText: "Type something"
  }), M.FE.MODULES.placeholder = function (c) {
    function e() {
      c.$placeholder || (c.$placeholder = M('<span class="fr-placeholder"></span>'), c.$wp.append(c.$placeholder));
      var e = c.opts.iframe ? c.$iframe.prev().outerHeight(!0) : c.$el.prev().outerHeight(!0),
          t = 0,
          n = 0,
          r = 0,
          o = 0,
          i = 0,
          a = 0,
          s = c.node.contents(c.el),
          l = M(c.selection.element()).css("text-align");

      if (s.length && s[0].nodeType == Node.ELEMENT_NODE) {
        var d = M(s[0]);
        (!c.opts.toolbarInline || 0 < c.$el.prev().length) && c.ready && (t = c.helpers.getPX(d.css("margin-top")), o = c.helpers.getPX(d.css("padding-top")), n = c.helpers.getPX(d.css("margin-left")), r = c.helpers.getPX(d.css("margin-right")), i = c.helpers.getPX(d.css("padding-left")), a = c.helpers.getPX(d.css("padding-right"))), c.$placeholder.css("font-size", d.css("font-size")), c.$placeholder.css("line-height", d.css("line-height"));
      } else c.$placeholder.css("font-size", c.$el.css("font-size")), c.$placeholder.css("line-height", c.$el.css("line-height"));

      c.$wp.addClass("show-placeholder"), c.$placeholder.css({
        marginTop: Math.max(c.helpers.getPX(c.$el.css("margin-top")), t) + (e || 0),
        paddingTop: Math.max(c.helpers.getPX(c.$el.css("padding-top")), o),
        paddingLeft: Math.max(c.helpers.getPX(c.$el.css("padding-left")), i),
        marginLeft: Math.max(c.helpers.getPX(c.$el.css("margin-left")), n),
        paddingRight: Math.max(c.helpers.getPX(c.$el.css("padding-right")), a),
        marginRight: Math.max(c.helpers.getPX(c.$el.css("margin-right")), r),
        textAlign: l
      }).text(c.language.translate(c.opts.placeholderText || c.$oel.attr("placeholder") || "")), c.$placeholder.html(c.$placeholder.text().replace(/\n/g, "<br>"));
    }

    function t() {
      c.$wp.removeClass("show-placeholder");
    }

    function n() {
      if (!c.$wp) return !1;
      c.core.isEmpty() ? e() : t();
    }

    return {
      _init: function () {
        if (!c.$wp) return !1;
        c.events.on("init input keydown keyup contentChanged initialized", n);
      },
      show: e,
      hide: t,
      refresh: n,
      isVisible: function () {
        return !!c.$wp && c.node.hasClass(c.$wp.get(0), "show-placeholder");
      }
    };
  }, M.FE.MODULES.edit = function (t) {
    function e() {
      if (t.browser.mozilla) try {
        t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false");
      } catch (e) {}
      if (t.browser.msie) try {
        t.doc.body.addEventListener("mscontrolselect", function (e) {
          return e.preventDefault(), !1;
        });
      } catch (e) {}
    }

    var n = !1;

    function r() {
      return n;
    }

    return {
      _init: function () {
        t.events.on("focus", function () {
          r() ? t.edit.off() : t.edit.on();
        });
      },
      on: function () {
        t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), t.$tb && t.$tb.removeClass("fr-disabled").removeAttr("aria-disabled"), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), n = !1;
      },
      off: function () {
        t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0), t.$tb && t.$tb.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.enableBlur(), n = !0;
      },
      disableDesign: e,
      isDisabled: r
    };
  }, M.extend(M.FE.DEFAULTS, {
    documentReady: !1,
    editorClass: null,
    typingTimer: 500,
    iframe: !1,
    requestWithCORS: !0,
    requestWithCredentials: !1,
    requestHeaders: {},
    useClasses: !0,
    spellcheck: !0,
    iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
    iframeStyle: "",
    iframeStyleFiles: [],
    direction: "auto",
    zIndex: 1,
    tabIndex: null,
    disableRightClick: !1,
    scrollableContainer: "body",
    keepFormatOnDelete: !1,
    theme: null
  }), M.FE.MODULES.core = function (i) {
    function t() {
      if (i.$box.addClass("fr-box" + (i.opts.editorClass ? " " + i.opts.editorClass : "")), i.$box.attr("role", "application"), i.$wp.addClass("fr-wrapper"), i.opts.documentReady && i.$box.addClass("fr-document"), i.opts.iframe || i.$el.addClass("fr-element fr-view"), i.opts.iframe) {
        i.$iframe.addClass("fr-iframe"), i.$el.addClass("fr-view");

        for (var e = 0; e < i.o_doc.styleSheets.length; e++) {
          var t;

          try {
            t = i.o_doc.styleSheets[e].cssRules;
          } catch (o) {}

          if (t) for (var n = 0, r = t.length; n < r; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? i.opts.iframeStyle += t[n].selectorText.replace(/\.fr-view/g, "body") + "{" + t[n].style.cssText + "}" : i.opts.iframeStyle += t[n].selectorText.replace(/\.fr-element/g, "body") + "{" + t[n].style.cssText + "}");
        }
      }

      "auto" != i.opts.direction && i.$box.removeClass("fr-ltr fr-rtl").addClass("fr-" + i.opts.direction), i.$el.attr("dir", i.opts.direction), i.$wp.attr("dir", i.opts.direction), 1 < i.opts.zIndex && i.$box.css("z-index", i.opts.zIndex), i.opts.theme && i.$box.addClass(i.opts.theme + "-theme"), i.opts.tabIndex = i.opts.tabIndex || i.$oel.attr("tabIndex"), i.opts.tabIndex && i.$el.attr("tabIndex", i.opts.tabIndex);
    }

    return {
      _init: function () {
        if (M.FE.INSTANCES.push(i), i.drag_support = {
          filereader: "undefined" != typeof FileReader,
          formdata: !!i.win.FormData,
          progress: "upload" in new XMLHttpRequest()
        }, i.$wp) {
          t(), i.html.set(i._original_html), i.$el.attr("spellcheck", i.opts.spellcheck), i.helpers.isMobile() && (i.$el.attr("autocomplete", i.opts.spellcheck ? "on" : "off"), i.$el.attr("autocorrect", i.opts.spellcheck ? "on" : "off"), i.$el.attr("autocapitalize", i.opts.spellcheck ? "on" : "off")), i.opts.disableRightClick && i.events.$on(i.$el, "contextmenu", function (e) {
            if (2 == e.button) return !1;
          });

          try {
            i.doc.execCommand("styleWithCSS", !1, !1);
          } catch (e) {}
        }

        "TEXTAREA" == i.$oel.get(0).tagName && (i.events.on("contentChanged", function () {
          i.$oel.val(i.html.get());
        }), i.events.on("form.submit", function () {
          i.$oel.val(i.html.get());
        }), i.events.on("form.reset", function () {
          i.html.set(i._original_html);
        }), i.$oel.val(i.html.get())), i.helpers.isIOS() && i.events.$on(i.$doc, "selectionchange", function () {
          i.$doc.get(0).hasFocus() || i.$win.get(0).focus();
        }), i.events.trigger("init"), i.opts.autofocus && !i.opts.initOnClick && i.$wp && i.events.on("initialized", function () {
          i.events.focus(!0);
        });
      },
      destroy: function (e) {
        "TEXTAREA" == i.$oel.get(0).tagName && i.$oel.val(e), i.$box && i.$box.removeAttr("role"), i.$wp && ("TEXTAREA" == i.$oel.get(0).tagName ? (i.$el.html(""), i.$wp.html(""), i.$box.replaceWith(i.$oel), i.$oel.show()) : (i.$wp.replaceWith(e), i.$el.html(""), i.$box.removeClass("fr-view fr-ltr fr-box " + (i.opts.editorClass || "")), i.opts.theme && i.$box.addClass(i.opts.theme + "-theme"))), this.$wp = null, this.$el = null, this.el = null, this.$box = null;
      },
      isEmpty: function () {
        return i.node.isEmpty(i.el);
      },
      getXHR: function (e, t) {
        var n = new XMLHttpRequest();

        for (var r in n.open(t, e, !0), i.opts.requestWithCredentials && (n.withCredentials = !0), i.opts.requestHeaders) i.opts.requestHeaders.hasOwnProperty(r) && n.setRequestHeader(r, i.opts.requestHeaders[r]);

        return n;
      },
      injectStyle: function (e) {
        if (i.opts.iframe) {
          i.$head.find("style[data-fr-style], link[data-fr-style]").remove(), i.$head.append('<style data-fr-style="true">' + e + "</style>");

          for (var t = 0; t < i.opts.iframeStyleFiles.length; t++) {
            var n = M('<link data-fr-style="true" rel="stylesheet" href="' + i.opts.iframeStyleFiles[t] + '">');
            n.get(0).addEventListener("load", i.size.syncIframe), i.$head.append(n);
          }
        }
      },
      hasFocus: function () {
        return i.browser.mozilla && i.helpers.isMobile() ? i.selection.inEditor() : i.node.hasFocus(i.el) || 0 < i.$el.find("*:focus").length;
      },
      sameInstance: function (e) {
        if (!e) return !1;
        var t = e.data("instance");
        return !!t && t.id == i.id;
      }
    };
  }, M.FE.MODULES.cursorLists = function (h) {
    function m(e) {
      for (var t = e; "LI" != t.tagName;) t = t.parentNode;

      return t;
    }

    function E(e) {
      for (var t = e; !h.node.isList(t);) t = t.parentNode;

      return t;
    }

    return {
      _startEnter: function (e) {
        var t,
            n = m(e),
            r = n.nextSibling,
            o = n.previousSibling,
            i = h.html.defaultTag();

        if (h.node.isEmpty(n, !0) && r) {
          for (var a = "", s = "", l = e.parentNode; !h.node.isList(l) && l.parentNode && ("LI" !== l.parentNode.tagName || l.parentNode === n);) a = h.node.openTagString(l) + a, s += h.node.closeTagString(l), l = l.parentNode;

          a = h.node.openTagString(l) + a, s += h.node.closeTagString(l);
          var d = "";

          for (d = l.parentNode && "LI" == l.parentNode.tagName ? s + "<li>" + M.FE.MARKERS + "<br>" + a : i ? s + "<" + i + ">" + M.FE.MARKERS + "<br></" + i + ">" + a : s + M.FE.MARKERS + "<br>" + a; ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;

          M(n).replaceWith('<span id="fr-break"></span>');
          var c = h.node.openTagString(l) + M(l).html() + h.node.closeTagString(l);
          c = c.replace(/<span id="fr-break"><\/span>/g, d), M(l).replaceWith(c), h.$el.find("li:empty").remove();
        } else if (o && r || !h.node.isEmpty(n, !0)) {
          for (var f = "<br>", p = e.parentNode; p && "LI" != p.tagName;) f = h.node.openTagString(p) + f + h.node.closeTagString(p), p = p.parentNode;

          M(n).before("<li>" + f + "</li>"), M(e).remove();
        } else if (o) {
          t = E(n);

          for (var u = M.FE.MARKERS + "<br>", g = e.parentNode; g && "LI" != g.tagName;) u = h.node.openTagString(g) + u + h.node.closeTagString(g), g = g.parentNode;

          t.parentNode && "LI" == t.parentNode.tagName ? M(t.parentNode).after("<li>" + u + "</li>") : i ? M(t).after("<" + i + ">" + u + "</" + i + ">") : M(t).after(u), M(n).remove();
        } else (t = E(n)).parentNode && "LI" == t.parentNode.tagName ? r ? M(t.parentNode).before(h.node.openTagString(n) + M.FE.MARKERS + "<br></li>") : M(t.parentNode).after(h.node.openTagString(n) + M.FE.MARKERS + "<br></li>") : i ? M(t).before("<" + i + ">" + M.FE.MARKERS + "<br></" + i + ">") : M(t).before(M.FE.MARKERS + "<br>"), M(n).remove();
      },
      _middleEnter: function (e) {
        for (var t = m(e), n = "", r = e, o = "", i = ""; r != t;) {
          var a = "A" == (r = r.parentNode).tagName && h.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
          o = h.node.openTagString(M(r).clone().addClass(a).get(0)) + o, i = h.node.closeTagString(r) + i;
        }

        n = i + n + o + M.FE.MARKERS + (h.opts.keepFormatOnDelete ? M.FE.INVISIBLE_SPACE : ""), M(e).replaceWith('<span id="fr-break"></span>');
        var s = h.node.openTagString(t) + M(t).html() + h.node.closeTagString(t);
        s = s.replace(/<span id="fr-break"><\/span>/g, n), M(t).replaceWith(s);
      },
      _endEnter: function (e) {
        for (var t = m(e), n = M.FE.MARKERS, r = "", o = e, i = !1; o != t;) {
          var a = "A" == (o = o.parentNode).tagName && h.cursor.isAtEnd(e, o) ? "fr-to-remove" : "";
          i || o == t || h.node.isBlock(o) || (i = !0, r += M.FE.INVISIBLE_SPACE), r = h.node.openTagString(M(o).clone().addClass(a).get(0)) + r, n += h.node.closeTagString(o);
        }

        var s = r + n;
        M(e).remove(), M(t).after(s);
      },
      _backspace: function (e) {
        var t = m(e),
            n = t.previousSibling;

        if (n) {
          n = M(n).find(h.html.blockTagsQuery()).get(-1) || n, M(e).replaceWith(M.FE.MARKERS);
          var r = h.node.contents(n);
          r.length && "BR" == r[r.length - 1].tagName && M(r[r.length - 1]).remove(), M(t).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function () {
            this.parentNode == t && M(this).replaceWith(M(this).html() + (h.node.isEmpty(this) ? "" : "<br>"));
          });

          for (var o, i = h.node.contents(t)[0]; i && !h.node.isList(i);) o = i.nextSibling, M(n).append(i), i = o;

          for (n = t.previousSibling; i;) o = i.nextSibling, M(n).append(i), i = o;

          1 < (r = h.node.contents(n)).length && "BR" === r[r.length - 1].tagName && M(r[r.length - 1]).remove(), M(t).remove();
        } else {
          var a = E(t);

          if (M(e).replaceWith(M.FE.MARKERS), a.parentNode && "LI" == a.parentNode.tagName) {
            var s = a.previousSibling;
            h.node.isBlock(s) ? (M(t).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function () {
              this.parentNode == t && M(this).replaceWith(M(this).html() + (h.node.isEmpty(this) ? "" : "<br>"));
            }), M(s).append(M(t).html())) : M(a).before(M(t).html());
          } else {
            var l = h.html.defaultTag();
            l && 0 === M(t).find(h.html.blockTagsQuery()).length ? M(a).before("<" + l + ">" + M(t).html() + "</" + l + ">") : M(a).before(M(t).html());
          }

          M(t).remove(), h.html.wrap(), 0 === M(a).find("li").length && M(a).remove();
        }
      },
      _del: function (e) {
        var t,
            n = m(e),
            r = n.nextSibling;

        if (r) {
          (t = h.node.contents(r)).length && "BR" == t[0].tagName && M(t[0]).remove(), M(r).find(h.html.blockTagsQuery()).not("ol, ul, table").each(function () {
            this.parentNode == r && M(this).replaceWith(M(this).html() + (h.node.isEmpty(this) ? "" : "<br>"));
          });

          for (var o, i = e, a = h.node.contents(r)[0]; a && !h.node.isList(a);) o = a.nextSibling, M(i).after(a), i = a, a = o;

          for (; a;) o = a.nextSibling, M(n).append(a), a = o;

          M(e).replaceWith(M.FE.MARKERS), M(r).remove();
        } else {
          for (var s = n; !s.nextSibling && s != h.el;) s = s.parentNode;

          if (s == h.el) return !1;
          if (s = s.nextSibling, h.node.isBlock(s)) M.FE.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (M(e).replaceWith(M.FE.MARKERS), (t = h.node.contents(n)).length && "BR" == t[t.length - 1].tagName && M(t[t.length - 1]).remove(), M(n).append(M(s).html()), M(s).remove());else for ((t = h.node.contents(n)).length && "BR" == t[t.length - 1].tagName && M(t[t.length - 1]).remove(), M(e).replaceWith(M.FE.MARKERS); s && !h.node.isBlock(s) && "BR" != s.tagName;) M(n).append(M(s)), s = s.nextSibling;
        }
      }
    };
  }, M.FE.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], M.FE.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], M.FE.MODULES.cursor = function (u) {
    function i(e) {
      return !!e && (!!u.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? i(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && i(e.parentNode)));
    }

    function a(e) {
      return !!e && (!!u.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? a(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !u.node.hasClass(e.parentNode, "fr-inner")) || a(e.parentNode))));
    }

    function g(e, t) {
      return !!e && e != u.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType == Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? g(e.previousSibling, t) : !e.previousSibling && (e.parentNode == t || g(e.parentNode, t)));
    }

    function h(e, t) {
      return !!e && e != u.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType == Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? h(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" != e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode == t || h(e.parentNode, t)));
    }

    function s(e) {
      return 0 < M(e).parentsUntil(u.$el, "LI").length && 0 === M(e).parentsUntil("LI", "TABLE").length;
    }

    function d(e, t) {
      var n = new RegExp((t ? "^" : "") + "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})" + (t ? "" : "$"), "i"),
          r = e.match(n);
      return r ? r[0].length : 1;
    }

    function c(e) {
      for (var t, n = e; !n.previousSibling;) if (n = n.parentNode, u.node.isElement(n)) return !1;

      if (n = n.previousSibling, !u.node.isBlock(n) && u.node.isEditable(n)) {
        for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && !u.node.isDeletable(n) && t.length && u.node.isEditable(n);) n = t[t.length - 1], t = u.node.contents(n);

        if (n.nodeType == Node.TEXT_NODE) {
          var r = n.textContent,
              o = r.length;
          if (r.length && "\n" === r[r.length - 1]) return n.textContent = r.substring(0, o - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), c(e);
          if (u.opts.tabSpaces && r.length >= u.opts.tabSpaces) 0 === r.substr(r.length - u.opts.tabSpaces, r.length - 1).replace(/ /g, "").replace(new RegExp(M.FE.UNICODE_NBSP, "g"), "").length && (o = r.length - u.opts.tabSpaces + 1);
          n.textContent = r.substring(0, o - d(r));
          var i = r.length != n.textContent.length;
          if (0 === n.textContent.length) {
            if (i && u.opts.keepFormatOnDelete) M(n).after(M.FE.INVISIBLE_SPACE + M.FE.MARKERS);else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || u.node.isBlock(n.parentNode) || u.node.isElement(n.parentNode) || !u.node.isDeletable(n.parentNode)) {
              for (; !u.node.isElement(n.parentNode) && u.node.isEmpty(n.parentNode) && u.node.isDeletable(n.parentNode);) {
                var a = n;
                n = n.parentNode, a.parentNode.removeChild(a);
              }

              M(n).after(M.FE.MARKERS), u.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" == n.previousSibling.tagName && M(e).after("<br>"), n.parentNode.removeChild(n);
            } else M(n.parentNode).after(M.FE.MARKERS), M(n.parentNode).remove();
          } else M(n).after(M.FE.MARKERS);
        } else u.node.isDeletable(n) ? (M(n).after(M.FE.MARKERS), M(n).remove()) : e.nextSibling && "BR" == e.nextSibling.tagName && u.node.isVoid(n) && "BR" != n.tagName ? (M(e.nextSibling).remove(), M(e).replaceWith(M.FE.MARKERS)) : !1 !== u.events.trigger("node.remove", [M(n)]) && (M(n).after(M.FE.MARKERS), M(n).remove());
      } else if (M.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n))) {
        if (u.node.isDeletable(n)) M(e).replaceWith(M.FE.MARKERS), M(n).remove();else if (u.node.isEmpty(n) && !u.node.isList(n)) M(n).remove(), M(e).replaceWith(M.FE.MARKERS);else {
          for (u.node.isList(n) && (n = M(n).find("li:last").get(0)), (t = u.node.contents(n)) && "BR" == t[t.length - 1].tagName && M(t[t.length - 1]).remove(), t = u.node.contents(n); t && u.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = u.node.contents(n);

          M(n).append(M.FE.MARKERS);

          for (var s = e; !s.previousSibling;) s = s.parentNode;

          for (; s && "BR" !== s.tagName && !u.node.isBlock(s);) {
            var l = s;
            s = s.nextSibling, M(n).append(l);
          }

          s && "BR" == s.tagName && M(s).remove(), M(e).remove();
        }
      } else e.nextSibling && "BR" == e.nextSibling.tagName && M(e.nextSibling).remove();
    }

    function l(e) {
      var t = 0 < M(e).parentsUntil(u.$el, "BLOCKQUOTE").length,
          n = u.node.deepestParent(e, [], !t);

      if (n && "BLOCKQUOTE" == n.tagName) {
        var r = u.node.deepestParent(e, [M(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
        r && r.nextSibling && (n = r);
      }

      if (null !== n) {
        var o,
            i = n.nextSibling;
        if (u.node.isBlock(n) && (u.node.isEditable(n) || u.node.isDeletable(n)) && i && M.FE.NO_DELETE_TAGS.indexOf(i.tagName) < 0) if (u.node.isDeletable(i)) M(i).remove(), M(e).replaceWith(M.FE.MARKERS);else if (u.node.isBlock(i) && u.node.isEditable(i)) {
          if (u.node.isList(i)) {
            if (u.node.isEmpty(n, !0)) M(n).remove(), M(i).find("li:first").prepend(M.FE.MARKERS);else {
              var a = M(i).find("li:first");
              "BLOCKQUOTE" == n.tagName && (o = u.node.contents(n)).length && u.node.isBlock(o[o.length - 1]) && (n = o[o.length - 1]), 0 === a.find("ul, ol").length && (M(e).replaceWith(M.FE.MARKERS), a.find(u.html.blockTagsQuery()).not("ol, ul, table").each(function () {
                this.parentNode == a.get(0) && M(this).replaceWith(M(this).html() + (u.node.isEmpty(this) ? "" : "<br>"));
              }), M(n).append(u.node.contents(a.get(0))), a.remove(), 0 === M(i).find("li").length && M(i).remove());
            }
          } else {
            if ((o = u.node.contents(i)).length && "BR" == o[0].tagName && M(o[0]).remove(), "BLOCKQUOTE" != i.tagName && "BLOCKQUOTE" == n.tagName) for (o = u.node.contents(n); o.length && u.node.isBlock(o[o.length - 1]);) n = o[o.length - 1], o = u.node.contents(n);else if ("BLOCKQUOTE" == i.tagName && "BLOCKQUOTE" != n.tagName) for (o = u.node.contents(i); o.length && u.node.isBlock(o[0]);) i = o[0], o = u.node.contents(i);
            M(e).replaceWith(M.FE.MARKERS), M(n).append(i.innerHTML), M(i).remove();
          }
        } else {
          for (M(e).replaceWith(M.FE.MARKERS); i && "BR" !== i.tagName && !u.node.isBlock(i) && u.node.isEditable(i);) {
            var s = i;
            i = i.nextSibling, M(n).append(s);
          }

          i && "BR" == i.tagName && u.node.isEditable(i) && M(i).remove();
        }
      }
    }

    function n(e) {
      for (var t, n = e; !n.nextSibling;) if (n = n.parentNode, u.node.isElement(n)) return !1;

      if ("BR" == (n = n.nextSibling).tagName && u.node.isEditable(n)) if (n.nextSibling) {
        if (u.node.isBlock(n.nextSibling) && u.node.isEditable(n.nextSibling)) {
          if (!(M.FE.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void M(n).remove();
          n = n.nextSibling, M(n.previousSibling).remove();
        }
      } else if (i(n)) {
        if (s(e)) u.cursorLists._del(e);else u.node.deepestParent(n) && ((!u.node.isEmpty(u.node.blockParent(n)) || (u.node.blockParent(n).nextSibling && M.FE.NO_DELETE_TAGS.indexOf(u.node.blockParent(n).nextSibling.tagName)) < 0) && M(n).remove(), l(e));
        return;
      }

      if (!u.node.isBlock(n) && u.node.isEditable(n)) {
        for (t = u.node.contents(n); n.nodeType != Node.TEXT_NODE && t.length && !u.node.isDeletable(n) && u.node.isEditable(n);) n = t[0], t = u.node.contents(n);

        n.nodeType == Node.TEXT_NODE ? (M(n).before(M.FE.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(d(n.textContent, !0), n.textContent.length))) : u.node.isDeletable(n) ? (M(n).before(M.FE.MARKERS), M(n).remove()) : !1 !== u.events.trigger("node.remove", [M(n)]) && (M(n).before(M.FE.MARKERS), M(n).remove()), M(e).remove();
      } else if (M.FE.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n))) if (u.node.isDeletable(n)) M(e).replaceWith(M.FE.MARKERS), M(n).remove();else if (u.node.isList(n)) e.previousSibling ? (M(n).find("li:first").prepend(e), u.cursorLists._backspace(e)) : (M(n).find("li:first").prepend(M.FE.MARKERS), M(e).remove());else if ((t = u.node.contents(n)) && "BR" == t[0].tagName && M(t[0]).remove(), t && "BLOCKQUOTE" == n.tagName) {
        var r = t[0];

        for (M(e).before(M.FE.MARKERS); r && "BR" != r.tagName;) {
          var o = r;
          r = r.nextSibling, M(e).before(o);
        }

        r && "BR" == r.tagName && M(r).remove();
      } else M(e).after(M(n).html()).after(M.FE.MARKERS), M(n).remove();
    }

    function f() {
      for (var e = u.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t]);
    }

    function p(e, t, n) {
      var r,
          o = u.node.deepestParent(e, [], !n);
      if (o && "BLOCKQUOTE" == o.tagName) return h(e, o) ? (r = u.html.defaultTag(), t ? M(e).replaceWith("<br>" + M.FE.MARKERS) : r ? M(o).after("<" + r + ">" + M.FE.MARKERS + "<br></" + r + ">") : M(o).after(M.FE.MARKERS + "<br>"), M(e).remove()) : m(e, t, n), !1;
      if (null == o) (r = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? M(e).replaceWith("<" + r + ">" + M.FE.MARKERS + "<br></" + r + ">") : !e.previousSibling || M(e.previousSibling).is("br") || e.nextSibling ? M(e).replaceWith("<br>" + M.FE.MARKERS) : M(e).replaceWith("<br>" + M.FE.MARKERS + "<br>");else {
        var i = e,
            a = "";
        "PRE" != o.tagName || e.nextSibling || (t = !0), u.node.isBlock(o) && !t || (a = "<br/>");
        var s,
            l = "",
            d = "",
            c = "",
            f = "";
        (r = u.html.defaultTag()) && u.node.isBlock(o) && (c = "<" + r + ">", f = "</" + r + ">", o.tagName == r.toUpperCase() && (c = u.node.openTagString(M(o).clone().removeAttr("id").get(0))));

        do {
          if (i = i.parentNode, !t || i != o || t && !u.node.isBlock(o)) if (l += u.node.closeTagString(i), i == o && u.node.isBlock(o)) d = c + d;else {
            var p = "A" == i.tagName && h(e, i) ? "fr-to-remove" : "";
            d = u.node.openTagString(M(i).clone().addClass(p).get(0)) + d;
          }
        } while (i != o);

        a = l + a + d + (e.parentNode == o && u.node.isBlock(o) ? "" : M.FE.INVISIBLE_SPACE) + M.FE.MARKERS, u.node.isBlock(o) && !M(o).find("*:last").is("br") && M(o).append("<br/>"), M(e).after('<span id="fr-break"></span>'), M(e).remove(), o.nextSibling && !u.node.isBlock(o.nextSibling) || u.node.isBlock(o) || M(o).after("<br>"), s = (s = !t && u.node.isBlock(o) ? u.node.openTagString(o) + M(o).html() + f : u.node.openTagString(o) + M(o).html() + u.node.closeTagString(o)).replace(/<span id="fr-break"><\/span>/g, a), M(o).replaceWith(s);
      }
    }

    function m(e, t, n) {
      var r = u.node.deepestParent(e, [], !n);
      if (null == r) u.html.defaultTag() && e.parentNode === u.el ? M(e).replaceWith("<" + u.html.defaultTag() + ">" + M.FE.MARKERS + "<br></" + u.html.defaultTag() + ">") : (e.nextSibling && !u.node.isBlock(e.nextSibling) || M(e).after("<br>"), M(e).replaceWith("<br>" + M.FE.MARKERS));else {
        var o = e,
            i = "";
        "PRE" == r.tagName && (t = !0), u.node.isBlock(r) && !t || (i = "<br>");
        var a = "",
            s = "";

        do {
          var l = o;
          if (o = o.parentNode, "BLOCKQUOTE" == r.tagName && u.node.isEmpty(l) && !u.node.hasClass(l, "fr-marker") && 0 < M(l).find(e).length && M(l).after(e), "BLOCKQUOTE" != r.tagName || !h(e, o) && !g(e, o)) if (!t || o != r || t && !u.node.isBlock(r)) {
            a += u.node.closeTagString(o);
            var d = "A" == o.tagName && h(e, o) ? "fr-to-remove" : "";
            s = u.node.openTagString(M(o).clone().addClass(d).removeAttr("id").get(0)) + s;
          } else "BLOCKQUOTE" == r.tagName && t && (s = a = "");
        } while (o != r);

        var c = r == e.parentNode && u.node.isBlock(r) || e.nextSibling;
        if ("BLOCKQUOTE" == r.tagName) {
          if (e.previousSibling && u.node.isBlock(e.previousSibling) && e.nextSibling && "BR" == e.nextSibling.tagName && (M(e.nextSibling).after(e), e.nextSibling && "BR" == e.nextSibling.tagName && M(e.nextSibling).remove()), t) i = a + i + M.FE.MARKERS + s;else {
            var f = u.html.defaultTag();
            i = a + i + (f ? "<" + f + ">" : "") + M.FE.MARKERS + "<br>" + (f ? "</" + f + ">" : "") + s;
          }
        } else i = a + i + s + (c ? "" : M.FE.INVISIBLE_SPACE) + M.FE.MARKERS;
        M(e).replaceWith('<span id="fr-break"></span>');
        var p = u.node.openTagString(r) + M(r).html() + u.node.closeTagString(r);
        p = p.replace(/<span id="fr-break"><\/span>/g, i), M(r).replaceWith(p);
      }
    }

    return {
      enter: function (t) {
        var n = u.markers.insert();
        if (!n) return !0;
        u.el.normalize();
        var r = !1;
        0 < M(n).parentsUntil(u.$el, "BLOCKQUOTE").length && (r = !0), M(n).parentsUntil(u.$el, "TD, TH").length && (r = !1), i(n) ? !s(n) || t || r ? p(n, t, r) : u.cursorLists._endEnter(n) : a(n) ? !s(n) || t || r ? function e(t, n, r) {
          var o,
              i = u.node.deepestParent(t, [], !r);
          if (i && "TABLE" == i.tagName) return M(i).find("td:first, th:first").prepend(t), e(t, n, r);
          if (i && "BLOCKQUOTE" == i.tagName) if (g(t, i)) {
            if (!n) return (o = u.html.defaultTag()) ? M(i).before("<" + o + ">" + M.FE.MARKERS + "<br></" + o + ">") : M(i).before(M.FE.MARKERS + "<br>"), M(t).remove(), !1;
          } else h(t, i) ? p(t, n, !0) : m(t, n, !0);
          if (null == i) (o = u.html.defaultTag()) && u.node.isElement(t.parentNode) ? M(t).replaceWith("<" + o + ">" + M.FE.MARKERS + "<br></" + o + ">") : M(t).replaceWith("<br>" + M.FE.MARKERS);else {
            if (u.node.isBlock(i)) {
              if ("PRE" == i.tagName && (n = !0), n) M(t).remove(), M(i).prepend("<br>" + M.FE.MARKERS);else {
                if (u.node.isEmpty(i, !0)) return p(t, n, r);

                if (u.opts.keepFormatOnDelete) {
                  for (var a = t, s = M.FE.INVISIBLE_SPACE; a != i && !u.node.isElement(a);) a = a.parentNode, s = u.node.openTagString(a) + s + u.node.closeTagString(a);

                  M(i).before(s);
                } else M(i).before(u.node.openTagString(M(i).clone().removeAttr("id").get(0)) + "<br>" + u.node.closeTagString(i));
              }
            } else M(i).before("<br>");
            M(t).remove();
          }
        }(n, t, r) : u.cursorLists._startEnter(n) : !s(n) || t || r ? m(n, t, r) : u.cursorLists._middleEnter(n), u.$el.find(".fr-to-remove").each(function () {
          for (var e = u.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType == Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));

          M(this).replaceWith(this.innerHTML);
        }), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore();
      },
      backspace: function () {
        var e = !1,
            t = u.markers.insert();
        if (!t) return !0;

        for (var n = t.parentNode; n && !u.node.isElement(n);) {
          if ("false" === n.getAttribute("contenteditable")) return M(t).replaceWith(M.FE.MARKERS), u.selection.restore(), !1;
          if ("true" === n.getAttribute("contenteditable")) break;
          n = n.parentNode;
        }

        u.el.normalize();
        var r = t.previousSibling;

        if (r) {
          var o = r.textContent;
          o && o.length && 8203 == o.charCodeAt(o.length - 1) && (1 == o.length ? M(r).remove() : r.textContent = r.textContent.substr(0, o.length - d(o)));
        }

        return i(t) ? e = c(t) : a(t) ? s(t) && g(t, M(t).parents("li:first").get(0)) ? u.cursorLists._backspace(t) : function (e) {
          for (var t = 0 < M(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t), r = n; n && !n.previousSibling && "BLOCKQUOTE" != n.tagName && n.parentElement != u.el && !u.node.hasClass(n.parentElement, "fr-inner") && M.FE.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;

          if (n && "BLOCKQUOTE" == n.tagName) {
            var o = u.node.deepestParent(e, [M(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
            o && o.previousSibling && (r = n = o);
          }

          if (null !== n) {
            var i,
                a = n.previousSibling;
            if (u.node.isBlock(n) && u.node.isEditable(n) && a && M.FE.NO_DELETE_TAGS.indexOf(a.tagName) < 0) if (u.node.isDeletable(a)) M(a).remove(), M(e).replaceWith(M.FE.MARKERS);else if (u.node.isEditable(a)) if (u.node.isBlock(a)) {
              if (u.node.isEmpty(a) && !u.node.isList(a)) M(a).remove(), M(e).after(u.opts.keepFormatOnDelete ? M.FE.INVISIBLE_SPACE : "");else {
                if (u.node.isList(a) && (a = M(a).find("li:last").get(0)), (i = u.node.contents(a)).length && "BR" == i[i.length - 1].tagName && M(i[i.length - 1]).remove(), "BLOCKQUOTE" == a.tagName && "BLOCKQUOTE" != n.tagName) for (i = u.node.contents(a); i.length && u.node.isBlock(i[i.length - 1]);) a = i[i.length - 1], i = u.node.contents(a);else if ("BLOCKQUOTE" != a.tagName && "BLOCKQUOTE" == r.tagName) for (i = u.node.contents(r); i.length && u.node.isBlock(i[0]);) r = i[0], i = u.node.contents(r);
                if (u.node.isEmpty(n)) M(e).remove(), u.selection.setAtEnd(a, !0);else {
                  M(e).replaceWith(M.FE.MARKERS);
                  var s = a.childNodes;
                  u.node.isBlock(s[s.length - 1]) ? M(s[s.length - 1]).append(r.innerHTML) : M(a).append(r.innerHTML);
                }
                M(r).remove(), u.node.isEmpty(n) && M(n).remove();
              }
            } else M(e).replaceWith(M.FE.MARKERS), "BLOCKQUOTE" == n.tagName && a.nodeType == Node.ELEMENT_NODE ? M(a).remove() : (M(a).after(u.node.isEmpty(n) ? "" : M(n).html()), M(n).remove(), "BR" == a.tagName && M(a).remove());
          }
        }(t) : e = c(t), M(t).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore(), e;
      },
      del: function () {
        var e = u.markers.insert();
        if (!e) return !1;
        if (u.el.normalize(), i(e)) {
          if (s(e)) {
            if (0 === M(e).parents("li:first").find("ul, ol").length) u.cursorLists._del(e);else {
              var t = M(e).parents("li:first").find("ul:first, ol:first").find("li:first");
              (t = t.find(u.html.blockTagsQuery()).get(-1) || t).prepend(e), u.cursorLists._backspace(e);
            }
          } else l(e);
        } else a(e), n(e);
        M(e).remove(), f(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore();
      },
      isAtEnd: h,
      isAtStart: g
    };
  }, M.FE.ENTER_P = 0, M.FE.ENTER_DIV = 1, M.FE.ENTER_BR = 2, M.FE.KEYCODE = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    FF_SEMICOLON: 59,
    FF_EQUALS: 61,
    QUESTION_MARK: 63,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    FF_HYPHEN: 173,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    HYPHEN: 189,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    TILDE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    IME: 229
  }, M.extend(M.FE.DEFAULTS, {
    enter: M.FE.ENTER_P,
    multiLine: !0,
    tabSpaces: 0
  }), M.FE.MODULES.keys = function (l) {
    var d,
        n,
        r,
        c = !1;

    function e() {
      if (l.browser.mozilla && l.selection.isCollapsed() && !c) {
        var e = l.selection.ranges(0),
            t = e.startContainer,
            n = e.startOffset;
        t && t.nodeType == Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 == t.textContent.charCodeAt(n - 1) && (l.selection.save(), l.spaces.normalize(), l.selection.restore());
      }
    }

    function t() {
      l.selection.isFull() && setTimeout(function () {
        var e = l.html.defaultTag();
        e ? l.$el.html("<" + e + ">" + M.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(M.FE.MARKERS + "<br/>"), l.selection.restore(), l.placeholder.refresh(), l.button.bulkRefresh(), l.undo.saveStep();
      }, 0);
    }

    function o() {
      c = !1;
    }

    function i() {
      c = !1;
    }

    function f() {
      var e = l.html.defaultTag();
      e ? l.$el.html("<" + e + ">" + M.FE.MARKERS + "<br/></" + e + ">") : l.$el.html(M.FE.MARKERS + "<br/>"), l.selection.restore();
    }

    function a(e) {
      var t = l.selection.element();
      if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
      if (e && h(e.which)) return p(), !0;
      l.events.disableBlur(), null;
      var n = e.which;
      if (16 === n) return !0;
      if ((d = n) === M.FE.KEYCODE.IME) return c = !0;
      c = !1;
      var r,
          o,
          i,
          a = m(n) && !g(e) && !e.altKey,
          s = n == M.FE.KEYCODE.BACKSPACE || n == M.FE.KEYCODE.DELETE;
      if ((!(e.shiftKey && (33 === n || 34 === n || 35 === n || 36 === n)) && l.selection.isFull() && !l.opts.keepFormatOnDelete && !l.placeholder.isVisible() || s && l.placeholder.isVisible() && l.opts.keepFormatOnDelete) && (a || s) && (f(), !m(n))) return e.preventDefault(), !0;
      n == M.FE.KEYCODE.ENTER ? e.shiftKey ? ((i = e).preventDefault(), i.stopPropagation(), l.opts.multiLine && (l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter(!0))) : (o = e, l.opts.multiLine ? (l.helpers.isIOS() || (o.preventDefault(), o.stopPropagation()), l.selection.isCollapsed() || l.selection.remove(), l.cursor.enter()) : (o.preventDefault(), o.stopPropagation())) : n === M.FE.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey) ? setTimeout(function () {
        l.events.disableBlur(), l.events.focus();
      }, 0) : n != M.FE.KEYCODE.BACKSPACE || g(e) || e.altKey ? n != M.FE.KEYCODE.DELETE || g(e) || e.altKey || e.shiftKey ? n == M.FE.KEYCODE.SPACE ? function (e) {
        var t = l.selection.element();

        if (!l.helpers.isMobile() && t && "A" == t.tagName) {
          e.preventDefault(), e.stopPropagation(), l.selection.isCollapsed() || l.selection.remove();
          var n = l.markers.insert();

          if (n) {
            var r = n.previousSibling;
            !n.nextSibling && n.parentNode && "A" == n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;" + M.FE.MARKERS), n.parentNode.removeChild(n)) : (r && r.nodeType == Node.TEXT_NODE && 1 == r.textContent.length && 160 == r.textContent.charCodeAt(0) ? r.textContent = r.textContent + " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = M.FE.MARKERS), l.selection.restore();
          }
        }
      }(e) : n == M.FE.KEYCODE.TAB ? function (e) {
        if (0 < l.opts.tabSpaces) if (l.selection.isCollapsed()) {
          l.undo.saveStep(), e.preventDefault(), e.stopPropagation();

          for (var t = "", n = 0; n < l.opts.tabSpaces; n++) t += "&nbsp;";

          l.html.insert(t), l.placeholder.refresh(), l.undo.saveStep();
        } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? l.commands.outdent() : l.commands.indent();
      }(e) : g(e) || !m(e.which) || l.selection.isCollapsed() || e.ctrlKey || e.altKey || l.selection.remove() : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : ((r = e).preventDefault(), r.stopPropagation(), "" === l.selection.text() ? l.cursor.del() : l.selection.remove(), l.placeholder.refresh()) : l.placeholder.isVisible() ? (l.opts.keepFormatOnDelete || f(), e.preventDefault(), e.stopPropagation()) : function (e) {
        if (l.selection.isCollapsed()) {
          if (l.cursor.backspace(), l.helpers.isIOS()) {
            var t = l.selection.ranges(0);
            t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), l.selection.get().modify("move", "forward", "character");
          } else e.preventDefault(), e.stopPropagation();
        } else e.preventDefault(), e.stopPropagation(), l.selection.remove();
        l.placeholder.refresh();
      }(e), l.events.enableBlur();
    }

    function s() {
      if (!l.$wp) return !0;
      var e;
      l.opts.height || l.opts.heightMax ? (e = l.position.getBoundingRect().top, l.opts.iframe && (e += l.$iframe.offset().top), e > l.$wp.offset().top - l.helpers.scrollTop() + l.$wp.height() - 20 && l.$wp.scrollTop(e + l.$wp.scrollTop() - (l.$wp.height() + l.$wp.offset().top) + l.helpers.scrollTop() + 20)) : (e = l.position.getBoundingRect().top, l.opts.toolbarBottom && (e += l.opts.toolbarStickyOffset), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), (e += l.opts.toolbarStickyOffset) > l.o_win.innerHeight - 20 && M(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.o_win.innerHeight + 20), e = l.position.getBoundingRect().top, l.opts.toolbarBottom || (e -= l.opts.toolbarStickyOffset), l.opts.iframe && (e += l.$iframe.offset().top, e -= l.helpers.scrollTop()), e < l.$tb.height() + 20 && M(l.o_win).scrollTop(e + l.helpers.scrollTop() - l.$tb.height() - 20));
    }

    function p() {
      var e,
          t = l.selection.element();
      !function (e) {
        if (!e) return !1;
        var t = e.innerHTML;
        return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length);
      }(t) || l.node.hasClass(t, "fr-marker") || "IFRAME" == t.tagName || (e = t, l.helpers.isIOS() && 0 !== ((e.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length) || (l.selection.save(), function (e) {
        for (var t = l.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, l.node.filter(function (e) {
          return /\u200B/gi.test(e.textContent);
        }), !1); t.nextNode();) {
          var n = t.currentNode;
          n.textContent = n.textContent.replace(/\u200B/gi, "");
        }
      }(t), l.selection.restore());
    }

    function u(e) {
      var t = l.selection.element();
      if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
      if (e && 0 === e.which && d && (e.which = d), l.helpers.isAndroid() && l.browser.mozilla) return !0;
      if (c) return !1;
      if (e && l.helpers.isIOS() && e.which == M.FE.KEYCODE.ENTER && l.doc.execCommand("undo"), !l.selection.isCollapsed()) return !0;
      if (e && (e.which === M.FE.KEYCODE.META || e.which == M.FE.KEYCODE.CTRL)) return !0;
      if (e && h(e.which)) return !0;
      if (e && !l.helpers.isIOS() && (e.which == M.FE.KEYCODE.ENTER || e.which == M.FE.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !l.browser.msie)) try {
        s();
      } catch (n) {}
      p();
    }

    function g(e) {
      if (-1 != navigator.userAgent.indexOf("Mac OS X")) {
        if (e.metaKey && !e.altKey) return !0;
      } else if (e.ctrlKey && !e.altKey) return !0;

      return !1;
    }

    function h(e) {
      if (e >= M.FE.KEYCODE.ARROW_LEFT && e <= M.FE.KEYCODE.ARROW_DOWN) return !0;
    }

    function m(e) {
      if (e >= M.FE.KEYCODE.ZERO && e <= M.FE.KEYCODE.NINE) return !0;
      if (e >= M.FE.KEYCODE.NUM_ZERO && e <= M.FE.KEYCODE.NUM_MULTIPLY) return !0;
      if (e >= M.FE.KEYCODE.A && e <= M.FE.KEYCODE.Z) return !0;
      if (l.browser.webkit && 0 === e) return !0;

      switch (e) {
        case M.FE.KEYCODE.SPACE:
        case M.FE.KEYCODE.QUESTION_MARK:
        case M.FE.KEYCODE.NUM_PLUS:
        case M.FE.KEYCODE.NUM_MINUS:
        case M.FE.KEYCODE.NUM_PERIOD:
        case M.FE.KEYCODE.NUM_DIVISION:
        case M.FE.KEYCODE.SEMICOLON:
        case M.FE.KEYCODE.FF_SEMICOLON:
        case M.FE.KEYCODE.DASH:
        case M.FE.KEYCODE.EQUALS:
        case M.FE.KEYCODE.FF_EQUALS:
        case M.FE.KEYCODE.COMMA:
        case M.FE.KEYCODE.PERIOD:
        case M.FE.KEYCODE.SLASH:
        case M.FE.KEYCODE.APOSTROPHE:
        case M.FE.KEYCODE.SINGLE_QUOTE:
        case M.FE.KEYCODE.OPEN_SQUARE_BRACKET:
        case M.FE.KEYCODE.BACKSLASH:
        case M.FE.KEYCODE.CLOSE_SQUARE_BRACKET:
          return !0;

        default:
          return !1;
      }
    }

    function E(e) {
      var t = e.which;
      if (g(e) || 37 <= t && t <= 40 || !m(t) && t != M.FE.KEYCODE.DELETE && t != M.FE.KEYCODE.BACKSPACE && t != M.FE.KEYCODE.ENTER && t != M.FE.KEYCODE.IME) return !0;
      n || (r = l.snapshot.get(), l.undo.canDo() || l.undo.saveStep()), clearTimeout(n), n = setTimeout(function () {
        n = null, l.undo.saveStep();
      }, Math.max(250, l.opts.typingTimer));
    }

    function v(e) {
      var t = e.which;
      if (g(e) || 37 <= t && t <= 40) return !0;
      r && n ? (l.undo.saveStep(r), r = null) : void 0 !== t && 0 !== t || r || n || l.undo.saveStep();
    }

    function b(e) {
      if (e && "BR" == e.tagName) return !1;

      try {
        return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 == e.childNodes.length && e.childNodes[0].getAttribute && ("false" == e.childNodes[0].getAttribute("contenteditable") || l.node.hasClass(e.childNodes[0], "fr-img-caption"));
      } catch (t) {
        return !1;
      }
    }

    function S(e) {
      var t = l.el.childNodes,
          n = l.html.defaultTag();
      return !(!e.target || e.target === l.el) || 0 === t.length || void (l.$el.outerHeight() - e.offsetY <= 10 ? b(t[t.length - 1]) && (n ? l.$el.append("<" + n + ">" + M.FE.MARKERS + "<br></" + n + ">") : l.$el.append(M.FE.MARKERS + "<br>"), l.selection.restore(), s()) : e.offsetY <= 10 && b(t[0]) && (n ? l.$el.prepend("<" + n + ">" + M.FE.MARKERS + "<br></" + n + ">") : l.$el.prepend(M.FE.MARKERS + "<br>"), l.selection.restore(), s()));
    }

    function T() {
      n && clearTimeout(n);
    }

    return {
      _init: function () {
        l.events.on("keydown", E), l.events.on("input", e), l.events.on("mousedown", i), l.events.on("keyup input", v), l.events.on("keypress", o), l.events.on("keydown", a), l.events.on("keyup", u), l.events.on("destroy", T), l.events.on("html.inserted", u), l.events.on("cut", t), l.events.on("click", S);
      },
      ctrlKey: g,
      isCharacter: m,
      isArrow: h,
      forceUndo: function () {
        n && (clearTimeout(n), l.undo.saveStep(), r = null);
      },
      isIME: function () {
        return c;
      },
      isBrowserAction: function (e) {
        var t = e.which;
        return g(e) || t == M.FE.KEYCODE.F5;
      },
      positionCaret: s
    };
  }, M.FE.MODULES.accessibility = function (f) {
    var i = !0;

    function s(t) {
      t && t.length && !f.$el.find('[contenteditable="true"]').is(":focus") && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function () {
        var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
        e.events.blurActive() && e.events.trigger("blur"), setTimeout(function () {
          e.events.enableBlur();
        }, 100);
      }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.focus(), f.shared.$f_el = t);
    }

    function p(e, t) {
      var n = t ? "last" : "first",
          r = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[n]();
      if (r.length) return s(r), !0;
    }

    function a(e) {
      return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.focus(), !0;
    }

    function u(e, t) {
      var n = e.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(t ? ":last" : ":first");
      if (n.length) return a(n);

      if (f.shared.with_kb) {
        var r = e.find(".fr-active-item:visible:first");
        if (r.length) return a(r);
        var o = e.find("[tabIndex]:visible:first");
        if (o.length) return a(o);
      }
    }

    function t() {
      0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save();
    }

    function l() {
      var e = f.popups.areVisible();

      if (e) {
        var t = e.find(".fr-buttons");
        return t.find("button:focus, .fr-group span:focus").length ? !p(e.data("instance").$tb) : !p(t);
      }

      return !p(f.$tb);
    }

    function d() {
      var e = null;
      return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e;
    }

    function n(e, t, n) {
      if (f.shared.$f_el) {
        var r = d();
        r && (f.button.click(r), f.shared.$f_el = r);
        var o = e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),
            i = o.index(f.shared.$f_el);

        if (0 === i && !n || i == o.length - 1 && n) {
          var a;

          if (t) {
            if (e.parent().is(".fr-popup")) a = !u(e.parent().children().not(".fr-buttons"), !n);
            !1 === a && (f.shared.$f_el = null);
          }

          t && !1 === a || p(e, !n);
        } else s(M(o.get(i + (n ? 1 : -1))));

        return !1;
      }
    }

    function c(e, t) {
      return n(e, t, !0);
    }

    function g(e, t) {
      return n(e, t);
    }

    function h(e) {
      if (f.shared.$f_el) {
        var t;
        if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return s(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1;
        if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), s(t), !1;
      }
    }

    function m() {
      if (f.shared.$f_el) {
        if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el);else if (f.shared.$f_el.is("button.fr-back")) {
          f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
          var e = f.popups.areVisible(f);
          e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), v(e);
        } else {
          if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-popup")) {
            var t = f.popups.areVisible(f);
            t && t.data("popup-button", f.shared.$f_el);
          } else if (f.shared.$f_el.attr("data-modal")) {
            var n = f.modals.areVisible(f);
            n && n.data("modal-button", f.shared.$f_el);
          }

          f.shared.$f_el = null;
        }
        return !1;
      }
    }

    function E() {
      f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.browser.msie || f.$el.focus(), f.events.focus());
    }

    function r(r) {
      r && r.length && (f.events.$on(r, "keydown", function (e) {
        if (!M(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
        var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
        f.shared.with_kb = !0;
        var n = t.accessibility.exec(e, r);
        return f.shared.with_kb = !1, n;
      }, !0), f.browser.msie || f.events.$on(r, "mouseenter", "[tabIndex]", function (e) {
        var t = r.parents(".fr-popup").data("instance") || r.data("instance") || f;
        if (!i) return e.stopPropagation(), void e.preventDefault();
        var n = M(e.currentTarget);
        t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor();
      }, !0));
    }

    function v(e) {
      var t = e.data("popup-button");
      t && setTimeout(function () {
        s(t), e.data("popup-button", null);
      }, 0);
    }

    function o(e) {
      var t = f.popups.areVisible(e);
      t && t.data("popup-button", null);
    }

    function e(e) {
      var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;

      if (e.which == M.FE.KEYCODE.F10 && !t && !e.shiftKey && e.altKey) {
        f.shared.with_kb = !0;
        var n = f.popups.areVisible(f),
            r = !1;
        return n && (r = u(n.children().not(".fr-buttons"))), r || l(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1;
      }

      return !0;
    }

    return {
      _init: function () {
        f.$wp ? f.events.on("keydown", e, !0) : f.events.$on(f.$win, "keydown", e, !0), f.events.on("mousedown", function (e) {
          o(f), f.shared.$f_el && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null);
        }, !0), f.events.on("blur", function () {
          f.shared.$f_el = null, o(f);
        }, !0);
      },
      registerPopup: function (e) {
        var d,
            c,
            t = f.popups.get(e),
            n = (d = e, c = f.popups.get(d), {
          _tiKeydown: function (e) {
            var t = c.data("instance") || f;
            if (!1 === t.events.trigger("popup.tab", [e])) return !1;
            var n = e.which,
                r = c.find(":focus:first");

            if (M.FE.KEYCODE.TAB == n) {
              e.preventDefault();
              var o = c.children().not(".fr-buttons"),
                  i = o.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                  a = i.indexOf(this) + (e.shiftKey ? -1 : 1);
              if (0 <= a && a < i.length) return t.events.disableBlur(), M(i[a]).focus(), e.stopPropagation(), !1;
              var s = c.find(".fr-buttons");
              if (s.length && p(s, !!e.shiftKey)) return e.stopPropagation(), !1;
              if (u(o)) return e.stopPropagation(), !1;
            } else {
              if (M.FE.KEYCODE.ENTER != n || !e.target || "TEXTAREA" === e.target.tagName) return M.FE.KEYCODE.ESC == n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(d) && c.find(".fr-back:visible").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(c.find(".fr-back:visible:first")), v(c)) : t.popups.isVisible(d) && c.find(".fr-dismiss:visible").length ? t.button.exec(c.find(".fr-dismiss:visible:first")) : (t.popups.hide(d), t.opts.toolbarInline && t.toolbar.showInline(null, !0), v(c)), !1) : M.FE.KEYCODE.SPACE == n && (r.is(".fr-submit") || r.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(r), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : r.is("input[type=text], textarea") ? void e.stopPropagation() : M.FE.KEYCODE.SPACE == n && (r.is(".fr-link-attr") || r.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
              var l = null;
              0 < c.find(".fr-submit:visible").length ? l = c.find(".fr-submit:visible:first") : c.find(".fr-dismiss:visible").length && (l = c.find(".fr-dismiss:visible:first")), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l));
            }
          },
          _tiMouseenter: function () {
            var e = c.data("instance") || f;
            o(e);
          }
        });
        r(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function () {
          (t.data("instance") || f).accessibility.restoreSelection();
        }), f.popups.onShow(e, function () {
          i = !1, setTimeout(function () {
            i = !0;
          }, 0);
        });
      },
      registerToolbar: r,
      focusToolbarElement: s,
      focusToolbar: p,
      focusContent: u,
      focusPopup: function (r) {
        var o = r.children().not(".fr-buttons");
        o.data("mouseenter-event-set") || f.browser.msie || (f.events.$on(o, "mouseenter", "[tabIndex]", function (e) {
          var t = r.data("instance") || f;
          if (!i) return e.stopPropagation(), void e.preventDefault();
          var n = o.find(":focus:first");
          n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus());
        }), o.data("mouseenter-event-set", !0)), !u(o) && f.shared.with_kb && p(r.find(".fr-buttons"));
      },
      focusModal: function (e) {
        f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.$el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]:first").focus();
      },
      focusEditor: E,
      focusPopupButton: v,
      focusModalButton: function (e) {
        var t = e.data("modal-button");
        t && setTimeout(function () {
          s(t), e.data("modal-button", null);
        }, 0);
      },
      hasFocus: function () {
        return null != f.shared.$f_el;
      },
      exec: function (e, t) {
        var n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
            r = e.which,
            o = !1;
        return r != M.FE.KEYCODE.TAB || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ENTER && r != M.FE.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.ESC || n || e.shiftKey || e.altKey ? r != M.FE.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (o = l()) : o = function (e) {
          if (f.shared.$f_el) {
            var t = d();
            return t ? (f.button.click(t), s(t)) : e.parent().find(".fr-back:visible").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().find(".fr-back:visible:first")), v(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), v(e.parent()))) : E()), !1;
          }
        }(t) : o = m() : o = f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? m() : h(!0) : o = h() : o = g(t) : o = g(t, !0) : o = c(t) : o = c(t, !0), f.shared.$f_el || o !== undefined || (o = !0), !o && f.keys.isBrowserAction(e) && (o = !0), !!o || (e.preventDefault(), e.stopPropagation(), !1);
      },
      saveSelection: t,
      restoreSelection: function () {
        f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur());
      }
    };
  }, M.FE.MODULES.format = function (h) {
    function l(e, t) {
      var n = "<" + e;

      for (var r in t) t.hasOwnProperty(r) && (n += " " + r + '="' + t[r] + '"');

      return n += ">";
    }

    function f(e, t) {
      var n = e;

      for (var r in t) t.hasOwnProperty(r) && (n += "id" == r ? "#" + t[r] : "class" == r ? "." + t[r] : "[" + r + '="' + t[r] + '"]');

      return n;
    }

    function p(e, t) {
      return !(!e || e.nodeType != Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t);
    }

    function m(e, t, n) {
      if (e) {
        for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;

        if (e) {
          if (h.node.isBlock(e) && "HR" !== e.tagName) return m(e.firstChild, t, n), !1;

          for (var r = M(l(t, n)).insertBefore(e), o = e; o && !M(o).is(".fr-marker") && 0 === M(o).find(".fr-marker").length && "UL" != o.tagName && "OL" != o.tagName;) {
            var i = o;
            if (h.node.isBlock(o) && "HR" !== e.tagName) return m(o.firstChild, t, n), !1;
            o = o.nextSibling, r.append(i);
          }

          if (o) (M(o).find(".fr-marker").length || "UL" == o.tagName || "OL" == o.tagName) && m(o.firstChild, t, n);else {
            for (var a = r.get(0).parentNode; a && !a.nextSibling && !h.node.isElement(a);) a = a.parentNode;

            if (a) {
              for (var s = a.nextSibling; "BR" === s.tagName;) s = s.nextSibling;

              s && (h.node.isBlock(s) ? "HR" === s.tagName ? m(s.nextSibling, t, n) : m(s.firstChild, t, n) : m(s, t, n));
            }
          }
          r.is(":empty") && r.remove();
        }
      }
    }

    function n(e, t) {
      var n;

      if (void 0 === t && (t = {}), t.style && delete t.style, h.selection.isCollapsed()) {
        h.markers.insert(), h.$el.find(".fr-marker").replaceWith(l(e, t) + M.FE.INVISIBLE_SPACE + M.FE.MARKERS + ("</" + e + ">")), h.selection.restore();
      } else {
        var r;
        h.selection.save(), m(h.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);

        do {
          for (r = h.$el.find(f(e, t) + " > " + f(e, t)), n = 0; n < r.length; n++) r[n].outerHTML = r[n].innerHTML;
        } while (r.length);

        h.el.normalize();
        var o = h.el.querySelectorAll(".fr-marker");

        for (n = 0; n < o.length; n++) {
          var i = M(o[n]);
          !0 === i.data("type") ? p(i.get(0).nextSibling, f(e, t)) && i.next().prepend(i) : p(i.get(0).previousSibling, f(e, t)) && i.prev().append(i);
        }

        h.selection.restore();
      }
    }

    function E(e, t, n, r) {
      if (!r) {
        var o = !1;
        if (!0 === e.data("type")) for (; h.node.isFirstSibling(e.get(0)) && !e.parent().is(h.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), o = !0;else if (!1 === e.data("type")) for (; h.node.isLastSibling(e.get(0)) && !e.parent().is(h.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), o = !0;
        if (o) return !0;
      }

      if (e.parents(t).length || void 0 === t) {
        var i = "",
            a = "",
            s = e.parent();
        if (s.is(h.$el) || h.node.isBlock(s.get(0))) return !1;

        for (; !h.node.isBlock(s.parent().get(0)) && (void 0 === t || void 0 !== t && !p(s.get(0), f(t, n)));) i += h.node.closeTagString(s.get(0)), a = h.node.openTagString(s.get(0)) + a, s = s.parent();

        var l = e.get(0).outerHTML;
        e.replaceWith('<span id="mark"></span>');
        var d = s.html().replace(/<span id="mark"><\/span>/, i + h.node.closeTagString(s.get(0)) + a + l + i + h.node.openTagString(s.get(0)) + a);
        return s.replaceWith(h.node.openTagString(s.get(0)) + d + h.node.closeTagString(s.get(0))), !0;
      }

      return !1;
    }

    function r(t, n) {
      void 0 === n && (n = {}), n.style && delete n.style;
      var r = h.selection.isCollapsed();
      h.selection.save();

      for (var o = !0; o;) {
        o = !1;

        for (var i = h.$el.find(".fr-marker"), a = 0; a < i.length; a++) {
          var s = M(i[a]),
              l = null;

          if (s.attr("data-cloned") || r || (l = s.clone().removeClass("fr-marker").addClass("fr-clone"), !0 === s.data("type") ? s.attr("data-cloned", !0).after(l) : s.attr("data-cloned", !0).before(l)), E(s, t, n, r)) {
            o = !0;
            break;
          }
        }
      }

      !function e(t, n, r, o) {
        for (var i = h.node.contents(t.get(0)), a = 0; a < i.length; a++) {
          var s = i[a];
          if (h.node.hasClass(s, "fr-marker")) n = (n + 1) % 2;else if (n) {
            if (0 < M(s).find(".fr-marker").length) n = e(M(s), n, r, o);else {
              for (var l = M(s).find(r || "*:not(a):not(br)"), d = l.length - 1; 0 <= d; d--) {
                var c = l[d];
                h.node.isBlock(c) || h.node.isVoid(c) || void 0 !== r && !p(c, f(r, o)) ? h.node.isBlock(c) && void 0 === r && "TABLE" != s.tagName && h.node.clearAttributes(c) : h.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML);
              }

              void 0 === r && s.nodeType == Node.ELEMENT_NODE && !h.node.isVoid(s) || p(s, f(r, o)) ? h.node.isBlock(s) || M(s).replaceWith(s.innerHTML) : void 0 === r && s.nodeType == Node.ELEMENT_NODE && h.node.isBlock(s) && "TABLE" != s.tagName && h.node.clearAttributes(s);
            }
          } else 0 < M(s).find(".fr-marker").length && (n = e(M(s), n, r, o));
        }

        return n;
      }(h.$el, 0, t, n), r || (h.$el.find(".fr-marker").remove(), h.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), r && h.$el.find(".fr-marker").before(M.FE.INVISIBLE_SPACE).after(M.FE.INVISIBLE_SPACE), h.html.cleanEmptyTags(), h.el.normalize(), h.selection.restore();
    }

    function t(e, t) {
      var n,
          r,
          o,
          i,
          a,
          s = null;

      if (h.selection.isCollapsed()) {
        h.markers.insert();
        var l = (r = h.$el.find(".fr-marker")).parent();

        if (h.node.openTagString(l.get(0)) == '<span style="' + e + ": " + l.css(e) + ';">') {
          if (h.node.isEmpty(l.get(0))) s = M('<span style="' + e + ": " + t + ';">' + M.FE.INVISIBLE_SPACE + M.FE.MARKERS + "</span>"), l.replaceWith(s);else {
            var d = {};
            d["style*"] = e + ":", E(r, "span", d, !0), r = h.$el.find(".fr-marker"), t ? (s = M('<span style="' + e + ": " + t + ';">' + M.FE.INVISIBLE_SPACE + M.FE.MARKERS + "</span>"), r.replaceWith(s)) : r.replaceWith(M.FE.INVISIBLE_SPACE + M.FE.MARKERS);
          }
          h.html.cleanEmptyTags();
        } else h.node.isEmpty(l.get(0)) && l.is("span") ? (r.replaceWith(M.FE.MARKERS), l.css(e, t)) : (s = M('<span style="' + e + ": " + t + ';">' + M.FE.INVISIBLE_SPACE + M.FE.MARKERS + "</span>"), r.replaceWith(s));

        s && v(s, e, t);
      } else {
        if (h.selection.save(), null == t || "color" == e && 0 < h.$el.find(".fr-marker").parents("u, a").length) {
          var c = h.$el.find(".fr-marker");

          for (n = 0; n < c.length; n++) if (!0 === (r = M(c[n])).data("type")) for (; h.node.isFirstSibling(r.get(0)) && !r.parent().is(h.$el) && !h.node.isElement(r.parent().get(0)) && !h.node.isBlock(r.parent().get(0));) r.parent().before(r);else for (; h.node.isLastSibling(r.get(0)) && !r.parent().is(h.$el) && !h.node.isElement(r.parent().get(0)) && !h.node.isBlock(r.parent().get(0));) r.parent().after(r);
        }

        for (var f = h.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling; f.firstChild;) f = f.firstChild;

        var p = {
          "class": "fr-unprocessed"
        };

        for (t && (p.style = e + ": " + t + ";"), m(f, "span", p), h.$el.find(".fr-marker + .fr-unprocessed").each(function () {
          M(this).prepend(M(this).prev());
        }), h.$el.find(".fr-unprocessed + .fr-marker").each(function () {
          M(this).prev().append(this);
        }), (t || "").match(/\dem$/) && h.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < h.$el.find("span.fr-unprocessed").length;) {
          if ((s = h.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 == s.parent().get(0).childNodes.length) {
            s.parent().css(e, t);
            var u = s;
            s = s.parent(), u.replaceWith(u.html());
          }

          var g = s.find("span");

          for (n = g.length - 1; 0 <= n; n--) o = g[n], i = e, a = void 0, (a = M(o)).css(i, ""), "" === a.attr("style") && a.replaceWith(a.html());

          v(s, e, t);
        }
      }

      !function () {
        var e;

        for (; 0 < h.$el.find(".fr-split:empty").length;) h.$el.find(".fr-split:empty").remove();

        h.$el.find(".fr-split").removeClass("fr-split"), h.$el.find('[style=""]').removeAttr("style"), h.$el.find('[class=""]').removeAttr("class"), h.html.cleanEmptyTags(), M(h.$el.find("span").get().reverse()).each(function () {
          this.attributes && 0 !== this.attributes.length || M(this).replaceWith(this.innerHTML);
        }), h.el.normalize();
        var t = h.$el.find("span[style] + span[style]");

        for (e = 0; e < t.length; e++) {
          var n = M(t[e]),
              r = M(t[e]).prev();
          n.get(0).previousSibling == r.get(0) && h.node.openTagString(n.get(0)) == h.node.openTagString(r.get(0)) && (n.prepend(r.html()), r.remove());
        }

        h.$el.find("span[style] span[style]").each(function () {
          if (0 <= M(this).attr("style").indexOf("font-size")) {
            var e = M(this).parents("span[style]");
            0 <= e.attr("style").indexOf("background-color") && (M(this).attr("style", M(this).attr("style") + ";" + e.attr("style")), E(M(this), "span[style]", {}, !1));
          }
        }), h.el.normalize(), h.selection.restore();
      }();
    }

    function v(e, t, n) {
      var r,
          o,
          i,
          a = e.parentsUntil(h.$el, "span[style]"),
          s = [];

      for (r = a.length - 1; 0 <= r; r--) o = a[r], i = t, 0 === M(o).attr("style").indexOf(i + ":") || 0 <= M(o).attr("style").indexOf(";" + i + ":") || 0 <= M(o).attr("style").indexOf("; " + i + ":") || s.push(a[r]);

      if ((a = a.not(s)).length) {
        for (var l = "", d = "", c = "", f = "", p = e.get(0); p = p.parentNode, M(p).addClass("fr-split"), l += h.node.closeTagString(p), d = h.node.openTagString(M(p).clone().addClass("fr-split").get(0)) + d, a.get(0) != p && (c += h.node.closeTagString(p), f = h.node.openTagString(M(p).clone().addClass("fr-split").get(0)) + f), a.get(0) != p;);

        var u = l + h.node.openTagString(M(a.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + c + "</span>" + d;
        e.replaceWith('<span id="fr-break"></span>');
        var g = a.get(0).outerHTML;
        M(a.get(0)).replaceWith(g.replace(/<span id="fr-break"><\/span>/g, u));
      }
    }

    function o(e, t) {
      void 0 === t && (t = {}), t.style && delete t.style;
      var n = h.selection.ranges(0),
          r = n.startContainer;

      if (r.nodeType == Node.ELEMENT_NODE && 0 < r.childNodes.length && r.childNodes[n.startOffset] && (r = r.childNodes[n.startOffset]), !n.collapsed && r.nodeType == Node.TEXT_NODE && n.startOffset == (r.textContent || "").length) {
        for (; !h.node.isBlock(r.parentNode) && !r.nextSibling;) r = r.parentNode;

        r.nextSibling && (r = r.nextSibling);
      }

      for (var o = r; o && o.nodeType == Node.ELEMENT_NODE && !p(o, f(e, t));) o = o.firstChild;

      if (o && o.nodeType == Node.ELEMENT_NODE && p(o, f(e, t))) return !0;
      var i = r;

      for (i && i.nodeType != Node.ELEMENT_NODE && (i = i.parentNode); i && i.nodeType == Node.ELEMENT_NODE && i != h.el && !p(i, f(e, t));) i = i.parentNode;

      return !(!i || i.nodeType != Node.ELEMENT_NODE || i == h.el || !p(i, f(e, t)));
    }

    return {
      is: o,
      toggle: function (e, t) {
        o(e, t) ? r(e, t) : n(e, t);
      },
      apply: n,
      remove: r,
      applyStyle: t,
      removeStyle: function (e) {
        t(e, null);
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    indentMargin: 20
  }), M.FE.COMMANDS = {
    bold: {
      title: "Bold",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("strong");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    italic: {
      title: "Italic",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("em");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    underline: {
      title: "Underline",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("u");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    strikeThrough: {
      title: "Strikethrough",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("s");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    subscript: {
      title: "Subscript",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("sub");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    superscript: {
      title: "Superscript",
      toggle: !0,
      refresh: function (e) {
        var t = this.format.is("sup");
        e.toggleClass("fr-active", t).attr("aria-pressed", t);
      }
    },
    outdent: {
      title: "Decrease Indent"
    },
    indent: {
      title: "Increase Indent"
    },
    undo: {
      title: "Undo",
      undo: !1,
      forcedRefresh: !0,
      disabled: !0
    },
    redo: {
      title: "Redo",
      undo: !1,
      forcedRefresh: !0,
      disabled: !0
    },
    insertHR: {
      title: "Insert Horizontal Line"
    },
    clearFormatting: {
      title: "Clear Formatting"
    },
    selectAll: {
      title: "Select All",
      undo: !1
    }
  }, M.FE.RegisterCommand = function (e, t) {
    M.FE.COMMANDS[e] = t;
  }, M.FE.MODULES.commands = function (a) {
    function o(e) {
      return a.html.defaultTag() && (e = "<" + a.html.defaultTag() + ">" + e + "</" + a.html.defaultTag() + ">"), e;
    }

    var i = {
      bold: function () {
        e("bold", "strong");
      },
      subscript: function () {
        a.format.is("sup") && a.format.remove("sup"), e("subscript", "sub");
      },
      superscript: function () {
        a.format.is("sub") && a.format.remove("sub"), e("superscript", "sup");
      },
      italic: function () {
        e("italic", "em");
      },
      strikeThrough: function () {
        e("strikeThrough", "s");
      },
      underline: function () {
        e("underline", "u");
      },
      undo: function () {
        a.undo.run();
      },
      redo: function () {
        a.undo.redo();
      },
      indent: function () {
        n(1);
      },
      outdent: function () {
        n(-1);
      },
      show: function () {
        a.opts.toolbarInline && a.toolbar.showInline(null, !0);
      },
      insertHR: function () {
        a.selection.remove();
        var e = "";
        a.core.isEmpty() && (e = o(e = "<br>")), a.html.insert('<hr id="fr-just">' + e);
        var t,
            n = a.$el.find("hr#fr-just");

        if (n.removeAttr("id"), 0 === n.next().length) {
          var r = a.html.defaultTag();
          r ? n.after(M("<" + r + ">").append("<br>")) : n.after("<br>");
        }

        n.prev().is("hr") ? t = a.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = a.selection.setBefore(n.get(0), !1) : a.selection.setAfter(n.get(0), !1) || a.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = o(e = M.FE.MARKERS + "<br>"), n.after(e)), a.selection.restore();
      },
      clearFormatting: function () {
        a.format.remove();
      },
      selectAll: function () {
        a.doc.execCommand("selectAll", !1, !1);
      }
    };

    function t(e, t) {
      if (!1 !== a.events.trigger("commands.before", M.merge([e], t || []))) {
        var n = M.FE.COMMANDS[e] && M.FE.COMMANDS[e].callback || i[e],
            r = !0,
            o = !1;
        M.FE.COMMANDS[e] && ("undefined" != typeof M.FE.COMMANDS[e].focus && (r = M.FE.COMMANDS[e].focus), "undefined" != typeof M.FE.COMMANDS[e].accessibilityFocus && (o = M.FE.COMMANDS[e].accessibilityFocus)), (!a.core.hasFocus() && r && !a.popups.areVisible() || !a.core.hasFocus() && o && a.accessibility.hasFocus()) && a.events.focus(!0), M.FE.COMMANDS[e] && !1 !== M.FE.COMMANDS[e].undo && (a.$el.find(".fr-marker").length && (a.events.disableBlur(), a.selection.restore()), a.undo.saveStep()), n && n.apply(a, M.merge([e], t || [])), a.events.trigger("commands.after", M.merge([e], t || [])), M.FE.COMMANDS[e] && !1 !== M.FE.COMMANDS[e].undo && a.undo.saveStep();
      }
    }

    function e(e, t) {
      a.format.toggle(t);
    }

    function n(e) {
      a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();

      for (var t = a.selection.blocks(), n = 0; n < t.length; n++) if ("LI" != t[n].tagName && "LI" != t[n].parentNode.tagName) {
        var r = M(t[n]),
            o = "rtl" == a.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left",
            i = a.helpers.getPX(r.css(o));
        if (r.width() < 2 * a.opts.indentMargin && 0 < e) continue;
        r.css(o, Math.max(i + e * a.opts.indentMargin, 0) || ""), r.removeClass("fr-temp-div");
      }

      a.selection.save(), a.html.unwrap(), a.selection.restore();
    }

    function r(e) {
      return function () {
        t(e);
      };
    }

    var s = {};

    for (var l in i) i.hasOwnProperty(l) && (s[l] = r(l));

    return M.extend(s, {
      exec: t,
      _init: function () {
        a.events.on("keydown", function (e) {
          var t = a.selection.element();
          if (t && "HR" == t.tagName && !a.keys.isArrow(e.which)) return e.preventDefault(), !1;
        }), a.events.on("keyup", function (e) {
          var t = a.selection.element();
          if (t && "HR" == t.tagName) if (e.which == M.FE.KEYCODE.ARROW_LEFT || e.which == M.FE.KEYCODE.ARROW_UP) {
            if (t.previousSibling) return a.node.isBlock(t.previousSibling) ? a.selection.setAtEnd(t.previousSibling) : M(t).before(M.FE.MARKERS), a.selection.restore(), !1;
          } else if ((e.which == M.FE.KEYCODE.ARROW_RIGHT || e.which == M.FE.KEYCODE.ARROW_DOWN) && t.nextSibling) return a.node.isBlock(t.nextSibling) ? a.selection.setAtStart(t.nextSibling) : M(t).after(M.FE.MARKERS), a.selection.restore(), !1;
        }), a.events.on("mousedown", function (e) {
          if (e.target && "HR" == e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1;
        }), a.events.on("mouseup", function () {
          var e = a.selection.element();
          e == a.selection.endElement() && e && "HR" == e.tagName && (e.nextSibling && (a.node.isBlock(e.nextSibling) ? a.selection.setAtStart(e.nextSibling) : M(e).after(M.FE.MARKERS)), a.selection.restore());
        });
      }
    });
  }, M.FE.MODULES.data = function (f) {
    var p = "NCKB1zwtPA9tqzajXC2c2A7B-16VD3spzJ1C9C3D5oOF2OB1NB1LD7VA5QF4TE3gytXB2A4C-8VA2AC4E1D3GB2EB2KC3KD1MF1juuSB1A8C6yfbmd1B2a1A5qdsdB2tivbC3CB1KC1CH1eLA2sTF1B4I4H-7B-21UB6b1F5bzzzyAB4JC3MG2hjdKC1JE6C1E1cj1pD-16pUE5B4prra2B5ZB3D3C3pxj1EA6A3rnJA2C-7I-7JD9D1E1wYH1F3sTB5TA2G4H4ZA22qZA5BB3mjcvcCC3JB1xillavC-21VE6PC5SI4YC5C8mb1A3WC3BD2B5aoDA2qqAE3A5D-17fOD1D5RD4WC10tE6OAZC3nF-7b1C4A4D3qCF2fgmapcromlHA2QA6a1E1D3e1A6C2bie2F4iddnIA7B2mvnwcIB5OA1DB2OLQA3PB10WC7WC5d1E3uI-7b1D5D6b1E4D2arlAA4EA1F-11srxI-7MB1D7PF1E5B4adB-21YD5vrZH3D3xAC4E1A2GF2CF2J-7yNC2JE1MI2hH-7QB1C6B5B-9bA-7XB13a1B5VievwpKB4LA3NF-10H-9I-8hhaC-16nqPG4wsleTD5zqYF3h1G2B7B4yvGE2Pi1H-7C-21OE6B1uLD1kI4WC1E7C5g1D-8fue1C8C6c1D4D3Hpi1CC4kvGC2E1legallyXB4axVA11rsA4A-9nkdtlmzBA2GD3A13A6CB1dabE1lezrUE6RD5TB4A-7f1C8c1B5d1D4D3tyfCD5C2D2==",
        u = function () {
      for (var e = 0, t = document.domain, n = t.split("."), r = "_gd" + new Date().getTime(); e < n.length - 1 && -1 == document.cookie.indexOf(r + "=" + r);) t = n.slice(-1 - ++e).join("."), document.cookie = r + "=" + r + ";domain=" + t + ";";

      return document.cookie = r + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + t + ";", (t || "").replace(/(^\.*)|(\.*$)/g, "");
    }();

    function g(e) {
      return e;
    }

    var h,
        m,
        E = g(function (e) {
      if (!e) return e;

      for (var t = "", n = g("charCodeAt"), r = g("fromCharCode"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), i = 1; i < e.length - 2; i++) {
        for (var a = d(++o), s = e[n](i), l = ""; /[0-9-]/.test(e[i + 1]);) l += e[++i];

        s = v(s, a, l = parseInt(l, 10) || 0), s ^= o - 1 & 31, t += String[r](s);
      }

      return t;
    });

    function d(e) {
      for (var t = e.toString(), n = 0, r = 0; r < t.length; r++) n += parseInt(t.charAt(r), 10);

      return 10 < n ? n % 9 + 1 : n;
    }

    function v(e, t, n) {
      for (var r = Math.abs(n); 0 < r--;) e -= t;

      return n < 0 && (e += 123), e;
    }

    function b(e) {
      return !(!e || "block" === e.css("display") || (e.remove(), 0));
    }

    function S(e) {
      return e && 0 === f.$box.find(e).length;
    }

    var e = 0;

    function T() {
      if (10 < e && (f[g(E("0ppecjvc=="))](), setTimeout(function () {
        M.FE = null;
      }, 10)), !f.$box) return !1;
      f.$wp.prepend(E(g(E(p)))), h = f.$wp.find("> div:first"), m = h.find("> a"), "rtl" == f.opts.direction && h.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++;
    }

    function y(e) {
      for (var t = [E("9qqG-7amjlwq=="), E("KA3B3C2A6D1D5H5H1A3=="), E("3B9B3B5F3C4G3E3=="), E("QzbzvxyB2yA-9m=="), E("ji1kacwmgG5bc=="), E("nmA-13aogi1A3c1jd=="), E("BA9ggq=="), E("emznbjbH3fij=="), E("tkC-22d1qC-13sD1wzF-7==")], n = 0; n < t.length; n++) if (String.prototype.endsWith || (String.prototype.endsWith = function (e, t) {
        return (t === undefined || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e;
      }), e.endsWith(t[n])) return !0;

      return !1;
    }

    return {
      _init: function () {
        var e = f.o_win.FEK;

        try {
          e = e || localStorage && localStorage.FEK;
        } catch (v) {}

        e = f.opts.key || e || [""];
        var t = E(g("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
        "string" == typeof e && (e = [e]);

        for (var n, r, o, i = !(f.ul = !0), a = 0, s = 0; s < e.length; s++) {
          var l = (r = e[s], 3 === (o = (E(r) || "").split("|")).length ? o : [null, null, E(r) || ""]),
              d = l[2];

          if (d === E(g(E("mcVRDoB1BGILD7YFe1BTXBA7B6=="))) || 0 <= d.indexOf(u, d.length - u.length) || y(u)) {
            if (!((null === (n = l[1]) || new Date(n) < new Date(E("uB2C1D7B5E1E5E4A1E3C11=="))) && 0 < (u || "").length) || y(u)) {
              f.ul = !1;
              break;
            }

            i = !0, p = "RCZB17botVG4A-8yzia1C4A5DG3CD2cFB4qflmCE4I2FB1SC7F6PE4WE3RD6e2A4c1D3d1E2E3ehxdGE3CE2IB2LC1HG2LE1QA3QC7B-13cC-9epmkjc1B4e1C4pgjgvkOC5E1eNE1HB2LD2B-13WD5tvabUA5a1A4f1A2G3C2A-21cihKE3FE2DB2cccJE1iC-7G-7tD-17tVD6A-9qC-7QC7a1E4B4je1E3E2G2ecmsAA1xH-8HB11C1D1lgzQA3dTB8od1D4XE3ohb1B4E4D3mbLA10NA7C-21d1genodKC11PD9PE5tA-8UI3ZC5XB5B-11qXF2F-7wtwjAG3NA1IB1OD1HC1RD4QJ4evUF2D5XG2G4XA8pqocH1F3G2J2hcpHC4D1MD4C1MB8PD5klcQD1A8A6e2A3ed1E2A24A7HC5C3qA-9tiA-61dcC3MD1LE1D4SA3A9ZZXSE4g1C3Pa2C5ufbcGI3I2B4skLF2CA1vxB-22wgUC4kdH-8cVB5iwe1A2D3H3G-7DD5JC2ED2OH2JB10D3C2xHE1KA29PB11wdC-11C4cixb2C7a1C4YYE3B2A15uB-21wpCA1MF1NuC-21dyzD6pPG4I-7pmjc1A4yte1F3B-22yvCC3VbC-7qC-22qNE2hC1vH-8zad1RF6WF3DpI-7C8A-16hpf1F3D2ylalB-13BB2lpA-63IB3uOF6D5G4gabC-21UD2A3PH4ZA20B11b2C6ED4A2H3I1A15DB4KD2laC-8LA5B8B7==", a = l[0] || -1;
          }
        }

        var c = new Image();
        !0 === f.ul && (T(), c.src = i ? g(E(t)) + "e=" + a : g(E(t)) + "u"), !0 === f.ul && f.events.on("contentChanged", function () {
          (b(h) || b(m) || S(h) || S(m)) && T();
        }), f.events.on("destroy", function () {
          h && h.length && h.remove();
        }, !0);
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    pastePlain: !1,
    pasteDeniedTags: ["colgroup", "col", "meta"],
    pasteDeniedAttrs: ["class", "id", "style"],
    pasteAllowedStyleProps: [".*"],
    pasteAllowLocalImages: !1
  }), M.FE.MODULES.paste = function (b) {
    var a, s, o, S;

    function n(e, t) {
      try {
        b.win.localStorage.setItem("fr-copied-html", e), b.win.localStorage.setItem("fr-copied-text", t);
      } catch (n) {}
    }

    function e(e) {
      var t = b.html.getSelected();
      n(t, M("<div>").html(t).text()), "cut" == e.type && (b.undo.saveStep(), setTimeout(function () {
        b.selection.save(), b.html.wrap(), b.selection.restore(), b.events.focus(), b.undo.saveStep();
      }, 0));
    }

    var i = !1;

    function t(e) {
      if (i) return !1;
      if (e.originalEvent && (e = e.originalEvent), !1 === b.events.trigger("paste.before", [e])) return e.preventDefault(), !1;

      if (b.$win.scrollTop(), e && e.clipboardData && e.clipboardData.getData) {
        var t = "",
            n = e.clipboardData.types;
        if (b.helpers.isArray(n)) for (var r = 0; r < n.length; r++) t += n[r] + ";";else t = n;
        if (a = "", /text\/rtf/.test(t) && (s = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !b.browser.safari ? a = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && b.browser.safari ? a = s : /public.rtf/.test(t) && b.browser.safari && (a = e.clipboardData.getData("text/rtf")), "" !== a) return l(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
        a = null;
      }

      return function () {
        b.selection.save(), b.events.disableBlur(), a = null, o ? (o.html(""), b.browser.edge && b.opts.iframe && b.$el.append(o)) : (o = M('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), b.browser.webkit ? (o.css("top", b.$sc.scrollTop()), b.$el.after(o)) : b.browser.edge && b.opts.iframe ? b.$el.append(o) : b.$box.after(o), b.events.on("destroy", function () {
          o.remove();
        }));
        b.helpers.isIOS() || o.focus();
        b.win.setTimeout(l, 1);
      }(), !1;
    }

    function r(e) {
      if (e.originalEvent && (e = e.originalEvent), e && e.dataTransfer && e.dataTransfer.getData) {
        var t = "",
            n = e.dataTransfer.types;
        if (b.helpers.isArray(n)) for (var r = 0; r < n.length; r++) t += n[r] + ";";else t = n;

        if (a = "", /text\/rtf/.test(t) && (s = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? a = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && b.browser.safari ? a = s : /text\/plain/.test(t) && !this.browser.mozilla && (a = b.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== a) {
          b.keys.forceUndo(), S = b.snapshot.get(), b.selection.save(), b.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
          var o = b.markers.insertAtPoint(e);

          if (b.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), b.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), b.selection.restore(), b.selection.remove(), b.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== o) {
            var i = b.el.querySelector(".fr-marker");
            return M(i).replaceWith(M.FE.MARKERS), b.selection.restore(), l(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
          }
        } else a = null;
      }
    }

    function l() {
      b.browser.edge && b.opts.iframe && b.$box.after(o), S || (b.keys.forceUndo(), S = b.snapshot.get()), a || (a = o.get(0).innerHTML, b.selection.restore(), b.events.enableBlur());
      var e = a.match(/(class=\"?Mso|class=\'?Mso|class="?Xl|class='?Xl|class=Xl|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi),
          t = b.events.chainTrigger("paste.beforeCleanup", a);
      t && "string" == typeof t && (a = t), (!e || e && !1 !== b.events.trigger("paste.wordPaste", [a])) && d(a, e);
    }

    function T(e) {
      for (var t = "", n = 0; n++ < e;) t += "&nbsp;";

      return t;
    }

    function d(e, t, n) {
      var r,
          o = null,
          i = null;

      if (0 <= e.toLowerCase().indexOf("<body")) {
        var a = "";
        0 <= e.indexOf("<style") && (a = e.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e = (e = a + e.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2");
      }

      var s = !1;
      0 <= e.indexOf('id="docs-internal-guid') && (e = e.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s = !0), 0 <= e.indexOf('content="Sheets"') && (e = e.replace(/width:0px;/g, ""));
      var l = !1;

      if (!t && ((l = function (e) {
        var t = null;

        try {
          t = b.win.localStorage.getItem("fr-copied-text");
        } catch (n) {}

        return !(!t || M("<div>").html(e).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") != t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""));
      }(e)) && (e = b.win.localStorage.getItem("fr-copied-html")), !l)) {
        var d = b.opts.htmlAllowedStyleProps;
        b.opts.htmlAllowedStyleProps = b.opts.pasteAllowedStyleProps, b.opts.htmlAllowComments = !1, e = (e = (e = e.replace(/<span class="Apple-tab-span">\s*<\/span>/g, T(b.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function (e, t) {
          return T(t.length * (b.opts.tabSpaces || 4));
        })).replace(/\t/g, T(b.opts.tabSpaces || 4)), e = b.clean.html(e, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs), b.opts.htmlAllowedStyleProps = d, b.opts.htmlAllowComments = !0, e = (e = (e = y(e)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "");
      }

      !t || b.wordPaste && n || (0 === (e = e.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e = "<table>" + e + "</table>"), e = y(e = function (e) {
        var t;
        e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
        var n,
            r = ["style", "script", "applet", "embed", "noframes", "noscript"];

        for (t = 0; t < r.length; t++) {
          var o = new RegExp("<" + r[t] + ".*?" + r[t] + "(.*?)>", "gi");
          e = e.replace(o, "");
        }

        for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>"); (e = (n = e).replace(/<[^\/>][^>]*><\/[^>]+>/gi, "")) != n;);

        e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = b.clean.html(e, b.opts.pasteDeniedTags, b.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
        var i = b.o_doc.createElement("div");
        i.innerHTML = e;
        var a = i.querySelectorAll("li[data-indent]");

        for (t = 0; t < a.length; t++) {
          var s = a[t],
              l = s.previousElementSibling;

          if (l && "LI" == l.tagName) {
            var d = l.querySelector(":scope > ul, :scope > ol");
            d || (d = document.createElement("ul"), l.appendChild(d)), d.appendChild(s);
          } else s.removeAttribute("data-indent");
        }

        return b.html.cleanBlankSpaces(i), e = i.innerHTML;
      }(e))), b.opts.pastePlain && !l && (e = function (e) {
        var t,
            n = null,
            r = b.doc.createElement("div");
        r.innerHTML = e;
        var o = r.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");

        for (t = 0; t < o.length; t++) (n = o[t]).outerHTML = "<" + (b.html.defaultTag() || "DIV") + ">" + n.innerHTML + "</" + (b.html.defaultTag() || "DIV") + ">";

        for (t = (o = r.querySelectorAll("*:not(" + "p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(") + ")")).length - 1; 0 <= t; t--) (n = o[t]).outerHTML = n.innerHTML;

        var i = function (e) {
          for (var t = b.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType != Node.TEXT_NODE && t[n].nodeType != Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : i(t[n]);
        };

        return i(r), r.innerHTML;
      }(e));
      var c = b.events.chainTrigger("paste.afterCleanup", e);

      if ("string" == typeof c && (e = c), "" !== e) {
        var f = b.o_doc.createElement("div");
        0 <= (f.innerHTML = e).indexOf("<body>") ? (b.html.cleanBlankSpaces(f), b.spaces.normalize(f, !0)) : b.spaces.normalize(f);
        var p = f.getElementsByTagName("span");

        for (r = p.length - 1; 0 <= r; r--) {
          var u = p[r];
          0 === u.attributes.length && (u.outerHTML = u.innerHTML);
        }

        var g = b.selection.element(),
            h = !1;

        if (g && M(g).parentsUntil(b.el, "ul, ol").length && (h = !0), h) {
          var m = f.children;
          1 == m.length && 0 <= ["OL", "UL"].indexOf(m[0].tagName) && (m[0].outerHTML = m[0].innerHTML);
        }

        if (!s) {
          var E = f.getElementsByTagName("br");

          for (r = E.length - 1; 0 <= r; r--) {
            var v = E[r];
            b.node.isBlock(v.previousSibling) && v.parentNode.removeChild(v);
          }
        }

        if (b.opts.enter == M.FE.ENTER_BR) for (r = (o = f.querySelectorAll("p, div")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = i.innerHTML + (i.nextSibling && !b.node.isEmpty(i) ? "<br>" : ""));else if (b.opts.enter == M.FE.ENTER_DIV) for (r = (o = f.getElementsByTagName("p")).length - 1; 0 <= r; r--) 0 === (i = o[r]).attributes.length && (i.outerHTML = "<div>" + i.innerHTML + "</div>");else b.opts.enter == M.FE.ENTER_P && 1 == f.childNodes.length && "P" == f.childNodes[0].tagName && 0 === f.childNodes[0].attributes.length && (f.childNodes[0].outerHTML = f.childNodes[0].innerHTML);
        e = f.innerHTML, l && (e = function (e) {
          var t,
              n = b.o_doc.createElement("div");
          n.innerHTML = e;
          var r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + M.FE.VOID_ELEMENTS.join("):not(") + "):not(" + b.opts.htmlAllowedEmptyTags.join("):not(") + ")");

          for (; r.length;) {
            for (t = 0; t < r.length; t++) r[t].parentNode.removeChild(r[t]);

            r = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(" + M.FE.VOID_ELEMENTS.join("):not(") + "):not(" + b.opts.htmlAllowedEmptyTags.join("):not(") + ")");
          }

          return n.innerHTML;
        }(e)), b.html.insert(e, !0);
      }

      b.events.trigger("paste.after"), b.undo.saveStep(S), S = null, b.undo.saveStep();
    }

    function c(e) {
      for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);

      return e;
    }

    function y(e) {
      var t,
          n = b.o_doc.createElement("div");
      n.innerHTML = e;

      for (var r = c(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); r.length;) {
        var o = r[r.length - 1];
        if (b.html.defaultTag() && "div" != b.html.defaultTag()) o.querySelector(b.html.blockTagsQuery()) ? o.outerHTML = o.innerHTML : o.outerHTML = "<" + b.html.defaultTag() + ">" + o.innerHTML + "</" + b.html.defaultTag() + ">";else {
          var i = o.querySelectorAll("*");
          !i.length || "BR" !== i[i.length - 1].tagName && 0 === o.innerText.length ? o.outerHTML = o.innerHTML + "<br>" : o.nextSibling ? o.outerHTML = o.innerHTML + "<br>" : o.outerHTML = o.innerHTML;
        }
        r = c(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")));
      }

      for (r = c(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); r.length;) {
        for (t = 0; t < r.length; t++) {
          var a = r[t],
              s = a.innerHTML.replace(/\u0009/gi, "").trim();

          try {
            a.outerHTML = s;
          } catch (l) {}
        }

        r = c(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")));
      }

      return n.innerHTML;
    }

    function f() {
      b.el.removeEventListener("copy", e), b.el.removeEventListener("cut", e), b.el.removeEventListener("paste", t);
    }

    return {
      _init: function () {
        b.el.addEventListener("copy", e), b.el.addEventListener("cut", e), b.el.addEventListener("paste", t, {
          capture: !0
        }), b.events.on("drop", r), b.browser.msie && b.browser.version < 11 && (b.events.on("mouseup", function (e) {
          2 == e.button && (setTimeout(function () {
            i = !1;
          }, 50), i = !0);
        }, !0), b.events.on("beforepaste", t)), b.events.on("destroy", f);
      },
      cleanEmptyTagsAndDivs: y,
      getRtfClipboard: function () {
        return s;
      },
      saveCopiedText: n,
      clean: d
    };
  }, M.extend(M.FE.DEFAULTS, {
    shortcutsEnabled: [],
    shortcutsHint: !0
  }), M.FE.SHORTCUTS_MAP = {}, M.FE.RegisterShortcut = function (e, t, n, r, o, i) {
    M.FE.SHORTCUTS_MAP[(o ? "^" : "") + (i ? "@" : "") + e] = {
      cmd: t,
      val: n,
      letter: r,
      shift: o,
      option: i
    }, M.FE.DEFAULTS.shortcutsEnabled.push(t);
  }, M.FE.RegisterShortcut(M.FE.KEYCODE.E, "show", null, "E", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.B, "bold", null, "B", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.I, "italic", null, "I", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.U, "underline", null, "U", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.S, "strikeThrough", null, "S", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.Z, "undo", null, "Z", !1, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.Z, "redo", null, "Z", !0, !1), M.FE.RegisterShortcut(M.FE.KEYCODE.Y, "redo", null, "Y", !1, !1), M.FE.MODULES.shortcuts = function (s) {
    var r = null;
    var l = !1;

    function e(e) {
      if (!s.core.hasFocus()) return !0;
      var t = e.which,
          n = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
      if ("keyup" == e.type && l && t != M.FE.KEYCODE.META) return l = !1;
      "keydown" == e.type && (l = !1);
      var r = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t;

      if (n && M.FE.SHORTCUTS_MAP[r]) {
        var o = M.FE.SHORTCUTS_MAP[r].cmd;

        if (o && 0 <= s.opts.shortcutsEnabled.indexOf(o)) {
          var i,
              a = M.FE.SHORTCUTS_MAP[r].val;
          if (o && !a ? i = s.$tb.find('.fr-command[data-cmd="' + o + '"]') : o && a && (i = s.$tb.find('.fr-command[data-cmd="' + o + '"][data-param1="' + a + '"]')), i.length) return e.preventDefault(), e.stopPropagation(), i.parents(".fr-toolbar").data("instance", s), "keydown" == e.type && (s.button.exec(i), l = !0), !1;
          if (o && (s.commands[o] || M.FE.COMMANDS[o] && M.FE.COMMANDS[o].callback)) return e.preventDefault(), e.stopPropagation(), "keydown" == e.type && ((s.commands[o] || M.FE.COMMANDS[o].callback)(), l = !0), !1;
        }
      }
    }

    return {
      _init: function () {
        s.events.on("keydown", e, !0), s.events.on("keyup", e, !0);
      },
      get: function (e) {
        if (!s.opts.shortcutsHint) return null;
        if (!r) for (var t in r = {}, M.FE.SHORTCUTS_MAP) M.FE.SHORTCUTS_MAP.hasOwnProperty(t) && 0 <= s.opts.shortcutsEnabled.indexOf(M.FE.SHORTCUTS_MAP[t].cmd) && (r[M.FE.SHORTCUTS_MAP[t].cmd + "." + (M.FE.SHORTCUTS_MAP[t].val || "")] = {
          shift: M.FE.SHORTCUTS_MAP[t].shift,
          option: M.FE.SHORTCUTS_MAP[t].option,
          letter: M.FE.SHORTCUTS_MAP[t].letter
        });
        var n = r[e];
        return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : s.language.translate("Ctrl") + "+") + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : s.language.translate("Shift") + "+" : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : s.language.translate("Alt") + "+" : "") + n.letter : null;
      }
    };
  }, M.FE.MODULES.snapshot = function (l) {
    function n(e) {
      for (var t = e.parentNode.childNodes, n = 0, r = null, o = 0; o < t.length; o++) {
        if (r) {
          var i = t[o].nodeType === Node.TEXT_NODE && "" === t[o].textContent,
              a = r.nodeType === Node.TEXT_NODE && t[o].nodeType === Node.TEXT_NODE;
          i || a || n++;
        }

        if (t[o] == e) return n;
        r = t[o];
      }
    }

    function o(e) {
      var t = [];
      if (!e.parentNode) return [];

      for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode;

      return t.reverse();
    }

    function i(e, t) {
      for (; e && e.nodeType === Node.TEXT_NODE;) {
        var n = e.previousSibling;
        n && n.nodeType == Node.TEXT_NODE && (t += n.textContent.length), e = n;
      }

      return t;
    }

    function d(e) {
      for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]];

      return t;
    }

    function r(e, t) {
      try {
        var n = d(t.scLoc),
            r = t.scOffset,
            o = d(t.ecLoc),
            i = t.ecOffset,
            a = l.doc.createRange();
        a.setStart(n, r), a.setEnd(o, i), e.addRange(a);
      } catch (s) {
        console.warn(s);
      }
    }

    return {
      get: function () {
        var e,
            t = {};
        if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus()) for (var n = l.selection.ranges(), r = 0; r < n.length; r++) t.ranges.push({
          scLoc: o((e = n[r]).startContainer),
          scOffset: i(e.startContainer, e.startOffset),
          ecLoc: o(e.endContainer),
          ecOffset: i(e.endContainer, e.endOffset)
        });
        return l.events.trigger("snapshot.after", [t]), t;
      },
      restore: function (e) {
        l.$el.html() != e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
        var t = l.selection.get();
        l.selection.clear(), l.events.focus(!0);

        for (var n = 0; n < e.ranges.length; n++) r(t, e.ranges[n]);
      },
      equal: function (e, t) {
        return e.html == t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) == JSON.stringify(t.ranges));
      }
    };
  }, M.FE.MODULES.undo = function (n) {
    function e(e) {
      var t = e.which;
      n.keys.ctrlKey(e) && (90 == t && e.shiftKey && e.preventDefault(), 90 == t && e.preventDefault());
    }

    var t = null;

    function r() {
      if (!n.undo_stack || n.undoing) return !1;

      for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop();
    }

    function o() {
      t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, ""), n.undo_index = 0, n.undo_stack = [];
    }

    function i() {
      n.undo_stack = [];
    }

    return {
      _init: function () {
        o(), n.events.on("initialized", function () {
          t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "");
        }), n.events.on("blur", function () {
          n.el.querySelector(".fr-dragging") || n.undo.saveStep();
        }), n.events.on("keydown", e), n.events.on("destroy", i);
      },
      run: function () {
        if (1 < n.undo_index) {
          n.undoing = !0;
          var e = n.undo_stack[--n.undo_index - 1];
          clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = !1;
        }
      },
      redo: function () {
        if (n.undo_index < n.undo_stack.length) {
          n.undoing = !0;
          var e = n.undo_stack[n.undo_index++];
          clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = !1;
        }
      },
      canDo: function () {
        return !(0 === n.undo_stack.length || n.undo_index <= 1);
      },
      canRedo: function () {
        return n.undo_index != n.undo_stack.length;
      },
      dropRedo: r,
      reset: o,
      saveStep: function (e) {
        if (!n.undo_stack || n.undoing || n.el.querySelector(".fr-marker")) return !1;
        void 0 === e ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (r(), n.undo_stack.push(e), n.undo_index++, e.html != t && (n.events.trigger("contentChanged"), t = e.html))) : (r(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++));
      }
    };
  }, M.FE.ICON_TEMPLATES = {
    font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
    font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
    font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
    font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
    font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
    text: '<span style="text-align: center;">[NAME]</span>',
    image: "<img src=[SRC] alt=[ALT] />",
    svg: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>',
    empty: " "
  }, M.FE.ICONS = {
    bold: {
      NAME: "bold"
    },
    italic: {
      NAME: "italic"
    },
    underline: {
      NAME: "underline"
    },
    strikeThrough: {
      NAME: "strikethrough"
    },
    subscript: {
      NAME: "subscript"
    },
    superscript: {
      NAME: "superscript"
    },
    color: {
      NAME: "tint"
    },
    outdent: {
      NAME: "outdent"
    },
    indent: {
      NAME: "indent"
    },
    undo: {
      NAME: "rotate-left",
      FA5NAME: "undo"
    },
    redo: {
      NAME: "rotate-right",
      FA5NAME: "redo"
    },
    insertHR: {
      NAME: "minus"
    },
    clearFormatting: {
      NAME: "eraser"
    },
    selectAll: {
      NAME: "mouse-pointer"
    }
  }, M.FE.DefineIconTemplate = function (e, t) {
    M.FE.ICON_TEMPLATES[e] = t;
  }, M.FE.DefineIcon = function (e, t) {
    M.FE.ICONS[e] = t;
  }, M.extend(M.FE.DEFAULTS, {
    iconsTemplate: "font_awesome"
  }), M.FE.MODULES.icon = function (o) {
    return {
      create: function (n) {
        var e = null,
            r = M.FE.ICONS[n];

        if (void 0 !== r) {
          var t = r.template || M.FE.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate;
          t && t.apply && (t = t.apply(o)), r.FA5NAME || (r.FA5NAME = r.NAME), t && (t = M.FE.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function (e, t) {
            return "NAME" == t ? r[t] || n : r[t];
          }));
        }

        return e || n;
      },
      getTemplate: function (e) {
        var t = M.FE.ICONS[e],
            n = o.opts.iconsTemplate;
        return void 0 !== t ? n = t.template || M.FE.ICON_DEFAULT_TEMPLATE || o.opts.iconsTemplate : n;
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    tooltips: !0
  }), M.FE.MODULES.tooltip = function (o) {
    function r() {
      if (o.helpers.isMobile()) return !1;
      o.$tooltip && o.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed");
    }

    function i(e, t) {
      if (o.helpers.isMobile()) return !1;
      if (e.data("title") || e.data("title", e.attr("title")), !e.data("title")) return !1;
      o.$tooltip || o.opts.tooltips && !o.helpers.isMobile() && (o.shared.$tooltip ? o.$tooltip = o.shared.$tooltip : (o.shared.$tooltip = M('<div class="fr-tooltip"></div>'), o.$tooltip = o.shared.$tooltip, o.opts.theme && o.$tooltip.addClass(o.opts.theme + "-theme"), M(o.o_doc).find("body:first").append(o.$tooltip)), o.events.on("shared.destroy", function () {
        o.$tooltip.html("").removeData().remove(), o.$tooltip = null;
      }, !0)), e.removeAttr("title"), o.$tooltip.text(o.language.translate(e.data("title"))), o.$tooltip.addClass("fr-visible");
      var n = e.offset().left + (e.outerWidth() - o.$tooltip.outerWidth()) / 2;
      n < 0 && (n = 0), n + o.$tooltip.outerWidth() > M(o.o_win).width() && (n = M(o.o_win).width() - o.$tooltip.outerWidth()), void 0 === t && (t = o.opts.toolbarBottom);
      var r = t ? e.offset().top - o.$tooltip.height() : e.offset().top + e.outerHeight();
      o.$tooltip.css("position", ""), o.$tooltip.css("left", n), o.$tooltip.css("top", Math.ceil(r)), "static" != M(o.o_doc).find("body:first").css("position") ? (o.$tooltip.css("margin-left", -M(o.o_doc).find("body:first").offset().left), o.$tooltip.css("margin-top", -M(o.o_doc).find("body:first").offset().top)) : (o.$tooltip.css("margin-left", ""), o.$tooltip.css("margin-top", ""));
    }

    return {
      hide: r,
      to: i,
      bind: function (e, t, n) {
        o.opts.tooltips && !o.helpers.isMobile() && (o.events.$on(e, "mouseenter", t, function (e) {
          o.node.hasClass(e.currentTarget, "fr-disabled") || o.edit.isDisabled() || i(M(e.currentTarget), n);
        }, !0), o.events.$on(e, "mouseleave " + o._mousedown + " " + o._mouseup, t, function () {
          r();
        }, !0));
      }
    };
  }, M.FE.MODULES.button = function (u) {
    var a = [];
    (u.opts.toolbarInline || u.opts.toolbarContainer) && (u.shared.buttons || (u.shared.buttons = []), a = u.shared.buttons);
    var s = [];

    function l(e, t, n) {
      for (var r = M(), o = 0; o < e.length; o++) {
        var i = M(e[o]);

        if (i.is(t) && (r = r.add(i)), n && i.is(".fr-dropdown")) {
          var a = i.next().find(t);
          r = r.add(a);
        }
      }

      return r;
    }

    function d(e, t) {
      var n,
          r = M();
      if (!e) return r;

      for (n in r = (r = r.add(l(a, e, t))).add(l(s, e, t)), u.shared.popups) if (u.shared.popups.hasOwnProperty(n)) {
        var o = u.shared.popups[n].children().find(e);
        r = r.add(o);
      }

      for (n in u.shared.modals) if (u.shared.modals.hasOwnProperty(n)) {
        var i = u.shared.modals[n].$modal.find(e);
        r = r.add(i);
      }

      return r;
    }

    function r(e) {
      e.addClass("fr-blink"), setTimeout(function () {
        e.removeClass("fr-blink");
      }, 500);

      for (var t = e.data("cmd"), n = []; void 0 !== e.data("param" + (n.length + 1));) n.push(e.data("param" + (n.length + 1)));

      var r = d(".fr-dropdown.fr-active");
      r.length && (r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n);
    }

    function t(e) {
      var t = e.parents(".fr-popup, .fr-toolbar").data("instance");

      if (0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
        for (var n = 0; n < M.FE.INSTANCES.length; n++) M.FE.INSTANCES[n] != t && M.FE.INSTANCES[n].popups && M.FE.INSTANCES[n].popups.areVisible() && M.FE.INSTANCES[n].$el.find(".fr-marker").remove();

        t.popups.hideAll();
      }

      u.node.hasClass(e.get(0), "fr-dropdown") ? function (e) {
        var t = e.next(),
            n = u.node.hasClass(e.get(0), "fr-active"),
            r = d(".fr-dropdown.fr-active").not(e),
            o = e.parents(".fr-toolbar, .fr-popup").data("instance") || u;

        if (o.helpers.isIOS() && !o.el.querySelector(".fr-marker") && (o.selection.save(), o.selection.clear(), o.selection.restore()), !n) {
          var i = e.data("cmd");
          t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), M.FE.COMMANDS[i] && M.FE.COMMANDS[i].refreshOnShow && M.FE.COMMANDS[i].refreshOnShow.apply(o, [e, t]), t.css("left", e.offset().left - e.parent().offset().left - ("rtl" == u.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height");
          var a = t.outerHeight();
          t.removeClass("test-height"), t.css("top", "").css("bottom", ""), !u.opts.toolbarBottom && t.offset().top + e.outerHeight() + a < M(u.o_doc).height() ? t.css("top", e.position().top + e.outerHeight()) : t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - e.position().top);
        }

        e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-options") && e.prev().toggleClass("fr-expanded"), e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0)) : (t.attr("aria-hidden", !0), e.attr("aria-expanded", !1)), setTimeout(function () {
          e.removeClass("fr-blink");
        }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > u.$sc.offset().left + u.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - u.$sc.offset().left - u.$sc.width())), t.offset().left < u.$sc.offset().left && "rtl" == u.opts.direction && t.css("margin-left", u.$sc.offset().left), r.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), r.prev(".fr-expanded").removeClass("fr-expanded"), r.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || u.opts.toolbarInline || (u.node.hasClass(e.get(0), "fr-active") ? u.$tb.css("zIndex", (u.opts.zIndex || 1) + 4) : u.$tb.css("zIndex", ""));
        var s = t.find("a.fr-command.fr-active:first");
        u.helpers.isMobile() || (s.length ? u.accessibility.focusToolbarElement(s) : u.accessibility.focusToolbarElement(e));
      }(e) : (r(e), M.FE.COMMANDS[e.data("cmd")] && !1 !== M.FE.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh());
    }

    function i(e) {
      t(M(e.currentTarget));
    }

    function c(e) {
      var t = e.find(".fr-dropdown.fr-active");
      t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0), t.parent(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t.prev().removeClass("fr-expanded"));
    }

    function f(e) {
      e.preventDefault(), e.stopPropagation();
    }

    function p(e) {
      if (e.stopPropagation(), !u.helpers.isMobile()) return !1;
    }

    function g(e, t, n) {
      if (t = M.extend(!0, {}, t), u.helpers.isMobile() && !1 === t.showOnMobile) return "";
      var r = t.displaySelection;
      "function" == typeof r && (r = r(u));
      var o = "";
      if ("options" !== t.type) if (r) {
        var i = "function" == typeof t.defaultSelection ? t.defaultSelection(u) : t.defaultSelection;
        o = '<span style="width:' + (t.displaySelectionWidth || 100) + 'px">' + u.language.translate(i || t.title) + "</span>";
      } else o = u.icon.create(t.icon || e), o += '<span class="fr-sr-only">' + (u.language.translate(t.title) || "") + "</span>";
      var a = t.popup ? ' data-popup="true"' : "",
          s = t.modal ? ' data-modal="true"' : "",
          l = u.shortcuts.get(e + ".");
      l = l ? " (" + l + ")" : "";
      var d = e + "-" + u.id,
          c = "dropdown-menu-" + d,
          f = '<button id="' + d + '"type="button" tabIndex="-1" role="button"' + (t.toggle ? ' aria-pressed="false"' : "") + ("dropdown" == t.type || "options" == t.type ? ' aria-controls="' + c + '" aria-expanded="false" aria-haspopup="true"' : "") + (t.disabled ? ' aria-disabled="true"' : "") + ' title="' + (u.language.translate(t.title) || "") + l + '" class="fr-command fr-btn' + ("dropdown" == t.type || "options" == t.type ? " fr-dropdown" : "") + ("options" == t.type ? " fr-options" : "") + " fr-btn-" + u.icon.getTemplate(t.icon) + (t.displaySelection ? " fr-selection" : "") + (t.back ? " fr-back" : "") + (t.disabled ? " fr-disabled" : "") + (n ? "" : " fr-hidden") + '" data-cmd="' + e + '"' + a + s + ">" + o + "</button>";

      if ("dropdown" == t.type || "options" == t.type) {
        var p = '<div id="' + c + '" class="fr-dropdown-menu" role="listbox" aria-labelledby="' + d + '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';
        p += function (e, t) {
          var n = "";
          if (t.html) "function" == typeof t.html ? n += t.html.call(u) : n += t.html;else {
            var r = t.options;

            for (var o in "function" == typeof r && (r = r()), n += '<ul class="fr-dropdown-list" role="presentation">', r) if (r.hasOwnProperty(o)) {
              var i = u.shortcuts.get(e + "." + o);
              i = i ? '<span class="fr-shortcut">' + i + "</span>" : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="' + ("options" === t.type ? e.replace(/Options/g, "") : e) + '" data-param1="' + o + '" title="' + r[o] + '">' + u.language.translate(r[o]) + "</a></li>";
            }

            n += "</ul>";
          }
          return n;
        }(e, t), f += p += "</div></div></div>";
      }

      return t.hasOptions && t.hasOptions.apply(u) && (t.type = "options", t.hasOptions = !1, f = '<div class="fr-btn-wrap">' + f + g(e + "Options", t, n) + "</div>"), f;
    }

    function e(o) {
      var i = u.$tb && u.$tb.data("instance") || u;
      if (!1 === u.events.trigger("buttons.refresh")) return !0;
      setTimeout(function () {
        for (var e = i.selection.inEditor() && i.core.hasFocus(), t = 0; t < o.length; t++) {
          var n = M(o[t]),
              r = n.data("cmd");
          0 === n.parents(".fr-popup").length ? e || M.FE.COMMANDS[r] && M.FE.COMMANDS[r].forcedRefresh ? i.button.refresh(n) : u.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").is(":visible") && i.button.refresh(n);
        }
      }, 0);
    }

    function n() {
      e(a), e(s);
    }

    function o() {
      a = [], s = [];
    }

    u.shared.popup_buttons || (u.shared.popup_buttons = []), s = u.shared.popup_buttons;
    var h = null;

    function m() {
      clearTimeout(h), h = setTimeout(n, 50);
    }

    return {
      _init: function () {
        u.opts.toolbarInline ? u.events.on("toolbar.show", n) : (u.events.on("mouseup", m), u.events.on("keyup", m), u.events.on("blur", m), u.events.on("focus", m), u.events.on("contentChanged", m), u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", n)), u.events.on("shared.destroy", o);
      },
      buildList: function (e, t) {
        for (var n = "", r = 0; r < e.length; r++) {
          var o = e[r],
              i = M.FE.COMMANDS[o];
          i && "undefined" != typeof i.plugin && u.opts.pluginsEnabled.indexOf(i.plugin) < 0 || (i ? n += g(o, i, void 0 === t || 0 <= t.indexOf(o)) : "|" == o ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == o && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'));
        }

        return n;
      },
      bindCommands: function (t, e) {
        u.events.bindClick(t, ".fr-command:not(.fr-disabled)", i), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu", f, !0), u.events.$on(t, u._mousedown + " " + u._mouseup + " " + u._move, ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);

        var n = t.get(0).ownerDocument,
            r = "defaultView" in n ? n.defaultView : n.parentWindow,
            o = function (e) {
          (!e || e.type == u._mouseup && e.target != M("html").get(0) || "keydown" == e.type && (u.keys.isCharacter(e.which) && !u.keys.ctrlKey(e) || e.which == M.FE.KEYCODE.ESC)) && c(t);
        };

        u.events.$on(M(r), u._mouseup + " resize keydown", o, !0), u.opts.iframe && u.events.$on(u.$win, u._mouseup, o, !0), u.node.hasClass(t.get(0), "fr-popup") ? M.merge(s, t.find(".fr-btn").toArray()) : M.merge(a, t.find(".fr-btn").toArray()), u.tooltip.bind(t, ".fr-btn, .fr-title", e);
      },
      refresh: function (e) {
        var t,
            n = e.parents(".fr-popup, .fr-toolbar").data("instance") || u,
            r = e.data("cmd");
        u.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), M.FE.COMMANDS[r] && M.FE.COMMANDS[r].refresh ? M.FE.COMMANDS[r].refresh.apply(n, [e, t]) : u.refresh[r] && n.refresh[r](e, t);
      },
      bulkRefresh: n,
      exec: r,
      click: t,
      hideActiveDropdowns: c,
      getButtons: d
    };
  }, M.FE.MODULES.modals = function (l) {
    l.shared.modals || (l.shared.modals = {});
    var s,
        d = l.shared.modals;

    function e() {
      for (var e in d) {
        var t = d[e];
        t && t.$modal && t.$modal.removeData().remove();
      }

      s && s.removeData().remove(), d = {};
    }

    function c(e, t) {
      if (d[e]) {
        var n = d[e].$modal,
            r = n.data("instance") || l;
        r.events.enableBlur(), n.hide(), s.hide(), M(r.o_doc).find("body:first").removeClass("prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (r.accessibility.restoreSelection(), r.events.trigger("modals.hide"));
      }
    }

    function n(e) {
      var t;

      if ("string" == typeof e) {
        if (!d[e]) return;
        t = d[e].$modal;
      } else t = e;

      return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1;
    }

    return {
      _init: function () {
        l.events.on("shared.destroy", e, !0);
      },
      get: function (e) {
        return d[e];
      },
      create: function (n, e, t) {
        if (l.shared.$overlay || (l.shared.$overlay = M('<div class="fr-overlay">').appendTo("body:first")), s = l.shared.$overlay, l.opts.theme && s.addClass(l.opts.theme + "-theme"), !d[n]) {
          var r = (o = e, i = t, a = '<div tabIndex="-1" class="fr-modal' + (l.opts.theme ? " " + l.opts.theme + "-theme" : "") + '"><div class="fr-modal-wrapper">', a += '<div class="fr-modal-head">' + o + '<i title="' + l.language.translate("Cancel") + '" class="fa fa-times fr-modal-close"></i></div>', a += '<div tabIndex="-1" class="fr-modal-body">' + i + "</div>", M(a += "</div></div>"));
          d[n] = {
            $modal: r,
            $head: r.find(".fr-modal-head"),
            $body: r.find(".fr-modal-body")
          }, l.helpers.isMobile() || r.addClass("fr-desktop"), r.appendTo("body:first"), l.events.$on(r, "click", ".fr-modal-close", function () {
            c(n);
          }, !0), d[n].$body.css("margin-top", d[n].$head.outerHeight()), l.events.$on(r, "keydown", function (e) {
            var t = e.which;
            return t == M.FE.KEYCODE.ESC ? (c(n), l.accessibility.focusModalButton(r), !1) : !(!M(e.target).is("input[type=text], textarea") && t != M.FE.KEYCODE.ARROW_UP && t != M.FE.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1));
          }, !0), c(n, !0);
        }

        var o, i, a;
        return d[n];
      },
      show: function (e) {
        if (d[e]) {
          var t = d[e].$modal;
          t.data("instance", l), t.show(), s.show(), M(l.o_doc).find("body:first").addClass("prevent-scroll"), l.helpers.isMobile() && M(l.o_doc).find("body:first").addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t);
        }
      },
      hide: c,
      resize: function (e) {
        if (d[e]) {
          var t = d[e],
              n = t.$modal,
              r = t.$body,
              o = M(l.o_win).height(),
              i = n.find(".fr-modal-wrapper"),
              a = o - i.outerHeight(!0) + (i.height() - (r.outerHeight(!0) - r.height())),
              s = "auto";
          a < r.get(0).scrollHeight && (s = a), r.height(s);
        }
      },
      isVisible: n,
      areVisible: function (e) {
        for (var t in d) if (d.hasOwnProperty(t) && n(t) && (void 0 === e || d[t].$modal.data("instance") == e)) return d[t].$modal;

        return !1;
      }
    };
  }, M.FE.POPUP_TEMPLATES = {
    "text.edit": "[_EDIT_]"
  }, M.FE.RegisterTemplate = function (e, t) {
    M.FE.POPUP_TEMPLATES[e] = t;
  }, M.FE.MODULES.popups = function (c) {
    c.shared.popups || (c.shared.popups = {});
    var f = c.shared.popups;

    function p(e, t) {
      t.is(":visible") || (t = c.$sc), t.is(f[e].data("container")) || (f[e].data("container", t), t.append(f[e]));
    }

    function u(e) {
      return f[e] && c.node.hasClass(f[e], "fr-active") && c.core.sameInstance(f[e]) || !1;
    }

    function g(e) {
      for (var t in f) if (f.hasOwnProperty(t) && u(t) && (void 0 === e || f[t].data("instance") == e)) return f[t];

      return !1;
    }

    function n(e) {
      var t = null;
      (t = "string" != typeof e ? e : f[e]) && c.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), c.events.trigger("popups.hide." + e), c.$tb && (1 < c.opts.zIndex ? c.$tb.css("zIndex", c.opts.zIndex + 1) : c.$tb.css("zIndex", "")), c.events.disableBlur(), t.find("input, textarea, button").filter(":focus").blur(), t.find("input, textarea").attr("disabled", "disabled"));
    }

    function h(e) {
      for (var t in void 0 === e && (e = []), f) f.hasOwnProperty(t) && e.indexOf(t) < 0 && n(t);
    }

    function t() {
      c.shared.exit_flag = !0;
    }

    function m() {
      c.shared.exit_flag = !1;
    }

    function i() {
      return c.shared.exit_flag;
    }

    function o(e, t) {
      var n,
          r,
          o = function (e, t) {
        var n = M.FE.POPUP_TEMPLATES[e];
        if (!n) return null;

        for (var r in "function" == typeof n && (n = n.apply(c)), t) t.hasOwnProperty(r) && (n = n.replace("[_" + r.toUpperCase() + "_]", t[r]));

        return n;
      }(e, t);

      return o ? (n = M('<div class="fr-popup' + (c.helpers.isMobile() ? " fr-mobile" : " fr-desktop") + (c.opts.toolbarInline ? " fr-inline" : "") + '"><span class="fr-arrow"></span>' + o + "</div>"), c.opts.theme && n.addClass(c.opts.theme + "-theme"), 1 < c.opts.zIndex && (c.opts.editInPopup ? n.css("z-index", c.opts.zIndex + 2) : c.$tb.css("z-index", c.opts.zIndex + 2)), "auto" != c.opts.direction && n.removeClass("fr-ltr fr-rtl").addClass("fr-" + c.opts.direction), n.find("input, textarea").attr("dir", c.opts.direction).attr("disabled", "disabled"), (r = M("body:first")).append(n), n.data("container", r), f[e] = n, c.button.bindCommands(n, !1), n) : (n = M('<div class="fr-popup fr-empty"></div>'), (r = M("body:first")).append(n), n.data("container", r), f[e] = n);
    }

    function E(r) {
      var o = f[r];
      return {
        _windowResize: function () {
          var e = o.data("instance") || c;
          !e.helpers.isMobile() && o.is(":visible") && (e.events.disableBlur(), e.popups.hide(r), e.events.enableBlur());
        },
        _inputFocus: function (e) {
          var t = o.data("instance") || c,
              n = M(e.currentTarget);

          if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function () {
            t.events.enableBlur();
          }, c.browser.msie ? 100 : 0), t.helpers.isMobile()) {
            var r = M(t.o_win).scrollTop();
            setTimeout(function () {
              M(t.o_win).scrollTop(r);
            }, 0);
          }
        },
        _inputBlur: function (e) {
          var t = o.data("instance") || c,
              n = M(e.currentTarget);
          n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement != this && M(this).is(":visible") && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur());
        },
        _editorKeydown: function (e) {
          var t = o.data("instance") || c;
          t.keys.ctrlKey(e) || e.which == M.FE.KEYCODE.ALT || e.which == M.FE.KEYCODE.ESC || (u(r) && o.find(".fr-back:visible").length ? t.button.exec(o.find(".fr-back:visible:first")) : e.which != M.FE.KEYCODE.ALT && t.popups.hide(r));
        },
        _preventFocus: function (e) {
          var t = o.data("instance") || c,
              n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
          "mouseup" == e.type || M(n).is(":focus") || t.events.disableBlur(), "mouseup" != e.type || M(n).hasClass("fr-command") || 0 < M(n).parents(".fr-command").length || M(n).hasClass("fr-dropdown-content") || c.button.hideActiveDropdowns(o), (c.browser.safari || c.browser.mozilla) && "mousedown" == e.type && M(n).is("input[type=file]") && t.events.disableBlur();
          var r = "input, textarea, button, select, label, .fr-command";
          if (n && !M(n).is(r) && 0 === M(n).parents(r).length) return e.stopPropagation(), !1;
          n && M(n).is(r) && e.stopPropagation(), m();
        },
        _editorMouseup: function () {
          o.is(":visible") && i() && 0 < o.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length && c.events.disableBlur();
        },
        _windowMouseup: function (e) {
          if (!c.core.sameInstance(o)) return !0;
          var t = o.data("instance") || c;
          o.is(":visible") && i() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(r), m());
        },
        _windowKeydown: function (e) {
          if (!c.core.sameInstance(o)) return !0;
          var t = o.data("instance") || c,
              n = e.which;

          if (M.FE.KEYCODE.ESC == n) {
            if (t.popups.isVisible(r) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(r) && (o.find(".fr-back:visible").length ? (t.button.exec(o.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(o)) : o.find(".fr-dismiss:visible").length ? t.button.exec(o.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.toolbar.showInline(null, !0), t.accessibility.FocusPopupButton(o))), !1;
            if (t.popups.isVisible(r)) return o.find(".fr-back:visible").length ? (t.button.exec(o.find(".fr-back:visible:first")), t.accessibility.focusPopupButton(o)) : o.find(".fr-dismiss:visible").length ? t.button.exec(o.find(".fr-dismiss:visible:first")) : (t.popups.hide(r), t.accessibility.focusPopupButton(o)), !1;
          }
        },
        _doPlaceholder: function () {
          0 === M(this).next().length && M(this).attr("placeholder") && M(this).after('<label for="' + M(this).attr("id") + '">' + M(this).attr("placeholder") + "</label>"), M(this).toggleClass("fr-not-empty", "" !== M(this).val());
        },
        _repositionPopup: function () {
          if (!c.opts.height && !c.opts.heightMax || c.opts.toolbarInline) return !0;

          if (c.$wp && u(r) && o.parent().get(0) == c.$sc.get(0)) {
            var e = o.offset().top - c.$wp.offset().top,
                t = c.$wp.outerHeight();
            c.node.hasClass(o.get(0), "fr-above") && (e += o.outerHeight()), t < e || e < 0 ? o.addClass("fr-hidden") : o.removeClass("fr-hidden");
          }
        }
      };
    }

    function a(e, t) {
      c.events.on("mouseup", e._editorMouseup, !0), c.$wp && c.events.on("keydown", e._editorKeydown), c.events.on("blur", function () {
        g() && c.markers.remove(), h();
      }), c.$wp && !c.helpers.isMobile() && c.events.$on(c.$wp, "scroll.popup" + t, e._repositionPopup), c.events.on("window.mouseup", e._windowMouseup, !0), c.events.on("window.keydown", e._windowKeydown, !0), f[t].data("inst" + c.id, !0), c.events.on("destroy", function () {
        c.core.sameInstance(f[t]) && f[t].removeClass("fr-active").appendTo("body:first");
      }, !0);
    }

    function e() {
      for (var e in f) if (f.hasOwnProperty(e)) {
        var t = f[e];
        t && (t.html("").removeData().remove(), f[e] = null);
      }

      f = [];
    }

    return c.shared.exit_flag = !1, {
      _init: function () {
        c.events.on("shared.destroy", e, !0), c.events.on("window.mousedown", t), c.events.on("window.touchmove", m), c.events.$on(M(c.o_win), "scroll", m), c.events.on("mousedown", function (e) {
          g() && (e.stopPropagation(), c.$el.find(".fr-marker").remove(), t(), c.events.disableBlur());
        });
      },
      create: function (e, t) {
        var n = o(e, t),
            r = E(e);
        return a(r, e), c.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", r._preventFocus, !0), c.events.$on(n, "focus", "input, textarea, button, select", r._inputFocus, !0), c.events.$on(n, "blur", "input, textarea, button, select", r._inputBlur, !0), c.accessibility.registerPopup(e), c.events.$on(n, "keydown keyup change input", "input, textarea", r._doPlaceholder, !0), c.helpers.isIOS() && c.events.$on(n, "touchend", "label", function () {
          M("#" + M(this).attr("for")).prop("checked", function (e, t) {
            return !t;
          });
        }, !0), c.events.$on(M(c.o_win), "resize", r._windowResize, !0), n;
      },
      get: function (e) {
        var t = f[e];
        return t && !t.data("inst" + c.id) && a(E(e), e), t;
      },
      show: function (e, t, n, r) {
        if (u(e) || (g() && 0 < c.$el.find(".fr-marker").length ? (c.events.disableBlur(), c.selection.restore()) : g() || (c.events.disableBlur(), c.events.focus(), c.events.enableBlur())), h([e]), !f[e]) return !1;
        var o = c.button.getButtons(".fr-dropdown.fr-active");
        o.removeClass("fr-active").attr("aria-expanded", !1).parent(".fr-toolbar").css("zIndex", ""), o.next().attr("aria-hidden", !0), f[e].data("instance", c), c.$tb && c.$tb.data("instance", c);
        var i = f[e].outerWidth(),
            a = u(e);
        f[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
        var s,
            l,
            d = f[e].data("container");
        s = e, (l = d).is(":visible") || (l = c.$sc), 0 === l.find([f[s]]).length && l.append(f[s]), c.opts.toolbarInline && d && c.$tb && d.get(0) == c.$tb.get(0) && (p(e, c.$sc), n = c.$tb.offset().top - c.helpers.getPX(c.$tb.css("margin-top")), t = c.$tb.offset().left + c.$tb.outerWidth() / 2 + (parseFloat(c.$tb.find(".fr-arrow").css("margin-left")) || 0) + c.$tb.find(".fr-arrow").outerWidth() / 2, c.node.hasClass(c.$tb.get(0), "fr-above") && n && (n += c.$tb.outerHeight()), r = 0), d = f[e].data("container"), !c.opts.iframe || r || a || (t && (t -= c.$iframe.offset().left), n && (n -= c.$iframe.offset().top)), d.is(c.$tb) ? c.$tb.css("zIndex", (c.opts.zIndex || 1) + 4) : f[e].css("zIndex", (c.opts.zIndex || 1) + 4), t && (t -= i / 2), c.opts.toolbarBottom && d && c.$tb && d.get(0) == c.$tb.get(0) && (f[e].addClass("fr-above"), n && (n -= f[e].outerHeight())), f[e].removeClass("fr-active"), c.position.at(t, n, f[e], r || 0), f[e].addClass("fr-active"), a || c.accessibility.focusPopup(f[e]), c.opts.toolbarInline && c.toolbar.hide(), c.events.trigger("popups.show." + e), E(e)._repositionPopup(), m();
      },
      hide: n,
      onHide: function (e, t) {
        c.events.on("popups.hide." + e, t);
      },
      hideAll: h,
      setContainer: p,
      refresh: function (e) {
        f[e].data("instance", c), c.events.trigger("popups.refresh." + e);

        for (var t = f[e].find(".fr-command"), n = 0; n < t.length; n++) {
          var r = M(t[n]);
          0 === r.parents(".fr-dropdown-menu").length && c.button.refresh(r);
        }
      },
      onRefresh: function (e, t) {
        c.events.on("popups.refresh." + e, t);
      },
      onShow: function (e, t) {
        c.events.on("popups.show." + e, t);
      },
      isVisible: u,
      areVisible: g
    };
  }, M.FE.MODULES.position = function (E) {
    function o() {
      var e = E.selection.ranges(0).getBoundingClientRect();

      if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
        var t = !1;
        0 === E.$el.find(".fr-marker").length && (E.selection.save(), t = !0);
        var n = E.$el.find(".fr-marker:first");
        n.css("display", "inline"), n.css("line-height", "");
        var r = n.offset(),
            o = n.outerHeight();
        n.css("display", "none"), n.css("line-height", 0), (e = {}).left = r.left, e.width = 0, e.height = o, e.top = r.top - (E.helpers.isMobile() && !E.helpers.isIOS() || E.opts.iframe ? 0 : E.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && E.selection.restore();
      }

      return e;
    }

    function i(e, t, n, r) {
      var o = n.data("container");
      !o || "BODY" === o.get(0).tagName && "static" == o.css("position") || (e && (e -= o.offset().left), t && (t -= o.offset().top), "BODY" != o.get(0).tagName ? (e && (e += o.get(0).scrollLeft), t && (t += o.get(0).scrollTop)) : "absolute" == o.css("position") && (e && (e += o.position().left), t && (t += o.position().top))), E.opts.iframe && o && E.$tb && o.get(0) != E.$tb.get(0) && (e && (e += E.$iframe.offset().left), t && (t += E.$iframe.offset().top));
      var i,
          a,
          s = (i = e, a = n.outerWidth(!0), i + a > E.$sc.get(0).clientWidth - 10 && (i = E.$sc.get(0).clientWidth - a - 10), i < 0 && (i = 10), i);

      if (e) {
        n.css("left", s);
        var l = n.data("fr-arrow");
        l || (l = n.find(".fr-arrow"), n.data("fr-arrow", l)), l.data("margin-left") || l.data("margin-left", E.helpers.getPX(l.css("margin-left"))), l.css("margin-left", e - s + l.data("margin-left"));
      }

      t && n.css("top", function (e, t, n) {
        var r = e.outerHeight(!0);

        if (!E.helpers.isMobile() && E.$tb && e.parent().get(0) != E.$tb.get(0)) {
          var o = e.parent().offset().top,
              i = t - r - (n || 0);
          e.parent().get(0) == E.$sc.get(0) && (o -= e.parent().position().top);
          var a = E.$sc.get(0).clientHeight;
          o + t + r > E.$sc.offset().top + a && 0 < e.parent().offset().top + i && 0 < i ? i > E.$wp.scrollTop() && (t = i, e.addClass("fr-above")) : e.removeClass("fr-above");
        }

        return t;
      }(n, t, r));
    }

    function n(e) {
      var n = M(e),
          t = n.is(".fr-sticky-on"),
          r = n.data("sticky-top"),
          o = n.data("sticky-scheduled");

      if (void 0 === r) {
        n.data("sticky-top", 0);
        var i = M('<div class="fr-sticky-dummy" style="height: ' + n.outerHeight() + 'px;"></div>');
        E.$box.prepend(i);
      } else E.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());

      if (E.core.hasFocus() || 0 < E.$tb.find("input:visible:focus").length) {
        var a = E.helpers.scrollTop(),
            s = Math.min(Math.max(a - E.$tb.parent().offset().top, 0), E.$tb.parent().outerHeight() - n.outerHeight());
        s != r && s != o && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < a - E.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function () {
          var e = E.helpers.scrollTop(),
              t = Math.min(Math.max(e - E.$tb.parent().offset().top, 0), E.$tb.parent().outerHeight() - n.outerHeight());
          0 < t && "BODY" == E.$tb.parent().get(0).tagName && (t += E.$tb.parent().position().top), t != r && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0");
        }, 100))), t || (n.css("top", "0"), n.width(E.$tb.parent().width()), n.addClass("fr-sticky-on"), E.$box.addClass("fr-sticky-box"));
      } else clearTimeout(M(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.width(""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), E.$box.removeClass("fr-sticky-box");
    }

    function t(e) {
      if (e.offsetWidth) {
        var t,
            n,
            r = M(e),
            o = r.outerHeight(),
            i = r.data("sticky-position"),
            a = M("body" == E.opts.scrollableContainer ? E.o_win : E.opts.scrollableContainer).outerHeight(),
            s = 0,
            l = 0;
        "body" !== E.opts.scrollableContainer && (s = E.$sc.offset().top, l = M(E.o_win).outerHeight() - s - a);
        var d = "body" == E.opts.scrollableContainer ? E.helpers.scrollTop() : s,
            c = r.is(".fr-sticky-on");
        r.data("sticky-parent") || r.data("sticky-parent", r.parent());
        var f = r.data("sticky-parent"),
            p = f.offset().top,
            u = f.outerHeight();

        if (r.data("sticky-offset") ? E.$box.find(".fr-sticky-dummy").css("height", o + "px") : (r.data("sticky-offset", !0), r.after('<div class="fr-sticky-dummy" style="height: ' + o + 'px;"></div>')), !i) {
          var g = "auto" !== r.css("top") || "auto" !== r.css("bottom");
          g || r.css("position", "fixed"), i = {
            top: E.node.hasClass(r.get(0), "fr-top"),
            bottom: E.node.hasClass(r.get(0), "fr-bottom")
          }, g || r.css("position", ""), r.data("sticky-position", i), r.data("top", E.node.hasClass(r.get(0), "fr-top") ? r.css("top") : "auto"), r.data("bottom", E.node.hasClass(r.get(0), "fr-bottom") ? r.css("bottom") : "auto");
        }

        t = E.helpers.getPX(r.data("top")), n = E.helpers.getPX(r.data("bottom"));
        var h = i.top && p < d + t && d + t <= p + u - o && (E.helpers.isInViewPort(E.$sc.get(0)) || "body" == E.opts.scrollableContainer),
            m = i.bottom && p + o < d + a - n && d + a - n < p + u;
        h || m ? (r.css("width", f.get(0).getBoundingClientRect().width + "px"), c || (r.addClass("fr-sticky-on"), r.removeClass("fr-sticky-off"), r.css("top") && ("auto" != r.data("top") ? r.css("top", E.helpers.getPX(r.data("top")) + s) : r.data("top", "auto")), r.css("bottom") && ("auto" != r.data("bottom") ? r.css("bottom", E.helpers.getPX(r.data("bottom")) + l) : r.css("bottom", "auto")))) : E.node.hasClass(r.get(0), "fr-sticky-off") || (r.width(""), r.removeClass("fr-sticky-on"), r.addClass("fr-sticky-off"), r.css("top") && "auto" != r.data("top") && i.top && r.css("top", 0), r.css("bottom") && "auto" != r.data("bottom") && i.bottom && r.css("bottom", 0));
      }
    }

    function e() {
      if (E._stickyElements) for (var e = 0; e < E._stickyElements.length; e++) t(E._stickyElements[e]);
    }

    return {
      _init: function () {
        !function () {
          if (E._stickyElements = [], E.helpers.isIOS()) {
            var t = function () {
              if (E.helpers.requestAnimationFrame()(t), !1 !== E.events.trigger("position.refresh")) for (var e = 0; e < E._stickyElements.length; e++) n(E._stickyElements[e]);
            };

            t(), E.events.$on(M(E.o_win), "scroll", function () {
              if (E.core.hasFocus()) for (var e = 0; e < E._stickyElements.length; e++) {
                var t = M(E._stickyElements[e]),
                    n = t.parent(),
                    r = E.helpers.scrollTop();
                t.outerHeight() < r - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1));
              }
            }, !0);
          } else "body" !== E.opts.scrollableContainer && E.events.$on(M(E.opts.scrollableContainer), "scroll", e, !0), E.events.$on(M(E.o_win), "scroll", e, !0), E.events.$on(M(E.o_win), "resize", e, !0), E.events.on("initialized", e), E.events.on("focus", e), E.events.$on(M(E.o_win), "resize", "textarea", e, !0);

          E.events.on("destroy", function () {
            E._stickyElements = [];
          });
        }();
      },
      forSelection: function (e) {
        var t = o();
        e.css({
          top: 0,
          left: 0
        });
        var n = t.top + t.height,
            r = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + E.helpers.scrollLeft();
        E.opts.iframe || (n += E.helpers.scrollTop()), i(r, n, e, t.height);
      },
      addSticky: function (e) {
        e.addClass("fr-sticky"), E.helpers.isIOS() && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), E._stickyElements.push(e.get(0));
      },
      refresh: e,
      at: i,
      getBoundingRect: o
    };
  }, M.FE.MODULES.refresh = function (o) {
    function i(e, t) {
      e.toggleClass("fr-disabled", t).attr("aria-disabled", t);
    }

    return {
      undo: function (e) {
        i(e, !o.undo.canDo());
      },
      redo: function (e) {
        i(e, !o.undo.canRedo());
      },
      outdent: function (e) {
        if (o.node.hasClass(e.get(0), "fr-no-refresh")) return !1;

        for (var t = o.selection.blocks(), n = 0; n < t.length; n++) {
          var r = "rtl" == o.opts.direction || "rtl" == M(t[n]).css("direction") ? "margin-right" : "margin-left";
          if ("LI" == t[n].tagName || "LI" == t[n].parentNode.tagName) return i(e, !1), !0;
          if (0 < o.helpers.getPX(M(t[n]).css(r))) return i(e, !1), !0;
        }

        i(e, !0);
      },
      indent: function (e) {
        if (o.node.hasClass(e.get(0), "fr-no-refresh")) return !1;

        for (var t = o.selection.blocks(), n = 0; n < t.length; n++) {
          for (var r = t[n].previousSibling; r && r.nodeType == Node.TEXT_NODE && 0 === r.textContent.length;) r = r.previousSibling;

          if ("LI" != t[n].tagName || r) return i(e, !1), !0;
          i(e, !0);
        }
      }
    };
  }, M.extend(M.FE.DEFAULTS, {
    editInPopup: !1
  }), M.FE.MODULES.textEdit = function (n) {
    function t() {
      n.events.$on(n.$el, n._mouseup, function () {
        setTimeout(function () {
          var e, t;
          t = n.popups.get("text.edit"), e = "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder") : n.$el.text(), t.find("input").val(e).trigger("change"), n.popups.setContainer("text.edit", n.$sc), n.popups.show("text.edit", n.$el.offset().left + n.$el.outerWidth() / 2, n.$el.offset().top + n.$el.outerHeight(), n.$el.outerHeight());
        }, 10);
      });
    }

    return {
      _init: function () {
        var e;
        n.opts.editInPopup && (e = {
          edit: '<div id="fr-text-edit-' + n.id + '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="' + n.language.translate("Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">' + n.language.translate("Update") + "</button></div></div>"
        }, n.popups.create("text.edit", e), t());
      },
      update: function () {
        var e = n.popups.get("text.edit").find("input").val();
        0 === e.length && (e = n.opts.placeholderText), "INPUT" === n.$el.prop("tagName") ? n.$el.attr("placeholder", e) : n.$el.text(e), n.events.trigger("contentChanged"), n.popups.hide("text.edit");
      }
    };
  }, M.FE.RegisterCommand("updateText", {
    focus: !1,
    undo: !1,
    callback: function () {
      this.textEdit.update();
    }
  }), M.extend(M.FE.DEFAULTS, {
    toolbarBottom: !1,
    toolbarButtons: null,
    toolbarButtonsXS: null,
    toolbarButtonsSM: null,
    toolbarButtonsMD: null,
    toolbarContainer: null,
    toolbarInline: !1,
    toolbarSticky: !0,
    toolbarStickyOffset: 0,
    toolbarVisibleWithoutSelection: !1
  }), M.FE.TOOLBAR_BUTTONS = ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "|", "fontFamily", "fontSize", "color", "inlineClass", "inlineStyle", "paragraphStyle", "lineHeight", "|", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "quote", "-", "insertLink", "insertImage", "insertVideo", "embedly", "insertFile", "insertTable", "|", "emoticons", "fontAwesome", "specialCharacters", "insertHR", "selectAll", "clearFormatting", "|", "print", "getPDF", "spellChecker", "help", "html", "|", "undo", "redo"], M.FE.TOOLBAR_BUTTONS_MD = null, M.FE.TOOLBAR_BUTTONS_SM = ["bold", "italic", "underline", "|", "fontFamily", "fontSize", "insertLink", "insertImage", "table", "|", "undo", "redo"], M.FE.TOOLBAR_BUTTONS_XS = ["bold", "italic", "fontFamily", "fontSize", "|", "undo", "redo"], M.FE.MODULES.toolbar = function (o) {
    var r = [];

    function i(e, t) {
      for (var n = 0; n < t.length; n++) "-" != t[n] && "|" != t[n] && e.indexOf(t[n]) < 0 && e.push(t[n]);
    }

    function a() {
      var e = o.helpers.screenSize();
      return r[e];
    }

    function e() {
      var e = a();
      o.$tb.find(".fr-separator").remove(), o.$tb.find("> .fr-command, > div.fr-btn-wrap").addClass("fr-hidden");

      for (var t = 0; t < e.length; t++) if ("|" == e[t] || "-" == e[t]) o.$tb.append(o.button.buildList([e[t]]));else {
        var n = o.$tb.find('> .fr-command[data-cmd="' + e[t] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + e[t] + '"]'),
            r = null;
        o.node.hasClass(n.next().get(0), "fr-dropdown-menu") && (r = n.next()), o.node.hasClass(n.next().get(0), "fr-options") && (n = n.parent()), n.removeClass("fr-hidden").appendTo(o.$tb), r && r.appendTo(o.$tb);
      }
    }

    function t(e, t) {
      setTimeout(function () {
        if ((!e || e.which != M.FE.KEYCODE.ESC) && o.selection.inEditor() && o.core.hasFocus() && !o.popups.areVisible() && (o.opts.toolbarVisibleWithoutSelection || !o.selection.isCollapsed() && !o.keys.isIME() || t)) {
          if (o.$tb.data("instance", o), !1 === o.events.trigger("toolbar.show", [e])) return !1;
          o.$tb.show(), o.opts.toolbarContainer || o.position.forSelection(o.$tb), 1 < o.opts.zIndex ? o.$tb.css("z-index", o.opts.zIndex + 1) : o.$tb.css("z-index", null);
        }
      }, 0);
    }

    function n(e) {
      return (!e || "blur" !== e.type || document.activeElement !== o.el) && (!(!e || "keydown" !== e.type || !o.keys.ctrlKey(e)) || !!o.button.getButtons(".fr-dropdown.fr-active").next().find(o.o_doc.activeElement).length || void (!1 !== o.events.trigger("toolbar.hide") && o.$tb.hide()));
    }

    r[M.FE.XS] = o.opts.toolbarButtonsXS || o.opts.toolbarButtons || M.FE.TOOLBAR_BUTTONS_XS || M.FE.TOOLBAR_BUTTONS || [], r[M.FE.SM] = o.opts.toolbarButtonsSM || o.opts.toolbarButtons || M.FE.TOOLBAR_BUTTONS_SM || M.FE.TOOLBAR_BUTTONS || [], r[M.FE.MD] = o.opts.toolbarButtonsMD || o.opts.toolbarButtons || M.FE.TOOLBAR_BUTTONS_MD || M.FE.TOOLBAR_BUTTONS || [], r[M.FE.LG] = o.opts.toolbarButtons || M.FE.TOOLBAR_BUTTONS || [];
    var s = null;

    function l(e) {
      clearTimeout(s), e && e.which == M.FE.KEYCODE.ESC || (s = setTimeout(t, o.opts.typingTimer));
    }

    function d() {
      o.events.on("window.mousedown", n), o.events.on("keydown", n), o.events.on("blur", n), o.helpers.isMobile() || o.events.on("window.mouseup", t), o.helpers.isMobile() ? o.helpers.isIOS() || (o.events.on("window.touchend", t), o.browser.mozilla && setInterval(t, 200)) : o.events.on("window.keyup", l), o.events.on("keydown", function (e) {
        e && e.which == M.FE.KEYCODE.ESC && n();
      }), o.events.on("keydown", function (e) {
        if (e.which == M.FE.KEYCODE.ALT) return e.stopPropagation(), !1;
      }, !0), o.events.$on(o.$wp, "scroll.toolbar", t), o.events.on("commands.after", t), o.helpers.isMobile() && (o.events.$on(o.$doc, "selectionchange", l), o.events.$on(o.$doc, "orientationchange", t));
    }

    function c() {
      o.$tb.html("").removeData().remove(), o.$tb = null;
    }

    function f() {
      o.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), o.$box.find(".fr-sticky-dummy").remove();
    }

    function p() {
      o.opts.theme && o.$tb.addClass(o.opts.theme + "-theme"), 1 < o.opts.zIndex && o.$tb.css("z-index", o.opts.zIndex + 1), "auto" != o.opts.direction && o.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-" + o.opts.direction), o.helpers.isMobile() ? o.$tb.addClass("fr-mobile") : o.$tb.addClass("fr-desktop"), o.opts.toolbarContainer ? (o.opts.toolbarInline && (d(), n()), o.opts.toolbarBottom ? o.$tb.addClass("fr-bottom") : o.$tb.addClass("fr-top")) : o.opts.toolbarInline ? (o.$sc.append(o.$tb), o.$tb.data("container", o.$sc), o.$tb.addClass("fr-inline"), o.$tb.prepend('<span class="fr-arrow"></span>'), d(), o.opts.toolbarBottom = !1) : (o.opts.toolbarBottom && !o.helpers.isIOS() ? (o.$box.append(o.$tb), o.$tb.addClass("fr-bottom"), o.$box.addClass("fr-bottom")) : (o.opts.toolbarBottom = !1, o.$box.prepend(o.$tb), o.$tb.addClass("fr-top"), o.$box.addClass("fr-top")), o.$tb.addClass("fr-basic"), o.opts.toolbarSticky && (o.opts.toolbarStickyOffset && (o.opts.toolbarBottom ? o.$tb.css("bottom", o.opts.toolbarStickyOffset) : o.$tb.css("top", o.opts.toolbarStickyOffset)), o.position.addSticky(o.$tb))), function () {
        var e = M.merge([], a());
        i(e, r[M.FE.XS]), i(e, r[M.FE.SM]), i(e, r[M.FE.MD]), i(e, r[M.FE.LG]);

        for (var t = e.length - 1; 0 <= t; t--) "-" != e[t] && "|" != e[t] && e.indexOf(e[t]) < t && e.splice(t, 1);

        var n = o.button.buildList(e, a());
        o.$tb.append(n), o.button.bindCommands(o.$tb);
      }(), o.events.$on(M(o.o_win), "resize", e), o.events.$on(M(o.o_win), "orientationchange", e), o.accessibility.registerToolbar(o.$tb), o.events.$on(o.$tb, o._mousedown + " " + o._mouseup, function (e) {
        var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
        if (t && "INPUT" != t.tagName && !o.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
      }, !0);
    }

    var u = !1;
    return {
      _init: function () {
        if (o.$sc = M(o.opts.scrollableContainer).first(), !o.$wp) return !1;
        o.opts.toolbarContainer ? (o.shared.$tb ? (o.$tb = o.shared.$tb, o.opts.toolbarInline && d()) : (o.shared.$tb = M('<div class="fr-toolbar"></div>'), o.$tb = o.shared.$tb, M(o.opts.toolbarContainer).append(o.$tb), p(), o.$tb.data("instance", o)), o.opts.toolbarInline ? o.$box.addClass("fr-inline") : o.$box.addClass("fr-basic"), o.events.on("focus", function () {
          o.$tb.data("instance", o);
        }, !0), o.opts.toolbarInline = !1) : o.opts.toolbarInline ? (o.$box.addClass("fr-inline"), o.shared.$tb ? (o.$tb = o.shared.$tb, d()) : (o.shared.$tb = M('<div class="fr-toolbar"></div>'), o.$tb = o.shared.$tb, p())) : (o.$box.addClass("fr-basic"), o.$tb = M('<div class="fr-toolbar"></div>'), p(), o.$tb.data("instance", o)), o.events.on("destroy", f, !0), o.events.on(o.opts.toolbarInline || o.opts.toolbarContainer ? "shared.destroy" : "destroy", c, !0);
      },
      hide: n,
      show: function () {
        if (!1 === o.events.trigger("toolbar.show")) return !1;
        o.$tb.show();
      },
      showInline: t,
      disable: function () {
        !u && o.$tb && (o.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), u = !0);
      },
      enable: function () {
        u && o.$tb && (o.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), u = !1), o.button.bulkRefresh();
      }
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/align.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/align.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (r) {
  r.FE.PLUGINS.align = function (a) {
    return {
      apply: function (e) {
        var n = a.selection.element();
        if (r(n).parents(".fr-img-caption").length) r(n).css("text-align", e);else {
          a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();

          for (var t = a.selection.blocks(), i = 0; i < t.length; i++) a.helpers.getAlignment(r(t[i].parentNode)) == e ? r(t[i]).css("text-align", "").removeClass("fr-temp-div") : r(t[i]).css("text-align", e).removeClass("fr-temp-div"), "" === r(t[i]).attr("class") && r(t[i]).removeAttr("class"), "" === r(t[i]).attr("style") && r(t[i]).removeAttr("style");

          a.selection.save(), a.html.unwrap(), a.selection.restore();
        }
      },
      refresh: function (e) {
        var n = a.selection.blocks();

        if (n.length) {
          var t = a.helpers.getAlignment(r(n[0]));
          e.find("> *:first").replaceWith(a.icon.create("align-" + t));
        }
      },
      refreshOnShow: function (e, n) {
        var t = a.selection.blocks();

        if (t.length) {
          var i = a.helpers.getAlignment(r(t[0]));
          n.find('a.fr-command[data-param1="' + i + '"]').addClass("fr-active").attr("aria-selected", !0);
        }
      },
      refreshForToolbar: function (e) {
        var n = a.selection.blocks();

        if (n.length) {
          var t = a.helpers.getAlignment(r(n[0]));
          "align" + (t = t.charAt(0).toUpperCase() + t.slice(1)) == e.attr("data-cmd") && e.addClass("fr-active");
        }
      }
    };
  }, r.FE.DefineIcon("align", {
    NAME: "align-left"
  }), r.FE.DefineIcon("align-left", {
    NAME: "align-left"
  }), r.FE.DefineIcon("align-right", {
    NAME: "align-right"
  }), r.FE.DefineIcon("align-center", {
    NAME: "align-center"
  }), r.FE.DefineIcon("align-justify", {
    NAME: "align-justify"
  }), r.FE.RegisterCommand("align", {
    type: "dropdown",
    title: "Align",
    options: {
      left: "Align Left",
      center: "Align Center",
      right: "Align Right",
      justify: "Align Justify"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          n = r.FE.COMMANDS.align.options;

      for (var t in n) n.hasOwnProperty(t) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="' + t + '" title="' + this.language.translate(n[t]) + '">' + this.icon.create("align-" + t) + '<span class="fr-sr-only">' + this.language.translate(n[t]) + "</span></a></li>");

      return e += "</ul>";
    },
    callback: function (e, n) {
      this.align.apply(n);
    },
    refresh: function (e) {
      this.align.refresh(e);
    },
    refreshOnShow: function (e, n) {
      this.align.refreshOnShow(e, n);
    },
    plugin: "align"
  }), r.FE.RegisterCommand("alignLeft", {
    type: "button",
    icon: "align-left",
    callback: function () {
      this.align.apply("left");
    },
    refresh: function (e) {
      this.align.refreshForToolbar(e);
    }
  }), r.FE.RegisterCommand("alignRight", {
    type: "button",
    icon: "align-right",
    callback: function () {
      this.align.apply("right");
    },
    refresh: function (e) {
      this.align.refreshForToolbar(e);
    }
  }), r.FE.RegisterCommand("alignCenter", {
    type: "button",
    icon: "align-center",
    callback: function () {
      this.align.apply("center");
    },
    refresh: function (e) {
      this.align.refreshForToolbar(e);
    }
  }), r.FE.RegisterCommand("alignJustify", {
    type: "button",
    icon: "align-justify",
    callback: function () {
      this.align.apply("justify");
    },
    refresh: function (e) {
      this.align.refreshForToolbar(e);
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/char_counter.min.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/char_counter.min.js ***!
  \**********************************************************************/
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
}(function (a) {
  a.extend(a.FE.DEFAULTS, {
    charCounterMax: -1,
    charCounterCount: !0
  }), a.FE.PLUGINS.charCounter = function (n) {
    var r;

    function o() {
      return (n.el.textContent || "").replace(/\u200B/g, "").length;
    }

    function e(e) {
      if (n.opts.charCounterMax < 0) return !0;
      if (o() < n.opts.charCounterMax) return !0;
      var t = e.which;
      return !(!n.keys.ctrlKey(e) && n.keys.isCharacter(t) || t === a.FE.KEYCODE.IME) || (e.preventDefault(), e.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1);
    }

    function t(e) {
      return n.opts.charCounterMax < 0 ? e : a("<div>").html(e).text().length + o() <= n.opts.charCounterMax ? e : (n.events.trigger("charCounter.exceeded"), "");
    }

    function u() {
      if (n.opts.charCounterCount) {
        var e = o() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
        r.text(e), n.opts.toolbarBottom && r.css("margin-bottom", n.$tb.outerHeight(!0));
        var t = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
        0 <= t && ("rtl" == n.opts.direction ? r.css("margin-left", t) : r.css("margin-right", t));
      }
    }

    return {
      _init: function () {
        return !!n.$wp && !!n.opts.charCounterCount && ((r = a('<span class="fr-counter"></span>')).css("bottom", n.$wp.css("border-bottom-width")), n.$box.append(r), n.events.on("keydown", e, !0), n.events.on("paste.afterCleanup", t), n.events.on("keyup contentChanged input", function () {
          n.events.trigger("charCounter.update");
        }), n.events.on("charCounter.update", u), n.events.trigger("charCounter.update"), void n.events.on("destroy", function () {
          a(n.o_win).off("resize.char" + n.id), r.removeData().remove(), r = null;
        }));
      },
      count: o
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/code_view.min.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/code_view.min.js ***!
  \*******************************************************************/
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
}(function (x) {
  x.extend(x.FE.DEFAULTS, {
    codeMirror: window.CodeMirror,
    codeMirrorOptions: {
      lineNumbers: !0,
      tabMode: "indent",
      indentWithTabs: !0,
      lineWrapping: !0,
      mode: "text/html",
      tabSize: 2
    },
    codeBeautifierOptions: {
      end_with_newline: !0,
      indent_inner_html: !0,
      extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"],
      brace_style: "expand",
      indent_char: "\t",
      indent_size: 1,
      wrap_line_length: 0
    },
    codeViewKeepActiveButtons: ["fullscreen"]
  }), x.FE.PLUGINS.codeView = function (l) {
    var c, d;

    function h() {
      return l.$box.hasClass("fr-code-view");
    }

    function u() {
      return d ? d.getValue() : c.val();
    }

    function f() {
      h() && (d && d.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin || l.opts.height ? l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", l.opts.heightMin || l.opts.height) : l.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", ""));
    }

    var p,
        g = !1;

    function m() {
      h() && l.events.trigger("blur");
    }

    function b() {
      h() && g && l.events.trigger("focus");
    }

    function i(e) {
      c || (!function () {
        c = x('<textarea class="fr-code" tabIndex="-1">'), l.$wp.append(c), c.attr("dir", l.opts.direction), l.$box.hasClass("fr-basic") || (p = x('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch' + (l.helpers.isMobile() ? "" : " fr-desktop") + '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>'), l.$box.append(p), l.events.bindClick(l.$box, "a.html-switch", function () {
          l.events.trigger("commands.before", ["html"]), v(!1), l.events.trigger("commands.after", ["html"]);
        }));

        var e = function () {
          return !h();
        };

        l.events.on("buttons.refresh", e), l.events.on("copy", e, !0), l.events.on("cut", e, !0), l.events.on("paste", e, !0), l.events.on("destroy", M, !0), l.events.on("html.set", function () {
          h() && v(!0);
        }), l.events.on("codeView.update", f), l.events.on("form.submit", function () {
          h() && (l.html.set(u()), l.events.trigger("contentChanged", [], !0));
        }, !0);
      }(), !d && l.opts.codeMirror ? ((d = l.opts.codeMirror.fromTextArea(c.get(0), l.opts.codeMirrorOptions)).on("blur", m), d.on("focus", b)) : (l.events.$on(c, "keydown keyup change input", function () {
        l.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = this.scrollHeight + "px");
      }), l.events.$on(c, "blur", m), l.events.$on(c, "focus", b))), l.undo.saveStep(), l.html.cleanEmptyTags(), l.html.cleanWhiteTags(!0), l.core.hasFocus() && (l.core.isEmpty() || (l.selection.save(), l.$el.find('.fr-marker[data-type="true"]:first').replaceWith('<span class="fr-tmp fr-sm">F</span>'), l.$el.find('.fr-marker[data-type="false"]:last').replaceWith('<span class="fr-tmp fr-em">F</span>')));
      var t = l.html.get(!1, !0);
      l.$el.find("span.fr-tmp").remove(), l.$box.toggleClass("fr-code-view", !0);
      var n,
          s,
          i = !1;

      if (l.core.hasFocus() && (i = !0, l.events.disableBlur(), l.$el.blur()), t = (t = t.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), l.codeBeautifier && (t = l.codeBeautifier.run(t, l.opts.codeBeautifierOptions)), d) {
        n = t.indexOf("FROALA-SM"), (s = t.indexOf("FROALA-EM")) < n ? n = s : s -= 9;
        var o = (t = t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, n).length - t.substring(0, n).replace(/\n/g, "").length,
            r = t.substring(0, s).length - t.substring(0, s).replace(/\n/g, "").length;
        n = t.substring(0, n).length - t.substring(0, t.substring(0, n).lastIndexOf("\n") + 1).length, s = t.substring(0, s).length - t.substring(0, t.substring(0, s).lastIndexOf("\n") + 1).length, d.setSize(null, l.opts.height ? l.opts.height : "auto"), l.opts.heightMin && l.$box.find(".CodeMirror-scroll").css("min-height", l.opts.heightMin), d.setValue(t), g = !i, d.focus(), g = !0, d.setSelection({
          line: o,
          ch: n
        }, {
          line: r,
          ch: s
        }), d.refresh(), d.clearHistory();
      } else {
        n = t.indexOf("FROALA-SM"), s = t.indexOf("FROALA-EM") - 9, l.opts.heightMin && c.css("min-height", l.opts.heightMin), l.opts.height && c.css("height", l.opts.height), l.opts.heightMax && c.css("max-height", l.opts.height || l.opts.heightMax), c.val(t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
        var a = x(l.o_doc).scrollTop();
        g = !i, c.focus(), g = !0, c.get(0).setSelectionRange(n, s), x(l.o_doc).scrollTop(a);
      }

      l.$tb.find(" > .fr-command").not(e).filter(function () {
        return l.opts.codeViewKeepActiveButtons.indexOf(x(this).data("cmd")) < 0;
      }).addClass("fr-disabled").attr("aria-disabled", !0), e.addClass("fr-active").attr("aria-pressed", !0), !l.helpers.isMobile() && l.opts.toolbarInline && l.toolbar.hide();
    }

    function v(e) {
      void 0 === e && (e = !h());
      var t,
          n,
          s = l.$tb.find('.fr-command[data-cmd="html"]');
      e ? (l.popups.hideAll(), i(s)) : (l.$box.toggleClass("fr-code-view", !1), t = s, n = u(), l.html.set(n), l.$el.blur(), l.$tb.find(" > .fr-command").not(t).removeClass("fr-disabled").attr("aria-disabled", !1), t.removeClass("fr-active").attr("aria-pressed", !1), l.selection.setAtStart(l.el), l.selection.restore(), l.placeholder.refresh(), l.undo.saveStep());
    }

    function M() {
      h() && v(!1), d && d.toTextArea(), c.val("").removeData().remove(), c = null, p && (p.remove(), p = null);
    }

    return {
      _init: function () {
        if (!l.$wp) return !1;
      },
      toggle: v,
      isActive: h,
      get: u
    };
  }, x.FE.RegisterCommand("html", {
    title: "Code View",
    undo: !1,
    focus: !1,
    forcedRefresh: !0,
    toggle: !0,
    callback: function () {
      this.codeView.toggle();
    },
    plugin: "codeView"
  }), x.FE.DefineIcon("html", {
    NAME: "code"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/colors.min.js":
/*!****************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/colors.min.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (r) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (C) {
  C.extend(C.FE.POPUP_TEMPLATES, {
    "colors.picker": "[_BUTTONS_][_TEXT_COLORS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]"
  }), C.extend(C.FE.DEFAULTS, {
    colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
    colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
    colorsStep: 7,
    colorsHEXInput: !0,
    colorsDefaultTab: "text",
    colorsButtons: ["colorsBack", "|", "-"]
  }), C.FE.PLUGINS.colors = function (E) {
    function e() {
      E.popups.hide("colors.picker");
    }

    function s(o) {
      for (var e = "text" == o ? E.opts.colorsText : E.opts.colorsBackground, r = '<div class="fr-color-set fr-' + o + "-color" + (E.opts.colorsDefaultTab == o || "text" != E.opts.colorsDefaultTab && "background" != E.opts.colorsDefaultTab && "text" == o ? " fr-selected-set" : "") + '">', t = 0; t < e.length; t++) 0 !== t && t % E.opts.colorsStep == 0 && (r += "<br>"), "REMOVE" != e[t] ? r += '<span class="fr-command fr-select-color" style="background: ' + e[t] + ';" tabIndex="-1" aria-selected="false" role="button" data-cmd="' + o + 'Color" data-param1="' + e[t] + '"><span class="fr-sr-only">' + E.language.translate("Color") + " " + e[t] + "&nbsp;&nbsp;&nbsp;</span></span>" : r += '<span class="fr-command fr-select-color" data-cmd="' + o + 'Color" tabIndex="-1" role="button" data-param1="REMOVE" title="' + E.language.translate("Clear Formatting") + '">' + E.icon.create("remove") + '<span class="fr-sr-only">' + E.language.translate("Clear Formatting") + "</span></span>";

      return r + "</div>";
    }

    function a(o) {
      var e,
          r = E.popups.get("colors.picker"),
          t = C(E.selection.element());
      e = "background" == o ? "background-color" : "color";
      var a = r.find(".fr-" + o + "-color .fr-select-color");

      for (a.find(".fr-selected-color").remove(), a.removeClass("fr-active-item"), a.not('[data-param1="REMOVE"]').attr("aria-selected", !1); t.get(0) != E.el;) {
        if ("transparent" != t.css(e) && "rgba(0, 0, 0, 0)" != t.css(e)) {
          var s = r.find(".fr-" + o + '-color .fr-select-color[data-param1="' + E.helpers.RGBToHex(t.css(e)) + '"]');
          s.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), s.addClass("fr-active-item").attr("aria-selected", !0);
          break;
        }

        t = t.parent();
      }

      var l = r.find(".fr-color-hex-layer input");
      l.length && l.val(E.helpers.RGBToHex(t.css(e))).trigger("change");
    }

    function t(o) {
      "REMOVE" != o ? E.format.applyStyle("background-color", E.helpers.HEXtoRGB(o)) : E.format.removeStyle("background-color"), e();
    }

    function l(o) {
      "REMOVE" != o ? E.format.applyStyle("color", E.helpers.HEXtoRGB(o)) : E.format.removeStyle("color"), e();
    }

    return {
      showColorsPopup: function () {
        var o = E.$tb.find('.fr-command[data-cmd="color"]'),
            e = E.popups.get("colors.picker");
        if (e || (e = function () {
          var o,
              e = '<div class="fr-buttons fr-colors-buttons">';
          E.opts.toolbarInline && 0 < E.opts.colorsButtons.length && (e += E.button.buildList(E.opts.colorsButtons)), e += (o = '<div class="fr-colors-tabs fr-group">', o += '<span class="fr-colors-tab ' + ("background" == E.opts.colorsDefaultTab ? "" : "fr-selected-tab ") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" != E.opts.colorsDefaultTab) + '" data-param1="text" data-cmd="colorChangeSet" title="' + E.language.translate("Text") + '">' + E.language.translate("Text") + "</span>", (o += '<span class="fr-colors-tab ' + ("background" == E.opts.colorsDefaultTab ? "fr-selected-tab " : "") + 'fr-command" tabIndex="-1" role="button" aria-pressed="' + ("background" == E.opts.colorsDefaultTab) + '" data-param1="background" data-cmd="colorChangeSet" title="' + E.language.translate("Background") + '">' + E.language.translate("Background") + "</span>") + "</div></div>");
          var r = "";
          E.opts.colorsHEXInput && (r = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer-' + E.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-color-hex-layer-text-' + E.id + '" type="text" placeholder="' + E.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="customColor" tabIndex="2" role="button">' + E.language.translate("OK") + "</button></div></div>");
          var b,
              t = {
            buttons: e,
            text_colors: s("text"),
            background_colors: s("background"),
            custom_color: r
          },
              a = E.popups.create("colors.picker", t);
          return b = a, E.events.on("popup.tab", function (o) {
            var e = C(o.currentTarget);
            if (!E.popups.isVisible("colors.picker") || !e.is("span")) return !0;
            var r = o.which,
                t = !0;

            if (C.FE.KEYCODE.TAB == r) {
              var a = b.find(".fr-buttons");
              t = !E.accessibility.focusToolbar(a, !!o.shiftKey);
            } else if (C.FE.KEYCODE.ARROW_UP == r || C.FE.KEYCODE.ARROW_DOWN == r || C.FE.KEYCODE.ARROW_LEFT == r || C.FE.KEYCODE.ARROW_RIGHT == r) {
              if (e.is("span.fr-select-color")) {
                var s = e.parent().find("span.fr-select-color"),
                    l = s.index(e),
                    c = E.opts.colorsStep,
                    n = Math.floor(s.length / c),
                    i = l % c,
                    p = Math.floor(l / c),
                    u = p * c + i,
                    d = n * c;
                C.FE.KEYCODE.ARROW_UP == r ? u = ((u - c) % d + d) % d : C.FE.KEYCODE.ARROW_DOWN == r ? u = (u + c) % d : C.FE.KEYCODE.ARROW_LEFT == r ? u = ((u - 1) % d + d) % d : C.FE.KEYCODE.ARROW_RIGHT == r && (u = (u + 1) % d);
                var f = C(s.get(u));
                E.events.disableBlur(), f.focus(), t = !1;
              }
            } else C.FE.KEYCODE.ENTER == r && (E.button.exec(e), t = !1);

            return !1 === t && (o.preventDefault(), o.stopPropagation()), t;
          }, !0), a;
        }()), !e.hasClass("fr-active")) if (E.popups.setContainer("colors.picker", E.$tb), a(e.find(".fr-selected-tab").attr("data-param1")), o.is(":visible")) {
          var r = o.offset().left + o.outerWidth() / 2,
              t = o.offset().top + (E.opts.toolbarBottom ? 10 : o.outerHeight() - 10);
          E.popups.show("colors.picker", r, t, o.outerHeight());
        } else E.position.forSelection(e), E.popups.show("colors.picker");
      },
      hideColorsPopup: e,
      changeSet: function (o, e) {
        o.hasClass("fr-selected-tab") || (o.siblings().removeClass("fr-selected-tab").attr("aria-pressed", !1), o.addClass("fr-selected-tab").attr("aria-pressed", !0), o.parents(".fr-popup").find(".fr-color-set").removeClass("fr-selected-set"), o.parents(".fr-popup").find(".fr-color-set.fr-" + e + "-color").addClass("fr-selected-set"), a(e)), E.accessibility.focusPopup(o.parents(".fr-popup"));
      },
      background: t,
      customColor: function () {
        var o = E.popups.get("colors.picker"),
            e = o.find(".fr-color-hex-layer input");

        if (e.length) {
          var r = e.val();
          "background" == o.find(".fr-selected-tab").attr("data-param1") ? t(r) : l(r);
        }
      },
      text: l,
      back: function () {
        E.popups.hide("colors.picker"), E.toolbar.showInline();
      }
    };
  }, C.FE.DefineIcon("colors", {
    NAME: "tint"
  }), C.FE.RegisterCommand("color", {
    title: "Colors",
    undo: !1,
    focus: !0,
    refreshOnCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("colors.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("colors.picker")) : this.colors.showColorsPopup();
    },
    plugin: "colors"
  }), C.FE.RegisterCommand("textColor", {
    undo: !0,
    callback: function (o, e) {
      this.colors.text(e);
    }
  }), C.FE.RegisterCommand("backgroundColor", {
    undo: !0,
    callback: function (o, e) {
      this.colors.background(e);
    }
  }), C.FE.RegisterCommand("colorChangeSet", {
    undo: !1,
    focus: !1,
    callback: function (o, e) {
      var r = this.popups.get("colors.picker").find('.fr-command[data-cmd="' + o + '"][data-param1="' + e + '"]');
      this.colors.changeSet(r, e);
    }
  }), C.FE.DefineIcon("colorsBack", {
    NAME: "arrow-left"
  }), C.FE.RegisterCommand("colorsBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.colors.back();
    }
  }), C.FE.RegisterCommand("customColor", {
    title: "OK",
    undo: !0,
    callback: function () {
      this.colors.customColor();
    }
  }), C.FE.DefineIcon("remove", {
    NAME: "eraser"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/emoticons.min.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/emoticons.min.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (g) {
  g.extend(g.FE.POPUP_TEMPLATES, {
    emoticons: "[_BUTTONS_][_EMOTICONS_]"
  }), g.extend(g.FE.DEFAULTS, {
    emoticonsStep: 8,
    emoticonsSet: [{
      code: "1f600",
      desc: "Grinning face"
    }, {
      code: "1f601",
      desc: "Grinning face with smiling eyes"
    }, {
      code: "1f602",
      desc: "Face with tears of joy"
    }, {
      code: "1f603",
      desc: "Smiling face with open mouth"
    }, {
      code: "1f604",
      desc: "Smiling face with open mouth and smiling eyes"
    }, {
      code: "1f605",
      desc: "Smiling face with open mouth and cold sweat"
    }, {
      code: "1f606",
      desc: "Smiling face with open mouth and tightly-closed eyes"
    }, {
      code: "1f607",
      desc: "Smiling face with halo"
    }, {
      code: "1f608",
      desc: "Smiling face with horns"
    }, {
      code: "1f609",
      desc: "Winking face"
    }, {
      code: "1f60a",
      desc: "Smiling face with smiling eyes"
    }, {
      code: "1f60b",
      desc: "Face savoring delicious food"
    }, {
      code: "1f60c",
      desc: "Relieved face"
    }, {
      code: "1f60d",
      desc: "Smiling face with heart-shaped eyes"
    }, {
      code: "1f60e",
      desc: "Smiling face with sunglasses"
    }, {
      code: "1f60f",
      desc: "Smirking face"
    }, {
      code: "1f610",
      desc: "Neutral face"
    }, {
      code: "1f611",
      desc: "Expressionless face"
    }, {
      code: "1f612",
      desc: "Unamused face"
    }, {
      code: "1f613",
      desc: "Face with cold sweat"
    }, {
      code: "1f614",
      desc: "Pensive face"
    }, {
      code: "1f615",
      desc: "Confused face"
    }, {
      code: "1f616",
      desc: "Confounded face"
    }, {
      code: "1f617",
      desc: "Kissing face"
    }, {
      code: "1f618",
      desc: "Face throwing a kiss"
    }, {
      code: "1f619",
      desc: "Kissing face with smiling eyes"
    }, {
      code: "1f61a",
      desc: "Kissing face with closed eyes"
    }, {
      code: "1f61b",
      desc: "Face with stuck out tongue"
    }, {
      code: "1f61c",
      desc: "Face with stuck out tongue and winking eye"
    }, {
      code: "1f61d",
      desc: "Face with stuck out tongue and tightly-closed eyes"
    }, {
      code: "1f61e",
      desc: "Disappointed face"
    }, {
      code: "1f61f",
      desc: "Worried face"
    }, {
      code: "1f620",
      desc: "Angry face"
    }, {
      code: "1f621",
      desc: "Pouting face"
    }, {
      code: "1f622",
      desc: "Crying face"
    }, {
      code: "1f623",
      desc: "Persevering face"
    }, {
      code: "1f624",
      desc: "Face with look of triumph"
    }, {
      code: "1f625",
      desc: "Disappointed but relieved face"
    }, {
      code: "1f626",
      desc: "Frowning face with open mouth"
    }, {
      code: "1f627",
      desc: "Anguished face"
    }, {
      code: "1f628",
      desc: "Fearful face"
    }, {
      code: "1f629",
      desc: "Weary face"
    }, {
      code: "1f62a",
      desc: "Sleepy face"
    }, {
      code: "1f62b",
      desc: "Tired face"
    }, {
      code: "1f62c",
      desc: "Grimacing face"
    }, {
      code: "1f62d",
      desc: "Loudly crying face"
    }, {
      code: "1f62e",
      desc: "Face with open mouth"
    }, {
      code: "1f62f",
      desc: "Hushed face"
    }, {
      code: "1f630",
      desc: "Face with open mouth and cold sweat"
    }, {
      code: "1f631",
      desc: "Face screaming in fear"
    }, {
      code: "1f632",
      desc: "Astonished face"
    }, {
      code: "1f633",
      desc: "Flushed face"
    }, {
      code: "1f634",
      desc: "Sleeping face"
    }, {
      code: "1f635",
      desc: "Dizzy face"
    }, {
      code: "1f636",
      desc: "Face without mouth"
    }, {
      code: "1f637",
      desc: "Face with medical mask"
    }],
    emoticonsButtons: ["emoticonsBack", "|"],
    emoticonsUseImage: !0
  }), g.FE.PLUGINS.emoticons = function (E) {
    function n() {
      if (!E.selection.isCollapsed()) return !1;
      var e = E.selection.element(),
          o = E.selection.endElement();
      if (e && E.node.hasClass(e, "fr-emoticon")) return e;
      if (o && E.node.hasClass(o, "fr-emoticon")) return o;
      var t = E.selection.ranges(0),
          s = t.startContainer;

      if (s.nodeType == Node.ELEMENT_NODE && 0 < s.childNodes.length && 0 < t.startOffset) {
        var n = s.childNodes[t.startOffset - 1];
        if (E.node.hasClass(n, "fr-emoticon")) return n;
      }

      return !1;
    }

    return {
      _init: function () {
        var e = function () {
          for (var e = E.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"), o = 0; o < e.length; o++) e[o].className += " fr-deletable";
        };

        e(), E.events.on("html.set", e), E.events.on("keydown", function (e) {
          if (E.keys.isCharacter(e.which) && E.selection.inEditor()) {
            var o = E.selection.ranges(0),
                t = n();
            E.node.hasClass(t, "fr-emoticon-img") && t && (0 === o.startOffset && E.selection.element() === t ? g(t).before(g.FE.MARKERS + g.FE.INVISIBLE_SPACE) : g(t).after(g.FE.INVISIBLE_SPACE + g.FE.MARKERS), E.selection.restore());
          }
        }), E.events.on("keyup", function (e) {
          for (var o = E.el.querySelectorAll(".fr-emoticon"), t = 0; t < o.length; t++) "undefined" != typeof o[t].textContent && 0 === o[t].textContent.replace(/\u200B/gi, "").length && g(o[t]).remove();

          if (!(e.which >= g.FE.KEYCODE.ARROW_LEFT && e.which <= g.FE.KEYCODE.ARROW_DOWN)) {
            var s = n();
            E.node.hasClass(s, "fr-emoticon-img") && (g(s).append(g.FE.MARKERS), E.selection.restore());
          }
        });
      },
      insert: function (e, o) {
        var t = n(),
            s = E.selection.ranges(0);
        t ? (0 === s.startOffset && E.selection.element() === t ? g(t).before(g.FE.MARKERS + g.FE.INVISIBLE_SPACE) : 0 < s.startOffset && E.selection.element() === t && s.commonAncestorContainer.parentNode.classList.contains("fr-emoticon") && g(t).after(g.FE.INVISIBLE_SPACE + g.FE.MARKERS), E.selection.restore(), E.html.insert('<span class="fr-emoticon fr-deletable' + (o ? " fr-emoticon-img" : "") + '"' + (o ? ' style="background: url(' + o + ');"' : "") + ">" + (o ? "&nbsp;" : e) + "</span>&nbsp;" + g.FE.MARKERS, !0)) : E.html.insert('<span class="fr-emoticon fr-deletable' + (o ? " fr-emoticon-img" : "") + '"' + (o ? ' style="background: url(' + o + ');"' : "") + ">" + (o ? "&nbsp;" : e) + "</span>&nbsp;", !0);
      },
      showEmoticonsPopup: function () {
        var e = E.$tb.find('.fr-command[data-cmd="emoticons"]'),
            o = E.popups.get("emoticons");

        if (o || (o = function () {
          var e = "";
          E.opts.toolbarInline && 0 < E.opts.emoticonsButtons.length && (e = '<div class="fr-buttons fr-emoticons-buttons">' + E.button.buildList(E.opts.emoticonsButtons) + "</div>");
          var h,
              o = {
            buttons: e,
            emoticons: function () {
              for (var e = '<div style="text-align: center">', o = 0; o < E.opts.emoticonsSet.length; o++) 0 !== o && o % E.opts.emoticonsStep == 0 && (e += "<br>"), e += '<span class="fr-command fr-emoticon" tabIndex="-1" data-cmd="insertEmoticon" title="' + E.language.translate(E.opts.emoticonsSet[o].desc) + '" role="button" data-param1="' + E.opts.emoticonsSet[o].code + '">' + (E.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/' + E.opts.emoticonsSet[o].code + '.svg"/>' : "&#x" + E.opts.emoticonsSet[o].code + ";") + '<span class="fr-sr-only">' + E.language.translate(E.opts.emoticonsSet[o].desc) + "&nbsp;&nbsp;&nbsp;</span></span>";

              return E.opts.emoticonsUseImage && (e += '<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow noopener noreferrer" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>'), e += "</div>";
            }()
          },
              t = E.popups.create("emoticons", o);
          return E.tooltip.bind(t, ".fr-emoticon"), h = t, E.events.on("popup.tab", function (e) {
            var o = g(e.currentTarget);
            if (!E.popups.isVisible("emoticons") || !o.is("span, a")) return !0;
            var t,
                s,
                n,
                c = e.which;

            if (g.FE.KEYCODE.TAB == c) {
              if (o.is("span.fr-emoticon") && e.shiftKey || o.is("a") && !e.shiftKey) {
                var i = h.find(".fr-buttons");
                t = !E.accessibility.focusToolbar(i, !!e.shiftKey);
              }

              if (!1 !== t) {
                var a = h.find("span.fr-emoticon:focus:first, span.fr-emoticon:visible:first, a");
                o.is("span.fr-emoticon") && (a = a.not("span.fr-emoticon:not(:focus)")), s = a.index(o), s = e.shiftKey ? ((s - 1) % a.length + a.length) % a.length : (s + 1) % a.length, n = a.get(s), E.events.disableBlur(), n.focus(), t = !1;
              }
            } else if (g.FE.KEYCODE.ARROW_UP == c || g.FE.KEYCODE.ARROW_DOWN == c || g.FE.KEYCODE.ARROW_LEFT == c || g.FE.KEYCODE.ARROW_RIGHT == c) {
              if (o.is("span.fr-emoticon")) {
                var f = o.parent().find("span.fr-emoticon");
                s = f.index(o);
                var d = E.opts.emoticonsStep,
                    r = Math.floor(f.length / d),
                    l = s % d,
                    m = Math.floor(s / d),
                    u = m * d + l,
                    p = r * d;
                g.FE.KEYCODE.ARROW_UP == c ? u = ((u - d) % p + p) % p : g.FE.KEYCODE.ARROW_DOWN == c ? u = (u + d) % p : g.FE.KEYCODE.ARROW_LEFT == c ? u = ((u - 1) % p + p) % p : g.FE.KEYCODE.ARROW_RIGHT == c && (u = (u + 1) % p), n = g(f.get(u)), E.events.disableBlur(), n.focus(), t = !1;
              }
            } else g.FE.KEYCODE.ENTER == c && (o.is("a") ? o[0].click() : E.button.exec(o), t = !1);

            return !1 === t && (e.preventDefault(), e.stopPropagation()), t;
          }, !0), t;
        }()), !o.hasClass("fr-active")) {
          E.popups.refresh("emoticons"), E.popups.setContainer("emoticons", E.$tb);
          var t = e.offset().left + e.outerWidth() / 2,
              s = e.offset().top + (E.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          E.popups.show("emoticons", t, s, e.outerHeight());
        }
      },
      hideEmoticonsPopup: function () {
        E.popups.hide("emoticons");
      },
      back: function () {
        E.popups.hide("emoticons"), E.toolbar.showInline();
      }
    };
  }, g.FE.DefineIcon("emoticons", {
    NAME: "smile-o",
    FA5NAME: "smile"
  }), g.FE.RegisterCommand("emoticons", {
    title: "Emoticons",
    undo: !1,
    focus: !0,
    refreshOnCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("emoticons") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("emoticons")) : this.emoticons.showEmoticonsPopup();
    },
    plugin: "emoticons"
  }), g.FE.RegisterCommand("insertEmoticon", {
    callback: function (e, o) {
      this.emoticons.insert("&#x" + o + ";", this.opts.emoticonsUseImage ? "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/" + o + ".svg" : null), this.emoticons.hideEmoticonsPopup();
    }
  }), g.FE.DefineIcon("emoticonsBack", {
    NAME: "arrow-left"
  }), g.FE.RegisterCommand("emoticonsBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.emoticons.back();
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/entities.min.js":
/*!******************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/entities.min.js ***!
  \******************************************************************/
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
}(function (c) {
  c.extend(c.FE.DEFAULTS, {
    entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;"
  }), c.FE.PLUGINS.entities = function (t) {
    var n, u;

    function i(e) {
      var r = e.textContent;

      if (r.match(n)) {
        for (var a = "", i = 0; i < r.length; i++) u[r[i]] ? a += u[r[i]] : a += r[i];

        e.textContent = a;
      }
    }

    function o(e) {
      if (e && 0 <= ["STYLE", "SCRIPT", "svg", "IFRAME"].indexOf(e.tagName)) return !0;

      for (var r = t.node.contents(e), a = 0; a < r.length; a++) r[a].nodeType == Node.TEXT_NODE ? i(r[a]) : o(r[a]);

      e.nodeType == Node.TEXT_NODE && i(e);
    }

    function l(e) {
      return 0 === e.length ? "" : t.clean.exec(e, o).replace(/\&amp;/g, "&");
    }

    return {
      _init: function () {
        t.opts.htmlSimpleAmpersand || (t.opts.entities = t.opts.entities + "&amp;");
        var e = c("<div>").html(t.opts.entities).text(),
            r = t.opts.entities.split(";");
        u = {}, n = "";

        for (var a = 0; a < e.length; a++) {
          var i = e.charAt(a);
          u[i] = r[a] + ";", n += "\\" + i + (a < e.length - 1 ? "|" : "");
        }

        n = new RegExp("(" + n + ")", "g"), t.events.on("html.get", l, !0);
      }
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/font_family.min.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/font_family.min.js ***!
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
}(function (l) {
  l.extend(l.FE.DEFAULTS, {
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma",
      "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
      "Verdana,Geneva,sans-serif": "Verdana"
    },
    fontFamilySelection: !1,
    fontFamilyDefaultSelection: "Font Family"
  }), l.FE.PLUGINS.fontFamily = function (o) {
    function i(e) {
      var t = e.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
      return l.grep(t, function (e) {
        return 0 < e.length;
      });
    }

    function r(e, t) {
      for (var n = 0; n < e.length; n++) for (var a = 0; a < t.length; a++) if (e[n].toLowerCase() == t[a].toLowerCase()) return [n, a];

      return null;
    }

    function f() {
      var e = i(l(o.selection.element()).css("font-family")),
          t = [];

      for (var n in o.opts.fontFamily) if (o.opts.fontFamily.hasOwnProperty(n)) {
        var a = r(e, i(n));
        a && t.push([n, a]);
      }

      return 0 === t.length ? null : (t.sort(function (e, t) {
        var n = e[1][0] - t[1][0];
        return 0 === n ? e[1][1] - t[1][1] : n;
      }), t[0][0]);
    }

    return {
      apply: function (e) {
        o.format.applyStyle("font-family", e);
      },
      refreshOnShow: function (e, t) {
        t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + f() + '"]').addClass("fr-active").attr("aria-selected", !0);
        var n = t.find(".fr-dropdown-list"),
            a = t.find(".fr-active").parent();
        a.length ? n.parent().scrollTop(a.offset().top - n.offset().top - (n.parent().outerHeight() / 2 - a.outerHeight() / 2)) : n.parent().scrollTop(0);
      },
      refresh: function (e) {
        if (o.opts.fontFamilySelection) {
          var t = l(o.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
          e.find("> span").text(o.opts.fontFamily[f()] || t[0] || o.language.translate(o.opts.fontFamilyDefaultSelection));
        }
      }
    };
  }, l.FE.RegisterCommand("fontFamily", {
    type: "dropdown",
    displaySelection: function (e) {
      return e.opts.fontFamilySelection;
    },
    defaultSelection: function (e) {
      return e.opts.fontFamilyDefaultSelection;
    },
    displaySelectionWidth: 120,
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.fontFamily;

      for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="' + n + '" style="font-family: ' + n + '" title="' + t[n] + '">' + t[n] + "</a></li>");

      return e += "</ul>";
    },
    title: "Font Family",
    callback: function (e, t) {
      this.fontFamily.apply(t);
    },
    refresh: function (e) {
      this.fontFamily.refresh(e);
    },
    refreshOnShow: function (e, t) {
      this.fontFamily.refreshOnShow(e, t);
    },
    plugin: "fontFamily"
  }), l.FE.DefineIcon("fontFamily", {
    NAME: "font"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/font_size.min.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/font_size.min.js ***!
  \*******************************************************************/
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
}(function (f) {
  f.extend(f.FE.DEFAULTS, {
    fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
    fontSizeSelection: !1,
    fontSizeDefaultSelection: "12",
    fontSizeUnit: "px"
  }), f.FE.PLUGINS.fontSize = function (r) {
    return {
      apply: function (e) {
        r.format.applyStyle("font-size", e);
      },
      refreshOnShow: function (e, t) {
        var n = f(r.selection.element()).css("font-size");
        "pt" === r.opts.fontSizeUnit && (n = Math.round(72 * parseFloat(n, 10) / 96) + "pt"), t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0);
        var o = t.find(".fr-dropdown-list"),
            i = t.find(".fr-active").parent();
        i.length ? o.parent().scrollTop(i.offset().top - o.offset().top - (o.parent().outerHeight() / 2 - i.outerHeight() / 2)) : o.parent().scrollTop(0);
      },
      refresh: function (e) {
        if (r.opts.fontSizeSelection) {
          var t = r.helpers.getPX(f(r.selection.element()).css("font-size"));
          "pt" === r.opts.fontSizeUnit && (t = Math.round(72 * parseFloat(t, 10) / 96) + "pt"), e.find("> span").text(t);
        }
      }
    };
  }, f.FE.RegisterCommand("fontSize", {
    type: "dropdown",
    title: "Font Size",
    displaySelection: function (e) {
      return e.opts.fontSizeSelection;
    },
    displaySelectionWidth: 30,
    defaultSelection: function (e) {
      return e.opts.fontSizeDefaultSelection;
    },
    html: function () {
      for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontSize, n = 0; n < t.length; n++) {
        var o = t[n];
        e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="' + o + this.opts.fontSizeUnit + '" title="' + o + '">' + o + "</a></li>";
      }

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.fontSize.apply(t);
    },
    refresh: function (e) {
      this.fontSize.refresh(e);
    },
    refreshOnShow: function (e, t) {
      this.fontSize.refreshOnShow(e, t);
    },
    plugin: "fontSize"
  }), f.FE.DefineIcon("fontSize", {
    NAME: "text-height"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/forms.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/forms.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (o) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (l) {
  l.extend(l.FE.POPUP_TEMPLATES, {
    "forms.edit": "[_BUTTONS_]",
    "forms.update": "[_BUTTONS_][_TEXT_LAYER_]"
  }), l.extend(l.FE.DEFAULTS, {
    formEditButtons: ["inputStyle", "inputEdit"],
    formStyles: {
      "fr-rounded": "Rounded",
      "fr-large": "Large"
    },
    formMultipleStyles: !0,
    formUpdateButtons: ["inputBack", "|"]
  }), l.FE.PLUGINS.forms = function (s) {
    var r;

    function t(t) {
      t.preventDefault(), s.selection.clear(), l(this).data("mousedown", !0);
    }

    function e(t) {
      l(this).data("mousedown") && (t.stopPropagation(), l(this).removeData("mousedown"), a(r = this)), t.preventDefault();
    }

    function o() {
      s.$el.find("input, textarea, button").removeData("mousedown");
    }

    function n() {
      l(this).removeData("mousedown");
    }

    function i() {
      return r || null;
    }

    function a(t) {
      var e = s.popups.get("forms.edit");
      e || (e = function () {
        var t = "";
        0 < s.opts.formEditButtons.length && (t = '<div class="fr-buttons">' + s.button.buildList(s.opts.formEditButtons) + "</div>");
        var e = {
          buttons: t
        },
            o = s.popups.create("forms.edit", e);
        return s.$wp && s.events.$on(s.$wp, "scroll.link-edit", function () {
          i() && s.popups.isVisible("forms.edit") && a(i());
        }), o;
      }());
      var o = l(r = t);
      s.popups.refresh("forms.edit"), s.popups.setContainer("forms.edit", s.$sc);
      var n = o.offset().left + o.outerWidth() / 2,
          u = o.offset().top + o.outerHeight();
      s.popups.show("forms.edit", n, u, o.outerHeight());
    }

    function p() {
      var t = s.popups.get("forms.update"),
          e = i();

      if (e) {
        var o = l(e);
        o.is("button") ? t.find('input[type="text"][name="text"]').val(o.text()) : t.find('input[type="text"][name="text"]').val(o.attr("placeholder"));
      }

      t.find('input[type="text"][name="text"]').trigger("change");
    }

    function f() {
      r = null;
    }

    function d(t) {
      if (t) return s.popups.onRefresh("forms.update", p), s.popups.onHide("forms.update", f), !0;
      var e = "";
      1 <= s.opts.formUpdateButtons.length && (e = '<div class="fr-buttons">' + s.button.buildList(s.opts.formUpdateButtons) + "</div>");
      var o = "",
          n = 0;
      o = '<div class="fr-forms-text-layer fr-layer fr-active">', o += '<div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex="' + ++n + '"></div>';
      var u = {
        buttons: e,
        text_layer: o += '<div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="' + ++n + '" type="button">' + s.language.translate("Update") + "</button></div></div>"
      };
      return s.popups.create("forms.update", u);
    }

    return {
      _init: function () {
        s.events.$on(s.$el, s._mousedown, "input, textarea, button", t), s.events.$on(s.$el, s._mouseup, "input, textarea, button", e), s.events.$on(s.$el, "touchmove", "input, textarea, button", n), s.events.$on(s.$el, s._mouseup, o), s.events.$on(s.$win, s._mouseup, o), d(!0), s.events.$on(s.$el, "submit", "form", function (t) {
          return t.preventDefault(), !1;
        });
      },
      updateInput: function () {
        var t = s.popups.get("forms.update"),
            e = i();

        if (e) {
          var o = l(e),
              n = t.find('input[type="text"][name="text"]').val() || "";
          n.length && (o.is("button") ? o.text(n) : o.attr("placeholder", n)), s.popups.hide("forms.update"), a(e);
        }
      },
      getInput: i,
      applyStyle: function (t, e, o) {
        void 0 === e && (e = s.opts.formStyles), void 0 === o && (o = s.opts.formMultipleStyles);
        var n = i();
        if (!n) return !1;

        if (!o) {
          var u = Object.keys(e);
          u.splice(u.indexOf(t), 1), l(n).removeClass(u.join(" "));
        }

        l(n).toggleClass(t);
      },
      showUpdatePopup: function () {
        var t = i();

        if (t) {
          var e = l(t),
              o = s.popups.get("forms.update");
          o || (o = d()), s.popups.isVisible("forms.update") || s.popups.refresh("forms.update"), s.popups.setContainer("forms.update", s.$sc);
          var n = e.offset().left + e.outerWidth() / 2,
              u = e.offset().top + e.outerHeight();
          s.popups.show("forms.update", n, u, e.outerHeight());
        }
      },
      showEditPopup: a,
      back: function () {
        s.events.disableBlur(), s.selection.restore(), s.events.enableBlur();
        var t = i();
        t && s.$wp && ("BUTTON" == t.tagName && s.selection.restore(), a(t));
      }
    };
  }, l.FE.RegisterCommand("updateInput", {
    undo: !1,
    focus: !1,
    title: "Update",
    callback: function () {
      this.forms.updateInput();
    }
  }), l.FE.DefineIcon("inputStyle", {
    NAME: "magic"
  }), l.FE.RegisterCommand("inputStyle", {
    title: "Style",
    type: "dropdown",
    html: function () {
      var t = '<ul class="fr-dropdown-list">',
          e = this.opts.formStyles;

      for (var o in e) e.hasOwnProperty(o) && (t += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="' + o + '">' + this.language.translate(e[o]) + "</a></li>");

      return t += "</ul>";
    },
    callback: function (t, e) {
      var o = this.forms.getInput();
      o && (this.forms.applyStyle(e), this.forms.showEditPopup(o));
    },
    refreshOnShow: function (t, e) {
      var o = this.forms.getInput();

      if (o) {
        var n = l(o);
        e.find(".fr-command").each(function () {
          var t = l(this).data("param1");
          l(this).toggleClass("fr-active", n.hasClass(t));
        });
      }
    }
  }), l.FE.DefineIcon("inputEdit", {
    NAME: "edit"
  }), l.FE.RegisterCommand("inputEdit", {
    title: "Edit Button",
    undo: !1,
    refreshAfterCallback: !1,
    callback: function () {
      this.forms.showUpdatePopup();
    }
  }), l.FE.DefineIcon("inputBack", {
    NAME: "arrow-left"
  }), l.FE.RegisterCommand("inputBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.forms.back();
    }
  }), l.FE.RegisterCommand("updateInput", {
    undo: !1,
    focus: !1,
    title: "Update",
    callback: function () {
      this.forms.updateInput();
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/fullscreen.min.js":
/*!********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/fullscreen.min.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (o) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (o),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (c) {
  c.FE.PLUGINS.fullscreen = function (o) {
    var t, r, s, n;

    function i() {
      return o.$box.hasClass("fr-fullscreen");
    }

    function e() {
      if (o.helpers.isIOS() && o.core.hasFocus()) return o.$el.blur(), setTimeout(a, 250), !1;
      t = o.helpers.scrollTop(), o.$box.toggleClass("fr-fullscreen"), c("body:first").toggleClass("fr-fullscreen"), o.helpers.isMobile() && (o.$tb.data("parent", o.$tb.parent()), o.$tb.prependTo(o.$box), o.$tb.data("sticky-dummy") && o.$tb.after(o.$tb.data("sticky-dummy"))), r = o.opts.height, s = o.opts.heightMax, n = o.opts.zIndex, o.position.refresh(), o.opts.height = o.o_win.innerHeight - (o.opts.toolbarInline ? 0 : o.$tb.outerHeight()), o.opts.zIndex = 2147483641, o.opts.heightMax = null, o.size.refresh(), o.opts.toolbarInline && o.toolbar.showInline();

      for (var e = o.$box.parent(); !e.is("body:first");) e.data("z-index", e.css("z-index")).data("overflow", e.css("overflow")).css("z-index", "2147483640").css("overflow", "visible"), e = e.parent();

      o.opts.toolbarContainer && o.$box.prepend(o.$tb), o.events.trigger("charCounter.update"), o.events.trigger("codeView.update"), o.$win.trigger("scroll");
    }

    function l() {
      if (o.helpers.isIOS() && o.core.hasFocus()) return o.$el.blur(), setTimeout(a, 250), !1;
      o.$box.toggleClass("fr-fullscreen"), c("body:first").toggleClass("fr-fullscreen"), o.$tb.prependTo(o.$tb.data("parent")), o.$tb.data("sticky-dummy") && o.$tb.after(o.$tb.data("sticky-dummy")), o.opts.height = r, o.opts.heightMax = s, o.opts.zIndex = n, o.size.refresh(), c(o.o_win).scrollTop(t), o.opts.toolbarInline && o.toolbar.showInline(), o.events.trigger("charCounter.update"), o.opts.toolbarSticky && o.opts.toolbarStickyOffset && (o.opts.toolbarBottom ? o.$tb.css("bottom", o.opts.toolbarStickyOffset).data("bottom", o.opts.toolbarStickyOffset) : o.$tb.css("top", o.opts.toolbarStickyOffset).data("top", o.opts.toolbarStickyOffset));

      for (var e = o.$box.parent(); !e.is("body:first");) e.data("z-index") && (e.css("z-index", ""), e.css("z-index") != e.data("z-index") && e.css("z-index", e.data("z-index")), e.removeData("z-index")), e.data("overflow") ? (e.css("overflow", ""), e.css("overflow") != e.data("overflow") && e.css("overflow", e.data("overflow"))) : e.css("overflow", ""), e.removeData("overflow"), e = e.parent();

      o.opts.toolbarContainer && c(o.opts.toolbarContainer).append(o.$tb), c(o.o_win).trigger("scroll"), o.events.trigger("codeView.update");
    }

    function a() {
      i() ? l() : e(), f(o.$tb.find('.fr-command[data-cmd="fullscreen"]'));
    }

    function f(e) {
      var t = i();
      e.toggleClass("fr-active", t).attr("aria-pressed", t), e.find("> *:not(.fr-sr-only)").replaceWith(t ? o.icon.create("fullscreenCompress") : o.icon.create("fullscreen"));
    }

    return {
      _init: function () {
        if (!o.$wp) return !1;
        o.events.$on(c(o.o_win), "resize", function () {
          i() && (l(), e());
        }), o.events.on("toolbar.hide", function () {
          if (i() && o.helpers.isMobile()) return !1;
        }), o.events.on("position.refresh", function () {
          if (o.helpers.isIOS()) return !i();
        }), o.events.on("destroy", function () {
          i() && l();
        }, !0);
      },
      toggle: a,
      refresh: f,
      isActive: i
    };
  }, c.FE.RegisterCommand("fullscreen", {
    title: "Fullscreen",
    undo: !1,
    focus: !1,
    accessibilityFocus: !0,
    forcedRefresh: !0,
    toggle: !0,
    callback: function () {
      this.fullscreen.toggle();
    },
    refresh: function (e) {
      this.fullscreen.refresh(e);
    },
    plugin: "fullscreen"
  }), c.FE.DefineIcon("fullscreen", {
    NAME: "expand"
  }), c.FE.DefineIcon("fullscreenCompress", {
    NAME: "compress"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/help.min.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/help.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (l) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (l),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (n) {
  n.extend(n.FE.DEFAULTS, {
    helpSets: [{
      title: "Inline Editor",
      commands: [{
        val: "OSkeyE",
        desc: "Show the editor"
      }]
    }, {
      title: "Common actions",
      commands: [{
        val: "OSkeyC",
        desc: "Copy"
      }, {
        val: "OSkeyX",
        desc: "Cut"
      }, {
        val: "OSkeyV",
        desc: "Paste"
      }, {
        val: "OSkeyZ",
        desc: "Undo"
      }, {
        val: "OSkeyShift+Z",
        desc: "Redo"
      }, {
        val: "OSkeyK",
        desc: "Insert Link"
      }, {
        val: "OSkeyP",
        desc: "Insert Image"
      }]
    }, {
      title: "Basic Formatting",
      commands: [{
        val: "OSkeyA",
        desc: "Select All"
      }, {
        val: "OSkeyB",
        desc: "Bold"
      }, {
        val: "OSkeyI",
        desc: "Italic"
      }, {
        val: "OSkeyU",
        desc: "Underline"
      }, {
        val: "OSkeyS",
        desc: "Strikethrough"
      }, {
        val: "OSkey]",
        desc: "Increase Indent"
      }, {
        val: "OSkey[",
        desc: "Decrease Indent"
      }]
    }, {
      title: "Quote",
      commands: [{
        val: "OSkey'",
        desc: "Increase quote level"
      }, {
        val: "OSkeyShift+'",
        desc: "Decrease quote level"
      }]
    }, {
      title: "Image / Video",
      commands: [{
        val: "OSkey+",
        desc: "Resize larger"
      }, {
        val: "OSkey-",
        desc: "Resize smaller"
      }]
    }, {
      title: "Table",
      commands: [{
        val: "Alt+Space",
        desc: "Select table cell"
      }, {
        val: "Shift+Left/Right arrow",
        desc: "Extend selection one cell"
      }, {
        val: "Shift+Up/Down arrow",
        desc: "Extend selection one row"
      }]
    }, {
      title: "Navigation",
      commands: [{
        val: "OSkey/",
        desc: "Shortcuts"
      }, {
        val: "Alt+F10",
        desc: "Focus popup / toolbar"
      }, {
        val: "Esc",
        desc: "Return focus to previous position"
      }]
    }]
  }), n.FE.PLUGINS.help = function (s) {
    var o,
        a = "help";
    return {
      _init: function () {},
      show: function () {
        if (!o) {
          var e = "<h4>" + s.language.translate("Shortcuts") + "</h4>",
              t = function () {
            for (var e = '<div class="fr-help-modal">', t = 0; t < s.opts.helpSets.length; t++) {
              var l = s.opts.helpSets[t],
                  o = "<table>";
              o += "<thead><tr><th>" + s.language.translate(l.title) + "</th></tr></thead>", o += "<tbody>";

              for (var a = 0; a < l.commands.length; a++) {
                var n = l.commands[a];
                o += "<tr>", o += "<td>" + s.language.translate(n.desc) + "</td>", o += "<td>" + n.val.replace("OSkey", s.helpers.isMac() ? "&#8984;" : "Ctrl+") + "</td>", o += "</tr>";
              }

              e += o += "</tbody></table>";
            }

            return e += "</div>";
          }(),
              l = s.modals.create(a, e, t);

          o = l.$modal, l.$head, l.$body, s.events.$on(n(s.o_win), "resize", function () {
            s.modals.resize(a);
          });
        }

        s.modals.show(a), s.modals.resize(a);
      },
      hide: function () {
        s.modals.hide(a);
      }
    };
  }, n.FroalaEditor.DefineIcon("help", {
    NAME: "question"
  }), n.FE.RegisterShortcut(n.FE.KEYCODE.SLASH, "help", null, "/"), n.FE.RegisterCommand("help", {
    title: "Help",
    icon: "help",
    undo: !1,
    focus: !1,
    modal: !0,
    callback: function () {
      this.help.show();
    },
    plugin: "help",
    showOnMobile: !1
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/image.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/image.min.js ***!
  \***************************************************************/
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
}(function (ye) {
  ye.extend(ye.FE.POPUP_TEMPLATES, {
    "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
    "image.edit": "[_BUTTONS_]",
    "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
    "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
  }), ye.extend(ye.FE.DEFAULTS, {
    imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
    imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
    imageAltButtons: ["imageBack", "|"],
    imageSizeButtons: ["imageBack", "|"],
    imageUpload: !0,
    imageUploadURL: null,
    imageCORSProxy: "https://cors-anywhere.froala.com",
    imageUploadRemoteUrls: !0,
    imageUploadParam: "file",
    imageUploadParams: {},
    imageUploadToS3: !1,
    imageUploadMethod: "POST",
    imageMaxSize: 10485760,
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
    imageResize: !0,
    imageResizeWithPercent: !1,
    imageRoundPercent: !1,
    imageDefaultWidth: 300,
    imageDefaultAlign: "center",
    imageDefaultDisplay: "block",
    imageSplitHTML: !1,
    imageStyles: {
      "fr-rounded": "Rounded",
      "fr-bordered": "Bordered",
      "fr-shadow": "Shadow"
    },
    imageMove: !0,
    imageMultipleStyles: !0,
    imageTextNear: !0,
    imagePaste: !0,
    imagePasteProcess: !1,
    imageMinWidth: 16,
    imageOutputSize: !1,
    imageDefaultMargin: 5
  }), ye.FE.PLUGINS.image = function (p) {
    var g,
        l,
        f,
        d,
        o,
        a,
        c = "https://i.froala.com/upload",
        t = !1,
        i = 1,
        u = 2,
        m = 3,
        h = 4,
        v = 5,
        b = 6,
        y = 8,
        r = {};

    function w() {
      var e = p.popups.get("image.insert").find(".fr-image-by-url-layer input");
      e.val(""), g && e.val(g.attr("src")), e.trigger("change");
    }

    function n() {
      var e = p.popups.get("image.edit");

      if (e || (e = I()), e) {
        var t = ve();
        be() && (t = t.find(".fr-img-wrap")), p.popups.setContainer("image.edit", p.$sc), p.popups.refresh("image.edit");
        var a = t.offset().left + t.outerWidth() / 2,
            i = t.offset().top + t.outerHeight();
        g.hasClass("fr-uploading") ? $() : p.popups.show("image.edit", a, i, t.outerHeight());
      }
    }

    function E() {
      F();
    }

    function e() {
      for (var e, t, a = "IMG" == p.el.tagName ? [p.el] : p.el.querySelectorAll("img"), i = 0; i < a.length; i++) {
        var r = ye(a[i]);
        !p.opts.htmlUntouched && p.opts.useClasses ? ((p.opts.imageDefaultAlign || p.opts.imageDefaultDisplay) && (0 < (t = r).parents(".fr-img-caption").length && (t = t.parents(".fr-img-caption:first")), t.hasClass("fr-dii") || t.hasClass("fr-dib") || (t.addClass("fr-fi" + de(t)[0]), t.addClass("fr-di" + ce(t)[0]), t.css("margin", ""), t.css("float", ""), t.css("display", ""), t.css("z-index", ""), t.css("position", ""), t.css("overflow", ""), t.css("vertical-align", ""))), p.opts.imageTextNear || (0 < r.parents(".fr-img-caption").length ? r.parents(".fr-img-caption:first").removeClass("fr-dii").addClass("fr-dib") : r.removeClass("fr-dii").addClass("fr-dib"))) : p.opts.htmlUntouched || p.opts.useClasses || (p.opts.imageDefaultAlign || p.opts.imageDefaultDisplay) && (0 < (e = r).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption:first")), ge(e, e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null, e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : de(e)), e.removeClass("fr-dib fr-dii fr-fir fr-fil")), p.opts.iframe && r.on("load", p.size.syncIframe);
      }
    }

    function C(e) {
      void 0 === e && (e = !0);
      var t,
          a = Array.prototype.slice.call(p.el.querySelectorAll("img")),
          i = [];

      for (t = 0; t < a.length; t++) if (i.push(a[t].getAttribute("src")), ye(a[t]).toggleClass("fr-draggable", p.opts.imageMove), "" === a[t].getAttribute("class") && a[t].removeAttribute("class"), "" === a[t].getAttribute("style") && a[t].removeAttribute("style"), a[t].parentNode && a[t].parentNode.parentNode && p.node.hasClass(a[t].parentNode.parentNode, "fr-img-caption")) {
        var r = a[t].parentNode.parentNode;
        p.browser.mozilla || r.setAttribute("contenteditable", !1), r.setAttribute("draggable", !1), r.classList.add("fr-draggable");
        var n = a[t].nextSibling;
        n && !p.browser.mozilla && n.setAttribute("contenteditable", !0);
      }

      if (o) for (t = 0; t < o.length; t++) i.indexOf(o[t].getAttribute("src")) < 0 && p.events.trigger("image.removed", [ye(o[t])]);

      if (o && e) {
        var s = [];

        for (t = 0; t < o.length; t++) s.push(o[t].getAttribute("src"));

        for (t = 0; t < a.length; t++) s.indexOf(a[t].getAttribute("src")) < 0 && p.events.trigger("image.loaded", [ye(a[t])]);
      }

      o = a;
    }

    function A() {
      if (l || function () {
        var e;
        p.shared.$image_resizer ? (l = p.shared.$image_resizer, d = p.shared.$img_overlay, p.events.on("destroy", function () {
          l.removeClass("fr-active").appendTo(ye("body:first"));
        }, !0)) : (p.shared.$image_resizer = ye('<div class="fr-image-resizer"></div>'), l = p.shared.$image_resizer, p.events.$on(l, "mousedown", function (e) {
          e.stopPropagation();
        }, !0), p.opts.imageResize && (l.append(s("nw") + s("ne") + s("sw") + s("se")), p.shared.$img_overlay = ye('<div class="fr-image-overlay"></div>'), d = p.shared.$img_overlay, e = l.get(0).ownerDocument, ye(e).find("body:first").append(d)));
        p.events.on("shared.destroy", function () {
          l.html("").removeData().remove(), l = null, p.opts.imageResize && (d.remove(), d = null);
        }, !0), p.helpers.isMobile() || p.events.$on(ye(p.o_win), "resize", function () {
          g && !g.hasClass("fr-uploading") ? oe(!0) : g && (A(), ue(), $(!1));
        });

        if (p.opts.imageResize) {
          e = l.get(0).ownerDocument, p.events.$on(l, p._mousedown, ".fr-handler", S), p.events.$on(ye(e), p._mousemove, D), p.events.$on(ye(e.defaultView || e.parentWindow), p._mouseup, x), p.events.$on(d, "mouseleave", x);
          var i = 1,
              r = null,
              n = 0;
          p.events.on("keydown", function (e) {
            if (g) {
              var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                  a = e.which;
              (a !== r || 200 < e.timeStamp - n) && (i = 1), (a == ye.FE.KEYCODE.EQUALS || p.browser.mozilla && a == ye.FE.KEYCODE.FF_EQUALS) && t && !e.altKey ? i = Q.call(this, e, 1, 1, i) : (a == ye.FE.KEYCODE.HYPHEN || p.browser.mozilla && a == ye.FE.KEYCODE.FF_HYPHEN) && t && !e.altKey ? i = Q.call(this, e, 2, -1, i) : p.keys.ctrlKey(e) || a != ye.FE.KEYCODE.ENTER || (g.before("<br>"), B(g)), r = a, n = e.timeStamp;
            }
          }, !0), p.events.on("keyup", function () {
            i = 1;
          });
        }
      }(), !g) return !1;
      var e = p.$wp || p.$sc;
      e.append(l), l.data("instance", p);
      var t = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0),
          a = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
      a -= p.helpers.getPX(e.css("border-left-width")), t -= p.helpers.getPX(e.css("border-top-width")), p.$el.is("img") && p.$sc.is("body") && (a = t = 0);
      var i = ve();
      be() && (i = i.find(".fr-img-wrap")), l.css("top", (p.opts.iframe ? i.offset().top : i.offset().top + t) - 1).css("left", (p.opts.iframe ? i.offset().left : i.offset().left + a) - 1).css("width", i.get(0).getBoundingClientRect().width).css("height", i.get(0).getBoundingClientRect().height).addClass("fr-active");
    }

    function s(e) {
      return '<div class="fr-handler fr-h' + e + '"></div>';
    }

    function R(e) {
      be() ? g.parents(".fr-img-caption").css("width", e) : g.css("width", e);
    }

    function S(e) {
      if (!p.core.sameInstance(l)) return !0;
      if (e.preventDefault(), e.stopPropagation(), p.$el.find("img.fr-error").left) return !1;
      p.undo.canDo() || p.undo.saveStep();
      var t = e.pageX || e.originalEvent.touches[0].pageX;

      if ("mousedown" == e.type) {
        var a = p.$oel.get(0).ownerDocument,
            i = a.defaultView || a.parentWindow,
            r = !1;

        try {
          r = i.location != i.parent.location && !(i.$ && i.$.FE);
        } catch (o) {}

        r && i.frameElement && (t += p.helpers.getPX(ye(i.frameElement).offset().left) + i.frameElement.clientLeft);
      }

      (f = ye(this)).data("start-x", t), f.data("start-width", g.width()), f.data("start-height", g.height());
      var n = g.width();

      if (p.opts.imageResizeWithPercent) {
        var s = g.parentsUntil(p.$el, p.html.blockTagsQuery()).get(0) || p.el;
        n = (n / ye(s).outerWidth() * 100).toFixed(2) + "%";
      }

      R(n), d.show(), p.popups.hideAll(), pe();
    }

    function D(e) {
      if (!p.core.sameInstance(l)) return !0;
      var t;

      if (f && g) {
        if (e.preventDefault(), p.$el.find("img.fr-error").left) return !1;
        var a = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
        if (!a) return !1;
        var i = a - f.data("start-x"),
            r = f.data("start-width");

        if ((f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (i = 0 - i), p.opts.imageResizeWithPercent) {
          var n = g.parentsUntil(p.$el, p.html.blockTagsQuery()).get(0) || p.el;
          r = ((r + i) / ye(n).outerWidth() * 100).toFixed(2), p.opts.imageRoundPercent && (r = Math.round(r)), R(r + "%"), (t = be() ? (p.helpers.getPX(g.parents(".fr-img-caption").css("width")) / ye(n).outerWidth() * 100).toFixed(2) : (p.helpers.getPX(g.css("width")) / ye(n).outerWidth() * 100).toFixed(2)) === r || p.opts.imageRoundPercent || R(t + "%"), g.css("height", "").removeAttr("height");
        } else r + i >= p.opts.imageMinWidth && (R(r + i), t = be() ? p.helpers.getPX(g.parents(".fr-img-caption").css("width")) : p.helpers.getPX(g.css("width"))), t !== r + i && R(t), ((g.attr("style") || "").match(/(^height:)|(; *height:)/) || g.attr("height")) && (g.css("height", f.data("start-height") * g.width() / f.data("start-width")), g.removeAttr("height"));

        A(), p.events.trigger("image.resize", [he()]);
      }
    }

    function x(e) {
      if (!p.core.sameInstance(l)) return !0;

      if (f && g) {
        if (e && e.stopPropagation(), p.$el.find("img.fr-error").left) return !1;
        f = null, d.hide(), A(), n(), p.undo.saveStep(), p.events.trigger("image.resizeEnd", [he()]);
      }
    }

    function U(e, t, a) {
      p.edit.on(), g && g.addClass("fr-error"), function (e) {
        $();
        var t = p.popups.get("image.insert").find(".fr-image-progress-bar-layer");
        t.addClass("fr-error");
        var a = t.find("h3");
        a.text(e), p.events.disableBlur(), a.focus();
      }(p.language.translate("Something went wrong. Please try again.")), !g && a && J(a), p.events.trigger("image.error", [{
        code: e,
        message: r[e]
      }, t, a]);
    }

    function I(e) {
      if (e) return p.$wp && p.events.$on(p.$wp, "scroll.image-edit", function () {
        g && p.popups.isVisible("image.edit") && (p.events.disableBlur(), n());
      }), !0;
      var t = "";

      if (0 < p.opts.imageEditButtons.length) {
        t += '<div class="fr-buttons">', t += p.button.buildList(p.opts.imageEditButtons);
        var a = {
          buttons: t += "</div>"
        };
        return p.popups.create("image.edit", a);
      }

      return !1;
    }

    function $(e) {
      var t = p.popups.get("image.insert");

      if (t || (t = H()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), g) {
        var a = ve();
        p.popups.setContainer("image.insert", p.$sc);
        var i = a.offset().left + a.width() / 2,
            r = a.offset().top + a.height();
        p.popups.show("image.insert", i, r, a.outerHeight());
      }

      void 0 === e && k(p.language.translate("Uploading"), 0);
    }

    function F(e) {
      var t = p.popups.get("image.insert");

      if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || p.$el.find("img.fr-error").length)) {
        if (p.events.focus(), p.$el.find("img.fr-error").length && (p.$el.find("img.fr-error").remove(), p.undo.saveStep(), p.undo.run(), p.undo.dropRedo()), !p.$wp && g) {
          var a = g;
          oe(!0), p.selection.setAfter(a.get(0)), p.selection.restore();
        }

        p.popups.hide("image.insert");
      }
    }

    function k(e, t) {
      var a = p.popups.get("image.insert");

      if (a) {
        var i = a.find(".fr-image-progress-bar-layer");
        i.find("h3").text(e + (t ? " " + t + "%" : "")), i.removeClass("fr-error"), t ? (i.find("div").removeClass("fr-indeterminate"), i.find("div > span").css("width", t + "%")) : i.find("div").addClass("fr-indeterminate");
      }
    }

    function B(e) {
      se.call(e.get(0));
    }

    function N() {
      var e = ye(this);
      p.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), B(e), p.events.trigger("image.loaded", [e]);
    }

    function O(s, e, o, l, f) {
      p.edit.off(), k(p.language.translate("Loading image")), e && (s = p.helpers.sanitizeURL(s));
      var t = new Image();
      t.onload = function () {
        var e, t;

        if (l) {
          p.undo.canDo() || l.hasClass("fr-uploading") || p.undo.saveStep();
          var a = l.data("fr-old-src");
          l.data("fr-image-pasted") && (a = null), p.$wp ? ((e = l.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), a && l.attr("src", a), l.replaceWith(e)) : e = l;

          for (var i = e.get(0).attributes, r = 0; r < i.length; r++) {
            var n = i[r];
            0 === n.nodeName.indexOf("data-") && e.removeAttr(n.nodeName);
          }

          if (void 0 !== o) for (t in o) o.hasOwnProperty(t) && "link" != t && e.attr("data-" + t, o[t]);
          e.on("load", N), e.attr("src", s), p.edit.on(), C(!1), p.undo.saveStep(), p.events.disableBlur(), p.$el.blur(), p.events.trigger(a ? "image.replaced" : "image.inserted", [e, f]);
        } else e = M(s, o, N), C(!1), p.undo.saveStep(), p.events.disableBlur(), p.$el.blur(), p.events.trigger("image.inserted", [e, f]);
      }, t.onerror = function () {
        U(i);
      }, $(p.language.translate("Loading image")), t.src = s;
    }

    function P(e) {
      k(p.language.translate("Loading image"));
      var t = this.status,
          a = this.response,
          i = this.responseXML,
          r = this.responseText;

      try {
        if (p.opts.imageUploadToS3) {
          if (201 == t) {
            var n = function (e) {
              try {
                var t = ye(e).find("Location").text(),
                    a = ye(e).find("Key").text();
                return !1 === p.events.trigger("image.uploadedToS3", [t, a, e], !0) ? (p.edit.on(), !1) : t;
              } catch (i) {
                return U(h, e), !1;
              }
            }(i);

            n && O(n, !1, [], e, a || i);
          } else U(h, a || i, e);
        } else if (200 <= t && t < 300) {
          var s = function (e) {
            try {
              if (!1 === p.events.trigger("image.uploaded", [e], !0)) return p.edit.on(), !1;
              var t = JSON.parse(e);
              return t.link ? t : (U(u, e), !1);
            } catch (a) {
              return U(h, e), !1;
            }
          }(r);

          s && O(s.link, !1, s, e, a || r);
        } else U(m, a || r, e);
      } catch (o) {
        U(h, a || r, e);
      }
    }

    function T() {
      U(h, this.response || this.responseText || this.responseXML);
    }

    function L(e) {
      if (e.lengthComputable) {
        var t = e.loaded / e.total * 100 | 0;
        k(p.language.translate("Uploading"), t);
      }
    }

    function M(e, t, a) {
      var i,
          r = "";
      if (t && void 0 !== t) for (i in t) t.hasOwnProperty(i) && "link" != i && (r += " data-" + i + '="' + t[i] + '"');
      var n = p.opts.imageDefaultWidth;
      n && "auto" != n && (n += p.opts.imageResizeWithPercent ? "%" : "px");
      var s = ye('<img src="' + e + '"' + r + (n ? ' style="width: ' + n + ';"' : "") + ">");
      ge(s, p.opts.imageDefaultDisplay, p.opts.imageDefaultAlign), s.on("load", a), s.on("error", function () {
        ye(this).addClass("fr-error"), U(y);
      }), p.edit.on(), p.events.focus(!0), p.selection.restore(), p.undo.saveStep(), p.opts.imageSplitHTML ? p.markers.split() : p.markers.insert(), p.html.wrap();
      var o = p.$el.find(".fr-marker");
      return o.length ? (o.parent().is("hr") && o.parent().after(o), p.node.isLastSibling(o) && o.parent().hasClass("fr-deletable") && o.insertAfter(o.parent()), o.replaceWith(s)) : p.$el.append(s), p.selection.clear(), s;
    }

    function z() {
      p.edit.on(), F(!0);
    }

    function _(e, t) {
      if (void 0 !== e && 0 < e.length) {
        if (!1 === p.events.trigger("image.beforeUpload", [e, t])) return !1;
        var a,
            i = e[0];
        if ((null === p.opts.imageUploadURL || p.opts.imageUploadURL == c) && !p.opts.imageUploadToS3) return s = i, o = t || g, (l = new FileReader()).addEventListener("load", function () {
          var e = l.result;

          if (l.result.indexOf("svg+xml") < 0) {
            for (var t = atob(l.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));

            e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {
              type: s.type
            })), p.image.insert(e, !1, null, o);
          }
        }, !1), $(), l.readAsDataURL(s), !1;
        if (i.name || (i.name = new Date().getTime() + "." + (i.type || "image/jpeg").replace(/image\//g, "")), i.size > p.opts.imageMaxSize) return U(v), !1;
        if (p.opts.imageAllowedTypes.indexOf(i.type.replace(/image\//g, "")) < 0) return U(b), !1;

        if (p.drag_support.formdata && (a = p.drag_support.formdata ? new FormData() : null), a) {
          var r;
          if (!1 !== p.opts.imageUploadToS3) for (r in a.append("key", p.opts.imageUploadToS3.keyStart + new Date().getTime() + "-" + (i.name || "untitled")), a.append("success_action_status", "201"), a.append("X-Requested-With", "xhr"), a.append("Content-Type", i.type), p.opts.imageUploadToS3.params) p.opts.imageUploadToS3.params.hasOwnProperty(r) && a.append(r, p.opts.imageUploadToS3.params[r]);

          for (r in p.opts.imageUploadParams) p.opts.imageUploadParams.hasOwnProperty(r) && a.append(r, p.opts.imageUploadParams[r]);

          a.append(p.opts.imageUploadParam, i, i.name);
          var n = p.opts.imageUploadURL;
          p.opts.imageUploadToS3 && (n = p.opts.imageUploadToS3.uploadURL ? p.opts.imageUploadToS3.uploadURL : "https://" + p.opts.imageUploadToS3.region + ".amazonaws.com/" + p.opts.imageUploadToS3.bucket), function (t, a, e, r) {
            function n() {
              var e = ye(this);
              e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), p.placeholder.refresh(), B(e), A(), $(), p.edit.off(), t.onload = function () {
                P.call(t, e);
              }, t.onerror = T, t.upload.onprogress = L, t.onabort = z, e.off("abortUpload").on("abortUpload", function () {
                4 != t.readyState && t.abort();
              }), t.send(a);
            }

            var s = new FileReader();
            s.addEventListener("load", function () {
              var e = s.result;

              if (s.result.indexOf("svg+xml") < 0) {
                for (var t = atob(s.result.split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));

                e = window.URL.createObjectURL(new Blob([new Uint8Array(a)], {
                  type: "image/jpeg"
                }));
              }

              r ? (r.on("load", n), r.one("error", function () {
                r.off("load"), r.attr("src", r.data("fr-old-src")), U(y);
              }), p.edit.on(), p.undo.saveStep(), r.data("fr-old-src", r.attr("src")), r.attr("src", e)) : M(e, null, n);
            }, !1), s.readAsDataURL(e);
          }(p.core.getXHR(n, p.opts.imageUploadMethod), a, i, t || g);
        }
      }

      var s, o, l;
    }

    function K(e) {
      if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption");
    }

    function W(e) {
      var t = e.originalEvent.dataTransfer;

      if (t && t.files && t.files.length) {
        var a = t.files[0];

        if (a && a.type && -1 !== a.type.indexOf("image") && 0 <= p.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, ""))) {
          if (!p.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), !1;
          p.markers.remove(), p.markers.insertAtPoint(e.originalEvent), p.$el.find(".fr-marker").replaceWith(ye.FE.MARKERS), 0 === p.$el.find(".fr-marker").length && p.selection.setAtEnd(p.el), p.popups.hideAll();
          var i = p.popups.get("image.insert");
          i || (i = H()), p.popups.setContainer("image.insert", p.$sc);
          var r = e.originalEvent.pageX,
              n = e.originalEvent.pageY;
          return p.opts.iframe && (n += p.$iframe.offset().top, r += p.$iframe.offset().left), p.popups.show("image.insert", r, n), $(), 0 <= p.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, "")) ? (oe(!0), _(t.files)) : U(b), e.preventDefault(), e.stopPropagation(), !1;
        }
      }
    }

    function H(e) {
      if (e) return p.popups.onRefresh("image.insert", w), p.popups.onHide("image.insert", E), !0;
      var t,
          a = "";
      p.opts.imageUpload || p.opts.imageInsertButtons.splice(p.opts.imageInsertButtons.indexOf("imageUpload"), 1), 1 < p.opts.imageInsertButtons.length && (a = '<div class="fr-buttons">' + p.button.buildList(p.opts.imageInsertButtons) + "</div>");
      var i = p.opts.imageInsertButtons.indexOf("imageUpload"),
          r = p.opts.imageInsertButtons.indexOf("imageByURL"),
          n = "";
      0 <= i && (t = " fr-active", 0 <= r && r < i && (t = ""), n = '<div class="fr-image-upload-layer' + t + ' fr-layer" id="fr-image-upload-layer-' + p.id + '"><strong>' + p.language.translate("Drop image") + "</strong><br>(" + p.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="image/' + p.opts.imageAllowedTypes.join(", image/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-' + p.id + '" role="button"></div></div>');
      var s = "";
      0 <= r && (t = " fr-active", 0 <= i && i < r && (t = ""), s = '<div class="fr-image-by-url-layer' + t + ' fr-layer" id="fr-image-by-url-layer-' + p.id + '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-' + p.id + '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">' + p.language.translate("Insert") + "</button></div></div>");
      var o,
          l = {
        buttons: a,
        upload_layer: n,
        by_url_layer: s,
        progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>'
      },
          f = p.popups.create("image.insert", l);
      return p.$wp && p.events.$on(p.$wp, "scroll", function () {
        g && p.popups.isVisible("image.insert") && ue();
      }), o = f, p.events.$on(o, "dragover dragenter", ".fr-image-upload-layer", function () {
        return ye(this).addClass("fr-drop"), !1;
      }, !0), p.events.$on(o, "dragleave dragend", ".fr-image-upload-layer", function () {
        return ye(this).removeClass("fr-drop"), !1;
      }, !0), p.events.$on(o, "drop", ".fr-image-upload-layer", function (e) {
        e.preventDefault(), e.stopPropagation(), ye(this).removeClass("fr-drop");
        var t = e.originalEvent.dataTransfer;

        if (t && t.files) {
          var a = o.data("instance") || p;
          a.events.disableBlur(), a.image.upload(t.files), a.events.enableBlur();
        }
      }, !0), p.helpers.isIOS() && p.events.$on(o, "touchstart", '.fr-image-upload-layer input[type="file"]', function () {
        ye(this).trigger("click");
      }, !0), p.events.$on(o, "change", '.fr-image-upload-layer input[type="file"]', function () {
        if (this.files) {
          var e = o.data("instance") || p;
          e.events.disableBlur(), o.find("input:focus").blur(), e.events.enableBlur(), e.image.upload(this.files, g);
        }

        ye(this).val("");
      }, !0), f;
    }

    function Y() {
      g && p.popups.get("image.alt").find("input").val(g.attr("alt") || "").trigger("change");
    }

    function X() {
      var e = p.popups.get("image.alt");
      e || (e = j()), F(), p.popups.refresh("image.alt"), p.popups.setContainer("image.alt", p.$sc);
      var t = ve();
      be() && (t = t.find(".fr-img-wrap"));
      var a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight();
      p.popups.show("image.alt", a, i, t.outerHeight());
    }

    function j(e) {
      if (e) return p.popups.onRefresh("image.alt", Y), !0;
      var t = {
        buttons: '<div class="fr-buttons">' + p.button.buildList(p.opts.imageAltButtons) + "</div>",
        alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-' + p.id + '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-' + p.id + '" type="text" placeholder="' + p.language.translate("Alternative Text") + '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">' + p.language.translate("Update") + "</button></div></div>"
      },
          a = p.popups.create("image.alt", t);
      return p.$wp && p.events.$on(p.$wp, "scroll.image-alt", function () {
        g && p.popups.isVisible("image.alt") && X();
      }), a;
    }

    function G() {
      var e = p.popups.get("image.size");
      if (g) if (be()) {
        var t = g.parent();
        t.get(0).style.width || (t = g.parent().parent()), e.find('input[name="width"]').val(t.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height).trigger("change");
      } else e.find('input[name="width"]').val(g.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(g.get(0).style.height).trigger("change");
    }

    function V() {
      var e = p.popups.get("image.size");
      e || (e = q()), F(), p.popups.refresh("image.size"), p.popups.setContainer("image.size", p.$sc);
      var t = ve();
      be() && (t = t.find(".fr-img-wrap"));
      var a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight();
      p.popups.show("image.size", a, i, t.outerHeight());
    }

    function q(e) {
      if (e) return p.popups.onRefresh("image.size", G), !0;
      var t = {
        buttons: '<div class="fr-buttons">' + p.button.buildList(p.opts.imageSizeButtons) + "</div>",
        size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-' + p.id + '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-' + p.id + '" type="text" name="width" placeholder="' + p.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height' + p.id + '" type="text" name="height" placeholder="' + p.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">' + p.language.translate("Update") + "</button></div></div>"
      },
          a = p.popups.create("image.size", t);
      return p.$wp && p.events.$on(p.$wp, "scroll.image-size", function () {
        g && p.popups.isVisible("image.size") && V();
      }), a;
    }

    function Q(e, t, a, i) {
      return e.pageX = t, S.call(this, e), e.pageX = e.pageX + a * Math.floor(Math.pow(1.1, i)), D.call(this, e), x.call(this, e), ++i;
    }

    function J(e) {
      (e = e || ve()) && !1 !== p.events.trigger("image.beforeRemove", [e]) && (p.popups.hideAll(), me(), oe(!0), p.undo.canDo() || p.undo.saveStep(), e.get(0) == p.el ? e.removeAttr("src") : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? (p.selection.setBefore(e.get(0).parentNode) || p.selection.setAfter(e.get(0).parentNode) || e.parent().after(ye.FE.MARKERS), ye(e.get(0).parentNode).remove()) : (p.selection.setBefore(e.get(0)) || p.selection.setAfter(e.get(0)) || e.after(ye.FE.MARKERS), e.remove()), p.html.fillEmptyBlocks(), p.selection.restore()), p.undo.saveStep());
    }

    function Z(e) {
      var t = e.which;
      if (g && (t == ye.FE.KEYCODE.BACKSPACE || t == ye.FE.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), J(), !1;

      if (g && t == ye.FE.KEYCODE.ESC) {
        var a = g;
        return oe(!0), p.selection.setAfter(a.get(0)), p.selection.restore(), e.preventDefault(), !1;
      }

      if (g && (t == ye.FE.KEYCODE.ARROW_LEFT || t == ye.FE.KEYCODE.ARROW_RIGHT)) {
        var i = g.get(0);
        return oe(!0), t == ye.FE.KEYCODE.ARROW_LEFT ? p.selection.setBefore(i) : p.selection.setAfter(i), p.selection.restore(), e.preventDefault(), !1;
      }

      return g && t != ye.FE.KEYCODE.F10 && !p.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), !1) : void 0;
    }

    function ee(e) {
      if (e && "IMG" == e.tagName) {
        if (p.node.hasClass(e, "fr-uploading") || p.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : p.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && p.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
          var t = e.parentNode.parentNode;
          t.removeAttribute("contenteditable"), t.removeAttribute("draggable"), t.classList.remove("fr-draggable");
          var a = e.nextSibling;
          a && a.removeAttribute("contenteditable");
        }
      } else if (e && e.nodeType == Node.ELEMENT_NODE) for (var i = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), r = 0; r < i.length; r++) ee(i[r]);
    }

    function te(e) {
      if (!1 === p.events.trigger("image.beforePasteUpload", [e])) return !1;
      g = ye(e), A(), n(), ue(), $(), g.one("load", function () {
        A(), $();
      });

      for (var t = atob(ye(e).attr("src").split(",")[1]), a = [], i = 0; i < t.length; i++) a.push(t.charCodeAt(i));

      _([new Blob([new Uint8Array(a)], {
        type: ye(e).attr("src").split(",")[0].replace(/data\:/g, "").replace(/;base64/g, "")
      })], g);
    }

    function ae() {
      p.opts.imagePaste ? p.$el.find("img[data-fr-image-pasted]").each(function (e, a) {
        if (p.opts.imagePasteProcess) {
          var t = p.opts.imageDefaultWidth;
          t && "auto" != t && (t += p.opts.imageResizeWithPercent ? "%" : "px"), ye(a).css("width", t).removeClass("fr-dii fr-dib fr-fir fr-fil"), ge(ye(a), p.opts.imageDefaultDisplay, p.opts.imageDefaultAlign);
        }

        if (0 === a.src.indexOf("data:")) te(a);else if (0 === a.src.indexOf("blob:") || 0 === a.src.indexOf("http") && p.opts.imageUploadRemoteUrls && p.opts.imageCORSProxy) {
          var i = new Image();
          i.crossOrigin = "Anonymous", i.onload = function () {
            var e = p.o_doc.createElement("CANVAS"),
                t = e.getContext("2d");
            e.height = this.naturalHeight, e.width = this.naturalWidth, t.drawImage(this, 0, 0), a.src = e.toDataURL("image/png"), te(a);
          }, i.src = (0 === a.src.indexOf("blob:") ? "" : p.opts.imageCORSProxy + "/") + a.src;
        } else 0 !== a.src.indexOf("http") || 0 === a.src.indexOf("https://mail.google.com/mail") ? (p.selection.save(), ye(a).remove(), p.selection.restore()) : ye(a).removeAttr("data-fr-image-pasted");
      }) : p.$el.find("img[data-fr-image-pasted]").remove();
    }

    function ie(e) {
      var t = e.target.result,
          a = p.opts.imageDefaultWidth;
      a && "auto" != a && (a += p.opts.imageResizeWithPercent ? "%" : "px"), p.undo.saveStep(), p.html.insert('<img data-fr-image-pasted="true" src="' + t + '"' + (a ? ' style="width: ' + a + ';"' : "") + ">");
      var i = p.$el.find('img[data-fr-image-pasted="true"]');
      i && ge(i, p.opts.imageDefaultDisplay, p.opts.imageDefaultAlign), p.events.trigger("paste.after");
    }

    function re(e) {
      if (e && e.clipboardData && e.clipboardData.items) {
        var t = null;
        if (e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile();else for (var a = 0; a < e.clipboardData.items.length && !(t = e.clipboardData.items[a].getAsFile()); a++);
        if (t) return i = t, (r = new FileReader()).onload = ie, r.readAsDataURL(i), !1;
      }

      var i, r;
    }

    function ne(e) {
      return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ');
    }

    function se(e) {
      if ("false" == ye(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
      if (e && "touchend" == e.type && a) return !0;
      if (e && p.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;

      for (var t = 0; t < ye.FE.INSTANCES.length; t++) ye.FE.INSTANCES[t] != p && ye.FE.INSTANCES[t].events.trigger("image.hideResizer");

      p.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), p.helpers.isMobile() && (p.events.disableBlur(), p.$el.blur(), p.events.enableBlur()), p.opts.iframe && p.size.syncIframe(), g = ye(this), me(), A(), n(), p.popups.areVisible() && p.events.disableBlur(), p.win.getSelection ? (p.win.getSelection().removeAllRanges(), p.win.getSelection().addRange(p.doc.createRange())) : p.selection.clear(), p.helpers.isIOS() && (p.events.disableBlur(), p.$el.blur()), p.button.bulkRefresh(), p.events.trigger("video.hideResizer");
    }

    function oe(e) {
      g && (le || !0 === e) && (p.toolbar.enable(), l.removeClass("fr-active"), p.popups.hide("image.edit"), g = null, pe(), f = null, d && d.hide());
    }

    r[i] = "Image cannot be loaded from the passed link.", r[u] = "No link in upload response.", r[m] = "Error during file upload.", r[h] = "Parsing response failed.", r[v] = "File is too large.", r[b] = "Image file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
    var le = !(r[y] = "Image file is corrupted.");

    function fe() {
      le = !0;
    }

    function pe() {
      le = !1;
    }

    function ge(e, t, a) {
      !p.opts.htmlUntouched && p.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), a && e.addClass("fr-fi" + a[0]), t && e.addClass("fr-di" + t[0])) : "inline" == t ? (e.css({
        display: "inline-block",
        verticalAlign: "bottom",
        margin: p.opts.imageDefaultMargin
      }), "center" == a ? e.css({
        "float": "none",
        marginBottom: "",
        marginTop: "",
        maxWidth: "calc(100% - " + 2 * p.opts.imageDefaultMargin + "px)",
        textAlign: "center"
      }) : "left" == a ? e.css({
        "float": "left",
        marginLeft: 0,
        maxWidth: "calc(100% - " + p.opts.imageDefaultMargin + "px)",
        textAlign: "left"
      }) : e.css({
        "float": "right",
        marginRight: 0,
        maxWidth: "calc(100% - " + p.opts.imageDefaultMargin + "px)",
        textAlign: "right"
      })) : "block" == t && (e.css({
        display: "block",
        "float": "none",
        verticalAlign: "top",
        margin: p.opts.imageDefaultMargin + "px auto",
        textAlign: "center"
      }), "left" == a ? e.css({
        marginLeft: 0,
        textAlign: "left"
      }) : "right" == a && e.css({
        marginRight: 0,
        textAlign: "right"
      }));
    }

    function de(e) {
      if (void 0 === e && (e = ve()), e) {
        if (e.hasClass("fr-fil")) return "left";
        if (e.hasClass("fr-fir")) return "right";
        if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
        var t = e.css("float");

        if (e.css("float", "none"), "block" == e.css("display")) {
          if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left";
          if (0 === parseInt(e.css("margin-right"), 10)) return "right";
        } else {
          if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left";
          if ("right" == e.css("float")) return "right";
        }
      }

      return "center";
    }

    function ce(e) {
      void 0 === e && (e = ve());
      var t = e.css("float");
      return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline");
    }

    function ue() {
      var e = p.popups.get("image.insert");
      e || (e = H()), p.popups.isVisible("image.insert") || (F(), p.popups.refresh("image.insert"), p.popups.setContainer("image.insert", p.$sc));
      var t = ve();
      be() && (t = t.find(".fr-img-wrap"));
      var a = t.offset().left + t.outerWidth() / 2,
          i = t.offset().top + t.outerHeight();
      p.popups.show("image.insert", a, i, t.outerHeight(!0));
    }

    function me() {
      if (g) {
        p.events.disableBlur(), p.selection.clear();
        var e = p.doc.createRange();
        e.selectNode(g.get(0)), p.browser.msie && e.collapse(!0), p.selection.get().addRange(e), p.events.enableBlur();
      }
    }

    function he() {
      return g;
    }

    function ve() {
      return be() ? g.parents(".fr-img-caption:first") : g;
    }

    function be() {
      return !!g && 0 < g.parents(".fr-img-caption").length;
    }

    return {
      _init: function () {
        var i;
        p.events.$on(p.$el, p._mousedown, "IMG" == p.el.tagName ? null : 'img:not([contenteditable="false"])', function (e) {
          if ("false" == ye(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
          p.helpers.isMobile() || p.selection.clear(), t = !0, p.popups.areVisible() && p.events.disableBlur(), p.browser.msie && (p.events.disableBlur(), p.$el.attr("contenteditable", !1)), p.draggable || "touchstart" == e.type || e.preventDefault(), e.stopPropagation();
        }), p.events.$on(p.$el, p._mouseup, "IMG" == p.el.tagName ? null : 'img:not([contenteditable="false"])', function (e) {
          if ("false" == ye(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
          t && (t = !1, e.stopPropagation(), p.browser.msie && (p.$el.attr("contenteditable", !0), p.events.enableBlur()));
        }), p.events.on("keyup", function (e) {
          if (e.shiftKey && "" === p.selection.text().replace(/\n/g, "") && p.keys.isArrow(e.which)) {
            var t = p.selection.element(),
                a = p.selection.endElement();
            t && "IMG" == t.tagName ? B(ye(t)) : a && "IMG" == a.tagName && B(ye(a));
          }
        }, !0), p.events.on("drop", W), p.events.on("element.beforeDrop", K), p.events.on("mousedown window.mousedown", fe), p.events.on("window.touchmove", pe), p.events.on("mouseup window.mouseup", function () {
          if (g) return oe(), !1;
          pe();
        }), p.events.on("commands.mousedown", function (e) {
          0 < e.parents(".fr-toolbar").length && oe();
        }), p.events.on("image.resizeEnd", function () {
          p.opts.iframe && p.size.syncIframe();
        }), p.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function () {
          oe(!(t = !1));
        }), p.events.on("modals.hide", function () {
          g && (me(), p.selection.clear());
        }), p.events.on("image.resizeEnd", function () {
          p.win.getSelection && B(g);
        }), "IMG" == p.el.tagName && p.$el.addClass("fr-view"), p.events.$on(p.$el, p.helpers.isMobile() && !p.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == p.el.tagName ? null : 'img:not([contenteditable="false"])', se), p.helpers.isMobile() && (p.events.$on(p.$el, "touchstart", "IMG" == p.el.tagName ? null : 'img:not([contenteditable="false"])', function () {
          a = !1;
        }), p.events.$on(p.$el, "touchmove", function () {
          a = !0;
        })), p.$wp ? (p.events.on("window.keydown keydown", Z, !0), p.events.on("keyup", function (e) {
          if (g && e.which == ye.FE.KEYCODE.ENTER) return !1;
        }, !0), p.events.$on(p.$el, "keydown", function () {
          var e = p.selection.element();
          e.nodeType === Node.TEXT_NODE && (e = e.parentNode), p.node.hasClass(e, "fr-inner") || (p.node.hasClass(e, "fr-img-caption") || (e = ye(e).parents(".fr-img-caption").get(0)), ye(e).after(ye.FE.INVISIBLE_SPACE + ye.FE.MARKERS), p.selection.restore());
        })) : p.events.$on(p.$win, "keydown", Z), p.events.on("toolbar.esc", function () {
          if (g) {
            if (p.$wp) p.events.disableBlur(), p.events.focus();else {
              var e = g;
              oe(!0), p.selection.setAfter(e.get(0)), p.selection.restore();
            }
            return !1;
          }
        }, !0), p.events.on("toolbar.focusEditor", function () {
          if (g) return !1;
        }, !0), p.events.on("window.cut window.copy", function (e) {
          if (g && p.popups.isVisible("image.edit") && !p.popups.get("image.edit").find(":focus").length) {
            var t = ve();
            be() ? (t.before(ye.FE.START_MARKER), t.after(ye.FE.END_MARKER), p.selection.restore(), p.paste.saveCopiedText(t.get(0).outerHTML, t.text())) : (me(), p.paste.saveCopiedText(g.get(0).outerHTML, g.attr("alt"))), "copy" == e.type ? setTimeout(function () {
              B(g);
            }) : (oe(!0), p.undo.saveStep(), setTimeout(function () {
              p.undo.saveStep();
            }, 0));
          }
        }, !0), p.browser.msie && p.events.on("keydown", function (e) {
          if (!p.selection.isCollapsed() || !g) return !0;
          var t = e.which;
          t == ye.FE.KEYCODE.C && p.keys.ctrlKey(e) ? p.events.trigger("window.copy") : t == ye.FE.KEYCODE.X && p.keys.ctrlKey(e) && p.events.trigger("window.cut");
        }), p.events.$on(ye(p.o_win), "keydown", function (e) {
          var t = e.which;
          if (g && t == ye.FE.KEYCODE.BACKSPACE) return e.preventDefault(), !1;
        }), p.events.$on(p.$win, "keydown", function (e) {
          var t = e.which;
          g && g.hasClass("fr-uploading") && t == ye.FE.KEYCODE.ESC && g.trigger("abortUpload");
        }), p.events.on("destroy", function () {
          g && g.hasClass("fr-uploading") && g.trigger("abortUpload");
        }), p.events.on("paste.before", re), p.events.on("paste.beforeCleanup", ne), p.events.on("paste.after", ae), p.events.on("html.set", e), p.events.on("html.inserted", e), e(), p.events.on("destroy", function () {
          o = [];
        }), p.events.on("html.processGet", ee), p.opts.imageOutputSize && p.events.on("html.beforeGet", function () {
          i = p.el.querySelectorAll("img");

          for (var e = 0; e < i.length; e++) {
            var t = i[e].style.width || ye(i[e]).width(),
                a = i[e].style.height || ye(i[e]).height();
            t && i[e].setAttribute("width", ("" + t).replace(/px/, "")), a && i[e].setAttribute("height", ("" + a).replace(/px/, ""));
          }
        }), p.opts.iframe && p.events.on("image.loaded", p.size.syncIframe), p.$wp && (C(), p.events.on("contentChanged", C)), p.events.$on(ye(p.o_win), "orientationchange.image", function () {
          setTimeout(function () {
            g && B(g);
          }, 100);
        }), I(!0), H(!0), q(!0), j(!0), p.events.on("node.remove", function (e) {
          if ("IMG" == e.get(0).tagName) return J(e), !1;
        });
      },
      showInsertPopup: function () {
        var e = p.$tb.find('.fr-command[data-cmd="insertImage"]'),
            t = p.popups.get("image.insert");
        if (t || (t = H()), F(), !t.hasClass("fr-active")) if (p.popups.refresh("image.insert"), p.popups.setContainer("image.insert", p.$tb), e.is(":visible")) {
          var a = e.offset().left + e.outerWidth() / 2,
              i = e.offset().top + (p.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          p.popups.show("image.insert", a, i, e.outerHeight());
        } else p.position.forSelection(t), p.popups.show("image.insert");
      },
      showLayer: function (e) {
        var t,
            a,
            i = p.popups.get("image.insert");

        if (g || p.opts.toolbarInline) {
          if (g) {
            var r = ve();
            be() && (r = r.find(".fr-img-wrap")), a = r.offset().top + r.outerHeight(), t = r.offset().left + r.outerWidth() / 2;
          }
        } else {
          var n = p.$tb.find('.fr-command[data-cmd="insertImage"]');
          t = n.offset().left + n.outerWidth() / 2, a = n.offset().top + (p.opts.toolbarBottom ? 10 : n.outerHeight() - 10);
        }

        !g && p.opts.toolbarInline && (a = i.offset().top - p.helpers.getPX(i.css("margin-top")), i.hasClass("fr-above") && (a += i.outerHeight())), i.find(".fr-layer").removeClass("fr-active"), i.find(".fr-" + e + "-layer").addClass("fr-active"), p.popups.show("image.insert", t, a, g ? g.outerHeight() : 0), p.accessibility.focusPopup(i);
      },
      refreshUploadButton: function (e) {
        p.popups.get("image.insert").find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
      },
      refreshByURLButton: function (e) {
        p.popups.get("image.insert").find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
      },
      upload: _,
      insertByURL: function () {
        var e = p.popups.get("image.insert").find(".fr-image-by-url-layer input");

        if (0 < e.val().length) {
          $(), k(p.language.translate("Loading image"));
          var t = e.val();

          if (p.opts.imageUploadRemoteUrls && p.opts.imageCORSProxy && p.opts.imageUpload) {
            var a = new XMLHttpRequest();
            a.onload = function () {
              200 == this.status ? _([new Blob([this.response], {
                type: this.response.type || "image/png"
              })], g) : U(i);
            }, a.onerror = function () {
              O(t, !0, [], g);
            }, a.open("GET", p.opts.imageCORSProxy + "/" + t, !0), a.responseType = "blob", a.send();
          } else O(t, !0, [], g);

          e.val(""), e.blur();
        }
      },
      align: function (e) {
        var t = ve();
        t.removeClass("fr-fir fr-fil"), !p.opts.htmlUntouched && p.opts.useClasses ? "left" == e ? t.addClass("fr-fil") : "right" == e && t.addClass("fr-fir") : ge(t, ce(), e), me(), A(), n(), p.selection.clear();
      },
      refreshAlign: function (e) {
        g && e.find("> *:first").replaceWith(p.icon.create("image-align-" + de()));
      },
      refreshAlignOnShow: function (e, t) {
        g && t.find('.fr-command[data-param1="' + de() + '"]').addClass("fr-active").attr("aria-selected", !0);
      },
      display: function (e) {
        var t = ve();
        t.removeClass("fr-dii fr-dib"), !p.opts.htmlUntouched && p.opts.useClasses ? "inline" == e ? t.addClass("fr-dii") : "block" == e && t.addClass("fr-dib") : ge(t, e, de()), me(), A(), n(), p.selection.clear();
      },
      refreshDisplayOnShow: function (e, t) {
        g && t.find('.fr-command[data-param1="' + ce() + '"]').addClass("fr-active").attr("aria-selected", !0);
      },
      replace: ue,
      back: function () {
        g ? (p.events.disableBlur(), ye(".fr-popup input:focus").blur(), B(g)) : (p.events.disableBlur(), p.selection.restore(), p.events.enableBlur(), p.popups.hide("image.insert"), p.toolbar.showInline());
      },
      get: he,
      getEl: ve,
      insert: O,
      showProgressBar: $,
      remove: J,
      hideProgressBar: F,
      applyStyle: function (e, t, a) {
        if (void 0 === t && (t = p.opts.imageStyles), void 0 === a && (a = p.opts.imageMultipleStyles), !g) return !1;
        var i = ve();

        if (!a) {
          var r = Object.keys(t);
          r.splice(r.indexOf(e), 1), i.removeClass(r.join(" "));
        }

        "object" == typeof t[e] ? (i.removeAttr("style"), i.css(t[e].style)) : i.toggleClass(e), B(g);
      },
      showAltPopup: X,
      showSizePopup: V,
      setAlt: function (e) {
        if (g) {
          var t = p.popups.get("image.alt");
          g.attr("alt", e || t.find("input").val() || ""), t.find("input:focus").blur(), B(g);
        }
      },
      setSize: function (e, t) {
        if (g) {
          var a = p.popups.get("image.size");
          e = e || a.find('input[name="width"]').val() || "", t = t || a.find('input[name="height"]').val() || "";
          var i = /^[\d]+((px)|%)*$/g;
          g.removeAttr("width").removeAttr("height"), e.match(i) ? g.css("width", e) : g.css("width", ""), t.match(i) ? g.css("height", t) : g.css("height", ""), be() && (g.parent().removeAttr("width").removeAttr("height"), e.match(i) ? g.parent().css("width", e) : g.parent().css("width", ""), t.match(i) ? g.parent().css("height", t) : g.parent().css("height", "")), a && a.find("input:focus").blur(), B(g);
        }
      },
      toggleCaption: function () {
        var e;

        if (g && !be()) {
          (e = g).parent().is("a") && (e = g.parent());
          var t = e.width();
          e.wrap("<span " + (p.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + g.attr("class") + '" draggable="false"></span>'), e.wrap('<span class="fr-img-wrap"></span>'), e.after('<span class="fr-inner"' + (p.browser.mozilla ? "" : ' contenteditable="true"') + ">" + ye.FE.START_MARKER + "Image caption" + ye.FE.END_MARKER + "</span>"), g.removeAttr("class").removeAttr("style").removeAttr("width"), g.parents(".fr-img-caption").css("width", t + "px"), oe(!0), p.selection.restore();
        } else e = ve(), g.insertAfter(e), g.attr("class", e.attr("class").replace("fr-img-caption", "")).attr("style", e.attr("style")), e.remove(), B(g);
      },
      hasCaption: be,
      exitEdit: oe,
      edit: B
    };
  }, ye.FE.DefineIcon("insertImage", {
    NAME: "image"
  }), ye.FE.RegisterShortcut(ye.FE.KEYCODE.P, "insertImage", null, "P"), ye.FE.RegisterCommand("insertImage", {
    title: "Insert Image",
    undo: !1,
    focus: !0,
    refreshAfterCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup();
    },
    plugin: "image"
  }), ye.FE.DefineIcon("imageUpload", {
    NAME: "upload"
  }), ye.FE.RegisterCommand("imageUpload", {
    title: "Upload Image",
    undo: !1,
    focus: !1,
    toggle: !0,
    callback: function () {
      this.image.showLayer("image-upload");
    },
    refresh: function (e) {
      this.image.refreshUploadButton(e);
    }
  }), ye.FE.DefineIcon("imageByURL", {
    NAME: "link"
  }), ye.FE.RegisterCommand("imageByURL", {
    title: "By URL",
    undo: !1,
    focus: !1,
    toggle: !0,
    callback: function () {
      this.image.showLayer("image-by-url");
    },
    refresh: function (e) {
      this.image.refreshByURLButton(e);
    }
  }), ye.FE.RegisterCommand("imageInsertByURL", {
    title: "Insert Image",
    undo: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.image.insertByURL();
    },
    refresh: function (e) {
      this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"));
    }
  }), ye.FE.DefineIcon("imageDisplay", {
    NAME: "star"
  }), ye.FE.RegisterCommand("imageDisplay", {
    title: "Display",
    type: "dropdown",
    options: {
      inline: "Inline",
      block: "Break Text"
    },
    callback: function (e, t) {
      this.image.display(t);
    },
    refresh: function (e) {
      this.opts.imageTextNear || e.addClass("fr-hidden");
    },
    refreshOnShow: function (e, t) {
      this.image.refreshDisplayOnShow(e, t);
    }
  }), ye.FE.DefineIcon("image-align", {
    NAME: "align-left"
  }), ye.FE.DefineIcon("image-align-left", {
    NAME: "align-left"
  }), ye.FE.DefineIcon("image-align-right", {
    NAME: "align-right"
  }), ye.FE.DefineIcon("image-align-center", {
    NAME: "align-justify"
  }), ye.FE.DefineIcon("imageAlign", {
    NAME: "align-justify"
  }), ye.FE.RegisterCommand("imageAlign", {
    type: "dropdown",
    title: "Align",
    options: {
      left: "Align Left",
      center: "None",
      right: "Align Right"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = ye.FE.COMMANDS.imageAlign.options;

      for (var a in t) t.hasOwnProperty(a) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="' + a + '" title="' + this.language.translate(t[a]) + '">' + this.icon.create("image-align-" + a) + '<span class="fr-sr-only">' + this.language.translate(t[a]) + "</span></a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.image.align(t);
    },
    refresh: function (e) {
      this.image.refreshAlign(e);
    },
    refreshOnShow: function (e, t) {
      this.image.refreshAlignOnShow(e, t);
    }
  }), ye.FE.DefineIcon("imageReplace", {
    NAME: "exchange",
    FA5NAME: "exchange-alt"
  }), ye.FE.RegisterCommand("imageReplace", {
    title: "Replace",
    undo: !1,
    focus: !1,
    popup: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.image.replace();
    }
  }), ye.FE.DefineIcon("imageRemove", {
    NAME: "trash"
  }), ye.FE.RegisterCommand("imageRemove", {
    title: "Remove",
    callback: function () {
      this.image.remove();
    }
  }), ye.FE.DefineIcon("imageBack", {
    NAME: "arrow-left"
  }), ye.FE.RegisterCommand("imageBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    callback: function () {
      this.image.back();
    },
    refresh: function (e) {
      this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    }
  }), ye.FE.RegisterCommand("imageDismissError", {
    title: "OK",
    undo: !1,
    callback: function () {
      this.image.hideProgressBar(!0);
    }
  }), ye.FE.DefineIcon("imageStyle", {
    NAME: "magic"
  }), ye.FE.RegisterCommand("imageStyle", {
    title: "Style",
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.imageStyles;

      for (var a in t) if (t.hasOwnProperty(a)) {
        var i = t[a];
        "object" == typeof i && (i = i.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="' + a + '">' + this.language.translate(i) + "</a></li>";
      }

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.image.applyStyle(t);
    },
    refreshOnShow: function (e, t) {
      var a = this.image.getEl();
      a && t.find(".fr-command").each(function () {
        var e = ye(this).data("param1"),
            t = a.hasClass(e);
        ye(this).toggleClass("fr-active", t).attr("aria-selected", t);
      });
    }
  }), ye.FE.DefineIcon("imageAlt", {
    NAME: "info"
  }), ye.FE.RegisterCommand("imageAlt", {
    undo: !1,
    focus: !1,
    popup: !0,
    title: "Alternative Text",
    callback: function () {
      this.image.showAltPopup();
    }
  }), ye.FE.RegisterCommand("imageSetAlt", {
    undo: !0,
    focus: !1,
    title: "Update",
    refreshAfterCallback: !1,
    callback: function () {
      this.image.setAlt();
    }
  }), ye.FE.DefineIcon("imageSize", {
    NAME: "arrows-alt"
  }), ye.FE.RegisterCommand("imageSize", {
    undo: !1,
    focus: !1,
    popup: !0,
    title: "Change Size",
    callback: function () {
      this.image.showSizePopup();
    }
  }), ye.FE.RegisterCommand("imageSetSize", {
    undo: !0,
    focus: !1,
    title: "Update",
    refreshAfterCallback: !1,
    callback: function () {
      this.image.setSize();
    }
  }), ye.FE.DefineIcon("imageCaption", {
    NAME: "commenting",
    FA5NAME: "comment-alt"
  }), ye.FE.RegisterCommand("imageCaption", {
    undo: !0,
    focus: !1,
    title: "Image Caption",
    refreshAfterCallback: !0,
    callback: function () {
      this.image.toggleCaption();
    },
    refresh: function (e) {
      this.image.get() && e.toggleClass("fr-active", this.image.hasCaption());
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/inline_style.min.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/inline_style.min.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (r) {
  r.extend(r.FE.DEFAULTS, {
    inlineStyles: {
      "Big Red": "font-size: 20px; color: red;",
      "Small Blue": "font-size: 14px; color: blue;"
    }
  }), r.FE.PLUGINS.inlineStyle = function (l) {
    return {
      apply: function (e) {
        if ("" !== l.selection.text()) for (var n = e.split(";"), t = 0; t < n.length; t++) {
          var i = n[t].split(":");
          n[t].length && 2 == i.length && l.format.applyStyle(i[0].trim(), i[1].trim());
        } else l.html.insert('<span style="' + e + '">' + r.FE.INVISIBLE_SPACE + r.FE.MARKERS + "</span>");
      }
    };
  }, r.FE.RegisterCommand("inlineStyle", {
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          n = this.opts.inlineStyles;

      for (var t in n) n.hasOwnProperty(t) && (e += '<li role="presentation"><span style="' + n[t] + '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="' + n[t] + '" title="' + this.language.translate(t) + '">' + this.language.translate(t) + "</a></span></li>");

      return e += "</ul>";
    },
    title: "Inline Style",
    callback: function (e, n) {
      this.inlineStyle.apply(n);
    },
    plugin: "inlineStyle"
  }), r.FE.DefineIcon("inlineStyle", {
    NAME: "paint-brush"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/line_breaker.min.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/line_breaker.min.js ***!
  \**********************************************************************/
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
}(function (v) {
  v.extend(v.FE.DEFAULTS, {
    lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly"],
    lineBreakerOffset: 15,
    lineBreakerHorizontalOffset: 10
  }), v.FE.PLUGINS.lineBreaker = function (d) {
    var g, t, a;

    function s(e, t) {
      var n, r, a, o, i, s, f, l;
      if (null == e) i = (o = t.parent()).offset().top, n = (f = t.offset().top) - Math.min((f - i) / 2, d.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left;else if (null == t) (s = (o = e.parent()).offset().top + o.outerHeight()) < (l = e.offset().top + e.outerHeight()) && (s = (o = v(o).parent()).offset().top + o.outerHeight()), n = l + Math.min(Math.abs(s - l) / 2, d.opts.lineBreakerOffset), a = o.outerWidth(), r = o.offset().left;else {
        o = e.parent();
        var p = e.offset().top + e.height(),
            u = t.offset().top;
        if (u < p) return !1;
        n = (p + u) / 2, a = o.outerWidth(), r = o.offset().left;
      }
      d.opts.iframe && (r += d.$iframe.offset().left - d.helpers.scrollLeft(), n += d.$iframe.offset().top - d.helpers.scrollTop()), d.$box.append(g), g.css("top", n - d.win.pageYOffset), g.css("left", r - d.win.pageXOffset), g.css("width", a), g.data("tag1", e), g.data("tag2", t), g.addClass("fr-visible").data("instance", d);
    }

    function f(e) {
      if (e) {
        var t = v(e);
        if (0 === d.$el.find(t).length) return null;
        if (e.nodeType != Node.TEXT_NODE && t.is(d.opts.lineBreakerTags.join(","))) return t;
        if (0 < t.parents(d.opts.lineBreakerTags.join(",")).length) return e = t.parents(d.opts.lineBreakerTags.join(",")).get(0), 0 !== d.$el.find(e).length && v(e).is(d.opts.lineBreakerTags.join(",")) ? v(e) : null;
      }

      return null;
    }

    function o(e, t) {
      var n = d.doc.elementFromPoint(e, t);
      return n && !v(n).closest(".fr-line-breaker").length && !d.node.isElement(n) && n != d.$wp.get(0) && function (e) {
        if ("undefined" != typeof e.inFroalaWrapper) return e.inFroalaWrapper;

        for (var t = e; e.parentNode && e.parentNode !== d.$wp.get(0);) e = e.parentNode;

        return t.inFroalaWrapper = e.parentNode == d.$wp.get(0), t.inFroalaWrapper;
      }(n) ? n : null;
    }

    function i(e, t, n) {
      for (var r = n, a = null; r <= d.opts.lineBreakerOffset && !a;) (a = o(e, t - r)) || (a = o(e, t + r)), r += n;

      return a;
    }

    function l(e, t, n) {
      for (var r = null, a = 100; !r && e > d.$box.offset().left && e < d.$box.offset().left + d.$box.outerWidth() && 0 < a;) (r = o(e, t)) || (r = i(e, t, 5)), "left" == n ? e -= d.opts.lineBreakerHorizontalOffset : e += d.opts.lineBreakerHorizontalOffset, a -= d.opts.lineBreakerHorizontalOffset;

      return r;
    }

    function n(e) {
      var t = a = null,
          n = null,
          r = d.doc.elementFromPoint(e.pageX - d.win.pageXOffset, e.pageY - d.win.pageYOffset);
      r && ("HTML" == r.tagName || "BODY" == r.tagName || d.node.isElement(r) || 0 <= (r.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((n = i(e.pageX - d.win.pageXOffset, e.pageY - d.win.pageYOffset, 1)) || (n = l(e.pageX - d.win.pageXOffset - d.opts.lineBreakerHorizontalOffset, e.pageY - d.win.pageYOffset, "left")), n || (n = l(e.pageX - d.win.pageXOffset + d.opts.lineBreakerHorizontalOffset, e.pageY - d.win.pageYOffset, "right")), t = f(n)) : t = f(r), t ? function (e, t) {
        var n,
            r,
            a = e.offset().top,
            o = e.offset().top + e.outerHeight();
        if (Math.abs(o - t) <= d.opts.lineBreakerOffset || Math.abs(t - a) <= d.opts.lineBreakerOffset) if (Math.abs(o - t) < Math.abs(t - a)) {
          for (var i = (r = e.get(0)).nextSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length;) i = i.nextSibling;

          if (!i) return s(e, null);
          if (n = f(i)) return s(e, n);
        } else {
          if (!(r = e.get(0)).previousSibling) return s(null, e);
          if (n = f(r.previousSibling)) return s(n, e);
        }
        g.removeClass("fr-visible").removeData("instance");
      }(t, e.pageY) : d.core.sameInstance(g) && g.removeClass("fr-visible").removeData("instance");
    }

    function e(e) {
      return !(g.hasClass("fr-visible") && !d.core.sameInstance(g)) && (d.popups.areVisible() || d.el.querySelector(".fr-selected-cell") ? (g.removeClass("fr-visible"), !0) : void (!1 !== t || d.edit.isDisabled() || (a && clearTimeout(a), a = setTimeout(n, 30, e))));
    }

    function r() {
      a && clearTimeout(a), g && g.hasClass("fr-visible") && g.removeClass("fr-visible").removeData("instance");
    }

    function p() {
      t = !0, r();
    }

    function u() {
      t = !1;
    }

    function c(e) {
      e.preventDefault();
      var t = g.data("instance") || d;
      g.removeClass("fr-visible").removeData("instance");
      var n = g.data("tag1"),
          r = g.data("tag2"),
          a = d.html.defaultTag();
      null == n ? a && "TD" != r.parent().get(0).tagName && 0 === r.parents(a).length ? r.before("<" + a + ">" + v.FE.MARKERS + "<br></" + a + ">") : r.before(v.FE.MARKERS + "<br>") : a && "TD" != n.parent().get(0).tagName && 0 === n.parents(a).length ? n.after("<" + a + ">" + v.FE.MARKERS + "<br></" + a + ">") : n.after(v.FE.MARKERS + "<br>"), t.selection.restore();
    }

    return {
      _init: function () {
        if (!d.$wp) return !1;
        d.shared.$line_breaker || (d.shared.$line_breaker = v('<div class="fr-line-breaker"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + d.language.translate("Break") + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="21" y="11" width="2" height="8"/><rect x="14" y="17" width="7" height="2"/><path d="M14.000,14.000 L14.000,22.013 L9.000,18.031 L14.000,14.000 Z"/></svg></a></div>')), g = d.shared.$line_breaker, d.events.on("shared.destroy", function () {
          g.html("").removeData().remove(), g = null;
        }, !0), d.events.on("destroy", function () {
          g.removeData("instance").removeClass("fr-visible").appendTo("body:first"), clearTimeout(a);
        }, !0), d.events.$on(g, "mousemove", function (e) {
          e.stopPropagation();
        }, !0), d.events.bindClick(g, "a", c), t = !1, d.events.$on(d.$win, "mousemove", e), d.events.$on(v(d.win), "scroll", r), d.events.on("popups.show.table.edit", r), d.events.on("commands.after", r), d.events.$on(v(d.win), "mousedown", p), d.events.$on(v(d.win), "mouseup", u);
      }
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/link.min.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/link.min.js ***!
  \**************************************************************/
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
}(function (m) {
  m.extend(m.FE.POPUP_TEMPLATES, {
    "link.edit": "[_BUTTONS_]",
    "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
  }), m.extend(m.FE.DEFAULTS, {
    linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
    linkInsertButtons: ["linkBack", "|", "linkList"],
    linkAttributes: {},
    linkAutoPrefix: "http://",
    linkStyles: {
      "fr-green": "Green",
      "fr-strong": "Thick"
    },
    linkMultipleStyles: !0,
    linkConvertEmailAddress: !0,
    linkAlwaysBlank: !1,
    linkAlwaysNoFollow: !1,
    linkNoOpener: !0,
    linkNoReferrer: !0,
    linkList: [{
      text: "Froala",
      href: "https://froala.com",
      target: "_blank"
    }, {
      text: "Google",
      href: "https://google.com",
      target: "_blank"
    }, {
      displayText: "Facebook",
      href: "https://facebook.com"
    }],
    linkText: !0
  }), m.FE.PLUGINS.link = function (d) {
    function c() {
      var e = d.image ? d.image.get() : null;

      if (!e && d.$wp) {
        var t = d.selection.ranges(0).commonAncestorContainer;

        try {
          t && (t.contains && t.contains(d.el) || !d.el.contains(t) || d.el == t) && (t = null);
        } catch (r) {
          t = null;
        }

        if (t && "A" === t.tagName) return t;
        var n = d.selection.element(),
            i = d.selection.endElement();
        "A" == n.tagName || d.node.isElement(n) || (n = m(n).parentsUntil(d.$el, "a:first").get(0)), "A" == i.tagName || d.node.isElement(i) || (i = m(i).parentsUntil(d.$el, "a:first").get(0));

        try {
          i && (i.contains && i.contains(d.el) || !d.el.contains(i) || d.el == i) && (i = null);
        } catch (r) {
          i = null;
        }

        try {
          n && (n.contains && n.contains(d.el) || !d.el.contains(n) || d.el == n) && (n = null);
        } catch (r) {
          n = null;
        }

        return i && i == n && "A" == i.tagName ? (d.browser.msie || d.helpers.isMobile()) && (d.selection.info(n).atEnd || d.selection.info(n).atStart) ? null : n : null;
      }

      return "A" == d.el.tagName ? d.el : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? e.get(0).parentNode : void 0;
    }

    function u() {
      var e,
          t,
          n,
          i,
          r = d.image ? d.image.get() : null,
          l = [];
      if (r) "A" == r.get(0).parentNode.tagName && l.push(r.get(0).parentNode);else if (d.win.getSelection) {
        var a = d.win.getSelection();

        if (a.getRangeAt && a.rangeCount) {
          i = d.doc.createRange();

          for (var s = 0; s < a.rangeCount; ++s) if ((t = (e = a.getRangeAt(s)).commonAncestorContainer) && 1 != t.nodeType && (t = t.parentNode), t && "a" == t.nodeName.toLowerCase()) l.push(t);else {
            n = t.getElementsByTagName("a");

            for (var o = 0; o < n.length; ++o) i.selectNodeContents(n[o]), i.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < i.compareBoundaryPoints(e.START_TO_END, e) && l.push(n[o]);
          }
        }
      } else if (d.doc.selection && "Control" != d.doc.selection.type) if ("a" == (t = (e = d.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) l.push(t);else {
        n = t.getElementsByTagName("a"), i = d.doc.body.createTextRange();

        for (var p = 0; p < n.length; ++p) i.moveToElementText(n[p]), -1 < i.compareEndPoints("StartToEnd", e) && i.compareEndPoints("EndToStart", e) < 1 && l.push(n[p]);
      }
      return l;
    }

    function k(r) {
      if (d.core.hasFocus()) {
        if (a(), r && "keyup" === r.type && (r.altKey || r.which == m.FE.KEYCODE.ALT)) return !0;
        setTimeout(function () {
          if (!r || r && (1 == r.which || "mouseup" != r.type)) {
            var e = c(),
                t = d.image ? d.image.get() : null;

            if (e && !t) {
              if (d.image) {
                var n = d.node.contents(e);

                if (1 == n.length && "IMG" == n[0].tagName) {
                  var i = d.selection.ranges(0);
                  return 0 === i.startOffset && 0 === i.endOffset ? m(e).before(m.FE.MARKERS) : m(e).after(m.FE.MARKERS), d.selection.restore(), !1;
                }
              }

              r && r.stopPropagation(), l(e);
            }
          }
        }, d.helpers.isIOS() ? 100 : 0);
      }
    }

    function l(e) {
      var t = d.popups.get("link.edit");
      t || (t = function () {
        var e = "";
        1 <= d.opts.linkEditButtons.length && ("A" == d.el.tagName && 0 <= d.opts.linkEditButtons.indexOf("linkRemove") && d.opts.linkEditButtons.splice(d.opts.linkEditButtons.indexOf("linkRemove"), 1), e = '<div class="fr-buttons">' + d.button.buildList(d.opts.linkEditButtons) + "</div>");
        var t = {
          buttons: e
        },
            n = d.popups.create("link.edit", t);
        d.$wp && d.events.$on(d.$wp, "scroll.link-edit", function () {
          c() && d.popups.isVisible("link.edit") && l(c());
        });
        return n;
      }());
      var n = m(e);
      d.popups.isVisible("link.edit") || d.popups.refresh("link.edit"), d.popups.setContainer("link.edit", d.$sc);
      var i = n.offset().left + m(e).outerWidth() / 2,
          r = n.offset().top + n.outerHeight();
      d.popups.show("link.edit", i, r, n.outerHeight());
    }

    function a() {
      d.popups.hide("link.edit");
    }

    function o() {}

    function p() {
      var e = d.popups.get("link.insert"),
          t = c();

      if (t) {
        var n,
            i,
            r = m(t),
            l = e.find('input.fr-link-attr[type="text"]'),
            a = e.find('input.fr-link-attr[type="checkbox"]');

        for (n = 0; n < l.length; n++) (i = m(l[n])).val(r.attr(i.attr("name") || ""));

        for (a.prop("checked", !1), n = 0; n < a.length; n++) i = m(a[n]), r.attr(i.attr("name")) == i.data("checked") && i.prop("checked", !0);

        e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text());
      } else e.find('input.fr-link-attr[type="text"]').val(""), e.find('input.fr-link-attr[type="checkbox"]').prop("checked", !1), e.find('input.fr-link-attr[type="text"][name="text"]').val(d.selection.text());

      e.find("input.fr-link-attr").trigger("change"), (d.image ? d.image.get() : null) ? e.find('.fr-link-attr[name="text"]').parent().hide() : e.find('.fr-link-attr[name="text"]').parent().show();
    }

    function s(e) {
      if (e) return d.popups.onRefresh("link.insert", p), d.popups.onHide("link.insert", o), !0;
      var t = "";
      1 <= d.opts.linkInsertButtons.length && (t = '<div class="fr-buttons">' + d.button.buildList(d.opts.linkInsertButtons) + "</div>");
      var n = "",
          i = 0;

      for (var r in n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-' + d.id + '">', n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-' + d.id + '" name="href" type="text" class="fr-link-attr" placeholder="' + d.language.translate("URL") + '" tabIndex="' + ++i + '"></div>', d.opts.linkText && (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-' + d.id + '" name="text" type="text" class="fr-link-attr" placeholder="' + d.language.translate("Text") + '" tabIndex="' + ++i + '"></div>'), d.opts.linkAttributes) if (d.opts.linkAttributes.hasOwnProperty(r)) {
        var l = d.opts.linkAttributes[r];
        n += '<div class="fr-input-line"><input name="' + r + '" type="text" class="fr-link-attr" placeholder="' + d.language.translate(l) + '" tabIndex="' + ++i + '"></div>';
      }

      d.opts.linkAlwaysBlank || (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-' + d.id + '" tabIndex="' + ++i + '"><span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg></span></span><label for="fr-link-target-' + d.id + '">' + d.language.translate("Open in new tab") + "</label></div>");
      var a = {
        buttons: t,
        input_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="' + ++i + '" type="button">' + d.language.translate("Insert") + "</button></div></div>"
      },
          s = d.popups.create("link.insert", a);
      return d.$wp && d.events.$on(d.$wp, "scroll.link-insert", function () {
        (d.image ? d.image.get() : null) && d.popups.isVisible("link.insert") && h(), d.popups.isVisible("link.insert") && g();
      }), s;
    }

    function f(e, t, n) {
      if (void 0 === n && (n = {}), !1 === d.events.trigger("link.beforeInsert", [e, t, n])) return !1;
      var i = d.image ? d.image.get() : null;
      i || "A" == d.el.tagName ? "A" == d.el.tagName && d.$el.focus() : (d.selection.restore(), d.popups.hide("link.insert"));
      var r = e;
      d.opts.linkConvertEmailAddress && d.helpers.isEmail(e) && !/^mailto:.*/i.test(e) && (e = "mailto:" + e);
      if ("" === d.opts.linkAutoPrefix || new RegExp("^(" + m.FE.LinkProtocols.join("|") + "):.", "i").test(e) || /^data:image.*/i.test(e) || /^(https?:|ftps?:|file:|)\/\//i.test(e) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) || ["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 && (e = d.opts.linkAutoPrefix + d.helpers.sanitizeURL(e)), e = d.helpers.sanitizeURL(e), d.opts.linkAlwaysBlank && (n.target = "_blank"), d.opts.linkAlwaysNoFollow && (n.rel = "nofollow"), d.helpers.isEmail(r) && (n.target = null, n.rel = null), "_blank" == n.target ? (d.opts.linkNoOpener && (n.rel ? n.rel += " noopener" : n.rel = "noopener"), d.opts.linkNoReferrer && (n.rel ? n.rel += " noreferrer" : n.rel = "noreferrer")) : null == n.target && (n.rel ? n.rel = n.rel.replace(/noopener/, "").replace(/noreferrer/, "") : n.rel = null), t = t || "", e === d.opts.linkAutoPrefix) return d.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), d.events.trigger("link.bad", [r]), !1;
      var l,
          a = c();

      if (a) {
        if ((l = m(a)).attr("href", e), 0 < t.length && l.text() != t && !i) {
          for (var s = l.get(0); 1 === s.childNodes.length && s.childNodes[0].nodeType == Node.ELEMENT_NODE;) s = s.childNodes[0];

          m(s).text(t);
        }

        i || l.prepend(m.FE.START_MARKER).append(m.FE.END_MARKER), l.attr(n), i || d.selection.restore();
      } else {
        i ? i.wrap('<a href="' + e + '"></a>') : (d.format.remove("a"), d.selection.isCollapsed() ? (t = 0 === t.length ? r : t, d.html.insert('<a href="' + e + '">' + m.FE.START_MARKER + t.replace(/&/g, "&amp;") + m.FE.END_MARKER + "</a>"), d.selection.restore()) : 0 < t.length && t != d.selection.text().replace(/\n/g, "") ? (d.selection.remove(), d.html.insert('<a href="' + e + '">' + m.FE.START_MARKER + t.replace(/&/g, "&amp;") + m.FE.END_MARKER + "</a>"), d.selection.restore()) : (!function () {
          if (!d.selection.isCollapsed()) {
            d.selection.save();

            for (var e = d.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); e.length;) {
              var t = m(e.pop());
              t.removeClass("fr-unprocessed");
              var n = d.node.deepestParent(t.get(0));

              if (n) {
                for (var i = t.get(0), r = "", l = ""; i = i.parentNode, d.node.isBlock(i) || (r += d.node.closeTagString(i), l = d.node.openTagString(i) + l), i != n;);

                var a = d.node.openTagString(t.get(0)) + t.html() + d.node.closeTagString(t.get(0));
                t.replaceWith('<span id="fr-break"></span>');
                var s = n.outerHTML;
                s = s.replace(/<span id="fr-break"><\/span>/g, r + a + l), n.outerHTML = s;
              }

              e = d.$el.find(".fr-marker.fr-unprocessed").toArray();
            }

            d.html.cleanEmptyTags(), d.selection.restore();
          }
        }(), d.format.apply("a", {
          href: e
        })));

        for (var o = u(), p = 0; p < o.length; p++) (l = m(o[p])).attr(n), l.removeAttr("_moz_dirty");

        1 == o.length && d.$wp && !i && (m(o[0]).prepend(m.FE.START_MARKER).append(m.FE.END_MARKER), d.selection.restore());
      }

      if (i) {
        var f = d.popups.get("link.insert");
        f && f.find("input:focus").blur(), d.image.edit(i);
      } else k();
    }

    function g() {
      a();
      var e = c();

      if (e) {
        var t = d.popups.get("link.insert");
        t || (t = s()), d.popups.isVisible("link.insert") || (d.popups.refresh("link.insert"), d.selection.save(), d.helpers.isMobile() && (d.events.disableBlur(), d.$el.blur(), d.events.enableBlur())), d.popups.setContainer("link.insert", d.$sc);
        var n = (d.image ? d.image.get() : null) || m(e),
            i = n.offset().left + n.outerWidth() / 2,
            r = n.offset().top + n.outerHeight();
        d.popups.show("link.insert", i, r, n.outerHeight());
      }
    }

    function h() {
      var e = d.image ? d.image.getEl() : null;

      if (e) {
        var t = d.popups.get("link.insert");
        d.image.hasCaption() && (e = e.find(".fr-img-wrap")), t || (t = s()), p(), d.popups.setContainer("link.insert", d.$sc);
        var n = e.offset().left + e.outerWidth() / 2,
            i = e.offset().top + e.outerHeight();
        d.popups.show("link.insert", n, i, e.outerHeight());
      }
    }

    return {
      _init: function () {
        d.events.on("keyup", function (e) {
          e.which != m.FE.KEYCODE.ESC && k(e);
        }), d.events.on("window.mouseup", k), d.events.$on(d.$el, "click", "a", function (e) {
          d.edit.isDisabled() && e.preventDefault();
        }), d.helpers.isMobile() && d.events.$on(d.$doc, "selectionchange", k), s(!0), "A" == d.el.tagName && d.$el.addClass("fr-view"), d.events.on("toolbar.esc", function () {
          if (d.popups.isVisible("link.edit")) return d.events.disableBlur(), d.events.focus(), !1;
        }, !0);
      },
      remove: function () {
        var e = c(),
            t = d.image ? d.image.get() : null;
        if (!1 === d.events.trigger("link.beforeRemove", [e])) return !1;
        t && e ? (t.unwrap(), d.image.edit(t)) : e && (d.selection.save(), m(e).replaceWith(m(e).html()), d.selection.restore(), a());
      },
      showInsertPopup: function () {
        var e = d.$tb.find('.fr-command[data-cmd="insertLink"]'),
            t = d.popups.get("link.insert");
        if (t || (t = s()), !t.hasClass("fr-active")) if (d.popups.refresh("link.insert"), d.popups.setContainer("link.insert", d.$tb || d.$sc), e.is(":visible")) {
          var n = e.offset().left + e.outerWidth() / 2,
              i = e.offset().top + (d.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          d.popups.show("link.insert", n, i, e.outerHeight());
        } else d.position.forSelection(t), d.popups.show("link.insert");
      },
      usePredefined: function (e) {
        var t,
            n,
            i = d.opts.linkList[e],
            r = d.popups.get("link.insert"),
            l = r.find('input.fr-link-attr[type="text"]'),
            a = r.find('input.fr-link-attr[type="checkbox"]');

        for (n = 0; n < l.length; n++) i[(t = m(l[n])).attr("name")] ? t.val(i[t.attr("name")]) : "text" != t.attr("name") && t.val("");

        for (n = 0; n < a.length; n++) (t = m(a[n])).prop("checked", t.data("checked") == i[t.attr("name")]);

        d.accessibility.focusPopup(r);
      },
      insertCallback: function () {
        var e,
            t,
            n = d.popups.get("link.insert"),
            i = n.find('input.fr-link-attr[type="text"]'),
            r = n.find('input.fr-link-attr[type="checkbox"]'),
            l = (i.filter('[name="href"]').val() || "").trim(),
            a = i.filter('[name="text"]').val(),
            s = {};

        for (t = 0; t < i.length; t++) e = m(i[t]), ["href", "text"].indexOf(e.attr("name")) < 0 && (s[e.attr("name")] = e.val());

        for (t = 0; t < r.length; t++) (e = m(r[t])).is(":checked") ? s[e.attr("name")] = e.data("checked") : s[e.attr("name")] = e.data("unchecked") || null;

        var o = d.helpers.scrollTop();
        f(l, a, s), m(d.o_win).scrollTop(o);
      },
      insert: f,
      update: g,
      get: c,
      allSelected: u,
      back: function () {
        d.image && d.image.get() ? d.image.back() : (d.events.disableBlur(), d.selection.restore(), d.events.enableBlur(), c() && d.$wp ? (d.selection.restore(), a(), k()) : "A" == d.el.tagName ? (d.$el.focus(), k()) : (d.popups.hide("link.insert"), d.toolbar.showInline()));
      },
      imageLink: h,
      applyStyle: function (e, t, n) {
        void 0 === n && (n = d.opts.linkMultipleStyles), void 0 === t && (t = d.opts.linkStyles);
        var i = c();
        if (!i) return !1;

        if (!n) {
          var r = Object.keys(t);
          r.splice(r.indexOf(e), 1), m(i).removeClass(r.join(" "));
        }

        m(i).toggleClass(e), k();
      }
    };
  }, m.FE.DefineIcon("insertLink", {
    NAME: "link"
  }), m.FE.RegisterShortcut(m.FE.KEYCODE.K, "insertLink", null, "K"), m.FE.RegisterCommand("insertLink", {
    title: "Insert Link",
    undo: !1,
    focus: !0,
    refreshOnCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup();
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkOpen", {
    NAME: "external-link",
    FA5NAME: "external-link-alt"
  }), m.FE.RegisterCommand("linkOpen", {
    title: "Open Link",
    undo: !1,
    refresh: function (e) {
      this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
    },
    callback: function () {
      var e = this.link.get();
      e && (-1 !== e.href.indexOf("mailto:") ? this.o_win.open(e.href).close() : this.o_win.open(e.href, "_blank", "noopener"), this.popups.hide("link.edit"));
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkEdit", {
    NAME: "edit"
  }), m.FE.RegisterCommand("linkEdit", {
    title: "Edit Link",
    undo: !1,
    refreshAfterCallback: !1,
    popup: !0,
    callback: function () {
      this.link.update();
    },
    refresh: function (e) {
      this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkRemove", {
    NAME: "unlink"
  }), m.FE.RegisterCommand("linkRemove", {
    title: "Unlink",
    callback: function () {
      this.link.remove();
    },
    refresh: function (e) {
      this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkBack", {
    NAME: "arrow-left"
  }), m.FE.RegisterCommand("linkBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.link.back();
    },
    refresh: function (e) {
      var t = this.link.get() && this.doc.hasFocus();
      (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkList", {
    NAME: "search"
  }), m.FE.RegisterCommand("linkList", {
    title: "Choose Link",
    type: "dropdown",
    focus: !1,
    undo: !1,
    refreshAfterCallback: !1,
    html: function () {
      for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="' + n + '">' + (t[n].displayText || t[n].text) + "</a></li>";

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.link.usePredefined(t);
    },
    plugin: "link"
  }), m.FE.RegisterCommand("linkInsert", {
    focus: !1,
    refreshAfterCallback: !1,
    callback: function () {
      this.link.insertCallback();
    },
    refresh: function (e) {
      this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert"));
    },
    plugin: "link"
  }), m.FE.DefineIcon("imageLink", {
    NAME: "link"
  }), m.FE.RegisterCommand("imageLink", {
    title: "Insert Link",
    undo: !1,
    focus: !1,
    popup: !0,
    callback: function () {
      this.link.imageLink();
    },
    refresh: function (e) {
      var t;
      this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), e.removeClass("fr-hidden"));
    },
    plugin: "link"
  }), m.FE.DefineIcon("linkStyle", {
    NAME: "magic"
  }), m.FE.RegisterCommand("linkStyle", {
    title: "Style",
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.linkStyles;

      for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="' + n + '">' + this.language.translate(t[n]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.link.applyStyle(t);
    },
    refreshOnShow: function (e, t) {
      var n = this.link.get();

      if (n) {
        var i = m(n);
        t.find(".fr-command").each(function () {
          var e = m(this).data("param1"),
              t = i.hasClass(e);
          m(this).toggleClass("fr-active", t).attr("aria-selected", t);
        });
      }
    },
    refresh: function (e) {
      this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden");
    },
    plugin: "link"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/lists.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/lists.min.js ***!
  \***************************************************************/
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
}(function (u) {
  u.extend(u.FE.DEFAULTS, {
    listAdvancedTypes: !0
  }), u.FE.PLUGINS.lists = function (d) {
    function c(e) {
      return '<span class="fr-open-' + e.toLowerCase() + '"></span>';
    }

    function g(e) {
      return '<span class="fr-close-' + e.toLowerCase() + '"></span>';
    }

    function r(e, t) {
      !function (e, t) {
        for (var n = [], a = 0; a < e.length; a++) {
          var r = e[a].parentNode;
          "LI" == e[a].tagName && r.tagName != t && n.indexOf(r) < 0 && n.push(r);
        }

        for (a = n.length - 1; 0 <= a; a--) {
          var o = u(n[a]);
          o.replaceWith("<" + t.toLowerCase() + " " + d.node.attributes(o.get(0)) + ">" + o.html() + "</" + t.toLowerCase() + ">");
        }
      }(e, t);
      var n,
          a = d.html.defaultTag(),
          r = null;
      e.length && (n = "rtl" == d.opts.direction || "rtl" == u(e[0]).css("direction") ? "margin-right" : "margin-left");

      for (var o = 0; o < e.length; o++) if ("LI" != e[o].tagName) {
        var s = d.helpers.getPX(u(e[o]).css(n)) || 0;
        (e[o].style.marginLeft = null) === r && (r = s);
        var i = 0 < r ? "<" + t + ' style="' + n + ": " + r + 'px;">' : "<" + t + ">",
            l = "</" + t + ">";

        for (s -= r; 0 < s / d.opts.indentMargin;) i += "<" + t + ">", l += l, s -= d.opts.indentMargin;

        a && e[o].tagName.toLowerCase() == a ? u(e[o]).replaceWith(i + "<li" + d.node.attributes(e[o]) + ">" + u(e[o]).html() + "</li>" + l) : u(e[o]).wrap(i + "<li></li>" + l);
      }

      d.clean.lists();
    }

    function o(e) {
      var t, n;

      for (t = e.length - 1; 0 <= t; t--) for (n = t - 1; 0 <= n; n--) if (u(e[n]).find(e[t]).length || e[n] == e[t]) {
        e.splice(t, 1);
        break;
      }

      var a = [];

      for (t = 0; t < e.length; t++) {
        var r = u(e[t]),
            o = e[t].parentNode,
            s = r.attr("class");
        if (r.before(g(o.tagName)), "LI" == o.parentNode.tagName) r.before(g("LI")), r.after(c("LI"));else {
          var i = "";
          s && (i += ' class="' + s + '"');
          var l = "rtl" == d.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left";
          d.helpers.getPX(u(o).css(l)) && 0 <= (u(o).attr("style") || "").indexOf(l + ":") && (i += ' style="' + l + ":" + d.helpers.getPX(u(o).css(l)) + 'px;"'), d.html.defaultTag() && 0 === r.find(d.html.blockTagsQuery()).length && r.wrapInner("<" + d.html.defaultTag() + i + "></" + d.html.defaultTag() + ">"), d.node.isEmpty(r.get(0), !0) || 0 !== r.find(d.html.blockTagsQuery()).length || r.append("<br>"), r.append(c("LI")), r.prepend(g("LI"));
        }
        r.after(c(o.tagName)), "LI" == o.parentNode.tagName && (o = o.parentNode.parentNode), a.indexOf(o) < 0 && a.push(o);
      }

      for (t = 0; t < a.length; t++) {
        var p = u(a[t]),
            f = p.html();
        f = (f = f.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), p.replaceWith(d.node.openTagString(p.get(0)) + f + d.node.closeTagString(p.get(0)));
      }

      d.$el.find("li:empty").remove(), d.$el.find("ul:empty, ol:empty").remove(), d.clean.lists(), d.html.wrap();
    }

    function s(e) {
      d.selection.save();

      for (var t = 0; t < e.length; t++) {
        var n = e[t].previousSibling;

        if (n) {
          var a = u(e[t]).find("> ul, > ol").last().get(0);

          if (a) {
            for (var r = u("<li>").prependTo(u(a)), o = d.node.contents(e[t])[0]; o && !d.node.isList(o);) {
              var s = o.nextSibling;
              r.append(o), o = s;
            }

            u(n).append(u(a)), u(e[t]).remove();
          } else {
            var i = u(n).find("> ul, > ol").last().get(0);
            if (i) u(i).append(u(e[t]));else {
              var l = u("<" + e[t].parentNode.tagName + ">");
              u(n).append(l), l.append(u(e[t]));
            }
          }
        }
      }

      d.clean.lists(), d.selection.restore();
    }

    function i(e) {
      d.selection.save(), o(e), d.selection.restore();
    }

    function e(e) {
      if ("indent" == e || "outdent" == e) {
        for (var t = !1, n = d.selection.blocks(), a = [], r = 0; r < n.length; r++) "LI" == n[r].tagName ? (t = !0, a.push(n[r])) : "LI" == n[r].parentNode.tagName && (t = !0, a.push(n[r].parentNode));

        t && ("indent" == e ? s(a) : i(a));
      }
    }

    return {
      _init: function () {
        d.events.on("commands.after", e), d.events.on("keydown", function (e) {
          if (e.which == u.FE.KEYCODE.TAB) {
            for (var t = d.selection.blocks(), n = [], a = 0; a < t.length; a++) "LI" == t[a].tagName ? n.push(t[a]) : "LI" == t[a].parentNode.tagName && n.push(t[a].parentNode);

            if (1 < n.length || n.length && (d.selection.info(n[0]).atStart || d.node.isEmpty(n[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? i(n) : s(n), !1;
          }
        }, !0);
      },
      format: function (e, t) {
        var n, a;

        for (d.selection.save(), d.html.wrap(!0, !0, !0, !0), d.selection.restore(), a = d.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);

        if (d.selection.save(), function (e, t) {
          for (var n = !0, a = 0; a < e.length; a++) {
            if ("LI" != e[a].tagName) return !1;
            e[a].parentNode.tagName != t && (n = !1);
          }

          return n;
        }(a, e) ? t || o(a) : r(a, e), d.html.unwrap(), d.selection.restore(), t = t || "default") {
          for (a = d.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);

          for (n = 0; n < a.length; n++) "LI" == a[n].tagName && (u(a[n].parentNode).css("list-style-type", t), 0 === (u(a[n].parentNode).attr("style") || "").length && u(a[n].parentNode).removeAttr("style"));
        }
      },
      refresh: function (e, t) {
        var n = u(d.selection.element());

        if (n.get(0) != d.el) {
          var a = n.get(0);
          (a = "LI" != a.tagName && a.firstElementChild && "LI" != a.firstElementChild.tagName ? n.parents("li").get(0) : "LI" == a.tagName || a.firstElementChild ? a.firstElementChild && "LI" == a.firstElementChild.tagName ? n.get(0).firstChild : n.get(0) : n.parents("li").get(0)) && a.parentNode.tagName == t && d.el.contains(a.parentNode) && e.addClass("fr-active");
        }
      }
    };
  }, u.FE.RegisterCommand("formatUL", {
    title: "Unordered List",
    type: "button",
    hasOptions: function () {
      return this.opts.listAdvancedTypes;
    },
    options: {
      "default": "Default",
      circle: "Circle",
      disc: "Disc",
      square: "Square"
    },
    refresh: function (e) {
      this.lists.refresh(e, "UL");
    },
    callback: function (e, t) {
      this.lists.format("UL", t);
    },
    plugin: "lists"
  }), u.FE.RegisterCommand("formatOL", {
    title: "Ordered List",
    hasOptions: function () {
      return this.opts.listAdvancedTypes;
    },
    options: {
      "default": "Default",
      "lower-alpha": "Lower Alpha",
      "lower-greek": "Lower Greek",
      "lower-roman": "Lower Roman",
      "upper-alpha": "Upper Alpha",
      "upper-roman": "Upper Roman"
    },
    refresh: function (e) {
      this.lists.refresh(e, "OL");
    },
    callback: function (e, t) {
      this.lists.format("OL", t);
    },
    plugin: "lists"
  }), u.FE.DefineIcon("formatUL", {
    NAME: "list-ul"
  }), u.FE.DefineIcon("formatOL", {
    NAME: "list-ol"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/paragraph_format.min.js":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/paragraph_format.min.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (g) {
  g.extend(g.FE.DEFAULTS, {
    paragraphFormat: {
      N: "Normal",
      H1: "Heading 1",
      H2: "Heading 2",
      H3: "Heading 3",
      H4: "Heading 4",
      PRE: "Code"
    },
    paragraphFormatSelection: !1,
    paragraphDefaultSelection: "Paragraph Format"
  }), g.FE.PLUGINS.paragraphFormat = function (h) {
    function f(a, e) {
      var t = h.html.defaultTag();
      if (e && e.toLowerCase() != t) if (0 < a.find("ul, ol").length) {
        var r = g("<" + e + ">");
        a.prepend(r);

        for (var n = h.node.contents(a.get(0))[0]; n && ["UL", "OL"].indexOf(n.tagName) < 0;) {
          var o = n.nextSibling;
          r.append(n), n = o;
        }
      } else a.html("<" + e + ">" + a.html() + "</" + e + ">");
    }

    return {
      apply: function (a) {
        "N" == a && (a = h.html.defaultTag()), h.selection.save(), h.html.wrap(!0, !0, !h.opts.paragraphFormat.BLOCKQUOTE, !0, !0), h.selection.restore();
        var e,
            t,
            r,
            n,
            o,
            i,
            p,
            l,
            s = h.selection.blocks();
        h.selection.save(), h.$el.find("pre").attr("skip", !0);

        for (var d = 0; d < s.length; d++) if (s[d].tagName != a && !h.node.isList(s[d])) {
          var m = g(s[d]);
          "LI" == s[d].tagName ? f(m, a) : "LI" == s[d].parentNode.tagName && s[d] ? (i = m, p = a, l = h.html.defaultTag(), p && p.toLowerCase() != l || (p = 'div class="fr-temp-div"'), i.replaceWith(g("<" + p + ">").html(i.html()))) : 0 <= ["TD", "TH"].indexOf(s[d].parentNode.tagName) ? (r = m, n = a, o = h.html.defaultTag(), n || (n = 'div class="fr-temp-div"' + (h.node.isEmpty(r.get(0), !0) ? ' data-empty="true"' : "")), n.toLowerCase() == o ? (h.node.isEmpty(r.get(0), !0) || r.append("<br/>"), r.replaceWith(r.html())) : r.replaceWith(g("<" + n + ">").html(r.html()))) : (e = m, (t = a) || (t = 'div class="fr-temp-div"' + (h.node.isEmpty(e.get(0), !0) ? ' data-empty="true"' : "")), e.replaceWith(g("<" + t + " " + h.node.attributes(e.get(0)) + ">").html(e.html()).removeAttr("data-empty")));
        }

        h.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function () {
          g(this).prev().append("<br>" + g(this).html()), g(this).remove();
        }), h.$el.find("pre").removeAttr("skip"), h.html.unwrap(), h.selection.restore();
      },
      refreshOnShow: function (a, e) {
        var t = h.selection.blocks();

        if (t.length) {
          var r = t[0],
              n = "N",
              o = h.html.defaultTag();
          r.tagName.toLowerCase() != o && r != h.el && (n = r.tagName), e.find('.fr-command[data-param1="' + n + '"]').addClass("fr-active").attr("aria-selected", !0);
        } else e.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0);
      },
      refresh: function (a) {
        if (h.opts.paragraphFormatSelection) {
          var e = h.selection.blocks();

          if (e.length) {
            var t = e[0],
                r = "N",
                n = h.html.defaultTag();
            t.tagName.toLowerCase() != n && t != h.el && (r = t.tagName), 0 <= ["LI", "TD", "TH"].indexOf(r) && (r = "N"), a.find("> span").text(h.language.translate(h.opts.paragraphFormat[r]));
          } else a.find("> span").text(h.language.translate(h.opts.paragraphFormat.N));
        }
      }
    };
  }, g.FE.RegisterCommand("paragraphFormat", {
    type: "dropdown",
    displaySelection: function (a) {
      return a.opts.paragraphFormatSelection;
    },
    defaultSelection: function (a) {
      return a.language.translate(a.opts.paragraphDefaultSelection);
    },
    displaySelectionWidth: 125,
    html: function () {
      var a = '<ul class="fr-dropdown-list" role="presentation">',
          e = this.opts.paragraphFormat;

      for (var t in e) if (e.hasOwnProperty(t)) {
        var r = this.shortcuts.get("paragraphFormat." + t);
        r = r ? '<span class="fr-shortcut">' + r + "</span>" : "", a += '<li role="presentation"><' + ("N" == t ? this.html.defaultTag() || "DIV" : t) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + t + '" title="' + this.language.translate(e[t]) + '">' + this.language.translate(e[t]) + "</a></" + ("N" == t ? this.html.defaultTag() || "DIV" : t) + "></li>";
      }

      return a += "</ul>";
    },
    title: "Paragraph Format",
    callback: function (a, e) {
      this.paragraphFormat.apply(e);
    },
    refresh: function (a) {
      this.paragraphFormat.refresh(a);
    },
    refreshOnShow: function (a, e) {
      this.paragraphFormat.refreshOnShow(a, e);
    },
    plugin: "paragraphFormat"
  }), g.FE.DefineIcon("paragraphFormat", {
    NAME: "paragraph"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/paragraph_style.min.js":
/*!*************************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/paragraph_style.min.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (i) {
  i.extend(i.FE.DEFAULTS, {
    paragraphStyles: {
      "fr-text-gray": "Gray",
      "fr-text-bordered": "Bordered",
      "fr-text-spaced": "Spaced",
      "fr-text-uppercase": "Uppercase"
    },
    paragraphMultipleStyles: !0
  }), i.FE.PLUGINS.paragraphStyle = function (o) {
    return {
      _init: function () {},
      apply: function (e, a, t) {
        void 0 === a && (a = o.opts.paragraphStyles), void 0 === t && (t = o.opts.paragraphMultipleStyles);
        var r = "";
        t || ((r = Object.keys(a)).splice(r.indexOf(e), 1), r = r.join(" ")), o.selection.save(), o.html.wrap(!0, !0, !0, !0), o.selection.restore();
        var n = o.selection.blocks();
        o.selection.save();

        for (var s = i(n[0]).hasClass(e), l = 0; l < n.length; l++) i(n[l]).removeClass(r).toggleClass(e, !s), i(n[l]).hasClass("fr-temp-div") && i(n[l]).removeClass("fr-temp-div"), "" === i(n[l]).attr("class") && i(n[l]).removeAttr("class");

        o.html.unwrap(), o.selection.restore();
      },
      refreshOnShow: function (e, a) {
        var t = o.selection.blocks();

        if (t.length) {
          var r = i(t[0]);
          a.find(".fr-command").each(function () {
            var e = i(this).data("param1"),
                a = r.hasClass(e);
            i(this).toggleClass("fr-active", a).attr("aria-selected", a);
          });
        }
      }
    };
  }, i.FE.RegisterCommand("paragraphStyle", {
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          a = this.opts.paragraphStyles;

      for (var t in a) a.hasOwnProperty(t) && (e += '<li role="presentation"><a class="fr-command ' + t + '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="' + t + '" title="' + this.language.translate(a[t]) + '">' + this.language.translate(a[t]) + "</a></li>");

      return e += "</ul>";
    },
    title: "Paragraph Style",
    callback: function (e, a) {
      this.paragraphStyle.apply(a);
    },
    refreshOnShow: function (e, a) {
      this.paragraphStyle.refreshOnShow(e, a);
    },
    plugin: "paragraphStyle"
  }), i.FE.DefineIcon("paragraphStyle", {
    NAME: "magic"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/print.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/print.min.js ***!
  \***************************************************************/
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
}(function (e) {
  e.extend(e.FE.DEFAULTS, {
    html2pdf: window.html2pdf
  }), e.FE.PLUGINS.print = function (l) {
    return {
      run: function () {
        !function (e) {
          var t = l.$el.html(),
              n = null;
          l.shared.print_iframe ? n = l.shared.print_iframe : ((n = document.createElement("iframe")).name = "fr-print", n.style.position = "fixed", n.style.top = "0", n.style.left = "-9999px", n.style.height = "100%", n.style.width = "0", n.style.overflow = "hidden", n.style["z-index"] = "2147483647", n.style.tabIndex = "-1", l.events.on("shared.destroy", function () {
            n.remove();
          }), l.shared.print_iframe = n);

          try {
            document.body.removeChild(n);
          } catch (d) {}

          document.body.appendChild(n);

          var i = function () {
            e(), n.removeEventListener("load", i);
          };

          n.addEventListener("load", i);
          var o = n.contentWindow;
          o.document.open(), o.document.write("<!DOCTYPE html><html " + (l.opts.documentReady ? 'style="margin: 0; padding: 0;"' : "") + "><head><title>" + document.title + "</title>"), Array.prototype.forEach.call(document.querySelectorAll("style"), function (e) {
            e = e.cloneNode(!0), o.document.write(e.outerHTML);
          });
          var r = document.querySelectorAll("link[rel=stylesheet]");
          Array.prototype.forEach.call(r, function (e) {
            var t = document.createElement("link");
            t.rel = e.rel, t.href = e.href, t.media = "print", t.type = "text/css", t.media = "all", o.document.write(t.outerHTML);
          }), o.document.write('</head><body style="text-align: ' + ("rtl" == l.opts.direction ? "right" : "left") + "; direction: " + l.opts.direction + "; " + (l.opts.documentReady ? " padding: 2cm; width: 17cm; margin: 0;" : "") + '"><div class="fr-view">'), o.document.write(t), o.document.write("</div></body></html>"), o.document.close();
        }(function () {
          setTimeout(function () {
            l.events.disableBlur(), window.frames["fr-print"].focus(), window.frames["fr-print"].print(), l.$win.get(0).focus(), l.events.disableBlur(), l.events.focus();
          }, 0);
        });
      },
      toPDF: function () {
        l.opts.html2pdf && (l.$el.css("text-align", "left"), l.opts.html2pdf().set({
          margin: [10, 20],
          html2canvas: {
            useCORS: !0
          }
        }).from(l.el).save(), setTimeout(function () {
          l.$el.css("text-align", "");
        }, 100));
      }
    };
  }, e.FE.DefineIcon("print", {
    NAME: "print"
  }), e.FE.RegisterCommand("print", {
    title: "Print",
    undo: !1,
    focus: !1,
    plugin: "print",
    callback: function () {
      this.print.run();
    }
  }), e.FE.DefineIcon("getPDF", {
    NAME: "file-pdf-o",
    FA5NAME: "file-pdf"
  }), e.FE.RegisterCommand("getPDF", {
    title: "Download PDF",
    type: "button",
    focus: !1,
    undo: !1,
    callback: function () {
      this.print.toPDF();
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/quick_insert.min.js":
/*!**********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/quick_insert.min.js ***!
  \**********************************************************************/
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
}(function (d) {
  d.extend(d.FE.DEFAULTS, {
    quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"],
    quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"],
    quickInsertEnabled: !0
  }), d.FE.QUICK_INSERT_BUTTONS = {}, d.FE.DefineIcon("quickInsert", {
    PATH: '<path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/>',
    template: "svg"
  }), d.FE.RegisterQuickInsertButton = function (e, t) {
    d.FE.QUICK_INSERT_BUTTONS[e] = d.extend({
      undo: !0
    }, t);
  }, d.FE.RegisterQuickInsertButton("image", {
    icon: "insertImage",
    requiredPlugin: "image",
    title: "Insert Image",
    undo: !1,
    callback: function () {
      var e = this;
      e.shared.$qi_image_input || (e.shared.$qi_image_input = d('<input accept="image/*" name="quickInsertImage' + this.id + '" style="display: none;" type="file">'), d("body:first").append(e.shared.$qi_image_input), e.events.$on(e.shared.$qi_image_input, "change", function () {
        var e = d(this).data("inst");
        this.files && (e.quickInsert.hide(), e.image.upload(this.files)), d(this).val("");
      }, !0)), e.$qi_image_input = e.shared.$qi_image_input, e.helpers.isMobile() && e.selection.save(), e.events.disableBlur(), e.$qi_image_input.data("inst", e).trigger("click");
    }
  }), d.FE.RegisterQuickInsertButton("video", {
    icon: "insertVideo",
    requiredPlugin: "video",
    title: "Insert Video",
    undo: !1,
    callback: function () {
      var e = prompt(this.language.translate("Paste the URL of the video you want to insert."));
      e && this.video.insertByURL(e);
    }
  }), d.FE.RegisterQuickInsertButton("embedly", {
    icon: "embedly",
    requiredPlugin: "embedly",
    title: "Embed URL",
    undo: !1,
    callback: function () {
      var e = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
      e && this.embedly.add(e);
    }
  }), d.FE.RegisterQuickInsertButton("table", {
    icon: "insertTable",
    requiredPlugin: "table",
    title: "Insert Table",
    callback: function () {
      this.table.insert(2, 2);
    }
  }), d.FE.RegisterQuickInsertButton("ol", {
    icon: "formatOL",
    requiredPlugin: "lists",
    title: "Ordered List",
    callback: function () {
      this.lists.format("OL");
    }
  }), d.FE.RegisterQuickInsertButton("ul", {
    icon: "formatUL",
    requiredPlugin: "lists",
    title: "Unordered List",
    callback: function () {
      this.lists.format("UL");
    }
  }), d.FE.RegisterQuickInsertButton("hr", {
    icon: "insertHR",
    title: "Insert Horizontal Line",
    callback: function () {
      this.commands.insertHR();
    }
  }), d.FE.PLUGINS.quickInsert = function (o) {
    var a, l;

    function t(e) {
      var t, i, n;
      t = e.offset().top - o.$box.offset().top, i = 0 - a.outerWidth(), o.opts.enter != d.FE.ENTER_BR ? n = (a.outerHeight() - e.outerHeight()) / 2 : (d("<span>" + d.FE.INVISIBLE_SPACE + "</span>").insertAfter(e), n = (a.outerHeight() - e.next().outerHeight()) / 2, e.next().remove()), o.opts.iframe && (t += o.$iframe.offset().top - o.helpers.scrollTop()), a.hasClass("fr-on") && 0 <= t && l.css("top", t - n), 0 <= t && t - n <= o.$box.outerHeight() - e.outerHeight() ? (a.hasClass("fr-hidden") && (a.hasClass("fr-on") && r(), a.removeClass("fr-hidden")), a.css("top", t - n)) : a.hasClass("fr-visible") && (a.addClass("fr-hidden"), u()), a.css("left", i);
    }

    function i(e) {
      a || function () {
        o.shared.$quick_insert || (o.shared.$quick_insert = d('<div class="fr-quick-insert"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + o.language.translate("Quick Insert") + '">' + o.icon.create("quickInsert") + "</a></div>"));
        a = o.shared.$quick_insert, o.tooltip.bind(o.$box, ".fr-quick-insert > a.fr-floating-btn"), o.events.on("destroy", function () {
          a.removeClass("fr-on").appendTo(d("body:first")).css("left", -9999).css("top", -9999), l && (u(), l.appendTo(d("body:first")));
        }, !0), o.events.on("shared.destroy", function () {
          a.html("").removeData().remove(), a = null, l && (l.html("").removeData().remove(), l = null);
        }, !0), o.events.on("commands.before", s), o.events.on("commands.after", function () {
          o.popups.areVisible() || n();
        }), o.events.bindClick(o.$box, ".fr-quick-insert > a", r), o.events.bindClick(o.$box, ".fr-qi-helper > a.fr-btn", function (e) {
          var t = d(e.currentTarget).data("cmd");
          if (!1 === o.events.trigger("quickInsert.commands.before", [t])) return !1;
          d.FE.QUICK_INSERT_BUTTONS[t].callback.apply(o, [e.currentTarget]), d.FE.QUICK_INSERT_BUTTONS[t].undo && o.undo.saveStep(), o.events.trigger("quickInsert.commands.after", [t]), o.quickInsert.hide();
        }), o.events.$on(o.$wp, "scroll", function () {
          a.hasClass("fr-visible") && t(a.data("tag"));
        });
      }(), a.hasClass("fr-on") && u(), o.$box.append(a), t(e), a.data("tag", e), a.addClass("fr-visible");
    }

    function n() {
      if (o.core.hasFocus()) {
        var e = o.selection.element();

        if (o.opts.enter == d.FE.ENTER_BR || o.node.isBlock(e) || (e = o.node.blockParent(e)), o.opts.enter == d.FE.ENTER_BR && !o.node.isBlock(e)) {
          var t = o.node.deepestParent(e);
          t && (e = t);
        }

        e && (o.opts.enter != d.FE.ENTER_BR && o.node.isEmpty(e) && 0 <= o.opts.quickInsertTags.indexOf(e.tagName.toLowerCase()) || o.opts.enter == d.FE.ENTER_BR && ("BR" == e.tagName && (!e.previousSibling || "BR" == e.previousSibling.tagName || o.node.isBlock(e.previousSibling)) || o.node.isEmpty(e) && (!e.previousSibling || "BR" == e.previousSibling.tagName || o.node.isBlock(e.previousSibling)) && (!e.nextSibling || "BR" == e.nextSibling.tagName || o.node.isBlock(e.nextSibling)))) ? a && a.data("tag").is(d(e)) && a.hasClass("fr-on") ? u() : o.selection.isCollapsed() && i(d(e)) : s();
      }
    }

    function s() {
      a && (a.hasClass("fr-on") && u(), a.removeClass("fr-visible fr-on"), a.css("left", -9999).css("top", -9999));
    }

    function r(e) {
      if (e && e.preventDefault(), a.hasClass("fr-on") && !a.hasClass("fr-hidden")) u();else {
        if (!o.shared.$qi_helper) {
          for (var t = o.opts.quickInsertButtons, i = '<div class="fr-qi-helper">', n = 0, s = 0; s < t.length; s++) {
            var r = d.FE.QUICK_INSERT_BUTTONS[t[s]];
            r && (!r.requiredPlugin || d.FE.PLUGINS[r.requiredPlugin] && 0 <= o.opts.pluginsEnabled.indexOf(r.requiredPlugin)) && (i += '<a class="fr-btn fr-floating-btn" role="button" title="' + o.language.translate(r.title) + '" tabIndex="-1" data-cmd="' + t[s] + '" style="transition-delay: ' + .025 * n++ + 's;">' + o.icon.create(r.icon) + "</a>");
          }

          i += "</div>", o.shared.$qi_helper = d(i), o.tooltip.bind(o.shared.$qi_helper, "> a.fr-btn"), o.events.$on(o.shared.$qi_helper, "mousedown", function (e) {
            e.preventDefault();
          }, !0);
        }

        (l = o.shared.$qi_helper).appendTo(o.$box), setTimeout(function () {
          l.css("top", parseFloat(a.css("top"))), l.css("left", parseFloat(a.css("left")) + a.outerWidth()), l.find("a").addClass("fr-size-1"), a.addClass("fr-on");
        }, 10);
      }
    }

    function u() {
      var e = o.$box.find(".fr-qi-helper");
      e.length && (e.find("a").removeClass("fr-size-1"), e.css("left", -9999), a.hasClass("fr-hidden") || a.removeClass("fr-on"));
    }

    return {
      _init: function () {
        if (!o.$wp || !o.opts.quickInsertEnabled) return !1;
        o.popups.onShow("image.edit", s), o.events.on("mouseup", n), o.helpers.isMobile() && o.events.$on(d(o.o_doc), "selectionchange", n), o.events.on("blur", s), o.events.on("keyup", n), o.events.on("keydown", function () {
          setTimeout(function () {
            n();
          }, 0);
        });
      },
      hide: s
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/quote.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/quote.min.js ***!
  \***************************************************************/
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
}(function (i) {
  i.FE.PLUGINS.quote = function (r) {
    function o(e) {
      for (; e.parentNode && e.parentNode != r.el;) e = e.parentNode;

      return e;
    }

    return {
      apply: function (e) {
        r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore(), "increase" == e ? function () {
          var e,
              t = r.selection.blocks();

          for (e = 0; e < t.length; e++) t[e] = o(t[e]);

          r.selection.save();
          var n = i("<blockquote>");

          for (n.insertBefore(t[0]), e = 0; e < t.length; e++) n.append(t[e]);

          r.html.unwrap(), r.selection.restore();
        }() : "decrease" == e && function () {
          var e,
              t = r.selection.blocks();

          for (e = 0; e < t.length; e++) "BLOCKQUOTE" != t[e].tagName && (t[e] = i(t[e]).parentsUntil(r.$el, "BLOCKQUOTE").get(0));

          for (r.selection.save(), e = 0; e < t.length; e++) t[e] && i(t[e]).replaceWith(t[e].innerHTML);

          r.html.unwrap(), r.selection.restore();
        }();
      }
    };
  }, i.FE.RegisterShortcut(i.FE.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), i.FE.RegisterShortcut(i.FE.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), i.FE.RegisterCommand("quote", {
    title: "Quote",
    type: "dropdown",
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = {
        increase: "Increase",
        decrease: "Decrease"
      };

      for (var n in t) if (t.hasOwnProperty(n)) {
        var r = this.shortcuts.get("quote." + n);
        e += '<li role="presentation"><a class="fr-command fr-title fr-active ' + n + '" tabIndex="-1" role="option" data-cmd="quote" data-param1="' + n + '" title="' + t[n] + " (" + r + ')">' + this.language.translate(t[n]) + "</a></li>";
      }

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.quote.apply(t);
    },
    plugin: "quote"
  }), i.FE.DefineIcon("quote", {
    NAME: "quote-left"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/save.min.js":
/*!**************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/save.min.js ***!
  \**************************************************************/
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
}(function (l) {
  l.extend(l.FE.DEFAULTS, {
    saveInterval: 1e4,
    saveURL: null,
    saveParams: {},
    saveParam: "body",
    saveMethod: "POST"
  }), l.FE.PLUGINS.save = function (i) {
    var e = null,
        u = null,
        t = !1,
        v = 1,
        f = 2,
        n = {};

    function d(e, t) {
      i.events.trigger("save.error", [{
        code: e,
        message: n[e]
      }, t]);
    }

    function s(e) {
      void 0 === e && (e = i.html.get());
      var t = e,
          n = i.events.trigger("save.before", [e]);
      if (!1 === n) return !1;

      if ("string" == typeof n && (e = n), i.opts.saveURL) {
        var s = {};

        for (var o in i.opts.saveParams) if (i.opts.saveParams.hasOwnProperty(o)) {
          var a = i.opts.saveParams[o];
          s[o] = "function" == typeof a ? a.call(this) : a;
        }

        var r = {};
        r[i.opts.saveParam] = e, l.ajax({
          type: i.opts.saveMethod,
          url: i.opts.saveURL,
          data: l.extend(r, s),
          crossDomain: i.opts.requestWithCORS,
          xhrFields: {
            withCredentials: i.opts.requestWithCredentials
          },
          headers: i.opts.requestHeaders
        }).done(function (e) {
          u = t, i.events.trigger("save.after", [e]);
        }).fail(function (e) {
          d(f, e.response || e.responseText);
        });
      } else d(v);
    }

    function o() {
      clearTimeout(e), e = setTimeout(function () {
        var e = i.html.get();
        (u != e || t) && (t = !1, s(u = e));
      }, i.opts.saveInterval);
    }

    return n[v] = "Missing saveURL option.", n[f] = "Something went wrong during save.", {
      _init: function () {
        i.opts.saveInterval && (u = i.html.get(), i.events.on("contentChanged", o), i.events.on("keydown destroy", function () {
          clearTimeout(e);
        }));
      },
      save: s,
      reset: function () {
        o(), t = !1;
      },
      force: function () {
        t = !0;
      }
    };
  }, l.FE.DefineIcon("save", {
    NAME: "floppy-o",
    FA5NAME: "save"
  }), l.FE.RegisterCommand("save", {
    title: "Save",
    undo: !1,
    focus: !1,
    refreshAfterCallback: !1,
    callback: function () {
      this.save.save();
    },
    plugin: "save"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/special_characters.min.js":
/*!****************************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/special_characters.min.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (T) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (T),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (s) {
  s.extend(s.FE.DEFAULTS, {
    specialCharactersSets: [{
      title: "Latin",
      list: [{
        "char": "&iexcl;",
        desc: "INVERTED EXCLAMATION MARK"
      }, {
        "char": "&cent;",
        desc: "CENT SIGN"
      }, {
        "char": "&pound;",
        desc: "POUND SIGN"
      }, {
        "char": "&curren;",
        desc: "CURRENCY SIGN"
      }, {
        "char": "&yen;",
        desc: "YEN SIGN"
      }, {
        "char": "&brvbar;",
        desc: "BROKEN BAR"
      }, {
        "char": "&sect;",
        desc: "SECTION SIGN"
      }, {
        "char": "&uml;",
        desc: "DIAERESIS"
      }, {
        "char": "&copy;",
        desc: "COPYRIGHT SIGN"
      }, {
        "char": "&trade;",
        desc: "TRADEMARK SIGN"
      }, {
        "char": "&ordf;",
        desc: "FEMININE ORDINAL INDICATOR"
      }, {
        "char": "&laquo;",
        desc: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"
      }, {
        "char": "&not;",
        desc: "NOT SIGN"
      }, {
        "char": "&reg;",
        desc: "REGISTERED SIGN"
      }, {
        "char": "&macr;",
        desc: "MACRON"
      }, {
        "char": "&deg;",
        desc: "DEGREE SIGN"
      }, {
        "char": "&plusmn;",
        desc: "PLUS-MINUS SIGN"
      }, {
        "char": "&sup2;",
        desc: "SUPERSCRIPT TWO"
      }, {
        "char": "&sup3;",
        desc: "SUPERSCRIPT THREE"
      }, {
        "char": "&acute;",
        desc: "ACUTE ACCENT"
      }, {
        "char": "&micro;",
        desc: "MICRO SIGN"
      }, {
        "char": "&para;",
        desc: "PILCROW SIGN"
      }, {
        "char": "&middot;",
        desc: "MIDDLE DOT"
      }, {
        "char": "&cedil;",
        desc: "CEDILLA"
      }, {
        "char": "&sup1;",
        desc: "SUPERSCRIPT ONE"
      }, {
        "char": "&ordm;",
        desc: "MASCULINE ORDINAL INDICATOR"
      }, {
        "char": "&raquo;",
        desc: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK"
      }, {
        "char": "&frac14;",
        desc: "VULGAR FRACTION ONE QUARTER"
      }, {
        "char": "&frac12;",
        desc: "VULGAR FRACTION ONE HALF"
      }, {
        "char": "&frac34;",
        desc: "VULGAR FRACTION THREE QUARTERS"
      }, {
        "char": "&iquest;",
        desc: "INVERTED QUESTION MARK"
      }, {
        "char": "&Agrave;",
        desc: "LATIN CAPITAL LETTER A WITH GRAVE"
      }, {
        "char": "&Aacute;",
        desc: "LATIN CAPITAL LETTER A WITH ACUTE"
      }, {
        "char": "&Acirc;",
        desc: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX"
      }, {
        "char": "&Atilde;",
        desc: "LATIN CAPITAL LETTER A WITH TILDE"
      }, {
        "char": "&Auml;",
        desc: "LATIN CAPITAL LETTER A WITH DIAERESIS "
      }, {
        "char": "&Aring;",
        desc: "LATIN CAPITAL LETTER A WITH RING ABOVE"
      }, {
        "char": "&AElig;",
        desc: "LATIN CAPITAL LETTER AE"
      }, {
        "char": "&Ccedil;",
        desc: "LATIN CAPITAL LETTER C WITH CEDILLA"
      }, {
        "char": "&Egrave;",
        desc: "LATIN CAPITAL LETTER E WITH GRAVE"
      }, {
        "char": "&Eacute;",
        desc: "LATIN CAPITAL LETTER E WITH ACUTE"
      }, {
        "char": "&Ecirc;",
        desc: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX"
      }, {
        "char": "&Euml;",
        desc: "LATIN CAPITAL LETTER E WITH DIAERESIS"
      }, {
        "char": "&Igrave;",
        desc: "LATIN CAPITAL LETTER I WITH GRAVE"
      }, {
        "char": "&Iacute;",
        desc: "LATIN CAPITAL LETTER I WITH ACUTE"
      }, {
        "char": "&Icirc;",
        desc: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX"
      }, {
        "char": "&Iuml;",
        desc: "LATIN CAPITAL LETTER I WITH DIAERESIS"
      }, {
        "char": "&ETH;",
        desc: "LATIN CAPITAL LETTER ETH"
      }, {
        "char": "&Ntilde;",
        desc: "LATIN CAPITAL LETTER N WITH TILDE"
      }, {
        "char": "&Ograve;",
        desc: "LATIN CAPITAL LETTER O WITH GRAVE"
      }, {
        "char": "&Oacute;",
        desc: "LATIN CAPITAL LETTER O WITH ACUTE"
      }, {
        "char": "&Ocirc;",
        desc: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX"
      }, {
        "char": "&Otilde;",
        desc: "LATIN CAPITAL LETTER O WITH TILDE"
      }, {
        "char": "&Ouml;",
        desc: "LATIN CAPITAL LETTER O WITH DIAERESIS"
      }, {
        "char": "&times;",
        desc: "MULTIPLICATION SIGN"
      }, {
        "char": "&Oslash;",
        desc: "LATIN CAPITAL LETTER O WITH STROKE"
      }, {
        "char": "&Ugrave;",
        desc: "LATIN CAPITAL LETTER U WITH GRAVE"
      }, {
        "char": "&Uacute;",
        desc: "LATIN CAPITAL LETTER U WITH ACUTE"
      }, {
        "char": "&Ucirc;",
        desc: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX"
      }, {
        "char": "&Uuml;",
        desc: "LATIN CAPITAL LETTER U WITH DIAERESIS"
      }, {
        "char": "&Yacute;",
        desc: "LATIN CAPITAL LETTER Y WITH ACUTE"
      }, {
        "char": "&THORN;",
        desc: "LATIN CAPITAL LETTER THORN"
      }, {
        "char": "&szlig;",
        desc: "LATIN SMALL LETTER SHARP S"
      }, {
        "char": "&agrave;",
        desc: "LATIN SMALL LETTER A WITH GRAVE"
      }, {
        "char": "&aacute;",
        desc: "LATIN SMALL LETTER A WITH ACUTE "
      }, {
        "char": "&acirc;",
        desc: "LATIN SMALL LETTER A WITH CIRCUMFLEX"
      }, {
        "char": "&atilde;",
        desc: "LATIN SMALL LETTER A WITH TILDE"
      }, {
        "char": "&auml;",
        desc: "LATIN SMALL LETTER A WITH DIAERESIS"
      }, {
        "char": "&aring;",
        desc: "LATIN SMALL LETTER A WITH RING ABOVE"
      }, {
        "char": "&aelig;",
        desc: "LATIN SMALL LETTER AE"
      }, {
        "char": "&ccedil;",
        desc: "LATIN SMALL LETTER C WITH CEDILLA"
      }, {
        "char": "&egrave;",
        desc: "LATIN SMALL LETTER E WITH GRAVE"
      }, {
        "char": "&eacute;",
        desc: "LATIN SMALL LETTER E WITH ACUTE"
      }, {
        "char": "&ecirc;",
        desc: "LATIN SMALL LETTER E WITH CIRCUMFLEX"
      }, {
        "char": "&euml;",
        desc: "LATIN SMALL LETTER E WITH DIAERESIS"
      }, {
        "char": "&igrave;",
        desc: "LATIN SMALL LETTER I WITH GRAVE"
      }, {
        "char": "&iacute;",
        desc: "LATIN SMALL LETTER I WITH ACUTE"
      }, {
        "char": "&icirc;",
        desc: "LATIN SMALL LETTER I WITH CIRCUMFLEX"
      }, {
        "char": "&iuml;",
        desc: "LATIN SMALL LETTER I WITH DIAERESIS"
      }, {
        "char": "&eth;",
        desc: "LATIN SMALL LETTER ETH"
      }, {
        "char": "&ntilde;",
        desc: "LATIN SMALL LETTER N WITH TILDE"
      }, {
        "char": "&ograve;",
        desc: "LATIN SMALL LETTER O WITH GRAVE"
      }, {
        "char": "&oacute;",
        desc: "LATIN SMALL LETTER O WITH ACUTE"
      }, {
        "char": "&ocirc;",
        desc: "LATIN SMALL LETTER O WITH CIRCUMFLEX"
      }, {
        "char": "&otilde;",
        desc: "LATIN SMALL LETTER O WITH TILDE"
      }, {
        "char": "&ouml;",
        desc: "LATIN SMALL LETTER O WITH DIAERESIS"
      }, {
        "char": "&divide;",
        desc: "DIVISION SIGN"
      }, {
        "char": "&oslash;",
        desc: "LATIN SMALL LETTER O WITH STROKE"
      }, {
        "char": "&ugrave;",
        desc: "LATIN SMALL LETTER U WITH GRAVE"
      }, {
        "char": "&uacute;",
        desc: "LATIN SMALL LETTER U WITH ACUTE"
      }, {
        "char": "&ucirc;",
        desc: "LATIN SMALL LETTER U WITH CIRCUMFLEX"
      }, {
        "char": "&uuml;",
        desc: "LATIN SMALL LETTER U WITH DIAERESIS"
      }, {
        "char": "&yacute;",
        desc: "LATIN SMALL LETTER Y WITH ACUTE"
      }, {
        "char": "&thorn;",
        desc: "LATIN SMALL LETTER THORN"
      }, {
        "char": "&yuml;",
        desc: "LATIN SMALL LETTER Y WITH DIAERESIS"
      }]
    }, {
      title: "Greek",
      list: [{
        "char": "&Alpha;",
        desc: "GREEK CAPITAL LETTER ALPHA"
      }, {
        "char": "&Beta;",
        desc: "GREEK CAPITAL LETTER BETA"
      }, {
        "char": "&Gamma;",
        desc: "GREEK CAPITAL LETTER GAMMA"
      }, {
        "char": "&Delta;",
        desc: "GREEK CAPITAL LETTER DELTA"
      }, {
        "char": "&Epsilon;",
        desc: "GREEK CAPITAL LETTER EPSILON"
      }, {
        "char": "&Zeta;",
        desc: "GREEK CAPITAL LETTER ZETA"
      }, {
        "char": "&Eta;",
        desc: "GREEK CAPITAL LETTER ETA"
      }, {
        "char": "&Theta;",
        desc: "GREEK CAPITAL LETTER THETA"
      }, {
        "char": "&Iota;",
        desc: "GREEK CAPITAL LETTER IOTA"
      }, {
        "char": "&Kappa;",
        desc: "GREEK CAPITAL LETTER KAPPA"
      }, {
        "char": "&Lambda;",
        desc: "GREEK CAPITAL LETTER LAMBDA"
      }, {
        "char": "&Mu;",
        desc: "GREEK CAPITAL LETTER MU"
      }, {
        "char": "&Nu;",
        desc: "GREEK CAPITAL LETTER NU"
      }, {
        "char": "&Xi;",
        desc: "GREEK CAPITAL LETTER XI"
      }, {
        "char": "&Omicron;",
        desc: "GREEK CAPITAL LETTER OMICRON"
      }, {
        "char": "&Pi;",
        desc: "GREEK CAPITAL LETTER PI"
      }, {
        "char": "&Rho;",
        desc: "GREEK CAPITAL LETTER RHO"
      }, {
        "char": "&Sigma;",
        desc: "GREEK CAPITAL LETTER SIGMA"
      }, {
        "char": "&Tau;",
        desc: "GREEK CAPITAL LETTER TAU"
      }, {
        "char": "&Upsilon;",
        desc: "GREEK CAPITAL LETTER UPSILON"
      }, {
        "char": "&Phi;",
        desc: "GREEK CAPITAL LETTER PHI"
      }, {
        "char": "&Chi;",
        desc: "GREEK CAPITAL LETTER CHI"
      }, {
        "char": "&Psi;",
        desc: "GREEK CAPITAL LETTER PSI"
      }, {
        "char": "&Omega;",
        desc: "GREEK CAPITAL LETTER OMEGA"
      }, {
        "char": "&alpha;",
        desc: "GREEK SMALL LETTER ALPHA"
      }, {
        "char": "&beta;",
        desc: "GREEK SMALL LETTER BETA"
      }, {
        "char": "&gamma;",
        desc: "GREEK SMALL LETTER GAMMA"
      }, {
        "char": "&delta;",
        desc: "GREEK SMALL LETTER DELTA"
      }, {
        "char": "&epsilon;",
        desc: "GREEK SMALL LETTER EPSILON"
      }, {
        "char": "&zeta;",
        desc: "GREEK SMALL LETTER ZETA"
      }, {
        "char": "&eta;",
        desc: "GREEK SMALL LETTER ETA"
      }, {
        "char": "&theta;",
        desc: "GREEK SMALL LETTER THETA"
      }, {
        "char": "&iota;",
        desc: "GREEK SMALL LETTER IOTA"
      }, {
        "char": "&kappa;",
        desc: "GREEK SMALL LETTER KAPPA"
      }, {
        "char": "&lambda;",
        desc: "GREEK SMALL LETTER LAMBDA"
      }, {
        "char": "&mu;",
        desc: "GREEK SMALL LETTER MU"
      }, {
        "char": "&nu;",
        desc: "GREEK SMALL LETTER NU"
      }, {
        "char": "&xi;",
        desc: "GREEK SMALL LETTER XI"
      }, {
        "char": "&omicron;",
        desc: "GREEK SMALL LETTER OMICRON"
      }, {
        "char": "&pi;",
        desc: "GREEK SMALL LETTER PI"
      }, {
        "char": "&rho;",
        desc: "GREEK SMALL LETTER RHO"
      }, {
        "char": "&sigmaf;",
        desc: "GREEK SMALL LETTER FINAL SIGMA"
      }, {
        "char": "&sigma;",
        desc: "GREEK SMALL LETTER SIGMA"
      }, {
        "char": "&tau;",
        desc: "GREEK SMALL LETTER TAU"
      }, {
        "char": "&upsilon;",
        desc: "GREEK SMALL LETTER UPSILON"
      }, {
        "char": "&phi;",
        desc: "GREEK SMALL LETTER PHI"
      }, {
        "char": "&chi;",
        desc: "GREEK SMALL LETTER CHI"
      }, {
        "char": "&psi;",
        desc: "GREEK SMALL LETTER PSI"
      }, {
        "char": "&omega;",
        desc: "GREEK SMALL LETTER OMEGA"
      }, {
        "char": "&thetasym;",
        desc: "GREEK THETA SYMBOL"
      }, {
        "char": "&upsih;",
        desc: "GREEK UPSILON WITH HOOK SYMBOL"
      }, {
        "char": "&straightphi;",
        desc: "GREEK PHI SYMBOL"
      }, {
        "char": "&piv;",
        desc: "GREEK PI SYMBOL"
      }, {
        "char": "&Gammad;",
        desc: "GREEK LETTER DIGAMMA"
      }, {
        "char": "&gammad;",
        desc: "GREEK SMALL LETTER DIGAMMA"
      }, {
        "char": "&varkappa;",
        desc: "GREEK KAPPA SYMBOL"
      }, {
        "char": "&varrho;",
        desc: "GREEK RHO SYMBOL"
      }, {
        "char": "&straightepsilon;",
        desc: "GREEK LUNATE EPSILON SYMBOL"
      }, {
        "char": "&backepsilon;",
        desc: "GREEK REVERSED LUNATE EPSILON SYMBOL"
      }]
    }, {
      title: "Cyrillic",
      list: [{
        "char": "&#x400",
        desc: "CYRILLIC CAPITAL LETTER IE WITH GRAVE"
      }, {
        "char": "&#x401",
        desc: "CYRILLIC CAPITAL LETTER IO"
      }, {
        "char": "&#x402",
        desc: "CYRILLIC CAPITAL LETTER DJE"
      }, {
        "char": "&#x403",
        desc: "CYRILLIC CAPITAL LETTER GJE"
      }, {
        "char": "&#x404",
        desc: "CYRILLIC CAPITAL LETTER UKRAINIAN IE"
      }, {
        "char": "&#x405",
        desc: "CYRILLIC CAPITAL LETTER DZE"
      }, {
        "char": "&#x406",
        desc: "CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I"
      }, {
        "char": "&#x407",
        desc: "CYRILLIC CAPITAL LETTER YI"
      }, {
        "char": "&#x408",
        desc: "CYRILLIC CAPITAL LETTER JE"
      }, {
        "char": "&#x409",
        desc: "CYRILLIC CAPITAL LETTER LJE"
      }, {
        "char": "&#x40A",
        desc: "CYRILLIC CAPITAL LETTER NJE"
      }, {
        "char": "&#x40B",
        desc: "CYRILLIC CAPITAL LETTER TSHE"
      }, {
        "char": "&#x40C",
        desc: "CYRILLIC CAPITAL LETTER KJE"
      }, {
        "char": "&#x40D",
        desc: "CYRILLIC CAPITAL LETTER I WITH GRAVE"
      }, {
        "char": "&#x40E",
        desc: "CYRILLIC CAPITAL LETTER SHORT U"
      }, {
        "char": "&#x40F",
        desc: "CYRILLIC CAPITAL LETTER DZHE"
      }, {
        "char": "&#x410",
        desc: "CYRILLIC CAPITAL LETTER A"
      }, {
        "char": "&#x411",
        desc: "CYRILLIC CAPITAL LETTER BE"
      }, {
        "char": "&#x412",
        desc: "CYRILLIC CAPITAL LETTER VE"
      }, {
        "char": "&#x413",
        desc: "CYRILLIC CAPITAL LETTER GHE"
      }, {
        "char": "&#x414",
        desc: "CYRILLIC CAPITAL LETTER DE"
      }, {
        "char": "&#x415",
        desc: "CYRILLIC CAPITAL LETTER IE"
      }, {
        "char": "&#x416",
        desc: "CYRILLIC CAPITAL LETTER ZHE"
      }, {
        "char": "&#x417",
        desc: "CYRILLIC CAPITAL LETTER ZE"
      }, {
        "char": "&#x418",
        desc: "CYRILLIC CAPITAL LETTER I"
      }, {
        "char": "&#x419",
        desc: "CYRILLIC CAPITAL LETTER SHORT I"
      }, {
        "char": "&#x41A",
        desc: "CYRILLIC CAPITAL LETTER KA"
      }, {
        "char": "&#x41B",
        desc: "CYRILLIC CAPITAL LETTER EL"
      }, {
        "char": "&#x41C",
        desc: "CYRILLIC CAPITAL LETTER EM"
      }, {
        "char": "&#x41D",
        desc: "CYRILLIC CAPITAL LETTER EN"
      }, {
        "char": "&#x41E",
        desc: "CYRILLIC CAPITAL LETTER O"
      }, {
        "char": "&#x41F",
        desc: "CYRILLIC CAPITAL LETTER PE"
      }, {
        "char": "&#x420",
        desc: "CYRILLIC CAPITAL LETTER ER"
      }, {
        "char": "&#x421",
        desc: "CYRILLIC CAPITAL LETTER ES"
      }, {
        "char": "&#x422",
        desc: "CYRILLIC CAPITAL LETTER TE"
      }, {
        "char": "&#x423",
        desc: "CYRILLIC CAPITAL LETTER U"
      }, {
        "char": "&#x424",
        desc: "CYRILLIC CAPITAL LETTER EF"
      }, {
        "char": "&#x425",
        desc: "CYRILLIC CAPITAL LETTER HA"
      }, {
        "char": "&#x426",
        desc: "CYRILLIC CAPITAL LETTER TSE"
      }, {
        "char": "&#x427",
        desc: "CYRILLIC CAPITAL LETTER CHE"
      }, {
        "char": "&#x428",
        desc: "CYRILLIC CAPITAL LETTER SHA"
      }, {
        "char": "&#x429",
        desc: "CYRILLIC CAPITAL LETTER SHCHA"
      }, {
        "char": "&#x42A",
        desc: "CYRILLIC CAPITAL LETTER HARD SIGN"
      }, {
        "char": "&#x42B",
        desc: "CYRILLIC CAPITAL LETTER YERU"
      }, {
        "char": "&#x42C",
        desc: "CYRILLIC CAPITAL LETTER SOFT SIGN"
      }, {
        "char": "&#x42D",
        desc: "CYRILLIC CAPITAL LETTER E"
      }, {
        "char": "&#x42E",
        desc: "CYRILLIC CAPITAL LETTER YU"
      }, {
        "char": "&#x42F",
        desc: "CYRILLIC CAPITAL LETTER YA"
      }, {
        "char": "&#x430",
        desc: "CYRILLIC SMALL LETTER A"
      }, {
        "char": "&#x431",
        desc: "CYRILLIC SMALL LETTER BE"
      }, {
        "char": "&#x432",
        desc: "CYRILLIC SMALL LETTER VE"
      }, {
        "char": "&#x433",
        desc: "CYRILLIC SMALL LETTER GHE"
      }, {
        "char": "&#x434",
        desc: "CYRILLIC SMALL LETTER DE"
      }, {
        "char": "&#x435",
        desc: "CYRILLIC SMALL LETTER IE"
      }, {
        "char": "&#x436",
        desc: "CYRILLIC SMALL LETTER ZHE"
      }, {
        "char": "&#x437",
        desc: "CYRILLIC SMALL LETTER ZE"
      }, {
        "char": "&#x438",
        desc: "CYRILLIC SMALL LETTER I"
      }, {
        "char": "&#x439",
        desc: "CYRILLIC SMALL LETTER SHORT I"
      }, {
        "char": "&#x43A",
        desc: "CYRILLIC SMALL LETTER KA"
      }, {
        "char": "&#x43B",
        desc: "CYRILLIC SMALL LETTER EL"
      }, {
        "char": "&#x43C",
        desc: "CYRILLIC SMALL LETTER EM"
      }, {
        "char": "&#x43D",
        desc: "CYRILLIC SMALL LETTER EN"
      }, {
        "char": "&#x43E",
        desc: "CYRILLIC SMALL LETTER O"
      }, {
        "char": "&#x43F",
        desc: "CYRILLIC SMALL LETTER PE"
      }, {
        "char": "&#x440",
        desc: "CYRILLIC SMALL LETTER ER"
      }, {
        "char": "&#x441",
        desc: "CYRILLIC SMALL LETTER ES"
      }, {
        "char": "&#x442",
        desc: "CYRILLIC SMALL LETTER TE"
      }, {
        "char": "&#x443",
        desc: "CYRILLIC SMALL LETTER U"
      }, {
        "char": "&#x444",
        desc: "CYRILLIC SMALL LETTER EF"
      }, {
        "char": "&#x445",
        desc: "CYRILLIC SMALL LETTER HA"
      }, {
        "char": "&#x446",
        desc: "CYRILLIC SMALL LETTER TSE"
      }, {
        "char": "&#x447",
        desc: "CYRILLIC SMALL LETTER CHE"
      }, {
        "char": "&#x448",
        desc: "CYRILLIC SMALL LETTER SHA"
      }, {
        "char": "&#x449",
        desc: "CYRILLIC SMALL LETTER SHCHA"
      }, {
        "char": "&#x44A",
        desc: "CYRILLIC SMALL LETTER HARD SIGN"
      }, {
        "char": "&#x44B",
        desc: "CYRILLIC SMALL LETTER YERU"
      }, {
        "char": "&#x44C",
        desc: "CYRILLIC SMALL LETTER SOFT SIGN"
      }, {
        "char": "&#x44D",
        desc: "CYRILLIC SMALL LETTER E"
      }, {
        "char": "&#x44E",
        desc: "CYRILLIC SMALL LETTER YU"
      }, {
        "char": "&#x44F",
        desc: "CYRILLIC SMALL LETTER YA"
      }, {
        "char": "&#x450",
        desc: "CYRILLIC SMALL LETTER IE WITH GRAVE"
      }, {
        "char": "&#x451",
        desc: "CYRILLIC SMALL LETTER IO"
      }, {
        "char": "&#x452",
        desc: "CYRILLIC SMALL LETTER DJE"
      }, {
        "char": "&#x453",
        desc: "CYRILLIC SMALL LETTER GJE"
      }, {
        "char": "&#x454",
        desc: "CYRILLIC SMALL LETTER UKRAINIAN IE"
      }, {
        "char": "&#x455",
        desc: "CYRILLIC SMALL LETTER DZE"
      }, {
        "char": "&#x456",
        desc: "CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I"
      }, {
        "char": "&#x457",
        desc: "CYRILLIC SMALL LETTER YI"
      }, {
        "char": "&#x458",
        desc: "CYRILLIC SMALL LETTER JE"
      }, {
        "char": "&#x459",
        desc: "CYRILLIC SMALL LETTER LJE"
      }, {
        "char": "&#x45A",
        desc: "CYRILLIC SMALL LETTER NJE"
      }, {
        "char": "&#x45B",
        desc: "CYRILLIC SMALL LETTER TSHE"
      }, {
        "char": "&#x45C",
        desc: "CYRILLIC SMALL LETTER KJE"
      }, {
        "char": "&#x45D",
        desc: "CYRILLIC SMALL LETTER I WITH GRAVE"
      }, {
        "char": "&#x45E",
        desc: "CYRILLIC SMALL LETTER SHORT U"
      }, {
        "char": "&#x45F",
        desc: "CYRILLIC SMALL LETTER DZHE"
      }]
    }, {
      title: "Punctuation",
      list: [{
        "char": "&ndash;",
        desc: "EN DASH"
      }, {
        "char": "&mdash;",
        desc: "EM DASH"
      }, {
        "char": "&lsquo;",
        desc: "LEFT SINGLE QUOTATION MARK"
      }, {
        "char": "&rsquo;",
        desc: "RIGHT SINGLE QUOTATION MARK"
      }, {
        "char": "&sbquo;",
        desc: "SINGLE LOW-9 QUOTATION MARK"
      }, {
        "char": "&ldquo;",
        desc: "LEFT DOUBLE QUOTATION MARK"
      }, {
        "char": "&rdquo;",
        desc: "RIGHT DOUBLE QUOTATION MARK"
      }, {
        "char": "&bdquo;",
        desc: "DOUBLE LOW-9 QUOTATION MARK"
      }, {
        "char": "&dagger;",
        desc: "DAGGER"
      }, {
        "char": "&Dagger;",
        desc: "DOUBLE DAGGER"
      }, {
        "char": "&bull;",
        desc: "BULLET"
      }, {
        "char": "&hellip;",
        desc: "HORIZONTAL ELLIPSIS"
      }, {
        "char": "&permil;",
        desc: "PER MILLE SIGN"
      }, {
        "char": "&prime;",
        desc: "PRIME"
      }, {
        "char": "&Prime;",
        desc: "DOUBLE PRIME"
      }, {
        "char": "&lsaquo;",
        desc: "SINGLE LEFT-POINTING ANGLE QUOTATION MARK"
      }, {
        "char": "&rsaquo;",
        desc: "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK"
      }, {
        "char": "&oline;",
        desc: "OVERLINE"
      }, {
        "char": "&frasl;",
        desc: "FRACTION SLASH"
      }]
    }, {
      title: "Currency",
      list: [{
        "char": "&#x20A0",
        desc: "EURO-CURRENCY SIGN"
      }, {
        "char": "&#x20A1",
        desc: "COLON SIGN"
      }, {
        "char": "&#x20A2",
        desc: "CRUZEIRO SIGN"
      }, {
        "char": "&#x20A3",
        desc: "FRENCH FRANC SIGN"
      }, {
        "char": "&#x20A4",
        desc: "LIRA SIGN"
      }, {
        "char": "&#x20A5",
        desc: "MILL SIGN"
      }, {
        "char": "&#x20A6",
        desc: "NAIRA SIGN"
      }, {
        "char": "&#x20A7",
        desc: "PESETA SIGN"
      }, {
        "char": "&#x20A8",
        desc: "RUPEE SIGN"
      }, {
        "char": "&#x20A9",
        desc: "WON SIGN"
      }, {
        "char": "&#x20AA",
        desc: "NEW SHEQEL SIGN"
      }, {
        "char": "&#x20AB",
        desc: "DONG SIGN"
      }, {
        "char": "&#x20AC",
        desc: "EURO SIGN"
      }, {
        "char": "&#x20AD",
        desc: "KIP SIGN"
      }, {
        "char": "&#x20AE",
        desc: "TUGRIK SIGN"
      }, {
        "char": "&#x20AF",
        desc: "DRACHMA SIGN"
      }, {
        "char": "&#x20B0",
        desc: "GERMAN PENNY SYMBOL"
      }, {
        "char": "&#x20B1",
        desc: "PESO SIGN"
      }, {
        "char": "&#x20B2",
        desc: "GUARANI SIGN"
      }, {
        "char": "&#x20B3",
        desc: "AUSTRAL SIGN"
      }, {
        "char": "&#x20B4",
        desc: "HRYVNIA SIGN"
      }, {
        "char": "&#x20B5",
        desc: "CEDI SIGN"
      }, {
        "char": "&#x20B6",
        desc: "LIVRE TOURNOIS SIGN"
      }, {
        "char": "&#x20B7",
        desc: "SPESMILO SIGN"
      }, {
        "char": "&#x20B8",
        desc: "TENGE SIGN"
      }, {
        "char": "&#x20B9",
        desc: "INDIAN RUPEE SIGN"
      }]
    }, {
      title: "Arrows",
      list: [{
        "char": "&#x2190",
        desc: "LEFTWARDS ARROW"
      }, {
        "char": "&#x2191",
        desc: "UPWARDS ARROW"
      }, {
        "char": "&#x2192",
        desc: "RIGHTWARDS ARROW"
      }, {
        "char": "&#x2193",
        desc: "DOWNWARDS ARROW"
      }, {
        "char": "&#x2194",
        desc: "LEFT RIGHT ARROW"
      }, {
        "char": "&#x2195",
        desc: "UP DOWN ARROW"
      }, {
        "char": "&#x2196",
        desc: "NORTH WEST ARROW"
      }, {
        "char": "&#x2197",
        desc: "NORTH EAST ARROW"
      }, {
        "char": "&#x2198",
        desc: "SOUTH EAST ARROW"
      }, {
        "char": "&#x2199",
        desc: "SOUTH WEST ARROW"
      }, {
        "char": "&#x219A",
        desc: "LEFTWARDS ARROW WITH STROKE"
      }, {
        "char": "&#x219B",
        desc: "RIGHTWARDS ARROW WITH STROKE"
      }, {
        "char": "&#x219C",
        desc: "LEFTWARDS WAVE ARROW"
      }, {
        "char": "&#x219D",
        desc: "RIGHTWARDS WAVE ARROW"
      }, {
        "char": "&#x219E",
        desc: "LEFTWARDS TWO HEADED ARROW"
      }, {
        "char": "&#x219F",
        desc: "UPWARDS TWO HEADED ARROW"
      }, {
        "char": "&#x21A0",
        desc: "RIGHTWARDS TWO HEADED ARROW"
      }, {
        "char": "&#x21A1",
        desc: "DOWNWARDS TWO HEADED ARROW"
      }, {
        "char": "&#x21A2",
        desc: "LEFTWARDS ARROW WITH TAIL"
      }, {
        "char": "&#x21A3",
        desc: "RIGHTWARDS ARROW WITH TAIL"
      }, {
        "char": "&#x21A4",
        desc: "LEFTWARDS ARROW FROM BAR"
      }, {
        "char": "&#x21A5",
        desc: "UPWARDS ARROW FROM BAR"
      }, {
        "char": "&#x21A6",
        desc: "RIGHTWARDS ARROW FROM BAR"
      }, {
        "char": "&#x21A7",
        desc: "DOWNWARDS ARROW FROM BAR"
      }, {
        "char": "&#x21A8",
        desc: "UP DOWN ARROW WITH BASE"
      }, {
        "char": "&#x21A9",
        desc: "LEFTWARDS ARROW WITH HOOK"
      }, {
        "char": "&#x21AA",
        desc: "RIGHTWARDS ARROW WITH HOOK"
      }, {
        "char": "&#x21AB",
        desc: "LEFTWARDS ARROW WITH LOOP"
      }, {
        "char": "&#x21AC",
        desc: "RIGHTWARDS ARROW WITH LOOP"
      }, {
        "char": "&#x21AD",
        desc: "LEFT RIGHT WAVE ARROW"
      }, {
        "char": "&#x21AE",
        desc: "LEFT RIGHT ARROW WITH STROKE"
      }, {
        "char": "&#x21AF",
        desc: "DOWNWARDS ZIGZAG ARROW"
      }, {
        "char": "&#x21B0",
        desc: "UPWARDS ARROW WITH TIP LEFTWARDS"
      }, {
        "char": "&#x21B1",
        desc: "UPWARDS ARROW WITH TIP RIGHTWARDS"
      }, {
        "char": "&#x21B2",
        desc: "DOWNWARDS ARROW WITH TIP LEFTWARDS"
      }, {
        "char": "&#x21B3",
        desc: "DOWNWARDS ARROW WITH TIP RIGHTWARDS"
      }, {
        "char": "&#x21B4",
        desc: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS"
      }, {
        "char": "&#x21B5",
        desc: "DOWNWARDS ARROW WITH CORNER LEFTWARDS"
      }, {
        "char": "&#x21B6",
        desc: "ANTICLOCKWISE TOP SEMICIRCLE ARROW"
      }, {
        "char": "&#x21B7",
        desc: "CLOCKWISE TOP SEMICIRCLE ARROW"
      }, {
        "char": "&#x21B8",
        desc: "NORTH WEST ARROW TO LONG BAR"
      }, {
        "char": "&#x21B9",
        desc: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR"
      }, {
        "char": "&#x21BA",
        desc: "ANTICLOCKWISE OPEN CIRCLE ARROW"
      }, {
        "char": "&#x21BB",
        desc: "CLOCKWISE OPEN CIRCLE ARROW"
      }, {
        "char": "&#x21BC",
        desc: "LEFTWARDS HARPOON WITH BARB UPWARDS"
      }, {
        "char": "&#x21BD",
        desc: "LEFTWARDS HARPOON WITH BARB DOWNWARDS"
      }, {
        "char": "&#x21BE",
        desc: "UPWARDS HARPOON WITH BARB RIGHTWARDS"
      }, {
        "char": "&#x21BF",
        desc: "UPWARDS HARPOON WITH BARB LEFTWARDS"
      }, {
        "char": "&#x21C0",
        desc: "RIGHTWARDS HARPOON WITH BARB UPWARDS"
      }, {
        "char": "&#x21C1",
        desc: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS"
      }, {
        "char": "&#x21C2",
        desc: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS"
      }, {
        "char": "&#x21C3",
        desc: "DOWNWARDS HARPOON WITH BARB LEFTWARDS"
      }, {
        "char": "&#x21C4",
        desc: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW"
      }, {
        "char": "&#x21C5",
        desc: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW"
      }, {
        "char": "&#x21C6",
        desc: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW"
      }, {
        "char": "&#x21C7",
        desc: "LEFTWARDS PAIRED ARROWS"
      }, {
        "char": "&#x21C8",
        desc: "UPWARDS PAIRED ARROWS"
      }, {
        "char": "&#x21C9",
        desc: "RIGHTWARDS PAIRED ARROWS"
      }, {
        "char": "&#x21CA",
        desc: "DOWNWARDS PAIRED ARROWS"
      }, {
        "char": "&#x21CB",
        desc: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON"
      }, {
        "char": "&#x21CC",
        desc: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON"
      }, {
        "char": "&#x21CD",
        desc: "LEFTWARDS DOUBLE ARROW WITH STROKE"
      }, {
        "char": "&#x21CE",
        desc: "LEFT RIGHT DOUBLE ARROW WITH STROKE"
      }, {
        "char": "&#x21CF",
        desc: "RIGHTWARDS DOUBLE ARROW WITH STROKE"
      }, {
        "char": "&#x21D0",
        desc: "LEFTWARDS DOUBLE ARROW"
      }, {
        "char": "&#x21D1",
        desc: "UPWARDS DOUBLE ARROW"
      }, {
        "char": "&#x21D2",
        desc: "RIGHTWARDS DOUBLE ARROW"
      }, {
        "char": "&#x21D3",
        desc: "DOWNWARDS DOUBLE ARROW"
      }, {
        "char": "&#x21D4",
        desc: "LEFT RIGHT DOUBLE ARROW"
      }, {
        "char": "&#x21D5",
        desc: "UP DOWN DOUBLE ARROW"
      }, {
        "char": "&#x21D6",
        desc: "NORTH WEST DOUBLE ARROW"
      }, {
        "char": "&#x21D7",
        desc: "NORTH EAST DOUBLE ARROW"
      }, {
        "char": "&#x21D8",
        desc: "SOUTH EAST DOUBLE ARROW"
      }, {
        "char": "&#x21D9",
        desc: "SOUTH WEST DOUBLE ARROW"
      }, {
        "char": "&#x21DA",
        desc: "LEFTWARDS TRIPLE ARROW"
      }, {
        "char": "&#x21DB",
        desc: "RIGHTWARDS TRIPLE ARROW"
      }, {
        "char": "&#x21DC",
        desc: "LEFTWARDS SQUIGGLE ARROW"
      }, {
        "char": "&#x21DD",
        desc: "RIGHTWARDS SQUIGGLE ARROW"
      }, {
        "char": "&#x21DE",
        desc: "UPWARDS ARROW WITH DOUBLE STROKE"
      }, {
        "char": "&#x21DF",
        desc: "DOWNWARDS ARROW WITH DOUBLE STROKE"
      }, {
        "char": "&#x21E0",
        desc: "LEFTWARDS DASHED ARROW"
      }, {
        "char": "&#x21E1",
        desc: "UPWARDS DASHED ARROW"
      }, {
        "char": "&#x21E2",
        desc: "RIGHTWARDS DASHED ARROW"
      }, {
        "char": "&#x21E3",
        desc: "DOWNWARDS DASHED ARROW"
      }, {
        "char": "&#x21E4",
        desc: "LEFTWARDS ARROW TO BAR"
      }, {
        "char": "&#x21E5",
        desc: "RIGHTWARDS ARROW TO BAR"
      }, {
        "char": "&#x21E6",
        desc: "LEFTWARDS WHITE ARROW"
      }, {
        "char": "&#x21E7",
        desc: "UPWARDS WHITE ARROW"
      }, {
        "char": "&#x21E8",
        desc: "RIGHTWARDS WHITE ARROW"
      }, {
        "char": "&#x21E9",
        desc: "DOWNWARDS WHITE ARROW"
      }, {
        "char": "&#x21EA",
        desc: "UPWARDS WHITE ARROW FROM BAR"
      }, {
        "char": "&#x21EB",
        desc: "UPWARDS WHITE ARROW ON PEDESTAL"
      }, {
        "char": "&#x21EC",
        desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR"
      }, {
        "char": "&#x21ED",
        desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR"
      }, {
        "char": "&#x21EE",
        desc: "UPWARDS WHITE DOUBLE ARROW"
      }, {
        "char": "&#x21EF",
        desc: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL"
      }, {
        "char": "&#x21F0",
        desc: "RIGHTWARDS WHITE ARROW FROM WALL"
      }, {
        "char": "&#x21F1",
        desc: "NORTH WEST ARROW TO CORNER"
      }, {
        "char": "&#x21F2",
        desc: "SOUTH EAST ARROW TO CORNER"
      }, {
        "char": "&#x21F3",
        desc: "UP DOWN WHITE ARROW"
      }, {
        "char": "&#x21F4",
        desc: "RIGHT ARROW WITH SMALL CIRCLE"
      }, {
        "char": "&#x21F5",
        desc: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW"
      }, {
        "char": "&#x21F6",
        desc: "THREE RIGHTWARDS ARROWS"
      }, {
        "char": "&#x21F7",
        desc: "LEFTWARDS ARROW WITH VERTICAL STROKE"
      }, {
        "char": "&#x21F8",
        desc: "RIGHTWARDS ARROW WITH VERTICAL STROKE"
      }, {
        "char": "&#x21F9",
        desc: "LEFT RIGHT ARROW WITH VERTICAL STROKE"
      }, {
        "char": "&#x21FA",
        desc: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
      }, {
        "char": "&#x21FB",
        desc: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
      }, {
        "char": "&#x21FC",
        desc: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE"
      }, {
        "char": "&#x21FD",
        desc: "LEFTWARDS OPEN-HEADED ARROW"
      }, {
        "char": "&#x21FE",
        desc: "RIGHTWARDS OPEN-HEADED ARROW"
      }, {
        "char": "&#x21FF",
        desc: "LEFT RIGHT OPEN-HEADED ARROW"
      }]
    }, {
      title: "Math",
      list: [{
        "char": "&forall;",
        desc: "FOR ALL"
      }, {
        "char": "&part;",
        desc: "PARTIAL DIFFERENTIAL"
      }, {
        "char": "&exist;",
        desc: "THERE EXISTS"
      }, {
        "char": "&empty;",
        desc: "EMPTY SET"
      }, {
        "char": "&nabla;",
        desc: "NABLA"
      }, {
        "char": "&isin;",
        desc: "ELEMENT OF"
      }, {
        "char": "&notin;",
        desc: "NOT AN ELEMENT OF"
      }, {
        "char": "&ni;",
        desc: "CONTAINS AS MEMBER"
      }, {
        "char": "&prod;",
        desc: "N-ARY PRODUCT"
      }, {
        "char": "&sum;",
        desc: "N-ARY SUMMATION"
      }, {
        "char": "&minus;",
        desc: "MINUS SIGN"
      }, {
        "char": "&lowast;",
        desc: "ASTERISK OPERATOR"
      }, {
        "char": "&radic;",
        desc: "SQUARE ROOT"
      }, {
        "char": "&prop;",
        desc: "PROPORTIONAL TO"
      }, {
        "char": "&infin;",
        desc: "INFINITY"
      }, {
        "char": "&ang;",
        desc: "ANGLE"
      }, {
        "char": "&and;",
        desc: "LOGICAL AND"
      }, {
        "char": "&or;",
        desc: "LOGICAL OR"
      }, {
        "char": "&cap;",
        desc: "INTERSECTION"
      }, {
        "char": "&cup;",
        desc: "UNION"
      }, {
        "char": "&int;",
        desc: "INTEGRAL"
      }, {
        "char": "&there4;",
        desc: "THEREFORE"
      }, {
        "char": "&sim;",
        desc: "TILDE OPERATOR"
      }, {
        "char": "&cong;",
        desc: "APPROXIMATELY EQUAL TO"
      }, {
        "char": "&asymp;",
        desc: "ALMOST EQUAL TO"
      }, {
        "char": "&ne;",
        desc: "NOT EQUAL TO"
      }, {
        "char": "&equiv;",
        desc: "IDENTICAL TO"
      }, {
        "char": "&le;",
        desc: "LESS-THAN OR EQUAL TO"
      }, {
        "char": "&ge;",
        desc: "GREATER-THAN OR EQUAL TO"
      }, {
        "char": "&sub;",
        desc: "SUBSET OF"
      }, {
        "char": "&sup;",
        desc: "SUPERSET OF"
      }, {
        "char": "&nsub;",
        desc: "NOT A SUBSET OF"
      }, {
        "char": "&sube;",
        desc: "SUBSET OF OR EQUAL TO"
      }, {
        "char": "&supe;",
        desc: "SUPERSET OF OR EQUAL TO"
      }, {
        "char": "&oplus;",
        desc: "CIRCLED PLUS"
      }, {
        "char": "&otimes;",
        desc: "CIRCLED TIMES"
      }, {
        "char": "&perp;",
        desc: "UP TACK"
      }]
    }, {
      title: "Misc",
      list: [{
        "char": "&spades;",
        desc: "BLACK SPADE SUIT"
      }, {
        "char": "&clubs;",
        desc: "BLACK CLUB SUIT"
      }, {
        "char": "&hearts;",
        desc: "BLACK HEART SUIT"
      }, {
        "char": "&diams;",
        desc: "BLACK DIAMOND SUIT"
      }, {
        "char": "&#x2669",
        desc: "QUARTER NOTE"
      }, {
        "char": "&#x266A",
        desc: "EIGHTH NOTE"
      }, {
        "char": "&#x266B",
        desc: "BEAMED EIGHTH NOTES"
      }, {
        "char": "&#x266C",
        desc: "BEAMED SIXTEENTH NOTES"
      }, {
        "char": "&#x266D",
        desc: "MUSIC FLAT SIGN"
      }, {
        "char": "&#x266E",
        desc: "MUSIC NATURAL SIGN"
      }, {
        "char": "&#x2600",
        desc: "BLACK SUN WITH RAYS"
      }, {
        "char": "&#x2601",
        desc: "CLOUD"
      }, {
        "char": "&#x2602",
        desc: "UMBRELLA"
      }, {
        "char": "&#x2603",
        desc: "SNOWMAN"
      }, {
        "char": "&#x2615",
        desc: "HOT BEVERAGE"
      }, {
        "char": "&#x2618",
        desc: "SHAMROCK"
      }, {
        "char": "&#x262F",
        desc: "YIN YANG"
      }, {
        "char": "&#x2714",
        desc: "HEAVY CHECK MARK"
      }, {
        "char": "&#x2716",
        desc: "HEAVY MULTIPLICATION X"
      }, {
        "char": "&#x2744",
        desc: "SNOWFLAKE"
      }, {
        "char": "&#x275B",
        desc: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT"
      }, {
        "char": "&#x275C",
        desc: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT"
      }, {
        "char": "&#x275D",
        desc: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"
      }, {
        "char": "&#x275E",
        desc: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT"
      }, {
        "char": "&#x2764",
        desc: "HEAVY BLACK HEART"
      }]
    }]
  }), s.FE.PLUGINS.specialCharacters = function (a) {
    var I,
        e,
        R = "special_characters";

    function r(E, c) {
      a.events.disableBlur(), E.focus(), c.preventDefault(), c.stopPropagation();
    }

    return {
      _init: function () {},
      show: function () {
        if (!I) {
          var E = "<h4>" + a.language.translate("Special Characters") + "</h4>",
              c = function () {
            for (var E = '<div class="fr-special-characters-modal">', c = 0; c < a.opts.specialCharactersSets.length; c++) {
              for (var T = a.opts.specialCharactersSets[c], R = T.list, L = '<div class="fr-special-characters-list"><p class="fr-special-characters-title">' + a.language.translate(T.title) + "</p>", A = 0; A < R.length; A++) {
                var I = R[A];
                L += '<span class="fr-command fr-special-character" tabIndex="-1" role="button" value="' + I["char"] + '" title="' + I.desc + '">' + I["char"] + '<span class="fr-sr-only">' + a.language.translate(I.desc) + "&nbsp;&nbsp;&nbsp;</span></span>";
              }

              E += L + "</div>";
            }

            return E += "</div>";
          }(),
              T = a.modals.create(R, E, c);

          I = T.$modal, T.$head, e = T.$body, a.events.$on(s(a.o_win), "resize", function () {
            (I.data("instance") || a).modals.resize(R);
          }), a.events.bindClick(e, ".fr-special-character", function (E) {
            var c = I.data("instance") || a,
                T = s(E.currentTarget);
            c.specialCharacters.insert(T);
          }), a.events.$on(e, "keydown", function (E) {
            var c = E.which,
                T = e.find("span.fr-special-character:focus:first");
            if (!(T.length || c != s.FE.KEYCODE.F10 || a.keys.ctrlKey(E) || E.shiftKey) && E.altKey) return r(e.find("span.fr-special-character:first"), E), !1;

            if (c == s.FE.KEYCODE.TAB || c == s.FE.KEYCODE.ARROW_LEFT || c == s.FE.KEYCODE.ARROW_RIGHT) {
              var R = null,
                  L = null,
                  A = !1;
              return c == s.FE.KEYCODE.ARROW_LEFT || c == s.FE.KEYCODE.ARROW_RIGHT ? (L = c == s.FE.KEYCODE.ARROW_RIGHT, A = !0) : L = !E.shiftKey, T.length ? (A && (R = L ? T.nextAll("span.fr-special-character:first") : T.prevAll("span.fr-special-character:first")), R && R.length || (R = L ? T.parent().next().find("span.fr-special-character:first") : T.parent().prev().find("span.fr-special-character:" + (A ? "last" : "first"))).length || (R = e.find("span.fr-special-character:" + (L ? "first" : "last")))) : R = e.find("span.fr-special-character:" + (L ? "first" : "last")), r(R, E), !1;
            }

            if (c != s.FE.KEYCODE.ENTER || !T.length) return !0;
            (I.data("instance") || a).specialCharacters.insert(T);
          }, !0);
        }

        a.modals.show(R), a.modals.resize(R);
      },
      hide: function () {
        a.modals.hide(R);
      },
      insert: function (E) {
        a.specialCharacters.hide(), a.undo.saveStep(), a.html.insert(E.attr("value"), !0), a.undo.saveStep();
      }
    };
  }, s.FroalaEditor.DefineIcon("specialCharacters", {
    template: "text",
    NAME: "&#937;"
  }), s.FE.RegisterCommand("specialCharacters", {
    title: "Special Characters",
    icon: "specialCharacters",
    undo: !1,
    focus: !1,
    modal: !0,
    callback: function () {
      this.specialCharacters.show();
    },
    plugin: "specialCharacters",
    showOnMobile: !0
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/table.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/table.min.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (l) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (l),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (Z) {
  Z.extend(Z.FE.POPUP_TEMPLATES, {
    "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
    "table.edit": "[_BUTTONS_]",
    "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]"
  }), Z.extend(Z.FE.DEFAULTS, {
    tableInsertMaxSize: 10,
    tableEditButtons: ["tableHeader", "tableRemove", "|", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
    tableInsertButtons: ["tableBack", "|"],
    tableResizer: !0,
    tableDefaultWidth: "100%",
    tableResizerOffset: 5,
    tableResizingLimit: 30,
    tableColorsButtons: ["tableBack", "|"],
    tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
    tableColorsStep: 7,
    tableCellStyles: {
      "fr-highlighted": "Highlighted",
      "fr-thick": "Thick"
    },
    tableStyles: {
      "fr-dashed-borders": "Dashed Borders",
      "fr-alternate-rows": "Alternate Rows"
    },
    tableCellMultipleStyles: !0,
    tableMultipleStyles: !0,
    tableInsertHelper: !0,
    tableInsertHelperOffset: 15
  }), Z.FE.PLUGINS.table = function (w) {
    var C, o, s, r, a, n, E;

    function h() {
      var e = O();

      if (e) {
        var t = w.popups.get("table.edit");

        if (t || (t = p()), t) {
          w.popups.setContainer("table.edit", w.$sc);
          var l = M(e),
              a = (l.left + l.right) / 2,
              s = l.bottom;
          w.popups.show("table.edit", a, s, l.bottom - l.top), w.edit.isDisabled() && (1 < J().length && w.toolbar.disable(), w.$el.removeClass("fr-no-selection"), w.edit.on(), w.button.bulkRefresh(), w.selection.setAtEnd(w.$el.find(".fr-selected-cell:last").get(0)), w.selection.restore());
        }
      }
    }

    function f() {
      var e,
          t,
          l,
          a,
          s = O();

      if (s) {
        var r = w.popups.get("table.colors");
        r || (r = function () {
          var e = "";
          0 < w.opts.tableColorsButtons.length && (e = '<div class="fr-buttons fr-table-colors-buttons">' + w.button.buildList(w.opts.tableColorsButtons) + "</div>");
          var t = "";
          w.opts.colorsHEXInput && (t = '<div class="fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-' + w.id + '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-' + w.id + '" type="text" placeholder="' + w.language.translate("HEX Color") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">' + w.language.translate("OK") + "</button></div></div>");
          var l = {
            buttons: e,
            colors: function () {
              for (var e = '<div class="fr-table-colors">', t = 0; t < w.opts.tableColors.length; t++) 0 !== t && t % w.opts.tableColorsStep == 0 && (e += "<br>"), "REMOVE" != w.opts.tableColors[t] ? e += '<span class="fr-command" style="background: ' + w.opts.tableColors[t] + ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="' + w.opts.tableColors[t] + '"><span class="fr-sr-only">' + w.language.translate("Color") + " " + w.opts.tableColors[t] + "&nbsp;&nbsp;&nbsp;</span></span>" : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="' + w.language.translate("Clear Formatting") + '">' + w.icon.create("tableColorRemove") + '<span class="fr-sr-only">' + w.language.translate("Clear Formatting") + "</span></span>";

              return e += "</div>";
            }(),
            custom_color: t
          },
              a = w.popups.create("table.colors", l);
          return w.events.$on(w.$wp, "scroll.table-colors", function () {
            w.popups.isVisible("table.colors") && f();
          }), u = a, w.events.on("popup.tab", function (e) {
            var t = Z(e.currentTarget);
            if (!w.popups.isVisible("table.colors") || !t.is("span")) return !0;
            var l = e.which,
                a = !0;

            if (Z.FE.KEYCODE.TAB == l) {
              var s = u.find(".fr-buttons");
              a = !w.accessibility.focusToolbar(s, !!e.shiftKey);
            } else if (Z.FE.KEYCODE.ARROW_UP == l || Z.FE.KEYCODE.ARROW_DOWN == l || Z.FE.KEYCODE.ARROW_LEFT == l || Z.FE.KEYCODE.ARROW_RIGHT == l) {
              var r = t.parent().find("span.fr-command"),
                  n = r.index(t),
                  o = w.opts.colorsStep,
                  i = Math.floor(r.length / o),
                  f = n % o,
                  c = Math.floor(n / o),
                  d = c * o + f,
                  p = i * o;
              Z.FE.KEYCODE.ARROW_UP == l ? d = ((d - o) % p + p) % p : Z.FE.KEYCODE.ARROW_DOWN == l ? d = (d + o) % p : Z.FE.KEYCODE.ARROW_LEFT == l ? d = ((d - 1) % p + p) % p : Z.FE.KEYCODE.ARROW_RIGHT == l && (d = (d + 1) % p);
              var h = Z(r.get(d));
              w.events.disableBlur(), h.focus(), a = !1;
            } else Z.FE.KEYCODE.ENTER == l && (w.button.exec(t), a = !1);

            return !1 === a && (e.preventDefault(), e.stopPropagation()), a;
          }, !0), a;
          var u;
        }()), w.popups.setContainer("table.colors", w.$sc);
        var n = M(s),
            o = (n.left + n.right) / 2,
            i = n.bottom;
        e = w.popups.get("table.colors"), t = w.$el.find(".fr-selected-cell:first"), l = w.helpers.RGBToHex(t.css("background-color")), a = e.find(".fr-table-colors-hex-layer input"), e.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), e.find('span[data-param1="' + l + '"]').addClass("fr-selected-color fr-active-item"), a.val(l).trigger("change"), w.popups.show("table.colors", o, i, n.bottom - n.top);
      }
    }

    function i() {
      0 === J().length && w.toolbar.enable();
    }

    function c(e) {
      if (e) return w.popups.onHide("table.insert", function () {
        w.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseenter");
      }), !0;
      var t = "";
      0 < w.opts.tableInsertButtons.length && (t = '<div class="fr-buttons">' + w.button.buildList(w.opts.tableInsertButtons) + "</div>");
      var l,
          a = {
        buttons: t,
        rows_columns: function () {
          for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', t = 1; t <= w.opts.tableInsertMaxSize; t++) {
            for (var l = 1; l <= w.opts.tableInsertMaxSize; l++) {
              var a = "inline-block";
              2 < t && !w.helpers.isMobile() && (a = "none");
              var s = "fr-table-cell ";
              1 == t && 1 == l && (s += " hover"), e += '<span class="fr-command ' + s + '" tabIndex="-1" data-cmd="tableInsert" data-row="' + t + '" data-col="' + l + '" data-param1="' + t + '" data-param2="' + l + '" style="display: ' + a + ';" role="button"><span></span><span class="fr-sr-only">' + t + " &times; " + l + "&nbsp;&nbsp;&nbsp;</span></span>";
            }

            e += '<div class="new-line"></div>';
          }

          return e += "</div></div>";
        }()
      },
          s = w.popups.create("table.insert", a);
      return w.events.$on(s, "mouseenter", ".fr-table-size .fr-select-table-size .fr-table-cell", function (e) {
        d(Z(e.currentTarget));
      }, !0), l = s, w.events.$on(l, "focus", "[tabIndex]", function (e) {
        var t = Z(e.currentTarget);
        d(t);
      }), w.events.on("popup.tab", function (e) {
        var t = Z(e.currentTarget);
        if (!w.popups.isVisible("table.insert") || !t.is("span, a")) return !0;
        var l,
            a = e.which;

        if (Z.FE.KEYCODE.ARROW_UP == a || Z.FE.KEYCODE.ARROW_DOWN == a || Z.FE.KEYCODE.ARROW_LEFT == a || Z.FE.KEYCODE.ARROW_RIGHT == a) {
          if (t.is("span.fr-table-cell")) {
            var s = t.parent().find("span.fr-table-cell"),
                r = s.index(t),
                n = w.opts.tableInsertMaxSize,
                o = r % n,
                i = Math.floor(r / n);
            Z.FE.KEYCODE.ARROW_UP == a ? i = Math.max(0, i - 1) : Z.FE.KEYCODE.ARROW_DOWN == a ? i = Math.min(w.opts.tableInsertMaxSize - 1, i + 1) : Z.FE.KEYCODE.ARROW_LEFT == a ? o = Math.max(0, o - 1) : Z.FE.KEYCODE.ARROW_RIGHT == a && (o = Math.min(w.opts.tableInsertMaxSize - 1, o + 1));
            var f = i * n + o,
                c = Z(s.get(f));
            d(c), w.events.disableBlur(), c.focus(), l = !1;
          }
        } else Z.FE.KEYCODE.ENTER == a && (w.button.exec(t), l = !1);

        return !1 === l && (e.preventDefault(), e.stopPropagation()), l;
      }, !0), s;
    }

    function d(e) {
      var t = e.data("row"),
          l = e.data("col"),
          a = e.parent();
      a.siblings(".fr-table-size-info").html(t + " &times; " + l), a.find("> span").removeClass("hover fr-active-item");

      for (var s = 1; s <= w.opts.tableInsertMaxSize; s++) for (var r = 0; r <= w.opts.tableInsertMaxSize; r++) {
        var n = a.find('> span[data-row="' + s + '"][data-col="' + r + '"]');
        s <= t && r <= l ? n.addClass("hover") : s <= t + 1 || s <= 2 && !w.helpers.isMobile() ? n.css("display", "inline-block") : 2 < s && !w.helpers.isMobile() && n.css("display", "none");
      }

      e.addClass("fr-active-item");
    }

    function p(e) {
      if (e) return w.popups.onHide("table.edit", i), !0;

      if (0 < w.opts.tableEditButtons.length) {
        var t = {
          buttons: '<div class="fr-buttons">' + w.button.buildList(w.opts.tableEditButtons) + "</div>"
        },
            l = w.popups.create("table.edit", t);
        return w.events.$on(w.$wp, "scroll.table-edit", function () {
          w.popups.isVisible("table.edit") && h();
        }), l;
      }

      return !1;
    }

    function u() {
      if (0 < J().length) {
        var e = Q();
        w.selection.setBefore(e.get(0)) || w.selection.setAfter(e.get(0)), w.selection.restore(), w.popups.hide("table.edit"), e.remove(), w.toolbar.enable();
      }
    }

    function b(e) {
      var t = Q();

      if (0 < t.length) {
        if (0 < w.$el.find("th.fr-selected-cell").length && "above" == e) return;
        var l,
            a,
            s,
            r = O(),
            n = $(r);
        a = "above" == e ? n.min_i : n.max_i;
        var o = "<tr>";

        for (l = 0; l < r[a].length; l++) if ("below" == e && a < r.length - 1 && r[a][l] == r[a + 1][l] || "above" == e && 0 < a && r[a][l] == r[a - 1][l]) {
          if (0 === l || 0 < l && r[a][l] != r[a][l - 1]) {
            var i = Z(r[a][l]);
            i.attr("rowspan", parseInt(i.attr("rowspan"), 10) + 1);
          }
        } else o += "<td><br></td>";

        o += "</tr>", s = 0 < w.$el.find("th.fr-selected-cell").length && "below" == e ? Z(t.find("tbody").not(t.find("table tbody"))) : Z(t.find("tr").not(t.find("table tr")).get(a)), "below" == e ? "TBODY" == s.prop("tagName") ? s.prepend(o) : s.after(o) : "above" == e && (s.before(o), w.popups.isVisible("table.edit") && h());
      }
    }

    function g(e, t, l) {
      var a,
          s,
          r,
          n,
          o,
          i = 0,
          f = O(l);
      if (e < (t = Math.min(t, f[0].length - 1))) for (s = e; s <= t; s++) if (!(e < s && f[0][s] == f[0][s - 1]) && 1 < (n = Math.min(parseInt(f[0][s].getAttribute("colspan"), 10) || 1, t - e + 1)) && f[0][s] == f[0][s + 1]) for (i = n - 1, a = 1; a < f.length; a++) if (f[a][s] != f[a - 1][s]) {
        for (r = s; r < s + n; r++) if (1 < (o = parseInt(f[a][r].getAttribute("colspan"), 10) || 1) && f[a][r] == f[a][r + 1]) r += i = Math.min(i, o - 1);else if (!(i = Math.max(0, i - 1))) break;

        if (!i) break;
      }
      i && v(f, i, "colspan", 0, f.length - 1, e, t);
    }

    function m(e, t, l) {
      var a,
          s,
          r,
          n,
          o,
          i = 0,
          f = O(l);
      if (e < (t = Math.min(t, f.length - 1))) for (a = e; a <= t; a++) if (!(e < a && f[a][0] == f[a - 1][0]) && 1 < (n = Math.min(parseInt(f[a][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && f[a][0] == f[a + 1][0]) for (i = n - 1, s = 1; s < f[0].length; s++) if (f[a][s] != f[a][s - 1]) {
        for (r = a; r < a + n; r++) if (1 < (o = parseInt(f[r][s].getAttribute("rowspan"), 10) || 1) && f[r][s] == f[r + 1][s]) r += i = Math.min(i, o - 1);else if (!(i = Math.max(0, i - 1))) break;

        if (!i) break;
      }
      i && v(f, i, "rowspan", e, t, 0, f[0].length - 1);
    }

    function v(e, t, l, a, s, r, n) {
      var o, i, f;

      for (o = a; o <= s; o++) for (i = r; i <= n; i++) a < o && e[o][i] == e[o - 1][i] || r < i && e[o][i] == e[o][i - 1] || 1 < (f = parseInt(e[o][i].getAttribute(l), 10) || 1) && (1 < f - t ? e[o][i].setAttribute(l, f - t) : e[o][i].removeAttribute(l));
    }

    function R(e, t, l, a, s) {
      m(e, t, s), g(l, a, s);
    }

    function t(e) {
      var t = w.$el.find(".fr-selected-cell");
      "REMOVE" != e ? t.css("background-color", w.helpers.HEXtoRGB(e)) : t.css("background-color", ""), h();
    }

    function O(e) {
      var f = [];
      return null == (e = e || null) && 0 < J().length && (e = Q()), e && e.find("tr:visible").not(e.find("table tr")).each(function (o, e) {
        var t = Z(e),
            i = 0;
        t.find("> th, > td").each(function (e, t) {
          for (var l = Z(t), a = parseInt(l.attr("colspan"), 10) || 1, s = parseInt(l.attr("rowspan"), 10) || 1, r = o; r < o + s; r++) for (var n = i; n < i + a; n++) f[r] || (f[r] = []), f[r][n] ? i++ : f[r][n] = t;

          i += a;
        });
      }), f;
    }

    function A(e, t) {
      for (var l = 0; l < t.length; l++) for (var a = 0; a < t[l].length; a++) if (t[l][a] == e) return {
        row: l,
        col: a
      };
    }

    function F(e, t, l) {
      for (var a = e + 1, s = t + 1; a < l.length;) {
        if (l[a][t] != l[e][t]) {
          a--;
          break;
        }

        a++;
      }

      for (a == l.length && a--; s < l[e].length;) {
        if (l[e][s] != l[e][t]) {
          s--;
          break;
        }

        s++;
      }

      return s == l[e].length && s--, {
        row: a,
        col: s
      };
    }

    function x() {
      w.el.querySelector(".fr-cell-fixed") && w.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), w.el.querySelector(".fr-cell-handler") && w.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler");
    }

    function D() {
      var e = w.$el.find(".fr-selected-cell");
      0 < e.length && e.each(function () {
        var e = Z(this);
        e.removeClass("fr-selected-cell"), "" === e.attr("class") && e.removeAttr("class");
      }), x();
    }

    function y() {
      w.events.disableBlur(), w.selection.clear(), w.$el.addClass("fr-no-selection"), w.$el.blur(), w.events.enableBlur();
    }

    function $(e) {
      var t = w.$el.find(".fr-selected-cell");

      if (0 < t.length) {
        var l,
            a = e.length,
            s = 0,
            r = e[0].length,
            n = 0;

        for (l = 0; l < t.length; l++) {
          var o = A(t[l], e),
              i = F(o.row, o.col, e);
          a = Math.min(o.row, a), s = Math.max(i.row, s), r = Math.min(o.col, r), n = Math.max(i.col, n);
        }

        return {
          min_i: a,
          max_i: s,
          min_j: r,
          max_j: n
        };
      }

      return null;
    }

    function M(e) {
      var t = $(e),
          l = Z(e[t.min_i][t.min_j]),
          a = Z(e[t.min_i][t.max_j]),
          s = Z(e[t.max_i][t.min_j]);
      return {
        left: l.offset().left,
        right: a.offset().left + a.outerWidth(),
        top: l.offset().top,
        bottom: s.offset().top + s.outerHeight()
      };
    }

    function _(t, l) {
      if (Z(t).is(l)) D(), Z(t).addClass("fr-selected-cell");else {
        y(), w.edit.off();

        var a = O(),
            s = A(t, a),
            r = A(l, a),
            n = function e(t, l, a, s, r) {
          var n,
              o,
              i,
              f,
              c = t,
              d = l,
              p = a,
              h = s;

          for (n = c; n <= d; n++) (1 < (parseInt(Z(r[n][p]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(r[n][p]).attr("colspan"), 10) || 1)) && (f = F((i = A(r[n][p], r)).row, i.col, r), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h)), (1 < (parseInt(Z(r[n][h]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(r[n][h]).attr("colspan"), 10) || 1)) && (f = F((i = A(r[n][h], r)).row, i.col, r), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h));

          for (o = p; o <= h; o++) (1 < (parseInt(Z(r[c][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(r[c][o]).attr("colspan"), 10) || 1)) && (f = F((i = A(r[c][o], r)).row, i.col, r), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h)), (1 < (parseInt(Z(r[d][o]).attr("rowspan"), 10) || 1) || 1 < (parseInt(Z(r[d][o]).attr("colspan"), 10) || 1)) && (f = F((i = A(r[d][o], r)).row, i.col, r), c = Math.min(i.row, c), d = Math.max(f.row, d), p = Math.min(i.col, p), h = Math.max(f.col, h));

          return c == t && d == l && p == a && h == s ? {
            min_i: t,
            max_i: l,
            min_j: a,
            max_j: s
          } : e(c, d, p, h, r);
        }(Math.min(s.row, r.row), Math.max(s.row, r.row), Math.min(s.col, r.col), Math.max(s.col, r.col), a);

        D(), t.classList.add("fr-cell-fixed"), l.classList.add("fr-cell-handler");

        for (var o = n.min_i; o <= n.max_i; o++) for (var i = n.min_j; i <= n.max_j; i++) Z(a[o][i]).addClass("fr-selected-cell");
      }
    }

    function I(e) {
      var t = null,
          l = Z(e.target);
      return "TD" == e.target.tagName || "TH" == e.target.tagName ? t = e.target : 0 < l.closest("td").length ? t = l.closest("td").get(0) : 0 < l.closest("th").length && (t = l.closest("th").get(0)), 0 === w.$el.find(t).length ? null : t;
    }

    function T() {
      D(), w.popups.hide("table.edit");
    }

    function e(e) {
      var t = I(e);
      if ("false" == Z(t).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
      if (0 < J().length && !t && T(), !w.edit.isDisabled() || w.popups.isVisible("table.edit")) if (1 != e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey) (3 == e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey) && t && T();else if (r = !0, t) {
        0 < J().length && !e.shiftKey && T(), e.stopPropagation(), w.events.trigger("image.hideResizer"), w.events.trigger("video.hideResizer"), s = !0;
        var l = t.tagName.toLowerCase();
        e.shiftKey && 0 < w.$el.find(l + ".fr-selected-cell").length ? Z(w.$el.find(l + ".fr-selected-cell").closest("table")).is(Z(t).closest("table")) ? _(a, t) : y() : ((w.keys.ctrlKey(e) || e.shiftKey) && (1 < J().length || 0 === Z(t).find(w.selection.element()).length && !Z(t).is(w.selection.element())) && y(), a = t, 0 < w.opts.tableEditButtons.length && _(a, a));
      }
    }

    function l(e) {
      if (s || w.$tb.is(e.target) || w.$tb.is(Z(e.target).closest(w.$tb.get(0))) || (0 < J().length && w.toolbar.enable(), D()), !(1 != e.which || 1 == e.which && w.helpers.isMac() && e.ctrlKey)) {
        if (r = !1, s) s = !1, I(e) || 1 != J().length ? 0 < J().length && (w.selection.isCollapsed() ? h() : D()) : D();

        if (E) {
          E = !1, C.removeClass("fr-moving"), w.$el.removeClass("fr-no-selection"), w.edit.on();
          var t = parseFloat(C.css("left")) + w.opts.tableResizerOffset + w.$wp.offset().left;
          w.opts.iframe && (t -= w.$iframe.offset().left), C.data("release-position", t), C.removeData("max-left"), C.removeData("max-right"), function () {
            var e = C.data("origin"),
                t = C.data("release-position");

            if (e !== t) {
              var l = C.data("first"),
                  a = C.data("second"),
                  s = C.data("table"),
                  r = s.outerWidth();

              if (w.undo.canDo() || w.undo.saveStep(), null !== l && null !== a) {
                var n,
                    o,
                    i,
                    f = O(s),
                    c = [],
                    d = [],
                    p = [],
                    h = [];

                for (n = 0; n < f.length; n++) o = Z(f[n][l]), i = Z(f[n][a]), c[n] = o.outerWidth(), p[n] = i.outerWidth(), d[n] = c[n] / r * 100, h[n] = p[n] / r * 100;

                for (n = 0; n < f.length; n++) if (o = Z(f[n][l]), i = Z(f[n][a]), f[n][l] != f[n][a]) {
                  var u = (d[n] * (c[n] + t - e) / c[n]).toFixed(4);
                  o.css("width", u + "%"), i.css("width", (d[n] + h[n] - u).toFixed(4) + "%");
                }
              } else {
                var b,
                    g = s.parent(),
                    m = r / g.width() * 100,
                    v = (parseInt(s.css("margin-left"), 10) || 0) / g.width() * 100,
                    E = (parseInt(s.css("margin-right"), 10) || 0) / g.width() * 100;
                "rtl" == w.opts.direction && 0 === a || "rtl" != w.opts.direction && 0 !== a ? (b = (r + t - e) / r * m, s.css("margin-right", "calc(100% - " + Math.round(b).toFixed(4) + "% - " + Math.round(v).toFixed(4) + "%)")) : ("rtl" == w.opts.direction && 0 !== a || "rtl" != w.opts.direction && 0 === a) && (b = (r - t + e) / r * m, s.css("margin-left", "calc(100% - " + Math.round(b).toFixed(4) + "% - " + Math.round(E).toFixed(4) + "%)")), s.css("width", Math.round(b).toFixed(4) + "%");
              }

              w.selection.restore(), w.undo.saveStep(), w.events.trigger("table.resized", [s.get(0)]);
            }

            C.removeData("origin"), C.removeData("release-position"), C.removeData("first"), C.removeData("second"), C.removeData("table");
          }(), W();
        }
      }
    }

    function N(e) {
      if (!0 === s && 0 < w.opts.tableEditButtons.length) {
        if (Z(e.currentTarget).closest("table").is(Q())) {
          if ("TD" == e.currentTarget.tagName && 0 === w.$el.find("th.fr-selected-cell").length) return void _(a, e.currentTarget);
          if ("TH" == e.currentTarget.tagName && 0 === w.$el.find("td.fr-selected-cell").length) return void _(a, e.currentTarget);
        }

        y();
      }
    }

    function S(e, t, l, a) {
      for (var s, r = t; r != w.el && "TD" != r.tagName && "TH" != r.tagName && ("up" == a ? s = r.previousElementSibling : "down" == a && (s = r.nextElementSibling), !s);) r = r.parentNode;

      "TD" == r.tagName || "TH" == r.tagName ? function (e, t) {
        for (var l = e; l && "TABLE" != l.tagName && l.parentNode != w.el;) l = l.parentNode;

        if (l && "TABLE" == l.tagName) {
          var a = O(Z(l));
          "up" == t ? z(A(e, a), l, a) : "down" == t && B(A(e, a), l, a);
        }
      }(r, a) : s && ("up" == a && w.selection.setAtEnd(s), "down" == a && w.selection.setAtStart(s));
    }

    function z(e, t, l) {
      0 < e.row ? w.selection.setAtEnd(l[e.row - 1][e.col]) : S(0, t, 0, "up");
    }

    function B(e, t, l) {
      var a = parseInt(l[e.row][e.col].getAttribute("rowspan"), 10) || 1;
      e.row < l.length - a ? w.selection.setAtStart(l[e.row + a][e.col]) : S(0, t, 0, "down");
    }

    function W() {
      C && (C.find("div").css("opacity", 0), C.css("top", 0), C.css("left", 0), C.css("height", 0), C.find("div").css("height", 0), C.hide());
    }

    function k() {
      o && o.removeClass("fr-visible").css("left", "-9999px");
    }

    function K(e, t) {
      var l = Z(t),
          a = l.closest("table"),
          s = a.parent();
      if (t && "TD" != t.tagName && "TH" != t.tagName && (0 < l.closest("td").length ? t = l.closest("td") : 0 < l.closest("th").length && (t = l.closest("th"))), !t || "TD" != t.tagName && "TH" != t.tagName) C && l.get(0) != C.get(0) && l.parent().get(0) != C.get(0) && w.core.sameInstance(C) && W();else {
        if (l = Z(t), 0 === w.$el.find(l).length) return !1;
        var r = l.offset().left - 1,
            n = r + l.outerWidth();

        if (Math.abs(e.pageX - r) <= w.opts.tableResizerOffset || Math.abs(n - e.pageX) <= w.opts.tableResizerOffset) {
          var o,
              i,
              f,
              c,
              d,
              p = O(a),
              h = A(t, p),
              u = F(h.row, h.col, p),
              b = a.offset().top,
              g = a.outerHeight() - 1;
          "rtl" != w.opts.direction ? e.pageX - r <= w.opts.tableResizerOffset ? (f = r, 0 < h.col ? (c = r - j(h.col - 1, p) + w.opts.tableResizingLimit, d = r + j(h.col, p) - w.opts.tableResizingLimit, o = h.col - 1, i = h.col) : (o = null, i = 0, c = a.offset().left - 1 - parseInt(a.css("margin-left"), 10), d = a.offset().left - 1 + a.width() - p[0].length * w.opts.tableResizingLimit)) : n - e.pageX <= w.opts.tableResizerOffset && (f = n, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = n - j(u.col, p) + w.opts.tableResizingLimit, d = n + j(u.col + 1, p) - w.opts.tableResizingLimit, o = u.col, i = u.col + 1) : (o = u.col, i = null, c = a.offset().left - 1 + p[0].length * w.opts.tableResizingLimit, d = s.offset().left - 1 + s.width() + parseFloat(s.css("padding-left")))) : n - e.pageX <= w.opts.tableResizerOffset ? (f = n, 0 < h.col ? (c = n - j(h.col, p) + w.opts.tableResizingLimit, d = n + j(h.col - 1, p) - w.opts.tableResizingLimit, o = h.col, i = h.col - 1) : (o = null, i = 0, c = a.offset().left + p[0].length * w.opts.tableResizingLimit, d = s.offset().left - 1 + s.width() + parseFloat(s.css("padding-left")))) : e.pageX - r <= w.opts.tableResizerOffset && (f = r, u.col < p[u.row].length && p[u.row][u.col + 1] ? (c = r - j(u.col + 1, p) + w.opts.tableResizingLimit, d = r + j(u.col, p) - w.opts.tableResizingLimit, o = u.col + 1, i = u.col) : (o = u.col, i = null, c = s.offset().left + parseFloat(s.css("padding-left")), d = a.offset().left - 1 + a.width() - p[0].length * w.opts.tableResizingLimit)), C || (w.shared.$table_resizer || (w.shared.$table_resizer = Z('<div class="fr-table-resizer"><div></div></div>')), C = w.shared.$table_resizer, w.events.$on(C, "mousedown", function (e) {
            return !w.core.sameInstance(C) || (0 < J().length && T(), 1 == e.which ? (w.selection.save(), E = !0, C.addClass("fr-moving"), y(), w.edit.off(), C.find("div").css("opacity", 1), !1) : void 0);
          }), w.events.$on(C, "mousemove", function (e) {
            if (!w.core.sameInstance(C)) return !0;
            E && (w.opts.iframe && (e.pageX -= w.$iframe.offset().left), X(e));
          }), w.events.on("shared.destroy", function () {
            C.html("").removeData().remove(), C = null;
          }, !0), w.events.on("destroy", function () {
            w.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), C.hide().appendTo(Z("body:first"));
          }, !0)), C.data("table", a), C.data("first", o), C.data("second", i), C.data("instance", w), w.$wp.append(C);
          var m = f - w.win.pageXOffset - w.opts.tableResizerOffset - w.$wp.offset().left,
              v = b - w.$wp.offset().top + w.$wp.scrollTop();
          w.opts.iframe && (m += w.$iframe.offset().left, v += w.$iframe.offset().top, c += w.$iframe.offset().left, d += w.$iframe.offset().left), C.data("max-left", c), C.data("max-right", d), C.data("origin", f - w.win.pageXOffset), C.css("top", v), C.css("left", m), C.css("height", g), C.find("div").css("height", g), C.css("padding-left", w.opts.tableResizerOffset), C.css("padding-right", w.opts.tableResizerOffset), C.show();
        } else w.core.sameInstance(C) && W();
      }
    }

    function L(e, t) {
      if (w.$box.find(".fr-line-breaker").is(":visible")) return !1;
      o || q(), w.$box.append(o), o.data("instance", w);
      var l,
          a = Z(t).find("tr:first"),
          s = e.pageX,
          r = 0,
          n = 0;
      w.opts.iframe && (r += w.$iframe.offset().left - w.helpers.scrollLeft(), n += w.$iframe.offset().top - w.helpers.scrollTop()), a.find("th, td").each(function () {
        var e = Z(this);
        return e.offset().left <= s && s < e.offset().left + e.outerWidth() / 2 ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", n + e.offset().top - w.$box.offset().top - l - 5), o.css("left", r + e.offset().left - w.$box.offset().left - l / 2), o.data("selected-cell", e), o.data("position", "before"), o.addClass("fr-visible"), !1) : e.offset().left + e.outerWidth() / 2 <= s && s < e.offset().left + e.outerWidth() ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", n + e.offset().top - w.$box.offset().top - l - 5), o.css("left", r + e.offset().left - w.$box.offset().left + e.outerWidth() - l / 2), o.data("selected-cell", e), o.data("position", "after"), o.addClass("fr-visible"), !1) : void 0;
      });
    }

    function H(e, t) {
      if (w.$box.find(".fr-line-breaker").is(":visible")) return !1;
      o || q(), w.$box.append(o), o.data("instance", w);
      var l,
          a = Z(t),
          s = e.pageY,
          r = 0,
          n = 0;
      w.opts.iframe && (r += w.$iframe.offset().left - w.helpers.scrollLeft(), n += w.$iframe.offset().top - w.helpers.scrollTop()), a.find("tr").each(function () {
        var e = Z(this);
        return e.offset().top <= s && s < e.offset().top + e.outerHeight() / 2 ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", n + e.offset().top - w.$box.offset().top - l / 2), o.css("left", r + e.offset().left - w.$box.offset().left - l - 5), o.data("selected-cell", e.find("td:first")), o.data("position", "above"), o.addClass("fr-visible"), !1) : e.offset().top + e.outerHeight() / 2 <= s && s < e.offset().top + e.outerHeight() ? (l = parseInt(o.find("a").css("width"), 10), o.css("top", n + e.offset().top - w.$box.offset().top + e.outerHeight() - l / 2), o.css("left", r + e.offset().left - w.$box.offset().left - l - 5), o.data("selected-cell", e.find("td:first")), o.data("position", "below"), o.addClass("fr-visible"), !1) : void 0;
      });
    }

    function Y(e) {
      n = null;
      var t = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset, e.pageY - w.win.pageYOffset);
      w.opts.tableResizer && (!w.popups.areVisible() || w.popups.areVisible() && w.popups.isVisible("table.edit")) && K(e, t), !w.opts.tableInsertHelper || w.popups.areVisible() || w.$tb.hasClass("fr-inline") && w.$tb.is(":visible") || function (e, t) {
        if (0 === J().length) {
          var l, a, s;
          if (t && ("HTML" == t.tagName || "BODY" == t.tagName || w.node.isElement(t))) for (l = 1; l <= w.opts.tableInsertHelperOffset; l++) {
            if (a = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset, e.pageY - w.win.pageYOffset + l), Z(a).hasClass("fr-tooltip")) return;
            if (a && ("TH" == a.tagName || "TD" == a.tagName || "TABLE" == a.tagName) && (Z(a).parents(".fr-wrapper").length || w.opts.iframe)) return L(e, Z(a).closest("table"));
            if (s = w.doc.elementFromPoint(e.pageX - w.win.pageXOffset + l, e.pageY - w.win.pageYOffset), Z(s).hasClass("fr-tooltip")) return;
            if (s && ("TH" == s.tagName || "TD" == s.tagName || "TABLE" == s.tagName) && (Z(s).parents(".fr-wrapper").length || w.opts.iframe)) return H(e, Z(s).closest("table"));
          }
          w.core.sameInstance(o) && k();
        }
      }(e, t);
    }

    function P() {
      if (E) {
        var e = C.data("table").offset().top - w.win.pageYOffset;
        w.opts.iframe && (e += w.$iframe.offset().top - w.helpers.scrollTop()), C.css("top", e);
      }
    }

    function j(e, t) {
      var l,
          a = Z(t[0][e]).outerWidth();

      for (l = 1; l < t.length; l++) a = Math.min(a, Z(t[l][e]).outerWidth());

      return a;
    }

    function V(e, t, l) {
      var a,
          s = 0;

      for (a = e; a <= t; a++) s += j(a, l);

      return s;
    }

    function X(e) {
      if (1 < J().length && r && y(), !1 === r && !1 === s && !1 === E) n && clearTimeout(n), w.edit.isDisabled() && !w.popups.isVisible("table.edit") || (n = setTimeout(Y, 30, e));else if (E) {
        var t = e.pageX - w.win.pageXOffset;
        w.opts.iframe && (t += w.$iframe.offset().left);
        var l = C.data("max-left"),
            a = C.data("max-right");
        l <= t && t <= a ? C.css("left", t - w.opts.tableResizerOffset - w.$wp.offset().left) : t < l && parseFloat(C.css("left"), 10) > l - w.opts.tableResizerOffset ? C.css("left", l - w.opts.tableResizerOffset - w.$wp.offset().left) : a < t && parseFloat(C.css("left"), 10) < a - w.opts.tableResizerOffset && C.css("left", a - w.opts.tableResizerOffset - w.$wp.offset().left);
      } else r && k();
    }

    function U(e) {
      w.node.isEmpty(e.get(0)) ? e.prepend(Z.FE.MARKERS) : e.prepend(Z.FE.START_MARKER).append(Z.FE.END_MARKER);
    }

    function q() {
      w.shared.$ti_helper || (w.shared.$ti_helper = Z('<div class="fr-insert-helper"><a class="fr-floating-btn" role="button" tabIndex="-1" title="' + w.language.translate("Insert") + '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a></div>'), w.events.bindClick(w.shared.$ti_helper, "a", function () {
        var e = o.data("selected-cell"),
            t = o.data("position"),
            l = o.data("instance") || w;
        "before" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertColumn(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "after" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertColumn(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "above" == t ? (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertRow(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()) : "below" == t && (w.undo.saveStep(), e.addClass("fr-selected-cell"), l.table.insertRow(t), e.removeClass("fr-selected-cell"), w.undo.saveStep()), k();
      }), w.events.on("shared.destroy", function () {
        w.shared.$ti_helper.html("").removeData().remove(), w.shared.$ti_helper = null;
      }, !0), w.events.$on(w.shared.$ti_helper, "mousemove", function (e) {
        e.stopPropagation();
      }, !0), w.events.$on(Z(w.o_win), "scroll", function () {
        k();
      }, !0), w.events.$on(w.$wp, "scroll", function () {
        k();
      }, !0)), o = w.shared.$ti_helper, w.events.on("destroy", function () {
        o = null;
      }), w.tooltip.bind(w.$box, ".fr-insert-helper > a.fr-floating-btn");
    }

    function G() {
      a = null, clearTimeout(n);
    }

    function J() {
      return w.el.querySelectorAll(".fr-selected-cell");
    }

    function Q() {
      var e = J();

      if (e.length) {
        for (var t = e[0]; t && "TABLE" != t.tagName && t.parentNode != w.el;) t = t.parentNode;

        return t && "TABLE" == t.tagName ? Z(t) : Z([]);
      }

      return Z([]);
    }

    return {
      _init: function () {
        if (!w.$wp) return !1;

        if (!w.helpers.isMobile()) {
          E = s = r = !1, w.events.$on(w.$el, "mousedown", e), w.popups.onShow("image.edit", function () {
            D(), s = r = !1;
          }), w.popups.onShow("link.edit", function () {
            D(), s = r = !1;
          }), w.events.on("commands.mousedown", function (e) {
            0 < e.parents(".fr-toolbar").length && D();
          }), w.events.$on(w.$el, "mouseenter", "th, td", N), w.events.$on(w.$win, "mouseup", l), w.opts.iframe && w.events.$on(Z(w.o_win), "mouseup", l), w.events.$on(w.$win, "mousemove", X), w.events.$on(Z(w.o_win), "scroll", P), w.events.on("contentChanged", function () {
            0 < J().length && (h(), w.$el.find("img").on("load.selected-cells", function () {
              Z(this).off("load.selected-cells"), 0 < J().length && h();
            }));
          }), w.events.$on(Z(w.o_win), "resize", function () {
            D();
          }), w.events.on("toolbar.esc", function () {
            if (0 < J().length) return w.events.disableBlur(), w.events.focus(), !1;
          }, !0), w.events.$on(Z(w.o_win), "keydown", function () {
            r && s && (s = r = !1, w.$el.removeClass("fr-no-selection"), w.edit.on(), w.selection.setAtEnd(w.$el.find(".fr-selected-cell:last").get(0)), w.selection.restore(), D());
          }), w.events.$on(w.$el, "keydown", function (e) {
            e.shiftKey ? !1 === function (e) {
              var t = J();

              if (0 < t.length) {
                var l,
                    a,
                    s = O(),
                    r = e.which;
                1 == t.length ? a = l = t[0] : (l = w.el.querySelector(".fr-cell-fixed"), a = w.el.querySelector(".fr-cell-handler"));
                var n = A(a, s);

                if (Z.FE.KEYCODE.ARROW_RIGHT == r) {
                  if (n.col < s[0].length - 1) return _(l, s[n.row][n.col + 1]), !1;
                } else if (Z.FE.KEYCODE.ARROW_DOWN == r) {
                  if (n.row < s.length - 1) return _(l, s[n.row + 1][n.col]), !1;
                } else if (Z.FE.KEYCODE.ARROW_LEFT == r) {
                  if (0 < n.col) return _(l, s[n.row][n.col - 1]), !1;
                } else if (Z.FE.KEYCODE.ARROW_UP == r && 0 < n.row) return _(l, s[n.row - 1][n.col]), !1;
              }
            }(e) && setTimeout(function () {
              h();
            }, 0) : function (e) {
              var t = e.which,
                  l = w.selection.blocks();

              if (l.length && ("TD" == (l = l[0]).tagName || "TH" == l.tagName)) {
                for (var a = l; a && "TABLE" != a.tagName && a.parentNode != w.el;) a = a.parentNode;

                if (a && "TABLE" == a.tagName && (Z.FE.KEYCODE.ARROW_LEFT == t || Z.FE.KEYCODE.ARROW_UP == t || Z.FE.KEYCODE.ARROW_RIGHT == t || Z.FE.KEYCODE.ARROW_DOWN == t) && (0 < J().length && T(), w.browser.webkit && (Z.FE.KEYCODE.ARROW_UP == t || Z.FE.KEYCODE.ARROW_DOWN == t))) {
                  var s = w.selection.ranges(0).startContainer;
                  if (s.nodeType == Node.TEXT_NODE && (Z.FE.KEYCODE.ARROW_UP == t && s.previousSibling || Z.FE.KEYCODE.ARROW_DOWN == t && s.nextSibling)) return;
                  e.preventDefault(), e.stopPropagation();
                  var r = O(Z(a)),
                      n = A(l, r);
                  Z.FE.KEYCODE.ARROW_UP == t ? z(n, a, r) : Z.FE.KEYCODE.ARROW_DOWN == t && B(n, a, r), w.selection.restore();
                }
              }
            }(e);
          }), w.events.on("keydown", function (e) {
            if (!1 === function (e) {
              if (e.which == Z.FE.KEYCODE.TAB) {
                var t;
                if (0 < J().length) t = w.$el.find(".fr-selected-cell:last");else {
                  var l = w.selection.element();
                  "TD" == l.tagName || "TH" == l.tagName ? t = Z(l) : l != w.el && (0 < Z(l).parentsUntil(w.$el, "td").length ? t = Z(l).parents("td:first") : 0 < Z(l).parentsUntil(w.$el, "th").length && (t = Z(l).parents("th:first")));
                }
                if (t) return e.preventDefault(), !!(0 < Z(w.selection.element()).parentsUntil(w.$el, "ol, ul").length && (0 < Z(w.selection.element()).parents("li").prev().length || Z(w.selection.element()).is("li") && 0 < Z(w.selection.element()).prev().length)) || (T(), e.shiftKey ? 0 < t.prev().length ? U(t.prev()) : 0 < t.closest("tr").length && 0 < t.closest("tr").prev().length ? U(t.closest("tr").prev().find("td:last")) : 0 < t.closest("tbody").length && 0 < t.closest("table").find("thead tr").length && U(t.closest("table").find("thead tr th:last")) : 0 < t.next().length ? U(t.next()) : 0 < t.closest("tr").length && 0 < t.closest("tr").next().length ? U(t.closest("tr").next().find("td:first")) : 0 < t.closest("thead").length && 0 < t.closest("table").find("tbody tr").length ? U(t.closest("table").find("tbody tr td:first")) : (t.addClass("fr-selected-cell"), b("below"), D(), U(t.closest("tr").next().find("td:first"))), w.selection.restore(), !1);
              }
            }(e)) return !1;
            var t = J();

            if (0 < t.length) {
              if (0 < t.length && w.keys.ctrlKey(e) && e.which == Z.FE.KEYCODE.A) return D(), w.popups.isVisible("table.edit") && w.popups.hide("table.edit"), t = [], !0;
              if (e.which == Z.FE.KEYCODE.ESC && w.popups.isVisible("table.edit")) return D(), w.popups.hide("table.edit"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !(t = []);

              if (1 < t.length && (e.which == Z.FE.KEYCODE.BACKSPACE || e.which == Z.FE.KEYCODE.DELETE)) {
                w.undo.saveStep();

                for (var l = 0; l < t.length; l++) Z(t[l]).html("<br>"), l == t.length - 1 && Z(t[l]).prepend(Z.FE.MARKERS);

                return w.selection.restore(), w.undo.saveStep(), !(t = []);
              }

              if (1 < t.length && e.which != Z.FE.KEYCODE.F10 && !w.keys.isBrowserAction(e)) return e.preventDefault(), !(t = []);
            } else if (!(t = []) === function (e) {
              if (e.altKey && e.which == Z.FE.KEYCODE.SPACE) {
                var t,
                    l = w.selection.element();
                if ("TD" == l.tagName || "TH" == l.tagName ? t = l : 0 < Z(l).closest("td").length ? t = Z(l).closest("td").get(0) : 0 < Z(l).closest("th").length && (t = Z(l).closest("th").get(0)), t) return e.preventDefault(), _(t, t), h(), !1;
              }
            }(e)) return !1;
          }, !0);
          var t = [];
          w.events.on("html.beforeGet", function () {
            t = J();

            for (var e = 0; e < t.length; e++) t[e].className = (t[e].className || "").replace(/fr-selected-cell/g, "");
          }), w.events.on("html.afterGet", function () {
            for (var e = 0; e < t.length; e++) t[e].className = (t[e].className ? t[e].className.trim() + " " : "") + "fr-selected-cell";

            t = [];
          }), c(!0), p(!0);
        }

        w.events.on("destroy", G);
      },
      insert: function (e, t) {
        var l,
            a,
            s = "<table " + (w.opts.tableDefaultWidth ? 'style="width: ' + w.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>',
            r = 100 / t;

        for (l = 0; l < e; l++) {
          for (s += "<tr>", a = 0; a < t; a++) s += "<td" + (w.opts.tableDefaultWidth ? ' style="width: ' + r.toFixed(4) + '%;"' : "") + ">", 0 === l && 0 === a && (s += Z.FE.MARKERS), s += "<br></td>";

          s += "</tr>";
        }

        s += "</tbody></table>", w.html.insert(s), w.selection.restore();
        var n = w.$el.find(".fr-inserted-table");
        n.removeClass("fr-inserted-table"), w.events.trigger("table.inserted", [n.get(0)]);
      },
      remove: u,
      insertRow: b,
      deleteRow: function () {
        var e = Q();

        if (0 < e.length) {
          var t,
              l,
              a,
              s = O(),
              r = $(s);
          if (0 === r.min_i && r.max_i == s.length - 1) u();else {
            for (t = r.max_i; t >= r.min_i; t--) {
              for (a = Z(e.find("tr").not(e.find("table tr")).get(t)), l = 0; l < s[t].length; l++) if (0 === l || s[t][l] != s[t][l - 1]) {
                var n = Z(s[t][l]);

                if (1 < parseInt(n.attr("rowspan"), 10)) {
                  var o = parseInt(n.attr("rowspan"), 10) - 1;
                  1 == o ? n.removeAttr("rowspan") : n.attr("rowspan", o);
                }

                if (t < s.length - 1 && s[t][l] == s[t + 1][l] && (0 === t || s[t][l] != s[t - 1][l])) {
                  for (var i = s[t][l], f = l; 0 < f && s[t][f] == s[t][f - 1];) f--;

                  0 === f ? Z(e.find("tr").not(e.find("table tr")).get(t + 1)).prepend(i) : Z(s[t + 1][f - 1]).after(i);
                }
              }

              var c = a.parent();
              a.remove(), 0 === c.find("tr").length && c.remove(), s = O(e);
            }

            R(0, s.length - 1, 0, s[0].length - 1, e), 0 < r.min_i ? w.selection.setAtEnd(s[r.min_i - 1][0]) : w.selection.setAtEnd(s[0][0]), w.selection.restore(), w.popups.hide("table.edit");
          }
        }
      },
      insertColumn: function (i) {
        var e = Q();

        if (0 < e.length) {
          var f,
              c = O(),
              t = $(c);
          f = "before" == i ? t.min_j : t.max_j;
          var l,
              d = 100 / c[0].length,
              p = 100 / (c[0].length + 1);
          e.find("th, td").each(function () {
            (l = Z(this)).data("old-width", l.outerWidth() / e.outerWidth() * 100);
          }), e.find("tr").not(e.find("table tr")).each(function (e) {
            for (var t, l = Z(this), a = 0, s = 0; a - 1 < f;) {
              if (!(t = l.find("> th, > td").get(s))) {
                t = null;
                break;
              }

              t == c[e][a] ? (a += parseInt(Z(t).attr("colspan"), 10) || 1, s++) : (a += parseInt(Z(c[e][a]).attr("colspan"), 10) || 1, "after" == i && (t = 0 === s ? -1 : l.find("> th, > td").get(s - 1)));
            }

            var r,
                n = Z(t);

            if ("after" == i && f < a - 1 || "before" == i && 0 < f && c[e][f] == c[e][f - 1]) {
              if (0 === e || 0 < e && c[e][f] != c[e - 1][f]) {
                var o = parseInt(n.attr("colspan"), 10) + 1;
                n.attr("colspan", o), n.css("width", (n.data("old-width") * p / d + p).toFixed(4) + "%"), n.removeData("old-width");
              }
            } else r = 0 < l.find("th").length ? '<th style="width: ' + p.toFixed(4) + '%;"><br></th>' : '<td style="width: ' + p.toFixed(4) + '%;"><br></td>', -1 == t ? l.prepend(r) : null == t ? l.append(r) : "before" == i ? n.before(r) : "after" == i && n.after(r);
          }), e.find("th, td").each(function () {
            (l = Z(this)).data("old-width") && (l.css("width", (l.data("old-width") * p / d).toFixed(4) + "%"), l.removeData("old-width"));
          }), w.popups.isVisible("table.edit") && h();
        }
      },
      deleteColumn: function () {
        var e = Q();

        if (0 < e.length) {
          var t,
              l,
              a,
              s = O(),
              r = $(s);
          if (0 === r.min_j && r.max_j == s[0].length - 1) u();else {
            var n = 0;

            for (t = 0; t < s.length; t++) for (l = 0; l < s[0].length; l++) (a = Z(s[t][l])).hasClass("fr-selected-cell") || (a.data("old-width", a.outerWidth() / e.outerWidth() * 100), (l < r.min_j || l > r.max_j) && (n += a.outerWidth() / e.outerWidth() * 100));

            for (n /= s.length, l = r.max_j; l >= r.min_j; l--) for (t = 0; t < s.length; t++) if (0 === t || s[t][l] != s[t - 1][l]) if (a = Z(s[t][l]), 1 < (parseInt(a.attr("colspan"), 10) || 1)) {
              var o = parseInt(a.attr("colspan"), 10) - 1;
              1 == o ? a.removeAttr("colspan") : a.attr("colspan", o), a.css("width", (100 * (a.data("old-width") - j(l, s)) / n).toFixed(4) + "%"), a.removeData("old-width");
            } else {
              var i = Z(a.parent().get(0));
              a.remove(), 0 === i.find("> th, > td").length && (0 === i.prev().length || 0 === i.next().length || i.prev().find("> th[rowspan], > td[rowspan]").length < i.prev().find("> th, > td").length) && i.remove();
            }

            R(0, s.length - 1, 0, s[0].length - 1, e), 0 < r.min_j ? w.selection.setAtEnd(s[r.min_i][r.min_j - 1]) : w.selection.setAtEnd(s[r.min_i][0]), w.selection.restore(), w.popups.hide("table.edit"), e.find("th, td").each(function () {
              (a = Z(this)).data("old-width") && (a.css("width", (100 * a.data("old-width") / n).toFixed(4) + "%"), a.removeData("old-width"));
            });
          }
        }
      },
      mergeCells: function () {
        if (1 < J().length && (0 === w.$el.find("th.fr-selected-cell").length || 0 === w.$el.find("td.fr-selected-cell").length)) {
          x();
          var e,
              t,
              l = $(O()),
              a = w.$el.find(".fr-selected-cell"),
              s = Z(a[0]),
              r = s.parent().find(".fr-selected-cell"),
              n = s.closest("table"),
              o = s.html(),
              i = 0;

          for (e = 0; e < r.length; e++) i += Z(r[e]).outerWidth();

          for (s.css("width", Math.min(100, i / n.outerWidth() * 100).toFixed(4) + "%"), l.min_j < l.max_j && s.attr("colspan", l.max_j - l.min_j + 1), l.min_i < l.max_i && s.attr("rowspan", l.max_i - l.min_i + 1), e = 1; e < a.length; e++) "<br>" != (t = Z(a[e])).html() && "" !== t.html() && (o += "<br>" + t.html()), t.remove();

          s.html(o), w.selection.setAtEnd(s.get(0)), w.selection.restore(), w.toolbar.enable(), m(l.min_i, l.max_i, n);
          var f = n.find("tr:empty");

          for (e = f.length - 1; 0 <= e; e--) Z(f[e]).remove();

          g(l.min_j, l.max_j, n), h();
        }
      },
      splitCellVertically: function () {
        if (1 == J().length) {
          var e = w.$el.find(".fr-selected-cell"),
              t = parseInt(e.attr("colspan"), 10) || 1,
              l = e.parent().outerWidth(),
              a = e.outerWidth(),
              s = e.clone().html("<br>"),
              r = O(),
              n = A(e.get(0), r);

          if (1 < t) {
            var o = Math.ceil(t / 2);
            a = V(n.col, n.col + o - 1, r) / l * 100;
            var i = V(n.col + o, n.col + t - 1, r) / l * 100;
            1 < o ? e.attr("colspan", o) : e.removeAttr("colspan"), 1 < t - o ? s.attr("colspan", t - o) : s.removeAttr("colspan"), e.css("width", a.toFixed(4) + "%"), s.css("width", i.toFixed(4) + "%");
          } else {
            var f;

            for (f = 0; f < r.length; f++) if (0 === f || r[f][n.col] != r[f - 1][n.col]) {
              var c = Z(r[f][n.col]);

              if (!c.is(e)) {
                var d = (parseInt(c.attr("colspan"), 10) || 1) + 1;
                c.attr("colspan", d);
              }
            }

            a = a / l * 100 / 2, e.css("width", a.toFixed(4) + "%"), s.css("width", a.toFixed(4) + "%");
          }

          e.after(s), D(), w.popups.hide("table.edit");
        }
      },
      splitCellHorizontally: function () {
        if (1 == J().length) {
          var e = w.$el.find(".fr-selected-cell"),
              t = e.parent(),
              l = e.closest("table"),
              a = parseInt(e.attr("rowspan"), 10),
              s = O(),
              r = A(e.get(0), s),
              n = e.clone().html("<br>");

          if (1 < a) {
            var o = Math.ceil(a / 2);
            1 < o ? e.attr("rowspan", o) : e.removeAttr("rowspan"), 1 < a - o ? n.attr("rowspan", a - o) : n.removeAttr("rowspan");

            for (var i = r.row + o, f = 0 === r.col ? r.col : r.col - 1; 0 <= f && (s[i][f] == s[i][f - 1] || 0 < i && s[i][f] == s[i - 1][f]);) f--;

            -1 == f ? Z(l.find("tr").not(l.find("table tr")).get(i)).prepend(n) : Z(s[i][f]).after(n);
          } else {
            var c,
                d = Z("<tr>").append(n);

            for (c = 0; c < s[0].length; c++) if (0 === c || s[r.row][c] != s[r.row][c - 1]) {
              var p = Z(s[r.row][c]);
              p.is(e) || p.attr("rowspan", (parseInt(p.attr("rowspan"), 10) || 1) + 1);
            }

            t.after(d);
          }

          D(), w.popups.hide("table.edit");
        }
      },
      addHeader: function () {
        var e = Q();

        if (0 < e.length && 0 === e.find("th").length) {
          var t,
              l = "<thead><tr>",
              a = 0;

          for (e.find("tr:first > td").each(function () {
            var e = Z(this);
            a += parseInt(e.attr("colspan"), 10) || 1;
          }), t = 0; t < a; t++) l += "<th><br></th>";

          l += "</tr></thead>", e.prepend(l), h();
        }
      },
      removeHeader: function () {
        var e = Q(),
            t = e.find("thead");
        if (0 < t.length) if (0 === e.find("tbody tr").length) u();else if (t.remove(), 0 < J().length) h();else {
          w.popups.hide("table.edit");
          var l = e.find("tbody tr:first td:first").get(0);
          l && (w.selection.setAtEnd(l), w.selection.restore());
        }
      },
      setBackground: t,
      showInsertPopup: function () {
        var e = w.$tb.find('.fr-command[data-cmd="insertTable"]'),
            t = w.popups.get("table.insert");

        if (t || (t = c()), !t.hasClass("fr-active")) {
          w.popups.refresh("table.insert"), w.popups.setContainer("table.insert", w.$tb);
          var l = e.offset().left + e.outerWidth() / 2,
              a = e.offset().top + (w.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          w.popups.show("table.insert", l, a, e.outerHeight());
        }
      },
      showEditPopup: h,
      showColorsPopup: f,
      back: function () {
        0 < J().length ? h() : (w.popups.hide("table.insert"), w.toolbar.showInline());
      },
      verticalAlign: function (e) {
        w.$el.find(".fr-selected-cell").css("vertical-align", e);
      },
      horizontalAlign: function (e) {
        w.$el.find(".fr-selected-cell").css("text-align", e);
      },
      applyStyle: function (e, t, l, a) {
        if (0 < t.length) {
          if (!l) {
            var s = Object.keys(a);
            s.splice(s.indexOf(e), 1), t.removeClass(s.join(" "));
          }

          t.toggleClass(e);
        }
      },
      selectedTable: Q,
      selectedCells: J,
      customColor: function () {
        var e = w.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
        e.length && t(e.val());
      },
      selectCells: _
    };
  }, Z.FE.DefineIcon("insertTable", {
    NAME: "table"
  }), Z.FE.RegisterCommand("insertTable", {
    title: "Insert Table",
    undo: !1,
    focus: !0,
    refreshOnCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup();
    },
    plugin: "table"
  }), Z.FE.RegisterCommand("tableInsert", {
    callback: function (e, t, l) {
      this.table.insert(t, l), this.popups.hide("table.insert");
    }
  }), Z.FE.DefineIcon("tableHeader", {
    NAME: "header",
    FA5NAME: "heading"
  }), Z.FE.RegisterCommand("tableHeader", {
    title: "Table Header",
    focus: !1,
    toggle: !0,
    callback: function () {
      this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader();
    },
    refresh: function (e) {
      var t = this.table.selectedTable();
      0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0));
    }
  }), Z.FE.DefineIcon("tableRows", {
    NAME: "bars"
  }), Z.FE.RegisterCommand("tableRows", {
    type: "dropdown",
    focus: !1,
    title: "Row",
    options: {
      above: "Insert row above",
      below: "Insert row below",
      "delete": "Delete row"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.tableRows.options;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow();
    }
  }), Z.FE.DefineIcon("tableColumns", {
    NAME: "bars fa-rotate-90"
  }), Z.FE.RegisterCommand("tableColumns", {
    type: "dropdown",
    focus: !1,
    title: "Column",
    options: {
      before: "Insert column before",
      after: "Insert column after",
      "delete": "Delete column"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.tableColumns.options;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn();
    }
  }), Z.FE.DefineIcon("tableCells", {
    NAME: "square-o",
    FA5NAME: "square"
  }), Z.FE.RegisterCommand("tableCells", {
    type: "dropdown",
    focus: !1,
    title: "Cell",
    options: {
      merge: "Merge cells",
      "vertical-split": "Vertical split",
      "horizontal-split": "Horizontal split"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.tableCells.options;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally();
    },
    refreshOnShow: function (e, t) {
      1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1));
    }
  }), Z.FE.DefineIcon("tableRemove", {
    NAME: "trash"
  }), Z.FE.RegisterCommand("tableRemove", {
    title: "Remove Table",
    focus: !1,
    callback: function () {
      this.table.remove();
    }
  }), Z.FE.DefineIcon("tableStyle", {
    NAME: "paint-brush"
  }), Z.FE.RegisterCommand("tableStyle", {
    title: "Table Style",
    type: "dropdown",
    focus: !1,
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.tableStyles;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles);
    },
    refreshOnShow: function (e, t) {
      var l = this.$el.find(".fr-selected-cell").closest("table");
      l && t.find(".fr-command").each(function () {
        var e = Z(this).data("param1"),
            t = l.hasClass(e);
        Z(this).toggleClass("fr-active", t).attr("aria-selected", t);
      });
    }
  }), Z.FE.DefineIcon("tableCellBackground", {
    NAME: "tint"
  }), Z.FE.RegisterCommand("tableCellBackground", {
    title: "Cell Background",
    focus: !1,
    popup: !0,
    callback: function () {
      this.table.showColorsPopup();
    }
  }), Z.FE.RegisterCommand("tableCellBackgroundColor", {
    undo: !0,
    focus: !1,
    callback: function (e, t) {
      this.table.setBackground(t);
    }
  }), Z.FE.DefineIcon("tableBack", {
    NAME: "arrow-left"
  }), Z.FE.RegisterCommand("tableBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    callback: function () {
      this.table.back();
    },
    refresh: function (e) {
      0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    }
  }), Z.FE.DefineIcon("tableCellVerticalAlign", {
    NAME: "arrows-v",
    FA5NAME: "arrows-alt-v"
  }), Z.FE.RegisterCommand("tableCellVerticalAlign", {
    type: "dropdown",
    focus: !1,
    title: "Vertical Align",
    options: {
      Top: "Align Top",
      Middle: "Align Middle",
      Bottom: "Align Bottom"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.tableCellVerticalAlign.options;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="' + l.toLowerCase() + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(l) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.table.verticalAlign(t);
    },
    refreshOnShow: function (e, t) {
      t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0);
    }
  }), Z.FE.DefineIcon("tableCellHorizontalAlign", {
    NAME: "align-left"
  }), Z.FE.DefineIcon("align-left", {
    NAME: "align-left"
  }), Z.FE.DefineIcon("align-right", {
    NAME: "align-right"
  }), Z.FE.DefineIcon("align-center", {
    NAME: "align-center"
  }), Z.FE.DefineIcon("align-justify", {
    NAME: "align-justify"
  }), Z.FE.RegisterCommand("tableCellHorizontalAlign", {
    type: "dropdown",
    focus: !1,
    title: "Horizontal Align",
    options: {
      left: "Align Left",
      center: "Align Center",
      right: "Align Right",
      justify: "Align Justify"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.tableCellHorizontalAlign.options;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.icon.create("align-" + l) + '<span class="fr-sr-only">' + this.language.translate(t[l]) + "</span></a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.table.horizontalAlign(t);
    },
    refresh: function (e) {
      var t = this.table.selectedCells();
      t.length && e.find("> *:first").replaceWith(this.icon.create("align-" + this.helpers.getAlignment(Z(t[0]))));
    },
    refreshOnShow: function (e, t) {
      t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell:first")) + '"]').addClass("fr-active").attr("aria-selected", !0);
    }
  }), Z.FE.DefineIcon("tableCellStyle", {
    NAME: "magic"
  }), Z.FE.RegisterCommand("tableCellStyle", {
    title: "Cell Style",
    type: "dropdown",
    focus: !1,
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = this.opts.tableCellStyles;

      for (var l in t) t.hasOwnProperty(l) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="' + l + '" title="' + this.language.translate(t[l]) + '">' + this.language.translate(t[l]) + "</a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles);
    },
    refreshOnShow: function (e, t) {
      var l = this.$el.find(".fr-selected-cell:first");
      l && t.find(".fr-command").each(function () {
        var e = Z(this).data("param1"),
            t = l.hasClass(e);
        Z(this).toggleClass("fr-active", t).attr("aria-selected", t);
      });
    }
  }), Z.FE.RegisterCommand("tableCellBackgroundCustomColor", {
    title: "OK",
    undo: !0,
    callback: function () {
      this.table.customColor();
    }
  }), Z.FE.DefineIcon("tableColorRemove", {
    NAME: "eraser"
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/url.min.js":
/*!*************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/url.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (f) {
  f.FE.URLRegEx = "(^| |\\u00A0)(" + f.FE.LinkRegEx + "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$", f.FE.PLUGINS.url = function (i) {
    var l = null;

    function n(e, n, t) {
      for (var r = ""; t.length && "." == t[t.length - 1];) r += ".", t = t.substring(0, t.length - 1);

      var o = t;
      if (i.opts.linkConvertEmailAddress) i.helpers.isEmail(o) && !/^mailto:.*/i.test(o) && (o = "mailto:" + o);else if (i.helpers.isEmail(o)) return n + t;
      return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(o) || (o = "//" + o), (n || "") + "<a" + (i.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (l ? ' rel="' + l + '"' : "") + ' data-fr-linked="true" href="' + o + '">' + t.replace(/&amp;/g, "&").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</a>" + r;
    }

    function a() {
      return new RegExp(f.FE.URLRegEx, "gi");
    }

    function s(e) {
      return i.opts.linkAlwaysNoFollow && (l = "nofollow"), i.opts.linkAlwaysBlank && (i.opts.linkNoOpener && (l ? l += " noopener" : l = "noopener"), i.opts.linkNoReferrer && (l ? l += " noreferrer" : l = "noreferrer")), e.replace(a(), n);
    }

    function p(e) {
      var n = e.split(" ");
      return n[n.length - 1];
    }

    function t() {
      var n = i.selection.ranges(0),
          t = n.startContainer;
      if (!t || t.nodeType !== Node.TEXT_NODE || n.startOffset !== (t.textContent || "").length) return !1;
      if (function e(n) {
        return !!n && ("A" === n.tagName || !(!n.parentNode || n.parentNode == i.el) && e(n.parentNode));
      }(t)) return !1;

      if (a().test(p(t.textContent))) {
        f(t).before(s(t.textContent));
        var r = f(t.parentNode).find("a[data-fr-linked]");
        r.removeAttr("data-fr-linked"), t.parentNode.removeChild(t), i.events.trigger("url.linked", [r.get(0)]);
      } else if (t.textContent.split(" ").length <= 2 && t.previousSibling && "A" === t.previousSibling.tagName) {
        var o = t.previousSibling.innerText + t.textContent;
        a().test(p(o)) && (f(t.previousSibling).replaceWith(s(o)), t.parentNode.removeChild(t));
      }
    }

    return {
      _init: function () {
        i.events.on("keypress", function (e) {
          !i.selection.isCollapsed() || "." != e.key && ")" != e.key && "(" != e.key || t();
        }, !0), i.events.on("keydown", function (e) {
          var n = e.which;
          !i.selection.isCollapsed() || n != f.FE.KEYCODE.ENTER && n != f.FE.KEYCODE.SPACE || t();
        }, !0), i.events.on("paste.beforeCleanup", function (e) {
          if (i.helpers.isURL(e)) {
            var n = null;
            return i.opts.linkAlwaysBlank && (i.opts.linkNoOpener && (n ? n += " noopener" : n = "noopener"), i.opts.linkNoReferrer && (n ? n += " noreferrer" : n = "noreferrer")), "<a" + (i.opts.linkAlwaysBlank ? ' target="_blank"' : "") + (n ? ' rel="' + n + '"' : "") + ' href="' + e + '" >' + e + "</a>";
          }
        });
      }
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/video.min.js":
/*!***************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/video.min.js ***!
  \***************************************************************/
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
}(function (Z) {
  Z.extend(Z.FE.POPUP_TEMPLATES, {
    "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]",
    "video.edit": "[_BUTTONS_]",
    "video.size": "[_BUTTONS_][_SIZE_LAYER_]"
  }), Z.extend(Z.FE.DEFAULTS, {
    videoAllowedTypes: ["mp4", "webm", "ogg"],
    videoAllowedProviders: [".*"],
    videoDefaultAlign: "center",
    videoDefaultDisplay: "block",
    videoDefaultWidth: 600,
    videoEditButtons: ["videoReplace", "videoRemove", "|", "videoDisplay", "videoAlign", "videoSize"],
    videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"],
    videoMaxSize: 52428800,
    videoMove: !0,
    videoResize: !0,
    videoResponsive: !1,
    videoSizeButtons: ["videoBack", "|"],
    videoSplitHTML: !1,
    videoTextNear: !0,
    videoUpload: !0,
    videoUploadMethod: "POST",
    videoUploadParam: "file",
    videoUploadParams: {},
    videoUploadToS3: !1,
    videoUploadURL: null
  }), Z.FE.VIDEO_PROVIDERS = [{
    test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
    url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
    url_text: "https://www.youtube.com/embed/$1",
    html: '<iframe width="640" height="360" src="{url}?wmode=opaque" frameborder="0" allowfullscreen></iframe>',
    provider: "youtube"
  }, {
    test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/,
    url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?(\/[a-zA-Z0-9_\-]+)?/i,
    url_text: "https://player.vimeo.com/video/$1",
    html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
    provider: "vimeo"
  }, {
    test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
    url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
    url_text: "https://www.dailymotion.com/embed/video/$1",
    html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
    provider: "dailymotion"
  }, {
    test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
    url_regex: "",
    url_text: "",
    html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
    provider: "yahoo"
  }, {
    test_regex: /^.+(rutube.ru)\/[^_&]+/,
    url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
    url_text: "https://rutube.ru/play/embed/$1",
    html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
    provider: "rutube"
  }, {
    test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/,
    url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/g,
    url_text: "https://play.vidyard.com/$1",
    html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
    provider: "vidyard"
  }], Z.FE.VIDEO_EMBED_REGEX = /^\W*((<iframe.*><\/iframe>)|(<embed.*>))\W*$/i, Z.FE.PLUGINS.video = function (v) {
    var a,
        f,
        p,
        u,
        o,
        i,
        l = "https://i.froala.com/upload",
        d = 2,
        c = 3,
        h = 4,
        g = 5,
        m = 6,
        r = {};

    function b() {
      var e = v.popups.get("video.insert");
      e.find(".fr-video-by-url-layer input").val("").trigger("change");
      var t = e.find(".fr-video-embed-layer textarea");
      t.val("").trigger("change"), (t = e.find(".fr-video-upload-layer input")).val("").trigger("change");
    }

    function s() {
      var e = v.popups.get("video.edit");

      if (e || (e = function () {
        var e = "";

        if (0 < v.opts.videoEditButtons.length) {
          v.opts.videoResponsive && (v.opts.videoEditButtons.splice(v.opts.videoEditButtons.indexOf("videoSize"), 1), v.opts.videoEditButtons.splice(v.opts.videoEditButtons.indexOf("videoDisplay"), 1), v.opts.videoEditButtons.splice(v.opts.videoEditButtons.indexOf("videoAlign"), 1)), e += '<div class="fr-buttons">', e += v.button.buildList(v.opts.videoEditButtons);
          var t = {
            buttons: e += "</div>"
          },
              i = v.popups.create("video.edit", t);
          return v.events.$on(v.$wp, "scroll.video-edit", function () {
            u && v.popups.isVisible("video.edit") && (v.events.disableBlur(), x(u));
          }), i;
        }

        return !1;
      }()), e) {
        v.popups.setContainer("video.edit", v.$sc), v.popups.refresh("video.edit");
        var t = u.find("iframe, embed, video"),
            i = t.offset().left + t.outerWidth() / 2,
            o = t.offset().top + t.outerHeight();
        v.popups.show("video.edit", i, o, t.outerHeight());
      }
    }

    function n(e) {
      if (e) return v.popups.onRefresh("video.insert", b), v.popups.onHide("image.insert", j), !0;
      var t = "";
      v.opts.videoUpload || v.opts.videoInsertButtons.splice(v.opts.videoInsertButtons.indexOf("videoUpload"), 1), 1 < v.opts.videoInsertButtons.length && (t = '<div class="fr-buttons">' + v.button.buildList(v.opts.videoInsertButtons) + "</div>");
      var i,
          o = "",
          r = v.opts.videoInsertButtons.indexOf("videoUpload"),
          s = v.opts.videoInsertButtons.indexOf("videoByURL"),
          n = v.opts.videoInsertButtons.indexOf("videoEmbed");
      0 <= s && (i = " fr-active", (r < s && 0 <= r || n < s && 0 <= n) && (i = ""), o = '<div class="fr-video-by-url-layer fr-layer' + i + '" id="fr-video-by-url-layer-' + v.id + '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-' + v.id + '" type="text" placeholder="' + v.language.translate("Paste in a video URL") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">' + v.language.translate("Insert") + "</button></div></div>");
      var a = "";
      0 <= n && (i = " fr-active", (r < n && 0 <= r || s < n && 0 <= s) && (i = ""), a = '<div class="fr-video-embed-layer fr-layer' + i + '" id="fr-video-embed-layer-' + v.id + '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text' + v.id + '" type="text" placeholder="' + v.language.translate("Embedded Code") + '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">' + v.language.translate("Insert") + "</button></div></div>");
      var d = "";
      0 <= r && (i = " fr-active", (n < r && 0 <= n || s < r && 0 <= s) && (i = ""), d = '<div class="fr-video-upload-layer fr-layer' + i + '" id="fr-video-upload-layer-' + v.id + '"><strong>' + v.language.translate("Drop video") + "</strong><br>(" + v.language.translate("or click") + ')<div class="fr-form"><input type="file" accept="video/' + v.opts.videoAllowedTypes.join(", video/").toLowerCase() + '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-' + v.id + '" role="button"></div></div>');
      var l = {
        buttons: t,
        by_url_layer: o,
        embed_layer: a,
        upload_layer: d,
        progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>'
      },
          f = v.popups.create("video.insert", l);
      return function (o) {
        v.events.$on(o, "dragover dragenter", ".fr-video-upload-layer", function () {
          return Z(this).addClass("fr-drop"), !1;
        }, !0), v.events.$on(o, "dragleave dragend", ".fr-video-upload-layer", function () {
          return Z(this).removeClass("fr-drop"), !1;
        }, !0), v.events.$on(o, "drop", ".fr-video-upload-layer", function (e) {
          e.preventDefault(), e.stopPropagation(), Z(this).removeClass("fr-drop");
          var t = e.originalEvent.dataTransfer;

          if (t && t.files) {
            var i = o.data("instance") || v;
            i.events.disableBlur(), i.video.upload(t.files), i.events.enableBlur();
          }
        }, !0), v.helpers.isIOS() && v.events.$on(o, "touchstart", '.fr-video-upload-layer input[type="file"]', function () {
          Z(this).trigger("click");
        }, !0);
        v.events.$on(o, "change", '.fr-video-upload-layer input[type="file"]', function () {
          if (this.files) {
            var e = o.data("instance") || v;
            e.events.disableBlur(), o.find("input:focus").blur(), e.events.enableBlur(), e.video.upload(this.files);
          }

          Z(this).val("");
        }, !0);
      }(f), f;
    }

    function y(e) {
      v.events.focus(!0), v.selection.restore();
      var t = !1;
      u && (K(), t = !0), v.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video">' + e + "</span>", !1, v.opts.videoSplitHTML), v.popups.hide("video.insert");
      var i = v.$el.find(".fr-jiv");
      i.removeClass("fr-jiv"), i.toggleClass("fr-rv", v.opts.videoResponsive), W(i, v.opts.videoDefaultDisplay, v.opts.videoDefaultAlign), i.toggleClass("fr-draggable", v.opts.videoMove), v.events.trigger(t ? "video.replaced" : "video.inserted", [i]);
    }

    function E() {
      var e = Z(this);
      v.popups.hide("video.insert"), e.removeClass("fr-uploading"), e.parent().next().is("br") && e.parent().next().remove(), x(e.parent()), v.events.trigger("video.loaded", [e.parent()]);
    }

    function w(a, e, d, l, f) {
      v.edit.off(), _("Loading video"), e && (a = v.helpers.sanitizeURL(a));
      C("Loading video"), function () {
        var e, t;

        if (l) {
          v.undo.canDo() || l.find("video").hasClass("fr-uploading") || v.undo.saveStep();
          var i = l.find("video").data("fr-old-src"),
              o = l.data("fr-replaced");
          l.data("fr-replaced", !1), v.$wp ? ((e = l.clone()).find("video").removeData("fr-old-src").removeClass("fr-uploading"), e.find("video").off("canplay"), i && l.find("video").attr("src", i), l.replaceWith(e)) : e = l;

          for (var r = e.find("video").get(0).attributes, s = 0; s < r.length; s++) {
            var n = r[s];
            0 === n.nodeName.indexOf("data-") && e.find("video").removeAttr(n.nodeName);
          }

          if (void 0 !== d) for (t in d) d.hasOwnProperty(t) && "link" != t && e.find("video").attr("data-" + t, d[t]);
          e.find("video").on("canplay", E), e.find("video").attr("src", a), v.edit.on(), F(), v.undo.saveStep(), v.$el.blur(), v.events.trigger(o ? "video.replaced" : "video.inserted", [e, f]);
        } else e = function (e, t, i) {
          var o,
              r = "";
          if (t && void 0 !== t) for (o in t) t.hasOwnProperty(o) && "link" != o && (r += " data-" + o + '="' + t[o] + '"');
          var s = v.opts.videoDefaultWidth;
          s && "auto" != s && (s += "px");
          var n = Z('<span contenteditable="false" draggable="true" class="fr-video fr-dv' + v.opts.videoDefaultDisplay[0] + ("center" != v.opts.videoDefaultAlign ? " fr-fv" + v.opts.videoDefaultAlign[0] : "") + '"><video src="' + e + '" ' + r + (s ? ' style="width: ' + s + ';" ' : "") + " controls>" + v.language.translate("Your browser does not support HTML5 video.") + "</video></span>");
          n.toggleClass("fr-draggable", v.opts.videoMove), v.edit.on(), v.events.focus(!0), v.selection.restore(), v.undo.saveStep(), v.opts.videoSplitHTML ? v.markers.split() : v.markers.insert(), v.html.wrap();
          var a = v.$el.find(".fr-marker");
          return v.node.isLastSibling(a) && a.parent().hasClass("fr-deletable") && a.insertAfter(a.parent()), a.replaceWith(n), v.selection.clear(), n.find("video").get(0).readyState > n.find("video").get(0).HAVE_FUTURE_DATA || v.helpers.isIOS() ? i.call(n.find("video").get(0)) : n.find("video").on("canplaythrough load", i), n;
        }(a, d, E), F(), v.undo.saveStep(), v.events.trigger("video.inserted", [e, f]);
      }();
    }

    function C(e) {
      var t = v.popups.get("video.insert");

      if (t || (t = n()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), u) {
        var i = u.find("video");
        v.popups.setContainer("video.insert", v.$sc);
        var o = i.offset().left + i.width() / 2,
            r = i.offset().top + i.height();
        v.popups.show("video.insert", o, r, i.outerHeight());
      }

      void 0 === e && _(v.language.translate("Uploading"), 0);
    }

    function A(e) {
      var t = v.popups.get("video.insert");

      if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || v.$el.find("video.fr-error").length)) {
        if (v.events.focus(), v.$el.find("video.fr-error").length && (v.$el.find("video.fr-error").parent().remove(), v.undo.saveStep(), v.undo.run(), v.undo.dropRedo()), !v.$wp && u) {
          var i = u;
          z(!0), v.selection.setAfter(i.find("video").get(0)), v.selection.restore();
        }

        v.popups.hide("video.insert");
      }
    }

    function _(e, t) {
      var i = v.popups.get("video.insert");

      if (i) {
        var o = i.find(".fr-video-progress-bar-layer");
        o.find("h3").text(e + (t ? " " + t + "%" : "")), o.removeClass("fr-error"), t ? (o.find("div").removeClass("fr-indeterminate"), o.find("div > span").css("width", t + "%")) : o.find("div").addClass("fr-indeterminate");
      }
    }

    function x(e) {
      L.call(e.get(0));
    }

    function R(e) {
      _("Loading video");

      var t = this.status,
          i = this.response,
          o = this.responseXML,
          r = this.responseText;

      try {
        if (v.opts.videoUploadToS3) {
          if (201 == t) {
            var s = function (e) {
              try {
                var t = Z(e).find("Location").text(),
                    i = Z(e).find("Key").text();
                return !1 === v.events.trigger("video.uploadedToS3", [t, i, e], !0) ? (v.edit.on(), !1) : t;
              } catch (o) {
                return N(h, e), !1;
              }
            }(o);

            s && w(s, !1, [], e, i || o);
          } else N(h, i || o);
        } else if (200 <= t && t < 300) {
          var n = function (e) {
            try {
              if (!1 === v.events.trigger("video.uploaded", [e], !0)) return v.edit.on(), !1;
              var t = JSON.parse(e);
              return t.link ? t : (N(d, e), !1);
            } catch (i) {
              return N(h, e), !1;
            }
          }(r);

          n && w(n.link, !1, n, e, i || r);
        } else N(c, i || r);
      } catch (a) {
        N(h, i || r);
      }
    }

    function S() {
      N(h, this.response || this.responseText || this.responseXML);
    }

    function D(e) {
      if (e.lengthComputable) {
        var t = e.loaded / e.total * 100 | 0;

        _(v.language.translate("Uploading"), t);
      }
    }

    function U() {
      v.edit.on(), A(!0);
    }

    function B(e) {
      if (!v.core.sameInstance(p)) return !0;
      e.preventDefault(), e.stopPropagation();
      var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
          i = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
      if (!t || !i) return !1;

      if ("mousedown" == e.type) {
        var o = v.$oel.get(0).ownerDocument,
            r = o.defaultView || o.parentWindow,
            s = !1;

        try {
          s = r.location != r.parent.location && !(r.$ && r.$.FE);
        } catch (n) {}

        s && r.frameElement && (t += v.helpers.getPX(Z(r.frameElement).offset().left) + r.frameElement.clientLeft, i = e.clientY + v.helpers.getPX(Z(r.frameElement).offset().top) + r.frameElement.clientTop);
      }

      v.undo.canDo() || v.undo.saveStep(), (f = Z(this)).data("start-x", t), f.data("start-y", i), a.show(), v.popups.hideAll(), P();
    }

    function I(e) {
      if (!v.core.sameInstance(p)) return !0;

      if (f) {
        e.preventDefault();
        var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
            i = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
        if (!t || !i) return !1;
        var o = f.data("start-x"),
            r = f.data("start-y");
        f.data("start-x", t), f.data("start-y", i);
        var s = t - o,
            n = i - r,
            a = u.find("iframe, embed, video"),
            d = a.width(),
            l = a.height();
        (f.hasClass("fr-hnw") || f.hasClass("fr-hsw")) && (s = 0 - s), (f.hasClass("fr-hnw") || f.hasClass("fr-hne")) && (n = 0 - n), a.css("width", d + s), a.css("height", l + n), a.removeAttr("width"), a.removeAttr("height"), O();
      }
    }

    function $(e) {
      if (!v.core.sameInstance(p)) return !0;
      f && u && (e && e.stopPropagation(), f = null, a.hide(), O(), s(), v.undo.saveStep());
    }

    function t(e) {
      return '<div class="fr-handler fr-h' + e + '"></div>';
    }

    function k(e, t, i, o) {
      return e.pageX = t, e.pageY = t, B.call(this, e), e.pageX = e.pageX + i * Math.floor(Math.pow(1.1, o)), e.pageY = e.pageY + i * Math.floor(Math.pow(1.1, o)), I.call(this, e), $.call(this, e), ++o;
    }

    function F() {
      var e,
          t = Array.prototype.slice.call(v.el.querySelectorAll("video, .fr-video > *")),
          i = [];

      for (e = 0; e < t.length; e++) i.push(t[e].getAttribute("src")), Z(t[e]).toggleClass("fr-draggable", v.opts.videoMove), "" === t[e].getAttribute("class") && t[e].removeAttribute("class"), "" === t[e].getAttribute("style") && t[e].removeAttribute("style");

      if (o) for (e = 0; e < o.length; e++) i.indexOf(o[e].getAttribute("src")) < 0 && v.events.trigger("video.removed", [Z(o[e])]);
      o = t;
    }

    function O() {
      p || function () {
        var e;

        if (v.shared.$video_resizer ? (p = v.shared.$video_resizer, a = v.shared.$vid_overlay, v.events.on("destroy", function () {
          p.removeClass("fr-active").appendTo(Z("body:first"));
        }, !0)) : (v.shared.$video_resizer = Z('<div class="fr-video-resizer"></div>'), p = v.shared.$video_resizer, v.events.$on(p, "mousedown", function (e) {
          e.stopPropagation();
        }, !0), v.opts.videoResize && (p.append(t("nw") + t("ne") + t("sw") + t("se")), v.shared.$vid_overlay = Z('<div class="fr-video-overlay"></div>'), a = v.shared.$vid_overlay, e = p.get(0).ownerDocument, Z(e).find("body:first").append(a))), v.events.on("shared.destroy", function () {
          p.html("").removeData().remove(), p = null, v.opts.videoResize && (a.remove(), a = null);
        }, !0), v.helpers.isMobile() || v.events.$on(Z(v.o_win), "resize.video", function () {
          z(!0);
        }), v.opts.videoResize) {
          e = p.get(0).ownerDocument, v.events.$on(p, v._mousedown, ".fr-handler", B), v.events.$on(Z(e), v._mousemove, I), v.events.$on(Z(e.defaultView || e.parentWindow), v._mouseup, $), v.events.$on(a, "mouseleave", $);
          var o = 1,
              r = null,
              s = 0;
          v.events.on("keydown", function (e) {
            if (u) {
              var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                  i = e.which;
              (i !== r || 200 < e.timeStamp - s) && (o = 1), (i == Z.FE.KEYCODE.EQUALS || v.browser.mozilla && i == Z.FE.KEYCODE.FF_EQUALS) && t && !e.altKey ? o = k.call(this, e, 1, 1, o) : (i == Z.FE.KEYCODE.HYPHEN || v.browser.mozilla && i == Z.FE.KEYCODE.FF_HYPHEN) && t && !e.altKey && (o = k.call(this, e, 2, -1, o)), r = i, s = e.timeStamp;
            }
          }), v.events.on("keyup", function () {
            o = 1;
          });
        }
      }(), (v.$wp || v.$sc).append(p), p.data("instance", v);
      var e = u.find("iframe, embed, video");
      p.css("top", (v.opts.iframe ? e.offset().top - 1 : e.offset().top - v.$wp.offset().top - 1) + v.$wp.scrollTop()).css("left", (v.opts.iframe ? e.offset().left - 1 : e.offset().left - v.$wp.offset().left - 1) + v.$wp.scrollLeft()).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active");
    }

    function L(e) {
      if (e && "touchend" == e.type && i) return !0;
      if (e && v.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
      if (v.edit.isDisabled()) return !1;

      for (var t = 0; t < Z.FE.INSTANCES.length; t++) Z.FE.INSTANCES[t] != v && Z.FE.INSTANCES[t].events.trigger("video.hideResizer");

      v.toolbar.disable(), v.helpers.isMobile() && (v.events.disableBlur(), v.$el.blur(), v.events.enableBlur()), v.$el.find(".fr-video.fr-active").removeClass("fr-active"), (u = Z(this)).addClass("fr-active"), v.opts.iframe && v.size.syncIframe(), G(), O(), s(), v.selection.clear(), v.button.bulkRefresh(), v.events.trigger("image.hideResizer");
    }

    function z(e) {
      u && (v.shared.vid_exit_flag || !0 === e) && (p.removeClass("fr-active"), v.toolbar.enable(), u.removeClass("fr-active"), u = null, P());
    }

    function e() {
      v.shared.vid_exit_flag = !0;
    }

    function P() {
      v.shared.vid_exit_flag = !1;
    }

    function T(e) {
      var t = e.originalEvent.dataTransfer;

      if (t && t.files && t.files.length) {
        var i = t.files[0];

        if (i && i.type && -1 !== i.type.indexOf("video")) {
          if (!v.opts.videoUpload) return e.preventDefault(), e.stopPropagation(), !1;
          v.markers.remove(), v.markers.insertAtPoint(e.originalEvent), v.$el.find(".fr-marker").replaceWith(Z.FE.MARKERS), v.popups.hideAll();
          var o = v.popups.get("video.insert");
          return o || (o = n()), v.popups.setContainer("video.insert", v.$sc), v.popups.show("video.insert", e.originalEvent.pageX, e.originalEvent.pageY), C(), 0 <= v.opts.videoAllowedTypes.indexOf(i.type.replace(/video\//g, "")) ? M(t.files) : N(m), e.preventDefault(), e.stopPropagation(), !1;
        }
      }
    }

    function M(e) {
      if (void 0 !== e && 0 < e.length) {
        if (!1 === v.events.trigger("video.beforeUpload", [e])) return !1;
        var t,
            i = e[0];
        if ((null === v.opts.videoUploadURL || v.opts.videoUploadURL == l) && !v.opts.videoUploadToS3) return a = i, (d = new FileReader()).addEventListener("load", function () {
          d.result;

          for (var e = atob(d.result.split(",")[1]), t = [], i = 0; i < e.length; i++) t.push(e.charCodeAt(i));

          w(window.URL.createObjectURL(new Blob([new Uint8Array(t)], {
            type: a.type
          })), !1, null, u);
        }, !1), C(), d.readAsDataURL(a), !1;
        if (i.size > v.opts.videoMaxSize) return N(g), !1;
        if (v.opts.videoAllowedTypes.indexOf(i.type.replace(/video\//g, "")) < 0) return N(m), !1;

        if (v.drag_support.formdata && (t = v.drag_support.formdata ? new FormData() : null), t) {
          var o;
          if (!1 !== v.opts.videoUploadToS3) for (o in t.append("key", v.opts.videoUploadToS3.keyStart + new Date().getTime() + "-" + (i.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", i.type), v.opts.videoUploadToS3.params) v.opts.videoUploadToS3.params.hasOwnProperty(o) && t.append(o, v.opts.videoUploadToS3.params[o]);

          for (o in v.opts.videoUploadParams) v.opts.videoUploadParams.hasOwnProperty(o) && t.append(o, v.opts.videoUploadParams[o]);

          t.append(v.opts.videoUploadParam, i);
          var r = v.opts.videoUploadURL;
          v.opts.videoUploadToS3 && (r = v.opts.videoUploadToS3.uploadURL ? v.opts.videoUploadToS3.uploadURL : "https://" + v.opts.videoUploadToS3.region + ".amazonaws.com/" + v.opts.videoUploadToS3.bucket);
          var s = v.core.getXHR(r, v.opts.videoUploadMethod);
          s.onload = function () {
            R.call(s, u);
          }, s.onerror = S, s.upload.onprogress = D, s.onabort = U, C(), v.events.disableBlur(), v.edit.off(), v.events.enableBlur();
          var n = v.popups.get("video.insert");
          n && n.off("abortUpload").on("abortUpload", function () {
            4 != s.readyState && s.abort();
          }), s.send(t);
        }
      }

      var a, d;
    }

    function N(e, t) {
      v.edit.on(), u && u.find("video").addClass("fr-error"), function (e) {
        C();
        var t = v.popups.get("video.insert").find(".fr-video-progress-bar-layer");
        t.addClass("fr-error");
        var i = t.find("h3");
        i.text(e), v.events.disableBlur(), i.focus();
      }(v.language.translate("Something went wrong. Please try again.")), v.events.trigger("video.error", [{
        code: e,
        message: r[e]
      }, t]);
    }

    function V() {
      if (u) {
        var e = v.popups.get("video.size"),
            t = u.find("iframe, embed, video");
        e.find('input[name="width"]').val(t.get(0).style.width || t.attr("width")).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height || t.attr("height")).trigger("change");
      }
    }

    function Y(e) {
      if (e) return v.popups.onRefresh("video.size", V), !0;
      var t = {
        buttons: '<div class="fr-buttons">' + v.button.buildList(v.opts.videoSizeButtons) + "</div>",
        size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-' + v.id + '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-' + v.id + '" type="text" name="width" placeholder="' + v.language.translate("Width") + '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-' + v.id + '" type="text" name="height" placeholder="' + v.language.translate("Height") + '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">' + v.language.translate("Update") + "</button></div></div>"
      },
          i = v.popups.create("video.size", t);
      return v.events.$on(v.$wp, "scroll", function () {
        u && v.popups.isVisible("video.size") && (v.events.disableBlur(), x(u));
      }), i;
    }

    function H(e) {
      if (void 0 === e && (e = u), e) {
        if (e.hasClass("fr-fvl")) return "left";
        if (e.hasClass("fr-fvr")) return "right";
        if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center";

        if ("block" == e.css("display")) {
          if ("left" == e.css("text-algin")) return "left";
          if ("right" == e.css("text-align")) return "right";
        } else {
          if ("left" == e.css("float")) return "left";
          if ("right" == e.css("float")) return "right";
        }
      }

      return "center";
    }

    function X(e) {
      void 0 === e && (e = u);
      var t = e.css("float");
      return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline");
    }

    function K() {
      if (u && !1 !== v.events.trigger("video.beforeRemove", [u])) {
        var e = u;
        v.popups.hideAll(), z(!0), v.selection.setBefore(e.get(0)) || v.selection.setAfter(e.get(0)), e.remove(), v.selection.restore(), v.html.fillEmptyBlocks(), v.events.trigger("video.removed", [e]);
      }
    }

    function j() {
      A();
    }

    function W(e, t, i) {
      !v.opts.htmlUntouched && v.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), e.addClass("fr-fv" + i[0] + " fr-dv" + t[0])) : "inline" == t ? (e.css({
        display: "inline-block"
      }), "center" == i ? e.css({
        "float": "none"
      }) : "left" == i ? e.css({
        "float": "left"
      }) : e.css({
        "float": "right"
      })) : (e.css({
        display: "block",
        clear: "both"
      }), "left" == i ? e.css({
        textAlign: "left"
      }) : "right" == i ? e.css({
        textAlign: "right"
      }) : e.css({
        textAlign: "center"
      }));
    }

    function q() {
      v.$el.find("video").filter(function () {
        return 0 === Z(this).parents("span.fr-video").length;
      }).wrap('<span class="fr-video" contenteditable="false"></span>'), v.$el.find("embed, iframe").filter(function () {
        if (v.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 0 < Z(this).parents("span.fr-video").length) return !1;

        for (var e = Z(this).attr("src"), t = 0; t < Z.FE.VIDEO_PROVIDERS.length; t++) {
          var i = Z.FE.VIDEO_PROVIDERS[t];
          if (i.test_regex.test(e) && new RegExp(v.opts.videoAllowedProviders.join("|")).test(i.provider)) return !0;
        }

        return !1;
      }).map(function () {
        return 0 === Z(this).parents("object").length ? this : Z(this).parents("object").get(0);
      }).wrap('<span class="fr-video" contenteditable="false"></span>');

      for (var e, t, i = v.$el.find("span.fr-video, video"), o = 0; o < i.length; o++) {
        var r = Z(i[o]);
        !v.opts.htmlUntouched && v.opts.useClasses ? ((t = r).hasClass("fr-dvi") || t.hasClass("fr-dvb") || (t.addClass("fr-fv" + H(t)[0]), t.addClass("fr-dv" + X(t)[0])), v.opts.videoTextNear || r.removeClass("fr-dvi").addClass("fr-dvb")) : v.opts.htmlUntouched || v.opts.useClasses || (W(e = r, e.hasClass("fr-dvb") ? "block" : e.hasClass("fr-dvi") ? "inline" : null, e.hasClass("fr-fvl") ? "left" : e.hasClass("fr-fvr") ? "right" : H(e)), e.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl"));
      }

      i.toggleClass("fr-draggable", v.opts.videoMove);
    }

    function G() {
      if (u) {
        v.selection.clear();
        var e = v.doc.createRange();
        e.selectNode(u.get(0)), v.selection.get().addRange(e);
      }
    }

    return r[1] = "Video cannot be loaded from the passed link.", r[d] = "No link in upload response.", r[c] = "Error during file upload.", r[h] = "Parsing response failed.", r[g] = "File is too large.", r[m] = "Video file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", v.shared.vid_exit_flag = !1, {
      _init: function () {
        v.opts.videoResponsive && (v.opts.videoResize = !1), v.events.on("drop", T, !0), v.events.on("mousedown window.mousedown", e), v.events.on("window.touchmove", P), v.events.on("mouseup window.mouseup", z), v.events.on("commands.mousedown", function (e) {
          0 < e.parents(".fr-toolbar").length && z();
        }), v.events.on("video.hideResizer commands.undo commands.redo element.dropped", function () {
          z(!0);
        }), v.helpers.isMobile() && (v.events.$on(v.$el, "touchstart", "span.fr-video", function () {
          i = !1;
        }), v.events.$on(v.$el, "touchmove", function () {
          i = !0;
        })), v.events.on("html.set", q), q(), v.events.$on(v.$el, "mousedown", "span.fr-video", function (e) {
          e.stopPropagation(), (v.browser.msie || v.browser.edge) && (e.target.dragDrop(), L.call(this, e));
        }), v.events.$on(v.$el, "click touchend", "span.fr-video", function (e) {
          if ("false" == Z(this).parents("[contenteditable]:not(.fr-element):not(.fr-img-caption):not(body):first").attr("contenteditable")) return !0;
          L.call(this, e);
        }), v.events.on("keydown", function (e) {
          var t = e.which;
          return !u || t != Z.FE.KEYCODE.BACKSPACE && t != Z.FE.KEYCODE.DELETE ? u && t == Z.FE.KEYCODE.ESC ? (z(!0), e.preventDefault(), !1) : u && t != Z.FE.KEYCODE.F10 && !v.keys.isBrowserAction(e) ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), K(), v.undo.saveStep(), !1);
        }, !0), v.events.on("toolbar.esc", function () {
          if (u) return v.events.disableBlur(), v.events.focus(), !1;
        }, !0), v.events.on("toolbar.focusEditor", function () {
          if (u) return !1;
        }, !0), v.events.on("keydown", function () {
          v.$el.find("span.fr-video:empty").remove();
        }), v.$wp && (F(), v.events.on("contentChanged", F)), n(!0), Y(!0);
      },
      showInsertPopup: function () {
        var e = v.$tb.find('.fr-command[data-cmd="insertVideo"]'),
            t = v.popups.get("video.insert");
        if (t || (t = n()), A(), !t.hasClass("fr-active")) if (v.popups.refresh("video.insert"), v.popups.setContainer("video.insert", v.$tb), e.is(":visible")) {
          var i = e.offset().left + e.outerWidth() / 2,
              o = e.offset().top + (v.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          v.popups.show("video.insert", i, o, e.outerHeight());
        } else v.position.forSelection(t), v.popups.show("video.insert");
      },
      showLayer: function (e) {
        var t,
            i,
            o = v.popups.get("video.insert");

        if (!u && !v.opts.toolbarInline) {
          var r = v.$tb.find('.fr-command[data-cmd="insertVideo"]');
          t = r.offset().left + r.outerWidth() / 2, i = r.offset().top + (v.opts.toolbarBottom ? 10 : r.outerHeight() - 10);
        }

        v.opts.toolbarInline && (i = o.offset().top - v.helpers.getPX(o.css("margin-top")), o.hasClass("fr-above") && (i += o.outerHeight())), o.find(".fr-layer").removeClass("fr-active"), o.find(".fr-" + e + "-layer").addClass("fr-active"), v.popups.show("video.insert", t, i, 0), v.accessibility.focusPopup(o);
      },
      refreshByURLButton: function (e) {
        v.popups.get("video.insert").find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
      },
      refreshEmbedButton: function (e) {
        v.popups.get("video.insert").find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
      },
      refreshUploadButton: function (e) {
        v.popups.get("video.insert").find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0);
      },
      upload: M,
      insertByURL: function (e) {
        void 0 === e && (e = (v.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim());
        var t = null;
        if (/^http/.test(e) || (e = "https://" + e), v.helpers.isURL(e)) for (var i = 0; i < Z.FE.VIDEO_PROVIDERS.length; i++) {
          var o = Z.FE.VIDEO_PROVIDERS[i];

          if (o.test_regex.test(e) && new RegExp(v.opts.videoAllowedProviders.join("|")).test(o.provider)) {
            t = e.replace(o.url_regex, o.url_text), t = o.html.replace(/\{url\}/, t);
            break;
          }
        }
        t ? y(t) : v.events.trigger("video.linkError", [e]);
      },
      insertEmbed: function (e) {
        void 0 === e && (e = v.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 0 !== e.length && Z.FE.VIDEO_EMBED_REGEX.test(e) ? y(e) : v.events.trigger("video.codeError", [e]);
      },
      insert: y,
      align: function (e) {
        u.removeClass("fr-fvr fr-fvl"), !v.opts.htmlUntouched && v.opts.useClasses ? "left" == e ? u.addClass("fr-fvl") : "right" == e && u.addClass("fr-fvr") : W(u, X(), e), G(), O(), s(), v.selection.clear();
      },
      refreshAlign: function (e) {
        if (!u) return !1;
        e.find("> *:first").replaceWith(v.icon.create("video-align-" + H()));
      },
      refreshAlignOnShow: function (e, t) {
        u && t.find('.fr-command[data-param1="' + H() + '"]').addClass("fr-active").attr("aria-selected", !0);
      },
      display: function (e) {
        u.removeClass("fr-dvi fr-dvb"), !v.opts.htmlUntouched && v.opts.useClasses ? "inline" == e ? u.addClass("fr-dvi") : "block" == e && u.addClass("fr-dvb") : W(u, e, H()), G(), O(), s(), v.selection.clear();
      },
      refreshDisplayOnShow: function (e, t) {
        u && t.find('.fr-command[data-param1="' + X() + '"]').addClass("fr-active").attr("aria-selected", !0);
      },
      remove: K,
      hideProgressBar: A,
      showSizePopup: function () {
        var e = v.popups.get("video.size");
        e || (e = Y()), A(), v.popups.refresh("video.size"), v.popups.setContainer("video.size", v.$sc);
        var t = u.find("iframe, embed, video"),
            i = t.offset().left + t.width() / 2,
            o = t.offset().top + t.height();
        v.popups.show("video.size", i, o, t.height());
      },
      replace: function () {
        var e = v.popups.get("video.insert");
        e || (e = n()), v.popups.isVisible("video.insert") || (A(), v.popups.refresh("video.insert"), v.popups.setContainer("video.insert", v.$sc));
        var t = u.offset().left + u.width() / 2,
            i = u.offset().top + u.height();
        v.popups.show("video.insert", t, i, u.outerHeight());
      },
      back: function () {
        u ? (v.events.disableBlur(), u.trigger("click")) : (v.events.disableBlur(), v.selection.restore(), v.events.enableBlur(), v.popups.hide("video.insert"), v.toolbar.showInline());
      },
      setSize: function (e, t) {
        if (u) {
          var i = v.popups.get("video.size"),
              o = u.find("iframe, embed, video");
          o.css("width", e || i.find('input[name="width"]').val()), o.css("height", t || i.find('input[name="height"]').val()), o.get(0).style.width && o.removeAttr("width"), o.get(0).style.height && o.removeAttr("height"), i.find("input:focus").blur(), setTimeout(function () {
            u.trigger("click");
          }, v.helpers.isAndroid() ? 50 : 0);
        }
      },
      get: function () {
        return u;
      }
    };
  }, Z.FE.RegisterCommand("insertVideo", {
    title: "Insert Video",
    undo: !1,
    focus: !0,
    refreshAfterCallback: !1,
    popup: !0,
    callback: function () {
      this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup();
    },
    plugin: "video"
  }), Z.FE.DefineIcon("insertVideo", {
    NAME: "video-camera",
    FA5NAME: "camera"
  }), Z.FE.DefineIcon("videoByURL", {
    NAME: "link"
  }), Z.FE.RegisterCommand("videoByURL", {
    title: "By URL",
    undo: !1,
    focus: !1,
    toggle: !0,
    callback: function () {
      this.video.showLayer("video-by-url");
    },
    refresh: function (e) {
      this.video.refreshByURLButton(e);
    }
  }), Z.FE.DefineIcon("videoEmbed", {
    NAME: "code"
  }), Z.FE.RegisterCommand("videoEmbed", {
    title: "Embedded Code",
    undo: !1,
    focus: !1,
    toggle: !0,
    callback: function () {
      this.video.showLayer("video-embed");
    },
    refresh: function (e) {
      this.video.refreshEmbedButton(e);
    }
  }), Z.FE.DefineIcon("videoUpload", {
    NAME: "upload"
  }), Z.FE.RegisterCommand("videoUpload", {
    title: "Upload Video",
    undo: !1,
    focus: !1,
    toggle: !0,
    callback: function () {
      this.video.showLayer("video-upload");
    },
    refresh: function (e) {
      this.video.refreshUploadButton(e);
    }
  }), Z.FE.RegisterCommand("videoInsertByURL", {
    undo: !0,
    focus: !0,
    callback: function () {
      this.video.insertByURL();
    }
  }), Z.FE.RegisterCommand("videoInsertEmbed", {
    undo: !0,
    focus: !0,
    callback: function () {
      this.video.insertEmbed();
    }
  }), Z.FE.DefineIcon("videoDisplay", {
    NAME: "star"
  }), Z.FE.RegisterCommand("videoDisplay", {
    title: "Display",
    type: "dropdown",
    options: {
      inline: "Inline",
      block: "Break Text"
    },
    callback: function (e, t) {
      this.video.display(t);
    },
    refresh: function (e) {
      this.opts.videoTextNear || e.addClass("fr-hidden");
    },
    refreshOnShow: function (e, t) {
      this.video.refreshDisplayOnShow(e, t);
    }
  }), Z.FE.DefineIcon("video-align", {
    NAME: "align-left"
  }), Z.FE.DefineIcon("video-align-left", {
    NAME: "align-left"
  }), Z.FE.DefineIcon("video-align-right", {
    NAME: "align-right"
  }), Z.FE.DefineIcon("video-align-center", {
    NAME: "align-justify"
  }), Z.FE.DefineIcon("videoAlign", {
    NAME: "align-center"
  }), Z.FE.RegisterCommand("videoAlign", {
    type: "dropdown",
    title: "Align",
    options: {
      left: "Align Left",
      center: "None",
      right: "Align Right"
    },
    html: function () {
      var e = '<ul class="fr-dropdown-list" role="presentation">',
          t = Z.FE.COMMANDS.videoAlign.options;

      for (var i in t) t.hasOwnProperty(i) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="' + i + '" title="' + this.language.translate(t[i]) + '">' + this.icon.create("video-align-" + i) + '<span class="fr-sr-only">' + this.language.translate(t[i]) + "</span></a></li>");

      return e += "</ul>";
    },
    callback: function (e, t) {
      this.video.align(t);
    },
    refresh: function (e) {
      this.video.refreshAlign(e);
    },
    refreshOnShow: function (e, t) {
      this.video.refreshAlignOnShow(e, t);
    }
  }), Z.FE.DefineIcon("videoReplace", {
    NAME: "exchange",
    FA5NAME: "exchange-alt"
  }), Z.FE.RegisterCommand("videoReplace", {
    title: "Replace",
    undo: !1,
    focus: !1,
    popup: !0,
    refreshAfterCallback: !1,
    callback: function () {
      this.video.replace();
    }
  }), Z.FE.DefineIcon("videoRemove", {
    NAME: "trash"
  }), Z.FE.RegisterCommand("videoRemove", {
    title: "Remove",
    callback: function () {
      this.video.remove();
    }
  }), Z.FE.DefineIcon("videoSize", {
    NAME: "arrows-alt"
  }), Z.FE.RegisterCommand("videoSize", {
    undo: !1,
    focus: !1,
    popup: !0,
    title: "Change Size",
    callback: function () {
      this.video.showSizePopup();
    }
  }), Z.FE.DefineIcon("videoBack", {
    NAME: "arrow-left"
  }), Z.FE.RegisterCommand("videoBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    callback: function () {
      this.video.back();
    },
    refresh: function (e) {
      this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    }
  }), Z.FE.RegisterCommand("videoDismissError", {
    title: "OK",
    undo: !1,
    callback: function () {
      this.video.hideProgressBar(!0);
    }
  }), Z.FE.RegisterCommand("videoSetSize", {
    undo: !0,
    focus: !1,
    title: "Update",
    refreshAfterCallback: !1,
    callback: function () {
      this.video.setSize();
    }
  });
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/plugins/word_paste.min.js":
/*!********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/plugins/word_paste.min.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * froala_editor v2.9.1 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2018 Froala Labs
 */
!function (r) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(function (S) {
  S.extend(S.FE.DEFAULTS, {
    wordDeniedTags: [],
    wordDeniedAttrs: [],
    wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent"],
    wordPasteModal: !0,
    wordPasteKeepFormatting: !0
  }), S.FE.PLUGINS.wordPaste = function (A) {
    var l,
        i,
        a = "word_paste";

    function t(e) {
      var t = A.opts.wordAllowedStyleProps;
      e || (A.opts.wordAllowedStyleProps = []), 0 === i.indexOf("<colgroup>") && (i = "<table>" + i + "</table>"), i = function (e, t) {
        0 <= e.indexOf("<html") && (e = e.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1"));
        !function (e) {
          for (var t = e.split("v:shape"), r = 1; r < t.length; r++) {
            var i = t[r],
                n = i.split(' id="')[1];

            if (n && 1 < n.length) {
              n = n.split('"')[0];
              var l = i.split(' o:spid="')[1];
              l && 1 < l.length && (l = l.split('"')[0], c[n] = l);
            }
          }
        }(e);

        var r = new DOMParser().parseFromString(e, "text/html"),
            i = r.head,
            n = r.body,
            a = function (e) {
          var t = {},
              r = e.getElementsByTagName("style");

          if (r.length) {
            var i = r[0],
                n = i.innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
            if (n) for (var l = 0; l < n.length; l++) {
              var a = n[l],
                  s = a.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                  o = a.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
              s = s.replace(/^[\s]|[\s]$/gm, ""), o = o.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/\n|\r|\n\r/g, ""), o = o.replace(/\n|\r|\n\r/g, "");

              for (var d = s.split(", "), g = 0; g < d.length; g++) t[d[g]] = o;
            }
          }

          return t;
        }(i);

        g(n, function (e) {
          if (e.nodeType == Node.TEXT_NODE && /\n|\u00a0|\r/.test(e.data)) {
            if (!/\S| /.test(e.data)) return e.data == S.FE.UNICODE_NBSP ? (e.data = "\u200b", !0) : 1 == e.data.length && 10 == e.data.charCodeAt(0) ? (e.data = " ", !0) : (y(e), !1);
            e.data = e.data.replace(/\n|\r/gi, " ");
          }

          return !0;
        }), g(n, function (e) {
          return e.nodeType != Node.ELEMENT_NODE || "V:IMAGEDATA" != e.tagName && "IMG" != e.tagName || function (e, t) {
            if (!t) return;
            var r;

            if ("IMG" == e.tagName) {
              var i = e.getAttribute("src");
              if (!i || -1 == i.indexOf("file://")) return;
              if (0 === i.indexOf("file://") && A.helpers.isURL(e.getAttribute("alt"))) return e.setAttribute("src", e.getAttribute("alt"));
              (r = c[e.getAttribute("v:shapes")]) || (r = e.getAttribute("v:shapes"));
            } else r = e.parentNode.getAttribute("o:spid");

            if (e.removeAttribute("height"), !r) return;
            n = t, p = {}, f(n, "i", "\\shppict"), f(n, "s", "\\shp{");
            var n;
            var l = p[r.substring(7)];

            if (l) {
              var a = function (e) {
                for (var t = e.match(/[0-9a-f]{2}/gi), r = [], i = 0; i < t.length; i++) r.push(String.fromCharCode(parseInt(t[i], 16)));

                var n = r.join("");
                return btoa(n);
              }(l.image_hex),
                  s = "data:" + l.image_type + ";base64," + a;

              "IMG" === e.tagName ? (e.src = s, e.setAttribute("data-fr-image-pasted", !0)) : S(e.parentNode).before('<img data-fr-image-pasted="true" src="' + s + '" style="' + e.parentNode.getAttribute("style") + '">').remove();
            }
          }(e, t), !0;
        });

        for (var l = n.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), s = l.length - 1; 0 <= s; s--) l[s].previousElementSibling && "LI" === l[s].previousElementSibling.tagName && l[s].previousElementSibling.appendChild(l[s]);

        g(n, function (t) {
          if (t.nodeType == Node.TEXT_NODE) return t.data = t.data.replace(/<br>(\n|\r)/gi, "<br>"), !1;

          if (t.nodeType == Node.ELEMENT_NODE) {
            if (C(t)) {
              var r = t.parentNode,
                  i = t.previousSibling,
                  n = function e(t, r) {
                var i = /[0-9a-zA-Z]./gi;
                var n = !1;
                t.firstElementChild && t.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstChild && !(n = n || i.test(t.firstElementChild.firstElementChild.firstChild.data || "")) && t.firstElementChild.firstElementChild.firstElementChild && t.firstElementChild.firstElementChild.firstElementChild.firstChild && (n = n || i.test(t.firstElementChild.firstElementChild.firstElementChild.firstChild.data || ""));
                var l = n ? "ol" : "ul";
                var a = m(t);
                var s = "<" + l + "><li>" + h(t, r);
                var o = t.nextElementSibling;
                var d = t.parentNode;
                y(t);
                t = null;

                for (; o && C(o);) {
                  var g = o.previousElementSibling,
                      f = m(o);
                  if (a < f) s += e(o, r).outerHTML;else {
                    if (f < a) break;
                    s += "</li><li>" + h(o, r);
                  }

                  if (a = f, o.previousElementSibling || o.nextElementSibling || o.parentNode) {
                    var u = o;
                    o = o.nextElementSibling, y(u), u = null;
                  } else o = g ? g.nextElementSibling : d.firstElementChild;
                }

                s += "</li></" + l + ">";
                var p = document.createElement("div");
                p.innerHTML = s;
                var c = p.firstElementChild;
                return c;
              }(t, a),
                  l = null;

              return (l = i ? i.nextSibling : r.firstChild) ? r.insertBefore(n, l) : r.appendChild(n), !1;
            }

            return u(t, a);
          }

          return t.nodeType != Node.COMMENT_NODE || (y(t), !1);
        }), g(n, function (e) {
          if (e.nodeType == Node.ELEMENT_NODE) {
            var t = e.tagName;

            if (!e.innerHTML && -1 == ["BR", "IMG"].indexOf(t)) {
              for (var r = e.parentNode; r && (y(e), !(e = r).innerHTML);) r = e.parentNode;

              return !1;
            }

            !function (e) {
              var t = e.getAttribute("style");
              if (!t) return;
              (t = N(t)) && ";" != t.slice(-1) && (t += ";");
              var r = t.match(/(^|\S+?):.+?;{1,1}/gi);
              if (!r) return;

              for (var i = {}, n = 0; n < r.length; n++) {
                var l = r[n],
                    a = l.split(":");
                2 == a.length && ("text-align" == a[0] && "SPAN" == e.tagName || (i[a[0]] = a[1]));
              }

              var s = "";

              for (var o in i) if (i.hasOwnProperty(o)) {
                if ("font-size" == o && "pt;" == i[o].slice(-3)) {
                  var d = null;

                  try {
                    d = parseFloat(i[o].slice(0, -3), 10);
                  } catch (g) {}

                  d && (d = Math.round(1.33 * d), i[o] = d + "px;");
                }

                s += o + ":" + i[o];
              }

              s && e.setAttribute("style", s);
            }(e);
          }

          return !0;
        });
        var o = n.outerHTML,
            d = A.opts.htmlAllowedStyleProps;
        return A.opts.htmlAllowedStyleProps = A.opts.wordAllowedStyleProps, o = A.clean.html(o, A.opts.wordDeniedTags, A.opts.wordDeniedAttrs, !1), A.opts.htmlAllowedStyleProps = d, o;
      }(i = i.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function (e, t) {
        for (var r = "", i = 0; i++ < t.length;) r += "&nbsp;";

        return r;
      }), A.paste.getRtfClipboard());
      var r = A.doc.createElement("DIV");
      r.innerHTML = i, A.html.cleanBlankSpaces(r), i = r.innerHTML, i = (i = A.paste.cleanEmptyTagsAndDivs(i)).replace(/\u200b/g, ""), A.modals.hide(a), A.paste.clean(i, !0, !0), A.opts.wordAllowedStyleProps = t;
    }

    function y(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }

    function g(e, t) {
      if (t(e)) for (var r = e.firstChild; r;) {
        var i = r,
            n = r.previousSibling;
        r = r.nextSibling, g(i, t), i.previousSibling || i.nextSibling || i.parentNode || !r || n == r.previousSibling || !r.parentNode ? i.previousSibling || i.nextSibling || i.parentNode || !r || r.previousSibling || r.nextSibling || r.parentNode || (n ? r = n.nextSibling ? n.nextSibling.nextSibling : null : e.firstChild && (r = e.firstChild.nextSibling)) : r = n ? n.nextSibling : e.firstChild;
      }
    }

    function C(e) {
      if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1;

      try {
        if (!e.querySelector('[style="mso-list:Ignore"]')) return !1;
      } catch (t) {
        return !1;
      }

      return !0;
    }

    function m(e) {
      return e.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1");
    }

    function h(e, t) {
      var r = e.cloneNode(!0);

      if (-1 != ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(e.tagName)) {
        var i = document.createElement(e.tagName.toLowerCase());
        i.setAttribute("style", e.getAttribute("style")), i.innerHTML = r.innerHTML, r.innerHTML = i.outerHTML;
      }

      g(r, function (e) {
        return e.nodeType == Node.ELEMENT_NODE && ("mso-list:Ignore" == e.getAttribute("style") && e.parentNode.removeChild(e), u(e, t)), !0;
      });
      var n = r.innerHTML;
      return n = n.replace(/<!--[\s\S]*?-->/gi, "");
    }

    function v(e, t) {
      for (var r = document.createElement(t), i = 0; i < e.attributes.length; i++) {
        var n = e.attributes[i].name;
        r.setAttribute(n, e.getAttribute(n));
      }

      return r.innerHTML = e.innerHTML, e.parentNode.replaceChild(r, e), r;
    }

    function w(e) {
      var t = e.getAttribute("align");
      t && (e.style["text-align"] = t, e.removeAttribute("align"));
    }

    function N(e) {
      return e.replace(/\n|\r|\n\r|&quot;/g, "");
    }

    function x(e, t, r) {
      if (t) {
        var i = e.getAttribute("style");
        i && ";" != i.slice(-1) && (i += ";"), t && ";" != t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
        var n = null;
        n = r ? (i || "") + t : t + (i || ""), e.setAttribute("style", n);
      }
    }

    var p = null;

    function f(e, t, r) {
      for (var i = e.split(r), n = 1; n < i.length; n++) {
        var l = i[n];

        if (1 < (l = l.split("shplid")).length) {
          l = l[1];

          for (var a = "", s = 0; s < l.length && "\\" != l[s] && "{" != l[s] && " " != l[s] && "\r" != l[s] && "\n" != l[s];) a += l[s], s++;

          var o = l.split("bliptag");
          if (o && o.length < 2) continue;
          var d = null;
          if (-1 != o[0].indexOf("pngblip") ? d = "image/png" : -1 != o[0].indexOf("jpegblip") && (d = "image/jpeg"), !d) continue;
          var g,
              f = o[1].split("}");
          if (f && f.length < 2) continue;
          if (2 < f.length && -1 != f[0].indexOf("blipuid")) g = f[1].split(" ");else {
            if ((g = f[0].split(" ")) && g.length < 2) continue;
            g.shift();
          }
          var u = g.join("");
          p[t + a] = {
            image_hex: u,
            image_type: d
          };
        }
      }
    }

    function u(e, t) {
      var r = e.tagName,
          i = r.toLowerCase();
      e.firstElementChild && ("I" == e.firstElementChild.tagName ? v(e.firstElementChild, "em") : "B" == e.firstElementChild.tagName && v(e.firstElementChild, "strong"));
      if (-1 != ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(r)) return y(e), !1;
      var n = -1,
          l = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"];

      for (n = 0; n < l.length; n++) if (-1 != r.indexOf(l[n])) return e.innerHTML && (e.outerHTML = e.innerHTML), y(e), !1;

      if ("TD" != r) {
        var a = e.getAttribute("class");

        if (t && a) {
          var s = (a = N(a)).split(" ");

          for (n = 0; n < s.length; n++) {
            var o = [],
                d = "." + s[n];
            o.push(d), d = i + d, o.push(d);

            for (var g = 0; g < o.length; g++) t[o[g]] && x(e, t[o[g]]);
          }

          e.removeAttribute("class");
        }

        t && t[i] && x(e, t[i]);
      }

      if (-1 != ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(r)) {
        var f = e.getAttribute("class");

        if (f && (t && t[r.toLowerCase() + "." + f] && x(e, t[r.toLowerCase() + "." + f]), -1 != f.toLowerCase().indexOf("mso"))) {
          var u = N(f);
          (u = u.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? e.setAttribute("class", u) : e.removeAttribute("class");
        }

        var p = e.getAttribute("style");

        if (p) {
          var c = p.match(/text-align:.+?[; "]{1,1}/gi);
          c && c[c.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1");
        }

        w(e);
      }

      if ("TR" == r && function (e, t) {
        A.node.clearAttributes(e);

        for (var r = e.firstElementChild, i = 0, n = !1, l = null; r;) {
          r.firstElementChild && -1 != r.firstElementChild.tagName.indexOf("W:") && (r.innerHTML = r.firstElementChild.innerHTML), (l = r.getAttribute("width")) || n || (n = !0), i += parseInt(l, 10), (!r.firstChild || r.firstChild && r.firstChild.data == S.FE.UNICODE_NBSP) && (r.firstChild && y(r.firstChild), r.innerHTML = "<br>");

          for (var a = r.firstElementChild, s = 1 == r.children.length; a;) "P" != a.tagName || C(a) || s && w(a), a = a.nextElementSibling;

          if (t) {
            var o = r.getAttribute("class");

            if (o) {
              var d = (o = N(o)).match(/xl[0-9]+/gi);

              if (d) {
                var g = "." + d[0];
                t[g] && x(r, t[g]);
              }
            }

            t.td && x(r, t.td);
          }

          var f = r.getAttribute("style");
          f && (f = N(f)) && ";" != f.slice(-1) && (f += ";");
          var u = r.getAttribute("valign");

          if (!u && f) {
            var p = f.match(/vertical-align:.+?[; "]{1,1}/gi);
            p && (u = p[p.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"));
          }

          var c = null;

          if (f) {
            var m = f.match(/text-align:.+?[; "]{1,1}/gi);
            m && (c = m[m.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" == c && (c = null);
          }

          var h = null;

          if (f) {
            var v = f.match(/background:.+?[; "]{1,1}/gi);
            v && (h = v[v.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"));
          }

          var b = r.getAttribute("colspan"),
              E = r.getAttribute("rowspan");
          b && r.setAttribute("colspan", b), E && r.setAttribute("rowspan", E), u && (r.style["vertical-align"] = u), c && (r.style["text-align"] = c), h && (r.style["background-color"] = h), l && r.setAttribute("width", l), r = r.nextElementSibling;
        }

        for (r = e.firstElementChild; r;) l = r.getAttribute("width"), n ? r.removeAttribute("width") : r.setAttribute("width", 100 * parseInt(l, 10) / i + "%"), r = r.nextElementSibling;
      }(e, t), "A" != r || e.attributes.getNamedItem("href") || e.attributes.getNamedItem("name") || !e.innerHTML || (e.outerHTML = e.innerHTML), "TD" != r && "TH" != r || e.innerHTML || (e.innerHTML = "<br>"), "TABLE" == r && (e.style.width = "100%"), e.getAttribute("lang") && e.removeAttribute("lang"), e.getAttribute("style") && -1 != e.getAttribute("style").toLowerCase().indexOf("mso")) {
        var m = N(e.getAttribute("style"));
        (m = m.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? e.setAttribute("style", m) : e.removeAttribute("style");
      }

      return !0;
    }

    var c = {};
    return {
      _init: function () {
        A.events.on("paste.wordPaste", function (e) {
          return i = e, A.opts.wordPasteModal ? function () {
            if (!l) {
              var e = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + A.language.translate("Word Paste Detected") + "</h4>",
                  t = (n = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">', n += '<p style="text-align: left;">' + A.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", n += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + A.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + A.language.translate("Keep") + "</button></div>", n += "</div>"),
                  r = A.modals.create(a, e, t),
                  i = r.$body;
              l = r.$modal, r.$modal.addClass("fr-middle"), A.events.bindClick(i, "button.fr-remove-word", function () {
                var e = l.data("instance") || A;
                e.wordPaste.clean();
              }), A.events.bindClick(i, "button.fr-keep-word", function () {
                var e = l.data("instance") || A;
                e.wordPaste.clean(!0);
              }), A.events.$on(S(A.o_win), "resize", function () {
                A.modals.resize(a);
              });
            }

            var n;
            A.modals.show(a), A.modals.resize(a);
          }() : t(A.opts.wordPasteKeepFormatting), !1;
        });
      },
      clean: t
    };
  };
});

/***/ }),

/***/ "./sharedemos/static/libs/froala/js/third_party/embedly.min.js":
/*!*********************************************************************!*\
  !*** ./sharedemos/static/libs/froala/js/third_party/embedly.min.js ***!
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
}(function (b) {
  b.extend(b.FE.POPUP_TEMPLATES, {
    "embedly.insert": "[_BUTTONS_][_URL_LAYER_]",
    "embedly.edit": "[_BUTTONS_]"
  }), b.extend(b.FE.DEFAULTS, {
    embedlyKey: null,
    embedlyInsertButtons: ["embedlyBack", "|"],
    embedlyEditButtons: ["embedlyRemove"],
    embedlyScriptPath: "https://cdn.embedly.com/widgets/platform.js"
  }), b.FE.PLUGINS.embedly = function (r) {
    function t() {
      r.events.on("html.processGet", i), r.events.$on(r.$el, "click touchend", "div.fr-embedly", o), r.events.on("mousedown window.mousedown", u), r.events.on("window.touchmove", m), r.events.on("mouseup window.mouseup", f), r.events.on("commands.mousedown", function (e) {
        0 < e.parents(".fr-toolbar").length && f();
      }), r.events.on("blur video.hideResizer commands.undo commands.redo element.dropped", function () {
        f(!0);
      }), r.events.on("element.beforeDrop", function (e) {
        if (e.hasClass("fr-embedly")) return e.html(e.attr("data-original-embed")), e;
      }), r.events.on("keydown", function (e) {
        var t = e.which;
        return !s || t != b.FE.KEYCODE.BACKSPACE && t != b.FE.KEYCODE.DELETE ? s && t == b.FE.KEYCODE.ESC ? (f(!0), e.preventDefault(), !1) : s && t != b.FE.KEYCODE.F10 && !r.keys.isBrowserAction(e) ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), a(), !1);
      }, !0), r.events.on("toolbar.esc", function () {
        if (s) return r.events.disableBlur(), r.events.focus(), !1;
      }, !0), r.events.on("toolbar.focusEditor", function () {
        if (s) return !1;
      }, !0), r.events.on("snapshot.after", function (e) {
        var t = r.doc.createElement("div");
        t.innerHTML = e.html, i(t), e.html = t.innerHTML;
      }), r.win.embedly && r.win.embedly("on", "card.resize", function (e) {
        var t = b(e);
        t.parents(".fr-embedly").attr("contenteditable", !1).attr("draggable", !0).css("height", t.height()).addClass("fr-draggable"), r.opts.iframe && r.size.syncIframe();
      }), d(!0);
    }

    var s, n;

    function o(e) {
      s = b(this), function () {
        n || function () {
          r.shared.$embedly_resizer ? (n = r.shared.$embedly_resizer, r.shared.$embedly_overlay, r.events.on("destroy", function () {
            n.appendTo(b("body:first"));
          }, !0)) : (r.shared.$embedly_resizer = b('<div class="fr-embedly-resizer"></div>'), n = r.shared.$embedly_resizer, r.events.$on(n, "mousedown", function (e) {
            e.stopPropagation();
          }, !0));
          r.events.on("shared.destroy", function () {
            n.html("").removeData().remove(), n = null;
          }, !0);
        }();
        (r.$wp || r.$sc).append(n), n.data("instance", r), n.css("top", (r.opts.iframe ? s.offset().top - 1 + r.$iframe.position().top : s.offset().top - r.$wp.offset().top - 1) + r.$wp.scrollTop()).css("left", (r.opts.iframe ? s.offset().left - 1 : s.offset().left - r.$wp.offset().left - 1) + r.$wp.scrollLeft()).css("width", s.outerWidth()).css("height", s.height()).addClass("fr-active");
      }(), function () {
        var e = r.popups.get("embedly.edit");
        e || (e = function () {
          var e = "";

          if (0 < r.opts.embedlyEditButtons.length) {
            e += '<div class="fr-buttons">', e += r.button.buildList(r.opts.embedlyEditButtons);
            var t = {
              buttons: e += "</div>"
            },
                n = r.popups.create("embedly.edit", t);
            return r.events.$on(r.$wp, "scroll.emebdly-edit", function () {
              s && r.popups.isVisible("embedly.edit") && (r.events.disableBlur(), o.call(s.get(0)));
            }), n;
          }

          return !1;
        }());

        if (e) {
          r.popups.setContainer("embedly.edit", r.$sc), r.popups.refresh("embedly.edit");
          var t = s.offset().left + s.outerWidth() / 2,
              n = s.offset().top + s.outerHeight();
          r.popups.show("embedly.edit", t, n, s.outerHeight());
        }
      }();
    }

    function i(e) {
      if (e && r.node.hasClass(e, "fr-embedly")) e.innerHTML = e.getAttribute("data-original-embed"), e.removeAttribute("draggable"), e.removeAttribute("contenteditable"), e.setAttribute("class", (e.getAttribute("class") || "").replace("fr-draggable", ""));else if (e && e.nodeType == Node.ELEMENT_NODE) for (var t = e.querySelectorAll(".fr-embedly"), n = 0; n < t.length; n++) i(t[n]);
    }

    function d(e) {
      if (e) return r.popups.onRefresh("embedly.insert", l), !0;
      var t = "";
      0 < r.opts.embedlyInsertButtons.length && (t += '<div class="fr-buttons">', t += r.button.buildList(r.opts.embedlyInsertButtons), t += "</div>");
      var n = {
        buttons: t,
        url_layer: '<div class="fr-embedly-layer fr-active fr-layer" id="fr-embedly-layer-' + r.id + '"><div class="fr-input-line"><input id="fr-embedly-layer-text-' + r.id + '" type="text" placeholder="' + r.language.translate("Paste in a URL to embed") + '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="embedlyInsert" tabIndex="2" role="button">' + r.language.translate("Insert") + "</button></div></div>"
      };
      return r.popups.create("embedly.insert", n);
    }

    function l() {
      r.popups.get("embedly.insert").find(".fr-embedly-layer input").val("").trigger("change");
    }

    function e(e) {
      if (e.length) {
        var t = "<a href='" + e + "' data-card-branding='0' class='embedly-card'" + (r.opts.embedlyKey ? " data-card-key='" + r.opts.embedlyKey + "'" : "") + "></a>";
        r.html.insert('<div class="fr-embedly fr-draggable" draggable="true" contenteditable="false" data-original-embed="' + t + '">' + t + "</div>"), r.popups.hideAll();
      }
    }

    function a() {
      if (s && !1 !== r.events.trigger("embedly.beforeRemove", [s])) {
        var e = s;
        r.popups.hideAll(), f(!0), r.selection.setBefore(e.get(0)) || r.selection.setAfter(e.get(0)), e.remove(), r.selection.restore(), r.html.fillEmptyBlocks(), r.undo.saveStep(), r.events.trigger("video.removed", [e]);
      }
    }

    function f(e) {
      s && (r.shared.embedly_exit_flag || !0 === e) && (n.removeClass("fr-active"), r.toolbar.enable(), s.removeClass("fr-active"), s = null, m());
    }

    function u() {
      r.shared.embedly_exit_flag = !0;
    }

    function m() {
      r.shared.embedly_exit_flag = !1;
    }

    return r.shared.embedly_exit_flag = !1, {
      _init: function () {
        if (!r.$wp) return !1;
        if ("undefined" != typeof embedly) t();else if (r.shared.embedlyLoaded) r.shared.embedlyCallbacks.push(t);else {
          r.shared.embedlyLoaded = !0, r.shared.embedlyCallbacks = [], r.shared.embedlyCallbacks.push(t);
          var e = r.doc.createElement("script");
          e.type = "text/javascript", e.src = r.opts.embedlyScriptPath, e.innerText = "", e.onload = function () {
            if (r.shared.embedlyCallbacks) for (var e = 0; e < r.shared.embedlyCallbacks.length; e++) r.shared.embedlyCallbacks[e]();
          }, r.doc.getElementsByTagName("head")[0].appendChild(e);
        }
      },
      showInsertPopup: function () {
        var e = r.$tb.find('.fr-command[data-cmd="embedly"]'),
            t = r.popups.get("embedly.insert");
        if (t || (t = d()), !t.hasClass("fr-active")) if (r.popups.refresh("embedly.insert"), r.popups.setContainer("embedly.insert", r.$tb), e.is(":visible")) {
          var n = e.offset().left + e.outerWidth() / 2,
              s = e.offset().top + (r.opts.toolbarBottom ? 10 : e.outerHeight() - 10);
          r.popups.show("embedly.insert", n, s, e.outerHeight());
        } else r.position.forSelection(t), r.popups.show("embedly.insert");
      },
      insert: function () {
        e(r.popups.get("embedly.insert").find(".fr-embedly-layer input").val());
      },
      remove: a,
      get: function () {
        return s;
      },
      add: e,
      back: function () {
        s ? (r.events.disableBlur(), s.trigger("click")) : (r.events.disableBlur(), r.selection.restore(), r.events.enableBlur(), r.popups.hide("embedly.insert"), r.toolbar.showInline());
      }
    };
  }, b.FE.DefineIcon("embedly", {
    NAME: "share-alt"
  }), b.FE.RegisterCommand("embedly", {
    undo: !0,
    focus: !0,
    title: "Embed URL",
    popup: !0,
    callback: function () {
      this.popups.isVisible("embedly.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("embedly.insert")) : this.embedly.showInsertPopup();
    },
    plugin: "embedly"
  }), b.FE.RegisterCommand("embedlyInsert", {
    undo: !0,
    focus: !0,
    callback: function () {
      this.embedly.insert();
    }
  }), b.FE.DefineIcon("embedlyRemove", {
    NAME: "trash"
  }), b.FE.RegisterCommand("embedlyRemove", {
    title: "Remove",
    undo: !1,
    callback: function () {
      this.embedly.remove();
    }
  }), b.FE.DefineIcon("embedlyBack", {
    NAME: "arrow-left"
  }), b.FE.RegisterCommand("embedlyBack", {
    title: "Back",
    undo: !1,
    focus: !1,
    back: !0,
    callback: function () {
      this.embedly.back();
    },
    refresh: function (e) {
      this.embedly.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"));
    }
  });
});

/***/ })

}]);
//# sourceMappingURL=6.35ffc6.js.map