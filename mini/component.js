import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux'
import * as actionCreators from './action'

const List = ({props}) => {
  return (
    <ul className="list-group">
      {props.map((item, i) => (
        <li className="list-group-item" key={'item'+i}>{item}</li>
      ))}
    </ul>
  )
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actions: ['ACTION', 'THUNK', 'SUPERAGENT', 'NOPROMISE',
        'FETCH', 'SOCKET', 'AUTH', 'PROMISE', 'PAYLOADPROMISE', 'CUSTOM', 'RXJS']
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var ev = e.target.value.toLowerCase();
    this.setState({'clicked': ev});
    this.props[ev + 'Action']();
    e.preventDefault();
  }

  render() {
    const {data} = this.props;
    const actions = this.state.actions.map((a, i) => {
      return (
        <div className="flex-item" key={i}>
          <input type="button" className="btn btn-default" onClick={this.handleClick}
                 ref="middlewareButton" value={a}/>
        </div>
      )
    })
    var list = [];
    if (Array.isArray(data) && data.length > 0) {
      list = data.map((d, i) => (
        <li className="list-group-item" key={'d_'+i}>{JSON.stringify(d)}</li>
      ))
    }
    else if (data && Object.keys(data).length > 0) {
      for (var i in data) {
        list.push((
          <li className="list-group-item" key={i}><strong>{i}</strong>: {data[i]}</li>
        ))
      }
    }
    return (
      <div className="container">
        <h3 className="alert alert-danger">Middleware Test App
          {this.state.clicked ? ` - ${this.state.clicked}` : ''}
          {/*{this.refs.middlewareButton ? ` - ${this.refs.middlewareButton.value.toLowerCase()}` : ''} */}
        </h3>

        <div className="row flex-container">{actions}</div>
        <hr/>
        <ul className="row list-group">
          {list}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(
  (state, props) => state.test,
  mapDispatchToProps
)(App);