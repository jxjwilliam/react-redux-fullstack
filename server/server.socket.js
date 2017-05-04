import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'
import favicon from 'serve-favicon'
import {WebServer, Redis} from '../etc/config'
import redis from 'redis'
//import redis_client from './redis'

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
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

  socket.on('socketredis', (data) => {
    setTimeout(() => {
      socket.emit('twits', {
        reach: 20,
        category: 'blue'
      })
    }, 2000)
    socket.emit('twits', {
      reach: 10,
      category: 'red'
    })
  })

});

// Redis Pub/Sub
const rurl = Redis.getUrlString();
const pub = redis.createClient(rurl);
const sub = redis.createClient(rurl);

sub.on('message', (chan, msg) => {
  pub.hgetall(msg, (err, res) => {
    res.key = msg;
    io.sockets.emit('twits', res);
  });
});
sub.subscribe(('redis_twits'));

// Start the Server
http.listen(port, () => {
  console.log('Server Started. Listening on *:' + port);
});
