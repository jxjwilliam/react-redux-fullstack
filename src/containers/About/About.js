import React, { Component } from 'react'
import Footer from '../../../public/partials/Footer'

class About extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {about} = this.props;
    return (
      <section className={about}>
        <h2>About</h2>
        {this.props.children}
      </section>
    )
  }
}
export default About;