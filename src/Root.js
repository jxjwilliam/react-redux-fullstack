import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MyApp from './containers/'
import PSQL from './psql/'
import SocketRedis from './socket-redis/'
import {BasicRMQ} from './rabbitMq/'
import {VotingContainer, ResultsContainer} from './rabbitMq/votes/container';
import {Header, Footer, NotFound} from './components/'

/**
 * TODO:
 * <Route exact path="/" render={() => (
 *   loggedIn ? <Redirect to="/dashboard"/> : <PublicHomePage/>
 * )/>
 */
const Main = () => (
  <main style={{marginTop:20}}>
    <Switch>
      <Route exact path="/" component={MyApp.Home}/>
      <Route path="/todos" component={MyApp.Todos}/>
      <Route path="/about/:name?" component={MyApp.About}/>
      <Route path="/counter/:counts?" component={MyApp.Counter}/>
      <Route path="/contact" component={MyApp.Contact}/>
      <Route path="/delegate" component={MyApp.Delegate}/>
      <Route path="/users" component={MyApp.Users}/>
      <Route path="/topics" component={MyApp.Topics}/>
      <Route path="/login" component={MyApp.Login}/>
      <Route path="/logout" component={MyApp.Login}/>
      <Route path="/psql" component={PSQL}/>
      <Route path="/socket-redis" component={SocketRedis.RedisPubSub}/>
      <Route path="/chat" component={SocketRedis.Chat}/>

      <Route path="/rabbitmq" component={BasicRMQ}/>
      <Route path="/votes/results" component={ResultsContainer}/>
      <Route path="/vote" component={VotingContainer}/>

      <Route component={NotFound}/>
    </Switch>
  </main>
);

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