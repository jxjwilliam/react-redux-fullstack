import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import MyApp from './containers/'
import PSQL from './psql/'

let Header = (props) => {
  const { token: {username, tokenId}, handleLogout } = props;
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

            <NavDropdown key={3} title="Dropdown" id="basic-nav-dropdown">
              <LinkContainer to="/contact">
                <MenuItem key={3.1}>Contact</MenuItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <MenuItem key={3.2}>About</MenuItem>
              </LinkContainer>
              <LinkContainer to="/topics">
                <MenuItem key={3.3}>Topics</MenuItem>
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
              <LinkContainer to="/socket">
                <MenuItem key={8.1}>socket</MenuItem>
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

          {tokenId &&
          <p className="navbar-text">Logged in as <strong>{username}</strong>.</p>}

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
  (state) => ({token: state.token}),
  mapDispatchToProps
)(Header);


/**
 * TODO:
 * <Route exact path="/" render={() => (
 *       loggedIn ? (
 *         <Redirect to="/dashboard"/>
 *       ) : (
 *         <PublicHomePage/>
 *       )
 *     )}/>
 */
const Main = () => (
  <main style={{marginTop:20}}>
    <Switch>
      <Route exact path="/" component={MyApp.Home}/>
      <Route path="/todos" component={MyApp.Todos}/>
      <Route path="/about/" component={MyApp.About}/>
      <Route path="/counter/:counts?" component={MyApp.Counter}/>
      <Route path="/contact" component={MyApp.Contact}/>
      <Route path="/delegate" component={MyApp.Delegate}/>
      <Route path="/users" component={MyApp.Users}/>
      <Route path="/topics" component={MyApp.Topics}/>
      <Route path="/login" component={MyApp.Login}/>
      <Route path="/logout" component={MyApp.Login}/>
      <Route path="/psql"  component={PSQL} />
    </Switch>
  </main>
);

const Footer = ({footer}) => (
  <footer>
    <div {...footer}>&copy; william jiang - 2017</div>
  </footer>
)

const App = () => (
  <div className="container-fluid">
    <Header />
    <Main />
    <Footer />
  </div>
)

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;