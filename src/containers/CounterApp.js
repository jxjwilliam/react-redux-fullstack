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

Counter = connect()(Counter);
export default Counter;