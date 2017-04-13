export function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}


export default (initialState) => {
  const store = compose(
    applyMiddleware(
      thunk,
      createLogger()
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(reducers, initialState);

  return store;
};