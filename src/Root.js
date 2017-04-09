import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MyApp from './containers/'
//<Route path="/(:filter)" component={App}/>

const router = (
  <Route path="/" component={MyApp.Home}>
    <IndexRoute component={MyApp.App}></IndexRoute>
    <Route path="/about" component={MyApp.About}></Route>
    <Route path="/counter" component={MyApp.Counter}></Route>
    <Route path="/contact" component={MyApp.Contact}></Route>
    <Route path="/phone" component={MyApp.Phone}></Route>
    <Route path="/todos" component={MyApp.Todos}></Route>
    <Route path="/users" component={MyApp.Users}></Route>
  </Route>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={ browserHistory }>
      {router}
    </Router>
  </Provider>
);

export default Root;