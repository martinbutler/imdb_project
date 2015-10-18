'use strict';

var _ = require('lodash');
var Producer = require('./producer.model');



// Get distinct of values from name field
exports.distinctProducers = function(req, res) {
  var r = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Producer.aggregate([{$match: {name: {$regex:r}}},
                  {$group: {_id: '$name', titleSum:{$sum:1}}}],
                  function (err, producerNames) {

    console.log('producer count', producerNames.length);
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, producerNames);
  });
};

// Get title and roles of an actress
exports.producerTitles = function(req, res) {
  var start = Date.now();
  Producer.find({
    name: req.params.name
  }, function(err, producerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, producerRecords);
  });
};

// actorsByTitles
exports.producerByTitles = function(req, res) {
  var start = Date.now();
  Producer.find({
    title: req.params.title
  }, function(err, producerRecords) {
    var end =  Date.now();
    console.log('time', end-start)
    if(err) { return handleError(res, err); }
    return res.json(200, producerRecords);
  });
};

// Get list of producers and titles matching on partial name and partial title
exports.combinedNameAndTitleSearch = function(req, res) {
  var r1 = new RegExp(req.params.title, 'i');
  var r2 = new RegExp(req.params.name, 'i');
  var start = Date.now();
  Producer.find({
      title: {$regex:r1},
      name: {$regex:r2}
  }, function (err, producersAndTitles) {
    var end =  Date.now();
    console.log('time', end - start);
    if(err) { return handleError(res, err); }
    return res.json(200, producersAndTitles);
  });
};



// Get list of producers
exports.index = function(req, res) {
  Producer.find(function (err, producers) {
    if(err) { return handleError(res, err); }
    return res.json(200, producers);
  });
};

// Get a single producer
exports.show = function(req, res) {
  Producer.findById(req.params.id, function (err, producer) {
    if(err) { return handleError(res, err); }
    if(!producer) { return res.send(404); }
    return res.json(producer);
  });
};

// Creates a new producer in the DB.
exports.create = function(req, res) {
  Producer.create(req.body, function(err, producer) {
    if(err) { return handleError(res, err); }
    return res.json(201, producer);
  });
};

// Updates an existing producer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Producer.findById(req.params.id, function (err, producer) {
    if (err) { return handleError(res, err); }
    if(!producer) { return res.send(404); }
    var updated = _.merge(producer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, producer);
    });
  });
};

// Deletes a producer from the DB.
exports.destroy = function(req, res) {
  Producer.findById(req.params.id, function (err, producer) {
    if(err) { return handleError(res, err); }
    if(!producer) { return res.send(404); }
    producer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
