'use strict';

var _ = require('lodash');
var Producer = require('./producer.model');

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