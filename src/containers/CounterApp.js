import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
  render() {
    return (
      <div>
        <h2>Counter</h2>
      </div>
    )
  }
}

export default connect()(Counter);