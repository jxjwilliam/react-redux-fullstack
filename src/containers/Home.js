import React, {Component}  from 'react'
import { bindActionCreator } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div className="root">
        <Link to='/' style={{cursor: 'pointer'}}>Home</Link>
        <ul className="menu">
          <li><a href="/">App</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/counter">Counter</a></li>
          <li><a href="/demo">Demo</a></li>
          <li><a href="/phone">Phone</a></li>
          <li><a href="/todos">Todos</a></li>
          <li><a href="/users">Users</a></li>
        </ul>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

Home = connect()(Home);

export default Home;