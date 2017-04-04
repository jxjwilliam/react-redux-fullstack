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

### 4. step-4

### 5. step-5

### 6. step-6

### 7. step-7

### 8. step-8

### 9. step-9

### 10. step-10



## new npm modules

- redux-devtools