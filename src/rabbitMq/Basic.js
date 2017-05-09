import React, { Component } from 'react'
import { connect } from 'react-redux'


class BasicRMQ extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMessageRecieved = this.onMessageRecieved.bind(this)
  }

  //var socket = io.connect('http://localhost:8080');
  componentDidMount() {
    socket.on('rabbis', this.onMessageRecieved);
  }

  componentWillUnmount() {
    socket.removeListener('rabbis', this.onMessageRecieved)
  }

  onMessageRecieved(msg) {
    this.setState({messages: this.state.messages.concat(msg)})

  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('rabbitmq', this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (
      <div className="row">
        <h2>Socket.io + Rabbit MQ</h2>

        <form className="login-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="message" placeholder="Enter your message"
                 value={this.state.message}
                 onChange={(event) => {
               this.setState({message: event.target.value});
             }
            }/>
          <button className="btn btn-success" onClick={this.handleSubmit}>Send</button>
        </form>

        <div className="well">
          <ul className="list-group">
            {this.state.messages.map((m, i) => (
              <li className="list-group-item" key={i}>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default BasicRMQ