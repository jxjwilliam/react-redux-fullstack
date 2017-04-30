const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import {WebServer} from '../etc/config'
const routes = require('./routes/mongo/');

const compiler = webpack(webpackConfig);
const app = express();

import db from './mongo_db'
db.connect();


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));

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

const port = WebServer.PORT;
const url = WebServer.getHTTPUrl();
app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up ${url} in your browser.`)
  }
});