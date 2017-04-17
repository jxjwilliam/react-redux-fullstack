import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './Root';
import configureStore from './configureStore1'

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('root')
)
