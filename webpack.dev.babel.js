import merge from 'webpack-merge'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import common from './webpack.common'

const client = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true,
    }),
  ],
}

export default merge(common, client)
