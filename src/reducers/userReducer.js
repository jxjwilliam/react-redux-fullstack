export const userList = (state = [], action) => {
  switch (action.type) {
    case 'USER_FETCH':
      return JSON.parse(action.payload);
      break;
  }
  return state;
}

export const userDetail = (state = {}, action) => {
  switch (action.type) {
    case 'USER_SELECT':
      return action.payload;
      break;
  }
  return state;
}