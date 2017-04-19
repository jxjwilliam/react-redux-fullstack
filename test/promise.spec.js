import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();
const {expect, assert} = chai;
import prettyjson from 'prettyjson'

describe('# Action API Test', () => {
  let fetchTodos;
  before(() => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    //need return delay()
    fetchTodos = (filter) => {
      return delay(500).then(() => {
        return [1, 2, 3, 4, 5];
      })
    }
  });

  // either use `return` or `done`
  it('should fetchTodos promise work', () => {
    return fetchTodos('all').then((todos) => {
      expect(todos).to.be.an('array');
    }); // no catch, it'll figure it out since the promise is rejected
  });

  // use return
  it('should promise works with return', () => {
    return expect(Promise.resolve('woof')).to.eventually.equal('woof');
  });

  // use done
  it('should promise works with done', (done) => {
    Promise.resolve(2 + 2).should.eventually.equal(4);
    done();
  });
});

//////////////////////////////////////

describe('Mocha', () => {
  it('works synchronously', () => {
    expect(true).to.equal(true)
  })

  it('works ansyncronously', done => {
    setTimeout(() => {
      expect(true).to.equal(true)
      done()
    }, 4)
  })

  it('throws errors synchronously', () => {
    return true
    throw new Error('it works')
  })

  it('throws errors ansyncronously', done => {
    setTimeout(() => {
      return done()
      done(new Error('it works'))
    }, 4)
  })

  it('uses promises', () => {
    var testPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello')
      }, 4)
    })

    testPromise.then(result => {
      expect(result).to.equal('Hello')
    }, reason => {
      throw new Error(reason)
    })
  })
})


//////////////////////////////////////

describe( 'my test', function() {
  it( 'should do something', function ( done ) {
    // done() is provided by it() to indicate asynchronous completion
    // call done() with no parameter to indicate that it() is done() and successful
    // or with an error to indicate that it() failed
    setTimeout( function () {
      // Called from the event loop, not it()
      // So only the event loop could capture uncaught exceptions from here
      try {
        expect( true ).to.equal( true ); //false
        done(); // success: call done with no parameter to indicate that it() is done()
      } catch( e ) {
        done( e ); // failure: call done with an error Object to indicate that it() failed
      }
    }, 100 );
    // returns immediately after setting timeout
    // so it() can no longer catch exception happening asynchronously
  });
});

/////////////////////////////////////////
function eventually(done, fn) {
  return (...args) => {
    try {
      fn(...args);
      done();
    } catch (err) {
      done(err);
    }
  };
};
describe("my async test", function() {
  it("should fail", function(done) {
    setTimeout(eventually(done, (param1, param2) => {
      assert.equal(param1, "foo");   // this should pass
      assert.equal(param2, "bar"); // bogus: this should fail
    }), 100, "foo", "bar");
  });
});