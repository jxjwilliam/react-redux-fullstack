

### Socket.IO

- cross browser (including IE6)
- Real-time and bi-directional persistent connection (WebSocket)
- Wworking for https and cross-domain (if use webSocket or JSONP)
- Authentication
 . Cookie & Session
 . Cookie does not cross domain, use SSL + Access Token instead
- Use Nginx for loading Balancing.
- Configurations
 . Store(default: memoryStore, single process only)
 . transports(default: websocket, htmlfile, xhr-polling, jsonp-polling)
 . authorization (default: false)
 
- Socket.IO primarily use WebSocket, but can fallback to other methods lik AJAX Long polling, JSONP polling
 In addition to 1-to-1 communication as in WebSocket, it enables broadcasting to multiple nodes

### modules

- Redis
- Socket.io
- isomorphic-fetch
- node-jsonwebtoken

### Q&A

- Pub/Sub or Message Queue

### Processing flow

1. in browser, when React Component is rendered, in `componentDidMount` fires a `socket.emit`,
1. in server, `socket.on` is triggered and does `redis publish`
1. in server, `redis.on` does redis-stuff (hgetall...)
1. in server, `redis.on` fires `socket.emit()` to pass/broadcast data to browser.
1. in browser, `socket.on` is triggered to process the data, and render the components.


### Reference

- Forever Iframe
- XMLHttpRequest Long Polling
- Cometed
- Websocket
