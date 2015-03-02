'use strict';

var _ = require('lodash');
var CompleteCrew = require('./completeCrew.model');

// Get list of completeCrews
exports.index = function(req, res) {
  CompleteCrew.find(function (err, completeCrews) {
    if(err) { return handleError(res, err); }
    return res.json(200, completeCrews);
  });
};

// Get a single completeCrew
exports.show = function(req, res) {
  CompleteCrew.findById(req.params.id, function (err, completeCrew) {
    if(err) { return handleError(res, err); }
    if(!completeCrew) { return res.send(404); }
    return res.json(completeCrew);
  });
};

// Creates a new completeCrew in the DB.
exports.create = function(req, res) {
  CompleteCrew.create(req.body, function(err, completeCrew) {
    if(err) { return handleError(res, err); }
    return res.json(201, completeCrew);
  });
};

// Updates an existing completeCrew in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CompleteCrew.findById(req.params.id, function (err, completeCrew) {
    if (err) { return handleError(res, err); }
    if(!completeCrew) { return res.send(404); }
    var updated = _.merge(completeCrew, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, completeCrew);
    });
  });
};

// Deletes a completeCrew from the DB.
exports.destroy = function(req, res) {
  CompleteCrew.findById(req.params.id, function (err, completeCrew) {
    if(err) { return handleError(res, err); }
    if(!completeCrew) { return res.send(404); }
    completeCrew.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}