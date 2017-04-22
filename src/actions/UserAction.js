import superagent from 'superagent'

// TODO: res.text or res.body???
export const updateUser = (user) => (dispatch, getState) => {
  superagent
    .put('/api/users')
    .set('Accept', 'application/json')
    .send(user)
    .end((err, res) => {
      if (err) throw err;
      console.log(res.body)
      dispatch({
        type: 'UPDATE_USER',
        payload: res.body
      });
    });
};

export const saveUser = (user) => (dispatch, getState) => {
  superagent
    .post('/api/users')
    .set('Accept', 'application/json')
    .send(user)
    .end((err, res) => {
      if (err) throw err;
      console.log(res.body)
      dispatch({
        type: 'UPDATE_USER',
        payload: res.body
      });
    });
}

export const deleteUser = (user) => (dispatch, getState) => {
  superagent
    .delete('/api/users')
    .set('Accept', 'application/json')
    .send(user)
    .end((err, res) => {
      if (err) throw err;
      console.log(user)
      dispatch({
        type: 'DELETE_USER',
        payload: user._id
      });
    });
}

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

export const prevAction = (userList) => ({type: 'PREV_USERS', payload: userList});

export const nextAction = (userList) => ({type: 'NEXT_USERS', payload: userList});

export const sortAction = (sortBy, seq) => ({type: 'SORT_USERS', sortBy: sortBy, seq: seq});



