//config for web-server, mongoose, postgresql, redis, rabbit-mq etc.

const WebServer = {
  VERSION: 1,
  URL: 'http://127.0.0.1',
  API_PATH: '/api',
  PORT: process.env.PORT || 8080,
  getHTTPUrl: function () {
    return 'http://' + this.URL + ":" + this.PORT;
  }
}

const WebSocket = {
  URL: 'localhost',
  PORT: 8080,
  getSocketPUrl: function () {
    return 'ws://' + this.URL + ":" + this.PORT;
  }
}

//MongoDB configuration
const Mongo = {
  HOST: 'localhost',
  PORT: '27017',
  DB: 'redux',
  getDBString: function () {
    return 'mongodb://' + this.HOST + ':' + this.PORT + '/' + this.DB;
  }
}

const Pg = {
  HOST: 'localhost',
  PORT: 5433,
  USER: 'psql',
  PASSWORD: 'psql',
  DB: 'react_redux',
  //postgres://localhost:5433/react-redux
  getDBString: function () {
    return 'postgres://' + this.HOST + ':' + this.PORT + '/' + this.DB
  },
  //postgres://brian:mypassword@localhost:5432/dev
  getDBFullString: function () {
    return 'postgres://' + this.USER + ':' + this.PASSWORD + '@' + this.HOST + ':' + this.PORT + '/' + this.DB
  }
}

const Redis = {
  'user': '',
  'password': '',
  'host': '',
  'port': 6379
};

const RabbitMQ = {};

const config = {
  WebServer,
  WebSocket,
  Mongo,
  Pg,
  Redis,
  RabbitMQ
}

module.exports = config;