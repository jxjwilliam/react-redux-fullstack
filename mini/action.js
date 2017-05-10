import fetch from 'isomorphic-fetch'
import superagent from 'superagent'
var faker = require('faker/locale/en')

/** NOTICE:
 * - payload = {}
 */
const getValue = (obj) => {
  var o = {}
  for (var i in obj) {
    o[i] = obj[i]()
  }
  return o;
}
var initial = {
  address: getValue(faker.address),
  commerce: getValue(faker.commerce),
  company: getValue(faker.company),
  finance: getValue(faker.finance),
  name: getValue(faker.name),
  random: getValue(faker.random)
};

export const actionAction = () => {
  return {type: 'ACTION', payload: initial.address}
}

// 1. thunk: action==='function'
export const thunkAction = () => {
  return (dispatch) => dispatch({type: 'THUNK', payload: initial.commerce});
}

export const superagentAction = () => (dispatch) => {
  superagent
    .get('https://jsonplaceholder.typicode.com/users')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) throw err;
      dispatch({type: 'SUPERAGENT', payload: res.body})
    })
}

// 2. promise: action.then==='function'
let defer = new Promise((resolve, reject) => setTimeout(resolve));

export const promiseAction = () => {
  return (dispatch) => {
    defer.then((data) => dispatch({type: 'PROMISE', payload: initial.company}))
  }
}

export const fetchAction = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then(res => res.json())
    .then(data => dispatch({type: 'FETCH', payload: data}))
}


export const socketAction = () => {
  var action = {type: 'SOCKET', meta: {}}
  action.meta.remote = true;
  action.payload = initial.finance;
  return action;
}

export const authAction = () => {
  return {type: 'AUTH', payload: initial.name}
}



