var db = require('../db');
var couchbase = require('couchbase');
var ottoman = require('ottoman');
ottoman.store = new ottoman.CbStoreAdapter(db.bucket, couchbase);

var UserModel = ottoman.model('User', {
  userID: {
    type:'string',
    auto:'uuid',
    readonly:true
  },
  createdON: {
    type: 'Date',
    default:new Date()
  },
  name: 'string',
  email: 'string',
  password: 'string',
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

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices USER', err);
  }
  console.log('Ensure indices USER');
});

module.exports = UserModel;
