'use strict';

var _ = require('lodash');
var ItalianAkaTitle = require('./italianAkaTitle.model');

// Get list of italianAkaTitles
exports.index = function(req, res) {
  ItalianAkaTitle.find(function (err, italianAkaTitles) {
    if(err) { return handleError(res, err); }
    return res.json(200, italianAkaTitles);
  });
};

// Get a single italianAkaTitle
exports.show = function(req, res) {
  ItalianAkaTitle.findById(req.params.id, function (err, italianAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!italianAkaTitle) { return res.send(404); }
    return res.json(italianAkaTitle);
  });
};

// Creates a new italianAkaTitle in the DB.
exports.create = function(req, res) {
  ItalianAkaTitle.create(req.body, function(err, italianAkaTitle) {
    if(err) { return handleError(res, err); }
    return res.json(201, italianAkaTitle);
  });
};

// Updates an existing italianAkaTitle in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ItalianAkaTitle.findById(req.params.id, function (err, italianAkaTitle) {
    if (err) { return handleError(res, err); }
    if(!italianAkaTitle) { return res.send(404); }
    var updated = _.merge(italianAkaTitle, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, italianAkaTitle);
    });
  });
};

// Deletes a italianAkaTitle from the DB.
exports.destroy = function(req, res) {
  ItalianAkaTitle.findById(req.params.id, function (err, italianAkaTitle) {
    if(err) { return handleError(res, err); }
    if(!italianAkaTitle) { return res.send(404); }
    italianAkaTitle.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}