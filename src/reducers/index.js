import { combineReducers } from 'redux'

import todosReducer from './todosReducer'
import userListReducer from './userReducer'
import CounterReducer from './counterReducer'
import githubReducer from './delegateReducer'
import { reducer as formReducer } from 'redux-form'

//optional, for psql:
import todomvcReducer from '../psql/reducers'


//for Login: {username,password}
import { v4 } from 'node-uuid';
const initialLogin = {
  loggedIn: false,
  shouldRedirect: false,
  errorMessage: null
}
const loginReducer = (state = initialLogin, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      //should return a token?
      return Object.assign({}, action.payload, {loggedIn: true, shouldRedirect: true, tokenId: v4()});
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, initialLogin);
    case 'LOGIN_FAILED':
    case 'LOGOUT_FAILED':
      return Object.assign({}, state, initialLogin, {errorMessage: action.error});
  }
  return state;
}

/**
 * state = {todos:{all, active, completed:[], userList:[], userDetail: {}, routing: {}
 * state only return from `reducer`
 * when createStore, `reducer` are the 1st parameter, so `store` can get `state`
 */
const rootReducer = combineReducers({
  todos: todosReducer,
  userList: userListReducer,
  github: githubReducer,
  counter: CounterReducer,
  token: loginReducer,
  form: formReducer,
  todomvc: todomvcReducer
})

export default rootReducer
