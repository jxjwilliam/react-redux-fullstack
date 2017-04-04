import React from 'react'
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import { removeState } from '../localStorage'

const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={params.filter || 'all'} />
    <Footer />
    <button type="button" onClick={removeState}>
      Reset LocalStorage State
    </button>
  </div>
)

export default App
