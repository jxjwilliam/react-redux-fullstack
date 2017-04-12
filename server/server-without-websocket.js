var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// 3. import React-Redux
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

var routes = require('./routes/index');
var delegator = require('./delegator/index');

const compiler = webpack(webpackConfig);

var app = express();

import db from './db'
db.connect();


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

//app.use(webpackHotMiddleware(compiler));

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes.todos);
app.use(routes.users);
app.use(routes.counter);

app.use(cors());
app.use('/api/delegate/github', delegator.github);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


app.listen(8082, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port 8082. Open up http://localhost:8082/ in your browser.`)
  }
});