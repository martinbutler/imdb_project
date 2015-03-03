'use strict';

var _ = require('lodash');
var Trivia = require('./trivia.model');

// Get list of trivias
exports.index = function(req, res) {
  Trivia.find(function (err, trivias) {
    if(err) { return handleError(res, err); }
    return res.json(200, trivias);
  });
};

// Get a single trivia
exports.show = function(req, res) {
  Trivia.findById(req.params.id, function (err, trivia) {
    if(err) { return handleError(res, err); }
    if(!trivia) { return res.send(404); }
    return res.json(trivia);
  });
};

// Creates a new trivia in the DB.
exports.create = function(req, res) {
  Trivia.create(req.body, function(err, trivia) {
    if(err) { return handleError(res, err); }
    return res.json(201, trivia);
  });
};

// Updates an existing trivia in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Trivia.findById(req.params.id, function (err, trivia) {
    if (err) { return handleError(res, err); }
    if(!trivia) { return res.send(404); }
    var updated = _.merge(trivia, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, trivia);
    });
  });
};

// Deletes a trivia from the DB.
exports.destroy = function(req, res) {
  Trivia.findById(req.params.id, function (err, trivia) {
    if(err) { return handleError(res, err); }
    if(!trivia) { return res.send(404); }
    trivia.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}