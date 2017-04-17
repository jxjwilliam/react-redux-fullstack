import { createStore, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers'

/**
 * logger(store) => return store
 * logger(store)(next) => store.dispatch
 * logger(store)(next)(action) => dispatch(action) -> state.
 */
//My function returns a wrapped dispatch function, so I will use it to return value to override the store.dispatch method.
// store.dispatch = logger(store);
const logger = (store) => (next) => {
  if (!console.group) {
    return next;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c pre state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue; //action object
  }
}

/**
 * promise(store) => return store
 * promise(store)(next) => store.dispatch
 * promise(store)(next)(action) => dispatch(action) -> state.
 * @param store
 * @returns {Function}
 */
const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  })
}

// version 2: with manual logger, promise and thunk.
const configureStore = () => {

  const store = createStore(
    rootReducer,
    devToolsEnhancer()
  );
  let middlewares = [thunk, promise]; //promise;

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  //console.info(JSON.stringify(store.getState()));
  return store;

};

export default configureStore;