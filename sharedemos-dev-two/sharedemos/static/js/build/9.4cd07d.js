(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

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

/***/ "./sharedemos/static/js/quiz/collections/quiz.js":
/*!*******************************************************!*\
  !*** ./sharedemos/static/js/quiz/collections/quiz.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../models/quiz */ "./sharedemos/static/js/quiz/models/quiz.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone, Quiz) {
  'use strict';

  var QuizCollection = Backbone.Collection.extend({
    model: Quiz,
    urlRoot: "/api/quiz"
  });
  return Quiz;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/models/option.js":
/*!****************************************************!*\
  !*** ./sharedemos/static/js/quiz/models/option.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var QuizOption = Backbone.Model.extend({
    urlRoot: "/api/quiz-option"
  });
  return QuizOption;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/models/question.js":
/*!******************************************************!*\
  !*** ./sharedemos/static/js/quiz/models/question.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var QuizQuestion = Backbone.Model.extend({
    urlRoot: "/api/quiz-question"
  });
  return QuizQuestion;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/models/quiz.js":
/*!**************************************************!*\
  !*** ./sharedemos/static/js/quiz/models/quiz.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Quiz = Backbone.Model.extend({
    urlRoot: "/api/quiz"
  });
  return Quiz;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/models/quiz_activity.js":
/*!***********************************************************!*\
  !*** ./sharedemos/static/js/quiz/models/quiz_activity.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var QuizActivity = Backbone.Model.extend({
    urlRoot: "/quiz-activity"
  });
  return QuizActivity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/models/quiz_question_activity.js":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/quiz/models/quiz_question_activity.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var QuizQuestionActivity = Backbone.Model.extend({
    urlRoot: "/quiz-question-activity"
  });
  return QuizQuestionActivity;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/routers/router.js":
/*!*****************************************************!*\
  !*** ./sharedemos/static/js/quiz/routers/router.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../views/home */ "./sharedemos/static/js/quiz/views/home.js"), __webpack_require__(/*! ../views/quiz */ "./sharedemos/static/js/quiz/views/quiz.js"), __webpack_require__(/*! ../views/edit */ "./sharedemos/static/js/quiz/views/edit.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, Backbone, Common, HomeView, QuizView, QuizEditView) {
  'use strict';

  var QuizRouter = Backbone.Router.extend({
    routes: {
      "": "home",
      ":quiz": "routeHandler"
    },
    initialize: function () {
      this.view = null;
      return this;
    },
    home: function () {
      this.loadView(new HomeView());
    },
    routeHandler: function (quiz) {
      this.loadView(new QuizView(quiz), quiz);
    },
    loadView: function (view, quiz) {
      if (this.view) {
        this.view.undelegateEvents();
      }

      if (quiz) {
        document.quiz_session = Common.generateUUID();
      }

      this.view = view;
    }
  });
  return QuizRouter;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/add_blocks.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/add_blocks.handlebars ***!
  \*******************************************************************/
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

  return "    <div class=\"checklist-item option-item\" option-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ">\n        <div class=\"check\"></div>\n        <div class=\"title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":8},"end":{"line":9,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"info-block\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":12},"end":{"line":13,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":12},"end":{"line":16,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"arrow\"></div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":9,"column":8}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"arrow\"></div>\n        ";
},"7":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"description\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"order-block option-item\" option-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ">\n        <div class=\"order-info\">\n            <h2>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</h2>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":45,"column":12},"end":{"line":47,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" >\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"match-wrap left\">\n        <div class=\"match-block option-item\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":54,"column":45},"end":{"line":54,"column":128}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":55,"column":12},"end":{"line":57,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":12},"end":{"line":60,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"divider\"></div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " image"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":74},"end":{"line":54,"column":108}}})) != null ? stack1 : "")
    + " ";
},"16":function(container,depth0,helpers,partials,data) {
    return "_text";
},"18":function(container,depth0,helpers,partials,data) {
    return "text";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</p>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\" >\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"match-wrap right\">\n        <div class=\"match-block\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":68,"column":33},"end":{"line":68,"column":118}}})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":69,"column":12},"end":{"line":71,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":72,"column":12},"end":{"line":74,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " image"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":68,"column":63},"end":{"line":68,"column":98}}})) != null ? stack1 : "")
    + " ";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</p>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\" >\n";
},"31":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"question-wrap active\" id=\"question_block_"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"index") : depth0), depth0))
    + "\" question-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"question_id") : depth0), depth0))
    + "\" data-points=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"points") : depth0), depth0))
    + "\">\n                <div class=\"question\">\n                    \n                </div>\n                <div class=\"choose-answer capital-letter\"></div>\n                <div class=\"options-wrap\" data-option-type="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + ">\n                    <div class=\"change-answer-type capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"change the answer type",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":86,"column":67},"end":{"line":86,"column":100}}}))
    + "\n                    </div>\n                </div>\n                <div class=\"navigation-wrap\">\n                    <div class=\"quiz-nav prev\"></div>\n                    <div class=\"quiz-nav next capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"next question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":91,"column":62},"end":{"line":91,"column":86}}}))
    + "</div>\n                    <div class=\"quiz-nav skip active\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"skip",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":92,"column":54},"end":{"line":92,"column":69}}}))
    + "</div>\n                </div>\n            </div>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"title\"><span>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"index") : depth0), depth0))
    + ".</span> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</div>\n    <div class=\"description\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":99,"column":7},"end":{"line":126,"column":11}}})) != null ? stack1 : "");
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","image",{"name":"compare","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":100,"column":12},"end":{"line":102,"column":24}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","video",{"name":"compare","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":103,"column":12},"end":{"line":108,"column":24}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","audio",{"name":"compare","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":109,"column":12},"end":{"line":125,"column":24}}})) != null ? stack1 : "");
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img class= \"question-icon\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" media-type=\"image\">\n";
},"37":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               <video class= \"question-icon\" poster=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\" controls>\n                  <source src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" type=\"video/mp4\">\n                Your browser does not support the video tag.\n                </video>\n";
},"39":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class = 'audio-icon' align=\"left\"> <img  class= \"question-icon\" src = \""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"></div>\n               <audio >\n                  <source src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" type=\"audio/mpeg\">\n                </audio>\n                <div class=\"v-audio\">\n                <div class=\"audio-backward\"></div>\n                <div class=\"audio-control play\"></div>\n                <div class=\"audio-farward\"></div>\n                <div class=\"audio-mute\"></div>\n                <div class=\"audio-currentTime\">00:00</div>\n                <div class=\"audio-timeline\">\n                    <div class=\"audio-progress\"></div>\n                </div>\n                <div class=\"audio-duration\">00:00</div>\n                </div>\n";
},"41":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"navigation-wrap previous_button\">\n        <div class=\"quiz-nav prev\"></div>\n    </div>\n";
},"43":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <li quiz-id="
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + ">\n        <div class='quiz-list-wrap'>\n            <div class=\"banner\">\n                <img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"icon") : stack1)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n                <label>"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</label>\n                <div class=\"banner-overlay\"></div>\n            </div>\n            <div class=\"info-block\">\n                <div class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\n                <div class=\"description\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\n                <div data-slug='"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"slug") : stack1), depth0))
    + "' class=\"explore quiz\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"take quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":146,"column":68},"end":{"line":146,"column":88}}}))
    + "</div>\n            </div>\n            <div class=\"footer\">\n                <div class=\"description\">\n                    "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "\n                </div>\n                <div class=\"time-limit\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"time_limit") : stack1), depth0))
    + "</div>\n                <div class=\"counts\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"questions_count") : stack1), depth0))
    + " Questions</div>\n            </div>\n        </div>\n    </li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","single_select",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":19,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","multi_select",{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":0},"end":{"line":39,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","sortable",{"name":"compare","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":41,"column":0},"end":{"line":50,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","matching_left",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":0},"end":{"line":64,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","matching_right",{"name":"compare","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":0},"end":{"line":77,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","question",{"name":"compare","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":79,"column":0},"end":{"line":95,"column":12}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"update_question") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":0},"end":{"line":127,"column":7}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","previous_button",{"name":"compare","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":129,"column":0},"end":{"line":133,"column":12}}})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"block_type") : depth0),"==","quiz",{"name":"compare","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":135,"column":0},"end":{"line":157,"column":12}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/edit.handlebars":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/edit.handlebars ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"quiz\">\r\n	    <img src=\"/static/images/author/add_pathfinder.png\" />\r\n	    <h3 class='capital-letter'>add quiz</h3>\r\n	</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block question\" data-popup=\"question\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>add question</h3>\r\n	</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block new\" data-popup=\"question\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>new question</h3>\r\n	</div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"choose_answer_option_type\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>answer type</h3>\r\n	</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"select\" data-type=\"single_select\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>add single select answer</h3>\r\n	</div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"first_question") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":37,"column":1},"end":{"line":48,"column":8}}})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	    <div class = \"pagination-head capital-letter\">questions</div>\r\n	    <div class='pagination'>\r\n	        <span id=\"question_block_"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":40,"column":34},"end":{"line":40,"column":43}}}) : helper)))
    + "\" class='circle' question_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"question_id") || (depth0 != null ? lookupProperty(depth0,"question_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data,"loc":{"start":{"line":40,"column":72},"end":{"line":40,"column":87}}}) : helper)))
    + ">\r\n	            "
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":41,"column":13},"end":{"line":41,"column":22}}}) : helper)))
    + "\r\n	        </span>\r\n	    </div> \r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "		<span id=\"question_block_"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":45,"column":27},"end":{"line":45,"column":36}}}) : helper)))
    + "\" class='circle' question_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"question_id") || (depth0 != null ? lookupProperty(depth0,"question_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question_id","hash":{},"data":data,"loc":{"start":{"line":45,"column":65},"end":{"line":45,"column":80}}}) : helper)))
    + ">\r\n	            "
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (depth0 != null ? lookupProperty(depth0,"index") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":46,"column":13},"end":{"line":46,"column":22}}}) : helper)))
    + "\r\n	    </span>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"select\" data-type=\"multi_select\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>add multi select answer</h3>\r\n	</div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block left\" data-popup=\"item_style\" data-type=\"matching_left\" matching>\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>add item</h3>\r\n	</div>\r\n	<div class=\"add-block right disabled\" data-popup=\"item_style\" data-type=\"matching_right\" matching>\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>item match</h3>\r\n	</div>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"add-block\" data-popup=\"select\" data-type=\"sortable\">\r\n		<img src=\"/static/images/author/add_pathfinder.png\" />\r\n		<h3 class='capital-letter'>add sortable answer</h3>\r\n	</div>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "	<div class=\"quiz-edit\">\r\n		<div class=\"quiz-edit-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_question") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":79,"column":3},"end":{"line":86,"column":10}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_answer") : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":88,"column":3},"end":{"line":95,"column":10}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"quiz_edit") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":96,"column":3},"end":{"line":106,"column":13}}})) != null ? stack1 : "")
    + "		</div>\r\n	</div>\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"quiz-edit-option camel-case edit\" data-popup=\"question\">\r\n					edit question\r\n				</div>\r\n				<div class=\" camel-case quiz-edit-option delete\" data-popup=\"confirm_delete\" data-type=\"question\">\r\n					delete question\r\n				</div>\r\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "				<div class=\"quiz-edit-option  camel-case edit\" data-popup=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"popup") || (depth0 != null ? lookupProperty(depth0,"popup") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popup","hash":{},"data":data,"loc":{"start":{"line":89,"column":63},"end":{"line":89,"column":72}}}) : helper)))
    + "\" data-type=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"option_type") || (depth0 != null ? lookupProperty(depth0,"option_type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"option_type","hash":{},"data":data,"loc":{"start":{"line":89,"column":85},"end":{"line":89,"column":100}}}) : helper)))
    + "\">\r\n					edit answer\r\n				</div>\r\n				<div class=\"quiz-edit-option camel-case delete\" data-popup=\"confirm_delete\" data-type=\"answer\">\r\n					delete answer\r\n				</div>\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "		        <div class=\"quiz-edit-option camel-case edit\" data-popup=\"quiz\">\r\n		        	edit quiz\r\n		        </div>\r\n		        <div class=\"quiz-edit-option camel-case duplicate\" data-popup=\"quiz\">\r\n		        	duplicate quiz\r\n		        </div>\r\n		        <div class=\"quiz-edit-option camel-case delete \" data-popup=\"confirm_delete\" data-type=\"quiz\">\r\n		        	delete quiz\r\n		        </div>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"quiz-reorder-icon no-action\">\r\n		<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" \r\n		viewBox=\"0 	0 100 125\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\">\\\r\n			<polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" points=\"95,50 83.75,38.75 83.75,44.375 55.625,44.375 55.625,16.25 61.25,16.25   50,5 38.75,16.25 44.375,16.25 44.375,44.375 16.25,44.375 16.25,38.75 5,50 16.25,61.25 16.25,55.625 44.375,55.625 44.375,83.75   38.75,83.75 50,95 61.25,83.75 55.625,83.75 55.625,55.625 83.75,55.625 83.75,61.25 \"/>\\\r\n		</svg>\r\n    </div>\r\n";
},"31":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"quiz-drag\"></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_quiz") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_question") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":0},"end":{"line":13,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_next_question") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":20,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"choose_answer_option_type") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":0},"end":{"line":27,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"single_select") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":0},"end":{"line":34,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"pagination") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":0},"end":{"line":49,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"multi_select") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":0},"end":{"line":56,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"matching") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":0},"end":{"line":67,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"sortable") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":69,"column":0},"end":{"line":74,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_quiz") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":0},"end":{"line":109,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"quiz_sorting") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":110,"column":0},"end":{"line":117,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"edit_sort_option") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":119,"column":0},"end":{"line":121,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/home.handlebars":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/home.handlebars ***!
  \*************************************************************/
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

  return "			<li quiz-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + ">\n				<div class='quiz-list-wrap'>\n					<div class=\"banner\">\n			            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"/>\n						<label>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</label>\n						<div class=\"banner-overlay\"></div>\n					</div>\n					<div class=\"info-block\">\n						<div class=\"title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "</div>\n						<div class=\"description\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\n						<div data-slug='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"slug") : depth0), depth0))
    + "' class=\"explore quiz\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"take quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":19,"column":53},"end":{"line":19,"column":73}}}))
    + "</div>\n					</div>\n					<div class=\"footer\">\n						<div class=\"description\">\n							"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "\n						</div>\n						<div class=\"time-limit\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"time_limit") : depth0), depth0))
    + "</div>\n						<div class=\"counts\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"questions_count") : depth0), depth0))
    + "\n							"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias3,"question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":27,"column":7},"end":{"line":27,"column":26}}}))
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depth0 != null ? lookupProperty(depth0,"questions_count") : depth0),">","1",{"name":"compare","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":27,"column":26},"end":{"line":28,"column":19}}})) != null ? stack1 : "")
    + "							\n						</div>\n					</div>\n				</div>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "s\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"fs-banner\"> \n	<div class=\"title1\">\n		Quiz\n	</div>\n</div>\n<div class=\"quiz-list\">\n	<ul class=\"sortable\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"quizs") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":2},"end":{"line":34,"column":11}}})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/popup.handlebars":
/*!**************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/popup.handlebars ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box alert\">\r\n    <div class=\"popup-title\">\r\n        "
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"warning",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":26}}}))
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"sub-title text-center\">\r\n                "
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,"alert_message") : depth0), depth0))
    + "\r\n            </div>\r\n        </div>      \r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel "
    + alias1(alias2((depth0 != null ? lookupProperty(depth0,"alert_action") : depth0), depth0))
    + "\" data-popup=\"alert\">ok</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"quiz\">\r\n    <div class=\"popup-title camel-case\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":24,"column":8},"end":{"line":24,"column":62}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"quiz name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":28,"column":47},"end":{"line":28,"column":67}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a name for your quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":29,"column":35},"end":{"line":29,"column":72}}}))
    + ".</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"150\" autocomplete=\"off\" placeholder=\"Name\" />\r\n            <div class=\"counter\" id=\"quiz_title_counter\">150 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":31,"column":61},"end":{"line":31,"column":87}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"quiz description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":34,"column":31},"end":{"line":34,"column":58}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description for this quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":35,"column":35},"end":{"line":35,"column":85}}}))
    + ".</div>\r\n            <textarea name=\"description\" maxlength=\"500\" placeholder=\"Description\"></textarea>\r\n            <div class=\"counter\" id=\"quiz_desc_counter\">500 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":37,"column":60},"end":{"line":37,"column":86}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field \">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question order",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":40,"column":48},"end":{"line":40,"column":73}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a question order style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":41,"column":35},"end":{"line":41,"column":75}}}))
    + "</div>\r\n            <div id=\"sequential\">\r\n                <div class=\"option-check active capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"sequential",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":43,"column":64},"end":{"line":43,"column":85}}}))
    + "</div>\r\n                <div class=\"option-check capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"random",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":44,"column":57},"end":{"line":44,"column":74}}}))
    + "</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question skip",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":48,"column":47},"end":{"line":48,"column":71}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"allow user to skip questions?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":49,"column":35},"end":{"line":49,"column":75}}}))
    + "</div>\r\n            <div id=\"skip\">\r\n                <div class=\"option-check active capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"no",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":51,"column":64},"end":{"line":51,"column":77}}}))
    + "</div>\r\n                <div class=\"option-check capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"yes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":52,"column":57},"end":{"line":52,"column":71}}}))
    + "</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"time limit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":56,"column":47},"end":{"line":56,"column":68}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you want to set a time limit for your quiz?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":57,"column":35},"end":{"line":57,"column":92}}}))
    + "</div> \r\n            <div class=\"radio-block\"> \r\n                <input class=\"css-radio\" type=\"radio\" name=\"time\" value=\"nolimit\" id=\"nolimit\" checked> \r\n                <label class=\"css-radio-label camel-case\" for=\"nolimit\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"no time limit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":60,"column":72},"end":{"line":60,"column":96}}}))
    + "</label> \r\n            </div>\r\n            <div class=\"radio-block disabled\">\r\n                <input class=\"css-radio\" type=\"radio\" name=\"time\" value=\"time\" id=\"time\"> \r\n                <label class=\"css-radio-label camel-case\" for=\"time\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"time limit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":64,"column":69},"end":{"line":64,"column":90}}}))
    + "</label><br>\r\n                <input name=\"minutes\" type=\"text\" autocomplete=\"off\" disabled=\"true\"/>\r\n                <label class=\"minutes camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"minutes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":66,"column":50},"end":{"line":66,"column":68}}}))
    + "</label>\r\n            </div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"due date",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":70,"column":31},"end":{"line":70,"column":50}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a due date for this quiz. Upon due date users will not be able to take this quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":71,"column":35},"end":{"line":71,"column":133}}}))
    + "</div>  \r\n            <label class=\"sub-title due-date\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"due date",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":72,"column":46},"end":{"line":72,"column":65}}}))
    + ":</label>   <br>      \r\n            <input id=\"due_date\" type=\"text\" name=\"due_date\" placeholder=\"Choose date\"  data-language='en' class=\"datepicker-here\">\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"re-attempts",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":76,"column":47},"end":{"line":76,"column":69}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"do you want to allow re-attempts to this quiz?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":35},"end":{"line":77,"column":92}}}))
    + "</div> \r\n            <div class=\"radio-block\"> \r\n                <input class=\"css-radio radio-attempts\" type=\"radio\" name=\"attempts\" value=\"noreattempts\" id=\"noreattemp\" checked> \r\n                <label class=\"css-radio-label camel-case\" for=\"noreattemp\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"no re-attempts",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":80,"column":75},"end":{"line":80,"column":100}}}))
    + "</label> \r\n            </div>\r\n            <div class=\"radio-block disabled\">\r\n                <input class=\"css-radio radio-attempts\" type=\"radio\" name=\"attempts\" value=\"attempts\" id=\"times\"> \r\n                <label class=\"css-radio-label camel-case\" for=\"times\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"re-attempt",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":84,"column":70},"end":{"line":84,"column":91}}}))
    + "</label><br>\r\n                <input name=\"attempts_value\" type=\"text\" autocomplete=\"off\" disabled=\"true\"/>\r\n                <lable class=\"minutes camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"times",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":86,"column":50},"end":{"line":86,"column":66}}}))
    + "</label>\r\n            </div>\r\n            <div class=\"radio-block disabled\"> \r\n                <input class=\"css-radio radio-attempts\" type=\"radio\" name=\"attempts\" value=\"unlimited\" id=\"unlimited\"> \r\n                <label class=\"css-radio-label camel-case\" for=\"unlimited\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"unlimited attempts",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":90,"column":74},"end":{"line":90,"column":103}}}))
    + "</label> \r\n            </div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"grading style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":94,"column":47},"end":{"line":94,"column":71}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"choose a grading style that best suits this quiz?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":95,"column":35},"end":{"line":95,"column":95}}}))
    + "</div> \r\n            <div class=\"radio-block\"> \r\n                <input class=\"css-radio\" type=\"radio\" name=\"result\" value=\"points\" id=\"r_points\" checked> \r\n                <label class=\"css-radio-label\" for=\"r_points\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"non graded",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":98,"column":62},"end":{"line":98,"column":83}}}))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"(end users will only get the number of correct answers as result)",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":98,"column":84},"end":{"line":98,"column":160}}}))
    + "</label><br>\r\n            </div>\r\n            <div class=\"radio-block disabled\">\r\n                <input class=\"css-radio\" type=\"radio\" name=\"result\" value=\"pass_marks\" id=\"pass\"> \r\n                <label class=\"css-radio-label\" for=\"pass\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"graded",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":102,"column":58},"end":{"line":102,"column":75}}}))
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"(end users  will get Pass/Fail message as per minimum points defined)",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":102,"column":75},"end":{"line":102,"column":155}}}))
    + "</label> <br />\r\n                <input name=\"pass_marks\" type=\"text\" autocomplete=\"off\" disabled=\"true\"/>\r\n                <lable>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"points",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":104,"column":23},"end":{"line":104,"column":40}}}))
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"(minimum points to score to pass)",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":104,"column":41},"end":{"line":104,"column":85}}}))
    + "</label>\r\n            </div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":108,"column":31},"end":{"line":108,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":109,"column":35},"end":{"line":109,"column":82}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file-name sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":112,"column":45},"end":{"line":112,"column":65}}}))
    + "</div>\r\n            <div class=\"remove-file sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":113,"column":47},"end":{"line":113,"column":64}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":114,"column":37},"end":{"line":114,"column":54}}}))
    + "</label>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"certification",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":117,"column":47},"end":{"line":117,"column":71}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a message that will be displayed to passing user at the end of the quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":118,"column":35},"end":{"line":118,"column":123}}}))
    + ".</div>\r\n            <textarea name=\"certification\" maxlength=\"1000\" placeholder=\"Message\"></textarea>\r\n            <div class=\"counter\" id=\"quiz_cert_counter\">1000 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":120,"column":61},"end":{"line":120,"column":87}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel capital-letter\" data-popup=\"add-quiz\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":125,"column":69},"end":{"line":125,"column":86}}}))
    + "</div>\r\n            <div class=\"save capital-letter\" data-popup=\"add-question\" data-id=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"quiz_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":126,"column":93},"end":{"line":126,"column":108}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":128,"column":48},"end":{"line":128,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":129,"column":46},"end":{"line":129,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":130,"column":49},"end":{"line":130,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "edit quiz";
},"6":function(container,depth0,helpers,partials,data) {
    return "create new quiz";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"question\">\r\n    <div class=\"popup-title camel-case\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":138,"column":8},"end":{"line":138,"column":92}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":142,"column":47},"end":{"line":142,"column":66}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a question for this quiz",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":35},"end":{"line":143,"column":76}}}))
    + ".</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"200\" autocomplete=\"off\" placeholder=\"Question\" />\r\n            <div class=\"counter\" id=\"question_title_counter\">200 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":145,"column":65},"end":{"line":145,"column":91}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"question description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":148,"column":31},"end":{"line":148,"column":62}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes your question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":149,"column":35},"end":{"line":149,"column":105}}}))
    + ".</div>\r\n            <textarea name=\"description\" maxlength=\"500\" placeholder=\"Description\"></textarea>\r\n            <div class=\"counter\" id=\"question_desc_counter\">500 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":151,"column":64},"end":{"line":151,"column":90}}}))
    + "</div>\r\n        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_graded") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":153,"column":8},"end":{"line":160,"column":15}}})) != null ? stack1 : "")
    + "        <hr class=\"break\"/>\r\n        <div class=\"advanced camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":162,"column":41},"end":{"line":162,"column":60}}}))
    + "</div>\r\n        <div class=\"block advanced-block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload media",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":164,"column":31},"end":{"line":164,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image/video/audio to go with your question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":165,"column":35},"end":{"line":165,"column":98}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*|audio/*|video/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file-name camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":168,"column":46},"end":{"line":168,"column":66}}}))
    + "</div>\r\n            <div class=\"remove-file title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":169,"column":43},"end":{"line":169,"column":60}}}))
    + "</div>\r\n            <div class= 'error-message'></div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":171,"column":37},"end":{"line":171,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer question\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel camel-case\" data-popup=\"add-question\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":176,"column":69},"end":{"line":176,"column":86}}}))
    + "</div>\r\n            <div class=\"save\" data-popup=\"add-question\" data-id=\""
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"question_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":177,"column":82},"end":{"line":177,"column":97}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":179,"column":48},"end":{"line":179,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":180,"column":46},"end":{"line":180,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":181,"column":49},"end":{"line":181,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":138,"column":23},"end":{"line":138,"column":47}}}));
},"11":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create new question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":138,"column":55},"end":{"line":138,"column":85}}}));
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "        <div class=\"block \">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"points",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":155,"column":47},"end":{"line":155,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"how many points is this question worth?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":156,"column":35},"end":{"line":156,"column":85}}}))
    + ".</div>\r\n            <input name=\"points\" type=\"text\" autocomplete=\"off\"/>\r\n            <lable class=\"points camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"points",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":158,"column":45},"end":{"line":158,"column":62}}}))
    + "</label>\r\n        </div>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"choose_answer_type\">\r\n    <div class=\"camel-case popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":189,"column":8},"end":{"line":189,"column":89}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"sub-title\">type</div>\r\n        <div class=\"block\">\r\n            <div class=\"choose-layout capital-letter\" data-answer-type=\"single_select\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"single-select",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":194,"column":87},"end":{"line":194,"column":111}}}))
    + "</div>\r\n            <div class=\"choose-layout capital-letter\" data-answer-type=\"multi_select\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"multi-select",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":195,"column":86},"end":{"line":195,"column":109}}}))
    + "</div>\r\n            <div class=\"choose-layout capital-letter\" data-answer-type=\"matching\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"matching",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":196,"column":82},"end":{"line":196,"column":101}}}))
    + "</div>\r\n            <div class=\"choose-layout capital-letter\" data-answer-type=\"sortable\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"ordering",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":197,"column":82},"end":{"line":197,"column":101}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel capital-letter\" data-popup=\"choose_answer_type\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":202,"column":79},"end":{"line":202,"column":96}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":189,"column":23},"end":{"line":189,"column":45}}}));
},"18":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"choose answer type",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":189,"column":53},"end":{"line":189,"column":82}}}));
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"save-answer\">\r\n    <div class=\"camel-case popup-title\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":211,"column":8},"end":{"line":211,"column":84}}})) != null ? stack1 : "")
    + "\r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"block\">\r\n            <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":215,"column":47},"end":{"line":215,"column":64}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write an answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":216,"column":35},"end":{"line":216,"column":61}}}))
    + ".</div>\r\n            <input name=\"title\" type=\"text\" maxlength=\"100\" autocomplete=\"off\" placeholder=\"Answer\" />\r\n            <div class=\"counter\" id=\"answer_title_counter\">100 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":218,"column":63},"end":{"line":218,"column":89}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"answer description",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":221,"column":31},"end":{"line":221,"column":60}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes this answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":222,"column":35},"end":{"line":222,"column":103}}}))
    + ".</div>\r\n            <textarea name=\"description\" maxlength=\"350\" placeholder=\"Description\"></textarea>\r\n            <div class=\"counter\" id=\"answer_desc_counter\">350 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":224,"column":62},"end":{"line":224,"column":88}}}))
    + "</div>\r\n        </div>\r\n        <hr class=\"break\"/>\r\n        <div class=\"advanced camel-case\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"advanced",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":227,"column":41},"end":{"line":227,"column":60}}}))
    + "</div>\r\n        <div class=\"block advanced-block\">\r\n            <div class=\"title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":229,"column":31},"end":{"line":229,"column":54}}}))
    + "</div>\r\n            <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":230,"column":35},"end":{"line":230,"column":84}}}))
    + "</div>\r\n            <input type=\"file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n            <img class=\"img-preview\">\r\n            <div class=\"file-name sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":233,"column":45},"end":{"line":233,"column":65}}}))
    + "</div>\r\n            <div class=\"remove-file sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":234,"column":47},"end":{"line":234,"column":64}}}))
    + "</div>\r\n            <label for=\"upload-file\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":235,"column":37},"end":{"line":235,"column":54}}}))
    + "</label>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":240,"column":47},"end":{"line":240,"column":64}}}))
    + "</div>\r\n            <div class=\"save capital-letter\" data-type=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":241,"column":97},"end":{"line":241,"column":112}}}))
    + "</div>\r\n        </div>\r\n        <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":243,"column":48},"end":{"line":243,"column":78}}}))
    + "</div>\r\n        <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":244,"column":46},"end":{"line":244,"column":76}}}))
    + "</div>\r\n        <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":245,"column":49},"end":{"line":245,"column":66}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n    </div>\r\n</div>\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"create answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":211,"column":53},"end":{"line":211,"column":77}}}));
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\" data-popup=\"add_item\">\r\n    <div class=\"popup-title camel-case\">\r\n        "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data,"loc":{"start":{"line":253,"column":8},"end":{"line":253,"column":56}}})) != null ? stack1 : "")
    + "        \r\n    </div>\r\n    <div class=\"content-block\">\r\n        <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"style",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":256,"column":31},"end":{"line":256,"column":47}}}))
    + "</div>\r\n        <div class=\"block\">\r\n            <div class=\"choose-layout text capital-letter\" data-popup=\"add_item\" data-item-type=\"text\" data-type="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":258,"column":129},"end":{"line":258,"column":144}}}))
    + "</div>\r\n            <div class=\"choose-layout image capital-letter\" data-popup=\"add_item\" data-item-type=\"image\" data-type="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":259,"column":131},"end":{"line":259,"column":147}}}))
    + "</div>\r\n            <div class=\"choose-layout text-image capital-letter\" data-popup=\"add_item\" data-item-type=\"text_image\" data-type="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text & image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":260,"column":141},"end":{"line":260,"column":164}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"footer\">\r\n        <div class=\"block\">\r\n            <div class=\"cancel capital-letter\" data-popup=\"item_style\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":265,"column":71},"end":{"line":265,"column":88}}}))
    + "</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    return " switch ";
},"26":function(container,depth0,helpers,partials,data) {
    return "item style";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"popup-box\" data-popup=\"save-item\">  \r\n        <div class=\"popup-title camel-case\">\r\n            "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),"==",false,{"name":"compare","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":274,"column":12},"end":{"line":274,"column":278}}})) != null ? stack1 : "")
    + "\r\n            "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":275,"column":12},"end":{"line":275,"column":51}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.program(43, data, 0),"data":data,"loc":{"start":{"line":275,"column":52},"end":{"line":275,"column":207}}})) != null ? stack1 : "")
    + "\r\n        </div>\r\n        <div class=\"content-block\" data-type=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.program(35, data, 0),"data":data,"loc":{"start":{"line":277,"column":46},"end":{"line":277,"column":138}}})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":278,"column":12},"end":{"line":285,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":286,"column":12},"end":{"line":296,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel capital-letter\" rel=\"add_option\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":300,"column":68},"end":{"line":300,"column":85}}}))
    + "</div>\r\n                <div class=\"save capital-letter\" data-type=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + "\" data-id=\""
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"save",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":301,"column":101},"end":{"line":301,"column":116}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! saving failed",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":303,"column":52},"end":{"line":303,"column":82}}}))
    + "</div>\r\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saved successfully!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":304,"column":50},"end":{"line":304,"column":80}}}))
    + "</div>\r\n            <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"saving",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":305,"column":53},"end":{"line":305,"column":70}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"back "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_edit") : depth0),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":274,"column":61},"end":{"line":274,"column":96}}})) != null ? stack1 : "")
    + "\" data-popup=\"item_style\" data-item-type=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_text") : depth0),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.program(35, data, 0),"data":data,"loc":{"start":{"line":274,"column":138},"end":{"line":274,"column":230}}})) != null ? stack1 : "")
    + "\" data-type=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + "\"></div>";
},"30":function(container,depth0,helpers,partials,data) {
    return "switch_option";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "text"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":274,"column":161},"end":{"line":274,"column":194}}})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data) {
    return "_image";
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":274,"column":194},"end":{"line":274,"column":223}}})) != null ? stack1 : "");
},"36":function(container,depth0,helpers,partials,data) {
    return "image";
},"38":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"edit",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":275,"column":28},"end":{"line":275,"column":43}}}))
    + " ";
},"40":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"text",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":275,"column":72},"end":{"line":275,"column":87}}}))
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(41, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":275,"column":88},"end":{"line":275,"column":134}}})) != null ? stack1 : "")
    + " "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":275,"column":135},"end":{"line":275,"column":152}}}));
},"41":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"& image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":275,"column":109},"end":{"line":275,"column":127}}}));
},"43":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"option_image") : depth0),{"name":"if","hash":{},"fn":container.program(44, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":275,"column":152},"end":{"line":275,"column":200}}})) != null ? stack1 : "");
},"44":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"image option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":275,"column":177},"end":{"line":275,"column":200}}}));
},"46":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "                <div class=\"block\">\r\n                    <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":280,"column":55},"end":{"line":280,"column":72}}}))
    + "</div>\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"write a short description that best describes your option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":281,"column":43},"end":{"line":281,"column":111}}}))
    + ".</div>\r\n                    <textarea name=\"description\" class=\"\" maxlength=\"250\" placeholder=\"Option Description\"></textarea>\r\n                    <div class=\"counter\" id=\"item_desc_counter\">250 "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"characters left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":283,"column":68},"end":{"line":283,"column":94}}}))
    + "</div>\r\n               </div>\r\n";
},"48":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "                <div class=\"block\" img_block>\r\n                    <div class=\"title mandatory-field\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload image",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":288,"column":55},"end":{"line":288,"column":78}}}))
    + "</div>\r\n                    <div class=\"sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"upload an image to go with your option",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":289,"column":43},"end":{"line":289,"column":92}}}))
    + "</div>\r\n                    <input type=\"file\" name=\"upload-file\" class=\"upload-file\" id=\"upload-file\" accept=\"image/*\">\r\n                    <img class=\"img-preview\">\r\n                    <div class=\"file-name sub-title\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"file name",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":292,"column":53},"end":{"line":292,"column":73}}}))
    + "</div>\r\n                    <div class=\"remove-file capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"remove",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":293,"column":60},"end":{"line":293,"column":77}}}))
    + "</div>\r\n                    <label for=\"upload-file\" class=\"rippleEffect\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"browse",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":294,"column":66},"end":{"line":294,"column":83}}}))
    + "</label>\r\n                </div>\r\n";
},"50":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box confirm_delete\">\r\n    <div class=\"popup-title delete-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":313,"column":12},"end":{"line":313,"column":29}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"you've made some cool stuff!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":318,"column":19},"end":{"line":318,"column":58}}}))
    + "<br><br>\r\n                   "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure want to permanently delete this",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":319,"column":19},"end":{"line":319,"column":74}}}))
    + " "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + "?\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel capital-letter\" rel=\"confirm_delete\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":325,"column":72},"end":{"line":325,"column":89}}}))
    + "</div>\r\n                <div class=\"confirm-delete delete\" data-type="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + " data-id="
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","answer",{"name":"compare","hash":{},"fn":container.program(51, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":326,"column":85},"end":{"line":326,"column":149}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","quiz",{"name":"compare","hash":{},"fn":container.program(53, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":326,"column":149},"end":{"line":326,"column":209}}})) != null ? stack1 : "")
    + ">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"delete",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":326,"column":210},"end":{"line":326,"column":227}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":328,"column":52},"end":{"line":328,"column":92}}}))
    + ".</div>\r\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been deleted.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":329,"column":50},"end":{"line":329,"column":111}}}))
    + "</div>\r\n            <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"deleting",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":330,"column":53},"end":{"line":330,"column":72}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"51":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0));
},"53":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"quiz_id") : depth0), depth0));
},"55":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\"popup-box confirm_publish_quiz\">\r\n    <div class=\"capital-letter popup-title\">\r\n            "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish changes",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":338,"column":12},"end":{"line":338,"column":38}}}))
    + "\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"are you sure you want to take your work live?",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":343,"column":20},"end":{"line":343,"column":76}}}))
    + "\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"cancel capital-letter\" rel=\"confirm_publish_quiz\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"cancel",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":349,"column":78},"end":{"line":349,"column":95}}}))
    + "</div>\r\n                <div class=\"capital-letter confirm-publish-quiz publish\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publish",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":350,"column":73},"end":{"line":350,"column":91}}}))
    + "</div>\r\n            </div>\r\n            <div class=\"form-failed capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"oops! your work was not saved",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":352,"column":52},"end":{"line":352,"column":92}}}))
    + ".</div>\r\n            <div class=\"form-sent capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"success! your work has successfully been published.!",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":353,"column":50},"end":{"line":353,"column":113}}}))
    + "</div>\r\n            <div class=\"form-sending capital-letter\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"publishing",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":354,"column":53},"end":{"line":354,"column":74}}}))
    + "...<div class=\"cd-loading\"></div></div>\r\n        </div>\r\n    </div>\r\n";
},"57":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"popup-box\">\r\n    <div class=\"popup-title\">\r\n            results\r\n        </div>\r\n        <div class=\"content-block\">\r\n            <div class=\"block\">\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"total questions count",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":367,"column":20},"end":{"line":367,"column":52}}}))
    + " : "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"total_questions_count") : stack1), depth0))
    + "\r\n                </div><br>\r\n                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"attempted questions count",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":370,"column":20},"end":{"line":370,"column":56}}}))
    + " : "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"attempted_questions_count") : stack1), depth0))
    + "\r\n                </div><br>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"time_out") : stack1),{"name":"if","hash":{},"fn":container.program(58, data, 0),"inverse":container.program(60, data, 0),"data":data,"loc":{"start":{"line":372,"column":16},"end":{"line":380,"column":23}}})) != null ? stack1 : "")
    + "                <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"skipped questions count",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":382,"column":20},"end":{"line":382,"column":54}}}))
    + " : "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"skipped_questions_count") : stack1), depth0))
    + "\r\n                </div><br>\r\n                <div class=\"sub-title text-center\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"grading_style") : stack1),"==","points",{"name":"compare","hash":{},"fn":container.program(63, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":385,"column":16},"end":{"line":387,"column":28}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"grading_style") : stack1),"==","pass_or_fail",{"name":"compare","hash":{},"fn":container.program(65, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":388,"column":16},"end":{"line":393,"column":28}}})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"footer\">\r\n            <div class=\"block\">\r\n                <div class=\"retry capital-letter\" data-popup=\"results\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"go home",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":399,"column":71},"end":{"line":399,"column":89}}}))
    + "</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"58":function(container,depth0,helpers,partials,data) {
    return "                    <div class=\"sub-title text-center\">\r\n                        "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"time over",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":374,"column":24},"end":{"line":374,"column":44}}}))
    + "\r\n                    </div><br>\r\n";
},"60":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"time_taken") : stack1),{"name":"if","hash":{},"fn":container.program(61, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":376,"column":16},"end":{"line":380,"column":16}}})) != null ? stack1 : "");
},"61":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"sub-title text-center\">\r\n                        "
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"time taken",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":378,"column":24},"end":{"line":378,"column":45}}}))
    + " : "
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"time_taken") : stack1), depth0))
    + "\r\n                    </div><br>\r\n                ";
},"63":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    "
    + alias1(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"correct answers",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":386,"column":20},"end":{"line":386,"column":46}}}))
    + " : "
    + alias1(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"result") : stack1), depth0))
    + "\r\n";
},"65":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"sub-title text-center\">\r\n                    "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"obtained marks",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":390,"column":20},"end":{"line":390,"column":45}}}))
    + " : "
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"marks") : stack1), depth0))
    + "\r\n                    </div><br>\r\n                    <h3 class=\"result "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"result") : stack1),"==","Pass",{"name":"compare","hash":{},"fn":container.program(66, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":392,"column":38},"end":{"line":392,"column":98}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"result") : stack1),"==","Fail",{"name":"compare","hash":{},"fn":container.program(68, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":392,"column":98},"end":{"line":392,"column":158}}})) != null ? stack1 : "")
    + "\">"
    + alias2(alias3(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz_result") : depth0)) != null ? lookupProperty(stack1,"result") : stack1), depth0))
    + "</h3>\r\n";
},"66":function(container,depth0,helpers,partials,data) {
    return "pass";
},"68":function(container,depth0,helpers,partials,data) {
    return "fail";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"alert") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":19,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"quiz") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":0},"end":{"line":133,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"question") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":135,"column":0},"end":{"line":184,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"choose_answer_option_type") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":186,"column":0},"end":{"line":206,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"select") : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":208,"column":0},"end":{"line":248,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_style") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":250,"column":0},"end":{"line":269,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"add_item") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":271,"column":0},"end":{"line":308,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"confirm_delete") : depth0),{"name":"if","hash":{},"fn":container.program(50, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":310,"column":0},"end":{"line":333,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"publish_quiz") : depth0),{"name":"if","hash":{},"fn":container.program(55, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":335,"column":0},"end":{"line":357,"column":7}}})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"results") : depth0),{"name":"if","hash":{},"fn":container.program(57, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":359,"column":0},"end":{"line":403,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/questions.handlebars":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/questions.handlebars ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "            <div class= \"quiz-grade-wrap\">\r\n                <div class = \"capital-letter text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"total points",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":11,"column":51},"end":{"line":11,"column":74}}}))
    + "</div>\r\n                <div class = \"total-points\"></div>\r\n                <div class = \"capital-letter text points-to-pass\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"points to pass",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":13,"column":66},"end":{"line":13,"column":91}}}))
    + "</div>\r\n                <div class=\"min-points\"></div>\r\n                <div class = \"capital-letter text\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"point for this question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":15,"column":51},"end":{"line":15,"column":85}}}))
    + "</div>\r\n                <div class = \"question-points\"></div>\r\n            </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class = \"pagination-head capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"questions",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":21,"column":62},"end":{"line":21,"column":82}}}))
    + "</div>\r\n                <div class='pagination'>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"questions") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":20},"end":{"line":27,"column":29}}})) != null ? stack1 : "")
    + "                </div> \r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <span id=\"question_block_"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":24,"column":45},"end":{"line":24,"column":66}}}))
    + "\" class='circle' question_id="
    + alias2(container.lambda((depth0 != null ? lookupProperty(depth0,"question_id") : depth0), depth0))
    + ">\r\n                        "
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":25,"column":24},"end":{"line":25,"column":45}}}))
    + "\r\n                    </span>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"question-wrap\" id=\"question_block_"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":34,"column":58},"end":{"line":34,"column":79}}}))
    + "\" question-id="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"question_id") : depth0), depth0))
    + " data-points = "
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"points") : depth0), depth0))
    + " "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_edit") : depths[1]),"==",false,{"name":"compare","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":134},"end":{"line":34,"column":197}}})) != null ? stack1 : "")
    + ">\r\n                <div class=\"question\">\r\n                    <div class=\"title\"><span>"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(alias1,(data && lookupProperty(data,"index")),"+",1,{"name":"math","hash":{},"data":data,"loc":{"start":{"line":36,"column":45},"end":{"line":36,"column":66}}}))
    + ". </span>"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</div>\r\n                    <div class=\"description\">"
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n                    <div class=\"question_media\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"resource") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":20},"end":{"line":68,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n                </div>\r\n                <div class=\"options-wrap\" data-option-type="
    + alias2(alias3((depth0 != null ? lookupProperty(depth0,"option_type") : depth0), depth0))
    + ">\r\n                    <div class=\"change-answer-type capital-letter\">\r\n			"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"change the answer type",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":73,"column":3},"end":{"line":73,"column":36}}}))
    + "\r\n                    </div>\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","single_select",{"name":"compare","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":75,"column":20},"end":{"line":98,"column":32}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","multi_select",{"name":"compare","hash":{},"fn":container.program(30, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":99,"column":20},"end":{"line":120,"column":32}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","sortable",{"name":"compare","hash":{},"fn":container.program(35, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":20},"end":{"line":141,"column":32}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depth0 != null ? lookupProperty(depth0,"option_type") : depth0),"==","matching",{"name":"compare","hash":{},"fn":container.program(41, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":142,"column":20},"end":{"line":174,"column":32}}})) != null ? stack1 : "")
    + "                </div>\r\n                <div class=\"navigation-wrap\">\r\n                    <div class=\"quiz-nav prev\"></div>\r\n                    <div class=\"quiz-nav next capital-letter "
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,(depths[1] != null ? lookupProperty(depths[1],"is_edit") : depths[1]),"==",false,{"name":"compare","hash":{},"fn":container.program(64, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":178,"column":61},"end":{"line":178,"column":116}}})) != null ? stack1 : "")
    + "\">"
    + alias2(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"next question",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":178,"column":118},"end":{"line":178,"column":142}}}))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[1] != null ? lookupProperty(depths[1],"can_skip") : depths[1]),{"name":"if","hash":{},"fn":container.program(66, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":179,"column":20},"end":{"line":181,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "answered=\"false\"";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","image",{"name":"compare","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":24},"end":{"line":43,"column":36}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","video",{"name":"compare","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":24},"end":{"line":49,"column":36}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"type") : stack1),"==","audio",{"name":"compare","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":24},"end":{"line":66,"column":36}}})) != null ? stack1 : "")
    + "\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <img class= \"question-icon\" align = \"center\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" media-type=\"image\">\r\n                            <span class=\"img-magnifying\"></span>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                           <video class= \"question-icon\"  align = \"center\" poster=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\" controls>\r\n                              <source src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" type=\"video/mp4\">\r\n                            Your browser does not support the video tag.\r\n                            </video>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class = 'audio-icon' align=\"left\"> <img  class= \"question-icon\" src = \""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"thumbnail") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\"></div>\r\n                           <audio >\r\n                              <source src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"resource") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" type=\"audio/mpeg\">\r\n                            </audio>\r\n                        <div class=\"v-audio\">\r\n                        <div class=\"audio-backward\"></div>\r\n                        <div class=\"audio-control play\"></div>\r\n                        <div class=\"audio-farward\"></div>\r\n                        <div class=\"audio-mute\"></div>\r\n                        <div class=\"audio-currentTime\">00:00</div>\r\n                        <div class=\"audio-timeline\">\r\n                            <div class=\"audio-progress\"></div>\r\n                        </div>\r\n                        <div class=\"audio-duration\">00:00</div>\r\n                        </div>\r\n";
},"16":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"choose-answer capital-letter\">\r\n				"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"check the correct answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":77,"column":4},"end":{"line":77,"column":39}}}))
    + "\r\n                        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"options") : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":79,"column":24},"end":{"line":97,"column":33}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"checklist-item option-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[2] != null ? lookupProperty(depths[2],"is_edit") : depths[2]),{"name":"if","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":67},"end":{"line":80,"column":139}}})) != null ? stack1 : "")
    + "\" option-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ">\r\n                                <div class=\"check\"></div>\r\n                                <div class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.program(23, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":83,"column":32},"end":{"line":87,"column":39}}})) != null ? stack1 : "")
    + "                                <div class=\"info-block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":89,"column":36},"end":{"line":91,"column":43}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":92,"column":36},"end":{"line":94,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\r\n                            </div>\r\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_correct_option") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":89},"end":{"line":80,"column":132}}})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"21":function(container,depth0,helpers,partials,data) {
    return "                                        <div class=\"arrow\"></div>\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":32},"end":{"line":87,"column":32}}})) != null ? stack1 : "");
},"24":function(container,depth0,helpers,partials,data) {
    return "                                    <div class=\"arrow\"></div>\r\n                                ";
},"26":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <div class=\"description\">"
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"description") : depth0), depth0))
    + "</div>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                        <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\">\r\n";
},"30":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"choose-answer capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"check the correct answer",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":100,"column":66},"end":{"line":100,"column":101}}}))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"options") : depth0),{"name":"each","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":24},"end":{"line":119,"column":33}}})) != null ? stack1 : "");
},"31":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"checklist-item option-item "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depths[2] != null ? lookupProperty(depths[2],"is_edit") : depths[2]),{"name":"if","hash":{},"fn":container.program(32, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":102,"column":67},"end":{"line":102,"column":136}}})) != null ? stack1 : "")
    + "\" option-id="
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ">\r\n                                <div class=\"check\"></div>\r\n                                <div class=\"title\">"
    + alias3(alias2((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.program(23, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":105,"column":32},"end":{"line":109,"column":39}}})) != null ? stack1 : "")
    + "                                <div class=\"info-block\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"description") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":111,"column":36},"end":{"line":113,"column":43}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":114,"column":36},"end":{"line":116,"column":43}}})) != null ? stack1 : "")
    + "                                </div>\r\n                            </div>\r\n";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"is_correct_option") : depth0),{"name":"if","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":102,"column":88},"end":{"line":102,"column":129}}})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data) {
    return "selected";
},"35":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"info capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"list in correct order",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":122,"column":57},"end":{"line":122,"column":89}}}))
    + "</div>\r\n                        <div class=\"choose-answer capital-letter\"></div>\r\n                        <div class=\"sortable-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"options") : depth0),{"name":"each","hash":{},"fn":container.program(36, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":125,"column":28},"end":{"line":139,"column":37}}})) != null ? stack1 : "")
    + "                        </div>\r\n";
},"36":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                <div class=\"order-block option-item\" option-id="
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + ">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias3,(depths[2] != null ? lookupProperty(depths[2],"is_edit") : depths[2]),"==",false,{"name":"compare","hash":{},"fn":container.program(37, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":127,"column":36},"end":{"line":131,"column":48}}})) != null ? stack1 : "")
    + "                                    <div class=\"order-info\">\r\n                                        <h2>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</h2>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(39, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":134,"column":40},"end":{"line":136,"column":47}}})) != null ? stack1 : "")
    + "                                    </div>\r\n                                </div>\r\n";
},"37":function(container,depth0,helpers,partials,data) {
    return "                                        <div class=\"order-input\">\r\n                                            <input type=\"text\"/>\r\n                                        </div>\r\n";
},"39":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"url") : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\">\r\n";
},"41":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"info capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"click and match",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":143,"column":57},"end":{"line":143,"column":83}}}))
    + "</div>\r\n                        <div class=\"choose-answer capital-letter\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"options") : depth0),{"name":"each","hash":{},"fn":container.program(42, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":145,"column":24},"end":{"line":173,"column":33}}})) != null ? stack1 : "");
},"42":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"option-item"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_right") : depth0),{"name":"if","hash":{},"fn":container.program(43, data, 0, blockParams, depths),"inverse":container.program(45, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":146,"column":51},"end":{"line":146,"column":128}}})) != null ? stack1 : "")
    + "\" option-id=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"option_id") : depth0), depth0))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_left") : depth0),{"name":"if","hash":{},"fn":container.program(47, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":147,"column":32},"end":{"line":158,"column":39}}})) != null ? stack1 : "")
    + "                                <div class=\"divider\"></div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"item_right") : depth0),{"name":"if","hash":{},"fn":container.program(57, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":160,"column":32},"end":{"line":171,"column":39}}})) != null ? stack1 : "")
    + "                            </div>\r\n";
},"43":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[2] != null ? lookupProperty(depths[2],"is_edit") : depths[2]),{"name":"if","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":146,"column":70},"end":{"line":146,"column":106}}})) != null ? stack1 : "");
},"45":function(container,depth0,helpers,partials,data) {
    return " active";
},"47":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <div class=\"match-wrap left\">\r\n                                        <div class=\"match-block\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(48, data, 0),"inverse":container.program(51, data, 0),"data":data,"loc":{"start":{"line":149,"column":65},"end":{"line":149,"column":148}}})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(53, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":150,"column":44},"end":{"line":152,"column":51}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(55, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":153,"column":44},"end":{"line":155,"column":51}}})) != null ? stack1 : "")
    + "                                        </div>\r\n                                    </div>\r\n";
},"48":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " image"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":149,"column":94},"end":{"line":149,"column":128}}})) != null ? stack1 : "")
    + " ";
},"49":function(container,depth0,helpers,partials,data) {
    return "_text";
},"51":function(container,depth0,helpers,partials,data) {
    return "text";
},"53":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</p>\r\n";
},"55":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_left") : depth0)) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\r\n";
},"57":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <div class=\"match-wrap right\">\r\n                                        <div class=\"match-block\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(58, data, 0),"inverse":container.program(51, data, 0),"data":data,"loc":{"start":{"line":162,"column":65},"end":{"line":162,"column":150}}})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(60, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":163,"column":44},"end":{"line":165,"column":51}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1),{"name":"if","hash":{},"fn":container.program(62, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":166,"column":44},"end":{"line":168,"column":51}}})) != null ? stack1 : "")
    + "                                        </div>\r\n                                    </div>\r\n";
},"58":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " image"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":162,"column":95},"end":{"line":162,"column":130}}})) != null ? stack1 : "")
    + " ";
},"60":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                <p>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"text") : stack1), depth0))
    + "</p>\r\n";
},"62":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                                <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"item_right") : depth0)) != null ? lookupProperty(stack1,"image") : stack1), depth0))
    + "\">\r\n";
},"64":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"66":function(container,depth0,helpers,partials,data) {
    return "                        <div class=\"quiz-nav skip active capital-letter\">"
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),"skip",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":180,"column":73},"end":{"line":180,"column":88}}}))
    + "</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"quiz-main-wrap\">\r\n    <div class= \"left-pannel\">\r\n        <div class=\"quiz-timer-wrap\">\r\n            <div class=\"quiz-timer\"><br>\r\n                "
    + container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/i18n.js */ "./sharedemos/static/js/helpers/handlebars/i18n.js")).call(alias1,"minutes left",{"name":"i18n","hash":{},"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":39}}}))
    + "<br>\r\n                <div class=\"time\"></div>\r\n            </div>\r\n        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_graded") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":8},"end":{"line":18,"column":15}}})) != null ? stack1 : "")
    + "        <div class=\"quiz-pagination-wrap\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"questions") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">=","1",{"name":"compare","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":12},"end":{"line":29,"column":24}}})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n    <div class=\"quiz-wrap\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"questions") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":33,"column":8},"end":{"line":184,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"useData":true,"useDepths":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/quiz.handlebars":
/*!*************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/quiz.handlebars ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"quiz-main-wrap\">\r\n	<div class=\"quiz-timer\">\r\n		<div class=\"time\"></div><br>\r\n		MINUTES LEFT\r\n	</div>\r\n	<div class=\"quiz-wrap\">\r\n\r\n	</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/templates/quiz_start.handlebars":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/quiz/templates/quiz_start.handlebars ***!
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

  return "		<div class=\"quiz-time-info\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"time_limit") : stack1), depth0))
    + ":00 minutes time limit</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"welcome-block\">\r\n"
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"time_limit") : stack1),">",0,{"name":"compare","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":1},"end":{"line":4,"column":13}}})) != null ? stack1 : "")
    + "	<div class=\"quiz-title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "</div>\r\n	<div class=\"quiz-description\">"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"quiz") : depth0)) != null ? lookupProperty(stack1,"description") : stack1), depth0))
    + "</div>\r\n	<div class=\"quiz-instruction\">answer all questions to receive quiz results.</div>\r\n	<div class=\"quiz-agreement\">\r\n		<input type=\"checkbox\">\r\n		<b>Honesty Agreement</b> - I affirm that I will act with honesty and integrity at all times during this quiz.\r\n	</div>\r\n	<br>\r\n	<div class=\"quiz-start capital-letter\">begin quiz</div>\r\n</div>";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/quiz/views/edit.js":
/*!*************************************************!*\
  !*** ./sharedemos/static/js/quiz/views/edit.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/quiz */ "./sharedemos/static/js/quiz/models/quiz.js"), __webpack_require__(/*! ../models/option */ "./sharedemos/static/js/quiz/models/option.js"), __webpack_require__(/*! ../models/question */ "./sharedemos/static/js/quiz/models/question.js"), __webpack_require__(/*! ../templates/quiz_start.handlebars */ "./sharedemos/static/js/quiz/templates/quiz_start.handlebars"), __webpack_require__(/*! ../templates/quiz.handlebars */ "./sharedemos/static/js/quiz/templates/quiz.handlebars"), __webpack_require__(/*! ../templates/add_blocks.handlebars */ "./sharedemos/static/js/quiz/templates/add_blocks.handlebars"), __webpack_require__(/*! ../templates/edit.handlebars */ "./sharedemos/static/js/quiz/templates/edit.handlebars"), __webpack_require__(/*! ../templates/popup.handlebars */ "./sharedemos/static/js/quiz/templates/popup.handlebars"), __webpack_require__(/*! ../../helpers/handlebars/i18n */ "./sharedemos/static/js/helpers/handlebars/i18n.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Quiz, QuizOption, QuizQuestion, QuizStartTemplate, QuizTemplate, AddBlockTemplate, EditTemplate, PopupTemplate, Translate) {
  'use strict';

  var EditView = Backbone.View.extend({
    el: '#main_container',
    AUDIO_ICON: "/static/images/thumb-audio.png",
    VIDEO_ICON: "/static/images/video-thumb.jpg",
    QUIZ_TITLE_LIMIT: 150,
    QUIZ_DESCRIPTION_LIMIT: 500,
    QUIZ_CERTIFICATION_LIMIT: 1000,
    QUESTION_TITLE_LIMIT: 200,
    QUESTION_DESCRIPTION_LIMIT: 500,
    MATCHING_ANSWER_TEXT_LIMIT: 250,
    ANSWER_TEXT_LIMIT: 100,
    ANSWER_DESCRIPTION_LIMIT: 350,
    ALLOWED_AUDIO_TYPE: ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3'],
    ALLOWED_VIDEO_TYPE: ['video/mp4', 'video/webm', 'video/ogg'],
    ALLOWED_IMAGE_TYPE: ['image/jpeg', 'image/gif', 'image/jpg', 'image/tiff', 'image/png'],
    events: {
      'click .quiz-start': 'startQuiz',

      /* authoring events*/
      'click .add-block:not(.disabled)': 'showPopupAttrs',
      'click .quiz-nav.prev.disabled': 'showAlert',
      'click .quiz-nav.next.disabled': 'showAlert',
      'click .popup-title .back': 'backPopup',
      'keyup .content-block textarea, .content-block input': 'charCounter',
      'click .content-block textarea, .content-block input[name="due_date"]': 'removeErrorMessages',
      'click .advanced': 'showAdvanced',
      'change #upload-file': 'previewImage',
      'click .remove-file': 'removeImage',
      'click .choose-layout:not(.disabled)[data-answer-type]': 'chooseAnswerOptionType',
      'click .choose-layout[data-type]': 'showPopupAttrs',
      'click .option-check': 'switchOption',
      'click .change-answer-type': 'changeAnswerType',
      'change .css-radio': 'switchRadio',
      'click .popup-box[data-popup="quiz"] .save': 'submitQuiz',
      'click .popup-box[data-popup="question"] .save': 'submitQuestion',
      'click .popup-box[data-popup="save-answer"] .save': 'submitAnswer',
      'click .popup-box[data-popup="save-item"] .save': 'submitAnswerItem',
      'click .quiz-edit-option.edit': 'editEntity',
      'click .quiz-edit-option.duplicate': 'duplicateEntity',
      'click .quiz-edit-option.delete': 'showPopupAttrs',
      'click .confirm-delete': 'deleteEntity',
      'click .cancel': 'hidePopup',
      'click .checklist-item .check, .checklist-item .title': 'selectChecklist',
      'click .publish-quiz:not(.disabled)': 'showPopupAttrs',
      'click .confirm-publish-quiz': 'publishQuiz'
    },
    initialize: function (slugId) {
      this.edit_mode = true;
      this.listenTo(Backbone, 'home_rendered', this.homeRender);
      this.listenTo(Backbone, 'quiz_rendered', this.quizRender);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      Common.loadLanguages(document.locales);
    },
    homeRender: function (view) {
      this.$('.publish-quiz').addClass('disabled');
      this.view = view;
      var attrs = {};
      attrs.add_quiz = true;
      this.$('.quiz-list').append(EditTemplate(attrs));
      attrs = {};
      attrs.edit_quiz = true;
      attrs.quiz_edit = true;
      attrs.quiz_sorting = true;
      this.$('.quiz-list-wrap').append(EditTemplate(attrs));
      this.initializeSortable();
    },
    initializeSortable: function () {
      var root = this;
      this.$(".sortable").sortable({
        update: function (event, ui) {
          var currentQuizSlug = ui.item.attr('quiz-id');
          var previousQuizSlug = ui.item.prev().attr('quiz-id');
          var quizDetails = {};
          quizDetails = {
            'id': currentQuizSlug,
            'reorder': 'quiz',
            'after_ele_slug': previousQuizSlug
          };
          var quiz = new Quiz(quizDetails);
          quiz.save(null, {
            patch: true,
            success: function () {
              root.$(".sortable").sortable("refresh");
            },
            error: function (xhr, status_code, message) {
              root.$(".sortable").sortable("cancel");
            }
          });
        }
      });
    },
    quizRender: function (view) {
      this.is_graded = view.is_graded;
      this.view = view;
      var root = this;
      var questions = view.quiz.changed.questions;

      if (!_.isEmpty(questions)) {
        this.$('.publish-quiz').removeClass('disabled');
        var attrs = {};
        attrs.edit_quiz = true;
        attrs.edit_question = true;
        this.$('.question-wrap .question').append(EditTemplate(attrs));
        this.$('.question-wrap .navigation-wrap .next').addClass('disabled');

        _.each(questions, function (question, index) {
          root.addNewBlock(question);

          if (!question.options.length) {
            root.$(`#question_block_${index} .options-wrap .change-answer-type`).addClass('active');
          }

          var attrs = {};
          attrs.edit_quiz = true;
          attrs.edit_answer = true;
          var option_type = question.option_type.split('_').reverse()[0];

          if (option_type == 'sortable') {
            option_type = 'select';
          }

          attrs.popup = option_type;
          attrs.option_type = question.option_type;

          if (question.option_type.includes('select') || question.option_type == 'sortable') {
            root.$('.question-wrap[question-id="' + question.question_id + '"] .options-wrap .option-item').append(EditTemplate(attrs));

            if (question.option_type == 'sortable') {
              var attrs = {};
              attrs.edit_sort_option = true;
              root.$('.question-wrap[question-id="' + question.question_id + '"] .options-wrap .option-item').append(EditTemplate(attrs));
              root.initSortable();
            }
          } else {
            root.$('.question-wrap[question-id="' + question.question_id + '"] .options-wrap .option-item .match-wrap').append(EditTemplate(attrs));
          }

          var elem_index = parseInt(index) + 1;
          var elem_id = 'question_block_' + elem_index;
          root.navigationOptions(elem_id, question.option_type);
        });

        attrs = {};
        attrs['add_next_question'] = true;
        this.$('.question-wrap:last .navigation-wrap .next').hide();
        this.$('.question-wrap:last').append(EditTemplate(attrs));
        var last_elem_id = this.$('.question-wrap:last').attr('id');
        var option_type = this.$('.question-wrap:last .options-wrap').attr('data-option-type');
        this.navigationOptions(last_elem_id, option_type);
      } else {
        var attrs = {};
        attrs.add_question = true;
        this.$('.quiz-wrap').html(EditTemplate(attrs));
      }
    },
    actionSuccess: function () {
      setTimeout(function () {
        this.$('.form-sending').removeClass("slide-in is-submitted");
        this.$('.form-sent').addClass("slide-in");
        setTimeout(function () {
          this.$('.form-sent').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    actionInProgress: function () {
      this.$('.form-sending').addClass("slide-in is-submitted");
    },
    actionFailed: function () {
      setTimeout(function () {
        this.$('.form-sending').removeClass("slide-in is-submitted");
        this.$('.form-failed').addClass("slide-in");
        setTimeout(function () {
          this.$('.form-failed').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    addEditOptions: function (edit_entity_type, entity, option_type) {
      var attrs = {};
      attrs.edit_quiz = true;

      if (edit_entity_type == 'question') {
        attrs.edit_question = true;
      } else {
        attrs.edit_quiz = true;
        attrs.edit_answer = true;
        var mod_option_type = option_type.split('_').reverse()[0];

        if (mod_option_type == 'sortable') {
          mod_option_type = 'select';
          attrs.edit_sort_option = true;
        }

        attrs.popup = mod_option_type;
        attrs.option_type = option_type;
      }

      if (this.$(entity).hasClass('match-block')) {
        this.$(entity).parent().append(EditTemplate(attrs));
      } else {
        this.$(entity).append(EditTemplate(attrs));
      }

      this.initSortable();
    },
    addNewBlock: function (question) {
      var attrs = {};
      var question_id = question.question_id;

      if (question.option_type != '') {
        attrs[question.option_type] = true;
        this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap').append(EditTemplate(attrs));

        if (this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap .option-item.active').length > 0) {
          this.$('.add-block[data-type="matching_left"]').hide();
          this.$('.add-block[data-type="matching_right"]').removeClass('disabled');
        }
      } else {
        attrs['choose_answer_option_type'] = true;
        this.$('.question-wrap[question-id="' + question_id + '"] .options-wrap').append(EditTemplate(attrs));
      }
    },
    addNewQuestionBlock: function (event) {
      this.$('.pagination .circle.active').removeClass('active');
      this.$('.quiz-wrap .question-wrap.active').removeClass('active');
      var attrs = {};
      attrs['add_question'] = true;
      this.$('.quiz-wrap').append(EditTemplate(attrs));

      if (this.$('.question-wrap').length) {
        attrs['block_type'] = 'previous_button';
      }

      this.$('.quiz-wrap').append(AddBlockTemplate(attrs));
    },
    addOptionBlock: function (option_response, option_type) {
      option_response['block_type'] = option_type;
      var option_id = option_response.option_id;

      if (option_type == 'matching_left') {
        this.$('.question-wrap.active .options-wrap .add-block.left').before('<div class="option-item active" option-id="' + option_id + '"></div>');
        this.$('.add-block[data-type="matching_left"]').hide();
        this.$('.add-block[data-type="matching_right"]').removeClass('disabled');
      } else if (option_type == 'matching_right') {
        this.$('.add-block[data-type="matching_left"]').show();
        this.$('.add-block[data-type="matching_right"]').addClass('disabled');
        this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]').removeClass('active');
      }

      var active_elem;

      if (option_type.includes('matching')) {
        this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]').append(AddBlockTemplate(option_response));
        active_elem = this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"] .match-wrap .match-block');
      } else {
        if (option_type == 'sortable') {
          var sortable_wrap = this.$('.question-wrap.active .options-wrap .sortable-wrap');

          if (sortable_wrap.length == 0) {
            this.$('.question-wrap.active .options-wrap .add-block').before('<div class="sortable-wrap"></div>');
          }

          this.$('.question-wrap.active .options-wrap .sortable-wrap').append(AddBlockTemplate(option_response));
          active_elem = this.$('.question-wrap.active .options-wrap .sortable-wrap .option-item[option-id="' + option_id + '"]');
        } else {
          this.$('.question-wrap.active .options-wrap .add-block').before(AddBlockTemplate(option_response));
          active_elem = this.$('.question-wrap.active .options-wrap .option-item[option-id="' + option_id + '"]');
        }
      }

      this.addEditOptions('answer', active_elem, option_type);
      var elem_id = this.$('.question-wrap.active').attr('id');
      this.$('.question-wrap.active .options-wrap .change-answer-type').removeClass('active');
      this.navigationOptions(elem_id, option_type);
    },
    backPopup: function (event) {
      this.showPopupAttrs(event);
      this.$('.popup-box').attr('edit_answer', true);
    },
    canPublish: function () {
      var root = this;
      var can_publish = true;
      var error_message;
      this.$('.question-wrap').each(function () {
        var option_type = root.$(this).children('.options-wrap').attr('data-option-type');
        var selected_options = root.$(this).children('.options-wrap').children('.option-item.selected');
        var normal_options = root.$(this).children('.options-wrap').children('.option-item');
        var sortable_options = root.$(this).children('.options-wrap').children('.sortable-wrap').children('.option-item');
        var active_options = root.$(this).children('.options-wrap').children('.option-item.active');

        if (option_type.includes('select') && (selected_options.length == 0 || normal_options.length < 2)) {
          can_publish = false;
        } else if (option_type.includes('matching') && (active_options.length > 0 || normal_options.length < 2)) {
          can_publish = false;
        } else if (option_type == 'sortable' && sortable_options.length < 2) {
          can_publish = false;
        } else if (option_type == '') {
          can_publish = false;
        }
      });
      var can_publish_data = {
        'can_publish': can_publish,
        'error_message': 'One Or More Questions has not been answered Correctly!'
      };
      return can_publish_data;
    },
    charCounter: function (event) {
      this.removeErrorMessages();
      var maxChar = parseInt(this.$(event.currentTarget).attr('maxlength'));
      var charLength = this.$(event.currentTarget).val().length;

      if (charLength <= maxChar) {
        var leftChar = maxChar - this.$(event.currentTarget).val().length;
        this.$(event.currentTarget).parents('.block').find('.counter').text(leftChar + " characters left");
      }
    },
    changeAnswerType: function (event) {
      let attr = {
        choose_answer_option_type: true,
        is_edit: false,
        question_id: this.$('.question-wrap.active').attr('question-id')
      };
      this.showPopup(attr);
    },
    chooseAnswerOptionType: function (event) {
      var root = this;
      var question_id = this.$('.question-wrap.active').attr('question-id');
      this.answerType = event.currentTarget.getAttribute('data-answer-type');
      var question_data = {
        'id': question_id,
        'option_type': this.answerType
      };
      var quizQuestion = new QuizQuestion(question_data);
      quizQuestion.save(null, {
        patch: true,
        success: function (response, xhr, status) {
          var attrs = {};
          attrs[root.answerType] = true;
          root.$('.question-wrap.active .add-block[data-popup="choose_answer_option_type"]').remove();
          root.$('.question-wrap.active .options-wrap').attr('data-option-type', root.answerType);
          root.$('.question-wrap.active .options-wrap .add-block').remove();
          root.$('.question-wrap.active .options-wrap').append(EditTemplate(attrs));
          root.$('.publish-quiz').removeClass('disabled');
          root.$('.question-wrap.active .add-block.new').removeClass('disabled');
          root.hidePopup();
          root.$('.quiz-wrap .question-wrap.active .options-wrap .change-answer-type').addClass('active');
        }
      });
    },
    chooseItemType: function (event) {
      var attrs = {};
      var popupName = this.$(event.currentTarget).attr('data-type');
      var popupType = this.$(event.currentTarget).attr('data-item-type');
      attrs[popupName] = true;
      this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
      this.$('.popup-overlay').addClass('active');
      this.overlayCalc();
    },
    customErrorMessage: function (message, target, elem) {
      this.$('.edit-tool-tip').remove();
      var editToolTip = '<div class="edit-tool-tip">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.addClass('error');
    },
    deleteEntity: function (event) {
      var root = this;
      var entity_type = this.$(event.currentTarget).attr('data-type');
      this.actionInProgress();

      if (entity_type == 'question') {
        var question_id = this.$('.question-wrap.active').attr('question-id');
        var question = new QuizQuestion({
          id: question_id
        });
        question.destroy({
          success: function () {
            root.actionSuccess();
            setTimeout(function () {
              root.$('.question-wrap.active').remove();
              root.hidePopup();
              Backbone.history.loadUrl(Backbone.history.fragment);
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      } else if (entity_type == 'answer') {
        this.option_id = this.$(event.currentTarget).attr('data-id');
        var option = new QuizOption({
          id: this.option_id
        });
        var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
        option.destroy({
          data: {
            'option_type': option_type
          },
          processData: true,
          success: function () {
            root.actionSuccess();
            root.$('.question-wrap.active .option-item[option-id="' + root.option_id + '"]').remove();
            var elem_id = root.$('.question-wrap.active').attr('id');
            root.navigationOptions(elem_id, option_type);

            if (option_type == 'matching') {
              root.$('.add-block.left').show();
            }

            setTimeout(function () {
              root.hidePopup();

              if (root.$('.question-wrap.active .options-wrap .option-item').length == 0) {
                root.$('.question-wrap.active .options-wrap .change-answer-type').addClass('active');
              }
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      } else {
        this.quiz_id = this.$(event.currentTarget).attr('data-id');
        var quiz = new Quiz({
          id: this.quiz_id
        });
        quiz.destroy({
          data: null,
          processData: true,
          success: function () {
            root.$('li[quiz-id=' + root.quiz_id + ']').remove();
            root.actionSuccess();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }
    },
    displayEditedMatchOption: function (option_elem, item) {
      if (item.text) {
        if (this.$(option_elem).children('p').length > 0) {
          this.$(option_elem).children('p').html(item.text);
        } else {
          this.$(option_elem).append('<p>' + item.text + '</p>');
        }
      } else {
        this.$(option_elem).children('p').remove();
      }

      if (item.image) {
        if (this.$(option_elem).children('img').length > 0) {
          this.$(option_elem).children('img').attr('src', '/static/media/' + item.image);
        } else {
          this.$(option_elem).append('<img src="/static/media/' + item.image + '"></img>');
        }
      } else {
        this.$(option_elem).children('img').remove();
      }
    },
    displayEditedOtherOptions: function (active_option, option_response, option_type, adding_block) {
      if (option_response.description && option_type.includes('select')) {
        this.$(active_option).children(adding_block).children('.description').html('');

        if (this.$(active_option).children(adding_block).children('.description').length > 0) {
          this.$(active_option).children(adding_block).children('.description').html(option_response.description);
        } else {
          this.$(active_option).children(adding_block).prepend('<div class="description"></div>');
          this.$(active_option).children(adding_block).children('.description').html(option_response.description);
        }
      } else {
        this.$(active_option).children(adding_block).children('.description').remove();
      }

      if (option_response.icon) {
        this.$(active_option).children(adding_block).children('img').attr('src', '');

        if (this.$(active_option).children(adding_block).children('img').length > 0) {
          this.$(active_option).children(adding_block).children('img').attr('src', option_response.icon.url);
        } else {
          this.$(active_option).children(adding_block).append('<img></img>');
          this.$(active_option).children(adding_block).children('img').attr('src', option_response.icon.url);
        }
      } else {
        this.$(active_option).children(adding_block).children('img').remove();
      }
    },
    editEntity: function (event) {
      var root = this;
      var popupName = this.$(event.currentTarget).attr('data-popup');
      var current_event = event;
      var attrs = {};
      attrs[popupName] = true;
      var root = this;

      if (popupName == "question") {
        var question_id = this.$('.question-wrap.active').attr('question-id');
        var question = new QuizQuestion({
          'id': question_id
        });
        question.fetch({
          success: function (model, response) {
            var titleLimit = root.QUESTION_TITLE_LIMIT - response.title.length,
                descriptionLimit = root.QUESTION_DESCRIPTION_LIMIT - response.description.length;
            root.showPopupAttrs(current_event);
            root.$('.popup-box').attr('edit_question', true);
            root.$('.popup-box [name=title]').val(response.title);
            root.$('#question_title_counter').html(`${titleLimit} Characters Left`);
            root.$('.popup-box [name=description]').val(response.description);
            root.$('.popup-box [name=points]').val(response.points);
            root.$('#question_desc_counter').html(`${descriptionLimit} Characters Left`);

            if (response.resource && response.resource.url) {
              let previewImage = response.resource.url;

              if (response.resource.type == "video") {
                previewImage = `${document.cdn_url}${root.VIDEO_ICON}`;
              } else if (response.resource.type == "audio") {
                previewImage = `${document.cdn_url}${root.AUDIO_ICON}`;
              }

              root.$('.popup-box .img-preview').attr('src', previewImage);
              root.$('.popup-box .file-name').text(response.resource.name);
              root.$('.popup-box .block:last-child').addClass('image-added');
            }
          }
        });
      } else if (popupName.includes('select') || popupName == 'sortable') {
        var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
        var option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
        var option = new QuizOption({
          'id': option_id
        });
        option.fetch({
          data: {
            'option_type': option_type
          },
          processData: true,
          success: function (model, response) {
            var textLimit = root.ANSWER_TEXT_LIMIT - response.text.length;
            var descriptionLimit = root.ANSWER_DESCRIPTION_LIMIT - response.description.length;
            root.showPopupAttrs(current_event);
            root.$('.popup-box').attr('edit_answer', true);
            root.$('.popup-box [name=title]').val(response.text);
            root.$('#answer_title_counter').html(`${textLimit} Characters Left`);
            root.$('.popup-box [name=description]').val(response.description);
            root.$('#answer_desc_counter').html(`${descriptionLimit} Characters left`);

            if (response.icon && response.icon.url) {
              root.$('.popup-box .file-name').text(response.icon.name);
              root.$('.popup-box .img-preview').attr('src', response.icon.url);
              root.$('.popup-box .block:last-child').addClass('image-added');
            }
          }
        });
      } else if (["left", "right", "matching"].includes(popupName)) {
        var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
        var option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
        var option = new QuizOption({
          'id': option_id
        });
        var attrs = {};
        attrs.add_item = true;
        var text_element = this.$(event.target).parents('.match-wrap').find('p').length;
        var image_element = this.$(event.target).parents('.match-wrap').find('img').length;
        var option_type;

        if (text_element > 0 && image_element > 0) {
          attrs.option_text = true;
          attrs.option_image = true;
        }

        if (text_element > 0) {
          attrs.option_text = true;
        } else if (image_element > 0) {
          attrs.option_image = true;
        }

        var option_side = this.$(event.currentTarget).parents('.match-wrap').attr('class').split(' ')[1];
        attrs.option_type = 'matching_' + option_side;
        attrs.option_id = option_id;
        option.fetch({
          data: {
            'option_type': option_type
          },
          processData: true,
          success: function (model, response) {
            root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
            root.$('.popup-overlay').addClass('active');
            root.overlayCalc();
            var option = response.item_right;

            if (option_side == 'left') {
              option = response.item_left;
            }

            root.$('.popup-box').attr('edit_answer', true);
            root.$('.popup-box [name=description]').val(option.text);

            if (option.text) {
              let descriptionLimit = root.MATCHING_ANSWER_TEXT_LIMIT - option.text.length;
              root.$('#item_desc_counter').html(`${descriptionLimit} Characters Left`);
            }

            if (option.image) {
              root.$('.popup-box .img-preview').attr('src', option.image);
              root.$('.popup-box .block:last-child').addClass('image-added');
            }
          }
        });
      } else {
        var quiz_id = this.$(event.currentTarget).parents('li').attr('quiz-id');
        var quiz = new Quiz({
          'id': quiz_id
        });
        quiz.fetch({
          processData: true,
          success: function (model, response) {
            var titleLimit = root.QUIZ_TITLE_LIMIT - response.name.length,
                descriptionLimit = root.QUIZ_DESCRIPTION_LIMIT - response.description.length;
            root.showPopupAttrs(current_event);
            root.$('.popup-box').attr('edit_quiz', true);
            root.$('.popup-box [name=title]').val(response.name);
            root.$('#quiz_title_counter').html(`${titleLimit} Characters Left`);
            root.$('.popup-box [name=description]').val(response.description);
            root.$('#quiz_desc_counter').html(`${descriptionLimit} Characters Left`);
            root.$('.option-check').removeClass('active');

            if (response.is_sequential_questions) {
              root.$('#sequential .option-check:contains("sequential")').addClass('active');
            } else {
              root.$('#sequential .option-check:contains("random")').addClass('active');
            }

            if (response.can_skip) {
              root.$('#skip .option-check:contains("yes")').addClass('active');
            } else {
              root.$('#skip .option-check:contains("no")').addClass('active');
            }

            if (response.time_limit > 0) {
              root.$('#nolimit').removeAttr('checked').parents('.radio-block').addClass('disabled');
              root.$('#time').prop('checked', true).parents('.radio-block').removeClass('disabled');
              root.$('.radio-block input[name="minutes"]').attr('disabled', false).val(response.time_limit);
            }

            if (response.due_date) {
              var date_data = response.due_date.split(' ')[0].split('-');
              var due_date = date_data[2] + '/' + date_data[1] + '/' + date_data[0];
              root.$('#due_date').val(due_date);
            }

            if (response.is_unlimited == true) {
              root.$('#noreattemp').removeAttr('checked').parent().addClass('disabled');
              root.$('#unlimited').prop('checked', true).parent().removeClass('disabled');
              root.$('#times').removeAttr('checked').parent().addClass('disabled');
              root.$('.radio-block input[name="attempts_value"]').attr('disabled', true);
            } else if (response.re_attempts_count > 0) {
              root.$('#noreattemp').removeAttr('checked').parent().addClass('disabled');
              root.$('#unlimited').removeAttr('checked').parent().addClass('disabled');
              root.$('#times').prop('checked', true).parent().removeClass('disabled');
              root.$('.radio-block input[name="attempts_value"]').attr('disabled', false);
              root.$('.radio-block input[name="attempts_value"]').val(response.re_attempts_count);
            } else {
              root.$('#times').removeAttr('checked').parent().addClass('disabled');
              root.$('.radio-block input[name="attempts_value"]').attr('disabled', true);
              root.$('#unlimited').removeAttr('checked').parent().addClass('disabled');
              root.$('#noreattemp').prop('checked', true).parent().removeClass('disabled');
            }

            if (response.grading_style == 'pass_or_fail') {
              root.$('#r_points').removeAttr('checked').parents('.radio-block').addClass('disabled');
              root.$('#pass').prop('checked', true).parents('.radio-block').removeClass('disabled');
              root.$('.radio-block input[name="pass_marks"]').attr('disabled', false).val(response.grading_points);
            }

            if (response.icon && response.icon.url) {
              root.$('.popup-box .file-name').text(response.icon.name);
              root.$('.popup-box .img-preview').attr('src', response.icon.url);
              root.$('.popup-box .block:nth-last-child(2)').addClass('image-added');
            }

            root.$('.popup-box [name=certification]').val(response.certification);
            var certificationLimit = root.QUIZ_CERTIFICATION_LIMIT - response.certification.length;
            root.$('#quiz_cert_counter').html(`${certificationLimit} Characters Left`);
          }
        });
      }
    },
    duplicateEntity: function (event) {
      let quizSlug = this.$(event.currentTarget).parents('li').attr('quiz-id');
      $('.grey_layout_bg').addClass('active').append($('<span>', {
        id: 'loading_icon'
      }));
      let quiz = new Quiz({
        'id': quizSlug,
        'copy': true
      });
      quiz.save(null, {
        patch: true,

        success(response) {
          setTimeout(() => {
            Backbone.history.loadUrl(Backbone.history.fragment);
          }, 2000);
        },

        complete() {
          $('.grey_layout_bg').removeClass('active').empty();
        }

      });
    },
    hidePopup: function (popupName) {
      this.$('.popup-overlay').removeClass('active');
      this.$('.popup-wrap').html("");
    },
    initSortable: function (event) {
      var root = this;
      this.$(".sortable-wrap").sortable({
        handle: ".quiz-drag",
        containment: "parent",
        update: function (event, ui) {
          var option_id = ui.item.attr('option-id');
          var options_order = {};
          root.$('.question-wrap.active .options-wrap .option-item').each(function (index) {
            var option_id = 'option_' + $(this).attr('option-id');
            var index = parseInt(index + 1);
            options_order[option_id] = index;
          });
          var option_data = {
            'id': option_id,
            'option_type': 'sortable',
            'options_order': options_order,
            'reorder': true
          };
          var quizOption = new QuizOption(option_data);
          quizOption.save(null, {
            patch: true
          });
        }
      });
    },
    navigationOptions: function (active_elem_id, option_type) {
      var alert = true;
      var normal_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item');
      var selected_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item.selected');
      var active_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .option-item.active');
      var sortable_options = this.$('.question-wrap#' + active_elem_id + ' .options-wrap .sortable-wrap .option-item');

      if (option_type.includes('select') && (selected_options.length == 0 || normal_options.length < 2)) {
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');

        if (this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
        }

        alert = false;
      } else if (option_type.includes('matching') && (active_options.length > 0 || normal_options.length < 2)) {
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');

        if (this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
        }

        alert = false;
      } else if (option_type == 'sortable' && sortable_options.length < 2) {
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
        this.$('.question-wrap#' + active_elem_id + ' .add-block.new').hide();

        if (this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
        }

        alert = false;
      } else if (option_type) {
        var elem_id = this.$('.question-wrap#' + active_elem_id + '').attr('id');
        var index = elem_id.split('_')[2];
        var next_index = parseInt(elem_id.split('_')[2]) + 1;
        var prev_index = parseInt(elem_id.split('_')[2]) - 1;
        elem_id = elem_id.replace(index, next_index);

        if (!prev_index) {
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').hide();
        }

        if (this.$('#' + elem_id).length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').removeClass('disabled').show();
        } else {
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
          this.$('.question-wrap#' + active_elem_id + ' .add-block.new').show();
        }

        elem_id = elem_id.replace(next_index, prev_index);

        if (this.$('#' + elem_id).length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').removeClass('disabled').show();
        }
      } else {
        if (this.$('.question-wrap#' + active_elem_id + ' .add-block.new').length > 0) {
          this.$('.question-wrap#' + active_elem_id + ' .add-block.new').addClass('disabled').show();
          this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').hide();
        }

        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .next').addClass('disabled');
        this.$('.question-wrap#' + active_elem_id + ' .navigation-wrap .prev').addClass('disabled');
        alert = false;
      }

      return alert;
    },
    overlayCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    previewImage: function (event) {
      this.removeErrorMessages();
      var resource = event.target.files[0];

      if (!resource || !/\.(gif|jpg|jpeg|tiff|png|mp4|webm|ogg|mp3|wav)$/i.test(resource.name)) {
        return false;
      }

      if (this.ALLOWED_VIDEO_TYPE.indexOf(resource.type) >= 0) {
        let filesizeMB = resource.size / 1000000;

        if (filesizeMB > Common.VIDEO_FILE_MAX_SIZE) {
          var message = "Your video cannot be uploaded because it's too large.Allowed limit :" + Common.VIDEO_FILE_MAX_SIZE + "MB.";
          this.$(event.currentTarget).parents('.block').find('.error-message').text(message);
          return false;
        }

        this.$('.img-preview').attr('src', '/static/images/author/thumb-video.jpg').removeAttr('data-remove');
      } else if (this.ALLOWED_AUDIO_TYPE.indexOf(resource.type) >= 0) {
        this.$('.img-preview').attr('src', '/static/images/thumb-audio.png').removeAttr('data-remove');
      } else {
        this.$('.img-preview').attr('src', URL.createObjectURL(resource)).removeAttr('data-remove');
      }

      this.$(event.currentTarget).parents('.block').find('.error-message').text("");
      this.$(event.currentTarget).parents('.block').find('.file-name').text(resource.name);
      this.$(event.currentTarget).parents('.block').addClass('image-added');
    },
    publishQuiz: function (event) {
      var root = this;
      var can_publish_data = this.canPublish();

      if (!can_publish_data.can_publish) {
        this.hidePopup();
        var attrs = {};
        attrs.alert = true;
        attrs.alert_message = can_publish_data.error_message;
        this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
        this.$('.popup-overlay').addClass('active');
        this.overlayCalc();
        return;
      }

      this.actionInProgress();
      var quiz_data = {
        'id': document.slugId,
        'publish': true
      };
      this.quiz = new Quiz(quiz_data);
      setTimeout(function () {
        root.quiz.save(null, {
          patch: true,
          success: function (response, xhr, status) {
            root.actionSuccess();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }, 1000);
    },
    removeErrorMessages: function () {
      this.$('.edit-tool-tip').remove();
      this.$('input').removeClass('error');
      this.$('textarea').removeClass('error');
    },
    removeImage: function (event) {
      this.$(event.currentTarget).parents('.block').removeClass('image-added');
      this.$('.img-preview').removeAttr('src').removeAttr('style').attr('data-remove', true);
      this.$('.upload-file').val('');
    },
    saveAnswer: function (answer_data, option_type) {
      if (option_type.includes('select')) {
        this.$('.question-wrap.active .choose-answer').text(Translate("check the correct answer")).removeClass('error');
      } else {
        this.$('.question-wrap.active .choose-answer').text(" ").removeClass('error');
      }

      var root = this;
      this.quizOption = new QuizOption();
      setTimeout(function () {
        root.quizOption.save(null, {
          processData: false,
          cache: false,
          contentType: false,
          data: answer_data,
          success: function (response) {
            var option_response = response.attributes;
            root.actionSuccess();
            root.addOptionBlock(option_response, option_type);
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }, 1000);
    },
    saveEditedAnswer: function (option_id, options_data, option_type) {
      var root = this;
      this.quizOption = new QuizOption({
        'id': option_id
      });
      setTimeout(function () {
        root.quizOption.save(null, {
          processData: false,
          cache: false,
          contentType: false,
          data: options_data,
          success: function (response) {
            root.actionSuccess();
            var option_response = response.attributes;
            var active_option = root.$('.option-item[option-id="' + option_id + '"]');
            root.$(active_option).children('.info-block').removeAttr('style');
            root.$(active_option).removeClass('open');

            if (option_type.includes('select')) {
              root.$(active_option).children('.title').html(option_response.text);

              if (!option_response.description) {
                root.$(active_option).children('.info-block').empty();
              }

              if (!option_response.description && !option_response.icon) {
                root.$(active_option).children('.arrow').hide();
              } else {
                if (root.$(active_option).children('.arrow').length == 0) {
                  root.$(active_option).children('.info-block').before('<div class="arrow"></div>');
                }

                root.$(active_option).children('.arrow').show();
                root.displayEditedOtherOptions(active_option, option_response, option_type, '.info-block');
              }
            } else if (option_type == 'sortable') {
              root.$(active_option).children('.order-info').children('h2').html(option_response.text);
              root.displayEditedOtherOptions(active_option, option_response, option_type, '.order-info');
            } else {
              var option_side = option_type.split('_')[1];

              if (option_side == 'left') {
                var left_option = root.$(active_option).children('.match-wrap.left').children('.match-block');
                root.displayEditedMatchOption(left_option, option_response.item_left);
              } else {
                var right_option = root.$(active_option).children('.match-wrap.right').children('.match-block');
                root.displayEditedMatchOption(right_option, option_response.item_right);
              }
            }

            var elem_id = root.$('.question-wrap.active').attr('id');
            root.navigationOptions(elem_id, option_type);
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }, 1000);
    },
    saveEditedQuestion: function (question_id, question_data) {
      var root = this;
      this.quizQuestion = new QuizQuestion({
        'id': question_id
      });
      setTimeout(function () {
        root.quizQuestion.save(null, {
          processData: false,
          cache: false,
          contentType: false,
          data: question_data,
          success: function (response) {
            root.actionSuccess();
            var question_response = response.attributes;

            if (question_response.resource && _.indexOf(["audio", "video"], question_response.resource.type) != -1) {
              let thumbnail = root.AUDIO_ICON;

              if (question_response.resource.type == "video") {
                thumbnail = root.VIDEO_ICON;
              }

              question_response.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
            }

            question_response['update_question'] = true;
            question_response['index'] = parseInt(root.$('.question-wrap.active').attr('id').split('_')[2]);
            var active_question = root.$('.question-wrap.active .question');
            root.$(active_question).html(AddBlockTemplate(question_response));
            var attrs = {};
            attrs.edit_quiz = true;
            attrs.edit_question = true;
            root.$(active_question).append(EditTemplate(attrs));
            var total_points = parseInt(root.$('.total-points').text()) + question_response.points - parseInt(root.$('.question-points').text());
            root.$('.quiz-main-wrap .left-pannel .question-points').html(question_response.points);
            root.$('.quiz-main-wrap .left-pannel .total-points').html(total_points);
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }, 1000);
    },
    saveQuestion: function (question_data) {
      var root = this;
      this.$('.question-wrap.active .navigation-wrap .next').removeClass('disabled');
      this.quizQuestion = new QuizQuestion();
      setTimeout(function () {
        root.quizQuestion.save(null, {
          processData: false,
          cache: false,
          contentType: false,
          data: question_data,
          success: function (response) {
            root.actionSuccess();
            var question_response = response.attributes;

            if (question_response.resource && _.indexOf(["audio", "video"], question_response.resource.type) != -1) {
              let thumbnail = root.AUDIO_ICON;

              if (question_response.resource.type == "video") {
                thumbnail = root.VIDEO_ICON;
              }

              question_response.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
            }

            question_response['index'] = root.$(".question-wrap:last").length > 0 ? parseInt($(".question-wrap:last").attr('id').split('_')[2]) + 1 : 1;
            question_response['block_type'] = "question";
            root.$('.add-block[data-popup="question"]').remove();
            root.$('.quiz-wrap').append(AddBlockTemplate(question_response));
            question_response['block_type'] = "";
            question_response['update_question'] = true;
            root.$('.question-wrap.active .question').html(AddBlockTemplate(question_response));
            var question_response_id = question_response.question_id;
            root.$('.question-wrap[question-id="' + question_response_id + '"]').addClass('active');
            var active_elem = root.$('.question-wrap.active .question');
            root.addEditOptions('question', active_elem);
            root.addNewBlock(question_response);
            root.$('.question-wrap .add-block.new').remove();
            var attrs = {};
            attrs['add_next_question'] = true;
            root.$('.question-wrap.active').append(EditTemplate(attrs));
            question_response['pagination'] = true;
            question_response['first_question'] = false;

            if (question_response['index'] == 1) {
              question_response['first_question'] = true;
              root.$(".quiz-main-wrap .quiz-pagination-wrap").append(EditTemplate(question_response));
            } else {
              root.$(".quiz-main-wrap .pagination").append(EditTemplate(question_response));
            }

            var total_points = parseInt(root.$('.quiz-main-wrap .left-pannel .total-points').html()) + question_response.points;
            root.$('.quiz-main-wrap .left-pannel .question-points').html(question_response.points);
            root.$('.quiz-main-wrap .left-pannel .total-points').html(total_points);
            var elem_id = root.$('.question-wrap.active').attr('id');
            root.navigationOptions(elem_id, question_response.option_type);
            root.$('.question-wrap[question-id="' + question_response_id + '"] .navigation-wrap .next').addClass('disabled');
            root.$('.publish-quiz').addClass('disabled');
            var elem_id = root.$('.question-wrap.active').attr('id');
            var index = elem_id.split('_')[2];
            var prev_index = parseInt(elem_id.split('_')[2]) - 1;
            elem_id = elem_id.replace(index, prev_index);

            if (root.$('#' + elem_id).length > 0) {
              var prev_question_option_type = root.$('.question-wrap#' + elem_id + ' .options-wrap').attr('data-option-type');
              root.navigationOptions(elem_id, prev_question_option_type);
              root.$('.question-wrap.active .navigation-wrap .prev').show();
            }

            root.$('.previous_button').remove();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          },
          error: function (response) {
            root.actionFailed();
            setTimeout(function () {
              root.hidePopup();
            }, 2000);
          }
        });
      }, 1000);
    },
    saveQuiz: function (data, quizId) {
      var root = this;
      this.quiz = new Quiz({
        'id': quizId || null
      });
      this.quiz.save(null, {
        processData: false,
        cache: false,
        contentType: false,
        data: data,
        success: function (response) {
          root.actionSuccess();
          setTimeout(() => {
            root.hidePopup();
            Backbone.history.loadUrl(Backbone.history.fragment);
          }, 2000);
        },
        error: function (response) {
          root.actionFailed();
          setTimeout(() => {
            root.hidePopup();
          }, 2000);
        }
      });
    },
    selectChecklist: function (event) {
      var root = this;
      setTimeout(function () {
        this.option_type = this.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');
        var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');
        var option_data = {
          'id': option_id,
          'is_correct_option': this.$(event.currentTarget).parents('.option-item').hasClass('selected') ? true : false,
          'option_type': this.option_type,
          'correct_option': true
        };

        if (option_data['is_correct_option']) {
          this.$('.question-wrap.active .choose-answer').removeClass('error');
        }

        var quizOption = new QuizOption(option_data);
        quizOption.save(null, {
          patch: true,
          success: function (response, xhr, status) {
            setTimeout(function () {
              var elem_id = root.$('.question-wrap.active').attr('id');
              root.navigationOptions(elem_id, option_data['option_type']);
            }, 500);
          }
        });
      }, 500);
    },
    showAlert: function () {
      var elem_id = this.$('.question-wrap.active').attr('id');
      var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');

      if (!this.navigationOptions(elem_id, option_type)) {
        this.validateQuizQuestion();
      }
    },
    showPopupAttrs: function (event) {
      var target_class = this.$(event.currentTarget).attr('class').split(' ').reverse()[0];

      if (target_class != 'edit' && target_class != 'publish-quiz') {
        if (!Common.isDefaultLocale(this)) {
          this.overlayCalc();
          return;
        }
      }

      var attrs = {};
      attrs['is_graded'] = this.is_graded;
      var edit_answer = this.$('.popup-box').attr('edit_answer');
      var popupName = this.$(event.currentTarget).attr('data-popup');
      var popupType = this.$(event.currentTarget).attr('data-type');
      var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');

      if (option_type && popupName == 'question' && target_class == 'new') {
        if (!this.validateQuizQuestion()) return false;
      }

      if (popupType && (popupType.includes('matching') || popupType == 'sortable' || popupType == 'item_style')) {
        var option_type = this.$(event.currentTarget).attr('data-item-type');

        if (option_type == "text_image") {
          var types = option_type.split('_');
          attrs['option_' + types[0]] = true;
          attrs['option_' + types[1]] = true;
        } else if (option_type == "text" || option_type == "image") {
          attrs['option_' + option_type] = true;
        }
      }

      attrs[popupName] = true;
      attrs['option_type'] = popupType;
      var quiz_id = this.$(event.currentTarget).parents('li').attr('quiz-id');

      if (quiz_id !== undefined) {
        attrs['quiz_id'] = quiz_id;
      } else if (edit_answer != undefined) {
        attrs['quiz_id'] = this.$('.popup-box .content-block .block').attr('data-id');
      }

      var question_id = this.$(event.currentTarget).parents('.question-wrap').attr('question-id');

      if (question_id == undefined) {
        attrs['question_id'] = this.$('.question-wrap.active').attr('question-id');
      } else {
        attrs['question_id'] = question_id;
      }

      var option_id = this.$(event.currentTarget).parents('.option-item').attr('option-id');

      if (option_id !== undefined) {
        attrs['option_id'] = option_id;
      } else if (edit_answer != undefined) {
        attrs['option_id'] = this.$('.popup-box .content-block .block').attr('data-id');
      }

      if (target_class == 'edit') {
        attrs.is_edit = true;
      } else {
        attrs.is_edit = false;
      }

      if (target_class == 'new') {
        this.addNewQuestionBlock();
      } else {
        if (target_class == 'publish-quiz' && attrs['question_id']) {
          if (!this.validateQuizQuestion()) return false;
        }

        this.showPopup(attrs);

        if (attrs.quiz) {
          this.$("#due_date").datepicker({
            language: 'en',
            autoClose: true,
            minDate: new Date(),
            dateFormat: "dd/mm/yyyy"
          });
        }

        ;
      }
    },
    validateQuizQuestion: function () {
      var selected_options = this.$('.question-wrap.active .options-wrap .option-item.selected');
      var normal_options = this.$('.question-wrap.active .options-wrap .option-item');
      var match_options = this.$('.question-wrap.active .options-wrap .option-item.active');
      var target_elem = this.$('.question-wrap.active .choose-answer');
      var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');

      if (normal_options.length < 2 || match_options.length > 0) {
        target_elem.text(Translate("add minimum two answers")).addClass('error');
        return false;
      } else if (selected_options.length == 0 && option_type.includes('select')) {
        target_elem.text(Translate("check the correct answer")).addClass('error');
        return false;
      }

      return true;
    },
    showPopup: function (attrs) {
      this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
      this.$('.popup-overlay').addClass('active');
      this.overlayCalc();
    },
    showAdvanced: function (event) {
      this.$(event.currentTarget).parents('.popup-box').toggleClass('advanced-show');
      setTimeout(function () {
        this.$('.popup-box .content-block').animate({
          scrollTop: 750
        }, 'slow');
      }, 100);
    },
    submitAnswer: function (event) {
      var answer_title = this.$('input[name="title"]');
      var answer_description = this.$('textarea[name="description"]').val();
      var option_type = this.$(event.currentTarget).attr('data-type');
      var question_id = this.$('.question-wrap.active').attr('question-id');
      var icon_file = this.$('.popup-box :file').val() ? this.$('.popup-box :file')[0].files[0] : null;
      var remove_icon = this.$('.img-preview').attr('data-remove');
      var error_flag = false;

      if (!answer_title.val()) {
        this.customErrorMessage('Provide a title for the answer', this.$(answer_title).parent(), this.$(answer_title));
        error_flag = true;
      }

      if (error_flag) return false;
      this.removeErrorMessages();
      var answer_data = new FormData();
      answer_data.append('title', answer_title.val());
      answer_data.append('description', answer_description);
      answer_data.append('option_type', option_type);
      answer_data.append('question_id', question_id);
      answer_data.append('icon', icon_file);
      answer_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));

      if (remove_icon) {
        answer_data.append('remove_icon', remove_icon);
      }

      this.actionInProgress();
      var edit_answer = this.$('.popup-box').attr('edit_answer');

      if (edit_answer) {
        var option_id = this.$(event.currentTarget).attr('data-id');
        this.saveEditedAnswer(option_id, answer_data, option_type);
      } else {
        this.saveAnswer(answer_data, option_type);
      }
    },
    submitAnswerItem: function (event) {
      var answer_description = this.$('textarea[name="description"]');
      var option_type = this.$(event.currentTarget).attr('data-type');
      var question_id = this.$('.question-wrap.active').attr('question-id');
      var option_id = this.$('.question-wrap.active .options-wrap .option-item.active').length > 0 ? this.$('.question-wrap.active .options-wrap .option-item.active').attr('option-id') : null;
      var icon = this.$('input[name="upload-file"]');
      var edit_answer = this.$('.popup-box').attr('edit_answer') == undefined ? false : this.$('.popup-box').attr('edit_answer');
      var img_preview = this.$('.img-preview').attr('src');
      var item_type = this.$('.popup-box .content-block').attr('data-type');
      var error_flag = false;

      if ((item_type == 'text' || item_type == 'text_image') && !answer_description.val()) {
        this.customErrorMessage('Briefly describe your option', this.$(answer_description).parent(), this.$(answer_description));
        error_flag = true;
      } else if ((item_type == 'image' || item_type == 'text_image') && (edit_answer == false && !icon.val() || edit_answer == "true" && img_preview == undefined)) {
        this.customErrorMessage('Please Provide a Image', this.$(icon).parent(), this.$(icon));
        error_flag = true;
      }

      if (error_flag) return false;
      this.removeErrorMessages();
      var icon_file = this.$('input[name="upload-file"]').val() ? this.$('.popup-box :file')[0].files[0] : null;
      var answer_data = new FormData();

      if (answer_description.val()) {
        answer_data.append('description', answer_description.val());
      }

      answer_data.append('option_type', option_type);
      answer_data.append('question_id', question_id);
      answer_data.append('option_id', option_id);
      answer_data.append('icon', icon_file);
      answer_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      this.actionInProgress();

      if (edit_answer) {
        var remove_icon = this.$('.img-preview').attr('data-remove');
        var option_id = this.$(event.currentTarget).attr('data-id');

        if (remove_icon) {
          answer_data.append('remove_icon', remove_icon);
        }

        this.saveEditedAnswer(option_id, answer_data, option_type);
      } else {
        this.saveAnswer(answer_data, option_type);
      }
    },
    submitQuestion: function (event) {
      var question_id;
      var active_question = this.$('.question-wrap.active');

      if (active_question.length > 0) {
        question_id = this.$('.question-wrap.active').attr('question-id');
      }

      var question_title = this.$('input[name="title"]');
      var question_description = this.$('textarea[name="description"]');
      var question_points = this.$('input[name="points"]').val();
      var question_points_elem = this.$('input[name="points"]');
      var quiz_slug = document.slugId;
      var resource_file = this.$('.popup-box :file')[0].files[0];

      if (resource_file) {
        var resource_type = resource_file.type;

        if (this.ALLOWED_VIDEO_TYPE.indexOf(resource_type) >= 0) {
          resource_type = 'video';
        } else if (this.ALLOWED_AUDIO_TYPE.indexOf(resource_type) >= 0) {
          resource_type = 'audio';
        } else if (this.ALLOWED_IMAGE_TYPE.indexOf(resource_type) >= 0) {
          resource_type = 'image';
        }
      }

      var error_flag = false;

      if (!question_title.val()) {
        this.customErrorMessage('Provide a title for the question', this.$(question_title).parent(), this.$(question_title));
        error_flag = true;
      } else if (question_points_elem.length > 0 && !question_points) {
        this.customErrorMessage('Provide the points for the Question', this.$(question_points_elem).parent(), this.$(question_points_elem));
        error_flag = true;
      } else if (question_points_elem.length > 0 && question_points.match(/^\d+$/) == null) {
        this.customErrorMessage('Points Value must be integer', this.$(question_points_elem).parent(), this.$(question_points_elem));
        error_flag = true;
      }

      ;
      if (error_flag) return false;
      this.removeErrorMessages();
      var question_data = new FormData();
      question_data.append('title', question_title.val());
      question_data.append('description', question_description.val());

      if (question_points != undefined) {
        question_data.append('points', question_points);
      }

      question_data.append('quiz_id', quiz_slug);
      question_data.append('resource', resource_file);
      question_data.append('resource_type', resource_type);
      question_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      this.actionInProgress();
      var edit_question = this.$('.popup-box').attr('edit_question');

      if (edit_question) {
        var remove_resource = this.$('.img-preview').attr('data-remove');

        if (remove_resource) {
          question_data.append('remove_resource', remove_resource);
        }

        this.saveEditedQuestion(question_id, question_data);
      } else {
        this.saveQuestion(question_data);
      }
    },
    submitQuiz: function (event) {
      var title = this.$('input[name="title"]');
      var description = this.$('textarea[name="description"]');
      var certification = this.$('textarea[name="certification"]');
      var date = this.$('input[name="due_date"]');
      var time_limit = this.$('.radio-block:not(.disabled) input[name="time"]');
      var time_limit_val_elem = this.$('.radio-block:not(.disabled) input[name="minutes"]');
      var re_attempt = this.$('.radio-block:not(.disabled) input[name="attempts"]');
      var re_attempt_val_elem = this.$('.radio-block:not(.disabled) input[name="attempts_value"]');
      var grading_points = this.$('.radio-block:not(.disabled) input[name="result"]');
      var grading_points_val_elem = this.$('.radio-block:not(.disabled) input[name="pass_marks"]');
      var icon_file = this.$('.popup-box :file')[0].files[0];
      var error_flag = false;

      if (!title.val()) {
        this.customErrorMessage('Provide a title for the quiz', this.$(title).parent(), this.$(title));
        error_flag = true;
      } else if (time_limit.val() == 'time' && !time_limit_val_elem.val()) {
        this.customErrorMessage('Provide the time limit for the quiz', this.$(time_limit).parent(), this.$(time_limit));
        error_flag = true;
      } else if (time_limit.val() == 'time' && time_limit_val_elem.val().match(/^\d+$/) == null) {
        this.customErrorMessage('Time limit Value must be integer', this.$(time_limit).parent(), this.$(time_limit));
        error_flag = true;
      } else if (re_attempt.val() == 'attempts' && !re_attempt_val_elem.val()) {
        this.customErrorMessage('Provide the number of attempts for the quiz', this.$(re_attempt).parent(), this.$(re_attempt));
        error_flag = true;
      } else if (re_attempt.val() == 'attempts' && re_attempt_val_elem.val().match(/^\d+$/) == null) {
        this.customErrorMessage('Attempts Value must be integer', this.$(re_attempt).parent(), this.$(re_attempt));
        error_flag = true;
      } else if (grading_points.val() == 'pass_marks' && !grading_points_val_elem.val()) {
        this.customErrorMessage('Provide the passing marks for the quiz', this.$(grading_points).parent(), this.$(grading_points));
        error_flag = true;
      } else if (grading_points.val() == 'pass_marks' && grading_points_val_elem.val().match(/^\d+$/) == null) {
        this.customErrorMessage('Marks Value must be integer', this.$(grading_points).parent(), this.$(grading_points));
        error_flag = true;
      } else if (!certification.val()) {
        this.customErrorMessage('Briefly describe certification for your quiz', this.$(certification).parent(), this.$(certification));
        error_flag = true;
      }

      ;
      if (error_flag) return false;
      this.removeErrorMessages();
      var quiz_data = new FormData();
      quiz_data.append('csrf_token', $('meta[name=csrf-token]').attr('content'));
      quiz_data.append('name', title.val());
      quiz_data.append('description', description.val());
      quiz_data.append('certification', certification.val());

      if (this.$('#sequential .option-check.active').html() == 'sequential') {
        quiz_data.append('is_sequential', true);
      }

      if (this.$('#skip .option-check.active').html() == 'yes') {
        quiz_data.append('can_skip', true);
      }

      quiz_data.append('due_date', date.val());

      if (time_limit.val() == 'time') {
        quiz_data.append('time_limit', time_limit_val_elem.val());
      } else {
        quiz_data.append('time_limit', 0);
      }

      if (re_attempt.val() == 'attempts') {
        quiz_data.append('re_attempts_count', re_attempt_val_elem.val());
      } else if (re_attempt.val() == 'noreattempts') {
        quiz_data.append('re_attempts_count', 0);
      }

      if (grading_points.val() == 'points') {
        quiz_data.append('grading_style', 'points');
      } else {
        quiz_data.append('grading_style', 'pass_or_fail');
      }

      if (grading_points.val() == 'pass_marks') {
        quiz_data.append('grading_points', grading_points_val_elem.val());
      } else {
        quiz_data.append('grading_points', 0);
      }

      if (icon_file) {
        quiz_data.append('icon', icon_file);
      }

      this.actionInProgress();
      var quizId = this.$(event.currentTarget).attr('data-id'),
          removeIcon = this.$('.img-preview').attr('data-remove');

      if (removeIcon) {
        quiz_data.append('remove_icon', removeIcon);
      }

      this.saveQuiz(quiz_data, quizId);
    },
    switchOption: function (event) {
      this.$(event.currentTarget).parent().find('.option-check').removeClass('active');
      this.$(event.currentTarget).addClass('active');
    },
    switchRadio: function (event) {
      this.$(event.currentTarget).parents('.block').find('.radio-block').addClass('disabled');
      this.$(event.currentTarget).parents('.radio-block').removeClass('disabled');
      this.$(event.currentTarget).parents('.block').find('.radio-block.disabled').find('input[type="text"]').attr('disabled', true);
      this.$(event.currentTarget).parents('.block').find('.radio-block').find('input[type="text"]').val('');
      this.$(event.currentTarget).parents('.block').find('.radio-block:not(.disabled)').find('input[type="text"]').attr('disabled', false);
    }
  });
  return EditView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/views/home.js":
/*!*************************************************!*\
  !*** ./sharedemos/static/js/quiz/views/home.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../collections/quiz */ "./sharedemos/static/js/quiz/collections/quiz.js"), __webpack_require__(/*! ../templates/home.handlebars */ "./sharedemos/static/js/quiz/templates/home.handlebars"), __webpack_require__(/*! utils */ "./sharedemos/static/js/utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, QuizCollections, HomeTemplate) {
  'use strict';

  var HomeView = Backbone.View.extend({
    el: '#main_container',
    QUIZ_ICON: "/static/images/checklist-banner1.png",
    events: {
      'click .quiz': 'selectQuiz',
      'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent'
    },
    initialize: function () {
      this.$("#search-terms").on('keyup', {
        'root': this,
        'common': Common
      }, Common.showSearchBox);
      this.$("#search-label").on('click', {
        'root': Common
      }, Common.showMobileSearchBox);
      this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {
        'root': Common
      }, Common.closeSearchBox);
      this.$(".search-input-cancel").on('click', {
        'root': Common
      }, Common.clearInputText);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      this.quizCollections = new QuizCollections();
      this.listenTo(this.quizCollections, 'sync', this.render);
      this.quizCollections.fetch({
        reset: true
      });
    },
    render: function () {
      var root = this;

      _.each(this.quizCollections.attributes, function (quiz) {
        if (!quiz.icon) {
          quiz.icon = {
            url: `${document.cdn_url}${root.QUIZ_ICON}`,
            name: quiz.name
          };
        }
      });

      this.$('#block_container').html(HomeTemplate({
        quizs: this.quizCollections.attributes
      }));
      utils.setSEOData(document.app_name, window.location.href);
      Backbone.trigger("home_rendered", this);
    },
    selectQuiz: function (event) {
      var quizId = this.$(event.currentTarget).attr('data-slug');

      if (quizId) {
        Backbone.history.navigate('/' + quizId, {
          trigger: true
        });
      }
    },
    triggerSearchGAEvent: function (event) {
      var linkElement = $(event.currentTarget);
      var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();

      if (linkElement.hasClass("walkthrough-entry")) {
        Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
      } else {
        Common.triggerGAevent('Section Search', searchBreadcrumb);
      }
    }
  });
  return HomeView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/quiz/views/quiz.js":
/*!*************************************************!*\
  !*** ./sharedemos/static/js/quiz/views/quiz.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/quiz */ "./sharedemos/static/js/quiz/models/quiz.js"), __webpack_require__(/*! ../models/quiz_question_activity */ "./sharedemos/static/js/quiz/models/quiz_question_activity.js"), __webpack_require__(/*! ../models/quiz_activity */ "./sharedemos/static/js/quiz/models/quiz_activity.js"), __webpack_require__(/*! ../templates/quiz_start.handlebars */ "./sharedemos/static/js/quiz/templates/quiz_start.handlebars"), __webpack_require__(/*! ../templates/quiz.handlebars */ "./sharedemos/static/js/quiz/templates/quiz.handlebars"), __webpack_require__(/*! ../templates/questions.handlebars */ "./sharedemos/static/js/quiz/templates/questions.handlebars"), __webpack_require__(/*! ../templates/popup.handlebars */ "./sharedemos/static/js/quiz/templates/popup.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, Quiz, QuizQuestionActivity, QuizActivity, QuizStartTemplate, QuizTemplate, QuestionsTemplate, PopupTemplate) {
  'use strict';

  var MainView = Backbone.View.extend({
    el: '#main_container',
    AUDIO_ICON: "/static/images/thumb-audio.png",
    VIDEO_ICON: "/static/images/video-thumb.jpg",
    events: {
      'click .quiz-start': 'startQuiz',
      'click .checklist-item .arrow': 'toggleChecklistText',
      'click .quiz-nav.prev:not(.disabled)': 'goToPrevQuestion',
      'click .quiz-nav.next:not(.disabled), .quiz-nav.skip:not(.disabled)': 'goToNextQuestion',
      'click .pagination .circle': 'jumpToQuestion',
      'click .checklist-item .check, .checklist-item .title': 'selectAnswer',
      'click .match-wrap:not(.disabled) .match-block:not(.match-disabled)': 'matchAnswer',
      'keyup .order-input input': 'sortAnswer',
      'click .get-results:not(.disabled)': 'quizResults',
      'click .retry': 'goHome',
      'click .go-home': 'goHome',
      'click .search-categories .search-data a.search-links': 'triggerSearchGAEvent',
      'click .audio-control': 'playAudio',
      'click .audio-backward': 'backwardAudio',
      'click .audio-farward': 'forwardAudio',
      'click .audio-timeline': 'seekAudio',
      'click .audio-mute': 'muteAudio',
      'click .question-icon[media-type=image]': 'zoomImage',
      'click .zoom_close': 'closeZoomImage'
    },
    initialize: function (slugId) {
      this.$("#search-terms").on('keyup', {
        'root': this,
        'common': Common
      }, Common.showSearchBox);
      this.$("#search-label").on('click', {
        'root': Common
      }, Common.showMobileSearchBox);
      this.$(".close-search-overlay, .close-search-mobile-overlay").on('click', {
        'root': Common
      }, Common.closeSearchBox);
      this.$(".search-input-cancel").on('click', {
        'root': Common
      }, Common.clearInputText);
      this.$("#user-language li").on('click', {
        'root': Common
      }, function (e) {
        Common.changeLanguage(e);
      });
      document.slugId = slugId;
      this.quiz = new Quiz({
        id: slugId
      });
      this.listenTo(this.quiz, 'sync', this.render);
      this.quiz.fetch({
        reset: true
      });
      this.clearLocalStorage();
    },
    render: function () {
      if (document.isAuthor) {
        this.renderQuestions();
      } else {
        var status = this.quiz.changed.status;

        if (status == undefined) {
          this.$('#block_container').html(QuizStartTemplate({
            'quiz': this.quiz.changed
          }));
        } else {
          var attrs = {};
          attrs['alert'] = true;

          if (status == 'attempts') {
            attrs['alert_message'] = 'YOUR RE-ATTEMPTS ARE OVER';
          } else {
            attrs['alert_message'] = 'YOUR DUE DATE IS COMPLETED';
          }

          attrs['alert_action'] = 'go-home';
          this.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
          this.$('.popup-overlay').addClass('active');
          this.overlayCalc();
        }
      }
    },
    renderQuestions: function () {
      var questions = this.quiz.changed.questions;

      if (this.quiz.changed.grading_style == 'pass_or_fail') {
        this.is_graded = true;
      }

      var root = this;

      _.each(questions, function (question) {
        if (question.resource) {
          if (["audio", "video"].includes(question.resource.type)) {
            let thumbnail = root.AUDIO_ICON;

            if (question.resource.type == "video") {
              thumbnail = root.VIDEO_ICON;
            }

            question.resource.thumbnail = `${document.cdn_url}${thumbnail}`;
          }
        }
      });

      var is_edit = document.isAuthor;
      this.can_skip = this.quiz.changed.can_skip;
      this.$('#block_container').html(QuestionsTemplate({
        is_graded: this.is_graded,
        questions: questions,
        is_edit: is_edit,
        can_skip: this.can_skip
      }));
      this.$('.question-wrap:nth-child(1)').addClass('active');
      var points = this.$('.question-wrap.active').attr('data-points');
      this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
      this.$('.quiz-main-wrap .left-pannel .total-points').html(this.quiz.changed.total_points);
      this.$('.quiz-main-wrap .left-pannel .min-points').html(this.quiz.changed.grading_points);
      this.$('.pagination span:first').addClass('active');
      Backbone.trigger("quiz_rendered", this);

      if (!document.isAuthor) {
        var results_btn_text;
        var results_btn_class;

        if (this.can_skip) {
          results_btn_text = 'SKIP & GET RESULTS';
          results_btn_class = '';
        } else {
          results_btn_text = 'SUBMIT & GET RESULTS';
          results_btn_class = 'disabled';
        }

        this.$('.question-wrap:last .navigation-wrap .next').remove();
        this.$('.question-wrap:last .navigation-wrap').append('<div class="quiz-nav get-results ' + results_btn_class + '"> ' + results_btn_text + '</div>');
        this.$('.question-wrap:last .navigation-wrap .skip').hide();

        if (this.quiz.changed.time_limit > 0) {
          var timeleft = this.quiz.changed.time_limit + ':00';
          this.$('.time').html(timeleft);
          this.countDownTimer();
        } else {
          this.$('.quiz-timer').hide();
        }
      }
    },
    clearLocalStorage: function (event) {
      $.each(localStorage, function (key, item) {
        if (key != 'algoliasearch-client-js') {
          localStorage.removeItem(key);
        }
      });
    },
    countDownTimer: function () {
      var root = this;
      var timeleft = this.$('.time').html();
      document.time_interval = setInterval(function () {
        var timer = timeleft.split(':');
        var minutes = parseInt(timer[0], 10);
        var seconds = parseInt(timer[1], 10);
        --seconds;
        minutes = seconds < 0 ? --minutes : minutes;
        if (minutes < 0) clearInterval(interval);
        seconds = seconds < 0 ? 59 : seconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.$('.time').html(minutes + ':' + seconds);
        timeleft = minutes + ':' + seconds;

        if (minutes <= 0 && seconds <= 0 && document.slugId != '') {
          clearTimeout();
          document.timeOut = true;
          root.quizResults();
        }
      }, 1000);
    },
    customErrorMessage: function (message, target, elem) {
      this.$('.edit-tool-tip').remove();
      var editToolTip = '<div class="edit-tool-tip">' + message + '</div>';
      target.append(editToolTip);
      if (elem) elem.addClass('error');
    },
    goHome: function () {
      Backbone.history.navigate('/', {
        trigger: true
      });
      this.hidePopup();
    },
    jumpToQuestion: function (event) {
      var questionId = $(event.currentTarget).attr('question_id');
      this.$('.question-wrap').removeClass('active');
      this.$('.quiz-wrap').children('.question-wrap[question-id="' + questionId + '"]').addClass('active');
      var index = parseInt($('.question-wrap.active').attr('id').split('_')[2]);
      var points = this.$('.question-wrap.active').attr('data-points');
      this.$('.quiz-main-wrap .left-pannel .question-points').html(points);

      if (index == 1) {
        this.$('.question-wrap .navigation-wrap .prev').removeClass('active');
      }

      this.$('.pagination .circle').removeClass('active');
      this.$('.pagination .circle[question_id="' + questionId + '"]').addClass('active');

      if (this.$('.quiz-wrap .question-wrap.active .option-item').length == 0) {
        this.$('.quiz-wrap .question-wrap.active .options-wrap .change-answer-type').addClass('active');
      }

      if (index > 1) {
        this.$('.question-wrap .navigation-wrap .prev').addClass('active');
      }
    },
    goToNextQuestion: function (event) {
      var prev_question_id = this.$('.question-wrap.active').attr('question-id');
      this.mediaPause(prev_question_id);
      var current_question_id = this.$('.question-wrap.active').attr('question-id');
      var is_next = this.$(event.currentTarget).hasClass('next');
      var is_answered = this.$(event.currentTarget).parents('.question-wrap').attr('answered');

      if (!document.isAuthor) {
        var currentQuestionId = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2]);

        if (is_next && is_answered == 'false') {
          this.submitAnswer();
          this.$(event.currentTarget).parents('.question-wrap').attr('answered', true);

          if (this.$(event.currentTarget).parents('.question-wrap').attr('answered')) {
            this.$('.pagination').children('#question_block_' + currentQuestionId + '').removeClass('skipped').addClass('answered');
          }
        } else if (is_answered == 'false') {
          this.$('.pagination').children('#question_block_' + currentQuestionId + '').removeClass('answered').addClass('skipped');
        }
      }

      var index = parseInt($('.question-wrap.active').attr('id').split('_')[2]) + 1;
      this.$('.question-wrap').removeClass('active');
      this.$('.question-wrap:nth-child(' + index + ')').addClass('active');
      var points = this.$('.question-wrap.active').attr('data-points');
      this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
      this.$('.pagination .circle').removeClass('active');
      this.$('#question_block_' + index + '').first().addClass('active');

      if (index > 1) {
        this.$('.question-wrap .navigation-wrap .prev').addClass('active');
      }

      var audio = this.getAudio(current_question_id);

      if (audio) {
        this.updateAudioProgress(audio, current_question_id);
      }

      if (index > 1) {
        this.$('.question-wrap .navigation-wrap .prev').addClass('active');
      }
    },
    goToPrevQuestion: function (event) {
      var prev_question_id = this.$('.question-wrap.active').attr('question-id');
      this.mediaPause(prev_question_id);
      var index = this.$('.question-wrap.active').length > 0 ? parseInt($('.question-wrap.active').attr('id').split('_')[2]) - 1 : parseInt($('.question-wrap:last').attr('id').split('_')[2]);
      this.$('.question-wrap').removeClass('active');
      this.$('.question-wrap:nth-child(' + index + ')').addClass('active');
      var points = this.$('.question-wrap.active').attr('data-points');
      this.$('.quiz-main-wrap .left-pannel .question-points').html(points);
      this.$('.pagination .circle').removeClass('active');
      this.$('#question_block_' + index + '').first().addClass('active');
      this.$('.question-wrap.active .navigation-wrap .next').show();
      var current_question_id = this.$('.question-wrap.active').attr('question-id');
      var audio = this.getAudio(current_question_id);

      if (audio) {
        this.updateAudioProgress(audio, current_question_id);
      }

      if (index == 1) {
        this.$('.question-wrap .navigation-wrap .prev').removeClass('active');
      }

      if ($('.add-block.question').length > 0) {
        this.$('.add-block.question').remove();
        this.$('.previous_button').remove();
        this.$('.question-wrap.active .navigation-wrap .next').hide();
      }
    },
    hidePopup: function (popupName) {
      this.$('.popup-overlay').removeClass('active');
      this.$('.popup-wrap').html("");
    },
    matchAnswer: function (event) {
      if (!document.isAuthor) {
        this.$(event.currentTarget).parents('.question-wrap').attr('answered', false);
        var target_elem = this.$(event.currentTarget);
        this.$(event.currentTarget).parents('.match-wrap').toggleClass('selected').attr('match', true);
        var match_side = this.$(event.currentTarget).parent().attr('class').split(' ')[1];
        var match_option_block = this.$('.question-wrap.active .options-wrap .option-item');

        if (match_side == "left") {
          this.$(match_option_block).children('.match-wrap.left').addClass('disabled');
          this.$(match_option_block).children('.match-wrap.right').removeClass('disabled');
          this.$(match_option_block).children('.match-wrap.left').attr('left', true);
        } else {
          this.$(match_option_block).children('.match-wrap.right').addClass('disabled');
          this.$(match_option_block).children('.match-wrap.left').removeClass('disabled');
          var matched_elements = this.$(match_option_block).children('.match-wrap[match="true"]');
          this.$(matched_elements).addClass('match-disabled');
          this.$(matched_elements).children('.match-block').addClass('match-disabled');
          this.$(matched_elements).removeAttr('match');
          this.saveMatched(matched_elements);
        }

        var selected_elem = this.$('.question-wrap.active .match-wrap.selected');
        this.navigationOption(selected_elem, 1);
      }
    },
    navigationOption: function (selected_elements, length_criteria) {
      var get_results_elem = this.$('.question-wrap.active .navigation-wrap .get-results');

      if (selected_elements.length > parseInt(length_criteria)) {
        this.$('.question-wrap.active .navigation-wrap .next').removeClass('disabled');
        this.$('.question-wrap.active .navigation-wrap .prev').removeClass('disabled');

        if (!this.can_skip) {
          $(get_results_elem).removeClass('disabled');
        }

        if (get_results_elem.length > 0) {
          this.$('.question-wrap.active').attr('answered', true);
          $(get_results_elem).html('SUBMIT & GET RESULTS');
        }
      } else {
        var results_btn_text;
        this.$('.question-wrap.active .navigation-wrap .next').addClass('disabled');
        this.$('.question-wrap.active .navigation-wrap .skip').removeClass('disabled').addClass('active');

        if (document.viewType == 'edit_quiz') {
          this.$('.question-wrap.active .navigation-wrap .prev').addClass('disabled');
        }

        if (!this.can_skip) {
          $(get_results_elem).addClass('disabled');
        }

        if (this.can_skip) {
          results_btn_text = 'SKIP & GET RESULTS';
        } else {
          results_btn_text = 'SUBMIT & GET RESULTS';
        }

        if (get_results_elem.length > 0) {
          this.$('.question-wrap.active').attr('answered', false);
          $(get_results_elem).html(results_btn_text);
        }
      }
    },
    overlayCalc: function () {
      var windowHeight = this.$(window).height() - 200;
      this.$('.popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    saveMatched: function (matched_elements) {
      var root = this;
      var option_id;
      root.$(matched_elements).each(function () {
        if ($(this).attr('left') == 'true') {
          option_id = 'option_' + root.$(this).parents('.option-item').attr('option-id');
          root.$(this).removeAttr('left');
        }
      });
      var option_data = {};
      root.$(matched_elements).each(function () {
        var child_elements = this.children[0].children;
        var data = {};
        var item_side = 'item_' + this.classList[1];
        root.$(child_elements).each(function () {
          if (this.tagName == 'P') {
            data['text'] = this.textContent;
          } else {
            data['image'] = this.src.split('media/')[1];
          }
        });
        option_data[item_side] = data;
      });
      localStorage.setItem(option_id, JSON.stringify(option_data));
    },
    sortAnswer: function (event) {
      this.$(event.currentTarget).parents('.question-wrap').attr('answered', false);
      var sort_value = this.$(event.currentTarget).val();

      if (sort_value != '') {
        this.$(event.currentTarget).parents('.option-item').addClass('answered');
      } else {
        this.$(event.currentTarget).parents('.option-item').removeClass('answered');
      }

      var answered_elem = this.$('.question-wrap.active .option-item.answered');
      this.navigationOption(answered_elem, 0);
    },
    selectAnswer: function (event) {
      var root = this;
      var clicked_elem = root.$(event.currentTarget);

      if (!document.isAuthor) {
        root.$(clicked_elem).parents('.question-wrap').attr('answered', false);
      }

      var is_active = root.$(event.currentTarget).parent().hasClass('selected');
      var option_type = root.$(event.currentTarget).parents('.options-wrap').attr('data-option-type');

      if (option_type == 'single_select') {
        root.$('.question-wrap.active .checklist-item').removeClass('selected');
      }

      root.$(event.currentTarget).parent().toggleClass('selected');

      if (is_active && option_type == 'single_select') {
        root.$(event.currentTarget).parent().toggleClass("selected");
      }

      var selected_elem = root.$('.question-wrap.active .checklist-item.selected');
      this.$(event.currentTarget).parents('.question-wrap.active').find('.skip').addClass('disabled');
      root.navigationOption(selected_elem, 0);
    },
    startQuiz: function (event) {
      var checkbox = this.$('input[type=checkbox]');
      var is_checked = this.$('input[type=checkbox]').prop('checked');

      if (is_checked) {
        this.renderQuestions();
      } else {
        this.customErrorMessage('Please agree the agreement', this.$(checkbox).parent(), this.$(checkbox));
      }
    },
    submitAnswer: function (event) {
      var root = this;
      var question_id = this.$('.question-wrap.active').attr('question-id');
      var option_type = this.$('.question-wrap.active .options-wrap').attr('data-option-type');
      var options_data = {};

      if (option_type.includes('select')) {
        var selected_elements = this.$('.question-wrap.active .checklist-item.selected');
        var options = [];
        this.$(selected_elements).each(function () {
          var option_id = root.$(this).attr('option-id');
          options.push(parseInt(option_id));
        });
        options_data['options'] = options;
      } else if (option_type.includes('matching')) {
        var total_match_elements = root.$('.question-wrap.active .option-item').length;
        var options = [];
        root.$('.question-wrap.active .option-item .match-wrap.left').each(function () {
          var option_data = {};
          var option_id = 'option_' + root.$(this).parent().attr('option-id');
          var option = localStorage.getItem(option_id);

          if (option != null) {
            option_data[option_id] = JSON.parse(option);
            options.push(option_data);
          }
        });
        options_data['options'] = options;
      } else {
        var sort_elements = root.$('.question-wrap.active .option-item');
        var options = [];

        for (var i = 0; i < sort_elements.length; i++) {
          var option_data = {};
          var option_id = 'option_' + root.$(sort_elements[i]).attr('option-id');
          option_data[option_id] = parseInt(root.$(sort_elements[i]).children('.order-input').children('input').val());
          options.push(option_data);
        }

        options_data['options'] = options;
      }

      var quiz_slug = document.slugId;
      var question_id = question_id;
      var quiz_session_id = document.quiz_session;
      var attrs = {
        'quiz_slug': quiz_slug,
        'question_id': question_id,
        'quiz_session_id': quiz_session_id,
        'option_type': option_type,
        'options_data': options_data
      };
      var quizQuestionActivity = new QuizQuestionActivity(attrs);
      quizQuestionActivity.save();
      this.clearLocalStorage();
    },
    triggerSearchGAEvent: function (event) {
      var linkElement = $(event.currentTarget);
      var searchBreadcrumb = linkElement.find('.search-breadcrumb').text();

      if (linkElement.hasClass("walkthrough-entry")) {
        Common.triggerGAevent('Walkthrough Search', searchBreadcrumb);
      } else {
        Common.triggerGAevent('Section Search', searchBreadcrumb);
      }
    },
    toggleChecklistText: function (event) {
      var info_block_elem_len = this.$(event.currentTarget).parents('.checklist-item').find('.info-block').children().length;

      if (info_block_elem_len > 0) {
        if (this.$(event.currentTarget).parents('.checklist-item').hasClass('open')) {
          this.$(event.currentTarget).parents('.checklist-item').removeClass("open");
          this.$(event.currentTarget).parents('.checklist-item').find('.info-block').slideUp('linear');
        } else {
          this.$(event.currentTarget).parents('.checklist-item').addClass("open");
          this.$(event.currentTarget).parents('.checklist-item').find('.info-block').slideDown('linear');
        }
      }
    },
    quizResults: function (event) {
      var root = this;
      var is_answered = this.$('.question-wrap.active').attr('answered');

      if (is_answered == 'true' && !document.timeOut) {
        this.submitAnswer();
        var current_question_id = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2]);
        this.$('.pagination').children('#question_block_' + current_question_id + '').addClass('answered');
        this.$('.question-wrap[answered = false]').addClass('skipped');
      } else {
        var current_question_id = parseInt(this.$(event.currentTarget).parents('.question-wrap.active').attr('id').split('_')[2]);
        this.$('.pagination').children('#question_block_' + current_question_id + '').removeClass('answered');
        this.$('.pagination').children('#question_block_' + current_question_id + '').addClass('skipped');
      } //If user directly jumps to last question and submit the result.
      //This is to indicate the skipped question in the pagination


      this.$('.question-wrap[answered="false"]').each(function () {
        root.$('.quiz-main-wrap').children('.pagination').find('#' + this.id + '').addClass('skipped');
      });
      var root = this;
      var quiz_slug = document.slugId;
      var quiz_session_id = document.quiz_session;
      var total_questions_count = this.$('.question-wrap').length;
      var attempted_questions_count = this.$('.question-wrap[answered="true"]').length;
      var skipped_questions_count = this.$('.question-wrap[answered="false"]').length;
      var time_left = this.$('.time').html();
      var is_timeout = document.timeOut;
      var attrs = {
        'quiz_slug': quiz_slug,
        'total_questions_count': total_questions_count,
        'attempted_questions_count': attempted_questions_count,
        'skipped_questions_count': skipped_questions_count,
        'quiz_session_id': quiz_session_id,
        'time_left': time_left,
        'is_timeout': is_timeout
      };
      var quizActivity = new QuizActivity(attrs);
      quizActivity.save(null, {
        success: function (response, xhr, status) {
          var attrs = {};
          attrs['results'] = true;

          if (document.timeOut) {
            response.attributes.time_out = document.timeOut;
          }

          clearTimeout(document.time_interval);
          attrs['quiz_result'] = response.attributes;
          root.$('.popup-overlay .popup-wrap').html(PopupTemplate(attrs));
          root.$('.popup-overlay').addClass('active');
          root.overlayCalc();
        }
      });
    },
    mediaPause: function (question_id) {
      var media = $('video, audio');

      for (var i = 0; i < media.length; i++) {
        if (!media[i].paused && !media[i].ended) {
          media[i].pause();

          if (media[i].tagName == 'AUDIO') {
            var audio = this.getAudio(question_id);

            if (audio) {
              audio.pause();
              this.$('.question-wrap[question-id=' + question_id + ']').find('.audio-control').removeClass("pause").addClass("play");
              this.updateAudioProgress(audio, question_id);
            }
          }
        }
      }
    },
    playAudio: function (event) {
      var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
      var audio = this.getAudio(question_id);

      if (audio) {
        if (audio.paused) {
          audio.play();
          this.$('.question-wrap[question-id=' + question_id + ']').find('.audio-control').removeClass("play").addClass("pause autoplayed");
        } else {
          audio.pause();
          this.$('.question-wrap[question-id=' + question_id + ']').find('.audio-control').removeClass("pause").addClass("play");
        }
      }

      $(audio).on("timeupdate", {
        'root': this
      }, this.timeUpdate);
    },
    forwardAudio: function (event) {
      var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
      var audio = this.getAudio(question_id);

      if (audio && !audio.paused) {
        audio.currentTime = audio.currentTime + 5;
      }
    },
    backwardAudio: function (event) {
      var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
      var audio = this.getAudio(question_id);

      if (audio && !audio.paused) {
        audio.currentTime = audio.currentTime - 5;
      }
    },
    seekAudio: function (event) {
      var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
      var audio = this.getAudio(question_id);

      if (audio) {
        var duration = audio.duration;
        var position = event.offsetX;
        var timelineWidth = this.$('.question-wrap[question-id=' + question_id + ']').find(".audio-timeline").width();
        var seek_to = position / timelineWidth;

        if (!audio.paused) {
          audio.currentTime = (duration * seek_to * 100 / 100).toFixed(2);
        }
      }
    },
    muteAudio: function (event) {
      var question_id = this.$(event.target).parents('.question-wrap').attr('question-id');
      var audio = this.getAudio(question_id);
      audio.muted = !audio.muted;
      this.$(event.currentTarget.toggleClass('muted'));
    },
    timeUpdate: function (event) {
      // Synchronizes playhead position with current point in audio
      var data_root = event.data.root;
      var audio = event.currentTarget;
      var question_id = $(event.target).parents('.question-wrap').attr('question-id');
      var current_question = data_root.$(".question-wrap[question-id=" + question_id + "]");
      data_root.updateAudioProgress(audio, question_id);
      current_question.find(".audio-currentTime").text(data_root.timeConvertion(audio.currentTime));
      current_question.find(".audio-duration").text(data_root.timeConvertion(audio.duration));

      if (audio.currentTime == audio.duration) {
        audio.pause();
        current_question.find('.audio-control').removeClass("pause").addClass("play");
        current_question.find('.audio-progress').css({
          'width': '100%'
        });
      }
    },
    updateAudioProgress: function (audio, question_id) {
      var timelineWidth = this.$('.question-wrap[question-id=' + question_id + ']').find('.audio-timeline').width();
      var playPercent = timelineWidth * (audio.currentTime / audio.duration);
      this.$(".question-wrap[question-id=" + question_id + "]").find('.audio-progress').css({
        "width": playPercent
      });
    },
    timeConvertion: function (duration) {
      var durationMin = parseInt(duration / 60);
      var durationSec = parseInt(duration % 60);

      if (durationMin == 0) {
        durationMin += '0';
      }

      if (durationSec < 10) {
        durationSec = '0' + durationSec;
      }

      var duration = durationMin + ":" + durationSec;
      return duration;
    },
    getAudio: function (question_id) {
      var audio_file = $('[question-id=' + question_id + ']').children().find('audio');

      if (audio_file.length) {
        return audio_file[0];
      }
    },
    zoomImage: function (event) {
      if (this.$(event.currentTarget).hasClass('default')) return;
      var zoomImageSrc = this.$(event.currentTarget).attr('src');
      var zoomImage = "<img class='zoom' src='" + zoomImageSrc + "'><span class='zoom_close'></span>";
      this.$('.popup-overlay').addClass('active');
      this.$('.popup-overlay .popup-wrap').html(zoomImage);
      this.$el.addClass('img_zoom');
    },
    closeZoomImage: function () {
      this.$el.removeClass('img_zoom');
      this.$('.popup-overlay').removeClass('active');
    }
  });
  return MainView;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/utils.js":
/*!***************************************!*\
  !*** ./sharedemos/static/js/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

utils = function () {
  var utils = {
    SECTION_IMAGE_PATH: '/static/images/vmware/default-category-icon.png',
    setSEOData: function (title, url, description, image) {
      var image_path = window.location.origin;

      if (image) {
        image_path += '/static/media/' + image;
      } else {
        image_path += this.SECTION_IMAGE_PATH;
      }

      description = description || "";
      this.setPageTitle(title);
      this.setMetaDescription(description);
      this.setOpenGraphValues(title, url, description, image_path);
      this.setTwitterValues(title, url, description, image_path);
    },
    setMetaDescription: function (description) {
      $("meta[name='description']").attr("content", description);
    },
    setOpenGraphValues: function (title, url, description, image) {
      $('meta[property="og:type"]').attr("content", "website");
      $('meta[property="og:title"]').attr("content", title);
      $('meta[property="og:description"]').attr("content", description);
      $('meta[property="og:url"]').attr("content", url);
      $('meta[property="og:image"]').attr("content", image);
    },
    setPageTitle: function (title) {
      $("title").text(title);
    },
    setTwitterValues: function (title, url, description, image) {
      $('meta[name="twitter:card"]').attr("content", "summary");
      $('meta[name="twitter:title"]').attr("content", title);
      $('meta[name="twitter:url"]').attr("content", url);
      $('meta[name="twitter:description"]').attr("content", description);
      $('meta[name="twitter:image"]').attr("content", image);
    },
    removeSEOData: function () {
      $("title").text("");
      $('meta[name="description"], meta[property^="og"], meta[name^="twitter"]').attr("content", "");
    }
  };
  return utils;
}();

/***/ })

}]);
//# sourceMappingURL=9.4cd07d.js.map