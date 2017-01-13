var express = require('express');
var router = express.Router();

var Place = require('../../models/place');

router.post('/', function(req, res, next) {
  var place = new Place(req.body);

  place.save((err) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(place);
  });
});

router.get('/:id', function(req, res, next) {
  Place.findByPlaceID(req.params.id, function(err, place) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(place[0]);
  })
});

router.get('/', function(req, res, next) {
  console.log(req.query)
  Place.find(req.query, function(err, places) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(places);
  });
});

router.get('/category', function(req, res, next) {
  console.log(req.query)
  Place.findByCategory('house', function(err, places) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.json(places);
  });
});
module.exports = router;
