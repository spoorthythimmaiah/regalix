(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./sharedemos/static/js/audience/models/audience_company.js":
/*!******************************************************************!*\
  !*** ./sharedemos/static/js/audience/models/audience_company.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var AudienceCompany = Backbone.Model.extend({
    urlRoot: "/api/audience-company"
  });
  return AudienceCompany;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/audience/models/audience_employee.js":
/*!*******************************************************************!*\
  !*** ./sharedemos/static/js/audience/models/audience_employee.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var AudienceEmployee = Backbone.Model.extend({
    urlRoot: "/api/audience-employee/",
    url: function () {
      var url = this.urlRoot + this.get('audience_id');

      if (this.get('id')) {
        url += '/' + this.get('id');
      }

      return url;
    }
  });
  return AudienceEmployee;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./sharedemos/static/js/audience/templates/audience_list.handlebars":
/*!**************************************************************************!*\
  !*** ./sharedemos/static/js/audience/templates/audience_list.handlebars ***!
  \**************************************************************************/
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

  return "    <div class=\"audience-wrap company\">\n        <div class=\"company-manage\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"audiences") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":20},"end":{"line":53,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"company_profile\" data-audience-id='"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"company_id") : depth0), depth0))
    + "'>\n                        <div class=\"cp_delete\"></div>\n                        <div class=\"company_details\">\n                            <div class=\"logo\">\n                                <img src=\""
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"logo_url") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":11,"column":42},"end":{"line":11,"column":116}}})) != null ? stack1 : "")
    + "\">\n                            </div>\n                            <div class=\"company_info\">\n                                <div class=\"title\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "<div class=\"company_edit\"></div></div>\n                                <a class=\"link\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"website_url") : depth0), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"website_url") : depth0), depth0))
    + "</a>\n                            </div>\n                        </div>\n                        <div class=\"share_content"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":49},"end":{"line":18,"column":83}}})) != null ? stack1 : "")
    + "\">\n                            SHARE CONTENT\n                            <div>Sharing content is only possible when employees from this company are added. Employees added will receive a private link to access your content.</div>\n                        </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"expire_at") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":22,"column":24},"end":{"line":24,"column":31}}})) != null ? stack1 : "")
    + "                        <div class=\"add_employee new\">ADD NEW EMPLOYEE</div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":24},"end":{"line":51,"column":31}}})) != null ? stack1 : "")
    + "                    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"logo_url") : depth0), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    return "/static/images/icon_overlay.png";
},"7":function(container,depth0,helpers,partials,data) {
    return " active";
},"9":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <br><div class=\"link_expiry\">LINKS EXPIRE ON "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"expire_at") : depth0), depth0))
    + "</div> \n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"employee_details row\">\n                            <div class=\"table_header\">\n                                <div class=\"col-sm-3 name\">NAME</div>\n                                <div class=\"col-sm-3 email\">EMAIL</div>\n                                <div class=\"col-sm-3 link_status\">LINK STATUS</div>\n                                <div class=\"col-sm-3\"></div>\n                            </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"users") : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":28},"end":{"line":46,"column":37}}})) != null ? stack1 : "")
    + ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"users") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),">","3",{"name":"compare","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":28},"end":{"line":49,"column":40}}})) != null ? stack1 : "")
    + "                        </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = __default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/compare.js */ "./sharedemos/static/js/helpers/handlebars/compare.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && lookupProperty(data,"index")),"<","3",{"name":"compare","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":35,"column":32},"end":{"line":45,"column":44}}})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                                    <div class=\"table_row\">\n                                        <div class=\"col-sm-3 name\"><img class=\"profile-img\" data-name=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"initials") : depth0), depth0))
    + "\" picture-url=\"\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"first_name") : depth0), depth0))
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"last_name") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":37,"column":146},"end":{"line":37,"column":184}}})) != null ? stack1 : "")
    + "</div>\n                                        <div class=\"col-sm-3 email\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"email") : depth0), depth0))
    + "</div>\n                                        <div class=\"col-sm-3 link_status not_set\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(depth0 != null ? lookupProperty(depth0,"email_sent") : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.program(18, data, 0),"data":data,"loc":{"start":{"line":39,"column":82},"end":{"line":39,"column":141}}})) != null ? stack1 : "")
    + "</div>\n                                        <div class=\"col-sm-3\" data-employee-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"employee_id") : depth0), depth0))
    + "\">\n                                            <div class=\"edit\">EDIT</div>\n                                            <div class=\"delete\">DELETE</div>\n                                        </div>\n                                    </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"last_name") : depth0), depth0));
},"16":function(container,depth0,helpers,partials,data) {
    return "link sent";
},"18":function(container,depth0,helpers,partials,data) {
    return "link not sent yet";
},"20":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"load_more\">load more</div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"audience-wrap welcome_msg\">\n        <div class=\"audience-content welcome_txt\">\n            <h1>Welcome to Audiences</h1>\n            <p class=\"message2\">Create company profiles and share exclusive content with them.</p>\n        </div>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? lookupProperty(depth0,"audiences") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(22, data, 0),"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":65,"column":7}}})) != null ? stack1 : "")
    + "<div class=\"add-new company\"></div>   \n";
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/audience/templates/overlay.handlebars":
/*!********************************************************************!*\
  !*** ./sharedemos/static/js/audience/templates/overlay.handlebars ***!
  \********************************************************************/
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

  return "<div class=\"add_company_modal\">\n    <div class=\"close\"></div>\n    <div class=\"modal_wrap\">\n        <div class=\"modal_title\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":33},"end":{"line":5,"column":75}}})) != null ? stack1 : "")
    + " Company Profile</div>\n        <div class=\"tab_menu_wrap\">\n            <div class=\"menu active\" data-target=\"name\">NAME</div>\n            <div class=\"menu\" data-target=\"message\">MESSAGE</div>\n        </div>\n        <div class=\"tab_block active\" data-target=\"name\">\n            <div class=\"block\">\n                <div class=\"title mandatory-field\">COMPANY NAME</div>\n                <div class=\"sub_title\">Provide company name for this profile.</div>\n                <input type=\"text\" name=\"name\" placeholder=\"Name\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"name") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":14,"column":85},"end":{"line":14,"column":120}}})) != null ? stack1 : "")
    + "> \n                <div class=\"error\"></div>\n            </div>\n            <div class=\"block\">\n                <div class=\"title mandatory-field\">COMPANY WEBSITE</div>\n                <div class=\"sub_title\">Enter the URL for this company. Employees will need to have this domain in their email.</div>\n                <input type=\"url\" name=\"website\" placeholder=\"http://\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"website_url") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":90},"end":{"line":20,"column":139}}})) != null ? stack1 : "")
    + "> \n                <div class=\"error\"></div>\n            </div>\n            <div class=\"btn goto_message"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":40},"end":{"line":23,"column":72}}})) != null ? stack1 : "")
    + "\" data-target=\"message\">MESSAGE</div>\n        </div>\n         <div class=\"tab_block\" data-target=\"message\">\n            <div class=\"block\">\n                <div class=\"title mandatory-field\">GREETING MESSAGE</div>\n                <div class=\"sub_title\">Write a message that will be displayed to visitors before gaining access to your content</div>\n                <textarea placeholder=\"Message\" name=\"message\" maxlength=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"message_limit") : depth0), depth0))
    + "\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"message") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":93},"end":{"line":29,"column":126}}})) != null ? stack1 : "")
    + "</textarea>\n                <div class=\"error\"></div>\n                <div class=\"counter\"><span>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"message") : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":31,"column":43},"end":{"line":31,"column":132}}})) != null ? stack1 : "")
    + "</span> Characters Left</div>\n            </div>\n            <div class=\"btn backto_name\" data-target=\"name\">&nbsp;</div>\n            <div class=\"btn create_profile"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":42},"end":{"line":34,"column":78}}})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(20, data, 0),"data":data,"loc":{"start":{"line":34,"column":80},"end":{"line":34,"column":125}}})) != null ? stack1 : "")
    + " PROFILE</div>\n        </div>\n    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "Update";
},"4":function(container,depth0,helpers,partials,data) {
    return "Add";
},"6":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\"";
},"8":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"website_url") : depth0), depth0))
    + "\"";
},"10":function(container,depth0,helpers,partials,data) {
    return " active";
},"12":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"message") : depth0), depth0));
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(__default(__webpack_require__(/*! ./sharedemos/static/js/helpers/handlebars/math.js */ "./sharedemos/static/js/helpers/handlebars/math.js")).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"message_limit") : depth0),"-",((stack1 = (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),{"name":"math","hash":{},"data":data,"loc":{"start":{"line":31,"column":59},"end":{"line":31,"column":100}}}));
},"16":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"message_limit") : depth0), depth0));
},"18":function(container,depth0,helpers,partials,data) {
    return "UPDATE";
},"20":function(container,depth0,helpers,partials,data) {
    return "CREATE";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"add_employee_modal\">\n    <div class=\"close\"></div>\n    <div class=\"modal_wrap\">\n        <div class=\"modal_title\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.program(25, data, 0),"data":data,"loc":{"start":{"line":43,"column":33},"end":{"line":43,"column":120}}})) != null ? stack1 : "")
    + "</div>\n        <div class=\"block\">\n            <div class=\"title mandatory-field\">FIRST NAME</div>\n            <div class=\"sub_title\">Enter employee’s first name.</div>\n            <input type=\"text\" name=\"firstName\" placeholder=\"First Name\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"first_name") : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":47,"column":92},"end":{"line":47,"column":139}}})) != null ? stack1 : "")
    + "> \n            <div class=\"error\"></div>\n        </div>\n        <div class=\"block\">\n            <div class=\"title mandatory-field\">LAST NAME</div>\n            <div class=\"sub_title\">Enter employee’s last name.</div>\n            <input type=\"text\" name=\"lastName\" placeholder=\"Last Name\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"last_name") : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":53,"column":90},"end":{"line":53,"column":135}}})) != null ? stack1 : "")
    + "> \n            <div class=\"error\"></div>\n        </div>\n        <div class=\"block\">\n            <div class=\"title mandatory-field\">EMAIL</div>\n            <div class=\"sub_title\">Enter employee’s email address. They will use this email to log in and access your content.</div>\n            <input type=\"email\" name=\"email\" placeholder=\"Email\" autocomplete=\"off\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"email") : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":59,"column":84},"end":{"line":59,"column":121}}})) != null ? stack1 : "")
    + "> \n            <div class=\"error\"></div>\n        </div>\n        <div class=\"btn add_employee"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":62,"column":36},"end":{"line":62,"column":68}}})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_editing") : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.program(33, data, 0),"data":data,"loc":{"start":{"line":62,"column":70},"end":{"line":62,"column":112}}})) != null ? stack1 : "")
    + " EMPLOYEE</div>\n    </div>\n</div>\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "Update Employee Details";
},"25":function(container,depth0,helpers,partials,data) {
    return "Add Employee to Company Profile";
},"27":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"first_name") : depth0), depth0))
    + "\"";
},"29":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"last_name") : depth0), depth0))
    + "\"";
},"31":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"email") : depth0), depth0))
    + "\"";
},"33":function(container,depth0,helpers,partials,data) {
    return "ADD";
},"35":function(container,depth0,helpers,partials,data) {
    return "<div class=\"audience_overlay\">\n    <div class=\"popup-wrap\">\n        <div class=\"popup-box share_content_popup\">\n            <div class=\"popup-title\">\n                Share Content\n            </div>\n            <div class=\"content-block\">\n                <div class=\"block\">\n                    <div class=\"title mandatory-field\">Choose Content</div>\n                    <div class=\"sub-title\">Select the content from your library that you would like to share with this profile.<br>\n                        Employees added to this profile will receive a private URL to gain access.\n                    </div>\n                    <div class=\"browse_library\">BROWSE YOUR LIBRARY</div>\n                    <div class=\"category_selected\"></div>\n                </div>\n                <div class=\"block\">\n                    <div class=\"title mandatory-field\">ACCESS LINK EXPIRATION</div>\n                    <div class=\"sub-title\">Choose when the links to your content will expire. Upon expiration employees\n                    from this company profile will not have access to your content. </div><br>\n                    <div class=\"sub-title\">Expiration Date:</div>\n                    <input type=\"text\" name=\"date\" class=\"expire_date\" placeholder=\"Choose Date\" autocomplete=\"off\" readonly>\n                </div>\n            </div>\n            <div class=\"footer\">\n                <div class=\"block\">\n                    <div class=\"cancel\" rel=\"add_path\">CANCEL</div>\n                    <div class=\"share\">SHARE CONTENT</div>\n                </div>\n                <div class=\"form-failed\">OOPS! SHARING FAILED</div>\n                <div class=\"form-sent\">SHARED SUCCESSFULLY!</div>\n                <div class=\"form-sending\">SHARING...<div class=\"cd-loading\"></div></div>\n            </div>\n        </div>\n        <div class=\"popup-box choose_share_content_popup\">\n            <div class=\"popup-title\">\n                Choose Content to Share\n                <div class=\"back\"></div>\n            </div>\n            <div class=\"content-block\">\n                <div class=\"block site_map\" id=\"select-share-category\"></div>\n            </div>\n            <div class=\"footer\">\n                <div class=\"block\">\n                    <div class=\"cancel\" rel=\"add_path\">CANCEL</div>\n                    <div class=\"choose\">CHOOSE</div>\n                </div>\n                <div class=\"form-failed\">OOPS! SAVING FAILED</div>\n                <div class=\"form-sent\">SAVED SUCCESSFULLY!</div>\n                <div class=\"form-sending\">SAVING...<div class=\"cd-loading\"></div></div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"37":function(container,depth0,helpers,partials,data) {
    return "<div class=\"audience_overlay\">\n    <div class=\"popup-wrap\">\n        <div class=\"popup-box delete_company_warning\">\n            <div class=\"popup-title\">\n                Delete Company\n            </div>\n            <div class=\"content-block\">\n                <div class=\"block\">\n                    <div class=\"sub-title\">You’ve made some cool stuff! Are you sure you want to delete this company?</div>\n                </div>\n            </div>\n            <div class=\"footer\">\n                <div class=\"block\">\n                    <div class=\"cancel\" rel=\"delete_company_warning\">CANCEL</div>\n                    <div class=\"delete\">DELETE</div>\n                </div>\n                <div class=\"form-failed\">OOPS! DELETING FAILED</div>\n                <div class=\"form-sent\">DELETED SUCCESSFULLY!</div>\n                <div class=\"form-sending\">DELETING...<div class=\"cd-loading\"></div></div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"39":function(container,depth0,helpers,partials,data) {
    return "<div class=\"audience_overlay\">\n    <div class=\"popup-wrap\">\n        <div class=\"popup-box delete_user_warning\">\n            <div class=\"popup-title\">\n                Delete User\n            </div>\n            <div class=\"content-block\">\n                <div class=\"block\">\n                    <div class=\"sub-title\">You’ve made some cool stuff! Are you sure you want to delete this user?</div>\n                </div>\n            </div>\n            <div class=\"footer\">\n                <div class=\"block\">\n                    <div class=\"cancel\" rel=\"delete_user_warning\">CANCEL</div>\n                    <div class=\"delete\">DELETE</div>\n                </div>\n                <div class=\"form-failed\">OOPS! DELETING FAILED</div>\n                <div class=\"form-sent\">DELETED SUCCESSFULLY!</div>\n                <div class=\"form-sending\">DELETING...<div class=\"cd-loading\"></div></div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_company") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":38,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_employee") : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":0},"end":{"line":65,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_share") : depth0),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":66,"column":0},"end":{"line":120,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_company_delete") : depth0),{"name":"if","hash":{},"fn":container.program(37, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":0},"end":{"line":145,"column":7}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"is_employee_delete") : depth0),{"name":"if","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":146,"column":0},"end":{"line":170,"column":7}}})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./sharedemos/static/js/audience/views/audience.js":
/*!*********************************************************!*\
  !*** ./sharedemos/static/js/audience/views/audience.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define*/
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! underscore */ "./node_modules/underscore/underscore.js"), __webpack_require__(/*! jquery */ "jquery"), __webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js"), __webpack_require__(/*! ../../tenant/common */ "./sharedemos/static/js/tenant/common.js"), __webpack_require__(/*! ../models/audience_company */ "./sharedemos/static/js/audience/models/audience_company.js"), __webpack_require__(/*! ../models/audience_employee */ "./sharedemos/static/js/audience/models/audience_employee.js"), __webpack_require__(/*! ../../tenant/models/product-tree */ "./sharedemos/static/js/tenant/models/product-tree.js"), __webpack_require__(/*! ../../tenant/models/url_unfurl */ "./sharedemos/static/js/tenant/models/url_unfurl.js"), __webpack_require__(/*! ../templates/audience_list.handlebars */ "./sharedemos/static/js/audience/templates/audience_list.handlebars"), __webpack_require__(/*! ../templates/overlay.handlebars */ "./sharedemos/static/js/audience/templates/overlay.handlebars")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (_, $, Backbone, Common, AudienceCompany, AudienceEmployee, ProductTree, WebsiteInfo, AudienceList, Overlay) {
  'use strict';

  var AudienceHomeView = Backbone.View.extend({
    el: '#audience_page',
    MESSAGE_LIMIT: 1000,
    events: {
      // company events
      'click .add-new.company, .company_details .company_edit': 'addEditCompany',
      'click #audience_overlay .create_profile.active': 'saveCompany',
      'keyup .add_company_modal input, .add_company_modal textarea': 'validateCompany',
      'click .goto_message.active': 'proceedToMessage',
      'click .backto_name': 'goToName',
      'click .cp_delete': 'confirmDeleteCompany',
      'click .delete_company_warning .delete': 'deleteCompany',
      // employee events
      'click .add_employee.new, .employee_details .edit': 'addEditEmployee',
      'click #audience_overlay .add_employee.active': 'saveEmployee',
      'keyup .add_employee_modal input': 'validateEmployee',
      'click .employee_details .delete': 'confirmDeleteEmployee',
      'click .delete_user_warning .delete': 'deleteEmployee',
      // share content events
      'click .browse_library': 'browseLibrary',
      'click #select-share-category input[type=checkbox]': 'pickContent',
      'click .choose_share_content_popup .choose': 'selectContent',
      'click .share_content.active, .link_expiry': 'startShare',
      'click .share_content_popup .share': 'shareContent',
      'click #select-share-category .category': 'toggleTreeContent',
      // miscellaneous events
      'keyup input[type=url]': Common.updateUrl,
      'click .add_company_modal .close, .add_employee_modal .close, .share_content_popup .cancel, .delete_user_warning .cancel, .delete_company_warning .cancel': 'resetUI',
      'click .choose_share_content_popup .cancel, .choose_share_content_popup .back': 'backToShareHome'
    },
    initialize: function () {
      $(window).on('resize', {
        'root': this
      }, this.modalHeightCalc);
      this.render();
    },
    // Company related functions
    render: function () {
      this.resetUI();
      var audiences_list = new AudienceCompany();
      var root = this;
      audiences_list.fetch({
        success: function (model, response) {
          root.$el.find('#audience_list').html(AudienceList({
            'audiences': response
          }));
          root.loadInitials();
        }
      });
      this.modalHeightCalc();
      return this;
    },
    addEditCompany: function (event) {
      this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]') && this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');

      if (this.audience_id) {
        this.audience = new AudienceCompany({
          'id': this.audience_id
        });
        var root = this;
        this.audience.fetch({
          success: function (model, response) {
            response.is_company = true;
            response.is_editing = true;
            response.message_limit = root.MESSAGE_LIMIT;
            root.$('#audience_overlay').html(Overlay(response)).addClass("add_company");
          }
        });
      } else {
        this.$('#audience_overlay').html(Overlay({
          'is_company': true,
          message_limit: this.MESSAGE_LIMIT
        })).addClass("add_company");
      }
    },
    saveCompany: function (event) {
      if (!this.$(event.currentTarget).hasClass('active')) return;
      var name = this.$("#audience_overlay .add_company_modal").find('input[name=name]').val().trim();
      var website = this.$("#audience_overlay .add_company_modal").find('input[name=website]').val().trim();
      var message = this.$("#audience_overlay .add_company_modal").find('textarea[name=message]').val().trim();
      var attrs = {
        'name': name,
        'website': website,
        'message': message,
        'icon': this.$('.add_company_modal input[type=url]').attr('data-icon')
      };

      if (this.audience_id) {
        attrs.id = this.audience_id;
      }

      var audience = new AudienceCompany(attrs);
      var root = this;
      this.$(event.currentTarget).removeClass('active');
      audience.save({}, {
        success: function () {
          root.render();
        }
      });
    },
    validateCompany: function (event) {
      var validated = true;

      if (["name", "website"].indexOf(this.$(event.currentTarget).attr('name')) !== -1) {
        if (this.$(event.currentTarget).attr('name') == "name") {
          if (!event.currentTarget.value.trim().length) validated = false;
          if (!Common.validateUrl(this.$(event.currentTarget).parents('.tab_block').find('input[name=website]').val())) validated = false;
        }

        if (this.$(event.currentTarget).attr('name') == "website") {
          if (!this.$(event.currentTarget).parents('.tab_block').find('input[name=name]').val().length) validated = false;
          if (!Common.validateUrl(event.currentTarget.value)) validated = false;
        }

        if (validated) {
          this.$('.goto_message').addClass('active');
        } else {
          this.$('.goto_message').removeClass('active');
        }
      } else if (this.$(event.currentTarget).attr('name') == "message") {
        if (event.currentTarget.value.trim().length) {
          this.$('.create_profile').addClass('active');
        } else {
          this.$('.create_profile').removeClass('active');
        }

        var textLength = parseInt(this.$(event.currentTarget).attr('maxlength')) - this.$(event.currentTarget).val().length;
        this.$(event.currentTarget).parent('.block').find('.counter span').text(textLength);
      }
    },
    proceedToMessage: function (event) {
      if (!this.$(event.currentTarget).hasClass('active')) return;
      this.$('.add_company_modal input[type=url]').siblings('.error').text("");
      var url = this.$('.add_company_modal input[type=url]').val();

      if (this.audience && this.audience.get('website_url') == url) {
        this.$('.add_company_modal input[type=url]').attr('data-icon', this.audience.get('logo_file_name'));
        var target = this.$(event.currentTarget).attr('data-target');
        this.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
        this.$('.tab_menu_wrap .menu[data-target="' + target + '"], .tab_block[data-target="' + target + '"]').addClass('active');
      } else {
        var website_info = new WebsiteInfo();
        var root = this;
        website_info.fetch({
          data: {
            external_url: encodeURI(url)
          },
          success: function (model, response) {
            root.$('.add_company_modal input[type=url]').val(response.url || url).attr('data-icon', response.icon_name || "");
            var target = root.$(event.currentTarget).attr('data-target');
            root.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
            root.$('.tab_menu_wrap .menu[data-target="' + target + '"], .tab_block[data-target="' + target + '"]').addClass('active');
          },
          error: function (model, response, options) {
            root.$('.add_company_modal input[type=url]').siblings('.error').text(response.responseJSON.message);
          }
        });
      }
    },
    goToName: function (event) {
      var target = this.$(event.currentTarget).attr('data-target');
      this.$('.tab_menu_wrap .menu, .tab_block').removeClass("active");
      this.$('.tab_menu_wrap .menu[data-target="' + target + '"],\
                   .tab_block[data-target="' + target + '"], .tab_block[data-target="' + target + '"] .goto_message').addClass('active');
    },
    confirmDeleteCompany: function (event) {
      this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
      this.$('#audience_overlay').html(Overlay({
        'is_company_delete': true
      })).addClass("delete_company_warning_active");
    },
    deleteCompany: function () {
      var audience = new AudienceCompany({
        id: this.audience_id
      });
      this.actionInProgress('delete_company_warning');
      var root = this;
      audience.destroy({
        success: function () {
          root.actionSuccess('delete_company_warning');
          setTimeout(function () {
            root.render();
          }, 1500);
        },
        error: function () {
          root.actionFailed('delete_company_warning');
        }
      });
    },
    // Employee related functions
    addEditEmployee: function (event) {
      this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
      this.employee_id = this.$(event.currentTarget).parent().attr('data-employee-id');

      if (this.employee_id) {
        var employee = new AudienceEmployee({
          'id': this.employee_id,
          'audience_id': this.audience_id
        });
        var root = this;
        employee.fetch({
          success: function (model, response) {
            response.is_employee = true;
            response.is_editing = true;
            root.$('#audience_overlay').html(Overlay(response)).addClass("add_employee");
          }
        });
      } else {
        this.$('#audience_overlay').html(Overlay({
          'is_employee': true
        })).addClass("add_employee");
      }
    },
    saveEmployee: function (event) {
      if (!this.$(event.currentTarget).hasClass('active')) return;
      this.$(".add_employee_modal").find('.error').text("");
      var fname = this.$(".add_employee_modal").find('input[name=firstName]').val().trim();
      var lname = this.$(".add_employee_modal").find('input[name=lastName]').val().trim();
      var email = this.$(".add_employee_modal").find('input[name=email]').val().trim();
      var attrs = {
        'first_name': fname,
        'last_name': lname,
        'email': email,
        'audience_id': this.audience_id
      };

      if (this.employee_id) {
        attrs.id = this.employee_id;
      }

      var employee = new AudienceEmployee(attrs);
      var root = this;
      this.$(event.currentTarget).removeClass('active');
      employee.save({}, {
        success: function () {
          root.render();
        },
        error: function (model, response, options) {
          console.log("Save employee failed:", model, response, options);

          if (response.responseJSON && response.responseJSON.message == 'EXISTS') {
            root.$(".add_employee_modal").find('input[name=email]').siblings('.error').text('User with given email already exists!!');
          }

          root.$(event.currentTarget).addClass('active');
        }
      });
    },
    validateEmployee: function (event) {
      var validated = true;
      var fname = this.$(".add_employee_modal").find('input[name=firstName]').val().trim();
      var lname = this.$(".add_employee_modal").find('input[name=lastName]').val().trim();
      var email = this.$(".add_employee_modal").find('input[name=email]').val().trim();

      if (!fname || !lname || !email || !Common.validateEmail(email)) {
        validated = false;
      }

      if (validated) {
        this.$('.add_employee').addClass('active');
      } else {
        this.$('.add_employee').removeClass('active');
      }
    },
    confirmDeleteEmployee: function (event) {
      this.audience_id = this.$(event.currentTarget).parents('.company_profile[data-audience-id]').attr('data-audience-id');
      this.employee_id = this.$(event.currentTarget).parent().attr('data-employee-id');
      this.$('#audience_overlay').html(Overlay({
        'is_employee_delete': true
      })).addClass("delete_user_warning_active");
    },
    deleteEmployee: function () {
      var employee = new AudienceEmployee({
        id: this.employee_id,
        audience_id: this.audience_id
      });
      this.actionInProgress('delete_user_warning');
      var root = this;
      employee.destroy({
        success: function () {
          root.actionSuccess('delete_user_warning');
          setTimeout(function () {
            root.render();
          }, 1500);
        },
        error: function () {
          root.actionFailed('delete_user_warning');
        }
      });
    },
    // Share related functions
    browseLibrary: function () {
      this.$('#audience_overlay').removeClass('share_content_active').addClass('choose_share_content_active');
      this.$('#select-share-category').html("");
      this.modalHeightCalc();
      var root = this;
      var tree = new ProductTree();
      tree.fetch({
        data: {
          get_cache: 'False',
          author: 1
        },
        success: function (model, response) {
          root.selected_categories = root.$('.share_content_popup .category_selected').data('selected_categories');
          root.buildTree(response, "select-share-category", 0, "section");
          root.updateSelectCount();
        },
        error: function (xhr, status_code, message) {
          console.log("tree fetch error:", xhr, status_code, message);
        }
      });
    },
    backToShareHome: function () {
      this.$('#audience_overlay').removeClass('choose_share_content_active').addClass('share_content_active');
      this.$('.choose_share_content_popup .choose').removeClass('selected').text('CHOOSE');
    },
    startShare: function (event) {
      this.audience_id = this.$(event.target).parents('.company_profile[data-audience-id]').attr('data-audience-id');
      this.audience = new AudienceCompany({
        id: this.audience_id
      });
      var root = this;
      this.audience.fetch({
        success: function (model, response) {
          root.$('#audience_overlay').html(Overlay({
            'is_share': true
          })).addClass("share_content_active");
          var count = "";

          if (response.sections.length) {
            count = response.sections.length + (response.sections.length == 1 ? ' CATEGORY' : ' CATEGORIES') + ' SELECTED';
          }

          root.$('.share_content_popup .category_selected').text(count).data('selected_categories', response.sections);
          root.$('.expire_date').datepicker({
            language: 'en',
            dateFormat: "mm-dd-yyyy",
            minDate: new Date(),
            clearButton: true,
            onSelect: function (selectedDate) {
              root.$('.expire_date').datepicker().data('datepicker').hide();
            }
          });

          if (response.expire_at) {
            root.$('.expire_date').datepicker().data('datepicker').selectDate(new Date(response.expire_at));
          }
        },
        error: function (xhr, status_code, message) {
          console.log("audience fetch error:", xhr, status_code, message);
        }
      });
    },
    shareContent: function () {
      var audience = new AudienceCompany();
      this.actionInProgress('share_content_popup');
      var root = this;
      audience.save({
        id: this.audience_id,
        section_list: this.$('.share_content_popup .category_selected').data('selected_categories'),
        link_expiry_date: this.$('.expire_date').val()
      }, {
        patch: true,
        success: function (model, response) {
          root.actionSuccess('share_content_popup');
          setTimeout(function () {
            root.render();
          }, 1500);
        },
        error: function () {
          root.actionFailed('share_content_popup');
        }
      });
    },
    pickContent: function (event) {
      var level = this.$(event.target).parent().parent().attr('class').split(" ")[1].substr("5");
      level = parseInt(level);
      var root = this;

      for (var i = level - 1; i >= 1; i--) {
        root.$(event.target).parents(".level" + i).children('.category').find('.css-checkbox').attr('checked', false);
      }

      ;

      if (!this.$(event.target).parent().hasClass('no-child')) {
        this.$(event.target).parent().parent().find(".css-checkbox:gt(0)").attr('checked', false);
      }

      ;
      this.updateSelectCount();
    },
    updateSelectCount: function () {
      var total_selected = this.$('.choose_share_content_popup input[type=checkbox]:checked').length;

      if (total_selected) {
        var count = 'CHOOSE ' + total_selected + (total_selected == 1 ? ' CATEGORY' : ' CATEGORIES');
        this.$('.choose_share_content_popup .choose').text(count).addClass('selected');
      } else {
        this.$('.choose_share_content_popup .choose').text('CHOOSE').removeClass('selected');
      }
    },
    selectContent: function () {
      var selected_list = this.$('.choose_share_content_popup input[type=checkbox]:checked');

      var _sections = _.map(selected_list, function (el) {
        return el.value;
      });

      var count = "";

      if (selected_list.length) {
        count = selected_list.length + (selected_list.length == 1 ? ' CATEGORY' : ' CATEGORIES') + ' SELECTED';
      }

      this.$('.share_content_popup .category_selected').text(count).data('selected_categories', _sections);
      this.backToShareHome();
    },
    toggleTreeContent: function (event) {
      if (!this.$(event.currentTarget).hasClass('category') || this.$(event.currentTarget).hasClass('demo')) return;

      if (this.$(event.currentTarget).hasClass('closed')) {
        this.$(event.currentTarget).siblings().show();
        this.$(event.currentTarget).removeClass('closed').addClass('open');
      } else {
        this.$(event.currentTarget).siblings().hide();
        this.$(event.currentTarget).removeClass('open').addClass('closed');
      }
    },

    /**** Miscellaneous functions ****/
    // reset UI/close all popups
    resetUI: function () {
      this.audience_id = this.audience = null;
      this.employee_id = null;
      this.$('#audience_overlay').empty().removeAttr("class");
    },
    // popup height calculation
    modalHeightCalc: function () {
      var windowHeight = $(window).height() - 200;
      this.$('#select-share-category, .popup-box .content-block').css({
        "max-height": windowHeight
      });
    },
    // share tree builder
    buildTree: function (data, id, level, type) {
      var root = this;
      level += 1;

      for (var i = 0; i < data.length; i++) {
        if (type == "section") {
          var input;

          if (_.indexOf(root.selected_categories, data[i].slug) !== -1) {
            input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value=" + data[i].slug + " class='css-checkbox' checked/>";
          } else {
            input = "<input type='checkbox' id=" + "ch-" + data[i].slug + " value=" + data[i].slug + " class='css-checkbox' />";
          }

          var html = "<div id=" + data[i].slug + " data-item='section' class='category-list level" + level + "'>\
                                    <div class='category closed'>\
                                        <span class='icon'></span>" + data[i].name + input + "\
                                            <label for='ch-" + data[i].slug + "' class='css-label'></label>\
                                    </div>\
                                </div>";
        } else if (type == "playlists") {
          var html = "<div id='" + id + "-" + level + "-" + data[i].order + "' data-item='playlist' class='category-list level" + level + "'>\
                                    <div class='playlist'><span class='icon'></span>" + data[i].name + "</div>\
                                </div>";
        } else {
          var html = "<div class='category-list level" + level + "' data-item='chapter'>\
                                    <div class='demo'><span class='icon'></span>" + data[i].name + "</div>\
                                </div>";
        }

        ;
        $('#' + id).append(html);
        var parent_id;

        if (data[i].children) {
          parent_id = data[i].slug;
          root.buildTree(data[i].children, parent_id, level, "section");
        } else if (data[i].playlists) {
          parent_id = data[i].slug;
          root.buildTree(data[i].playlists, parent_id, level, "playlists");
        } else if (data[i].demos) {
          parent_id = id + '-' + level + '-' + data[i].order;
          root.buildTree(data[i].demos, parent_id, level, "demo");
        }

        ;
      }
    },
    // Action Status
    actionInProgress: function (target) {
      this.$('.' + target + ' .form-sending').addClass("slide-in is-submitted");
    },
    actionSuccess: function (target) {
      var root = this;
      setTimeout(function () {
        root.$('.' + target + ' .form-sending').removeClass("slide-in is-submitted");
        root.$('.' + target + ' .form-sent').addClass("slide-in");
        setTimeout(function () {
          root.$('.' + target + ' .form-sent').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    actionFailed: function (target) {
      var root = this;
      setTimeout(function () {
        root.$('.' + target + ' .form-sending').removeClass("slide-in");
        root.$('.' + target + ' .form-failed').addClass("slide-in");
        setTimeout(function () {
          root.$('.' + target + ' .form-failed').removeClass("slide-in");
        }, 1000);
      }, 1000);
    },
    loadInitials: function () {
      this.$('img.profile-img').attr({
        'data-height': 34,
        "data-width": 34,
        "data-char-count": 2,
        "data-font-size": 14
      }).initial().css({
        'border-radius': '50px',
        '-moz-border-radius': '50px'
      });
    }
  });
  return AudienceHomeView;
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

/***/ "./sharedemos/static/js/tenant/models/url_unfurl.js":
/*!**********************************************************!*\
  !*** ./sharedemos/static/js/tenant/models/url_unfurl.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*global define */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! backbone */ "./node_modules/backbone/backbone.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Backbone) {
  'use strict';

  var Urlunfurl = Backbone.Model.extend({
    urlRoot: "/url-unfurl"
  });
  return Urlunfurl;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

}]);
//# sourceMappingURL=24.6b75f3.js.map