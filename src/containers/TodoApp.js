import React, {Component}  from 'react'
import { connect } from 'react-redux'
import Footer from '../components/Todos/Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'


class Todos extends Component {
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    )
  }
}

Todos = connect()(Todos);

export default Todos;