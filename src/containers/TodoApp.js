import React, {Component}  from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchTodos, addTodo,  setVisibilityFilter, toggleTodo } from '../actions/todoAction'
import TodoList from '../components/TodoList'

//1. AddTodo component
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
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
// if connect() without params, then in component, `dispatch` is passed by default.
AddTodo = connect()(AddTodo)

//2. TodoList (VisibleTodoList) container
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

class VisibleTodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.props.fetchTodos();
    }
  }
  render() {
    return (
      <TodoList todos={this.props.todos} onTodoClick={this.props.onTodoClick}/>
    )
  }
}
VisibleTodoList = connect(
    state => ({
    todos: getVisibleTodos(state.todos.todos, state.todos.visibilityFilter)
  }),
  {
    onTodoClick: toggleTodo, fetchTodos
  }
)(VisibleTodoList)


//////////////////////////////////////////
//3. Footer, Link, FilterLink:
//3.1 Link
const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
      >
      {children}
    </a>
  )
}

//3.2. FilterLink
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.todos.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

//3.3 Footer
const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
)

//////////////////////////////////////////
//4. combine them together
const TodoApp = () => (
  <div className="well">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default TodoApp;