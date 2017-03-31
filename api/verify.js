let jwt = require('jsonwebtoken');

const SECRET_KEY = 'node-couchbase-api';

exports.getToken = function (user) {
    return jwt.sign(user, SECRET_KEY, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var admin = req.decoded._doc.admin;

    // decode token
    if (admin) {
        next();
    } else {
        // if there is no token
        // return an error
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};
