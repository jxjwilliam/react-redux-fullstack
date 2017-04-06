import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/Todos/TodoList'

const getVisibleTodos = (todos, filter) => {
  console.log('getVisibleTodos: ', filter);
  switch (filter) {
    case 'all':
      return todos
    case 'completed':
      return todos.filter(t => t.completed)
    case 'active':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
};

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(
      state.todos,
      ownProps.filter || 'all'
  )
});

const mapDispatchToProps =  ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
