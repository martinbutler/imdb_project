'use strict';

var _ = require('lodash');
var AkaName = require('./akaName.model');

// Get list of akaNames
exports.index = function(req, res) {
  AkaName.find(function (err, akaNames) {
    if(err) { return handleError(res, err); }
    return res.json(200, akaNames);
  });
};

// Get a single akaName
exports.show = function(req, res) {
  AkaName.findById(req.params.id, function (err, akaName) {
    if(err) { return handleError(res, err); }
    if(!akaName) { return res.send(404); }
    return res.json(akaName);
  });
};

// Creates a new akaName in the DB.
exports.create = function(req, res) {
  AkaName.create(req.body, function(err, akaName) {
    if(err) { return handleError(res, err); }
    return res.json(201, akaName);
  });
};

// Updates an existing akaName in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AkaName.findById(req.params.id, function (err, akaName) {
    if (err) { return handleError(res, err); }
    if(!akaName) { return res.send(404); }
    var updated = _.merge(akaName, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, akaName);
    });
  });
};

// Deletes a akaName from the DB.
exports.destroy = function(req, res) {
  AkaName.findById(req.params.id, function (err, akaName) {
    if(err) { return handleError(res, err); }
    if(!akaName) { return res.send(404); }
    akaName.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}