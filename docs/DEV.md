## Document

- [Node](./node.md)
- [Redis](./redis.md)
- [Rabbit MQ](./rabbitmq.md)
- [Postgre SQL](./psql.md)
- [Docker](./docker.md)
- [mongo](./mongo.md)
- [React](./react.md)
- [Redux](./redux.md)


- [git](./git.md)
- [flow](./flow.md)
- [curl](./curl.md)

- [History](./HISTORY.md)


- [PostgreSQL + redux/todoMVC](../src/psql/README.md)


## Improvement
  
### 1. etc/config.js

Hold all the config information, e.g. db config, web-server config.
```javascript
 import { WebServer } from '../etc/config'
 WebServer.PORT
 WebServer.getHTTPUrl()
```

So the web-server PORT, URL are united from same config file.


### 2. add flexbox in <Footer/>

It is useful when valign the <div/>


### 3. improve media-query for Responsive Web Design

assets/style.scss