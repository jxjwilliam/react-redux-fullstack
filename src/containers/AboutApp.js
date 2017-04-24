import React, { Component } from 'react'
import { connect } from 'react-redux'

class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {about} = this.props;
    return (
      <section className={about}>
        <h2>About - {this.props.match.params.name}</h2>
        {this.props.children}
      </section>
    )
  }
}

About = connect()(About);

export default About
