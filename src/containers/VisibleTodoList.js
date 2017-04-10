import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'
import TodoList from '../components/Todos/TodoList'
import { getVisibleTodos } from '../reducers'

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

//const mapDispatchToProps = ({ actions});
// Wrap it!
VisibleTodoList = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleTodoList))

export default VisibleTodoList
