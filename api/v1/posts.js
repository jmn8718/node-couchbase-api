let express = require('express');
let router = express.Router();

let Post = require('../../models/post');
let User = require('../../models/user');
let Place = require('../../models/place');

router.post('/', function(req, res, next) {
  if (!req.body.user) {
    return next({
      status: 400,
      message: 'User is a required field'
    })
  }
  if (!req.body.place) {
    return next({
      status: 400,
      message: 'Place is a required field'
    })
  }

  User.getById(req.body.user, (err, user) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }

    Place.getById(req.body.place, (err, place) => {
      if (err) {
        return next({
          status: 404,
          message: err.message
        });
      }

      let post = new Post(req.body);
      post.user = user;
      post.place = place;
      post.save((err) => {
        if (err) {
          return next({
            status: 400,
            message: err.message
          });
        }
        res.status(201);
        res.json(post);
      });
    })

  });
  let post = new Post(req.body);
  post.save((err) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.status(201);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Post.getById(req.params.id, function(err, post) {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    post.remove((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(post);
    });
  })
});

router.put('/:id', function(req, res, next) {
  Post.getById(req.params.id, (err, post) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    if (req.body.name) {
      post.name = req.body.name;
    }
    if (req.body.email) {
      post.email = req.body.email;
    }

    post.save((err) => {
      if (err) {
        return next({
          status: 400,
          message: err.message
        });
      }
      res.json(post);
    })
  })
});

router.get('/:id', function(req, res, next) {
  Post.getById(req.params.id, (err, post) => {
    if (err) {
      return next({
        status: 404,
        message: err.message
      });
    }
    res.json(post);
  })
});

router.get('/', function(req, res, next) {
  Post.find(req.query, (err, posts) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.json(posts);
  });
});

module.exports = router;
