import React, {Component}  from 'react'
import { connect } from 'react-redux'
import Footer from '../components/Todos/Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const Todos = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default connect()(Todos);