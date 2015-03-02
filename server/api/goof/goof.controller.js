'use strict';

var _ = require('lodash');
var Goof = require('./goof.model');

// Get list of goofs
exports.index = function(req, res) {
  Goof.find(function (err, goofs) {
    if(err) { return handleError(res, err); }
    return res.json(200, goofs);
  });
};

// Get a single goof
exports.show = function(req, res) {
  Goof.findById(req.params.id, function (err, goof) {
    if(err) { return handleError(res, err); }
    if(!goof) { return res.send(404); }
    return res.json(goof);
  });
};

// Creates a new goof in the DB.
exports.create = function(req, res) {
  Goof.create(req.body, function(err, goof) {
    if(err) { return handleError(res, err); }
    return res.json(201, goof);
  });
};

// Updates an existing goof in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Goof.findById(req.params.id, function (err, goof) {
    if (err) { return handleError(res, err); }
    if(!goof) { return res.send(404); }
    var updated = _.merge(goof, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, goof);
    });
  });
};

// Deletes a goof from the DB.
exports.destroy = function(req, res) {
  Goof.findById(req.params.id, function (err, goof) {
    if(err) { return handleError(res, err); }
    if(!goof) { return res.send(404); }
    goof.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}