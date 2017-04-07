import React from 'react'
import Footer from '../components/Todos/Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import { removeState } from '../helpers/localStorage'
import AppTabs from '../components/ReactBootstrap'

/**
 * <AppTabs>a lot of children here...</AppTabs>
 */
const App = ({ params }) => {
    console.log('App: ', params);
    return (
        <div>
            <AddTodo />
            <VisibleTodoList filter={params.filter || 'all'}/>
            <Footer />
            <button type="button" className="btn btn-warning" onClick={removeState}>
                Reset LocalStorage State
            </button>
        </div>
    )
};

export default App
