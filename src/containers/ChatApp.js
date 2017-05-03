import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import '../assets/chat.scss';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
  }

  componentDidMount() {
    if (socket) {
      socket.on('msg', this.onMessageReceived);
      setTimeout(() => {
        socket.emit('history', {offset: 0, length: 100});
      }, 100);
    }
  }

  componentWillUnmount() {
    if (socket) {
      socket.removeListener('msg', this.onMessageReceived);
    }
  }

  onMessageReceived = (data) => {
    const messages = this.state.messages;
    messages.push(data);
    this.setState({messages});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const msg = this.state.message;

    this.setState({message: ''});

    socket.emit('msg', {
      from: this.props.token.username,
      text: msg
    });
  }

  render() {
    const {username} = this.props.token;
    return (
      <div className='chat container'>
        {username &&
        <div>
          <ul className="list-group">
            {this.state.messages.map((msg) => {
              return <li className="list-group-item" key={`chat.msg.${msg.id}`}>{msg.from}: {msg.text}</li>;
            })}
          </ul>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <input type="text" ref="message" placeholder="Enter your message"
                   value={this.state.message}
                   onChange={(event) => {
               this.setState({message: event.target.value});
             }
            }/>
            <button className="btn btn-success" onClick={this.handleSubmit}>Send</button>
          </form>
        </div>
        }
      </div>
    );
  }
}

Chat = connect(
    state => ({token: state.token})
)(Chat);
export default Chat;
