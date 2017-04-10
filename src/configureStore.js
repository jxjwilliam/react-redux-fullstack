import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import todoApp from './reducers'
//import { loadState, saveState } from './helpers/localStorage'
//import throttle from 'lodash/throttle';

/**
 * logger(store) => return store
 * logger(store)(next) => store.dispatch
 * logger(store)(next)(action) => dispatch(action) -> state.
 */
const logger = (store) => (next) => {
    if (!console.group) {
        return next;
    }
    return (action) => {
        if(!action) {
            return next();
        }
        console.group(action.type);
        console.log('%c pre state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = next(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
}

/**
 * promise(store) => return store
 * promise(store)(next) => store.dispatch
 * promise(store)(next)(action) => dispatch(action) -> state.
 * @param store
 * @returns {Function}
 */
const promise = (store) => (next) => (action) => {
    if(!action) {
        return next();
    }
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);

}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    })
}

const configureStore = () => {

    const store = createStore(
        todoApp,
        devToolsEnhancer()
    );
    let middlewares = [promise];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    console.info(JSON.stringify(store.getState()));
    return store;
};

export default configureStore;
