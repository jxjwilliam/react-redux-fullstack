import superagent from 'superagent'
import { v4 } from 'node-uuid';

// use superagent to access server RESTFul API:
const API = '/api/todos';
export const fetchTodos = () => (dispatch, getState) => {
  try {
    //todos: { todos, visibilityFilter }
    const todos = getState().todos.todos;
    if (todos.length === 0) {
      superagent
        .get(API)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) throw err;
          dispatch({
            type: 'FETCH_TODOS',
            payload: res.body
          });
        });
    }
  }
  catch (e) {
    dispatch({
      type: 'FETCH_TODOS',
      payload: []
    });
  }
}

let nextTodoId = v4();
export const addTodo = (text) => {
  console.log(text, nextTodoId);
  return {
    type: 'ADD_TODO',
    id: nextTodoId,
    text
  }
}

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

//exports: addTodo, fetchTodos, toggleTodo