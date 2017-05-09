//for Login: {account,pass}

const initialLogin = {
  loggedIn: false,
  shouldRedirect: false,
  errorMessage: null
}

const loginReducer = (state = initialLogin, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      //should return a token?
      return Object.assign({}, action.payload, {loggedIn: true, shouldRedirect: true});
    case 'LOGOUT_SUCCESS':
      return Object.assign({}, initialLogin);
    case 'LOGIN_FAILED':
    case 'LOGOUT_FAILED':
      return Object.assign({}, state, initialLogin, {errorMessage: action.error});
  }
  return state;
}

export default loginReducer;