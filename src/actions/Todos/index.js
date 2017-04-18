import { getIsFetching } from '../../reducers/todosReducer'
import * as api from './api'

// 1. AddTodo component:
/**
 * action call promise, delegate, api,
 * @param text
 */
export const addTodo = (text) => (dispatch, getState) => {
  let todo = {
    text,
    completed: false
  };
  dispatch({
    type: 'ADD_TODO_SUCCESS',
    todo
  });
};


// 2. TodoList container:
export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve(); //TODO???
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response
      });
    },
      error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong...'
      })
    });
}


export const toggleTodo = (id) => (dispatch, getState) => {
  const thisTodo = getState.todos.find(todo => todo.id === id);
  debugger;
  dispatch({
    type: 'TOGGLE_TODO_SUCCESS',
    response: thisTodo
  });

}

//exports: addTodo, fetchTodos, toggleTodo