let ottoman = require('../db').ottoman;

let PlaceModel = ottoman.model('Place', {
  placeID: {
    type:'string',
    auto:'uuid',
    readonly:true
  },
  createdON: {
    type: 'Date',
    default: new Date()
  },
  name: 'string',
  categories: ['string'],
  coordinates: {
    lat: 'number',
    lng: 'number'
  }
}, {
  index: {
    findByPlaceID:{				// ← refdoc index
      by:'placeID',
      type:'refdoc'
    },
    findByCategory: {					// ← refdoc index
      by: 'categories',
      type: 'refdoc'
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
