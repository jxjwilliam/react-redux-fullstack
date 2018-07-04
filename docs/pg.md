### Install Server

[How to Install PostgreSQL for Mac OS X](https://launchschool.com/blog/how-to-install-postgresql-on-a-mac)

/Library/PostgreSQL/9.6
/Library/PostgreSQL/9.6/data
pass: Benjamin001
port 5432
Locale: en_US.UTF-8

```bash
$ brew install postgres
$ brew tap homebrew/services
$ brew services start postgresql
$ brew services stop postgresql
$ brew services restart postgresql
```

uninstall old 9.4 version
```bash
$ sudo /Library/PostgreSQL/9.4/uninstall-postgresql.app/Contents/MacOS/installbuilder.sh
$ sudo rm -rf /Library/PostgreSQL/9.4
```

### Install Client

```bash
$ npm i -S pg
```

### 1. create login user 
```sql
﻿CREATE USER psql WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';

GRANT postgres TO psql;
COMMENT ON ROLE psql IS 'william jiang created `psql` user, password should be `psql` too.';
```

### 2. create database
```sql
﻿CREATE DATABASE react_redux
    WITH 
    OWNER = psql
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE react_redux
    IS 'william create DB `react_redux` under the owner `psql`';
```

### 3. create `todo` table
```sql
CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)')

```

### RESTFul APIs:

  Function	URL	                            Action
  --------  ----------------------  ----------------------
  CREATE	  /api/v1/todos	          Create a single todo
  READ	    /api/v1/todos	          Get all todos
  UPDATE	  /api/v1/todos/:todo_id	Update a single todo
  DELETE	  /api/v1/todos/:todo_id	Delete a single todo


- CRD: work.

### improvement

- items -> id -> integer

```sql
CREATE SEQUENCE item_id_seq;
ALTER TABLE items ALTER id SET DEFAULT NEXTVAL('item_id_seq');

﻿ALTER TABLE items ADD CONSTRAINT item_id_seq UNIQUE(id)

SELECT setval('item_id_seq', (SELECT MAX(id) FROM items)+1);

```

- duplicated sequenced-index
- primary key / max-id


pgadmin
--------
https://www.postgresql.org/ftp/pgadmin/pgadmin4/v3.1/macos/


## PostgreSQL + redux/todoMVC

###1. server-side: make PostgreSQL work

- install PostgreSQL 9.6
- pgAdmin4: login user: psql/psql
- pgAdmin4: create DB: react-redux
- bin/psql-create-table.js: items 
- bin/psql-insert-table.js: insert table `items`
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
