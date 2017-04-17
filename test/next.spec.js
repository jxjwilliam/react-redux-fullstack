import { createStore } from 'redux'
import chai, { expect } from 'chai'
import CounterReducer from '../src/reducers/counterReducer'
import prettyjson from 'prettyjson'

const combineReducer = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  }
}

describe('# combineReducer Test', () => {
  let store, log;

  beforeEach(() => {
    store = createStore(CounterReducer);
  });

  it("should be accessible", () => {
    let combined = combineReducer({
      counter: CounterReducer
    });
    console.log(prettyjson.render(combined))
  });
})

