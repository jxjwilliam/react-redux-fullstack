## Building React Applications with Idiomatic Redux

This is the walking steps of Dan Abramov's Redux vedio tutorials.

`Part 2: Building React Applications with Idiomatic Redux (27 free videos)`
[https://egghead.io/courses/building-react-applications-with-idiomatic-redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

There are total 10 branches (step-1...step-10) to go through the video episodes.


## Quick Start

```bash
cd `this-folder`
npm install
ncu
ncu -u
npm update
webpack-dev-server
```

Then:

```bash
open http://localhost:8080
```

## Branches

### 1. step-1

grab the source code from: https://github.com/reactjs/redux/tree/master/examples/todos
config package.json, add webpack.config.js, do some updating, use `webpack-dev-server` to make the source working properly.

### 2. step-2

initial state in HTML 5 Local-storage.

```javascript
  store.subscribe(() => {
    saveState({'todos': store.getState()})
})
```

add `node-uuid.v4`, `lodash/Throttle` for subscribe(saveState) 

### 3. step-3

- seperate js to Root, configureStore
- use react-router `Link` for hashHistory URL.
- add removeState to reset localStorage's state to prove it work.

### 4. step-4

- debug: devtool: 'inline-source-map',
- FilterLink not work correct. (step-3 either)
-

### 5. step-5

### 6. step-6

- favicon
- mongod && mongoose
- routes: /api/todos, models
- server: 
    "webpack-dev-middleware",
    "webpack-hot-middleware"

try to integrate williamDemo (Redux Universal) and react-redux-universal-hot-example into.

```bash
mongod &
npm run start1 
open http://localhost:8081
open http://localhost:/8081/api/routes/
```

re-cast `getVisibleTodos` to `reducers` as a `selector`, so `mapStateToProps` use `state` instead of `state.todos`.

### 7. step-7

`users` tab works. It uses mongo + redux global state + react component.
- redux-thunk
- componentDidMount to call store.dispatch('FETCH_USER')
- in userAction.js, superagent.get('/api/users') to get the user-list
- in userReducer.js, state is updated with the user-list
- in userApp.js, `mapStateToProps` update state.userList
- in userApp.js, render is trigger coz state.userList is changed.

`http://localhost:8081/users`

- userList clicks and userDetail work.
- karma-test works.
- re-config the structure, bring (mv) stuff from previous `williamDemo` repository.
  I prefer to make this repository as a template for `react-redux-fullstack`, so step by step to integrate some good stuff.
- [Redux-form](https://github.com/erikras/redux-form)
- adjust the structure: replace db (todo -> redux), add new schemas. mv all todos name-convenention to redux-...

### 8. step-8

### 9. step-9

### 10. step-10



## Unit Test

use karma + mocha + chai + sinon + webpack to make test (folder) works, need a lot of npm-modules.

```bash
ncu
ncu -u
npm update
karma start karma.conf.js
```


## Issues:

- 1. react-router version: V4 not work. Video use V2.4, I use ^3.0, then `npm update`
react-router                ^3.0.0  →  ^4.0.0 
- 2. Link seems not work, `All` is un-clickable.


## Things to TODO
- http-proxy
- socket
