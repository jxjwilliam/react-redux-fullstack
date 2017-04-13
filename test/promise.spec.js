import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();
const {expect, assert} = chai;

import {fetchTodos, addTodo, toggleTodo, getFakerData} from '../src/actions/Todos/api'

describe('# Action API Test', () => {

  it("should be accessilble", () => {
    expect(fetchTodos).to.be.a('function');
  });

  it('should getFakerData return todos data', () => {
    let todos = getFakerData(6);
    //console.log(JSON.stringify(todos));
    expect(todos).to.be.an('array')
  });

  it('should promise delay works', () => {
    return expect(Promise.resolve('woof')).to.eventually.equal('woof');
  });

  it('should use done instead of return works', (done) => {
    Promise.resolve(2 + 2).should.eventually.equal(4);
    done();
  });

  // either use `return` or `done`
  it('should fetchTodos promise work', () => {
    return fetchTodos('all').then(todos => {
      console.log('todos: ', JSON.stringify(todos));
      expect(todos).to.be.an('array');
    }); // no catch, it'll figure it out since the promise is rejected

  });
});