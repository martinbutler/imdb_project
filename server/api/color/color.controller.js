'use strict';

var _ = require('lodash');
var Color = require('./color.model');

// Get list of colors
exports.index = function(req, res) {
  Color.find(function (err, colors) {
    if(err) { return handleError(res, err); }
    return res.json(200, colors);
  });
};

// Get a single color
exports.show = function(req, res) {
  Color.findById(req.params.id, function (err, color) {
    if(err) { return handleError(res, err); }
    if(!color) { return res.send(404); }
    return res.json(color);
  });
};

// Creates a new color in the DB.
exports.create = function(req, res) {
  Color.create(req.body, function(err, color) {
    if(err) { return handleError(res, err); }
    return res.json(201, color);
  });
};

// Updates an existing color in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Color.findById(req.params.id, function (err, color) {
    if (err) { return handleError(res, err); }
    if(!color) { return res.send(404); }
    var updated = _.merge(color, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, color);
    });
  });
};

// Deletes a color from the DB.
exports.destroy = function(req, res) {
  Color.findById(req.params.id, function (err, color) {
    if(err) { return handleError(res, err); }
    if(!color) { return res.send(404); }
    color.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}