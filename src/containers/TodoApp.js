import React, {Component}  from 'react'
import { connect } from 'react-redux'

class Todos extends Component {
  render() {
    return (
      <div>
        <h2>Todos</h2>
      </div>
    )
  }
}

export default connect()(Todos);