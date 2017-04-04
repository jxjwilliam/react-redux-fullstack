import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

const combineReducer = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {

      nextState[key] = reducers[key](state[key], action);

      return nextState;
    }, {});
  }
}
const todoApp = combineReducer({
  todos,
  visibilityFilter
});


const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);

    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
const store = createStore(counter);
