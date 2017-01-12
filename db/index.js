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

module.exports = {
  bucket: myBucket
};
