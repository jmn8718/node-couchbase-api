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
    User.find({}, (err, results) => {
      if (err) {
        done(err);
      }
      results.forEach((result) => {
        console.log('remove', result)
        result.remove((err) => {
          if (err) {
            done(err);
          }
        });
      });
      done();
    })
  });

  beforeEach((done) => {
    setTimeout(done, 500);
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
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          done()
        });
    });

    it('it should GET all users, have 1', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });

    it('it should get a user', (done) => {
      let user;
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          user = res.body[0];
          chai.request(server)
            .get(`/api/v1/users/${user._id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body._id.should.be.eql(user._id);
              res.body.should.have.property('name');
              res.body.name.should.be.eql(user.name);
              res.body.should.have.property('email');
              res.body.email.should.be.eql(user.email);
              done();
            });
        });
    })

    it('it should update a user', (done) => {
      let user;
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          user = res.body[0];

          let newUser = {
            name: 'user_test2',
            email: 'email_test2@email.com'
          };
          chai.request(server)
            .put(`/api/v1/users/${user._id}`)
            .send(newUser)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('_id');
              res.body._id.should.be.eql(user._id);
              res.body.should.have.property('name');
              res.body.name.should.be.eql(newUser.name);
              res.body.should.have.property('email');
              res.body.email.should.be.eql(newUser.email);
              done()
            });
          });
      })

      it('it should remove a user', (done) => {
        let user;
        chai.request(server)
          .get('/api/v1/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            user = res.body[0];
            chai.request(server)
              .delete(`/api/v1/users/${user._id}`)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body._id.should.be.eql(user._id);
                res.body.should.have.property('name');
                res.body.name.should.be.eql(user.name);
                res.body.should.have.property('email');
                res.body.email.should.be.eql(user.email);
                chai.request(server)
                  .get('/api/v1/users')
                  .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                  });
              });
          });
    })
  })
})
