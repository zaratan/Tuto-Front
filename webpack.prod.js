"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _webpack = _interopRequireDefault(require("./webpack.common"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js'
  },
  devtool: 'source-map',
  plugins: [new _extractTextWebpackPlugin.default({
    filename: '/css/styles-[hash].css',
    allChunks: true
  })]
};

var _default = (0, _webpackMerge.default)(_webpack.default, client);

exports.default = _default;

