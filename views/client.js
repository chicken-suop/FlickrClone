"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _app = _interopRequireDefault(require("./components/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Confirm both server and client side pages are identical
(0, _reactDom.hydrate)(_react.default.createElement(_app.default, null), document.querySelector('#app'));