### Install Server

[Installing on Mac](https://www.rabbitmq.com/install-standalone-mac.html)

```bash
$ brew install rabbitmq
```

- /usr/local/sbin/rabbitmq-server
- /usr/local/etc/rabbitmq
- CONFIG_FILE=/usr/local/etc/rabbitmq/rabbitmq
- NODE_IP_ADDRESS=127.0.0.1
- NODENAME=rabbit@localhost

### Install Client

```bash
$ npm install amqplib
```

### Commands
```bash
$ rabbitmqctl start
$ rabbitmqctl stop
$ rabbitmqctl status
$ rabbitmqctl restart
$ rabbitmqctl list_queues
```

## Q&A

take advantage of your web server in between RabbitMQ and Socket.io.

When a message is done processing and ready to be delivered to the user, the web server can use socket.io to check if the user is online. if they are, send the message to the user. if they are not currently connected to socket.io, store the message in a database.

when the user reconnects, check the database to see if there are any messages waiting for that user and send them at that point.

Reference
----------
[Node.js code for RabbitMQ tutorials](https://github.com/rabbitmq/rabbitmq-tutorials/tree/master/javascript-nodejs)

Notes
------
After `brew install rabbitmq`:

Bash completion has been installed to:
  /usr/local/etc/bash_completion.d

To have launchd start rabbitmq now and restart at login:
```bash
$ brew services start rabbitmq
```
Or, if you don't want/need a background service you can just run:
```bash
$ rabbitmq-server
```
