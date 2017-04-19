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