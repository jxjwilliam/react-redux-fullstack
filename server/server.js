/* eslint-disable no-console, no-use-before-define */

// 1. import regular web-server-stuff
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon'
import prettyjson from 'prettyjson'
import bodyParser from 'body-parser'

// 2. import webpack
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

// 3. import React-Redux
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ? process.env.PORT : 8081

// 4. extends:
import routes from './routes';
import db from './db'
db.connect();

app.use(favicon(path.join(__dirname, '..', 'favicon.ico')))

//app.use(require("webpack-dev-middleware")(compiler, {
//    noInfo: true,
//    publicPath: webpackConfig.output.publicPath
//}));

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// /api/todos/
app.use(routes);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(port, error => {
    if(error) {
        console.error(prettyjson.render(error))
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});
