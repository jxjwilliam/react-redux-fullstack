## Building React Applications with Idiomatic Redux

## Quick Start

```bash
cd `this-folder`
npm install
//or:
ncu -u
npm install
webpack-dev-server
```

Then:

```bash
open http://localhost:8080
```

For more details, check [here](./docs/HISTORY.md)

## Improvement

There are multiple webserver which can be switched to run by different purpose.


- server.js: current
- server.mongo.js: webserver + mongo
- server.pg.js:  webserver + postgre-sql
- server.redis.socket.js: webserver + redis+socket
- server.rabbitmq.js: webserver + rabbitmq
- server.mini.js: only webserver
- server.all.js:  all inclusive

To start mongo-webserver:
```bash
$ npm run server/index.js mongo
```

To start postgresql-webserver
```bash
$ npm run server/index.js pg
```
