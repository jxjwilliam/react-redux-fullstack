import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import MyApp from './containers/'

const Header = () => (
  <header>
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
      </ul>
    </nav>
  </header>
)

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