import React, { Component } from 'react'
import App from './todomvc/containers/App'
import 'todomvc-app-css/index.css'

class PSQL extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <App/>
      </div>
    )
  }
}

export default PSQL;