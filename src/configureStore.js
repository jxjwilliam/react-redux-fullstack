import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './reducers'
import { loadState, saveState } from './helpers/localStorage'
//import throttle from 'lodash/throttle';

// version 1: with npm thunk, promise, logger.
const configStore = () => {
    const persistedState = loadState();
    const middlewares = [thunk];

    //Logger must be last middleware in chain, otherwise it will log thunk and promise, not actual actions (#20).
    if (process.env.NODE_ENV === `development`) {
        middlewares.push(createLogger());
    }

    return createStore(
        rootReducer,
        compose(applyMiddleware(...middlewares), devToolsEnhancer())
    )
}


/**
 * logger(store) => return store
 * logger(store)(next) => store.dispatch
 * logger(store)(next)(action) => dispatch(action) -> state.
 */
const loggerLocal = (store) => (next) => {
    if (!console.group) {
        return next;
    }
    return (action) => {
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
const promiseLocal = (store) => (next) => (action) => {
    if (typeof action.then === 'function') {
        return action.then(next);
    }
    return next(action);
}

const thunkLocal = (store) => (next) => (action) =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.slice().reverse().forEach(middleware => {
        store.dispatch = middleware(store)(store.dispatch);
    })
}

// version 2: with manual loggerLocal, promiseLocal and thunkLocal.
const configureStore = () => {

    const store = createStore(
        rootReducer,
        devToolsEnhancer()
    );
    let middlewares = [thunkLocal, promiseLocal]; //promise;

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(loggerLocal);
    }

    wrapDispatchWithMiddlewares(store, middlewares);

    console.info(JSON.stringify(store.getState()));
    return store;

};

// version 3: currying:
const createStoreWithMiddleware = (middlewares) => (createStore) => (reducers) => {
    return createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    )
};

//createStoreWithMiddleware(thunk, promise, logger)(createStore)(todoApp);

export default configureStore;
