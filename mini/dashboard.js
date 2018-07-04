import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <h1>Dashboard</h1>
    )
  }
}

export default connect(
  (state, props) => state.dashboard
)(Dashboard);