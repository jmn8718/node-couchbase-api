let ottoman = require('../db').ottoman;
let User = require('./user');

let PlaceModel = ottoman.model('Place', {
  name: {
    type: 'string',
    default: ''
  },
  categories: [ 'string' ],
  coordinates: {
    lat: 'number',
    lng: 'number',
  },
  user: User
}, {
  index: {
    findByUser: {
      by: 'user',
      type: 'n1ql'
    }
  }
});

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices PLACE', err);
  }
  console.log('Ensure indices PLACE');
});

module.exports = PlaceModel;
