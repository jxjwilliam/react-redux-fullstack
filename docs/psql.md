### Install Server

[How to Install PostgreSQL for Mac OS X](https://launchschool.com/blog/how-to-install-postgresql-on-a-mac)

/Library/PostgreSQL/9.6
/Library/PostgreSQL/9.6/data
pass: Benjamin001
port 5433
Locale: en_US.UTF-8

```bash
$ brew install postgres
$ brew tap homebrew/services
$ brew services start postgresql
$ brew services stop postgresql
$ brew services restart postgresql
```

### Install Client

```bash
$ npm i -S pg
```


### Schema

Function	URL	Action
CREATE	/api/v1/todos	Create a single todo
READ	/api/v1/todos	Get all todos
UPDATE	/api/v1/todos/:todo_id	Update a single todo
DELETE	/api/v1/todos/:todo_id	Delete a single todo
