'use strict';

var _ = require('lodash');
var Business = require('./business.model');

// Get list of businesss
exports.index = function(req, res) {
  Business.find(function (err, businesss) {
    if(err) { return handleError(res, err); }
    return res.json(200, businesss);
  });
};

// Get a single business
exports.show = function(req, res) {
  Business.findById(req.params.id, function (err, business) {
    if(err) { return handleError(res, err); }
    if(!business) { return res.send(404); }
    return res.json(business);
  });
};

// Creates a new business in the DB.
exports.create = function(req, res) {
  Business.create(req.body, function(err, business) {
    if(err) { return handleError(res, err); }
    return res.json(201, business);
  });
};

// Updates an existing business in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Business.findById(req.params.id, function (err, business) {
    if (err) { return handleError(res, err); }
    if(!business) { return res.send(404); }
    var updated = _.merge(business, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, business);
    });
  });
};

// Deletes a business from the DB.
exports.destroy = function(req, res) {
  Business.findById(req.params.id, function (err, business) {
    if(err) { return handleError(res, err); }
    if(!business) { return res.send(404); }
    business.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}