'use strict';

var _ = require('lodash');
var MpaaRatingsReason = require('./mpaaRatingsReason.model');

// Get list of mpaaRatingsReasons
exports.index = function(req, res) {
  MpaaRatingsReason.find(function (err, mpaaRatingsReasons) {
    if(err) { return handleError(res, err); }
    return res.json(200, mpaaRatingsReasons);
  });
};

// Get a single mpaaRatingsReason
exports.show = function(req, res) {
  MpaaRatingsReason.findById(req.params.id, function (err, mpaaRatingsReason) {
    if(err) { return handleError(res, err); }
    if(!mpaaRatingsReason) { return res.send(404); }
    return res.json(mpaaRatingsReason);
  });
};

// Creates a new mpaaRatingsReason in the DB.
exports.create = function(req, res) {
  MpaaRatingsReason.create(req.body, function(err, mpaaRatingsReason) {
    if(err) { return handleError(res, err); }
    return res.json(201, mpaaRatingsReason);
  });
};

// Updates an existing mpaaRatingsReason in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MpaaRatingsReason.findById(req.params.id, function (err, mpaaRatingsReason) {
    if (err) { return handleError(res, err); }
    if(!mpaaRatingsReason) { return res.send(404); }
    var updated = _.merge(mpaaRatingsReason, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, mpaaRatingsReason);
    });
  });
};

// Deletes a mpaaRatingsReason from the DB.
exports.destroy = function(req, res) {
  MpaaRatingsReason.findById(req.params.id, function (err, mpaaRatingsReason) {
    if(err) { return handleError(res, err); }
    if(!mpaaRatingsReason) { return res.send(404); }
    mpaaRatingsReason.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}