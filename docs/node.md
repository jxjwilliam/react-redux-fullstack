
### pub/sub or observer DP ?

The non-blocking I/O engine of Node.js – libuv -

The Observer Pattern(EventEmitter) maintains a list of dependents/observers and notifies them

```javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();

var ringBell = function ringBell() {
  console.log('tring tring tring');
}
eventEmitter.on('doorOpen', ringBell);

eventEmitter.emit('doorOpen');
```

### Node.js uses `streams to handle incoming data

A stream is an abstract interface for working with streaming data in Node.js. The stream module provides a base API that makes it easy to build objects that implement the stream interface.

Handing POST request like upload file use request.on('data, chunk), request.on('end', ()=>cb);