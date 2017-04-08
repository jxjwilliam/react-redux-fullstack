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

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

// when need to use superagent, should applyMiddleware(thunk) first
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ? action(store.dispatch) : next(action);


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
