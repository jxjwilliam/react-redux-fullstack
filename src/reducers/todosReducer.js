import { combineReducers } from 'redux';

// merge 3: todo.js, todos.js, index.js

// 1. todo reducer:
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

// 2. todos reducer
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS': // eslint-disable-line no-case-
      const nextState = {...state};
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response,
      }
    default:
      return state
  }
}

const createList = (filter) => {

  const ids = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ?
          action.response.map(todo => todo.id) :
          state;
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ?
          [...state, action.response.id] :
          state;
      default:
        return state;
    }
  }

  const isFetching = (filter) => (state = false, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  }

  const errorMessage = (state = null, action) => {
    if (filter !== action.filter) {
      return state;
    }
    switch (action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_REQUEST':
      case 'FETCH_TODOS_SUCCESS':
        return null;
      default:
        return state;
    }
  }

  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  })
}

// 3. todos index.js reducer
const todos = combineReducers({
  byId,
  createList,
})

export default todos


// not a reducer, a selector
export const getVisibleTodos = (state, filter) => {
  let stateListByFilter = state.listByFilter[filter];
  const ids = stateListByFilter.id;
  return ids.map(id => getTodo(state.byId.id));
};

export const getIsFetching = (state, filter) => {
  let stateListByFilter = state.listByFilter[filter];
  return stateListByFilter.isFetching;
}

export const getErrorMessage = (state, filter) => {
  let stateListByFilter = state.listByFilter[filter];
  return stateListByFilter.errorMessage;
}
