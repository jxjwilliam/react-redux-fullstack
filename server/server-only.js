var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'


var routes = require('./routes/mongo/');

const compiler = webpack(webpackConfig);

var app = express();

import db from './db'
db.connect();


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

//app.use(webpackHotMiddleware(compiler));

app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));

//TODO:
app.use('/api/todos', routes.todos);
app.use('/api/users', routes.users);
app.use('/api/counter', routes.counter);
app.use('/api/github', routes.github);
app.use('/api/auth', routes.auth);
app.use('/api/delegate/github/', routes.github);


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