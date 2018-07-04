## Quick start

```bash
$ cd app1
$ npm start #3000
$ cd ./backend
$ npm start #proxy: 8080
```
then goto http://localhost:3000/games


### Steps:

1. use `create-react-app`
1. use `mongodb` instead of `mongoose`
1. no use data-schema
1. `crudwithredux:games` initial value:
```bash
$ mongo
> show dbs
 > use crudwithredux
 switched to db crudwithredux
 > db.games.insert({title: 'Agricola'})
 WriteResult({ "nInserted" : 1 })
 > exit
```
1. `app1` folder need `package.json`
1. `backend` folder need `package.json` and `.babelrc`



### Reference:

- https://www.youtube.com/watch?v=Z5BAolQCJDI
- https://github.com/Remchi/crud-with-redux
