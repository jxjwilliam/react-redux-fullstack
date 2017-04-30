import { combineReducers } from 'redux'
import todomvcReducer from './todomvc'

//TODO: later extend
const psqlReducer = combineReducers({
  todomvc: todomvcReducer
})

export default todomvcReducer
