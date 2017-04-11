import React from 'react'
import Footer from '../components/Todos/Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import { removeState } from '../helpers/localStorage'
import AppTabs from '../components/ReactBootstrap'

const App = () => {
/**
 * <AppTabs>a lot of children here...</AppTabs>
 */
    return (
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
            <button type="button" className="btn btn-warning" onClick={removeState}>
                Reset LocalStorage State
            </button>
        </div>
    )
};

export default App
