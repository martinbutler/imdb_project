'use strict';

var _ = require('lodash');
var ReleaseDate = require('./releaseDate.model');

// Get list of releaseDates
exports.index = function(req, res) {
  ReleaseDate.find(function (err, releaseDates) {
    if(err) { return handleError(res, err); }
    return res.json(200, releaseDates);
  });
};

// Get a single releaseDate
exports.show = function(req, res) {
  ReleaseDate.findById(req.params.id, function (err, releaseDate) {
    if(err) { return handleError(res, err); }
    if(!releaseDate) { return res.send(404); }
    return res.json(releaseDate);
  });
};

// Creates a new releaseDate in the DB.
exports.create = function(req, res) {
  ReleaseDate.create(req.body, function(err, releaseDate) {
    if(err) { return handleError(res, err); }
    return res.json(201, releaseDate);
  });
};

// Updates an existing releaseDate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ReleaseDate.findById(req.params.id, function (err, releaseDate) {
    if (err) { return handleError(res, err); }
    if(!releaseDate) { return res.send(404); }
    var updated = _.merge(releaseDate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, releaseDate);
    });
  });
};

// Deletes a releaseDate from the DB.
exports.destroy = function(req, res) {
  ReleaseDate.findById(req.params.id, function (err, releaseDate) {
    if(err) { return handleError(res, err); }
    if(!releaseDate) { return res.send(404); }
    releaseDate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}