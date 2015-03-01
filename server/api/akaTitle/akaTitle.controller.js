'use strict';

var _ = require('lodash');
var AkaTitle = require('./akaTitle.model');

// Get list of akaTitles
exports.index = function(req, res) {
  AkaTitle.find(function (err, akaTitles) {
    if(err) { return handleError(res, err); }
    return res.json(200, akaTitles);
  });
};

// Get a single akaTitle
exports.show = function(req, res) {
  AkaTitle.findById(req.params.id, function (err, akaTitle) {
    if(err) { return handleError(res, err); }
    if(!akaTitle) { return res.send(404); }
    return res.json(akaTitle);
  });
};

// Creates a new akaTitle in the DB.
exports.create = function(req, res) {
  AkaTitle.create(req.body, function(err, akaTitle) {
    if(err) { return handleError(res, err); }
    return res.json(201, akaTitle);
  });
};

// Updates an existing akaTitle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AkaTitle.findById(req.params.id, function (err, akaTitle) {
    if (err) { return handleError(res, err); }
    if(!akaTitle) { return res.send(404); }
    var updated = _.merge(akaTitle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, akaTitle);
    });
  });
};

// Deletes a akaTitle from the DB.
exports.destroy = function(req, res) {
  AkaTitle.findById(req.params.id, function (err, akaTitle) {
    if(err) { return handleError(res, err); }
    if(!akaTitle) { return res.send(404); }
    akaTitle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}