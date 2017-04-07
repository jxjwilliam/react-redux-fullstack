import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as todoActions from '../actions'
import TodoList from '../components/Todos/TodoList'
import { getVisibleTodos } from '../reducers'
import { fetchTodos } from '../helpers/fetchTodos'

class VisibleTodoList extends Component {

  // the only way to setState is dispatch action.
  fetchData() {
    const { filter, receiveTodos } = this.props;

    fetchTodos(filter).then(todos => {
      console.log(filter, todos);
      receiveTodos(filter, todos);
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
      {...rest}
      onTodoClick={toggleTodo}
      />
    )
  }
}
// lifecycle-hook
const mapStateToProps = (state, {params}) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  }
};

//const mapDispatchToProps = ({
//  todoActions,
//});
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  todoActions
)(VisibleTodoList))

export default VisibleTodoList
