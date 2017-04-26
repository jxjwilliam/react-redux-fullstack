import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import * as counterActions from '../actions/counterAction'

/**
 * https://github.com/reactjs/redux/blob/master/examples/counter/
 */
// 1. this is the same as: redux/examples/counter
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 500
    };
    this.incrementIfOdd = this.incrementIfOdd.bind(this);
    this.incrementAsync = this.incrementAsync.bind(this);
  }

  // allow url assignment, besides db-access.
  componentDidMount() {
    if (this.props.match.params.counts) {
      let no = parseInt(this.props.match.params.counts) || 1;
      this.props.dispatch({
        type: 'LOAD_COUNTER',
        payload: no
      });
    }
    else {
      this.props.getCounter();
    }
  }

  incrementIfOdd() {
    if (this.props.counter % 2 !== 0) {
      this.props.increment()
    }
  }

  incrementAsync() {
    setTimeout(this.props.increment, this.state.delay)
    //setTimeout(()=>dispatch(this.props.increment()), this.state.delay);
  }

  //{this.props.match.params.counts || this.props.counter}
  render() {
    const { counter, increment, decrement } = this.props
    return (
      <div className="row">
        <h3>Initial Counts: {counter}</h3>

        <div className="alert alert-warning">update counter number from URL is accepted: http://localhost:8081/counter/18
        </div>

        <p className="well">
          Clicked: {counter} times
          {' '}
          <button onClick={increment}>
            +
          </button>
          {' '}
          <button onClick={decrement}>
            -
          </button>
          {' '}
          <button onClick={this.incrementIfOdd}>
            Increment if odd
          </button>
          {' '}
          <button onClick={this.incrementAsync}>
            Increment async
          </button>
        </p>
      </div>
    )
  }
}


// counter is from mongodb: /api/counter.
// TODO: how to update `counter`?
const mapStateToProps = (state, ownProps) => ({
  counter: state.counter
});

// since countAction is simple, so no need to have a actions/ js.
// TODO: How to manage all actions and reducers?
const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators(counterActions, dispatch)
  return {...actions, dispatch}
}

Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default Counter;
