'use strict';

var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV
var port = process.env.PORT || 8081

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname,  'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
