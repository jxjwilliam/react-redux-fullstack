const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.payload;
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      return action.payload;
    case 'SORT_USERS':
      //_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
      return _.orderBy(state, [action.sortBy], [action.seq]);
    case 'SELECT_USER':
      return action.payload;
    case 'ADD_USER':
      const user = addPerson();
      return [...state, user];
    case 'DELETE_USER':
      return state.filter(s => s.id !== action.payload);
  }
  return state;
}

export default userListReducer;