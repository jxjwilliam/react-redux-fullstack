import React, {Component}  from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <NavLink to={`${match.url}/rendering`} activeStyle={{fontWeight: 'bold', color: 'red'}}>
                    Rendering with React
                </NavLink>
            </li>
            <li>
                <NavLink to={`${match.url}/components`} activeStyle={{fontWeight: 'bold', color: 'red'}}>
                    Components
                </NavLink>
            </li>
            <li>
                <NavLink to={`${match.url}/props-v-state`} activeStyle={{fontWeight: 'bold', color: 'red'}}>
                    Props v. State
                </NavLink>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
    </div>
)

export default Topics;

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
