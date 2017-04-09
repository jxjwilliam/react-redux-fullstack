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

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos

// not a reducer, a selector
//{type: "@@redux/INIT"}
export const getVisibleTodos = (state, filter) => {
  console.log('getVisibleTodos: ', filter);
  switch (filter) {
    case 'all':
      return state
    case 'completed':
      return state.filter(t => t.completed)
    case 'active':
      return state.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

//export const getVisibleTodos = (state, filter) =>
//    fromTodos.getVisibleTodos(state.todos, filter);