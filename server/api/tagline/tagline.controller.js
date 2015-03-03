'use strict';

var _ = require('lodash');
var Tagline = require('./tagline.model');

// Get list of taglines
exports.index = function(req, res) {
  Tagline.find(function (err, taglines) {
    if(err) { return handleError(res, err); }
    return res.json(200, taglines);
  });
};

// Get a single tagline
exports.show = function(req, res) {
  Tagline.findById(req.params.id, function (err, tagline) {
    if(err) { return handleError(res, err); }
    if(!tagline) { return res.send(404); }
    return res.json(tagline);
  });
};

// Creates a new tagline in the DB.
exports.create = function(req, res) {
  Tagline.create(req.body, function(err, tagline) {
    if(err) { return handleError(res, err); }
    return res.json(201, tagline);
  });
};

// Updates an existing tagline in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tagline.findById(req.params.id, function (err, tagline) {
    if (err) { return handleError(res, err); }
    if(!tagline) { return res.send(404); }
    var updated = _.merge(tagline, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tagline);
    });
  });
};

// Deletes a tagline from the DB.
exports.destroy = function(req, res) {
  Tagline.findById(req.params.id, function (err, tagline) {
    if(err) { return handleError(res, err); }
    if(!tagline) { return res.send(404); }
    tagline.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}