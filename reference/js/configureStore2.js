import { createStore, compose, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import {Subject} from 'rx';

// version 3: currying:
const createStoreWithMiddleware = (middlewares) => (createStore) => (reducers) => {
  var store = createStore(
    reducers,
    applyMiddleware(...middlewares)
  )

  //https://github.com/jas-chen/thisless-react/blob/master/examples/counter/store/configureStore.js
  const state$ = new Subject();
  store.subscribe(() => state$.onNext(store.getState()));

  store.state$ = state$.startWith(store.getState());
  return store;
};

const configureStore = () => {
  return createStoreWithMiddleware(
    thunk,
    promise,
    createLogger()
  )(createStore)(rootReducer);
}

export default configureStore;
