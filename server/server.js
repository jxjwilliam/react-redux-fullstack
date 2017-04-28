/* eslint-disable no-console, no-use-before-define */

// 1. import regular web-server-stuff
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon'
import prettyjson from 'prettyjson'
import bodyParser from 'body-parser'
import http from 'http'
import SocketIo from 'socket.io'
import cookieParser from 'cookie-parser';
//import cors from 'cors';

// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// 3. import React-Redux
//import React from 'react'
//import { renderToString } from 'react-dom/server'
//import { Provider } from 'react-redux'

import routes from './routes/mongo/';

const port = process.env.PORT ? process.env.PORT : 8081
const compiler = webpack(webpackConfig);
const app = express();

// 4. extends:

const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

import db from './db'
db.connect();


app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// 5. config web-server
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')))


// view engine setup
//app.set('views', path.join(__dirname, '../client'));
//app.set('view engine', 'ejs');

// This setting is important for test purpose (mocha, chai-http):
// I used mocha-chai test and fix: LOG: Error{crossDomain: true, status: undefined, method: 'put', url: 'http://localhost:8081/api/counter'}, undefined
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());

app.use('/api/todos', routes.todos);
app.use('/api/users', routes.users);
app.use('/api/counter', routes.counter);
app.use('/api/github', routes.github);
app.use('/api/auth', routes.auth);
app.use('/api/delegate/github/', routes.github);

/**
 *  app.use('/api/new/*', express.static(staticPath));
 *  app.use('/api/validateEmail/*', express.static(staticPath));
 */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const runnable = app.listen(port, error => {
  if (error) {
    console.error(prettyjson.render(error))
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

io.on('connection', (socket) => {
  socket.emit('news', {msg: `'Hello World!' from server`});

  socket.on('history', () => {
    for (let index = 0; index < bufferSize; index++) {
      const msgNo = (messageIndex + index) % bufferSize;
      const msg = messageBuffer[msgNo];
      if (msg) {
        socket.emit('msg', msg);
      }
    }
  });

  socket.on('msg', (data) => {
    data.id = messageIndex;
    messageBuffer[messageIndex % bufferSize] = data;
    messageIndex++;
    io.emit('msg', data);
  });
});

io.listen(runnable);
