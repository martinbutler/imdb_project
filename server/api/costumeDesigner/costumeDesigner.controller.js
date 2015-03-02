'use strict';

var _ = require('lodash');
var CostumeDesigner = require('./costumeDesigner.model');

// Get list of costumeDesigners
exports.index = function(req, res) {
  CostumeDesigner.find(function (err, costumeDesigners) {
    if(err) { return handleError(res, err); }
    return res.json(200, costumeDesigners);
  });
};

// Get a single costumeDesigner
exports.show = function(req, res) {
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    return res.json(costumeDesigner);
  });
};

// Creates a new costumeDesigner in the DB.
exports.create = function(req, res) {
  CostumeDesigner.create(req.body, function(err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    return res.json(201, costumeDesigner);
  });
};

// Updates an existing costumeDesigner in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if (err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    var updated = _.merge(costumeDesigner, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, costumeDesigner);
    });
  });
};

// Deletes a costumeDesigner from the DB.
exports.destroy = function(req, res) {
  CostumeDesigner.findById(req.params.id, function (err, costumeDesigner) {
    if(err) { return handleError(res, err); }
    if(!costumeDesigner) { return res.send(404); }
    costumeDesigner.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}