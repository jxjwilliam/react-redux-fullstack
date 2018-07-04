/**
 * william add middleware to intercept for socket
 * http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#the-architecture
 * Concretely, we should only send out actions that have a {meta: {remote: true}} property attached
 */
const remoteActionMiddleware = store => next => action => {
  if (action.meta && action.meta.remote) {
    console.log('in middleware', store, next, action);
    debugger;
    socket.emit('action', action)
  }
  return next(action)
}


//https://github.com/reactjs/redux/issues/297
function authMiddleware({getState, dispatch}) {
  return (next) => (action) => {
    if (typeof action === 'object' && action.hasOwnProperty('type')) {
      if (action.type === 'LOGIN_SUCCESS') {
        next(action);

        const state = getState();
        let path = '/dashboard';

        if (typeof state['router'] === 'object' && typeof state['router']['route'] === 'object' && null !== state['router']['route']) {
          if (state.router.route.name === 'login' && typeof state.router.route.query['to'] === 'string') {
            path = state.router.route.query.to;
          }
        }
        return next(actions.transitionTo(path));
      }
    }

    return next(action);
  }
}