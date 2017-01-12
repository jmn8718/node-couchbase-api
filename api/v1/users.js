var express = require('express');
var router = express.Router();

var User = require('../../models/user');

router.post('/', function(req, res, next) {
  var user = new User({
    name: 'jose',
    email: 'jose@jose.com',
    password: 'jose'
  });
  console.log(user);
  user.save(function(err) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(user);
  });
});

router.get('/:id', function(req, res, next) {
  User.findByUserID(req.params.id, function(err, user) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(user[0]);
  })
});

router.get('/', function(req, res, next) {
  console.log(req.query)
  User.find(req.query, function(err, users) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(users);
  });
});

module.exports = router;
