"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _marked = require("marked");
require("./react-whatsmarked.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /*
MIT License

Copyright (c) 2025 Claudemir Todo Bom <claudemir@todobom.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
console.log(_marked.marked);
var CustomRenderer = /*#__PURE__*/function (_marked$Renderer) {
  function CustomRenderer() {
    _classCallCheck(this, CustomRenderer);
    return _callSuper(this, CustomRenderer, arguments);
  }
  _inherits(CustomRenderer, _marked$Renderer);
  return _createClass(CustomRenderer, [{
    key: "heading",
    value: function heading(input) {
      console.log(input);
      return _marked.marked.parseInline(input.raw);
    }
  }, {
    key: "em",
    value: function em(_ref) {
      var raw = _ref.raw,
        text = _ref.text;
      if (raw.startsWith("*")) {
        return "<strong>".concat(text, "</strong>");
      }
      return "<em>".concat(text, "</em>");
    }
  }, {
    key: "strong",
    value: function strong(_ref2) {
      var raw = _ref2.raw,
        text = _ref2.text;
      var firstChar = raw.charAt(0);
      if (firstChar === "_") {
        return "".concat(firstChar, "<em>").concat(text, "</em>").concat(firstChar);
      }
      return "".concat(firstChar, "<strong>").concat(text, "</strong>").concat(firstChar);
    }
  }, {
    key: "unsupported",
    value: function unsupported(input) {
      console.log(input);
      return input.raw.replace("\n", "<br>");
    }
  }, {
    key: "checkbox",
    value: function checkbox(input) {
      return this.unsupported(input);
    }
  }, {
    key: "table",
    value: function table(input) {
      return this.unsupported(input);
    }
  }, {
    key: "link",
    value: function link(_ref3) {
      var href = _ref3.href,
        text = _ref3.text,
        raw = _ref3.raw;
      if (href === raw) {
        return "<a href=\"".concat(href, "\" target=\"_blank\">").concat(text, "</a>");
      }
      return raw.replace("\n", "<br>");
    }
  }]);
}(_marked.marked.Renderer);
var renderer = new CustomRenderer();
_marked.marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
var WhatsMarked = function WhatsMarked(_ref4) {
  var children = _ref4.children,
    oneline = _ref4.oneline,
    className = _ref4.className;
  if (!children) return null;

  // remove html
  children = children.replaceAll("<", "&lt;");

  // insert blank line after blockquotes
  children = children.replace(/^(>.*)(\n(?!\n))/gm, "$1\n$2");
  var htmlContent = oneline ? _marked.marked.parseInline(children) : _marked.marked.parse(children);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className || oneline ? "whatsmarkedOneline" : "whatsmarked",
    dangerouslySetInnerHTML: {
      __html: htmlContent
    }
  });
};
var _default = exports.default = WhatsMarked;