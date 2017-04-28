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
  DATABASE: 'redux',
  getDBString: function () {
    return 'mongodb://' + this.DB.HOST + ':' + this.DB.PORT + '/' + this.DB.DATABASE;
  }
}


const PostgreSQL = {
  getDBString: () => {
    return ''
  }
}

const Redis = {}

const RabbitMQ = {}

const config = Object.assign({},
  WebServer,
  WebSocket,
  Mongo,
  PostgreSQL,
  Redis,
  RabbitMQ
)

module.exports = config;
