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
            delay: 1000
        };
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
        this.incrementAsync = this.incrementAsync.bind(this);
    }

    componentDidMount() {
        this.props.getCounter();
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

    render() {
        const { counter, increment, decrement } = this.props
        return (
            <p>
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
        )
    }
}


// counter is from mongodb: /api/counter.
// TODO: how to update `counter`?
const mapStateToProps = (state) => ({
    counter: state.counter
});

// since countAction is simple, so no need to have a actions/ js.
// TODO: How to manage all actions and reducers?
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(counterActions, dispatch)
}

Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

export default Counter;
