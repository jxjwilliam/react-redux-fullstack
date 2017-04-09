import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';

import todos, * as fromTodos from './todos'

import {userList, userDetail} from './userReducer'

// state = {todos:[], userList:[], userDetail: {}, routing: {}
// routing: routerReducer
const todoApp = combineReducers({
  todos,
  userList,
  userDetail,
  router: routerReducer
})

export default todoApp

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);