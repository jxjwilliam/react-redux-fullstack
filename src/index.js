import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import todoApp from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(
    todoApp,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos})
}), 1000);

/**
 * {"todos":[{"id":0,"text":"hi","completed":false},{"id":1,"text":"ho","completed":true}],"visibilityFilter":"SHOW_ALL"}
 * {"todos":[],"visibilityFilter":"SHOW_ALL"}
 */
console.info(JSON.stringify(store.getState()));

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)