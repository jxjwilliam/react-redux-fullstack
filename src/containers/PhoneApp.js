import React, {Component}  from 'react'
import { connect } from 'react-redux'

class Phone extends Component {
  render() {
    return (
      <div>
        <h2>Phone</h2>
      </div>
    )
  }
}

export default connect()(Phone);