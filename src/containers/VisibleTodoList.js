import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions/todosAction'
import TodoList from '../components/Todos/TodoList'
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers/todosReducer'
import FetchError from '../components/Todos/fetchError'

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
                <FetchError
                    message={errorMessage}
                    onRetry={() => this.fetchData()}
                    />
            )
        }

        return (
            <TodoList todos={todos} onTodoClick={toggleTodo}/>
        )
    }
}
// lifecycle-hook
const mapStateToProps = (state, {params}) => {
    const filter = params.filter || 'all';
    return {
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
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
    actions
)(VisibleTodoList))

export default VisibleTodoList
