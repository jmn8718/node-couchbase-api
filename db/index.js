var config = require('./config');
var couchbase = require('couchbase');

var endpoint = config.couchbase.endpoint;
var bucket = config.couchbase.bucket;
var myCluster = new couchbase.Cluster(endpoint, function(err) {
  if (err) {
    console.log("Can't connect to couchbase: %s", err);
  }
  console.log('connected to db %s', endpoint);
});

var myBucket = myCluster.openBucket(bucket, function(err) {
  if (err) {
    console.log("Can't connect to bucket: %s", err);
  }
  console.log('connected to bucket %s', bucket);
});

var ottoman = require('ottoman');
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);

module.exports = {
  bucket: myBucket,
  ottoman: ottoman
};

var User = require('../models/user');
var Place = require('../models/place');

ottoman.ensureIndices(function(err) {
  if (err) {
    console.log('failed to created neccessary indices', err);
    return;
  }

  console.log('ottoman indices are ready for use!');
});
