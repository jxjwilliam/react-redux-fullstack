import { createStore, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

// version 3: currying:
const createStoreWithMiddleware = (middlewares) => (createStore) => (reducers) => {
  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  )
};

const configureStore = () => {
  return createStoreWithMiddleware(
    thunk,
    promise,
    createLogger()
  )(createStore)(rootReducer);
}

export default configureStore;
