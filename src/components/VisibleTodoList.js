import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { toggleTodo } from '../actions'
import TodoList from './TodoList'


const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all')
});
//
//const mapDispatchToProps =  ({
//  onTodoClick: toggleTodo
//})
//const mapDispatchToProps = (dispatch) => ({
//  onTodoClick(id) {
//    dispatch(toggleTodo(id));
//  }
//})

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
    { onTodoClick: toggleTodo }
)(TodoList))

export default VisibleTodoList
