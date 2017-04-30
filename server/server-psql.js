const express = require('express');
const router = express.Router();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

import favicon from 'serve-favicon';
import pg_routes from './routes/pg/'

const app = express();

app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/pg/', pg_routes.todos);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

const PORT = 8083;

app.listen(PORT, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:8082/ in your browser.`)
  }
});
