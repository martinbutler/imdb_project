'use strict';

var _ = require('lodash');
var Distributor = require('./distributor.model');

// Get list of distributors
exports.index = function(req, res) {
  Distributor.find(function (err, distributors) {
    if(err) { return handleError(res, err); }
    return res.json(200, distributors);
  });
};

// Get a single distributor
exports.show = function(req, res) {
  Distributor.findById(req.params.id, function (err, distributor) {
    if(err) { return handleError(res, err); }
    if(!distributor) { return res.send(404); }
    return res.json(distributor);
  });
};

// Creates a new distributor in the DB.
exports.create = function(req, res) {
  Distributor.create(req.body, function(err, distributor) {
    if(err) { return handleError(res, err); }
    return res.json(201, distributor);
  });
};

// Updates an existing distributor in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Distributor.findById(req.params.id, function (err, distributor) {
    if (err) { return handleError(res, err); }
    if(!distributor) { return res.send(404); }
    var updated = _.merge(distributor, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, distributor);
    });
  });
};

// Deletes a distributor from the DB.
exports.destroy = function(req, res) {
  Distributor.findById(req.params.id, function (err, distributor) {
    if(err) { return handleError(res, err); }
    if(!distributor) { return res.send(404); }
    distributor.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}