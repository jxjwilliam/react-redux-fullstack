import { combineReducers } from 'redux'

const reducer = (state = {}, action) => {
  switch (action.type) {
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