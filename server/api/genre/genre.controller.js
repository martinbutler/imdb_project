'use strict';

var _ = require('lodash');
var Genre = require('./genre.model');

// Get list of genres
exports.index = function(req, res) {
  Genre.find(function (err, genres) {
    if(err) { return handleError(res, err); }
    return res.json(200, genres);
  });
};

// Get a single genre
exports.show = function(req, res) {
  Genre.findById(req.params.id, function (err, genre) {
    if(err) { return handleError(res, err); }
    if(!genre) { return res.send(404); }
    return res.json(genre);
  });
};

// Creates a new genre in the DB.
exports.create = function(req, res) {
  Genre.create(req.body, function(err, genre) {
    if(err) { return handleError(res, err); }
    return res.json(201, genre);
  });
};

// Updates an existing genre in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Genre.findById(req.params.id, function (err, genre) {
    if (err) { return handleError(res, err); }
    if(!genre) { return res.send(404); }
    var updated = _.merge(genre, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, genre);
    });
  });
};

// Deletes a genre from the DB.
exports.destroy = function(req, res) {
  Genre.findById(req.params.id, function (err, genre) {
    if(err) { return handleError(res, err); }
    if(!genre) { return res.send(404); }
    genre.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}