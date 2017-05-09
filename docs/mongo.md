# http://onlythepixel.com/2017/01/05/mongoose-mongodb-and-express/

mongoimport  -d redux -c users  ./etc/users.json --jsonArray

mongoimport  -d redux -c logins  ./etc/logins.json --jsonArray

mongoimport  -d redux -c todos  ./etc/todos.json --jsonArray

mongorestore



mongoimport --db redux --collection users < ./etc/users.json  --jsonArray
