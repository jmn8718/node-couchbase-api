let express = require('express');
let router = express.Router();

let User = require('../../models/user');

router.post('/', function(req, res, next) {
  let user = new User(req.body);
  user.save((err) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.status(201);
    res.json(user);
  });
});

router.delete('/:id', function(req, res, next) {
  User.findByUserID(req.params.id, function(err, users) {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    if (users.length === 0) {
      return next({
        status: 404,
        message: "Not found"
      });
    }
    let user = users[0];
    user.remove((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(user);
    });
  })
});

router.put('/:id', function(req, res, next) {
  User.findByUserID(req.params.id, (err, users) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    if (users.length === 0) {
      return next({
        status: 404,
        message: "Not found"
      });
    }
    let user = users[0];
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    user.save((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(user);
    })
  })
});

router.get('/:id', function(req, res, next) {
  User.findByUserID(req.params.id, (err, users) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    if (users.length === 0) {
      return next({
        status: 404,
        message: "Not found"
      });
    }
    res.json(users[0]);
  })
});

router.get('/', function(req, res, next) {
  User.find(req.query, (err, users) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.json(users);
  });
});

module.exports = router;
