import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import favicon from 'serve-favicon';
import redis from 'redis';
import {Redis, WebServer} from '../etc/config'

import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const compiler = webpack(webpackConfig);
const app = express();

//-------------------
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
//-------------------

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = WebServer.PORT;


const client = redis.createClient('redis://' + Redis.user + ':' + Redis.password + '@' + Redis.host + ':' + Redis.port);
/**
 * var pub = redis.createClient();
 * var sub = redis.createClient();
 */

// Redis Client Ready
client.once('ready', function () {

  // Flush Redis DB
  // client.flushdb();

  // Initialize Chatters
  client.get('chat_users', function (err, reply) {
    if (reply) {
      chatters = JSON.parse(reply);
    }
  });

  // Initialize Messages
  client.get('chat_app_messages', function (err, reply) {
    if (reply) {
      chat_messages = JSON.parse(reply);
    }
  });
});

// Start the Server
http.listen(port, function () {
  console.log('Server Started. Listening on *:' + port);
});

// Store people in chatroom
var chatters = [];

// Store messages in chatroom
var chat_messages = [];

// Express Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// API - Join Chat
app.post('/join', function (req, res) {
  var username = req.body.username;
  if (chatters.indexOf(username) === -1) {
    chatters.push(username);
    client.set('chat_users', JSON.stringify(chatters));
    res.send({
      'chatters': chatters,
      'status': 'OK'
    });
  } else {
    res.send({
      'status': 'FAILED'
    });
  }
});

// API - Leave Chat
app.post('/leave', function (req, res) {
  var username = req.body.username;
  chatters.splice(chatters.indexOf(username), 1);
  client.set('chat_users', JSON.stringify(chatters));
  res.send({
    'status': 'OK'
  });
});

// API - Send + Store Message
app.post('/send_message', function (req, res) {
  var username = req.body.username;
  var message = req.body.message;
  chat_messages.push({
    'sender': username,
    'message': message
  });
  client.set('chat_app_messages', JSON.stringify(chat_messages));
  res.send({
    'status': 'OK'
  });
});

// API - Get Messages
app.get('/get_messages', function (req, res) {
  res.send(chat_messages);
});

// API - Get Chatters
app.get('/get_chatters', function (req, res) {
  res.send(chatters);
});

// Socket Connection
// UI Stuff
io.on('connection', function (socket) {

  // Fire 'send' event for updating Message list in UI
  socket.on('message', function (data) {
    io.emit('send', data);
  });

  // Fire 'count_chatters' for updating Chatter Count in UI
  socket.on('update_chatter_count', function (data) {
    io.emit('count_chatters', data);
  });

});