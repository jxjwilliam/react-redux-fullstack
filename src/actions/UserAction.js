import superagent from 'superagent'

// TODO: res.text or res.body???
export const getUsers = () => {
    return (dispatch, getState) => {
        const users = getState().userList;
        if (users.length === 0) {
            superagent
                .get('/api/users')
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
    type: 'USER_SELECT',
    payload: user
});

