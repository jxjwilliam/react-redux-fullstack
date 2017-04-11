import React from 'react'
import { Provider } from 'react-redux'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import MyApp from './containers/'
//<Route path="/(:filter)" component={App}/>

// <Route path="/todos" component={MyApp.Todos}></Route>
const router = (
    <Route path="/" component={MyApp.Home}>
        <IndexRoute component={MyApp.Todos}></IndexRoute>
        <Route path="/about" component={MyApp.About}></Route>
        <Route path="/counter" component={MyApp.Counter}></Route>
        <Route path="/contact" component={MyApp.Contact}></Route>
        <Route path="/delegate" component={MyApp.Delegate}></Route>
        <Route path="/users" component={MyApp.Users}></Route>
    </Route>
);

/**
 * <Router history={browserHistory} routes={routes} />
 <Route path="posts/new" component={PostsNew} />
 <Route path="posts/:id" component={PostsShow} />
 <Route path="/validateEmail/:token" component={ValidateEmail} />
 */
const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={ browserHistory } routes={router}/>
    </Provider>
);

export default Root;