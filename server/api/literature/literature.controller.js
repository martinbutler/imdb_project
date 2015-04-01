'use strict';

var _ = require('lodash');
var Literature = require('./literature.model');

// Get list of literatures
exports.index = function(req, res) {
  Literature.find(function (err, literatures) {
    if(err) { return handleError(res, err); }
    return res.json(200, literatures);
  });
};

// Get a single literature
exports.show = function(req, res) {
  Literature.findById(req.params.id, function (err, literature) {
    if(err) { return handleError(res, err); }
    if(!literature) { return res.send(404); }
    return res.json(literature);
  });
};

// Creates a new literature in the DB.
exports.create = function(req, res) {
  Literature.create(req.body, function(err, literature) {
    if(err) { return handleError(res, err); }
    return res.json(201, literature);
  });
};

// Updates an existing literature in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Literature.findById(req.params.id, function (err, literature) {
    if (err) { return handleError(res, err); }
    if(!literature) { return res.send(404); }
    var updated = _.merge(literature, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, literature);
    });
  });
};

// Deletes a literature from the DB.
exports.destroy = function(req, res) {
  Literature.findById(req.params.id, function (err, literature) {
    if(err) { return handleError(res, err); }
    if(!literature) { return res.send(404); }
    literature.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}