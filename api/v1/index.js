let express = require('express');
let router = express.Router();

let users = require('./users');
let places = require('./places');

router.use('/places', places);
router.use('/users', users);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    version: 'v1',
    routes: {
      places: '/places',
      users: '/users',
    }
  });
});

module.exports = router;
