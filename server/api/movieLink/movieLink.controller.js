'use strict';

var _ = require('lodash');
var MovieLink = require('./movieLink.model');

// Get list of movieLinks
exports.index = function(req, res) {
  MovieLink.find(function (err, movieLinks) {
    if(err) { return handleError(res, err); }
    return res.json(200, movieLinks);
  });
};

// Get a single movieLink
exports.show = function(req, res) {
  MovieLink.findById(req.params.id, function (err, movieLink) {
    if(err) { return handleError(res, err); }
    if(!movieLink) { return res.send(404); }
    return res.json(movieLink);
  });
};

// Creates a new movieLink in the DB.
exports.create = function(req, res) {
  MovieLink.create(req.body, function(err, movieLink) {
    if(err) { return handleError(res, err); }
    return res.json(201, movieLink);
  });
};

// Updates an existing movieLink in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MovieLink.findById(req.params.id, function (err, movieLink) {
    if (err) { return handleError(res, err); }
    if(!movieLink) { return res.send(404); }
    var updated = _.merge(movieLink, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, movieLink);
    });
  });
};

// Deletes a movieLink from the DB.
exports.destroy = function(req, res) {
  MovieLink.findById(req.params.id, function (err, movieLink) {
    if(err) { return handleError(res, err); }
    if(!movieLink) { return res.send(404); }
    movieLink.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}