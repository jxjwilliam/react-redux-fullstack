import React, { Component } from 'react'
import {connect} from 'react-redux';
import { SubmissionError } from 'redux-form'
import fetch from 'isomorphic-fetch';
import LoginForm from '../components/LoginForm'
import {Redirect, withRouter} from 'react-router-dom'
import '../assets/style.scss'

const fetchLogin = (values) => {
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
const fetchLogout = () => {
  //should call /api/auto/logout to logout.
  return new Promise((resolve, reject) => setTimeout(resolve));
}


class Login extends Component {

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin(values, dispatch) {
    this.props.fetchLogin(values)
      .then(data => {
        if (data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
          dispatch({type: 'LOGIN_SUCCESS', payload: data})
        }
        else {
          dispatch({type: 'LOGIN_FAILED', error: 'Login failed!'})
          throw new SubmissionError({username: 'User does not exist', _error: 'Login failed!'})
          //throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
        }
      })
  }

  handleLogout() {
    this.props.fetchLogout()
      .then(data => {
        this.props.dispatch({type: 'LOGOUT_SUCCESS'})
      })
  }

  delay = s => new Promise(resolve => setTimeout(resolve, s));

  //loggedIn: true, shouldRedirect: true, tokenId:
  render() {
    const {tokenId, username, errorMessage, shouldRedirect} = this.props.token;
    console.log('11111', this.props);
    if (shouldRedirect) {
      //return this.delay(5000).then(()=> <Redirect to='/'/>)
      var no_return_undefined = new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
        return <Redirect to='/'/>; // <Home/>
      });
    }

    return (
      <div className="row loginPage">
        <h1>Login</h1>
        {errorMessage ? <p className="alert alert-danger">{errorMessage}</p> : null}
        {!tokenId &&
        <LoginForm onSubmit={ this.handleLogin }/>
        }
        {tokenId &&
        <div>
          <p>You are currently logged in as <strong>{username}</strong>.</p>

          <div>
            <button className="btn btn-danger" onClick={this.handleLogout}><i className="fa fa-sign-out"/>{' '}Log Out
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
    fetchLogin, fetchLogout, dispatch
  }))(Login)

export default Login