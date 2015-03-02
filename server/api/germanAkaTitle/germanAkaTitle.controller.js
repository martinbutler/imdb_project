'use strict';

var _ = require('lodash');
var GermanAkaTitle = require('./germanAkaTitle.model');

// Get list of germanAkaTitles
exports.index = function(req, res) {
  GermanAkaTitle.find(function (err, germanAkaTitles) {
    if(err) { return handleError(res, err); }
    return res.json(200, germanAkaTitles);
  });
};

// Get a single germanAkaTitle
exports.show = function(req, res) {
  GermanAkaTitle.findById(req.params.id, function (err, germanAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!germanAkaTitle) { return res.send(404); }
    return res.json(germanAkaTitle);
  });
};

// Creates a new germanAkaTitle in the DB.
exports.create = function(req, res) {
  GermanAkaTitle.create(req.body, function(err, germanAkaTitle) {
    if(err) { return handleError(res, err); }
    return res.json(201, germanAkaTitle);
  });
};

// Updates an existing germanAkaTitle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  GermanAkaTitle.findById(req.params.id, function (err, germanAkaTitle) {
    if (err) { return handleError(res, err); }
    if(!germanAkaTitle) { return res.send(404); }
    var updated = _.merge(germanAkaTitle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, germanAkaTitle);
    });
  });
};

// Deletes a germanAkaTitle from the DB.
exports.destroy = function(req, res) {
  GermanAkaTitle.findById(req.params.id, function (err, germanAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!germanAkaTitle) { return res.send(404); }
    germanAkaTitle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}