let ottoman = require('../db').ottoman;
let validator = require('validator');
let User = require('./user');
let Place = require('./place');

let PostModel = ottoman.model('Post', {
  user: User,
  place: Place,
  title: 'string',
  body: 'string',
  timestamp: {
    type: 'Date',
    default: Date.now
  }
}, {
  queries: {
    placePost: {
      of: 'Post',
      by: 'place'
    },
    userPost: {
      of: 'Post',
      by: 'user'
    }
  }
});

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices POST', err);
  }
  console.log('Ensure indices POST');
});

module.exports = PostModel;
