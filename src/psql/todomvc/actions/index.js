import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'


export const addTodo = text => dispatch => {
  return fetch('/api/pg/todos', {
    method: 'post',
    body: JSON.stringify({text: text}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({type: types.ADD_TODO, text})
    });
}

export const deleteTodo = id => dispatch => {
  return fetch('/api/pg/todos/' + id, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({type: types.DELETE_TODO, id})
    });
}

export const editTodo = (id, text) => ({type: types.EDIT_TODO, id, text})
export const completeTodo = id => ({type: types.COMPLETE_TODO, id})
export const completeAll = () => ({type: types.COMPLETE_ALL})
export const clearCompleted = () => ({type: types.CLEAR_COMPLETED})
