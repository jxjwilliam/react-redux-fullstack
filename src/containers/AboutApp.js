import React, { Component } from 'react'
import { connect } from 'react-redux'
var faker = require('faker/locale/en')

const MediaObject = (mo) => {
  return (
    <div className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={mo.img} style={{width:60}}/>
        </a>
      </div>

      <div className="media-body">
        <h4 className="media-heading">{mo.h}</h4>

        <p>{mo.p}</p>
      </div>
    </div>
  )
}

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {mediaObject: []}
  }

  componentDidMount() {
    var url = 'https://www.w3schools.com/bootstrap/';
    var ary = []
    for (var i = 1; i < 6; i++) {
      ary.push({
        img: url + 'img_avatar' + i + '.png',
        h: faker.lorem.sentence(),
        p: faker.lorem.paragraphs(),
      })
    }
    this.setState({mediaObject: ary})
  }

  render() {
    const {about} = this.props;
    if (this.state.mediaObject.length === 0) {
      return <h2>Loading...</h2>
    }

    const mos = this.state.mediaObject.map((mo, i) => (
      <MediaObject key={i} {...mo} />
    ));

    return (
      <section className={about}>
        <h2>About - {this.props.match.params.name}</h2>
        {this.props.children}
        <div className="row">
          <div className="col-offset-2 col-md-8">
            {mos}
          </div>
        </div>
      </section>
    )
  }
}

About = connect()(About);

export default About
