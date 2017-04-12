import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();
const {expect, assert} = chai;

import {fetchTodos, addTodo, toggleTodo, getFakerData} from '../src/actions/api'

describe('# Action API test', () => {
  it("should be accessilble", () => {
    expect(fetchTodos).to.be.a('function');
  });

  it('should delay work', () => {
    //return expect(Promise.resolve('woof')).to.eventually.equal('woof');
    //return Promise.resolve(2 + 2).should.eventually.equal(4);
    //var abc = getFakerData(6);
    fetchTodos('all').then(todos => console.log('tttttt898489349834'));
  })
});