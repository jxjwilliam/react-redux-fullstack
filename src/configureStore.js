import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import reducers from './reducers'
import { loadState, saveState } from './helpers/localStorage'
import throttle from 'lodash/throttle';

/*
 * if (window.devToolsExtension)
 * window.devToolsExtension.updateStore(store)
 */
const configureStore = () => {

  const persistedState = loadState();

  //compose(applyMiddleware(thunk), devToolsEnhancer())
  const store = createStore(
    reducers,
    persistedState,
    compose(applyMiddleware(thunk), devToolsEnhancer())
  );

  store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos})
  }), 1000);

  /**
   * store.getState():
   * {"todos":[{"id":0,"text":"hi","completed":false},{"id":1,"text":"ho","completed":true}],"visibilityFilter":"SHOW_ALL"}
   * {"todos":[],"visibilityFilter":"SHOW_ALL"}
   */

  return store;
};

export default configureStore;
