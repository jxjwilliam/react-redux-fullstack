[Mongoose, MongoDB and Express](http://onlythepixel.com/2017/01/05/mongoose-mongodb-and-express/)

Init MongoDB by insert data into collections in `redux` Database.

```bash
mongoimport  -d redux -c users  ./etc/users.json --jsonArray

mongoimport  -d redux -c logins  ./etc/logins.json --jsonArray

mongoimport  -d redux -c todos  ./etc/todos.json --jsonArray

mongoimport --db redux --collection users < ./etc/users.json  --jsonArray
```