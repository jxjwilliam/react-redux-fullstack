#!/bin/bash

mongoimport  -d redux -c users ../etc/users.json --jsonArray

mongoimport  -d redux -c logins ../etc/logins.json --jsonArray

mongoimport  -d redux -c todos ../etc/todos.json --jsonArray
