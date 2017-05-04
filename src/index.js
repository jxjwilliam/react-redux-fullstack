import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import Root from './Root';
import configureStore from './configureStore'

import io from 'socket.io-client'

const store = configureStore();

function initSocket() {
  const socket = io('', {path: '/ws'});
  socket.on('news', (data) => {
    socket.emit('socket emit in on news', { my: 'data from client - index-socket'})
  });
  socket.on('msg', (data) => {
    console.log(data)
  });
  return socket;
}
global.socket = initSocket();

render(
  <Root store={store} />,
  document.getElementById('root')
)
