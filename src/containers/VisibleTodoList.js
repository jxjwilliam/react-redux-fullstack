import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import TodoList from '../components/Todos/TodoList'
import { getVisibleTodos } from '../reducers'

const mapStateToProps = (state, {params}) => ({
  todos: getVisibleTodos(state, params.filter || 'all')
});

const mapDispatchToProps = ({
  onTodoClick: toggleTodo
})

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList))

export default VisibleTodoList
