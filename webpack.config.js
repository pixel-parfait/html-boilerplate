const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

var config = {
  entry: {
    'app': './src/js/app.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public/assets')
  },
  module: {
    rules: [
      {
        test: /\.(eot|otf|svg|ttf|woff|woff2)(\?.*)?$/,
        include: [
          path.resolve(__dirname, 'src/fonts')
        ],
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            publicPath: '../fonts/',
            name: '[hash].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: [
          path.resolve(__dirname, 'src/fonts')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              publicPath: '../img/',
              name: '[hash].[ext]'
            },
          },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode !== 'production') {
    config.devtool = 'source-map';
  }

  return config;
};
