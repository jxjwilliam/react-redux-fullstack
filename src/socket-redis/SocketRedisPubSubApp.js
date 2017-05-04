import React, { Component } from 'react'
import { connect } from 'react-redux'
import SmoothieComponent from 'react-smoothie'

class SocketRedisPubSub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redLine: {
        strokeStyle: 'rgba(0, 255, 0, 1)',
        fillStyle: 'rgba(0, 255, 0, 0.2)',
        lineWidth: 4
      },
      blueLine: {
        strokeStyle: 'rgba(255, 0, 0, 1)',
        fillStyle: 'rgba(255, 0, 0, 0.2)',
        lineWidth: 4
      },
      ts1: {},
      ts2: {}
    }
    this.drawGraph = this.drawGraph.bind(this);
  }

  drawGraph(gm) {
    this.dataGenerator = setInterval(() => {
      var time = new Date().getTime();
      this.state.ts1.append(time, Math.random());
      this.state.ts2.append(time, Math.random());
    }, 500);
  }

  /**
   * ts1,ts1 saveds in local-store, otherwise, when 2nd-acces, this.refs.chart is undefined.
   */
  componentDidMount() {
    this.setState({
      ts1: this.refs.chart.addTimeSeries({}, this.state.redLine),
      ts2: this.refs.chart.addTimeSeries({}, this.state.blueLine)
    })

    if (socket) {
      socket.on('twits', (msg) => {
        //{field1: "red", field2: "blue", key: "red"}
        console.log('redis-smoothie-socket:', msg);
        this.drawGraph(msg)
      });

      // let server-redis send data via socket.
      socket.emit('socket-redis', 'starting the smoothie graphic...');
    }
  }

  componentWillUnmount() {
    clearInterval(this.dataGenerator);
  }

  /**
   * SmoothieComponent is <canvas>
   * <canvas id="twits" width="600" height="200"></canvas>
   */
  render() {
    return (
      <div className="row">
        <h3>Twitter Reach</h3>

        <SmoothieComponent ref="chart" width="600" height="200"/>;
      </div>
    )
  }
}

SocketRedisPubSub = connect(
    state => ({token: state.token})
)(SocketRedisPubSub);

export default SocketRedisPubSub;