import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import MyApp from './containers/'

const Header = () => (
  <header>
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink to="/" activeStyle={{color: '#33e0ff'}}>App</NavLink>
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
            <LinkContainer to="/">
              <MenuItem key={3.4}>More...</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <LinkContainer to="/users">
            <NavItem key={4}>Users</NavItem>
          </LinkContainer>
          <LinkContainer to="/login">
            <NavItem key={5}>Login</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    { /*
     <nav className="navbar navbar-inverse navbar-fixed-top">
     <ul className="nav navbar-nav">
     <li><Link to="/">App</Link></li>
     <li><Link to="/counter">Counter</Link></li>
     <li><Link to="/contact">Contact</Link></li>
     <li><Link to="/delegate">Delegate</Link></li>
     <li><Link to="/todos">Todos</Link></li>
     <li><Link to="/users">Users</Link></li>
     <li><Link to="/about">About</Link></li>
     <li><Link to="/topics">Topics</Link></li>
     <li><Link to="/login">Login</Link></li>
     </ul>
     </nav>    */}

  </header>
)
/**
 * TODO:
 * <Route exact path="/" render={() => (
        loggedIn ? (
          <Redirect to="/dashboard"/>
        ) : (
          <PublicHomePage/>
        )
      )}/>
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
    </Switch>
  </main>
);

const Footer = ({footer}) => (
  <footer>
    <div {...footer}>&copy; william jiang - 2017</div>
  </footer>
)

const App = () => (
  <div className="container">
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