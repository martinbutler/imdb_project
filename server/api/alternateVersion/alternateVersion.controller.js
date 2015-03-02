'use strict';

var _ = require('lodash');
var AlternateVersion = require('./alternateVersion.model');

// Get list of alternateVersions
exports.index = function(req, res) {
  AlternateVersion.find(function (err, alternateVersions) {
    if(err) { return handleError(res, err); }
    return res.json(200, alternateVersions);
  });
};

// Get a single alternateVersion
exports.show = function(req, res) {
  AlternateVersion.findById(req.params.id, function (err, alternateVersion) {
    if(err) { return handleError(res, err); }
    if(!alternateVersion) { return res.send(404); }
    return res.json(alternateVersion);
  });
};

// Creates a new alternateVersion in the DB.
exports.create = function(req, res) {
  AlternateVersion.create(req.body, function(err, alternateVersion) {
    if(err) { return handleError(res, err); }
    return res.json(201, alternateVersion);
  });
};

// Updates an existing alternateVersion in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AlternateVersion.findById(req.params.id, function (err, alternateVersion) {
    if (err) { return handleError(res, err); }
    if(!alternateVersion) { return res.send(404); }
    var updated = _.merge(alternateVersion, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, alternateVersion);
    });
  });
};

// Deletes a alternateVersion from the DB.
exports.destroy = function(req, res) {
  AlternateVersion.findById(req.params.id, function (err, alternateVersion) {
    if(err) { return handleError(res, err); }
    if(!alternateVersion) { return res.send(404); }
    alternateVersion.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}