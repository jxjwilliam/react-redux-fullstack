#!/bin/bash

mongoimport  -d redux -c users  ../etc/mongo-users.json --jsonArray

mongoimport  -d redux -c logins ../etc/mongo-logins.json --jsonArray

mongoimport  -d redux -c todos  ../etc/mongo-todos.json --jsonArray
