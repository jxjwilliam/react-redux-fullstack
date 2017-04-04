import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import todoApp from './reducers'

const persistedState = {
    todos: [{
        id: 0,
        text: 'Welcome back!',
        completed: false,
    }],
    visibilityFilter: undefined
};

const store = createStore(
    todoApp,
    persistedState
)

//{"todos":[],"visibilityFilter":"SHOW_ALL"}
console.info(JSON.stringify(store.getState()));

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)