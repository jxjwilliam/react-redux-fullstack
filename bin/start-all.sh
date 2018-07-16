#!/bin/bash

# NO Mysql:
#mysqld &

# Redis-server: /usr/local/var/db/redis, /usr/local/etc/redis.conf
redis-server &

# Mongodb: mongod --path /usr/local/var/mongodb
mongod &

# PostgreSQL server
brew services restart postgresql

# RabbitMQ
brew services start rabbitmq


