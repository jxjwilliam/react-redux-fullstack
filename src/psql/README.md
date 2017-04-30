## PostgreSQL + redux/todoMVC

###1. server-side: make PostgreSQL work

- install PostgreSQL 9.6
- pgAdmin4: login user: psql/psql
- pgAdmin4: create DB: react-redux
- bin/psql-create-table.js: items 
- bin/psql-insert-table.js: intsert table `items`
- node server:
  server/server-psql.js: webserver just for psql.
  server/postgr_db.js: pool
  server/pg/: CRUD todos 
- test: localhost:8083/api/pg/todos/ works

###2. Front-end:

- add tab `pg` for postgreSQL, and make sure it works.
- copy from redux/expamples/todomvc: http://redux.js.org/docs/introduction/Examples.html
- add modules:
  "classnames"
  "todomvc-app-css"
- work src/psql/todomvc to make it work with PostgreSQL
