import React, { Component } from 'react'
import App from './todomvc/containers/App'
import 'todomvc-app-css/index.css'

/**
 * 1. import styles from './...css'
 * styles.header, styles.content...
 * 2. import bg from '../../header-bk.png';
 * <div style={{{background: `#FFF url(${bg}) center`}} className={styles.footer}>
 */
class PSQL extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <App/>
      </div>
    )
  }
}

export default PSQL;