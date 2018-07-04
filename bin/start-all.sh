#!/bin/bash

# NO Mysql:
#mysqld &

# Redis-server
redis-server &

# Mongod
mongod &

# PostgreSQL server
brew services restart postgresql

# RabbitMQ
brew services start rabbitmq


