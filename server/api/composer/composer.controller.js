'use strict';

var _ = require('lodash');
var Composer = require('./composer.model');

// Get list of composers
exports.index = function(req, res) {
  Composer.find(function (err, composers) {
    if(err) { return handleError(res, err); }
    return res.json(200, composers);
  });
};

// Get a single composer
exports.show = function(req, res) {
  Composer.findById(req.params.id, function (err, composer) {
    if(err) { return handleError(res, err); }
    if(!composer) { return res.send(404); }
    return res.json(composer);
  });
};

// Creates a new composer in the DB.
exports.create = function(req, res) {
  Composer.create(req.body, function(err, composer) {
    if(err) { return handleError(res, err); }
    return res.json(201, composer);
  });
};

// Updates an existing composer in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Composer.findById(req.params.id, function (err, composer) {
    if (err) { return handleError(res, err); }
    if(!composer) { return res.send(404); }
    var updated = _.merge(composer, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, composer);
    });
  });
};

// Deletes a composer from the DB.
exports.destroy = function(req, res) {
  Composer.findById(req.params.id, function (err, composer) {
    if(err) { return handleError(res, err); }
    if(!composer) { return res.send(404); }
    composer.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}