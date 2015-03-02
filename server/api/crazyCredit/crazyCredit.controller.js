'use strict';

var _ = require('lodash');
var CrazyCredit = require('./crazyCredit.model');

// Get list of crazyCredits
exports.index = function(req, res) {
  CrazyCredit.find(function (err, crazyCredits) {
    if(err) { return handleError(res, err); }
    return res.json(200, crazyCredits);
  });
};

// Get a single crazyCredit
exports.show = function(req, res) {
  CrazyCredit.findById(req.params.id, function (err, crazyCredit) {
    if(err) { return handleError(res, err); }
    if(!crazyCredit) { return res.send(404); }
    return res.json(crazyCredit);
  });
};

// Creates a new crazyCredit in the DB.
exports.create = function(req, res) {
  CrazyCredit.create(req.body, function(err, crazyCredit) {
    if(err) { return handleError(res, err); }
    return res.json(201, crazyCredit);
  });
};

// Updates an existing crazyCredit in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CrazyCredit.findById(req.params.id, function (err, crazyCredit) {
    if (err) { return handleError(res, err); }
    if(!crazyCredit) { return res.send(404); }
    var updated = _.merge(crazyCredit, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, crazyCredit);
    });
  });
};

// Deletes a crazyCredit from the DB.
exports.destroy = function(req, res) {
  CrazyCredit.findById(req.params.id, function (err, crazyCredit) {
    if(err) { return handleError(res, err); }
    if(!crazyCredit) { return res.send(404); }
    crazyCredit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}