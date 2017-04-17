import React, {Component}  from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <h2>Home</h2>
    )
  }
}

Home = connect()(Home);
export default Home;