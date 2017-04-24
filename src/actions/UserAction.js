import superagent from 'superagent'
import Rx from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import {debounceTime} from 'rxjs/operator/debounceTime';

export const getUsers = (page = 1) => {
    return (dispatch, getState) => {
        const users = getState().userList;
        if (users.length === 0) {
        }
        superagent
            .get(`/api/users/page/${page}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err;
                // res.body is [object], res.string is 'string'
                const users = res.body;
                //users.forEach( u => {
                //  u.dob = u.dob ? u.dob.split(/[A-Z]/)[0] : 'N/A'
                //});
                dispatch({
                    type: 'FETCH_USERS',
                    payload: users
                });
            });
    }
};

export const prevAction = (page) => (dispatch) => {
    superagent.get(`/api/users/page/${page}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) throw err;
            dispatch({type: 'PREV_USERS', payload: res.body});
        });
}


export const nextAction = page => dispatch => {
    superagent.get(`/api/users/page/${page}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
            if (err) throw err;
            dispatch({type: 'NEXT_USERS', payload: res.body});
        });
}


export const updateUser = (user) => (dispatch) => {
    superagent
        .put('/api/users')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
            if (err) throw err;
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
                type: 'ADD_USER',
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

export const sortAction = (sortBy, seq) => ({type: 'SORT_USERS', sortBy: sortBy, seq: seq});

export const searchUser = username => ({type: 'SEARCH_USERS', payload: username});

const searchUserFulfilled = payload => {
    //console.warn('how many times?', payload.length); //25, 3...
    if (!payload || payload.length === 0) {
        console.log('no matching, try again');
        return {type: 'SEARCH_USERS_NULL'};
    }
    return {type: 'SEARCH_USERS_FULFILLED', payload};
}

export const fetchUserEpic = action$ =>
    action$.ofType('SEARCH_USERS')
        .debounceTime(250)
        .mergeMap(action =>
            ajax.getJSON(`/api/users/search/${action.payload}`)
                .map(response => searchUserFulfilled(response))
    );
