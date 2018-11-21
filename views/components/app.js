"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Feed = _interopRequireDefault(require("./pages/Feed"));

var _Detail = _interopRequireDefault(require("./pages/Detail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  var Handler;
  var pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  if (pathname === '/') {
    // '/' – Feed list
    Handler = _Feed.default;
  } else {
    // '/:id' – Feed detail
    // Very basic, so '/[anything]/[more]' will also work
    var flickrPhotoId = pathname.match(/[^\/]+\/([0-9]+)/);

    Handler = function Handler() {
      return _react.default.createElement(_Detail.default, {
        id: flickrPhotoId
      });
    };
  }

  ;
  return _react.default.createElement(Handler, null);
};

var _default = App;
exports.default = _default;