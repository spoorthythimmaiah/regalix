(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./node_modules/airbrake-js/lib/client.js":
/*!************************************************!*\
  !*** ./node_modules/airbrake-js/lib/client.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var Client, Promise, makeOnErrorHandler, merge;

  __webpack_require__(/*! ./internal/compat */ "./node_modules/airbrake-js/lib/internal/compat.js");

  merge = __webpack_require__(/*! ./internal/merge */ "./node_modules/airbrake-js/lib/internal/merge.js");

  Promise = __webpack_require__(/*! ./internal/promise */ "./node_modules/airbrake-js/lib/internal/promise.js");

  makeOnErrorHandler = function(notifier) {
    return function(message, file, line, column, error) {
      if (error) {
        return notifier.notify(error);
      } else {
        return notifier.notify({
          error: {
            message: message,
            fileName: file,
            lineNumber: line,
            columnNumber: column || 0
          }
        });
      }
    };
  };

  Client = (function() {
    function Client(opts) {
      var reporter;
      if (opts == null) {
        opts = {};
      }
      this._projectId = opts.projectId || 0;
      this._projectKey = opts.projectKey || '';
      this._host = opts.host || 'https://api.airbrake.io';
      this._processor = null;
      this._reporters = [];
      this._filters = [];
      if (opts.processor !== void 0) {
        this._processor = opts.processor;
      } else {
        this._processor = __webpack_require__(/*! ./processors/stack */ "./node_modules/airbrake-js/lib/processors/stack.js");
      }
      if (opts.reporter !== void 0) {
        this.addReporter(opts.reporter);
      } else {
        if ('withCredentials' in new global.XMLHttpRequest()) {
          reporter = 'compat';
        } else {
          reporter = 'jsonp';
        }
        this.addReporter(reporter);
      }
      this.addFilter(__webpack_require__(/*! ./internal/default_filter */ "./node_modules/airbrake-js/lib/internal/default_filter.js"));
      this.onerror = makeOnErrorHandler(this);
      if (global.onerror == null) {
        global.onerror = this.onerror;
      }
    }

    Client.prototype.setProject = function(id, key) {
      this._projectId = id;
      return this._projectKey = key;
    };

    Client.prototype.setHost = function(host) {
      return this._host = host;
    };

    Client.prototype.addContext = function(context) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: addContext is deprecated, please use addFilter');
        }
      }
      return this.addFilter(function(notice) {
        notice.context = merge({}, context, notice.context);
        return notice;
      });
    };

    Client.prototype.setEnvironmentName = function(envName) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: setEnvironmentName is deprecated, please use addFilter');
        }
      }
      return this.addFilter(function(notice) {
        if (notice.context.environment == null) {
          notice.context.environment = envName;
        }
        return notice;
      });
    };

    Client.prototype.addParams = function(params) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: addParams is deprecated, please use addFilter');
        }
      }
      return this.addFilter(function(notice) {
        notice.params = merge({}, params, notice.params);
        return notice;
      });
    };

    Client.prototype.addEnvironment = function(env) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: addEnvironment is deprecated, please use addFilter');
        }
      }
      return this.addFilter(function(notice) {
        notice.environment = merge({}, env, notice.environment);
        return notice;
      });
    };

    Client.prototype.addSession = function(session) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: addSession is deprecated, please use addFilter');
        }
      }
      return this.addFilter(function(notice) {
        notice.session = merge({}, session, notice.session);
        return notice;
      });
    };

    Client.prototype.addReporter = function(reporter) {
      switch (reporter) {
        case 'compat':
          reporter = __webpack_require__(/*! ./reporters/compat */ "./node_modules/airbrake-js/lib/reporters/compat.js");
          break;
        case 'xhr':
          reporter = __webpack_require__(/*! ./reporters/xhr */ "./node_modules/airbrake-js/lib/reporters/xhr.js");
          break;
        case 'jsonp':
          reporter = __webpack_require__(/*! ./reporters/jsonp */ "./node_modules/airbrake-js/lib/reporters/jsonp.js");
      }
      return this._reporters.push(reporter);
    };

    Client.prototype.addFilter = function(filter) {
      return this._filters.push(filter);
    };

    Client.prototype.notify = function(err) {
      var defContext, promise, ref;
      defContext = {
        language: 'JavaScript',
        sourceMapEnabled: true
      };
      if ((ref = global.navigator) != null ? ref.userAgent : void 0) {
        defContext.userAgent = global.navigator.userAgent;
      }
      if (global.location) {
        defContext.url = String(global.location);
        defContext.rootDirectory = global.location.protocol + '//' + global.location.host;
      }
      promise = new Promise();
      this._processor(err.error || err, (function(_this) {
        return function(processorName, errInfo) {
          var filterFn, j, k, len, len1, n, notice, opts, ref1, ref2, reporterFn;
          notice = {
            errors: [errInfo],
            context: merge(defContext, err.context),
            params: err.params || {},
            environment: err.environment || {},
            session: err.session || {}
          };
          notice.context.notifier = {
            name: 'airbrake-js-' + processorName,
            version: '0.5.8',
            url: 'https://github.com/airbrake/airbrake-js'
          };
          ref1 = _this._filters;
          for (j = 0, len = ref1.length; j < len; j++) {
            filterFn = ref1[j];
            n = filterFn(notice);
            if (n === null || n === false) {
              return;
            }
            if (n.errors != null) {
              notice = n;
            } else {
              if (typeof console !== "undefined" && console !== null) {
                if (typeof console.warn === "function") {
                  console.warn('airbrake: filter must return notice or null to ignore the notice');
                }
              }
            }
          }
          opts = {
            projectId: _this._projectId,
            projectKey: _this._projectKey,
            host: _this._host
          };
          ref2 = _this._reporters;
          for (k = 0, len1 = ref2.length; k < len1; k++) {
            reporterFn = ref2[k];
            reporterFn(notice, opts, promise);
          }
        };
      })(this));
      return promise;
    };

    Client.prototype.push = function(err) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof console.warn === "function") {
          console.warn('airbrake: push is deprecated, please use notify');
        }
      }
      return this.notify(err);
    };

    Client.prototype._wrapArguments = function(args) {
      var arg, i, j, len;
      for (i = j = 0, len = args.length; j < len; i = ++j) {
        arg = args[i];
        if (typeof arg === 'function') {
          args[i] = this.wrap(arg);
        }
      }
      return args;
    };

    Client.prototype.wrap = function(fn) {
      var airbrakeWrapper, prop, self;
      if (fn.__airbrake__) {
        return fn;
      }
      self = this;
      airbrakeWrapper = function() {
        var args, exc;
        args = self._wrapArguments(arguments);
        try {
          return fn.apply(this, args);
        } catch (_error) {
          exc = _error;
          args = Array.prototype.slice.call(arguments);
          self.notify({
            error: exc,
            params: {
              "arguments": args
            }
          });
          return null;
        }
      };
      for (prop in fn) {
        if (fn.hasOwnProperty(prop)) {
          airbrakeWrapper[prop] = fn[prop];
        }
      }
      airbrakeWrapper.__airbrake__ = true;
      airbrakeWrapper.__inner__ = fn;
      return airbrakeWrapper;
    };

    return Client;

  })();

  module.exports = Client;

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/compat.js":
/*!*********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/compat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base;

  if ((base = Array.prototype).indexOf == null) {
    base.indexOf = function(obj, start) {
      var i, j, ref, ref1;
      start = start || 0;
      for (i = j = ref = start, ref1 = this.length; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/default_filter.js":
/*!*****************************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/default_filter.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var IGNORED_MESSAGES, filter,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  IGNORED_MESSAGES = ['Script error', 'Script error.'];

  filter = function(notice) {
    var msg;
    msg = notice.errors[0].message;
    if (indexOf.call(IGNORED_MESSAGES, msg) >= 0) {
      return null;
    }
    return notice;
  };

  module.exports = filter;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/jsonify_notice.js":
/*!*****************************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/jsonify_notice.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var jsonifyNotice, truncate, truncateObj;

  truncate = __webpack_require__(/*! ./truncate */ "./node_modules/airbrake-js/lib/internal/truncate.js");

  truncateObj = function(obj, n) {
    var dst, key;
    if (n == null) {
      n = 1000;
    }
    dst = {};
    for (key in obj) {
      dst[key] = truncate(obj[key], n = n);
    }
    return dst;
  };

  jsonifyNotice = function(notice, n, maxLength) {
    var err, s;
    if (n == null) {
      n = 1000;
    }
    if (maxLength == null) {
      maxLength = 64000;
    }
    while (true) {
      notice.params = truncateObj(notice.params, n = n);
      notice.environment = truncateObj(notice.environment, n = n);
      notice.session = truncateObj(notice.session, n = n);
      s = JSON.stringify(notice);
      if (s.length < maxLength) {
        return s;
      }
      if (n === 0) {
        break;
      }
      n = Math.floor(n / 2);
    }
    err = new Error("airbrake-js: cannot jsonify notice (length=" + s.length + " maxLength=" + maxLength + ")");
    err.params = {
      json: s.slice(0, +Math.floor(n / 2) + 1 || 9e9) + '...'
    };
    throw err;
  };

  module.exports = jsonifyNotice;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/merge.js":
/*!********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/merge.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var merge;

  merge = function() {
    var dst, i, key, len, obj, objs;
    objs = Array.prototype.slice.call(arguments);
    dst = objs.shift() || {};
    for (i = 0, len = objs.length; i < len; i++) {
      obj = objs[i];
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          dst[key] = obj[key];
        }
      }
    }
    return dst;
  };

  module.exports = merge;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/promise.js":
/*!**********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/promise.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var Promise;

  Promise = (function() {
    function Promise(executor) {
      var reject, resolve;
      this._onResolved = [];
      this._onRejected = [];
      resolve = (function(_this) {
        return function() {
          return _this.resolve.apply(_this, arguments);
        };
      })(this);
      reject = (function(_this) {
        return function() {
          return _this.reject.apply(_this, arguments);
        };
      })(this);
      if (executor != null) {
        executor(resolve, reject);
      }
    }

    Promise.prototype.then = function(onResolved, onRejected) {
      if (onResolved) {
        if (this._resolvedWith != null) {
          onResolved(this._resolvedWith);
        }
        this._onResolved.push(onResolved);
      }
      if (onRejected) {
        if (this._rejectedWith != null) {
          onRejected(this._resolvedWith);
        }
        this._onRejected.push(onRejected);
      }
      return this;
    };

    Promise.prototype["catch"] = function(onRejected) {
      if (this._rejectedWith != null) {
        onRejected(this._rejectedWith);
      }
      this._onRejected.push(onRejected);
      return this;
    };

    Promise.prototype.resolve = function() {
      var fn, i, len, ref;
      this._resolvedWith = arguments;
      ref = this._onResolved;
      for (i = 0, len = ref.length; i < len; i++) {
        fn = ref[i];
        fn.apply(this, this._resolvedWith);
      }
      return this;
    };

    Promise.prototype.reject = function() {
      var fn, i, len, ref;
      this._rejectedWith = arguments;
      ref = this._onRejected;
      for (i = 0, len = ref.length; i < len; i++) {
        fn = ref[i];
        fn.apply(this, this._rejectedWith);
      }
      return this;
    };

    return Promise;

  })();

  module.exports = Promise;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/internal/truncate.js":
/*!***********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/internal/truncate.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var getAttr, truncate;

  getAttr = function(obj, attr) {
    var exc;
    try {
      return obj[attr];
    } catch (_error) {
      exc = _error;
      return void 0;
    }
  };

  truncate = function(value, n, depth) {
    var fn, getPath, keys, nn, seen;
    if (n == null) {
      n = 1000;
    }
    if (depth == null) {
      depth = 5;
    }
    nn = 0;
    keys = [];
    seen = [];
    getPath = function(value) {
      var i, index, j, path, ref;
      index = seen.indexOf(value);
      path = [keys[index]];
      for (i = j = ref = index; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
        if (seen[i] && getAttr(seen[i], path[0]) === value) {
          value = seen[i];
          path.unshift(keys[i]);
        }
      }
      return '~' + path.join('.');
    };
    fn = function(value, key, dd) {
      var dst, el, i, j, len, val;
      if (key == null) {
        key = '';
      }
      if (dd == null) {
        dd = 0;
      }
      nn++;
      if (nn > n) {
        return '[Truncated]';
      }
      if (value === null || value === void 0) {
        return value;
      }
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'function':
          return value;
        case 'object':
          break;
        default:
          return String(value);
      }
      if (value instanceof Boolean || value instanceof Number || value instanceof String || value instanceof Date || value instanceof RegExp) {
        return value;
      }
      if (seen.indexOf(value) >= 0) {
        return "[Circular " + (getPath(value)) + "]";
      }
      dd++;
      if (dd > depth) {
        return '[Truncated]';
      }
      keys.push(key);
      seen.push(value);
      nn--;
      if (Object.prototype.toString.apply(value) === '[object Array]') {
        dst = [];
        for (i = j = 0, len = value.length; j < len; i = ++j) {
          el = value[i];
          nn++;
          if (nn >= n) {
            break;
          }
          dst.push(fn(el, key = i, dd));
        }
        return dst;
      }
      dst = {};
      for (key in value) {
        if (!Object.prototype.hasOwnProperty.call(value, key)) {
          continue;
        }
        nn++;
        if (nn >= n) {
          break;
        }
        val = getAttr(value, key);
        if (val !== void 0) {
          dst[key] = fn(val, key = key, dd);
        }
      }
      return dst;
    };
    return fn(value);
  };

  module.exports = truncate;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/processors/stack.js":
/*!**********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/processors/stack.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var processor, rules, typeMessageRe;

  rules = [
    {
      name: 'v8',
      re: /^\s*at\s(.+?)\s\((?:(?:(.+):(\d+):(\d+))|(.+))\)$/,
      fn: function(m) {
        return {
          "function": m[1],
          file: m[2] || m[5],
          line: m[3] && parseInt(m[3], 10) || 0,
          column: m[4] && parseInt(m[4], 10) || 0
        };
      }
    }, {
      name: 'firefox30',
      re: /^(.*)@(.+):(\d+):(\d+)$/,
      fn: function(m) {
        var evaledRe, file, func, mm;
        func = m[1];
        file = m[2];
        evaledRe = /^(\S+)\s(line\s\d+\s>\seval.*)$/;
        if (mm = file.match(evaledRe)) {
          if (func.length > 0) {
            func = func + ' ' + mm[2];
          } else {
            func = mm[2];
          }
          file = mm[1];
        }
        return {
          "function": func,
          file: file,
          line: parseInt(m[3], 10),
          column: parseInt(m[4], 10)
        };
      }
    }, {
      name: 'firefox14',
      re: /^(.*)@(.+):(\d+)$/,
      fn: function(m, i, e) {
        var column;
        if (i === 0) {
          column = e.columnNumber || 0;
        } else {
          column = 0;
        }
        return {
          "function": m[1],
          file: m[2],
          line: parseInt(m[3], 10),
          column: column
        };
      }
    }, {
      name: 'v8-short',
      re: /^\s*at\s(.+):(\d+):(\d+)$/,
      fn: function(m) {
        return {
          "function": '',
          file: m[1],
          line: parseInt(m[2], 10),
          column: parseInt(m[3], 10)
        };
      }
    }, {
      name: 'phantomjs',
      re: /^\s*at\s(.+):(\d+)$/,
      fn: function(m) {
        return {
          "function": '',
          file: m[1],
          line: parseInt(m[2], 10),
          column: 0
        };
      }
    }, {
      name: 'default',
      re: /.+/,
      fn: function(m) {
        return {
          "function": m[0],
          file: '',
          line: 0,
          column: 0
        };
      }
    }
  ];

  typeMessageRe = /^\S+:\s.+$/;

  processor = function(e, cb) {
    var backtrace, i, j, k, len, len1, line, lines, m, msg, processorName, rule, stack, type, uncaughtExcRe;
    processorName = 'nostack';
    stack = e.stack || '';
    lines = stack.split('\n');
    backtrace = [];
    for (i = j = 0, len = lines.length; j < len; i = ++j) {
      line = lines[i];
      if (line === '') {
        continue;
      }
      for (k = 0, len1 = rules.length; k < len1; k++) {
        rule = rules[k];
        m = line.match(rule.re);
        if (!m) {
          continue;
        }
        processorName = rule.name;
        backtrace.push(rule.fn(m, i, e));
        break;
      }
    }
    if ((processorName === 'v8' || processorName === 'v8-short') && backtrace.length > 0 && backtrace[0]["function"].match(typeMessageRe)) {
      backtrace = backtrace.slice(1);
    }
    if (backtrace.length === 0 && ((e.fileName != null) || (e.lineNumber != null) || (e.columnNumber != null))) {
      backtrace.push({
        "function": '',
        file: e.fileName || '',
        line: parseInt(e.lineNumber, 10) || 0,
        column: parseInt(e.columnNumber, 10) || 0
      });
    }
    if (backtrace.length === 0 && ((e.filename != null) || (e.lineno != null) || (e.column != null) || (e.colno != null))) {
      backtrace.push({
        "function": '',
        file: e.filename || '',
        line: parseInt(e.lineno, 10) || 0,
        column: parseInt(e.column || e.colno, 10) || 0
      });
    }
    if (e.message != null) {
      msg = e.message;
    } else {
      msg = String(e);
    }
    if ((e.name != null) && e.name !== '') {
      type = e.name;
      msg = type + ': ' + msg;
    } else {
      uncaughtExcRe = /^Uncaught\s(.+?):\s.+$/;
      m = msg.match(uncaughtExcRe);
      if (m) {
        type = m[1];
      } else {
        type = '';
      }
    }
    return cb(processorName, {
      'type': type,
      'message': msg,
      'backtrace': backtrace
    });
  };

  module.exports = processor;

}).call(this);


/***/ }),

/***/ "./node_modules/airbrake-js/lib/reporters/compat.js":
/*!**********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/reporters/compat.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var jsonifyNotice, report;

  jsonifyNotice = __webpack_require__(/*! ../internal/jsonify_notice */ "./node_modules/airbrake-js/lib/internal/jsonify_notice.js");

  report = function(notice, opts, promise) {
    var payload, req, url;
    url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey;
    payload = jsonifyNotice(notice);
    req = new global.XMLHttpRequest();
    req.open('POST', url, true);
    req.send(payload);
    return req.onreadystatechange = function() {
      var resp;
      if (req.readyState === 4 && req.status === 200) {
        resp = JSON.parse(req.responseText);
        notice.id = resp.id;
        return promise.resolve(notice);
      }
    };
  };

  module.exports = report;

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/airbrake-js/lib/reporters/jsonp.js":
/*!*********************************************************!*\
  !*** ./node_modules/airbrake-js/lib/reporters/jsonp.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var cbCount, jsonifyNotice, report;

  jsonifyNotice = __webpack_require__(/*! ../internal/jsonify_notice */ "./node_modules/airbrake-js/lib/internal/jsonify_notice.js");

  cbCount = 0;

  report = function(notice, opts, promise) {
    var cbName, document, head, payload, removeScript, script, url;
    cbCount++;
    cbName = 'airbrakeCb' + String(cbCount);
    global[cbName] = function(resp) {
      var _;
      notice.id = resp.id;
      promise.resolve(notice);
      try {
        return delete global[cbName];
      } catch (_error) {
        _ = _error;
        return global[cbName] = void 0;
      }
    };
    payload = encodeURIComponent(jsonifyNotice(notice));
    url = opts.host + "/api/v3/projects/" + opts.projectId + "/create-notice?key=" + opts.projectKey + "&callback=" + cbName + "&body=" + payload;
    document = global.document;
    head = document.getElementsByTagName('head')[0];
    script = document.createElement('script');
    script.src = url;
    removeScript = function() {
      return head.removeChild(script);
    };
    script.onload = removeScript;
    script.onerror = removeScript;
    return head.appendChild(script);
  };

  module.exports = report;

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/airbrake-js/lib/reporters/xhr.js":
/*!*******************************************************!*\
  !*** ./node_modules/airbrake-js/lib/reporters/xhr.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function() {
  var jsonifyNotice, report;

  jsonifyNotice = __webpack_require__(/*! ../internal/jsonify_notice */ "./node_modules/airbrake-js/lib/internal/jsonify_notice.js");

  report = function(notice, opts, promise) {
    var payload, req, url;
    url = opts.host + "/api/v3/projects/" + opts.projectId + "/notices?key=" + opts.projectKey;
    payload = jsonifyNotice(notice);
    req = new global.XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(payload);
    return req.onreadystatechange = function() {
      var resp;
      if (req.readyState === 4 && req.status === 201) {
        resp = JSON.parse(req.responseText);
        notice.id = resp.id;
        return promise.resolve(notice);
      }
    };
  };

  module.exports = report;

}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

}]);
//# sourceMappingURL=11.03ca5a.js.map