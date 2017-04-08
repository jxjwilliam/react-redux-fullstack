import React from 'react'
import PropTypes from 'prop-types';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MyDemo from './containers/'
//<Route path="/(:filter)" component={App}/>

const router = (
  <Route path="/" component={MyDemo.Home}>
    <IndexRoute component={MyDemo.App}></IndexRoute>
    <Route path="/about" component={MyDemo.About}></Route>
    <Route path="/counter" component={MyDemo.Counter}></Route>
    <Route path="/demo" component={MyDemo.Demo}></Route>
    <Route path="/phone" component={MyDemo.Phone}></Route>
    <Route path="/todos" component={MyDemo.Todos}></Route>
    <Route path="/users" component={MyDemo.Users}></Route>
  </Route>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={ browserHistory }>
      {router}
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;