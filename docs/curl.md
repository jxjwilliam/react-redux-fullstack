
DATA='{"counter": 66}'
curl -X PUT "http://localhost:8081/api/counter" -H "Content-Type: application/json" -d "${DATA}"


DB_URL="http://localhost:8088/api/tasks"
HEADER="Content-Type: application/json"
METHOD=POST
DATA='{"description":"this is a description"}'

$ curl -H "${HEADER}" -X ${METHOD} -d "${DATA}" ${DB_URL}

$ curl -X GET $DB_URL

$ curl -X GET "http://localhost:8088/api/tasks"

$ curl -X GET "http://localhost:8088/api/tasks/586e886d7106b038d820a550"


$ curl -X POST "http://localhost:8088/api/tasks"  -H "Content-Type: application/x-www-form-urlencoded"  -d 'description=test'

$ curl -X PATCH "http://localhost:8088/api/tasks/586e886d7106b038d820a550" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d 'isDone=true'

$ curl -X PUT "http://localhost:8088/api/tasks/586e886d7106b038d820a550" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d 'isDone=false'


$ curl -X DELETE -i "http://localhost:8088/api/tasks"

$ curl -X DELETE -i "http://localhost:8088/api/tasks/586e886d7106b038d820a550"


### PostgreSQL:

curl --data "text=test&complete=false" http://127.0.0.1:3000/api/v1/todos