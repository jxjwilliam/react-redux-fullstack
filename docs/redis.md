
### Redis

Redis is an open-source (BSD-licensed), in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperlogs, and geospatial indexes with radius queries.

- Super-fast in-memory data structure server
- Pub/Sub
- Rich client libraries
- Zero install and easy to operate
- Connect multiple node.js-servers to 1 redis channel

### Install Server

- cd ~/bin/
- Download and install Redis-3.2.8
- make
  - src/redis-server
The server is now ready to accept connections on port 6379


### Install Client

https://github.com/NodeRedis/node_redis
```bash
$ npm install redis -S
```

### Steps

- add a tab socket-redis and a component src/socket-redis/SocketRedisChat.js
- 


### Redis-backed Pub/Sub

- 2 clients required: 1 for pub, 1 for sub
- use 1 channel, add metadata to your message


### Q&A

- In order to send chat messages to users across servers we will update our server to use Redis as a PubSub service (along with session store). 
Redis natively supports pub-sub operations. 

- Subscribe channel
- Unsubscribe channel
- Publish channel message



## Reference

- [Using Redis with Node.js and Socket.IO](https://scalegrid.io/blog/using-redis-with-node-js-and-socket-io/)