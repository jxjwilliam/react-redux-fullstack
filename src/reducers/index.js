import { combineReducers } from 'redux'

import todosReducer from './todosReducer'
import userListReducer from './userReducer'
import CounterReducer from './counterReducer'
import githubReducer from './delegateReducer'
import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducer'
//optional, for psql:
import todomvcReducer from '../psql/reducers'

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
