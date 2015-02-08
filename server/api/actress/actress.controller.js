'use strict';

var _ = require('lodash');
var Actress = require('./actress.model');

// Get list of actresss
exports.index = function(req, res) {
  Actress.find(function (err, actresss) {
    if(err) { return handleError(res, err); }
    return res.json(200, actresss);
  });
};

// Get a single actress
exports.show = function(req, res) {
  Actress.findById(req.params.id, function (err, actress) {
    if(err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    return res.json(actress);
  });
};

// Creates a new actress in the DB.
exports.create = function(req, res) {
  Actress.create(req.body, function(err, actress) {
    if(err) { return handleError(res, err); }
    return res.json(201, actress);
  });
};

// Updates an existing actress in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Actress.findById(req.params.id, function (err, actress) {
    if (err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    var updated = _.merge(actress, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, actress);
    });
  });
};

// Deletes a actress from the DB.
exports.destroy = function(req, res) {
  Actress.findById(req.params.id, function (err, actress) {
    if(err) { return handleError(res, err); }
    if(!actress) { return res.send(404); }
    actress.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}