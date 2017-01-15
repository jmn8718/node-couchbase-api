let express = require('express');
let router = express.Router();

let v1 = require('./v1');

router.use('/v1', v1);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: 'node-couchbase-api',
    versions: ['v1'],
  });
});

module.exports = router;
