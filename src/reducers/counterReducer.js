//https://github.com/reactjs/redux/blob/master/examples/counter/src/reducers/index.js

export const CounterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'LOAD_COUNTER':
            return action.payload
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}
