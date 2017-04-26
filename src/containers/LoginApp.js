import React, { Component } from 'react'
import {connect} from 'react-redux';
import { SubmissionError } from 'redux-form'
import fetch from 'isomorphic-fetch';
import '../style.scss'
import LoginForm from '../components/LoginForm'
import {Redirect, withRouter} from 'react-router-dom'

const loginActionCreator = (values) => {
  return fetch('/api/auth/login', {
    method: 'post',
    body: JSON.stringify(values),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json());
}
const logoutActionCreator = () => {
  //should call /api/auto/logout to logout.
  return new Promise((resolve, reject) => setTimeout(resolve));
}

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {redirect: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this)
  }

  handleSubmit(values, dispatch) {
    this.props.loginActionCreator(values)
      .then(data => {
        if (data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
          dispatch({type: 'LOGIN_SUCCESS', payload: data})
          this.setState({redirect: true});
        }
        else {
          dispatch({type: 'LOGIN_FAILED', error: 'Login failed!'})
          throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
          throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
        }
      })
  }

  logout() {
    this.props.logoutActionCreator()
      .then(data => {
        this.props.dispatch({type: 'LOGOUT_SUCCESS'})
      })
  }

  delay = s => new Promise(resolve => setTimeout(resolve, s));

  render() {
    const {tokenId, username, errorMessage} = this.props.token;
    if (this.state.redirect) {
      return <Redirect to='/'/>;
      //return this.delay(5000).then(()=> <Redirect to='/'/>)
      new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
        console.log('happened?');
        return <Redirect to="/"/>
      })
    }

    return (
      <div className="row loginPage">
        <h1>Login</h1>
        {errorMessage ? <p className="alert alert-danger">{errorMessage}</p> : null}
        {!tokenId &&
        <LoginForm onSubmit={ this.handleSubmit }/>
        }
        {tokenId &&
        <div>
          <p>You are currently logged in as <strong>{username}</strong>.</p>

          <div>
            <button className="btn btn-danger" onClick={this.logout}><i className="fa fa-sign-out"/>{' '}Log Out
            </button>
          </div>
        </div>
        }
      </div>
    )
  }
}

Login = connect(
  (state) => ({token: state.token}),
  (dispatch) => ({
    loginActionCreator, logoutActionCreator, dispatch
  }))(Login)

export default Login