import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/Todos/TodoList'
import { getVisibleTodos } from '../reducers'

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state, ownProps.filter || 'all')
});

const mapDispatchToProps = ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
