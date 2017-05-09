import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers'

// add rxjs, redux-observable for user-search
import { createEpicMiddleware } from 'redux-observable';
import { fetchUserEpic } from './actions/userAction'

/**
 * william add middleware to intercept for socket
 * http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#the-architecture
 * Concretely, we should only send out actions that have a {meta: {remote: true}} property attached
 */
const remoteActionMiddleware = store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('in middleware', store, next, action);
    debugger;
    socket.emit('action', action)
  }
  return next(action)
}

// version 1: with npm thunk, promise, logger.
const configureStore = () => {


  const epicMiddleware = createEpicMiddleware(fetchUserEpic);

  const middlewares = [thunk, promise, remoteActionMiddleware, epicMiddleware];

  //Logger must be last middleware in chain, otherwise it will log thunk and promise, not actual actions (#20).
  //if (process.env.NODE_ENV !== 'production') {
  //  middlewares.push(createLogger());
  //}

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), devToolsEnhancer())
  )
}

export default configureStore;
