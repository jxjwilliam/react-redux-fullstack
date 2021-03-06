var webpack = require('webpack');

//'./node_modules/phantomjs-polyfill/bind-polyfill.js',

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: false,

    frameworks: [ 'mocha' ],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    reporters: [ 'mocha' ],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader")
    ],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
          { test: /\.json$/, loader: 'json-loader' }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  });
};
