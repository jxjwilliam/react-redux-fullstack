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



###

In order to send chat messages to users across servers we will update our server to use Redis as a PubSub service (along with session store). Redis natively supports pub-sub operations. 