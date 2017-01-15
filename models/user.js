let ottoman = require('../db').ottoman;
let validator = require('validator');

let UserModel = ottoman.model('User', {
  userID: {
    type: 'string',
    auto: 'uuid',
    readonly: true
  },
  createdON: {
    type: 'Date',
    auto: new Date(),
    readonly: true
  },
  name: 'string',
  password: 'string',
  email: {
    type:'string',
    validator: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error('Phone number is invalid.');
      }
    }
  },
}, {
  index: {
    findByUserID:{				// ← refdoc index
      by:'userID',
      type:'refdoc'
    },
    findByEmail: {					// ← refdoc index
      by: 'email',
      type: 'refdoc'
    }
  }
});

// ottoman.ensureIndices(function(err) {
//   if (err) {
//     return console.error('Error ensure indices USER', err);
//   }
//   console.log('Ensure indices USER');
// });

module.exports = UserModel;
