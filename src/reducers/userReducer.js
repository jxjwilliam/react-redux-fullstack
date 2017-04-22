const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload;
    case 'UPDATE_USER':
      return [...state, action.payload]
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      return action.payload;
    case 'SORT_USERS':
      //e.g.: _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
      return _.orderBy(state, [action.sortBy], [action.seq]);
    case 'DELETE_USER':
      return state.filter(s => s._id !== action.payload);
  }
  return state;
}

export default userListReducer;