import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexxRoute, browserHistory } from 'react-router'
import App from './containers/App'

const Root = ({ store }) => (
    <Provider store={store}>
        <Router history={ browserHistory }>
            <Route path="/(:filter)" component={App} />
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
}

export default Root;