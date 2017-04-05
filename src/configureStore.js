import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools, devToolsEnhancer } from 'redux-devtools-extension';

import todoApp from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle';

const configureStore = () => {

    const persistedState = loadState();

    const store = createStore(
        todoApp,
        persistedState,
        devToolsEnhancer()
    );

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
