let config = require('./config');
let couchbase = require('couchbase');

let endpoint = config.couchbase.endpoint;
let bucket = config.couchbase.bucket;
let myCluster = new couchbase.Cluster(endpoint, function(err) {
  if (err) {
    console.log("Can't connect to couchbase: %s", err);
  }
  console.log('connected to db %s', endpoint);
});

let myBucket = myCluster.openBucket(bucket, function(err) {
  if (err) {
    console.log("Can't connect to bucket: %s", err);
  }
  console.log('connected to bucket %s', bucket);
});

let ottoman = require('ottoman');
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);

module.exports = {
  bucket: myBucket,
  ottoman: ottoman
};

// let User = require('../models/user');
// let Place = require('../models/place');
//
// ottoman.ensureIndices(function(err) {
//   if (err) {
//     console.log('failed to created neccessary indices', err);
//     return;
//   }
//
//   console.log('ottoman indices are ready for use!');
// });
