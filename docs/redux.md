
1. in life-cycle: componentDidMount, componentDidUpdate, define promise action creator (receiveTools) to dispatch an action.

2. add the action creator in mapDispatchToProps.

/**
if(typeof argument[1] !== 'function') {
	return bindActionCreators(argument[1], dispatch)
}
*/

for actionsCreators:
import * as TodoActionCreators from 'actionCreators';

(1) render():
let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);

<TodoList todos={todos} {...boundActionCreators} />

(2) componentDidMount():
 let action = TodoActionCreators.addTodo('Use Redux');
 dispatch(action);

//////////////////////////

Redux does use a pub/sub pattern indeed, a subscribe method that is used by components to subscribe to changes in the state tree. Normally you don't use store.subscribe directly, as the Redux-React bindings (Redux connect basically) do that for you.

Actions in Redux are by default just POJO (plain old javascript objects), you can think of them as "events" that you often dispatch in response to user-triggered actions (e.g. user clicked on a button)