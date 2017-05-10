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
    //console.info('[in middleware promise]:', action, next)
    return action.then(next);
  }
  return next(action);
}

const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    //console.info('[in middleware thunk]:', action, next)
    action(store.dispatch, store.getState)
  }
  else
    next(action);
}
/**
 * william add middleware to intercept for socket
 * http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#the-architecture
 * Concretely, we should only send out actions that have a {meta: {remote: true}} property attached
 */
const remoteActionMiddleware = store => next => action => {
  if (action.meta && action.meta.remote) {
    //console.log('[in middleware socket]:', action, next);
    //socket.emit('action', action)
  }
  return next(action)
}

function authMiddleware({getState, dispatch}) {
  return (next) => (action) => {
    if (typeof action === 'object' && action.hasOwnProperty('type')) {

      if (action.type === 'AUTH') {
        //console.log('[in middleware auth]:', action, next);
        next(action);

        const state = getState();
        let path = '/dashboard';

        if (typeof state['router'] === 'object' && typeof state['router']['route'] === 'object' && null !== state['router']['route']) {
          if (state.router.route.name === 'login' && typeof state.router.route.query['to'] === 'string') {
            path = state.router.route.query.to;
          }
        }
        //return next(actions.transitionTo(path));
      }
    }

    return next(action);
  }
}

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
  let middlewares = [thunk, promise, logger, remoteActionMiddleware, authMiddleware]; //promise;

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  //console.info(JSON.stringify(store.getState()));
  return store;

};

export default configureStore;