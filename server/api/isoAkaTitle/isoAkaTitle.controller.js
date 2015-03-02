'use strict';

var _ = require('lodash');
var IsoAkaTitle = require('./isoAkaTitle.model');

// Get list of isoAkaTitles
exports.index = function(req, res) {
  IsoAkaTitle.find(function (err, isoAkaTitles) {
    if(err) { return handleError(res, err); }
    return res.json(200, isoAkaTitles);
  });
};

// Get a single isoAkaTitle
exports.show = function(req, res) {
  IsoAkaTitle.findById(req.params.id, function (err, isoAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!isoAkaTitle) { return res.send(404); }
    return res.json(isoAkaTitle);
  });
};

// Creates a new isoAkaTitle in the DB.
exports.create = function(req, res) {
  IsoAkaTitle.create(req.body, function(err, isoAkaTitle) {
    if(err) { return handleError(res, err); }
    return res.json(201, isoAkaTitle);
  });
};

// Updates an existing isoAkaTitle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  IsoAkaTitle.findById(req.params.id, function (err, isoAkaTitle) {
    if (err) { return handleError(res, err); }
    if(!isoAkaTitle) { return res.send(404); }
    var updated = _.merge(isoAkaTitle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, isoAkaTitle);
    });
  });
};

// Deletes a isoAkaTitle from the DB.
exports.destroy = function(req, res) {
  IsoAkaTitle.findById(req.params.id, function (err, isoAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!isoAkaTitle) { return res.send(404); }
    isoAkaTitle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}