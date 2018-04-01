import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  name: 'app',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          fallback: 'file-loader',
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: 'css-loader',
          },
        ),
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
}
