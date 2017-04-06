import React from 'react'
import Footer from '../components/Todos/Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import { removeState } from '../helpers/localStorage'

const App = ({ params }) => {
    console.log('App: ', params);
    return (
        <div>
            <AddTodo />
            <VisibleTodoList filter={params.filter || 'all'}/>
            <Footer />
            <button type="button" onClick={removeState}>
                Reset LocalStorage State
            </button>
        </div>
    )
}

export default App
