import React, { Component } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import fetch from 'isomorphic-fetch'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = {filter: SHOW_ALL}
  }

  //http://localhost:8081/api/pg/todos
  componentDidMount() {
    fetch('/api/pg/todos')
      .then(res => res.json())
      .then(data => {
        this.props.actions.dispatch({type: 'LOAD_TODO', payload: data})
      })
  }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({filter})
  }

  renderToggleAll(completedCount) {
    const { todomvc, actions } = this.props
    if (todomvc.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todomvc.length}
               onChange={actions.completeAll}/>
      )
    }
  }

  renderFooter(completedCount) {
    const { todomvc } = this.props
    const { filter } = this.state
    const activeCount = todomvc.length - completedCount

    if (todomvc.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)}/>
      )
    }
  }

  render() {
    const { todomvc, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todomvc.filter(TODO_FILTERS[filter])
    const completedCount = todomvc.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
              <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}
