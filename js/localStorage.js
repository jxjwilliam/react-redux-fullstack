const AppState = 'AppState'

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(AppState);
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch(err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(AppState, serializedState);
    } catch(err) {
        // Ignore write errors.
    }
}

export const removeState = () => localStorage.removeItem(AppState);