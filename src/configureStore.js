import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import reducers from './reducers'
import { loadState, saveState } from './helpers/localStorage'
import throttle from 'lodash/throttle';

// fix location undefined issue.
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

/*
 * if (window.devToolsExtension)
 * window.devToolsExtension.updateStore(store)
 */
const configureStore = () => {

  const persistedState = loadState();


  // Create an enhanced history that syncs navigation events with the store
  const history = createHistory()

  console.log('history', history);

  //const middleware = routerMiddleware(history);

  //compose(applyMiddleware(thunk), devToolsEnhancer())
  const store = createStore(
    reducers,
    persistedState,
    compose(applyMiddleware(thunk), devToolsEnhancer())
  );

  console.log('store', store);

  store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos})
  }), 1000);

  /**
   * store.getState():
   * {"todos":[{"id":0,"text":"hi","completed":false},{"id":1,"text":"ho","completed":true}],"visibilityFilter":"SHOW_ALL"}
   * {"todos":[],"visibilityFilter":"SHOW_ALL"}
   */

  return {store: store, history: history};
};

export default configureStore;
