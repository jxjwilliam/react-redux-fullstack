# http://onlythepixel.com/2017/01/05/mongoose-mongodb-and-express/

mongoimport  -d redux -c users  ./etc/data.json --jsonArray

mongoimport --db redux --collection users < ./etc/data.json  --jsonArray
