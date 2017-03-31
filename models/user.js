let ottoman = require('../db').ottoman;
let validator = require('validator');
var bcrypt = require('bcrypt');

let UserModel = ottoman.model('User', {
  name: 'string',
  password: {
    type: 'string',
    validator: (password) => {
      if (!password) {
        throw new Error('Required password');
      }
    }
  },
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

UserModel.pre("save", function(user, next) {
  var u = user.toJSON();
  console.log(typeof user)
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
  // console.log('next', next)
  // next();
});

ottoman.ensureIndices(function(err) {
  if (err) {
    return console.error('Error ensure indices USER', err);
  }
  console.log('Ensure indices USER');
});

module.exports = UserModel;
