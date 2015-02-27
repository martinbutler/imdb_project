'use strict';

var _ = require('lodash');
var Writer = require('./writer.model');

// Get list of writers
exports.index = function(req, res) {
  Writer.find(function (err, writers) {
    if(err) { return handleError(res, err); }
    return res.json(200, writers);
  });
};

// Get a single writer
exports.show = function(req, res) {
  Writer.findById(req.params.id, function (err, writer) {
    if(err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    return res.json(writer);
  });
};

// Creates a new writer in the DB.
exports.create = function(req, res) {
  Writer.create(req.body, function(err, writer) {
    if(err) { return handleError(res, err); }
    return res.json(201, writer);
  });
};

// Updates an existing writer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Writer.findById(req.params.id, function (err, writer) {
    if (err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    var updated = _.merge(writer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, writer);
    });
  });
};

// Deletes a writer from the DB.
exports.destroy = function(req, res) {
  Writer.findById(req.params.id, function (err, writer) {
    if(err) { return handleError(res, err); }
    if(!writer) { return res.send(404); }
    writer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}