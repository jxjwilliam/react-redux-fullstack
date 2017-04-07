import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';


import todos from './todos'
import {userList, userDetail} from './userReducer'

// state = {todos:[], userList:[], userDetail: {}, routing: {}
// routing: routerReducer
const todoApp = combineReducers({
  todos,
  userList,
  userDetail
})

export default todoApp
