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

It is useful when align the <div/>s, like menu, tabs, footer lists.


### 3. improve media-query for Responsive Web Design

assets/style.scss

add `media-object` in About component, 

### 4. add Chat tab, make socket.io work.

Initialize `socket.io` in src/index.js as global variable, and in `Chat.js`, send message to server and ready to receive message from server.

add socket-login-users counters, 

### 5. add Redis tab

Redis Pub/Sub with socket.io, works fine. Can be multiple-subscribers for redis extensions.

update redis pub/sub

### 6. add RabbmitMQ tab

1. work queue.


### 7. add NotFound component.

1. If there is a wrong router, e.g. /users-nyc/, it should return NotFound remindering.
1. If RESTFul APIs, e.g. /api/users/, it should return rest-json data from server.
1. generally react-router-dom-v4 `Route` return 3 `props`:
  { match, location, history }
  - match.url, match.params
  - location.pathname
1. currently work fine, as expected.  
  
1. update auth login to mongo.
