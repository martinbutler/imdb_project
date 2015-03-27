'use strict';

var _ = require('lodash');
var Miscellaneous = require('./miscellaneous.model');

// Get list of miscellaneouss
exports.index = function(req, res) {
  Miscellaneous.find(function (err, miscellaneouss) {
    if(err) { return handleError(res, err); }
    return res.json(200, miscellaneouss);
  });
};

// Get a single miscellaneous
exports.show = function(req, res) {
  Miscellaneous.findById(req.params.id, function (err, miscellaneous) {
    if(err) { return handleError(res, err); }
    if(!miscellaneous) { return res.send(404); }
    return res.json(miscellaneous);
  });
};

// Creates a new miscellaneous in the DB.
exports.create = function(req, res) {
  Miscellaneous.create(req.body, function(err, miscellaneous) {
    if(err) { return handleError(res, err); }
    return res.json(201, miscellaneous);
  });
};

// Updates an existing miscellaneous in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Miscellaneous.findById(req.params.id, function (err, miscellaneous) {
    if (err) { return handleError(res, err); }
    if(!miscellaneous) { return res.send(404); }
    var updated = _.merge(miscellaneous, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, miscellaneous);
    });
  });
};

// Deletes a miscellaneous from the DB.
exports.destroy = function(req, res) {
  Miscellaneous.findById(req.params.id, function (err, miscellaneous) {
    if(err) { return handleError(res, err); }
    if(!miscellaneous) { return res.send(404); }
    miscellaneous.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}