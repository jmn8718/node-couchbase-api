var express = require('express');
var router = express.Router();

var v1 = require('./v1');

router.use('/v1', v1);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'api', version: 'v1' });
});

module.exports = router;
