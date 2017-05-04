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


// Redis Pub/Sub
const rurl = Redis.getUrlString();
const pub = redis.createClient(rurl);
const sub = redis.createClient(rurl);

// socket `Chat` config
const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

io.on('connection', (socket) => {
  // this seems not fired.
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

  socket.on('socket-redis', (data) => {
    sub.subscribe('redis_twits');
  });
})

sub.on('subscribe', (channel) => {
  pub.publish(channel, "red"); //"redis_twits"
  setTimeout(()=> pub.publish('twits', 'blue'), 2000)
});

sub.on('message', (chan, msg) => {
  //console.log('I am in message', chan, msg); //redis_twits, red

  // refer to socket.d
  //res: { field1: 'red', field2: 'blue' } 'object' true
  pub.hgetall('smoothie', (err, res) => {
    console.log(res, typeof io.sockets, typeof io.sockets.emit === 'function');
    res.key = msg;

    // in browser, the res: {field1: "red", field2: "blue", key: "red"}
    io.sockets.emit('twits', res);
  })
})

// Start the Server
http.listen(port, () => {
  console.log('Server Started. Listening on *:' + port);
});
