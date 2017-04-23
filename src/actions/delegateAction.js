import superagent from 'superagent'

//1. Action creators
export const addReposAction = jsonResult => ({
  type: "ADD_TWEETS",
  repos: jsonResult
});

export const userChangedAction = value => ({
  type: "USER_CHANGED",
  value: value
});

export const loadingChangedAction = isLoading =>({
  type: "IS_LOADING",
  isLoading: isLoading
});

/**
 * 1. dispatch({type: FETCH_RESOURCES});
 * 2. http-promise
 * 3. then: dispatch({type: FETCH_RESOURCES_SUCCESS, data: res.body}
 * 4. catch:  dispatch({type: FETCH_RESOURCES_FAIL});
 *        can dispatch more: the generic "global errors" action
 * @param user
 * @returns {Function}
 */
export const loadReposAction = (user) => {
  return (dispatch) => {
    //var url = 'https://api.github.com/users/' + user + '/repos';
    var url = '/api/delegate/github/' + user;
    dispatch(loadingChangedAction(true));

    superagent
      .get(url)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if (err) throw err;
        dispatch(loadingChangedAction(false));
        dispatch(addReposAction(result.body));
      });
  }
}