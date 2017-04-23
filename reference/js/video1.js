// From Dan Ambramov:

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    // only add into reducers, then dispatch(action) can capture.
    state = reducer(state, action);

    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // initial value:
  dispatch({});

  return {getState, dispatch, subscribe};
};


// [ ACTION_TYPES ].reduce(sum, reducer, 0)
const combineReducer = (reducers) => {

  return (state = {}, action) => {

    return Object.keys(reducers).reduce((nextState, key) => {

      nextState[key] = reducers[key](state[key], action);

      return nextState;
    }, {});
  }
}

