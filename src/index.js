import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './configureStore'
import Root from './Root';

const configStore = configureStore()

render(
  <Root store={configStore.store} history={configStore.history} />,
  document.getElementById('root')
)
