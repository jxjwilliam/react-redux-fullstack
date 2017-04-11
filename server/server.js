/* eslint-disable no-console, no-use-before-define */

// 1. import regular web-server-stuff
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon'
import prettyjson from 'prettyjson'
import bodyParser from 'body-parser'
import http from 'http'
import SocketIo from 'socket.io'

// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// 3. import React-Redux
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

const port = process.env.PORT ? process.env.PORT : 8081
const compiler = webpack(webpackConfig);
const app = express();

// 4. extends:

const server = new http.Server(app);
const io = new SocketIo(server);
io.path('/ws');

import routes from './routes';
import db from './db'
db.connect();


// 5. config web-server
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(express.static(__dirname + '../public'));

//app.use(routes);
app.use(routes.todos);
app.use(routes.users);
app.use(routes.counter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const runnable = app.listen(port, error => {
    if(error) {
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
