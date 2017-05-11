import fetch from 'isomorphic-fetch'
import superagent from 'superagent'
import Rx from 'rxjs/Rx'
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

let defer = new Promise((resolve, reject) => setTimeout(resolve));
export const nopromiseAction = () => dispatch => {
  return defer.then((data) => dispatch({type: 'THUNK', payload: initial.company}))
}

export const fetchAction = () => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then(res => res.json())
    .then(data => dispatch({type: 'FETCH', payload: data}))
}

// 3. action.meta && action.meta.remote: socket
// no need `dispatch`, use socket.emit/on
export const socketAction = () => {
  var action = {type: 'SOCKET'}
  action.socket = true;
  action.meta = {
    channel: 'news'
  }
  action.payload = initial.finance;
  return action;
}

// 4. action.type==='AUTH'
// no need `dispatch`, use redirect or transitionTo.
export const authAction = () => {
  return {type: 'AUTH', payload: initial.name}
}

// 5. promise: action.then==='function'
// redux-thunk will dispatch
export const promiseAction = () => {
  const payload = {
    'redux-promise': 'returns a promise as the payload when an action is dispatched, and then the ReduxPromise middleware works to resolve that promise and pass the result to the reducer.',
    'redux-thunk': 'on the other hand, forces the action creator to hold off on actually dispatching the action object to the reducers until dispatch is called.',
    ref: 'http://stackoverflow.com/questions/36577510/what-is-the-difference-between-redux-thunk-and-redux-promise'
  }
  return new Promise((resolve, reject) => {
    resolve({type: 'PROMISE', payload: payload})
  })
}

export const payloadpromiseAction = () => {
  return {
    type: 'PROMISE',
    payload: new Promise((resolve, reject) => setTimeout(() => {
      resolve(initial.name)
    }, 500))
  }
}

// 6. no need to dispatch, do other stuff instead of `dispatch`
export const customAction = () => {
  return {
    type: 'ACTION',
    custom: 'what are you going to do?',
    payload: initial.random
  }
}

export const rxjsAction = () => {
  return {
    type: 'INTERVAL',
    //observable: Rx.Observable.interval(1000).take(5),
    observable: Rx.Observable.fromPromise(fetch('https://api.github.com/search/users?q=jxjwilliam'))
  };
}
