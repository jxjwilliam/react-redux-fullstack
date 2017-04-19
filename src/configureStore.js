import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './reducers'

// version 1: with npm thunk, promise, logger.
const configureStore = () => {
  const middlewares = [thunk, promise];

  //Logger must be last middleware in chain, otherwise it will log thunk and promise, not actual actions (#20).
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), devToolsEnhancer())
  )
}

export default configureStore;
