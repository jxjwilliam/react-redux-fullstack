## Building React Applications with Idiomatic Redux

## Quick Start

```bash
cd `react-redux-fullstack`
npm install
//or:
//ncu -u
//npm install
//npm -g install webpack-dev-server
./node_modules/.bin/webpack-dev-server
//export PORT=8000 webpack-dev-server
```

Then:

```bash
open http://localhost:8080
```

For more details, check [here](./docs/HISTORY.md) and [here](./docs/DEV.md)

## Improvement

- add `mini` folder to test middlewares: thunk, socket, promise, jwt, auth, and custom, it is an all-inclusive mini-package which can clone for other purpose.
- use `redux-observable-middleware`

## Multi-servers
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

## Some Screenshot

### 1. Chat + Socket.io
<img src="./docs/imgs/chat.png" width="480">

### 2. Login + MongoDB
<img src="./docs/imgs/login.png" width="480">

### 3. PostgreSQL
<img src="./docs/imgs/postgresql.png" width="480">

### 4. React-routers
<img src="./docs/imgs/routes+flexbox.png" width="480">

### 5. Server delegate + Redux-Form 
<img src="./docs/imgs/server-side-delegate+redux-form.png" width="480">

### 6. Socket + redis + canvas
<img src="./docs/imgs/socket-redis+cavas.png" width="480">

### 7. User CRUD + bootstrap-modal
<img src="./docs/imgs/user-crud+bootstrap-modal.png" width="480">

### 8. User Search + MongoDB + Rxjs
<img src="./docs/imgs/user-search+mongodb+rxjs.png" width="480">
