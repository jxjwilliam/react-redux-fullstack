import { combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux';

import todos, * as fromTodos from './todos'

// state = {todos:[], userList:[], userDetail: {}, routing: {}
// routing: routerReducer
const todoApp = combineReducers({
  todos
})

export default todoApp

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);