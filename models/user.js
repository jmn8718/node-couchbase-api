let ottoman = require('../db').ottoman;
let validator = require('validator');

let UserModel = ottoman.model('User', {
  name: 'string',
  password: 'string',
  email: {
    type: 'string',
    validator: (email) => {
      if (!email) {
        throw new Error('Required email');
      } else if (!validator.isEmail(email)) {
        throw new Error('Email is invalid.');
      }
    }
  },
}, {
  index: {
    findByEmail: {					// ← refdoc index
      by: 'email',
      type: 'refdoc'
    }
  }
});

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices USER', err);
  }
  console.log('Ensure indices USER');
});

module.exports = UserModel;
