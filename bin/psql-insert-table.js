#!/usr/local/bin/node

/**
 * const Curl = require('node-libcurl').Curl;
 * version issue:
 * Error: dlopen(/Users/user/WebstormProjects/React/todos1/node_modules/node-libcurl/lib/binding/node_libcurl.node, 1): Library not loaded: /Users/travis/lib/libcurl.4.dylib
 */
const getFakerData = require('./getFakerData');
const exec = require('child_process').exec;

//http://localhost:8083/api/pg/todos
const config = {
  "URL": "http://127.0.0.1:8083/api/pg/todos",
  "HEADER": "Content-Type: application/json",
  "METHOD": "POST"
}

var ary = getFakerData.getTodoData();

var params = ary.map(function (item) {
  var tmp = [];
  for (var i in item) {
    tmp.push(i + '=' + item[i]);
  }

  var todo_str = tmp.join('&');
  exec('curl --data "' + todo_str + '" http://127.0.0.1:8083/api/pg/todos', function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  })

})
console.log(params);
//curl --data "text=test&complete=false" http://127.0.0.1:3000/api/pg/todos

