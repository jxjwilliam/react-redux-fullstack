export function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action)
}

// when need to use superagent, should applyMiddleware(thunk) first
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

const transition = store => next => action => {
  if(!action.redirect) return next(action);
  history.replaceState(null, action.redirect);
}

//this.props.onOptionsChange(newOptions).then(() => {...}
const thenMiddleware = store => next => action => {
  return new Promise((resolve, reject) => {
    try {
      resolve(next(action));
    }
    catch(e) {
      reject(e);
    }
  })
}

//////////////////////////////////

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

const logger = (store) => (next) => (action) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', state.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = next(action)
    console.log('%c next state', 'color: green', state.getState())
    console.groupEnd(action.type);
    return returnValue;
  }
}


const wrapDispatchWithMiddlewares = (store, middlewares) => {

  // use a shadow copy - single immutable
  middlewares.slice().reverse().forEach(middleware =>
      store.dispatch = middleware(store)(store.dispatch)
  )
}


// allReducers, promise, logger are global scope.
const configureStore = () => {

  const store = createStore(allReducers);
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(middlewares);

  return store;
}

//
const configureStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
}
