//http://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux/34403521#34403521

//1. reducer to create a state.errors shared by different components
function errors(state = [], action) {
  switch (action.type) {
    case 'ADD_ERROR':
      return state.concat([action.error]);
    case 'REMOVE_ERROR':
      return state.filter((error, i) => i !== action.index);
    default:
      return state;
  }
}

//2. in container:
function App({errors}) {
  return (
    <div>
      {errors &&
      <UserErrors errors={errors}/>
      }
      <AppToolbar />
      <Clients />
    </div>
  )
}
// Hook up App to be a container (react-redux)
export default connect(
    state => ({
    errors: state.errors,
  })
)(App);

//3. and a actioncreator:
export function fetchSomeResources() {
  return dispatch => {
    dispatch({type: FETCH_RESOURCES});

    someHttpClient.get('/resources')
      .then(res => {
        dispatch({type: FETCH_RESOURCES_SUCCESS, data: res.body});
      })
      .catch(err => {
        // Dispatch specific "some resources failed" if needed...
        dispatch({type: FETCH_RESOURCES_FAIL});

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        dispatch({type: ADD_ERROR, error: err});
      });
  };
}