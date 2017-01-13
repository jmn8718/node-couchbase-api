//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var User = require('../models/user');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var should = chai.should();

chai.use(chaiHttp);

describe('/users', () => {
  before((done) => {
    console.log('before')
    User.find({}, (err, results) => {
      if (err) {
        done(err);
      }
      results.forEach((result) => {
        result.remove((err) => {
          if (err) {
            done(err);
          }
        });
      });
      done();
    })
  });

  it('it should GET all users', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      var body = {
        name: 'user_test1',
        email: 'email_test@email.com'
      };
      chai.request(server)
        .post('/api/v1/users')
        .send(body)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('userID');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('createdON');
    //       done()
          console.log(res.body)
        });
    // });
    //
    // it('it should GET all users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          console.log(res.body)
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  })
})
