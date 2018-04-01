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
  mode: 'development',
  output: {
    filename: 'js/[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [new _extractTextWebpackPlugin.default({
    filename: 'css/styles.css',
    allChunks: true
  })]
};

var _default = (0, _webpackMerge.default)(_webpack.default, client);

exports.default = _default;

