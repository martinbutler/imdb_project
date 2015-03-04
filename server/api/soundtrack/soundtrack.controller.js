'use strict';

var _ = require('lodash');
var Soundtrack = require('./soundtrack.model');

// Get list of soundtracks
exports.index = function(req, res) {
  Soundtrack.find(function (err, soundtracks) {
    if(err) { return handleError(res, err); }
    return res.json(200, soundtracks);
  });
};

// Get a single soundtrack
exports.show = function(req, res) {
  Soundtrack.findById(req.params.id, function (err, soundtrack) {
    if(err) { return handleError(res, err); }
    if(!soundtrack) { return res.send(404); }
    return res.json(soundtrack);
  });
};

// Creates a new soundtrack in the DB.
exports.create = function(req, res) {
  Soundtrack.create(req.body, function(err, soundtrack) {
    if(err) { return handleError(res, err); }
    return res.json(201, soundtrack);
  });
};

// Updates an existing soundtrack in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Soundtrack.findById(req.params.id, function (err, soundtrack) {
    if (err) { return handleError(res, err); }
    if(!soundtrack) { return res.send(404); }
    var updated = _.merge(soundtrack, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, soundtrack);
    });
  });
};

// Deletes a soundtrack from the DB.
exports.destroy = function(req, res) {
  Soundtrack.findById(req.params.id, function (err, soundtrack) {
    if(err) { return handleError(res, err); }
    if(!soundtrack) { return res.send(404); }
    soundtrack.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}