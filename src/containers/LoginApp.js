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
        if (!data.account) {
          // no such a user:
          dispatch({type: 'LOGIN_FAILED', error: 'User/Account not exist or not match:' + JSON.stringify(values)})
        }
        else if (data.hasOwnProperty('account') && data.hasOwnProperty('tokenId')) {
          dispatch({type: 'LOGIN_SUCCESS', payload: data})
          if (socket) socket.emit('login')
        }
        else {
          dispatch({type: 'LOGIN_FAILED', error: 'Login failed!'})
          throw new SubmissionError({account: 'User does not exist', _error: 'Login failed!'})
          //throw new SubmissionError({password: 'Wrong password', _error: 'Login failed!'})
        }
      })
  }

  handleLogout() {
    this.props.fetchLogout()
      .then(data => {
        this.props.dispatch({type: 'LOGOUT_SUCCESS'})
        if (socket) socket.emit('logout')
      })
  }

  //delay = s => new Promise(resolve => setTimeout(resolve, s));
  //loggedIn: true, shouldRedirect: true, tokenId:
  render() {
    const {tokenId, account, errorMessage, shouldRedirect} = this.props.token;

    if (shouldRedirect) {
      //return this.delay(5000).then(()=> <Redirect to='/'/>)
      var no_return_undefined = new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
        return <Redirect to='/'/>; // <Home/>
      });
    }

    return (
      <div className="row loginPage">
        <h2>Login</h2>
        {errorMessage ? <p className="alert alert-danger">{errorMessage}</p> : null}
        {!tokenId &&
        <LoginForm onSubmit={ this.handleLogin }/>
        }
        {tokenId &&
        <div>
          <p>You are currently logged in as <strong>{account}</strong>.</p>

          <div>
            <button className="btn btn-danger" onClick={this.handleLogout}><i className="fa fa-sign-out"/>{' '}Log Out
            </button>
          </div>
        </div>
        }
      </div>
    )
  }

  /**
   * not use: but a good reference
   * https://github.com/reactjs/redux/issues/297
   componentWillUpdate() {
    const { router } = this.context
    if(this.props.token.shouldRedirect) {
      store.dispatch({type: 'resetSubmitState '})
      router.transition('...')
    }
  }
   componentWillReceiveProps(nextProps) {
    if (['/login', '/sign-up'].indexOf(this.props.router.path) !== -1 && this.props.isLoggedIn) {
      this.context.router.transitionTo(this.props.router.query.nextPath || '/home')
    }
  }
   */
}

Login = connect(
  (state) => ({token: state.token}),
  (dispatch) => ({
    fetchLogin, fetchLogout, dispatch
  }))(Login)

export default Login