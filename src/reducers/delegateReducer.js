//2. Reducers
export const addTweets = (state, action) => ({
    isLoading: state.isLoading,
    user: state.user,
    repos: action.repos
})

export const userChanged = (state, action) => ({
    user: action.value,
    repos: [],
    isLoading: state.isLoading
});

export const isLoadingChanged = (state, action) => ({
    user: state.user,
    repos: state.repos,
    isLoading: action.isLoading
});

const githubReducer = (state, action) => {
    let previousState = (state ? state : {user: "williamjxj",repos: [],isLoading:false});

    switch (action.type) {
        case "ADD_TWEETS":
            return addTweets(previousState, action);
            break;
        case "USER_CHANGED":
            return userChanged(previousState, action);
            break;
        case "IS_LOADING":
            return isLoadingChanged(previousState, action);
        default:
            return previousState;
    }
}


export default githubReducer;