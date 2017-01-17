let express = require('express');
let router = express.Router();

let users = require('./users');
let places = require('./places');
let posts = require('./posts');

router.use('/users', users);
router.use('/places', places);
router.use('/posts', posts);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    version: 'v1',
    routes: {
      users: '/users',
      places: '/places',
      posts: '/posts',
    }
  });
});

module.exports = router;
