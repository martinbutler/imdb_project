'use strict';

var _ = require('lodash');
var RunningTime = require('./runningTime.model');

// Get list of runningTimes
exports.index = function(req, res) {
  RunningTime.find(function (err, runningTimes) {
    if(err) { return handleError(res, err); }
    return res.json(200, runningTimes);
  });
};

// Get a single runningTime
exports.show = function(req, res) {
  RunningTime.findById(req.params.id, function (err, runningTime) {
    if(err) { return handleError(res, err); }
    if(!runningTime) { return res.send(404); }
    return res.json(runningTime);
  });
};

// Creates a new runningTime in the DB.
exports.create = function(req, res) {
  RunningTime.create(req.body, function(err, runningTime) {
    if(err) { return handleError(res, err); }
    return res.json(201, runningTime);
  });
};

// Updates an existing runningTime in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  RunningTime.findById(req.params.id, function (err, runningTime) {
    if (err) { return handleError(res, err); }
    if(!runningTime) { return res.send(404); }
    var updated = _.merge(runningTime, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, runningTime);
    });
  });
};

// Deletes a runningTime from the DB.
exports.destroy = function(req, res) {
  RunningTime.findById(req.params.id, function (err, runningTime) {
    if(err) { return handleError(res, err); }
    if(!runningTime) { return res.send(404); }
    runningTime.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}