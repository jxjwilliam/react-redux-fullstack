import { v4 } from 'node-uuid';
import * as api from '../helpers/api'

{ /* object expression */}
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

//export const setVisibilityFilter = (filter) => ({
//  type: 'SET_VISIBILITY_FILTER',
//  filter
//})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
})

export const fetchTodos = (filter) => {
  api.fetchTodos(filter).then(todos => {
    console.log(filter, todos);
    receiveTodos(filter, todos);
  });
}
