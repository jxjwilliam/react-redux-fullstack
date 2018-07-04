## Redux

- The best for isomorphic apps
- in life-cycle: componentDidMount, componentDidUpdate, define promise action creator (receiveTools) to dispatch an action.

- add the action creator in mapDispatchToProps.

```javascript
if(typeof argument[1] !== 'function') {
	return bindActionCreators(argument[1], dispatch)
}
```

for actionsCreators:
import * as TodoActionCreators from 'actionCreators';

(1) render():
let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);

<TodoList todos={todos} {...boundActionCreators} />

(2) componentDidMount():
 let action = TodoActionCreators.addTodo('Use Redux');
 dispatch(action);

## Q&A:

### 1. Action
Actions in Redux are by default just POJO (plain old javascript objects), you can think of them as "events" 
that you often dispatch in response to user-triggered actions (e.g. user clicked on a button)

### 2. Subscribe

Redux does use a pub/sub pattern indeed, a subscribe method that is used by components to subscribe to changes in the state tree. 
Normally you don't use store.subscribe directly, as the Redux-React bindings (Redux connect basically) do that for you.

Subscribe() lets you regiser a callback that the Redux store will call anytime an action has been dispatched, 
so that you can update the UI of your application.

```javascript
  store.subscribe(() => document.body.innerText = store.getState());
  connect == subscribe
```

```javascript
  store.subscribe(render);
```

### 3. Pub/Sub

- on → subscribe
- off → unsubscribe
- trigger → publish
- type → topic


### 4. redux-promise vs redux-thunk
ReduxPromise returns a promise as the payload when an action is dispatched, and then the 
ReduxPromise middleware works to resolve that promise and pass the result to the reducer.

ReduxThunk, on the other hand, forces the action creator to hold off on actually dispatching the 
action object to the reducers until dispatch is called.