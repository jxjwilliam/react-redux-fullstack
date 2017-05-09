import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalLogins: 0
    }
  }

  componentDidMount() {
    if (socket) {
      socket.on('onlineLoggedIn', (count) => {
        this.setState({
          totalLogins: count
        })
        //document.getElementById('loginCounts').innerHTML = data
      })
    }
  }

  render() {
    const { token: {account, tokenId}, handleLogout } = this.props;
    //console.log('props: states+actions: ', props);

    return (
      <header className="app">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className="brand"/>
                App</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse key={0}>
            <Nav navbar>
              <LinkContainer to="/counter">
                <NavItem key={1}>Counter</NavItem>
              </LinkContainer>
              <LinkContainer to="/todos">
                <NavItem key={2}>Todos</NavItem>
              </LinkContainer>

              <NavDropdown key={3} title="Topics" id="basic-nav-topics">
                <LinkContainer to="/delegate">
                  <MenuItem key={3.1}>GitHub</MenuItem>
                </LinkContainer>
                <LinkContainer to="/about">
                  <MenuItem key={3.2}>About</MenuItem>
                </LinkContainer>
                <LinkContainer to="/topics">
                  <MenuItem key={3.3}>Submenu</MenuItem>
                </LinkContainer>
                <MenuItem divider/>
                <LinkContainer to="/more">
                  <MenuItem key={3.4}>More...</MenuItem>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown key={7} title="psql" id="basic-nav-psql">
                <LinkContainer to="/psql">
                  <MenuItem key={7.1}>psql</MenuItem>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown key={8} title="socket" id="basic-nav-socket">
                <LinkContainer to="/socket-redis">
                  <MenuItem key={8.1}>Redis Pub/Sub</MenuItem>
                </LinkContainer>
                <LinkContainer to="/chat">
                  <MenuItem key={3.2}>Chat</MenuItem>
                </LinkContainer>
              </NavDropdown>

              <NavDropdown key={9} title="rabbitmq" id="basic-nav-rebbitmq">
                <LinkContainer to="/rabbitmq">
                  <MenuItem key={9.1}>RabbitMQ</MenuItem>
                </LinkContainer>
                <LinkContainer to="/vote">
                  <MenuItem key={9.2}>Vote</MenuItem>
                </LinkContainer>
              </NavDropdown>

              <LinkContainer to="/users">
                <NavItem key={4}>Users</NavItem>
              </LinkContainer>

              {!tokenId &&
              <LinkContainer to="/login">
                <NavItem key={5}>Login</NavItem>
              </LinkContainer>}
              {tokenId &&
              <LinkContainer to="/logout">
                <NavItem key={6} className="logout-link" onClick={handleLogout}>Logout</NavItem>
              </LinkContainer>}
            </Nav>

            <p className="navbar-text">
              <span id="loginCounts" className="badge badge-up badge-danger">
                {this.state.totalLogins}</span>
            </p>

            {tokenId &&
            <p className="navbar-text">Logged in as <strong>{account}</strong>.</p>}

            <Nav navbar pullRight>
              <NavItem key={1} target="_blank" title="View on Github"
                       href="https://github.com/jxjwilliam/react-redux-fullstack">
                <i className="fa fa-github"/>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

/**
 * state.token exists, ownProps.handleLogout not exists.
 * reducers are global, but dispatch-function is bind to component.
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  handleLogout: () => {
    //console.log('switch header login/logout', dispatch, ownProps)
    dispatch({type: 'LOGOUT_SUCCESS'})
  }
});
Header = connect(
  (state) => ({token: state.token, onlineLoggedIn: state.onlineLoggedIn}),
  mapDispatchToProps
)(Header);

export default Header
