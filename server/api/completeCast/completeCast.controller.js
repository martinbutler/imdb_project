'use strict';

var _ = require('lodash');
var CompleteCast = require('./completeCast.model');

// Get list of completeCasts
exports.index = function(req, res) {
  CompleteCast.find(function (err, completeCasts) {
    if(err) { return handleError(res, err); }
    return res.json(200, completeCasts);
  });
};

// Get a single completeCast
exports.show = function(req, res) {
  CompleteCast.findById(req.params.id, function (err, completeCast) {
    if(err) { return handleError(res, err); }
    if(!completeCast) { return res.send(404); }
    return res.json(completeCast);
  });
};

// Creates a new completeCast in the DB.
exports.create = function(req, res) {
  CompleteCast.create(req.body, function(err, completeCast) {
    if(err) { return handleError(res, err); }
    return res.json(201, completeCast);
  });
};

// Updates an existing completeCast in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CompleteCast.findById(req.params.id, function (err, completeCast) {
    if (err) { return handleError(res, err); }
    if(!completeCast) { return res.send(404); }
    var updated = _.merge(completeCast, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, completeCast);
    });
  });
};

// Deletes a completeCast from the DB.
exports.destroy = function(req, res) {
  CompleteCast.findById(req.params.id, function (err, completeCast) {
    if(err) { return handleError(res, err); }
    if(!completeCast) { return res.send(404); }
    completeCast.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}