import React, {Component}  from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as TodoActions from '../actions/Todos/'
import * as TodoComponents from '../components/Todos'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers/todosReducer'

// 1. AddTodo component
let AddTodo = () => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        TodoActions.addTodo(input.value)
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }}/>
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

// 2. TodoList (VisibleTodoList) container

//container component
class VisibleTodoList extends Component {

  // the only way to setState is dispatch action.
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  componentDidMount() {
    this.fetchData();
  }

  //whenever the filter changes inside the componentDidUpdate, lifecycle hook.
  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  render() {
    const { isFetching, errorMessage, toggleTodo, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>
    }
    if (errorMessage && !todos.length) {
      return (
        <TodoComponents.FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
          />
      )
    }

    return (
      <TodoComponents.TodoList todos={todos} onTodoClick={toggleTodo}/>
    )
  }
}
// lifecycle-hook
// isFetching: getIsFetching(state, filter),
//  errorMessage: getErrorMessage(state, filter),
const mapStateToProps = (state, {params}) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};

/**
 *  const VisibleTodoList = withRouter(connect(
 *    mapStateToProps,
 *    { onTodoClick: toggleTodo, fetchData }
 *  )(TodoList));
 */
//const mapDispatchToProps = ({ actions});
// Wrap it!
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  TodoActions
)(VisibleTodoList))


// 3. combine them together
const Todos = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <TodoComponents.Footer />
  </div>
)

export default connect()(Todos);