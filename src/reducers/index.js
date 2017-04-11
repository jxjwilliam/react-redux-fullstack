import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux';

import todos, * as fromTodos from './todosReducer'

import {userList, userDetail} from './userReducer'
import {CounterReducer} from './counterReducer'


// state = {todos:[], userList:[], userDetail: {}, routing: {}
// routing: routerReducer
const rootReducer = combineReducers({
  todos,
  userList,
  userDetail,
  counter: CounterReducer,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
