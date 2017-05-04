## Document

- [Node](./node.md)
- [Redis](./redis.md)
- [Rabbit MQ](./rabbitmq.md)
- [Postgre SQL](./pg.md)
- [Docker](./docker.md)
- [mongo](./mongo.md)
- [React](./react.md)
- [Redux](./redux.md)


- [git](./git.md)
- [flow](./flow.md)
- [curl](./curl.md)

- [History](./HISTORY.md)


- [PostgreSQL + redux/todoMVC](../src/pg/README.md)

- Tiny pub/sub by jQuery
```javascript
(function($) {
  var o         = $({});
  $.subscribe   = o.on.bind(o);
  $.unsubscribe = o.off.bind(o);
  $.publish     = o.trigger.bind(o);
}(jQuery));
```

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

### 4. add Chat tab, make socket.io work.

Initialize `socket.io` in src/index.js as global variable, and in `Chat.js`, send message to server and ready to receive message from server.

### 5. add Redis tab

### 6. add RabbmitMQ tab
