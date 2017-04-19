import chai, {expect} from 'chai'
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

import prettyjson from 'prettyjson'
const should = chai.should();

/**
 //http://localhost:8082/api/counter
 * LOG: '11111:', Error{crossDomain: true, status: undefined, method: 'get', url: 'http://localhost:8082/api/counter'}, undefined
 */
describe('#RestAPI Counter Test', () => {
  describe('/GET counter', () => {
    it('should get the counter', (done) => {
      chai.request('http://localhost:8081')
        .get('/api/counter')
        .end((err, res) => {
          console.log(prettyjson.render(res.text.length));
          console.log(prettyjson.render(res.body));
          res.should.have.status(200);
          res.body.should.be.a('object');
          //'counter: 45'
          res.body.hasOwnProperty('counter');
          done();
        })
    })
  });

  //PUT and POST all work, use `PUT` as higher priority.
  describe('/PUT counter', () => {
    it('should put the counter', (done) => {
      let counter = { counter: 18 };
      chai.request('http://localhost:8081')
        .put('/api/counter')
        .set('Accept', 'application/json')
        .send(counter)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })
  });

  //describe('/POST counter', () => {
  //  it('should put the counter', (done) => {
  //    let counter = { counter: 30 };
  //    chai.request('http://localhost:8081')
  //      .post('/api/counter')
  //      .send(counter)
  //      .end((err, res) => {
  //        console.log(prettyjson.render(err));
  //        console.log(prettyjson.render(res.body));
  //        res.body.should.be.a('object');
  //        res.should.have.status(200);
  //        done();
  //      })
  //  })
  //})

});
