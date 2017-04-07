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

export default connect()(Demo);