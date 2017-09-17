const path = require('path');
const webpack = require('webpack');

// This plugin gets useful information from webpack and stores
// it in a json file. It will help webpack talk with Django.
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePath = path.resolve(__dirname);


module.exports = {
  context: path.join(basePath, 'client'),
  devtool: 'eval-source-map',

  entry: [
    './index.jsx',
    'webpack-hot-middleware/client?reload=true',
  ],

  output: {
    path: path.join(basePath, 'dist'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
  ],

  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.join(basePath, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        // regexp that tells webpack to use the following loaders
        // on all .js and .jsx files
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // specify that we will be dealing with React code
          presets: ['react', 'stage-1'],
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff',
          },
        },
      }, {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      },
    ],
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],

    // extensions that should be used to resolve modules
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },

};
