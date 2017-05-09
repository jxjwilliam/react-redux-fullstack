import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import {WebServer, RabbitMQ} from '../etc/config'

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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.on('removeQueue', function (strem) {
  console.log('remove RabbitMQ queue.');
});

var destination = '/queue/someQueueName';
var client = new Stomp('127.0.0.1', 61613, 'guest', 'guest');

client.connect(function (sessionId) {
  client.subscribe(destination, function (body, headers) {
    console.log('This is the body of a message on the subscribed queue: ', body);
  });

  client.publish(destination, 'Oh /queue/someQueueName from server-side.');
});