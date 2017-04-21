import superagent from 'superagent'

// TODO: res.text or res.body???
export const updateUser = (user) => (dispatch, getState) => {
  debugger;
  superagent
    .put('/api/users')
    .set('Accept', 'application/json')
    .send(user)
    .end((err, res) => {
      if (err) throw err;
      console.log(res.body)
    });
};

export const getUsers = () => {
  return (dispatch, getState) => {
    const users = getState().userList;
    if (users.length === 0) {
      superagent
        .get('/api/users')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) throw err;
          /**
           * res.body is [object], res.string is 'string'
           */
          const users = res.body.slice(0, 10);
          //users.forEach( u => {
          //  u.dob = u.dob ? u.dob.split(/[A-Z]/)[0] : 'N/A'
          //});
          dispatch({
            type: 'FETCH_USERS',
            payload: users
          });
        });
    }
  }
};

export const selectUser = (user) => ({
  type: 'SELECT_USER',
  payload: user
});

