import orderBy from 'lodash/orderBy'
import moment from 'moment'

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      //where is the best way to convrt Mongo Date-format ?
      action.payload.forEach(u => u.dob = u.dob ? moment(u.dob).format('lll') : 'N/A');
      return action.payload;
    case 'SORT_USERS':
      //e.g.: _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'UPDATE_USER':
      return state.map(s => s._id === action.payload._id ? action.payload : s)
    case 'ADD_USER':
      return [action.payload].concat(state)
    case 'DELETE_USER':
      return state.filter(s => s._id !== action.payload);
    case 'SEARCH_USERS_FULFILLED':
      return action.payload;
  }
  return state;
}

export default userListReducer;