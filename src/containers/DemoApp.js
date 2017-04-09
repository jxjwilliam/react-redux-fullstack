import React, {Component}  from 'react'
import { connect } from 'react-redux'

class Demo extends Component {
  render() {
    return (
      <div>
        <h2>Demo</h2>
      </div>
    )
  }
}

Demo = connect()(Demo);

export default Demo;