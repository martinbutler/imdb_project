'use strict';

var _ = require('lodash');
var Technical = require('./technical.model');

// Get list of technicals
exports.index = function(req, res) {
  Technical.find(function (err, technicals) {
    if(err) { return handleError(res, err); }
    return res.json(200, technicals);
  });
};

// Get a single technical
exports.show = function(req, res) {
  Technical.findById(req.params.id, function (err, technical) {
    if(err) { return handleError(res, err); }
    if(!technical) { return res.send(404); }
    return res.json(technical);
  });
};

// Creates a new technical in the DB.
exports.create = function(req, res) {
  Technical.create(req.body, function(err, technical) {
    if(err) { return handleError(res, err); }
    return res.json(201, technical);
  });
};

// Updates an existing technical in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Technical.findById(req.params.id, function (err, technical) {
    if (err) { return handleError(res, err); }
    if(!technical) { return res.send(404); }
    var updated = _.merge(technical, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, technical);
    });
  });
};

// Deletes a technical from the DB.
exports.destroy = function(req, res) {
  Technical.findById(req.params.id, function (err, technical) {
    if(err) { return handleError(res, err); }
    if(!technical) { return res.send(404); }
    technical.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}