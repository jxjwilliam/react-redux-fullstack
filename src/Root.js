import React from 'react'
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

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={ history }>
      {router}
    </Router>
  </Provider>
);

export default Root;