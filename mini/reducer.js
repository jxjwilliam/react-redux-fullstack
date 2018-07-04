import { combineReducers } from 'redux'

const ACTION_TYPE = 'INTERVAL';
const reducer = (state = {}, action) => {
  switch (action.type) {
    case `${ACTION_TYPE}`:
      return {};
    case `${ACTION_TYPE}_ON_NEXT`:
      return {data: {observable_on_next: action.data}}
    case `${ACTION_TYPE}_ON_ERROR`:
      return state;
    case `${ACTION_TYPE}_ON_COMPLETED`:
      return state;
    default:
      return {data: action.payload};
  }
  return state;
  //  case 'ACTION':
  //    return {data: action.payload};
  //  case 'THUNK':
  //    return {data: action.payload};
  //  case 'SUPERAGENT':
  //    return action.payload;
  //  case 'PROMISE':
  //    return {data: action.payload};
  //  case 'FETCH':
  //    return action.payload;
  //  case 'SOCKET':
  //    return {data: action.payload};
  //  case 'AUTH':
  //    return {data: action.payload};
  //}
}

const dashboardReducer = (state = {}, action) => state;

const rootReducer = combineReducers({
  test: reducer,
  dashboard: dashboardReducer
})

export default rootReducer