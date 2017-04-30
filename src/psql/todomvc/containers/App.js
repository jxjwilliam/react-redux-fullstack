import React  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({todomvc, actions}) => (
  <div>
    <Header addTodo={actions.addTodo}/>
    <MainSection todomvc={todomvc} actions={actions}/>
  </div>
)

const mapStateToProps = state => ({
  todomvc: state.todomvc
})

const mapDispatchToProps1 = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})
const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators(TodoActions, dispatch);
  return {actions: {...actions, dispatch}};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
