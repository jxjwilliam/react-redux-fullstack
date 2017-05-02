### Install Server

[Installing on Mac](https://www.rabbitmq.com/install-standalone-mac.html)

```bash
$ brew install rabbitmq
```

To have launchd start rabbitmq now and restart at login:
```bash
$ brew services start rabbitmq
```
Or, if you don't want/need a background service you can just run:
```bash
$ rabbitmq-server
```

- /usr/local/sbin/rabbitmq-server
- /usr/local/etc/rabbitmq
CONFIG_FILE=/usr/local/etc/rabbitmq/rabbitmq
NODE_IP_ADDRESS=127.0.0.1
NODENAME=rabbit@localhost

### Install Client

```bash
$ npm install amqplib
```

### Manage

- rabbitmqctl start
- rabbitmqctl stop
- rabbitmqctl status
- rabbitmqctl restart
