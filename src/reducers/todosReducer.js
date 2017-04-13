import { combineReducers } from 'redux';

// merge 3: todo.js, todos.js, byId.js, createList.js, index.js

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
const idsByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos1 = combineReducers({
  byId,
  idsByFilter,
})

const todos = (state, action) => {
  return [{
    "id": "338d623b-7070-4548-8762-9314483d8c09",
    "text": "Aut non quia et est.",
    "completed": false
  }, {
    "id": "d0984ac8-1c77-4e8d-9f87-546c962469ec",
    "text": "Laudantium sunt quibusdam numquam ducimus necessitatibus.",
    "completed": true
  }, {
    "id": "63ca168d-f71d-4b62-9b2c-2328ce1f44e8",
    "text": "Id tempore beatae vitae possimus.",
    "completed": true
  }, {
    "id": "3e44b7c6-091d-4066-8204-ebaedf23b834",
    "text": "Id deserunt consequatur rem dolorem dolorem consequatur rerum veritatis laboriosam.",
    "completed": true
  }, {
    "id": "3f90275d-fefc-4d23-8fc7-4d048d46ff84",
    "text": "Repellat molestiae autem omnis soluta quasi corporis non et aperiam.",
    "completed": false
  }, {
    "id": "c2514008-d2c4-415a-93c7-9a0bc4c46147",
    "text": "Optio eveniet sed inventore distinctio eum facilis non excepturi aut.",
    "completed": false
  }];
}


export default todos




const getTodo = (state, id) => state[id];

const getIds = (state) => state;

// not a reducer, a selector
export const getVisibleTodos = (state, filter) => {
  const ids = getIds(state.todos.idsByFilter[filter]);
  //return ids.map(id => getTodo(state.todos.byId.id, id));
};

export const getIsFetching = (state, filter) => {
  let stateListByFilter = state.listByFilter[filter];
  return stateListByFilter.isFetching;
}

export const getErrorMessage = (state, filter) => {
  let stateListByFilter = state.listByFilter[filter];
  return stateListByFilter.errorMessage;
}


//~ total 4 exports:
// todos, {getVisibleTodos, getIsFetching, getErrorMessage}