import React from 'react'
import {expect} from 'chai'
import Root from '../src/Root';
import configureStore from '../src/configureStore'

describe('# Component Test', () => {
  it('React, Root are accessible',  () => {
    expect(React).to.be.an('object');
    expect(Root).to.be.a('function');
  });
});

describe('# Store test', () => {
  it('store is accessbile', () => {
    const store = configureStore();
    expect(store.dispatch).to.be.a('function')
    expect(store.subscribe).to.be.a('function')
    expect(store.getState).to.be.a('function')
    expect(store.replaceReducer).to.be.a('function');
    //expect(store['@@observable']).to.be.a('function');
    expect(store).to.have.ownProperty('dispatch');
  });
});