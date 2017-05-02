import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./chat.css"

class SocketRedisChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messages: []
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onMessageReceived = (data) => {

  }

  handleSubmit = (event) => {

  }

  render() {
    return (
      <div className="container">
        <h2>Using Redis as PubSub over Socket.IO</h2>

        <div className="join-chat">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username"/>
          <input type="button" id="join-chat" value="Join Chat" onClick=""/>
        </div>
        <br/>

        <div className="chat-info"></div>
        <br/>

        <div className="chat">
          <div className="messages"></div>
        <textarea name="message" id="message" cols="90" rows="5"
                  placeholder="Enter your message..."></textarea><br/><br/>
          <input type="button" id="send-message" data-username="" value="Send Message"/>&nbsp;
          <input type="button" id="leave-chat" data-username="" value="Leave Chat"/>
        </div>
      </div>
    )
  }
}

SocketRedisChat = connect(
    state => ({token: state.token})
)(SocketRedisChat);

export default SocketRedisChat;