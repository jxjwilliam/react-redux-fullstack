#!/bin/bash

# Mysl
mysqld &

# Redis-server
cd ~/bin/redis-3.2.8/
src/redis-server

# Mongod
mongod &

# PostgreSQL server
brew services start postgresql

# RabbitMQ
brew services start rabbitmq


