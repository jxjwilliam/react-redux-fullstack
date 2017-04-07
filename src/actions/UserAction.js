import superagent from 'superagent'

export const getUsers = () => {
  return (dispatch, getState) => {
    const users = getState().userList;
    if (users.length === 0) {
      superagent
        .get('/api/todos')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) throw err;
          dispatch({
            type: 'USER_FETCH',
            payload: res.text
          });
        });
    }
  }
};

export const selectUser = (user) => ({
  type: 'USER_SELECTED',
  payload: user
});

