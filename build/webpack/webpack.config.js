var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  context: path.resolve('client'),
  devtool: 'eval-source-map',

  entry: {
    main: './index.jsx',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    })
  ],

  devServer: {
    hot: true,
    contentBase: path.resolve('dist'),
    publicPath: '/'
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
          presets: ['react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: [
            'css-loader', 
            'resolve-url-loader', 
            { 
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  /* 
                   * https://github.com/postcss/postcss-loader
                   * Production configurations
                   */
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            }]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: [
            'css-loader', 
            'resolve-url-loader', 
            { 
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }

            },
            'sass-loader'
            ]
        })
      }
    ]
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],

    // extensions that should be used to resolve modules
    extensions: ['.js', '.jsx', '.scss', '.css']
  }

}
