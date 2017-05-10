import { createStore, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducer'

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
    console.info('[in middleware promise]:', action)
    return action.then(next);
    //return Promise.resolve(action).then(store.dispatch);
  }
  return next(action);
}

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    console.info('[in middleware thunk]:', typeof action)
    return action(store.dispatch, store.getState)
  }
  else {
    next(action);
  }
}
/**
 * william add middleware to intercept for socket
 * http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#the-architecture
 */
const socket = store => next => action => {
  if (action.socket) {
    console.log('[in middleware socket]:', typeof action);
    //return socket.emit('action', action)
  }
  return next(action)
}

function auth({getState, dispatch}) {
  return (next) => (action) => {
    if (action.type === 'AUTH') {
      console.log('[in middleware auth]:', typeof action);
      next(action);

      const state = getState();
      let path = '/dashboard';
      //return next(actions.transitionTo(path));
    }
    return next(action);
  }
}

// william custom intercept
const custom = store => next => action => {
  if (action.custom) {
    console.log('[in middleware custom]:', typeof action)
    // this could change, return anything other than dispatch.
    // current use `dispatch` for test
    return next(action);
  }
  return next(action);
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  })
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    devToolsEnhancer()
  );
  let middlewares = [thunk, promise, socket, auth, custom];

  if (process.env.NODE_ENV === 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  //console.info(JSON.stringify(store.getState()));
  return store;

};

export default configureStore;