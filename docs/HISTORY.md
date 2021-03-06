# Update History

This is the walking steps of Dan Abramov's Redux vedio tutorials.

`Part 2: Building React Applications with Idiomatic Redux (27 free videos)`
[https://egghead.io/courses/building-react-applications-with-idiomatic-redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux)

There are total 10 branches (step-1...step-9, main) to go through the video episodes.

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

work at course-15.

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

- make counter <-> mongo <-> state works. localhost:8081/counter localhost:8081/users work.
- counter CRUD works. superagent + findOneAndUpdate
    localhost:8081/counter works as a full-stack behavior. mongodb keeps sync with counter-clicking.

### 8. step-8

checkout -b from step-6, at course-16. 

- install redux-thunk, in configureStore.js use it.
 The inner function receives the store methods dispatch and getState as parameters.
     
- merge step-8 and step-7. currently the tabs: 
 (1) counter, users, contact works. 
 (2) app, todos not work. 
 (3) about, phone not implement yet.
     
### 9. step-9

- https://jsonplaceholder.typicode.com/
  Fake Online REST API for Testing and Prototyping
- request
- Cross Domain issues:
  Error: Request has been terminated
  Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.
- http://localhost:8081/api/delegate/github/williamjxj
- http://localhost:8082/api/delegate/github/williamjxj

- to make promise testable: add `chai-as-promised`, and in karma.conf.js:
files: [
  'node_modules/babel-polyfill/dist/polyfill.js',
  ....
]

- use `react-route-dom` instead of `react-route`
- use react v15.4.0 instead of v15.5.3 to avoid warning
- change form `onSubmit={this.props.handleSubmit}` to `onSubmit={(e)=>this.props.handleSubmit(e)}` to fix fetching github repository no-return issue.
- use '/api/delegate/...' in server-side (`request.js`) to delegate accessing security website work.


### 10. Main

- component must be first-letter capitalize: `editModal` not work, `EditModal` work.

- usersList: CRUD works (redux-form + react-bootstrap-modal)

- redux-form:
  -- use `initialValues` to fill up the edit-form.
  -- `Field` should have `onChange`, otherwise the input can't edit, even nothing to do:
  ```javascript
    onChange={}
  ```
  -- rewrite add/edit userReucer, use map, concat.
  -- pass user._id as hidden: <input name="_id" type="hidden" />
    
- the tabs `todoApp`, `users`, `counter` all interact with MongoDB data.

- `rxjs@5.3.0`, `redux-observable` will be used in input-search
- `isomorphic-fetch` to use fetch alongside with superagent, for caching and performance reason.

```javascript
connect = Object.assign({}, ownProps, stateProps, dispatchProps);
```

- in `Users` tab, add `search user` input box, to search user 'fistName' or 'lastName'
- add `redux-observable` for `search` criteria
    so this works: react + redux + rxjs (redux-observable)
- add `debounceTime` for fetchUserEpic
- add more search logic: put onChange event in search component instead of its parent; update onChange when search-criteria is empty 
- update server/routes/users.js for `/api/users/search?search_criteria`:
     ```javascript
        '$or': [ {firstName: regexp}, {lastName: regexp} ]
     ```
- move `import orderBy from 'lodash/orderBy'` to reducer file which it is called.  

- add optional parameter for URL `react-router-dom-v4`: <Route path="/to/page/:pathParam?" component={MyPage} />
- add sub-menu (sub-navigator) in `Topics`
- add options to input counter from URL-params, like: http://localhost:8081/counter/18
   
   
- add .scss, .gif `style-loader`
- add loginApp logic
- add `Redirect`
- add actionCreator and reducers for `login` and `logout`
- add server-side routes `auth` for login fetch.
- user `token` property for future extension.

- add `react-bootstrap`, `react-router-bootstrap` for responsive menu.

- add toggle login/logout works: add `state.token` in Root.js, just like in LoginApp.js, so these 2 parts are sync when login/logout.
react-redux-universal-hot-example:
```javascript
export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
```
 
## Unit Test

- use karma + mocha + chai + sinon + webpack to make test (folder) works, need a lot of npm-modules.
- in package.json `scripts`:
  "immutable": "mocha --compilers js:babel-core/register --require ./test/helper.js  --recursive"
  does the same thing as karma.conf.js

```bash
ncu
ncu -u
npm update
karma start karma.conf.js
```

- `chai-as-promised` to test promise: either `return promise` or `done()` will work: test/promise.spec.js.
- `immutable` and `chai-immutable installed and test.
-  `react-bootstrap` throw warning (propTypes) with React ^15.4, ^15.5.


## Issues:

- react-router version: V4 not work. Video use V2.4, I use ^3.0, then `npm update`
- use react-router-dom instead. remove react-router, and react-router-bootstrap.


- Warning: Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.
after `npm i -S prop-types`, the warning is disappear. so fix.

- RESTFul API call Error: Request has been terminated
  Possible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.

o:  /api/users
x:  /api/delegate/github/williamjxj
x:  http://localhost:8081/api/delegate/jsonplaceholder

- ERROR in ./~/css-loader!./~/sass-loader/lib/loader.js!./src/style.scss: Module build failed: Error: Cannot find module 'node-sass'
npm i -D node-sass (npm rebuild node-sass)
It works. What's the relationship btw `sass` and `scss`?

## Reference

- react-router version: V4 not work. Video use V2.4, I use ^3.0, then `npm update`
react-router                ^3.0.0  →  ^4.0.0

Use `react-router-dom` instead:
[https://reacttraining.com/react-router](https://reacttraining.com/react-router/web/api/Route/Route-render-methods)
- use `Link, NavLink` from `react-router-dom`.
- https://github.com/WilliamJiang/node-xml-xslt
- docs/flow.md

- react-boilerplate:

```bash
  $ npm install -g create-react-app
  $ create-react-app demo-app
  $ cd demo-app
```

## Things to TODO

- http-proxy
- socket
- node-debug, node-inspector
- normalizr (reference/steps/schema.js)
