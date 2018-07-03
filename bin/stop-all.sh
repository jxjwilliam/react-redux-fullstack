#!/bin/bash

# Mysl
#pkill mysql

# Redis-server
pkill redis-server
$ redis-cli shutdown

# Mongod
pkill mongod

# PostgreSQL server
brew services stop postgresql

# RabbitMQ
brew services stop rabbitmq
