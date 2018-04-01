import merge from 'webpack-merge'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import common from './webpack.common'

const client = {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js',
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: '/css/styles.[hash].css',
      allChunks: true
    }),
  ]
}

export default merge(common, client)
