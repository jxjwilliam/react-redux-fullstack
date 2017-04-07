import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import todoApp from './reducers'
import { loadState, saveState } from './helpers/localStorage'
import throttle from 'lodash/throttle';


const addLoggingToDispatch = (store) => {
  if (!console.group) {
    return store;
  }
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('%c pre state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}


const configureStore = () => {

  const persistedState = loadState();

  const store = createStore(
    todoApp,
    persistedState,
    devToolsEnhancer()
  );

  if(process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }
  store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos})
  }), 1000);

  /**
   * {"todos":[{"id":0,"text":"hi","completed":false},{"id":1,"text":"ho","completed":true}],"visibilityFilter":"SHOW_ALL"}
   * {"todos":[],"visibilityFilter":"SHOW_ALL"}
   */
  console.info(JSON.stringify(store.getState()));
  return store;
};

export default configureStore;
