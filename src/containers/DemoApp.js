import React, { Component } from 'react'
import { connect } from 'react-redux'

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.whatever = this.whatever.bind(this);
  }

  whatever() {

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  render() {
    <div>
      <h2>Demo App</h2>

      <div {...this.props}>
        {this.props.children}
      </div>
    </div>
  }

}

Demo = connect()(Demo)

export default Demo