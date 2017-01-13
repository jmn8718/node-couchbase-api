var express = require('express');
var router = express.Router();

var users = require('./users');
var places = require('./places');

router.use('/places', places);
router.use('/users', users);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api v1' });
});

module.exports = router;
