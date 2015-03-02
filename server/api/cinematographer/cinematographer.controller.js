'use strict';

var _ = require('lodash');
var Cinematographer = require('./cinematographer.model');

// Get list of cinematographers
exports.index = function(req, res) {
  Cinematographer.find(function (err, cinematographers) {
    if(err) { return handleError(res, err); }
    return res.json(200, cinematographers);
  });
};

// Get a single cinematographer
exports.show = function(req, res) {
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if(err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    return res.json(cinematographer);
  });
};

// Creates a new cinematographer in the DB.
exports.create = function(req, res) {
  Cinematographer.create(req.body, function(err, cinematographer) {
    if(err) { return handleError(res, err); }
    return res.json(201, cinematographer);
  });
};

// Updates an existing cinematographer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if (err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    var updated = _.merge(cinematographer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, cinematographer);
    });
  });
};

// Deletes a cinematographer from the DB.
exports.destroy = function(req, res) {
  Cinematographer.findById(req.params.id, function (err, cinematographer) {
    if(err) { return handleError(res, err); }
    if(!cinematographer) { return res.send(404); }
    cinematographer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}