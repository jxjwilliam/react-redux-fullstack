import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
//import { routerReducer } from 'react-router-redux';

import todosReducer from './todosReducer'
import userListReducer from './userReducer'
import CounterReducer from './counterReducer'
import githubReducer from './delegateReducer'


// state = {todos:{all, active, completed:[], userList:[], userDetail: {}, routing: {}
// routing: routerReducer
const rootReducer = combineReducers({
  todos: todosReducer,
  userList: userListReducer,
  github: githubReducer,
  counter: CounterReducer,
  form: formReducer
})

export default rootReducer
